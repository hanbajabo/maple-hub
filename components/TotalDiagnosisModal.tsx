import React, { useEffect, useState } from 'react';
import { Swords, X, Calculator, Loader2 } from 'lucide-react';
import { ItemData } from '../app/page';
import type { AppraisalResult } from '../lib/item-appraisal';
import ItemDetailModal from './ItemDetailModal';
import { AdBanner } from '@/components/AdSense';

interface TotalDiagnosisModalProps {
    isOpen: boolean;
    onClose: () => void;
    equipmentGrid: (ItemData | null)[];
    characterClass: string;
    characterInfo?: {
        character_name: string;
        character_level: number;
        character_image: string;
        world_name: string;
        character_guild_name?: string;
    } | null;
}

interface AppraisalItem {
    item: ItemData;
    result: AppraisalResult | null;
}

const formatMeso = (meso: number) => {
    if (isNaN(meso) || meso === 0) return "0";
    
    const gyeong = Math.floor(meso / 10000000000000000);
    const jo = Math.floor((meso % 10000000000000000) / 1000000000000);
    const uk = Math.floor((meso % 1000000000000) / 100000000);
    const man = Math.floor((meso % 100000000) / 10000);

    const parts = [];
    if (gyeong > 0) parts.push(`${gyeong.toLocaleString()}경`);
    if (jo > 0) parts.push(`${jo.toLocaleString()}조`);
    if (uk > 0) parts.push(`${uk.toLocaleString()}억`);
    if (man > 0 && gyeong === 0) parts.push(`${man.toLocaleString()}만`);

    if (parts.length === 0) return meso.toLocaleString();
    return parts.join(' ');
};

