const fs = require('fs');
const readline = require('readline');

const logPath = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\45633820-255f-4ba7-b543-1b3c80e67f3b\\.system_generated\\logs\\transcript_full.jsonl';

const rl = readline.createInterface({
    input: fs.createReadStream(logPath),
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    try {
        const data = JSON.parse(line);
        if (data.type === 'PLANNER_RESPONSE' && data.tool_calls) {
            for (const call of data.tool_calls) {
                if (call.args && call.args.TargetFile && call.args.TargetFile.includes('testworld-archer-6th-skill-reaction')) {
                    if (call.name === 'write_to_file') {
                        console.log("Found untruncated write_to_file!");
                        fs.writeFileSync('scratch/original_page_tsx.txt', call.args.CodeContent, 'utf8');
                    }
                }
            }
        }
    } catch (e) {
        // ignore
    }
});
