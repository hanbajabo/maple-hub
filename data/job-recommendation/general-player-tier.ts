/**
 * 일반인 기준 직업 티어표
 * 
 * 평가 기준:
 * 1. 난이도 쉬운가 (고점 저점 차이가 적은가)
 *    [2점] 매우쉬움, [1점] 쉬움, [0점] 보통, [-1점] 어려움, [-2점] 존나어려움
 * 
 * 2. 고점이 높은가 (직업별 천외천 제외 일반인 고점 기준)
 *    [2점] 존나높음, [1점] 높음, [0점] 보통, [-1점] 낮음, [-2점] ㅈㄴ낮음
 * 
 * 3. 투자효율 (쿨뚝, 헥사강화 조각 만개급 투자)
 *    [1점] 스탯뚝 + 1만급 효율 좋음(붉은색), [0점] 스탯뚝 or 파란색, [-1점] 5초 뚝쓰는데 파란색
 * 
 * 4. 최종뎀% 시너지가 있는가 (가산점)
 *    [2점] 사기시너지, [1점] 시너지 다소 있음, [0점] 없음
 */

export type GeneralTier = 'SS' | 'S' | 'A' | 'B' | 'C' | 'D';

export interface GeneralTierData {
    tier: GeneralTier;
    jobs: string[];
}

export const GENERAL_PLAYER_TIER: GeneralTierData[] = [
    {
        tier: 'SS',
        jobs: [
            '일리움',
            '비숍',
            '배틀메이지',
            '팔라딘',
            '캡틴',
            '렌'
        ]
    },
    {
        tier: 'S',
        jobs: [
            '아크메이지(썬,콜)',
            '윈드브레이커',
            '보우마스터',
            '소울마스터',
            '아크'
        ]
    },
    {
        tier: 'A',
        jobs: [
            '플레임위자드',
            '제논',
            '아란',
            '루미너스',
            '아델',
            '섀도어',
            '스트라이커',
            '제로',
            '바이퍼',
            '라라',
            '메르세데스',
            '카인',
            '팬텀'
        ]
    },
    {
        tier: 'B',
        jobs: [
            '메카닉',
            '다크나이트',
            '와일드헌터',
            '은월',
            '듀얼블레이드',
            '아크메이지(불,독)',
            '데몬어벤져',
            '카이저',
            '블래스터',
            '카데나',
            '에반',
            '캐논슈터',
            '나이트로드'
        ]
    },
    {
        tier: 'C',
        jobs: [
            '칼리',
            '신궁',
            '패스파인더',
            '엔젤릭버스터',
            '호영'
        ]
    },
    {
        tier: 'D',
        jobs: [
            '나이트워커',
            '히어로',
            '데몬슬레이어',
            '키네시스',
            '미하일'
        ]
    }
];

/**
 * 직업명으로 일반인 티어 조회
 */
export function getGeneralTier(jobName: string): GeneralTier | undefined {
    for (const tierData of GENERAL_PLAYER_TIER) {
        if (tierData.jobs.includes(jobName)) {
            return tierData.tier;
        }
    }
    return undefined;
}

/**
 * 티어별 직업 목록 조회
 */
export function getJobsByGeneralTier(tier: GeneralTier): string[] {
    const tierData = GENERAL_PLAYER_TIER.find(t => t.tier === tier);
    return tierData ? tierData.jobs : [];
}

/**
 * 일반인 티어 점수 계산 (SS=100, S=90, A=75, B=60, C=40, D=20)
 */
export function getGeneralTierScore(jobName: string): { score: number; tier: GeneralTier; reason: string } {
    const tier = getGeneralTier(jobName);

    if (!tier) {
        return {
            score: 50,
            tier: 'C',
            reason: '일반인 티어 데이터 없음'
        };
    }

    let score = 0;
    let reason = '';

    switch (tier) {
        case 'SS':
            score = 100;
            reason = 'SS티어 - 난이도/고점/투자/시너지';
            break;
        case 'S':
            score = 90;
            reason = 'S티어 - 난이도/고점/투자';
            break;
        case 'A':
            score = 75;
            reason = 'A티어 - 난이도/고점';
            break;
        case 'B':
            score = 60;
            reason = 'B티어 - 평가 기준 혼합';
            break;
        case 'C':
            score = 40;
            reason = 'C티어 - 평가 기준 낮음';
            break;
        case 'D':
            score = 20;
            reason = 'D티어 - 평가 기준 매우 낮음';
            break;
    }

    return { score, tier, reason };
}

/**
 * 일반인 티어 통계
 */
export function getGeneralTierStats() {
    const stats = {
        total: 0,
        SS: 0,
        S: 0,
        A: 0,
        B: 0,
        C: 0,
        D: 0
    };

    GENERAL_PLAYER_TIER.forEach(tierData => {
        stats[tierData.tier] = tierData.jobs.length;
        stats.total += tierData.jobs.length;
    });

    return stats;
}

/**
 * 평가 기준 정보
 */
export const GENERAL_TIER_CRITERIA = {
    difficulty: {
        name: '난이도 (고점 저점 차이)',
        scores: {
            veryEasy: { score: 2, label: '매우쉬움' },
            easy: { score: 1, label: '쉬움' },
            normal: { score: 0, label: '보통' },
            hard: { score: -1, label: '어려움' },
            veryHard: { score: -2, label: '존나어려움' }
        }
    },
    ceiling: {
        name: '고점 (일반인 기준)',
        scores: {
            veryHigh: { score: 2, label: '존나높음' },
            high: { score: 1, label: '높음' },
            normal: { score: 0, label: '보통' },
            low: { score: -1, label: '낮음' },
            veryLow: { score: -2, label: 'ㅈㄴ낮음' }
        }
    },
    efficiency: {
        name: '투자효율 (쿨뚝 + 헥사)',
        scores: {
            good: { score: 1, label: '스탯뚝 + 1만급 효율 좋음(붉은색)' },
            normal: { score: 0, label: '스탯뚝 or 파란색' },
            bad: { score: -1, label: '5초 뚝쓰는데 파란색' }
        }
    },
    synergy: {
        name: '최종뎀% 시너지 (가산점)',
        scores: {
            op: { score: 2, label: '사기시너지' },
            some: { score: 1, label: '시너지 다소 있음' },
            none: { score: 0, label: '없음' }
        }
    }
};
