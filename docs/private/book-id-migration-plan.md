# Book-ID migration plan

> **Purpose:** Unify auth and user-data across all `*.finnoybu.com` subdomains so one account works on every site, and structure per-user data (bookmarks, annotations, reading progress, errata, purchases) around a `book_id` foreign key so a user who reads both the memoir and the fiction trilogy has their bookmarks cleanly separated by book.
>
> **Scope:** Spans sea-reader and fiction. Follows the cookie-domain change that was committed separately on both sides.
>
> **Status:** Draft 2026-04-22. Ready for Ken's review before execution.

## Data model (locked)

### `public.books`

Single source of truth for books available on any `*.finnoybu.com` subdomain.

```sql
CREATE TABLE public.books (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text        NOT NULL UNIQUE,
  title       text        NOT NULL,
  subtitle    text,
  author      text,
  site_url    text,
  created_at  timestamptz NOT NULL DEFAULT now()
);
```

- `id` UUID — decouples book identity from slug; renaming a slug doesn't cascade
- `slug` — stable human-readable identifier (`sea-reader`, `salt-and-silence`, etc.)
- `title`, `subtitle`, `author`, `site_url` — metadata useful for future "library" or cross-book UI
- RLS: readable by anyone (books are public metadata); write-locked to `service_role`

Initial rows (inserted by migration):
- `{ slug: 'sea-reader', title: "A Sailor's Reminiscences from the Days of the Sailships", author: 'Olavus Vullum Bjørnson Vestbø', site_url: 'https://sea-reader.finnoybu.com' }`
- `{ slug: 'salt-and-silence', title: 'Finnoybu: Salt and Silence', subtitle: 'Book I of the Finnoybu Trilogy', author: 'E. A. Westbo', site_url: 'https://fiction.finnoybu.com' }`

### User-data tables (all five)

Each of `bookmarks`, `annotations`, `reading_progress`, `errata_reports`, `purchases` gets:

```sql
ALTER TABLE public.<table> ADD COLUMN book_id uuid REFERENCES public.books(id);
-- (nullable at first; NOT NULL after backfill and code deploy)
CREATE INDEX <table>_book_user_idx ON public.<table> (book_id, user_id);
```

RLS policies stay identical — `auth.uid() = user_id` is still the security boundary. `book_id` filtering is an application concern, not a security one.

## Where the book identity comes from, per site

**Sea-reader (single-book site forever):**
- App-level constant: `export const BOOK_SLUG = 'sea-reader'` in a new `lib/book.ts`
- Startup-cached UUID lookup: `getBookId(supabase)` queries `books WHERE slug = BOOK_SLUG`, caches result
- All queries use `getBookId()` to get the UUID

**Fiction (multi-book site — salt-and-silence now, Book II + III later):**
- Each chapter markdown has `book: "salt-and-silence"` in its frontmatter
- `lib/chapters.ts` exposes `chapter.book` alongside existing fields
- Reader-context (`lib/reader-context.tsx`) carries the current book's UUID (looked up from slug at chapter load)
- Components that write rows read book_id from context

## Migration SQL — one-shot (draft)

For a family-scale user base, a one-shot migration during a quiet period is fine. Three-phase (nullable → write → NOT NULL) is safer but adds coordination cost. Ken decides.

