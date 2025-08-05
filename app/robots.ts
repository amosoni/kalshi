import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://www.kalshiai.org';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/admin/'],
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/admin/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/admin/'],
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/admin/'],
      },
      {
        userAgent: 'Sogou spider',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/admin/'],
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/admin/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/admin/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/admin/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/admin/'],
      },
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/admin/'],
      },
      {
        userAgent: 'Amazonbot',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/admin/'],
      },
      {
        userAgent: 'Common Crawl',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
