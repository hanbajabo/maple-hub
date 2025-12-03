import React from 'react';

interface Stage0ContentProps {
    renderPassedItemsSection: (stageId: number) => React.ReactNode;
    renderFailedItemsSection: (stageId: number) => React.ReactNode;
    attTypeKor?: string;
}

export const Stage0Content: React.FC<Stage0ContentProps> = ({ renderPassedItemsSection, renderFailedItemsSection, attTypeKor }) => {
    return (
        <div className="space-y-3 text-sm">
            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2 text-lg">
                    <span>⭐</span> 스타포스 기준
                </h4>
                <ul className="space-y-1 text-slate-300">
                    <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>모든 장비 (반지 제외): <strong className="text-white">12성 (눈/얼굴 8성) 이상</strong></span>
                    </li>
                </ul>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2 text-lg">
                    <span>🔮</span> 잠재능력 기준
                </h4>
                <div className="space-y-2">
                    <div className="bg-slate-900/50 p-2 rounded border border-slate-700/50">
                        <p className="text-slate-400 mb-1 font-bold">무기/보조/엠블렘</p>
                        <ul className="space-y-1 text-slate-300 pl-1">
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span>등급: <strong className="text-white">에픽 이상</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span>옵션: <strong className="text-white">{attTypeKor}% 1줄 이상 (유니크 이상: 보공/방무% 포함)</strong></span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-slate-900/50 p-2 rounded border border-slate-700/50">
                        <p className="text-slate-400 mb-1 font-bold">방어구/장신구</p>
                        <ul className="space-y-1 text-slate-300 pl-1">
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span>등급: <strong className="text-white">에픽 이상</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span>옵션: <strong className="text-white">주스탯% 1줄 이상</strong></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-2 text-lg">
                    <span>💎</span> 에디셔널 기준
                </h4>
                <ul className="space-y-1 text-slate-300">
                    <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>모든 장비 등급: <strong className="text-white">레어 이상</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>모든 장비 옵션: <strong className="text-white">{attTypeKor} +10 이상</strong></span>
                    </li>
                </ul>
            </div>
            {renderPassedItemsSection(0)}
            {renderFailedItemsSection(0)}
        </div>
    );
};
