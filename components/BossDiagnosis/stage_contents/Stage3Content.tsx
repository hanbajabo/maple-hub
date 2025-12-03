import React from 'react';

interface Stage3ContentProps {
    passedArmorOption?: string;
    isPassed: boolean;
    onPass?: () => void;
}

export const Stage3Content: React.FC<Stage3ContentProps> = ({ passedArmorOption, isPassed, onPass }) => {
    return (
        <div className="space-y-3 text-sm">
            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                <p className="text-slate-400 mb-3">
                    아이템 버닝 <strong className="text-white">'도전자'</strong> 기간제 방어구가 사라지면 캐릭터가 급격히 약해집니다. 사라질 8부위를 대체할 아이템을 미리 준비해야 합니다.
                </p>
                <div className="mb-3 p-2 bg-slate-900/80 rounded border border-slate-700 text-xs text-slate-300">
                    <p>🛡️ <strong>방어구 방향 결정 하기:</strong></p>
                    <p className="mt-1 text-slate-400">
                        앞에 숫자 <strong>3</strong>은 (모자/상의/하의), <strong>4</strong>는 (장갑/신발/망토/어깨장식)을 의미합니다.
                    </p>
                </div>

                {passedArmorOption && (
                    <div className="mb-3 p-2 bg-green-950/30 border border-green-900/50 rounded text-xs text-green-300">
                        ✅ 현재 적용: <strong>{passedArmorOption}</strong>
                    </div>
                )}

                <div className="space-y-3">
                    <div className="bg-slate-900/50 p-2 rounded border border-slate-700/50">
                        <h5 className="text-yellow-400 font-bold mb-1">1안 (*추천)</h5>
                        <p className="text-slate-300 mb-1">3루타비스 + 4아케인 + 1무기</p>
                        <p className="text-slate-500 text-xs">- 현재 아케인 노작 값이 싸고 고점이 높음</p>
                    </div>
                    <div className="bg-slate-900/50 p-2 rounded border border-slate-700/50">
                        <h5 className="text-slate-300 font-bold mb-1">2안 (*대안)</h5>
                        <p className="text-slate-300 mb-1">3루타비스 + 4앱솔랩스 + 1무기</p>
                        <p className="text-slate-500 text-xs">- 가성비, 토드하기 쉬움, 17성 강화하기 쉬움</p>
                    </div>
                    <div className="bg-slate-900/50 p-2 rounded border border-slate-700/50">
                        <h5 className="text-slate-300 font-bold mb-1">3안</h5>
                        <p className="text-slate-300 mb-1">3에테르넬 + 4아케인 + 1무기</p>
                        <p className="text-slate-500 text-xs">- 3에테르넬 장비가 비싸지만 고점이 높음</p>
                    </div>
                    <div className="bg-slate-900/50 p-2 rounded border border-slate-700/50">
                        <h5 className="text-slate-300 font-bold mb-1">4안</h5>
                        <p className="text-slate-300 mb-1">3에테르넬 + 4에테르넬 + 1무기</p>
                        <p className="text-slate-500 text-xs">- 고자본용 최고점 템셋팅</p>
                    </div>
                    <div className="bg-slate-900/50 p-2 rounded border border-slate-700/50">
                        <h5 className="text-slate-300 font-bold mb-1">5안</h5>
                        <p className="text-slate-300 mb-1">3에테르넬 + 4앱솔랩스 + 1무기</p>
                        <p className="text-slate-500 text-xs">- 에테르넬과 앱솔랩스 혼합 세팅</p>
                    </div>
                    <div className="bg-green-950/30 p-2 rounded border border-green-900/30">
                        <h5 className="text-green-400 font-bold mb-1">✅ 예외 조건</h5>
                        <p className="text-green-200 text-xs">
                            '도전자'가 들어간 아이템을 4개 이상 착용하고 있다면 통과
                        </p>
                    </div>

                    {!isPassed && (
                        <div className="mt-4 p-3 bg-slate-900/80 border border-slate-700 rounded text-center">
                            <p className="text-slate-300 text-sm mb-2">
                                아직 세트를 맞추는 중이거나, 메소가 부족하여 완성하지 못했다면<br />
                                일단 <strong>패스</strong>하고 다음 단계 진단을 확인하세요!
                            </p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (onPass) onPass();
                                }}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded transition-colors text-sm shadow-lg shadow-purple-900/20"
                            >
                                지금은 패스하고 다음 단계 보기 👉
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
