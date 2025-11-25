
const puppeteer = require('puppeteer');

const TARGET_JOB = '렌';
const BASE_URL = 'https://maple.gg/jobs';
const QUERY_PARAMS = 'level=280%2B&power=50m%2B';

async function crawlJobData(jobName) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080 });

    const encodedJobName = encodeURIComponent(jobName);
    const url = `${BASE_URL}/${encodedJobName}/equipment?${QUERY_PARAMS}`;

    console.log(`Navigating to ${url}...`);

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await new Promise(r => setTimeout(r, 5000));
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await new Promise(r => setTimeout(r, 3000));

        const data = await page.evaluate(() => {
            const result = {
                hatPotentials: []
            };

            const bTags = Array.from(document.querySelectorAll('b'));
            const coolTitle = bTags.find(el => el.textContent.includes('쿨타임 감소 모자'));

            if (coolTitle) {
                const parent = coolTitle.parentElement;
                const grandParent = parent ? parent.parentElement : null;
                const container = grandParent ? grandParent.parentElement : null;

                if (container) {
                    const table = container.querySelector('table');
                    if (table) {
                        const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
                        const values = Array.from(table.querySelectorAll('tbody td')).map(td => td.textContent.trim());

                        headers.forEach((header, index) => {
                            const val = values[index];
                            if (val && val !== '-' && val !== '0%') {
                                result.hatPotentials.push(`${header}: ${val}`);
                            }
                        });
                    }
                }
            }
            return result;
        });

        console.log(`[${jobName}] Data fetched:`, JSON.stringify(data));
        await browser.close();

    } catch (error) {
        console.error(`Error fetching ${jobName}:`, error);
        await browser.close();
    }
}

crawlJobData(TARGET_JOB);
