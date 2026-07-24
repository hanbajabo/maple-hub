const fs = require('fs');
const f = 'C:/Users/USER/Desktop/maple-colosseum/maple-hub/app/blog/ultima-squad-minigame-guide/page.tsx';
let c = fs.readFileSync(f, 'utf8');
let changed = 0;

const replacements = [
    // 1단계 armor
    [
        `{ stage: '1단계', lv: '제한 없음', atk: '+9', armor: '최대 HP +45 / 방어력 +5'`,
        `{ stage: '1단계', lv: '제한 없음', atk: '+9 (최대 +13)', armor: '최대 HP +45~+55 / 방어력 +5~+9'`
    ],
    // 2단계 armor
    [
        `{ stage: '2단계', lv: 'Lv. 6 이상', atk: '+14', armor: '최대 HP +74 / 방어력 +10'`,
        `{ stage: '2단계', lv: 'Lv. 6 이상', atk: '+14 (최대 +18)', armor: '최대 HP +74~+86 / 방어력 +10~+14'`
    ],
    // 3단계 armor
    [
        `{ stage: '3단계', lv: 'Lv. 12 이상', atk: '+20', armor: '최대 HP +112 / 방어력 +15'`,
        `{ stage: '3단계', lv: 'Lv. 12 이상', atk: '+20 (최대 +24)', armor: '최대 HP +112~+128 / 방어력 +15~+19'`
    ],
    // 4단계 armor
    [
        `{ stage: '4단계 ⭐', lv: 'Lv. 18 이상', atk: '+25 (최대 +31)', armor: '최대 HP +158 / 방어력 +20'`,
        `{ stage: '4단계 ⭐', lv: 'Lv. 18 이상', atk: '+25 (최대 +31)', armor: '최대 HP +158~+192 / 방어력 +20~+24'`
    ],
    // 5단계 armor
    [
        `{ stage: '5단계 ⭐', lv: 'Lv. 24 이상', atk: '+32 (최대 +38)', armor: '최대 HP +231 / 방어력 +25'`,
        `{ stage: '5단계 ⭐', lv: 'Lv. 24 이상', atk: '+32 (최대 +38)', armor: '최대 HP +231~+269 / 방어력 +128~+172'`
    ],
    // 6단계 armor
    [
        `{ stage: '6단계', lv: 'Lv. 32 이상', atk: '+65 (최대 +85)', armor: '미확인'`,
        `{ stage: '6단계', lv: 'Lv. 32 이상', atk: '+65 (최대 +85)', armor: '최대 HP +762~+1038 / 방어력 +268~+303'`
    ],
    // 7단계 armor
    [
        `{ stage: '7단계', lv: 'Lv. 40 이상', atk: '+111 (최대 +139)', armor: '미확인'`,
        `{ stage: '7단계', lv: 'Lv. 40 이상', atk: '+111 (최대 +139)', armor: '최대 HP +1360~+1840 / 방어력 +362~+398'`
    ],
    // 8단계 armor + price
    [
        `{ stage: '8단계', lv: 'Lv. 40 이상', atk: '+165 (최대 +205)', armor: '미확인', pot: '미확인', price: '미확인' }`,
        `{ stage: '8단계', lv: 'Lv. 40 이상', atk: '+165 (최대 +205)', armor: '최대 HP +2040~+2760 / 방어력 +407~+443', pot: '미확인', price: '1,217,890 G' }`
    ],
];

for (const [oldStr, newStr] of replacements) {
    if (c.includes(oldStr)) {
        c = c.replace(oldStr, newStr);
        changed++;
        console.log(`✅ replaced: ${oldStr.substring(10, 50)}...`);
    } else {
        console.log(`❌ NOT FOUND: ${oldStr.substring(10, 50)}...`);
    }
}

fs.writeFileSync(f, c, 'utf8');
console.log(`\nDone. ${changed}/${replacements.length} replacements made.`);
