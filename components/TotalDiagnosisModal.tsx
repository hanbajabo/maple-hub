import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
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
    const [isFromCache, setIsFromCache] = useState(false);
    const [mounted, setMounted] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // 로컬 스토리지 캐시 키 생성 및 저장/불러오기 유틸
    const getCacheKey = (charName?: string) => `maple_appraisal_cache_${charName || 'unknown'}`;

    const loadFromCache = (charName?: string) => {
        if (typeof window === 'undefined' || !charName) return null;
        try {
            const raw = localStorage.getItem(getCacheKey(charName));
            if (!raw) return null;
            return JSON.parse(raw);
        } catch {
            return null;
        }
    };

    const saveToCache = (charName: string, data: { results: AppraisalItem[]; totalCost: number; isMiracleTime: boolean; isShining: boolean }) => {
        if (typeof window === 'undefined' || !charName) return;
        try {
            localStorage.setItem(getCacheKey(charName), JSON.stringify({
                ...data,
                timestamp: Date.now()
            }));
        } catch (e) {
            console.warn('Failed to save appraisal to localStorage', e);
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

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

                // 사용자가 수정한 노작 가격도 로컬 캐시에 즉시 반영 저장
                if (characterInfo?.character_name) {
                    saveToCache(characterInfo.character_name, {
                        results: newResults,
                        totalCost: newTotal,
                        isMiracleTime,
                        isShining
                    });
                }
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
        if (validItems.length === 0) {
            setIsAnalyzing(false);
            setProgress(0);
            return;
        }
        
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
        // 기존에 유저가 수정한 노작 시세가 있다면 보존하여 배치 요청
        const batchPayload = validItems.map(item => {
            const existing = results.find(r => r.item.item_name === item.item_name);
            const overridePrice = existing?.result?.details?.basePrice?.isOverridden 
                ? existing.result.details.basePrice.cost 
                : undefined;
            return { item, overrideBasePrice: overridePrice };
        });

        try {
            setProgress(50);
            const response = await fetch('/api/appraisal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    items: batchPayload, 
                    characterClass, 
                    isMiracleTime: useMiracleTime, 
                    isShining: useShining 
                })
            });
            
            if (!response.ok) throw new Error('API Error');
            const data = await response.json();
            const resultsList: AppraisalResult[] = data.results || [];
            
            const newResults: AppraisalItem[] = validItems.map((item, idx) => ({
                item,
                result: resultsList[idx] || null
            }));

            let runningTotal = 0;
            newResults.forEach(r => {
                if (r.result?.isCalculable && !isNaN(r.result.totalCost)) {
                    runningTotal += r.result.totalCost;
                }
            });

            setProgress(100);
            setResults(newResults);
            setTotalCost(runningTotal);
            setIsFromCache(false);

            // 로컬 스토리지에 분석 결과 캐시 저장
            if (characterInfo?.character_name) {
                saveToCache(characterInfo.character_name, {
                    results: newResults,
                    totalCost: runningTotal,
                    isMiracleTime: useMiracleTime,
                    isShining: useShining
                });
            }
        } catch (e) {
            console.error("Batch appraisal failed", e);
        } finally {
            setIsAnalyzing(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (contentRef.current) {
                contentRef.current.scrollTop = 0;
            }
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleEsc);
            return () => {
                document.body.style.overflow = 'unset';
                window.removeEventListener('keydown', handleEsc);
            };
        }
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            const charName = characterInfo?.character_name;
            const cached = loadFromCache(charName);
            if (cached && Array.isArray(cached.results) && cached.results.length > 0) {
                // 1. 이전에 검색해서 로컬에 저장된 결과가 있다면 0ms 즉시 로딩!
                setResults(cached.results);
                setTotalCost(cached.totalCost || 0);
                setIsMiracleTime(cached.isMiracleTime ?? false);
                setIsShining(cached.isShining ?? false);
                setIsAnalyzing(false);
                setIsFromCache(true);
                setProgress(100);
            } else {
                // 2. 저장된 결과가 없을 때만 서버에 감정 요청
                startAnalysis();
            }
        } else {
            // 모달이 닫히면 화면 상태 정리
            setResults([]);
            setTotalCost(0);
            setProgress(0);
            setIsAnalyzing(false);
            setIsFromCache(false);
            setEditingIdx(null);
            setDetailItem(null);
        }
    }, [isOpen, characterInfo?.character_name]);

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

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 sm:p-4 md:p-6" onClick={onClose}>
            <div className="bg-slate-900 w-full max-w-7xl h-[94vh] sm:h-[90vh] max-h-[94vh] rounded-xl sm:rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in duration-200" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="px-3.5 sm:px-6 py-2.5 sm:py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950 shrink-0">
                    <h2 className="text-sm sm:text-lg md:text-xl font-bold text-white flex items-center gap-1.5 sm:gap-2 min-w-0">
                        <Calculator className="text-maple-orange shrink-0" size={18} />
                        <span className="whitespace-nowrap">템셋 총 직작 가치 감정</span>
                        <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold shrink-0">Beta</span>
                    </h2>
                    <button onClick={onClose} className="p-1.5 sm:p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white shrink-0 ml-2">
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div ref={contentRef} className="flex-1 overflow-y-auto p-3 sm:p-6 bg-slate-950 flex flex-col custom-scrollbar">
                    
                    {/* Character Info */}
                    {characterInfo && (
                        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 bg-slate-900 border border-slate-800 rounded-xl p-3 sm:p-4 shadow-lg">
                            {characterInfo.character_image && (
                                <img src={characterInfo.character_image} alt={characterInfo.character_name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-contain bg-slate-800 shrink-0" />
                            )}
                            <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-base sm:text-xl font-bold text-white truncate">{characterInfo.character_name}</span>
                                    <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-medium shrink-0">Lv.{characterInfo.character_level}</span>
                                </div>
                                <div className="text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
                                    <span>{characterInfo.world_name}</span>
                                    <span>•</span>
                                    <span>{characterClass}</span>
                                    {characterInfo.character_guild_name && (
                                        <>
                                            <span>•</span>
                                            <span className="truncate">{characterInfo.character_guild_name}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Top Summary Board */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 sm:p-6 mb-4 sm:mb-6 shadow-lg flex flex-col gap-3 sm:gap-4">
                        {/* 이벤트 토글 배너 - 모바일 그리드 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {/* 미라클 타임 토글 */}
                            <button
                                onClick={() => handleMiracleToggle(!isMiracleTime)}
                                disabled={isAnalyzing}
                                className={`w-full flex items-center justify-between px-3.5 py-2 sm:py-2.5 rounded-xl text-xs font-bold border transition-all select-none ${
                                    isMiracleTime
                                        ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.4)]'
                                        : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500'
                                }`}
                            >
                                <span className="flex items-center gap-1.5 min-w-0">
                                    <span className="text-sm shrink-0">✨</span>
                                    <span className="whitespace-nowrap truncate">미라클 타임 (등업 2배)</span>
                                </span>
                                <span className={`w-7 h-4 rounded-full flex items-center shrink-0 transition-all ml-2 ${isMiracleTime ? 'bg-purple-500' : 'bg-slate-600'}`}>
                                    <span className={`w-3 h-3 bg-white rounded-full shadow transition-all mx-0.5 ${isMiracleTime ? 'translate-x-3' : 'translate-x-0'}`} />
                                </span>
                            </button>
                            {/* 샤이닝 스타포스 토글 */}
                            <button
                                onClick={() => handleShiningToggle(!isShining)}
                                disabled={isAnalyzing}
                                className={`w-full flex items-center justify-between px-3.5 py-2 sm:py-2.5 rounded-xl text-xs font-bold border transition-all select-none ${
                                    isShining
                                        ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.4)]'
                                        : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500'
                                }`}
                            >
                                <span className="flex items-center gap-1.5 min-w-0">
                                    <span className="text-sm shrink-0">🌟</span>
                                    <span className="whitespace-nowrap truncate">샤이닝 스타포스 (30% 할인)</span>
                                </span>
                                <span className={`w-7 h-4 rounded-full flex items-center shrink-0 transition-all ml-2 ${isShining ? 'bg-yellow-500' : 'bg-slate-600'}`}>
                                    <span className={`w-3 h-3 bg-white rounded-full shadow transition-all mx-0.5 ${isShining ? 'translate-x-3' : 'translate-x-0'}`} />
                                </span>
                            </button>
                        </div>

                        {/* 기댓값 총합 + 버튼 */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                            <div className="flex flex-col w-full sm:w-auto">
                                <span className="text-xs sm:text-sm text-slate-400 font-medium mb-1 flex items-center flex-wrap gap-1">
                                    <span>현재 장착 중인 전체 장비 기댓값 총합</span>
                                    {(isMiracleTime || isShining) && (
                                        <span className="text-[11px] text-yellow-400 font-semibold">(이벤트 할인 적용)</span>
                                    )}
                                </span>
                                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mt-0.5">
                                    <span className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-md break-keep">
                                        {formatMeso(totalCost)}
                                    </span>
                                    <span className="text-sm sm:text-xl text-yellow-500/80 font-bold whitespace-nowrap">
                                        메소
                                    </span>
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
                                    <p className="text-amber-300/90 flex items-center gap-1.5 font-medium">
                                        <span>💡</span>
                                        <span>혹시 결과 값이 나오지 않았다면 우측 <strong>'다시 감정하기'</strong> 버튼을 눌러주세요.</span>
                                    </p>
                                    {isFromCache && (
                                        <p className="text-emerald-400/90 flex items-center gap-1.5 font-medium">
                                            <span>💾</span>
                                            <span>로컬에 저장된 진단 결과입니다. (최신 데이터로 갱신하려면 우측 '다시 감정하기'를 눌러주세요)</span>
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
                                <button 
                                    onClick={() => startAnalysis()} 
                                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-white font-bold transition-all flex items-center gap-2 shrink-0 group"
                                    title="최신 장비 및 시세로 다시 감정하기"
                                >
                                    <Calculator size={18} className="text-maple-orange group-hover:rotate-12 transition-transform" />
                                    다시 감정하기
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {!isAnalyzing && results.length === 0 ? (
                            <div className="col-span-full py-16 px-6 flex flex-col items-center justify-center text-center bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4">
                                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                                    <Calculator size={32} />
                                </div>
                                <div className="space-y-1.5 max-w-md">
                                    <h4 className="text-lg font-bold text-white">결과 값이 아직 표시되지 않았나요?</h4>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        일시적인 네트워크 지연 또는 넥슨 API 응답 지연일 수 있습니다.<br />
                                        아래 <strong className="text-yellow-400 font-bold">'다시 감정하기'</strong> 버튼을 눌러 다시 시도해 주세요.
                                    </p>
                                </div>
                                <button 
                                    onClick={() => startAnalysis(undefined, undefined, true)}
                                    className="px-6 py-3 bg-maple-orange hover:bg-orange-500 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center gap-2"
                                >
                                    <Calculator size={18} />
                                    다시 감정하기
                                </button>
                            </div>
                        ) : (
                            results.map((res, idx) => {
                                const isEscapeCapped = !!(res.result?.details.potential.escapeCappingApplied || res.result?.details.additional.escapeCappingApplied);
                                return (
                            <div 
                                key={idx} 
                                className={`bg-slate-900 border ${isEscapeCapped ? 'border-amber-500/40 hover:border-amber-500/70 shadow-amber-950/20' : 'border-slate-800 hover:border-slate-700'} rounded-xl p-4 flex flex-col gap-3 transition-colors cursor-pointer group shadow-lg`}
                                onClick={() => setDetailItem(res.item)}
                            >
                                {/* Header: Icon + Slot + Full Item Name */}
                                <div className="flex gap-3 items-center border-b border-slate-800 pb-3">
                                    <div className="w-11 h-11 bg-slate-950 rounded-lg flex items-center justify-center shrink-0 border border-slate-800">
                                        <img src={res.item.item_icon} alt={res.item.item_name} className="w-8 h-8 object-contain" />
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[11px] text-slate-400 font-medium">{res.item.item_equipment_slot}</span>
                                            {isEscapeCapped && (
                                                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-full flex items-center gap-1 shadow-sm" title="이탈 옵션 감지 — 상위 등급 환산 최저 비용 캡 적용됨">
                                                    ⚡ 보정 적용
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-sm font-bold text-white truncate group-hover:text-maple-orange transition-colors" title={res.item.item_name}>
                                            {res.item.item_name}{res.item.special_ring_level ? ` ${res.item.special_ring_level}레벨` : ''}
                                        </span>
                                    </div>
                                </div>

                                {/* Prominent Total Cost Strip */}
                                <div className="flex justify-between items-center bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800/70">
                                    <span className="text-xs text-slate-400 font-medium">기댓값 합산</span>
                                    {res.result?.isCalculable && !isNaN(res.result.totalCost) ? (
                                        res.result.details.isZeroSecondary ? (
                                            <span className="text-xs font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30">
                                                주무기 연동 (무료)
                                            </span>
                                        ) : (
                                            <span className="text-base font-black text-yellow-400 tracking-tight">
                                                {formatMeso(res.result.totalCost)}
                                            </span>
                                        )
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
                                        {res.result?.details.isZeroSecondary ? (
                                            <span className="text-slate-400 font-medium">기본 지급 (무료)</span>
                                        ) : (!res.result?.details.basePrice.success || res.result?.details.basePrice.cost === 0 || editingIdx === idx) ? (
                                            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                                <input 
                                                    type="number" 
                                                    autoFocus={editingIdx === idx}
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
                                            {res.result?.details.starforce.success ? (res.result.details.starforce.cost > 0 ? formatMeso(res.result.details.starforce.cost) : (res.result.details.starforce.reason || '-')) : res.result?.details.starforce.reason}
                                        </span>
                                    </div>
                                    {isShining && (res.result?.savings?.starforceSavings || 0) > 0 && (
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-yellow-400/90 font-medium">샤타포스 할인</span>
                                            <span className="text-yellow-300 font-semibold">-{formatMeso(res.result!.savings!.starforceSavings)} 메소 절감</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-slate-400 font-medium">잠재능력 ({res.item.potential_option_grade || '-'})</span>
                                            {res.result?.details.potential.escapeCappingApplied && (
                                                <span 
                                                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${
                                                        res.result.details.potential.escapeCappingGrade === '레전드리'
                                                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                                            : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                                    }`} 
                                                    title={`${res.result.details.potential.escapeCappingGrade} 환산 최저 비용 캡 적용`}
                                                >
                                                    ⚡ {res.result.details.potential.escapeCappingGrade} 환산
                                                </span>
                                            )}
                                        </div>
                                        <span className={res.result?.details.potential.success ? "text-slate-200 font-medium" : "text-red-400"}>
                                            {res.result?.details.potential.success ? (res.result.details.potential.cost > 0 ? formatMeso(res.result.details.potential.cost) : (res.result.details.potential.reason || '-')) : res.result?.details.potential.reason}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-slate-400 font-medium">에디셔널 ({res.item.additional_potential_option_grade || '-'})</span>
                                            {res.result?.details.additional.escapeCappingApplied && (
                                                <span 
                                                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${
                                                        res.result.details.additional.escapeCappingGrade === '레전드리'
                                                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                                            : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                                    }`} 
                                                    title={`${res.result.details.additional.escapeCappingGrade} 환산 최저 비용 캡 적용`}
                                                >
                                                    ⚡ {res.result.details.additional.escapeCappingGrade} 환산
                                                </span>
                                            )}
                                        </div>
                                        <span className={res.result?.details.additional.success ? "text-slate-200 font-medium" : "text-red-400"}>
                                            {res.result?.details.additional.success ? (res.result.details.additional.cost > 0 ? formatMeso(res.result.details.additional.cost) : (res.result.details.additional.reason || '-')) : res.result?.details.additional.reason}
                                        </span>
                                    </div>
                                    {isMiracleTime && (res.result?.savings?.tierUpSavings || 0) > 0 && (
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-purple-400/90 font-medium">미라클 할인</span>
                                            <span className="text-purple-300 font-semibold">-{formatMeso(res.result!.savings!.tierUpSavings)} 메소 절감</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            );
                        }))}
                    </div>

                    {/* 하단 애드센스 광고 배너 (모든 장비 카드 아래) */}
                    <div className="mt-8 pt-4 border-t border-slate-800/80">
                        <AdBanner dataAdSlot="8162808816" className="w-full my-0" />
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
        </div>,
        document.body
    );
};

export default TotalDiagnosisModal;
