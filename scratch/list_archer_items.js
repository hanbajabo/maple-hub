const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scratch/mitemprice_full_api.json', 'utf8'));
const items = raw.data;

const archerItems = items.filter(i => i.name.includes('아처') && i.server === 'scania');
console.log("Archer items:", archerItems.map(i => i.name));
