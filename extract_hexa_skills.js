// 이 스크립트를 브라우저 개발자 도구 콘솔에서 실행하세요 (F12 > Console)
// maple.gg의 각 직업 페이지에서 실행하면 됩니다

(function () {
    const skills = [];
    const excludedSkills = ["솔 야누스", "솔 야누스: 새벽", "헥사 스텟", "헥사: 스텟"];

    // "6차 평균 레벨" 텍스트를 찾습니다
    let startElement = Array.from(document.querySelectorAll('div, button')).find(el =>
        el.textContent.trim() === '6차 평균 레벨'
    );

    if (!startElement) {
        console.error('6차 평균 레벨 섹션을 찾을 수 없습니다');
        return;
    }

    // 부모 요소의 모든 자식 노드를 순회
    let parent = startElement.parentElement;
    let collecting = false;
    let currentSkill = {};

    function processNode(node) {
        // 텍스트 노드 처리
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
            if (!text || text === 'Lv') return;

            // 숫자.숫자 형식이면 레벨
            if (/^\d+\.\d+$/.test(text)) {
                if (currentSkill.name) {
                    currentSkill.averageLevel = text;
                    if (!excludedSkills.some(ex => currentSkill.name.includes(ex))) {
                        skills.push({ ...currentSkill });
                    }
                    currentSkill = {};
                }
            }
            // 그 외의 텍스트는 스킬 이름
            else if (text && isNaN(parseInt(text))) {
                currentSkill.name = text;
            }
        }
        // 엘리먼트 노드는 재귀적으로 처리
        else if (node.nodeType === Node.ELEMENT_NODE) {
            // 광고나 다른 섹션이 시작되면 중단
            if (node.className && (
                node.className.includes('ad-container') ||
                node.className.includes('job-section')
            )) {
                return 'stop';
            }

            // 자식 노드들을 순회
            for (let child of node.childNodes) {
                if (processNode(child) === 'stop') return 'stop';
            }
        }
    }

    // 시작 요소 이후의 형제들을 탐색
    let sibling = startElement.nextSibling;
    while (sibling) {
        if (processNode(sibling) === 'stop') break;
        sibling = sibling.nextSibling;
    }

    // 결과 출력
    console.log('추출된 스킬 데이터:');
    console.log(JSON.stringify(skills, null, 2));
    console.log(`\n총 ${skills.length}개 스킬 추출 완료`);

    // 다운로드 가능한 JSON 파일 생성
    const jobName = document.title.match(/(.+?) 직업 분석/)?.[1] || 'unknown';
    const dataStr = JSON.stringify({
        job: jobName,
        skills: skills,
        crawledAt: new Date().toISOString()
    }, null, 2);

    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${jobName}_hexa_skills.json`;
    link.click();
    URL.revokeObjectURL(url);

    console.log(`\n${jobName}_hexa_skills.json 파일이 다운로드되었습니다`);

    return skills;
})();
