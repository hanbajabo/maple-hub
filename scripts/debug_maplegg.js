
const puppeteer = require('puppeteer');
const fs = require('fs');

const TARGET_JOB = '바이퍼';
const BASE_URL = 'https://maple.gg/jobs';
const QUERY_PARAMS = 'level=280%2B&power=50m%2B';

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

        const debugHTML = await page.evaluate(() => {
            // Find <b>쿨타임 감소 모자</b>
            const bTags = Array.from(document.querySelectorAll('b'));
            const coolTitle = bTags.find(el => el.textContent.includes('쿨타임 감소 모자'));

            let htmlDump = "Not Found";
            if (coolTitle) {
                // Get parent and grandparent HTML
                const parent = coolTitle.parentElement;
                const grandParent = parent ? parent.parentElement : null;
                const greatGrandParent = grandParent ? grandParent.parentElement : null;

                htmlDump = {
                    self: coolTitle.outerHTML,
                    parent: parent ? parent.outerHTML : "null",
                    grandParent: grandParent ? grandParent.outerHTML : "null",
                    greatGrandParent: greatGrandParent ? greatGrandParent.outerHTML : "null"
                };
            }

            return htmlDump;
        });

        console.log(`Debug HTML:`, JSON.stringify(debugHTML, null, 2));
        await browser.close();

    } catch (error) {
        console.error(`Error:`, error);
        await browser.close();
    }
}

debugJobData();
