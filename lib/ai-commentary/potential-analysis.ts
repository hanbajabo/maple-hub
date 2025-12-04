import { pick } from './helpers';
import { MAIN_POTENTIAL_STAT } from '../config/unified_criteria';

interface PotentialAnalysisResult {
    comments: string[];
    statPct: number;
    bossDmg: number;
    critDmg: number;
    coolTime: number;
}

/**
 * 잠재능력 옵션 파싱
 */
export function parsePotentialOptions(potentials: string[], isXenon: boolean): PotentialAnalysisResult {
    let bossDmg = 0;
    let ied = 0;
    let attPct = 0;
    let magicPct = 0;
    let critDmg = 0;
    let coolTime = 0;
    let statPct = 0;
    let dropRate = 0;
    let mesoRate = 0;

    let strTotal = 0;
    let dexTotal = 0;
    let intTotal = 0;
    let lukTotal = 0;
    let hpTotal = 0;
    let allStatTotal = 0;

    potentials.forEach(line => {
        if (!line) return;

        if (line.includes('보스 몬스터 공격 시 데미지')) bossDmg += parseInt(line.replace(/[^0-9]/g, '')) || 0;
        if (line.includes('몬스터 방어율 무시')) ied += parseInt(line.replace(/[^0-9]/g, '')) || 0;
        if (line.includes('공격력') && line.includes('%')) attPct += parseInt(line.replace(/[^0-9]/g, '')) || 0;
        if (line.includes('마력') && line.includes('%')) magicPct += parseInt(line.replace(/[^0-9]/g, '')) || 0;
        if (line.includes('크리티컬 데미지')) critDmg += parseInt(line.replace(/[^0-9]/g, '')) || 0;
        if (line.includes('재사용 대기시간')) coolTime += parseInt(line.replace(/[^0-9]/g, '')) || 0;
        if (line.includes('아이템 드롭률')) dropRate += parseInt(line.replace(/[^0-9]/g, '')) || 0;
        if (line.includes('메소 획득량')) mesoRate += parseInt(line.replace(/[^0-9]/g, '')) || 0;

        // 레벨당 스탯 처리
        let levelStatBonus = 0;
        if (line.includes('캐릭터 기준 9레벨 당') || line.includes('캐릭터 기준 10레벨 당')) {
            const valMatch = line.match(/\+(\d+)/);
            const val = valMatch ? parseInt(valMatch[1]) : 0;

            if (val >= 2) levelStatBonus = 6;
            else if (val >= 1) levelStatBonus = 3;

            if (line.includes('STR')) strTotal += levelStatBonus;
            if (line.includes('DEX')) dexTotal += levelStatBonus;
            if (line.includes('INT')) intTotal += levelStatBonus;
            if (line.includes('LUK')) lukTotal += levelStatBonus;
        }

        if (line.includes('STR') && line.includes('%')) strTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
        if (line.includes('DEX') && line.includes('%')) dexTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
        if (line.includes('INT') && line.includes('%')) intTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
        if (line.includes('LUK') && line.includes('%')) lukTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
        if (line.includes('HP') && line.includes('%')) hpTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
        if (line.includes('올스탯') && line.includes('%')) allStatTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
    });

    if (isXenon) {
        statPct = allStatTotal;
    } else {
        statPct = Math.max(strTotal, dexTotal, intTotal, lukTotal, hpTotal) + allStatTotal;
    }

    return {
        comments: [],
        statPct,
        bossDmg,
        critDmg,
        coolTime
    };
}

/**
 * 잠재능력 분석 (메인)
 * 복잡한 로직이지만 핵심만 유지하고 원본 함수와 동일하게 동작
 */
