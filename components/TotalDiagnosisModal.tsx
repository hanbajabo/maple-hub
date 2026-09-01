import React, { useEffect, useState } from 'react';
import { Swords, X, Calculator, Loader2 } from 'lucide-react';
import { ItemData } from '../app/page';
import type { AppraisalResult } from '../lib/item-appraisal';

interface TotalDiagnosisModalProps {
    isOpen: boolean;
    onClose: () => void;
    equipmentGrid: (ItemData | null)[];
    characterClass: string;
}

interface AppraisalItem {
    item: ItemData;
    result: AppraisalResult | null;
}

const formatMeso = (meso: number) => {
    if (isNaN(meso) || meso === 0) return "0";
    if (meso >= 100000000) { // 1억 이상
        const uk = Math.floor(meso / 100000000);
        const man = Math.floor((meso % 100000000) / 10000);
        if (man > 0) return `${uk.toLocaleString()}억 ${man.toLocaleString()}만`;
        return `${uk.toLocaleString()}억`;
    }
    if (meso >= 10000) { // 1만 이상
        return `${Math.floor(meso / 10000).toLocaleString()}만`;
    }
    return meso.toLocaleString();
};

const TotalDiagnosisModal: React.FC<TotalDiagnosisModalProps> = ({
    isOpen,
    onClose,
    equipmentGrid,
    characterClass
}) => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState<AppraisalItem[]>([]);
    const [totalCost, setTotalCost] = useState(0);

    const startAnalysis = async () => {
        setIsAnalyzing(true);
        setProgress(0);
        setResults([]);
        setTotalCost(0);

        const validItems = equipmentGrid.filter((i): i is ItemData => i !== null);
        const newResults: AppraisalItem[] = [];
        let runningTotal = 0;

        for (let i = 0; i < validItems.length; i++) {
            const item = validItems[i];
            
            try {
                const response = await fetch('/api/appraisal', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ item, characterClass })
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-2" onClick={onClose}>
            <div className="bg-slate-900 w-full max-w-7xl h-[90vh] rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden animate-in fade-in duration-200" onClick={e => e.stopPropagation()}>
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
                <div className="flex-1 overflow-y-auto p-6 bg-slate-950/50 flex flex-col custom-scrollbar">
                    
                    {/* Top Summary Board */}
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
                        <div className="flex flex-col">
                            <span className="text-slate-400 font-medium mb-1">현재 장착 중인 전체 장비 기댓값 총합</span>
                            <div className="flex items-end gap-3">
                                <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-md">
                                    {formatMeso(totalCost)}
                                </span>
                                <span className="text-xl text-yellow-500/80 font-bold mb-1">메소</span>
                            </div>
                            <span className="text-xs text-slate-500 mt-2">* 넥슨 공식 확률을 기반으로 처음부터 직접 만들었을 때의 평균 기댓값입니다. (추옵/작 제외)</span>
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
                            <button onClick={startAnalysis} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-white font-bold transition-all flex items-center gap-2 shrink-0">
                                <Calculator size={18} />
                                다시 감정하기
                            </button>
                        )}
                    </div>

                    {/* Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {results.map((res, idx) => (
                            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col gap-3 hover:border-slate-600 transition-colors">
                                <div className="flex gap-3 items-center border-b border-slate-800 pb-3">
                                    <div className="w-12 h-12 bg-slate-800 rounded-md flex items-center justify-center shrink-0 border border-slate-700">
                                        <img src={res.item.item_icon} alt={res.item.item_name} className="w-8 h-8 object-contain" />
                                    </div>
                                    <div className="flex flex-col flex-1 overflow-hidden">
                                        <span className="text-xs text-slate-400">{res.item.item_equipment_slot}</span>
                                        <span className="text-sm font-bold text-white truncate">{res.item.item_name}</span>
                                    </div>
                                    {res.result?.isCalculable && !isNaN(res.result.totalCost) ? (
                                        <div className="text-right">
                                            <span className="text-lg font-bold text-yellow-400 block">{formatMeso(res.result.totalCost)}</span>
                                        </div>
                                    ) : (
                                        <div className="text-right">
                                            <span className="text-xs font-bold text-slate-500 block px-2 py-1 bg-slate-800 rounded">산출 불가</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="space-y-1.5 text-xs">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500">노작 시세</span>
                                        <span className={res.result?.details.basePrice.success ? "text-slate-300" : "text-red-400"}>
                                            {res.result?.details.basePrice.success ? formatMeso(res.result.details.basePrice.cost) : res.result?.details.basePrice.reason}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500">스타포스 ({res.item.starforce}성)</span>
                                        <span className={res.result?.details.starforce.success ? "text-slate-300" : "text-red-400"}>
                                            {res.result?.details.starforce.success ? (res.result.details.starforce.cost > 0 ? formatMeso(res.result.details.starforce.cost) : '-') : res.result?.details.starforce.reason}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500">잠재능력 ({res.item.potential_option_grade || '-'})</span>
                                        <span className={res.result?.details.potential.success ? "text-slate-300" : "text-red-400"}>
                                            {res.result?.details.potential.success ? (res.result.details.potential.cost > 0 ? formatMeso(res.result.details.potential.cost) : '-') : res.result?.details.potential.reason}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-500">에디셔널 ({res.item.additional_potential_option_grade || '-'})</span>
                                        <span className={res.result?.details.additional.success ? "text-slate-300" : "text-red-400"}>
                                            {res.result?.details.additional.success ? (res.result.details.additional.cost > 0 ? formatMeso(res.result.details.additional.cost) : '-') : res.result?.details.additional.reason}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalDiagnosisModal;
