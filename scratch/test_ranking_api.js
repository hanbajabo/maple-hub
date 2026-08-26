const https = require('https');

function fetchUrl(url, headers = {}) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://maplescouter.com/ko/total-ranking',
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
    // Check ranking RSC stream
    const rsc = await fetchUrl('https://maplescouter.com/ko/total-ranking?worldType=%EC%A0%84%EC%B2%B4', {
        'RSC': '1',
        'Next-Router-State-Tree': '%5B%22%22%2C%7B%22children%22%3A%5B%22(pages)%22%2C%7B%22children%22%3A%5B%22total-ranking%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%5D%7D%5D%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D'
    });
    console.log('RSC status:', rsc.status, 'Body len:', rsc.body.length);
    if (rsc.body.includes('146,668') || rsc.body.includes('146668')) {
        console.log('Found 146668 in ranking RSC stream!');
    }

    // Let's search for the ranking list endpoint in chunk files
    // Let's check how ranking data is loaded
    const idx = rsc.body.indexOf('146');
    if (idx !== -1) {
        console.log('Snippet around 146:', rsc.body.slice(Math.max(0, idx - 50), idx + 200));
    }
}

run().catch(console.error);
