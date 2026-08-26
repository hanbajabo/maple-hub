const https = require('https');
const fs = require('fs');

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
    // Check itempricetab.php for '거대한 공포'
    const html = await fetchUrl('https://mitemprice.kr/itempricetab.php?name=' + encodeURIComponent('거대한 공포') + '&server=scania');
    
    // Parse table rows: <tr><td>2026-08-26</td><td>3,875,000,000</td>...</tr>
    const rowRegex = /<tr[^>]*>\s*<td[^>]*>(\d{4}-\d{2}-\d{2})<\/td>\s*<td[^>]*>([^<]+)<\/td>/gi;
    let match;
    const history = [];
    while ((match = rowRegex.exec(html)) !== null) {
        history.push({ date: match[1], price: match[2].trim() });
    }
    console.log(`Found ${history.length} price rows for 거대한 공포:`);
    console.log("Oldest in page:", history[history.length - 1]);
    console.log("Newest in page:", history[0]);
    console.log("Sample 4/16-4/20:", history.filter(h => h.date >= '2026-04-15' && h.date <= '2026-04-20'));
}

main();
