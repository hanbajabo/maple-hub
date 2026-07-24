const fs = require('fs');
const f = 'C:/Users/USER/Desktop/maple-colosseum/maple-hub/app/blog/ultima-squad-minigame-guide/page.tsx';
let c = fs.readFileSync(f, 'utf8');

const target = `{ cond: 'LV10 전사 + LV6 궁수 / 1-7 반복', start: '전사 34% / 궁수 92%', after: '전사 38% / 궁수 99%', gain: '전사 +4% / 궁수 +7%', mode: '자동 반복' },`;
const newRow = `{ cond: 'LV10 전사 + LV6 궁수 / 1-7 반복', start: '전사 34% / 궁수 92%', after: '전사 38% / 궁수 99%', gain: '전사 +4% / 궁수 +7%', mode: '자동 반복' },\r\n                                            { cond: 'LV12 전사 + LV9 궁수 / 1-5 체킹', start: '전사 56% / 궁수 84%', after: '전사 61% / 궁수 93%', gain: '전사 +5% / 궁수 +9%', mode: '체킹' },`;

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
