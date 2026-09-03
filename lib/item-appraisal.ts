import { calculateExactPotentialExpectation, parseOptionString, combineStats, TargetOptionSet } from './potential-calculator';
import { calculateCumulativeExpectedCostDetailed } from './starforce_db';
import { getLatestPrice, getLatestPriceDate } from './parsePriceData';
import { getSpecialItemConfig } from './config/special_items';
import { NO_STARFORCE_SLOTS } from './config/unified_criteria';
import { isAmazingEnhancementItem } from './amazing_enhancement_table';

export interface AppraisalOptions {
    isMiracleTime?: boolean;   // 미라클 타임: 잠재/에디 등급업 확률 2배
    isShining?: boolean;       // 샤이닝 스타포스 타임: 강화비 30% 할인, 파괴 30% 감소, 복구비 20% 할인
}

export interface AppraisalResult {
    starforceCost: number;
    potentialCost: number;
    additionalCost: number;
    baseItemCost: number;
    totalCost: number;
    isCalculable: boolean;
    priceDate?: string;
    errorMessage?: string;
    appliedEvents?: { isMiracleTime: boolean; isShining: boolean; };
    savings?: { 
        starforceSavings: number; 
        tierUpSavings: number; 
        potentialTierUpSavings?: number;
        additionalTierUpSavings?: number;
    };
    details: {
        starforce: {
            success: boolean;
            cost: number;
            reason?: string;
            expectedSpares?: number;
            pureEnhancementCost?: number;
            savings?: number;
        };
        potential: {
            success: boolean;
            cost: number;
            reason?: string;
            tierUpCost?: number;
            optionCost?: number;
            expectedTries?: number;
            targetOptionStr?: string;
            tierUpSavings?: number;
            escapeCappingApplied?: boolean;      // 이탈 감지로 상위 등급 캡 적용 여부
            rawCostBeforeCap?: number;           // 캡 적용 전 원래 기댓값
            escapeCappingGrade?: string;         // 캡핑 적용된 기준 등급 (예: '유니크', '레전드리')
        };
        additional: {
            success: boolean;
            cost: number;
            reason?: string;
            tierUpCost?: number;
            optionCost?: number;
            expectedTries?: number;
            targetOptionStr?: string;
            tierUpSavings?: number;
            escapeCappingApplied?: boolean;      // 이탈 감지로 상위 등급 캡 적용 여부
            rawCostBeforeCap?: number;           // 캡 적용 전 원래 기댓값
            escapeCappingGrade?: string;         // 캡핑 적용된 기준 등급
        };
        basePrice: {
            success: boolean;
            cost: number;
            reason?: string;
            isOverridden?: boolean;
            base4LevelCost?: number;
            level5Cost?: number;
            level6Cost?: number;
            lifeStonePrice?: number;
            faithStonePrice?: number;
        };
        isZeroSecondary?: boolean;
        isAstra?: boolean;
    };
}

// 넥슨 API의 장비 분류를 잠재능력 계산기(mesu)용 분류로 매핑
function mapEquipmentSlotToEquipType(slot: string, name: string): string {
    if (slot === '엠블렘' || slot === 'Emblem' || name.includes('엠블렘')) return '엠블렘';
    
    // 보조무기 분류
    if (slot === '보조무기' || slot === 'Sub Weapon' || slot === 'SubWeapon' || slot.includes('보조무기') || name.includes('보조무기')) {
        if (name.includes('포스실드') || name.includes('소울링')) {
            return '보조무기(포스실드, 소울링)';
        }
        return '보조무기(포스실드, 소울링 제외)';
    }

    if (slot === '무기' || slot === 'Weapon') return '무기';
    
    // 방어구
    if (slot === '모자' || slot.includes('모자')) return '모자';
    if (slot === '상의' || slot.includes('상의')) return '상의';
    if (slot === '하의' || slot.includes('하의')) return '하의';
    if (slot === '한벌옷' || slot.includes('한벌옷')) return '상의'; // 한벌옷은 상의와 잠재능력 동일
    if (slot === '신발' || slot.includes('신발')) return '신발';
    if (slot === '장갑' || slot.includes('장갑')) return '장갑';
    if (slot === '망토' || slot.includes('망토')) return '망토';
    
    // 장신구
    if (slot === '어깨장식' || slot.includes('어깨장식')) return '어깨장식';
    if (slot === '얼굴장식' || slot.includes('얼굴장식')) return '얼굴장식';
    if (slot === '눈장식' || slot.includes('눈장식')) return '눈장식';
    if (slot === '귀고리' || slot.includes('귀고리')) return '귀고리';
    if (slot === '반지' || slot.includes('반지')) return '반지';
    if (slot === '펜던트' || slot.includes('펜던트')) return '펜던트';
    if (slot === '벨트' || slot.includes('벨트')) return '벨트';
    if (slot === '기계 심장' || slot.includes('심장')) return '기계 심장';
    
    // Fallback for sub-weapons that might not have explicitly matching slot names
    const subWeaponKeywords = ['카타라', '방패', '마도서', '여우구슬', '단검용 검집', '부적', '로잘리오', '쇠사슬', '마법화살', '소울링', '매그넘', '손목보호대', '조준기', '쥬얼', '그립', '화약통', '무게추', '문서', '매직윙', '수정구', '오브', '카드', '호루라기', '노리개', '선추'];
    if (subWeaponKeywords.some(kw => name.includes(kw))) {
        if (name.includes('포스실드') || name.includes('소울링')) {
            return '보조무기(포스실드, 소울링)';
        }
        return '보조무기(포스실드, 소울링 제외)';
    }
    
    return '무기'; // Default fallback
}

import { getValidStatTypesForClass, getMainStatTypesForClass } from './class_utils';
import type { StatType } from './potential-calculator';

// ─── 1단계 등급업 비용 산출 (에픽->유니크, 유니크->레전드리) ─────────────────────
// 레어부터 누적 계산하지 않고 현재 등급에서 바로 위 등급으로 가는 비용만 계산
export function getSingleStepTierUpCost(
    level: number,
    fromGrade: 'EPIC' | 'UNIQUE',
    toGrade: 'UNIQUE' | 'LEGENDARY',
    isAddi: boolean,
    isMiracleTime: boolean = false
): number {
    let cost = 0;
    if (fromGrade === 'EPIC' && toGrade === 'UNIQUE') {
        if (!isAddi) {
            const prob = getPotentialUpgradeRate('에픽', '유니크', 'MESO_RESET', isMiracleTime) / 100;
            const resetCost = getPotentialResetCost(level, '에픽');
            const ceiling = getPotentialGuaranteeCount('에픽', '유니크', 'MESO_RESET');
            cost = (1 / prob) > ceiling ? ceiling * resetCost : (1 / prob) * resetCost;
        } else {
            const prob = getAdditionalPotentialUpgradeRate('에픽', '유니크', undefined, isMiracleTime) / 100;
            const resetCost = getAdditionalPotentialResetCost(level, '에픽');
            cost = (1 / prob) * resetCost;
        }
    } else if (fromGrade === 'UNIQUE' && toGrade === 'LEGENDARY') {
        if (!isAddi) {
            const prob = getPotentialUpgradeRate('유니크', '레전드리', 'MESO_RESET', isMiracleTime) / 100;
            const resetCost = getPotentialResetCost(level, '유니크');
            const ceiling = getPotentialGuaranteeCount('유니크', '레전드리', 'MESO_RESET');
            cost = (1 / prob) > ceiling ? ceiling * resetCost : (1 / prob) * resetCost;
        } else {
            const prob = getAdditionalPotentialUpgradeRate('유니크', '레전드리', undefined, isMiracleTime) / 100;
            const resetCost = getAdditionalPotentialResetCost(level, '유니크');
            cost = (1 / prob) * resetCost;
        }
    }
    return cost;
}

