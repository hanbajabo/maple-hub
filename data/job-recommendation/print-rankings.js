/**
 * 직업 추천 순위 출력 스크립트
 * node를 통해 실행하여 1-47위 순위를 확인할 수 있습니다.
 */

const { calculateAllJobRankings } = require('./job-ranking-system');

console.log('='.repeat(80));
console.log('🎮 메이플스토리 2025 하이퍼버닝 직업 추천 순위 (1위~47위)');
console.log('='.repeat(80));
console.log('');
console.log('📊 평가 기준 (가중치)');
console.log('  1️⃣ 헥사 강화 효율 (40%) - 성장 효율성');
console.log('  2️⃣ 쿨뚝 불필요 (25%) - 장비 접근성');
console.log('  3️⃣ DPM 순위 (20%) - 화력');
console.log('  4️⃣ 유틸리티 (15%) - 편의성/파티 기여도');
console.log('');
console.log('='.repeat(80));
console.log('');

try {
    const rankings = calculateAllJobRankings();

    rankings.forEach((job, index) => {
        console.log(`\n${'━'.repeat(80)}`);
        console.log(`🏆 ${job.rank}위: ${job.job} (종합 점수: ${job.totalScore.toFixed(1)}점)`);
        console.log(`${'━'.repeat(80)}`);
        console.log('');
        console.log(job.overallReason);
        console.log('');
    });

    console.log('\n' + '='.repeat(80));
    console.log('🏅 TOP 10 추천 직업');
    console.log('='.repeat(80));

    const top10 = rankings.slice(0, 10);
    top10.forEach(job => {
        console.log(`${job.rank}위. ${job.job.padEnd(20)} - ${job.totalScore.toFixed(1)}점`);
    });

    console.log('\n' + '='.repeat(80));
    console.log('✅ 순위 계산 완료!');
    console.log('='.repeat(80));

} catch (error) {
    console.error('❌ 오류 발생:', error.message);
    console.error(error.stack);
}
