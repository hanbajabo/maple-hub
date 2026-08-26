const https = require('https');
const fs = require('fs');

function fetchUrl(url, headers = {}) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://maplescouter.com/ko',
                ...headers,
            }
        }, (res) => {
            const chunks = [];
            res.on('data', c => chunks.push(c));
            res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        });
        req.on('error', reject);
    });
}

async function run() {
    console.log('Fetching total ranking page...');
    const rankHtml = await fetchUrl('https://maplescouter.com/ko/total-ranking');
    fs.writeFileSync('scratch/ranking.html', rankHtml, 'utf8');

    // Search for 146,668 or 아델 in ranking html
    if (rankHtml.includes('146,668') || rankHtml.includes('146668')) {
        console.log('Found 146,668 in ranking HTML!');
    }
    if (rankHtml.includes('아델')) {
        console.log('Found 아델 in ranking HTML!');
    }

    // Let's also check result page for 아델
    const encoded = encodeURIComponent('아델');
    const resultHtml = await fetchUrl(`https://maplescouter.com/ko/result?name=${encoded}&preset=00000`);
    fs.writeFileSync('scratch/adel_result.html', resultHtml, 'utf8');

    if (resultHtml.includes('146,668') || resultHtml.includes('146668')) {
        console.log('Found 146,668 in adel_result.html!');
    }
}

run().catch(console.error);
