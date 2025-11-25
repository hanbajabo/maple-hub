
const puppeteer = require('puppeteer');
const fs = require('fs');

const TARGET_JOBS = [
    '히어로', '팔라딘', '다크나이트',
    '아크메이지(불,독)', '아크메이지(썬,콜)', '비숍',
    '보우마스터', '신궁', '패스파인더',
    '나이트로드', '섀도어', '듀얼블레이더',
    '바이퍼', '캡틴', '캐논마스터',
    '미하일', '소울마스터', '플레임위자드', '윈드브레이커', '나이트워커', '스트라이커',
    '아란', '에반', '루미너스', '메르세데스', '팬텀', '은월',
    '블래스터', '배틀메이지', '와일드헌터', '메카닉', '제논', '데몬슬레이어', '데몬어벤져',
    '카이저', '카인', '카데나', '엔젤릭버스터',
    '아델', '일리움', '아크', '칼리',
    '호영', '라라', '렌',
    '키네시스', '제로'
];

const BASE_URL = 'https://maple.gg/jobs';
// Updated query for 400M+ combat power
const QUERY_PARAMS = 'level=280%2B&power=400m%2B';

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
        await new Promise(r => setTimeout(r, 3000));
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await new Promise(r => setTimeout(r, 2000));

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
        return { job: jobName, data };

    } catch (error) {
        console.error(`Error fetching ${jobName}:`, error);
        await browser.close();
        return { job: jobName, error: error.message };
    }
}

async function main() {
    const results = [];
    console.log(`Starting HIGH SPEC (400M+) crawl for ${TARGET_JOBS.length} jobs...`);

    const CHUNK_SIZE = 5;
    for (let i = 0; i < TARGET_JOBS.length; i += CHUNK_SIZE) {
        const chunk = TARGET_JOBS.slice(i, i + CHUNK_SIZE);
        const promises = chunk.map(job => crawlJobData(job));
        const chunkResults = await Promise.all(promises);
        results.push(...chunkResults);

        console.log(`Processed ${Math.min(i + CHUNK_SIZE, TARGET_JOBS.length)}/${TARGET_JOBS.length} jobs...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    // Save to a new file
    fs.writeFileSync('maple_hat_stats_400m.json', JSON.stringify(results, null, 2));

    let csvContent = "직업,쿨타임 감소 통계 (4억+)\n";
    results.forEach(row => {
        const stats = row.data && row.data.hatPotentials ? row.data.hatPotentials.join(" / ") : "N/A";
        csvContent += `${row.job},"${stats}"\n`;
    });
    fs.writeFileSync('maple_hat_stats_400m.csv', csvContent, 'utf8');
    console.log("Crawl complete. Data saved to maple_hat_stats_400m.csv");
}

main();
