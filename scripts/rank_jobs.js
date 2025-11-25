// =============================================================================
// 6차 스킬 직업별 평균 레벨 순위 (전체 5천만~2억 전투력)
// =============================================================================
// 이 스크립트는 hexa_skills_all.json 을 읽고, 각 직업의 모든 스킬 평균 레벨을 평균내어
// 전체 직업을 평균 레벨 높은 순으로 정렬합니다.
// 결과는 job_priority_rank.json 로 저장됩니다.

const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, '..', 'hexa_skills_all.json');
const data = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

function avg(arr) {
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum / arr.length;
}

const ranking = data.map(jobObj => {
    const levels = jobObj.skills.map(s => parseFloat(s.averageLevel)).filter(v => !isNaN(v));
    const mean = avg(levels);
    return { job: jobObj.job, averageSkillLevel: Number(mean.toFixed(2)), skillCount: levels.length };
});

ranking.sort((a, b) => b.averageSkillLevel - a.averageSkillLevel);

const outPath = path.resolve(__dirname, '..', 'job_priority_rank.json');
fs.writeFileSync(outPath, JSON.stringify(ranking, null, 2));
console.log('✅ 직업 순위 파일 생성 완료 →', outPath);
