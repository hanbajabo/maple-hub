const fs = require('fs');

const logPath = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\45633820-255f-4ba7-b543-1b3c80e67f3b\\.system_generated\\logs\\transcript_full.jsonl';

fs.readFile(logPath, 'utf8', (err, data) => {
    if (err) throw err;
    const lines = data.split('\n');
    for (const line of lines) {
        if (!line.trim()) continue;
        const json = JSON.parse(line);
        if (json.step_index === 1446) {
            const chunks = typeof json.tool_calls[0].args.ReplacementChunks === 'string' ? JSON.parse(json.tool_calls[0].args.ReplacementChunks) : json.tool_calls[0].args.ReplacementChunks;
            console.log('--- REPLACEMENT CONTENT OF CHUNK 2 ---');
            console.log(chunks[2].ReplacementContent);
            break;
        }
    }
});
