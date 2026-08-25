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

async function main() {
    const candidates = JSON.parse(fs.readFileSync('scratch/image_candidates.json', 'utf8'));
    const targetDir = path.join(__dirname, '../public/images/blog/darmoor');

    const downloads = [
        { name: 'kaling.webp', altMatch: (a) => a.includes('카링 스탠딩') || a.includes('혼돈카링') },
        { name: 'apostles-all.webp', altMatch: (a) => a.includes('사도전체') || a.includes('사도 울티마') },
        { name: 'tower-of-life.webp', altMatch: (a) => a.includes('생명의탑') || a.includes('울티마폴리스') },
        { name: 'mission-ultima-chapter3.webp', altMatch: (a) => a.includes('3챕 009') || a.includes('3챕 008') },
        { name: 'baldrix.webp', altMatch: (a) => a.includes('발드릭스 스탠딩') },
    ];

    for (const d of downloads) {
        const item = candidates.find(c => d.altMatch(c.alt));
        if (item) {
            console.log(`Downloading ${d.name} from ${item.fullUrl}...`);
            const dest = path.join(targetDir, d.name);
            try {
                await downloadFile(item.fullUrl, dest);
                console.log(`Saved ${d.name} (${fs.statSync(dest).size} bytes)`);
            } catch (err) {
                console.error(`Error downloading ${d.name}:`, err.message);
            }
        } else {
            console.warn(`Could not find candidate for ${d.name}`);
        }
    }
}

main();
