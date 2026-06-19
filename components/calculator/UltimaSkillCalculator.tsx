'use client';
import React, { useState, useMemo } from 'react';
import { Settings, Zap, ArrowRight, Star, Coins, Info } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

const COMBAT_SKILLS = [
  '공격력 / 마력',
  '보스 몬스터 데미지',
  '방어율 무시',
  '일반 몬스터 데미지',
  '올스탯',
  '최대 HP / MP',
  '버프 지속시간',
  '크리티컬 확률',
  '아케인포스',
  '어센틱포스',
  '사냥 경험치 획득량'
];

const SPECIAL_SKILLS = [
  '보스 처치 시 솔 에르다 기운',
  '몬스터 컬렉션 등록 확률',
  '몬스터 파크 클리어 경험치',
  '아케인리버 일일 퀘스트 보상',
  '그란디스 일일 퀘스트 보상',
  '유니온 주간 미션 코인'
];

const SHORT_NAMES: Record<string, string> = {
  '공격력 / 마력': '공/마',
  '보스 몬스터 데미지': '보공',
  '방어율 무시': '방무',
  '일반 몬스터 데미지': '일몹뎀',
  '올스탯': '올스탯',
  '최대 HP / MP': 'HP/MP',
  '버프 지속시간': '벞지',
  '크리티컬 확률': '크확',
  '아케인포스': '아케인',
  '어센틱포스': '어센틱',
  '사냥 경험치 획득량': '사냥경험치',
  '보스 처치 시 솔 에르다 기운': '솔에르다',
  '몬스터 컬렉션 등록 확률': '몬컬',
  '몬스터 파크 클리어 경험치': '몬파',
  '아케인리버 일일 퀘스트 보상': '아케인보상',
  '그란디스 일일 퀘스트 보상': '그란디스보상',
  '유니온 주간 미션 코인': '유니온코인'
};

const LEVEL_COSTS = [0, 1, 3, 8, 20, 45, 75]; // 1~6레벨 누적 소모량

