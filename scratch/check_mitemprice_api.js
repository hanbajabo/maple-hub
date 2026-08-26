const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            }
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchUrl(res.headers.location).then(resolve).catch(reject);
            }
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        });
        req.on('error', reject);
    });
}

async function main() {
    try {
        const script = await fetchUrl('https://mitemprice.kr/scripts/script.js?v=V015');
        console.log("Script length:", script.length);
        console.log("API endpoints or fetch in script:");
        const fetchCalls = [...script.matchAll(/fetch\(['"`]([^'"`]+)['"`]/gi)];
        console.log(fetchCalls.map(f => f[1]));
        
        // Also check if there are JSON data objects in script
        const jsonMatch = script.match(/const\s+[\w]+\s*=\s*\[[\s\S]*?\];/);
        if (jsonMatch) {
            console.log("Found JSON array in script:", jsonMatch[0].substring(0, 300));
        }
    } catch (e) {
        console.error(e.message);
    }
}

main();
