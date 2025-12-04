import { pick } from './helpers';
import { getJobMainStat } from '../job_utils';

/**
 * 에디셔널 잠재능력 분석
 */
export function analyzeAdditionalPotential(
    item: any,
    addPotentials: string[],
    addPotentialGrade: string,
    isMagic: boolean,
    isXenon: boolean,
    job?: string
): string[] {
    const comments: string[] = [];
    if (addPotentialGrade === '없음') return comments;

    const adiPrefix = "에디셔널은";
    const slot = item.item_equipment_slot || '';

    // 무보엠 (무기/보조무기/엠블렘)
    if (slot === '무기' || slot === '보조무기' || slot === '엠블렘') {
        let addAttLines = 0;
        let addBossLines = 0;

        addPotentials.forEach(line => {
            if (line) {
                if ((isMagic ? line.includes('마력') : line.includes('공격력')) && line.includes('%')) addAttLines++;
                if (line.includes('보스 몬스터')) addBossLines++;
            }
        });

        if (addAttLines >= 3) {
            comments.push(pick([
                `${adiPrefix} <b>${isMagic ? '마력' : '공격력'} 3줄</b>...?! 이건 <b>기적</b>입니다.`,
                `${adiPrefix} <b>${isMagic ? '마력' : '공격력'} 3줄</b>! 더 이상 바랄 게 없는 완벽한 옵션입니다.`
            ]));
        } else if (addAttLines >= 2) {
            comments.push(pick([
                `${adiPrefix} <b>${isMagic ? '마력' : '공격력'} 2줄</b>! 아주 훌륭합니다. 스펙업의 정석이죠.`,
                `${adiPrefix} <b>${isMagic ? '마력' : '공격력'} 2줄</b>, 실전에서 차고 넘치는 성능입니다.`
            ]));
        } else if (addAttLines === 1) {
            comments.push(`${adiPrefix} <b>${isMagic ? '마력' : '공격력'} 1줄</b>은 국룰이죠. 든든하게 스펙을 받쳐주고 있습니다.`);
        }
    }
    // 방어구/장신구
    else {
        const mainStats = getJobMainStat(job || "");
        let validStatLines = 0;
        let validAttFlat = 0;
        let hasAdiCoolReduce = false;
        let adiCritDmgLines = 0;
        let adiStatPct = 0;

        addPotentials.forEach(line => {
            if (!line) return;

            // 주스탯 % 체크
            if (line.includes('%')) {
                let isValid = false;
                if (line.includes('올스탯')) isValid = true;
                else if (line.includes('HP') && line.includes('%') && job?.includes('데몬어벤져')) isValid = true;
                else {
                    const isMainStat = mainStats.some((stat: string) => line.includes(stat));
                    if (isMainStat) isValid = true;
                    if (isXenon && (line.includes('STR') || line.includes('DEX') || line.includes('LUK'))) isValid = true;
                }

                if (isValid) {
                    validStatLines++;
                    const val = parseInt(line.replace(/[^0-9]/g, '')) || 0;
                    adiStatPct += val;
                }
            }

            // 레벨당 스탯
            if (line.includes('캐릭터 기준 9레벨 당') || line.includes('캐릭터 기준 10레벨 당')) {
                const valMatch = line.match(/\+(\d+)/);
                const val = valMatch ? parseInt(valMatch[1]) : 0;
                let bonusPct = 0;
                if (val >= 2) bonusPct = 6;
                else if (val >= 1) bonusPct = 3;

                let isValid = false;
                if (line.includes('STR') && mainStats.includes('STR')) isValid = true;
                if (line.includes('DEX') && mainStats.includes('DEX')) isValid = true;
                if (line.includes('INT') && mainStats.includes('INT')) isValid = true;
                if (line.includes('LUK') && mainStats.includes('LUK')) isValid = true;
                if (line.includes('HP')) isValid = true;

                if (isValid) {
                    validStatLines++;
                    adiStatPct += bonusPct;
                }
            }

            // 공/마 상수
            const isAttLine = isMagic ? line.includes('마력') : line.includes('공격력');
            if (isAttLine && !line.includes('%')) {
                const val = parseInt(line.replace(/[^0-9]/g, '')) || 0;
                validAttFlat += val;
            }

            // 쿨타임
            if (slot === '모자' && line.includes('재사용 대기시간')) hasAdiCoolReduce = true;

            // 크뎀
            if (slot === '장갑' && line.includes('크리티컬 데미지')) adiCritDmgLines++;
        });

        // 공/마 상수 환산
        if (validAttFlat > 0) {
            const convertedStatPct = (validAttFlat * 4) / 10;
            adiStatPct += convertedStatPct;
        }
        adiStatPct = Math.round(adiStatPct);

        const attType = isMagic ? '마력' : '공격력';

        if (adiCritDmgLines >= 2) {
            comments.push(`${adiPrefix} <b>쌍크뎀</b>...?! 이건 말이 안 됩니다. 전 서버급 에디셔널입니다.`);
        } else if (adiCritDmgLines === 1) {
            comments.push(`${adiPrefix} <b>크리티컬 데미지</b>! 장갑 에디셔널의 종결 옵션입니다.`);
        } else if (hasAdiCoolReduce) {
            comments.push(`${adiPrefix} <b>쿨타임 감소</b> 옵션이 붙어있습니다! 에디셔널에서 챙길 수 있는 최고의 유효 옵션 중 하나입니다.`);
        } else if (addPotentialGrade === '레전드리') {
            if (adiStatPct >= 21) {
                comments.push(`${adiPrefix} <b>주스탯 ${adiStatPct}% 이상</b>! 에디셔널 종결급 옵션입니다.`);
            } else if (adiStatPct >= 14) {
                comments.push(`${adiPrefix} <b>주스탯 ${adiStatPct}% 이상</b>! 아주 훌륭한 준종결급 스펙입니다.`);
            } else if (validAttFlat >= 12) {
                comments.push(`${adiPrefix} <b>${attType} +${validAttFlat}</b> 이상! 든든한 옵션입니다.`);
            }
        } else if (validStatLines >= 3) {
            comments.push(`${adiPrefix} <b>주스탯 3줄</b>! 레전드리 2줄급의 엄청난 효율입니다.`);
        } else if (validStatLines === 2) {
            if (validAttFlat > 0) {
                comments.push(`${adiPrefix} <b>주스탯 2줄</b>에 <b>${attType} +${validAttFlat}</b>까지! 완벽에 가까운 에디셔널입니다.`);
            } else {
                comments.push(`${adiPrefix} <b>주스탯 2줄</b>! 꽤 좋은 옵션입니다.`);
            }
        } else if (validAttFlat >= 10) {
            comments.push(`${adiPrefix} <b>${attType} +${validAttFlat}</b>! 스펙업의 정석입니다.`);
        } else if (validStatLines === 1) {
            comments.push(`${adiPrefix} <b>주스탯 1줄</b>을 챙기셨네요. 가성비 좋게 사용하기 적절합니다.`);
        }
    }

    return comments;
}
