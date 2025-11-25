// =============================================================================
// 전체 직업 6차 스킬 크롤링 스크립트
// =============================================================================
// **사용 방법:**
// 1. maple.gg 사이트에서 F12를 눌러 개발자 도구를 엽니다
// 2. Console 탭으로 이동합니다
// 3. 이 전체 스크립트를 복사하여 붙여넣고 Enter를 누릅니다
// 4. 자동으로 모든 직업을 순회하며 데이터를 수집합니다
// 5. 완료되면 JSON 파일이 자동으로 다운로드됩니다
// =============================================================================

(async function () {
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
    const allData = [];

    console.log('='.repeat(60));
    console.log('전 직업 6차 스킬 크롤링 시작');
    console.log('='.repeat(60));

    // 스킬 추출 함수
    function extractSkills() {
        const skills = [];
        let skillName = '';

        const elements = Array.from(document.body.querySelectorAll('*'));
        const startElement = elements.find(el => {
            return el.textContent.trim() === '6차 평균 레벨' && el.childNodes.length === 1;
        });

        if (!startElement) {
            return [];
        }

        let container = startElement.parentElement;
        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);

        let startCollecting = false;
        let node;

        while (node = walker.nextNode()) {
            const text = node.textContent.trim();

            if (text === '전체') {
                startCollecting = true;
                continue;
            }

            if (!startCollecting || !text || text === 'Lv') continue;
            if (text.includes('광고') || text.includes('AD')) break;

            if (/^\d+\.\d+$/.test(text)) {
                if (skillName) {
                    if (!EXCLUDED_SKILLS.some(ex => skillName.includes(ex))) {
                        skills.push({ name: skillName, averageLevel: text });
                    }
                    skillName = '';
                }
            } else if (text && !/^\d+$/.test(text)) {
                skillName = text;
            }
        }

        return skills;
    }

    // 각 직업별로 순회
    for (let i = 0; i < JOBS.length; i++) {
        const jobName = JOBS[i];
        console.log(`[${i + 1}/${JOBS.length}] ${jobName} 크롤링 중...`);

        const url = `https://maple.gg/jobs/${jobName}/skills?power=100m-200m&level=260%2B`;
        window.location.href = url;

        // 페이지 로딩 대기
        await new Promise(resolve => setTimeout(resolve, 3000));

        const skills = extractSkills();

        if (skills && skills.length > 0) {
            allData.push({ job: jobName, skills: skills, url: url });
            console.log(`  ✅ ${jobName}: ${skills.length}개 스킬`);
        } else {
            console.warn(`  ⚠️ ${jobName}: 데이터 없음`);
        }

        // 서버 부하 방지
        if (i < JOBS.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    // 결과 저장
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'all_jobs_hexa_skills.json';
    link.click();
    URL.revokeObjectURL(downloadUrl);

    console.log('\n' + '='.repeat(60));
    console.log(`✅ 크롤링 완료! 총 ${allData.length}/${JOBS.length} 직업`);
    console.log('💾 all_jobs_hexa_skills.json 다운로드됨');
    console.log('='.repeat(60));

    return allData;
})();
