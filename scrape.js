const https = require('https');

https.get('https://maplestory.nexon.com/News/CashShop', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const regex = /<img[^>]+src=["']([^"']+\.(?:png|jpg|jpeg|gif))["']/g;
    let match;
    const urls = new Set();
    while ((match = regex.exec(data)) !== null) {
      urls.add(match[1]);
    }
    console.log(Array.from(urls).join('\n'));
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
