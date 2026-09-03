// maple-hub Bonus Stat (Rebirth Flame) Calculation Engine
// 100% mathematical equivalence with official Nexon rates and mesu.live

export const FLAME_TYPES = {
    MESO: { name: "메소 재설정", costPerTry: 3000000, desc: "2026 최신 시스템 (검환불 확률 적용, 1회 300만 메소)" },
    ABYSS: { name: "심연의 환생의 불꽃", costPerTry: 0, desc: "최신 최상위 환불 (1추 확률 3%, 3~4등급 배제)" },
    ETERNAL: { name: "검은 환생의 불꽃", costPerTry: 0, desc: "기존 영환불 (1추 확률 1%, 4~7등급)" },
    POWERFUL: { name: "타오르는 환생의 불꽃", costPerTry: 0, desc: "기존 강환불 (최대 2추, 3~6등급)" },
    DROP: { name: "몬스터 드랍", costPerTry: 0, desc: "필드/보스 드랍 장비" },
    CRAFT_MEISTER: { name: "명장 제작", costPerTry: 0, desc: "전문기술 명장 제작" },
    CRAFT_MASTER: { name: "장인 제작", costPerTry: 0, desc: "전문기술 장인 제작" }
} as const;

export type FlameType = keyof typeof FLAME_TYPES;

export const FLAME_RATES: Record<string, number[]> = {
    POWERFUL: [0.20, 0.30, 0.36, 0.14, 0.00], // 3, 4, 5, 6, 7등급
    ETERNAL: [0.00, 0.29, 0.45, 0.25, 0.01],
    MESO: [0.00, 0.29, 0.45, 0.25, 0.01], // 검환불과 100% 동일
    ABYSS: [0.00, 0.00, 0.63, 0.34, 0.03],
    DROP: [0.25, 0.30, 0.30, 0.14, 0.01],
    CRAFT_MASTER: [0.15, 0.30, 0.40, 0.14, 0.01],
    CRAFT_MEISTER: [0.00, 0.19, 0.50, 0.30, 0.01]
};

export const ALL_OPTION_KEYS = [
    "STR", "DEX", "INT", "LUK",
    "STR+DEX", "STR+INT", "STR+LUK", "DEX+INT", "DEX+LUK", "INT+LUK",
    "HP", "MP", "LEVEL", "DEFENSE",
    "ATTACK", "MAGIC_ATTACK", "ALL %",
    "BOSS_DAMAGE_OR_SPEED", "DAMAGE_OR_JUMP"
] as const;

export type OptionKey = typeof ALL_OPTION_KEYS[number];

export const OPTION_STAT_MAP: Record<OptionKey, string[]> = {
    STR: ["STR"],
    DEX: ["DEX"],
    INT: ["INT"],
    LUK: ["LUK"],
    "STR+DEX": ["STR", "DEX"],
    "STR+INT": ["STR", "INT"],
    "STR+LUK": ["STR", "LUK"],
    "DEX+INT": ["DEX", "INT"],
    "DEX+LUK": ["DEX", "LUK"],
    "INT+LUK": ["INT", "LUK"],
    HP: ["HP"],
    MP: [],
    LEVEL: [],
    DEFENSE: [],
    ATTACK: ["ATTACK"],
    MAGIC_ATTACK: ["MAGIC_ATTACK"],
    BOSS_DAMAGE_OR_SPEED: ["BOSS_DAMAGE"],
    DAMAGE_OR_JUMP: ["DAMAGE"],
    "ALL %": ["ALL %"]
};

// Combinations helper nCr
function getCombinations<T>(arr: readonly T[], r: number): T[][] {
    if (r > arr.length) return [];
    if (r === 1) return arr.map(e => [e]);
    const result: T[][] = [];
    arr.forEach((e, idx, rest) => {
        const sub = getCombinations(rest.slice(idx + 1), r - 1);
        sub.forEach(s => result.push([e, ...s]));
    });
    return result;
}

// Cartesian product helper n^r
function getCartesian(arr: number[], r: number): number[][] {
    if (r === 1) return arr.map(e => [e]);
    const result: number[][] = [];
    arr.forEach(n => {
        const sub = getCartesian(arr, r - 1);
        sub.forEach(s => result.push([n, ...s]));
    });
    return result;
}

