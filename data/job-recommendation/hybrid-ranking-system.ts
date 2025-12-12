/**
 * 혼합 순위 시스템
 * AI 순위와 외부 평가를 조합한 하이브리드 순위
 */

import { calculateAllJobRankings, HexaFragmentLevel } from './job-ranking-system';
import { getYoutuberRanking, YOUTUBER_JOB_RANKING } from './youtuber-job-ranking';
import { getGeneralTierScore } from './general-player-tier';
import { getCeilingTierScore } from './high-ceiling-tier';

export type HybridMode = 'youtuber' | 'general' | 'ceiling';

export interface HybridJobScore {
    job: string;
    totalScore: number;
    aiScore: number;
    externalScore: number;
    rank: number;
    aiReason: string;
    externalReason: string;
    mode: HybridMode;
    hybridFragmentLevel: HexaFragmentLevel;
}

/**
 * 유튜버 순위를 0-100 점수로 변환
 * 1위(10점) = 100점, 47위(1점) = 약 11점
 */
function convertYoutuberScoreToHundred(youtuberScore: number): number {
    // 유튜버 점수 범위: 1.0 ~ 10.0
    // 선형 변환: (점수 - 최소) / (최대 - 최소) * 100
    const min = 1.0;
    const max = 10.0;
    return ((youtuberScore - min) / (max - min)) * 100;
}

/**
 * 하이브리드 순위 계산 (AI 50% + 외부 평가 50%)
 */
export function calculateHybridRankings(
    mode: HybridMode,
    fragmentLevel: HexaFragmentLevel = 'average'
): HybridJobScore[] {
    // AI 순위 가져오기
    const aiRankings = calculateAllJobRankings(fragmentLevel);

    const hybridScores: HybridJobScore[] = [];

    aiRankings.forEach(aiRanking => {
        let externalScore = 0;
        let externalReason = '';

        switch (mode) {
            case 'youtuber': {
                // 유튜버 순위
                const youtuberData = getYoutuberRanking(aiRanking.job);
                if (youtuberData) {
                    externalScore = convertYoutuberScoreToHundred(youtuberData.score);
                    externalReason = `🎬 유튜버 ${youtuberData.rank}위 (${youtuberData.score}점) - ${youtuberData.reason}`;
                } else {
                    externalScore = 50;
                    externalReason = '유튜버 순위 데이터 없음';
                }
                break;
            }
            case 'general': {
                // 일반인 티어
                const generalData = getGeneralTierScore(aiRanking.job);
                externalScore = generalData.score;
                externalReason = `👥 일반인 ${generalData.tier}티어 - ${generalData.reason}`;
                break;
            }
            case 'ceiling': {
                // 고점 체급 티어
                const ceilingData = getCeilingTierScore(aiRanking.job);
                externalScore = ceilingData.score;
                externalReason = `${ceilingData.reason}`;
                break;
            }
        }

        // AI 50% + 외부 평가 50%
        const totalScore = (aiRanking.totalScore * 0.5) + (externalScore * 0.5);

        hybridScores.push({
            job: aiRanking.job,
            totalScore,
            aiScore: aiRanking.totalScore,
            externalScore,
            rank: 0, // 나중에 설정
            aiReason: aiRanking.overallReason,
            externalReason,
            mode,
            hybridFragmentLevel: fragmentLevel
        });
    });

    // 총점 기준 정렬
    hybridScores.sort((a, b) => b.totalScore - a.totalScore);

    // 순위 부여
    hybridScores.forEach((score, index) => {
        score.rank = index + 1;
    });

    return hybridScores;
}

/**
 * 특정 직업의 하이브리드 순위 조회
 */
export function getHybridJobRanking(
    jobName: string,
    mode: HybridMode,
    fragmentLevel: HexaFragmentLevel = 'average'
): HybridJobScore | undefined {
    const rankings = calculateHybridRankings(mode, fragmentLevel);
    return rankings.find(r => r.job === jobName);
}

/**
 * 모드별 설명
 */
export const HYBRID_MODE_DESCRIPTION = {
    youtuber: {
        name: '유튜버 혼합 순위',
        description: 'AI 데이터(50%) + 유튜버 챌린저스 평가(50%)',
        detail: '저스펙 체급, 극딜 비중, 쌀피엠(저레벨 헥사 구간 효율), 쿨감 의존도를 고려한 유튜버 평가 반영'
    },
    general: {
        name: '일반인 혼합 순위',
        description: 'AI 데이터(50%) + 일반인 티어 평가(50%)',
        detail: '난이도, 고점, 투자효율, 시너지를 고려한 일반 유저 관점 평가 반영'
    },
    ceiling: {
        name: '고점 체급 혼합 순위',
        description: 'AI 데이터(50%) + 고점 체급 평가(50%)',
        detail: '이론상 최대 DPM과 체급을 고려한 순수 화력 평가 반영'
    }
};
