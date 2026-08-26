const fs = require('fs');

const f1 = fs.readFileSync('scratch/bundle_9124-c01ae5954577dc8d.js', 'utf8');
const f2 = fs.readFileSync('scratch/bundle_4850-dba99f3953be46a2.js', 'utf8');

console.log('--- File 1 snippet with 히어로 ---');
const idx1 = f1.indexOf('히어로');
console.log(f1.slice(Math.max(0, idx1 - 100), idx1 + 400));

console.log('--- File 2 snippet with 히어로 ---');
const idx2 = f2.indexOf('히어로');
console.log(f2.slice(Math.max(0, idx2 - 100), idx2 + 400));
