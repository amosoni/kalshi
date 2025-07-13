const createNextIntlPlugin = require('next-intl/plugin');

const nextIntl = createNextIntlPlugin('./next-intl.config.js');

module.exports = nextIntl({
  // 你的其它 Next.js 配置
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // 禁用静态导出，避免预渲染错误
  output: 'standalone',
});
