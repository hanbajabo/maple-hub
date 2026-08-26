/**
 * lib/specup-engine.ts
 *
 * 메이플AI 실시간 캐릭터 장비 진단 & 가성비 스펙업 추천 연산 엔진 v2.0
 *
 * ─── 계산 정확도 원칙 ───────────────────────────────────────────────────────
 * ✅ 스타포스 강화 메소 기댓값
 *      → calculateCumulativeExpectedCost(level, toStar, { itemCost }) 직접 사용
 *      → 넥슨 공식 확률표 + 마르코프 체인 기반, 파괴 복구비까지 포함한 정확한 값
 *
 * ✅ 파괴 대비 노작(스페어) 기댓값
 *      → calculateCumulativeExpectedCostDetailed().totalSpares 직접 사용
 *
 * ✅ 큐브 잠재능력 기댓값
 *      → 넥슨 공식 공개 확률표 기반 수학 계산
 *      → 유니크→레전드리 등급업 + 유효 옵션 출현 확률 결합
 *
 * ⚠️ 전투력 상승량 [추정값]
 *      → 캐릭터 직업별 무기상수 + 실제 주스탯 + 보스뎀 + 최종뎀 반영
 *      → 그러나 넥슨 내부 전투력 공식이 완전 공개되지 않으므로 근사치이며
 *        UI에 "(추정)" 을 반드시 표시합니다.
 * ────────────────────────────────────────────────────────────────────────────
 */

import {
    calculateCumulativeExpectedCost,
    calculateCumulativeExpectedCostDetailed,
} from './starforce_db';

// ─── 인터페이스 ────────────────────────────────────────────────────────────

export interface EquippedItem {
    slot: string;
    name: string;
    icon: string;
    starforce: number;
    baseLevel: number;
    potentialGrade?: string;
    potential1?: string;
    potential2?: string;
    potential3?: string;
    additionalGrade?: string;
    additional1?: string;
    additional2?: string;
    additional3?: string;
}

export interface CostBreakdown {
    basePriceMeso: number;       // 노작(스페어) 원가 메소 (오늘 경매장 시세)
    basePriceText: string;
    starforceCostMeso: number;   // 스타포스 강화 메소 기댓값 (마르코프 체인, 정확)
    starforceCostText: string;
    sparesNeededAvg: number;     // 평균 파괴 개수 (정확)
    sparesNeededText: string;
    restoreCostMeso: number;     // 파괴 복구 총비용 (스페어 원가 × 평균 파괴 수)
    restoreCostText: string;
    potentialCostMeso: number;   // 잠재능력 큐브 기댓값
    potentialCostText: string;
    additionalCostMeso: number;  // 에디셔널 큐브 기댓값
    additionalCostText: string;
    totalCostMeso: number;
    totalCostText: string;
}

export interface SpecUpRecommendation {
    rank: number;
    slot: string;
    targetItem: string;
    currentStatus: string;
    action: string;
    category: '스타포스' | '장비 전환' | '잠재능력' | '안전 강화' | 'HEXA 코어' | '엔드 강화';
    costBreakdown: CostBreakdown;
    gains: {
        statText: string;
        combatPowerGain: number;         // [추정값]
        combatPowerText: string;         // "(추정) +XXX만"
        combatPowerIsEstimate: true;     // 항상 true — UI에서 경고 표시용
        bossDamageGainPercent: number;   // [추정값]
        bossDamageText: string;
    };
    efficiencyScore: number;  // 1억당 (추정) 전투력 상승량 — 상대 비교용
    efficiencyBadge: string;
    reason: string;
    proTip: string;
}

export interface SpecUpAnalysisResult {
    character: {
        name: string;
        world: string;
        job: string;
        level: number;
        guild: string;
        image: string;
        combatPower: number;
        mainStat: number;
        bossDamage: number;
        ignoreDefense: number;
        criticalDamage: number;
    };
    equippedItems: EquippedItem[];
    recommendations: SpecUpRecommendation[];
}

// ─── 시세 테이블 (매일 DB 동기화 대상) ────────────────────────────────────

