/**
 * scripts/sync-daily-prices.js
 * 
 * 매일 최신 메이플스토리 아이템 시세를 자동으로 크롤링하여
 * data/item-price-trends-raw.md 파일에 누적 추가하는 스크립트입니다.
 * (Zero dependencies - Node.js built-in modules only)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const DATA_FILE_PATH = path.join(__dirname, '..', 'data', 'item-price-trends-raw.md');

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://mitemprice.kr/',
            }
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchJson(res.headers.location).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`HTTP error ${res.statusCode}`));
            }
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => {
                try {
                    const data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
                    resolve(data);
                } catch (e) {
                    reject(new Error(`Failed to parse JSON: ${e.message}`));
                }
            });
        });
        req.on('error', reject);
    });
}

// 아이템 표준 명칭 매핑
const itemNameMapping = {
    // 칠흑
    '거대한 공포': '거공',
    '고통의 근원': '고근',
    '커맨더 포스 이어링': '커포',
    '루즈 컨트롤 머신 마크': '루컨마',
    '마력이 깃든 안대': '마깃안',
    '몽환의 벨트': '몽벨',
    '창세의 뱃지': '창뱃',
    '컴플리트 언더컨트롤': '언더컨트롤',
    '블랙 하트': '블랙하트',

    // 시드링 / 소비
    '리스트레인트 링': '리4',
    '컨티뉴어스 링': '컨4',
    '생명의 연마석': '연마석',
    '신념의 연마석': '신마석',
    '영롱한 달빛 포션': '영달포',
    '자석펫': '자석펫',
    '아델레': '아델레',
    '카이': '카이',
    '쁘띠 스노우': '쁘띠 스노우',

    // 익셉셔널
    '익셉셔널 해머 (벨트)': '익셉 - 벨트',
    '익셉셔널 해머 (얼굴장식)': '익셉 - 얼장',
    '익셉셔널 해머 (눈장식)': '익셉 - 눈장',
    '익셉셔널 해머 (훈장)': '익셉 - 훈장',

    // 보스 장신구 / 소비
    '도미네이터': '도미',
    '블랙빈 마크': '블빈마',
    '파풀라투스 마크': '파풀마',
    '데이브레이크 펜던트': '데브팬',
    '에스텔라 이어링': '에스텔라',
    '트와일라이트 마크': '트왈마',
    '가디언 엔젤 링': '가엔링',
    '솔 에르다 조각': '에리온의 조각',
    '불안정한 시간의 파편': '불안정한 시간의 파편',

    // 광휘
    '근원의 속삭임': '근원의 속삭임',
    '죽음의 맹세': '죽음의 맹세',
    '불멸의 유산': '불멸의 유산',
    '황홀한 악몽': '황홀한 악몽',
    '굶주리는 핏빛 원혼': '굶주리는 핏빛 원혼'
};

// 에테르넬 35종 전 직업 세부 매핑
const ethernelMap = {
    // 모자
    '에테르넬 나이트헬름': { slot: '모자', job: '전' },
    '에테르넬 메이지햇': { slot: '모자', job: '마' },
    '에테르넬 아처햇': { slot: '모자', job: '궁' },
    '에테르넬 시프반다나': { slot: '모자', job: '도' },
    '에테르넬 파이렛햇': { slot: '모자', job: '해' },
    // 상의
    '에테르넬 나이트아머': { slot: '상의', job: '전' },
    '에테르넬 메이지로브': { slot: '상의', job: '마' },
    '에테르넬 아처후드': { slot: '상의', job: '궁' },
    '에테르넬 시프셔츠': { slot: '상의', job: '도' },
    '에테르넬 파이렛코트': { slot: '상의', job: '해' },
    // 하의
    '에테르넬 나이트팬츠': { slot: '하의', job: '전' },
    '에테르넬 메이지팬츠': { slot: '하의', job: '마' },
    '에테르넬 아처팬츠': { slot: '하의', job: '궁' },
    '에테르넬 시프팬츠': { slot: '하의', job: '도' },
    '에테르넬 파이렛팬츠': { slot: '하의', job: '해' },
    // 견장
    '에테르넬 나이트숄더': { slot: '견장', job: '전' },
    '에테르넬 메이지숄더': { slot: '견장', job: '마' },
    '에테르넬 아처숄더': { slot: '견장', job: '궁' },
    '에테르넬 시프숄더': { slot: '견장', job: '도' },
    '에테르넬 파이렛숄더': { slot: '견장', job: '해' },
    // 신발
    '에테르넬 나이트슈즈': { slot: '신발', job: '전' },
    '에테르넬 메이지슈즈': { slot: '신발', job: '마' },
    '에테르넬 아처슈즈': { slot: '신발', job: '궁' },
    '에테르넬 시프슈즈': { slot: '신발', job: '도' },
    '에테르넬 파이렛슈즈': { slot: '신발', job: '해' },
    // 장갑
    '에테르넬 나이트글러브': { slot: '장갑', job: '전' },
    '에테르넬 메이지글러브': { slot: '장갑', job: '마' },
    '에테르넬 아처글러브': { slot: '장갑', job: '궁' },
    '에테르넬 시프글러브': { slot: '장갑', job: '도' },
    '에테르넬 파이렛글러브': { slot: '장갑', job: '해' },
    // 망토
    '에테르넬 나이트케이프': { slot: '망토', job: '전' },
    '에테르넬 메이지케이프': { slot: '망토', job: '마' },
    '에테르넬 아처케이프': { slot: '망토', job: '궁' },
    '에테르넬 시프케이프': { slot: '망토', job: '도' },
    '에테르넬 파이렛케이프': { slot: '망토', job: '해' },
};

function toEok(price) {
    if (!price || isNaN(price)) return null;
    const eok = price / 100000000;
    return parseFloat(eok.toFixed(2));
}

async function main() {
    console.log('[1/4] Fetching latest price data from mitemprice.kr API...');
    const res = await fetchJson('https://mitemprice.kr/api.php');
    if (!res || !res.success || !Array.isArray(res.data)) {
        throw new Error('Invalid API response from mitemprice.kr');
    }

    const items = res.data;
    console.log(`[2/4] Retrieved ${items.length} item tracks.`);

    // Read current data file to check existing dates
    const currentMd = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    const existingDates = new Set();
    const dateMatches = currentMd.match(/^### (\d{4}-\d{2}-\d{2})/gm) || [];
    dateMatches.forEach(m => {
        const d = m.replace('### ', '').trim();
        existingDates.add(d);
    });

    console.log(`[INFO] Current file contains ${existingDates.size} dates.`);

    // Group items by date
    const dateMap = {};

    items.forEach(item => {
        const rawName = item.name.trim();
        const server = item.server; // 'scania' or 'challengers'
        const isChallenger = server === 'challengers';
        const sKey = isChallenger ? 'challenger' : 'main';

        if (!item.priceHistory || !Array.isArray(item.priceHistory)) return;

        item.priceHistory.forEach(h => {
            const date = h.date;
            if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return;

            // Only process dates that are NOT already in raw.md
            if (existingDates.has(date)) return;

            if (!dateMap[date]) {
                dateMap[date] = { challenger: {}, main: {}, ethernel: {}, radiant: {} };
            }

            const priceEok = toEok(h.price);
            if (priceEok === null) return;

            // Check if Ethernel
            if (ethernelMap[rawName] && !isChallenger) {
                const { slot, job } = ethernelMap[rawName];
                if (!dateMap[date].ethernel[slot]) dateMap[date].ethernel[slot] = {};
                dateMap[date].ethernel[slot][job] = priceEok;
                return;
            }

            // Check if Mitra
            if (rawName.startsWith('미트라의 분노')) {
                if (!dateMap[date][sKey]._mitraList) dateMap[date][sKey]._mitraList = [];
                dateMap[date][sKey]._mitraList.push(priceEok);
                return;
            }

            // Check if Madoso
            if (rawName.includes('마도서')) {
                if (!dateMap[date][sKey]._madosoList) dateMap[date][sKey]._madosoList = [];
                dateMap[date][sKey]._madosoList.push(priceEok);
                return;
            }

            // Standard item mapping
            const mapped = itemNameMapping[rawName];
            if (mapped) {
                const radiantItems = ['근원의 속삭임', '죽음의 맹세', '불멸의 유산', '황홀한 악몽', '굶주리는 핏빛 원혼'];
                if (radiantItems.includes(mapped) && !isChallenger) {
                    dateMap[date].radiant[mapped] = priceEok;
                } else {
                    dateMap[date][sKey][mapped] = priceEok;
                }
            }
        });
    });

    const newDates = Object.keys(dateMap).sort();
    if (newDates.length === 0) {
        console.log('[SUCCESS] All dates are already up-to-date. No new dates to append.');
        return;
    }

    console.log(`[3/4] Found ${newDates.length} new date(s) to add: ${newDates.join(', ')}`);

    // Process Mitra and Madoso averages for new dates
    newDates.forEach(date => {
        ['challenger', 'main'].forEach(sKey => {
            const sObj = dateMap[date][sKey];
            if (sObj._mitraList && sObj._mitraList.length > 0) {
                const avg = sObj._mitraList.reduce((a, b) => a + b, 0) / sObj._mitraList.length;
                sObj['미트라'] = parseFloat(avg.toFixed(2));
                delete sObj._mitraList;
            }
            if (sObj._madosoList && sObj._madosoList.length > 0) {
                const avg = sObj._madosoList.reduce((a, b) => a + b, 0) / sObj._madosoList.length;
                sObj['마도서'] = parseFloat(avg.toFixed(2));
                delete sObj._madosoList;
            }
        });
    });

    // Build Markdown string
    let appendMarkdown = '';
    newDates.forEach(date => {
        const d = dateMap[date];
        appendMarkdown += `\n### ${date}\n\n`;

        // 1. 챌린저스 서버
        const chalKeys = Object.keys(d.challenger);
        if (chalKeys.length > 0) {
            appendMarkdown += `#### 1. 챌린저스 서버 (챌섭) (단위: 억)\n`;
            chalKeys.forEach(k => {
                appendMarkdown += `- ${k}: ${d.challenger[k]}\n`;
            });
            appendMarkdown += `\n`;
        }

        // 2. 본 서버
        const mainKeys = Object.keys(d.main);
        if (mainKeys.length > 0) {
            appendMarkdown += `#### 2. 본 서버 (본섭) (단위: 억)\n`;
            mainKeys.forEach(k => {
                appendMarkdown += `- ${k}: ${d.main[k]}\n`;
            });
            appendMarkdown += `\n`;
        }

        // 3. 에테르넬
        const ethSlots = ['모자', '상의', '하의', '견장', '신발', '장갑', '망토'];
        const hasEth = ethSlots.some(s => d.ethernel[s] && Object.keys(d.ethernel[s]).length > 0);
        if (hasEth) {
            appendMarkdown += `#### 3. 에테르넬 장비 (평균가 단위: 억)\n`;
            ethSlots.forEach(s => {
                const jobs = d.ethernel[s] || {};
                const vals = Object.values(jobs);
                if (vals.length > 0) {
                    const avg = (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2);
                    const jobStr = ['전', '마', '궁', '도', '해']
                        .map(j => `${j}${jobs[j] !== undefined ? jobs[j] : '-'}`)
                        .join('/');
                    appendMarkdown += `- ${s}: ${avg} (${jobStr})\n`;
                }
            });
            appendMarkdown += `\n`;
        }

        // 4. 광휘
        const radKeys = Object.keys(d.radiant);
        if (radKeys.length > 0) {
            appendMarkdown += `#### 4. 광휘의 보스 세트 (평균가 단위: 억)\n`;
            radKeys.forEach(k => {
                appendMarkdown += `- ${k}: ${d.radiant[k]}\n`;
            });
            appendMarkdown += `\n`;
        }
    });

    const updatedMd = currentMd.trim() + '\n\n' + appendMarkdown.trim() + '\n';
    fs.writeFileSync(DATA_FILE_PATH, updatedMd, 'utf8');

    console.log(`[4/4] [SUCCESS] Appended ${newDates.length} new date(s) to ${DATA_FILE_PATH}!`);
}

main().catch(err => {
    console.error('[ERROR]', err.message);
    process.exit(1);
});
