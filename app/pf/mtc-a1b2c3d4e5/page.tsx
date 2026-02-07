'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Printer, Target, Zap, TrendingUp, Shield, Users } from 'lucide-react';

export default function MTCPortfolio() {
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
            <div className="a4-page items-center text-center flex flex-col h-full bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-gray-50 to-white z-0" />
                <div className="w-full flex-1 flex flex-col z-10 pt-8">
                    <div className="mb-6">
                        <p className="text-base font-bold text-red-600 tracking-[0.3em] uppercase mb-3">2026 Game System Design Portfolio</p>
                        <h1 className="text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">메이플 전술 훈련소</h1>
                        <p className="text-2xl font-medium text-gray-900">
                            '스펙과 실력의 간극'을 메우는 <span className="text-red-600 font-bold">실전 시뮬레이션 DLC</span>
                        </p>
                    </div>
                    <div className="w-[600px] mx-auto flex flex-col shadow-2xl rounded-2xl overflow-hidden mb-6">
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-7 text-white border-b-4 border-red-600 z-20 relative text-center">
                            <h2 className="text-3xl font-bold tracking-tight mb-3">Maple Tactical Training Center</h2>
                            <p className="text-gray-500 text-lg font-medium">High Spec, Low Skill 문제 해결을 위한 Premium Solution</p>
                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-600 rotate-45 border-r border-b border-red-700 shadow-md"></div>
                        </div>
                        <div className="bg-gray-100 p-2 border-x border-b border-gray-200 flex items-center justify-center">
                            <Image src="/images/pf/mtc-menu.jpg" alt="MTC 메뉴 화면" width={550} height={330} className="rounded-lg shadow-inner z-10" style={{ maxWidth: '100%', objectFit: 'contain' }} />
                        </div>
                    </div>
                </div>
                <div className="w-full text-right border-t border-gray-100 pt-3 mt-auto z-10 bg-white">
                    <div className="flex justify-end gap-x-8 items-baseline">
                        <div className="text-right">
                            <p className="text-xs font-bold text-gray-600 mb-0.5 uppercase tracking-wider">Designed By</p>
                            <p className="text-2xl font-bold text-gray-900">이경준</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-gray-600 mb-0.5 uppercase tracking-wider">Date</p>
                            <p className="text-lg font-medium text-black">2026. 02</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 1: 기획 배경 및 문제 정의 */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">기획 배경 및 문제 정의</h2>
                    <span className="text-gray-800 text-sm">01 / 07</span>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
                    <h3 className="text-xl font-bold text-red-900 mb-3">Core Problem Statement</h3>
                    <p className="text-lg text-red-800 leading-relaxed">"스펙은 충분한데 왜 못 깰까?<br />성장 시스템의 강화가 실력 상승으로 이어지지 않습니다."</p>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                        <h4 className="font-bold text-lg mb-3 text-orange-600">📈 High Spec</h4>
                        <p className="text-sm text-gray-800 mb-3"><strong>스펙 상향 평준화</strong></p>
                        <ul className="text-sm space-y-2 text-black">
                            <li>• 제네시스 패스 등 완화 패치</li>
                            <li>• 무기/장비 획득 난이도 하락</li>
                            <li>• 충분한 데미지 확보</li>
                        </ul>
                    </div>
                    <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                        <h4 className="font-bold text-lg mb-3 text-red-600">📉 Low Skill</h4>
                        <p className="text-sm text-gray-800 mb-3"><strong>실력 부족 문제</strong></p>
                        <ul className="text-sm space-y-2 text-black">
                            <li>• 복잡해진 보스 패턴</li>
                            <li>• 유튜브 공략과 실전의 괴리</li>
                            <li>• 데스카운트 아웃 반복</li>
                        </ul>
                    </div>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r mb-6">
                    <h4 className="font-bold text-yellow-900 mb-2">💡 핵심 인사이트</h4>
                    <p className="text-sm text-gray-800">"유저들에게 필요한 것은 <span className="font-bold text-yellow-700">'더 높은 스펙'</span>이 아니라, <span className="font-bold text-yellow-700">'안전하고 반복적인 숙련도 훈련'</span>입니다."</p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-gray-50 to-red-50 rounded-xl p-5 border-2 border-red-200">
                    <h4 className="text-center text-lg font-bold text-red-900 mb-4">학습의 비효율 시각화</h4>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                            <div className="bg-blue-100 p-4 rounded-lg mb-2 border border-blue-200">
                                <p className="text-3xl mb-1">👀</p>
                                <p className="text-xs font-bold text-gray-900">유튜브 공략</p>
                            </div>
                            <p className="text-xs text-black">이론적 이해</p>
                        </div>
                        <div className="text-center flex items-center justify-center">
                            <div className="text-6xl font-bold text-red-500">≠</div>
                        </div>
                        <div className="text-center">
                            <div className="bg-red-100 p-4 rounded-lg mb-2 border border-red-200">
                                <p className="text-3xl mb-1">🎮</p>
                                <p className="text-xs font-bold text-gray-900">실전 플레이</p>
                            </div>
                            <p className="text-xs text-black">실제 대응력</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-red-300">
                        <p className="text-sm font-bold text-red-900 mb-2">현재 연습 모드의 한계</p>
                        <ul className="text-xs space-y-1.5 text-black">
                            <li>• ❌ 인게임 내 패턴별 공략 가이드 부재</li>
                            <li>• ❌ 초심자에게 불친절한 높은 진입장벽</li>
                            <li>• ❌ 특정 페이즈/패턴만 반복 연습 불가</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* PAGE 2: 핵심 기술 */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-3 mb-5 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">핵심 기술: 팬텀 리플레이 엔진</h2>
                    <span className="text-gray-800 text-sm">02 / 07</span>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-2xl mb-5">
                    <h3 className="text-3xl font-bold mb-3">🎬 Phantom Replay Engine</h3>
                    <p className="text-2xl font-bold">"서버는 가볍게, 경험은 무겁게"</p>
                    <p className="text-lg mt-1 opacity-90">혁신적인 시뮬레이션 기술</p>
                </div>
                <div className="grid grid-cols-2 gap-5 mb-5">
                    <div className="bg-purple-50 p-5 rounded-xl border-2 border-purple-300">
                        <h4 className="font-bold text-lg mb-2 text-purple-900">📊 기존 방식</h4>
                        <div className="space-y-2 text-sm">
                            <div className="bg-white p-2.5 rounded border-l-4 border-red-400">
                                <p className="font-bold text-red-600 mb-0.5">AI 인스턴스 생성</p>
                                <p className="text-xs text-black">매 입장마다 보스 AI 연산</p>
                            </div>
                            <div className="bg-white p-2.5 rounded border-l-4 border-red-400">
                                <p className="font-bold text-red-600 mb-0.5">서버 부하 증가</p>
                                <p className="text-xs text-black">동시 접속자↑ = 렉 발생</p>
                            </div>
                            <div className="bg-white p-2.5 rounded border-l-4 border-red-400">
                                <p className="font-bold text-red-600 mb-0.5">안정성 리스크</p>
                                <p className="text-xs text-black">라이브 서버 영향</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-300">
                        <h4 className="font-bold text-lg mb-2 text-blue-900">✨ 팬텀 리플레이</h4>
                        <div className="space-y-2 text-sm">
                            <div className="bg-white p-2.5 rounded border-l-4 border-blue-400">
                                <p className="font-bold text-blue-600 mb-0.5">로그 재생 방식</p>
                                <p className="text-xs text-black">AI 연산 제거</p>
                            </div>
                            <div className="bg-white p-2.5 rounded border-l-4 border-blue-400">
                                <p className="font-bold text-blue-600 mb-0.5">서버 부하 Zero</p>
                                <p className="text-xs text-black">단순 데이터 스트리밍</p>
                            </div>
                            <div className="bg-white p-2.5 rounded border-l-4 border-blue-400">
                                <p className="font-bold text-blue-600 mb-0.5">100% 재현</p>
                                <p className="text-xs text-black">실전과 동일한 경험</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-indigo-50 p-5 rounded-xl border-2 border-indigo-300 mb-5">
                    <h4 className="font-bold text-indigo-900 mb-3">⚙️ 작동 원리 (How It Works)</h4>
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 bg-white p-2.5 rounded-lg border-2 border-gray-300 text-center">
                            <p className="font-bold text-sm mb-1 text-gray-900">1️⃣ 로그 수집</p>
                            <p className="text-xs text-black">실제 클리어 영상의<br />보스 행동 기록</p>
                        </div>
                        <span className="text-xl text-indigo-600">→</span>
                        <div className="flex-1 bg-white p-2.5 rounded-lg border-2 border-gray-300 text-center">
                            <p className="font-bold text-sm mb-1 text-gray-900">2️⃣ 데이터 변환</p>
                            <p className="text-xs text-black">움직임/판정/이펙트<br />타임스탬프화</p>
                        </div>
                        <span className="text-xl text-indigo-600">→</span>
                        <div className="flex-1 bg-white p-2.5 rounded-lg border-2 border-gray-300 text-center">
                            <p className="font-bold text-sm mb-1 text-gray-900">3️⃣ 재생</p>
                            <p className="text-xs text-black">AI 없이<br />로그만 스트리밍</p>
                        </div>
                    </div>
                </div>
                <div className="bg-green-50 p-5 rounded-xl border-2 border-green-400">
                    <h4 className="font-bold text-green-900 mb-3 text-lg">💎 핵심 장점 (Key Benefits)</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-bold text-green-700 mb-1.5 text-base">✅ 기술적 안정성</p>
                            <p className="text-gray-900 text-sm leading-relaxed">AI 연산 부담 제거로<br />라이브 서버 안정성 확보</p>
                        </div>
                        <div>
                            <p className="font-bold text-green-700 mb-1.5 text-base">✅ 완벽한 재현도</p>
                            <p className="text-gray-900 text-sm leading-relaxed">비주얼, 타격감, 판정<br />실전과 100% 동일</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 3: 핵심 학습 시스템 */}
            <div className="a4-page flex flex-col">
                <div className="border-b-2 border-gray-900 pb-3 mb-4 flex justify-between items-end shrink-0">
                    <h2 className="text-3xl font-bold text-black leading-none">핵심 학습 시스템 (Core Learning System)</h2>
                    <span className="text-gray-800 text-sm">03 / 07</span>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded-r mb-3 shrink-0">
                    <h3 className="text-lg font-bold text-orange-900 mb-1">🎯 학습 철학: "정답지 암기가 아닌, 대응력을 기른다"</h3>
                    <p className="text-sm text-orange-800 leading-snug">단순 패턴 암기는 실전에서 무너집니다. M.T.C는 다양한 변수에 능동적으로 대처하는 <strong>'전투 지능(Combat IQ)'</strong> 향상을 목표로 합니다.</p>
                </div>

                <div className="flex-1 flex flex-col justify-between gap-3">
                    {/* System 1 */}
                    <div className="flex-1 min-h-0 bg-blue-50 p-3 rounded-xl border-2 border-blue-200 flex flex-col">
                        <div className="flex items-center gap-2 mb-2 shrink-0">
                            <span className="bg-blue-600 text-white font-bold px-2.5 py-0.5 rounded text-sm">System 1</span>
                            <h3 className="text-lg font-bold text-blue-900">시나리오 랜덤 매칭 (Scenario Randomization)</h3>
                        </div>
                        <p className="text-sm text-black mb-3 font-bold shrink-0">"보스별 다수의 표준 공략 로그(Ghost)를 입장 시 랜덤 송출하여, 단순 암기를 방지합니다."</p>
                        <div className="grid grid-cols-3 gap-3 flex-1">
                            <div className="bg-white p-3 rounded-lg border border-blue-100 text-center flex flex-col justify-center items-center h-full">
                                <div className="text-3xl mb-2">🧱</div>
                                <p className="font-bold text-blue-800 mb-1 text-base">구석 유도 전략</p>
                                <p className="text-xs text-black font-medium break-keep">안정적 딜링 환경 조성을 위한 유도 테크닉 학습</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-blue-100 text-center flex flex-col justify-center items-center h-full">
                                <div className="text-3xl mb-2">🌪️</div>
                                <p className="font-bold text-blue-800 mb-1 text-base">중앙 난전 대응</p>
                                <p className="text-xs text-black font-medium break-keep">패턴이 겹치는 위급 상황에서의 생존 및 회피</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-blue-100 text-center flex flex-col justify-center items-center h-full">
                                <div className="text-3xl mb-2">🎯</div>
                                <p className="font-bold text-blue-800 mb-1 text-base">특수 패턴 집중</p>
                                <p className="text-xs text-black font-medium break-keep">특정 체력 구간의 기믹 파훼 메커니즘 숙달</p>
                            </div>
                        </div>
                    </div>

                    {/* System 2 */}
                    <div className="flex-1 min-h-0 bg-purple-50 p-3 rounded-xl border-2 border-purple-200 flex flex-col">
                        <div className="flex items-center gap-2 mb-2 shrink-0">
                            <span className="bg-purple-600 text-white font-bold px-2.5 py-0.5 rounded text-sm">System 2</span>
                            <h3 className="text-lg font-bold text-purple-900">직업별 무브먼트 매칭 (Movement Matching)</h3>
                        </div>
                        <p className="text-sm text-black mb-3 font-bold shrink-0">"내 직업과 이동 메커니즘이 가장 유사한 '선생님(Ghost)'을 자동으로 매칭합니다."</p>
                        <div className="grid grid-cols-3 gap-3 flex-1">
                            <div className="bg-white p-3 rounded-lg border border-purple-100 flex flex-col items-center text-center justify-center h-full">
                                <Image src="/images/pf/teleport.png" alt="텔레포트" width={44} height={44} className="pixelated mb-2 bg-purple-50 rounded p-1" />
                                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold mb-1">Type A</span>
                                <h4 className="font-bold text-gray-900 text-sm">텔레포트</h4>
                                <p className="text-[11px] text-black mt-1 font-medium">마법사 직업군 등<br />짧은 거리 즉시 이동</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-purple-100 flex flex-col items-center text-center justify-center h-full">
                                <Image src="/images/pf/flash-jump.png" alt="플점" width={44} height={44} className="pixelated mb-2 bg-purple-50 rounded p-1" />
                                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold mb-1">Type B</span>
                                <h4 className="font-bold text-gray-900 text-sm">플래시 점프</h4>
                                <p className="text-[11px] text-black mt-1 font-medium">도적/궁수/해적 등<br />포물선 운동 기동</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-purple-100 flex flex-col items-center text-center justify-center h-full">
                                <Image src="/images/pf/burst-step.png" alt="특수" width={44} height={44} className="pixelated mb-2 bg-purple-50 rounded p-1" />
                                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold mb-1">Type C</span>
                                <h4 className="font-bold text-gray-900 text-sm">특수 이동</h4>
                                <p className="text-[11px] text-black mt-1 font-medium">제로/호영/아란 등<br />돌진 및 캔슬 기동</p>
                            </div>
                        </div>
                    </div>

                    {/* System 3 */}
                    <div className="flex-none bg-white p-3 rounded-xl border-2 border-yellow-400">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-yellow-500 text-white font-bold px-2.5 py-0.5 rounded text-sm">System 3</span>
                            <h3 className="text-lg font-bold text-yellow-900">스마트 택티컬 내비 (Tactical Navi)</h3>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="flex-1">
                                <p className="text-sm font-bold text-black mb-1">"정답을 강요하지 않고, 점진적으로 도움을 줄이는 구조"</p>
                                <p className="text-xs text-black mb-3 leading-snug font-medium">초보자에게는 명확한 가이드를 제공하고, 숙련될수록 가이드를 제거하여 실전 감각을 완성시킵니다.</p>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-yellow-50 p-2.5 rounded border border-yellow-200">
                                        <div className="flex items-center mb-1">
                                            <span className="text-xs font-bold text-yellow-900 bg-yellow-200 px-1.5 py-0.5 rounded mr-2">Lv 1 (입문)</span>
                                        </div>
                                        <p className="text-xs text-black pl-1 leading-snug font-medium">• 고스트 (선생님) 표시<br />• 안전지대 하이라이팅<br />• 키 입력 가이드</p>
                                    </div>
                                    <div className="bg-red-50 p-2.5 rounded border border-red-200">
                                        <div className="flex items-center mb-1">
                                            <span className="text-xs font-bold text-red-900 bg-red-200 px-1.5 py-0.5 rounded mr-2">Lv 2 (실전)</span>
                                        </div>
                                        <p className="text-xs text-black pl-1 leading-snug font-medium">• 고스트만 표시<br />• 경고/안전지대 제거<br />• 실전과 동일한 환경</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 4: 콘텐츠 구조 설계 */}
            <div className="a4-page flex flex-col justify-between">
                <div>
                    <div className="border-b-2 border-gray-900 pb-3 mb-6 flex justify-between items-end shrink-0">
                        <h2 className="text-3xl font-bold text-black leading-none">콘텐츠 구조 설계 (Tiered Structure)</h2>
                        <span className="text-gray-800 text-sm">04 / 07</span>
                    </div>
                    <div className="bg-indigo-50 border-l-4 border-indigo-600 p-5 rounded-r mb-8 shrink-0 shadow-sm">
                        <h3 className="text-xl font-bold text-indigo-900 mb-2">🎯 설계 목표: "넓은 보스 풀, 깊이 있는 학습 경험"</h3>
                        <p className="text-base text-indigo-800 font-medium">개발 리소스 효율과 유저 체감을 모두 만족시키는 계층적 구조 설계</p>
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-5">
                    {/* Tier 1 */}
                    <div className="flex-1 flex bg-blue-600 rounded-xl border-2 border-blue-700 overflow-hidden shadow-lg">
                        <div className="bg-blue-800 p-4 w-32 flex flex-col justify-center items-center text-center border-r border-blue-700 shrink-0">
                            <h4 className="text-2xl font-bold text-white mb-1">Tier 1</h4>
                            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-bold">기본 훈련존</span>
                        </div>
                        <div className="p-4 flex-1 grid grid-cols-[1fr_1.5fr] gap-4 items-center">
                            <div>
                                <p className="text-xs font-bold text-blue-200 mb-1 uppercase tracking-wider">Target Boss</p>
                                <p className="font-bold text-white text-lg break-keep leading-snug">스우, 데미안, 루시드, 윌</p>
                                <p className="text-xs text-blue-100 mt-1 break-keep font-medium opacity-90">메이플 용사의 70%가 머무르는 구간</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-blue-200 mb-1 uppercase tracking-wider">Key Features</p>
                                <ul className="text-sm text-white list-disc list-inside font-medium space-y-1">
                                    <li>랜덤 팬텀 리플레이(2~3종)</li>
                                    <li>직업별 무브먼트 매칭</li>
                                    <li>스마트 택티컬 내비(Lv 1, 2)</li>
                                    <li>페이즈 셀렉터(취약점 집중)</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-blue-50 p-4 w-28 flex justify-center items-center text-center border-l border-blue-400 shrink-0">
                            <p className="text-xs font-bold text-blue-900 break-keep leading-relaxed">"유저 풀 확장<br />진입장벽 제거"</p>
                        </div>
                    </div>

                    {/* Tier 2 */}
                    <div className="flex-1 flex bg-indigo-600 rounded-xl border-2 border-indigo-700 overflow-hidden shadow-lg transform scale-[1.03] z-10">
                        <div className="bg-indigo-800 p-4 w-32 flex flex-col justify-center items-center text-center border-r border-indigo-700 shrink-0">
                            <h4 className="text-3xl font-bold text-white mb-2">Tier 2</h4>
                            <span className="text-xs bg-indigo-500 text-white px-2 py-1 rounded-full font-bold">숙련 훈련존</span>
                            <span className="text-[10px] text-yellow-300 mt-2 font-bold border border-yellow-300 px-1.5 py-0.5 rounded">★ BM Core</span>
                        </div>
                        <div className="p-5 flex-1 grid grid-cols-[1fr_1.5fr] gap-4 items-center">
                            <div>
                                <p className="text-xs font-bold text-indigo-200 mb-1 uppercase tracking-wider">Target Boss</p>
                                <p className="font-bold text-white text-xl break-keep leading-snug">진 힐라, 검은 마법사, 세렌</p>
                                <p className="text-xs text-indigo-100 mt-1 break-keep font-medium opacity-90">본격적인 패턴 공략이 요구되는 최상위 관문</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-indigo-200 mb-1 uppercase tracking-wider">Key Features</p>
                                <ul className="text-sm text-white list-disc list-inside font-bold space-y-1.5">
                                    <li>랜덤 팬텀 리플레이(3~5종)</li>
                                    <li>직업별 무브먼트 매칭</li>
                                    <li>스마트 택티컬 내비(Lv 1, 2)</li>
                                    <li className="text-yellow-300">페이즈 셀렉터(취약점 집중)</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-indigo-50 p-4 w-28 flex justify-center items-center text-center border-l border-indigo-400 shrink-0">
                            <p className="text-sm font-bold text-indigo-900 break-keep leading-relaxed">"돈 낼 가치가<br />있는 실질적 효용"</p>
                        </div>
                    </div>

                    {/* Tier 3 */}
                    <div className="flex-1 flex bg-gray-700 rounded-xl border-2 border-gray-600 overflow-hidden shadow-lg">
                        <div className="bg-gray-800 p-4 w-32 flex flex-col justify-center items-center text-center border-r border-gray-600 shrink-0">
                            <h4 className="text-2xl font-bold text-white mb-1">Tier 3</h4>
                            <span className="text-xs bg-gray-600 text-gray-200 px-2 py-1 rounded-full font-bold">시범 훈련존</span>
                        </div>
                        <div className="p-4 flex-1 grid grid-cols-[1fr_1.5fr] gap-4 items-center">
                            <div>
                                <p className="text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Target Boss</p>
                                <p className="font-bold text-white text-lg break-keep leading-snug">이지 칼로스, 카링 등</p>
                                <p className="text-xs text-gray-500 mt-1 break-keep font-medium opacity-80">최신 보스 및 신규 패턴 실험</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-600 mb-1 uppercase tracking-wider">Key Features</p>
                                <ul className="text-sm text-white list-disc list-inside font-medium space-y-1">
                                    <li>랜덤 팬텀 리플레이(3~5종)</li>
                                    <li>직업별 무브먼트 매칭</li>
                                    <li>스마트 택티컬 내비(Lv 1, 2)</li>
                                    <li>페이즈 셀렉터(취약점 집중)</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gray-100 p-4 w-28 flex justify-center items-center text-center border-l border-gray-300 shrink-0">
                            <p className="text-xs font-bold text-gray-800 break-keep leading-relaxed">"학습 수요<br />선제 대응 (Pilot)"</p>
                        </div>
                    </div>

                    {/* Tier 4 (New) */}
                    <div className="flex-1 flex bg-white rounded-xl border-2 border-dashed border-gray-400 overflow-hidden shadow-sm opacity-90">
                        <div className="bg-gray-50 p-4 w-32 flex flex-col justify-center items-center text-center border-r border-dashed border-gray-300 shrink-0">
                            <h4 className="text-2xl font-bold text-gray-800 mb-1">Tier 4+</h4>
                            <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full font-bold">확장 가능성</span>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-center gap-2">
                            <p className="font-bold text-gray-800 text-base">"점진적으로 필요 할 때 마다 추가 가능성 열어둠"</p>
                            <p className="text-sm text-gray-900 leading-snug">기획 의도: 유저들이 일정 보스 이상 잡기를 원할 때마다<br />유동적으로 Tier를 확장하여 대응</p>
                        </div>
                        <div className="bg-gray-50 p-4 w-28 flex justify-center items-center text-center border-l border-dashed border-gray-300 shrink-0">
                            <p className="text-xs font-bold text-gray-800 break-keep leading-relaxed">"지속 가능한<br />서비스 확장"</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 5: BM 전략 */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">BM 전략 및 가격 정책</h2>
                    <span className="text-gray-800 text-sm">05 / 07</span>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl mb-6">
                    <h3 className="text-2xl font-bold mb-3">💰 메이플 시뮬레이션 패스 (MSP)</h3>
                    <p className="text-lg">"성장을 파는 것이 아니라, 시간을 아껴주는 '프리미엄 툴'을 팝니다."</p>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                        <h4 className="font-bold text-green-800 mb-3">✅ 기본 원칙</h4>
                        <ul className="text-sm space-y-2 text-gray-800">
                            <li>• <strong>철저한 분리:</strong> 기존 연습 모드 무료 유지</li>
                            <li>• <strong>선택적 DLC:</strong> 원하는 유저만 구매</li>
                            <li>• <strong>옵션화:</strong> P2W 논란 회피</li>
                        </ul>
                    </div>
                    <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                        <h4 className="font-bold text-red-800 mb-3">❌ P2W 회피 전략</h4>
                        <ul className="text-sm space-y-2 text-gray-800">
                            <li>• 연습권 ≠ 성장 재화 (분리)</li>
                            <li>• EXP 쿠폰은 옵션 상품</li>
                            <li>• 실력 향상만 제공, 스펙 판매 안 함</li>
                        </ul>
                    </div>
                </div>
                {/* 상품 라인업 테이블 */}
                <div className="bg-white rounded-xl border-2 border-blue-300 overflow-hidden mb-6">
                    <div className="bg-blue-600 text-white p-3">
                        <h4 className="font-bold text-center">🛒 상품 라인업 (Pricing Strategy)</h4>
                    </div>
                    <table className="w-full text-xs">
                        <thead className="bg-gray-100">
                            <tr className="border-b-2 border-gray-300">
                                <th className="p-2 text-left font-bold text-gray-900">등급</th>
                                <th className="p-2 text-left font-bold text-gray-900">상품명</th>
                                <th className="p-2 text-center font-bold text-gray-900">가격</th>
                                <th className="p-2 text-left font-bold text-gray-900">구성 및 혜택</th>
                                <th className="p-2 text-left font-bold text-gray-900">타겟 유저</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 bg-blue-50">
                                <td className="p-2"><span className="px-2 py-1 bg-blue-200 rounded text-blue-900 font-bold">체험형</span></td>
                                <td className="p-2 font-bold text-gray-900">1 Day 티켓</td>
                                <td className="p-2 text-center"><span className="font-bold text-blue-600">1,900 메포</span></td>
                                <td className="p-2 text-black">M.T.C 24시간 무제한 이용</td>
                                <td className="p-2 text-black">단기 집중 연습</td>
                            </tr>
                            <tr className="border-b border-gray-200 bg-green-50">
                                <td className="p-2"><span className="px-2 py-1 bg-green-200 rounded text-green-900 font-bold">실속형</span></td>
                                <td className="p-2 font-bold text-gray-900">위클리 패스</td>
                                <td className="p-2 text-center"><span className="font-bold text-green-600">9,900원</span></td>
                                <td className="p-2 text-black">7일 무제한 + 칭호 [전술 훈련생]</td>
                                <td className="p-2 text-black">주말 보스 트라이</td>
                            </tr>
                            <tr className="border-b border-gray-200 bg-purple-50">
                                <td className="p-2"><span className="px-2 py-1 bg-purple-200 rounded text-purple-900 font-bold">구독형</span></td>
                                <td className="p-2 font-bold text-gray-900">월간 마스터</td>
                                <td className="p-2 text-center"><span className="font-bold text-purple-600">19,900원</span></td>
                                <td className="p-2 text-black">30일 무제한 + 전용 코디 세트</td>
                                <td className="p-2 text-black">전 보스 마스터</td>
                            </tr>
                            <tr className="bg-yellow-50">
                                <td className="p-2"><span className="px-2 py-1 bg-yellow-200 rounded text-yellow-900 font-bold">옵션</span></td>
                                <td className="p-2 font-bold text-gray-900">훈련 지원 상자</td>
                                <td className="p-2 text-center"><span className="font-bold text-yellow-600">5,000원</span></td>
                                <td className="p-2 text-black">고효율 EXP 쿠폰 1,000장</td>
                                <td className="p-2 text-black">패스 구매자만</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex-1 bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border-2 border-blue-300">
                    <h4 className="font-bold text-gray-900 mb-3">📊 예상 매출 구조</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                            <div className="bg-white p-3 rounded-lg border border-blue-200 mb-2">
                                <p className="text-2xl font-bold text-blue-600">40%</p>
                            </div>
                            <p className="font-bold text-gray-900">체험형 (1Day)</p>
                            <p className="text-xs text-black">진입장벽↓</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-white p-3 rounded-lg border border-green-200 mb-2">
                                <p className="text-2xl font-bold text-green-600">35%</p>
                            </div>
                            <p className="font-bold text-gray-900">실속형 (위클리)</p>
                            <p className="text-xs text-black">주력 상품</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-white p-3 rounded-lg border border-purple-200 mb-2">
                                <p className="text-2xl font-bold text-purple-600">25%</p>
                            </div>
                            <p className="font-bold text-gray-900">구독형 (월간)</p>
                            <p className="text-xs text-black">헤비 유저</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 6: 운영 및 업데이트 전략 */}
            <div className="a4-page flex flex-col relative overflow-hidden">
                {/* 배경 데코레이션 */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-gray-100 to-transparent rounded-bl-full -z-10"></div>

                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end shrink-0">
                    <h2 className="text-3xl font-extrabold text-gray-900 leading-none tracking-tight">운영 및 업데이트 전략</h2>
                    <span className="text-gray-800 text-sm font-bold tracking-widest">06 / 07</span>
                </div>
                
                {/* 전략 핵심 메시지 */}
                <div className="bg-gray-900 rounded-xl p-5 mb-8 text-white shadow-lg shrink-0 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                    <h3 className="text-sm font-bold text-indigo-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                        Strategic Core
                    </h3>
                    <p className="text-xl font-medium leading-relaxed relative z-10">
                        "콘텐츠의 <span className="text-yellow-400 font-bold border-b-2 border-yellow-400">수명 주기(Lifecycle)</span>를 관리하고,<br/>
                        주간 로테이션으로 <span className="text-yellow-400 font-bold">지속적인 방문</span>을 유도합니다."
                    </p>
                </div>

                <div className="flex-1 flex flex-col gap-8">

                    {/* 1. 콘텐츠 라이프사이클 (Timeline) */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-extrabold text-sm shadow-sm">1</span>
                            <h4 className="text-xl font-bold text-gray-900">콘텐츠 라이프사이클 (Content Lifecycle)</h4>
                        </div>
                        <p className="text-sm text-gray-900 mb-4 pl-10 leading-snug font-medium">
                            "보스의 위상 변화에 따라 M.T.C Tier를 유동적으로 조정하여 가치를 보존합니다."
                        </p>
                        
                        <div className="relative pl-2 pr-2">
                             {/* 연결선 */}
                             <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-100 -translate-y-1/2 -z-10 rounded-full"></div>

                            <div className="grid grid-cols-4 gap-4">
                                {/* 1단계: 유예 */}
                                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm relative hover:-translate-y-1 transition-transform">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Step 1</div>
                                    <div className="text-center mb-2 mt-2">
                                        <span className="text-2xl grayscale opacity-50">🔒</span>
                                        <p className="font-bold text-gray-900 text-sm">유예 (Locked)</p>
                                    </div>
                                    <ul className="text-[10px] text-gray-900 space-y-1 leading-tight">
                                        <li><span className="font-bold text-gray-800">대상:</span> 신규 보스</li>
                                        <li><span className="font-bold text-red-600">기간:</span> <span className="bg-red-50 px-1 rounded">3~6개월 미포함</span></li>
                                        <li><span className="font-bold text-gray-800">목적:</span> 선발대 성취감 보존</li>
                                    </ul>
                                </div>

                                {/* 2단계: 시범 */}
                                <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-sm relative hover:-translate-y-1 transition-transform">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Step 2</div>
                                    <div className="text-center mb-2 mt-2">
                                        <span className="text-2xl">✈️</span>
                                        <p className="font-bold text-blue-900 text-sm">시범 (Pilot)</p>
                                    </div>
                                    <ul className="text-[10px] text-gray-900 space-y-1 leading-tight">
                                        <li><span className="font-bold text-gray-800">대상:</span> 정체 구간 확인 시</li>
                                        <li><span className="font-bold text-blue-600">액션:</span> '시범 훈련존' 도입</li>
                                        <li><span className="font-bold text-gray-800">목적:</span> 메타 학습 수요 대응</li>
                                    </ul>
                                </div>

                                {/* 3단계: 숙련 */}
                                <div className="bg-indigo-50 p-3 rounded-xl border-2 border-indigo-400 shadow-md relative hover:-translate-y-1 transition-transform transform scale-105 z-10">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">CORE</div>
                                    <div className="text-center mb-2 mt-2">
                                        <span className="text-2xl">⭐</span>
                                        <p className="font-bold text-indigo-900 text-sm">숙련 (Core)</p>
                                    </div>
                                    <ul className="text-[10px] text-indigo-800 space-y-1 leading-tight font-medium">
                                        <li><span className="font-bold">대상:</span> 대중적 공략 필요</li>
                                        <li><span className="font-bold text-indigo-600">액션:</span> '숙련 훈련존' 전환</li>
                                        <li><span className="font-bold">목적:</span> BM 주력 상품화</li>
                                    </ul>
                                </div>

                                {/* 4단계: 보급 */}
                                <div className="bg-white p-3 rounded-xl border border-green-200 shadow-sm relative hover:-translate-y-1 transition-transform">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Step 4</div>
                                    <div className="text-center mb-2 mt-2">
                                        <span className="text-2xl">🎁</span>
                                        <p className="font-bold text-green-900 text-sm">보급 (Basic)</p>
                                    </div>
                                    <ul className="text-[10px] text-gray-900 space-y-1 leading-tight">
                                        <li><span className="font-bold text-gray-800">대상:</span> 숙련도 평준화</li>
                                        <li><span className="font-bold text-green-600">액션:</span> '기본 훈련존' 편입</li>
                                        <li><span className="font-bold text-gray-800">목적:</span> 진입장벽 제거</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. 주간 무료 로테이션 */}
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-extrabold text-sm shadow-sm">2</span>
                            <h4 className="text-xl font-bold text-gray-900">주간 무료 로테이션 (Weekly Free Rotation)</h4>
                        </div>
                        <p className="text-sm text-gray-900 mb-4 pl-10 leading-snug font-medium">
                            "유료 결제의 심리적 진입 장벽을 낮추는 핵심 <span className="text-purple-700 font-bold">가교</span>"
                        </p>

                        <div className="grid grid-cols-5 gap-6 h-full">
                            {/* 좌측: 캘린더 예시 (2/5 비중) */}
                            <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col">
                                <div className="mb-3 border-b border-gray-100 pb-2">
                                    <span className="text-[10px] font-bold text-gray-800 uppercase">Operating System</span>
                                    <p className="text-xs text-gray-800 font-medium">매주 <span className="font-bold text-purple-600">Tier 1~2</span> 보스 1종 무료 개방<br/><span className="text-gray-600 text-[10px]">(목요일 00시 초기화)</span></p>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-3 flex-1">
                                    <p className="text-[11px] font-bold text-purple-900 mb-2 text-center">📅 2월 로테이션 예시</p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center justify-between text-xs bg-white p-1.5 rounded border border-purple-100 shadow-sm">
                                            <span className="text-gray-800 text-[10px] font-bold">1주차</span>
                                            <span className="font-bold text-gray-800">하드 진 힐라</span>
                                        </li>
                                        <li className="flex items-center justify-between text-xs bg-white p-1.5 rounded border border-purple-100 shadow-sm">
                                            <span className="text-gray-800 text-[10px] font-bold">2주차</span>
                                            <span className="text-gray-800">노멀 세렌</span>
                                        </li>
                                        <li className="flex items-center justify-between text-xs bg-white p-1.5 rounded border border-purple-100 shadow-sm">
                                            <span className="text-gray-800 text-[10px] font-bold">3주차</span>
                                            <span className="text-gray-800">하드 스우</span>
                                        </li>
                                        <li className="flex items-center justify-between text-xs bg-white p-1.5 rounded border border-purple-100 shadow-sm">
                                            <span className="text-gray-800 text-[10px] font-bold">4주차</span>
                                            <span className="text-gray-800">하드 윌</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* 우측: 선순환 사이클 (3/5 비중) */}
                            <div className="col-span-3 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100 p-4 shadow-sm flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                                
                                <p className="text-xs text-center text-gray-800 font-bold mb-4 uppercase tracking-widest z-10">Virtuous Cycle Effect</p>
                                
                                <div className="flex items-center justify-between z-10 relative">
                                    <div className="flex flex-col items-center w-1/3 text-center group">
                                        <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-xl mb-2 shadow-sm group-hover:border-purple-400 group-hover:text-purple-600 transition-colors">🎮</div>
                                        <p className="text-xs font-bold text-gray-800 mb-1">체험 (Entry)</p>
                                        <p className="text-xs font-bold text-gray-800 leading-tight">"무료니까<br/>한번 해볼까?"</p>
                                    </div>
                                    <div className="text-gray-500">➜</div>
                                    <div className="flex flex-col items-center w-1/3 text-center group">
                                        <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-xl mb-2 shadow-sm group-hover:border-blue-400 group-hover:text-blue-600 transition-colors">💪</div>
                                        <p className="text-xs font-bold text-gray-800 mb-1">효능감 (Confidence)</p>
                                        <p className="text-xs font-bold text-gray-800 leading-tight">"가이드대로 하니까<br/>피해지네?"</p>
                                    </div>
                                    <div className="text-gray-500">➜</div>
                                    <div className="flex flex-col items-center w-1/3 text-center group">
                                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl mb-2 shadow-md hover:scale-110 transition-transform">🛒</div>
                                        <p className="text-xs font-bold text-purple-700 mb-1">전환 (Lock-in)</p>
                                        <p className="text-xs font-bold text-gray-900 leading-tight">"위클리 패스<br/>구매하자!"</p>
                                    </div>
                                </div>
                                
                                <div className="mt-4 bg-white/60 p-2 rounded-lg text-xs font-bold text-center text-gray-900 border border-purple-100 z-10">
                                    🚀 <b>활성화:</b> 주간 패스 매출 증가 + 보스 도전 문화 확산 <br/>(Boom-up)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* PAGE 7: 기대 효과 */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-3 mb-4 flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-bold text-black">기대 효과 및 리스크 관리</h2>
                        <p className="text-xs text-gray-800 mt-1">* 본 수치는 기획 의도에 따른 가설(Hypothesis) 및 목표치입니다.</p>
                    </div>
                    <span className="text-gray-800 text-sm">07 / 07</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2.5 bg-blue-50 rounded-xl border-2 border-blue-300">
                        <p className="text-4xl font-bold text-blue-600 mb-1">↑25%</p>
                        <p className="font-bold text-gray-900 mb-0.5 text-sm">Clear Rate</p>
                        <p className="text-xs text-gray-900">보스 클리어율 증가 <span className="font-bold text-blue-600">(목표)</span></p>
                    </div>
                    <div className="text-center p-2.5 bg-green-50 rounded-xl border-2 border-green-300">
                        <p className="text-4xl font-bold text-green-600 mb-1">+40%</p>
                        <p className="font-bold text-gray-900 mb-0.5 text-sm">Training Hours</p>
                        <p className="text-xs text-gray-900">평균 훈련 시간 <span className="font-bold text-green-600">(예상)</span></p>
                    </div>
                    <div className="text-center p-2.5 bg-purple-50 rounded-xl border-2 border-purple-300">
                        <p className="text-4xl font-bold text-purple-600 mb-1">↑30%</p>
                        <p className="font-bold text-gray-900 mb-0.5 text-sm">Revenue</p>
                        <p className="text-xs text-gray-900">구독형 매출 증대 <span className="font-bold text-purple-600">(가설)</span></p>
                    </div>
                </div>
                <div className="bg-red-50 p-4 rounded-xl border-2 border-red-300 mb-4">
                    <h4 className="font-bold text-lg text-red-900 mb-3">🛡️ 여론 리스크 방어 (Risk Management)</h4>
                    <div className="space-y-2.5 text-sm">
                        <div className="bg-white p-3 rounded-lg border-l-4 border-orange-400">
                            <p className="font-bold text-orange-800 mb-1.5">Q. "돈 없으면 연습도 못 하나?"</p>
                            <p className="text-gray-800">A. "<span className="font-bold text-blue-600">기존 연습 모드는 100% 무료입니다.</span> M.T.C는 스펙은 충분하지만 숙련도가 부족한 유저들에게 <span className="font-bold">가장 빠른 숙련도 향상</span>을 제공하는 프리미엄 서비스입니다."</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border-l-4 border-purple-400">
                            <p className="font-bold text-purple-800 mb-1.5">Q. "최신 보스 다 풀리면 선발대는 뭐가 되나?"</p>
                            <p className="text-gray-800">A. "<span className="font-bold text-blue-600">최신 보스는 3~6개월 유예합니다.</span> M.T.C는 철저히 <span className="font-bold">후발 주자의 사다리</span> 역할을 수행합니다."</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border-l-4 border-green-400">
                            <p className="font-bold text-green-800 mb-1.5">Q. "이거 Pay to Win 아닌가요?"</p>
                            <p className="text-gray-800">A. "<span className="font-bold text-blue-600">실력은 돈으로 살 수 없습니다.</span> M.T.C는 '시간을 아껴주는 도구'일 뿐, <span className="font-bold">스펙이나 아이템을 판매하지 않습니다.</span>"</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                        <h5 className="font-bold text-blue-800 mb-1.5 text-sm">📊 지표 개선 (Metrics)</h5>
                        <ul className="text-xs space-y-0.5 text-gray-900">
                            <li>• 상위 콘텐츠 진입률 ↑</li>
                            <li>• 스펙업의 효능감 회복</li>
                            <li>• 유저 잔존율(Retention) ↑</li>
                        </ul>
                    </div>
                    <div className="bg-green-50 p-3 rounded-xl border border-green-200">
                        <h5 className="font-bold text-green-800 mb-1.5 text-sm">💰 매출 구조 (Revenue)</h5>
                        <ul className="text-xs space-y-0.5 text-gray-900">
                            <li>• 구독형 모델의 안정성</li>
                            <li>• 객단가 상승 (코디 결합)</li>
                            <li>• 신규 매출원 확보</li>
                        </ul>
                    </div>
                </div>
                <div className="bg-gray-900 text-white p-4 rounded-2xl flex flex-col justify-center items-center text-center shadow-lg">
                    <h3 className="text-base font-bold mb-1.5 flex items-center gap-2 text-yellow-300">💡 Conclusion</h3>
                    <p className="text-base text-gray-200 mb-3 font-medium">
                        M.T.C는 단순한 '연습 모드'가 아닌, <span className="font-bold text-yellow-300">'실력 성장의 가속기'</span>입니다.
                    </p>
                    <p className="text-xl leading-relaxed font-bold text-white">
                        "스펙은 준비되었는데 보스를 못 깨는 유저들에게,<br />
                        <span className="font-bold text-yellow-300">'아, 이제 될 것 같아'</span>라는 희망을 선물합니다."
                    </p>
                </div>
            </div>

            <button onClick={() => window.print()} className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all transform hover:-translate-y-1 z-50 print:hidden">
                <Printer size={20} />
                <span className="font-semibold">PDF로 저장</span>
            </button>
        </div>
    );
}
