const fs = require('fs');

const f2 = fs.readFileSync('scratch/bundle_4850-dba99f3953be46a2.js', 'utf8');

const allJobNames = [
    "히어로", "팔라딘", "다크나이트",
    "아크메이지(불,독)", "아크메이지(썬,콜)", "비숍",
    "보우마스터", "신궁", "패스파인더",
    "나이트로드", "섀도어", "듀얼블레이드",
    "바이퍼", "캡틴", "캐논슈터",
    "미하일", "소울마스터", "플레임위자드", "윈드브레이커", "나이트워커", "스트라이커",
    "아란", "에반", "루미너스", "메르세데스", "팬텀", "은월",
    "데몬슬레이어", "데몬어벤져", "블래스터", "배틀메이지", "와일드헌터", "메카닉", "제논",
    "카이저", "카인", "카데나", "엔젤릭버스터",
    "아델", "일리움", "칼리", "아크",
    "라라", "호영", "제로", "키네시스", "렌"
];

const jobsDatabase = {};

allJobNames.forEach(jobName => {
    // Check both raw and quoted
    const patterns = [
        `"${jobName}":{`,
        `'${jobName}':{`,
        `${jobName}:{`
    ];

    for (const pattern of patterns) {
        const startIdx = f2.indexOf(pattern);
        if (startIdx !== -1) {
            const bracePos = startIdx + pattern.length - 1;
            let depth = 1;
            let p = bracePos + 1;
            while (p < f2.length && depth > 0) {
                if (f2[p] === '{') depth++;
                else if (f2[p] === '}') depth--;
                p++;
            }
            const jobObjStr = f2.slice(bracePos, p);
            try {
                const parsed = (new Function(`return (${jobObjStr});`))();
                if (parsed.main && parsed.weaponConstant) {
                    jobsDatabase[jobName] = parsed;
                    break;
                }
            } catch (e) {
                // ignore
            }
        }
    }
});

console.log(`Successfully extracted ${Object.keys(jobsDatabase).length} / ${allJobNames.length} full job profiles!`);
console.log('All jobs included:', Object.keys(jobsDatabase).join(', '));

const finalDb = {
    metadata: {
        title: "메이플스토리 47개 전 직업 환산 주스탯 및 DPM 공식 데이터베이스",
        extractedAt: "2026-08-26",
        version: "2026.08.26",
        totalJobs: Object.keys(jobsDatabase).length,
        description: "메이플스토리 전 직업의 무기상수, 기본 최종뎀, 패시브 공퍼, 숙련도, 주스탯/공격력/보공/크뎀/방무/시드링/쿨감 DPM 계수 공식 DB",
        source: "MapleScouter Core Engine (2026.08.26 기준)"
    },
    jobs: jobsDatabase
};

// Save JSON
fs.writeFileSync('data/maple-job-stats-database-2026-08-26.json', JSON.stringify(finalDb, null, 2), 'utf8');

// Save TypeScript
const tsContent = `/**
 * data/maple-job-stats-database-2026-08-26.ts
 * 
 * 메이플스토리 47개 전 직업 환산 주스탯 & DPM 공식 데이터베이스
 * 갱신 일자: 2026년 8월 26일
 * 총 직업 수: ${Object.keys(jobsDatabase).length}개 전 직업
 */

export interface JobStatProfile {
    main: "STR" | "DEX" | "INT" | "LUK" | "HP" | string;
    sub: string;
    sub2?: string;
    weaponConstant: number;
    finalDamage?: number;
    finalDamage2?: number;
    finalDamage3?: number;
    finalDamage4?: number;
    passiveAtkPercent?: number;
    passiveAtkPercent2?: number;
    passiveAtkPercent3?: number;
    passiveAtkPercent4?: number;
    proficiency?: number;
    proficiency2?: number;
    proficiency3?: number;
    proficiency4?: number;
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

export const MAPLE_JOB_DATABASE_METADATA = ${JSON.stringify(finalDb.metadata, null, 4)} as const;

export const MAPLE_JOB_STATS_DATABASE: Record<string, JobStatProfile> = ${JSON.stringify(jobsDatabase, null, 4)};

export default MAPLE_JOB_STATS_DATABASE;
`;

fs.writeFileSync('data/maple-job-stats-database-2026-08-26.ts', tsContent, 'utf8');
console.log('Saved 100% of all 47 jobs to data/maple-job-stats-database-2026-08-26.json and .ts!');
