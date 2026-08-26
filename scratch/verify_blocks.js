const fs = require('fs');
const path = require('path');

const DATA_FILE_PATH = path.join(__dirname, '../data/item-price-trends-raw.md');
const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
const dateBlocks = fileContent.split(/^### /m).filter(block => block.trim());

console.log(`Total date blocks: ${dateBlocks.length}`);
console.log(`First date block: ${dateBlocks[0].split('\n')[0]}`);
console.log(`Last date block: ${dateBlocks[dateBlocks.length - 1].split('\n')[0]}`);
