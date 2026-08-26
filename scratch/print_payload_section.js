const fs = require('fs');

const payload = fs.readFileSync('scratch/full_rsc_payload.txt', 'utf8');

// Find all JSON objects in payload
console.log('--- Substring around 환산 (index 35000 ~ 38000) ---');
console.log(payload.slice(35000, 38700));
