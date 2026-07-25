'use client';

import { useState, useMemo } from 'react';
import { Clock, Coins, TrendingUp, Info, ChevronDown } from 'lucide-react';

// ─── 스테이지 데이터 ───────────────────────────────────────────────────────────
const STAGES = [
    { id: '1-1', area: 1, gold: { 0: 10,  5: 10,  10: 11,  20: 12,  25: 12,  30: 13  } },
    { id: '1-2', area: 1, gold: { 0: 30,  5: 31,  10: 33,  20: 36,  25: 37,  30: 39  } },
    { id: '1-3', area: 1, gold: { 0: 50,  5: 52,  10: 55,  20: 60,  25: 62,  30: 65  } },
    { id: '1-4', area: 1, gold: { 0: 70,  5: 73,  10: 77,  20: 84,  25: 87,  30: 91  } },
    { id: '1-5', area: 1, gold: { 0: 90,  5: 94,  10: 99,  20: 108, 25: 112, 30: 117 } },
    { id: '1-6', area: 1, gold: { 0: 110, 5: 115, 10: 121, 20: 132, 25: 137, 30: 143 } },
    { id: '1-7', area: 1, gold: { 0: 130, 5: 136, 10: 143, 20: 156, 25: 162, 30: 169 } },
    { id: '1-8', area: 1, gold: { 0: 150, 5: 157, 10: 165, 20: 180, 25: 187, 30: 195 } },
    { id: '1-9', area: 1, gold: { 0: 170, 5: 178, 10: 187, 20: 204, 25: 212, 30: 221 } },
    { id: '2-1', area: 2, gold: { 0: 400, 5: 420, 10: 440, 20: 480, 25: 500, 30: 520 } },
    { id: '2-2', area: 2, gold: { 0: 430, 5: 451, 10: 473, 20: 516, 25: 537, 30: 559 } },
    { id: '2-3', area: 2, gold: { 0: 460, 5: 483, 10: 506, 20: 552, 25: 575, 30: 598 } },
    { id: '2-4', area: 2, gold: { 0: 490, 5: 514, 10: 539, 20: 588, 25: 612, 30: 637 } },
    { id: '2-5', area: 2, gold: { 0: 520, 5: 546, 10: 572, 20: 624, 25: 650, 30: 676 } },
    { id: '2-6', area: 2, gold: { 0: 550, 5: 577, 10: 605, 20: 660, 25: 687, 30: 715 } },
    { id: '2-7', area: 2, gold: { 0: 580, 5: 609, 10: 638, 20: 696, 25: 725, 30: 754 } },
    { id: '2-8', area: 2, gold: { 0: 610, 5: 640, 10: 671, 20: 732, 25: 762, 30: 793 } },
    { id: '2-9', area: 2, gold: { 0: 640, 5: 672, 10: 704, 20: 768, 25: 800, 30: 832 } },
    { id: '3-1', area: 3, gold: { 0: 700, 5: 735, 10: 770, 20: 840, 25: 875, 30: 910 } },
    { id: '3-2', area: 3, gold: { 0: 750, 5: 788, 10: 825, 20: 900, 25: 938, 30: 975 } },
];

const BONUS_OPTIONS = [
    { label: '기본 (0%)', value: 0 },
    { label: '+5%',       value: 5 },
    { label: '+10%',      value: 10 },
    { label: '+20%',      value: 20 },
    { label: '+25%',      value: 25 },
    { label: '+30% 최대', value: 30 },
];

const AREA_COLORS: Record<number, { border: string; bg: string; badge: string; label: string; dot: string }> = {
    1: { border: 'border-sky-700/40',    bg: 'bg-sky-900/20',    badge: 'bg-sky-900/60 text-sky-300 border-sky-700/50',       label: '1지역', dot: 'bg-sky-400'    },
    2: { border: 'border-violet-700/40', bg: 'bg-violet-900/20', badge: 'bg-violet-900/60 text-violet-300 border-violet-700/50', label: '2지역', dot: 'bg-violet-400' },
    3: { border: 'border-amber-700/40',  bg: 'bg-amber-900/20',  badge: 'bg-amber-900/60 text-amber-300 border-amber-700/50',   label: '3지역', dot: 'bg-amber-400'  },
};

function fmtTime(sec: number) {
    if (sec >= 60) {
        const m = Math.floor(sec / 60);
        const s = Math.round(sec % 60);
        return s === 0 ? `${m}분` : `${m}분 ${s}초`;
    }
    return `${Math.round(sec * 10) / 10}초`;
}

