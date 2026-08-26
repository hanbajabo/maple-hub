const https = require('https');

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
    // Check main bundle or chunk
    const html = await fetchUrl('https://maplescouter.com/ko/result?name=%EC%9C%BC%EB%82%AD%EB%8B%A4');
    const scripts = html.match(/\/static\/chunks\/[a-zA-Z0-9\-_.]+\.js/g) || [];
    console.log('Scripts found:', scripts.length);

    for (const s of scripts.slice(0, 8)) {
        const js = await fetchUrl(`https://maplescouter.com/_next${s}`);
        // Search for fetch, axios, /api, or formulas
        const apiMatches = js.match(/\/api\/[a-zA-Z0-9\-_/]+/g) || [];
        if (apiMatches.length > 0) {
            console.log(s, 'APIs:', Array.from(new Set(apiMatches)));
        }
    }
}

run().catch(console.error);
