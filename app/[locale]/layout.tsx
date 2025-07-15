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

  // Only support English for now
  if (locale !== 'en') {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        {/* <PostHogProvider> */}
        {_props.children}
        {/* </PostHogProvider> */}
        <DemoBadge />
      </body>
    </html>
  );
}
