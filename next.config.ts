import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: '.next_build',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'open.api.nexon.com',
      },
      {
        protocol: 'https',
        hostname: 'rs.nexon.com',
      },
    ],
  },
};

export default nextConfig;
