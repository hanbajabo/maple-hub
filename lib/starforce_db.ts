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
    { current_star: 0, success_rate: 99.75, fail_rate: 0.25, destroy_rate: 0.00, cost_formula_denominator: 1000 },
    { current_star: 1, success_rate: 94.50, fail_rate: 5.50, destroy_rate: 0.00, cost_formula_denominator: 1000 },
    { current_star: 2, success_rate: 89.25, fail_rate: 10.75, destroy_rate: 0.00, cost_formula_denominator: 1000 },
    { current_star: 3, success_rate: 89.25, fail_rate: 10.75, destroy_rate: 0.00, cost_formula_denominator: 1000 },
    { current_star: 4, success_rate: 84.00, fail_rate: 16.00, destroy_rate: 0.00, cost_formula_denominator: 1000 },
    { current_star: 5, success_rate: 78.75, fail_rate: 21.25, destroy_rate: 0.00, cost_formula_denominator: 1000 },
    { current_star: 6, success_rate: 73.50, fail_rate: 26.50, destroy_rate: 0.00, cost_formula_denominator: 1000 },
    { current_star: 7, success_rate: 68.25, fail_rate: 31.75, destroy_rate: 0.00, cost_formula_denominator: 1000 },
    { current_star: 8, success_rate: 63.00, fail_rate: 37.00, destroy_rate: 0.00, cost_formula_denominator: 1000 },
    { current_star: 9, success_rate: 57.75, fail_rate: 42.25, destroy_rate: 0.00, cost_formula_denominator: 1000 },
    { current_star: 10, success_rate: 52.50, fail_rate: 47.50, destroy_rate: 0.00, cost_formula_denominator: 1350 },
    { current_star: 11, success_rate: 47.25, fail_rate: 52.75, destroy_rate: 0.00, cost_formula_denominator: 750 },
    { current_star: 12, success_rate: 42.00, fail_rate: 58.00, destroy_rate: 0.00, cost_formula_denominator: 510 },
    { current_star: 13, success_rate: 36.75, fail_rate: 63.25, destroy_rate: 0.00, cost_formula_denominator: 375 },
    { current_star: 14, success_rate: 31.50, fail_rate: 68.50, destroy_rate: 0.00, cost_formula_denominator: 255 },

    // 15-16성: 파괴 시작 (1.439%), 실패 시 유지
    { current_star: 15, success_rate: 31.50, fail_rate: 67.061, destroy_rate: 1.439, cost_formula_denominator: 475 },
    { current_star: 16, success_rate: 31.50, fail_rate: 67.061, destroy_rate: 1.439, cost_formula_denominator: 475 },

    // 17-19성: 파괴율 증가 (~4-6%), 실패 시 유지
    { current_star: 17, success_rate: 15.75, fail_rate: 79.532, destroy_rate: 4.718, cost_formula_denominator: 300 },
    { current_star: 18, success_rate: 15.75, fail_rate: 79.532, destroy_rate: 4.718, cost_formula_denominator: 140 },
    { current_star: 19, success_rate: 15.75, fail_rate: 78.353, destroy_rate: 5.897, cost_formula_denominator: 90 },

    // 20성: 체크포인트, 실패 시 유지
    { current_star: 20, success_rate: 31.50, fail_rate: 61.307, destroy_rate: 7.193, cost_formula_denominator: 400 },

    // 21-25성: 파괴율 급증 (8-17%), 실패 시 유지
    { current_star: 21, success_rate: 15.75, fail_rate: 75.404, destroy_rate: 8.846, cost_formula_denominator: 250 },
    { current_star: 22, success_rate: 15.75, fail_rate: 67.40, destroy_rate: 16.85, cost_formula_denominator: 400 },
    { current_star: 23, success_rate: 10.50, fail_rate: 71.60, destroy_rate: 17.90, cost_formula_denominator: 400 },
    { current_star: 24, success_rate: 10.50, fail_rate: 71.60, destroy_rate: 17.90, cost_formula_denominator: 400 },
    { current_star: 25, success_rate: 10.50, fail_rate: 71.60, destroy_rate: 17.90, cost_formula_denominator: 400 },

    // 26-30성: 극악의 확률 (1-7%), 파괴율 18-20%, 실패 시 유지
    { current_star: 26, success_rate: 7.35, fail_rate: 74.12, destroy_rate: 18.53, cost_formula_denominator: 400 },
    { current_star: 27, success_rate: 5.25, fail_rate: 75.80, destroy_rate: 18.95, cost_formula_denominator: 400 },
    { current_star: 28, success_rate: 3.15, fail_rate: 77.48, destroy_rate: 19.37, cost_formula_denominator: 400 },
    { current_star: 29, success_rate: 1.05, fail_rate: 79.16, destroy_rate: 19.79, cost_formula_denominator: 400 },
    { current_star: 30, success_rate: 1.05, fail_rate: 79.16, destroy_rate: 19.79, cost_formula_denominator: 400 },  // 30성 추가
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

const getStarforceCostDenominator = (level: number, currentStar: number): number => {
    // Find nearest defined level table
    const definedLevels = Object.keys(STARFORCE_DENOMINATOR_TABLE).map(Number).sort((a, b) => a - b);
    let targetLevel = definedLevels[0];
    for (const l of definedLevels) {
        if (level >= l) targetLevel = l;
    }

    // Default to 1000 if not found or star out of range
    const table = STARFORCE_DENOMINATOR_TABLE[targetLevel];
    if (currentStar < table.length) {
        return table[currentStar];
    }
    return 200; // Fallback for high stars
};

