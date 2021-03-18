module.exports = {
    async rewrites() {
        return [
          {
            source: '/auth/:path*',
            destination: 'http://localhost:3005/:path*',
          },
        ]
      },
  };

