const fs = require('fs');
const https = require('https');
const path = require('path');

const CATEGORIES = [
    { name: '불독', id: '아크(불독)' },
    { name: '썬콜', id: '아크(썬콜)' },
    { name: '비숍', id: '비숍' },
    { name: '플위', id: '플레임위자드' },
    { name: '에반', id: '에반' },
    { name: '배메', id: '배틀메이지' },
    { name: '루미', id: '루미너스' },
    { name: '키네', id: '키네시스' },
    { name: '일리움', id: '일리움' },
    { name: '라라', id: '라라' },
    { name: '레테', id: '레테' }
];

const results = {};

function fetchBoard(cat) {
    return new Promise((resolve) => {
        const url = `https://www.inven.co.kr/board/maple/2295?category=${encodeURIComponent(cat.id)}`;
        console.log(`Fetching ${cat.name} (${cat.id}) board...`);
        
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
            }
        };

        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                const regex = /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
                let match;
                const posts = [];

                while ((match = regex.exec(data)) !== null) {
                    const href = match[1];
                    const text = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
                    if (href.includes('/board/maple/2295/') && text.length > 0) {
                        // Skip notice/collection post
                        if (text.includes('팁 모음') || text.includes('통합 공지') || text.includes('인벤 마법사 팁')) continue;
                        
                        // To filter out global hot topics, we check if the link contains the category parameter
                        if (href.includes(`category=${encodeURIComponent(cat.id)}`) || text.includes(`[${cat.name}]`) || text.includes(`[${cat.id}]`)) {
                            posts.push({ href, text });
                        }
                    }
                }
                
                results[cat.name] = posts.slice(0, 50); // Fetch up to 50 posts
                console.log(`Fetched ${posts.length} matching posts for ${cat.name}`);
                resolve();
            });
        }).on('error', (err) => {
            console.error(`Error fetching ${cat.name}:`, err);
            results[cat.name] = [];
            resolve();
        });
    });
}

async function run() {
    for (const cat of CATEGORIES) {
        await fetchBoard(cat);
        await new Promise(r => setTimeout(r, 1500));
    }

    const outputPath = 'c:\\Users\\USER\\Desktop\\maple-colosseum\\maple-hub\\scratch\\magician_boards_data.json';
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
    console.log(`Saved results to ${outputPath}`);
}

run();
