const fs = require('fs');

const f2 = fs.readFileSync('scratch/bundle_4850-dba99f3953be46a2.js', 'utf8');

const mageSearch = ['불독', '썬콜', '아크메이지', '플레임위자드', '비숍', '에반', '루미너스', '일리움', '라라', '배틀메이지'];
mageSearch.forEach(m => {
    const idx = f2.indexOf(m);
    if (idx !== -1) {
        console.log(`Found ${m} around:`, f2.slice(idx, idx + 80));
    }
});
