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
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        });
        req.on('error', reject);
    });
}

async function main() {
    try {
        const html = await fetchUrl('https://www.inven.co.kr/board/maple/5974/7093458');
        // extract title
        const titleMatch = html.match(/<div class="articleTitle">([\s\S]*?)<\/div>/i) || html.match(/<title>([\s\S]*?)<\/title>/i);
        console.log("Title:", titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : "None");
        
        // extract body
        const bodyMatch = html.match(/<div id="powerbbsContent" class="powerbbsContent">([\s\S]*?)<\/div>/i) || html.match(/<div class="articleContent"[^>]*>([\s\S]*?)<\/div>/i);
        if (bodyMatch) {
            const clean = bodyMatch[1].replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').trim();
            console.log("\n--- Body (first 1000 chars) ---");
            console.log(clean.substring(0, 1000));
        } else {
            console.log("Body not matched");
        }
    } catch (e) {
        console.error(e);
    }
}

main();
