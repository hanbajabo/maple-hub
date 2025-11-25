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

async function crawl() {
    const allData = [];

    console.log('Starting crawl...');

    for (let i = 0; i < JOBS.length; i++) {
        const job = JOBS[i];
        // URL 인코딩 처리
        const encodedJob = encodeURIComponent(job);
        const url = `https://maple.gg/jobs/${encodedJob}/skills?power=100m-200m&level=260%2B`;

        console.log(`[${i + 1}/${JOBS.length}] Crawling ${job}...`);

        try {
            const html = await fetchUrl(url);

            // "6차 평균 레벨" 섹션 찾기
            const parts = html.split('6차 평균 레벨');
            if (parts.length < 2) {
                console.log(`  - No 6th job section found`);
                continue;
            }

            const content = parts[1].substring(0, 15000); // 충분한 길이 가져오기

            // 정규식으로 스킬 데이터 추출
            // HTML 구조: <div>Skill Name</div> ... <div>Lv</div> ... <div>29.6</div>
            // 태그를 제거하고 텍스트만 추출해서 분석

            const textOnly = content.replace(/<[^>]+>/g, '\n');
            const lines = textOnly.split('\n').map(l => l.trim()).filter(l => l);

            const skills = [];
            let currentSkillName = '';

            for (let j = 0; j < lines.length; j++) {
                const line = lines[j];

                if (line === '전체') continue;
                if (line === 'Lv') continue;
                if (line.includes('광고') || line.includes('AD')) continue;

                // 숫자.숫자 형식 (레벨)
                if (/^\d+\.\d+$/.test(line)) {
                    // 레벨을 찾음. 이전 라인들이 스킬 이름일 가능성
                    // 보통: 이름 -> Lv -> 숫자
                    // 또는: 이름 -> 숫자

                    // 역추적해서 이름 찾기
                    let nameCandidate = '';

                    // 바로 앞이 Lv이면 그 앞이 이름
                    if (j > 1 && lines[j - 1] === 'Lv') {
                        nameCandidate = lines[j - 2];
                    }
                    // 바로 앞이 이름
                    else if (j > 0) {
                        nameCandidate = lines[j - 1];
                    }

                    // 이름이 숫자로만 되어있으면 무시 (랭킹 등)
                    if (nameCandidate && !/^\d+$/.test(nameCandidate)) {
                        if (!EXCLUDED_SKILLS.some(ex => nameCandidate.includes(ex))) {
                            // 중복 체크
                            if (!skills.some(s => s.name === nameCandidate)) {
                                skills.push({ name: nameCandidate, averageLevel: line });
                            }
                        }
                    }
                }
            }

            if (skills.length > 0) {
                console.log(`  ✅ Found ${skills.length} skills`);
                allData.push({ job: job, skills: skills });
            } else {
                console.log(`  ⚠️ No skills extracted`);
            }

        } catch (e) {
            console.error(`  ❌ Error: ${e.message}`);
        }

        // 서버 부하 방지
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    fs.writeFileSync('hexa_skills_data.json', JSON.stringify(allData, null, 2));
    console.log('Done! Saved to hexa_skills_data.json');
}

crawl();
