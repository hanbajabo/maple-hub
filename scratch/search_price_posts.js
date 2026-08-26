const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://www.inven.co.kr/',
            }
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchUrl(res.headers.location).then(resolve).catch(reject);
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        });
        req.on('error', reject);
    });
}

async function main() {
    try {
        const listUrl = 'https://www.inven.co.kr/board/maple/5974?name=nicname&keyword=%EB%8B%89%EB%84%A4%EC%9E%84%ED%9E%98%EB%93%9C%EB%9F%AC&eq=1&iskin=';
        const html = await fetchUrl(listUrl);
        
        // Find all rows in board
        const trRegex = /<tr class="ls[\s\S]*?<\/tr>/g;
        let match;
        const posts = [];
        while ((match = trRegex.exec(html)) !== null) {
            const trHtml = match[0];
            const linkMatch = trHtml.match(/href="(https:\/\/www\.inven\.co\.kr\/board\/maple\/5974\/\d+[^"]*)"[^>]*>([\s\S]*?)<\/a>/i);
            const dateMatch = trHtml.match(/<td class="date">([\s\S]*?)<\/td>/i);
            if (linkMatch) {
                const title = linkMatch[2].replace(/<[^>]+>/g, '').trim();
                const url = linkMatch[1];
                const date = dateMatch ? dateMatch[1].trim() : '';
                posts.push({ title, url, date });
            }
        }
        
        console.log(`Found ${posts.length} posts by 닉네임힘드러:`);
        posts.slice(0, 10).forEach(p => console.log(`- [${p.date}] ${p.title} (${p.url})`));
        
        // Let's find one that has '시세' in title and fetch it
        const pricePost = posts.find(p => p.title.includes('시세') || p.title.includes('챌') || p.title.includes('본섭') || p.title.includes('억'));
        if (pricePost) {
            console.log("\nFetching price post:", pricePost.title, pricePost.url);
            const postHtml = await fetchUrl(pricePost.url);
            const bodyMatch = postHtml.match(/<div id="powerbbsContent" class="powerbbsContent">([\s\S]*?)<\/div>/i);
            if (bodyMatch) {
                const clean = bodyMatch[1].replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').trim();
                console.log("\n--- Post Content ---");
                console.log(clean.substring(0, 800));
            }
        }
    } catch (e) {
        console.error(e);
    }
}

main();
