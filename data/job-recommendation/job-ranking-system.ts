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
import { getSeedRingStat, SEED_RING_STATS } from './seed-ring-stats';
import { getJobUtilities, getUtilityFlags } from './job-utility-complete';
import { getTop2000Score, getLevel280Score } from './job-distribution-data';

// 가중치 설정 인터페이스
export interface RankingWeights {
    HEXA_EFFICIENCY: number;
    COOL_HAT: number;
    RERANGE: number;
    UTILITY: number;
    TOP_2000: number;
    LEVEL_280: number;
}

export const DEFAULT_WEIGHTS: RankingWeights = {
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

    // 사용률 구간별 등급 (이모지와 등급만 결정)
    let grade = '';
    let emoji = '';

    if (data.usageRate <= 10) {
        grade = 'S급';
        emoji = '✅✅';
    } else if (data.usageRate <= 25) {
        grade = 'A+급';
        emoji = '✅';
    } else if (data.usageRate <= 40) {
        grade = 'A급';
        emoji = '👍';
    } else if (data.usageRate <= 55) {
        grade = 'B급';
        emoji = '△';
    } else if (data.usageRate <= 70) {
        grade = 'C급';
        emoji = '⚠️';
    } else if (data.usageRate <= 90) {
        grade = 'D급';
        emoji = '❌';
    } else {
        grade = 'F급';
        emoji = '❌❌';
    }

    // 상세 코멘트(note)를 설명으로 사용
    const reason = `${emoji} ${grade} 쿨뚝 [사용률 ${data.usageRate}%] - ${data.note}`;

    return { score, reason };
}

/**
 * 리레/컨티링 효율 점수 계산 (시드링 통계 기반)
 * 
 * 리스트레인트 링(리레링) 채택률을 기준으로 점수 차등 부여
 * 리레링 사용률이 높을수록 극딜 능력이 좋다고 판단하여 고득점.
 */
