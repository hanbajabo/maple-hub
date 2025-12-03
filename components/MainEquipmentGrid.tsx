import React from 'react';
import { Search } from 'lucide-react';
import { ItemData } from '../app/page';
import { DiagnosisGrade } from '../lib/diagnosis/types';
import { getWeaponTierLabel, getAddOptions, getEtcOptions, getArmorScoreLabel, getGradeColor } from "../lib/item_utils";
import { getSeedRingLevel } from "../lib/diagnosis/utils";

interface MainEquipmentGridProps {
    equipmentGrid: (ItemData | null)[];
    setSelectedWeapon: (item: ItemData | null) => void;
    setIsOverviewOpen: (isOpen: boolean) => void;
    itemGrades?: Record<string, DiagnosisGrade>;
}

const MainEquipmentGrid: React.FC<MainEquipmentGridProps> = ({
    equipmentGrid,
    setSelectedWeapon,
    setIsOverviewOpen,
    itemGrades
}) => {
    // 메이플 잠재능력 색상 체계
    const getDiagnosisColor = (grade?: DiagnosisGrade) => {
        if (!grade) return '';
        switch (grade) {
            case 'SS': return 'border-yellow-300 shadow-[0_0_15px_rgba(253,224,71,0.6)] ring-2 ring-yellow-300/50';
            case 'S': return 'border-green-500 shadow-[0_0_12px_rgba(34,197,94,0.5)] ring-2 ring-green-500/40';
            case 'A': return 'border-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]';
            case 'B': return 'border-purple-500';
            case 'C': return 'border-cyan-400';
            case 'F': return 'border-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]';
            default: return '';
        }
    };

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
                {equipmentGrid.map((item, index) => {
                    const grade = item && itemGrades ? itemGrades[`${item.item_equipment_slot}_${item.item_name}`] : undefined;
                    const gradeClass = getDiagnosisColor(grade);
                    return (
                        <div
                            key={index}
                            onClick={() => item && setSelectedWeapon(item)}
                            className={`group relative aspect-square bg-slate-800 rounded-lg border ${gradeClass || 'border-slate-700'} ${item ? 'hover:border-maple-orange cursor-pointer hover:z-[100]' : ''} transition-all flex items-center justify-center`}
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
                                    <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-64 sm:w-80 bg-gray-950 border border-slate-700 rounded-lg p-3 sm:p-5 shadow-2xl z-50 hidden group-hover:block pointer-events-none leading-relaxed">
                                        <div className={`text-sm sm:text-xl font-bold mb-1 sm:mb-2 ${getGradeColor(item.potential_option_grade)}`}>
                                            {item.item_name}
                                            {item.starforce !== "0" && <span className="text-yellow-400">★{item.starforce}</span>}
                                            {getSeedRingLevel(item) > 0 && <span className="ml-2 text-cyan-400 text-xs sm:text-sm border border-cyan-500 rounded px-1.5 py-0.5 align-middle">Lv.{getSeedRingLevel(item)}</span>}
                                        </div>

                                        {/* Upgrade Count */}
                                        {item.upgrade_count !== "0" && (
                                            <div className="text-[10px] sm:text-sm text-gray-400 mb-1 sm:mb-2">
                                                업그레이드 가능 횟수: {item.upgrade_count}
                                            </div>
                                        )}

                                        <div className="w-full h-px bg-slate-800 my-2 sm:my-3" />

                                        {/* Add Options */}
                                        {getAddOptions(item).length > 0 && (
                                            <div className="mb-2 sm:mb-3">
                                                <div className="text-[10px] sm:text-sm text-lime-500 font-medium mb-0.5 sm:mb-1 flex items-center gap-2">
                                                    추가 옵션
                                                    {getWeaponTierLabel(item) && (
                                                        <span className="text-white bg-red-600 px-1.5 rounded text-[10px] sm:text-xs shadow-sm font-bold animate-pulse">
                                                            {getWeaponTierLabel(item)}
                                                        </span>
                                                    )}
                                                    {getArmorScoreLabel(item) && (
                                                        <span className="text-white bg-indigo-600 px-1.5 rounded text-[10px] sm:text-xs shadow-sm font-bold">
                                                            {getArmorScoreLabel(item)}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-2 gap-x-2">
                                                    {getAddOptions(item).map((opt, i) => (
                                                        <div key={i} className="text-[10px] sm:text-sm text-lime-400">{opt}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Etc Options (Blue) */}
                                        {getEtcOptions(item).length > 0 && (
                                            <div className="mb-2 sm:mb-3">
                                                <div className="text-[10px] sm:text-sm text-sky-500 font-medium mb-0.5 sm:mb-1">주문서 작</div>
                                                <div className="grid grid-cols-2 gap-x-2">
                                                    {getEtcOptions(item).map((opt, i) => (
                                                        <div key={i} className="text-[10px] sm:text-sm text-blue-400">{opt}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Potential Options */}
                                        {(item.potential_option_1 || item.potential_option_2 || item.potential_option_3) && (
                                            <div className="mb-2 sm:mb-3">
                                                <div className="text-[10px] sm:text-sm text-green-500 font-medium mb-0.5 sm:mb-1 flex items-center gap-1">
                                                    잠재옵션
                                                    {item.potential_option_grade && (
                                                        <span className={`text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded border ml-1 ${item.potential_option_grade === "레전드리" ? "bg-green-950 text-green-400 border-green-800" :
                                                            item.potential_option_grade === "유니크" ? "bg-yellow-950 text-yellow-400 border-yellow-800" :
                                                                item.potential_option_grade === "에픽" ? "bg-purple-950 text-purple-400 border-purple-800" :
                                                                    "bg-blue-950 text-blue-400 border-blue-800"
                                                            }`}>
                                                            {item.potential_option_grade}
                                                        </span>
                                                    )}
                                                </div>
                                                {item.potential_option_1 && <div className="text-[10px] sm:text-sm text-green-400">{item.potential_option_1}</div>}
                                                {item.potential_option_2 && <div className="text-[10px] sm:text-sm text-green-400">{item.potential_option_2}</div>}
                                                {item.potential_option_3 && <div className="text-[10px] sm:text-sm text-green-400">{item.potential_option_3}</div>}
                                            </div>
                                        )}

                                        {/* Additional Potential Options */}
                                        {(item.additional_potential_option_1 || item.additional_potential_option_2 || item.additional_potential_option_3) && (
                                            <div>
                                                <div className="text-[10px] sm:text-sm text-blue-500 font-medium mb-0.5 sm:mb-1 flex items-center gap-1">
                                                    에디셔널
                                                    {item.additional_potential_option_grade && (
                                                        <span className={`text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded border ml-1 ${item.additional_potential_option_grade === "레전드리" ? "bg-green-950 text-green-400 border-green-800" :
                                                            item.additional_potential_option_grade === "유니크" ? "bg-yellow-950 text-yellow-400 border-yellow-800" :
                                                                item.additional_potential_option_grade === "에픽" ? "bg-purple-950 text-purple-400 border-purple-800" :
                                                                    "bg-blue-950 text-blue-400 border-blue-800"
                                                            }`}>
                                                            {item.additional_potential_option_grade}
                                                        </span>
                                                    )}
                                                </div>
                                                {item.additional_potential_option_1 && <div className="text-[10px] sm:text-sm text-blue-400">{item.additional_potential_option_1}</div>}
                                                {item.additional_potential_option_2 && <div className="text-[10px] sm:text-sm text-blue-400">{item.additional_potential_option_2}</div>}
                                                {item.additional_potential_option_3 && <div className="text-[10px] sm:text-sm text-blue-400">{item.additional_potential_option_3}</div>}
                                            </div>
                                        )}

                                        {/* Cuttable Count (Gray) */}
                                        {item.cuttable_count && item.cuttable_count !== "255" && (
                                            <div className="mt-2 sm:mt-3 pt-1 sm:pt-2 border-t border-slate-800 text-[10px] sm:text-xs text-gray-500">
                                                가위 사용 가능 횟수: {item.cuttable_count}회
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full bg-slate-900/50 rounded-lg" />
                            )}
                        </div>
                    );
                })}
            </div>
            {/* 등급 범례 (메이플 잠재능력 색상) */}
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 border-2 border-yellow-300 rounded shadow-[0_0_8px_rgba(253,224,71,0.5)]"></div>
                    <span>SS (극종결)</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 border-2 border-green-500 rounded shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                    <span>S (종결)</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 border-2 border-orange-500 rounded"></div>
                    <span>A (준종결)</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 border-2 border-purple-500 rounded"></div>
                    <span>B (준수)</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 border-2 border-cyan-400 rounded"></div>
                    <span>C (개선필요)</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 border-2 border-red-600 rounded shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                    <span>F (교체권장)</span>
                </div>
            </div>
        </div>
    );
};

export default MainEquipmentGrid;
