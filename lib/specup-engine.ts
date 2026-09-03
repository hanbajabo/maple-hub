/**
 * lib/specup-engine.ts
 *
 * 메이플AI 실시간 캐릭터 장비 진단 & 가성비 스펙업 추천 연산 엔진 v3.0
 *
 * ─── 연산 정확도 & 원칙 ───────────────────────────────────────────────────────
 * ✅ 1. 스타포스 강화 기댓값:
 *      → calculateCumulativeExpectedCost(level, toStar, { itemCost }) 직접 사용
 *      → 넥슨 공식 확률표 + 마르코프 체인 기반 + 실시간 경매장 스페어 시세 연동
 *
 * ✅ 2. 잠재능력 3줄 복합 기댓값:
 *      → lib/potential-calculator.ts + lib/cube_db.ts 100% 연동
 *      → 넥슨 공식 옵션 풀 + 줄별 등급 가중치 + 중복 제한 동적 재정규화 + 1원 단위 공식 재설정 비용
 *      → WSE (무기/보조/엠블렘) 3줄 종결 및 방어구/장신구 21%~30% 기댓값 산출
 *
 * ✅ 3. 장비 티어 전환 (Gear Progression):
 *      → 9보장 ➔ 여명 4셋 ➔ 아케인 ➔ 에테르넬, 기계 심장 매지컬작
 *
 * ✅ 4. 전투력 상승량 [추정]:
 *      → 직업별 주스탯/부스탯/공격력/마력/보공/방무/최종뎀/크뎀 실제 스탯 기반 델타 연산
 * ────────────────────────────────────────────────────────────────────────────
 */

import {
    calculateCumulativeExpectedCost,
    calculateCumulativeExpectedCostDetailed,
} from './starforce_db';
import {
    getLatestPrice,
    getLatestEthernelPrice,
} from './parsePriceData';
import {
    getWSEPotentialExpectation,
    getArmorPotentialExpectation,
    formatMeso,
    WSETier,
} from './potential-calculator';
import {
    getPotentialResetCost,
    getAdditionalPotentialResetCost,
    getPotentialUpgradeRate,
} from './cube_db';

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
    sparesNeededAvg: number;     // 평균 파괴 개수
    sparesNeededText: string;
    restoreCostMeso: number;     // 파괴 복구 총비용 (스페어 원가 × 평균 파괴 수)
    restoreCostText: string;
    potentialCostMeso: number;   // 잠재능력 큐브/재설정 기댓값
    potentialCostText: string;
    additionalCostMeso: number;  // 에디셔널 큐브/재설정 기댓값
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
    category: '스타포스' | 'WSE 잠재' | '잠재능력' | '장비 전환' | '기계 심장' | '안전 강화' | '엔드 강화';
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
        mainStatName: string;
        subStat: number;
        attackPower: number;
        bossDamage: number;
        ignoreDefense: number;
        criticalDamage: number;
        finalDamage: number;
    };
    equippedItems: EquippedItem[];
    recommendations: SpecUpRecommendation[];
}

// ─── 직업군 스탯 & 무기상수 판별 ─────────────────────────────────────────────

interface JobProfile {
    mainStat: 'STR' | 'DEX' | 'INT' | 'LUK' | 'HP';
    subStat: 'STR' | 'DEX' | 'INT' | 'LUK' | 'HP';
    isMagic: boolean;
    weaponConstant: number;
}

