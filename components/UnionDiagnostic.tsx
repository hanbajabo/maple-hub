import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getUserUnionRaider } from '../lib/nexon';

interface UnionBlock {
    block_type: string;
    block_class: string;
    block_level: string;
    block_position?: { x: number; y: number }[];
}

// 유니온 대원 효과 데이터
const UNION_EFFECTS: Record<string, { effect: string; tier?: number; type: string }> = {
    // 필수 유니온 (tier가 높을수록 중요)
    "제로": { effect: "경험치 획득량 12% 증가", tier: 4, type: "Utility" },
    "메르세데스": { effect: "쿨타임 감소 6%", tier: 4, type: "Utility" },
    "신궁": { effect: "크리티컬 확률 5% 증가", tier: 3, type: "Utility" },
    "나이트로드": { effect: "크리티컬 확률 5% 증가", tier: 3, type: "Utility" },
    "팬텀": { effect: "메소 획득량 5% 증가", tier: 3, type: "Utility" },
    "데몬어벤져": { effect: "보스 공격력 6% 증가", tier: 2, type: "Utility" },
    "블래스터": { effect: "방어율 무시 6% 증가", tier: 2, type: "Utility" },
    "은월": { effect: "크리티컬 데미지 6% 증가", tier: 2, type: "Utility" },
    "와일드헌터": { effect: "공격 시 20% 확률로 데미지 증가", tier: 1, type: "Utility" },
    "메카닉": { effect: "버프 지속시간 25% 증가", tier: 1, type: "Utility" },
    "캡틴": { effect: "소환수 지속시간 12% 증가", tier: 1, type: "Utility" },

    // 주스텟 대원
    "히어로": { effect: "STR 100 증가", type: "STR" },
    "팔라딘": { effect: "STR 100 증가", type: "STR" },
    "카이저": { effect: "STR 100 증가", type: "STR" },
    "아델": { effect: "STR 100 증가", type: "STR" },
    "아크": { effect: "STR 100 증가", type: "STR" },
    "바이퍼": { effect: "STR 100 증가", type: "STR" },
    "캐논마스터": { effect: "STR 100 증가", type: "STR" },
    "스트라이커": { effect: "STR 100 증가", type: "STR" },

    "보우마스터": { effect: "DEX 100 증가", type: "DEX" },
    "패스파인더": { effect: "DEX 100 증가", type: "DEX" },
    "윈드브레이커": { effect: "DEX 100 증가", type: "DEX" },
    "카인": { effect: "DEX 100 증가", type: "DEX" },
    "엔젤릭버스터": { effect: "DEX 100 증가", type: "DEX" },

    "아크메이지(썬,콜)": { effect: "INT 100 증가", type: "INT" },
    "비숍": { effect: "INT 100 증가", type: "INT" },
    "배틀메이지": { effect: "INT 100 증가", type: "INT" },
    "루미너스": { effect: "INT 100 증가", type: "INT" },
    "플레임위자드": { effect: "INT 100 증가", type: "INT" },
    "키네시스": { effect: "INT 100 증가", type: "INT" },
    "일리움": { effect: "INT 100 증가", type: "INT" },
    "라라": { effect: "INT 100 증가", type: "INT" },

    "섀도어": { effect: "LUK 100 증가", type: "LUK" },
    "듀얼블레이더": { effect: "LUK 100 증가", type: "LUK" },
    "나이트워커": { effect: "LUK 100 증가", type: "LUK" },
    "카데나": { effect: "LUK 100 증가", type: "LUK" },
    "칼리": { effect: "LUK 100 증가", type: "LUK" },
    "호영": { effect: "LUK 100 증가", type: "LUK" },

    "제논": { effect: "STR, DEX, LUK 5/10/20/40/50 증가", type: "AllStat" },
};

const BLOCK_COLORS = [
    'bg-red-600/90 border-red-400',
    'bg-orange-600/90 border-orange-400',
    'bg-amber-600/90 border-amber-400',
    'bg-yellow-600/90 border-yellow-400',
    'bg-lime-600/90 border-lime-400',
    'bg-green-600/90 border-green-400',
    'bg-emerald-600/90 border-emerald-400',
    'bg-teal-600/90 border-teal-400',
    'bg-cyan-600/90 border-cyan-400',
    'bg-sky-600/90 border-sky-400',
    'bg-blue-600/90 border-blue-400',
    'bg-indigo-600/90 border-indigo-400',
    'bg-violet-600/90 border-violet-400',
    'bg-purple-600/90 border-purple-400',
    'bg-fuchsia-600/90 border-fuchsia-400',
    'bg-pink-600/90 border-pink-400',
    'bg-rose-600/90 border-rose-400',
];

