import React from 'react';

interface Stage9ContentProps {
    stage9Stats?: {
        total: number;
        passed: number;
        failedItems: string[];
        dawnSetCount: number;
        pitchedSetCount: number;
        brilliantSetCount: number;
        hasDawn2: boolean;
        hasPitched4: boolean;
    };
    renderPassedItemsSection: (stageId: number) => React.ReactNode;
    renderFailedItemsSection: (stageId: number) => React.ReactNode;
}

export const Stage9Content: React.FC<Stage9ContentProps> = ({ stage9Stats, renderPassedItemsSection, renderFailedItemsSection }) => {
    if (!stage9Stats) return null;

    return (
        <div className="space-y-3 text-sm">
            <div className="bg-gradient-to-r from-indigo-950/30 to-purple-950/30 p-4 rounded-lg border border-indigo-900/50">
                <h4 className="text-indigo-400 font-bold mb-3 flex items-center gap-2 text-lg">
                    <span>💎</span> 10단계: 22성급 장신구 셋팅
                </h4>
                <p className="text-slate-300 mb-3 leading-relaxed">
                    방어구까지 22성 셋팅을 완료했다면 이제 장신구에서 22성까지 맞추면 <strong className="text-yellow-400">환산주스텟 8만 이상</strong>의 셋팅이 완료됩니다!
                </p>

                <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 mb-3">
                    <h5 className="text-indigo-300 font-bold mb-2 flex items-center gap-1">
                        <span>📋</span> 장신구 세트 옵션 추천
                    </h5>
                    <ul className="space-y-2 text-slate-300 pl-1">
                        <li className="flex items-start gap-2">
                            <span className={stage9Stats.hasDawn2 ? 'text-green-400' : 'text-yellow-400'}>
                                {stage9Stats.hasDawn2 ? '✅' : '💡'}
                            </span>
                            <div>
                                <strong className="text-white">2여명 세트</strong> 권장
                                <span className={stage9Stats.hasDawn2 ? 'text-green-400 ml-2' : 'text-slate-400 ml-2'}>
                                    (현재 {stage9Stats.dawnSetCount}개)
                                </span>
                            </div>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className={stage9Stats.hasPitched4 ? 'text-green-400' : 'text-yellow-400'}>
                                {stage9Stats.hasPitched4 ? '✅' : '💡'}
                            </span>
                            <div>
                                <strong className="text-white">4칠흑 이상 세트</strong> 권장
                                <span className={stage9Stats.hasPitched4 ? 'text-green-400 ml-2' : 'text-slate-400 ml-2'}>
                                    (현재 {stage9Stats.pitchedSetCount}개)
                                </span>
                            </div>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-400">🌟</span>
                            <div>
                                <strong className="text-purple-300">엔드급 세팅:</strong>
                                <span className="text-slate-300 ml-2">칠흑 세트 + 광휘 세트 조합</span>
                                {stage9Stats.brilliantSetCount > 0 && (
                                    <span className="text-purple-400 ml-2">(광휘 {stage9Stats.brilliantSetCount}개 착용 중)</span>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                    <h5 className="text-indigo-300 font-bold mb-2 flex items-center gap-1">
                        <span>⭐</span> 스타포스 요구사항
                    </h5>
                    <ul className="space-y-1 text-slate-300 pl-1">
                        <li className="flex items-center gap-2">
                            <span className="text-yellow-400">★</span>
                            <span><strong className="text-white">기계 심장</strong>: 20성 이상</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span><strong className="text-white">나머지 장신구</strong>: 22성 이상</span>
                        </li>
                        <li className="flex items-center gap-2 text-xs text-slate-400 pl-4">
                            <span>※ 눈장식, 얼굴장식, 귀고리, 펜던트, 반지, 벨트 등</span>
                        </li>
                        <li className="flex items-center gap-2 text-xs text-blue-400 pl-4 mt-2">
                            <span>💡</span>
                            <span><strong>타일런트/놀장강 아이템</strong>: 12성 이상</span>
                        </li>
                        <li className="flex items-center gap-2 text-xs text-purple-400 pl-4">
                            <span>👑</span>
                            <span><strong>특수링</strong> (리스트레인트, 웨폰퍼프 등): 조건 없음</span>
                        </li>
                    </ul>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                        <span className={stage9Stats.passed === stage9Stats.total ? 'text-green-400' : 'text-yellow-400'}>
                            {stage9Stats.passed === stage9Stats.total ? '✅' : '⚠️'}
                        </span>
                        <span className="text-slate-300">
                            달성 현황: <strong className="text-white">{stage9Stats.passed} / {stage9Stats.total} 장신구</strong>
                        </span>
                    </div>
                </div>
            </div>
            {renderPassedItemsSection(9)}
            {renderFailedItemsSection(9)}
        </div>
    );
};
