const https = require('https');
const iconv = require('iconv-lite'); // if available or native

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
    // Note: keyword in inven can be euc-kr or utf-8 depending on encoding
    // Inven maple board URL: https://www.inven.co.kr/board/maple/5974?name=nicname&keyword=%EB%8B%89%EB%84%A4%EC%9E%84%ED%9E%98%EB%93%9C%EB%9F%AC&eq=1&iskin=
    const html = await fetchUrl('https://www.inven.co.kr/board/maple/5974?name=nicname&keyword=%EB%8B%89%EB%84%A4%EC%9E%84%ED%9E%98%EB%93%9C%EB%9F%AC&eq=1&iskin=');
    console.log("HTML length:", html.length);
    
    // Look for links with /5974/
    const matches = [...html.matchAll(/<a[^>]+href="([^"]*5974\/\d+[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];
    console.log("Found matches:", matches.length);
    for (let i = 0; i < Math.min(matches.length, 15); i++) {
        const link = matches[i][1];
        const text = matches[i][2].replace(/<[^>]+>/g, '').trim();
        console.log(`[${i + 1}] ${text} -> ${link}`);
    }
}

main();