export default function UltimaSquadCalculator() {
    const [bonus, setBonus]       = useState<number>(0);
    const [refId, setRefId]       = useState<string>('1-5');
    const [refTime, setRefTime]   = useState<string>('');

    const refStage = STAGES.find(s => s.id === refId)!;
    const refGold  = refStage.gold[bonus as keyof typeof refStage.gold];
    const refSec   = refTime ? parseFloat(refTime) : null;

    // 기준 시간당 골드
    const refGPH = refSec && refSec > 0
        ? (refGold * 60) / (refSec / 3600)
        : null;

    // 각 스테이지의 동일 효율 달성 필요 타임
    const results = useMemo(() => {
        return STAGES.map(stage => {
            const g = stage.gold[bonus as keyof typeof stage.gold];
            const breakeven = refSec && refSec > 0
                ? refSec * (g / refGold)
                : null;
            return { ...stage, goldPerKill: g, breakeven };
        });
    }, [bonus, refGold, refSec]);

    return (
        <div className="space-y-6">

            {/* ─── ① 골드 보너스 ─────────────────────────────── */}
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 shadow-lg">
                <h2 className="font-bold text-slate-100 text-sm mb-3 flex items-center gap-2">
                    <Coins className="w-4 h-4 text-yellow-400" />
                    골드 보너스
                </h2>
                <div className="flex flex-wrap gap-2">
                    {BONUS_OPTIONS.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => setBonus(opt.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border transition-all ${
                                bonus === opt.value
                                    ? 'bg-yellow-500/20 border-yellow-400/60 text-yellow-300 shadow-md'
                                    : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── ② 기준 스테이지 + 타임 입력 ──────────────── */}
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 shadow-lg">
                <h2 className="font-bold text-slate-100 text-sm mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-sky-400" />
                    기준 스테이지 설정
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* 스테이지 선택 */}
                    <div className="relative flex-1">
                        <select
                            value={refId}
                            onChange={e => setRefId(e.target.value)}
                            className="w-full appearance-none bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/30 transition-all pr-8"
                        >
                            {STAGES.map(s => (
                                <option key={s.id} value={s.id}>
                                    스테이지 {s.id} — 1마리당 {s.gold[bonus as keyof typeof s.gold]}G
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>

                    {/* 클리어 타임 입력 */}
                    <div className="flex items-center gap-2 sm:w-44">
                        <input
                            type="number"
                            min="1"
                            placeholder="클리어 타임"
                            value={refTime}
                            onChange={e => setRefTime(e.target.value)}
                            className="w-full bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/30 transition-all"
                        />
                        <span className="text-sm text-slate-400 shrink-0">초</span>
                    </div>
                </div>

                {/* 기준 효율 표시 */}
                {refGPH !== null && refSec !== null && (
                    <div className="mt-3 p-3 bg-sky-950/40 border border-sky-700/40 rounded-xl flex flex-wrap items-center gap-x-4 gap-y-1">
                        <TrendingUp className="w-4 h-4 text-sky-400 shrink-0" />
                        <div className="text-xs sm:text-sm text-slate-300">
                            <span className="font-bold text-white">스테이지 {refId}</span>을
                            <span className="text-sky-300 font-bold mx-1">{refSec}초</span>에 클리어할 때 기준 효율 →
                            <span className="text-emerald-300 font-black ml-1">
                                {refGPH >= 1_000_000
                                    ? (refGPH / 1_000_000).toFixed(2) + 'M'
                                    : Math.round(refGPH).toLocaleString()}G/시간
                            </span>
                        </div>
                        <div className="text-xs sm:text-sm text-slate-300">
                            분당 처치 수 →
                            <span className="text-violet-300 font-black ml-1">
                                {(3600 / refSec).toFixed(1)}마리/분
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* ─── ③ 결과 테이블 ──────────────────────────────── */}
            {refGPH !== null && (
                <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 shadow-lg">
                    <h2 className="font-bold text-slate-100 text-sm mb-1 flex items-center gap-2">
                        <Info className="w-4 h-4 text-slate-400" />
                        동일 효율 달성 필요 클리어 타임
                    </h2>
                    <p className="text-xs text-slate-500 mb-4">
                        각 스테이지를 아래 시간 이내에 클리어하면 <span className="text-emerald-400 font-semibold">스테이지 {refId} ({refSec}초)</span>보다 골드 효율이 높습니다.
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-slate-800/80 border-b border-slate-700 text-slate-300">
                                    <th className="p-2.5 border border-slate-700 font-bold">스테이지</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-slate-400">지역</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-yellow-300 text-right">1마리당 골드</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-emerald-300 text-right">필요 클리어 타임</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-violet-300 text-right">필요 분당 처치 수</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((r, idx) => {
                                    const isRef = r.id === refId;
                                    const areaCol = AREA_COLORS[r.area];
                                    return (
                                        <tr
                                            key={r.id}
                                            className={`border-b border-slate-800 transition-colors ${
                                                isRef
                                                    ? 'bg-sky-950/40 border-b border-sky-900/40'
                                                    : idx % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-950/40'
                                            }`}
                                        >
                                            <td className="p-2.5 border border-slate-700 font-bold text-white">
                                                {r.id}
                                                {isRef && (
                                                    <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-sky-800/60 text-sky-300 rounded border border-sky-700/50 font-semibold">기준</span>
                                                )}
                                            </td>
                                            <td className="p-2.5 border border-slate-700">
                                                <span className={`text-xs px-1.5 py-0.5 rounded border font-semibold ${areaCol.badge}`}>
                                                    {areaCol.label}
                                                </span>
                                            </td>
                                            <td className="p-2.5 border border-slate-700 text-right text-yellow-300 font-semibold">
                                                {r.goldPerKill}G
                                            </td>
                                            <td className="p-2.5 border border-slate-700 text-right font-black">
                                                {isRef ? (
                                                    <span className="text-sky-300">{refSec}초 (기준)</span>
                                                ) : r.breakeven !== null ? (
                                                    <span className={r.breakeven > refSec! ? 'text-emerald-400' : 'text-rose-400'}>
                                                        {fmtTime(r.breakeven)} 이내
                                                    </span>
                                                ) : '-'}
                                            </td>
                                            <td className="p-2.5 border border-slate-700 text-right font-bold text-violet-300">
                                                {isRef && refSec ? (
                                                    <span>{(3600 / refSec).toFixed(1)}마리/분</span>
                                                ) : r.breakeven !== null ? (
                                                    <span>{(3600 / r.breakeven).toFixed(1)}마리/분</span>
                                                ) : '-'}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* 범례 */}
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                            기준보다 여유 있음 (달성하기 쉬움)
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                            기준보다 빠르게 클리어해야 함
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
