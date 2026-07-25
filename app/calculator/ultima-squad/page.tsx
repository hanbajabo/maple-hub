import UltimaSquadCalculator from "@/components/calculator/UltimaSquadCalculator";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home } from "lucide-react";

export const metadata: Metadata = {
    title: "울티마 스쿼드 효율 계산기 | 메이플 AI",
    description: "울티마 스쿼드 스테이지별 골드, 경험치, 마릿수 효율을 계산하세요. 클리어 타임을 입력하면 최적의 사냥터를 알려드립니다.",
};

export default function UltimaSquadCalculatorPage() {
    return (
        <main className="w-full min-h-screen bg-[#080711] text-slate-100 py-12 px-4">
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-yellow-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* 상단 네비게이션 */}
            <div className="max-w-4xl mx-auto relative z-10 flex items-center gap-3 mb-8">
                <Link prefetch={false} href="/blog" className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-yellow-500/50 rounded-xl text-sm font-bold text-yellow-300 hover:text-yellow-200 transition-all shadow-sm group">
                    <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    <span>블로그 홈</span>
                </Link>
                <Link prefetch={false} href="/" className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition-all shadow-sm">
                    <Home className="w-4 h-4" />
                    <span>메인 홈</span>
                </Link>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-yellow-900/50 text-yellow-300 border border-yellow-700/50 font-semibold">계산기</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-900/50 text-emerald-300 border border-emerald-700/50 font-semibold">울티마 스쿼드</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-yellow-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
                        울티마 스쿼드 효율 계산기
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base border-l-4 border-yellow-500 pl-4 py-1 bg-yellow-950/20 rounded-r">
                        클리어 타임을 입력하면 스테이지별 <strong className="text-yellow-300">시간당 골드, 경험치, 마릿수 효율</strong>을 계산해드립니다. <br className="hidden sm:block" />
                        어느 스테이지에서 사냥하는 것이 가장 이득인지 한눈에 확인하세요!
                    </p>

                    <div className="mt-6 mb-2 relative w-full rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
                        <Image 
                            src="/images/ultima-squad-calculator-header.png" 
                            alt="울티마 스쿼드 미니게임 플레이 화면" 
                            width={1200}
                            height={400}
                            style={{ width: '100%', height: 'auto' }}
                            priority
                        />
                    </div>
                </div>
                <UltimaSquadCalculator />

                {/* 클리어 타임 확인 방법 안내 */}
                <div className="mt-12 mb-8 bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 sm:p-6 shadow-xl">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                        <span className="text-sky-400">💡</span>
                        울티마 스쿼드 클리어 타임 확인 방법
                    </h2>
                    <div className="bg-slate-950/60 rounded-xl p-4 mb-4 border border-slate-800/60">
                        <p className="text-slate-300 text-sm leading-relaxed break-keep">
                            <strong className="text-sky-300">[맵]</strong> - 클리어한 <strong className="text-sky-300">[스테이지]</strong> 클릭 - <strong className="text-yellow-300">[베스트 클리어 타임]</strong> 부분을 확인하면 클리어 타임을 확인할 수 있습니다.
                        </p>
                    </div>
                    <div className="relative w-full rounded-xl overflow-hidden border border-slate-700/50 shadow-md">
                        <Image 
                            src="/images/ultima-clear-time-guide.png" 
                            alt="베스트 클리어 타임 확인 방법 안내" 
                            width={1200}
                            height={400}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
