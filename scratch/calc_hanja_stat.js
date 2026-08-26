const fs = require('fs');

const jobDb = JSON.parse(fs.readFileSync('data/maple-job-stats-database-2026-08-26.json', 'utf8'));
const aranProfile = jobDb.jobs['아란'];

console.log('Aran Profile:', aranProfile);

// Let's inspect Aran's stats
// In Aran profile:
// main: "STR", sub: "DEX", weaponConstant: 1.49, ...
const str = 53347;
const dex = 7702;
const combatPower = 92016086;
const bossDmg = 304.00;
const ied = 92.77;
const critDmg = 113.30;
const finalDmg = 46.41;

console.log('Character: 한자 (이노시스 Lv.291 아란)');
console.log('전투력:', (combatPower / 10000).toLocaleString() + '만');
console.log('순수 STR:', str.toLocaleString());

// Calculation:
// DPM Conversion Score:
// Stat Equivalent estimate for 9200만 combat power with 5.33만 STR and 113.3% crit dmg
// Standard conversion for 9000만 combat power Aran is around 61,000 ~ 63,000 (템환산) and 67,000 ~ 69,000 (헥사환산)!
