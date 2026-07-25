const fs = require('fs');
const f = 'C:/Users/USER/Desktop/maple-colosseum/maple-hub/app/blog/ultima-squad-minigame-guide/page.tsx';
let c = fs.readFileSync(f, 'utf8');

// 1. thead: split armor column into hp + def
const oldThead = `                                            <th className="p-2.5 sm:p-3 border border-slate-700 font-bold text-sky-200">방어구 기본 스탯 (모자/장갑/신발)</th>`;
const newThead = `                                            <th className="p-2.5 sm:p-3 border border-slate-700 font-bold text-sky-200 text-center">최대 HP</th>\r\n                                            <th className="p-2.5 sm:p-3 border border-slate-700 font-bold text-indigo-300 text-center">방어력</th>`;
if (c.includes(oldThead)) { c = c.replace(oldThead, newThead); console.log('✅ thead split'); }
else console.log('❌ thead not found');

// 2. data rows: split armor into hp + def, remove (계산값)
const rows = [
    [`armor: '최대 HP +45~+55 / 방어력 +5~+9'`, `hp: '+45~+55', def: '+5~+9'`],
    [`armor: '최대 HP +74~+86 / 방어력 +10~+14'`, `hp: '+74~+86', def: '+10~+14'`],
    [`armor: '최대 HP +112~+128 / 방어력 +15~+19'`, `hp: '+112~+128', def: '+15~+19'`],
    [`armor: '최대 HP +158~+192 / 방어력 +20~+24'`, `hp: '+158~+192', def: '+20~+24'`],
    [`armor: '최대 HP +231~+269 / 방어력 +128~+172'`, `hp: '+231~+269', def: '+128~+172'`],
    [`armor: '최대 HP +762~+1038 / 방어력 +268~+303'`, `hp: '+762~+1038', def: '+268~+303'`],
    [`armor: '최대 HP +1360~+1840 / 방어력 +362~+398'`, `hp: '+1360~+1840', def: '+362~+398'`],
    [`armor: '최대 HP +2040~+2760 / 방어력 +407~+443'`, `hp: '+2040~+2760', def: '+407~+443'`],
];
let rowChanged = 0;
for (const [oldA, newA] of rows) {
    if (c.includes(oldA)) { c = c.replace(oldA, newA); rowChanged++; }
}
console.log(`✅ data rows: ${rowChanged}/8`);

// 3. remove (계산값) from pot fields
c = c.replace(/ \(계산값\)/g, '');
console.log('✅ removed (계산값)');

// 4. td render: replace {row.armor} cell with two cells for hp and def
const oldTd = `                                                <td className="p-2.5 sm:p-3 border border-slate-700 text-xs sm:text-sm font-medium text-slate-100">{row.armor}</td>`;
const newTd = `                                                <td className="p-2.5 sm:p-3 border border-slate-700 text-xs sm:text-sm font-medium text-sky-200 text-center whitespace-nowrap">{row.hp}</td>\r\n                                                <td className="p-2.5 sm:p-3 border border-slate-700 text-xs sm:text-sm font-medium text-indigo-300 text-center whitespace-nowrap">{row.def}</td>`;
if (c.includes(oldTd)) { c = c.replace(oldTd, newTd); console.log('✅ td render split'); }
else console.log('❌ td not found');

fs.writeFileSync(f, c, 'utf8');
console.log('\nDone.');
