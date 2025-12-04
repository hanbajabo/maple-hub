/**
 * 잠재능력 평가 시스템 메인 진입점
 */

import {
    getPotentialUpgradeRate,
    getPotentialGuaranteeCount,
    getPotentialResetCost,
    getAdditionalPotentialUpgradeRate,
    getAdditionalPotentialResetCost,
} from '../cube_db';
import { isPensalirItem } from '../utils/item_classifier';

import { PotentialEvaluation, EquipmentType, PotentialGrade, PotentialType } from './types';
import { evaluateWeaponMain, evaluateWeaponAdditional } from './weapon';
import { evaluateEmblem } from './emblem';
import { evaluateArmorAccessory } from './armor';
import {
    getCeilingCost,
    getEvaluationGrade,
    generateEvaluation,
    generateWeaponAdditionalRecommendation,
    generateEmblemRecommendation,
    generateGeneralRecommendation,
} from './evaluation';

/**
 * 옵션 평가 (장비 타입별 분기)
 */
function evaluateOptions(
    type: PotentialType,
    currentGrade: string,
    options: string[],
    equipmentType: string,
    itemSlot?: string,
    job?: string
): { goodOptions: string[], optionsScore: number } {
    if (equipmentType === '무기') {
        if (type === 'additional') {
            return evaluateWeaponAdditional(currentGrade, options);
        } else {
            return evaluateWeaponMain(currentGrade, options);
        }
    } else if (equipmentType === '엠블렘') {
        return evaluateEmblem(type, options);
    } else if (equipmentType === '보조무기') {
        return evaluateEmblem(type, options);
    } else {
        return evaluateArmorAccessory(options, type, currentGrade, itemSlot, job);
    }
}

/**
 * 추천 생성 (장비 타입별 분기)
 */
function generateRecommendation(
    type: string,
    grade: string,
    equipmentType: string,
    score: number,
    goodOptions: string[],
    ceilingCost: number,
    itemSlot?: string,
    itemLevel?: number,
    job?: string,
    statPct?: number  // 주스탯 % 추가
): string {
    if (equipmentType === '무기' && type === 'additional') {
        return generateWeaponAdditionalRecommendation(grade, score, goodOptions);
    } else if (equipmentType === '엠블렘' || equipmentType === '보조무기') {
        return generateEmblemRecommendation(type, score, goodOptions);
    } else {
        return generateGeneralRecommendation(
            grade,
            score,
            equipmentType,
            type,
            goodOptions,
            ceilingCost,
            itemSlot,
            itemLevel,
            job,
            statPct  // statPct 전달
        );
    }
}

/**
 * 잠재능력 평가 메인 함수
 */
export function evaluatePotential(
    type: PotentialType,
    currentGrade: PotentialGrade,
    options: string[],
    itemLevel: number,
    equipmentType: EquipmentType,
    itemSlot?: string,
    itemName?: string,
    job?: string
): PotentialEvaluation {
    // 펜살리르 아이템은 평가 스킵
    if (itemName && isPensalirItem(itemName)) {
        return {
            current_grade: currentGrade,
            target_grade: '레전드리',
            upgrade_rate: 0,
            ceiling_count: 0,
            ceiling_cost: 0,
            avg_cost: 0,
            options_score: 0,
            good_options: [],
            recommendation: '펜살리르 장비는 교체를 권장합니다.',
            evaluation: '교체 권장',
        };
    }

    // 옵션 평가
    const evaluationResult = evaluateOptions(
        type,
        currentGrade,
        options,
        equipmentType,
        itemSlot,
        job
    );

    const goodOptions = evaluationResult.goodOptions;
    const optionsScore = evaluationResult.optionsScore;
    const statPct = evaluationResult.statPct || 0;  // statPct 추출 (없으면 0)

    // 큐브 비용 계산
    let targetGrade: '레어' | '에픽' | '유니크' | '레전드리' | '특수' = '레전드리';
    if (currentGrade === '레어') targetGrade = '에픽';
    else if (currentGrade === '에픽') targetGrade = '유니크';
    else if (currentGrade === '유니크') targetGrade = '레전드리';
    else targetGrade = currentGrade;

    let upgradeRate = 0;
    let ceilingCount = 0;
    let ceilingCost = 0;

    if (currentGrade !== '레전드리') {
        if (type === 'main') {
            upgradeRate = getPotentialUpgradeRate(currentGrade);
            ceilingCount = getPotentialGuaranteeCount(currentGrade);
        } else {
            upgradeRate = getAdditionalPotentialUpgradeRate(currentGrade);
            ceilingCount = 100; // 에디셔널은 고정
        }

        if (currentGrade !== '레전드리' && currentGrade !== '특수') {
            ceilingCost = getCeilingCost(type, currentGrade, targetGrade, itemLevel);
        }
    }

    const avgCost = upgradeRate > 0 ? Math.round(ceilingCost / upgradeRate) : 0;

    // 평가 및 추천 생성
    const evaluation = getEvaluationGrade(optionsScore);  // 짧은 등급 ("준수", "좋음")
    const recommendation = generateRecommendation(
        type,
        currentGrade,
        equipmentType,
        optionsScore,
        goodOptions,
        ceilingCost,
        itemSlot,
        itemLevel,
        job,
        statPct  // statPct 전달
    );

    return {
        current_grade: currentGrade,
        target_grade: targetGrade,
        upgrade_rate: upgradeRate,
        ceiling_count: ceilingCount,
        ceiling_cost: ceilingCost,
        avg_cost: avgCost,
        options_score: optionsScore,
        good_options: goodOptions,
        recommendation,
        evaluation,
    };
}
