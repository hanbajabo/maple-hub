/**
 * 아이템 평가 기준 (Evaluation Criteria)
 * 
 * 모든 평가 기준값을 중앙에서 관리합니다.
 * 기준을 변경할 때 이 파일만 수정하면 전체 시스템에 반영됩니다.
 */

// ============================================================================
// 스타포스 기준 (Starforce Criteria)
// ============================================================================

/**
 * 무기 스타포스 기준
 */
export const WEAPON_STARFORCE = {
    /** 졸업/종결 기준 (22성) */
    ENDGAME: 22,
    /** 국민 세팅 기준 (17성) */
    STANDARD: 17,
    /** 입문 기준 (10성) */
    ENTRY: 10,
    /** 최소 기준 (5성) */
    MINIMUM: 5,
} as const;

/**
 * 방어구/장신구 스타포스 기준
 */
export const ARMOR_STARFORCE = {
    /** 졸업/종결 기준 (22성) */
    ENDGAME: 22,
    /** 국민 세팅 기준 (17성) */
    STANDARD: 17,
    /** 입문 기준 (10성) */
    ENTRY: 10,
    /** 최소 기준 (5성) */
    MINIMUM: 5,
} as const;

/**
 * 특수 장비 스타포스 기준
 */
export const SPECIAL_STARFORCE = {
    /** 로얄 블랙메탈 숄더 목표 (12성) */
    ROYAL_BLACK_METAL_SHOULDER: 12,
    /** 타일런트 장신구 가성비 기준 (5성) */
    TYRANT_COST_EFFECTIVE: 5,
} as const;

// ============================================================================
// 잠재능력 기준 (Potential Criteria)
// ============================================================================

/**
 * 무기 잠재능력 기준
 */
export const WEAPON_POTENTIAL = {
    /** 보스 공격력 1줄 최대값 (40%) */
    BOSS_DMG_MAX_LINE: 40,
    /** 보스 공격력 3줄 합계 (120%) */
    BOSS_DMG_3LINE: 120,
    /** 보스 공격력 2줄 합계 (80%) */
    BOSS_DMG_2LINE: 80,
    /** 공/마 3줄 개수 */
    ATT_3LINE_COUNT: 3,
    /** 공/마 2줄 개수 */
    ATT_2LINE_COUNT: 2,
} as const;

/**
 * 방어구/장신구 잠재능력 기준 (주스탯 %)
 */
export const ARMOR_POTENTIAL = {
    /** 레전드리 - 종결 기준 (33% 이상, 주스탯 12/12/9) */
    LEGENDARY_EXCELLENT: 33,
    /** 레전드리 - 훌륭 기준 (21% 이상, 주스탯 9/9/3 또는 12/6/3) */
    LEGENDARY_GOOD: 21,
    /** 레전드리 - 준수 기준 (15% 이상) */
    LEGENDARY_DECENT: 15,
    /** 유니크 - 종결급 기준 (21% 이상) */
    UNIQUE_EXCELLENT: 21,
    /** 유니크 - 준수 기준 (15% 이상) */
    UNIQUE_DECENT: 15,
    /** 에픽 - 종결급 기준 */
    EPIC_EXCELLENT: 50, // 상대평가 점수
} as const;

/**
 * 에디셔널 잠재능력 기준
 */
export const ADDITIONAL_POTENTIAL = {
    /** 레전드리 - 종결 기준 (주스탯 21% 이상) */
    LEGENDARY_EXCELLENT: 21,
    /** 레전드리 - 최상급 기준 (주스탯 14% 이상) */
    LEGENDARY_GREAT: 14,
    /** 레전드리 - 준수 기준 (주스탯 10% 이상) */
    LEGENDARY_DECENT: 10,
    /** 유니크 - 종결급 기준 (15% 이상) */
    UNIQUE_EXCELLENT: 15,
    /** 유니크 - 준수 기준 (10% 이상) */
    UNIQUE_DECENT: 10,
} as const;

// ============================================================================
// 추가옵션 (Flame) 기준
// ============================================================================

/**
 * 무기 추가옵션 티어 기준 (공/마 수치)
 */