```sql
BEGIN;

-- 1. Create books table
CREATE TABLE public.books (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text        NOT NULL UNIQUE,
  title       text        NOT NULL,
  subtitle    text,
  author      text,
  site_url    text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read books"
  ON public.books FOR SELECT
  USING (true);

GRANT SELECT ON public.books TO anon, authenticated;
GRANT ALL ON public.books TO service_role;

-- 2. Seed initial books
INSERT INTO public.books (slug, title, subtitle, author, site_url) VALUES
  ('sea-reader', 'A Sailor''s Reminiscences from the Days of the Sailships',
   NULL, 'Olavus Vullum Bjørnson Vestbø', 'https://sea-reader.finnoybu.com'),
  ('salt-and-silence', 'Finnoybu: Salt and Silence',
   'Book I of the Finnoybu Trilogy', 'E. A. Westbo', 'https://fiction.finnoybu.com');

-- 3. Add nullable book_id column to each table
ALTER TABLE public.bookmarks        ADD COLUMN book_id uuid REFERENCES public.books(id);
ALTER TABLE public.annotations      ADD COLUMN book_id uuid REFERENCES public.books(id);
ALTER TABLE public.reading_progress ADD COLUMN book_id uuid REFERENCES public.books(id);
ALTER TABLE public.errata_reports   ADD COLUMN book_id uuid REFERENCES public.books(id);
ALTER TABLE public.purchases        ADD COLUMN book_id uuid REFERENCES public.books(id);

-- 4. Backfill: all existing rows belong to sea-reader
UPDATE public.bookmarks        SET book_id = (SELECT id FROM public.books WHERE slug = 'sea-reader');
UPDATE public.annotations      SET book_id = (SELECT id FROM public.books WHERE slug = 'sea-reader');
UPDATE public.reading_progress SET book_id = (SELECT id FROM public.books WHERE slug = 'sea-reader');
UPDATE public.errata_reports   SET book_id = (SELECT id FROM public.books WHERE slug = 'sea-reader');
UPDATE public.purchases        SET book_id = (SELECT id FROM public.books WHERE slug = 'sea-reader');

-- 5. Make book_id NOT NULL (all rows now populated)
ALTER TABLE public.bookmarks        ALTER COLUMN book_id SET NOT NULL;
ALTER TABLE public.annotations      ALTER COLUMN book_id SET NOT NULL;
ALTER TABLE public.reading_progress ALTER COLUMN book_id SET NOT NULL;
ALTER TABLE public.errata_reports   ALTER COLUMN book_id SET NOT NULL;
ALTER TABLE public.purchases        ALTER COLUMN book_id SET NOT NULL;

-- 6. Composite indexes for common access patterns
CREATE INDEX bookmarks_book_user_idx        ON public.bookmarks        (book_id, user_id);
CREATE INDEX annotations_book_user_idx      ON public.annotations      (book_id, user_id);
CREATE INDEX reading_progress_book_user_idx ON public.reading_progress (book_id, user_id);
CREATE INDEX errata_reports_book_user_idx   ON public.errata_reports   (book_id, user_id);
CREATE INDEX purchases_book_user_idx        ON public.purchases        (book_id, user_id);

-- 7. Update uniqueness constraint on reading_progress to include book
-- (one progress row per user per chapter per book, not one per user per chapter)
ALTER TABLE public.reading_progress DROP CONSTRAINT IF EXISTS reading_progress_user_chapter_uniq;
CREATE UNIQUE INDEX reading_progress_user_chapter_book_uniq
  ON public.reading_progress (user_id, book_id, chapter_slug);

COMMIT;
```

**Timing caveat on the one-shot approach:** between step 3 (nullable column added) and step 5 (NOT NULL set), if sea-reader's deployed code inserts a row, that row will have `book_id = NULL` and step 5 will fail. Mitigations:
- Run during off-hours when user writes are unlikely.
- OR deploy sea-reader's updated code FIRST (writes book_id), then run the migration in the order 1-2 / 3-4 / 5-6-7.
- OR use the three-phase approach: 3 → 4 (backfill) → deploy code → 5-7 (constraints).

For family scale the one-shot at an off-hour is probably fine.

## Sea-reader code changes (scope)

19 query sites identified via `grep -rnE "\.from\(['\"](bookmarks|annotations|reading_progress|errata_reports|purchases)['\"]" app/ components/ lib/`:

**SELECTs (need `.eq('book_id', BOOK_ID)` filter) — 9 sites:**
- `app/account/annotations/page.tsx:76`
- `app/account/bookmarks/page.tsx:26`
- `app/account/page.tsx:96` (reading_progress)
- `app/account/page.tsx:97` (purchases)
- `app/api/download/route.ts:26` (purchases)
- `components/AnnotationHighlights.tsx:216` (annotations)
- `components/AnnotationHighlights.tsx:221` (bookmarks)
- `components/DownloadButtons.tsx:16` (purchases)
- `lib/reader-context.tsx:81` (reading_progress)

