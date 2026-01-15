'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, Flame, Gift, Zap, TrendingUp, AlertCircle, Check, Star } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function ExpressBoosterEfficiencyGuide() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
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
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Title Section */}
                <header className="mb-8">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full">
                            이벤트 가이드
                        </span>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                            효율 분석
                        </span>
                        <span className="text-slate-500 text-sm">2026년 1월 15일</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                        ⚡ 익스프레스 부스터 효율 완벽 정리
                    </h1>
                    <p className="text-lg text-slate-400">
                        버닝 익스프레스 이벤트의 핵심! 레벨별 경험치 효율, 사냥터별 최적화 전략, 무과금/과금 보상 총정리까지!
                    </p>
                </header>

                {/* 출처 표기 */}
                <div className="mb-8 bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                    <p className="text-slate-300 text-sm flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>
                            해당 공략글은 메이플 인벤 <a href="https://www.inven.co.kr/board/maple/2304/46811" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-bold underline">'컴과'님</a>의 [익스프레스 부스터 경험치 분석]글을 참고하였습니다.
                        </span>
                    </p>
                </div>

                {/* 이벤트 기간 */}
                <div className="mb-12 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Calendar className="w-6 h-6 text-yellow-400" />
                        <h2 className="text-xl font-bold text-yellow-400">이벤트 기간</h2>
                    </div>
                    <p className="text-slate-300 text-lg">
                        <span className="text-white font-bold">2026년 1월 15일(목) 점검 후</span> ~ <span className="text-white font-bold">2026년 2월 11일(수) 오후 11시 59분</span>
                    </p>
                    <div className="mt-4 bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
                        <p className="text-yellow-300 text-sm flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>총 <span className="font-bold">28일간</span> 진행되며, 매일 출석하면 최대 <span className="font-bold">21일</span>의 보상을 받을 수 있습니다!</span>
                        </p>
                    </div>
                </div>

                {/* 익스프레스 부스터란? */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-2 border-indigo-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                                <Zap className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-indigo-400">
                                    익스프레스 부스터란?
                                </h2>
                            </div>
                        </div>


                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-6 items-start">
                                {/* 익스프레스 부스터 이미지 */}
                                <div className="flex justify-center">
                                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl">
                                        <Image
                                            src="/images/blog/express_booster_item.png"
                                            alt="익스프레스 부스터 아이템 설명"
                                            width={400}
                                            height={500}
                                            className="mx-auto rounded-lg"
                                        />
                                    </div>
                                </div>

                                {/* 기본 정보 */}
                                <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                    <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                        <Flame className="w-5 h-5 text-orange-400" />
                                        기본 정보
                                    </h3>
                                    <ul className="space-y-2 text-slate-300">
                                        <li className="flex items-start gap-2">
                                            <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span><span className="text-white font-bold">100초 동안</span> 성장하는 불꽃 몬스터를 소환하는 아이템</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span>총 <span className="text-white font-bold">19젠 (190마리)</span> 소환 (1젠당 10마리)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span><span className="text-red-400 font-bold">레벨 차이에 따른 경험치 패널티 적용 X</span> - 해당 지역 높은 레벨 사냥터에서 사용하는 것이 효율적</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span>어센틱 포스 지역에서만 사용 가능 (260레벨 이상)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span>어떠한 추가 경험치 효과도 적용받지 않음</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-blue-300 font-bold mb-1">중요!</p>
                                        <p className="text-sm text-slate-300">
                                            295레벨 이상 몬스터 필드에서 사용 시, <span className="text-yellow-400 font-bold">294레벨 몬스터 경험치</span>로 고정됩니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 참여 방법 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-2 border-green-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <Check className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-green-400">
                                    버닝 익스프레스 참여 방법
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-center mb-6">
                                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl">
                                    <Image
                                        src="/images/blog/burning_express_ui.png"
                                        alt="버닝 익스프레스 이벤트 UI"
                                        width={900}
                                        height={500}
                                        className="mx-auto rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">📋 참여 대상</h3>
                                <p className="text-slate-300">
                                    <span className="text-white font-bold">260레벨 이상</span>의 캐릭터 또는 스토리 퀘스트 챕터 2를 완료한 260레벨 이상의 제로 캐릭터
                                </p>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">🎯 일일 출석 완료 조건</h3>
                                <p className="text-slate-300 mb-3">
                                    하루에 한 번, <span className="text-yellow-400 font-bold">레벨 범위 몬스터 1,000마리</span>를 처치하여 출석 완료!
                                </p>
                                <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 space-y-2">
                                    <p className="text-sm text-slate-300 flex items-start gap-2">
                                        <span className="text-yellow-400">•</span>
                                        <span>참여 기록은 <span className="text-white font-bold">메이플ID 내 모든 캐릭터가 공유</span></span>
                                    </p>
                                    <p className="text-sm text-slate-300 flex items-start gap-2">
                                        <span className="text-yellow-400">•</span>
                                        <span>1인 파티 또는 파티가 아닌 상태에서만 카운트</span>
                                    </p>
                                    <p className="text-sm text-slate-300 flex items-start gap-2">
                                        <span className="text-yellow-400">•</span>
                                        <span>차원의 전장에서는 카운트 되지 않음</span>
                                    </p>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">💎 출석 패스 (메이플포인트)</h3>
                                <p className="text-slate-300 mb-2">
                                    완료하지 못한 출석을 <span className="text-purple-400 font-bold">3,000 메이플포인트</span>로 구매 가능
                                </p>
                                <p className="text-sm text-slate-400">
                                    ※ 전일 기준으로 미완료한 횟수만큼 사용 가능
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 광고 */}
                <div className="my-12">
                    <InArticleAd dataAdSlot="1234567890" />
                </div>

                {/* 기본 출석 보상 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                <Gift className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-purple-400">
                                    기본 출석 보상 (무료)
                                </h2>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-purple-900/40">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-purple-300 font-bold">출석 횟수</th>
                                            <th className="px-4 py-3 text-left text-purple-300 font-bold">보상</th>
                                            <th className="px-4 py-3 text-left text-purple-300 font-bold">수량</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700">
                                        {[
                                            { day: 1, reward: '익스프레스 부스터', amount: 5 },
                                            { day: 2, reward: '상급 EXP 교환권', amount: 1000 },
                                            { day: 3, reward: '익스프레스 부스터', amount: 5 },
                                            { day: 4, reward: '익스프레스 부스터', amount: 5 },
                                            { day: 5, reward: '상급 EXP 교환권', amount: 1000 },
                                            { day: 6, reward: '익스프레스 부스터', amount: 5 },
                                            { day: 7, reward: '상급 EXP 교환권', amount: 1000 },
                                            { day: 8, reward: '익스프레스 부스터', amount: 5 },
                                            { day: 9, reward: '상급 EXP 교환권', amount: 1000 },
                                            { day: 10, reward: '익스프레스 부스터', amount: 5 },
                                            { day: 11, reward: '익스프레스 부스터', amount: 5 },
                                            { day: 12, reward: '상급 EXP 교환권', amount: 1000 },
                                            { day: 13, reward: '익스프레스 부스터', amount: 5 },
                                            { day: 14, reward: '상급 EXP 교환권', amount: 1000 },
                                            { day: 15, reward: '익스프레스 부스터', amount: 5 },
                                            { day: 16, reward: '상급 EXP 교환권', amount: 1000 },
                                            { day: 17, reward: '익스프레스 부스터', amount: 5 },
                                            { day: 18, reward: '익스프레스 부스터', amount: 5 },
                                            { day: 19, reward: '상급 EXP 교환권', amount: 1000 },
                                            { day: 20, reward: '익스프레스 부스터', amount: 5 },
                                            { day: 21, reward: '상급 EXP 교환권', amount: 1000 },
                                        ].map((item) => (
                                            <tr key={item.day} className="hover:bg-slate-800/50 transition-colors">
                                                <td className="px-4 py-3 text-white font-bold">{item.day}일차</td>
                                                <td className="px-4 py-3 text-slate-300">
                                                    {item.reward === '익스프레스 부스터' ? (
                                                        <span className="text-yellow-400">⚡ {item.reward}</span>
                                                    ) : (
                                                        <span className="text-blue-400">📜 {item.reward}</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-slate-300">{item.amount}개</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-4 bg-green-900/20 border border-green-500/50 rounded-lg p-4">
                            <p className="text-green-300 font-bold mb-2 flex items-center gap-2">
                                <Star className="w-5 h-5" />
                                무료 보상 총합
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-slate-900/50 rounded p-3">
                                    <p className="text-yellow-400 font-bold">익스프레스 부스터</p>
                                    <p className="text-white text-2xl font-black">60개</p>
                                </div>
                                <div className="bg-slate-900/50 rounded p-3">
                                    <p className="text-blue-400 font-bold">상급 EXP 교환권</p>
                                    <p className="text-white text-2xl font-black">9,000개</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 익스프레스 패스 보상 (캐시) */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-2 border-orange-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                                <Star className="w-6 h-6 text-orange-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-orange-400">
                                    익스프레스 패스 보상 (30,000 캐시)
                                </h2>
                            </div>
                        </div>

                        <div className="mb-6 bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
                            <p className="text-yellow-300 text-sm flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>패스를 구매해도 출석을 완료하지 않으면 보상을 받을 수 없습니다!</span>
                            </p>
                        </div>

                        <div className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-orange-900/40">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-orange-300 font-bold">출석 횟수</th>
                                            <th className="px-4 py-3 text-left text-orange-300 font-bold">추가 부스터</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700">
                                        {[
                                            { day: 1, amount: 5 }, { day: 2, amount: 5 }, { day: 3, amount: 5 }, { day: 4, amount: 10 },
                                            { day: 5, amount: 5 }, { day: 6, amount: 5 }, { day: 7, amount: 5 }, { day: 8, amount: 5 },
                                            { day: 9, amount: 5 }, { day: 10, amount: 5 }, { day: 11, amount: 10 }, { day: 12, amount: 5 },
                                            { day: 13, amount: 5 }, { day: 14, amount: 5 }, { day: 15, amount: 5 }, { day: 16, amount: 5 },
                                            { day: 17, amount: 5 }, { day: 18, amount: 10 }, { day: 19, amount: 5 }, { day: 20, amount: 5 },
                                            { day: 21, amount: 5 },
                                        ].map((item) => (
                                            <tr key={item.day} className="hover:bg-slate-800/50 transition-colors">
                                                <td className="px-4 py-3 text-white font-bold">{item.day}일차</td>
                                                <td className="px-4 py-3">
                                                    <span className={item.amount === 10 ? 'text-yellow-400 font-bold text-lg' : 'text-slate-300'}>
                                                        ⚡ +{item.amount}개
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-4 bg-orange-900/20 border border-orange-500/50 rounded-lg p-4">
                            <p className="text-orange-300 font-bold mb-2 flex items-center gap-2">
                                <Star className="w-5 h-5" />
                                익스프레스 패스 추가 보상
                            </p>
                            <div className="bg-slate-900/50 rounded p-3">
                                <p className="text-yellow-400 font-bold">익스프레스 부스터</p>
                                <p className="text-white text-2xl font-black">+120개</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 메소샵 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-2 border-blue-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-blue-400">
                                    메소샵 구매
                                </h2>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
                                    <p className="text-blue-400 font-bold mb-2">주간 구매 한도</p>
                                    <p className="text-white text-2xl font-black">10개</p>
                                </div>
                                <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
                                    <p className="text-blue-400 font-bold mb-2">개당 가격</p>
                                    <p className="text-white text-2xl font-black">3,000만 메소</p>
                                </div>
                            </div>
                            <div className="mt-4 bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-3">
                                <p className="text-sm text-slate-300">
                                    4주 동안 매주 10개씩 총 <span className="text-yellow-400 font-bold">최대 40개</span> 구매 가능!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 광고 */}
                <div className="my-12">
                    <InArticleAd dataAdSlot="1234567890" />
                </div>

                {/* 효율 분석 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-green-900/50 to-teal-900/50 border-2 border-green-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <Zap className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-green-400">
                                    레벨별 효율 분석
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* 레벨 구간별 가중치 */}
                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-4">📊 레벨 구간별 경험치 가중치</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-900/40 to-transparent rounded-lg">
                                        <span className="text-slate-300">세르니움 260-264</span>
                                        <span className="text-purple-400 font-bold">동렙 몬스터 경험치의 192배</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-900/40 to-transparent rounded-lg">
                                        <span className="text-slate-300">아르크스 265-269</span>
                                        <span className="text-blue-400 font-bold">동렙 몬스터 경험치의 220.8배</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-900/40 to-transparent rounded-lg">
                                        <span className="text-slate-300">오디움/도원경 270-279</span>
                                        <span className="text-green-400 font-bold">동렙 몬스터 경험치의 268.8배 ⭐</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-900/40 to-transparent rounded-lg">
                                        <span className="text-slate-300">아르테리아/카르시온 280-289</span>
                                        <span className="text-yellow-400 font-bold">동렙 몬스터 경험치의 240배</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-900/40 to-transparent rounded-lg">
                                        <span className="text-slate-300">탈라하트 290-294</span>
                                        <span className="text-orange-400 font-bold">동렙 몬스터 경험치의 220.8배</span>
                                    </div>
                                </div>
                            </div>

                            {/* 사냥터별 효율 */}
                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-4">🗺️ 사냥터별 효율 순위</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-900/40 to-transparent rounded-lg border border-yellow-500/30">
                                        <span className="text-2xl">🥇</span>
                                        <div className="flex-1">
                                            <p className="text-white font-bold">1위: 도원경, 오디움</p>
                                            <p className="text-xs text-slate-400">270-279 레벨 구간 (가중치 268.8배)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-700/40 to-transparent rounded-lg border border-slate-600/30">
                                        <span className="text-2xl">🥈</span>
                                        <div className="flex-1">
                                            <p className="text-white font-bold">2위: 아르테리아, 카르시온</p>
                                            <p className="text-xs text-slate-400">280-289 레벨 구간 (가중치 240배)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-900/40 to-transparent rounded-lg border border-amber-600/30">
                                        <span className="text-2xl">🥉</span>
                                        <div className="flex-1">
                                            <p className="text-white font-bold">3위: 탈라하트, 아르크스</p>
                                            <p className="text-xs text-slate-400">265-269/290-294 레벨 구간 (가중치 220.8배)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-800/40 to-transparent rounded-lg border border-slate-700/30">
                                        <span className="text-2xl">4️⃣</span>
                                        <div className="flex-1">
                                            <p className="text-white font-bold">4위: 세르니움</p>
                                            <p className="text-xs text-slate-400">260-264 레벨 구간 (가중치 192배)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 최적 전략 */}
                            <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-5">
                                <div className="flex items-start gap-3">
                                    <Zap className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-green-300 font-bold mb-2">⚡ 극한 효율 전략</p>
                                        <p className="text-slate-300 text-sm mb-3">
                                            경험치 패널티를 받지 않기 때문에, <span className="text-yellow-400 font-bold">젠컷이 가능한 가장 높은 레벨의 사냥터</span>에서 사용하는 것이 최고 효율!
                                        </p>
                                        <div className="bg-slate-900/50 rounded p-3">
                                            <p className="text-white font-bold mb-1">예시</p>
                                            <p className="text-sm text-slate-300">
                                                276레벨 캐릭터 → 279레벨 사냥터에서 부스터 사용 후 평소 사냥터로 복귀
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 편의성 전략 */}
                            <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-5">
                                <div className="flex items-start gap-3">
                                    <Clock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-blue-300 font-bold mb-2">⏰ 편의성 전략 (시간이 부족한 경우)</p>
                                        <p className="text-slate-300 text-sm">
                                            메소샵 + 익스프레스 패스로 부스터가 <span className="text-yellow-400 font-bold">200개 이상</span>이 되므로,
                                            시간이 부족하다면 평소 사냥터에서 사용해도 <span className="text-white font-bold">약 4% 내외의 손해</span>로 크게 문제없습니다!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 레벨별 상세 경험치 표 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-indigo-900/50 to-violet-900/50 border-2 border-indigo-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-indigo-400">
                                    레벨별 상세 경험치 표
                                </h2>
                            </div>
                        </div>

                        <div className="mb-4 bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
                            <p className="text-yellow-300 text-sm flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>경험치 배율은 해당 레벨에서 입장 가능한 <span className="font-bold">가장 높은 레벨의 사냥터</span>를 기준으로 계산되었습니다.</span>
                            </p>
                        </div>

                        <div className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-indigo-900/40">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-indigo-300 font-bold">레벨</th>
                                            <th className="px-4 py-3 text-right text-indigo-300 font-bold">1마리당 경험치</th>
                                            <th className="px-4 py-3 text-right text-indigo-300 font-bold">부스터 1개 (190마리)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700">
                                        {[
                                            { level: 260, exp: "331,288,512", percent: "3.851%" },
                                            { level: 261, exp: "336,055,680", percent: "3.813%" },
                                            { level: 262, exp: "340,830,528", percent: "3.775%" },
                                            { level: 263, exp: "345,638,976", percent: "3.738%" },
                                            { level: 264, exp: "351,054,528", percent: "3.701%" },
                                            { level: 265, exp: "454,179,859", percent: "3.893%" },
                                            { level: 266, exp: "460,416,355", percent: "3.855%" },
                                            { level: 267, exp: "466,676,698", percent: "3.817%" },
                                            { level: 268, exp: "473,747,597", percent: "3.779%" },
                                            { level: 269, exp: "480,079,699", percent: "3.741%" },
                                            { level: 270, exp: "657,274,330", percent: "2.437%" },
                                            { level: 271, exp: "666,983,386", percent: "2.413%" },
                                            { level: 272, exp: "675,664,819", percent: "2.389%" },
                                            { level: 273, exp: "684,404,851", percent: "2.366%" },
                                            { level: 274, exp: "694,285,133", percent: "2.342%" },
                                            { level: 275, exp: "780,332,851", percent: "1.374%" },
                                            { level: 276, exp: "790,168,781", percent: "1.249%" },
                                            { level: 277, exp: "801,295,488", percent: "1.135%" },
                                            { level: 278, exp: "811,235,174", percent: "1.032%" },
                                            { level: 279, exp: "822,451,661", percent: "0.938%" },
                                            { level: 280, exp: "824,646,480", percent: "0.490%" },
                                            { level: 281, exp: "835,899,360", percent: "0.445%" },
                                            { level: 282, exp: "845,944,320", percent: "0.405%" },
                                            { level: 283, exp: "857,282,400", percent: "0.368%" },
                                            { level: 284, exp: "867,426,720", percent: "0.335%" },
                                            { level: 285, exp: "975,111,600", percent: "0.195%" },
                                            { level: 286, exp: "986,472,960", percent: "0.178%" },
                                            { level: 287, exp: "999,300,240", percent: "0.162%" },
                                            { level: 288, exp: "1,012,206,240", percent: "0.147%" },
                                            { level: 289, exp: "1,023,717,360", percent: "0.134%" },
                                            { level: 290, exp: "1,058,364,614", percent: "0.072%" },
                                            { level: 291, exp: "1,070,220,250", percent: "0.065%" },
                                            { level: 292, exp: "1,083,644,890", percent: "0.059%" },
                                            { level: 293, exp: "1,097,150,122", percent: "0.054%" },
                                            { level: 294, exp: "1,109,186,813", percent: "0.049%" },
                                        ].map((row) => (
                                            <tr key={row.level} className="hover:bg-slate-800/50 transition-colors">
                                                <td className="px-4 py-3 text-white font-bold">{row.level}레벨</td>
                                                <td className="px-4 py-3 text-right text-slate-300 font-mono">{row.exp}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <span className={
                                                        parseFloat(row.percent) >= 3
                                                            ? "text-green-400 font-bold"
                                                            : parseFloat(row.percent) >= 1
                                                                ? "text-yellow-400 font-bold"
                                                                : "text-slate-400"
                                                    }>
                                                        {row.percent}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                <span className="text-slate-300">3% 이상: 고효율 구간 (260-269레벨)</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                <span className="text-slate-300">1% 이상: 중효율 구간 (270-279레벨)</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                                <span className="text-slate-300">1% 미만: 저효율 구간 (280레벨 이상)</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 총 보상 정리 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-yellow-900/50 to-amber-900/50 border-2 border-yellow-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                <Gift className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-yellow-400">
                                    총 획득 가능 부스터 정리
                                </h2>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-slate-900/50 rounded-xl p-5 border-2 border-green-500/30">
                                <p className="text-green-400 font-bold mb-2 text-sm">무료 (기본 출석)</p>
                                <p className="text-white text-3xl font-black mb-1">60개</p>
                                <p className="text-xs text-slate-400">21일 출석 완료 시</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-5 border-2 border-orange-500/30">
                                <p className="text-orange-400 font-bold mb-2 text-sm">익스프레스 패스 (30,000 캐시)</p>
                                <p className="text-white text-3xl font-black mb-1">+120개</p>
                                <p className="text-xs text-slate-400">21일 출석 완료 시</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-5 border-2 border-blue-500/30">
                                <p className="text-blue-400 font-bold mb-2 text-sm">메소샵 (주간 10개)</p>
                                <p className="text-white text-3xl font-black mb-1">+40개</p>
                                <p className="text-xs text-slate-400">4주간 매주 구매 시</p>
                            </div>
                        </div>

                        <div className="mt-6 bg-gradient-to-r from-yellow-900/40 to-orange-900/40 rounded-xl p-6 border-2 border-yellow-500/50">
                            <p className="text-yellow-300 font-bold mb-2 text-center">🎉 최대 합계</p>
                            <div className="text-center">
                                <p className="text-white text-5xl font-black">220개</p>
                                <p className="text-slate-300 text-sm mt-2">
                                    무료 60 + 패스 120 + 메소샵 40
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 마무리 팁 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-2xl font-black text-white mb-6">💡 핵심 요약</h2>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white font-bold mb-1">1. 최고 효율은 270-279레벨 구간</p>
                                    <p className="text-sm text-slate-400">도원경, 오디움 사냥터에서 사용 권장</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white font-bold mb-1">2. 젠컷 가능한 가장 높은 레벨 사냥터 추천</p>
                                    <p className="text-sm text-slate-400">경험치 패널티를 받지 않으므로 레벨 높은 곳이 유리</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white font-bold mb-1">3. 시간 부족 시 평소 사냥터도 OK</p>
                                    <p className="text-sm text-slate-400">부스터가 220개로 많으니 편의성을 우선해도 괜찮음 (약 4% 손해)</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white font-bold mb-1">4. 매일 출석 필수!</p>
                                    <p className="text-sm text-slate-400">레벨 범위 몬스터 1,000마리 처치하면 출석 완료</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 관련 링크 */}
                <div className="mb-8 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-bold transition-all transform hover:scale-105"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        블로그 목록으로 돌아가기
                    </Link>
                </div>
            </article>
        </div>
    );
}
