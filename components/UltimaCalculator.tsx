"use client";

import React, { useState } from 'react';
import { Calculator, HelpCircle } from 'lucide-react';

interface UltimaCalculatorProps {
    mapSize: string; // '5×5' | '10×10' | '15×15'
    ceiling: string;
    color: string; // 'green' | 'blue' | 'purple'
}

export default function UltimaCalculator({ mapSize, ceiling, color }: UltimaCalculatorProps) {
    const [specialBomb, setSpecialBomb] = useState(0);
    const [bomb, setBomb] = useState(0);
    const [laserX, setLaserX] = useState(0);
    const [laserY, setLaserY] = useState(0);
    const [powder, setPowder] = useState(0);
    const [goldenKey, setGoldenKey] = useState(0);

    const totalCells = mapSize === '5×5' ? 25 : mapSize === '10×10' ? 100 : 225;
    const sideLength = mapSize === '5×5' ? 5 : mapSize === '10×10' ? 10 : 15;
    const isPowderAvailable = mapSize !== '5×5';

    // Calculate cleared cells
    const clearedBySpecialBomb = specialBomb * 9;
    const clearedByBomb = bomb * 9;
    const clearedByLaserX = laserX * sideLength;
    const clearedByLaserY = laserY * sideLength;
    const clearedByPowder = powder * 9;

    let totalCleared = clearedBySpecialBomb + clearedByBomb + clearedByLaserX + clearedByLaserY + clearedByPowder;
    
    if (goldenKey > 0) {
        totalCleared = totalCells;
    }

    const remainingCells = Math.max(0, totalCells - totalCleared);
    const expected1 = remainingCells * 500;
    const expected10 = expected1 * 10;
    const dailyRecommended = Math.round(expected10 / 28);

    const formatNumber = (num: number) => num.toLocaleString('ko-KR');

    // Color map for safelisting tailwind classes just in case
    const colorMap = {
        green: {
            text: 'text-green-300',
            bg: 'bg-green-900/40',
            border: 'border-green-900/30',
            icon: 'text-green-400',
            btnBg: 'bg-green-900/60',
            btnHover: 'hover:bg-green-800/80',
        },
        blue: {
            text: 'text-blue-300',
            bg: 'bg-blue-900/40',
            border: 'border-blue-900/30',
            icon: 'text-blue-400',
            btnBg: 'bg-blue-900/60',
            btnHover: 'hover:bg-blue-800/80',
        },
        purple: {
            text: 'text-purple-300',
            bg: 'bg-purple-900/40',
            border: 'border-purple-900/30',
            icon: 'text-purple-400',
            btnBg: 'bg-purple-900/60',
            btnHover: 'hover:bg-purple-800/80',
        }
    };
    
    const theme = colorMap[color as keyof typeof colorMap] || colorMap.blue;

    const InputRow = ({ label, emoji, value, setter, desc, disabled = false }: any) => (
        <div className={`flex items-center justify-between p-2 rounded-lg bg-slate-800/40 border border-slate-700/50 ${disabled ? 'opacity-50' : ''}`}>
            <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-200">{emoji} {label}</span>
                <span className="text-[10px] text-slate-400">{desc}</span>
            </div>
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => setter(Math.max(0, value - 1))}
                    disabled={disabled}
                    className="w-6 h-6 rounded bg-slate-700 text-white flex items-center justify-center hover:bg-slate-600 disabled:opacity-50"
                >-</button>
                <span className="w-6 text-center text-xs font-bold text-white">{value}</span>
                <button 
                    onClick={() => setter(value + 1)}
                    disabled={disabled}
                    className={`w-6 h-6 rounded ${theme.btnBg} text-white flex items-center justify-center ${theme.btnHover} disabled:opacity-50`}
                >+</button>
            </div>
        </div>
    );

    return (
        <div>
            <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <Calculator className={`w-4 h-4 ${theme.icon}`} /> 사냥량 분석 (실시간 계산기)
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-3">
                {/* 왼쪽: 계산 결과 패널 */}
                <div className="grid grid-cols-1 gap-2 text-center text-xs h-fit">
                    <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50 flex flex-col justify-center">
                        <p className="text-slate-300 mb-1">1판 순수 천장 (유물 0개)</p>
                        <p className="font-black text-sm text-slate-400 line-through">{ceiling}</p>
                    </div>
                    <div className={`bg-slate-800/80 rounded-xl p-4 border border-slate-600 flex flex-col justify-center shadow-lg relative overflow-hidden`}>
                        <div className={`absolute top-0 left-0 w-1 h-full ${theme.bg.replace('/40', '')}`}></div>
                        <p className="text-slate-200 font-bold mb-1">1판 실제 예상 (유물 반영)</p>
                        <p className={`font-black text-xl ${theme.text}`}>약 {formatNumber(expected1)}마리</p>
                    </div>
                    <div className="bg-gradient-to-r from-amber-950/80 to-amber-900/50 rounded-xl p-4 border border-amber-500/50 flex flex-col justify-center shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-1 opacity-20 group-hover:opacity-100 transition-opacity">
                             <HelpCircle className="w-4 h-4 text-amber-300" />
                        </div>
                        <p className="text-amber-200 font-black mb-1">⭐ 하루 권장 사냥량</p>
                        <p className="font-black text-xl text-amber-400">하루 약 {formatNumber(dailyRecommended)}마리</p>
                        <p className="text-amber-200/60 text-[9px] mt-1">※ 10판 완주 총 사냥량 ÷ 28일</p>
                    </div>
                </div>

                {/* 오른쪽: 유물 입력 패널 */}
                <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-700/50 space-y-1.5 flex flex-col">
                    <p className="text-[11px] text-slate-300 mb-1 font-bold">발견/사용할 유물 개수 입력 (1판 기준)</p>
                    
                    <InputRow label="울티마 스페셜 봄" emoji="✨" value={specialBomb} setter={setSpecialBomb} desc="사용시 9칸 탐색" />
                    <InputRow label="울티마 봄" emoji="💣" value={bomb} setter={setBomb} desc="사용시 9칸 탐색" />
                    <InputRow label="울티마 레이저 X" emoji="⚡" value={laserX} setter={setLaserX} desc={`가로 한 줄 (${sideLength}칸) 탐색`} />
                    <InputRow label="울티마 레이저 Y" emoji="⚡" value={laserY} setter={setLaserY} desc={`세로 한 줄 (${sideLength}칸) 탐색`} />
                    
                    <InputRow 
                        label="고대의 화약통" 
                        emoji="💥" 
                        value={powder} 
                        setter={setPowder} 
                        desc={isPowderAvailable ? "발견 즉시 9칸 탐색" : "이 지도에선 등장하지 않음"} 
                        disabled={!isPowderAvailable}
                    />
                    <InputRow label="고대의 황금 열쇠" emoji="🔑" value={goldenKey} setter={setGoldenKey} desc="발견 즉시 모든 칸 탐색!" />
                </div>
            </div>
            
            <p className="text-slate-400 text-[10px] mt-2 leading-relaxed">
                ※ 위 사냥량은 유물 사용 시 겹치는 칸이 없다고 가정한 가장 이상적인 최소 사냥량입니다. <br/>
                ※ 실제 플레이 시 유물이 탐색한 칸이 겹치면 사냥량이 늘어날 수 있습니다.
            </p>
        </div>
    );
}
