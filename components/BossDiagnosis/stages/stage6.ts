
import { EquipmentItem, Issue } from '../types';
import { JOB_RECOMMENDATIONS } from '../../../lib/job_recommendations';

export const evaluateStage6 = (equipment: EquipmentItem[], jobName: string) => {
    const issues: Issue[] = [];
    const recommendation = JOB_RECOMMENDATIONS[jobName];

    // 추천 데이터가 없으면 통과 처리 (예외 직업 등)
    if (!recommendation) {
        return {
            isPassed: true,
            issues: [],
            stats: {
                hat: 'none',
                ring: 'none',
                cooldownSeconds: 0,
                hasRestraint: false,
                hasContinuous: false
            }
        };
    }

    let hatPassed = true;
    let ringPassed = true;
    let hatStatus = 'pass';
    let ringStatus = 'pass';

    // 1. 쿨뚝 진단
    const hat = equipment.find(item => item.item_equipment_slot === '모자');
    let cooldownSeconds = 0;
    if (hat) {
        const potentialOptions = [
            hat.potential_option_1,
            hat.potential_option_2,
            hat.potential_option_3,
            hat.additional_potential_option_1,
            hat.additional_potential_option_2,
            hat.additional_potential_option_3
        ].filter(Boolean);

        potentialOptions.forEach(opt => {
            if (opt && opt.includes('재사용 대기시간')) {
                const match = opt.match(/(\d+)초/);
                if (match) {
                    cooldownSeconds += parseInt(match[1], 10);
                }
            }
        });
    }

    if (recommendation.hat.startsWith('cool_')) {
        const requiredCool = parseInt(recommendation.hat.split('_')[1], 10);
        // 사용자 요청: 쿨감이 필요한 직업은 1초라도 있으면 통과 처리
        if (cooldownSeconds < 1) {
            // 필수 직업인데 쿨뚝이 없으면 Fail
            hatPassed = false;
            hatStatus = 'fail';
            issues.push({
                type: 'optimization',
                message: `[쿨뚝] ${jobName} 직업은 쿨타임 감소 모자(-${requiredCool}초 이상)가 필수입니다.`,
                detail: `현재: 쿨타임 감소 옵션 없음 / 추천: -${requiredCool}초 이상\n${recommendation.hatNote || ''}`
            });
        }
    }

    // 2. 시드링 진단
    const rings = equipment.filter(item => item.item_equipment_slot.includes('반지'));
    const hasRestraint = rings.some(r => r.item_name.includes('리스트레인트 링'));
    const hasContinuous = rings.some(r => r.item_name.includes('컨티뉴어스 링'));

    if (recommendation.ring === 'continuous') {
        if (!hasContinuous) {
            ringPassed = false;
            ringStatus = 'fail';
            issues.push({
                type: 'optimization',
                message: `[시드링] ${jobName} 직업은 '컨티뉴어스 링' 효율이 가장 좋습니다.`,
                detail: `현재 컨티뉴어스 링을 착용하지 않았습니다.\n${recommendation.ringNote || ''}`
            });
        }
    } else if (recommendation.ring === 'restraint') {
        // 리레링 추천인데 컨티링만 끼고 있으면 경고 (Fail까진 아니고 Info/Warning)
        // 하지만 여기선 엄격하게 가이드하려면 Fail 줄 수도 있음.
        // 일단 리레링이 없으면 Fail로 처리 (고스펙 기준이므로)
        if (!hasRestraint) {
            ringPassed = false;
            ringStatus = 'fail';
            issues.push({
                type: 'optimization',
                message: `[시드링] ${jobName} 직업은 극딜을 위해 '리스트레인트 링'이 필수입니다.`,
                detail: `현재 리스트레인트 링을 착용하지 않았습니다.\n${recommendation.ringNote || ''}`
            });
        }
    } else if (recommendation.ring === 'switching') {
        // 스위칭 권장이면 둘 중 하나라도 있어야 함
        if (!hasRestraint && !hasContinuous) {
            ringPassed = false;
            ringStatus = 'fail';
            issues.push({
                type: 'optimization',
                message: `[시드링] ${jobName} 직업은 시드링(리레 or 컨티) 사용을 권장합니다.`,
                detail: recommendation.ringNote
            });
        }
    }

    const isPassed = hatPassed && ringPassed;

    return {
        isPassed,
        issues,
        stats: {
            hat: hatStatus,
            ring: ringStatus,
            cooldownSeconds,
            hasRestraint,
            hasContinuous,
            hatNote: recommendation.hatNote,
            ringNote: recommendation.ringNote,
            recommendedHatType: recommendation.hat,
            recommendedRingType: recommendation.ring
        }
    };
};
