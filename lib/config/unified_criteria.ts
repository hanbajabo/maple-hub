/**
 * ============================================================================
 * 🎯 통합 평가 기준 (Unified Evaluation Criteria)
 * ============================================================================
 * 
 * 모든 평가 기준을 하나의 파일에서 중앙 관리합니다.
 * 기준을 변경할 때 이 파일만 수정하면 전체 시스템에 반영됩니다.
 * 
 * 작성일: 2025-12-02
 */

// ============================================================================
// 📏 스타포스 기준 (Starforce Criteria)
// ============================================================================

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

// ============================================================================
// 💎 잠재능력 기준 (Potential Criteria)
// ============================================================================

/**
 * 잠재능력 등급별 스탯 % 기준 (방어구/장신구)
 */
export const MAIN_POTENTIAL_STAT = {
    /** 레전드리 */
    LEGENDARY: {
        /** 초월급 (36% 이상 - 주스탯 12/12/12) */
        MYTHIC: 36,
        /** 엔드급 (34% 이상) */
        ENDGAME_HIGH: 34,
        /** 최상급/종결 (30~33% - 주스탯 12/12/9 또는 12/12/6) */
        ENDGAME: 30,
        /** 좋음 (21% 이상 - 주스탯 9/9/3 또는 12/6/3) */
        GOOD: 21,
        /** 조금 좋음 (18% 이상 - 주스탯+올스탯 조합) */
        DECENT_PLUS: 18,
        /** 준수/통과 (15% 이상 - 2줄 기본) */
        DECENT: 15,
    },
    /** 레전드리 (201+ 레벨 장비 - 에테르넬 등) */
    LEGENDARY_HIGH_LEVEL: {
        /** 초월급 (39% 이상) */
        MYTHIC: 39,
        /** 엔드급 (36% 이상) */
        ENDGAME_HIGH: 36,
        /** 최상급/종결 (33% 이상) */
        ENDGAME: 33,
        /** 좋음 (23% 이상) */
        GOOD: 23,
        /** 조금 좋음 (20% 이상) */
        DECENT_PLUS: 20,
        /** 준수/통과 (16% 이상) */
        DECENT: 16,
    },
    /** 제논 레전드리 (71~200제) - 올스탯만 주스탯 */
    XENON_LEGENDARY: {
        /** 초월급 (27% 이상 - 올스탯 9/9/9) */
        MYTHIC: 27,
        /** 엔드급 (24% 이상 - 올스탯 9/9/6) */
        ENDGAME_HIGH: 24,
        /** 최상급/종결 (21% 이상 - 올스탯 9/6/6 정옵) */
        ENDGAME: 21,
        /** 좋음 (18% 이상 - 올스탯 6/6/6) */
        GOOD: 18,
        /** 조금 좋음 (15% 이상) */
        DECENT_PLUS: 15,
        /** 준수/통과 (12% 이상) */
        DECENT: 12,
    },
    /** 제논 레전드리 (201+제 - 에테르넬 등) - 올스탯만 주스탯 */
    XENON_LEGENDARY_HIGH_LEVEL: {
        /** 초월급 (30% 이상 - 올스탯 10/10/10) */
        MYTHIC: 30,
        /** 엔드급 (27% 이상 - 올스탯 10/10/7) */
        ENDGAME_HIGH: 27,
        /** 최상급/종결 (24% 이상 - 올스탯 10/7/7 정옵) */
        ENDGAME: 24,
        /** 좋음 (21% 이상 - 올스탯 7/7/7) */
        GOOD: 21,
        /** 조금 좋음 (17% 이상) */
        DECENT_PLUS: 17,
        /** 준수/통과 (14% 이상) */
        DECENT: 14,
    },
    /** 제논 유니크 */
    XENON_UNIQUE: {
        /** 탈유니크급 (18% 이상 - 올스탯 6/6/6) - 레전드리 2줄보다 좋음 */
        LEGENDARY_TIER: 18,
        /** 1티어 (15% 이상 - 올스탯 6/6/3) */
        TIER1: 15,
        /** 정옵 (12% 이상 - 올스탯 6/3/3) */
        STANDARD: 12,
        /** 최소 (9% 이상 - 올스탯 6/3) */
        MINIMUM: 9,
    },
    /** 제논 에픽 */
    XENON_EPIC: {
        /** 에픽 종결 (9% 이상 - 올스탯 3/3/3 이탈) */
        ENDGAME: 9,
        /** 정옵 (6% 이상 - 올스탯 3/3) */
        STANDARD: 6,
        /** 통과 (3% 이상) */
        PASS: 3,
    },
    /** 유니크 */
    UNIQUE: {
        /** 종결급 (21% 이상 - 주스탯 7/7/7) */
        EXCELLENT: 21,
        /** 준수/통과 (15% 이상 - 주스탯 7/4/4 또는 7/7/1) */
        DECENT: 15,
        /** 최소 (10% 이상) */
        MINIMUM: 10,
    },
    /** 에픽 */
    EPIC: {
        /** 유니크급 효율 (15% 이상) */
        UNIQUE_LEVEL: 15,
        /** 완벽 (18% 이상 - 주스탯 6/6/6) */
        PERFECT: 18,
        /** 준수 (12% 이상 - 주스탯 6/3/3 또는 6/6/0) */
        DECENT: 12,
        /** 통과 (9% 이상) */
        PASS: 9,
        /** 성장 교차점 (6% 이상) */
        GROWTH: 6,
    },
} as const;

