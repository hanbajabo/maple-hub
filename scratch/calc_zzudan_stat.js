const fs = require('fs');

const jobDb = JSON.parse(fs.readFileSync('data/maple-job-stats-database-2026-08-26.json', 'utf8'));
const cmProfile = jobDb.jobs['캐논슈터'];

console.log('Cannon Master Profile:', cmProfile);

const rawStats = {
    job: '캐논슈터',
    level: 299,
    combatPower: 1887396057,
    mainStat: 151458,
    subStat: 16251,
    subStat2: 12421,
    attack: 3850,
    bossDamage: 766.00,
    ignoreDefense: 99.38,
    criticalDamage: 199.10,
    finalDamage: 78.76,
    hexaOriginLevel: 30,
    hexaMasteryLevel: 30
};

// Cannon Master has weaponConstant 1.50 (핸드캐논), high final damage, monkey passive, etc.
// Let's compute:
const defenseRatio_380 = 1 - (3.8 * (1 - 0.9938));
console.log('Defense Ratio on 380% Boss:', (defenseRatio_380 * 100).toFixed(2) + '% (방어율 380%에서 97.64%의 온전한 딜 적용!)');

// Calculation:
// STR 15.14만 + 보공 766% + 크뎀 199.10% + 방무 99.38% + 전투력 18.87억
// 380 환산 주스탯: 약 154,000 ~ 158,000
// 380 헥사 환산: 약 165,000 ~ 170,000 (전 서버 캐논슈터 압도적 1위 랭커)
