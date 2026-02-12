import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    getUserUnionRaider,
    getCharacterLinkSkill,
    getCharacterStat,
    getCharacterBasic,
    getCharacterAbility
} from '../lib/nexon';
import { analyze } from '../lib/diagnosis';
import HuntingDiagnosis from './HuntingDiagnosis';
import BossDiagnosis from './BossDiagnosis';
import { diagnoseTotalCheckup, TotalCheckupResult } from '../lib/diagnosis/total-checkup';
import TotalDiagnosisModal from './TotalDiagnosisModal';
import PriorityDiagnosisModal from './PriorityDiagnosisModal';

export default function ItemDiagnosis({ equipment, ocid, worldName, refreshKey, characterClass }: { equipment: any[], ocid: string, worldName: string, refreshKey?: number, characterClass: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<'HUNTING' | 'BOSS' | null>(null);
    const [report, setReport] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const [rawData, setRawData] = useState<any>(null);
    const [bossStage, setBossStage] = useState<number | undefined>(undefined);

    // Total Diagnosis State
    const [isTotalDiagnosisOpen, setIsTotalDiagnosisOpen] = useState(false);
    const [totalCheckupData, setTotalCheckupData] = useState<TotalCheckupResult | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // refreshKey가 변경되거나 장비가 변경되면 캐시 초기화
    useEffect(() => {
        setRawData(null);
        setReport(null);
        setBossStage(undefined);
        setTotalCheckupData(null);
    }, [refreshKey, ocid, equipment]);

    // bossStage가 변경되면 리포트 갱신 (보스 모드일 때만)
    useEffect(() => {
        if (mode === 'BOSS' && rawData && bossStage !== undefined) {
            const result = analyze({
                basic: rawData.basic,
                item: { item_equipment: equipment },
                stat: rawData.stat,
                union: rawData.union,
                link: rawData.link,
                ability: rawData.ability
            }, 'BOSS', bossStage);
            setReport(result);
        }
    }, [bossStage, mode, rawData, equipment]);

    // 모달 뒤로가기 핸들링 (사냥/보스 진단)
    useEffect(() => {
        if (isOpen) {
            window.history.pushState({ modal: 'diagnosis' }, '', window.location.href);
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

    const runDiagnosis = async (targetMode: 'HUNTING' | 'BOSS') => {
        setMode(targetMode);
        setIsOpen(true);

        // 이미 데이터가 있으면 재사용
        if (rawData) {
            const result = analyze({
                basic: rawData.basic,
                item: { item_equipment: equipment },
                stat: rawData.stat,
                union: rawData.union,
                link: rawData.link,
                ability: rawData.ability
            }, targetMode, targetMode === 'BOSS' ? bossStage : undefined);
            setReport(result);
            return;
        }

        setLoading(true);
        setReport(null);
        setError(null);

        if (!ocid) { setLoading(false); return; }

        try {
            // Helper to safely fetch data
            const safeFetch = async (fn: Function) => {
                try { return await fn(ocid); }
                catch (e) { console.warn(e); return null; }
            };

            const [unionRes, linkRes, statRes, basicRes, abilRes] = await Promise.all([
                safeFetch(getUserUnionRaider),
                safeFetch(getCharacterLinkSkill),
                safeFetch(getCharacterStat),
                safeFetch(getCharacterBasic),
                safeFetch(getCharacterAbility)
            ]);

            // 데이터 구조 유연하게 처리 (res.data 또는 res 자체)
            const basicData = basicRes?.data || basicRes;

            if (!basicData || !basicData.character_class) {
                throw new Error("캐릭터 기본 정보를 불러올 수 없습니다.");
            }

            // API 응답 구조가 { data: ... } 형태일 수도 있고 바로 객체일 수도 있음
            const unionData = unionRes?.data || unionRes || {};
            const linkData = linkRes?.data || linkRes || {};
            const statData = statRes?.data || statRes || {};
            const abilityData = abilRes?.data || abilRes || {};

            // 데이터 캐싱
            setRawData({
                union: unionData,
                link: linkData,
                stat: statData,
                basic: basicData,
                ability: abilityData
            });

            // 분리된 진단 로직 호출
            const result = analyze({
                basic: basicData,
                item: { item_equipment: equipment },
                stat: statData,
                union: unionData,
                link: linkData,
                ability: abilityData
            }, targetMode, targetMode === 'BOSS' ? bossStage : undefined);
            setReport(result);

        } catch (err: any) {
            console.error(err);
            setError(`진단 데이터를 불러오는 데 실패했습니다.\n${err.message || JSON.stringify(err)}`);
        } finally {
            setLoading(false);
        }
    };

    const switchMode = (newMode: 'HUNTING' | 'BOSS') => {
        if (mode === newMode) return;
        setMode(newMode);
        if (rawData) {
            const result = analyze({
                basic: rawData.basic,
                item: { item_equipment: equipment },
                stat: rawData.stat,
                union: rawData.union,
                link: rawData.link,
                ability: rawData.ability
            }, newMode, newMode === 'BOSS' ? bossStage : undefined);
            setReport(result);
        } else {
            runDiagnosis(newMode);
        }
    };

    const [isPriorityOpen, setIsPriorityOpen] = useState(false);

    const handleTotalDiagnosis = () => {
        const result = diagnoseTotalCheckup(equipment, characterClass);
        setTotalCheckupData(result);
        setIsTotalDiagnosisOpen(true);
    };

    const handlePriorityDiagnosis = () => {
        setIsPriorityOpen(true);
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-2 mt-4">
                <button onClick={() => runDiagnosis('HUNTING')} className="bg-green-800 hover:bg-green-700 text-white font-bold py-3 px-2 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm border border-green-600 whitespace-nowrap">
                    🏹 사냥용 진단
                </button>
                <button onClick={() => runDiagnosis('BOSS')} className="bg-red-900 hover:bg-red-800 text-white font-bold py-3 px-2 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm border border-red-700 whitespace-nowrap">
                    ⚔️ 보스용 진단
                </button>
                <button onClick={handleTotalDiagnosis} className="bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 px-2 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm border border-indigo-700 whitespace-nowrap">
                    🛡️ 종합 스펙 진단
                </button>
                <button onClick={handlePriorityDiagnosis} className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 px-2 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm border border-amber-500 whitespace-nowrap animate-pulse relative">
                    ⚡ 스펙업 1순위
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm border border-red-400">Beta</span>
                </button>
            </div>

            {/* Priority Diagnosis Modal */}
            {mounted && isPriorityOpen && createPortal(
                <PriorityDiagnosisModal
                    isOpen={isPriorityOpen}
                    onClose={() => setIsPriorityOpen(false)}
                    equipment={equipment}
                    job={characterClass}
                />,
                document.body
            )}

            {/* Total Diagnosis Modal */}
            {mounted && isTotalDiagnosisOpen && totalCheckupData && createPortal(
                <TotalDiagnosisModal
                    isOpen={isTotalDiagnosisOpen}
                    onClose={() => setIsTotalDiagnosisOpen(false)}
                    data={totalCheckupData}
                    userName={rawData?.basic?.character_name || "용사"}
                    equipment={equipment}
                />,
                document.body
            )}

            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4" onClick={handleClose}>
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 sm:top-6 sm:right-6 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-all z-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-3 sm:p-8 w-full">

                            {error ? (
                                <div className="text-center py-10 text-red-400 bg-red-950/20 rounded-xl border border-red-900/30">
                                    <div className="text-2xl mb-2">⚠️</div>
                                    <p className="font-bold mb-2">오류 발생</p>
                                    <p className="text-sm text-red-300/80 mb-4 whitespace-pre-wrap">{error}</p>
                                    <button
                                        onClick={handleClose}
                                        className="px-4 py-2 bg-red-900/50 hover:bg-red-800/50 text-red-200 rounded-lg text-sm transition-colors"
                                    >
                                        닫기
                                    </button>
                                </div>
                            ) : (loading || !report) ? (
                                <div className="text-center py-20 flex flex-col items-center justify-center gap-6">
                                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                    <div className="text-slate-300 animate-pulse text-lg">
                                        {mode === 'HUNTING' ? '🏹 사냥' : '⚔️ 보스'} 세팅 정밀 분석 중...
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col md:flex-row items-center justify-between mb-4 sm:mb-8 border-b border-slate-800 pb-4 sm:pb-6 gap-4 sm:gap-6">
                                        <div className="flex flex-col gap-2 sm:gap-4 w-full md:w-auto">
                                            <div className="text-center md:text-left">
                                                <h2 className="text-xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3 justify-center md:justify-start">
                                                    {mode === 'HUNTING' ? '🏹 사냥 세팅 진단' : '⚔️ 보스 세팅 진단'}
                                                </h2>
                                                <p className="text-xs sm:text-base text-slate-400">{worldName} 월드 / <span className="text-indigo-400 font-bold">{report.score}점</span></p>
                                            </div>

                                            {/* 모드 전환 토글 */}
                                            <div className="flex gap-1 bg-slate-950/50 p-1 rounded-lg border border-slate-800 self-center md:self-start">
                                                <button
                                                    onClick={() => switchMode('HUNTING')}
                                                    className={`py-1 sm:py-1.5 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-bold transition-all flex items-center gap-1 sm:gap-2 ${mode === 'HUNTING' ? 'bg-green-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                                                >
                                                    🏹 사냥용
                                                </button>
                                                <button
                                                    onClick={() => switchMode('BOSS')}
                                                    className={`py-1 sm:py-1.5 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-bold transition-all flex items-center gap-1 sm:gap-2 ${mode === 'BOSS' ? 'bg-red-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                                                >
                                                    ⚔️ 보스용
                                                </button>
                                            </div>
                                        </div>

                                        <div className="relative group">
                                            <div className={`text-5xl sm:text-7xl font-black italic tracking-tighter 
                      ${report.tier === 'SSS' ? 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]' :
                                                    report.tier === 'SS' ? 'text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]' :
                                                        report.tier === 'S' ? 'text-yellow-400' :
                                                            report.tier === 'A' ? 'text-blue-400' : 'text-slate-400'}`}>
                                                {report.tier}
                                            </div>
                                            <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 text-center text-[10px] sm:text-xs font-bold bg-slate-800 rounded-full px-2 sm:px-3 py-0.5 text-slate-300 border border-slate-600 shadow-lg">RANK</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                        {/* Left Column: Link, Union, Ability */}
                                        <div className="space-y-3 sm:space-y-4 md:col-span-1">
                                            {/* 링크 스킬 섹션 */}
                                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 sm:p-5 hover:bg-slate-800/80 transition-colors">
                                                <h3 className="text-amber-400 font-bold mb-2 sm:mb-3 flex items-center gap-2 text-base sm:text-xl">
                                                    <span>🔗</span> 링크 스킬
                                                </h3>
                                                {report.sections.link.bad.length > 0 && (
                                                    <ul className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
                                                        {report.sections.link.bad.map((txt: string, i: number) => (
                                                            <li key={i} className="text-xs sm:text-base text-red-300 leading-relaxed pl-2 sm:pl-3 border-l-2 border-red-500/50 bg-red-950/10 py-0.5 sm:py-1 pr-2 rounded-r">
                                                                ⚠️ {txt}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {report.sections.link.good.length > 0 && (
                                                    <ul className="space-y-0.5 sm:space-y-1">
                                                        {report.sections.link.good.map((txt: string, i: number) => (
                                                            <li key={i} className="text-xs sm:text-base text-green-400 flex items-start gap-1 sm:gap-2">
                                                                <span className="mt-0.5 sm:mt-1">✅</span> <span>{txt}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>

                                            {/* 유니온 섹션 */}
                                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 sm:p-5 hover:bg-slate-800/80 transition-colors">
                                                <h3 className="text-purple-400 font-bold mb-2 sm:mb-3 flex items-center gap-2 text-base sm:text-xl">
                                                    <span>🏆</span> 유니온
                                                </h3>
                                                {report.sections.union.bad.length > 0 && (
                                                    <ul className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
                                                        {report.sections.union.bad.map((txt: string, i: number) => (
                                                            <li key={i} className="text-xs sm:text-base text-red-300 leading-relaxed pl-2 sm:pl-3 border-l-2 border-red-500/50 bg-red-950/10 py-0.5 sm:py-1 pr-2 rounded-r">
                                                                ⚠️ {txt}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {report.sections.union.good.length > 0 && (
                                                    <ul className="space-y-0.5 sm:space-y-1">
                                                        {report.sections.union.good.map((txt: string, i: number) => (
                                                            <li key={i} className="text-xs sm:text-base text-green-400 flex items-start gap-1 sm:gap-2">
                                                                <span className="mt-0.5 sm:mt-1">✅</span> <span>{txt}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>

                                            {/* 어빌리티 섹션 */}
                                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 sm:p-5 hover:bg-slate-800/80 transition-colors">
                                                <h3 className="text-cyan-400 font-bold mb-2 sm:mb-3 flex items-center gap-2 text-base sm:text-xl">
                                                    <span>🔮</span> 어빌리티
                                                </h3>
                                                {report.sections.ability.bad.length > 0 && (
                                                    <ul className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
                                                        {report.sections.ability.bad.map((txt: string, i: number) => (
                                                            <li key={i} className="text-xs sm:text-base text-red-300 leading-relaxed pl-2 sm:pl-3 border-l-2 border-red-500/50 bg-red-950/10 py-0.5 sm:py-1 pr-2 rounded-r">
                                                                ⚠️ {txt}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {report.sections.ability.good.length > 0 && (
                                                    <ul className="space-y-0.5 sm:space-y-1">
                                                        {report.sections.ability.good.map((txt: string, i: number) => (
                                                            <li key={i} className="text-xs sm:text-base text-green-400 flex items-start gap-1 sm:gap-2">
                                                                <span className="mt-0.5 sm:mt-1">✅</span> <span>{txt}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right Column: Equipment or Hunting/Boss Diagnosis */}
                                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 sm:p-5 hover:bg-slate-800/80 transition-colors h-full md:col-span-2">
                                            <h3 className="text-orange-400 font-bold mb-2 sm:mb-4 flex items-center gap-2 text-lg sm:text-2xl border-b border-slate-700 pb-2">
                                                <span>⚔️</span> {mode === 'HUNTING' ? '사냥 단계별 가이드' : '보스 단계별 가이드'}
                                            </h3>

                                            {mode === 'HUNTING' ? (
                                                <HuntingDiagnosis equipment={equipment} stat={rawData?.stat} ability={rawData?.ability} />
                                            ) : (
                                                <BossDiagnosis
                                                    equipment={equipment}
                                                    stat={rawData?.stat}
                                                    basic={rawData?.basic}
                                                    onStageChange={(stage) => setBossStage(stage)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Ad Section - Above Close Button */}
                            {!loading && !error && report && (
                                <div className="mt-6 sm:mt-8 mb-4 flex justify-center">
                                    <div className="w-full max-w-2xl bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 flex items-center justify-center min-h-[100px]">
                                        {/* Google AdSense Ad - Insert ad code here */}
                                        <ins className="adsbygoogle"
                                            style={{ display: 'block' }}
                                            data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
                                            data-ad-slot="YOUR_AD_SLOT_ID"
                                            data-ad-format="horizontal"
                                            data-full-width-responsive="true"></ins>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleClose}
                                className="mt-4 w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 sm:py-4 rounded-xl font-bold transition-colors border border-slate-700 text-base sm:text-lg shadow-lg"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
