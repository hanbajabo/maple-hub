import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// ---------------------------------------------------------------
// fetch_hexa_from_nexon.js – Nexon Open API 로 6차(헥사) 스킬을 직업별로 수집
// ---------------------------------------------------------------
// 1️⃣ 직업 리스트 조회 → jobId, jobName
// 2️⃣ 각 직업별 스킬 조회 → skillTier === 6 인 스킬만 추출
// 3️⃣ 결과를 public 폴더에 JSON 파일로 저장 (Next.js 정적 파일)
// ---------------------------------------------------------------
// 환경 변수에 API KEY 를 설정하세요:  NEXON_API_KEY
// 실행 예시 (PowerShell):
//   $env:NEXON_API_KEY = "YOUR_KEY"
//   node scripts/fetch_hexa_from_nexon.js
// ---------------------------------------------------------------

const API_ROOT = 'https://openapi.nexon.com/maplestory/v1';
const API_KEY = process.env.NEXON_API_KEY;

if (!API_KEY) {
    console.error('❌ NEXON_API_KEY 환경 변수가 설정되지 않았습니다.');
    process.exit(1);
}

async function getJobList() {
    const res = await fetch(`${API_ROOT}/jobs`, {
        headers: { 'X-NEXON-OPENAPI-KEY': API_KEY },
    });
    if (!res.ok) throw new Error(`Job list fetch error: ${res.status}`);
    const json = await res.json();
    return json.data; // [{jobId, jobName}, ...]
}

async function getHexaSkills(jobId) {
    const res = await fetch(`${API_ROOT}/skills?jobId=${jobId}`, {
        headers: { 'X-NEXON-OPENAPI-KEY': API_KEY },
    });
    if (!res.ok) throw new Error(`Skill fetch error (jobId=${jobId}): ${res.status}`);
    const json = await res.json();
    return json.data.filter((s: any) => s.skillTier === 6);
}

async function main() {
    const jobs = await getJobList();
    const result: Record<string, any[]> = {};

    for (const { jobId, jobName } of jobs) {
        console.log(`⏳ ${jobName} (jobId=${jobId}) 의 6차 스킬을 가져오는 중…`);
        const hexas = await getHexaSkills(jobId);
        const formatted = hexas
            .map((s: any) => ({ name: s.skillName, averageLevel: Number(s.avgLevel ?? 0) }))
            .sort((a, b) => b.averageLevel - a.averageLevel);
        result[jobName] = formatted;
    }

    // Next.js 의 public 폴더에 저장 (정적 파일)
    const outPath = path.resolve('public', 'hexa6_by_job.json');
    fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`✅ JSON 저장 완료 → ${outPath}`);
}

main().catch(err => console.error('❌ 실행 중 오류:', err));
