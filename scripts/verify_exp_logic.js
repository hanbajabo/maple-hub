
// 가상 검증 로직 - ExpCalculatorClient.tsx의 핵심 로직을 모사하여 테스트
// 검증 데이터는 ExpCalculatorClient.tsx 및 hunting-exp-rates.ts의 내용을 바탕으로 함

const EXP_DATA_SAMPLE = {
    200: 2207026470, 204: 2653942698, // 하이퍼버닝 테스트용
    260: 367280590866, 261: 374746044627, // 버닝 비욘드 및 익몬 테스트용
    270: 521408544062, 280: 978972580795, 298: 2795552399220
};

// --- 데이터 (컴포넌트에서 복사/참조) ---
const HIGH_MOUNTAIN_EXP = [{ level: 260, basic: 4.887, stage1: 24.437, stage2: 43.986 }];
const ANGLER_COMPANY_EXP = [{ level: 270, basic: 1.1557, stage1: 5.7788, stage2: 10.4018 }];
// 최신 악몽선경 데이터
const NIGHTMARE_GARDEN_EXP = [
    { level: 280, basic: 3.0885, stage1: 15.4425, stage2: 27.7965 },
    { level: 281, basic: 2.8461, stage1: 14.2305, stage2: 25.6149 },
    // ... (중략)
    { level: 299, basic: 0.0874, stage1: 0.4370, stage2: 0.7866 }
];
// 최신 익스트림 몬파 데이터
const EXTREME_MONSTER_PARK_EXP = [
    { level: 260, base: 15.31 }, { level: 299, base: 0.06 }
];

// --- 시뮬레이션 함수 ---
function simulateExp(startLv, targetLv, options) {
    let currentSimLevel = startLv;
    let totalDays = 0;
    let log = [];

    // 옵션 디스트럭처링
    const {
        useHyperBurning, useBurningBeyond,
        useHighMountain, useAnglerCompany, useNightmareGarden, useExtremeMonsterPark,
        mpEventSkillLevel
    } = options;

    while (currentSimLevel < targetLv) {
        const requiredExp = EXP_DATA_SAMPLE[currentSimLevel] || 10000000000; // 샘플 없으면 임의값

        // 1. 에픽 던전 로직 검증
        let dailyHighMountain = 0;
        let dailyAngler = 0;
        let dailyNightmare = 0;

        // 악몽선경 데이터 유효성 체크
        const nightmareData = NIGHTMARE_GARDEN_EXP.find(d => d.level === currentSimLevel);
        const isNightmareValid = nightmareData && nightmareData.basic > 0;

        // Skip 로직 (컴포넌트와 동일하게)
        const skipHighMountain = (useAnglerCompany && currentSimLevel >= 270) || (useNightmareGarden && currentSimLevel >= 280 && isNightmareValid);
        const skipAnglerCompany = useNightmareGarden && currentSimLevel >= 280 && isNightmareValid;

        if (useHighMountain && currentSimLevel >= 260 && !skipHighMountain) dailyHighMountain = 1; // 활성화 표시
        if (useAnglerCompany && currentSimLevel >= 270 && !skipAnglerCompany) dailyAngler = 1;
        if (useNightmareGarden && currentSimLevel >= 280 && isNightmareValid) dailyNightmare = 1;

        // 2. 익스트림 몬파 로직 검증
        let dailyExtreme = 0;
        if (useExtremeMonsterPark && currentSimLevel >= 260) {
            const empData = EXTREME_MONSTER_PARK_EXP.find(d => d.level === currentSimLevel);
            if (empData) {
                // 이벤트 스킬 보너스 계산
                const empBonus = mpEventSkillLevel === 0 ? 0 : mpEventSkillLevel * 0.1; // 단순 예시 (실제 로직은 5, 10, 20...)
                // 여기서는 "적용 여부"만 확인하므로 값은 중요치 않음
                dailyExtreme = 1;
            }
        }

        // 3. 레벨업 보너스 (버닝)
        let levelUpBonus = 1;
        if (useHyperBurning && currentSimLevel >= 200 && currentSimLevel < 260) levelUpBonus = 5;
        else if (useBurningBeyond && currentSimLevel >= 260 && currentSimLevel < 270) levelUpBonus = 2;

        log.push({
            level: currentSimLevel,
            bonus: levelUpBonus,
            epic: { hm: dailyHighMountain, ac: dailyAngler, ng: dailyNightmare },
            extreme: dailyExtreme
        });

        currentSimLevel += levelUpBonus;
        totalDays += 1; // 1일 1업이라 가정 (단순화)

        if (totalDays > 100) break; // 무한루프 방지
    }
    return log;
}

// === 테스트 케이스 ===

console.log("---------------------------------------------------");
console.log("[Test 1] 하이퍼 버닝 (Lv.200 -> 210)");
const ret1 = simulateExp(200, 210, { useHyperBurning: true });
console.log(ret1.map(l => `Lv.${l.level} (+${l.bonus})`).join(" -> "));
if (ret1[0].bonus === 5 && ret1[1].bonus === 5) console.log("✅ PASS"); else console.error("❌ FAIL");

console.log("\n[Test 2] 버닝 비욘드 (Lv.260 -> 264)");
const ret2 = simulateExp(260, 264, { useBurningBeyond: true });
console.log(ret2.map(l => `Lv.${l.level} (+${l.bonus})`).join(" -> "));
if (ret2[0].bonus === 2 && ret2[1].bonus === 2) console.log("✅ PASS"); else console.error("❌ FAIL");

console.log("\n[Test 3] 에픽 던전 우선순위 (Lv.279 -> 281)");
// 279에선 앵글러, 280에선 악몽선경이 적용되어야 함 (모두 켰을 때)
const ret3 = simulateExp(279, 282, {
    useHighMountain: true, useAnglerCompany: true, useNightmareGarden: true
});
ret3.forEach(l => {
    console.log(`Lv.${l.level}: HM=${l.epic.hm}, AC=${l.epic.ac}, NG=${l.epic.ng}`);
});
if (ret3[0].epic.ac === 1 && ret3[0].epic.ng === 0 && ret3[1].epic.ac === 0 && ret3[1].epic.ng === 1)
    console.log("✅ PASS");
else
    console.error("❌ FAIL (279:Only AC, 280:Only NG expected)");

console.log("\n[Test 4] 익스트림 몬파 + 이벤트 스킬 (Lv.260)");
const ret4 = simulateExp(260, 261, { useExtremeMonsterPark: true, mpEventSkillLevel: 5 });
if (ret4[0].extreme === 1) console.log("✅ PASS (Extreme MP applied)"); else console.error("❌ FAIL");

console.log("---------------------------------------------------");
