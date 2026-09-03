"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PotentialCubeType, CUBE_DEFINITIONS } from '@/lib/cube_db';

type GoalType = 'GRADE_UP' | 'OPTION' | 'GRADE_UP_AND_OPTION';
type PotentialMethod = 'POTENTIAL' | 'ADDI_POTENTIAL';
type Grade = 'RARE' | 'EPIC' | 'UNIQUE' | 'LEGENDARY';
type TargetMode = 'lines' | 'stats';

// 옵션 종류 우선순위 (중요 옵션이 상단에 노출)
const OPTION_GROUP_PRIORITY: Record<string, number> = {
    '보스': 0,
    '방어율': 1,
    '공격력 : +\\d+%': 2,
    '마력 : +\\d+%': 3,
    '데미지': 4,
    '크리티컬 데미지': 5,
    '크리티컬 확률': 6,
    '올스탯': 7,
    'STR : +\\d+%': 8,
    'DEX : +\\d+%': 9,
    'INT : +\\d+%': 10,
    'LUK : +\\d+%': 11,
    'HP %': 12,
    '공격력 : +\\d+$': 13,
    '마력 : +\\d+$': 14,
    '재사용': 15,
    'STR : +\\d+$': 20,
    'DEX : +\\d+$': 21,
    'INT : +\\d+$': 22,
    'LUK : +\\d+$': 23,
};

function getOptionGroup(name: string): number {
    const patterns = [
        [/보스\s*몬스터/, 0],
        [/방어율\s*무시/, 1],
        [/^공격력\s*:\s*\+\d+%/, 2],
        [/^마력\s*:\s*\+\d+%/, 3],
        [/^데미지/, 4],
        [/크리티컬\s*데미지/, 5],
        [/크리티컬\s*확률/, 6],
        [/올스탯/, 7],
        [/^STR\s*:\s*\+\d+%/, 8],
        [/^DEX\s*:\s*\+\d+%/, 9],
        [/^INT\s*:\s*\+\d+%/, 10],
        [/^LUK\s*:\s*\+\d+%/, 11],
        [/최대\s*HP\s*:\s*\+\d+%/, 12],
        [/최대\s*MP\s*:\s*\+\d+%/, 12],
        [/^공격력\s*:\s*\+\d+$/, 13],
        [/^마력\s*:\s*\+\d+$/, 14],
        [/재사용\s*대기시간/, 15],
        [/아이템\s*드롭/, 16],
        [/메소\s*획득/, 17],
        [/^STR\s*:\s*\+\d+$/, 20],
        [/^DEX\s*:\s*\+\d+$/, 21],
        [/^INT\s*:\s*\+\d+$/, 22],
        [/^LUK\s*:\s*\+\d+$/, 23],
        [/캐릭터\s*기준/, 24],
        [/쓸만한/, 30],
        [/피격/, 31],
    ] as const;
    for (const [re, priority] of patterns) {
        if ((re as RegExp).test(name)) return priority as number;
    }
    return 99;
}

function getOptionValue(name: string): number {
    const m = name.match(/\+\s*(\d+(?:\.\d+)?)/);
    return m ? parseFloat(m[1]) : 0;
}

function sortAndGroupOptions(options: string[]): string[] {
    return [...options].sort((a, b) => {
        const ga = getOptionGroup(a);
        const gb = getOptionGroup(b);
        if (ga !== gb) return ga - gb;
        // 같은 그룹 내에서는 수치 내림차순
        return getOptionValue(b) - getOptionValue(a);
    });
}


interface CalculationResult {
    success: boolean;
    goalType: GoalType;
    cubeType: PotentialCubeType;
    cubeName: string;
    isMiracleTime: boolean;
    useCeiling: boolean;
    probability: number;
    probabilityPercent: string;
    expectedAttempts: number;
    costPerAttempt: number;
    costPerAttemptText: string;
    rollingCostMeso: number;
    rollingCostText: string;
    gradeUpAttempts: number;
    gradeUpAttemptsExact: number;
    gradeUpPercentile: number;
    gradeUpCostMeso: number;
    gradeUpCostText: string;
    gradeUpMaxCeilCostMeso: number;
    gradeUpMaxCeilCostText: string;
    gradeUpSteps: {
        from: string;
        to: string;
        rate: number;
        ceil: number;
        avgAttempts: number;
        exactAvgAttempts: number;
        percentile: number;
        costPerTry: number;
        costPerTryText: string;
        avgCost: number;
        avgCostText: string;
        intAttemptsCost: number;
        intAttemptsCostText: string;
        maxCeilCost: number;
        maxCeilCostText: string;
        cubeName: string;
    }[];
    grandTotalAttempts: number;
    grandTotalMeso: number;
    grandTotalText: string;
    combinations?: {
        line1: string;
        line2: string;
        line3: string;
        probability: number;
        probabilityPercent: string;
        sharePercent: string;
    }[];
    availableOptions: string[];
    currentGradeOptions: { name: string; probability: number }[];
    lowerGradeOptions: { name: string; probability: number }[];
}

