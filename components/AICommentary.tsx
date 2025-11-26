"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface AICommentaryProps {
    text: string;
}

export default function AICommentary({ text }: AICommentaryProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        setDisplayedText("");
        setIsTyping(true);
        let index = 0;

        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index));
                index++;
            } else {
                setIsTyping(false);
                clearInterval(interval);
            }
        }, 30); // 타이핑 속도 (ms)

        return () => clearInterval(interval);
    }, [text]);

    return (
        <div className="w-full bg-slate-900/80 border border-maple-orange/30 rounded-xl p-4 sm:p-6 relative overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-maple-orange via-yellow-400 to-maple-orange animate-pulse"></div>

            <div className="flex gap-4">
                {/* AI Avatar */}
                <div className="shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-maple-orange/50 overflow-hidden shadow-lg shadow-orange-500/20">
                        <img src="/images/maple-ai-logo.jpg" alt="단풍이" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Text Area */}
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-maple-orange">메이플 AI '단풍이'</span>
                        {isTyping && <span className="w-2 h-2 bg-maple-orange rounded-full animate-ping"></span>}
                    </div>

                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                        {displayedText}
                        {isTyping && <span className="inline-block w-1 h-4 ml-1 bg-maple-orange animate-pulse align-middle"></span>}
                    </p>
                </div>
            </div>

            {/* Decorative Icon */}
            <div className="absolute -bottom-4 -right-4 text-slate-800/50 rotate-12">
                <Sparkles size={80} />
            </div>
        </div>
    );
}