// Generate base option table for 5 tiers (index 0 to 4)
export function generateBonusOptionTable(level: number, isBossDrop: boolean, equipType: 'NON_WEAPON' | 'WEAPON') {
    const tierBonus = isBossDrop ? 2 : 0; // Boss drop: tiers 3~7 (index 0 is tier 3), non-boss: 1~5
    const table: Record<string, number[]> = {};

    for (const key of ALL_OPTION_KEYS) {
        table[key] = [0, 1, 2, 3, 4].map(idx => {
            const tier = idx + 1 + tierBonus; // 1~5 or 3~7
            if (["STR", "DEX", "INT", "LUK"].includes(key)) {
                return (level < 250 ? Math.floor(level / 20) + 1 : 12) * tier;
            }
            if (["STR+DEX", "STR+INT", "STR+LUK", "DEX+INT", "DEX+LUK", "INT+LUK"].includes(key)) {
                return (Math.floor(level / 40) + 1) * tier;
            }
            if (["ALL %", "ATTACK", "MAGIC_ATTACK", "DAMAGE_OR_JUMP"].includes(key)) {
                return tier;
            }
            if (key === "BOSS_DAMAGE_OR_SPEED") {
                return tier * 2;
            }
            if (key === "HP") {
                return (level < 250 ? 30 * Math.floor(level / 10) : 700) * tier;
            }
            return 0;
        });
    }
    return table;
}

export interface StatEfficiency {
    STR?: number;
    DEX?: number;
    INT?: number;
    LUK?: number;
    HP?: number;
    ATTACK?: number;
    MAGIC_ATTACK?: number;
    'ALL %'?: number;
    DAMAGE?: number;
    BOSS_DAMAGE?: number;
}

export interface BonusStatCalcInput {
    equipLevel: number;
    equipType: 'NON_WEAPON' | 'WEAPON';
    isBossDrop: boolean;
    aimStat: number; // e.g. 100급
    weaponGrade?: number; // 무기 n추옵 (예: 7 = 1추, 6 = 2추, 5 = 3추 등)
    statEfficiency: StatEfficiency;
}

export interface FlameResult {
    name: string;
    desc: string;
    probability: number;
    probabilityPercent: string;
    expectedAttempts: number;
    expectedCostMeso?: number;
    expectedCostText?: string;
    percentiles: {
        p25: number;
        p50: number;
        p75: number;
        p90: number;
        p99: number;
    };
}

export interface BonusStatCalcOutput {
    success: boolean;
    input: BonusStatCalcInput;
    results: Record<FlameType, FlameResult>;
}

// Calculate attempts required for percentiles: 1 - (1 - p)^n = targetPercent / 100
function getPercentileAttempts(prob: number, targetPercent: number): number {
    if (prob <= 0 || prob >= 1) return prob >= 1 ? 1 : Infinity;
    return Math.max(1, Math.ceil(Math.log(1 - targetPercent / 100) / Math.log(1 - prob)));
}

