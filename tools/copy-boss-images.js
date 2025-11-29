const fs = require('fs');
const path = require('path');

const sourceDir = "E:\\영상 편집용 파일들\\영상만든자료들\\20251118 오늘체크 내일시작\\보스 일러스트\\보스 일러스트 최신판";
const targetDir = path.join(__dirname, '../public/images/bosses');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const bossMap = {
    "자쿰": "zakum",
    "카오스 자쿰": "chaos-zakum",
    "매그너스": "magnus",
    "이지 매그너스": "easy-magnus",
    "노말 매그너스": "normal-magnus",
    "하드 매그너스": "hard-magnus",
    "힐라": "hilla",
    "하드 힐라": "hard-hilla",
    "파풀라투스": "papulatus",
    "카오스 파풀라투스": "chaos-papulatus",
    "피에르": "pierre",
    "카오스 피에르": "chaos-pierre",
    "반반": "banban",
    "카오스 반반": "chaos-banban",
    "블러디퀸": "bloody-queen",
    "블러디 퀸": "bloody-queen",
    "카오스 블러디퀸": "chaos-bloody-queen",
    "벨룸": "vellum",
    "카오스 벨룸": "chaos-vellum",
    "핑크빈": "pink-bean",
    "카오스 핑크빈": "chaos-pink-bean",
    "시그너스": "cygnus",
    "노말 시그너스": "normal-cygnus",
    "이지 시그너스": "easy-cygnus",
    "스우": "lotus",
    "노말 스우": "normal-lotus",
    "하드 스우": "hard-lotus",
    "익스트림 스우": "extreme-lotus",
    "데미안": "damien",
    "노말 데미안": "normal-damien",
    "하드 데미안": "hard-damien",
    "가디언 엔젤 슬라임": "guardian-angel-slime",
    "가엔슬": "guardian-angel-slime",
    "노말 가디언 엔젤 슬라임": "normal-guardian-angel-slime",
    "카오스 가디언 엔젤 슬라임": "chaos-guardian-angel-slime",
    "루시드": "lucid",
    "이지 루시드": "easy-lucid",
    "노말 루시드": "normal-lucid",
    "하드 루시드": "hard-lucid",
    "윌": "will",
    "이지 윌": "easy-will",
    "노말 윌": "normal-will",
    "하드 윌": "hard-will",
    "더스크": "dusk",
    "카오스 더스크": "chaos-dusk",
    "듄켈": "dunkel",
    "친위대장 듄켈": "dunkel",
    "하드 듄켈": "hard-dunkel",
    "진 힐라": "jin-hilla",
    "진힐라": "jin-hilla",
    "하드 진 힐라": "hard-jin-hilla",
    "검은 마법사": "black-mage",
    "검은마법사": "black-mage",
    "하드 검은 마법사": "hard-black-mage",
    "익스트림 검은 마법사": "extreme-black-mage",
    "세렌": "seren",
    "선택받은 세렌": "seren",
    "노말 선택받은 세렌": "normal-seren",
    "하드 선택받은 세렌": "hard-seren",
    "익스트림 선택받은 세렌": "extreme-seren",
    "칼로스": "kalos",
    "감시자 칼로스": "kalos",
    "이지 감시자 칼로스": "easy-kalos",
    "노말 감시자 칼로스": "normal-kalos",
    "카오스 감시자 칼로스": "chaos-kalos",
    "익스트림 감시자 칼로스": "extreme-kalos",
    "카링": "kaling",
    "이지 카링": "easy-kaling",
    "노말 카링": "normal-kaling",
    "하드 카링": "hard-kaling",
    "익스트림 카링": "extreme-kaling",
    "림보": "limbo",
    "혼테일": "horntail",
    "카오스 혼테일": "chaos-horntail",
    "아카이럼": "arkarium",
    "노말 아카이럼": "normal-arkarium",
    "반 레온": "von-leon",
    "반레온": "von-leon",
    "하드 반 레온": "hard-von-leon",
    "발드릭스": "baldrix",
    "오멘": "omen",
    "마왕 발록": "balrog",
    "발록": "balrog",
    "우르스": "ursus"
};

try {
    const files = fs.readdirSync(sourceDir);
    console.log(`Found ${files.length} files.`);

    files.forEach(file => {
        if (!file.match(/\.(png|jpg|jpeg|webp)$/i)) return;

        const name = path.parse(file).name;
        const ext = path.parse(file).ext;

        // 매핑 확인 (공백 제거 등 유연하게)
        let engName = bossMap[name] || bossMap[name.replace(/\s+/g, '')];

        if (!engName) {
            console.log(`[WARNING] No mapping for: ${name}`);
            engName = name; // 일단 한글 이름 유지
        }

        const targetPath = path.join(targetDir, `${engName}${ext}`);
        fs.copyFileSync(path.join(sourceDir, file), targetPath);
        console.log(`Copied: ${file} -> ${engName}${ext}`);
    });
} catch (err) {
    console.error("Error:", err);
}
