import React from 'react';
import Link from 'next/link';

interface GuideItem {
    icon: string;
    category: string;
    title: string;
    description: string;
    time: string;
    difficulty: string;
    link: string;
    highlight?: boolean;
}

const guides: GuideItem[] = [
    {
        icon: "📊",
        category: "스펙업",
        title: "헥사 스탯 최적화 가이드",
        description: "헥사 스탯을 효율적으로 분배하는 수학적 원리와 직업별 추천 분배 비율",
        time: "5분",
        difficulty: "중급",
        link: "/guide/hexa-stats-optimization"
    },
    {
        icon: "⚡",
        category: "스펙업",
        title: "직업별 헥사 스킬 우선순위",
        description: "전투력 1억~4억 고스펙 유저 실제 데이터 기반. 직업별 6차 스킬 강화 우선순위",
        time: "8분",
        difficulty: "중급",
        link: "/guide/hexa-skill-priority"
    },
    {
        icon: "⭐",
        category: "스펙업",
        title: "스타포스 강화 가성비 가이드",
        description: "구간별 스타포스 강화 효율 분석. 13~16성은 건너뛰고 17성 국민 세팅 목표!",
        time: "6분",
        difficulty: "초급",
        link: "/guide/starforce-efficiency-guide"
    },
    {
        icon: "🔥",
        category: "장비",
        title: "추가옵션(추옵) 완벽 가이드",
        description: "무기 1추/2추 판단법, 방어구 급수 계산기, 데몬어벤져/제논 특수 계산식",
        time: "8분",
        difficulty: "중급",
        link: "/guide/bonus-stat-guide"
    },
    {
        icon: "✨",
        category: "스펙업",
        title: "직업별 어빌리티 추천 가이드",
        description: "전직업 보스용 최적 어빌리티 완벽 정리. 보스뎀 20%/상태이상 8% 조합",
        time: "7분",
        difficulty: "중급",
        link: "/guide/ability-guide"
    },
    {
        icon: "💍",
        category: "장비",
        title: "직업별 시드링 추천 가이드",
        description: "리레 vs 컨티 완벽 가이드. 레벨 280+, 전투력 4억 이상 초고스펙 유저 실제 데이터",
        time: "10분",
        difficulty: "중급",
        link: "/guide/seed-ring-guide"
    },
    {
        icon: "⏰",
        category: "장비",
        title: "쿨타임 감소 모자(쿨뚝) 추천 가이드",
        description: "직업별 쿨뚝 추천 여부. 레벨 280+, 전투력 4억 이상 초고스펙 유저 실제 데이터 기반",
        time: "7분",
        difficulty: "중급",
        link: "/guide/cooltime-hat-guide"
    },
    {
        icon: "⚔️",
        category: "스펙업",
        title: "전투력 티어 시스템 완벽 가이드",
        description: "아이언부터 챌린저까지, 각 티어별 목표와 달성 방법",
        time: "7분",
        difficulty: "초급",
        link: "/guide/combat-power-tier-system"
    },
    {
        icon: "🛡️",
        category: "장비",
        title: "보스 장비 성장 로드맵",
        description: "무자본 유저를 위한 보스 장비 세팅 10단계 가이드",
        time: "10분",
        difficulty: "초급",
        link: "/guide/boss-equipment-progression"
    },
    {
        icon: "🎁",
        category: "보스",
        title: "보스별 주요 보상 가이드",
        description: "메이플스토리 모든 보스의 주요 보상과 드롭 아이템을 한눈에 확인하세요.",
        time: "5분",
        difficulty: "초급",
        link: "/guide/boss-rewards"
    },
    {
        icon: "🏆",
        category: "보스",
        title: "보스 티어 (Boss Tier) 가이드",
        description: "금별부터 납별까지, 결정석 가격과 체감 난이도로 정리한 보스 몬스터 계급도",
        time: "5분",
        difficulty: "초급",
        link: "/guide/boss-tier-guide"
    },
    {
        icon: "🍁",
        category: "소개",
        title: "단풍이 소개 & 판단 기준",
        description: "메이플 AI 마스코트 단풍이 소개와 아이템 진단, 스펙 분석 기준 상세 안내",
        time: "3분",
        difficulty: "필독",
        link: "/guide/about-danpung-i",
        highlight: true
    },
    {
        icon: "🎰",
        category: "도구",
        title: "스타포스 시뮬레이터",
        description: "2025년 최신 확률 적용! 파괴 방지, 스타캐치, 썬데이 메이플까지 완벽 구현된 강화 시뮬레이터",
        time: "무제한",
        difficulty: "누구나",
        link: "/tools/starforce",
        highlight: true
    }
];

export default function RecommendedGuides() {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                    <span className="text-3xl">📚</span>
                    단풍이 추천 가이드
                </h2>
                <Link href="/guide" className="text-slate-400 hover:text-maple-orange text-sm sm:text-base font-bold flex items-center gap-1 transition-colors">
                    전체보기
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {guides.map((guide, idx) => (
                    <Link
                        key={idx}
                        href={guide.link}
                        className={`group relative bg-slate-900/50 border ${guide.highlight ? 'border-maple-orange/50 bg-maple-orange/5' : 'border-slate-700/50'} rounded-2xl p-5 hover:border-maple-orange hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden flex flex-col h-full`}
                    >
                        {/* Hover Gradient Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-maple-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-xl flex items-center justify-center text-2xl sm:text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                                    {guide.icon}
                                </div>
                                <span className={`text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full border ${guide.highlight
                                    ? 'bg-maple-orange/20 text-maple-orange border-maple-orange/30'
                                    : 'bg-slate-800 text-slate-400 border-slate-700'
                                    }`}>
                                    {guide.category}
                                </span>
                            </div>

                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-maple-orange transition-colors line-clamp-2">
                                {guide.title}
                            </h3>

                            <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-grow">
                                {guide.description}
                            </p>

                            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-500 border-t border-slate-800/50 pt-3 mt-auto">
                                <div className="flex items-center gap-1">
                                    <span>⏱️</span>
                                    <span>{guide.time}</span>
                                </div>
                                <div className="w-px h-3 bg-slate-700"></div>
                                <div className="flex items-center gap-1">
                                    <span>📈</span>
                                    <span className={`${guide.difficulty === '초급' ? 'text-green-400' :
                                        guide.difficulty === '중급' ? 'text-yellow-400' :
                                            guide.difficulty === '필독' ? 'text-red-400 font-bold' :
                                                'text-blue-400'
                                        }`}>
                                        {guide.difficulty}
                                    </span>
                                </div>
                                <div className="ml-auto text-maple-orange font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                    가이드 보기 →
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                {/* Coming Soon Card */}
                <div className="bg-slate-950/30 border border-slate-800/50 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center h-full min-h-[200px] group hover:bg-slate-900/50 transition-colors">
                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-2xl mb-3 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                        🚧
                    </div>
                    <h3 className="text-lg font-bold text-slate-500 mb-1 group-hover:text-slate-400 transition-colors">
                        더 많은 가이드가
                    </h3>
                    <p className="text-sm text-slate-600 group-hover:text-slate-500 transition-colors">
                        준비 중입니다!
                    </p>
                </div>
            </div>
        </div>
    );
}
