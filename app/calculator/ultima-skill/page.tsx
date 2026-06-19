import UltimaSkillCalculator from "@/components/calculator/UltimaSkillCalculator";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export const metadata: Metadata = {
    title: "보약스킬 (울티마 작전 일지) 계산기 | 메이플 AI",
    description: "메이플스토리 여름 이벤트 울티마 작전 일지(보약 스킬) 최적의 칩 분배 트리를 계산해보세요.",
};

export default function UltimaSkillCalculatorPage() {
    return (
        <main className="w-full min-h-screen bg-[#080711] text-slate-100 py-12 px-4">
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
            
            {/* 상단 네비게이션 (뒤로가기) */}
            <div className="max-w-4xl mx-auto relative z-10 flex items-center gap-3 mb-8">
                <Link href="/blog" className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-indigo-500/50 rounded-xl text-sm font-bold text-indigo-300 hover:text-indigo-200 transition-all shadow-sm group">
                    <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    <span>블로그 홈</span>
                </Link>
                <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition-all shadow-sm">
                    <Home className="w-4 h-4" />
                    <span>메인 홈</span>
                </Link>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        보약스킬 최적화 계산기
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base border-l-4 border-indigo-500 pl-4 py-1 bg-indigo-950/20 rounded-r">
                        울티마 작전 일지의 주차별 훈련 칩 획득량과 레벨업 루트를 시뮬레이션 합니다. <br className="hidden sm:block" />
                        가장 효율적인 마스터 순서를 세팅하고 미리 확인해보세요.
                    </p>
                </div>
                <UltimaSkillCalculator />
            </div>
        </main>
    );
}
