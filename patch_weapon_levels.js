const fs = require('fs');
const f = 'C:/Users/USER/Desktop/maple-colosseum/maple-hub/app/blog/ultima-squad-minigame-guide/page.tsx';
let c = fs.readFileSync(f, 'utf8');
let changed = 0;

// 1. 장비 스탯 테이블 - 4단계/5단계 레벨 업데이트, 6단계~ 확장
const oldGearRows = `{ stage: '4단계 ⭐', lv: 'Lv. 22 이상(테섭)', atk: '+25', armor: '최대 HP +158 / 방어력 +20', pot: '무기 공/마 +4 / 방어구 HP +34, 방어력 +4', price: '6,300 G' },\r\n                                            { stage: '5단계 ⭐', lv: 'Lv. 28 이상(테섭)', atk: '+32', armor: '최대 HP +231 / 방어력 +25', pot: '무기 공/마 +6 / 방어구 HP +38, 방어력 +4', price: '13,370 G' },\r\n                                            { stage: '6단계~', lv: '미확인', atk: '미확인', armor: '미확인', pot: '미확인', price: '미확인' },`;

const newGearRows = `{ stage: '4단계 ⭐', lv: 'Lv. 18 이상', atk: '+25 (최대 +31)', armor: '최대 HP +158 / 방어력 +20', pot: '무기 공/마 +4 / 방어구 HP +34, 방어력 +4', price: '6,300 G' },\r\n                                            { stage: '5단계 ⭐', lv: 'Lv. 24 이상', atk: '+32 (최대 +38)', armor: '최대 HP +231 / 방어력 +25', pot: '무기 공/마 +6 / 방어구 HP +38, 방어력 +4', price: '13,370 G' },\r\n                                            { stage: '6단계', lv: 'Lv. 32 이상', atk: '+65 (최대 +85)', armor: '미확인', pot: '미확인', price: '60,140 G' },\r\n                                            { stage: '7단계', lv: 'Lv. 40 이상', atk: '+111 (최대 +139)', armor: '미확인', pot: '미확인', price: '270,640 G' },\r\n                                            { stage: '8단계', lv: 'Lv. 40 이상', atk: '+165 (최대 +205)', armor: '미확인', pot: '미확인', price: '미확인' },`;

if (c.includes(oldGearRows)) {
    c = c.replace(oldGearRows, newGearRows);
    changed++;
    console.log('1. Gear stats table updated');
} else {
    // try LF
    if (c.includes(oldGearRows.replace(/\r\n/g, '\n'))) {
        c = c.replace(oldGearRows.replace(/\r\n/g, '\n'), newGearRows.replace(/\r\n/g, '\n'));
        changed++;
        console.log('1. Gear stats table updated (LF)');
    } else {
        console.log('1. FAIL - gear stats table not found');
    }
}

// 2. 잠재능력 테이블 - 4단계/5단계 레벨 업데이트
const old4stage = `{ stage: '4단계', potential: '에픽', optionCount: '2종', levelLimit: 'Lv. 22 이상(테섭)' },`;
const new4stage = `{ stage: '4단계', potential: '에픽', optionCount: '2종', levelLimit: 'Lv. 18 이상' },`;
if (c.includes(old4stage)) { c = c.replace(old4stage, new4stage); changed++; console.log('2. Potential table 4단계 updated'); }
else console.log('2. FAIL - potential table 4단계');

const old5stage = `{ stage: '5단계', potential: '에픽', optionCount: '2종', levelLimit: 'Lv. 28 이상(테섭)' },`;
const new5stage = `{ stage: '5단계', potential: '에픽', optionCount: '2종', levelLimit: 'Lv. 24 이상' },`;
if (c.includes(old5stage)) { c = c.replace(old5stage, new5stage); changed++; console.log('3. Potential table 5단계 updated'); }
else console.log('3. FAIL - potential table 5단계');

const old6stage = `{ stage: '6단계', potential: '유니크', optionCount: '2종', levelLimit: '미확인' },`;
const new6stage = `{ stage: '6단계', potential: '유니크', optionCount: '2종', levelLimit: 'Lv. 32 이상' },`;
if (c.includes(old6stage)) { c = c.replace(old6stage, new6stage); changed++; console.log('4. Potential table 6단계 updated'); }
else console.log('4. FAIL - potential table 6단계');

