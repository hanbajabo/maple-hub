/**
 * 잠재능력 평가 및 추천 생성 로직
 */

import {
    getPotentialUpgradeRate,
    getPotentialGuaranteeCount,
    getPotentialResetCost,
    POTENTIAL_CEILING_COSTS,
    getAdditionalPotentialUpgradeRate,
    getAdditionalPotentialResetCost,
    ADDITIONAL_POTENTIAL_CEILING_COSTS,
} from '../cube_db';
import { isPensalirItem } from '../utils/item_classifier';
import {
    WEAPON_ADDITIONAL_SCORE,
    MAIN_POTENTIAL_STAT,
    ADDITIONAL_POTENTIAL_STAT,
} from '../config/unified_criteria';
import { PotentialType, PotentialGrade, EquipmentType } from './types';

/**
 * 큐브 천장 비용 계산
 */
export function getCeilingCost(
    type: PotentialType,
    from: '레어' | '에픽' | '유니크',
    to: '에픽' | '유니크' | '레전드리',
    level: number
): number {
    if (type === 'main') {
        const key = `${from}_to_${to}` as keyof typeof POTENTIAL_CEILING_COSTS;
        return POTENTIAL_CEILING_COSTS[key] || 0;
    } else {
        const key = `${from}_to_${to}` as keyof typeof ADDITIONAL_POTENTIAL_CEILING_COSTS;
        return ADDITIONAL_POTENTIAL_CEILING_COSTS[key] || 0;
    }
}

/**
 * 평가 메시지 생성
 */
export function generateEvaluation(
    type: PotentialType,
    grade: string,
    equipmentType: string,
    score: number,
    goodOptions: string[]
): string {
    if (score >= 90) return '종결급 옵션입니다. 더 이상 큐브를 돌릴 필요가 없습니다.';
    if (score >= 70) return '꽤 좋은 옵션입니다. 실전에서 충분히 사용 가능합니다.';
    if (score >= 50) return '준수한 옵션입니다. 만족하셔도 됩니다.';
    if (score >= 30) return '보통 수준의 옵션입니다. 개선의 여지가 있습니다.';
    return '아쉬운 옵션입니다. 큐브 작업을 추천합니다.';
}

/**
 * 무기 에디셔널 추천 생성
 */
export function generateWeaponAdditionalRecommendation(
    grade: string,
    score: number,
    goodOptions: string[]
): string {
    if (grade === '레전드리') {
        if (score >= WEAPON_ADDITIONAL_SCORE.LEGENDARY.EXCELLENT) {
            return '공/마% 3줄! 완벽한 에디셔널입니다. 졸업하셔도 됩니다.';
        } else if (score >= WEAPON_ADDITIONAL_SCORE.LEGENDARY.DECENT) {
            return '2줄 이상 유효 옵션! 실전에서 충분히 사용 가능합니다.';
        }
        return '레전드리 에디셔널이지만 유효 옵션이 부족합니다. 공/마% 2~3줄을 목표로 해보세요.';
    } else if (grade === '유니크') {
        if (score >= WEAPON_ADDITIONAL_SCORE.UNIQUE.EXCELLENT) {
            return '유니크 3줄 완벽! 레전드리 급업 전까지 충분합니다.';
        } else if (score >= WEAPON_ADDITIONAL_SCORE.UNIQUE.DECENT) {
            return '2줄 유효! 가성비 좋은 옵션입니다.';
        }
    }
    return '에디셔널 개선이 필요합니다.';
}

/**
 * 엠블렘 추천 생성
 */
export function generateEmblemRecommendation(
    type: string,
    score: number,
    goodOptions?: string[]
): string {
    if (score >= 90) return '완벽한 엠블렘 옵션입니다!';
    if (score >= 60) return '준수한 엠블렘입니다.';
    return '개선이 필요합니다.';
}

/**
 * 일반 장비 추천 생성
 */
export function generateGeneralRecommendation(
    grade: string,
    score: number,
    equipmentType: string,
    type: string,
    goodOptions: string[],
    ceilingCost: number,
    itemSlot?: string,
    itemLevel?: number,
    job?: string
): string {
    if (score >= 90) {
        return `종결급 ${type === 'main' ? '잠재능력' : '에디셔널'}입니다. 더 이상 개선이 필요 없습니다.`;
    }

    if (grade === '레전드리') {
        if (score >= 70) {
            return `꽤 좋은 옵션입니다. 만족하셔도 됩니다.`;
        } else if (score >= 50) {
            return `준수한 수준입니다. 여유가 있다면 조금 더 개선해보세요.`;
        } else {
            return `레전드리치고는 아쉬운 옵션입니다. 큐브 작업을 추천드립니다.`;
        }
    } else if (grade === '유니크') {
        if (score >= 70) {
            return `유니크 등급에서 최고 수준입니다. 레전드리 급업을 목표로 하세요.`;
        } else {
            return `유니크 등급 개선이 필요합니다.`;
        }
    } else if (grade === '에픽') {
        return `에픽 등급입니다. 유니크 이상 등급업을 권장합니다.`;
    }

    return `개선이 필요한 옵션입니다.`;
}
