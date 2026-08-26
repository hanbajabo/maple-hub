const fs = require('fs');
const lines = fs.readFileSync('data/item-price-trends-raw.md', 'utf8').split('\n');
console.log(lines.slice(-80).join('\n'));