function calculateRerangeScore(jobName: string): { score: number; reason: string } {
    const data = getSeedRingStat(jobName);

    if (!data) {
        return { score: 50, reason: '시드링 데이터 없음' };
    }

    // 리레링 채택률(%)을 그대로 점수로 사용 (0 ~ 100점)
    const score = data.restraint;

    let grade = '';
    let emoji = '';
    let detail = '';

    if (score >= 90) {
        grade = 'SS급';
        emoji = '🔴🔥';
        detail = '리레링 필수 (극딜 메타 최적화)';
    } else if (score >= 70) {
        grade = 'S급';
        emoji = '🔴';
        detail = '리레링 강력 추천 (극딜 우수)';
    } else if (score >= 50) {
        grade = 'A급';
        emoji = '🟠';
        detail = '리레링/컨티링 선택형';
    } else if (score >= 30) {
        grade = 'B급';
        emoji = '⚪';
        detail = '컨티링 선호 (지속딜 위주)';
    } else {
        grade = 'C급';
        emoji = '🔵';
        detail = '리레링 거의 안 씀 (지속딜 특화)';
    }

    // 통계 요약
    const statSummary = `리레 ${data.restraint}% / 컨티 ${data.continuous}%`;
    const reason = `${emoji} ${grade} 리레 채택률 ${data.restraint}% [${statSummary}] - ${data.note}`;

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

    // 텔레포트: 40점 
    if (flags.hasTeleport) {
        score += 40;
        reasons.push('텔레포트');
    }

    // 부활/사망방지: 30점
    if (flags.hasRevive) {
        score += 30;
        reasons.push('부활/사망방지');
    }

    // 무적기: 25점
    if (flags.hasInvincible) {
        score += 25;
        reasons.push('무적기');
    }

    // 공격반사무시: 20점
    if (flags.hasBuffIgnore) {
        score += 20;
        reasons.push('공격반사무시');
    }

    // 바인드: 20점
    if (flags.hasBind) {
        score += 20;
        reasons.push('바인드');
    }

    // 파티지원: 15점
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
 * 직업명 정규화 (데이터 조회용)
 */
function normalizeJobName(name: string): string {
    if (name === '듀얼블레이더') return '듀얼블레이드';
    if (name === '캐논슈터') return '캐논마스터';
    return name;
}

/**
 * 종합 점수 계산 (조각 레벨 및 가중치 지정 가능)
 */
export function calculateJobScore(jobName: string, fragmentLevel: HexaFragmentLevel = 'average', weights: RankingWeights = DEFAULT_WEIGHTS): Omit<JobScore, 'rank'> {
    // 데이터 조회를 위해 직업명을 표준 이름으로 변환
    const normalizedName = normalizeJobName(jobName);

    const hexa = calculateHexaScore(normalizedName, fragmentLevel);
    const coolHat = calculateCoolHatScore(normalizedName);
    const rerange = calculateRerangeScore(jobName); // 리레링은 seed-ring-stats.ts 비표준 이름인 경우도 매핑 필요.
    // seed-ring-stats는 이미 위에서 매핑해서 저장했으므로 normalizedName을 쓰는 게 맞지만, 
    // SEED_RING_STATS 파일 작성 시 '듀얼블레이드', '캐논마스터'로 저장했으므로 normalizedName 사용
    // 하지만 rerangeScore 함수 내부에서 getSeedRingStat을 호출하므로, 여기서는 normalizedName을 넘겨주는 게 안전함.

    // *수정*: SEED_RING_STATS에는 '듀얼블레이드', '캐논마스터'로 저장되어 있음.
    // 따라서 calculateRerangeScore(normalizedName) 으로 호출해야 함! (jobName 아님)
    const rerangeCorrected = calculateRerangeScore(normalizedName);

    const utility = calculateUtilityScore(normalizedName);
    const top2000 = getTop2000Score(normalizedName);
    const level280 = getLevel280Score(normalizedName);

    // 가중치 적용한 총점
    const totalScore =
        hexa.score * weights.HEXA_EFFICIENCY +
        coolHat.score * weights.COOL_HAT +
        rerangeCorrected.score * weights.RERANGE +
        utility.score * weights.UTILITY +
        top2000.score * weights.TOP_2000 +
        level280.score * weights.LEVEL_280;

    // 종합 평가 이유
    const overallReason = `
📊 종합 점수: ${totalScore.toFixed(1)}점

【성장 효율】 (${(weights.HEXA_EFFICIENCY * 100).toFixed(0)}% 가중치)
${hexa.reason}

【장비 접근성】 (${(weights.COOL_HAT * 100).toFixed(0)}% 가중치)
${coolHat.reason}

【화력/극딜】 (${(weights.RERANGE * 100).toFixed(0)}% 가중치)
${rerangeCorrected.reason}

【유틸리티】 (${(weights.UTILITY * 100).toFixed(0)}% 가중치)
${utility.reason}

【환산 TOP 2000 인기도】 (${(weights.TOP_2000 * 100).toFixed(0)}% 가중치)
${top2000.reason}

【Lv280+ 레벨링 인기도】 (${(weights.LEVEL_280 * 100).toFixed(0)}% 가중치)
${level280.reason}
  `.trim();

    return {
        job: jobName,
        totalScore,
        hexaScore: hexa.score,
        coolHatScore: coolHat.score,
        rerangeScore: rerangeCorrected.score,
        utilityScore: utility.score,
        top2000Score: top2000.score,
        level280Score: level280.score,
        hexaReason: hexa.reason,
        coolHatReason: coolHat.reason,
        rerangeReason: rerangeCorrected.reason,
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
export function calculateAllJobRankings(fragmentLevel: HexaFragmentLevel = 'average', weights: RankingWeights = DEFAULT_WEIGHTS): JobScore[] {
    const allScores = SEED_RING_STATS.map(data =>
        calculateJobScore(data.job, fragmentLevel, weights)
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
