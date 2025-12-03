import React from 'react';

interface Stage7ContentProps {
    stage7Info?: {
        currentCombination: string;
        isCompleted: boolean;
        counts: {
            cra: number;
            absol: number;
            arcane: number;
            eternal: number;
        };
    };
    renderPassedItemsSection: (stageId: number) => React.ReactNode;
    renderFailedItemsSection: (stageId: number) => React.ReactNode;
}

export const Stage7Content: React.FC<Stage7ContentProps> = ({ stage7Info, renderPassedItemsSection, renderFailedItemsSection }) => {
    if (!stage7Info) return null;

    return (
        <div className="space-y-3 text-sm">
            <div className="bg-gradient-to-r from-red-950/30 to-purple-950/30 p-4 rounded-lg border border-red-900/50">
                <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2 text-lg">
                    <span>⚔️</span> 8단계: 22성 조합 선택하기
                </h4>
                <p className="text-slate-300 mb-3 leading-relaxed">
                    최종 스펙업을 위해 어떤 조합으로 22성을 맞출지 결정해야 합니다.
                </p>

                <div className="mb-4 p-3 bg-slate-900/80 rounded border border-red-900/30">
                    <span className="text-slate-400 text-xs block mb-1">📢 현재 착용 중인 조합:</span>
                    <strong className="text-red-300 text-lg block">
                        {stage7Info.currentCombination}
                    </strong>
                    <div className="mt-2 text-xs text-slate-400 flex gap-2">
                        <span>카루타: {stage7Info.counts.cra}</span>
                        <span>앱솔: {stage7Info.counts.absol}</span>
                        <span>아케인: {stage7Info.counts.arcane}</span>
                        <span>에테르넬: {stage7Info.counts.eternal}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                        <h5 className="text-slate-300 font-bold mb-2">전통적인 22성 조합</h5>
                        <div className="space-y-2">
                            <div className={`p-2 rounded border ${stage7Info.currentCombination === "3카 5아" ? 'bg-red-900/30 border-red-500' : 'bg-slate-900/50 border-slate-700/50'}`}>
                                <h6 className="text-red-300 font-bold text-sm">1안: 3루타비스 + 4아케인 + 제네시스 무기</h6>
                                <p className="text-xs text-slate-400">- 가장 보편적이고 가성비 좋은 22성 세팅</p>
                            </div>
                            <div className={`p-2 rounded border ${stage7Info.currentCombination === "3카 5앱" ? 'bg-red-900/30 border-red-500' : 'bg-slate-900/50 border-slate-700/50'}`}>
                                <h6 className="text-red-300 font-bold text-sm">2안: 3루타비스 + 4앱솔랩스 + 제네시스 무기</h6>
                                <p className="text-xs text-slate-400">- 가성비 극대화, 토드 활용 용이</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                        <h5 className="text-slate-300 font-bold mb-2">에테르넬 도입 (고자본)</h5>
                        <div className="space-y-2">
                            <div className={`p-2 rounded border ${stage7Info.currentCombination.includes("에테르넬") ? 'bg-purple-900/30 border-purple-500' : 'bg-slate-900/50 border-slate-700/50'}`}>
                                <h6 className="text-purple-300 font-bold text-sm">3안: 에테르넬 혼합 세팅</h6>
                                <p className="text-xs text-slate-400">- 2에테 / 4에테 등 자본 상황에 맞춰 에테르넬 부위 추가</p>
                                <p className="text-xs text-slate-500 mt-1">* 에테르넬은 17성/18성만 되어도 22성 카루타/앱솔보다 강력할 수 있음</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {renderPassedItemsSection(7)}
            {renderFailedItemsSection(7)}
        </div>
    );
};
