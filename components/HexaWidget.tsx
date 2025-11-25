import React, { useEffect, useState } from 'react';
import { getCharacterHexaMatrix, getCharacterHexaMatrixStat } from '../lib/nexon';
import { HEXA_SKILL_PRIORITIES } from '../lib/hexa_skill_data';

interface HexaStatCore {
    slot_id: string;
    main_stat_name: string;
    sub_stat_name_1: string;
    sub_stat_name_2: string;
    main_stat_level: number;
    sub_stat_level_1: number;
    sub_stat_level_2: number;
    stat_grade: number;
    _source?: string;
}

interface HexaSkill {
    hexa_core_name: string;
    hexa_core_level: number;
    hexa_core_type: string;
}

const HexLevelIcon = ({ level, type }: { level: number, type: 'main' | 'sub' }) => {
    const bgColor = type === 'main' ? 'bg-purple-900' : 'bg-sky-900';
    const borderColor = type === 'main' ? 'border-purple-500' : 'border-sky-500';
    const textColor = type === 'main' ? 'text-purple-100' : 'text-sky-100';
    return (
        <div className={`relative w-8 h-8 flex items-center justify-center font-bold text-base ${textColor}`}>
            <div className={`absolute inset-0 ${bgColor} border ${borderColor} opacity-80`} style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
            <div className={`absolute inset-0.5 ${borderColor} border opacity-50`} style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', zIndex: -1 }}></div>
            <span className="relative z-10">{level}</span>
            <span className="absolute -bottom-0.5 text-[6px] text-slate-400 uppercase tracking-wider">LV</span>
        </div>
    );
};

const StatItem = ({ name, level, type }: { name: string, level: number, type: 'main' | 'sub' }) => {
    const maxLevel = 10;
    const progress = Math.min((level / maxLevel) * 100, 100);
    const labelColor = type === 'main' ? 'text-purple-300' : 'text-sky-300';
    const title = type === 'main' ? 'MAIN STAT' : 'ADDITIONAL STAT';
    const barGradient = type === 'main' ? 'from-purple-600 via-fuchsia-500 to-purple-400' : 'from-sky-600 via-cyan-500 to-sky-400';
    const highlightColor = type === 'main' ? 'bg-fuchsia-300' : 'bg-cyan-300';
    return (
        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2 relative overflow-hidden mb-1">
            <div className="flex items-center justify-between gap-3 relative z-10">
                <div className="flex-1">
                    <div className="text-[8px] font-bold text-slate-500 tracking-widest mb-0.5">{title}</div>
                    <div className={`text-xs font-bold ${labelColor} mb-1 truncate`}>{name}</div>
                    <div className="h-2 bg-slate-900/80 rounded-sm relative overflow-hidden border border-slate-800/50">
                        <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
                            {[...Array(9)].map((_, i) => <div key={i} className="w-[1px] h-full bg-slate-800/60"></div>)}
                        </div>
                        <div className={`h-full bg-gradient-to-r ${barGradient} relative transition-all duration-500 ease-out`} style={{ width: `${progress}%` }}>
                            <div className={`absolute right-0 top-0 bottom-0 w-1 ${highlightColor} blur-[2px] opacity-80`}></div>
                        </div>
                    </div>
                </div>
                <HexLevelIcon level={level} type={type} />
            </div>
        </div>
    );
};

