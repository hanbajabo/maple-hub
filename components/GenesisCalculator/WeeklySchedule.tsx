/**
 * 주차별 보스 격파 스케줄 컴포넌트
 */

'use client';

import { Boss, BOSSES } from '@/data/genesis-liberation';
import { BossSelection } from '@/lib/genesis-calculator';
import { useState } from 'react';

interface WeeklyScheduleProps {
    totalWeeks: number;
    onScheduleChange: (weeklySelections: Map<number, BossSelection[]>) => void;
    isGenesisPass?: boolean;
}

export default function WeeklySchedule({ totalWeeks, onScheduleChange, isGenesisPass }: WeeklyScheduleProps) {
    // 주차별 보스 선택 (week number -> BossSelection[])
    const [weeklySelections, setWeeklySelections] = useState<Map<number, BossSelection[]>>(
        new Map()
    );

    // 펼쳐진 주차들
    const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([1]));

    // 주간/월간 보스 분리
    const weeklyBosses = BOSSES.filter((boss) => !boss.isMonthly);
    const monthlyBosses = BOSSES.filter((boss) => boss.isMonthly);

    // 특정 주차의 보스 선택 토글
    const handleBossToggle = (
        weekNum: number,
        boss: Boss,
        difficulty: string,
        traces: number,
        checked: boolean
    ) => {
        const newWeeklySelections = new Map(weeklySelections);
        const currentWeekSelections = newWeeklySelections.get(weekNum) || [];

        if (checked) {
            // 같은 보스의 다른 난이도를 모두 제거
            const filtered = currentWeekSelections.filter((s) => s.bossId !== boss.id);

            // 새로운 난이도 추가
            const newSelection: BossSelection = {
                bossId: boss.id,
                difficulty,
                traces,
                partySize: 1,
                isMonthly: boss.isMonthly,
            };
            newWeeklySelections.set(weekNum, [...filtered, newSelection]);
        } else {
            // 제거
            newWeeklySelections.set(
                weekNum,
                currentWeekSelections.filter(
                    (s) => !(s.bossId === boss.id && s.difficulty === difficulty)
                )
            );
        }

        setWeeklySelections(newWeeklySelections);
        onScheduleChange(newWeeklySelections);
    };

    // 파티 크기 변경
    const handlePartySizeChange = (
        weekNum: number,
        bossId: string,
        difficulty: string,
        partySize: number
    ) => {
        const newWeeklySelections = new Map(weeklySelections);
        const currentWeekSelections = newWeeklySelections.get(weekNum) || [];

        const updated = currentWeekSelections.map((s) =>
            s.bossId === bossId && s.difficulty === difficulty
                ? { ...s, partySize }
                : s
        );

        newWeeklySelections.set(weekNum, updated);
        setWeeklySelections(newWeeklySelections);
        onScheduleChange(newWeeklySelections);
    };

    // 이후 주차 동일 적용
    const applyToFollowingWeeks = (weekNum: number) => {
        const currentWeekSelections = weeklySelections.get(weekNum) || [];
        const newWeeklySelections = new Map(weeklySelections);

        // weekNum+1 부터 totalWeeks까지 동일하게 적용
        for (let i = weekNum + 1; i <= totalWeeks; i++) {
            newWeeklySelections.set(i, [...currentWeekSelections]);
        }

        setWeeklySelections(newWeeklySelections);
        onScheduleChange(newWeeklySelections);
    };

    // 주차 펼치기/접기
    const toggleWeek = (weekNum: number) => {
        const newExpanded = new Set(expandedWeeks);
        if (newExpanded.has(weekNum)) {
            newExpanded.delete(weekNum);
        } else {
            newExpanded.add(weekNum);
        }
        setExpandedWeeks(newExpanded);
    };

    // 특정 주차에 보스가 선택되었는지 확인
    const isBossSelected = (weekNum: number, bossId: string, difficulty: string): boolean => {
        const selections = weeklySelections.get(weekNum) || [];
        return selections.some((s) => s.bossId === bossId && s.difficulty === difficulty);
    };

    // 특정 주차의 보스 파티 크기 가져오기
    const getPartySize = (weekNum: number, bossId: string, difficulty: string): number => {
        const selections = weeklySelections.get(weekNum) || [];
        const selection = selections.find((s) => s.bossId === bossId && s.difficulty === difficulty);
        return selection?.partySize || 1;
    };

    // 특정 주차의 예상 획득 흔적 계산 (월간 보스 고려)
    const calculateWeekTraces = (weekNum: number): number => {
        const selections = weeklySelections.get(weekNum) || [];
        return selections.reduce((total, selection) => {
            let tracesFromBoss = Math.floor(selection.traces / selection.partySize);
            if (isGenesisPass) {
                tracesFromBoss *= 3;
            }
            // 월간 보스는 4주마다 한 번만
            if (selection.isMonthly && weekNum % 4 !== 1) {
                return total; // 이번 주에는 획득 안함
            }
            return total + tracesFromBoss;
        }, 0);
    };

    // 전체 초기화
    const resetAllSelections = () => {
        setWeeklySelections(new Map());
        setExpandedWeeks(new Set([1])); // 1주차만 펼침
        onScheduleChange(new Map());
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">
                    주차별 보스 격파 스케줄 ({totalWeeks}주)
                </h3>
                <button
                    onClick={resetAllSelections}
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                    <span>🔄</span>
                    <span>전체 초기화</span>
                </button>
            </div>

            <div className="space-y-2">
                {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((weekNum) => {
                    const isExpanded = expandedWeeks.has(weekNum);
                    const weekTraces = calculateWeekTraces(weekNum);
                    const isMonthlyWeek = weekNum % 4 === 1; // 월간 보스 가능 주차

                    return (
                        <div
                            key={weekNum}
                            className="bg-gray-800/50 rounded-lg border border-gray-700"
                        >
                            {/* 주차 헤더 */}
                            <div
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer hover:bg-gray-700/30 gap-3"
                                onClick={() => toggleWeek(weekNum)}
                            >
                                <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                                    <span className="text-white font-semibold">
                                        Week {weekNum}
                                    </span>
                                    {isMonthlyWeek && (
                                        <span className="text-[10px] sm:text-xs bg-orange-600 text-white px-2 py-1 rounded whitespace-nowrap">
                                            월간 보스 가능
                                        </span>
                                    )}
                                    <span className="text-yellow-400 text-sm whitespace-nowrap">
                                        {weekTraces > 0 ? `${weekTraces} 흔적` : '미설정'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-end gap-2">
                                    {weekNum < totalWeeks && isExpanded && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                applyToFollowingWeeks(weekNum);
                                            }}
                                            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                        >
                                            이후 주차 동일
                                        </button>
                                    )}
                                    <span className="text-gray-400">
                                        {isExpanded ? '▼' : '▶'}
                                    </span>
                                </div>
                            </div>

                            {/* 주차 상세 (펼쳐진 경우만) */}
                            {isExpanded && (
                                <div className="px-4 pb-4 space-y-4">
                                    {/* 주간 보스 */}
                                    <div>
                                        <h5 className="text-sm text-blue-300 mb-2">주간 보스</h5>
                                        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                                            {weeklyBosses.map((boss) => (
                                                <div key={boss.id} className="bg-gray-900/50 rounded p-2">
                                                    <div className="flex items-center gap-1 mb-2">
                                                        <img
                                                            src={boss.image}
                                                            alt={boss.name}
                                                            className="w-6 h-6 rounded object-cover"
                                                        />
                                                        <span className="text-white text-xs font-semibold">{boss.name}</span>
                                                    </div>
                                                    <div className="space-y-1">
                                                        {boss.difficulties.map((diff) => {
                                                            const isChecked = isBossSelected(weekNum, boss.id, diff.difficulty);
                                                            const partySize = getPartySize(weekNum, boss.id, diff.difficulty);

                                                            return (
                                                                <div key={diff.difficulty} className="flex items-center justify-between text-xs">
                                                                    <label className="flex items-center gap-1 cursor-pointer flex-1">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={isChecked}
                                                                            onChange={(e) =>
                                                                                handleBossToggle(
                                                                                    weekNum,
                                                                                    boss,
                                                                                    diff.difficulty,
                                                                                    diff.traces,
                                                                                    e.target.checked
                                                                                )
                                                                            }
                                                                            className="w-3 h-3 rounded border-gray-600 bg-gray-700"
                                                                        />
                                                                        <span className="text-gray-300">
                                                                            {diff.difficulty} ({isGenesisPass ? diff.traces * 3 : diff.traces})
                                                                        </span>
                                                                    </label>
                                                                    {isChecked && (
                                                                        <select
                                                                            value={partySize}
                                                                            onChange={(e) =>
                                                                                handlePartySizeChange(
                                                                                    weekNum,
                                                                                    boss.id,
                                                                                    diff.difficulty,
                                                                                    parseInt(e.target.value)
                                                                                )
                                                                            }
                                                                            className="ml-1 px-1 py-0.5 text-xs rounded bg-gray-700 text-white border border-gray-600"
                                                                        >
                                                                            <option value={1}>솔로</option>
                                                                            <option value={2}>2인</option>
                                                                            <option value={3}>3인</option>
                                                                            <option value={4}>4인</option>
                                                                            <option value={5}>5인</option>
                                                                            <option value={6}>6인</option>
                                                                        </select>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 월간 보스 (해당 주차에만) */}
                                    {isMonthlyWeek && monthlyBosses.length > 0 && (
                                        <div>
                                            <h5 className="text-sm text-orange-300 mb-2">월간 보스 (이번 주 가능)</h5>
                                            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                                                {monthlyBosses.map((boss) => (
                                                    <div key={boss.id} className="bg-gray-900/50 rounded p-2">
                                                        <div className="flex items-center gap-1 mb-2">
                                                            <img
                                                                src={boss.image}
                                                                alt={boss.name}
                                                                className="w-6 h-6 rounded object-cover"
                                                            />
                                                            <span className="text-white text-xs font-semibold">{boss.name}</span>
                                                        </div>
                                                        <div className="space-y-1">
                                                            {boss.difficulties.map((diff) => {
                                                                const isChecked = isBossSelected(weekNum, boss.id, diff.difficulty);
                                                                const partySize = getPartySize(weekNum, boss.id, diff.difficulty);

                                                                return (
                                                                    <div key={diff.difficulty} className="flex items-center justify-between text-xs">
                                                                        <label className="flex items-center gap-1 cursor-pointer flex-1">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={isChecked}
                                                                                onChange={(e) =>
                                                                                    handleBossToggle(
                                                                                        weekNum,
                                                                                        boss,
                                                                                        diff.difficulty,
                                                                                        diff.traces,
                                                                                        e.target.checked
                                                                                    )
                                                                                }
                                                                                className="w-3 h-3 rounded border-gray-600 bg-gray-700"
                                                                            />
                                                                            <span className="text-gray-300">
                                                                                {diff.difficulty} ({isGenesisPass ? diff.traces * 3 : diff.traces})
                                                                            </span>
                                                                        </label>
                                                                        {isChecked && (
                                                                            <select
                                                                                value={partySize}
                                                                                onChange={(e) =>
                                                                                    handlePartySizeChange(
                                                                                        weekNum,
                                                                                        boss.id,
                                                                                        diff.difficulty,
                                                                                        parseInt(e.target.value)
                                                                                    )
                                                                                }
                                                                                className="ml-1 px-1 py-0.5 text-xs rounded bg-gray-700 text-white border border-gray-600"
                                                                            >
                                                                                <option value={1}>솔로</option>
                                                                                <option value={2}>2인</option>
                                                                                <option value={3}>3인</option>
                                                                                <option value={4}>4인</option>
                                                                                <option value={5}>5인</option>
                                                                                <option value={6}>6인</option>
                                                                            </select>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                <div className="flex items-start gap-2">
                    <span className="text-blue-400">💡</span>
                    <div className="text-sm text-blue-200">
                        <strong>사용 팁:</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                            <li>각 주차를 클릭하여 격파 가능한 보스를 선택하세요</li>
                            <li>"이후 주차 동일" 버튼으로 같은 보스 구성을 이후 주차에 일괄 적용할 수 있습니다</li>
                            <li>월간 보스는 1, 5, 9, 13{totalWeeks >= 17 ? ', 17' : ''}주차에만 선택 가능합니다</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
