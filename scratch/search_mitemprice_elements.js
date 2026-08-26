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
    const html = await fetchUrl('https://mitemprice.kr/');
    // search for item names in HTML
    const items = [...html.matchAll(/class="item-name"[^>]*>([\s\S]*?)<\//gi)] || [...html.matchAll(/<div[^>]*class="[^"]*name[^"]*"[^>]*>([\s\S]*?)<\//gi)];
    console.log("Item-name matches:", items.length);
    if (items.length > 0) {
        console.log(items.slice(0, 20).map(i => i[1].replace(/<[^>]+>/g, '').trim()));
    } else {
        // search for any onclick or data-name
        const dataNames = [...html.matchAll(/data-name="([^"]+)"/gi)];
        console.log("Data-names:", dataNames.map(d => d[1]));
        
        // search for table td
        const trs = [...html.matchAll(/<tr[^>]*>[\s\S]*?<\/tr>/gi)];
        console.log("TRs count:", trs.length);
        if (trs.length > 0) {
            trs.slice(0, 10).forEach(tr => console.log(tr[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()));
        }
    }
}

main();
