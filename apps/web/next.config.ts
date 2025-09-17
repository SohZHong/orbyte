import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;
              script-src * 'unsafe-inline' 'unsafe-eval' data: blob:;
              connect-src *;
              img-src * data: blob:;
              style-src * 'unsafe-inline';
              font-src *;
              frame-src *;
            `
              .replace(/\s+/g, ' ')
              .trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
