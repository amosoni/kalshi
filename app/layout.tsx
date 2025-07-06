import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import '../src/styles/global.css';

export const metadata: Metadata = {
  title: 'Remove Video Background Online | kalshi ai',
  description: 'Remove video background automatically with kalshi ai. No greenscreen needed. Fast, accurate, and easy to use.',
  keywords: ['kalshi', 'kalshi ai', 'Remove Video Background', 'video background remover', 'AI video editing'],
  openGraph: {
    title: 'Remove Video Background Online | kalshi ai',
    description: 'Remove video background automatically with kalshi ai. No greenscreen needed. Fast, accurate, and easy to use.',
    url: 'https://your-domain.com',
    images: [
      {
        url: 'https://your-domain.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Remove Video Background | kalshi ai',
      },
    ],
  },
  alternates: {
    canonical: 'https://your-domain.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Add any additional head elements or scripts here */}
          {/* Google tag (gtag.js) */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-XJZT0K82L6"></script>
          <script dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XJZT0K82L6');
          ` }}
          />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
