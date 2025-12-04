/**
 * ============================================================================
 * 🎯 통합 평가 기준 (Unified Evaluation Criteria)
 * ============================================================================
 * 
 * 모든 평가 기준을 카테고리별로 분리하여 관리합니다.
 * 기존 API 호환성을 위해 모든 항목을 re-export합니다.
 * 
 * 모듈화 완료: 2025-12-04
 * - starforce.ts: 스타포스 기준
 * - potential.ts: 잠재능력 기준
 * - flame.ts: 추가옵션 기준
 * - scroll.ts: 주문서 기준
 * - common.ts: 등급 레이블 및 키워드
 * - helpers.ts: 헬퍼 함수
 */

// 스타포스 기준
export {
    STARFORCE_TIERS,
    SUPERIOR_STARFORCE,
    SPECIAL_STARFORCE_GOALS,
    STARFORCE_CUMULATIVE_STATS,
    EQUIPMENT_THRESHOLDS,
    getMaxStarforce,
} from './criteria/starforce';

// 잠재능력 기준
export {
    MAIN_POTENTIAL_STAT,
    ADDITIONAL_POTENTIAL_STAT,
    WEAPON_POTENTIAL,
    WEAPON_ADDITIONAL_SCORE,
    COOLDOWN_REDUCTION,
    CRIT_DAMAGE_LINES,
    WEAPON_ADDITIONAL_WEIGHTS,
    getPotentialCriteria,
} from './criteria/potential';

// 추가옵션 기준
export {
    WEAPON_FLAME_TIERS,
    ARMOR_FLAME_SCORE,
} from './criteria/flame';

// 주문서 기준
export {
    SCROLL_QUALITY,
    PET_SCROLL_QUALITY,
    SCROLL_STANDARDS,
} from './criteria/scroll';

// 공통 (등급, 키워드, 변환)
export {
    GRADE_LABELS,
    EVENT_RING_KEYWORDS,
    SUPERIOR_ITEM_KEYWORDS,
    SPECIAL_RING_KEYWORDS,
    DAWN_BOSS_KEYWORDS,
    SPECIAL_NON_UPGRADABLE_RINGS,
    PITCH_BOSS_KEYWORDS,
    MECHANICAL_HEART_KEYWORDS,
    NO_STARFORCE_SLOTS,
    NO_SCROLL_SLOTS,
    NO_FLAME_SLOTS,
    STAT_CONVERSION,
} from './criteria/common';

// 헬퍼 함수
export {
    isSuperiorItem,
    isEventRing,
    canStarforce,
    canScroll,
    canFlame,
    getStarforceGrade,
    getMainPotentialGrade,
    getAdditionalPotentialGrade,
} from './criteria/helpers';
