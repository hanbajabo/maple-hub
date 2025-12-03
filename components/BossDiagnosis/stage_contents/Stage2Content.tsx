import React from 'react';
import { EquipmentItem } from '../../../lib/diagnosis/types';

interface Stage2ContentProps {
    equipment?: EquipmentItem[];
    attTypeKor?: string;
    passedRings: EquipmentItem[];
}

export const Stage2Content: React.FC<Stage2ContentProps> = ({ equipment, attTypeKor, passedRings }) => {
    const [expandedItemSlot, setExpandedItemSlot] = React.useState<string | null>(null);

    const emblem = equipment?.find(i => i.item_equipment_slot === "엠블렘");
    const weapon = equipment?.find(i => i.item_equipment_slot === "무기");
    const secondary = equipment?.find(i => i.item_equipment_slot === "보조무기");

    return (
        <div className="space-y-3 text-sm">
            <div className="bg-gradient-to-br from-pink-950/30 to-purple-950/30 p-3 rounded-lg border border-pink-800/30">
                <h4 className="text-pink-400 font-bold mb-2 flex items-center gap-2 text-lg">
                    <span>🎯</span> 1순위: 엠블렘
                    {emblem && (
                        <img
                            src={emblem.item_icon}
                            alt="Emblem"
                            className="w-8 h-8 ml-2 cursor-pointer border border-pink-500/50 rounded bg-slate-900 hover:scale-110 transition-transform"
                            onClick={(e) => {
                                e.stopPropagation();
                                setExpandedItemSlot(expandedItemSlot === '엠블렘' ? null : '엠블렘');
                            }}
                            title="클릭하여 옵션 확인"
                        />
                    )}
                </h4>
                {expandedItemSlot === '엠블렘' && emblem && (
                    <div className="bg-slate-900/90 p-3 rounded border border-pink-500/50 mb-3 text-xs shadow-lg relative z-10">
                        <p className="text-yellow-400 font-bold text-sm mb-2 border-b border-slate-700 pb-1">{emblem.item_name}</p>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-slate-400 font-bold mb-1">잠재능력 ({emblem.potential_option_grade})</p>
                                <p className="text-white pl-1">- {emblem.potential_option_1}</p>
                                <p className="text-white pl-1">- {emblem.potential_option_2}</p>
                                <p className="text-white pl-1">- {emblem.potential_option_3}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 font-bold mb-1">에디셔널 ({emblem.additional_potential_option_grade})</p>
                                <p className="text-white pl-1">- {emblem.additional_potential_option_1}</p>
                                <p className="text-white pl-1">- {emblem.additional_potential_option_2}</p>
                                <p className="text-white pl-1">- {emblem.additional_potential_option_3}</p>
                            </div>
                        </div>
                    </div>
                )}
                {(() => {
                    if (!emblem) return null;

                    const grade = emblem.potential_option_grade;
                    const isBelowUnique = grade === '레어' || grade === '에픽' || !grade;

                    // 유니크지만 유효 옵션이 없는 경우 체크
                    let hasValidOption = false;
                    if (grade === '유니크') {
                        const lines = [emblem.potential_option_1, emblem.potential_option_2, emblem.potential_option_3];
                        hasValidOption = lines.some(l => l && (l.includes('공격력') || l.includes('마력')) && l.includes('%'));
                    }

                    if (isBelowUnique || (grade === '유니크' && !hasValidOption)) {
                        return (
                            <p className="text-xs text-pink-300 mb-2 bg-pink-950/50 p-1.5 rounded">
                                💡 <strong>진단:</strong> 유니크 잠재능력 주문서 등을 활용하여 유니크 옵션을 확보 한 후 이벤트 큐브를 활용하여 옵션 뽑기
                            </p>
                        );
                    }
                    return null;
                })()}
                <ul className="space-y-1 text-slate-300">
                    <li>• 잠재능력 : <strong className="text-white">유니크 이상</strong> / 옵션 : <strong className="text-white">{attTypeKor}% 9% 이상</strong></li>
                    <li>• 에디셔널 : <strong className="text-white">에픽 이상</strong> / 옵션 : <strong className="text-white">{attTypeKor}% 1줄 이상</strong></li>
                    <li className="text-xs text-slate-400 mt-1">* 무기/보조/엠블렘 합쳐서 방어율 무시%는 1줄 권장 (2줄 이상 시 변경 권장)</li>
                </ul>
            </div>
            <div className="bg-gradient-to-br from-red-950/30 to-orange-950/30 p-3 rounded-lg border border-red-800/30">
                <h4 className="text-orange-400 font-bold mb-2 flex items-center gap-2 text-lg">
                    <span>⚔️</span> 2순위: 무기
                    {weapon && (
                        <img
                            src={weapon.item_icon}
                            alt="Weapon"
                            className="w-8 h-8 ml-2 cursor-pointer border border-orange-500/50 rounded bg-slate-900 hover:scale-110 transition-transform"
                            onClick={(e) => {
                                e.stopPropagation();
                                setExpandedItemSlot(expandedItemSlot === '무기' ? null : '무기');
                            }}
                            title="클릭하여 옵션 확인"
                        />
                    )}
                </h4>
                {expandedItemSlot === '무기' && weapon && (
                    <div className="bg-slate-900/90 p-3 rounded border border-orange-500/50 mb-3 text-xs shadow-lg relative z-10">
                        <p className="text-yellow-400 font-bold text-sm mb-2 border-b border-slate-700 pb-1">{weapon.item_name}</p>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-slate-400 font-bold mb-1">잠재능력 ({weapon.potential_option_grade})</p>
                                <p className="text-white pl-1">- {weapon.potential_option_1}</p>
                                <p className="text-white pl-1">- {weapon.potential_option_2}</p>
                                <p className="text-white pl-1">- {weapon.potential_option_3}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 font-bold mb-1">에디셔널 ({weapon.additional_potential_option_grade})</p>
                                <p className="text-white pl-1">- {weapon.additional_potential_option_1}</p>
                                <p className="text-white pl-1">- {weapon.additional_potential_option_2}</p>
                                <p className="text-white pl-1">- {weapon.additional_potential_option_3}</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="text-xs text-orange-300 mb-2 bg-orange-950/50 p-1.5 rounded">
                    <p className="mb-1">💡 <strong>진단:</strong> 제네시스 무기 완전해방 전까지 사용 할 무기를 확보하기!</p>
                    <p>아이템버닝 도전자 무기가 없다면 아케인셰이드 17성 무기를 경매장에서 싸게 구매하는 것을 추천</p>
                </div>
                <ul className="space-y-1 text-slate-300">
                    <li>• <strong className="text-white">도전자 무기</strong> OR <strong className="text-white">아케인셰이드 무기 17성 이상</strong></li>
                    <li>• 잠재능력 : <strong className="text-white">레전드리 이상</strong> / 옵션 : <strong className="text-white">{attTypeKor}%/보공% 유효 2줄 이상</strong></li>
                    <li className="text-xs text-slate-400 pl-2">- 방어율 무시%는 1줄까지만 유효 옵션으로 인정</li>
                    <li>• 에디셔널 : <strong className="text-white">에픽 이상</strong> / 옵션 : <strong className="text-white">{attTypeKor}% 1줄 이상</strong></li>
                </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-950/30 to-cyan-950/30 p-3 rounded-lg border border-blue-800/30">
                <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-2 text-lg">
                    <span>🛡️</span> 3순위: 보조무기
                    {secondary && (
                        <img
                            src={secondary.item_icon}
                            alt="Secondary"
                            className="w-8 h-8 ml-2 cursor-pointer border border-cyan-500/50 rounded bg-slate-900 hover:scale-110 transition-transform"
                            onClick={(e) => { e.stopPropagation(); setExpandedItemSlot(expandedItemSlot === '보조무기' ? null : '보조무기'); }}
                            title="클릭하여 옵션 확인"
                        />
                    )}
                </h4>
                {expandedItemSlot === '보조무기' && secondary && (
                    <div className="bg-slate-900/90 p-3 rounded border border-cyan-500/50 mb-3 text-xs shadow-lg relative z-10">
                        <p className="text-yellow-400 font-bold text-sm mb-2 border-b border-slate-700 pb-1">{secondary.item_name}</p>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-slate-400 font-bold mb-1">잠재능력 ({secondary.potential_option_grade})</p>
                                <p className="text-white pl-1">- {secondary.potential_option_1}</p>
                                <p className="text-white pl-1">- {secondary.potential_option_2}</p>
                                <p className="text-white pl-1">- {secondary.potential_option_3}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 font-bold mb-1">에디셔널 ({secondary.additional_potential_option_grade})</p>
                                <p className="text-white pl-1">- {secondary.additional_potential_option_1}</p>
                                <p className="text-white pl-1">- {secondary.additional_potential_option_2}</p>
                                <p className="text-white pl-1">- {secondary.additional_potential_option_3}</p>
                            </div>
                        </div>
                    </div>
                )}
                <ul className="space-y-1 text-slate-300">
                    <li>• 경매장에서 <strong className="text-white">레전드리/에픽 이상</strong> 구매 권유 (무한교환)</li>
                    <li className="text-yellow-200">• 교환불가 보조무기에 카르마 유니크 잠재능력 주문서 사용하여 임시로 사용 가능</li>
                    <li>• 잠재능력 : <strong className="text-white">유니크 이상</strong> / 옵션 : <strong className="text-white">{attTypeKor}%/보공% 유효 2줄 이상</strong></li>
                    <li className="text-xs text-slate-400 pl-2">- 방어율 무시%는 1줄까지만 유효 옵션으로 인정</li>
                    <li>• 에디셔널 : <strong className="text-white">레어 이상</strong> / 옵션 : <strong className="text-white">{attTypeKor} +10 1줄 이상</strong></li>
                </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-950/30 to-indigo-950/30 p-3 rounded-lg border border-purple-800/30">
                <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2 text-lg">
                    <span>💍</span> 4순위: 이벤트 링 (3개 이상)
                    {passedRings.map((ring: EquipmentItem, idx: number) => (
                        <img
                            key={idx}
                            src={ring.item_icon}
                            alt={ring.item_name}
                            className="w-8 h-8 ml-2 cursor-pointer border border-purple-500/50 rounded bg-slate-900 hover:scale-110 transition-transform"
                            onClick={(e) => { e.stopPropagation(); setExpandedItemSlot(expandedItemSlot === ring.item_equipment_slot ? null : ring.item_equipment_slot); }}
                            title={`${ring.item_name}\n클릭하여 옵션 확인`}
                        />
                    ))}
                </h4>
                {passedRings.map((ring: EquipmentItem, idx: number) => (
                    expandedItemSlot === ring.item_equipment_slot && (
                        <div key={idx} className="bg-slate-900/90 p-3 rounded border border-purple-500/50 mb-3 text-xs shadow-lg relative z-10">
                            <p className="text-yellow-400 font-bold text-sm mb-2 border-b border-slate-700 pb-1">{ring.item_name}</p>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <p className="text-slate-400 font-bold mb-1">잠재능력 ({ring.potential_option_grade})</p>
                                    <p className="text-white pl-1">- {ring.potential_option_1}</p>
                                    <p className="text-white pl-1">- {ring.potential_option_2}</p>
                                    <p className="text-white pl-1">- {ring.potential_option_3}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 font-bold mb-1">에디셔널 ({ring.additional_potential_option_grade})</p>
                                    <p className="text-white pl-1">- {ring.additional_potential_option_1}</p>
                                    <p className="text-white pl-1">- {ring.additional_potential_option_2}</p>
                                    <p className="text-white pl-1">- {ring.additional_potential_option_3}</p>
                                </div>
                            </div>
                        </div>
                    )
                ))}
                <p className="text-xs text-purple-300 mb-2 bg-purple-950/50 p-1.5 rounded">
                    💡 <strong>진단:</strong> 이벤트 링 전용 레전드리 주문서 + 전용 명장의 큐브로 옵션 뽑기
                </p>
                <ul className="space-y-1 text-slate-300">
                    <li>• <strong className="text-white">특수 반지</strong> (리스트레인트/웨폰퍼프/리스크테이커/컨티뉴어스)</li>
                    <li className="pl-2 text-slate-400">- 조건 없음 (장착 시 인정)</li>
                    <li className="mt-1">• <strong className="text-white">이벤트 링</strong> (테네브리스/어웨이크/글로리온/카오스/벤젼스/쥬얼링/플레임)</li>
                    <li className="pl-2 text-slate-400">- 잠재능력: 유니크 이상 (주스탯 15%↑)</li>
                    <li className="pl-2 text-slate-400">- 에디셔널: 레어 이상 (공/마 +10 or 주스탯 4%↑)</li>
                    <li className="mt-1">• <strong className="text-white">또는 고스펙 반지</strong> (종류 무관)</li>
                    <li className="pl-2 text-slate-400">- 잠재능력: 유니크 이상 (주스탯 21%↑)</li>
                    <li className="pl-2 text-slate-400">- 에디셔널: 에픽 이상 (공/마 +10 or 주스탯 4%↑)</li>
                </ul>
            </div>

        </div>
    );
};
