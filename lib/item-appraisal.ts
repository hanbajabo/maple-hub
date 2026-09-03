import { calculateExactPotentialExpectation, parseOptionString, combineStats, TargetOptionSet } from './potential-calculator';
import { calculateCumulativeExpectedCostDetailed } from './starforce_db';
import { getLatestPrice, getLatestPriceDate } from './parsePriceData';
import { getSpecialItemConfig } from './config/special_items';
import { NO_STARFORCE_SLOTS } from './config/unified_criteria';

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
    savings?: { starforceSavings: number; tierUpSavings: number; };
    details: {
        starforce: {
            success: boolean;
            cost: number;
            reason?: string;
            expectedSpares?: number;
            pureEnhancementCost?: number;
        };
        potential: {
            success: boolean;
            cost: number;
            reason?: string;
            tierUpCost?: number;
            optionCost?: number;
            expectedTries?: number;
            targetOptionStr?: string;
        };
        additional: {
            success: boolean;
            cost: number;
            reason?: string;
            tierUpCost?: number;
            optionCost?: number;
            expectedTries?: number;
            targetOptionStr?: string;
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
    
    for (const [key, value] of Object.entries(combined)) {
        // 무기/보조무기/엠블렘(WSE)에서는 주스탯%(올스탯%) 및 레벨당 주스탯을 잡옵션으로 취급하여 제외
        if (isWSE) {
            const isMainStatPct = ['STR %', 'DEX %', 'INT %', 'LUK %', 'HP %', 'ALL %'].includes(key);
            const isLevelStat = ['STR_PER_LEVEL', 'DEX_PER_LEVEL', 'INT_PER_LEVEL', 'LUK_PER_LEVEL'].includes(key);
            const isFlatStat = ['STR', 'DEX', 'INT', 'LUK', 'HP', 'ALL'].includes(key);
            if (isMainStatPct || isLevelStat || isFlatStat) {
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
    const level = item.item_base_option?.base_equipment_level || 0;
    const slot = item.item_equipment_slot || '';
    
    // 특수 장비 체크
    const specialConfig = getSpecialItemConfig(itemName);
    const isGenesisOrDestiny = itemName.includes('제네시스') || itemName.includes('데스티니');
    
    if (itemName.includes('타일런트') || itemName.includes('히아데스')) {
        defaultResult.isCalculable = false;
        defaultResult.errorMessage = "슈페리얼 장비는 기댓값 산출 대상에서 제외됩니다.";
        defaultResult.details.starforce = { success: false, cost: 0, reason: "-" };
        defaultResult.details.potential = { success: false, cost: 0, reason: "-" };
        defaultResult.details.additional = { success: false, cost: 0, reason: "-" };
        defaultResult.details.basePrice = { success: false, cost: 0, reason: "산출 불가" };
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
    if (isGenesisOrDestiny) {
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
                    const lifeStonePrice = (await getLatestPrice('연마석')) || 11_000_000_000;
                    const lv5Cost = (10 * lifeStonePrice) + 5_000_000_000;
                    upgradeCost += lv5Cost; // 10개 * 시세 + 50억
                    upgradeSteps.push("5레벨 연마");
                    defaultResult.details.basePrice.level5Cost = lv5Cost;
                    defaultResult.details.basePrice.lifeStonePrice = lifeStonePrice;
                }
                if (item.special_ring_level >= 6) {
                    const faithStonePrice = (await getLatestPrice('신념의 연마석')) || 40_000_000_000;
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
    const isPocketItem = slot.includes("포켓") || itemName.includes("성배");
    const isNoStarforce = NO_STARFORCE_SLOTS.some(s => slot.includes(s)) || isPocketItem;
    
    if (specialConfig?.skipSections?.starforce || isNoStarforce) {
        defaultResult.details.starforce.reason = "스타포스 불가 장비";
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
            }
        } catch (e) {
            defaultResult.details.starforce.success = false;
            defaultResult.details.starforce.reason = "스타포스 계산 오류";
        }
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
                if (isMiracleTime && tierUpGrade) {
                    const normalTierUpCost = getTierUpCost(level, tierUpGrade, false, false);
                    tierUpSavings += Math.max(0, normalTierUpCost - tierUpCost);
                }

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
                        defaultResult.potentialCost = totalPotCost;
                        defaultResult.details.potential.cost = totalPotCost;
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
                if (isMiracleTime && tierUpGrade) {
                    const normalTierUpCost = getTierUpCost(level, tierUpGrade, true, false);
                    tierUpSavings += Math.max(0, normalTierUpCost - tierUpCost);
                }

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
                        defaultResult.additionalCost = totalAddiCost;
                        defaultResult.details.additional.cost = totalAddiCost;
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
        tierUpSavings
    };
    defaultResult.totalCost = defaultResult.baseItemCost + defaultResult.starforceCost + defaultResult.potentialCost + defaultResult.additionalCost;

    return defaultResult;
}
