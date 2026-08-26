/**
 * 검산 스크립트: specup-engine.ts 알고리즘 검산
 * 우리 starforce_db.ts의 실제 계산 함수와 비교 검증
 */

// starforce_db의 핵심 계산 함수를 직접 구현하여 검산
function calculateStarforceCostJS(level, currentStar) {
    let baseCostRaw = 0;
    if (currentStar <= 9) {
        baseCostRaw = 1000 + (Math.pow(level, 3) * (currentStar + 1)) / 36;
    } else {
        let denom = 200;
        if (currentStar === 10) denom = 571;
        else if (currentStar === 11) denom = 314;
        else if (currentStar === 12) denom = 214;
        else if (currentStar === 13) denom = 157;
        else if (currentStar === 14) denom = 107;
        else if (currentStar === 17) denom = 150;
        else if (currentStar === 18) denom = 70;
        else if (currentStar === 19) denom = 45;
        else if (currentStar === 21) denom = 125;
        baseCostRaw = 1000 + (Math.pow(level, 3) * Math.pow(currentStar + 1, 2.7)) / denom;
    }
    return Math.round(baseCostRaw / 10) * 10;
}

// 스타포스 성공 확률 (1회 시도당 기댓값 계산용)
const PROBS = {
    15: { s: 0.3150, d: 0.02055 },
    16: { s: 0.3150, d: 0.02055 },
    17: { s: 0.1575, d: 0.06740 },
    18: { s: 0.1575, d: 0.06740 },
    19: { s: 0.1575, d: 0.08425 },
    20: { s: 0.3150, d: 0.10275 },
    21: { s: 0.1575, d: 0.126375 },
};

// 실제 누적 기댓값 계산 (마르코프 체인 방식)
// itemCost = 노작 가격
function calculateExpectedCostFromStar(level, fromStar, toStar, itemCost = 0) {
    const T_meso = new Array(toStar + 1).fill(0);
    const T_spares = new Array(toStar + 1).fill(0);

    for (let i = fromStar; i < toStar; i++) {
        const cost = calculateStarforceCostJS(level, i);
        const p = PROBS[i] || { s: 0.315, d: 0 };
        const ps = p.s;
        const pd = p.d;

        // 파괴 시 복구: 15성 이상은 노작으로 복구 (12성부터 다시 올리기)
        const restoreStar = i >= 15 ? 12 : 0;
        const restoreMeso = T_meso[i] - T_meso[restoreStar];
        const restoreSpares = 1 + (T_spares[i] - T_spares[restoreStar]);

        const stepMeso = (cost + pd * restoreMeso) / ps;
        const stepSpares = (pd * restoreSpares) / ps;

        T_meso[i + 1] = T_meso[i] + stepMeso;
        T_spares[i + 1] = T_spares[i] + stepSpares;
    }

    return {
        mesoOnly: Math.round(T_meso[toStar] - T_meso[fromStar]),
        sparesNeeded: T_spares[toStar] - T_spares[fromStar],
        totalWithSpares: Math.round(T_meso[toStar] - T_meso[fromStar] + (T_spares[toStar] - T_spares[fromStar]) * itemCost)
    };
}

console.log('='.repeat(70));
console.log('📊 SPECUP-ENGINE.TS 전면 검산 리포트');
console.log('='.repeat(70));

// ============================================================
// 검산 1: "17성 ➔ 18성 안전 1업" 비용 vs 우리 엔진 하드코딩 값
// ============================================================
console.log('\n[검산 1] 17성 ➔ 18성 1업 기댓값 비교');
console.log('-'.repeat(50));

// 실제 18성까지 누적 기댓값
const real_17to18_150 = calculateExpectedCostFromStar(150, 17, 18);
const real_17to18_160 = calculateExpectedCostFromStar(160, 17, 18);
const real_17to18_200 = calculateExpectedCostFromStar(200, 17, 18);
const real_17to18_250 = calculateExpectedCostFromStar(250, 17, 18);

