'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, TrendingUp, DollarSign, Zap, Target, AlertCircle, CheckCircle, Crown, Calculator, Trophy, Sparkles, ArrowUpDown } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function ExpProductEfficiency() {
    const [absSortBy, setAbsSortBy] = useState<'280' | '285' | '290' | null>(null);
    const [effSortBy, setEffSortBy] = useState<'280' | '285' | '290' | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 sm:mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">블로그로 돌아가기</span>
                    </Link>
                </div>
            </div>

            {/* Article */}
            <article className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-12">
                {/* Title Section */}
                <header className="mb-8">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full">
                            💰 가성비 분석
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">
                            경험치 가이드
                        </span>
                        <span className="text-slate-500 text-sm">2026년 1월 15일</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight">
                        💸 메이플 경험치 상품 효율 완벽 분석
                    </h1>
                    <p className="text-base sm:text-lg text-slate-400">
                        모멘텀 패스 효율, 챌린저스 듀오 효율, 익스프레스 패스 효율 완벽 비교! 상급 EXP로 환산한 가성비 순위와 레벨대별 최적화 전략
                    </p>
                    <p className="text-xs text-slate-500 mt-3 sm:mt-4">
                        ※ 본 글은 메이플 인벤 '콴다'님의 [경험치BM별 상급EXP 효율비교] 게시글을 참고하여 작성되었습니다.
                    </p>
                </header>

                {/* 경험치 상품 소개 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-blue-500/50 rounded-xl p-4 sm:p-6 md:p-8">
                        {/* 이미지 */}
                        <div className="mb-6">
                            <Image
                                src="/images/blog/exp_product_items.png"
                                alt="메이플스토리 경험치 상품 - 챌린저스 EXP 듀오, 익스프레스 패스, 모멘텀 패스"
                                width={1200}
                                height={300}
                                className="mx-auto rounded-lg"
                            />
                        </div>

                        {/* 소개 텍스트 */}
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                            이 가이드는 무엇인가요?
                        </h2>
                        <div className="space-y-3 text-slate-300">
                            <p className="leading-relaxed">
                                메이플스토리에서 <strong className="text-yellow-400">"돈을 어디에 써야 가장 빨리, 그리고 싸게 레벨업을 할 수 있는가?"</strong>는 모든 유저의 고민입니다.
                            </p>
                            <p className="leading-relaxed">
                                이 가이드는 <strong className="text-green-400">챌린저스 EXP 듀오, 모멘텀 패스, 익스프레스 패스, 에픽 던전 리워드, 메카베리 농장, 몬스터파크</strong> 등 메이플스토리의 모든 경험치 상품을 <strong className="text-purple-400">상급 EXP로 환산</strong>하여 가성비를 비교합니다.
                            </p>
                            <p className="leading-relaxed">
                                특히 <strong className="text-yellow-400">모멘텀 패스 효율</strong>, <strong className="text-cyan-400">챌린저스 듀오 효율</strong>, <strong className="text-pink-400">익스프레스 패스 효율(익부 효율)</strong>, <strong className="text-orange-400">에픽 던전 효율(악몽선경 효율)</strong>, <strong className="text-emerald-400">메카베리 효율</strong>, <strong className="text-blue-400">몬스터파크 효율(몬파 효율)</strong>을 정확히 분석하여, <strong className="text-indigo-400">280~284, 285~289, 290+ 레벨 구간별</strong>로 달라지는 효율을 상세히 제시합니다.
                            </p>
                            <p className="leading-relaxed">
                                <strong className="text-red-400">사냥 광, 가성비 유저, 지갑전사</strong> 등 유저 타입별 최적 전략까지 제시하여, 본인에게 딱 맞는 경험치 상품 조합을 찾을 수 있습니다.
                            </p>
                            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 mt-4">
                                <p className="text-sm">
                                    💡 <strong className="text-blue-400">핵심 포인트:</strong> 본인의 플레이 스타일과 레벨 구간에 맞는 최적의 조합을 찾아보세요!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 재화 환산 기준 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-green-900/30 border-2 border-blue-500/50 rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-blue-400" />
                            </div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-blue-400">
                                💰 재화 환산 기준 (가정)
                            </h2>
                        </div>

                        <div className="bg-slate-900/70 rounded-xl p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <p className="text-slate-300"><strong className="text-yellow-400">1억 메소</strong> = <strong className="text-green-400">1,500 캐시</strong></p>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <p className="text-slate-300"><strong className="text-yellow-400">1억 메소</strong> = <strong className="text-purple-400">2,000 메이플포인트</strong></p>
                            </div>
                            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 mt-4">
                                <p className="text-sm text-slate-400">
                                    💡 <strong className="text-blue-400">참고:</strong> 이에 따라 <strong className="text-purple-400">1 메이플포인트</strong>는 약 <strong className="text-green-400">0.75 캐시</strong>의 가치로 환산되어 계산
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 경험치 절대량 표 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-blue-900/30 border-2 border-purple-500/50 rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-purple-400" />
                            </div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-purple-400">
                                🍁 상급 EXP 환산 절대량 표
                            </h2>
                        </div>

                        <div className="mb-6 bg-pink-900/30 border border-pink-500/50 rounded-lg p-4">
                            <p className="text-sm text-slate-300">
                                <span className="text-pink-400 font-bold">💡 절대량이란?</span> 해당 상품을 구매했을 때 실제로 획득할 수 있는 경험치를 상급 EXP 개수로 환산한 수치입니다.
                            </p>
                        </div>

                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-xs sm:text-sm">
                                        <thead>
                                            <tr className="bg-slate-800/50 border-b-2 border-purple-500/30">
                                                <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-purple-400 font-bold whitespace-nowrap">순위</th>
                                                <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-purple-400 font-bold whitespace-nowrap">콘텐츠명</th>
                                                <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-purple-400 font-bold whitespace-nowrap">상세</th>
                                                <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-purple-400 font-bold whitespace-nowrap">가격</th>
                                                <th
                                                    className="px-2 sm:px-3 py-2 sm:py-3 text-center text-purple-400 font-bold whitespace-nowrap cursor-pointer hover:text-purple-300 transition-colors"
                                                    onClick={() => setAbsSortBy(absSortBy === '280' ? null : '280')}
                                                >
                                                    <div className="flex items-center justify-center gap-1">
                                                        <span>280~284</span>
                                                        <ArrowUpDown className="w-3 h-3" />
                                                    </div>
                                                </th>
                                                <th
                                                    className="px-2 sm:px-3 py-2 sm:py-3 text-center text-purple-400 font-bold whitespace-nowrap cursor-pointer hover:text-purple-300 transition-colors"
                                                    onClick={() => setAbsSortBy(absSortBy === '285' ? null : '285')}
                                                >
                                                    <div className="flex items-center justify-center gap-1">
                                                        <span>285~289</span>
                                                        <ArrowUpDown className="w-3 h-3" />
                                                    </div>
                                                </th>
                                                <th
                                                    className="px-2 sm:px-3 py-2 sm:py-3 text-center text-purple-400 font-bold whitespace-nowrap cursor-pointer hover:text-purple-300 transition-colors"
                                                    onClick={() => setAbsSortBy(absSortBy === '290' ? null : '290')}
                                                >
                                                    <div className="flex items-center justify-center gap-1">
                                                        <span>290+</span>
                                                        <ArrowUpDown className="w-3 h-3" />
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/50">
                                            {(() => {
                                                const data = [
                                                    { rank: 1, name: '모멘텀 패스', detail: '경쿠 제외', price: '50,000 캐시', abs280: 51240, abs285: 65320, abs290: 70013 },
                                                    { rank: 2, name: '익스프레스 패스', detail: '캐시 구매', price: '30,000 캐시', abs280: 24320, abs285: 24320, abs290: 24320 },
                                                    { rank: 3, name: '챌린저스 EXP 듀오', detail: '64.5만 마리', price: '10,000 캐시', abs280: 16000, abs285: 16000, abs290: 16000 },
                                                    { rank: 4, name: '챌린저스 EXP 듀오', detail: '60만 마리', price: '10,000 캐시', abs280: 15245, abs285: 15245, abs290: 15245 },
                                                    { rank: 5, name: '챌린저스 EXP 듀오', detail: '50만 마리', price: '10,000 캐시', abs280: 13567, abs285: 13567, abs290: 13567 },
                                                    { rank: 6, name: '챌린저스 EXP 듀오', detail: '40만 마리', price: '10,000 캐시', abs280: 11889, abs285: 11889, abs290: 11889 },
                                                    { rank: 7, name: '챌린저스 EXP 듀오', detail: '30만 마리', price: '10,000 캐시', abs280: 10211, abs285: 10211, abs290: 10211 },
                                                    { rank: 8, name: '챌린저스 EXP 듀오', detail: '20만 마리', price: '10,000 캐시', abs280: 8533, abs285: 8533, abs290: 8533 },
                                                    { rank: 9, name: '챌린저스 EXP 듀오', detail: '10만 마리', price: '10,000 캐시', abs280: 6855, abs285: 6855, abs290: 6855 },
                                                    { rank: 10, name: '메카베리 농장', detail: '메소 구매', price: '5억 메소', abs280: 4224, abs285: 5632, abs290: 6101 },
                                                    { rank: 11, name: '악몽선경', detail: '0→1', price: '12,500 메포', abs280: 5376, abs285: 5376, abs290: 5376 },
                                                    { rank: 11, name: '악몽선경', detail: '1→2', price: '37,500 메포', abs280: 5376, abs285: 5376, abs290: 5376 },
                                                    { rank: 13, name: '앵글러 컴퍼니', detail: '0→1', price: '10,000 메포', abs280: 4032, abs285: 4032, abs290: 4032 },
                                                    { rank: 13, name: '앵글러 컴퍼니', detail: '1→2', price: '30,000 메포', abs280: 4032, abs285: 4032, abs290: 4032 },
                                                    { rank: 15, name: '하이마운틴', detail: '0→1', price: '7,500 메포', abs280: 2688, abs285: 2688, abs290: 2688 },
                                                    { rank: 15, name: '하이마운틴', detail: '1→2', price: '22,500 메포', abs280: 2688, abs285: 2688, abs290: 2688 },
                                                    { rank: 17, name: '몬스터 파크', detail: '썬데이메이플(4.8배)', price: '600 메포', abs280: 648, abs285: 816, abs290: 970 },
                                                    { rank: 18, name: '몬스터 파크', detail: '일요일+보약(2.3배)', price: '600 메포', abs280: 310, abs285: 391, abs290: 465 },
                                                    { rank: 19, name: '사우나', detail: '1시간', price: '3,000 메포', abs280: 410, abs285: 410, abs290: 410 },
                                                    { rank: 20, name: '몬스터 파크', detail: '평일 보약(1.7배)', price: '600 메포', abs280: 230, abs285: 289, abs290: 343 },
                                                    { rank: 21, name: '익스프레스 부스터', detail: '메소 구매', price: '3,000만 메소', abs280: 205, abs285: 205, abs290: 205 },
                                                    { rank: 22, name: '몬스터 파크', detail: '기본배율', price: '600 메포', abs280: 135, abs285: 170, abs290: 202 },
                                                ];

                                                let sortedData = [...data];
                                                if (absSortBy === '280') {
                                                    sortedData.sort((a, b) => b.abs280 - a.abs280);
                                                } else if (absSortBy === '285') {
                                                    sortedData.sort((a, b) => b.abs285 - a.abs285);
                                                } else if (absSortBy === '290') {
                                                    sortedData.sort((a, b) => b.abs290 - a.abs290);
                                                }

                                                return sortedData.map((item, idx) => (
                                                    <tr key={idx} className="bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                                                        <td className="px-2 sm:px-3 py-2 sm:py-3">
                                                            <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold text-xs sm:text-sm">
                                                                {absSortBy ? idx + 1 : item.rank}
                                                            </span>
                                                        </td>
                                                        <td className="px-2 sm:px-3 py-2 sm:py-3 font-bold text-white text-xs sm:text-sm">{item.name}</td>
                                                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-slate-300 text-xs sm:text-sm">{item.detail}</td>
                                                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-green-400 text-xs sm:text-sm whitespace-nowrap">{item.price}</td>
                                                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-center text-slate-200 font-mono text-xs sm:text-sm">{item.abs280.toLocaleString()}</td>
                                                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-center text-slate-200 font-mono text-xs sm:text-sm">{item.abs285.toLocaleString()}</td>
                                                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-center text-slate-200 font-mono text-xs sm:text-sm">{item.abs290.toLocaleString()}</td>
                                                    </tr>
                                                ));
                                            })()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AdSense Ad */}
                <InArticleAd
                    dataAdSlot="8162808816"
                    className="my-12"
                />

                {/* 효율 순위표 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-yellow-900/30 via-orange-900/20 to-red-900/30 border-2 border-yellow-500/50 rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-yellow-400" />
                            </div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-yellow-400">
                                🍁 상급 EXP 환산 효율표
                            </h2>
                        </div>

                        <div className="mb-6 bg-orange-900/30 border border-orange-500/50 rounded-lg p-4">
                            <p className="text-sm text-slate-300">
                                <span className="text-orange-400 font-bold">💡 효율 수치란?</span> 1만 캐시당 획득할 수 있는 경험치를 상급 EXP 개수로 환산한 수치입니다. 숫자가 높을수록 가성비가 좋습니다!
                            </p>
                        </div>

                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-xs sm:text-sm">
                                        <thead>
                                            <tr className="bg-slate-800/50 border-b-2 border-yellow-500/30">
                                                <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-yellow-400 font-bold whitespace-nowrap">순위</th>
                                                <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-yellow-400 font-bold whitespace-nowrap">콘텐츠명</th>
                                                <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-yellow-400 font-bold whitespace-nowrap">상세</th>
                                                <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-yellow-400 font-bold whitespace-nowrap">가격</th>
                                                <th
                                                    className="px-2 sm:px-3 py-2 sm:py-3 text-center text-yellow-400 font-bold whitespace-nowrap cursor-pointer hover:text-yellow-300 transition-colors"
                                                    onClick={() => setEffSortBy(effSortBy === '280' ? null : '280')}
                                                >
                                                    <div className="flex items-center justify-center gap-1">
                                                        <span>280~284</span>
                                                        <ArrowUpDown className="w-3 h-3" />
                                                    </div>
                                                </th>
                                                <th
                                                    className="px-2 sm:px-3 py-2 sm:py-3 text-center text-yellow-400 font-bold whitespace-nowrap cursor-pointer hover:text-yellow-300 transition-colors"
                                                    onClick={() => setEffSortBy(effSortBy === '285' ? null : '285')}
                                                >
                                                    <div className="flex items-center justify-center gap-1">
                                                        <span>285~289</span>
                                                        <ArrowUpDown className="w-3 h-3" />
                                                    </div>
                                                </th>
                                                <th
                                                    className="px-2 sm:px-3 py-2 sm:py-3 text-center text-yellow-400 font-bold whitespace-nowrap cursor-pointer hover:text-yellow-300 transition-colors"
                                                    onClick={() => setEffSortBy(effSortBy === '290' ? null : '290')}
                                                >
                                                    <div className="flex items-center justify-center gap-1">
                                                        <span>290+</span>
                                                        <ArrowUpDown className="w-3 h-3" />
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/50">
                                            {(() => {
                                                const data = [
                                                    { rank: 1, name: '몬스터 파크', detail: '썬데이메이플(4.8배)', price: '600 메포', eff280: 14400, eff285: 18134, eff290: 21547, tier: 'S' },
                                                    { rank: 2, name: '챌린저스 EXP 듀오', detail: '64.5만 마리', price: '10,000 캐시', eff280: 16000, eff285: 16000, eff290: 16000, tier: 'S' },
                                                    { rank: 3, name: '챌린저스 EXP 듀오', detail: '60만 마리', price: '10,000 캐시', eff280: 15245, eff285: 15245, eff290: 15245, tier: 'S' },
                                                    { rank: 4, name: '모멘텀 패스', detail: '경쿠 제외', price: '50,000 캐시', eff280: 10248, eff285: 13064, eff290: 14003, tier: 'A' },
                                                    { rank: 5, name: '챌린저스 EXP 듀오', detail: '50만 마리', price: '10,000 캐시', eff280: 13567, eff285: 13567, eff290: 13567, tier: 'A' },
                                                    { rank: 6, name: '챌린저스 EXP 듀오', detail: '40만 마리', price: '10,000 캐시', eff280: 11889, eff285: 11889, eff290: 11889, tier: 'A' },
                                                    { rank: 7, name: '챌린저스 EXP 듀오', detail: '30만 마리', price: '10,000 캐시', eff280: 10211, eff285: 10211, eff290: 10211, tier: 'A' },
                                                    { rank: 8, name: '몬스터 파크', detail: '일요일+보약(2.3배)', price: '600 메포', eff280: 6900, eff285: 8689, eff290: 10325, tier: 'A' },
                                                    { rank: 9, name: '챌린저스 EXP 듀오', detail: '20만 마리', price: '10,000 캐시', eff280: 8533, eff285: 8533, eff290: 8533, tier: 'B' },
                                                    { rank: 10, name: '하이마운틴', detail: '0→1', price: '7,500 메포', eff280: 8335, eff285: 8335, eff290: 8335, tier: 'B' },
                                                    { rank: 11, name: '메카베리 농장', detail: '메소 구매', price: '5억 메소', eff280: 5632, eff285: 7509, eff290: 8135, tier: 'B' },
                                                    { rank: 12, name: '익스프레스 패스', detail: '캐시 구매', price: '30,000 캐시', eff280: 8107, eff285: 8107, eff290: 8107, tier: 'B' },
                                                    { rank: 13, name: '앵글러 컴퍼니', detail: '0→1', price: '10,000 메포', eff280: 7906, eff285: 7906, eff290: 7906, tier: 'B' },
                                                    { rank: 14, name: '몬스터 파크', detail: '평일 보약(1.7배)', price: '600 메포', eff280: 5111, eff285: 6422, eff290: 7621, tier: 'B' },
                                                    { rank: 15, name: '악몽선경', detail: '0→1', price: '12,500 메포', eff280: 7708, eff285: 7708, eff290: 7708, tier: 'B' },
                                                    { rank: 16, name: '챌린저스 EXP 듀오', detail: '10만 마리', price: '10,000 캐시', eff280: 6855, eff285: 6855, eff290: 6855, tier: 'C' },
                                                    { rank: 17, name: '익스프레스 부스터', detail: '메소 구매', price: '3,000만 메소', eff280: 4556, eff285: 4556, eff290: 4556, tier: 'C' },
                                                    { rank: 18, name: '몬스터 파크', detail: '기본배율', price: '600 메포', eff280: 3000, eff285: 3778, eff290: 4489, tier: 'D' },
                                                    { rank: 19, name: '악몽선경', detail: '1→2', price: '37,500 메포', eff280: 2090, eff285: 2090, eff290: 2090, tier: 'F' },
                                                    { rank: 20, name: '앵글러 컴퍼니', detail: '1→2', price: '30,000 메포', eff280: 2006, eff285: 2006, eff290: 2006, tier: 'F' },
                                                    { rank: 21, name: '하이마운틴', detail: '1→2', price: '22,500 메포', eff280: 1857, eff285: 1857, eff290: 1857, tier: 'F' },
                                                    { rank: 22, name: '사우나', detail: '1시간', price: '3,000 메포', eff280: 1822, eff285: 1822, eff290: 1822, tier: 'F' },
                                                ];

                                                let sortedData = [...data];
                                                if (effSortBy === '280') {
                                                    sortedData.sort((a, b) => b.eff280 - a.eff280);
                                                } else if (effSortBy === '285') {
                                                    sortedData.sort((a, b) => b.eff285 - a.eff285);
                                                } else if (effSortBy === '290') {
                                                    sortedData.sort((a, b) => b.eff290 - a.eff290);
                                                }

                                                const getTierColor = (tier: string) => {
                                                    switch (tier) {
                                                        case 'S': return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50';
                                                        case 'A': return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/50';
                                                        case 'B': return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/50';
                                                        case 'C': return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50';
                                                        default: return 'bg-slate-800/30 border-slate-700/50';
                                                    }
                                                };

                                                return sortedData.map((item, idx) => (
                                                    <tr key={idx} className={`border ${getTierColor(item.tier)} hover:bg-slate-800/50 transition-colors`}>
                                                        <td className="px-2 sm:px-3 py-2 sm:py-3">
                                                            <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-xs sm:text-sm">
                                                                {effSortBy ? idx + 1 : item.rank}
                                                            </span>
                                                        </td>
                                                        <td className="px-2 sm:px-3 py-2 sm:py-3 font-bold text-white text-xs sm:text-sm">{item.name}</td>
                                                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-slate-300 text-xs sm:text-sm">{item.detail}</td>
                                                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-green-400 text-xs sm:text-sm whitespace-nowrap">{item.price}</td>
                                                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-center text-slate-200 font-mono text-xs sm:text-sm">{item.eff280.toLocaleString()}</td>
                                                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-center text-slate-200 font-mono text-xs sm:text-sm">{item.eff285.toLocaleString()}</td>
                                                        <td className="px-2 sm:px-3 py-2 sm:py-3 text-center text-slate-200 font-mono text-xs sm:text-sm">{item.eff290.toLocaleString()}</td>
                                                    </tr>
                                                ));
                                            })()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 290레벨 이상 고레벨 분석 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-red-900/30 via-orange-900/20 to-yellow-900/30 border-2 border-red-500/50 rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                                <Crown className="w-6 h-6 text-red-400" />
                            </div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-red-400">
                                290레벨 이상 고레벨 구간 전략
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {/* 핵심 요약 */}
                            <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border-2 border-yellow-400 rounded-xl p-6">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-yellow-400 mb-3 sm:mb-4 flex items-center gap-2">
                                    <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                                    ⚡ 핵심 3줄 요약
                                </h3>
                                <div className="space-y-3 text-slate-300">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                        <p><strong className="text-white">최고 효율은 <span className="text-yellow-400">몬스터파크 썬데이메이플</span>:</strong> 효율 1위(21,547)이지만, 일요일 + 이벤트 조건이 필요합니다. 일요일에 몬파는 필수!</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                        <p><strong className="text-white">현실적 1티어는 <span className="text-purple-400">모멘텀 패스</span>:</strong> 가성비(4위, 14,003)와 경험치 양(1위, 70,013)을 모두 잡은 필수 구매 상품입니다.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                        <p><strong className="text-white"><span className="text-cyan-400">익스프레스 패스</span>는 시간을 사는 템:</strong> 가성비는 평범하지만, 챌린저스 EXP 듀오 64.5만 마리의 1.5배급의 경험치를 쉬운 부스터 사냥으로 얻을 수 있습니다.</p>
                                    </div>
                                </div>
                            </div>

                            {/* 상세 분석 */}
                            <div className="bg-slate-900/50 rounded-xl p-6">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                                    📊 상세 데이터 분석
                                </h3>

                                <div className="space-y-6">
                                    {/* 0. 몬스터파크 */}
                                    <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-5">
                                        <h4 className="font-bold text-yellow-400 mb-3">0. '몬스터파크' - 일요일의 숨은 보석</h4>
                                        <div className="space-y-2 text-sm text-slate-300">
                                            <p><strong className="text-white">기본 효율 (평일): 4,489</strong> - 하위권 효율</p>
                                            <p><strong className="text-white">평일 보약(1.7배): 7,621</strong> - B티어 효율</p>
                                            <p><strong className="text-white">일요일 + 보약버프 (2.3배): 10,325</strong> - A티어 효율!</p>
                                            <p><strong className="text-white">썬데이메이플 (4.8배): 21,547</strong> - <strong className="text-red-400">압도적 1위!</strong></p>
                                            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-3 mt-3">
                                                <p className="text-yellow-400 font-bold mb-2">💡 일요일 활용 팁:</p>
                                                <ul className="list-disc list-inside space-y-1">
                                                    <li>일요일에는 기본 50%p 추가 경험치가 제공됩니다</li>
                                                    <li>평일에도 보약 버프(70%p 추가)로 1.7배 효율 가능</li>
                                                    <li>이벤트 보약 버프(80%p)와 함께 사용하면 2.3배 효율</li>
                                                    <li>스페셜 선데이 메이플 이벤트 시 250%p 추가로 4.8배!</li>
                                                    <li>썬데이메이플 이벤트가 있다면 모든 유저 필수!</li>
                                                </ul>
                                            </div>
                                            <p className="text-green-400 font-bold">결론: 평일에는 보약 버프가 있을 때만, 일요일에는 무조건 집중하는 것이 효율적입니다.</p>

                                        </div>
                                    </div>

                                    {/* 1. 사냥 vs 현질 */}
                                    <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-5">
                                        <h4 className="font-bold text-blue-400 mb-3">1. 사냥(챌린저스 EXP 듀오) vs 현질(던전/패스)의 기준점</h4>
                                        <div className="space-y-2 text-sm text-slate-300">
                                            <p><strong className="text-white">20만 마리 구간 (효율 8,533):</strong> 이 지점이 '사냥이냐 현질이냐'의 분기점입니다.</p>
                                            <p>사냥을 <strong className="text-yellow-400">20만 마리 미만(라이트 유저)</strong>으로 한다면, 굳이 챌린저스 EXP 듀오를 살 필요 없이 <strong className="text-green-400">'에픽던전'</strong>이나 <strong className="text-green-400">'익스프레스 패스'</strong>를 사는 게 효율이 더 좋습니다.</p>
                                            <p>반대로 20만 마리 이상 사냥한다면, 그때부터는 에픽 던전보다 챌린저스 EXP 듀오의 가성비가 좋아지기 시작합니다.</p>
                                        </div>
                                    </div>

                                    {/* 2. 모멘텀 패스 */}
                                    <div className="bg-purple-900/20 border border-purple-500/50 rounded-lg p-5">
                                        <h4 className="font-bold text-purple-400 mb-3">2. '모멘텀 패스'의 독보적 위엄</h4>
                                        <div className="space-y-2 text-sm text-slate-300">
                                            <p><strong className="text-white">효율 4위 (14,003) / 획득량 1위 (70,013)</strong></p>
                                            <p>챌린저스 EXP 듀오로 <strong className="text-yellow-400">'초월적 사냥(64.5만 마리)'</strong>을 해야 얻는 경험치의 <strong className="text-red-400">4.3배</strong>를 패스 하나로 얻습니다.</p>
                                            <p>가격이 5만 원으로 비싸 보이지만, 290레벨 이상에서는 가성비도 최상위권이므로 <strong className="text-green-400">가장 먼저 구매해야 할 0순위</strong>입니다.</p>
                                        </div>
                                    </div>

                                    {/* 3. 메카베리 농장 */}
                                    <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-5">
                                        <h4 className="font-bold text-green-400 mb-3">3. 레벨 290의 변수, '메카베리 농장'</h4>
                                        <div className="space-y-2 text-sm text-slate-300">
                                            <p>280레벨 구간에서는 효율이 5,000대(하위권)로 낮아 추천하기 어렵습니다.</p>
                                            <p>하지만 <strong className="text-yellow-400">290레벨 이상</strong>이 되면 효율이 <strong className="text-green-400">8,135</strong>로 급상승하여 익스프레스 패스나 에픽 던전 리워드(앵컴, 악선)보다 더 좋은 효율을 보여줍니다.</p>
                                            <p className="text-green-400 font-bold">290레벨 유저라면 메카베리 농장은 꼭 챙겨야 합니다.</p>
                                        </div>
                                    </div>

                                    {/* 4. 에픽 던전 */}
                                    <div className="bg-orange-900/20 border border-orange-500/50 rounded-lg p-5">
                                        <h4 className="font-bold text-orange-400 mb-3">4. 에픽 던전 (하마, 앵컴, 악선) 투자 전략</h4>
                                        <div className="space-y-3 text-sm text-slate-300">
                                            <p className="text-blue-400 mb-2">💡 에픽 던전은 한 캐릭터당 1회만 입장 가능하며, 메이플포인트로 보너스 리워드를 추가 구매할 수 있습니다.</p>
                                            <div>
                                                <p className="text-green-400 font-bold mb-1">✅ 0→1 (첫 번째 보너스 리워드 구매):</p>
                                                <p>효율이 7,000~8,000대로 준수합니다. 사냥을 많이 못 하는 유저에게는 꿀 같은 경험치 수급처입니다.</p>
                                            </div>
                                            <div>
                                                <p className="text-red-400 font-bold mb-1">❌ 1→2 (두 번째 보너스 리워드 추가 구매):</p>
                                                <p><strong className="text-red-400">비추천입니다.</strong> 효율이 2,000대로 급락합니다. 돈이 정말 많아서 경험치 1%가 급한 게 아니라면 첫 번째 보너스 리워드까지만 구매하는 것이 정석입니다.</p>
                                            </div>
                                            <p className="text-yellow-400 font-bold">메포 가성비 순서: 하이마운틴 &gt; 앵글러 컴퍼니 &gt; 악몽선경</p>
                                            <p className="text-purple-400 font-bold">절대적 경험치량 순서: 악몽선경 &gt; 앵글러 컴퍼니 &gt; 하이마운틴</p>
                                        </div>
                                    </div>

                                    {/* 5. 익스프레스 부스터 */}
                                    <div className="bg-pink-900/20 border border-pink-500/50 rounded-lg p-5">
                                        <h4 className="font-bold text-pink-400 mb-3">5. 익스프레스 패스의 재발견</h4>
                                        <div className="space-y-2 text-sm text-slate-300">
                                            <p>가성비 순위는 12위지만, <strong className="text-yellow-400">획득 절대량(24,320)</strong>은 모멘텀 패스 다음으로 높습니다.</p>
                                            <p>챌린저스 EXP 듀오 20만 마리(적당히 사냥) 효율과 비슷하면서도, 획득량은 3배 가까이 많습니다.</p>
                                            <p className="text-green-400 font-bold">즉, "바쁨 직장인이 돈으로 시간을 사서 레벨업을 따라잡는 용도"로 가장 적합합니다.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 유저 타입별 추천 */}
                            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-2 border-purple-400 rounded-xl p-6">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-purple-400 mb-3 sm:mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                                    💡 유저 타입별 추천 루트
                                </h3>

                                <div className="space-y-4">
                                    {/* 사냥 광 */}
                                    <div className="bg-slate-900/70 rounded-lg p-4">
                                        <h4 className="font-bold text-yellow-400 mb-2">🔥 시간 빌게이츠 (사냥 광)</h4>
                                        <p className="text-sm text-slate-300 mb-2"><strong className="text-green-400">추천:</strong> 챌린저스 EXP 듀오(풀사냥) + 모멘텀 패스</p>
                                        <p className="text-xs text-slate-400"><strong>논리:</strong> 사냥만으로도 이미 최고 효율을 뽑고 있으므로, 효율 2, 4위만 챙기면 됩니다. (일요일에 몬파 추가!)</p>
                                    </div>

                                    {/* 가성비 유저 */}
                                    <div className="bg-slate-900/70 rounded-lg p-4">
                                        <h4 className="font-bold text-blue-400 mb-2">📊 효율 중시형 (가성비 유저)</h4>
                                        <p className="text-sm text-slate-300 mb-2"><strong className="text-green-400">추천:</strong> 모멘텀 패스 + 하이마운틴(0→1) + 챌린저스 EXP 듀오(본인 사냥량에 따라 선택)</p>
                                        <p className="text-xs text-slate-400"><strong>논리:</strong> 효율 14,000 패스와 8,300이상 하이마운틴만 EXP 1단계 보너스만 챙기고, 사냥은 20만 마리 넘길 때만 챌린저스 EXP 듀오를 씁니다.</p>
                                    </div>

                                    {/* 지갑전사 */}
                                    <div className="bg-slate-900/70 rounded-lg p-4">
                                        <h4 className="font-bold text-purple-400 mb-2">💳 지갑전사 (시간 부족, 빠른 렙업)</h4>
                                        <p className="text-sm text-slate-300 mb-2"><strong className="text-green-400">추천:</strong> 모멘텀 패스 + 익스프레스 패스 + 에픽던전 (악몽선경 0→1) + 메카베리 농장</p>
                                        <p className="text-xs text-slate-400"><strong>논리:</strong> 효율 7,000 이상인 상품을 싹쓸이하여 사냥 없이도 대량의 경험치를 확보합니다. 에픽던전 1→2는 진짜 경험치가 급하면 이용하세요.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AdSense Ad */}
                <InArticleAd
                    dataAdSlot="8162808816"
                    className="my-12"
                />

                {/* 280~289 레벨 분석 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-green-900/30 via-emerald-900/20 to-teal-900/30 border-2 border-green-500/50 rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <Calculator className="w-6 h-6 text-green-400" />
                            </div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-green-400">
                                280~289 레벨 구간 전략
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {/* 핵심 요약 */}
                            <div className="bg-gradient-to-r from-teal-900/50 to-cyan-900/50 border-2 border-teal-400 rounded-xl p-6">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-teal-400 mb-3 sm:mb-4 flex items-center gap-2">
                                    <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                                    ⚡ 280레벨+ 핵심 3줄 요약
                                </h3>
                                <div className="space-y-3 text-slate-300">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                        <p><strong className="text-white">메카베리 농장은 함정 카드:</strong> 280~284 구간에서는 가성비가 최악(10만 마리 사냥보다 못함)입니다. 285 넘어서 고민하세요.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                        <p><strong className="text-white">모멘텀 패스의 위상 변화:</strong> 여전히 획득량 1위지만, 가성비는 '챌린저스 EXP 듀오 30만 마리' 수준으로 내려옵니다. (290때는 50만 마리급)</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                        <p><strong className="text-white">고정값 콘텐츠의 상대적 떡상:</strong> 레벨빨을 못 받는 구간이라, 고정 효율을 내는 <strong className="text-green-400">에픽던전(하마/앵컴/악선)</strong>과 부스터의 가치가 상대적으로 더 높습니다.</p>
                                    </div>
                                </div>
                            </div>

                            {/* 상세 분석 */}
                            <div className="bg-slate-900/50 rounded-xl p-6">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                                    📊 상세 데이터 분석 (280~289 구간)
                                </h3>

                                <div className="space-y-6">
                                    {/* 0. 몬스터파크 */}
                                    <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-5">
                                        <h4 className="font-bold text-yellow-400 mb-3">0. '몬스터파크' - 280~289 구간에서도 일요일은 필수</h4>
                                        <div className="space-y-2 text-sm text-slate-300">
                                            <p><strong className="text-white">기본 효율 (평일): 3,000~3,778</strong> - 최하위권</p>
                                            <p><strong className="text-white">평일 보약(1.7배): 5,111~6,422</strong> - C~B티어 효율</p>
                                            <p><strong className="text-white">일요일 + 보약버프 (2.3배): 6,900~8,689</strong> - B~A티어 효율</p>
                                            <p><strong className="text-white">썬데이메이플 (4.8배): 14,400~18,134</strong> - <strong className="text-red-400">전체 1~2위권!</strong></p>
                                            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-3 mt-3">
                                                <p className="text-yellow-400 font-bold mb-2">💡 280레벨대 활용 팁:</p>
                                                <ul className="list-disc list-inside space-y-1">
                                                    <li>280~289 구간에서도 일요일 효율은 동일하게 적용됩니다</li>
                                                    <li>평일 효율(3,000~3,778)은 매우 낮으니 건너뛰세요</li>
                                                    <li>평일 보약 버프(70%p)만으로도 C~B티어 효율 가능</li>
                                                    <li>일요일+보약만으로도 B~A티어 효율 달성</li>
                                                    <li>썬데이메이플 이벤트 시 챌린저스 EXP 듀오 64.5만마리 잡는 것보다 효율 좋음!</li>
                                                </ul>
                                            </div>
                                            <p className="text-green-400 font-bold">결론: 280~289 구간에서도 평일에는 보약 버프가 있을 때만, 일요일에는 무조건 집중!</p>
                                        </div>
                                    </div>

                                    {/* 1. 메카베리 농장 */}
                                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-5">
                                        <h4 className="font-bold text-red-400 mb-3">1. "280초반엔 메카베리 농장 가지 마라"</h4>
                                        <div className="space-y-2 text-sm text-slate-300">
                                            <p><strong className="text-white">데이터:</strong> 메카베리 농장 효율 5,632 (280~284구간)</p>
                                            <p><strong className="text-white">분석:</strong> 이 수치는 <strong className="text-yellow-400">챌린저스 EXP 듀오로 10만 마리(라이트 유저) 잡는 효율(6,855)</strong>보다도 훨씬 낮습니다.</p>
                                            <p><strong className="text-white">결론:</strong> 280~284 구간에서 메카베리 농장에 5억 메소를 쓰는 건 비추천입니다. 차라리 그 돈으로 <strong className="text-green-400">익스프레스 부스터(메소)</strong>를 사고, 아니면 미리 메소를 이용하여 산 후에 <strong className="text-emerald-400">285레벨부터 효율이 7,500대로 올라오니 그때부터 사용하세요</strong></p>
                                        </div>
                                    </div>

                                    {/* 2. 모멘텀 패스 */}
                                    <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-5">
                                        <h4 className="font-bold text-yellow-400 mb-3">2. 모멘텀 패스: "효율이 가장 좋지만, LV285이상보다 효율이 좀 떨어진다.."</h4>
                                        <div className="space-y-2 text-sm text-slate-300">
                                            <p><strong className="text-white">데이터:</strong> 효율 10,248 (280~284) → 13,064 (285~289)</p>
                                            <p><strong className="text-white">분석:</strong> 290레벨(효율 14,003)에 비해 280초반에는 효율이 뚝 떨어집니다. <strong className="text-yellow-400">챌린저스 EXP 듀오 30만 마리 사냥(10,211)</strong>과 비슷한 수준입니다.</p>
                                            <p><strong className="text-white">결론:</strong> '한 방에 경험치 5~6만'이라는 절대량 때문에 사긴 사야 하지만, 290구간처럼 "무조건 개이득"이라며 찬양할 수준은 아닙니다.</p>
                                            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-3 mt-3">
                                                <p className="text-yellow-400 font-bold mb-1">💡 팁: 메카베리 농장 이용권</p>
                                                <p className="text-sm">모멘텀 패스에 포함된 메카베리 농장 이용권은 <strong className="text-green-400">LV285 이상</strong>이 되었을 때 사용하는 것을 추천합니다. 효율이 LV285 구간보다 떨어지니 보관해두세요!</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. 에픽 던전 & 익스프레스 패스 */}
                                    <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-5">
                                        <h4 className="font-bold text-blue-400 mb-3">3. 에픽 던전 & 익스프레스 패스의 재평가</h4>
                                        <div className="space-y-2 text-sm text-slate-300">
                                            <p><strong className="text-white">데이터:</strong> 하이마운틴(8,335) &gt; 익스프레스 패스(8,107) &gt; 앵글러(7,906) &gt; 악몽선경(7,708)</p>
                                            <p><strong className="text-white">분석:</strong> 이 콘텐츠들은 레벨 상관없이 효율이 고정입니다. 280구간에서 메카베리 농장 이용권 효율이 떨어질 때, 이 친구들은 든든하게 국밥 효율(7,000~8,000대)을 유지합니다.</p>
                                            <p><strong className="text-white">결론:</strong> 280레벨대에서는 <strong className="text-green-400">메카베리 농장 &lt; 에픽던전/익스프레스 패스 &lt; 챌린저스 EXP 듀오(20만 이상) &lt; 모멘텀 패스</strong> 순으로 효율이 높아집니다. 돈을 쓴다면 에픽던전 LV1 추가 리워드와 익스프레스 패스를 먼저 해야 합니다.</p>
                                        </div>
                                    </div>
                                    {/* 4. 익스프레스 패스 */}
                                    <div className="bg-pink-900/20 border border-pink-500/50 rounded-lg p-5">
                                        <h4 className="font-bold text-pink-400 mb-3">4. 익스프레스 패스 - 280구간에서 꽤 좋은 가성비</h4>
                                        <div className="space-y-2 text-sm text-slate-300">
                                            <p><strong className="text-white">데이터:</strong> 효율 8,107 (모든 레벨 동일) / 절대량 24,320</p>
                                            <p><strong className="text-white">분석:</strong> 레벨에 상관없이 고정 효율이므로, 280구간에서도 <strong className="text-yellow-400">에픽던전과 비슷한 효율(8,100대)</strong>을 보여줍니다. 특히 절대량이 높아서 한 번에 많은 경험치를 얻을 수 있습니다.</p>
                                            <p><strong className="text-white">결론:</strong> 280구간에서도 <strong className="text-green-400">시간이 부족한 직장인</strong>이라면 익스프레스 패스가 매우 유용합니다. <strong className="text-yellow-400">특히 280구간은 다른 콘텐츠 효율이 낮아 상대적 가치가 가장 높은 구간입니다!</strong> 쉬운 부스터 사냥으로 챌린저스 EXP 듀오 64.5만 마리의 1.5배급 경험치를 얻을 수 있습니다.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 유저 타입별 추천 */}
                            <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-2 border-emerald-400 rounded-xl p-6">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-emerald-400 mb-3 sm:mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                                    💡 280레벨대 유저 타입별 추천 루트
                                </h3>

                                <div className="space-y-4">
                                    {/* 가성비 칼계산형 */}
                                    <div className="bg-slate-900/70 rounded-lg p-4">
                                        <h4 className="font-bold text-cyan-400 mb-2">📊 가성비 칼계산형 (280~284 구간)</h4>
                                        <p className="text-sm text-slate-300 mb-2"><strong className="text-green-400">추천:</strong> 챌린저스 EXP 듀오(사냥 본인 역량껏) &gt; 하이마운틴(0→1) &gt; 익스프레스 패스</p>
                                        <p className="text-sm text-slate-300 mb-2"><strong className="text-red-400">비추천:</strong> 메카베리 농장 (절대 금지)</p>
                                        <p className="text-xs text-slate-400"><strong>전략:</strong> 농장 효율이 너무 안 좋으므로 거르고, 고정 효율이 좋은 하이마운틴과 부스터를 챙깁니다.</p>
                                    </div>

                                    {/* 285 돌파형 */}
                                    <div className="bg-slate-900/70 rounded-lg p-4">
                                        <h4 className="font-bold text-yellow-400 mb-2">⚡ 285레벨 돌파형 (중간 구간)</h4>
                                        <p className="text-sm text-slate-300 mb-2"><strong className="text-green-400">추천:</strong> 모멘텀 패스 + 메카베리 농장(이제 살만함)</p>
                                        <p className="text-xs text-slate-400"><strong>전략:</strong> 285레벨을 찍는 순간 농장 효율이 7,500대로 올라와서 '살 만한' 수준이 됩니다. 모멘텀 패스 효율도 13,000대로 떡상하므로 285레벨을 달성하면 미리 구매 했던 모멘텀 패스/메소샵 메카베리 농장 이용권을 이용하면 좋습니다.</p>
                                    </div>

                                    {/* 사냥 포기형 */}
                                    <div className="bg-slate-900/70 rounded-lg p-4">
                                        <h4 className="font-bold text-purple-400 mb-2">💼 사냥 포기형 (직장인)</h4>
                                        <p className="text-sm text-slate-300 mb-2"><strong className="text-green-400">추천:</strong> 모멘텀 패스 + 익스프레스 패스 + 에픽던전 (악몽선경 0→1)</p>
                                        <p className="text-xs text-slate-400"><strong>전략:</strong> 사냥을 못 해서 챌린저스 EXP 듀오 효율을 못 뽑는다면, 280구간에서는 <strong className="text-purple-400">'부스터'</strong>가 빛과 소금입니다. 농장보다 효율 좋고 경험치도 많이 줍니다.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Summary */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-purple-500 rounded-xl p-8">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">📝 마무리</h2>
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-center mb-4 sm:mb-6">
                            메이플스토리에서 <strong className="text-yellow-400">"돈을 어디에 써야 가장 빨리, 그리고 싸게 레벨업을 할 수 있는가?"</strong>는 영원한 고민입니다.<br />
                            이 가이드가 여러분의 효율적인 레벨업에 도움이 되길 바랍니다! 🍁
                        </p>
                        <div className="text-center space-y-2">
                            <p className="text-slate-400 text-sm sm:text-base md:text-lg">
                                본인의 플레이 스타일과 지갑 사정에 맞는 최적의 조합을 찾아보세요!
                            </p>
                            <p className="text-green-400 font-bold text-xs sm:text-sm md:text-base">
                                💡 핵심은 사냥 할 시간이 많다면 '챌린저스 EXP 듀오로 내가 사냥을 얼마나 할 것인가'이고,<br className="hidden sm:block" />
                                <span className="sm:hidden"> </span>시간이 없다면 모멘텀/익스프레스 패스로 경험치를 캐시로 구매하는 것입니다.
                            </p>
                        </div>

                        {/* Keyword Tags for SEO */}
                        <div className="mt-8 pt-6 border-t border-slate-700">
                            <div className="flex flex-wrap gap-2 justify-center">
                                <span className="px-3 py-1.5 bg-yellow-500/10 text-yellow-400 text-xs sm:text-sm rounded-full border border-yellow-500/30 hover:bg-yellow-500/20 transition-colors">
                                    #모멘텀패스효율
                                </span>
                                <span className="px-3 py-1.5 bg-cyan-500/10 text-cyan-400 text-xs sm:text-sm rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors">
                                    #챌린저스듀오효율
                                </span>
                                <span className="px-3 py-1.5 bg-pink-500/10 text-pink-400 text-xs sm:text-sm rounded-full border border-pink-500/30 hover:bg-pink-500/20 transition-colors">
                                    #익스프레스패스효율
                                </span>
                                <span className="px-3 py-1.5 bg-pink-500/10 text-pink-400 text-xs sm:text-sm rounded-full border border-pink-500/30 hover:bg-pink-500/20 transition-colors">
                                    #익부효율
                                </span>
                                <span className="px-3 py-1.5 bg-orange-500/10 text-orange-400 text-xs sm:text-sm rounded-full border border-orange-500/30 hover:bg-orange-500/20 transition-colors">
                                    #에픽던전효율
                                </span>
                                <span className="px-3 py-1.5 bg-orange-500/10 text-orange-400 text-xs sm:text-sm rounded-full border border-orange-500/30 hover:bg-orange-500/20 transition-colors">
                                    #악몽선경효율
                                </span>
                                <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm rounded-full border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors">
                                    #메카베리효율
                                </span>
                                <span className="px-3 py-1.5 bg-blue-500/10 text-blue-400 text-xs sm:text-sm rounded-full border border-blue-500/30 hover:bg-blue-500/20 transition-colors">
                                    #몬스터파크효율
                                </span>
                                <span className="px-3 py-1.5 bg-blue-500/10 text-blue-400 text-xs sm:text-sm rounded-full border border-blue-500/30 hover:bg-blue-500/20 transition-colors">
                                    #몬파효율
                                </span>
                                <span className="px-3 py-1.5 bg-purple-500/10 text-purple-400 text-xs sm:text-sm rounded-full border border-purple-500/30 hover:bg-purple-500/20 transition-colors">
                                    #경험치효율
                                </span>
                                <span className="px-3 py-1.5 bg-purple-500/10 text-purple-400 text-xs sm:text-sm rounded-full border border-purple-500/30 hover:bg-purple-500/20 transition-colors">
                                    #상급EXP
                                </span>
                                <span className="px-3 py-1.5 bg-green-500/10 text-green-400 text-xs sm:text-sm rounded-full border border-green-500/30 hover:bg-green-500/20 transition-colors">
                                    #메이플가성비
                                </span>
                                <span className="px-3 py-1.5 bg-red-500/10 text-red-400 text-xs sm:text-sm rounded-full border border-red-500/30 hover:bg-red-500/20 transition-colors">
                                    #레벨업가이드
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <div className="border-t border-slate-700 pt-8 mt-12">
                    <div className="text-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-500 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            블로그 메인으로
                        </Link>
                    </div>
                </div>
            </article>
        </div >
    );
}
