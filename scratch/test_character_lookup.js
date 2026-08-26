const https = require('https');

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
            res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') }));
        });
        req.on('error', reject);
    });
}

async function run() {
    const nickname = '한자';
    console.log(`Searching character "${nickname}" on MapleScouter...`);
    const encoded = encodeURIComponent(nickname);
    
    // Test info page
    const infoRes = await fetchUrl(`https://maplescouter.com/ko/info?name=${encoded}&preset=00000`);
    console.log('Info page status:', infoRes.status, 'Body len:', infoRes.body.length);

    // Test result page
    const resultRes = await fetchUrl(`https://maplescouter.com/ko/result?name=${encoded}&preset=00000`);
    console.log('Result page status:', resultRes.status, 'Body len:', resultRes.body.length);

    // Test spec-order page (스펙업 순서)
    const specRes = await fetchUrl(`https://maplescouter.com/ko/spec-order?name=${encoded}&preset=00000`);
    console.log('Spec-order page status:', specRes.status, 'Body len:', specRes.body.length);
}

run().catch(console.error);
