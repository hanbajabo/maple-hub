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
    worldName?: string;
    ocid?: string;
    linkReport?: { bad: string[]; good: string[] };
    unionReport?: { bad: string[]; good: string[] };
    abilityReport?: { bad: string[]; good: string[] };
}

// 가로 바 게이지 컴포넌트
const HorizontalGauge: React.FC<{
    value: number;
    max: number;
    trackColor: string;
    fillFrom: string;
    fillTo: string;
    label: string;
    icon: string;
}> = ({ value, max, trackColor, fillFrom, fillTo, label, icon }) => {
    const percent = Math.min(100, (value / max) * 100);
    const isMax = value >= max;

    return (
        <div className="w-full flex flex-col gap-2">
            {/* 라벨 + 수치 */}
            <div className="flex items-end justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-lg">{icon}</span>
                    <span className="text-sm font-bold text-slate-200">{label}</span>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className={`text-3xl sm:text-4xl font-black tabular-nums ${isMax ? 'text-emerald-400' : 'text-white'}`}>
                        {value}
                    </span>
                    <span className="text-base text-slate-400 font-bold">%</span>
                    {isMax ? (
                        <span className="ml-1 text-[10px] font-black bg-emerald-500 text-white px-1.5 py-0.5 rounded-full">MAX</span>
                    ) : (
                        <span className="text-xs text-slate-500">/ {max}%</span>
                    )}
                </div>
            </div>
            {/* 게이지 바 */}
            <div className={`w-full h-4 rounded-full overflow-hidden ${trackColor}`}>
                <div
                    className={`h-full rounded-full bg-gradient-to-r ${fillFrom} ${fillTo} transition-all duration-700 ease-out relative`}
                    style={{ width: `${percent}%` }}
                >
                    {percent > 8 && (
                        <div className="absolute right-2 inset-y-0 flex items-center">
                            <div className="w-1 h-2.5 bg-white/30 rounded-full" />
                        </div>
                    )}
                </div>
            </div>
            {/* 마일스톤 (드롭만) */}
        </div>
    );
};

