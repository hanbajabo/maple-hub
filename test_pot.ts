import { calculateExactPotentialExpectation } from './lib/potential-calculator';
const potTarget = { 'ATTACK %': 18, 'IGNORE_DEFENSE': 30 };
console.log(calculateExactPotentialExpectation('엠블렘', 'LEGENDARY', 100, [potTarget], 'POTENTIAL'));
