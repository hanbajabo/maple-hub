const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');

const TARGET_URL = 'https://maplestory.nexon.com/Guide/N23Job';
const SAVE_DIR = path.join(__dirname, '../public/images/jobs');

// Ensure save directory exists
if (!fs.existsSync(SAVE_DIR)) {
    fs.mkdirSync(SAVE_DIR, { recursive: true });
}

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
};

(async () => {
    console.log('🚀 Launching browser...');
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    console.log(`🌐 Navigating to ${TARGET_URL}...`);
    await page.goto(TARGET_URL, { waitUntil: 'networkidle2' });

    console.log('🔍 Extracting job data...');
    const jobs = await page.evaluate(() => {
        // Select all anchor tags that link to job details
        const jobLinks = document.querySelectorAll("a[href^='/Guide/N23Job/View/']");
        const data = [];

        jobLinks.forEach(el => {
            // Try to find name in span em (or just span text)
            const nameEl = el.querySelector('span em') || el.querySelector('span');
            // Try to find image in img tag
            const imgEl = el.querySelector('img');

            if (nameEl && imgEl) {
                let name = nameEl.innerText.trim();
                // Remove "NEW" or other badges if present
                name = name.replace(/NEW/g, '').trim();

                const imageUrl = imgEl.src;
                // Filter out tiny icons or irrelevant images if necessary
                if (imageUrl && name) {
                    data.push({ name, imageUrl });
                }
            }
        });

        return data;
    });

    console.log(`✅ Found ${jobs.length} jobs.`);

    for (const job of jobs) {
        // Clean filename
        const safeName = job.name.replace(/[\/\?<>\\:\*\|":]/g, '_');
        const filename = `${safeName}.png`;
        const filepath = path.join(SAVE_DIR, filename);

        try {
            console.log(`⬇️ Downloading image for ${job.name}...`);
            await downloadImage(job.imageUrl, filepath);
        } catch (err) {
            console.error(`❌ Failed to download image for ${job.name}:`, err.message);
        }
    }

    console.log('🎉 All done!');
    await browser.close();
})();
