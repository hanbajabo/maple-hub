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
    const html = await fetchUrl('https://maplescouter.com/ko/result?name=%EC%9C%BC%EB%82%AD%EB%8B%A4');
    const scripts = html.match(/\/_next\/static\/chunks\/[a-zA-Z0-9\-_/.]+\.js/g) || [];
    console.log('Total scripts found:', scripts.length);

    for (const s of scripts) {
        try {
            const js = await fetchUrl(`https://maplescouter.com${s}`);
            // Check for API paths or backend endpoints
            const urls = js.match(/https?:\/\/[a-zA-Z0-9.\-_/:]+/g) || [];
            const endpoints = js.match(/["'](\/(?:api|v1|v2|character)[a-zA-Z0-9\-_/.]*)["']/g) || [];
            
            const interestingUrls = urls.filter(u => !u.includes('w3.org') && !u.includes('google') && !u.includes('youtube') && !u.includes('discord') && !u.includes('vntsm') && !u.includes('schema.org'));
            if (interestingUrls.length > 0) {
                console.log(s, 'URLs:', interestingUrls);
            }
            if (endpoints.length > 0) {
                console.log(s, 'Endpoints:', endpoints.slice(0, 5));
            }
        } catch (e) {
            // ignore
        }
    }
}

run().catch(console.error);
