import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Trophy, Target, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
    title: '전투력 티어 시스템 완벽 가이드 - 메이플 AI',
    description: '아이언부터 챌린저까지, 각 티어별 목표와 도전 가능한 보스 완벽 정리.',
};

const TIERS = [
    {
        name: 'LEGEND',
        min: 1500000000,
        percent: '0.01%',
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        desc: '신화 속의 존재',
        longDescription: '전 서버를 통틀어 손에 꼽히는 최상위 랭커들의 영역입니다. 모든 장비가 23성 또는 놀라운 장비 강화 주문서(놀장) 12성으로 도배되어 있으며, 잠재능력 또한 올이탈/쌍이탈 등 극악의 확률을 뚫은 옵션들입니다. 이들은 메이플스토리의 모든 콘텐츠를 제약 없이 즐길 수 있으며, 새로운 보스가 출시되더라도 가장 먼저 클리어하는 선구자들입니다.'
    },
    {
        name: 'CHALLENGER',
        min: 1000000000,
        max: 1500000000,
        percent: '0.1%',
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        desc: '메이플월드의 정점',
        longDescription: '일반적인 유저가 도달할 수 있는 한계점을 넘어선 단계입니다. 에테르넬 세트 22성, 칠흑의 보스 세트 풀세트 등 구하기 힘든 아이템들을 모두 갖추고 있습니다. 익스트림 난이도의 최상위 보스 파티에서 메인 딜러로 활약하며, 서버 내에서도 유명 인사인 경우가 많습니다.'
    },
    {
        name: 'GRAND MASTER',
        min: 500000000,
        max: 1000000000,
        percent: '1%',
        color: 'text-red-400',
        bg: 'bg-red-400/10',
        border: 'border-red-400/30',
        desc: '초월자급 스펙',
        longDescription: '서버 내 상위 1%에 해당하는 초고스펙 유저들입니다. 해방 퀘스트를 완료하여 제네시스 무기를 소유하고 있으며, 대부분의 장비가 22성 레전드리 등급입니다. 익스트림 세렌, 익스트림 칼로스 등 최상위 보스 파티에 참여할 수 있는 자격이 주어집니다.'
    },
    {
        name: 'MASTER',
        min: 250000000,
        max: 500000000,
        percent: '3%',
        color: 'text-purple-400',
        bg: 'bg-purple-400/10',
        border: 'border-purple-400/30',
        desc: '진정한 고인물',
        longDescription: '메이플스토리를 깊이 있게 즐기는 "고인물" 단계입니다. 하드 카링, 노말 림보 등 최신 보스 콘텐츠를 즐길 수 있으며, 무릉 도장 층수도 상당히 높습니다. 이 단계부터는 스펙업 비용이 기하급수적으로 증가하기 때문에 효율적인 투자가 매우 중요합니다.'
    },
    {
        name: 'DIAMOND',
        min: 100000000,
        max: 250000000,
        percent: '10%',
        color: 'text-cyan-400',
        bg: 'bg-cyan-400/10',
        border: 'border-cyan-400/30',
        desc: '카링 / 칼로스 / 익스우',
        longDescription: '상위 콘텐츠에 진입하는 관문입니다. 하드 세렌, 노말 칼로스, 이지 카링 등 그란디스 지역의 보스들을 파티 격파할 수 있습니다. 해방 퀘스트를 진행 중이거나 막 완료한 유저들이 많이 분포해 있으며, 22성 장비를 하나둘씩 맞추기 시작하는 단계입니다.'
    },
    {
        name: 'PLATINUM',
        min: 50000000,
        max: 100000000,
        percent: '20%',
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/10',
        border: 'border-emerald-400/30',
        desc: '검은 마법사 / 세렌 파티',
        longDescription: '메이플스토리의 최종 보스였던 "검은 마법사"에 도전할 수 있는 스펙입니다. 17~18성 아케인셰이드 장비와 레전드리 잠재능력을 갖추고 있으며, 유니온 레벨도 8000 이상인 경우가 많습니다. 메이플스토리의 허리 라인을 담당하는 핵심 유저층입니다.'
    },
    {
        name: 'GOLD',
        min: 20000000,
        max: 50000000,
        percent: '40%',
        color: 'text-yellow-400',
        bg: 'bg-yellow-400/10',
        border: 'border-yellow-400/30',
        desc: '하드 보스 (루/윌/진) 파티',
        longDescription: '본격적으로 하드 보스 파티에 참여할 수 있는 단계입니다. 하드 루시드, 하드 윌, 하드 진 힐라 등을 파티원들과 협력하여 공략합니다. 17성 유니크/레전드리 장비를 갖추기 시작하며, 헥사 스탯과 6차 스킬 강화에도 신경을 써야 합니다.'
    },
    {
        name: 'SILVER',
        min: 10000000,
        max: 20000000,
        percent: '60%',
        color: 'text-slate-300',
        bg: 'bg-slate-300/10',
        border: 'border-slate-500/30',
        desc: '노말 루시드/윌 파티',
        longDescription: '아케인 리버의 중반부 보스인 노말 루시드와 노말 윌을 파티로 격파할 수 있습니다. 이 단계에서는 코어 강화(코강)를 완벽하게 마치는 것이 중요하며, 아케인 심볼 성장도 꾸준히 이루어져야 합니다. 이벤트 링과 보스 장신구 세트를 잘 활용하면 효율적으로 스펙을 올릴 수 있습니다.'
    },
    {
        name: 'BRONZE',
        min: 5000000,
        max: 10000000,
        percent: '80%',
        color: 'text-amber-600',
        bg: 'bg-amber-600/10',
        border: 'border-amber-700/30',
        desc: '스우/데미안 솔플',
        longDescription: '메이플스토리의 국민 보스인 스우와 데미안을 혼자서 격파할 수 있는 단계입니다. 주간 보스 결정석 수입이 쏠쏠해지기 시작하며, 이를 바탕으로 장비를 하나씩 업그레이드하는 재미를 느낄 수 있습니다. 3카 5앱 또는 4카 5앱 세팅이 일반적입니다.'
    },
    {
        name: 'IRON',
        min: 0,
        max: 5000000,
        percent: '99%',
        color: 'text-stone-500',
        bg: 'bg-stone-500/10',
        border: 'border-stone-600/30',
        desc: '카루타 / 하매 도전',
        longDescription: '메이플스토리를 막 시작한 "메린이" 단계입니다. 아직 보스 레이드보다는 레벨업과 아케인 심볼 성장에 집중해야 하는 시기입니다. 카오스 루타비스 4형제(반반, 피에르, 블러디퀸, 벨룸)를 파티로 격파하거나, 솔로 격파를 목표로 스펙업을 진행하세요. 하이퍼 버닝으로 지급받은 장비를 잘 활용하는 것이 좋습니다.'
    },
];

