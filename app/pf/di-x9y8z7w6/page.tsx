'use client';

import React, { useEffect } from 'react';
import {
    Printer, Globe, Swords, Zap, Award, Gem, TrendingUp,
    Timer, Share2, ShieldAlert, Sparkles, Map, Target, Calendar, ChevronRight
} from 'lucide-react';

export default function DimensionInvaderPortfolio() {
    // 광고 제거 (Safety Check) - 기존 포트폴리오와 동일하게 유지
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

                .text-dimension {
                    color: #7c3aed; /* Violet-600 */
                }
                
                .bg-dimension-light {
                    background-color: #f5f3ff; /* Violet-50 */
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
            <div className="a4-page flex flex-col justify-between bg-black text-white relative overflow-hidden">
                {/* Background Image & Overlays */}
                <div className="absolute inset-0 bg-[url('/images/dimension-invader-cover.jpg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90"></div>
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="relative z-10 pt-20 pl-8">
                    <p className="text-purple-400 font-bold tracking-[0.2em] mb-4 uppercase drop-shadow-md">New Event Proposal</p>
                    <h1 className="text-7xl font-extrabold leading-tight mb-4 text-white drop-shadow-2xl">
                        CROSS-WORLD <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 filter drop-shadow-lg">RAID</span>
                    </h1>
                    <div className="h-1 w-32 bg-purple-500 mb-8 shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>
                    <p className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                        Dimension Invader
                    </p>
                    <p className="text-xl font-light text-gray-200 drop-shadow-md">
                        Subtitle: 차원의 균열 너머,<br />
                        이계의 강적들을 토벌하라
                    </p>
                </div>

                {/* Middle Section - Empty to show the artwork (The 4 bosses) */}
                <div className="relative z-10 flex-1"></div>

                <div className="relative z-10 p-8 border-t border-white/10 flex justify-between items-end bg-black/60 backdrop-blur-md">
                    <div>
                        <p className="text-purple-300 text-sm">Game Planner</p>
                        <p className="font-bold text-white text-lg">이경준</p>
                        <p className="text-gray-400 text-xs mt-1">Project: Global Content Import</p>
                    </div>
                    <div className="text-right">
                        <p className="text-purple-300 text-sm">Target Period</p>
                        <p className="font-bold text-white text-lg">4 Weeks</p>
                        <p className="text-gray-400 text-xs mt-1">Season Event</p>
                    </div>
                </div>
            </div>

            {/* Slide 2. Overview */}
            <div className="a4-page">
                <div className="border-b-4 border-purple-900 pb-2 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">1. Overview</h2>
                    <span className="text-gray-500 font-bold">01 / 07</span>
                </div>

                {/* 1. Intent */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Target className="text-purple-700" /> 1. 기획 의도 (Intent)
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white border-l-4 border-blue-500 p-4 shadow-sm">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-lg text-gray-900">Global Integration (경험의 확장)</h4>
                                <Globe className="text-blue-500" size={20} />
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                유튜브로만 접하던 해외(GMS/TMS) 및 모바일(Maple M)의 오리지널 보스를 KMS 환경에 맞춰 이식.
                                <br /><span className="font-bold text-blue-700">→ '메이플스토리 IP의 확장성'을 체감.</span>
                            </p>
                        </div>

                        <div className="bg-white border-l-4 border-purple-500 p-4 shadow-sm">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-lg text-gray-900">Visual Shock (시각적 환기)</h4>
                                <Sparkles className="text-purple-500" size={20} />
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                2025~2026년 최신 보스들의 압도적인 비주얼과 연출 활용.
                                <br /><span className="font-bold text-purple-700">→ 기존 보스 루틴에 지친 유저들에게 신선한 충격 제공.</span>
                            </p>
                        </div>

                        <div className="bg-white border-l-4 border-green-500 p-4 shadow-sm">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-lg text-gray-900">Zero-Fatigue (피로도 제로)</h4>
                                <Zap className="text-green-500" size={20} />
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                "콘텐츠 추가 = 숙제 증가" 공식 타파.
                                <br /><span className="font-bold text-green-700">→ '성장 효율'과 '선택적 재미'를 분리하여 자발적 참여 유도.</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. Concept */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Map className="text-purple-700" /> 2. 핵심 컨셉 (Concept)
                    </h3>

                    <div className="bg-gray-900 text-white p-6 rounded-xl relative overflow-hidden mb-4">
                        <div className="relative z-10">
                            <div className="mb-4">
                                <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">STORY</span>
                                <p className="text-lg font-medium leading-relaxed">
                                    차원의 도서관 깊은 곳, '차원 안정기'의 오작동으로<br />
                                    <span className="text-purple-300 font-bold">다른 차원(해외/모바일)</span>의 강적들이 메이플 월드로 넘어옴.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Calendar size={16} />
                                <span>기간: 4주간 진행 (시즌제 이벤트 레이드)</span>
                            </div>
                        </div>
                        {/* Deco */}
                        <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500 blur-[60px] opacity-30"></div>
                    </div>
                </div>

                {/* 3. Onboarding */}
                <div className="mt-auto bg-gray-100 p-5 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Timer size={18} /> 접근성 강화 (Onboarding Strategy)
                    </h3>
                    <div className="flex gap-4 items-center">
                        <div className="bg-black text-white px-3 py-2 rounded text-xs font-mono">1 min Cinematic</div>
                        <p className="text-sm text-gray-700">
                            보스 입장 전 1분 내외의 [숏폼 시네마틱] 강제 재생(스킵 가능).<br />
                            <span className="text-gray-500 text-xs">→ "얘가 누군데?" 방지 및 공략해야 할 '서사적 동기' 부여.</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Slide 2. Boss Lineup */}
            <div className="a4-page">
                <div className="border-b-4 border-purple-900 pb-2 mb-3 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">2. Boss Lineup</h2>
                    <span className="text-gray-500 font-bold">02 / 07</span>
                </div>

                <p className="text-lg font-bold text-gray-800 italic mb-4 text-center">
                    "과거의 전설(골럭스)부터 2026년 최신 재앙(아자젤)까지."
                </p>

                <div className="flex flex-col gap-2">
                    {/* Boss 1: Gollux */}
                    <div className="flex gap-3 bg-white border border-gray-200 p-2 rounded-xl shadow-sm hover:border-purple-300 transition-colors items-center">
                        <div className="w-14 h-14 bg-stone-200 rounded-lg flex items-center justify-center shrink-0 flex-col">
                            <span className="font-bold text-stone-700 text-xs">GMS</span>
                            <span className="text-[10px] text-stone-500">(북미)</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-0.5">
                                <h3 className="text-lg font-bold text-gray-900">골럭스 (Gollux)</h3>
                                <span className="bg-stone-100 text-stone-600 text-[10px] px-2 py-0.5 rounded font-bold">The Giant</span>
                            </div>
                            <ul className="text-xs text-gray-700 space-y-0.5 list-disc list-inside">
                                <li>압도적인 크기의 거대 보스 / 부위 파괴 공략의 원조</li>
                            </ul>
                        </div>
                    </div>

                    {/* Boss 2: Malisha */}
                    <div className="flex gap-3 bg-white border border-gray-200 p-2 rounded-xl shadow-sm hover:border-red-300 transition-colors items-center">
                        <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center shrink-0 flex-col">
                            <span className="font-bold text-red-700 text-xs">TMS</span>
                            <span className="text-[10px] text-red-500">(대만)</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-0.5">
                                <h3 className="text-lg font-bold text-gray-900">말리샤 (Malisha)</h3>
                                <span className="bg-red-50 text-red-600 text-[10px] px-2 py-0.5 rounded font-bold">Red Moon</span>
                            </div>
                            <ul className="text-xs text-gray-700 space-y-0.5 list-disc list-inside">
                                <li>2025년 '붉은 달의 숲' 주인 / <span className="font-bold text-red-600">붉은 실과 거울</span> 패턴</li>
                            </ul>
                        </div>
                    </div>

                    {/* Boss 3: Arkan */}
                    <div className="flex gap-3 bg-white border border-gray-200 p-2 rounded-xl shadow-sm hover:border-blue-300 transition-colors items-center">
                        <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 flex-col">
                            <span className="font-bold text-blue-700 text-xs">Mobile</span>
                            <span className="text-[10px] text-blue-500">(M)</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-0.5">
                                <h3 className="text-lg font-bold text-gray-900">아칸 (Arkan)</h3>
                                <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded font-bold">Light Eater</span>
                            </div>
                            <ul className="text-xs text-gray-700 space-y-0.5 list-disc list-inside">
                                <li>헬리아의 빛을 삼킨 어둠의 지배자 / <span className="font-bold text-blue-600">빛과 어둠을 오가는 반전 연출과 화려한 광역기</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* Boss 4: Azazel */}
                    <div className="flex gap-3 bg-white border border-gray-200 p-2 rounded-xl shadow-sm hover:border-purple-300 transition-colors items-center">
                        <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center shrink-0 flex-col">
                            <span className="font-bold text-purple-700 text-xs">Mobile</span>
                            <span className="text-[10px] text-purple-500">(New)</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-0.5">
                                <h3 className="text-lg font-bold text-gray-900">아자젤 (Azazel)</h3>
                                <span className="bg-purple-50 text-purple-600 text-[10px] px-2 py-0.5 rounded font-bold">Full Bloom</span>
                            </div>
                            <ul className="text-xs text-gray-700 space-y-0.5 list-disc list-inside">
                                <li>검게 물든 몽화(꽃)의 개화를 테마로 한 몽환적 연출 / <span className="font-bold text-purple-600">치명적인 탄막 패턴</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Added Visual Image - Filled Remaining Space */}
                <div className="mt-4 flex-1 flex flex-col min-h-0">
                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg border-2 border-purple-500/20 group bg-gray-900">
                        <img
                            src="/images/dimension-invader-cover.jpg"
                            alt="Boss Lineup Visual"
                            className="w-full h-full object-contain object-center absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-white font-bold text-sm drop-shadow-md tracking-wide text-center">
                                Visual Integration: Unifying Art Styles for KMS Environment
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide 4. Operation & Difficulty */}
            <div className="a4-page">
                <div className="border-b-4 border-purple-900 pb-2 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">3. Operation & Difficulty</h2>
                    <span className="text-gray-500 font-bold">03 / 07</span>
                </div>

                {/* Difficulty */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">1. 난이도 설계 (Difficulty Tier)</h3>
                    <div className="flex gap-4">
                        <div className="flex-1 bg-green-50 p-3 rounded-lg border border-green-200 text-center">
                            <div className="font-extrabold text-green-700 mb-1 text-base">Easy</div>
                            <div className="text-xs text-gray-600">스토리 모드</div>
                            <div className="text-[10px] text-gray-400 mt-1">(초저스펙)</div>
                        </div>
                        <div className="flex-1 bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
                            <div className="font-extrabold text-blue-700 mb-1 text-base">Normal</div>
                            <div className="text-xs text-gray-600">카루타 수준</div>
                            <div className="text-[10px] text-gray-400 mt-1">(저스펙)</div>
                        </div>
                        <div className="flex-1 bg-purple-50 p-3 rounded-lg border border-purple-200 text-center">
                            <div className="font-extrabold text-purple-700 mb-1 text-base">Hard</div>
                            <div className="text-xs text-gray-600">하드 스우</div>
                            <div className="text-[10px] text-gray-400 mt-1">(본캐 숙제)</div>
                        </div>
                        <div className="flex-1 bg-red-50 p-3 rounded-lg border border-red-200 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded-bl">RANK</div>
                            <div className="font-extrabold text-red-700 mb-1 text-base">Extreme</div>
                            <div className="text-xs text-gray-600">명예 경쟁</div>
                            <div className="text-[10px] text-gray-400 mt-1">(Time Attack)</div>
                        </div>
                    </div>
                </div>

                {/* Operation Logic */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">2. 운영 방식: 위클리 원 픽 (Weekly One Pick)</h3>
                    <p className="text-gray-600 italic mb-4 text-sm">"해야 할 일은 늘리지 않고, 즐길 거리만 늘립니다."</p>

                    <div className="bg-gray-100 p-5 rounded-xl mb-4">
                        <h4 className="font-bold text-gray-800 mb-3 text-base">동시 오픈 & 주간 포커싱 (Simultaneous & Focus)</h4>
                        <ul className="text-sm text-gray-700 space-y-2">
                            <li className="flex gap-2">
                                <span className="font-bold min-w-[60px]">System:</span>
                                4종의 보스가 기간 내 상시 개방. 즉시 도전 가능.
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold min-w-[60px]">Focus:</span>
                                매주 특정 보스가 <span className="text-purple-600 font-bold">'균열의 주인(Main Boss)'</span>으로 지정됨.
                            </li>
                        </ul>

                        {/* Weekly Calendar Visual */}
                        <div className="flex gap-0 mt-4 border rounded-lg overflow-hidden text-center text-xs">
                            <div className="flex-1 bg-stone-100 py-2 border-r text-stone-900">W1<br /><b>골럭스</b></div>
                            <div className="flex-1 bg-red-50 py-2 border-r text-red-900">W2<br /><b>말리샤</b></div>
                            <div className="flex-1 bg-blue-50 py-2 border-r text-blue-900">W3<br /><b>아칸</b></div>
                            <div className="flex-1 bg-purple-50 py-2 bg-purple-100 font-bold border-2 border-purple-500 relative text-purple-900">W4<br />아자젤<span className="absolute -top-1 -right-1 flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span></span></div>
                        </div>
                    </div>

                    <div className="bg-black text-white p-5 rounded-xl relative overflow-hidden border border-gray-700">
                        <h4 className="font-bold text-white mb-3 flex items-center gap-2 text-base">
                            <Sparkles size={18} className="text-yellow-400" /> 시스템 및 연출 기획
                        </h4>
                        <div className="grid grid-cols-2 gap-6 text-sm z-10 relative">
                            <div>
                                <p className="font-bold text-white text-sm mb-1">전용 UI: [차원 관측기]</p>
                                <p className="text-white opacity-90">보스 실루엣이 'TV 노이즈' 효과와 함께 등장.</p>
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm mb-1">Custom Effects</p>
                                <p className="text-white opacity-90 leading-relaxed">
                                    <span className="text-red-300 font-bold">[Malisha]</span> 깨진 거울 컨셉 UI<br />
                                    <span className="text-purple-300 font-bold">[Azazel]</span> 검은 꽃잎이 흩날리는 효과
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reward Rule Brief */}
                {/* Reward Rule Brief - Enhanced */}
                <div className="mt-auto bg-amber-50 border-l-8 border-amber-500 p-5 rounded-r-xl shadow-md">
                    <h4 className="font-bold text-amber-900 text-lg mb-3 flex items-center gap-2">
                        <Award className="text-amber-600" size={22} /> 보상 획득 규칙 (Core Logic)
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm relative">
                            <div className="absolute -top-2.5 left-4 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200">KEY 01</div>
                            <span className="block text-base font-bold text-gray-900 mb-1 mt-1">1. 성장 보상</span>
                            <p className="text-sm text-gray-700 leading-snug">
                                기간 내 <span className="font-bold text-red-600 border-b-2 border-red-100">계정당 1회</span>만 지급.<br />
                                <span className="text-xs text-gray-500">('균열의 주인' 클리어 시 획득)</span>
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm relative">
                            <div className="absolute -top-2.5 left-4 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200">KEY 02</div>
                            <span className="block text-base font-bold text-gray-900 mb-1 mt-1">2. 도전 보상</span>
                            <p className="text-sm text-gray-700 leading-snug">
                                횟수 제한 없이 <span className="font-bold text-blue-600 border-b-2 border-blue-100">무한 도전</span> 가능.<br />
                                <span className="text-xs text-gray-500">(치장 아이템 드랍)</span>
                            </p>
                        </div>
                    </div>

                    <div className="text-center">
                        <span className="inline-block bg-white px-5 py-2 rounded-full border border-amber-200 text-amber-900 font-bold text-sm shadow-sm">
                            <span className="text-red-500 mr-2">●</span>
                            스펙업 유저는 패스 가능, 코디/컨트롤 유저는 무한 도전
                        </span>
                    </div>
                </div>
            </div>

            {/* Slide 4. Ranking System */}
            <div className="a4-page flex flex-col">
                <div className="border-b-4 border-purple-900 pb-2 mb-6 flex justify-between items-end shrink-0">
                    <h2 className="text-3xl font-extrabold text-gray-900">4. Ranking System</h2>
                    <span className="text-gray-500 font-bold">04 / 07</span>
                </div>

                {/* 1. Tactical Score */}
                <div className="mb-6 shrink-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Award className="text-purple-600" /> 1. 랭킹 시스템: 전술 점수 (Tactical Score)
                    </h3>
                    <p className="text-gray-600 italic mb-4 pl-8">"단순히 빠른 것이 강함은 아닙니다. 완벽한 대처가 실력입니다."</p>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow-sm">
                        <div className="mb-5 border-b border-gray-100 pb-4">
                            <div className="text-xs text-gray-500 font-bold uppercase mb-1">Evaluation Criteria</div>
                            <div className="font-bold text-2xl text-gray-800 flex items-center gap-3">
                                <span className="text-gray-400 font-normal">Time Attack</span>
                                <span className="text-red-500 text-lg">❌</span>
                                <ChevronRight size={24} className="text-gray-300" />
                                <span className="text-blue-600">Tactical Score</span>
                                <span className="text-blue-600 text-lg">⭕</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                직업 편차와 서버 렉 이슈가 있는 '단순 타임어택'을 지양하고,<br />
                                <span className="font-bold text-gray-900 underline decoration-purple-400 decoration-2 underline-offset-4">[컨트롤 숙련도]</span>를 정밀하게 평가합니다.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            {/* Base */}
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                                <span className="font-bold text-gray-700">기본 점수 (Base)</span>
                                <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded">클리어 시 지급</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {/* Bonus */}
                                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                    <div className="text-blue-800 font-bold text-sm mb-2 flex items-center gap-2">
                                        <TrendingUp size={16} /> 가산점 (Bonus +)
                                    </div>
                                    <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                                        <li><span className="font-bold">Perfect Guard:</span> <br />핵심 패턴 파훼 성공</li>
                                        <li><span className="font-bold">Gimmick Clear:</span> <br />부위 파괴 및 기믹 수행</li>
                                    </ul>
                                </div>

                                {/* Penalty */}
                                <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                                    <div className="text-red-800 font-bold text-sm mb-2 flex items-center gap-2">
                                        <ShieldAlert size={16} /> 감점 (Penalty -)
                                    </div>
                                    <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                                        <li><span className="font-bold">Hit Count:</span> <br />피격 횟수 누적 시 감점</li>
                                        <li><span className="font-bold">Death Count:</span> <br />부활 시 <span className="text-red-600 font-extrabold">대폭 감점</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Honor Reward - Grid Layout */}
                <div className="flex-1 flex flex-col mt-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 shrink-0">
                        <Target className="text-purple-600" /> 2. 명예 보상: 서버별 Top 1 (Server Ranking)
                    </h3>

                    <div className="grid grid-cols-2 gap-4 h-full min-h-0">
                        {/* Server Ranking Strategy */}
                        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-5 rounded-xl border border-yellow-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-amber-900 mb-4 text-lg border-b border-yellow-200 pb-2">
                                    운영 전략 : 마을 동상 건립
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <span className="block font-bold text-red-600 text-xs mb-1">[RISK]</span>
                                        <p className="text-sm text-gray-800 leading-snug">전 서버 통합 랭킹 진행 시<br />대형 서버(루나/스카니아) 독식 우려.</p>
                                    </div>
                                    <div>
                                        <span className="block font-bold text-blue-600 text-xs mb-1">[SOLUTION]</span>
                                        <p className="text-sm text-gray-800 leading-snug">
                                            각 월드(서버)별 1위 파티 선정<br />
                                            <span className="font-bold bg-yellow-200/80 px-1 rounded text-amber-900 ring-1 ring-yellow-300">마을에 NPC 동상 건립</span><br />
                                            <span className="text-xs text-gray-600 font-medium mt-1 inline-block">(이벤트 기간 내)</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Award className="absolute -right-4 -bottom-4 text-yellow-500/10" size={140} />
                        </div>

                        {/* Top 10 Reward */}
                        <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-5 rounded-xl border border-purple-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
                            <div>
                                <div className="flex justify-between items-center mb-4 border-b border-purple-200 pb-2">
                                    <h4 className="font-bold text-purple-900 text-lg">Top 10 보상</h4>
                                    <span className="text-[10px] font-bold text-white bg-purple-600 px-2 py-0.5 rounded-full">LIMITED</span>
                                </div>

                                <div className="text-center py-2">
                                    <p className="font-bold text-purple-700 text-xl mb-1">[ 피니시 이펙트 ]</p>
                                    <p className="text-xs text-purple-500 mb-4">Finish Effect Custom</p>
                                </div>

                                <div className="bg-white/60 p-3 rounded-lg border border-purple-100 backdrop-blur-sm">
                                    <p className="text-sm text-gray-700 leading-relaxed text-center">
                                        보스 처치 완료 시,<br />
                                        <b>아칸의 어둠이 걷히거나<br />아자젤의 꽃이 지는</b><br />
                                        전용 화면 연출 발동.
                                    </p>
                                </div>
                            </div>
                            <Sparkles className="absolute -left-4 -top-4 text-purple-500/10" size={140} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide 6. Rewards */}
            <div className="a4-page">
                <div className="border-b-4 border-purple-900 pb-2 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">5. Reward Structure</h2>
                    <span className="text-gray-500 font-bold">05 / 07</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">"성장은 효율적으로, 명예는 확실하게."</h3>

                <div className="space-y-6 mt-6">
                    {/* 1. Growth */}
                    <div className="border rounded-xl p-5 shadow-sm bg-white">
                        <h4 className="font-bold text-lg mb-3 flex items-center gap-2 text-gray-900">
                            <Gem className="text-blue-500" /> [성장] 차원의 전리품: 난이도별 코인
                        </h4>
                        <div className="bg-blue-50 px-4 py-2 rounded text-sm text-blue-800 mb-4 inline-block font-bold">
                            상위 난이도 클리어 시, 하위 난이도 보상 자동 획득 (낙수 효과)
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                            <div className="p-3 bg-gray-50 rounded border">
                                <span className="block text-gray-500 text-xs font-bold mb-1">초급 (Easy/Normal)</span>
                                <span className="text-sm text-gray-800 font-bold">EXP 쿠폰, 황금딸기 농장,<br />3배 쿠폰</span>
                            </div>
                            <div className="p-3 bg-gray-100 rounded border">
                                <span className="block text-gray-500 text-xs font-bold mb-1">중급 (Hard)</span>
                                <span className="text-sm text-gray-800 font-bold">성장의 비약 (200~249), 폭성비</span>
                            </div>
                            <div className="p-3 bg-gray-200 rounded border">
                                <span className="block text-gray-500 text-xs font-bold mb-1">고급 (Extreme)</span>
                                <span className="text-sm text-gray-800 font-bold">상급 EXP 쿠폰, 익스프레스 부스터</span>
                            </div>
                        </div>
                        <p className="text-xs text-right text-gray-400 mt-2">*해외 보스 체험 + 본캐 성장 지원 목적</p>
                    </div>

                    {/* 2. Cosmetic */}
                    <div className="border rounded-xl p-5 shadow-sm bg-white">
                        <h4 className="font-bold text-lg mb-2 flex items-center gap-2 text-gray-900">
                            <Sparkles className="text-purple-500" /> [코디] 이계의 유물 (Cosmetic)
                        </h4>
                        <div className="mb-4">
                            <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-bold border border-purple-100 mr-2">Core Value</span>
                            <span className="text-sm text-gray-700 font-medium">능력치 없음, 영구제, 월드 내 교환 가능 <span className="text-gray-400 text-xs">(무제한 도전 동기 부여)</span></span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                <span className="block font-bold text-gray-800 text-sm mb-1">골럭스 (Gollux)</span>
                                <div className="text-xs text-gray-600 space-y-0.5">
                                    <p>• 타락한 숲의 기운 <span className="text-gray-400">(망토)</span></p>
                                    <p>• 페이스 페인팅</p>
                                </div>
                            </div>
                            <div className="bg-red-50 p-3 rounded border border-red-100">
                                <span className="block font-bold text-red-800 text-sm mb-1">말리샤 (Malisha)</span>
                                <div className="text-xs text-gray-700 space-y-0.5">
                                    <p>• 붉은 달의 맹세 <span className="text-gray-500">(한벌옷)</span></p>
                                    <p>• 나비의 춤 <span className="text-gray-500">(이펙트)</span></p>
                                </div>
                            </div>
                            <div className="bg-blue-50 p-3 rounded border border-blue-100">
                                <span className="block font-bold text-blue-800 text-sm mb-1">아칸 (Akhan)</span>
                                <div className="text-xs text-gray-700 space-y-0.5">
                                    <p>• 빛을 삼킨 자 <span className="text-gray-500">(칭호)</span></p>
                                    <p>• 헬리아의 족쇄 <span className="text-gray-500">(무기)</span></p>
                                </div>
                            </div>
                            <div className="bg-purple-50 p-3 rounded border border-purple-100">
                                <span className="block font-bold text-purple-800 text-sm mb-1">아자젤 (Azazel)</span>
                                <div className="text-xs text-gray-700 space-y-0.5">
                                    <p>• 몽화의 개화 <span className="text-gray-500">(의자)</span></p>
                                    <p>• 재앙의 꽃핀 <span className="text-gray-500">(모자)</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Symbolic */}
                    <div className="border rounded-xl p-5 shadow-sm bg-gray-900 text-white">
                        <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <Award className="text-yellow-400" /> [명예] 상징 오라 (Symbolic Aura)
                        </h4>
                        <div className="flex justify-between items-center text-sm gap-4">
                            <div className="flex-1">
                                <p className="mb-1"><span className="text-yellow-400 font-bold">대상:</span> Extreme 난이도 클리어 / 랭커</p>
                                <p className="text-white leading-snug">캐릭터 주변에 검은 꽃잎이 휘날리거나(아자젤),<br />붉은 실이 감도는(말리샤) 오라 상시 적용.</p>
                            </div>
                            <div className="text-right text-xs text-white border-l border-gray-700 pl-4 w-28 shrink-0">
                                고스펙 유저들의<br />'과시 욕구' 충족
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide 7. Expected Impact */}
            <div className="a4-page">
                <div className="border-b-4 border-purple-900 pb-2 mb-10 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">6. Expected Impact</h2>
                    <span className="text-gray-500 font-bold">06 / 07</span>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-16">
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                        <h4 className="font-bold text-lg mb-2 text-blue-800">Engagement (지표 상승)</h4>
                        <p className="text-gray-600">매일 반복되는 숙제에 지친 유저들에게 <span className="font-bold">'새로운 공략의 재미'</span>를 제공하여 접속 유지율(Retention) 증대.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
                        <h4 className="font-bold text-lg mb-2 text-purple-800">Viral (이슈화)</h4>
                        <p className="text-gray-600">"한국에 없던 보스"라는 타이틀과 화려한 비주얼로 스트리머/유튜버들의 <span className="font-bold">자발적 콘텐츠 생산</span> 유도.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                        <h4 className="font-bold text-lg mb-2 text-green-800">Sustainability (지속성)</h4>
                        <p className="text-gray-600">'위클리 원 픽' 시스템을 통해 유저 피로도를 제어함으로써, 이벤트 끝까지 이탈 없는 참여 유도.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-pink-500">
                        <h4 className="font-bold text-lg mb-2 text-pink-800">Global Integration (경험 확장)</h4>
                        <p className="text-gray-600">유튜브 에디션으로만 보던 해외/모바일 보스를 직접 플레이하며 '메이플스토리 IP'의 확장성 체감.</p>
                    </div>
                </div>

                <div className="bg-gray-100 p-6 rounded-xl text-center border border-gray-200">
                    <ShieldAlert size={32} className="mx-auto text-gray-400 mb-2" />
                    <h4 className="font-bold text-gray-800 mb-1">No Inflation (경제 보호)</h4>
                    <p className="text-sm text-gray-600">스펙업 장비가 아닌 '코디/경험치' 중심 보상으로, 경제 밸런스 영향 없이 순수한 축제 분위기 조성.</p>
                </div>

                {/* Conclusion Footer */}
                <div className="mt-auto bg-gray-900 text-white p-12 text-center rounded-xl bg-[url('https://maplestory.io/api/GMS/210/map/450004150/render')] bg-cover bg-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/80"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-extrabold mb-4">Dimension Invader</h2>
                        <div className="w-16 h-1 bg-purple-600 mx-auto mb-8"></div>
                        <p className="font-serif italic text-gray-300">
                            "The rift is open. Will you answer the call?"<br />
                            <span className="text-sm not-italic mt-2 block text-gray-500">차원의 틈이 열렸습니다. 부름에 응하시겠습니까?</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Print Button */}
            <button
                onClick={() => window.print()}
                className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all transform hover:-translate-y-1 z-50 print:hidden no-print"
            >
                <Printer size={20} />
                <span className="font-semibold">PDF로 저장</span>
            </button>
        </div>
    );
}

