const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scratch/mitemprice_full_api.json', 'utf8'));
const items = raw.data;

const ethScania = items.filter(i => i.name.includes('에테르넬') && i.server === 'scania');
console.log("All Ethernel scania items count:", ethScania.length);
console.log(ethScania.map(i => i.name).sort());
