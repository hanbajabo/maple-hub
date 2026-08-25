const https = require('https');
const fs = require('fs');

async function fetchPage(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            }
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchPage(res.headers.location).then(resolve).catch(reject);
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data }));
        });
        req.on('error', reject);
    });
}

async function main() {
    const url = 'https://namu.wiki/w/%EC%A0%9C%EB%A5%B8%20%EB%8B%A4%EB%A5%B4%EB%AA%A8%EC%96%B4/%EC%9E%91%EC%A4%91%20%ED%96%89%EC%A0%81';
    const res = await fetchPage(url);
    fs.writeFileSync('scratch/page_sample.html', res.data);
    
    // search for img tags or data-src or src or media links
    const imgs = res.data.match(/<img[^>]+>/g) || [];
    console.log(`Found ${imgs.length} img tags`);
    for (let i = 0; i < Math.min(imgs.length, 15); i++) {
        console.log(imgs[i]);
    }
}

main();
