/**
 * 직업 분포 데이터
 * - 환산주스텟 TOP 2000 직업 분포도
 * - Lv280+ 직업 분포도
 * 출처: 메이플스카우터 (2025-12-12)
 */

// 환산 TOP 2000 직업 분포 (1-47위)
export const TOP_2000_DISTRIBUTION: Record<string, { count: number; percentage: number; rank: number }> = {
    // S티어 (100개 이상, 5%+)
    '나이트로드': { count: 237, percentage: 11.85, rank: 1 },
    '듀얼블레이드': { count: 199, percentage: 9.95, rank: 2 },
    '비숍': { count: 179, percentage: 8.95, rank: 3 },
    '아델': { count: 178, percentage: 8.90, rank: 4 },
    '아크메이지(불,독)': { count: 156, percentage: 7.80, rank: 5 },

    // A티어 (50-99개, 2.5-5%)
    '팬텀': { count: 95, percentage: 4.75, rank: 6 },
    '제논': { count: 91, percentage: 4.55, rank: 7 },
    '메르세데스': { count: 86, percentage: 4.30, rank: 8 },
    '윈드브레이커': { count: 80, percentage: 4.00, rank: 9 },
    '섀도어': { count: 76, percentage: 3.80, rank: 10 },
    '팔라딘': { count: 71, percentage: 3.55, rank: 11 },
    '나이트워커': { count: 61, percentage: 3.05, rank: 12 },
    '히어로': { count: 60, percentage: 3.00, rank: 13 },
    '에반': { count: 56, percentage: 2.80, rank: 14 },
    '아크': { count: 54, percentage: 2.70, rank: 15 },
    '다크나이트': { count: 53, percentage: 2.65, rank: 16 },
    '은월': { count: 51, percentage: 2.55, rank: 17 },
    '아크메이지(썬,콜)': { count: 50, percentage: 2.50, rank: 18 },

    // B티어 (30-49개, 1.5-2.5%)
    '호영': { count: 47, percentage: 2.35, rank: 19 },
    '아란': { count: 44, percentage: 2.20, rank: 20 },
    '제로': { count: 42, percentage: 2.10, rank: 21 },
    '보우마스터': { count: 39, percentage: 1.95, rank: 22 },
    '데몬어벤져': { count: 39, percentage: 1.95, rank: 23 },
    '패스파인더': { count: 37, percentage: 1.85, rank: 24 },
    '렌': { count: 36, percentage: 1.80, rank: 25 },

    // C티어 (15-29개, 0.75-1.5%)
    '소울마스터': { count: 29, percentage: 1.45, rank: 26 },
    '엔젤릭버스터': { count: 29, percentage: 1.45, rank: 27 },
    '카데나': { count: 24, percentage: 1.20, rank: 28 },
    '캐논마스터': { count: 23, percentage: 1.15, rank: 29 },
    '바이퍼': { count: 23, percentage: 1.15, rank: 30 },
    '카인': { count: 22, percentage: 1.10, rank: 31 },
    '메카닉': { count: 17, percentage: 0.85, rank: 32 },
    '캡틴': { count: 16, percentage: 0.80, rank: 33 },
    '라라': { count: 16, percentage: 0.80, rank: 34 },
    '카이저': { count: 15, percentage: 0.75, rank: 35 },

    // D티어 (14개 이하, 0.75% 미만)
    '데몬슬레이어': { count: 14, percentage: 0.70, rank: 36 },
    '배틀메이지': { count: 14, percentage: 0.70, rank: 37 },
    '칼리': { count: 11, percentage: 0.55, rank: 38 },
    '키네시스': { count: 10, percentage: 0.50, rank: 39 },
    '와일드헌터': { count: 10, percentage: 0.50, rank: 40 },
    '미하일': { count: 9, percentage: 0.45, rank: 41 },
    '루미너스': { count: 9, percentage: 0.45, rank: 42 },
    '스트라이커': { count: 9, percentage: 0.45, rank: 43 },
    '블래스터': { count: 8, percentage: 0.40, rank: 44 },
    '플레임위자드': { count: 7, percentage: 0.35, rank: 45 },
    '신궁': { count: 7, percentage: 0.35, rank: 46 },
    '일리움': { count: 6, percentage: 0.30, rank: 47 }
};

