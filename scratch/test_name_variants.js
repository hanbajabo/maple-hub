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
    const testNames = [
        '저주받은 마도서',
        '마도서',
        '미트라의 분노: 전사',
        '미트라의 분노',
        '미트라'
    ];
    for (const name of testNames) {
        const url = 'https://mitemprice.kr/itempricetab.php?name=' + encodeURIComponent(name) + '&server=scania';
        const html = await fetchUrl(url);
        const rowRegex = /<tr[^>]*>\s*<td[^>]*>(\d{4}-\d{2}-\d{2})<\/td>\s*<td[^>]*>([^<]+)<\/td>/gi;
        const rows = [...html.matchAll(rowRegex)];
        console.log(`[${name}] -> ${rows.length} rows`);
        if (rows.length > 0) {
            console.log("  Sample row:", rows[0][1], rows[0][2]);
        }
    }
}

main();
