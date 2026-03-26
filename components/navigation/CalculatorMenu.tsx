"use client";

import Link from "next/link";
import Image from "next/image";

export default function CalculatorMenu() {
    return (
        <div className="relative group">
            <button
                className="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-indigo-600/90 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-lg shadow-indigo-900/20"
                title="계산기"
            >
                <span className="text-base sm:text-lg">🧮</span>
                <span className="hidden sm:inline">계산기</span>
            </button>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-lg animate-pulse border border-red-400 pointer-events-none z-10 whitespace-nowrap">
                NEW!
            </span>


            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border-2 border-indigo-500/50 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999]">
                <div className="py-2">
                    <Link
                        href="/blog/item-price-tracker-2026"
                        className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 transition-colors border-b border-white/5"
                    >
                        <span className="text-xl">📊</span>
                        <div className="flex flex-col">
                            <span className="font-semibold">아이템 시세 추적</span>
                            <span className="text-xs text-slate-400">매일 업데이트</span>
                        </div>
                    </Link>

                    {/* Jin's Garden Calculator - NEW! */}
                    <Link
                        href="/tools/jin-garden"
                        className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 transition-colors"
                    >
                        <div className="relative w-6 h-6 flex-shrink-0">
                            <Image src="/images/jin-garden-icon.png" alt="Jin Garden" fill className="object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-sm">진의 정원 계산기</span>
                                <span className="bg-red-500 text-white text-[8px] font-bold px-1 py-px rounded animate-pulse shadow-sm">NEW</span>
                            </div>
                            <span className="text-[10px] text-slate-400 mt-0.5">최적 주사위 경로 추천</span>
                        </div>
                    </Link>

                    {/* 1. EXP Calculator */}
                    <Link
                        href="/guide/exp-calculator"
                        className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 transition-colors"
                    >
                        <div className="relative w-6 h-6 flex-shrink-0">
                            <Image src="/images/exp-calculator-icon.png" alt="EXP Calc" fill className="object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">경험치 계산기</span>
                            <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-[10px] text-orange-400 font-medium">루시드 버닝 업데이트!</span>
                                <span className="bg-red-500 text-white text-[8px] font-bold px-1 py-px rounded animate-pulse shadow-sm">NEW</span>
                            </div>
                        </div>
                    </Link>

                    {/* 2. Hunting Field Calculator */}
                    <Link
                        href="/guide/hunting-field-calculator"
                        className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 transition-colors"
                    >
                        <span className="text-xl">🗺️</span>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-sm">추천 사냥터</span>
                                <span className="bg-red-500 text-white text-[8px] font-bold px-1 py-px rounded animate-pulse shadow-sm">NEW</span>
                            </div>
                            <span className="text-[10px] text-slate-400 mt-0.5">레벨별 경험치 효율 TOP 20</span>
                        </div>
                    </Link>

                    {/* 3. Challengers World */}
                    <Link
                        href="/blog/challengers-world-calculator"
                        className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 transition-colors"
                    >
                        <div className="relative w-6 h-6 flex-shrink-0">
                            <Image src="/images/challengers-coin.png" alt="Challenge" fill className="object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">챌린저스 월드</span>
                            <span className="text-[10px] text-slate-400">시즌 3 계산기</span>
                        </div>
                    </Link>



                    {/* 5. Genesis Liberation */}
                    <Link
                        href="/calculator/genesis-liberation"
                        className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 transition-colors"
                    >
                        <div className="relative w-6 h-6 flex-shrink-0">
                            <Image src="/images/genesis-weapon.png" alt="Genesis" fill className="object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">제네시스 해방</span>
                            <span className="text-[10px] text-slate-400">시즌3 계산기</span>
                        </div>
                    </Link>

                    {/* 6. Starforce */}
                    <Link
                        href="/tools/starforce"
                        className="flex items-center gap-3 px-4 py-3 text-white hover:bg-indigo-600/20 transition-colors"
                    >
                        <span className="text-xl">⭐</span>
                        <span className="font-semibold">스타포스 계산기</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
