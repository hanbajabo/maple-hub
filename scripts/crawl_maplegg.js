
const puppeteer = require('puppeteer');
const fs = require('fs');

const TARGET_JOBS = [
    '바이퍼', '비숍', '나이트로드', '소울마스터', '윈드브레이커'
];

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
                hatPotentials: [],
                seedRings: []
            };

            const bTags = Array.from(document.querySelectorAll('b'));

            // 1. Hat Potentials (Cooldown)
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

            // 2. Seed Rings
            // Find <b>시드링</b>
            const seedTitle = bTags.find(el => el.textContent.includes('시드링'));

            if (seedTitle) {
                // Structure: Title -> Parent -> GrandParent (Container) -> List
                let container = seedTitle.parentElement;
                // Traverse up a bit to find the card body
                for (let i = 0; i < 4; i++) {
                    if (container) container = container.parentElement;
                }

                if (container) {
                    // Look for elements that contain "링" and "%"
                    const text = container.innerText;
                    const lines = text.split('\n');

                    lines.forEach(line => {
                        const cleanLine = line.trim();
                        // Pattern: "Ring Name Level %" e.g., "리스트레인트 링 4레벨 55%"
                        if (cleanLine.includes('링') && cleanLine.includes('%')) {
                            result.seedRings.push(cleanLine);
                        }
                    });

                    // Fallback: Look for specific list items if text split is too messy
                    const mediaItems = Array.from(container.querySelectorAll('div, li'));
                    mediaItems.forEach(item => {
                        const text = item.innerText.replace(/\n/g, ' ').trim();
                        if (text.includes('링') && text.includes('%') && text.length < 50) {
                            if (!result.seedRings.some(r => r === text)) {
                                result.seedRings.push(text);
                            }
                        }
                    });
                }
            }

            // Deduplicate Seed Rings
            result.seedRings = [...new Set(result.seedRings)];

            return result;
        });

        console.log(`[${jobName}] Data fetched:`, JSON.stringify(data));
        await browser.close();
        return { job: jobName, data };

    } catch (error) {
        console.error(`Error fetching ${jobName}:`, error);
        await browser.close();
        return { job: jobName, error: error.message };
    }
}

async function main() {
    const results = [];
    console.log("Starting crawl...");

    for (const job of TARGET_JOBS) {
        const result = await crawlJobData(job);
        results.push(result);
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    fs.writeFileSync('crawled_data.json', JSON.stringify(results, null, 2));
    console.log("Crawl complete. Data saved to crawled_data.json");
}

main();
