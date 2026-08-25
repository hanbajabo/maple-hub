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
            filename: 'asha-standing.webp',
            url: 'https://i.namu.wiki/i/VbD0bpClKYn065Q9M2f_JRqIeWNHgZeT9hkAgycRne4rdwDT4jXxSHenMXSrLeLuVg5TARZhjQeuPc0uyx_7ELGf3U1Cd0neHfjGODbB40w15XuSsOj-QZLwvAeHIujB9A8fJ0GxCh22dy2L9jXJJw.webp'
        },
        {
            filename: 'asha-profile.webp',
            url: 'https://i.namu.wiki/i/ZWnb2ZrU_acKJQR8fTE85wTyrwUGk4fMcGCjk7epMG2rSJwFS5bbm_HBPUhj6iJxovsoiMMfEJCfHyUFxzl8iwXVW-FKQNv009lAfC5bTMWKuelolNFGrlnzlLW2b-O6ebUTyNg1MFClHlmdf2540w.webp'
        },
        {
            filename: 'asha-anime.webp',
            url: 'https://i.namu.wiki/i/1j7lt1dzOWofcOIQNsRn6DJDNbipzFK2SgS68GkimIS4l9ocRURWlK0_8etedend2IhUxUrWWLUOYdLMyvnkGOKkA4aS1HNGTpETDstv7rOZsSdeOlDEh8QiAL7SKMJwA87-rVbf9XfnMUuwNxpdew.webp'
        }
    ];

    for (const d of downloads) {
        const dest = path.join(targetDir, d.filename);
        try {
            console.log(`Downloading ${d.filename}...`);
            await downloadFile(d.url, dest);
            console.log(`Saved ${d.filename} (${fs.statSync(dest).size} bytes)`);
        } catch (e) {
            console.error(`Failed ${d.filename}:`, e.message);
        }
    }
}

main();
