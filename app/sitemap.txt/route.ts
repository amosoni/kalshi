import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://www.kalshiai.org';

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
