const fs = require('fs');
const path = require('path');

// 불멸의 유산 데이터
const immortalData = {
    '2026-01-01': 1350,
    '2026-01-03': 1500,
    '2026-01-04': 1449,
    '2026-01-05': 1450,
    '2026-01-06': 1400,
    '2026-01-07': 1650,
    '2026-01-08': 1480,
    '2026-01-09': 1429,
    '2026-01-10': 1850,
    '2026-01-11': 1300,
    '2026-01-12': 1400,
    '2026-01-14': 1445,
    '2026-01-16': 1333,
    '2026-01-17': 1400,
    '2026-01-18': 1430,
    '2026-01-19': 1419,
    '2026-01-20': 1400,
    '2026-01-21': 1455,
    '2026-01-23': 1395,
    '2026-01-24': 1390,
    '2026-01-25': 1450,
    '2026-01-26': 1450,
    '2026-01-27': 1500,
    '2026-01-28': 1350,
    '2026-01-29': 1450,
    '2026-01-30': 1480,
    '2026-01-31': 1444,
    '2026-02-01': 1422,
    '2026-02-02': 1444,
    '2026-02-03': 1494,
    '2026-02-04': 1480,
};

const dataFilePath = path.join(__dirname, '..', 'data', 'item-price-trends-raw.md');

// 파일 읽기
let content = fs.readFileSync(dataFilePath, 'utf-8');

// 각 날짜에 대해 처리
Object.entries(immortalData).forEach(([date, price]) => {
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

    // 이미 불멸의 유산이 있는지 확인
    if (sectionContent.includes('불멸의 유산')) {
        console.log(`✅ ${date}: 이미 불멸의 유산이 있습니다. 건너뜁니다.`);
        return;
    }

    // 근원의 속삭임 줄을 찾아서 그 다음에 삽입
    const pattern = new RegExp(`(${dateHeader}[\\s\\S]*?- 근원의 속삭임: [^\\r\\n]+\\r\\n)`, 'g');

    const replacement = `$1- 불멸의 유산: ${price}\r\n`;

    content = content.replace(pattern, replacement);
    console.log(`✅ ${date}: 불멸의 유산 추가 완료 (${price}억)`);
});

// 파일 저장
fs.writeFileSync(dataFilePath, content, 'utf-8');

console.log('\n🎉 불멸의 유산 데이터 추가 완료!');
