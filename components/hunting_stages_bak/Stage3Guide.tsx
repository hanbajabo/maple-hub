import React from 'react';

interface Stage3GuideProps {
    itemDrop: number;
    hasSpiritPendant: boolean;
}

export const Stage3Guide: React.FC<Stage3GuideProps> = ({ itemDrop, hasSpiritPendant }) => {
    return (
        <div className="space-y-3">
            <p className="text-slate-300 text-sm">
                경험치 획득을 위해 <span className="text-emerald-400 font-bold">정령의 펜던트</span>를 착용하면서 드롭 160%를 목표로 합니다.
            </p>

            <div className="bg-slate-950/50 p-3 rounded border border-slate-800 space-y-2">
                <h5 className="text-slate-200 text-sm font-bold">✅ 추천 세팅 가이드</h5>
                <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">💠</span>
                        <div>
                            <span className="text-slate-300 font-bold">펜던트2: 정령의 펜던트</span>
                            <div className="text-xs text-slate-400">경험치 획득량 30%를 제공하므로 사냥 시 필수 아이템입니다. 드롭 세팅은 불가능하지만 경험치를 위해 착용합니다.</div>
                        </div>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">👁️📿</span>
                        <div>
                            <span className="text-slate-300 font-bold">얼굴장식/눈장식/펜던트1: 드메템 확보하기</span>
                            <div className="text-xs text-slate-400">
                                각 부위를 <span className="text-indigo-400">드롭 20% + 메획 20%</span> 잠재로 맞추세요.
                                <br />
                                <span className="text-purple-400">눈장식 미카엘라 새 안경</span> 추천
                            </div>
                        </div>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-0.5">💍</span>
                        <div>
                            <span className="text-slate-300 font-bold">반지 4개: 드롭 20% 위주</span>
                            <div className="text-xs text-slate-400">이벤트 링이나 마이스터링에 <span className="text-indigo-400">드롭 20%</span>를 띄우세요. 여유가 있다면 드메로 맞추는 것도 좋습니다.</div>
                        </div>
                    </li>
                </ul>
            </div>

            {!hasSpiritPendant && (
                <div className="bg-yellow-900/20 p-2 rounded border border-yellow-700/30 text-xs text-yellow-200">
                    💡 팁: 현재 정령의 펜던트를 착용하지 않았습니다. 사냥 시 경험치를 위해 착용을 권장합니다.
                </div>
            )}

            <div className="bg-indigo-950/20 p-3 rounded border border-indigo-700/30 flex justify-between items-center">
                <span className="text-indigo-200 text-sm font-bold">현재 아이템 드롭 합계</span>
                <span className={`text-xl font-bold font-mono ${itemDrop >= 160 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {itemDrop}% <span className="text-xs text-slate-400 font-normal">/ 160%</span>
                </span>
            </div>
        </div>
    );
};
