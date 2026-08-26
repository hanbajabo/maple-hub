const https = require('https');

function fetchCharacter(name) {
    const encoded = encodeURIComponent(name);
    return new Promise((resolve, reject) => {
        const req = https.get(`https://maplescouter.com/ko/result?name=${encoded}&preset=00000`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://maplescouter.com/ko',
            }
        }, (res) => {
            const chunks = [];
            res.on('data', c => chunks.push(c));
            res.on('end', () => {
                const html = Buffer.concat(chunks).toString('utf8');
                
                // Parse Next.js RSC chunks
                const regex = /self\.__next_f\.push\(\[1,"(.*)"\]\)/g;
                let payload = '';
                let match;
                while ((match = regex.exec(html)) !== null) {
                    try {
                        payload += JSON.parse(`"${match[1]}"`);
                    } catch (e) {
                        payload += match[1];
                    }
                }
                
                // Let's search for character name and stats
                resolve({ html, payload });
            });
        });
        req.on('error', reject);
    });
}

async function run() {
    console.log('Testing character extraction for 쯔단 and 아델...');
    const zzudan = await fetchCharacter('쯔단');
    const adel = await fetchCharacter('아델');
    
    console.log('Zzudan payload len:', zzudan.payload.length);
    console.log('Adel payload len:', adel.payload.length);
}

run().catch(console.error);
