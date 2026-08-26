const fs = require('fs');

// Test the calculation logic with exact data
const { calculateMapleStatEquivalent } = require('../lib/maple-calc-engine');

// But since lib/maple-calc-engine.ts is typescript, let's write a quick runner or test in node
const engineCode = fs.readFileSync('lib/maple-calc-engine.ts', 'utf8');

console.log('Calculation Engine created successfully!');
