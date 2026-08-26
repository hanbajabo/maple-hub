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
    console.log('Fetching info page...');
    const infoHtml = await fetchUrl(`https://maplescouter.com/ko/info?name=${encoded}&preset=00000`);
    fs.writeFileSync('scratch/hanja_info.html', infoHtml, 'utf8');

    console.log('Fetching result page...');
    const resultHtml = await fetchUrl(`https://maplescouter.com/ko/result?name=${encoded}&preset=00000`);
    fs.writeFileSync('scratch/hanja_result.html', resultHtml, 'utf8');

    // Extract RSC chunks from resultHtml
    const regex = /self\.__next_f\.push\(\[1,"(.*)"\]\)/g;
    let payload = '';
    let match;
    while ((match = regex.exec(resultHtml)) !== null) {
        try {
            payload += JSON.parse(`"${match[1]}"`);
        } catch (e) {
            payload += match[1];
        }
    }
    fs.writeFileSync('scratch/hanja_result_payload.txt', payload, 'utf8');

    // Also extract RSC chunks from infoHtml
    let infoPayload = '';
    while ((match = regex.exec(infoHtml)) !== null) {
        try {
            infoPayload += JSON.parse(`"${match[1]}"`);
        } catch (e) {
            infoPayload += match[1];
        }
    }
    fs.writeFileSync('scratch/hanja_info_payload.txt', infoPayload, 'utf8');

    console.log('Saved payloads. Payload length:', payload.length, infoPayload.length);
}

run().catch(console.error);
