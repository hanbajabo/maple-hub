/**
 * 잠재능력 설정 통합 관리
 * 
 * 레벨별 잠재능력 수치 및 평가 기준을 중앙에서 관리합니다.
 * 수치 변경이 필요할 경우 이 파일만 수정하면 모든 진단 로직에 반영됩니다.
 */

// ============================================
// 1. 기본 잠재능력 수치 (레벨별)
// ============================================

export const POTENTIAL_STAT_VALUES = {
    // 71~200레벨 장비 (파프니르, 앱솔, 아케인 등)
    TIER_1: {
        levelRange: [71, 200] as const,
        LEGENDARY: {
            mainStat: 12,      // 주스탯 % (STR, DEX, INT, LUK, HP)
            allStat: 9,        // 올스탯 %
            attMag: 12,        // 공격력/마력 % (WSE 전용)
        },
        UNIQUE: {
            mainStat: 9,
            allStat: 6,
            attMag: 9,
        },
        EPIC: {
            mainStat: 6,
            allStat: 3,
            attMag: 6,
        },
        RARE: {
            mainStat: 3,
            allStat: 0,        // 레어에는 올스탯 없음
            attMag: 3,
        },
    },

    // 201~250레벨 장비 (에테르넬 등) - 각 수치에 +1% 보너스
    TIER_2: {
        levelRange: [201, 250] as const,
        LEGENDARY: {
            mainStat: 13,      // +1%
            allStat: 10,       // +1%
            attMag: 13,        // +1%
        },
        UNIQUE: {
            mainStat: 10,      // +1%
            allStat: 7,        // +1%
            attMag: 10,        // +1%
        },
        EPIC: {
            mainStat: 7,       // +1%
            allStat: 4,        // +1%
            attMag: 7,         // +1%
        },
        RARE: {
            mainStat: 4,       // +1%
            allStat: 0,
            attMag: 4,         // +1%
        },
    },
} as const;

// ============================================
// 2. 특수 옵션 (레벨 무관)
// ============================================

export const SPECIAL_OPTIONS = {
    // 크리티컬 데미지 (주로 장갑)
    CRIT_DAMAGE: {
        LEGENDARY: 8,
        UNIQUE: 4,
        EPIC: 2,
    },

    // 쿨타임 감소 (주로 모자)
    COOLDOWN: {
        values: [1, 2, 4] as const,  // 가능한 초 단위
    },

    // 방어율 무시
    IED: {
        LEGENDARY: 40,
        UNIQUE: 30,
        EPIC: 15,
    },

    // 보스 데미지
    BOSS_DAMAGE: {
        LEGENDARY: 40,
        UNIQUE: 30,
        EPIC: 20,
    },
} as const;

// ============================================
// 3. 평가 기준 (정옵, 이탈, 올이탈)
// ============================================

export const POTENTIAL_THRESHOLDS = {
    LEGENDARY: {
        // 71~200레벨 (12%/줄)
        TIER_1: {
            TRIPLE_PRIME: 36,   // 올이탈 (12×3)
            DOUBLE_PRIME_PLUS: 33,  // 쌍이탈+ (12×2 + 9)
            DOUBLE_PRIME: 24,   // 쌍이탈 (12×2)
            PERFECT: 30,        // 정옵 (다른 등급 3줄, 10×3)
            GOOD: 27,           // 고스펙 (9×3)
            STANDARD: 21,       // 표준 (유니크 최대, 9+9+9 or 12+9)
        },

        // 201~250레벨 (13%/줄)
        TIER_2: {
            TRIPLE_PRIME: 39,   // 올이탈 (13×3)
            DOUBLE_PRIME_PLUS: 35,  // 쌍이탈+ (13×2 + 9)
            DOUBLE_PRIME: 26,   // 쌍이탈 (13×2)
            PERFECT: 33,        // 정옵 (TIER_1 올이탈 = 12×3)
            GOOD: 30,           // 고스펙 (10×3)
            STANDARD: 23,       // 표준
        },
    },

    UNIQUE: {
        TIER_1: {
            PERFECT: 27,        // 3줄 (9×3)
            GOOD: 18,           // 2줄 (9×2)
            STANDARD: 15,       // 표준 (에픽 최대 + 유니크 1줄)
        },
        TIER_2: {
            PERFECT: 30,        // 3줄 (10×3)
            GOOD: 20,           // 2줄 (10×2)
            STANDARD: 17,       // 표준
        },
    },

    EPIC: {
        TIER_1: {
            PERFECT: 18,        // 3줄 (6×3)
            GOOD: 12,           // 2줄 (6×2)
            STANDARD: 9,        // 표준 (에픽 1줄 + 레어 2줄)
        },
        TIER_2: {
            PERFECT: 21,        // 3줄 (7×3)
            GOOD: 14,           // 2줄 (7×2)
            STANDARD: 11,       // 표준
        },
    },
} as const;

// ============================================
// 4. 헬퍼 함수
// ============================================

/**
 * 아이템 레벨에 따라 적절한 티어 선택
 */
export function getTier(itemLevel: number): 'TIER_1' | 'TIER_2' {
    return itemLevel >= 201 ? 'TIER_2' : 'TIER_1';
}

/**
 * 레벨과 등급에 맞는 잠재능력 수치 반환
 */
export function getPotentialValues(itemLevel: number, grade: string) {
    const tier = getTier(itemLevel);
    const statValues = POTENTIAL_STAT_VALUES[tier];

    return statValues[grade as keyof typeof statValues] || statValues.LEGENDARY;
}

/**
 * 레벨과 등급에 맞는 평가 기준 반환
 */
export function getPotentialThresholds(itemLevel: number, grade: string) {
    const tier = getTier(itemLevel);
    const thresholds = POTENTIAL_THRESHOLDS[grade as keyof typeof POTENTIAL_THRESHOLDS];

    if (!thresholds) return POTENTIAL_THRESHOLDS.LEGENDARY[tier];
    return thresholds[tier];
}

/**
 * 주스탯 %를 평가하여 등급 반환
 */
export function evaluateStatPercent(itemLevel: number, grade: string, statPct: number): string {
    const thresholds = getPotentialThresholds(itemLevel, grade);

    if (grade === '레전드리') {
        if (statPct >= thresholds.TRIPLE_PRIME) return '올이탈';
        if (statPct >= thresholds.DOUBLE_PRIME_PLUS) return '쌍이탈+';
        if (statPct >= thresholds.PERFECT) return '정옵';
        if (statPct >= thresholds.GOOD) return '고스펙';
        if (statPct >= thresholds.STANDARD) return '표준';
        return '미흡';
    }

    if (grade === '유니크') {
        if (statPct >= thresholds.PERFECT) return '완벽';
        if (statPct >= thresholds.GOOD) return '준수';
        if (statPct >= thresholds.STANDARD) return '표준';
        return '미흡';
    }

    if (grade === '에픽') {
        if (statPct >= thresholds.PERFECT) return '완벽';
        if (statPct >= thresholds.GOOD) return '준수';
        if (statPct >= thresholds.STANDARD) return '표준';
        return '미흡';
    }

    return '미흡';
}
