/**
 * ============================================================================
 * 📏 스타포스 기준 (Starforce Criteria)
 * ============================================================================
 */

/**
 * 스타포스 등급별 기준
 */
export const STARFORCE_TIERS = {
    /** 최대 스타포스 (25성) */
    MAX: 25,
    /** 졸업/종결 기준 (22성) */
    ENDGAME: 22,
    /** 준종결 기준 (21성) */
    NEAR_ENDGAME: 21,
    /** 고스펙 시작 (19성) */
    HIGH_SPEC: 19,
    /** 성장 교차점 (18성 - 아케인이 앱솔을 넘어서는 지점) */
    CROSSOVER: 18,
    /** 국민 세팅 (17성) */
    STANDARD: 17,
    /** 가성비 구간 (12성) */
    COST_EFFECTIVE: 12,
    /** 입문 기준 (10성) */
    ENTRY: 10,
    /** 최소 기준 (5성) */
    MINIMUM: 5,
} as const;

/**
 * 슈페리얼 장비 스타포스 기준 (타일런트 등)
 */
export const SUPERIOR_STARFORCE = {
    /** 슈페리얼 최대 (15성) */
    MAX: 15,
    /** 준종결 (12성 - 일반 22성급 성능) */
    EXCELLENT: 12,
    /** 최소 (5성) */
    MINIMUM: 5,
} as const;

/**
 * 특수 장비 스타포스 목표
 */
export const SPECIAL_STARFORCE_GOALS = {
    /** 로얄 블랙메탈 숄더 목표 */
    ROYAL_BLACK_METAL: 12,
    /** 칠흑의 신관 반지 고스펙 기준 (22성 여명보다 강함) */
    CRIMSON_RING_HIGH: 18,
} as const;

/**
 * 장비 레벨에 따른 최대 스타포스 반환
 */
export function getMaxStarforce(level: number): number {
    if (level <= 94) return 5;
    if (level <= 107) return 8;
    if (level <= 117) return 10;
    if (level <= 127) return 15;
    if (level <= 137) return 20;
    return 25;
}

/**
 * 장비 레벨별 스타포스 누적 공/마 수치
 * (실전 효율 비교용)
 */
export const STARFORCE_CUMULATIVE_STATS = {
    /** 앱솔랩스 (160제) 22성 누적 공/마 */
    ABSOLAB_22STAR: 92,
    /** 아케인셰이드 (200제) 18성 누적 공/마 */
    ARCANE_18STAR: 39,
    /** 아케인셰이드 (200제) 17성 누적 공/마 */
    ARCANE_17STAR: 25,
} as const;

/**
 * 장비 교체 임계점
 */
export const EQUIPMENT_THRESHOLDS = {
    /** 아케인이 앱솔을 넘어서는 스타포스 (18성) */
    ARCANE_OVERTAKE_ABSOLAB: 18,
    /** 22성 앱솔과 아케인의 공/마 격차 (17성 기준) */
    ABSOLAB_ARCANE_GAP_17STAR: 67,  // 92 - 25
    /** 22성 앱솔과 아케인의 공/마 격차 (18성 기준) */
    ABSOLAB_ARCANE_GAP_18STAR: 53,  // 92 - 39
} as const;
