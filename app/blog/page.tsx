'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Flame, TrendingUp } from 'lucide-react';
import { InFeedAd } from '@/components/AdSense';
import CalculatorMenu from "../../components/navigation/CalculatorMenu";

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
        slug: 'crown-hyperburning-guide-2025',
        title: '🔥 [2025 메이플] 크라운 하이퍼버닝 & 아이템 버닝 완벽 가이드: "이 순서 모르면 손해 봅니다!"',
        description: '정령의 펜던트 순서, 자석펫 사용법, 딸기 농장 활용까지! 260레벨까지 최단 시간 달성을 위한 필수 체크리스트.',
        category: '육성 가이드',
        date: '2025년 12월 15일',
        readTime: '12분',
        thumbnail: '🔥',
    },
    {
        slug: 'beginner-guide-2025',
        title: '유니온 + 링크부터 200레벨 초고속 육성까지! 완벽 내실 가이드',
        description: '유니온 6000, 링크스킬, 아티팩트까지! 200레벨 4-6시간 달성하는 초고속 육성법과 내실 완벽 가이드.',
        category: '육성 가이드',
        date: '2025년 12월 11일',
        readTime: '20분',
        thumbnail: '⚔️',
    },
    {
        slug: 'hyperburning-jobs-2025-v2',
        title: '🎮 데이터로 증명된 2025 하이퍼버닝 직업 추천 v2.0 (하이브리드 랭킹)',
        description: 'AI, 유튜버, 일반인 인식, 고점 데이터를 모두 섞었다! 4가지 모드로 분석한 가장 완벽한 직업 추천 가이드.',
        category: '육성 가이드',
        date: '2025년 12월 12일',
        readTime: '10분',
        thumbnail: '🚀',
    },
    {
        slug: 'monsterpark-2025',
        title: '🎮 몬스터파크 극한 효율 가이드 - 레벨별 최적 사냥터 완벽 분석',
        description: '260~299 레벨 구간별로 몬스터파크에서 얻을 수 있는 경험치 효율을 완벽하게 정리! 당신의 레벨에 맞는 최적의 사냥터를 찾아보세요.',
        category: '경험치 가이드',
        date: '2025년 12월 13일',
        readTime: '12분',
        thumbnail: '🎯',
    },
    {
        slug: 'free-to-play-guide',
        title: '완전 무자본 200레벨 육성 가이드 - 0메소, 이벤트 없이도 가능!',
        description: '본캐 지원 없이, 이벤트 없이, 0메소로 시작해서 200레벨 달성하는 완벽 퀘스트 육성 가이드. 3시간 30분이면 충분!',
        category: '육성 가이드',
        date: '2025년 12월 11일',
        readTime: '15분',
        thumbnail: '💚',
    },
    // 이벤트 가이드
    {
        slug: 'boss-memory-calculator',
        title: '⚔️ 보스 코인 계산기 & 코인샵 - 보스 선택부터 쇼핑까지!',
        description: '13주 동안의 보스 처치 계획을 세우고, 획득한 환영의 기억으로 바로 쇼핑! 주차별 선택, 자동 합산, 장바구니까지 한 페이지에서 모두 해결하세요.',
        category: '이벤트 가이드',
        date: '2025년 12월 15일',
        readTime: '5분',
        thumbnail: '/images/boss-coin.png',
    },
    {
        slug: 'challengers-world-calculator',
        title: '⚔️ 챌린저스 월드 티어 & 코인 계산기 - 나의 티어를 실시간으로 확인하세요!',
        description: '레벨, 보스, 사냥 미션을 입력하고 챌린저스 포인트와 코인을 자동 계산! 브론즈부터 챌린저까지, 다음 티어까지 얼마나 남았는지 한눈에 확인하세요.',
        category: '이벤트 가이드',
        date: '2025년 12월 15일',
        readTime: '5분',
        thumbnail: '/images/challengers-coin.png',
    },
    {
        slug: 'genesis-liberation-calculator',
        title: '⚔️ 제네시스 무기 해방 계산기 - 챌린저스 시즌3 완벽 가이드',
        description: '주차별 보스 격파 스케줄을 설정하고 17주 안에 제네시스 무기 해방을 완료할 수 있을지 정확하게 계산하세요! 이지부터 하드까지, 월간 보스까지 모두 고려한 정밀 계산.',
        category: '이벤트 가이드',
        date: '2025년 12월 17일',
        readTime: '5분',
        thumbnail: '/images/genesis-weapon.png',
    },
    {
        slug: 'illusion-coin-shop',
        title: '👻 일루전 일반 코인샵 - 환영이 내리는 밤',
        description: '조사 미션으로 획득한 일루전 코인으로 구매 가능한 26가지 아이템(강화/성장)을 확인하고, 필요한 코인을 미리 계획하세요!',
        category: '이벤트 가이드',
        date: '2025년 12월 15일',
        readTime: '3분',
        thumbnail: '/images/illusion-coin.png',
    },
    {
        slug: 'crown-winter-showcase-2025',
        title: '👑 메이플스토리 겨울 쇼케이스 "크라운" 완벽 예측: 어셈블을 넘어 정점으로',
        description: '12월 13일 공개되는 겨울 쇼케이스 "크라운"을 심층 분석! Lv.290 시대, 신규 지역, 6차 전직 완성까지 모든 것을 예측합니다.',
        category: '업데이트 소식',
        date: '2025년 12월 13일',
        readTime: '15분',
        thumbnail: '👑',
    },
    // 장비 가이드
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
        slug: '/guide/cooltime-hat-guide',
        title: '쿨타임 모자 완벽 가이드 - 쿨감의 모든 것',
        description: '쿨타임 감소 모자 획득법과 효율 분석. 내 직업에 쿨감모가 필요한지 알아보세요!',
        category: '장비 가이드',
        date: '2025년 11월 28일',
        readTime: '8분',
        thumbnail: '🎩',
    },
];

