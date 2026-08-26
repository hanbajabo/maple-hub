const fs = require('fs');

const html = fs.readFileSync('scratch/scouter_result.html', 'utf8');

// Concatenate all RSC chunks
const regex = /self\.__next_f\.push\(\[1,"(.*)"\]\)/g;
let fullPayload = '';
let match;
while ((match = regex.exec(html)) !== null) {
    try {
        const decoded = JSON.parse(`"${match[1]}"`);
        fullPayload += decoded;
    } catch (e) {
        fullPayload += match[1];
    }
}

fs.writeFileSync('scratch/full_rsc_payload.txt', fullPayload, 'utf8');
console.log('Payload extracted length:', fullPayload.length);

// Search for key words in payload
const lines = fullPayload.split('\n');
console.log('Total payload lines:', lines.length);

// Find lines containing 환산 or score or items
const keywords = ['환산', '보스', '전투력', 'stat', 'spec', 'preset'];
keywords.forEach(kw => {
    const found = fullPayload.indexOf(kw);
    console.log(`Keyword "${kw}" found at index:`, found);
});
