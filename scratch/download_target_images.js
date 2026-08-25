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
                return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
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
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    // Key mappings to find
    const downloads = [
        { name: 'darmoor-portrait.png', altMatch: (a) => a === '제른 다르모어' },
        { name: 'darmoor-childhood.png', altMatch: (a) => a.includes('어린 시절') },
        { name: 'darmoor-asha.png', altMatch: (a) => a.includes('제른아샤') },
        { name: 'darmoor-speech.png', altMatch: (a) => a.includes('연설') },
        { name: 'darmoor-ancient-war.png', altMatch: (a) => a.includes('고대의전쟁') || a.includes('고대') },
        { name: 'edvard.png', altMatch: (a) => a.includes('에드바르') },
        { name: 'veronica.png', altMatch: (a) => a.includes('베로니카') },
        { name: 'darmoor-proposal.png', altMatch: (a) => a.includes('제안하는') },
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
