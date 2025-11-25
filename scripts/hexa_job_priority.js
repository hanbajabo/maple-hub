// =============================================================================
// 6차 스킬 직업별 우선순위 정리
// =============================================================================
// 입력 : hexa_skills_data.json (직업별 스킬 + 평균 레벨)
// 출력 : hexa_job_priority.json
// 형식 : {
//   "히어로": [{ "name": "레이징 블로우 VI", "averageLevel": 29.6 }, ...],
//   "팔라딘": [{ ... }],
//   ...
// }
// 각 직업 내에서 평균 레벨이 높은 순으로 정렬합니다.

const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, '..', 'hexa_skills_data.json');
const raw = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

const result = {};

raw.forEach(({ job, skills }) => {
    // 평균 레벨을 숫자로 변환하고 내림차순 정렬
    const sorted = skills
        .map(s => ({ name: s.name, averageLevel: parseFloat(s.averageLevel) }))
        .filter(s => !isNaN(s.averageLevel))
        .sort((a, b) => b.averageLevel - a.averageLevel);
    result[job] = sorted;
});

const outPath = path.resolve(__dirname, '..', 'hexa_job_priority.json');
fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
console.log('✅ 직업별 6차 스킬 우선순위 파일 생성 완료 →', outPath);
