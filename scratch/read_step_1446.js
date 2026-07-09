const fs = require('fs');

const logPath = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\45633820-255f-4ba7-b543-1b3c80e67f3b\\.system_generated\\logs\\transcript_full.jsonl';

fs.readFile(logPath, 'utf8', (err, data) => {
    if (err) throw err;
    const lines = data.split('\n');
    for (const line of lines) {
        if (!line.trim()) continue;
        const json = JSON.parse(line);
        if (json.step_index === 1446) {
            console.log(JSON.stringify(json, null, 2));
            break;
        }
    }
});
