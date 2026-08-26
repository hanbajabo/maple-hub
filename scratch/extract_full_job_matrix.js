const fs = require('fs');

const f2 = fs.readFileSync('scratch/bundle_4850-dba99f3953be46a2.js', 'utf8');

// Let's locate where the job dictionary starts and ends in f2
const startMarker = '히어로:{main:"STR"';
const startIndex = f2.indexOf(startMarker);
console.log('Start index of job matrix:', startIndex);

if (startIndex !== -1) {
    // Find the opening brace before 히어로
    let openBraceIndex = f2.lastIndexOf('{', startIndex);
    console.log('Open brace index:', openBraceIndex);

    // Let's extract around 30000 characters from openBraceIndex to capture all jobs
    const snippet = f2.slice(openBraceIndex, openBraceIndex + 40000);
    fs.writeFileSync('scratch/raw_job_matrix_snippet.txt', snippet, 'utf8');
    console.log('Saved raw snippet of length:', snippet.length);
}
