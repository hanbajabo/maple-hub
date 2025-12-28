import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/blogPosts';

export default function RecommendedGuides() {
    // 최신 블로그 포스트 6개만 표시
    const latestPosts = blogPosts.slice(0, 6);

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-6 px-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                    <span className="text-3xl">📝</span>
                    메이플 AI 블로그
                </h2>
                <Link href="/blog" className="self-end sm:self-auto text-slate-400 hover:text-maple-orange text-sm sm:text-base font-bold flex items-center gap-1 transition-colors">
                    블로그 홈
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {latestPosts.map((post, idx) => (
                    <Link
                        key={idx}
                        href={post.slug.startsWith('/') ? post.slug : `/blog/${post.slug}`}
                        className={`group relative bg-slate-900/50 border border-slate-700/50 rounded-2xl p-5 hover:border-maple-orange hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden flex flex-col h-full`}
                    >
                        {/* Hover Gradient Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-maple-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-3">
                                {post.thumbnail.startsWith('/') ? (
                                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-xl overflow-hidden shadow-inner group-hover:scale-110 transition-transform duration-300">
                                        <Image src={post.thumbnail} alt={post.title} fill className="object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-xl flex items-center justify-center text-2xl sm:text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                                        {post.thumbnail}
                                    </div>
                                )}
                                <span className={`text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full border bg-slate-800 text-slate-400 border-slate-700`}>
                                    {post.category}
                                </span>
                            </div>

                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-maple-orange transition-colors line-clamp-2">
                                {post.title}
                            </h3>

                            <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-grow">
                                {post.description}
                            </p>

                            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-500 border-t border-slate-800/50 pt-3 mt-auto">
                                <div className="flex items-center gap-1">
                                    <span>📅</span>
                                    <span>{post.date}</span>
                                </div>
                                <div className="w-px h-3 bg-slate-700"></div>
                                <div className="flex items-center gap-1">
                                    <span>⏱️</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <div className="ml-auto text-maple-orange font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                    읽기 →
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
