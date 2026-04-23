import Image from 'next/image'
import Arrowhead from './Arrowhead'

function toRoman(num: number): string {
  if (num <= 0) return ''
  const map: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ]
  let n = num, out = ''
  for (const [v, s] of map) while (n >= v) { out += s; n -= v }
  return out
}

export default function ChapterHero({
  title,
  image,
  ordinal,
  isPrologue,
}: {
  title: string
  image?: string
  ordinal: number
  isPrologue?: boolean
}) {
  return (
    <header className="relative border-b border-rule-soft">
      {image && (
        <div className="max-w-[60.8rem] mx-auto px-6 pt-6">
          <div className="relative aspect-[3/2] w-full overflow-hidden">
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="(min-width: 1216px) 1216px, 100vw"
              className="object-contain"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, rgb(0 0 0 / 0) 0%, var(--color-bg) 100%)',
              }}
            />
          </div>
        </div>
      )}
      <div className="max-w-shell mx-auto px-6 pt-10 md:pt-14 pb-10">
        <div className="max-w-measure mx-auto text-center">
          <p className="eyebrow mb-4">
            {isPrologue ? 'Prologue' : `Chapter ${toRoman(ordinal)}`}
          </p>
          <h1
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink italic"
            style={{ fontFeatureSettings: "'ss01'" }}
          >
            {title}
          </h1>
          <div className="mt-8 flex items-center justify-center gap-3 text-brass">
            <span className="block w-16 h-px bg-rule" />
            <Arrowhead />
            <span className="block w-16 h-px bg-rule" />
          </div>
        </div>
      </div>
    </header>
  )
}
