/**
 * 메이플스토리 레벨별 사냥 경험치 데이터
 * 출처: 나무위키 메이플스토리/레벨
 * 
 * 기준:
 * - 경험치 풀도핑 (3배 경쿠 기준)
 * - 최적 지형, 최고 경험치 몬스터, 원킬컷/원젠컷
 * - 버닝 1단계 기준
 * - 프리미엄 PC방 아님
 * - 경험치몹 부스터/이벤트 미포함
 */

export interface HuntingExpData {
    levelRange: string;
    startLevel: number;
    endLevel: number;
    minTimePerLevel: number; // 분 단위
    maxTimePerLevel: number; // 분 단위
    huntingGrounds: string[]; // 추천 사냥터
    expPerHour: number; // 시간당 경험치 (억)
    specialNote?: string; // 특수 조건 (숨호, 숨M, 숨리 등)
}

export const HUNTING_EXP_DATA: HuntingExpData[] = [
    {
        levelRange: "200 → 205",
        startLevel: 200,
        endLevel: 205,
        minTimePerLevel: 23,
        maxTimePerLevel: 30,
        huntingGrounds: ["소멸의 여로"],
        expPerHour: 73,
    },
    {
        levelRange: "200 → 205 (숨호)",
        startLevel: 200,
        endLevel: 205,
        minTimePerLevel: 9,
        maxTimePerLevel: 13,
        huntingGrounds: ["소멸의 여로"],
        expPerHour: 153,
        specialNote: "숨겨진 호수 적용",
    },
    {
        levelRange: "205 → 210",
        startLevel: 205,
        endLevel: 210,
        minTimePerLevel: 23,
        maxTimePerLevel: 39,
        huntingGrounds: ["소멸의 여로", "리버스 시티"],
        expPerHour: 118,
    },
    {
        levelRange: "205 → 210 (숨M)",
        startLevel: 205,
        endLevel: 210,
        minTimePerLevel: 10,
        maxTimePerLevel: 16,
        huntingGrounds: ["소멸의 여로", "리버스 시티"],
        expPerHour: 218,
        specialNote: "숨겨진 미토스 숲 적용",
    },
    {
        levelRange: "210 → 215",
        startLevel: 210,
        endLevel: 215,
        minTimePerLevel: 23,
        maxTimePerLevel: 33,
        huntingGrounds: ["츄츄 아일랜드"],
        expPerHour: 212,
    },
    {
        levelRange: "215 → 220",
        startLevel: 215,
        endLevel: 220,
        minTimePerLevel: 42,
        maxTimePerLevel: 63,
        huntingGrounds: ["츄츄 아일랜드", "얌얌 아일랜드"],
        expPerHour: 209,
    },
    {
        levelRange: "220 → 225",
        startLevel: 220,
        endLevel: 225,
        minTimePerLevel: 53,
        maxTimePerLevel: 70,
        huntingGrounds: ["꿈의 도시 레헬른"],
        expPerHour: 301,
    },
    {
        levelRange: "225 → 230",
        startLevel: 225,
        endLevel: 230,
        minTimePerLevel: 108, // 1.8시간 = 108분
        maxTimePerLevel: 126, // 2.1시간 = 126분
        huntingGrounds: ["꿈의 도시 레헬른", "신비의 숲 아르카나"],
        expPerHour: 288,
    },
    {
        levelRange: "230 → 235",
        startLevel: 230,
        endLevel: 235,
        minTimePerLevel: 126, // 2.1시간
        maxTimePerLevel: 138, // 2.3시간
        huntingGrounds: ["신비의 숲 아르카나", "기억의 늪 모라스"],
        expPerHour: 363,
    },
    {
        levelRange: "235 → 240",
        startLevel: 235,
        endLevel: 240,
        minTimePerLevel: 162, // 2.7시간
        maxTimePerLevel: 180, // 3시간
        huntingGrounds: ["기억의 늪 모라스", "태초의 바다 에스페라"],
        expPerHour: 432,
    },
    {
        levelRange: "240 → 245",
        startLevel: 240,
        endLevel: 245,
        minTimePerLevel: 222, // 3.7시간
        maxTimePerLevel: 240, // 4시간
        huntingGrounds: ["태초의 바다 에스페라", "셀라스", "별이 잠긴 곳"],
        expPerHour: 455,
    },
    {
        levelRange: "245 → 250",
        startLevel: 245,
        endLevel: 250,
        minTimePerLevel: 324, // 5.4시간
        maxTimePerLevel: 360, // 6시간
        huntingGrounds: ["셀라스", "별이 잠긴 곳", "문브릿지"],
        expPerHour: 485,
    },
    {
        levelRange: "250 → 255",
        startLevel: 250,
        endLevel: 255,
        minTimePerLevel: 516, // 8.6시간
        maxTimePerLevel: 678, // 11.3시간
        huntingGrounds: ["문브릿지", "고통의 미궁"],
        expPerHour: 488,
    },
    {
        levelRange: "255 → 260",
        startLevel: 255,
        endLevel: 260,
        minTimePerLevel: 516, // 8.6시간
        maxTimePerLevel: 576, // 9.6시간
        huntingGrounds: ["고통의 미궁", "리멘"],
        expPerHour: 565,
    },
    {
        levelRange: "255 → 260 (숨리)",
        startLevel: 255,
        endLevel: 260,
        minTimePerLevel: 492, // 8.2시간
        maxTimePerLevel: 546, // 9.1시간
        huntingGrounds: ["고통의 미궁", "리멘"],
        expPerHour: 594,
        specialNote: "숨겨진 리멘 적용",
    },
    {
        levelRange: "260 → 265",
        startLevel: 260,
        endLevel: 265,
        minTimePerLevel: 492, // 8.2시간
        maxTimePerLevel: 492,
        huntingGrounds: ["세르니움"],
        expPerHour: 2080,
    },
    {
        levelRange: "265 → 270",
        startLevel: 265,
        endLevel: 270,
        minTimePerLevel: 546, // 9.1시간
        maxTimePerLevel: 546,
        huntingGrounds: ["호텔 아르크스"],
        expPerHour: 2500,
    },
    {
        levelRange: "270 → 275",
        startLevel: 270,
        endLevel: 275,
        minTimePerLevel: 1068, // 17.8시간
        maxTimePerLevel: 1068,
        huntingGrounds: ["오디움"],
        expPerHour: 3000,
    },
    {
        levelRange: "275 → 280",
        startLevel: 275,
        endLevel: 280,
        minTimePerLevel: 1920, // 32시간
        maxTimePerLevel: 2460, // 41시간
        huntingGrounds: ["도원경"],
        expPerHour: 3550,
    },
    {
        levelRange: "280 → 285",
        startLevel: 280,
        endLevel: 285,
        minTimePerLevel: 4200, // 70시간
        maxTimePerLevel: 5940, // 99시간
        huntingGrounds: ["아르테리아"],
        expPerHour: 4550,
    },
    {
        levelRange: "285 → 290",
        startLevel: 285,
        endLevel: 290,
        minTimePerLevel: 9600, // 160시간
        maxTimePerLevel: 14520, // 242시간
        huntingGrounds: ["카르시온"],
        expPerHour: 6200,
    },
    {
        levelRange: "290 → 295",
        startLevel: 290,
        endLevel: 295,
        minTimePerLevel: 22800, // 380시간
        maxTimePerLevel: 34740, // 579시간
        huntingGrounds: ["탈라하트"],
        expPerHour: 8400,
    },
    {
        levelRange: "295 → 300",
        startLevel: 295,
        endLevel: 300,
        minTimePerLevel: 86460, // 1441시간
        maxTimePerLevel: 207000, // 3450시간
        huntingGrounds: ["탈라하트"],
        expPerHour: 7875, // 평균 (8400 + 7350) / 2
        specialNote: "탈라하트 경험치 점진적 감소 (8400억 → 7350억)",
    },
];