// Lv280+ 직업 분포 (1-47위)
export const LEVEL_280_DISTRIBUTION: Record<string, { percentage: number; rank: number }> = {
    // S티어 (렌 독주 + 상위권)
    '렌': { percentage: 31.56, rank: 1 },
    '비숍': { percentage: 4.29, rank: 2 },
    '아델': { percentage: 3.74, rank: 3 },
    '나이트로드': { percentage: 3.39, rank: 4 },
    '섀도어': { percentage: 3.12, rank: 5 },

    // A티어
    '듀얼블레이드': { percentage: 2.89, rank: 6 },
    '보우마스터': { percentage: 2.74, rank: 7 },
    '윈드브레이커': { percentage: 2.67, rank: 8 },
    '아크메이지(불,독)': { percentage: 2.63, rank: 9 },
    '아크메이지(썬,콜)': { percentage: 2.26, rank: 10 },
    '제로': { percentage: 2.05, rank: 11 },
    '나이트워커': { percentage: 1.97, rank: 12 },
    '히어로': { percentage: 1.89, rank: 13 },
    '바이퍼': { percentage: 1.82, rank: 14 },
    '은월': { percentage: 1.73, rank: 15 },
    '소울마스터': { percentage: 1.72, rank: 16 },
    '팬텀': { percentage: 1.70, rank: 17 },
    '일리움': { percentage: 1.68, rank: 18 },

    // B티어
    '엔젤릭버스터': { percentage: 1.62, rank: 19 },
    '데몬어벤져': { percentage: 1.55, rank: 20 },
    '팔라딘': { percentage: 1.52, rank: 21 },
    '메르세데스': { percentage: 1.43, rank: 22 },
    '패스파인더': { percentage: 1.36, rank: 23 },
    '아크': { percentage: 1.32, rank: 24 },
    '다크나이트': { percentage: 1.29, rank: 25 },
    '배틀메이지': { percentage: 1.19, rank: 26 },
    '호영': { percentage: 1.17, rank: 27 },
    '라라': { percentage: 1.15, rank: 28 },
    '에반': { percentage: 1.09, rank: 29 },
    '제논': { percentage: 1.03, rank: 30 },

    // C티어
    '칼리': { percentage: 0.92, rank: 31 },
    '카이저': { percentage: 0.87, rank: 32 },
    '캡틴': { percentage: 0.86, rank: 33 },
    '스트라이커': { percentage: 0.85, rank: 34 },
    '아란': { percentage: 0.83, rank: 35 },
    '카인': { percentage: 0.79, rank: 36 },
    '카데나': { percentage: 0.73, rank: 37 },
    '캐논마스터': { percentage: 0.68, rank: 38 },
    '데몬슬레이어': { percentage: 0.62, rank: 39 },

    // D티어
    '루미너스': { percentage: 0.55, rank: 40 },
    '미하일': { percentage: 0.51, rank: 41 },
    '신궁': { percentage: 0.50, rank: 42 },
    '키네시스': { percentage: 0.43, rank: 43 },
    '메카닉': { percentage: 0.39, rank: 44 },
    '플레임위자드': { percentage: 0.36, rank: 45 },
    '블래스터': { percentage: 0.35, rank: 46 },
    '와일드헌터': { percentage: 0.17, rank: 47 }
};

/**
 * 환산 TOP 2000 점수 계산 (순위 기반)
 * 1위 = 100점, 47위 = 50점
 */
