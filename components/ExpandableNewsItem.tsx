'use client';

import { useState } from 'react';
import { ChevronDown, ExternalLink, Loader2 } from 'lucide-react';
import axios from 'axios';
// @ts-ignore
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

interface ExpandableNewsItemProps {
    title: string;
    url: string;
    date: string;
    type: string;
}

export default function ExpandableNewsItem({ title, url, date, type }: ExpandableNewsItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        if (isOpen) {
            setIsOpen(false);
            return;
        }

        setIsOpen(true);

        if (!summary) {
            setLoading(true);
            try {
                const res = await axios.get(`/api/news-summary?url=${encodeURIComponent(url)}&type=${type}`);
                if (res.data.success) {
                    setSummary(res.data.data.summary);
                }
            } catch (err) {
                console.error(err);
                setSummary('요약을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors">
            <div
                onClick={handleToggle}
                className="flex items-center justify-between p-4 cursor-pointer group select-none"
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-slate-500 text-sm whitespace-nowrap">{date.split('T')[0]}</span>
                    <span className={`text-slate-300 group-hover:text-white truncate transition-colors ${isOpen ? 'font-bold text-white' : ''}`}>
                        {title}
                    </span>
                </div>
                <ChevronDown size={16} className={`text-slate-600 group-hover:text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Expanded Content */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 pt-0 pl-4 md:pl-16 pr-4 pb-6">
                    {loading ? (
                        <div className="flex items-center gap-2 text-slate-400 py-4 bg-slate-950/30 rounded-lg px-4 border border-slate-800/50">
                            <Loader2 className="animate-spin text-maple-orange" size={16} />
                            <span className="text-sm">단풍이가 내용을 요약하고 있어요... 🍁</span>
                        </div>
                    ) : (
                        <div className="prose prose-invert prose-sm max-w-none bg-slate-950/50 p-4 rounded-xl border border-slate-800 shadow-inner">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h3: ({ node, ...props }: any) => <h3 className="text-lg font-bold text-indigo-300 mt-4 mb-2 flex items-center gap-2" {...props} />,
                                    h4: ({ node, ...props }: any) => <h4 className="text-slate-200 font-semibold mt-3 mb-1" {...props} />,
                                    p: ({ node, ...props }: any) => <p className="text-slate-300 leading-relaxed mb-2 last:mb-0" {...props} />,
                                    li: ({ node, ...props }: any) => <li className="text-slate-300 list-disc ml-4 mb-1" {...props} />,
                                    strong: ({ node, ...props }: any) => <strong className="text-indigo-200" {...props} />
                                }}
                            >
                                {summary || ''}
                            </ReactMarkdown>

                            <div className="mt-4 flex justify-end border-t border-slate-800/50 pt-3">
                                <Link
                                    href={url}
                                    target="_blank"
                                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-400 transition-colors"
                                >
                                    <ExternalLink size={12} />
                                    <span>원문 보러가기</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
