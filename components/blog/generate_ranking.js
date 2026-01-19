const fs = require('fs');

try {
    const raw = fs.readFileSync('ranking_raw.txt', 'utf8');
    const lines = raw.split(/\r?\n/);

    const seasonData = {};
    let currentSeason = '1';

    function parsePrice(priceStr, isSeason1) {
        if (!priceStr) return 0;
        let cleanPrice = priceStr.replace(/,/g, '');
        // Handle "1000-1", "450+1" -> take the first number part
        const match = cleanPrice.match(/^([\d\.]+)/);
        let val = match ? parseFloat(match[1]) : 0;

        if (isSeason1) {
            return Math.floor(val);
        } else {
            // Season 2+ are in 10,000 units
            return Math.floor(val * 10000);
        }
    }

    let rankCounter = 1;

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        // Detect Season Headers
        if (line.includes('시즌1') || line === '시즌1') {
            currentSeason = '1';
            rankCounter = 1;
            continue;
        } else if (line.includes('시즌2') && !line.includes('2.5')) {
            currentSeason = '2';
            rankCounter = 1;
            continue;
        } else if (line.includes('시즌 2.5') || line.includes('시즌2.5')) {
            currentSeason = '2.5';
            rankCounter = 1;
            continue;
        } else if (line.includes('시즌3')) {
            currentSeason = '3';
            rankCounter = 1;
            continue;
        } else if (line.includes('시즌4')) {
            currentSeason = '4';
            rankCounter = 1;
            continue;
        } else if (line.includes('시즌5')) {
            currentSeason = '5';
            rankCounter = 1;
            continue;
        }

        // Skip non-data lines
        if (line.startsWith('-') || line.toLowerCase().startsWith('top')) continue;
        if (line.includes('TOP')) continue;

        if (!seasonData[currentSeason]) seasonData[currentSeason] = [];

        let name = '', price = 0;

        if (currentSeason === '1') {
            // Season 1: "Name : Price"
            const parts = line.split(':');
            if (parts.length >= 2) {
                name = parts[0].trim();
                price = parsePrice(parts[1].trim(), true);
                if (name && price > 0) {
                    seasonData[currentSeason].push({
                        rank: rankCounter++,
                        name: name,
                        price: price
                    });
                }
            }
        } else {
            // Season 2+: "Name Price ..." OR "Price Name ..."
            // Check if starts with digit
            if (/^[\d\.]+/.test(line)) {
                // Starts with number -> Price first
                // Format: "98 희정 (8)..."
                const match = line.match(/^([\d\.\+\-]+)\s+(\S+)/);
                if (match) {
                    price = parsePrice(match[1], false);
                    name = match[2];
                    if (name && price > 0) {
                        seasonData[currentSeason].push({
                            rank: rankCounter++,
                            name: name,
                            price: price
                        });
                    }
                }
            } else {
                // Starts with string -> Name first
                // Format: "소녀 1200 ..."
                const match = line.match(/^(\S+)\s+([\d\.\+\-]+)/);
                if (match) {
                    name = match[1];
                    price = parsePrice(match[2], false);
                    if (name && price > 0) {
                        seasonData[currentSeason].push({
                            rank: rankCounter++,
                            name: name,
                            price: price
                        });
                    }
                }
            }
        }
    }

    let output = `export interface RankingData {
    rank: number;
    name: string;
    price: number;
    season?: string;
}

export const seasonData: { [key: string]: RankingData[] } = {\n`;

    // Sort keys just in case, though insertion order usually preserved
    // Force specific order
    const orderedKeys = ['1', '2', '2.5', '3', '4', '5'];

    for (const season of orderedKeys) {
        if (seasonData[season]) {
            output += `    '${season}': [\n`;
            seasonData[season].forEach(item => {
                output += `        { rank: ${item.rank}, name: '${item.name}', price: ${item.price} },\n`;
            });
            output += `    ],\n`;
        }
    }

    output += `};\n`;

    fs.writeFileSync('rankingData.ts', output, 'utf8');
    console.log('Successfully generated rankingData.ts');
    console.log('Seasons found:', Object.keys(seasonData));
    for (const s in seasonData) {
        console.log(`Season ${s} count: ${seasonData[s].length}`);
    }

} catch (err) {
    console.error('Error:', err);
}
