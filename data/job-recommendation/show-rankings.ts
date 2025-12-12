import { calculateAllJobRankings, getTopRecommendedJobs } from './job-ranking-system';

// 전체 순위 계산
const allRankings = calculateAllJobRankings();

// 결과 출력
console.log('='.repeat(100));
console.log('🎮 메이플스토리 2025 하이퍼버닝 직업 추천 순위 (1위~47위)');
console.log('='.repeat(100));
console.log('');
console.log('📊 평가 기준 (가중치)');
console.log('  1️⃣ 헥사 강화 효율 (40%) - 성장 효율성');
console.log('  2️⃣ 쿨뚝 불필요 (25%) - 장비 접근성  ');
console.log('  3️⃣ DPM 순위 (20%) - 화력');
console.log('  4️⃣ 유틸리티 (15%) - 편의성/파티 기여도');
console.log('');
console.log('='.repeat(100));
console.log('');

// 전체 순위 출력
allRankings.forEach((job) => {
    console.log(`\n${'━'.repeat(100)}`);
    console.log(`🏆 ${job.rank}위: ${job.job} (종합 ${job.totalScore.toFixed(1)}점)`);
    console.log(`${'━'.repeat(100)}`);
    console.log(job.overallReason);

    // 점수 분해
    console.log(`\n📈 세부 점수:`);
    console.log(`  • 헥사 효율: ${job.hexaScore.toFixed(1)}점 (가중 ${(job.hexaScore * 0.4).toFixed(1)}점)`);
    console.log(`  • 쿨뚝 불필요: ${job.coolHatScore.toFixed(1)}점 (가중 ${(job.coolHatScore * 0.25).toFixed(1)}점)`);
    console.log(`  • DPM 순위: ${job.dpmScore.toFixed(1)}점 (가중 ${(job.dpmScore * 0.2).toFixed(1)}점)`);
    console.log(`  • 유틸리티: ${job.utilityScore.toFixed(1)}점 (가중 ${(job.utilityScore * 0.15).toFixed(1)}점)`);
});

// 요약 통계
console.log('\n\n' + '='.repeat(100));
console.log('📊 순위 요약 통계');
console.log('='.repeat(100));
console.log('');

const top10 = allRankings.slice(0, 10);
const mid20 = allRankings.slice(10, 30);
const bottom17 = allRankings.slice(30);

console.log('🥇 TOP 10 (추천도 최상위)');
top10.forEach(job => {
    console.log(`  ${String(job.rank).padStart(2)}위. ${job.job.padEnd(25)} ${job.totalScore.toFixed(1)}점`);
});

console.log('\n🥈 11-30위 (추천도 상위)');
mid20.forEach(job => {
    console.log(`  ${String(job.rank).padStart(2)}위. ${job.job.padEnd(25)} ${job.totalScore.toFixed(1)}점`);
});

console.log('\n🥉 31-47위 (추천도 중위권)');
bottom17.forEach(job => {
    console.log(`  ${String(job.rank).padStart(2)}위. ${job.job.padEnd(25)} ${job.totalScore.toFixed(1)}점`);
});

console.log('\n' + '='.repeat(100));
console.log('✅ 순위 계산 완료!');
console.log('='.repeat(100));

// 파일로 저장
import * as fs from 'fs';
const outputPath = './ranking-output.txt';
// (파일 저장 로직은 선택사항)