const old7stage = `{ stage: '7단계', potential: '레전드리', optionCount: '2종', levelLimit: '미확인' },`;
const new7stage = `{ stage: '7단계', potential: '레전드리', optionCount: '2종', levelLimit: 'Lv. 40 이상' },`;
if (c.includes(old7stage)) { c = c.replace(old7stage, new7stage); changed++; console.log('5. Potential table 7단계 updated'); }
else console.log('5. FAIL - potential table 7단계');

const old8stage = `{ stage: '8단계', potential: '레전드리', optionCount: '3종', levelLimit: '미확인' },`;
const new8stage = `{ stage: '8단계', potential: '레전드리', optionCount: '3종', levelLimit: 'Lv. 40 이상' },`;
if (c.includes(old8stage)) { c = c.replace(old8stage, new8stage); changed++; console.log('6. Potential table 8단계 updated'); }
else console.log('6. FAIL - potential table 8단계');

// 3. 안내 배너 (장비 스탯 테이블 위) - 4단계/5단계 추가
const oldBanner4 = `<li><span className="text-yellow-300 font-semibold">그 외 단계</span>: 본섭 변경 여부 <span className="text-rose-400 font-bold">추가 실측 확인 필요</span></li>`;
const newBanner4 = `<li><span className="text-white font-semibold">4단계</span>: 테섭 <span className="line-through text-slate-500">Lv. 22 이상</span> → 본섭 <span className="text-emerald-300 font-bold">Lv. 18 이상</span> <span className="text-emerald-400">(본섭 실측 확인)</span></li>\r\n                                        <li><span className="text-white font-semibold">5단계</span>: 테섭 <span className="line-through text-slate-500">Lv. 28 이상</span> → 본섭 <span className="text-emerald-300 font-bold">Lv. 24 이상</span> <span className="text-emerald-400">(본섭 실측 확인)</span></li>\r\n                                        <li><span className="text-white font-semibold">6단계</span>: <span className="text-emerald-300 font-bold">Lv. 32 이상</span> / 7~8단계: <span className="text-emerald-300 font-bold">Lv. 40 이상</span> <span className="text-emerald-400">(본섭 실측 확인)</span></li>\r\n                                        <li><span className="text-yellow-300 font-semibold">방어구 착용 레벨</span>: 본섭 변경 여부 <span className="text-rose-400 font-bold">추가 실측 확인 필요</span></li>`;
if (c.includes(oldBanner4)) { c = c.replace(oldBanner4, newBanner4); changed++; console.log('7. Banner updated'); }
else console.log('7. FAIL - banner not found');

// 4. 업데이트 섹션 배너 (7/23 패치 노트) - 4/5단계 장비 레벨제한 업데이트
const oldUpdateBanner = `<li>• 4~5단계 장비: 본섭 변경 여부 <strong className="text-red-400 font-bold">추가 실측 확인 필요</strong> (테섭 기준 Lv. 22, Lv. 28)</li>`;
const newUpdateBanner = `<li>• 4단계 장비: <span className="line-through text-slate-500">Lv. 22 이상</span> ➔ <strong className="text-orange-300 font-bold">Lv. 18 이상</strong> 착용 가능</li>\r\n                                    <li>• 5단계 장비: <span className="line-through text-slate-500">Lv. 28 이상</span> ➔ <strong className="text-orange-300 font-bold">Lv. 24 이상</strong> 착용 가능</li>\r\n                                    <li>• 6단계 장비: <strong className="text-orange-300 font-bold">Lv. 32 이상</strong> / 7~8단계: <strong className="text-orange-300 font-bold">Lv. 40 이상</strong> (본섭 실측 확인)</li>`;
if (c.includes(oldUpdateBanner)) { c = c.replace(oldUpdateBanner, newUpdateBanner); changed++; console.log('8. Update notice banner updated'); }
else console.log('8. FAIL - update notice banner not found');

fs.writeFileSync(f, c, 'utf8');
console.log(`\nDone. ${changed} replacements made.`);