// 1회 강화비 (마르코프 체인 기댓값 = 1회 비용 / 성공률)
// 17성 기본 비용 (레벨별)
const c17_150 = calculateStarforceCostJS(150, 17);
const c17_160 = calculateStarforceCostJS(160, 17);
const c17_200 = calculateStarforceCostJS(200, 17);
const c17_250 = calculateStarforceCostJS(250, 17);

// 17성에서 성공확률 15.75%, 파괴율 6.74%
// 기댓값 = 1회비용 / 성공률 (단순화, 파괴 복구 제외)
const naiveEst_150 = c17_150 / 0.1575;
const naiveEst_160 = c17_160 / 0.1575;
const naiveEst_200 = c17_200 / 0.1575;
const naiveEst_250 = c17_250 / 0.1575;

console.log(`[150제] 1회 강화비: ${c17_150.toLocaleString()} 메소`);
console.log(`  순수 메소 기댓값 (파괴복구 제외): ${Math.round(naiveEst_150/100000000*10)/10}억`);
console.log(`  엔진 하드코딩 값 (150제): 7.5억`);
console.log(`  실제 마르코프 기댓값 (메소만): ${(real_17to18_150.mesoOnly/100000000).toFixed(2)}억`);
console.log(`  실제 기댓값 (노작 0원 포함): ${(real_17to18_150.totalWithSpares/100000000).toFixed(2)}억 / 파괴 기댓값: ${real_17to18_150.sparesNeeded.toFixed(3)}개`);

console.log(`\n[160제] 1회 강화비: ${c17_160.toLocaleString()} 메소`);
console.log(`  순수 메소 기댓값: ${Math.round(naiveEst_160/100000000*10)/10}억`);
console.log(`  엔진 하드코딩 값 (160제): 9.5억`);
console.log(`  실제 마르코프 기댓값 (메소만): ${(real_17to18_160.mesoOnly/100000000).toFixed(2)}억 / 파괴 기댓값: ${real_17to18_160.sparesNeeded.toFixed(3)}개`);

console.log(`\n[200제] 1회 강화비: ${c17_200.toLocaleString()} 메소`);
console.log(`  순수 메소 기댓값: ${Math.round(naiveEst_200/100000000*10)/10}억`);
console.log(`  엔진 하드코딩 값 (200제): 12억`);
console.log(`  실제 마르코프 기댓값 (메소만): ${(real_17to18_200.mesoOnly/100000000).toFixed(2)}억 / 파괴 기댓값: ${real_17to18_200.sparesNeeded.toFixed(3)}개`);

console.log(`\n[250제] 1회 강화비: ${c17_250.toLocaleString()} 메소`);
console.log(`  순수 메소 기댓값: ${Math.round(naiveEst_250/100000000*10)/10}억`);
console.log(`  실제 마르코프 기댓값 (메소만): ${(real_17to18_250.mesoOnly/100000000).toFixed(2)}억 / 파괴 기댓값: ${real_17to18_250.sparesNeeded.toFixed(3)}개`);

// ============================================================
// 검산 2: 18성 ➔ 22성 기댓값 vs 하드코딩 46억
// ============================================================
console.log('\n[검산 2] 18성 ➔ 22성 기댓값 비교');
console.log('-'.repeat(50));

// 150제 여명 (노작 5천만)
const real_18to22_150_5000 = calculateExpectedCostFromStar(150, 18, 22, 50000000);
const real_18to22_160_5000 = calculateExpectedCostFromStar(160, 18, 22, 50000000);

console.log(`[150제, 노작 5천만] 실제 기댓값: ${(real_18to22_150_5000.totalWithSpares/100000000).toFixed(1)}억 (메소: ${(real_18to22_150_5000.mesoOnly/100000000).toFixed(1)}억 + 노작: ${real_18to22_150_5000.sparesNeeded.toFixed(2)}개)`);
console.log(`  엔진 하드코딩 값: 46억 + 노작 2개 = 약 47억`);

