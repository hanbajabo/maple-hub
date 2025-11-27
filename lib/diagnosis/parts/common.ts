
/**
 * 🧪 공통 진단 로직 (Common Diagnosis)
 * - 에픽 등급 잠재능력 진단 등 여러 부위에서 공통으로 쓰이는 로직
 */

export function diagnoseEpicPotential(potentialGrade: string, potentials: string[], isEndGameItem: boolean = false): string[] {
    const comments: string[] = [];

    if (potentialGrade === '에픽') {
        let statPct = 0;
        let attPct = 0;
        let magicPct = 0;

        potentials.forEach(line => {
            if (!line) return;
            if (line.includes('공격력') && line.includes('%')) attPct += parseInt(line.replace(/[^0-9]/g, '')) || 0;
            if (line.includes('마력') && line.includes('%')) magicPct += parseInt(line.replace(/[^0-9]/g, '')) || 0;

            const str = line.includes('STR') && line.includes('%') ? parseInt(line.replace(/[^0-9]/g, '')) || 0 : 0;
            const dex = line.includes('DEX') && line.includes('%') ? parseInt(line.replace(/[^0-9]/g, '')) || 0 : 0;
            const int = line.includes('INT') && line.includes('%') ? parseInt(line.replace(/[^0-9]/g, '')) || 0 : 0;
            const luk = line.includes('LUK') && line.includes('%') ? parseInt(line.replace(/[^0-9]/g, '')) || 0 : 0;
            const all = line.includes('올스탯') && line.includes('%') ? parseInt(line.replace(/[^0-9]/g, '')) || 0 : 0;
            statPct += Math.max(str, dex, int, luk) + all;
        });

        if (statPct >= 12) {
            comments.push(`[가성비 최강] 에픽 등급에서 주스탯 <b>${statPct}%</b>! 유니크 부럽지 않은 최고의 효율입니다.`);
        } else if (statPct >= 9) {
            comments.push(`[에픽 정석] 주스탯 <b>${statPct}%</b>로 깔끔하게 맞추셨네요. 가성비 구간 졸업입니다.`);
        } else if (statPct >= 6) {
            comments.push(`[성장 교차점] 주스탯 <b>${statPct}%</b>는 임시용입니다. 유니크 등급업을 통해 <b>주스탯 15% 이상</b>을 목표로 하세요.`);
        } else if (attPct >= 6 || magicPct >= 6) {
            comments.push(`[무기/엠블 에픽] 공/마 <b>${Math.max(attPct, magicPct)}%</b>는 나쁘지 않지만, 유니크 이상으로 가서 공/마 두 줄을 노려보세요.`);
        } else {
            comments.push(`[등급업 권장] 현재 옵션으로는 한계가 명확합니다. 유니크 등급으로 올려서 <b>주스탯 15% 이상</b>을 챙겨주세요.`);
        }
    }

    return comments;
}