export function analyzePotential(
    item: any,
    potentials: string[],
    potentialGrade: string,
    isXenon: boolean,
    isEndGameItem: boolean,
    isEventRing: boolean,
    job?: string
): string[] {
    const comments: string[] = [];
    const slot = item.item_equipment_slot || '';

    // 강화 불가 부위는 스킵
    const isMedal = slot === '훈장' || slot.includes('훈장');
    const isBadge = slot === '뱃지' || slot.includes('뱃지');
    const isPocket = slot === '포켓 아이템';

    if (isMedal || isBadge || isPocket) return comments;

    const parsed = parsePotentialOptions(potentials, isXenon);
    const { statPct, bossDmg, critDmg, coolTime } = parsed;

    const potPrefix = pick(["잠재능력은", "잠재는", "윗잠은", "잠재 옵션은"]);
    const level = item.item_base_option?.base_equipment_level || 0;
    const isHighLevel = level > 200;

    // WSE (무기/보조/엠블렘)
    if (slot === '무기' || slot === '보조무기' || slot === '엠블렘' || item.item_equipment_part === '보조무기') {
        if (potentialGrade === '레전드리') {
            const bossLines = potentials.filter(l => l.includes('보스'));
            const attLines = potentials.filter(l => (l.includes('공격력') || l.includes('마력')) && l.includes('%'));
            const iedLines = potentials.filter(l => l.includes('방어율 무시'));

            const bossCount = bossLines.length;
            const attCount = attLines.length;
            const iedCount = iedLines.length;

            if (bossCount >= 3) {
                comments.push(`<b>보보보</b>! 보공 3줄이라니... 엄청납니다. 다만 공/마 효율도 꼭 체크해보세요.`);
            } else if (bossCount >= 2 && attCount >= 1) {
                comments.push(pick([
                    `<b>보보공/보보마</b>! 무기 잠재능력의 정석이자 종결 옵션입니다. 축하드립니다!`,
                    `가장 이상적인 옵션, <b>보보공/보보마</b>를 띄우셨군요. 완벽합니다.`,
                    `이 옵션을 띄우려고 얼마나 많은 큐브를 돌리셨을까요? <b>보보공/보보마</b> 인정합니다.`
                ]));
            } else if (attCount >= 2 && bossCount >= 1) {
                comments.push(`<b>공공보/마마보</b>! 보공과 공/마 밸런스가 완벽합니다.`);
            } else if (attCount >= 3) {
                comments.push(`<b>3공/3마</b>! 보공 효율이 높은 직업에게 최고의 옵션입니다.`);
            } else if (bossCount + attCount + iedCount >= 3) {
                // 방무 2줄 이상 경고
                if (iedCount >= 2) {
                    comments.push(`유효 옵션은 3줄이지만... 방무가 ${iedCount}줄이나 되네요! 방무 1줄을 보공이나 공/마%로 바꾸면 훨씬 더 강해지실 거예요.`);
                } else {
                    comments.push(`유효 옵션 3줄을 꽉 채우셨습니다. 졸업급입니다.`);
                }
            } else if (bossCount >= 2) {
                comments.push(`<b>보보잡</b>... 보공 2줄은 좋지만 공/마가 없어 아쉽습니다. 큐브로 '보보공'을 노려보세요.`);
            } else if (bossCount + attCount + iedCount === 2) {
                comments.push(`가성비 좋게 유효 2줄을 챙기셨습니다. 추후 3줄을 목표로 해보세요.`);
            } else {
                comments.push(`레전드리 등급이지만 유효 옵션이 부족합니다. 큐브 작업이 시급합니다.`);
            }
        }
    }
    // 방어구/장신구
    else {
        if (potentialGrade === '레전드리') {
            // 쿨감 + 주스탯 조합
            if (coolTime >= 2 && statPct > 0) {
                if (coolTime >= 4 && statPct >= 21) {
                    comments.push(`${potPrefix} <b>쿨감 -${coolTime}초 + 주스탯 ${statPct}%</b>! 모자 최종 종결 옵션입니다. 이 이상은 없습니다.`);
                } else if (coolTime >= 2 && statPct >= 21) {
                    comments.push(`${potPrefix} <b>쿨감 -${coolTime}초 + 주스탯 ${statPct}%</b>! 실전 종결급 조합입니다.`);
                } else if (coolTime >= 2 && statPct >= 13) {
                    comments.push(`${potPrefix} <b>쿨감 -${coolTime}초 + 주스탯 ${statPct}%</b>! 쿨감과 주스탯을 함께 챙긴 훌륭한 옵션입니다.`);
                } else {
                    comments.push(`${potPrefix} <b>쿨감 -${coolTime}초 + 주스탯 ${statPct}%</b>가 있습니다. 쿨감은 직업에 따라 매우 중요한 옵션입니다.`);
                }
            }
            // 쿨감만
            else if (coolTime >= 4) {
                comments.push(`<b>쿨타임 감소 ${coolTime}초</b>는 종결급 옵션입니다.`);
            } else if (coolTime >= 2) {
                comments.push(`<b>쿨타임 감소 ${coolTime}초</b>는 직업에 따라 주스탯 30% 이상의 가치를 가집니다. 1순위 옵션입니다.`);
            }
            // 주스탯
            else {
                // 제논 전용
                if (isXenon) {
                    const criteria = isHighLevel ? MAIN_POTENTIAL_STAT.XENON_LEGENDARY_HIGH_LEVEL : MAIN_POTENTIAL_STAT.XENON_LEGENDARY;
                    if (statPct >= criteria.MYTHIC) {
                        comments.push(`${potPrefix} <b>올스탯 ${statPct}%</b>... <b>'올이탈'</b>급 초월 스펙입니다! 제논의 꿈입니다.`);
                    } else if (statPct >= criteria.ENDGAME) {
                        comments.push(`${potPrefix} <b>올스탯 ${statPct}%</b>! 최상급 3줄 옵션입니다. 종결하셔도 됩니다.`);
                    } else if (statPct >= criteria.GOOD) {
                        comments.push(`${potPrefix} <b>올스탯 ${statPct}%</b>! 쓸만한 3줄 옵션입니다.`);
                    } else {
                        comments.push(`${potPrefix} <b>올스탯 ${statPct}%</b>입니다. 조금 더 높은 수치를 노려보세요.`);
                    }
                }
                // 일반 직업
                else {
                    if (isHighLevel) {
                        if (statPct >= 39) {
                            comments.push(pick([
                                `${potPrefix} <b>주스탯 ${statPct}%</b>... <b>'올이탈'</b> 국가권력급 스펙입니다!`,
                                `${potPrefix} <b>주스탯 ${statPct}%</b>?! 큐브가 고장난 거 아닌가요?`
                            ]));
                        } else if (statPct >= 36) {
                            comments.push(`${potPrefix} <b>'쌍이탈'</b> 옵션(36% 이상)이 떴습니다! 정옵을 뛰어넘은 초고스펙입니다.`);
                        } else if (statPct >= 33) {
                            comments.push(`${potPrefix} <b>주스탯 ${statPct}%</b>로 깔끔하게 3줄 유효 옵션을 챙기셨네요. 완벽한 졸업급 정옵입니다.`);
                        } else if (statPct >= 21) {
                            comments.push(`${potPrefix} <b>주스탯 ${statPct}%</b>! 2줄 유효 옵션입니다.`);
                        }
                    } else {
                        if (statPct >= 36) {
                            comments.push(`${potPrefix} <b>주스탯 ${statPct}%</b>... <b>'올이탈'</b> 국가권력급 스펙입니다!`);
                        } else if (statPct >= 30) {
                            comments.push(`${potPrefix} <b>주스탯 ${statPct}%</b>로 깔끔하게 3줄 유효 옵션을 챙기셨네요. 완벽한 졸업급 정옵입니다.`);
                        } else if (statPct >= 21) {
                            comments.push(`${potPrefix} <b>주스탯 ${statPct}%</b>! 2줄 유효 옵션입니다.`);
                        }
                    }
                }
            }

            // 크뎀
            if (critDmg >= 24) {
                comments.push(`<b>3크뎀</b>...?! 이건 전설이 아니라 <b>신화</b>입니다.`);
            } else if (critDmg >= 16) {
                comments.push(`<b>쌍크뎀</b> 장갑... 전 서버급 매물입니다.`);
            } else if (critDmg >= 8) {
                if (statPct >= 9) {
                    comments.push(`${potPrefix} <b>크리티컬 데미지 ${critDmg}% + 주스탯 ${statPct}%</b>! 크뎀과 주스탯을 모두 챙긴 알짜배기 옵션입니다.`);
                } else {
                    comments.push(`${potPrefix} <b>크리티컬 데미지 ${critDmg}%</b>! 장갑 잠재능력의 핵심인 크뎀을 잘 챙기셨습니다.`);
                }
            }
        }
        // 유니크
        else if (potentialGrade === '유니크') {
            if (isEndGameItem) {
                comments.push(`이런 명품 장비에 유니크 등급은 너무 아깝습니다. <b>레전드리</b> 등급업으로 아이템의 잠재력을 100% 끌어올려주세요.`);
            } else {
                if (statPct >= 15) {
                    comments.push(pick([
                        `유니크 등급에서 <b>스탯 ${statPct}%</b>면 가성비 구간 종결입니다.`,
                        `${potPrefix} <b>주스탯 ${statPct}%</b>! 유니크에서 뽑을 수 있는 최상의 옵션입니다.`
                    ]));
                }
            }
        }
        // 에픽
        else if (potentialGrade === '에픽') {
            if (statPct >= 12) {
                comments.push(`${potPrefix} <b>주스탯 ${statPct}%</b>! 에픽 등급 종결 옵션입니다. 유니크 부럽지 않네요.`);
            } else if (statPct >= 9) {
                comments.push(`${potPrefix} <b>주스탯 ${statPct}%</b>! 에픽에서 챙길 수 있는 아주 훌륭한 옵션입니다.`);
            } else if (statPct >= 6) {
                comments.push(`${potPrefix} <b>주스탯 ${statPct}%</b>입니다. 임시로 쓰기에 적절합니다.`);
            }
        }
    }

    return comments;
}
