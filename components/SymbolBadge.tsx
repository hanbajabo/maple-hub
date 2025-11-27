import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getCharacterSymbolEquipment } from '../lib/nexon';

interface Symbol {
    symbol_name: string;
    symbol_icon: string;
    symbol_level: number;
    symbol_str: string;
    symbol_dex: string;
    symbol_int: string;
    symbol_luk: string;
    symbol_hp: string;
    symbol_growth_count?: number;
    symbol_require_growth_count?: number;
}

export default function SymbolBadge({ ocid, refreshKey }: { ocid: string, refreshKey: number }) {
    const [symbols, setSymbols] = useState<Symbol[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!ocid) return;
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getCharacterSymbolEquipment(ocid);
                // 심볼 리스트 추출
                setSymbols(res.symbol || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [ocid, refreshKey]);

    // 모달 뒤로가기 핸들링
    useEffect(() => {
        if (isOpen) {
            window.history.pushState({ modal: 'symbol' }, '', window.location.href);
            document.body.style.overflow = 'hidden';

            const handlePopState = () => {
                setIsOpen(false);
            };

            window.addEventListener('popstate', handlePopState);

            return () => {
                document.body.style.overflow = 'unset';
                window.removeEventListener('popstate', handlePopState);
            };
        }
    }, [isOpen]);

    const handleClose = () => {
        window.history.back();
    };

    if (loading) return <div className="w-full h-full flex items-center justify-center bg-slate-800/50 rounded-xl border border-slate-700 animate-pulse"></div>;

    const hasSymbol = symbols.length > 0;

    // 심볼 타입별 색상 (아케인/어센틱/그랜드 어센틱)
    const getSymbolColor = (name: string) => {
        if (name.includes('아케인')) {
            return 'border-purple-500/50 bg-purple-900/30 text-purple-200';
        } else if (name.includes('그랜드 어센틱')) {
            return 'border-amber-500/50 bg-amber-900/30 text-amber-200';
        } else if (name.includes('어센틱')) {
            return 'border-pink-500/50 bg-pink-900/30 text-pink-200';
        }
        return 'border-indigo-500/50 bg-indigo-900/30 text-indigo-200';
    };

    // 심볼 타입별 만렙
    const getMaxLevel = (name: string) => {
        if (name.includes('아케인')) {
            return 20;
        } else if (name.includes('어센틱')) {
            return 11;
        }
        return 20; // 기본값
    };

    // 레벨 진행도 계산
    const getLevelProgress = (symbol: Symbol) => {
        const maxLevel = getMaxLevel(symbol.symbol_name);
        return Math.min((symbol.symbol_level / maxLevel) * 100, 100);
    };

    // 심볼 스탯 표시
    const getSymbolStats = (symbol: Symbol) => {
        const stats = [];
        if (symbol.symbol_str !== '0') stats.push(`STR +${symbol.symbol_str}`);
        if (symbol.symbol_dex !== '0') stats.push(`DEX +${symbol.symbol_dex}`);
        if (symbol.symbol_int !== '0') stats.push(`INT +${symbol.symbol_int}`);
        if (symbol.symbol_luk !== '0') stats.push(`LUK +${symbol.symbol_luk}`);
        if (symbol.symbol_hp !== '0') stats.push(`HP +${symbol.symbol_hp}`);
        return stats.join(', ');
    };

    // 아케인/어센틱 전체 진행도 계산
    const getOverallProgress = () => {
        const arcaneSymbols = symbols.filter(s => s.symbol_name.includes('아케인'));
        // 일반 어센틱만 (그랜드 어센틱 제외)
        const authenticSymbols = symbols.filter(s => s.symbol_name.includes('어센틱') && !s.symbol_name.includes('그랜드'));

        // 아케인 심볼: 총 6개 존재, 각 만렙 20
        const arcaneMaxTotal = 6 * 20;
        const arcaneCurrentTotal = arcaneSymbols.reduce((sum, s) => sum + s.symbol_level, 0);
        const arcaneProgress = arcaneMaxTotal > 0 ? Math.floor((arcaneCurrentTotal / arcaneMaxTotal) * 100) : 0;

        // 어센틱 심볼: 총 6개 존재 (그랜드 어센틱 제외), 각 만렙 11
        const authenticMaxTotal = 6 * 11;
        const authenticCurrentTotal = authenticSymbols.reduce((sum, s) => sum + s.symbol_level, 0);
        const authenticProgress = authenticMaxTotal > 0 ? Math.floor((authenticCurrentTotal / authenticMaxTotal) * 100) : 0;

        return { arcaneProgress, authenticProgress, hasArcane: arcaneSymbols.length > 0, hasAuthentic: authenticSymbols.length > 0 };
    };

    const { arcaneProgress, authenticProgress, hasArcane, hasAuthentic } = getOverallProgress();

    return (
        <div className={`relative w-full h-full ${isOpen ? 'z-[100]' : 'z-0'}`}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-bold transition-all cursor-pointer shadow-sm hover:shadow-md hover:border-slate-500`}
            >
                <span className="text-lg">✨</span>
                <span className="text-sm">심볼</span>
                <div className="flex gap-1.5 ml-1">
                    {hasArcane && <span className="text-[11px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800 font-bold">아케인 {arcaneProgress}%</span>}
                    {hasAuthentic && <span className="text-[11px] bg-pink-950 text-pink-300 px-1.5 py-0.5 rounded border border-pink-800 font-bold">어센틱 {authenticProgress}%</span>}
                </div>
            </div>

            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4" onClick={handleClose}>
                    <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2" onClick={e => e.stopPropagation()}>
                        <h4 className="text-xs font-bold text-slate-300 mb-3 border-b border-slate-800 pb-2 flex justify-between items-center">
                            <span>장착 중인 심볼 상세 정보</span>
                            <button onClick={handleClose} className="text-slate-500 hover:text-slate-300">✕</button>
                        </h4>

                        {hasSymbol ? (
                            <div className="grid grid-cols-2 gap-3">
                                {symbols.map((symbol, idx) => {
                                    const maxLevel = getMaxLevel(symbol.symbol_name);
                                    const progress = getLevelProgress(symbol);
                                    const isMax = symbol.symbol_level >= maxLevel;

                                    return (
                                        <div key={idx} className={`p-3 rounded-lg border ${getSymbolColor(symbol.symbol_name)} relative overflow-hidden group flex flex-col gap-2`}>
                                            <div className="flex justify-between items-start relative z-10">
                                                <div className="flex flex-col overflow-hidden">
                                                    <span className="text-xs font-bold truncate" title={symbol.symbol_name}>{symbol.symbol_name}</span>
                                                    <span className="text-[10px] opacity-80 truncate">{getSymbolStats(symbol)}</span>
                                                </div>
                                                <div className="text-right shrink-0 ml-2">
                                                    <div className={`text-xs font-bold ${isMax ? 'text-yellow-400' : 'text-white'}`}>Lv.{symbol.symbol_level}</div>
                                                    <div className="text-[10px] text-slate-400">/ {maxLevel}</div>
                                                </div>
                                            </div>

                                            {/* Progress Bar Section */}
                                            <div className="relative z-10">
                                                <div className="flex justify-between text-[10px] mb-1 font-bold opacity-90">
                                                    <span>성장치</span>
                                                    <span className={isMax ? 'text-yellow-400' : ''}>{Math.floor(progress)}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/10">
                                                    <div
                                                        className={`h-full ${isMax ? 'bg-yellow-500' : 'bg-current'} transition-all duration-500`}
                                                        style={{ width: `${progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-xs text-slate-500 text-center py-4">장착된 심볼이 없습니다.</div>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
