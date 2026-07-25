'use client';

import { useState, useMemo } from 'react';
import { Clock, Coins, TrendingUp, Trophy, ChevronDown, ChevronUp, Info } from 'lucide-react';

// ─── 스테이지 데이터 ───────────────────────────────────────────────────────────
const STAGES = [
    // 1지역
    { id: '1-1', area: 1, gold: { 0: 10, 5: 10, 10: 11, 20: 12, 25: 12, 30: 13 } },
    { id: '1-2', area: 1, gold: { 0: 30, 5: 31, 10: 33, 20: 36, 25: 37, 30: 39 } },
    { id: '1-3', area: 1, gold: { 0: 50, 5: 52, 10: 55, 20: 60, 25: 62, 30: 65 } },
    { id: '1-4', area: 1, gold: { 0: 70, 5: 73, 10: 77, 20: 84, 25: 87, 30: 91 } },
    { id: '1-5', area: 1, gold: { 0: 90, 5: 94, 10: 99, 20: 108, 25: 112, 30: 117 } },
    { id: '1-6', area: 1, gold: { 0: 110, 5: 115, 10: 121, 20: 132, 25: 137, 30: 143 } },
    { id: '1-7', area: 1, gold: { 0: 130, 5: 136, 10: 143, 20: 156, 25: 162, 30: 169 } },
    { id: '1-8', area: 1, gold: { 0: 150, 5: 157, 10: 165, 20: 180, 25: 187, 30: 195 } },
    { id: '1-9', area: 1, gold: { 0: 170, 5: 178, 10: 187, 20: 204, 25: 212, 30: 221 } },
    // 2지역
    { id: '2-1', area: 2, gold: { 0: 400, 5: 420, 10: 440, 20: 480, 25: 500, 30: 520 } },
    { id: '2-2', area: 2, gold: { 0: 430, 5: 451, 10: 473, 20: 516, 25: 537, 30: 559 } },
    { id: '2-3', area: 2, gold: { 0: 460, 5: 483, 10: 506, 20: 552, 25: 575, 30: 598 } },
    { id: '2-4', area: 2, gold: { 0: 490, 5: 514, 10: 539, 20: 588, 25: 612, 30: 637 } },
    { id: '2-5', area: 2, gold: { 0: 520, 5: 546, 10: 572, 20: 624, 25: 650, 30: 676 } },
    { id: '2-6', area: 2, gold: { 0: 550, 5: 577, 10: 605, 20: 660, 25: 687, 30: 715 } },
    { id: '2-7', area: 2, gold: { 0: 580, 5: 609, 10: 638, 20: 696, 25: 725, 30: 754 } },
    { id: '2-8', area: 2, gold: { 0: 610, 5: 640, 10: 671, 20: 732, 25: 762, 30: 793 } },
    { id: '2-9', area: 2, gold: { 0: 640, 5: 672, 10: 704, 20: 768, 25: 800, 30: 832 } },
    // 3지역
    { id: '3-1', area: 3, gold: { 0: 700, 5: 735, 10: 770, 20: 840, 25: 875, 30: 910 } },
    { id: '3-2', area: 3, gold: { 0: 750, 5: 788, 10: 825, 20: 900, 25: 938, 30: 975 } },
];

const BONUS_OPTIONS = [
    { label: '기본 (0%)', value: 0 },
    { label: '+5%', value: 5 },
    { label: '+10%', value: 10 },
    { label: '+20%', value: 20 },
    { label: '+25%', value: 25 },
    { label: '+30% (최대)', value: 30 },
];

const MONSTERS_PER_STAGE = 60;

const AREA_COLORS = {
    1: { border: 'border-sky-700/40', bg: 'bg-sky-900/20', badge: 'bg-sky-900/60 text-sky-300 border-sky-700/50', label: '1지역', dot: 'bg-sky-400' },
    2: { border: 'border-violet-700/40', bg: 'bg-violet-900/20', badge: 'bg-violet-900/60 text-violet-300 border-violet-700/50', label: '2지역', dot: 'bg-violet-400' },
    3: { border: 'border-amber-700/40', bg: 'bg-amber-900/20', badge: 'bg-amber-900/60 text-amber-300 border-amber-700/50', label: '3지역', dot: 'bg-amber-400' },
};

function formatGold(n: number) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
    return n.toFixed(0);
}

