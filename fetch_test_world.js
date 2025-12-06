const axios = require('axios');
const cheerio = require('cheerio');

async function fetchTestWorld() {
    try {
        const response = await axios.get('https://maplestory.nexon.com/News/Notice/TestWorld');
        const $ = cheerio.load(response.data);

        console.log('Fetching Test World Notices...');

        // Try to find the list. Common selectors in MapleStory site:
        // .news_board ul li
        // .contents_wrap .news_list

        const listItems = $('.news_board ul li');
        console.log(`Found ${listItems.length} items in .news_board ul li`);

        if (listItems.length > 0) {
            const firstItem = $(listItems[0]);
            const titleLink = firstItem.find('p a');
            const title = titleLink.text().trim();
            const href = titleLink.attr('href');
            const date = firstItem.find('div.heart_date span').text().trim(); // Sometimes date is here?

            // Let's print the entire HTML of the first item to be sure
            console.log('First Item HTML:', firstItem.html());
        } else {
            // Fallback or debug
            console.log('Body HTML preview:', $('body').html().substring(0, 500));
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

fetchTestWorld();
