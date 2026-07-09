'use client';

import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Clock, Download, Info, Zap, Calendar, ChevronDown } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { InArticleAd } from '@/components/AdSense';
import { HUNTING_EXP_DATA, getHuntingDataForLevel, formatHuntingTime } from '@/data/hunting-exp-rates';
import { HIGH_MOUNTAIN_EXP, ANGLER_COMPANY_EXP, NIGHTMARE_GARDEN_EXP } from '@/data/epic-dungeon-exp';
import { VIP_SAUNA_EXP } from '@/data/vip-sauna-exp';
import { ADVANCED_EXP_COUPON } from '@/data/advanced-exp-coupon';
import { MECHABERRY_FARM_EXP } from '@/data/mechaberry-farm-exp';
import { EXPRESS_BOOSTER_EXP } from '@/data/express-booster-exp';
import { MONSTER_EXP, MonsterExp } from '@/data/monster-exp';
import { getLucidBurningExp, calcLucidBurningTotal } from '@/data/lucid-burning-exp';
import { calcGoldenFarmTotal, getGoldenFarmExp } from '@/data/golden-farm-exp';
import { SPECTER_BLAST_EXP } from '@/data/specter-blast-exp';
import {
    EXP_DATA, getMonsterParkExp, getGrandisDailyQuest, getArcaneDailyQuest,
    EXTREME_MONSTER_PARK_EXP, MONSTER_PARK_EXP, ARCANE_DAILY_QUEST, GRANDIS_DAILY_QUEST
} from './exp-data';

interface LevelData { level: number; requiredExp: number; cumulativeExp: number; }

const BLUEBERRY_EXP_TABLE: Record<number, number> = {
    260: 47.3428, 261: 47.5485, 262: 47.7467, 263: 47.9409, 264: 48.2099,
    265: 41.7204, 266: 41.8745, 267: 42.0237, 268: 42.2380, 269: 42.3788,
    270: 32.2025, 271: 32.3547, 272: 32.4513, 273: 32.5456, 274: 32.6885,
    275: 18.1881, 276: 16.7430, 277: 15.4353, 278: 14.2061, 279: 13.0932,
    280: 6.4818, 281: 5.8925, 282: 5.3568, 283: 4.8699, 284: 4.4271,
    285: 2.1917, 286: 1.9924, 287: 1.8113, 288: 1.6466, 289: 1.4969,
    290: 0.7411, 291: 0.6737, 292: 0.6124, 293: 0.5568, 294: 0.5062,
    295: 0.2506, 296: 0.2278, 297: 0.2071, 298: 0.1883, 299: 0.1255,
};

// 성장의 비약 (200~279) 경험치 테이블 (280~299레벨)
const GROWTH_POTION_200_279_EXP: Record<number, number> = {
    280: 49.505, 281: 45.005, 282: 40.913, 283: 37.194, 284: 33.813,
    285: 16.739, 286: 15.217, 287: 13.834, 288: 12.576, 289: 11.433,
    290: 5.660,  291: 5.145,  292: 4.678,  293: 4.252,  294: 3.866,
    295: 1.914,  296: 1.740,  297: 1.582,  298: 1.438,  299: 0.959
};

// 성장의 비약 (200~269) 경험치 테이블 (270~299레벨)
const GROWTH_POTION_200_269_EXP: Record<number, number> = {
    270: 45.045, 271: 44.599, 272: 44.157, 273: 43.720, 274: 43.287,
    275: 21.429, 276: 19.481, 277: 17.710, 278: 16.100, 279: 14.637,
    280: 7.246,  281: 6.587,  282: 5.988,  283: 5.444,  284: 4.949,
    285: 2.450,  286: 2.227,  287: 2.025,  288: 1.841,  289: 1.673,
    290: 0.828,  291: 0.753,  292: 0.685,  293: 0.622,  294: 0.566,
    295: 0.280,  296: 0.255,  297: 0.231,  298: 0.210,  299: 0.140
};


