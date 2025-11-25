// =============================================================================
// 6차 스킬 전체 크롤링 (레벨 260+, 전투력 5천만~2억)
// =============================================================================
// 이 스크립트는 두 개의 전투력 구간을 순회합니다:
//   1) 5천만 ~ 1억   (power=50m-100m)
//   2) 1억  ~ 2억   (power=100m-200m)
// 각 직업별로 두 페이지를 모두 조회하고, 스킬을 합쳐 중복을 제거합니다.
// 결과는 hexa_skills_all.json 파일에 저장됩니다.

const fs = require('fs');
const https = require('https');

const JOBS = [
    "히어로", "팔라딘", "다크나이트",
    "아크메이지(불,독)", "아크메이지(썬,콜)", "비숍",
    "보우마스터", "신궁", "패스파인더",
    "나이트로드", "섀도어", "듀얼블레이더",
    "바이퍼", "캡틴", "캐논마스터",
    "미하일", "소울마스터", "플레임위자드", "윈드브레이커", "나이트워커", "스트라이커",
    "아란", "에반", "루미너스", "메르세데스", "팬텀", "은월",
    "블래스터", "배틀메이지", "와일드헌터", "메카닉", "제논",
    "데몬슬레이어", "데몬어벤져",
    "카이저", "카인", "카데나", "엔젤릭버스터",
    "아델", "일리움", "아크", "칼리",
    "호영", "라라", "렌",
    "키네시스", "제로"
];

const POWER_RANGES = [
    "50m-100m",
    "100m-200m"
];

const EXCLUDED_SKILLS = ["솔 야누스", "솔 야누스: 새벽", "헥사 스텟", "헥사: 스텟"];

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function parseSkillsFromHtml(html) {
    if (!html.includes('6차 평균 레벨')) return [];
    const parts = html.split('6차 평균 레벨');
    if (parts.length < 2) return [];
    const content = parts[1].substring(0, 15000);
    const textOnly = content.replace(/<[^>]+>/g, '\n');
    const lines = textOnly.split('\n').map(l => l.trim()).filter(l => l);
    const skills = [];
    let currentName = '';
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line === '전체' || line === 'Lv' || line.includes('광고') || line.includes('AD')) continue;
        if (/^\d+\.\d+$/.test(line)) {
            // level found, determine name
            let name = '';
            if (i > 1 && lines[i - 1] === 'Lv') name = lines[i - 2];
            else if (i > 0) name = lines[i - 1];
            if (name && !/^\d+$/.test(name) && !EXCLUDED_SKILLS.some(ex => name.includes(ex))) {
                if (!skills.some(s => s.name === name)) {
                    skills.push({ name, averageLevel: line });
                }
            }
        }
    }
    return skills;
}

async function crawl() {
    const allData = [];
    console.log('🚀 전체 6차 스킬 크롤링 시작 (레벨 260+, CP 5천만~2억)');
    for (let i = 0; i < JOBS.length; i++) {
        const job = JOBS[i];
        const jobSkillsMap = new Map(); // name -> level (keep highest)
        for (const range of POWER_RANGES) {
            const encodedJob = encodeURIComponent(job);
            const url = `https://maple.gg/jobs/${encodedJob}/skills?power=${range}&level=260%2B`;
            console.log(`[${i + 1}/${JOBS.length}] ${job} - ${range}`);
            try {
                const html = await fetchUrl(url);
                const skills = parseSkillsFromHtml(html);
                skills.forEach(s => {
                    const existing = jobSkillsMap.get(s.name);
                    if (!existing || parseFloat(s.averageLevel) > parseFloat(existing)) {
                        jobSkillsMap.set(s.name, s.averageLevel);
                    }
                });
            } catch (e) {
                console.error('  ❌ fetch error', e.message);
            }
            // 부하 방지
            await new Promise(r => setTimeout(r, 500));
        }
        const merged = Array.from(jobSkillsMap.entries()).map(([name, avg]) => ({ name, averageLevel: avg }));
        merged.sort((a, b) => parseFloat(b.averageLevel) - parseFloat(a.averageLevel));
        allData.push({ job, skills: merged });
        console.log(`  ✅ ${job}: ${merged.length} 스킬 수집`);
    }
    const outPath = 'hexa_skills_all.json';
    fs.writeFileSync(outPath, JSON.stringify(allData, null, 2));
    console.log('🎉 크롤링 완료! 파일:', outPath);
}

crawl();
