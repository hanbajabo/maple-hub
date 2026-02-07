const fs = require('fs');
const https = require('https');
const path = require('path');

const url = "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbHkMv0%2FbtsLjU7f6fB%2F8mK8U0M7K5K5K5K5K5K5K5%2Fimg.jpg";
const dest = "c:/Users/USER/Desktop/maple-colosseum/maple-hub/public/images/blog/haste_beyond_banner.jpg";

// 폴더가 없으면 생성
const dir = path.dirname(dest);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const file = fs.createWriteStream(dest);

console.log('Downloading image...');
https.get(url, (response) => {
    if (response.statusCode !== 200) {
        console.error(`Failed to download image. Status code: ${response.statusCode}`);
        return;
    }
    response.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log('Download completed successfully!');
        process.exit(0);
    });
}).on('error', (err) => {
    fs.unlink(dest, () => { });
    console.error(`Error: ${err.message}`);
    process.exit(1);
});
