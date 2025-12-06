const axios = require('axios');
const cheerio = require('cheerio');

async function debugTestWorld() {
    try {
        const url = 'https://maplestory.nexon.com/News/Notice/TestWorld?page=2';
        console.log(`Fetching ${url} ...`);

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const $ = cheerio.load(response.data);

        $('.news_board ul li').each((i, el) => {
            const link = $(el).find('p a').attr('href');
            const title = $(el).find('p a span').text().trim();
            const categoryAlt = $(el).find('p a em img').attr('alt');

            console.log(`[${i}] Cat: ${categoryAlt} | Title: ${title} | Link: ${link}`);
        });

    } catch (error) {
        console.error('Error:', error.message);
    }
}

debugTestWorld();
