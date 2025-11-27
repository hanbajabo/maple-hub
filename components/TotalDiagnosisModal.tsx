"use client";

import { useEffect } from "react";
import { X, ShieldCheck, Star, Zap, Layers, Sword, AlertTriangle, CheckCircle2 } from "lucide-react";
import { TotalCheckupResult } from "@/lib/diagnosis/total-checkup";

interface TotalDiagnosisModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: TotalCheckupResult;
    userName: string;
    equipment: any[];
}

export default function TotalDiagnosisModal({ isOpen, onClose, data, userName, equipment }: TotalDiagnosisModalProps) {

    // 뒤로가기 핸들링 및 스크롤 방지
    useEffect(() => {
        if (isOpen) {
            // 1. 모달이 열리면 히스토리 스택 추가
            window.history.pushState({ modal: 'total-diagnosis' }, '', window.location.href);

            // 2. 배경 스크롤 방지
            document.body.style.overflow = 'hidden';

            // 3. 뒤로가기(popstate) 이벤트 리스너
            const handlePopState = () => {
                // 뒤로가기가 눌리면 모달 닫기 (onClose 호출)
                onClose();
            };

            window.addEventListener('popstate', handlePopState);

            return () => {
                // 정리: 스크롤 복구 및 리스너 제거
                document.body.style.overflow = 'unset';
                window.removeEventListener('popstate', handlePopState);
            };
        }
    }, [isOpen, onClose]);

    // 닫기 버튼 핸들러: history.back()을 호출하여 popstate 이벤트를 발생시킴 -> onClose 실행됨
    const handleClose = () => {
        window.history.back();
    };

    if (!isOpen) return null;

    // Helper to render grade counts as Badges
    const renderGrades = (grades: Record<string, number>) => {
        const order = ['레전드리', '유니크', '에픽', '레어'];
        return (
            <div className="flex flex-wrap gap-1.5 mt-2">
                {order.map(g => {
                    if (!grades[g]) return null;
                    let bgClass = "bg-gray-500/20 text-gray-300 border-gray-500/30";
                    if (g === '레전드리') bgClass = "bg-green-500/20 text-green-400 border-green-500/30";
                    if (g === '유니크') bgClass = "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
                    if (g === '에픽') bgClass = "bg-purple-500/20 text-purple-400 border-purple-500/30";
                    if (g === '레어') bgClass = "bg-blue-500/20 text-blue-400 border-blue-500/30";

                    return (
                        <span key={g} className={`px-2 py-0.5 rounded text-[10px] font-bold border ${bgClass} flex items-center gap-1`}>
                            {g} {grades[g]}
                        </span>
                    );
                })}
            </div>
        );
    };

    // Progress Bar Component
    const ProgressBar = ({ current, max, colorClass }: { current: number, max: number, colorClass: string }) => {
        const percent = Math.min(100, Math.max(0, (current / max) * 100));
        return (
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden mt-2 border border-white/5">
                <div
                    className={`h-full ${colorClass} transition-all duration-500 ease-out`}
                    style={{ width: `${percent}%` }}
                />
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-indigo-500/10 relative flex flex-col custom-scrollbar">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="p-2 sm:p-3 bg-indigo-500/20 rounded-xl border border-indigo-500/30 shadow-inner">
                            <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
                                종합 스펙 정밀 진단
                                <span className="text-[10px] sm:text-xs px-2 py-0.5 bg-indigo-600 text-white rounded-full">BETA</span>
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                                <span className="text-indigo-300 font-bold">{userName}</span>님의 장비 세팅 분석 리포트
                            </p>
                        </div>
                    </div>
                    <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors group">
                        <X className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 bg-gradient-to-b from-slate-900 to-slate-950">

                    {/* 1. Starforce Section */}
                    <div className="bg-slate-800/40 rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Star className="w-32 h-32 text-yellow-500" />
                        </div>

                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="p-2 bg-yellow-500/20 rounded-lg">
                                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-yellow-100">스타포스</h3>
                                <p className="text-xs text-slate-400">대상: 17부위 (무기+방어구+장신구 - 특수반지 자리 1개 제외)</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                            {/* Average Starforce */}
                            <div className="bg-slate-950/50 p-5 rounded-xl border border-yellow-500/20 flex flex-col justify-between">
                                <div>
                                    <div className="text-sm text-slate-400 mb-1">평균 스타포스</div>
                                    <div className="text-4xl font-black text-yellow-400 tracking-tight">{data.starforce.average}<span className="text-lg font-normal text-yellow-600 ml-1">성</span></div>
                                </div>
                                <div>
                                    <ProgressBar current={data.starforce.average} max={22} colorClass="bg-gradient-to-r from-yellow-600 to-yellow-400" />
                                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                                        <span>0</span>
                                        <span>22 MAX</span>
                                    </div>
                                </div>
                            </div>

                            {/* 22 Star Count */}
                            <div className="bg-slate-950/50 p-5 rounded-xl border border-green-500/20 flex flex-col justify-center items-center text-center">
                                <div className="text-sm text-slate-400 mb-2">22성 아이템</div>
                                <div className="text-4xl font-black text-green-400">{data.starforce.count22}<span className="text-lg font-normal text-green-600 ml-1">개</span></div>
                                <div className="text-xs text-slate-500 mt-2">졸업급 장비</div>
                            </div>

                            {/* 17 Star Count */}
                            <div className="bg-slate-950/50 p-5 rounded-xl border border-blue-500/20 flex flex-col justify-center items-center text-center">
                                <div className="text-sm text-slate-400 mb-2">17성 이상 아이템</div>
                                <div className="text-4xl font-black text-blue-400">{data.starforce.count17}<span className="text-lg font-normal text-blue-600 ml-1">개</span></div>
                                <div className="text-xs text-slate-500 mt-2">국민 세팅 기준</div>
                            </div>
                        </div>

                        <div className="mt-4 relative z-10 bg-slate-950/30 p-4 rounded-lg border border-white/5">
                            {(() => {
                                const avg = data.starforce.average;
                                const count22 = data.starforce.count22 || 0;
                                const count25Plus = equipment?.filter(item => parseInt(item.starforce || "0") >= 25).length || 0;

                                // 25성 이상이 있는 경우 최고의 찬사
                                if (count25Plus > 0) {
                                    return (
                                        <div className="text-center space-y-3">
                                            <div className="flex justify-center items-center gap-2 text-2xl">
                                                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300 animate-pulse" />
                                                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400">
                                                    완벽을 넘어선 경지
                                                </span>
                                                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300 animate-pulse" />
                                            </div>
                                            <p className="text-yellow-300 font-bold text-lg">
                                                🌟 25성 아이템이 <span className="text-2xl text-yellow-200">{count25Plus}개</span>나 있습니다!
                                            </p>
                                            <p className="text-orange-200">
                                                단풍이가 무릎을 꿇습니다... 당신은 메이플의 <span className="text-yellow-300 font-black">전설</span>입니다. 💎
                                            </p>
                                            <p className="text-slate-400 text-sm">
                                                이 정도 스펙이면 모든 보스가 당신 앞에 무릎을 꿇을 것입니다. 경의를 표합니다! 🙇‍♂️
                                            </p>
                                        </div>
                                    );
                                }

                                // 평균 23성 이상
                                if (avg >= 23) {
                                    return (
                                        <div className="text-center space-y-2">
                                            <span className="text-green-400 font-bold text-lg flex items-center justify-center gap-2">
                                                <Star className="w-5 h-5 fill-green-400" /> 전설급 스타포스 완성도!
                                            </span>
                                            <p className="text-green-300">
                                                평균 <span className="text-2xl font-black text-yellow-300">{avg}성</span>이면 이미 졸업급입니다! 🎓
                                            </p>
                                            <p className="text-slate-300 text-sm">
                                                이 정도면 끝판왕 스펙입니다. 메이플 월드에서 당신을 막을 자는 없습니다! ⚔️
                                            </p>
                                        </div>
                                    );
                                }

                                // 평균 22성 이상
                                if (avg >= 22) {
                                    return (
                                        <div className="text-center space-y-2">
                                            <span className="text-green-400 font-bold flex items-center justify-center gap-2">
                                                <CheckCircle2 className="w-5 h-5" /> 완벽한 22성 세팅!
                                            </span>
                                            <p className="text-green-300">
                                                평균 <span className="text-xl font-black">{avg}성</span> 달성! 22성 아이템이 <span className="font-bold">{count22}개</span>입니다.
                                            </p>
                                            <p className="text-slate-300 text-sm">
                                                스타포스는 졸업입니다. 이제 25성에 도전해보실 건가요? 🌟
                                            </p>
                                        </div>
                                    );
                                }

                                // 평균 21성 이상
                                if (avg >= 21) {
                                    return (
                                        <div className="text-center space-y-2">
                                            <span className="text-cyan-400 font-bold flex items-center justify-center gap-2">
                                                <CheckCircle2 className="w-5 h-5" /> 거의 완성!
                                            </span>
                                            <p className="text-cyan-300">
                                                평균 <span className="text-xl font-black">{avg}성</span>! 22성 졸업이 눈앞입니다.
                                            </p>
                                            <p className="text-slate-300 text-sm">
                                                남은 아이템만 22성으로 올리면 완벽합니다! 조금만 더 화이팅! 💪
                                            </p>
                                        </div>
                                    );
                                }

                                // 평균 17성 이상
                                if (avg >= 17) {
                                    return (
                                        <div className="text-center space-y-2">
                                            <span className="text-blue-400 font-bold flex items-center justify-center gap-2">
                                                <CheckCircle2 className="w-4 h-4" /> 국민 세팅(17~18성) 구간입니다.
                                            </span>
                                            <p className="text-blue-300">
                                                평균 <span className="text-xl font-black">{avg}성</span>이면 안정적인 스펙입니다!
                                            </p>
                                            <p className="text-slate-300 text-sm">
                                                이제 22성을 향해 도전해보세요! 천천히 올리시면 됩니다. 🎯
                                            </p>
                                        </div>
                                    );
                                }

                                // 평균 17성 미만
                                return (
                                    <div className="text-center space-y-2">
                                        <span className="text-orange-400 font-bold flex items-center justify-center gap-2">
                                            <AlertTriangle className="w-4 h-4" /> 스타포스 강화가 필요합니다.
                                        </span>
                                        <p className="text-orange-300">
                                            평균 <span className="text-xl font-black">{avg}성</span> - 17성 둘둘부터 시작해봅시다!
                                        </p>
                                        <p className="text-slate-300 text-sm">
                                            스타포스는 스펙의 기본입니다. 하나씩 17성으로 올려보세요! 🌱
                                        </p>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* 2. WSE Potential Section */}
                        <div className="bg-slate-800/40 rounded-2xl p-6 border border-white/5 flex flex-col hover:border-red-500/30 transition-colors relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Sword className="w-24 h-24 text-red-500" />
                            </div>

                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="p-2 bg-red-500/20 rounded-lg">
                                    <Sword className="w-6 h-6 text-red-400" />
                                </div>
                                <h3 className="text-xl font-bold text-red-100">무보엠 잠재능력 (WSE)</h3>
                            </div>

                            <div className="space-y-4 flex-1 relative z-10">
                                {/* Potential */}
                                <div className="bg-slate-950/50 p-4 rounded-xl border border-red-500/10">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-bold text-slate-300">윗잠재 (Potential)</span>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-white">{data.wse.potential.validLines}</span>
                                            <span className="text-sm text-slate-500"> / 9줄</span>
                                        </div>
                                    </div>
                                    <ProgressBar current={data.wse.potential.validLines} max={9} colorClass="bg-gradient-to-r from-red-600 to-red-400" />
                                    {renderGrades(data.wse.potential.gradeCount)}

                                    {/* IED Warning */}
                                    {data.wse.iedLines >= 2 && (
                                        <div className="mt-3 pt-2 border-t border-white/5 text-xs text-orange-400 font-bold flex items-start gap-1 animate-pulse">
                                            <AlertTriangle className="w-3 h-3 mt-0.5" />
                                            <span>방무가 {data.wse.iedLines}줄입니다. (권장: 0~1줄)</span>
                                        </div>
                                    )}
                                </div>

                                {/* Additional */}
                                <div className="bg-slate-950/50 p-4 rounded-xl border border-red-500/10">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-bold text-slate-300">에디셔널 (Additional)</span>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-white">{data.wse.additional.validLines}</span>
                                            <span className="text-sm text-slate-500"> / 9줄</span>
                                        </div>
                                    </div>
                                    <ProgressBar current={data.wse.additional.validLines} max={9} colorClass="bg-gradient-to-r from-red-900 to-red-700" />
                                    {renderGrades(data.wse.additional.gradeCount)}
                                </div>

                                <div className="text-[11px] text-slate-500 bg-slate-950/30 p-2.5 rounded-lg border border-white/5 flex items-start gap-2">
                                    <CheckCircle2 className="w-3 h-3 mt-0.5 text-slate-600" />
                                    <div>
                                        <span className="font-bold text-slate-400">유효 옵션 기준:</span> 보공, 공/마% (방무는 별도 체크)
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Armor/Acc Potential Section */}
                        <div className="bg-slate-800/40 rounded-2xl p-6 border border-white/5 flex flex-col hover:border-cyan-500/30 transition-colors relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Zap className="w-24 h-24 text-cyan-500" />
                            </div>

                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="p-2 bg-cyan-500/20 rounded-lg">
                                    <Zap className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-bold text-cyan-100">방어구/장신구 잠재능력</h3>
                            </div>

                            <div className="space-y-4 flex-1 relative z-10">
                                {/* Potential */}
                                <div className="bg-slate-950/50 p-4 rounded-xl border border-cyan-500/10">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-bold text-slate-300">윗잠재 (Potential)</span>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-white">{data.armorAcc.potential.validLines}</span>
                                            <span className="text-sm text-slate-500"> / 51줄</span>
                                        </div>
                                    </div>
                                    <ProgressBar current={data.armorAcc.potential.validLines} max={51} colorClass="bg-gradient-to-r from-cyan-600 to-cyan-400" />
                                    {renderGrades(data.armorAcc.potential.gradeCount)}

                                    {/* Highlights */}
                                    <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-3">
                                        <div className="bg-slate-900 p-2 rounded border border-white/5 text-center">
                                            <div className="text-[10px] text-slate-500 mb-1">모자 쿨감</div>
                                            <div className="text-white font-bold text-sm">{data.armorAcc.potential.hatCooltime > 0 ? `-${data.armorAcc.potential.hatCooltime}초` : '-'}</div>
                                        </div>
                                        <div className="bg-slate-900 p-2 rounded border border-white/5 text-center">
                                            <div className="text-[10px] text-slate-500 mb-1">장갑 크뎀</div>
                                            <div className="text-white font-bold text-sm">{data.armorAcc.potential.gloveCritDmg > 0 ? `${data.armorAcc.potential.gloveCritDmg}줄` : '-'}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional */}
                                <div className="bg-slate-950/50 p-4 rounded-xl border border-cyan-500/10">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-bold text-slate-300">에디셔널 (Additional)</span>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-white">{data.armorAcc.additional.validLines}</span>
                                            <span className="text-sm text-slate-500"> / 51줄</span>
                                        </div>
                                    </div>
                                    <ProgressBar current={data.armorAcc.additional.validLines} max={51} colorClass="bg-gradient-to-r from-cyan-900 to-cyan-700" />
                                    {renderGrades(data.armorAcc.additional.gradeCount)}
                                </div>

                                <div className="text-[11px] text-slate-500 bg-slate-950/30 p-2.5 rounded-lg border border-white/5 flex items-start gap-2">
                                    <CheckCircle2 className="w-3 h-3 mt-0.5 text-slate-600" />
                                    <div>
                                        <span className="font-bold text-slate-400">유효 옵션 기준:</span> 주스탯%, 올스탯%, 크뎀(장갑), 쿨감(모자), 렙당스탯
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Set Effect Section */}
                    <div className="bg-slate-800/40 rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-colors relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Layers className="w-24 h-24 text-purple-500" />
                        </div>

                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <Layers className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-purple-100">세트 효과 분석</h3>
                        </div>

                        <div className="bg-slate-950/50 p-5 rounded-xl border border-purple-500/20 relative z-10">
                            <div className="flex flex-wrap gap-2">
                                {data.setEffect.activeSets.length > 0 ? (
                                    data.setEffect.activeSets.map((set, idx) => (
                                        <span key={idx} className="px-4 py-1.5 bg-purple-500/10 text-purple-300 rounded-lg text-sm font-bold border border-purple-500/30 shadow-sm">
                                            {set}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-slate-500 text-sm">적용 중인 주요 세트 효과가 없습니다.</span>
                                )}
                            </div>
                            {data.setEffect.luckyItemApplied && (
                                <div className="mt-4 text-sm text-yellow-400 flex items-center gap-2 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                                    <Star className="w-4 h-4 fill-yellow-400" />
                                    <span>럭키 아이템(제네시스/데스티니) 효과가 적용 중입니다!</span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-slate-900 sticky bottom-0 z-20 flex justify-end rounded-b-2xl">
                    <button
                        onClick={handleClose}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}
