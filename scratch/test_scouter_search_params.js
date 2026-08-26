const https = require('https');

function fetchUrl(url, headers = {}) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://maplescouter.com/ko/info?name=%EC%95%84%EB%8D%B8',
                'Origin': 'https://maplescouter.com',
                'accept': 'application/json, text/plain, */*',
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
    
    // Test various query combinations
    const urls = [
        `https://api.maplescouter.com/api/id?name=${encoded}`,
        `https://api.maplescouter.com/api/id?name=${encoded}&preset=00000`,
        `https://api.maplescouter.com/api/id?name=${encoded}&region=KMS`,
        `https://api.maplescouter.com/api/id?name=${encoded}&preset=00000&region=KMS`,
        `https://api.maplescouter.com/api/id/og?name=${encoded}`
    ];

    for (const u of urls) {
        const res = await fetchUrl(u);
        console.log(u.slice(30), '-> Status:', res.status, 'Len:', res.body.length, 'Body:', res.body.slice(0, 80));
    }
}

run().catch(console.error);
