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
    const html = await fetchUrl('https://www.inven.co.kr/board/maple/5974/7086284');
    const bodyMatch = html.match(/<div id="powerbbsContent" class="powerbbsContent">([\s\S]*?)<\/div>/i);
    if (bodyMatch) {
        const clean = bodyMatch[1].replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').trim();
        console.log("=== Post 7086284 (2026-08-25) ===");
        console.log(clean);
    } else {
        console.log("No body match");
    }
}

main();