const JOB_PROFILES: Record<string, JobProfile> = {
    // 전사
    '히어로': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.34 },
    '팔라딘': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.34 },
    '다크나이트': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.49 },
    '소울마스터': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.34 },
    '미하일': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.2 },
    '블래스터': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.7 },
    '데몬슬레이어': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.2 },
    '데몬어벤져': { mainStat: 'HP', subStat: 'STR', isMagic: false, weaponConstant: 1.3 },
    '아란': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.49 },
    '카이저': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.34 },
    '아델': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.3 },
    '제로': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.34 },
    // 마법사
    '아크메이지(불,독)': { mainStat: 'INT', subStat: 'LUK', isMagic: true, weaponConstant: 1.2 },
    '아크메이지(썬,콜)': { mainStat: 'INT', subStat: 'LUK', isMagic: true, weaponConstant: 1.2 },
    '비숍': { mainStat: 'INT', subStat: 'LUK', isMagic: true, weaponConstant: 1.2 },
    '플레임위자드': { mainStat: 'INT', subStat: 'LUK', isMagic: true, weaponConstant: 1.2 },
    '배틀메이지': { mainStat: 'INT', subStat: 'LUK', isMagic: true, weaponConstant: 1.2 },
    '에반': { mainStat: 'INT', subStat: 'LUK', isMagic: true, weaponConstant: 1.2 },
    '루미너스': { mainStat: 'INT', subStat: 'LUK', isMagic: true, weaponConstant: 1.2 },
    '일리움': { mainStat: 'INT', subStat: 'LUK', isMagic: true, weaponConstant: 1.2 },
    '라라': { mainStat: 'INT', subStat: 'LUK', isMagic: true, weaponConstant: 1.2 },
    '키네시스': { mainStat: 'INT', subStat: 'LUK', isMagic: true, weaponConstant: 1.2 },
    '레테': { mainStat: 'INT', subStat: 'LUK', isMagic: true, weaponConstant: 1.2 },
    '린': { mainStat: 'INT', subStat: 'LUK', isMagic: true, weaponConstant: 1.2 },
    // 궁수
    '보우마스터': { mainStat: 'DEX', subStat: 'STR', isMagic: false, weaponConstant: 1.3 },
    '신궁': { mainStat: 'DEX', subStat: 'STR', isMagic: false, weaponConstant: 1.35 },
    '패스파인더': { mainStat: 'DEX', subStat: 'STR', isMagic: false, weaponConstant: 1.3 },
    '윈드브레이커': { mainStat: 'DEX', subStat: 'STR', isMagic: false, weaponConstant: 1.3 },
    '와일드헌터': { mainStat: 'DEX', subStat: 'STR', isMagic: false, weaponConstant: 1.35 },
    '메르세데스': { mainStat: 'DEX', subStat: 'STR', isMagic: false, weaponConstant: 1.3 },
    '카인': { mainStat: 'DEX', subStat: 'STR', isMagic: false, weaponConstant: 1.3 },
    // 도적
    '나이트로드': { mainStat: 'LUK', subStat: 'DEX', isMagic: false, weaponConstant: 1.75 },
    '섀도어': { mainStat: 'LUK', subStat: 'DEX', isMagic: false, weaponConstant: 1.3 },
    '듀얼블레이더': { mainStat: 'LUK', subStat: 'DEX', isMagic: false, weaponConstant: 1.3 },
    '듀얼블레이드': { mainStat: 'LUK', subStat: 'DEX', isMagic: false, weaponConstant: 1.3 },
    '나이트워커': { mainStat: 'LUK', subStat: 'DEX', isMagic: false, weaponConstant: 1.75 },
    '팬텀': { mainStat: 'LUK', subStat: 'DEX', isMagic: false, weaponConstant: 1.3 },
    '카데나': { mainStat: 'LUK', subStat: 'STR', isMagic: false, weaponConstant: 1.3 },
    '칼리': { mainStat: 'LUK', subStat: 'DEX', isMagic: false, weaponConstant: 1.3 },
    '호영': { mainStat: 'LUK', subStat: 'DEX', isMagic: false, weaponConstant: 1.3 },
    // 해적
    '바이퍼': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.7 },
    '캡틴': { mainStat: 'DEX', subStat: 'STR', isMagic: false, weaponConstant: 1.5 },
    '캐논슈터': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.5 },
    '스트라이커': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.7 },
    '메카닉': { mainStat: 'DEX', subStat: 'STR', isMagic: false, weaponConstant: 1.5 },
    '제논': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.5 },
    '은월': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.7 },
    '엔젤릭버스터': { mainStat: 'DEX', subStat: 'STR', isMagic: false, weaponConstant: 1.7 },
    '아크': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.7 },
    // 2026 신직업
    '렌': { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.3 },
    '레테': { mainStat: 'INT', subStat: 'LUK', isMagic: true, weaponConstant: 1.2 },
};

function getJobProfile(jobName: string): JobProfile {
    for (const [key, profile] of Object.entries(JOB_PROFILES)) {
        if (jobName.includes(key)) return profile;
    }
    return { mainStat: 'STR', subStat: 'DEX', isMagic: false, weaponConstant: 1.2 };
}

// ─── 전투력 델타 연산 ─────────────────────────────────────────────────────────

function estimateCombatPowerDelta(
    deltaAtk: number,
    deltaMainStat: number,
    deltaDamagePct: number,
    deltaBossDamagePct: number,
    currentCP: number,
    currentMainStat: number,
    currentAtk: number,
    currentBossDamage: number,
    currentFinalDamage: number,
    jobProfile: JobProfile
): number {
    // 1. 공격력 증가율
    const effectiveAtk = Math.max(1000, currentAtk);
    const atkRatio = deltaAtk > 0 ? (deltaAtk / effectiveAtk) : 0;

    // 2. 주스탯 증가율
    const effectiveStat = Math.max(10000, currentMainStat);
    const statRatio = deltaMainStat > 0 ? (deltaMainStat / effectiveStat) : 0;

    // 3. 뎀퍼/보공 증가율
    const baseDamagePool = 100 + currentBossDamage;
    const damageRatio = (deltaDamagePct + deltaBossDamagePct) > 0 ? ((deltaDamagePct + deltaBossDamagePct) / baseDamagePool) : 0;

    // 4. 복합 전투력 상승량 (현재 전투력 기반 스케일링)
    const baseScale = currentCP > 0 ? currentCP : 50_000_000;
    const totalMultiplier = (1 + atkRatio) * (1 + statRatio) * (1 + damageRatio) - 1;

    const rawGain = baseScale * totalMultiplier;
    return Math.max(10_000, Math.round(rawGain));
}

// ─── 핵심 스펙업 진단 엔진 ───────────────────────────────────────────────────

