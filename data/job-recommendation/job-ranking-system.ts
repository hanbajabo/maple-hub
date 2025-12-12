/**
 * 직업 추천 순위 시스템 (v2.0 - 직업 분포 반영)
 * 
 * 가중치:
 * 1. 헥사 강화 효율 (40%) - 성장 효율성
 * 2. 쿨뚝 불필요 (15%) - 장비 접근성
 * 3. 리레링(극딜) 여부 (5%) - 화력
 * 4. 유틸리티 (5%) - 편의성/파티 기여도
 * 5. 환산 TOP 2000 인기도 (20%) - 커뮤니티 규모, 정보 접근성
 * 6. Lv280+ 직업 점유율 (15%) - 고레벨 유저 선호도, 직업 인기
 */

import { getHexaEfficiencyByJob, HEXA_EFFICIENCY_DATA, HexaEfficiency } from './hexa-efficiency';
import { getCoolHatRecommendation } from './cool-hat-guide';
import { getDPMRankingByJob, DPM_RANKING_DATA } from './dpm-ranking';
import { getJobUtilities, getUtilityFlags } from './job-utility-complete';
import { getTop2000Score, getLevel280Score } from './job-distribution-data';

// 가중치 설정
const WEIGHTS = {
    HEXA_EFFICIENCY: 0.40,  // 40% - 헥사 효율
    COOL_HAT: 0.15,         // 15% - 쿨뚝 불필요
    RERANGE: 0.05,          // 5% - 리레링(극딜) 여부
    UTILITY: 0.05,          // 5% - 유틸리티
    TOP_2000: 0.20,         // 20% - 환산 TOP 2000 인기도
    LEVEL_280: 0.15         // 15% - Lv280+ 레벨링 인기도
};

// 헥사 조각 레벨 타입
export type HexaFragmentLevel = 'average' | 'level500' | 'level1000' | 'level2000' | 'level5000' | 'level10000' | 'level15000' | 'level20000';

export interface JobScore {
    job: string;
    totalScore: number;
    hexaScore: number;
    coolHatScore: number;
    rerangeScore: number;
    utilityScore: number;
    top2000Score: number;
    level280Score: number;
    rank: number;
    hexaReason: string;
    coolHatReason: string;
    rerangeReason: string;
    utilityReason: string;
    top2000Reason: string;
    level280Reason: string;
    overallReason: string;
    hexaFragmentLevel: HexaFragmentLevel;
}

/**
 * 헥사 효율 점수 계산 (순위 기반)
 * 각 조각 단계별로 순위를 매겨 점수 계산
 * 1위 = 100점, 47위 = 50점
 */