/**
 * 에디셔널 잠재능력 스탯 % 기준
 */
export const ADDITIONAL_POTENTIAL_STAT = {
    /** 레전드리 */
    LEGENDARY: {
        /** 종결급 (21% 이상) */
        EXCELLENT: 21,
        /** 최상급 (14% 이상) */
        GREAT: 14,
        /** 준수 (10% 이상) */
        DECENT: 10,
    },
    /** 유니크 */
    UNIQUE: {
        /** 종결급 (15% 이상) */
        EXCELLENT: 15,
        /** 준수 (10% 이상) */
        DECENT: 10,
    },
    /** 에픽 */
    EPIC: {
        /** 종결급 (10% 이상) */
        EXCELLENT: 10,
        /** 준수 (4% 이상) */
        DECENT: 4,
    },
} as const;

/**
 * 무기 잠재능력 기준 (WSE - Weapon/Secondary/Emblem)
 */
export const WEAPON_POTENTIAL = {
    /** 보스 공격력 % */
    BOSS_DAMAGE: {
        /** 3줄 최대 (40/40/40 = 120%) */
        THREE_LINE_MAX: 120,
        /** 1줄 최대 (40%) */
        ONE_LINE_MAX: 40,
        /** 2줄 기준 (80%) */
        TWO_LINE: 80,
    },
    /** 공/마 % 줄 수 */
    ATT_LINES: {
        /** 3줄 */
        THREE: 3,
        /** 2줄 */
        TWO: 2,
        /** 1줄 */
        ONE: 1,
    },
} as const;

/**
 * 무기/엠블렘 에디셔널 점수 기준
 */
export const WEAPON_ADDITIONAL_SCORE = {
    /** 레전드리 */
    LEGENDARY: {
        /** 종결 (88 이상 - 공/마% 3줄 완벽) */
        EXCELLENT: 88,
        /** 준수 (66 이상 - 공/마% 2줄 또는 보공 조합) */
        DECENT: 66,
        /** 아쉬움 (33 이상) */
        PASS: 33,
    },
    /** 유니크 */
    UNIQUE: {
        /** 종결급 (90 이상 - 공/마% 3줄) */
        EXCELLENT: 90,
        /** 준수 (70 이상 - 공/마% 2줄) */
        DECENT: 70,
    },
    /** 에픽 */
    EPIC: {
        /** 통과 (60 이상 - 공/마% 1줄 이상) */
        PASS: 60,
    },
} as const;

/**
 * 쿨타임 감소 기준
 */
export const COOLDOWN_REDUCTION = {
    /** 초월급 (6초 이상) */
    MYTHIC: 6,
    /** 엔드급 (5초 이상) */
    ENDGAME: 5,
    /** 최상급 (4초 이상) */
    EXCELLENT: 4,
    /** 진짜 좋음 (3초 이상) */
    GREAT: 3,
    /** 좋음 (2초 이상) */
    GOOD: 2,
} as const;

/**
 * 크리티컬 데미지 줄 수 기준
 */
export const CRIT_DAMAGE_LINES = {
    /** 초월급 (3줄) */
    MYTHIC: 3,
    /** 엔드급 (2줄) */
    ENDGAME: 2,
    /** 좋음 (1줄) */
    GOOD: 1,
} as const;

// ============================================================================
// 🔥 추가옵션 (Flame) 기준
// ============================================================================

/**
 * 무기 추가옵션 티어 기준 (공/마 수치)
 */
