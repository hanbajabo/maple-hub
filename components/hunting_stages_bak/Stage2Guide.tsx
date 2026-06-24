import React from 'react';

interface Stage2GuideProps {
    itemDrop: number;
}

export const Stage2Guide: React.FC<Stage2GuideProps> = ({ itemDrop }) => {
    return (
        <div className="space-y-3">
            <p className="text-slate-300 text-sm">
                메획 100%를 맞췄다면, 이제 <span className="text-indigo-400 font-bold">드롭률 100%</span>를 달성할 차례입니다. 가성비 좋은 부위부터 챙기세요!
            </p>

            <div className="bg-slate-950/50 p-3 rounded border border-slate-800 space-y-2">
                <h5 className="text-slate-200 text-sm font-bold">✅ 추천 세팅 가이드</h5>
                <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">👁️</span>
                        <div>
                            <span className="text-slate-300 font-bold">얼굴장식/눈장식: 드롭 20%</span>
                            <div className="text-xs text-slate-400">경매장에서 얼굴장식/눈장식 모두 <span className="text-indigo-400">드롭 20%</span> 1줄 달린 템을 저렴하게 구매하세요.</div>
                        </div>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">💠</span>
                        <div>
                            <span className="text-slate-300 font-bold">펜던트 2개: 각각 드롭 20%</span>
                            <div className="text-xs text-slate-400">
                                여유가 있다면 <span className="text-indigo-400">드메템(드롭+메획 각 20%)</span>으로 맞추는 것이 좋습니다.
                                <br />
                                <span className="text-purple-400">베어스 펜던트</span> (무한교환 추천)
                            </div>
                        </div>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">👂</span>
                        <div>
                            <span className="text-slate-300 font-bold">귀고리: 드메템으로 교체</span>
                            <div className="text-xs text-slate-400">
                                기존 메획 귀고리를 <span className="text-indigo-400">드롭 20% + 메획 20%</span> 귀고리로 교체하세요.
                                <br />
                                <span className="text-purple-400">하프이어링</span> (무한교환 추천)
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="bg-indigo-950/20 p-3 rounded border border-indigo-700/30 flex justify-between items-center">
                <span className="text-indigo-200 text-sm font-bold">현재 아이템 드롭 합계</span>
                <span className={`text-xl font-bold font-mono ${itemDrop >= 100 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {itemDrop}% <span className="text-xs text-slate-400 font-normal">/ 100%</span>
                </span>
            </div>
        </div>
    );
};
