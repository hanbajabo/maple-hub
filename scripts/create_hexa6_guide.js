// =============================================================================
// create_hexa6_guide.js – generate a copy‑paste friendly markdown guide for 6th‑skill
// priority per job (TOP 7 by average level)
// =============================================================================
// This script reads `hexa_skills_data.json` (contains 6th‑skill entries with "VI" suffix)
// and writes `hexa6_skill_priority_guide.md` – ready to paste into Notepad.
// -----------------------------------------------------------------------------
const fs = require('fs');
const path = require('path');

const INPUT_JSON = path.resolve(__dirname, '..', 'hexa_skills_data.json');
const OUT_MD = path.resolve(__dirname, '..', 'hexa6_skill_priority_guide.md');

const raw = fs.readFileSync(INPUT_JSON, 'utf-8');
const data = JSON.parse(raw); // [{job, skills:[{name, averageLevel}], ...]

let md = '';
md += '# 6차 스킬 우선 강화 가이드 (TOP 7)\n\n';
md += '> **대상**: 레벨 260+ / 전투력 5천만‑2억 (전체 크롤링 데이터)\n';
md += '> **표시 방식**: 평균 레벨이 높은 순으로 **TOP 7** 스킬을 나열합니다.\n\n';
md += '---\n\n';

for (const entry of data) {
    const job = entry.job;
    const skills = entry.skills
        .map(s => ({ name: s.name, avg: parseFloat(s.averageLevel) }))
        .sort((a, b) => b.avg - a.avg)
        .slice(0, 7);

    md += `## ${job}\n`;
    for (const sk of skills) {
        md += `- ${sk.name} (평균 레벨: ${sk.avg})\n`;
    }
    md += '\n';
}

fs.writeFileSync(OUT_MD, md, 'utf-8');
console.log('✅ Markdown guide generated →', OUT_MD);
