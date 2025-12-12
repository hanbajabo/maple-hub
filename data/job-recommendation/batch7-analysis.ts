import { addBatch, printResults, analyzeDistribution, getCollectionStatus, analyzeByRange } from './top1000-collector';

// 배치 7 (601-700위) 데이터 추가
const BATCH_7 = [
    '다크나이트', '듀얼블레이드', '아델', '아크메이지(불,독)', '비숍',
    '히어로', '아란', '비숍', '소울마스터', '카데나',
    '듀얼블레이드', '아델', '에반', '비숍', '윈드브레이커',
    '호영', '아델', '듀얼블레이드', '제로', '섀도어',
    '듀얼블레이드', '듀얼블레이드', '아란', '라라', '와일드헌터',
    '비숍', '보우마스터', '신궁', '비숍', '제논',
    '은월', '아델', '섀도어', '팬텀', '에반',
    '미하일', '섀도어', '카인', '제로', '아크메이지(썬,콜)',
    '나이트로드', '아델', '나이트워커', '나이트로드', '패스파인더',
    '스트라이커', '듀얼블레이드', '에반', '아델', '듀얼블레이드',
    '캡틴', '패스파인더', '데몬어벤져', '아란', '섀도어',
    '보우마스터', '윈드브레이커', '제로', '비숍', '데몬어벤져',
    '칼리', '비숍', '은월', '다크나이트', '비숍',
    '비숍', '루미너스', '아델', '카인', '히어로',
    '아크', '메르세데스', '소울마스터', '와일드헌터', '다크나이트',
    '비숍', '데몬어벤져', '아델', '은월', '호영',
    '섀도어', '나이트로드', '보우마스터', '팔라딘', '루미너스',
    '나이트로드', '바이퍼', '나이트로드', '제로', '아란',
    '루미너스', '나이트로드', '비숍', '다크나이트', '다크나이트',
    '에반', '듀얼블레이드', '블래스터', '아크메이지(썬,콜)', '비숍'
];

// 배치 7 추가
addBatch(7, BATCH_7);

// 현재까지 결과 출력
console.log('\n');
console.log('='.repeat(80));
console.log('📊 배치 7 (601-700위) 추가 완료!');
console.log('='.repeat(80));

const status = getCollectionStatus();
console.log(`\n✅ 현재 진행률: ${status.progress.toFixed(1)}% (${status.totalCollected}/1000)`);
console.log(`📦 수집된 배치: ${status.batchesCollected}/10`);
console.log(`⏳ 남은 배치: ${status.remainingBatches}개`);

// 전체 TOP 20
const distribution = analyzeDistribution();
console.log('\n【누적 TOP 20 직업 (1-700위)】');
distribution.slice(0, 20).forEach((d, i) => {
    console.log(
        `${(i + 1).toString().padStart(2)}. ${d.job.padEnd(20)} ` +
        `${d.count.toString().padStart(3)}개 (${d.percentage.toFixed(1)}%) ` +
        `평균 ${d.averageRank.toFixed(1)}위`
    );
});

// 601-700위 구간 분석
const batch7Jobs = BATCH_7.reduce((acc, job) => {
    acc[job] = (acc[job] || 0) + 1;
    return acc;
}, {} as Record<string, number>);

const batch7Top = Object.entries(batch7Jobs)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

console.log('\n🔥 601-700위 구간 TOP 10:');
batch7Top.forEach(([job, count], i) => {
    console.log(`  ${(i + 1).toString().padStart(2)}. ${job.padEnd(20)} ${count}개`);
});

// 비숍 폭증 분석
const bishopCount = BATCH_7.filter(j => j === '비숍').length;
console.log(`\n⛪ 비숍 폭증: 601-700위에서 ${bishopCount}개 등장! (전 구간 대비 압도적)`);

// 구간별 비교
console.log('\n【구간별 1위 직업 비교 (1-700위)】');
const rangeAnalysis = analyzeByRange();
rangeAnalysis.slice(0, 7).forEach(range => {
    if (range.top3Jobs.length > 0) {
        const top1 = range.top3Jobs[0];
        console.log(`  ${range.range}: ${top1.job} (${top1.count}개)`);
    }
});

// 새로 등장한 직업
console.log('\n🆕 601-700위 구간에서 새로 등장:');
console.log('  - 미하일');

// 전체 요약 출력
printResults();

console.log('\n' + '='.repeat(80));
console.log('🎯 70% 완료! 마지막 스퍼트!');
console.log('='.repeat(80));
