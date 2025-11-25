
const puppeteer = require('puppeteer');

const TARGET_JOB = '바이퍼';
const BASE_URL = 'https://maple.gg/jobs';
const QUERY_PARAMS = 'level=280%2B&power=400m%2B';

async function debugJobData() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080 });

    const encodedJobName = encodeURIComponent(TARGET_JOB);
    const url = `${BASE_URL}/${encodedJobName}/equipment?${QUERY_PARAMS}`;

    console.log(`Navigating to ${url}...`);

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await new Promise(r => setTimeout(r, 5000));
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await new Promise(r => setTimeout(r, 3000));

        const debugInfo = await page.evaluate(() => {
            const bTags = Array.from(document.querySelectorAll('b'));
            const seedTitle = bTags.find(el => el.textContent.includes('시드링'));

            if (!seedTitle) return "Seed Ring Title Not Found";

            // Traverse up to find container
            let container = seedTitle.parentElement;
            // Go up 3 levels to be safe (Title -> Header -> Card -> Container)
            const grandParent = container ? container.parentElement : null;
            const greatGrandParent = grandParent ? grandParent.parentElement : null;

            // Search for text in greatGrandParent
            if (greatGrandParent) {
                const allText = greatGrandParent.innerText;
                const lines = allText.split('\n');
                const ringLines = lines.filter(line => line.includes('링'));

                return {
                    foundContainer: true,
                    containerHTML: greatGrandParent.outerHTML.substring(0, 200) + "...",
                    ringLines: ringLines
                };
            }

            return "Container Not Found";
        });

        console.log(`Debug Info:`, JSON.stringify(debugInfo, null, 2));
        await browser.close();

    } catch (error) {
        console.error(`Error:`, error);
        await browser.close();
    }
}

debugJobData();
