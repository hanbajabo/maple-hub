const http = require('http');

function fetchLocal(url) {
    return new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
            const chunks = [];
            res.on('data', c => chunks.push(c));
            res.on('end', () => resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))));
        });
        req.on('error', reject);
    });
}

async function run() {
    console.log('Testing endpoint for 한글사모님...');
    const res = await fetchLocal('http://localhost:3000/api/character/specup?name=%ED%95%9C%EA%B8%80%EC%82%AC%EB%AA%A8%EB%8B%98');
    
    console.log(`Character: ${res.character.name} (Lv.${res.character.level} ${res.character.job})`);
    console.log('--- Top 5 Recommendations ---');
    res.recommendations.forEach(r => {
        console.log(`${r.rank}위 [${r.slot}]: ${r.targetItem} ➔ ${r.action} (비용: ${r.costBreakdown.totalCostText}, 전투력: ${r.gains.combatPowerText}, 효율: ${r.efficiencyScore})`);
    });
}

run().catch(console.error);
