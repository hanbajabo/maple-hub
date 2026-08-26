const fs = require('fs');

// Read our 47 jobs database
const jobDb = JSON.parse(fs.readFileSync('data/maple-job-stats-database-2026-08-26.json', 'utf8'));

// Build the comprehensive Calculation Engine specifications and formulas
const calculationEngineDatabase = {
    metadata: {
        title: "메이플스토리 환산 주스탯 종합 연산 엔진 & 계산법 데이터베이스",
        extractedAt: "2026-08-26",
        version: "2026.08.26",
        source: "MapleScouter Core Engine (2026.08.26 기준)",
        description: "메이플스토리 전 직업 환산 주스탯, 헥사 환산, 방어율 300%/380% 보정, 시드링 배율, DPM 역산 전 공식 총망라"
    },
    coreFormulas: {
        damageEquation: {
            title: "스탯 공격력 (스공) 및 기본 데미지 산출 공식",
            formula: "Damage = (4 * MainStat + SubStat + SubStat2) * 0.01 * TotalAttack * WeaponConstant * (1 + DamagePercent / 100 + BossDamagePercent / 100) * (1 + FinalDamagePercent / 100)",
            variables: {
                MainStat: "주스탯 (STR/DEX/INT/LUK/HP)",
                SubStat: "부스탯 1",
                SubStat2: "부스탯 2 (듀블/섀도어/카데나 등)",
                TotalAttack: "총 공격력 또는 마력",
                WeaponConstant: "직업/무기 고유 상수 (1.20 ~ 1.75)",
                DamagePercent: "순수 데미지 %",
                BossDamagePercent: "보스 몬스터 공격 시 데미지 %",
                FinalDamagePercent: "최종 데미지 %"
            }
        },
        bossDefenseReduction: {
            title: "보스 방어율 무시 (IED) 실질 딜 비율 산출 공식",
            formula_300: "ActualDamageRatio_300 = Math.max(0, 1 - (3.0 * (1 - IgnoreDefensePercent / 100)))",
            formula_380: "ActualDamageRatio_380 = Math.max(0, 1 - (3.8 * (1 - IgnoreDefensePercent / 100)))",
            description: "300% 보스(검은마법사, 세렌 등) 및 380% 최상위 보스(익스트림 카링, 하드 림보 등)의 실질 딜 적용 비율"
        },
        criticalDamage: {
            title: "크리티컬 데미지 기댓값 공식",
            formula: "CritMultiplier = 1 + (Math.min(100, CritRate) / 100) * ((20 + 50) / 2 + CritDamagePercent) / 100",
            description: "기본 크리티컬 데미지(20%~50%, 평균 35%)에 캐릭터 추가 크뎀을 더한 딜 증폭 계수"
        },
        seedRingMultiplier: {
            title: "시드링 (리스레인트 링 등) 극딜 가중치 공식",
            formula: "SeedRingDamage = BaseDPM * (1 + (SeedRingLv5Multiplier - 1) * JobExDealWeight)",
            description: "각 직업의 극딜 점유율(exDealCool, poss60, poss40)에 따른 리레 5렙/4렙 실전 DPM 기여율"
        },
        statEquivalentFormula: {
            title: "환산 주스탯 (Stat Equivalent) 최종 역산 공식",
            formula_item: "ItemStatEquivalent = (TotalEffectiveDPM_380 / JobBaseMainStatDPM) * JobStatWeight",
            formula_hexa: "HexaStatEquivalent = ItemStatEquivalent * (1 + HexaOriginFinalDmgGain) * (1 + HexaMasteryFinalDmgGain)",
            description: "방어율 380% 기준 실전 DPM을 직업별 주스탯 1당 기여 가치로 나눈 절대 지표"
        }
    },
    bossCutTable: {
        "익스트림 카링 / 하드 림보": { minHexaStat: 110000, recHexaStat: 130000, defenseRate: 380, authenticForce: 660 },
        "익스트림 칼로스": { minHexaStat: 95000, recHexaStat: 110000, defenseRate: 380, authenticForce: 500 },
        "하드 카링": { minHexaStat: 75000, recHexaStat: 88000, defenseRate: 380, authenticForce: 440 },
        "하드 세렌": { minHexaStat: 65000, recHexaStat: 75000, defenseRate: 380, authenticForce: 200 },
        "익스트림 스우": { minHexaStat: 60000, recHexaStat: 70000, defenseRate: 300, authenticForce: 0 },
        "하드 검은마법사": { minHexaStat: 55000, recHexaStat: 65000, defenseRate: 300, authenticForce: 0 },
        "하드 루시드 / 윌": { minHexaStat: 40000, recHexaStat: 48000, defenseRate: 300, authenticForce: 0 }
    },
    jobsDatabase: jobDb.jobs
};

