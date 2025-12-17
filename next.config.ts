import type { NextConfig } from "next";

// @ts-ignore - Next.js 설정 타입 확장
const nextConfig: NextConfig = {
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
    // 이미지 최적화 설정
    formats: ['image/webp'],
    minimumCacheTTL: 604800, // 7일
  },
  // 정적 생성 강화
  output: 'standalone',
  // 실험적 기능 - 정적 최적화
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
