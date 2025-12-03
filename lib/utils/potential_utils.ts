/**
 * 잠재능력 계산 유틸리티
 * 
 * potential_config.ts의 설정을 사용하여 잠재능력을 정확하게 평가합니다.
 * 레벨별 차이(71~200 vs 201~250)를 자동으로 처리합니다.
 */

import {
    getPotentialValues,
    getPotentialThresholds,
    evaluateStatPercent,
    getTier,
    SPECIAL_OPTIONS,
} from '../config/potential_config';
import {
    getPotentialCriteria,
    getMainPotentialGrade,
} from '../config/unified_criteria';
import { getJobMainStat } from '../job_utils';

// ============================================
// 1. 잠재능력 파싱
// ============================================

export interface ParsedPotential {
    statPct: number;        // 주스탯 % 합계
    allStatPct: number;     // 올스탯 % 합계
    attPct: number;         // 공격력 %
    magicPct: number;       // 마력 %
    critDmg: number;        // 크리티컬 데미지
    cooldown: number;       // 쿨타임 감소 (초)
    ied: number;            // 방어율 무시
    bossDmg: number;        // 보스 데미지
}

/**
 * 잠재능력 라인 배열을 파싱하여 수치 합산
 */
export function parsePotentialLines(
    lines: (string | null | undefined)[],
    job?: string
): ParsedPotential {
    const mainStats = getJobMainStat(job || '');

    const result: ParsedPotential = {
        statPct: 0,
        allStatPct: 0,
        attPct: 0,
        magicPct: 0,
        critDmg: 0,
        cooldown: 0,
        ied: 0,
        bossDmg: 0,
    };

    lines.forEach(line => {
        if (!line) return;

        const match = line.match(/(\d+)%?/);
        if (!match) return;
        const value = parseInt(match[1]);

        // 올스탯
        if (line.includes('올스탯')) {
            result.allStatPct += value;
            return;
        }

        // HP% (데몬어벤져)
        if (line.includes('HP') && line.includes('%')) {
            result.statPct += value;
            return;
        }

        // 개별 주스탯
        mainStats.forEach((stat: string) => {
            if (line.includes(stat) && line.includes('%')) {
                result.statPct += value;
            }
        });

        // 공격력/마력
        if (line.includes('공격력') && line.includes('%')) {
            result.attPct += value;
        }
        if (line.includes('마력') && line.includes('%')) {
            result.magicPct += value;
        }

        // 크리티컬 데미지
        if (line.includes('크리티컬 데미지')) {
            result.critDmg += value;
        }

        // 쿨타임 감소
        if (line.includes('재사용 대기시간')) {
            const cdMatch = line.match(/(\d+)초/);
            if (cdMatch) result.cooldown += parseInt(cdMatch[1]);
        }

        // 방어율 무시
        if (line.includes('방어율 무시')) {
            result.ied += value;
        }

        // 보스 데미지
        if (line.includes('보스 몬스터')) {
            result.bossDmg += value;
        }
    });

    return result;
}

// ============================================
// 2. 잠재능력 평가
// ============================================

export interface PotentialEvaluation {
    grade: string;           // '올이탈', '쌍이탈', '정옵', '고스펙', '표준', '미흡'
    message: string;         // 평가 메시지
    statPct: number;         // 주스탯 합계
    tierInfo: string;        // 티어 정보 (TIER_1 or TIER_2)
}

/**
 * 파싱된 잠재능력 데이터를 평가
 */