console.log(`\n[160제, 노작 5천만] 실제 기댓값: ${(real_18to22_160_5000.totalWithSpares/100000000).toFixed(1)}억 (메소: ${(real_18to22_160_5000.mesoOnly/100000000).toFixed(1)}억 + 노작: ${real_18to22_160_5000.sparesNeeded.toFixed(2)}개)`);

// 160제 카루타 (노작 0원)
const real_18to22_160_0 = calculateExpectedCostFromStar(160, 18, 22, 0);
console.log(`[160제, 노작 0원] 실제 기댓값: ${(real_18to22_160_0.mesoOnly/100000000).toFixed(1)}억 (노작: ${real_18to22_160_0.sparesNeeded.toFixed(2)}개 파괴 발생)`);
console.log(`  엔진 하드코딩 값: 46억`);

// ============================================================
// 검산 3: 10~16성 ➔ 17성 비용 (단계별 비용 합산)
// ============================================================
console.log('\n[검산 3] 12성 ➔ 17성 기댓값 비교');
console.log('-'.repeat(50));

// 12~14성은 파괴 확률 없음! 단순히 1회 비용 / 성공률
const levels_to_check = [150, 160, 250];
levels_to_check.forEach(lv => {
    let totalMeso = 0;
    // 12->17성 (각 성에서 파괴 없으므로 단순 기댓값)
    const probNoDestroy = [
        { s: 42, from: 12 }, // 12성 42% 성공
        { s: 36.75, from: 13 },
        { s: 31.5, from: 14 },
        { s: 31.5, from: 15 }, // 15-16은 파괴 있음!
        { s: 31.5, from: 16 },
    ];
    probNoDestroy.forEach(p => {
        const c = calculateStarforceCostJS(lv, p.from);
        totalMeso += c / (p.s / 100); // 1회 강화 기댓값 (파괴 복구 미포함)
    });

    // 실제 마르코프 체인 (파괴 복구 포함)
    const real = calculateExpectedCostFromStar(lv, 12, 17, 0);
    console.log(`[${lv}제] 12->17성 순수 메소 기댓값 (파괴 미반영): ${(totalMeso/100000000).toFixed(2)}억`);
    console.log(`[${lv}제] 12->17성 실제 마르코프 기댓값: ${(real.mesoOnly/100000000).toFixed(2)}억 / 파괴: ${real.sparesNeeded.toFixed(3)}개`);
    console.log(`  엔진 하드코딩: ${lv >= 200 ? '5개 x 3억 = 15억' : '5개 x 1.8억 = 9억'}`);
});

// ============================================================
// 검산 4: 전투력 상승 추정치 검산 (combatPower * 0.024 등)
// ============================================================
console.log('\n[검산 4] 전투력 상승량 추정 계수 검산');
console.log('-'.repeat(50));

// 한자 (전투력 92,016,086 / 9200만) 아란 150제 무기
const hanjaCp = 92016086;

// 150제 아케인셰이드 17성->18성: 공격력 +15 상승
// 전투력에서 공격력 1 = 대략 얼마?
// 메이플 전투력 공식: 4*MS + SS + ATK * 4 * (1 + BS/100) * weaponConst (대략)
// 하지만 여기서 우리는 비율로 추정
// 공격력 +15가 전투력에서 차지하는 비율 = ?

console.log(`한자 전투력: ${hanjaCp.toLocaleString()}`);
console.log(`엔진 추정: 무기 17->18성 시 combatPower * 0.024 = +${Math.round(hanjaCp * 0.024 / 10000)}만`);
console.log(`실제 150제 아케인셰이드 17->18성 공격력 증가: +15`);
console.log(`공격력 +1당 전투력 증가 추정 (아란 STR 53347): 약 ${Math.round(hanjaCp * 0.024 / 15 / 10000 * 100) / 100}만`);
console.log(`→ 공격력 1당 전투력: 실제로는 약 8~12만 (레벨/잠재/보스셋에 따라 다름)`);

