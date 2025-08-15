import { NextResponse } from 'next/server';

export async function GET() {
  // 始终使用生产域名，避免vercel.app域名出现在RSS中
  const baseUrl = 'https://www.kalshiai.org';

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Kalshi AI - AI Video Background Removal Tool</title>
  <link>${baseUrl}</link>
  <description>Free AI video background removal service, supporting MP4, MOV, AVI and other formats.</description>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <item>
    <title>AI Video Background Removal Tool</title>
    <link>${baseUrl}</link>
    <description>Remove video backgrounds with AI technology</description>
    <pubDate>${new Date().toUTCString()}</pubDate>
  </item>
</channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
