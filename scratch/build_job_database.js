const fs = require('fs');

const f2 = fs.readFileSync('scratch/bundle_4850-dba99f3953be46a2.js', 'utf8');

// Find the exact object containing all jobs
// Let's find all job keys
const startPos = f2.indexOf('히어로:{main:"STR"');

// Trace forward to find the end of this large object
let depth = 1;
let currentPos = f2.lastIndexOf('{', startPos) + 1;
const objStartPos = currentPos - 1;

while (currentPos < f2.length && depth > 0) {
    const char = f2[currentPos];
    if (char === '{') depth++;
    else if (char === '}') depth--;
    currentPos++;
}

console.log('Object range:', objStartPos, 'to', currentPos);
const rawObjStr = f2.slice(objStartPos, currentPos);
console.log('Raw object string length:', rawObjStr.length);

// Let's evaluate this object safely using Function constructor
try {
    const jobMatrix = (new Function(`return (${rawObjStr});`))();
    const jobList = Object.keys(jobMatrix);
    console.log(`Successfully parsed ${jobList.length} jobs!`);
    console.log('Sample job keys:', jobList.slice(0, 10));

    // Create the final structured database object
    const finalDatabase = {
        metadata: {
            title: "메이플스토리 50개 직업별 환산 주스탯 및 DPM 공식 데이터베이스",
            extractedAt: "2026-08-26",
            version: "2026.08.26",
            totalJobs: jobList.length,
            description: "메이플스토리 전 직업의 무기상수, 기본 패시브, 스탯 계수, 쿨타임 감소 효율, 시드링 가중치, DPM 딜 점유율 계수 공식 DB",
            source: "MapleScouter Core Engine (2026.08.26 기준)"
        },
        jobs: jobMatrix
    };

    // Save to JSON
    fs.writeFileSync('data/maple-job-stats-database-2026-08-26.json', JSON.stringify(finalDatabase, null, 2), 'utf8');
    console.log('Saved to data/maple-job-stats-database-2026-08-26.json!');

    // Also create a TypeScript file for seamless importing
    const tsContent = `/**
 * maple-job-stats-database-2026-08-26.ts
 * 
 * 메이플스토리 전 직업 환산 주스탯 & DPM 공식 데이터베이스
 * 갱신 일자: 2026년 8월 26일
 * 총 직업 수: ${jobList.length}개 직업
 */

export interface JobStatProfile {
    main: string;
    sub: string;
    sub2?: string;
    weaponConstant: number;
    finalDamage?: number;
    finalDamage2?: number;
    finalDamage3?: number;
    finalDamage4?: number;
    passiveAtkPercent?: number;
    proficiency?: number;
    dpm_mainStat?: number;
    dpm_atk?: number;
    dpm_atkPer?: number;
    dpm_bossDmg?: number;
    dpm_ignoreGuard?: number;
    dpm_criticalDmg?: number;
    seedRingFirstLv5?: number;
    seedRingSecondLv5?: number;
    exDealCool?: number;
    poss60?: number;
    poss40?: number;
    [key: string]: any;
}

export const MAPLE_JOB_DATABASE_METADATA = ${JSON.stringify(finalDatabase.metadata, null, 4)} as const;

export const MAPLE_JOB_STATS_DATABASE: Record<string, JobStatProfile> = ${JSON.stringify(jobMatrix, null, 4)};

export default MAPLE_JOB_STATS_DATABASE;
`;

    fs.writeFileSync('data/maple-job-stats-database-2026-08-26.ts', tsContent, 'utf8');
    console.log('Saved to data/maple-job-stats-database-2026-08-26.ts!');

} catch (err) {
    console.error('Failed to parse object:', err.message);
}
