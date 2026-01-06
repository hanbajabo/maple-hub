import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Brain, Target, Sparkles, Calculator, Search, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
    title: '메이플 AI 단풍이 소개 & 판단 기준 - 메이플 AI',
    description: '메이플 AI의 마스코트 단풍이 소개와 아이템 진단, 스펙 분석 기준을 상세히 알려드립니다.',
};

export default function AboutDanpungPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href="/guide"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">가이드 목록으로</span>
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">단풍이 소개 & 판단 기준</h1>
                    <p className="text-slate-400 mt-2">메이플 AI의 핵심, 단풍이의 모든 것을 알려드립니다.</p>
                </div>
            </div>

            {/* Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Profile Section */}
                <section className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative shrink-0">
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                        <img
                            src="/images/maple-ai-logo.jpg"
                            alt="단풍이"
                            className="relative w-40 h-40 rounded-full object-cover border-4 border-slate-800 shadow-2xl"
                        />
                        <div className="absolute bottom-0 right-0 bg-green-500 w-8 h-8 rounded-full border-4 border-slate-800 flex items-center justify-center">
                            <span className="sr-only">Online</span>
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full mb-2">
                            Advanced AI Agent
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-3">단풍이 <span className="text-slate-500 text-lg font-normal">(Danpung-i)</span></h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            안녕하세요! 저는 메이플스토리 유저분들의 성장을 돕기 위해 태어난 AI 에이전트, <strong>단풍이</strong>입니다.<br />
                            수백만 건의 캐릭터 데이터를 학습하여, 여러분의 장비와 스펙을 객관적으로 분석하고 최적의 성장 경로를 제안해 드립니다.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            <span className="px-3 py-1 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-700">#데이터분석</span>
                            <span className="px-3 py-1 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-700">#스펙진단</span>
                            <span className="px-3 py-1 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-700">#성장가이드</span>
                        </div>
                    </div>
                </section>

                {/* Philosophy */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Brain className="w-6 h-6 text-indigo-400" />
                        단풍이의 분석 철학
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-800/20 border border-slate-700 rounded-xl p-6">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                                <Target className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="font-bold text-white mb-2">객관성 (Objectivity)</h3>
                            <p className="text-sm text-slate-400">
                                개인적인 경험이나 '카더라' 통신이 아닌, 랭커들의 실제 세팅 데이터와 수학적 확률 계산을 기반으로 판단합니다.
                            </p>
                        </div>
                        <div className="bg-slate-800/20 border border-slate-700 rounded-xl p-6">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                                <Sparkles className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="font-bold text-white mb-2">효율성 (Efficiency)</h3>
                            <p className="text-sm text-slate-400">
                                최소한의 메소로 최대의 스펙업 효과를 낼 수 있는 '가성비' 구간을 정확히 짚어드립니다. (예: 17성, 9/10, 2줄 유효)
                            </p>
                        </div>
                        <div className="bg-slate-800/20 border border-slate-700 rounded-xl p-6">
                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                                <ShieldCheck className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="font-bold text-white mb-2">안전성 (Safety)</h3>
                            <p className="text-sm text-slate-400">
                                무리한 스타포스나 큐브 도박보다는, 확정적인 스펙업 수단(심볼, 코강, 링크/유니온)을 우선적으로 권장합니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Criteria Details */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Calculator className="w-6 h-6 text-orange-400" />
                        상세 판단 기준
                    </h2>

                    <div className="space-y-8">
                        {/* Starforce */}
                        <div className="bg-slate-800/20 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">⭐ 스타포스 (Starforce)</h3>
                            <ul className="space-y-3 text-slate-300 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400 font-bold">•</span>
                                    <span>
                                        <strong className="text-white">10~12성:</strong> 뉴비/유니온 육성 단계의 기본 세팅으로 간주합니다.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400 font-bold">•</span>
                                    <span>
                                        <strong className="text-white">17성:</strong> 가성비 종결 구간입니다. 파괴 방지가 가능하고 기댓값이 합리적인 17성을 적극 권장합니다.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400 font-bold">•</span>
                                    <span>
                                        <strong className="text-white">18성:</strong> 17성 대비 적은 비용으로 공격력/마력을 크게 챙길 수 있는 숨겨진 꿀통 구간입니다. 22성 도전이 부담스럽다면 18성 둘둘을 강력 추천합니다.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400 font-bold">•</span>
                                    <span>
                                        <strong className="text-white">22성:</strong> 해방 및 최상위 보스를 위한 필수 조건으로 판단합니다.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Potential */}
                        <div className="bg-slate-800/20 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">🔮 잠재능력 (Potential)</h3>
                            <ul className="space-y-3 text-slate-300 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 font-bold">•</span>
                                    <span>
                                        <strong className="text-white">에픽 9% (6%+3%):</strong> 가성비 세팅의 기준입니다. 수큐로 띄울 수 있는 현실적인 목표입니다.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 font-bold">•</span>
                                    <span>
                                        <strong className="text-white">유니크 15% (9%+6%):</strong> 이벤트 링 큐브 등을 활용한 중자본 유저의 목표입니다.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 font-bold">•</span>
                                    <span>
                                        <strong className="text-white">레전드리 21% (12%+9%):</strong> 본격적인 보스 레이드를 위한 스펙으로 판단합니다.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 font-bold">•</span>
                                    <span>
                                        <strong className="text-white">쿨타임 감소:</strong> 직업별 효율표(DPM)를 기준으로 -2초 이상부터 유효 옵션으로 인정합니다.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Additional Options */}
                        <div className="bg-slate-800/20 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">🔥 추가옵션 (Bonus Stats)</h3>
                            <ul className="space-y-3 text-slate-300 text-base">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 font-bold">•</span>
                                    <span>
                                        <strong className="text-white">무기:</strong> 2추옵 이상을 권장하며, 1추옵은 엔드 스펙으로 간주합니다. (법사는 마력 추옵 기준)
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 font-bold">•</span>
                                    <div className="w-full">
                                        <strong className="text-white block mb-1">140~160제 (카루타/앱솔랩스):</strong>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-400">
                                            <span>• 보통: 100~109급</span>
                                            <span>• 준수: 110~119급</span>
                                            <span>• 좋음: 120~129급</span>
                                            <span>• 매우 좋음: 130~139급</span>
                                            <span>• 최상급: 140급+</span>
                                            <span className="text-yellow-400 font-bold">• 종결: 150급+</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 font-bold">•</span>
                                    <div className="w-full">
                                        <strong className="text-white block mb-1">200제 (아케인셰이드):</strong>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-400">
                                            <span>• 부캐용: 100~109급</span>
                                            <span>• 보통: 110~119급</span>
                                            <span>• 준수: 120~129급</span>
                                            <span>• 좋음: 130~139급</span>
                                            <span>• 꽤 좋음: 140~149급</span>
                                            <span>• 매우 좋음: 150~159급</span>
                                            <span>• 최상급: 160~169급</span>
                                            <span className="text-yellow-400 font-bold">• 종결: 170급+</span>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 font-bold">•</span>
                                    <div className="w-full">
                                        <strong className="text-white block mb-1">250제 (에테르넬):</strong>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-400">
                                            <span>• 부캐용: 100~109급</span>
                                            <span>• 아쉬움: 110~119급</span>
                                            <span>• 보통: 120~129급</span>
                                            <span>• 준수: 130~139급</span>
                                            <span>• 좋음: 140~149급</span>
                                            <span>• 꽤 좋음: 150~159급</span>
                                            <span>• 매우 좋음: 160~169급</span>
                                            <span>• 최상급: 170~179급</span>
                                            <span className="text-yellow-400 font-bold">• 종결: 180급+</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Search className="w-6 h-6 text-blue-400" />
                        자주 묻는 질문
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                            <h3 className="font-bold text-white mb-2">Q. 단풍이의 진단 결과는 100% 정확한가요?</h3>
                            <p className="text-sm text-slate-400">
                                A. 단풍이는 일반적인 효율을 기준으로 진단합니다. 하지만 특정 직업의 특수성이나, 유저분의 플레이 스타일(보스 위주 vs 사냥 위주)에 따라 최적의 세팅은 달라질 수 있습니다. 참고용 지표로 활용하시는 것을 추천합니다.
                            </p>
                        </div>
                        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                            <h3 className="font-bold text-white mb-2">Q. 데이터는 어디서 가져오나요?</h3>
                            <p className="text-sm text-slate-400">
                                A. 넥슨 오픈 API를 통해 실시간으로 캐릭터 정보를 조회하며, 메이플스토리 공식 홈페이지의 랭킹 데이터와 커뮤니티의 검증된 공략 데이터를 학습하여 판단 기준을 지속적으로 업데이트합니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 bg-gradient-to-r from-indigo-900/20 to-blue-900/20 border border-indigo-500/30 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">단풍이에게 진단 받아보실래요?</h3>
                    <p className="text-slate-300 mb-6">
                        지금 바로 내 캐릭터 닉네임을 입력하고, AI 정밀 진단을 받아보세요!
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors shadow-lg"
                    >
                        내 캐릭터 진단하러 가기 →
                    </Link>
                </div>

            </article>
        </div>
    );
}
