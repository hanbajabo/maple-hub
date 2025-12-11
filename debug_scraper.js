const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeTestWorld() {
    console.log('Scraping Test World...');
    const baseUrl = 'https://maplestory.nexon.com';
    const targetUrls = [
        `${baseUrl}/News/Notice/TestWorld?page=1`,
        `${baseUrl}/News/Notice/TestWorld?page=2`
    ];

    let noticeList = [];

    try {
        const responses = await Promise.all(
            targetUrls.map(url =>
                axios.get(url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                    },
                    timeout: 5000
                })
            )
        );

        for (const response of responses) {
            const $ = cheerio.load(response.data);
            $('.news_board ul li').each((i, el) => {
                const title = $(el).find('p a span').text().trim();
                const link = $(el).find('p a').attr('href');
                const dateRaw = $(el).find('div.heart_date dd').text().trim();

                console.log(`Found: [${title}]`);

                if (title && link && /테스트|Test|Tver|KMST/i.test(title)) {
                    console.log(`  -> MATCH!`);
                    if (!noticeList.some(item => item.title === title)) {
                        noticeList.push({
                            title,
                            url: baseUrl + link,
                            date: dateRaw.replace(/\./g, '-'),
                        });
                    }
                } else {
                    console.log(`  -> IGNORED (Filter mismatch)`);
                }
            });
        }
    } catch (err) {
        console.error('Failed code:', err);
    }

    console.log('Result Notice List:', noticeList.slice(0, 5));
}

scrapeTestWorld();
