'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Flame, TrendingUp, Gift } from 'lucide-react';
import { InFeedAd } from '@/components/AdSense';
import CalculatorMenu from "../../components/navigation/CalculatorMenu";

import { blogPosts } from '@/lib/blogPosts';

// 카테고리별 아이콘
const categoryIcons: { [key: string]: any } = {
    '육성 가이드': Flame,
    '이벤트 가이드': TrendingUp,
    '장비 가이드': '🛡️',
    '경험치 가이드': '📈',
};

export default function BlogPage() {
    // Hero Post는 항상 하이퍼버닝 직업 추천 글
    const heroPost = blogPosts.find(p => p.slug === 'hyperburning-jobs-2025') || blogPosts[0];

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
                {/* 최신 공지 배너 - 감사의 마음 */}
                <section className="mb-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 border-2 border-green-500 shadow-2xl shadow-green-900/50">
                    <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />

                    <Link href="/blog/thank-you-gift-2026" className="block">
                        <div className="relative z-10 p-4 sm:p-6 hover:scale-[1.02] transition-transform cursor-pointer">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center">
                                        <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 animate-bounce" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-green-900 text-white text-xs sm:text-sm font-bold rounded-full">
                                                🎁 공식 선물
                                            </span>
                                            <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-yellow-400 text-black text-xs sm:text-sm font-bold rounded-full">
                                                1/14 마감
                                            </span>
                                        </div>
                                        <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-white drop-shadow-lg">
                                            용사님들께 드리는 감사의 마음
                                        </h3>
                                        <p className="text-white/90 text-xs sm:text-sm md:text-base mt-1">
                                            극한 성장의 비약(200~249) 3개 무료! 버닝 캐릭터도 사용 가능 🔥
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <div className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2 text-sm sm:text-base">
                                        <span>자세히 보기</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>

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