export interface EscapeDetectionParams {
    lines: string[];
    grade: 'EPIC' | 'UNIQUE';
    isAddi: boolean;
    level: number;
    isWSE: boolean;
    expectedAttempts: number;
}

// ─── 이탈 옵션 감지 (잠재/에디, 250제/일반, 부위별 전수 정밀 매핑) ──────────────
// 1. 단일 라인 이탈 (해당 등급 1줄 정상 최대치 초과)
// 2. 다중 이탈/올이탈 (하위줄에 본옵이 2개 이상 중첩되어 합산 수치가 정상 범위를 초과)
// 3. 기댓값 횟수 과다 (에픽 10만회, 유니크 5만회 초과 시 비현실적 경로)
export function detectPotentialLineEscape(params: EscapeDetectionParams): { hasEscape: boolean; reason?: string } {
    const { lines, grade, isAddi, level, isWSE, expectedAttempts } = params;
    const isLevel250Plus = level >= 250;

    // 1. 비현실적 기댓값 횟수 체크 (안전망)
    const ATTEMPTS_LIMIT = grade === 'EPIC' ? 100_000 : 50_000;
    if (expectedAttempts > ATTEMPTS_LIMIT) {
        return { hasEscape: true, reason: `기댓값 과다(${expectedAttempts.toLocaleString()}회)` };
    }

    // 2. 등급/레벨/잠재구분/부위별 정상 최대치 기준표 설정
    let maxSingleStatPct = 6;
    let maxSingleAttPct = 6;
    let maxSingleAllPct = 4;
    let maxSinglePerLevel = 1;

    let maxStatSum = 12;
    let maxAttSum = 12;
    let maxPerLevelSum = 1;

    // 방어구/장신구 깡공격력/깡마력 기준표 (에디셔널 전용)
    let maxSingleFlatAtt = isWSE ? 999 : (isLevel250Plus ? 12 : 11);
    let maxFlatAttSum = isWSE ? 999 : (isLevel250Plus ? 17 : 14); // 15 이상(예: 공10+공10=20)이면 다중 중첩

    if (!isAddi) {
        // [일반 잠재능력 (윗잠)]
        if (!isLevel250Plus) {
            // 200제 이하: 에픽 본옵 6%/하위 3%, 유니크 본옵 9%/하위 6%
            if (grade === 'EPIC') {
                maxSingleStatPct = 6;
                maxSingleAttPct = 6;
                maxSingleAllPct = 4;
                maxStatSum = 12;
                maxAttSum = isWSE ? 6 : 12; // WSE는 공 7% 이상(6+3=9%, 6+3+3=12%) 감지 시 유니크/레전드리 캡 탐색
            } else if (grade === 'UNIQUE') {
                maxSingleStatPct = 9;
                maxSingleAttPct = 9;
                maxSingleAllPct = 6;
                maxStatSum = 15; // 윗잠 유니크 2줄 정옵(9+6=15%), 16% 이상(9+6+6=21% 3줄 종결) 감지 시 레전드리 캡 탐색
                maxAttSum = isWSE ? 15 : 21; // WSE는 공 16% 이상(9+6+6=21% 3줄 종결) 감지 시 레전드리 캡 탐색
            }
        } else {
            // 250제 이상 (에테르넬 등): 에픽 본옵 7%/하위 4%, 유니크 본옵 10%/하위 7%
            if (grade === 'EPIC') {
                maxSingleStatPct = 7;
                maxSingleAttPct = 7;
                maxSingleAllPct = 5;
                maxStatSum = 15;
                maxAttSum = isWSE ? 7 : 15; // WSE 250제: 공 8% 이상(7+4=11%) 감지 시 캡 탐색
            } else if (grade === 'UNIQUE') {
                maxSingleStatPct = 10;
                maxSingleAttPct = 10;
                maxSingleAllPct = 7;
                maxStatSum = 17; // 윗잠 유니크 250제 2줄 정옵(10+7=17%), 18% 이상 감지 시 레전드리 캡 탐색
                maxAttSum = isWSE ? 17 : 24; // WSE 250제: 공 18% 이상(10+7+7=24% 3줄 종결) 감지 시 레전드리 캡 탐색
            }
        }
    } else {
        // [에디셔널 잠재능력 (아랫잠)]
        if (!isLevel250Plus) {
            // 200제 이하: 방어구 본옵 4%/하위 2%, 무기 공% 본옵 6%/하위 3%
            if (grade === 'EPIC') {
                maxSingleStatPct = isWSE ? 6 : 4;
                maxSingleAttPct = isWSE ? 6 : 4;
                maxSingleAllPct = 3;
                maxStatSum = isWSE ? 12 : 6;
                maxAttSum = isWSE ? 6 : 6; // WSE 에디: 공 7% 이상(6+3=9%, 6+3+3=12%) 감지 시 유니크 캡 탐색
                maxSinglePerLevel = 0;
                maxPerLevelSum = 0;
                maxSingleFlatAtt = isWSE ? 999 : 11;
                maxFlatAttSum = isWSE ? 999 : 14;
            } else if (grade === 'UNIQUE') {
                maxSingleStatPct = isWSE ? 9 : 6;
                maxSingleAttPct = isWSE ? 9 : 6;
                maxSingleAllPct = 4;
                maxStatSum = isWSE ? 21 : 10; // 방어구 에디 2줄 정옵(6+4=10%), 11% 이상(6+4+4=14% 3줄 종결) 감지 시 레전드리 8/6 캡 탐색
                maxAttSum = isWSE ? 15 : 14; // WSE 에디: 공 16% 이상(9+6+6=21% 3줄 종결) 감지 시 레전드리 캡 탐색
                maxSinglePerLevel = 1;
                maxPerLevelSum = 1;
                maxSingleFlatAtt = isWSE ? 999 : 14;
                maxFlatAttSum = isWSE ? 999 : 21;
            }
        } else {
            // 250제 이상 (에테르넬 등): 방어구 본옵 5%/하위 3%, 무기 공% 본옵 7%/하위 4%
            if (grade === 'EPIC') {
                maxSingleStatPct = isWSE ? 7 : 5;
                maxSingleAttPct = isWSE ? 7 : 5;
                maxSingleAllPct = 4;
                maxStatSum = isWSE ? 15 : 8;
                maxAttSum = isWSE ? 7 : 8; // WSE 에디 250제: 공 8% 이상 감지 시 캡 탐색
                maxSinglePerLevel = 0;
                maxPerLevelSum = 0;
                maxSingleFlatAtt = isWSE ? 999 : 12;
                maxFlatAttSum = isWSE ? 999 : 17;
            } else if (grade === 'UNIQUE') {
                maxSingleStatPct = isWSE ? 10 : 7;
                maxSingleAttPct = isWSE ? 10 : 7;
                maxSingleAllPct = 5;
                maxStatSum = isWSE ? 24 : 12; // 방어구 에디 250제 2줄 정옵(7+5=12%), 13% 이상(7+5+5=17% 3줄 종결) 감지 시 레전드리 캡 탐색
                maxAttSum = isWSE ? 17 : 17; // WSE 에디 250제: 공 18% 이상 감지 시 레전드리 캡 탐색
                maxSinglePerLevel = 1;
                maxPerLevelSum = 1;
                maxSingleFlatAtt = isWSE ? 999 : 15;
                maxFlatAttSum = isWSE ? 999 : 24;
            }
        }
    }

    // 3. 라인별 검사 및 합산 수치 계산
    let statSum = 0;
    let attSum = 0;
    let perLevelSum = 0;
    let flatAttSum = 0;

    for (const line of lines) {
        if (!line) continue;
        const parsed = parseOptionString(line, 1);
        const s = parsed.stats;

        // 3-1. 1줄 단일 이탈 검사
        const statKeys: (keyof typeof s)[] = ['STR %', 'DEX %', 'INT %', 'LUK %', 'HP %'];
        for (const k of statKeys) {
            const val = s[k] ?? 0;
            if (val > maxSingleStatPct) return { hasEscape: true, reason: `스탯% 이탈(${val}% > ${maxSingleStatPct}%)` };
            statSum += val;
        }

        const attKeys: (keyof typeof s)[] = ['ATTACK %', 'MAGIC_ATTACK %'];
        for (const k of attKeys) {
            const val = s[k] ?? 0;
            if (val > maxSingleAttPct) return { hasEscape: true, reason: `공/마% 이탈(${val}% > ${maxSingleAttPct}%)` };
            attSum += val;
        }

        const allVal = s['ALL %'] ?? 0;
        if (allVal > maxSingleAllPct) return { hasEscape: true, reason: `올스탯% 이탈(${allVal}% > ${maxSingleAllPct}%)` };
        statSum += allVal;

        const perLevelKeys: (keyof typeof s)[] = ['STR_PER_LEVEL', 'DEX_PER_LEVEL', 'INT_PER_LEVEL', 'LUK_PER_LEVEL'];
        for (const k of perLevelKeys) {
            const val = s[k] ?? 0;
            if (val > maxSinglePerLevel) return { hasEscape: true, reason: `렙당스탯 이탈(+${val} > +${maxSinglePerLevel})` };
            perLevelSum += val;
        }

        // 방어구 깡공격력/깡마력 라인 검사
        if (!isWSE) {
            const fAtt = (s['ATTACK'] ?? 0) + (s['MAGIC_ATTACK'] ?? 0);
            if (fAtt > maxSingleFlatAtt) {
                return { hasEscape: true, reason: `깡공/마 단일 이탈(+${fAtt} > +${maxSingleFlatAtt})` };
            }
            flatAttSum += fAtt;
        }
    }

    // 3-2. 합산 수치 이탈 검사 (다중 이탈 / 올이탈)
    if (statSum > maxStatSum) {
        return { hasEscape: true, reason: `스탯 합산(${statSum}% > ${maxStatSum}%) 올이탈` };
    }
    if (attSum > maxAttSum) {
        return { hasEscape: true, reason: `공/마 합산(${attSum}% > ${maxAttSum}%) 올이탈` };
    }
    if (perLevelSum > maxPerLevelSum) {
        return { hasEscape: true, reason: `렙당 합산(+${perLevelSum} > +${maxPerLevelSum}) 이탈` };
    }

    // 방어구/장신구 깡공/깡마 다중 중첩 검사 (예: 공10+공10=20)
    if (!isWSE && flatAttSum > maxFlatAttSum) {
        return { hasEscape: true, reason: `깡공/마 다중 중첩(+${flatAttSum} > +${maxFlatAttSum})` };
    }

    // 방어구/장신구 깡공+스탯% 복합 다중 중첩 검사 (예: 올탯2%+공10+공10, 4%+공10+공10)
    if (!isWSE && isAddi && grade === 'EPIC' && flatAttSum >= 15 && statSum >= 2) {
        return { hasEscape: true, reason: `공격력/스탯 복합 다중 중첩(+${flatAttSum}, +${statSum}%)` };
    }

    // 방어구/장신구 에디셔널 유니크 깡공+스탯% 복합 다중 중첩 검사 (예: 공14 + STR 4% + STR 4% = 환산 13.6% > 10%)
    if (!isWSE && isAddi && grade === 'UNIQUE') {
        const totalEqPct = (flatAttSum * 0.4) + statSum;
        const maxEqPct = isLevel250Plus ? 12 : 10;
        if (totalEqPct > maxEqPct && flatAttSum > 0 && statSum > 0) {
            return { hasEscape: true, reason: `공격력/스탯 복합 다중 중첩(환산 ${totalEqPct.toFixed(1)}% > ${maxEqPct}%)` };
        }
    }

    // 방어구/장신구 에디셔널 에픽 쌍본옵 이탈 검사 (예: 공11 + STR 4%, 공11 + 공11, 4% + 4%)
    // 200제 이하: 공 11 이상, 스탯 4% 이상 / 250제: 공 12 이상, 스탯 5% 이상
    if (!isWSE && isAddi && grade === 'EPIC') {
        const minPrimeFlatAtt = isLevel250Plus ? 12 : 11;
        const minPrimeStatPct = isLevel250Plus ? 5 : 4;
        
        let primeLineCount = 0;
        for (const line of lines) {
            if (!line) continue;
            const parsed = parseOptionString(line, 1);
            const fAtt = (parsed.stats.ATTACK || 0) + (parsed.stats.MAGIC_ATTACK || 0);
            const sPct = (parsed.stats['STR %'] || 0) + (parsed.stats['DEX %'] || 0) + 
                         (parsed.stats['INT %'] || 0) + (parsed.stats['LUK %'] || 0) + 
                         (parsed.stats['HP %'] || 0) + (parsed.stats['ALL %'] || 0);
            
            if (fAtt >= minPrimeFlatAtt || sPct >= minPrimeStatPct) {
                primeLineCount++;
            }
        }

        if (primeLineCount >= 2) {
            return { hasEscape: true, reason: '에디 에픽 쌍본옵 이탈 (공11+스탯4% 등)' };
        }
    }

    // 무기/보조무기/엠블렘(WSE) 에픽 깡공/깡마 다중 중첩 검사 (예: 공6%+공12+공12)
    // 깡공 2줄 이상 중첩 시 유니크 공% 1줄급으로 캡핑 적용
    if (isWSE && grade === 'EPIC') {
        const flatAttCount = lines.filter(l => l && (l.includes('공격력 : +') || l.includes('마력 : +')) && !l.includes('%')).length;
        if (flatAttCount >= 2) {
            return { hasEscape: true, reason: '무보엠 깡공 다중 중첩 (유니크 공% 치환)' };
        }
    }

    // 에픽 기댓값 시도 횟수 안전망 (15,000회 초과 시 현실적 캡 필요)
    if (grade === 'EPIC' && expectedAttempts > 15_000) {
        return { hasEscape: true, reason: `에픽 기댓값 과다(${expectedAttempts.toLocaleString()}회)` };
    }

    return { hasEscape: false };
}