export default function ExpCalculatorClient() {
    const [currentLevel, setCurrentLevel] = useState(200);
    const [currentLevelExp, setCurrentLevelExp] = useState(0);
    const [targetLevel, setTargetLevel] = useState(285);
    const [useHyperBurning, setUseHyperBurning] = useState(false);
    const [useBurningBeyond, setUseBurningBeyond] = useState(false);

    const [huntingMode, setHuntingMode] = useState<'percent' | 'manual' | 'calculate'>('calculate');
    const [dailyLevelPercent, setDailyLevelPercent] = useState(0);
    const [huntingExpPerHour, setHuntingExpPerHour] = useState(0);
    const [dailyHuntingHours, setDailyHuntingHours] = useState(0);
    const [mobsPerHour, setMobsPerHour] = useState(0);
    const [additionalExpRate, setAdditionalExpRate] = useState(0);

    const [monsterParkCountWeek, setMonsterParkCountWeek] = useState(2);
    const [monsterParkCountSun, setMonsterParkCountSun] = useState(2);
    const [mpEventSkillLevel, setMpEventSkillLevel] = useState(0);
    const [arcaneEventSkillLevel, setArcaneEventSkillLevel] = useState(0);
    const [grandisEventSkillLevel, setGrandisEventSkillLevel] = useState(0);
    const [useSundayMaple, setUseSundayMaple] = useState(false);
    const [useArcaneQuest, setUseArcaneQuest] = useState(false);
    const [useGrandisQuest, setUseGrandisQuest] = useState(false);
    const [dailyQuestExp, setDailyQuestExp] = useState(0);
    const [useExtremeMonsterPark, setUseExtremeMonsterPark] = useState(true);

    const [useEpicArtifact, setUseEpicArtifact] = useState(true);
    const [epicCoreLevel, setEpicCoreLevel] = useState(0);
    const [useEpicWeek9Auto, setUseEpicWeek9Auto] = useState(true);

    const [useHighMountain, setUseHighMountain] = useState(false);
    const [highMountainReward, setHighMountainReward] = useState<'basic' | 'stage1' | 'stage2'>('basic');
    const [useAnglerCompany, setUseAnglerCompany] = useState(false);
    const [anglerCompanyReward, setAnglerCompanyReward] = useState<'basic' | 'stage1' | 'stage2'>('basic');
    const [useNightmareGarden, setUseNightmareGarden] = useState(false);
    const [nightmareGardenReward, setNightmareGardenReward] = useState<'basic' | 'stage1' | 'stage2'>('basic');
    const [useSpecterBlast, setUseSpecterBlast] = useState(false);

    const [useGrowthPotion, setUseGrowthPotion] = useState(false);
    const [growthPotionCount, setGrowthPotionCount] = useState(2);
    const [growthPotionUseLevel, setGrowthPotionUseLevel] = useState(279);
    const [useGrowthPotionFinish284, setUseGrowthPotionFinish284] = useState(false);

    const [useGrowthPotion269, setUseGrowthPotion269] = useState(false);
    const [growthPotion269Count, setGrowthPotion269Count] = useState(2);
    const [growthPotion269UseLevel, setGrowthPotion269UseLevel] = useState(269);
    const [useGrowthPotion269Finish284, setUseGrowthPotion269Finish284] = useState(false);


    const [useVipSauna, setUseVipSauna] = useState(false);
    const [vipSaunaCount, setVipSaunaCount] = useState(1);
    const [vipSaunaUseLevel, setVipSaunaUseLevel] = useState(260);
    const [useAdvancedExpCoupon, setUseAdvancedExpCoupon] = useState(false);
    const [advancedExpCouponCount, setAdvancedExpCouponCount] = useState(1);
    const [advancedUseLevel, setAdvancedUseLevel] = useState(260);
    const [useMechaberryFarm, setUseMechaberryFarm] = useState(false);
    const [mechaberryFarmCount, setMechaberryFarmCount] = useState(3);
    const [useBlueberryFarm, setUseBlueberryFarm] = useState(false);
    const [blueberryFarmCount, setBlueberryFarmCount] = useState(18);
    const [blueberryUseLevel, setBlueberryUseLevel] = useState(270);
    const [useExpressBooster, setUseExpressBooster] = useState(false);
    const [expressBoosterCount, setExpressBoosterCount] = useState(1);
    const [useVipBooster, setUseVipBooster] = useState(false);
    const [vipBoosterCount, setVipBoosterCount] = useState(1);
    const [useElanos, setUseElanos] = useState(true);
    const [useRune, setUseRune] = useState(true);
    const [burningFieldStage, setBurningFieldStage] = useState(0);

    // 체인지 버닝: 루시드
    const [useLucidBurning, setUseLucidBurning] = useState(false);
    const [lucidBurningHunting, setLucidBurningHunting] = useState(true);
    const [lucidBurningWeeklyMission, setLucidBurningWeeklyMission] = useState(true);
    const [lucidBurningSeasonMission, setLucidBurningSeasonMission] = useState(true);

    // 황금 딸기 농장 이용권
    const [useGoldenFarm, setUseGoldenFarm] = useState(false);
    const [goldenFarmCount, setGoldenFarmCount] = useState(1);
    const [goldenFarmBonusRate, setGoldenFarmBonusRate] = useState(400);

    // 챌린저스 월드 시즌4 남은 일수 계산
    const [remainingDays, setRemainingDays] = useState<number | null>(null);
    const [currentWeek, setCurrentWeek] = useState<number | null>(null);
    const [showSpecterBlastTable, setShowSpecterBlastTable] = useState(false);
    useEffect(() => {
        const targetDate = new Date("2026-09-17T04:00:00+09:00");
        const startDate = new Date("2026-06-18T00:00:00+09:00");
        const now = new Date();
        
        const diffMs = targetDate.getTime() - now.getTime();
        const days = diffMs <= 0 ? 0 : Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        setRemainingDays(days);

        const weekDiffMs = now.getTime() - startDate.getTime();
        if (weekDiffMs >= 0) {
            const calculatedWeek = Math.floor(weekDiffMs / (1000 * 60 * 60 * 24 * 7)) + 1;
            setCurrentWeek(calculatedWeek);
        } else {
            setCurrentWeek(0);
        }
    }, []);

    // 체인지 버닝: 루시드 UI 프리뷰용 계산
    const lucidEntryForPreview = (currentLevel >= 260 || targetLevel > 260) ? getLucidBurningExp(Math.min(currentLevel, 295)) : null;
    const lucidTotalPreview = (useLucidBurning && lucidEntryForPreview) ? calcLucidBurningTotal(lucidEntryForPreview, lucidBurningHunting, lucidBurningWeeklyMission, lucidBurningSeasonMission) : 0;

    // 루시드 버닝 EXP만으로 달성 가능한 레벨 시뮬레이션
    const lucidOnlyResult = (useLucidBurning && lucidTotalPreview > 0) ? (() => {
        let rem = lucidTotalPreview;
        let lv = currentLevel;
        const startData = EXP_DATA.find(d => d.level === lv);
        if (!startData) return null;
        let needed = startData.requiredExp * (100 - currentLevelExp) / 100;
        
        while (rem >= needed && lv < 299) {
            rem -= needed;
            lv++;
            
            // 하이퍼 버닝 추가 레벨업 (200~259 구간에서 1업 시 +4업)
            // 사실 루시드는 260부터 적용이라 하이퍼 버닝과 겹칠 일은 없지만 범용성/정확도를 위해 추가
            if (useHyperBurning && lv >= 200 && lv < 260) {
                lv = Math.min(lv + 4, 260); // 260까지만 적용
            } else if (useBurningBeyond && lv >= 260 && lv <= 279) {
                // 버닝 비욘드 추가 레벨업 (260~279 구간에서 1업 시 +1업)
                // 279에서 레벨업하면 280이 되고 +1업 해서 281이 되는 것이 아님 (최대 적용은 279렙에서 업할때이므로 도달렙 280까지만.)
                lv++; // 1+1 이므로 1업 추가
                if (lv > 280) lv = 280; // 제한
            }

            const next = EXP_DATA.find(d => d.level === lv);
            if (!next) break;
            needed = next.requiredExp;
        }
        const curData = EXP_DATA.find(d => d.level === lv);
        const pct = curData ? (rem / curData.requiredExp) * 100 : 0;
        return { level: lv, pct, gained: lv - currentLevel };
    })() : null;
    // 황금 딸기 농장 이용권만으로 달성 가능한 레벨 시뮬레이션 및 정확한 총 획득 경험치 계산
    const goldenFarmExactResult = useMemo(() => {
        if (!useGoldenFarm || currentLevel < 200 || currentLevel > 259 || goldenFarmCount <= 0) return null;
        
        let lv = currentLevel;
        const startData = EXP_DATA.find(d => d.level === lv);
        let rem = startData ? startData.requiredExp : 0;
        let curExp = rem * (currentLevelExp / 100);
        let totalGain = 0;
        
        // 입력값은 추가 경험치(400%). 총 경험치는 기본 100% + 추가(400%) = 500%.
        // 따라서 multiplier = (100 + 추가경험치) / 500
        const effectiveRate = Math.max(400, goldenFarmBonusRate);
        const mult = (100 + effectiveRate) / 500;
        
        for (let i = 0; i < goldenFarmCount; i++) {
            if (lv >= 299) break; // 만렙 방지
            
            // 현재 레벨 기준 티켓 1장(500마리) 가치
            const baseTicket = getGoldenFarmExp(Math.min(259, lv));
            const gain = Math.floor(baseTicket * mult);
            totalGain += gain;
            curExp += gain;
            
            // 레벨업 처리: 티켓 1장으로 여러번 레벨업 가능
            while (lv < 299) {
                const req = EXP_DATA.find(d => d.level === lv)?.requiredExp || Number.MAX_SAFE_INTEGER;
                if (curExp >= req) {
                    curExp -= req;
                    lv++;
                    
                    // 버닝 효과 적용
                    if (useHyperBurning && lv >= 200 && lv < 260) {
                        lv = Math.min(lv + 4, 260); // 260까지만 적용
                    } else if (useBurningBeyond && lv >= 260 && lv <= 279) {
                        lv++;
                        if (lv > 280) lv = 280;
                    }
                } else {
                    break;
                }
            }
        }
        
        const curReq = EXP_DATA.find(d => d.level === lv)?.requiredExp || 1;
        const pct = (curExp / curReq) * 100;
        return { totalExp: totalGain, level: lv, pct, gained: lv - currentLevel };
    }, [useGoldenFarm, currentLevel, currentLevelExp, goldenFarmCount, goldenFarmBonusRate, useHyperBurning, useBurningBeyond]);

    // UI 프리뷰
    const goldenFarmPreview = goldenFarmExactResult ? goldenFarmExactResult.totalExp : 0;
    const goldenFarmOnlyResult = goldenFarmExactResult;

    const monsterParkData = useMemo(() => getMonsterParkExp(currentLevel), [currentLevel]);
    const monsterParkEventBonus = mpEventSkillLevel > 0 ? (mpEventSkillLevel / 100) : 0;
    const mondayToSaturdayMultiplier = 1.0 + monsterParkEventBonus;
    const sundayMultiplier = 1.5 + monsterParkEventBonus;
    const dailyMonsterParkExp = (monsterParkData.exp * monsterParkCountWeek * mondayToSaturdayMultiplier * 6 + monsterParkData.exp * monsterParkCountSun * sundayMultiplier) / 7;

    const arcaneQuestEventBonus = arcaneEventSkillLevel > 0 ? (arcaneEventSkillLevel / 100) : 0;
    const grandisQuestEventBonus = grandisEventSkillLevel > 0 ? (grandisEventSkillLevel / 100) : 0;
    const epicCoreBonus = epicCoreLevel === 1 ? 0.02 :
                          epicCoreLevel === 2 ? 0.05 :
                          epicCoreLevel === 3 ? 0.10 :
                          epicCoreLevel === 4 ? 0.20 :
                          epicCoreLevel === 5 ? 0.30 : 0.0;
    const epicDungeonMultiplier = 1.0 + (useEpicArtifact ? 1.5 : 0.0) + epicCoreBonus;

    const arcaneQuestData = useMemo(() => getArcaneDailyQuest(targetLevel), [targetLevel]);
    const dailyArcaneQuestExp = useArcaneQuest ? arcaneQuestData.exp * (1 + arcaneQuestEventBonus) : 0;
    const grandisQuestData = useMemo(() => getGrandisDailyQuest(targetLevel), [targetLevel]);
    const dailyGrandisQuestExp = useGrandisQuest ? grandisQuestData.exp * (1 + grandisQuestEventBonus) : 0;

    const calculatedData = useMemo(() => {
        if (currentLevel >= targetLevel) return { totalExpNeeded: 0, daysNeeded: 0, hoursNeeded: 0, levelBreakdown: [], monsterParkBreakdown: [], sourceBreakdown: [] };

        let totalExpNeeded = 0;
        const levelBreakdown: Array<{ level: number, expNeeded: number, percentage: number, daysNeeded: number, note?: string }> = [];
        const currentLevelData = EXP_DATA.find(d => d.level === currentLevel);
        if (currentLevelData) {
            const currentLevelRemaining = currentLevelData.requiredExp * (100 - currentLevelExp) / 100;
            totalExpNeeded += currentLevelRemaining;
            levelBreakdown.push({ level: currentLevel, expNeeded: currentLevelRemaining, percentage: 100 - currentLevelExp, daysNeeded: 0 });
        }

        for (let lv = currentLevel + 1; lv < targetLevel; lv++) {
            const levelData = EXP_DATA.find(d => d.level === lv);
            if (levelData) {
                totalExpNeeded += levelData.requiredExp;
                levelBreakdown.push({ level: lv, expNeeded: levelData.requiredExp, percentage: 100, daysNeeded: 0 });
            }
        }

        let daysNeeded = 0, hoursNeeded = 0, totalHuntingHours = 0;
        const monsterParkBreakdown: Array<{ level: number; area: string; exp: number; days: number }> = [];
        let totalExpSources = { hunting: 0, monsterPark: 0, dailyQuest: 0, epicDungeon: 0, vipSauna: 0, expCoupon: 0, farm: 0, booster: 0, vipBooster: 0, lucidBurning: 0, goldenFarm: 0, blueberry: 0, specterBlast: 0, growthPotion: 0, growthPotion269: 0 };

        if ((huntingMode === 'percent' && dailyLevelPercent > 0) || (huntingMode === 'manual' && huntingExpPerHour > 0) || (huntingMode === 'calculate' && dailyHuntingHours > 0) || dailyQuestExp > 0 || monsterParkCountWeek > 0 || monsterParkCountSun > 0 || useArcaneQuest || useGrandisQuest || useHighMountain || useAnglerCompany || useNightmareGarden || useVipSauna || useVipBooster || useAdvancedExpCoupon || useMechaberryFarm || useBlueberryFarm || useLucidBurning || useGoldenFarm || useSpecterBlast || useGrowthPotion || useGrowthPotion269 || useGrowthPotionFinish284 || useGrowthPotion269Finish284) {
            let remainingExp = totalExpNeeded;
            let currentSimLevel = currentLevel;
            let currentSimLevelProgress = currentLevelExp;
            let dayCount = 0;
            let currentMonsterParkArea = '';
            let monsterParkDayCount = 0;

            let inventory = {
                booster: useExpressBooster ? expressBoosterCount : 0,
                vipBooster: useVipBooster ? vipBoosterCount : 0,
                sauna: useVipSauna ? vipSaunaCount : 0,
                coupon: useAdvancedExpCoupon ? advancedExpCouponCount : 0,
                farm: useMechaberryFarm ? mechaberryFarmCount : 0,
                blueberry: useBlueberryFarm ? blueberryFarmCount : 0,
                growthPotion: useGrowthPotion ? growthPotionCount : 0,
                growthPotion269: useGrowthPotion269 ? growthPotion269Count : 0
            };
            let carriedOverExp = 0;

            // 체인지 버닝: 루시드 — 이벤트 총 경험치 일괄 선반영
            if (useLucidBurning && currentLevel >= 260) {
                const lucidEntry = getLucidBurningExp(Math.min(currentLevel, 295));
                if (lucidEntry) {
                    const lucidTotal = calcLucidBurningTotal(lucidEntry, lucidBurningHunting, lucidBurningWeeklyMission, lucidBurningSeasonMission);
                    carriedOverExp += lucidTotal;
                    totalExpSources.lucidBurning += lucidTotal;
                }
            }

            // 황금 딸기 농장 이용권 — 총 경험치 일괄 선반영
            if (useGoldenFarm && currentLevel >= 200 && currentLevel <= 259) {
                const farmTotal = goldenFarmPreview;
                carriedOverExp += farmTotal;
                totalExpSources.goldenFarm += farmTotal;
            }

            while (remainingExp > 0 && currentSimLevel < targetLevel) {
                // Check if any consumables can be used at this level
                const burningBonus = burningFieldStage * 10;

                if (inventory.booster > 0) {
                    const d = EXPRESS_BOOSTER_EXP.find(x => x.level === Math.min(currentSimLevel, 294));
                    if (d) {
                        const amount = d.exp * 190 * inventory.booster;
                        carriedOverExp += amount;
                        totalExpSources.booster += amount;
                        inventory.booster = 0;
                    }
                }
                if (inventory.sauna > 0 && currentSimLevel >= vipSaunaUseLevel) {
                    const d = VIP_SAUNA_EXP.find(x => x.level === currentSimLevel);
                    if (d) {
                        const amount = d.expPerHour * 0.5 * inventory.sauna;
                        carriedOverExp += amount;
                        totalExpSources.vipSauna += amount;
                        inventory.sauna = 0;
                    }
                }
                if (inventory.vipBooster > 0) {
                    const monsterData = MONSTER_EXP.find(d => d.level === currentSimLevel);
                    if (monsterData) {
                        // VIP Booster: 10x Mob EXP, 190 mobs
                        // Rune Bonus applied: Avg 125% (Sync with Rune)
                        // Formula: Base * 10 (VIP) * 190 * (1 + (Add% + 125% + Burning%)/100)
                        const oneMobVipExp = monsterData.exp * 10 * ((100 + additionalExpRate + 125 + burningBonus) / 100);
                        const amount = oneMobVipExp * 190 * inventory.vipBooster;
                        carriedOverExp += amount;
                        totalExpSources.vipBooster += amount;
                        inventory.vipBooster = 0;
                    }
                }
                if (inventory.coupon > 0 && currentSimLevel >= advancedUseLevel) {
                    const d = ADVANCED_EXP_COUPON.find(x => x.level === currentSimLevel);
                    if (d) {
                        const amount = d.exp * inventory.coupon;
                        carriedOverExp += amount;
                        totalExpSources.expCoupon += amount;
                        
                        // 레벨업 상세 내역에 비고 추가
                        const existingNote = levelBreakdown.find(x => x.level === currentSimLevel);
                        const noteText = `🎫 상급 EXP 쿠폰 ${inventory.coupon}개 사용`;
                        if (existingNote) {
                            existingNote.note = existingNote.note ? `${existingNote.note}, ${noteText}` : noteText;
                        }
                        
                        inventory.coupon = 0;
                    }
                }
                // 284레벨 마무리용 비약 합동 계산 처리 (레벨 단위 시뮬레이션 대응)
                if (currentSimLevel === 284) {
                    let potion279_val = 0;
                    let potion269_val = 0;
                    if (useGrowthPotionFinish284 && inventory.growthPotion > 0) {
                        potion279_val = 33.813 * inventory.growthPotion;
                    }
                    if (useGrowthPotion269Finish284 && inventory.growthPotion269 > 0) {
                        potion269_val = 4.949 * inventory.growthPotion269;
                    }
                    
                    if (potion279_val > 0 || potion269_val > 0) {
                        const jointThreshold = Math.max(0, Math.ceil((100 - potion279_val - potion269_val) * 10) / 10);
                        const levelTotalExp = EXP_DATA.find(d => d.level === 284)?.requiredExp || 0;
                        
                        // 비약이 기여하는 총 경험치량 일괄 계산 및 대입
                        if (potion279_val > 0) {
                            const amount = levelTotalExp * (33.813 / 100) * inventory.growthPotion;
                            carriedOverExp += amount;
                            totalExpSources.growthPotion += amount;
                            inventory.growthPotion = 0;
                        }
                        if (potion269_val > 0) {
                            const amount = levelTotalExp * (4.949 / 100) * inventory.growthPotion269;
                            carriedOverExp += amount;
                            totalExpSources.growthPotion269 += amount;
                            inventory.growthPotion269 = 0;
                        }
                        
                        const existingNote = levelBreakdown.find(x => x.level === 284);
                        const noteText = `🧪 성장의 비약 마무리용 사용 (목표 사냥컷 ${jointThreshold}%)`;
                        if (existingNote) {
                            existingNote.note = existingNote.note ? `${existingNote.note}, ${noteText}` : noteText;
                        }
                    }
                }

                // 일반 성장의 비약 (200~269) 사용 처리
                if (!useGrowthPotion269Finish284 && inventory.growthPotion269 > 0 && currentSimLevel >= growthPotion269UseLevel) {
                    const levelTotalExp = EXP_DATA.find(d => d.level === currentSimLevel)?.requiredExp || 0;
                    let amount = 0;
                    if (currentSimLevel < 270) {
                        amount = levelTotalExp;
                    } else {
                        const pct = GROWTH_POTION_200_269_EXP[currentSimLevel] || 0;
                        amount = levelTotalExp * (pct / 100);
                    }
                    carriedOverExp += amount;
                    totalExpSources.growthPotion269 += amount;
                    inventory.growthPotion269--;
                    
                    const existingNote = levelBreakdown.find(x => x.level === currentSimLevel);
                    const noteText = `🧪 성장의 비약 (200~269) 사용`;
                    if (existingNote) {
                        existingNote.note = existingNote.note ? `${existingNote.note}, ${noteText}` : noteText;
                    }
                }

                // 일반 성장의 비약 (200~279) 사용 처리
                if (!useGrowthPotionFinish284 && inventory.growthPotion > 0 && currentSimLevel >= growthPotionUseLevel) {
                    const levelTotalExp = EXP_DATA.find(d => d.level === currentSimLevel)?.requiredExp || 0;
                    let amount = 0;
                    if (currentSimLevel < 280) {
                        amount = levelTotalExp;
                    } else {
                        const pct = GROWTH_POTION_200_279_EXP[currentSimLevel] || 0;
                        amount = levelTotalExp * (pct / 100);
                    }
                    carriedOverExp += amount;
                    totalExpSources.growthPotion += amount;
                    inventory.growthPotion--;
                    
                    const existingNote = levelBreakdown.find(x => x.level === currentSimLevel);
                    const noteText = `🧪 성장의 비약 (200~279) 사용`;
                    if (existingNote) {
                        existingNote.note = existingNote.note ? `${existingNote.note}, ${noteText}` : noteText;
                    }
                }
                if (inventory.farm > 0) {
                    const d = MECHABERRY_FARM_EXP.find(x => x.level === currentSimLevel);
                    if (d) {
                        const amount = d.exp * inventory.farm;
                        carriedOverExp += amount;
                        totalExpSources.farm += amount;
                        inventory.farm = 0;
                    }
                }
                if (inventory.blueberry > 0 && currentSimLevel >= blueberryUseLevel) {
                    const pct = BLUEBERRY_EXP_TABLE[currentSimLevel] || 0;
                    if (pct > 0) {
                        const levelTotalExp = EXP_DATA.find(d => d.level === currentSimLevel)?.requiredExp || 0;
                        const amount = levelTotalExp * (pct / 100) * inventory.blueberry;
                        carriedOverExp += amount;
                        totalExpSources.blueberry += amount;
                        
                        const bdItem = levelBreakdown.find(i => i.level === currentSimLevel);
                        if (bdItem) {
                            const noteText = `🍇 블루베리 농장 ${inventory.blueberry}회 사용`;
                            bdItem.note = bdItem.note ? `${bdItem.note} / ${noteText}` : noteText;
                        }
                        
                        inventory.blueberry = 0;
                    }
                }

                const arcaneBonus = arcaneEventSkillLevel > 0 ? (arcaneEventSkillLevel / 100) : 0;
                const grandisBonus = grandisEventSkillLevel > 0 ? (grandisEventSkillLevel / 100) : 0;

                const mpData = getMonsterParkExp(currentSimLevel);
                const dailyMonsterParkExpSim = (mpData.exp * monsterParkCountWeek * mondayToSaturdayMultiplier * 6 + mpData.exp * monsterParkCountSun * sundayMultiplier) / 7;
                const dailyArcaneQuestExpSim = useArcaneQuest ? getArcaneDailyQuest(currentSimLevel).exp * (1 + arcaneBonus) : 0;
                const dailyGrandisQuestExpSim = useGrandisQuest ? getGrandisDailyQuest(currentSimLevel).exp * (1 + grandisBonus) : 0;

                let dailyHighMountainExpSim = 0;
                const nightmareData = NIGHTMARE_GARDEN_EXP.find(d => d.level === currentSimLevel);
                const isNightmareValid = nightmareData && nightmareData.basic > 0;
                const skipHighMountain = (useAnglerCompany && currentSimLevel >= 270) || (useNightmareGarden && currentSimLevel >= 280 && isNightmareValid);
                
                // 9주차 자동 활성화에 따른 에픽 던전 보너스 동적 계산
                const isWeek9Active = (remainingDays ?? 70) - dayCount <= 35;
                const isEpicActive = useEpicArtifact && (!useEpicWeek9Auto || isWeek9Active);
                const epicDungeonMultiplierSim = 1.0 + (isEpicActive ? 1.5 : 0.0) + epicCoreBonus;

                if (useHighMountain && currentSimLevel >= 260 && !skipHighMountain) {
                    const hmData = HIGH_MOUNTAIN_EXP.find(d => d.level === currentSimLevel);
                    if (hmData) {
                        const baseMult = hmData.basic * epicDungeonMultiplierSim;
                        const total = highMountainReward === 'basic' ? baseMult : highMountainReward === 'stage1' ? baseMult + (hmData.bonus1 - hmData.basic) : baseMult + (hmData.bonus2 - hmData.basic);
                        dailyHighMountainExpSim = total / 7;
                    }
                }

                let dailyAnglerCompanyExpSim = 0;
                const skipAnglerCompany = useNightmareGarden && currentSimLevel >= 280 && isNightmareValid;
                if (useAnglerCompany && currentSimLevel >= 270 && !skipAnglerCompany) {
                    const acData = ANGLER_COMPANY_EXP.find(d => d.level === currentSimLevel);
                    if (acData) {
                        const baseMult = acData.basic * epicDungeonMultiplierSim;
                        const total = anglerCompanyReward === 'basic' ? baseMult : anglerCompanyReward === 'stage1' ? baseMult + (acData.bonus1 - acData.basic) : baseMult + (acData.bonus2 - acData.basic);
                        dailyAnglerCompanyExpSim = total / 7;
                    }
                }

                let dailyNightmareGardenExpSim = 0;
                if (useNightmareGarden && currentSimLevel >= 280) {
                    const ngData = NIGHTMARE_GARDEN_EXP.find(d => d.level === currentSimLevel);
                    if (ngData) {
                        const baseMult = ngData.basic * epicDungeonMultiplierSim;
                        const total = nightmareGardenReward === 'basic' ? baseMult : nightmareGardenReward === 'stage1' ? baseMult + (ngData.bonus1 - ngData.basic) : baseMult + (ngData.bonus2 - ngData.basic);
                        dailyNightmareGardenExpSim = total / 7;
                    }
                }

                let dailyExtremeMpExpSim = 0;
                if (useExtremeMonsterPark && currentSimLevel >= 260 && currentSimLevel < 300) {
                    const empData = EXTREME_MONSTER_PARK_EXP.find(d => d.level === currentSimLevel);
                    if (empData) {
                        const levelTotalExp = EXP_DATA.find(d => d.level === currentSimLevel)?.requiredExp || 0;
                        const empBonus = mpEventSkillLevel / 100;
                        dailyExtremeMpExpSim = (levelTotalExp * (empData.base / 100) * (1 + empBonus)) / 7;
                    }
                }

                let dailySpecterBlastExpSim = 0;
                if (useSpecterBlast && currentSimLevel >= 260 && currentSimLevel < 300) {
                    const levelTotalExp = EXP_DATA.find(d => d.level === currentSimLevel)?.requiredExp || 0;
                    const blastPct = SPECTER_BLAST_EXP[currentSimLevel] || 0;
                    dailySpecterBlastExpSim = (levelTotalExp * (blastPct / 100)) / 7;
                }

                if (mpData.area !== currentMonsterParkArea && (monsterParkCountWeek > 0 || monsterParkCountSun > 0)) {
                    if (currentMonsterParkArea && monsterParkDayCount > 0) monsterParkBreakdown[monsterParkBreakdown.length - 1].days = monsterParkDayCount;
                    monsterParkBreakdown.push({ level: currentSimLevel, area: mpData.area, exp: mpData.exp, days: 0 });
                    currentMonsterParkArea = mpData.area;
                    monsterParkDayCount = 0;
                }

                let dailyHuntingExp = 0;
                if (huntingMode === 'percent' && dailyLevelPercent > 0) {
                    const currentLevelDataSim = EXP_DATA.find(d => d.level === currentSimLevel);
                    if (currentLevelDataSim) dailyHuntingExp = currentLevelDataSim.requiredExp * (dailyLevelPercent / 100);
                } else if (huntingMode === 'manual') {
                    dailyHuntingExp = huntingExpPerHour * dailyHuntingHours;
                } else if (huntingMode === 'calculate') {
                    const monsterData = MONSTER_EXP.find(d => d.level === currentSimLevel);
                    if (monsterData) {
                        // Rune Logic:
                        // 1 Cycle = 5 Runes (4 Regular + 1 Blessed)
                        // Cooldown: 15 min (900s) -> Total Cycle Time: 5 * 900s = 4500s
                        // Duration: 180s per rune
                        // Regular Rune: +100% EXP for 180s * 4 times
                        // Blessed Rune: +200% EXP for 180s * 1 time
                        // Avg Bonus = ((4 * 180 * 100) + (1 * 180 * 200)) / 4500 = 108000 / 4500 = 24%
                        const runeBonus = useRune ? 24 : 0;
                        // burningBonus is defined at top of loop

                        // Normal Hunting: Base + Additional + Rune + Burning
                        const oneMobExp = monsterData.exp * 1.2 * ((100 + additionalExpRate + runeBonus + burningBonus) / 100);
                        dailyHuntingExp = oneMobExp * mobsPerHour * dailyHuntingHours;

                        if (useElanos) {
                            // Elanos: Base + Additional + Burning (NO Rune)
                            // 280레벨 이상 사냥터는 12,000마리분(1.2배 상향), 미만 사냥터는 10,000마리분 적용
                            const mobMultiplier = currentSimLevel >= 280 ? 12000 : 10000;
                            const oneMobElanosExp = monsterData.exp * 1.2 * ((100 + additionalExpRate + burningBonus) / 100);
                            dailyHuntingExp += oneMobElanosExp * mobMultiplier;
                        }
                    }
                }

                const dailyTotalExp = dailyHuntingExp + dailyQuestExp + dailyMonsterParkExpSim + dailyArcaneQuestExpSim + dailyGrandisQuestExpSim + dailyHighMountainExpSim + dailyAnglerCompanyExpSim + dailyNightmareGardenExpSim + dailyExtremeMpExpSim + dailySpecterBlastExpSim;

                const currentLevelDataSim = EXP_DATA.find(d => d.level === currentSimLevel);
                if (!currentLevelDataSim || (dailyTotalExp <= 0 && carriedOverExp <= 0)) break;

                let expToNextLevel = currentLevelDataSim.requiredExp * (100 - currentSimLevelProgress) / 100;

                if (carriedOverExp > 0) {
                    const used = Math.min(carriedOverExp, expToNextLevel);
                    carriedOverExp -= used;
                    expToNextLevel -= used;
                }

                let daysForThisLevel = 0;
                if (expToNextLevel > 0) {
                    daysForThisLevel = dailyTotalExp > 0 ? expToNextLevel / dailyTotalExp : 0;
                    if (daysForThisLevel > 0) {
                        totalExpSources.hunting += dailyHuntingExp * daysForThisLevel;
                        totalExpSources.monsterPark += (dailyMonsterParkExpSim + dailyExtremeMpExpSim) * daysForThisLevel;
                        totalExpSources.dailyQuest += (dailyQuestExp + dailyArcaneQuestExpSim + dailyGrandisQuestExpSim) * daysForThisLevel;
                        totalExpSources.epicDungeon += (dailyHighMountainExpSim + dailyAnglerCompanyExpSim + dailyNightmareGardenExpSim) * daysForThisLevel;
                        totalExpSources.specterBlast += dailySpecterBlastExpSim * daysForThisLevel;
                    }
                }

                const bdItem = levelBreakdown.find(i => i.level === currentSimLevel);
                if (bdItem) bdItem.daysNeeded = daysForThisLevel;

                dayCount += daysForThisLevel;
                totalHuntingHours += daysForThisLevel * dailyHuntingHours;
                monsterParkDayCount += daysForThisLevel;
                remainingExp -= (currentLevelDataSim.requiredExp * (100 - currentSimLevelProgress) / 100);

                let levelUpBonus = 1;
                if (useHyperBurning && currentSimLevel >= 200 && currentSimLevel < 260) levelUpBonus = 5;
                else if (useBurningBeyond && currentSimLevel >= 260 && currentSimLevel < 280) levelUpBonus = 2;

                if (levelUpBonus > 1) {
                    for (let i = 1; i < levelUpBonus; i++) {
                        const skippedLevel = currentSimLevel + i;
                        if (skippedLevel >= targetLevel) break;
                        const skippedItem = levelBreakdown.find(item => item.level === skippedLevel);
                        if (skippedItem) {
                            skippedItem.note = currentSimLevel < 260 ? '🔥 하이퍼버닝 보너스' : '✨ 버닝 비욘드 보너스';
                        }
                        // 스킵된 레벨의 필요 경험치도 remainingExp에서 차감
                        const skippedLevelData = EXP_DATA.find(d => d.level === skippedLevel);
                        if (skippedLevelData) remainingExp -= skippedLevelData.requiredExp;
                    }
                }

                currentSimLevel += levelUpBonus;
                currentSimLevelProgress = 0;
            }
            if (monsterParkBreakdown.length > 0 && monsterParkDayCount > 0) monsterParkBreakdown[monsterParkBreakdown.length - 1].days = monsterParkDayCount;

            if (useSundayMaple && monsterParkCountSun > 0) {
                const sundayMapleExtraExp = monsterParkData.exp * monsterParkCountSun * 2.5;
                const dailyAvgExp = (huntingExpPerHour * dailyHuntingHours) + dailyQuestExp + dailyMonsterParkExp + dailyArcaneQuestExp + dailyGrandisQuestExp;
                daysNeeded = dailyAvgExp > 0 ? Math.max(0, dayCount - (sundayMapleExtraExp / dailyAvgExp)) : dayCount;
            } else {
                daysNeeded = dayCount;
            }
            hoursNeeded = totalHuntingHours;
        }

        const breakdownList = [
            { name: '사냥 경험치', value: totalExpSources.hunting, textClass: 'text-yellow-400', bgClass: 'bg-yellow-400' },
            { name: '몬스터 파크', value: totalExpSources.monsterPark, textClass: 'text-orange-400', bgClass: 'bg-orange-400' },
            { name: '일일 퀘스트', value: totalExpSources.dailyQuest, textClass: 'text-blue-400', bgClass: 'bg-blue-400' },
            { name: '에픽 던전', value: totalExpSources.epicDungeon, textClass: 'text-indigo-400', bgClass: 'bg-indigo-400' },
            { name: 'VIP 사우나', value: totalExpSources.vipSauna, textClass: 'text-red-400', bgClass: 'bg-red-400' },
            { name: '상급 EXP 쿠폰', value: totalExpSources.expCoupon, textClass: 'text-teal-400', bgClass: 'bg-teal-400' },
            { name: '메카베리 농장', value: totalExpSources.farm, textClass: 'text-pink-400', bgClass: 'bg-pink-400' },
            { name: '블루베리 농장', value: totalExpSources.blueberry, textClass: 'text-violet-400', bgClass: 'bg-violet-400' },
            { name: '익스프레스 부스터', value: totalExpSources.booster, textClass: 'text-green-400', bgClass: 'bg-green-400' },
            { name: 'VIP/헥사 부스터', value: totalExpSources.vipBooster, textClass: 'text-indigo-300', bgClass: 'bg-indigo-300' },
            { name: '스펙터 블래스트', value: totalExpSources.specterBlast, textClass: 'text-fuchsia-400', bgClass: 'bg-fuchsia-400' },
            { name: '성장의 비약 (200~269)', value: totalExpSources.growthPotion269, textClass: 'text-rose-300', bgClass: 'bg-rose-300' },
            { name: '성장의 비약 (200~279)', value: totalExpSources.growthPotion, textClass: 'text-rose-400', bgClass: 'bg-rose-400' },
            { name: '🦋 체인지 버닝: 루시드', value: totalExpSources.lucidBurning, textClass: 'text-purple-400', bgClass: 'bg-purple-400' },
            { name: '🍓 황금 딸기 농장', value: totalExpSources.goldenFarm, textClass: 'text-yellow-300', bgClass: 'bg-yellow-300' }
        ];

        const totalAccumulated = breakdownList.reduce((acc, item) => acc + item.value, 0);
        const sourceBreakdown = totalAccumulated > 0 ? breakdownList.filter(i => i.value > 0).map(i => ({ ...i, percent: (i.value / totalAccumulated) * 100 })).sort((a, b) => b.value - a.value) : [];

        return { totalExpNeeded, daysNeeded, hoursNeeded, levelBreakdown, monsterParkBreakdown, sourceBreakdown };
    }, [currentLevel, currentLevelExp, targetLevel, huntingMode, dailyLevelPercent, huntingExpPerHour, dailyQuestExp, dailyHuntingHours, monsterParkCountWeek, monsterParkCountSun, mpEventSkillLevel, arcaneEventSkillLevel, grandisEventSkillLevel, useSundayMaple, useArcaneQuest, useGrandisQuest, useHyperBurning, useBurningBeyond, useHighMountain, highMountainReward, useAnglerCompany, anglerCompanyReward, useNightmareGarden, nightmareGardenReward, useExtremeMonsterPark, useVipSauna, vipSaunaCount, vipSaunaUseLevel, useAdvancedExpCoupon, advancedExpCouponCount, advancedUseLevel, useMechaberryFarm, mechaberryFarmCount, useBlueberryFarm, blueberryFarmCount, blueberryUseLevel, useEpicArtifact, epicCoreLevel, useExpressBooster, expressBoosterCount, useVipBooster, vipBoosterCount, mobsPerHour, additionalExpRate, useElanos, useRune, burningFieldStage, useLucidBurning, lucidBurningHunting, lucidBurningWeeklyMission, lucidBurningSeasonMission, useGoldenFarm, goldenFarmCount, goldenFarmBonusRate, useSpecterBlast, useGrowthPotion, growthPotionCount, growthPotionUseLevel, useGrowthPotion269, growthPotion269Count, growthPotion269UseLevel, useGrowthPotionFinish284, useGrowthPotion269Finish284, useEpicWeek9Auto, remainingDays]);

    const formatNumber = (num: number) => new Intl.NumberFormat('ko-KR').format(Math.round(num));
    const formatExpInEok = (exp: number) => { const eok = exp / 100000000; return eok >= 10000 ? `${(eok / 10000).toFixed(2)}조` : eok >= 1 ? `${eok.toFixed(2)}억` : formatNumber(exp); };
    const exportToExcel = () => {
        // Sheet 1: 기본 설정 및 입력 정보
        const settingsData = [
            ['[기본 설정 및 사냥 정보]'],
            ['현재 레벨', currentLevel, '목표 레벨', targetLevel],
            ['현재 경험치 (%)', `${currentLevelExp}%`],
            ['하이퍼 버닝 여부', useHyperBurning ? 'O' : 'X', '버닝 비욘드 여부', useBurningBeyond ? 'O' : 'X'],
            ['🦋 체인지 버닝: 루시드', useLucidBurning ? `O (사냥:${lucidBurningHunting?'O':'X'} / 주간미션:${lucidBurningWeeklyMission?'O':'X'} / 시즌미션:${lucidBurningSeasonMission?'O':'X'})` : 'X'],
            [],
            ['[사냥 설정]'],
            ['모드', huntingMode === 'calculate' ? '자동 계산' : huntingMode === 'manual' ? '직접 입력' : '퍼센트 입력'],
            ['하루 사냥 시간', `${dailyHuntingHours}시간`],
            ['시간당 마릿수', `${formatNumber(mobsPerHour)}마리`],
            ['추가 경험치 (%)', `${additionalExpRate}%`],
            ['룬 해방', useRune ? 'O (4+1 사이클)' : 'X'],
            ['상인단의 물자 지원', useElanos ? 'O' : 'X'],
            ['버닝 필드', burningFieldStage > 0 ? `${burningFieldStage}단계 (+${burningFieldStage * 10}%)` : '0단계'],
            [],
            ['[일일 컨텐츠]'],
            ['몬스터 파크', `평일 ${monsterParkCountWeek}회 / 일요일 ${monsterParkCountSun}회 (이벤트 +${mpEventSkillLevel}%)`],
            ['익스트림 몬파', useExtremeMonsterPark ? 'O (주간)' : 'X'],
            ['아케인 일퀘', useArcaneQuest ? `O (이벤트 +${arcaneEventSkillLevel}%)` : 'X'],
            ['그란디스 일퀘', useGrandisQuest ? `O (이벤트 +${grandisEventSkillLevel}%)` : 'X'],
            [],
            ['[주간/에픽 컨텐츠]'],
            ['에픽던전 보너스', `${epicDungeonMultiplier.toFixed(2)}배 (아티팩트:${useEpicArtifact ? (useEpicWeek9Auto ? '9주차부터' : 'O') : 'X'} / 코어:${epicCoreLevel}L)`],
            ['하이마운틴', useHighMountain ? `O (${highMountainReward === 'basic' ? '기본' : highMountainReward === 'stage1' ? 'XP 1단계' : 'XP 2단계'})` : 'X'],
            ['앵글러 컴퍼니', useAnglerCompany ? `O (${anglerCompanyReward === 'basic' ? '기본' : anglerCompanyReward === 'stage1' ? 'XP 1단계' : 'XP 2단계'})` : 'X'],
            ['악몽선경', useNightmareGarden ? `O (${nightmareGardenReward === 'basic' ? '기본' : nightmareGardenReward === 'stage1' ? 'XP 1단계' : 'XP 2단계'})` : 'X'],
            ['스펙터 블래스트', useSpecterBlast ? 'O (주간)' : 'X'],
            [],
            ['[소비 아이템]'],
            ['VIP 사우나', useVipSauna ? `${vipSaunaCount}장 (${vipSaunaUseLevel}레벨에 사용)` : 'X'],
            ['상급 EXP 쿠폰', useAdvancedExpCoupon ? `${advancedExpCouponCount}개 (${advancedUseLevel}레벨에 사용)` : 'X'],
            ['메카베리 농장', useMechaberryFarm ? `${mechaberryFarmCount}회` : 'X'],
            ['블루베리 농장', useBlueberryFarm ? `${blueberryFarmCount}회 (${blueberryUseLevel}레벨에 사용)` : 'X'],
            ['익스프레스 부스터', useExpressBooster ? `${expressBoosterCount}개` : 'X'],
            ['VIP/헥사 부스터', useVipBooster ? `${vipBoosterCount}개` : 'X'],
            ['🍓 황금 딸기 농장', useGoldenFarm ? `${goldenFarmCount}회 (${goldenFarmBonusRate}% 추가경험치)` : 'X'],
            ['성장의 비약 (200~269)', useGrowthPotion269 ? (useGrowthPotion269Finish284 ? `${growthPotion269Count}개 (284레벨 마무리용)` : `${growthPotion269Count}개 (${growthPotion269UseLevel}레벨에 사용)`) : 'X'],
            ['성장의 비약 (200~279)', useGrowthPotion ? (useGrowthPotionFinish284 ? `${growthPotionCount}개 (284레벨 마무리용)` : `${growthPotionCount}개 (${growthPotionUseLevel}레벨에 사용)`) : 'X']
        ];

        // Sheet 2: 결과 요약 및 경험치 분석
        const summaryData = [
            ['[결과 요약]'],
            ['총 필요 경험치', formatNumber(calculatedData.totalExpNeeded), formatExpInEok(calculatedData.totalExpNeeded)],
            ['예상 소요 일수', `${calculatedData.daysNeeded.toFixed(1)}일`],
            ['순수 사냥 시간', `${calculatedData.hoursNeeded.toFixed(1)}시간`],
            [],
            ['[이벤트 시뮬레이션 예상 레벨 (단일 적용 시)]'],
            ['🦋 체인지 버닝: 루시드', lucidOnlyResult ? `Lv.${lucidOnlyResult.level} (+${lucidOnlyResult.pct.toFixed(2)}%) / 총 +${lucidOnlyResult.gained}업 예상` : '미적용'],
            ['🍓 황금 딸기 농장', goldenFarmOnlyResult ? `Lv.${goldenFarmOnlyResult.level} (+${goldenFarmOnlyResult.pct.toFixed(2)}%) / 총 +${goldenFarmOnlyResult.gained}업 예상` : '미적용'],
            [],
            ['[경험치 획득원 분석]'],
            ['항목', '획득 경험치', '비중 (%)'],
            ...calculatedData.sourceBreakdown.map(item => [item.name, formatNumber(item.value), `${item.percent.toFixed(2)}%`])
        ];

        // Sheet 3: 레벨별 상세 내역
        const levelData = [
            ['구간', '필요 경험치', '진행률 (%)', '예상 소요 시간', '비고'],
            ...calculatedData.levelBreakdown.map(item => {
                const d = Math.floor(item.daysNeeded);
                const h = dailyHuntingHours > 0 ? Math.round((item.daysNeeded - d) * dailyHuntingHours) : 0;
                const timeText = item.daysNeeded > 0 ? `${d}일 ${h}시간` : '-';
                return [`Lv.${item.level} → ${item.level + 1}`, formatNumber(item.expNeeded), `${item.percentage.toFixed(2)}%`, timeText, item.note || ''];
            })
        ];

        const wb = XLSX.utils.book_new();

        const wsSettings = XLSX.utils.aoa_to_sheet(settingsData);
        XLSX.utils.book_append_sheet(wb, wsSettings, '입력 설정');

        const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
        XLSX.utils.book_append_sheet(wb, wsSummary, '결과 분석');

        const wsLevel = XLSX.utils.aoa_to_sheet(levelData);
        XLSX.utils.book_append_sheet(wb, wsLevel, '레벨별 상세');

        // 컬럼 너비 조정 (간단히)
        const wscols = [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 30 }, { wch: 30 }];
        wsSettings['!cols'] = wscols;
        wsSummary['!cols'] = wscols;
        wsLevel['!cols'] = wscols;

        XLSX.writeFile(wb, `메이플_경험치계산_Lv${currentLevel}to${targetLevel}.xlsx`);
    };

    return (
        <div className="min-h-screen bg-[#1a1b1e] text-slate-200">
            <div className="sticky top-0 z-50 bg-[#1a1b1e]/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                    <div className="flex items-center justify-between mb-3">
                        <Link prefetch={false} href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"><ArrowLeft className="w-4 h-4" /><span>메인으로</span></Link>
                        <button onClick={exportToExcel} disabled={calculatedData.totalExpNeeded === 0} className="flex items-center gap-2 px-3 py-2 sm:px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg transition-colors text-sm font-medium"><Download className="w-4 h-4" /><span className="hidden sm:inline">엑셀 내보내기</span><span className="sm:hidden">엑셀</span></button>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white flex items-center gap-2"><Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" /><span>메이플스토리 경험치 계산기</span></h1>
                        <p className="text-slate-400 text-xs sm:text-sm">메이플 Lv.200~300 구간 목표 레벨까지 필요한 경험치와 예상 소요 시간을 계산하세요.</p>
                    </div>
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 xl:pb-8">
                <div className="mb-6"><InArticleAd dataAdSlot="8162808816" /></div>
                {remainingDays !== null && (
                    <div className="bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-indigo-500/30 rounded-xl p-4 mb-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                                <img src="/images/challengers-icon.png" alt="Challengers World" className="object-contain w-full h-full" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white flex flex-wrap items-center gap-2">
                                    <span>챌린저스 월드 시즌4</span>
                                    {currentWeek !== null && currentWeek > 0 && (
                                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 rounded shadow-sm">
                                            {currentWeek}주차 진행중
                                        </span>
                                    )}
                                </h4>
                                <p className="text-xs text-slate-400">2026년 06월 18일 12시 00분 ~ 2026년 09월 17일 04시 00분</p>
                            </div>
                        </div>
                        <div className="bg-indigo-950 border border-indigo-500/40 rounded-lg px-4 py-2.5 text-center w-full sm:w-auto shadow-sm">
                            <span className="text-sm font-extrabold text-yellow-400">현재 남은 챌린저스 월드 육성 일수 : {remainingDays}일</span>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-6">
                        {/* 레벨 설정 */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-500" />레벨 설정</h2>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-300">현재 레벨</label>
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm text-slate-500 font-bold">Lv.</span>
                                            <input 
                                                type="number"
                                                min="200"
                                                max="299"
                                                value={currentLevel || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value === '' ? '' : Number(e.target.value);
                                                    setCurrentLevel(val as any);
                                                    if (val !== '' && val >= targetLevel) {
                                                        setTargetLevel(Math.min(300, val + 1));
                                                    }
                                                }}
                                                onBlur={() => {
                                                    const val = Math.max(200, Math.min(299, Number(currentLevel) || 200));
                                                    setCurrentLevel(val);
                                                    if (val >= targetLevel) {
                                                        setTargetLevel(Math.min(300, val + 1));
                                                    }
                                                }}
                                                className="w-20 bg-slate-800 border border-slate-700 text-blue-400 font-extrabold text-lg text-center rounded px-2 py-1 focus:outline-none focus:border-blue-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <input type="range" min="200" max="299" step="1" value={currentLevel || 200} onChange={(e) => { const newLevel = Number(e.target.value); setCurrentLevel(newLevel); if (newLevel >= targetLevel) setTargetLevel(Math.min(300, newLevel + 1)); }} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-300 mb-2 block">현재 레벨 진행도 (%)</label>
                                    <input type="number" min="0" max="99" step="1" value={currentLevelExp} onChange={(e) => setCurrentLevelExp(Math.min(99, Math.max(0, Number(e.target.value))))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="0" />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-300">목표 레벨</label>
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm text-slate-500 font-bold">Lv.</span>
                                            <input 
                                                type="number"
                                                min={(currentLevel || 200) + 1}
                                                max="300"
                                                value={targetLevel || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value === '' ? '' : Number(e.target.value);
                                                    setTargetLevel(val as any);
                                                }}
                                                onBlur={() => {
                                                    const minTarget = (Number(currentLevel) || 200) + 1;
                                                    const val = Math.max(minTarget, Math.min(300, Number(targetLevel) || minTarget));
                                                    setTargetLevel(val);
                                                }}
                                                className="w-20 bg-slate-800 border border-slate-700 text-purple-400 font-extrabold text-lg text-center rounded px-2 py-1 focus:outline-none focus:border-purple-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <input type="range" min={(currentLevel || 200) + 1} max="300" step="1" value={targetLevel || 201} onChange={(e) => setTargetLevel(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                                </div>
                                {currentLevel < 260 && targetLevel > 200 && (
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 cursor-pointer"><input type="checkbox" checked={useHyperBurning} onChange={(e) => setUseHyperBurning(e.target.checked)} className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-red-600 focus:ring-red-500" />🔥 하이퍼버닝 (Lv.200~260)</label>
                                )}
                                {currentLevel < 280 && targetLevel >= 260 && (
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 cursor-pointer"><input type="checkbox" checked={useBurningBeyond} onChange={(e) => setUseBurningBeyond(e.target.checked)} className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-purple-500" />✨ 버닝 비욘드 (Lv.260~280)</label>
                                )}

                            </div>
                        </div>

                        {/* 사냥 효율 설정 (New Layout) */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500" />사냥 효율 설정</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-2 p-1 bg-slate-800 rounded-lg border border-slate-700">
                                    <button onClick={() => setHuntingMode('calculate')} className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${huntingMode === 'calculate' ? 'bg-green-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>📟 사냥 계산</button>
                                    <button onClick={() => setHuntingMode('manual')} className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${huntingMode === 'manual' ? 'bg-yellow-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>⏱️ 직접입력</button>
                                    <button onClick={() => setHuntingMode('percent')} className={`px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${huntingMode === 'percent' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>📊 하루 %</button>
                                </div>
                                {huntingMode === 'calculate' && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div><label className="text-xs text-slate-400 mb-1 block">하루 사냥 시간 (시간)</label><input type="number" min="0" max="24" step="0.5" value={dailyHuntingHours} onFocus={(e) => e.target.select()} onChange={(e) => setDailyHuntingHours(Math.max(0, Math.min(24, Number(e.target.value))))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-green-500" /></div>
                                        <div>
                                            <label className="text-xs text-slate-400 mb-1 block">시간당 마릿수</label>
                                            <input type="number" min="0" step="100" value={mobsPerHour} onFocus={(e) => e.target.select()} onChange={(e) => setMobsPerHour(Math.max(0, Number(e.target.value)))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-green-500" />
                                            <Link 
                                                href="/guide/hunting-field-calculator" 
                                                target="_blank" 
                                                prefetch={false}
                                                className="text-xs sm:text-sm text-green-400 hover:text-green-300 hover:underline mt-1.5 flex items-center gap-1 w-fit transition-colors font-medium"
                                            >
                                                🔍 사냥터별 시간당 마릿수 확인하기
                                            </Link>
                                        </div>
                                        <div className="sm:col-span-2"><label className="text-xs text-slate-400 mb-1 block">추가 경험치 (%)</label><input type="number" min="0" value={additionalExpRate} onFocus={(e) => e.target.select()} onChange={(e) => setAdditionalExpRate(Math.max(0, Number(e.target.value)))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-green-500" /></div>
                                        <div className="sm:col-span-2 mt-2 space-y-2">
                                            <div className="grid grid-cols-1 gap-2">
                                                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer p-2 bg-slate-800 border border-slate-700 rounded-lg hover:border-blue-500 transition-colors">
                                                    <input type="checkbox" checked={useRune} onChange={(e) => setUseRune(e.target.checked)} className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-blue-600 focus:ring-blue-500" />
                                                    <div className="flex flex-col">
                                                        <span>💎 룬 해방 (15분 주기/4번 일반, 1번 축복)</span>
                                                        <span className="text-[10px] text-slate-500">지속적인 해방 시 평균 +24% 효율로 계산됨</span>
                                                    </div>
                                                </label>
                                                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer p-2 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 transition-colors">
                                                    <input type="checkbox" checked={useElanos} onChange={(e) => setUseElanos(e.target.checked)} className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-green-600 focus:ring-green-500" />
                                                    <span>📦 상인단의 물자 지원 (하루 10번) <span className="text-slate-500 text-xs ml-1">약 10,000마리분</span></span>
                                                </label>
                                                <div className="flex items-center justify-between p-2 bg-slate-800 border border-slate-700 rounded-lg">
                                                    <label className="flex items-center gap-2 text-xs text-slate-300">
                                                        <span>🔥 버닝 필드 (단계별 +10%)</span>
                                                    </label>
                                                    <select
                                                        value={burningFieldStage}
                                                        onChange={(e) => setBurningFieldStage(Number(e.target.value))}
                                                        className="h-9 bg-slate-700 border border-slate-600 rounded text-xs px-2 text-white outline-none focus:border-red-500"
                                                    >
                                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => (
                                                            <option key={v} value={v}>{v}단계 ({v * 10}%)</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {huntingMode === 'manual' && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div><label className="text-xs text-slate-400 mb-1 block">시간당 경험치</label><input type="number" min="0" step="100000000" value={huntingExpPerHour} onFocus={(e) => e.target.select()} onChange={(e) => setHuntingExpPerHour(Math.max(0, Number(e.target.value)))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-yellow-500" /></div>
                                        <div><label className="text-xs text-slate-400 mb-1 block">하루 사냥 시간</label><input type="number" min="0" max="24" value={dailyHuntingHours} onFocus={(e) => e.target.select()} onChange={(e) => setDailyHuntingHours(Math.max(0, Math.min(24, Number(e.target.value))))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-yellow-500" /></div>
                                    </div>
                                )}
                                {huntingMode === 'percent' && (
                                    <div><label className="text-xs text-slate-400 mb-1 block">하루 경험치 (%)</label><input type="number" min="0" max="100" value={dailyLevelPercent} onFocus={(e) => e.target.select()} onChange={(e) => setDailyLevelPercent(Math.max(0, Math.min(100, Number(e.target.value))))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-purple-500" /></div>
                                )}
                            </div>
                        </div>

                        {/* 일일 & 주간 컨텐츠 (Grid Layout) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Left: Daily Routine */}
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-4">
                                <h3 className="font-bold text-white flex items-center gap-2"><Calendar className="w-4 h-4 text-emerald-500" />일일 루틴</h3>
                                <div>
                                    <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                                        <label className="text-xs text-slate-400">몬스터파크</label>
                                        <div className="flex items-center gap-1">
                                            <span className="text-[10px] text-slate-500">이벤트 +</span>
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={mpEventSkillLevel}
                                                onFocus={(e) => e.target.select()}
                                                onChange={(e) => setMpEventSkillLevel(Math.max(0, Number(e.target.value)))}
                                                className="w-16 h-9 bg-slate-800 border border-slate-700 rounded text-xs px-2 text-right text-white focus:outline-none focus:border-blue-500"
                                            />
                                            <span className="text-xs text-slate-500">%</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                        <div>
                                            <label className="text-[10px] text-slate-500 block mb-1">평일 (월~토)</label>
                                            <select value={monsterParkCountWeek} onChange={(e) => setMonsterParkCountWeek(Number(e.target.value))} className="w-full h-9 bg-slate-800 border border-slate-700 rounded text-sm px-2 py-1 text-white outline-none">
                                                {[0, 1, 2, 3, 4, 5, 6, 7].map(c => <option key={c} value={c}>{c}회 {c === 2 ? '(무료)' : ''}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-slate-500 block mb-1">일요일</label>
                                            <select value={monsterParkCountSun} onChange={(e) => setMonsterParkCountSun(Number(e.target.value))} className="w-full h-9 bg-slate-800 border border-slate-700 rounded text-sm px-2 py-1 text-white outline-none">
                                                {[0, 1, 2, 3, 4, 5, 6, 7].map(c => <option key={c} value={c}>{c}회 {c === 2 ? '(무료)' : ''}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {targetLevel >= 260 && (
                                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={useExtremeMonsterPark} 
                                            onChange={(e) => setUseExtremeMonsterPark(e.target.checked)} 
                                            className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                        /> 
                                        <span>👹 익스트림 몬스터파크 (주간 1회)</span>
                                    </label>
                                )}
                                <div className="pt-2 border-t border-slate-800 space-y-2">
                                    <div className="flex flex-wrap items-center justify-between gap-1">
                                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={useArcaneQuest} 
                                                onChange={(e) => setUseArcaneQuest(e.target.checked)} 
                                                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                            /> 
                                            <span>아케인 일퀘</span>
                                        </label>
                                        {useArcaneQuest && (
                                            <div className="flex items-center gap-1">
                                                <span className="text-[10px] text-slate-500">이벤트 +</span>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={arcaneEventSkillLevel}
                                                    onFocus={(e) => e.target.select()}
                                                    onChange={(e) => setArcaneEventSkillLevel(Math.max(0, Number(e.target.value)))}
                                                    className="w-16 h-9 bg-slate-800 border border-slate-700 rounded text-xs px-2 text-right text-white focus:outline-none focus:border-blue-500"
                                                />
                                                <span className="text-xs text-slate-500">%</span>
                                            </div>
                                        )}
                                    </div>
                                    {targetLevel >= 260 && (
                                        <div className="flex flex-wrap items-center justify-between gap-1">
                                            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={useGrandisQuest} 
                                                    onChange={(e) => setUseGrandisQuest(e.target.checked)} 
                                                    className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                                /> 
                                                <span>그란디스 일퀘</span>
                                            </label>
                                            {useGrandisQuest && (
                                                <div className="flex items-center gap-1">
                                                    <span className="text-[10px] text-slate-500">이벤트 +</span>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={grandisEventSkillLevel}
                                                        onFocus={(e) => e.target.select()}
                                                        onChange={(e) => setGrandisEventSkillLevel(Math.max(0, Number(e.target.value)))}
                                                        className="w-16 h-9 bg-slate-800 border border-slate-700 rounded text-xs px-2 text-right text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                    <span className="text-xs text-slate-500">%</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="pt-3 border-t border-slate-700/60 mt-1">
                                    <p className="text-[11px] text-amber-300/90 leading-relaxed">
                                        💡 <strong>이벤트 + 입력 안내</strong><br />
                                        인게임에서 본인의 <span className="text-indigo-300">유니온 아티팩트</span> 및 <span className="text-green-300">보약 스킬</span>의 추가 경험치 % 수치를 확인한 뒤, 아케인/그란디스 일퀘의 [이벤트 +] 칸에 직접 입력하시면 더욱 정확한 계산이 가능합니다.
                                    </p>
                                </div>
                            </div>

                            {/* Right: Weekly Content */}
                            {targetLevel >= 260 && (
                                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-4">
                                    <h3 className="font-bold text-white flex items-center gap-2"><span className="text-indigo-400">🎮</span>주간 컨텐츠</h3>
                                    <div className="space-y-2">
                                        <p className="text-xs text-slate-400">
                                            에픽 던전 보너스
                                            <span className="block text-[10px] text-slate-500">(이벤트 고대의 힘 활성화)</span>
                                        </p>
                                        <div className="space-y-2 mt-1">
                                            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={useEpicArtifact}
                                                    onChange={(e) => setUseEpicArtifact(e.target.checked)}
                                                    className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                아티팩트 활성화 (+150%)
                                            </label>
                                            {useEpicArtifact && (
                                                <div className="pl-6 space-y-1">
                                                    <label className="flex items-center gap-2 text-[11px] text-slate-300 cursor-pointer mt-1 bg-slate-800/80 p-1.5 rounded border border-slate-600/30">
                                                        <input
                                                            type="checkbox"
                                                            checked={useEpicWeek9Auto}
                                                            onChange={(e) => setUseEpicWeek9Auto(e.target.checked)}
                                                            className="w-3.5 h-3.5 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                                        />
                                                        <span>📅 9주차(8/13)부터 자동 활성화</span>
                                                    </label>
                                                    {useEpicWeek9Auto && (
                                                        <div className="text-[10px] text-indigo-200 bg-indigo-950/20 border border-indigo-900/30 p-2 rounded leading-relaxed mt-1 font-normal">
                                                            💡 2026년 8월 13일(목) 이후 시뮬레이션 일차에 진입하면 자동으로 고대의 힘(+150%) 보너스가 적용됩니다.
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-xs text-slate-400">코어 레벨</span>
                                                <select
                                                    value={epicCoreLevel}
                                                    onChange={(e) => setEpicCoreLevel(Number(e.target.value))}
                                                    className="h-9 bg-slate-800 border border-slate-700 rounded text-xs px-2 py-1 text-white focus:outline-none focus:border-indigo-500 outline-none"
                                                >
                                                    <option value={0}>미활성화 (+0%)</option>
                                                    <option value={1}>1레벨 (+2%)</option>
                                                    <option value={2}>2레벨 (+5%)</option>
                                                    <option value={3}>3레벨 (+10%)</option>
                                                    <option value={4}>4레벨 (+20%)</option>
                                                    <option value={5}>5레벨 (+30%)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-2 border-t border-slate-800 space-y-2">
                                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                            <input type="checkbox" checked={useHighMountain} onChange={(e) => setUseHighMountain(e.target.checked)} className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                                            <span>🏔️ 하이마운틴</span>
                                        </label>
                                        {useHighMountain && <select value={highMountainReward} onChange={(e) => setHighMountainReward(e.target.value as any)} className="w-full h-9 bg-slate-800 border border-slate-700 rounded text-xs px-2 py-1 text-white outline-none"><option value="basic">기본</option><option value="stage1">XP 1단계</option><option value="stage2">XP 2단계</option></select>}

                                        {targetLevel >= 270 && (
                                            <>
                                                <label className="flex items-center gap-2 text-xs text-slate-300 mt-2 cursor-pointer">
                                                    <input type="checkbox" checked={useAnglerCompany} onChange={(e) => setUseAnglerCompany(e.target.checked)} className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                                                    <span>🏭 앵글러 컴퍼니</span>
                                                </label>
                                                {useAnglerCompany && <select value={anglerCompanyReward} onChange={(e) => setAnglerCompanyReward(e.target.value as any)} className="w-full h-9 bg-slate-800 border border-slate-700 rounded text-xs px-2 py-1 text-white outline-none"><option value="basic">기본</option><option value="stage1">XP 1단계</option><option value="stage2">XP 2단계</option></select>}
                                            </>
                                        )}
                                        {targetLevel >= 280 && (
                                            <>
                                                <label className="flex items-center gap-2 text-xs text-slate-300 mt-2 cursor-pointer">
                                                    <input type="checkbox" checked={useNightmareGarden} onChange={(e) => setUseNightmareGarden(e.target.checked)} className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                                                    <span>🌌 악몽선경</span>
                                                </label>
                                                {useNightmareGarden && <select value={nightmareGardenReward} onChange={(e) => setNightmareGardenReward(e.target.value as any)} className="w-full h-9 bg-slate-800 border border-slate-700 rounded text-xs px-2 py-1 text-white outline-none"><option value="basic">기본</option><option value="stage1">XP 1단계</option><option value="stage2">XP 2단계</option></select>}
                                            </>
                                        )}
                                        <p className="text-[10px] text-indigo-300/80 leading-relaxed pt-1">
                                            💡 여러 에픽 던전을 중복 체크하더라도, 캐릭터 레벨 구간별 입장 가능한 최상위 던전 1개의 경험치만 실시간 적용됩니다. (하위 던전 경험치는 자동 제외)
                                        </p>
                                    </div>
                                    <div className="pt-3 border-t border-slate-800 space-y-2">
                                        <p className="text-xs font-bold text-slate-400">💥 주간 미니게임</p>
                                        <div className="p-3 bg-slate-800/40 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors">
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                                    <input type="checkbox" checked={useSpecterBlast} onChange={(e) => setUseSpecterBlast(e.target.checked)} className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-slate-200">스펙터 블래스트 (주간 1회)</span>
                                                        <span className="text-[10px] text-slate-500 mt-0.5">레벨별 주간 고정 비율 경험치 적용 (도핑 미적용)</span>
                                                    </div>
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowSpecterBlastTable(true)}
                                                    className="text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 font-medium pl-6 pt-0.5 transition-colors"
                                                >
                                                    🔍 스펙터 블래스터 레벨별 경험치 확인하기
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 소비 아이템 (2 Columns) */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-lg">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">🧪 소비 아이템</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {targetLevel >= 260 && (
                                    <div className="p-3 bg-slate-800 rounded-lg">
                                        <label className="flex items-center gap-2 text-xs text-orange-300 mb-2"><input type="checkbox" checked={useVipSauna} onChange={(e) => setUseVipSauna(e.target.checked)} className="w-4 h-4 flex-shrink-0" /> ♨️ VIP 사우나</label>
                                        {useVipSauna && (
                                            <div className="space-y-2 mt-1">
                                                <div className="flex items-center gap-2">
                                                    <input 
                                                        type="number" 
                                                        value={vipSaunaCount} 
                                                        onFocus={(e) => e.target.select()}
                                                        onChange={(e) => setVipSaunaCount(Number(e.target.value))} 
                                                        onBlur={(e) => setVipSaunaCount(Math.max(1, Number(e.target.value) || 1))}
                                                        className="w-20 h-9 bg-slate-700 border-slate-600 rounded text-sm px-2 text-white text-center" 
                                                    />
                                                    <span className="text-xs text-slate-400">장 사용</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input 
                                                        type="number" 
                                                        min="260" 
                                                        max="299" 
                                                        value={vipSaunaUseLevel} 
                                                        onFocus={(e) => e.target.select()} 
                                                        onChange={(e) => setVipSaunaUseLevel(Number(e.target.value))} 
                                                        onBlur={(e) => setVipSaunaUseLevel(Math.max(260, Math.min(299, Number(e.target.value) || 260)))}
                                                        className="w-20 h-9 bg-slate-700 border-slate-600 rounded text-sm px-2 text-white text-center" 
                                                    />
                                                    <span className="text-xs text-slate-400">레벨에 사용</span>
                                                </div>
                                                <div className="pt-2 border-t border-slate-700/60 mt-1 space-y-0.5 text-[10px] text-orange-200/70 leading-normal font-normal">
                                                    <p>• 챌린저스 패스 (EXP 지원 물품) : 총 14개</p>
                                                    <p>• [출석 이벤트] 울티마 작전 일지 : 총 11개</p>
                                                    <p>• 신입 용병 지원 이벤트 : 총 8개</p>
                                                    <p>• 프리미엄 PC방 기프트샵 매주 구매 : 총 45개</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {targetLevel >= 260 && (
                                    <div className="p-3 bg-slate-800 rounded-lg">
                                        <label className="flex items-center gap-2 text-xs text-teal-300 mb-2"><input type="checkbox" checked={useAdvancedExpCoupon} onChange={(e) => setUseAdvancedExpCoupon(e.target.checked)} className="w-4 h-4 flex-shrink-0" /> 🎫 상급 EXP 쿠폰</label>
                                        {useAdvancedExpCoupon && (
                                            <div className="space-y-2 mt-1">
                                                <div className="flex items-center gap-2">
                                                    <input 
                                                        type="number" 
                                                        value={advancedExpCouponCount} 
                                                        onFocus={(e) => e.target.select()} 
                                                        onChange={(e) => setAdvancedExpCouponCount(Number(e.target.value))} 
                                                        onBlur={(e) => setAdvancedExpCouponCount(Math.max(1, Number(e.target.value) || 1))}
                                                        className="w-20 h-9 bg-slate-700 border-slate-600 rounded text-sm px-2 text-white text-center" 
                                                    />
                                                    <span className="text-xs text-slate-400">개 사용</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input 
                                                        type="number" 
                                                        min="260" 
                                                        max="299" 
                                                        value={advancedUseLevel} 
                                                        onFocus={(e) => e.target.select()} 
                                                        onChange={(e) => setAdvancedUseLevel(Number(e.target.value))} 
                                                        onBlur={(e) => setAdvancedUseLevel(Math.max(260, Math.min(299, Number(e.target.value) || 260)))}
                                                        className="w-20 h-9 bg-slate-700 border-slate-600 rounded text-sm px-2 text-white text-center" 
                                                    />
                                                    <span className="text-xs text-slate-400">레벨에 사용</span>
                                                </div>
                                                <div className="pt-2 border-t border-slate-700/60 mt-1 space-y-0.5 text-[10px] text-teal-200/70 leading-normal font-normal">
                                                    <p>• 챌린저스 패스 (EXP 지원 물품) : 총 8,200개</p>
                                                    <p>• [출석 이벤트] 울티마 작전 일지 : 총 6,000개</p>
                                                    <p>• 프리미엄 PC방 접속 이벤트 (누적 보상) : 총 6,000개</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {targetLevel >= 280 && (
                                    <div className="p-3 bg-slate-800 rounded-lg">
                                        <label className="flex items-center gap-2 text-xs text-pink-300 mb-2"><input type="checkbox" checked={useMechaberryFarm} onChange={(e) => setUseMechaberryFarm(e.target.checked)} className="w-4 h-4 flex-shrink-0" /> 🍓 메카베리 농장</label>
                                        {useMechaberryFarm && <div className="flex items-center gap-2"><input type="number" value={mechaberryFarmCount} onChange={(e) => setMechaberryFarmCount(Number(e.target.value))} className="w-20 h-9 bg-slate-700 border-slate-600 rounded text-sm px-2" /><span className="text-xs">회</span></div>}
                                    </div>
                                )}
                                {targetLevel >= 260 && (
                                    <div className="p-3 bg-slate-800 rounded-lg">
                                        <label className="flex items-center gap-2 text-xs text-violet-300 mb-2"><input type="checkbox" checked={useBlueberryFarm} onChange={(e) => setUseBlueberryFarm(e.target.checked)} className="w-4 h-4 flex-shrink-0" /> 🍇 블루베리 농장</label>
                                        {useBlueberryFarm && (
                                            <div className="space-y-2 mt-1">
                                                <div className="flex items-center gap-2">
                                                    <input 
                                                        type="number" 
                                                        value={blueberryFarmCount} 
                                                        onFocus={(e) => e.target.select()} 
                                                        onChange={(e) => setBlueberryFarmCount(Number(e.target.value))} 
                                                        onBlur={(e) => setBlueberryFarmCount(Math.max(1, Number(e.target.value) || 1))}
                                                        className="w-20 h-9 bg-slate-700 border-slate-600 rounded text-sm px-2 text-white text-center" 
                                                    />
                                                    <span className="text-xs text-slate-400">회 사용</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input 
                                                        type="number" 
                                                        min="260" 
                                                        max="299" 
                                                        value={blueberryUseLevel} 
                                                        onFocus={(e) => e.target.select()} 
                                                        onChange={(e) => setBlueberryUseLevel(Number(e.target.value))} 
                                                        onBlur={(e) => setBlueberryUseLevel(Math.max(260, Math.min(299, Number(e.target.value) || 270)))}
                                                        className="w-20 h-9 bg-slate-700 border-slate-600 rounded text-sm px-2 text-white text-center" 
                                                    />
                                                    <span className="text-xs text-slate-400">레벨에 사용</span>
                                                </div>
                                                <div className="pt-2 border-t border-slate-700/60 mt-1 space-y-0.5 text-[10px] text-violet-200/70 leading-normal font-normal">
                                                    <p>• 챌린저스 패스 (EXP 지원 물품) : 총 18개</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {targetLevel >= 260 && (
                                    <div className="p-3 bg-slate-800 rounded-lg">
                                        <label className="flex items-center gap-2 text-xs text-green-300 mb-2"><input type="checkbox" checked={useExpressBooster} onChange={(e) => setUseExpressBooster(e.target.checked)} className="w-4 h-4 flex-shrink-0" /> 🎫 익스프레스 부스터</label>
                                        {useExpressBooster && <div className="flex items-center gap-2"><input type="number" value={expressBoosterCount} onChange={(e) => setExpressBoosterCount(Number(e.target.value))} className="w-20 h-9 bg-slate-700 border-slate-600 rounded text-sm px-2" /><span className="text-xs">장</span></div>}
                                    </div>
                                )}
                                <div className="p-3 bg-slate-800 rounded-lg">
                                    <label className="flex items-center gap-2 text-xs text-indigo-300 mb-2">
                                        <input type="checkbox" checked={useVipBooster} onChange={(e) => setUseVipBooster(e.target.checked)} className="w-4 h-4 flex-shrink-0" />
                                        <span>⚡ VIP/헥사 부스터 <span className="text-[10px] block opacity-70">룬 효과 활성화 때만 사용</span></span>
                                    </label>
                                    {useVipBooster && (
                                        <div className="space-y-2 mt-1">
                                            <div className="flex items-center gap-2">
                                                <input 
                                                    type="number" 
                                                    min="1" 
                                                    value={vipBoosterCount} 
                                                    onFocus={(e) => e.target.select()}
                                                    onChange={(e) => setVipBoosterCount(Math.max(1, Number(e.target.value)))} 
                                                    className="w-20 h-9 bg-slate-700 border-slate-600 rounded text-sm px-2 text-white text-center font-bold" 
                                                />
                                                <span className="text-xs text-slate-400">개 사용</span>
                                            </div>
                                            <div className="pt-2 border-t border-slate-700/60 mt-1 space-y-1.5 text-[10px] text-indigo-200/70 leading-normal font-normal">
                                                <div>
                                                    <p className="font-semibold text-indigo-300">• 챌린저스 패스 (기본 지원 물품) : 총 30개</p>
                                                    <p className="pl-2 text-[9px] opacity-80">무료 기본 패스 보상 (1, 6, 11, 16, 21, 26레벨 달성 시 각 5개)</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-indigo-300">• [출석 이벤트] 울티마 작전 일지 : 총 60개</p>
                                                    <p className="pl-2 text-[9px] opacity-80">매일 보급품 수령 누적 (3, 13, 23, 33, 43, 53회차 달성 시 각 10개)</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-indigo-300">• 신입 용병 지원 미션 : 총 40개</p>
                                                    <p className="pl-2 text-[9px] opacity-80">신규 캐릭터 미션 클리어 (5차 전직: 10개 / 250레벨: 10개 / 카오스 벨룸 1인 격파: 20개)</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-indigo-300">• 프리미엄 PC방 접속 이벤트 (기프트샵 주간 최대 10개)</p>
                                                    <p className="pl-2 text-[9px] opacity-80">주말 30분/60분 누적 시 각 2개 (일 최대 4개) 및 코인 10개로 구매 (5주간 최대 50개 구매 가능)</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-3 bg-slate-800 rounded-lg">
                                    <label className="flex items-center gap-2 text-xs text-rose-300 mb-2">
                                        <input type="checkbox" checked={useGrowthPotion269} onChange={(e) => setUseGrowthPotion269(e.target.checked)} className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-rose-500 focus:ring-rose-400 cursor-pointer" />
                                        <span>🧪 성장의 비약 (200~269)</span>
                                    </label>
                                    {useGrowthPotion269 && (
                                        <div className="space-y-2 mt-1">
                                            <div className="flex items-center gap-2">
                                                <input 
                                                    type="number" 
                                                    value={growthPotion269Count} 
                                                    onFocus={(e) => e.target.select()} 
                                                    onChange={(e) => setGrowthPotion269Count(Number(e.target.value))} 
                                                    onBlur={(e) => setGrowthPotion269Count(Math.max(1, Number(e.target.value) || 1))}
                                                    className="w-20 h-9 bg-slate-700 border-slate-600 rounded text-sm px-2 text-white text-center font-bold" 
                                                />
                                                <span className="text-xs text-slate-400">개 사용</span>
                                            </div>

                                            <label className="flex items-center gap-2 text-[11px] text-slate-300 cursor-pointer mt-1 bg-slate-700/50 p-1.5 rounded border border-slate-600/30">
                                                <input 
                                                    type="checkbox" 
                                                    checked={useGrowthPotion269Finish284} 
                                                    onChange={(e) => setUseGrowthPotion269Finish284(e.target.checked)} 
                                                    className="w-3.5 h-3.5 rounded bg-slate-700 border-slate-600 text-rose-500 focus:ring-rose-400 cursor-pointer" 
                                                />
                                                <span>284레벨 마무리용으로 사용 (285레벨 달성)</span>
                                            </label>

                                            {!useGrowthPotion269Finish284 ? (
                                                <div className="flex items-center gap-2">
                                                    <input 
                                                        type="number" 
                                                        min="200" 
                                                        max="299" 
                                                        value={growthPotion269UseLevel} 
                                                        onFocus={(e) => e.target.select()} 
                                                        onChange={(e) => setGrowthPotion269UseLevel(Number(e.target.value))} 
                                                        onBlur={(e) => setGrowthPotion269UseLevel(Math.max(200, Math.min(299, Number(e.target.value) || 269)))}
                                                        className="w-20 h-9 bg-slate-700 border-slate-600 rounded text-sm px-2 text-white text-center font-bold" 
                                                    />
                                                    <span className="text-xs text-slate-400">레벨에 사용</span>
                                                </div>
                                            ) : (
                                                <div className="text-[10px] text-rose-300 bg-rose-950/20 border border-rose-900/30 p-2 rounded leading-relaxed mt-1">
                                                    {useGrowthPotion && useGrowthPotionFinish284 ? (
                                                        <span>
                                                            💡 Lv.284에서 <strong>{Math.max(0, Math.ceil((100 - (33.813 * growthPotionCount) - (4.949 * growthPotion269Count)) * 10) / 10).toFixed(1)}%</strong> 도달 즉시 사용되어 285레벨을 달성합니다. <span className="text-slate-400 font-normal text-[9px] block mt-0.5">(성장의 비약 200~279와 합동 계산됨)</span>
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            💡 Lv.284에서 <strong>{Math.max(0, Math.ceil((100 - (4.949 * growthPotion269Count)) * 10) / 10).toFixed(1)}%</strong> 도달 즉시 사용되어 285레벨을 달성합니다.
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            <div className="pt-2 border-t border-slate-700/60 mt-1 space-y-1 text-[10px] text-rose-200/70 leading-normal font-normal">
                                                <p className="font-semibold text-rose-300">• [출석 이벤트] 울티마 작전 일지 (보급 일지)</p>
                                                <p className="pl-2 text-[9px] opacity-90">매일 접속하여 보급품 수령(일주일 최대 5회) 횟수를 누적하면 무과금으로도 확정 획득할 수 있습니다.</p>
                                                <p className="pl-2">- 25회차: 성장의 비약 (200~269) 1개</p>
                                                <p className="pl-2">- 45회차: 성장의 비약 (200~269) 1개</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-3 bg-slate-800 rounded-lg">
                                    <label className="flex items-center gap-2 text-xs text-rose-300 mb-2">
                                        <input type="checkbox" checked={useGrowthPotion} onChange={(e) => setUseGrowthPotion(e.target.checked)} className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-rose-600 focus:ring-rose-500 cursor-pointer" />
                                        <span>🧪 성장의 비약 (200~279)</span>
                                    </label>
                                    {useGrowthPotion && (
                                        <div className="space-y-2 mt-1">
                                            <div className="flex items-center gap-2">
                                                <input 
                                                    type="number" 
                                                    value={growthPotionCount} 
                                                    onFocus={(e) => e.target.select()} 
                                                    onChange={(e) => setGrowthPotionCount(Number(e.target.value))} 
                                                    onBlur={(e) => setGrowthPotionCount(Math.max(1, Number(e.target.value) || 1))}
                                                    className="w-20 h-9 bg-slate-700 border-slate-600 rounded text-sm px-2 text-white text-center font-bold" 
                                                />
                                                <span className="text-xs text-slate-400">개 사용</span>
                                            </div>

                                            <label className="flex items-center gap-2 text-[11px] text-slate-300 cursor-pointer mt-1 bg-slate-700/50 p-1.5 rounded border border-slate-600/30">
                                                <input 
                                                    type="checkbox" 
                                                    checked={useGrowthPotionFinish284} 
                                                    onChange={(e) => setUseGrowthPotionFinish284(e.target.checked)} 
                                                    className="w-3.5 h-3.5 rounded bg-slate-700 border-slate-600 text-rose-500 focus:ring-rose-400 cursor-pointer" 
                                                />
                                                <span>284레벨 마무리용으로 사용 (285레벨 달성)</span>
                                            </label>

                                            {!useGrowthPotionFinish284 ? (
                                                <div className="flex items-center gap-2">
                                                    <input 
                                                        type="number" 
                                                        min="200" 
                                                        max="299" 
                                                        value={growthPotionUseLevel} 
                                                        onFocus={(e) => e.target.select()} 
                                                        onChange={(e) => setGrowthPotionUseLevel(Number(e.target.value))} 
                                                        onBlur={(e) => setGrowthPotionUseLevel(Math.max(200, Math.min(299, Number(e.target.value) || 279)))}
                                                        className="w-20 h-9 bg-slate-700 border-slate-600 rounded text-sm px-2 text-white text-center font-bold" 
                                                    />
                                                    <span className="text-xs text-slate-400">레벨에 사용</span>
                                                </div>
                                            ) : (
                                                <div className="text-[10px] text-rose-300 bg-rose-950/20 border border-rose-900/30 p-2 rounded leading-relaxed mt-1">
                                                    {useGrowthPotion269 && useGrowthPotion269Finish284 ? (
                                                        <span>
                                                            💡 Lv.284에서 <strong>{Math.max(0, Math.ceil((100 - (33.813 * growthPotionCount) - (4.949 * growthPotion269Count)) * 10) / 10).toFixed(1)}%</strong> 도달 즉시 사용되어 285레벨을 달성합니다. <span className="text-slate-400 font-normal text-[9px] block mt-0.5">(성장의 비약 200~269와 합동 계산됨)</span>
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            💡 Lv.284에서 <strong>{Math.max(0, Math.ceil((100 - (33.813 * growthPotionCount)) * 10) / 10).toFixed(1)}%</strong> 도달 즉시 사용되어 285레벨을 달성합니다.
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            <div className="pt-2 border-t border-slate-700/60 mt-1 space-y-1 text-[10px] text-rose-200/70 leading-normal font-normal">
                                                <p className="font-semibold text-rose-300">• 챌린저스 패스 (EXP 지원 물품)</p>
                                                <p className="pl-2 text-[9px] opacity-90">'챌린저스 EXP 패스(19,800 넥슨 캐시)'를 활성화한 후 최고 레벨을 달성하면 획득할 수 있습니다.</p>
                                                <p className="pl-2 text-rose-200">- 30레벨 달성 시: 성장의 비약 (200~279) 1개</p>
                                                <p className="font-semibold text-rose-300 mt-1.5">• [출석 이벤트] 울티마 작전 일지 (보급 일지)</p>
                                                <p className="pl-2 text-[9px] opacity-90">매일 접속하여 보급품 수령(일주일 최대 5회) 횟수를 누적하면 무과금으로도 확정 획득할 수 있습니다.</p>
                                                <p className="pl-2">- 60회차: 성장의 비약 (200~279) 1개</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right: Results */}
                    <div className="space-y-6">
                        <div id="results-section" className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4 sm:p-6 shadow-lg text-white xl:sticky xl:top-24">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Calculator className="w-5 h-5" />계산 결과</h2>
                            <div className="space-y-4">
                                <div><p className="text-sm text-blue-100 mb-1">레벨 구간</p><p className="text-2xl font-bold">Lv.{currentLevel} → Lv.{targetLevel}</p></div>
                                <div><p className="text-sm text-blue-100 mb-1">총 필요 경험치</p><p className="text-3xl font-bold">{formatExpInEok(calculatedData.totalExpNeeded)}</p><p className="text-xs text-blue-100 mt-1">{formatNumber(calculatedData.totalExpNeeded)}</p></div>
                                {calculatedData.daysNeeded > 0 && (
                                    <div className="border-t border-white/20 pt-4">
                                        <p className="text-sm text-blue-100 mb-1 flex items-center gap-1"><Calendar className="w-4 h-4" />예상 소요 일수</p>
                                        <p className="text-2xl font-bold">약 {calculatedData.daysNeeded.toFixed(1)}일</p>
                                        <p className="text-sm text-blue-100 mt-2 flex items-center gap-1"><Clock className="w-4 h-4" />순수 사냥 시간</p>
                                        <p className="text-xl font-bold">약 {calculatedData.hoursNeeded > 0 ? calculatedData.hoursNeeded.toFixed(1) : '-'}시간</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Source Analysis Card */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-purple-500" />총 획득 경험치 분석 <span className="text-xs text-slate-400 font-normal ml-1">(Lv.{currentLevel} → Lv.{targetLevel})</span></h2>
                            <div className="space-y-3">
                                {calculatedData.sourceBreakdown.length > 0 ? calculatedData.sourceBreakdown.map((item, idx) => (
                                    <div key={idx} className="flex flex-col gap-1">
                                        <div className="flex justify-between items-end">
                                            <span className={`text-sm font-medium ${item.textClass}`}>{item.name}</span>
                                            <span className="text-xs text-slate-400">{formatExpInEok(item.value)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${item.bgClass}`} style={{ width: `${item.percent}%` }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-white w-12 text-right">{item.percent.toFixed(1)}%</span>
                                        </div>
                                    </div>
                                )) : <p className="text-slate-500 text-sm text-center py-4">획득 가능한 경험치가 없습니다.</p>}
                            </div>
                        </div>

                        {/* Level Breakdown Card */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green-500" />레벨별 상세 내역</h2>
                            <div className="max-h-[500px] overflow-y-auto space-y-2 pr-2">
                                {calculatedData.levelBreakdown.length > 0 ? calculatedData.levelBreakdown.map((item, index) => {
                                    const d = Math.floor(item.daysNeeded);
                                    const h = dailyHuntingHours > 0 ? Math.round((item.daysNeeded - d) * dailyHuntingHours) : 0;
                                    const timeText = item.note ? item.note : item.daysNeeded > 0 ? `${d > 0 ? `${d}일 ` : ''}${h > 0 ? `${h}시간` : ''} 예상` : (d === 0 && h === 0 && item.daysNeeded > 0) ? "1시간 미만 예상" : "시간 계산 불가";
                                    return (
                                        <div key={index} className="bg-slate-800 border border-slate-700 rounded-lg p-3">
                                            <div className="flex items-center justify-between mb-1"><span className="text-sm font-bold text-white">Lv.{item.level} → {item.level + 1}</span><span className="text-xs text-slate-400">{item.percentage.toFixed(1)}%</span></div>
                                            <div className="flex items-center justify-between mb-1"><span className="text-xs text-slate-400">{formatExpInEok(item.expNeeded)}</span><span className="text-xs text-slate-500">{formatNumber(item.expNeeded)}</span></div>
                                            <div className="text-right border-t border-slate-700/50 mt-1 pt-1"><span className={`text-xs font-medium flex items-center justify-end gap-1 ${item.note ? 'text-pink-400' : 'text-emerald-400'}`}>{!item.note && <Clock className="w-3 h-3" />} {timeText}</span></div>
                                        </div>
                                    );
                                }) : <div className="text-center py-10 text-slate-500">레벨 설정을 확인해주세요.</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* SEO 콘텐츠 섹션 */}
            <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-40 xl:pb-16">
                <div className="border-t border-slate-800 pt-10">
                    <h2 className="text-lg font-bold text-slate-300 mb-6">메이플스토리 경험치 계산기 가이드</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-500 leading-relaxed">
                        <div>
                            <h3 className="text-slate-400 font-semibold mb-2">📌 이 계산기로 무엇을 알 수 있나요?</h3>
                            <p>메이플스토리 경험치 계산기는 현재 레벨에서 목표 레벨까지 필요한 총 경험치와 예상 소요 일수를 계산합니다. Lv.200부터 Lv.300 구간의 레벨별 필요 경험치를 기반으로, 사냥 효율·몬스터파크·일일퀘스트·이벤트까지 반영한 정확한 레벨업 계획을 세울 수 있습니다.</p>
                        </div>
                        <div>
                            <h3 className="text-slate-400 font-semibold mb-2">🔥 하이퍼버닝 & 버닝비욘드 경험치 반영</h3>
                            <p>하이퍼버닝(Lv.200~260, 1레벨업 시 5레벨 보너스)과 버닝비욘드(Lv.260~280, 2레벨 보너스)를 선택하면 레벨 구간별 소요 일수가 자동으로 단축됩니다. 버닝 이벤트 기간에 최적화된 레벨업 계획을 바로 확인하세요.</p>
                        </div>
                        <div>
                            <h3 className="text-slate-400 font-semibold mb-2">🎮 챌린저스 월드 시즌4 경험치 연산</h3>
                            <p>2026년 6월 18일부터 9월 17일까지 진행되는 챌린저스 월드 시즌4의 성장 혜택을 완벽하게 계산합니다. 남은 육성 기간(실시간 카운트다운) 내에 목표 레벨을 달성할 수 있는지 예측하고, 9주차(8/13) 이후 에픽 던전 고대의 힘(+150%) 자동 적용까지 시뮬레이션에 동적으로 연동해 줍니다.</p>
                        </div>
                        <div>
                            <h3 className="text-slate-400 font-semibold mb-2">📊 레벨별 필요 경험치 (주요 구간)</h3>
                            <p>Lv.200~210 구간은 약 22~80억, Lv.220~230 구간은 약 288억~840억, Lv.260~270 구간은 약 1.7조~5.4조, Lv.280~290 구간은 약 33조~294조, Lv.295~299 구간은 약 870조~1,737조의 경험치가 필요합니다. 상위 레벨로 갈수록 필요 경험치가 급격히 증가합니다.</p>
                        </div>
                        <div>
                            <h3 className="text-slate-400 font-semibold mb-2">🗺️ 몬스터파크 & 일일퀘스트 경험치</h3>
                            <p>아케인리버(소멸의 여로~리멘)와 그란디스(세르니움~기어드락) 지역의 일일퀘스트 및 몬스터파크 경험치를 레벨에 맞게 자동 적용합니다. 평일·일요일 몬파 횟수, 이벤트 보너스(%)까지 세밀하게 설정할 수 있습니다.</p>
                        </div>
                        <div>
                            <h3 className="text-slate-400 font-semibold mb-2">📥 엑셀로 저장하는 레벨업 계획표</h3>
                            <p>계산 결과를 엑셀 파일로 저장할 수 있습니다. 입력 설정, 결과 요약, 레벨별 상세 내역이 각 시트로 구분되어 저장되어 메이플스토리 레벨업 계획을 체계적으로 관리할 수 있습니다.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Sticky Footer Result */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#1a1b1e] border-t border-slate-800 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl z-50 xl:hidden">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400">예상 소요 시간</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-white">{calculatedData.daysNeeded > 0 ? `${calculatedData.daysNeeded.toFixed(1)}일` : '-'}</span>
                            {calculatedData.hoursNeeded > 0 && <span className="text-xs text-slate-300">({calculatedData.hoursNeeded.toFixed(1)}시간)</span>}
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            const el = document.getElementById('results-section');
                            if (el) {
                                const y = el.getBoundingClientRect().top + window.scrollY - 100;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                            }
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold text-white flex items-center gap-1 shadow-lg shadow-blue-900/20"
                    >
                        결과 확인 <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* 스펙터 블래스트 경험치 표 모달 */}
            {showSpecterBlastTable && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
                        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                            <h3 className="text-md font-bold text-white flex items-center gap-2">
                                💥 스펙터 블래스트 레벨별 획득 경험치 (%)
                            </h3>
                            <button 
                                onClick={() => setShowSpecterBlastTable(false)}
                                className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-8 h-8 rounded-lg flex items-center justify-center transition-colors text-sm font-bold"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-5 overflow-y-auto space-y-6">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                                {/* 260~269 */}
                                <div className="space-y-1 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                                    <h4 className="font-bold text-indigo-400 border-b border-indigo-900/40 pb-1 mb-2 text-center">260 ~ 269</h4>
                                    {Array.from({ length: 10 }).map((_, i) => {
                                        const lv = 260 + i;
                                        return (
                                            <div key={lv} className="flex justify-between py-0.5 border-b border-slate-900/30">
                                                <span className="text-slate-400 font-medium">Lv.{lv}</span>
                                                <span className="text-slate-200 font-semibold">{SPECTER_BLAST_EXP[lv]}%</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* 270~279 */}
                                <div className="space-y-1 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                                    <h4 className="font-bold text-indigo-400 border-b border-indigo-900/40 pb-1 mb-2 text-center">270 ~ 279</h4>
                                    {Array.from({ length: 10 }).map((_, i) => {
                                        const lv = 270 + i;
                                        return (
                                            <div key={lv} className="flex justify-between py-0.5 border-b border-slate-900/30">
                                                <span className="text-slate-400 font-medium">Lv.{lv}</span>
                                                <span className="text-slate-200 font-semibold">{SPECTER_BLAST_EXP[lv]}%</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* 280~289 */}
                                <div className="space-y-1 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                                    <h4 className="font-bold text-indigo-400 border-b border-indigo-900/40 pb-1 mb-2 text-center">280 ~ 289</h4>
                                    {Array.from({ length: 10 }).map((_, i) => {
                                        const lv = 280 + i;
                                        return (
                                            <div key={lv} className="flex justify-between py-0.5 border-b border-slate-900/30">
                                                <span className="text-slate-400 font-medium">Lv.{lv}</span>
                                                <span className="text-slate-200 font-semibold">{SPECTER_BLAST_EXP[lv]}%</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* 290~299 */}
                                <div className="space-y-1 bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                                    <h4 className="font-bold text-indigo-400 border-b border-indigo-900/40 pb-1 mb-2 text-center">290 ~ 299</h4>
                                    {Array.from({ length: 10 }).map((_, i) => {
                                        const lv = 290 + i;
                                        return (
                                            <div key={lv} className="flex justify-between py-0.5 border-b border-slate-900/30">
                                                <span className="text-slate-400 font-medium">Lv.{lv}</span>
                                                <span className="text-slate-200 font-semibold">{SPECTER_BLAST_EXP[lv]}%</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                                💡 스펙터 블래스트는 주간 1회 클리어 기준으로 제공되는 고정 경험치 비율(%)입니다.<br />
                                몬스터 파크나 사냥터 추가 경험치 버프(도핑)에 영향을 받지 않습니다.
                            </p>
                        </div>
                        <div className="p-4 border-t border-slate-800 flex justify-end">
                            <button
                                onClick={() => setShowSpecterBlastTable(false)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold text-white transition-colors"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
