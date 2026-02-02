'use client';

import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Clock, Download, Info, Zap, Calendar, ChevronDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { InArticleAd } from '@/components/AdSense';
import { HUNTING_EXP_DATA, getHuntingDataForLevel, formatHuntingTime } from '@/data/hunting-exp-rates';
import { HIGH_MOUNTAIN_EXP, ANGLER_COMPANY_EXP, NIGHTMARE_GARDEN_EXP } from '@/data/epic-dungeon-exp';
import { VIP_SAUNA_EXP } from '@/data/vip-sauna-exp';
import { ADVANCED_EXP_COUPON } from '@/data/advanced-exp-coupon';
import { MECHABERRY_FARM_EXP } from '@/data/mechaberry-farm-exp';
import { EXPRESS_BOOSTER_EXP } from '@/data/express-booster-exp';
import { MONSTER_EXP, MonsterExp } from '@/data/monster-exp';
import {
    EXP_DATA, getMonsterParkExp, getGrandisDailyQuest, getArcaneDailyQuest,
    EXTREME_MONSTER_PARK_EXP, MONSTER_PARK_EXP, ARCANE_DAILY_QUEST, GRANDIS_DAILY_QUEST
} from './exp-data';

interface LevelData { level: number; requiredExp: number; cumulativeExp: number; }

