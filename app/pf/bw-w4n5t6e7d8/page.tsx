'use client';

import React, { useEffect } from 'react';
import {
    Printer, Target, Award, TrendingUp, Users, Zap,
    AlertTriangle, CheckCircle, Timer, Crosshair, Trophy, Flame
} from 'lucide-react';

// 검색 엔진 노출 방지 (메타 태그는 layout.tsx나 page metadata에서 설정)

export default function BossWantedPortfolio() {
    useEffect(() => {
        const removeAds = () => {
            const elements = document.querySelectorAll('.adsbygoogle, .google-auto-placed, iframe[id^="google_ads_iframe"]');
            elements.forEach(el => el.remove());
        };
        removeAds();
        const interval = setInterval(removeAds, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#0f0f12] py-12 px-4 print:p-0 print:bg-white">
            <style jsx global>{`
                @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
                body { font-family: 'Pretendard', sans-serif; -webkit-print-color-adjust: exact; }
                
                .a4-page {
                    width: 210mm;
                    height: 297mm;
                    padding: 15mm;
                    margin: 0 auto 2rem;
                    background: white;
                    box-shadow: 0 0 20px rgba(0,0,0,0.5);
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                @media print {
                    @page {
                        size: A4 portrait;
                        margin: 0;
                    }
                    body { 
                        background: white; 
                        margin: 0;
                        padding: 0;
                    }
                    .a4-page { 
                        margin: 0; 
                        box-shadow: none; 
                        width: 210mm; 
                        height: 297mm; 
                        page-break-after: always; 
                        break-after: page;
                        padding: 15mm !important;
                    }
                    .no-print { display: none !important; }
                    .bg-gray-900 { background-color: #111827 !important; color: white !important; }
                }
            `}</style>

            {/* COVER PAGE */}
            <div className="a4-page bg-white relative overflow-hidden flex flex-col">
                {/* 상단: 텍스트 */}
                <div className="px-16 pt-8 pb-4">
                    {/* EVENT PROPOSAL */}
                    <p className="text-amber-600 font-bold tracking-[0.3em] uppercase text-center text-xs mb-4">
                        Event Proposal
                    </p>

                    {/* 메인 타이틀 */}
                    <h1 className="text-5xl font-black text-gray-900 text-center leading-tight mb-1">
                        주간 보스 수배
                    </h1>
                    <p className="text-xl text-gray-900 text-center font-medium mb-4">
                        Weekly Boss Wanted
                    </p>

                    {/* 부제 */}
                    <p className="text-base text-gray-900 text-center leading-relaxed mb-4">
                        사냥 피로도 완화를 위한 <span className="font-bold text-gray-900">'전투 중심 성장'</span> 파일럿 이벤트 제안
                    </p>

                    {/* 게임 UI 이미지 */}
                    <div className="border-4 border-amber-500 rounded-lg overflow-hidden shadow-xl">
                        <img
                            src="/images/pf/boss-wanted-ui.jpg"
                            alt="주간 보스 수배 UI"
                            className="w-full h-auto"
                        />
                    </div>
                </div>

                {/* 하단 여백 */}
                <div className="flex-1"></div>

                {/* 하단: 기획자 정보 */}
                <div className="border-t-2 border-gray-200 bg-gray-50 px-16 py-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-0.5">Game Planner</p>
                            <p className="font-bold text-gray-900 text-lg">이경준</p>
                            <p className="text-gray-500 text-xs mt-0.5">2026. 02. 09</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-0.5">Event Type</p>
                            <p className="font-bold text-gray-900 text-lg">4-Week Pilot</p>
                            <p className="text-gray-500 text-xs mt-0.5">In-Game Event</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 1: Background */}
            <div className="a4-page">
                <div className="border-b-4 border-amber-600 pb-2 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">1. 기획 배경</h2>
                    <span className="text-gray-500 font-bold">01 / 06</span>
                </div>

                <div className="space-y-6">
                    {/* Problem 1 */}
                    <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-xl">
                        <div className="flex items-start gap-3 mb-3">
                            <AlertTriangle className="text-red-600 shrink-0" size={24} />
                            <h3 className="text-xl font-bold text-red-900">Problem 1: 사냥(재획) 의존도 심화</h3>
                        </div>
                        <p className="text-gray-900 leading-relaxed pl-9">
                            현재 메이플스토리의 성장은 <span className="font-bold text-red-700">'재획'</span>이라 불리는 장시간 반복 사냥에 편중되어 있습니다.
                            이는 직장인 및 라이트 유저의 <span className="font-bold">이탈(Churn)</span>을 유발하는 주된 요인입니다.
                        </p>
                    </div>

                    {/* Problem 2 */}
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-r-xl">
                        <div className="flex items-start gap-3 mb-3">
                            <Target className="text-orange-600 shrink-0" size={24} />
                            <h3 className="text-xl font-bold text-orange-900">Problem 2: 보스 보상의 한계</h3>
                        </div>
                        <p className="text-gray-900 leading-relaxed pl-9">
                            보스 콘텐츠는 재미와 성취감이 높지만, 성장에 필수적인 <span className="font-bold text-orange-700">'경험치' 보상은 미미</span>하여
                            레벨업 수단으로는 기능하지 못하고 있습니다.
                        </p>
                    </div>

                    {/* Solution */}
                    <div className="bg-gradient-to-br from-amber-600 to-orange-600 text-white p-6 rounded-xl relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <Zap className="text-amber-200" size={28} />
                                <h3 className="text-2xl font-bold">제안 목적 (Solution)</h3>
                            </div>
                            <p className="text-lg leading-relaxed text-amber-50">
                                <span className="font-bold text-white">4주간의 파일럿 이벤트</span>를 통해,<br />
                                <span className="text-2xl font-black text-white">"보스 격파가 곧 성장"</span>으로 이어지는 새로운 루틴을 실험하고
                                유저 반응을 검증하고자 합니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Overview */}
                <div className="mt-6 bg-gray-100 p-5 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <CheckCircle className="text-green-600" size={20} />
                        Quick Overview
                    </h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-gray-500 text-sm font-bold mb-1">진행 기간</p>
                            <p className="text-gray-900 font-bold text-base">4주 (1개월)</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-bold mb-1">대상</p>
                            <p className="text-gray-900 font-bold text-base">200레벨 이상</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-bold mb-1">참여 빈도</p>
                            <p className="text-gray-900 font-bold text-base">메이플 ID 당 주 1회</p>
                        </div>
                    </div>
                </div>

                {/* 핵심 의도 */}
                <div className="mt-4 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
                    <p className="text-sm text-gray-900 leading-relaxed">
                        <span className="font-bold text-blue-900">📌 핵심 의도:</span> 본 이벤트는 사냥을 대체하기 위한 콘텐츠가 아니라, <span className="font-bold text-blue-800">사냥이 어려운 날에도 성장 흐름이 끊기지 않게 하는 '안전망' 실험</span>입니다.
                    </p>
                </div>
            </div>

            {/* PAGE 2: Overview & Concept */}
            <div className="a4-page">
                <div className="border-b-4 border-amber-600 pb-2 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">2. 이벤트 개요</h2>
                    <span className="text-gray-500 font-bold">02 / 06</span>
                </div>

                <div className="bg-gray-900 text-white p-8 rounded-xl mb-6 relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 w-40 h-40 bg-amber-500 opacity-20 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black mb-6 text-amber-400">주간 보스 수배: WANTED</h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Timer className="text-amber-400 shrink-0 mt-1" size={20} />
                                <div>
                                    <p className="font-bold text-amber-200 text-sm mb-1">진행 기간</p>
                                    <p className="text-white text-lg">4주 (약 1개월)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Users className="text-amber-400 shrink-0 mt-1" size={20} />
                                <div>
                                    <p className="font-bold text-amber-200 text-sm mb-1">참여 대상</p>
                                    <p className="text-white text-lg">200레벨 이상 모든 캐릭터 (메이플 ID 당 주 1회)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Crosshair className="text-amber-600" />
                    핵심 컨셉 (Core Concept)
                </h3>

                <div className="space-y-4 mb-6">
                    <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl">
                        <div className="flex items-start gap-4">
                            <div className="bg-amber-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black shrink-0">1</div>
                            <div className="flex-1">
                                <p className="text-gray-900 text-base leading-relaxed font-medium">
                                    매주 목요일, 각 티어별 구간에 맞는 <span className="font-bold text-amber-700">'현상 수배 전단지'</span>가 도착합니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 p-5 rounded-xl">
                        <div className="flex items-start gap-4">
                            <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black shrink-0">2</div>
                            <div className="flex-1">
                                <p className="text-gray-900 text-base leading-relaxed font-medium">
                                    티어별 지정된 보스 중 <span className="font-bold text-orange-700">1개를 처치</span>하면, 사냥을 대체할 수 있는 <span className="font-bold text-orange-700">[확정형 성장 비약/상급 EXP 쿠폰]</span>을 지급합니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 p-5 rounded-xl">
                        <div className="flex items-start gap-4">
                            <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black shrink-0">3</div>
                            <div className="flex-1">
                                <p className="text-gray-900 text-base leading-relaxed font-medium">
                                    티어별로 자신의 <span className="font-bold text-red-700">스펙/상황에 맞게 주간 1개만</span> 잡을 수 있습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-xl border-2 border-amber-300">
                    <p className="text-center text-gray-800 text-lg font-medium leading-relaxed">
                        <span className="text-2xl font-black text-amber-700">"유저의 성장 단계에 맞춰,<br />지금 가장 필요한 '성장의 열쇠'를 지급합니다."</span>
                    </p>
                </div>
            </div>

            {/* PAGE 3: Tier C & B */}
            <div className="a4-page">
                <div className="border-b-4 border-amber-600 pb-2 mb-4 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">3. 티어별 타겟 설계 (1/2)</h2>
                    <span className="text-gray-500 font-bold">03 / 06</span>
                </div>

                {/* Tier C */}
                <div className="mb-6">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-t-xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-white text-green-700 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl">C</div>
                                <div>
                                    <h3 className="text-2xl font-black">Tier C: 정착 지원</h3>
                                    <p className="text-green-100 text-sm">Settlement Support</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-green-200">권장 레벨</p>
                                <p className="font-black text-xl">Lv. 200~239</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-green-200 p-4 rounded-b-xl">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                                <p className="text-xs text-gray-500 font-bold mb-1">수배 타겟</p>
                                <p className="text-sm text-gray-900 font-medium">
                                    <span className="font-bold text-green-700">Main Target:</span><br />
                                    카오스 루타비스(벨룸 등), 하드 매그너스<br />
                                    <span className="font-bold text-green-700 mt-1 inline-block">Challenge Target:</span><br />
                                    노멀 스우, 노멀 데미안
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold mb-1">완료 보상</p>
                                <p className="text-sm text-gray-900 font-bold text-green-700">태풍 성장의 비약 x 1개</p>
                            </div>
                        </div>
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded mb-3">
                            <p className="text-sm text-red-900 font-medium"><span className="font-bold">⛔ 특수 규칙:</span> 1인 격파(Solo) 시에만 인정</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                            <p className="text-xs text-gray-900 leading-relaxed">
                                <span className="font-bold text-gray-900">의도:</span> 유니온 및 링크 육성 구간입니다.
                                고스펙 유저의 버스(Carry)를 방지하고, 기초적인 보스 패턴 숙련도를 높이기 위해 '솔로 플레이'를 강제합니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tier B */}
                <div>
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-t-xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-white text-blue-700 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl">B</div>
                                <div>
                                    <h3 className="text-2xl font-black">Tier B: 도약 지원</h3>
                                    <p className="text-blue-100 text-sm">Bridge Support</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-blue-200">권장 레벨</p>
                                <p className="font-black text-xl">Lv. 240~259</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-blue-200 p-4 rounded-b-xl">
                        <div className="bg-yellow-50 border border-yellow-300 p-2 rounded mb-3 text-center">
                            <p className="text-sm font-bold text-yellow-800">⚠️ 6차 전직 준비 구간</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                                <p className="text-xs text-gray-500 font-bold mb-1">수배 타겟</p>
                                <p className="text-sm text-gray-900 font-medium">
                                    <span className="font-bold text-blue-700">Main Target:</span><br />
                                    노멀 가디언 엔젤 슬라임, 이지/노멀 루시드, 이지/노멀 윌<br />
                                    <span className="font-bold text-blue-700 mt-1 inline-block">Challenge Target:</span><br />
                                    노먀 더스크, 노먀 듄켈
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold mb-1">완료 보상</p>
                                <p className="text-sm text-gray-900 font-bold text-blue-700">도약 성장의 비약 x 1개</p>
                                <p className="text-xs text-gray-500">(200~259 레벨 사용 가능)</p>
                            </div>
                        </div>
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded mb-3">
                            <p className="text-sm text-red-900 font-medium"><span className="font-bold">⛔ 특수 규칙:</span> 1인 격파(Solo) 시에만 인정</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                            <p className="text-xs text-gray-900 leading-relaxed">
                                <span className="font-bold text-gray-900">의도:</span> 260레벨 달성하여 6차 전직이 목표인 구간입니다.
                                파티 플레이보다는 개인의 스펙업 동기가 필요한 시점이므로, 스스로의 힘으로 극복했을 때 확실한 보상(1업)을 제공합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 4: Tier A & S */}
            <div className="a4-page">
                <div className="border-b-4 border-amber-600 pb-2 mb-4 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">3. 티어별 타겟 설계 (2/2)</h2>
                    <span className="text-gray-500 font-bold">04 / 06</span>
                </div>

                {/* Tier A */}
                <div className="mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white p-4 rounded-t-xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-white text-purple-700 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl">A</div>
                                <div>
                                    <h3 className="text-2xl font-black">Tier A: 주력 양성</h3>
                                    <p className="text-purple-100 text-sm">Core Force Development</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-purple-200">권장 레벨</p>
                                <p className="font-black text-xl">Lv. 260~284</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-purple-200 p-4 rounded-b-xl">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                                <p className="text-xs text-gray-500 font-bold mb-1">수배 타겟</p>
                                <p className="text-sm text-gray-900 font-medium">
                                    <span className="font-bold text-purple-700">Main Target:</span><br />
                                    하드 스우/데미안, 하드 루시드/윌, 카오스 더스크<br />
                                    <span className="font-bold text-purple-700 mt-1 inline-block">Challenge Target:</span><br />
                                    하드 듄켈, 노멀 진 힐라, 하드 진 힐라, 노멀 세렌, 이지 칼로스, 하드 세렌, 이지 최초의 대적자
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold mb-1">완료 보상</p>
                                <p className="text-sm text-gray-900 font-bold text-purple-700">상급 EXP 쿠폰 7,200개</p>
                                <p className="text-xs text-gray-500">(이벤트 한정 수치)</p>
                            </div>
                        </div>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mb-3">
                            <p className="text-sm text-blue-900 font-medium"><span className="font-bold">🤝 특수 규칙:</span> 파티원 수에 따라 보상 1/N 분배</p>
                            <p className="text-xs text-gray-900 mt-1">예시) 6인 파티 클리어 시: 인당 1,200개 지급</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                            <p className="text-xs text-gray-900 leading-relaxed">
                                <span className="font-bold text-gray-900">의도:</span> 본격적인 상위 보스 입문 단계입니다.
                                파티 플레이를 장려하되, '버스 태우기' 부작용을 막기 위해 결정석과 동일한 1/N 분배 시스템을 적용합니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tier S */}
                <div>
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 rounded-t-xl relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-20 h-20 bg-yellow-400 opacity-30 rounded-full blur-2xl"></div>
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="bg-white text-red-700 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl shadow-lg">S</div>
                                <div>
                                    <h3 className="text-2xl font-black">Tier S: 최상위 도약</h3>
                                    <p className="text-red-100 text-sm">End-Game Advancement</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-red-200">권장 레벨</p>
                                <p className="font-black text-xl">Lv. 285+</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-red-200 p-4 rounded-b-xl">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                                <p className="text-xs text-gray-500 font-bold mb-1">수배 타겟</p>
                                <p className="text-sm text-gray-900 font-bold">
                                    <span className="font-bold text-red-700">Main Target:</span><br />
                                    이지 카링, 노멀 칼로스, 노멀 최초의 대적자<br />
                                    <span className="font-bold text-red-700 mt-1 inline-block">Challenge Target:</span><br />
                                    그 위에 상위 보스들
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold mb-1">완료 보상</p>
                                <p className="text-lg text-gray-900 font-black text-red-700">상급 EXP 쿠폰 13,500개</p>
                            </div>
                        </div>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mb-3">
                            <p className="text-sm text-blue-900 font-medium"><span className="font-bold">🤝 특수 규칙:</span> 파티원 수에 따라 보상 1/N 분배</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                            <p className="text-xs text-gray-900 leading-relaxed">
                                <span className="font-bold text-gray-900">의도:</span> 최상위권 유저들에게 '만렙 확장'에 대비할 수 있는 동기를 부여하고,
                                솔로 격파(독식)에 대한 도전 욕구를 자극합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 5: Operation & Validation */}
            <div className="a4-page">
                <div className="border-b-4 border-amber-600 pb-2 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">4. 운영 및 검증 계획</h2>
                    <span className="text-gray-500 font-bold">05 / 06</span>
                </div>

                {/* Phase 1 */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Flame className="text-orange-600" />
                        Phase 1: 파일럿 (4주간 진행)
                    </h3>

                    <div className="bg-orange-50 border border-orange-200 p-5 rounded-xl mb-4">
                        <h4 className="font-bold text-orange-900 mb-3">측정 목표 (KPI)</h4>
                        <div className="space-y-3">
                            <div className="flex gap-3 items-start">
                                <div className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</div>
                                <p className="text-sm text-gray-900">보스 콘텐츠 참여율(Participation Rate) 변화 측정</p>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</div>
                                <p className="text-sm text-gray-900">이벤트 보상으로 인한 전체 서버 경험치 인플레이션 모니터링</p>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</div>
                                <p className="text-sm text-gray-900">'1인 격파' 및 '1/N 분배' 시스템에 대한 유저 여론 수집</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Phase 2 */}
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="text-blue-600" />
                        Phase 2: 정규화 검토 (Future Plan)
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Scenario A */}
                        <div className="bg-green-50 border-2 border-green-300 p-5 rounded-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <CheckCircle className="text-green-600" size={20} />
                                <h4 className="font-bold text-green-900">시나리오 A</h4>
                            </div>
                            <p className="text-xs text-green-700 font-bold mb-2">반응 긍정적</p>
                            <p className="text-sm text-gray-900 leading-relaxed">
                                보상 밸런스를 소폭 조정(하향 안정화)하여 <span className="font-bold text-green-800">[분기별 시즌제 이벤트]</span> 혹은
                                <span className="font-bold text-green-800"> [상시 콘텐츠]</span>로 격상.
                            </p>
                        </div>

                        {/* Scenario B */}
                        <div className="bg-amber-50 border-2 border-amber-300 p-5 rounded-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="text-amber-600" size={20} />
                                <h4 className="font-bold text-amber-900">시나리오 B</h4>
                            </div>
                            <p className="text-xs text-amber-700 font-bold mb-2">콘텐츠 소모 속도 과열</p>
                            <p className="text-sm text-gray-900 leading-relaxed">
                                경험치 보상 수치를 조절하거나, <span className="font-bold text-amber-800">'월간(Monthly) 미션'</span> 형태로
                                주기를 변경하여 재도입.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Risk Management */}
                <div className="mt-6 bg-gray-900 text-white p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Trophy className="text-amber-400" />
                        리스크 관리 (Risk Management)
                    </h4>
                    <ul className="space-y-2 text-sm">
                        <li className="flex gap-2 items-start">
                            <span className="text-amber-400 shrink-0">•</span>
                            <span>주간 1회 제한으로 급격한 레벨 인플레이션 방지</span>
                        </li>
                        <li className="flex gap-2 items-start">
                            <span className="text-amber-400 shrink-0">•</span>
                            <span>파티 분배 시스템으로 버스(Carry) 악용 차단</span>
                        </li>
                        <li className="flex gap-2 items-start">
                            <span className="text-amber-400 shrink-0">•</span>
                            <span>4주 파일럿 기간 동안 실시간 데이터 모니터링 및 긴급 조정 가능</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* PAGE 6: Expected Impact */}
            <div className="a4-page">
                <div className="border-b-4 border-amber-600 pb-2 mb-8 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">5. 기대 효과</h2>
                    <span className="text-gray-500 font-bold">06 / 06</span>
                </div>

                <div className="space-y-6 mb-10">
                    {/* Short Term */}
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <Zap className="text-blue-600" size={28} />
                            <h3 className="text-xl font-bold text-blue-900">단기적 효과 (Short-term)</h3>
                        </div>
                        <p className="text-gray-900 leading-relaxed pl-10">
                            이벤트 기간 내 <span className="font-bold text-blue-700">접속률(Retention) 방어</span> 및
                            <span className="font-bold text-blue-700"> 보스 파티 활성화</span>.
                        </p>
                    </div>

                    {/* Long Term */}
                    <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <TrendingUp className="text-purple-600" size={28} />
                            <h3 className="text-xl font-bold text-purple-900">장기적 효과 (Long-term)</h3>
                        </div>
                        <p className="text-gray-900 leading-relaxed pl-10 text-lg">
                            <span className="font-black text-purple-800 text-xl">"사냥을 하지 않아도 최소한의 성장은 가능하다"</span>는
                            긍정적 경험을 심어주어, 사냥 피로도로 인한 이탈을 <span className="font-bold text-purple-700">구조적으로 방지</span>.
                        </p>
                    </div>
                </div>

                {/* Impact Summary */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
                        <Award className="mx-auto text-green-600 mb-2" size={32} />
                        <h4 className="font-bold text-gray-900 mb-1">유저 만족도</h4>
                        <p className="text-sm text-gray-900">다양한 플레이 스타일 수용</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
                        <Users className="mx-auto text-blue-600 mb-2" size={32} />
                        <h4 className="font-bold text-gray-900 mb-1">커뮤니티 활성화</h4>
                        <p className="text-sm text-gray-900">파티 플레이 증가</p>
                    </div>
                </div>

                {/* Conclusion */}
                <div className="mt-auto bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white p-8 rounded-xl text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')]"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-4">WANTED: Weekly Boss Bounty</h2>
                        <div className="w-20 h-1 bg-amber-300 mx-auto mb-6"></div>
                        <p className="text-lg italic text-amber-100">
                            "Hunt the Boss, Earn Your Growth."<br />
                            <span className="text-sm not-italic mt-2 block text-amber-200">
                                보스를 사냥하고, 성장을 얻으세요.
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Print Button */}
            <button
                onClick={() => window.print()}
                className="fixed bottom-8 right-8 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all transform hover:-translate-y-1 z-50 print:hidden no-print"
            >
                <Printer size={20} />
                <span className="font-semibold">PDF로 저장</span>
            </button>
        </div>
    );
}
