import React, { useEffect, useState } from 'react';
import { getUserUnionArtifact } from '../lib/nexon';

interface ArtifactEffect {
    name: string;
    level: number;
}

export default function ArtifactBadge({ ocid, refreshKey }: { ocid: string, refreshKey: number }) {
    const [effects, setEffects] = useState<ArtifactEffect[]>([]);
    const [level, setLevel] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!ocid) return;
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getUserUnionArtifact(ocid);
                // 아티팩트 효과 리스트 추출 (없으면 빈 배열)
                const rawEffects = res.data.union_artifact_effect || [];
                setEffects(rawEffects);

                // 아티팩트 레벨 합계 계산 (또는 제공된 레벨 사용)
                // API가 union_artifact_level을 주는지 확인 필요하나, 보통 효과 리스트가 중요함
                setLevel(rawEffects.length);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [ocid, refreshKey]);

    if (loading) return <div className="w-full h-full flex items-center justify-center bg-slate-800/50 rounded-xl border border-slate-700 animate-pulse"></div>;

    const hasArtifact = effects.length > 0;

    return (
        <div className={`relative w-full h-full ${isOpen ? 'z-[100]' : 'z-0'}`}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-bold transition-all cursor-pointer shadow-sm hover:shadow-md hover:border-slate-500`}
            >
                <span className="text-lg">💎</span>
                <span className="text-sm">아티팩트</span>
                <span className="text-xs bg-slate-950 px-1.5 py-0.5 rounded text-slate-400">{effects.length}</span>
            </div>

            {isOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 z-[100] animate-in fade-in slide-in-from-top-2">
                    <h4 className="text-xs font-bold text-cyan-400 mb-2 border-b border-slate-800 pb-2 flex justify-between items-center">
                        <span>적용 중인 아티팩트 효과</span>
                        <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-300">✕</button>
                    </h4>

                    {hasArtifact ? (
                        <div className="space-y-1 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                            {effects.map((eff, idx) => (
                                <div key={idx} className="text-xs text-slate-300 flex justify-between items-center bg-slate-950/50 px-2 py-1.5 rounded border border-slate-800/50">
                                    <span className="truncate max-w-[180px]">{eff.name}</span>
                                    <span className="text-[10px] text-cyan-500 font-bold bg-cyan-950/30 px-1.5 py-0.5 rounded">Lv.{eff.level}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-xs text-slate-500 text-center py-4">활성화된 아티팩트가 없습니다.</div>
                    )}
                </div>
            )}
        </div>
    );
}
