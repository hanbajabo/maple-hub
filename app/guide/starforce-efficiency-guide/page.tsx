import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Target, Star, TrendingUp, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
    title: '스타포스 강화 가성비 가이드 - 메이플 AI',
    description: '구간별 스타포스 강화 효율과 가성비 분석. 140제 장비부터 슈페리얼까지 완벽 정리.',
};

const STARFORCE_STAGES = [
    {
        range: '0 ~ 9성',
        grade: '미달',
        color: 'red',
        description: '스타포스 강화가 전혀 되어 있지 않습니다.',
        longDescription: '스타포스 강화의 가장 기초적인 단계입니다. 이 구간에서는 강화 비용이 매우 저렴하고 성공 확률도 높습니다. 하지만 10성 미만의 장비는 상위 사냥터인 "스타포스 사냥터"에 입장하기 위한 조건을 충족시키기 어렵습니다. 따라서 어떤 장비든 최소 10성까지는 강화하는 것이 기본 예의이자 필수 조건입니다.',
        advice: '최소 10성은 필수입니다.'
    },
    {
        range: '10 ~ 12성',
        grade: '입문',
        color: 'orange',
        description: '유니온/링크 육성용 혹은 임시 거쳐가는 단계입니다.',
        longDescription: '유니온 육성용 캐릭터나 링크 스킬용 캐릭터에게 적합한 구간입니다. 본캐릭터가 사용하기에는 다소 부족한 스펙이지만, 아케인셰이드 장비처럼 기본 성능이 뛰어난 아이템이라면 12성으로도 충분히 실전에서 활용 가능합니다. 10성에서 11성으로 갈 때 확률이 급격히 떨어지므로 주의가 필요합니다.',
        advice: '본캐 장비라면 최소 17성을 목표로!'
    },
    {
        range: '13 ~ 16성',
        grade: '애매함',
        color: 'yellow',
        description: '가장 가성비가 떨어지는 구간입니다.',
        longDescription: '스타포스 강화에서 가장 "함정"이라고 불리는 구간입니다. 15성에서 16성으로 가는 확률이 30%로 매우 낮고, 실패 시 10성까지 떨어질 위험이 있어 기댓값이 매우 높습니다. 12성에서 멈추거나, 이벤트를 활용해 한 번에 17성까지 가는 것이 정신 건강과 메소 절약에 좋습니다.',
        advice: '17성을 목표로 달리세요. 여기서 멈추지 마세요!'
    },
    {
        range: '17 ~ 18성',
        grade: '국민 세팅',
        color: 'green',
        description: '가장 효율적인 가성비 구간입니다.',
        longDescription: '메이플스토리 유저들이 가장 많이 머무르는 "국민 세팅" 구간입니다. 17성 강화권을 사용하거나 1+1 이벤트를 활용하면 비교적 저렴하게 도달할 수 있습니다. 이 단계의 장비로도 하드 보스(루시드, 윌, 진 힐라)까지 충분히 공략 가능하므로, 무리해서 22성을 도전하기보다는 17성 둘둘 세팅을 먼저 완성하는 것을 추천합니다.',
        advice: '현역으로 충분합니다. 대부분의 유저가 여기서 멈춥니다.'
    },
    {
        range: '19 ~ 21성',
        grade: '고스펙',
        color: 'blue',
        description: '22성을 가기 위한 발판 혹은 가성비 종결 세팅입니다.',
        longDescription: '22성 도전을 하다가 멈춘 단계이거나, 가성비 있게 고스펙을 노리는 유저들의 선택지입니다. 21성은 22성보다 공격력 차이가 크지 않으면서 파괴 리스크를 한 번 덜 감수해도 된다는 장점이 있습니다. 하지만 되팔 때 제값을 받기 어려워 "설거지" 매물이 될 수 있다는 점을 유의해야 합니다.',
        advice: '22성 도전 전 중간 단계'
    },
    {
        range: '22성',
        grade: '졸업',
        color: 'purple',
        description: '스타포스 졸업입니다. 완벽합니다.',
        longDescription: '스타포스 강화의 실질적인 종착역입니다. 21성에서 22성 성공 시 공격력이 대폭 상승하며, 아이템의 가치 또한 크게 뜁니다. 22성 장비는 메이플스토리의 모든 콘텐츠를 즐기기에 부족함이 없는 최상급 스펙입니다. 여기까지 왔다면 이제 스타포스보다는 잠재능력이나 추가옵션 극추옵을 노리는 것이 효율적입니다.',
        advice: '이제 잠재능력과 추가옵션에 집중하세요!'
    },
    {
        range: '23성 이상',
        grade: '신화',
        color: 'gold',
        description: '기적의 아이템입니다.',
        longDescription: '성공 확률 3%, 실패 시 파괴 확률이 매우 높은, 그야말로 "신의 영역"입니다. 23성 아이템 하나가 서버 전체의 이슈가 될 정도로 희귀합니다. 일반적인 유저라면 절대 도전하지 않는 것을 권장하며, 22성 장비에 만족하는 것이 현명합니다.',
        advice: '서버 최상위 랭커의 영역입니다.'
    }
];