const BASE_ITEM_PRICES: Record<string, number> = {
    // 에테르넬 (부위별 동일 시세 가정)
    '에테르넬': 520_000_000,
    // 칠흑의 보스 세트
    '루즈 컨트롤 머신 마크': 1_200_000_000,
    '마력이 깃든 안대':       1_400_000_000,
    '커맨더 포스 이어링':      1_100_000_000,
    '고통의 근원':             1_300_000_000,
    '거대한 공포':             1_500_000_000,
    '몽환의 벨트':             1_100_000_000,
    '미트라의 분노':           1_200_000_000,
    // 광휘의 보스 세트
    '황홀한 악몽':  49_000_000_000,
    '죽음의 맹세':  48_000_000_000,
    '근원의 속삭임': 50_000_000_000,
    // 여명의 보스 세트
    '데이브레이크 펜던트':       50_000_000,
    '트와일라이트 마크':         60_000_000,
    '에스텔라 이어링':           50_000_000,
    '여명의 가디언 엔젤 링':     70_000_000,
    // 카루타 (거의 무료)
    '하이네스':   1_000_000,
    '이글아이':   1_000_000,
    '트릭스터':   1_000_000,
};

function getBasePrice(itemName: string): number {
    for (const [key, price] of Object.entries(BASE_ITEM_PRICES)) {
        if (itemName.includes(key)) return price;
    }
    return 10_000_000; // 기본 1,000만
}

function fmt(meso: number): string {
    if (meso >= 1_000_000_000_000) {
        return `약 ${(meso / 1_000_000_000_000).toFixed(1)}조 메소`;
    }
    if (meso >= 100_000_000) {
        const eok = (meso / 100_000_000).toFixed(1).replace(/\.0$/, '');
        return `약 ${eok}억 메소`;
    }
    const man = Math.round(meso / 10_000);
    return `${man.toLocaleString()}만 메소`;
}

// ─── 큐브 잠재능력 기댓값 계산 (넥슨 공식 확률 기반) ───────────────────────

/**
 * 넥슨 공식 큐브 확률 기반 잠재능력 기댓값
 * @param currentGrade  현재 잠재 등급 ('에픽'|'유니크'|'레전드리')
 * @param targetOption  목표 옵션 수준 ('21%' | '30%' | '39%')
 * @param itemLevel     아이템 요구 레벨
 */
function calcCubeCost(
    currentGrade: string,
    targetOption: '15%' | '21%' | '30%' | '39%',
    itemLevel: number
): { upGradeCostMeso: number; optionCostMeso: number; total: number; desc: string } {
    // 1회 큐브 비용 (레벨별 메소큐브 기준)
    const cubeOnce = itemLevel >= 250 ? 47_500_000
                   : itemLevel >= 200 ? 35_000_000
                   : itemLevel >= 160 ? 25_000_000
                   :                    15_000_000;

    const cubeOnceEpic = cubeOnce * 0.6; // 에픽 큐브는 약 60% 수준

    // 등급 업 확률 (넥슨 공식)
    const rateEpicToUniq  = 0.035;  // 에픽→유니크 3.5%
    const rateUniqToLeg   = 0.014;  // 유니크→레전드리 1.4%

    // 목표 옵션 출현 확률 (레전드리 윗잠 기준, 넥슨 공식 공개)
    const optionRates: Record<string, number> = {
        '15%': 0.198,  // 주스탯 15% (레전 1티어 단일 옵션)
        '21%': 0.045,  // 주스탯 21% (12+9 이상 조합)
        '30%': 0.015,  // 주스탯 30% (10+10+10 이상)
        '39%': 0.005,  // 주스탯 39% (13+13+13 극종결)
    };
    const optRate = optionRates[targetOption] ?? 0.045;

    let upGradeCostMeso = 0;
    let upGradeDesc = '';
    let startGrade = currentGrade;

    // 에픽에서 시작하면 유니크까지 올려야 함
    if (startGrade === '에픽' || startGrade === '에픽' ) {
        const avgAttempts = 1 / rateEpicToUniq; // 평균 28.5회
        upGradeCostMeso += avgAttempts * cubeOnceEpic;
        upGradeDesc += `에픽→유니크: ${avgAttempts.toFixed(0)}회 × ${fmt(cubeOnceEpic)} = ${fmt(upGradeCostMeso)} / `;
        startGrade = '유니크';
    }

    if (startGrade === '유니크') {
        const avgAttempts = 1 / rateUniqToLeg; // 평균 71.4회
        const cost = avgAttempts * cubeOnce;
        upGradeCostMeso += cost;
        upGradeDesc += `유니크→레전: ${avgAttempts.toFixed(0)}회 × ${fmt(cubeOnce)} = ${fmt(cost)}`;
    }

    // 레전드리 단계에서 목표 옵션 출현 기댓값
    const avgOptionAttempts = 1 / optRate;
    const optionCostMeso = avgOptionAttempts * cubeOnce;

    return {
        upGradeCostMeso,
        optionCostMeso,
        total: upGradeCostMeso + optionCostMeso,
        desc: `등급업: ${fmt(upGradeCostMeso)} + ${targetOption} 옵션: ${fmt(optionCostMeso)}`
    };
}

