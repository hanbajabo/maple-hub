'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, TrendingUp, Shield, DollarSign, Zap, AlertTriangle, Cpu, Users, BarChart2 } from 'lucide-react';

export default function HyperburningJobs2025v2() {
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
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">
                            데이터 분석
                        </span>
                        <span className="text-slate-500 text-sm">2025년 12월 12일 업데이트</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-black text-white mb-4 leading-snug break-keep">
                        🎮 데이터로 증명된 2025 하이퍼버닝 직업 추천 v2.0 (하이브리드 랭킹)
                    </h1>
                    <p className="text-base sm:text-lg text-slate-400 leading-relaxed break-keep">
                        단순한 유튜버 추천을 넘어섰습니다. 전 직업 헥사 환산 효율, DPM, 유저 인식, 고점 데이터까지.
                        모든 변수를 통합하여 도출해낸 가장 완벽한 직업 추천 가이드를 공개합니다.
                    </p>
                </header>

                {/* Key Info Box */}
                <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-500/30 rounded-xl p-4 sm:p-6 mb-8">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        v2.0 핵심 변경점 (하이브리드 시스템)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm sm:text-base">
                        <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                            <span className="text-purple-400 font-bold flex-shrink-0">🎯 4가지 랭킹 모드:</span>
                            <span>AI, 유튜버 혼합, 일반인 혼합, 고점 체급 혼합</span>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                            <span className="text-purple-400 font-bold flex-shrink-0">📊 정밀한 평가 기준:</span>
                            <span className="leading-snug">헥사(40%) + 쿨뚝(15%) + 리레링(5%) + 유틸(5%) + 환산(20%) + Lv280(15%)</span>
                        </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <Link href="/job-ranking" className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-colors text-sm">
                            <BarChart2 className="w-4 h-4" />
                            실시간 랭킹 확인하러 가기
                        </Link>
                    </div>
                </div>

                {/* Introduction */}
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 border-b border-slate-700 pb-3">왜 '하이브리드'인가?</h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-slate-300 leading-relaxed mb-4 text-sm sm:text-base break-keep">
                            기존 v1.0에서는 유튜버들의 의견을 종합하여 '대세'를 파악했습니다. 물론 좋은 지표지만,
                            <strong className="text-purple-400"> "내 상황에 맞는가?"</strong>에 대한 답을 주기는 어려웠습니다.
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4 text-sm sm:text-base break-keep">
                            누군가는 컨트롤이 좋은 고스펙 유저일 수 있고, 누군가는 '딸깍'이 중요한 라이트 유저일 수 있습니다.
                            그래서 우리는 모든 데이터를 섞었습니다. 메이플스카우터, 환산 주스텟, 유튜버 평가, 그리고 실제 유저들의 티어표까지.
                        </p>
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-6 my-6">
                            <p className="text-yellow-400 font-bold text-base sm:text-lg mb-3">🔍 4가지 시각으로 완벽 분석</p>
                            <ul className="space-y-2 text-slate-300 list-disc pl-4 text-sm sm:text-base">
                                <li><strong className="text-white">🤖 AI 순위:</strong> 감정을 배제한 순수 데이터 (효율 중심)</li>
                                <li><strong className="text-white">🎬 유튜버 혼합:</strong> 데이터 50% + 최신 트렌드(유튜버) 50%</li>
                                <li><strong className="text-white">👥 일반인 혼합:</strong> 데이터 50% + 유저 인식표 50%</li>
                                <li><strong className="text-white">🔥 고점 체급:</strong> 데이터 50% + 해방 이후 고점 성능 50%</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Rank Preview */}
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 border-b border-slate-700 pb-3">모드별 1위 미리보기</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-5 flex flex-col justify-between">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="relative w-12 h-12 flex-shrink-0">
                                    <Image
                                        src="/images/jobs/아크메이지(썬,콜).png"
                                        alt="아크메이지(썬,콜)"
                                        fill
                                        className="object-contain rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white">AI 순위 1위</h3>
                                    <p className="text-purple-400 font-bold">아크메이지(썬,콜)</p>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm">
                                데이터는 거짓말을 하지 않습니다. 헥사 효율 1위, 준수한 유틸. 감성 다 빼고 효율만 따지면 썬콜이 정답입니다.
                            </p>
                        </div>

                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-5 flex flex-col justify-between">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="relative w-12 h-12 flex-shrink-0">
                                    <Image
                                        src="/images/jobs/일리움.png"
                                        alt="일리움"
                                        fill
                                        className="object-contain rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white">일반인/유튜버 1위</h3>
                                    <p className="text-blue-400 font-bold">일리움</p>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm">
                                사람의 눈은 정확합니다. 하드 세렌 최소컷 압도적 1위의 위용은 데이터 지표가 조금 낮아도 가려지지 않습니다.
                            </p>
                        </div>

                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-5 flex flex-col justify-between">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="relative w-12 h-12 flex-shrink-0">
                                    <Image
                                        src="/images/jobs/카데나.png"
                                        alt="카데나"
                                        fill
                                        className="object-contain rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white">고점 체급 1위</h3>
                                    <p className="text-red-400 font-bold">카데나</p>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm">
                                "이론상 최강"이 무엇인지 보여줍니다. 손가락만 받쳐준다면 해방 후 카데나의 고점을 따라올 직업은 없습니다.
                            </p>
                        </div>

                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-5 flex flex-col justify-between">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="flex -space-x-4">
                                    <div className="relative w-12 h-12 flex-shrink-0 z-10">
                                        <Image
                                            src="/images/jobs/은월.png"
                                            alt="은월"
                                            fill
                                            className="object-contain rounded-lg border-2 border-slate-800 bg-slate-800"
                                        />
                                    </div>
                                    <div className="relative w-12 h-12 flex-shrink-0 z-0">
                                        <Image
                                            src="/images/jobs/보우마스터.png"
                                            alt="보우마스터"
                                            fill
                                            className="object-contain rounded-lg border-2 border-slate-800 bg-slate-800"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white">종합 밸런스 Pick</h3>
                                    <p className="text-green-400 font-bold">은월 & 보우마스터</p>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm">
                                어느 순위에서도 상위권을 놓치지 않는 국밥 직업들입니다. 실패하지 않는 선택을 원한다면 이들입니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Conclusion */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-3">지금 바로 확인하세요</h2>
                    <p className="text-slate-300 mb-6">
                        백문이 불여일견. 직접 랭킹 페이지에서 내가 고민 중인 직업의 점수를 확인해 보세요.
                        헥사 조각 보유량에 따라 순위가 바뀌는 디테일함까지 경험하실 수 있습니다.
                    </p>

                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-center shadow-lg shadow-purple-500/20">
                        <h3 className="text-2xl font-black text-white mb-2">당신의 직업을 찾아드립니다</h3>
                        <p className="text-indigo-100 mb-6">AI와 빅데이터가 분석한 2025년 최고의 직업</p>
                        <Link
                            href="/job-ranking"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            🚀 종합 랭킹 보러가기
                        </Link>
                    </div>
                </section>

                {/* Footer CTA */}
                <div className="border-t border-slate-700 pt-8 mt-12">
                    <div className="flex justify-between items-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            블로그 목록
                        </Link>
                        <Link
                            href="/blog/hyperburning-jobs-2025"
                            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            <span>v1.0 (유튜버 분석) 보러가기</span>
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
