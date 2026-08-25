const https = require('https');
const fs = require('fs');
const path = require('path');

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
                return reject(new Error(`Failed ${url}: status ${res.statusCode}`));
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
    const targetDir = path.join(__dirname, '../public/images/blog/darmoor');
    
    // We want:
    // 1. 제안을 거부하는 고대신
    // 2. 고대 우든레프의 신 봉인
    // 3. 매그너스 일러스트/컷씬
    // 4. 헬리시움 침공/선대 카이저
    // 5. 힐라와 매그너스 (메이플 월드 파견)
    // 6. 크로니카/시간의 초월자
    
    const pages = [
        'https://namu.wiki/w/%EB%A7%A4%EA%B7%B8%EB%84%88%EC%8A%A4(%EB%A9%94%EC%9D%B4%ED%94%8C%EC%8A%A4%ED%86%A0%EB%A6%AC)',
        'https://namu.wiki/w/%EC%A0%9C%EB%A5%B8%20%EB%8B%A4%EB%A5%B4%EB%AA%A8%EC%96%B4/%EC%9E%91%EC%A4%91%20%ED%96%89%EC%A0%81',
        'https://namu.wiki/w/%ED%81%AC%EB%A1%9C%EB%8B%88%EC%8 human%EC%B9%B4(%EB%A9%94%EC%9D%B4%ED%94%8C%EC%8A%A4%ED%86%A0%EB%A6%AC)',
        'https://namu.wiki/w/%ED%97%AC%EB%A6%AC%EC%8B%9C%EC%9B%80(%EB%A9%94%EC%9D%B4%ED%94%8C%EC%8A%A4%ED%86%A0%EB%A6%AC)'
    ];

    const targetDownloads = [
        {
            filename: 'wooden-lef-god-refusal.webp',
            url: 'https://i.namu.wiki/i/1YADx3hWf5XaUljR8kwbw7DPCbZotO1yLphZsnEAQ5mB_7XT4UBEZNbj8cUzWT1aZnw5_EF9hnAP6tsi4ZLXDros7cjypybo5AWZlo-j_0n1jIwc28RWK7hiJQ9qIBa3AeqTWt1JudsYJ8Lf-VnE-w.webp'
        },
        {
            filename: 'wooden-lef-god-seal.webp',
            url: 'https://i.namu.wiki/i/2AveJdl7ddoCQ8bmXKpsXRciFkU7JTJ2Kz8jDFg9mAfbl-0BU63XRO79oLGiiRI22O3cpi9R2DXPv7iIKyLHlKtswWyKQ6fKzthnNtSRbnadKDczj1vt3hiCuPyP1yb6oNC2Uoju0pCHhhmuoXYn6w.webp'
        },
        {
            filename: 'magnus-hilla.webp',
            url: 'https://i.namu.wiki/i/aLUEC-U5bmvjK5woS4_vk86MVA7yuC8O39gZuSYo_8v4bS454-g3H7Zg_vE3q2n536p9VfS41Fz43.webp'
        }
    ];

    for (const td of targetDownloads) {
        const dest = path.join(targetDir, td.filename);
        try {
            console.log(`Downloading ${td.filename}...`);
            await downloadFile(td.url, dest);
            console.log(`Saved ${td.filename} (${fs.statSync(dest).size} bytes)`);
        } catch (e) {
            console.error(`Error downloading ${td.filename}:`, e.message);
        }
    }

    // Also fetch Magnus page to find Magnus standing and Kaiser vs Magnus cutscenes
    console.log("Searching Magnus images...");
    try {
        const magRes = await fetchPage('https://namu.wiki/w/%EB%A7%A4%EA%B7%B8%EB%84%88%EC%8A%A4(%EB%A9%94%EC%9D%B4%ED%94%8C%EC%8A%A4%ED%86%A0%EB%A6%AC)');
        const imgRegex = /<img[^>]+data-src=['"]([^'"]+)['"][^>]*alt=['"]([^'"]*)['"][^>]*>/g;
        let match;
        const magCandidates = [];
        while ((match = imgRegex.exec(magRes.data)) !== null) {
            const rawUrl = match[1];
            const alt = match[2];
            if (rawUrl.includes('i.namu.wiki')) {
                const fullUrl = rawUrl.startsWith('//') ? 'https:' + rawUrl : rawUrl;
                magCandidates.push({ fullUrl, alt });
            }
        }
        console.log(`Found ${magCandidates.length} images on Magnus page:`);
        for (const c of magCandidates) {
            console.log(`- ${c.alt} | ${c.fullUrl.substring(0, 70)}`);
        }
        fs.writeFileSync('scratch/magnus_candidates.json', JSON.stringify(magCandidates, null, 2));
    } catch (e) {
        console.error(e.message);
    }
}

main();
