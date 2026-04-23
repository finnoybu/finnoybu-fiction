import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export interface ChapterMeta {
  id: number
  title: string
  slug: string
  book: string
  hero: {
    image: string
  }
  excerpt: string
}

export interface Chapter extends ChapterMeta {
  content: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'en')

function findAllMarkdownFiles(dir: string): string[] {
  const results: string[] = []
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...findAllMarkdownFiles(full))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(full)
    }
  }
  return results
}

function makeExcerpt(body: string, maxLen = 180): string {
  const firstPara = body
    .replace(/\r\n/g, '\n')
    .split(/\n\n+/)
    .map((p) => p.trim())
    .find((p) => p.length > 0) || ''
  const clean = firstPara.replace(/\s+/g, ' ').trim()
  if (clean.length <= maxLen) return clean
  const cut = clean.slice(0, maxLen)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 80 ? cut.slice(0, lastSpace) : cut) + '…'
}

export function getAllChapters(): ChapterMeta[] {
  const paths = findAllMarkdownFiles(CONTENT_DIR)

  const chapters: ChapterMeta[] = paths
    .map((fullPath) => {
      const raw = fs.readFileSync(fullPath, 'utf8')
      const { data, content: body } = matter(raw)
      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        book: data.book,
        hero: data.hero,
        excerpt: makeExcerpt(body),
      } as ChapterMeta
    })
    .sort((a, b) => a.id - b.id)

  return chapters
}

export function getChapterBySlug(slug: string): Chapter | null {
  const paths = findAllMarkdownFiles(CONTENT_DIR)

  for (const fullPath of paths) {
    const raw = fs.readFileSync(fullPath, 'utf8')
    const { content: markdown, data } = matter(raw)
    if (data.slug === slug) {
      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        book: data.book,
        hero: data.hero,
        content: marked.parse(markdown) as string,
      } as Chapter
    }
  }

  return null
}

export function getChapterIndex(slug: string): number {
  const chapters = getAllChapters()
  return chapters.findIndex((c) => c.slug === slug)
}

export function getAdjacentChapters(slug: string): {
  prev: ChapterMeta | null
  next: ChapterMeta | null
} {
  const chapters = getAllChapters()
  const index = chapters.findIndex((c) => c.slug === slug)

  return {
    prev: index > 0 ? chapters[index - 1] : null,
    next: index < chapters.length - 1 ? chapters[index + 1] : null,
  }
}
