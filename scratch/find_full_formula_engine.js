const fs = require('fs');

const files = fs.readdirSync('scratch').filter(f => f.startsWith('scouter_chunks_'));

console.log(`Searching across ${files.length} chunk files for calculation engine...`);

files.forEach(file => {
    const content = fs.readFileSync(`scratch/${file}`, 'utf8');
    
    if (content.includes('maple_scouter_const') || content.includes('boss380_stat =') || content.includes('boss380_stat:')) {
        console.log(`[FOUND ENGINE IN]: ${file}`);
        
        // Find function names or logic
        const matches = content.match(/[a-zA-Z0-9_$]+\s*=\s*function|\bfunction\s+[a-zA-Z0-9_$]+|\bclass\s+[a-zA-Z0-9_$]+/g) || [];
        console.log('Functions/classes:', matches.slice(0, 10));

        // Look for formula calculation
        const idx = content.indexOf('maple_scouter_const');
        if (idx !== -1) {
            console.log('Snippet around maple_scouter_const:', content.slice(Math.max(0, idx - 100), idx + 300));
        }
    }
});
