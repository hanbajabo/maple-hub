import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "메이플 AI - 메이플스토리 AI 분석 플랫폼",
  description: "메이플스토리 캐릭터 종합 분석 및 성장 가이드 플랫폼. AI 기반 장비 진단, 보스 템 분석, 헥사 스탯 가이드를 제공합니다.",
  verification: {
    other: {
      'naver-site-verification': '1236df81f3db1fb538a03b7db7db28d746fc78d6',
    },
  },
  icons: {
    icon: '/images/maple-ai-logo.jpg',
    shortcut: '/images/maple-ai-logo.jpg',
    apple: '/images/maple-ai-logo.jpg',
  },
  openGraph: {
    title: "메이플 AI - 메이플스토리 AI 분석 플랫폼",
    description: "메이플스토리 캐릭터 종합 분석 및 성장 가이드 플랫폼. AI 기반 장비 진단, 보스 템 분석, 헥사 스탯 가이드를 제공합니다.",
    url: 'https://maple.ai.kr',
    siteName: '메이플 AI',
    images: [
      {
        url: '/images/maple-ai-logo.jpg',
        width: 800,
        height: 600,
        alt: '메이플 AI 로고',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* Google AdSense Script */}
        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6144208174617294"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${notoSansKR.variable} antialiased bg-slate-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
