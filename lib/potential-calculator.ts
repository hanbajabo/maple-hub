/**
 * lib/potential-calculator.ts
 *
 * 2026 메이플스토리 넥슨 공식 확률 기반 잠재능력 3줄 조합 기댓값 연산 엔진
 * (mesu.live 동일 알고리즘: 줄별 등급 가중치, 특수 옵션 중복 제한 및 동적 재정규화, 방무 곱적용, 올스탯 합산)
 */

import fs from 'fs';
import path from 'path';
import {
    getPotentialResetCost,
    getAdditionalPotentialResetCost,
    getPotentialUpgradeRate,
    getPotentialGuaranteeCount,
    getAdditionalPotentialUpgradeRate,
    AdditionalCubeType,
    OptionGrade,
    ItemGrade
} from './cube_db';

export interface RawOptionEntry {
    name: string;
    id: number;
    probability: number;
}

export type StatType =
    | 'STR %' | 'DEX %' | 'INT %' | 'LUK %' | 'HP %' | 'ALL %'
    | 'ATTACK %' | 'MAGIC_ATTACK %' | 'DAMAGE' | 'BOSS_DAMAGE'
    | 'IGNORE_DEFENSE' | 'CRITICAL_DAMAGE' | 'CRITICAL_PROB'
    | 'COOL_DOWN' | 'ITEM_DROP' | 'MESO_OBTAIN'
    | 'STR' | 'DEX' | 'INT' | 'LUK' | 'HP' | 'ATTACK' | 'MAGIC_ATTACK' | 'ALL'
    | 'STR_PER_LEVEL' | 'DEX_PER_LEVEL' | 'INT_PER_LEVEL' | 'LUK_PER_LEVEL';

export interface ParsedOption {
    rawName: string;
    stats: Partial<Record<StatType, number>>;
    probability: number;
    isDecentSkill: boolean;
    isInvincibleAfterHit: boolean;
    isIgnoreDamageChance: boolean;
    isInvincibleChance: boolean;
}

export type TargetOptionSet = Partial<Record<StatType, number>>;

export interface PotentialCalculationResult {
    probability: number;             // 3줄 목표 옵션 동시 출현 확률 (0 ~ 1)
    probabilityPercent: string;      // "0.0785%"
    expectedAttempts: number;        // 평균 시도 횟수
    expectedCostMeso: number;        // 평균 소모 메소 기댓값
    formattedExpectedCost: string;   // "약 35.5억 메소"
    costPerAttempt: number;          // 1회 재설정 비용
    upgradeCostMeso?: number;        // 등급업 필요 시 등급업 비용 기댓값
    totalCostMeso: number;           // 등급업 + 옵션 띄우기 총합
    formattedTotalCost: string;
}

let POTENTIAL_TABLE_DB: any = null;

function findPotentialDBPath(): string | null {
    const candidates = [
        path.join(process.cwd(), 'data', 'potential-option-tables.json'),
        path.join(process.cwd(), 'maple-hub', 'data', 'potential-option-tables.json'),
        path.join(__dirname, '..', 'data', 'potential-option-tables.json'),
        path.join(__dirname, '..', '..', 'data', 'potential-option-tables.json'),
        path.join(__dirname, '..', '..', '..', 'data', 'potential-option-tables.json'),
        path.join('C:', 'Users', 'USER', 'Desktop', 'maple-colosseum', 'maple-hub', 'data', 'potential-option-tables.json')
    ];
    for (const p of candidates) {
        try {
            if (fs.existsSync(p)) return p;
        } catch (e) {}
    }
    return null;
}

function loadPotentialTableDB(): any {
    if (POTENTIAL_TABLE_DB) return POTENTIAL_TABLE_DB;
    try {
        const filePath = findPotentialDBPath();
        if (filePath) {
            const data = fs.readFileSync(filePath, 'utf-8');
            POTENTIAL_TABLE_DB = JSON.parse(data);
            return POTENTIAL_TABLE_DB;
        }
    } catch (e) {
        console.error('Failed to load potential-option-tables.json:', e);
    }
    return null;
}

