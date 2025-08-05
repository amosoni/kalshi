import { NextResponse } from 'next/server';

export async function GET() {
  // 始终使用生产域名，避免vercel.app域名出现在sitemap中
  const baseUrl = 'https://www.kalshiai.org';

  const sitemap = `${baseUrl}/
${baseUrl}/about
${baseUrl}/features
${baseUrl}/pricing
${baseUrl}/faq
${baseUrl}/how-it-works
${baseUrl}/testimonials
${baseUrl}/sign-in
${baseUrl}/sign-up`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
