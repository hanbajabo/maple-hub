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

import type { AppraisalResult } from '../lib/item-appraisal';

interface ItemCardProps {
    item: any;
    appraisalResult?: AppraisalResult | null;
}

const formatMesoStr = (meso: number) => {
    if (!meso || isNaN(meso) || meso === 0) return "0";
    
    const gyeong = Math.floor(meso / 10000000000000000);
    const jo = Math.floor((meso % 10000000000000000) / 1000000000000);
    const uk = Math.floor((meso % 1000000000000) / 100000000);
    const man = Math.floor((meso % 100000000) / 10000);

    const parts = [];
    if (gyeong > 0) parts.push(`${gyeong.toLocaleString()}경`);
    if (jo > 0) parts.push(`${jo.toLocaleString()}조`);
    if (uk > 0) parts.push(`${uk.toLocaleString()}억`);
    if (man > 0 && gyeong === 0) parts.push(`${man.toLocaleString()}만`); // 조 이상이면 '만'은 생략하여 간결하게 표시

    if (parts.length === 0) return Math.floor(meso).toLocaleString();
    return parts.join(' ');
};

export default function ItemCard({ item, appraisalResult }: ItemCardProps) {
    if (!item) return null;

    return (
        <div className={`relative bg-slate-900 border ${getGradeBorderColor(item.potential_option_grade)} rounded-xl p-4 flex flex-col gap-4 overflow-hidden shadow-2xl`}>
            {/* Grade Background Effect */}
            <div className={`absolute inset-0 ${getGradeBgColor(item.potential_option_grade)} pointer-events-none opacity-50`}></div>

            {/* Header: Icon & Name */}
            <div className="relative z-10 flex items-start gap-3 border-b border-slate-700/50 pb-4">
                <div className="w-20 h-20 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 border border-slate-700 relative">
                    <img src={item.item_icon} alt={item.item_name} className="w-16 h-16 object-contain" />
                    {item.starforce !== "0" && <span className={`absolute -top-2 -right-2 text-black text-xs font-bold px-2 py-0.5 rounded-full shadow-md ${isAmazingEnhancementItem(item) ? 'bg-cyan-400' : 'bg-yellow-500'}`}>★{item.starforce}</span>}
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
                    <h2 className={`text-xl font-bold ${getGradeColor(item.potential_option_grade)}`}>{item.item_name}{item.special_ring_level ? ` ${item.special_ring_level}레벨` : ''}</h2>
                    <p className="text-xs text-slate-500">{item.item_equipment_slot}</p>
                </div>
            </div>

            <div className={`relative z-10 flex flex-col md:flex-row gap-4 ${appraisalResult ? 'items-stretch' : ''}`}>
                {/* Options List */}
                <div className="flex-1 space-y-3 min-w-[280px]">
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

                {/* Appraisal Breakdown (if passed) */}
                {appraisalResult && (
                    <div className="flex-1 md:border-l md:border-t-0 border-t border-slate-700/50 md:pl-4 pt-4 md:pt-0 min-w-[280px]">
                        <div className="text-sm font-bold text-yellow-400 mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                            기댓값 상세 진단
                        </div>

                        {appraisalResult.details.isZeroSecondary && (
                            <div className="mb-2.5 p-2.5 rounded-lg bg-sky-950/50 border border-sky-500/30 text-xs text-sky-200 leading-relaxed">
                                💡 <strong>제로 무기 연동 시스템</strong>: 제로는 주무기(알파)를 강화하면 보조무기(베타)의 스타포스, 잠재능력, 에디셔널이 무료로 자동 동기화되므로, 보조무기는 별도 비용 없이 주무기 기댓값 하나로 합산됩니다.
                            </div>
                        )}
                        
                        {(appraisalResult.priceDate || appraisalResult.details.basePrice.cost > 0 || appraisalResult.details.basePrice.reason) && (
                            <div className="text-xs text-slate-400 mb-2.5 bg-slate-950/40 p-2 rounded border border-slate-800/50">
                                {appraisalResult.priceDate && (
                                    <div className="text-yellow-200/70 mb-0.5">* {appraisalResult.priceDate} 기준</div>
                                )}
                                <div>
                                    {appraisalResult.details.basePrice.isOverridden ? (
                                        <span className="text-amber-400 font-semibold">노작 아이템 시세(수정됨): </span>
                                    ) : (
                                        <span>노작 아이템 시세: </span>
                                    )}
                                    <span className={appraisalResult.details.basePrice.isOverridden ? "text-amber-300 font-bold" : "text-slate-200 font-medium"}>
                                        {appraisalResult.details.basePrice.reason && appraisalResult.details.basePrice.cost === 0 ? (
                                            appraisalResult.details.basePrice.reason
                                        ) : (
                                            `${formatMesoStr(appraisalResult.details.basePrice.cost || 0)} 메소`
                                        )}
                                    </span>
                                </div>
                                {(appraisalResult.details.basePrice.level5Cost || appraisalResult.details.basePrice.level6Cost) && (
                                    <div className="mt-1.5 pt-1.5 border-t border-slate-700/50 flex flex-col gap-0.5">
                                        {appraisalResult.details.basePrice.base4LevelCost !== undefined && (
                                            <div className="text-slate-400">└ 4레벨 노작: {formatMesoStr(appraisalResult.details.basePrice.base4LevelCost)}</div>
                                        )}
                                        {appraisalResult.details.basePrice.level5Cost !== undefined && (
                                            <>
                                                <div className="text-slate-400">└ 5레벨 연마 기댓값: {formatMesoStr(appraisalResult.details.basePrice.level5Cost)}</div>
                                                {appraisalResult.details.basePrice.lifeStonePrice !== undefined && (
                                                    <div className="text-slate-500 ml-3 mb-0.5">· 연마석 개당 시세: {formatMesoStr(appraisalResult.details.basePrice.lifeStonePrice)}</div>
                                                )}
                                            </>
                                        )}
                                        {appraisalResult.details.basePrice.level6Cost !== undefined && (
                                            <>
                                                <div className="text-slate-400">└ 6레벨 연마 기댓값: {formatMesoStr(appraisalResult.details.basePrice.level6Cost)}</div>
                                                {appraisalResult.details.basePrice.faithStonePrice !== undefined && (
                                                    <div className="text-slate-500 ml-3">· 신마석 개당 시세: {formatMesoStr(appraisalResult.details.basePrice.faithStonePrice)}</div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex flex-col gap-1.5">
                        {/* Starforce Breakdown */}
                        {appraisalResult.details.starforce.success && appraisalResult.details.starforce.cost > 0 ? (
                            <div className="flex flex-col gap-1 pb-3 mb-1 border-b border-slate-700/50 last:border-0 last:pb-0 last:mb-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <span className="text-sm text-yellow-200 font-bold">스타포스 ({item.starforce}성)</span>
                                    <span className="text-sm font-bold text-yellow-300">{formatMesoStr(appraisalResult.details.starforce.cost)} 메소</span>
                                </div>
                                <div className="flex flex-col text-[13px] text-slate-300 pl-1 space-y-1">
                                    <div><span className="text-slate-400 w-24 inline-block font-medium">강화 비용:</span> {formatMesoStr(appraisalResult.details.starforce.pureEnhancementCost || 0)}</div>
                                    <div><span className="text-slate-400 w-24 inline-block font-medium">스페어 장비:</span> {appraisalResult.details.starforce.expectedSpares?.toFixed(2) || 0}개 <span className="text-slate-500">({formatMesoStr(appraisalResult.details.starforce.cost - (appraisalResult.details.starforce.pureEnhancementCost || 0))})</span></div>
                                    {appraisalResult.appliedEvents?.isShining && (appraisalResult.savings?.starforceSavings || 0) > 0 && (
                                        <div className="text-yellow-300 font-medium pt-0.5">
                                            <span className="text-yellow-400/90 w-24 inline-block font-semibold">샤타포스 할인:</span>
                                            <span className="font-bold">-{formatMesoStr(appraisalResult.savings!.starforceSavings)} 메소 절감</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : appraisalResult.details.starforce.reason ? (
                            <div className="flex justify-between items-center pb-2 mb-1 border-b border-slate-700/50 last:border-0 last:pb-0 last:mb-0">
                                <span className="text-sm text-yellow-200 font-bold">스타포스 ({item.starforce || 0}성)</span>
                                <span className="text-xs text-amber-400/90 font-medium">{appraisalResult.details.starforce.reason}</span>
                            </div>
                        ) : null}

                        {/* Potential Breakdown */}
                        {appraisalResult.details.potential.success && appraisalResult.details.potential.cost > 0 ? (
                            <div className="flex flex-col gap-1 pb-3 mb-1 border-b border-slate-700/50 last:border-0 last:pb-0 last:mb-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <span className="text-sm text-green-200 font-bold">잠재능력 ({item.potential_option_grade})</span>
                                    <span className="text-sm font-bold text-green-300">{formatMesoStr(appraisalResult.details.potential.cost)} 메소</span>
                                </div>
                                <div className="flex flex-col text-[13px] text-slate-300 pl-1 space-y-1">
                                    <div><span className="text-slate-400 w-24 inline-block font-medium">등업 비용:</span> {formatMesoStr(appraisalResult.details.potential.tierUpCost || 0)}</div>
                                    {appraisalResult.appliedEvents?.isMiracleTime && (appraisalResult.details.potential.tierUpSavings || 0) > 0 && (
                                        <div className="text-purple-300 font-medium pt-0.5">
                                            <span className="text-purple-400/90 w-24 inline-block font-semibold">미라클 할인:</span>
                                            <span className="font-bold">-{formatMesoStr(appraisalResult.details.potential.tierUpSavings!)} 메소 절감</span>
                                        </div>
                                    )}
                                    <div><span className="text-slate-400 w-24 inline-block font-medium">옵션 비용:</span> {formatMesoStr(appraisalResult.details.potential.optionCost || 0)} <span className="text-slate-500">(평균 {appraisalResult.details.potential.expectedTries?.toLocaleString() || 0}개 소모)</span></div>
                                    {appraisalResult.details.potential.targetOptionStr && (
                                        <div className="text-green-300/80 font-medium mt-1"><span className="text-slate-400 w-24 inline-block font-medium">유효 옵션:</span> {appraisalResult.details.potential.targetOptionStr}</div>
                                    )}
                                </div>
                            </div>
                        ) : appraisalResult.details.potential.reason ? (
                            <div className="flex justify-between items-center pb-2 mb-1 border-b border-slate-700/50 last:border-0 last:pb-0 last:mb-0">
                                <span className="text-sm text-green-200 font-bold">잠재능력 ({item.potential_option_grade || '-'})</span>
                                <span className="text-xs text-sky-400 font-medium">{appraisalResult.details.potential.reason}</span>
                            </div>
                        ) : null}

                        {/* Additional Potential Breakdown */}
                        {appraisalResult.details.additional.success && appraisalResult.details.additional.cost > 0 ? (
                            <div className="flex flex-col gap-1 pb-3 mb-1 border-b border-slate-700/50 last:border-0 last:pb-0 last:mb-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <span className="text-sm text-blue-200 font-bold">에디셔널 ({item.additional_potential_option_grade})</span>
                                    <span className="text-sm font-bold text-blue-300">{formatMesoStr(appraisalResult.details.additional.cost)} 메소</span>
                                </div>
                                <div className="flex flex-col text-[13px] text-slate-300 pl-1 space-y-1">
                                    <div><span className="text-slate-400 w-24 inline-block font-medium">등업 비용:</span> {formatMesoStr(appraisalResult.details.additional.tierUpCost || 0)}</div>
                                    {appraisalResult.appliedEvents?.isMiracleTime && (appraisalResult.details.additional.tierUpSavings || 0) > 0 && (
                                        <div className="text-purple-300 font-medium pt-0.5">
                                            <span className="text-purple-400/90 w-24 inline-block font-semibold">미라클 할인:</span>
                                            <span className="font-bold">-{formatMesoStr(appraisalResult.details.additional.tierUpSavings!)} 메소 절감</span>
                                        </div>
                                    )}
                                    <div><span className="text-slate-400 w-24 inline-block font-medium">옵션 비용:</span> {formatMesoStr(appraisalResult.details.additional.optionCost || 0)} <span className="text-slate-500">(평균 {appraisalResult.details.additional.expectedTries?.toLocaleString() || 0}개 소모)</span></div>
                                    {appraisalResult.details.additional.targetOptionStr && (
                                        <div className="text-blue-300/80 font-medium mt-1"><span className="text-slate-400 w-24 inline-block font-medium">유효 옵션:</span> {appraisalResult.details.additional.targetOptionStr}</div>
                                    )}
                                </div>
                            </div>
                        ) : appraisalResult.details.additional.reason ? (
                            <div className="flex justify-between items-center pb-2 mb-1 border-b border-slate-700/50 last:border-0 last:pb-0 last:mb-0">
                                <span className="text-sm text-blue-200 font-bold">에디셔널 ({item.additional_potential_option_grade || '-'})</span>
                                <span className="text-xs text-sky-400 font-medium">{appraisalResult.details.additional.reason}</span>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}
