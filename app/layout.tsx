import './globals.css'
import type { Metadata } from 'next'
import { Fraunces, EB_Garamond, Inter, Caveat } from 'next/font/google'
import { ReaderProvider } from '@/lib/reader-context'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import RecoveryGuard from '@/components/RecoveryGuard'
import WelcomeModal from '@/components/WelcomeModal'
import PasswordRecoveryModal from '@/components/PasswordRecoveryModal'
import PromoModal from '@/components/PromoModal'
import CookieBanner from '@/components/CookieBanner'
import { Analytics } from '@vercel/analytics/react'

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['SOFT', 'opsz'],
  variable: '--font-display',
})

const garamond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hand',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://fiction.finnoybu.com'),
  title: {
    default: "Finnoybu: Salt and Silence — Book I",
    template: "%s · Finnoybu",
  },
  description:
    "Finnoybu: Salt and Silence — Book I. A young Norwegian sailor in the age of sail, torn between the woman he has promised himself to and the men who share his watches. A period historical romance by E. A. Westbo.",
  authors: [{ name: 'E. A. Westbo' }],
  creator: 'E. A. Westbo',
  publisher: 'Finnoybu Press',
  keywords: [
    'historical romance',
    'queer historical fiction',
    'age of sail',
    'Norwegian',
    'Norway',
    'period fiction',
    'maritime fiction',
    'E. A. Westbo',
    'Finnoybu',
    'Salt and Silence',
  ],
  icons: {
    icon: '/images/blue-arrowhead.svg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'book',
    locale: 'en_US',
    url: '/',
    siteName: 'Finnoybu',
    title: 'Finnoybu: Salt and Silence — Book I',
    description:
      'In the last great age of sail, a young Norwegian ships out promised to a girl at home — and learns, watch by watch, that the heart keeps two courses at once. A period historical romance by E. A. Westbo.',
    images: [
      {
        url: '/images/1/00-introduction.png',
        width: 1536,
        height: 1024,
        alt: 'Salt and Silence — cover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finnoybu: Salt and Silence — Book I',
    description:
      'A young Norwegian ships out promised to a girl at home — and learns, watch by watch, that the heart keeps two courses at once.',
    images: ['/images/1/00-introduction.png'],
  },
}

const themeScript = `
  try {
    var stored = JSON.parse(localStorage.getItem('hestby-reader-preferences') || '{}');
    var theme = stored.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
  } catch (e) {}
`.trim()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${garamond.variable} ${inter.variable} ${caveat.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-bg text-ink">
        <ReaderProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-bg focus:rounded"
          >
            Skip to content
          </a>
          <RecoveryGuard>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </RecoveryGuard>
          <WelcomeModal />
          <PasswordRecoveryModal />
          <PromoModal />
          <CookieBanner />
          <Analytics />
        </ReaderProvider>
      </body>
    </html>
  )
}
