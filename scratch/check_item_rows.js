const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            }
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchUrl(res.headers.location).then(resolve).catch(reject);
            }
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        });
        req.on('error', reject);
    });
}

async function main() {
    // Let's test itempricetab.php for various items on mitemprice.kr
    const testItems = [
        '거대한 공포',
        '고통의 근원',
        '커맨더 포스 이어링',
        '루즈 컨트롤 마크',
        '마법이 깃든 안대',
        '몽환의 벨트',
        '에테르넬 나이트헬름',
        '리스트레인트 링 4레벨'
    ];

    for (const item of testItems) {
        const url = 'https://mitemprice.kr/itempricetab.php?name=' + encodeURIComponent(item) + '&server=scania';
        const html = await fetchUrl(url);
        // Find price entries for 2026-08-25
        const dateRegex = /<tr[^>]*>[\s\S]*?2026-08-25[\s\S]*?<\/tr>/gi;
        const rowMatch = html.match(dateRegex);
        if (rowMatch) {
            console.log(`[${item}] 2026-08-25 row:`, rowMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
        } else {
            console.log(`[${item}] No row for 2026-08-25, finding latest date...`);
            const firstRow = html.match(/<tr[^>]*>[\s\S]*?2026-\d{2}-\d{2}[\s\S]*?<\/tr>/i);
            if (firstRow) {
                console.log(`  Latest:`, firstRow[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
            }
        }
    }
}

main();
