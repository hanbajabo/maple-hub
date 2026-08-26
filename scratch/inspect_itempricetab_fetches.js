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
    const js = await fetchUrl('https://mitemprice.kr/scripts/itempricetab.js?v=V004');
    // find all fetch or ajax or api calls
    const fetchCalls = [...js.matchAll(/fetch\(['"`]([^'"`]+)['"`]/gi)];
    console.log("Fetch calls in itempricetab.js:", fetchCalls.map(f => f[1]));
    
    // find function setupDetailSearch
    const searchFunc = js.match(/function\s+setupDetailSearch[\s\S]*?^}/m) || js.match(/detailSearchInput[\s\S]*?^}/m);
    if (searchFunc) {
        console.log("Search function snippet:\n", searchFunc[0].substring(0, 1500));
    }
}

main();
