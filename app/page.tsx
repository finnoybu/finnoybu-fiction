import Link from 'next/link'
import Image from 'next/image'
import { getAllChapters } from '@/lib/chapters'
import SearchBar from '@/components/SearchBar'
import Arrowhead from '@/components/Arrowhead'
import ReadingProgress from '@/components/ReadingProgress'
import ChapterCard from '@/components/ChapterCard'

export default function Home() {
  const all = getAllChapters()
  const intro = all.find((c) => c.slug === 'introduction')
  const chapters = all.filter((c) => c.slug !== 'introduction')

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden border-b border-rule-soft">
        <div className="absolute inset-0 -z-10">
          {intro?.hero?.image && (
            <Image
              src={intro.hero.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-25 dark:opacity-30 grayscale sepia-[.15]"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, var(--color-bg) 0%, rgb(0 0 0 / 0) 25%, rgb(0 0 0 / 0) 60%, var(--color-bg) 100%)',
            }}
          />
        </div>

        <div className="max-w-shell mx-auto px-6 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">Finnoybu &middot; Book I</p>
            <h1
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.08] text-ink"
              style={{ fontFeatureSettings: "'ss01'" }}
            >
              Salt and{' '}
              <span className="italic text-accent">Silence</span>
            </h1>
            <p className="mt-8 font-serif text-xl md:text-2xl leading-relaxed text-ink-muted max-w-2xl">
              In the last great age of sail, a young Norwegian ships out promised to a
              girl at home &mdash; and learns, watch by watch, that the heart keeps two
              courses at once.
            </p>
            <div className="mt-8 flex flex-col gap-0.5 font-serif text-sm text-ink-muted italic">
              <p>A novel by E.&thinsp;A. Westbo</p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/chapters/introduction"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-accent text-bg font-sans text-sm tracking-wider uppercase hover:bg-accent-hi transition-colors"
              >
                Cast off
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="#chapters"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-rule text-ink font-sans text-sm tracking-wider uppercase hover:border-accent hover:text-accent transition-colors"
              >
                Chapters
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Framing ───────── */}
      <section className="max-w-shell mx-auto px-6 py-20">
        <div className="max-w-measure mx-auto text-center">
          <div className="rule-ornament font-display text-2xl mb-8" style={{ fontFeatureSettings: "'ss01'" }}>
            <Arrowhead />
          </div>
          <p className="font-serif text-lg md:text-xl leading-relaxed text-ink-muted">
            A young Norwegian leaves the island of his birth at the end of the age of
            sail. He carries a sea-chest, a confirmation Bible, a borrowed knife, and a
            promise to the girl he means to marry. Over seven years and as many voyages
            he will find out what the horizon takes and what it gives back &mdash; and
            what a young man carries home that he will never, even with her, say aloud.
          </p>
        </div>
      </section>

      {/* ───────── Chapter grid ───────── */}
      <section id="chapters" className="max-w-shell mx-auto px-6 pb-24 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow mb-3">Book I &middot; chapters</p>
            <h2
              className="font-display text-4xl md:text-5xl text-ink"
              style={{ fontFeatureSettings: "'ss01'" }}
            >
              The watches
            </h2>
          </div>
          <div className="md:w-96">
            <SearchBar />
          </div>
        </div>

        <ReadingProgress />

        {intro && (
          <Link
            href={`/chapters/${intro.slug}`}
            className="chapter-card group relative mb-10 grid md:grid-cols-[1.25fr_1fr] overflow-hidden rounded-lg border border-rule-soft bg-bg-elev hover:border-rule"
          >
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="eyebrow mb-3">Prologue</p>
              <h3
                className="font-display text-3xl md:text-4xl text-ink group-hover:text-accent transition-colors"
                style={{ fontFeatureSettings: "'ss01'" }}
              >
                {intro.title}
              </h3>
              <p className="mt-4 font-serif text-base md:text-lg leading-relaxed text-ink-muted line-clamp-4">
                {intro.excerpt}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-brass">
                Begin here
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] md:aspect-auto bg-bg-sunk overflow-hidden order-first md:order-last">
              {intro.hero?.image && (
                <Image
                  src={intro.hero.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="cover object-cover"
                />
              )}
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter, i) => (
            <ChapterCard key={chapter.slug} chapter={chapter} ordinal={i + 1} />
          ))}
        </div>
      </section>
    </>
  )
}