export const WEAPON_FLAME_TIERS = {
    /** 아케인셰이드 (200제) */
    ARCANE: {
        TIER1_MIN: 125,
        TIER2_MIN: 98,
    },
    /** 앱솔랩스 (160제) */
    ABSOLAB: {
        TIER1_MIN: 95,
        TIER2_MIN: 74,
    },
    /** 파프니르 (150제) */
    FAFNIR: {
        TIER1_MIN: 75,
        TIER2_MIN: 58,
    },
    /** 제네시스 최소 기준 */
    GENESIS_MIN: 130,
} as const;

/**
 * 방어구/장신구 추가옵션 점수 기준
 * 공식: 주스탯 + (공/마 × 4) + (올스탯 × 10)
 */
export const ARMOR_FLAME_SCORE = {
    /** 140~159 레벨 */
    LEVEL_140: {
        EXCELLENT: 140,  // 종결
        GREAT: 120,      // 꽤 좋음
        DECENT: 100,     // 준수
    },
    /** 160~199 레벨 */
    LEVEL_160: {
        EXCELLENT: 140,  // 종결
        GREAT: 125,      // 훌륭
        DECENT: 120,     // 준수
    },
    /** 200~249 레벨 */
    LEVEL_200: {
        EXCELLENT: 170,  // 종결
        GREAT: 150,      // 아주 좋음
        DECENT: 140,     // 꽤 좋음
        NORMAL: 120,     // 보통 (부캐용)
    },
    /** 250+ 레벨 (에테르넬) */
    LEVEL_250: {
        EXCELLENT: 185,  // 종결
        DECENT: 170,     // 준수
    },
} as const;

// ============================================================================
// 📜 주문서 작 기준 (Scroll Upgrade)
// ============================================================================

/**
 * 주문서 작 평가 기준 (평균 공/마 증가량)
 */
export const SCROLL_QUALITY = {
    /** 완작 (9 이상 - 15% 주문서 성공) */
    PERFECT: 9,
    /** 수작 (7 이상 - 15%/30% 혼합) */
    GREAT: 7,
    /** 평작 (5 이상 - 30%/70% 혼합) */
    NORMAL: 5,
    /** 떡작 (3 이상 - 70%/100% 주문서) */
    BASIC: 3,
} as const;

/**
 * 펫 장비 주문서 기준
 */
export const PET_SCROLL_QUALITY = {
    /** 종결 (프펫공/프펫마 - 4 이상) */
    PERFECT: 4,
    /** 현역 (일반 펫공 - 2 이상) */
    NORMAL: 2,
} as const;

/**
 * 부위별 상세 주문서 작 기준
 */
export const SCROLL_STANDARDS = {
    /** 장갑 (공격력 기준) */
    GLOVE: {
        /** 놀긍 완작 (6 이상) */
        CHAOS_EXCELLENT: 6,
        /** 놀긍 준수 (5 이상) */
        CHAOS_GOOD: 5,
        /** 아케인 15% 완작 (4 이상) */
        ARCANE_15: 4,
        /** 앱솔랩스 15% / 30% 완작 (3 이상) */
        NORMAL_15_30: 3,
        /** 70% 작 (2 이상) */
        SCROLL_70: 2,
    },
    /** 방어구 (주스탯/HP 기준) */
    ARMOR: {
        /** 주흔 30% (7 이상) */
        STAT_30: 7,
        /** 주흔 70% (4 이상) */
        STAT_70: 4,
        /** HP 30% (400 이상) */
        HP_30: 400,
        /** HP 70% (200 이상) */
        HP_70: 200,
        /** 놀긍 공격력 기준 (4 이상) */
        CHAOS_ATT: 4,
    },
    /** 장신구 (공격력 기준) */
    ACCESSORY: {
        /** 놀긍 리턴 종결 (5 이상) */
        CHAOS_RETURN: 5,
        /** 프악공/프악마 완작 (4 이상) */
        PREMIUM: 4,
        /** 일반 긍혼/악공 (2 이상) */
        NORMAL: 2,
    },
} as const;

// ============================================================================
// ⚖️ 장비 비교 기준 (Equipment Comparison)
// ============================================================================

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

// ============================================================================
// 🎓 평가 등급 매핑 (Evaluation Labels)
// ============================================================================

/**
 * 평가 등급 레이블
 */
