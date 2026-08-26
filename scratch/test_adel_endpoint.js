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
    const res = await fetchLocal('http://localhost:3000/api/character/specup?name=%EC%95%84%EB%8D%B8');
    
    console.log(`=== ${res.character.name} (Lv.${res.character.level} ${res.character.job}) ===\n`);
    res.recommendations.forEach(r => {
        console.log(`${r.rank}위 [${r.slot}] ${r.targetItem}`);
        console.log(`  현재: ${r.currentStatus} → ${r.action}`);
        console.log(`  ① 노작 원가: ${r.costBreakdown.basePriceText}`);
        console.log(`  ② 스타포스:  ${r.costBreakdown.starforceCostText}`);
        console.log(`  ③ 파괴 복구: ${r.costBreakdown.sparesNeededText}`);
        console.log(`  ④ 윗잠 큐브: ${r.costBreakdown.potentialCostText}`);
        console.log(`  ⑤ 에디 큐브: ${r.costBreakdown.additionalCostText}`);
        console.log(`  💰 총비용:   ${r.costBreakdown.totalCostText}`);
        console.log(`  📈 전투력:   ${r.gains.combatPowerText}`);
        console.log('');
    });
}

run().catch(console.error);
