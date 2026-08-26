const https = require('https');
const fs = require('fs');

function fetchUrl(url, headers = {}) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://maplescouter.com/ko',
                'Origin': 'https://maplescouter.com',
                ...headers,
            }
        }, (res) => {
            const chunks = [];
            res.on('data', c => chunks.push(c));
            res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') }));
        });
        req.on('error', reject);
    });
}

async function run() {
    const encoded = encodeURIComponent('아델');
    console.log(`Testing direct call to https://api.maplescouter.com/api/id?name=${encoded}...`);
    
    const res = await fetchUrl(`https://api.maplescouter.com/api/id?name=${encoded}`);
    console.log('Status:', res.status);
    console.log('Response body len:', res.body.length);

    try {
        const json = JSON.parse(res.body);
        console.log('Parsed JSON keys:', Object.keys(json));
        fs.writeFileSync('scratch/adel_scouter_api_full.json', JSON.stringify(json, null, 2), 'utf8');

        if (json.calculatedData) {
            console.log('\n--- Calculated Data ---');
            console.log('boss380_stat (환산 380):', json.calculatedData.boss380_stat);
            console.log('boss380_hexaStat (380 헥사환산):', json.calculatedData.boss380_hexaStat);
            console.log('boss300_stat (환산 300):', json.calculatedData.boss300_stat);
            console.log('boss300_hexaStat (300 헥사환산):', json.calculatedData.boss300_hexaStat);
            console.log('combatPower (인게임 전투력):', json.calculatedData.combatPower);
            console.log('exchangePower (환산 전투력):', json.calculatedData.exchangePower);
            console.log('exchangePowerHexa (헥사 전투력):', json.calculatedData.exchangePowerHexa);
        }
    } catch (e) {
        console.log('Non-JSON response snippet:', res.body.slice(0, 300));
    }
}

run().catch(console.error);