export const WEAPON_FLAME = {
    /** 아케인셰이드 (200제) */
    ARCANE: {
        TIER1_MIN: 125,  // 1티어 최소값 (약 130~145)
        TIER2_MIN: 98,   // 2티어 최소값 (약 100~115)
    },
    /** 앱솔랩스 (160제) */
    ABSOLAB: {
        TIER1_MIN: 95,   // 1티어 최소값 (약 100~120)
        TIER2_MIN: 74,   // 2티어 최소값 (약 75~90)
    },
    /** 파프니르 (150제) */
    FAFNIR: {
        TIER1_MIN: 75,   // 1티어 최소값 (약 80~100)
        TIER2_MIN: 58,   // 2티어 최소값 (약 60~75)
    },
    /** 제네시스 특별 기준 */
    GENESIS_MINIMUM: 130, // 제네시스는 이 정도는 되어야 함
} as const;

/**
 * 방어구 추가옵션 점수 기준
 * (주스탯 + 공/마*4 + 올스탯*10 계산 방식)
 */
export const ARMOR_FLAME = {
    /** 우수 기준 */
    EXCELLENT: 80,
    /** 준수 기준 */
    DECENT: 60,
    /** 보통 기준 */
    NORMAL: 40,
} as const;

// ============================================================================
// 장비 비교 기준 (Starforce × Item Level)
// ============================================================================

/**
 * 장비 실전 효율 비교
 * 예: 22성 앱솔 vs 17성 아케인
 */
export const EQUIPMENT_COMPARISON = {
    /** 22성 앱솔랩스 (160제) 누적 공/마 */
    ABSOLAB_22STAR: 92,
    /** 17성 아케인셰이드 (200제) 누적 공/마 */
    ARCANE_17STAR: 25,
    /** 18성 아케인셰이드 (200제) - 앱솔 넘어서는 기준점 */
    ARCANE_OVERTAKE: 18,
} as const;

// ============================================================================
// 평가 등급 매핑 (Evaluation Grades)
// ============================================================================

/**
 * 평가 등급 문자열
 */
export const EVALUATION_GRADE = {
    MYTHIC: '신화',       // 전설급, 거의 불가능한 수준
    ENDGAME: '종결',      // 최종 목표 달성
    EXCELLENT: '최고',    // 매우 우수
    GREAT: '훌륭',        // 우수
    GOOD: '좋음',         // 양호
    DECENT: '준수',       // 적당함
    NORMAL: '보통',       // 평범
    LACKING: '부족',      // 개선 필요
    POOR: '아쉬움',       // 현저히 부족
} as const;

// ============================================================================
// 유틸리티 함수
// ============================================================================

/**
 * 스타포스 기준에 따른 평가 등급 반환
 */
export function getStarforceGrade(starforce: number, type: 'weapon' | 'armor' = 'weapon'): string {
    const criteria = type === 'weapon' ? WEAPON_STARFORCE : ARMOR_STARFORCE;

    if (starforce >= criteria.ENDGAME) return EVALUATION_GRADE.ENDGAME;
    if (starforce >= criteria.STANDARD) return EVALUATION_GRADE.NORMAL;
    if (starforce >= criteria.ENTRY) return EVALUATION_GRADE.LACKING;
    return EVALUATION_GRADE.POOR;
}

/**
 * 주스탯 %에 따른 평가 등급 반환 (메인 잠재)
 */
export function getPotentialGrade(statPercent: number, grade: '레전드리' | '유니크' | '에픽'): string {
    if (grade === '레전드리') {
        if (statPercent >= ARMOR_POTENTIAL.LEGENDARY_EXCELLENT) return EVALUATION_GRADE.ENDGAME;
        if (statPercent >= ARMOR_POTENTIAL.LEGENDARY_GOOD) return EVALUATION_GRADE.GREAT;
        if (statPercent >= ARMOR_POTENTIAL.LEGENDARY_DECENT) return EVALUATION_GRADE.DECENT;
    } else if (grade === '유니크') {
        if (statPercent >= ARMOR_POTENTIAL.UNIQUE_EXCELLENT) return EVALUATION_GRADE.ENDGAME;
        if (statPercent >= ARMOR_POTENTIAL.UNIQUE_DECENT) return EVALUATION_GRADE.DECENT;
    }
    return EVALUATION_GRADE.LACKING;
}
