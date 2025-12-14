'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, BookOpen } from 'lucide-react';

interface BlogPost {
    slug: string;
    title: string;
    description: string;
    category: string;
    date: string;
    readTime: string;
    thumbnail: string;
    featured?: boolean;
}

const blogPosts: BlogPost[] = [
    // 육성 가이드
    {
        slug: 'crown-winter-showcase-2025',
        title: '👑 메이플스토리 겨울 쇼케이스 "크라운" 완벽 예측: 어셈블을 넘어 정점으로',
        description: '12월 13일 공개되는 겨울 쇼케이스 "크라운"을 심층 분석! Lv.290 시대, 신규 지역, 6차 전직 완성까지 모든 것을 예측합니다.',
        category: '업데이트 소식',
        date: '2025년 12월 13일',
        readTime: '15분',
        thumbnail: '👑',
        featured: true,
    },
    {
        slug: 'monsterpark-2025',
        title: '🎮 몬스터파크 극한 효율 가이드 - 레벨별 최적 사냥터 완벽 분석',
        description: '260~299 레벨 구간별로 몬스터파크에서 얻을 수 있는 경험치 효율을 완벽하게 정리! 당신의 레벨에 맞는 최적의 사냥터를 찾아보세요.',
        category: '경험치 가이드',
        date: '2025년 12월 13일',
        readTime: '12분',
        thumbnail: '🎯',
        featured: true,
    },
    {
        slug: 'hyperburning-jobs-2025-v2',
        title: '🎮 데이터로 증명된 2025 하이퍼버닝 직업 추천 v2.0 (하이브리드 랭킹)',
        description: 'AI, 유튜버, 일반인 인식, 고점 데이터를 모두 섞었다! 4가지 모드로 분석한 가장 완벽한 직업 추천 가이드.',
        category: '육성 가이드',
        date: '2025년 12월 12일',
        readTime: '10분',
        thumbnail: '🚀',
        featured: true,
    },
    {
        slug: 'hyperburning-jobs-2025',
        title: '🎬 유튜버 6명이 입 모아 외친 "그 직업". 2025 겨울 하이퍼버닝 추천 직업 통합 분석 (종결판)',
        description: '메친놈, 슈크림메이플, 물다이아, 페이지, 글자네 등 유튜버 6명의 분석 종합! 12월 18일 챌린저스 월드 시즌 3, 어떤 직업을 키워야 할까?',
        category: '육성 가이드',
        date: '2025년 12월 11일',
        readTime: '15분',
        thumbnail: '🔥',
        featured: true,
    },
    {
        slug: 'beginner-guide-2025',
        title: '유니온 + 링크부터 200레벨 초고속 육성까지! 완벽 내실 가이드',
        description: '유니온 6000, 링크스킬, 아티팩트까지! 200레벨 4-6시간 달성하는 초고속 육성법과 내실 완벽 가이드.',
        category: '육성 가이드',
        date: '2025년 12월 11일',
        readTime: '20분',
        thumbnail: '⚔️',
        featured: true,
    },
    {
        slug: 'free-to-play-guide',
        title: '완전 무자본 200레벨 육성 가이드 - 0메소, 이벤트 없이도 가능!',
        description: '본캐 지원 없이, 이벤트 없이, 0메소로 시작해서 200레벨 달성하는 완벽 퀘스트 육성 가이드. 3시간 30분이면 충분!',
        category: '육성 가이드',
        date: '2025년 12월 11일',
        readTime: '15분',
        thumbnail: '💚',
        featured: false,
    },
    // 초보자 가이드
    {
        slug: '/guide/about-danpung-i',
        title: '단풍이 캐릭터 진단 기준 소개',
        description: '메이플 AI의 단풍이가 어떤 기준으로 캐릭터를 진단하는지, 스펙업 우선순위는 어떻게 정해지는지 완벽 해설!',
        category: '초보자 가이드',
        date: '2025년 11월 28일',
        readTime: '8분',
        thumbnail: '🍁',
    },
    {
        slug: '/guide/combat-power-tier-system',
        title: '전투력 티어 시스템 완벽 가이드',
        description: '메이플스토리 전투력 구간별 보스 추천과 스펙업 로드맵. 내 전투력에 맞는 다음 목표를 찾아보세요!',
        category: '초보자 가이드',
        date: '2025년 11월 15일',
        readTime: '10분',
        thumbnail: '📊',
    },
    // 장비 & 스펙업 가이드
    {
        slug: '/guide/starforce-efficiency-guide',
        title: '스타포스 효율 가이드 - 언제 강화해야 할까?',
        description: '5/10/15 이벤트, 30% 할인, 스타캐치까지! 스타포스 강화 타이밍과 기댓값을 완벽 분석.',
        category: '장비 가이드',
        date: '2025년 11월 20일',
        readTime: '12분',
        thumbnail: '⭐',
    },
    {
        slug: '/guide/bonus-stat-guide',
        title: '추가옵션 완벽 가이드 - 환생의 불꽃부터 큐브까지',
        description: '장비별 추가옵션 티어와 목표 스탯. 어떤 옵션이 좋은지, 언제 재작해야 하는지 알려드립니다!',
        category: '장비 가이드',
        date: '2025년 11월 28일',
        readTime: '15분',
        thumbnail: '🔥',
    },
    {
        slug: '/guide/boss-equipment-progression',
        title: '보스 장비 진행도 - 펜살리르부터 22성까지',
        description: '초보자부터 고수까지, 단계별 보스 장비 세팅 가이드. 다음에 뭘 맞춰야 할지 한눈에!',
        category: '장비 가이드',
        date: '2025년 11월 15일',
        readTime: '10분',
        thumbnail: '🛡️',
    },
    {
        slug: '/guide/cooltime-hat-guide',
        title: '쿨타임 모자 완벽 가이드 - 쿨감의 모든 것',
        description: '쿨타임 감소 모자 획득법과 효율 분석. 내 직업에 쿨감모가 필요한지 알아보세요!',
        category: '장비 가이드',
        date: '2025년 11월 28일',
        readTime: '8분',
        thumbnail: '🎩',
    },
    {
        slug: '/guide/seed-ring-guide',
        title: '시드링 완벽 가이드 - 마스터/크래프터링까지',
        description: '시드링 획득 방법과 강화 가이드. 무자본 최강 반지를 만들어보세요!',
        category: '장비 가이드',
        date: '2025년 11월 20일',
        readTime: '10분',
        thumbnail: '💍',
    },
    // 보스 공략
    {
        slug: '/guide/boss-tier-guide',
        title: '보스 난이도 티어 가이드 - 입문부터 익스트림까지',
        description: '노말 자쿰부터 익스트림 카로스까지, 보스 난이도와 필요 스펙을 완벽 정리!',
        category: '보스 공략',
        date: '2025년 11월 18일',
        readTime: '12분',
        thumbnail: '👹',
    },
    {
        slug: '/guide/boss-rewards',
        title: '보스 보상 정리 - 주간/일간 보스 수익 계산',
        description: '각 보스별 보상과 예상 수익. 어떤 보스를 돌아야 효율적인지 알려드립니다!',
        category: '보스 공략',
        date: '2025년 11월 18일',
        readTime: '10분',
        thumbnail: '💰',
    },
    // 헥사 가이드
    {
        slug: '/guide/hexa-stats-optimization',
        title: '헥사 스탯 최적화 완벽 가이드',
        description: '직업별 헥사 스탯 분배와 효율 계산. 주스탯, 크뎀, 방무 어디에 투자해야 할까?',
        category: '헥사 가이드',
        date: '2025년 11월 25일',
        readTime: '18분',
        thumbnail: '📐',
    },
    {
        slug: '/guide/hexa-skills',
        title: '헥사 스킬 완벽 가이드',
        description: '6차 헥사 스킬 시스템 이해와 활용법. 오리진, 마스터리, 강화코어까지!',
        category: '헥사 가이드',
        date: '2025년 11월 22일',
        readTime: '15분',
        thumbnail: '🔷',
    },
    {
        slug: '/guide/hexa-skill-priority',
        title: '직업별 헥사 스킬 우선순위',
        description: '내 직업은 어떤 헥사 스킬부터 올려야 할까? 직업별 추천 우선순위 완벽 정리!',
        category: '헥사 가이드',
        date: '2025년 11월 22일',
        readTime: '12분',
        thumbnail: '🎯',
    },
    // 스탯 & 시스템
    {
        slug: '/guide/ability-guide',
        title: '어빌리티 가이드 - 직업별 추천 옵션',
        description: '보공/크확/쿨감? 내 직업에 맞는 어빌리티 세팅과 명성치 효율 가이드!',
        category: '스탯 가이드',
        date: '2025년 12월 5일',
        readTime: '10분',
        thumbnail: '✨',
    },
];

