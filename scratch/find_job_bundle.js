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
    const html = await fetchUrl('https://maplescouter.com/ko/result?name=%EC%9C%BC%EB%82%AD%EB%8B%A4');
    const scripts = html.match(/\/_next\/static\/chunks\/[a-zA-Z0-9\-_/.]+\.js/g) || [];

    for (const s of scripts) {
        try {
            const js = await fetchUrl(`https://maplescouter.com${s}`);
            // Check if this JS bundle contains job names or stat calculation logic
            if (js.includes('히어로') && js.includes('나이트로드') && js.includes('비숍')) {
                console.log('Found JS bundle with job list:', s, 'Size:', js.length);
                fs.writeFileSync(`scratch/bundle_${s.split('/').pop()}`, js, 'utf8');
                
                // Check if it has calculation formulas or constants
                if (js.includes('weapon') || js.includes('constant') || js.includes('점유율') || js.includes('쿨감') || js.includes('환산')) {
                    console.log('-> Contains calculation keywords!');
                }
            }
        } catch (e) {
            // ignore
        }
    }
}

run().catch(console.error);
