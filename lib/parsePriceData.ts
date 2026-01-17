import fs from 'fs';
import path from 'path';

// 원본 데이터 파일 경로
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'item-price-trends-raw.md');

export interface PriceData {
    date: string;
    items: Record<string, ItemPriceInfo>;
}

export interface ItemPriceInfo {
    challenger?: number;
    main?: number;
}

export function getPriceData() {
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
            let currentSection: 'challenger' | 'main' | 'ethernel' | null = null;

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
                    }
                    return;
                }

                // 아이템 파싱
                if (trimmed.startsWith('-') && currentSection) {
                    const parts = trimmed.substring(1).split(':');
                    if (parts.length >= 2) {
                        const itemName = currentSection === 'ethernel'
                            ? `에테르넬 ${parts[0].trim()}`
                            : parts[0].trim();

                        const priceStr = parts[1].trim().split(' ')[0];
                        const price = parseFloat(priceStr);

                        if (!isNaN(price)) {
                            if (!itemMap[itemName]) {
                                itemMap[itemName] = {};
                            }

                            if (currentSection === 'ethernel' || currentSection === 'main') {
                                itemMap[itemName].main = price;
                            }
                            if (currentSection === 'challenger') {
                                itemMap[itemName].challenger = price;
                            }
                        }
                    }
                }
            });

            result.push({ date, items: itemMap });
        });

        return result;

    } catch (error) {
        console.error('Error reading price data:', error);
        return [];
    }
}
