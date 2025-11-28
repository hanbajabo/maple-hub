import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getCharacterSymbolEquipment } from '../lib/nexon';
import { getAuthenticSymbolCost, AuthenticSymbolRegion } from '../lib/authentic_symbol_db';
import { getArcaneSymbolCost, ArcaneSymbolRegion } from '../lib/arcane_symbol_db';

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

    // 비용 계산 함수
    const calculateCosts = (symbol: Symbol) => {
        const isArcane = symbol.symbol_name.includes('아케인');
        const isAuthentic = symbol.symbol_name.includes('어센틱') && !symbol.symbol_name.includes('그랜드');

        if (!isArcane && !isAuthentic) return { nextCost: 0, totalCost: 0 };

        let region = '';
        // 심볼 이름에서 지역명 추출 (예: "아케인심볼 : 여로")
        const parts = symbol.symbol_name.split(':');
        if (parts.length > 1) {
            region = parts[1].trim();
        }

        // 지역명 정규화
        if (region === '소멸의 여로') region = '여로';
        else if (region === '츄츄 아일랜드') region = '츄츄';
        else if (region === '호텔 아르크스') region = '아르크스';

        let nextCost = 0;
        let totalCost = 0;
        const currentLevel = symbol.symbol_level;

        if (isArcane) {
            const maxLevel = 20;
            // 다음 레벨 비용
            nextCost = getArcaneSymbolCost(region as ArcaneSymbolRegion, currentLevel);

            // 만렙까지 총 비용
            for (let i = currentLevel; i < maxLevel; i++) {
                totalCost += getArcaneSymbolCost(region as ArcaneSymbolRegion, i);
            }
        } else if (isAuthentic) {
            const maxLevel = 11;
            // 다음 레벨 비용
            nextCost = getAuthenticSymbolCost(region as AuthenticSymbolRegion, currentLevel);

            // 만렙까지 총 비용
            for (let i = currentLevel; i < maxLevel; i++) {
                totalCost += getAuthenticSymbolCost(region as AuthenticSymbolRegion, i);
            }
        }

        return { nextCost, totalCost };
    };

    const formatMeso = (meso: number) => {
        if (meso === 0) return '0';
        if (meso >= 100000000) {
            const uk = Math.floor(meso / 100000000);
            const man = Math.floor((meso % 100000000) / 10000);
            return `${uk}억 ${man > 0 ? man + '만' : ''}`;
        }
        return `${Math.floor(meso / 10000)}만`;
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

        let totalArcaneRemainingCost = 0;
        arcaneSymbols.forEach(s => {
            totalArcaneRemainingCost += calculateCosts(s).totalCost;
        });

        // 어센틱 심볼: 총 6개 존재 (그랜드 어센틱 제외), 각 만렙 11
        const authenticMaxTotal = 6 * 11;
        const authenticCurrentTotal = authenticSymbols.reduce((sum, s) => sum + s.symbol_level, 0);
        const authenticProgress = authenticMaxTotal > 0 ? Math.floor((authenticCurrentTotal / authenticMaxTotal) * 100) : 0;

        let totalAuthenticRemainingCost = 0;
        authenticSymbols.forEach(s => {
            totalAuthenticRemainingCost += calculateCosts(s).totalCost;
        });

        return {
            arcaneProgress,
            authenticProgress,
            hasArcane: arcaneSymbols.length > 0,
            hasAuthentic: authenticSymbols.length > 0,
            totalArcaneRemainingCost,
            totalAuthenticRemainingCost
        };
    };

    const {
        arcaneProgress,
        authenticProgress,
        hasArcane,
        hasAuthentic,
        totalArcaneRemainingCost,
        totalAuthenticRemainingCost
    } = getOverallProgress();

    return (
        <div className={`relative w-full h-full ${isOpen ? 'z-[100]' : 'z-0'}`}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-bold transition-all cursor-pointer shadow-sm hover:shadow-md hover:border-slate-500`}
            >
                <span className="text-lg">✨</span>
                <span className="text-sm">심볼</span>
                <div className="flex gap-2 ml-2">
                    {hasArcane && (
                        <span className="text-xs bg-purple-950 text-purple-300 px-2 py-1 rounded border border-purple-800 font-bold flex items-center gap-1.5">
                            <span>아케인 {arcaneProgress}%</span>
                            {arcaneProgress < 100 && totalArcaneRemainingCost > 0 && (
                                <span className="text-purple-200 opacity-80 text-[10px] font-normal">({formatMeso(totalArcaneRemainingCost)})</span>
                            )}
                        </span>
                    )}
                    {hasAuthentic && (
                        <span className="text-xs bg-pink-950 text-pink-300 px-2 py-1 rounded border border-pink-800 font-bold flex items-center gap-1.5">
                            <span>어센틱 {authenticProgress}%</span>
                            {authenticProgress < 100 && totalAuthenticRemainingCost > 0 && (
                                <span className="text-pink-200 opacity-80 text-[10px] font-normal">({formatMeso(totalAuthenticRemainingCost)})</span>
                            )}
                        </span>
                    )}
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

                                            {/* Cost Section */}
                                            {!isMax && (
                                                <div className="mt-2 pt-2 border-t border-white/10 text-[10px] space-y-1">
                                                    <div className="flex justify-between">
                                                        <span className="opacity-70">다음 레벨업</span>
                                                        <span className="font-bold text-yellow-200">{formatMeso(calculateCosts(symbol).nextCost)} 메소</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="opacity-70">졸업까지</span>
                                                        <span className="font-bold text-yellow-200">{formatMeso(calculateCosts(symbol).totalCost)} 메소</span>
                                                    </div>
                                                </div>
                                            )}
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