export function evaluatePotential(
    itemLevel: number,
    potentialGrade: string,
    parsed: ParsedPotential,
    job?: string
): PotentialEvaluation {
    const tier = getTier(itemLevel);
    const tierLabel = tier === 'TIER_2' ? '201~250제' : '71~200제';

    // 주스탯 + 올스탯(절반 환산) 합계
    // 제논의 경우 올스탯이 주스탯이므로 parsed.statPct에 이미 올스탯이 포함되어 있을 수 있음 (parsePotentialLines 로직에 따라)
    // 하지만 parsePotentialLines는 제논 여부를 모르고 올스탯을 별도로 분리함.
    // 따라서 제논일 경우 statPct + allStatPct를 합쳐서 넘겨야 함.
    // 일반 직업의 경우 allStatPct는 효율이 떨어질 수 있으나, 여기서는 단순 합산으로 처리하고 있음.

    // 제논 판별
    const isXenon = job && (job.includes('제논') || job.replace(/\s/g, '').includes('제논'));

    let totalStatPct = parsed.statPct + parsed.allStatPct;

    // 제논은 올스탯만 유효하므로, parsePotentialLines에서 statPct가 0일 수 있음 (STR/DEX/LUK을 안 셌다면)
    // 하지만 현재 parsePotentialLines는 직업 주스탯을 모르면 다 셀 수도 있음.
    // 제논의 경우 job_utils에서 mainStat이 ['올스탯']으로 설정되어 있다면 statPct는 0이고 allStatPct만 있을 것임.

    // 통합 평가 함수 사용
    // gradeLabel은 'MYTHIC', 'ENDGAME', 'GOOD' 등의 키값이 아니라 '신화급', '졸업', '표준' 등의 한글 라벨임.
    // getMainPotentialGrade 함수는 한글 라벨을 반환함.
    const gradeLabel = getMainPotentialGrade(totalStatPct, potentialGrade as any, itemLevel, job);

    let message = '';
    const statLabel = isXenon ? '올스탯' : '주스탯';

    if (potentialGrade === '레전드리' || potentialGrade === '유니크' || potentialGrade === '에픽') {
        if (gradeLabel !== '아쉬움' && gradeLabel !== '부족' && gradeLabel !== '보통' && gradeLabel !== '미흡') {
            message = `[${gradeLabel}] ${statLabel} ${Math.floor(totalStatPct)}%! ${potentialGrade} 등급에서 훌륭한 수치입니다. (${tierLabel})`;
        } else {
            // 기준 미달 시 메시지
            const criteria = getPotentialCriteria(itemLevel, job);
            let recommend = 0;
            if (potentialGrade === '레전드리') recommend = criteria.GOOD;
            else if (potentialGrade === '유니크') recommend = 15; // 임시
            else recommend = 9; // 임시

            message = `[${gradeLabel}] ${statLabel}이 ${Math.floor(totalStatPct)}%로 낮습니다. ${recommend}% 이상 권장합니다.`;
        }
    }

    return {
        grade: gradeLabel,
        message,
        statPct: Math.floor(totalStatPct),
        tierInfo: tierLabel,
    };
}

// ============================================
// 3. 특수 옵션 평가 (장갑, 모자 등)
// ============================================

/**
 * 장갑 크뎀 평가
 */
export function evaluateCritDamage(critDmg: number, statPct: number, grade: string): string {
    if (critDmg >= 24) {
        return `[신화: 3크뎀] 크리티컬 데미지 <b>${critDmg}%</b>! 전 서버급 매물입니다. 부르는 게 값입니다.`;
    }
    if (critDmg >= 16) {
        return `[종결: 쌍크뎀] 크리티컬 데미지 <b>${critDmg}%</b>! 장갑에서 챙길 수 있는 최고의 옵션입니다. 평생 쓰셔도 됩니다.`;
    }
    if (critDmg >= 8) {
        if (grade === '레전드리') {
            return `[좋음] 크리티컬 데미지 <b>${critDmg}%</b>는 주스탯 30% 이상의 효율을 냅니다. 충분히 훌륭한 옵션입니다.`;
        } else {
            return `[필수 옵션] 크뎀 <b>${critDmg}%</b>는 주스탯 3줄급 효율입니다. 유니크 등급에서는 최상의 옵션입니다.`;
        }
    }
    return '';
}

/**
 * 모자 쿨감 평가
 */
export function evaluateCooldown(cooldown: number, statPct: number): string {
    if (cooldown >= 4) {
        return '쌍쿨감 종결';
    }
    if (cooldown >= 2) {
        if (statPct > 0) {
            return `쿨감 ${cooldown}초 + 주스탯 ${statPct}%`;
        }
        return `쿨감 ${cooldown}초`;
    }
    return '쿨감 없음';
}

