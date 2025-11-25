// =============================================================================
// create_hexa6_only_guide.js – generate markdown with ONLY 6th‑skill ("VI" suffix)
// =============================================================================
// Reads `hexa_skills_data.json` (contains both 5th & 6th skills) and writes
// `hexa6_only_skill_priority_guide.md` – top 7 6th‑skill per job.
// -----------------------------------------------------------------------------
const fs = require('fs');
const path = require('path');

const INPUT_JSON = path.resolve(__dirname, '..', 'hexa_skills_data.json');
const OUT_MD = path.resolve(__dirname, '..', 'hexa6_only_skill_priority_guide.md');

const raw = fs.readFileSync(INPUT_JSON, 'utf-8');
const data = JSON.parse(raw); // [{job, skills:[{name, averageLevel}], ...]

let md = '';
md += '# 6차(헥사) 스킬 우선 강화 가이드 (TOP 7)\n\n';
md += '> **대상**: 레벨 260 + 전투력 5천만‑2억 (전체 크롤링 데이터)\n';
md += '> **표시 방식**: 평균 레벨이 높은 순으로 **TOP 7** 6차 스킬만 나열합니다.\n\n';
md += '---\n\n';

for (const entry of data) {
    const job = entry.job;
    // Keep only skills whose name ends with " VI" (6th‑skill marker)
    const sixSkills = entry.skills
        .filter(s => /\sVI$/.test(s.name))
        .map(s => ({ name: s.name.replace(/\sVI$/, ''), avg: parseFloat(s.averageLevel) }))
        .sort((a, b) => b.avg - a.avg)
        .slice(0, 7);

    if (sixSkills.length === 0) continue; // skip jobs without 6th‑skill data

    md += `## ${job}\n`;
    for (const sk of sixSkills) {
        md += `- ${sk.name} (평균 레벨: ${sk.avg})\n`;
    }
    md += '\n';
}

fs.writeFileSync(OUT_MD, md, 'utf-8');
console.log('✅ 6차 스킬 가이드 생성 →', OUT_MD);
