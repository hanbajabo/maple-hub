const fs = require('fs');

const f = fs.readFileSync('scratch/scouter_chunks_8153-3837c5ee84adb2d3.js', 'utf8');

const idx = f.indexOf('50946:');
if (idx !== -1) {
    console.log('--- Module 50946 (API Endpoints Definition) ---');
    console.log(f.slice(idx, idx + 1500));
}
