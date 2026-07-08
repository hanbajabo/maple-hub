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
                            prefetch={false}
                            onClick={close}
                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 active:bg-indigo-600/30 transition-colors border-b border-white/5"
                        >
                            <span className="text-xl flex-shrink-0">📊</span>
                            <div className="flex flex-col min-w-0">
                                <span className="font-semibold text-sm">아이템 시세 추적</span>
                                <span className="text-[10px] text-slate-400 mt-0.5">매일 업데이트</span>
                            </div>
                        </Link>

                        <Link
                            href="/tools/starforce"
                            prefetch={false}
                            onClick={close}
                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 active:bg-indigo-600/30 transition-colors border-b border-white/5"
                        >
                            <span className="text-xl flex-shrink-0">⭐</span>
                            <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-sm">스타포스 기댓값 계산기</span>
                                    <span className="bg-red-500 text-white text-[8px] font-bold px-1 py-px rounded animate-pulse shadow-sm flex-shrink-0">NEW</span>
                                </div>
                                <span className="text-[10px] text-slate-400 mt-0.5">하락 제거 & 복구 최적화</span>
                            </div>
                        </Link>

                        <Link
                            href="/guide/hunting-field-calculator"
                            prefetch={false}
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
                            href="/calculator/challengers-season4"
                            prefetch={false}
                            onClick={close}
                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 active:bg-indigo-600/30 transition-colors border-b border-white/5"
                        >
                            <div className="relative w-6 h-6 flex-shrink-0">
                                <Image src="/images/challengers-icon.png" alt="Challengers World" fill className="object-contain" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-sm">챌린저스 월드 시즌4</span>
                                    <span className="bg-red-500 text-white text-[8px] font-bold px-1 py-px rounded animate-pulse shadow-sm flex-shrink-0">NEW</span>
                                </div>
                                <span className="text-[10px] text-slate-400 mt-0.5">티어 및 코인 계산기</span>
                            </div>
                        </Link>

                        <Link
                            href="/guide/exp-calculator"
                            prefetch={false}
                            onClick={close}
                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 active:bg-indigo-600/30 transition-colors border-b border-white/5"
                        >
                            <div className="relative w-6 h-6 flex-shrink-0">
                                <Image src="/images/exp-calculator-icon.png" alt="EXP Calc" fill className="object-contain" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="font-semibold text-sm">경험치 계산기</span>
                                <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                                    <span className="text-[10px] text-orange-400 font-medium">오버드라이브 업데이트!</span>
                                </div>
                            </div>
                        </Link>

                        <Link
                            href="/calculator/ultima-skill"
                            prefetch={false}
                            onClick={close}
                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 active:bg-indigo-600/30 transition-colors border-b border-white/5"
                        >
                            <span className="text-xl flex-shrink-0 text-center w-6">💊</span>
                            <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-sm">보약스킬 계산기</span>
                                    <span className="bg-red-500 text-white text-[8px] font-bold px-1 py-px rounded animate-pulse shadow-sm flex-shrink-0">NEW</span>
                                </div>
                                <span className="text-[10px] text-slate-400 mt-0.5 truncate">울티마 작전 일지 최적 스킬트리</span>
                            </div>
                        </Link>

                        <Link
                            href="/calculator/genesis-liberation"
                            prefetch={false}
                            onClick={close}
                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 active:bg-indigo-600/30 transition-colors border-b border-white/5"
                        >
                            <div className="relative w-6 h-6 flex-shrink-0">
                                <Image src="/images/genesis-weapon.png" alt="Genesis" fill className="object-contain" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-sm">제네시스 해방</span>
                                    <span className="bg-red-500 text-white text-[8px] font-bold px-1 py-px rounded animate-pulse shadow-sm flex-shrink-0">NEW</span>
                                </div>
                                <span className="text-[10px] text-slate-400 mt-0.5">시즌4 계산기</span>
                            </div>
                        </Link>

                        <Link
                            href="/calculator/blueberry-farm"
                            prefetch={false}
                            onClick={close}
                            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 active:bg-indigo-600/30 transition-colors"
                        >
                            <span className="text-xl flex-shrink-0 text-center w-6">🍇</span>
                            <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-sm">블루베리 농장 계산기</span>
                                    <span className="bg-red-500 text-white text-[8px] font-bold px-1 py-px rounded animate-pulse shadow-sm flex-shrink-0">NEW</span>
                                </div>
                                <span className="text-[10px] text-slate-400 mt-0.5">경험치 획득량 & 레벨업 계산</span>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
