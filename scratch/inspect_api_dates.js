const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scratch/mitemprice_full_api.json', 'utf8'));
const items = raw.data;

console.log(`Total items in API: ${items.length}`);

const datesSet = new Set();
const itemNames = new Set();

items.forEach(item => {
    itemNames.add(`${item.name} (${item.server})`);
    if (item.priceHistory) {
        item.priceHistory.forEach(h => {
            if (h.date) datesSet.add(h.date);
        });
    }
});

const allDates = [...datesSet].sort();
console.log(`Total unique dates: ${allDates.length}`);
console.log(`Date range: ${allDates[0]} ~ ${allDates[allDates.length - 1]}`);
console.log(`Dates >= 2026-04-16:`, allDates.filter(d => d >= '2026-04-16'));

console.log(`\nUnique items (${itemNames.size}):`);
console.log([...itemNames].slice(0, 30));
