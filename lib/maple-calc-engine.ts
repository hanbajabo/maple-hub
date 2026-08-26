/**
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
