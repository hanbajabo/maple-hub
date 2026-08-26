const fs = require('fs');

const f2 = fs.readFileSync('scratch/bundle_4850-dba99f3953be46a2.js', 'utf8');

// Find all job entries defined in this matrix object
const jobNames = [
    '히어로', '팔라딘', '다크나이트',
    '아크메이지(불,독)', '아크메이지(썬,콜)', '비숍',
    '보우마스터', '신궁', '패스파인더',
    '나이트로드', '섀도어', '듀얼블레이드',
    '바이퍼', '캡틴', '캐논슈터',
    '미하일', '소울마스터', '플레임위자드', '윈드브레이커', '나이트워커', '스트라이커',
    '아란', '에반', '루미너스', '메르세데스', '팬텀', '은월',
    '데몬슬레이어', '데몬어벤져', '블래스터', '배틀메이지', '와일드헌터', '메카닉', '제논',
    '카이저', '카인', '카데나', '엔젤릭버스터',
    '아델', '일리움', '칼리', '아크',
    '라라', '호영', '제로', '키네시스', '렌'
];

console.log('--- Checking all jobs in dataset ---');
const foundJobs = [];
jobNames.forEach(name => {
    if (f2.includes(`${name}:`)) {
        foundJobs.push(name);
    }
});

console.log(`Found ${foundJobs.length} / ${jobNames.length} jobs in the dataset!`);
console.log('Jobs:', foundJobs.join(', '));