export default function HexaWidget({ ocid, refreshKey }: { ocid: string, refreshKey: number }) {
    const [stats, setStats] = useState<HexaStatCore[]>([]);
    const [skills, setSkills] = useState<HexaSkill[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeStatGroup, setActiveStatGroup] = useState(0);
    const [activePreset, setActivePreset] = useState(0);
    const [sortByRecommended, setSortByRecommended] = useState(false);
    const [characterClass, setCharacterClass] = useState<string>('');

    useEffect(() => {
        if (!ocid) return;
        const fetchData = async () => {
            try {
                setLoading(true);
                const [skillRes, statRes] = await Promise.all([
                    getCharacterHexaMatrix(ocid),
                    getCharacterHexaMatrixStat(ocid)
                ]);

                // Extract character class
                const targetData = statRes.data || statRes;
                if (targetData.character_class) {
                    setCharacterClass(targetData.character_class);
                }

                let collectedStats: HexaStatCore[] = [];
                Object.keys(targetData).forEach(key => {
                    if (key === 'date' || key === 'character_class' || key === 'character_class_level') return;
                    const value = targetData[key];
                    if (Array.isArray(value)) {
                        const isValidStatArray = value.length > 0 && typeof value[0] === 'object' && 'main_stat_name' in value[0];
                        if (isValidStatArray) {
                            const tagged = value.map((item: any) => ({ ...item, _source: key }));
                            collectedStats = [...collectedStats, ...tagged];
                        }
                    } else if (typeof value === 'object' && value !== null) {
                        if ('main_stat_name' in value) {
                            collectedStats.push({ ...value, _source: key });
                        }
                    }
                });
                const sortedStats = collectedStats.sort((a, b) => {
                    const slotA = a.slot_id ? parseInt(a.slot_id) : 999;
                    const slotB = b.slot_id ? parseInt(b.slot_id) : 999;
                    return slotA - slotB;
                });
                setStats(sortedStats);
                const rawSkills = skillRes.character_hexa_core_equipment || skillRes.data?.character_hexa_core_equipment || [];
                const sortedSkills = rawSkills.sort((a: any, b: any) => {
                    if (a.hexa_core_name === '솔 야누스') return 1;
                    if (b.hexa_core_name === '솔 야누스') return -1;
                    return b.hexa_core_level - a.hexa_core_level;
                });
                setSkills(sortedSkills);
            } catch (err) {
                console.error("헥사 정보 로딩 실패", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [ocid, refreshKey]);

    // Sort skills by recommended priority
    const getSortedSkills = () => {
        if (!sortByRecommended || !characterClass) {
            return skills;
        }

        const priorities = HEXA_SKILL_PRIORITIES[characterClass];
        if (!priorities) {
            return skills;
        }

        // Create a copy and sort by priority
        return [...skills].sort((a, b) => {
            // 솔 야누스 always at the end
            if (a.hexa_core_name === '솔 야누스') return 1;
            if (b.hexa_core_name === '솔 야누스') return -1;

            const indexA = priorities.findIndex(skill => a.hexa_core_name.includes(skill) || skill.includes(a.hexa_core_name));
            const indexB = priorities.findIndex(skill => b.hexa_core_name.includes(skill) || skill.includes(b.hexa_core_name));

            // Skills in priority list come first
            if (indexA === -1 && indexB !== -1) return 1;
            if (indexA !== -1 && indexB === -1) return -1;
            if (indexA === -1 && indexB === -1) return b.hexa_core_level - a.hexa_core_level; // Fall back to level sort

            return indexA - indexB; // Sort by priority index
        });
    };

    const displayedSkills = getSortedSkills();

    if (loading) return <div className="animate-pulse h-20 bg-slate-800 rounded-xl mt-4 border border-slate-700"></div>;

    // Dynamic Grouping Logic
    const statGroups: HexaStatCore[][] = [];
    stats.forEach(stat => {
        const slotNum = parseInt(stat.slot_id);
        const groupIndex = Math.floor(slotNum / 3);

        if (!statGroups[groupIndex]) {
            statGroups[groupIndex] = [];
        }
        statGroups[groupIndex].push(stat);
    });

    // Ensure at least empty arrays for indices if there are gaps
    for (let i = 0; i < statGroups.length; i++) {
        if (!statGroups[i]) statGroups[i] = [];
    }
    // If no stats, ensure at least one empty group
    if (statGroups.length === 0) statGroups.push([]);

    const currentGroupPresets = statGroups[activeStatGroup] || [];
    const uniquePresets = currentGroupPresets.filter((preset, index, self) => {
        return index === self.findIndex(p =>
            p.main_stat_name === preset.main_stat_name &&
            p.main_stat_level === preset.main_stat_level &&
            p.sub_stat_name_1 === preset.sub_stat_name_1 &&
            p.sub_stat_level_1 === preset.sub_stat_level_1 &&
            p.sub_stat_name_2 === preset.sub_stat_name_2 &&
            p.sub_stat_level_2 === preset.sub_stat_level_2 &&
            p.stat_grade === preset.stat_grade
        );
    });
    const activeStatData = uniquePresets[activePreset];

    return (
        <div className="flex flex-col gap-2">
            {/* Total Progress */}
            {skills.length > 0 && (
                (() => {
                    const targetSkills = skills.filter(s => s.hexa_core_name !== '솔 야누스');
                    const totalCurrentLevel = targetSkills.reduce((acc, cur) => acc + cur.hexa_core_level, 0);
                    const totalMaxLevel = targetSkills.length * 30;
                    const totalProgress = totalMaxLevel > 0 ? Math.round((totalCurrentLevel / totalMaxLevel) * 100) : 0;

                    return (
                        <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-4 flex items-center justify-between shadow-lg relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center shadow-inner relative">
                                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                                        <path
                                            className="text-slate-700"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                        />
                                        <path
                                            className="text-cyan-500 drop-shadow-[0_0_2px_rgba(6,182,212,0.8)]"
                                            strokeDasharray={`${totalProgress}, 100`}
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                        />
                                    </svg>
                                    <span className="text-xs font-black text-cyan-300">
                                        {totalProgress}%
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-slate-400 font-bold tracking-wider mb-0.5">HEXA SKILL PROGRESS</div>
                                    <div className="text-sm font-bold text-slate-200">
                                        전체 진행도 <span className="text-cyan-400">{totalProgress}%</span>
                                    </div>
                                </div>
                                {characterClass && HEXA_SKILL_PRIORITIES[characterClass] && (
                                    <button
                                        onClick={() => setSortByRecommended(!sortByRecommended)}
                                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 border-2 ${sortByRecommended
                                            ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white border-rose-400 shadow-lg shadow-rose-500/30'
                                            : 'bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700 hover:border-slate-500'
                                            }`}
                                    >
                                        {sortByRecommended ? '✓ 추천 우선강화 순서' : '추천 우선강화 순서'}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })()
            )}

            {/* Skills list */}
            <div className="space-y-[6px]">
                {displayedSkills.map((skill, idx) => {
                    const isOrigin = skill.hexa_core_type === '스킬 코어';
                    const progress = Math.min((skill.hexa_core_level / 30) * 100, 100);

                    // Calculate priority rank
                    let priorityRank = -1;
                    if (sortByRecommended && characterClass) {
                        const priorities = HEXA_SKILL_PRIORITIES[characterClass];
                        if (priorities) {
                            priorityRank = priorities.findIndex(skillName =>
                                skill.hexa_core_name.includes(skillName) || skillName.includes(skill.hexa_core_name)
                            );
                        }
                    }

                    let barColor = 'from-blue-600 to-cyan-400';
                    let badgeColor = 'bg-blue-950 text-blue-300 border-blue-800/80';
                    let label = '마스터리';
                    let bgGlow = '';

                    // Priority-based coloring when recommended sort is active
                    if (sortByRecommended && priorityRank !== -1) {
                        if (priorityRank <= 2) {
                            // Top 3 priority: Gold/Orange
                            barColor = 'from-amber-600 via-yellow-500 to-orange-400';
                            badgeColor = 'bg-amber-950 text-amber-300 border-amber-700/80';
                            bgGlow = 'bg-amber-600/5';
                        } else if (priorityRank <= 6) {
                            // Priority 4-7: Pink/Rose
                            barColor = 'from-rose-600 via-pink-500 to-rose-400';
                            badgeColor = 'bg-rose-950 text-rose-300 border-rose-700/80';
                            bgGlow = 'bg-rose-600/5';
                        } else {
                            // Priority 8+: Cyan/Blue
                            barColor = 'from-cyan-600 via-blue-500 to-cyan-400';
                            badgeColor = 'bg-cyan-950 text-cyan-300 border-cyan-700/80';
                            bgGlow = 'bg-cyan-600/5';
                        }
                    } else if (sortByRecommended && priorityRank === -1 && skill.hexa_core_name !== '솔 야누스') {
                        // Not in priority list: Gray
                        barColor = 'from-slate-600 to-slate-400';
                        badgeColor = 'bg-slate-900 text-slate-400 border-slate-700';
                        bgGlow = 'bg-slate-600/5';
                    } else if (isOrigin) {
                        barColor = 'from-purple-600 via-fuchsia-500 to-pink-400';
                        badgeColor = 'bg-purple-950 text-purple-300 border-purple-800/80 shadow-[0_0_5px_rgba(168,85,247,0.3)]';
                        label = 'ORIGIN';
                    } else if (skill.hexa_core_type === '강화 코어') {
                        barColor = 'from-slate-600 to-slate-400';
                        badgeColor = 'bg-slate-900 text-slate-400 border-slate-700';
                        label = '강화';
                    } else if (skill.hexa_core_type === '공용 코어') {
                        barColor = 'from-indigo-600 to-violet-4';
                        badgeColor = 'bg-indigo-950 text-indigo-300 border-indigo-800/80';
                        label = '공용';
                    }

                    return (
                        <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-lg p-3 hover:bg-slate-900/80 transition-colors group relative overflow-hidden">
                            {isOrigin && <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>}
                            {bgGlow && <div className={`absolute inset-0 ${bgGlow} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>}
                            <div className="flex justify-between items-center mb-2 relative z-10">
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${badgeColor} font-bold tracking-wider`}>{label}</span>
                                    <span title={skill.hexa_core_name} className={`text-sm font-medium truncate max-w-[340px] ${isOrigin ? 'text-purple-100 drop-shadow-sm' : 'text-slate-200'}`}>{skill.hexa_core_name}</span>
                                </div>
                                <span className="text-xs font-bold"><span className="text-slate-500 mr-0.5">Lv.</span>{skill.hexa_core_level}</span>
                            </div>
                            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/50 relative z-10">
                                <div className={`h-full bg-gradient-to-r ${barColor} relative transition-all duration-500 ease-out shadow-[0_0_5px_rgba(0,0,0,0.3)_inset]`} style={{ width: `${progress}%` }}>
                                    <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white/50 blur-[1px]"></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Hexa Stat Controls */}
            <div className="flex flex-wrap items-center gap-2 mt-1 mb-1">
                <div className="flex gap-1">
                    {statGroups.map((group, idx) => {
                        if (group.length === 0) return null;
                        const isActive = activeStatGroup === idx;
                        return (
                            <button
                                key={idx}
                                onClick={() => { setActiveStatGroup(idx); setActivePreset(0); }}
                                className={`px-3 py-1 rounded-md text-xs font-bold transition-all duration-200 shadow-md ${isActive
                                    ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-purple-500/30 ring-1 ring-purple-400'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                                    }`}
                            >
                                {statGroups.length > 1 ? `HEXA 스탯 ${idx + 1}` : 'HEXA 스탯'}
                            </button>
                        );
                    })}
                </div>

                {uniquePresets.length > 0 && <div className="w-px h-4 bg-slate-700 mx-1"></div>}

                <div className="flex gap-1">
                    {uniquePresets.slice(0, 3).map((preset, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActivePreset(idx)}
                            className={`w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center transition-all duration-200 ${activePreset === idx
                                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30 ring-1 ring-cyan-400'
                                : 'bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-slate-300'
                                }`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stat details */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 min-h-[140px]">
                {activeStatData ? (
                    <>
                        <div className="flex justify-between items-center mb-2 px-1">
                            <span className="text-sm font-bold text-slate-200 flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                                스탯 정보
                            </span>
                            <span className="text-xs text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                                등급: <span className="text-slate-300 font-bold">{activeStatData.stat_grade}</span>
                            </span>
                        </div>
                        <StatItem name={activeStatData.main_stat_name} level={activeStatData.main_stat_level} type="main" />
                        {activeStatData.sub_stat_name_1 && (
                            <StatItem name={activeStatData.sub_stat_name_1} level={activeStatData.sub_stat_level_1} type="sub" />
                        )}
                        {activeStatData.sub_stat_name_2 && (
                            <StatItem name={activeStatData.sub_stat_name_2} level={activeStatData.sub_stat_level_2} type="sub" />
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full py-10 text-slate-500">
                        <div className="text-sm">해당 프리셋에 데이터가 없습니다</div>
                    </div>
                )}
            </div>
        </div>
    );
}