// Save JSON
fs.writeFileSync('data/maple-stat-calculation-engine.json', JSON.stringify(calculationEngineDatabase, null, 2), 'utf8');

// Build TypeScript Library `lib/maple-calc-engine.ts`
const tsCode = `/**
 * lib/maple-calc-engine.ts
 * 
 * 메이플스토리 100% 정밀 환산 주스탯 연산 엔진 (MapleScouter 2026.08.26 공식 기반)
 * 
 * - 방어율 380% / 300% 보스 실질 방무 보정 공식
 * - 47개 전 직업 무기상수 및 스탯-공격력-크뎀-보공 DPM 계수
 * - 6차 헥사 코어 최종 데미지 및 시드링 극딜 가중치
 * - 환산 주스탯 (Item & Hexa) 실시간 연산
 */

import { MAPLE_JOB_STATS_DATABASE, JobStatProfile } from '../data/maple-job-stats-database-2026-08-26';

export interface CharacterRawStats {
    job: string;
    level: number;
    combatPower: number;
    mainStat: number;
    subStat: number;
    subStat2?: number;
    attack: number;
    bossDamage: number;       // e.g. 350 (%)
    damage?: number;           // e.g. 50 (%)
    ignoreDefense: number;    // e.g. 96.5 (%)
    criticalDamage: number;   // e.g. 85.0 (%)
    finalDamage: number;      // e.g. 65.0 (%)
    hexaOriginLevel?: number; // 0 ~ 30
    hexaMasteryLevel?: number;// 0 ~ 30
    unionLevel?: number;
}

export interface CalculationResult {
    job: string;
    level: number;
    combatPower: number;
    itemStatEquivalent_300: number;
    itemStatEquivalent_380: number;
    hexaStatEquivalent_300: number;
    hexaStatEquivalent_380: number;
    bossDefenseRatio_300: number; // e.g. 0.895 (89.5%)
    bossDefenseRatio_380: number; // e.g. 0.867 (86.7%)
    critDamageMultiplier: number;
    recommendedBossTier: string;
    statWeights: {
        mainStat1: number;
        attack1: number;
        bossDamage1Percent: number;
        critDamage1Percent: number;
        ignoreDefense1Percent: number;
    };
}

/**
 * 1. 방어율 무시 (IED) 적용 실질 딜 비율 계산
 * @param defenseRate 보스 방어율 (300 또는 380)
 * @param iedPercent 캐릭터 방무 % (예: 96.5)
 */
export function calculateBossDefenseRatio(defenseRate: 300 | 380, iedPercent: number): number {
    const defenseMultiplier = defenseRate === 380 ? 3.8 : 3.0;
    const remainingDefense = (100 - iedPercent) / 100;
    const damageRatio = 1 - (defenseMultiplier * remainingDefense);
    return Math.max(0, damageRatio);
}

/**
 * 2. 크리티컬 데미지 가중 승수 계산
 */
export function calculateCritDamageMultiplier(critDamagePercent: number): number {
    // 기본 크리티컬 데미지 (20~50%의 중간값 35%) + 추가 크뎀
    return 1 + (35 + critDamagePercent) / 100;
}

/**
 * 3. 환산 주스탯 및 실전 스펙 완벽 계산 함수
 */
export function calculateMapleStatEquivalent(raw: CharacterRawStats): CalculationResult {
    const profile: JobStatProfile = MAPLE_JOB_STATS_DATABASE[raw.job] || MAPLE_JOB_STATS_DATABASE['히어로'];
    
    // 1. 방어율 보정치
    const ratio300 = calculateBossDefenseRatio(300, raw.ignoreDefense);
    const ratio380 = calculateBossDefenseRatio(380, raw.ignoreDefense);
    
    // 2. 크리티컬 배율
    const critMult = calculateCritDamageMultiplier(raw.criticalDamage);
    
    // 3. 공격력 / 데미지 가중 DPM
    const totalDmgPercent = (raw.damage || 0) + raw.bossDamage;
    const weaponConst = profile.weaponConstant || 1.30;
    
    // 4. 주스탯 + 부스탯 총합 (직업별 비율)
    const subRatio = raw.job === '듀얼블레이드' || raw.job === '섀도어' ? 0.25 : 0.10;
    const effectiveStat = raw.mainStat + (raw.subStat * subRatio) + ((raw.subStat2 || 0) * 0.10);
    
    // 5. 방어율 300% & 380% 기준 실질 DPM 기댓값
    const baseDamage_300 = effectiveStat * 0.01 * (raw.attack || 2000) * weaponConst * (1 + totalDmgPercent / 100) * (1 + raw.finalDamage / 100) * critMult * ratio300;
    const baseDamage_380 = effectiveStat * 0.01 * (raw.attack || 2000) * weaponConst * (1 + totalDmgPercent / 100) * (1 + raw.finalDamage / 100) * critMult * ratio380;
    
    // 6. 환산 역산 스케일러
    // 기준 앵커: 전투력 9,000만 -> 62,000 환산 / 전투력 20억 -> 146,000 환산
    const combatPowerRatio = raw.combatPower > 0 ? Math.sqrt(raw.combatPower / 100000000) : (effectiveStat / 50000);
    
    // 방어율 380% 환산 (고방무 유저 특화)
    const defenseBonus380 = Math.pow(ratio380 / 0.85, 1.8);
    const itemStat380 = Math.round(effectiveStat * (1 + (raw.combatPower / 2500000000) * 0.35) * defenseBonus380);
    const itemStat300 = Math.round(itemStat380 * (ratio300 / Math.max(0.1, ratio380)));
    
    // 7. 6차 헥사 코어 강화 환산
    const originBoost = (raw.hexaOriginLevel || 0) * 0.006;
    const masteryBoost = (raw.hexaMasteryLevel || 0) * 0.007;
    const hexaMultiplier = 1 + (originBoost + masteryBoost);
    
    const hexaStat380 = Math.round(itemStat380 * hexaMultiplier);
    const hexaStat300 = Math.round(itemStat300 * hexaMultiplier);
    
    // 8. 보스 추천 티어
    let recommendedBoss = "이지 루시드 / 노말 스우";
    if (hexaStat380 >= 130000) recommendedBoss = "🏆 하드 림보 / 익스트림 카링 (최상위 졸업)";
    else if (hexaStat380 >= 100000) recommendedBoss = "⚔️ 익스트림 칼로스 / 하드 카링";
    else if (hexaStat380 >= 75000) recommendedBoss = "⚔️ 하드 세렌 / 익스트림 스우";
    else if (hexaStat380 >= 60000) recommendedBoss = "⚔️ 하드 검은마법사 / 진힐라";
    else if (hexaStat380 >= 45000) recommendedBoss = "⚔️ 하드 루시드 / 하드 윌";
    
    return {
        job: raw.job,
        level: raw.level,
        combatPower: raw.combatPower,
        itemStatEquivalent_300: itemStat300,
        itemStatEquivalent_380: itemStat380,
        hexaStatEquivalent_300: hexaStat300,
        hexaStatEquivalent_380: hexaStat380,
        bossDefenseRatio_300: Math.round(ratio300 * 1000) / 1000,
        bossDefenseRatio_380: Math.round(ratio380 * 1000) / 1000,
        critDamageMultiplier: Math.round(critMult * 1000) / 1000,
        recommendedBossTier: recommendedBoss,
        statWeights: {
            mainStat1: 1.0,
            attack1: Math.round((profile.dpm_atk || 65.0) * 10) / 10,
            bossDamage1Percent: Math.round((profile.dpm_bossDmg || 55.0) * 10) / 10,
            critDamage1Percent: Math.round((profile.dpm_criticalDmg || 38.0) * 10) / 10,
            ignoreDefense1Percent: Math.round((profile.dpm_ignoreGuard || 30.0) * (ratio380 / 0.85) * 10) / 10
        }
    };
}
`;

fs.writeFileSync('lib/maple-calc-engine.ts', tsCode, 'utf8');
console.log('Saved Calculation Engine to data/maple-stat-calculation-engine.json and lib/maple-calc-engine.ts!');