function calculateHexaScore(jobName: string, fragmentLevel: HexaFragmentLevel): { score: number; reason: string } {
    const data = getHexaEfficiencyByJob(jobName);

    if (!data) {
        return { score: 50, reason: '헥사 효율 데이터 없음' };
    }

    // 조각 레벨에 따른 보정치 가져오기
    let efficiency = 0;
    let levelName = '';

    if (fragmentLevel === 'average') {
        const levels = [
            data.level500.correction,
            data.level1000.correction,
            data.level2000.correction,
            data.level5000.correction,
            data.level10000.correction,
            data.level15000.correction,
            data.level20000.correction
        ];
        efficiency = levels.reduce((sum, val) => sum + val, 0) / levels.length;
        levelName = '평균';
    } else {
        efficiency = data[fragmentLevel].correction;
        const fragmentCounts: Record<HexaFragmentLevel, string> = {
            average: '평균',
            level500: '500개',
            level1000: '1,000개',
            level2000: '2,000개',
            level5000: '5,000개',
            level10000: '10,000개',
            level15000: '15,000개',
            level20000: '20,000개'
        };
        levelName = fragmentCounts[fragmentLevel];
    }

    // 같은 조각 레벨 기준으로 모든 직업의 보정치 계산 및 순위 매기기
    const allJobsWithEfficiency = HEXA_EFFICIENCY_DATA.map(item => {
        let jobEfficiency = 0;
        if (fragmentLevel === 'average') {
            const levels = [
                item.level500.correction,
                item.level1000.correction,
                item.level2000.correction,
                item.level5000.correction,
                item.level10000.correction,
                item.level15000.correction,
                item.level20000.correction
            ];
            jobEfficiency = levels.reduce((sum, val) => sum + val, 0) / levels.length;
        } else {
            jobEfficiency = item[fragmentLevel].correction;
        }
        return {
            job: item.job,
            efficiency: jobEfficiency
        };
    });

    // 보정치 기준으로 내림차순 정렬 (높은 순)
    allJobsWithEfficiency.sort((a, b) => b.efficiency - a.efficiency);

    // 현재 직업의 순위 찾기
    const rank = allJobsWithEfficiency.findIndex(item => item.job === jobName) + 1;

    // 순위를 점수로 변환 (1위 = 100점, 47위 = 50점)
    const score = 100 - ((rank - 1) / 46) * 50;

    // 순위 구간별 등급 판정
    let grade = '';
    let detail = '';
    let emoji = '';

    if (rank <= 5) {
        grade = 'S급';
        emoji = '🥇';
        detail = '헥사 스탯 효율 최상위권. 같은 조각으로 최고 수준의 보정치를 얻어 성장이 매우 빠릅니다';
    } else if (rank <= 12) {
        grade = 'A+급';
        emoji = '🏆';
        detail = '헥사 스탯 효율 우수. 조각 대비 높은 보정치로 빠른 성장이 가능합니다';
    } else if (rank <= 24) {
        grade = 'A급';
        emoji = '⭐';
        detail = '헥사 스탯 효율 평균 이상. 효율적인 성장 속도를 보입니다';
    } else if (rank <= 35) {
        grade = 'B급';
        emoji = '✨';
        detail = '헥사 스탯 효율 평균 수준. 무난한 성장 속도입니다';
    } else {
        grade = 'C급';
        emoji = '📊';
        detail = '헥사 스탯 효율 다소 낮음. 같은 조각으로 얻는 보정치가 상대적으로 적습니다';
    }

    const reason = `${emoji} ${grade} [조각 ${levelName}] ${rank}위/47직업 (보정치 ${efficiency.toFixed(2)}%) - ${detail}`;

    return { score, reason };
}

/**
 * 쿨뚝 점수 계산 (사용률 기반)
 * 사용률이 낮을수록 높은 점수 = 주스탯 모자로 큐브 비용 절감 가능
 */
function calculateCoolHatScore(jobName: string): { score: number; reason: string } {
    const data = getCoolHatRecommendation(jobName);

    if (!data) {
        return { score: 50, reason: '쿨뚝 데이터 없음' };
    }

    // 사용률을 역수로 변환하여 점수 계산 (0% = 100점, 100% = 0점)
    const score = 100 - data.usageRate;

    // 사용률 구간별 등급 및 설명
    let grade = '';
    let detail = '';
    let emoji = '';

    if (data.usageRate <= 10) {
        grade = 'S급';
        emoji = '✅✅';
        detail = '쿨뚝 거의 불필요. 주스탯 모자로 큐브 비용 대폭 절감';
    } else if (data.usageRate <= 25) {
        grade = 'A+급';
        emoji = '✅';
        detail = '쿨뚝 불필요. 주스탯 모자가 정배로 큐브 비용 절감';
    } else if (data.usageRate <= 40) {
        grade = 'A급';
        emoji = '👍';
        detail = '쿨뚝 선택형. 주스탯 모자 채용 가능하여 비용 절감 여지 있음';
    } else if (data.usageRate <= 55) {
        grade = 'B급';
        emoji = '△';
        detail = '쿨뚝/주스탯 반반. 취향에 따라 선택';
    } else if (data.usageRate <= 70) {
        grade = 'C급';
        emoji = '⚠️';
        detail = '쿨뚝 선호. 고스펙은 쿨뚝 채용률 높음';
    } else if (data.usageRate <= 90) {
        grade = 'D급';
        emoji = '❌';
        detail = '쿨뚝 필수. 주스탯 모자 사용 시 성능 저하';
    } else {
        grade = 'F급';
        emoji = '❌❌';
        detail = '쿨뚝 필수. 안 쓰면 간첩 수준으로 큐브 비용 불가피';
    }

    const reason = `${emoji} ${grade} 쿨뚝 [사용률 ${data.usageRate}%] - ${detail}. ${data.note}`;

    return { score, reason };
}

