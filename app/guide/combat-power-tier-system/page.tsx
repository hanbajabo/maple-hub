import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Trophy, Target, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
    title: '전투력 티어 시스템 완벽 가이드 - 메이플 AI',
    description: '아이언부터 챌린저까지, 각 티어별 목표와 도전 가능한 보스 완벽 정리.',
};

const TIERS = [
    { name: 'LEGEND', min: 1500000000, percent: '0.01%', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30', desc: '신화 속의 존재' },
    { name: 'CHALLENGER', min: 1000000000, max: 1500000000, percent: '0.1%', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30', desc: '메이플월드의 정점' },
    { name: 'GRAND MASTER', min: 500000000, max: 1000000000, percent: '1%', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30', desc: '초월자급 스펙' },
    { name: 'MASTER', min: 250000000, max: 500000000, percent: '3%', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30', desc: '진정한 고인물' },
    { name: 'DIAMOND', min: 100000000, max: 250000000, percent: '10%', color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/30', desc: '카링 / 칼로스 / 익스우' },
    { name: 'PLATINUM', min: 50000000, max: 100000000, percent: '20%', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30', desc: '검은 마법사 / 세렌 파티' },
    { name: 'GOLD', min: 20000000, max: 50000000, percent: '40%', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', desc: '하드 보스 (루/윌/진) 파티' },
    { name: 'SILVER', min: 10000000, max: 20000000, percent: '60%', color: 'text-slate-300', bg: 'bg-slate-300/10', border: 'border-slate-500/30', desc: '노말 루시드/윌 파티' },
    { name: 'BRONZE', min: 5000000, max: 10000000, percent: '80%', color: 'text-amber-600', bg: 'bg-amber-600/10', border: 'border-amber-700/30', desc: '스우/데미안 솔플' },
    { name: 'IRON', min: 0, max: 5000000, percent: '99%', color: 'text-stone-500', bg: 'bg-stone-500/10', border: 'border-stone-600/30', desc: '카루타 / 하매 도전' },
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
                        <div className="text-sm text-slate-400">전투력 티어 완벽 분석</div>
                    </div>
                </div>

                <section className="prose prose-invert max-w-none mb-12">
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Target className="w-6 h-6 text-orange-400" />
                            전투력 티어란?
                        </h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            메이플 AI의 <strong className="text-white">전투력 티어 시스템</strong>은 여러분의 스펙을 10단계로 구분합니다.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            자신이 어느 위치에 있는지 확인하고, <strong className="text-yellow-400">다음 목표</strong>를 설정하세요!
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-400" />
                        전투력 티어 시스템
                    </h2>

                    <div className="space-y-4">
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
                                        <p className="text-slate-300 text-sm mb-2">{tier.desc}</p>
                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                            <span className="font-mono">{formatNum(tier.min)}</span>
                                            {tier.max && (
                                                <>
                                                    <span>~</span>
                                                    <span className="font-mono">{formatNum(tier.max)}</span>
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

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12">핵심 팁</h2>

                    <div className="space-y-4">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">✅ 서브 등급 (Division) 시스템</h4>
                            <p className="text-slate-300 text-sm">
                                IRON부터 DIAMOND까지는 <strong className="text-green-400">1~5 등급</strong>으로 세분화됩니다.
                                예: GOLD 5, GOLD 4, GOLD 3, GOLD 2, GOLD 1 순으로 상승!
                            </p>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">💡 전투력 올리는 핵심 요소</h4>
                            <ul className="text-slate-300 text-sm space-y-1">
                                <li>• <strong className="text-blue-400">스타포스</strong>: 17성 국민 세팅, 22성 종결</li>
                                <li>• <strong className="text-purple-400">잠재능력</strong>: 레전드리 3줄 목표</li>
                                <li>• <strong className="text-yellow-400">추가옵션</strong>: 무기 2추, 방어구 100급 이상</li>
                                <li>• <strong className="text-green-400">헥사 스탯</strong>: 주스탯/공마/크뎀 집중</li>
                                <li>• <strong className="text-red-400">심볼</strong>: 레벨 20 목표 (매일 일퀘!)</li>
                            </ul>
                        </div>

                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">🎯 단계별 목표 설정</h4>
                            <p className="text-slate-300 text-sm mb-3">
                                한 번에 여러 티어를 뛰어넘으려 하지 마세요!
                            </p>
                            <ul className="text-slate-300 text-sm space-y-1">
                                <li>• IRON → BRONZE: 스타포스 12성 달성</li>
                                <li>• BRONZE → SILVER: 스타포스 17성 달성</li>
                                <li>• SILVER → GOLD: 레전드리 잠재 확보</li>
                                <li>• GOLD → PLATINUM: 아케인 22성 도전</li>
                                <li>• PLATINUM+: 여명/칠흑/에테르넬 세팅</li>
                            </ul>
                        </div>

                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">📊 내 티어 확인 방법</h4>
                            <p className="text-slate-300 text-sm">
                                메이플 AI 메인 페이지에서 캐릭터를 검색하면 <strong className="text-yellow-400">현재 티어와 다음 목표</strong>를 자동으로 계산해드립니다!
                            </p>
                        </div>
                    </div>
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
