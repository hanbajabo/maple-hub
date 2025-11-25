import React, { useState, useMemo, useEffect } from 'react';
import { BossDiagnosisProps } from './types';
import { analyzeEquipment } from './logic';
import { StageCard } from './StageCard';
import { DiagnosisHeader, IssueSection } from './IssueSection';

const BossDiagnosis: React.FC<BossDiagnosisProps> = ({ equipment, stat, basic }) => {
    const [expandedStages, setExpandedStages] = useState<Set<number>>(new Set([0]));
    const [showIssues, setShowIssues] = useState(false);

    const { stage, issues, attTypeKor, setCounts, passedArmorOption, isGenesisWeapon, stage4Stats, stage5Stats, stage6Info } = useMemo(() =>
        analyzeEquipment(equipment, basic),
        [equipment, basic]
    );

    // Auto-expand current stage
    useEffect(() => {
        if (stage >= 0 && stage <= 6) {
            setExpandedStages(new Set([stage]));
        }
        // 5단계, 6단계에서는 IssueSection을 기본적으로 펼침
        if (stage === 4 || stage === 5) {
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
        { id: 5, title: "💎 [6단계] 최종 완성 (18성+)", description: "스타포스 가능한 전 부위 18성을 달성하여 스펙업을 진행하세요!", color: "gold" },
        { id: 6, title: "🌟 [7단계] 스타포스 22성 조합 선택하기", description: "22성 방어구 방향을 결정하고 스펙업 로드맵을 수립하세요.", color: "cyan" }
    ];

    const getStageLabel = (s: number) => {
        if (s === 0) return "1단계 미달";
        if (s === 1) return "2단계 미달";
        if (s === 2) return "3단계 미달";
        if (s === 3) return "4단계 미달";
        if (s === 4) return "5단계 미달";
        if (s === 5) return "6단계 미달";
        if (s === 6) return "7단계 진행중";
        return "진단 완료";
    };

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <DiagnosisHeader />

            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>📊</span>
                        <span>현재 단계: <span className="text-orange-400">{getStageLabel(stage)}</span></span>
                    </h3>
                </div>

                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden mb-2 relative">
                    <div
                        className="h-full bg-gradient-to-r from-red-600 to-orange-400 transition-all duration-500"
                        style={{ width: `${(stage / 7) * 100}%` }}
                    ></div>
                    <div className="absolute inset-0 flex justify-between px-1">
                        {[0, 1, 2, 3, 4, 5, 6, 7].map(s => (
                            <div key={s} className={`w-0.5 h-full ${s <= stage ? 'bg-transparent' : 'bg-slate-800'}`}></div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 px-1">
                    <span>시작</span>
                    <span>기초</span>
                    <span>세트</span>
                    <span>WSE</span>
                    <span>방어구</span>
                    <span>17성</span>
                    <span>18성</span>
                    <span>22성</span>
                </div>

                {(stage < 7) && (
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
                            stage6Info={stage6Info}
                        />
                    );
                })}
            </div>

            <div className="mt-2 p-3 bg-slate-950/50 border border-slate-800 rounded-lg">
                <p className="text-xs text-slate-400 text-center">
                    💡 <strong>진단 결과</strong>는 위 섹션에서 자동으로 확인됩니다
                </p>
            </div>
        </div>
    );
};

export default BossDiagnosis;
