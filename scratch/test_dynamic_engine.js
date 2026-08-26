const fs = require('fs');

const hangeulData = JSON.parse(fs.readFileSync('scratch/hangeul_equip.json', 'utf8'));

console.log('Testing dynamic analyzer on 한글사모님...');

// Let's write the dynamic scanner algorithm
function dynamicAnalyze(character, stats, items) {
    const candidates = [];
    const combatPower = parseInt(stats.전투력 || '50000000', 10);

    items.forEach(item => {
        const star = item.starforce || 0;
        const slot = item.item_equipment_slot;
        const name = item.item_name;
        const grade = item.potential_option_grade || '노잠재';
        const level = item.item_base?.req_level || 150;

        // Path 1: 12~16성 장비 -> 17성 가성비 주차
        if (star >= 10 && star < 17 && !['보조무기', '엠블렘', '훈장', '뱃지', '포켓 아이템', '기계 심장'].includes(slot)) {
            const cost = level >= 200 ? 1200000000 : 900000000;
            const starsToGain = 17 - star;
            const cpGain = Math.round(combatPower * 0.012 * starsToGain);
            candidates.push({
                slot,
                targetItem: name,
                currentStatus: `${star}성 (${grade})`,
                action: `${star}성 ➔ 17성 가성비 둘둘`,
                category: "스타포스",
                costMeso: cost,
                combatPowerGain: cpGain,
                efficiency: cpGain / (cost / 100000000),
                statText: `공격력 +${starsToGain * 8}, 주스탯 +${starsToGain * 12}`,
                reason: `${star}성에서 17성까지는 파괴 위험이 거의 없는 최강의 가성비 구간입니다.`,
                proTip: "15-16성 100% 이벤트 때 17성까지 한 번에 올리세요."
            });
        }

        // Path 2: 17성 장비 -> 18성 안전 1업 (가장 저렴한 공격력 뻥튀기)
        if (star === 17 && !['보조무기', '엠블렘', '훈장', '뱃지', '포켓 아이템', '기계 심장'].includes(slot)) {
            const cost = level >= 200 ? 1200000000 : (level >= 160 ? 950000000 : 750000000);
            const isWeapon = slot === '무기';
            const cpGain = isWeapon ? Math.round(combatPower * 0.022) : Math.round(combatPower * 0.0095);
            candidates.push({
                slot,
                targetItem: name,
                currentStatus: `17성 (${grade})`,
                action: `17성 ➔ 18성 1업 (초특급 가성비)`,
                category: "스타포스",
                costMeso: cost,
                combatPowerGain: cpGain,
                efficiency: cpGain / (cost / 100000000),
                statText: isWeapon ? "공격력 +15, 주스탯 +15" : "공격력 +13, 주스탯 +15",
                reason: "17성에서 18성으로 단 1성만 올려도 공격력이 크게 붙는 가장 가성비 좋은 스펙업입니다.",
                proTip: "파괴율이 2.1%로 매우 낮아 안전하게 트라이할 수 있습니다."
            });
        }

        // Path 3: 18성 카루타/여명 -> 22성 종결 직작/토드
        if (star === 18 && (name.includes('트와일라이트') || name.includes('데이브레이크') || name.includes('카루타') || name.includes('이글아이') || name.includes('트릭스터') || name.includes('하이네스'))) {
            const cost = 4800000000;
            const cpGain = Math.round(combatPower * 0.035);
            candidates.push({
                slot,
                targetItem: name,
                currentStatus: `18성 (${grade})`,
                action: `18성 ➔ 22성 종결 강화`,
                category: "스타포스",
                costMeso: cost,
                combatPowerGain: cpGain,
                efficiency: cpGain / (cost / 100000000),
                statText: "공격력 +45, 올스탯 +55",
                reason: "노작 원가가 저렴하여 파괴 복구비 부담 없이 22성 종결을 뽑을 수 있습니다.",
                proTip: "샤이닝 스타포스 주간에 예비템 2~3개를 챙겨서 진행하세요."
            });
        }

        // Path 4: 앱솔 모자/신발/장갑/망토 -> 에테르넬 전환
        if (name.includes('앱솔랩스') && ['모자', '상의', '하의', '신발', '장갑', '망토'].includes(slot)) {
            const cost = 3200000000; // 에테 노작 5.2억 + 17성 13억 + 유니크 21% 14억
            const cpGain = Math.round(combatPower * 0.045);
            candidates.push({
                slot,
                targetItem: name + " ➔ 에테르넬 교체",
                currentStatus: `${star}성 앱솔랩스`,
                action: "17성 에테르넬 풀세팅 전환",
                category: "장비 전환",
                costMeso: cost,
                combatPowerGain: cpGain,
                efficiency: cpGain / (cost / 100000000),
                statText: "공격력 +45, 올스탯 +60 (세트효과 대폭 상승)",
                reason: "앱솔랩스의 낮은 기본 스탯 한계를 뚫고 에테르넬 세트 효과를 챙기는 차세대 종결 전환입니다.",
                proTip: "에테르넬 노작 시세가 저렴할 때 17성 유니크로 직작 또는 완제품 구매를 추천합니다."
            });
        }
    });

    // Sort by efficiency
    candidates.sort((a, b) => b.efficiency - a.efficiency);
    return candidates;
}

const res = dynamicAnalyze(hangeulData.basic, hangeulData.stat.final_stat.reduce((acc, s) => { acc[s.stat_name] = s.stat_value; return acc; }, {}), hangeulData.items);
console.log(`Generated ${res.length} candidates! Top 5:`);
res.slice(0, 5).forEach((c, idx) => {
    console.log(`${idx + 1}위: [${c.slot}] ${c.targetItem} - ${c.action} (효율: ${c.efficiency.toFixed(1)}, 비용: ${(c.costMeso / 100000000).toFixed(1)}억, 전투력 +${(c.combatPowerGain / 10000).toFixed(0)}만)`);
});
