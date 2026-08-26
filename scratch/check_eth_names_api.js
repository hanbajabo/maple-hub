const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scratch/mitemprice_full_api.json', 'utf8'));
const items = raw.data;

const ethItems = items.filter(i => i.name.includes('에테르넬') && i.server === 'scania');
console.log(`Found ${ethItems.length} Ethernel items in API:`);
ethItems.forEach(i => {
    const last = i.priceHistory && i.priceHistory.length > 0 ? i.priceHistory[i.priceHistory.length - 1] : null;
    console.log(`- "${i.name}": last date=${last ? last.date : 'none'}, price=${last ? last.price : 'none'}`);
});
