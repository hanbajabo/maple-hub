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
    const urls = [
        'https://namu.wiki/w/%EC%95%84%EC%83%A4(%EB%A9%94%EC%9D%B4%ED%94%8C%EC%8A%A4%ED%86%A0%EB%A6%AC)',
        'https://namu.wiki/w/%EC%A0%9C%EB%A5%B8%20%EB%8B%A4%EB%A5%B4%EB%AA%A8%EC%96%B4/%EC%9E%91%EC%A4%91%20%ED%96%89%EC%A0%81'
    ];

    for (const u of urls) {
        console.log(`Checking ${u}...`);
        const res = await fetchPage(u);
        const imgRegex = /<img[^>]+data-src=['"]([^'"]+)['"][^>]*alt=['"]([^'"]*)['"][^>]*>/g;
        let match;
        while ((match = imgRegex.exec(res.data)) !== null) {
            const rawUrl = match[1];
            const alt = match[2];
            if (rawUrl.includes('i.namu.wiki') && (alt.includes('아샤') || alt.includes('Asha') || alt.includes('세피로트'))) {
                console.log(`Found: ALT="${alt}" | URL=${rawUrl}`);
            }
        }
    }
}

main();