export const GRADE_LABELS = {
    /** 신화급 - 전설적, 거의 불가능 */
    MYTHIC: '신화',
    /** 초월급 - 전서버급 */
    TRANSCENDENT: '초월급',
    /** 엔드급 - 최종 목표 달성 */
    ENDGAME: '엔드급',
    /** 종결 - 졸업 수준 */
    EXCELLENT: '종결',
    /** 최상급 - 매우 우수 */
    SUPERIOR: '최상급',
    /** 훌륭 - 우수 */
    GREAT: '훌륭',
    /** 좋음 - 양호 */
    GOOD: '좋음',
    /** 준수 - 적당함 */
    DECENT: '준수',
    /** 통과 - 최소 기준 만족 */
    PASS: '통과',
    /** 보통 - 평범 */
    NORMAL: '보통',
    /** 아쉬움 - 개선 필요 */
    LACKING: '아쉬움',
    /** 부족 - 현저히 부족 */
    POOR: '부족',
    /** 재설정 필요 - 교체/개선 시급 */
    NEEDS_RESET: '재설정 필요',
} as const;

// ============================================================================
// 🛡️ 특수 아이템 키워드
// ============================================================================

/**
 * 이벤트 반지 키워드
 */
export const EVENT_RING_KEYWORDS = [
    "테네브리스",
    "SS급",
    "어웨이크",
    "글로리온",
    "카오스",
    "벤젼스",
    "결속의",
    "이터널 플레임",
    "어드벤처 딥다크",
    "오닉스",
    "코스모스",
    "이벤트 링",
    "어드벤처",
    "시너지",
    "쥬얼",
    "다크 크리티컬",
] as const;

/**
 * 슈페리얼 아이템 키워드
 */
export const SUPERIOR_ITEM_KEYWORDS = [
    "타일런트",
    "노바",
    "헬리시움",
] as const;

/**
 * 특수 반지 키워드 (시드링 등)
 */
export const SPECIAL_RING_KEYWORDS = [
    "웨폰퍼프",
    "리스트레인트",
    "리스크테이커",
    "컨티뉴어스",
    "링 오브 썸",
    "크라이시스",
] as const;

/**
 * 여명 보스 세트 키워드
 */
export const DAWN_BOSS_KEYWORDS = [
    "트와일라이트 마크",
    "에스텔라 이어링",
    "데이브레이크 펜던트",
    "여명의 가디언 엔젤 링",
] as const;

/**
 * 특수 강화 불가 반지
 */
export const SPECIAL_NON_UPGRADABLE_RINGS = [
    "어비스 헌터스 링",
    "크리티컬 링",
] as const;

/**
 * 칠흑의 보스 세트 키워드
 */
export const PITCH_BOSS_KEYWORDS = [
    "저주받은 마도서",
    "몽환의 벨트",
    "루즈 컨트롤",
    "마력이 깃든",
    "거대한 공포",
    "고통의 근원",
    "창세의 뱃지",
    "미트라의 분노",
] as const;

/**
 * 기계 심장 키워드
 */
export const MECHANICAL_HEART_KEYWORDS = [
    "컴플리트 언더컨트롤",
    "플라즈마",
    "블랙",
    "리퀴드메탈",
    "페어리",
    "티타늄",
    "리튬",
    "골드",
] as const;

/**
 * 스타포스 불가 슬롯
 */
export const NO_STARFORCE_SLOTS = [
    "훈장",
    "뱃지",
    "포켓 아이템",
    "엠블렘",
] as const;

/**
 * 주문서 작업 불가 슬롯
 */
export const NO_SCROLL_SLOTS = [
    "엠블렘",
] as const;

/**
 * 환생의 불꽃 사용 불가 슬롯
 */
export const NO_FLAME_SLOTS = [
    "엠블렘",
    "보조무기",
] as const;

// ============================================================================
// 🧮 변환 공식 (Conversion Formulas)
// ============================================================================

/**
 * 스탯 변환 비율
 */
export const STAT_CONVERSION = {
    /** 공/마 1 = 주스탯 4 */
    ATT_TO_STAT: 4,
    /** 주스탯 10 = 주스탯 1% */
    STAT_TO_PERCENT: 10,
    /** 올스탯 1% = 주스탯 0.5% (대략) */
    ALLSTAT_TO_MAINSTAT: 0.5,
    /** 레벨당 스탯 +2 = 주스탯 6% */
    LEVEL_STAT_2_TO_PERCENT: 6,
    /** 레벨당 스탯 +1 = 주스탯 3% */
    LEVEL_STAT_1_TO_PERCENT: 3,
} as const;

/**
 * 무기 에디셔널 점수 계산 가중치
 */
