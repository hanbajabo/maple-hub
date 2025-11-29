'use client';
import React from 'react';
import { UpgradeData } from './GameData';

interface ShopUIProps {
    gold: number;
    shopItems: UpgradeData[];
    onBuy: (upgrade: UpgradeData, index: number) => void;
    onReroll: () => void;
    level: number;
    exp: number;
    maxExp: number;
    onBuyExp: () => void;
}

export default function ShopUI({ gold, shopItems, onBuy, onReroll, level, exp, maxExp, onBuyExp }: ShopUIProps) {
    return (
        <div className="w-full max-w-[800px] bg-slate-800 border-t-4 border-slate-600 p-4 flex flex-col gap-4">
            {/* Info Bar */}
            <div className="flex justify-between items-center bg-slate-900 p-2 rounded-lg border border-slate-700">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-400 text-xl">💰</span>
                        <span className="text-white font-bold text-xl">{gold.toLocaleString()} 메소</span>
                    </div>
                    <div className="flex items-center gap-2 border-l border-slate-600 pl-4">
                        <span className="text-blue-400 font-bold">Lv.{level}</span>
                        <div className="w-32 h-4 bg-slate-700 rounded-full overflow-hidden relative">
                            <div
                                className="h-full bg-blue-500 transition-all duration-300"
                                style={{ width: `${Math.min(100, (exp / maxExp) * 100)}%` }}
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold drop-shadow-md">
                                {exp} / {maxExp}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onBuyExp}
                        disabled={gold < 4 || level >= 9}
                        className={`
                            px-3 py-1 rounded text-xs font-bold transition-all
                            ${gold >= 4 && level < 9
                                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                                : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
                        `}
                    >
                        경험치 구매 (4G)
                    </button>
                    <div className="text-slate-400 text-sm flex items-center">
                        D키를 눌러 리롤!
                    </div>
                </div>
            </div>

            {/* Shop Slots */}
            <div className="flex gap-2 justify-between">
                {shopItems.map((item, idx) => (
                    <button
                        key={`${item.id}-${idx}`}
                        onClick={() => onBuy(item, idx)}
                        disabled={gold < item.cost}
                        className={`
                            relative flex-1 h-40 bg-slate-700 rounded-lg border-2 
                            flex flex-col items-center justify-center gap-2 transition-all
                            hover:bg-slate-600 active:scale-95
                            ${gold < item.cost ? 'opacity-50 cursor-not-allowed border-slate-600' : 'cursor-pointer border-slate-500 hover:border-yellow-400'}
                        `}
                    >
                        {/* Tier Badge */}
                        <div className={`absolute top-1 left-1 px-1.5 rounded text-[10px] font-bold
                            ${item.tier === 1 ? 'bg-slate-500 text-white' : ''}
                            ${item.tier === 2 ? 'bg-green-600 text-white' : ''}
                            ${item.tier === 3 ? 'bg-blue-600 text-white' : ''}
                        `}>
                            {item.tier}티어
                        </div>

                        {/* Icon */}
                        <div className="text-4xl mb-1">{item.color}</div>

                        {/* Name & Desc */}
                        <div className="text-center px-2">
                            <div className="text-white font-bold text-sm mb-1">{item.name}</div>
                            <div className="text-slate-300 text-xs break-keep leading-tight">{item.description}</div>
                        </div>

                        {/* Cost */}
                        <div className="mt-2 text-yellow-400 text-sm font-bold">{item.cost} 메소</div>
                    </button>
                ))}
            </div>

            {/* Reroll Button */}
            <button
                onClick={onReroll}
                disabled={gold < 2}
                className={`
                    w-full py-3 rounded-lg font-bold text-lg transition-all
                    flex items-center justify-center gap-2
                    ${gold >= 2
                        ? 'bg-yellow-600 hover:bg-yellow-500 text-white shadow-lg shadow-yellow-600/20'
                        : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
                `}
            >
                <span>🔄 상점 새로고침</span>
                <span className="text-sm opacity-80">(2 메소)</span>
            </button>
        </div>
    );
}