// ─── 옵션 명칭 ➔ 스탯 수치 파싱 정규식 ────────────────────────────────────────

export function parseOptionString(name: string, probability: number): ParsedOption {
    const stats: Partial<Record<StatType, number>> = {};
    const trimmed = name.trim();

    // 쓸만한 스킬 & 특수 옵션 감지
    const isDecentSkill = /쓸만한/.test(trimmed);
    const isInvincibleAfterHit = /피격\s*후\s*무적시간/.test(trimmed);
    const isIgnoreDamageChance = /피격\s*시\s*\d+%\s*확률로\s*데미지의\s*\d+%\s*무시/.test(trimmed);
    const isInvincibleChance = /피격\s*시\s*\d+%\s*확률로\s*\d+초간\s*무적/.test(trimmed);

    // 1. 보스 공격 시 데미지
    const bossMatch = trimmed.match(/보스\s*몬스터\s*(?:공격\s*시\s*)?데미지\s*:?\s*\+(\d+)%/);
    if (bossMatch) stats.BOSS_DAMAGE = parseInt(bossMatch[1], 10);

    // 2. 몬스터 방어율 무시
    const iedMatch = trimmed.match(/몬스터\s*방어율\s*무시\s*:?\s*\+(\d+)%/);
    if (iedMatch) stats.IGNORE_DEFENSE = parseInt(iedMatch[1], 10);

    // 3. 공격력 %
    const attPctMatch = trimmed.match(/^공격력\s*:?\s*\+(\d+)%/);
    if (attPctMatch) stats['ATTACK %'] = parseInt(attPctMatch[1], 10);

    // 4. 마력 %
    const magPctMatch = trimmed.match(/^마력\s*:?\s*\+(\d+)%/);
    if (magPctMatch) stats['MAGIC_ATTACK %'] = parseInt(magPctMatch[1], 10);

    // 5. 공격력 정수
    const attFlatMatch = trimmed.match(/^공격력\s*:?\s*\+(\d+)$/);
    if (attFlatMatch) stats.ATTACK = parseInt(attFlatMatch[1], 10);

    // 6. 마력 정수
    const magFlatMatch = trimmed.match(/^마력\s*:?\s*\+(\d+)$/);
    if (magFlatMatch) stats.MAGIC_ATTACK = parseInt(magFlatMatch[1], 10);

    // 7. 올스탯 %
    const allPctMatch = trimmed.match(/올스탯\s*:?\s*\+(\d+)%/);
    if (allPctMatch) stats['ALL %'] = parseInt(allPctMatch[1], 10);

    // 8. 스탯 %
    const strPctMatch = trimmed.match(/^STR\s*:?\s*\+(\d+)%/);
    if (strPctMatch) stats['STR %'] = parseInt(strPctMatch[1], 10);
    const dexPctMatch = trimmed.match(/^DEX\s*:?\s*\+(\d+)%/);
    if (dexPctMatch) stats['DEX %'] = parseInt(dexPctMatch[1], 10);
    const intPctMatch = trimmed.match(/^INT\s*:?\s*\+(\d+)%/);
    if (intPctMatch) stats['INT %'] = parseInt(intPctMatch[1], 10);
    const lukPctMatch = trimmed.match(/^LUK\s*:?\s*\+(\d+)%/);
    if (lukPctMatch) stats['LUK %'] = parseInt(lukPctMatch[1], 10);
    const hpPctMatch = trimmed.match(/^최대\s*HP\s*:?\s*\+(\d+)%/);
    if (hpPctMatch) stats['HP %'] = parseInt(hpPctMatch[1], 10);
    
    // Cooldown Reduction
    const coolDownMatch = trimmed.match(/스킬(?:\s*의)?\s*재사용\s*대기시간\s*:?\s*-(\d+)초/);
    if (coolDownMatch) stats.COOL_DOWN = parseInt(coolDownMatch[1], 10);

    // 8.5. 깡스탯 (STR, DEX, INT, LUK, HP, ALL)
    const strFlatMatch = trimmed.match(/^STR\s*:?\s*\+(\d+)$/);
    if (strFlatMatch) stats['STR'] = parseInt(strFlatMatch[1], 10);
    const dexFlatMatch = trimmed.match(/^DEX\s*:?\s*\+(\d+)$/);
    if (dexFlatMatch) stats['DEX'] = parseInt(dexFlatMatch[1], 10);
    const intFlatMatch = trimmed.match(/^INT\s*:?\s*\+(\d+)$/);
    if (intFlatMatch) stats['INT'] = parseInt(intFlatMatch[1], 10);
    const lukFlatMatch = trimmed.match(/^LUK\s*:?\s*\+(\d+)$/);
    if (lukFlatMatch) stats['LUK'] = parseInt(lukFlatMatch[1], 10);
    const hpFlatMatch = trimmed.match(/^최대\s*HP\s*:?\s*\+(\d+)$/);
    if (hpFlatMatch) stats['HP'] = parseInt(hpFlatMatch[1], 10);
    const allFlatMatch = trimmed.match(/^올스탯\s*:?\s*\+(\d+)$/);
    if (allFlatMatch) stats['ALL'] = parseInt(allFlatMatch[1], 10);

    // 8.6. 렙당 스탯
    const levelStrMatch = trimmed.match(/캐릭터\s*기준\s*\d+레벨\s*당\s*STR\s*:?\s*\+(\d+)/);
    if (levelStrMatch) stats.STR_PER_LEVEL = parseInt(levelStrMatch[1], 10);
    const levelDexMatch = trimmed.match(/캐릭터\s*기준\s*\d+레벨\s*당\s*DEX\s*:?\s*\+(\d+)/);
    if (levelDexMatch) stats.DEX_PER_LEVEL = parseInt(levelDexMatch[1], 10);
    const levelIntMatch = trimmed.match(/캐릭터\s*기준\s*\d+레벨\s*당\s*INT\s*:?\s*\+(\d+)/);
    if (levelIntMatch) stats.INT_PER_LEVEL = parseInt(levelIntMatch[1], 10);
    const levelLukMatch = trimmed.match(/캐릭터\s*기준\s*\d+레벨\s*당\s*LUK\s*:?\s*\+(\d+)/);
    if (levelLukMatch) stats.LUK_PER_LEVEL = parseInt(levelLukMatch[1], 10);

    // 9. 크리티컬 데미지
    const cdMatch = trimmed.match(/크리티컬\s*데미지\s*:?\s*\+(\d+)%/);
    if (cdMatch) stats.CRITICAL_DAMAGE = parseInt(cdMatch[1], 10);

    // 10. 재사용 대기시간 감소 (쿨뚝)
    const cdRedMatch = trimmed.match(/재사용\s*대기시간\s*감소\s*:?\s*-?(\d+)초/);
    if (cdRedMatch) stats.COOL_DOWN = parseInt(cdRedMatch[1], 10);

    // 11. 드롭 / 메획
    const dropMatch = trimmed.match(/아이템\s*드롭률\s*:?\s*\+(\d+)%/);
    if (dropMatch) stats.ITEM_DROP = parseInt(dropMatch[1], 10);

    const mesoMatch = trimmed.match(/메소\s*획득량\s*:?\s*\+(\d+)%/);
    if (mesoMatch) stats.MESO_OBTAIN = parseInt(mesoMatch[1], 10);

    // 12. 데미지 %
    const dmgMatch = trimmed.match(/^데미지\s*:?\s*\+(\d+)%/);
    if (dmgMatch) stats.DAMAGE = parseInt(dmgMatch[1], 10);

    return {
        rawName: name,
        stats,
        probability,
        isDecentSkill,
        isInvincibleAfterHit,
        isIgnoreDamageChance,
        isInvincibleChance
    };
}

