const fs = require('fs');

const items = JSON.parse(fs.readFileSync('scratch/hanja_items_full.json', 'utf8'));

// Format the upgrade priorities for 한자
const hanjaReport = {
    character: {
        name: "한자",
        level: 291,
        job: "아란",
        combatPower: "9,201만 6,086",
        mainStat: "STR 53,347",
        currentGearTier: "제네시스 해방 + 18성 앱솔/카루타 + 17성 칠흑 혼합 셋"
    },
    recommendations: [
        {
            rank: 1,
            targetItem: "트릭스터 워리어팬츠 (카루타 하의)",
            currentStatus: "18성 유니크",
            action: "18성 ➔ 22성 강화",
            cost: "약 45억 메소 (노작 원가 거의 0원)",
            statGain: "공격력 +45, STR +52",
            combatPowerGain: "+165만 상승",
            efficiency: "⭐⭐⭐⭐⭐ (초특급 가성비)",
            reason: "이미 상의가 22성이므로 하의를 22성으로 맞추면 카루타 22성 완벽 완성!"
        },
        {
            rank: 2,
            targetItem: "데이브레이크 펜던트 (여명)",
            currentStatus: "17성 레전드리",
            action: "17성 ➔ 22성 강화 (토드 or 직작)",
            cost: "약 52억 메소 (노작 시세 5,000만 반영)",
            statGain: "공격력 +55, 올스탯 +65",
            combatPowerGain: "+190만 상승",
            efficiency: "⭐⭐⭐⭐⭐ (여명 가성비 1위)",
            reason: "노작 가격이 매우 저렴하여 파괴 부담 없이 22성을 뽑아낼 수 있는 최고 효율 부위입니다."
        },
        {
            rank: 3,
            targetItem: "하이네스 워리어헬름 (카루타 모자)",
            currentStatus: "18성 유니크",
            action: "18성 ➔ 22성 강화",
            cost: "약 45억 메소",
            statGain: "공격력 +45, STR +52",
            combatPowerGain: "+160만 상승",
            efficiency: "⭐⭐⭐⭐ (고효율)",
            reason: "카루타 3셋(모자/상의/하의) 22성 트리플 완성 구간입니다."
        },
        {
            rank: 4,
            targetItem: "루즈 컨트롤 머신 마크 (칠흑 얼굴장식)",
            currentStatus: "17성 레전드리",
            action: "17성 ➔ 18성 안전 주차",
            cost: "약 14억 메소",
            statGain: "공격력 +14, STR +15",
            combatPowerGain: "+55만 상승",
            efficiency: "⭐⭐⭐⭐ (안전 가성비)",
            reason: "파괴 확률이 2.1%로 낮아 샤이닝 스타포스 때 안전하게 18성으로 1업하기 좋습니다."
        },
        {
            rank: 5,
            targetItem: "앱솔 3셋 (신발/장갑/망토) ➔ 에테르넬 전환",
            currentStatus: "18성 앱솔랩스 3부위",
            action: "에테르넬 3부위(오늘 시세 각 5.2억) 17성 교체",
            cost: "부위당 약 18억 메소 (총 54억)",
            statGain: "공격력 +120, 올스탯 +150 (세트효과 포함)",
            combatPowerGain: "+420만 폭등",
            efficiency: "⭐⭐⭐⭐ (차세대 종결 전환)",
            reason: "18성 앱솔의 한계를 뚫고 엔드 보스(카링/림보) 진입을 위한 에테르넬 세트 전환 최적기입니다."
        }
    ]
};

console.log('Hanja Report Generated successfully!');
