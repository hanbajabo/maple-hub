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

    options.forEach(opt => {
        if (!opt) return;

        // 주스탯 % 체크
        if (opt.includes('%')) {
            if (opt.includes('올스탯')) {
                const val = parseInt(opt.replace(/[^0-9]/g, '')) || 0;
                statPct += val;
                goodOptions.push(opt);
            } else if (opt.includes('STR') || opt.includes('DEX') || opt.includes('INT') || opt.includes('LUK')) {
                if (isXenon) {
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
                const convertedStat = (val * STAT_CONVERSION.ATT_TO_STAT) / STAT_CONVERSION.STAT_TO_PERCENT;
                statPct += convertedStat;
                goodOptions.push(opt);
            }
        }

        // 쿨타임 감소
        if (itemSlot === '모자' && opt.includes('재사용 대기시간') && opt.includes('초')) {
            const val = parseInt(opt.replace(/[^0-9]/g, '')) || 0;
            if (val >= COOLDOWN_REDUCTION.GOOD) {
                goodOptions.push(opt);
            }
        }

        // 크리티컬 데미지
        if (itemSlot === '장갑' && opt.includes('크리티컬 데미지')) {
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
        if (currentGrade === '레전드리') {
            if (statPct >= ADDITIONAL_POTENTIAL_STAT.LEGENDARY.EXCELLENT) optionsScore = 90;
            else if (statPct >= ADDITIONAL_POTENTIAL_STAT.LEGENDARY.DECENT) optionsScore = 60;
            else optionsScore = (statPct / ADDITIONAL_POTENTIAL_STAT.LEGENDARY.DECENT) * 50;
        }
    }

    return { goodOptions, optionsScore: Math.round(optionsScore) };
}
