'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Flame, Gamepad2, Shield, Sparkles } from 'lucide-react';
import { InFeedAd, AdBanner } from '@/components/AdSense';

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
    // 이벤트 가이드
    {
        slug: 'boss-memory-calculator',
        title: '⚔️ 보스 코인 계산기 & 코인샵 - 보스 선택부터 쇼핑까지!',
        description: '13주 동안의 보스 처치 계획을 세우고, 획득한 환영의 기억으로 바로 쇼핑! 주차별 선택, 자동 합산, 장바구니까지 한 페이지에서 모두 해결하세요.',
        category: '이벤트 가이드',
        date: '2025년 12월 15일',
        readTime: '5분',
        thumbnail: '/images/boss-coin.png',
        featured: true,
    },
    {
        slug: 'challengers-world-calculator',
        title: '⚔️ 챌린저스 월드 티어 & 코인 계산기 - 나의 티어를 실시간으로 확인하세요!',
        description: '레벨, 보스, 사냥 미션을 입력하고 챌린저스 포인트와 코인을 자동 계산! 브론즈부터 챌린저까지, 다음 티어까지 얼마나 남았는지 한눈에 확인하세요.',
        category: '이벤트 가이드',
        date: '2025년 12월 15일',
        readTime: '5분',
        thumbnail: '/images/challengers-coin.png',
        featured: true,
    },
    {
        slug: 'genesis-liberation-calculator',
        title: '⚔️ 제네시스 무기 해방 계산기 - 챌린저스 시즌3 완벽 가이드',
        description: '주차별 보스 격파 스케줄을 설정하고 17주 안에 제네시스 무기 해방을 완료할 수 있을지 정확하게 계산하세요!',
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
        title: '🔥 [2025 메이플] 크라운 하이퍼버닝 & 아이템 버닝 완벽 가이드',
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
        slug: 'monsterpark-2025',
        title: '🎮 몬스터파크 극한 효율 가이드 - 레벨별 최적 사냥터 완벽 분석',
        description: '260~299 레벨 구간별로 몬스터파크에서 얻을 수 있는 경험치 효율을 완벽하게 정리!',
        category: '경험치 가이드',
        date: '2025년 12월 13일',
        readTime: '12분',
        thumbnail: '🎯',
    },
    {
        slug: 'hyperburning-jobs-2025-v2',
        title: '🎮 데이터로 증명된 2025 하이퍼버닝 직업 추천 v2.0',
        description: 'AI, 유튜버, 일반인 인식, 고점 데이터를 모두 섞었다! 4가지 모드로 분석한 가장 완벽한 직업 추천 가이드.',
        category: '육성 가이드',
        date: '2025년 12월 12일',
        readTime: '10분',
        thumbnail: '🚀',
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
];

const categories = ['전체', '육성 가이드', '이벤트 가이드', '경험치 가이드', '장비 가이드'];

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState('전체');

    // Hero post (가장 HOT한 포스트)
    const heroPost = blogPosts.find(post => post.slug === 'hyperburning-jobs-2025') || blogPosts[0];

    // 카테고리별 포스트
    const getPostsByCategory = (category: string) => {
        return blogPosts.filter(post => post.category === category);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Global Navigation */}
            <header className="w-full sm:max-w-7xl flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 mx-auto">
                <Link
                    href="/"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
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
                    <a
                        href="/guide"
                        className="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-orange-600/90 hover:bg-orange-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-lg"
                    >
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

            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
                {/* Hero Section - 대문짝 HOT 포스트 */}
                <section className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-900/30 via-red-900/30 to-purple-900/30 border border-orange-500/30">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

                    <div className="relative z-10 p-6 sm:p-8 md:p-12 flex flex-col md:flex-row gap-6 items-center">
                        <div className="flex-1 text-center md:text-left">
                            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold bg-red-600 rounded-full animate-pulse shadow-lg shadow-red-900/50">
                                🔥지금 가장 HOT한 글
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 drop-shadow-lg bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 bg-clip-text text-transparent">
                                2025 하이퍼버닝<br className="hidden sm:block" />직업 추천 종결판
                            </h2>
                            <p className="text-slate-200 text-sm sm:text-base md:text-lg mb-6 drop-shadow-md">
                                유튜버 6인 분석 종합! 실패 없는 선택을 위한 완벽 가이드
                            </p>
                            <Link href={`/blog/${heroPost.slug}`}>
                                <button className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition shadow-lg flex items-center gap-2 mx-auto md:mx-0">
                                    지금 확인하기
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                        이 계속 작성중입니다...
