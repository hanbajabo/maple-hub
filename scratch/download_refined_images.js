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
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const items = [
        {
            filename: 'darmoor-childhood.webp',
            url: 'https://i.namu.wiki/i/gfajWfTLA-pPMRtgnorz9uYpDr-cjh0UAWhT9QChE8oGjMC57NCHLrQK78EuDXwIs4Ky9Q8N8iLNcOY6OqaCKoT4ZWEy8M4yBOvgsS8-Pis5GJnFHjpJbV7QW6D4vtJl_3QlWcJUzu68IHYTIIv9Vw.webp'
        },
        {
            filename: 'aaron-gardener.webp',
            url: 'https://i.namu.wiki/i/vroj0VCYFwrjhUYYGZqtFwaKEXI7HQQNbIakfeB10uf_iPFnxlUWx7opqz1WdJDNNTvuJVlKbFL5YAI6GuHvPwMCVXqOrYEnm7ybXY2iF9ZXL_jxbQxQjMp1ya9JFkJ4Hw2ys0phlhzNVu3t_kuVnA.webp'
        },
        {
            filename: 'darmoor-philosophy.webp',
            url: 'https://i.namu.wiki/i/_8_crJGWPWcggAg5GROSBozTrwFAv-KvK5Um2AqKunOlBW920NYtUQZt5QT6eyZyzWn55CDzMB4u4B4HwRKSXU6iz1q6TNucj1O4ZWz_6yzqUKwcjt_tL2gNUwk8hSqSf_CWXShamxJBdb1YbRryQg.webp'
        },
        {
            filename: 'darmoor-speech.webp',
            url: 'https://i.namu.wiki/i/wm4gyKoAOjMAEoAPNigOj-zJmI_cTQ8o_GZnLiEwKm1NAx8kmC00KZJhWO1Kdr75wYz-dPbzVDQ6xyehTjuCiD_fgSqlKuZC2XgnmMnvRVo84JFnAtN2lTinnksxcjk3J7T8v1zDhi-k5ro1Cexgkg.webp'
        },
        {
            filename: 'darmoor-proposal.webp',
            url: 'https://i.namu.wiki/i/bPANVKsBEaBrvJqSos7OAIT6QLwZHanSSor42nroBE5FCSVjh4DEls6mySocTtoDD3Dj6glQS6-pZVWcAHUO8n-7ozZOY9RClJ_-rZfZ1xhhWGayIRXhQ_RP3riL6yBp1EmcCZg0PR8jxLgw0-1ueA.webp'
        },
        {
            filename: 'darmoor-silhouette.webp',
            url: 'https://i.namu.wiki/i/YWdVxAZcNqS5Bre7zOnWPsx-E8fkjJHd20mUgtzeN1aW1WE5vkXqvxhY1XHXAj_6EBmuThJiSRUi-DKzpvakmwobQtgqf-AAzb4hi_m6H2IDBexNKCtV20z_yiX0m1jOl-SiHxlnDkTciEzcs7z2nA.webp'
        },
        {
            filename: 'darmoor-ancient-war.webp',
            url: 'https://i.namu.wiki/i/2AveJdl7ddoCQ8bmXKpsXRciFkU7JTJ2Kz8jDFg9mAfbl-0BU63XRO79oLGiiRI22O3cpi9R2DXPv7iIKyLHlKtswWyKQ6fKzthnNtSRbnadKDczj1vt3hiCuPyP1yb6oNC2Uoju0pCHhhmuoXYn6w.webp'
        }
    ];

    for (const item of items) {
        const dest = path.join(targetDir, item.filename);
        try {
            console.log(`Downloading ${item.filename}...`);
            await downloadFile(item.url, dest);
            console.log(`Successfully saved ${item.filename} (${fs.statSync(dest).size} bytes)`);
        } catch (e) {
            console.error(`Failed ${item.filename}:`, e.message);
        }
    }
}

main();
