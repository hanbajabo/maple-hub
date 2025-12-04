/**
 * 엠블렘 잠재능력 평가 로직
 */

/**
 * 엠블렘 잠재능력 평가
 */
export function evaluateEmblem(type: string, options: string[]) {
    let goodOptions: string[] = [];
    let optionsScore = 0;

    if (type === 'additional') {
        goodOptions = options.filter(opt => (opt.includes('공격력 +') || opt.includes('마력 +')) && opt.includes('%'));
        optionsScore = (goodOptions.length / 3) * 100;
    } else {
        let iedCount = 0;
        goodOptions = options.filter(opt => {
            if ((opt.includes('공격력 +') || opt.includes('마력 +')) && opt.includes('%')) return true;
            if (opt.includes('몬스터 방어율')) { iedCount++; return iedCount <= 1; }
            if (opt.includes('보스') && opt.includes('몬스터') && opt.includes('데미지')) return true;
            return false;
        });
        optionsScore = (goodOptions.length / 3) * 100;
    }

    return { goodOptions, optionsScore, allOptions: options };
}
