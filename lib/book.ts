import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Slugs of all books hosted on fiction.finnoybu.com. As more books
 * in the Finnoybu trilogy publish (Book II, Book III), add their slugs
 * here so account pages and reader-context properly scope their
 * queries to all fiction books.
 *
 * Per-chapter operations (bookmark a specific passage, annotate a
 * specific chapter) resolve book_id from the chapter's frontmatter
 * `book` field via getBookId(supabase, slug).
 */
export const FICTION_BOOK_SLUGS = ['salt-and-silence'] as const
export type FictionBookSlug = (typeof FICTION_BOOK_SLUGS)[number]

// Module-scoped cache of slug → uuid. Loaded once per process or page-load.
let cachedMap: Map<string, string> | null = null
let inflight: Promise<Map<string, string>> | null = null

async function loadBooks(supabase: SupabaseClient): Promise<Map<string, string>> {
  if (cachedMap) return cachedMap
  if (inflight) return inflight

  inflight = (async () => {
    const { data, error } = await supabase
      .from('books')
      .select('id, slug')
      .in('slug', FICTION_BOOK_SLUGS as unknown as string[])

    if (error || !data) {
      inflight = null
      throw new Error(
        `Failed to load fiction books: ${error?.message ?? 'no rows'}`
      )
    }

    const map = new Map<string, string>()
    for (const row of data as Array<{ id: string; slug: string }>) {
      map.set(row.slug, row.id)
    }
    cachedMap = map
    inflight = null
    return map
  })()

  return inflight
}

/**
 * Resolves a book slug to its uuid. Use for per-chapter operations
 * where the slug comes from the chapter's frontmatter `book` field.
 * Throws if the slug isn't in FICTION_BOOK_SLUGS.
 */
export async function getBookId(supabase: SupabaseClient, slug: string): Promise<string> {
  const map = await loadBooks(supabase)
  const id = map.get(slug)
  if (!id) {
    throw new Error(
      `Book slug "${slug}" is not registered in FICTION_BOOK_SLUGS or not present in public.books`
    )
  }
  return id
}

/**
 * Returns all fiction book_ids as an array. Use for account-level
 * queries (bookmarks list, annotations list, reading-progress merge)
 * that should show data across every book the user has read on
 * this site.
 */
export async function getAllFictionBookIds(supabase: SupabaseClient): Promise<string[]> {
  const map = await loadBooks(supabase)
  return Array.from(map.values())
}
