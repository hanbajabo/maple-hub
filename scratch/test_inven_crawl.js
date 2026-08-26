const fs = require('fs');

const content = fs.readFileSync('C:/Users/USER/.gemini/antigravity/brain/45633820-255f-4ba7-b543-1b3c80e67f3b/.system_generated/steps/17126/content.md', 'utf8');

// match articles
const regex = /<a[^>]+href="([^"]+)"[^>]*class="subject-link"[^>]*>([\s\S]*?)<\/a>/g;
let match;
let count = 0;
while ((match = regex.exec(content)) !== null && count < 20) {
    const url = match[1];
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    console.log(`[${count + 1}] ${text} -> ${url}`);
    count++;
}

if (count === 0) {
    console.log("No subject-link matches, testing alternative regexes...");
    const regex2 = /href="(https:\/\/www\.inven\.co\.kr\/board\/maple\/5974\/\d+[^"]*)"/g;
    while ((match = regex2.exec(content)) !== null && count < 10) {
        console.log(`Link: ${match[1]}`);
        count++;
    }
}
