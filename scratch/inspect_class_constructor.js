const fs = require('fs');

const f = fs.readFileSync('scratch/scouter_chunks_8153-3837c5ee84adb2d3.js', 'utf8');

const idx = f.indexOf('class _');
if (idx !== -1) {
    console.log('--- Class _ constructor and fields ---');
    console.log(f.slice(idx, idx + 800));
}
