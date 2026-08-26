const fs = require('fs');

const f2 = fs.readFileSync('scratch/bundle_4850-dba99f3953be46a2.js', 'utf8');

// Look for endpoints or ranking paths
const lines = f2.split(';');
console.log('Total statements in bundle:', lines.length);

const rankingMatches = f2.match(/\/api\/[a-zA-Z0-9_\-\/]+/g) || [];
console.log('API matches in bundle:', Array.from(new Set(rankingMatches)));
