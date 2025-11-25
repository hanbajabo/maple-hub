import React, { useMemo, useState } from 'react';
import { Stage0Guide } from './hunting_stages/Stage0Guide';
import { Stage1Guide } from './hunting_stages/Stage1Guide';
import { Stage2Guide } from './hunting_stages/Stage2Guide';
import { Stage3Guide } from './hunting_stages/Stage3Guide';
import { Stage4Guide } from './hunting_stages/Stage4Guide';
import { Stage5Guide } from './hunting_stages/Stage5Guide';
import { Stage6Guide } from './hunting_stages/Stage6Guide';

interface ItemData {
    item_equipment_slot: string;
    item_name: string;
    potential_option_1?: string;
    potential_option_2?: string;
    potential_option_3?: string;
    additional_potential_option_1?: string;
    additional_potential_option_2?: string;
    additional_potential_option_3?: string;
}

interface HuntingDiagnosisProps {
    equipment: ItemData[];
    stat: any;
    ability: any;
}

const HuntingDiagnosis: React.FC<HuntingDiagnosisProps> = ({ equipment, stat, ability }) => {
    const [showNextStage, setShowNextStage] = useState(false);
    const [expandedStages, setExpandedStages] = useState<Set<number>>(new Set());

    // 1. Parse Equipment Stats
    const { itemDrop, itemMeso, hasSpiritPendant, hasTwinDrop } = useMemo(() => {
        let drop = 0;
        let meso = 0;
        let spiritPendant = false;
        let twinDrop = false;

        if (!equipment || !Array.isArray(equipment)) {
            return { itemDrop: 0, itemMeso: 0, hasSpiritPendant: false, hasTwinDrop: false };
        }

        equipment.forEach(item => {
            if (item.item_name.includes("정령의 펜던트")) {
                spiritPendant = true;
            }

            const opts = [
                item.potential_option_1, item.potential_option_2, item.potential_option_3,
                item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3
            ];

            let itemDropVal = 0;
            let itemMesoVal = 0;

            opts.forEach(opt => {
                if (!opt) return;
                const normalized = opt.replace(/\s+/g, "");

                if (normalized.includes("아이템드롭률") && normalized.includes("%")) {
                    const match = normalized.match(/(\d+)%/);
                    if (match) itemDropVal += Number(match[1]);
                }
                if (normalized.includes("메소획득량") && normalized.includes("%")) {
                    const match = normalized.match(/(\d+)%/);
                    if (match) itemMesoVal += Number(match[1]);
                }
            });

            if (itemDropVal >= 40) twinDrop = true;

            drop += itemDropVal;
            meso += itemMesoVal;
        });

        return { itemDrop: drop, itemMeso: meso, hasSpiritPendant: spiritPendant, hasTwinDrop: twinDrop };
    }, [equipment]);

    // Parse Ability Drop Rate
    const abilityDrop = useMemo(() => {
        let val = 0;
        if (ability?.ability_info) {
            ability.ability_info.forEach((info: any) => {
                if (info.ability_value && info.ability_value.includes("아이템 드롭률")) {
                    const match = info.ability_value.match(/(\d+)%/);
                    if (match) val += Number(match[1]);
                }
            });
        }
        return val;
    }, [ability]);

    // 2. Determine Current Stage
    const currentStage = useMemo(() => {
        if (itemMeso >= 100) {
            if (itemDrop < 100) return 2;
            if (itemDrop < 160) return 3;
            if (itemDrop < 180) return 4;
            if (itemDrop < 200) return 5;
            return 6;
        } else {
            if (itemDrop < 67) return 0;
            return 1;
        }
    }, [itemDrop, itemMeso]);

    // Initialize expanded stages with current stage
    React.useEffect(() => {
        setExpandedStages(prev => {
            const newSet = new Set(prev);
            newSet.add(currentStage);
            return newSet;
        });
    }, [currentStage]);

    // Toggle stage expansion
    const toggleStage = (stageId: number) => {
        setExpandedStages(prev => {
            const newSet = new Set(prev);
            if (newSet.has(stageId)) {
                newSet.delete(stageId);
            } else {
                newSet.add(stageId);
            }
            return newSet;
        });
    };

    // Check if stage is expanded
    const isStageExpanded = (stageId: number) => {
        return expandedStages.has(stageId);
    };

    // Render stage content
    const renderStageContent = (stage: number) => {
        switch (stage) {
            case 0:
                return (
                    <Stage0Guide
                        abilityDrop={abilityDrop}
                        isCurrentStage={stage === currentStage}
                        onComplete={() => {
                            // 0단계를 닫고 1단계를 엽니다
                            setExpandedStages(prev => {
                                const newSet = new Set(prev);
                                newSet.delete(0); // 0단계 닫기
                                newSet.add(1);    // 1단계 열기
                                return newSet;
                            });
                        }}
                    />
                );
            case 1:
                return <Stage1Guide itemMeso={itemMeso} />;
            case 2:
                return <Stage2Guide itemDrop={itemDrop} />;
            case 3:
                return <Stage3Guide itemDrop={itemDrop} hasSpiritPendant={hasSpiritPendant} />;
            case 4:
                return <Stage4Guide itemDrop={itemDrop} hasSpiritPendant={hasSpiritPendant} />;
            case 5:
                return <Stage5Guide itemDrop={itemDrop} />;
            case 6:
                return <Stage6Guide />;
            default:
                return null;
        }
    };

    // Stage metadata
    const stages = [
        { id: 0, title: "🌱 [0단계] 메소 확정 드롭 만들기 (필수 기초)", color: "emerald" },
        { id: 1, title: "💰 [1단계] 메획 100% 맞추기 (가성비 세팅)", color: "yellow" },
        { id: 2, title: "🎯 [2단계] 드롭 100% + 메획 100%", color: "emerald" },
        { id: 3, title: "🎯 [3단계] 드롭 160% + 메획 100% (정펜 착용)", color: "emerald" },
        { id: 4, title: "🎯 [4단계] 드롭 180% + 메획 100% (정펜 빼고 드롭 우선)", color: "emerald" },
        { id: 5, title: "🎯 [5단계] 드롭 200% + 메획 100% (엔드 세팅)", color: "emerald" },
        { id: 6, title: "🎉 [6단계] 졸업 - 드롭 200% 달성!", color: "emerald" }
    ];

    // Render all stages as accordion
    const renderAllStages = () => {
        return (
            <div className="space-y-2">
                {stages.map(stageInfo => {
                    const isExpanded = isStageExpanded(stageInfo.id);
                    const isCurrent = stageInfo.id === currentStage;
                    const isPassed = stageInfo.id < currentStage;

                    return (
                        <div
                            key={stageInfo.id}
                            className={`rounded-lg border transition-all ${isCurrent
                                ? 'bg-slate-900/70 border-emerald-500/50 shadow-lg'
                                : isPassed
                                    ? 'bg-slate-900/30 border-slate-700/50'
                                    : 'bg-slate-900/50 border-slate-700'
                                }`}
                        >
                            {/* Stage Header */}
                            <button
                                onClick={() => toggleStage(stageInfo.id)}
                                className="w-full p-3 flex items-center justify-between hover:bg-slate-800/50 transition-colors rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`text-sm font-bold ${stageInfo.color === 'yellow' ? 'text-yellow-400' :
                                        stageInfo.color === 'emerald' ? 'text-emerald-400' : 'text-slate-400'
                                        }`}>
                                        {stageInfo.title}
                                    </span>
                                    {isCurrent && (
                                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                                            현재 단계
                                        </span>
                                    )}
                                    {isPassed && (
                                        <span className="text-xs text-green-400">✓</span>
                                    )}
                                </div>
                                <span className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            {/* Stage Content */}
                            {isExpanded && (
                                <div className="px-3 pb-3">
                                    {renderStageContent(stageInfo.id)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="w-full h-full flex flex-col gap-3 sm:gap-4">
            {/* Header Stats */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div className="bg-slate-950 p-2 sm:p-3 rounded-lg border border-slate-800 flex flex-col items-center justify-center">
                    <span className="text-[10px] sm:text-xs text-slate-400 mb-0.5 sm:mb-1">아이템 드롭률 합계</span>
                    <span className={`text-base sm:text-xl font-bold ${itemDrop >= 200 ? 'text-emerald-400' : 'text-white'}`}>
                        {itemDrop}% <span className="text-[10px] sm:text-xs text-slate-500 font-normal">/ 200% (Max)</span>
                    </span>
                </div>
                <div className="bg-slate-950 p-2 sm:p-3 rounded-lg border border-slate-800 flex flex-col items-center justify-center">
                    <span className="text-[10px] sm:text-xs text-slate-400 mb-0.5 sm:mb-1">아이템 메획 합계</span>
                    <span className={`text-base sm:text-xl font-bold ${itemMeso >= 100 ? 'text-yellow-400' : 'text-white'}`}>
                        {itemMeso}% <span className="text-[10px] sm:text-xs text-slate-500 font-normal">/ 100% (Max)</span>
                    </span>
                </div>
            </div>

            {/* Missing Option Guide */}
            {currentStage < 6 && (
                <div className="bg-slate-900/50 p-2 sm:p-3 rounded-lg border border-slate-700/50">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-300 mb-1 sm:mb-2 flex items-center gap-2">
                        <span>🔍</span> 드롭/메획 챙길 수 있는 부위 점검
                    </h4>
                    <div className="text-[10px] sm:text-xs text-slate-400">
                        {(() => {
                            const targetSlots = ["반지1", "반지2", "반지3", "반지4", "펜던트", "펜던트2", "얼굴장식", "눈장식", "귀고리"];
                            const missingSlots: string[] = [];

                            // 슬롯별 아이템 매핑
                            const slotItemMap: { [key: string]: ItemData | undefined } = {};
                            equipment.forEach(item => {
                                let slot = item.item_equipment_slot;
                                if (slot === "반지") {
                                    // 반지 슬롯 구분 로직이 필요하지만 API 데이터상 구분이 어려울 수 있음
                                    // 여기서는 단순화하여 반지 이름으로 구분하거나, 그냥 반지가 4개 있는지 체크하는 식으로 접근해야 함
                                    // 하지만 API는 '반지1', '반지2' 등으로 줄 수도 있고 아닐 수도 있음.
                                    // 일단 item_equipment_slot 그대로 사용
                                }
                                slotItemMap[slot] = item;
                            });

                            // API가 반지1, 반지2... 로 주는지 확인 필요. 보통은 고유 식별자가 있음.
                            // 여기서는 단순하게 equipment 배열을 순회하며 드롭/메획이 없는 장신구를 찾습니다.

                            const accessories = equipment.filter(item => {
                                const slot = item.item_equipment_slot;
                                return slot.includes("반지") || slot.includes("펜던트") || slot === "얼굴장식" || slot === "눈장식" || slot === "귀고리";
                            });

                            const noOptionItems = accessories.filter(item => {
                                const opts = [
                                    item.potential_option_1, item.potential_option_2, item.potential_option_3,
                                    item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3
                                ];
                                const hasOption = opts.some(opt => opt && (opt.includes("아이템 드롭률") || opt.includes("메소 획득량")));
                                return !hasOption;
                            });

                            if (noOptionItems.length === 0) return <span className="text-green-400">모든 장신구 부위에 드롭/메획 옵션이 있습니다! (또는 장착된 장신구가 없음)</span>;

                            return (
                                <div className="space-y-0.5 sm:space-y-1">
                                    <p>다음 아이템에 드롭/메획 옵션이 없습니다:</p>
                                    <ul className="list-disc list-inside text-slate-300">
                                        {noOptionItems.map((item, idx) => (
                                            <li key={idx}>
                                                <span className="text-orange-300">{item.item_equipment_slot}</span>: {item.item_name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}

            {/* Current Stage Indicator */}
            <div className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-slate-700">
                <div className="flex justify-between items-center mb-2 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <span>📊</span>
                        <span>현재 단계: <span className="text-emerald-400">{currentStage}단계</span></span>
                    </h3>
                    {hasSpiritPendant && <span className="text-[10px] sm:text-xs bg-slate-900 text-emerald-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-emerald-900">정펜 착용 중</span>}
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-950 h-2 sm:h-3 rounded-full overflow-hidden mb-1 sm:mb-2 relative">
                    <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
                        style={{ width: `${(currentStage / 6) * 100}%` }}
                    ></div>
                    {/* Stage Markers */}
                    <div className="absolute inset-0 flex justify-between px-1">
                        {[0, 1, 2, 3, 4, 5, 6].map(s => (
                            <div key={s} className={`w-0.5 h-full ${s <= currentStage ? 'bg-transparent' : 'bg-slate-800'}`}></div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between text-[8px] sm:text-[10px] text-slate-500 px-1">
                    <span>기초</span>
                    <span>메획100</span>
                    <span>드메100</span>
                    <span>드롭160</span>
                    <span>드롭180</span>
                    <span>드롭200</span>
                    <span>졸업</span>
                </div>
            </div>

            {/* Guide Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {renderAllStages()}
            </div>

            {/* Detailed Checklist */}
            <div className="mt-1 sm:mt-2 text-[8px] sm:text-[10px] text-slate-500 text-center">
                * 아이템 잠재능력 합계 기준 (최대치 제한 미적용 수치)
            </div>
        </div>
    );
};

export default HuntingDiagnosis;