// ─── 방어구/장신구 스펙 동치 치환 함수 (상위 등급 탐색용) ────────────────────────
// 공/마 10당 주스탯 4% (0.4배), 올탯% 1:1, 깡스탯 10당 1% (0.1배)로 환산 주스탯% 산출
export function convertToEquivalentMainStatTarget(
    target: TargetOptionSet,
    characterClass: string,
    isWSE: boolean
): TargetOptionSet {
    if (isWSE) return target;

    // 제논인 경우
    if (characterClass === '제논') {
        let totalAllPct = target['ALL %'] || 0;
        const totalAtt = (target['ATTACK'] || 0) + (target['MAGIC_ATTACK'] || 0);
        totalAllPct += totalAtt * 0.2; // 제논 깡공 10 = 올스탯 약 2%
        return { 'ALL %': Math.max(1, Math.round(totalAllPct)) };
    }

    const mainStats = getMainStatTypesForClass(characterClass);
    const primaryPct = mainStats.pct[0] || 'STR %';
    const primaryFlat = mainStats.flat[0] || 'STR';

    let totalEquivalentPct = 0;

    // 1. 기존 주스탯 % 및 ALL %
    for (const [key, val] of Object.entries(target)) {
        if (!val || typeof val !== 'number') continue;

        if (key === primaryPct || key === 'ALL %') {
            totalEquivalentPct += val;
        } else if (['STR %', 'DEX %', 'INT %', 'LUK %', 'HP %'].includes(key)) {
            if (mainStats.pct.includes(key as any)) {
                totalEquivalentPct += val * 0.2; // 부스탯 0.2배
            }
        }
    }

    // 2. 깡공격력 / 깡마력 (공/마 10당 주스탯 4% -> 0.4배)
    const isMagic = characterClass.includes('아크메이지') || characterClass.includes('비숍') || 
                    characterClass.includes('루미너스') || characterClass.includes('배틀메이지') || 
                    characterClass.includes('플레임위자드') || characterClass.includes('에반') || 
                    characterClass.includes('키네시스') || characterClass.includes('일리움') || 
                    characterClass.includes('라라') || characterClass.includes('레테') || characterClass.includes('린');
    
    const attVal = target['ATTACK'] || 0;
    const magVal = target['MAGIC_ATTACK'] || 0;
    const effectiveAtt = isMagic ? (magVal > 0 ? magVal : attVal) : (attVal > 0 ? attVal : magVal);
    totalEquivalentPct += effectiveAtt * 0.4;

    // 3. 깡스탯 (10당 1% -> 0.1배)
    const flatVal = (target[primaryFlat as keyof TargetOptionSet] as number) || 0;
    totalEquivalentPct += flatVal * 0.1;

    // 4. 모자 렙당 스탯 (9렙당 1은 주스탯 약 2.9%)
    const perLevelKeys = ['STR_PER_LEVEL', 'DEX_PER_LEVEL', 'INT_PER_LEVEL', 'LUK_PER_LEVEL'];
    for (const pk of perLevelKeys) {
        const perLvlVal = (target[pk as keyof TargetOptionSet] as number) || 0;
        if (perLvlVal > 0) {
            totalEquivalentPct += perLvlVal * 2.9;
        }
    }

    if (totalEquivalentPct <= 0) return target;

    return { [primaryPct]: Math.max(1, Math.round(totalEquivalentPct)) } as TargetOptionSet;
}

