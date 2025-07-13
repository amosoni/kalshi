module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'https://api.kalshiai.org/api/auth/:path*',
      },
    ];
  },
};
