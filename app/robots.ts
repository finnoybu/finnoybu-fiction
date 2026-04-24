import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/account/', '/api/', '/auth/', '/shop/'],
      },
    ],
    sitemap: 'https://fiction.finnoybu.com/sitemap.xml',
    host: 'https://fiction.finnoybu.com',
  }
}