const categories = ['전체', '업데이트 소식', '육성 가이드', '경험치 가이드', '초보자 가이드', '장비 가이드', '보스 공략', '헥사 가이드', '스탯 가이드'];

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState('전체');

    // Filter posts based on selected category
    const filteredPosts = selectedCategory === '전체'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    const featuredPosts = filteredPosts.filter(post => post.featured);
    const regularPosts = filteredPosts.filter(post => !post.featured);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 sm:mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">홈으로</span>
                    </Link>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-2">메이플 AI 블로그</h1>
                    <p className="text-slate-400 text-sm sm:text-lg">메이플스토리를 더 깊이 이해하고, 더 효율적으로 즐기는 방법</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Category Filter */}
                <div className="mb-8 sm:mb-12 flex flex-wrap gap-2 sm:gap-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg font-semibold transition-all ${category === selectedCategory
                                ? 'bg-maple-orange text-white shadow-lg'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Featured Posts */}
                {featuredPosts.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="text-yellow-400">⭐</span>
                            추천 글
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {featuredPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={post.slug.startsWith('/') ? post.slug : `/blog/${post.slug}`}
                                    className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-maple-orange/30 rounded-2xl p-6 hover:border-maple-orange transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-maple-orange/20"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="text-5xl">{post.thumbnail}</div>
                                        <div className="flex-1">
                                            <span className="inline-block px-3 py-1 bg-maple-orange/20 text-maple-orange text-xs font-bold rounded-full mb-2">
                                                {post.category}
                                            </span>
                                            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-maple-orange transition-colors mb-2 leading-snug">
                                                {post.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                        {post.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Regular Posts */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-blue-400" />
                        최신 글
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {regularPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={post.slug.startsWith('/') ? post.slug : `/blog/${post.slug}`}
                                className="group bg-slate-800/30 border border-slate-700 rounded-xl p-6 hover:border-blue-500 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="text-4xl mb-4">{post.thumbnail}</div>
                                <span className="inline-block px-2 py-1 bg-slate-700 text-slate-300 text-xs font-semibold rounded mb-3">
                                    {post.category}
                                </span>
                                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                                    {post.description}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-slate-500">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div >
    );
}
