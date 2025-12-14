/**
 * 메이플 고점 기준 체급 티어표
 * 
 * 평가 기준:
 * - 시너지 고려 X
 * - 컨트롤 난이도 고려 X
 * - 고점 기준 체급 + 딜효율 고려
 * 
 * 순수하게 최대 스펙을 찍었을 때의 DPM/체급 중심 평가
 */

export type CeilingTier = 'SS' | 'S' | 'A' | 'B' | 'C' | 'D';

export interface CeilingTierData {
    tier: CeilingTier;
    jobs: string[];
}

export const HIGH_CEILING_TIER: CeilingTierData[] = [
    {
        tier: 'SS',
        jobs: [
            '카데나'
        ]
    },
    {
        tier: 'S',
        jobs: [
            '일리움',
            '아크',
            '칼리',
            '제논',
            '아크메이지(불,독)',
            '메르세데스',
            '블래스터',
            '플레임위자드',
            '제로',
            '카인',
            '루미너스'
        ]
    },
    {
        tier: 'A',
        jobs: [
            '렌',
            '아델',
            '스트라이커',
            '윈드브레이커',
            '팬텀',
            '다크나이트',
            '키네시스'
        ]
    },
    {
        tier: 'B',
        jobs: [
            '에반',
            '와일드헌터',
            '보우마스터',
            '데몬어벤져',
            '아크메이지(썬,콜)',
            '팔라딘',
            '섀도어',
            '듀얼블레이드',
            '은월',
            '캡틴',
            '아란',
            '소울마스터'
        ]
    },
    {
        tier: 'C',
        jobs: [
            '배틀메이지',
            '비숍',
            '패스파인더',
            '카이저',
            '라라',
            '캐논마스터',
            '신궁'
        ]
    },
    {
        tier: 'D',
        jobs: [
            '바이퍼',
            '미하일',
            '메카닉',
            '데몬슬레이어',
            '호영',
            '엔젤릭버스터',
            '나이트워커',
            '히어로',
            '나이트로드'
        ]
    }
];

/**
 * 직업명으로 고점 체급 티어 조회
 */
export function getCeilingTier(jobName: string): CeilingTier | undefined {
    for (const tierData of HIGH_CEILING_TIER) {
        if (tierData.jobs.includes(jobName)) {
            return tierData.tier;
        }
    }
    return undefined;
}

/**
 * 티어별 직업 목록 조회
 */
export function getJobsByCeilingTier(tier: CeilingTier): string[] {
    const tierData = HIGH_CEILING_TIER.find(t => t.tier === tier);
    return tierData ? tierData.jobs : [];
}

/**
 * 고점 체급 티어 점수 계산 (SS=100, S=90, A=75, B=60, C=40, D=20)
 */
export function getCeilingTierScore(jobName: string): { score: number; tier: CeilingTier; reason: string } {
    const tier = getCeilingTier(jobName);

    if (!tier) {
        return {
            score: 50,
            tier: 'C',
            reason: '고점 체급 티어 데이터 없음'
        };
    }

    let score = 0;
    let reason = '';
    let emoji = '';

    switch (tier) {
        case 'SS':
            score = 100;
            emoji = '👑';
            reason = 'SS티어 - 최고점 체급 1위. 이론상 최대 DPM 최상위';
            break;
        case 'S':
            score = 90;
            emoji = '🔥';
            reason = 'S티어 - 최고점 체급 최상위권. 극한 딜량 우수';
            break;
        case 'A':
            score = 75;
            emoji = '⭐';
            reason = 'A티어 - 고점 체급 상위권. 풀스펙 시 강력한 딜량';
            break;
        case 'B':
            score = 60;
            emoji = '✨';
            reason = 'B티어 - 고점 체급 중위권. 평균적인 최대 딜량';
            break;
        case 'C':
            score = 40;
            emoji = '📊';
            reason = 'C티어 - 고점 체급 중하위권. 최대 딜량 다소 부족';
            break;
        case 'D':
            score = 20;
            emoji = '📉';
            reason = 'D티어 - 고점 체급 하위권. 최대 스펙 대비 딜량 낮음';
            break;
    }

    return { score, tier, reason: `${emoji} ${reason}` };
}

/**
 * 고점 체급 티어 통계
 */
export function getCeilingTierStats() {
    const stats = {
        total: 0,
        SS: 0,
        S: 0,
        A: 0,
        B: 0,
        C: 0,
        D: 0
    };

    HIGH_CEILING_TIER.forEach(tierData => {
        stats[tierData.tier] = tierData.jobs.length;
        stats.total += tierData.jobs.length;
    });

    return {
        ...stats,
        tiers: {
            'SS': { count: stats.SS, description: '최고점 체급 1위' },
            'S': { count: stats.S, description: '최고점 체급 최상위권' },
            'A': { count: stats.A, description: '고점 체급 상위권' },
            'B': { count: stats.B, description: '고점 체급 중위권' },
            'C': { count: stats.C, description: '고점 체급 중하위권' },
            'D': { count: stats.D, description: '고점 체급 하위권' }
        }
    };
}

/**
 * 고점 체급 vs 일반인 티어 비교 분석
 * 난이도가 높아도 체급이 높은 직업들 찾기
 */
export function getHighCeilingHighDifficultyJobs(): string[] {
    // SS, S티어 = 고점은 높지만 난이도가 높을 가능성
    const highCeilingJobs = [
        ...getJobsByCeilingTier('SS'),
        ...getJobsByCeilingTier('S')
    ];

    return highCeilingJobs;
}

/**
 * 평가 특징
 */
export const CEILING_TIER_CHARACTERISTICS = {
    name: '고점 기준 체급 티어',
    criteria: {
        ceiling: '최대 스펙 기준 체급 + 딜효율',
        excluded: ['시너지', '컨트롤 난이도', '투자효율', '저스펙 성능']
    },
    description: '순수하게 최대 DPM을 측정하여 이론상 최고점의 화력을 기준으로 평가',
    note: '실제 플레이 시 컨트롤 난이도와 투자효율 등을 별도로 고려해야 함'
};