export const WEAPON_ADDITIONAL_WEIGHTS = {
    /** 레전드리 */
    LEGENDARY: {
        ATT_PERCENT: 3,    // 공/마 % 가중치
        BOSS_DMG: 1.5,     // 보스 공격력 가중치
        DAMAGE: 1,         // 일반 데미지 가중치
        MAX_POINTS: 9,     // 최대 점수 (3줄 × 3점)
    },
    /** 유니크 */
    UNIQUE: {
        ATT_PERCENT: 3,
        BOSS_DMG: 1,
        DAMAGE: 0.5,
        MAX_POINTS: 9,
    },
} as const;

// ============================================================================
// 🔍 헬퍼 함수 (Helper Functions)
// ============================================================================

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
 * 아이템 이름으로 슈페리얼 여부 판별
 */
export function isSuperiorItem(itemName: string): boolean {
    return SUPERIOR_ITEM_KEYWORDS.some(keyword => itemName.includes(keyword));
}

/**
 * 아이템 이름으로 이벤트 링 여부 판별
 */
export function isEventRing(itemName: string): boolean {
    return EVENT_RING_KEYWORDS.some(keyword => itemName.includes(keyword));
}

/**
 * 슬롯으로 스타포스 가능 여부 판별
 */
export function canStarforce(slot: string, itemName: string): boolean {
    // 스타포스 불가 슬롯 체크
    if (NO_STARFORCE_SLOTS.some(noSfSlot => slot.includes(noSfSlot))) {
        return false;
    }

    // 보조무기는 방패만 스타포스 가능
    if (slot.includes("보조무기") && !slot.includes("방패")) {
        return false;
    }

    return true;
}

/**
 * 슬롯으로 주문서 작업 가능 여부 판별
 */
export function canScroll(slot: string): boolean {
    return !NO_SCROLL_SLOTS.some(noScrollSlot => slot.includes(noScrollSlot));
}

/**
 * 슬롯으로 환생의 불꽃 사용 가능 여부 판별
 */
export function canFlame(slot: string): boolean {
    return !NO_FLAME_SLOTS.some(noFlameSlot => slot.includes(noFlameSlot));
}

/**
 * 스타포스 수치에 따른 평가 등급 반환
 */
export function getStarforceGrade(starforce: number, isSuperior: boolean = false): string {
    if (isSuperior) {
        if (starforce >= SUPERIOR_STARFORCE.EXCELLENT) return GRADE_LABELS.EXCELLENT;
        if (starforce >= SUPERIOR_STARFORCE.MINIMUM) return GRADE_LABELS.NORMAL;
        return GRADE_LABELS.POOR;
    }

    if (starforce >= STARFORCE_TIERS.ENDGAME) return GRADE_LABELS.ENDGAME;
    if (starforce >= STARFORCE_TIERS.NEAR_ENDGAME) return GRADE_LABELS.SUPERIOR;
    if (starforce >= STARFORCE_TIERS.HIGH_SPEC) return GRADE_LABELS.GREAT;
    if (starforce >= STARFORCE_TIERS.CROSSOVER) return GRADE_LABELS.GOOD;
    if (starforce >= STARFORCE_TIERS.STANDARD) return GRADE_LABELS.DECENT;
    if (starforce >= STARFORCE_TIERS.COST_EFFECTIVE) return GRADE_LABELS.PASS;
    if (starforce >= STARFORCE_TIERS.ENTRY) return GRADE_LABELS.NORMAL;
    return GRADE_LABELS.POOR;
}

/**
 * 직업별 잠재능력 스탯 %에 따른 평가 등급 반환 (메인 잠재)
 */
