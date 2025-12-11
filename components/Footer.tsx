import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full bg-slate-950 border-t border-slate-900 py-8 px-4 mt-auto">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-400">Maple AI</span>
                        <span className="w-px h-3 bg-slate-700"></span>
                        <span>Copyright © 2024 Maple AI. All rights reserved.</span>
                    </div>
                    <p className="text-xs text-slate-600 text-center md:text-left">
                        Data based on NEXON Open API.
                        <br />
                        메이플 AI는 넥슨 코리아와 관련이 없으며, 제공되는 정보의 정확성을 보증하지 않습니다.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/about" className="hover:text-slate-300 transition-colors">
                        소개
                    </Link>
                    <Link href="/privacy" className="hover:text-slate-300 transition-colors">
                        개인정보처리방침
                    </Link>
                    <Link href="/terms" className="hover:text-slate-300 transition-colors">
                        이용약관
                    </Link>
                    <Link href="/contact" className="hover:text-slate-300 transition-colors">
                        문의하기
                    </Link>
                </div>
            </div>
        </footer>
    );
}
