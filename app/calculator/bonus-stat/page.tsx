'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdBanner from '@/components/AdSense/AdBanner';
import {
    BonusStatCalcOutput,
    JOB_EFFICIENCY_PRESETS,
    StatEfficiency,
    FlameType
} from '@/lib/bonus-stat-calculator';

export default function BonusStatCalculatorPage() {
    // 1. Basic Settings
    const [equipType, setEquipType] = useState<'NON_WEAPON' | 'WEAPON'>('NON_WEAPON');
    const [isBossDrop, setIsBossDrop] = useState<boolean>(true);
    const [equipLevel, setEquipLevel] = useState<number>(200);

    // 2. Aim Goal Settings
    const [goalMode, setGoalMode] = useState<'SCORE' | 'CUSTOM_STATS'>('SCORE');
    const [aimStat, setAimStat] = useState<number>(100);
    const [targetStr, setTargetStr] = useState<number>(0);
    const [targetDex, setTargetDex] = useState<number>(0);
    const [targetInt, setTargetInt] = useState<number>(0);
    const [targetLuk, setTargetLuk] = useState<number>(0);
    const [targetAllStat, setTargetAllStat] = useState<number>(0);
    const [targetAtt, setTargetAtt] = useState<number>(0);
    const [targetMagicAtt, setTargetMagicAtt] = useState<number>(0);
    const [targetHp, setTargetHp] = useState<number>(0);

    const [weaponGrade, setWeaponGrade] = useState<string>('6'); // 기본: 2추
    const [minBossDamage, setMinBossDamage] = useState<string>('none');
    const [minDamage, setMinDamage] = useState<string>('none');
    const [minAllStat, setMinAllStat] = useState<string>('none');

    // 3. Job & Efficiency Settings
    const [selectedJob, setSelectedJob] = useState<string>('WARRIOR');
    const [statEfficiency, setStatEfficiency] = useState<StatEfficiency>(JOB_EFFICIENCY_PRESETS.WARRIOR.eff);
    const [showEfficiencyModal, setShowEfficiencyModal] = useState<boolean>(false);

    // 4. Interactive Live Appraisal Widget (내 아이템 급수 환산기)
    const [myStr, setMyStr] = useState<number>(0);
    const [myDex, setMyDex] = useState<number>(0);
    const [myInt, setMyInt] = useState<number>(0);
    const [myLuk, setMyLuk] = useState<number>(0);
    const [myAllStat, setMyAllStat] = useState<number>(0);
    const [myAtt, setMyAtt] = useState<number>(0);
    const [myMagicAtt, setMyMagicAtt] = useState<number>(0);
    const [myHp, setMyHp] = useState<number>(0);
    const [myDamage, setMyDamage] = useState<number>(0);
    const [myBossDamage, setMyBossDamage] = useState<number>(0);

    // 5. Result State
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<BonusStatCalcOutput | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    // Apply Preset Change
    const handleJobChange = (jobKey: string) => {
        setSelectedJob(jobKey);
        const preset = JOB_EFFICIENCY_PRESETS[jobKey];
        if (preset) {
            setStatEfficiency({ ...preset.eff });
        }
    };

    // Calculate Live Score for My Item
    const calculatedMyScore = useMemo(() => {
        let score = 0;
        score += (myStr || 0) * (statEfficiency.STR || 0);
        score += (myDex || 0) * (statEfficiency.DEX || 0);
        score += (myInt || 0) * (statEfficiency.INT || 0);
        score += (myLuk || 0) * (statEfficiency.LUK || 0);
        score += (myAllStat || 0) * (statEfficiency['ALL %'] || 0);
        score += (myAtt || 0) * (statEfficiency.ATTACK || 0);
        score += (myMagicAtt || 0) * (statEfficiency.MAGIC_ATTACK || 0);
        score += (myHp || 0) * (statEfficiency.HP || 0);
        score += (myDamage || 0) * (statEfficiency.DAMAGE || 0);
        score += (myBossDamage || 0) * (statEfficiency.BOSS_DAMAGE || 0);
        return Math.round(score * 10) / 10;
    }, [myStr, myDex, myInt, myLuk, myAllStat, myAtt, myMagicAtt, myHp, myDamage, myBossDamage, statEfficiency]);

    // Calculate Estimated Score for Custom Target Stats
    const estimatedCustomScore = useMemo(() => {
        let score = 0;
        score += (targetStr || 0) * (statEfficiency.STR || 0);
        score += (targetDex || 0) * (statEfficiency.DEX || 0);
        score += (targetInt || 0) * (statEfficiency.INT || 0);
        score += (targetLuk || 0) * (statEfficiency.LUK || 0);
        score += (targetAllStat || 0) * (statEfficiency['ALL %'] || 0);
        score += (targetAtt || 0) * (statEfficiency.ATTACK || 0);
        score += (targetMagicAtt || 0) * (statEfficiency.MAGIC_ATTACK || 0);
        score += (targetHp || 0) * (statEfficiency.HP || 0);
        return Math.round(score * 10) / 10;
    }, [targetStr, targetDex, targetInt, targetLuk, targetAllStat, targetAtt, targetMagicAtt, targetHp, statEfficiency]);

    // Handle Calculation Request
    const handleCalculate = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/calculator/bonus-stat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    equipLevel,
                    equipType,
                    isBossDrop,
                    goalMode,
                    aimStat,
                    targetStats: goalMode === 'CUSTOM_STATS' ? {
                        STR: targetStr || undefined,
                        DEX: targetDex || undefined,
                        INT: targetInt || undefined,
                        LUK: targetLuk || undefined,
                        'ALL %': targetAllStat || undefined,
                        ATTACK: targetAtt || undefined,
                        MAGIC_ATTACK: targetMagicAtt || undefined,
                        HP: targetHp || undefined
                    } : undefined,
                    weaponGrade: weaponGrade !== 'none' ? parseInt(weaponGrade, 10) : undefined,
                    minBossDamage: minBossDamage !== 'none' ? parseInt(minBossDamage, 10) : undefined,
                    minDamage: minDamage !== 'none' ? parseInt(minDamage, 10) : undefined,
                    minAllStat: minAllStat !== 'none' ? parseInt(minAllStat, 10) : undefined,
                    statEfficiency
                })
            });
            if (res.ok) {
                const data: BonusStatCalcOutput = await res.json();
                setResult(data);
                setTimeout(() => {
                    resultRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } catch (e) {
            console.error('Bonus stat calc error:', e);
        } finally {
            setLoading(false);
        }
    };

    // Initial calculation on mount
    useEffect(() => {
        handleCalculate();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" prefetch={false} className="hover:opacity-80 transition-opacity flex items-center">
                            <Image
                                src="/images/flame-abyss.png"
                                alt="환생의 불꽃"
                                width={36}
                                height={36}
                                className="rounded-lg shadow-md hover:scale-105 transition-transform"
                                priority
                            />
                        </Link>
                        <div>
                            <h1 className="text-base sm:text-xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                                추가옵션(환생의 불꽃) 기댓값 계산기
                            </h1>
                            <p className="text-[10px] sm:text-xs text-slate-400">
                                2026 최신 공식 패치: 메소 재설정 (300만 메소) 및 심연의 환불 정밀 반영
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/calculator/cube-calculator"
                            prefetch={false}
                            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors hidden sm:inline-flex items-center gap-1"
                        >
                            <span>🔮 큐브 계산기</span>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
                {/* Notice Banner */}
                <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs sm:text-sm text-slate-300 flex items-start gap-3 shadow-lg">
                    <span className="text-xl shrink-0">🔥</span>
                    <div className="space-y-1">
                        <div className="font-bold text-amber-300 flex items-center gap-2">
                            <span>2026 메이플스토리 공식 추가옵션 시스템 탑재</span>
                            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
                                공식 확률 검증 완료
                            </span>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-xs">
                            • <strong>메소 재설정 시스템</strong>: 1회당 <strong>300만 메소</strong> 소모, 옵션 등장 확률은 <strong>검은 환생의 불꽃(영환불)과 100% 동일</strong>하게 적용됩니다.<br />
                            • <strong>심연의 환생의 불꽃</strong>: 3~4등급(5~4추)이 배제되며, 7등급(1추) 확률이 <strong>3%</strong>로 3배 높습니다.
                        </p>
                    </div>
                </div>

                {/* Main Settings Form (Full Width for Maximum Readability) */}
                <div className="space-y-6">
                    {/* 1. Equipment Type & Boss Drop */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
                        <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
                            <span>🛡️ 1. 장비 기본 설정</span>
                        </h2>

                            <div className="space-y-4">
                                {/* Equip Type */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-semibold text-slate-400">장비 종류</label>
                                        <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                                            ✓ 보스 장비 기준 (4줄 확정 · 3~7등급)
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
                                        <button
                                            type="button"
                                            onClick={() => setEquipType('NON_WEAPON')}
                                            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                                                equipType === 'NON_WEAPON'
                                                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                                                    : 'text-slate-400 hover:text-slate-200'
                                            }`}
                                        >
                                            방어구 / 장신구
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEquipType('WEAPON')}
                                            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                                                equipType === 'WEAPON'
                                                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                                                    : 'text-slate-400 hover:text-slate-200'
                                            }`}
                                        >
                                            무기 (공/마 추옵)
                                        </button>
                                    </div>
                                </div>

                                {/* Equip Level Fast Selector */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-semibold text-slate-400">장비 레벨 (Level)</label>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs text-slate-400">직접 입력:</span>
                                            <input
                                                type="number"
                                                value={equipLevel}
                                                onChange={e => setEquipLevel(Math.max(1, parseInt(e.target.value, 10) || 0))}
                                                className="w-20 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-2 py-1 text-xs font-bold text-amber-300 text-center focus:outline-none"
                                            />
                                            <span className="text-xs text-slate-400">제</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-2.5">
                                        {[
                                            { label: '135제', val: 135 },
                                            { label: '140제', val: 140 },
                                            { label: '150제', val: 150 },
                                            { label: '160제', val: 160 },
                                            { label: '200제', val: 200 },
                                            { label: '250제', val: 250 }
                                        ].map(item => (
                                            <button
                                                key={item.val}
                                                type="button"
                                                onClick={() => setEquipLevel(item.val)}
                                                className={`py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl border text-center transition-all ${
                                                    equipLevel === item.val
                                                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md ring-1 ring-amber-500/50'
                                                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                                                }`}
                                            >
                                                <span className="text-sm sm:text-base font-black tracking-wide">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Goal Aim Settings */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-xl">
                            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
                                <span>🎯 2. 목표 추가옵션 설정</span>
                            </h2>

                            {equipType === 'NON_WEAPON' ? (
                                /* Armor Goal */
                                <div className="space-y-4">
                                    {/* Mode Selector Tabs */}
                                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
                                        <button
                                            type="button"
                                            onClick={() => setGoalMode('SCORE')}
                                            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                                                goalMode === 'SCORE'
                                                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                                                    : 'text-slate-400 hover:text-slate-200'
                                            }`}
                                        >
                                            🏆 목표 급수(환산치)로 설정
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setGoalMode('CUSTOM_STATS')}
                                            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                                                goalMode === 'CUSTOM_STATS'
                                                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                                                    : 'text-slate-400 hover:text-slate-200'
                                            }`}
                                        >
                                            ✍️ 원하는 옵션 직접 입력
                                        </button>
                                    </div>

                                    {goalMode === 'SCORE' ? (
                                        /* 1. Score Mode */
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-semibold text-slate-400">목표 스탯 환산치 (급수)</label>
                                                <span className="text-xs text-amber-400 font-bold">목표: {aimStat}급 이상</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <div className="flex-1 relative">
                                                    <input
                                                        type="number"
                                                        value={aimStat}
                                                        onChange={e => setAimStat(Math.max(0, parseInt(e.target.value, 10) || 0))}
                                                        placeholder="예: 100"
                                                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-base font-bold text-white focus:outline-none pr-16"
                                                    />
                                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 pointer-events-none">
                                                        급 이상
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-4 sm:flex sm:flex-wrap items-center gap-1.5">
                                                    {[80, 100, 120, 140, 160, 180, 200].map(val => (
                                                        <button
                                                            key={val}
                                                            type="button"
                                                            onClick={() => setAimStat(val)}
                                                            className={`py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                                                                aimStat === val
                                                                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md ring-1 ring-amber-500/40 font-black'
                                                                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                                                            }`}
                                                        >
                                                            {val}급
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-[11px] text-slate-500">
                                                * 아래 직업 스탯 효율 기준으로 주스탯, 부스탯, 올스탯%, 공격력을 합산한 점수입니다.
                                            </p>
                                        </div>
                                    ) : (
                                        /* 2. Custom Target Stats Mode */
                                        <div className="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-slate-300 font-bold flex items-center gap-1">
                                                    <span>🎯 목표 최소 수치 설정 (동시 만족)</span>
                                                </span>
                                                <span className="text-xs text-amber-400 font-bold bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md">
                                                    약 {estimatedCustomScore}급 상당
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                                                <div>
                                                    <label className="text-[11px] text-slate-400 block mb-1">STR 이상</label>
                                                    <input
                                                        type="number"
                                                        value={targetStr || ''}
                                                        onChange={e => setTargetStr(parseInt(e.target.value, 10) || 0)}
                                                        placeholder="0"
                                                        className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-white font-mono text-center"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[11px] text-slate-400 block mb-1">DEX 이상</label>
                                                    <input
                                                        type="number"
                                                        value={targetDex || ''}
                                                        onChange={e => setTargetDex(parseInt(e.target.value, 10) || 0)}
                                                        placeholder="0"
                                                        className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-white font-mono text-center"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[11px] text-slate-400 block mb-1">INT 이상</label>
                                                    <input
                                                        type="number"
                                                        value={targetInt || ''}
                                                        onChange={e => setTargetInt(parseInt(e.target.value, 10) || 0)}
                                                        placeholder="0"
                                                        className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-white font-mono text-center"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[11px] text-slate-400 block mb-1">LUK 이상</label>
                                                    <input
                                                        type="number"
                                                        value={targetLuk || ''}
                                                        onChange={e => setTargetLuk(parseInt(e.target.value, 10) || 0)}
                                                        placeholder="0"
                                                        className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-white font-mono text-center"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[11px] text-emerald-400 block mb-1 font-semibold">올스탯 % 이상</label>
                                                    <input
                                                        type="number"
                                                        value={targetAllStat || ''}
                                                        onChange={e => setTargetAllStat(parseInt(e.target.value, 10) || 0)}
                                                        placeholder="0"
                                                        className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-white font-mono text-center"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[11px] text-amber-400 block mb-1 font-semibold">공격력 이상</label>
                                                    <input
                                                        type="number"
                                                        value={targetAtt || ''}
                                                        onChange={e => setTargetAtt(parseInt(e.target.value, 10) || 0)}
                                                        placeholder="0"
                                                        className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-white font-mono text-center"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[11px] text-sky-400 block mb-1 font-semibold">마력 이상</label>
                                                    <input
                                                        type="number"
                                                        value={targetMagicAtt || ''}
                                                        onChange={e => setTargetMagicAtt(parseInt(e.target.value, 10) || 0)}
                                                        placeholder="0"
                                                        className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-white font-mono text-center"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[11px] text-slate-400 block mb-1">MaxHP 이상</label>
                                                    <input
                                                        type="number"
                                                        value={targetHp || ''}
                                                        onChange={e => setTargetHp(parseInt(e.target.value, 10) || 0)}
                                                        placeholder="0"
                                                        className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-white font-mono text-center"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center pt-1 text-[11px] text-slate-500">
                                                <span>* 단일 스탯과 이중 스탯(STR+DEX 등)이 겹쳐서 합산된 최종 수치 기준</span>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setTargetStr(0); setTargetDex(0); setTargetInt(0); setTargetLuk(0);
                                                        setTargetAllStat(0); setTargetAtt(0); setTargetMagicAtt(0); setTargetHp(0);
                                                    }}
                                                    className="text-slate-400 hover:text-slate-200 underline"
                                                >
                                                    초기화
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* Weapon Goal */
                                <div className="space-y-4">
                                    {/* Attack Tier */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-semibold text-slate-300">
                                                ⚔️ 공격력 / 마력 추옵 목표 등급
                                            </label>
                                            <span className="text-[11px] text-amber-400 font-bold">
                                                {weaponGrade === '7' ? '1추 (최상위 극옵)' : weaponGrade === '6' ? '2추 (준종결 추천)' : weaponGrade === '5' ? '3추 (가성비)' : weaponGrade === '4' ? '4추' : '선택 안 함'}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                            {[
                                                { label: '1추 (7등급)', sub: '최상위 종결', val: '7' },
                                                { label: '2추 (6등급)', sub: '인기 준종결', val: '6' },
                                                { label: '3추 (5등급)', sub: '가성비 육성', val: '5' },
                                                { label: '선택 안 함', sub: '기타 옵션만', val: 'none' }
                                            ].map(item => (
                                                <button
                                                    key={item.val}
                                                    type="button"
                                                    onClick={() => setWeaponGrade(item.val)}
                                                    className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                                                        weaponGrade === item.val
                                                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                                                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                                                    }`}
                                                >
                                                    <div className="text-xs font-black">{item.label}</div>
                                                    <div className="text-[10px] text-slate-500">{item.sub}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Individual Bonus Options */}
                                    <div className="pt-3 border-t border-slate-800 space-y-2.5">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-semibold text-slate-300">
                                                🎁 함께 노릴 덤 보너스 옵션 (선택 사항)
                                            </label>
                                            <span className="text-[11px] text-slate-500">
                                                * 공/마 추옵과 동시에 뜰 목표 옵션을 고릅니다
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {/* Boss Damage */}
                                            <div className="space-y-1 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                                                <label className="text-[11px] font-semibold text-amber-400/90 block">
                                                    보스 몬스터 공격 시 데미지
                                                </label>
                                                <select
                                                    value={minBossDamage}
                                                    onChange={e => setMinBossDamage(e.target.value)}
                                                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-lg p-2 text-xs font-bold text-white focus:outline-none"
                                                >
                                                    <option value="none">선택 안 함</option>
                                                    <option value="14">+14% (1추 극옵)</option>
                                                    <option value="12">+12% 이상 (2추)</option>
                                                    <option value="10">+10% 이상 (3추)</option>
                                                    <option value="8">+8% 이상 (4추)</option>
                                                    <option value="6">+6% 이상 (5추)</option>
                                                </select>
                                            </div>

                                            {/* Damage */}
                                            <div className="space-y-1 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                                                <label className="text-[11px] font-semibold text-orange-400/90 block">
                                                    (일반) 데미지 %
                                                </label>
                                                <select
                                                    value={minDamage}
                                                    onChange={e => setMinDamage(e.target.value)}
                                                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-lg p-2 text-xs font-bold text-white focus:outline-none"
                                                >
                                                    <option value="none">선택 안 함</option>
                                                    <option value="7">+7% (1추 극옵)</option>
                                                    <option value="6">+6% 이상 (2추)</option>
                                                    <option value="5">+5% 이상 (3추)</option>
                                                    <option value="4">+4% 이상 (4추)</option>
                                                    <option value="3">+3% 이상 (5추)</option>
                                                </select>
                                            </div>

                                            {/* All Stat */}
                                            <div className="space-y-1 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                                                <label className="text-[11px] font-semibold text-emerald-400/90 block">
                                                    올스탯 %
                                                </label>
                                                <select
                                                    value={minAllStat}
                                                    onChange={e => setMinAllStat(e.target.value)}
                                                    className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-lg p-2 text-xs font-bold text-white focus:outline-none"
                                                >
                                                    <option value="none">선택 안 함</option>
                                                    <option value="7">+7% (1추 극옵)</option>
                                                    <option value="6">+6% 이상 (2추)</option>
                                                    <option value="5">+5% 이상 (3추)</option>
                                                    <option value="4">+4% 이상 (4추)</option>
                                                    <option value="3">+3% 이상 (5추)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 3. Job Preset Buttons */}
                            <div className="space-y-2 pt-2 border-t border-slate-800">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-semibold text-slate-400">직업별 스탯 환산 공식 (원클릭 세팅)</label>
                                    <button
                                        type="button"
                                        onClick={() => setShowEfficiencyModal(true)}
                                        className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                                    >
                                        <span>⚙️ 스탯 효율 직접 수정</span>
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {Object.entries(JOB_EFFICIENCY_PRESETS).map(([key, preset]) => (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => handleJobChange(key)}
                                            className={`py-2.5 px-2 rounded-xl border text-[11px] sm:text-xs font-bold transition-all text-center sm:text-left truncate ${
                                                selectedJob === key
                                                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-1 ring-amber-500/30'
                                                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                                            }`}
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Calculate Action Button */}
                        <div>
                            <button
                                type="button"
                                onClick={handleCalculate}
                                disabled={loading}
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:via-orange-400 hover:to-rose-400 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-orange-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {loading ? (
                                    <span>계산 중... ⏳</span>
                                ) : (
                                    <>
                                        <span>🚀 추가옵션 기댓값 계산하기</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                {/* Calculation Results Section */}
                <div ref={resultRef} className="space-y-6 pt-4">
                    {result && (
                        <div className="space-y-6">
                            {/* Calculation Top AdBanner */}
                            <div className="w-full">
                                <AdBanner dataAdSlot="8162808816" className="my-2" />
                            </div>

                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                                    <span>🏆 환생의 불꽃별 기댓값 결과</span>
                                    <span className="text-xs font-normal text-slate-400">
                                        ({equipLevel}제 {equipType === 'WEAPON' ? '무기' : '방어구'} · {isBossDrop ? '보스 드랍 4줄' : '일반 장비'} · {aimStat}급 목표)
                                    </span>
                                </h2>
                            </div>

                            {/* Flame Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* 1. Official Meso Reset (2026 New!) */}
                                <div className="bg-gradient-to-b from-amber-950/40 via-slate-900/90 to-slate-950 rounded-2xl p-4 sm:p-5 border border-amber-500/50 shadow-xl space-y-3 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-bl-lg">
                                        2026 최신 공식
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">💰</span>
                                        <div>
                                            <h3 className="font-extrabold text-amber-300 text-sm sm:text-base">메소 재설정</h3>
                                            <p className="text-[10px] text-slate-400">1회 300만 메소 (검환불 확률)</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs text-slate-400">총 메소 기댓값:</span>
                                            <span className="text-base sm:text-lg font-black text-rose-400 font-mono">
                                                {result.results.MESO.isAchievable ? (result.results.MESO.expectedCostText || '0 메소') : '달성 불가'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs text-slate-400">평균 시도 횟수:</span>
                                            <span className="text-sm font-bold text-amber-300 font-mono">
                                                {result.results.MESO.isAchievable && result.results.MESO.expectedAttempts != null
                                                    ? `${result.results.MESO.expectedAttempts.toLocaleString()}회`
                                                    : '달성 불가 (0%)'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs text-slate-400">1회 성공 확률:</span>
                                            <span className="text-xs font-bold text-emerald-400 font-mono">
                                                {result.results.MESO.probabilityPercent}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Abyss Flame */}
                                <div className="bg-gradient-to-b from-purple-950/40 via-slate-900/90 to-slate-950 rounded-2xl p-4 sm:p-5 border border-purple-500/40 shadow-xl space-y-3 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-purple-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-bl-lg">
                                        1추 3% (3배)
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src="/images/flame-abyss.png"
                                            alt="심연의 환생의 불꽃"
                                            width={28}
                                            height={28}
                                            className="rounded object-contain"
                                        />
                                        <div>
                                            <h3 className="font-extrabold text-purple-300 text-sm sm:text-base">심연의 환생의 불꽃</h3>
                                            <p className="text-[10px] text-slate-400">최상위 환불 (5~7등급)</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs text-slate-400">평균 소모 개수:</span>
                                            <span className="text-base sm:text-lg font-black text-purple-300 font-mono">
                                                {result.results.ABYSS.isAchievable && result.results.ABYSS.expectedAttempts != null
                                                    ? `${result.results.ABYSS.expectedAttempts.toLocaleString()}개`
                                                    : '달성 불가 (0%)'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs text-slate-400">1회 성공 확률:</span>
                                            <span className="text-xs font-bold text-emerald-400 font-mono">
                                                {result.results.ABYSS.probabilityPercent}
                                            </span>
                                        </div>
                                        <div className="text-[11px] text-purple-400/80 pt-1">
                                            * 3~4등급 0%, 1추 확률 영환불 대비 3배
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Eternal Flame */}
                                <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">🖤</span>
                                        <div>
                                            <h3 className="font-extrabold text-slate-200 text-sm sm:text-base">검은 환생의 불꽃</h3>
                                            <p className="text-[10px] text-slate-400">기존 영환불 (4~7등급)</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs text-slate-400">평균 소모 개수:</span>
                                            <span className="text-base sm:text-lg font-black text-white font-mono">
                                                {result.results.ETERNAL.isAchievable && result.results.ETERNAL.expectedAttempts != null
                                                    ? `${result.results.ETERNAL.expectedAttempts.toLocaleString()}개`
                                                    : '달성 불가 (0%)'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs text-slate-400">1회 성공 확률:</span>
                                            <span className="text-xs font-bold text-emerald-400 font-mono">
                                                {result.results.ETERNAL.probabilityPercent}
                                            </span>
                                        </div>
                                        <div className="text-[11px] text-slate-500 pt-1">
                                            * 1추 확률 1%, 4등급 29%, 5등급 45%
                                        </div>
                                    </div>
                                </div>

                                {/* 4. Powerful Flame */}
                                <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">🔥</span>
                                        <div>
                                            <h3 className="font-extrabold text-orange-300 text-sm sm:text-base">타오르는 환생의 불꽃</h3>
                                            <p className="text-[10px] text-slate-400">기존 강환불 (3~6등급)</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs text-slate-400">평균 소모 개수:</span>
                                            <span className="text-base sm:text-lg font-black text-orange-300 font-mono">
                                                {result.results.POWERFUL.isAchievable && result.results.POWERFUL.expectedAttempts != null
                                                    ? `${result.results.POWERFUL.expectedAttempts.toLocaleString()}개`
                                                    : '달성 불가 (0%)'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs text-slate-400">1회 성공 확률:</span>
                                            <span className="text-xs font-bold text-emerald-400 font-mono">
                                                {result.results.POWERFUL.probabilityPercent}
                                            </span>
                                        </div>
                                        <div className="text-[11px] text-slate-500 pt-1">
                                            * 7등급(1추) 0%, 최대 2추까지만 출현
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Percentiles Table */}
                            <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <h3 className="text-sm font-bold text-slate-200 flex items-center justify-between">
                                        <span>📊 상위 백분위별 소모 개수 분포 (운 테스트)</span>
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11px] text-slate-500 font-normal">
                                            기하분포 공식 산출
                                        </span>
                                        <span className="sm:hidden text-[10px] text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                                            👉 좌우 스크롤
                                        </span>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                                                <th className="py-2.5 px-3">재설정 수단</th>
                                                <th className="py-2.5 px-3 text-center text-emerald-400 font-bold">상위 25% (대박)</th>
                                                <th className="py-2.5 px-3 text-center text-amber-300 font-bold">상위 50% (평균)</th>
                                                <th className="py-2.5 px-3 text-center text-orange-400 font-bold">상위 75% (중간)</th>
                                                <th className="py-2.5 px-3 text-center text-rose-400 font-bold">상위 90% (천장급)</th>
                                                <th className="py-2.5 px-3 text-center text-purple-400 font-bold">상위 99% (폭망)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800/60 font-mono">
                                            {(['MESO', 'ABYSS', 'ETERNAL', 'POWERFUL'] as FlameType[]).map(key => {
                                                const row = result.results[key];
                                                if (!row || !row.isAchievable) return null;
                                                const unit = key === 'MESO' ? '회' : '개';
                                                return (
                                                    <tr key={key} className="hover:bg-slate-800/40 transition-colors">
                                                        <td className="py-3 px-3 font-sans font-bold text-slate-300 flex items-center gap-1.5">
                                                            <span>{key === 'MESO' ? '💰' : key === 'ABYSS' ? '🌌' : key === 'ETERNAL' ? '🖤' : '🔥'}</span>
                                                            <span>{row.name}</span>
                                                        </td>
                                                        <td className="py-3 px-3 text-center text-slate-200">
                                                            {row.percentiles.p25 != null ? `${row.percentiles.p25.toLocaleString()}${unit}` : '-'}
                                                        </td>
                                                        <td className="py-3 px-3 text-center text-amber-300 font-bold">
                                                            {row.percentiles.p50 != null ? `${row.percentiles.p50.toLocaleString()}${unit}` : '-'}
                                                        </td>
                                                        <td className="py-3 px-3 text-center text-slate-200">
                                                            {row.percentiles.p75 != null ? `${row.percentiles.p75.toLocaleString()}${unit}` : '-'}
                                                        </td>
                                                        <td className="py-3 px-3 text-center text-rose-300 font-bold">
                                                            {row.percentiles.p90 != null ? `${row.percentiles.p90.toLocaleString()}${unit}` : '-'}
                                                        </td>
                                                        <td className="py-3 px-3 text-center text-purple-300 font-bold">
                                                            {row.percentiles.p99 != null ? `${row.percentiles.p99.toLocaleString()}${unit}` : '-'}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Live Appraisal Widget (Placed Below Results for Wide & Comfortable Use) */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                        <div className="flex items-center gap-2.5">
                            <h3 className="text-base sm:text-lg font-black text-slate-100 flex items-center gap-2">
                                <span>🧮 내 장비 추가옵션 급수 판독기</span>
                            </h3>
                            <span className="text-xs text-amber-300 font-bold bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                                {JOB_EFFICIENCY_PRESETS[selectedJob]?.label.split(' ')[0] || '직업'} 기준
                            </span>
                        </div>
                        <p className="text-xs text-slate-400">
                            인게임에서 환불을 돌린 뒤 뜬 초록색 추가옵션을 입력하면 현재 총 몇 급인지 실시간 환산해 드립니다.
                        </p>
                    </div>

                    {/* Result Display Box Banner */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left space-y-0.5 w-full sm:w-auto">
                            <div className="text-xs text-slate-400">내 장비 추가옵션 실시간 환산치</div>
                            <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                {calculatedMyScore} <span className="text-xl font-bold text-slate-300">급</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                            <div className="text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl border bg-slate-900/80 w-full sm:w-auto text-center">
                                {calculatedMyScore >= aimStat ? (
                                    <span className="text-emerald-400 font-bold flex items-center justify-center gap-1.5">
                                        <span>🎉 목표 달성! ({calculatedMyScore} ≥ {aimStat}급)</span>
                                        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full">
                                            스톱(Keep) 추천!
                                        </span>
                                    </span>
                                ) : (
                                    <span className="text-slate-400">
                                        목표({aimStat}급)까지 <span className="text-amber-400 font-bold font-mono">{(aimStat - calculatedMyScore).toFixed(1)}급</span> 부족
                                    </span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setMyStr(0); setMyDex(0); setMyInt(0); setMyLuk(0);
                                    setMyAllStat(0); setMyAtt(0); setMyMagicAtt(0); setMyHp(0);
                                    setMyDamage(0); setMyBossDamage(0);
                                }}
                                className="w-full sm:w-auto py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors text-center"
                            >
                                수치 초기화
                            </button>
                        </div>
                    </div>

                    {/* Input Fields (Wide 8-Column Responsive Grid) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3 text-xs">
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                            <div className="flex justify-between items-center text-[11px] text-slate-400 mb-1">
                                <span className="font-bold">STR</span>
                                <span className="text-[10px] text-slate-500">×{statEfficiency.STR ?? 0}</span>
                            </div>
                            <input
                                type="number"
                                value={myStr || ''}
                                onChange={e => setMyStr(parseInt(e.target.value, 10) || 0)}
                                placeholder="0"
                                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-white font-mono text-center text-sm font-bold focus:outline-none"
                            />
                        </div>
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                            <div className="flex justify-between items-center text-[11px] text-slate-400 mb-1">
                                <span className="font-bold">DEX</span>
                                <span className="text-[10px] text-slate-500">×{statEfficiency.DEX ?? 0}</span>
                            </div>
                            <input
                                type="number"
                                value={myDex || ''}
                                onChange={e => setMyDex(parseInt(e.target.value, 10) || 0)}
                                placeholder="0"
                                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-white font-mono text-center text-sm font-bold focus:outline-none"
                            />
                        </div>
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                            <div className="flex justify-between items-center text-[11px] text-slate-400 mb-1">
                                <span className="font-bold">INT</span>
                                <span className="text-[10px] text-slate-500">×{statEfficiency.INT ?? 0}</span>
                            </div>
                            <input
                                type="number"
                                value={myInt || ''}
                                onChange={e => setMyInt(parseInt(e.target.value, 10) || 0)}
                                placeholder="0"
                                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-white font-mono text-center text-sm font-bold focus:outline-none"
                            />
                        </div>
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                            <div className="flex justify-between items-center text-[11px] text-slate-400 mb-1">
                                <span className="font-bold">LUK</span>
                                <span className="text-[10px] text-slate-500">×{statEfficiency.LUK ?? 0}</span>
                            </div>
                            <input
                                type="number"
                                value={myLuk || ''}
                                onChange={e => setMyLuk(parseInt(e.target.value, 10) || 0)}
                                placeholder="0"
                                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-white font-mono text-center text-sm font-bold focus:outline-none"
                            />
                        </div>
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-emerald-500/30">
                            <div className="flex justify-between items-center text-[11px] text-emerald-400 mb-1">
                                <span className="font-bold">올스탯 %</span>
                                <span className="text-[10px] font-bold">×{statEfficiency['ALL %'] ?? 0}</span>
                            </div>
                            <input
                                type="number"
                                value={myAllStat || ''}
                                onChange={e => setMyAllStat(parseInt(e.target.value, 10) || 0)}
                                placeholder="0"
                                className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-lg p-2 text-emerald-300 font-mono text-center text-sm font-bold focus:outline-none"
                            />
                        </div>
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-amber-500/30">
                            <div className="flex justify-between items-center text-[11px] text-amber-400 mb-1">
                                <span className="font-bold">공격력</span>
                                <span className="text-[10px] font-bold">×{statEfficiency.ATTACK ?? 0}</span>
                            </div>
                            <input
                                type="number"
                                value={myAtt || ''}
                                onChange={e => setMyAtt(parseInt(e.target.value, 10) || 0)}
                                placeholder="0"
                                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-amber-300 font-mono text-center text-sm font-bold focus:outline-none"
                            />
                        </div>
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-sky-500/30">
                            <div className="flex justify-between items-center text-[11px] text-sky-400 mb-1">
                                <span className="font-bold">마력</span>
                                <span className="text-[10px] font-bold">×{statEfficiency.MAGIC_ATTACK ?? 0}</span>
                            </div>
                            <input
                                type="number"
                                value={myMagicAtt || ''}
                                onChange={e => setMyMagicAtt(parseInt(e.target.value, 10) || 0)}
                                placeholder="0"
                                className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 rounded-lg p-2 text-sky-300 font-mono text-center text-sm font-bold focus:outline-none"
                            />
                        </div>
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                            <div className="flex justify-between items-center text-[11px] text-slate-400 mb-1">
                                <span className="font-bold">MaxHP</span>
                                <span className="text-[10px] text-slate-500">×{statEfficiency.HP ?? 0}</span>
                            </div>
                            <input
                                type="number"
                                value={myHp || ''}
                                onChange={e => setMyHp(parseInt(e.target.value, 10) || 0)}
                                placeholder="0"
                                className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-lg p-2 text-white font-mono text-center text-sm font-bold focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Custom Stat Efficiency Modal */}
            {showEfficiencyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                                <span>⚙️ 스탯 환산 효율 커스텀 설정</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => setShowEfficiencyModal(false)}
                                className="text-slate-400 hover:text-slate-200 text-lg leading-none"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="text-xs text-slate-400">
                            내 캐릭터 스펙에 맞춰 주스탯 1 기준 각 옵션의 환산 비율을 직접 조정할 수 있습니다.
                        </p>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                                <label className="text-[11px] text-slate-400 block mb-1">STR 효율</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={statEfficiency.STR ?? 0}
                                    onChange={e => setStatEfficiency({ ...statEfficiency, STR: parseFloat(e.target.value) || 0 })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] text-slate-400 block mb-1">DEX 효율</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={statEfficiency.DEX ?? 0}
                                    onChange={e => setStatEfficiency({ ...statEfficiency, DEX: parseFloat(e.target.value) || 0 })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] text-slate-400 block mb-1">INT 효율</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={statEfficiency.INT ?? 0}
                                    onChange={e => setStatEfficiency({ ...statEfficiency, INT: parseFloat(e.target.value) || 0 })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] text-slate-400 block mb-1">LUK 효율</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={statEfficiency.LUK ?? 0}
                                    onChange={e => setStatEfficiency({ ...statEfficiency, LUK: parseFloat(e.target.value) || 0 })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] text-slate-400 block mb-1">올스탯 1%당 주스탯</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    value={statEfficiency['ALL %'] ?? 0}
                                    onChange={e => setStatEfficiency({ ...statEfficiency, 'ALL %': parseFloat(e.target.value) || 0 })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] text-slate-400 block mb-1">공격력 1당 주스탯</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    value={statEfficiency.ATTACK ?? 0}
                                    onChange={e => setStatEfficiency({ ...statEfficiency, ATTACK: parseFloat(e.target.value) || 0 })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] text-slate-400 block mb-1">마력 1당 주스탯</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    value={statEfficiency.MAGIC_ATTACK ?? 0}
                                    onChange={e => setStatEfficiency({ ...statEfficiency, MAGIC_ATTACK: parseFloat(e.target.value) || 0 })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] text-slate-400 block mb-1">MaxHP 효율 (데벤져)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={statEfficiency.HP ?? 0}
                                    onChange={e => setStatEfficiency({ ...statEfficiency, HP: parseFloat(e.target.value) || 0 })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2 border-t border-slate-800">
                            <button
                                type="button"
                                onClick={() => setShowEfficiencyModal(false)}
                                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                            >
                                적용하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
