const fs = require('fs');
const path = require('path');

// 죽음의 맹세 데이터
const deathOathData = {
    '2026-01-01': 3500,
    '2026-01-03': 3300,
    '2026-01-05': 3600,
    '2026-01-16': 2700,
    '2026-01-17': 2700,
    '2026-01-18': 2696,
    '2026-02-04': 2500,
};

const dataFilePath = path.join(__dirname, '..', 'data', 'item-price-trends-raw.md');

// 파일 읽기
let content = fs.readFileSync(dataFilePath, 'utf-8');

// 각 날짜에 대해 처리
Object.entries(deathOathData).forEach(([date, price]) => {
    const dateHeader = `### ${date}`;

    // 날짜가 파일에 있는지 확인
    if (!content.includes(dateHeader)) {
        console.log(`⚠️ 날짜를 찾을 수 없습니다: ${date}`);
        return;
    }

    // 다음 ### 블록 찾기
    const dateIndex = content.indexOf(dateHeader);
    const nextDate = content.indexOf(`\n###`, dateIndex + 1);
    const sectionContent = nextDate === -1
        ? content.substring(dateIndex)
        : content.substring(dateIndex, nextDate);

    // 이미 죽음의 맹세가 있는지 확인
    if (sectionContent.includes('죽음의 맹세')) {
        console.log(`✅ ${date}: 이미 죽음의 맹세가 있습니다. 건너뜁니다.`);
        return;
    }

    // 불멸의 유산이 있으면 그 다음에, 없으면 근원의 속삭임 다음에 삽입
    let insertAfter = '- 불멸의 유산: ';
    if (!sectionContent.includes('불멸의 유산')) {
        insertAfter = '- 근원의 속삭임: ';
    }

    // 패턴 매칭하여 삽입
    const escapedInsert = insertAfter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(${dateHeader}[\\s\\S]*?${escapedInsert}[^\\r\\n]+\\r\\n)`, 'g');

    const replacement = `$1- 죽음의 맹세: ${price}\r\n`;

    content = content.replace(pattern, replacement);
    console.log(`✅ ${date}: 죽음의 맹세 추가 완료 (${price}억)`);
});

// 파일 저장
fs.writeFileSync(dataFilePath, content, 'utf-8');

console.log('\n🎉 죽음의 맹세 데이터 추가 완료!');
