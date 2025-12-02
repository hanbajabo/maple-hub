
/**
 * 🧪 공통 진단 로직 (Common Diagnosis)
 * - 에픽 등급 잠재능력 진단 등 여러 부위에서 공통으로 쓰이는 로직
 */

import { isPensalirItem } from '../../utils/item_classifier';
import { getJobMainStat } from '../../job_utils';
import { MAIN_POTENTIAL_STAT } from '../../config/unified_criteria';

/**
 * 펜살리르 장비인지 체크하고, 맞다면 교체 권장 메시지 반환
 * @returns 펜살리르면 경고 메시지 배열, 아니면 null
 */
export function checkPensalirAndWarn(itemName: string, itemType: 'weapon' | 'armor'): string[] | null {
    if (!isPensalirItem(itemName)) return null; // 펜살리르 아님

    // 모자/한벌옷 특별 처리 (루타비스 추천)
    const isHatOverall = itemName.includes('모자') || itemName.includes('한벌옷');

    if (itemType === 'weapon') {
        return [`[교체 권장] 펜살리르 무기에 더 이상 투자는 비효율적입니다. 아케인셰이드 무기로 교체하세요.`];
    } else if (isHatOverall) {
        return [`[교체 권장] 펜살리르 모자/한벌옷은 루타비스(카루타) 세트로 교체하는 것을 강력 추천합니다.`];
    } else {
        return [`[교체 권장] 펜살리르 장비는 성능이 부족합니다. 앱솔랩스/아케인셰이드로 교체하세요.`];
    }
}


export function diagnoseEpicPotential(potentialGrade: string, potentials: string[], job?: string, isEndGameItem: boolean = false): string[] {
    const comments: string[] = [];

    if (potentialGrade === '에픽') {
        let statPct = 0;
        let attPct = 0;
        let magicPct = 0;

        // 직업 정보로 주스탯 결정
        const mainStats = job ? getJobMainStat(job) : [];
        const hasJobInfo = mainStats.length > 0;

        potentials.forEach(line => {
            if (!line) return;
            if (line.includes('공격력') && line.includes('%')) attPct += parseInt(line.replace(/[^0-9]/g, '')) || 0;
            if (line.includes('마력') && line.includes('%')) magicPct += parseInt(line.replace(/[^0-9]/g, '')) || 0;

            // 올스탯은 항상 카운트
            if (line.includes('올스탯') && line.includes('%')) {
                const val = parseInt(line.replace(/[^0-9]/g, '')) || 0;
                statPct += val;
            }
            // 직업 정보가 있으면 주스탯만 카운트
            else if (hasJobInfo) {
                const isMainStat = mainStats.some(stat => line.includes(stat) && line.includes('%'));
                if (isMainStat) {
                    const val = parseInt(line.replace(/[^0-9]/g, '')) || 0;
                    statPct += val;
                }
            }
            // 직업 정보가 없으면 기존 로직 (각 줄의 최대값)
            else {
                const str = line.includes('STR') && line.includes('%') ? parseInt(line.replace(/[^0-9]/g, '')) || 0 : 0;
                const dex = line.includes('DEX') && line.includes('%') ? parseInt(line.replace(/[^0-9]/g, '')) || 0 : 0;
                const int = line.includes('INT') && line.includes('%') ? parseInt(line.replace(/[^0-9]/g, '')) || 0 : 0;
                const luk = line.includes('LUK') && line.includes('%') ? parseInt(line.replace(/[^0-9]/g, '')) || 0 : 0;
                statPct += Math.max(str, dex, int, luk);
            }
        });

        if (statPct >= MAIN_POTENTIAL_STAT.EPIC.UNIQUE_LEVEL) {
            comments.push(`[유니크급 효율] 에픽 등급이지만 주스탯 <b>${statPct}%</b> 이상으로 유니크 2줄급 성능을 냅니다. 훌륭합니다.`);
        } else if (statPct >= MAIN_POTENTIAL_STAT.EPIC.DECENT) {
            comments.push(`[가성비 최강] 에픽 등급에서 주스탯 <b>${statPct}%</b>! 유니크 부럽지 않은 최고의 효율입니다.`);
        } else if (statPct >= MAIN_POTENTIAL_STAT.EPIC.PASS) {
            comments.push(`[에픽 정석] 주스탯 <b>${statPct}%</b>로 깔끔하게 맞추셨네요. 가성비 구간 졸업입니다.`);
        } else if (statPct >= MAIN_POTENTIAL_STAT.EPIC.GROWTH) {
            comments.push(`[성장 교차점] 주스탯 <b>${statPct}%</b>는 임시용입니다. 유니크 등급업을 통해 <b>주스탯 ${MAIN_POTENTIAL_STAT.EPIC.UNIQUE_LEVEL}% 이상</b>을 목표로 하세요.`);
        } else if (attPct >= MAIN_POTENTIAL_STAT.EPIC.GROWTH || magicPct >= MAIN_POTENTIAL_STAT.EPIC.GROWTH) {
            comments.push(`[무기/엠블 에픽] 공/마 <b>${Math.max(attPct, magicPct)}%</b>는 나쁘지 않지만, 유니크 이상으로 가서 공/마 두 줄을 노려보세요.`);
        } else {
            comments.push(`[등급업 권장] 현재 옵션으로는 한계가 명확합니다. 유니크 등급으로 올려서 <b>주스탯 ${MAIN_POTENTIAL_STAT.EPIC.UNIQUE_LEVEL}% 이상</b>을 챙겨주세요.`);
        }
    }

    return comments;
}
