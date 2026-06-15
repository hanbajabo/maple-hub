'use client';

import React, { useState, useMemo } from 'react';
import { TIERS, LEVEL_MISSIONS, BOSS_MISSIONS, SEASON_MISSIONS, WEEKLY_COINS, MAX_WEEKS, NORMAL_SHOP_ITEMS, SPECIAL_SHOP_ITEMS } from './data';
import { Calculator, Trophy, Coins, Star, Target, Shield, ArrowLeft, ShoppingCart, Plus, Minus, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '@/components/AdSense/AdBanner';

const GEOMMIT_BOSSES: Record<string, string> = {
  zakum: 'zakum_chaos',
  pierre: 'pierre_chaos',
  banban: 'banban_chaos',
  bloodyqueen: 'bloodyqueen_chaos',
  magnus: 'magnus_hard',
  vellum: 'vellum_chaos',
  papulatus: 'papulatus_chaos',
  suu: 'suu_hard',
  demian: 'demian_hard',
  slime: 'slime_chaos',
  lucid: 'lucid_hard',
  will: 'will_hard',
  kai: 'kai_normal',
  dusk: 'dusk_chaos',
  hilla: 'hilla_hard',
  dunkel: 'dunkel_hard'
};

const GEOMNOSEIKAL_BOSSES: Record<string, string> = {
  ...GEOMMIT_BOSSES,
  blackmage: 'blackmage_hard',
  seren: 'seren_normal',
  kalos: 'kalos_easy'
};

const GEOMNOSEIKALDAE_BOSSES: Record<string, string> = {
  ...GEOMNOSEIKAL_BOSSES,
  daejeok: 'daejeok_easy'
};

export default function ChallengersCalculator() {
  // State
  const [targetLevel, setTargetLevel] = useState<number>(260);
  const [weeksParticipated, setWeeksParticipated] = useState<number>(13);
  const [completedSeasonMissions, setCompletedSeasonMissions] = useState<Set<string>>(new Set());
  const [clearedBosses, setClearedBosses] = useState<Record<string, string>>({}); // group -> id
  const [cartNormal, setCartNormal] = useState<Record<string, number>>({});
  const [cartSpecial, setCartSpecial] = useState<Record<string, number>>({});

  // Logic
  const levelPoints = useMemo(() => {
    let points = 0;
    let coins = 0;
    LEVEL_MISSIONS.forEach(mission => {
      if (mission.type === 'achieve' && targetLevel >= mission.level) {
        points += mission.points;
        coins += mission.coins;
      } else if (mission.type === 'perLevel' && targetLevel >= mission.level) {
        points += mission.points;
        coins += mission.coins;
      }
    });
    return { points, coins };
  }, [targetLevel]);

  const weeklyCoins = weeksParticipated * WEEKLY_COINS;

  const seasonStats = useMemo(() => {
    let coins = 0;
    SEASON_MISSIONS.forEach(mission => {
      if (completedSeasonMissions.has(mission.id)) {
        coins += mission.coins;
      }
    });
    return { coins };
  }, [completedSeasonMissions]);

  const bossStats = useMemo(() => {
    let points = 0;
    let coins = 0;
    let advancedCoins = 0;
    
    // Group bosses to calculate cumulative rewards
    const groups = new Set(BOSS_MISSIONS.map(b => b.group));
    groups.forEach(group => {
      const clearedId = clearedBosses[group];
      if (clearedId) {
        const clearedBoss = BOSS_MISSIONS.find(b => b.id === clearedId);
        if (clearedBoss) {
          // Add rewards for all bosses in this group with level <= clearedBoss.level
          BOSS_MISSIONS.filter(b => b.group === group && b.level <= clearedBoss.level).forEach(b => {
            points += b.points;
            coins += b.coins;
            advancedCoins += b.advancedCoins;
          });
        }
      }
    });

    return { points, coins, advancedCoins };
  }, [clearedBosses]);

  const totalPoints = levelPoints.points + bossStats.points;
  const totalCoins = levelPoints.coins + weeklyCoins + seasonStats.coins + bossStats.coins;
  const totalAdvancedCoins = bossStats.advancedCoins;

  const handleCartNormalChange = (id: string, delta: number, maxQty: number) => {
    setCartNormal(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, Math.min(maxQty, current + delta));
      return { ...prev, [id]: next };
    });
  };

  const handleCartSpecialChange = (id: string, delta: number, maxQty: number) => {
    setCartSpecial(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, Math.min(maxQty, current + delta));
      return { ...prev, [id]: next };
    });
  };

  const cartCosts = useMemo(() => {
    let normalCost = 0;
    Object.entries(cartNormal).forEach(([id, qty]) => {
      const item = NORMAL_SHOP_ITEMS.find(i => i.id === id);
      if (item) normalCost += item.price * qty;
    });

    let specialCost = 0;
    Object.entries(cartSpecial).forEach(([id, qty]) => {
      const item = SPECIAL_SHOP_ITEMS.find(i => i.id === id);
      if (item) specialCost += item.price * qty;
    });

    return { normalCost, specialCost };
  }, [cartNormal, cartSpecial]);

  const currentTier = useMemo(() => {
    let tier = TIERS[0];
    for (let i = TIERS.length - 1; i >= 0; i--) {
      if (totalPoints >= TIERS[i].points) {
        // Check boss req
        if (TIERS[i].reqBoss) {
            // Very simple check for req boss. (Meilin normal or hard)
            const meilinCleared = clearedBosses['meilin'];
            if (TIERS[i].reqBoss === '메이린(노멀)') {
                if (meilinCleared === 'meilin_normal' || meilinCleared === 'meilin_hard') {
                    return TIERS[i];
                }
            } else if (TIERS[i].reqBoss === '메이린(하드)') {
                if (meilinCleared === 'meilin_hard') {
                    return TIERS[i];
                }
            }
        } else {
            return TIERS[i];
        }
      }
    }
    return { name: '언랭크', points: 0, rewards: '없음' };
  }, [totalPoints, clearedBosses]);

  const aggregatedRewards = useMemo(() => {
    const tierIndex = TIERS.findIndex(t => t.name === currentTier.name);
    if (tierIndex === -1 || currentTier.name === '언랭크') return [];
    
    const achievedTiers = TIERS.slice(0, tierIndex + 1);
    const itemMap = new Map<string, number>();
    const singularItemsMap = new Map<string, number>();
    
    achievedTiers.forEach(tier => {
      if (!tier.rewards || tier.rewards === '없음') return;
      const items = tier.rewards.split(', ');
      items.forEach(item => {
        const match = item.match(/(.+)\s+([0-9,]+)개$/);
        if (match) {
          const name = match[1];
          const qty = parseInt(match[2].replace(/,/g, ''), 10);
          itemMap.set(name, (itemMap.get(name) || 0) + qty);
        } else {
          singularItemsMap.set(item, (singularItemsMap.get(item) || 0) + 1);
        }
      });
    });
    
    const result: string[] = [];
    singularItemsMap.forEach((qty, item) => {
        if (qty > 1) {
            result.push(`${item} ${qty}개`);
        } else {
            result.push(item);
        }
    });
    itemMap.forEach((qty, name) => {
      result.push(`${name} ${qty.toLocaleString()}개`);
    });
    
    return result;
  }, [currentTier.name]);

  const toggleSeasonMission = (id: string) => {
    setCompletedSeasonMissions(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isGeommitChecked = useMemo(() => {
    return Object.entries(GEOMMIT_BOSSES).every(([group, id]) => clearedBosses[group] === id);
  }, [clearedBosses]);

  const isGeomnoseikalChecked = useMemo(() => {
    return Object.entries(GEOMNOSEIKAL_BOSSES).every(([group, id]) => clearedBosses[group] === id);
  }, [clearedBosses]);

  const isGeomnoseikaldaeChecked = useMemo(() => {
    return Object.entries(GEOMNOSEIKALDAE_BOSSES).every(([group, id]) => clearedBosses[group] === id);
  }, [clearedBosses]);

  const handleGeomnoseikalClick = () => {
    if (isGeomnoseikalChecked) {
      setClearedBosses(prev => {
        const next = { ...prev };
        Object.keys(GEOMNOSEIKAL_BOSSES).forEach(group => {
          if (next[group] === GEOMNOSEIKAL_BOSSES[group]) {
            delete next[group];
          }
        });
        return next;
      });
    } else {
      setClearedBosses(prev => ({
        ...prev,
        ...GEOMNOSEIKAL_BOSSES
      }));
    }
  };

  const handleGeomnoseikaldaeClick = () => {
    if (isGeomnoseikaldaeChecked) {
      setClearedBosses(prev => {
        const next = { ...prev };
        Object.keys(GEOMNOSEIKALDAE_BOSSES).forEach(group => {
          if (next[group] === GEOMNOSEIKALDAE_BOSSES[group]) {
            delete next[group];
          }
        });
        return next;
      });
    } else {
      setClearedBosses(prev => ({
        ...prev,
        ...GEOMNOSEIKALDAE_BOSSES
      }));
    }
  };

  const isMehardChecked = clearedBosses['meilin'] === 'meilin_hard';

  const handleMehardClick = () => {
    setClearedBosses(prev => {
      const next = { ...prev };
      if (isMehardChecked) {
        delete next['meilin'];
      } else {
        next['meilin'] = 'meilin_hard';
      }
      return next;
    });
  };

  const handleGeommitClick = () => {
    if (isGeommitChecked) {
      setClearedBosses(prev => {
        const next = { ...prev };
        Object.keys(GEOMMIT_BOSSES).forEach(group => {
          if (next[group] === GEOMMIT_BOSSES[group]) {
            delete next[group];
          }
        });
        return next;
      });
    } else {
      setClearedBosses(prev => ({
        ...prev,
        ...GEOMMIT_BOSSES
      }));
    }
  };

  const toggleAllSeasonMissions = () => {
    if (completedSeasonMissions.size === SEASON_MISSIONS.length) {
      setCompletedSeasonMissions(new Set());
    } else {
      setCompletedSeasonMissions(new Set(SEASON_MISSIONS.map(m => m.id)));
    }
  };

  const handleBossChange = (group: string, id: string) => {
    setClearedBosses(prev => {
      const next = { ...prev };
      if (next[group] === id) {
        delete next[group]; // Toggle off
      } else {
        next[group] = id;
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#080711] text-slate-100 pb-24 font-sans">
      {/* Background effects */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-1/4 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <header className="w-full max-w-5xl flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-[#080711]/90 backdrop-blur-md border-b border-slate-800/80 mx-auto">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-indigo-400 font-semibold group">
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          <span>홈으로 돌아가기</span>
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 relative z-10">
        
        {/* Title */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-4">
            <Calculator className="w-4 h-4" />
            챌린저스 월드 시즌4
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent pb-1">
            티어 및 코인 계산기
          </h1>
          <p className="text-slate-400 mb-6">목표 달성 시 획득 가능한 티어와 코인을 미리 계산해보세요!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-lg shadow-indigo-900/20 border border-indigo-500/30 bg-slate-950/40 flex items-center justify-center">
              <img 
                src="/challengers-tier-rewards.png" 
                alt="챌린저스 월드 일반 티어 보상" 
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg shadow-indigo-900/20 border border-indigo-500/30 bg-slate-950/40 flex items-center justify-center">
              <img 
                src="/challengers-super-challenger.png" 
                alt="슈퍼 챌린저 및 월드 티어 조건" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Results Panel (Sticky) */}
        <div className="sticky top-16 md:top-20 z-40 bg-slate-900/80 backdrop-blur-xl border-2 border-indigo-500/50 rounded-2xl p-4 md:p-6 shadow-2xl shadow-indigo-900/20 mb-8 flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-start md:items-center">
            <div className="flex-1 w-full">
                <p className="text-xs md:text-sm text-slate-400 font-semibold mb-1">예상 달성 티어</p>
                <div className="flex items-end gap-2 md:gap-3">
                    <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-yellow-600 drop-shadow-md">
                        {currentTier.name}
                    </span>
                    <span className="text-lg md:text-xl text-slate-300 mb-1 font-bold">({totalPoints.toLocaleString()} P)</span>
                </div>
                {currentTier.name !== '언랭크' && (
                    <div className="mt-3">
                        <p className="text-[10px] md:text-xs font-bold text-indigo-300 mb-1.5 flex items-center gap-1">
                            <span>🎁</span> 누적 획득 보상 (합산)
                        </p>
                        <div className="flex flex-wrap gap-1.5 md:gap-2 bg-slate-950/40 rounded-lg p-2.5 md:p-3 border border-indigo-500/20 max-h-24 md:max-h-32 overflow-y-auto custom-scrollbar">
                            {aggregatedRewards.map((reward, idx) => (
                                <span key={idx} className="bg-slate-900 border border-slate-700/80 px-2.5 py-1.5 rounded-lg text-[10px] md:text-xs text-slate-300 font-medium shadow-sm">
                                    {reward}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex gap-3 md:gap-6 w-full md:w-auto mt-2 md:mt-0">
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3 md:p-4 flex-1 md:w-40 text-center">
                    <p className="text-[10px] md:text-xs text-slate-400 mb-1 font-semibold flex justify-center items-center gap-1"><Coins className="w-3 h-3 text-yellow-400"/> 챌린저스 코인</p>
                    <p className="text-xl md:text-2xl font-black text-yellow-400">{totalCoins.toLocaleString()}</p>
                </div>
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3 md:p-4 flex-1 md:w-40 text-center">
                    <p className="text-[10px] md:text-xs text-slate-400 mb-1 font-semibold flex justify-center items-center gap-1"><Star className="w-3 h-3 text-purple-400"/> 상급 코인</p>
                    <p className="text-xl md:text-2xl font-black text-purple-400">{totalAdvancedCoins.toLocaleString()}</p>
                </div>
            </div>
        </div>

        {/* Ad Banner */}
        <div className="w-full mb-8">
            <AdBanner dataAdSlot="4025716031" dataAdFormat="auto" dataFullWidthResponsive={true} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
                {/* 1. Basic Info */}
                <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 md:p-6">
                    <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 mb-4 md:mb-6 text-slate-200">
                        <Target className="w-5 h-5 text-indigo-400" /> 기본 성장 및 주간
                    </h2>
                    
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">목표 레벨 (260~290)</label>
                            <input 
                                type="range" 
                                min="260" 
                                max="290" 
                                value={targetLevel} 
                                onChange={(e) => setTargetLevel(parseInt(e.target.value))}
                                className="w-full accent-indigo-500"
                            />
                            <div className="flex justify-between text-xs font-bold text-slate-500 mt-2">
                                <span>260</span>
                                <span className="text-lg text-indigo-300">{targetLevel}</span>
                                <span>290</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">주간 미션 참여 횟수 (최대 13주)</label>
                            <input 
                                type="range" 
                                min="0" 
                                max="13" 
                                value={weeksParticipated} 
                                onChange={(e) => setWeeksParticipated(parseInt(e.target.value))}
                                className="w-full accent-indigo-500"
                            />
                            <div className="flex justify-between text-xs font-bold text-slate-500 mt-2">
                                <span>0주</span>
                                <span className="text-lg text-indigo-300">{weeksParticipated}주 참여</span>
                                <span>13주</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Season Missions */}
                <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-4 md:mb-6 border-b border-slate-800 pb-4">
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 text-slate-200">
                                <Trophy className="w-5 h-5 text-indigo-400" /> 시즌 미션
                            </h2>
                            <button
                                onClick={toggleAllSeasonMissions}
                                className="text-[10px] md:text-xs px-2.5 py-1 bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-300 rounded border border-indigo-500/30 transition-colors"
                            >
                                {completedSeasonMissions.size === SEASON_MISSIONS.length ? '전체 해제' : '전체 완료'}
                            </button>
                        </div>
                        <span className="text-xs text-slate-400 bg-slate-950 px-2 py-1 rounded-md">+{seasonStats.coins.toLocaleString()} 코인</span>
                    </div>

                    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {Array.from(new Set(SEASON_MISSIONS.map(m => m.category))).map(category => (
                            <div key={category}>
                                <h3 className="text-sm font-bold text-indigo-300 mb-3">{category}</h3>
                                <div className="space-y-2">
                                    {SEASON_MISSIONS.filter(m => m.category === category).map(mission => (
                                        <label key={mission.id} className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${completedSeasonMissions.has(mission.id) ? 'bg-indigo-900/30 border-indigo-500/50' : 'bg-slate-950/50 border-slate-800 hover:border-slate-600'}`}>
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="checkbox" 
                                                    checked={completedSeasonMissions.has(mission.id)}
                                                    onChange={() => toggleSeasonMission(mission.id)}
                                                    className="w-4 h-4 rounded text-indigo-500 bg-slate-900 border-slate-700 focus:ring-indigo-500 focus:ring-offset-slate-900"
                                                />
                                                <span className="text-sm text-slate-300">{mission.desc}</span>
                                            </div>
                                            <span className="text-xs font-bold text-yellow-400 flex items-center gap-1">
                                                +{mission.coins} <Coins className="w-3 h-3"/>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                {/* 3. Boss Missions */}
                <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 md:p-6">
                    <div className="flex flex-col gap-4 mb-4 md:mb-6 border-b border-slate-800 pb-4">
                        {/* 1단위: 타이틀 */}
                        <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 text-slate-200">
                            <Shield className="w-5 h-5 text-indigo-400" /> 보스 미션
                        </h2>

                        {/* 2단위: 안내 및 점수 */}
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[10px] md:text-xs text-indigo-300 font-bold">상위 난이도 선택 시 하위 자동 누적</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs md:text-sm font-medium text-slate-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">+{bossStats.points.toLocaleString()} P</span>
                                <span className="text-xs md:text-sm font-bold text-yellow-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-yellow-900/30">+{bossStats.coins.toLocaleString()} C</span>
                                <span className="text-xs md:text-sm font-bold text-purple-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-purple-900/30">+{bossStats.advancedCoins.toLocaleString()} AC</span>
                            </div>
                        </div>

                        {/* 3단위: 빠른 체크 버튼 */}
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                            <button
                                onClick={handleGeommitClick}
                                className={`shrink-0 text-[10px] md:text-xs px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 font-semibold ${isGeommitChecked ? 'bg-purple-500/40 text-purple-200 border-purple-500/50' : 'bg-slate-800 hover:bg-purple-500/20 text-slate-400 hover:text-purple-300 border-slate-700 hover:border-purple-500/30'}`}
                            >
                                <CheckCircle className={`w-3 h-3 ${isGeommitChecked ? 'text-purple-300' : 'text-slate-500'}`} />
                                검밑솔
                            </button>
                            <button
                                onClick={handleGeomnoseikalClick}
                                className={`shrink-0 text-[10px] md:text-xs px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 font-semibold ${isGeomnoseikalChecked ? 'bg-purple-500/40 text-purple-200 border-purple-500/50' : 'bg-slate-800 hover:bg-purple-500/20 text-slate-400 hover:text-purple-300 border-slate-700 hover:border-purple-500/30'}`}
                            >
                                <CheckCircle className={`w-3 h-3 ${isGeomnoseikalChecked ? 'text-purple-300' : 'text-slate-500'}`} />
                                검노세이칼
                            </button>
                            <button
                                onClick={handleGeomnoseikaldaeClick}
                                className={`shrink-0 text-[10px] md:text-xs px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 font-semibold ${isGeomnoseikaldaeChecked ? 'bg-purple-500/40 text-purple-200 border-purple-500/50' : 'bg-slate-800 hover:bg-purple-500/20 text-slate-400 hover:text-purple-300 border-slate-700 hover:border-purple-500/30'}`}
                            >
                                <CheckCircle className={`w-3 h-3 ${isGeomnoseikaldaeChecked ? 'text-purple-300' : 'text-slate-500'}`} />
                                검노세이칼대
                            </button>
                            <button
                                onClick={handleMehardClick}
                                className={`shrink-0 text-[10px] md:text-xs px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 font-semibold ${isMehardChecked ? 'bg-purple-500/40 text-purple-200 border-purple-500/50' : 'bg-slate-800 hover:bg-purple-500/20 text-slate-400 hover:text-purple-300 border-slate-700 hover:border-purple-500/30'}`}
                            >
                                <CheckCircle className={`w-3 h-3 ${isMehardChecked ? 'text-purple-300' : 'text-slate-500'}`} />
                                메하드
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 max-h-[850px] overflow-y-auto pr-2 custom-scrollbar">
                        {Array.from(new Set(BOSS_MISSIONS.map(b => b.group))).map(group => {
                            const bossesInGroup = BOSS_MISSIONS.filter(b => b.group === group);
                            const bossName = bossesInGroup[0].name;
                            const activeId = clearedBosses[group];

                            return (
                                <div key={group} className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                                    <div className="font-bold text-slate-200 mb-3">{bossName}</div>
                                    <div className="flex flex-wrap gap-2">
                                        {bossesInGroup.map(boss => {
                                            const isActive = activeId === boss.id;
                                            return (
                                                <button
                                                    key={boss.id}
                                                    onClick={() => handleBossChange(group, boss.id)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${isActive ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_10px_rgba(79,70,229,0.3)]' : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500'}`}
                                                >
                                                    {boss.difficulty}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    
                                    {/* Subtext to show rewards for this boss group if active */}
                                    {activeId && (() => {
                                        const activeBoss = bossesInGroup.find(b => b.id === activeId)!;
                                        let gP = 0, gC = 0, gAC = 0;
                                        bossesInGroup.filter(b => b.level <= activeBoss.level).forEach(b => {
                                            gP += b.points; gC += b.coins; gAC += b.advancedCoins;
                                        });
                                        return (
                                            <div className="mt-3 text-[10px] text-slate-500 flex gap-3 border-t border-slate-800 pt-2">
                                                <span>누적: {gP.toLocaleString()} P</span>
                                                <span className="text-yellow-500/70">{gC.toLocaleString()} 코인</span>
                                                {gAC > 0 && <span className="text-purple-500/70">{gAC} 상급코인</span>}
                                            </div>
                                        )
                                    })()}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>

        {/* Results Panel (Bottom) */}
        <div className="mt-10 bg-slate-900/80 backdrop-blur-xl border-2 border-indigo-500/30 rounded-2xl p-4 md:p-6 shadow-xl shadow-indigo-900/10 flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-start md:items-center">
            <div className="flex-1 w-full">
                <p className="text-xs md:text-sm text-slate-400 font-semibold mb-1">최종 달성 티어 요약</p>
                <div className="flex items-end gap-2 md:gap-3">
                    <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-yellow-600 drop-shadow-md">
                        {currentTier.name}
                    </span>
                    <span className="text-lg md:text-xl text-slate-300 mb-1 font-bold">({totalPoints.toLocaleString()} P)</span>
                </div>
                {currentTier.name !== '언랭크' && (
                    <div className="mt-3">
                        <p className="text-[10px] md:text-xs font-bold text-indigo-300 mb-1.5 flex items-center gap-1">
                            <span>🎁</span> 누적 획득 보상 (합산)
                        </p>
                        <div className="flex flex-wrap gap-1.5 md:gap-2 bg-slate-950/40 rounded-lg p-2.5 md:p-3 border border-indigo-500/20 max-h-32 md:max-h-40 overflow-y-auto custom-scrollbar">
                            {aggregatedRewards.map((reward, idx) => (
                                <span key={idx} className="bg-slate-900 border border-slate-700/80 px-2.5 py-1.5 rounded-lg text-[10px] md:text-xs text-slate-300 font-medium shadow-sm">
                                    {reward}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex gap-3 md:gap-6 w-full md:w-auto mt-2 md:mt-0">
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3 md:p-4 flex-1 md:w-40 text-center">
                    <p className="text-[10px] md:text-xs text-slate-400 mb-1 font-semibold flex justify-center items-center gap-1"><Coins className="w-3 h-3 text-yellow-400"/> 총 챌린저스 코인</p>
                    <p className="text-xl md:text-2xl font-black text-yellow-400">{totalCoins.toLocaleString()}</p>
                </div>
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3 md:p-4 flex-1 md:w-40 text-center">
                    <p className="text-[10px] md:text-xs text-slate-400 mb-1 font-semibold flex justify-center items-center gap-1"><Star className="w-3 h-3 text-purple-400"/> 총 상급 코인</p>
                    <p className="text-xl md:text-2xl font-black text-purple-400">{totalAdvancedCoins.toLocaleString()}</p>
                </div>
            </div>
        </div>

        {/* Return to guide button */}
        <div className="mt-6 flex justify-center">
            <Link
                href="/blog/challengers-world-season4-overdrive"
                className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 hover:text-indigo-100 border border-indigo-500/40 hover:border-indigo-400 rounded-xl font-semibold transition-all group text-sm md:text-base"
            >
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                챌린저스 월드 OVERDRIVE 공략글로 돌아가기
            </Link>
        </div>

        <div className="my-10">
            <AdBanner dataAdSlot="4025716031" />
        </div>

        {/* Shopping Cart Section */}
        <div className="mt-4">
            <h2 className="text-lg md:text-xl font-bold text-slate-100 flex items-center gap-2 mb-4">
                <ShoppingCart className="w-5 h-5 text-emerald-400" />
                챌린저스 샵 계산기
            </h2>
            
            {/* Shop Summary Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 md:p-5 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">
                <div className="flex gap-4 sm:gap-6 w-full md:w-auto justify-between md:justify-start">
                    <div>
                        <p className="text-[10px] sm:text-xs text-slate-400 font-semibold mb-1">잔여 챌린저스 코인</p>
                        <p className={`text-xl sm:text-2xl font-black ${totalCoins - cartCosts.normalCost < 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                            {(totalCoins - cartCosts.normalCost).toLocaleString()} <span className="text-xs sm:text-sm font-normal text-slate-500">/ {totalCoins.toLocaleString()}</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] sm:text-xs text-slate-400 font-semibold mb-1">잔여 상급 코인</p>
                        <p className={`text-xl sm:text-2xl font-black ${totalAdvancedCoins - cartCosts.specialCost < 0 ? 'text-red-400' : 'text-purple-400'}`}>
                            {(totalAdvancedCoins - cartCosts.specialCost).toLocaleString()} <span className="text-xs sm:text-sm font-normal text-slate-500">/ {totalAdvancedCoins.toLocaleString()}</span>
                        </p>
                    </div>
                </div>
                {((totalCoins - cartCosts.normalCost < 0) || (totalAdvancedCoins - cartCosts.specialCost < 0)) && (
                    <div className="bg-red-950/30 text-red-400 px-4 py-2 rounded-lg text-sm border border-red-900/50 w-full md:w-auto text-center font-semibold animate-pulse">
                        ⚠️ 코인이 부족합니다!
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Normal Shop */}
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 md:p-5">
                    <h3 className="text-yellow-300 font-bold mb-4 flex items-center gap-2 text-sm sm:text-base">
                        <Coins className="w-4 h-4" /> [일반 탭] 구매 리스트
                    </h3>
                    <div className="space-y-2 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {NORMAL_SHOP_ITEMS.map(item => {
                            const qty = cartNormal[item.id] || 0;
                            // 경험치 3배 쿠폰의 경우 주차별 7개씩 최대 수량이 늘어남
                            const maxQty = item.isWeekly ? Math.min(item.maxQty, item.limitPerWeek! * weeksParticipated) : item.maxQty;
                            return (
                                <div key={item.id} className="flex justify-between items-center bg-slate-950/60 p-2.5 sm:p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs sm:text-sm text-slate-200 font-semibold break-keep leading-tight">{item.name}</p>
                                        <p className="text-[10px] sm:text-xs text-yellow-500 mt-1">{item.price.toLocaleString()} 코인 {item.isWeekly ? `(매주 ${item.limitPerWeek}개)` : ''}</p>
                                        <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5">(최대 {maxQty.toLocaleString()}개 구매 가능)</p>
                                    </div>
                                    <div className="flex items-center gap-1 sm:gap-2 bg-slate-900 px-1.5 sm:px-2 py-1 rounded-lg border border-slate-700 shrink-0">
                                        <button onClick={() => handleCartNormalChange(item.id, -1, maxQty)} className="p-1.5 sm:p-1 text-slate-400 hover:text-white disabled:opacity-30" disabled={qty === 0}><Minus className="w-3.5 h-3.5 sm:w-3 sm:h-3" /></button>
                                        <input 
                                            type="number" 
                                            min="0" 
                                            max={maxQty} 
                                            value={qty === 0 ? '' : qty} 
                                            placeholder="0"
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value);
                                                if (e.target.value === '') {
                                                    setCartNormal(prev => ({ ...prev, [item.id]: 0 }));
                                                } else if (!isNaN(val)) {
                                                    const next = Math.max(0, Math.min(maxQty, val));
                                                    setCartNormal(prev => ({ ...prev, [item.id]: next }));
                                                }
                                            }}
                                            className="text-xs sm:text-sm font-bold w-8 sm:w-10 text-center text-slate-200 bg-transparent border-none focus:ring-0 p-0 m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                        />
                                        <button onClick={() => handleCartNormalChange(item.id, 1, maxQty)} className="p-1.5 sm:p-1 text-slate-400 hover:text-white disabled:opacity-30" disabled={qty >= maxQty}><Plus className="w-3.5 h-3.5 sm:w-3 sm:h-3" /></button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Special Shop */}
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 md:p-5">
                    <h3 className="text-purple-300 font-bold mb-4 flex items-center gap-2 text-sm sm:text-base">
                        <Star className="w-4 h-4" /> [스페셜 탭] 구매 리스트
                    </h3>
                    <div className="space-y-2 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {SPECIAL_SHOP_ITEMS.map(item => {
                            const qty = cartSpecial[item.id] || 0;
                            return (
                                <div key={item.id} className="flex justify-between items-center bg-slate-950/60 p-2.5 sm:p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs sm:text-sm text-slate-200 font-semibold break-keep leading-tight">{item.name}</p>
                                        <p className="text-[10px] sm:text-xs text-purple-400 mt-1">{item.price.toLocaleString()} 상급 코인</p>
                                        <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5">(최대 {item.maxQty.toLocaleString()}개 구매 가능)</p>
                                    </div>
                                    <div className="flex items-center gap-1 sm:gap-2 bg-slate-900 px-1.5 sm:px-2 py-1 rounded-lg border border-slate-700 shrink-0">
                                        <button onClick={() => handleCartSpecialChange(item.id, -1, item.maxQty)} className="p-1.5 sm:p-1 text-slate-400 hover:text-white disabled:opacity-30" disabled={qty === 0}><Minus className="w-3.5 h-3.5 sm:w-3 sm:h-3" /></button>
                                        <input 
                                            type="number" 
                                            min="0" 
                                            max={item.maxQty} 
                                            value={qty === 0 ? '' : qty} 
                                            placeholder="0"
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value);
                                                if (e.target.value === '') {
                                                    setCartSpecial(prev => ({ ...prev, [item.id]: 0 }));
                                                } else if (!isNaN(val)) {
                                                    const next = Math.max(0, Math.min(item.maxQty, val));
                                                    setCartSpecial(prev => ({ ...prev, [item.id]: next }));
                                                }
                                            }}
                                            className="text-xs sm:text-sm font-bold w-8 sm:w-10 text-center text-slate-200 bg-transparent border-none focus:ring-0 p-0 m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                        />
                                        <button onClick={() => handleCartSpecialChange(item.id, 1, item.maxQty)} className="p-1.5 sm:p-1 text-slate-400 hover:text-white disabled:opacity-30" disabled={qty >= item.maxQty}><Plus className="w-3.5 h-3.5 sm:w-3 sm:h-3" /></button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>

        {/* Return to guide button (Bottom) */}
        <div className="mt-10 flex justify-center pb-6">
            <Link
                href="/blog/challengers-world-season4-overdrive"
                className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 hover:text-indigo-100 border border-indigo-500/40 hover:border-indigo-400 rounded-xl font-semibold transition-all group text-sm md:text-base"
            >
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                챌린저스 월드 OVERDRIVE 공략글로 돌아가기
            </Link>
        </div>

      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(350%); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5); 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5); 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.8); 
        }
      `}} />
    </div>
  );
}
