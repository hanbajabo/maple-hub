/**
 * 놀라운 장비 강화 주문서 강화 수치 테이블
 * 
 * 옛날 스타포스 시스템에서 사용되던 놀라운 장비 강화 주문서로 강화했을 때
 * 장비 레벨대별, 강화 단계별로 상승하는 스탯/공격력 수치
 */

export interface AmazingEnhancementStats {
    stat: number;  // 주스탯 상승치
    att: number;   // 공격력/마력 상승치
}

/**
 * 놀라운 장비 강화 주문서 테이블
 * 
 * key: 장비 레벨 (80미만은 0으로 표기)
 * value: 강화 단계별 누적 스탯/공격력 상승치 (1성~15성)
 */
export const AMAZING_ENHANCEMENT_TABLE: Record<number, AmazingEnhancementStats[]> = {
    // 80레벨 미만 장비
    0: [
        { stat: 1, att: 0 },   // 1성
        { stat: 2, att: 0 },   // 2성
        { stat: 4, att: 0 },   // 3성
        { stat: 7, att: 0 },   // 4성
        { stat: 11, att: 0 },  // 5성
        { stat: 0, att: 1 },   // 6성
        { stat: 0, att: 2 },   // 7성
        { stat: 0, att: 3 },   // 8성
        { stat: 0, att: 4 },   // 9성
        { stat: 0, att: 5 },   // 10성
        { stat: 0, att: 6 },   // 11성
        { stat: 0, att: 8 },   // 12성
        { stat: 0, att: 10 },  // 13성
        { stat: 0, att: 12 },  // 14성
        { stat: 0, att: 14 },  // 15성
    ],

    // 80레벨 장비
    80: [
        { stat: 2, att: 0 },   // 1성
        { stat: 3, att: 0 },   // 2성
        { stat: 5, att: 0 },   // 3성
        { stat: 8, att: 0 },   // 4성
        { stat: 12, att: 0 },  // 5성
        { stat: 0, att: 2 },   // 6성
        { stat: 0, att: 3 },   // 7성
        { stat: 0, att: 4 },   // 8성
        { stat: 0, att: 5 },   // 9성
        { stat: 0, att: 6 },   // 10성
        { stat: 0, att: 7 },   // 11성
        { stat: 0, att: 9 },   // 12성
        { stat: 0, att: 11 },  // 13성
        { stat: 0, att: 13 },  // 14성
        { stat: 0, att: 15 },  // 15성
    ],

    // 90레벨 장비
    90: [
        { stat: 4, att: 0 },   // 1성
        { stat: 5, att: 0 },   // 2성
        { stat: 7, att: 0 },   // 3성
        { stat: 10, att: 0 },  // 4성
        { stat: 14, att: 0 },  // 5성
        { stat: 0, att: 3 },   // 6성
        { stat: 0, att: 4 },   // 7성
        { stat: 0, att: 5 },   // 8성
        { stat: 0, att: 6 },   // 9성
        { stat: 0, att: 7 },   // 10성
        { stat: 0, att: 8 },   // 11성
        { stat: 0, att: 10 },  // 12성
        { stat: 0, att: 12 },  // 13성
        { stat: 0, att: 14 },  // 14성
        { stat: 0, att: 16 },  // 15성
    ],

    // 100레벨 장비
    100: [
        { stat: 7, att: 0 },   // 1성
        { stat: 8, att: 0 },   // 2성
        { stat: 10, att: 0 },  // 3성
        { stat: 13, att: 0 },  // 4성
        { stat: 17, att: 0 },  // 5성
        { stat: 0, att: 4 },   // 6성
        { stat: 0, att: 5 },   // 7성
        { stat: 0, att: 6 },   // 8성
        { stat: 0, att: 7 },   // 9성
        { stat: 0, att: 8 },   // 10성
        { stat: 0, att: 9 },   // 11성
        { stat: 0, att: 11 },  // 12성
        { stat: 0, att: 13 },  // 13성
        { stat: 0, att: 15 },  // 14성
        { stat: 0, att: 17 },  // 15성
    ],

    // 110레벨 장비
    110: [
        { stat: 9, att: 0 },   // 1성
        { stat: 10, att: 0 },  // 2성
        { stat: 12, att: 0 },  // 3성
        { stat: 15, att: 0 },  // 4성
        { stat: 19, att: 0 },  // 5성
        { stat: 0, att: 5 },   // 6성
        { stat: 0, att: 6 },   // 7성
        { stat: 0, att: 7 },   // 8성
        { stat: 0, att: 8 },   // 9성
        { stat: 0, att: 9 },   // 10성
        { stat: 0, att: 10 },  // 11성
        { stat: 0, att: 12 },  // 12성
        { stat: 0, att: 14 },  // 13성
        { stat: 0, att: 16 },  // 14성
        { stat: 0, att: 18 },  // 15성
    ],

    // 120레벨 장비
    120: [
        { stat: 12, att: 0 },  // 1성
        { stat: 13, att: 0 },  // 2성
        { stat: 15, att: 0 },  // 3성
        { stat: 18, att: 0 },  // 4성
        { stat: 22, att: 0 },  // 5성
        { stat: 0, att: 6 },   // 6성
        { stat: 0, att: 7 },   // 7성
        { stat: 0, att: 8 },   // 8성
        { stat: 0, att: 9 },   // 9성
        { stat: 0, att: 10 },  // 10성
        { stat: 0, att: 11 },  // 11성
        { stat: 0, att: 13 },  // 12성
        { stat: 0, att: 15 },  // 13성
        { stat: 0, att: 17 },  // 14성
        { stat: 0, att: 19 },  // 15성
    ],

    // 130레벨 장비
    130: [
        { stat: 14, att: 0 },  // 1성
        { stat: 15, att: 0 },  // 2성
        { stat: 17, att: 0 },  // 3성
        { stat: 20, att: 0 },  // 4성
        { stat: 24, att: 0 },  // 5성
        { stat: 0, att: 7 },   // 6성
        { stat: 0, att: 8 },   // 7성
        { stat: 0, att: 9 },   // 8성
        { stat: 0, att: 10 },  // 9성
        { stat: 0, att: 11 },  // 10성
        { stat: 0, att: 12 },  // 11성
        { stat: 0, att: 14 },  // 12성
        { stat: 0, att: 16 },  // 13성
        { stat: 0, att: 18 },  // 14성
        { stat: 0, att: 20 },  // 15성
    ],

    // 140레벨 장비
    140: [
        { stat: 17, att: 0 },  // 1성
        { stat: 18, att: 0 },  // 2성
        { stat: 20, att: 0 },  // 3성
        { stat: 23, att: 0 },  // 4성
        { stat: 27, att: 0 },  // 5성
        { stat: 0, att: 8 },   // 6성
        { stat: 0, att: 9 },   // 7성
        { stat: 0, att: 10 },  // 8성
        { stat: 0, att: 11 },  // 9성
        { stat: 0, att: 12 },  // 10성
        { stat: 0, att: 13 },  // 11성
        { stat: 0, att: 15 },  // 12성
        { stat: 0, att: 17 },  // 13성
        { stat: 0, att: 19 },  // 14성
        { stat: 0, att: 21 },  // 15성
    ],

    // 150레벨 장비
    150: [
        { stat: 19, att: 0 },  // 1성
        { stat: 20, att: 0 },  // 2성
        { stat: 22, att: 0 },  // 3성
        { stat: 25, att: 0 },  // 4성
        { stat: 29, att: 0 },  // 5성
        { stat: 0, att: 9 },   // 6성
        { stat: 0, att: 10 },  // 7성
        { stat: 0, att: 11 },  // 8성
        { stat: 0, att: 12 },  // 9성
        { stat: 0, att: 13 },  // 10성
        { stat: 0, att: 14 },  // 11성
        { stat: 0, att: 16 },  // 12성
        { stat: 0, att: 18 },  // 13성
        { stat: 0, att: 20 },  // 14성
        { stat: 0, att: 22 },  // 15성
    ],
};