const BOSS_MILESTONES = [
    { tier: 'IRON', bosses: ['자쿰 (NORMAL)', '카오스 혼테일', '카오스 루타비스 4형제'] },
    { tier: 'BRONZE', bosses: ['노말 매그너스', '노말 스우', '노말 데미안'] },
    { tier: 'SILVER', bosses: ['노말 루시드', '노말 윌', '노말 진 힐라'] },
    { tier: 'GOLD', bosses: ['하드 루시드', '하드 윌', '하드 진 힐라'] },
    { tier: 'PLATINUM', bosses: ['노말 세렌', '하드 검은 마법사'] },
    { tier: 'DIAMOND', bosses: ['하드 세렌', '노말 칼로스', '이지 카링'] },
    { tier: 'MASTER', bosses: ['카오스 칼로스', '노말 림보', '하드 카링'] },
    { tier: 'GRAND MASTER', bosses: ['익스 세렌', '하드 림보', '익스 칼로스'] },
    { tier: 'CHALLENGER', bosses: ['익스 카링', '익스 대적자'] },
    { tier: 'LEGEND', bosses: ['모든 익스트림 보스 완전 정복'] },
];

const formatNum = (n: number) => {
    if (n >= 100000000) return `${(n / 100000000).toFixed(1)}억`;
    if (n >= 10000000) return `${Math.round(n / 10000000) * 1000}만`;
    if (n >= 10000) return `${Math.round(n / 10000)}만`;
    return n.toString();
};

