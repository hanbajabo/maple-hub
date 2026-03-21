const fs = require('fs');
async function test() {
    const formData = new FormData();
    formData.append('level', '215');
    formData.append('field_type', 'yamyam');
    formData.append('character_name', '');

    const res = await fetch('https://mapleroad.kr/lib/calculator/field', {
        method: 'POST',
        body: formData,
        headers: {
            'User-Agent': 'Mozilla/5.0'
        }
    });
    
    const text = await res.text();
    console.log(text);
}
test();