// 아코디언 진단 카드
const DiagnosticCard: React.FC<{
    icon: string;
    title: string;
    bad: string[];
    good: string[];
}> = ({ icon, title, bad, good }) => {
    const [open, setOpen] = useState(false);
    const hasIssue = bad.length > 0;

    return (
        <div className={`rounded-xl border transition-all ${hasIssue ? 'border-amber-500/40 bg-amber-950/10' : 'border-emerald-500/30 bg-emerald-950/10'}`}>
            <button
                onClick={() => setOpen(v => !v)}
                className="w-full flex items-center justify-between p-3 sm:p-4 gap-3"
            >
                <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base">{icon}</span>
                    <span className="text-sm font-bold text-slate-200 truncate">{title}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${hasIssue ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                        {hasIssue ? `⚠️ ${bad.length}개` : '✅ 양호'}
                    </span>
                    <span className={`text-slate-400 text-xs transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
                </div>
            </button>
            {open && (
                <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0 space-y-1 border-t border-slate-700/50">
                    {bad.map((txt, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-amber-300 py-1">
                            <span className="mt-0.5 shrink-0">⚠️</span>
                            <span>{txt}</span>
                        </div>
                    ))}
                    {good.map((txt, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-emerald-300 py-1">
                            <span className="mt-0.5 shrink-0">✅</span>
                            <span>{txt}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const STAGE_LABELS = ['기초', '메획100', '드메100', '드롭160', '드롭180', '드롭200', '졸업'];
const STAGE_TITLES = [
    '🌱 메소 확정 드롭',
    '💰 메획 100%',
    '🎯 드롭+메획 100%',
    '🎯 드롭 160%',
    '🎯 드롭 180%',
    '🎯 드롭 200%',
    '🎉 졸업!'
];

const HuntingDiagnosis: React.FC<HuntingDiagnosisProps> = ({
    equipment, stat, ability, worldName, ocid,
    linkReport, unionReport, abilityReport
}) => {
    const [activeStage, setActiveStage] = useState<number | null>(null);
    const isChallengers = worldName?.includes('챌린저스') ?? false;

    // 1. Parse Equipment Stats
    const { itemDrop, itemMeso, hasSpiritPendant } = useMemo(() => {
        let drop = 0;
        let meso = 0;
        let spiritPendant = false;

        if (!equipment || !Array.isArray(equipment)) {
            return { itemDrop: 0, itemMeso: 0, hasSpiritPendant: false };
        }

        equipment.forEach(item => {
            if (item.item_name.includes('정령의 펜던트')) spiritPendant = true;

            const opts = [
                item.potential_option_1, item.potential_option_2, item.potential_option_3,
                item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3
            ];

            opts.forEach(opt => {
                if (!opt) return;
                const normalized = opt.replace(/\s+/g, '');
                if (normalized.includes('아이템드롭률') && normalized.includes('%')) {
                    const match = normalized.match(/(\d+)%/);
                    if (match) drop += Number(match[1]);
                }
                if (normalized.includes('메소획득량') && normalized.includes('%')) {
                    const match = normalized.match(/(\d+)%/);
                    if (match) meso += Number(match[1]);
                }
            });
        });

        return { itemDrop: drop, itemMeso: meso, hasSpiritPendant: spiritPendant };
    }, [equipment]);

    // Parse Ability Drop Rate
    const abilityDrop = useMemo(() => {
        let val = 0;
        if (ability?.ability_info) {
            ability.ability_info.forEach((info: any) => {
                if (info.ability_value && info.ability_value.includes('아이템 드롭률')) {
                    const match = info.ability_value.match(/(\d+)%/);
                    if (match) val += Number(match[1]);
                }
            });
        }
        return val;
    }, [ability]);

    // 0단계(기초) 완료 상태 관리
    const [isStage0Completed, setIsStage0Completed] = useState<boolean>(false);

    // ocid, abilityDrop, isChallengers 중 하나라도 바뀌면 완료 상태 업데이트
    React.useEffect(() => {
        const storageKey = ocid ? `maple_hub_stage0_completed_${ocid}` : 'maple_hub_stage0_completed';
        const isAutoCompleted = abilityDrop + (isChallengers ? 64 : 56) >= 67;
        const isSavedCompleted = typeof window !== 'undefined' && window.localStorage.getItem(storageKey) === 'true';
        
        if (isAutoCompleted || isSavedCompleted) {
            setIsStage0Completed(true);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(storageKey, 'true');
            }
        } else {
            setIsStage0Completed(false);
        }
    }, [ocid, abilityDrop, isChallengers]);

    const handleStage0Complete = () => {
        setIsStage0Completed(true);
        const storageKey = ocid ? `maple_hub_stage0_completed_${ocid}` : 'maple_hub_stage0_completed';
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(storageKey, 'true');
        }
        // 사용자가 완료하면 자동으로 1단계로 포커스
        setActiveStage(null);
    };

    // 2. Determine Current Stage
    const currentStage = useMemo(() => {
        if (!isStage0Completed) {
            return 0;
        }
        if (itemMeso >= 100) {
            if (itemDrop < 100) return 2;
            if (itemDrop < 160) return 3;
            if (itemDrop < 180) return 4;
            if (itemDrop < 200) return 5;
            return 6;
        } else {
            return 1;
        }
    }, [isStage0Completed, itemDrop, itemMeso]);

    // 스테이지 콘텐츠 렌더
    const renderStageContent = (stage: number) => {
        switch (stage) {
            case 0: return (
                <Stage0Guide
                    abilityDrop={abilityDrop}
                    isCurrentStage={true}
                    isChallengers={isChallengers}
                    onComplete={handleStage0Complete}
                />
            );
            case 1: return <Stage1Guide itemMeso={itemMeso} />;
            case 2: return <Stage2Guide itemDrop={itemDrop} />;
            case 3: return <Stage3Guide itemDrop={itemDrop} hasSpiritPendant={hasSpiritPendant} />;
            case 4: return <Stage4Guide itemDrop={itemDrop} hasSpiritPendant={hasSpiritPendant} />;
            case 5: return <Stage5Guide itemDrop={itemDrop} />;
            case 6: return <Stage6Guide />;
            default: return null;
        }
    };

    // 잠재능력 설정이 불가능한 특수 아이템 (시드링 등) 블랙리스트
    const SPECIAL_NO_POTENTIAL_ITEMS = [
        '리스트레인트 링',
        '컨티뉴어스 링',
        '배틀로드 링',
        '호텐투스 링',
        '예비 특수 반지',
    ];

    // 드롭/메획 없는 장신구 부위 (특수 아이템 제외)
    const missingSlotItems = useMemo(() => {
        if (!equipment) return [];
        return equipment.filter(item => {
            const slot = item.item_equipment_slot;
            if (!(slot.includes('반지') || slot.includes('펜던트') || slot === '얼굴장식' || slot === '눈장식' || slot === '귀고리')) return false;

            // 시드링 등 잠재능력 설정 불가 아이템 제외
            if (SPECIAL_NO_POTENTIAL_ITEMS.some(name => item.item_name.includes(name))) return false;

            const opts = [
                item.potential_option_1, item.potential_option_2, item.potential_option_3,
                item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3
            ];

            // 잠재능력 자체가 아예 없는 아이템 (미감정 또는 잠재 불가 아이템)도 제외
            const hasPotentialAtAll = opts.some(opt => opt && opt.trim() !== '');
            if (!hasPotentialAtAll) return false;

            // 드롭/메획 옵션이 없는 경우만 포함
            return !opts.some(opt => opt && (opt.includes('아이템 드롭률') || opt.includes('메소 획득량')));
        });
    }, [equipment]);

    const displayedStage = activeStage ?? currentStage;

    return (
        <div className="w-full flex flex-col gap-4">

            {/* ── 1. 가로 게이지 영역 ── */}
            <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 rounded-2xl border border-slate-700/60 p-4 sm:p-6 flex flex-col gap-4">
                <HorizontalGauge
                    value={itemDrop}
                    max={200}
                    trackColor="bg-emerald-950/60"
                    fillFrom="from-emerald-700"
                    fillTo="to-emerald-400"
                    label="아이템 드롭률"
                    icon="💎"
                />
                <div className="border-t border-slate-700/40" />
                <HorizontalGauge
                    value={itemMeso}
                    max={100}
                    trackColor="bg-yellow-950/60"
                    fillFrom="from-yellow-700"
                    fillTo="to-yellow-400"
                    label="메소 획득량"
                    icon="💰"
                />
                <div className="bg-slate-800/50 rounded-xl border border-slate-600/40 p-3 space-y-1.5">
                    <p className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <span>ℹ️</span> 왜 장비 잠재능력 기준으로만 표시하나요?
                    </p>
                    <ul className="text-[11px] text-slate-400 space-y-1 leading-relaxed">
                        <li>• 장비 잠재능력으로 올릴 수 있는 드롭률·메소 획득량에는 <span className="text-slate-200 font-semibold">고정 한도(캡)가 있습니다.</span></li>
                        <li>• 아이템 드롭률 최대 <span className="text-emerald-300 font-semibold">200%</span>, 메소 획득량 최대 <span className="text-yellow-300 font-semibold">100%</span> — 이 캡을 채우는 것이 사냥 세팅의 핵심 목표입니다.</li>
                        <li>• 어빌리티·아티팩트·쓸심 등 다른 수단은 별도 관리 영역이므로, 여기서는 <span className="text-emerald-300 font-semibold">장비 잠재능력 캡 달성률</span>만 집계합니다.</li>
                        <li className="text-amber-300/80">※ 실제 인게임 합산 수치(어빌+아티팩트 등 포함)는 이보다 높습니다.</li>
                    </ul>
                </div>
            </div>

            {/* ── 2. Step Tracker ── */}
            <div className="bg-slate-900/70 rounded-2xl border border-slate-700/60 p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-200">📊 단계 진행 현황</span>
                    <div className="flex items-center gap-2 flex-wrap">
                        {/* 실제 진행 단계 (장비 기준) — 보는 단계와 다를 때만 표시 */}
                        {displayedStage !== currentStage && (
                            <span className="text-xs text-slate-400 px-2 py-1 rounded-full bg-slate-700/60 border border-slate-600">
                                내 단계: {STAGE_LABELS[currentStage]}
                            </span>
                        )}
                        {/* 현재 보고 있는 단계 */}
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold border border-emerald-500/30">
                            {displayedStage === currentStage ? '현재: ' : '보는 중: '}{STAGE_LABELS[displayedStage]}
                        </span>
                    </div>
                </div>

                {/* 스텝 노드 */}
                <div className="flex items-start justify-between gap-1">
                    {STAGE_LABELS.map((label, i) => {
                        const isPassed = i < currentStage;
                        const isCurrent = i === currentStage;
                        const isViewing = i === displayedStage; // 지금 보고 있는 단계

                        return (
                            <React.Fragment key={i}>
                                <button
                                    onClick={() => setActiveStage(i === activeStage ? null : i)}
                                    className="flex flex-col items-center gap-1 flex-1 min-w-0"
                                >
                                    {/* 노드 원 */}
                                    <div className={`relative flex items-center justify-center rounded-full transition-all duration-200
                                        w-9 h-9 sm:w-11 sm:h-11
                                        ${isPassed
                                            ? 'bg-emerald-500 shadow-md shadow-emerald-500/30'
                                            : isCurrent
                                                ? 'bg-emerald-700 border-2 border-emerald-400'
                                                : 'bg-slate-700/80 border-2 border-slate-600'}
                                    `}>
                                        {/* 지금 보고 있는 단계 펄스 (보는 단계 기준) */}
                                        {isViewing && (
                                            <span className="absolute inset-0 rounded-full bg-white/10 animate-ping pointer-events-none" />
                                        )}
                                        {/* 흰색 외곽 하이라이트 (보는 단계) */}
                                        {isViewing && (
                                            <span className="absolute inset-0 rounded-full ring-2 ring-white/50 ring-offset-1 ring-offset-slate-900 pointer-events-none" />
                                        )}
                                        {isPassed ? (
                                            <span className="text-white font-black text-base sm:text-lg z-10">✓</span>
                                        ) : isCurrent ? (
                                            <span className="text-white font-black text-sm sm:text-base z-10">{i}</span>
                                        ) : (
                                            <span className="text-slate-400 font-bold text-sm sm:text-base z-10">{i}</span>
                                        )}
                                    </div>
                                    {/* 라벨 */}
                                    <span className={`text-[9px] sm:text-[11px] font-bold text-center leading-tight w-full px-0.5 truncate mt-0.5
                                        ${isViewing ? 'text-white' :
                                            isCurrent ? 'text-emerald-400' :
                                                isPassed ? 'text-emerald-300/60' :
                                                    'text-slate-500'}
                                    `}>
                                        {label}
                                    </span>
                                    {/* 현재 진행 위치 표시 점 */}
                                    <div className={`w-1.5 h-1.5 rounded-full mt-0.5 transition-all ${isCurrent ? 'bg-emerald-400' : 'bg-transparent'}`} />
                                </button>
                                {/* 연결선 */}
                                {i < STAGE_LABELS.length - 1 && (
                                    <div className="flex items-start pt-4 sm:pt-5 shrink-0">
                                        <div className={`w-3 sm:w-5 h-0.5 rounded-full transition-colors
                                            ${i < currentStage ? 'bg-emerald-500' : 'bg-slate-700'}`}
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>



            {/* ── 3. 현재/선택 단계 가이드 ── */}
            <div className="bg-slate-900/70 rounded-2xl border border-slate-700/60 overflow-hidden">
                {/* 헤더 */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/60 bg-slate-800/40">
                    <div className="flex items-center gap-2">
                        <span className="text-base font-black text-white">{STAGE_TITLES[displayedStage]}</span>
                        {displayedStage === currentStage && (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">현재 단계</span>
                        )}
                    </div>
                    {/* 이전/다음 화살표 */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setActiveStage(Math.max(0, displayedStage - 1))}
                            disabled={displayedStage === 0}
                            className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-600/60 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition-all text-sm"
                        >
                            ◀
                        </button>
                        <button
                            onClick={() => setActiveStage(Math.min(6, displayedStage + 1))}
                            disabled={displayedStage === 6}
                            className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-600/60 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition-all text-sm"
                        >
                            ▶
                        </button>
                    </div>
                </div>

                {/* 가이드 내용 */}
                <div className="p-3 sm:p-4">
                    {renderStageContent(displayedStage)}
                </div>
            </div>

            {/* ── 4. 드롭/메획 없는 장신구 슬롯 ── */}
            {missingSlotItems.length > 0 && currentStage < 6 && (
                <div className="bg-slate-900/70 rounded-2xl border border-slate-700/60 p-3 sm:p-4">
                    <h4 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                        <span>🔍</span> 드롭/메획 챙길 수 있는 부위
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {missingSlotItems.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-slate-800/60 rounded-lg px-2.5 py-2 border border-slate-700/50">
                                <span className="text-orange-400 text-[10px] font-bold shrink-0 bg-orange-500/10 px-1.5 py-0.5 rounded">
                                    {item.item_equipment_slot}
                                </span>
                                <span className="text-xs text-slate-300 truncate">{item.item_name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── 5. 링크/유니온/어빌 진단 카드 (접힘) ── */}
            {(linkReport || unionReport || abilityReport) && (
                <div className="flex flex-col gap-2">
                    <h4 className="text-xs font-bold text-slate-400 px-1">📋 세부 진단</h4>
                    {linkReport && (
                        <DiagnosticCard
                            icon="🔗"
                            title="링크 스킬"
                            bad={linkReport.bad}
                            good={linkReport.good}
                        />
                    )}
                    {unionReport && (
                        <DiagnosticCard
                            icon="🏆"
                            title="유니온"
                            bad={unionReport.bad}
                            good={unionReport.good}
                        />
                    )}
                    {abilityReport && (
                        <DiagnosticCard
                            icon="🔮"
                            title="어빌리티"
                            bad={abilityReport.bad}
                            good={abilityReport.good}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default HuntingDiagnosis;
