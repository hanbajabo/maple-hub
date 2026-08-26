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
    console.log("Length of itempricetab.js:", js.length);
    // Find item list or search items array
    const searchItemsMatch = js.match(/const\s+ITEMS\s*=\s*\[[\s\S]*?\];/i) || js.match(/const\s+itemList\s*=\s*\[[\s\S]*?\];/i) || js.match(/items\s*:\s*\[[\s\S]*?\]/i);
    if (searchItemsMatch) {
        console.log("Items match:", searchItemsMatch[0].substring(0, 500));
    } else {
        // search for any array with quotes
        const arrays = [...js.matchAll(/const\s+([a-zA-Z0-9_]+)\s*=\s*(\[[^\]]{100,}\]);/g)];
        console.log(`Found ${arrays.length} arrays:`);
        arrays.forEach(a => console.log(`- ${a[1]} (${a[2].length} chars):`, a[2].substring(0, 150)));
    }
}

main();