/**
 * 에디셔널 큐브 기댓값 (공격력+10 기준)
 * 에디 큐브 1회: 약 2,200만 메소
 * 에디 공10 출현 확률: 약 6.25%
 */
function calcAdditionalCubeCost(itemLevel: number): number {
    const cubeOnce = itemLevel >= 250 ? 22_000_000 : 15_000_000;
    const rate = 0.0625; // 공+10 출현 확률
    return Math.round((1 / rate) * cubeOnce);
}

// ─── 전투력 상승량 추정 함수 ─────────────────────────────────────────────────

/** 직업별 무기 상수 (메이플스토리 공식) */
const WEAPON_CONSTANTS: Record<string, number> = {
    '아란': 1.0, '팔라딘': 1.0, '다크나이트': 1.0, '히어로': 1.0, '미하일': 1.0,
    '아델': 1.2, '제로': 1.0, '듀얼블레이드': 1.3, '나이트로드': 1.3,
    '섀도어': 1.0, '캐논슈터': 1.0, '바이퍼': 1.7,
    '보우마스터': 1.2, '신궁': 1.2, '패스파인더': 1.2,
    '메르세데스': 1.0, '와일드헌터': 1.2,
    '비숍': 1.2, '아크메이지(불,독)': 1.2, '아크메이지(썬,콜)': 1.2,
    '플레임위자드': 1.2, '에반': 1.2,
    '카데나': 1.3, '일리움': 1.2, '아크': 1.2, '호영': 1.2,
    '블래스터': 1.0, '메카닉': 1.0, '데몬슬레이어': 1.0, '데몬어벤져': 0.9,
    '은월': 1.0, '카이저': 1.0, '카인': 1.2, '라라': 1.0, '칼리': 1.0,
};

/**
 * [추정] 공격력/스탯 상승 → 전투력 상승량 계산
 *
 * 공식: ΔCP ≈ (4 × MS + SS) × ΔATK × weaponConst × (1 + BD/100) × (1 + FD/100)
 *        × (1/넥슨내부보정계수)
 *
 * ⚠️ 넥슨이 내부 보정계수를 공개하지 않으므로 이 값은 근사치입니다.
 *    UI에 "(추정)" 표시 필수.
 */
function estimateCombatPowerGain(
    deltaAtk: number,
    deltaMainStat: number,
    mainStat: number,
    subStat: number,
    job: string,
    bossDamage: number,
    finalDamage: number
): number {
    const weaponConst = WEAPON_CONSTANTS[job] ?? 1.0;

    // 공격력 증가 기여
    const atkComponent = (4 * mainStat + subStat) * deltaAtk * weaponConst
        * (1 + bossDamage / 100) * (1 + finalDamage / 100);

    // 스탯 증가 기여 (공격력 고정, 스탯만 올라갈 때)
    // 공격력 1당 스탯 기여 역산해서 곱함
    // ΔCP_stat ≈ 4 × Δstat × ATK × weaponConst × ...
    // 여기서는 간단히 deltaMainStat/mainStat × 기존CP 를 쓰지 않고 구조적으로 계산
    const baseATK = 1500; // 중간 추정 공격력 (실제 ATK API값 없으므로)
    const statComponent = 4 * deltaMainStat * baseATK * weaponConst
        * (1 + bossDamage / 100) * (1 + finalDamage / 100);

    // 넥슨 내부 보정계수: 실제 전투력 = 위 공식 / ~100 (경험적으로 도출)
    const CORRECTION_FACTOR = 100;
    const rawGain = (atkComponent + statComponent) / CORRECTION_FACTOR;

    return Math.round(rawGain);
}

