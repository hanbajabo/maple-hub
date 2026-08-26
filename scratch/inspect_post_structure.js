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
    console.log("HTML length:", html.length);
    // Find where content or article is
    const idx = html.indexOf('Content');
    console.log("IndexOf Content:", idx);
    const contentMatches = [...html.matchAll(/id="([^"]*content[^"]*)"/gi)];
    console.log("IDs:", contentMatches.map(m => m[1]));
    const classMatches = [...html.matchAll(/class="([^"]*content[^"]*)"/gi)];
    console.log("Classes:", classMatches.map(m => m[1]));
    
    // Look for article body
    const artMatch = html.match(/<div[^>]+id="imageCollectDiv"[^>]*>([\s\S]*?)<\/div>/i) || html.match(/<div class="contentBody"[^>]*>([\s\S]*?)<\/div>/i);
    if (artMatch) {
        console.log("Found artMatch:", artMatch[1].substring(0, 500));
    }
}

main();
