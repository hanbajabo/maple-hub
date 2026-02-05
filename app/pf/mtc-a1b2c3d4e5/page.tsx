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
                        <p className="text-2xl font-medium text-gray-600">
                            '스펙과 실력의 간극'을 메우는 <span className="text-red-600 font-bold">실전 시뮬레이션 DLC</span>
                        </p>
                    </div>
                    <div className="w-[600px] mx-auto flex flex-col shadow-2xl rounded-2xl overflow-hidden mb-6">
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-7 text-white border-b-4 border-red-600 z-20 relative text-center">
                            <h2 className="text-3xl font-bold tracking-tight mb-3">Maple Tactical Training Center</h2>
                            <p className="text-gray-300 text-lg font-medium">High Spec, Low Skill 문제 해결을 위한 Premium Solution</p>
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
                            <p className="text-xs font-bold text-gray-400 mb-0.5 uppercase tracking-wider">Designed By</p>
                            <p className="text-2xl font-bold text-gray-900">이경준</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-gray-400 mb-0.5 uppercase tracking-wider">Date</p>
                            <p className="text-lg font-medium text-gray-700">2026. 02</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 1: 기획 배경 및 문제 정의 */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">기획 배경 및 문제 정의</h2>
                    <span className="text-gray-500 text-sm">01 / 07</span>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
                    <h3 className="text-xl font-bold text-red-900 mb-3">Core Problem Statement</h3>
                    <p className="text-lg text-red-800 leading-relaxed">"스펙은 충분한데 왜 못 깰까?<br />성장 시스템의 강화가 실력 상승으로 이어지지 않습니다."</p>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                        <h4 className="font-bold text-lg mb-3 text-orange-600">📈 High Spec</h4>
                        <p className="text-sm text-gray-800 mb-3"><strong>스펙 상향 평준화</strong></p>
                        <ul className="text-sm space-y-2 text-gray-700">
                            <li>• 제네시스 패스 등 완화 패치</li>
                            <li>• 무기/장비 획득 난이도 하락</li>
                            <li>• 충분한 데미지 확보</li>
                        </ul>
                    </div>
                    <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                        <h4 className="font-bold text-lg mb-3 text-red-600">📉 Low Skill</h4>
                        <p className="text-sm text-gray-800 mb-3"><strong>실력 부족 문제</strong></p>
                        <ul className="text-sm space-y-2 text-gray-700">
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
                            <p className="text-xs text-gray-700">이론적 이해</p>
                        </div>
                        <div className="text-center flex items-center justify-center">
                            <div className="text-6xl font-bold text-red-500">≠</div>
                        </div>
                        <div className="text-center">
                            <div className="bg-red-100 p-4 rounded-lg mb-2 border border-red-200">
                                <p className="text-3xl mb-1">🎮</p>
                                <p className="text-xs font-bold text-gray-900">실전 플레이</p>
                            </div>
                            <p className="text-xs text-gray-700">실제 대응력</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-red-300">
                        <p className="text-sm font-bold text-red-900 mb-2">현재 연습 모드의 한계</p>
                        <ul className="text-xs space-y-1.5 text-gray-700">
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
                    <span className="text-gray-500 text-sm">02 / 07</span>
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
                                <p className="text-xs text-gray-700">매 입장마다 보스 AI 연산</p>
                            </div>
                            <div className="bg-white p-2.5 rounded border-l-4 border-red-400">
                                <p className="font-bold text-red-600 mb-0.5">서버 부하 증가</p>
                                <p className="text-xs text-gray-700">동시 접속자↑ = 렉 발생</p>
                            </div>
                            <div className="bg-white p-2.5 rounded border-l-4 border-red-400">
                                <p className="font-bold text-red-600 mb-0.5">안정성 리스크</p>
                                <p className="text-xs text-gray-700">라이브 서버 영향</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-300">
                        <h4 className="font-bold text-lg mb-2 text-blue-900">✨ 팬텀 리플레이</h4>
                        <div className="space-y-2 text-sm">
                            <div className="bg-white p-2.5 rounded border-l-4 border-blue-400">
                                <p className="font-bold text-blue-600 mb-0.5">로그 재생 방식</p>
                                <p className="text-xs text-gray-700">AI 연산 제거</p>
                            </div>
                            <div className="bg-white p-2.5 rounded border-l-4 border-blue-400">
                                <p className="font-bold text-blue-600 mb-0.5">서버 부하 Zero</p>
                                <p className="text-xs text-gray-700">단순 데이터 스트리밍</p>
                            </div>
                            <div className="bg-white p-2.5 rounded border-l-4 border-blue-400">
                                <p className="font-bold text-blue-600 mb-0.5">100% 재현</p>
                                <p className="text-xs text-gray-700">실전과 동일한 경험</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-indigo-50 p-5 rounded-xl border-2 border-indigo-300 mb-5">
                    <h4 className="font-bold text-indigo-900 mb-3">⚙️ 작동 원리 (How It Works)</h4>
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 bg-white p-2.5 rounded-lg border-2 border-gray-300 text-center">
                            <p className="font-bold text-sm mb-1 text-gray-900">1️⃣ 로그 수집</p>
                            <p className="text-xs text-gray-700">실제 클리어 영상의<br />보스 행동 기록</p>
                        </div>
                        <span className="text-xl text-indigo-600">→</span>
                        <div className="flex-1 bg-white p-2.5 rounded-lg border-2 border-gray-300 text-center">
                            <p className="font-bold text-sm mb-1 text-gray-900">2️⃣ 데이터 변환</p>
                            <p className="text-xs text-gray-700">움직임/판정/이펙트<br />타임스탬프화</p>
                        </div>
                        <span className="text-xl text-indigo-600">→</span>
                        <div className="flex-1 bg-white p-2.5 rounded-lg border-2 border-gray-300 text-center">
                            <p className="font-bold text-sm mb-1 text-gray-900">3️⃣ 재생</p>
                            <p className="text-xs text-gray-700">AI 없이<br />로그만 스트리밍</p>
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
                    <span className="text-gray-500 text-sm">03 / 07</span>
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
                        <span className="text-gray-500 text-sm">04 / 07</span>
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
                                <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Target Boss</p>
                                <p className="font-bold text-white text-lg break-keep leading-snug">이지 칼로스, 카링 등</p>
                                <p className="text-xs text-gray-300 mt-1 break-keep font-medium opacity-80">최신 보스 및 신규 패턴 실험</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Key Features</p>
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
                            <h4 className="text-2xl font-bold text-gray-500 mb-1">Tier 4+</h4>
                            <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full font-bold">확장 가능성</span>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-center gap-2">
                            <p className="font-bold text-gray-800 text-base">"점진적으로 필요 할 때 마다 추가 가능성 열어둠"</p>
                            <p className="text-sm text-gray-600 leading-snug">기획 의도: 유저들이 일정 보스 이상 잡기를 원할 때마다<br />유동적으로 Tier를 확장하여 대응</p>
                        </div>
                        <div className="bg-gray-50 p-4 w-28 flex justify-center items-center text-center border-l border-dashed border-gray-300 shrink-0">
                            <p className="text-xs font-bold text-gray-500 break-keep leading-relaxed">"지속 가능한<br />서비스 확장"</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 5: BM 전략 */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">BM 전략 및 가격 정책</h2>
                    <span className="text-gray-500 text-sm">05 / 07</span>
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
                                <td className="p-2 text-gray-700">M.T.C 24시간 무제한 이용</td>
                                <td className="p-2 text-gray-700">단기 집중 연습</td>
                            </tr>
                            <tr className="border-b border-gray-200 bg-green-50">
                                <td className="p-2"><span className="px-2 py-1 bg-green-200 rounded text-green-900 font-bold">실속형</span></td>
                                <td className="p-2 font-bold text-gray-900">위클리 패스</td>
                                <td className="p-2 text-center"><span className="font-bold text-green-600">9,900원</span></td>
                                <td className="p-2 text-gray-700">7일 무제한 + 칭호 [전술 훈련생]</td>
                                <td className="p-2 text-gray-700">주말 보스 트라이</td>
                            </tr>
                            <tr className="border-b border-gray-200 bg-purple-50">
                                <td className="p-2"><span className="px-2 py-1 bg-purple-200 rounded text-purple-900 font-bold">구독형</span></td>
                                <td className="p-2 font-bold text-gray-900">월간 마스터</td>
                                <td className="p-2 text-center"><span className="font-bold text-purple-600">19,900원</span></td>
                                <td className="p-2 text-gray-700">30일 무제한 + 전용 코디 세트</td>
                                <td className="p-2 text-gray-700">전 보스 마스터</td>
                            </tr>
                            <tr className="bg-yellow-50">
                                <td className="p-2"><span className="px-2 py-1 bg-yellow-200 rounded text-yellow-900 font-bold">옵션</span></td>
                                <td className="p-2 font-bold text-gray-900">훈련 지원 상자</td>
                                <td className="p-2 text-center"><span className="font-bold text-yellow-600">5,000원</span></td>
                                <td className="p-2 text-gray-700">고효율 EXP 쿠폰 1,000장</td>
                                <td className="p-2 text-gray-700">패스 구매자만</td>
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
                            <p className="text-xs text-gray-700">진입장벽↓</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-white p-3 rounded-lg border border-green-200 mb-2">
                                <p className="text-2xl font-bold text-green-600">35%</p>
                            </div>
                            <p className="font-bold text-gray-900">실속형 (위클리)</p>
                            <p className="text-xs text-gray-700">주력 상품</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-white p-3 rounded-lg border border-purple-200 mb-2">
                                <p className="text-2xl font-bold text-purple-600">25%</p>
                            </div>
                            <p className="font-bold text-gray-900">구독형 (월간)</p>
                            <p className="text-xs text-gray-700">헤비 유저</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 6: 운영 전략 */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-3 mb-4 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">운영 및 업데이트 전략</h2>
                    <span className="text-gray-500 text-sm">06 / 07</span>
                </div>
                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-3.5 rounded-r mb-4">
                    <h3 className="text-xl font-bold text-indigo-900 mb-1">📈 전략 핵심</h3>
                    <p className="text-sm text-indigo-800">"데이터에 기반하여, 유저들이 가장 고통받는 구간부터 순차적으로 개방합니다."</p>
                </div>
                {/* 순차적 업데이트 */}
                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-300 mb-4">
                    <h4 className="font-bold text-lg text-blue-900 mb-3">🎯 순차적 업데이트 (Staged Release)</h4>
                    <div className="bg-white p-3 rounded-lg mb-3 border border-blue-200">
                        <p className="font-bold text-sm text-blue-800 mb-1.5">Phase 1: 초기 오픈 (통곡의 벽 3종)</p>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-red-50 p-2 rounded text-center border border-red-200">
                                <p className="text-xs font-bold text-red-800">하드 진 힐라</p>
                            </div>
                            <div className="bg-red-50 p-2 rounded text-center border border-red-200">
                                <p className="text-xs font-bold text-red-800">하드 세렌</p>
                            </div>
                            <div className="bg-red-50 p-2 rounded text-center border border-red-200">
                                <p className="text-xs font-bold text-red-800">카오스 칼로스</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1.5 text-sm">
                        <div className="flex items-start gap-2">
                            <span className="font-bold text-blue-600">•</span>
                            <p className="text-gray-800"><strong>확장 계획:</strong> 클리어율 저조 또는 트라이 수요 폭발 시점에 상위 보스 추가</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="font-bold text-blue-600">•</span>
                            <p className="text-gray-800"><strong>효과:</strong> 콘텐츠 소모 속도 조절 및 기대감(Hype) 유지</p>
                        </div>
                    </div>
                </div>
                {/* 최신 보스 유예 정책 */}
                <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-300 mb-4">
                    <h4 className="font-bold text-lg text-yellow-900 mb-3">🔒 최신 보스 유예 정책 (Spoiler Protection)</h4>
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg mb-2.5 border border-yellow-200">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-center flex-1">
                                <p className="text-sm font-bold text-gray-900 mb-1">신규 보스 출시</p>
                                <div className="inline-block bg-red-500 text-white font-black text-2xl px-4 py-2 rounded-lg border-2 border-red-600">
                                    NEW
                                </div>
                            </div>
                            <div className="text-2xl text-yellow-600">→</div>
                            <div className="text-center flex-1">
                                <p className="text-sm font-bold text-gray-900 mb-1">3~6개월 유예</p>
                                <div className="inline-block bg-orange-200 rounded-full p-2 border-2 border-orange-400">
                                    <div className="text-3xl">⏳</div>
                                </div>
                            </div>
                            <div className="text-2xl text-yellow-600">→</div>
                            <div className="text-center flex-1">
                                <p className="text-sm font-bold text-gray-900 mb-1">M.T.C 도입</p>
                                <div className="inline-block bg-green-200 rounded-full p-2 border-2 border-green-400">
                                    <div className="text-3xl">✅</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-100 p-2.5 rounded border-l-4 border-green-500">
                        <p className="text-xs font-bold text-green-900">✨ 선발대의 성취감 보존 + 후발 주자의 사다리 역할</p>
                    </div>
                </div>
                {/* 무료 로테이션 */}
                <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-300">
                    <h4 className="font-bold text-lg text-purple-900 mb-3">🎁 주간 무료 로테이션 전략</h4>
                    <div className="bg-white p-3 rounded-lg mb-2.5 border border-purple-200">
                        <p className="font-bold text-sm text-purple-800 mb-1.5">🔄 매주 1종 보스 무료 개방</p>
                        <p className="text-xs text-gray-700 mb-2">트라이 수요가 높은 구간을 선정하여 모든 유저에게 체험 기회 제공</p>
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-2.5 rounded">
                            <p className="text-xs font-bold text-purple-900 mb-0.5">예시: 2월 1주차</p>
                            <p className="text-sm text-purple-800">📍 금주의 무료 보스: <span className="font-bold">하드 진 힐라</span></p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                        <div className="bg-white p-2.5 rounded border border-purple-200">
                            <p className="font-bold text-purple-700 mb-0.5">✅ 체험 마케팅</p>
                            <p className="text-gray-700">유료 결제 전 효능감 확인</p>
                        </div>
                        <div className="bg-white p-2.5 rounded border border-purple-200">
                            <p className="font-bold text-purple-700 mb-0.5">✅ 커뮤니티 활성화</p>
                            <p className="text-gray-700">해당 주간 파티 모집↑</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 7: 기대 효과 */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-3 mb-4 flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-bold text-black">기대 효과 및 리스크 관리</h2>
                        <p className="text-xs text-gray-500 mt-1">* 본 수치는 기획 의도에 따른 가설(Hypothesis) 및 목표치입니다.</p>
                    </div>
                    <span className="text-gray-500 text-sm">07 / 07</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2.5 bg-blue-50 rounded-xl border-2 border-blue-300">
                        <p className="text-4xl font-bold text-blue-600 mb-1">↑25%</p>
                        <p className="font-bold text-gray-900 mb-0.5 text-sm">Clear Rate</p>
                        <p className="text-xs text-gray-600">보스 클리어율 증가 <span className="font-bold text-blue-600">(목표)</span></p>
                    </div>
                    <div className="text-center p-2.5 bg-green-50 rounded-xl border-2 border-green-300">
                        <p className="text-4xl font-bold text-green-600 mb-1">+40%</p>
                        <p className="font-bold text-gray-900 mb-0.5 text-sm">Training Hours</p>
                        <p className="text-xs text-gray-600">평균 훈련 시간 <span className="font-bold text-green-600">(예상)</span></p>
                    </div>
                    <div className="text-center p-2.5 bg-purple-50 rounded-xl border-2 border-purple-300">
                        <p className="text-4xl font-bold text-purple-600 mb-1">↑30%</p>
                        <p className="font-bold text-gray-900 mb-0.5 text-sm">Revenue</p>
                        <p className="text-xs text-gray-600">구독형 매출 증대 <span className="font-bold text-purple-600">(가설)</span></p>
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
                    <p className="text-sm text-gray-300 mb-1.5 opacity-80">
                        M.T.C는 단순한 '연습 모드'가 아닌, <span className="font-bold text-yellow-300">'실력 성장의 가속기'</span>입니다.
                    </p>
                    <p className="text-base leading-relaxed font-light opacity-90">
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
