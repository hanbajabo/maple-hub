"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, Coins, Shield, Sparkles, ArrowLeft, Star, ChevronRight, TrendingUp, Package } from "lucide-react";
import { InArticleAd } from "@/components/AdSense";
import {
    calculateCumulativeExpectedCostDetailed,
    getRestorationMesoCost,
    getRestorationSpareCount,
    calculateStarforceCost,
    calculateStarforceProbabilities
} from "@/lib/starforce_db";

type MVP = "none" | "silver" | "gold" | "diamond" | "red";

const ToggleCheckbox = ({ checked, onChange, label, desc }: { checked: boolean; onChange: () => void; label: string; desc: string }) => (
    <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all duration-150 ${
        checked
            ? "bg-indigo-500/15 border-indigo-400/50"
            : "bg-slate-800/50 border-slate-600 hover:border-slate-500"
    }`}>
        <div className={`mt-0.5 w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
            checked ? "bg-indigo-500 border-indigo-500" : "border-slate-400"
        }`}>
            {checked && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
        <div>
            <div className={`text-sm font-semibold ${checked ? "text-indigo-200" : "text-slate-100"}`}>{label}</div>
            <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{desc}</div>
        </div>
    </label>
);

const InputField = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
    <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">{label}</label>
        {children}
        {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
);

export default function StarforceCalculatorComponent() {
    const [itemLevel, setItemLevel] = useState<number>(200);
    const [itemCost, setItemCost] = useState<number>(100000000);
    const [currentStars, setCurrentStars] = useState<number>(0);
    const [currentStarsInput, setCurrentStarsInput] = useState<string>("0");
    const [targetStars, setTargetStars] = useState<number>(22);
    const [targetStarsInput, setTargetStarsInput] = useState<string>("22");
    const [useSafeguard, setUseSafeguard] = useState<boolean>(true);
    const [mvpRank, setMvpRank] = useState<MVP>("none");
    const [usePCCafe, setUsePCCafe] = useState<boolean>(false);
    const [isSundayMaple, setIsSundayMaple] = useState<boolean>(false);
    const [isShining, setIsShining] = useState<boolean>(false);
    const [restoreMethod, setRestoreMethod] = useState<"A" | "B" | "optimal">("optimal");

    const [results, setResults] = useState<{
        expectedMeso: number;
        expectedSpares: number;
        totalValue: number;
        stages: any[];
    } | null>(null);

    const getMaxStars = (level: number) => {
        if (level < 95) return 5;
        if (level < 108) return 8;
        if (level < 118) return 10;
        if (level < 128) return 15;
        if (level < 138) return 20;
        return 30;
    };
    const maxStars = getMaxStars(itemLevel);

    const handleCalculate = () => {
        if (currentStars >= targetStars) { setResults(null); return; }

        const options = {
            starcatch: true,
            preventDestruction: useSafeguard,
            mvpDiscount: mvpRank === "silver" ? 0.03 : mvpRank === "gold" ? 0.05 : (mvpRank === "diamond" || mvpRank === "red") ? 0.10 : 0,
            pcCafe: usePCCafe,
            sundayMaple: isSundayMaple,
            isShining: isShining,
            itemCost: itemCost,
            restoreMethod: restoreMethod
        };

        const statsStart = calculateCumulativeExpectedCostDetailed(itemLevel, currentStars, options);
        const statsTarget = calculateCumulativeExpectedCostDetailed(itemLevel, targetStars, options);

        const expectedMeso = statsTarget.totalMeso - statsStart.totalMeso;
        const expectedSpares = statsTarget.totalSpares - statsStart.totalSpares;
        const totalValue = expectedMeso + expectedSpares * itemCost;

        const stages = [];
        for (let s = currentStars; s < targetStars; s++) {
            const probs = calculateStarforceProbabilities(s, options);
            const cost = calculateStarforceCost(itemLevel, s, options);
            const restoreMeso = getRestorationMesoCost(itemLevel, s, isShining);
            const restoreSpares = getRestorationSpareCount(itemLevel, s);
            const statsStageStart = calculateCumulativeExpectedCostDetailed(itemLevel, s, options);
            const statsStageTarget = calculateCumulativeExpectedCostDetailed(itemLevel, s + 1, options);
            const useOptionB = statsTarget.choices[s] ?? false;
            stages.push({
                stage: s,
                success: probs.success,
                destroy: probs.destroy,
                cost,
                restoreMeso,
                restoreSpares,
                expectedMeso: statsStageTarget.totalMeso - statsStageStart.totalMeso,
                expectedSpares: statsStageTarget.totalSpares - statsStageStart.totalSpares,
                useOptionB
            });
        }

        setResults({ expectedMeso, expectedSpares, totalValue, stages });
    };

    const fmtLarge = (num: number) => {
        const jo = 1000000000000, eok = 100000000, man = 10000;
        if (num >= jo) return `${(num / jo).toFixed(1)}조`;
        if (num >= eok) {
            const e = Math.floor(num / eok);
            const m = Math.floor((num % eok) / man);
            return m > 0 ? `${e}억 ${m}만` : `${e}억`;
        }
        if (num >= man) return `${Math.floor(num / man)}만`;
        return num.toLocaleString();
    };

    const inputCls = "w-full bg-slate-800 text-white px-4 py-2.5 rounded-xl border border-slate-600 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/30 outline-none font-mono text-sm transition-all placeholder-slate-500";
    const selectCls = "w-full appearance-none bg-slate-800 text-white px-3.5 py-2.5 rounded-xl border border-slate-600 outline-none focus:border-indigo-400 text-sm transition-all";

    // 파괴 방지 권장 여부: 15~17성 구간에서 파괴방지 ON/OFF 총 비용(메소 + 스페어 × 장비값) 비교
    const safeguardRecommended = (() => {
        if (currentStars >= 18 || targetStars <= 15) return false;
        const baseOptions = {
            starcatch: true,
            preventDestruction: false,
            mvpDiscount: mvpRank === "silver" ? 0.03 : mvpRank === "gold" ? 0.05 : (mvpRank === "diamond" || mvpRank === "red") ? 0.10 : 0,
            pcCafe: usePCCafe,
            sundayMaple: isSundayMaple,
            isShining,
            itemCost,
            restoreMethod
        };
        const s = Math.max(15, currentStars);
        const e = Math.min(18, targetStars);
        const sgStart   = calculateCumulativeExpectedCostDetailed(itemLevel, s, { ...baseOptions, preventDestruction: true });
        const sgEnd     = calculateCumulativeExpectedCostDetailed(itemLevel, e, { ...baseOptions, preventDestruction: true });
        const noSgStart = calculateCumulativeExpectedCostDetailed(itemLevel, s, baseOptions);
        const noSgEnd   = calculateCumulativeExpectedCostDetailed(itemLevel, e, baseOptions);
        // 총 비용 = 메소 + 스페어 개수 × 장비 가격 (← 이걸 빠뜨리면 고가 장비에서 오판)
        const totalWithSg    = (sgEnd.totalMeso   - sgStart.totalMeso)   + (sgEnd.totalSpares   - sgStart.totalSpares)   * itemCost;
        const totalWithoutSg = (noSgEnd.totalMeso - noSgStart.totalMeso) + (noSgEnd.totalSpares - noSgStart.totalSpares) * itemCost;
        return totalWithSg < totalWithoutSg;
    })();

    return (
        <div className="min-h-screen text-slate-100" style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #0f1629 50%, #0a0e1a 100%)" }}>
            <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">

                {/* Header */}
                <div>
                    <Link href="/" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors mb-5 text-xs font-medium group">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        홈으로 돌아가기
                    </Link>
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex-shrink-0">
                            <Star className="w-7 h-7 text-indigo-300" fill="currentColor" fillOpacity={0.4} />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">스타포스 기댓값 계산기</h1>
                            <p className="text-slate-400 text-sm mt-1">2026년 개편 반영 · 하락 제거 · 파괴 복구 최적 경로 자동 선택</p>
                        </div>
                    </div>
                </div>

                <InArticleAd dataAdSlot="8162808816" />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                    {/* ===== LEFT: Settings ===== */}
                    <div className="lg:col-span-2 space-y-4">

                        {/* 장비 정보 */}
                        <div className="rounded-2xl border border-slate-600 bg-slate-800/60 overflow-hidden">
                            <div className="px-5 py-3.5 border-b border-slate-600 flex items-center gap-2 bg-slate-800/80">
                                <Sparkles className="w-4 h-4 text-indigo-300" />
                                <span className="text-sm font-bold text-white">장비 정보</span>
                            </div>
                            <div className="p-5 space-y-4">
                                <InputField label="장비 레벨제한" hint="100, 130, 140, 150, 160, 200, 250 등 자유 입력">
                                    <input
                                        type="text" inputMode="numeric"
                                        value={itemLevel}
                                        onChange={(e) => setItemLevel(Number(e.target.value.replace(/[^0-9]/g, "")))}
                                        className={inputCls}
                                        placeholder="예: 200"
                                    />
                                </InputField>

                                <InputField label="장비 노작 가격 (스페어 1개 기준)">
                                    <div className="relative">
                                        <Coins className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text" inputMode="numeric"
                                            value={itemCost.toLocaleString()}
                                            onChange={(e) => setItemCost(Number(e.target.value.replace(/[^0-9]/g, "")))}
                                            className={`${inputCls} pl-9`}
                                            placeholder="0"
                                        />
                                    </div>
                                    <p className="text-xs text-indigo-300 text-right font-medium">{fmtLarge(itemCost)} 메소</p>
                                </InputField>

                                <div className="grid grid-cols-2 gap-3">
                                    <InputField label="시작 성급">
                                        <div className="relative">
                                            <input
                                                type="text" inputMode="numeric"
                                                value={currentStarsInput}
                                                onChange={(e) => setCurrentStarsInput(e.target.value.replace(/[^0-9]/g, ""))}
                                                onBlur={(e) => {
                                                    const v = Math.min(maxStars, Math.max(0, parseInt(e.target.value) || 0));
                                                    setCurrentStars(v);
                                                    setCurrentStarsInput(String(v));
                                                }}
                                                className={`${inputCls} pr-8`}
                                            />
                                            <span className="absolute right-3 top-2.5 text-slate-400 text-sm font-bold">★</span>
                                        </div>
                                    </InputField>
                                    <InputField label="목표 성급">
                                        <div className="relative">
                                            <input
                                                type="text" inputMode="numeric"
                                                value={targetStarsInput}
                                                onChange={(e) => setTargetStarsInput(e.target.value.replace(/[^0-9]/g, ""))}
                                                onBlur={(e) => {
                                                    const v = Math.min(maxStars, Math.max(0, parseInt(e.target.value) || 0));
                                                    setTargetStars(v);
                                                    setTargetStarsInput(String(v));
                                                }}
                                                className={`${inputCls} pr-8 focus:border-yellow-400 focus:ring-yellow-400/30`}
                                            />
                                            <span className="absolute right-3 top-2.5 text-yellow-400 text-sm font-bold">★</span>
                                        </div>
                                    </InputField>
                                </div>

                                {/* Goal indicator */}
                                <div className="flex items-center gap-3 py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-600">
                                    <span className="text-slate-300 text-xs font-mono font-bold">{currentStars}★</span>
                                    <div className="flex-1 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-yellow-400 transition-all"
                                            style={{ width: `${maxStars > 0 ? Math.min(100, (currentStars / maxStars) * 100) : 0}%` }}
                                        />
                                    </div>
                                    <span className="text-yellow-300 text-xs font-mono font-bold">{targetStars}★</span>
                                </div>
                            </div>
                        </div>

                        {/* 할인 및 이벤트 */}
                        <div className="rounded-2xl border border-slate-600 bg-slate-800/60 overflow-hidden">
                            <div className="px-5 py-3.5 border-b border-slate-600 flex items-center gap-2 bg-slate-800/80">
                                <Shield className="w-4 h-4 text-emerald-300" />
                                <span className="text-sm font-bold text-white">할인 및 이벤트</span>
                            </div>
                            <div className="p-5 space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <InputField label="MVP 등급">
                                        <div className="relative">
                                            <select
                                                value={mvpRank}
                                                onChange={(e) => setMvpRank(e.target.value as MVP)}
                                                className={selectCls}
                                            >
                                                <option value="none">없음</option>
                                                <option value="silver">실버 (3%)</option>
                                                <option value="gold">골드 (5%)</option>
                                                <option value="diamond">다이아/레드 (10%)</option>
                                            </select>
                                            <div className="absolute right-3 top-3 pointer-events-none text-slate-400 text-xs">▼</div>
                                        </div>
                                    </InputField>
                                    <InputField label="복구 방식">
                                        <div className="relative">
                                            <select
                                                value={restoreMethod}
                                                onChange={(e) => setRestoreMethod(e.target.value as any)}
                                                className={selectCls}
                                            >
                                                <option value="optimal">최적 자동 선택</option>
                                                <option value="B">성급 유지 복구</option>
                                                <option value="A">12성 복구</option>
                                            </select>
                                            <div className="absolute right-3 top-3 pointer-events-none text-slate-400 text-xs">▼</div>
                                        </div>
                                    </InputField>
                                </div>

                                <div className="space-y-2">
                                    <ToggleCheckbox
                                        checked={isShining}
                                        onChange={() => { setIsShining(!isShining); if (isSundayMaple) setIsSundayMaple(false); }}
                                        label="샤이닝 스타포스 타임"
                                        desc="비용 30% ↓ · 파괴율 30% ↓ (21성↓) · 복구비 20% ↓"
                                    />
                                    <ToggleCheckbox
                                        checked={isSundayMaple}
                                        onChange={() => { setIsSundayMaple(!isSundayMaple); if (isShining) setIsShining(false); }}
                                        label="강화 비용 30% 할인"
                                        desc="썬데이 메이플 등 전 구간 30% 할인 이벤트"
                                    />
                                    <ToggleCheckbox
                                        checked={useSafeguard}
                                        onChange={() => setUseSafeguard(!useSafeguard)}
                                        label="파괴 방지 (세이프가드)"
                                        desc="15~17성 적용 · 추가 비용 200% 발생"
                                    />
                                    {/* 파괴방지 권장 배지 */}
                                    {(currentStars < 18 && targetStars > 15) && (
                                        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border ${
                                            safeguardRecommended
                                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                                                : "bg-red-500/10 border-red-500/30 text-red-300"
                                        }`}>
                                            <span>{safeguardRecommended ? "✓" : "✗"}</span>
                                            <span>
                                                {safeguardRecommended
                                                    ? "현재 장비 가격 기준, 파괴 방지를 사용하는 것을 권장합니다."
                                                    : "현재 장비 가격 기준, 파괴 방지 없이 강화하는 것이 유리합니다."}
                                            </span>
                                        </div>
                                    )}
                                    <ToggleCheckbox
                                        checked={usePCCafe}
                                        onChange={() => setUsePCCafe(!usePCCafe)}
                                        label="PC방 할인"
                                        desc="1~17성 구간 5% 추가 할인"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Calculate Button */}
                        <button
                            onClick={handleCalculate}
                            className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white shadow-lg shadow-indigo-500/25 active:scale-95 transition-all duration-150"
                        >
                            ✦ 계산하기
                        </button>
                    </div>

                    {/* ===== RIGHT: Results ===== */}
                    <div className="lg:col-span-3 space-y-4">
                        {results ? (
                            <>
                                {/* Summary Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="rounded-2xl border border-slate-600 bg-slate-800/60 p-5 space-y-2">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider">
                                            <Coins className="w-3.5 h-3.5 text-yellow-400" />
                                            강화 비용
                                        </div>
                                        <div className="text-2xl font-black text-white leading-none">{fmtLarge(results.expectedMeso)}</div>
                                    </div>
                                    <div className="rounded-2xl border border-slate-600 bg-slate-800/60 p-5 space-y-2">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider">
                                            <Package className="w-3.5 h-3.5 text-orange-300" />
                                            스페어 장비
                                        </div>
                                        <div className="text-2xl font-black text-orange-300 leading-none">{results.expectedSpares.toFixed(2)}<span className="text-base font-bold ml-1">개</span></div>
                                    </div>
                                    <div className="rounded-2xl border-2 border-yellow-400/60 bg-yellow-950/30 p-5 space-y-2 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 pointer-events-none" />
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-yellow-200 uppercase tracking-wider relative z-10">
                                            <TrendingUp className="w-3.5 h-3.5 text-yellow-300" />
                                            최종 기댓값
                                        </div>
                                        <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 leading-none relative z-10">{fmtLarge(results.totalValue)}</div>
                                    </div>
                                </div>

                                {/* Stage Breakdown Table */}
                                <div className="rounded-2xl border border-slate-600 bg-slate-800/60 overflow-hidden">
                                    <div className="px-5 py-4 border-b border-slate-600 flex items-center justify-between bg-slate-800/80">
                                        <div className="flex items-center gap-2">
                                            <Calculator className="w-4 h-4 text-slate-300" />
                                            <span className="text-sm font-bold text-white">성급별 상세 분석</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                                            <span className="text-slate-200">{currentStars}★</span>
                                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                            <span className="text-yellow-300">{targetStars}★</span>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-xs">
                                            <thead>
                                                <tr className="bg-slate-900/80 text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-600">
                                                    <th className="py-3 px-4 whitespace-nowrap">구간</th>
                                                    <th className="py-3 px-3 text-right whitespace-nowrap">성공 / 파괴율</th>
                                                    <th className="py-3 px-3 text-right whitespace-nowrap">시도 비용</th>
                                                    <th className="py-3 px-3 text-right whitespace-nowrap">구간 기대 비용</th>
                                                    <th className="py-3 px-3 text-center whitespace-nowrap">스페어</th>
                                                    <th className="py-3 px-3 text-center whitespace-nowrap">복구</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {results.stages.map((stageData, idx) => {
                                                    const useOptionB = stageData.useOptionB;
                                                    const hasDestroy = stageData.destroy > 0;
                                                    const isHighRisk = stageData.destroy > 10;

                                                    return (
                                                        <tr
                                                            key={idx}
                                                            className={`border-b border-slate-700 transition-colors hover:bg-slate-700/40 ${isHighRisk ? "bg-red-900/10" : idx % 2 === 0 ? "bg-slate-800/20" : ""}`}
                                                        >
                                                            {/* 구간 */}
                                                            <td className="py-3 px-4 font-bold whitespace-nowrap">
                                                                <span className="text-slate-300">{stageData.stage}</span>
                                                                <span className="text-slate-500 mx-1">→</span>
                                                                <span className="text-white">{stageData.stage + 1}</span>
                                                                <span className="text-yellow-400 ml-0.5 text-[10px]">★</span>
                                                            </td>
                                                            {/* 확률 */}
                                                            <td className="py-3 px-3 text-right whitespace-nowrap">
                                                                <span className="text-emerald-300 font-semibold">{stageData.success.toFixed(2)}%</span>
                                                                {hasDestroy ? (
                                                                    <span className={`ml-2 font-semibold ${isHighRisk ? "text-red-300" : "text-red-400"}`}>
                                                                        {stageData.destroy.toFixed(2)}%
                                                                    </span>
                                                                ) : (
                                                                    <span className="ml-2 text-slate-500">—</span>
                                                                )}
                                                            </td>
                                                            {/* 시도 비용 */}
                                                            <td className="py-3 px-3 text-right font-mono text-slate-300 whitespace-nowrap">
                                                                {fmtLarge(stageData.cost)}
                                                            </td>
                                                            {/* 구간 기대 비용 */}
                                                            <td className="py-3 px-3 text-right font-mono font-bold text-white whitespace-nowrap">
                                                                {fmtLarge(stageData.expectedMeso)}
                                                            </td>
                                                            {/* 스페어 */}
                                                            <td className="py-3 px-3 text-center whitespace-nowrap">
                                                                {stageData.expectedSpares > 0.001 ? (
                                                                    <span className="text-orange-300 font-semibold">{stageData.expectedSpares.toFixed(3)}</span>
                                                                ) : (
                                                                    <span className="text-slate-500">—</span>
                                                                )}
                                                            </td>
                                                            {/* 복구 방식 */}
                                                            <td className="py-3 px-3 text-center whitespace-nowrap">
                                                                {hasDestroy ? (
                                                                    useOptionB ? (
                                                                        <span className="inline-block text-[10px] font-bold text-indigo-200 bg-indigo-500/25 border border-indigo-400/40 px-2 py-0.5 rounded-full">온전</span>
                                                                    ) : (
                                                                        <span className="inline-block text-[10px] font-bold text-amber-200 bg-amber-500/25 border border-amber-400/40 px-2 py-0.5 rounded-full">12성</span>
                                                                    )
                                                                ) : (
                                                                    <span className="text-slate-500">—</span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="rounded-2xl border border-slate-600 bg-slate-800/60 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                                <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center mb-4">
                                    <Star className="w-8 h-8 text-slate-400" />
                                </div>
                                <div className="text-slate-200 font-bold text-base mb-1">조건을 설정해 주세요</div>
                                <div className="text-slate-400 text-sm">시작 성급이 목표 성급보다 낮아야 계산이 시작됩니다.</div>
                                <div className="mt-4 text-sm text-slate-500">예: 시작 0★ → 목표 22★</div>
                            </div>
                        )}
                    </div>
                </div>

                <InArticleAd dataAdSlot="6849727140" />

                {/* Algorithm Explanation */}
                <div className="rounded-2xl border border-slate-600 bg-slate-800/60 overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-600 bg-slate-800/80">
                        <h2 className="text-sm font-bold text-white">흔적 복구 최적화 알고리즘</h2>
                        <p className="text-xs text-slate-400 mt-1">파괴 발생 시 어떤 방식으로 복구하는 게 더 저렴한지 자동으로 비교하여 선택합니다.</p>
                    </div>
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Option A */}
                        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full">12성 복구 (A)</span>
                            </div>
                            <p className="text-sm text-slate-200 font-medium leading-relaxed">
                                파괴된 장비를 <span className="text-amber-300 font-bold">스페어 1개</span>로 교체한 뒤,<br/>
                                <span className="text-amber-300 font-bold">12성 체크포인트</span>부터 다시 강화합니다.
                            </p>
                            <div className="bg-slate-900/60 rounded-lg p-3 space-y-1 font-mono text-xs">
                                <div className="text-slate-400">복구 비용 =</div>
                                <div className="text-amber-200 pl-2">스페어 1개</div>
                                <div className="text-amber-200 pl-2">+ E[12성 → 현재성] 메소</div>
                                <div className="text-slate-500 text-[10px] pt-1">※ 15성 미만 파괴는 0성부터 복구</div>
                            </div>
                            <p className="text-xs text-slate-400">장비 가격이 저렴할수록 유리. 12성까지 강화 비용이 낮은 구간에서 효율적.</p>
                        </div>

                        {/* Option B */}
                        <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded-full">성급 유지 복구 (B)</span>
                                <span className="text-[10px] text-slate-500">2026 개편 신규</span>
                            </div>
                            <p className="text-sm text-slate-200 font-medium leading-relaxed">
                                메소를 지불하여 파괴된 장비를<br/>
                                <span className="text-indigo-300 font-bold">파괴 직전 성급으로 즉시 복구</span>합니다.
                            </p>
                            <div className="bg-slate-900/60 rounded-lg p-3 space-y-1 font-mono text-xs">
                                <div className="text-slate-400">복구 비용 =</div>
                                <div className="text-indigo-200 pl-2">스페어 N개 (성급별 상이)</div>
                                <div className="text-indigo-200 pl-2">+ 고정 복구 메소 (공식 고지)</div>
                                <div className="text-slate-500 text-[10px] pt-1">※ 15성 이상 파괴부터 선택 가능</div>
                            </div>
                            <p className="text-xs text-slate-400">장비 가격이 비쌀수록 유리. 고성급에서 12성까지 다시 올리는 비용이 클 때 효율적.</p>
                        </div>

                        {/* Comparison Logic */}
                        <div className="md:col-span-2 rounded-xl border border-slate-600 bg-slate-900/50 p-4 space-y-3">
                            <p className="text-xs font-bold text-white">⚖️ 자동 선택 방식 (최적 복구)</p>
                            <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs space-y-2 text-slate-300">
                                <div><span className="text-slate-500">// 각 복구 방식의 총 비용(메소 + 스페어 가치) 계산</span></div>
                                <div><span className="text-amber-300">비용_A</span> = E[12성→현재성 메소] + <span className="text-amber-300">스페어 1개 × 장비 가격</span></div>
                                <div><span className="text-indigo-300">비용_B</span> = 고정복구 메소 + <span className="text-indigo-300">스페어 N개 × 장비 가격</span></div>
                                <div className="pt-1 border-t border-slate-800">
                                    <span className="text-white">if </span>
                                    <span className="text-indigo-300">비용_B</span>
                                    <span className="text-white"> &lt; </span>
                                    <span className="text-amber-300">비용_A</span>
                                    <span className="text-white"> → </span>
                                    <span className="text-indigo-300 font-bold">성급 유지 복구(B) 선택</span>
                                </div>
                                <div>
                                    <span className="text-white">else → </span>
                                    <span className="text-amber-300 font-bold">12성 복구(A) 선택</span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400">
                                성급이 높을수록, 장비 가격이 비쌀수록 성급 유지 복구(B)가 유리해지는 경향이 있습니다.
                                23성 이상 파괴 시 22성으로 강제 복구되며, 22성→원래 성급 재강화 비용도 함께 반영됩니다.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
