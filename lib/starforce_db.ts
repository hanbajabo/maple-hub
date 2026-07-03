export interface StarforceStage {
    current_star: number;
    success_rate: number;
    fail_rate: number; // 유지 (하락 시스템 제거됨)
    destroy_rate: number;
    cost_formula_denominator?: number;
}

// ================================================================
// 시뮬레이션 기반 누적 통계 (10만 회 이상 반복)
// ================================================================
export interface StarforceSimulationStats {
    target_star: number;
    average_destroy_count: number;      // 평균 파괴 횟수 (0→N성)
    no_destroy_probability: number;     // 파괴 없이 도달 확률 (%)
}

// 시뮬레이션 결과: 각 목표 성까지의 평균 파괴 횟수 & 무파괴 확률
export const STARFORCE_SIMULATION_STATS: StarforceSimulationStats[] = [
    { target_star: 15, average_destroy_count: 0, no_destroy_probability: 100.0000 },
    { target_star: 16, average_destroy_count: 0.04568, no_destroy_probability: 95.6313 },
    { target_star: 17, average_destroy_count: 0.09345, no_destroy_probability: 91.4535 },
    { target_star: 18, average_destroy_count: 0.42100, no_destroy_probability: 70.3729 },
    { target_star: 19, average_destroy_count: 0.84667, no_destroy_probability: 54.1515 },
    { target_star: 20, average_destroy_count: 1.53809, no_destroy_probability: 39.3997 },
    { target_star: 21, average_destroy_count: 2.11766, no_destroy_probability: 32.0754 },
    { target_star: 22, average_destroy_count: 3.86869, no_destroy_probability: 20.5394 },
    { target_star: 23, average_destroy_count: 9.07742, no_destroy_probability: 9.9232 },
    { target_star: 24, average_destroy_count: 26.2570, no_destroy_probability: 3.66878 },
    { target_star: 25, average_destroy_count: 72.7238, no_destroy_probability: 1.35641 },
    { target_star: 26, average_destroy_count: 198.405, no_destroy_probability: 0.50149 },
    { target_star: 27, average_destroy_count: 701.123, no_destroy_probability: 0.14243 },
    { target_star: 28, average_destroy_count: 3235.45, no_destroy_probability: 0.03090 },
    { target_star: 29, average_destroy_count: 23137.1, no_destroy_probability: 0.00432 },
    { target_star: 30, average_destroy_count: 459234, no_destroy_probability: 0.00022 },
];

