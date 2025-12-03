import React from 'react';
import {
    getGradeColor,
    getGradeBorderColor,
    getGradeBgColor,
    getAddOptions,
    getEtcOptions,
    getWeaponTierLabel,
    getArmorScoreLabel
} from '../lib/item_utils';
import { isAmazingEnhancementItem } from '../lib/amazing_enhancement_table';

interface ItemCardProps {
    item: any;
}

export default function ItemCard({ item }: ItemCardProps) {
    if (!item) return null;

    return (
        <div className={`relative bg-slate-900 border ${getGradeBorderColor(item.potential_option_grade)} rounded-xl p-4 flex flex-col gap-4 overflow-hidden shadow-2xl`}>
            {/* Grade Background Effect */}
            <div className={`absolute inset-0 ${getGradeBgColor(item.potential_option_grade)} pointer-events-none opacity-50`}></div>

            {/* Header: Icon & Name */}
            <div className="relative z-10 flex items-start gap-3 border-b border-slate-700/50 pb-4">
                <div className="w-20 h-20 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 border border-slate-700 relative">
                    <img src={item.item_icon} alt={item.item_name} className="w-16 h-16 object-contain" />
                    {item.starforce !== "0" && <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full shadow-md">★{item.starforce}</span>}
                </div>
                <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        {item.potential_option_grade && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold leading-none ${item.potential_option_grade === "레전드리" ? "bg-green-600 text-white" : item.potential_option_grade === "유니크" ? "bg-yellow-600 text-white" : item.potential_option_grade === "에픽" ? "bg-purple-600 text-white" : "bg-blue-600 text-white"}`}>
                                {item.potential_option_grade}
                            </span>
                        )}
                        {item.additional_potential_option_grade && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold leading-none flex items-center gap-1 ${item.additional_potential_option_grade === "레전드리" ? "bg-green-950 text-green-200 border border-green-600" : item.additional_potential_option_grade === "유니크" ? "bg-yellow-950 text-yellow-200 border border-yellow-600" : item.additional_potential_option_grade === "에픽" ? "bg-purple-950 text-purple-200 border border-purple-600" : "bg-blue-950 text-blue-200 border border-blue-600"}`}>
                                <span className="opacity-70 text-[9px]">에디</span>
                                {item.additional_potential_option_grade}
                            </span>
                        )}
                    </div>
                    <h2 className={`text-xl font-bold ${getGradeColor(item.potential_option_grade)}`}>{item.item_name}</h2>
                    <p className="text-xs text-slate-500">{item.item_equipment_slot}</p>
                </div>
            </div>

            {/* Options List */}
            <div className="relative z-10 space-y-3">
                {/* Add Options */}
                {getAddOptions(item).length > 0 && (
                    <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/50">
                        <div className="text-lime-500 font-bold mb-1 flex items-center gap-1 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime-500"></span> 추가옵션
                            {getWeaponTierLabel(item) && (
                                <span className="text-white bg-red-600 px-1.5 py-0.5 rounded text-xs shadow-sm font-bold ml-1">
                                    {getWeaponTierLabel(item)}
                                </span>
                            )}
                            {getArmorScoreLabel(item) && (
                                <span className="text-white bg-indigo-600 px-1.5 py-0.5 rounded text-xs shadow-sm font-bold ml-1">
                                    {getArmorScoreLabel(item)}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                            {getAddOptions(item).map((opt, i) => (
                                <span key={i} className="text-slate-400 text-sm">{opt}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Etc Options */}
                {getEtcOptions(item).length > 0 && (
                    <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/50">
                        <div className="text-sky-500 font-bold mb-1 flex items-center gap-1 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span> 주문서 강화
                            {isAmazingEnhancementItem(item) && (
                                <span className="text-white bg-amber-600 px-1.5 py-0.5 rounded text-[10px] shadow-sm font-bold border border-amber-500">
                                    놀장강
                                </span>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                            {getEtcOptions(item).map((opt, i) => (
                                <span key={i} className="text-slate-400 text-sm">{opt}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Potentials */}
                {(item.potential_option_1 || item.potential_option_2 || item.potential_option_3) && (
                    <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/50">
                        <div className="text-green-500 font-bold mb-1 flex items-center gap-1 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 잠재옵션
                            {item.potential_option_grade && (
                                <span className={`text-[10px] px-1.5 py-0.5 rounded border ml-1 ${item.potential_option_grade === "레전드리" ? "bg-green-950 text-green-400 border-green-800" :
                                    item.potential_option_grade === "유니크" ? "bg-yellow-950 text-yellow-400 border-yellow-800" :
                                        item.potential_option_grade === "에픽" ? "bg-purple-950 text-purple-400 border-purple-800" :
                                            "bg-blue-950 text-blue-400 border-blue-800"
                                    }`}>
                                    {item.potential_option_grade}
                                </span>
                            )}
                        </div>
                        <div className="space-y-0.5">
                            {item.potential_option_1 && <div className="text-slate-300 text-sm">{item.potential_option_1}</div>}
                            {item.potential_option_2 && <div className="text-slate-300 text-sm">{item.potential_option_2}</div>}
                            {item.potential_option_3 && <div className="text-slate-300 text-sm">{item.potential_option_3}</div>}
                        </div>
                    </div>
                )}

                {/* Additional Potentials */}
                {(item.additional_potential_option_1 || item.additional_potential_option_2 || item.additional_potential_option_3) && (
                    <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/50">
                        <div className="text-blue-500 font-bold mb-1 flex items-center gap-1 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> 에디셔널
                            {item.additional_potential_option_grade && (
                                <span className={`text-[10px] px-1.5 py-0.5 rounded border ml-1 ${item.additional_potential_option_grade === "레전드리" ? "bg-green-950 text-green-400 border-green-800" :
                                    item.additional_potential_option_grade === "유니크" ? "bg-yellow-950 text-yellow-400 border-yellow-800" :
                                        item.additional_potential_option_grade === "에픽" ? "bg-purple-950 text-purple-400 border-purple-800" :
                                            "bg-blue-950 text-blue-400 border-blue-800"
                                    }`}>
                                    {item.additional_potential_option_grade}
                                </span>
                            )}
                        </div>
                        <div className="space-y-0.5">
                            {item.additional_potential_option_1 && <div className="text-slate-300 text-sm">{item.additional_potential_option_1}</div>}
                            {item.additional_potential_option_2 && <div className="text-slate-300 text-sm">{item.additional_potential_option_2}</div>}
                            {item.additional_potential_option_3 && <div className="text-slate-300 text-sm">{item.additional_potential_option_3}</div>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
