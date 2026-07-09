const fs = require('fs');
const readline = require('readline');
const path = require('path');

// 요약본 transcript.jsonl 대신 풀버전인 transcript_full.jsonl 로딩
const logPath = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\45633820-255f-4ba7-b543-1b3c80e67f3b\\.system_generated\\logs\\transcript_full.jsonl';
const filePath = 'c:\\Users\\USER\\Desktop\\maple-colosseum\\maple-hub\\app\\guide\\exp-calculator\\ExpCalculatorClient.tsx';

const stepsToApply = [
    1360, 1370,
    1394, 1406, 1412, 1432, 1446, 1456,
    1478,
    1502,
    1596,
    1604,
    1610
];

const toolCallsByStep = {};

const rl = readline.createInterface({
    input: fs.createReadStream(logPath),
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    try {
        const data = JSON.parse(line);
        if (data.type === 'PLANNER_RESPONSE' && data.tool_calls && stepsToApply.includes(data.step_index)) {
            toolCallsByStep[data.step_index] = data.tool_calls;
        }
    } catch (e) {
        // 무시
    }
});

rl.on('close', () => {
    console.log('Full transcript parsing completed. Applying modifications...');
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    for (const step of stepsToApply) {
        const calls = toolCallsByStep[step];
        if (!calls) {
            console.warn(`Warning: No tool calls found for step ${step}`);
            continue;
        }
        
        console.log(`Applying step ${step}...`);
        
        for (const tool of calls) {
            if ((tool.name === 'replace_file_content' || tool.name === 'multi_replace_file_content') && 
                tool.args && 
                tool.args.TargetFile && 
                tool.args.TargetFile.includes('ExpCalculatorClient.tsx')) {
                
                if (tool.name === 'replace_file_content') {
                    const target = tool.args.TargetContent;
                    const replacement = tool.args.ReplacementContent;
                    
                    if (content.indexOf(target) === -1) {
                        const normalizedTarget = target.replace(/\r\n/g, '\n');
                        const normalizedContent = content.replace(/\r\n/g, '\n');
                        const index = normalizedContent.indexOf(normalizedTarget);
                        
                        if (index !== -1) {
                            content = normalizedContent.replace(normalizedTarget, replacement.replace(/\r\n/g, '\n'));
                            console.log(`  [OK] Step ${step} applied with line-ending normalization`);
                        } else {
                            console.error(`  [ERROR] Step ${step}: Target content not found (even with normalization)!`);
                        }
                    } else {
                        content = content.replace(target, replacement);
                        console.log(`  [OK] Step ${step} applied directly`);
                    }
                } else if (tool.name === 'multi_replace_file_content') {
                    let chunks = tool.args.ReplacementChunks;
                    if (typeof chunks === 'string') {
                        try {
                            const cleaned = chunks
                                .replace(/\r\n/g, '\\n')
                                .replace(/\n/g, '\\n')
                                .replace(/\r/g, '\\r');
                            chunks = JSON.parse(cleaned);
                        } catch (e) {
                            console.error(`  [ERROR] Step ${step}: Failed to parse ReplacementChunks string`, e);
                            continue;
                        }
                    }
                    
                    if (chunks && Array.isArray(chunks)) {
                        chunks.forEach((chunk, idx) => {
                            const target = chunk.TargetContent;
                            const replacement = chunk.ReplacementContent;
                            
                            if (content.indexOf(target) === -1) {
                                const normalizedTarget = target.replace(/\r\n/g, '\n');
                                const normalizedContent = content.replace(/\r\n/g, '\n');
                                const index = normalizedContent.indexOf(normalizedTarget);
                                
                                if (index !== -1) {
                                    content = normalizedContent.replace(normalizedTarget, replacement.replace(/\r\n/g, '\n'));
                                    console.log(`  [OK] Step ${step} chunk ${idx} applied with line-ending normalization`);
                                } else {
                                    console.error(`  [ERROR] Step ${step} chunk ${idx}: Target not found!`);
                                }
                            } else {
                                content = content.replace(target, replacement);
                                console.log(`  [OK] Step ${step} chunk ${idx} applied directly`);
                            }
                        });
                    } else {
                        console.error(`  [ERROR] Step ${step}: chunks is not an array`, chunks);
                    }
                }
            }
        }
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Reconstruction process completed successfully!');
});