export default function ExpCalculatorClient() {
    const [currentLevel, setCurrentLevel] = useState(200);
    const [currentLevelExp, setCurrentLevelExp] = useState(0);
    const [targetLevel, setTargetLevel] = useState(210);
    const [useHyperBurning, setUseHyperBurning] = useState(false);
    const [useBurningBeyond, setUseBurningBeyond] = useState(false);

    const [huntingMode, setHuntingMode] = useState<'percent' | 'manual' | 'calculate'>('calculate');
    const [dailyLevelPercent, setDailyLevelPercent] = useState(20);
    const [huntingExpPerHour, setHuntingExpPerHour] = useState(0);
    const [dailyHuntingHours, setDailyHuntingHours] = useState(3);
    const [mobsPerHour, setMobsPerHour] = useState(14000);
    const [additionalExpRate, setAdditionalExpRate] = useState(0);

    const [monsterParkCount, setMonsterParkCount] = useState(2);
    const [mpEventSkillLevel, setMpEventSkillLevel] = useState(0);
    const [arcaneEventSkillLevel, setArcaneEventSkillLevel] = useState(0);
    const [grandisEventSkillLevel, setGrandisEventSkillLevel] = useState(0);
    const [useSundayMPBonus, setUseSundayMPBonus] = useState(true);
    const [useSundayMaple, setUseSundayMaple] = useState(false);
    const [useArcaneQuest, setUseArcaneQuest] = useState(true);
    const [useGrandisQuest, setUseGrandisQuest] = useState(true);
    const [dailyQuestExp, setDailyQuestExp] = useState(0);
    const [useExtremeMonsterPark, setUseExtremeMonsterPark] = useState(false);

    const [epicDungeonBonus15, setEpicDungeonBonus15] = useState(false);
    const [epicDungeonBonus20, setEpicDungeonBonus20] = useState(false);
    const [epicDungeonBonus25, setEpicDungeonBonus25] = useState(false);

    const [useHighMountain, setUseHighMountain] = useState(false);
    const [highMountainReward, setHighMountainReward] = useState<'basic' | 'stage1' | 'stage2'>('basic');
    const [useAnglerCompany, setUseAnglerCompany] = useState(false);
    const [anglerCompanyReward, setAnglerCompanyReward] = useState<'basic' | 'stage1' | 'stage2'>('basic');
    const [useNightmareGarden, setUseNightmareGarden] = useState(false);
    const [nightmareGardenReward, setNightmareGardenReward] = useState<'basic' | 'stage1' | 'stage2'>('basic');

    const [useVipSauna, setUseVipSauna] = useState(false);
    const [vipSaunaCount, setVipSaunaCount] = useState(1);
    const [useAdvancedExpCoupon, setUseAdvancedExpCoupon] = useState(false);
    const [advancedExpCouponCount, setAdvancedExpCouponCount] = useState(1);
    const [useMechaberryFarm, setUseMechaberryFarm] = useState(false);
    const [mechaberryFarmCount, setMechaberryFarmCount] = useState(3);
    const [useExpressBooster, setUseExpressBooster] = useState(false);
    const [expressBoosterCount, setExpressBoosterCount] = useState(1);
    const [useVipBooster, setUseVipBooster] = useState(false);
    const [vipBoosterCount, setVipBoosterCount] = useState(1);
    const [useElanos, setUseElanos] = useState(false);
    const [useRune, setUseRune] = useState(false);

    const monsterParkData = useMemo(() => getMonsterParkExp(currentLevel), [currentLevel]);
    const monsterParkEventBonus = mpEventSkillLevel > 0 ? (mpEventSkillLevel / 100) : 0;
    const mondayToSaturdayMultiplier = 1.0 + monsterParkEventBonus;
    const sundayMultiplier = (useSundayMPBonus ? 1.5 : 1.0) + monsterParkEventBonus;
    const baseAverageWeeklyMultiplier = (mondayToSaturdayMultiplier * 6 + sundayMultiplier) / 7;
    const dailyMonsterParkExp = monsterParkData.exp * monsterParkCount * baseAverageWeeklyMultiplier;

    const arcaneQuestEventBonus = arcaneEventSkillLevel > 0 ? (arcaneEventSkillLevel / 100) : 0;
    const grandisQuestEventBonus = grandisEventSkillLevel > 0 ? (grandisEventSkillLevel / 100) : 0;
    const epicDungeonMultiplier = 1.0 + (epicDungeonBonus15 ? 0.5 : 0) + (epicDungeonBonus20 ? 1.0 : 0) + (epicDungeonBonus25 ? 1.5 : 0);

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
        let totalExpSources = { hunting: 0, monsterPark: 0, dailyQuest: 0, epicDungeon: 0, vipSauna: 0, expCoupon: 0, farm: 0, booster: 0, vipBooster: 0 };

        if ((huntingMode === 'percent' && dailyLevelPercent > 0) || (huntingMode === 'manual' && huntingExpPerHour > 0) || (huntingMode === 'calculate' && dailyHuntingHours > 0) || dailyQuestExp > 0 || monsterParkCount > 0 || useArcaneQuest || useGrandisQuest || useHighMountain || useAnglerCompany || useNightmareGarden || useVipSauna || useVipBooster || useAdvancedExpCoupon || useMechaberryFarm) {
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
                farm: useMechaberryFarm ? mechaberryFarmCount : 0
            };
            let carriedOverExp = 0;

            while (remainingExp > 0 && currentSimLevel < targetLevel) {
                // Check if any consumables can be used at this level
                if (inventory.booster > 0) {
                    const d = EXPRESS_BOOSTER_EXP.find(x => x.level === Math.min(currentSimLevel, 294));
                    if (d) {
                        const amount = d.exp * 190 * inventory.booster;
                        carriedOverExp += amount;
                        totalExpSources.booster += amount;
                        inventory.booster = 0;
                    }
                }
                if (inventory.sauna > 0) {
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
                        // Formula: Base * 10 (VIP) * 190 * (1 + (Add% + 125%)/100)
                        const oneMobVipExp = monsterData.exp * 10 * ((100 + additionalExpRate + 125) / 100);
                        const amount = oneMobVipExp * 190 * inventory.vipBooster;
                        carriedOverExp += amount;
                        totalExpSources.vipBooster += amount;
                        inventory.vipBooster = 0;
                    }
                }
                if (inventory.coupon > 0) {
                    const d = ADVANCED_EXP_COUPON.find(x => x.level === currentSimLevel);
                    if (d) {
                        const amount = d.exp * inventory.coupon;
                        carriedOverExp += amount;
                        totalExpSources.expCoupon += amount;
                        inventory.coupon = 0;
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

                const arcaneBonus = arcaneEventSkillLevel > 0 ? (arcaneEventSkillLevel / 100) : 0;
                const grandisBonus = grandisEventSkillLevel > 0 ? (grandisEventSkillLevel / 100) : 0;

                const mpData = getMonsterParkExp(currentSimLevel);
                const dailyMonsterParkExpSim = mpData.exp * monsterParkCount * baseAverageWeeklyMultiplier;
                const dailyArcaneQuestExpSim = useArcaneQuest ? getArcaneDailyQuest(currentSimLevel).exp * (1 + arcaneBonus) : 0;
                const dailyGrandisQuestExpSim = useGrandisQuest ? getGrandisDailyQuest(currentSimLevel).exp * (1 + grandisBonus) : 0;

                let dailyHighMountainExpSim = 0;
                const nightmareData = NIGHTMARE_GARDEN_EXP.find(d => d.level === currentSimLevel);
                const isNightmareValid = nightmareData && nightmareData.basic > 0;
                const skipHighMountain = (useAnglerCompany && currentSimLevel >= 270) || (useNightmareGarden && currentSimLevel >= 280 && isNightmareValid);
                if (useHighMountain && currentSimLevel >= 260 && !skipHighMountain) {
                    const hmData = HIGH_MOUNTAIN_EXP.find(d => d.level === currentSimLevel);
                    if (hmData) dailyHighMountainExpSim = ((highMountainReward === 'basic' ? hmData.basic : highMountainReward === 'stage1' ? hmData.bonus1 : hmData.bonus2) * epicDungeonMultiplier) / 7;
                }

                let dailyAnglerCompanyExpSim = 0;
                const skipAnglerCompany = useNightmareGarden && currentSimLevel >= 280 && isNightmareValid;
                if (useAnglerCompany && currentSimLevel >= 270 && !skipAnglerCompany) {
                    const acData = ANGLER_COMPANY_EXP.find(d => d.level === currentSimLevel);
                    if (acData) dailyAnglerCompanyExpSim = ((anglerCompanyReward === 'basic' ? acData.basic : anglerCompanyReward === 'stage1' ? acData.bonus1 : acData.bonus2) * epicDungeonMultiplier) / 7;
                }

                let dailyNightmareGardenExpSim = 0;
                if (useNightmareGarden && currentSimLevel >= 280) {
                    const ngData = NIGHTMARE_GARDEN_EXP.find(d => d.level === currentSimLevel);
                    if (ngData) dailyNightmareGardenExpSim = ((nightmareGardenReward === 'basic' ? ngData.basic : nightmareGardenReward === 'stage1' ? ngData.bonus1 : ngData.bonus2) * epicDungeonMultiplier) / 7;
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

                if (mpData.area !== currentMonsterParkArea && monsterParkCount > 0) {
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
                        // 1 Cycle = 4 Runes (3 Regular + 1 Blessed)
                        // Cooldown: 15 min (900s) -> Total Cycle Time: 4 * 900s = 3600s
                        // Duration: 180s per rune
                        // Regular Rune: +100% EXP for 180s * 3 times
                        // Blessed Rune: +200% EXP for 180s * 1 time
                        // Avg Bonus = ((3 * 180 * 100) + (1 * 180 * 200)) / 3600 = 90000 / 3600 = 25%
                        const runeBonus = useRune ? 25 : 0;

                        // Normal Hunting: Base + Additional + Rune
                        const oneMobExp = monsterData.exp * 1.2 * ((100 + additionalExpRate + runeBonus) / 100);
                        dailyHuntingExp = oneMobExp * mobsPerHour * dailyHuntingHours;

                        if (useElanos) {
                            // Elanos: Base + Additional (NO Rune)
                            const oneMobElanosExp = monsterData.exp * 1.2 * ((100 + additionalExpRate) / 100);
                            dailyHuntingExp += oneMobElanosExp * 10000;
                        }
                    }
                }

                const dailyTotalExp = dailyHuntingExp + dailyQuestExp + dailyMonsterParkExpSim + dailyArcaneQuestExpSim + dailyGrandisQuestExpSim + dailyHighMountainExpSim + dailyAnglerCompanyExpSim + dailyNightmareGardenExpSim + dailyExtremeMpExpSim;

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
                else if (useBurningBeyond && currentSimLevel >= 260 && currentSimLevel < 270) levelUpBonus = 2;

                if (levelUpBonus > 1) {
                    for (let i = 1; i < levelUpBonus; i++) {
                        const skippedLevel = currentSimLevel + i;
                        if (skippedLevel >= targetLevel) break;
                        const skippedItem = levelBreakdown.find(item => item.level === skippedLevel);
                        if (skippedItem) {
                            skippedItem.note = currentSimLevel < 260 ? '🔥 하이퍼버닝 보너스' : '✨ 버닝 비욘드 보너스';
                        }
                    }
                }

                currentSimLevel += levelUpBonus;
                currentSimLevelProgress = 0;
            }
            if (monsterParkBreakdown.length > 0 && monsterParkDayCount > 0) monsterParkBreakdown[monsterParkBreakdown.length - 1].days = monsterParkDayCount;

            if (useSundayMaple && monsterParkCount > 0) {
                const sundayMapleExtraExp = monsterParkData.exp * monsterParkCount * 2.5;
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
            { name: '익스프레스 부스터', value: totalExpSources.booster, textClass: 'text-green-400', bgClass: 'bg-green-400' },
            { name: 'VIP/헥사 부스터', value: totalExpSources.vipBooster, textClass: 'text-indigo-300', bgClass: 'bg-indigo-300' }
        ];

        const totalAccumulated = breakdownList.reduce((acc, item) => acc + item.value, 0);
        const sourceBreakdown = totalAccumulated > 0 ? breakdownList.filter(i => i.value > 0).map(i => ({ ...i, percent: (i.value / totalAccumulated) * 100 })).sort((a, b) => b.value - a.value) : [];

        return { totalExpNeeded, daysNeeded, hoursNeeded, levelBreakdown, monsterParkBreakdown, sourceBreakdown };
    }, [currentLevel, currentLevelExp, targetLevel, huntingMode, dailyLevelPercent, huntingExpPerHour, dailyQuestExp, dailyHuntingHours, monsterParkCount, mpEventSkillLevel, arcaneEventSkillLevel, grandisEventSkillLevel, useSundayMPBonus, useSundayMaple, useArcaneQuest, useGrandisQuest, useHyperBurning, useBurningBeyond, useHighMountain, highMountainReward, useAnglerCompany, anglerCompanyReward, useNightmareGarden, nightmareGardenReward, useExtremeMonsterPark, useVipSauna, vipSaunaCount, useAdvancedExpCoupon, advancedExpCouponCount, useMechaberryFarm, mechaberryFarmCount, epicDungeonBonus15, epicDungeonBonus20, epicDungeonBonus25, useExpressBooster, expressBoosterCount, useVipBooster, vipBoosterCount, mobsPerHour, additionalExpRate, useElanos, useRune]);

    const formatNumber = (num: number) => new Intl.NumberFormat('ko-KR').format(Math.round(num));
    const formatExpInEok = (exp: number) => { const eok = exp / 100000000; return eok >= 10000 ? `${(eok / 10000).toFixed(2)}조` : eok >= 1 ? `${eok.toFixed(2)}억` : formatNumber(exp); };
    const exportToExcel = () => {
        const worksheetData = [['레벨 구간', '필요 경험치', '진행률 (%)', '예상 소요 시간'], ...calculatedData.levelBreakdown.map(item => {
            const d = Math.floor(item.daysNeeded);
            const h = dailyHuntingHours > 0 ? Math.round((item.daysNeeded - d) * dailyHuntingHours) : 0;
            const timeText = item.note ? item.note : item.daysNeeded > 0 ? `${d > 0 ? `${d}일 ` : ''}${h > 0 ? `${h}시간` : ''}` : '-';
            return [`Lv.${item.level} → ${item.level + 1}`, item.expNeeded, `${item.percentage.toFixed(1)}%`, timeText];
        }), [], ['총 필요 경험치', calculatedData.totalExpNeeded], ['예상 소요 일수', calculatedData.daysNeeded > 0 ? `${calculatedData.daysNeeded.toFixed(1)}일` : '-'], ['예상 소요 시간', calculatedData.hoursNeeded > 0 ? `${calculatedData.hoursNeeded.toFixed(1)}시간` : '-']];
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, '경험치 계산');
        XLSX.writeFile(workbook, `메이플_경험치계산_Lv${currentLevel}to${targetLevel}.xlsx`);
    };

    return (
        <div className="min-h-screen bg-[#1a1b1e] text-slate-200">
            <div className="sticky top-0 z-50 bg-[#1a1b1e]/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" /><span>메인으로</span></Link>
                        <button onClick={exportToExcel} disabled={calculatedData.totalExpNeeded === 0} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg transition-colors text-sm font-medium"><Download className="w-4 h-4" />엑셀 내보내기</button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold text-white flex items-center gap-2"><Calculator className="w-8 h-8 text-blue-500" />경험치 계산기</h1>
                        <p className="text-slate-400 text-sm">Lv.200~300 구간 목표 레벨까지 필요한 경험치와 예상 소요 시간을 계산하세요.</p>
                    </div>
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 xl:pb-8">
                <div className="mb-6"><InArticleAd dataAdSlot="8162808816" /></div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-6">
                        {/* 레벨 설정 */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-500" />레벨 설정</h2>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2"><label className="text-sm font-medium text-slate-300">현재 레벨</label><span className="text-2xl font-bold text-blue-400">Lv.{currentLevel}</span></div>
                                    <input type="range" min="200" max="299" step="1" value={currentLevel} onChange={(e) => { const newLevel = Number(e.target.value); setCurrentLevel(newLevel); if (newLevel >= targetLevel) setTargetLevel(Math.min(300, newLevel + 1)); }} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-300 mb-2 block">현재 레벨 진행도 (%)</label>
                                    <input type="number" min="0" max="99" step="1" value={currentLevelExp} onChange={(e) => setCurrentLevelExp(Math.min(99, Math.max(0, Number(e.target.value))))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="0" />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2"><label className="text-sm font-medium text-slate-300">목표 레벨</label><span className="text-2xl font-bold text-purple-400">Lv.{targetLevel}</span></div>
                                    <input type="range" min={currentLevel + 1} max="300" step="1" value={targetLevel} onChange={(e) => setTargetLevel(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                                </div>
                                {currentLevel < 260 && targetLevel > 200 && (
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 cursor-pointer"><input type="checkbox" checked={useHyperBurning} onChange={(e) => setUseHyperBurning(e.target.checked)} className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-red-600 focus:ring-red-500" />🔥 하이퍼버닝 (Lv.200~260)</label>
                                )}
                                {currentLevel < 270 && targetLevel >= 260 && (
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 cursor-pointer"><input type="checkbox" checked={useBurningBeyond} onChange={(e) => setUseBurningBeyond(e.target.checked)} className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-purple-500" />✨ 버닝 비욘드 (Lv.260~270)</label>
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
                                        <div><label className="text-xs text-slate-400 mb-1 block">하루 사냥 시간 (시간)</label><input type="number" min="0" max="24" step="0.5" value={dailyHuntingHours} onChange={(e) => setDailyHuntingHours(Math.max(0, Math.min(24, Number(e.target.value))))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-green-500" /></div>
                                        <div><label className="text-xs text-slate-400 mb-1 block">시간당 마릿수</label><input type="number" min="0" step="100" value={mobsPerHour} onChange={(e) => setMobsPerHour(Math.max(0, Number(e.target.value)))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-green-500" /></div>
                                        <div className="sm:col-span-2"><label className="text-xs text-slate-400 mb-1 block">추가 경험치 (%)</label><input type="number" min="0" value={additionalExpRate} onChange={(e) => setAdditionalExpRate(Math.max(0, Number(e.target.value)))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-green-500" /></div>
                                        <div className="sm:col-span-2 mt-2 space-y-2">
                                            <div className="grid grid-cols-1 gap-2">
                                                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer p-2 bg-slate-800 border border-slate-700 rounded-lg hover:border-blue-500 transition-colors">
                                                    <input type="checkbox" checked={useRune} onChange={(e) => setUseRune(e.target.checked)} className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-blue-600 focus:ring-blue-500" />
                                                    <div className="flex flex-col">
                                                        <span>💎 룬 해방 (15분 주기/3번 일반, 1번 축복)</span>
                                                        <span className="text-[10px] text-slate-500">지속적인 해방 시 평균 +25% 효율로 계산됨</span>
                                                    </div>
                                                </label>
                                                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer p-2 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 transition-colors">
                                                    <input type="checkbox" checked={useElanos} onChange={(e) => setUseElanos(e.target.checked)} className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-green-600 focus:ring-green-500" />
                                                    <span>🦁 엘라노스 추가 경험치 (하루 20번) <span className="text-slate-500 text-[10px] ml-1">약 10,000마리분</span></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {huntingMode === 'manual' && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div><label className="text-xs text-slate-400 mb-1 block">시간당 경험치</label><input type="number" min="0" step="100000000" value={huntingExpPerHour} onChange={(e) => setHuntingExpPerHour(Math.max(0, Number(e.target.value)))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-yellow-500" /></div>
                                        <div><label className="text-xs text-slate-400 mb-1 block">하루 사냥 시간</label><input type="number" min="0" max="24" value={dailyHuntingHours} onChange={(e) => setDailyHuntingHours(Math.max(0, Math.min(24, Number(e.target.value))))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-yellow-500" /></div>
                                    </div>
                                )}
                                {huntingMode === 'percent' && (
                                    <div><label className="text-xs text-slate-400 mb-1 block">하루 경험치 (%)</label><input type="number" min="0" max="100" value={dailyLevelPercent} onChange={(e) => setDailyLevelPercent(Math.max(0, Math.min(100, Number(e.target.value))))} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-purple-500" /></div>
                                )}
                            </div>
                        </div>

                        {/* 일일 & 주간 컨텐츠 (Grid Layout) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Left: Daily Routine */}
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-4">
                                <h3 className="font-bold text-white flex items-center gap-2"><Calendar className="w-4 h-4 text-emerald-500" />일일 루틴</h3>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs text-slate-400">몬스터파크</label>
                                        <div className="flex items-center gap-1">
                                            <span className="text-[10px] text-slate-500">이벤트 +</span>
                                            <select
                                                value={mpEventSkillLevel}
                                                onChange={(e) => setMpEventSkillLevel(Number(e.target.value))}
                                                className="h-8 bg-slate-800 border border-slate-700 rounded text-xs px-1 text-right text-white focus:outline-none focus:border-blue-500"
                                            >
                                                {[0, 10, 20, 30, 40, 50, 60, 70, 80].map(v => (
                                                    <option key={v} value={v}>{v}</option>
                                                ))}
                                            </select>
                                            <span className="text-xs text-slate-500">%</span>
                                        </div>
                                    </div>
                                    <select value={monsterParkCount} onChange={(e) => setMonsterParkCount(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded text-sm px-2 py-1 text-white mb-2">
                                        {[0, 1, 2, 3, 4, 5, 6, 7].map(c => <option key={c} value={c}>{c}회 {c === 2 ? '(무료)' : ''}</option>)}
                                    </select>
                                    <div className="text-xs flex items-center gap-2">
                                        <input type="checkbox" id="sunday" checked={useSundayMPBonus} onChange={(e) => setUseSundayMPBonus(e.target.checked)} />
                                        <label htmlFor="sunday" className="cursor-pointer text-slate-300">일요일 보너스 (1.5배)</label>
                                    </div>
                                </div>
                                {targetLevel >= 260 && (
                                    <label className="flex items-center gap-2 text-xs text-slate-300"><input type="checkbox" checked={useExtremeMonsterPark} onChange={(e) => setUseExtremeMonsterPark(e.target.checked)} /> 👹 익스트림 몬스터파크 (주간 1회)</label>
                                )}
                                <div className="pt-2 border-t border-slate-800 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 text-xs text-slate-300"><input type="checkbox" checked={useArcaneQuest} onChange={(e) => setUseArcaneQuest(e.target.checked)} /> 아케인 일일 퀘스트</label>
                                        {useArcaneQuest && (
                                            <div className="flex items-center gap-1">
                                                <span className="text-[10px] text-slate-500">이벤트 +</span>
                                                <select
                                                    value={arcaneEventSkillLevel}
                                                    onChange={(e) => setArcaneEventSkillLevel(Number(e.target.value))}
                                                    className="h-8 bg-slate-800 border border-slate-700 rounded text-xs px-1 text-right text-white focus:outline-none focus:border-blue-500"
                                                >
                                                    {[0, 10, 20, 30, 40, 50, 60, 70].map(v => (
                                                        <option key={v} value={v}>{v}</option>
                                                    ))}
                                                </select>
                                                <span className="text-xs text-slate-500">%</span>
                                            </div>
                                        )}
                                    </div>
                                    {targetLevel >= 260 && (
                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center gap-2 text-xs text-slate-300"><input type="checkbox" checked={useGrandisQuest} onChange={(e) => setUseGrandisQuest(e.target.checked)} /> 그란디스 일일 퀘스트</label>
                                            {useGrandisQuest && (
                                                <div className="flex items-center gap-1">
                                                    <span className="text-[10px] text-slate-500">이벤트 +</span>
                                                    <select
                                                        value={grandisEventSkillLevel}
                                                        onChange={(e) => setGrandisEventSkillLevel(Number(e.target.value))}
                                                        className="h-8 bg-slate-800 border border-slate-700 rounded text-xs px-1 text-right text-white focus:outline-none focus:border-blue-500"
                                                    >
                                                        {[0, 10, 20, 30, 40, 50, 60, 70].map(v => (
                                                            <option key={v} value={v}>{v}</option>
                                                        ))}
                                                    </select>
                                                    <span className="text-xs text-slate-500">%</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
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
                                        <div className="flex gap-2 flex-wrap">
                                            <label className="flex items-center gap-1 text-xs text-indigo-300"><input type="checkbox" checked={epicDungeonBonus15} onChange={(e) => setEpicDungeonBonus15(e.target.checked)} />1.5배</label>
                                            <label className="flex items-center gap-1 text-xs text-indigo-300"><input type="checkbox" checked={epicDungeonBonus20} onChange={(e) => setEpicDungeonBonus20(e.target.checked)} />2배</label>
                                            <label className="flex items-center gap-1 text-xs text-indigo-300"><input type="checkbox" checked={epicDungeonBonus25} onChange={(e) => setEpicDungeonBonus25(e.target.checked)} />2.5배</label>
                                        </div>
                                    </div>
                                    <div className="pt-2 border-t border-slate-800 space-y-2">
                                        <label className="flex items-center gap-2 text-xs text-slate-300"><input type="checkbox" checked={useHighMountain} onChange={(e) => setUseHighMountain(e.target.checked)} /> 🏔️ 하이마운틴</label>
                                        {useHighMountain && <select value={highMountainReward} onChange={(e) => setHighMountainReward(e.target.value as any)} className="w-full bg-slate-800 border border-slate-700 rounded text-xs px-2 py-1"><option value="basic">기본</option><option value="stage1">XP 1단계</option><option value="stage2">XP 2단계</option></select>}

                                        {targetLevel >= 270 && (
                                            <>
                                                <label className="flex items-center gap-2 text-xs text-slate-300 mt-2"><input type="checkbox" checked={useAnglerCompany} onChange={(e) => setUseAnglerCompany(e.target.checked)} /> 🏭 앵글러 컴퍼니</label>
                                                {useAnglerCompany && <select value={anglerCompanyReward} onChange={(e) => setAnglerCompanyReward(e.target.value as any)} className="w-full bg-slate-800 border border-slate-700 rounded text-xs px-2 py-1"><option value="basic">기본</option><option value="stage1">XP 1단계</option><option value="stage2">XP 2단계</option></select>}
                                            </>
                                        )}
                                        {targetLevel >= 280 && (
                                            <>
                                                <label className="flex items-center gap-2 text-xs text-slate-300 mt-2"><input type="checkbox" checked={useNightmareGarden} onChange={(e) => setUseNightmareGarden(e.target.checked)} /> 🌌 악몽선경</label>
                                                {useNightmareGarden && <select value={nightmareGardenReward} onChange={(e) => setNightmareGardenReward(e.target.value as any)} className="w-full bg-slate-800 border border-slate-700 rounded text-xs px-2 py-1"><option value="basic">기본</option><option value="stage1">XP 1단계</option><option value="stage2">XP 2단계</option></select>}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 소비 아이템 (2 Columns) */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-lg">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">🧪 소비 아이템</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {targetLevel >= 260 && (
                                    <div className="p-3 bg-slate-800 rounded-lg">
                                        <label className="flex items-center gap-2 text-xs text-orange-300 mb-2"><input type="checkbox" checked={useVipSauna} onChange={(e) => setUseVipSauna(e.target.checked)} /> ♨️ VIP 사우나</label>
                                        {useVipSauna && <div className="flex items-center gap-2"><input type="number" value={vipSaunaCount} onChange={(e) => setVipSaunaCount(Number(e.target.value))} className="w-16 bg-slate-700 border-slate-600 rounded text-xs px-2 py-1" /><span className="text-xs">장</span></div>}
                                    </div>
                                )}
                                {targetLevel >= 260 && (
                                    <div className="p-3 bg-slate-800 rounded-lg">
                                        <label className="flex items-center gap-2 text-xs text-teal-300 mb-2"><input type="checkbox" checked={useAdvancedExpCoupon} onChange={(e) => setUseAdvancedExpCoupon(e.target.checked)} /> 🎫 상급 EXP 쿠폰</label>
                                        {useAdvancedExpCoupon && <div className="flex items-center gap-2"><input type="number" value={advancedExpCouponCount} onChange={(e) => setAdvancedExpCouponCount(Number(e.target.value))} className="w-16 bg-slate-700 border-slate-600 rounded text-xs px-2 py-1" /><span className="text-xs">개</span></div>}
                                    </div>
                                )}
                                {targetLevel >= 280 && (
                                    <div className="p-3 bg-slate-800 rounded-lg">
                                        <label className="flex items-center gap-2 text-xs text-pink-300 mb-2"><input type="checkbox" checked={useMechaberryFarm} onChange={(e) => setUseMechaberryFarm(e.target.checked)} /> 🍓 메카베리 농장</label>
                                        {useMechaberryFarm && <div className="flex items-center gap-2"><input type="number" value={mechaberryFarmCount} onChange={(e) => setMechaberryFarmCount(Number(e.target.value))} className="w-16 bg-slate-700 border-slate-600 rounded text-xs px-2 py-1" /><span className="text-xs">회</span></div>}
                                    </div>
                                )}
                                {targetLevel >= 260 && (
                                    <div className="p-3 bg-slate-800 rounded-lg">
                                        <label className="flex items-center gap-2 text-xs text-green-300 mb-2"><input type="checkbox" checked={useExpressBooster} onChange={(e) => setUseExpressBooster(e.target.checked)} /> 🎫 익스프레스 부스터</label>
                                        {useExpressBooster && <div className="flex items-center gap-2"><input type="number" value={expressBoosterCount} onChange={(e) => setExpressBoosterCount(Number(e.target.value))} className="w-16 bg-slate-700 border-slate-600 rounded text-xs px-2 py-1" /><span className="text-xs">장</span></div>}
                                    </div>
                                )}
                                <div className="p-3 bg-slate-800 rounded-lg">
                                    <label className="flex items-center gap-2 text-xs text-indigo-300 mb-2">
                                        <input type="checkbox" checked={useVipBooster} onChange={(e) => setUseVipBooster(e.target.checked)} />
                                        <span>⚡ VIP/헥사 부스터 <span className="text-[10px] block opacity-70">룬 효과 활성화 때만 사용</span></span>
                                    </label>
                                    {useVipBooster && <div className="flex items-center gap-2"><input type="number" min="1" value={vipBoosterCount} onChange={(e) => setVipBoosterCount(Math.max(1, Number(e.target.value)))} className="w-16 bg-slate-700 border-slate-600 rounded text-xs px-2 py-1" /><span className="text-xs">개</span></div>}
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

                        {/* New Source Analysis Card */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
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
                    </div>
                </div>
            </main>

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
        </div>
    );
}
