// ================================================================
// 잠재능력 재설정 & 큐브 확률 데이터베이스 (통합)
// ================================================================
// 출처: 넥슨 공식 확률 공개 페이지
// https://maplestory.nexon.com/Guide/OtherProbability/cube/black
// https://maplestory.nexon.com/Guide/OtherProbability/cube/additional
// ================================================================

export type OptionGrade = '노멀' | '레어' | '에픽' | '유니크' | '레전드리';
export type ItemGrade = '레어' | '에픽' | '유니크' | '레전드리';

// ─── 큐브 재설정 수단 정의 ───────────────────────────────────────────────

export type PotentialCubeType =
    | 'MESO_RESET'              // 메소 재설정 (블랙 큐브 방식)
    | 'GOLD_CUBE'               // 골드 큐브 (명장의 큐브 동일)
    | 'SILVER_CUBE'             // 실버 큐브 (장인의 큐브 동일)
    | 'MEISTER_CUBE'            // (구) 명장의 큐브 하위호환 alias
    | 'MASTER_CUBE'             // (구) 장인의 큐브 하위호환 alias
    | 'OCCULT_CUBE'             // 수상한 큐브
    | 'RED_CUBE'                // 레드 큐브
    | 'ADDI_MESO_RESET'         // 에디셔널 메소 재설정
    | 'ADDI_WHITE_CUBE'         // 화이트 에디셔널 큐브
    | 'ADDI_NORMAL_CUBE'        // 에디셔널 큐브
    | 'ADDI_OCCULT_CUBE';       // 수상한 에디셔널 큐브

export interface CubeDefinition {
    id: PotentialCubeType;
    name: string;
    image: string;
    category: 'POTENTIAL' | 'ADDI_POTENTIAL';
    maxGrade: ItemGrade;
    rates: {
        '레어->에픽'?: number;
        '에픽->유니크'?: number;
        '유니크->레전드리'?: number;
    };
    hasCeiling: boolean;
    ceilings?: {
        '레어->에픽'?: number;
        '에픽->유니크'?: number;
        '유니크->레전드리'?: number;
    };
    costType: 'MESO' | 'CUBE_COUNT';
}