// 카테고리별 아이콘
const categoryIcons: { [key: string]: any } = {
    '육성 가이드': Flame,
    '이벤트 가이드': TrendingUp,
    '장비 가이드': '🛡️',
    '경험치 가이드': '📈',
};

export default function BlogPage() {
    const heroPost = blogPosts[0]; // 하이퍼버닝 직업 추천 (가장 HOT)

    const levelingPosts = blogPosts.filter(p => p.category === '육성 가이드' || p.category === '경험치 가이드').slice(0, 6);
    const eventPosts = blogPosts.filter(p => p.category === '이벤트 가이드' || p.category === '업데이트 소식').slice(0, 6);
    const equipmentPosts = blogPosts.filter(p => p.category === '장비 가이드').slice(0, 4);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Global Navigation */}
            <header className="w-full sm:max-w-7xl flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 mx-auto">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/maple-ai-logo.jpg" alt="메이플 AI 로고" className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-lg shadow-md border border-slate-700/30" />
                    <span className="text-xl sm:text-2xl font-black tracking-tighter text-maple-orange drop-shadow-sm hidden sm:block">
                        메이플 AI
                    </span>
                </Link>

                <div className="flex items-center gap-1.5 sm:gap-2">
                    <Link
                        href="/blog"
                        className="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-900/20"
                    >
                        <span className="text-base sm:text-lg">📝</span>
                        <span className="hidden sm:inline">블로그</span>
                    </Link>
                    <CalculatorMenu />
                    <a href="/guide" className="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-orange-600/90 hover:bg-orange-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-lg">
                        <span className="text-base sm:text-lg">📚</span>
                        <span className="hidden sm:inline">가이드</span>
                    </a>
                </div>
            </header>

            {/* Page Title */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 sm:mb-2">메이플 AI 블로그</h1>
                    <p className="text-slate-400 text-xs sm:text-sm md:text-base lg:text-lg">메이플스토리를 더 깊이 이해하고, 더 효율적으로 즐기는 방법</p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
                {/* Hero Section - 컴팩트한 HOT 포스트 */}
                <section className="mb-12 relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-900/40 via-red-900/40 to-purple-900/40 border border-orange-500/50 shadow-xl">
                    <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

                    <div className="relative z-10 p-4 sm:p-6 md:p-8">
                        <span className="inline-block px-3 py-1 mb-3 text-xs font-bold bg-red-600 text-white rounded-full animate-pulse shadow-lg shadow-red-900/50">
                            🔥 지금 가장 HOT한 글
                        </span>

                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-tight mb-3 drop-shadow-xl">
                            <span className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 bg-clip-text text-transparent">
                                2025 하이퍼버닝 직업 추천 종결판
                            </span>
                        </h2>

                        <p className="text-slate-200 text-sm sm:text-base md:text-lg mb-4 drop-shadow-md">
                            유튜버 6인 분석 종합! 메친놈, 슈크림메이플, 물다이아 등 전문가 의견 총집합
                        </p>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{heroPost.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{heroPost.readTime}</span>
                            </div>
                        </div>

                        <Link href={`/blog/${heroPost.slug}`}>
                            <button className="px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group text-sm sm:text-base">
                                <span>지금 확인하기</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </section>

                {/* 첫 번째 광고 - Hero 섹션 직후 */}
                <div className="mb-16">
                    <InFeedAd
                        dataAdSlot="4331375010"
                        className="max-w-4xl mx-auto"
                    />
                </div>

                {/* 육성 가이드 섹션 */}
                <section className="mb-20">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black flex items-center gap-3 mb-2">
                                <Flame className="w-8 h-8 text-orange-500" />
                                <span>육성 가이드</span>
                            </h2>
                            <p className="text-slate-400 text-sm sm:text-base">레벨업이 막힐 때, 직업 선택이 고민될 때</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {levelingPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={post.slug.startsWith('/') ? post.slug : `/blog/${post.slug}`}
                                className="group bg-slate-800/30 border border-slate-700 rounded-xl p-6 hover:border-orange-500 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-900/20"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    {post.thumbnail.startsWith('/') ? (
                                        <div className="relative w-12 h-12">
                                            <Image src={post.thumbnail} alt={post.title} fill className="object-contain" />
                                        </div>
                                    ) : (
                                        <div className="text-5xl">{post.thumbnail}</div>
                                    )}
                                    <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs font-semibold rounded">
                                        {post.category}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors mb-3 line-clamp-2 leading-snug">
                                    {post.title}
                                </h3>

                                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
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

                {/* 두 번째 광고 - 육성 가이드 후 */}
                <div className="mb-20">
                    <InFeedAd
                        dataAdSlot="4331375010"
                        className="max-w-4xl mx-auto"
                    />
                </div>

                {/* 이벤트 가이드 섹션 */}
                <section className="mb-20">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black flex items-center gap-3 mb-2">
                                <TrendingUp className="w-8 h-8 text-blue-500" />
                                <span>이벤트 가이드</span>
                            </h2>
                            <p className="text-slate-400 text-sm sm:text-base">최신 이벤트를 100% 활용하는 방법</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={post.slug.startsWith('/') ? post.slug : `/blog/${post.slug}`}
                                className="group bg-slate-800/30 border border-slate-700 rounded-xl p-6 hover:border-blue-500 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    {post.thumbnail.startsWith('/') ? (
                                        <div className="relative w-12 h-12">
                                            <Image src={post.thumbnail} alt={post.title} fill className="object-contain" />
                                        </div>
                                    ) : (
                                        <div className="text-5xl">{post.thumbnail}</div>
                                    )}
                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded">
                                        {post.category}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3 line-clamp-2 leading-snug">
                                    {post.title}
                                </h3>

                                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
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

                {/* 세 번째 광고 - 이벤트 가이드 후 */}
                <div className="mb-20">
                    <InFeedAd
                        dataAdSlot="4331375010"
                        className="max-w-4xl mx-auto"
                    />
                </div>

                {/* 장비 가이드 섹션 */}
                <section className="mb-16">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black flex items-center gap-3 mb-2">
                                <span className="text-4xl">🛡️</span>
                                <span>장비 가이드</span>
                            </h2>
                            <p className="text-slate-400 text-sm sm:text-base">스펙업의 시작, 장비 세팅의 모든 것</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {equipmentPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={post.slug.startsWith('/') ? post.slug : `/blog/${post.slug}`}
                                className="group bg-slate-800/30 border border-slate-700 rounded-xl p-6 hover:border-purple-500 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/20"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="text-4xl">{post.thumbnail}</div>
                                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded">
                                        {post.category}
                                    </span>
                                </div>

                                <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors mb-3 line-clamp-2 leading-snug">
                                    {post.title}
                                </h3>

                                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                    {post.description}
                                </p>

                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Clock className="w-3 h-3" />
                                    <span>{post.readTime}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* CTA Section - 메인 페이지로 */}
                <section className="mt-20 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/50 rounded-2xl p-8 sm:p-12 text-center">
                    <h3 className="text-2xl sm:text-3xl font-black mb-4">
                        💡 지금 바로 내 캐릭터 진단 받기
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
                        메이플 AI가 당신의 캐릭터를 정밀 분석해드립니다.<br />
                        장비, 스탯, 스킬까지 완벽한 성장 로드맵을 제시합니다.
                    </p>
                    <Link href="/">
                        <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center gap-3 mx-auto group">
                            <span className="text-lg">무료로 진단 시작</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </section>
            </main>
        </div>
    );
}
