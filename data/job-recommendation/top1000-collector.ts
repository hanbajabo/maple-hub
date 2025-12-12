/**
 * 메이플스카우터 TOP 1000 직업 데이터 수집
 * 
 * 사용 방법:
 * 1. 각 배치(100개)의 직업명을 addBatch()로 추가
 * 2. 모든 데이터 수집 후 분석 실행
 */

export interface JobRankingData {
    rank: number;
    job: string;
    batch: number; // 1-10 (각 100개 배치)
}

// 전체 데이터 저장
let allRankings: JobRankingData[] = [];

// 배치별 직업 목록
const batches: string[][] = [];

/**
 * 배치 데이터 추가 (101-200, 201-300 등)
 * @param batchNumber 배치 번호 (1=1-100위, 2=101-200위, ...)
 * @param jobs 직업명 배열 (순서대로 100개)
 */
export function addBatch(batchNumber: number, jobs: string[]) {
    if (jobs.length !== 100) {
        console.warn(`⚠️ 배치 ${batchNumber}의 데이터가 ${jobs.length}개입니다. 100개여야 합니다.`);
    }

    batches[batchNumber - 1] = jobs;

    // 전체 랭킹 업데이트
    allRankings = [];
    batches.forEach((batch, index) => {
        batch.forEach((job, jobIndex) => {
            allRankings.push({
                rank: index * 100 + jobIndex + 1,
                job,
                batch: index + 1
            });
        });
    });

    console.log(`✅ 배치 ${batchNumber} 추가 완료 (총 ${allRankings.length}개 수집됨)`);
}

/**
 * 원시 텍스트에서 직업명만 추출
 * 메이플스카우터 복사 데이터를 자동 파싱
 */
export function parseRawText(text: string): string[] {
    const lines = text.split('\n');
    const jobs: string[] = [];

    // 직업명 패턴 매칭
    const jobPattern = /^(\d+)\s+character\s+.*?\t([가-힣\(\),/]+)\t/m;

    for (const line of lines) {
        // 간단한 패턴: 탭으로 구분된 텍스트에서 직업명 추출
        const parts = line.split('\t');
        if (parts.length >= 2) {
            const potentialJob = parts[1].trim();
            // 한글과 괄호만 포함된 경우 직업명으로 간주
            if (/^[가-힣\(\),]+$/.test(potentialJob)) {
                jobs.push(potentialJob);
            }
        }
    }

    return jobs;
}

/**
 * 직업별 분포 분석
 */
export function analyzeDistribution() {
    const jobMap = new Map<string, number[]>();

    allRankings.forEach(({ rank, job }) => {
        if (!jobMap.has(job)) {
            jobMap.set(job, []);
        }
        jobMap.get(job)!.push(rank);
    });

    const distribution = Array.from(jobMap.entries()).map(([job, ranks]) => ({
        job,
        count: ranks.length,
        percentage: (ranks.length / allRankings.length) * 100,
        averageRank: ranks.reduce((a, b) => a + b, 0) / ranks.length,
        bestRank: Math.min(...ranks),
        worstRank: Math.max(...ranks),
        ranks
    }));

    distribution.sort((a, b) => b.count - a.count);

    return distribution;
}

/**
 * 구간별 분석 (1-100, 101-200, ...)
 */
export function analyzeByRange() {
    const ranges = [
        { name: '1-100위', start: 1, end: 100 },
        { name: '101-200위', start: 101, end: 200 },
        { name: '201-300위', start: 201, end: 300 },
        { name: '301-400위', start: 301, end: 400 },
        { name: '401-500위', start: 401, end: 500 },
        { name: '501-600위', start: 501, end: 600 },
        { name: '601-700위', start: 601, end: 700 },
        { name: '701-800위', start: 701, end: 800 },
        { name: '801-900위', start: 801, end: 900 },
        { name: '901-1000위', start: 901, end: 1000 }
    ];

    return ranges.map(range => {
        const rangeData = allRankings.filter(r => r.rank >= range.start && r.rank <= range.end);
        const jobCount = new Map<string, number>();

        rangeData.forEach(({ job }) => {
            jobCount.set(job, (jobCount.get(job) || 0) + 1);
        });

        const top3 = Array.from(jobCount.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        return {
            range: range.name,
            totalJobs: rangeData.length,
            uniqueJobs: jobCount.size,
            top3Jobs: top3.map(([job, count]) => ({ job, count }))
        };
    });
}

/**
 * 현재 수집 상태
 */
export function getCollectionStatus() {
    return {
        totalCollected: allRankings.length,
        batchesCollected: batches.filter(b => b && b.length > 0).length,
        progress: (allRankings.length / 1000) * 100,
        remainingBatches: 10 - batches.filter(b => b && b.length > 0).length
    };
}

/**
 * 결과 출력
 */
export function printResults() {
    const status = getCollectionStatus();
    console.log('='.repeat(80));
    console.log(`📊 메이플스카우터 TOP ${allRankings.length} 직업 분포`);
    console.log('='.repeat(80));
    console.log(`수집 진행률: ${status.progress.toFixed(1)}% (${status.batchesCollected}/10 배치)`);
    console.log('');

    const distribution = analyzeDistribution();
    console.log('【직업별 분포 TOP 20】');
    distribution.slice(0, 20).forEach((d, i) => {
        console.log(
            `${(i + 1).toString().padStart(2)}. ${d.job.padEnd(20)} ` +
            `${d.count.toString().padStart(3)}개 (${d.percentage.toFixed(1)}%) ` +
            `평균 ${d.averageRank.toFixed(1)}위`
        );
    });

    console.log('');
    console.log('【구간별 분석】');
    const rangeAnalysis = analyzeByRange();
    rangeAnalysis.forEach(range => {
        if (range.totalJobs > 0) {
            console.log(`\n${range.range}:`);
            console.log(`  고유 직업 수: ${range.uniqueJobs}개`);
            console.log(`  TOP 3: ${range.top3Jobs.map(j => `${j.job}(${j.count})`).join(', ')}`);
        }
    });
}

// 배치 1 (1-100위) - 이미 수집된 데이터
const BATCH_1 = [
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

// 자동으로 배치 1 추가
addBatch(1, BATCH_1);
