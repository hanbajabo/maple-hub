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
    try {
        const encodedUrl = 'https://mitemprice.kr/itempricetab.php?name=' + encodeURIComponent('거대한 공포') + '&server=scania';
        const html = await fetchUrl(encodedUrl);
        console.log("HTML length:", html.length);
        
        // Check for chart data or price data arrays in script
        const chartDataMatch = html.match(/const\s+priceData\s*=\s*[\s\S]*?;/i) || html.match(/labels:\s*\[[\s\S]*?\]/i) || html.match(/data:\s*\[[\s\S]*?\]/i);
        if (chartDataMatch) {
            console.log("Chart data match:\n", chartDataMatch[0].substring(0, 400));
        } else {
            console.log("Searching for dates in HTML...");
            const dates = [...html.matchAll(/2026-\d{2}-\d{2}/g)];
            console.log("Found dates count:", dates.length, "Unique:", [...new Set(dates.map(d => d[0]))].slice(-10));
        }
    } catch (e) {
        console.error(e.message);
    }
}

main();
