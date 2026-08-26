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

// Starforce cost and spare database from lib/starforce_db.ts
const { getRestorationMesoCost, getRestorationSpareCount, STARFORCE_SIMULATION_STATS } = require('../lib/starforce_db.ts');

async function run() {
    const characterName = '한자';
    console.log(`[1] Fetching OCID for "${characterName}"...`);
    const ocidRes = await nexonGet('/maplestory/v1/id', { character_name: characterName });
    const ocid = ocidRes.ocid;

    console.log(`[2] Fetching Equipment for OCID: ${ocid}...`);
    const equipRes = await nexonGet('/maplestory/v1/character/item-equipment', { ocid });

    // Let's filter equipment list
    const items = equipRes.item_equipment || [];
    console.log(`Total equipped items: ${items.length}`);

    const parsedItems = items.map(item => {
        return {
            slot: item.item_equipment_slot,
            name: item.item_name,
            icon: item.item_icon,
            starforce: parseInt(item.starforce || '0', 10),
            potentialGrade: item.potential_option_grade,
            potential1: item.potential_option_1,
            potential2: item.potential_option_2,
            potential3: item.potential_option_3,
            baseLevel: item.item_base?.req_level || 150
        };
    });

    fs.writeFileSync('scratch/hanja_items_full.json', JSON.stringify(parsedItems, null, 2), 'utf8');
    console.log('Saved parsed items to scratch/hanja_items_full.json');

    // Print summary of key items
    console.log('\n--- Key Items Summary for 한자 ---');
    parsedItems.forEach(i => {
        if (i.starforce > 0) {
            console.log(`[${i.slot}] ${i.name} -> ${i.starforce}성 (${i.potentialGrade || '노잠재'})`);
        }
    });
}

run().catch(console.error);
