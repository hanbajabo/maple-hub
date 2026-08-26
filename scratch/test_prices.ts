import { getLatestItemPrices, getLatestEthernelPrice } from '../lib/parsePriceData';

const prices = getLatestItemPrices();
console.log('=== Latest Item Prices from item-price-tracker-2026 ===');
console.log(prices);
console.log('Ethernel Hat:', getLatestEthernelPrice('모자'));
console.log('Ethernel Top:', getLatestEthernelPrice('상의'));
console.log('Ethernel Shoe:', getLatestEthernelPrice('신발'));