export function getMainPotentialGrade(
    statPercent: number,
    grade: '레전드리' | '유니크' | '에픽',
    itemLevel: number = 200,
    job?: string
): string {
    if (grade === '레전드리') {
        const criteria = getPotentialCriteria(itemLevel, job);

        if (statPercent >= criteria.MYTHIC) return GRADE_LABELS.MYTHIC;
        if (statPercent >= criteria.ENDGAME_HIGH) return GRADE_LABELS.ENDGAME;
        if (statPercent >= criteria.ENDGAME) return GRADE_LABELS.EXCELLENT;
        if (statPercent >= criteria.GOOD) return GRADE_LABELS.GOOD;
        if (statPercent >= criteria.DECENT_PLUS) return GRADE_LABELS.DECENT;
        if (statPercent >= criteria.DECENT) return GRADE_LABELS.PASS;
        return GRADE_LABELS.LACKING;
    }

    if (grade === '유니크') {
        // 제논 유니크 별도 처리
        if (job && (job.includes('제논') || job.replace(/\s/g, '').includes('제논'))) {
            const criteria = MAIN_POTENTIAL_STAT.XENON_UNIQUE;
            if (statPercent >= criteria.LEGENDARY_TIER) return "탈유니크급";
            if (statPercent >= criteria.TIER1) return "1티어";
            if (statPercent >= criteria.STANDARD) return "정옵";
            if (statPercent >= criteria.MINIMUM) return GRADE_LABELS.PASS;
            return GRADE_LABELS.LACKING;
        }

        const criteria = MAIN_POTENTIAL_STAT.UNIQUE;
        if (statPercent >= criteria.EXCELLENT) return GRADE_LABELS.EXCELLENT;
        if (statPercent >= criteria.DECENT) return GRADE_LABELS.DECENT;
        if (statPercent >= criteria.MINIMUM) return GRADE_LABELS.PASS;
        return GRADE_LABELS.LACKING;
    }

    if (grade === '에픽') {
        // 제논 에픽 별도 처리
        if (job && (job.includes('제논') || job.replace(/\s/g, '').includes('제논'))) {
            const criteria = MAIN_POTENTIAL_STAT.XENON_EPIC;
            if (statPercent >= criteria.ENDGAME) return "에픽 종결";
            if (statPercent >= criteria.STANDARD) return "정옵";
            if (statPercent >= criteria.PASS) return GRADE_LABELS.PASS;
            return GRADE_LABELS.POOR;
        }

        const criteria = MAIN_POTENTIAL_STAT.EPIC;
        if (statPercent >= criteria.PERFECT) return GRADE_LABELS.SUPERIOR;
        if (statPercent >= criteria.UNIQUE_LEVEL) return GRADE_LABELS.EXCELLENT;
        if (statPercent >= criteria.DECENT) return GRADE_LABELS.DECENT;
        if (statPercent >= criteria.PASS) return GRADE_LABELS.PASS;
        if (statPercent >= criteria.GROWTH) return GRADE_LABELS.NORMAL;
        return GRADE_LABELS.POOR;
    }

    return GRADE_LABELS.NORMAL;
}

/**
 * 직업과 아이템 레벨에 따라 적절한 잠재능력 기준을 반환
 */
export function getPotentialCriteria(itemLevel: number, job?: string) {
    const isXenon = job && (job.includes('제논') || job.replace(/\s/g, '').includes('제논'));
    const is201Plus = itemLevel >= 201;

    if (isXenon) {
        return is201Plus
            ? MAIN_POTENTIAL_STAT.XENON_LEGENDARY_HIGH_LEVEL
            : MAIN_POTENTIAL_STAT.XENON_LEGENDARY;
    } else {
        return is201Plus
            ? MAIN_POTENTIAL_STAT.LEGENDARY_HIGH_LEVEL
            : MAIN_POTENTIAL_STAT.LEGENDARY;
    }
}

/**
 * 에디셔널 잠재 스탯 %에 따른 평가 등급 반환
 */
export function getAdditionalPotentialGrade(
    statPercent: number,
    grade: '레전드리' | '유니크' | '에픽'
): string {
    if (grade === '레전드리') {
        const criteria = ADDITIONAL_POTENTIAL_STAT.LEGENDARY;
        if (statPercent >= criteria.EXCELLENT) return GRADE_LABELS.EXCELLENT;
        if (statPercent >= criteria.GREAT) return GRADE_LABELS.SUPERIOR;
        if (statPercent >= criteria.DECENT) return GRADE_LABELS.DECENT;
        return GRADE_LABELS.LACKING;
    }

    if (grade === '유니크') {
        const criteria = ADDITIONAL_POTENTIAL_STAT.UNIQUE;
        if (statPercent >= criteria.EXCELLENT) return GRADE_LABELS.EXCELLENT;
        if (statPercent >= criteria.DECENT) return GRADE_LABELS.DECENT;
        return GRADE_LABELS.LACKING;
    }

    if (grade === '에픽') {
        const criteria = ADDITIONAL_POTENTIAL_STAT.EPIC;
        if (statPercent >= criteria.EXCELLENT) return GRADE_LABELS.EXCELLENT;
        if (statPercent >= criteria.DECENT) return GRADE_LABELS.DECENT;
        return GRADE_LABELS.LACKING;
    }

    return GRADE_LABELS.NORMAL;
}