export const calculateStarforceCost = (level: number, currentStar: number, options: StarforceOptions = {}): number => {
    const denominator = getStarforceCostDenominator(level, currentStar);

    // 1. Calculate Base Cost
    // Formula: 1000 + L^3 * (S+1)^2.7 / Denominator
    const baseCostRaw = 1000 + (Math.pow(level, 3) * Math.pow(currentStar + 1, 2.7)) / denominator;

    let cost = baseCostRaw;

    // 2. Apply Discounts
    // MVP + PC Cafe (Additive) - Applies for 1~17 stars (Current star 0 to 16)
    if (currentStar <= 16) {
        let discountRate = 0;
        if (options.mvpDiscount) discountRate += options.mvpDiscount;
        if (options.pcCafe) discountRate += 0.05;

        // Max discount check if needed, but usually just sum
        cost = cost * (1.0 - discountRate);
    }

    // Sunday Maple (Multiplicative) - All stages
    if (options.sundayMaple) {
        cost = cost * 0.7;
    }

    // 3. Prevent Destruction (Additional Cost)
    // Available for 12, 13, 14, 15, 16 stars.
    // Additional cost is equal to the base cost (before discount). 
    // "파괴 방지에 필요한 추가비용은 할인 혜택을 받을 수 없다."
    if (options.preventDestruction && currentStar >= 12 && currentStar <= 16) {
        cost += baseCostRaw;
    }

    // 4. Rounding (십의 자리에서 반올림 -> 1의 자리에서 반올림하여 10단위로 만듦)
    return Math.round(cost / 10) * 10;
};

export const calculateStarforceProbabilities = (currentStar: number, starcatch: boolean = false) => {
    const stage = STARFORCE_DB.find(s => s.current_star === currentStar);
    if (!stage) return { success: 0, fail: 0, destroy: 0 };

    let success = stage.success_rate;
    let fail = stage.fail_rate;
    let destroy = stage.destroy_rate;

    if (starcatch) {
        // Success rate * 1.05
        const newSuccess = Math.min(100, success * 1.05);

        // Adjust fail and destroy to maintain ratio
        // Total remaining probability space
        const oldRemaining = 100 - success;
        const newRemaining = 100 - newSuccess;

        if (oldRemaining > 0) {
            const ratio = newRemaining / oldRemaining;
            fail = fail * ratio;
            destroy = destroy * ratio;
        } else {
            fail = 0;
            destroy = 0;
        }

        success = newSuccess;
    }

    return {
        success: Number(success.toFixed(2)),
        fail: Number(fail.toFixed(2)),
        destroy: Number(destroy.toFixed(2))
    };
};

export const calculateCumulativeExpectedCost = (level: number, targetStar: number, options: StarforceOptions = {}): number => {
    if (targetStar <= 0) return 0;

    // E[i]: Expected cost to go from i -> i+1 (Normal state)
    // D[i]: Expected cost to go from i -> i+1 (Drop state - just dropped from i+1)
    // Cumulative Cost T[i] = sum(E[0]...E[i-1])

    const E: number[] = [];
    const D: number[] = [];
    let cumulative_E = 0; // T[i]
    const T: number[] = [0]; // T[i] stores cost to reach i stars

    for (let i = 0; i < targetStar; i++) {
        const currentStar = i;
        const cost = calculateStarforceCost(level, currentStar, options);
        const probs = calculateStarforceProbabilities(currentStar, options.starcatch ?? true);

        const p_s = probs.success / 100;
        const p_x = probs.destroy / 100;

        // Logic for Drop vs Keep
        // New Age Update: No drops for 15 stars and below.
        // Drops only occur at 16, 17, 18, 19, 21+ (excluding 20 checkpoint).

        let real_p_k = 0;
        let real_p_d = 0;

        if (currentStar <= 15 || currentStar === 20) {
            real_p_k = probs.fail / 100;
            real_p_d = 0;
        } else {
            real_p_k = 0;
            real_p_d = probs.fail / 100;
        }

        // Boom Cost
        // If destroyed, restore to 12 (if i>=12) or 0.
        // Cost to return to i: T[i] - T[restoreStar]
        const restoreStar = currentStar >= 12 ? 12 : 0;
        const boomCost = cumulative_E - (T[restoreStar] || 0);

        // 1. Calculate E[i]
        // E[i] = (Cost + p_d*D[i-1] + p_x*BoomCost) / p_s

        const prev_D = i > 0 ? D[i - 1] : 0;

        const e_numerator = cost + (real_p_d * prev_D) + (p_x * boomCost);
        const e_val = e_numerator / p_s;

        E.push(e_val);

        // 2. Calculate D[i]
        // D[i] = Cost + p_k*E[i] + p_d*(Cost_CT + E[i]) + p_x*(BoomCost + E[i])
        // Cost_CT is simply the meso cost of attempting i-1.
        const cost_ct = calculateStarforceCost(level, i - 1, options);

        const d_val = cost + (real_p_k * e_val) + (real_p_d * (cost_ct + e_val)) + (p_x * (boomCost + e_val));

        D.push(d_val);

        // Update Cumulative
        cumulative_E += e_val;
        T.push(cumulative_E);
    }

    return Math.round(T[targetStar]);
};
