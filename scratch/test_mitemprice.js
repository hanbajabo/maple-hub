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
        const html = await fetchUrl('https://mitemprice.kr/');
        console.log("mitemprice.kr HTML length:", html.length);
        console.log("Sample:\n", html.substring(0, 1000));
        // Check for scripts, data, or apis
        const scripts = [...html.matchAll(/<script[^>]*src="([^"]+)"[^>]*>/gi)];
        console.log("Scripts:", scripts.map(s => s[1]));
    } catch (e) {
        console.error(e.message);
    }
}

main();
