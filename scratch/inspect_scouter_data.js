const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://maplescouter.com/ko',
            }
        }, (res) => {
            const chunks = [];
            res.on('data', c => chunks.push(c));
            res.on('end', () => {
                resolve(Buffer.concat(chunks).toString('utf8'));
            });
        });
        req.on('error', reject);
    });
}

async function run() {
    const html = await fetchUrl('https://maplescouter.com/ko/result?name=%EC%9C%BC%EB%82%AD%EB%8B%A4');
    fs.writeFileSync('scratch/scouter_result.html', html, 'utf8');

    // Search for keywords like 환산, stat, score, hexa, boss
    const nextDataMatches = html.match(/self\.__next_f\.push\(\[1,"(.*?)"\]\)/g) || [];
    console.log('Next.js payload chunks count:', nextDataMatches.length);
    
    // Look for JSON or stat values
    if (html.includes('헥사')) console.log('Contains 헥사');
    if (html.includes('환산')) console.log('Contains 환산');
    if (html.includes('combat_power') || html.includes('final_stat')) console.log('Contains combat/stat');
}

run().catch(console.error);
