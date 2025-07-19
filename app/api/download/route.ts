import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response('Missing URL parameter', { status: 400 });
  }

  try {
    // 验证URL是否来自我们的R2存储
    const allowedDomains = [
      'kalshiai.org',
      'api.kalshiai.org',
      'pub-*.r2.dev', // Cloudflare R2 公共域名模式
    ];

    const urlObj = new URL(url);
    const isAllowed = allowedDomains.some((domain) => {
      if (domain.includes('*')) {
        const pattern = domain.replace('*', '.*');
        return new RegExp(pattern).test(urlObj.hostname);
      }
      return urlObj.hostname === domain;
    });

    if (!isAllowed) {
      return new Response('Unauthorized domain', { status: 403 });
    }

    // 代理下载
    const response = await fetch(url, {
      headers: {
        'User-Agent': req.headers.get('user-agent') || 'KalshiAI/1.0',
      },
    });

    if (!response.ok) {
      return new Response(`Failed to fetch: ${response.statusText}`, {
        status: response.status,
      });
    }

    const blob = await response.blob();
    const headers = new Headers();
    headers.set('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
    headers.set('Content-Disposition', `attachment; filename="processed_video.mp4"`);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return new Response(blob, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Download proxy error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
