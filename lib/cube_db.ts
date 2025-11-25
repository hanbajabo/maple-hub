// ================================================================
// 잠재능력 재설정 & 큐브 확률 데이터베이스 (통합)
// ================================================================
// 출처: 넥슨 공식 확률 공개 페이지
// https://maplestory.nexon.com/Guide/OtherProbability/cube/black
// https://maplestory.nexon.com/Guide/OtherProbability/cube/additional
// ================================================================

// ================================================================
// 1. 메인 잠재능력 (블랙 큐브 / 재설정)
// ================================================================

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

export type OptionGrade = '노멀' | '레어' | '에픽' | '유니크' | '레전드리';
export type ItemGrade = '레어' | '에픽' | '유니크' | '레전드리';

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

// ================================================================
// 2. 에디셔널 잠재능력 (에디셔널 큐브 / 재설정)
// ================================================================

export enum AdditionalCubeType {
    RESET = 'reset',           // 에디셔널 잠재능력 재설정
    NORMAL = 'normal',         // 에디셔널 큐브
    WHITE = 'white'            // 화이트 에디셔널 큐브
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
    { min_level: 250, max_level: 300, costs: { '레어': 16250000, '에픽': 45500000, '유니크': 55250000, '레전드리': 65000000 } },
    { min_level: 200, max_level: 249, costs: { '레어': 14625000, '에픽': 40950000, '유니크': 49725000, '레전드리': 58500000 } },
    { min_level: 160, max_level: 199, costs: { '레어': 13812000, '에픽': 38675000, '유니크': 46962500, '레전드리': 55250000 } },
    { min_level: 1, max_level: 159, costs: { '레어': 13000000, '에픽': 36400000, '유니크': 44200000, '레전드리': 52000000 } },
];

// ================================================================
// 유틸리티 함수
// ================================================================

export function getPotentialUpgradeRate(from: '레어' | '에픽' | '유니크', to: '에픽' | '유니크' | '레전드리'): number {
    return POTENTIAL_UPGRADE_RATES.find(r => r.from_grade === from && r.to_grade === to)?.probability ?? 0;
}

export function getPotentialGuaranteeCount(from: '레어' | '에픽' | '유니크', to: '에픽' | '유니크' | '레전드리'): number {
    return POTENTIAL_GUARANTEE_SYSTEM.find(g => g.from_grade === from && g.to_grade === to)?.guarantee_count ?? 0;
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

export function getAdditionalPotentialUpgradeRate(from: '레어' | '에픽' | '유니크', to: '에픽' | '유니크' | '레전드리', type: AdditionalCubeType = AdditionalCubeType.NORMAL): number {
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