export const CUBE_DEFINITIONS: Record<PotentialCubeType, CubeDefinition> = {
    // 1. 일반 잠재능력
    MESO_RESET: {
        id: 'MESO_RESET',
        name: '메소 재설정 (블랙 큐브)',
        image: '/images/cubes/meso_cube.png',
        category: 'POTENTIAL',
        maxGrade: '레전드리',
        rates: {
            '레어->에픽': 15.0000001275,
            '에픽->유니크': 3.5000,
            '유니크->레전드리': 1.4000
        },
        hasCeiling: true,
        ceilings: {
            '레어->에픽': 10,
            '에픽->유니크': 42,
            '유니크->레전드리': 107
        },
        costType: 'MESO'
    },
    GOLD_CUBE: {
        id: 'GOLD_CUBE',
        name: '골드 큐브 (명장의 큐브 동일)',
        image: '/images/cubes/gold_cube.png',
        category: 'POTENTIAL',
        maxGrade: '레전드리',
        rates: {
            '레어->에픽': 7.9994,
            '에픽->유니크': 1.6959,
            '유니크->레전드리': 0.1996
        },
        hasCeiling: false,
        costType: 'CUBE_COUNT'
    },
    SILVER_CUBE: {
        id: 'SILVER_CUBE',
        name: '실버 큐브 (장인의 큐브 동일)',
        image: '/images/cubes/silver_cube.png',
        category: 'POTENTIAL',
        maxGrade: '유니크',
        rates: {
            '레어->에픽': 4.7619,
            '에픽->유니크': 1.1858
        },
        hasCeiling: false,
        costType: 'CUBE_COUNT'
    },
    MEISTER_CUBE: {
        id: 'MEISTER_CUBE',
        name: '골드 큐브 (명장의 큐브 동일)',
        image: '/images/cubes/gold_cube.png',
        category: 'POTENTIAL',
        maxGrade: '레전드리',
        rates: {
            '레어->에픽': 7.9994,
            '에픽->유니크': 1.6959,
            '유니크->레전드리': 0.1996
        },
        hasCeiling: false,
        costType: 'CUBE_COUNT'
    },
    MASTER_CUBE: {
        id: 'MASTER_CUBE',
        name: '실버 큐브 (장인의 큐브 동일)',
        image: '/images/cubes/silver_cube.png',
        category: 'POTENTIAL',
        maxGrade: '유니크',
        rates: {
            '레어->에픽': 4.7619,
            '에픽->유니크': 1.1858
        },
        hasCeiling: false,
        costType: 'CUBE_COUNT'
    },
    OCCULT_CUBE: {
        id: 'OCCULT_CUBE',
        name: '수상한 큐브',
        image: '/images/cubes/occult_cube.png',
        category: 'POTENTIAL',
        maxGrade: '에픽',
        rates: {
            '레어->에픽': 0.9901
        },
        hasCeiling: false,
        costType: 'CUBE_COUNT'
    },
    RED_CUBE: {
        id: 'RED_CUBE',
        name: '레드 큐브',
        image: '/images/cubes/red_cube.png',
        category: 'POTENTIAL',
        maxGrade: '레전드리',
        rates: {
            '레어->에픽': 6.0000,
            '에픽->유니크': 1.8000,
            '유니크->레전드리': 0.3000
        },
        hasCeiling: false,
        costType: 'CUBE_COUNT'
    },

    // 2. 에디셔널 잠재능력
    ADDI_MESO_RESET: {
        id: 'ADDI_MESO_RESET',
        name: '메소 재설정(에디)',
        image: '/images/cubes/white_addi_cube.png',
        category: 'ADDI_POTENTIAL',
        maxGrade: '레전드리',
        rates: {
            '레어->에픽': 2.3810,
            '에픽->유니크': 0.9804,
            '유니크->레전드리': 0.7000
        },
        hasCeiling: true,
        ceilings: {
            '레어->에픽': 62,
            '에픽->유니크': 152,
            '유니크->레전드리': 214
        },
        costType: 'MESO'
    },
    ADDI_WHITE_CUBE: {
        id: 'ADDI_WHITE_CUBE',
        name: '화이트 에디셔널 큐브',
        image: '/images/cubes/white_addi_cube.png',
        category: 'ADDI_POTENTIAL',
        maxGrade: '레전드리',
        rates: {
            '레어->에픽': 4.7619,
            '에픽->유니크': 1.9608,
            '유니크->레전드리': 0.7000
        },
        hasCeiling: true,
        ceilings: {
            '레어->에픽': 31,
            '에픽->유니크': 76,
            '유니크->레전드리': 214
        },
        costType: 'CUBE_COUNT'
    },
    ADDI_NORMAL_CUBE: {
        id: 'ADDI_NORMAL_CUBE',
        name: '에디셔널 큐브',
        image: '/images/cubes/addi_cube.png',
        category: 'ADDI_POTENTIAL',
        maxGrade: '레전드리',
        rates: {
            '레어->에픽': 4.7619,
            '에픽->유니크': 1.9608,
            '유니크->레전드리': 0.7000
        },
        hasCeiling: true,
        ceilings: {
            '레어->에픽': 31,
            '에픽->유니크': 76,
            '유니크->레전드리': 214
        },
        costType: 'CUBE_COUNT'
    },
    ADDI_OCCULT_CUBE: {
        id: 'ADDI_OCCULT_CUBE',
        name: '수상한 에디셔널 큐브',
        image: '/images/cubes/addi_occult_cube.png',
        category: 'ADDI_POTENTIAL',
        maxGrade: '에픽',
        rates: {
            '레어->에픽': 4.7619
        },
        hasCeiling: false,
        costType: 'CUBE_COUNT'
    }
};

// ─── 등급업 확률 & 천장 ───────────────────────────────────────────────────

export interface PotentialUpgradeRate {
    from_grade: '레어' | '에픽' | '유니크';
    to_grade: '에픽' | '유니크' | '레전드리';
    probability: number;  // 확률 (%)
}

export const POTENTIAL_UPGRADE_RATES: PotentialUpgradeRate[] = [
    { from_grade: '레어', to_grade: '에픽', probability: 15.0000001275 },
    { from_grade: '에픽', to_grade: '유니크', probability: 3.5000 },
    { from_grade: '유니크', to_grade: '레전드리', probability: 1.4000 },
];

export interface PotentialGuaranteeSystem {
    from_grade: '레어' | '에픽' | '유니크';
    to_grade: '에픽' | '유니크' | '레전드리';
    guarantee_count: number;
}

export const POTENTIAL_GUARANTEE_SYSTEM: PotentialGuaranteeSystem[] = [
    { from_grade: '레어', to_grade: '에픽', guarantee_count: 10 },
    { from_grade: '에픽', to_grade: '유니크', guarantee_count: 42 },
    { from_grade: '유니크', to_grade: '레전드리', guarantee_count: 107 },
];

// 천장 비용 (단위: 억 메소) - 레벨 구간별 [1~159, 160~199, 200~249, 250~300]
export const POTENTIAL_CEILING_COSTS = [
    {
        from_grade: '레어', to_grade: '에픽',
        count: 10,
        costs: { '1~159': 0.4, '160~199': 0.43, '200~249': 0.45, '250~300': 0.5 }
    },
    {
        from_grade: '에픽', to_grade: '유니크',
        count: 42,
        costs: { '1~159': 6.72, '160~199': 7.14, '200~249': 7.56, '250~300': 8.4 }
    },
    {
        from_grade: '유니크', to_grade: '레전드리',
        count: 107,
        costs: { '1~159': 36.38, '160~199': 38.65, '200~249': 40.93, '250~300': 45.48 }
    },
];

