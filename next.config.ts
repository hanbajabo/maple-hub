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
    // 이미지 최적화 완전 비활성화 (넥슨 API 이미지는 이미 최적화됨)
    unoptimized: true,
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
  // 실험적 기능 - 정적 최적화
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
