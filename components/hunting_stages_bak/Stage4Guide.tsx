import React from 'react';

interface Stage4GuideProps {
    itemDrop: number;
    hasSpiritPendant: boolean;
}

export const Stage4Guide: React.FC<Stage4GuideProps> = ({ itemDrop, hasSpiritPendant }) => {
    return (
        <div className="space-y-3">
            <p className="text-slate-300 text-sm">
                경험치보다 <span className="text-indigo-400 font-bold">드롭률</span>이 우선이라면, 정펜을 빼고 모든 부위를 드롭 세팅으로 맞춰 180%를 달성하세요.
            </p>

            <div className="bg-slate-950/50 p-3 rounded border border-slate-800 space-y-2">
                <h5 className="text-slate-200 text-sm font-bold">✅ 드롭 180% +메획 100% 세팅 가이드</h5>
                <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">💍</span>
                        <div>
                            <span className="text-slate-300 font-bold">반지 4개: 각 드롭 20%</span>
                            <div className="text-xs text-slate-400">이벤트 링, 마이스터 링 등에 드롭 잠재를 띄우세요.</div>
                        </div>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">👁️👂📿</span>
                        <div>
                            <span className="text-slate-300 font-bold">얼장/눈장/귀고리: 각 드메템 (드롭 20% + 메획 20%)</span>
                            <div className="text-xs text-slate-400">가성비 좋은 부위이므로 우선적으로 확보하세요.</div>
                        </div>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">💠</span>
                        <div>
                            <span className="text-slate-300 font-bold">펜던트 2개: 각 드메템(드롭+메획 각 20%)</span>
                            <div className="text-xs text-slate-400">정펜 대신 혼테일의 목걸이 등 <span className="text-indigo-400">드메템(드롭+메획 각 20%)</span>을 착용하세요.</div>
                        </div>
                    </li>
                </ul>
            </div>

            {hasSpiritPendant && (
                <div className="bg-indigo-900/20 p-2 rounded border border-indigo-500/30 text-xs text-indigo-200">
                    💡 참고: 정령의 펜던트를 착용 중이라면 최대 160%가 한계일 수 있습니다. 180%를 위해서는 정펜을 빼거나 쌍드(40%) 부위가 필요합니다.
                </div>
            )}

            <div className="bg-indigo-950/20 p-3 rounded border border-indigo-700/30 flex justify-between items-center">
                <span className="text-indigo-200 text-sm font-bold">현재 아이템 드롭 합계</span>
                <span className={`text-xl font-bold font-mono ${itemDrop >= 180 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {itemDrop}% <span className="text-xs text-slate-400 font-normal">/ 180%</span>
                </span>
            </div>
        </div>
    );
};
