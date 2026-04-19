import type { Metadata } from 'next'
import Arrowhead from '@/components/Arrowhead'

export const metadata: Metadata = {
  title: 'About',
  description: 'About the Finnoybu trilogy by E. A. Westbo.',
}

export default function AboutPage() {
  return (
    <div className="max-w-shell mx-auto px-6 py-16 md:py-24">
      <div className="max-w-prose mx-auto">
        <p className="eyebrow mb-4">About the trilogy</p>
        <h1
          className="font-display text-4xl md:text-5xl leading-tight text-ink mb-10"
          style={{ fontFeatureSettings: "'ss01'" }}
        >
          Finnoybu
        </h1>

        <div className="prose-memoir">
          <p>
            <em>Finnoybu</em> is a trilogy of historical novels following Olav Hestby,
            a young Norwegian sailor whose first deep-sea voyage in 1876 sets in motion
            a life caught between two loves &mdash; the woman he marries and the man
            he cannot speak of &mdash; in an age that had no word for either.
          </p>

          <p>
            Book I, <em>Salt and Silence</em>, opens on the brig <em>Sigrid</em> on a
            June morning at the Stavanger quay and follows Olav through five years
            of voyages, illness, and homecoming to the moment he sets sail for the
            East Indies as a betrothed man. Books II and III continue the story
            through the long voyage to Calcutta and Rangoon and the marriage at
            Hestby that closes the arc.
          </p>

          <p>
            <em>For those who loved in times that had no word for it,
            and for the ones they could not say.</em>
          </p>
        </div>

        <div className="my-16 flex justify-center"><Arrowhead /></div>

        <div className="prose-memoir">
          <h2>About the author</h2>

          <p>
            <strong>E. A. Westbo</strong> writes historical fiction set in the last
            great age of sail. The <em>Finnoybu</em> trilogy is inspired by a
            Norwegian-American family memoir of the same coast and period; the
            characters, voyages, and inner lives of the novels are the author&rsquo;s
            own invention.
          </p>
        </div>

        <div className="my-16 flex justify-center"><Arrowhead /></div>

        <div className="prose-memoir">
          <h2>A note on the source</h2>

          <p>
            The world of <em>Finnoybu</em> is grounded in the geography of southwestern
            Norway &mdash; the islands of Finn&oslash;y, Lind&oslash;y, and Moster&oslash;y
            in the Stavanger channel &mdash; and in the working life of the merchant
            sailing fleet in the decades before steam took the long routes. Where the
            prose names a specific ship, port, or maritime detail, it has been chosen
            for fidelity to the period; where it names a character or an interior life,
            it is imagined.
          </p>
        </div>
      </div>
    </div>
  )
}
