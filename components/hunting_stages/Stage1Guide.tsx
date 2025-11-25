import React from 'react';

interface Stage1GuideProps {
    itemMeso: number;
}

export const Stage1Guide: React.FC<Stage1GuideProps> = ({ itemMeso }) => {
    return (
        <div className="space-y-3">
            <p className="text-slate-300 text-sm">
                재획비를 먹으면 메소 확정 드롭은 이미 달성되므로, <span className="text-yellow-400 font-bold">메획(메소 획득량)</span>을 먼저 100%로 맞추는 것이 효율적입니다.
            </p>

            <div className="bg-slate-950/50 p-3 rounded border border-slate-800 space-y-2">
                <h5 className="text-slate-200 text-sm font-bold">✅ 추천 세팅 가이드</h5>
                <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">👂</span>
                        <div>
                            <span className="text-slate-300 font-bold">귀고리: 하프이어링</span>
                            <div className="text-xs text-slate-400">경매장에서 <span className="text-yellow-400">메획 20%</span> 잠재능력이 달린 것을 구매하세요.</div>
                        </div>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">💍</span>
                        <div>
                            <span className="text-slate-300 font-bold">반지 4개: 이벤트 링</span>
                            <div className="text-xs text-slate-400">이벤트 링 전용 레전드리 주문서로 각 <span className="text-yellow-400">메획 20%</span>를 띄우세요.</div>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="bg-yellow-950/20 p-3 rounded border border-yellow-700/30 flex justify-between items-center">
                <span className="text-yellow-200 text-sm font-bold">현재 아이템 메획 합계</span>
                <span className={`text-xl font-bold font-mono ${itemMeso >= 100 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {itemMeso}% <span className="text-xs text-slate-400 font-normal">/ 100%</span>
                </span>
            </div>
        </div>
    );
};
