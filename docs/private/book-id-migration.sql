-- Phase 2 migration: unified auth + book_id across *.finnoybu.com
-- Run in Supabase Dashboard → SQL Editor against the sea-reader Supabase project.
-- One-shot approach (Ken's call 2026-04-22: "no one is using the site it's fine").
--
-- Post-conditions:
--   - public.books table exists with 2 rows (sea-reader, salt-and-silence)
--   - 5 user-data tables have book_id NOT NULL uuid REFERENCES books(id)
--   - existing sea-reader rows backfilled with sea-reader book_id
--   - composite (book_id, user_id) indexes on all 5 tables
--   - reading_progress uniqueness is now per (user_id, book_id, chapter_slug)
--   - RLS policies on books; existing table policies untouched (auth.uid() = user_id still correct)
--
-- Rollback: see docs/private/book-id-migration-plan.md §Rollback.

BEGIN;

-- ===================================================================
-- 1. books table
-- ===================================================================

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
GRANT ALL    ON public.books TO service_role;

-- ===================================================================
-- 2. Seed books
-- ===================================================================

INSERT INTO public.books (slug, title, subtitle, author, site_url) VALUES
  ('sea-reader',
   'A Sailor''s Reminiscences from the Days of the Sailships',
   NULL,
   'Olavus Vullum Bjørnson Vestbø',
   'https://sea-reader.finnoybu.com'),
  ('salt-and-silence',
   'Finnoybu: Salt and Silence',
   'Book I of the Finnoybu Trilogy',
   'E. A. Westbo',
   'https://fiction.finnoybu.com');

-- ===================================================================
-- 3. Add nullable book_id column
-- ===================================================================

ALTER TABLE public.bookmarks        ADD COLUMN book_id uuid REFERENCES public.books(id);
ALTER TABLE public.annotations      ADD COLUMN book_id uuid REFERENCES public.books(id);
ALTER TABLE public.reading_progress ADD COLUMN book_id uuid REFERENCES public.books(id);
ALTER TABLE public.errata_reports   ADD COLUMN book_id uuid REFERENCES public.books(id);
ALTER TABLE public.purchases        ADD COLUMN book_id uuid REFERENCES public.books(id);

-- ===================================================================
-- 4. Backfill: all existing rows belong to sea-reader
-- ===================================================================

UPDATE public.bookmarks        SET book_id = (SELECT id FROM public.books WHERE slug = 'sea-reader');
UPDATE public.annotations      SET book_id = (SELECT id FROM public.books WHERE slug = 'sea-reader');
UPDATE public.reading_progress SET book_id = (SELECT id FROM public.books WHERE slug = 'sea-reader');
UPDATE public.errata_reports   SET book_id = (SELECT id FROM public.books WHERE slug = 'sea-reader');
UPDATE public.purchases        SET book_id = (SELECT id FROM public.books WHERE slug = 'sea-reader');

-- ===================================================================
-- 5. NOT NULL
-- ===================================================================

ALTER TABLE public.bookmarks        ALTER COLUMN book_id SET NOT NULL;
ALTER TABLE public.annotations      ALTER COLUMN book_id SET NOT NULL;
ALTER TABLE public.reading_progress ALTER COLUMN book_id SET NOT NULL;
ALTER TABLE public.errata_reports   ALTER COLUMN book_id SET NOT NULL;
ALTER TABLE public.purchases        ALTER COLUMN book_id SET NOT NULL;

-- ===================================================================
-- 6. Composite indexes for (book_id, user_id) access pattern
-- ===================================================================

CREATE INDEX bookmarks_book_user_idx        ON public.bookmarks        (book_id, user_id);
CREATE INDEX annotations_book_user_idx      ON public.annotations      (book_id, user_id);
CREATE INDEX reading_progress_book_user_idx ON public.reading_progress (book_id, user_id);
CREATE INDEX errata_reports_book_user_idx   ON public.errata_reports   (book_id, user_id);
CREATE INDEX purchases_book_user_idx        ON public.purchases        (book_id, user_id);

-- ===================================================================
-- 7. reading_progress uniqueness: one row per (user, book, chapter)
-- ===================================================================

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'reading_progress_user_chapter_uniq'
  ) THEN
    ALTER TABLE public.reading_progress DROP CONSTRAINT reading_progress_user_chapter_uniq;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE indexname = 'reading_progress_user_chapter_uniq'
  ) THEN
    DROP INDEX public.reading_progress_user_chapter_uniq;
  END IF;
END
$$;

CREATE UNIQUE INDEX reading_progress_user_chapter_book_uniq
  ON public.reading_progress (user_id, book_id, chapter_slug);

COMMIT;

-- ===================================================================
-- Post-run verification
-- ===================================================================
-- Run after commit to confirm state:
--
--   SELECT id, slug, title FROM public.books ORDER BY slug;
--
--   SELECT 'bookmarks' AS table_name, count(*) AS total, count(book_id) AS with_book_id
--   FROM public.bookmarks
--   UNION ALL SELECT 'annotations',     count(*), count(book_id) FROM public.annotations
--   UNION ALL SELECT 'reading_progress', count(*), count(book_id) FROM public.reading_progress
--   UNION ALL SELECT 'errata_reports',   count(*), count(book_id) FROM public.errata_reports
--   UNION ALL SELECT 'purchases',        count(*), count(book_id) FROM public.purchases;
--
-- Both columns should match (total = with_book_id) for each row.