export interface PotentialLineGradeRate {
    item_grade: ItemGrade;
    line_position: 1 | 2 | 3;
    grade_rates: {
        grade: OptionGrade;
        probability: number;
    }[];
}

export const POTENTIAL_LINE_GRADE_RATES: PotentialLineGradeRate[] = [
    // 레어
    { item_grade: '레어', line_position: 1, grade_rates: [{ grade: '레어', probability: 100.0 }] },
    { item_grade: '레어', line_position: 2, grade_rates: [{ grade: '레어', probability: 20.0 }, { grade: '노멀', probability: 80.0 }] },
    { item_grade: '레어', line_position: 3, grade_rates: [{ grade: '레어', probability: 5.0 }, { grade: '노멀', probability: 95.0 }] },
    // 에픽
    { item_grade: '에픽', line_position: 1, grade_rates: [{ grade: '에픽', probability: 100.0 }] },
    { item_grade: '에픽', line_position: 2, grade_rates: [{ grade: '에픽', probability: 20.0 }, { grade: '레어', probability: 80.0 }] },
    { item_grade: '에픽', line_position: 3, grade_rates: [{ grade: '에픽', probability: 5.0 }, { grade: '레어', probability: 95.0 }] },
    // 유니크
    { item_grade: '유니크', line_position: 1, grade_rates: [{ grade: '유니크', probability: 100.0 }] },
    { item_grade: '유니크', line_position: 2, grade_rates: [{ grade: '유니크', probability: 20.0 }, { grade: '에픽', probability: 80.0 }] },
    { item_grade: '유니크', line_position: 3, grade_rates: [{ grade: '유니크', probability: 5.0 }, { grade: '에픽', probability: 95.0 }] },
    // 레전드리
    { item_grade: '레전드리', line_position: 1, grade_rates: [{ grade: '레전드리', probability: 100.0 }] },
    { item_grade: '레전드리', line_position: 2, grade_rates: [{ grade: '레전드리', probability: 20.0 }, { grade: '유니크', probability: 80.0 }] },
    { item_grade: '레전드리', line_position: 3, grade_rates: [{ grade: '레전드리', probability: 5.0 }, { grade: '유니크', probability: 95.0 }] },
];

export interface PotentialResetCost {
    min_level: number;
    max_level: number;
    costs: {
        '레어': number;
        '에픽': number;
        '유니크': number;
        '레전드리': number;
    };
}

export const POTENTIAL_RESET_COSTS: PotentialResetCost[] = [
    { min_level: 250, max_level: 300, costs: { '레어': 5000000, '에픽': 20000000, '유니크': 42500000, '레전드리': 50000000 } },
    { min_level: 200, max_level: 249, costs: { '레어': 4500000, '에픽': 18000000, '유니크': 38250000, '레전드리': 45000000 } },
    { min_level: 160, max_level: 199, costs: { '레어': 4250000, '에픽': 17000000, '유니크': 36125000, '레전드리': 42500000 } },
    { min_level: 1, max_level: 159, costs: { '레어': 4000000, '에픽': 16000000, '유니크': 34000000, '레전드리': 40000000 } },
];

export enum AdditionalCubeType {
    RESET = 'reset',
    NORMAL = 'normal',
    WHITE = 'white'
}

export interface AdditionalPotentialUpgradeRate {
    from_grade: '레어' | '에픽' | '유니크';
    to_grade: '에픽' | '유니크' | '레전드리';
    reset_probability: number;
    cube_probability: number;
}

export const ADDITIONAL_POTENTIAL_UPGRADE_RATES: AdditionalPotentialUpgradeRate[] = [
    { from_grade: '레어', to_grade: '에픽', reset_probability: 2.3810, cube_probability: 4.7619 },
    { from_grade: '에픽', to_grade: '유니크', reset_probability: 0.9804, cube_probability: 1.9608 },
    { from_grade: '유니크', to_grade: '레전드리', reset_probability: 0.7000, cube_probability: 0.7000 },
];

// 에디셔널 천장 비용 (단위: 억 메소) - 레벨 구간별 [1~159, 160~199, 200~249, 250~300]
export const ADDITIONAL_POTENTIAL_CEILING_COSTS = [
    {
        from_grade: '레어', to_grade: '에픽',
        count: 62,
        costs: { '1~159': 6.04, '160~199': 6.43, '200~249': 6.82, '250~300': 7.60 }
    },
    {
        from_grade: '에픽', to_grade: '유니크',
        count: 152,
        costs: { '1~159': 41.50, '160~199': 44.16, '200~249': 46.82, '250~300': 52.14 }
    },
    {
        from_grade: '유니크', to_grade: '레전드리',
        count: 214,
        costs: { '1~159': 141.88, '160~199': 150.98, '200~249': 160.07, '250~300': 178.16 }
    },
];

