/**
 * ============================================================================
 * 🎓 평가 등급 매핑 및 특수 아이템 키워드
 * ============================================================================
 */

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
