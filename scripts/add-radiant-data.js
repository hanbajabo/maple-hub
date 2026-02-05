const fs = require('fs');
const path = require('path');

// 근원의 속삭임 데이터
const radiantData = {
    '2026-01-01': 1840,
    '2026-01-04': 1789,
    '2026-01-06': 1778,
    '2026-01-07': 1800,
    '2026-01-08': 1850,
    '2026-01-10': 1888,
    '2026-01-11': 1700,
    '2026-01-12': 1777,
    '2026-01-13': 3500,
    '2026-01-14': 2444,
    '2026-01-15': 1730,
    '2026-01-17': 1700,
    '2026-01-18': 1700,
    '2026-01-19': 1650,
    '2026-01-21': 1630,
    '2026-01-24': 1548,
    '2026-01-26': 1530,
    '2026-01-27': 1800,
    '2026-01-28': 1496,
    '2026-01-29': 1520,
    '2026-01-30': 1490,
    '2026-01-31': 1475,
    '2026-02-01': 1400,
    '2026-02-02': 1310,
    '2026-02-04': 1250,
};

const dataFilePath = path.join(__dirname, '..', 'data', 'item-price-trends-raw.md');

// 파일 읽기
let content = fs.readFileSync(dataFilePath, 'utf-8');

// 각 날짜에 대해 처리
Object.entries(radiantData).forEach(([date, price]) => {
    const dateHeader = `### ${date}`;

    // 날짜가 파일에 있는지 확인
    if (!content.includes(dateHeader)) {
        console.log(`⚠️ 날짜를 찾을 수 없습니다: ${date}`);
        return;
    }

    // 이미 광휘 세트가 있는지 확인
    const nextDate = content.indexOf(`\n###`, content.indexOf(dateHeader) + 1);
    const sectionContent = nextDate === -1
        ? content.substring(content.indexOf(dateHeader))
        : content.substring(content.indexOf(dateHeader), nextDate);

    if (sectionContent.includes('광휘')) {
        console.log(`✅ ${date}: 이미 광휘 세트가 있습니다. 건너뜁니다.`);
        return;
    }

    // 광휘 세트 섹션 생성
    const radiantSection = `\r\n#### 4. 광휘의 보스 세트 (평균가 단위: 억)\r\n- 근원의 속삭임: ${price}\r\n`;

    // 에테르넬 섹션 뒤에 삽입 (간단한 패턴 매칭)
    // "- 망토: ..."을 찾아서 그 줄 다음에 삽입
    const pattern = new RegExp(`(${dateHeader}[\\s\\S]*?- 망토: [^\\r\\n]+\\r\\n)`, 'g');

    content = content.replace(pattern, `$1${radiantSection}`);
    console.log(`✅ ${date}: 광휘 세트 추가 완료 (${price}억)`);
});

// 파일 저장
fs.writeFileSync(dataFilePath, content, 'utf-8');

console.log('\n🎉 모든 데이터 추가 완료!');