const EQUIP_LIST = [
    { label: '무기', value: '무기', icon: '⚔️' },
    { label: '엠블렘', value: '엠블렘', icon: '🛡️' },
    { label: '보조무기', value: '보조무기(포스실드, 소울링 제외)', icon: '🗡️' },
    { label: '포스실드/소울링', value: '포스실드, 소울링', icon: '🔮' },
    { label: '방패', value: '방패', icon: '🛡️' },
    { label: '모자', value: '모자', icon: '🎩' },
    { label: '상의', value: '상의', icon: '👕' },
    { label: '하의', value: '하의', icon: '👖' },
    { label: '한벌옷', value: '한벌옷', icon: '🥋' },
    { label: '신발', value: '신발', icon: '👞' },
    { label: '장갑', value: '장갑', icon: '🧤' },
    { label: '망토', value: '망토', icon: '🧣' },
    { label: '벨트', value: '벨트', icon: '🎗️' },
    { label: '어깨장식', value: '어깨장식', icon: '🥋' },
    { label: '얼굴장식', value: '얼굴장식', icon: '🎭' },
    { label: '눈장식', value: '눈장식', icon: '👓' },
    { label: '귀고리', value: '귀고리', icon: '👂' },
    { label: '반지', value: '반지', icon: '💍' },
    { label: '펜던트', value: '펜던트', icon: '📿' },
    { label: '기계심장', value: '기계심장', icon: '❤️' },
];

const LEVEL_LIST = [
    { label: '150제 이하 (카루타)', value: 150 },
    { label: '160제 (앱솔/여명)', value: 160 },
    { label: '200제 (아케인/칠흑)', value: 200 },
    { label: '250제 (에테르넬)', value: 250 },
];

const GRADE_LIST: { label: string; value: Grade; color: string; activeBg: string }[] = [
    { label: '레어', value: 'RARE', color: 'text-blue-400', activeBg: 'bg-blue-600/30 border-blue-400 text-blue-300 ring-1 ring-blue-400' },
    { label: '에픽', value: 'EPIC', color: 'text-purple-400', activeBg: 'bg-purple-600/30 border-purple-400 text-purple-300 ring-1 ring-purple-400' },
    { label: '유니크', value: 'UNIQUE', color: 'text-amber-400', activeBg: 'bg-amber-600/30 border-amber-400 text-amber-300 ring-1 ring-amber-400' },
    { label: '레전드리', value: 'LEGENDARY', color: 'text-emerald-400', activeBg: 'bg-emerald-600/30 border-emerald-400 text-emerald-300 ring-1 ring-emerald-400' },
];

const POTENTIAL_CUBES = [
    { id: 'MESO_RESET', name: '메소 재설정', badge: '블랙 큐브 동일 · 공식 메소', img: '/images/cubes/meso_cube.png' },
    { id: 'GOLD_CUBE', name: '골드 큐브', badge: '명장 큐브 동일 · 최대 레전', img: '/images/cubes/gold_cube.png' },
    { id: 'SILVER_CUBE', name: '실버 큐브', badge: '장인 큐브 동일 · 최대 유니크', img: '/images/cubes/silver_cube.png' },
    { id: 'OCCULT_CUBE', name: '수상한 큐브', badge: '수큐 (보스 드롭) · 최대 에픽', img: '/images/cubes/occult_cube.png' },
    { id: 'RED_CUBE', name: '레드 큐브', badge: '캐시 큐브 · 최대 레전', img: '/images/cubes/red_cube.png' },
];

const ADDI_CUBES = [
    { id: 'ADDI_MESO_RESET', name: '메소 재설정(에디)', badge: '공식 메소 · 천장 보장 (최대 레전)', img: '/images/cubes/white_addi_cube.png' },
    { id: 'ADDI_WHITE_CUBE', name: '화이트 에디셔널 큐브', badge: '화에큐 · 천장 보장 (최대 레전)', img: '/images/cubes/white_addi_cube.png' },
    { id: 'ADDI_NORMAL_CUBE', name: '에디셔널 큐브', badge: '구 에디큐브 · 천장 보장 (최대 레전)', img: '/images/cubes/addi_cube.png' },
    { id: 'ADDI_OCCULT_CUBE', name: '수상한 에디셔널 큐브', badge: '수에큐 (보스 드롭) · 최대 에픽', img: '/images/cubes/addi_occult_cube.png' },
];