export default function CombatPowerTierGuidePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link href="/guide" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">가이드 목록으로</span>
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">전투력 티어 시스템 완벽 가이드</h1>
                    <p className="text-slate-400 mt-2">아이언부터 챌린저까지, 각 티어별 목표와 도전 보스</p>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-4 mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                    <img src="/images/maple-ai-logo.jpg" alt="단풍이" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <div className="font-bold text-white">메이플 AI 단풍이</div>
                        <div className="text-sm text-slate-400">전투력 티어 완벽 분석 · 2025년 업데이트</div>
                    </div>
                </div>

                <section className="prose prose-invert max-w-none mb-12">
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Target className="w-6 h-6 text-orange-400" />
                            전투력 티어란?
                        </h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            메이플 AI의 <strong className="text-white">전투력 티어 시스템</strong>은 넥슨 오픈 API 데이터를 기반으로 여러분의 스펙을 10단계로 정밀하게 구분합니다.
                            단순히 전투력 수치만 보여주는 것이 아니라, 해당 스펙으로 도전할 수 있는 <strong className="text-yellow-400">적정 보스</strong>와 <strong className="text-green-400">다음 성장 목표</strong>를 명확하게 제시해 드립니다.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            자신이 현재 메이플 월드에서 어느 정도 위치에 있는지 확인하고, 상위 티어로 가기 위한 구체적인 로드맵을 그려보세요!
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-400" />
                        전투력 티어 상세 분석
                    </h2>

                    <div className="space-y-6">
                        {TIERS.map((tier, idx) => (
                            <div key={idx} className={`${tier.bg} border ${tier.border} rounded-xl p-6`}>
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className={`text-2xl font-black ${tier.color}`}>{tier.name}</h3>
                                            <span className="px-3 py-1 bg-slate-900/50 rounded-full text-xs font-bold text-slate-300">
                                                상위 {tier.percent}
                                            </span>
                                        </div>
                                        <p className="text-white font-bold text-lg mb-2">{tier.desc}</p>

                                        {/* 상세 설명 추가 */}
                                        <div className="mb-4 p-3 bg-slate-900/30 rounded-lg">
                                            <p className="text-slate-300 text-sm leading-relaxed">
                                                {tier.longDescription}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/50 w-fit px-3 py-1.5 rounded-lg">
                                            <span className="text-slate-500">전투력 구간:</span>
                                            <span className="font-mono font-bold text-slate-200">{formatNum(tier.min)}</span>
                                            {tier.max && (
                                                <>
                                                    <span>~</span>
                                                    <span className="font-mono font-bold text-slate-200">{formatNum(tier.max)}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-blue-400" />
                        티어별 도전 가능 보스
                    </h2>

                    <div className="space-y-4">
                        {BOSS_MILESTONES.map((milestone, idx) => {
                            const tierInfo = TIERS.find(t => t.name === milestone.tier);
                            return (
                                <div key={idx} className={`${tierInfo?.bg} border ${tierInfo?.border} rounded-xl p-6`}>
                                    <h3 className={`text-xl font-bold ${tierInfo?.color} mb-3`}>{milestone.tier}</h3>
                                    <ul className="space-y-2">
                                        {milestone.bosses.map((boss, bIdx) => (
                                            <li key={bIdx} className="flex items-center gap-2 text-slate-300 text-sm">
                                                <Trophy className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                                                <span>{boss}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12">핵심 팁 & 전략</h2>

                    <div className="space-y-4">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2 text-lg">✅ 서브 등급 (Division) 시스템</h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                IRON부터 DIAMOND까지는 <strong className="text-green-400">1~5 등급</strong>으로 세분화됩니다.
                                예를 들어 GOLD 티어 내에서도 GOLD 5, GOLD 4, GOLD 3, GOLD 2, GOLD 1 순으로 상승합니다.
                                각 서브 등급을 하나씩 올리는 것을 단기 목표로 삼으면 성취감을 느끼며 꾸준히 성장할 수 있습니다.
                            </p>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2 text-lg">💡 전투력 올리는 핵심 요소</h4>
                            <ul className="text-slate-300 text-sm space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400">•</span>
                                    <span><strong className="text-white">스타포스:</strong> 전투력 상승폭이 가장 큽니다. 17성 국민 세팅을 먼저 맞추고, 이후 22성 종결 세팅으로 넘어가는 것이 정석입니다.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400">•</span>
                                    <span><strong className="text-white">잠재능력:</strong> 주스탯 %와 공격력/마력 %를 챙기세요. 레전드리 3줄 유효 옵션이 최종 목표입니다.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-400">•</span>
                                    <span><strong className="text-white">추가옵션:</strong> 무기는 2추옵 이상, 방어구는 100급 이상을 목표로 하세요. 검은 환생의 불꽃을 꾸준히 활용해야 합니다.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">•</span>
                                    <span><strong className="text-white">헥사 스탯:</strong> 6차 전직 이후 스펙업의 핵심입니다. 주스탯/공마/크뎀 위주로 강화하세요.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2 text-lg">🎯 단계별 목표 설정</h4>
                            <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                                한 번에 여러 티어를 뛰어넘으려 하지 마세요! 메이플스토리는 꾸준함이 생명인 게임입니다.
                            </p>
                            <ul className="text-slate-300 text-sm space-y-1">
                                <li>• IRON → BRONZE: 스타포스 10~12성 달성 및 아케인 심볼 획득</li>
                                <li>• BRONZE → SILVER: 스타포스 17성 달성 및 코어 강화 완료</li>
                                <li>• SILVER → GOLD: 레전드리 잠재능력 확보 및 유니온 6000 달성</li>
                                <li>• GOLD → PLATINUM: 아케인셰이드 17~18성 및 유니온 8000 달성</li>
                                <li>• PLATINUM+: 22성 장비 도전 및 칠흑/여명 세트 파밍</li>
                            </ul>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <section className="mt-16 border-t border-slate-700 pt-12">
                        <h2 className="text-3xl font-bold text-white mb-8">자주 묻는 질문 (FAQ)</h2>

                        <div className="space-y-6">
                            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-orange-400 mb-2">Q. 전투력은 높은데 보스를 못 잡겠어요.</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    A. 전투력은 '스펙'을 나타내는 지표일 뿐, '컨트롤'까지 반영하지는 않습니다. 보스 패턴 숙련도, 시드링 활용 능력, 딜 사이클 최적화 등에 따라 실제 클리어 가능 여부는 달라질 수 있습니다. 전투력이 충분하다면 연습 모드를 통해 패턴을 익히는 것을 추천합니다.
                                </p>
                            </div>

                            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-orange-400 mb-2">Q. 무릉 도장 층수와 전투력의 관계는?</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    A. 일반적으로 전투력이 높을수록 무릉 층수도 높게 나옵니다. 하지만 직업별 유불리, 빌드 최적화 여부 등에 따라 차이가 있을 수 있습니다. 대략적으로 GOLD 티어는 50층대, PLATINUM 티어는 60층대, DIAMOND 티어는 70층대 이상을 기록하는 경우가 많습니다.
                                </p>
                            </div>

                            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-orange-400 mb-2">Q. 랭킹은 실시간으로 반영되나요?</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    A. 네, 메이플 AI는 넥슨 오픈 API를 통해 실시간 데이터를 가져옵니다. 게임 내에서 장비를 교체하거나 스펙업을 한 뒤, 잠시 후 사이트에서 다시 검색하면 변경된 전투력과 티어가 즉시 반영됩니다. (단, 넥슨 API 갱신 주기에 따라 약간의 지연이 있을 수 있습니다.)
                                </p>
                            </div>
                        </div>
                    </section>
                </section>

                <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">내 전투력 티어 확인하기</h3>
                    <p className="text-slate-300 mb-6">
                        메이플 AI로 내 캐릭터를 진단하면 현재 티어와 다음 목표 보스를 확인할 수 있습니다
                    </p>
                    <Link href="/" className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors shadow-lg">
                        지금 진단 받기 →
                    </Link>
                </div>
            </article>
        </div>
    );
}
