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
    console.log('Fetching https://maplescouter.com/ko/class-analysis...');
    const html = await fetchUrl('https://maplescouter.com/ko/class-analysis');
    console.log('Class analysis page length:', html.length);

    // Also let's search for job data chunks or JSON embedded
    const scripts = html.match(/\/_next\/static\/chunks\/[a-zA-Z0-9\-_/.]+\.js/g) || [];
    console.log('Scripts:', scripts.length);

    // Search for class analysis keywords in html
    const keywords = ['히어로', '팔라딘', '다크나이트', '나이트로드', '아델', '비숍', '듀얼블레이더'];
    keywords.forEach(kw => {
        console.log(`Keyword ${kw} in html:`, html.includes(kw));
    });
}

run().catch(console.error);
