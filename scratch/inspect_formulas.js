const fs = require('fs');

const files = [
    'scratch/scouter_chunks_8153-3837c5ee84adb2d3.js',
    'scratch/scouter_chunks_3903-09290575beee6157.js',
    'scratch/scouter_chunks_2051-9a9d233adc826118.js',
    'scratch/scouter_chunks_9037-c0719594c790798e.js'
];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    const content = fs.readFileSync(file, 'utf8');
    console.log(`\n=================== FILE: ${file} ===================`);
    
    // Look for 380 defense calculation
    const idx380 = content.indexOf('380');
    if (idx380 !== -1) {
        console.log('[Snippet around 380]:', content.slice(Math.max(0, idx380 - 150), idx380 + 350));
    }

    // Look for 환산 calculation
    const idxHwansan = content.indexOf('환산');
    if (idxHwansan !== -1) {
        console.log('[Snippet around 환산]:', content.slice(Math.max(0, idxHwansan - 100), idxHwansan + 300));
    }
});
