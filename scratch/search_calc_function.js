const fs = require('fs');

const f2 = fs.readFileSync('scratch/bundle_4850-dba99f3953be46a2.js', 'utf8');

// Check what functions exist in this bundle
const keywords = ['ocid', 'character_name', 'stat', 'final_stat', 'calculate', '환산', 'score', 'hexa'];
keywords.forEach(kw => {
    const idx = f2.indexOf(kw);
    if (idx !== -1) {
        console.log(`Keyword "${kw}" found in f2 at ${idx}:`, f2.slice(idx, idx + 100));
    }
});
