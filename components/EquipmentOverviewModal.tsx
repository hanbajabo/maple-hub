import React, { useState } from 'react';
import { Swords, Minus, Plus } from 'lucide-react';
import { ItemData } from '../app/page';
import { getWeaponTierLabel, getAddOptions, getEtcOptions, getArmorScoreLabel, getGradeColor, getGradeBgColor, getGradeBorderColor } from "../lib/item_utils";
import { isAmazingEnhancementItem } from "../lib/amazing_enhancement_table";

interface EquipmentOverviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    equipmentGrid: (ItemData | null)[];
    setSelectedWeapon: (item: ItemData | null) => void;
}

const EquipmentOverviewModal: React.FC<EquipmentOverviewModalProps> = ({
    isOpen,
    onClose,
    equipmentGrid,
    setSelectedWeapon
}) => {
    const [zoomLevel, setZoomLevel] = useState(2);

    if (!isOpen) return null;

    const getZoomGridClass = (level: number) => {
        switch (level) {
            case 4: return 'grid-cols-1 lg:grid-cols-2'; // Massive
            case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'; // Large
            case 2: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'; // Medium
            default: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8'; // Default
        }
    };

    const getZoomTextClass = (level: number, type: 'title' | 'detail' | 'badge' | 'icon' | 'container' | 'header') => {
        switch (level) {
            case 4: // Massive (Level 4)
                if (type === 'title') return 'text-5xl';
                if (type === 'detail') return 'text-3xl';
                if (type === 'header') return 'text-3xl';
                if (type === 'badge') return 'text-2xl px-4 py-1.5';
                if (type === 'icon') return 'w-28 h-28';
                if (type === 'container') return 'w-36 h-36';
                return '';
            case 3: // Large (Level 3)
                if (type === 'title') return 'text-3xl';
                if (type === 'detail') return 'text-xl';
                if (type === 'header') return 'text-xl';
                if (type === 'badge') return 'text-lg px-3 py-1';
                if (type === 'icon') return 'w-20 h-20';
                if (type === 'container') return 'w-24 h-24';
                return '';
            case 2: // Medium (Level 2)
                if (type === 'title') return 'text-2xl';
                if (type === 'detail') return 'text-lg';
                if (type === 'header') return 'text-lg';
                if (type === 'badge') return 'text-base px-2.5 py-0.5';
                if (type === 'icon') return 'w-14 h-14';
                if (type === 'container') return 'w-16 h-16';
                return '';
            default: // Default (Level 1)
                if (type === 'title') return 'text-xs';
                if (type === 'detail') return 'text-[11px]';
                if (type === 'header') return 'text-[10px]';
                if (type === 'badge') return 'text-[10px] px-1.5 py-0.5';
                if (type === 'icon') return 'w-7 h-7';
                if (type === 'container') return 'w-10 h-10';
                return '';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-2" onClick={onClose}>
            <div className="bg-slate-900 w-full h-full rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950 shrink-0">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Swords className="text-maple-orange" size={20} />
                        장비 한눈에 보기
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                            <button
                                onClick={() => setZoomLevel(prev => Math.max(1, prev - 1))}
                                disabled={zoomLevel <= 1}
                                className="p-1.5 hover:bg-slate-700 rounded-md transition-colors text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="mx-2 text-sm font-mono font-bold text-maple-orange min-w-[3rem] text-center">
                                x{zoomLevel === 1 ? '1.0' : zoomLevel === 2 ? '1.5' : zoomLevel === 3 ? '2.0' : '2.5'}
                            </span>
                            <button
                                onClick={() => setZoomLevel(prev => Math.min(4, prev + 1))}
                                disabled={zoomLevel >= 4}
                                className="p-1.5 hover:bg-slate-700 rounded-md transition-colors text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        <div className="w-px h-4 bg-slate-700 mx-2"></div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-950/50">
                    <div className={`grid gap-2 transition-all duration-300 ${getZoomGridClass(zoomLevel)}`}>
                        {equipmentGrid.filter(item => item !== null).map((item, idx) => (
                            <div key={idx} onClick={() => setSelectedWeapon(item)} className={`relative bg-slate-900 border ${getGradeBorderColor(item!.potential_option_grade)} rounded-lg p-2.5 hover:brightness-110 transition-all flex flex-col gap-2 h-full overflow-hidden cursor-pointer`}>
                                {/* Grade Background Effect */}
                                <div className={`absolute inset-0 ${getGradeBgColor(item!.potential_option_grade)} pointer-events-none`}></div>

                                <div className="relative z-10 flex items-start gap-2">
                                    <div className={`${getZoomTextClass(zoomLevel, 'container')} bg-slate-800 rounded-md flex items-center justify-center shrink-0 border border-slate-700 relative group transition-all`}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item!.item_icon} alt={item!.item_name} className={`${getZoomTextClass(zoomLevel, 'icon')} object-contain transition-all`} referrerPolicy="no-referrer" />
                                        {item!.starforce !== "0" && <span className={`absolute -top-1 -right-1 text-black ${zoomLevel >= 2 ? 'text-xs px-1.5' : 'text-[9px] px-1'} font-bold rounded-full shadow-sm leading-tight ${isAmazingEnhancementItem(item!) ? 'bg-cyan-400' : 'bg-yellow-500'}`}>★{item!.starforce}</span>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                            {item!.potential_option_grade && (
                                                <span className={`${getZoomTextClass(zoomLevel, 'badge')} rounded font-bold leading-none ${item!.potential_option_grade === "레전드리" ? "bg-green-600 text-white shadow-[0_0_10px_rgba(22,163,74,0.4)]" :
                                                    item!.potential_option_grade === "유니크" ? "bg-yellow-600 text-white shadow-[0_0_10px_rgba(202,138,4,0.4)]" :
                                                        item!.potential_option_grade === "에픽" ? "bg-purple-600 text-white" :
                                                            "bg-blue-600 text-white"
                                                    }`}>
                                                    {item!.potential_option_grade}
                                                </span>
                                            )}
                                            {item!.additional_potential_option_grade && (
                                                <span className={`${getZoomTextClass(zoomLevel, 'badge')} rounded font-bold leading-none flex items-center gap-1 ${item!.additional_potential_option_grade === "레전드리" ? "bg-green-950 text-green-200 border border-green-600" :
                                                    item!.additional_potential_option_grade === "유니크" ? "bg-yellow-950 text-yellow-200 border border-yellow-600" :
                                                        item!.additional_potential_option_grade === "에픽" ? "bg-purple-950 text-purple-200 border border-purple-600" :
                                                            "bg-blue-950 text-blue-200 border border-blue-600"
                                                    }`}>
                                                    <span className="opacity-70 text-[9px]">에디</span>
                                                    {item!.additional_potential_option_grade}
                                                </span>
                                            )}
                                        </div>
                                        <div className={`font-bold truncate ${getGradeColor(item!.potential_option_grade)} ${getZoomTextClass(zoomLevel, 'title')}`}>
                                            {item!.item_name}
                                        </div>
                                        <div className={`${zoomLevel >= 2 ? 'text-xs' : 'text-[10px]'} text-slate-500`}>{item!.item_equipment_slot}</div>

                                    </div>
                                </div>

                                <div className={`space-y-1.5 flex-1 ${getZoomTextClass(zoomLevel, 'detail')}`}>
                                    {/* Add Options */}
                                    {getAddOptions(item!).length > 0 && (
                                        <div className="bg-slate-950/50 rounded px-2 py-1.5 border border-slate-800/50">
                                            <div className={`text-lime-500 font-bold mb-0.5 flex items-center gap-1 ${getZoomTextClass(zoomLevel, 'header')}`}>
                                                <span className="w-1 h-1 rounded-full bg-lime-500"></span>
                                                추가옵션
                                                {getWeaponTierLabel(item!) && (
                                                    <span className={`text-white bg-red-600 rounded shadow-sm font-bold ${getZoomTextClass(zoomLevel, 'badge')}`}>
                                                        {getWeaponTierLabel(item!)}
                                                    </span>
                                                )}
                                                {getArmorScoreLabel(item!) && (
                                                    <span className={`text-white bg-indigo-600 rounded shadow-sm font-bold ${getZoomTextClass(zoomLevel, 'badge')}`}>
                                                        {getArmorScoreLabel(item!)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-x-1.5 gap-y-0 leading-tight">
                                                {getAddOptions(item!).map((opt, i) => (
                                                    <span key={i} className="text-slate-400">{opt}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Etc Options (Upgrade Stats) */}
                                    {getEtcOptions(item!).length > 0 && (
                                        <div className="bg-slate-950/50 rounded px-2 py-1.5 border border-slate-800/50">
                                            <div className={`text-sky-500 font-bold mb-0.5 flex items-center gap-1 ${getZoomTextClass(zoomLevel, 'header')}`}>
                                                <span className="w-1 h-1 rounded-full bg-sky-500"></span>
                                                주문서 강화
                                                {isAmazingEnhancementItem(item!) && (
                                                    <span className={`text-white bg-amber-600 rounded shadow-sm font-bold border border-amber-500 ${getZoomTextClass(zoomLevel, 'badge')}`}>
                                                        놀장강
                                                    </span>
                                                )}
                                                {item!.item_name.includes("타일런트") && (
                                                    <span className={`text-white bg-purple-600 rounded shadow-sm font-bold border border-purple-500 ${getZoomTextClass(zoomLevel, 'badge')}`}>
                                                        슈페리얼
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-x-1.5 gap-y-0 leading-tight">
                                                {getEtcOptions(item!).map((opt, i) => (
                                                    <span key={i} className="text-slate-400">{opt}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Potentials */}
                                    {(item!.potential_option_1 || item!.potential_option_2 || item!.potential_option_3) && (
                                        <div className="bg-slate-950/50 rounded px-2 py-1.5 border border-slate-800/50">
                                            <div className={`text-green-500 font-bold mb-0.5 flex items-center gap-1 ${getZoomTextClass(zoomLevel, 'header')}`}>
                                                <span className="w-1 h-1 rounded-full bg-green-500"></span>
                                                잠재옵션
                                                {item!.potential_option_grade && (
                                                    <span className={`${getZoomTextClass(zoomLevel, 'badge')} rounded border ml-1 font-bold ${item!.potential_option_grade === "레전드리" ? "bg-green-950 text-green-400 border-green-800" :
                                                        item!.potential_option_grade === "유니크" ? "bg-yellow-950 text-yellow-400 border-yellow-800" :
                                                            item!.potential_option_grade === "에픽" ? "bg-purple-950 text-purple-400 border-purple-800" :
                                                                "bg-blue-950 text-blue-400 border-blue-800"
                                                        }`}>
                                                        {item!.potential_option_grade}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="space-y-0 leading-tight">
                                                {item!.potential_option_1 && <div className="text-slate-300 truncate">{item!.potential_option_1}</div>}
                                                {item!.potential_option_2 && <div className="text-slate-300 truncate">{item!.potential_option_2}</div>}
                                                {item!.potential_option_3 && <div className="text-slate-300 truncate">{item!.potential_option_3}</div>}
                                            </div>
                                        </div>
                                    )}

                                    {/* Additional Potentials */}
                                    {(item!.additional_potential_option_1 || item!.additional_potential_option_2 || item!.additional_potential_option_3) && (
                                        <div className="bg-slate-950/50 rounded px-2 py-1.5 border border-slate-800/50">
                                            <div className={`text-blue-500 font-bold mb-0.5 flex items-center gap-1 ${getZoomTextClass(zoomLevel, 'header')}`}>
                                                <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                                                에디셔널
                                                {item!.additional_potential_option_grade && (
                                                    <span className={`${getZoomTextClass(zoomLevel, 'badge')} rounded border ml-1 font-bold ${item!.additional_potential_option_grade === "레전드리" ? "bg-green-950 text-green-400 border-green-800" :
                                                        item!.additional_potential_option_grade === "유니크" ? "bg-yellow-950 text-yellow-400 border-yellow-800" :
                                                            item!.additional_potential_option_grade === "에픽" ? "bg-purple-950 text-purple-400 border-purple-800" :
                                                                "bg-blue-950 text-blue-400 border-blue-800"
                                                        }`}>
                                                        {item!.additional_potential_option_grade}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="space-y-0 leading-tight">
                                                {item!.additional_potential_option_1 && <div className="text-slate-300 truncate">{item!.additional_potential_option_1}</div>}
                                                {item!.additional_potential_option_2 && <div className="text-slate-300 truncate">{item!.additional_potential_option_2}</div>}
                                                {item!.additional_potential_option_3 && <div className="text-slate-300 truncate">{item!.additional_potential_option_3}</div>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EquipmentOverviewModal;
