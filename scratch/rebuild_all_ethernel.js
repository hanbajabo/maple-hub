const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync('scratch/mitemprice_full_api.json', 'utf8'));
const items = raw.data;

// Map API item names to raw.md standard names
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
    
    // 보스 장신구
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

// 에테르넬 아이템 분류 (인벤 시세 DB 정확한 매핑)
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

// Group all data by date
const dateMap = {};

items.forEach(item => {
    const rawName = item.name.trim();
    const server = item.server; // 'scania' or 'challengers'
    const isChallenger = server === 'challengers';
    const sKey = isChallenger ? 'challenger' : 'main';

    if (!item.priceHistory) return;

    item.priceHistory.forEach(h => {
        const date = h.date;
        if (!date || date < '2026-04-16') return;

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

        // Standard mapping
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

// Process Mitra and Madoso averages
Object.keys(dateMap).forEach(date => {
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

const sortedDates = Object.keys(dateMap).sort();

let generatedMarkdown = '';
sortedDates.forEach(date => {
    const d = dateMap[date];
    generatedMarkdown += `\n### ${date}\n\n`;

    // 1. 챌린저스 서버
    const chalKeys = Object.keys(d.challenger);
    if (chalKeys.length > 0) {
        generatedMarkdown += `#### 1. 챌린저스 서버 (챌섭) (단위: 억)\n`;
        chalKeys.forEach(k => {
            generatedMarkdown += `- ${k}: ${d.challenger[k]}\n`;
        });
        generatedMarkdown += `\n`;
    }

    // 2. 본 서버
    const mainKeys = Object.keys(d.main);
    if (mainKeys.length > 0) {
        generatedMarkdown += `#### 2. 본 서버 (본섭) (단위: 억)\n`;
        mainKeys.forEach(k => {
            generatedMarkdown += `- ${k}: ${d.main[k]}\n`;
        });
        generatedMarkdown += `\n`;
    }

    // 3. 에테르넬
    const ethSlots = ['모자', '상의', '하의', '견장', '신발', '장갑', '망토'];
    const hasEth = ethSlots.some(s => d.ethernel[s] && Object.keys(d.ethernel[s]).length > 0);
    if (hasEth) {
        generatedMarkdown += `#### 3. 에테르넬 장비 (평균가 단위: 억)\n`;
        ethSlots.forEach(s => {
            const jobs = d.ethernel[s] || {};
            const vals = Object.values(jobs);
            if (vals.length > 0) {
                const avg = (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2);
                const jobStr = ['전', '마', '궁', '도', '해']
                    .map(j => `${j}${jobs[j] !== undefined ? jobs[j] : '-'}`)
                    .join('/');
                generatedMarkdown += `- ${s}: ${avg} (${jobStr})\n`;
            }
        });
        generatedMarkdown += `\n`;
    }

    // 4. 광휘
    const radKeys = Object.keys(d.radiant);
    if (radKeys.length > 0) {
        generatedMarkdown += `#### 4. 광휘의 보스 세트 (평균가 단위: 억)\n`;
        radKeys.forEach(k => {
            generatedMarkdown += `- ${k}: ${d.radiant[k]}\n`;
        });
        generatedMarkdown += `\n`;
    }
});

fs.writeFileSync('scratch/generated_prices_apr_to_aug.md', generatedMarkdown.trim());

// Overwrite the portion >= 2026-04-16 in data/item-price-trends-raw.md
const targetPath = path.join(__dirname, '../data/item-price-trends-raw.md');
const fullContent = fs.readFileSync(targetPath, 'utf8');
const apr15Idx = fullContent.indexOf('### 2026-04-16');
let baseContent = fullContent;
if (apr15Idx !== -1) {
    baseContent = fullContent.substring(0, apr15Idx).trim();
}
const finalMd = baseContent + '\n\n' + generatedMarkdown.trim() + '\n';
fs.writeFileSync(targetPath, finalMd, 'utf8');

console.log("Successfully rebuilt item-price-trends-raw.md!");
console.log("\nSample 2026-08-26 output:");
console.log(generatedMarkdown.substring(generatedMarkdown.lastIndexOf('### 2026-08-26')));
