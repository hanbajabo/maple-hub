const fs = require('fs');

try {
    // Read the complete ranking_raw.txt file directly
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
            // Season 2+ are in 10,000 units (만원 단위)
            return Math.floor(val * 10000);
        }
    }

    let rankCounter = 1;
    let lastValidPrice = 0; // Track the last valid price for items without explicit price

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        let line = lines[lineIndex].trim();
        if (!line) continue;

        // Detect Season Headers
        if (line.includes('시즌1') || line === '시즌1') {
            currentSeason = '1';
            rankCounter = 1;
            lastValidPrice = 0;
            continue;
        } else if (line.includes('시즌2') && !line.includes('2.5')) {
            currentSeason = '2';
            rankCounter = 1;
            lastValidPrice = 0;
            continue;
        } else if (line.includes('시즌 2.5') || line.includes('시즌2.5')) {
            currentSeason = '2.5';
            rankCounter = 1;
            lastValidPrice = 0;
            continue;
        } else if (line.includes('시즌3')) {
            currentSeason = '3';
            rankCounter = 1;
            lastValidPrice = 0;
            continue;
        } else if (line.includes('시즌4')) {
            currentSeason = '4';
            rankCounter = 1;
            lastValidPrice = 0;
            continue;
        } else if (line.includes('시즌5')) {
            currentSeason = '5';
            rankCounter = 1;
            lastValidPrice = 0;
            continue;
        }

        // Skip non-data lines (including lines starting with -)
        if (line.startsWith('-')) continue;
        if (line.toLowerCase().startsWith('top')) continue;
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
                    lastValidPrice = price;
                    seasonData[currentSeason].push({
                        rank: rankCounter++,
                        name: name,
                        price: price
                    });
                }
            }
        } else {
            // Season 2+: Multiple formats possible
            // Format 1: "Name Price ..." (e.g., "소녀 1200 (10) 0205")
            // Format 2: "Price Name ..." (e.g., "99 칠흑 (14) 0126")
            // Format 3: "Name ..." (no price, e.g., "비서 (23) 0128")

            // Debug: Log last few lines of season 5
            if (currentSeason === '5' && lineIndex >= 3806) {
                console.log(`Line ${lineIndex + 1}: [${line}]`);
            }

            // Check if line starts with a number (could be price)
            if (/^[\d\.]+/.test(line)) {
                // Starts with number - could be "Price Name" or just a number
                const match = line.match(/^([\d\.\+\-]+)\s+(\S+)/);
                if (match) {
                    const firstNum = match[1];
                    const secondPart = match[2];

                    price = parsePrice(firstNum, false);
                    name = secondPart;

                    if (currentSeason === '5' && lineIndex >= 3806) {
                        console.log(`  -> Parsed as Price-Name: price=${price}, name=${name}`);
                    }

                    if (name && price > 0) {
                        lastValidPrice = price;
                        seasonData[currentSeason].push({
                            rank: rankCounter++,
                            name: name,
                            price: price
                        });
                    }
                }
            } else {
                // Starts with string (name)
                // Try to extract price from the line
                const matchWithPrice = line.match(/^(\S+)\s+([\d\.\+\-]+)/);

                if (matchWithPrice) {
                    // Format: "Name Price ..."
                    name = matchWithPrice[1];
                    price = parsePrice(matchWithPrice[2], false);

                    if (currentSeason === '5' && lineIndex >= 3806) {
                        console.log(`  -> Parsed as Name-Price: name=${name}, price=${price}`);
                    }

                    if (name && price > 0) {
                        lastValidPrice = price;
                        seasonData[currentSeason].push({
                            rank: rankCounter++,
                            name: name,
                            price: price
                        });
                    }
                } else {
                    // Format: "Name ..." (no price)
                    // Extract just the name before any parentheses
                    const nameMatch = line.match(/^(\S+)/);

                    if (currentSeason === '5' && lineIndex >= 3806) {
                        console.log(`  -> Parsed as Name-Only: name=${nameMatch ? nameMatch[1] : 'none'}, lastValidPrice=${lastValidPrice}`);
                    }

                    if (nameMatch && lastValidPrice > 0) {
                        name = nameMatch[1];
                        // Use the last valid price for items without explicit price
                        seasonData[currentSeason].push({
                            rank: rankCounter++,
                            name: name,
                            price: lastValidPrice
                        });
                    }
                }
            }
        }
    }

    // Generate TypeScript file with proper encoding
    let output = `export interface RankingData {
    rank: number;
    name: string;
    price: number;
    season?: string;
}

export const seasonData: { [key: string]: RankingData[] } = {
`;

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

    // Write with UTF-8 BOM to ensure proper encoding
    fs.writeFileSync('rankingData.ts', '\ufeff' + output, 'utf8');

    console.log('✅ Successfully generated rankingData.ts with UTF-8 encoding');
    console.log('📊 Seasons found:', Object.keys(seasonData));
    let totalEntries = 0;
    for (const s in seasonData) {
        const count = seasonData[s].length;
        totalEntries += count;
        console.log(`   Season ${s.padEnd(3)}: ${count} entries`);
    }
    console.log(`📈 Total entries: ${totalEntries}`);

    // Show last 5 items of season 5
    if (seasonData['5']) {
        console.log('\n🔍 시즌5 마지막 5개 항목:');
        seasonData['5'].slice(-5).forEach(item => {
            console.log(`   ${item.rank}. ${item.name} - ${item.price}`);
        });
    }

} catch (err) {
    console.error('❌ Error:', err);
}
