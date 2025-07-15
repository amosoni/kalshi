module.exports = {
  typescript: { ignoreBuildErrors: true },
  // output: 'standalone', // 临时注释掉，避免构建问题
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
      {
        source: '/api/validate-duration',
        destination: 'https://api.kalshiai.org/api/validate-duration',
      },
      // 认证相关 API（/api/auth/*、/api/login、/api/register）保留在 Vercel
      // 健康检查等轻量级 API 也保留在 Vercel
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://kalshiai.org',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      },
    ];
  },
};
