'use client';

import React, { useEffect } from 'react';
import {
    Printer, Target, TrendingUp, Zap, Award, Calculator,
    Navigation, Eye, CheckCircle2, XCircle, Sparkles, AlertTriangle
} from 'lucide-react';

export default function MatrixPathfinderPortfolio() {
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
                    @page { size: A4 portrait; margin: 0; }
                    body { background: white; margin: 0; padding: 0; }
                    .a4-page { 
                        margin: 0; 
                        box-shadow: none; 
                        page-break-after: always; 
                        padding: 15mm !important;
                    }
                    .no-print { display: none !important; }
                }
            `}</style>

            {/* COVER */}
            <div className="a4-page flex flex-col justify-between bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('/images/matrix-bg.png')] bg-cover"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/20 via-transparent to-teal-200/20"></div>

                <div className="relative z-10 pt-10 pl-8">
                    <p className="text-emerald-600 font-bold tracking-[0.2em] mb-3 uppercase text-xs">System Design Proposal</p>
                    <h1 className="text-6xl font-extrabold leading-tight mb-4">
                        <span className="text-gray-900">MATRIX</span><br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">PATHFINDER</span>
                    </h1>
                    <div className="h-1 w-28 bg-emerald-500 mb-4"></div>
                    <p className="text-lg text-gray-700 leading-relaxed font-medium">
                        전투 효율(Battle Efficiency) 지표를 활용한<br />
                        직관적 스펙업 내비게이션
                    </p>
                </div>

                <div className="relative z-10 flex-1 flex items-center justify-center px-8 py-4">
                    <div className="w-full max-w-3xl">
                        <img
                            src="/images/pf/hexa-matrix-pathfinder.png"
                            alt="HEXA Matrix Pathfinder - Battle Efficiency Tooltip"
                            className="w-full h-auto rounded-xl shadow-2xl border-4 border-emerald-300/50"
                        />
                    </div>
                </div>

                <div className="relative z-10 p-8 border-t-2 border-emerald-200 flex justify-between items-end bg-white/60 backdrop-blur-sm">
                    <div>
                        <p className="text-emerald-600 text-sm font-bold">Game Planner</p>
                        <p className="font-bold text-gray-900 text-lg">이경준</p>
                        <p className="text-gray-600 text-xs mt-1">UX Innovation · Data-Driven Design</p>
                    </div>
                    <div className="text-right">
                        <p className="text-emerald-600 text-sm font-bold">Version</p>
                        <p className="font-bold text-gray-900 text-lg">2026.02.07</p>
                        <p className="text-gray-600 text-xs mt-1">Initial Proposal</p>
                    </div>
                </div>
            </div>

            {/* PAGE 1: Background */}
            <div className="a4-page">
                <div className="border-b-4 border-emerald-600 pb-2 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">1. 기획 배경</h2>
                    <span className="text-gray-500 font-bold">01 / 06</span>
                </div>

                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <AlertTriangle className="text-red-600" /> 문제 정의 (Pain Points)
                    </h3>
                    <p className="text-lg text-center italic text-gray-900 mb-6 bg-gray-50 p-4 rounded-lg border-l-4 border-red-500 font-medium">
                        "내가 얼마나 강해지는지 알려면<br />왜 게임 밖으로 나가야 할까?"
                    </p>

                    <div className="space-y-4">
                        <div className="bg-white border-l-4 border-red-500 p-5 shadow-sm rounded-r-lg">
                            <div className="flex items-start gap-3 mb-2">
                                <XCircle className="text-red-500 mt-1 shrink-0" size={20} />
                                <h4 className="font-bold text-lg text-gray-900">지표의 사각지대 (Invisible Growth)</h4>
                            </div>
                            <p className="text-sm text-gray-900 leading-relaxed pl-8">
                                현재 <span className="font-bold">'전투력'</span> 시스템은 장비/기본 스탯 중심이라,
                                <span className="font-bold text-red-600"> V/HEXA 코어 강화(스킬 퍼뎀 상승)</span>가 실질 화력에 기여하는 바를 <span className="font-bold">반영하지 못함</span>.
                            </p>
                        </div>

                        <div className="bg-white border-l-4 border-orange-500 p-5 shadow-sm rounded-r-lg">
                            <div className="flex items-start gap-3 mb-2">
                                <AlertTriangle className="text-orange-500 mt-1 shrink-0" size={20} />
                                <h4 className="font-bold text-lg text-gray-900">외부 의존성 심화 (External Dependency)</h4>
                            </div>
                            <p className="text-sm text-gray-900 leading-relaxed pl-8">
                                유저들은 강화 효율을 판단하기 위해 <span className="font-bold">'환산 주스탯', '엑셀 계산기'</span> 등
                                외부 도구에 의존하며, 이는 <span className="font-bold text-orange-600">게임 몰입도를 저해</span>함.
                            </p>
                        </div>

                        <div className="bg-white border-l-4 border-yellow-500 p-5 shadow-sm rounded-r-lg">
                            <div className="flex items-start gap-3 mb-2">
                                <TrendingUp className="text-yellow-600 mt-1 shrink-0 rotate-180" size={20} />
                                <h4 className="font-bold text-lg text-gray-900">성장 체감 부족 (Low Satisfaction)</h4>
                            </div>
                            <p className="text-sm text-gray-900 leading-relaxed pl-8">
                                강화 결과를 예측할 수 없어 재화 소모에 대한 <span className="font-bold text-yellow-700">심리적 부담이 크고</span>,
                                즉각적인 <span className="font-bold">성장의 재미가 반감</span>됨.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-emerald-50 border-2 border-emerald-200 p-6 rounded-xl">
                    <h4 className="font-bold text-emerald-900 text-lg mb-3 flex items-center gap-2">
                        <Target className="text-emerald-600" /> 핵심 과제 (Core Challenge)
                    </h4>
                    <p className="text-gray-900 text-center text-lg font-medium leading-relaxed">
                        유저가 <span className="bg-emerald-200 px-2 py-0.5 rounded font-bold">게임 내에서</span>
                        스펙업의 <span className="font-bold text-emerald-700">실질적 효율</span>을
                        <span className="bg-emerald-200 px-2 py-0.5 rounded font-bold">즉시 확인</span>하고
                        <span className="font-bold text-emerald-700"> 능동적으로 판단</span>할 수 있도록 지원
                    </p>
                </div>
            </div>

            {/* PAGE 2: Solution */}
            <div className="a4-page">
                <div className="border-b-4 border-emerald-600 pb-2 mb-4 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">2. 핵심 솔루션</h2>
                    <span className="text-gray-500 font-bold">02 / 06</span>
                </div>

                <div className="mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Zap className="text-emerald-600" /> 전투 효율 (Battle Efficiency)
                    </h3>

                    <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-5 rounded-xl mb-4">
                        <div className="border-b border-white/20 pb-2 mb-3">
                            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Definition</span>
                            <h4 className="text-xl font-bold mt-1">전투 효율이란?</h4>
                        </div>
                        <p className="leading-relaxed text-gray-100">
                            개발사가 보유한 <span className="font-bold text-emerald-300">'직업별 표준 딜사이클(Standard Cycle)'</span>에
                            유저의 <span className="font-bold text-emerald-300">'현재 스펙'</span>을 대입하여 산출한<br />
                            <span className="text-xl font-bold text-white">강화 전·후의 예상 실전 데미지 변화율(%)</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 text-center">
                            <div className="text-blue-600 font-bold text-base mb-2">Non-Absolute</div>
                            <p className="text-sm text-gray-700 leading-relaxed">전투력처럼 절대적 점수로<br />줄 세우지 않음</p>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 text-center">
                            <div className="text-gray-600 font-bold text-base mb-2">Neutral</div>
                            <p className="text-sm text-gray-700 leading-relaxed">S-Tier, 추천 순위 등<br />판단 강요 배제</p>
                        </div>
                        <div className="bg-emerald-50 p-5 rounded-lg border border-emerald-200 text-center">
                            <div className="text-emerald-600 font-bold text-base mb-2">Active</div>
                            <p className="text-sm text-gray-700 leading-relaxed">오직 변화량(%)만 제공<br />능동적 선택 유도</p>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Calculator className="text-emerald-600" /> 작동 메커니즘 (Mechanism)
                    </h3>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 bg-white border-2 border-gray-200 p-6 rounded-lg text-center relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-full font-bold">STEP 1</div>
                            <Eye className="mx-auto text-gray-400 mb-3" size={40} />
                            <div className="font-bold text-gray-900 mb-2 text-base">Hover</div>
                            <p className="text-sm text-gray-700 leading-relaxed">HEXA 코어에<br />마우스 오버</p>
                        </div>

                        <div className="text-emerald-600 font-bold text-3xl">→</div>

                        <div className="flex-1 bg-white border-2 border-emerald-200 p-6 rounded-lg text-center relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-bold">STEP 2</div>
                            <Calculator className="mx-auto text-emerald-600 mb-3" size={40} />
                            <div className="font-bold text-gray-900 mb-2 text-base">Calculate</div>
                            <p className="text-sm text-gray-700 leading-relaxed">표준 DPM<br />변화량 연산</p>
                        </div>

                        <div className="text-emerald-600 font-bold text-3xl">→</div>

                        <div className="flex-1 bg-white border-2 border-blue-200 p-6 rounded-lg text-center relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold">STEP 3</div>
                            <Sparkles className="mx-auto text-blue-600 mb-3" size={40} />
                            <div className="font-bold text-gray-900 mb-2 text-base">Display</div>
                            <p className="text-sm text-gray-700 leading-relaxed">툴팁에<br />즉시 표시</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-xl text-center">
                    <div className="text-4xl font-bold mb-2">🔥 전투 효율 +2.1% ▲</div>
                    <p className="text-sm text-emerald-100">(표준 사이클 기준)</p>
                </div>
            </div>

            {/* PAGE 3: UI/UX */}
            <div className="a4-page">
                <div className="border-b-4 border-emerald-600 pb-2 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">3. UI/UX 설계</h2>
                    <span className="text-gray-500 font-bold">03 / 06</span>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">마우스 오버 툴팁 (Hover Tooltip)</h3>
                    <p className="text-sm text-gray-900 mb-2">기존 코어 정보 툴팁 우측에 <span className="font-bold text-emerald-600">[패스파인더 패널]</span>이 심플하게 확장됩니다.</p>
                    <p className="text-xs text-gray-500 mb-4 italic">※ 아래 사진은 UI/UX 디자인 예시</p>

                    <div className="rounded-xl overflow-hidden border-4 border-emerald-500/30 shadow-2xl">
                        <img
                            src="/images/pf/hexa-matrix-pathfinder.png"
                            alt="HEXA Matrix Battle Efficiency Tooltip"
                            className="w-full h-auto"
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Target className="text-emerald-600" size={20} /> 유저 사용 시나리오
                    </h3>

                    <div className="space-y-2">
                        <div className="flex items-start gap-2 bg-white p-3 rounded-lg border-l-4 border-blue-500">
                            <div className="bg-blue-100 text-blue-700 font-bold text-xs px-2 py-1 rounded shrink-0">1</div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-900"><span className="font-bold">오리진 스킬</span>에 마우스 오버 → "전투 효율 +0.8%"</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2 bg-white p-3 rounded-lg border-l-4 border-emerald-500">
                            <div className="bg-emerald-100 text-emerald-700 font-bold text-xs px-2 py-1 rounded shrink-0">2</div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-900"><span className="font-bold">마스터리 코어</span>에 마우스 오버 → "전투 효율 +2.1%"</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2 bg-white p-3 rounded-lg border-l-4 border-purple-500">
                            <div className="bg-purple-100 text-purple-700 font-bold text-xs px-2 py-1 rounded shrink-0">3</div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-900"><span className="font-bold text-purple-600">유저 판단:</span> "재화 소모량은 비슷한데 효율은 3배네?" → <span className="text-emerald-600 font-bold">마스터리 코어 먼저 올리자! ✓</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 bg-emerald-50 border-2 border-emerald-200 p-2 rounded-lg flex items-center justify-center gap-2">
                    <CheckCircle2 className="text-emerald-600" size={20} />
                    <p className="font-bold text-emerald-900 text-sm">외부 계산기 없이, 게임 안에서 즉시 최적화 완료.</p>
                </div>
            </div>

            {/* PAGE 4: Impact - UX */}
            <div className="a4-page">
                <div className="border-b-4 border-emerald-600 pb-2 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">4. 기대 효과 (1) - UX</h2>
                    <span className="text-gray-500 font-bold">04 / 06</span>
                </div>

                <div className="space-y-6">
                    <div className="bg-white border-2 border-blue-200 p-6 rounded-xl shadow-sm">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <TrendingUp className="text-blue-600" size={28} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-blue-900 mb-2">비교의 재미 (Min-Maxing)</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    유저가 직접 여러 코어를 비교하며 <span className="font-bold text-blue-700">"가장 효율적인 선택"</span>을 찾는
                                    <span className="font-bold text-gray-900"> RPG 본연의 공략 재미 회복</span>.
                                </p>
                            </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-blue-800 italic">
                                "내가 선택한 강화 경로가 실제로 얼마나 효율적인지 직접 확인하는 성취감"
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-emerald-200 p-6 rounded-xl shadow-sm">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-emerald-100 p-3 rounded-lg">
                                <CheckCircle2 className="text-emerald-600" size={28} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-emerald-900 mb-2">불확실성 해소</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    강화 실패나 비효율적 선택에 대한 불안감을
                                    <span className="font-bold text-emerald-700"> '명확한 수치'</span>로 해소.
                                </p>
                            </div>
                        </div>
                        <div className="bg-emerald-50 p-5 rounded-lg">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="border-r border-emerald-200">
                                    <div className="font-extrabold text-red-600 mb-2 text-xl">Before ❌</div>
                                    <p className="text-gray-900 text-lg font-bold leading-relaxed">
                                        "이거 올려도 될까...?"<br />
                                        <span className="text-red-600">→ 불안감</span>
                                    </p>
                                </div>
                                <div>
                                    <div className="font-extrabold text-emerald-600 mb-2 text-xl">After ✓</div>
                                    <p className="text-gray-900 text-lg font-bold leading-relaxed">
                                        "+2.1% 오르네!"<br />
                                        <span className="text-emerald-600">→ 확신</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-purple-200 p-6 rounded-xl shadow-sm">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <Sparkles className="text-purple-600" size={28} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-purple-900 mb-2">즉각적 성장 체감</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    재화 투자 직후 <span className="font-bold text-purple-700">실시간으로 변화량을 확인</span>하며
                                    성장의 재미를 극대화.
                                </p>
                            </div>
                        </div>
                        <div className="bg-purple-50 p-5 rounded-lg border border-purple-100">
                            <p className="text-xl text-purple-900 font-extrabold text-center leading-relaxed">
                                "강화 버튼 클릭 → 즉시 <span className="text-purple-600 font-black">+2.1%</span> 확인 → <span className="text-pink-600">도파민 분비 🎉</span>"
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-auto bg-gray-100 p-5 rounded-xl border border-gray-200 text-center">
                    <p className="text-gray-800 font-bold text-lg">
                        유저 경험의 핵심: <span className="text-emerald-600">"게임 안에서 모든 것을 해결"</span>
                    </p>
                </div>
            </div>

            {/* PAGE 5: Impact - Business */}
            <div className="a4-page">
                <div className="border-b-4 border-emerald-600 pb-2 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">4. 기대 효과 (2) - BM</h2>
                    <span className="text-gray-500 font-bold">05 / 06</span>
                </div>

                <div className="space-y-12">
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 p-10 rounded-xl shadow-sm">
                        <div className="flex items-start gap-6 mb-4">
                            <div className="bg-amber-100 p-4 rounded-lg">
                                <Target className="text-amber-600" size={32} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-amber-900 mb-3">구체적인 목표 제시</h3>
                                <p className="text-gray-900 text-lg leading-relaxed">
                                    <span className="font-bold text-amber-700">"이 스킬이 전투 효율 +1%가 더 오르는구나?"</span>라는<br />
                                    명확한 기준점 제공.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 p-10 rounded-xl shadow-sm">
                        <div className="flex items-start gap-6 mb-4">
                            <div className="bg-emerald-100 p-4 rounded-lg">
                                <Award className="text-emerald-600" size={32} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-emerald-900 mb-3">구매 동기 강화 (자연스러운 유도)</h3>
                                <p className="text-gray-900 text-lg leading-relaxed mb-3">
                                    스펙을 직접 파는 것이 아니라, <span className="font-bold text-emerald-700">정보 제공</span>을 통해<br />
                                    재화 패키지 구매를 자연스럽게 유도.
                                </p>
                                <p className="text-sm text-emerald-600 font-bold">(솔 에르다 / 솔 에르다 조각을 주는 패스 같은 BM)</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-blue-200 p-10 rounded-xl shadow-sm">
                        <div className="flex items-start gap-6">
                            <div className="bg-blue-100 p-4 rounded-lg">
                                <Calculator className="text-blue-600" size={32} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-blue-900 mb-3">데이터 기반 의사결정 지원</h3>
                                <p className="text-gray-900 text-lg leading-relaxed">
                                    유저가 <span className="font-bold text-blue-700">투자 대비 효율</span>을 명확히 인지하고<br />
                                    합리적인 구매를 결정할 수 있도록 지원.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-xl text-center">
                    <p className="text-xl font-bold mb-1">비즈니스 핵심 가치</p>
                    <p className="text-emerald-100 text-sm">투명성 제공 → 신뢰 구축 → 자발적 구매 증대</p>
                </div>
            </div>

            {/* PAGE 6: Conclusion */}
            <div className="a4-page">
                <div className="border-b-4 border-emerald-600 pb-2 mb-8 flex justify-between items-end">
                    <h2 className="text-3xl font-extrabold text-gray-900">5. 결론 및 제언</h2>
                    <span className="text-gray-500 font-bold">06 / 06</span>
                </div>

                <div className="space-y-6 mb-8">
                    <div className="bg-white border-2 border-gray-200 p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">핵심 요약</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="bg-emerald-100 text-emerald-700 font-bold text-sm px-2 py-1 rounded shrink-0">1</div>
                                <p className="text-gray-700"><span className="font-bold text-emerald-600">전투 효율</span> 지표를 통해 유저가 게임 내에서 스펙업 효율을 즉시 확인</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-emerald-100 text-emerald-700 font-bold text-sm px-2 py-1 rounded shrink-0">2</div>
                                <p className="text-gray-700">외부 도구 의존도 감소 → <span className="font-bold text-gray-900">게임 몰입도 향상</span></p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-emerald-100 text-emerald-700 font-bold text-sm px-2 py-1 rounded shrink-0">3</div>
                                <p className="text-gray-700">명확한 성장 체감 → <span className="font-bold text-gray-900">유저 만족도 증대</span></p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-emerald-100 text-emerald-700 font-bold text-sm px-2 py-1 rounded shrink-0">4</div>
                                <p className="text-gray-700">투명한 정보 제공 → <span className="font-bold text-gray-900">자발적 구매 증가</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-emerald-50 border-2 border-emerald-200 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-emerald-900 mb-4">확장 가능성</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg border border-emerald-100">
                                <div className="font-bold text-emerald-700 text-sm mb-1">Phase 1</div>
                                <p className="text-sm text-gray-900 font-medium">HEXA 매트릭스 코어 강화</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-emerald-100">
                                <div className="font-bold text-emerald-700 text-sm mb-1">Phase 2</div>
                                <p className="text-sm text-gray-900 font-medium">장비 강화 (스타포스 등)</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-emerald-100">
                                <div className="font-bold text-emerald-700 text-sm mb-1">Phase 3</div>
                                <p className="text-sm text-gray-900 font-medium">유니온 배치 최적화</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-emerald-100">
                                <div className="font-bold text-emerald-700 text-sm mb-1">Phase 4</div>
                                <p className="text-sm text-gray-900 font-medium">어빌리티/링크 추천</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-1">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 rounded-xl text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-teal-500/20"></div>
                        <div className="relative z-10">
                            <Navigation className="mx-auto mb-3 text-emerald-400" size={40} />
                            <h2 className="text-2xl font-extrabold mb-2">Matrix Pathfinder</h2>
                            <div className="w-16 h-1 bg-emerald-500 mx-auto mb-4"></div>
                            <p className="text-base text-gray-300 italic mb-1">
                                "Navigate Your Growth, Maximize Your Power"
                            </p>
                            <p className="text-xs text-gray-400">
                                유저의 성장 여정을 안내하고, 최대 효율을 실현합니다
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 text-center text-xs text-gray-500">
                        <p>작성자: 이경준 | 작성일: 2026.02.07</p>
                        <p className="mt-0.5">Matrix Pathfinder Proposal v1.0</p>
                    </div>
                </div>
            </div>

            {/* Print Button */}
            <button
                onClick={() => window.print()}
                className="fixed bottom-8 right-8 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all transform hover:-translate-y-1 z-50 print:hidden no-print"
            >
                <Printer size={20} />
                <span className="font-semibold">PDF로 저장</span>
            </button>
        </div >
    );
}
