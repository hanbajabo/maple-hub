/**
 * 메이플스카우터 환산 랭킹 TOP 100 직업 분포
 * 출처: https://maplescouter.com/total-ranking
 * 수집일: 2025-12-12
 */

export interface JobDistribution {
    job: string;
    count: number;
    percentage: number;
    ranks: number[]; // 해당 직업이 등장한 순위들
}

// 원본 데이터에서 추출한 직업 목록 (1-100위)
const TOP_100_JOBS = [
    '칼리', '아델', '렌', '캐논슈터', '다크나이트', '캐논슈터', '팬텀', '비숍', '데몬어벤져', '아크메이지(불,독)',
    '나이트로드', '데몬어벤져', '소울마스터', '엔젤릭버스터', '나이트로드', '듀얼블레이드', '윈드브레이커', '팔라딘', '바이퍼', '카데나',
    '나이트워커', '아크메이지(불,독)', '아델', '듀얼블레이드', '듀얼블레이드', '윈드브레이커', '제논', '비숍', '섀도어', '나이트로드',
    '나이트로드', '나이트로드', '보우마스터', '아크메이지(불,독)', '아델', '히어로', '아델', '캐논슈터', '바이퍼', '은월',
    '카데나', '일리움', '듀얼블레이드', '섀도어', '에반', '제로', '제로', '듀얼블레이드', '팬텀', '호영',
    '데몬어벤져', '메르세데스', '윈드브레이커', '캐논슈터', '아크메이지(불,독)', '비숍', '바이퍼', '제논', '메카닉', '비숍',
    '팬텀', '비숍', '아델', '데몬어벤져', '다크나이트', '히어로', '엔젤릭버스터', '아크메이지(썬,콜)', '나이트로드', '팬텀',
    '나이트로드', '은월', '나이트로드', '캐논슈터', '키네시스', '듀얼블레이드', '은월', '카데나', '비숍', '캡틴',
    '에반', '듀얼블레이드', '윈드브레이커', '아란', '나이트워커', '메르세데스', '나이트로드', '아란', '히어로', '루미너스',
    '렌', '팔라딘', '메카닉', '소울마스터', '나이트워커', '렌', '히어로', '윈드브레이커', '캡틴', '팬텀'
];

// 직업별 카운트 계산
function calculateDistribution(): JobDistribution[] {
    const jobMap = new Map<string, { count: number; ranks: number[] }>();

    TOP_100_JOBS.forEach((job, index) => {
        const rank = index + 1;
        if (!jobMap.has(job)) {
            jobMap.set(job, { count: 0, ranks: [] });
        }
        const data = jobMap.get(job)!;
        data.count++;
        data.ranks.push(rank);
    });

    const distribution: JobDistribution[] = [];
    jobMap.forEach((data, job) => {
        distribution.push({
            job,
            count: data.count,
            percentage: (data.count / 100) * 100,
            ranks: data.ranks
        });
    });

    // 개수 기준 내림차순 정렬
    distribution.sort((a, b) => b.count - a.count);

    return distribution;
}

export const MAPLESCOUTER_TOP100_DISTRIBUTION = calculateDistribution();

// 통계 요약
export const STATISTICS = {
    totalRankings: 100,
    uniqueJobs: MAPLESCOUTER_TOP100_DISTRIBUTION.length,
    mostPopularJob: MAPLESCOUTER_TOP100_DISTRIBUTION[0],
    averagePerJob: 100 / MAPLESCOUTER_TOP100_DISTRIBUTION.length
};

// 직업별 평균 순위 계산
export function getAverageRank(job: string): number | null {
    const data = MAPLESCOUTER_TOP100_DISTRIBUTION.find(d => d.job === job);
    if (!data) return null;

    const sum = data.ranks.reduce((acc, rank) => acc + rank, 0);
    return sum / data.ranks.length;
}

// 티어별 분류 (상위 분포 기준)
export function getTierByDistribution(): Record<string, JobDistribution[]> {
    const dist = MAPLESCOUTER_TOP100_DISTRIBUTION;

    return {
        'S티어 (10개 이상)': dist.filter(d => d.count >= 10),
        'A티어 (5-9개)': dist.filter(d => d.count >= 5 && d.count < 10),
        'B티어 (3-4개)': dist.filter(d => d.count >= 3 && d.count < 5),
        'C티어 (1-2개)': dist.filter(d => d.count >= 1 && d.count < 3)
    };
}

// 콘솔 출력용
export function printDistribution() {
    console.log('='.repeat(80));
    console.log('📊 메이플스카우터 환산 랭킹 TOP 100 직업 분포');
    console.log('='.repeat(80));
    console.log('');

    MAPLESCOUTER_TOP100_DISTRIBUTION.forEach((data, index) => {
        const avgRank = getAverageRank(data.job)?.toFixed(1);
        console.log(
            `${(index + 1).toString().padStart(2)}위. ${data.job.padEnd(20)} ` +
            `${data.count.toString().padStart(2)}개 (${data.percentage.toFixed(1)}%) ` +
            `평균 ${avgRank}위`
        );
    });

    console.log('');
    console.log('='.repeat(80));
    console.log(`총 ${STATISTICS.uniqueJobs}개 직업이 TOP 100에 랭크됨`);
    console.log(`가장 많은 직업: ${STATISTICS.mostPopularJob.job} (${STATISTICS.mostPopularJob.count}개)`);
    console.log('='.repeat(80));
}
