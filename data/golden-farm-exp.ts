// 황금 딸기 농장 이용권 경험치 데이터
// 1회(500마리) 기준, 기본 400% 추가 경험치 포함
// LV.200 ~ LV.259 적용 가능

interface GoldenFarmExp {
    level: number;
    exp: number;
}

const GOLDEN_FARM_EXP_TABLE: GoldenFarmExp[] = [
    { level: 200, exp: 7420728345 },
    { level: 201, exp: 7614805420 },
    { level: 202, exp: 7809056725 },
    { level: 203, exp: 8004783825 },
    { level: 204, exp: 8202077040 },
    { level: 205, exp: 8399432990 },
    { level: 206, exp: 8607448310 },
    { level: 207, exp: 8820146750 },
    { level: 208, exp: 9037843880 },
    { level: 209, exp: 9258207980 },
    { level: 210, exp: 9445395910 },
    { level: 211, exp: 9660527440 },
    { level: 212, exp: 9885570150 },
    { level: 213, exp: 10118243750 },
    { level: 214, exp: 10366050000 },
    { level: 215, exp: 10616125000 },
    { level: 216, exp: 10856812500 },
    { level: 217, exp: 11111212500 },
    { level: 218, exp: 11355881250 },
    // LV.219 ~ 259 동일 경험치
];

// LV.219 이상은 모두 동일 (최대치)
const GOLDEN_FARM_MAX_EXP = 11614556250;

/**
 * 해당 레벨의 황금 딸기 농장 1회 기본 경험치 반환 (기본 400% 포함)
 * LV.200 미만 또는 LV.260 이상이면 0 반환
 */
export function getGoldenFarmExp(level: number): number {
    if (level < 200 || level > 259) return 0;
    const entry = GOLDEN_FARM_EXP_TABLE.find(d => d.level === level);
    return entry ? entry.exp : GOLDEN_FARM_MAX_EXP;
}

/**
 * 황금 딸기 농장 이용권 총 경험치 계산 (레벨 구간별 단가 반영)
 * 이용권을 startLevel ~ endLevel 구간에 균등 분배하여 레벨업 시 달라지는 단가를 자동 적용
 * @param startLevel 현재 레벨
 * @param endLevel 목표 레벨 (259에서 자동 cap)
 * @param count 이용권 사용 횟수
 * @param bonusRate 추가 경험치 % (기본 400, 최소 400)
 */
export function calcGoldenFarmTotal(startLevel: number, endLevel: number, count: number, bonusRate: number): number {
    if (count <= 0 || startLevel < 200 || startLevel > 259) return 0;
    const effectiveRate = Math.max(400, bonusRate);
    const start = Math.max(200, startLevel);
    const end = Math.min(259, Math.max(start, endLevel));

    if (start === end) {
        return Math.round(getGoldenFarmExp(start) * (effectiveRate / 400) * count);
    }

    // 이용권을 레벨 구간 전체에 균등 분배 → 레벨별 단가 자동 반영
    const levels = end - start + 1;
    const ticketsPerLevel = count / levels;
    let total = 0;
    for (let lv = start; lv <= end; lv++) {
        total += getGoldenFarmExp(lv) * (effectiveRate / 400) * ticketsPerLevel;
    }
    return Math.round(total);
}
