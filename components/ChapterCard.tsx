import Link from 'next/link'
import Image from 'next/image'
import type { ChapterMeta } from '@/lib/chapters'

export default function ChapterCard({
  chapter,
  ordinal,
}: {
  chapter: ChapterMeta
  ordinal: number
}) {
  return (
    <Link
      href={`/chapters/${chapter.slug}`}
      className="chapter-card group relative block overflow-hidden rounded-lg border border-rule-soft bg-bg-elev hover:border-rule focus-visible:border-accent"
    >
      <div className="relative aspect-[1200/630] overflow-hidden bg-bg-sunk">
        {chapter.hero?.image && (
          <Image
            src={chapter.hero.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain"
          />
        )}
        <div
          className="absolute right-4 bottom-3 text-[1.6rem]"
          style={{
            fontFamily: 'var(--font-hand), cursive',
            color: 'white',
            textShadow:
              '0 0 2px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.7), 0 0 8px rgba(0,0,0,0.4)',
          }}
        >
          {ordinal}
        </div>
      </div>
      <div className="p-5">
        <h3
          className="font-display text-xl leading-tight text-ink group-hover:text-accent transition-colors"
          style={{ fontFeatureSettings: "'ss01'" }}
        >
          {chapter.title}
        </h3>
        <p className="mt-2 font-serif text-sm leading-relaxed text-ink-muted line-clamp-3">
          {chapter.excerpt}
        </p>
        <div className="mt-4 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-brass">
          Read chapter {ordinal}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  )
}