// 직업별 주스텟 매핑
const getMainStat = (className: string): string => {
    const strClasses = ['히어로', '팔라딘', '다크나이트', '소울마스터', '미하일', '블래스터', '데몬슬레이어', '데몬어벤져', '아란', '카이저', '제로', '아델', '아크', '바이퍼', '캐논마스터', '캐논슈터', '스트라이커', '은월', '렌'];
    const dexClasses = ['보우마스터', '신궁', '패스파인더', '윈드브레이커', '와일드헌터', '메르세데스', '카인', '엔젤릭버스터', '캡틴', '메카닉'];
    const intClasses = ['아크메이지', '비숍', '불독', '썬콜', '불,독', '썬,콜', '플레임위자드', '배틀메이지', '에반', '루미너스', '일리움', '라라', '키네시스', '린'];
    const lukClasses = ['나이트로드', '섀도어', '듀얼블레이드', '듀얼블레이더', '나이트워커', '팬텀', '카데나', '칼리', '호영'];

    if (intClasses.some(c => className.includes(c))) return 'INT';
    if (strClasses.some(c => className.includes(c))) return 'STR';
    if (dexClasses.some(c => className.includes(c))) return 'DEX';
    if (lukClasses.some(c => className.includes(c))) return 'LUK';
    if (className.includes('제논')) return 'AllStat';
    return 'STR';
};

