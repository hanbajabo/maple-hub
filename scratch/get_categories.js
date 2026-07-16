const https = require('https');

const url = 'https://www.inven.co.kr/board/maple/2295';
const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }
};

https.get(url, options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        const optionRegex = /<option[^>]*value="([^"]+)"[^>]*>([\s\S]*?)<\/option>/g;
        let match;
        console.log("=== Options ===");
        while ((match = optionRegex.exec(data)) !== null) {
            console.log(`Value: ${match[1]}, Text: ${match[2].trim()}`);
        }
        
        const categoryRegex = /category=([^"&>]+)/g;
        const categories = new Set();
        while ((match = categoryRegex.exec(data)) !== null) {
            categories.add(decodeURIComponent(match[1]));
        }
        console.log("=== Decoded Categories ===");
        console.log(Array.from(categories));
    });
}).on('error', (err) => {
    console.error(err);
});
