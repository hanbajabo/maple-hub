// @ts-nocheck
/**
 * 잠재능력 평가 및 추천 생성 로직
 */

import {
    getPotentialUpgradeRate,
    getPotentialGuaranteeCount,
    getPotentialResetCost,
    POTENTIAL_CEILING_COSTS,
    getAdditionalPotentialResetCost,
    ADDITIONAL_POTENTIAL_CEILING_COSTS,
} from '../cube_db';
import { isPensalirItem } from '../utils/item_classifier';
import {
    WEAPON_ADDITIONAL_SCORE,
    ADDITIONAL_POTENTIAL_STAT,
    COOLDOWN_REDUCTION,
    CRIT_DAMAGE_LINES,
    STAT_CONVERSION,
} from '../config/unified_criteria';
import { MAIN_POTENTIAL_STAT } from '../config/criteria/potential';
import { getJobMainStat, isMagicJob } from '../job_utils';
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
    grade: string,
    score: number,
    goodOptions?: string[],
    allOptions?: string[],
    equipmentType?: string
): string {
    const options = allOptions || goodOptions || [];

    if (type === 'main') {
        // 메인 잠재: 공/마%, 방무, 보공 분석
        let attCount = 0;
        let iedCount = 0;
        let bossCount = 0;

        options.forEach(opt => {
            if ((opt.includes('공격력') || opt.includes('마력')) && opt.includes('%')) {
                attCount++;
            } else if (opt.includes('몬스터 방어율') && opt.includes('무시')) {
                iedCount++;
            } else if (opt.includes('보스') && opt.includes('데미지')) {
                bossCount++;
            }
        });

        // 방무 과다 (장비 타입에 따라 다른 메시지)
        if (iedCount >= 2) {
            if (equipmentType === '엠블렘') {
                return '쓸만한 옵션이지만, 더 좋은 옵션을 노려볼 수 있습니다. 방어율 무시 옵션이 과도합니다(2줄 이상). 방무 1줄을 공격력%로 바꾸는 것을 강력 추천합니다.';
            } else {
                return '쓸만한 옵션이지만, 더 좋은 옵션을 노려볼 수 있습니다. 방어율 무시 옵션이 과도합니다(2줄 이상). 방무 1줄을 보공이나 공격력%로 바꾸는 것을 강력 추천합니다.';
            }
        }

        // 이상적인 조합
        if (bossCount >= 3) {
            return '보공 3줄 (보보보)! 전 서버급 매물입니다. (단, 공/마 효율 고려 필요)';
        } else if (bossCount >= 2 && attCount >= 1) {
            return '보공 2줄 + 공/마% 1줄 (보보공)! 무기 잠재능력의 정석이자 종결 옵션입니다.';
        } else if (attCount >= 2 && bossCount >= 1) {
            return '공/마% 2줄 + 보공 1줄 (공공보)! 최상급 조합입니다.';
        } else if (attCount >= 3) {
            return '공격력/마력 % 3줄 (공공공)! 보공 효율이 높은 직업에게 최고의 옵션입니다.';
        } else if (attCount + bossCount + iedCount >= 3) {
            return '유효 옵션 3줄 (보방공/보보방 등)을 꽉 채우셨습니다. 졸업급입니다.';
        } else if (attCount >= 2) {
            return '공격력/마력 % 2줄 이상으로 아주 훌륭한 옵션입니다.';
        } else if (attCount >= 1) {
            return '공/마% 1줄로 준수합니다. 여유가 있다면 2줄 이상을 목표로 하세요.';
        } else if (bossCount >= 1 || iedCount >= 1) {
            return '보공/방무만 있습니다. 공격력/마력 %를 최우선으로 목표하세요.';
        } else {
            return '개선이 필요합니다. 공격력/마력 %를 목표로 하세요.';
        }
    } else {
        // 에디셔널: 등급별로 다른 메시지
        const lineCount = goodOptions ? goodOptions.length : 0;

        if (grade === '레전드리') {
            if (lineCount >= 3) {
                // 이탈 체크
                const values = goodOptions!.map(opt => {
                    const match = opt.match(/\+(\d+)%/);
                    return match ? parseInt(match[1]) : 0;
                });
                const maxCount = values.filter(v => v >= 12).length;

                if (maxCount >= 3) {
                    return '공격력/마력 % 3줄 올이탈(12%+12%+12%)! 신화급 에디셔널입니다.';
                } else if (maxCount >= 2) {
                    return '공격력/마력 % 3줄 쌍이탈! 종결급 에디셔널입니다.';
                } else {
                    return '공격력/마력 % 3줄! 완벽한 에디셔널입니다.';
                }
            } else if (lineCount >= 2) {
                return '공격력/마력 % 2줄! 아주 훌륭한 에디셔널입니다. 충분히 사용 가능합니다.';
            } else if (lineCount >= 1) {
                return '공/마% 1줄입니다. 준수한 수준입니다.';
            } else {
                return '개선이 필요합니다. 공/마%를 목표로 하세요.';
            }
        } else if (grade === '유니크') {
            if (lineCount >= 3) {
                return '공격력/마력 % 3줄! 유니크에서 완벽합니다. 레전드리 급업 전까지 사용하세요.';
            } else if (lineCount >= 2) {
                return '공/마% 2줄로 통과 기준을 만족합니다. 더 높은 스펙업은 공/마% 3줄이나 레전드리 등급업 후 공/마% 2줄을 목표로 하세요.';
            } else if (lineCount >= 1) {
                return '공/마% 1줄입니다. 괜찮은 수준입니다.';
            } else {
                return '개선이 필요합니다. 공/마% 2줄 이상을 목표로 하세요.';
            }
        } else {
            // 에픽 이하
            return '에픽 등급입니다. 유니크 이상으로 급업을 권장합니다.';
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

    if (score >= 100 && type !== 'main') {
        const equivalentPct = Math.floor(score / 10);
        return `종결급! 주스탯 ${equivalentPct}%급 에디셔널입니다. 더 이상 개선이 필요 없습니다.`;
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
        if (type === 'main') {
            // 이탈 여부 체크
            let primeLines = 0;
            // 에테르넬(250제)은 잠재능력 수치가 1% 높음 (12% -> 13%, 9% -> 10%)
            const isEthernal = itemLevel && itemLevel >= 250;

            goodOptions.forEach(opt => {
                const match = opt.match(/(\d+)%/);
                if (match) {
                    const val = parseInt(match[1]);
                    // 제논 Prime Line 기준
                    if (isXenon) {
                        // 에테르넬(250제): 올스탯 10% 이상
                        // 일반(200제 이하): 올스탯 9% 이상
                        const xenonThreshold = isEthernal ? 10 : 9;
                        if (opt.includes('올스탯') && val >= xenonThreshold) primeLines++;
                    } else {
                        // 일반 직업 Prime Line 기준
                        // 에테르넬(250제): 주스탯 13% 이상
                        // 일반(200제 이하): 주스탯 12% 이상
                        const threshold = isEthernal ? 13 : 12;
                        if (val >= threshold) primeLines++;
                    }
                }
            });

            // 기준값 가져오기
            // 200제(아케인) 제외, 201~250제(에테르넬) 적용
            const isHighLevel = itemLevel && itemLevel > 200;
            const criteria = isXenon
                ? (isHighLevel ? MAIN_POTENTIAL_STAT.XENON_LEGENDARY_HIGH_LEVEL : MAIN_POTENTIAL_STAT.XENON_LEGENDARY)
                : (isHighLevel ? MAIN_POTENTIAL_STAT.LEGENDARY_HIGH_LEVEL : MAIN_POTENTIAL_STAT.LEGENDARY);

            // 제논 전용 로직
            if (isXenon && statPct !== undefined) {
                if (statPct >= criteria.MYTHIC) { // 30 or 27
                    return `신화! 올스탯 ${statPct}% (3줄/올이탈)입니다. 제논의 끝판왕 옵션!`;
                } else if (statPct >= criteria.ENDGAME_HIGH) { // 27 or 24
                    return `종결! 올스탯 ${statPct}% (3줄)입니다. 제논의 꿈의 옵션!`;
                } else if (statPct >= criteria.ENDGAME) { // 24 or 21
                    return `최상급! 올스탯 ${statPct}%입니다. 아주 훌륭합니다.`;
                }
            }

            if (statPct !== undefined && statPct >= criteria.ENDGAME) { // 30 or 33
                if (primeLines >= 3) return `초월! ${statLabel} ${statPct}% (올이탈)입니다. 전서버급 옵션!`;
                if (primeLines >= 2) return `종결! ${statLabel} ${statPct}% (쌍이탈)입니다.`;
                return `종결! ${statLabel} ${statPct}% 이상입니다.`;
            } else if (statPct !== undefined && statPct >= 27) {
                return `최상급! ${statLabel} 3줄(${statPct}%)입니다.`;
            } else if (statPct !== undefined && statPct >= criteria.GOOD) {
                return `좋음! ${statLabel} 2줄(${statPct}%)입니다.`;
            } else if (statPct !== undefined && statPct >= criteria.DECENT) {
                return `준수! ${statLabel} ${statPct}%입니다.`;
            } else if (score >= 70) {
                return `꽤 좋은 옵션입니다. 만족하셔도 됩니다.`;
            } else if (score >= 50) {
                return `준수한 수준입니다. 여유가 있다면 조금 더 개선해보세요.`;
            } else {
                return `레전드리치고는 아쉬운 옵션입니다. 큐브 작업을 추천드립니다.`;
            }
        } else {
            // 에디셔널 레전드리
            const equivalentPct = Math.floor(score / 10);
            if (score >= 90) {
                return `최상급! 주스탯 ${equivalentPct}%급 에디셔널입니다. 더 이상 바랄 게 없습니다.`;
            } else if (score >= 60) {
                return `좋음! 주스탯 ${equivalentPct}%급입니다. 쓸만한 옵션이지만 조금 더 욕심내볼 만합니다.`;
            } else {
                return `아쉬움! 주스탯 ${equivalentPct}%급입니다. 레전드리 등급에서는 10%급 이상을 목표로 해보세요.`;
            }
        }
    } else if (grade === '유니크') {
        if (type === 'main') {
            // 제논 유니크 전용 로직
            if (isXenon && statPct !== undefined) {
                const criteria = MAIN_POTENTIAL_STAT.XENON_UNIQUE;
                if (statPct >= criteria.LEGENDARY_TIER) { // 18%
                    return `탈유니크급! 올스탯 ${statPct}%입니다. 레전드리 부럽지 않은 최상급 옵션!`;
                } else if (statPct >= criteria.TIER1) { // 15%
                    return `1티어! 올스탯 ${statPct}%입니다. 유니크 졸업급 옵션입니다.`;
                } else if (statPct >= criteria.STANDARD) { // 12%
                    return `준수! 올스탯 ${statPct}% (정옵)입니다. 실전에서 충분히 사용 가능합니다.`;
                } else {
                    return `아쉬움! 올스탯 ${criteria.STANDARD}% (6/3/3) 이상을 목표로 재설정을 권장합니다.`;
                }
            }

            // 일반 유니크 로직
            if (statPct !== undefined && statPct >= 27) {
                return `유니크 종결! ${statLabel} ${Math.round(statPct)}%입니다. 레전드리 3줄급 옵션으로 쭉 사용하셔도 좋습니다.`;
            } else if (statPct !== undefined && statPct >= 21) {
                return `우수! ${statLabel} ${Math.round(statPct)}%입니다. 유니크에서 최상급 옵션입니다.`;
            } else if (statPct !== undefined && statPct >= 15) {
                return `좋음! ${statLabel} ${Math.round(statPct)}%입니다. 유니크에서 훌륭한 옵션입니다.`;
            } else {
                return `유니크 등급에서는 ${statLabel} 15% 이상을 목표로 재설정을 권장합니다.`;
            }
        } else {
            // 유니크 에디셔널
            const equivalentPct = Math.floor(score / 10);
            if (score >= 130) {
                return `유니크 종결! 주스탯 ${equivalentPct}%급 에디셔널입니다. 레전드리 부럽지 않은 최상급 옵션입니다.`;
            } else if (score >= 100) {
                return `좋음! 주스탯 ${equivalentPct}%급입니다. 유니크 등급에서 아주 훌륭한 가성비 옵션입니다.`;
            } else if (score >= 70) {
                return `준수! 주스탯 ${equivalentPct}%급입니다. 쓸만한 옵션이지만 조금 더 욕심내볼 만합니다.`;
            } else {
                return `아쉬움! 주스탯 ${equivalentPct}%급입니다. 유니크 등급에서는 10%급 이상을 목표로 해보세요.`;
            }
        }
    } else if (grade === '에픽' || grade === '레어') {
        if (type === 'main') {
            // 제논 에픽/레어 전용 로직
            if (isXenon) {
                // 올스탯% 체크
                if (statPct !== undefined && statPct >= 6) {
                    return `에픽 상급! 올스탯 ${statPct}%입니다. 아주 훌륭합니다.`;
                } else if (statPct !== undefined && statPct >= 3) {
                    return `에픽 정옵! 올스탯 ${statPct}%입니다. 무난하게 사용 가능합니다.`;
                }

                // 올스탯이 낮으면 공격력/마력 체크 (저레벨 구간 대체제)
                let attCount = 0;
                goodOptions.forEach(opt => {
                    if (opt.includes('공격력') || opt.includes('마력')) attCount++;
                });

                if (attCount >= 1) {
                    return `좋음! 제논은 저등급에서 올스탯 수급이 어렵습니다. 공격력/마력 옵션은 훌륭한 대체제입니다.`;
                }

                return `아쉬움! 올스탯 3% 이상이나 공격력/마력 옵션을 노려보세요.`;
            }

            // 일반 에픽/레어 로직
            if (statPct !== undefined && statPct >= 12) {
                return `${grade} 종결! ${statLabel} ${Math.round(statPct)}%입니다. ${grade} 등급에서 볼 수 있는 최고 수준의 옵션입니다. 더 높은 스펙업을 위해서는 유니크 이상 아이템을 노려보세요.`;
            } else if (statPct !== undefined && statPct >= 9) {
                return `우수! ${statLabel} ${Math.round(statPct)}%입니다. ${grade} 등급에서 아주 훌륭한 옵션입니다. 더 높은 스펙업을 위해서는 유니크 이상 아이템을 노려보세요.`;
            } else if (statPct !== undefined && statPct >= 6) {
                return `준수! ${statLabel} ${Math.round(statPct)}%입니다. 임시로 사용하기에 적절합니다.`;
            } else {
                return `${grade} 등급에서는 ${statLabel} 9% 이상을 목표로 하거나, 유니크 이상 등급업을 권장합니다.`;
            }
        } else {
            // 에픽/레어 에디셔널
            const equivalentPct = Math.floor(score / 10);
            if (score >= 120) {
                return `최상급! 주스탯 ${equivalentPct}%급 ${grade} 종결 옵션입니다. 이대로 쭉 사용하셔도 좋지만, 더 높은 스펙업을 위해서는 유니크 이상 아이템을 노려보세요.`;
            } else if (score >= 80) {
                return `좋음! 주스탯 ${equivalentPct}%급입니다. 가성비 세팅으로 아주 좋습니다. 더 좋은 스펙업을 위해서는 에디에 공/마 1줄이나 스텟% 1줄을 추가로 노려보세요.`;
            } else if (score >= 40) {
                return `준수! 주스탯 ${equivalentPct}%급입니다. 유효 옵션이 포함되어 있어 가성비 좋게 사용할 수 있습니다.`;
            } else {
                return `아쉬움! 주스탯 ${equivalentPct}%급입니다. 공격력/마력 옵션을 노리거나 유니크 이상 등급업을 권장합니다.`;
            }
        }
    }

    return `개선이 필요한 옵션입니다.`;
}
