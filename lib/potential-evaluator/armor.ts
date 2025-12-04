/**
 * 방어구/장신구 잠재능력 평가 로직
 */

import {
    MAIN_POTENTIAL_STAT,
    ADDITIONAL_POTENTIAL_STAT,
    COOLDOWN_REDUCTION,
    CRIT_DAMAGE_LINES,
    STAT_CONVERSION,
} from '../config/unified_criteria';
import { getJobMainStat, isMagicJob } from '../job_utils';

/**
 * 방어구/장신구 잠재능력 평가
 */
export function evaluateArmorAccessory(
    options: string[],
    type: 'main' | 'additional' = 'main',
    currentGrade: string = '레전드리',
    itemSlot?: string,
    job?: string
) {
    let goodOptions: string[] = [];
    let optionsScore = 0;

    // 주스탯 계산
    let statPct = 0;
    const isXenon = job && (job.includes('제논') || job.replace(/\s/g, '').includes('제논'));
    const isDemon = job && (job.includes('데몬어벤져') || job.includes('데몬 어벤져'));

    // 직업의 주스탯 가져오기
    const mainStats = job ? getJobMainStat(job) : [];

    // 특수 옵션 추적
    let critDamageLines = 0;
    let cooldownSeconds = 0;

    options.forEach(opt => {
        if (!opt) return;

        // 주스탯 % 체크
        if (opt.includes('%')) {
            if (opt.includes('올스탯')) {
                const val = parseInt(opt.replace(/[^0-9]/g, '')) || 0;
                statPct += val;
                goodOptions.push(opt);
            } else if (opt.includes('STR') || opt.includes('DEX') || opt.includes('INT') || opt.includes('LUK')) {
                // 직업의 주스탯과 일치하는 경우만 계산
                const isMainStat = mainStats.some(stat => opt.includes(stat));
                if (isMainStat) {
                    const val = parseInt(opt.replace(/[^0-9]/g, '')) || 0;
                    statPct += val;
                    goodOptions.push(opt);
                }
            } else if (opt.includes('HP') && isDemon) {
                const val = parseInt(opt.replace(/[^0-9]/g, '')) || 0;
                statPct += val;
                goodOptions.push(opt);
            }
        }

        // 레벨당 스탯
        if (opt.includes('기준') && (opt.includes('9레벨') || opt.includes('10레벨'))) {
            const valMatch = opt.match(/\+(\d+)/);
            if (valMatch) {
                const val = parseInt(valMatch[1]);
                const bonus = val >= 2 ? STAT_CONVERSION.LEVEL_STAT_2_TO_PERCENT : STAT_CONVERSION.LEVEL_STAT_1_TO_PERCENT;
                statPct += bonus;
                goodOptions.push(opt);
            }
        }

        // 공/마 상수
        if (!opt.includes('%') && (opt.includes('공격력') || opt.includes('마력'))) {
            const val = parseInt(opt.replace(/[^0-9]/g, '')) || 0;
            if (val >= 3) {
                // 직업에 맞는 공/마만 계산
                const isMagic = job ? isMagicJob(job) : false;
                const isAtt = opt.includes('공격력');
                const isMatt = opt.includes('마력');

                // 직업 정보가 없으면 둘 다 유효, 있으면 해당 직업에 맞는 것만 유효
                if (!job || (isMagic && isMatt) || (!isMagic && isAtt)) {
                    const convertedStat = (val * STAT_CONVERSION.ATT_TO_STAT) / STAT_CONVERSION.STAT_TO_PERCENT;
                    statPct += convertedStat;
                    goodOptions.push(opt);
                }
            }
        }

        // 플랫 스탯 (STR +20 등)
        if (!opt.includes('%') && !opt.includes('공격력') && !opt.includes('마력') && !opt.includes('기준')) {
            if (opt.includes('STR') || opt.includes('DEX') || opt.includes('INT') || opt.includes('LUK')) {
                const isMainStat = mainStats.some(stat => opt.includes(stat));
                if (isMainStat) {
                    const val = parseInt(opt.replace(/[^0-9]/g, '')) || 0;
                    // 스탯 10 = 1%
                    const convertedStat = val / STAT_CONVERSION.STAT_TO_PERCENT;
                    statPct += convertedStat;
                    goodOptions.push(opt);
                }
            }
        }


        // 쿨타임 감소 (모자 전용)
        if (itemSlot === '모자' && opt.includes('재사용 대기시간') && opt.includes('초')) {
            const val = parseInt(opt.replace(/[^0-9]/g, '')) || 0;
            if (val >= COOLDOWN_REDUCTION.GOOD) {
                cooldownSeconds += val;  // 쿨타임 초 추적
                // 쿨타임 1초당 15% 주스탯 환산 (매우 강력한 옵션이므로)
                statPct += val * 15;
                goodOptions.push(opt);
            }
        }

        // 크리티컬 데미지 (장갑 전용)
        if (itemSlot === '장갑' && opt.includes('크리티컬 데미지')) {
            critDamageLines++;  // 크뎀 줄 수 추적
            statPct += 15;
            goodOptions.push(opt);
        }
    });

    // 점수 계산
    if (type === 'main') {
        if (currentGrade === '레전드리') {
            if (statPct >= MAIN_POTENTIAL_STAT.LEGENDARY.MYTHIC) optionsScore = 100;
            else if (statPct >= MAIN_POTENTIAL_STAT.LEGENDARY.ENDGAME) optionsScore = 90;
            else if (statPct >= MAIN_POTENTIAL_STAT.LEGENDARY.GOOD) optionsScore = 70;
            else if (statPct >= MAIN_POTENTIAL_STAT.LEGENDARY.DECENT) optionsScore = 50;
            else optionsScore = (statPct / MAIN_POTENTIAL_STAT.LEGENDARY.ENDGAME) * 60;
        } else if (currentGrade === '유니크') {
            if (statPct >= MAIN_POTENTIAL_STAT.UNIQUE.EXCELLENT) optionsScore = 90;
            else if (statPct >= MAIN_POTENTIAL_STAT.UNIQUE.DECENT) optionsScore = 60;
            else optionsScore = (statPct / MAIN_POTENTIAL_STAT.UNIQUE.DECENT) * 50;
        }
    } else {
        // 에디셔널: 등급 무관하게 1% = 10점으로 통일하여 직관적인 %급 표시 보장
        optionsScore = statPct * 10;
    }

    return {
        goodOptions,
        optionsScore: Math.round(optionsScore),
        statPct,
        critDamageLines,
        cooldownSeconds
    };
}
