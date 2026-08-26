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
    const js = await fetchUrl('https://mitemprice.kr/scripts/script.js?v=V015');
    const idx = js.indexOf('detailSearchInput');
    console.log("IndexOf detailSearchInput:", idx);
    if (idx !== -1) {
        console.log(js.substring(idx - 100, idx + 1000));
    } else {
        // search in itempricetab.php scripts
        const html = await fetchUrl('https://mitemprice.kr/itempricetab.php?name=' + encodeURIComponent('거대한 공포') + '&server=scania');
        const scriptIdx = html.indexOf('detailSearchInput');
        console.log("IndexOf detailSearchInput in html:", scriptIdx);
        if (scriptIdx !== -1) {
            console.log(html.substring(scriptIdx - 100, scriptIdx + 1500));
        }
    }
}

main();
