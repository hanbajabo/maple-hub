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
    const encoded = encodeURIComponent('한자');
    const resultHtml = await fetchUrl(`https://maplescouter.com/ko/result?name=${encoded}&preset=00000`);
    fs.writeFileSync('scratch/hanja_result.html', resultHtml, 'utf8');

    // Check if character exists or if there are specific strings
    console.log('--- Search Keywords in Result ---');
    const regex = /"([0-9,]+(?:만|억)?)"/g;
    
    // Extract text snippets
    const textMatches = resultHtml.match(/<[^>]+>([^<]+)<\/[^>]+>/g) || [];
    console.log('Total text nodes:', textMatches.length);
    const interesting = textMatches
        .map(t => t.replace(/<[^>]+>/g, '').trim())
        .filter(t => t.length > 0 && (t.includes('환산') || t.includes('전투력') || t.includes('레벨') || t.includes('직업') || t.includes('보스') || t.includes('HEXA')));
    
    console.log('Sample text nodes:', interesting.slice(0, 20));
}

run().catch(console.error);
