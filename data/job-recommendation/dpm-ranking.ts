/**
 * 직업별 극딜 / 극딜+준극 점유율 순위 (리레링 사용량)
 * 출처: https://maple.ai.kr/guide/seed-ring-guide
 * 
 * 티어 설명:
 * 🔴 - 최상위 티어 (1-14위)
 * 🟠 - 상위 티어 (15-28위)
 * ⚪ - 중위 티어 (29-38위)
 * 🔵 - 하위 티어 (39-47위)
 */

export interface DPMRanking {
    rank: number;
    tier: '🔴' | '🟠' | '⚪' | '🔵';
    job: string;
}

export const DPM_RANKING_DATA: DPMRanking[] = [
    { rank: 1, tier: '🔴', job: '나이트로드' },
    { rank: 2, tier: '🔴', job: '렌' },
    { rank: 3, tier: '🔴', job: '메르세데스' },
    { rank: 4, tier: '🔴', job: '히어로' },
    { rank: 5, tier: '🔴', job: '아크메이지(썬,콜)' },
    { rank: 6, tier: '🔴', job: '아란' },
    { rank: 7, tier: '🔴', job: '나이트워커' },
    { rank: 8, tier: '🔴', job: '미하일' },
    { rank: 9, tier: '🔴', job: '아크' },
    { rank: 10, tier: '🔴', job: '카데나' },
    { rank: 11, tier: '🔴', job: '키네시스' },
    { rank: 12, tier: '🔴', job: '데몬슬레이어' },
    { rank: 13, tier: '🔴', job: '패스파인더' },
    { rank: 14, tier: '🔴', job: '윈드브레이커' },
    { rank: 15, tier: '🟠', job: '와일드헌터' },
    { rank: 16, tier: '🟠', job: '아델' },
    { rank: 17, tier: '🟠', job: '소울마스터' },
    { rank: 18, tier: '🟠', job: '은월' },
    { rank: 19, tier: '🟠', job: '신궁' },
    { rank: 20, tier: '🟠', job: '제논' },
    { rank: 21, tier: '🟠', job: '엔젤릭버스터' },
    { rank: 22, tier: '🟠', job: '호영' },
    { rank: 23, tier: '🟠', job: '듀얼블레이드' },
    { rank: 24, tier: '🟠', job: '루미너스' },
    { rank: 25, tier: '🟠', job: '카인' },
    { rank: 26, tier: '🟠', job: '팬텀' },
    { rank: 27, tier: '🟠', job: '섀도어' },
    { rank: 28, tier: '🟠', job: '라라' },
    { rank: 29, tier: '⚪', job: '비숍' },
    { rank: 30, tier: '⚪', job: '플레임위자드' },
    { rank: 31, tier: '⚪', job: '캐논슈터' },
    { rank: 32, tier: '⚪', job: '일리움' },
    { rank: 33, tier: '⚪', job: '칼리' },
    { rank: 34, tier: '⚪', job: '팔라딘' },
    { rank: 35, tier: '⚪', job: '바이퍼' },
    { rank: 36, tier: '⚪', job: '보우마스터' },
    { rank: 37, tier: '⚪', job: '블래스터' },
    { rank: 38, tier: '⚪', job: '캡틴' },
    { rank: 39, tier: '🔵', job: '메카닉' },
    { rank: 40, tier: '🔵', job: '배틀메이지' },
    { rank: 41, tier: '🔵', job: '다크나이트' },
    { rank: 42, tier: '🔵', job: '데몬어벤져' },
    { rank: 43, tier: '🔵', job: '에반' },
    { rank: 44, tier: '🔵', job: '제로' },
    { rank: 45, tier: '🔵', job: '아크메이지(불,독)' },
    { rank: 46, tier: '🔵', job: '카이저' },
    { rank: 47, tier: '🔵', job: '스트라이커' },
];

/**
 * 직업명으로 DPM 순위 정보 조회
 */
export function getDPMRankingByJob(jobName: string): DPMRanking | undefined {
    return DPM_RANKING_DATA.find(item => item.job === jobName);
}

/**
 * 티어별 직업 목록 조회
 */
export function getJobsByTier(tier: '🔴' | '🟠' | '⚪' | '🔵'): DPMRanking[] {
    return DPM_RANKING_DATA.filter(item => item.tier === tier);
}

/**
 * 티어 이름 반환
 */
export function getTierName(tier: '🔴' | '🟠' | '⚪' | '🔵'): string {
    const tierNames = {
        '🔴': '최상위',
        '🟠': '상위',
        '⚪': '중위',
        '🔵': '하위',
    };
    return tierNames[tier];
}

/**
 * 직업의 DPM 점수 계산 (순위 기반, 높을수록 좋음)
 * 1위 = 100점, 47위 = 54점
 */
export function getDPMScore(jobName: string): number {
    const ranking = getDPMRankingByJob(jobName);
    if (!ranking) return 0;

    // 역순으로 점수 계산 (1위가 가장 높은 점수)
    return 101 - ranking.rank;
}

/**
 * ������ ��ó
 * - �õ帵 ä�÷�(������ ��뷮): https://maple.ai.kr/guide/seed-ring-guide
 */
