
import { EquipmentItem, Issue } from '../types';
import { JOB_RECOMMENDATIONS } from '../../../lib/job_recommendations';

export const evaluateOptimization = (equipment: EquipmentItem[], jobName: string): Issue[] => {
    const issues: Issue[] = [];
    const recommendation = JOB_RECOMMENDATIONS[jobName];

    if (!recommendation) return issues;

    // 1. Hat Diagnosis
    const hat = equipment.find(item => item.item_equipment_slot === '모자');
    if (hat) {
        const potentialOptions = [
            hat.potential_option_1,
            hat.potential_option_2,
            hat.potential_option_3,
            hat.additional_potential_option_1,
            hat.additional_potential_option_2,
            hat.additional_potential_option_3
        ].filter(Boolean);

        let cooldownSeconds = 0;
        potentialOptions.forEach(opt => {
            if (opt && opt.includes('재사용 대기시간')) {
                const match = opt.match(/(\d+)초/);
                if (match) {
                    cooldownSeconds += parseInt(match[1], 10);
                }
            }
        });

        if (recommendation.hat.startsWith('cool_')) {
            const requiredCool = parseInt(recommendation.hat.split('_')[1], 10);
            if (cooldownSeconds < requiredCool) {
                issues.push({
                    type: 'optimization',
                    message: `[최적화] ${jobName} 직업은 쿨타임 감소 모자(-${requiredCool}초 이상) 효율이 매우 좋습니다. (현재: -${cooldownSeconds}초 / 추천: -${requiredCool}초 이상)\n${recommendation.hatNote || ''}`
                });
            }
        }
    }

    // 2. Seed Ring Diagnosis
    const rings = equipment.filter(item => item.item_equipment_slot.includes('반지'));
    const hasRestraint = rings.some(r => r.item_name.includes('리스트레인트 링'));
    const hasContinuous = rings.some(r => r.item_name.includes('컨티뉴어스 링'));

    if (recommendation.ring === 'continuous') {
        if (!hasContinuous) {
            issues.push({
                type: 'optimization',
                message: `[최적화] ${jobName} 직업은 '컨티뉴어스 링' 효율이 가장 좋습니다. (현재 미착용)\n${recommendation.ringNote || ''}`
            });
        }
    } else if (recommendation.ring === 'restraint') {
        if (hasContinuous && !hasRestraint) {
            issues.push({
                type: 'optimization',
                message: `[최적화] ${jobName} 직업은 '리스트레인트 링' 효율이 더 좋습니다. (컨티뉴어스 링보다 추천)\n${recommendation.ringNote || ''}`
            });
        }
    } else if (recommendation.ring === 'switching') {
        if (hasRestraint && !hasContinuous) {
            issues.push({
                type: 'optimization',
                message: `[최적화] ${jobName} 직업은 상황에 따라 '컨티뉴어스 링' 스위칭도 고려해보세요.\n${recommendation.ringNote || ''}`
            });
        } else if (!hasRestraint && hasContinuous) {
            issues.push({
                type: 'optimization',
                message: `[최적화] ${jobName} 직업은 극딜을 위해 '리스트레인트 링' 스위칭도 고려해보세요.\n${recommendation.ringNote || ''}`
            });
        }
    }

    return issues;
};
