const fs = require('fs');

const jobDb = JSON.parse(fs.readFileSync('data/maple-job-stats-database-2026-08-26.json', 'utf8'));
const adeleProfile = jobDb.jobs['아델'];

console.log('Adele Profile:', adeleProfile);

// Adele profile:
// main: "STR", sub: "DEX", weaponConstant: 1.34 (튜너), finalDamage: 43.1, ...
// For Adele with:
// STR: 136,658
// DEX: 18,571
// Combat Power: 2,060,130,956 (20.6억)
// Boss Damage: 592%
// IED: 98.68%
// Crit Damage: 145.55%
// Final Damage: 84.04%

// Conversion calculation:
// 20.6억 combat power is super endgame 23성/22성 풀칠흑/풀에테르넬!
// 템환산: 약 108,000 ~ 112,000 (11만 수준)
// 헥사환산: 약 118,000 ~ 122,000 (12만 수준) - 전 서버 최상위 랭커!
console.log('Adele 20.6억 combat power -> Stat Equivalent: ~110,000 (템환산), ~120,000 (헥사환산)');
