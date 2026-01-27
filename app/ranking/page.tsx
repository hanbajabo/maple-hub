import type { Metadata } from 'next';
import RankingClient from '@/components/ranking/RankingClient';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: '메이플스토리 랭킹 | 메이플 허브',
    description: '메이플스토리 종합, 유니온, 길드, 무릉도장, 더 시드, 업적 랭킹을 확인하세요. 실시간 넥슨 공식 랭킹 데이터 제공.',
    keywords: '메이플스토리, 랭킹, 종합랭킹, 유니온랭킹, 길드랭킹, 무릉도장, 더시드, 업적, 넥슨, maplestory',
    openGraph: {
        title: '메이플스토리 랭킹 | 메이플 허브',
        description: '메이플스토리 종합, 유니온, 길드, 무릉도장, 더 시드, 업적 랭킹을 확인하세요.',
        type: 'website',
    }
};

import Link from 'next/link';


export default function RankingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

            <main className="flex-grow">
                <div className="container mx-auto px-4 py-6 sm:py-12">
                    <div className="text-center mb-8 sm:mb-12">
                        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                            🏆 메이플스토리 랭킹
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-purple-200 mb-4">
                            넥슨 공식 API 실시간 랭킹 데이터
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center justify-center">
                            <div className="inline-block bg-purple-500/20 backdrop-blur-sm px-4 py-1.5 sm:px-6 sm:py-2 rounded-full border border-purple-400/30">
                                <p className="text-xs sm:text-sm text-purple-200">
                                    ⚡ 매일 오전 1시(KST) 업데이트
                                </p>
                            </div>
                            <div className="inline-block bg-yellow-500/20 backdrop-blur-sm px-4 py-1.5 sm:px-6 sm:py-2 rounded-full border border-yellow-400/30">
                                <p className="text-xs sm:text-sm text-yellow-200">
                                    📅 전일 데이터 기준
                                </p>
                            </div>
                        </div>
                    </div>

                    <RankingClient />
                </div>
            </main>
            <Footer />
        </div>
    );
}
