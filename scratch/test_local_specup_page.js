const http = require('http');

function fetchLocal(url) {
    return new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
            const chunks = [];
            res.on('data', c => chunks.push(c));
            res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString('utf8') }));
        });
        req.on('error', reject);
    });
}

async function run() {
    console.log('Testing local API endpoint /api/character/specup?name=한자 ...');
    try {
        const apiRes = await fetchLocal('http://localhost:3000/api/character/specup?name=%ED%95%9C%EC%9E%90');
        console.log('API Status:', apiRes.status);
        console.log('API Snippet:', apiRes.body.slice(0, 300));
    } catch (e) {
        console.log('API test error:', e.message);
    }

    console.log('\nTesting local page /calculator/specup-advisor ...');
    try {
        const pageRes = await fetchLocal('http://localhost:3000/calculator/specup-advisor');
        console.log('Page Status:', pageRes.status);
        console.log('Page body length:', pageRes.body.length);
    } catch (e) {
        console.log('Page test error:', e.message);
    }
}

run().catch(console.error);
