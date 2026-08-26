const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../data/item-price-trends-raw.md');
const existing = fs.readFileSync(targetPath, 'utf8');

// Ensure we don't duplicate
const generated = fs.readFileSync('scratch/generated_prices_apr_to_aug.md', 'utf8');

if (existing.includes('### 2026-08-26')) {
    console.log("Already updated with 2026-08-26!");
} else {
    const updated = existing.trim() + '\n\n' + generated.trim() + '\n';
    fs.writeFileSync(targetPath, updated, 'utf8');
    console.log(`Successfully appended new data to ${targetPath}!`);
    console.log(`Original size: ${existing.length}, New size: ${updated.length}`);
}
