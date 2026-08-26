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
    const items = [
        '거대한 공포',
        '고통의 근원',
        '커맨더 포스 이어링',
        '루즈 컨트롤 머신 마크',
        '마력이 깃든 안대',
        '몽환의 벨트',
        '마도서',
        '미트라의 분노',
        '창세의 뱃지',
        '컴플리트 언더컨트롤',
        '블랙 하트',
        '근원의 속삭임',
        '죽음의 맹세',
        '불멸의 유산',
        '황홀한 악몽',
        '굶주리는 핏빛 원혼',
        '리스트레인트 링',
        '컨티뉴어스 링',
        '자석펫',
        '생명의 연마석',
        '신념의 연마석',
        '영롱한 달빛 포션',
        '익셉셔널 해머 (벨트)',
        '익셉셔널 해머 (얼굴장식)',
        '익셉셔널 해머 (눈장식)',
        '익셉셔널 해머 (훈장)',
        '도미네이터',
        '블랙빈 마크',
        '파풀라투스 마크'
    ];

    const allDates = new Set();
    const itemHistory = {};

    for (const item of items) {
        const url = 'https://mitemprice.kr/itempricetab.php?name=' + encodeURIComponent(item) + '&server=scania';
        const html = await fetchUrl(url);
        const rowRegex = /<tr[^>]*>\s*<td[^>]*>(\d{4}-\d{2}-\d{2})<\/td>\s*<td[^>]*>([^<]+)<\/td>/gi;
        let match;
        let count = 0;
        itemHistory[item] = {};
        while ((match = rowRegex.exec(html)) !== null) {
            const date = match[1];
            const price = match[2].replace(/,/g, '').trim();
            itemHistory[item][date] = price;
            allDates.add(date);
            count++;
        }
        console.log(`[${item}] -> ${count} rows`);
    }

    const sortedDates = [...allDates].sort();
    console.log(`\nTotal unique dates collected: ${sortedDates.length}`);
    console.log(`Date range: ${sortedDates[0]} ~ ${sortedDates[sortedDates.length - 1]}`);
    console.log("Dates:", sortedDates);
}

main();
