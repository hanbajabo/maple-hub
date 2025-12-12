/**
 * 메이플스카우터 환산 랭킹 TOP 2000 직업 분포
 * 출처: https://maplescouter.com/total-ranking
 * 수집일: 2025-12-12
 * 확장: 1000개 → 2000개
 */

export interface JobDistribution {
    job: string;
    count: number;
    percentage: number;
    ranks: number[]; // 해당 직업이 등장한 순위들
    averageRank: number;
    bestRank: number;
    worstRank: number;
}

export type HexaFragmentLevel = 'average' | 'level500' | 'level1000' | 'level2000' | 'level5000' | 'level10000' | 'level15000' | 'level20000';

// 배치 크기를 100개로 유지, 총 20개 배치 (2000개)
const BATCH_SIZE = 100;
const TOTAL_BATCHES = 20;
const TOTAL_RANKINGS = 2000;

// 전체 데이터 저장
let allRankings: { rank: number; job: string; batch: number }[] = [];

// 배치별 직업 목록 (20개 배치)
const batches: string[][] = new Array(TOTAL_BATCHES);

/**
 * 배치 데이터 추가
 * @param batchNumber 배치 번호 (1-20)
 * @param jobs 직업명 배열 (순서대로 100개)
 */
export function addBatch(batchNumber: number, jobs: string[]) {
    if (jobs.length !== BATCH_SIZE) {
        console.warn(`⚠️ 배치 ${batchNumber}의 데이터가 ${jobs.length}개입니다. 100개여야 합니다.`);
    }

    batches[batchNumber - 1] = jobs;

    // 전체 랭킹 업데이트
    allRankings = [];
    batches.forEach((batch, index) => {
        if (batch) {
            batch.forEach((job, jobIndex) => {
                allRankings.push({
                    rank: index * BATCH_SIZE + jobIndex + 1,
                    job,
                    batch: index + 1
                });
            });
        }
    });

    console.log(`✅ 배치 ${batchNumber} 추가 완료 (총 ${allRankings.length}개 수집됨)`);
}

/**
 * 직업별 분포 분석
 */
export function analyzeDistribution(): JobDistribution[] {
    const jobMap = new Map<string, number[]>();

    allRankings.forEach(({ rank, job }) => {
        if (!jobMap.has(job)) {
            jobMap.set(job, []);
        }
        jobMap.get(job)!.push(rank);
    });

    const distribution: JobDistribution[] = [];
    jobMap.forEach((ranks, job) => {
        const total = allRankings.length;
        const avgRank = ranks.reduce((a, b) => a + b, 0) / ranks.length;

        distribution.push({
            job,
            count: ranks.length,
            percentage: (ranks.length / total) * 100,
            ranks,
            averageRank: avgRank,
            bestRank: Math.min(...ranks),
            worstRank: Math.max(...ranks)
        });
    });

    distribution.sort((a, b) => b.count - a.count);

    return distribution;
}

/**
 * 구간별 분석 (100위 단위, 총 20개 구간)
 */
export function analyzeByRange() {
    const ranges: { name: string; start: number; end: number }[] = [];

    for (let i = 0; i < TOTAL_BATCHES; i++) {
        ranges.push({
            name: `${i * BATCH_SIZE + 1}-${(i + 1) * BATCH_SIZE}위`,
            start: i * BATCH_SIZE + 1,
            end: (i + 1) * BATCH_SIZE
        });
    }

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
        progress: (allRankings.length / TOTAL_RANKINGS) * 100,
        remainingBatches: TOTAL_BATCHES - batches.filter(b => b && b.length > 0).length
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
    console.log(`수집 진행률: ${status.progress.toFixed(1)}% (${status.batchesCollected}/${TOTAL_BATCHES} 배치)`);
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
            if (range.top3Jobs.length > 0) {
                console.log(`  TOP 3: ${range.top3Jobs.map(j => `${j.job}(${j.count})`).join(', ')}`);
            }
        }
    });
}

// 기존 1-1000위 데이터를 먼저 로드해야 합니다
// batch1-analysis.ts ~ batch10-analysis.ts의 데이터를 가져와서 초기화

console.log('🎯 TOP 2000 수집 시스템 준비 완료!');
console.log('📦 배치 11-20 (1001-2000위) 데이터를 입력해주세요.');
