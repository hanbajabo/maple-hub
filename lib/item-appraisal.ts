import { calculateExactPotentialExpectation, parseOptionString, combineStats, TargetOptionSet } from './potential-calculator';
import { calculateCumulativeExpectedCostDetailed } from './starforce_db';
import { getLatestPrice } from './parsePriceData';
import { getSpecialItemConfig } from './config/special_items';
import { NO_STARFORCE_SLOTS } from './config/unified_criteria';

export interface AppraisalResult {
    starforceCost: number;
    potentialCost: number;
    additionalCost: number;
    baseItemCost: number;
    totalCost: number;
    isCalculable: boolean;
    errorMessage?: string;
    details: {
        starforce: {
            success: boolean;
            cost: number;
            reason?: string;
        };
        potential: {
            success: boolean;
            cost: number;
            reason?: string;
        };
        additional: {
            success: boolean;
            cost: number;
            reason?: string;
        };
        basePrice: {
            success: boolean;
            cost: number;
            reason?: string;
        };
    };
}

// 넥슨 API의 장비 분류를 잠재능력 계산기(mesu)용 분류로 매핑
function mapEquipmentSlotToEquipType(slot: string, name: string): string {
    if (slot === '엠블렘' || slot === 'Emblem' || name.includes('엠블렘')) return '엠블렘';
    
    // 보조무기 분류
    const subWeaponKeywords = ['카타라', '방패', '마도서', '여우구슬', '단검용 검집', '부적', '로잘리오', '쇠사슬', '마법화살', '소울링', '매그넘', '손목보호대', '조준기', '쥬얼', '그립', '화약통', '무게추', '문서', '매직윙', '수정구', '오브', '카드', '호루라기', '노리개', '선추'];
    if (slot === '보조무기' || slot === 'Sub Weapon' || slot === 'SubWeapon' || name.includes('보조무기') || subWeaponKeywords.some(kw => name.includes(kw))) {
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
    
    return '무기'; // Default fallback
}

// 추출된 옵션을 TargetOptionSet 형태로 변환
function extractTargetOptionSet(lines: string[]): TargetOptionSet {
    let combined: TargetOptionSet = {};
    for (const line of lines) {
        if (!line || line.trim() === '') continue;
        const parsed = parseOptionString(line, 1);
        combined = combineStats(combined, parsed.stats) as TargetOptionSet;
    }
    return combined;
}

export async function appraiseItemCost(item: any, characterClass: string): Promise<AppraisalResult> {
    const defaultResult: AppraisalResult = {
        starforceCost: 0,
        potentialCost: 0,
        additionalCost: 0,
        baseItemCost: 0,
        totalCost: 0,
        isCalculable: true,
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
    
    // 특수 장비 체크 (놀장강, 제네시스, 타일런트 등은 제외하거나 제한적으로 계산)
    const specialConfig = getSpecialItemConfig(itemName);
    if (itemName.includes('제네시스') || itemName.includes('데스티니')) {
        defaultResult.isCalculable = false;
        defaultResult.errorMessage = "종결(해방/초월) 무기는 직작 기댓값 산출이 불가능합니다.";
        return defaultResult;
    }
    
    if (itemName.includes('타일런트') || itemName.includes('히아데스')) {
        defaultResult.isCalculable = false;
        defaultResult.errorMessage = "슈페리얼 장비는 기댓값 산출 대상에서 제외됩니다.";
        return defaultResult;
    }

    // 1. Base Item Cost (노작 시세)
    let basePrice = 0;
    try {
        basePrice = await getLatestPrice(itemName, slot, characterClass);
        defaultResult.baseItemCost = basePrice;
        defaultResult.details.basePrice.cost = basePrice;
        if (basePrice === 0) {
            defaultResult.details.basePrice.reason = "경매장 매물 없음 (또는 교불템)";
        }
    } catch (e) {
        defaultResult.details.basePrice.success = false;
        defaultResult.details.basePrice.reason = "시세 서버 오류";
    }

    // 2. Starforce Cost
    const currentStar = parseInt(item.starforce || "0");
    const isPocketItem = slot.includes("포켓") || itemName.includes("성배");
    const isNoStarforce = NO_STARFORCE_SLOTS.some(s => slot.includes(s)) || isPocketItem;
    
    if (specialConfig?.skipSections?.starforce || isNoStarforce) {
        defaultResult.details.starforce.reason = "스타포스 불가 장비";
    } else if (currentStar > 0) {
        try {
            // 현재 별(currentStar)까지 도달하는 누적 기댓값 계산 (0 -> currentStar)
            const sfCost = calculateCumulativeExpectedCostDetailed(level, currentStar, {
                itemCost: basePrice || 50000000, // 스페어가 없으면 대략 5천만 메소로 가정
                starcatch: true,
                mvpDiscount: 0 // No MVP discount by default
            });
            const actualSfCost = sfCost.totalMeso + (sfCost.totalSpares * (basePrice || 50000000));
            defaultResult.starforceCost = actualSfCost;
            defaultResult.details.starforce.cost = actualSfCost;
        } catch (e) {
            defaultResult.details.starforce.success = false;
            defaultResult.details.starforce.reason = "스타포스 계산 오류";
        }
    }

    const equipType = mapEquipmentSlotToEquipType(slot, itemName);

    // 3. Potential Cost (윗잠)
    const potGrade = item.potential_option_grade;
    const potLines = [item.potential_option_1, item.potential_option_2, item.potential_option_3].filter(Boolean);
    
    if (specialConfig?.skipSections?.potential || !potGrade || potLines.length === 0) {
        defaultResult.details.potential.reason = "윗잠 불가/미설정 장비";
    } else {
        try {
            const potTarget = extractTargetOptionSet(potLines);
            // 윗잠이 레어면 제외할지 고민... 보통 윗잠 레전/유니크/에픽까지만 기댓값이 큼
            if (['LEGENDARY', 'UNIQUE', 'EPIC'].includes(potGrade.toUpperCase()) || ['레전드리', '유니크', '에픽'].includes(potGrade)) {
                let gradeEn: 'LEGENDARY' | 'UNIQUE' | 'EPIC' | 'RARE' = 'EPIC';
                if (potGrade === '레전드리' || potGrade === 'LEGENDARY') gradeEn = 'LEGENDARY';
                if (potGrade === '유니크' || potGrade === 'UNIQUE') gradeEn = 'UNIQUE';
                
                const potResult = calculateExactPotentialExpectation(
                    equipType,
                    gradeEn,
                    level,
                    [potTarget],
                    'POTENTIAL'
                );
                
                // 만약 기댓값이 너무 높거나 조합 불가(99억)면 예외 처리
                if (potResult.totalCostMeso > 900000000000) { // 9,000억 이상은 오류이거나 특수 옵션
                    defaultResult.details.potential.success = false;
                    defaultResult.details.potential.reason = "계산 불가 특수 옵션 조합";
                } else {
                    defaultResult.potentialCost = potResult.totalCostMeso;
                    defaultResult.details.potential.cost = potResult.totalCostMeso;
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
            const addTarget = extractTargetOptionSet(addLines);
            if (['LEGENDARY', 'UNIQUE', 'EPIC'].includes(addGrade.toUpperCase()) || ['레전드리', '유니크', '에픽'].includes(addGrade)) {
                let gradeEn: 'LEGENDARY' | 'UNIQUE' | 'EPIC' | 'RARE' = 'EPIC';
                if (addGrade === '레전드리' || addGrade === 'LEGENDARY') gradeEn = 'LEGENDARY';
                if (addGrade === '유니크' || addGrade === 'UNIQUE') gradeEn = 'UNIQUE';
                
                const addResult = calculateExactPotentialExpectation(
                    equipType,
                    gradeEn,
                    level,
                    [addTarget],
                    'ADDI_POTENTIAL'
                );
                
                if (addResult.totalCostMeso > 900000000000) {
                    defaultResult.details.additional.success = false;
                    defaultResult.details.additional.reason = "계산 불가 특수 옵션 조합";
                } else {
                    defaultResult.additionalCost = addResult.totalCostMeso;
                    defaultResult.details.additional.cost = addResult.totalCostMeso;
                }
            } else {
                defaultResult.details.additional.reason = "에픽 미만 (기댓값 미미)";
            }
        } catch (e) {
            defaultResult.details.additional.success = false;
            defaultResult.details.additional.reason = "에디셔널 계산 오류";
        }
    }

    defaultResult.totalCost = defaultResult.baseItemCost + defaultResult.starforceCost + defaultResult.potentialCost + defaultResult.additionalCost;

    return defaultResult;
}