const SUPERIOR_STAGES = [
    {
        range: '5성 미만',
        grade: '입문',
        description: '슈페리얼 장비 강화 시작 단계',
        longDescription: '슈페리얼 장비(타일런트 등)는 일반 장비와 달리 강화 성공 시 스탯 상승량이 매우 높습니다. 1성만 올려도 일반 장비 5성 이상의 효율을 냅니다. 하지만 강화 비용이 비싸고 실패 시 패널티가 크므로 신중해야 합니다.'
    },
    {
        range: '5 ~ 9성',
        grade: '고효율',
        description: '슈페리얼의 가성비 최고 구간',
        longDescription: '슈페리얼 장비의 진가가 드러나는 구간입니다. 5성 이상부터는 공격력/마력이 붙기 시작하여 스펙 상승량이 폭발적으로 늘어납니다. 타일런트 망토나 벨트의 경우 5~7성 정도만 되어도 꽤 오랫동안 현역으로 사용할 수 있습니다.'
    },
    {
        range: '10 ~ 12성',
        grade: '졸업급',
        description: '22성급 성능! 슈페리얼의 종결',
        longDescription: '슈페리얼 장비의 10성은 일반 장비의 22성과 맞먹는 성능을 자랑합니다. 12성까지 강화에 성공한다면 그야말로 "종결급" 아이템이 됩니다. 하지만 10성 이후부터는 파괴 확률이 존재하므로, 파괴 방지 주문서를 사용하거나 여분의 장비를 준비해야 합니다.'
    }
];

const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
        red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', badge: 'bg-red-500/20 text-red-300' },
        orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-300' },
        yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', badge: 'bg-yellow-500/20 text-yellow-300' },
        green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', badge: 'bg-green-500/20 text-green-300' },
        blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-300' },
        purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300' },
        gold: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-300', badge: 'bg-yellow-500/30 text-yellow-200' },
    };
    return colors[color] || colors.green;
};