export const ADDITIONAL_POTENTIAL_RESET_COSTS: PotentialResetCost[] = [
    { min_level: 250, max_level: 300, costs: { '레어': 12250000, '에픽': 34300000, '유니크': 83300000, '레전드리': 98000000 } },
    { min_level: 200, max_level: 249, costs: { '레어': 11000000, '에픽': 30800000, '유니크': 74800000, '레전드리': 88000000 } },
    { min_level: 160, max_level: 199, costs: { '레어': 10375000, '에픽': 29050000, '유니크': 70550000, '레전드리': 83000000 } },
    { min_level: 1, max_level: 159, costs: { '레어': 9750000, '에픽': 27300000, '유니크': 66300000, '레전드리': 78000000 } },
];

// ================================================================
// 유틸리티 함수
// ================================================================

export function getPotentialUpgradeRate(
    from: '레어' | '에픽' | '유니크',
    to: '에픽' | '유니크' | '레전드리',
    cubeType: PotentialCubeType = 'MESO_RESET',
    isMiracleTime: boolean = false
): number {
    const cube = CUBE_DEFINITIONS[cubeType] || CUBE_DEFINITIONS.MESO_RESET;
    const key = `${from}->${to}` as '레어->에픽' | '에픽->유니크' | '유니크->레전드리';
    let baseRate = cube.rates[key] ?? 0;
    if (isMiracleTime) {
        baseRate = Math.min(100.0, baseRate * 2);
    }
    return baseRate;
}

export function getPotentialGuaranteeCount(
    from: '레어' | '에픽' | '유니크',
    to: '에픽' | '유니크' | '레전드리',
    cubeType: PotentialCubeType = 'MESO_RESET'
): number {
    const cube = CUBE_DEFINITIONS[cubeType] || CUBE_DEFINITIONS.MESO_RESET;
    if (!cube.hasCeiling || !cube.ceilings) return 0;
    const key = `${from}->${to}` as '레어->에픽' | '에픽->유니크' | '유니크->레전드리';
    return cube.ceilings[key] ?? 0;
}

export function getPotentialLineGradeRates(grade: ItemGrade, line: 1 | 2 | 3) {
    return POTENTIAL_LINE_GRADE_RATES.find(r => r.item_grade === grade && r.line_position === line)?.grade_rates ?? [];
}

export function calculateAveragePotentialCount(target: '에픽' | '유니크' | '레전드리'): number {
    let total = 0;
    if (target === '에픽' || target === '유니크' || target === '레전드리') total += 1 / (getPotentialUpgradeRate('레어', '에픽') / 100);
    if (target === '유니크' || target === '레전드리') total += 1 / (getPotentialUpgradeRate('에픽', '유니크') / 100);
    if (target === '레전드리') total += 1 / (getPotentialUpgradeRate('유니크', '레전드리') / 100);
    return Math.round(total);
}

export function getPotentialResetCost(level: number, grade: '레어' | '에픽' | '유니크' | '레전드리'): number {
    return POTENTIAL_RESET_COSTS.find(c => level >= c.min_level && level <= c.max_level)?.costs[grade] ?? 0;
}

export function getAdditionalPotentialUpgradeRate(
    from: '레어' | '에픽' | '유니크',
    to: '에픽' | '유니크' | '레전드리',
    type: AdditionalCubeType = AdditionalCubeType.NORMAL
): number {
    const rate = ADDITIONAL_POTENTIAL_UPGRADE_RATES.find(r => r.from_grade === from && r.to_grade === to);
    if (!rate) return 0;
    return type === AdditionalCubeType.RESET ? rate.reset_probability : rate.cube_probability;
}

export function calculateAverageAdditionalPotentialCount(target: '에픽' | '유니크' | '레전드리', type: AdditionalCubeType = AdditionalCubeType.NORMAL): number {
    let total = 0;
    if (target === '에픽' || target === '유니크' || target === '레전드리') total += 1 / (getAdditionalPotentialUpgradeRate('레어', '에픽', type) / 100);
    if (target === '유니크' || target === '레전드리') total += 1 / (getAdditionalPotentialUpgradeRate('에픽', '유니크', type) / 100);
    if (target === '레전드리') total += 1 / (getAdditionalPotentialUpgradeRate('유니크', '레전드리', type) / 100);
    return Math.round(total);
}

export function getAdditionalPotentialResetCost(level: number, grade: '레어' | '에픽' | '유니크' | '레전드리'): number {
    return ADDITIONAL_POTENTIAL_RESET_COSTS.find(c => level >= c.min_level && level <= c.max_level)?.costs[grade] ?? 0;
}
