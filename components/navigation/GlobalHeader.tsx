"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CalculatorMenu from "./CalculatorMenu";

export default function GlobalHeader() {
    const pathname = usePathname();

    // 포트폴리오 페이지에서는 헤더 숨김
    if (pathname?.startsWith('/pf')) {
        return null;
    }

    return (
        <header className="w-full sticky top-0 z-[9999] bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/maple-ai-logo.jpg"
                        alt="메이플 AI 로고"
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg shadow-md border border-slate-700/30"
                    />
                    <span className="text-lg sm:text-2xl font-black tracking-tighter text-maple-orange drop-shadow-sm hidden sm:block">
                        메이플 AI
                    </span>
                </Link>

                {/* Navigation Items */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                    {/* Blog */}
                    <Link
                        href="/blog"
                        className="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-900/20"
                    >
                        <span className="text-base sm:text-lg">📝</span>
                        <span className="hidden sm:inline">블로그</span>
                    </Link>

                    {/* Ranking */}
                    <div className="relative">
                        <Link
                            href="/ranking"
                            className="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-yellow-600/90 hover:bg-yellow-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-lg shadow-yellow-900/20"
                        >
                            <span className="text-base sm:text-lg">🏆</span>
                            <span className="hidden sm:inline">랭킹</span>
                        </Link>
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-lg animate-pulse border border-red-400 pointer-events-none z-10 whitespace-nowrap">
                            NEW!
                        </span>
                    </div>

                    {/* Calculator Dropdown */}
                    <CalculatorMenu />

                    {/* Guide */}
                    <Link
                        href="/guide"
                        className="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-orange-600/90 hover:bg-orange-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-lg"
                    >
                        <span className="text-base sm:text-lg">📚</span>
                        <span className="hidden sm:inline">가이드</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
