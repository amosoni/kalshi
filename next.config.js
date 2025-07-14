module.exports = {
  typescript: { ignoreBuildErrors: true },
  output: 'standalone',
  async rewrites() {
    return [
      // 代理重型/AI/视频相关 API 到 Render
      {
        source: '/api/remove-bg/:path*',
        destination: 'https://api.kalshiai.org/api/remove-bg/:path*',
      },
      {
        source: '/api/points/:path*',
        destination: 'https://api.kalshiai.org/api/points/:path*',
      },
      // 其它如 /api/validate-duration、/api/health、/api/env 保留在 Vercel
      // 认证相关 API（/api/auth/*、/api/login、/api/register）必须留在 Vercel
    ];
  },
};