/**
 * 리레링(극딜) 점수 계산 (리레링 사용량 순위 기반)
 * 순위가 높을수록 리레링 가치가 높음
 */
function calculateRerangeScore(jobName: string): { score: number; reason: string } {
    const data = getDPMRankingByJob(jobName);

    if (!data) {
        return { score: 50, reason: '리레링 데이터 없음' };
    }

    // 리레링 사용량 순위를 0-100 점수로 변환 (1위 = 100점, 47위 ≈ 0점)
    const score = Math.max(0, Math.min(100, ((48 - data.rank) / 47) * 100));

    // 순위 구간별 등급 및 설명
    let grade = '';
    let detail = '';
    let emoji = '';

    if (data.rank <= 5) {
        grade = 'S급';
        emoji = '🔴🔥';
        detail = '리레링 최우선 추천. 극딜 점유율 최상위로 리레링 필수';
    } else if (data.rank <= 14) {
        grade = 'A+급';
        emoji = '🔴';
        detail = '리레링 강력 추천. 극딜 티어로 리레링 채택률 매우 높음';
    } else if (data.rank <= 20) {
        grade = 'A급';
        emoji = '🟠';
        detail = '리레링 추천. 상위 티어로 리레링 선호도 높으나 컨티링 채택률도 있음';
    } else if (data.rank <= 28) {
        grade = 'B급';
        emoji = '🟠';
        detail = '리레링 선택형. 리레링/컨티링 혼용, 취향에 따라 선택 가능';
    } else if (data.rank <= 34) {
        grade = 'C급';
        emoji = '⚪';
        detail = '컨티링 선호. 중위 티어로 리레링보다 컨티링 채택률 높음';
    } else if (data.rank <= 40) {
        grade = 'D급';
        emoji = '⚪';
        detail = '컨티링 추천. 리레링 효율 낮아 컨티링 강력 권장';
    } else {
        grade = 'F급';
        emoji = '🔵';
        detail = '리레링 비추천. 하위 티어로 리레링 효율 거의 없음, 컨티링 필수';
    }

    const tierName = getTierName(data.tier);
    const reason = `${emoji} ${grade} 리레링 [사용량 ${data.rank}위/${tierName}] - ${detail}`;

    return { score, reason };
}

function getTierName(tier: '🔴' | '🟠' | '⚪' | '🔵'): string {
    const tierNames = {
        '🔴': '극딜',
        '🟠': '상위',
        '⚪': '중위',
        '🔵': '하위',
    };
    return tierNames[tier];
}

/**
 * 유틸리티 점수 계산 (개선 - 텔레포트 반영)
 */
function calculateUtilityScore(jobName: string): { score: number; reason: string } {
    const utilities = getJobUtilities(jobName);
    const flags = getUtilityFlags(jobName);

    if (utilities.length === 0) {
        return { score: 30, reason: '유틸리티 데이터 없음' };
    }

    let score = 0;
    const reasons: string[] = [];

    // 텔레포트: 40점 (최고 가치 - 사냥 효율 및 기동성)
    if (flags.hasTeleport) {
        score += 40;
        reasons.push('텔레포트');
    }

    // 부활/사망방지: 30점
    if (flags.hasRevive) {
        score += 30;
        reasons.push('부활/사망방지');
    }

    // 무적기: 25점 (상향)
    if (flags.hasInvincible) {
        score += 25;
        reasons.push('무적기');
    }

    // 공격반사무시: 20점
    if (flags.hasBuffIgnore) {
        score += 20;
        reasons.push('공격반사무시');
    }

    // 바인드: 20점 (상향)
    if (flags.hasBind) {
        score += 20;
        reasons.push('바인드');
    }

    // 파티지원: 15점 (상향)
    if (flags.hasPartySupport) {
        score += 15;
        reasons.push('파티지원');
    }

    // 디버프: 10점
    if (flags.hasDebuff) {
        score += 10;
        reasons.push('디버프');
    }

    score = Math.min(score, 100);

    let grade = '';
    if (score >= 80) grade = 'S급';
    else if (score >= 60) grade = 'A급';
    else if (score >= 40) grade = 'B급';
    else if (score >= 20) grade = 'C급';
    else grade = 'D급';

    const utilityList = reasons.length > 0 ? reasons.join(', ') : '기본 유틸리티';
    const reason = `${grade} 유틸리티 (${utilities.length}개) - ${utilityList}`;

    return { score, reason };
}



