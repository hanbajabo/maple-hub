"use client";

import { useState, useEffect, useMemo } from "react";
import { Sparkles } from "lucide-react";

interface AICommentaryProps {
    text: string;
}

interface Segment {
    type: 'text' | 'bold';
    content: string;
}

// Helper: Parse a single line into segments (text vs bold)
const parseLine = (line: string): Segment[] => {
    const segments: Segment[] = [];
    // Split by bold tags (**...** or <b>...</b>)
    const parts = line.split(/(\*\*.*?\*\*|<b>.*?<\/b>)/g);

    for (const part of parts) {
        if (part.startsWith('**') && part.endsWith('**')) {
            segments.push({ type: 'bold', content: part.slice(2, -2) });
        } else if (part.startsWith('<b>') && part.endsWith('</b>')) {
            segments.push({ type: 'bold', content: part.slice(3, -4) });
        } else if (part.length > 0) {
            segments.push({ type: 'text', content: part });
        }
    }
    return segments;
};

// Helper: Calculate total visible content length (excluding tags)
const calculateContentLength = (text: string): number => {
    if (!text) return 0;
    let len = 0;
    const lines = text.split('\n');
    for (const line of lines) {
        if (line.includes('---')) continue; // Separator
        if (line.startsWith('###')) {
            len += line.replace('###', '').trim().length;
        } else if (line.trim()) {
            const segments = parseLine(line);
            for (const seg of segments) len += seg.content.length;
        }
    }
    return len;
};

// Component: Renders text with typing effect based on visibleCount
const TypingText = ({ text, visibleCount, headerColor = "text-maple-orange" }: { text: string, visibleCount: number, headerColor?: string }) => {
    const lines = text.split('\n');
    let currentCount = 0;

    return (
        <>
            {lines.map((line, i) => {
                // If we've already rendered enough characters, stop rendering future lines
                // But we still need to process empty lines if they are "before" the cursor?
                // Actually, empty lines have 0 length, so they don't consume visibleCount.
                // We should render them if the previous lines were fully rendered.

                // Optimization: If currentCount is already way past visibleCount, we can stop.
                // But we need to be careful about empty lines appearing "too early".
                // Simple rule: If currentCount > visibleCount, we stop rendering *content*, 
                // but we might need to stop rendering *lines* entirely to avoid showing empty space below cursor.
                if (currentCount > visibleCount) return null;

                if (!line.trim()) {
                    return <br key={i} />;
                }

                if (line.includes('---')) return null;

                if (line.startsWith('###')) {
                    const content = line.replace('###', '').trim();
                    const len = content.length;
                    // Calculate how many chars of this header to show
                    const showLen = Math.max(0, Math.min(len, visibleCount - currentCount));
                    currentCount += len;

                    if (showLen === 0) return null;

                    return (
                        <h3 key={i} className={`text-sm sm:text-base font-bold ${headerColor} mt-2 mb-1`}>
                            {content.slice(0, showLen)}
                        </h3>
                    );
                }

                const segments = parseLine(line);
                const renderedSegments = segments.map((seg, j) => {
                    const len = seg.content.length;
                    const showLen = Math.max(0, Math.min(len, visibleCount - currentCount));
                    currentCount += len;

                    if (showLen === 0) return null;

                    const textSlice = seg.content.slice(0, showLen);

                    if (seg.type === 'bold') {
                        return <strong key={j} className="text-yellow-300 font-bold">{textSlice}</strong>;
                    }
                    return <span key={j}>{textSlice}</span>;
                });

                // If no segments were rendered (because showLen was 0 for all), don't render the paragraph
                // But wait, currentCount is updated inside map.
                // We need to check if *any* content was rendered for this line?
                // Actually, if visibleCount falls exactly at the start of this line, showLen will be 0.
                // The paragraph will be empty.
                const hasContent = renderedSegments.some(s => s !== null);
                if (!hasContent) return null;

                return (
                    <p key={i} className="mb-1 last:mb-0">
                        {renderedSegments}
                    </p>
                );
            })}
        </>
    );
};

export default function AICommentary({ text }: AICommentaryProps) {
    const [visibleCount, setVisibleCount] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    // Split text into two parts (Danpung-i and Hexa)
    const parts = useMemo(() => text.split('\n---\n'), [text]);
    const text1 = parts[0] || "";
    const text2 = parts[1] || "";

    // Calculate lengths
    const len1 = useMemo(() => calculateContentLength(text1), [text1]);
    const len2 = useMemo(() => calculateContentLength(text2), [text2]);
    const totalLen = len1 + len2;

    useEffect(() => {
        setVisibleCount(0);
        setIsTyping(true);
        let current = 0;

        const interval = setInterval(() => {
            if (current < totalLen) {
                current++;
                setVisibleCount(current);
            } else {
                setIsTyping(false);
                clearInterval(interval);
            }
        }, 15); // Typing speed

        return () => clearInterval(interval);
    }, [totalLen]); // Reset when total length changes (i.e., text changes)

    return (
        <div className="w-full bg-slate-900/90 border border-maple-orange/30 rounded-xl p-4 sm:p-6 relative overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-maple-orange via-yellow-400 to-maple-orange animate-pulse"></div>

            {/* First AI: Danpung-i */}
            <div className="flex gap-4">
                <div className="shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-maple-orange/50 overflow-hidden shadow-lg shadow-orange-500/20 bg-slate-800">
                        <img src="/images/maple-ai-logo.jpg" alt="단풍이" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-maple-orange">메이플 AI '단풍이'</span>
                        {isTyping && visibleCount < len1 && <span className="w-2 h-2 bg-maple-orange rounded-full animate-ping"></span>}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium min-h-[1.5rem]">
                        <TypingText text={text1} visibleCount={visibleCount} />
                        {isTyping && visibleCount < len1 && <span className="inline-block w-1 h-4 ml-1 bg-maple-orange animate-pulse align-middle"></span>}
                    </div>
                </div>
            </div>

            {/* Second AI: Evolutionary AI (Hexa) */}
            {text2 && visibleCount >= len1 && (
                <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500 border-t border-white/10 pt-6">
                    <div className="shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-cyan-400/50 overflow-hidden shadow-lg shadow-cyan-500/20 bg-slate-800">
                            <img src="/images/ai-evolution.jpg" alt="진화형 AI" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-cyan-400">진화형 AI '헥사'</span>
                            {isTyping && <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium min-h-[1.5rem]">
                            <TypingText text={text2} visibleCount={Math.max(0, visibleCount - len1)} headerColor="text-cyan-400" />
                            {isTyping && <span className="inline-block w-1 h-4 ml-1 bg-cyan-400 animate-pulse align-middle"></span>}
                        </div>
                    </div>
                </div>
            )}

            {/* Decorative Icon */}
            <div className="absolute -bottom-4 -right-4 text-slate-800/50 rotate-12">
                <Sparkles size={80} />
            </div>
        </div>
    );
}