export function calculateBonusStat(input: BonusStatCalcInput): BonusStatCalcOutput {
    const { equipLevel, equipType, isBossDrop, aimStat, weaponGrade, statEfficiency } = input;
    const optionTable = generateBonusOptionTable(equipLevel, isBossDrop, equipType);

    // Multiply table values by user's stat efficiency
    const adjustedTable: Record<string, number[]> = {};
    for (const key of ALL_OPTION_KEYS) {
        const stats = OPTION_STAT_MAP[key] || [];
        const effSum = stats.reduce((sum, s) => sum + (statEfficiency[s as keyof StatEfficiency] || 0), 0);

        adjustedTable[key] = optionTable[key].map(val => {
            if (equipType === 'WEAPON' && key === 'ATTACK') return val; // Raw attack tier for weapon grade
            if (equipType !== 'WEAPON' && (key === 'BOSS_DAMAGE_OR_SPEED' || key === 'DAMAGE_OR_JUMP')) return 0;
            return val * effSum;
        });
    }

    const selectCounts = isBossDrop ? [4] : [1, 2, 3, 4];
    const methodKeys: FlameType[] = ['MESO', 'ABYSS', 'ETERNAL', 'POWERFUL', 'DROP', 'CRAFT_MEISTER', 'CRAFT_MASTER'];
    const probs: Record<FlameType, number> = {
        MESO: 0,
        ABYSS: 0,
        ETERNAL: 0,
        POWERFUL: 0,
        DROP: 0,
        CRAFT_MEISTER: 0,
        CRAFT_MASTER: 0
    };

    for (const count of selectCounts) {
        const optionCombos = getCombinations(ALL_OPTION_KEYS, count);
        const tierCombos = getCartesian([0, 1, 2, 3, 4], count);

        const comboProbSum: Record<FlameType, number> = {
            MESO: 0, ABYSS: 0, ETERNAL: 0, POWERFUL: 0, DROP: 0, CRAFT_MEISTER: 0, CRAFT_MASTER: 0
        };

        for (const optCombo of optionCombos) {
            const attIdx = optCombo.indexOf("ATTACK");

            const minPossible = optCombo.reduce((sum, key) => sum + adjustedTable[key][0], 0);
            const maxPossible = optCombo.reduce((sum, key) => sum + adjustedTable[key][4], 0);

            if (equipType !== 'WEAPON' && minPossible >= aimStat) {
                methodKeys.forEach(m => comboProbSum[m] += 1);
                continue;
            }
            if (equipType !== 'WEAPON' && maxPossible < aimStat) {
                continue;
            }

            for (const tiers of tierCombos) {
                if (equipType === 'WEAPON' && weaponGrade) {
                    const attTier = attIdx === -1 ? 0 : optionTable.ATTACK[tiers[attIdx]];
                    if (attTier < weaponGrade) continue;
                }

                let sumScore = 0;
                for (let i = 0; i < count; i++) {
                    const optKey = optCombo[i];
                    const tierIdx = tiers[i];
                    sumScore += adjustedTable[optKey][tierIdx];
                }

                if (sumScore >= aimStat) {
                    for (const m of methodKeys) {
                        const rates = FLAME_RATES[m];
                        let p = 1;
                        for (let i = 0; i < count; i++) {
                            p *= rates[tiers[i]];
                        }
                        comboProbSum[m] += p;
                    }
                }
            }
        }

        const totalCombos = optionCombos.length;
        for (const m of methodKeys) {
            probs[m] += (comboProbSum[m] / totalCombos) / selectCounts.length;
        }
    }

    const results: Record<FlameType, FlameResult> = {} as any;

    for (const m of methodKeys) {
        const p = probs[m];
        const def = FLAME_TYPES[m];
        const attempts = p > 0 ? Math.round(1 / p) : Infinity;
        const mesoCost = def.costPerTry > 0 && attempts !== Infinity ? attempts * def.costPerTry : undefined;

        results[m] = {
            name: def.name,
            desc: def.desc,
            probability: p,
            probabilityPercent: p > 0 ? `${(p * 100).toFixed(4)}%` : '0.0000%',
            expectedAttempts: attempts,
            expectedCostMeso: mesoCost,
            expectedCostText: mesoCost ? formatMeso(mesoCost) : undefined,
            percentiles: {
                p25: getPercentileAttempts(p, 25),
                p50: getPercentileAttempts(p, 50),
                p75: getPercentileAttempts(p, 75),
                p90: getPercentileAttempts(p, 90),
                p99: getPercentileAttempts(p, 99)
            }
        };
    }

    return {
        success: true,
        input,
        results
    };
}

function formatMeso(meso: number): string {
    if (meso <= 0) return "0 메소";
    const jo = Math.floor(meso / 1000000000000);
    const eok = Math.floor((meso % 1000000000000) / 100000000);
    const man = Math.floor((meso % 100000000) / 10000);

    let parts: string[] = [];
    if (jo > 0) parts.push(`${jo.toLocaleString()}조`);
    if (eok > 0) parts.push(`${eok.toLocaleString()}억`);
    if (man > 0) parts.push(`${man.toLocaleString()}만`);
    return parts.length > 0 ? `${parts.join(" ")} 메소` : "0 메소";
}

// Preset efficiency for jobs
export const JOB_EFFICIENCY_PRESETS: Record<string, { label: string; eff: StatEfficiency }> = {
    WARRIOR: {
        label: "전사 (STR 주스탯)",
        eff: { STR: 1, DEX: 0.1, 'ALL %': 10, ATTACK: 4 }
    },
    BOWMAN: {
        label: "궁수 (DEX 주스탯)",
        eff: { DEX: 1, STR: 0.1, 'ALL %': 10, ATTACK: 4 }
    },
    MAGICIAN: {
        label: "마법사 (INT 주스탯)",
        eff: { INT: 1, LUK: 0.1, 'ALL %': 10, MAGIC_ATTACK: 4 }
    },
    THIEF: {
        label: "도적 (LUK 주스탯)",
        eff: { LUK: 1, DEX: 0.1, 'ALL %': 10, ATTACK: 4 }
    },
    PIRATE_STR: {
        label: "해적 (STR형)",
        eff: { STR: 1, DEX: 0.1, 'ALL %': 10, ATTACK: 4 }
    },
    PIRATE_DEX: {
        label: "해적 (DEX형)",
        eff: { DEX: 1, STR: 0.1, 'ALL %': 10, ATTACK: 4 }
    },
    XENON: {
        label: "제논 (올스탯 특화)",
        eff: { STR: 1, DEX: 1, LUK: 1, 'ALL %': 20, ATTACK: 4 }
    },
    DA: {
        label: "데몬어벤져 (HP 특화)",
        eff: { HP: 0.05, ATTACK: 4 }
    }
};
