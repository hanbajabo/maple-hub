import React, { useEffect, useState } from 'react';
import { X, AlertTriangle, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { EquipmentItem } from '../lib/diagnosis/types';
import { evaluateUpgradePriority, PriorityItem } from '../lib/diagnosis/priority_evaluator';

interface PriorityDiagnosisModalProps {
    isOpen: boolean;
    onClose: () => void;
    equipment: EquipmentItem[];
    job: string;
}

interface GroupedPriorityItem {
    item: EquipmentItem;
    priorities: PriorityItem[];
    maxRank: 1 | 2 | 3;
    totalScore: number;
}

export default function PriorityDiagnosisModal({ isOpen, onClose, equipment, job }: PriorityDiagnosisModalProps) {
    const [groupedItems, setGroupedItems] = useState<GroupedPriorityItem[]>([]);

    useEffect(() => {
        if (isOpen && equipment.length > 0) {
            const result = evaluateUpgradePriority(equipment, job);

            // 아이템별 그룹화
            const groups: Record<string, GroupedPriorityItem> = {};

            result.forEach(p => {
                // 슬롯 + 이름으로 고유 키 생성 (같은 슬롯이라도 다른 아이템일 수 있음, 예: 반지)
                // 하지만 반지는 슬롯이 '반지1', '반지2' 등으로 구분되어야 함.
                // 현재 데이터 구조상 item_equipment_slot이 고유하면 그것만 써도 됨.
                // 안전하게 슬롯을 키로 사용.
                const key = p.item.item_equipment_slot;

                if (!groups[key]) {
                    groups[key] = {
                        item: p.item,
                        priorities: [],
                        maxRank: 3, // 초기값은 가장 낮은 중요도
                        totalScore: 0
                    };
                }
                groups[key].priorities.push(p);
                // 점수가 높을수록 우선순위 높음
                if (p.priorityScore > groups[key].totalScore) {
                    groups[key].totalScore = p.priorityScore; // 가장 높은 점수를 대표 점수로
                }

                // 랭크는 숫자가 작을수록 높음 (1: Must Do)
                if (p.rank < groups[key].maxRank) {
                    groups[key].maxRank = p.rank;
                }
            });

            // 배열로 변환 및 정렬 (대표 점수 높은 순)
            const sortedGroups = Object.values(groups).sort((a, b) => b.totalScore - a.totalScore);
            setGroupedItems(sortedGroups);
        }
    }, [isOpen, equipment, job]);

    // 모달 열릴 때 히스토리에 상태 추가, 뒤로가기로 모달 닫기
    useEffect(() => {
        if (isOpen) {
            // 히스토리에 모달 상태 추가
            window.history.pushState({ modal: 'priority' }, '');

            const handlePopState = () => {
                // 뒤로가기 시 모달 닫기
                onClose();
            };

            window.addEventListener('popstate', handlePopState);

            return () => {
                window.removeEventListener('popstate', handlePopState);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const rank1Groups = groupedItems.filter(g => g.maxRank === 1);
    const rank2Groups = groupedItems.filter(g => g.maxRank === 2);
    const rank3Groups = groupedItems.filter(g => g.maxRank === 3);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4" onClick={onClose}>
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl p-4 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="flex justify-between items-start mb-6 border-b border-slate-800 pb-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 flex items-center gap-2">
                            <span>⚡</span> 스펙업 1순위 진단
                        </h2>
                        <p className="text-slate-400 mt-1 text-sm sm:text-base">
                            아이템별로 필요한 <span className="text-amber-400 font-bold">최적의 성장 로드맵</span>을 통합하여 보여드립니다.
                        </p>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-8">

                    {/* Rank 1: Must Do */}
                    <section>
                        <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-6 h-6" />
                            1순위: 당장 해야 할 스펙업 (Must Do)
                        </h3>
                        {rank1Groups.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {rank1Groups.map((group, idx) => (
                                    <GroupedPriorityCard key={idx} group={group} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
                                <p className="text-slate-400">🎉 축하합니다! 시급한 스펙업 항목이 없습니다.</p>
                            </div>
                        )}
                    </section>

                    {/* Rank 2: Recommended */}
                    <section>
                        <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-6 h-6" />
                            2순위: 추천 스펙업 (Recommended)
                        </h3>
                        {rank2Groups.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {rank2Groups.map((group, idx) => (
                                    <GroupedPriorityCard key={idx} group={group} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
                                <p className="text-slate-400">👍 기본적인 세팅이 아주 훌륭합니다.</p>
                            </div>
                        )}
                    </section>

                    {/* Rank 3: End Game */}
                    <section>
                        <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                            <Star className="w-6 h-6" />
                            3순위: 하이엔드 도전 (End Game)
                        </h3>
                        {rank3Groups.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {rank3Groups.map((group, idx) => (
                                    <GroupedPriorityCard key={idx} group={group} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
                                <p className="text-slate-400">🚀 더 높은 곳을 향해 나아갈 준비가 되셨나요?</p>
                            </div>
                        )}
                    </section>

                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                    <button
                        onClick={onClose}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 px-8 rounded-xl font-bold transition-colors border border-slate-700 shadow-lg"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}

function GroupedPriorityCard({ group }: { group: GroupedPriorityItem }) {
    const { item, priorities, maxRank } = group;

    const borderColor = maxRank === 1 ? 'border-red-500/50 hover:border-red-500' :
        maxRank === 2 ? 'border-amber-500/50 hover:border-amber-500' :
            'border-purple-500/50 hover:border-purple-500';

    const bgGradient = maxRank === 1 ? 'bg-gradient-to-br from-red-950/30 to-slate-900' :
        maxRank === 2 ? 'bg-gradient-to-br from-amber-950/30 to-slate-900' :
            'bg-gradient-to-br from-purple-950/30 to-slate-900';

    return (
        <div className={`relative rounded-xl border ${borderColor} ${bgGradient} p-4 transition-all group shadow-lg`}>
            <div className="flex flex-col sm:flex-row items-start gap-4">
                {/* Item Icon & Info */}
                <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto">
                    <div className="relative shrink-0">
                        <div className="w-16 h-16 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.item_icon} alt={item.item_name} className="w-full h-full object-contain" />
                        </div>
                    </div>
                    <div className="min-w-0">
                        <h4 className="font-bold text-lg text-slate-200 truncate">{item.item_name}</h4>
                        <p className="text-sm text-slate-500">{item.item_equipment_slot}</p>
                    </div>
                </div>

                {/* Priority List */}
                <div className="flex-1 w-full space-y-3 border-t sm:border-t-0 sm:border-l border-slate-700/50 pt-3 sm:pt-0 sm:pl-4">
                    {priorities.map((p, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950/30 p-2 rounded-lg">
                            <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold px-1.5 py-0.5 rounded border ${p.type === 'STARFORCE' ? 'bg-yellow-950/50 text-yellow-400 border-yellow-800' :
                                    p.type === 'POTENTIAL' ? 'bg-blue-950/50 text-blue-400 border-blue-800' :
                                        p.type === 'ADDITIONAL' ? 'bg-green-950/50 text-green-400 border-green-800' :
                                            'bg-orange-950/50 text-orange-400 border-orange-800'
                                    }`}>
                                    {p.type === 'STARFORCE' ? '스타포스' : p.type === 'POTENTIAL' ? '잠재능력' : p.type === 'ADDITIONAL' ? '에디셔널' : '추가옵션'}
                                </span>
                                <span className="text-xs text-slate-400">{p.efficiencyLabel}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-slate-500 line-through text-xs">{p.currentStatus}</span>
                                <ArrowRight className="w-3 h-3 text-slate-600" />
                                <span className={`font-bold ${p.rank === 1 ? 'text-red-400' : p.rank === 2 ? 'text-amber-400' : 'text-purple-400'}`}>
                                    {p.targetStatus}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
