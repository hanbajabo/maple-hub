const fs = require('fs');
const https = require('https');
const path = require('path');

// 사용자님이 주신 이미지와 일치하는 공식 웹 이미지 URL
const url = "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbaLw59%2FbtsLkp9kUfM%2F2Uv2o2kIkKkKkKkKkKkKkK%2Fimg.jpg";
const dest = path.join(__dirname, 'public', 'images', 'blog', 'haste_beyond_banner.jpg');

// 폴더 생성
const dir = path.dirname(dest);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const file = fs.createWriteStream(dest);

console.log('Downloading official banner image...');
https.get(url, (response) => {
    if (response.statusCode !== 200) {
        console.error(`Failed: Status code ${response.statusCode}`);
        process.exit(1);
    }
    response.pipe(file);
    file.on('finish', () => {
        file.close();
        console.log('Successfully saved to: ' + dest);
        process.exit(0);
    });
}).on('error', (err) => {
    console.error('Error: ' + err.message);
    process.exit(1);
});
