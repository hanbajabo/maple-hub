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
    console.log("Fetching https://mitemprice.kr/api.php...");
    const jsonStr = await fetchUrl('https://mitemprice.kr/api.php');
    console.log("Response size:", jsonStr.length, "bytes");
    
    try {
        const data = JSON.parse(jsonStr);
        console.log("Success:", data.success);
        console.log("Items count:", data.data ? data.data.length : 0);
        
        if (data.data && data.data.length > 0) {
            console.log("\nSample item 0:", {
                name: data.data[0].name,
                server: data.data[0].server,
                historyLength: data.data[0].priceHistory ? data.data[0].priceHistory.length : 0,
                firstHistory: data.data[0].priceHistory ? data.data[0].priceHistory[0] : null,
                lastHistory: data.data[0].priceHistory ? data.data[0].priceHistory[data.data[0].priceHistory.length - 1] : null,
            });
            
            // Save raw data to scratch
            fs.writeFileSync('scratch/mitemprice_full_api.json', JSON.stringify(data, null, 2));
            console.log("Saved full API data to scratch/mitemprice_full_api.json!");
        }
    } catch (e) {
        console.error("JSON parse error:", e.message);
        console.log("First 500 chars:", jsonStr.substring(0, 500));
    }
}

main();
