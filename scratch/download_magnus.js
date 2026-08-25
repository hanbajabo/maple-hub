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
    const targetDir = path.join(__dirname, '../public/images/blog/darmoor');
    
    const items = [
        {
            filename: 'magnus-portrait.webp',
            url: 'https://i.namu.wiki/i/CQrTxkBuaImp-ZUdPMJRaHwHlRRb8YiNRzZVQAqSr2D0enjH7LpDDjE6eGI47vOTJtxzAYrLdi1WXoPlDt1g2KHN0d42QngBfDz-elBpaXJuY5EdE559nMcXUKTEbd0Qte8OMpMAe0XE0-7lBzBAfw.webp'
        },
        {
            filename: 'chronica-dimension.webp',
            url: 'https://i.namu.wiki/i/YWdVxAZcNqS5Bre7zOnWPsx-E8fkjJHd20mUgtzeN1aW1WE5vkXqvxhY1XHXAj_6EBmuThJiSRUi-DKzpvakmwobQtgqf-AAzb4hi_m6H2IDBexNKCtV20z_yiX0m1jOl-SiHxlnDkTciEzcs7z2nA.webp'
        }
    ];

    for (const item of items) {
        const dest = path.join(targetDir, item.filename);
        try {
            console.log(`Downloading ${item.filename}...`);
            await downloadFile(item.url, dest);
            console.log(`Saved ${item.filename} (${fs.statSync(dest).size} bytes)`);
        } catch (e) {
            console.error(`Failed ${item.filename}:`, e.message);
        }
    }
}

main();