**INSERTs (need `book_id` in row) — 5 sites:**
- `app/api/webhook/route.ts:32` (purchases, Stripe webhook — server-side, needs BOOK_ID)
- `components/SelectionToolbar.tsx:161` (bookmarks)
- `components/SelectionToolbar.tsx:198` (annotations)
- `components/SelectionToolbar.tsx:217` (errata_reports)
- `lib/reader-context.tsx:118` (reading_progress upsert)

**DELETEs (book_id filter optional — `id` match + RLS is already sufficient) — 5 sites:**
- `app/account/annotations/page.tsx:87`
- `app/account/bookmarks/page.tsx:38`
- `components/AnnotationHighlights.tsx:62`
- `components/SelectionToolbar.tsx:147`
- `components/SelectionToolbar.tsx:183`

Plus one new file: `lib/book.ts` with the `BOOK_SLUG` constant and `getBookId()` cached-lookup helper.

Estimate: **~1 hour** of focused edits + local smoke test on sea-reader.

## Fiction code changes (scope)

Fiction inherits the same 19 query sites from sea-reader's component library (same files, same line numbers approximately — the code is a clone). But fiction has additional work:

- **New `lib/book.ts`** with `getBookIdFromSlug(slug)` helper and cache — looks up UUID by book slug from the `books` table at startup, memoizes.
- **`lib/chapters.ts`** extended to surface `book` slug from frontmatter on the `Chapter` / `ChapterMeta` types.
- **`lib/reader-context.tsx`** extended to carry the current book's UUID, set by pages when they load a chapter.
- **Each of the 4 chapter markdown files** gets `book: "salt-and-silence"` added to frontmatter (5-file edit including `introduction.md` if it exists; currently only 4).
- **Query sites** updated to read book_id from reader-context (not from a constant, since fiction is multi-book-capable).

Estimate: **~2 hours** including local testing.

## Deployment sequence

1. **Run migration SQL** in Supabase dashboard during an off-hour. Verify:
   - `books` table has 2 rows
   - All existing rows in 5 tables have `book_id` = sea-reader's UUID
   - NOT NULL constraints are in place
2. **Deploy sea-reader** with updated code via its `feature/v0.2.0-shared-auth-cookie-domain` branch (merged to main first) + a new `feature/v0.2.0-book-id` branch on top. Verify:
   - Existing sea-reader users' bookmarks/annotations still load
   - New bookmarks/annotations write with `book_id` populated
3. **Set `NEXT_PUBLIC_COOKIE_DOMAIN=.finnoybu.com`** in sea-reader's Vercel env vars. Redeploy.
4. **Add `book` frontmatter to fiction's chapters.** Commit.
5. **Deploy fiction** with updated code + real Supabase creds in Vercel env vars (URL + publishable key) + `NEXT_PUBLIC_COOKIE_DOMAIN=.finnoybu.com`.
6. **Test cross-subdomain auth** end-to-end:
   - Sign up on one site → session valid on the other
   - Create bookmark on fiction → writes with salt-and-silence book_id
   - Create bookmark on sea-reader → writes with sea-reader book_id
   - Account pages on each site show only that site's data

## Total estimate

- Migration SQL execution: 5 min
- Sea-reader code changes: 1 hour
- Fiction code changes: 2 hours
- Testing both sides + cross-subdomain auth: 1 hour
- Vercel setup + DNS CNAME: 30 min

**~4.5 hours** of focused work before fiction goes live for family.

## Rollback

If the migration lands badly:

- Sea-reader code still works against public tables — rollback is reverting the sea-reader commit and redeploying. Rows with book_id continue to exist (harmless orphan data).
- To rollback the SQL: `DROP TABLE public.books CASCADE` cascades to drop the FK columns; all 5 tables revert structurally. But this destroys the book_id values. Safer: `ALTER TABLE ... DROP COLUMN book_id` on each table, then `DROP TABLE public.books`.
- Fiction has no production state yet, so nothing to rollback on that side.
