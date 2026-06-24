import React from 'react';

interface Stage5GuideProps {
    itemDrop: number;
}

export const Stage5Guide: React.FC<Stage5GuideProps> = ({ itemDrop }) => {
    return (
        <div className="space-y-3">
            <p className="text-slate-300 text-sm">
                사냥 세팅의 최종 목표인 <span className="text-indigo-400 font-bold">드롭 200%</span>를 위해 쌍드롭(드롭 40%) 아이템을 확보하세요.
            </p>

            <div className="bg-slate-950/50 p-3 rounded border border-slate-800 space-y-2">
                <h5 className="text-slate-200 text-sm font-bold">🏆 엔드 세팅 가이드</h5>
                <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">👂</span>
                        <div>
                            <span className="text-slate-300 font-bold">귀고리: 하프이어링 쌍드롭</span>
                            <div className="text-xs text-slate-400">
                                <span className="text-purple-400">레전드리 잠재능력 2줄</span>에 <span className="text-indigo-400">드롭 40%</span>를 띄운 쌍드템입니다.
                                경매장 가격이 높지만 드롭 200% 달성을 위한 핵심 아이템입니다.
                            </div>
                        </div>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">💍</span>
                        <div>
                            <span className="text-slate-300 font-bold">반지: 마이스터링or이벤트링</span>
                            <div className="text-xs text-slate-400">반지에 <span className="text-indigo-400">드메템(드롭+메획)</span>을 띄워 최종 세팅을 완성하세요.</div>
                        </div>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">💠</span>
                        <div>
                            <span className="text-slate-300 font-bold">펜던트: 베어스 펜던트 /혼테일 목걸이 등</span>
                            <div className="text-xs text-slate-400">펜던트에 드메템을 맞춰 메획도 함께 챙기세요.</div>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="bg-amber-950/20 p-2 rounded border border-amber-700/30 text-xs text-amber-200">
                💰 예산: 쌍드롭 아이템은 드메템보다 비쌉니다. 여유가 없다면 드롭율 180% 세팅도 충분히 훌륭합니다!
            </div>

            <div className="bg-blue-950/20 p-2 rounded border border-blue-700/30 text-xs text-blue-200">
                💰 이벤트 반지에서 운좋게 쌍드롭/쌍메획/드메템이 나왔다면 킵해서 사냥용 세팅으로 이용하세요!
            </div>

            <div className="bg-indigo-950/20 p-3 rounded border border-indigo-700/30 flex justify-between items-center">
                <span className="text-indigo-200 text-sm font-bold">현재 아이템 드롭 합계</span>
                <span className={`text-xl font-bold font-mono ${itemDrop >= 200 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {itemDrop}% <span className="text-xs text-slate-400 font-normal">/ 200%</span>
                </span>
            </div>
        </div>
    );
};