// ================================================================
// 2025년 최신 스타포스 확률표 (0성 ~ 30성)
// ================================================================
// ✅ 하락 시스템 완전 제거 (모든 구간에서 실패 시 유지)
// ✅ 30성까지 확장
// ✅ 공식 확률표 기준 정확한 수치 적용
// ================================================================
export const STARFORCE_DB: StarforceStage[] = [
    // 0-14성: 파괴 없음, 실패 시 유지
    { current_star: 0, success_rate: 99.75, fail_rate: 0.25, destroy_rate: 0.00 },
    { current_star: 1, success_rate: 94.50, fail_rate: 5.50, destroy_rate: 0.00 },
    { current_star: 2, success_rate: 89.25, fail_rate: 10.75, destroy_rate: 0.00 },
    { current_star: 3, success_rate: 89.25, fail_rate: 10.75, destroy_rate: 0.00 },
    { current_star: 4, success_rate: 84.00, fail_rate: 16.00, destroy_rate: 0.00 },
    { current_star: 5, success_rate: 78.75, fail_rate: 21.25, destroy_rate: 0.00 },
    { current_star: 6, success_rate: 73.50, fail_rate: 26.50, destroy_rate: 0.00 },
    { current_star: 7, success_rate: 68.25, fail_rate: 31.75, destroy_rate: 0.00 },
    { current_star: 8, success_rate: 63.00, fail_rate: 37.00, destroy_rate: 0.00 },
    { current_star: 9, success_rate: 57.75, fail_rate: 42.25, destroy_rate: 0.00 },
    { current_star: 10, success_rate: 52.50, fail_rate: 47.50, destroy_rate: 0.00 },
    { current_star: 11, success_rate: 47.25, fail_rate: 52.75, destroy_rate: 0.00 },
    { current_star: 12, success_rate: 42.00, fail_rate: 58.00, destroy_rate: 0.00 },
    { current_star: 13, success_rate: 36.75, fail_rate: 63.25, destroy_rate: 0.00 },
    { current_star: 14, success_rate: 31.50, fail_rate: 68.50, destroy_rate: 0.00 },

    // 15-16성: 파괴 시작 (2.055%), 실패 시 유지
    { current_star: 15, success_rate: 31.50, fail_rate: 66.445, destroy_rate: 2.055 },
    { current_star: 16, success_rate: 31.50, fail_rate: 66.445, destroy_rate: 2.055 },

    // 17-18성: 파괴율 증가 (6.740%), 실패 시 유지
    { current_star: 17, success_rate: 15.75, fail_rate: 77.510, destroy_rate: 6.740 },
    { current_star: 18, success_rate: 15.75, fail_rate: 77.510, destroy_rate: 6.740 },
    { current_star: 19, success_rate: 15.75, fail_rate: 75.825, destroy_rate: 8.425 },

    // 20성: 체크포인트, 실패 시 유지
    { current_star: 20, success_rate: 31.50, fail_rate: 58.225, destroy_rate: 10.275 },

    // 21-25성: 파괴율 (12.6375% ~ 17.90%), 실패 시 유지
    { current_star: 21, success_rate: 15.75, fail_rate: 71.6125, destroy_rate: 12.6375 },
    { current_star: 22, success_rate: 15.75, fail_rate: 67.40, destroy_rate: 16.85 },
    { current_star: 23, success_rate: 10.50, fail_rate: 71.60, destroy_rate: 17.90 },
    { current_star: 24, success_rate: 10.50, fail_rate: 71.60, destroy_rate: 17.90 },
    { current_star: 25, success_rate: 10.50, fail_rate: 71.60, destroy_rate: 17.90 },

    // 26-30성: 극악의 확률, 실패 시 유지
    { current_star: 26, success_rate: 7.35, fail_rate: 74.16, destroy_rate: 18.53 },
    { current_star: 27, success_rate: 5.25, fail_rate: 75.80, destroy_rate: 18.95 },
    { current_star: 28, success_rate: 3.15, fail_rate: 77.48, destroy_rate: 19.37 },
    { current_star: 29, success_rate: 1.05, fail_rate: 79.16, destroy_rate: 19.79 },
    { current_star: 30, success_rate: 1.05, fail_rate: 79.16, destroy_rate: 19.79 },
];

export interface StarforceOptions {
    mvpDiscount?: number; // 0.03 ~ 0.1 (3% ~ 10%)
    pcCafe?: boolean; // 5%
    sundayMaple?: boolean; // 30%
    preventDestruction?: boolean; // 12~16 star only
    starcatch?: boolean;
}

// Denominator tables for different levels (New Age / Savior update)
// Derived from cost curves: High denominators for 10-14 (low cost), varied for 15+.
const STARFORCE_DENOMINATOR_TABLE: { [level: number]: number[] } = {
    200: [
        1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, // 0-9
        1350, 750, 510, 375, 255, // 10-14
        475, 475, 300, 140, 90, // 15-19
        400, 250, 400, 400, 400 // 20-24
    ],
    // Estimated/Scaled for other levels based on 200 data
    160: [
        1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
        1100, 600, 400, 300, 200,
        350, 350, 250, 120, 80,
        300, 200, 300, 300, 300
    ],
    150: [
        1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
        1000, 550, 380, 280, 190,
        320, 320, 230, 110, 75,
        280, 190, 280, 280, 280
    ],
    // Default fallback for others (using 140/130 etc logic or generic)
    140: [
        1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
        900, 500, 350, 250, 170,
        300, 300, 200, 100, 70,
        250, 170, 250, 250, 250
    ]
};

