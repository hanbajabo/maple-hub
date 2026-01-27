// @ts-nocheck
/**
 * 무기 잠재능력 평가 로직
 */

import { WEAPON_ADDITIONAL_SCORE } from '../config/unified_criteria';

/**
 * 무기 메인 잠재능력 평가
 */
export function evaluateWeaponMain(grade: string, options: string[]) {
    let totalPoints = 0;
    const goodOptions = options.filter(opt => {
        let points = 0;
        if ((opt.includes('공격력 +') || opt.includes('마력 +')) && opt.includes('%')) points = 3;
        else if (opt.includes('보스 몬스터')) points = 3;
        else if (opt.includes('몬스터 방어율')) points = 2;
        else if (opt.includes('데미지') && !opt.includes('보스') && !opt.includes('크리티컬')) points = 1.5;
        else if (opt.includes('STR') || opt.includes('DEX') || opt.includes('INT') || opt.includes('LUK')) points = 1;
        if (points > 0) { totalPoints += points; return true; }
        return false;
    });

    let optionsScore = (totalPoints / 9) * 100;

    if (grade === '레전드리') {
        const iedCount = goodOptions.filter(opt => opt.includes('몬스터 방어율')).length;
        if (iedCount >= 2) optionsScore -= 20;
    }

    return { goodOptions, optionsScore };
}

/**
 * 무기 에디셔널 잠재능력 평가
 */
export function evaluateWeaponAdditional(grade: string, options: string[]) {
    let goodOptions: string[] = [];
    let optionsScore = 0;

    if (grade === '레전드리') {
        let totalPoints = 0;
        goodOptions = options.filter(opt => {
            let points = 0;
            if ((opt.includes('공격력 +') || opt.includes('마력 +')) && opt.includes('%')) points = 3;
            else if (opt.includes('보스 몬스터')) points = 1.5;
            else if (opt.includes('데미지')) points = 1;
            if (points > 0) { totalPoints += points; return true; }
            return false;
        });
        optionsScore = (totalPoints / 9) * 100;
    }
    else if (grade === '유니크') {
        let totalPoints = 0, attPercentCount = 0;
        goodOptions = options.filter(opt => {
            let points = 0;
            if ((opt.includes('공격력 +') || opt.includes('마력 +')) && opt.includes('%')) { points = 3; attPercentCount++; }
            else if (opt.includes('보스 몬스터')) points = 1;
            else if (opt.includes('데미지')) points = 0.5;
            if (points > 0) { totalPoints += points; return true; }
            return false;
        });
        if (attPercentCount >= 3) optionsScore = WEAPON_ADDITIONAL_SCORE.UNIQUE.EXCELLENT;
        else if (attPercentCount >= 2) optionsScore = WEAPON_ADDITIONAL_SCORE.UNIQUE.DECENT;
        else optionsScore = (totalPoints / 9) * 100;
    }
    else if (grade === '에픽') {
        const hasAttPercent = options.some(opt => (opt.includes('공격력 +') || opt.includes('마력 +')) && opt.includes('%'));
        if (hasAttPercent) {
            optionsScore = WEAPON_ADDITIONAL_SCORE.EPIC.PASS;
            goodOptions = options.filter(opt => (opt.includes('공격력 +') || opt.includes('마력 +')) && opt.includes('%'));
        }
    }
    else {
        const hasAtt = options.some(opt => opt.includes('공격력 +') || opt.includes('마력 +'));
        if (hasAtt) {
            goodOptions = options.filter(opt => opt.includes('공격력 +') || opt.includes('마력 +'));
            optionsScore = 20;
        }
    }

    return { goodOptions, optionsScore };
}