export default function StarforceGuidePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link href="/guide" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">가이드 목록으로</span>
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">스타포스 강화 가성비 가이드</h1>
                    <p className="text-slate-400 mt-2">구간별 효율과 가성비 완벽 분석</p>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-4 mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                    <img src="/images/maple-ai-logo.jpg" alt="단풍이" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <div className="font-bold text-white">메이플 AI 단풍이</div>
                        <div className="text-sm text-slate-400">실전 검증된 스타포스 가성비 분석 · 2025년 업데이트</div>
                    </div>
                </div>

                <section className="prose prose-invert max-w-none mb-12">
                    <div className="bg-gradient-to-br from-yellow-900/30 via-orange-900/30 to-red-900/30 border border-yellow-500/40 rounded-2xl p-8 mb-8 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-orange-600/10 opacity-50"></div>

                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                            <Target className="w-8 h-8 text-yellow-400 animate-pulse" />
                            스타포스란?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6 relative z-10">
                            <div className="space-y-4">
                                <p className="text-slate-300 leading-relaxed">
                                    스타포스는 장비를 강화하여 <strong className="text-white">공격력/마력과 올스탯</strong>을 올리는 핵심 시스템입니다.
                                    주문서 작이 완료된 장비에 별(Star)을 달아 성능을 비약적으로 향상시킬 수 있습니다.
                                </p>
                                <p className="text-slate-300 leading-relaxed">
                                    하지만 모든 구간의 <strong className="text-yellow-400">가성비가 같지 않습니다</strong>!
                                    특정 구간에서는 강화 비용 대비 성능 향상폭이 낮거나, 파괴 위험이 높을 수 있습니다.
                                    이 가이드를 통해 가장 효율적인 투자 구간을 확인하세요.
                                </p>

                                <div className="bg-orange-950/50 border border-orange-500/30 rounded-lg p-4 mt-2">
                                    <h4 className="text-sm font-bold text-orange-300 mb-2">💡 핵심 요약</h4>
                                    <ul className="space-y-1 text-sm text-slate-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-yellow-400 mt-0.5">•</span>
                                            <span><strong className="text-white">10성</strong>: 최소한의 예의</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-yellow-400 mt-0.5">•</span>
                                            <span><strong className="text-white">17성</strong>: 가성비 최고의 국민 세팅</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-yellow-400 mt-0.5">•</span>
                                            <span><strong className="text-white">22성</strong>: 엔드 스펙의 시작</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                                <img
                                    src="/images/guides/starforce-ui.png"
                                    alt="인게임 스타포스 강화 화면"
                                    className="relative w-full h-auto rounded-lg shadow-2xl border border-yellow-500/30 hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-lg">
                                    <p className="text-xs text-slate-300 text-center">
                                        ✨ 22성 → 23성 도전 화면 (파괴 확률 주의!)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <Star className="w-6 h-6 text-yellow-400" />
                        일반 장비 (140제 이상, 25성 가능)
                    </h2>

                    <div className="space-y-4">
                        {STARFORCE_STAGES.map((stage, idx) => {
                            const colors = getColorClasses(stage.color);
                            return (
                                <div key={idx} className={`${colors.bg} border ${colors.border} rounded-xl p-6`}>
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-white">{stage.range}</h3>
                                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${colors.badge}`}>
                                                    {stage.grade}
                                                </span>
                                            </div>
                                            <p className="text-white font-bold text-lg mb-2">{stage.description}</p>

                                            {/* 상세 설명 추가 */}
                                            <div className="mb-4 p-3 bg-slate-900/30 rounded-lg">
                                                <p className="text-slate-300 text-sm leading-relaxed">
                                                    {stage.longDescription}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`mt-3 pt-3 border-t border-slate-700 ${colors.text} font-medium text-sm`}>
                                        💡 {stage.advice}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-blue-400" />
                        특수 장비 (슈페리얼 - 타일런트)
                    </h2>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
                        <p className="text-slate-300 leading-relaxed">
                            슈페리얼 장비는 <strong className="text-yellow-400">최대 12성</strong>까지만 강화 가능하지만,
                            <strong className="text-green-400"> 10성이 일반 장비 22성급 성능</strong>을 냅니다!
                            강화 비용이 비싸고 실패 시 장비가 파괴될 수 있으므로 주의가 필요합니다.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {SUPERIOR_STAGES.map((stage, idx) => (
                            <div key={idx} className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-white">{stage.range}</h3>
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-bold">
                                        {stage.grade}
                                    </span>
                                </div>
                                <p className="text-white font-bold text-lg mb-2">{stage.description}</p>
                                <div className="p-3 bg-slate-900/30 rounded-lg">
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        {stage.longDescription}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12">핵심 팁 & 전략</h2>

                    <div className="space-y-4">
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                13~16성 구간은 건너뛰세요!
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                가장 <strong className="text-yellow-400">가성비가 떨어지는 구간</strong>입니다.
                                15성에서 16성 성공 확률은 30%에 불과하며, 실패 시 10성까지 하락할 위험이 있습니다.
                                따라서 12성에서 멈추거나, "1+1 스타포스 이벤트" 또는 "17성 강화권"을 사용하여 한 번에 17성으로 넘어가는 것이 가장 효율적입니다.
                            </p>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">✅ 17성이 국민 세팅인 이유</h4>
                            <p className="text-slate-300 text-sm mb-3">
                                17성은 <strong className="text-green-400">가성비 최고</strong>의 구간입니다.
                            </p>
                            <ul className="text-slate-300 text-sm space-y-1">
                                <li>• 12→17성 비용이 17→22성 비용보다 훨씬 저렴합니다.</li>
                                <li>• 17성 장비로도 대부분의 하드 보스(루시드, 윌, 진 힐라, 듄켈)를 클리어할 수 있습니다.</li>
                                <li>• 파괴 확률이 낮아 장비를 터뜨릴 위험이 적습니다.</li>
                            </ul>
                        </div>

                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">🌟 22성 vs 17성 아케인?</h4>
                            <p className="text-slate-300 text-sm">
                                <strong className="text-yellow-400">22성 앱솔</strong>이 17성 아케인보다 스타포스 공격력이 <strong>+67</strong> 더 높습니다!
                                당장의 스펙에는 22성 앱솔이 훨씬 강하지만, 17성 아케인은 <strong className="text-blue-400">미래 투자</strong>입니다.
                                아케인셰이드는 추후 18성, 21성, 22성으로 성장할 잠재력이 있기 때문입니다.
                            </p>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">💎 슈페리얼은 10성이 목표!</h4>
                            <p className="text-slate-300 text-sm">
                                슈페리얼 장비 (타일런트 망토/벨트, 파프니르 장신구 등)는 <strong className="text-blue-400">10성 = 일반 22성급</strong> 성능을 냅니다!
                                최대 12성까지만 가능하므로 10성을 목표로 하세요. 10성 이후부터는 파괴 확률이 있어 매우 위험합니다.
                            </p>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <section className="mt-16 border-t border-slate-700 pt-12">
                        <h2 className="text-3xl font-bold text-white mb-8">자주 묻는 질문 (FAQ)</h2>

                        <div className="space-y-6">
                            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-orange-400 mb-2">Q. 스타포스 이벤트는 언제 하나요?</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    A. 보통 여름/겨울 방학 시즌의 대규모 업데이트 때 "샤이닝 스타포스 타임" (강화 비용 30% 할인 + 5/10/15성 성공 확률 100%) 이벤트를 진행합니다.
                                    그 외에도 매달 썬데이 메이플을 통해 "1+1 강화", "비용 30% 할인", "5/10/15성 100% 성공" 등의 혜택을 제공하니, 급하지 않다면 이벤트를 기다리는 것이 좋습니다.
                                </p>
                            </div>

                            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-orange-400 mb-2">Q. 파괴 방지는 언제 써야 하나요?</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    A. 12성에서 17성까지 갈 때, 장비의 물량이 적고 비싸다면 파괴 방지를 사용하는 것이 좋습니다. (예: 여명 장신구, 칠흑 장비 등)
                                    하지만 카루타, 앱솔랩스처럼 물량이 많고 저렴한 장비는 파괴 방지를 쓰지 않고 터지면 새로 사는 것이 더 저렴할 수 있습니다.
                                    17성 이상 구간에서는 파괴 방지를 사용할 수 없습니다.
                                </p>
                            </div>

                            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-orange-400 mb-2">Q. 스타캐치는 꼭 해야 하나요?</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    A. 네, 필수입니다! 스타캐치 성공 시 강화 성공 확률이 5% 곱연산으로 증가합니다.
                                    (예: 성공 확률 30% → 31.5%)
                                    미미해 보일 수 있지만, 수백 번 강화를 시도할 때 기댓값 차이는 엄청납니다.
                                    설정에서 "스타캐치 해제"를 하지 않도록 주의하세요.
                                </p>
                            </div>
                        </div>
                    </section>
                </section>

                <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">내 장비 스타포스 확인하기</h3>
                    <p className="text-slate-300 mb-6">
                        메이플 AI로 내 캐릭터를 진단하면 장비별 스타포스 현황과 추천 목표를 확인할 수 있습니다
                    </p>
                    <Link href="/" className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors shadow-lg">
                        지금 진단 받기 →
                    </Link>
                </div>
            </article>
        </div>
    );
}
