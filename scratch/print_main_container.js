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
    const html = await fetchUrl('https://mitemprice.kr/itempricetab.php?name=' + encodeURIComponent('거대한 공포') + '&server=scania');
    // find container
    const containerMatch = html.match(/<div class="container"[^>]*>([\s\S]*?)<\/div>\s*<\/body>/i) || html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (containerMatch) {
        console.log("Container HTML snippet (first 3000 chars):\n", containerMatch[0].substring(0, 3000));
    } else {
        console.log("Searching for main content elements...");
        const mainIdx = html.indexOf('<body');
        console.log(html.substring(mainIdx, mainIdx + 3000));
    }
}

main();
