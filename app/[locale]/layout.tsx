import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
// import { PostHogProvider } from '@/components/analytics/PostHogProvider';
import { DemoBadge } from '@/components/DemoBadge';
import '@/styles/global.css';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout(_props: any) {
  const { locale } = _props.params;

  // 支持英文和默认语言，避免重定向问题
  if (locale && locale !== 'en') {
    notFound();
  }

  return (
    <html lang={locale || 'en'}>
      <body>
        {/* <PostHogProvider> */}
        {_props.children}
        {/* </PostHogProvider> */}
        <DemoBadge />
      </body>
    </html>
  );
}
