const fs = require('fs');
const f = 'C:/Users/USER/Desktop/maple-colosseum/maple-hub/app/blog/ultima-squad-minigame-guide/page.tsx';
let c = fs.readFileSync(f, 'utf8');

const target = `{ cond: 'LV12 전사 + LV9 궁수 / 1-6 반복', start: '전사 64% / 궁수 97%', after: '전사 70% / 궁수 6% (Lv.10)', gain: '전사 +6% / 궁수 +9%', mode: '자동 반복' },`;
const newRow = `{ cond: 'LV12 전사 + LV9 궁수 / 1-6 반복', start: '전사 64% / 궁수 97%', after: '전사 70% / 궁수 6% (Lv.10)', gain: '전사 +6% / 궁수 +9%', mode: '자동 반복' },\r\n                                            { cond: 'LV12 전사 + LV10 궁수 / 1-7 반복', start: '전사 72% / 궁수 8%', after: '전사 78% / 궁수 17%', gain: '전사 +6% / 궁수 +9%', mode: '자동 반복' },`;

if (c.includes(target)) {
    c = c.replace(target, newRow);
    fs.writeFileSync(f, c, 'utf8');
    console.log('SUCCESS');
} else {
    // Try LF
    const targetLF = target.replace(/\r\n/g, '\n');
    const newRowLF = newRow.replace(/\r\n/g, '\n');
    if (c.includes(targetLF)) {
        c = c.replace(targetLF, newRowLF);
        fs.writeFileSync(f, c, 'utf8');
        console.log('SUCCESS (LF)');
    } else {
        console.log('NOT FOUND');
    }
}