// ─── 3줄 누적 스탯 합산 헬퍼 ──────────────────────────────────────────────────

export function combineStats(
    current: Partial<Record<StatType, number>>,
    addition: Partial<Record<StatType, number>>
): Partial<Record<StatType, number>> {
    const result = { ...current };

    for (const [key, val] of Object.entries(addition)) {
        const statKey = key as StatType;
        const numVal = val as number;

        if (statKey === 'IGNORE_DEFENSE') {
            const currentIed = (result.IGNORE_DEFENSE ?? 0) / 100;
            const newIed = numVal / 100;
            const combined = (currentIed + (1 - currentIed) * newIed) * 100;
            result.IGNORE_DEFENSE = combined;
        } else if (statKey === 'ALL %') {
            result['ALL %'] = (result['ALL %'] ?? 0) + numVal;
        } else {
            result[statKey] = (result[statKey] ?? 0) + numVal;
        }
    }

    return result;
}

// ─── 목표 조건 달성 여부 검증 ─────────────────────────────────────────────────

export function satisfiesCondition(
    accumulated: Partial<Record<StatType, number>>,
    target: TargetOptionSet
): boolean {
    const allPct = accumulated['ALL %'] ?? 0;
    const allFlat = accumulated['ALL'] ?? 0;

    for (const [key, targetVal] of Object.entries(target)) {
        const statKey = key as StatType;
        const targetNumber = targetVal as number;

        let curVal = accumulated[statKey] ?? 0;

        if (['STR %', 'DEX %', 'INT %', 'LUK %'].includes(statKey)) {
            curVal += allPct;
        }

        if (['STR', 'DEX', 'INT', 'LUK'].includes(statKey)) {
            curVal += allFlat;
        }

        if (curVal < targetNumber) {
            return false;
        }
    }

    return true;
}

