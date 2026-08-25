const https = require('https');
const fs = require('fs');
const path = require('path');

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

function downloadFile(url, destPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://namu.wiki/',
            }
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to download: status ${res.statusCode}`));
            }
            res.pipe(file);
            file.on('finish', () => {
                file.close(() => resolve());
            });
        });
        req.on('error', (err) => {
            fs.unlink(destPath, () => {});
            reject(err);
        });
    });
}

async function main() {
    const targetDir = path.join(__dirname, '../public/images/blog/darmoor');
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const pages = [
        'https://namu.wiki/w/%EC%A0%9C%EB%A5%B8%20%EB%8B%A4%EB%A5%B4%EB%AA%A8%EC%96%B4',
        'https://namu.wiki/w/%EC%A0%9C%EB%A5%B8%20%EB%8B%A4%EB%A5%B4%EB%AA%A8%EC%96%B4/%EC%9E%91%EC%A4%91%20%ED%96%89%EC%A0%81'
    ];

    const imageMap = [];

    for (const p of pages) {
        console.log(`Analyzing ${p}...`);
        const res = await fetchPage(p);
        const imgRegex = /<img[^>]+data-src=['"]([^'"]+)['"][^>]*alt=['"]([^'"]*)['"][^>]*>/g;
        let match;
        while ((match = imgRegex.exec(res.data)) !== null) {
            const rawUrl = match[1];
            const alt = match[2];
            if (rawUrl.includes('i.namu.wiki')) {
                const fullUrl = rawUrl.startsWith('//') ? 'https:' + rawUrl : rawUrl;
                imageMap.push({ fullUrl, alt });
            }
        }
    }

    console.log(`Found total ${imageMap.length} candidates.`);
    for (const item of imageMap) {
        console.log(`- ALT: ${item.alt} | URL: ${item.fullUrl.substring(0, 60)}...`);
    }

    fs.writeFileSync('scratch/image_candidates.json', JSON.stringify(imageMap, null, 2));
}

main();
