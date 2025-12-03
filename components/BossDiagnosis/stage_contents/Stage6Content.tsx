import React from 'react';

interface Stage6ContentProps {
    stage6Stats?: {
        armor: {
            starforce: { current: number; total: number; failedItems: string[] };
            scroll: { current: number; total: number; failedItems: string[] };
            flame: { current: number; total: number; failedItems: string[] };
            potential: { current: number; total: number; failedItems: string[] };
            additional: { current: number; total: number; failedItems: string[] };
        };
        accessory: {
            starforce: { current: number; total: number; failedItems: string[] };
            scroll: { current: number; total: number; failedItems: string[] };
            flame: { current: number; total: number; failedItems: string[] };
            potential: { current: number; total: number; failedItems: string[] };
            additional: { current: number; total: number; failedItems: string[] };
        };
    };
    renderPassedItemsSection: (stageId: number) => React.ReactNode;
    renderFailedItemsSection: (stageId: number) => React.ReactNode;
}

export const Stage6Content: React.FC<Stage6ContentProps> = ({ stage6Stats, renderPassedItemsSection, renderFailedItemsSection }) => {
    // 5단계 통계 렌더링 헬퍼 (재사용)
    const renderStatItem = (label: string, stat: { current: number; total: number; failedItems: string[] } | undefined, description: React.ReactNode) => {
        if (!stat || stat.total === 0) return null;
        const isAllPassed = stat.current >= stat.total;
        return (
            <li className={`flex flex-col items-start gap-1 ${isAllPassed ? 'text-green-300 font-bold' : ''}`}>
                <div className="flex items-center gap-2">
                    <span>{isAllPassed ? '✅' : '•'}</span>
                    <span>
                        {label}: <strong className="text-white">{description}</strong>
                        <span className={`ml-1 text-xs ${isAllPassed ? 'text-green-400' : 'text-red-400'}`}>
                            ({stat.current}/{stat.total})
                        </span>
                    </span>
                </div>
                {!isAllPassed && stat.failedItems && stat.failedItems.length > 0 && (
                    <div className="pl-6 text-xs text-red-300/80">
                        └ 미달: {stat.failedItems.join(', ')}
                    </div>
                )}
            </li>
        );
    };

    if (!stage6Stats) return null;

    return (
        <div className="space-y-3 text-sm">
            <div className="bg-gradient-to-r from-yellow-950/30 to-orange-950/30 p-4 rounded-lg border border-yellow-900/50">
                <h4 className="text-yellow-400 font-bold mb-3 flex items-center gap-2 text-lg">
                    <span>💎</span> 7단계: 최종 완성 (18성 달성)
                </h4>
                <p className="text-slate-300 mb-3 leading-relaxed">
                    전체적인 방어구+장신구의 스타포스를 모두 18성으로 올려 스펙업을 진행하세요!
                </p>

                <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                    <h5 className="text-yellow-300 font-bold mb-2 flex items-center gap-1">
                        <span>⭐</span> 스타포스 18성 체크
                    </h5>
                    <ul className="space-y-2 text-slate-300 pl-1">
                        {renderStatItem("방어구", stage6Stats.armor.starforce, "18성 이상 (에테르넬 12성, 타일런트 10성)")}
                        {renderStatItem("장신구", stage6Stats.accessory.starforce, "18성 이상 (이벤트링 제외)")}
                    </ul>
                </div>
            </div>
            {renderPassedItemsSection(6)}
            {renderFailedItemsSection(6)}
        </div>
    );
};
