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
    return [];
  },
};

export default nextConfig;