/**
 * 종합 점수 계산 (조각 레벨 지정 가능)
 */
export function calculateJobScore(jobName: string, fragmentLevel: HexaFragmentLevel = 'average'): Omit<JobScore, 'rank'> {
    const hexa = calculateHexaScore(jobName, fragmentLevel);
    const coolHat = calculateCoolHatScore(jobName);
    const rerange = calculateRerangeScore(jobName);
    const utility = calculateUtilityScore(jobName);
    const top2000 = getTop2000Score(jobName);
    const level280 = getLevel280Score(jobName);

    // 가중치 적용한 총점
    const totalScore =
        hexa.score * WEIGHTS.HEXA_EFFICIENCY +
        coolHat.score * WEIGHTS.COOL_HAT +
        rerange.score * WEIGHTS.RERANGE +
        utility.score * WEIGHTS.UTILITY +
        top2000.score * WEIGHTS.TOP_2000 +
        level280.score * WEIGHTS.LEVEL_280;

    // 종합 평가 이유
    const overallReason = `
📊 종합 점수: ${totalScore.toFixed(1)}점

【성장 효율】 (40% 가중치)
${hexa.reason}

【장비 접근성】 (15% 가중치)
${coolHat.reason}

【화력】 (5% 가중치)
${rerange.reason}

【유틸리티】 (5% 가중치)
${utility.reason}

【환산 TOP 2000 인기도】 (20% 가중치)
${top2000.reason}

【Lv280+ 레벨링 인기도】 (15% 가중치)
${level280.reason}
  `.trim();

    return {
        job: jobName,
        totalScore,
        hexaScore: hexa.score,
        coolHatScore: coolHat.score,
        rerangeScore: rerange.score,
        utilityScore: utility.score,
        top2000Score: top2000.score,
        level280Score: level280.score,
        hexaReason: hexa.reason,
        coolHatReason: coolHat.reason,
        rerangeReason: rerange.reason,
        utilityReason: utility.reason,
        top2000Reason: top2000.reason,
        level280Reason: level280.reason,
        overallReason,
        hexaFragmentLevel: fragmentLevel
    };
}

/**
 * 전체 직업 순위 계산 (조각 레벨별)
 */
export function calculateAllJobRankings(fragmentLevel: HexaFragmentLevel = 'average'): JobScore[] {
    const allScores = DPM_RANKING_DATA.map(data =>
        calculateJobScore(data.job, fragmentLevel)
    );

    allScores.sort((a, b) => b.totalScore - a.totalScore);

    const rankings: JobScore[] = allScores.map((score, index) => ({
        ...score,
        rank: index + 1
    }));

    return rankings;
}

/**
 * 상위 N개 직업 추천
 */
export function getTopRecommendedJobs(count: number = 10, fragmentLevel: HexaFragmentLevel = 'average'): JobScore[] {
    const rankings = calculateAllJobRankings(fragmentLevel);
    return rankings.slice(0, count);
}

/**
 * 특정 직업 순위 조회
 */
export function getJobRanking(jobName: string, fragmentLevel: HexaFragmentLevel = 'average'): JobScore | undefined {
    const rankings = calculateAllJobRankings(fragmentLevel);
    return rankings.find(r => r.job === jobName);
}
