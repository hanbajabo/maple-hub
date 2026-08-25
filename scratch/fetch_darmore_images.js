const https = require('https');
const fs = require('fs');
const path = require('path');

async function fetchPage(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            }
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchPage(res.headers.location).then(resolve).catch(reject);
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
        });
        req.on('error', reject);
    });
}

async function main() {
    const urls = [
        'https://namu.wiki/w/%EC%A0%9C%EB%A5%B8%20%EB%8B%A4%EB%A5%B4%EB%AA%A8%EC%96%B4',
        'https://namu.wiki/w/%EC%A0%9C%EB%A5%B8%20%EB%8B%A4%EB%A5%B4%EB%AA%A8%EC%96%B4/%EC%9E%91%EC%A4%91%20%ED%96%89%EC%A0%81'
    ];

    for (const url of urls) {
        console.log(`Fetching ${url}...`);
        try {
            const res = await fetchPage(url);
            console.log(`Status: ${res.status}, Length: ${res.data.length}`);
            // find image URLs
            const imgRegex = /https:\/\/i\.namu\.wiki\/i\/[a-zA-Z0-9_\-]+/g;
            const matches = res.data.match(imgRegex) || [];
            console.log(`Found ${matches.length} namu image URLs`);
            console.log(matches.slice(0, 10));
        } catch (e) {
            console.error(`Error: ${e.message}`);
        }
    }
}

main();
