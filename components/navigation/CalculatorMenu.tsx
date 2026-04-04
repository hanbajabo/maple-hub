"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function CalculatorMenu() {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    const close = () => setOpen(false);

    return (
        <div className="relative" ref={containerRef}>
            <button
                className="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-indigo-600/90 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-lg shadow-indigo-900/20"
                title="계산기"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                aria-haspopup="true"
            >
                <span className="text-base sm:text-lg">🧮</span>
                <span className="hidden sm:inline">계산기</span>
            </button>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-lg animate-pulse border border-red-400 pointer-events-none z-10 whitespace-nowrap">
                NEW!
            </span>

            {/* Dropdown Menu */}
            {open && (
                <div
                    className="absolute top-full mt-2 bg-slate-900 border-2 border-indigo-500/50 rounded-xl shadow-2xl z-[9999] max-h-[75vh] overflow-y-auto"
                    style={{
                        right: 0,
                        width: '288px',
                        maxWidth: 'calc(100vw - 8px)',
                    }}
                >
                    <div className="py-2">
                        <Link
                            href="/blog/item-price-tracker-2026"
                            onClick={close}
                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 active:bg-indigo-600/30 transition-colors border-b border-white/5"
                        >
                            <span className="text-xl flex-shrink-0">📊</span>
                            <div className="flex flex-col min-w-0">
                                <span className="font-semibold">아이템 시세 추적</span>
                                <span className="text-xs text-slate-400">매일 업데이트</span>
                            </div>
                        </Link>

                        <Link
                            href="/tools/jin-garden"
                            onClick={close}
                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 active:bg-indigo-600/30 transition-colors border-b border-white/5"
                        >
                            <div className="relative w-6 h-6 flex-shrink-0">
                                <Image src="/images/jin-garden-icon.png" alt="Jin Garden" fill className="object-contain" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-sm">진의 정원 계산기</span>
                                    <span className="bg-red-500 text-white text-[8px] font-bold px-1 py-px rounded animate-pulse shadow-sm flex-shrink-0">NEW</span>
                                </div>
                                <span className="text-[10px] text-slate-400 mt-0.5">최적 주사위 경로 추천</span>
                            </div>
                        </Link>

                        <Link
                            href="/guide/exp-calculator"
                            onClick={close}
                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 active:bg-indigo-600/30 transition-colors border-b border-white/5"
                        >
                            <div className="relative w-6 h-6 flex-shrink-0">
                                <Image src="/images/exp-calculator-icon.png" alt="EXP Calc" fill className="object-contain" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="font-semibold text-sm">경험치 계산기</span>
                                <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                                    <span className="text-[10px] text-orange-400 font-medium">루시드 버닝 업데이트!</span>
                                    <span className="bg-red-500 text-white text-[8px] font-bold px-1 py-px rounded animate-pulse shadow-sm flex-shrink-0">NEW</span>
                                </div>
                            </div>
                        </Link>

                        <Link
                            href="/calculator/lucid-boss"
                            onClick={close}
                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 active:bg-indigo-600/30 transition-colors border-b border-white/5"
                        >
                            <div className="relative w-6 h-6 flex-shrink-0">
                                <Image src="/images/lucid-manage-icon.png" alt="Lucid Boss Calc" fill className="object-contain" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-sm">루시드 보스 계산기</span>
                                    <span className="bg-red-500 text-white text-[8px] font-bold px-1 py-px rounded animate-pulse shadow-sm flex-shrink-0">NEW</span>
                                </div>
                                <span className="text-[10px] text-slate-400 mt-0.5 truncate">[체인지 버닝 : 루시드] 보스 최소컷 계산기</span>
                            </div>
                        </Link>

                        <Link
                            href="/guide/hunting-field-calculator"
                            onClick={close}
                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 active:bg-indigo-600/30 transition-colors border-b border-white/5"
                        >
                            <span className="text-xl flex-shrink-0">🗺️</span>
                            <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-sm">추천 사냥터</span>
                                    <span className="bg-red-500 text-white text-[8px] font-bold px-1 py-px rounded animate-pulse shadow-sm flex-shrink-0">NEW</span>
                                </div>
                                <span className="text-[10px] text-slate-400 mt-0.5">레벨별 경험치 효율 TOP 20</span>
                            </div>
                        </Link>

                        <Link
                            href="/calculator/genesis-liberation"
                            onClick={close}
                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 active:bg-indigo-600/30 transition-colors border-b border-white/5"
                        >
                            <div className="relative w-6 h-6 flex-shrink-0">
                                <Image src="/images/genesis-weapon.png" alt="Genesis" fill className="object-contain" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="font-semibold text-sm">제네시스 해방</span>
                                <span className="text-[10px] text-slate-400">시즌3 계산기</span>
                            </div>
                        </Link>

                        <Link
                            href="/tools/starforce"
                            onClick={close}
                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 active:bg-indigo-600/30 transition-colors"
                        >
                            <span className="text-xl flex-shrink-0">⭐</span>
                            <span className="font-semibold">스타포스 계산기</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
