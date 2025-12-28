'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, TrendingUp, Info, Clock, Target, Zap, CheckCircle } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function MonsterPark2025() {
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
                            경험치 가이드
                        </span>
                        <span className="text-slate-500 text-sm">2025년 12월 13일</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                        🎮 몬스터파크 극한 효율 가이드 - 레벨별 최적 사냥터 완벽 분석
                    </h1>
                    <p className="text-lg text-slate-400">
                        260~299 레벨 구간별로 몬스터파크에서 얻을 수 있는 경험치 효율을 완벽하게 정리했습니다.
                        당신의 레벨에 맞는 최적의 사냥터를 찾아보세요.
                    </p>
                </header>

                {/* Key Info Box */}
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-600/10 border border-purple-500/30 rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        몬스터파크, 왜 중요한가?
                    </h3>
                    <ul className="space-y-2 text-slate-300">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-400 font-bold">⏰</span>
                            <span><strong>하루 2회</strong> 무료 입장 + 추가 티켓으로 최대 효율</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-400 font-bold">🎯</span>
                            <span><strong>안정적인 경험치 수급</strong> - 사냥터 경쟁 없이 편하게</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-400 font-bold">💰</span>
                            <span><strong>포인트샵 아이템 교환</strong> - 부가 보상까지</span>
                        </li>
                    </ul>
                </div>

                {/* Introduction */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-3">몬스터파크, 제대로 알고 가자</h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-slate-300 leading-relaxed mb-4">
                            반갑습니다! 이번 패치로 <strong className="text-purple-400">몬스터파크가 대대적으로 리뉴얼</strong>되면서
                            경험치 효율이 크게 개선되었습니다. 특히 260~299 레벨 구간의 유저들에게는
                            <strong className="text-yellow-400"> 필수 일일 콘텐츠</strong>가 되었죠.
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            하지만 "내 레벨에는 어떤 사냥터가 최적일까?"라는 질문에 명확한 답을 찾기 어려웠습니다.
                            그래서 제가 직접 <strong className="text-blue-400">레벨별 경험치 획득률을 완벽하게 정리</strong>했습니다.
                        </p>
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 my-6">
                            <p className="text-yellow-400 font-bold text-lg mb-2">💡 핵심 포인트</p>
                            <p className="text-slate-300">
                                같은 몬스터파크라도 <strong>레벨에 따라 효율이 천차만별</strong>입니다.
                                260레벨에서는 리멘이 0.898%인데, 279레벨에서는 0.093%로 떨어집니다.
                                레벨 구간별 최적 선택이 필수입니다!
                            </p>
                        </div>
                    </div>
                </section>

                {/* Understanding the Tables */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-3">표 보는 법 (초보자 가이드)</h2>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                </div>
                                <h3 className="font-bold text-lg">높은 퍼센트 = 좋음</h3>
                            </div>
                            <p className="text-slate-400 text-sm">
                                숫자가 높을수록 경험치 효율이 좋습니다. 예: 2.164% &gt; 0.898%
                            </p>
                        </div>
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                                    <Info className="w-5 h-5 text-red-400" />
                                </div>
                                <h3 className="font-bold text-lg">'-' 표시 = 입장 불가</h3>
                            </div>
                            <p className="text-slate-400 text-sm">
                                해당 레벨에서는 그 사냥터에 입장할 수 없습니다.
                            </p>
                        </div>
                    </div>
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-5">
                        <p className="text-blue-300 text-sm">
                            <strong className="text-blue-400">💡 TIP:</strong> 각 레벨에서 가장 높은 수치의 사냥터를 선택하세요!
                            예를 들어 260레벨이라면 세르니움(2.164%)이 리멘(0.898%)보다 2배 이상 효율이 좋습니다.
                        </p>
                    </div>
                </section>

                {/* AdSense Ad - After Introduction */}
                <InArticleAd
                    dataAdSlot="8162808816"
                    className="my-12"
                />

                {/* Table 1: Lv. 260-279 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-3">
                        📊 Lv. 260 ~ 279 구간 상세 분석
                    </h2>

                    <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
                        <Image
                            src="/images/blog/monsterpark_260_279.png"
                            alt="몬스터파크 260-279 레벨 경험치 표"
                            width={1200}
                            height={800}
                            className="w-full rounded-lg"
                        />
                    </div>

                    <div className="space-y-6">
                        {/* 260-264 */}
                        <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-lg p-5">
                            <h3 className="text-xl font-bold text-blue-400 mb-3 flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Lv. 260 ~ 264: 세르니움 독주
                            </h3>
                            <p className="text-slate-300 mb-3">
                                이 구간에서는 <strong className="text-yellow-400">세르니움</strong>이 압도적입니다.
                                리멘보다 2배 이상 높은 효율을 보여줍니다.
                            </p>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                                <p className="text-sm text-slate-300">
                                    <span className="text-green-400 font-bold">✅ 추천:</span> 세르니움 (2.079% ~ 2.164%)<br />
                                    <span className="text-red-400 font-bold">❌ 비추:</span> 리멘은 효율이 절반 수준
                                </p>
                            </div>
                        </div>

                        {/* 265-269 */}
                        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-5">
                            <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Lv. 265 ~ 269: 아르크스 해금, 하지만 여전히 세르니움
                            </h3>
                            <p className="text-slate-300 mb-3">
                                265부터 <strong className="text-purple-400">아르크스</strong>가 해금되지만,
                                아직은 <strong className="text-yellow-400">세르니움</strong>이 더 효율적입니다.
                            </p>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                                <p className="text-sm text-slate-300">
                                    <span className="text-green-400 font-bold">✅ 1순위:</span> 세르니움 (1.537% ~ 1.599%)<br />
                                    <span className="text-yellow-400 font-bold">🔶 2순위:</span> 아르크스 (1.823% ~ 1.897%)도 나쁘지 않음
                                </p>
                            </div>
                        </div>

                        {/* 270-274 */}
                        <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg p-5">
                            <h3 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Lv. 270 ~ 274: 오디움 등장! 최고 효율
                            </h3>
                            <p className="text-slate-300 mb-3">
                                드디어 게임 체인저인 <strong className="text-yellow-400">오디움</strong>이 해금됩니다!
                                이 구간에서 가장 높은 효율을 자랑합니다.
                            </p>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                                <p className="text-sm text-slate-300">
                                    <span className="text-green-400 font-bold">✅ 1순위:</span> 오디움 (0.938% ~ 0.976%)<br />
                                    <span className="text-blue-400 font-bold">💡 차선책:</span> 아르크스 (0.789% ~ 0.821%)
                                </p>
                            </div>
                        </div>

                        {/* 275-279 */}
                        <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-lg p-5">
                            <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Lv. 275 ~ 279: 도원경 시대의 시작
                            </h3>
                            <p className="text-slate-300 mb-3">
                                275부터는 <strong className="text-yellow-400">도원경</strong>이 해금되며 최고 효율을 보입니다.
                                279까지 꾸준히 도원경을 이용하세요!
                            </p>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                                <p className="text-sm text-slate-300">
                                    <span className="text-green-400 font-bold">✅ 1순위:</span> 도원경 (0.460% ~ 0.674%)<br />
                                    <span className="text-yellow-400 font-bold">🔶 2순위:</span> 오디움 (0.317% ~ 0.464%)
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Table 2: Lv. 280-299 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-3">
                        📊 Lv. 280 ~ 299 구간 상세 분석
                    </h2>

                    <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
                        <Image
                            src="/images/blog/monsterpark_280_299.png"
                            alt="몬스터파크 280-299 레벨 경험치 표"
                            width={1200}
                            height={800}
                            className="w-full rounded-lg"
                        />
                    </div>

                    <div className="space-y-6">
                        {/* 280-284 */}
                        <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-5">
                            <h3 className="text-xl font-bold text-cyan-400 mb-3 flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Lv. 280 ~ 284: 아르테리아 효율 1위
                            </h3>
                            <p className="text-slate-300 mb-3">
                                280 구간에 진입하면 <strong className="text-yellow-400">아르테리아</strong>가 최고 효율을 보입니다.
                                도원경 대비 약 1.4배 높은 경험치를 제공합니다.
                            </p>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                                <p className="text-sm text-slate-300">
                                    <span className="text-green-400 font-bold">✅ 1순위:</span> 아르테리아 (0.218% ~ 0.319%)<br />
                                    <span className="text-blue-400 font-bold">💡 차선책:</span> 도원경도 여전히 괜찮음
                                </p>
                            </div>
                        </div>

                        {/* 285-289 */}
                        <div className="bg-gradient-to-r from-pink-900/20 to-rose-900/20 border border-pink-500/30 rounded-lg p-5">
                            <h3 className="text-xl font-bold text-pink-400 mb-3 flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Lv. 285 ~ 289: 카르시온 등장
                            </h3>
                            <p className="text-slate-300 mb-3">
                                285부터 <strong className="text-purple-400">카르시온</strong>이 해금되며,
                                <strong className="text-yellow-400"> 아르테리아보다 약간 높은 효율</strong>을 보입니다.
                            </p>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                                <p className="text-sm text-slate-300">
                                    <span className="text-green-400 font-bold">✅ 1순위:</span> 카르시온 (0.107% ~ 0.157%)<br />
                                    <span className="text-yellow-400 font-bold">🔶 2순위:</span> 아르테리아 (0.074% ~ 0.108%)
                                </p>
                            </div>
                        </div>

                        {/* 290-299 */}
                        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-lg p-5">
                            <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Lv. 290 ~ 299: 탈라하트 최종 해금
                            </h3>
                            <p className="text-slate-300 mb-3">
                                290부터는 최종 사냥터인 <strong className="text-yellow-400">탈라하트</strong>가 해금됩니다.
                                이 구간에서 가장 높은 효율을 제공합니다!
                            </p>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                                <p className="text-sm text-slate-300">
                                    <span className="text-green-400 font-bold">✅ 1순위:</span> 탈라하트 (0.013% ~ 0.074%)<br />
                                    <span className="text-blue-400 font-bold">💡 참고:</span> 299에 가까워질수록 효율이 급격히 떨어지니 주의!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AdSense Ad - Mid Article */}
                <InArticleAd
                    dataAdSlot="6849727140"
                    className="my-12"
                />

                {/* Quick Reference */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-3">⚡ 빠른 참조 가이드</h2>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 rounded-xl p-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-slate-900/50 rounded-lg p-4 border border-blue-500/20">
                                <p className="text-blue-400 font-bold mb-2">📍 Lv. 260-264</p>
                                <p className="text-2xl font-black text-white">세르니움</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4 border border-blue-500/20">
                                <p className="text-blue-400 font-bold mb-2">📍 Lv. 265-269</p>
                                <p className="text-2xl font-black text-white">세르니움</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4 border border-green-500/20">
                                <p className="text-green-400 font-bold mb-2">📍 Lv. 270-274</p>
                                <p className="text-2xl font-black text-white">오디움</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4 border border-yellow-500/20">
                                <p className="text-yellow-400 font-bold mb-2">📍 Lv. 275-279</p>
                                <p className="text-2xl font-black text-white">도원경</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/20">
                                <p className="text-cyan-400 font-bold mb-2">📍 Lv. 280-284</p>
                                <p className="text-2xl font-black text-white">아르테리아</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4 border border-pink-500/20">
                                <p className="text-pink-400 font-bold mb-2">📍 Lv. 285-289</p>
                                <p className="text-2xl font-black text-white">카르시온</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4 border border-red-500/20 md:col-span-2">
                                <p className="text-red-400 font-bold mb-2 text-center">📍 Lv. 290-299</p>
                                <p className="text-2xl font-black text-white text-center">탈라하트</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pro Tips */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-3">💎 고수의 팁</h2>
                    <div className="space-y-4">
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-5">
                            <h3 className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                1. 매일 2회는 필수
                            </h3>
                            <p className="text-slate-300 text-sm">
                                하루 2회 무료 입장권은 반드시 소진하세요. 추가 티켓이 있다면 주말에 몰아서 사용하는 것도 전략입니다.
                            </p>
                        </div>
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-5">
                            <h3 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                2. 레벨업 직후 사냥터 체크
                            </h3>
                            <p className="text-slate-300 text-sm">
                                특정 레벨(265, 270, 275, 280, 285, 290)을 달성하면 새로운 사냥터가 해금됩니다.
                                레벨업 직후 반드시 최적 사냥터를 확인하세요!
                            </p>
                        </div>
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-5">
                            <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                                <Zap className="w-5 h-5" />
                                3. 경험치 버프와 함께
                            </h3>
                            <p className="text-slate-300 text-sm">
                                PC방 버프, 익스트림 골드, MVP 쿠폰 등 경험치 버프를 최대한 활용하면 효율이 배로 증가합니다!
                            </p>
                        </div>
                    </div>
                </section>

                {/* Summary */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-purple-500 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-6 text-center">📝 마무리</h2>
                        <p className="text-slate-300 leading-relaxed text-center mb-6">
                            몬스터파크는 안정적인 경험치 수급의 핵심입니다.<br />
                            레벨에 맞는 최적의 사냥터를 선택하고, 매일 꾸준히 한다면<br />
                            <strong className="text-yellow-400">더 빠른 성장</strong>을 경험할 수 있습니다!
                        </p>
                        <div className="text-center">
                            <p className="text-slate-400 text-lg">
                                여러분의 메이플 라이프에 도움이 되길 바랍니다! 🍁
                            </p>
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
        </div>
    );
}
