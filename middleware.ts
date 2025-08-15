import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 处理根路径访问，确保不会重定向循环
  if (pathname === '/') {
    // 直接返回，不进行重定向
    return NextResponse.next();
  }

  // 处理没有 locale 的路径，重定向到英文版本
  if (!pathname.startsWith('/en') && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
    // 对于页面路径，重定向到英文版本
    if (!pathname.includes('.')) { // 排除静态文件
      const url = request.nextUrl.clone();
      url.pathname = `/en${pathname}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml (sitemap)
     * - robots.txt (robots)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
