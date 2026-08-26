const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scratch/mitemprice_full_api.json', 'utf8'));
const items = raw.data;

const suit = items.find(i => i.name === '에테르넬 아처슈트' && i.server === 'scania');
console.log("Archer suit:", suit ? suit.priceHistory.slice(-5) : "Not found");