/**
 * 에디셔널 잠재능력 평가 (공/마 합산 포함)
 */
export function evaluateAdditional(grade: string, lines: (string | null | undefined)[], job?: string): { score: number, message: string } {
    const mainStats = getJobMainStat(job || '');
    let statPct = 0;
    let att = 0;
    let magic = 0;

    lines.forEach(l => {
        if (!l) return;

        // 공/마 (합산)
        if (l.includes("공격력") && !l.includes('%')) {
            const match = l.match(/\+(\d+)/);
            if (match) att += parseInt(match[1]);
        }
        if (l.includes("마력") && !l.includes('%')) {
            const match = l.match(/\+(\d+)/);
            if (match) magic += parseInt(match[1]);
        }

        // 주스탯 %
        const matchPct = l.match(/(\d+)%/);
        if (matchPct) {
            const val = parseInt(matchPct[1]);
            if (l.includes("올스탯")) {
                statPct += val;
            } else if (l.includes('HP') && l.includes('%')) {
                if (job && job.includes('데몬어벤져')) {
                    statPct += val;
                }
            } else {
                // 직업 주스탯이거나, 직업 정보 없으면 가장 높은 것(여기서는 단순 합산 후 나중에 정제 필요하지만, 일단 포함)
                // *주의: 여기서도 아까와 같은 문제(DEX 합산)가 발생할 수 있음.
                // 하지만 parsePotentialLines를 쓰지 않고 직접 파싱하므로, 여기서는 간단하게 처리.
                // 더 정확하게 하려면 parsePotentialLines를 내부에서 호출하는 것이 좋음.
                mainStats.forEach((stat: string) => {
                    if (l.includes(stat)) statPct += val;
                });
            }
        }

        // 렙당 주스탯 (유효 라인 인정)
        if (l.includes("레벨 당")) {
            const isMainStat = l.includes("올스탯") || mainStats.some((stat: string) => l.includes(stat));
            if (isMainStat) {
                if (l.includes("+1")) statPct += 3; // 렙당 1 = 3%
                if (l.includes("+2")) statPct += 6; // 렙당 2 = 6%
            }
        }
    });

    // 유효 공격력 (공/마 중 높은 것)
    const validAtt = Math.max(att, magic);

    // 공/마를 주스탯 환산 (공/마 1 = 주스탯 4, 주스탯 10 = 1%)
    const attEquiv = (validAtt * 4) / 10;
    const totalEquiv = statPct + attEquiv;

    let message = '';

    if (grade === '에픽') {
        if (totalEquiv >= 10) {
            message = `[에디 에픽 종결] 에디셔널 <b>주스탯 ${Math.floor(totalEquiv)}%급</b> 효율! 에픽 등급 최상급 옵션입니다.`;
        } else if (totalEquiv >= 3) {
            message = `[에디 에픽] 에디셔널 <b>주스탯 ${totalEquiv.toFixed(1)}%급</b> 효율! 아주 든든한 옵션입니다.`;
        } else if (statPct > 0 || validAtt > 0) {
            message = `[에디 에픽] 에디셔널 옵션이 있습니다.`;
        }
    } else if (grade === '유니크') {
        if (totalEquiv >= 15) {
            message = `[에디 유니크 종결] 에디셔널 <b>주스탯 ${Math.floor(totalEquiv)}%급</b> 효율! 유니크 등급 최상급입니다.`;
        } else if (totalEquiv >= 8) {
            message = `[에디 유니크] 에디셔널 <b>주스탯 ${totalEquiv.toFixed(1)}%급</b> 효율! 쓸만한 옵션입니다.`;
        }
    } else if (grade === '레전드리') {
        if (totalEquiv >= 21) {
            message = `[에디 레전드리 종결] 에디셔널 <b>주스탯 ${Math.floor(totalEquiv)}%급</b> 효율! 전 서버급 옵션입니다.`;
        } else if (totalEquiv >= 14) {
            message = `[에디 레전드리] 에디셔널 <b>주스탯 ${totalEquiv.toFixed(1)}%급</b> 효율! 아주 훌륭합니다.`;
        }
    }

    return { score: totalEquiv, message };
}
