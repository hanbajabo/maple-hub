import React from 'react';
import { Search } from 'lucide-react';
import { ItemData } from '../app/page';
import { getWeaponTierLabel, getAddOptions, getEtcOptions, getArmorScoreLabel, getGradeColor } from "../lib/item_utils";

interface MainEquipmentGridProps {
    equipmentGrid: (ItemData | null)[];
    setSelectedWeapon: (item: ItemData | null) => void;
    setIsOverviewOpen: (isOpen: boolean) => void;
}

const MainEquipmentGrid: React.FC<MainEquipmentGridProps> = ({
    equipmentGrid,
    setSelectedWeapon,
    setIsOverviewOpen
}) => {
    return (
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 animate-in fade-in slide-in-from-bottom-6 delay-100">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-300">착용 장비</h3>
                <button
                    onClick={() => setIsOverviewOpen(true)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition-colors flex items-center gap-2 border border-slate-700"
                >
                    <Search size={14} />
                    한눈에 보기
                </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
                {equipmentGrid.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => item && setSelectedWeapon(item)}
                        className={`group relative aspect-square bg-slate-800 rounded-lg border border-slate-700 ${item ? 'hover:border-maple-orange cursor-pointer' : ''} transition-colors flex items-center justify-center`}
                    >
                        {item ? (
                            <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.item_icon} alt={item.item_name} className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />

                                {/* Starforce Badge */}
                                {item.starforce !== "0" && (
                                    <span className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-1.5 py-0.5 rounded-bl-lg rounded-tr-lg shadow-md z-10">
                                        ★{item.starforce}
                                    </span>
                                )}

                                {/* Tooltip */}
                                <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-80 bg-slate-950 border border-slate-700 rounded-lg p-5 shadow-2xl z-50 hidden group-hover:block pointer-events-none leading-relaxed">
                                    <div className={`text-xl font-bold mb-2 ${getGradeColor(item.potential_option_grade)}`}>
                                        {item.item_name} {item.starforce !== "0" && <span className="text-yellow-400">★{item.starforce}</span>}
                                    </div>

                                    {/* Upgrade Count */}
                                    {item.upgrade_count !== "0" && (
                                        <div className="text-sm text-gray-400 mb-2">
                                            업그레이드 가능 횟수: {item.upgrade_count}
                                        </div>
                                    )}

                                    <div className="w-full h-px bg-slate-800 my-3" />

                                    {/* Add Options */}
                                    {getAddOptions(item).length > 0 && (
                                        <div className="mb-3">
                                            <div className="text-sm text-lime-500 font-medium mb-1 flex items-center gap-2">
                                                추가 옵션
                                                {getWeaponTierLabel(item) && (
                                                    <span className="text-white bg-red-600 px-1.5 rounded text-xs shadow-sm font-bold animate-pulse">
                                                        {getWeaponTierLabel(item)}
                                                    </span>
                                                )}
                                                {getArmorScoreLabel(item) && (
                                                    <span className="text-white bg-indigo-600 px-1.5 rounded text-xs shadow-sm font-bold">
                                                        {getArmorScoreLabel(item)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-2">
                                                {getAddOptions(item).map((opt, i) => (
                                                    <div key={i} className="text-sm text-lime-400">{opt}</div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Etc Options (Blue) */}
                                    {getEtcOptions(item).length > 0 && (
                                        <div className="mb-3">
                                            <div className="text-sm text-sky-500 font-medium mb-1">주문서 작</div>
                                            <div className="grid grid-cols-2 gap-x-2">
                                                {getEtcOptions(item).map((opt, i) => (
                                                    <div key={i} className="text-sm text-blue-400">{opt}</div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Potential Options */}
                                    {(item.potential_option_1 || item.potential_option_2 || item.potential_option_3) && (
                                        <div className="mb-3">
                                            <div className="text-sm text-green-500 font-medium mb-1 flex items-center gap-1">
                                                잠재옵션
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
                                            {item.potential_option_1 && <div className="text-sm text-green-400">{item.potential_option_1}</div>}
                                            {item.potential_option_2 && <div className="text-sm text-green-400">{item.potential_option_2}</div>}
                                            {item.potential_option_3 && <div className="text-sm text-green-400">{item.potential_option_3}</div>}
                                        </div>
                                    )}

                                    {/* Additional Potential Options */}
                                    {(item.additional_potential_option_1 || item.additional_potential_option_2 || item.additional_potential_option_3) && (
                                        <div>
                                            <div className="text-sm text-blue-500 font-medium mb-1 flex items-center gap-1">
                                                에디셔널
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
                                            {item.additional_potential_option_1 && <div className="text-sm text-blue-400">{item.additional_potential_option_1}</div>}
                                            {item.additional_potential_option_2 && <div className="text-sm text-blue-400">{item.additional_potential_option_2}</div>}
                                            {item.additional_potential_option_3 && <div className="text-sm text-blue-400">{item.additional_potential_option_3}</div>}
                                        </div>
                                    )}

                                    {/* Cuttable Count (Gray) */}
                                    {item.cuttable_count && item.cuttable_count !== "255" && (
                                        <div className="mt-3 pt-2 border-t border-slate-800 text-xs text-gray-500">
                                            가위 사용 가능 횟수: {item.cuttable_count}회
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full bg-slate-900/50 rounded-lg" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainEquipmentGrid;