/**
 * 부스터 및 이벤트 배율 상수
 */
export const EXP_MULTIPLIERS = {
    /** 프리미엄 PC방 배율 */
    PREMIUM_PC_CAFE: 1.05,

    /** 경험치몹 부스터 + 이벤트 효과 배율 */
    BOOSTER_AND_EVENT: 2.2,

    /** 프리미엄 PC방 + 부스터 + 이벤트 */
    ALL_BUFFS: 1.05 * 2.2, // 2.31배
};

/**
 * 레벨 구간에 맞는 사냥 데이터 찾기
 */
export function getHuntingDataForLevel(level: number, useSpecialFields: boolean = false): HuntingExpData | null {
    // 특수 필드 우선 검색 (숨호, 숨M, 숨리)
    if (useSpecialFields) {
        const specialData = HUNTING_EXP_DATA.find(
            data => data.startLevel === level && data.specialNote
        );
        if (specialData) return specialData;
    }

    // 일반 필드 검색
    return HUNTING_EXP_DATA.find(
        data => data.startLevel === level && !data.specialNote
    ) || null;
}

/**
 * 시간을 읽기 좋은 형식으로 변환
 */
export function formatHuntingTime(minutes: number): string {
    if (minutes < 60) {
        return `${Math.round(minutes)}분`;
    }

    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);

    if (hours < 24) {
        return mins > 0 ? `${hours}시간 ${mins}분` : `${hours}시간`;
    }

    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    if (remainingHours > 0) {
        return `${days}일 ${remainingHours}시간`;
    }

    return `${days}일`;
}