export default function UltimaSquadCalculator() {
    const [bonus, setBonus] = useState<number>(0);
    const [times, setTimes] = useState<Record<string, string>>({});
    const [showAll, setShowAll] = useState(false);

    // 클리어 타임 업데이트
    const handleTime = (stageId: string, val: string) => {
        setTimes(prev => ({ ...prev, [stageId]: val }));
    };

    // 계산 결과
    const results = useMemo(() => {
        return STAGES.map(stage => {
            const goldPerKill = stage.gold[bonus as keyof typeof stage.gold];
            const totalGoldPerRun = goldPerKill * MONSTERS_PER_STAGE;
            const rawTime = times[stage.id];
            const seconds = rawTime ? parseFloat(rawTime) : null;
            const goldPerHour = seconds && seconds > 0 ? Math.round(totalGoldPerRun / (seconds / 3600)) : null;
            const runsPerHour = seconds && seconds > 0 ? 3600 / seconds : null;
            return {
                ...stage,
                goldPerKill,
                totalGoldPerRun,
                seconds,
                goldPerHour,
                runsPerHour,
            };
        });
    }, [bonus, times]);

    // 골드/시간 기준 랭킹 (입력된 것만)
    const ranked = useMemo(() => {
        return [...results]
            .filter(r => r.goldPerHour !== null)
            .sort((a, b) => (b.goldPerHour ?? 0) - (a.goldPerHour ?? 0));
    }, [results]);

    const best = ranked[0] ?? null;

    const filledCount = results.filter(r => r.seconds !== null).length;

    return (
        <div className="space-y-8">

            {/* ─── 보너스 선택 ──────────────────────────────── */}
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 shadow-lg">
                <h2 className="font-bold text-slate-100 text-base mb-3 flex items-center gap-2">
                    <Coins className="w-4 h-4 text-yellow-400" />
                    골드 보너스 설정
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
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    각 스테이지 몬스터 수: <span className="text-slate-300 font-semibold">60마리</span> 고정
                </p>
            </div>

            {/* ─── 클리어 타임 입력 ─────────────────────────── */}
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-slate-100 text-base flex items-center gap-2">
                        <Clock className="w-4 h-4 text-sky-400" />
                        스테이지별 클리어 타임 입력
                    </h2>
                    <span className="text-xs text-slate-500 bg-slate-800/60 px-2 py-1 rounded-lg border border-slate-700/40">
                        {filledCount} / {STAGES.length} 입력됨
                    </span>
                </div>

                <div className="space-y-4">
                    {([1, 2, 3] as const).map(area => {
                        const areaStages = results.filter(r => r.area === area);
                        const col = AREA_COLORS[area];
                        return (
                            <div key={area} className={`border ${col.border} rounded-xl overflow-hidden`}>
                                <div className={`${col.bg} px-4 py-2 flex items-center gap-2 border-b ${col.border}`}>
                                    <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                                    <span className="text-sm font-bold text-slate-200">{col.label}</span>
                                    <span className="text-xs text-slate-500 ml-1">몬스터 {areaStages.length * MONSTERS_PER_STAGE}마리 (스테이지당 {MONSTERS_PER_STAGE}마리)</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
                                    {areaStages.map(stage => (
                                        <div key={stage.id} className="bg-slate-900/60 rounded-xl border border-slate-700/40 p-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-bold text-white">스테이지 {stage.id}</span>
                                                <span className="text-xs text-yellow-400 font-semibold bg-yellow-950/40 px-2 py-0.5 rounded border border-yellow-700/30">
                                                    {stage.goldPerKill}G/마리 → {formatGold(stage.totalGoldPerRun)}G
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                                <input
                                                    type="number"
                                                    min="1"
                                                    placeholder="클리어 타임 (초)"
                                                    value={times[stage.id] ?? ''}
                                                    onChange={e => handleTime(stage.id, e.target.value)}
                                                    className="w-full bg-slate-800/80 border border-slate-600/50 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/30 transition-all"
                                                />
                                                <span className="text-xs text-slate-500 shrink-0">초</span>
                                            </div>
                                            {stage.goldPerHour !== null && stage.runsPerHour !== null && (
                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className="text-xs text-slate-400">{stage.runsPerHour.toFixed(1)}회/시간</span>
                                                    <span className="text-xs font-bold text-emerald-400">
                                                        {formatGold(stage.goldPerHour)}G/시간
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ─── 결과 랭킹 ───────────────────────────────── */}
            {ranked.length > 0 && (
                <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 shadow-lg">
                    <h2 className="font-bold text-slate-100 text-base mb-4 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        골드 효율 랭킹
                        <span className="text-xs text-slate-500 font-normal ml-1">(시간당 골드 기준)</span>
                    </h2>

                    {/* 1위 강조 배너 */}
                    {best && (
                        <div className="mb-4 p-4 bg-gradient-to-r from-yellow-900/30 to-amber-900/20 border border-yellow-500/40 rounded-xl flex items-center gap-4">
                            <div className="text-3xl">🥇</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-white font-black text-lg">스테이지 {best.id}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${AREA_COLORS[best.area as 1|2|3].badge}`}>
                                        {AREA_COLORS[best.area as 1|2|3].label}
                                    </span>
                                </div>
                                <div className="text-yellow-300 font-black text-2xl mt-0.5">
                                    {formatGold(best.goldPerHour!)}G <span className="text-sm font-medium text-yellow-400/70">/ 시간</span>
                                </div>
                                <div className="text-slate-400 text-xs mt-0.5">
                                    클리어 타임 {best.seconds}초 · {best.runsPerHour!.toFixed(1)}회/시간 · 회당 {formatGold(best.totalGoldPerRun)}G
                                </div>
                            </div>
                            <TrendingUp className="w-8 h-8 text-yellow-500/50 shrink-0" />
                        </div>
                    )}

                    {/* 전체 랭킹 표 */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                                    <th className="p-2.5 border border-slate-700 font-bold text-center w-10">순위</th>
                                    <th className="p-2.5 border border-slate-700 font-bold">스테이지</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-slate-400">지역</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-yellow-300 text-right">회당 골드</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-sky-300 text-right">클리어 타임</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-slate-400 text-right">회/시간</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-emerald-400 text-right">시간당 골드</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(showAll ? ranked : ranked.slice(0, 5)).map((r, idx) => {
                                    const isFirst = idx === 0;
                                    const areaCol = AREA_COLORS[r.area as 1|2|3];
                                    return (
                                        <tr
                                            key={r.id}
                                            className={`border-b border-slate-800 transition-colors ${
                                                isFirst
                                                    ? 'bg-yellow-950/30 border-b border-yellow-900/30'
                                                    : idx % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-950/40'
                                            }`}
                                        >
                                            <td className="p-2.5 border border-slate-700 text-center font-bold">
                                                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : <span className="text-slate-500">{idx + 1}</span>}
                                            </td>
                                            <td className="p-2.5 border border-slate-700 font-bold text-white">{r.id}</td>
                                            <td className="p-2.5 border border-slate-700">
                                                <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${areaCol.badge}`}>
                                                    {areaCol.label}
                                                </span>
                                            </td>
                                            <td className="p-2.5 border border-slate-700 text-right font-semibold text-yellow-300">
                                                {formatGold(r.totalGoldPerRun)}G
                                            </td>
                                            <td className="p-2.5 border border-slate-700 text-right text-sky-300 font-mono">
                                                {r.seconds}초
                                            </td>
                                            <td className="p-2.5 border border-slate-700 text-right text-slate-400">
                                                {r.runsPerHour!.toFixed(1)}회
                                            </td>
                                            <td className="p-2.5 border border-slate-700 text-right font-black text-emerald-400">
                                                {formatGold(r.goldPerHour!)}G
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {ranked.length > 5 && (
                        <button
                            onClick={() => setShowAll(v => !v)}
                            className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/40 transition-all"
                        >
                            {showAll ? <><ChevronUp className="w-3.5 h-3.5" /> 접기</> : <><ChevronDown className="w-3.5 h-3.5" /> 전체 {ranked.length}개 보기</>}
                        </button>
                    )}
                </div>
            )}

            {/* ─── 전체 스테이지 참고표 ─────────────────────── */}
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 shadow-lg">
                <h2 className="font-bold text-slate-100 text-base mb-4 flex items-center gap-2">
                    <Info className="w-4 h-4 text-slate-400" />
                    스테이지별 골드 참고표
                    <span className="text-xs text-slate-500 font-normal ml-1">(보너스: {bonus === 0 ? '기본' : `+${bonus}%`})</span>
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[420px] text-xs sm:text-sm">
                        <thead>
                            <tr className="bg-slate-800/80 border-b border-slate-700">
                                <th className="p-2 border border-slate-700 font-bold text-white">스테이지</th>
                                <th className="p-2 border border-slate-700 font-bold text-slate-400">지역</th>
                                <th className="p-2 border border-slate-700 font-bold text-yellow-300 text-right">마리당 골드</th>
                                <th className="p-2 border border-slate-700 font-bold text-emerald-300 text-right">회당 총 골드</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((r, idx) => {
                                const areaCol = AREA_COLORS[r.area as 1|2|3];
                                return (
                                    <tr key={r.id} className={idx % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-950/40'}>
                                        <td className="p-2 border border-slate-700 font-bold text-white">{r.id}</td>
                                        <td className="p-2 border border-slate-700">
                                            <span className={`text-xs px-1.5 py-0.5 rounded border font-semibold ${areaCol.badge}`}>
                                                {areaCol.label}
                                            </span>
                                        </td>
                                        <td className="p-2 border border-slate-700 text-right text-yellow-300 font-mono">{r.goldPerKill}G</td>
                                        <td className="p-2 border border-slate-700 text-right text-emerald-300 font-bold">{formatGold(r.totalGoldPerRun)}G</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
