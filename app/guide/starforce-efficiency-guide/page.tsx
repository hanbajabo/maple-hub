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
        advice: '최소 10성은 필수입니다.'
    },
    {
        range: '10 ~ 12성',
        grade: '입문',
        color: 'orange',
        description: '유니온/링크 육성용 혹은 임시 거쳐가는 단계입니다.',
        advice: '본캐 장비라면 최소 17성을 목표로!'
    },
    {
        range: '13 ~ 16성',
        grade: '애매함',
        color: 'yellow',
        description: '가장 가성비가 떨어지는 구간입니다.',
        advice: '17성을 목표로 달리세요. 여기서 멈추지 마세요!'
    },
    {
        range: '17 ~ 18성',
        grade: '국민 세팅',
        color: 'green',
        description: '가장 효율적인 가성비 구간입니다.',
        advice: '현역으로 충분합니다. 대부분의 유저가 여기서 멈춥니다.'
    },
    {
        range: '19 ~ 21성',
        grade: '고스펙',
        color: 'blue',
        description: '22성을 가기 위한 발판 혹은 가성비 종결 세팅입니다.',
        advice: '22성 도전 전 중간 단계'
    },
    {
        range: '22성',
        grade: '졸업',
        color: 'purple',
        description: '스타포스 졸업입니다. 완벽합니다.',
        advice: '이제 잠재능력과 추가옵션에 집중하세요!'
    },
    {
        range: '23성 이상',
        grade: '신화',
        color: 'gold',
        description: '기적의 아이템입니다.',
        advice: '서버 최상위 랭커의 영역입니다.'
    }
];

const SUPERIOR_STAGES = [
    {
        range: '5성 미만',
        grade: '입문',
        description: '슈페리얼 장비 강화 시작 단계'
    },
    {
        range: '5 ~ 9성',
        grade: '고효율',
        description: '슈페리얼의 가성비 최고 구간'
    },
    {
        range: '10 ~ 12성',
        grade: '졸업급',
        description: '22성급 성능! 슈페리얼의 종결'
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
                        <div className="text-sm text-slate-400">실전 검증된 스타포스 가성비 분석</div>
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
                                </p>
                                <p className="text-slate-300 leading-relaxed">
                                    하지만 모든 구간의 <strong className="text-yellow-400">가성비가 같지 않습니다</strong>!
                                    이 가이드로 효율적인 투자 구간을 찾으세요.
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
                                            <p className="text-slate-300 text-sm">{stage.description}</p>
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
                                <p className="text-slate-300 text-sm">{stage.description}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12">핵심 팁</h2>

                    <div className="space-y-4">
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                13~16성 구간은 건너뛰세요!
                            </h4>
                            <p className="text-slate-300 text-sm">
                                가장 <strong className="text-yellow-400">가성비가 떨어지는 구간</strong>입니다.
                                12성에서 바로 17성을 노리는 것이 효율적!
                            </p>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">✅ 17성이 국민 세팅인 이유</h4>
                            <p className="text-slate-300 text-sm mb-3">
                                17성은 <strong className="text-green-400">가성비 최고</strong>의 구간입니다.
                            </p>
                            <ul className="text-slate-300 text-sm space-y-1">
                                <li>• 12→17성 비용이 17→22성 비용보다 훨씬 저렴</li>
                                <li>• 대부분의 하드 보스를 클리어할 수 있는 스펙</li>
                                <li>• 파괴 확률이 낮아 안전함</li>
                            </ul>
                        </div>

                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">🌟 22성 vs 17성 아케인?</h4>
                            <p className="text-slate-300 text-sm">
                                <strong className="text-yellow-400">22성 앱솔</strong>이 17성 아케인보다 스타포스 공격력이 <strong>+67</strong> 더 높습니다!
                                당장의 스펙에는 22성 앱솔이 훨씬 강하지만, 17성 아케인은 <strong className="text-blue-400">미래 투자</strong>입니다.
                            </p>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">💎 슈페리얼은 10성이 목표!</h4>
                            <p className="text-slate-300 text-sm">
                                슈페리얼 장비 (타일런트 망토/벨트, 파프니르 장신구 등)는 <strong className="text-blue-400">10성 = 일반 22성급</strong> 성능!
                                최대 12성까지만 가능하므로 10성을 목표로 하세요.
                            </p>
                        </div>
                    </div>
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
