'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bot, ExternalLink, Calendar, Loader2 } from 'lucide-react';
import AiNewsCard from '@/components/AiNewsCard';
import axios from 'axios';
import ExpandableNewsItem from '@/components/ExpandableNewsItem';

interface NewsItem {
    title: string;
    url: string;
    date: string;
    summary?: string;
}

interface NewsResponse {
    main: NewsItem;
    list: NewsItem[];
}

interface EventData {
    title: string;
    url: string;
    date: string;
    date_event_start?: string;
    date_event_end?: string;
}

export default function NewsPage() {
    const [updateNews, setUpdateNews] = useState<NewsResponse | null>(null);
    const [noticeNews, setNoticeNews] = useState<NewsResponse | null>(null);
    const [testNews, setTestNews] = useState<NewsResponse | null>(null);
    const [eventList, setEventList] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);

                // 4가지 데이터를 병렬로 요청 (테스트월드 추가)
                const [updateRes, noticeRes, eventRes, testRes] = await Promise.allSettled([
                    axios.get('/api/news-summary?type=update'),
                    axios.get('/api/news-summary?type=notice'),
                    axios.get('/api/news-summary?type=event'),
                    axios.get('/api/news-summary?type=test')
                ]);

                // 업데이트 뉴스 처리
                if (updateRes.status === 'fulfilled' && updateRes.value.data.success) {
                    setUpdateNews(updateRes.value.data.data);
                }

                // 공지사항 뉴스 처리
                if (noticeRes.status === 'fulfilled' && noticeRes.value.data.success) {
                    setNoticeNews(noticeRes.value.data.data);
                }

                // 이벤트 목록 처리
                if (eventRes.status === 'fulfilled' && eventRes.value.data.success) {
                    setEventList(eventRes.value.data.data);
                }

                // 테스트월드 뉴스 처리
                if (testRes.status === 'fulfilled' && testRes.value.data.success) {
                    setTestNews(testRes.value.data.data);
                }

            } catch (err) {
                console.error('Failed to fetch news:', err);
                setError('뉴스를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                        <span className="font-medium">메인으로</span>
                    </Link>
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/maple-ai-logo.jpg"
                            alt="단풍이 로고"
                            className="w-8 h-8 object-contain rounded-lg border border-slate-700/50 shadow-sm"
                        />
                        단풍이의 메이플 공지 요약
                    </h1>
                    <div className="w-20"></div>
                </div>
            </div>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8 sm:space-y-12">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 sm:mb-4">
                        <span className="text-indigo-400">AI</span>가 요약해주는<br />
                        메이플스토리 최신 소식
                    </h2>
                    <p className="text-sm sm:text-base text-slate-400">
                        복잡하고 긴 공지사항, 단풍이가 핵심만 쏙쏙 골라 요약해드립니다!
                    </p>
                </div>

                {loading && !error ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
                        <p className="text-slate-400 animate-pulse">단풍이가 열심히 뉴스를 읽고 있어요... 🍁</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-400">
                        <p>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                            다시 시도
                        </button>
                    </div>
                ) : (
                    <>
                        {/* 1. 진행 중인 이벤트 목록 (최상단 배치, 가로 스크롤) */}
                        <div className="animate-fade-in-up">
                            <div className="flex items-center gap-2 mb-4 px-2">
                                <span className="w-2 h-8 bg-pink-500 rounded-full"></span>
                                <h3 className="text-2xl font-bold text-white">진행 중인 이벤트 🎁</h3>
                            </div>

                            {loading ? (
                                <div className="flex gap-4 overflow-hidden">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-72 h-24 bg-slate-800/50 rounded-xl animate-pulse flex-shrink-0"></div>
                                    ))}
                                </div>
                            ) : eventList.length > 0 ? (
                                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                                    {eventList.map((event, index) => (
                                        <Link
                                            key={index}
                                            href={event.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex-shrink-0 w-72 bg-slate-900/80 border border-slate-700/50 hover:border-pink-500/50 rounded-xl p-4 transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-1"
                                        >
                                            <div className="flex flex-col h-full justify-between gap-2">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h4 className="text-base font-bold text-slate-200 group-hover:text-pink-400 transition-colors line-clamp-2 leading-tight">
                                                        {event.title}
                                                    </h4>
                                                    <ExternalLink size={16} className="text-slate-600 group-hover:text-pink-400 transition-colors flex-shrink-0 mt-0.5" />
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                    <Calendar size={12} />
                                                    <span>
                                                        {event.date_event_start ? `${event.date_event_start.split('T')[0]} ~ ${event.date_event_end?.split('T')[0]}` : event.date.split('T')[0]}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-slate-900/30 rounded-xl border border-slate-800 border-dashed">
                                    <p className="text-slate-500">진행 중인 이벤트 정보를 불러올 수 없어요 😢</p>
                                </div>
                            )}
                        </div>

                        {/* 2. AI 요약 뉴스 (업데이트 & 공지사항) */}
                        <div className="space-y-8 sm:space-y-12">
                            {loading ? (
                                <div className="space-y-12">
                                    <div className="h-96 bg-slate-800/30 rounded-2xl animate-pulse"></div>
                                    <div className="h-96 bg-slate-800/30 rounded-2xl animate-pulse"></div>
                                </div>
                            ) : (
                                <>
                                    {[
                                        { key: 'update', data: updateNews, title: '최신 업데이트 🛠️', color: 'bg-maple-orange' },
                                        { key: 'notice', data: noticeNews, title: '주요 공지사항 📢', color: 'bg-indigo-500' },
                                        { key: 'test', data: testNews, title: '테스트월드 소식 🧪', color: 'bg-emerald-500' }
                                    ]
                                        .filter(section => section.data)
                                        .sort((a, b) => new Date(b.data!.main.date).getTime() - new Date(a.data!.main.date).getTime())
                                        .map((section, sIdx) => {
                                            const { data, title, color } = section;
                                            if (!data) return null;

                                            return (
                                                <div key={section.key} className="animate-fade-in-up" style={{ animationDelay: `${(sIdx + 1) * 0.1}s` }}>
                                                    <div className="flex items-center gap-2 mb-4 px-2">
                                                        <span className={`w-2 h-8 ${color} rounded-full`}></span>
                                                        <h3 className="text-2xl font-bold text-white">{title}</h3>
                                                    </div>
                                                    <AiNewsCard
                                                        title={data.main.title}
                                                        date={data.main.date.split('T')[0]}
                                                        url={data.main.url}
                                                        summary={data.main.summary || ''}
                                                    />
                                                    {/* 지난 목록 */}
                                                    {data.list.length > 0 && (
                                                        <div className="mt-4 bg-slate-900/50 rounded-xl border border-slate-800 divide-y divide-slate-800">
                                                            {data.list.map((item, idx) => (
                                                                <ExpandableNewsItem
                                                                    key={idx}
                                                                    title={item.title}
                                                                    url={item.url}
                                                                    date={item.date}
                                                                    type={section.key}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                </>
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
