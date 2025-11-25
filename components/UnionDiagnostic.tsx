import React, { useEffect, useState } from 'react';
import { getUserUnionRaider } from '../lib/nexon';

interface UnionBlock {
    block_type: string;
    block_class: string;
    block_level: string;
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

// 직업별 주스텟 매핑
const getMainStat = (className: string): string => {
    const strClasses = ['히어로', '팔라딘', '다크나이트', '소울마스터', '미하일', '블래스터', '데몬슬레이어', '데몬어벤져', '아란', '카이저', '제로', '아델', '아크', '바이퍼', '캐논마스터', '스트라이커', '은월'];
    const dexClasses = ['보우마스터', '신궁', '패스파인더', '윈드브레이커', '와일드헌터', '메르세데스', '카인', '엔젤릭버스터'];
    const intClasses = ['비숍', '불독', '썬콜', '플레임위자드', '배틀메이지', '에반', '루미너스', '일리움', '라라', '키네시스'];
    const lukClasses = ['나이트로드', '섀도어', '듀얼블레이더', '나이트워커', '팬텀', '카데나', '칼리', '호영'];

    if (strClasses.some(c => className.includes(c))) return 'STR';
    if (dexClasses.some(c => className.includes(c))) return 'DEX';
    if (intClasses.some(c => className.includes(c))) return 'INT';
    if (lukClasses.some(c => className.includes(c))) return 'LUK';
    return 'STR';
};

export default function UnionDiagnostic({ ocid, initialData, refreshKey, myClass }: { ocid: string, initialData?: any, refreshKey?: number, myClass?: string }) {
    const [raiders, setRaiders] = useState<UnionBlock[]>([]);
    const [loading, setLoading] = useState(!initialData);
    const [isOpen, setIsOpen] = useState(false);

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

    return (
        <div className={`relative w-full h-full ${isOpen ? 'z-[100]' : 'z-0'}`}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border ${hasMissing ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-slate-700'} bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-bold transition-all cursor-pointer shadow-sm hover:shadow-md hover:border-slate-500`}
            >
                <span className="text-lg">⚔️</span>
                <span className="text-sm">유니온</span>
                <span className="text-xs bg-slate-950 px-1.5 py-0.5 rounded text-slate-400">{raiders.length}</span>
                {hasMissing && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500/20 text-red-400 text-xs font-bold animate-pulse" title="부족한 유니온 대원이 있습니다">!</span>
                )}
            </div>

            {isOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 z-[100] max-h-96 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between items-center mb-3 border-b border-slate-800 pb-2">
                        <h4 className="text-xs font-bold text-slate-300">배치된 공격대원 목록</h4>
                        <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-300">✕</button>
                    </div>

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
            )}
        </div>
    );
}