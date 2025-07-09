import type { Metadata } from 'next';
import '../src/styles/global.css';

export const metadata: Metadata = {
  title: 'Your App',
  description: 'Your app description',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
