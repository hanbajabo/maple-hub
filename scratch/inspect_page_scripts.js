const fs = require('fs');

const p1 = fs.readFileSync('scratch/hanja_result_payload.txt', 'utf8');
const p2 = fs.readFileSync('scratch/hanja_info_payload.txt', 'utf8');

console.log('Result payload length:', p1.length);
console.log('Info payload length:', p2.length);

// Let's check how the character data is fetched in maplescouter
// Look for API endpoints in the page bundle or scripts
const html = fs.readFileSync('scratch/hanja_info.html', 'utf8');
const scriptMatches = html.match(/\/_next\/static\/chunks\/app\/\[locale\]\/\(pages\)\/[a-zA-Z0-9\-_/.]+\.js/g) || [];
console.log('Page scripts:', scriptMatches);
