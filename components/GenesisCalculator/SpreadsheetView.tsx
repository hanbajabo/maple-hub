'use client';

import { Boss, BOSSES, QUEST_STAGES } from '@/data/genesis-liberation';
import { BossSelection, isMonthlyWeek, calculateWeekTraces } from '@/lib/genesis-calculator';
import { useState, useEffect } from 'react';

interface SpreadsheetViewProps {
    totalWeeks: number;
    weeklySelections: Map<number, BossSelection[]>;
    onScheduleChange: (weeklySelections: Map<number, BossSelection[]>) => void;
    isGenesisPass?: boolean;
    startDate: Date;
    currentStage: number;
    currentTraces: number;
}

interface CellModalData {
    weekNum: number;
    boss: Boss;
}

export default function SpreadsheetView({
    totalWeeks,
    weeklySelections,
    onScheduleChange,
    isGenesisPass,
    startDate,
    currentStage,
    currentTraces,
}: SpreadsheetViewProps) {
    const [modalData, setModalData] = useState<CellModalData | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
    const [selectedPartySize, setSelectedPartySize] = useState<number>(1);
    
    // 월간 보스 출현 주차 (1, 5, 9... 등 시작일 기준)
    const monthlyWeeks: number[] = [];
    for (let w = 1; w <= totalWeeks; w++) {
        if (isMonthlyWeek(startDate, w)) {
            monthlyWeeks.push(w);
        }
    }

    const openModal = (weekNum: number, boss: Boss) => {
        // 이미 선택된 내역이 있다면 로드
        const selections = weeklySelections.get(weekNum) || [];
        const existing = selections.find((s) => s.bossId === boss.id);
        
        if (existing) {
            setSelectedDifficulty(existing.difficulty);
            setSelectedPartySize(existing.partySize);
        } else {
            setSelectedDifficulty(null);
            setSelectedPartySize(1);
        }
        
        setModalData({ weekNum, boss });
    };

    const closeModal = () => {
        setModalData(null);
    };

    const handleSaveCell = () => {
        if (!modalData) return;
        const { weekNum, boss } = modalData;
        
        const newSelections = new Map(weeklySelections);
        const currentWeekSelections = newSelections.get(weekNum) || [];
        
        // 해당 보스의 기존 선택 제거
        const filtered = currentWeekSelections.filter((s) => s.bossId !== boss.id);
        
        if (selectedDifficulty) {
            const diffInfo = boss.difficulties.find(d => d.difficulty === selectedDifficulty);
            if (diffInfo) {
                const newSelection: BossSelection = {
                    bossId: boss.id,
                    difficulty: selectedDifficulty,
                    traces: diffInfo.traces,
                    partySize: selectedPartySize,
                    isMonthly: boss.isMonthly,
                };
                newSelections.set(weekNum, [...filtered, newSelection]);
            }
        } else {
            // 미참여 상태로 저장
            newSelections.set(weekNum, filtered);
        }
        
        onScheduleChange(newSelections);
        closeModal();
    };

    // 테이블 데이터 생성 (주차별 획득 흔적, 누적 흔적, 퀘스트 달성 여부)
    const tableData = [];
    let accumulated = currentTraces;
    let nextStage = currentStage;
    
    for (let w = 1; w <= totalWeeks; w++) {
        const selections = weeklySelections.get(w) || [];
        const isMonthly = monthlyWeeks.includes(w);
        
        const weekTraces = calculateWeekTraces(w, selections, startDate, isGenesisPass);
        accumulated += weekTraces;
        
        let questCompleted = null;
        if (nextStage <= 8) {
            const stageInfo = QUEST_STAGES[nextStage - 1];
            if (accumulated >= stageInfo.requiredTraces) {
                accumulated -= stageInfo.requiredTraces;
                questCompleted = stageInfo.bossName;
                nextStage++;
                
                // 만약 흔적이 충분해서 한 주에 여러 단계를 깰 수 있다면 (이론상)
                while (nextStage <= 8 && accumulated >= QUEST_STAGES[nextStage - 1].requiredTraces) {
                    accumulated -= QUEST_STAGES[nextStage - 1].requiredTraces;
                    questCompleted += `, ${QUEST_STAGES[nextStage - 1].bossName}`;
                    nextStage++;
                }
            }
        }
        
        tableData.push({
            weekNum: w,
            weekTraces,
            accumulated,
            questCompleted,
            isMonthly,
        });
    }

    const applyNoNormalHillaPreset = () => {
        const newSelections = new Map<number, BossSelection[]>();
        
        const week1: BossSelection[] = [
            { bossId: 'suu', difficulty: '노멀', traces: 10, partySize: 1 },
            { bossId: 'damien', difficulty: '노멀', traces: 10, partySize: 1 },
            { bossId: 'lucid', difficulty: '이지', traces: 15, partySize: 1 }
        ];
        
        const week2to4: BossSelection[] = [
            { bossId: 'suu', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'damien', difficulty: '하드', traces: 50, partySize: 2 },
            { bossId: 'lucid', difficulty: '이지', traces: 15, partySize: 1 },
            { bossId: 'will', difficulty: '이지', traces: 15, partySize: 1 },
            { bossId: 'dusk', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'dunkel', difficulty: '노멀', traces: 25, partySize: 2 }
        ];

        const week5to9and11: BossSelection[] = [
            { bossId: 'suu', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'damien', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'lucid', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'will', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'dusk', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'dunkel', difficulty: '노멀', traces: 25, partySize: 1 }
        ];

        const week10: BossSelection[] = [
            { bossId: 'suu', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'damien', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'lucid', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'will', difficulty: '하드', traces: 75, partySize: 3 },
            { bossId: 'dusk', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'dunkel', difficulty: '노멀', traces: 25, partySize: 1 }
        ];

        const week12: BossSelection[] = [
            { bossId: 'suu', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'damien', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'lucid', difficulty: '하드', traces: 65, partySize: 3 },
            { bossId: 'will', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'dusk', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'dunkel', difficulty: '노멀', traces: 25, partySize: 1 }
        ];

        const week13: BossSelection[] = [
            { bossId: 'suu', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'damien', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'lucid', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'will', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'dusk', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'dunkel', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'verus-hilla', difficulty: '하드', traces: 90, partySize: 6 }
        ];

        for(let w = 1; w <= totalWeeks; w++) {
            if (w === 1) newSelections.set(w, week1);
            else if (w >= 2 && w <= 4) newSelections.set(w, week2to4);
            else if ((w >= 5 && w <= 9) || w === 11) newSelections.set(w, week5to9and11);
            else if (w === 10) newSelections.set(w, week10);
            else if (w === 12) newSelections.set(w, week12);
            else if (w >= 13) newSelections.set(w, week13);
        }
        
        onScheduleChange(newSelections);
    };

    const applyNormalHillaPreset = () => {
        const newSelections = new Map<number, BossSelection[]>();
        
        const week1: BossSelection[] = [
            { bossId: 'suu', difficulty: '노멀', traces: 10, partySize: 1 },
            { bossId: 'damien', difficulty: '노멀', traces: 10, partySize: 1 },
            { bossId: 'lucid', difficulty: '이지', traces: 15, partySize: 1 }
        ];
        
        const week2: BossSelection[] = [
            { bossId: 'suu', difficulty: '노멀', traces: 10, partySize: 1 },
            { bossId: 'damien', difficulty: '노멀', traces: 10, partySize: 1 },
            { bossId: 'lucid', difficulty: '이지', traces: 15, partySize: 1 },
            { bossId: 'will', difficulty: '이지', traces: 15, partySize: 1 }
        ];

        const week3: BossSelection[] = [
            { bossId: 'suu', difficulty: '노멀', traces: 10, partySize: 1 },
            { bossId: 'damien', difficulty: '노멀', traces: 10, partySize: 1 },
            { bossId: 'lucid', difficulty: '이지', traces: 15, partySize: 1 },
            { bossId: 'will', difficulty: '이지', traces: 15, partySize: 1 },
            { bossId: 'dusk', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'dunkel', difficulty: '노멀', traces: 25, partySize: 2 }
        ];

        const week4: BossSelection[] = [
            { bossId: 'suu', difficulty: '하드', traces: 50, partySize: 2 },
            { bossId: 'damien', difficulty: '하드', traces: 50, partySize: 2 },
            { bossId: 'lucid', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'will', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'dusk', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'dunkel', difficulty: '노멀', traces: 25, partySize: 2 }
        ];

        const week5: BossSelection[] = [
            { bossId: 'suu', difficulty: '하드', traces: 50, partySize: 2 },
            { bossId: 'damien', difficulty: '하드', traces: 50, partySize: 2 },
            { bossId: 'lucid', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'will', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'dusk', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'dunkel', difficulty: '노멀', traces: 25, partySize: 1 }
        ];

        const week6: BossSelection[] = [
            { bossId: 'suu', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'damien', difficulty: '하드', traces: 50, partySize: 2 },
            { bossId: 'lucid', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'will', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'dusk', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'dunkel', difficulty: '노멀', traces: 25, partySize: 1 }
        ];

        const week7to8: BossSelection[] = [
            { bossId: 'suu', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'damien', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'lucid', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'will', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'dusk', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'dunkel', difficulty: '노멀', traces: 25, partySize: 1 }
        ];

        const week9: BossSelection[] = [
            { bossId: 'suu', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'damien', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'lucid', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'will', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'dusk', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'dunkel', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'verus-hilla', difficulty: '노멀', traces: 45, partySize: 2 }
        ];

        const week10: BossSelection[] = [
            { bossId: 'suu', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'damien', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'lucid', difficulty: '하드', traces: 65, partySize: 2 },
            { bossId: 'will', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'dusk', difficulty: '노멀', traces: 20, partySize: 1 },
            { bossId: 'dunkel', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'verus-hilla', difficulty: '노멀', traces: 45, partySize: 1 }
        ];

        const week11: BossSelection[] = [
            { bossId: 'suu', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'damien', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'lucid', difficulty: '하드', traces: 65, partySize: 2 },
            { bossId: 'will', difficulty: '하드', traces: 75, partySize: 4 },
            { bossId: 'dusk', difficulty: '카오스', traces: 65, partySize: 2 },
            { bossId: 'dunkel', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'verus-hilla', difficulty: '노멀', traces: 45, partySize: 1 }
        ];

        const week12: BossSelection[] = [
            { bossId: 'suu', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'damien', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'lucid', difficulty: '하드', traces: 65, partySize: 4 },
            { bossId: 'will', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'dusk', difficulty: '카오스', traces: 65, partySize: 2 },
            { bossId: 'dunkel', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'verus-hilla', difficulty: '노멀', traces: 45, partySize: 1 }
        ];

        const week13: BossSelection[] = [
            { bossId: 'suu', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'damien', difficulty: '하드', traces: 50, partySize: 1 },
            { bossId: 'lucid', difficulty: '하드', traces: 65, partySize: 2 },
            { bossId: 'will', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'dusk', difficulty: '카오스', traces: 65, partySize: 1 },
            { bossId: 'dunkel', difficulty: '노멀', traces: 25, partySize: 1 },
            { bossId: 'verus-hilla', difficulty: '하드', traces: 90, partySize: 6 }
        ];

        for(let w = 1; w <= totalWeeks; w++) {
            if (w === 1) newSelections.set(w, week1);
            else if (w === 2) newSelections.set(w, week2);
            else if (w === 3) newSelections.set(w, week3);
            else if (w === 4) newSelections.set(w, week4);
            else if (w === 5) newSelections.set(w, week5);
            else if (w === 6) newSelections.set(w, week6);
            else if (w === 7 || w === 8) newSelections.set(w, week7to8);
            else if (w === 9) newSelections.set(w, week9);
            else if (w === 10) newSelections.set(w, week10);
            else if (w === 11) newSelections.set(w, week11);
            else if (w === 12) newSelections.set(w, week12);
            else if (w >= 13) newSelections.set(w, week13);
        }
        
        onScheduleChange(newSelections);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white hidden sm:block">
                    주차별 스케줄 (스프레드시트 뷰)
                </h3>
                <div className="flex gap-2 w-full sm:w-auto justify-end flex-wrap">
                    <button
                        onClick={applyNormalHillaPreset}
                        className="text-xs bg-pink-600 hover:bg-pink-700 text-white px-3 py-1.5 rounded flex items-center gap-1 font-bold shadow-md w-full sm:w-auto justify-center"
                    >
                        <span>🔥</span>
                        <span>진힐라 포함 루트</span>
                    </button>
                    <button
                        onClick={applyNoNormalHillaPreset}
                        className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded flex items-center gap-1 font-bold shadow-md w-full sm:w-auto justify-center"
                    >
                        <span>✨</span>
                        <span>진힐라 제외 루트</span>
                    </button>
                    <button
                        onClick={() => onScheduleChange(new Map())}
                        className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded flex items-center gap-1 font-bold shadow-md w-full sm:w-auto justify-center"
                    >
                        <span>🔄</span>
                        <span>초기화</span>
                    </button>
                </div>
            </div>
            
            <p className="text-xs text-indigo-300 sm:hidden mb-2 text-center bg-indigo-900/30 py-1.5 rounded-lg border border-indigo-800/50">
                👉 표를 좌우로 스크롤해서 모든 보스를 확인하세요
            </p>

            <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-inner bg-gray-900/50">
                <table className="w-full text-xs sm:text-sm text-center border-collapse">
                    <thead className="bg-gray-800 text-gray-200">
                        <tr>
                            <th className="p-1 sm:p-2 border border-gray-700 font-bold whitespace-nowrap sticky left-0 bg-gray-800 z-10 w-16">주차</th>
                            {BOSSES.map(boss => (
                                <th key={boss.id} className="p-1 sm:p-2 border border-gray-700 font-bold whitespace-nowrap">
                                    {boss.name === '검은 마법사' ? '검마' : boss.name}
                                </th>
                            ))}
                            <th className="p-1 sm:p-2 border border-gray-700 font-bold text-yellow-400 whitespace-nowrap w-16">획득</th>
                            <th className="p-1 sm:p-2 border border-gray-700 font-bold text-orange-400 whitespace-nowrap w-16">누적</th>
                            <th className="p-1 sm:p-2 border border-gray-700 font-bold text-green-400 whitespace-nowrap w-24">해방 퀘스트</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800/20">
                        {tableData.map((row) => (
                            <tr key={`week-${row.weekNum}`} className="hover:bg-gray-700/50 transition-colors">
                                <td className="p-1 sm:p-2 border border-gray-700 font-semibold text-gray-300 sticky left-0 bg-gray-800/95 z-10">
                                    {row.weekNum}주차
                                </td>
                                {BOSSES.map(boss => {
                                    const selections = weeklySelections.get(row.weekNum) || [];
                                    const selection = selections.find(s => s.bossId === boss.id);
                                    
                                    // 월간 보스인데 이번 주차가 초기화 주차가 아니면 비활성화 처리
                                    const isDisabled = boss.isMonthly && !row.isMonthly;
                                    
                                    let cellContent = <span className="text-gray-600">-</span>;
                                    let cellClasses = "p-1 sm:p-2 border border-gray-700 cursor-pointer hover:bg-gray-600/50 transition-colors h-10";
                                    
                                    if (isDisabled) {
                                        cellContent = <span className="text-gray-600/50">X</span>;
                                        cellClasses = "p-1 sm:p-2 border border-gray-700 bg-gray-900/80 cursor-not-allowed h-10";
                                    } else if (selection) {
                                        const isHard = selection.difficulty === '하드' || selection.difficulty === '카오스' || selection.difficulty === '익스트림';
                                        
                                        // 난이도 색상 (하드=빨강, 노멀=파랑, 이지=회색)
                                        let diffColor = 'text-gray-400';
                                        if (isHard) diffColor = 'text-red-400';
                                        else if (selection.difficulty === '노멀') diffColor = 'text-blue-400';

                                        // 인원수 색상 (1인=난이도색상과 동일, 2인이상=회색/무채색으로 구분)
                                        const partyColor = selection.partySize >= 2 ? 'text-gray-300 font-bold bg-gray-700/50 px-1 rounded mt-0.5' : diffColor;
                                        
                                        cellContent = (
                                            <div className="flex flex-col items-center justify-center leading-tight">
                                                <span className={`font-bold text-xs ${diffColor}`}>{selection.difficulty}</span>
                                                <span className={`text-[10px] ${partyColor}`}>{selection.partySize}인</span>
                                            </div>
                                        );
                                    }

                                    return (
                                        <td 
                                            key={`${row.weekNum}-${boss.id}`} 
                                            className={cellClasses}
                                            onClick={() => !isDisabled && openModal(row.weekNum, boss)}
                                        >
                                            {cellContent}
                                        </td>
                                    );
                                })}
                                <td className="p-1 sm:p-2 border border-gray-700 font-mono font-bold text-yellow-300">
                                    {row.weekTraces > 0 ? row.weekTraces : '-'}
                                </td>
                                <td className="p-1 sm:p-2 border border-gray-700 font-mono font-bold text-orange-300">
                                    {row.accumulated}
                                </td>
                                <td className="p-1 sm:p-2 border border-gray-700 font-bold text-green-400 whitespace-nowrap text-xs">
                                    {row.questCompleted || ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 모달 팝업 */}
            {modalData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={closeModal}>
                    <div className="bg-gray-800 border border-gray-600 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-gray-900 px-4 py-3 border-b border-gray-700 flex justify-between items-center">
                            <h4 className="font-bold text-white flex items-center gap-2">
                                <img src={modalData.boss.image} alt={modalData.boss.name} className="w-6 h-6 object-contain drop-shadow" />
                                {modalData.weekNum}주차 {modalData.boss.name}
                            </h4>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
                        </div>
                        
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-400 mb-2">난이도 선택</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button 
                                        onClick={() => setSelectedDifficulty(null)}
                                        className={`px-3 py-2 rounded-lg text-sm font-bold border transition-colors ${selectedDifficulty === null ? 'bg-gray-600 text-white border-gray-500' : 'bg-gray-700/50 text-gray-400 border-gray-700 hover:bg-gray-700'}`}
                                    >
                                        미참여
                                    </button>
                                    {modalData.boss.difficulties.map(d => {
                                        const isHard = d.difficulty === '하드' || d.difficulty === '카오스' || d.difficulty === '익스트림';
                                        const isSelected = selectedDifficulty === d.difficulty;
                                        return (
                                            <button 
                                                key={d.difficulty}
                                                onClick={() => setSelectedDifficulty(d.difficulty)}
                                                className={`px-3 py-2 rounded-lg text-sm font-bold border transition-colors ${isSelected ? (isHard ? 'bg-red-900/60 text-red-300 border-red-500' : 'bg-blue-900/60 text-blue-300 border-blue-500') : 'bg-gray-700/50 text-gray-300 border-gray-700 hover:bg-gray-700'}`}
                                            >
                                                {d.difficulty} ({d.traces} 흔적)
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {selectedDifficulty !== null && (
                                <div className="animate-in slide-in-from-top-2 fade-in duration-200">
                                    <div className="flex justify-between items-end mb-2">
                                        <label className="block text-sm font-semibold text-gray-400">파티 인원</label>
                                        <span className="text-xs text-yellow-500 font-bold">1인당 획득량: {Math.floor((modalData.boss.difficulties.find(d => d.difficulty === selectedDifficulty)?.traces || 0) / selectedPartySize)}</span>
                                    </div>
                                    <div className="grid grid-cols-6 gap-1">
                                        {[1, 2, 3, 4, 5, 6].map(num => (
                                            <button
                                                key={`party-${num}`}
                                                onClick={() => setSelectedPartySize(num)}
                                                className={`py-2 rounded font-bold text-sm transition-colors ${selectedPartySize === num ? 'bg-purple-600 text-white shadow-inner' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button 
                                onClick={handleSaveCell}
                                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-colors"
                            >
                                적용하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
