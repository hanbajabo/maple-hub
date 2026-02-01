'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Printer, Lightbulb, Target, Zap, Users } from 'lucide-react';

export default function OnboardingPortfolio() {
    useEffect(() => {
        const removeAds = () => {
            const adSelectors = ['.adsbygoogle', '.google-auto-placed', 'iframe[id^="google_ads_iframe"]'];
            adSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(el => el.remove());
            });
        };
        removeAds();
        const interval = setInterval(removeAds, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="portfolio-viewer bg-gray-100 min-h-screen py-8 print:py-0 print:bg-white">
            <style jsx global>{`
                @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
                nav, header { display: none !important; }
                .adsbygoogle, .google-auto-placed { display: none !important; }
                body { background-color: #f3f4f6; font-family: 'Pretendard', sans-serif; }
                .portfolio-viewer { display: flex; flex-direction: column; align-items: center; gap: 2rem; }
                .a4-page { width: 210mm; height: 297mm; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 15mm; box-sizing: border-box; overflow: hidden; display: flex; flex-direction: column; }
                @media screen and (max-width: 768px) {
                    .a4-page { width: 100% !important; height: auto !important; padding: 20px !important; }
                    h1 { font-size: 1.75rem !important; }
                    h2 { font-size: 1.5rem !important; }
                }
                @media print {
                    @page { size: A4 portrait; margin: 0; }
                    body { background: white !important; }
                    .a4-page { box-shadow: none !important; page-break-after: always !important; height: 297mm !important; }
                    button { display: none !important; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                }
            `}</style>

            {/* COVER PAGE */}
            <div className="a4-page items-center text-center">
                <div className="w-full flex-1 flex flex-col pt-4">
                    <p className="text-sm font-bold text-purple-600 tracking-widest uppercase mb-2">2026 Game System Design Portfolio</p>
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4 leading-tight">능동형 온보딩 시스템: 여신의 도움</h1>
                    <p className="text-xl font-medium text-gray-700 mb-8">라이브 서비스 온보딩 구조 개선 제안서</p>

                    {/* Goddess Image */}
                    <div className="w-full max-w-2xl mx-auto mb-6">
                        <img
                            src="/portfolio-images/goddess-cover.png"
                            alt="메이플스토리 여신 캐릭터들"
                            className="w-full h-auto rounded-2xl shadow-2xl"
                        />
                    </div>

                    <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 rounded-xl p-4 mb-4 border-2 border-purple-300">
                        <p className="text-xl font-bold text-purple-900 mb-1">Active Onboarding System</p>
                        <p className="text-sm text-purple-700">Context-Aware Guide for New & Returning Players</p>
                    </div>
                </div>
                <div className="w-full text-right border-t border-gray-200 pt-4 mt-2">
                    <p className="text-3xl font-bold text-gray-900 mb-2">기획자 이경준</p>
                    <p className="text-md font-medium text-gray-500">Portfolio Date: 2026.02</p>
                </div>
            </div>

            {/* PAGE 1: 기획 배경 */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">기획 배경 및 문제 정의</h2>
                    <span className="text-gray-500 text-sm">01 / 06</span>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
                    <h3 className="text-xl font-bold text-red-900 mb-3">Core Problem Statement</h3>
                    <p className="text-lg text-red-800 leading-relaxed">"20년의 깊이가 진입 장벽이 되지 않도록,<br />'알려주는 방식'의 혁신이 필요합니다."</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h4 className="font-bold text-lg mb-3 text-orange-600">🎯 개발자의 착각</h4>
                        <p className="text-sm text-gray-800 mb-3"><strong>Expert Blind Spot</strong></p>
                        <ul className="text-sm space-y-2 text-gray-700">
                            <li>• 숙련 유저 기준의 안일한 설계</li>
                            <li>• "이 정도면 당연히 알겠지"</li>
                            <li>• 편의 기능을 기본 상식으로 가정</li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                        <h4 className="font-bold text-lg mb-3 text-blue-600">👤 유저의 현실</h4>
                        <p className="text-sm text-gray-800 mb-3"><strong>Legacy Habits</strong></p>
                        <ul className="text-sm space-y-2 text-gray-700">
                            <li>• 과거 기억에 의존한 비효율 플레이</li>
                            <li>• 최신 편의 기능 인지 부재</li>
                            <li>• "불친절하다"는 오해 → 이탈</li>
                        </ul>
                    </div>
                </div>

                <div className="flex-1 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-5 border-2 border-blue-200">
                    <h4 className="text-center text-lg font-bold text-blue-900 mb-3">빙산의 일각 (Iceberg Effect)</h4>

                    {/* 수면 위 - 작은 부분 */}
                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-t-xl border-2 border-blue-400 shadow-lg mx-16">
                            <div className="text-center">
                                <p className="font-bold text-blue-900 mb-1 text-sm">💎 수면 위</p>
                                <p className="text-xs text-blue-700 mb-1">(유저가 보는 것)</p>
                                <div className="bg-white/80 backdrop-blur-sm p-2 rounded">
                                    <p className="text-xs font-medium text-gray-900">화려한 스킬, 사냥터, 보스전</p>
                                </div>
                            </div>
                        </div>

                        {/* 수면선 */}
                        <div className="relative flex items-center my-2">
                            <div className="flex-1 h-0.5 bg-blue-400"></div>
                            <span className="px-3 text-xs font-bold text-blue-600">━━  수 면  ━━</span>
                            <div className="flex-1 h-0.5 bg-blue-400"></div>
                        </div>

                        {/* 수면 아래 - 큰 부분 */}
                        <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 p-4 rounded-b-xl border-2 border-blue-600 shadow-2xl">
                            <div className="text-center mb-2">
                                <p className="font-bold text-white mb-1 text-sm">🔧 수면 아래</p>
                                <p className="text-xs text-blue-200 mb-2">(숨겨진 편의 기능)</p>
                            </div>
                            <div className="bg-blue-950/50 backdrop-blur-sm p-2 rounded-lg border border-blue-400/30">
                                <div className="grid grid-cols-3 gap-1.5 text-white text-xs">
                                    <div className="bg-blue-800/50 p-1.5 rounded text-center">✨ 길라잡이</div>
                                    <div className="bg-blue-800/50 p-1.5 rounded text-center">📅 스케줄러</div>
                                    <div className="bg-blue-800/50 p-1.5 rounded text-center">📦 원격창고</div>
                                    <div className="bg-blue-800/50 p-1.5 rounded text-center">⚡ 퀵슬롯</div>
                                    <div className="bg-blue-800/50 p-1.5 rounded text-center">🎨 이펙트</div>
                                    <div className="bg-blue-800/50 p-1.5 rounded text-center">🏠 즉시귀환</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 bg-red-100 border-l-4 border-red-500 p-2 rounded-r">
                        <p className="text-center text-xs font-bold text-red-800">→ 신규 유저에게 핵심 기능이 수면 아래 잠겨있음</p>
                    </div>
                </div>
            </div>

            {/* PAGE 2: 시스템 개요 */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">시스템 개요 및 전략</h2>
                    <span className="text-gray-500 text-sm">02 / 06</span>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-2xl mb-6">
                    <h3 className="text-3xl font-bold mb-4">✨ 핵심 컨셉</h3>
                    <p className="text-2xl font-bold">"헤매는 순간, 여신이 나타난다."</p>
                    <p className="text-lg mt-2 opacity-90">Context-Aware Adaptive Guide</p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-6 bg-purple-50 rounded-xl border-2 border-purple-300">
                        <div className="text-4xl mb-3">🔍</div>
                        <h4 className="font-bold text-purple-900 mb-2">Monitor</h4>
                        <p className="text-xs text-gray-700">비효율 행동 감지</p>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-xl border-2 border-purple-300">
                        <div className="text-4xl mb-3">⚡</div>
                        <h4 className="font-bold text-purple-900 mb-2">Trigger</h4>
                        <p className="text-xs text-gray-700">타이밍 판단</p>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-xl border-2 border-purple-300">
                        <div className="text-4xl mb-3">🎯</div>
                        <h4 className="font-bold text-purple-900 mb-2">Guide</h4>
                        <p className="text-xs text-gray-700">솔루션 제안</p>
                    </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-6">
                    <h4 className="font-bold text-lg text-blue-900 mb-4">🎓 작동 원리 (How It Works)</h4>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                            <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
                            <p className="text-gray-800"><strong>비효율적 행동 패턴 감지:</strong> 정해진 튜토리얼이 아닌, 유저의 실시간 행동 로그 분석</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
                            <p className="text-gray-800"><strong>맥락 기반 개입:</strong> 같은 비효율이 반복될 때만 여신 NPC가 등장</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
                            <p className="text-gray-800"><strong>Learning by Doing:</strong> 기능을 대신 수행하지 않고, 유저가 직접 클릭하도록 유도</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-green-50 p-6 rounded-xl border-2 border-green-400">
                    <h4 className="font-bold text-green-900 mb-4 text-xl">💡 차별점 (Differentiation)</h4>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="font-bold text-red-600 mb-2 text-lg">❌ 기존 튜토리얼</p>
                            <p className="text-gray-900 text-base leading-relaxed">강제 순차 진행<br />필요 없는 정보 주입<br />수동적 학습</p>
                        </div>
                        <div>
                            <p className="font-bold text-green-600 mb-2 text-lg">✅ 여신의 도움</p>
                            <p className="text-gray-900 text-base leading-relaxed font-medium">필요 시점 개입<br />맥락 기반 제안<br />능동적 체험</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 3: UI/UX 연출 */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">UI/UX 연출 전략</h2>
                    <span className="text-gray-500 text-sm">03 / 06</span>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-r">
                    <p className="text-sm font-bold text-yellow-900">상황의 긴급도와 학습 난이도에 따라 개입 강도를 이원화 (Dual-Track Design)</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    {/* Plan A */}
                    <div className="border-2 border-blue-300 rounded-xl p-5 bg-blue-50">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">Plan A</span>
                            <h4 className="font-bold text-lg text-gray-900">토스트 메시지</h4>
                        </div>
                        <div className="bg-white p-4 rounded-lg mb-4 border border-blue-200">
                            <div className="flex items-start gap-3">
                                <div className="text-4xl">💬</div>
                                <div className="flex-1">
                                    <p className="text-xs text-purple-600 font-bold mb-1">메이플 여신</p>
                                    <p className="text-sm text-gray-800 mb-2">"스킬 쿨타임이 잘 안 보이시나요?"</p>
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs">숫자 크게 보기</button>
                                </div>
                            </div>
                        </div>
                        <ul className="text-xs space-y-1 text-gray-900">
                            <li><strong>대상:</strong> 단순 설정 변경</li>
                            <li><strong>연출:</strong> 우측 하단 말풍선</li>
                            <li><strong>특징:</strong> 5초 후 자동 소멸</li>
                        </ul>
                    </div>

                    {/* Plan B */}
                    <div className="border-2 border-purple-300 rounded-xl p-5 bg-purple-50">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">Plan B</span>
                            <h4 className="font-bold text-lg text-gray-900">인터랙티브 오버레이</h4>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg mb-4 relative">
                            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
                            <div className="relative z-10 text-center">
                                <div className="inline-block bg-white p-4 rounded-lg border-4 border-yellow-400 animate-pulse">
                                    <p className="text-sm font-bold text-gray-900">📦 창고</p>
                                </div>
                                <p className="text-white text-xs mt-2">👆 여기를 눌러보세요!</p>
                            </div>
                        </div>
                        <ul className="text-xs space-y-1 text-gray-900">
                            <li><strong>대상:</strong> 복잡한 UI 학습</li>
                            <li><strong>연출:</strong> 화면 어둡게 + 하이라이트</li>
                            <li><strong>특징:</strong> 클릭 필수 (강제 학습)</li>
                        </ul>
                    </div>
                </div>

                <div className="flex-1 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h4 className="font-bold mb-4 text-gray-900">🎨 여신 캐릭터 연출 전략</h4>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                        <div className="text-center">
                            <div className="bg-green-100 p-3 rounded-lg mb-2 border border-green-200">
                                <p className="text-2xl">🍁</p>
                            </div>
                            <p className="font-bold text-gray-900">메이플 월드의 여신</p>
                            <p className="text-gray-900">메이플 월드</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-yellow-100 p-3 rounded-lg mb-2 border border-yellow-200">
                                <p className="text-2xl">☀️</p>
                            </div>
                            <p className="font-bold text-gray-900">그란디스의 여신</p>
                            <p className="text-gray-900">그란디스</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 p-3 rounded-lg mb-2 border border-purple-200">
                                <p className="text-2xl">🟣</p>
                            </div>
                            <p className="font-bold text-gray-900">마스테리아의 여신</p>
                            <p className="text-gray-900">마스테리아 / 기타</p>
                        </div>
                    </div>
                    <p className="text-xs text-center mt-4 text-gray-700 font-medium">캐릭터 소속/지역에 맞는 여신이 등장하여 몰입감 증대</p>
                    <div className="mt-4 flex justify-center">
                        <img
                            src="/portfolio-images/goddess-characters-2.png"
                            alt="메이플 여신 캐릭터들"
                            className="h-40 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>

            {/* PAGE 4: 로직 플로우 */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">로직 플로우 및 감지 메커니즘</h2>
                    <span className="text-gray-500 text-sm">04 / 06</span>
                </div>

                <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-300 mb-6">
                    <h3 className="text-xl font-bold text-indigo-900 mb-2">System Logic Architecture</h3>
                    <p className="text-sm text-indigo-700">"유저의 행동 로그를 실시간 분석하여 비효율 패턴을 감지하고 개입합니다."</p>
                </div>

                <div className="mb-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex-1 bg-gray-100 p-3 rounded-lg border-2 border-gray-300 text-center">
                            <p className="font-bold text-sm mb-0.5 text-gray-900">1️⃣ Monitor</p>
                            <p className="text-xs text-gray-900">행동 로그 수집</p>
                        </div>
                        <span className="text-xl text-blue-600">→</span>
                        <div className="flex-1 bg-yellow-100 p-3 rounded-lg border-2 border-yellow-300 text-center">
                            <p className="font-bold text-sm mb-0.5 text-gray-900">2️⃣ Trigger</p>
                            <p className="text-xs text-gray-900">패턴 비교 판단</p>
                        </div>
                        <span className="text-xl text-blue-600">→</span>
                        <div className="flex-1 bg-purple-100 p-3 rounded-lg border-2 border-purple-300 text-center">
                            <p className="font-bold text-sm mb-0.5 text-gray-900">3️⃣ Offer</p>
                            <p className="text-xs text-gray-900">여신 제안</p>
                        </div>
                    </div>
                    <div className="flex justify-center mb-2">
                        <span className="text-xl text-blue-600">↓</span>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg border-2 border-green-300 text-center block w-full">
                        <p className="font-bold text-sm mb-0.5 text-gray-900">4️⃣ Guide</p>
                        <p className="text-xs text-gray-900">Plan A (즉시 적용) or Plan B (인터랙티브 가이드) 실행</p>
                    </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mb-5 rounded-r">
                    <p className="text-sm font-bold text-yellow-900">🛡️ Safe Guard: 오탐 및 피로도 방지</p>
                    <p className="text-xs text-yellow-800 mt-1">• 계정당 기능별 1회 학습 완료 시 재노출 영구 제한 (숙련자 배려)</p>
                    <p className="text-xs text-yellow-800">• 동일 가이드 일일 노출 횟수 제한 (Spamming 방지)</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <h4 className="font-bold text-sm text-red-600 mb-2">🔴 비효율 패턴 DB 예시</h4>
                        <div className="space-y-2 text-xs">
                            <div className="bg-red-50 p-2 rounded border-l-2 border-red-400">
                                <span className="font-bold text-gray-900 block">NPC 직접 방문 3회+</span>
                                <span className="text-gray-800">→ 스케줄러 안내</span>
                            </div>
                            <div className="bg-red-50 p-2 rounded border-l-2 border-red-400">
                                <span className="font-bold text-gray-900 block">마을 왕복 이동 2회+</span>
                                <span className="text-gray-800">→ 원격 창고 안내</span>
                            </div>
                            <div className="bg-red-50 p-2 rounded border-l-2 border-red-400">
                                <span className="font-bold text-gray-900 block">쿨타임 중 스킬 연타</span>
                                <span className="text-gray-800">→ 쿨타임 UI 개선</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <h4 className="font-bold text-sm text-blue-600 mb-2">📊 데이터 수집 항목</h4>
                        <ul className="text-xs space-y-1.5 text-gray-700 font-medium">
                            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> 맵 이동 경로 (Path Tracking)</li>
                            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> NPC 상호작용 로그</li>
                            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> UI 클릭 패턴</li>
                            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> 스킬 사용 빈도</li>
                            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> 인벤토리 열람 횟수</li>
                            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> 사망 위치/원인</li>
                        </ul>
                    </div>
                </div>

                <div className="flex-1 bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border-2 border-blue-300">
                    <h4 className="font-bold mb-3 text-gray-900">⚙️ Technical Implementation</h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                            <p className="font-bold text-blue-800 mb-1">Client-Side</p>
                            <p className="text-gray-900">행동 로그 실시간 전송<br />UI 오버레이 렌더링</p>
                        </div>
                        <div>
                            <p className="font-bold text-purple-800 mb-1">Server-Side</p>
                            <p className="text-gray-900">패턴 매칭 알고리즘<br />트리거 조건 판단</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 5: 핵심 시나리오 */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">핵심 시나리오 (Use Cases)</h2>
                    <span className="text-gray-500 text-sm">05 / 06</span>
                </div>

                <p className="text-sm text-gray-900 mb-4">유저가 가장 빈번하게 겪는 3가지 불편 상황을 시스템적으로 해결합니다.</p>

                {/* Case A */}
                <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-r-xl mb-3">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">Case A</span>
                        <h4 className="font-bold text-lg text-gray-900">일일 퀘스트 동선 최적화</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="font-bold text-orange-700 mb-1">🔍 Trigger</p>
                            <p className="text-xs text-gray-900">아케인 리버 NPC들 3회 이상 직접 방문하여 퀘스트 수락</p>
                        </div>
                        <div>
                            <p className="font-bold text-orange-700 mb-1">✨ Guide</p>
                            <p className="text-xs text-gray-900">메이플 스케줄러 버튼 하이라이트 → [일괄 수락] 유도 (Plan B)</p>
                        </div>
                        <div>
                            <p className="font-bold text-orange-700 mb-1">💬 Message</p>
                            <p className="text-xs text-gray-900">"용사님, 이제 마을을 돌아다니지 않아도 돼요!"</p>
                        </div>
                    </div>
                </div>

                {/* Case B */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl mb-3">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">Case B</span>
                        <h4 className="font-bold text-lg text-gray-900">원격 창고 이용 안내</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="font-bold text-blue-700 mb-1">🔍 Trigger</p>
                            <p className="text-xs text-gray-900">사냥 중 마을 귀환 → 창고 이용 → 다시 사냥터 복귀 (2회 이상)</p>
                        </div>
                        <div>
                            <p className="font-bold text-blue-700 mb-1">✨ Guide</p>
                            <p className="text-xs text-gray-900">인벤토리 하단 [창고] 아이콘에 손가락 표시 (Plan B)</p>
                        </div>
                        <div>
                            <p className="font-bold text-blue-700 mb-1">💬 Message</p>
                            <p className="text-xs text-gray-900">"사냥터에서도 창고를 열 수 있답니다!"</p>
                        </div>
                    </div>
                </div>

                {/* Case C */}
                <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-xl mb-3">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">Case C</span>
                        <h4 className="font-bold text-lg text-gray-900">보스전 시야 방해 해결 (Survival)</h4>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white p-3 rounded-lg border border-red-200">
                            <p className="font-bold text-red-700 text-sm mb-1">🔍 감지 데이터 (Trigger & Data)</p>
                            <p className="text-xs text-gray-900">• Trigger: 보스 맵에서 10분 내 3회 이상 사망</p>
                            <p className="text-xs text-gray-900">• Data: 사망 시점 = 보스 주요 패턴 발동 시간 + 현재 <span className="font-bold bg-red-100 px-1 rounded">[스킬 이펙트 투명도] 100%</span></p>
                            <p className="text-xs font-bold text-red-600 mt-1">→ 판단: 화려한 이펙트 때문에 보스의 전조 동작(Pattern)을 식별하지 못함</p>
                        </div>

                        <div>
                            <p className="font-bold text-purple-700 text-sm mb-1">👼 여신의 솔루션</p>
                            <div className="flex gap-4 items-center bg-white p-3 rounded-lg border border-purple-200 shadow-sm">
                                <p className="text-sm text-gray-900 font-medium flex-1">
                                    "용사님, 스킬이 너무 화려해서 위험해요!<br />
                                    <span className="text-purple-600 font-bold">[투명도 조절]</span>로 시야를 확보해드릴까요?"
                                </p>
                                <button className="bg-purple-600 text-white text-xs px-4 py-2 rounded-full hover:bg-purple-700 transition-colors shadow font-bold whitespace-nowrap animate-pulse">
                                    👉 반투명 적용 (50%)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h4 className="font-bold mb-4 text-center text-gray-900">📈 그 외에 확장 가능한 시나리오 예시</h4>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Case 1 */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">⚔️</span>
                                <p className="font-bold text-gray-900 text-sm">Case 1. 버프 시퀀스 미사용</p>
                            </div>
                            <div className="space-y-1.5 text-xs">
                                <p className="text-red-500 font-medium">⚠️ 5초 내 버프 4개 개별 입력 감지</p>
                                <p className="text-gray-700">→ 판정: 조작 피로도↑ & 딜 타임 낭비</p>
                                <div className="pt-2 mt-2 border-t border-gray-100">
                                    <p className="text-gray-900">→ <span className="font-bold text-blue-600">[스킬 매크로]</span> 설정 가이드 제공</p>
                                </div>
                            </div>
                        </div>

                        {/* Case 2 */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">🏰</span>
                                <p className="font-bold text-gray-900 text-sm">Case 2. 길드 스킬 미사용</p>
                            </div>
                            <div className="space-y-1.5 text-xs">
                                <p className="text-red-500 font-medium">⚠️ 보스 입장 시 노블레스 스킬 OFF</p>
                                <p className="text-gray-700">→ 판정: 핵심 데미지 버프(스펙) 누락</p>
                                <div className="pt-2 mt-2 border-t border-gray-100">
                                    <p className="text-gray-900">→ <span className="font-bold text-blue-600">[길드 스킬창]</span> 즉시 팝업 버튼</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 6: 기대 효과 */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-bold text-black">기대 효과 (Expected Impact)</h2>
                        <p className="text-xs text-gray-500 mt-1">* 본 수치는 기획 의도에 따른 가설(Hypothesis) 및 목표치입니다.</p>
                    </div>
                    <span className="text-gray-500 text-sm">06 / 06</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-2 bg-blue-50 rounded-xl border-2 border-blue-300">
                        <p className="text-3xl font-bold text-blue-600 mb-0.5">↑35%</p>
                        <p className="font-bold text-gray-900 mb-0.5 text-xs">Retention Rate</p>
                        <p className="text-[10px] text-gray-600">초기 이탈 방지 및 잔존율 <span className="font-bold text-blue-600">(예상)</span></p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-xl border-2 border-green-300">
                        <p className="text-3xl font-bold text-green-600 mb-0.5">-50%</p>
                        <p className="font-bold text-gray-900 mb-0.5 text-xs">Onboarding Time</p>
                        <p className="text-[10px] text-gray-600">학습 소요 시간 단축 <span className="font-bold text-green-600">(목표)</span></p>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded-xl border-2 border-purple-300">
                        <p className="text-3xl font-bold text-purple-600 mb-0.5">+60%</p>
                        <p className="font-bold text-gray-900 mb-0.5 text-xs">Feature Adoption</p>
                        <p className="text-[10px] text-gray-900">편의 기능 활용률 증대 <span className="font-bold text-purple-600">(가설)</span></p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-2 border-blue-300 mb-5">
                    <h4 className="font-bold text-base mb-3 text-gray-900">📊 학습 곡선 단축 효과</h4>
                    <div className="bg-white p-4 rounded-lg">
                        {/* 범례 */}
                        <div className="flex justify-end gap-3 mb-4 text-xs font-bold">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                                <span className="text-gray-700">개선 전 (As-Is)</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                                <span className="text-gray-700">개선 후 (To-Be)</span>
                            </div>
                        </div>

                        {/* 그래프 영역 */}
                        <div className="h-32 flex items-end justify-between px-4 gap-3 border-b border-gray-300 relative">
                            {/* 막대 그룹 1 (Red) */}
                            <div className="flex-1 flex items-end justify-center h-full gap-2">
                                <div className="w-8 bg-red-300 rounded-t hover:bg-red-400 transition-colors relative group" style={{ height: '30%' }}>
                                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">Low</span>
                                </div>
                                <div className="w-8 bg-red-400 rounded-t hover:bg-red-500 transition-colors relative group" style={{ height: '50%' }}></div>
                                <div className="w-8 bg-red-600 rounded-t hover:bg-red-700 transition-colors relative group" style={{ height: '70%' }}>
                                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-red-800 opacity-0 group-hover:opacity-100 transition-opacity">70%</span>
                                </div>
                            </div>

                            {/* 구분선 */}
                            <div className="w-px bg-gray-300 h-full border-l border-dashed border-gray-400 mx-2"></div>

                            {/* 막대 그룹 2 (Blue) */}
                            <div className="flex-1 flex items-end justify-center h-full gap-2">
                                <div className="w-8 bg-blue-300 rounded-t hover:bg-blue-400 transition-colors relative group" style={{ height: '60%' }}>
                                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">+60%</span>
                                </div>
                                <div className="w-8 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors relative group" style={{ height: '85%' }}></div>
                                <div className="w-8 bg-blue-700 rounded-t hover:bg-blue-800 transition-colors relative group" style={{ height: '100%' }}>
                                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity">100%</span>
                                </div>
                            </div>
                        </div>

                        {/* X축 라벨 */}
                        <div className="flex justify-between px-4 gap-3 mt-1.5">
                            <div className="flex-1 flex justify-center gap-2 text-xs text-gray-600 font-medium text-center">
                                <div className="w-8">1일차</div>
                                <div className="w-8">3일차</div>
                                <div className="w-8 font-bold text-gray-900">7일차</div>
                            </div>
                            <div className="w-px mx-2"></div>
                            <div className="flex-1 flex justify-center gap-2 text-xs text-gray-600 font-medium text-center">
                                <div className="w-8">1일차</div>
                                <div className="w-8">3일차</div>
                                <div className="w-8 font-bold text-blue-700">7일차</div>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-center text-gray-900 mt-3">여신 개입 시점에서 기능 활용도가 급격히 상승하여 조기 정착 유도</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                        <h4 className="font-bold text-green-800 mb-2 text-sm">✅ 글로벌 확장성</h4>
                        <ul className="text-xs space-y-1 text-gray-900">
                            <li>• 텍스트 의존도 낮은 비주얼 가이드</li>
                            <li>• 권역별 문화에 맞춘 톤&매너 최적화</li>
                            <li>• 해외 유저 정보 습득률 개선</li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <h4 className="font-bold text-blue-800 mb-2 text-sm">🔄 데이터 활용</h4>
                        <ul className="text-xs space-y-1 text-gray-900">
                            <li>• 비효율 패턴 데이터 축적</li>
                            <li>• A/B 테스트를 통해 최적화</li>
                            <li>• 신규 편의 기능 설계 인사이트</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-gray-900 text-white p-4 rounded-2xl flex flex-col justify-center items-center text-center shadow-lg">
                    <h3 className="text-sm font-bold mb-1 flex items-center gap-2 text-yellow-300">💡 Conclusion</h3>
                    <p className="text-xs text-gray-300 mb-1.5 opacity-80">
                        20년 레거시를 부담이 아닌 자산으로, "여신의 도움"은 신규 유저에게 메이플스토리의 진정한 깊이를 전달합니다.
                    </p>
                    <p className="text-sm leading-relaxed font-light opacity-90">
                        "본 시스템은 신규 유저를 가르치기 위한 장치가 아니라, 유저가 스스로 <span className="font-bold text-yellow-300">‘아, 이 게임은 친절하다’</span>고 느끼게 만드는 경험 설계입니다."
                    </p>
                </div>
            </div>

            {/* Print Button */}
            <button
                onClick={() => window.print()}
                className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all transform hover:-translate-y-1 z-50 print:hidden"
            >
                <Printer size={20} />
                <span className="font-semibold">PDF로 저장</span>
            </button>
        </div>
    );
}
