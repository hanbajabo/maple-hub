const fs = require('fs');

const f = fs.readFileSync('scratch/scouter_chunks_8153-3837c5ee84adb2d3.js', 'utf8');

const idx = f.indexOf('searchCharacter');
if (idx !== -1) {
    console.log('--- searchCharacter implementation ---');
    console.log(f.slice(Math.max(0, idx - 50), idx + 800));
}
