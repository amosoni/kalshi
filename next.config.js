module.exports = {
  typescript: { ignoreBuildErrors: true },
  output: 'standalone', // 取消注释，确保 Render 部署可用
  async rewrites() {
    return [
      // 代理重型/AI/视频相关 API 到 Render
      {
        source: '/api/remove-bg/:path*',
        destination: 'https://api.kalshiai.org/api/remove-bg/:path*',
      },
      // 积分API保留在Vercel，不代理到Render
      // {
      //   source: '/api/points/:path*',
      //   destination: 'https://api.kalshiai.org/api/points/:path*',
      // },
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