// ─── 3줄 확률 조합 연산 엔진 ──────────────────────────────────────────────────

const LOWER_GRADE_MAP: Record<string, string> = {
    LEGENDARY: 'UNIQUE',
    UNIQUE: 'EPIC',
    EPIC: 'RARE',
    RARE: 'NORMAL'
};

export function calculateExactPotentialExpectation(
    equip: string,
    grade: 'LEGENDARY' | 'UNIQUE' | 'EPIC' | 'RARE',
    level: number,
    targetSets: TargetOptionSet[],
    method: 'POTENTIAL' | 'ADDI_POTENTIAL' = 'POTENTIAL'
): { probability: number; expectedAttempts: number; costOnce: number; totalCostMeso: number } {
    const db = loadPotentialTableDB();
    const normEquip = equip.replace(/\s+/g, '') === '기계심장' ? '기계심장' : equip;
    if (!db || !db[method] || !db[method][normEquip]) {
        return { probability: 0.005, expectedAttempts: 200, costOnce: 45_000_000, totalCostMeso: 9_000_000_000 };
    }

    let matchedLevel = 200;
    if (level >= 250) matchedLevel = 250;
    else if (level >= 200) matchedLevel = 200;
    else if (level >= 160) matchedLevel = 160;
    else matchedLevel = 150;

    let equipData = db[method][normEquip][matchedLevel];
    
    // 만약 데이터가 없거나 비어있다면, 악세서리 250제의 경우 펜던트 250제 데이터를 빌려옴
    if ((!equipData || !equipData[grade] || !equipData[grade][grade] || equipData[grade][grade].length === 0) && matchedLevel === 250) {
        if (['얼굴장식', '눈장식', '귀고리', '벨트', '반지', '어깨장식'].includes(normEquip)) {
            equipData = db[method]['펜던트'][250];
        }
    }

    // 그래도 없으면 하위 레벨로 폴백 (기계심장 등 150제 테이블까지 탐색)
    if (!equipData || !equipData[grade] || !equipData[grade][grade] || equipData[grade][grade].length === 0) {
        equipData = db[method][normEquip][200] || db[method][normEquip][160] || db[method][normEquip][150];
    }

    if (!equipData || !equipData[grade]) {
        return { probability: 0.005, expectedAttempts: 200, costOnce: 45_000_000, totalCostMeso: 9_000_000_000 };
    }

    const currentGradeTableRaw: RawOptionEntry[] = equipData[grade][grade] || [];
    const lowerGrade = LOWER_GRADE_MAP[grade];
    const lowerGradeTableRaw: RawOptionEntry[] = lowerGrade ? (equipData[grade][lowerGrade] || []) : [];

    const currentPool: ParsedOption[] = currentGradeTableRaw.map(e => parseOptionString(e.name, e.probability));
    const lowerPool: ParsedOption[] = lowerGradeTableRaw.map(e => parseOptionString(e.name, e.probability));

    // mesu.live 공식 줄별 등급 가중치 (potential.getOptionGrade API 기준)
    // 일반 잠재: 2줄=20%/80%, 3줄=5%/95% (전 등급 동일)
    // 에디셔널: 등급별로 현재등급 가중치가 다름
    let l2cur = 0.20, l2low = 0.80, l3cur = 0.05, l3low = 0.95;
    if (method === 'ADDI_POTENTIAL') {
        if (grade === 'LEGENDARY') { l2cur = 0.004975; l2low = 0.995025; l3cur = 0.004975; l3low = 0.995025; }
        else if (grade === 'UNIQUE') { l2cur = 0.019608; l2low = 0.980392; l3cur = 0.019608; l3low = 0.980392; }
        else { l2cur = 0.047619; l2low = 0.952381; l3cur = 0.047619; l3low = 0.952381; } // EPIC
    }

    const line1Pool: ParsedOption[] = currentPool.map(o => ({ ...o, probability: o.probability * 1.0 }));

    const line2Pool: ParsedOption[] = [
        ...currentPool.map(o => ({ ...o, probability: o.probability * l2cur })),
        ...lowerPool.map(o => ({ ...o, probability: o.probability * l2low }))
    ];

    const line3Pool: ParsedOption[] = [
        ...currentPool.map(o => ({ ...o, probability: o.probability * l3cur })),
        ...lowerPool.map(o => ({ ...o, probability: o.probability * l3low }))
    ];

    let totalProb = 0;

    for (const opt1 of line1Pool) {
        const stats1 = opt1.stats;

        if (targetSets.some(target => satisfiesCondition(stats1, target))) {
            totalProb += opt1.probability;
            continue;
        }

        let filteredLine2 = line2Pool;
        let removedP2 = 0;
        if (opt1.isDecentSkill || opt1.isInvincibleAfterHit) {
            filteredLine2 = line2Pool.filter(o => !(o.isDecentSkill || o.isInvincibleAfterHit));
            removedP2 = line2Pool.filter(o => o.isDecentSkill || o.isInvincibleAfterHit).reduce((sum, o) => sum + o.probability, 0);
        }
        const normFactor2 = removedP2 > 0 && removedP2 < 1 ? 1 / (1 - removedP2) : 1;

        for (const opt2 of filteredLine2) {
            const p2 = opt2.probability * normFactor2;
            const stats2 = combineStats(stats1, opt2.stats);

            if (targetSets.some(target => satisfiesCondition(stats2, target))) {
                totalProb += opt1.probability * p2;
                continue;
            }

            const hasDecent = opt1.isDecentSkill || opt2.isDecentSkill;
            const hasInvinAfter = opt1.isInvincibleAfterHit || opt2.isInvincibleAfterHit;
            let filteredLine3 = line3Pool;
            let removedP3 = 0;

            if (hasDecent || hasInvinAfter) {
                filteredLine3 = line3Pool.filter(o => !(hasDecent && o.isDecentSkill) && !(hasInvinAfter && o.isInvincibleAfterHit));
                removedP3 = line3Pool.filter(o => (hasDecent && o.isDecentSkill) || (hasInvinAfter && o.isInvincibleAfterHit)).reduce((sum, o) => sum + o.probability, 0);
            }
            const normFactor3 = removedP3 > 0 && removedP3 < 1 ? 1 / (1 - removedP3) : 1;

            for (const opt3 of filteredLine3) {
                const p3 = opt3.probability * normFactor3;
                const stats3 = combineStats(stats2, opt3.stats);

                if (targetSets.some(target => satisfiesCondition(stats3, target))) {
                    totalProb += opt1.probability * p2 * p3;
                }
            }
        }
    }

    const exactAttempts = totalProb > 0 ? (1 / totalProb) : 0;
    const roundedAttempts = Math.round(exactAttempts * 100) / 100; // mesu.live는 소수점 둘째자리까지 반올림함
    const expectedAttempts = Math.round(exactAttempts);
    const gradeKor = grade === 'LEGENDARY' ? '레전드리' : grade === 'UNIQUE' ? '유니크' : grade === 'EPIC' ? '에픽' : '레어';
    
    const costOnce = method === 'POTENTIAL'
        ? getPotentialResetCost(matchedLevel, gradeKor)
        : getAdditionalPotentialResetCost(matchedLevel, gradeKor);

    const totalCostMeso = Math.round(roundedAttempts * costOnce);

    return {
        probability: totalProb,
        expectedAttempts,
        costOnce,
        totalCostMeso
    };
}

