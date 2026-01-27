import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import GlobalHeader from "@/components/navigation/GlobalHeader";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | 메이플 AI',
    default: '메이플 AI - 메이플스토리 AI 분석 플랫폼',
  },
  description: "메이플스토리 닉네임만 입력하면 AI가 장비, 스타포스, 잠재능력, 유니온, 헥사 스탯을 정밀 진단합니다. 22성 세팅, 추옵 계산, 보스 스펙 분석까지 한 번에 확인하세요.",
  keywords: ["메이플스토리", "메이플 AI", "장비 진단", "스타포스 시뮬레이터", "헥사 스탯 계산기", "메이플 전적 검색", "보스 스펙", "유니온 배치", "링크 스킬", "무자본 가이드"],
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
    description: "메이플스토리 닉네임만 입력하면 AI가 장비, 스타포스, 잠재능력, 유니온, 헥사 스탯을 정밀 진단합니다. 22성 세팅, 추옵 계산, 보스 스펙 분석까지 한 번에 확인하세요.",
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
        <GlobalHeader />
        {children}
      </body>
    </html>
  );
}
