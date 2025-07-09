import type { NextFetchEvent, NextRequest } from 'next/server';
import { detectBot } from '@arcjet/next';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import arcjet from '@/libs/Arcjet';
import { routing } from './libs/I18nRouting';

const handleI18nRouting = createMiddleware(routing);

// Improve security with Arcjet
const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    allow: [
      'CATEGORY:SEARCH_ENGINE',
      'CATEGORY:PREVIEW',
      'CATEGORY:MONITOR',
    ],
  }),
);

export async function middleware(
  request: NextRequest,
  _event: NextFetchEvent,
) {
  if (process.env.ARCJET_KEY) {
    const decision = await aj.protect(request);
    if (decision.isDenied()) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }
  return handleI18nRouting(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!_next|_vercel|monitoring|.*\\..*).*)',
};
