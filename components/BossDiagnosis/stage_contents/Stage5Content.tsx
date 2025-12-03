import React from 'react';

interface Stage5ContentProps {
    stage5Stats?: {
        hat: string;
        ring: string;
        cooldownSeconds: number;
        hasRestraint: boolean;
        hasContinuous: boolean;
        hatNote?: string;
        ringNote?: string;
        recommendedHatType?: string;
        recommendedRingType?: string;
    };
    isPassed: boolean;
    onPass?: () => void;
}

export const Stage5Content: React.FC<Stage5ContentProps> = ({ stage5Stats, isPassed, onPass }) => {
    if (!stage5Stats) return null;

    return (
        <div className="space-y-4 text-sm">
            <div className="bg-gradient-to-r from-indigo-950/30 to-blue-950/30 p-4 rounded-lg border border-indigo-900/50">
                <h4 className="text-indigo-400 font-bold mb-3 flex items-center gap-2 text-lg">
                    <span>⚡</span> 6단계: 특수 스펙 최적화
                </h4>
                <p className="text-slate-300 mb-3 leading-relaxed">
                    직업별 필수 쿨타임 감소 모자와 시드링을 점검하여 최적의 효율을 달성하세요.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                        <h5 className="text-indigo-300 font-bold mb-2 flex items-center gap-1">
                            <span>🎩</span> 쿨타임 감소 모자
                        </h5>
                        <p className="text-xs text-slate-400 mb-3 bg-slate-900/50 p-2 rounded leading-relaxed">
                            💡 <strong>왜 필요한가요?</strong><br />
                            쿨타임 감소 효율이 좋은 직업은 쿨타임 감소 모자 사용을 권장합니다.
                        </p>
                        <div className="mb-3 p-2 bg-slate-900/80 rounded border border-indigo-900/30">
                            <span className="text-slate-400 text-xs block mb-1">📢 이 직업의 추천 세팅:</span>
                            <strong className="text-indigo-300 text-sm block">
                                {stage5Stats.recommendedHatType?.startsWith('cool_')
                                    ? '🕒 쿨타임 감소 모자 (-2초 이상)'
                                    : '📊 주스탯 % 모자 (쿨감 불필요)'}
                            </strong>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={stage5Stats.hat === 'pass' ? 'text-green-400' : stage5Stats.hat === 'fail' ? 'text-red-400' : 'text-slate-400'}>
                                {stage5Stats.hat === 'pass' ? '✅' : stage5Stats.hat === 'fail' ? '❌' : '•'}
                            </span>
                            <span className="text-slate-300">
                                상태: <strong className="text-white">
                                    {stage5Stats.hat === 'pass' ? '적합' : stage5Stats.hat === 'fail' ? '부적합' : '해당 없음'}
                                </strong>
                            </span>
                        </div>
                        {stage5Stats.cooldownSeconds > 0 && (
                            <p className="text-xs text-slate-400 pl-6 mb-1">
                                현재 쿨감: -{stage5Stats.cooldownSeconds}초
                            </p>
                        )}
                        {stage5Stats.hatNote && (
                            <div className="mt-2 pl-2 border-l-2 border-indigo-500/30">
                                <p className="text-xs text-indigo-200">
                                    📌 <strong>직업 추천 사유:</strong><br />
                                    {stage5Stats.hatNote}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                        <h5 className="text-indigo-300 font-bold mb-2 flex items-center gap-1">
                            <span>💍</span> 시드링 (특수 반지)
                        </h5>
                        <p className="text-xs text-slate-400 mb-3 bg-slate-900/50 p-2 rounded leading-relaxed">
                            💡 <strong>왜 필요한가요?</strong><br />
                            시드링은 짧은 시간 동안 강력한 스탯 공격력/보스 공격력 버프를 제공하여, 극딜 타임에 폭발적인 데미지를 넣을 수 있게 해주는 필수 아이템입니다.
                        </p>
                        <div className="mb-3 p-2 bg-slate-900/80 rounded border border-indigo-900/30">
                            <span className="text-slate-400 text-xs block mb-1">📢 이 직업의 추천 세팅:</span>
                            <strong className="text-indigo-300 text-sm block">
                                {stage5Stats.recommendedRingType === 'restraint' ? '💥 리스트레인트 링 (극딜형)' :
                                    stage5Stats.recommendedRingType === 'continuous' ? '🔄 컨티뉴어스 링 (지속딜형)' :
                                        '🔀 스위칭 (리레 + 컨티) 권장'}
                            </strong>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={stage5Stats.ring === 'pass' ? 'text-green-400' : stage5Stats.ring === 'fail' ? 'text-red-400' : 'text-slate-400'}>
                                {stage5Stats.ring === 'pass' ? '✅' : stage5Stats.ring === 'fail' ? '❌' : '•'}
                            </span>
                            <span className="text-slate-300">
                                상태: <strong className="text-white">
                                    {stage5Stats.ring === 'pass' ? '적합' : stage5Stats.ring === 'fail' ? '부적합' : '해당 없음'}
                                </strong>
                            </span>
                        </div>
                        <div className="text-xs text-slate-400 pl-6 space-y-0.5 mb-2">
                            <p>리레링: {stage5Stats.hasRestraint ? '보유 ✅' : '미보유'}</p>
                            <p>컨티링: {stage5Stats.hasContinuous ? '보유 ✅' : '미보유'}</p>
                        </div>
                        <p className="text-xs text-yellow-500/80 pl-6 mb-2">
                            ⚠️ <strong>최소 3레벨 이상 권장</strong>
                        </p>
                        {stage5Stats.ringNote && (
                            <div className="mt-2 pl-2 border-l-2 border-indigo-500/30">
                                <p className="text-xs text-indigo-200">
                                    📌 <strong>직업 추천 사유:</strong><br />
                                    {stage5Stats.ringNote}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {!isPassed && (
                <div className="mt-4 p-3 bg-slate-900/80 rounded border border-slate-700 text-center">
                    <p className="text-slate-300 mb-3 font-bold">
                        특수 스펙 최적화를 진행하셨다면 다음 단계로 이동하시겠습니까?
                    </p>
                    <div className="flex justify-center gap-3">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onPass && onPass();
                            }}
                            className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded transition-colors flex items-center gap-2"
                        >
                            <span>⭕</span> YES (다음 단계로)
                        </button>
                        <button
                            type="button"
                            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold rounded transition-colors flex items-center gap-2"
                        >
                            <span>❌</span> NO
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
