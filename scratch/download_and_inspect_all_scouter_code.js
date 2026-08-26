const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://maplescouter.com/ko',
            }
        }, (res) => {
            const chunks = [];
            res.on('data', c => chunks.push(c));
            res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        });
        req.on('error', reject);
    });
}

async function run() {
    console.log('Fetching main page to get all script chunk URLs...');
    const html = await fetchUrl('https://maplescouter.com/ko/result?name=%EC%95%84%EB%8D%B8');
    const scripts = html.match(/\/_next\/static\/chunks\/[a-zA-Z0-9\-_/.]+\.js/g) || [];
    console.log(`Found ${scripts.length} chunk scripts.`);

    const foundFormulas = [];

    for (const s of scripts) {
        try {
            const js = await fetchUrl(`https://maplescouter.com${s}`);
            const filename = s.split('/').pop();
            fs.writeFileSync(`scratch/scouter_chunks_${filename}`, js, 'utf8');

            // Search for calculation formulas
            const formulaKeywords = [
                '380', '300', '환산', '스탯공격력', '방어율', '최종데미지', '크리티컬',
                'calculateStat', 'calcDmg', 'calcHexa', 'getSpecOrder', 'dpm_atk', 'statWeight'
            ];

            const matchedKw = formulaKeywords.filter(kw => js.includes(kw));
            if (matchedKw.length >= 3) {
                console.log(`[MATCH] Chunk ${filename} (${js.length} bytes) matched:`, matchedKw.join(', '));
                foundFormulas.push({ chunk: s, matched: matchedKw, size: js.length });
            }
        } catch (e) {
            console.error('Error fetching', s, e.message);
        }
    }

    console.log(`\nFound ${foundFormulas.length} key formula chunks!`);
}

run().catch(console.error);
