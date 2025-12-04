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
 * 짧은 평가 등급 생성 (UI 배지용)
 */
export function getEvaluationGrade(score: number): string {
    if (score >= 100) return '종결';
    if (score >= 90) return '최상급';
    if (score >= 70) return '좋음';
    if (score >= 50) return '준수';
    if (score >= 30) return '보통';
    return '아쉬움';
}

/**
 * 평가 메시지 생성 (구체적 설명용)
 */
export function generateEvaluation(
    type: PotentialType,
    grade: string,
    equipmentType: string,
    score: number,
    goodOptions: string[]
): string {
    if (score >= 100) return '완벽한 옵션입니다. 더 이상 개선이 필요 없습니다.';
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
    const lineCount = goodOptions ? goodOptions.length : 0;

    if (type === 'main') {
        if (lineCount >= 3) {
            return '공격력/마력 % 3줄! 아주 훌륭한 옵션입니다.';
        } else if (lineCount >= 2) {
            return '공격력/마력 % 2줄 이상으로 아주 훌륭한 옵션입니다.';
        } else if (lineCount >= 1) {
            return '공격력/마력 % 위주의 훌륭한 옵션입니다.';
        } else {
            return '개선이 필요합니다. 공격력/마력 %를 목표로 하세요.';
        }
    } else {
        // 에디셔널
        if (lineCount >= 3) {
            return '공격력/마력 % 3줄! 완벽한 에디셔널입니다.';
        } else if (lineCount >= 2) {
            return '공격력/마력 % 위주의 훌륭한 옵션입니다.';
        } else if (lineCount >= 1) {
            return '준수한 에디셔널입니다.';
        } else {
            return '개선이 필요합니다.';
        }
    }
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
    job?: string,
    statPct?: number,  // 주스탯 %
    critDamageLines?: number,  // 크뎀 줄 수
    cooldownSeconds?: number  // 쿨타임 초
): string {
    const isXenon = job && (job.includes('제논') || job.replace(/\s/g, '').includes('제논'));
    const statLabel = isXenon ? '올스탯' : '주스탯';

    if (score >= 100) {
        return `종결급 ${type === 'main' ? '잠재능력' : '에디셔널'}입니다. 더 이상 개선이 필요 없습니다.`;
    }

    if (grade === '레전드리') {
        // 장갑 크뎀 특수 메시지
        if (itemSlot === '장갑' && critDamageLines && critDamageLines >= 3) {
            return `초월급! 크뎀 3줄입니다. 전서버급 장갑 옵션!`;
        } else if (itemSlot === '장갑' && critDamageLines && critDamageLines >= 2) {
            return `종결급! 크뎀 2줄입니다. 최상급 장갑 옵션!`;
        } else if (itemSlot === '장갑' && critDamageLines && critDamageLines >= 1 && statPct && statPct >= 18) {
            const pureStatPct = statPct - (critDamageLines * 15);
            return `최상급! 크뎀 ${critDamageLines}줄 + ${statLabel} ${Math.round(pureStatPct)}%입니다.`;
        }

        // 모자 쿨타임 특수 메시지
        if (itemSlot === '모자' && cooldownSeconds && cooldownSeconds >= 6) {
            return `초월급! 쿨타임 -${cooldownSeconds}초입니다. 전서버급 모자 옵션!`;
        } else if (itemSlot === '모자' && cooldownSeconds && cooldownSeconds >= 4) {
            return `종결급! 쿨타임 -${cooldownSeconds}초입니다. 최상급 모자 옵션!`;
        }

        // 일반 주스탯 메시지
        if (type === 'main' && statPct !== undefined && statPct >= 30) {
            return `종결! ${statLabel} ${statPct}% 이상입니다.`;
        } else if (type === 'main' && statPct !== undefined && statPct >= 21) {
            return `좋음! ${statLabel} 2줄(21% 이상)입니다.`;
        } else if (type === 'main' && statPct !== undefined && statPct >= 15) {
            return `준수! ${statLabel} ${statPct}%입니다.`;
        } else if (score >= 70) {
            return `꽤 좋은 옵션입니다. 만족하셔도 됩니다.`;
        } else if (score >= 50) {
            return `준수한 수준입니다. 여유가 있다면 조금 더 개선해보세요.`;
        } else {
            return `레전드리치고는 아쉬운 옵션입니다. 큐브 작업을 추천드립니다.`;
        }
    } else if (grade === '유니크') {
        if (type === 'main' && statPct !== undefined && statPct >= 15) {
            return `유효 2줄 이상입니다. 유니크에서 훌륭한 옵션입니다.`;
        } else if (score >= 70) {
            return `유니크 등급에서 최고 수준입니다. 레전드리 급업을 목표로 하세요.`;
        } else {
            return `유효 1줄입니다. 유니크 등급에서는 유효 2줄 이상을 목표로 재설정을 권장합니다.`;
        }
    } else if (grade === '에픽') {
        return `에픽 등급입니다. 유니크 이상 등급업을 권장합니다.`;
    }

    return `개선이 필요한 옵션입니다.`;
}
