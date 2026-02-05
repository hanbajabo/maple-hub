const fs = require('fs');
const path = require('path');

// 황홀한 악몽 데이터
const ecstaticNightmareData = {
    '2026-01-17': 3500,
    '2026-01-18': 3500,
    '2026-01-19': 3500,
    '2026-01-28': 1950,
    '2026-01-30': 1600,
    '2026-01-31': 1550,
    '2026-02-01': 1500,
    '2026-02-02': 1450,
    '2026-02-03': 1490,
    '2026-02-04': 1500,
};

const dataFilePath = path.join(__dirname, '..', 'data', 'item-price-trends-raw.md');

// 파일 읽기
let content = fs.readFileSync(dataFilePath, 'utf-8');

// 각 날짜에 대해 처리
Object.entries(ecstaticNightmareData).forEach(([date, price]) => {
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

    // 이미 황홀한 악몽이 있는지 확인
    if (sectionContent.includes('황홀한 악몽')) {
        console.log(`✅ ${date}: 이미 황홀한 악몽이 있습니다. 건너뜁니다.`);
        return;
    }

    // 삽입 위치 찾기 (우선 순위: 죽음의 맹세 > 불멸의 유산 > 근원의 속삭임)
    let insertAfter = '- 죽음의 맹세: ';
    if (!sectionContent.includes('죽음의 맹세')) {
        insertAfter = '- 불멸의 유산: ';
        if (!sectionContent.includes('불멸의 유산')) {
            insertAfter = '- 근원의 속삭임: ';
        }
    }

    // 패턴 매칭하여 삽입
    const escapedInsert = insertAfter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(${dateHeader}[\\s\\S]*?${escapedInsert}[^\\r\\n]+\\r\\n)`, 'g');

    const replacement = `$1- 황홀한 악몽: ${price}\r\n`;

    content = content.replace(pattern, replacement);
    console.log(`✅ ${date}: 황홀한 악몽 추가 완료 (${price}억)`);
});

// 파일 저장
fs.writeFileSync(dataFilePath, content, 'utf-8');

console.log('\n🎉 황홀한 악몽 데이터 추가 완료!');
