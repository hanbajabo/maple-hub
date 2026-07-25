const fs = require('fs');
const f = 'C:/Users/USER/Desktop/maple-colosseum/maple-hub/app/blog/ultima-squad-minigame-guide/page.tsx';
let c = fs.readFileSync(f, 'utf8');
let changed = 0;

const replacements = [
    [
        `{ stage: '6단계', lv: 'Lv. 32 이상', atk: '+65 (최대 +85)', armor: '최대 HP +762~+1038 / 방어력 +268~+303', pot: '미확인', price: '60,140 G' }`,
        `{ stage: '6단계', lv: 'Lv. 32 이상', atk: '+65 (최대 +85)', armor: '최대 HP +762~+1038 / 방어력 +268~+303', pot: '무기 공/마 +20 / 방어구 HP +276, 방어력 +35 (계산값)', price: '60,140 G' }`
    ],
    [
        `{ stage: '7단계', lv: 'Lv. 40 이상', atk: '+111 (최대 +139)', armor: '최대 HP +1360~+1840 / 방어력 +362~+398', pot: '미확인', price: '270,640 G' }`,
        `{ stage: '7단계', lv: 'Lv. 40 이상', atk: '+111 (최대 +139)', armor: '최대 HP +1360~+1840 / 방어력 +362~+398', pot: '무기 공/마 +28 / 방어구 HP +480, 방어력 +36 (계산값)', price: '270,640 G' }`
    ],
    [
        `{ stage: '8단계', lv: 'Lv. 40 이상', atk: '+165 (최대 +205)', armor: '최대 HP +2040~+2760 / 방어력 +407~+443', pot: '미확인', price: '1,217,890 G' }`,
        `{ stage: '8단계', lv: 'Lv. 40 이상', atk: '+165 (최대 +205)', armor: '최대 HP +2040~+2760 / 방어력 +407~+443', pot: '무기 공/마 +40 / 방어구 HP +720, 방어력 +36 (계산값)', price: '1,217,890 G' }`
    ],
];

for (const [oldStr, newStr] of replacements) {
    if (c.includes(oldStr)) {
        c = c.replace(oldStr, newStr);
        changed++;
        console.log(`✅ replaced stage ${oldStr.substring(11, 14)}`);
    } else {
        console.log(`❌ NOT FOUND: ${oldStr.substring(11, 50)}`);
    }
}

fs.writeFileSync(f, c, 'utf8');
console.log(`\nDone. ${changed}/3 replacements made.`);
