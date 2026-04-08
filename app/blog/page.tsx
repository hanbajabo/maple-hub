'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Flame, TrendingUp, Gift, Search, X } from 'lucide-react';
import { InFeedAd } from '@/components/AdSense';


import { blogPosts, BlogPost } from '@/lib/blogPosts';

// 카테고리별 아이콘
const categoryIcons: { [key: string]: any } = {
    '육성 가이드': Flame,
    '이벤트 가이드': TrendingUp,
    '장비 가이드': '🛡️',
    '경험치 가이드': '📈',
};

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState('');

    // Hero Post는 최신 업데이트 포스트 (4주차 공략으로 변경)
    const heroPost = blogPosts.find(p => p.slug === 'change-burning-lucid-week4-guide') || blogPosts[0];

    // 검색 필터 함수
    const filterBySearch = (posts: BlogPost[]) => {
        if (!searchQuery.trim()) return posts;
        const query = searchQuery.toLowerCase();
        return posts.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
    };

    const allSearchResults = searchQuery ? filterBySearch(blogPosts) : [];

    const levelingPosts = filterBySearch(blogPosts.filter(p => p.category === '육성 가이드' || p.category === '경험치 가이드'));
    const eventPosts = filterBySearch(blogPosts.filter(p => p.category === '이벤트 가이드'));
    const equipmentPosts = filterBySearch(blogPosts.filter(p => p.category === '장비 가이드'));
    const testworldPosts = filterBySearch(blogPosts.filter(p => p.category === '업데이트 소식'));
    const storyPosts = filterBySearch(blogPosts.filter(p => p.category === '메이플 이야기'));

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">


            {/* Page Title */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 sm:mb-2">메이플 AI 블로그</h1>
                    <p className="text-slate-400 text-xs sm:text-sm md:text-base lg:text-lg">메이플스토리를 더 깊이 이해하고, 더 효율적으로 즐기는 방법</p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">

                {/* Hero Section & 검색바 통합 */}
                <section className="mb-12 relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-indigo-900/40 border border-purple-500/50 shadow-xl flex flex-col">
                    <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 pointer-events-none" />

                    <div className="relative z-10 p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="inline-block px-3 py-1 text-xs font-bold bg-red-600 text-white rounded-full animate-pulse shadow-lg shadow-red-900/50">
                                🔥 지금 가장 HOT한 글
                            </span>
                            <span className="inline-block px-3 py-1 text-xs font-bold bg-slate-700 text-slate-200 rounded-full border border-slate-600">
                                {heroPost.category}
                            </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-tight mb-3 drop-shadow-xl">
                            <span className="bg-gradient-to-r from-purple-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                                {heroPost.title}
                            </span>
                        </h2>

                        <p className="text-slate-200 text-sm sm:text-base md:text-lg mb-4 drop-shadow-md border-b-0 pb-0">
                            {heroPost.description}
                        </p>

                        <div className="flex items-center gap-4 mb-5">
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{heroPost.date}</span>
                            </div>
                            {heroPost.targetDate ? (
                                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-green-400 font-bold">
                                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>{heroPost.targetDate} 적용예정</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300">
                                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>{heroPost.readTime}</span>
                                </div>
                            )}
                        </div>

                        <Link href={`/blog/${heroPost.slug}`}>
                            <button className="px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group text-sm sm:text-base">
                                <span>지금 확인하기</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </section>

                {/* 검색바 */}
                <section className="mb-12">
                    <div className="w-full bg-gradient-to-r from-purple-900/30 via-slate-800/60 to-blue-900/30 border border-purple-500/40 rounded-xl p-4 sm:p-5 shadow-lg">
                        {/* 섹션 바로가기 칩 */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="text-xs text-slate-500 font-medium shrink-0">바로가기:</span>
                            {[
                                { label: '🍁 메이플 소식', href: '#update' },
                                { label: '🔥 육성 가이드', href: '#leveling' },
                                { label: '🎉 이벤트 가이드', href: '#event' },
                                { label: '🛡️ 장비 가이드', href: '#equipment' },
                                { label: '💬 메이플 이야기', href: '#story' },
                            ].map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="px-2.5 py-1 text-xs font-semibold bg-slate-700/60 hover:bg-purple-700/50 border border-slate-600 hover:border-purple-500 text-slate-300 hover:text-white rounded-full transition-all"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-purple-300 mb-2 flex items-center gap-1.5">
                            <Search className="w-3.5 h-3.5" />
                            블로그 전체 검색
                        </p>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="제목, 키워드로 검색해서 다양한 정보를 얻으세요. (예: 어빌리티, 헥사, 보스)"
                                className="w-full px-5 py-4 pl-12 bg-slate-900/80 border-2 border-purple-500/50 rounded-xl text-white placeholder:text-slate-500 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/40 transition-all text-sm sm:text-base shadow-inner"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                        {searchQuery && (
                            <p className="mt-3 text-sm text-purple-300 font-semibold text-center">
                                &quot;{searchQuery}&quot; 검색 결과: {allSearchResults.length}개
                            </p>
                        )}
                    </div>
                </section>

                {/* 검색 결과 뷰 */}
                {searchQuery ? (
                    <section className="mb-20 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allSearchResults.map((post) => (
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
                                        <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs font-semibold rounded">
                                            {post.category}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3 line-clamp-2 leading-snug">
                                        {post.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                        {post.description}
                                    </p>

                                    <div className="flex flex-wrap items-center text-xs text-slate-500 gap-y-1">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            <span>{post.date}</span>
                                        </div>
                                        {post.targetDate ? (
                                            <div className="flex items-center gap-1 text-green-400 font-bold ml-2">
                                                <ArrowRight className="w-3 h-3" />
                                                <span>{post.targetDate} 적용예정</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1 ml-3">
                                                <Clock className="w-3 h-3" />
                                                <span>{post.readTime}</span>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ) : (
                    <>
                        {/* 첫 번째 광고 - Hero 섹션 직후 */}
                        <div className="mb-16">
                            <InFeedAd
                                dataAdSlot="4331375010"
                                className="max-w-4xl mx-auto"
                            />
                        </div>

                        {/* 테스트월드 소식 섹션 */}
                        {testworldPosts.length > 0 && (
                            <section id="update" className="mb-20 scroll-mt-24">
                                <div className="flex justify-between items-end mb-8">
                                    <div>
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black flex items-center gap-3 mb-2">
                                            <span className="text-4xl text-orange-500">🍁</span>
                                            <span>메이플 업데이트 소식</span>
                                        </h2>
                                        <p className="text-slate-400 text-sm sm:text-base">패치노트부터 미리 보는 이벤트까지</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {testworldPosts.map((post) => (
                                        <Link
                                            key={post.slug}
                                            href={post.slug.startsWith('/') ? post.slug : `/blog/${post.slug}`}
                                            className="group bg-slate-800/30 border border-slate-700 rounded-xl p-6 hover:border-cyan-500 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-900/20"
                                        >
                                            <div className="mb-4 flex items-center justify-between">
                                                {post.thumbnail.startsWith('/') ? (
                                                    <div className="relative w-12 h-12">
                                                        <Image src={post.thumbnail} alt={post.title} fill className="object-contain" />
                                                    </div>
                                                ) : (
                                                    <div className="text-5xl">{post.thumbnail}</div>
                                                )}
                                                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-semibold rounded">
                                                    {post.category}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-3 line-clamp-2 leading-snug">
                                                {post.title}
                                            </h3>

                                            <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                                {post.description}
                                            </p>

                                            <div className="flex flex-wrap items-center text-xs text-slate-500 gap-y-1">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{post.date}</span>
                                                </div>
                                                {post.targetDate ? (
                                                    <div className="flex items-center gap-1 text-green-400 font-bold ml-2">
                                                        <ArrowRight className="w-3 h-3" />
                                                        <span>{post.targetDate} 적용예정</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1 ml-3">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{post.readTime}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 다섯 번째 광고 - 테스트월드 소식 후 */}
                        <div className="mb-20">
                            <InFeedAd
                                dataAdSlot="4331375010"
                                className="max-w-4xl mx-auto"
                            />
                        </div>

                        {/* 육성 가이드 섹션 */}
                        <section id="leveling" className="mb-20 scroll-mt-24">
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
                        <section id="event" className="mb-20 scroll-mt-24">
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
                        <section id="equipment" className="mb-16 scroll-mt-24">
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

                        {/* 네 번째 광고 - 장비 가이드 후 */}
                        <div className="mb-20">
                            <InFeedAd
                                dataAdSlot="4331375010"
                                className="max-w-4xl mx-auto"
                            />
                        </div>

                        {/* 메이플 이야기 섹션 */}
                        {storyPosts.length > 0 && (
                            <section id="story" className="mb-20 scroll-mt-24">
                                <div className="flex justify-between items-end mb-8">
                                    <div>
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black flex items-center gap-3 mb-2">
                                            <span className="text-4xl">🍁</span>
                                            <span>메이플 이야기</span>
                                        </h2>
                                        <p className="text-slate-400 text-sm sm:text-base">깊이 있는 분석, 예측, 그리고 칼럼</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {storyPosts.map((post) => (
                                        <Link
                                            key={post.slug}
                                            href={post.slug.startsWith('/') ? post.slug : `/blog/${post.slug}`}
                                            className="group bg-slate-800/30 border border-slate-700 rounded-xl p-6 hover:border-red-500 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/20"
                                        >
                                            <div className="mb-4 flex items-center justify-between">
                                                {post.thumbnail.startsWith('/') ? (
                                                    <div className="relative w-12 h-12">
                                                        <Image src={post.thumbnail} alt={post.title} fill className="object-contain" />
                                                    </div>
                                                ) : (
                                                    <div className="text-5xl">{post.thumbnail}</div>
                                                )}
                                                <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs font-semibold rounded">
                                                    {post.category}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-3 line-clamp-2 leading-snug">
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
                        )}

                        {/* CTA Section - 메인 페이지로 */}
                        {!searchQuery && (
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
                        )}
                    </>
                )}
            </main>
        </div >
    );
}
