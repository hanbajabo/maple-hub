// 직업 추천 순위 계산 및 출력 (독립 실행형)
// 사용법: node calculate-rankings.js

// 간단한 데이터 로딩 (실제 파일에서 import하는 대신 직접 포함)
const JOBS = [
    '나이트로드', '렌', '메르세데스', '히어로', '아크메이지(썬,콜)', '아란', '나이트워커',
    '미하일', '아크', '카데나', '키네시스', '데몬슬레이어', '패스파인더', '윈드브레이커',
    '와일드헌터', '아델', '소울마스터', '은월', '신궁', '제논', '엔젤릭버스터', '호영',
    '듀얼블레이드', '루미너스', '카인', '팬텀', '섀도어', '라라', '비숍', '플레임위자드',
    '캐논슈터', '일리움', '칼리', '팔라딘', '바이퍼', '보우마스터', '블래스터', '캡틴',
    '메카닉', '배틀메이지', '다크나이트', '데몬어벤져', '에반', '제로', '아크메이지(불,독)',
    '카이저', '스트라이커'
];

console.log('📊 직업 추천 순위 시스템을 실행하려면 TypeScript 파일을 먼저 컴파일해야 합니다.');
console.log('');
console.log('다음 명령어를 실행하세요:');
console.log('');
console.log('1. TypeScript 컴파일:');
console.log('   cd maple-hub/data/job-recommendation');
console.log('   npx tsc job-ranking-system.ts --module commonjs --target es2015');
console.log('');
console.log('2. 순위 출력:');
console.log('   node print-rankings.js');
console.log('');
console.log('또는 직접 TypeScript 실행:');
console.log('   npx ts-node job-ranking-system.ts');
