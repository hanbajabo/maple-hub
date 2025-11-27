import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getUserUnionChampion } from '../lib/nexon';

interface Champion {
    champion_name: string;
    champion_level: number;
    champion_grade?: string;
    champion_stat?: string;
}

export default function ChampionBadge({ ocid, refreshKey }: { ocid: string, refreshKey: number }) {
    const [champions, setChampions] = useState<Champion[]>([]);
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
                const res = await getUserUnionChampion(ocid);
                // 챔피언 리스트 (active인 것만 줄 수도 있으나 전체 리스트일 경우 필터링 필요할 수도 있음. 보통 API는 장착중인걸 줌)
                setChampions(res.data.union_champion || []);
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
            window.history.pushState({ modal: 'champion' }, '', window.location.href);
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

    const hasChampion = champions.length > 0;

    // 등급별 색상
    const getGradeColor = (grade?: string) => {
        if (!grade) return 'border-amber-800/50 bg-amber-900/20 text-amber-200';
        switch (grade.toLowerCase()) {
            case 'sss': return 'border-red-500/50 bg-red-900/30 text-red-200';
            case 'ss': return 'border-orange-500/50 bg-orange-900/30 text-orange-200';
            case 's': return 'border-yellow-500/50 bg-yellow-900/30 text-yellow-200';
            case 'a': return 'border-green-500/50 bg-green-900/30 text-green-200';
            case 'b': return 'border-blue-500/50 bg-blue-900/30 text-blue-200';
            default: return 'border-amber-800/50 bg-amber-900/20 text-amber-200';
        }
    };

    return (
        <>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-bold transition-all cursor-pointer shadow-sm hover:shadow-md hover:border-slate-500`}
            >
                <span className="text-lg">🏆</span>
                <span className="text-sm">
                    챔피언
                    {champions.length > 0 && (
                        <span className="ml-1 text-xs text-slate-400 font-normal">
                            ({champions.map(c => c.champion_grade || '?').join('/')})
                        </span>
                    )}
                </span>
            </div>

            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-2" onClick={handleClose}>
                    <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 sm:p-4 w-full max-w-md max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-2" onClick={e => e.stopPropagation()}>
                        <h4 className="text-xs sm:text-sm font-bold text-amber-400 mb-2 border-b border-slate-800 pb-2 flex justify-between items-center">
                            <span>참전 중인 유니온 챔피언</span>
                            <button onClick={handleClose} className="text-slate-500 hover:text-slate-300">✕</button>
                        </h4>

                        {hasChampion ? (
                            <div className="space-y-2">
                                {champions.map((champ, idx) => (
                                    <div key={idx} className={`text-[11px] px-3 py-2 rounded border ${getGradeColor(champ.champion_grade)} transition-all hover:scale-[1.02]`}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold">{champ.champion_name}</span>
                                            {champ.champion_grade && (
                                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/30">
                                                    {champ.champion_grade.toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        {champ.champion_stat && (
                                            <div className="text-[10px] opacity-80 mt-1">
                                                📊 {champ.champion_stat}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-xs text-slate-500 text-center py-4">배치된 챔피언이 없습니다.</div>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
