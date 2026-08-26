const fs = require('fs');

const f = fs.readFileSync('scratch/scouter_chunks_8153-3837c5ee84adb2d3.js', 'utf8');

// Look for CHARACTER_SEARCH in f
const idx = f.indexOf('CHARACTER_SEARCH:');
if (idx !== -1) {
    console.log('--- Where CHARACTER_SEARCH is used ---');
    // Search for references to Sn.CHARACTER_SEARCH or r.CHARACTER_SEARCH
    let p = 0;
    while ((p = f.indexOf('CHARACTER_SEARCH', p)) !== -1) {
        console.log(f.slice(Math.max(0, p - 80), p + 200));
        console.log('-----------------------------------');
        p += 16;
    }
}