export function getTop2000Score(jobName: string): { score: number; reason: string } {
    const data = TOP_2000_DISTRIBUTION[jobName];

    if (!data) {
        return { score: 25, reason: '환산 TOP 2000 분포 데이터 없음' };
    }

    // 순위를 점수로 변환 (1위 = 100점, 47위 = 50점)
    const score = 100 - ((data.rank - 1) / 46) * 50;

    // 순위 구간별 등급 판정
    let grade = '';
    let detail = '';
    let emoji = '';

    if (data.rank <= 3) {
        grade = 'S급';
        emoji = '🥇';
        detail = `압도적 인기. 커뮤니티 규모 최대, 정보 매우 풍부`;
    } else if (data.rank <= 10) {
        grade = 'A+급';
        emoji = '🏆';
        detail = `매우 높은 인기. 커뮤니티 규모 크고 정보 풍부`;
    } else if (data.rank <= 20) {
        grade = 'A급';
        emoji = '⭐';
        detail = `높은 인기. 충분한 커뮤니티와 정보`;
    } else if (data.rank <= 30) {
        grade = 'B급';
        emoji = '✨';
        detail = `중간 인기. 적당한 커뮤니티 규모, 정보 접근성 양호`;
    } else if (data.rank <= 40) {
        grade = 'C급';
        emoji = '📊';
        detail = `낮은 인기. 작은 커뮤니티, 정보 다소 부족`;
    } else {
        grade = 'D급';
        emoji = '📉';
        detail = `매우 낮은 인기. 희소 직업, 정보 부족`;
    }

    const reason = `${emoji} ${grade} [환산 TOP 2000 직업 분포도] ${data.rank}위/47직업 (${data.percentage.toFixed(2)}%, ${data.count}명) - ${detail}`;

    return { score, reason };
}

/**
 * Lv280+ 레벨링 인기도 점수 계산 (순위 기반)
 * 1위 = 100점, 47위 = 50점
 */
export function getLevel280Score(jobName: string): { score: number; reason: string } {
    const data = LEVEL_280_DISTRIBUTION[jobName];

    if (!data) {
        return { score: 25, reason: 'Lv280+ 분포 데이터 없음' };
    }

    // 순위를 점수로 변환 (1위 = 100점, 47위 = 50점)
    const score = 100 - ((data.rank - 1) / 46) * 50;

    // 순위 구간별 등급 판정
    let grade = '';
    let detail = '';
    let emoji = '';

    if (data.rank === 1) {
        // 렌 독주 (31.56%)
        grade = 'S+급';
        emoji = '🥇👑';
        detail = `압도적 점유율. Lv280+ 유저 중 가장 많은 수가 선택한 직업, 1인자 독주`;
    } else if (data.rank <= 5) {
        grade = 'S급';
        emoji = '🥇';
        detail = `매우 높은 점유율. Lv280+ 유저 중 상위권 선호도`;
    } else if (data.rank <= 12) {
        grade = 'A+급';
        emoji = '🏆';
        detail = `높은 점유율. 많은 유저가 280레벨 이상 달성`;
    } else if (data.rank <= 24) {
        grade = 'A급';
        emoji = '⭐';
        detail = `준수한 점유율. 적당히 많은 유저가 280+ 달성`;
    } else if (data.rank <= 35) {
        grade = 'B급';
        emoji = '✨';
        detail = `중간 점유율. 평균적인 280+ 유저 수`;
    } else if (data.rank <= 42) {
        grade = 'C급';
        emoji = '📊';
        detail = `낮은 점유율. 280+ 달성 유저 수 적음`;
    } else {
        grade = 'D급';
        emoji = '📉';
        detail = `매우 낮은 점유율. 280+ 달성 유저 거의 없음`;
    }

    const reason = `${emoji} ${grade} [Lv280+] ${data.rank}위/47직업 (${data.percentage.toFixed(2)}%) - ${detail}`;

    return { score, reason };
}
