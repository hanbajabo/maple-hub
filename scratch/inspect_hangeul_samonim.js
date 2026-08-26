const https = require('https');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const keyMatch = envFile.match(/NEXON_API_KEY=(.*)/);
const apiKey = keyMatch ? keyMatch[1].trim() : '';

function nexonGet(endpoint, params = {}) {
    return new Promise((resolve, reject) => {
        const query = new URLSearchParams(params).toString();
        const url = `https://open.api.nexon.com${endpoint}${query ? '?' + query : ''}`;
        
        const req = https.get(url, {
            headers: {
                'x-nxopen-api-key': apiKey,
                'Content-Type': 'application/json'
            }
        }, (res) => {
            const chunks = [];
            res.on('data', c => chunks.push(c));
            res.on('end', () => {
                const body = Buffer.concat(chunks).toString('utf8');
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    resolve(body);
                }
            });
        });
        req.on('error', reject);
    });
}

async function run() {
    const characterName = '한글사모님';
    console.log(`[1] Fetching OCID for "${characterName}"...`);
    const ocidRes = await nexonGet('/maplestory/v1/id', { character_name: characterName });
    console.log('OCID result:', ocidRes);

    if (!ocidRes.ocid) {
        console.error('Character not found!');
        return;
    }

    const ocid = ocidRes.ocid;
    const basicRes = await nexonGet('/maplestory/v1/character/basic', { ocid });
    const statRes = await nexonGet('/maplestory/v1/character/stat', { ocid });
    const equipRes = await nexonGet('/maplestory/v1/character/item-equipment', { ocid });

    console.log('Basic:', basicRes.character_name, basicRes.character_class, basicRes.character_level, basicRes.world_name);

    const items = equipRes.item_equipment || [];
    console.log(`Equipped items count: ${items.length}`);
    items.forEach(i => {
        console.log(`[${i.item_equipment_slot}] ${i.item_name} -> ${i.starforce}성 (${i.potential_option_grade || '노잠재'}) [${i.potential_option_1}]`);
    });

    fs.writeFileSync('scratch/hangeul_equip.json', JSON.stringify({ basic: basicRes, stat: statRes, items }, null, 2), 'utf8');
}

run().catch(console.error);
