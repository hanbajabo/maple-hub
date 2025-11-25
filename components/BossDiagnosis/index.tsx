import React, { useState, useMemo, useEffect } from 'react';
import { BossDiagnosisProps } from './types';
import { analyzeEquipment } from './logic';
import { StageCard } from './StageCard';
import { DiagnosisHeader, IssueSection } from './IssueSection';

const BossDiagnosis: React.FC<BossDiagnosisProps> = ({ equipment, stat, basic }) => {
    const [expandedStages, setExpandedStages] = useState<Set<number>>(new Set());
    const [showIssues, setShowIssues] = useState(false);
    const [manualPassedStages, setManualPassedStages] = useState<Set<number>>(new Set());

    const { stage, issues, attTypeKor, setCounts, passedArmorOption, isGenesisWeapon, stage4Stats, stage5Stats, stage6Stats, stage7Info, stage8Stats } = useMemo(() =>
        analyzeEquipment(equipment, basic, manualPassedStages),
        [equipment, basic, manualPassedStages]
    );

    const handleManualPass = (stageId: number) => {
        setManualPassedStages(prev => {
            const newSet = new Set(prev);
            newSet.add(stageId);
            return newSet;
        });
    };

    // Auto-expand current stage
    useEffect(() => {
        if (stage >= 0 && stage <= 8) {
            setExpandedStages(new Set([stage]));
        } else {
            setExpandedStages(new Set());
        }

        // 5단계, 6단계, 7단계에서는 IssueSection을 기본적으로 펼침
        if (stage === 4 || stage === 5 || stage === 6) {
            setShowIssues(true);
        } else {
            setShowIssues(false);
        }
    }, [stage]);

    const toggleStage = (stageId: number) => {
        setExpandedStages(prev => {
            const newSet = new Set(prev);
            if (newSet.has(stageId)) {
                newSet.delete(stageId);
            } else {
                newSet.add(stageId);
            }
            return newSet;
        });
    };

    const stages = [
        { id: 0, title: "⚔️ [1단계] 기초 세팅 점검", description: "스타포스, 잠재능력, 에디셔널 기초 기준", color: "blue" },
        { id: 1, title: "🧩 [2단계] 장신구 세트 효과 점검", description: "보스/여명/칠흑/마이스터 세트 구성", color: "green" },
        { id: 2, title: "🎯 [3단계] 무기 + 보조무기 + 엠블렘 상세 점검", description: "무기/보조무기/엠블렘 우선순위별 상세 진단", color: "orange" },
        { id: 3, title: "🛡️ [4단계] 방어구 방향 결정 하기", description: "기간제 아이템 이후의 방어구 세팅 가이드", color: "purple" },
        { id: 4, title: "🚀 [5단계] 성장 진단 (17성+)", description: "본격적인 스펙업을 위한 17성 및 세부 세팅", color: "red" },
        { id: 5, title: "⚡ [6단계] 특수 스펙 최적화 (쿨뚝 & 시드링)", description: "직업별 필수 쿨타임 감소 모자와 시드링을 점검합니다.", color: "indigo" },
        { id: 6, title: "💎 [7단계] 최종 완성 (18성+)", description: "스타포스 가능한 전 부위 18성을 달성하여 스펙업을 진행하세요!", color: "gold" },
        { id: 7, title: "🌟 [8단계] 스타포스 22성 조합 선택하기", description: "22성 방어구 방향을 결정하고 스펙업 로드맵을 수립하세요.", color: "cyan" },
        { id: 8, title: "⚔️ [9단계] 22성급 방어구 셋팅", description: "22성급 방어구 세트 방향을 정했다면 진짜 22성급 템을 맞춰보자!", color: "pink" }
    ];

    const getStageLabel = (s: number) => {
        if (s === 0) return "1단계 미달";
        if (s === 1) return "2단계 미달";
        if (s === 2) return "3단계 미달";
        if (s === 3) return "4단계 미달";
        if (s === 4) return "5단계 미달";
        if (s === 5) return "6단계 미달";
        if (s === 6) return "7단계 미달";
        if (s === 7) return "8단계 진행중";
        if (s === 8) return "9단계 진행중";
        return "진단 완료";
    };

    return (
        <div className="w-full h-full flex flex-col gap-3 sm:gap-4">
            <DiagnosisHeader />

            <div className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-slate-700">
                <div className="flex justify-between items-center mb-2 sm:mb-4">
                    <h3 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
                        <span>📊</span>
                        <span>현재 단계: <span className="text-orange-400">{getStageLabel(stage)}</span></span>
                    </h3>
                </div>

                <div className="w-full bg-slate-950 h-2 sm:h-3 rounded-full overflow-hidden mb-1 sm:mb-2 relative">
                    <div
                        className="h-full bg-gradient-to-r from-red-600 to-orange-400 transition-all duration-500"
                        style={{ width: `${(stage / 9) * 100}%` }}
                    ></div>
                    <div className="absolute inset-0 flex justify-between px-1">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(s => (
                            <div key={s} className={`w-0.5 h-full ${s <= stage ? 'bg-transparent' : 'bg-slate-800'}`}></div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between text-[8px] sm:text-xs text-slate-500 px-1">
                    <span>시작</span>
                    <span>기초</span>
                    <span>세트</span>
                    <span>WSE</span>
                    <span>방어구</span>
                    <span>17성</span>
                    <span>18성</span>
                    <span>최적화</span>
                    <span>22성</span>
                    <span>완료</span>
                </div>

                {(stage < 9) && (
                    <IssueSection
                        issues={issues}
                        show={showIssues}
                        onToggle={() => setShowIssues(!showIssues)}
                        stage={stage}
                    />
                )}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
                {stages.map(stageInfo => {
                    return (
                        <StageCard
                            key={stageInfo.id}
                            stageInfo={stageInfo}
                            isCurrent={stageInfo.id === stage}
                            isPassed={stageInfo.id < stage}
                            isExpanded={expandedStages.has(stageInfo.id)}
                            onToggle={toggleStage}
                            attTypeKor={attTypeKor}
                            setCounts={setCounts}
                            passedArmorOption={passedArmorOption || undefined}
                            isGenesisWeapon={isGenesisWeapon}
                            stage4Stats={stage4Stats}
                            stage5Stats={stage5Stats}
                            stage6Stats={stage6Stats}
                            stage7Info={stage7Info}
                            stage8Stats={stage8Stats}
                            onPass={() => handleManualPass(stageInfo.id)}
                        />
                    );
                })}
            </div>

            <div className="mt-2 p-3 bg-slate-950/50 border border-slate-800 rounded-lg">
                <p className="text-sm text-slate-400 text-center">
                    💡 <strong>진단 결과</strong>는 위 섹션에서 자동으로 확인됩니다
                </p>
            </div>
        </div>
    );
};

export default BossDiagnosis;
