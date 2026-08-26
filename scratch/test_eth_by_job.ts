import { getPriceData } from '../lib/parsePriceData';

const data = getPriceData();
const latest = data[data.length - 1];
console.log('Latest date:', latest.date);
console.log('Items keys count:', Object.keys(latest.items).length);
console.log('Ethernel by job:', latest.ethernelByJob);
