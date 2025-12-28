import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!ocid) return;
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getUserUnionArtifact(ocid);
                // 아티팩트 효과 리스트 추출 (없으면 빈 배열)
                // res는 이미 API JSON 객체임 (get 함수에서 res.data를 반환하므로)
                const rawEffects = res.union_artifact_effect || [];
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

    // 모달 뒤로가기 핸들링
    useEffect(() => {
        if (isOpen) {
            window.history.pushState({ modal: 'artifact' }, '', window.location.href);
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

    const hasArtifact = effects.length > 0;

    return (
        <>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-bold transition-all cursor-pointer shadow-sm hover:shadow-md hover:border-slate-500`}
            >
                <span className="text-lg">💎</span>
                <span className="text-sm">아티팩트</span>
                <span className="text-xs bg-slate-950 px-1.5 py-0.5 rounded text-slate-400">{effects.length}</span>
            </div>

            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4" onClick={handleClose}>
                    <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 w-full max-w-md animate-in fade-in slide-in-from-top-2" onClick={e => e.stopPropagation()}>
                        <h4 className="text-xs sm:text-sm font-bold text-cyan-400 mb-2 border-b border-slate-800 pb-2 flex justify-between items-center">
                            <span>적용 중인 아티팩트 효과</span>
                            <button onClick={handleClose} className="text-slate-500 hover:text-slate-300">✕</button>
                        </h4>

                        {hasArtifact ? (
                            <div className="space-y-1 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
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
                </div>,
                document.body
            )}
        </>
    );
}
