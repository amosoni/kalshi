import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://www.kalshiai.org';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kalshi AI - Free AI Video Background Removal Tool</title>
    <link>${baseUrl}</link>
    <description>Kalshi AI provides free AI video background removal service, supporting MP4, MOV, AVI and other formats. Quickly remove video backgrounds without downloading software.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    
    <item>
      <title>AI Video Background Removal Tool - Free Online Use</title>
      <link>${baseUrl}</link>
      <description>Kalshi AI provides free AI video background removal service, supporting multiple video formats, quickly remove video backgrounds to make your video production easier.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}</guid>
    </item>
    
    <item>
      <title>How to Use AI Video Background Removal Tool</title>
      <link>${baseUrl}/how-it-works</link>
      <description>Detailed tutorial: How to use Kalshi AI's AI video background removal feature, including uploading videos, selecting backgrounds, downloading results and other steps.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}/how-it-works</guid>
    </item>
    
    <item>
      <title>AI Video Background Removal Features</title>
      <link>${baseUrl}/features</link>
      <description>Kalshi AI's AI video background removal features: Support for multiple formats, fast processing, high-quality output, free to use and more.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}/features</guid>
    </item>
    
    <item>
      <title>FAQ - AI Video Background Removal</title>
      <link>${baseUrl}/faq</link>
      <description>Frequently asked questions about AI video background removal, including supported formats, processing time, usage methods and more.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}/faq</guid>
    </item>
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
