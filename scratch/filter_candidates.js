const fs = require('fs');

const candidates = JSON.parse(fs.readFileSync('scratch/image_candidates.json', 'utf8'));
const darmoreList = candidates.filter(c => c.alt.includes('다르모어') || c.alt.includes('제른') || c.alt.includes('아론') || c.alt.includes('애런') || c.alt.includes('신왕'));

console.log(darmoreList);