export function formatMeso(meso: number): string {
    if (!meso || meso <= 0) return '0 메소';
    
    const gyeong = Math.floor(meso / 10000000000000000);
    const jo = Math.floor((meso % 10000000000000000) / 1000000000000);
    const eok = Math.floor((meso % 1000000000000) / 100000000);
    const man = Math.floor((meso % 100000000) / 10000);
    const won = Math.floor(meso % 10000);

    const parts: string[] = [];
    if (gyeong > 0) parts.push(`${gyeong.toLocaleString()}경`);
    if (jo > 0) parts.push(`${jo.toLocaleString()}조`);
    if (eok > 0) parts.push(`${eok.toLocaleString()}억`);
    if (man > 0 && gyeong === 0) parts.push(`${man.toLocaleString()}만`);
    if (won > 0 && gyeong === 0 && jo === 0 && eok === 0 && man === 0) parts.push(`${won.toLocaleString()}`);

    return parts.length > 0 ? `${parts.join(' ')} 메소` : `${meso.toLocaleString()} 메소`;
}

export type WSETier = '3줄극종결' | '3줄유효' | '2줄유효';

export function getWSEPotentialExpectation(
    slot: '무기' | '엠블렘' | '보조무기',
    level: number,
    targetTier: WSETier,
    isMagicJob: boolean = false
): PotentialCalculationResult {
    const equipName = slot === '무기' ? '무기' : slot === '엠블렘' ? '엠블렘' : '보조무기(포스실드, 소울링 제외)';
    const attKey: StatType = isMagicJob ? 'MAGIC_ATTACK %' : 'ATTACK %';

    let targetSets: TargetOptionSet[] = [];

    if (slot === '엠블렘') {
        if (targetTier === '3줄극종결') {
            targetSets = [
                { [attKey]: 30 },
                { [attKey]: 21, IGNORE_DEFENSE: 40 },
            ];
        } else if (targetTier === '3줄유효') {
            targetSets = [
                { [attKey]: 21 },
                { [attKey]: 12, IGNORE_DEFENSE: 40 },
                { [attKey]: 12, IGNORE_DEFENSE: 35 },
            ];
        } else {
            targetSets = [
                { [attKey]: 12 },
                { IGNORE_DEFENSE: 35 }
            ];
        }
    } else {
        if (targetTier === '3줄극종결') {
            targetSets = [
                { BOSS_DAMAGE: 70, [attKey]: 9 },
                { BOSS_DAMAGE: 35, [attKey]: 21 },
                { [attKey]: 30 },
                { BOSS_DAMAGE: 35, [attKey]: 12, IGNORE_DEFENSE: 35 },
            ];
        } else if (targetTier === '3줄유효') {
            targetSets = [
                { BOSS_DAMAGE: 70 },
                { BOSS_DAMAGE: 35, [attKey]: 9 },
                { [attKey]: 21 },
                { BOSS_DAMAGE: 35, IGNORE_DEFENSE: 35 },
                { [attKey]: 12, IGNORE_DEFENSE: 35 },
            ];
        } else {
            targetSets = [
                { BOSS_DAMAGE: 35 },
                { [attKey]: 12 },
            ];
        }
    }

    const { probability, expectedAttempts, costOnce, totalCostMeso } = calculateExactPotentialExpectation(
        equipName,
        'LEGENDARY',
        level,
        targetSets,
        'POTENTIAL'
    );

    return {
        probability,
        probabilityPercent: `${(probability * 100).toFixed(4)}%`,
        expectedAttempts,
        expectedCostMeso: totalCostMeso,
        formattedExpectedCost: formatMeso(totalCostMeso),
        costPerAttempt: costOnce,
        totalCostMeso,
        formattedTotalCost: formatMeso(totalCostMeso)
    };
}

