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
    
    const downloads = [
        {
            filename: 'darmoor-idea.webp',
            url: 'https://i.namu.wiki/i/fW8jnKZIW3WDwIgzfdAJQO8mXoRlZzMhZQqajlSWeW0DsY6lwAQUCiiU2BfoXzjOkiIY_mk5dYza1hvR8fk5dGQuuP9r-QCeYJsUUKLrTRZ8pgItyge0CFM1JYwRVlDE11lf40sQQreC-k-r2W3Tnw.webp'
        },
        {
            filename: 'darmoor-seren.webp',
            url: 'https://i.namu.wiki/i/qp0epP_nGuGdF8o2yQDCTBULvnJIwy8Fq03M3GWfS7E-SaTf-TQykyeXk79NQc3SPdaF_WmF31FZFeHWVPx19Q.gif'
        },
        {
            filename: 'darmoor-anime.webp',
            url: 'https://i.namu.wiki/i/0Qh27dRsFLdz5QZPSD23X9s92PJNiKE5P5LONlINXNRiPtGvHEg8Mc1pERZzSun45spTv7HyiMh5l07-qt1FiQ.gif'
        }
    ];

    for (const d of downloads) {
        const dest = path.join(targetDir, d.filename);
        try {
            console.log(`Downloading ${d.filename}...`);
            await downloadFile(d.url, dest);
            console.log(`Saved ${d.filename} (${fs.statSync(dest).size} bytes)`);
        } catch (e) {
            console.error(`Error downloading ${d.filename}:`, e.message);
        }
    }
}

main();
