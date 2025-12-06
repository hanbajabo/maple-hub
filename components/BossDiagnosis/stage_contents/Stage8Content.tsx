import React from 'react';

interface Stage8ContentProps {
    stage8Stats?: {
        cra22Count: number;
        absol22Count: number;
        arcane22Count: number;
        eternal17Count: number;
        satisfiedSetCount: number;
        isEternal4SetSatisfied: boolean;
        totalPassedPieces: number;  // 추가
    };
    renderPassedItemsSection: (stageId: number) => React.ReactNode;
    renderFailedItemsSection: (stageId: number) => React.ReactNode;
}

export const Stage8Content: React.FC<Stage8ContentProps> = ({ stage8Stats, renderPassedItemsSection, renderFailedItemsSection }) => {
    if (!stage8Stats) return null;

    return (
        <div className="space-y-3 text-sm">
            <div className="bg-gradient-to-r from-purple-950/30 to-pink-950/30 p-4 rounded-lg border border-purple-900/50">
                <h4 className="text-purple-400 font-bold mb-3 flex items-center gap-2 text-lg">
                    <span>👑</span> 9단계: 22성 방어구 완성
                </h4>
                <p className="text-slate-300 mb-3 leading-relaxed">
                    선택한 조합에 맞춰 모든 방어구의 22성(에테르넬 17성+)을 완성하세요.
                </p>

                <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                    <h5 className="text-purple-300 font-bold mb-2 flex items-center gap-1">
                        <span>📊</span> 달성 현황
                    </h5>
                    <ul className="space-y-2 text-slate-300 pl-1">
                        <li className="flex justify-between items-center">
                            <span>카루타 22성</span>
                            <span className={stage8Stats.cra22Count >= 3 ? 'text-green-400 font-bold' : 'text-slate-400'}>
                                {stage8Stats.cra22Count} / 3
                            </span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span>아케인 22성</span>
                            <span className={stage8Stats.arcane22Count >= 4 ? 'text-green-400 font-bold' : 'text-slate-400'}>
                                {stage8Stats.arcane22Count} / 4
                            </span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span>앱솔랩스 22성</span>
                            <span className={stage8Stats.absol22Count >= 4 ? 'text-green-400 font-bold' : 'text-slate-400'}>
                                {stage8Stats.absol22Count} / 4
                            </span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span>에테르넬 17성+</span>
                            <span className={stage8Stats.eternal17Count >= 2 ? 'text-green-400 font-bold' : 'text-slate-400'}>
                                {stage8Stats.eternal17Count} / 2+
                            </span>
                        </li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-slate-800">
                        <div className="flex items-center gap-2">
                            <span className={stage8Stats.satisfiedSetCount >= 2 || stage8Stats.isEternal4SetSatisfied ? 'text-green-400' : 'text-red-400'}>
                                {stage8Stats.satisfiedSetCount >= 2 || stage8Stats.isEternal4SetSatisfied ? '✅' : '❌'}
                            </span>
                            <span className="text-slate-300">
                                목표 달성: <strong className="text-white">{stage8Stats.totalPassedPieces} / 7 부위</strong>
                            </span>
                        </div>
                        {(stage8Stats.satisfiedSetCount >= 2 || stage8Stats.isEternal4SetSatisfied) && (
                            <p className="text-xs text-green-400 mt-2">
                                ✓ {stage8Stats.satisfiedSetCount >= 2 ? `${stage8Stats.satisfiedSetCount}개 세트 조합 완성` : '에테르넬 4세트 완성'}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {renderPassedItemsSection(8)}
            {renderFailedItemsSection(8)}
        </div>
    );
};