export function getArmorPotentialExpectation(
    slot: string,
    level: number,
    targetStat: 'STR' | 'DEX' | 'INT' | 'LUK' | 'HP',
    targetPercent: 21 | 27 | 30 | 33,
    startGrade: '에픽' | '유니크' | '레전드리' = '유니크'
): PotentialCalculationResult {
    let equipCategory = '상의';
    if (slot.includes('모자')) equipCategory = '모자';
    else if (slot.includes('장갑')) equipCategory = '장갑';
    else if (slot.includes('신발')) equipCategory = '신발';
    else if (slot.includes('망토')) equipCategory = '망토';
    else if (slot.includes('벨트')) equipCategory = '벨트';
    else if (slot.includes('어깨') || slot.includes('견장')) equipCategory = '어깨장식';
    else if (slot.includes('얼굴') || slot.includes('얼장')) equipCategory = '얼굴장식';
    else if (slot.includes('눈') || slot.includes('눈장')) equipCategory = '눈장식';
    else if (slot.includes('귀고리') || slot.includes('이어링')) equipCategory = '귀고리';
    else if (slot.includes('반지') || slot.includes('링')) equipCategory = '반지';
    else if (slot.includes('펜던트')) equipCategory = '펜던트';
    else if (slot.includes('하트') || slot.includes('심장')) equipCategory = '기계심장';

    const statKey: StatType = `${targetStat} %` as StatType;
    const targetSets: TargetOptionSet[] = [{ [statKey]: targetPercent }];

    const { probability, expectedAttempts, costOnce, totalCostMeso } = calculateExactPotentialExpectation(
        equipCategory,
        'LEGENDARY',
        level,
        targetSets,
        'POTENTIAL'
    );

    let upgradeCostMeso = 0;
    if (startGrade === '에픽') {
        const epicResetCost = getPotentialResetCost(level, '에픽');
        const avgEpicToUniq = 1 / (getPotentialUpgradeRate('에픽', '유니크') / 100);
        const uniqResetCost = getPotentialResetCost(level, '유니크');
        const avgUniqToLeg = 1 / (getPotentialUpgradeRate('유니크', '레전드리') / 100);
        upgradeCostMeso = Math.round(avgEpicToUniq * epicResetCost + avgUniqToLeg * uniqResetCost);
    } else if (startGrade === '유니크') {
        const uniqResetCost = getPotentialResetCost(level, '유니크');
        const avgUniqToLeg = 1 / (getPotentialUpgradeRate('유니크', '레전드리') / 100);
        upgradeCostMeso = Math.round(avgUniqToLeg * uniqResetCost);
    }

    const finalTotalCost = upgradeCostMeso + totalCostMeso;

    return {
        probability,
        probabilityPercent: `${(probability * 100).toFixed(4)}%`,
        expectedAttempts,
        expectedCostMeso: totalCostMeso,
        formattedExpectedCost: formatMeso(totalCostMeso),
        costPerAttempt: costOnce,
        upgradeCostMeso,
        totalCostMeso: finalTotalCost,
        formattedTotalCost: formatMeso(finalTotalCost)
    };
}
