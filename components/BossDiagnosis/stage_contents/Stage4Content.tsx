import React from 'react';

interface Stage4ContentProps {
    stage4Stats?: {
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

export const Stage4Content: React.FC<Stage4ContentProps> = ({ stage4Stats, renderPassedItemsSection, renderFailedItemsSection }) => {
    // 5단계 통계 렌더링 헬퍼
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

    if (!stage4Stats) return null;

    return (
        <div className="space-y-3 text-sm">
            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2 text-lg">
                    <span>🛡️</span> 방어구 진단 기준 (모자, 상/하의, 장갑, 신발, 망토)
                </h4>
                <ul className="space-y-1 text-slate-300 pl-1">
                    <li className={`flex flex-col items-start gap-1 ${stage4Stats.armor.starforce.current >= stage4Stats.armor.starforce.total ? 'text-green-300 font-bold' : ''}`}>
                        {renderStatItem("스타포스", stage4Stats.armor.starforce, "17성 이상 (타일런트 5성)")}
                        <div className="pl-6 text-xs text-slate-400/80 mb-0.5">
                            * 에테르넬: 12성 ≈ 18성 카루타
                        </div>
                        {stage4Stats.armor.starforce.failedItems.length > 0 && (
                            <div className="pl-6 text-xs text-red-300/80">
                                └ 미달: {stage4Stats.armor.starforce.failedItems.join(', ')}
                            </div>
                        )}
                    </li>
                    <li className={`flex flex-col items-start gap-1 ${stage4Stats.armor.scroll.current >= stage4Stats.armor.scroll.total ? 'text-green-300 font-bold' : ''}`}>
                        <div className="flex items-center gap-2">
                            <span>{stage4Stats.armor.scroll.current >= stage4Stats.armor.scroll.total ? '✅' : '•'}</span>
                            <span>
                                주문서 작: <strong className="text-white">방어구 56급(모자 84급) / 장신구 30급 이상</strong>
                                <span className={`ml-1 text-xs ${stage4Stats.armor.scroll.current >= stage4Stats.armor.scroll.total ? 'text-green-400' : 'text-red-400'}`}>
                                    ({stage4Stats.armor.scroll.current}/{stage4Stats.armor.scroll.total})
                                </span>
                            </span>
                        </div>
                        <div className="pl-6 text-xs text-slate-400/80 mb-0.5">
                            * 방어구: 30%작 or 놀긍혼 50급↑ / 장신구: 놀긍혼 or 프악공 추천
                        </div>
                        {stage4Stats.armor.scroll.failedItems.length > 0 && (
                            <div className="pl-6 text-xs text-red-300/80">
                                └ 미달: {stage4Stats.armor.scroll.failedItems.join(', ')}
                            </div>
                        )}
                    </li>
                    <li className={`flex flex-col items-start gap-1 ${stage4Stats.armor.flame.current >= stage4Stats.armor.flame.total ? 'text-green-300 font-bold' : ''}`}>
                        <div className="flex items-center gap-2">
                            <span>{stage4Stats.armor.flame.current >= stage4Stats.armor.flame.total ? '✅' : '•'}</span>
                            <span>
                                추가 옵션: <strong className="text-white">100급 이상</strong>
                                <span className={`ml-1 text-xs ${stage4Stats.armor.flame.current >= stage4Stats.armor.flame.total ? 'text-green-400' : 'text-red-400'}`}>
                                    ({stage4Stats.armor.flame.current}/{stage4Stats.armor.flame.total})
                                </span>
                            </span>
                        </div >
                        <div className="pl-6 text-xs text-slate-400/80 mb-0.5">
                            * 급 계산식: 각 직업에 맞는 주스텟 + (공/마 × 4) + (올스텟% × 10)
                        </div>
                        {
                            stage4Stats.armor.flame.failedItems.length > 0 && (
                                <div className="pl-6 text-xs text-red-300/80">
                                    └ 미달: {stage4Stats.armor.flame.failedItems.join(', ')}
                                </div>
                            )
                        }
                    </li >
                    <li className={`flex flex-col items-start gap-1 ${stage4Stats.armor.potential.current >= stage4Stats.armor.potential.total ? 'text-green-300 font-bold' : ''}`}>
                        <div className="flex items-center gap-2">
                            <span>{stage4Stats.armor.potential.current >= stage4Stats.armor.potential.total ? '✅' : '•'}</span>
                            <span>
                                잠재능력: <strong className="text-white">주스탯 15% 이상 (유니크 권장)</strong>
                                <span className={`ml-1 text-xs ${stage4Stats.armor.potential.current >= stage4Stats.armor.potential.total ? 'text-green-400' : 'text-red-400'} `}>
                                    ({stage4Stats.armor.potential.current}/{stage4Stats.armor.potential.total})
                                </span>
                            </span>
                        </div>
                        <div className="pl-6 text-xs text-slate-400/80 mb-0.5">
                            * 장갑은 크리티컬 데미지 %가 최고의 옵션
                        </div>
                        {stage4Stats.armor.potential.failedItems.length > 0 && (
                            <div className="pl-6 text-xs text-red-300/80">
                                └ 미달: {stage4Stats.armor.potential.failedItems.join(', ')}
                            </div>
                        )}
                    </li>
                    {renderStatItem("에디셔널", stage4Stats.armor.additional, "레어 공/마+10 (에픽 이상은 탯% or 공/마+10)")}
                </ul>
            </div>

            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                <h4 className="text-pink-400 font-bold mb-2 flex items-center gap-2 text-lg">
                    <span>💍</span> 장신구 진단 기준 (반지, 펜던트, 얼장, 눈장, 귀고리, 벨트)
                </h4>
                <ul className="space-y-1 text-slate-300 pl-1">
                    {renderStatItem("스타포스", stage4Stats.accessory.starforce, "17성 이상 (타일런트는 5성 이상)")}
                    <li className={`flex flex-col items-start gap-1 ${stage4Stats.accessory.scroll.current >= stage4Stats.accessory.scroll.total ? 'text-green-300 font-bold' : ''} `}>
                        <div className="flex items-center gap-2">
                            <span>{stage4Stats.accessory.scroll.current >= stage4Stats.accessory.scroll.total ? '✅' : '•'}</span>
                            <span>
                                주문서 작: <strong className="text-white">놀긍혼(떡작) 주스텟 32급 이상</strong>
                                <span className={`ml-1 text-xs ${stage4Stats.accessory.scroll.current >= stage4Stats.accessory.scroll.total ? 'text-green-400' : 'text-red-400'} `}>
                                    ({stage4Stats.accessory.scroll.current}/{stage4Stats.accessory.scroll.total})
                                </span>
                            </span>
                        </div>
                        <div className="pl-6 text-xs text-slate-400/80 mb-0.5">
                            * 이벤트 코인샵에 프리미엄 악세서리 주문서(프악공) 있으면 프악공 바르기
                        </div>
                        {stage4Stats.accessory.scroll.failedItems.length > 0 && (
                            <div className="pl-6 text-xs text-red-300/80">
                                └ 미달: {stage4Stats.accessory.scroll.failedItems.join(', ')}
                            </div>
                        )}
                    </li>
                    <li className={`flex flex-col items-start gap-1 ${stage4Stats.accessory.flame.current >= stage4Stats.accessory.flame.total ? 'text-green-300 font-bold' : ''} `}>
                        <div className="flex items-center gap-2">
                            <span>{stage4Stats.accessory.flame.current >= stage4Stats.accessory.flame.total ? '✅' : '•'}</span>
                            <span>
                                추가 옵션: <strong className="text-white">100급 이상 (반지/숄더 제외)</strong>
                                <span className={`ml-1 text-xs ${stage4Stats.accessory.flame.current >= stage4Stats.accessory.flame.total ? 'text-green-400' : 'text-red-400'} `}>
                                    ({stage4Stats.accessory.flame.current}/{stage4Stats.accessory.flame.total})
                                </span>
                            </span>
                        </div>
                        <div className="pl-6 text-xs text-slate-400/80 mb-0.5">
                            * 급 계산식: 각 직업에 맞는 주스텟 + (공/마 × 4) + (올스텟% × 10)
                        </div>
                        {stage4Stats.accessory.flame.failedItems.length > 0 && (
                            <div className="pl-6 text-xs text-red-300/80">
                                └ 미달: {stage4Stats.accessory.flame.failedItems.join(', ')}
                            </div>
                        )}
                    </li>
                    {renderStatItem("잠재능력", stage4Stats.accessory.potential, "주스탯 15%~21% 이상 (유니크 권장)")}
                    {renderStatItem("에디셔널", stage4Stats.accessory.additional, "레어 공/마+10 (에픽 이상은 탯% or 공/마+10)")}
                </ul>
            </div>
            {renderPassedItemsSection(4)}
            {renderFailedItemsSection(4)}
        </div>
    );
};
