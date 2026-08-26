const fs = require('fs');

const chunkFiles = fs.readdirSync('scratch').filter(f => f.startsWith('scouter_chunks_'));

console.log('Searching for exact calculation of boss380_stat across all chunks...');

chunkFiles.forEach(file => {
    const content = fs.readFileSync(`scratch/${file}`, 'utf8');
    
    // Look for boss380_stat = or boss380_stat:
    let idx = 0;
    while ((idx = content.indexOf('boss380_stat', idx)) !== -1) {
        console.log(`\n[Found in ${file} at ${idx}]:`);
        console.log(content.slice(Math.max(0, idx - 150), idx + 250));
        idx += 12;
    }
});