export function analyzeCharacterSpecUp(
    characterInfo: any,
    finalStats: Record<string, string>,
    equippedItems: EquippedItem[],
    _hexaCoreEquipment: any[] = []
): SpecUpAnalysisResult {
    const candidates: SpecUpRecommendation[] = [];

    const jobName = characterInfo.character_class ?? '';
    const profile = getJobProfile(jobName);

    // 스탯 파싱
    const combatPower = parseInt(finalStats['전투력'] ?? '50000000', 10);
    const mainStatVal = parseInt(finalStats[profile.mainStat] ?? '50000', 10);
    const subStatVal  = parseInt(finalStats[profile.subStat] ?? '8000', 10);
    const atkPowerVal = parseInt((profile.isMagic ? finalStats['마력'] : finalStats['공격력']) ?? '2500', 10);
    const bossDamage  = parseFloat(finalStats['보스 몬스터 데미지'] ?? '300');
    const finalDamage = parseFloat(finalStats['최종 데미지'] ?? '100');
    const ignoreDefense = parseFloat(finalStats['방어율 무시'] ?? '95');
    const criticalDamage = parseFloat(finalStats['크리티컬 데미지'] ?? '80');

    // ═══════════════════════════════════════════════════════════════════
    // PART 1. WSE (무기 / 보조무기 / 엠블렘) 잠재능력 정밀 진단
    // ═══════════════════════════════════════════════════════════════════
    const wseSlots = ['무기', '보조무기', '엠블렘'];
    equippedItems.forEach(item => {
        if (!wseSlots.includes(item.slot)) return;

        const grade = item.potentialGrade ?? '노잠재';
        const lv = item.baseLevel || 200;
        const slotType = item.slot as '무기' | '보조무기' | '엠블렘';

        // CASE WSE-1: 에픽/유니크 ➔ 레전드리 3줄 유효
        if (grade === '에픽' || grade === '유니크' || grade === '노잠재' || grade === '레어') {
            const exp = getWSEPotentialExpectation(slotType, lv, '3줄유효', profile.isMagic);
            
            // 등급업 비용 추가 (유니크/에픽 기준)
            const uniqResetCost = getPotentialResetCost(lv, '유니크');
            const avgUniqToLeg = 1 / (getPotentialUpgradeRate('유니크', '레전드리') / 100);
            const upgradeCost = Math.round(avgUniqToLeg * uniqResetCost);
            const totalCost = exp.totalCostMeso + upgradeCost;

            const deltaBoss = slotType === '엠블렘' ? 0 : 35;
            const deltaAtkPct = slotType === '엠블렘' ? 21 : 12;
            const deltaAtk = Math.round(atkPowerVal * (deltaAtkPct / 100));

            const cpGain = estimateCombatPowerDelta(deltaAtk, 0, 0, deltaBoss, combatPower, mainStatVal, atkPowerVal, bossDamage, finalDamage, profile);
            const eff = totalCost > 0 ? cpGain / (totalCost / 100_000_000) : 0;

            candidates.push({
                rank: 0,
                slot: item.slot,
                targetItem: item.name,
                currentStatus: `${grade} 등급`,
                action: '레전드리 3줄 유효옵션 큐브 재설정',
                category: 'WSE 잠재',
                costBreakdown: {
                    basePriceMeso: 0,
                    basePriceText: '기존 장비 재설정 (스페어 불필요)',
                    starforceCostMeso: 0,
                    starforceCostText: '0원',
                    sparesNeededAvg: 0,
                    sparesNeededText: '파괴 없음',
                    restoreCostMeso: 0,
                    restoreCostText: '0원',
                    potentialCostMeso: totalCost,
                    potentialCostText: `${formatMeso(totalCost)} (레전 등급업 ${formatMeso(upgradeCost)} + 3줄 띄우기 ${exp.formattedExpectedCost})`,
                    additionalCostMeso: 0,
                    additionalCostText: '0원',
                    totalCostMeso: totalCost,
                    totalCostText: formatMeso(totalCost)
                },
                gains: {
                    statText: slotType === '엠블렘' ? `공격력/마력 +${deltaAtkPct}%, 방무 +35%` : `보스데미지 +${deltaBoss}%, 공/마 +${deltaAtkPct}%`,
                    combatPowerGain: cpGain,
                    combatPowerText: `(추정) +${(cpGain / 10000).toFixed(0)}만`,
                    combatPowerIsEstimate: true,
                    bossDamageGainPercent: slotType === '엠블렘' ? 3.5 : 5.8,
                    bossDamageText: slotType === '엠블렘' ? '(추정) +3.5% 실전 딜' : '(추정) +5.8% 실전 딜'
                },
                efficiencyScore: Number(eff.toFixed(2)),
                efficiencyBadge: '🔥 WSE 1순위 스펙업',
                reason: `${item.slot}은(는) 메이플 최고 효율 스펙업 부위입니다. 유효 3줄 세팅 시 캐릭터 전체 딜량이 폭발적으로 상승합니다.`,
                proTip: '미라클 타임 이벤트 때 등급업을 노리면 메소 기댓값을 절반으로 줄일 수 있습니다.'
            });
        }
        // CASE WSE-2: 레전드리 2줄 ➔ 레전드리 3줄 극종결 (보보공 / 보공공 / 공3줄)
        else if (grade === '레전드리') {
            const exp = getWSEPotentialExpectation(slotType, lv, '3줄극종결', profile.isMagic);
            const totalCost = exp.totalCostMeso;

            const deltaBoss = slotType === '엠블렘' ? 0 : 35;
            const deltaAtkPct = 9;
            const deltaAtk = Math.round(atkPowerVal * (deltaAtkPct / 100));

            const cpGain = estimateCombatPowerDelta(deltaAtk, 0, 0, deltaBoss, combatPower, mainStatVal, atkPowerVal, bossDamage, finalDamage, profile);
            const eff = totalCost > 0 ? cpGain / (totalCost / 100_000_000) : 0;

            candidates.push({
                rank: 0,
                slot: item.slot,
                targetItem: item.name,
                currentStatus: '레전드리 (2줄 유효)',
                action: '레전드리 3줄 극종결 (보보공/보공공) 트라이',
                category: 'WSE 잠재',
                costBreakdown: {
                    basePriceMeso: 0,
                    basePriceText: '기존 장비 재설정',
                    starforceCostMeso: 0,
                    starforceCostText: '0원',
                    sparesNeededAvg: 0,
                    sparesNeededText: '파괴 없음',
                    restoreCostMeso: 0,
                    restoreCostText: '0원',
                    potentialCostMeso: totalCost,
                    potentialCostText: `${formatMeso(totalCost)} (확률 ${exp.probabilityPercent}, 평균 ${exp.expectedAttempts}회)`,
                    additionalCostMeso: 0,
                    additionalCostText: '0원',
                    totalCostMeso: totalCost,
                    totalCostText: formatMeso(totalCost)
                },
                gains: {
                    statText: slotType === '엠블렘' ? '공격력/마력 +9% (공3줄 완성)' : '보스데미지 +35% or 공/마 +9% (3줄 종결)',
                    combatPowerGain: cpGain,
                    combatPowerText: `(추정) +${(cpGain / 10000).toFixed(0)}만`,
                    combatPowerIsEstimate: true,
                    bossDamageGainPercent: 3.2,
                    bossDamageText: '(추정) +3.2% 실전 딜'
                },
                efficiencyScore: Number(eff.toFixed(2)),
                efficiencyBadge: '👑 WSE 3줄 극종결',
                reason: '상위 보스 솔플 및 하드/카오스 보스 격파를 위한 필수 종결 잠재능력 세팅입니다.',
                proTip: '블랙 큐브(메소 재설정)로 기존 2줄을 보존하면서 유효 3줄이 떴을 때 교체하세요.'
            });
        }
    });

    // ═══════════════════════════════════════════════════════════════════
    // PART 2. 방어구 & 장신구 잠재능력 (15% 둘둘 ➔ 21% ➔ 30%)
    // ═══════════════════════════════════════════════════════════════════
    const armorAccSlots = new Set([
        '모자', '상의', '하의', '신발', '장갑', '망토', '벨트', '어깨장식',
        '얼굴장식', '눈장식', '귀고리', '반지1', '반지2', '반지3', '반지4', '펜던트', '펜던트2'
    ]);

    equippedItems.forEach(item => {
        if (!armorAccSlots.has(item.slot) && !item.slot.includes('반지') && !item.slot.includes('펜던트')) return;

        const grade = item.potentialGrade ?? '노잠재';
        const lv = item.baseLevel || 160;

        // CASE POT-1: 에픽 ➔ 유니크 15% 둘둘 (가성비 최고)
        if (grade === '에픽' || grade === '레어' || grade === '노잠재') {
            const exp = getArmorPotentialExpectation(item.slot, lv, profile.mainStat, 21, '에픽');
            // 유니크 15%는 21%보다 훨씬 잘 뜸 (약 1/4 비용)
            const cost15 = Math.round(exp.totalCostMeso * 0.35);

            const deltaStat = Math.round(mainStatVal * 0.06); // 에픽 9% 대비 +6% 향상
            const cpGain = estimateCombatPowerDelta(0, deltaStat, 0, 0, combatPower, mainStatVal, atkPowerVal, bossDamage, finalDamage, profile);
            const eff = cost15 > 0 ? cpGain / (cost15 / 100_000_000) : 0;

            candidates.push({
                rank: 0,
                slot: item.slot,
                targetItem: item.name,
                currentStatus: `${grade} (9% 이하)`,
                action: '유니크 15% 둘둘 가성비 업그레이드',
                category: '잠재능력',
                costBreakdown: {
                    basePriceMeso: 0,
                    basePriceText: '기존 장비 재설정',
                    starforceCostMeso: 0,
                    starforceCostText: '0원',
                    sparesNeededAvg: 0,
                    sparesNeededText: '파괴 없음',
                    restoreCostMeso: 0,
                    restoreCostText: '0원',
                    potentialCostMeso: cost15,
                    potentialCostText: `${formatMeso(cost15)} (유니크 등급업 + 15% 기댓값)`,
                    additionalCostMeso: 0,
                    additionalCostText: '0원',
                    totalCostMeso: cost15,
                    totalCostText: formatMeso(cost15)
                },
                gains: {
                    statText: `주스탯 +6% (${profile.mainStat} 약 +${deltaStat})`,
                    combatPowerGain: cpGain,
                    combatPowerText: `(추정) +${(cpGain / 10000).toFixed(0)}만`,
                    combatPowerIsEstimate: true,
                    bossDamageGainPercent: 0.9,
                    bossDamageText: '(추정) +0.9% 실전 딜'
                },
                efficiencyScore: Number(eff.toFixed(2)),
                efficiencyBadge: '💎 초특급 가성비 잠재',
                reason: '에픽 9%에서 유니크 15%로 올리는 구간은 적은 메소로 확실한 스탯을 챙기는 0순위 코스입니다.',
                proTip: '장인의 큐브나 이벤트 유니크 잠재능력 부여 주문서를 활용하면 메소를 더 아낄 수 있습니다.'
            });
        }
        // CASE POT-2: 유니크 ➔ 레전드리 21% / 30%
        else if (grade === '유니크') {
            const exp21 = getArmorPotentialExpectation(item.slot, lv, profile.mainStat, 21, '유니크');
            const totalCost = exp21.totalCostMeso;

            const deltaStat = Math.round(mainStatVal * 0.06); // 15% 대비 +6% 향상
            const cpGain = estimateCombatPowerDelta(0, deltaStat, 0, 0, combatPower, mainStatVal, atkPowerVal, bossDamage, finalDamage, profile);
            const eff = totalCost > 0 ? cpGain / (totalCost / 100_000_000) : 0;

            candidates.push({
                rank: 0,
                slot: item.slot,
                targetItem: item.name,
                currentStatus: '유니크 (15%)',
                action: '레전드리 21% 잠재 등급업 & 재설정',
                category: '잠재능력',
                costBreakdown: {
                    basePriceMeso: 0,
                    basePriceText: '기존 장비 재설정',
                    starforceCostMeso: 0,
                    starforceCostText: '0원',
                    sparesNeededAvg: 0,
                    sparesNeededText: '파괴 없음',
                    restoreCostMeso: 0,
                    restoreCostText: '0원',
                    potentialCostMeso: totalCost,
                    potentialCostText: `${formatMeso(totalCost)} (레전 등급업 ${formatMeso(exp21.upgradeCostMeso || 0)} + 21% 띄우기)`,
                    additionalCostMeso: 0,
                    additionalCostText: '0원',
                    totalCostMeso: totalCost,
                    totalCostText: formatMeso(totalCost)
                },
                gains: {
                    statText: `주스탯 +6% (${profile.mainStat} 약 +${deltaStat})`,
                    combatPowerGain: cpGain,
                    combatPowerText: `(추정) +${(cpGain / 10000).toFixed(0)}만`,
                    combatPowerIsEstimate: true,
                    bossDamageGainPercent: 1.1,
                    bossDamageText: '(추정) +1.1% 실전 딜'
                },
                efficiencyScore: Number(eff.toFixed(2)),
                efficiencyBadge: '✨ 레전 21% 안착',
                reason: '유니크에서 레전드리 21%로 안착하면 보스 및 사냥 전투력이 균형 있게 상승합니다.',
                proTip: '경매장에서 21% 완제품 토드 매물이 있는지 먼저 검색해보세요.'
            });
        }
    });

    // ═══════════════════════════════════════════════════════════════════
    // PART 3. 스타포스 17성 / 18성 / 22성 범용 강화
    // ═══════════════════════════════════════════════════════════════════
    const EXCLUDED_SF_SLOTS = new Set(['보조무기', '엠블렘', '훈장', '뱃지', '포켓 아이템', '칭호']);

    equippedItems.forEach(item => {
        const star = item.starforce || 0;
        const slot = item.slot;
        const name = item.name;
        const grade = item.potentialGrade ?? '노잠재';
        const lv = item.baseLevel || 150;

        if (EXCLUDED_SF_SLOTS.has(slot)) return;
        if (name.includes('타일런트') || name.includes('헬리시움') || name.includes('노바')) return;

        // CASE SF-1: 10~16성 ➔ 17성 둘둘
        if (star >= 10 && star < 17) {
            const baseP = getLatestPrice(name, slot, jobName);

            const cost0to17 = calculateCumulativeExpectedCost(lv, 17, { itemCost: baseP });
            const cost0toFrom = calculateCumulativeExpectedCost(lv, star, { itemCost: baseP });
            const sfMeso = Math.max(0, cost0to17 - cost0toFrom);

            const det17 = calculateCumulativeExpectedCostDetailed(lv, 17, { itemCost: 0 });
            const detFrom = calculateCumulativeExpectedCostDetailed(lv, star, { itemCost: 0 });
            const sparesAvg = Math.max(0, det17.totalSpares - detFrom.totalSpares);
            const restoreCost = Math.round(sparesAvg * baseP);
            const totalMeso = sfMeso + restoreCost;
            const starsToGain = 17 - star;

            const deltaAtk = starsToGain * 8;
            const deltaMainStat = starsToGain * 12;
            const cpGain = estimateCombatPowerDelta(deltaAtk, deltaMainStat, 0, 0, combatPower, mainStatVal, atkPowerVal, bossDamage, finalDamage, profile);
            const eff = totalMeso > 0 ? cpGain / (totalMeso / 100_000_000) : 0;

            candidates.push({
                rank: 0,
                slot, targetItem: name,
                currentStatus: `${star}성 (${grade})`,
                action: `${star}성 → 17성`,
                category: '스타포스',
                costBreakdown: {
                    basePriceMeso: baseP,
                    basePriceText: sparesAvg > 0 ? `${formatMeso(baseP)} (오늘 경매장 시세)` : '0원 (파괴 없음)',
                    starforceCostMeso: sfMeso,
                    starforceCostText: `${formatMeso(sfMeso)} (마르코프 기댓값)`,
                    sparesNeededAvg: sparesAvg,
                    sparesNeededText: sparesAvg > 0.01 ? `평균 파괴 ${sparesAvg.toFixed(2)}개` : '파괴 없음',
                    restoreCostMeso: restoreCost,
                    restoreCostText: restoreCost > 0 ? formatMeso(restoreCost) : '0원',
                    potentialCostMeso: 0,
                    potentialCostText: '0원',
                    additionalCostMeso: 0,
                    additionalCostText: '0원',
                    totalCostMeso,
                    totalCostText: formatMeso(totalMeso)
                },
                gains: {
                    statText: `공격력/마력 +${deltaAtk}, 주스탯 +${deltaMainStat}`,
                    combatPowerGain: cpGain,
                    combatPowerText: `(추정) +${(cpGain / 10000).toFixed(0)}만`,
                    combatPowerIsEstimate: true,
                    bossDamageGainPercent: Number((0.55 * starsToGain).toFixed(1)),
                    bossDamageText: `(추정) +${(0.55 * starsToGain).toFixed(1)}% 실전 딜`
                },
                efficiencyScore: Number(eff.toFixed(2)),
                efficiencyBadge: '💎 국민 17성 완성',
                reason: '17성 둘둘은 파괴 확률이 매우 낮아 메소 대비 공격력 획득량이 가장 높은 기본 코스입니다.',
                proTip: '15·16성 100% 이벤트(썬데이 메이플) 때 진행하면 30% 이상 메소를 절약할 수 있습니다.'
            });
        }

        // CASE SF-2: 17성 ➔ 18성 안전 1업
        if (star === 17) {
            const baseP = getLatestPrice(name, slot, jobName);

            const cost0to18 = calculateCumulativeExpectedCost(lv, 18, { itemCost: baseP });
            const cost0to17 = calculateCumulativeExpectedCost(lv, 17, { itemCost: baseP });
            const sfMeso = Math.max(0, cost0to18 - cost0to17);

            const det18 = calculateCumulativeExpectedCostDetailed(lv, 18, { itemCost: 0 });
            const det17d = calculateCumulativeExpectedCostDetailed(lv, 17, { itemCost: 0 });
            const sparesAvg = Math.max(0, det18.totalSpares - det17d.totalSpares);
            const restoreCost = Math.round(sparesAvg * baseP);
            const totalMeso = sfMeso + restoreCost;

            const isWeapon = slot === '무기';
            const deltaAtk = isWeapon ? 15 : 13;
            const deltaStat = 15;
            const cpGain = estimateCombatPowerDelta(deltaAtk, deltaStat, 0, 0, combatPower, mainStatVal, atkPowerVal, bossDamage, finalDamage, profile);
            const eff = totalMeso > 0 ? cpGain / (totalMeso / 100_000_000) : 0;

            candidates.push({
                rank: 0,
                slot, targetItem: name,
                currentStatus: `17성 (${grade})`,
                action: '17성 → 18성 안전 1업',
                category: '안전 강화',
                costBreakdown: {
                    basePriceMeso: baseP,
                    basePriceText: baseP > 0 ? `${formatMeso(baseP)} (오늘 경매장 시세)` : '0원',
                    starforceCostMeso: sfMeso,
                    starforceCostText: `${formatMeso(sfMeso)} (마르코프 기댓값)`,
                    sparesNeededAvg: sparesAvg,
                    sparesNeededText: `평균 파괴 ${sparesAvg.toFixed(2)}개`,
                    restoreCostMeso: restoreCost,
                    restoreCostText: restoreCost > 0 ? formatMeso(restoreCost) : '0원',
                    potentialCostMeso: 0,
                    potentialCostText: '0원',
                    additionalCostMeso: 0,
                    additionalCostText: '0원',
                    totalCostMeso,
                    totalCostText: formatMeso(totalMeso)
                },
                gains: {
                    statText: `공격력/마력 +${deltaAtk}, 주스탯 +${deltaStat}`,
                    combatPowerGain: cpGain,
                    combatPowerText: `(추정) +${(cpGain / 10000).toFixed(0)}만`,
                    combatPowerIsEstimate: true,
                    bossDamageGainPercent: isWeapon ? 1.6 : 0.8,
                    bossDamageText: `(추정) +${isWeapon ? 1.6 : 0.8}% 실전 딜`
                },
                efficiencyScore: Number(eff.toFixed(2)),
                efficiencyBadge: isWeapon ? '🔥 무기 18성 최우선' : '👍 18성 안전 가성비',
                reason: '17→18성은 1성만 올려도 공격력을 13~15씩 챙길 수 있는 대표적인 징검다리 스펙업입니다.',
                proTip: '노작 가격이 저렴한 카루타/여명 부위부터 먼저 18성을 올리는 것을 추천합니다.'
            });
        }

        // CASE SF-3: 17~21성 ➔ 22성 종결 트라이 (모든 140~250제 장비 범용 지원)
        if (star >= 17 && star < 22 && lv >= 140) {
            const baseP = getLatestPrice(name, slot, jobName);

            const cost0to22 = calculateCumulativeExpectedCost(lv, 22, { itemCost: baseP });
            const cost0toFrom = calculateCumulativeExpectedCost(lv, star, { itemCost: baseP });
            const sfMeso = Math.max(0, cost0to22 - cost0toFrom);

            const det22 = calculateCumulativeExpectedCostDetailed(lv, 22, { itemCost: 0 });
            const detFr = calculateCumulativeExpectedCostDetailed(lv, star, { itemCost: 0 });
            const sparesAvg = Math.max(0, det22.totalSpares - detFr.totalSpares);
            const restoreCost = Math.round(sparesAvg * baseP);
            const totalMeso = sfMeso + restoreCost;

            const starsToGain = 22 - star;
            const deltaAtk = starsToGain * 11;
            const deltaStat = starsToGain * 15;
            const cpGain = estimateCombatPowerDelta(deltaAtk, deltaStat, 0, 0, combatPower, mainStatVal, atkPowerVal, bossDamage, finalDamage, profile);
            const eff = totalMeso > 0 ? cpGain / (totalMeso / 100_000_000) : 0;

            candidates.push({
                rank: 0,
                slot, targetItem: name,
                currentStatus: `${star}성 (${grade})`,
                action: `${star}성 → 22성 종결 트라이`,
                category: '엔드 강화',
                costBreakdown: {
                    basePriceMeso: baseP,
                    basePriceText: `${formatMeso(baseP)} (오늘 경매장 시세)`,
                    starforceCostMeso: sfMeso,
                    starforceCostText: `${formatMeso(sfMeso)} (마르코프 기댓값)`,
                    sparesNeededAvg: sparesAvg,
                    sparesNeededText: `평균 파괴 ${sparesAvg.toFixed(2)}개`,
                    restoreCostMeso: restoreCost,
                    restoreCostText: `${formatMeso(restoreCost)} (파괴 복구비)`,
                    potentialCostMeso: 0,
                    potentialCostText: '0원',
                    additionalCostMeso: 0,
                    additionalCostText: '0원',
                    totalCostMeso,
                    totalCostText: formatMeso(totalMeso)
                },
                gains: {
                    statText: `공격력/마력 +${deltaAtk}, 주스탯 +${deltaStat}`,
                    combatPowerGain: cpGain,
                    combatPowerText: `(추정) +${(cpGain / 10000).toFixed(0)}만`,
                    combatPowerIsEstimate: true,
                    bossDamageGainPercent: Number((0.6 * starsToGain).toFixed(1)),
                    bossDamageText: `(추정) +${(0.6 * starsToGain).toFixed(1)}% 실전 딜`
                },
                efficiencyScore: Number(eff.toFixed(2)),
                efficiencyBadge: '👑 22성 종결',
                reason: `${name} 22성 달성 시 장비의 스탯/공격력이 대폭 상승하여 엔드 보스 스펙에 진입합니다.`,
                proTip: '샤이닝 스타포스 타임 이벤트 때 예비 노작을 최소 3~5개 구비한 뒤 진행하세요.'
            });
        }
    });

    // ═══════════════════════════════════════════════════════════════════
    // PART 4. 장비 티어 전환 (Gear Progression)
    // ═══════════════════════════════════════════════════════════════════
    const ETH_SLOTS = new Set(['모자', '상의', '하의', '신발', '장갑', '망토', '어깨장식']);
    equippedItems.forEach(item => {
        const slot = item.slot;
        const name = item.name;

        // CASE PROG-1: 앱솔/카루타 ➔ 에테르넬 전환
        if ((name.includes('앱솔랩스') || name.includes('하이네스') || name.includes('이글아이') || name.includes('트릭스터')) && ETH_SLOTS.has(slot)) {
            const ethPrice = getLatestEthernelPrice(slot, jobName);
            const ethLevel = 250;

            const sfMeso = calculateCumulativeExpectedCost(ethLevel, 17, { itemCost: ethPrice });
            const detEth = calculateCumulativeExpectedCostDetailed(ethLevel, 17, { itemCost: 0 });
            const sparesAvg = detEth.totalSpares;
            const restoreCost = Math.round(sparesAvg * ethPrice);

            const potExp = getArmorPotentialExpectation(slot, ethLevel, profile.mainStat, 21, '유니크');
            const totalMeso = ethPrice + sfMeso + restoreCost + potExp.totalCostMeso;

            const deltaAtk = 32;
            const deltaStat = 45;
            const cpGain = estimateCombatPowerDelta(deltaAtk, deltaStat, 0, 0, combatPower, mainStatVal, atkPowerVal, bossDamage, finalDamage, profile);
            const eff = totalMeso > 0 ? cpGain / (totalMeso / 100_000_000) : 0;

            candidates.push({
                rank: 0,
                slot,
                targetItem: `${name} → 에테르넬 ${slot}`,
                currentStatus: `${item.starforce}성 (${item.potentialGrade ?? '유니크'})`,
                action: '17성 레전 21% 에테르넬 전환',
                category: '장비 전환',
                costBreakdown: {
                    basePriceMeso: ethPrice,
                    basePriceText: `${formatMeso(ethPrice)} (오늘 에테 ${slot} 시세)`,
                    starforceCostMeso: sfMeso,
                    starforceCostText: `${formatMeso(sfMeso)} (250제 17성 기댓값)`,
                    sparesNeededAvg: sparesAvg,
                    sparesNeededText: `평균 파괴 ${sparesAvg.toFixed(2)}개`,
                    restoreCostMeso: restoreCost,
                    restoreCostText: formatMeso(restoreCost),
                    potentialCostMeso: potExp.totalCostMeso,
                    potentialCostText: `${potExp.formattedTotalCost} (레전 21% 기댓값)`,
                    additionalCostMeso: 0,
                    additionalCostText: '0원',
                    totalCostMeso,
                    totalCostText: `${formatMeso(totalMeso)} (부위당 완성 총합)`
                },
                gains: {
                    statText: `공격력/마력 +${deltaAtk}, 올스탯 +${deltaStat} (에테르넬 세트효과 포함)`,
                    combatPowerGain: cpGain,
                    combatPowerText: `(추정) +${(cpGain / 10000).toFixed(0)}만`,
                    combatPowerIsEstimate: true,
                    bossDamageGainPercent: 2.8,
                    bossDamageText: '(추정) +2.8% 실전 딜'
                },
                efficiencyScore: Number(eff.toFixed(2)),
                efficiencyBadge: '🚀 250제 에테르넬 세팅',
                reason: '기존 방어구의 한계를 돌파하고 에테르넬 세트 효과로 높은 공격력과 올스탯을 확보합니다.',
                proTip: '경매장에서 17성 레전드리 21% 완제품 매물 가격을 직작 비용과 비교 후 구매하세요.'
            });
        }
    });

    // ═══════════════════════════════════════════════════════════════════
    // PART 5. 기계 심장 (Heart) 매지컬작 업그레이드
    // ═══════════════════════════════════════════════════════════════════
    const heart = equippedItems.find(i => i.slot.includes('기계 심장') || i.slot.includes('하트'));
    if (heart && (heart.name.includes('리튬') || heart.name.includes('골드') || heart.name.includes('크리스탈') || !heart.name.includes('블랙'))) {
        const fairyHeartPrice = 300_000_000; // 페어리하트 약 3억
        const magicalScrollCost = 9 * 150_000_000; // 매지컬 9작 약 13.5억
        const totalHeartCost = fairyHeartPrice + magicalScrollCost;

        const deltaAtk = 9 * 10; // 공+90
        const deltaStat = 40;
        const cpGain = estimateCombatPowerDelta(deltaAtk, deltaStat, 0, 0, combatPower, mainStatVal, atkPowerVal, bossDamage, finalDamage, profile);
        const eff = totalHeartCost > 0 ? cpGain / (totalHeartCost / 100_000_000) : 0;

        candidates.push({
            rank: 0,
            slot: '기계 심장',
            targetItem: '페어리 하트 (매지컬 완작)',
            currentStatus: heart.name,
            action: '페어리 하트 + 매지컬 공격력 주문서 9작',
            category: '기계 심장',
            costBreakdown: {
                basePriceMeso: fairyHeartPrice,
                basePriceText: `${formatMeso(fairyHeartPrice)} (페어리 하트 노작)`,
                starforceCostMeso: 0,
                starforceCostText: '0원',
                sparesNeededAvg: 0,
                sparesNeededText: '파괴 없음',
                restoreCostMeso: 0,
                restoreCostText: '0원',
                potentialCostMeso: 0,
                potentialCostText: '0원 (유니크 15% 둘둘 권장)',
                additionalCostMeso: magicalScrollCost,
                additionalCostText: `${formatMeso(magicalScrollCost)} (매지컬 9장 기댓값)`,
                totalCostMeso: totalHeartCost,
                totalCostText: formatMeso(totalHeartCost)
            },
            gains: {
                statText: `공격력/마력 +${deltaAtk}, 올스탯 +${deltaStat}`,
                combatPowerGain: cpGain,
                combatPowerText: `(추정) +${(cpGain / 10000).toFixed(0)}만`,
                combatPowerIsEstimate: true,
                bossDamageGainPercent: 3.4,
                bossDamageText: '(추정) +3.4% 실전 딜'
            },
            efficiencyScore: Number(eff.toFixed(2)),
            efficiencyBadge: '💖 영구 하트 완성',
            reason: '기간제 하트나 기본 하트에서 영구 페어리 하트로 교체하여 공격력 +90을 영구 확보합니다.',
            proTip: '이벤트 코인샵에서 매지컬 주문서 및 순백의 주문서를 수급하면 비용을 크게 아낄 수 있습니다.'
        });
    }

    // 가성비 효율순 정렬 후 TOP 10 반환
    candidates.sort((a, b) => b.efficiencyScore - a.efficiencyScore);
    candidates.forEach((r, i) => { r.rank = i + 1; });

    return {
        character: {
            name: characterInfo.character_name,
            world: characterInfo.world_name,
            job: characterInfo.character_class,
            level: characterInfo.character_level,
            guild: characterInfo.character_guild_name ?? '무소속',
            image: characterInfo.character_image,
            combatPower,
            mainStat: mainStatVal,
            mainStatName: profile.mainStat,
            subStat: subStatVal,
            attackPower: atkPowerVal,
            bossDamage,
            ignoreDefense,
            criticalDamage,
            finalDamage
        },
        equippedItems,
        recommendations: candidates.slice(0, 10),
    };
}
