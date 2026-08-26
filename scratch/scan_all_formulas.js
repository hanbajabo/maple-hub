const fs = require('fs');

// Read all key scouter chunks
const chunkFiles = fs.readdirSync('scratch').filter(f => f.startsWith('scouter_chunks_'));
console.log(`Analyzing ${chunkFiles.length} chunk files for complete calculation system...`);

// Let's search for all boss cut thresholds, boss defense data, core equations, and spec scoring
const bossList = [];
const formulaData = {};

chunkFiles.forEach(file => {
    const content = fs.readFileSync(`scratch/${file}`, 'utf8');
    
    // Check for boss cuts / boss requirements
    if (content.includes('칼로스') || content.includes('카링') || content.includes('림보') || content.includes('세렌')) {
        const bossMatches = content.match(/["'](?:이지|노말|하드|익스트림)\s*[\uAC00-\uD7A3]+["']/g) || [];
        if (bossMatches.length > 0) {
            bossMatches.forEach(b => {
                const clean = b.replace(/["']/g, '');
                if (!bossList.includes(clean)) bossList.push(clean);
            });
        }
    }
});

console.log('Found Bosses in dataset:', bossList);
