const fs = require('fs');

const f = fs.readFileSync('scratch/scouter_chunks_8153-3837c5ee84adb2d3.js', 'utf8');

// Look for class definitions in this file
const classMatches = f.match(/class\s+([a-zA-Z0-9_$]+)\s*\{([^}]+)\}/g) || [];
console.log(`Found ${classMatches.length} classes in chunk!`);

// Print methods of these classes
const methodRegex = /([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*\{/g;
let m;
const methods = [];
while ((m = methodRegex.exec(f)) !== null) {
    methods.push(m[1]);
}
console.log('Sample methods in chunk:', Array.from(new Set(methods)).slice(0, 30));
