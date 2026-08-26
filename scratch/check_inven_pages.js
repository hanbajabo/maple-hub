const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://www.inven.co.kr/',
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
    for (let p = 1; p <= 5; p++) {
        const url = `https://www.inven.co.kr/board/maple/5974?name=nicname&keyword=%EB%8B%89%EB%84%A4%EC%9E%84%ED%9E%98%EB%93%9C%EB%9F%AC&eq=1&iskin=&p=${p}`;
        const html = await fetchUrl(url);
        const kwMatches = [...html.matchAll(/<a[^>]+href="([^"]*5974\/\d+\?name=nicname[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];
        console.log(`--- Page ${p} (${kwMatches.length} matches) ---`);
        kwMatches.forEach(m => {
            const title = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            console.log(`  ${title}`);
        });
        if (kwMatches.length === 0) break;
    }
}

main();
