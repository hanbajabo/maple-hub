const fs = require('fs');

const items = JSON.parse(fs.readFileSync('scratch/adel_items_full.json', 'utf8'));

// Adele is server #2 overall, with full 26~28 star Ethernael / Darkness / Luminary sets!
console.log('Calculating ultimate endgame spec-up paths for Adele...');
