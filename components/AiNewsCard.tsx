import Link from 'next/link';
import { Bot, ExternalLink, Calendar, ChevronRight } from 'lucide-react';
import React from 'react';

interface AiNewsCardProps {
    title: string;
    summary: string;
    url: string;
    date: string;
}

// 텍스트 내의 **굵은 글씨**를 <span>으로 변환하는 함수
const parseBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="text-maple-orange font-bold font-custom">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

export default function AiNewsCard({ title, summary, url, date }: AiNewsCardProps) {
    // 마크다운 파싱 및 그룹화 로직
    const sections = React.useMemo(() => {
        const lines = summary.split('\n');
        const groups: { title: string; cards: { title: string; content: string[] }[] }[] = [];

        let currentGroup = { title: '📌 요약 내용', cards: [] as { title: string; content: string[] }[] };
        let currentCard = { title: '', content: [] as string[] };

        lines.forEach(line => {
            const trimmed = line.trim();
            if (!trimmed) return;

            // 1. 대주제 (###)
            if (trimmed.startsWith('### ')) {
                // 이전 카드 저장
                if (currentCard.content.length > 0 || currentCard.title) {
                    currentGroup.cards.push(currentCard);
                }
                // 이전 그룹 저장
                if (currentGroup.cards.length > 0) {
                    groups.push(currentGroup);
                }

                // 새 그룹 시작
                currentGroup = { title: trimmed.replace(/^###\s+/, ''), cards: [] };
                currentCard = { title: '', content: [] };
            }
            // 2. 소주제 (####) -> 카드 제목
            else if (trimmed.startsWith('#### ')) {
                // 이전 카드 저장
                if (currentCard.content.length > 0 || currentCard.title) {
                    currentGroup.cards.push(currentCard);
                }
                currentCard = { title: trimmed.replace(/^####\s+/, ''), content: [] };
            }
            // 3. 리스트 아이템 또는 일반 텍스트
            else {
                currentCard.content.push(trimmed);
            }
        });

        // 마지막 데이터 처리
        if (currentCard.content.length > 0 || currentCard.title) {
            currentGroup.cards.push(currentCard);
        }
        if (currentGroup.cards.length > 0) {
            groups.push(currentGroup);
        }

        return groups;
    }, [summary]);

    return (
        <div className="w-full max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl hover:border-maple-orange/50 transition-all duration-300">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800/80">
                <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-wide">
                        <span className="text-[14px]">🍁</span>
                        단풍이 요약
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                        <Calendar size={14} />
                        {date}
                    </span>
                </div>

                <h3 className="text-xl sm:text-3xl font-bold text-white leading-tight tracking-tight">
                    {title}
                </h3>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-8 bg-slate-900/50">
                <div className="space-y-8 sm:space-y-12">
                    {sections.map((group, gIdx) => (
                        <div key={gIdx} className="animate-fade-in-up" style={{ animationDelay: `${gIdx * 100}ms` }}>
                            {/* 대주제 헤더 (이모지와 제목) */}
                            <h4 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-maple-orange to-yellow-400 mb-4 sm:mb-6 flex items-center gap-2 border-b border-slate-700/50 pb-2 sm:pb-3">
                                {group.title}
                            </h4>

                            {/* 카드 그리드 */}
                            <div className="grid gap-4 sm:gap-6">
                                {group.cards.map((card, cIdx) => (
                                    <div key={cIdx} className="bg-slate-800/40 rounded-xl p-4 sm:p-6 border border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600 transition-all group">
                                        {/* 소주제 (카드 제목) */}
                                        {card.title && (
                                            <h5 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-start gap-2">
                                                <ChevronRight className="text-indigo-400 mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" size={18} />
                                                {card.title}
                                            </h5>
                                        )}

                                        {/* 내용 리스트 */}
                                        <div className="space-y-2 sm:space-y-3 pl-1 sm:pl-7">
                                            {card.content.map((line, lIdx) => {
                                                const isList = line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ');
                                                const cleanLine = isList ? line.replace(/^[-*•]\s+/, '') : line;
                                                const isDate = cleanLine.includes('기간:') || cleanLine.includes('~');

                                                if (isDate) {
                                                    return (
                                                        <div key={lIdx} className="inline-block bg-slate-900/50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-slate-700 text-slate-300 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                                                            📅 {parseBold(cleanLine)}
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div key={lIdx} className={`${isList ? 'mb-1 sm:mb-1.5' : 'mb-2 sm:mb-3'}`}>
                                                        <p className="text-slate-300 leading-relaxed text-[15px] sm:text-[16px]">
                                                            {parseBold(cleanLine)}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-950/50 border-t border-slate-800 flex justify-end">
                <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors font-medium"
                >
                    <span>원문 전체 보기</span>
                    <ExternalLink size={14} />
                </Link>
            </div>
        </div>
    );
}
