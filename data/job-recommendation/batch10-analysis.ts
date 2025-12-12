import { addBatch, printResults, analyzeDistribution, getCollectionStatus, analyzeByRange } from './top1000-collector';

// 배치 10 (901-1000위) 데이터 추가 - 마지막!
const BATCH_10 = [
    '다크나이트', '제논', '섀도어', '아란', '루미너스',
    '아크메이지(불,독)', '다크나이트', '카인', '아크', '나이트로드',
    '윈드브레이커', '듀얼블레이드', '캡틴', '소울마스터', '나이트로드',
    '비숍', '나이트로드', '듀얼블레이드', '섀도어', '아크메이지(썬,콜)',
    '나이트로드', '메르세데스', '아크메이지(불,독)', '호영', '히어로',
    '은월', '히어로', '아델', '아크메이지(불,독)', '아크메이지(썬,콜)',
    '아크메이지(불,독)', '메르세데스', '바이퍼', '나이트워커', '데몬슬레이어',
    '아크메이지(불,독)', '바이퍼', '나이트로드', '제논', '아크메이지(불,독)',
    '아크메이지(썬,콜)', '제로', '비숍', '비숍', '호영',
    '바이퍼', '히어로', '제로', '비숍', '제로',
    '렌', '데몬어벤져', '메카닉', '섀도어', '히어로',
    '보우마스터', '메르세데스', '팬텀', '나이트로드', '나이트로드',
    '제논', '듀얼블레이드', '아크메이지(불,독)', '듀얼블레이드', '아델',
    '나이트워커', '나이트로드', '나이트워커', '나이트로드', '엔젤릭버스터',
    '보우마스터', '아델', '메르세데스', '팬텀', '아크메이지(불,독)',
    '바이퍼', '아크메이지(불,독)', '은월', '아크메이지(불,독)', '스트라이커',
    '비숍', '에반', '패스파인더', '아란', '제논',
    '아크메이지(불,독)', '라라', '아델', '바이퍼', '아크메이지(불,독)'
];

// 배치 10 추가
addBatch(10, BATCH_10);

// 🎊🎊🎊 완료! 🎊🎊🎊
console.log('\n');
console.log('🎉'.repeat(40));
console.log('🏆 배치 10 (901-1000위) 추가 완료! - 전체 데이터 수집 완료! 🏆');
console.log('🎉'.repeat(40));

const status = getCollectionStatus();
console.log(`\n✅ 최종 진행률: ${status.progress.toFixed(1)}% (${status.totalCollected}/1000)`);
console.log(`📦 수집된 배치: ${status.batchesCollected}/10 - 전체 완료!`);

// 전체 TOP 40
const distribution = analyzeDistribution();
console.log('\n' + '='.repeat(80));
console.log('【최종 TOP 40 직업 (1-1000위 전체)】');
console.log('='.repeat(80));
distribution.slice(0, 40).forEach((d, i) => {
    console.log(
        `${(i + 1).toString().padStart(2)}. ${d.job.padEnd(20)} ` +
        `${d.count.toString().padStart(3)}개 (${d.percentage.toFixed(1)}%) ` +
        `평균 ${d.averageRank.toFixed(1)}위 ` +
        `[최고: ${d.bestRank}위, 최저: ${d.worstRank}위]`
    );
});

// 901-1000위 구간 분석
const batch10Jobs = BATCH_10.reduce((acc, job) => {
    acc[job] = (acc[job] || 0) + 1;
    return acc;
}, {} as Record<string, number>);

const batch10Top = Object.entries(batch10Jobs)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

console.log('\n🔥 901-1000위 구간 TOP 10:');
batch10Top.forEach(([job, count], i) => {
    console.log(`  ${(i + 1).toString().padStart(2)}. ${job.padEnd(20)} ${count}개`);
});

// 전체 구간별 1위 비교
console.log('\n【전체 10개 구간별 1위 직업】');
const rangeAnalysis = analyzeByRange();
rangeAnalysis.forEach(range => {
    if (range.top3Jobs.length > 0) {
        const top1 = range.top3Jobs[0];
        console.log(`  ${range.range}: ${top1.job} (${top1.count}개)`);
    }
});

// 전체 요약 출력
printResults();

// 최종 통계
console.log('\n' + '='.repeat(80));
console.log('🎊 최종 통계 요약');
console.log('='.repeat(80));
console.log(`총 직업 수: ${distribution.length}개`);
console.log(`평균 직업당 랭크 수: ${(1000 / distribution.length).toFixed(1)}개`);
console.log(`\n최다 랭크 직업: ${distribution[0].job} (${distribution[0].count}개)`);
console.log(`최소 랭크 직업: ${distribution[distribution.length - 1].job} (${distribution[distribution.length - 1].count}개)`);

console.log('\n' + '🎉'.repeat(40));
console.log('축하합니다! TOP 1000 직업 분포 분석 완료! 🎊');
console.log('🎉'.repeat(40));