export const getRestorationMesoCost = (level: number, stars: number, isShining: boolean = false): number => {
    if (stars < 15 || stars > 22) return 0;

    // 성급: [140제, 160제, 200제, 250제] (단위: 원화메소)
    const costTable: { [star: number]: number[] } = {
        15: [149000000, 222000000, 433000000, 846000000],
        16: [359000000, 535000000, 1050000000, 2040000000],
        17: [606000000, 904000000, 1770000000, 3450000000],
        18: [1380000000, 2060000000, 4010000000, 7830000000],
        19: [2280000000, 3410000000, 6650000000, 13000000000],
        20: [4020000000, 6000000000, 11800000000, 22900000000],
        21: [5050000000, 7540000000, 14800000000, 28800000000],
        22: [8290000000, 12400000000, 24200000000, 47300000000],
    };

    let levelIndex = 0; // default 140제
    if (level >= 250) levelIndex = 3;
    else if (level >= 200) levelIndex = 2;
    else if (level >= 160) levelIndex = 1;

    let baseMeso = costTable[stars][levelIndex];

    if (isShining) {
        baseMeso = baseMeso * 0.8; // 20% 할인
    }

    return Math.floor(baseMeso);
};

export const getRestorationSpareCount = (stars: number): number => {
    if (stars < 15) return 1;
    if (stars <= 18) return 1;
    if (stars <= 20) return 2;
    if (stars === 21) return 3;
    if (stars === 22) return 4;
    return 4; // 23성 이상 파괴 시 22성으로 복구되므로 4개
};

export const calculateStarforceCost = (level: number, currentStar: number, options: StarforceOptions = {}): number => {
    let baseCostRaw = 0;

    if (currentStar <= 9) {
        // 0~9성: 1000 + L^3 * (S+1) / 36
        baseCostRaw = 1000 + (Math.pow(level, 3) * (currentStar + 1)) / 36;
    } else {
        // 10성 이상: 1000 + L^3 * (S+1)^2.7 / D
        let denom = 200;
        if (currentStar === 10) denom = 571;
        else if (currentStar === 11) denom = 314;
        else if (currentStar === 12) denom = 214;
        else if (currentStar === 13) denom = 157;
        else if (currentStar === 14) denom = 107;
        else if (currentStar === 17) denom = 150;
        else if (currentStar === 18) denom = 70;
        else if (currentStar === 19) denom = 45;
        else if (currentStar === 21) denom = 125;

        baseCostRaw = 1000 + (Math.pow(level, 3) * Math.pow(currentStar + 1, 2.7)) / denom;
    }

    let cost = baseCostRaw;

    // 2. 할인 적용
    // MVP + PC방 할인 (합산 적용) - 1~17성 (현재 성급 0~16)
    if (currentStar <= 16) {
        let discountRate = 0;
        if (options.mvpDiscount) discountRate += options.mvpDiscount;
        if (options.pcCafe) discountRate += 0.05;
        cost = cost * (1.0 - discountRate);
    }

    // 30% 할인 (썬데이 메이플 또는 샤이닝 스타포스)
    if (options.sundayMaple || options.isShining) {
        cost = cost * 0.7;
    }

    // 3. 파괴 방지 추가 비용 (기본 비용의 200% 추가)
    if (options.preventDestruction && currentStar >= 15 && currentStar <= 17) {
        cost += baseCostRaw * 2.0;
    }

    return Math.round(cost / 10) * 10;
};