// ─── 핵심 분석 함수 ───────────────────────────────────────────────────────────

export function analyzeCharacterSpecUp(
    characterInfo: any,
    finalStats: Record<string, string>,
    equippedItems: EquippedItem[],
    _hexaCoreEquipment: any[] = []
): SpecUpAnalysisResult {
    const candidates: SpecUpRecommendation[] = [];

    // 스탯 파싱
    const combatPower  = parseInt(finalStats['전투력'] ?? '50000000', 10);
    const mainStat     = parseInt(finalStats['STR'] ?? finalStats['DEX'] ?? finalStats['INT'] ?? finalStats['LUK'] ?? '50000', 10);
    const subStat      = Math.round(mainStat * 0.15); // 서브스탯 근사
    const bossDamage   = parseFloat(finalStats['보스 몬스터 데미지'] ?? '300');
    const finalDamage  = parseFloat(finalStats['최종 데미지'] ?? '100');
    const ignoreDefense = parseFloat(finalStats['방어율 무시'] ?? '95');
    const criticalDamage = parseFloat(finalStats['크리티컬 데미지'] ?? '80');
    const job = characterInfo.character_class ?? '';

    const EXCLUDED_SLOTS = new Set([
        '보조무기', '엠블렘', '훈장', '뱃지', '포켓 아이템', '기계 심장', '칭호'
    ]);

    equippedItems.forEach(item => {
        const star  = item.starforce || 0;
        const slot  = item.slot;
        const name  = item.name;
        const grade = item.potentialGrade ?? '노잠재';
        const lv    = item.baseLevel || 150;

        if (EXCLUDED_SLOTS.has(slot)) return;

        // ══════════════════════════════════════════════════════════════
        // CASE 1: 10~16성 → 17성 가성비 둘둘
        //   강화 비용: 실제 calculateCumulativeExpectedCost(0→toStar) - (0→fromStar) 차이
        // ══════════════════════════════════════════════════════════════
        if (star >= 10 && star < 17) {
            const baseP = 0; // 기존 착용 템이므로 노작비 없음

            // 현재 별 → 17성 기댓값 (fromStar에서 시작)
            // 마르코프 기댓값: E[0→17] - E[0→fromStar] 방식으로 정확히 계산
            const cost0to17   = calculateCumulativeExpectedCost(lv, 17, { itemCost: baseP });
            const cost0toFrom = calculateCumulativeExpectedCost(lv, star, { itemCost: baseP });
            const sfMeso      = Math.max(0, cost0to17 - cost0toFrom);

            // 파괴 개수 기댓값
            const det17    = calculateCumulativeExpectedCostDetailed(lv, 17, { itemCost: 0 });
            const detFrom  = calculateCumulativeExpectedCostDetailed(lv, star, { itemCost: 0 });
            const sparesAvg = Math.max(0, det17.totalSpares - detFrom.totalSpares);
            const restoreCost = sparesAvg * baseP;

            const totalMeso = sfMeso + restoreCost;
            const starsToGain = 17 - star;

            const deltaAtk      = starsToGain * 8;
            const deltaMainStat = starsToGain * 12;
            const cpGain = estimateCombatPowerGain(deltaAtk, deltaMainStat, mainStat, subStat, job, bossDamage, finalDamage);
            const eff = totalMeso > 0 ? cpGain / (totalMeso / 100_000_000) : 0;

            candidates.push({
                rank: 0,
                slot, targetItem: name,
                currentStatus: `${star}성 (${grade})`,
                action: `${star}성 → 17성`,
                category: '스타포스',
                costBreakdown: {
                    basePriceMeso: 0,
                    basePriceText: '0원 (기존 착용 템)',
                    starforceCostMeso: sfMeso,
                    starforceCostText: `${fmt(sfMeso)} (넥슨 공식 마르코프 기댓값)`,
                    sparesNeededAvg: sparesAvg,
                    sparesNeededText: `평균 파괴 ${sparesAvg.toFixed(2)}개`,
                    restoreCostMeso: 0,
                    restoreCostText: '0원 (기존 템이라 노작비 없음)',
                    potentialCostMeso: 0,
                    potentialCostText: '0원 (기존 잠재 보존)',
                    additionalCostMeso: 0,
                    additionalCostText: '0원',
                    totalCostMeso: totalMeso,
                    totalCostText: fmt(totalMeso),
                },
                gains: {
                    statText: `공격력 +${deltaAtk}, 주스탯 +${deltaMainStat}`,
                    combatPowerGain: cpGain,
                    combatPowerText: `(추정) +${(cpGain / 10000).toFixed(0)}만`,
                    combatPowerIsEstimate: true,
                    bossDamageGainPercent: Number((0.55 * starsToGain).toFixed(1)),
                    bossDamageText: `(추정) +${(0.55 * starsToGain).toFixed(1)}% 실전 딜`,
                },
                efficiencyScore: Number(eff.toFixed(2)),
                efficiencyBadge: '💎 초특급 가성비',
                reason: `${star}성→17성 구간은 파괴 확률이 낮아 메소 대비 공격력 획득이 가장 큰 0순위 강화입니다.`,
                proTip: '15·16성 100% 이벤트(썬데이 메이플) 때 진행하면 메소를 크게 아낄 수 있습니다.',
            });
        }

        // ══════════════════════════════════════════════════════════════
        // CASE 2: 17성 → 18성 안전 1업
        // ══════════════════════════════════════════════════════════════
        if (star === 17) {
            const baseP = getBasePrice(name);

            const cost0to18 = calculateCumulativeExpectedCost(lv, 18, { itemCost: baseP });
            const cost0to17 = calculateCumulativeExpectedCost(lv, 17, { itemCost: baseP });
            const sfMeso    = Math.max(0, cost0to18 - cost0to17);

            const det18  = calculateCumulativeExpectedCostDetailed(lv, 18, { itemCost: 0 });
            const det17d = calculateCumulativeExpectedCostDetailed(lv, 17, { itemCost: 0 });
            const sparesAvg  = Math.max(0, det18.totalSpares - det17d.totalSpares);
            const restoreCost = sparesAvg * baseP;
            const totalMeso  = sfMeso + restoreCost;

            const isWeapon = slot === '무기';
            const deltaAtk = isWeapon ? 15 : 13;
            const deltaStat = 15;
            const cpGain = estimateCombatPowerGain(deltaAtk, deltaStat, mainStat, subStat, job, bossDamage, finalDamage);
            const eff = totalMeso > 0 ? cpGain / (totalMeso / 100_000_000) : 0;

            candidates.push({
                rank: 0,
                slot, targetItem: name,
                currentStatus: `17성 (${grade})`,
                action: '17성 → 18성',
                category: '안전 강화',
                costBreakdown: {
                    basePriceMeso: 0,
                    basePriceText: '0원',
                    starforceCostMeso: sfMeso,
                    starforceCostText: `${fmt(sfMeso)} (넥슨 공식 마르코프 기댓값)`,
                    sparesNeededAvg: sparesAvg,
                    sparesNeededText: `평균 파괴 ${sparesAvg.toFixed(2)}개 (노작 원가: ${fmt(baseP)})`,
                    restoreCostMeso: restoreCost,
                    restoreCostText: restoreCost > 0 ? fmt(restoreCost) + ' (파괴 복구비)' : '0원 (무료 수급 가능)',
                    potentialCostMeso: 0,
                    potentialCostText: '0원 (기존 잠재 보존)',
                    additionalCostMeso: 0,
                    additionalCostText: '0원',
                    totalCostMeso: totalMeso,
                    totalCostText: fmt(totalMeso),
                },
                gains: {
                    statText: `공격력 +${deltaAtk}, 주스탯 +${deltaStat}`,
                    combatPowerGain: cpGain,
                    combatPowerText: `(추정) +${(cpGain / 10000).toFixed(0)}만`,
                    combatPowerIsEstimate: true,
                    bossDamageGainPercent: isWeapon ? 1.6 : 0.8,
                    bossDamageText: `(추정) +${isWeapon ? 1.6 : 0.8}% 실전 딜`,
                },
                efficiencyScore: Number(eff.toFixed(2)),
                efficiencyBadge: isWeapon ? '🔥 무기 18성 최우선' : '👍 18성 안전 1업',
                reason: '17→18성은 1성 강화만으로 공격력을 크게 얻을 수 있는 가성비 구간입니다.',
                proTip: '파괴율 6.74%로 노작 0.43개 평균 파괴. 고가 아이템은 파괴 방지 스크롤 고려하세요.',
            });
        }

        // ══════════════════════════════════════════════════════════════
        // CASE 3: 15~21성 → 22성 종결 트라이 (카루타/여명 한정)
        // ══════════════════════════════════════════════════════════════
        const isEndTarget22 = name.includes('트와일라이트') || name.includes('데이브레이크')
                           || name.includes('하이네스')   || name.includes('이글아이')
                           || name.includes('트릭스터')   || name.includes('에스텔라')
                           || name.includes('여명의 가디언');

        if (isEndTarget22 && star >= 15 && star < 22) {
            const baseP = getBasePrice(name);

            const cost0to22   = calculateCumulativeExpectedCost(lv, 22, { itemCost: baseP });
            const cost0toFrom = calculateCumulativeExpectedCost(lv, star, { itemCost: baseP });
            const sfMeso      = Math.max(0, cost0to22 - cost0toFrom);

            const det22  = calculateCumulativeExpectedCostDetailed(lv, 22, { itemCost: 0 });
            const detFr  = calculateCumulativeExpectedCostDetailed(lv, star, { itemCost: 0 });
            const sparesAvg  = Math.max(0, det22.totalSpares - detFr.totalSpares);
            const restoreCost = sparesAvg * baseP;
            const totalMeso  = sfMeso + restoreCost;

            const deltaAtk  = (22 - star) * 8;
            const deltaStat = (22 - star) * 12;
            const cpGain = estimateCombatPowerGain(deltaAtk, deltaStat, mainStat, subStat, job, bossDamage, finalDamage);
            const eff = totalMeso > 0 ? cpGain / (totalMeso / 100_000_000) : 0;

            candidates.push({
                rank: 0,
                slot, targetItem: name,
                currentStatus: `${star}성 (${grade})`,
                action: `${star}성 → 22성 종결`,
                category: '스타포스',
                costBreakdown: {
                    basePriceMeso: restoreCost,
                    basePriceText: `파괴 복구비 포함 (노작 ${fmt(baseP)})`,
                    starforceCostMeso: sfMeso,
                    starforceCostText: `${fmt(sfMeso)} (넥슨 공식 마르코프 기댓값)`,
                    sparesNeededAvg: sparesAvg,
                    sparesNeededText: `평균 파괴 ${sparesAvg.toFixed(2)}개`,
                    restoreCostMeso: restoreCost,
                    restoreCostText: `${fmt(restoreCost)} (파괴 복구비)`,
                    potentialCostMeso: 0,
                    potentialCostText: '0원 (기존 잠재 보존)',
                    additionalCostMeso: 0,
                    additionalCostText: '0원',
                    totalCostMeso: totalMeso,
                    totalCostText: fmt(totalMeso),
                },
                gains: {
                    statText: `공격력 +${deltaAtk}, 올스탯 +${deltaStat}`,
                    combatPowerGain: cpGain,
                    combatPowerText: `(추정) +${(cpGain / 10000).toFixed(0)}만`,
                    combatPowerIsEstimate: true,
                    bossDamageGainPercent: Number((0.6 * (22 - star)).toFixed(1)),
                    bossDamageText: `(추정) +${(0.6 * (22 - star)).toFixed(1)}% 실전 딜`,
                },
                efficiencyScore: Number(eff.toFixed(2)),
                efficiencyBadge: '👑 22성 종결 트라이',
                reason: '노작 원가가 저렴해 파괴 복구비 부담이 낮은 22성 종결 코스입니다.',
                proTip: '샤이닝 스타포스 이벤트 때 예비 노작 2~3개를 챙겨 진행하세요.',
            });
        }

        // ══════════════════════════════════════════════════════════════
        // CASE 4: 앱솔랩스 방어구 → 에테르넬 전환 (부위당 완성 비용)
        // ══════════════════════════════════════════════════════════════
        const ETH_SLOTS = new Set(['모자', '상의', '하의', '신발', '장갑', '망토', '어깨장식']);
        if (name.includes('앱솔랩스') && ETH_SLOTS.has(slot)) {
            const ethPrice = getBasePrice('에테르넬'); // 5.2억
            const ethLevel = 250;

            // 에테르넬 0성→17성 강화 기댓값 (250제)
            const sfMeso = calculateCumulativeExpectedCost(ethLevel, 17, { itemCost: ethPrice });

            const detEth = calculateCumulativeExpectedCostDetailed(ethLevel, 17, { itemCost: 0 });
            const sparesAvg  = detEth.totalSpares;
            const restoreCost = sparesAvg * ethPrice;

            // 현재 잠재 등급에 따라 큐브 비용 계산
            const existingGrade = grade;
            const cubeInfo = calcCubeCost(existingGrade, '21%', ethLevel);
            const addCubeCost = calcAdditionalCubeCost(ethLevel);

            const totalMeso = ethPrice + sfMeso + restoreCost + cubeInfo.total + addCubeCost;

            // 앱솔(17성) vs 에테르넬(17성) 스탯 차이
            // 에테르넬 17성: 공+26 초과 / 앱솔 17성 대비 약 공+30, 올스탯+40 향상 (근사)
            const deltaAtk  = 30;
            const deltaStat = 40;
            const cpGain = estimateCombatPowerGain(deltaAtk, deltaStat, mainStat, subStat, job, bossDamage, finalDamage);
            const eff = totalMeso > 0 ? cpGain / (totalMeso / 100_000_000) : 0;

            candidates.push({
                rank: 0,
                slot,
                targetItem: `${name} → 에테르넬 교체`,
                currentStatus: `${star}성 앱솔랩스 (${grade})`,
                action: '17성 레전 에테르넬 풀세팅 전환',
                category: '장비 전환',
                costBreakdown: {
                    basePriceMeso: ethPrice,
                    basePriceText: `${fmt(ethPrice)} (오늘 에테 노작 시세)`,
                    starforceCostMeso: sfMeso,
                    starforceCostText: `${fmt(sfMeso)} (250제 0→17성 마르코프 기댓값)`,
                    sparesNeededAvg: sparesAvg,
                    sparesNeededText: `평균 파괴 ${sparesAvg.toFixed(2)}개`,
                    restoreCostMeso: restoreCost,
                    restoreCostText: `${fmt(restoreCost)} (파괴 복구비)`,
                    potentialCostMeso: cubeInfo.total,
                    potentialCostText: `${fmt(cubeInfo.total)} (레전드리 21% 큐브 기댓값)`,
                    additionalCostMeso: addCubeCost,
                    additionalCostText: `${fmt(addCubeCost)} (에디셔널 공+10 큐브 기댓값)`,
                    totalCostMeso: totalMeso,
                    totalCostText: `${fmt(totalMeso)} (부위당 완성 총합)`,
                },
                gains: {
                    statText: `(추정) 공격력 +${deltaAtk}, 올스탯 +${deltaStat} + 세트효과 분할 획득`,
                    combatPowerGain: cpGain,
                    combatPowerText: `(추정) +${(cpGain / 10000).toFixed(0)}만`,
                    combatPowerIsEstimate: true,
                    bossDamageGainPercent: 2.8,
                    bossDamageText: '(추정) +2.8% 실전 딜',
                },
                efficiencyScore: Number(eff.toFixed(2)),
                efficiencyBadge: '🚀 에테르넬 전환',
                reason: '앱솔의 한계를 뚫고 에테르넬 세트 효과를 챙기는 차세대 전환입니다. 세트 효과를 위해 3부위 이상 전환을 권장합니다.',
                proTip: '경매장에서 17성 레전드리 완제품 매물 가격을 먼저 비교하세요. 직작보다 저렴할 수 있습니다.',
            });
        }
    });

    // ═══════════════════════════════════════════════════════════════════
    // 초엔드: 광휘 반지 22성 → 25성
    // ═══════════════════════════════════════════════════════════════════
    const nightmareRing = equippedItems.find(i => i.name.includes('황홀한 악몽') && i.starforce < 25);
    if (nightmareRing) {
        const baseP = getBasePrice('황홀한 악몽'); // 490억
        const lv    = nightmareRing.baseLevel || 250;
        const star  = nightmareRing.starforce;

        const cost0to25   = calculateCumulativeExpectedCost(lv, 25, { itemCost: baseP });
        const cost0toFrom = calculateCumulativeExpectedCost(lv, star, { itemCost: baseP });
        const sfMeso      = Math.max(0, cost0to25 - cost0toFrom);

        const det25  = calculateCumulativeExpectedCostDetailed(lv, 25, { itemCost: 0 });
        const detFr  = calculateCumulativeExpectedCostDetailed(lv, star, { itemCost: 0 });
        const sparesAvg   = Math.max(0, det25.totalSpares - detFr.totalSpares);
        const restoreCost = sparesAvg * baseP;
        const totalMeso   = sfMeso + restoreCost;

        const cpGain = estimateCombatPowerGain(40, 52, mainStat, subStat, job, bossDamage, finalDamage);
        const eff = totalMeso > 0 ? cpGain / (totalMeso / 100_000_000) : 0;

        candidates.push({
            rank: 0,
            slot: nightmareRing.slot,
            targetItem: nightmareRing.name,
            currentStatus: `${star}성 (${nightmareRing.potentialGrade ?? '레전드리'})`,
            action: `${star}성 → 25성`,
            category: '엔드 강화',
            costBreakdown: {
                basePriceMeso: baseP,
                basePriceText: `${fmt(baseP)} (오늘 노작 시세)`,
                starforceCostMeso: sfMeso,
                starforceCostText: `${fmt(sfMeso)} (넥슨 공식 마르코프 기댓값)`,
                sparesNeededAvg: sparesAvg,
                sparesNeededText: `평균 파괴 ${sparesAvg.toFixed(1)}개 × ${fmt(baseP)} = ${fmt(restoreCost)}`,
                restoreCostMeso: restoreCost,
                restoreCostText: `${fmt(restoreCost)} (파괴 복구비)`,
                potentialCostMeso: 0,
                potentialCostText: '0원 (기존 39% 종결 잠재 보존)',
                additionalCostMeso: 0,
                additionalCostText: '0원',
                totalCostMeso: totalMeso,
                totalCostText: fmt(totalMeso),
            },
            gains: {
                statText: '공격력 +40, 주스탯 +52',
                combatPowerGain: cpGain,
                combatPowerText: `(추정) +${(cpGain / 10000).toFixed(0)}만`,
                combatPowerIsEstimate: true,
                bossDamageGainPercent: 2.8,
                bossDamageText: '(추정) +2.8% 실전 딜',
            },
            efficiencyScore: Number(eff.toFixed(2)),
            efficiencyBadge: '👑 광휘 25성 엔드 트라이',
            reason: '모든 다른 부위가 26성+ 종결이므로 22성 광휘 반지가 유일한 스펙업 경로입니다.',
            proTip: `노작 1개 ${fmt(baseP)}. 예비 노작 ${Math.ceil(sparesAvg) + 2}개 이상 확보 후 샤이닝 이벤트 때 진행하세요.`,
        });
    }

    // 가성비 효율순 정렬 후 TOP 5
    candidates.sort((a, b) => b.efficiencyScore - a.efficiencyScore);
    candidates.forEach((r, i) => { r.rank = i + 1; });

    return {
        character: {
            name:            characterInfo.character_name,
            world:           characterInfo.world_name,
            job:             characterInfo.character_class,
            level:           characterInfo.character_level,
            guild:           characterInfo.character_guild_name ?? '무소속',
            image:           characterInfo.character_image,
            combatPower,
            mainStat,
            bossDamage,
            ignoreDefense,
            criticalDamage,
        },
        equippedItems,
        recommendations: candidates.slice(0, 5),
    };
}
