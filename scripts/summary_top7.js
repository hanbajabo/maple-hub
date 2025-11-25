// =============================================================================
// Generate a concise summary: top 7 6차 skills per job (averageLevel descending)
// =============================================================================
const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, '..', 'hexa_job_priority.json');
const data = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

const TOP_N = 7;
const summary = {};

for (const [job, skills] of Object.entries(data)) {
    summary[job] = skills.slice(0, TOP_N).map(s => ({ name: s.name, avg: s.averageLevel }));
}

const outPath = path.resolve(__dirname, '..', 'hexa_top7_summary.json');
fs.writeFileSync(outPath, JSON.stringify(summary, null, 2));
console.log('✅ Top‑7 summary generated →', outPath);
