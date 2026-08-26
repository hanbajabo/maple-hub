const https = require('https');

function fetchRsc(name) {
    const encoded = encodeURIComponent(name);
    return new Promise((resolve, reject) => {
        const req = https.get(`https://maplescouter.com/ko/result?name=${encoded}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'RSC': '1',
                'Next-Router-State-Tree': '%5B%22%22%2C%7B%22children%22%3A%5B%22(pages)%22%2C%7B%22children%22%3A%5B%22result%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%5D%7D%5D%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D',
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
    const res = await fetchRsc('으낭다');
    console.log('RSC response length:', res.length);
    console.log('Snippet:', res.slice(0, 1000));
}

run().catch(console.error);
