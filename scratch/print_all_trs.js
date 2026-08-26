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
    const trs = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
    console.log(`Total rows: ${trs.length}`);
    trs.forEach((tr, i) => {
        const text = tr[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        console.log(`[${i + 1}] ${text}`);
    });
}

main();
