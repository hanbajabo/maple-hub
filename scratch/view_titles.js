const fs = require('fs');
const path = require('path');

const dataPath = 'c:\\Users\\USER\\Desktop\\maple-colosseum\\maple-hub\\scratch\\magician_boards_data.json';
if (!fs.existsSync(dataPath)) {
    console.error("No boards data found!");
    process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

for (const [job, posts] of Object.entries(data)) {
    console.log(`\n======================= ${job} (${posts.length} posts) =======================`);
    posts.forEach((p, idx) => {
        console.log(`${idx + 1}. ${p.text}`);
    });
}
