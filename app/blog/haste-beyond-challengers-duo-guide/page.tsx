'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Sparkles, Gift, Zap, AlertCircle, Trophy, Target, TrendingUp, Clock, Users } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function HasteBeyondChallengersDuoGuide() {
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
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">
                            육성 가이드
                        </span>
                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-full">
                            경험치 효율
                        </span>
                        <span className="text-slate-500 text-sm">2026년 2월 8일</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                        [메이플] 헤이스트 BEYOND x 챌린저스 듀오 완벽 공략
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-orange-400 mb-4">
                        "하루 5분으로 끝내는 숙제? 이번엔 진짜입니다."
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-white">
                        오는 2026년 2월 12일(목), 사냥 가속 이벤트 <span className="text-purple-400 font-bold">'헤이스트 BEYOND'</span>가 시작됩니다.
                        평소라면 "또 사냥 숙제냐"라고 할 수 있겠지만, 이번엔 상황이 다릅니다. 현재 진행 중인 <span className="text-cyan-400 font-bold">[챌린저스 EXP 듀오 / 파트너]</span> 이벤트와 역대급 시너지가 확인되었기 때문입니다.
                    </p>
                </header>

                {/* Intro Highlight */}
                <div className="mb-12 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50 rounded-2xl p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                        <div>
                            <p className="text-yellow-300 font-bold text-xl mb-2">
                                특히, 챌섭 캐릭터와 본섭 캐릭터를 둘 다 육성하는 분들께는 최고입니다.
                            </p>
                            <p className="text-white">
                                <span className="text-red-400 font-bold">"돈(1만 캐시) 쓰고 사냥해야 했던 챌린저스 듀오, 이번 기회에 뽕을 뽑아야 하는 이유"</span>를 완벽하게 정리해 드립니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 1: 핵심 변수 - 피버 타임 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 border-2 border-red-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                                <Zap className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-red-400">
                                    1. 핵심 변수: "피버 타임 5분의 기적"
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
                                <p className="text-yellow-300 font-bold mb-2">🔥 테스트월드 확인 결과</p>
                                <p className="text-white mb-3">
                                    이번 헤이스트의 <span className="text-orange-400 font-bold">'피버 타임(일 1회, 5분)'</span> 소환 몬스터가 <span className="text-green-400 font-bold">레벨 범위 몬스터 처치 수(레범몬)</span>에 포함되는 것이 확인되었습니다.
                                </p>
                                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                    <p className="text-white font-bold mb-2">📊 피버 타임 1회(5분) 처치 수:</p>
                                    <p className="text-3xl font-black text-green-400 mb-2">약 11,000 마리</p>
                                    <p className="text-sm text-slate-400">(카산드라 수정구슬 스킬 포함)</p>
                                </div>
                                <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 mt-2">
                                    <p className="text-sm text-white">
                                        ⚠️ <span className="text-red-400 font-bold">메이플ID당 1일 1회</span>만 사용할 수 있습니다.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-purple-900/20 border border-purple-500/50 rounded-lg p-4">
                                <p className="text-purple-300 font-bold mb-2">💡 의미</p>
                                <p className="text-white">
                                    하루 딱 <span className="text-yellow-400 font-bold">5분만 투자</span>해도 챌린저스/헤이스트 일일 목표의 상당수가 자동 해결됩니다.
                                </p>
                            </div>

                            <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
                                <p className="text-blue-300 font-bold mb-2">📐 계산 기준</p>
                                <p className="text-sm text-white">
                                    이를 바탕으로 3가지 유형별 최적의 루트를 계산했습니다.<br />
                                    <span className="text-slate-400">(※ 시간당 1.7만 마리 처치 스펙 기준)</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: TYPE A - 공짜 파트너 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-2 border-green-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <Gift className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-green-400">
                                    2. TYPE A. "나는 공짜만 챙길래" (챌린저스 파트너)
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3 text-lg">🎯 목표</h3>
                                <p className="text-white mb-2">
                                    주간 <span className="text-green-400 font-bold text-xl">100,000 마리</span>
                                </p>
                                <p className="text-sm text-slate-400">(헌팅 포인트 주간 한도)</p>
                            </div>

                            <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
                                <p className="text-yellow-300 font-bold mb-2">💡 추천</p>
                                <p className="text-white">
                                    파트너가 없다면 <span className="text-red-400 font-bold">지금 당장 구하세요.</span> 사실상 공짜입니다.
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-600">
                                            <th className="text-left p-3 text-cyan-400">구분</th>
                                            <th className="text-right p-3 text-cyan-400">마릿수</th>
                                            <th className="text-right p-3 text-cyan-400">소요 시간</th>
                                            <th className="text-left p-3 text-cyan-400">비고</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-white">
                                        <tr className="border-b border-slate-700/50">
                                            <td className="p-3 font-bold">피버 타임 (7일)</td>
                                            <td className="text-right p-3 text-green-400 font-bold">77,000</td>
                                            <td className="text-right p-3">매일 5분</td>
                                            <td className="p-3 text-sm text-slate-400">기본 확보</td>
                                        </tr>
                                        <tr className="border-b border-slate-700/50">
                                            <td className="p-3 font-bold">추가 사냥 (7일)</td>
                                            <td className="text-right p-3 text-yellow-400 font-bold">23,000</td>
                                            <td className="text-right p-3">매일 약 12분</td>
                                            <td className="p-3 text-sm text-slate-400">일일 3,300마리</td>
                                        </tr>
                                        <tr className="bg-green-900/30">
                                            <td className="p-3 font-bold text-white">총 합계</td>
                                            <td className="text-right p-3 text-green-400 font-black text-lg">100,000</td>
                                            <td className="text-right p-3 text-green-400 font-bold">하루 총 17분</td>
                                            <td className="p-3 text-green-400 font-bold">주간 보상 100% 달성</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/50 rounded-lg p-4">
                                <p className="text-white font-bold text-lg mb-2">👉 결론</p>
                                <p className="text-white">
                                    하루에 피버 타임 쓰고 <span className="text-yellow-400 font-bold">10분만 더 사냥하면 주간 보상 끝</span>입니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AdSense Ad */}
                <InArticleAd
                    dataAdSlot="8162808816"
                    className="my-12"
                />

                {/* Section 3: TYPE B - 가성비 전략 (추천) */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                        {/* 추천 배지 */}
                        <div className="absolute top-4 right-4">
                            <span className="px-4 py-2 bg-yellow-500 text-black text-sm font-black rounded-full animate-pulse shadow-lg">
                                👑 추천
                            </span>
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-purple-400">
                                    3. TYPE B. "가성비 & 윈윈 전략"<br />
                                    (챌린저스 듀오 + 헤이스트 20만)
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3 text-lg">🎯 목표</h3>
                                <p className="text-white mb-2">
                                    주간 <span className="text-purple-400 font-bold text-xl">200,000 마리</span>
                                </p>
                            </div>

                            <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
                                <p className="text-yellow-300 font-bold mb-2">💎 이유</p>
                                <p className="text-white">
                                    헤이스트 트레져 박스 경험치 <span className="text-green-400 font-bold">+50%</span> 해금<br />
                                    <span className="text-sm text-slate-400">(폴로/프리토/에스페시아 효율 극대화)</span>
                                </p>
                            </div>

                            <div className="bg-purple-900/20 border border-purple-500/50 rounded-lg p-4">
                                <p className="text-purple-300 font-bold mb-2">🎮 전략</p>
                                <p className="text-white">
                                    <span className="text-orange-400 font-bold">챌린저스 듀오(1만 캐시)</span> 구매 → <span className="text-cyan-400 font-bold">챌린저스 서버 캐릭터</span>로 사냥
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-600">
                                            <th className="text-left p-3 text-purple-400">구분</th>
                                            <th className="text-right p-3 text-purple-400">마릿수</th>
                                            <th className="text-right p-3 text-purple-400">소요 시간</th>
                                            <th className="text-left p-3 text-purple-400">비고</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-300">
                                        <tr className="border-b border-slate-700/50">
                                            <td className="p-3 font-bold">피버 타임 (7일)</td>
                                            <td className="text-right p-3 text-green-400 font-bold">77,000</td>
                                            <td className="text-right p-3">매일 5분</td>
                                            <td className="p-3 text-sm text-slate-400">기본 확보</td>
                                        </tr>
                                        <tr className="border-b border-slate-700/50">
                                            <td className="p-3 font-bold">추가 사냥 (7일)</td>
                                            <td className="text-right p-3 text-yellow-400 font-bold">123,000</td>
                                            <td className="text-right p-3">매일 약 62분</td>
                                            <td className="p-3 text-sm text-slate-400">일일 1.7만 마리</td>
                                        </tr>
                                        <tr className="bg-purple-900/30">
                                            <td className="p-3 font-bold text-white">총 합계</td>
                                            <td className="text-right p-3 text-purple-400 font-black text-lg">200,000</td>
                                            <td className="text-right p-3 text-purple-400 font-bold">하루 총 1시간 7분</td>
                                            <td className="p-3 text-purple-400 font-bold">EXP 듀오 효율 급상승</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-yellow-500/50 rounded-lg p-5">
                                <p className="text-white font-bold text-xl mb-3">👉 결론</p>
                                <p className="text-white text-lg mb-3">
                                    <span className="text-yellow-400 font-bold">"하루 1시간(반재획)"</span>입니다.
                                </p>
                                <p className="text-white">
                                    재획비 하나 먹고 1시간 사냥하면 <span className="text-green-400 font-bold">[본캐 경험치(듀오 포인트) + 챌섭 캐릭 육성 + 헤이스트 혜택]</span>을 몽땅 챙기는 <span className="text-red-400 font-bold">1석 3조</span> 구간입니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: TYPE C - 헤비 유저 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-2 border-orange-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                                <Target className="w-6 h-6 text-orange-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-orange-400">
                                    4. TYPE C. "헤비 유저 & 풀 해금"<br />
                                    (헤이스트 30만 졸업)
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3 text-lg">🎯 목표</h3>
                                <p className="text-white mb-2">
                                    주간 <span className="text-orange-400 font-bold text-xl">300,000 마리</span>
                                </p>
                            </div>

                            <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
                                <p className="text-yellow-300 font-bold mb-2">🏆 이유</p>
                                <div className="text-white space-y-1">
                                    <p>• 솔 에르다 획득량 <span className="text-green-400 font-bold">2배</span></p>
                                    <p>• <span className="text-red-400 font-bold">보약 칭호</span> 획득 (보공 30% + 방무 30%)</p>
                                </div>
                            </div>

                            <div className="bg-purple-900/20 border border-purple-500/50 rounded-lg p-4">
                                <p className="text-purple-300 font-bold mb-2">🎮 전략</p>
                                <p className="text-white">
                                    챌린저스 듀오 구매 후 풀 사냥
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-600">
                                            <th className="text-left p-3 text-orange-400">구분</th>
                                            <th className="text-right p-3 text-orange-400">마릿수</th>
                                            <th className="text-right p-3 text-orange-400">소요 시간</th>
                                            <th className="text-left p-3 text-orange-400">비고</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-300">
                                        <tr className="border-b border-slate-700/50">
                                            <td className="p-3 font-bold">피버 타임 (7일)</td>
                                            <td className="text-right p-3 text-green-400 font-bold">77,000</td>
                                            <td className="text-right p-3">매일 5분</td>
                                            <td className="p-3 text-sm text-slate-400">기본 확보</td>
                                        </tr>
                                        <tr className="border-b border-slate-700/50">
                                            <td className="p-3 font-bold">추가 사냥 (7일)</td>
                                            <td className="text-right p-3 text-yellow-400 font-bold">223,000</td>
                                            <td className="text-right p-3">매일 약 112분</td>
                                            <td className="p-3 text-sm text-slate-400">일일 3.1만 마리</td>
                                        </tr>
                                        <tr className="bg-orange-900/30">
                                            <td className="p-3 font-bold text-white">총 합계</td>
                                            <td className="text-right p-3 text-orange-400 font-black text-lg">300,000</td>
                                            <td className="text-right p-3 text-orange-400 font-bold">하루 총 1시간 57분</td>
                                            <td className="p-3 text-orange-400 font-bold">모든 보상 풀 해금</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-red-500/50 rounded-lg p-4">
                                <p className="text-white font-bold text-lg mb-2">👉 결론</p>
                                <p className="text-white">
                                    <span className="text-yellow-400 font-bold">"하루 2시간(1재획)"</span>입니다.
                                </p>
                                <p className="text-white mt-2">
                                    하루 1재획씩 하시는 분들은 자연스럽게 달성되며, 챌린저스 듀오 포인트도 한계치까지 뽑아먹을 수 있습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AdSense Ad */}
                <InArticleAd
                    dataAdSlot="8162808816"
                    className="my-12"
                />

                {/* Section 5: 최종 요약 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-orange-500 rounded-xl p-6 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                            <Sparkles className="w-6 h-6 text-orange-400" />
                            최종 요약
                        </h2>

                        <div className="space-y-4">
                            <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4">
                                <p className="text-white font-bold text-lg mb-2">1️⃣ 파트너 필수</p>
                                <p className="text-white">
                                    챌린저스 파트너가 없다면 무조건 구하세요. 하루 <span className="text-yellow-400 font-bold">17분(피버+12분)</span>이면 주간 보상 다 받습니다.
                                </p>
                            </div>

                            <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-4">
                                <p className="text-white font-bold text-lg mb-2">2️⃣ 최고의 조합</p>
                                <p className="text-white">
                                    <span className="text-yellow-400 font-bold">헤이스트 + 챌린저스 파트너 + 챌린저스 듀오</span>는 최고의 조합입니다. 본캐와 부캐가 동시에 폭풍 성장하며, <span className="text-green-400 font-bold">모든 이벤트 혜택을 극대화</span>할 수 있습니다.
                                </p>
                            </div>

                            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
                                <p className="text-white font-bold text-lg mb-2">3️⃣ 듀오 투자 가치</p>
                                <p className="text-white">
                                    1주일에 20만 마리(하루 1시간) 이상 사냥할 계획이라면, <span className="text-orange-400 font-bold">챌린저스 EXP 듀오(1만원)</span> 투자는 충분히 가치가 있습니다.
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-8 pt-6 border-t border-slate-700">
                            <p className="text-white text-xl font-bold mb-2">
                                2월 12일, 챌린저스 월드에서 뵙겠습니다! 🔥
                            </p>
                        </div>

                        {/* SEO Keywords */}
                        <div className="mt-8 pt-6 border-t border-slate-700">
                            <p className="text-slate-500 text-sm text-center leading-relaxed">
                                <span className="text-slate-600">#</span>메이플스토리 <span className="text-slate-600">#</span>헤이스트BEYOND
                                <span className="text-slate-600"> #</span>챌린저스듀오 <span className="text-slate-600">#</span>챌린저스파트너
                                <span className="text-slate-600"> #</span>경험치가이드 <span className="text-slate-600">#</span>육성가이드
                                <span className="text-slate-600"> #</span>피버타임 <span className="text-slate-600">#</span>트레져박스
                                <span className="text-slate-600"> #</span>헤이스트효율 <span className="text-slate-600">#</span>메이플육성
                                <span className="text-slate-600"> #</span>레벨업 <span className="text-slate-600">#</span>폭업
                                <span className="text-slate-600"> #</span>시간계산 <span className="text-slate-600">#</span>효율가이드
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <div className="border-t border-slate-700 pt-8 mt-12">
                    <div className="text-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-500 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            블로그 메인으로
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
