const https = require('https');
const fs = require('fs');

function fetchUrl(url, headers = {}) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://maplescouter.com/ko',
                ...headers,
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
    const encoded = encodeURIComponent('쯔단');
    const resultHtml = await fetchUrl(`https://maplescouter.com/ko/result?name=${encoded}&preset=00000`);
    fs.writeFileSync('scratch/zzudan_result.html', resultHtml, 'utf8');

    // Extract RSC chunks
    const regex = /self\.__next_f\.push\(\[1,"(.*)"\]\)/g;
    let payload = '';
    let match;
    while ((match = regex.exec(resultHtml)) !== null) {
        try {
            payload += JSON.parse(`"${match[1]}"`);
        } catch (e) {
            payload += match[1];
        }
    }
    fs.writeFileSync('scratch/zzudan_payload.txt', payload, 'utf8');

    // Find numbers around 환산 or scouterStat
    console.log('Payload length:', payload.length);
    
    // Look for numbers like 140,xxx or 150,xxx or 160,xxx
    const statMatches = payload.match(/[0-9]{2,3},[0-9]{3}/g) || [];
    console.log('Sample formatted numbers found in payload:', Array.from(new Set(statMatches)).slice(0, 20));
}

run().catch(console.error);
