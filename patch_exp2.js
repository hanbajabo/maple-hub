const fs = require('fs');
const f = 'C:/Users/USER/Desktop/maple-colosseum/maple-hub/app/blog/ultima-squad-minigame-guide/page.tsx';
let c = fs.readFileSync(f, 'utf8');

const target = `{ cond: 'LV12 전사 + LV9 궁수 / 1-5 체킹', start: '전사 56% / 궁수 84%', after: '전사 61% / 궁수 93%', gain: '전사 +5% / 궁수 +9%', mode: '체킹' }`;
const newRow = `{ cond: 'LV12 전사 + LV9 궁수 / 1-5 반복', start: '전사 56% / 궁수 84%', after: '전사 61% / 궁수 93%', gain: '전사 +5% / 궁수 +9%', mode: '자동 반복' }`;

if (c.includes(target)) {
    c = c.replace(target, newRow);
    fs.writeFileSync(f, c, 'utf8');
    console.log('SUCCESS');
} else {
    console.log('NOT FOUND');
}
