import type { Metadata } from 'next';
import Script from 'next/script';
import '../src/styles/global.css';

export const metadata: Metadata = {
  title: {
    default: 'Kalshi AI - Free AI Video Background Removal Tool | Online Video Background Remover',
    template: '%s | Kalshi AI',
  },
  description: 'Kalshi AI provides free AI video background removal service, supporting MP4, MOV, AVI and other formats. Quickly remove video backgrounds without downloading software. Professional AI video editing tool to make your video production easier.',
  keywords: [
    'AI video background removal',
    'video background remover',
    'online video editor',
    'AI video processing',
    'video background removal',
    'free video editing tool',
    'video background remover online',
    'AI video background removal tool',
    'video editing software',
    'background removal tool',
  ],
  authors: [{ name: 'Kalshi AI Team' }],
  creator: 'Kalshi AI',
  publisher: 'Kalshi AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.kalshiai.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.kalshiai.org',
    siteName: 'Kalshi AI',
    title: 'Kalshi AI - Free AI Video Background Removal Tool | Online Video Background Remover',
    description: 'Kalshi AI provides free AI video background removal service, supporting MP4, MOV, AVI and other formats. Quickly remove video backgrounds without downloading software.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kalshi AI - AI Video Background Removal Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@kalshiai',
    creator: '@kalshiai',
    title: 'Kalshi AI - Free AI Video Background Removal Tool',
    description: 'Kalshi AI provides free AI video background removal service, supporting multiple video formats, quickly remove video backgrounds.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Kalshi AI',
    'application-name': 'Kalshi AI',
    'msapplication-TileColor': '#6366f1',
    'theme-color': '#6366f1',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              'name': 'Kalshi AI',
              'description': 'Free AI video background removal tool',
              'url': 'https://www.kalshiai.org',
              'applicationCategory': 'MultimediaApplication',
              'operatingSystem': 'Web Browser',
              'offers': {
                '@type': 'Offer',
                'price': '0',
                'priceCurrency': 'USD',
              },
              'creator': {
                '@type': 'Organization',
                'name': 'Kalshi AI',
              },
            }),
          }}
        />
      </head>
      <body>
        {children}

        {/* Google Analytics - 使用 next/script 组件 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XJZT0K82L6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XJZT0K82L6');
          `}
        </Script>

        {/* 百度统计 - 使用 next/script 组件 */}
        <Script id="baidu-analytics" strategy="afterInteractive">
          {`
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?your-baidu-analytics-code";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