const expectedCpGainForWeapon = 15 * 90000; // 공격력 +15, 1당 9만 가정
console.log(`공격력 +1당 전투력 9만 가정 시: +${(expectedCpGainForWeapon/10000).toFixed(0)}만`);
console.log(`엔진 추정값: +${Math.round(hanjaCp * 0.024 / 10000)}만 → 오차: ${Math.abs(expectedCpGainForWeapon - hanjaCp*0.024)/10000 | 0}만`);

// ============================================================
// 검산 5: 가성비 지수(효율 스코어) 계산 방식 검산
// ============================================================
console.log('\n[검산 5] 가성비 지수(efficiencyScore) 계산 검산');
console.log('-'.repeat(50));

const cp = 92016086;
const cost1 = 750000000; // 7.5억
const cpGain1 = Math.round(cp * 0.024); // 무기 17->18
const eff1 = cpGain1 / (cost1 / 100000000);
console.log(`무기 17->18성: efficiencyScore = ${cpGain1} / (${cost1/100000000}) = ${eff1.toFixed(0)}`);
console.log(`→ 1억당 전투력 ${(eff1/10000).toFixed(2)}만 상승`);

const cost2 = 180000000; // 1.8억 (블빈마 16->17성)
const cpGain2 = Math.round(cp * 0.015 * 1); // 1성 상승
const eff2 = cpGain2 / (cost2 / 100000000);
console.log(`\n블빈마 16->17성: efficiencyScore = ${cpGain2} / (${cost2/100000000}) = ${eff2.toFixed(0)}`);
console.log(`→ 1억당 전투력 ${(eff2/10000).toFixed(2)}만 상승`);
console.log(`\n※ 실제 api 결과에서 블빈마 효율(464442) > 무기 17->18(178345): 순서가 맞음! ✅`);

// ============================================================
// 검산 6: 에테르넬 전환 비용 검산
// ============================================================
console.log('\n[검산 6] 앱솔➔에테르넬 전환 비용 검산');
console.log('-'.repeat(50));

// 250제 에테르넬 0성->17성 기댓값
const realEth_0to17 = calculateExpectedCostFromStar(250, 0, 17, 0);
console.log(`250제 에테르넬 0->17성 순수 메소 기댓값: ${(realEth_0to17.mesoOnly/100000000).toFixed(2)}억`);

// 엔진은 sfCost = 1,300,000,000 (13억) 하드코딩 → 250제 기준
console.log(`엔진 하드코딩 17성 강화비: 13억`);
console.log(`차이: ${Math.abs((realEth_0to17.mesoOnly - 1300000000)/100000000).toFixed(2)}억`);

// 큐브 비용 검산
// 유니크->레전 평균 71.4회 x 3500만 = 24.99억
// 레전 21% 뽑기 평균 19.5회 x 4750만 = 9.26억
// 합계 = 34.25억 (현재 엔진: 9.8억만 반영 - 유니크 단계 제외)
const lv250_cubeUqToLeg = 71.4 * 35000000;
const lv250_legTo21pct = 19.5 * 47500000;
console.log(`\n큐브 비용 (유니크->레전드리): 71.4회 x 3500만 = ${(lv250_cubeUqToLeg/100000000).toFixed(1)}억`);
console.log(`큐브 비용 (레전드리 21% 뽑기): 19.5회 x 4750만 = ${(lv250_legTo21pct/100000000).toFixed(1)}억`);
console.log(`에테르넬 기준 실제 레전 21% 완성 큐브 총비용: ${((lv250_cubeUqToLeg+lv250_legTo21pct)/100000000).toFixed(1)}억`);
console.log(`엔진 하드코딩: 잠재 큐브비 9.8억 → 실제보다 크게 낮음! ❌`);

console.log('\n' + '='.repeat(70));
console.log('📋 검산 결과 요약');
console.log('='.repeat(70));