export const calculateStarforceProbabilities = (currentStar: number, options: StarforceOptions = {}) => {
    const stage = STARFORCE_DB.find(s => s.current_star === currentStar);
    if (!stage) return { success: 0, fail: 0, destroy: 0 };

    let success = stage.success_rate;
    let fail = stage.fail_rate;
    let destroy = stage.destroy_rate;

    // 스타캐치 폐지로 기본 DB에 1.05배 상시 적용됨.
    // 스타캐치 해제 시 (starcatch = false) 성공률을 base로 하향 조정
    if (options.starcatch === false) {
        const baseSuccess = success / 1.05;
        const oldRemaining = 100 - success;
        const newRemaining = 100 - baseSuccess;
        if (oldRemaining > 0) {
            const ratio = newRemaining / oldRemaining;
            fail = fail * ratio;
            destroy = destroy * ratio;
        } else {
            fail = 0;
            destroy = 0;
        }
        success = baseSuccess;
    }

    // 샤이닝 스타포스 적용 시 21성 이하 파괴 확률 30% 감소
    if (options.isShining && currentStar <= 21 && destroy > 0) {
        const originalDestroy = destroy;
        destroy = destroy * 0.7;
        fail = fail + (originalDestroy - destroy);
    }

    return {
        success: Number(success.toFixed(4)),
        fail: Number(fail.toFixed(4)),
        destroy: Number(destroy.toFixed(4))
    };
};

export const calculateCumulativeExpectedCostDetailed = (
    level: number,
    targetStar: number,
    options: StarforceOptions = {}
): { totalMeso: number; totalSpares: number } => {
    if (targetStar <= 0) return { totalMeso: 0, totalSpares: 0 };

    const itemCost = options.itemCost ?? 0;
    const isShining = options.isShining ?? false;

    const T_meso: number[] = [0];
    const T_spares: number[] = [0];

    for (let i = 0; i < targetStar; i++) {
        const currentStar = i;
        const cost = calculateStarforceCost(level, currentStar, options);
        const probs = calculateStarforceProbabilities(currentStar, options);

        const p_s = probs.success / 100;
        const p_x = probs.destroy / 100;

        // Option A: 12성 복구 후 다시 복귀하는 방식
        const restoreStar = currentStar >= 12 ? 12 : 0;
        const restoreCostMeso_A = T_meso[currentStar] - T_meso[restoreStar];
        const restoreCostSpares_A = 1 + (T_spares[currentStar] - T_spares[restoreStar]);
        const totalValue_A = restoreCostMeso_A + restoreCostSpares_A * itemCost;

        // Option B: 성급 유지 복구 방식 (메소 지불)
        const restoreCostMeso_B = getRestorationMesoCost(level, currentStar, isShining);
        const restoreCostSpares_B = getRestorationSpareCount(currentStar);
        const totalValue_B = restoreCostMeso_B + restoreCostSpares_B * itemCost;

        // 더 저렴한 방식을 선택 (15성 미만은 Option B가 없으므로 무조건 Option A)
        const useOptionB = currentStar >= 15 && totalValue_B < totalValue_A;

        let stepExpectedMeso = 0;
        let stepExpectedSpares = 0;

        if (useOptionB) {
            stepExpectedMeso = (cost + p_x * restoreCostMeso_B) / p_s;
            stepExpectedSpares = (p_x * restoreCostSpares_B) / p_s;
        } else {
            stepExpectedMeso = (cost + p_x * restoreCostMeso_A) / p_s;
            stepExpectedSpares = (p_x * restoreCostSpares_A) / p_s;
        }

        T_meso.push(T_meso[currentStar] + stepExpectedMeso);
        T_spares.push(T_spares[currentStar] + stepExpectedSpares);
    }

    return {
        totalMeso: Math.round(T_meso[targetStar]),
        totalSpares: Number(T_spares[targetStar].toFixed(4))
    };
};

export const calculateCumulativeExpectedCost = (
    level: number,
    targetStar: number,
    options: StarforceOptions = {}
): number => {
    return calculateCumulativeExpectedCostDetailed(level, targetStar, options).totalMeso;
};
