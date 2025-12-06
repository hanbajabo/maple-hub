"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Star, Shield, RefreshCw, Zap, Settings, Monitor, Calculator, Coins, Sparkles, ArrowLeft } from "lucide-react";

interface StarforceStats {
    totalCost: number;
    attempts: number;
    successes: number;
    failures: number;
    destroys: number;
    starCatchSuccesses: number;
}

interface SimResult {
    averageCost: number;
    medianCost: number;
    minCost: number;
    maxCost: number;
    avgDestroys: number;
    successRate: number;
    distribution: { cost: number, count: number }[];
}

type MVP = "none" | "silver" | "gold" | "diamond" | "red";

export default function StarforceSimulator() {
    // Item State
    const [itemLevel, setItemLevel] = useState<number>(200);
    const [currentStars, setCurrentStars] = useState<number>(0);
    const [itemCost, setItemCost] = useState<number>(0);

    // Options
    const [useStarCatch, setUseStarCatch] = useState<boolean>(true);
    const [useSafeguard, setUseSafeguard] = useState<boolean>(false);
    const [eventMode, setEventMode] = useState<string>("none");
    const [targetStars, setTargetStars] = useState<number>(22);
    const [mvpRank, setMvpRank] = useState<MVP>("none");
    const [usePCCafe, setUsePCCafe] = useState<boolean>(false);

    // Simulation State
    const [stats, setStats] = useState<StarforceStats>({
        totalCost: 0,
        attempts: 0,
        successes: 0,
        failures: 0,
        destroys: 0,
        starCatchSuccesses: 0,
    });
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [lastResult, setLastResult] = useState<"success" | "fail" | "destroy" | "chance" | null>(null);
    const [chanceTime, setChanceTime] = useState<boolean>(false);
    const [log, setLog] = useState<string[]>([]);

    // Batch Simulation State
    const [simIterations, setSimIterations] = useState<number>(1000);
    const [simResult, setSimResult] = useState<SimResult | null>(null);
    const [isSimulating, setIsSimulating] = useState<boolean>(false);

    const logEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [log]);

    const getMaxStars = (level: number) => {
        if (level < 95) return 5;
        if (level < 108) return 8;
        if (level < 118) return 10;
        if (level < 128) return 15;
        if (level < 138) return 20;
        return 30;
    };
    const maxStars = getMaxStars(itemLevel);

    // --- Core Logic ---
    const getProbabilities = (stars: number, event: string, starCatch: boolean, safeguard: boolean) => {
        let success = 0;
        let destroy = 0;

        if (stars === 0) success = 0.95;
        else if (stars === 1) success = 0.90;
        else if (stars === 2) success = 0.85;
        else if (stars === 3) success = 0.85;
        else if (stars === 4) success = 0.80;
        else if (stars === 5) success = 0.75;
        else if (stars === 6) success = 0.70;
        else if (stars === 7) success = 0.65;
        else if (stars === 8) success = 0.60;
        else if (stars === 9) success = 0.55;
        else if (stars === 10) success = 0.50;
        else if (stars === 11) success = 0.45;
        else if (stars === 12) success = 0.40;
        else if (stars === 13) success = 0.35;
        else if (stars === 14) success = 0.30;
        else if (stars === 15 || stars === 16) { success = 0.30; destroy = 0.021; }
        else if (stars === 17 || stars === 18) { success = 0.15; destroy = 0.068; }
        else if (stars === 19) { success = 0.15; destroy = 0.085; }
        else if (stars === 20) { success = 0.30; destroy = 0.105; }
        else if (stars === 21) { success = 0.15; destroy = 0.1275; }
        else if (stars === 22) { success = 0.15; destroy = 0.17; }
        else if (stars >= 23 && stars <= 25) { success = 0.10; destroy = 0.18; }
        else if (stars === 26) { success = 0.07; destroy = 0.186; }
        else if (stars === 27) { success = 0.05; destroy = 0.19; }
        else if (stars === 28) { success = 0.03; destroy = 0.194; }
        else if (stars === 29) { success = 0.01; destroy = 0.198; }

        // Event Mods
        if ((event === "5/10/15" || event === "shining") && (stars === 5 || stars === 10 || stars === 15)) {
            success = 1.0;
            destroy = 0;
        }
        if ((event === "destroy30" || event === "shining") && stars <= 21 && destroy > 0) {
            destroy = destroy * 0.7;
        }

        // Safeguard
        if (safeguard && (stars === 15 || stars === 16 || stars === 17)) {
            destroy = 0;
        }

        // Star Catch
        if (starCatch && success < 1.0) {
            const baseSuccess = success;
            const baseDestroy = destroy;
            const baseFail = 1.0 - baseSuccess - baseDestroy;

            const newSuccess = Math.min(baseSuccess * 1.05, 1.0);
            const remaining = 1.0 - newSuccess;

            if (baseFail + baseDestroy > 0) {
                destroy = (baseDestroy / (baseFail + baseDestroy)) * remaining;
            } else {
                destroy = 0;
            }
            success = newSuccess;
        }

        return { success, destroy };
    };

    const calculateCost = (level: number, stars: number, event: string, safeguard: boolean, mvp: MVP, pcCafe: boolean) => {
        let baseCost = 0;
        const L3 = Math.pow(level, 3);
        const S1 = stars + 1;

        if (stars <= 9) {
            baseCost = 1000 + (L3 * S1) / 36;
        } else if (stars <= 14) {
            const denomMap: { [key: number]: number } = { 10: 571, 11: 314, 12: 214, 13: 157, 14: 107 };
            baseCost = 1000 + (L3 * Math.pow(S1, 2.7)) / (denomMap[stars] || 100);
        } else {
            let denom = 200;
            if (stars === 17) denom = 150;
            else if (stars === 18) denom = 70;
            else if (stars === 19) denom = 45;
            else if (stars === 21) denom = 125;
            baseCost = 1000 + (L3 * Math.pow(S1, 2.7)) / denom;
        }

        baseCost = Math.round(baseCost / 100) * 100;

        let discountPercent = 0;
        if (stars >= 1 && stars <= 17) {
            if (mvp === "silver") discountPercent += 0.03;
            else if (mvp === "gold") discountPercent += 0.05;
            else if (mvp === "diamond" || mvp === "red") discountPercent += 0.10;
            if (pcCafe) discountPercent += 0.05;
        }

        let discountedCost = baseCost * (1.0 - discountPercent);

        if (event === "30%" || event === "shining") {
            discountedCost = discountedCost * 0.7;
        }

        let safeguardCost = 0;
        if (safeguard && (stars === 15 || stars === 16 || stars === 17)) {
            safeguardCost = baseCost;
        }

        return Math.floor(discountedCost + safeguardCost);
    };

    // --- Interactive Handlers ---

    const handleEnhance = async () => {
        if (isAnimating || currentStars >= maxStars) return;
        setIsAnimating(true);
        await new Promise(r => setTimeout(r, 500));

        const probs = getProbabilities(currentStars, eventMode, useStarCatch, useSafeguard);
        const cost = calculateCost(itemLevel, currentStars, eventMode, useSafeguard, mvpRank, usePCCafe);

        const roll = Math.random();
        let result: "success" | "fail" | "destroy" = "fail";
        let nextStars = currentStars;
        let logMsg = "";

        if (chanceTime) {
            result = "success";
            setChanceTime(false);
        } else {
            if (roll < probs.success) result = "success";
            else if (roll < probs.success + probs.destroy) result = "destroy";
            else result = "fail";
        }

        if (result === "success") {
            nextStars += 1;
            if (eventMode === "1+1" && currentStars <= 10) nextStars += 1;
            logMsg = `[${currentStars} -> ${nextStars}] 성공!`;
        } else if (result === "fail") {
            logMsg = `[${currentStars} -> ${currentStars}] 실패`;
        } else {
            nextStars = 12;
            logMsg = `[${currentStars}] 파괴! 12성 복구`;
        }

        setStats(prev => ({
            totalCost: prev.totalCost + cost + (result === "destroy" ? itemCost : 0),
            attempts: prev.attempts + 1,
            successes: result === "success" ? prev.successes + 1 : prev.successes,
            failures: result === "fail" ? prev.failures + 1 : prev.failures,
            destroys: result === "destroy" ? prev.destroys + 1 : prev.destroys,
            starCatchSuccesses: prev.starCatchSuccesses,
        }));

        setCurrentStars(nextStars);
        setLog(prev => [...prev, `${logMsg} (${formatNumber(cost)})`]);
        setLastResult(result);
        setIsAnimating(false);
    };

    const runBatchSimulation = async () => {
        if (isSimulating) return;
        setIsSimulating(true);

        await new Promise(r => setTimeout(r, 50));

        const results: number[] = [];
        const destroyCounts: number[] = [];
        let successCount = 0;

        for (let i = 0; i < simIterations; i++) {
            let simStars = currentStars;
            let simCost = 0;
            let simDestroys = 0;

            let safety = 0;
            while (simStars < targetStars && safety < 10000) {
                safety++;
                const probs = getProbabilities(simStars, eventMode, useStarCatch, useSafeguard);
                const cost = calculateCost(itemLevel, simStars, eventMode, useSafeguard, mvpRank, usePCCafe);

                simCost += cost;

                const roll = Math.random();
                if (roll < probs.success) {
                    simStars += 1;
                    if (eventMode === "1+1" && (simStars - 1) <= 10) simStars += 1;
                } else if (roll < probs.success + probs.destroy) {
                    simStars = 12;
                    simDestroys++;
                    simCost += itemCost;
                }
            }

            if (simStars >= targetStars) {
                successCount++;
            }
            results.push(simCost);
            destroyCounts.push(simDestroys);
        }

        results.sort((a, b) => a - b);
        const sum = results.reduce((a, b) => a + b, 0);
        const avg = sum / results.length;
        const median = results[Math.floor(results.length / 2)];
        const min = results[0];
        const max = results[results.length - 1];
        const totalDestroys = destroyCounts.reduce((a, b) => a + b, 0);

        setSimResult({
            averageCost: avg,
            medianCost: median,
            minCost: min,
            maxCost: max,
            avgDestroys: totalDestroys / simIterations,
            successRate: (successCount / simIterations) * 100,
            distribution: [],
        });

        setIsSimulating(false);
    };

    const resetSimulator = () => {
        setCurrentStars(0);
        setStats({ totalCost: 0, attempts: 0, successes: 0, failures: 0, destroys: 0, starCatchSuccesses: 0 });
        setLog([]);
        setLastResult(null);
        setSimResult(null);
    };

    const formatNumber = (num: number) => {
        if (num === 0) return "0";

        const unitGyeong = 10000000000000000;
        const unitJo = 1000000000000;
        const unitEok = 100000000;
        const unitMan = 10000;

        const gyeong = Math.floor(num / unitGyeong);
        let remainder = num % unitGyeong;

        const jo = Math.floor(remainder / unitJo);
        remainder %= unitJo;

        const eok = Math.floor(remainder / unitEok);
        remainder %= unitEok;

        const man = Math.floor(remainder / unitMan);
        const one = Math.floor(remainder % unitMan);

        const parts = [];
        if (gyeong > 0) parts.push(`${gyeong}경`);
        if (jo > 0) parts.push(`${jo}조`);
        if (eok > 0) parts.push(`${eok}억`);
        if (man > 0) parts.push(`${man}만`);
        if (one > 0) parts.push(`${one}`);

        return parts.join(" ") || "0";
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-indigo-500/30">
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6 sm:space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-800 pb-4 sm:pb-6">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-3 sm:mb-4 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs sm:text-sm font-medium">홈으로 돌아가기</span>
                        </Link>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 flex items-center gap-2 sm:gap-3">
                            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 fill-yellow-400" />
                            스타포스 시뮬레이터
                        </h1>
                        <p className="text-sm sm:text-base text-slate-400 mt-2 font-medium">메이플스토리 스타포스 강화 시뮬레이터 (2025 ver)</p>
                    </div>
                    <button
                        onClick={resetSimulator}
                        className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-slate-800/50 hover:bg-slate-800 rounded-full border border-slate-700 hover:border-slate-600 transition-all text-xs sm:text-sm font-medium text-slate-300 hover:text-white"
                    >
                        <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-180 transition-transform duration-500" />
                        초기화
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                    {/* Left Column: Visualizer & Controls (8 cols) */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-6">
                        {/* Visualizer Card */}
                        <div className="relative w-full h-56 sm:h-64 md:h-80 rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col items-center justify-center group">
                            {/* Background Effects */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />

                            {/* Star Display */}
                            <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 w-full px-4 sm:px-8">
                                <div className="text-center">
                                    <div className="text-5xl sm:text-6xl md:text-8xl font-black text-white drop-shadow-[0_0_30px_rgba(250,204,21,0.6)] tracking-tighter transition-all">
                                        {currentStars}
                                        <span className="text-xl sm:text-2xl md:text-4xl text-slate-600 ml-2 font-bold">/ {maxStars}</span>
                                    </div>
                                    <div className="text-indigo-400 font-medium tracking-widest text-xs sm:text-sm mt-1 sm:mt-2">현재 스타포스</div>
                                </div>

                                <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 max-w-2xl">
                                    {Array.from({ length: 25 }).map((_, i) => (
                                        <div key={i} className={`relative transition-all duration-300 ${i < currentStars ? "scale-100" : "scale-90 opacity-20"}`}>
                                            <Star
                                                className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${i < currentStars
                                                    ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"
                                                    : "text-slate-600"
                                                    }`}
                                            />
                                        </div>
                                    ))}
                                    {maxStars > 25 && Array.from({ length: maxStars - 25 }).map((_, i) => (
                                        <div key={i + 25} className={`relative transition-all duration-300 ${i + 25 < currentStars ? "scale-100" : "scale-90 opacity-20"}`}>
                                            <Star
                                                className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${i + 25 < currentStars
                                                    ? "text-purple-400 fill-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]"
                                                    : "text-slate-600"
                                                    }`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Result Overlay */}
                            {lastResult && (
                                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                                    <div className={`text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-widest transform scale-100 animate-in zoom-in-50 duration-300 ${lastResult === "success" ? "text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-[0_0_30px_rgba(234,179,8,0.5)]" :
                                        lastResult === "destroy" ? "text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800 drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]" :
                                            "text-slate-400"
                                        }`}>
                                        {lastResult === "success" ? "SUCCESS" : lastResult === "destroy" ? "DESTROYED" : "FAILED"}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Control Panel */}
                        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-800 p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                            {/* Toggles */}
                            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                                {[
                                    { label: "스타캐치", icon: Zap, state: useStarCatch, setter: setUseStarCatch, color: "yellow" },
                                    { label: "파괴방지", icon: Shield, state: useSafeguard, setter: setUseSafeguard, color: "green" },
                                    { label: "PC방", icon: Monitor, state: usePCCafe, setter: setUsePCCafe, color: "blue" },
                                ].map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => opt.setter(!opt.state)}
                                        className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl border text-xs sm:text-base font-bold transition-all duration-200 active:scale-95 flex-grow sm:flex-grow-0 ${opt.state
                                            ? `bg-${opt.color}-500/10 border-${opt.color}-500/50 text-${opt.color}-400 shadow-[0_0_15px_rgba(0,0,0,0.3)]`
                                            : "bg-slate-800 border-transparent text-slate-500 hover:bg-slate-750"
                                            }`}
                                    >
                                        <opt.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${opt.state ? "fill-current" : ""}`} />
                                        {opt.label}
                                    </button>
                                ))}
                            </div>

                            {/* Dropdowns */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">이벤트</label>
                                    <div className="relative">
                                        <select
                                            value={eventMode}
                                            onChange={(e) => setEventMode(e.target.value)}
                                            className="w-full appearance-none bg-slate-950 text-white px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium text-sm sm:text-base"
                                        >
                                            <option value="none">이벤트 없음</option>
                                            <option value="1+1">1+1 (10성 이하 2업)</option>
                                            <option value="30%">비용 30% 할인</option>
                                            <option value="5/10/15">5/10/15성 성공 100%</option>
                                            <option value="destroy30">파괴 확률 30% 감소</option>
                                            <option value="shining">샤이닝 (30% 할인 + 파괴방지)</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">MVP 등급</label>
                                    <div className="relative">
                                        <select
                                            value={mvpRank}
                                            onChange={(e) => setMvpRank(e.target.value as MVP)}
                                            className="w-full appearance-none bg-slate-950 text-white px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium text-sm sm:text-base"
                                        >
                                            <option value="none">없음</option>
                                            <option value="silver">실버 (3%)</option>
                                            <option value="gold">골드 (5%)</option>
                                            <option value="diamond">다이아 (10%)</option>
                                            <option value="red">레드 (10%)</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                                    </div>
                                </div>
                            </div>

                            {/* Session Stats */}
                            <div className="bg-slate-950/50 rounded-xl sm:rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 px-4 sm:px-8">
                                <div className="text-center md:text-left w-full md:w-auto">
                                    <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">현재 세션 누적 비용</div>
                                    <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 break-keep">
                                        {formatNumber(stats.totalCost)}
                                    </div>
                                </div>
                                <div className="flex gap-4 sm:gap-8 w-full md:w-auto justify-center">
                                    <div className="text-center">
                                        <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">파괴 횟수</div>
                                        <div className="text-lg sm:text-xl font-bold text-red-400">{stats.destroys}회</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">총 시도</div>
                                        <div className="text-lg sm:text-xl font-bold text-slate-300">{stats.attempts}회</div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Area */}
                            <div className="pt-4 sm:pt-6 border-t border-slate-800 flex flex-col items-center gap-4 sm:gap-6">
                                <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-8 gap-y-2 text-xs sm:text-sm font-medium">
                                    <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400">
                                        <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />
                                        <span>예상: <span className="text-white text-base sm:text-lg">{formatNumber(calculateCost(itemLevel, currentStars, eventMode, useSafeguard, mvpRank, usePCCafe))}</span></span>
                                    </div>
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="flex items-center gap-1.5 sm:gap-2">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                            <span className="text-green-400">{(getProbabilities(currentStars, eventMode, useStarCatch, useSafeguard).success * 100).toFixed(1)}%</span>
                                        </div>
                                        {getProbabilities(currentStars, eventMode, useStarCatch, useSafeguard).destroy > 0 && (
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                                                <span className="text-red-400">{(getProbabilities(currentStars, eventMode, useStarCatch, useSafeguard).destroy * 100).toFixed(1)}%</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={handleEnhance}
                                    disabled={isAnimating || currentStars >= maxStars}
                                    className="w-full md:w-3/4 py-4 sm:py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white text-lg sm:text-xl font-black rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-900/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 sm:gap-3 touch-manipulation"
                                >
                                    {isAnimating ? (
                                        <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 fill-white/20" />
                                            강화 시작
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Settings & Stats (4 cols) */}
                    <div className="lg:col-span-5 xl:col-span-4 space-y-4 sm:space-y-6">
                        {/* Settings Panel */}
                        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-800 p-4 sm:p-6 space-y-4 sm:space-y-6">
                            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3 sm:pb-4">
                                <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                                기본 설정
                            </h3>
                            <div className="space-y-3 sm:space-y-5">
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">장비 레벨</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={itemLevel}
                                        onChange={(e) => setItemLevel(Number(e.target.value.replace(/[^0-9]/g, "")))}
                                        onFocus={(e) => e.target.select()}
                                        className="w-full bg-slate-950 text-white px-4 py-3 rounded-xl border border-slate-800 focus:border-indigo-500 outline-none font-mono text-sm sm:text-base"
                                    />
                                </div>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">현재 스타포스</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={currentStars}
                                        onChange={(e) => {
                                            const val = Number(e.target.value.replace(/[^0-9]/g, ""));
                                            if (val <= maxStars) setCurrentStars(val);
                                        }}
                                        onFocus={(e) => e.target.select()}
                                        className="w-full bg-slate-950 text-white px-4 py-3 rounded-xl border border-slate-800 focus:border-indigo-500 outline-none font-mono text-sm sm:text-base"
                                    />
                                </div>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">목표 스타포스</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={targetStars}
                                        onChange={(e) => setTargetStars(Number(e.target.value.replace(/[^0-9]/g, "")))}
                                        onFocus={(e) => e.target.select()}
                                        className="w-full bg-slate-950 text-white px-4 py-3 rounded-xl border border-slate-800 focus:border-indigo-500 outline-none font-mono text-sm sm:text-base"
                                    />
                                </div>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">장비 노작값 (파괴 시 추가)</label>
                                    <div className="relative">
                                        <Coins className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={itemCost.toLocaleString()}
                                            onChange={(e) => setItemCost(Number(e.target.value.replace(/[^0-9]/g, "")))}
                                            onFocus={(e) => e.target.select()}
                                            className="w-full bg-slate-950 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-800 focus:border-indigo-500 outline-none font-mono text-sm sm:text-base"
                                            placeholder="0"
                                        />
                                    </div>
                                    <p className="text-[10px] sm:text-xs text-indigo-400 text-right font-medium">{formatNumber(itemCost)} 메소</p>
                                </div>
                            </div>
                        </div>

                        {/* Simulation Panel */}
                        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-800 p-4 sm:p-6 space-y-4 sm:space-y-6">
                            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3 sm:pb-4">
                                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                                대량 시뮬레이션
                            </h3>
                            <div className="space-y-3 sm:space-y-4">
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">시뮬레이션 횟수</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={simIterations}
                                        onChange={(e) => setSimIterations(Number(e.target.value.replace(/[^0-9]/g, "")))}
                                        onFocus={(e) => e.target.select()}
                                        className="w-full bg-slate-950 text-white px-4 py-3 rounded-xl border border-slate-800 focus:border-emerald-500 outline-none font-mono text-sm sm:text-base"
                                    />
                                </div>
                                <button
                                    onClick={runBatchSimulation}
                                    disabled={isSimulating}
                                    className="w-full py-2.5 sm:py-3 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/50 hover:border-emerald-500 text-emerald-400 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    {isSimulating ? "계산 중..." : "시뮬레이션 시작"}
                                </button>
                            </div>

                            {simResult && (
                                <div className="space-y-3 pt-2 animate-in slide-in-from-top-2">
                                    <div className="p-4 sm:p-6 bg-gradient-to-br from-indigo-900/30 to-slate-900/50 rounded-2xl border border-indigo-500/30 shadow-lg shadow-indigo-900/20 space-y-2 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors" />
                                        <div className="relative z-10">
                                            <div className="text-xs sm:text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                                                <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                평균 비용 (기대값)
                                            </div>
                                            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-200 break-keep mt-1 leading-tight">
                                                {formatNumber(simResult.averageCost)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                        <div className="p-2.5 sm:p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                                            <div className="text-[10px] text-slate-500 uppercase">중위 비용 (50%)</div>
                                            <div className="text-xs sm:text-sm font-medium text-slate-300 break-keep">{formatNumber(simResult.medianCost)}</div>
                                        </div>
                                        <div className="p-2.5 sm:p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                                            <div className="text-[10px] text-slate-500 uppercase">최대 비용 (100%)</div>
                                            <div className="text-xs sm:text-sm font-medium text-red-400 break-keep">{formatNumber(simResult.maxCost)}</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center px-2 pt-2">
                                        <span className="text-[10px] sm:text-xs text-slate-500">평균 파괴 횟수</span>
                                        <span className="text-xs sm:text-sm font-bold text-white">{simResult.avgDestroys.toFixed(2)}회</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Log */}
                        <div className="bg-black/40 rounded-2xl sm:rounded-3xl border border-slate-800 p-4 h-40 sm:h-48 overflow-y-auto font-mono text-[10px] sm:text-xs space-y-1 sm:space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                            {log.length === 0 && <div className="text-slate-600 text-center mt-16 italic">시뮬레이션 기록이 여기에 표시됩니다...</div>}
                            {log.map((entry, i) => (
                                <div key={i} className="text-slate-400 border-b border-white/5 pb-1 last:border-0 break-keep">
                                    <span className="text-slate-600 mr-2">[{i + 1}]</span>
                                    {entry}
                                </div>
                            ))}
                            <div ref={logEndRef} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
