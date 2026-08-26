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
            res.on('end', () => {
                resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') });
            });
        });
        req.on('error', reject);
    });
}

async function run() {
    // Let's test a character lookup on maplescouter
    console.log('Testing maplescouter character fetch...');
    const res = await fetchUrl('https://maplescouter.com/ko/result?name=%EC%9C%BC%EB%82%AD%EB%8B%A4');
    console.log('Status:', res.status);
    console.log('Body length:', res.body.length);
    console.log('Snippet:', res.body.slice(0, 500));
}

run().catch(console.error);
