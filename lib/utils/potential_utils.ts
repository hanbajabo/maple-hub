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
    parsed: ParsedPotential
): PotentialEvaluation {
    const tier = getTier(itemLevel);
    const tierLabel = tier === 'TIER_2' ? '201~250제' : '71~200제';

    // 주스탯 + 올스탯(절반 환산) 합계
    const totalStatPct = parsed.statPct + (parsed.allStatPct * 0.5);

    const gradeLabel = evaluateStatPercent(itemLevel, potentialGrade, totalStatPct);
    const thresholds = getPotentialThresholds(itemLevel, potentialGrade);

    let message = '';

    if (potentialGrade === '레전드리') {
        if (gradeLabel === '올이탈') {
            message = `주스탯 ${Math.floor(totalStatPct)}%! 올이탈... 이건 기적입니다. (${tierLabel})`;
        } else if (gradeLabel === '쌍이탈+') {
            message = `주스탯 ${Math.floor(totalStatPct)}%! 쌍이탈+ 옵션입니다. 정옵을 뛰어넘은 최상급 스펙입니다. (${tierLabel})`;
        } else if (gradeLabel === '정옵') {
            message = `주스탯 ${Math.floor(totalStatPct)}%! 완벽한 3줄 정옵입니다. (${tierLabel})`;
        } else if (gradeLabel === '고스펙') {
            message = `주스탯 ${Math.floor(totalStatPct)}%! 상위권 스펙입니다. (${tierLabel})`;
        } else if (gradeLabel === '표준') {
            message = `주스탯 ${Math.floor(totalStatPct)}%는 레전드리 표준입니다. (${tierLabel})`;
        } else {
            message = `주스탯 ${Math.floor(totalStatPct)}%로 낮습니다. ${thresholds.STANDARD}% 이상 권장합니다.`;
        }
    } else if (potentialGrade === '유니크') {
        if (gradeLabel === '완벽') {
            message = `주스탯 ${Math.floor(totalStatPct)}%! 유니크 최상급 옵션입니다. (${tierLabel})`;
        } else if (gradeLabel === '준수') {
            message = `주스탯 ${Math.floor(totalStatPct)}%는 괜찮은 수치입니다. (${tierLabel})`;
        } else {
            message = `주스탯이 ${Math.floor(totalStatPct)}%로 낮습니다. ${thresholds.STANDARD}% 이상 권장합니다.`;
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
export function evaluateCritDamage(critDmg: number): string {
    if (critDmg >= SPECIAL_OPTIONS.CRIT_DAMAGE.LEGENDARY * 3) {
        return '3크뎀 신화';  // 24%
    }
    if (critDmg >= SPECIAL_OPTIONS.CRIT_DAMAGE.LEGENDARY * 2) {
        return '쌍크뎀';      // 16%
    }
    if (critDmg >= SPECIAL_OPTIONS.CRIT_DAMAGE.LEGENDARY) {
        return '1크뎀';       // 8%
    }
    return '크뎀 부족';
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
