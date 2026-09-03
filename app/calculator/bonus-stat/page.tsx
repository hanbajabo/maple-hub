'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
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
    const [aimStat, setAimStat] = useState<number>(100);
    const [weaponGrade, setWeaponGrade] = useState<string>('none'); // 'none', '7', '6', '5'

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
                    aimStat,
                    weaponGrade: weaponGrade !== 'none' ? parseInt(weaponGrade, 10) : undefined,
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
                        <Link href="/" prefetch={false} className="text-xl sm:text-2xl hover:opacity-80 transition-opacity">
                            🍁
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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Settings Form (8 cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* 1. Equipment Type & Boss Drop */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-xl">
                            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
                                <span>🛡️ 1. 장비 기본 설정</span>
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Equip Type */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-400">장비 종류</label>
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

                                {/* Boss Drop Toggle */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-semibold text-slate-400">보스 드랍 장비 여부</label>
                                        <span className="text-[11px] text-amber-400">
                                            {isBossDrop ? '4줄 확정 (3~7등급)' : '1~4줄 랜덤 (1~5등급)'}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsBossDrop(!isBossDrop)}
                                        className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                                            isBossDrop
                                                ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                                                : 'bg-slate-950 border-slate-800 text-slate-400'
                                        }`}
                                    >
                                        <span>👑 보스 드랍 장비 (카루타, 앱솔, 아케인 등)</span>
                                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${isBossDrop ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                                            {isBossDrop ? '✓' : ''}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Equip Level Fast Selector */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                                    <span>장비 레벨 (Level)</span>
                                    <span className="text-slate-500 text-[11px]">현재: {equipLevel}제</span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {[
                                        { label: '150제 (카루타)', val: 150 },
                                        { label: '160제 (앱솔)', val: 160 },
                                        { label: '200제 (아케인)', val: 200 },
                                        { label: '250제 (에테르넬)', val: 250 }
                                    ].map(item => (
                                        <button
                                            key={item.val}
                                            type="button"
                                            onClick={() => setEquipLevel(item.val)}
                                            className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all ${
                                                equipLevel === item.val
                                                    ? 'bg-slate-800 border-amber-500 text-amber-300 shadow-sm'
                                                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
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
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-semibold text-slate-400">목표 스탯 환산치 (급수)</label>
                                        <span className="text-xs text-amber-400 font-bold">목표: {aimStat}급 이상</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <input
                                            type="number"
                                            value={aimStat}
                                            onChange={e => setAimStat(Math.max(0, parseInt(e.target.value, 10) || 0))}
                                            placeholder="예: 100"
                                            className="flex-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-base font-bold text-white focus:outline-none"
                                        />
                                        <div className="flex items-center gap-1.5">
                                            {[80, 100, 120, 140].map(val => (
                                                <button
                                                    key={val}
                                                    type="button"
                                                    onClick={() => setAimStat(val)}
                                                    className={`px-3 py-3 rounded-xl border text-xs font-bold transition-colors ${
                                                        aimStat === val
                                                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                                                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                                                    }`}
                                                >
                                                    {val}급
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-slate-500">
                                        * 아래 스탯 효율 기준으로 주스탯, 부스탯, 올스탯%, 공격력을 합산한 점수입니다.
                                    </p>
                                </div>
                            ) : (
                                /* Weapon Goal */
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-400">무기 공격력/마력 추옵 등급</label>
                                        <select
                                            value={weaponGrade}
                                            onChange={e => setWeaponGrade(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-3 text-sm font-bold text-white focus:outline-none"
                                        >
                                            <option value="none">선택 안 함 (스탯 환산치만)</option>
                                            <option value="7">1추 (7등급, 최상위)</option>
                                            <option value="6">2추 (6등급)</option>
                                            <option value="5">3추 (5등급)</option>
                                            <option value="4">4추 (4등급)</option>
                                            <option value="3">5추 (3등급)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-400">추가 스탯 환산치 (보뎀/뎀/올탯/스탯)</label>
                                        <input
                                            type="number"
                                            value={aimStat}
                                            onChange={e => setAimStat(Math.max(0, parseInt(e.target.value, 10) || 0))}
                                            placeholder="0"
                                            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-3 text-sm font-bold text-white focus:outline-none"
                                        />
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
                                            className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                                                selectedJob === key
                                                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
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

                    {/* Right Column: Live Item Stat Score Evaluator Widget (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                                    <span>🧮 내 장비 추가옵션 급수 계산기</span>
                                </h3>
                                <span className="text-[10px] text-slate-400">실시간 환산</span>
                            </div>

                            {/* Result Display Box */}
                            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center space-y-1">
                                <div className="text-xs text-slate-400">현재 입력된 추가옵션 환산치</div>
                                <div className="text-3xl font-black bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
                                    {calculatedMyScore} <span className="text-lg font-bold text-slate-300">급</span>
                                </div>
                                <div className="text-[11px] text-slate-500">
                                    {calculatedMyScore >= aimStat ? (
                                        <span className="text-emerald-400 font-bold">🎉 목표 달성! ({calculatedMyScore} ≥ {aimStat})</span>
                                    ) : (
                                        <span>목표까지 {(aimStat - calculatedMyScore).toFixed(1)}급 부족</span>
                                    )}
                                </div>
                            </div>

                            {/* Input Fields */}
                            <div className="space-y-2.5 text-xs">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-[11px] text-slate-400 block mb-1">STR</label>
                                        <input
                                            type="number"
                                            value={myStr || ''}
                                            onChange={e => setMyStr(parseInt(e.target.value, 10) || 0)}
                                            placeholder="0"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-center"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] text-slate-400 block mb-1">DEX</label>
                                        <input
                                            type="number"
                                            value={myDex || ''}
                                            onChange={e => setMyDex(parseInt(e.target.value, 10) || 0)}
                                            placeholder="0"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-center"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] text-slate-400 block mb-1">INT</label>
                                        <input
                                            type="number"
                                            value={myInt || ''}
                                            onChange={e => setMyInt(parseInt(e.target.value, 10) || 0)}
                                            placeholder="0"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-center"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] text-slate-400 block mb-1">LUK</label>
                                        <input
                                            type="number"
                                            value={myLuk || ''}
                                            onChange={e => setMyLuk(parseInt(e.target.value, 10) || 0)}
                                            placeholder="0"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-center"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] text-slate-400 block mb-1">올스탯 %</label>
                                        <input
                                            type="number"
                                            value={myAllStat || ''}
                                            onChange={e => setMyAllStat(parseInt(e.target.value, 10) || 0)}
                                            placeholder="0"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-center"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] text-slate-400 block mb-1">공격력</label>
                                        <input
                                            type="number"
                                            value={myAtt || ''}
                                            onChange={e => setMyAtt(parseInt(e.target.value, 10) || 0)}
                                            placeholder="0"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-center"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] text-slate-400 block mb-1">마력</label>
                                        <input
                                            type="number"
                                            value={myMagicAtt || ''}
                                            onChange={e => setMyMagicAtt(parseInt(e.target.value, 10) || 0)}
                                            placeholder="0"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-center"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] text-slate-400 block mb-1">MaxHP</label>
                                        <input
                                            type="number"
                                            value={myHp || ''}
                                            onChange={e => setMyHp(parseInt(e.target.value, 10) || 0)}
                                            placeholder="0"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-center"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setMyStr(0); setMyDex(0); setMyInt(0); setMyLuk(0);
                                    setMyAllStat(0); setMyAtt(0); setMyMagicAtt(0); setMyHp(0);
                                    setMyDamage(0); setMyBossDamage(0);
                                }}
                                className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-semibold transition-colors"
                            >
                                수치 초기화
                            </button>
                        </div>
                    </div>
                </div>

                {/* Calculation Results Section */}
                <div ref={resultRef} className="space-y-6 pt-4">
                    {result && (
                        <div className="space-y-6">
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
                                <div className="bg-gradient-to-b from-amber-950/40 via-slate-900/90 to-slate-950 rounded-2xl p-5 border border-amber-500/50 shadow-xl space-y-3 relative overflow-hidden">
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
                                                {result.results.MESO.expectedCostText || '0 메소'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs text-slate-400">평균 시도 횟수:</span>
                                            <span className="text-sm font-bold text-amber-300 font-mono">
                                                {result.results.MESO.expectedAttempts.toLocaleString()}회
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
                                <div className="bg-gradient-to-b from-purple-950/40 via-slate-900/90 to-slate-950 rounded-2xl p-5 border border-purple-500/40 shadow-xl space-y-3 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-purple-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-bl-lg">
                                        1추 3% (3배)
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">🌌</span>
                                        <div>
                                            <h3 className="font-extrabold text-purple-300 text-sm sm:text-base">심연의 환생의 불꽃</h3>
                                            <p className="text-[10px] text-slate-400">최상위 환불 (5~7등급)</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs text-slate-400">평균 소모 개수:</span>
                                            <span className="text-base sm:text-lg font-black text-purple-300 font-mono">
                                                {result.results.ABYSS.expectedAttempts.toLocaleString()}개
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
                                <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
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
                                                {result.results.ETERNAL.expectedAttempts.toLocaleString()}개
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
                                <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
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
                                                {result.results.POWERFUL.expectedAttempts === Infinity
                                                    ? '달성 불가 (0%)'
                                                    : `${result.results.POWERFUL.expectedAttempts.toLocaleString()}개`}
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
                            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
                                <h3 className="text-sm font-bold text-slate-200 flex items-center justify-between">
                                    <span>📊 상위 백분위별 소모 개수 분포 (운 테스트)</span>
                                    <span className="text-[11px] text-slate-500 font-normal">
                                        기하분포(Geometric Distribution) 공식 산출
                                    </span>
                                </h3>

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
                                                if (row.expectedAttempts === Infinity) return null;
                                                return (
                                                    <tr key={key} className="hover:bg-slate-800/40 transition-colors">
                                                        <td className="py-3 px-3 font-sans font-bold text-slate-300 flex items-center gap-1.5">
                                                            <span>{key === 'MESO' ? '💰' : key === 'ABYSS' ? '🌌' : key === 'ETERNAL' ? '🖤' : '🔥'}</span>
                                                            <span>{row.name}</span>
                                                        </td>
                                                        <td className="py-3 px-3 text-center text-slate-200">
                                                            {row.percentiles.p25.toLocaleString()}{key === 'MESO' ? '회' : '개'}
                                                        </td>
                                                        <td className="py-3 px-3 text-center text-amber-300 font-bold">
                                                            {row.percentiles.p50.toLocaleString()}{key === 'MESO' ? '회' : '개'}
                                                        </td>
                                                        <td className="py-3 px-3 text-center text-slate-200">
                                                            {row.percentiles.p75.toLocaleString()}{key === 'MESO' ? '회' : '개'}
                                                        </td>
                                                        <td className="py-3 px-3 text-center text-rose-300 font-bold">
                                                            {row.percentiles.p90.toLocaleString()}{key === 'MESO' ? '회' : '개'}
                                                        </td>
                                                        <td className="py-3 px-3 text-center text-purple-300 font-bold">
                                                            {row.percentiles.p99.toLocaleString()}{key === 'MESO' ? '회' : '개'}
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
            </main>

            {/* Custom Stat Efficiency Modal */}
            {showEfficiencyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl">
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
