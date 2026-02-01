'use client';

import React, { useEffect } from 'react';
import {
    Printer, Skull, Target, Map, Trophy, Coins, Gift, TrendingUp,
    AlertTriangle, Shield, Eye, Lock, Zap, MousePointer2
} from 'lucide-react';

export default function LimitedWorldPortfolio() {
    // 광고 제거 (Safety Check)
    useEffect(() => {
        const removeAds = () => {
            document.querySelectorAll('.adsbygoogle, .google-auto-placed, iframe[id^="google_ads_iframe"]').forEach(el => el.remove());
        };
        removeAds();
        const interval = setInterval(removeAds, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#1a1a1a] py-12 px-4 print:p-0 print:bg-white">
            <style jsx global>{`
                @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
                body { font-family: 'Pretendard', sans-serif; -webkit-print-color-adjust: exact; }
                
                .a4-page {
                    width: 210mm;
                    height: 297mm; /* 고정 높이 */
                    padding: 15mm; /* 여백 축소 */
                    margin: 0 auto 2rem;
                    background: white;
                    box-shadow: 0 0 20px rgba(0,0,0,0.5);
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .text-stress {
                    color: #dc2626;
                    font-weight: 800;
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
            <div className="a4-page flex flex-col justify-between bg-black text-white relative" style={{ backgroundColor: '#000000' }}>
                {/* Background Texture */}
                <div className="absolute inset-0 bg-[url('https://maplestory.io/api/GMS/210/map/100000000/render')] bg-cover opacity-30 grayscale"></div>

                <div className="relative z-10 pt-20 pl-8">
                    <p className="text-red-600 font-bold tracking-widest mb-4">NEW CONTENT PROPOSAL</p>
                    <h1 className="text-7xl font-extrabold leading-tight mb-4 text-white">
                        LIMITED <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">WORLD</span>
                    </h1>
                    <div className="h-1 w-32 bg-red-600 mb-8"></div>
                    <p className="text-2xl font-light text-gray-300">
                        Subtitle: 에르다의 진공지대,<br />
                        <strong className="text-white">그레이 더스트 (The Grey Dust)</strong>
                    </p>
                </div>

                <div className="relative z-10 flex-1 flex items-center justify-center">
                    {/* Visual Point: Red Eyes in Darkness */}
                    <div className="relative">
                        <div className="w-64 h-64 bg-black rounded-full shadow-[0_0_100px_rgba(220,38,38,0.3)] flex items-center justify-center gap-12 border border-gray-900">
                            {/* Hard Damien Eyes */}
                            <div className="w-4 h-1 bg-red-600 shadow-[0_0_20px_2px_rgba(255,0,0,0.8)] rotate-12"></div>
                            <div className="w-4 h-1 bg-red-600 shadow-[0_0_20px_2px_rgba(255,0,0,0.8)] -rotate-12"></div>
                        </div>
                        <p className="text-center text-gray-500 mt-8 text-sm tracking-widest font-bold">SEASON HARDCORE SERVER</p>
                    </div>
                </div>

                <div className="relative z-10 p-8 border-t border-gray-800 flex justify-between items-end bg-black/50 backdrop-blur-sm">
                    <div>
                        <p className="text-gray-400 text-sm">Game Planner</p>
                        <p className="font-bold text-white text-lg">이경준</p>
                        <p className="text-gray-500 text-xs mt-1">Target: Hardcore Gamers</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-400 text-sm">Portfolio Date</p>
                        <p className="font-bold text-white text-lg">2026. 02</p>
                        <p className="text-gray-500 text-xs mt-1">Release: 2026 Season 1</p>
                    </div>
                </div>
            </div>

            {/* Slide 1. 기획 의도 및 프로젝트 범위 */}
            <div className="a4-page">
                <div className="border-b-4 border-gray-900 pb-2 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">1. Overview & Scope</h2>
                    <span className="text-gray-500 font-bold">01 / 07</span>
                </div>

                {/* 1. Core Concept */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Target className="text-red-600" /> 1. 핵심 컨셉 (Core Concept)
                    </h3>
                    <div className="bg-gray-100 p-6 rounded-xl border-l-8 border-gray-900 shadow-sm mb-4">
                        <p className="text-xl font-bold text-center text-gray-900 italic">
                            "아케인 리버 이전,<br />무너져가는 최후의 세계에서 생존하라."
                        </p>
                    </div>

                    <h4 className="font-bold text-gray-800 mb-2">기획 의도 (Intent)</h4>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200">
                            <div className="bg-red-100 p-1.5 rounded text-red-700 font-bold shrink-0 w-28 text-center text-sm">Anti-Inflation</div>
                            <div>
                                <p className="font-bold text-gray-900 mb-0.5 text-sm">공정한 경쟁의 장 마련</p>
                                <p className="text-xs text-gray-600">스펙 인플레를 벗어나 <span className="text-stress">컨트롤</span>과 <span className="text-stress">집단지성</span>이 지배하는 환경</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200">
                            <div className="bg-gray-200 p-1.5 rounded text-gray-700 font-bold shrink-0 w-28 text-center text-sm">Concentration</div>
                            <div>
                                <p className="font-bold text-gray-900 mb-0.5 text-sm">유저 밀도 및 커뮤니티 활성화</p>
                                <p className="text-xs text-gray-600">플레이 반경을 좁혀 유저 밀도를 높이고 파티 플레이 유도</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200">
                            <div className="bg-gray-800 p-1.5 rounded text-white font-bold shrink-0 w-28 text-center text-sm">New Experience</div>
                            <div>
                                <p className="font-bold text-gray-900 mb-0.5 text-sm">익숙함 속의 새로움(Newness)</p>
                                <p className="text-xs text-gray-600">익숙한 '추억의 맵'을 극한의 생존터로 재해석</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Project Scope */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Map className="text-red-600" /> 2. 프로젝트 범위 (Scope)
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white border-2 border-gray-200 p-5 rounded-xl text-center shadow-sm">
                            <div className="text-gray-500 text-sm font-bold mb-2 uppercase">Map Cap</div>
                            <p className="font-bold text-lg mb-1 text-gray-900">헤이븐/타락한 세계수</p>
                            <p className="text-xs text-red-600 font-bold bg-red-50 inline-block px-2 py-0.5 rounded">아케인 리버 진입 불가</p>
                        </div>
                        <div className="bg-white border-2 border-gray-200 p-5 rounded-xl text-center shadow-sm">
                            <div className="text-gray-500 text-sm font-bold mb-2 uppercase">Level Cap</div>
                            <p className="font-bold text-lg mb-1 text-gray-900">Lv. 220</p>
                            <p className="text-xs text-gray-500 font-medium">성장 제한 (Growth Cap)</p>
                        </div>
                        <div className="bg-gray-900 border-2 border-black p-5 rounded-xl text-center shadow-sm">
                            <div className="text-red-500 text-sm font-bold mb-2 uppercase">Final Boss</div>
                            <p className="font-bold text-lg mb-1 text-white">하드 데미안</p>
                            <p className="text-xs text-gray-400 font-medium">스펙 -90% 보정</p>
                        </div>
                    </div>
                </div>

                {/* Visual Guide Box */}
                <div className="mt-auto bg-gray-900 text-white p-5 rounded-lg flex items-center gap-6 shadow-md border border-gray-800">
                    <div className="w-16 h-16 bg-black border border-gray-700 rounded flex items-center justify-center shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-lg relative overflow-hidden">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black/60"></div>
                            <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500" size={16} />
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold mb-1 uppercase">🎨 Visual Guide</p>
                        <p className="text-sm text-gray-200 leading-snug">메이플 월드 지도에서 아케인 리버 이후 지역이 검게 타버려 잠긴(Locked) 연출.</p>
                        <p className="text-sm text-gray-200 leading-snug mt-1">어둠 속에서 붉은 안광만이 빛나는 포스터 풍 이미지.</p>
                    </div>
                </div>
            </div>

            {/* Slide 2. 세계관 및 핵심 규칙 */}
            <div className="a4-page">
                <div className="border-b-4 border-gray-900 pb-2 mb-4 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">2. Lore & Rules</h2>
                    <span className="text-gray-500 font-bold">02 / 07</span>
                </div>

                {/* 1. Lore */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">1. 세계관 설정 (Lore: The Grey Dust)</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-500 mb-2">
                        <p className="text-lg font-medium text-gray-800 mb-1">"불합리한 페널티가 아닌, 극복해야 할 세계관의 시련입니다."</p>
                        <div className="text-sm text-gray-600 space-y-0.5">
                            <p><span className="font-bold text-gray-900">배경:</span> 그란디스 차원 너머, 오디움의 실험 실패로 에르다(Erda)가 증발해버린 '진공 차원'.</p>
                            <p><span className="font-bold text-gray-900">환경:</span> 생명력이 억제되고 색(Color)을 잃어버린 무채색의 도시. 유저는 '데이터'를 회수하고 생존해야 함.</p>
                        </div>
                    </div>
                </div>

                {/* 2. Core Mechanics */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">2. 핵심 시스템 (Core Mechanics)</h3>
                    <div className="space-y-2">
                        {/* System 1 */}
                        <div className="flex gap-4 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 relative border border-gray-300">
                                <Shield className="text-gray-500" size={32} />
                                <div className="absolute -bottom-2 -right-2 text-red-600 font-extrabold text-xs bg-white px-1.5 py-0.5 rounded border border-red-500 shadow-sm">-90%</div>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg mb-2 text-gray-900">Stat Squish (능력치 압축): <span className="text-red-600">-90%</span></h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                    <div className="text-gray-700"><span className="font-bold text-black border-b-2 border-gray-200">명분</span> : 에르다 희박으로 아케인 포스/잠재능력 무효화</div>
                                    <div className="text-gray-700"><span className="font-bold text-black border-b-2 border-gray-200">경험</span> : 장비 의존도 배제, <span className="text-red-700 font-extrabold bg-red-50 px-1 rounded">순수 피지컬 싸움</span></div>
                                </div>
                            </div>
                        </div>

                        {/* System 2 */}
                        <div className="flex gap-4 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                            <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center shrink-0 border border-black">
                                <Skull className="text-white" size={32} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg mb-2 text-gray-900">Permadeath (영구 사망)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                    <div className="text-gray-700"><span className="font-bold text-black border-b-2 border-gray-200">명분</span> : 사망 시 영혼이 즉시 소멸(Void)</div>
                                    <div className="text-gray-700"><span className="font-bold text-black border-b-2 border-gray-200">경험</span> : 물약 하나에도 손을 떠는 <span className="text-red-700 font-extrabold bg-red-50 px-1 rounded">극한의 긴장감</span></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 font-medium flex items-center gap-1">
                                    <AlertTriangle size={12} className="text-orange-500" /> 튜토리얼 기간 1회 무료 부활 제공
                                </p>
                            </div>
                        </div>

                        {/* System 3 */}
                        <div className="flex gap-4 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                            <div className="w-16 h-16 bg-yellow-50 rounded-lg flex items-center justify-center shrink-0 border border-yellow-200">
                                <Coins className="text-yellow-600" size={32} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg mb-2 text-gray-900">Resource Scarcity (자원 희소)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                    <div className="text-gray-700"><span className="font-bold text-black border-b-2 border-gray-200">명분</span> : 생명력 고갈로 메소 드롭 극소화</div>
                                    <div className="text-gray-700"><span className="font-bold text-black border-b-2 border-gray-200">경험</span> : <span className="text-yellow-700 font-extrabold bg-yellow-50 px-1 rounded">자원 관리(Economy)</span>의 전략적 재미</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Guide Box */}
                <div className="bg-gray-900 p-5 rounded-lg border border-gray-800 mt-6 text-white shadow-md">
                    <p className="text-xs text-gray-400 font-bold mb-2 uppercase">🎨 Visual Guide</p>
                    <div className="flex gap-4 items-center">
                        <div className="w-24 h-16 bg-gradient-to-r from-gray-800 to-gray-400 rounded flex items-center justify-center text-xs text-white font-mono border border-gray-600">Grey-scale</div>
                        <div>
                            <p className="text-sm text-gray-200">채도가 완전히 빠진(Grey-scale) 헤네시스 배경 이미지.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide 3. 게임 플레이 */}
            <div className="a4-page">
                <div className="border-b-4 border-gray-900 pb-2 mb-10 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">3. Gameplay Loop</h2>
                    <span className="text-gray-500 font-bold">03 / 07</span>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Exploration */}
                    <div className="bg-blue-50 border-2 border-blue-100 p-6 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-600 text-white p-2 rounded-lg">
                                <Eye size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">1. 탐험: 히든 에르다 앵커</h3>
                        </div>
                        <p className="text-blue-800 font-medium mb-4 italic">"보이는 것이 전부가 아닙니다. 숨겨진 희망을 찾아내십시오."</p>

                        <ul className="space-y-4 text-gray-800">
                            <li className="flex gap-3">
                                <div className="font-bold min-w-[120px]">Hide & Seek</div>
                                <div>앵커는 미니맵 미표시. 맵의 사각지대나 히든 포탈 너머에 존재. (공략 필수)</div>
                            </li>
                            <li className="flex gap-3">
                                <div className="font-bold min-w-[120px]">Map Purification</div>
                                <div>앵커 활성화 시, <span className="text-gray-500 line-through">회색</span> → <span className="text-blue-600 font-bold">컬러</span>로 복구되며 점수 획득 및 안전지대화.</div>
                            </li>
                            <li className="flex gap-3">
                                <div className="font-bold min-w-[120px] text-red-600">Risk</div>
                                <div>활성화 시도 시 몬스터들이 몰려오는 '디펜스 이벤트' 발생.</div>
                            </li>
                        </ul>
                    </div>

                    {/* Raid */}
                    <div className="bg-red-50 border-2 border-red-100 p-6 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-red-600 text-white p-2 rounded-lg">
                                <Skull size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">2. 토벌: 필드 보스 리마스터</h3>
                        </div>
                        <p className="text-red-800 font-medium mb-4 italic">"잊혀진 괴수들이 심연의 힘으로 깨어납니다."</p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-white p-3 rounded border border-red-200">
                                <span className="text-xs font-bold text-gray-500 block">TARGETS</span>
                                <span className="text-sm font-bold text-gray-900">머쉬맘, 발록, 마뇽, 그리프, 레비아탄 등등</span>
                            </div>
                            <div className="bg-white p-3 rounded border border-red-200">
                                <span className="text-xs font-bold text-gray-500 block">CHANGES</span>
                                <span className="text-sm font-bold text-red-600">패턴 강화 및 즉사기 추가</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-700">
                            <span className="font-bold">보상:</span> 리미티드 월드 전용 고성능 장비 드랍 <span className="text-xs text-gray-500">(본섭 리프 시 치장 아이템으로 변환)</span>
                        </p>
                    </div>

                    {/* Visual Guide - Before / After */}
                    <div className="flex gap-4 mt-4">
                        <div className="flex-1 bg-gray-300 h-32 rounded-lg flex items-center justify-center relative overflow-hidden grayscale">
                            <p className="relative z-10 font-bold text-gray-600">Dead World (B/W)</p>
                            <div className="absolute inset-0 bg-[url('https://maplestory.io/api/GMS/210/map/100000000/render')] bg-cover opacity-50"></div>
                        </div>
                        <div className="flex items-center text-gray-400">➡</div>
                        <div className="flex-1 bg-blue-100 h-32 rounded-lg flex items-center justify-center relative overflow-hidden ring-4 ring-blue-400/30">
                            <p className="relative z-10 font-bold text-blue-600">Purified (Color)</p>
                            <div className="absolute inset-0 bg-[url('https://maplestory.io/api/GMS/210/map/100000000/render')] bg-cover opacity-80"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide 4. 경쟁 시스템 */}
            <div className="a4-page">
                <div className="border-b-4 border-gray-900 pb-2 mb-10 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">4. Competitive UI</h2>
                    <span className="text-gray-500 font-bold">04 / 07</span>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">1. 실시간 경쟁 장치 (Live Feedback)</h3>
                    <p className="text-gray-600 italic mb-6">"당신의 증명은 실시간으로 이루어집니다. 멈추는 순간 추월당합니다."</p>

                    <div className="bg-gray-800 p-6 rounded-xl shadow-xl text-white font-sans relative overflow-hidden h-80">
                        {/* Overlay Mockup - Right aligned */}
                        <div className="absolute top-6 right-6 bg-black/80 p-4 rounded-lg backdrop-blur-sm border border-gray-600 w-64 z-10 shadow-lg">
                            <div className="flex justify-between text-xs text-gray-400 mb-2 pb-1 border-b border-gray-600">
                                <span>TOP 100 LIST [TAB]</span>
                                <span>LIVE</span>
                            </div>
                            <div className="space-y-1.5 text-sm">
                                <div className="flex justify-between text-yellow-400 font-bold">
                                    <span>1. 아시안느</span>
                                    <span>12,500</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>2. 번개의신</span>
                                    <span>11,200</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>3. 타락파워</span>
                                    <span>10,850</span>
                                </div>
                            </div>
                        </div>

                        {/* Character HUD - Left aligned */}
                        <div className="absolute top-20 left-10 text-center">
                            <div className="inline-block relative">
                                <div className="w-16 h-20 bg-gray-600 rounded mx-auto mb-2 border border-gray-500"></div> {/* Character Placeholder */}
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/70 px-2 py-1 rounded text-yellow-400 text-xs font-bold border border-yellow-500/50 whitespace-nowrap">
                                    9,850 pt
                                </div>
                                <div className="bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-gray-600 text-white">
                                    <span className="text-yellow-500 font-bold mr-1">[Rank #8]</span>
                                    <span>아시안느</span>
                                </div>

                                {/* Chat Bubble - Below character */}
                                <div className="absolute top-full left-0 mt-3 bg-white text-black text-xs p-3 rounded-xl rounded-tl-none shadow-lg w-52 text-left z-20 border border-gray-300">
                                    <span className="font-bold text-purple-600">[실시간 순위]</span> <span className="text-gray-900">뱃지가 자동으로 부착됩니다!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">2. 랭킹 산정 공식: 심연 포인트 (Abyss Point)</h3>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b-2 border-gray-300 text-left">
                                <th className="p-3 text-gray-900">항목</th>
                                <th className="p-3 w-20 text-gray-900">비중</th>
                                <th className="p-3 text-gray-900">기획 의도</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-bold text-gray-900">1. 보스 토벌 (Slayer)</td>
                                <td className="p-3 text-red-600 font-bold">45%</td>
                                <td className="p-3 text-sm text-gray-700">자쿰~데미안 처치 시 막대한 점수. (도전 목표)</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-bold text-gray-900">2. 데이터 회수 (Recovery)</td>
                                <td className="p-3 text-blue-600 font-bold">30%</td>
                                <td className="p-3 text-sm text-gray-700">[히든 앵커] 발견 및 활성화 횟수. (안전지대 캠핑 방지)</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-bold text-gray-900">3. 레벨 성장 (Growth)</td>
                                <td className="p-3 text-green-600 font-bold">25%</td>
                                <td className="p-3 text-sm text-gray-700">제한 레벨 내에서의 생존 기록.</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-4 bg-red-50 border border-red-200 p-4 rounded-lg flex items-center gap-4">
                        <AlertTriangle className="text-red-500 shrink-0" />
                        <div>
                            <p className="font-bold text-red-800">🔴 부활 페널티 감점</p>
                            <p className="text-sm text-red-700">부활권 사용 시 <span className="font-extrabold">현재 점수의 -1%</span> 차감. (P2W 방지: 명예는 살 수 없음)</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide 5. BM 설계 전략 */}
            <div className="a4-page">
                <div className="border-b-4 border-gray-900 pb-2 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">5. Monetization Strategy</h2>
                    <span className="text-gray-500 font-bold">05 / 07</span>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">1. BM 철학: Chance & Relief</h3>
                    <p className="text-gray-600 italic mb-4">"승리(Pay-to-Win)가 아닌, 기회(Chance)와 안도감(Relief)을 팝니다."</p>

                    <div className="flex gap-6">
                        {/* A. Soul Lantern */}
                        <div className="flex-1 border rounded-xl p-4 shadow-sm bg-white">
                            <h4 className="font-bold text-xl mb-3 flex items-center gap-2 text-gray-900">
                                <Zap className="text-yellow-500" /> A. 영혼의 등불
                            </h4>
                            <p className="text-sm text-gray-800 mb-2 font-medium">조건부 부활권 (Price Escalation System)</p>

                            {/* J-Curve Graph Mockup */}
                            <div className="h-32 border-l border-b border-gray-400 relative flex items-end justify-around px-4 mb-2">
                                <div className="w-12 bg-gray-300 h-[10%] relative group">
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-black">1천</span>
                                </div>
                                <div className="w-12 bg-gray-400 h-[30%] relative group">
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-black">1만</span>
                                </div>
                                <div className="w-12 bg-red-600 h-[80%] relative group">
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-red-600">5만</span>
                                </div>
                            </div>
                            <p className="text-xs text-center text-gray-900 font-bold">구매 횟수별 가격 체증 (일일 3회 제한)</p>

                            <div className="mt-4 bg-gray-100 p-3 rounded text-xs text-gray-900">
                                <span className="font-bold block mb-1">Balancing:</span>
                                구매 시 랭킹 포인트 차감으로 상위권의 무분별한 사용 억제.
                            </div>
                        </div>

                        {/* B. Emergency Scroll */}
                        <div className="flex-1 border rounded-xl p-4 shadow-sm bg-white">
                            <h4 className="font-bold text-xl mb-3 flex items-center gap-2 text-gray-900">
                                <Map className="text-blue-500" /> B. 긴급 귀환 주문서
                            </h4>
                            <p className="text-sm text-gray-800 mb-4 font-medium">'보험' 성격의 아이템</p>

                            <div className="bg-red-50 border border-red-200 p-5 rounded-lg text-center mb-6">
                                <p className="font-bold text-red-600 text-lg mb-2">HP 10% 이하</p>
                                <p className="text-sm text-gray-900 font-bold">위기 상황에서만 사용 가능</p>
                            </div>

                            <div className="bg-gray-100 p-3 rounded text-xs text-gray-900">
                                <span className="font-bold block mb-1">Psychology:</span>
                                유저의 <span className="text-red-700 font-bold">손실 회피 심리</span>를 자극하여 구매 유도.
                            </div>
                        </div>
                    </div>

                    {/* C. Limited Pass */}
                    <div className="mt-4 border rounded-xl p-4 shadow-sm bg-gradient-to-r from-gray-50 to-white relative overflow-hidden border-l-8 border-l-purple-600">
                        <div className="flex flex-col md:flex-row gap-4 relative z-10">
                            <div className="flex-[1.5]">
                                <h4 className="font-bold text-xl mb-2 flex items-center gap-2 text-gray-900">
                                    <TrendingUp className="text-purple-600" /> C. 리미티드 패스 (Abyss Pass)
                                </h4>
                                <p className="text-sm text-gray-600 mb-4">본섭 유저를 리미티드 월드로 자연스럽게 유입시키는 <span className="font-bold text-purple-700">크로스오버 전략</span></p>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-purple-50 p-3 rounded border border-purple-100">
                                        <div className="text-xs font-bold text-purple-600 mb-1">LIMITED WORLD 혜택</div>
                                        <ul className="text-sm text-gray-800 list-disc list-inside">
                                            <li><span className="font-bold">리미티드 전용 자석 펫</span> 기능 포함</li>
                                            <li>전용 한정 코디 & 초기 지원템</li>
                                        </ul>
                                    </div>
                                    <div className="bg-green-50 p-3 rounded border border-green-100">
                                        <div className="text-xs font-bold text-green-600 mb-1">MAIN SERVER 혜택</div>
                                        <ul className="text-sm text-gray-800 list-disc list-inside">
                                            <li>상급 EXP 쿠폰 & VIP 사우나</li>
                                            <li>리프 시 <span className="font-bold text-green-700">추가 정착 지원금</span> 지급</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-center bg-gray-100 p-4 rounded-lg border border-gray-200">
                                <span className="text-xs font-bold text-gray-500 uppercase mb-2">Psychological Nudge</span>
                                <p className="text-sm text-gray-800 font-medium leading-relaxed">
                                    "본섭 혜택 때문에 샀는데, <br />
                                    <span className="text-purple-600 font-bold">지급된 자석 펫이 아까워서</span><br />
                                    리미티드 월드를 찍먹하게 만듭니다."
                                </p>
                                <p className="text-xs text-gray-500 mt-2 border-t border-gray-300 pt-2">
                                    본섭만 하는 유저에게 '새로운 재미'를 영업하는 가장 자연스러운 입구.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide 6. 보상 설계 전략 */}
            <div className="a4-page">
                <div className="border-b-4 border-gray-900 pb-2 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">6. Rewards Strategy</h2>
                    <span className="text-gray-500 font-bold">06 / 07</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">1. 보상 철학: Selective Growth & Heritage</h3>
                <p className="text-gray-600 italic mb-4">"살아남은 자에게, 원하는 형태의 '성장'을 약속합니다." (숙제 피로감 제거)</p>

                <div className="flex flex-col gap-6">
                    <div className="flex gap-6">
                        {/* Common Rewards Box */}
                        <div className="flex-1 space-y-4">
                            <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2 border-b-2 border-gray-800 pb-2">
                                <Gift className="text-gray-800" /> 공통 보상 (Common Rewards)
                            </h4>

                            {/* 1. Meso Exchange */}
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <div className="font-bold text-blue-900 mb-1">1. 메소 보정 지급 (Meso Exchange)</div>
                                <p className="text-sm text-blue-800 mb-2">1:100 환율로 리미티드 월드 메소를 본섭 메소로 환전 지급.</p>
                                <div className="bg-white/50 px-2 py-1 rounded text-xs text-blue-600 font-bold inline-block">
                                    ※ 메소 인플레 방지를 위한 계정당 최대 환전 상한 적용
                                </div>
                            </div>

                            {/* 2. Transmog */}
                            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                                <div className="font-bold text-purple-900 mb-1">2. 유산 계승 (Transmog)</div>
                                <p className="text-sm text-purple-800 mb-2">획득한 필드 보스 장비 → <span className="font-bold">영구 치장 아이템(Cash)</span> 변환</p>
                            </div>

                            {/* 3. Honor */}
                            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                                <div className="font-bold text-yellow-900 mb-1">3. 명예 보상 (Ranker Only)</div>
                                <p className="text-sm text-yellow-800">Top 10 NPC 동상 건립 / [심연의 지배자] 칭호</p>
                            </div>
                        </div>

                        {/* Selective Rewards Box */}
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2 border-b-2 border-gray-800 pb-2 mb-4">
                                <MousePointer2 className="text-red-600" /> 선택적 성장 보상 (Select One)
                            </h4>
                            <p className="text-sm text-gray-600 mb-4">시즌 종료 시, 다음 중 <span className="text-red-600 font-bold">하나를 선택</span>하여 수령.</p>

                            <div className="space-y-4">
                                {/* Option 1 */}
                                <div className="border-2 hover:border-green-500 cursor-pointer p-5 rounded-xl transition-all hover:shadow-md bg-white group">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="font-bold text-green-700 text-lg group-hover:text-green-600">Option 1. 상급 EXP 교환권</div>
                                        <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Target: 고레벨 유저</div>
                                    </div>
                                    <p className="text-sm text-gray-600">달성 레벨에 비례한 대량 경험치 쿠폰 지급 (계정 내 이동 가능)</p>
                                </div>

                                {/* Option 2 */}
                                <div className="border-2 hover:border-orange-500 cursor-pointer p-5 rounded-xl transition-all hover:shadow-md bg-white group">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="font-bold text-orange-700 text-lg group-hover:text-orange-600">Option 2. 심연의 성장 비약</div>
                                        <div className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded">Target: 유니온 유저</div>
                                    </div>
                                    <p className="text-sm text-gray-600">200~259 구간 즉시 레벨업 비약 지급 (유니온 육성용)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Developer Note (Design Philosophy) */}
                    <div className="bg-gray-800 p-5 rounded-xl border-l-4 border-red-500 mt-8 text-white shadow-lg">
                        <p className="text-xs font-bold text-red-400 uppercase mb-2">Developer's Commentary</p>
                        <p className="text-sm text-gray-300 leading-relaxed font-light">
                            "보상은 본섭에서 본캐가 사냥하는 시간과 비슷하거나 조금 못 미치는 수준으로 설계되었습니다. <br />
                            이는 이 월드가 유저들에게 <span className="text-white font-bold">강제성을 띤 숙제</span>가 되지 않게 하기 위함입니다. <br />
                            콘텐츠를 <span className="text-white font-bold">순수하게 즐기는 유저</span>들에게 <span className="text-white font-bold">재미와 성장</span>을 동시에 제공하는 균형 잡힌 설계를 지향했습니다."
                        </p>
                    </div>
                </div>
            </div>

            {/* Slide 7. 기대 효과 */}
            <div className="a4-page">
                <div className="border-b-4 border-gray-900 pb-2 mb-10 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">7. Expected Impact</h2>
                    <span className="text-gray-500 font-bold">07 / 07</span>
                </div>

                <div className="mb-12 text-center">
                    <p className="text-2xl font-bold text-gray-800">"메이플스토리의 '지속 가능한 플레이 사이클'을 완성합니다."</p>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-16">
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                        <h4 className="font-bold text-lg mb-2 text-blue-800">Community Driven</h4>
                        <p className="text-gray-600">숨겨진 앵커 위치와 다양한 보스 공략 공유로 커뮤니티 트래픽 폭증.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                        <h4 className="font-bold text-lg mb-2 text-green-800">Anti-Homework</h4>
                        <p className="text-gray-600">보상 선택권을 통해 강제된 숙제가 아닌 <span className="font-bold">'자발적 파밍'</span>으로 인식 전환.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
                        <h4 className="font-bold text-lg mb-2 text-yellow-800">High Revenue</h4>
                        <p className="text-gray-600">도전 욕구를 자극하는 BM 설계로 객단가(ARPU) 증대.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
                        <h4 className="font-bold text-lg mb-2 text-purple-800">Viral Marketing</h4>
                        <p className="text-gray-600">스트리머의 극적인 사망과 생존, 맵 정화 과정이 숏폼 콘텐츠로 확산.</p>
                    </div>
                </div>

                {/* Conclusion Footer */}
                <div className="bg-gray-900 text-white p-12 text-center rounded-xl">
                    <h2 className="text-3xl font-extrabold mb-4">LIMITED WORLD</h2>
                    <p className="text-gray-400 text-lg mb-8">The Grey Dust</p>
                    <div className="w-16 h-1 bg-red-600 mx-auto mb-8"></div>
                    <p className="font-serif italic text-gray-300">
                        "Your legacy begins where the colors end."<br />
                        <span className="text-sm not-italic mt-2 block text-gray-500">"색이 사라진 곳에서, 당신의 전설이 시작됩니다."</span>
                    </p>
                </div>
            </div>

            {/* Print Button */}
            <button
                onClick={() => window.print()}
                className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all transform hover:-translate-y-1 z-50 print:hidden no-print"
            >
                <Printer size={20} />
                <span className="font-semibold">PDF로 저장</span>
            </button>
        </div>
    );
}