/**
 * 12성 합계 (참고용)
 */
export const AMAZING_ENHANCEMENT_12_STAR_TOTALS = {
    0: { stat: 25, att: 29 },
    80: { stat: 30, att: 36 },
    90: { stat: 40, att: 43 },
    100: { stat: 55, att: 50 },
    110: { stat: 65, att: 57 },
    120: { stat: 80, att: 64 },
    130: { stat: 90, att: 71 },
    140: { stat: 105, att: 78 },
    150: { stat: 115, att: 85 },
};

/**
 * 장비 레벨을 테이블 키로 변환
 * @param level 장비 레벨
 * @returns 테이블 키 (80 미만은 0)
 */
export function getAmazingEnhancementTableKey(level: number): number {
    if (level < 80) return 0;
    // 80, 90, 100, 110, 120, 130, 140, 150으로 내림
    const validLevels = [80, 90, 100, 110, 120, 130, 140, 150];
    for (let i = validLevels.length - 1; i >= 0; i--) {
        if (level >= validLevels[i]) {
            return validLevels[i];
        }
    }
    return 0;
}

/**
 * 놀라운 장비 강화 주문서로 강화된 아이템인지 확인
 * 
 * @param item 아이템 데이터
 * @returns 놀장강 아이템 여부
 */
export function isAmazingEnhancementItem(item: any): boolean {
    // 스타포스가 없으면 놀장강 아님
    const starforce = parseInt(item.starforce || "0");
    if (starforce === 0) return false;

    // etc_option이 없으면 놀장강 아님
    if (!item.item_etc_option) return false;

    // 장비 레벨 확인
    const level = item.item_base_option?.base_equipment_level || 0;
    const tableKey = getAmazingEnhancementTableKey(level);

    // 해당 레벨의 테이블이 없으면 false
    if (!AMAZING_ENHANCEMENT_TABLE[tableKey]) return false;

    // 스타포스가 15성을 초과하면 놀장강 아님 (놀장강은 최대 15성)
    if (starforce > 15) return false;

    // 예상 수치 가져오기 (인덱스는 0부터 시작하므로 -1)
    const expectedStats = AMAZING_ENHANCEMENT_TABLE[tableKey][starforce - 1];
    if (!expectedStats) return false;

    // etc_option의 스탯 합계 계산
    const etc = item.item_etc_option;
    const totalStats = (parseInt(etc.str || "0") + parseInt(etc.dex || "0") +
        parseInt(etc.int || "0") + parseInt(etc.luk || "0"));
    const totalAtt = parseInt(etc.attack_power || "0") + parseInt(etc.magic_power || "0");

    // 놀장강 이후 추가 주문서를 바를 수 있으므로
    // 예상 수치 이상이면 놀장강으로 판정
    const statMatch = totalStats >= expectedStats.stat;
    const attMatch = totalAtt >= expectedStats.att;

    // 스탯이나 공격력 중 하나라도 놀장강 수치 이상이면 놀장강
    return statMatch || attMatch;
}