const TotalDiagnosisModal: React.FC<TotalDiagnosisModalProps> = ({
    isOpen,
    onClose,
    equipmentGrid,
    characterClass,
    characterInfo
}) => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState<AppraisalItem[]>([]);
    const [totalCost, setTotalCost] = useState(0);
    const [editingIdx, setEditingIdx] = useState<number | null>(null);
    const [detailItem, setDetailItem] = useState<ItemData | null>(null);
    const [isMiracleTime, setIsMiracleTime] = useState(false);
    const [isShining, setIsShining] = useState(false);

    const handleOverridePrice = async (idx: number, priceStr: string) => {
        let price = parseInt(priceStr);
        if (isNaN(price) || priceStr.trim() === '') {
            price = 0; // 빈 값이면 0원으로 처리 (비워두기)
        }
        if (price < 0) {
            setEditingIdx(null);
            return;
        }
        
        const itemRes = results[idx];
        if (!itemRes) return;
        
        // 값이 변경되지 않았다면 굳이 API 호출 안 함
        if (itemRes.result?.details.basePrice.cost === price && price !== 0) {
            setEditingIdx(null);
            return;
        }
        
        try {
            const response = await fetch('/api/appraisal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item: itemRes.item, characterClass, overrideBasePrice: price, isMiracleTime, isShining })

            });
            
            if (response.ok) {
                const result = await response.json();
                const newResults = [...results];
                newResults[idx].result = result;
                setResults(newResults);
                
                let newTotal = 0;
                newResults.forEach(r => {
                    if (r.result?.isCalculable && !isNaN(r.result.totalCost)) {
                        newTotal += r.result.totalCost;
                    }
                });
                setTotalCost(newTotal);
                setEditingIdx(null);
            }
        } catch (e) {
            console.error(e);
            setEditingIdx(null);
        }
    };

    const startAnalysis = async (miracleTime?: boolean, shiningTime?: boolean) => {
        // 파라미터가 없으면 현재 상태값 사용 (React state closure 문제 방지용)
        const useMiracleTime = miracleTime ?? isMiracleTime;
        const useShining = shiningTime ?? isShining;

        setIsAnalyzing(true);
        setProgress(0);
        setResults([]);
        setTotalCost(0);

        const validItems = equipmentGrid.filter((i): i is ItemData => i !== null);
        
        // 장비 순서 정렬 (무기류 -> 방어구 -> 장신구)
        const slotOrder = [
            "무기", "보조무기", "엠블렘", "기계 심장",
            "모자", "상의", "하의", "한벌옷", "어깨장식",
            "망토", "장갑", "신발",
            "벨트", "얼굴장식", "눈장식", "귀고리", 
            "펜던트", "펜던트2", 
            "반지1", "반지2", "반지3", "반지4",
            "포켓 아이템", "뱃지", "훈장", "칭호"
        ];
        
        validItems.sort((a, b) => {
            const getIndex = (slot: string) => {
                const idx = slotOrder.findIndex(s => slot === s);
                return idx === -1 ? 999 : idx;
            };
            return getIndex(a.item_equipment_slot || '') - getIndex(b.item_equipment_slot || '');
        });
        const newResults: AppraisalItem[] = [];
        let runningTotal = 0;

        for (let i = 0; i < validItems.length; i++) {
            const item = validItems[i];
            
            try {
                const response = await fetch('/api/appraisal', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ item, characterClass, isMiracleTime: useMiracleTime, isShining: useShining })
                });
                
                if (!response.ok) throw new Error('API Error');
                const result: AppraisalResult = await response.json();
                
                newResults.push({ item, result });
                
                if (result.isCalculable && !isNaN(result.totalCost)) {
                    runningTotal += result.totalCost;
                }
            } catch (e) {
                console.error("Appraisal failed for item", item.item_name, e);
                newResults.push({ item, result: null });
            }

            setProgress(Math.round(((i + 1) / validItems.length) * 100));
            setResults([...newResults]);
            setTotalCost(runningTotal);
            
            // Allow UI to breathe
            await new Promise(r => setTimeout(r, 50));
        }

        setIsAnalyzing(false);
    };

    useEffect(() => {
        if (isOpen && results.length === 0 && !isAnalyzing) {
            startAnalysis();
        }
    }, [isOpen]);

    // 이벤트 토글 변경 시 자동 재감정
    const handleMiracleToggle = (val: boolean) => {
        setIsMiracleTime(val);
        if (results.length > 0) startAnalysis(val, isShining);
    };
    const handleShiningToggle = (val: boolean) => {
        setIsShining(val);
        if (results.length > 0) startAnalysis(isMiracleTime, val);
    };


    useEffect(() => {
        // 장비가 변경되면 기존 감정 결과를 초기화하여 다음 오픈 시 새로 분석하도록 함
        setResults([]);
        setTotalCost(0);
        setProgress(0);
    }, [equipmentGrid]);

    const totalStarforceSavings = results.reduce((acc, r) => acc + (r.result?.savings?.starforceSavings || 0), 0);
    const totalTierUpSavings = results.reduce((acc, r) => acc + (r.result?.savings?.tierUpSavings || 0), 0);
    const totalSavings = (isShining ? totalStarforceSavings : 0) + (isMiracleTime ? totalTierUpSavings : 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-2" onClick={onClose}>
            <div className="bg-slate-900 w-full max-w-7xl h-[90vh] rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in duration-200" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950 shrink-0">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Calculator className="text-maple-orange" size={20} />
                        템셋 총 직작 가치 감정 (Beta)
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-950 flex flex-col custom-scrollbar">
                    
                    {/* Character Info */}
                    {characterInfo && (
                        <div className="flex items-center gap-4 mb-4 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg">
                            {characterInfo.character_image && (
                                <img src={characterInfo.character_image} alt={characterInfo.character_name} className="w-16 h-16 rounded-lg object-contain bg-slate-800" />
                            )}
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-white">{characterInfo.character_name}</span>
                                    <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-medium">Lv.{characterInfo.character_level}</span>
                                </div>
                                <div className="text-sm text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                                    <span>{characterInfo.world_name}</span>
                                    <span>•</span>
                                    <span>{characterClass}</span>
                                    {characterInfo.character_guild_name && (
                                        <>
                                            <span>•</span>
                                            <span>{characterInfo.character_guild_name}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 캐릭터 정보와 진단 결과 사이 애드센스 광고 배너 */}
                    <div className="mb-4">
                        <AdBanner dataAdSlot="8162808816" className="w-full my-0" />
                    </div>

                    {/* Top Summary Board */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6 shadow-lg flex flex-col gap-4">
                        {/* 이벤트 토글 배너 */}
                        <div className="flex flex-wrap gap-2">
                            {/* 미라클 타임 토글 */}
                            <button
                                onClick={() => handleMiracleToggle(!isMiracleTime)}
                                disabled={isAnalyzing}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all select-none ${
                                    isMiracleTime
                                        ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.4)]'
                                        : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500'
                                }`}
                            >
                                <span className="text-base">✨</span>
                                미라클 타임 (등업 2배)
                                <span className={`w-7 h-4 rounded-full flex items-center transition-all ${isMiracleTime ? 'bg-purple-500' : 'bg-slate-600'}`}>
                                    <span className={`w-3 h-3 bg-white rounded-full shadow transition-all mx-0.5 ${isMiracleTime ? 'translate-x-3' : 'translate-x-0'}`} />
                                </span>
                            </button>
                            {/* 샤이닝 스타포스 토글 */}
                            <button
                                onClick={() => handleShiningToggle(!isShining)}
                                disabled={isAnalyzing}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all select-none ${
                                    isShining
                                        ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.4)]'
                                        : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500'
                                }`}
                            >
                                <span className="text-base">🌟</span>
                                샤이닝 스타포스 타임 (30% 할인)
                                <span className={`w-7 h-4 rounded-full flex items-center transition-all ${isShining ? 'bg-yellow-500' : 'bg-slate-600'}`}>
                                    <span className={`w-3 h-3 bg-white rounded-full shadow transition-all mx-0.5 ${isShining ? 'translate-x-3' : 'translate-x-0'}`} />
                                </span>
                            </button>
                        </div>

                        {/* 기댓값 총합 + 버튼 */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex flex-col">
                                <span className="text-slate-400 font-medium mb-1">
                                    현재 장착 중인 전체 장비 기댓값 총합
                                    {(isMiracleTime || isShining) && (
                                        <span className="ml-2 text-xs text-yellow-400 font-semibold">(이벤트 할인 적용)</span>
                                    )}
                                </span>
                                <div className="flex items-end gap-3">
                                    <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-md">
                                        {formatMeso(totalCost)}
                                    </span>
                                    <span className="text-xl text-yellow-500/80 font-bold mb-1">메소</span>
                                </div>

                                {/* 이벤트 할인 절감액 상세 안내 */}
                                {(isMiracleTime || isShining) && totalSavings > 0 && (
                                    <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs shadow-inner">
                                        <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                                            <span className="text-base">🎉</span>
                                            <span>이벤트 절감 혜택:</span>
                                            <span className="text-emerald-300 text-sm font-black">{formatMeso(totalSavings)} 절감</span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 text-slate-300">
                                            {isMiracleTime && totalTierUpSavings > 0 && (
                                                <span className="flex items-center gap-1.5 bg-purple-950/70 px-2.5 py-1 rounded-lg border border-purple-500/40">
                                                    <span className="text-purple-300 font-medium">✨ 미라클 타임:</span>
                                                    <span className="text-purple-200 font-bold">-{formatMeso(totalTierUpSavings)}</span>
                                                </span>
                                            )}
                                            {isShining && totalStarforceSavings > 0 && (
                                                <span className="flex items-center gap-1.5 bg-yellow-950/70 px-2.5 py-1 rounded-lg border border-yellow-500/40">
                                                    <span className="text-yellow-300 font-medium">🌟 샤타포스:</span>
                                                    <span className="text-yellow-200 font-bold">-{formatMeso(totalStarforceSavings)}</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="text-xs text-slate-500 mt-2 space-y-1">
                                    <p>* 넥슨 공식 확률을 기반으로 처음부터 직접 만들었을 때의 평균 기댓값입니다. (추옵/작 제외)</p>
                                    {results.find(r => r.result?.priceDate)?.result?.priceDate && (
                                        <p className="text-slate-400">
                                            * <span className="text-yellow-400/90 font-medium">{results.find(r => r.result?.priceDate)?.result?.priceDate}</span> 기준 경매장 노작 아이템 시세가 반영되어 있습니다.
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                            {isAnalyzing ? (
                                <div className="flex flex-col items-end w-full sm:w-1/3">
                                    <div className="flex items-center gap-2 mb-2 text-yellow-400">
                                        <Loader2 className="animate-spin" size={18} />
                                        <span className="text-sm font-bold">감정 진행 중... {progress}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                        <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                            ) : (
                                <button onClick={() => startAnalysis()} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-white font-bold transition-all flex items-center gap-2 shrink-0">
                                    <Calculator size={18} />
                                    다시 감정하기
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {results.map((res, idx) => (
                            <div 
                                key={idx} 
                                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col gap-3 transition-colors cursor-pointer group shadow-lg"
                                onClick={() => setDetailItem(res.item)}
                            >
                                {/* Header: Icon + Slot + Full Item Name */}
                                <div className="flex gap-3 items-center border-b border-slate-800 pb-3">
                                    <div className="w-11 h-11 bg-slate-950 rounded-lg flex items-center justify-center shrink-0 border border-slate-800">
                                        <img src={res.item.item_icon} alt={res.item.item_name} className="w-8 h-8 object-contain" />
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="text-[11px] text-slate-400 font-medium">{res.item.item_equipment_slot}</span>
                                        <span className="text-sm font-bold text-white truncate group-hover:text-maple-orange transition-colors" title={res.item.item_name}>
                                            {res.item.item_name}{res.item.special_ring_level ? ` ${res.item.special_ring_level}레벨` : ''}
                                        </span>
                                    </div>
                                </div>

                                {/* Prominent Total Cost Strip */}
                                <div className="flex justify-between items-center bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800/70">
                                    <span className="text-xs text-slate-400 font-medium">기댓값 합산</span>
                                    {res.result?.isCalculable && !isNaN(res.result.totalCost) ? (
                                        <span className="text-base font-black text-yellow-400 tracking-tight">
                                            {formatMeso(res.result.totalCost)}
                                        </span>
                                    ) : (
                                        <span className="text-xs font-semibold text-slate-500">산출 불가</span>
                                    )}
                                </div>
                                
                                <div className="space-y-1.5 text-xs">
                                    <div className="flex justify-between items-center h-6">
                                        {res.result?.details.basePrice.isOverridden ? (
                                            <span className="text-amber-400 font-semibold">노작 시세(수정됨)</span>
                                        ) : (
                                            <span className="text-slate-400 font-medium">노작 시세</span>
                                        )}
                                        {(!res.result?.details.basePrice.success || res.result?.details.basePrice.cost === 0 || editingIdx === idx) ? (
                                            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                                <input 
                                                    type="number" 
                                                    autoFocus
                                                    placeholder="직접 입력" 
                                                    defaultValue={res.result?.details.basePrice.cost > 0 ? res.result?.details.basePrice.cost : ''}
                                                    className="w-24 bg-slate-800 border border-slate-700 text-right px-1.5 py-0.5 rounded text-slate-300 text-xs focus:border-amber-400 focus:outline-none" 
                                                    onBlur={(e) => handleOverridePrice(idx, e.target.value)} 
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleOverridePrice(idx, e.currentTarget.value);
                                                            e.currentTarget.blur();
                                                        }
                                                        if (e.key === 'Escape') {
                                                            setEditingIdx(null);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1">
                                                {res.result?.details.basePrice.reason && !res.result?.details.basePrice.isOverridden && (
                                                    <span className="text-[10px] text-slate-500">({res.result.details.basePrice.reason})</span>
                                                )}
                                                <span 
                                                    className={`${res.result?.details.basePrice.isOverridden ? "text-amber-300 font-bold" : "text-slate-200 font-medium"} hover:text-maple-orange cursor-pointer border-b border-transparent hover:border-maple-orange transition-colors`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditingIdx(idx);
                                                    }}
                                                    title="클릭하여 노작 시세 수정"
                                                >
                                                    {formatMeso(res.result.details.basePrice.cost || 0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400 font-medium">스타포스 ({res.item.starforce}성)</span>
                                        <span className={res.result?.details.starforce.success ? "text-slate-200 font-medium" : "text-red-400"}>
                                            {res.result?.details.starforce.success ? (res.result.details.starforce.cost > 0 ? formatMeso(res.result.details.starforce.cost) : '-') : res.result?.details.starforce.reason}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400 font-medium">잠재능력 ({res.item.potential_option_grade || '-'})</span>
                                        <span className={res.result?.details.potential.success ? "text-slate-200 font-medium" : "text-red-400"}>
                                            {res.result?.details.potential.success ? (res.result.details.potential.cost > 0 ? formatMeso(res.result.details.potential.cost) : '-') : res.result?.details.potential.reason}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400 font-medium">에디셔널 ({res.item.additional_potential_option_grade || '-'})</span>
                                        <span className={res.result?.details.additional.success ? "text-slate-200 font-medium" : "text-red-400"}>
                                            {res.result?.details.additional.success ? (res.result.details.additional.cost > 0 ? formatMeso(res.result.details.additional.cost) : '-') : res.result?.details.additional.reason}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 상세 아이템 모달 */}
            {detailItem && (
                <ItemDetailModal 
                    item={detailItem}
                    appraisalResult={results.find(r => r.item.item_name === detailItem.item_name)?.result}
                    onClose={() => setDetailItem(null)} 
                />
            )}
        </div>
    );
};

export default TotalDiagnosisModal;
