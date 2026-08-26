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
    const urls = [
        'https://mitemprice.kr/itempricetab.php?name=' + encodeURIComponent('거대한 공포') + '&server=scania&limit=300',
        'https://mitemprice.kr/itempricetab.php?name=' + encodeURIComponent('거대한 공포') + '&server=scania&days=300',
        'https://mitemprice.kr/itempricetab.php?name=' + encodeURIComponent('거대한 공포') + '&server=scania&page=2',
        'https://mitemprice.kr/api.php?action=get_item_prices&name=' + encodeURIComponent('거대한 공포') + '&server=scania',
        'https://mitemprice.kr/api.php?action=get_prices&item=' + encodeURIComponent('거대한 공포') + '&server=scania',
    ];

    for (const u of urls) {
        try {
            const res = await fetchUrl(u);
            const dates = [...res.matchAll(/2026-\d{2}-\d{2}/g)];
            console.log(`URL: ${u}\n  Found dates: ${dates.length} (${dates[dates.length - 1]?.[0]} ~ ${dates[0]?.[0]})`);
            if (u.includes('api.php') && res.length < 500) {
                console.log("  API response:", res);
            }
        } catch (e) {
            console.error(e.message);
        }
    }
}

main();
