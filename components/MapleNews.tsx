"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Bell, Calendar, Megaphone, ChevronRight, Loader2 } from "lucide-react";
import { getNoticeList, getUpdateList, getEventList } from "../lib/nexon";

interface NewsItem {
    notice_id?: number;
    title: string;
    url: string;
    notice_title?: string;
    date: string;
    date_event_start?: string;
    date_event_end?: string;
}

export default function MapleNews() {
    const [activeTab, setActiveTab] = useState<"notice" | "update" | "event">("event");
    const [noticeData, setNoticeData] = useState<NewsItem[]>([]);
    const [updateData, setUpdateData] = useState<NewsItem[]>([]);
    const [eventData, setEventData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError("");

            try {
                const [notices, updates, events] = await Promise.all([
                    getNoticeList(),
                    getUpdateList(),
                    getEventList()
                ]);

                setNoticeData(notices?.notice || []);
                setUpdateData(updates?.update_notice || []);
                setEventData(events?.event_notice || []);
            } catch (err) {
                console.error("Failed to fetch news:", err);
                setError("공지사항을 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const newsCategories = {
        notice: {
            title: "공지사항",
            icon: Bell,
            color: "text-blue-400",
            data: noticeData
        },
        update: {
            title: "업데이트",
            icon: Megaphone,
            color: "text-purple-400",
            data: updateData
        },
        event: {
            title: "이벤트",
            icon: Calendar,
            color: "text-pink-400",
            data: eventData
        }
    };

    const currentCategory = newsCategories[activeTab];
    const Icon = currentCategory.icon;
    const currentNews = activeTab === "event" ? currentCategory.data : currentCategory.data.slice(0, 5);

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        return dateStr.split('T')[0].replace(/-/g, '.');
    };

    const isEventEndingSoon = (endDateStr: string) => {
        if (!endDateStr) return false;
        const endDate = new Date(endDateStr);
        const now = new Date();
        const diffTime = endDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 3;
    };

    return (
        <div className="w-full bg-slate-900/50 rounded-2xl border border-slate-800 p-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Megaphone className="text-maple-orange" size={24} />
                    메이플스토리 소식
                </h3>
                <a
                    href={`https://maplestory.nexon.com/News/${activeTab === 'notice' ? 'Notice' : activeTab === 'update' ? 'Update' : 'Event'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-maple-orange transition-colors flex items-center gap-1"
                >
                    더보기
                    <ExternalLink size={12} />
                </a>
            </div>

            <div className="flex gap-2 mb-6 bg-slate-950/50 p-1 rounded-xl">
                {(Object.keys(newsCategories) as Array<keyof typeof newsCategories>).map((category) => {
                    const { title, icon: TabIcon } = newsCategories[category];
                    return (
                        <button
                            key={category}
                            onClick={() => setActiveTab(category)}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${activeTab === category
                                    ? "bg-maple-orange text-white shadow-lg"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                }`}
                        >
                            <TabIcon size={18} />
                            {title}
                        </button>
                    );
                })}
            </div>

            {loading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="animate-spin text-maple-orange" size={32} />
                </div>
            )}

            {error && !loading && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            )}

            {!loading && !error && currentNews.length > 0 && (
                <div className={activeTab === "event" ? "grid grid-cols-1 md:grid-cols-2 gap-2" : "space-y-2"}>
                    {currentNews.map((item, index) => {
                        const title = item.title || item.notice_title || "제목 없음";
                        const isEndingSoon = activeTab === "event" && item.date_event_end && isEventEndingSoon(item.date_event_end);

                        let dateDisplay = "";
                        if (activeTab === "event" && item.date_event_start && item.date_event_end) {
                            const startDate = formatDate(item.date_event_start);
                            const endDate = formatDate(item.date_event_end);
                            dateDisplay = `${startDate} ~ ${endDate}`;
                        } else {
                            dateDisplay = formatDate(item.date || item.date_event_start || "");
                        }

                        return (
                            <a
                                key={item.notice_id || index}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 p-4 bg-slate-950/30 hover:bg-slate-800/50 rounded-xl border border-slate-800/50 hover:border-maple-orange/30 transition-all"
                            >
                                <div className={`shrink-0 ${currentCategory.color}`}>
                                    <Icon size={20} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        {isEndingSoon && (
                                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 animate-pulse">
                                                종료임박!
                                            </span>
                                        )}
                                        <h4 className="text-sm font-medium text-white group-hover:text-maple-orange transition-colors truncate">
                                            {title}
                                        </h4>
                                    </div>
                                    {dateDisplay && (
                                        <p className="text-xs text-slate-500">{dateDisplay}</p>
                                    )}
                                </div>

                                <ChevronRight
                                    size={16}
                                    className="text-slate-600 group-hover:text-maple-orange group-hover:translate-x-1 transition-all shrink-0"
                                />
                            </a>
                        );
                    })}
                </div>
            )}

            {!loading && !error && currentNews.length === 0 && (
                <div className="bg-slate-950/30 rounded-xl p-8 text-center border border-slate-800/50">
                    <Icon className="mx-auto mb-3 text-slate-600" size={40} />
                    <p className="text-slate-400 text-sm">표시할 내용이 없습니다.</p>
                </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-800/50 flex gap-3 flex-wrap text-xs">
                <a
                    href="https://maplestory.nexon.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-maple-orange transition-colors flex items-center gap-1"
                >
                    메이플스토리 공식
                    <ExternalLink size={12} />
                </a>
                <span className="text-slate-700">•</span>
                <a
                    href="https://www.nexon.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-maple-orange transition-colors flex items-center gap-1"
                >
                    넥슨 공식
                    <ExternalLink size={12} />
                </a>
            </div>
        </div>
    );
}
