const fs = require('fs');
const path = require('path');

// Run the parsePriceData logic
const DATA_FILE_PATH = path.join(__dirname, '../data/item-price-trends-raw.md');
const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
const dateBlocks = fileContent.split(/^### /m).filter(block => block.trim());

const lastBlock = dateBlocks[dateBlocks.length - 1];
console.log("Last block header:", lastBlock.split('\n')[0]);

const ethernelLines = lastBlock.split('\n').filter(l => l.includes('에테르넬') || l.startsWith('- 모자') || l.startsWith('- 상의') || l.startsWith('- 하의') || l.startsWith('- 견장') || l.startsWith('- 신발') || l.startsWith('- 장갑') || l.startsWith('- 망토'));
console.log("\nEthernel lines in last block:");
console.log(ethernelLines.join('\n'));

// Let's test the regex
ethernelLines.forEach(line => {
    const parts = line.substring(1).split(':');
    const rawItemName = parts[0].trim();
    if (parts[1]) {
        const jobMatch = parts[1].match(/\(([^)]+)\)/);
        if (jobMatch) {
            const jobPrices = jobMatch[1];
            const warriorMatch = jobPrices.match(/전([\d.]+)/);
            const mageMatch = jobPrices.match(/마([\d.]+)/);
            const archerMatch = jobPrices.match(/궁([\d.]+)/);
            const thiefMatch = jobPrices.match(/도([\d.]+)/);
            const pirateMatch = jobPrices.match(/해([\d.]+)/);
            console.log(`Parsed [${rawItemName}]:`, {
                warrior: warriorMatch ? warriorMatch[1] : null,
                mage: mageMatch ? mageMatch[1] : null,
                archer: archerMatch ? archerMatch[1] : null,
                thief: thiefMatch ? thiefMatch[1] : null,
                pirate: pirateMatch ? pirateMatch[1] : null,
            });
        }
    }
});