// ─── 상위 등급 최저 비용 캡 탐색 (에픽 -> 유니크 / 레전드리 중 최적 경로 자동 산출) ─────
// 에픽인 경우 유니크와 레전드리 경로를 둘 다 비교하여 더 저렴한 쪽 채택
// 유니크인 경우 레전드리 경로를 비교
function findBestUpperGradeCap(
    equipType: string,
    currentGrade: 'EPIC' | 'UNIQUE',
    level: number,
    potTarget: TargetOptionSet,
    isAddi: boolean,
    isMiracleTime: boolean
): { bestGrade: '유니크' | '레전드리'; bestTotalCap: number; tierUpCost: number; optionCost: number } | null {
    const candidates: { gradeKor: '유니크' | '레전드리'; totalCap: number; tierUpCost: number; optionCost: number }[] = [];

    if (currentGrade === 'EPIC') {
        // 경로 1: 에픽 → 유니크
        const uniqTierUp = getSingleStepTierUpCost(level, 'EPIC', 'UNIQUE', isAddi, isMiracleTime);
        try {
            const uniqRes = calculateExactPotentialExpectation(
                equipType, 'UNIQUE', level, [potTarget], isAddi ? 'ADDI_POTENTIAL' : 'POTENTIAL'
            );
            if (uniqRes.probability > 0) {
                candidates.push({
                    gradeKor: '유니크',
                    totalCap: uniqTierUp + uniqRes.totalCostMeso,
                    tierUpCost: uniqTierUp,
                    optionCost: uniqRes.totalCostMeso
                });
            }
        } catch {}

        // 경로 2: 에픽 → 유니크 → 레전드리 (유니크에서도 감당 안 되는 극단적 옵션인 경우)
        const legTierUp = uniqTierUp + getSingleStepTierUpCost(level, 'UNIQUE', 'LEGENDARY', isAddi, isMiracleTime);
        try {
            const legRes = calculateExactPotentialExpectation(
                equipType, 'LEGENDARY', level, [potTarget], isAddi ? 'ADDI_POTENTIAL' : 'POTENTIAL'
            );
            if (legRes.probability > 0) {
                candidates.push({
                    gradeKor: '레전드리',
                    totalCap: legTierUp + legRes.totalCostMeso,
                    tierUpCost: legTierUp,
                    optionCost: legRes.totalCostMeso
                });
            }
        } catch {}
    } else if (currentGrade === 'UNIQUE') {
        // 경로: 유니크 → 레전드리
        const legTierUp = getSingleStepTierUpCost(level, 'UNIQUE', 'LEGENDARY', isAddi, isMiracleTime);
        try {
            const legRes = calculateExactPotentialExpectation(
                equipType, 'LEGENDARY', level, [potTarget], isAddi ? 'ADDI_POTENTIAL' : 'POTENTIAL'
            );
            if (legRes.probability > 0) {
                candidates.push({
                    gradeKor: '레전드리',
                    totalCap: legTierUp + legRes.totalCostMeso,
                    tierUpCost: legTierUp,
                    optionCost: legRes.totalCostMeso
                });
            }
        } catch {}
    }

    if (candidates.length === 0) return null;

    // 가장 비용이 저렴한 경로 반환
    candidates.sort((a, b) => a.totalCap - b.totalCap);
    const best = candidates[0];
    return {
        bestGrade: best.gradeKor,
        bestTotalCap: best.totalCap,
        tierUpCost: best.tierUpCost,
        optionCost: best.optionCost
    };
}

// 추출된 옵션을 TargetOptionSet 형태로 변환 (직업별 유효 옵션만 필터링)
function extractTargetOptionSet(
    lines: string[], 
    characterClass: string, 
    mergeAllStat: boolean = true,
    isWSE: boolean = false
): TargetOptionSet {
    let combined: TargetOptionSet = {};
    for (const line of lines) {
        if (!line || line.trim() === '') continue;
        const parsed = parseOptionString(line, 1);
        combined = combineStats(combined, parsed.stats) as TargetOptionSet;
    }
    
    // 유효 옵션 필터링
    const validStatTypes = getValidStatTypesForClass(characterClass);
    const mainStats = getMainStatTypesForClass(characterClass);
    let filteredCombined: TargetOptionSet = {};
    
    // 비제논 직업인 경우 올스탯%를 주스탯%로 병합하여 특정 올스탯 조합만 강제하지 않도록 함 (WSE 제외)
    if (mergeAllStat && characterClass !== '제논' && !isWSE) {
        const primaryPct = mainStats.pct[0]; // e.g., 'STR %'
        
        if (combined['ALL %']) {
            combined[primaryPct] = (combined[primaryPct] || 0) + combined['ALL %'];
            delete combined['ALL %'];
        }
    }

    // 무기/보조무기/엠블렘(WSE)에서 깡공격력/깡마력 라인이 2줄 이상 중첩된 경우:
    // (예: 에픽 공6% + 공12 + 공12 = 공 24 -> 공 3%급 가치이므로 공 9% 유니크급으로 환산)
    if (isWSE) {
        const flatAttLineCount = lines.filter(l => l && (l.includes('공격력 : +') || l.includes('마력 : +')) && !l.includes('%')).length;
        const isMagicClass = characterClass.includes('아크메이지') || characterClass.includes('비숍') || 
                            characterClass.includes('루미너스') || characterClass.includes('배틀메이지') || 
                            characterClass.includes('플레임위자드') || characterClass.includes('에반') || 
                            characterClass.includes('키네시스') || characterClass.includes('일리움') || 
                            characterClass.includes('라라') || characterClass.includes('레테') || characterClass.includes('린');
        const attKey = isMagicClass ? 'MAGIC_ATTACK %' : 'ATTACK %';
        
        if (flatAttLineCount >= 2) {
            combined[attKey] = (combined[attKey] || 0) + 3;
        }
        delete combined['ATTACK'];
        delete combined['MAGIC_ATTACK'];
    }
    
    for (const [key, value] of Object.entries(combined)) {
        // 무기/보조무기/엠블렘(WSE)에서는:
        // 1. 주스탯%, 올스탯%, 렙당 주스탯, 깡스탯 제외
        // 2. 깡공격력/깡마력(ATTACK, MAGIC_ATTACK) 제외 (유저 체감 잡옵, 핀포인트 기댓값 폭발 방지)
        // 3. 데미지%(DAMAGE) 제외 (보스전 보공 대비 효율 낮아 잡옵 취급)
        if (isWSE) {
            const isMainStatPct = ['STR %', 'DEX %', 'INT %', 'LUK %', 'HP %', 'ALL %'].includes(key);
            const isLevelStat = ['STR_PER_LEVEL', 'DEX_PER_LEVEL', 'INT_PER_LEVEL', 'LUK_PER_LEVEL'].includes(key);
            const isFlatStat = ['STR', 'DEX', 'INT', 'LUK', 'HP', 'ALL'].includes(key);
            const isFlatAttack = key === 'ATTACK' || key === 'MAGIC_ATTACK';
            const isDamage = key === 'DAMAGE';

            if (isMainStatPct || isLevelStat || isFlatStat || isFlatAttack || isDamage) {
                continue;
            }
        }

        if (validStatTypes.includes(key as StatType)) {
            filteredCombined[key as keyof TargetOptionSet] = value;
        }
    }
    
    return filteredCombined;
}

