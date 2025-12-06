import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: '가이드 - 메이플 AI',
    description: '메이플스토리 스펙업, 보스 도전, 헥사 스탯 최적화 등 모든 가이드를 단풍이 AI가 알려드립니다.',
    keywords: '메이플스토리 가이드, 헥사 스탯, 보스 공략, 스타포스 효율, 유니온 배치',
};

const guides = [
    {
        id: 'hexa-stats-optimization',
        title: '헥사 스탯 최적화 가이드',
        description: '헥사 스탯을 효율적으로 분배하는 수학적 원리와 직업별 추천 분배 비율',
        category: '스펙업',
        readTime: '5분',
        difficulty: '중급',
        icon: '📊',
    },
    {
        id: 'hexa-skill-priority',
        title: '직업별 헥사 스킬 우선순위',
        description: '전투력 1억~4억 고스펙 유저 실제 데이터 기반. 직업별 6차 스킬 강화 우선순위',
        category: '스펙업',
        readTime: '8분',
        difficulty: '중급',
        icon: '⚡',
    },
    {
        id: 'starforce-efficiency-guide',
        title: '스타포스 강화 가성비 가이드',
        description: '구간별 스타포스 강화 효율 분석. 13~16성은 건너뛰고 17성 국민 세팅 목표!',
        category: '스펙업',
        readTime: '6분',
        difficulty: '초급',
        icon: '⭐',
    },
    {
        id: 'bonus-stat-guide',
        title: '추가옵션(추옵) 완벽 가이드',
        description: '무기 1추/2추 판단법, 방어구 급수 계산기, 데몬어벤져/제논 특수 계산식',
        category: '장비',
        readTime: '8분',
        difficulty: '중급',
        icon: '🔥',
    },
    {
        id: 'ability-guide',
        title: '직업별 어빌리티 추천 가이드',
        description: '전직업 보스용 최적 어빌리티 완벽 정리. 보스뎀 20%/상태이상 8% 조합',
        category: '스펙업',
        readTime: '7분',
        difficulty: '중급',
        icon: '✨',
    },
    {
        id: 'seed-ring-guide',
        title: '직업별 시드링 추천 가이드',
        description: '리레 vs 컨티 완벽 가이드. 레벨 280+, 전투력 4억 이상 초고스펙 유저 실제 데이터',
        category: '장비',
        readTime: '10분',
        difficulty: '중급',
        icon: '💍',
    },
    {
        id: 'cooltime-hat-guide',
        title: '쿨타임 감소 모자(쿨뚝) 추천 가이드',
        description: '직업별 쿨뚝 추천 여부. 레벨 280+, 전투력 4억 이상 초고스펙 유저 실제 데이터 기반',
        category: '장비',
        readTime: '7분',
        difficulty: '중급',
        icon: '⏰',
    },
    {
        id: 'combat-power-tier-system',
        title: '전투력 티어 시스템 완벽 가이드',
        description: '아이언부터 챌린저까지, 각 티어별 목표와 달성 방법',
        category: '스펙업',
        readTime: '7분',
        difficulty: '초급',
        icon: '⚔️',
    },
    {
        id: 'boss-equipment-progression',
        title: '보스 장비 성장 로드맵',
        description: '무자본 유저를 위한 보스 장비 세팅 10단계 가이드',
        category: '장비',
        readTime: '10분',
        difficulty: '초급',
        icon: '🛡️',
    },
    {
        id: 'boss-rewards',
        title: '보스별 주요 보상 가이드',
        description: '메이플스토리 모든 보스의 주요 보상과 드롭 아이템을 한눈에 확인하세요.',
        category: '보스',
        readTime: '5분',
        difficulty: '초급',
        icon: '🎁',
    },
    {
        id: 'boss-tier-guide',
        title: '보스 티어 (Boss Tier) 가이드',
        description: '금별부터 납별까지, 결정석 가격과 체감 난이도로 정리한 보스 몬스터 계급도',
        category: '보스',
        readTime: '5분',
        difficulty: '초급',
        icon: '🏆',
    },
    {
        id: 'about-danpung-i',
        title: '단풍이 소개 & 판단 기준',
        description: '메이플 AI 마스코트 단풍이 소개와 아이템 진단, 스펙 분석 기준 상세 안내',
        category: '소개',
        readTime: '3분',
        difficulty: '필독',
        icon: '🍁',
    },
    {
        id: '../tools/starforce',
        title: '스타포스 시뮬레이터',
        description: '2025년 최신 확률 적용! 파괴 방지, 스타캐치, 썬데이 메이플까지 완벽 구현된 강화 시뮬레이터',
        category: '도구',
        readTime: '무제한',
        difficulty: '누구나',
        icon: '🎰',
    },
];

export default function GuidePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">홈으로 돌아가기</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-500/20 rounded-xl border border-orange-500/30">
                            <BookOpen className="w-8 h-8 text-orange-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-black text-white">메이플 AI 가이드</h1>
                            <p className="text-slate-400 mt-1">단풍이가 알려주는 메이플스토리 완벽 공략</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Intro */}
                <div className="bg-slate-800/30 rounded-2xl p-6 sm:p-8 border border-slate-700 mb-12">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <img src="/images/maple-ai-logo.jpg" alt="단풍이" className="w-16 h-16 rounded-full object-cover border-2 border-orange-500/30" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-white mb-2">단풍이 AI의 가이드에 오신 걸 환영합니다!</h2>
                            <p className="text-slate-300 leading-relaxed">
                                메이플 AI는 단순히 캐릭터 정보를 보여주는 것을 넘어, 여러분의 성장을 돕는 가이드를 제공합니다.
                                각 가이드는 실제 데이터 분석을 기반으로 작성되었으며, 초보자부터 고인물까지 모두에게 도움이 될 것입니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Guide Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {guides.map((guide) => (
                        <Link
                            key={guide.id}
                            href={`/guide/${guide.id}`}
                            className="group bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700 hover:border-orange-500/50 rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-orange-500/10"
                        >
                            {/* Icon & Badge */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-4xl group-hover:scale-110 transition-transform">
                                    {guide.icon}
                                </div>
                                <span className="px-3 py-1 bg-slate-700 text-slate-300 text-xs font-bold rounded-full">
                                    {guide.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                {guide.title}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                {guide.description}
                            </p>

                            {/* Meta */}
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                    ⏱️ {guide.readTime}
                                </span>
                                <span className="flex items-center gap-1">
                                    📈 {guide.difficulty}
                                </span>
                            </div>

                            {/* Hover Arrow */}
                            <div className="mt-4 flex items-center gap-2 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-sm font-bold">가이드 보기</span>
                                <ArrowLeft className="w-4 h-4 rotate-180" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Coming Soon */}
                <div className="mt-12 bg-slate-800/20 border border-slate-700 rounded-2xl p-8 text-center">
                    <div className="text-5xl mb-4">🚧</div>
                    <h3 className="text-xl font-bold text-white mb-2">더 많은 가이드가 준비 중입니다!</h3>
                    <p className="text-slate-400">
                        스타포스 효율 계산, 유니온 배치, 링크스킬 우선순위 등<br />
                        다양한 가이드가 곧 공개됩니다. 기대해주세요!
                    </p>
                </div>
            </div>
        </div>
    );
}
