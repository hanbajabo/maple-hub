/**
 * 보스 선택 체크리스트 컴포넌트
 */

'use client';

import { Boss, BOSSES } from '@/data/genesis-liberation';
import { BossSelection } from '@/lib/genesis-calculator';
import { useState } from 'react';

interface BossCheckListProps {
    onSelectionChange: (selections: BossSelection[]) => void;
}

export default function BossCheckList({ onSelectionChange }: BossCheckListProps) {
    const [selections, setSelections] = useState<Map<string, BossSelection>>(new Map());

    const handleBossToggle = (
        boss: Boss,
        difficulty: string,
        traces: number,
        checked: boolean
    ) => {
        const key = `${boss.id}-${difficulty}`;
        const newSelections = new Map(selections);

        if (checked) {
            newSelections.set(key, {
                bossId: boss.id,
                difficulty,
                traces,
                partySize: 1, // 기본 솔로
                isMonthly: boss.isMonthly, // 월간 보스 플래그 전달
            });
        } else {
            newSelections.delete(key);
        }

        setSelections(newSelections);
        onSelectionChange(Array.from(newSelections.values()));
    };

    const handlePartySizeChange = (
        boss: Boss,
        difficulty: string,
        partySize: number
    ) => {
        const key = `${boss.id}-${difficulty}`;
        const newSelections = new Map(selections);
        const selection = newSelections.get(key);

        if (selection) {
            newSelections.set(key, {
                ...selection,
                partySize,
            });
            setSelections(newSelections);
            onSelectionChange(Array.from(newSelections.values()));
        }
    };

    // 주간 보스와 월간 보스 분리
    const weeklyBosses = BOSSES.filter((boss) => !boss.isMonthly);
    const monthlyBosses = BOSSES.filter((boss) => boss.isMonthly);

    const renderBossCard = (boss: Boss) => (
        <div
            key={boss.id}
            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
        >
            <div className="font-semibold text-white mb-3">
                {boss.name}
                {boss.isMonthly && (
                    <span className="ml-2 text-xs bg-orange-600 text-white px-2 py-1 rounded">
                        월간
                    </span>
                )}
            </div>
            <div className="space-y-2">
                {boss.difficulties.map((diff) => {
                    const key = `${boss.id}-${diff.difficulty}`;
                    const isChecked = selections.has(key);
                    const selection = selections.get(key);

                    return (
                        <div
                            key={diff.difficulty}
                            className="flex items-center justify-between bg-gray-900/50 rounded p-3"
                        >
                            <label className="flex items-center gap-3 cursor-pointer flex-1">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) =>
                                        handleBossToggle(
                                            boss,
                                            diff.difficulty,
                                            diff.traces,
                                            e.target.checked
                                        )
                                    }
                                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 
                           text-blue-500 focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="text-gray-300">
                                    {diff.difficulty}
                                    <span className="text-yellow-400 ml-2 font-semibold">
                                        {diff.traces}
                                    </span>
                                    <span className="text-gray-500 text-sm ml-1">흔적</span>
                                    {boss.isMonthly && (
                                        <span className="text-orange-400 text-xs ml-2">
                                            (주당 {Math.floor(diff.traces / 4)})
                                        </span>
                                    )}
                                </span>
                            </label>

                            {isChecked && (
                                <select
                                    value={selection?.partySize || 1}
                                    onChange={(e) =>
                                        handlePartySizeChange(
                                            boss,
                                            diff.difficulty,
                                            parseInt(e.target.value)
                                        )
                                    }
                                    className="ml-3 px-3 py-1 rounded bg-gray-700 text-white 
                           border border-gray-600 text-sm focus:ring-2 focus:ring-blue-500"
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
    );

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">
                주간 격파 가능한 보스 선택
            </h3>

            {/* 주간 보스 */}
            <div>
                <h4 className="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2">
                    <span>📅</span>
                    주간 보스
                </h4>
                <div className="space-y-3">
                    {weeklyBosses.map(renderBossCard)}
                </div>
            </div>

            {/* 월간 보스 */}
            {monthlyBosses.length > 0 && (
                <div className="mt-6">
                    <h4 className="text-sm font-semibold text-orange-300 mb-3 flex items-center gap-2">
                        <span>🗓️</span>
                        월간 보스
                    </h4>
                    <div className="space-y-3">
                        {monthlyBosses.map(renderBossCard)}
                    </div>
                    <div className="mt-3 bg-orange-900/20 border border-orange-700 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                            <span className="text-orange-400 text-sm">⚠️</span>
                            <div className="text-xs text-orange-200">
                                <strong>월간 보스:</strong> 한 달(4주)에 1회만 격파 가능합니다.
                                주간 획득량 계산 시 4로 나누어 계산됩니다.
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-2">
                    <span className="text-blue-400 text-xl">💡</span>
                    <div className="text-sm text-blue-200">
                        <strong>참고:</strong> 파티로 격파 시 어둠의 흔적은 파티 인원수로 나누어 획득됩니다.
                        <br />
                        예: 검은 마법사 하드 (600) → 2인 격파 시 월 300 획득 (주당 75)
                    </div>
                </div>
            </div>
        </div>
    );
}