import { getPotentialUpgradeRate, getPotentialResetCost, getPotentialGuaranteeCount, getAdditionalPotentialUpgradeRate, getAdditionalPotentialResetCost } from './cube_db';

export function getTierUpCost(level: number, targetGrade: '에픽' | '유니크' | '레전드리', isAddi: boolean, isMiracleTime: boolean = false): number {
    let totalCost = 0;
    
    // Rare to Epic
    if (targetGrade === '에픽' || targetGrade === '유니크' || targetGrade === '레전드리') {
        if (!isAddi) {
            const prob = getPotentialUpgradeRate('레어', '에픽', 'MESO_RESET', isMiracleTime) / 100;
            const cost = getPotentialResetCost(level, '레어');
            const ceiling = getPotentialGuaranteeCount('레어', '에픽', 'MESO_RESET');
            totalCost += (1/prob) > ceiling ? ceiling * cost : (1/prob) * cost;
        } else {
            const prob = getAdditionalPotentialUpgradeRate('레어', '에픽', undefined, isMiracleTime) / 100;
            const cost = getAdditionalPotentialResetCost(level, '레어');
            totalCost += (1/prob) * cost;
        }
    }
    
    // Epic to Unique
    if (targetGrade === '유니크' || targetGrade === '레전드리') {
        if (!isAddi) {
            const prob = getPotentialUpgradeRate('에픽', '유니크', 'MESO_RESET', isMiracleTime) / 100;
            const cost = getPotentialResetCost(level, '에픽');
            const ceiling = getPotentialGuaranteeCount('에픽', '유니크', 'MESO_RESET');
            totalCost += (1/prob) > ceiling ? ceiling * cost : (1/prob) * cost;
        } else {
            const prob = getAdditionalPotentialUpgradeRate('에픽', '유니크', undefined, isMiracleTime) / 100;
            const cost = getAdditionalPotentialResetCost(level, '에픽');
            totalCost += (1/prob) * cost;
        }
    }

    // Unique to Legendary
    if (targetGrade === '레전드리') {
        if (!isAddi) {
            const prob = getPotentialUpgradeRate('유니크', '레전드리', 'MESO_RESET', isMiracleTime) / 100;
            const cost = getPotentialResetCost(level, '유니크');
            const ceiling = getPotentialGuaranteeCount('유니크', '레전드리', 'MESO_RESET');
            totalCost += (1/prob) > ceiling ? ceiling * cost : (1/prob) * cost;
        } else {
            const prob = getAdditionalPotentialUpgradeRate('유니크', '레전드리', undefined, isMiracleTime) / 100;
            const cost = getAdditionalPotentialResetCost(level, '유니크');
            totalCost += (1/prob) * cost;
        }
    }
    
    return totalCost;
}
export function formatTargetOptionSet(target: TargetOptionSet, characterClass?: string): string {
    const parts: string[] = [];
    
    const labelMap: Record<string, string> = {
        'BOSS_DAMAGE': '보스 몬스터 데미지',
        'IGNORE_DEFENSE': '몬스터 방어율 무시',
        'CRITICAL_DAMAGE': '크리티컬 데미지',
        'CRITICAL_PROB': '크리티컬 확률',
        'COOL_DOWN': '스킬 재사용 대기시간',
        'ITEM_DROP': '아이템 드롭률',
        'MESO_OBTAIN': '메소 획득량',
        'DAMAGE': '데미지',
        'ATTACK %': '공격력 %',
        'MAGIC_ATTACK %': '마력 %',
        'ATTACK': '공격력',
        'MAGIC_ATTACK': '마력',
        'ALL %': '올스탯 %'
    };

    for (const [key, val] of Object.entries(target)) {
        if (val > 0) {
            if (key === 'COOL_DOWN') {
                parts.push(`${labelMap[key]} -${val}초`);
            } else if (['STR_PER_LEVEL', 'DEX_PER_LEVEL', 'INT_PER_LEVEL', 'LUK_PER_LEVEL'].includes(key)) {
                if (characterClass === '제논') {
                    const statName = key.replace('_PER_LEVEL', '');
                    parts.push(`레벨 당 ${statName} +${val}`);
                } else {
                    parts.push(`레벨 당 +${val}`);
                }
            } else if (labelMap[key]) {
                const label = labelMap[key];
                if (label.endsWith('%')) {
                    parts.push(`${label.replace(' %', '')} +${val}%`);
                } else if (['BOSS_DAMAGE', 'IGNORE_DEFENSE', 'CRITICAL_DAMAGE', 'CRITICAL_PROB', 'ITEM_DROP', 'MESO_OBTAIN', 'DAMAGE'].includes(key)) {
                    parts.push(`${label} +${val}%`);
                } else {
                    parts.push(`${label} +${val}`);
                }
            } else if (key.endsWith('%')) {
                parts.push(`${key.replace(' %', '').replace('%', '')} +${val}%`);
            } else {
                parts.push(`${key} +${val}`);
            }
        }
    }
    return parts.length > 0 ? parts.join(' / ') : '유효 옵션 없음';
}

