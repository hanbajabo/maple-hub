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
    const characterName = '아델';
    console.log(`[1] Fetching OCID for "${characterName}"...`);
    const ocidRes = await nexonGet('/maplestory/v1/id', { character_name: characterName });
    console.log('OCID result:', ocidRes);

    if (!ocidRes.ocid) {
        console.error('Character "아델" not found or deleted!');
        return;
    }

    const ocid = ocidRes.ocid;

    console.log(`[2] Fetching Basic Info for OCID: ${ocid}...`);
    const basicRes = await nexonGet('/maplestory/v1/character/basic', { ocid });
    console.log('Basic info:', {
        name: basicRes.character_name,
        world: basicRes.world_name,
        job: basicRes.character_class,
        level: basicRes.character_level,
        guild: basicRes.character_guild_name,
        image: basicRes.character_image
    });

    console.log(`[3] Fetching Stats...`);
    const statRes = await nexonGet('/maplestory/v1/character/stat', { ocid });
    const statMap = {};
    if (statRes.final_stat) {
        statRes.final_stat.forEach(s => {
            statMap[s.stat_name] = s.stat_value;
        });
    }

    console.log('Core Stats:', {
        전투력: statMap['전투력'],
        주스탯_STR: statMap['STR'],
        주스탯_DEX: statMap['DEX'],
        스탯공격력: `${statMap['최소 스탯공격력']} ~ ${statMap['최대 스탯공격력']}`,
        보스데미지: `${statMap['보스 몬스터 데미지']}%`,
        방어율무시: `${statMap['방어율 무시']}%`,
        크리티컬데미지: `${statMap['크리티컬 데미지']}%`,
        최종데미지: `${statMap['최종 데미지']}%`
    });

    console.log(`[4] Fetching 6차 Hexa Matrix...`);
    const hexaRes = await nexonGet('/maplestory/v1/character/hexamatrix', { ocid });
    console.log('Hexa Skills Count:', hexaRes.character_hexa_core_equipment?.length || 0);

    // Save full JSON
    fs.writeFileSync('scratch/adel_nexon_full.json', JSON.stringify({ basic: basicRes, stat: statRes, hexa: hexaRes }, null, 2), 'utf8');
}

run().catch(console.error);