export default function UnionDiagnostic({ ocid, initialData, refreshKey, myClass, unionLevel, children }: { ocid: string, initialData?: any, refreshKey?: number, myClass?: string, unionLevel?: number, children?: React.ReactNode }) {
    const [raiders, setRaiders] = useState<UnionBlock[]>([]);
    const [loading, setLoading] = useState(!initialData);
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [hoveredInfo, setHoveredInfo] = useState<{ x: number, y: number, job?: string } | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (initialData) {
            const blocks = initialData.union_block || [];
            blocks.sort((a: any, b: any) => parseInt(b.block_level) - parseInt(a.block_level));
            setRaiders(blocks);
            setLoading(false);
            return;
        }

        if (!ocid) return;
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getUserUnionRaider(ocid);
                const blocks = res.union_block || [];
                blocks.sort((a: any, b: any) => parseInt(b.block_level) - parseInt(a.block_level));
                setRaiders(blocks);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [ocid, initialData, refreshKey]);

    // 모달 뒤로가기 핸들링
    useEffect(() => {
        if (isOpen) {
            window.history.pushState({ modal: 'union-diagnostic' }, '', window.location.href);
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

    const hasRaiders = raiders.length > 0;
    const mainStat = myClass ? getMainStat(myClass) : 'STR';

    // 현재 보유한 대원 이름 추출
    const ownedClasses = new Set(raiders.map(r => r.block_class));

    // 필수 대원 중 없는 것 찾기
    const missingEssential = Object.entries(UNION_EFFECTS)
        .filter(([name, data]) => data.tier && !ownedClasses.has(name))
        .sort((a, b) => (b[1].tier || 0) - (a[1].tier || 0))
        .map(([name, data]) => `${name} (${data.effect})`);

    // 주스텟 대원 중 없는 것 찾기
    const missingStatMembers = Object.entries(UNION_EFFECTS)
        .filter(([name, data]) => (data.type === mainStat || data.type === 'AllStat') && !ownedClasses.has(name))
        .map(([name, data]) => `${name} (${data.effect})`);

    const hasMissing = missingEssential.length > 0 || missingStatMembers.length > 0;
    const displayLevel = unionLevel || raiders.reduce((sum, r) => sum + parseInt(r.block_level), 0);

    // 유니온 그리드 맵 생성
    const gridMap = new Map<string, { job: string, index: number }>();
    if (hasRaiders) {
        raiders.forEach((r, idx) => {
            r.block_position?.forEach(pos => {
                gridMap.set(`${pos.x},${pos.y}`, { job: r.block_class, index: idx });
            });
        });
    }

    return (
        <>
            {children ? (
                <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer w-full h-full">
                    {children}
                </div>
            ) : (
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full h-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border ${hasMissing ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-slate-700'} bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-bold transition-all cursor-pointer shadow-sm hover:shadow-md hover:border-slate-500`}
                >
                    <span className="text-lg">⚔️</span>
                    <span className="text-sm">유니온</span>
                    <span className="text-xs bg-slate-950 px-1.5 py-0.5 rounded text-slate-400">
                        Lv.{displayLevel.toLocaleString()}
                    </span>
                    {hasMissing && (
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500/20 text-red-400 text-xs font-bold animate-pulse" title="부족한 유니온 대원이 있습니다">!</span>
                    )}
                </div>
            )}

            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-2" onClick={handleClose}>
                    <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 sm:p-4 w-full max-w-md max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-2" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-3 border-b border-slate-800 pb-2">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-300">배치된 공격대원 목록</h4>
                            <button onClick={handleClose} className="text-slate-500 hover:text-slate-300">✕</button>
                        </div>

                        {/* 유니온 배치도 */}
                        {hasRaiders && raiders[0].block_position && (
                            <div className="mb-4 p-3 bg-slate-950 rounded-lg flex flex-col items-center border border-slate-800" onMouseLeave={() => setHoveredInfo(null)}>
                                <div className="grid gap-[1px] mb-2" style={{ gridTemplateColumns: `repeat(22, 10px)` }}>
                                    {Array.from({ length: 20 }).map((_, rowIdx) => {
                                        const y = 10 - rowIdx; // y: 10 ~ -9
                                        return Array.from({ length: 22 }).map((_, colIdx) => {
                                            const x = colIdx - 11; // x: -11 ~ 10
                                            const key = `${x},${y}`;
                                            const cellData = gridMap.get(key);
                                            const job = cellData?.job;
                                            const isCenter = x === 0 && y === 0;

                                            const colorClass = cellData
                                                ? BLOCK_COLORS[cellData.index % BLOCK_COLORS.length]
                                                : 'bg-slate-800/40 border-slate-700/50';

                                            return (
                                                <div
                                                    key={key}
                                                    className={`w-[10px] h-[10px] rounded-[1px] border ${colorClass} ${isCenter && !cellData ? '!bg-slate-600 !border-slate-500' : ''} hover:ring-1 hover:ring-white hover:z-20 z-10 cursor-crosshair shadow-sm`}
                                                    onMouseEnter={() => setHoveredInfo({ x, y, job })}
                                                />
                                            );
                                        });
                                    })}
                                </div>
                                <div className="h-6 flex items-center justify-center text-xs w-full">
                                    {hoveredInfo ? (
                                        <div className="flex gap-2 items-center bg-slate-900 px-3 py-1 rounded-full border border-slate-700 shadow-sm animate-in fade-in duration-200">
                                            <span className="font-mono text-slate-500">({hoveredInfo.x}, {hoveredInfo.y})</span>
                                            {hoveredInfo.job ? (
                                                <span className="font-bold text-yellow-400">{hoveredInfo.job}</span>
                                            ) : (
                                                <span className="text-slate-600">빈 공간</span>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-slate-700">블록에 마우스를 올려보세요</span>
                                    )}
                                </div>
                            </div>
                        )}

                        {hasRaiders && (
                            <div className="grid grid-cols-2 gap-1 mb-4">
                                {raiders.map((block, idx) => {
                                    const level = parseInt(block.block_level);
                                    const high = level >= 200;
                                    return (
                                        <div key={idx} className={`text-[11px] px-2 py-1 rounded border ${high ? 'bg-slate-800 border-slate-600 text-slate-200' : 'bg-slate-900 border-slate-800 text-slate-500'} flex justify-between`}>
                                            <span>{block.block_class}</span>
                                            <span className={high ? 'text-yellow-500' : ''}>Lv.{level}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* 필수 대원 추천 */}
                        {missingEssential.length > 0 && (
                            <>
                                <h4 className="text-xs font-bold text-red-400 mb-2 border-b border-slate-800 pb-1 mt-3">
                                    🔥 필수 유니온 대원
                                </h4>
                                <div className="space-y-1 mb-3">
                                    {missingEssential.map((rec, idx) => (
                                        <div key={idx} className="text-[11px] px-3 py-1.5 rounded border border-red-800/30 bg-red-900/10 text-red-200">
                                            • {rec}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* 주스텟 대원 추천 */}
                        {missingStatMembers.length > 0 && (
                            <>
                                <h4 className="text-xs font-bold text-orange-400 mb-2 border-b border-slate-800 pb-1 mt-3">
                                    💡 추천 주스텟 대원 ({mainStat})
                                </h4>
                                <div className="space-y-1">
                                    {missingStatMembers.map((rec, idx) => (
                                        <div key={idx} className="text-[11px] px-3 py-1.5 rounded border border-orange-800/30 bg-orange-900/10 text-orange-200">
                                            • {rec}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* 모두 보유 시 */}
                        {missingEssential.length === 0 && missingStatMembers.length === 0 && hasRaiders && (
                            <div className="text-center py-4">
                                <div className="text-green-400 font-bold mb-1">✅ 완벽합니다!</div>
                                <div className="text-xs text-slate-400">필수 및 주스텟 유니온을 모두 보유하고 있습니다.</div>
                            </div>
                        )}

                        {/* 유니온이 없을 때 */}
                        {!hasRaiders && (
                            <div className="text-xs text-slate-400 mt-2 text-center">
                                💡 Tip: 위 대원들을 키워서 공격대에 배치하세요!
                            </div>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}