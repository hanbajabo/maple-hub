import fs from 'fs';
import path from 'path';

// 원본 데이터 파일 경로 (https://maple.ai.kr/blog/item-price-tracker-2026 원본 DB)
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'item-price-trends-raw.md');

export interface PriceData {
    date: string;
    items: Record<string, ItemPriceInfo>;
    ethernelByJob?: EthernelByJob[];
}

export interface ItemPriceInfo {
    challenger?: number;
    main?: number;
}

export interface EthernelByJob {
    item: string; // 모자, 상의, 하의, etc.
    warrior: number; // 전사
    mage: number; // 마법사
    archer: number; // 궁수
    thief: number; // 도적
    pirate: number; // 해적
}

export function getPriceData(): PriceData[] {
    try {
        const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');

        // ### 2026-01-XX로 시작하는 블록만 추출
        const dateBlocks = fileContent.split(/^### /m).filter(block => block.trim());

        const result: PriceData[] = [];

        dateBlocks.forEach((block) => {
            const lines = block.split('\n');
            const dateLine = lines[0].trim();

            // 날짜 형식 검증 (YYYY-MM-DD)
            if (!/^\d{4}-\d{2}-\d{2}/.test(dateLine)) {
                return; // 날짜가 아니면 스킵
            }

            const date = dateLine.match(/\d{4}-\d{2}-\d{2}/)?.[0] || '';
            if (!date) return;

            const itemMap: Record<string, ItemPriceInfo> = {};
            const ethernelByJob: EthernelByJob[] = [];
            let currentSection: 'challenger' | 'main' | 'ethernel' | 'radiant' | null = null;

            lines.forEach((line) => {
                const trimmed = line.trim();

                // 섹션 확인 (#### 헤딩)
                if (trimmed.startsWith('####')) {
                    if (trimmed.includes('1. 챌린저스')) {
                        currentSection = 'challenger';
                    } else if (trimmed.includes('2. 본')) {
                        currentSection = 'main';
                    } else if (trimmed.includes('3. 에테르넬')) {
                        currentSection = 'ethernel';
                    } else if (trimmed.includes('4. 광휘의 보스 세트')) {
                        currentSection = 'radiant';
                    }
                    return;
                }

                // 아이템 파싱
                if (trimmed.startsWith('-') && currentSection) {
                    const parts = trimmed.substring(1).split(':');
                    if (parts.length >= 2) {
                        const rawItemName = parts[0].trim();
                        const ethernelItems = ['모자', '상의', '하의', '견장', '신발', '장갑', '망토'];
                        let itemName = (currentSection === 'ethernel' && ethernelItems.includes(rawItemName))
                            ? `에테르넬 ${rawItemName}`
                            : rawItemName;

                        // 아이템 이름 정규화 (별칭 처리)
                        const nameAliases: Record<string, string> = {
                            '신마석': '신마석(스카)',
                            '연마석': '연마석(스카)',
                            '블랙하트': '블랙하트(스카)',
                            '신마석(스카니아)': '신마석(스카)',
                            '연마석(스카니아)': '연마석(스카)',
                            '블랙하트(스카니아)': '블랙하트(스카)',
                            '자석펫 7기(평균)': '자석펫',
                            '자석펫 7기': '자석펫',
                            '자석펫(평균)': '자석펫',
                            '익셉 - 벨트': '익셉셔널 벨트',
                            '익셉 - 얼장': '익셉셔널 얼장',
                            '익셉 - 눈장': '익셉셔널 눈장',
                            '익셉 - 훈장': '익셉셔널 훈장',
                        };

                        if (nameAliases[itemName]) {
                            itemName = nameAliases[itemName];
                        }

                        const priceStr = parts[1].trim().split(' ')[0];
                        const price = parseFloat(priceStr);

                        if (!isNaN(price)) {
                            if (!itemMap[itemName]) {
                                itemMap[itemName] = {};
                            }

                            if (currentSection === 'ethernel' || currentSection === 'main' || currentSection === 'radiant') {
                                itemMap[itemName].main = price;
                            }
                            if (currentSection === 'challenger') {
                                itemMap[itemName].challenger = price;
                            }

                            // 에테르넬 직업별 가격 파싱 (괄호 안 데이터)
                            if (currentSection === 'ethernel') {
                                const jobMatch = parts[1].match(/\(([^)]+)\)/);
                                if (jobMatch) {
                                    const jobPrices = jobMatch[1];
                                    // 전3.2/마3/궁3.3/도3.1/해3.2 형식 파싱
                                    const warriorMatch = jobPrices.match(/전([\d.]+)/);
                                    const mageMatch = jobPrices.match(/마([\d.]+)/);
                                    const archerMatch = jobPrices.match(/궁([\d.]+)/);
                                    const thiefMatch = jobPrices.match(/도([\d.]+)/);
                                    const pirateMatch = jobPrices.match(/해([\d.]+)/);

                                    if (warriorMatch || mageMatch || archerMatch || thiefMatch || pirateMatch) {
                                        ethernelByJob.push({
                                            item: rawItemName, // 모자, 상의, etc.
                                            warrior: warriorMatch ? parseFloat(warriorMatch[1]) : 0,
                                            mage: mageMatch ? parseFloat(mageMatch[1]) : 0,
                                            archer: archerMatch ? parseFloat(archerMatch[1]) : 0,
                                            thief: thiefMatch ? parseFloat(thiefMatch[1]) : 0,
                                            pirate: pirateMatch ? parseFloat(pirateMatch[1]) : 0,
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            });

            result.push({ date, items: itemMap, ethernelByJob: ethernelByJob.length > 0 ? ethernelByJob : undefined });
        });

        return result;

    } catch (error) {
        console.error('Error reading price data:', error);
        return [];
    }
}

/**
 * 가장 최신 날짜의 본섭 아이템 시세를 메소 단위로 반환합니다.
 *
 * 반환 key: 정식 아이템 이름 (예: '루즈 컨트롤 머신 마크', '황홀한 악몽')
 * 반환 value: 메소 (1억 = 100_000_000)
 */
export function getLatestItemPrices(): Record<string, number> {
    const data = getPriceData();
    if (data.length === 0) return {};

    // 가장 최신 날짜 데이터
    const latest = data[data.length - 1];
    const items = latest.items;

    // 약칭 → 정식 아이템 이름 매핑
    const ALIAS_TO_CANONICAL: Record<string, string[]> = {
        '루컨마':   ['루즈 컨트롤 머신 마크'],
        '마깃안':   ['마력이 깃든 안대'],
        '커포':     ['커맨더 포스 이어링'],
        '고근':     ['고통의 근원'],
        '거공':     ['거대한 공포'],
        '몽벨':     ['몽환의 벨트'],
        '미트라':   ['미트라의 분노'],
        '황홀한 악몽': ['황홀한 악몽'],
        '죽음의 맹세': ['죽음의 맹세'],
        '근원의 속삭임': ['근원의 속삭임'],
        '불멸의 유산': ['불멸의 유산'],
        '굶주리는 핏빛 원혼': ['굶주리는 핏빛 원혼'],
        '데브팬':   ['데이브레이크 펜던트'],
        '트왈마':   ['트와일라이트 마크'],
        '에스텔라': ['에스텔라 이어링'],
        '가엔링':   ['여명의 가디언 엔젤 링'],
        '도미':     ['도미네이터 펜던트'],
        '블빈마':   ['블랙빈 마크'],
        '파풀마':   ['파풀라투스 마크'],
        '에테르넬 모자': ['에테르넬 모자'],
        '에테르넬 상의': ['에테르넬 상의'],
        '에테르넬 하의': ['에테르넬 하의'],
        '에테르넬 견장': ['에테르넬 견장'],
        '에테르넬 신발': ['에테르넬 신발'],
        '에테르넬 장갑': ['에테르넬 장갑'],
        '에테르넬 망토': ['에테르넬 망토'],
    };

    const result: Record<string, number> = {};

    for (const [alias, canonicals] of Object.entries(ALIAS_TO_CANONICAL)) {
        const info = items[alias];
        if (info?.main != null && info.main > 0) {
            const mesoPrice = Math.round(info.main * 100_000_000); // 억 → 메소
            for (const canonical of canonicals) {
                result[canonical] = mesoPrice;
            }
        }
    }

    return result;
}

/**
 * 직업명으로 직업군 분류 ('warrior' | 'mage' | 'archer' | 'thief' | 'pirate')
 */
export function getJobCategory(jobName?: string): 'warrior' | 'mage' | 'archer' | 'thief' | 'pirate' {
    if (!jobName) return 'warrior';

    const WARRIORS = ['히어로', '팔라딘', '다크나이트', '소울마스터', '미하일', '블래스터', '데몬슬레이어', '데몬어벤져', '아란', '카이저', '아델', '제로'];
    const MAGES = ['아크메이지(불,독)', '아크메이지(썬,콜)', '비숍', '플레임위자드', '배틀메이지', '에반', '루미너스', '일리움', '라라', '키네시스'];
    const ARCHERS = ['보우마스터', '신궁', '패스파인더', '윈드브레이커', '와일드헌터', '메르세데스', '카인'];
    const THIEVES = ['나이트로드', '섀도어', '듀얼블레이더', '듀얼블레이드', '나이트워커', '팬텀', '카데나', '칼리', '호영'];
    const PIRATES = ['바이퍼', '캡틴', '캐논슈터', '스트라이커', '메카닉', '제논', '은월', '엔젤릭버스터', '아크'];

    if (WARRIORS.some(j => jobName.includes(j))) return 'warrior';
    if (MAGES.some(j => jobName.includes(j))) return 'mage';
    if (ARCHERS.some(j => jobName.includes(j))) return 'archer';
    if (THIEVES.some(j => jobName.includes(j))) return 'thief';
    if (PIRATES.some(j => jobName.includes(j))) return 'pirate';

    return 'warrior';
}

/**
 * 에테르넬 부위별 시세 (억 → 메소) 반환
 * 직업군이 주어지면 해당 직업군 전용 시세 반영 (예: 궁수 신발 vs 도적 신발)
 */
export function getLatestEthernelPrice(slot: string, jobName?: string): number {
    const data = getPriceData();
    if (data.length === 0) return 520_000_000; // fallback

    const latest = data[data.length - 1];

    // 슬롯 명칭 정규화 (어깨장식 ➔ 견장)
    let normalizedSlot = slot.replace('에테르넬', '').trim();
    if (normalizedSlot === '어깨장식' || normalizedSlot === '견장') {
        normalizedSlot = '견장';
    }

    // 1. 직업별 시세 조회
    if (latest.ethernelByJob && latest.ethernelByJob.length > 0) {
        const jobCat = getJobCategory(jobName);
        const ethItem = latest.ethernelByJob.find(e => e.item === normalizedSlot || normalizedSlot.includes(e.item));
        if (ethItem && ethItem[jobCat] > 0) {
            return Math.round(ethItem[jobCat] * 100_000_000);
        }
    }

    // 2. 전체 평균 시세 조회
    const slotKey = `에테르넬 ${normalizedSlot}`;
    const info = latest.items[slotKey];
    if (info?.main != null && info.main > 0) {
        return Math.round(info.main * 100_000_000);
    }

    // 3. Fallback: 250제 기본값 (방어구 4셋 약 2천만, 신발/장갑/망토 약 12억)
    if (['신발', '장갑', '망토'].includes(normalizedSlot)) {
        return 1_200_000_000;
    }
    return 20_000_000;
}

/**
 * 범용 실시간 아이템 시세 조회 함수 (item-price-tracker-2026 연동)
 * @param itemName 아이템 이름 (예: '루즈 컨트롤 머신 마크', '데이브레이크 펜던트', '에테르넬 모자')
 * @param slot     슬롯 이름 (예: '모자', '상의', '신발')
 * @param jobName  캐릭터 직업명 (예: '메르세데스', '아델')
 */
export function getLatestPrice(itemName: string, slot?: string, jobName?: string): number {
    // 1. 에테르넬 계열
    if (itemName.includes('에테르넬') || (slot && ['모자', '상의', '하의', '신발', '장갑', '망토', '어깨장식'].includes(slot) && itemName.includes('에테르넬'))) {
        const targetSlot = slot || (itemName.includes('모자') ? '모자' : itemName.includes('상의') ? '상의' : itemName.includes('하의') ? '하의' : itemName.includes('견장') || itemName.includes('어깨') ? '견장' : itemName.includes('신발') ? '신발' : itemName.includes('장갑') ? '장갑' : itemName.includes('망토') ? '망토' : '모자');
        return getLatestEthernelPrice(targetSlot, jobName);
    }

    // 2. 최신 본섭 시세 테이블 조회
    const livePrices = getLatestItemPrices();
    for (const [key, price] of Object.entries(livePrices)) {
        if (itemName.includes(key) || key.includes(itemName)) {
            return price;
        }
    }

    // 3. 하드코딩 보조 시세 (시세 추적표에 없는 일반 보스 장비)
    if (itemName.includes('아케인') || itemName.includes('아케인셰이드')) {
        return itemName.includes('무기') ? 20_000_000 : 15_000_000;
    }
    if (itemName.includes('앱솔') || itemName.includes('앱솔랩스')) {
        return 5_000_000;
    }
    if (itemName.includes('하이네스') || itemName.includes('이글아이') || itemName.includes('트릭스터')) {
        return 1_000_000;
    }
    if (itemName.includes('골든 클로버') || itemName.includes('실버블라썸') || itemName.includes('이피아') || itemName.includes('아쿠아틱') || itemName.includes('응축된')) {
        return 2_000_000;
    }

    return 10_000_000; // 기본 1,000만 메소
}