export default function UltimaSkillCalculator() {
  const [tab, setTab] = useState<'combat' | 'special'>('combat');
  const [combatPriorities, setCombatPriorities] = useState<string[]>([
    '보스 몬스터 데미지', '방어율 무시', '공격력 / 마력', '올스탯', '아케인포스', '어센틱포스', '선택 안 함', '선택 안 함'
  ]);
  const [specialPriorities, setSpecialPriorities] = useState<string[]>([
    '몬스터 파크 클리어 경험치', '그란디스 일일 퀘스트 보상', '아케인리버 일일 퀘스트 보상', '보스 처치 시 솔 에르다 기운', '선택 안 함', '선택 안 함'
  ]);
  
  // 특별히 마스터하고 싶은 스킬 상태 관리 (기본값: 보공, 방무)
  const [starredSkills, setStarredSkills] = useState<Set<string>>(new Set(['보스 몬스터 데미지', '방어율 무시']));
  
  const [includePaid, setIncludePaid] = useState(false);
  const [strategy, setStrategy] = useState<'sequence' | 'balanced' | 'balanced123'>('balanced');
  // 현재 스킬 레벨 상태 (스킬명 -> 현재 레벨)
  const [currentSkillLevels, setCurrentSkillLevels] = useState<Record<string, number>>({});

  const getSkillLevel = (skill: string) => currentSkillLevels[skill] ?? 0;
  const adjustSkillLevel = (skill: string, delta: number) => {
    const cur = getSkillLevel(skill);
    const next = Math.min(6, Math.max(0, cur + delta));
    setCurrentSkillLevels(prev => ({ ...prev, [skill]: next }));
  };

  const currentOptions = tab === 'combat' ? COMBAT_SKILLS : SPECIAL_SKILLS;
  const currentPriorities = tab === 'combat' ? combatPriorities : specialPriorities;

  const setPriority = (index: number, value: string) => {
    const newPriorities = [...currentPriorities];
    
    // '선택 안 함'인 경우는 중복 스왑 체크를 하지 않음
    if (value !== '선택 안 함') {
      const existingIndex = newPriorities.indexOf(value);
      if (existingIndex !== -1 && existingIndex !== index) {
        // 이미 선택된 스킬이라면 자리를 바꿈
        newPriorities[existingIndex] = newPriorities[index];
      }
    }
    
    newPriorities[index] = value;
    
    if (tab === 'combat') setCombatPriorities(newPriorities);
    else setSpecialPriorities(newPriorities);
  };

  const toggleStar = (skill: string) => {
    if (skill === '선택 안 함') return;
    const newStarred = new Set(starredSkills);
    if (newStarred.has(skill)) newStarred.delete(skill);
    else newStarred.add(skill);
    setStarredSkills(newStarred);
  };

  const weeklyData = useMemo(() => {
    const results = [];
    const validPriorities = currentPriorities.filter(p => p !== '선택 안 함');
    
    const currentLevels: Record<string, number> = {};
    validPriorities.forEach(p => currentLevels[p] = currentSkillLevels[p] ?? 0);
    // 이미 소모된 칩 계산 (현재 레벨 기준)
    const alreadySpent = validPriorities.reduce((sum, p) => sum + (LEVEL_COSTS[currentSkillLevels[p] ?? 0] || 0), 0);
    const startLevels: Record<string, number> = {};
    validPriorities.forEach(p => startLevels[p] = currentSkillLevels[p] ?? 0);
    
    let leftover = -alreadySpent; // 이미 쓴 칩은 음수로 시작해서 첫 주부터 자연스럽게 반영
    let totalAccumulated = 0;

    for (let week = 1; week <= 13; week++) {
      const weeklyGain = includePaid ? (week === 1 ? 35 : 30) : 25;
      totalAccumulated += weeklyGain;
      let chipsLeft = leftover + weeklyGain;

      // 알고리즘 적용 함수 (마스터 완료 여부 반환)
      const runStrategy = (skillsToProcess: string[], hoardChips: boolean) => {
        if (skillsToProcess.length === 0) return true;

        if (strategy === 'sequence') {
          for (const skill of skillsToProcess) {
            while (currentLevels[skill] < 6) {
              const curLvl = currentLevels[skill];
              const cost = LEVEL_COSTS[curLvl + 1] - LEVEL_COSTS[curLvl];
              if (chipsLeft >= cost) {
                currentLevels[skill] = curLvl + 1;
                chipsLeft -= cost;
              } else {
                break;
              }
            }
            // hoardChips가 true일 때만: 해당 스킬이 아직 6레벨이 아니라면 다음 순위로 칩이 넘어가는 것을 막음 (존버)
            if (hoardChips && currentLevels[skill] < 6) return false;
          }
        } else {
          // balanced 계열 (balanced, balanced123)
          const groups = [];
          
          if (strategy === 'balanced') {
            for (let i = 0; i < skillsToProcess.length; i += 2) {
              groups.push(skillsToProcess.slice(i, i + 2));
            }
          } else if (strategy === 'balanced123') {
            for (let i = 0; i < skillsToProcess.length; i += 3) {
              groups.push(skillsToProcess.slice(i, i + 3));
            }
          }

          for (const group of groups) {
            let groupDone = false;
            while (!groupDone) {
              let progressed = false;
              for (const skill of group) {
                const curLvl = currentLevels[skill];
                if (curLvl < 6) {
                  const cost = LEVEL_COSTS[curLvl + 1] - LEVEL_COSTS[curLvl];
                  if (chipsLeft >= cost) {
                    currentLevels[skill] = curLvl + 1;
                    chipsLeft -= cost;
                    progressed = true;
                  }
                }
              }
              if (!progressed) {
                groupDone = true;
              }
            }
            // hoardChips가 true일 때만: 그룹 내 스킬 중 하나라도 6레벨이 아니라면 다음 그룹으로 칩이 넘어가는 것을 막음 (존버)
            if (hoardChips && group.some(skill => currentLevels[skill] < 6)) return false;
          }
        }
        return true;
      };

      // 1. 별표 쳐진 최우선 마스터 스킬들을 먼저 처리 (존버 ON)
      const highPriority = validPriorities.filter(p => starredSkills.has(p));
      const isHighPriorityDone = runStrategy(highPriority, true);

      // 2. 앞선 우선순위 스킬들이 모두 6렙을 달성했을 때만 남은 칩으로 나머지 스킬들 처리 (존버 OFF: 하위 순위에 분배)
      if (isHighPriorityDone) {
        const normalPriority = validPriorities.filter(p => !starredSkills.has(p));
        runStrategy(normalPriority, false);
      }
      
      leftover = chipsLeft;
      results.push({ week, levels: { ...currentLevels }, leftover: chipsLeft, totalChips: totalAccumulated, startLevels });
    }
    return { results, validPriorities };
  }, [currentPriorities, includePaid, strategy, starredSkills, currentSkillLevels]);

  return (
    <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-8">
      {/* 상단 설정 영역 */}
      <div className="w-full bg-slate-800/40 border-b border-slate-700/50 p-4 sm:p-6">
        <h3 className="text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-400" />
          계산기 설정
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 1. 탭 및 옵션 (1단) */}
          <div className="space-y-6 flex flex-col">
            <div className="flex bg-slate-950/50 rounded-lg p-1 border border-slate-800">
              <button
                onClick={() => {
                  setTab('combat');
                  if (strategy === 'balanced123') setStrategy('balanced');
                }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${tab === 'combat' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                전투 훈련
              </button>
              <button
                onClick={() => {
                  setTab('special');
                  if (strategy === 'balanced') setStrategy('balanced123');
                }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${tab === 'special' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                특수 훈련
              </button>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-200 mb-2 block">레벨업 방식 (알고리즘)</label>
              <div className="flex bg-slate-950/50 rounded-lg p-1 border border-slate-800">
                {tab === 'combat' && (
                  <button
                    onClick={() => setStrategy('balanced')}
                    className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${strategy === 'balanced' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                  >
                    1/2순위 균형형
                  </button>
                )}
                {tab === 'special' && (
                  <button
                    onClick={() => setStrategy('balanced123')}
                    className={`flex-1 py-2 text-[11px] font-bold rounded-md transition-all ${strategy === 'balanced123' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                  >
                    1/2/3 균형형
                  </button>
                )}
                <button
                  onClick={() => setStrategy('sequence')}
                  className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${strategy === 'sequence' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
                >
                  순차 마스터형
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 px-1 h-4">
                {strategy === 'balanced' && '1,2순위를 번갈아가며 균형있게 올립니다.'}
                {strategy === 'sequence' && '1순위 마스터 후 다음 순위 순서대로 올립니다.'}
                {strategy === 'balanced123' && '1,2,3순위를 번갈아가며 균형있게 올립니다.'}
              </p>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-200 mb-2 block">메이플포인트 구매 칩</label>
              <button
                onClick={() => setIncludePaid(!includePaid)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-bold transition-all ${
                  includePaid ? 'bg-green-900/40 border-green-500/50 text-green-300' : 'bg-slate-950/50 border-slate-700 text-slate-400'
                }`}
              >
                <Coins className="w-4 h-4" />
                {includePaid ? '매주 풀매수 적용 중 (ON)' : '기본 무료 칩만 계산 (OFF)'}
              </button>
            </div>
          </div>

          {/* 2. 우선순위 설정 (2단) */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-bold text-slate-200 block">우선순위 설정 (1~{currentPriorities.length}순위)</label>
              <span className="text-xs text-yellow-400 font-medium flex items-center gap-1 bg-yellow-900/20 px-2 py-1 rounded-md border border-yellow-700/30">
                <Star className="w-3.5 h-3.5" fill="currentColor" />
                별표 클릭 시 최우선 마스터
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentPriorities.map((_, index) => {
                const skillName = currentPriorities[index];
                const isStarred = starredSkills.has(skillName);
                const isNone = skillName === '선택 안 함';
                const curLv = isNone ? 0 : getSkillLevel(skillName);
                
                return (
                  <div key={index} className={`flex flex-col gap-2 bg-slate-900/40 p-2.5 rounded-xl border transition-colors ${isStarred ? 'border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.1)]' : 'border-slate-700/50'}`}>
                    {/* 순위 + 스킬 선택 + 별표 */}
                    <div className="flex items-center gap-2">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${index < 2 ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/50' : 'bg-slate-800 text-slate-400'}`}>
                        {index + 1}
                      </span>
                      <select
                        value={skillName}
                        onChange={(e) => setPriority(index, e.target.value)}
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-lg py-2 px-3 text-base sm:text-sm text-slate-100 outline-none focus:border-indigo-500"
                      >
                        {currentOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                        {index >= 3 && <option value="선택 안 함">선택 안 함</option>}
                      </select>
                      <button 
                        onClick={() => toggleStar(skillName)}
                        disabled={isNone}
                        className={`shrink-0 p-1.5 rounded-md transition-all ${isNone ? 'opacity-30 cursor-not-allowed' : ''} ${isStarred ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : 'bg-slate-800 text-slate-500 hover:text-slate-300'}`}
                        title="최우선 마스터 지정 (클릭)"
                      >
                        <Star className="w-5 h-5" fill={isStarred ? "currentColor" : "none"} />
                      </button>
                    </div>
                    {/* 현재 레벨 입력 */}
                    {!isNone && (
                      <div className="flex items-center gap-2 pl-9 flex-wrap">
                        <span className="text-xs text-slate-400 shrink-0">현재 레벨:</span>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => adjustSkillLevel(skillName, -1)}
                            disabled={curLv <= 0}
                            className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-sm flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          >−</button>
                          <span className={`w-14 text-center text-sm font-bold px-2 py-0.5 rounded ${
                            curLv === 6 ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40' :
                            curLv > 0 ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' :
                            'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}>Lv.{curLv}{curLv === 6 ? ' ★' : ''}</span>
                          <button
                            onClick={() => adjustSkillLevel(skillName, 1)}
                            disabled={curLv >= 6}
                            className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-sm flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          >+</button>
                        </div>
                        {curLv > 0 && (
                          <span className="text-xs text-emerald-400 font-medium whitespace-nowrap">칩 {LEVEL_COSTS[curLv]}개 사용됨</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 광고 영역 */}
      <div className="w-full px-4 sm:px-6 py-2 border-b border-slate-700/50 bg-slate-900/50">
        <InArticleAd dataAdSlot="8162808816" className="my-2" />
      </div>

      {/* 하단 결과 영역 */}
      <div className="flex-1 p-4 sm:p-6 bg-slate-900/30 overflow-x-auto w-full">
        <h3 className="text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          1~13주차 스킬 마스터 루트 결과
        </h3>
        
        <div className="min-w-[700px]">
          <table className="w-full text-left border-collapse bg-slate-950/20 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-slate-800/80 text-slate-200 text-sm border-b border-slate-700/80">
                <th className="py-4 pl-4 w-20 font-bold">주차</th>
                <th className="py-4 w-24 font-bold">누적 칩</th>
                {weeklyData.validPriorities.map((p, i) => (
                  <th key={p} className="py-4 px-2">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs text-indigo-300 font-bold">{i + 1}순위</span>
                      {starredSkills.has(p) && <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />}
                    </div>
                    <span className="text-slate-100 font-bold whitespace-nowrap">{SHORT_NAMES[p] || p}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">
              {weeklyData.results.map((data, idx) => (
                <tr key={data.week} className={`border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors ${data.week === 13 ? 'bg-indigo-900/20' : ''}`}>
                  <td className="py-3 pl-4 font-black text-slate-100">{data.week}주차</td>
                  <td className="py-3 font-bold text-blue-300">{data.totalChips}개</td>
                  {weeklyData.validPriorities.map(skill => {
                    const level = data.levels[skill];
                    const startLv = data.startLevels[skill] ?? 0;
                    const isMax = level === 6;
                    const isBelowStart = level <= startLv; // 현재 레벨 이하 = 시작 상태
                    return (
                      <td key={skill} className="py-3 px-2">
                        <span className={`inline-flex items-center justify-center px-2.5 py-1.5 rounded-md text-xs font-bold transition-all ${
                          isMax ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.15)]' :
                          isBelowStart ? 'bg-slate-700/40 text-slate-500 border border-slate-700/30' :
                          level > 0 ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/40' : 'bg-slate-800/50 text-slate-400 border border-slate-700/50'
                        }`}>
                          Lv.{level}{isMax ? ' (M)' : isBelowStart && level === startLv ? ' (현재)' : ''}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-indigo-950/30 border border-indigo-800/40 rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-sm text-slate-200 leading-relaxed">
            <p>13주차 완료 시 <strong>남은 훈련 칩: {weeklyData.results[12].leftover}개</strong></p>
            <p className="mt-1 text-slate-400 text-xs">계산기는 이전 주차의 레벨을 초기화하지 않고 누적해서 올리는 실제 인게임 방식을 반영합니다. 지정하신 순위의 스킬에 최우선적으로 칩을 분배합니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