export async function appraiseItemCost(item: any, characterClass: string, overrideBasePrice?: number, options: AppraisalOptions = {}): Promise<AppraisalResult> {
    const isMiracleTime = options.isMiracleTime ?? false;
    const isShining = options.isShining ?? false;
    let starforceSavings = 0;
    let tierUpSavings = 0;

    const defaultResult: AppraisalResult = {
        starforceCost: 0,
        potentialCost: 0,
        additionalCost: 0,
        baseItemCost: 0,
        totalCost: 0,
        isCalculable: true,
        priceDate: getLatestPriceDate(),
        appliedEvents: { isMiracleTime, isShining },
        details: {
            starforce: { success: true, cost: 0 },
            potential: { success: true, cost: 0 },
            additional: { success: true, cost: 0 },
            basePrice: { success: true, cost: 0 },
        }
    };

    if (!item || !item.item_name) {
        defaultResult.isCalculable = false;
        defaultResult.errorMessage = "아이템 정보가 없습니다.";
        return defaultResult;
    }

    const itemName = item.item_name;
    const isAstra = itemName.includes('아스트라');
    let level = item.item_base_option?.base_equipment_level || 0;
    if (isAstra && level === 0) {
        level = 200; // 아스트라 보조무기는 200제 교환불가 장비
    }
    const slot = item.item_equipment_slot || '';
    
    // 특수 장비 체크
    const specialConfig = getSpecialItemConfig(itemName);
    const isGenesisOrDestiny = itemName.includes('제네시스') || itemName.includes('데스티니');
    const isSuperior = itemName.includes('타일런트') || itemName.includes('히아데스') || itemName.includes('노바') || itemName.includes('헬리시움');

    // 제로 보조무기(라즐리/라피스) 연동 체크:
    // 1. 제로가 아스트라를 착용하지 않은 일반 제로 보조무기(라피스/라즐리)인 경우:
    //    주무기(알파) 강화 시 보조무기(베타)가 무료로 자동 동기화되므로 0원 처리 (중복 합산 방지)
    // 2. 제로가 아스트라 보조무기를 착용한 경우:
    //    주무기 연동이 해제되고 아스트라 고유 능력치로 대체되므로, 일반 직업과 동일하게 스타포스/잠재/에디 기댓값 정상 계산!
    const isZeroClass = characterClass === '제로' || characterClass?.includes('제로');
    const isSubWeaponSlot = slot === '보조무기' || slot === 'Sub Weapon' || slot === 'SubWeapon' || slot.includes('보조무기');
    if (isZeroClass && isSubWeaponSlot && !isAstra) {
        defaultResult.isCalculable = true;
        defaultResult.totalCost = 0;
        defaultResult.baseItemCost = 0;
        defaultResult.starforceCost = 0;
        defaultResult.potentialCost = 0;
        defaultResult.additionalCost = 0;
        defaultResult.details.isZeroSecondary = true;
        defaultResult.details.basePrice = { success: true, cost: 0, reason: "기본 지급 (무료)" };
        defaultResult.details.starforce = { success: true, cost: 0, reason: "주무기 연동 (무료)" };
        defaultResult.details.potential = { success: true, cost: 0, reason: "주무기 연동 (무료)" };
        defaultResult.details.additional = { success: true, cost: 0, reason: "주무기 연동 (무료)" };
        return defaultResult;
    }

    if (itemName.includes('도전자의') || itemName.includes('챌린저스')) {
        defaultResult.isCalculable = false;
        defaultResult.errorMessage = "기간제 이벤트 장비는 가치를 산출할 수 없습니다.";
        defaultResult.details.starforce = { success: false, cost: 0, reason: "-" };
        defaultResult.details.potential = { success: false, cost: 0, reason: "-" };
        defaultResult.details.additional = { success: false, cost: 0, reason: "-" };
        defaultResult.details.basePrice = { success: false, cost: 0, reason: "이벤트 장비" };
        return defaultResult;
    }

    // 1. Base Item Cost (노작 시세)
    let basePrice = 0;
    if (isAstra) {
        // 아스트라 보조무기는 에레브의 에리온에게서 10억 메소에 구매 가능한 200제 장비
        defaultResult.details.isAstra = true;
        if (overrideBasePrice !== undefined) {
            basePrice = overrideBasePrice;
            defaultResult.details.basePrice.isOverridden = true;
            defaultResult.details.basePrice.cost = basePrice;
            defaultResult.details.basePrice.reason = "노작 시세(수정됨)";
        } else {
            basePrice = 1_000_000_000; // 에리온 상점 10억 메소
            defaultResult.details.basePrice.cost = basePrice;
            defaultResult.details.basePrice.reason = "에리온 상점 (10억)";
        }
        defaultResult.details.basePrice.success = true;
        defaultResult.baseItemCost = basePrice;
    } else if (isGenesisOrDestiny) {
        defaultResult.details.basePrice.success = false;
        defaultResult.details.basePrice.reason = "교불/해방 무기";
    } else {
        try {
            if (overrideBasePrice !== undefined) {
                basePrice = overrideBasePrice;
                defaultResult.details.basePrice.isOverridden = true;
                if (basePrice > 0) {
                    defaultResult.details.basePrice.success = true;
                    defaultResult.details.basePrice.reason = undefined;
                }
            } else {
                basePrice = await getLatestPrice(itemName, slot, characterClass);
            }
            
            defaultResult.baseItemCost = basePrice;
            defaultResult.details.basePrice.cost = basePrice;
            if (basePrice === 0 && !defaultResult.details.basePrice.isOverridden) {
                defaultResult.details.basePrice.reason = "경매장 매물 없음 (또는 교불)";
            } else if (item.special_ring_level && (itemName.includes('리스트레인트 링') || itemName.includes('컨티뉴어스 링'))) {
                let upgradeCost = 0;
                const upgradeSteps = [];
                
                defaultResult.details.basePrice.base4LevelCost = basePrice;

                if (item.special_ring_level >= 5) {
                    const lifeStonePrice = (await getLatestPrice('연마석')) || 1_200_000_000;
                    const lv5Cost = (10 * lifeStonePrice) + 5_000_000_000;
                    upgradeCost += lv5Cost; // 10개 * 시세 + 50억
                    upgradeSteps.push("5레벨 연마");
                    defaultResult.details.basePrice.level5Cost = lv5Cost;
                    defaultResult.details.basePrice.lifeStonePrice = lifeStonePrice;
                }
                if (item.special_ring_level >= 6) {
                    const faithStonePrice = (await getLatestPrice('신념의 연마석')) || 3_500_000_000;
                    const lv6Cost = (20 * faithStonePrice) + 20_000_000_000;
                    upgradeCost += lv6Cost; // 20개 * 시세 + 200억
                    upgradeSteps.push("6레벨 연마");
                    defaultResult.details.basePrice.level6Cost = lv6Cost;
                    defaultResult.details.basePrice.faithStonePrice = faithStonePrice;
                }
                
                if (upgradeCost > 0) {
                    basePrice += upgradeCost;
                    defaultResult.baseItemCost = basePrice;
                    defaultResult.details.basePrice.cost = basePrice;
                    defaultResult.details.basePrice.reason = `4레벨 시세 + ${upgradeSteps.join(' + ')} 기댓값`;
                } else if (item.special_ring_level !== 4) {
                    defaultResult.details.basePrice.reason = "4레벨 기준 시세";
                }
            } else if (item.special_ring_level && item.special_ring_level !== 4) {
                defaultResult.details.basePrice.reason = "4레벨 기준 시세";
            }
        } catch (e) {
            defaultResult.details.basePrice.success = false;
            defaultResult.details.basePrice.reason = "시세 서버 오류";
        }
    }

    // 2. Starforce Cost
    const currentStar = parseInt(item.starforce || "0");
    const isAmazing = isAmazingEnhancementItem(item);
    const isPocketItem = slot.includes("포켓") || itemName.includes("성배");
    const isNoStarforce = NO_STARFORCE_SLOTS.some(s => slot.includes(s)) || isPocketItem;
    
    if (specialConfig?.skipSections?.starforce || isNoStarforce) {
        defaultResult.details.starforce.reason = "스타포스 불가 장비";
    } else if (isSuperior) {
        defaultResult.details.starforce.success = false;
        defaultResult.details.starforce.cost = 0;
        defaultResult.details.starforce.reason = "슈페리얼 (산출 제외)";
        defaultResult.starforceCost = 0;
    } else if (isAmazing) {
        defaultResult.details.starforce.success = false;
        defaultResult.details.starforce.cost = 0;
        defaultResult.details.starforce.reason = "놀장강 (산출 제외)";
        defaultResult.starforceCost = 0;
    } else if (isGenesisOrDestiny) {
        if (currentStar <= 22) {
            defaultResult.details.starforce.success = false;
            defaultResult.details.starforce.reason = "22성 기본 지급 (무료)";
        } else {
            try {
                const isDestiny = itemName.includes('데스티니');
                const sfCostToCurrent = calculateCumulativeExpectedCostDetailed(level, currentStar, {
                    itemCost: 10_000_000_000,
                    starcatch: true,
                    mvpDiscount: 0,
                    isDestiny: isDestiny,
                    isShining: isShining,
                    restoreMethod: "optimal"
                });
                const sfCostTo22 = calculateCumulativeExpectedCostDetailed(level, 22, {
                    itemCost: 10_000_000_000,
                    starcatch: true,
                    mvpDiscount: 0,
                    isDestiny: isDestiny,
                    isShining: isShining,
                    restoreMethod: "optimal"
                });
                
                const pureMeso = Math.max(0, sfCostToCurrent.totalMeso - sfCostTo22.totalMeso);
                const spares = Math.max(0, sfCostToCurrent.totalSpares - sfCostTo22.totalSpares);
                const actualSfCost = pureMeso + (spares * 10_000_000_000);
                
                defaultResult.starforceCost = actualSfCost;
                defaultResult.details.starforce.cost = actualSfCost;
                defaultResult.details.starforce.expectedSpares = spares;
                defaultResult.details.starforce.pureEnhancementCost = pureMeso;
                defaultResult.details.starforce.success = true;
                defaultResult.details.starforce.reason = `22성 -> ${currentStar}성 직작 기댓값 (데스티니 복구 적용${isShining ? ', 샤이닝 적용' : ''})`;

                if (isShining) {
                    const sfCostToCurrentBase = calculateCumulativeExpectedCostDetailed(level, currentStar, {
                        itemCost: 10_000_000_000,
                        starcatch: true,
                        mvpDiscount: 0,
                        isDestiny: isDestiny,
                        isShining: false,
                        restoreMethod: "optimal"
                    });
                    const sfCostTo22Base = calculateCumulativeExpectedCostDetailed(level, 22, {
                        itemCost: 10_000_000_000,
                        starcatch: true,
                        mvpDiscount: 0,
                        isDestiny: isDestiny,
                        isShining: false,
                        restoreMethod: "optimal"
                    });
                    const pureMesoBase = Math.max(0, sfCostToCurrentBase.totalMeso - sfCostTo22Base.totalMeso);
                    const sparesBase = Math.max(0, sfCostToCurrentBase.totalSpares - sfCostTo22Base.totalSpares);
                    const baseActualSfCost = pureMesoBase + (sparesBase * 10_000_000_000);
                    starforceSavings = Math.max(0, baseActualSfCost - actualSfCost);
                    defaultResult.details.starforce.savings = starforceSavings;
                }
            } catch (e) {
                defaultResult.details.starforce.success = false;
                defaultResult.details.starforce.reason = "초월 강화 계산 오류";
            }
        }
    } else if (currentStar > 0) {
        try {
            // 현재 별(currentStar)까지 도달하는 누적 기댓값 계산 (0 -> currentStar)
            const sfCost = calculateCumulativeExpectedCostDetailed(level, currentStar, {
                itemCost: basePrice || 50000000,
                starcatch: true,
                mvpDiscount: 0,
                isShining: isShining,
                restoreMethod: "optimal"
            });
            const actualSfCost = sfCost.totalMeso + (sfCost.totalSpares * (basePrice || 50000000));
            defaultResult.starforceCost = actualSfCost;
            defaultResult.details.starforce.cost = actualSfCost;
            defaultResult.details.starforce.expectedSpares = sfCost.totalSpares;
            defaultResult.details.starforce.pureEnhancementCost = sfCost.totalMeso;

            // 샤이닝 스타포스 절감액 계산
            if (isShining) {
                const sfBaseCost = calculateCumulativeExpectedCostDetailed(level, currentStar, {
                    itemCost: basePrice || 50000000,
                    starcatch: true, mvpDiscount: 0,
                    isShining: false, restoreMethod: "optimal"
                });
                const baseActualSfCost = sfBaseCost.totalMeso + (sfBaseCost.totalSpares * (basePrice || 50000000));
                starforceSavings = Math.max(0, baseActualSfCost - actualSfCost);
                defaultResult.details.starforce.savings = starforceSavings;
            }
        } catch (e) {
            defaultResult.details.starforce.success = false;
            defaultResult.details.starforce.reason = "스타포스 계산 오류";
        }
    } else if (isAstra) {
        defaultResult.details.starforce.success = true;
        defaultResult.details.starforce.cost = 0;
        defaultResult.details.starforce.reason = "0성 (노강화)";
    }

    const equipType = mapEquipmentSlotToEquipType(slot, itemName);
    const isWSE = slot === '무기' || slot === 'Weapon' || 
                  slot === '보조무기' || slot === 'Sub Weapon' || slot === 'SubWeapon' ||
                  slot === '엠블렘' || slot === 'Emblem' ||
                  equipType === '무기' || equipType.startsWith('보조무기') || equipType === '엠블렘' || equipType === '방패';

    // 3. Potential Cost (윗잠)
    const potGrade = item.potential_option_grade;
    const potLines = [item.potential_option_1, item.potential_option_2, item.potential_option_3].filter(Boolean);
    
    if (specialConfig?.skipSections?.potential || !potGrade || potLines.length === 0) {
        defaultResult.details.potential.reason = "윗잠 불가/미설정 장비";
    } else {
        try {
            const potTarget = extractTargetOptionSet(potLines, characterClass, true, isWSE);
            console.log(`[API LOG] Item: ${itemName}, Class: ${characterClass}, PotLines:`, potLines, `PotTarget:`, potTarget);
            // 윗잠이 레어면 제외할지 고민... 보통 윗잠 레전/유니크/에픽까지만 기댓값이 큼
            if (['LEGENDARY', 'UNIQUE', 'EPIC', 'RARE'].includes(potGrade.toUpperCase()) || ['레전드리', '유니크', '에픽', '레어'].includes(potGrade)) {
                let gradeEn: 'LEGENDARY' | 'UNIQUE' | 'EPIC' | 'RARE' = 'RARE';
                if (potGrade === '레전드리' || potGrade === 'LEGENDARY') gradeEn = 'LEGENDARY';
                if (potGrade === '유니크' || potGrade === 'UNIQUE') gradeEn = 'UNIQUE';
                if (potGrade === '에픽' || potGrade === 'EPIC') gradeEn = 'EPIC';
                
                // 등급업 비용 추가
                let tierUpGrade: '에픽' | '유니크' | '레전드리' | null = null;
                if (gradeEn === 'EPIC') tierUpGrade = '에픽';
                if (gradeEn === 'UNIQUE') tierUpGrade = '유니크';
                if (gradeEn === 'LEGENDARY') tierUpGrade = '레전드리';
                
                const tierUpCost = tierUpGrade ? getTierUpCost(level, tierUpGrade, false, isMiracleTime) : 0;
                let potTierUpSavings = 0;
                if (isMiracleTime && tierUpGrade) {
                    const normalTierUpCost = getTierUpCost(level, tierUpGrade, false, false);
                    potTierUpSavings = Math.max(0, normalTierUpCost - tierUpCost);
                    tierUpSavings += potTierUpSavings;
                }
                defaultResult.details.potential.tierUpSavings = potTierUpSavings;

                if (Object.keys(potTarget).length === 0) {
                    defaultResult.potentialCost = tierUpCost;
                    defaultResult.details.potential.cost = tierUpCost;
                    defaultResult.details.potential.tierUpCost = tierUpCost;
                    defaultResult.details.potential.optionCost = 0;
                    defaultResult.details.potential.expectedTries = 0;
                    defaultResult.details.potential.targetOptionStr = "유효 옵션 없음";
                } else {
                    console.log(`[API LOG DETAILED] equipType: ${equipType}, gradeEn: ${gradeEn}, level: ${level}, potTarget: ${JSON.stringify(potTarget)}`);
                    const potResult = calculateExactPotentialExpectation(
                        equipType,
                        gradeEn,
                        level,
                        [potTarget],
                        'POTENTIAL'
                    );
                    const totalPotCost = potResult.totalCostMeso + tierUpCost;
                    console.log("[API LOG] potResult:", potResult);
                    
                    // 만약 기댓값이 조합 불가(0)면 예외 처리
                    if (potResult.probability === 0) { 
                        defaultResult.details.potential.success = false;
                        defaultResult.details.potential.reason = "계산 불가 특수 옵션 조합";
                    } else {
                        let finalPotCost = totalPotCost;

                        // ─── 이탈 감지 + 상위 등급 최저 비용 캡핑 (잠재능력) ─────────────
                        if (gradeEn === 'EPIC' || gradeEn === 'UNIQUE') {
                            const escapeCheck = detectPotentialLineEscape({
                                lines: potLines,
                                grade: gradeEn,
                                isAddi: false,
                                level,
                                isWSE,
                                expectedAttempts: potResult.expectedAttempts
                            });

                            if (escapeCheck.hasEscape) {
                                const effectiveCapTarget = !isWSE 
                                    ? convertToEquivalentMainStatTarget(potTarget, characterClass, isWSE)
                                    : potTarget;

                                const capResult = findBestUpperGradeCap(
                                    equipType, gradeEn, level, effectiveCapTarget, false, isMiracleTime
                                );
                                
                                if (capResult && capResult.bestTotalCap < totalPotCost) {
                                    // 상위 등급 경로가 더 저렴 → 캡 적용
                                    finalPotCost = capResult.bestTotalCap;
                                    defaultResult.details.potential.escapeCappingApplied = true;
                                    defaultResult.details.potential.rawCostBeforeCap = totalPotCost;
                                    defaultResult.details.potential.escapeCappingGrade = capResult.bestGrade;
                                    console.log(`[ESCAPE CAP] ${itemName} 잠재 ${escapeCheck.reason || '이탈'} 감지(${gradeEn}) → 상위등급(${capResult.bestGrade}) 캡 적용: ${totalPotCost.toLocaleString()} → ${finalPotCost.toLocaleString()}`);
                                }
                            }
                        }
                        // ──────────────────────────────────────────────────────────────────

                        defaultResult.potentialCost = finalPotCost;
                        defaultResult.details.potential.cost = finalPotCost;
                        defaultResult.details.potential.tierUpCost = tierUpCost;
                        defaultResult.details.potential.optionCost = potResult.totalCostMeso;
                        defaultResult.details.potential.expectedTries = potResult.expectedAttempts;
                        
                        const displayPotTarget = extractTargetOptionSet(potLines, characterClass, false, isWSE);
                        defaultResult.details.potential.targetOptionStr = formatTargetOptionSet(displayPotTarget, characterClass);
                    }
                }
            } else {
                defaultResult.details.potential.reason = "에픽 미만 (기댓값 미미)";
            }
        } catch (e) {
            defaultResult.details.potential.success = false;
            defaultResult.details.potential.reason = "잠재능력 계산 오류";
        }
    }

    // 4. Additional Potential Cost (아랫잠)
    const addGrade = item.additional_potential_option_grade;
    const addLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3].filter(Boolean);
    
    if (specialConfig?.skipSections?.potential || !addGrade || addLines.length === 0) {
        defaultResult.details.additional.reason = "아랫잠 불가/미설정 장비";
    } else {
        try {
            const addTarget = extractTargetOptionSet(addLines, characterClass, true, isWSE);
            console.log(`[API LOG] Item: ${itemName}, Class: ${characterClass}, AddLines:`, addLines, `AddTarget:`, addTarget);
            if (['LEGENDARY', 'UNIQUE', 'EPIC', 'RARE'].includes(addGrade.toUpperCase()) || ['레전드리', '유니크', '에픽', '레어'].includes(addGrade)) {
                let gradeEn: 'LEGENDARY' | 'UNIQUE' | 'EPIC' | 'RARE' = 'RARE';
                if (addGrade === '레전드리' || addGrade === 'LEGENDARY') gradeEn = 'LEGENDARY';
                if (addGrade === '유니크' || addGrade === 'UNIQUE') gradeEn = 'UNIQUE';
                if (addGrade === '에픽' || addGrade === 'EPIC') gradeEn = 'EPIC';
                
                // 등급업 비용 추가
                let tierUpGrade: '에픽' | '유니크' | '레전드리' | null = null;
                if (gradeEn === 'EPIC') tierUpGrade = '에픽';
                if (gradeEn === 'UNIQUE') tierUpGrade = '유니크';
                if (gradeEn === 'LEGENDARY') tierUpGrade = '레전드리';
                
                const tierUpCost = tierUpGrade ? getTierUpCost(level, tierUpGrade, true, isMiracleTime) : 0;
                let addTierUpSavings = 0;
                if (isMiracleTime && tierUpGrade) {
                    const normalTierUpCost = getTierUpCost(level, tierUpGrade, true, false);
                    addTierUpSavings = Math.max(0, normalTierUpCost - tierUpCost);
                    tierUpSavings += addTierUpSavings;
                }
                defaultResult.details.additional.tierUpSavings = addTierUpSavings;

                if (Object.keys(addTarget).length === 0) {
                    defaultResult.additionalCost = tierUpCost;
                    defaultResult.details.additional.cost = tierUpCost;
                    defaultResult.details.additional.tierUpCost = tierUpCost;
                    defaultResult.details.additional.optionCost = 0;
                    defaultResult.details.additional.expectedTries = 0;
                    defaultResult.details.additional.targetOptionStr = "유효 옵션 없음";
                } else {
                    const addiResult = calculateExactPotentialExpectation(
                        equipType,
                        gradeEn,
                        level,
                        [addTarget],
                        'ADDI_POTENTIAL'
                    );
                    const totalAddiCost = addiResult.totalCostMeso + tierUpCost;
                    
                    if (addiResult.probability === 0) {
                        defaultResult.details.additional.success = false;
                        defaultResult.details.additional.reason = "계산 불가 특수 옵션 조합";
                    } else {
                        let finalAddiCost = totalAddiCost;

                        // ─── 이탈 감지 + 상위 등급 최저 비용 캡핑 (에디셔널) ─────────────
                        if (gradeEn === 'EPIC' || gradeEn === 'UNIQUE') {
                            const escapeCheck = detectPotentialLineEscape({
                                lines: addLines,
                                grade: gradeEn,
                                isAddi: true,
                                level,
                                isWSE,
                                expectedAttempts: addiResult.expectedAttempts
                            });

                            if (escapeCheck.hasEscape) {
                                const effectiveCapTarget = !isWSE 
                                    ? convertToEquivalentMainStatTarget(addTarget, characterClass, isWSE)
                                    : addTarget;

                                const capResult = findBestUpperGradeCap(
                                    equipType, gradeEn, level, effectiveCapTarget, true, isMiracleTime
                                );

                                if (capResult && capResult.bestTotalCap < totalAddiCost) {
                                    finalAddiCost = capResult.bestTotalCap;
                                    defaultResult.details.additional.escapeCappingApplied = true;
                                    defaultResult.details.additional.rawCostBeforeCap = totalAddiCost;
                                    defaultResult.details.additional.escapeCappingGrade = capResult.bestGrade;
                                    console.log(`[ESCAPE CAP] ${itemName} 에디 ${escapeCheck.reason || '이탈'} 감지(${gradeEn}) → 상위등급(${capResult.bestGrade}) 캡 적용: ${totalAddiCost.toLocaleString()} → ${finalAddiCost.toLocaleString()}`);
                                }
                            }
                        }
                        // ──────────────────────────────────────────────────────────────────

                        defaultResult.additionalCost = finalAddiCost;
                        defaultResult.details.additional.cost = finalAddiCost;
                        defaultResult.details.additional.tierUpCost = tierUpCost;
                        defaultResult.details.additional.optionCost = addiResult.totalCostMeso;
                        defaultResult.details.additional.expectedTries = addiResult.expectedAttempts;
                        
                        const displayAddTarget = extractTargetOptionSet(addLines, characterClass, false, isWSE);
                        defaultResult.details.additional.targetOptionStr = formatTargetOptionSet(displayAddTarget, characterClass);
                    }
                }
            } else {
                defaultResult.details.additional.reason = "에픽 미만 (기댓값 미미)";
            }
        } catch (e) {
            defaultResult.details.additional.success = false;
            defaultResult.details.additional.reason = "에디셔널 계산 오류";
        }
    }

    defaultResult.savings = {
        starforceSavings,
        tierUpSavings,
        potentialTierUpSavings: defaultResult.details.potential.tierUpSavings || 0,
        additionalTierUpSavings: defaultResult.details.additional.tierUpSavings || 0
    };
    defaultResult.totalCost = defaultResult.baseItemCost + defaultResult.starforceCost + defaultResult.potentialCost + defaultResult.additionalCost;

    return defaultResult;
}
