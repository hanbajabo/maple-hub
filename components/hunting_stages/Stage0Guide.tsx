import React, { useState } from 'react';

interface Stage0GuideProps {
    abilityDrop: number;
    isCurrentStage: boolean;
    onComplete: () => void;
}

export const Stage0Guide: React.FC<Stage0GuideProps> = ({ abilityDrop, isCurrentStage, onComplete }) => {
    // 사용자가 NO를 눌렀을 때 팁을 보여주기 위한 상태
    const [showTip, setShowTip] = useState(false);

    return (
        <div className="space-y-4">
            {/* 1. 왜 67%인가? */}
            <div className="bg-slate-950/50 p-3 rounded border border-slate-800">
                <p className="text-slate-300 text-sm mb-2 font-bold">⚠️ 왜 드롭률 67%를 맞춰야 하나요?</p>
                <p className="text-slate-400 text-xs leading-relaxed">
                    메이플스토리 시스템상 아이템 드롭률이 <span className="text-emerald-400 font-bold">67%</span>가 넘어야 몬스터가 메소를 <span className="text-yellow-400 font-bold">100% 확률</span>로 떨어뜨립니다.
                    <br />
                    이 조건을 달성하지 못하면 메소가 확률적으로만 드롭되어 사냥 수익이 크게 떨어집니다.
                </p>
            </div>

            {/* 2. 달성 방법 가이드 (이미지 내용 반영) */}
            <div className="bg-slate-900/50 p-4 rounded border border-slate-700">
                <h5 className="text-slate-200 text-sm font-bold mb-3">💡 장비 없이 67% 달성하는 공식</h5>

                <div className="space-y-2 text-sm">
                    {/* 기본 3종 세트 */}
                    <div className="grid grid-cols-3 gap-2 pb-2 border-b border-slate-700/50">
                        <div className="col-span-2 flex items-center gap-2">
                            <span className="text-blue-400">🗿 아티팩트</span>
                        </div>
                        <div className="text-right font-mono text-slate-300">12%</div>

                        <div className="col-span-2 flex items-center gap-2">
                            <span className="text-purple-400">🎯 어빌리티</span>
                            <span className={`text-[10px] ${abilityDrop >= 20 ? 'text-emerald-500' : 'text-red-500'}`}>
                                (현재: {abilityDrop}%)
                            </span>
                        </div>
                        <div className="text-right font-mono text-slate-300">20%</div>

                        <div className="col-span-2 flex items-center gap-2">
                            <span className="text-indigo-400">⚡ 쓸심 (쓸만한 홀리심볼)</span>
                        </div>
                        <div className="text-right font-mono text-slate-300">24%</div>
                    </div>

                    {/* 기본 합계 */}
                    <div className="grid grid-cols-3 gap-2 py-1">
                        <div className="col-span-2 text-slate-400 font-bold">기본 합계</div>
                        <div className="text-right font-mono text-slate-400">56%</div>
                    </div>

                    {/* 재획비 추가 */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700/50 items-center">
                        <div className="col-span-2 flex items-center gap-2">
                            <span className="text-yellow-400">🧪 재물획득 비약 (필수)</span>
                        </div>
                        <div className="text-right font-mono text-yellow-400">+20%</div>
                    </div>

                    {/* 최종 합계 */}
                    <div className="grid grid-cols-3 gap-2 mt-2 bg-emerald-950/30 p-2 rounded border border-emerald-500/30">
                        <div className="col-span-2 text-emerald-300 font-bold">총 드롭률 합계</div>
                        <div className="text-right font-mono text-emerald-300 font-bold text-lg">76%</div>
                    </div>
                </div>

                <p className="text-xs text-slate-500 mt-2 text-center">
                    * 76%를 달성하면 67% 조건을 여유롭게 만족합니다.
                </p>
            </div>

            {/* 3. 확인 질문 (항상 표시) */}
            {isCurrentStage && (
                <div className="pt-4 border-t border-slate-700">
                    <div className="text-center mb-4">
                        <p className="text-slate-200 font-bold text-lg mb-1">
                            아이템 드롭률 67% 이상을 확보하셨습니까?
                        </p>
                        <p className="text-slate-400 text-xs">
                            위의 방법들을 통해 67%를 넘겼다면 다음 단계로 진행하세요.
                        </p>
                    </div>

                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={onComplete}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 sm:px-8 rounded-lg shadow-lg transition-all hover:scale-105 flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                        >
                            <span>⭕ YES</span>
                            <span className="text-[10px] sm:text-xs font-normal opacity-80">(다음 단계)</span>
                        </button>
                        <button
                            onClick={() => setShowTip(true)}
                            className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-3 px-8 rounded-lg shadow transition-colors"
                        >
                            ❌ NO
                        </button>
                    </div>

                    {/* NO 클릭 시 팁 표시 */}
                    {showTip && (
                        <div className="mt-4 bg-red-950/20 p-4 rounded border border-red-700/30 text-center animate-fade-in">
                            <p className="text-red-300 text-sm font-bold mb-2">
                                67% 달성은 필수입니다!
                            </p>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                장비를 맞추기 전에 <span className="text-yellow-400">재물획득 비약</span>을 마시고,
                                <br />
                                <span className="text-purple-400">어빌리티</span>와 <span className="text-indigo-400">쓸만한 홀리심볼</span>, <span className="text-blue-400">아티팩트</span>를 점검해보세요.
                                <br />
                                이 기초가 없으면 장비를 맞춰도 효율이 나지 않습니다.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
