"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SpecUpAnalysisResult, SpecUpRecommendation, EquippedItem } from '@/lib/specup-engine';

export default function SpecUpAdvisorPage() {
    const [nickname, setNickname] = useState('한자');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<SpecUpAnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [budget, setBudget] = useState<number>(50); // 억 단위
    const [showEquipList, setShowEquipList] = useState(false);

    // Initial search
    useEffect(() => {
        handleSearch('한자');
    }, []);

    const handleSearch = async (nameToSearch: string) => {
        if (!nameToSearch.trim()) return;
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/character/specup?name=${encodeURIComponent(nameToSearch.trim())}`);
            if (!res.ok) {
                const errJson = await res.json();
                throw new Error(errJson.error || '캐릭터를 찾을 수 없습니다.');
            }
            const json: SpecUpAnalysisResult = await res.json();
            setData(json);
            setNickname(nameToSearch);
        } catch (err: any) {
            setError(err.message || '데이터를 가져오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // Calculate budget fit
    const budgetMeso = budget * 100000000;
    let accumulatedCost = 0;
    const affordableRecs = data?.recommendations.filter(rec => {
        if (accumulatedCost + rec.costBreakdown.totalCostMeso <= budgetMeso) {
            accumulatedCost += rec.costBreakdown.totalCostMeso;
            return true;
        }
        return false;
    }) || [];

    const totalCombatPowerGained = affordableRecs.reduce((sum, r) => sum + r.gains.combatPowerGain, 0);

    return (
        <div className="min-h-screen bg-[#0d1117] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Page Header */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Maple AI 실시간 장비 진단 시스템
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        실시간 장비 진단 & 가성비 스펙업 추천기
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
                        착용 중인 25개 장비, 스타포스 성수, 잠재 3줄을 정밀 스캔하여 <br className="hidden sm:block" />
                        <strong className="text-emerald-400">오늘 경매장 시세</strong> 기준 가장 돈을 적게 쓰고 딜을 많이 올리는 최적의 강화 순서를 추천합니다.
                    </p>
                </div>

                {/* Search Bar & Presets */}
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-sm">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch(nickname);
                        }}
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="캐릭터 닉네임 입력 (예: 한자, 아델, 쯔단)"
                                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>진단 중...</span>
                                </>
                            ) : (
                                <>
                                    <span>🔍 정밀 진단하기</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Quick Preset Buttons */}
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-700/50 text-xs sm:text-sm text-slate-400">
                        <span>추천 랭커 예시:</span>
                        {['한자', '아델', '쯔단'].map((preset) => (
                            <button
                                key={preset}
                                onClick={() => handleSearch(preset)}
                                className="px-2.5 py-1 rounded-lg bg-slate-700/60 hover:bg-emerald-500/20 hover:text-emerald-300 border border-slate-600/50 transition-colors"
                            >
                                {preset}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm text-center">
                        ⚠️ {error}
                    </div>
                )}

                {/* Result Dashboard */}
                {data && !loading && (
                    <div className="space-y-8">

                        {/* Character Overview Card */}
                        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                {data.character.image && (
                                    <div className="relative w-32 h-32 rounded-2xl bg-slate-950/70 border border-slate-700 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                                        <img
                                            src={data.character.image}
                                            alt={data.character.name}
                                            className="w-28 h-28 object-contain scale-110"
                                        />
                                    </div>
                                )}
                                <div className="flex-1 text-center md:text-left space-y-2">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                                            {data.character.world}
                                        </span>
                                        <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                                            Lv.{data.character.level} {data.character.job}
                                        </span>
                                        {data.character.guild && (
                                            <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                                                길드: {data.character.guild}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                                        {data.character.name}
                                    </h2>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-2.5 text-center">
                                            <div className="text-xs text-slate-400">인게임 전투력</div>
                                            <div className="text-sm sm:text-base font-extrabold text-amber-400">
                                                {(data.character.combatPower / 10000).toLocaleString()}만
                                            </div>
                                        </div>
                                        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-2.5 text-center">
                                            <div className="text-xs text-slate-400">순수 주스탯</div>
                                            <div className="text-sm sm:text-base font-extrabold text-white">
                                                {data.character.mainStat.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-2.5 text-center">
                                            <div className="text-xs text-slate-400">보스 공격력</div>
                                            <div className="text-sm sm:text-base font-extrabold text-rose-400">
                                                {data.character.bossDamage}%
                                            </div>
                                        </div>
                                        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-2.5 text-center">
                                            <div className="text-xs text-slate-400">방어율 무시</div>
                                            <div className="text-sm sm:text-base font-extrabold text-cyan-400">
                                                {data.character.ignoreDefense}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Budget Optimizer Planner */}
                        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 rounded-2xl p-6 shadow-xl space-y-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <span>💰 내 예산 맞춤 강화 플래너</span>
                                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-semibold">SMART AI</span>
                                    </h3>
                                    <p className="text-xs text-slate-400">보유하신 메소를 설정하시면 최대 가성비 루트를 자동으로 조합해 드립니다.</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-300">내 예산:</span>
                                    <input
                                        type="number"
                                        min="1"
                                        max="2000"
                                        value={budget}
                                        onChange={(e) => setBudget(Math.max(1, parseInt(e.target.value || '1', 10)))}
                                        className="w-24 bg-slate-950 border border-emerald-500/50 rounded-lg px-3 py-1.5 text-right font-extrabold text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base"
                                    />
                                    <span className="text-sm font-bold text-emerald-400">억 메소</span>
                                </div>
                            </div>

                            {/* Budget Result Box */}
                            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-center sm:text-left">
                                    <div className="text-xs text-slate-400">예산 내 추천 강화 항목 (총 {affordableRecs.length}개 선택)</div>
                                    <div className="text-sm font-semibold text-slate-200 mt-1">
                                        {affordableRecs.map((r, i) => (
                                            <span key={i} className="inline-block mr-2 text-emerald-400">
                                                [{r.rank}위: {r.targetItem.split(' ')[0]}]
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-center sm:text-right shrink-0">
                                    <div className="text-xs text-slate-400">예상 전투력 상승량 합계</div>
                                    <div className="text-xl font-black text-amber-400">
                                        +{(totalCombatPowerGained / 10000).toLocaleString()}만 상승! 🔥
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top 5 Recommendations Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black text-white flex items-center gap-2">
                                    <span>🏆 추천 가성비 스펙업 순서 TOP {data.recommendations.length}</span>
                                </h3>
                                <span className="text-xs text-slate-400">오늘 경매장 시세 + 스타포스 기댓값 + 큐브값 100% 반영</span>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {data.recommendations.map((rec) => (
                                    <div
                                        key={rec.rank}
                                        className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 rounded-2xl p-5 sm:p-6 transition-all shadow-lg space-y-4"
                                    >
                                        {/* Card Header */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/50 pb-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                                                    rec.rank === 1 ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' :
                                                    rec.rank === 2 ? 'bg-slate-300 text-slate-950' :
                                                    rec.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-700 text-slate-300'
                                                }`}>
                                                    {rec.rank}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-slate-400">[{rec.slot}]</span>
                                                        <h4 className="text-base sm:text-lg font-bold text-white">{rec.targetItem}</h4>
                                                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                                                            {rec.efficiencyBadge}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-slate-400 mt-0.5">
                                                        현재: <span className="text-slate-300 font-medium">{rec.currentStatus}</span> ➔ <strong className="text-emerald-400">{rec.action}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-left sm:text-right shrink-0">
                                                <div className="text-xs text-slate-400">실질 완성 총비용</div>
                                                <div className="text-lg sm:text-xl font-black text-emerald-400">
                                                    {rec.costBreakdown.totalCostText}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 5-Pillar Cost Breakdown Grid (정확값 기반) */}
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs">
                                            <div>
                                                <div className="text-slate-400">① 노작 원가 (오늘 시세)</div>
                                                <div className="font-bold text-slate-200 truncate">{rec.costBreakdown.basePriceText}</div>
                                            </div>
                                            <div>
                                                <div className="text-slate-400">② 스타포스 메소 기댓값 <span className="text-emerald-400 font-semibold">정확</span></div>
                                                <div className="font-bold text-amber-300">{rec.costBreakdown.starforceCostText}</div>
                                            </div>
                                            <div>
                                                <div className="text-slate-400">③ 파괴 복구비</div>
                                                <div className="font-bold text-orange-300 truncate">{rec.costBreakdown.sparesNeededText}</div>
                                            </div>
                                            <div>
                                                <div className="text-slate-400">④ 윗잠 큐브 기댓값 <span className="text-emerald-400 font-semibold">정확</span></div>
                                                <div className="font-bold text-blue-300 truncate">{rec.costBreakdown.potentialCostText}</div>
                                            </div>
                                            <div>
                                                <div className="text-slate-400">⑤ 에디셔널 큐브 기댓값 <span className="text-emerald-400 font-semibold">정확</span></div>
                                                <div className="font-bold text-purple-300 truncate">{rec.costBreakdown.additionalCostText}</div>
                                            </div>
                                        </div>

                                        {/* Gains & Pro-tip */}
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="px-3 py-1 rounded-lg bg-slate-900 text-amber-300 text-xs font-extrabold border border-amber-500/30">
                                                    📈 전투력 {rec.gains.combatPowerText}
                                                </span>
                                                <span className="px-3 py-1 rounded-lg bg-slate-900 text-rose-300 text-xs font-extrabold border border-rose-500/30">
                                                    ⚔️ {rec.gains.bossDamageText}
                                                </span>
                                                <span className="text-xs text-slate-400 font-medium">
                                                    ({rec.gains.statText})
                                                </span>
                                            </div>
                                            <div className="text-[10px] text-slate-500 italic shrink-0">
                                                ⚠️ 전투력·딜 상승량은 추정값입니다
                                            </div>
                                        </div>

                                        {/* Reason & Pro-Tip Note */}
                                        <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 space-y-1.5 text-xs text-slate-300">
                                            <div><strong className="text-emerald-400">💡 추천 이유:</strong> {rec.reason}</div>
                                            <div><strong className="text-cyan-400">🎯 강화 팁:</strong> {rec.proTip}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Equipped Items Toggle Drawer */}
                        <div className="border-t border-slate-800 pt-6">
                            <button
                                onClick={() => setShowEquipList(!showEquipList)}
                                className="w-full bg-slate-800/60 hover:bg-slate-800 border border-slate-700/70 rounded-xl p-4 text-center font-bold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 text-sm"
                            >
                                <span>{showEquipList ? '▲ 착용 장비 목록 접기' : '▼ 현재 착용 중인 25개 장비 전체 보기'}</span>
                            </button>

                            {showEquipList && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                                    {data.equippedItems.map((item, idx) => (
                                        <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-start gap-3">
                                            {item.icon && (
                                                <img src={item.icon} alt={item.name} className="w-10 h-10 object-contain shrink-0 bg-slate-950 rounded-lg p-1 border border-slate-800" />
                                            )}
                                            <div className="flex-1 min-w-0 text-xs space-y-0.5">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-slate-400 font-medium">[{item.slot}]</span>
                                                    {item.starforce > 0 && (
                                                        <span className="text-amber-400 font-bold">★ {item.starforce}성</span>
                                                    )}
                                                </div>
                                                <div className="font-bold text-white truncate">{item.name}</div>
                                                {item.potentialGrade && (
                                                    <div className={`text-[11px] font-semibold ${
                                                        item.potentialGrade === '레전드리' ? 'text-emerald-400' :
                                                        item.potentialGrade === '유니크' ? 'text-amber-400' :
                                                        item.potentialGrade === '에픽' ? 'text-purple-400' : 'text-blue-400'
                                                    }`}>
                                                        {item.potentialGrade} ({item.potential1})
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}
