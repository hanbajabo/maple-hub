'use client';

import { useState, useMemo, useEffect } from 'react';
import { Clock, Coins, TrendingUp, Info, ChevronDown, Sparkles } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

// ─── 스테이지 데이터 ───────────────────────────────────────────────────────────
// exp: LV18 기준 한판당 경험치 실측 획득량 (클리어 후 - 클리어 전), null = 미측정
// expPredicted: 1-4~2-2 선형 추세 기반 예측값
const STAGES = [
    { id: '1-1', area: 1, gold: { 0: 10,  5: 10,  10: 11,  20: 12,  25: 12,  30: 13  }, exp: 0.037,  expPredicted: false },
    { id: '1-2', area: 1, gold: { 0: 30,  5: 31,  10: 33,  20: 36,  25: 37,  30: 39  }, exp: 0.136,  expPredicted: false },
    { id: '1-3', area: 1, gold: { 0: 50,  5: 52,  10: 55,  20: 60,  25: 62,  30: 65  }, exp: 0.339,  expPredicted: false },
    { id: '1-4', area: 1, gold: { 0: 70,  5: 73,  10: 77,  20: 84,  25: 87,  30: 91  }, exp: 0.408,  expPredicted: false },
    { id: '1-5', area: 1, gold: { 0: 90,  5: 94,  10: 99,  20: 108, 25: 112, 30: 117 }, exp: 0.475,  expPredicted: false },
    { id: '1-6', area: 1, gold: { 0: 110, 5: 115, 10: 121, 20: 132, 25: 137, 30: 143 }, exp: 0.600,  expPredicted: false },
    { id: '1-7', area: 1, gold: { 0: 130, 5: 136, 10: 143, 20: 156, 25: 162, 30: 169 }, exp: 0.747,  expPredicted: false },
    { id: '1-8', area: 1, gold: { 0: 150, 5: 157, 10: 165, 20: 180, 25: 187, 30: 195 }, exp: 0.951,  expPredicted: false },
    { id: '1-9', area: 1, gold: { 0: 170, 5: 178, 10: 187, 20: 204, 25: 212, 30: 221 }, exp: 1.087,  expPredicted: false },
    { id: '2-1', area: 2, gold: { 0: 400, 5: 420, 10: 440, 20: 480, 25: 500, 30: 520 }, exp: 1.155,  expPredicted: false },
    { id: '2-2', area: 2, gold: { 0: 430, 5: 451, 10: 473, 20: 516, 25: 537, 30: 559 }, exp: 1.359,  expPredicted: false },
    { id: '2-3', area: 2, gold: { 0: 460, 5: 483, 10: 506, 20: 552, 25: 575, 30: 598 }, exp: 1.495,  expPredicted: true  },
    { id: '2-4', area: 2, gold: { 0: 490, 5: 514, 10: 539, 20: 588, 25: 612, 30: 637 }, exp: 1.632,  expPredicted: true  },
    { id: '2-5', area: 2, gold: { 0: 520, 5: 546, 10: 572, 20: 624, 25: 650, 30: 676 }, exp: 1.768,  expPredicted: true  },
    { id: '2-6', area: 2, gold: { 0: 550, 5: 577, 10: 605, 20: 660, 25: 687, 30: 715 }, exp: 1.904,  expPredicted: true  },
    { id: '2-7', area: 2, gold: { 0: 580, 5: 609, 10: 638, 20: 696, 25: 725, 30: 754 }, exp: 2.040,  expPredicted: true  },
    { id: '2-8', area: 2, gold: { 0: 610, 5: 640, 10: 671, 20: 732, 25: 762, 30: 793 }, exp: 2.176,  expPredicted: true  },
    { id: '2-9', area: 2, gold: { 0: 640, 5: 672, 10: 704, 20: 768, 25: 800, 30: 832 }, exp: 2.312,  expPredicted: true  },
    { id: '3-1', area: 3, gold: { 0: 700, 5: 735, 10: 770, 20: 840, 25: 875, 30: 910 }, exp: 2.448,  expPredicted: true  },
    { id: '3-2', area: 3, gold: { 0: 750, 5: 788, 10: 825, 20: 900, 25: 938, 30: 975 }, exp: 2.584,  expPredicted: true  },
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
    1: { border: 'border-sky-700/40',    bg: 'bg-sky-900/20',    badge: 'bg-sky-900/60 text-sky-300 border-sky-700/50',         label: '1지역', dot: 'bg-sky-400'    },
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
    const [bonus, setBonus]         = useState<number>(0);
    const [refId, setRefId]         = useState<string>('1-5');
    const [refMin, setRefMin]       = useState<string>('');
    const [refSecInp, setRefSecInp] = useState<string>('');
    const [isCalculated, setIsCalculated] = useState<boolean>(false);

    useEffect(() => {
        setIsCalculated(false);
    }, [bonus, refId, refMin, refSecInp]);

    const refStage  = STAGES.find(s => s.id === refId)!;
    const refGold   = refStage.gold[bonus as keyof typeof refStage.gold];
    const refExp    = refStage.exp; // 실측 or 예측 경험치 %
    
    const m = refMin ? parseInt(refMin) || 0 : 0;
    const s = refSecInp ? parseFloat(refSecInp) || 0 : 0;
    const refSec = (refMin || refSecInp) ? (m * 60 + s) : null;

    const refGPH = refSec && refSec > 0 ? (refGold * 60) / (refSec / 3600) : null;
    const refEPH = refSec && refSec > 0 && refExp ? refExp / (refSec / 3600) : null;
    const refMPM = refSec && refSec > 0 ? 3600 / refSec : null;

    const results = useMemo(() => {
        return STAGES.map(stage => {
            const g = stage.gold[bonus as keyof typeof stage.gold];
            const breakevenGold = refSec && refSec > 0 ? refSec * (g / refGold) : null;
            const breakevenExp  = refSec && refSec > 0 && refExp && stage.exp
                ? refSec * (stage.exp / refExp)
                : null;
            return { ...stage, goldPerKill: g, breakevenGold, breakevenExp };
        });
    }, [bonus, refGold, refExp, refSec]);

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
                    <div className="relative flex-1">
                        <select
                            value={refId}
                            onChange={e => setRefId(e.target.value)}
                            className="w-full appearance-none bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/30 transition-all pr-8"
                        >
                            {STAGES.map(s => (
                                <option key={s.id} value={s.id}>
                                    스테이지 {s.id} — 1마리당 {s.gold[bonus as keyof typeof s.gold]}G{s.exp !== null ? ` · 경험치 ${s.expPredicted ? '~' : ''}${s.exp.toFixed(3)}%` : ''}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:w-64">
                        <div className="flex items-center gap-2 w-full">
                            <input
                                type="number"
                                min="0"
                                placeholder="분"
                                value={refMin}
                                onChange={e => setRefMin(e.target.value)}
                                className="w-full bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/30 transition-all"
                            />
                            <span className="text-sm text-slate-400 shrink-0">분</span>
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <input
                                type="number"
                                min="0"
                                placeholder="초"
                                value={refSecInp}
                                onChange={e => setRefSecInp(e.target.value)}
                                className="w-full bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/30 transition-all"
                            />
                            <span className="text-sm text-slate-400 shrink-0">초</span>
                        </div>
                    </div>
                </div>

                {/* 계산하기 버튼 */}
                <div className="pt-2">
                    <button
                        onClick={() => setIsCalculated(true)}
                        disabled={!refSec || refSec <= 0}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg active:scale-[0.98]"
                    >
                        계산하기
                    </button>
                </div>
            </div>

            {isCalculated && refSec && refSec > 0 && (
                <>
                    <div className="my-6">
                        <InArticleAd />
                    </div>

                    {/* 기준 효율 표시 */}
                    <div className="mt-3 p-3 bg-sky-950/40 border border-sky-700/40 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                            <TrendingUp className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                            <span>골드/시간</span>
                            <span className="text-yellow-300 font-black ml-auto">
                                {refGPH! >= 1_000_000
                                    ? (refGPH! / 1_000_000).toFixed(2) + 'M'
                                    : Math.round(refGPH!).toLocaleString()}G
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>경험치/시간</span>
                            <span className="text-emerald-300 font-black ml-auto">
                                {refEPH ? refEPH.toFixed(2) + '%' : <span className="text-slate-600">미측정</span>}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                            <Clock className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                            <span>분당 처치 수</span>
                            <span className="text-violet-300 font-black ml-auto">
                                {refMPM!.toFixed(1)}마리
                            </span>
                        </div>
                    </div>

                    <p className="mt-2 mb-6 text-xs text-slate-400">
                        ※ 마지막에 나오는 보스가 주는 메소는 포함하지 않았기 때문에 더 많은 골드를 획득할 수 있습니다.
                    </p>
            {/* ─── ③ 결과 테이블 ──────────────────────────────── */}
                <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 shadow-lg">
                    <h2 className="font-bold text-slate-100 text-sm mb-1 flex items-center gap-2">
                        <Info className="w-4 h-4 text-slate-400" />
                        동일 효율 달성 필요 클리어 타임
                    </h2>
                    <p className="text-xs text-slate-500 mb-4">
                        각 스테이지를 아래 시간 이내에 클리어하면
                        <span className="text-sky-400 font-semibold mx-1">스테이지 {refId} ({refSec}초)</span>
                        보다 효율이 높습니다. 경험치는 LV18 기준 실측값입니다.
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[640px]">
                            <thead>
                                <tr className="bg-slate-800/80 border-b border-slate-700 text-slate-300">
                                    <th className="p-2.5 border border-slate-700 font-bold">스테이지</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-slate-400">지역</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-yellow-300 text-right">1마리당 골드</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-yellow-200 text-right">골드 기준 타임</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-emerald-300 text-right">한판당 경험치</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-emerald-200 text-right">경험치 기준 타임</th>
                                    <th className="p-2.5 border border-slate-700 font-bold text-violet-300 text-right">필요 분당 처치</th>
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
                                                    ? 'bg-sky-950/40'
                                                    : idx % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-950/40'
                                            }`}
                                        >
                                            {/* 스테이지 */}
                                            <td className="p-2.5 border border-slate-700 font-bold text-white">
                                                {r.id}
                                                {isRef && (
                                                    <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-sky-800/60 text-sky-300 rounded border border-sky-700/50 font-semibold">기준</span>
                                                )}
                                            </td>
                                            {/* 지역 */}
                                            <td className="p-2.5 border border-slate-700">
                                                <span className={`text-xs px-1.5 py-0.5 rounded border font-semibold ${areaCol.badge}`}>
                                                    {areaCol.label}
                                                </span>
                                            </td>
                                            {/* 1마리당 골드 */}
                                            <td className="p-2.5 border border-slate-700 text-right text-yellow-300 font-semibold">
                                                {r.goldPerKill}G
                                            </td>
                                            {/* 골드 기준 타임 */}
                                            <td className="p-2.5 border border-slate-700 text-right font-bold">
                                                {isRef ? (
                                                    <span className="text-sky-300">{fmtTime(refSec!)} (기준)</span>
                                                ) : r.breakevenGold !== null ? (
                                                    <span className={r.breakevenGold > refSec ? 'text-yellow-300' : 'text-rose-400'}>
                                                        {fmtTime(r.breakevenGold)} 이내
                                                    </span>
                                                ) : '-'}
                                            </td>
                                            {/* 한판당 경험치 */}
                                            <td className="p-2.5 border border-slate-700 text-right font-semibold">
                                                {r.exp !== null ? (
                                                    r.expPredicted ? (
                                                        <span className="text-slate-400">
                                                            ~{r.exp.toFixed(3)}%
                                                            <span className="text-slate-600 text-[10px] ml-1">예측</span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-emerald-300">
                                                            {r.exp.toFixed(3)}%
                                                            <span className="text-slate-500 text-[10px] ml-1">LV18</span>
                                                        </span>
                                                    )
                                                ) : <span className="text-slate-600 text-xs">미측정</span>}
                                            </td>
                                            {/* 경험치 기준 타임 */}
                                            <td className="p-2.5 border border-slate-700 text-right font-bold">
                                                {isRef ? (
                                                    <span className="text-sky-300">{fmtTime(refSec!)} (기준)</span>
                                                ) : r.breakevenExp !== null ? (
                                                    <span className={r.breakevenExp > refSec ? 'text-emerald-300' : 'text-rose-400'}>
                                                        {fmtTime(r.breakevenExp)} 이내
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-600 text-xs">미측정</span>
                                                )}
                                            </td>
                                            {/* 분당 처치 수 */}
                                            <td className="p-2.5 border border-slate-700 text-right font-bold text-violet-300">
                                                {isRef
                                                    ? `${(3600 / refSec).toFixed(1)}마리/분`
                                                    : r.breakevenGold !== null
                                                        ? `${(3600 / r.breakevenGold).toFixed(1)}마리/분`
                                                        : '-'}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* 범례 */}
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 inline-block" />
                            골드: 기준보다 여유 (달성 쉬움)
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 inline-block" />
                            경험치: 기준보다 여유 (달성 쉬움)
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                            기준보다 빠르게 클리어해야 함
                        </span>
                    </div>
                </div>
                </>
            )}
        </div>
    );
}
