'use client'

import { useRef } from 'react'
import WikiHoverCards from './WikiHoverCards'
import SelectionToolbar from './SelectionToolbar'
import AnnotationHighlights from './AnnotationHighlights'

export default function ChapterArticle({
  html,
  chapterSlug,
  bookSlug,
}: {
  html: string
  chapterSlug: string
  bookSlug: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <article className="prose-memoir mx-auto" ref={ref}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <WikiHoverCards containerRef={ref} />
      <SelectionToolbar articleRef={ref} chapterSlug={chapterSlug} bookSlug={bookSlug} />
      <AnnotationHighlights articleRef={ref} chapterSlug={chapterSlug} bookSlug={bookSlug} />
    </article>
  )
}
