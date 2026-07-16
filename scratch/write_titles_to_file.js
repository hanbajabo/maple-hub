const fs = require('fs');

const dataPath = 'c:\\Users\\USER\\Desktop\\maple-colosseum\\maple-hub\\scratch\\magician_boards_data.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let output = '';
for (const [job, posts] of Object.entries(data)) {
    output += `\n======================= ${job} (${posts.length} posts) =======================\n`;
    posts.forEach((p, idx) => {
        output += `${idx + 1}. ${p.text}\n`;
    });
}

fs.writeFileSync('c:\\Users\\USER\\Desktop\\maple-colosseum\\maple-hub\\scratch\\all_magician_titles.txt', output, 'utf8');
console.log("Written to scratch/all_magician_titles.txt");
