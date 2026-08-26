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
    // search for forms, pagination, inputs, or scripts
    const pagination = html.match(/class="pagination"[^>]*>([\s\S]*?)<\/div>/i);
    console.log("Pagination:", pagination ? pagination[0] : "No pagination div");
    
    // search for any date input or select
    const inputs = [...html.matchAll(/<(?:input|select)[^>]*name="([^"]+)"[^>]*>/gi)];
    console.log("Form inputs:", inputs.map(i => i[1]));
    
    // search for fetch or ajax calls in script
    const scripts = [...html.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi)];
    console.log("Script count:", scripts.length);
    scripts.forEach((s, idx) => {
        console.log(`Script ${idx + 1} (${s[1].length} chars):`, s[1].substring(0, 300));
    });
}

main();