export default function CubeCalculatorPage() {
    // 1. Goal & Type State
    const [goalType, setGoalType] = useState<GoalType>('GRADE_UP');
    const [method, setMethod] = useState<PotentialMethod>('POTENTIAL');
    const [cubeType, setCubeType] = useState<PotentialCubeType>('MESO_RESET');

    // 2. Equip & Grade State
    const [equip, setEquip] = useState<string>('무기');
    const [level, setLevel] = useState<number>(200);
    const [startGrade, setStartGrade] = useState<Grade>('UNIQUE');
    const [targetGrade, setTargetGrade] = useState<Grade>('LEGENDARY');

    // 3. Special Settings State
    const [isMiracleTime, setIsMiracleTime] = useState<boolean>(false);
    const [useCeiling, setUseCeiling] = useState<boolean>(true);

    // 4. Target Options State
    const [mode, setMode] = useState<TargetMode>('lines');
    const [line1, setLine1] = useState<string>('');
    const [line2, setLine2] = useState<string>('');
    const [line3, setLine3] = useState<string>('');
    const [unordered, setUnordered] = useState<boolean>(true);
    const [targetStats, setTargetStats] = useState<Record<string, number>>({});

    // 5. DB options & Calculation Results
    const [availableOptions, setAvailableOptions] = useState<string[]>([]);
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showOptionPool, setShowOptionPool] = useState<boolean>(false);

    const resultRef = useRef<HTMLDivElement>(null);

    // Update cubeType default when method changes
    useEffect(() => {
        if (method === 'POTENTIAL') {
            setCubeType('MESO_RESET');
        } else {
            setCubeType('ADDI_MESO_RESET');
        }
    }, [method]);

    // OPTION 모드 전환 시: startGrade = targetGrade (현재 등급만 사용)
    useEffect(() => {
        if (goalType === 'OPTION') {
            setStartGrade(targetGrade);
        }
    }, [goalType]);


    // Fetch available options when equip / level / targetGrade changes
    const fetchOptions = useCallback(async () => {
        try {
            const res = await fetch(`/api/calculator/cube?method=${method}&equip=${encodeURIComponent(equip)}&level=${level}&grade=${targetGrade}`);
            if (res.ok) {
                const data = await res.json();
                setAvailableOptions(sortAndGroupOptions(data.availableOptions || []));
            }
        } catch (e) {
            console.error(e);
        }
    }, [method, equip, level, targetGrade]);

    useEffect(() => {
        fetchOptions();
    }, [fetchOptions]);

    // Recalculate expectation on button click
    const handleCalculate = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/calculator/cube', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    goalType,
                    method,
                    cubeType,
                    isMiracleTime,
                    useCeiling,
                    equip,
                    level,
                    startGrade,
                    targetGrade,
                    mode,
                    line1,
                    line2,
                    line3,
                    unordered,
                    targetStats
                })
            });
            if (res.ok) {
                const data: CalculationResult = await res.json();
                setResult(data);
                setTimeout(() => {
                    if (resultRef.current) {
                        resultRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        } catch (e) {
            console.error('Calculation error:', e);
        } finally {
            setLoading(false);
        }
    };

    const handleResetLines = () => {
        setLine1('');
        setLine2('');
        setLine3('');
    };

    const handleResetStats = () => {
        setTargetStats({});
    };

    const handleStatChange = (key: string, val: number) => {
        setTargetStats(prev => ({
            ...prev,
            [key]: val
        }));
    };

    const activeCubeList = method === 'POTENTIAL' ? POTENTIAL_CUBES : ADDI_CUBES;
    const currentCubeDef = CUBE_DEFINITIONS[cubeType] || CUBE_DEFINITIONS.MESO_RESET;

    return (
        <div className="min-h-screen bg-[#0a0d14] text-slate-100 py-6 sm:py-10 px-3 sm:px-6 lg:px-8 pb-28 sm:pb-16">
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">

                {/* Page Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                        🎲 큐브 & 잠재능력 기댓값 계산기
                    </h1>
                </div>

                {/* Section 1: Goal Type & Potential Method */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-5">

                    {/* Goal Type Tabs */}
                    <div>
                        <label className="block text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            ① 계산 목표 타입 (Goal Type)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => setGoalType('GRADE_UP')}
                                className={`min-h-[46px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                                    goalType === 'GRADE_UP'
                                        ? 'bg-blue-600/30 border-blue-400 text-blue-300 shadow-lg ring-1 ring-blue-400'
                                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <span>📈 등급 상승 (잠재 올리기)</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setGoalType('OPTION')}
                                className={`min-h-[46px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                                    goalType === 'OPTION'
                                        ? 'bg-amber-600/30 border-amber-400 text-amber-300 shadow-lg ring-1 ring-amber-400'
                                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <span>🎯 옵션 뽑기 (현재 등급)</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setGoalType('GRADE_UP_AND_OPTION')}
                                className={`min-h-[46px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                                    goalType === 'GRADE_UP_AND_OPTION'
                                        ? 'bg-emerald-600/30 border-emerald-400 text-emerald-300 shadow-lg ring-1 ring-emerald-400'
                                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <span>🏆 등급 상승 + 옵션 뽑기</span>
                            </button>
                        </div>
                    </div>

                    {/* Potential Type (일반 vs 에디셔널) */}
                    <div>
                        <label className="block text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            ② 잠재능력 분류
                        </label>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                            <button
                                type="button"
                                onClick={() => setMethod('POTENTIAL')}
                                className={`min-h-[46px] py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                                    method === 'POTENTIAL'
                                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 ring-1 ring-emerald-400'
                                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <span>🔮 일반 잠재능력</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setMethod('ADDI_POTENTIAL')}
                                className={`min-h-[46px] py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                                    method === 'ADDI_POTENTIAL'
                                        ? 'bg-purple-600/30 border-purple-500 text-purple-300 ring-1 ring-purple-400'
                                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            >
                                <span>✨ 에디셔널 잠재능력</span>
                            </button>
                        </div>
                    </div>

                    {/* Reset Means (Cube Type Selector with official Image Icons) */}
                    <div>
                        <label className="block text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            ③ 재설정 수단 (큐브 / 메소 방식 선택)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                            {activeCubeList.map((c) => (
                                <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => setCubeType(c.id as PotentialCubeType)}
                                    className={`min-h-[60px] py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-left flex items-center gap-3 cursor-pointer ${
                                        cubeType === c.id
                                            ? 'bg-emerald-600/30 border-emerald-400 text-emerald-300 ring-1 ring-emerald-400 shadow-md shadow-emerald-950/40'
                                            : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                    }`}
                                >
                                    <div className="w-9 h-9 relative shrink-0 bg-slate-900/90 rounded-lg p-1 border border-slate-800 flex items-center justify-center">
                                        <img
                                            src={c.img}
                                            alt={c.name}
                                            className="w-7 h-7 object-contain"
                                            onError={(e) => {
                                                (e.currentTarget as HTMLElement).style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-bold text-xs sm:text-sm text-white">{c.name}</div>
                                        <div className="text-[11px] text-emerald-400 font-medium truncate mt-0.5">{c.badge}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Special Settings: Miracle Time & Guarantee Ceiling */}
                    <div className="pt-2 border-t border-slate-800/80">
                        <label className="block text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            ④ 이벤트 & 보정 설정
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {/* Miracle Time Toggle */}
                            <label className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
                                isMiracleTime
                                    ? 'bg-amber-500/20 border-amber-400/80 text-amber-200 ring-1 ring-amber-400'
                                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">⭐</span>
                                    <div>
                                        <div className="font-bold text-xs sm:text-sm">미라클 타임 (등급업 2배)</div>
                                        <div className="text-[10px] text-slate-400">모든 큐브의 등급업 확률 2배 적용</div>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={isMiracleTime}
                                    onChange={(e) => setIsMiracleTime(e.target.checked)}
                                    className="w-5 h-5 rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-amber-500 cursor-pointer"
                                />
                            </label>

                            {/* Guarantee Ceiling Toggle */}
                            <label className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
                                useCeiling
                                    ? 'bg-cyan-500/20 border-cyan-400/80 text-cyan-200 ring-1 ring-cyan-400'
                                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">🛡️</span>
                                    <div>
                                        <div className="font-bold text-xs sm:text-sm">넥슨 공식 천장 보장 적용</div>
                                        <div className="text-[10px] text-slate-400">천장 횟수 도달 시 100% 확정 등급업</div>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={useCeiling}
                                    onChange={(e) => setUseCeiling(e.target.checked)}
                                    className="w-5 h-5 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                                />
                            </label>
                        </div>
                    </div>

                </div>

                {/* Section 2: Equipment & Grade Settings */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-5">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                        {/* Equip Select */}
                        <div>
                            <label className="block text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                ⑤ 장비 부위
                            </label>
                            <div className="relative">
                                <select
                                    value={equip}
                                    onChange={(e) => setEquip(e.target.value)}
                                    className="w-full min-h-[46px] bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base sm:text-sm appearance-none pr-9 cursor-pointer"
                                >
                                    {EQUIP_LIST.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.icon} {item.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                                    ▼
                                </div>
                            </div>
                        </div>

                        {/* Level Select */}
                        <div>
                            <label className="block text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                ⑥ 장비 요구 레벨
                            </label>
                            <div className="relative">
                                <select
                                    value={level}
                                    onChange={(e) => setLevel(parseInt(e.target.value, 10))}
                                    className="w-full min-h-[46px] bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base sm:text-sm appearance-none pr-9 cursor-pointer"
                                >
                                    {LEVEL_LIST.map((lv) => (
                                        <option key={lv.value} value={lv.value}>
                                            {lv.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                                    ▼
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grade Selector: OPTION 모드는 현재 등급 1개만, 나머지는 시작+목표 2개 */}
                    {goalType === 'OPTION' ? (
                        /* 옵션 뽑기 모드: 현재 등급 1개만 */
                        <div className="pt-3 border-t border-slate-800/80">
                            <label className="block text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                ⑦ 현재 장비 등급
                            </label>
                            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                                {GRADE_LIST.map((g) => (
                                    <button
                                        key={g.value}
                                        type="button"
                                        onClick={() => { setStartGrade(g.value); setTargetGrade(g.value); }}
                                        className={`min-h-[40px] py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                                            targetGrade === g.value
                                                ? g.activeBg
                                                : 'bg-slate-950/70 border-slate-800 text-slate-500 hover:text-slate-300'
                                        }`}
                                    >
                                        {g.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* 등급업 / 복합 모드: 시작 등급 + 목표 등급 2개 */
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800/80">
                            {/* Start Grade */}
                            <div>
                                <label className="block text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                    ⑦ 현재 장비 등급 (시작 등급)
                                </label>
                                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                                    {GRADE_LIST.map((g) => (
                                        <button
                                            key={g.value}
                                            type="button"
                                            onClick={() => setStartGrade(g.value)}
                                            className={`min-h-[40px] py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                                                startGrade === g.value
                                                    ? g.activeBg
                                                    : 'bg-slate-950/70 border-slate-800 text-slate-500 hover:text-slate-300'
                                            }`}
                                        >
                                            {g.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Target Grade */}
                            <div>
                                <label className="block text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                    ⑧ 목표 등급
                                </label>
                                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                                    {GRADE_LIST.map((g) => (
                                        <button
                                            key={g.value}
                                            type="button"
                                            onClick={() => setTargetGrade(g.value)}
                                            className={`min-h-[40px] py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                                                targetGrade === g.value
                                                    ? g.activeBg
                                                    : 'bg-slate-950/70 border-slate-800 text-slate-500 hover:text-slate-300'
                                            }`}
                                        >
                                            {g.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Section 3: Target Option Settings (Hidden if goalType === 'GRADE_UP') */}
                {goalType !== 'GRADE_UP' && (
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-5 animate-fadeIn">

                        {/* Mode Toggle Header */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 sm:pb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm sm:text-base font-bold text-white">🎯 목표 옵션 조건 설정</span>
                            </div>
                            <div className="flex w-full sm:w-auto rounded-xl bg-slate-950 p-1 border border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setMode('lines')}
                                    className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                                        mode === 'lines' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    3줄 옵션 직접 선택
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMode('stats')}
                                    className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                                        mode === 'stats' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    목표 스탯 합산 설정
                                </button>
                            </div>
                        </div>

                        {/* Mode A: 3-Lines Selection */}
                        {mode === 'lines' && (
                            <div className="space-y-3.5 sm:space-y-4">
                                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={unordered}
                                            onChange={(e) => setUnordered(e.target.checked)}
                                            className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                                        />
                                        <span className="text-slate-200 font-medium text-xs sm:text-sm">순서 무관 (3줄 중 포함 시 성공)</span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={handleResetLines}
                                        className="text-xs text-rose-400/90 hover:text-rose-300 font-medium underline transition-colors px-1 py-0.5 cursor-pointer"
                                    >
                                        옵션 초기화
                                    </button>
                                </div>

                                {/* Line 1 */}
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                                        <span>1번 줄 목표 옵션</span>
                                    </div>
                                    <div className="relative">
                                        <select
                                            value={line1}
                                            onChange={(e) => setLine1(e.target.value)}
                                            className="w-full min-h-[44px] bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none pr-8 truncate cursor-pointer"
                                        >
                                            <option value="">(선택 안 함 / 아무거나)</option>
                                            {availableOptions.map((opt, i) => (
                                                <option key={i} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                                            ▼
                                        </div>
                                    </div>
                                </div>

                                {/* Line 2 */}
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                                        <span>2번 줄 목표 옵션</span>
                                    </div>
                                    <div className="relative">
                                        <select
                                            value={line2}
                                            onChange={(e) => setLine2(e.target.value)}
                                            className="w-full min-h-[44px] bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none pr-8 truncate cursor-pointer"
                                        >
                                            <option value="">(선택 안 함 / 아무거나)</option>
                                            {availableOptions.map((opt, i) => (
                                                <option key={i} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                                            ▼
                                        </div>
                                    </div>
                                </div>

                                {/* Line 3 */}
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                                        <span className="w-2 h-2 rounded-full bg-amber-600" />
                                        <span>3번 줄 목표 옵션</span>
                                    </div>
                                    <div className="relative">
                                        <select
                                            value={line3}
                                            onChange={(e) => setLine3(e.target.value)}
                                            className="w-full min-h-[44px] bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none pr-8 truncate cursor-pointer"
                                        >
                                            <option value="">(선택 안 함 / 아무거나)</option>
                                            {availableOptions.map((opt, i) => (
                                                <option key={i} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                                            ▼
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Mode B: Stats Selection */}
                        {mode === 'stats' && (
                            <div className="space-y-3.5 sm:space-y-4">
                                <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                                    <span className="text-xs text-slate-300">3줄 스탯 총합 최소치를 입력하세요. (올스탯% 자동 합산)</span>
                                    <button
                                        type="button"
                                        onClick={handleResetStats}
                                        className="text-xs text-rose-400/90 hover:text-rose-300 font-medium underline transition-colors shrink-0 ml-2 cursor-pointer"
                                    >
                                        스탯 초기화
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                                    {/* BOSS_DAMAGE */}
                                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                                        <label className="text-[11px] sm:text-xs text-slate-400 block mb-1">보스 몬스터 공격 시 데미지 (%)</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min="0"
                                            step="5"
                                            placeholder="예: 70"
                                            value={targetStats['BOSS_DAMAGE'] || ''}
                                            onChange={(e) => handleStatChange('BOSS_DAMAGE', parseInt(e.target.value || '0', 10))}
                                            className="w-full min-h-[40px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    {/* ATTACK % */}
                                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                                        <label className="text-[11px] sm:text-xs text-slate-400 block mb-1">공격력 (%)</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min="0"
                                            step="3"
                                            placeholder="예: 21"
                                            value={targetStats['ATTACK %'] || ''}
                                            onChange={(e) => handleStatChange('ATTACK %', parseInt(e.target.value || '0', 10))}
                                            className="w-full min-h-[40px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    {/* MAGIC_ATTACK % */}
                                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                                        <label className="text-[11px] sm:text-xs text-slate-400 block mb-1">마력 (%)</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min="0"
                                            step="3"
                                            placeholder="예: 21"
                                            value={targetStats['MAGIC_ATTACK %'] || ''}
                                            onChange={(e) => handleStatChange('MAGIC_ATTACK %', parseInt(e.target.value || '0', 10))}
                                            className="w-full min-h-[40px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    {/* IGNORE_DEFENSE */}
                                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                                        <label className="text-[11px] sm:text-xs text-slate-400 block mb-1">몬스터 방어율 무시 (%)</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min="0"
                                            step="5"
                                            placeholder="예: 40"
                                            value={targetStats['IGNORE_DEFENSE'] || ''}
                                            onChange={(e) => handleStatChange('IGNORE_DEFENSE', parseInt(e.target.value || '0', 10))}
                                            className="w-full min-h-[40px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    {/* STR % */}
                                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                                        <label className="text-[11px] sm:text-xs text-slate-400 block mb-1">STR (%) 합산</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min="0"
                                            step="3"
                                            placeholder="예: 21"
                                            value={targetStats['STR %'] || ''}
                                            onChange={(e) => handleStatChange('STR %', parseInt(e.target.value || '0', 10))}
                                            className="w-full min-h-[40px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    {/* DEX % */}
                                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                                        <label className="text-[11px] sm:text-xs text-slate-400 block mb-1">DEX (%) 합산</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min="0"
                                            step="3"
                                            placeholder="예: 21"
                                            value={targetStats['DEX %'] || ''}
                                            onChange={(e) => handleStatChange('DEX %', parseInt(e.target.value || '0', 10))}
                                            className="w-full min-h-[40px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    {/* INT % */}
                                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                                        <label className="text-[11px] sm:text-xs text-slate-400 block mb-1">INT (%) 합산</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min="0"
                                            step="3"
                                            placeholder="예: 21"
                                            value={targetStats['INT %'] || ''}
                                            onChange={(e) => handleStatChange('INT %', parseInt(e.target.value || '0', 10))}
                                            className="w-full min-h-[40px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    {/* LUK % */}
                                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                                        <label className="text-[11px] sm:text-xs text-slate-400 block mb-1">LUK (%) 합산</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min="0"
                                            step="3"
                                            placeholder="예: 21"
                                            value={targetStats['LUK %'] || ''}
                                            onChange={(e) => handleStatChange('LUK %', parseInt(e.target.value || '0', 10))}
                                            className="w-full min-h-[40px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    {/* CRITICAL_DAMAGE */}
                                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                                        <label className="text-[11px] sm:text-xs text-slate-400 block mb-1">크리티컬 데미지 (%) [장갑]</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min="0"
                                            step="8"
                                            placeholder="예: 8 or 16"
                                            value={targetStats['CRITICAL_DAMAGE'] || ''}
                                            onChange={(e) => handleStatChange('CRITICAL_DAMAGE', parseInt(e.target.value || '0', 10))}
                                            className="w-full min-h-[40px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    {/* COOL_DOWN */}
                                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                                        <label className="text-[11px] sm:text-xs text-slate-400 block mb-1">재사용 대기시간 감소 (초) [모자]</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min="0"
                                            step="1"
                                            placeholder="예: 2 or 3"
                                            value={targetStats['COOL_DOWN'] || ''}
                                            onChange={(e) => handleStatChange('COOL_DOWN', parseInt(e.target.value || '0', 10))}
                                            className="w-full min-h-[40px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    {/* ITEM_DROP */}
                                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                                        <label className="text-[11px] sm:text-xs text-slate-400 block mb-1">아이템 드롭률 (%) [장신구]</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min="0"
                                            step="20"
                                            placeholder="예: 20 or 40"
                                            value={targetStats['ITEM_DROP'] || ''}
                                            onChange={(e) => handleStatChange('ITEM_DROP', parseInt(e.target.value || '0', 10))}
                                            className="w-full min-h-[40px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    {/* MESO_OBTAIN */}
                                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                                        <label className="text-[11px] sm:text-xs text-slate-400 block mb-1">메소 획득량 (%) [장신구]</label>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min="0"
                                            step="20"
                                            placeholder="예: 20"
                                            value={targetStats['MESO_OBTAIN'] || ''}
                                            onChange={(e) => handleStatChange('MESO_OBTAIN', parseInt(e.target.value || '0', 10))}
                                            className="w-full min-h-[40px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                )}

                {/* Calculate Button */}
                <div className="pt-1">
                    <button
                        type="button"
                        onClick={handleCalculate}
                        disabled={loading}
                        className="w-full min-h-[54px] bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-xl shadow-emerald-950/50 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 cursor-pointer border border-emerald-400/30"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>기댓값 정밀 연산 중...</span>
                            </>
                        ) : (
                            <>
                                <span className="text-xl">🚀</span>
                                <span>{goalType === 'GRADE_UP' ? '등급업 기댓값 계산하기' : '기댓값 계산하기'}</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Calculation Results Card */}
                {result && (
                    <div ref={resultRef} className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-5 sm:space-y-6 animate-fadeIn">

                        {/* Top Highlights Header with active cube image */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                            <h3 className="text-base sm:text-xl font-black text-white flex items-center gap-2.5">
                                <div className="w-7 h-7 relative shrink-0 bg-slate-950 rounded-lg p-0.5 border border-slate-800 flex items-center justify-center">
                                    <img
                                        src={currentCubeDef.image}
                                        alt={result.cubeName}
                                        className="w-5 h-5 object-contain"
                                        onError={(e) => {
                                            (e.currentTarget as HTMLElement).style.display = 'none';
                                        }}
                                    />
                                </div>
                                <span>{result.cubeName} 기댓값 결과</span>
                                {result.isMiracleTime && (
                                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] sm:text-xs font-bold border border-amber-500/40 animate-pulse">
                                        ⭐ 미라클 타임 2배
                                    </span>
                                )}
                            </h3>
                            {loading && (
                                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                                    <div className="w-3.5 h-3.5 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
                                    <span className="hidden sm:inline">계산 중...</span>
                                </div>
                            )}
                        </div>

                        {/* 3 Metric Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            {/* Card 1 */}
                            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 sm:p-4 text-center space-y-1">
                                <div className="text-[11px] sm:text-xs text-slate-400">
                                    {result.goalType === 'GRADE_UP'
                                        ? `평균 (상위 ${result.gradeUpPercentile}%)`
                                        : '3줄 조합 성공 확률'}
                                </div>
                                <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                                    {result.goalType === 'GRADE_UP'
                                        ? `${result.gradeUpAttempts.toLocaleString()}회`
                                        : result.probabilityPercent}
                                </div>
                                <div className="text-[10px] sm:text-[11px] text-slate-500">
                                    {result.goalType === 'GRADE_UP'
                                        ? (result.useCeiling && result.gradeUpSteps[0]?.ceil ? `천장 ${result.gradeUpSteps[0].ceil}개 보장 반영` : '평균 시도 횟수')
                                        : '(1회 시도당 성공 확률)'}
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 sm:p-4 text-center space-y-1">
                                <div className="text-[11px] sm:text-xs text-slate-400">
                                    {result.goalType === 'GRADE_UP' ? '1회 재설정 비용' : '옵션 띄우기 평균 횟수'}
                                </div>
                                <div className="text-2xl sm:text-3xl font-black text-amber-400">
                                    {result.goalType === 'GRADE_UP'
                                        ? result.costPerAttemptText
                                        : `${result.expectedAttempts.toLocaleString()}회`}
                                </div>
                                <div className="text-[10px] sm:text-[11px] text-slate-500">
                                    {result.goalType === 'GRADE_UP' ? `[${startGrade}] ${level}제 기준` : `1회당 ${result.costPerAttemptText}`}
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 sm:p-4 text-center space-y-1">
                                <div className="text-[11px] sm:text-xs text-slate-400">
                                    {result.goalType === 'GRADE_UP' ? '감정 비용 (평균)' : '총 메소 기댓값 (완성 평균)'}
                                </div>
                                <div className="text-xl sm:text-2xl font-black text-rose-400">
                                    {result.goalType === 'GRADE_UP' && result.gradeUpSteps[0]
                                        ? result.gradeUpSteps[0].intAttemptsCostText
                                        : result.grandTotalText}
                                </div>
                                <div className="text-[10px] sm:text-[11px] text-slate-500">
                                    {result.goalType === 'GRADE_UP' && result.gradeUpSteps[0]
                                        ? `상위 ${result.gradeUpPercentile}%: ${result.gradeUpSteps[0].avgCostText}`
                                        : (result.gradeUpCostMeso > 0 ? '등급업 + 옵션 띄우기 합산' : '옵션 띄우기 기댓값')}
                                </div>
                            </div>
                        </div>

                        {/* Cost Breakdown Table */}
                        <div className="bg-slate-950/90 rounded-xl p-3.5 sm:p-4 border border-slate-800 space-y-3 text-xs sm:text-sm">
                            <div className="font-bold text-slate-300 flex items-center justify-between text-xs sm:text-sm">
                                <span>💰 세부 비용 및 등급업 안내</span>
                            </div>

                            <div className="space-y-2 text-slate-400">
                                <div className="flex justify-between py-1 border-b border-slate-800/60">
                                    <span>• 1회 시행 시 목표 달성 확률:</span>
                                    <span className="font-semibold text-emerald-400">
                                        {result.goalType === 'GRADE_UP' && result.gradeUpSteps[0]
                                            ? `${result.gradeUpSteps[0].rate.toFixed(4)}%`
                                            : result.probabilityPercent}
                                    </span>
                                </div>

                                <div className="flex justify-between py-1 border-b border-slate-800/60">
                                    <span>• 1회 재설정 비용:</span>
                                    <span className="font-semibold text-white">{result.costPerAttemptText}</span>
                                </div>

                                {result.goalType !== 'GRADE_UP' && (
                                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                                        <span>• 옵션 띄우기 소모 메소:</span>
                                        <span className="font-semibold text-amber-300">{result.rollingCostText} ({result.expectedAttempts.toLocaleString()}회)</span>
                                    </div>
                                )}

                                {result.gradeUpSteps && result.gradeUpSteps.length > 0 && (
                                    <div className="pt-2 space-y-2">
                                        <div className="text-xs font-bold text-emerald-400">📈 등급업 단계별 확률 & 천장 안내:</div>
                                        {result.gradeUpSteps.map((step, idx) => (
                                            <div key={idx} className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 space-y-1.5">
                                                <div className="flex justify-between font-bold text-slate-200 text-xs sm:text-sm">
                                                    <span>[{step.from} ➔ {step.to}] ({step.cubeName})</span>
                                                    <span className="text-emerald-400 font-mono">1회 확률 {step.rate.toFixed(4)}%</span>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 text-[11px] sm:text-xs text-slate-400 gap-1 pt-1 border-t border-slate-800/60">
                                                    <div>
                                                        • 평균 시도 횟수: <strong className="text-amber-300">{step.avgAttempts}회</strong> (상위 {step.percentile}%)
                                                    </div>
                                                    <div>
                                                        • 1회 재설정 비용: <strong className="text-slate-200">{step.costPerTryText}</strong>
                                                    </div>
                                                    <div>
                                                        • 감정 비용 (정수): <strong className="text-emerald-400">{step.intAttemptsCostText}</strong>
                                                    </div>
                                                    <div>
                                                        • 상위 {step.percentile}% 기댓값: <strong className="text-rose-300">{step.avgCostText}</strong>
                                                    </div>
                                                    {step.ceil > 0 ? (
                                                        <div className="sm:col-span-2">
                                                            • 천장: <strong className="text-cyan-400">{step.ceil}회 보장</strong> (최대 {step.maxCeilCostText})
                                                        </div>
                                                    ) : (
                                                        <div className="text-slate-500 sm:col-span-2">• 천장 없음</div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex justify-between py-1 border-t border-slate-800 text-slate-300 font-bold">
                                            <span>• 등급업 총 감정 비용:</span>
                                            <span className="text-emerald-400">{result.gradeUpSteps[0]?.intAttemptsCostText || result.gradeUpCostText} ({result.gradeUpAttempts}회)</span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between py-2 border-t border-slate-700 text-xs sm:text-sm font-extrabold text-white">
                                    <span>🏆 최종 소모 메소 기댓값:</span>
                                    <span className="text-rose-400 text-sm sm:text-base">
                                        {result.goalType === 'GRADE_UP' && result.gradeUpSteps[0]
                                            ? result.gradeUpSteps[0].intAttemptsCostText
                                            : result.grandTotalText}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Combinations Breakdown (mesu.live style) */}
                        {result.combinations && result.combinations.length > 0 && (
                            <div className="bg-slate-950/90 rounded-xl p-3.5 sm:p-4 border border-slate-800 space-y-3 text-xs sm:text-sm">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800/80 pb-2.5">
                                    <div className="font-bold text-slate-200 flex items-center gap-1.5 text-xs sm:text-sm">
                                        <span className="text-base">🎯</span>
                                        <span>목표 달성 세부 조합 내역</span>
                                        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold border border-emerald-500/30">
                                            총 {result.combinations.length}개 조합
                                        </span>
                                    </div>
                                    <span className="text-[11px] text-slate-400">
                                        * 상위 이탈옵 포함 유효 조합별 출현 확률 및 점유율
                                    </span>
                                </div>

                                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                                    {result.combinations.map((comb, idx) => {
                                        const isTop = idx === 0;
                                        const shareVal = parseFloat(comb.sharePercent);
                                        return (
                                            <div
                                                key={idx}
                                                className={`p-2.5 sm:p-3 rounded-lg border transition-colors ${
                                                    isTop
                                                        ? 'bg-emerald-950/20 border-emerald-500/30 hover:bg-emerald-950/30'
                                                        : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900/90'
                                                }`}
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                    {/* 3 lines of options */}
                                                    <div className="space-y-1 flex-1">
                                                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                                                            <span className="text-[10px] font-mono text-slate-500 w-5 shrink-0">1줄</span>
                                                            <span className="font-medium text-slate-200">{comb.line1}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                                                            <span className="text-[10px] font-mono text-slate-500 w-5 shrink-0">2줄</span>
                                                            <span className="font-medium text-slate-200">{comb.line2}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                                                            <span className="text-[10px] font-mono text-slate-500 w-5 shrink-0">3줄</span>
                                                            <span className="font-medium text-slate-200">{comb.line3}</span>
                                                        </div>
                                                    </div>

                                                    {/* Probability & Share */}
                                                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 border-t sm:border-t-0 pt-1 sm:pt-0 border-slate-800/60 gap-1 min-w-[130px]">
                                                        <div className="text-right">
                                                            <div className="text-xs font-mono font-bold text-emerald-400">
                                                                {comb.probabilityPercent}
                                                            </div>
                                                            <div className="text-[10px] text-slate-400">
                                                                당첨 점유율 <strong className="text-amber-300 font-mono">{comb.sharePercent}</strong>
                                                            </div>
                                                        </div>
                                                        {/* Gauge Bar */}
                                                        <div className="w-24 sm:w-28 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${
                                                                    isTop ? 'bg-emerald-400' : 'bg-indigo-400'
                                                                }`}
                                                                style={{ width: `${Math.max(2, Math.min(100, shareVal))}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Option Pool Toggle */}
                        {result.goalType !== 'GRADE_UP' && (
                            <div className="pt-1">
                                <button
                                    type="button"
                                    onClick={() => setShowOptionPool(!showOptionPool)}
                                    className="w-full min-h-[44px] py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-bold border border-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <span>{showOptionPool ? '▲ 출현 가능 옵션 및 확률표 접기' : `▼ [${equip} ${targetGrade}] 출현 가능 옵션 및 공식 확률표 보기 (${result.currentGradeOptions?.length || 0}개)`}</span>
                                </button>

                                {showOptionPool && result.currentGradeOptions && (
                                    <div className="mt-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5 max-h-60 overflow-y-auto text-xs">
                                        <div className="text-slate-400 font-bold mb-2 text-[11px] sm:text-xs">📌 현재 등급 풀 옵션 목록 (1번줄 100%, 2번줄 20%, 3번줄 5% 가중치)</div>
                                        {result.currentGradeOptions.map((opt, i) => (
                                            <div key={i} className="flex justify-between py-1 border-b border-slate-900 text-slate-300 text-[11px] sm:text-xs">
                                                <span className="pr-2">{opt.name}</span>
                                                <span className="text-emerald-400 font-mono shrink-0">{(opt.probability * 100).toFixed(4)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                )}

                {/* Empty State Prompt */}
                {!result && !loading && (
                    <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-2">
                        <div className="text-2xl">🎯</div>
                        <div className="text-sm sm:text-base font-bold text-slate-300">
                            목표 타입과 옵션을 설정한 후 위 <strong className="text-emerald-400">[🚀 등급업 기댓값 계산하기]</strong> 버튼을 눌러주세요.
                        </div>
                        <div className="text-xs text-slate-500">
                            재설정 수단별 등급업 확률, 미라클 타임 2배, 천장 보장 시스템을 즉시 반영하여 계산합니다.
                        </div>
                    </div>
                )}

            </div>

            {/* Sticky Mobile Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-4 py-2.5 shadow-2xl flex items-center justify-between">
                {result ? (
                    <>
                        <div className="space-y-0.5">
                            <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                <span>{result.goalType === 'GRADE_UP' ? '평균 횟수:' : '확률:'}</span>
                                <strong className="text-emerald-400 font-bold">
                                    {result.goalType === 'GRADE_UP' ? `${result.gradeUpAttempts}회` : result.probabilityPercent}
                                </strong>
                            </div>
                            <div className="text-xs font-black text-rose-400 flex items-center gap-1">
                                <span>감정비용:</span>
                                <span className="text-sm">
                                    {result.goalType === 'GRADE_UP' && result.gradeUpSteps[0]
                                        ? result.gradeUpSteps[0].intAttemptsCostText
                                        : result.grandTotalText}
                                </span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleCalculate}
                            disabled={loading}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-lg shadow-emerald-950/50 cursor-pointer"
                        >
                            {loading ? '연산 중...' : '다시 계산 🚀'}
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={handleCalculate}
                        disabled={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 rounded-xl text-sm shadow-lg shadow-emerald-950/50 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                        {loading ? '기댓값 연산 중...' : '🚀 등급업 기댓값 계산하기'}
                    </button>
                )}
            </div>

        </div>
    );
}

function formatMeso(meso: number): string {
    if (!meso || meso <= 0) return '0 메소';
    
    const gyeong = Math.floor(meso / 10000000000000000);
    const jo = Math.floor((meso % 10000000000000000) / 1000000000000);
    const eok = Math.floor((meso % 1000000000000) / 100000000);
    const man = Math.floor((meso % 100000000) / 10000);
    const won = Math.floor(meso % 10000);

    const parts: string[] = [];
    if (gyeong > 0) parts.push(`${gyeong.toLocaleString()}경`);
    if (jo > 0) parts.push(`${jo.toLocaleString()}조`);
    if (eok > 0) parts.push(`${eok.toLocaleString()}억`);
    if (man > 0 && gyeong === 0) parts.push(`${man.toLocaleString()}만`);
    if (won > 0 && gyeong === 0 && jo === 0 && eok === 0 && man === 0) parts.push(`${won.toLocaleString()}`);

    return parts.length > 0 ? `${parts.join(' ')} 메소` : `${meso.toLocaleString()} 메소`;
}
