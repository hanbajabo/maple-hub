'use client';

import React, { useEffect } from 'react';
import { TrendingDown, AlertTriangle, Shield, Lightbulb, BarChart3, Printer } from 'lucide-react';

export default function CommunityPortfolioPage() {
    // 구글 광고 완전 차단 (Auto Ads 포함)
    useEffect(() => {
        const removeAds = () => {
            // 모든 구글 광고 관련 요소 찾기 및 제거
            const adSelectors = [
                '.adsbygoogle',
                '.google-auto-placed',
                'iframe[id^="google_ads_iframe"]',
                'div[id^="google_ads_iframe"]',
                'ins.adsbygoogle',
                '[data-ad-client]',
                '[data-google-query-id]'
            ];

            adSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.remove();
                });
            });
        };

        // 초기 실행
        removeAds();

        // 1초마다 체크 (Auto Ads가 동적으로 삽입되는 경우 대비)
        const interval = setInterval(removeAds, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="portfolio-viewer bg-gray-100 min-h-screen py-8 print:py-0 print:bg-white">
            {/* 인쇄 및 A4 미리보기 스타일 */}
            <style jsx global>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
        
        /* 포트폴리오 페이지 전용 스타일: 사이트 공통 네비게이션 숨김 */
        nav, header {
            display: none !important;
        }

        body {
            background-color: #f3f4f6;
        }

        .portfolio-viewer {
            font-family: 'Pretendard', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
        }

        /* A4 용지 규격 박스 (화면용 - PC) */
        .a4-page {
            width: 210mm;
            height: 297mm;
            background: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: 15mm;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            position: relative;
        }

        /* 모바일 최적화 (화면 폭 768px 이하) */
        @media screen and (max-width: 768px) {
            .portfolio-viewer {
                gap: 1rem;
                padding: 1rem;
                background-color: #f3f4f6;
            }

            .a4-page {
                width: 100% !important;
                height: auto !important;
                min-height: auto !important;
                padding: 20px !important;
                margin-bottom: 20px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                overflow: visible !important;
            }

            /* 모바일에서 폰트 및 요소 크기 조정 */
            h1 { font-size: 1.75rem !important; }
            h2 { font-size: 1.5rem !important; }
            h3 { font-size: 1.25rem !important; }
            
            /* 인쇄 고정 버튼 모바일 위치 조정 */
            .fixed-print-btn {
                bottom: 20px !important;
                right: 20px !important;
                padding: 10px 20px !important;
            }
        }

        /* 인쇄 시 적용 스타일 */
        @media print {
            @page {
                size: A4 portrait;
                margin: 0;
            }
            
            body {
                background: white !important;
                margin: 0 !important;
                padding: 0 !important;
            }

            .portfolio-viewer {
                display: block !important;
                background: white !important;
                padding: 0 !important;
                gap: 0 !important;
            }

            .a4-page {
                box-shadow: none !important;
                margin: 0 !important;
                page-break-after: always !important;
                break-after: page !important;
                height: 297mm !important;
                width: 210mm !important;
                padding: 15mm !important;
            }

            .no-print, button {
                display: none !important;
            }
            
            /* 구글 광고 강제 숨김 */
            .adsbygoogle, 
            .google-auto-placed, 
            iframe[id^="google_ads_iframe"],
             div[id^="google_ads_iframe"] {
                display: none !important;
                height: 0 !important;
                width: 0 !important;
                overflow: hidden !important;
                visibility: hidden !important;
                pointer-events: none !important;
            }

            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
        }
      `}</style>

            {/* ==================== PAGE 1: COVER ==================== */}
            <div className="a4-page items-center text-center">
                <div className="w-full flex-1 flex flex-col pt-8">
                    <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">
                        Live Service Analysis Report
                    </p>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight break-keep">
                        메이플스토리<br />
                        라이브 서비스 업데이트<br />
                        역분석 및 제언
                    </h1>
                    <p className="text-xl font-medium text-gray-600 leading-relaxed mb-4">
                        최근 2개년 패치 흐름과 인게임 경제 밸런싱을 중심으로
                    </p>
                    <p className="text-base text-gray-500 italic mb-16">
                        — Live Service Risk & UX Perspective
                    </p>

                    <div className="w-full max-w-lg mx-auto rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 p-12">
                        <div className="text-6xl mb-4">🍁</div>
                        <p className="text-2xl font-bold text-gray-800">MapleStory</p>
                        <p className="text-sm text-gray-600 mt-2">Live Service Analysis</p>
                    </div>
                </div>

                <div className="w-full text-left border-t border-gray-200 pt-8 mt-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">About Me</h3>
                            <p className="text-sm text-gray-700 leading-relaxed mb-4 text-justify">
                                저는 <strong>"데이터 기반의 명확한 근거로 논리적인 시스템을 설계하는 기획자"</strong>입니다.
                                단순히 문서를 작성하는 것을 넘어, AI 기술을 활용해 직접 프로토타입을 구현하고 검증하며,
                                개발팀과 가장 효율적인 언어로 소통합니다. 데이터에 기반한 의사결정과 논리적인 구조 설계를 통해
                                유저에게 최상의 경험을 제공하는 것을 목표로 합니다.
                            </p>
                            <p className="text-sm font-bold text-gray-900">p6092@naver.com</p>
                            <p className="text-sm font-medium text-gray-500 mt-1">작성일: 2026.01</p>
                        </div>

                        <div className="flex flex-col items-center w-full md:w-auto">
                            <img
                                src="/qr_maple_site.png"
                                alt="Portfolio QR"
                                className="w-24 h-24 border border-gray-200 rounded p-1 bg-white mb-2"
                            />
                            <p className="text-xs font-semibold text-blue-600">Actual System</p>
                            <a href="https://maple.ai.kr" target="_blank" className="text-xs text-gray-500 underline">maple.ai.kr</a>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 mt-6">
                        <p className="text-xs text-gray-500 leading-tight">
                            <strong className="text-gray-700">※ 디스클레이머:</strong> 본 문서는 외부 데이터(NEXON Open API)와 공개된 패치 정보를 기반으로 개인 기획자가 분석·재구성한 기획 제언 자료입니다. 회사 내부 정보는 포함되지 않았습니다.
                        </p>
                    </div>
                </div>
            </div>


            {/* ==================== EXECUTIVE SUMMARY ==================== */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">Executive Summary</h2>
                    <span className="text-gray-500 text-sm">00 / 07</span>
                </div>

                {/* Who I am */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-400 rounded-xl p-5 mb-5">
                    <h3 className="text-xl font-bold text-blue-900 mb-3 text-center">Who I am</h3>
                    <p className="text-base text-black text-center leading-relaxed">
                        <strong className="text-blue-700">9년 메이플 유저 분석</strong> + <strong className="text-blue-700">AI 기반 실 서비스 개발 경험</strong>을 가진<br />
                        메이플스토리 라이브 서비스 기획자 <strong className="text-blue-900">이경준</strong>
                    </p>
                </div>

                {/* Key Strengths */}
                <div className="mb-5">
                    <h3 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
                        <span className="text-2xl">💎</span>
                        Key Strengths
                    </h3>
                    <div className="space-y-3">
                        <div className="bg-white border-l-4 border-purple-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-bold text-purple-700 mb-1">Insight</h4>
                            <p className="text-sm text-black">채널 '한자' 9년 운영으로 <strong>업데이트 의도·유저 피로도·경제 흐름 실시간 분석</strong></p>
                        </div>
                        <div className="bg-white border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-bold text-green-700 mb-1">Implementation</h4>
                            <p className="text-sm text-black"><strong>maple.ai.kr</strong> (Next.js + NEXON Open API) 실시간 성장 진단 & 경제 모니터링 시스템 직접 개발·서비스 중</p>
                        </div>
                        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-bold text-blue-700 mb-1">Logic</h4>
                            <p className="text-sm text-black">데이터 기반 Gap Analysis → <strong>UX Bridge & Nudge 전략</strong> → 운영 리스크까지 고려한 제언</p>
                        </div>
                    </div>
                </div>

                {/* Featured Projects */}
                <div className="mb-5">
                    <h3 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
                        <span className="text-2xl">📁</span>
                        Featured Projects
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-300 rounded-lg p-4">
                            <h4 className="font-bold text-orange-800 mb-2">📊 라이브 서비스 역분석 제언서</h4>
                            <p className="text-sm text-black">2024~2025 업데이트 역기획 + Lv.280~285 성장 병목 해소 전략 (로아 슈모익 벤치마킹 포함)</p>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-300 rounded-lg p-4">
                            <h4 className="font-bold text-green-800 mb-2">🤖 메이플 AI 진단 시스템 기획서</h4>
                            <p className="text-sm text-black">NEXON API 활용 실시간 전투력/보스/사냥 진단 + 경제 괴리율 모니터링 (운영 안정성 로직 포함)</p>
                        </div>
                    </div>
                </div>

                {/* Value Proposition */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-5 text-center">
                    <p className="text-lg font-bold leading-relaxed">
                        데이터로 증명하는 기획,<br />
                        운영까지 책임지겠습니다.
                    </p>
                </div>

                {/* Contact */}
                <div className="mt-5 flex justify-between items-center border-t border-gray-300 pt-4">
                    <div>
                        <p className="text-sm font-bold text-black">📧 p6092@naver.com</p>
                        <p className="text-xs text-gray-600 mt-1">🌐 maple.ai.kr (실제 운영 중인 시스템)</p>
                    </div>
                    <div className="text-center">
                        <img
                            src="/qr_maple_site.png"
                            alt="Portfolio QR"
                            className="w-20 h-20 border border-gray-300 rounded"
                        />
                        <p className="text-xs text-gray-600 mt-1">QR 스캔</p>
                    </div>
                </div>
            </div>


            {/* ==================== PAGE 1: 업데이트 역기획 ==================== */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">1. 업데이트 역분석</h2>
                    <span className="text-gray-500 text-sm">01 / 07</span>
                </div>

                <h3 className="text-xl font-bold text-black mb-2">의도와 경험의 괴리 분석 (Reverse Engineering)</h3>
                <p className="text-sm text-black mb-6">
                    <strong>분석 대상:</strong> 2024년 상반기 [마일스톤] ~ 2025년 하반기 [크라운] 대규모 업데이트
                </p>

                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                    <h4 className="font-bold text-lg mb-4 text-black flex items-center gap-2">
                        <BarChart3 size={20} className="text-blue-600" />
                        상세 분석
                    </h4>

                    <div className="space-y-4">
                        {/* 기획 의도 */}
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h5 className="font-bold text-black mb-2">🎯 기획 의도 추론 (Developer Intent)</h5>
                            <ul className="text-sm text-black space-y-1 list-disc list-inside">
                                <li><strong>콘텐츠 소모 속도 제어(Control)</strong> 및 신규 재화(솔 에르다) 수요 창출을 통한 라이브 서비스 수명 연장</li>
                                <li className="ml-4 text-gray-600">※ '콘텐츠 소비 속도 관리'와 'BM 유지'의 균형을 동시에 고려한 설계로 해석</li>
                            </ul>
                        </div>

                        {/* 실제 유저 경험 */}
                        <div className="border-l-4 border-red-500 pl-4">
                            <h5 className="font-bold text-black mb-2">😤 실제 유저 경험 (Actual UX)</h5>
                            <ul className="text-sm text-black space-y-1">
                                <li><strong className="text-red-600">Pain Point:</strong> 일일 숙제(Daily Quest) 피로도 증가로 인한 중위권 유저의 심리적 이탈 저항선 도달</li>
                                <li><strong className="text-orange-600">Feedback:</strong> "성장 체감보다는 의무감"이라는 키워드가 커뮤니티 내 지배적 여론 형성</li>
                            </ul>
                        </div>

                        {/* Gap Analysis */}
                        <div className="border-l-4 border-purple-500 pl-4">
                            <h5 className="font-bold text-black mb-2">⚠️ Gap Analysis</h5>
                            <ul className="text-sm text-black space-y-1">
                                <li><strong>구조적 괴리:</strong> 기획 의도(장기적 안착)와 유저 경험(단기적 피로 누적) 간의 불일치 발생</li>
                                <li><strong className="text-green-600">Correction:</strong> 중간 보상 구조, 선택형 성장 경로 등 <strong>'피로도 완충 장치'</strong> 설계 필요</li>
                            </ul>
                            <p className="text-xs text-gray-600 italic mt-2 leading-relaxed">
                                ※ 본 분석은 외부에서 관찰 가능한 지표와 유저 반응을 기반으로 한 가설이며, 실제 내부 의사결정 맥락과는 차이가 있을 수 있습니다.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-black font-semibold mb-3">📸 근거 자료: 커뮤니티 반응 분석</p>
                    <div className="bg-white border border-gray-300 rounded-lg p-4">
                        <p className="text-sm text-black font-semibold mb-3 text-center">업데이트 이후 유튜브 커뮤니티 부정적 여론 워드클라우드</p>
                        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200" style={{ maxHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                                src="/wordcloud_user_upload.png"
                                alt="커뮤니티 반응 워드클라우드"
                                className="w-full h-auto object-contain"
                                style={{ maxHeight: '200px' }}
                            />
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-600 text-center">
                                분석 근거: 유튜브 채널 '한자' 9년 운영 (2017.05~현재) 중 수집한 실제 유저 피드백
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            {/* ==================== PAGE 3: 인게임 경제 분석 ==================== */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">2. 인게임 경제 분석</h2>
                    <span className="text-gray-500 text-sm">02 / 07</span>
                </div>

                <h3 className="text-xl font-bold text-black mb-6">가치 보존의 딜레마 (Economy Balance)</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* 좌측: 분석 */}
                    <div className="space-y-6">
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                            <h4 className="font-bold text-black mb-3 flex items-center gap-2">
                                <TrendingDown className="text-red-600" size={18} />
                                1. 고가치 재화 시세 변동 추이
                            </h4>
                            <div className="space-y-2 text-sm text-black">
                                <p><strong className="text-red-600">현상:</strong> 에테르넬 / 칠흑 등 End-Game 장비의 시장 가치 하락세 지속</p>
                                <p><strong className="text-orange-600">원인:</strong> 상위 보스 클리어 유저(공급) 확대 vs 스타포스 파괴 리스크로 인한 수요 정체</p>
                                <p className="text-xs text-gray-600 italic">
                                    ※ 시스템 실패라기보다는, 공급 확대와 리스크 구조가 만들어낸 <strong>구조적 트레이드오프(Trade-off)</strong>로 해석
                                </p>
                            </div>
                        </div>

                        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                            <h4 className="font-bold text-black mb-3 flex items-center gap-2">
                                <AlertTriangle className="text-orange-600" size={18} />
                                2. BM 효율 및 소비 심리 분석
                            </h4>
                            <div className="space-y-2 text-sm text-black">
                                <p><strong>분석:</strong> 확률형 아이템(큐브, 환불 등)의 기댓값 대비 완제품 시장 가격 괴리 심화</p>
                                <p><strong>유저 심리:</strong> "직작(Direct Crafting)보다는 완제품 구매" 선호 경향 강화</p>
                                <p className="text-xs text-gray-600 italic ml-4">→ 단기적으로 유저 피로도를 낮추지만, 장기적으로는 <strong className="text-orange-600">'강화 시스템 참여율 저하'</strong>라는 역효과 유발 가능</p>
                                <p><strong className="text-red-600">Result:</strong> 제작 원자재(노작템)의 수요 침체 및 가치 폭락 → 상위 보스 보상 매력도 하락의 악순환(Vicious Cycle) 형성</p>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 증거 이미지 */}
                    <div className="flex flex-col justify-center">
                        <div className="bg-white border-2 border-gray-300 rounded-xl p-4 shadow-md">
                            <h5 className="font-bold text-sm text-black mb-3 text-center">📊 핵심 증거</h5>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
                                <p className="text-xs text-black font-semibold mb-2 text-center">에테르넬 장비 시세 추이 (2026년 1월)</p>
                                <div className="h-32 bg-gradient-to-b from-blue-100 to-red-100 rounded flex items-end justify-around p-2">
                                    <div className="bg-blue-500 w-8" style={{ height: '80%' }}></div>
                                    <div className="bg-blue-400 w-8" style={{ height: '70%' }}></div>
                                    <div className="bg-blue-300 w-8" style={{ height: '60%' }}></div>
                                    <div className="bg-orange-400 w-8" style={{ height: '50%' }}></div>
                                    <div className="bg-orange-500 w-8" style={{ height: '45%' }}></div>
                                    <div className="bg-red-500 w-8" style={{ height: '41%' }}></div>
                                </div>
                                <p className="text-xs text-center text-black mt-2">01/01 → 01/06 → 01/11 → 01/16 → 01/21 → 01/26</p>
                                <p className="text-xs text-center text-red-600 mt-1 font-bold">-58.7% 가치 하락 (35.02억 → 14.48억)</p>
                            </div>
                            <p className="text-xs text-gray-600 text-center">
                                출처: 메이플 AI 경제 모니터링 시스템 (maple.ai.kr)
                            </p>
                            <p className="text-xs text-gray-400 text-center mt-1">
                                Data: 2026.01 | maple.ai.kr
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-black mb-2">
                        <strong className="text-blue-600">💡 시사점:</strong> 가치 보존 메커니즘(Value Retention) 설계 시, 공급-수요-리스크의 3요소 균형을 사전 시뮬레이션하는 과정이 필수적
                    </p>
                    <p className="text-xs text-gray-600 italic mt-2">
                        ※ 단, 유저 숙련도·자본 규모에 따른 체감 차이는 추가 세분화 분석이 필요합니다.
                    </p>
                </div>
            </div>


            {/* ==================== PAGE 4: 리스크 매니지먼트 ==================== */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">3. 리스크 매니지먼트</h2>
                    <span className="text-gray-500 text-sm">03 / 07</span>
                </div>

                <h3 className="text-xl font-bold text-black mb-6">데이터 기반 소통 전략 (Risk Management)</h3>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg mb-6">
                    <h4 className="font-bold text-black mb-3 flex items-center gap-2">
                        <Shield className="text-yellow-600" size={20} />
                        Case Study: 확률형 아이템 논란 대응
                    </h4>
                    <div className="space-y-3 text-sm text-black">
                        <p><strong>여론 추이:</strong></p>
                        <div className="ml-4 space-y-1">
                            <p>1️⃣ 이슈 발생 직후 → <strong className="text-red-600">불신 확산(Panic)</strong></p>
                            <p>2️⃣ 감정적·추상적 대응 시 → <strong className="text-orange-600">2차 반발(Backfire)</strong> 확인</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-xl text-blue-900 mb-4 text-center">
                        💬 대응 전략 제언
                    </h4>
                    <p className="text-center text-lg font-bold text-blue-600 mb-4">
                        Data Driven Communication
                    </p>
                    <p className="text-sm text-black text-center mb-6 italic">
                        (감정적 호소보다 데이터와 팩트 중심의 투명한 소통)
                    </p>

                    <div className="space-y-4">
                        <div className="bg-white border border-blue-200 rounded-lg p-4">
                            <h5 className="font-bold text-black mb-2">Step 1. 이슈 정의</h5>
                            <p className="text-sm text-black">
                                문제의 <strong>원인과 영향 범위를 명확히 규정</strong>하여 공지
                            </p>
                        </div>

                        <div className="bg-white border border-blue-200 rounded-lg p-4">
                            <h5 className="font-bold text-black mb-2">Step 2. 데이터 설명</h5>
                            <p className="text-sm text-black">
                                로그 및 <strong>확률 검증 데이터를 공개</strong>하여 오해 최소화
                            </p>
                        </div>

                        <div className="bg-white border border-blue-200 rounded-lg p-4">
                            <h5 className="font-bold text-black mb-2">Step 3. 해결안 제시</h5>
                            <p className="text-sm text-black">
                                즉시 적용 가능한 <strong>'단기 보완책'</strong> + <strong className="text-blue-600">'중장기 구조 개선안(Roadmap)'</strong>을 일정과 함께 동시 발표
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-black">
                        <strong className="text-green-600">✅ 기대 효과:</strong> 유저 신뢰 회복 + 2차 여론 악화 방지 + 브랜드 이미지 보호
                    </p>
                </div>
            </div>


            {/* ==================== PAGE 5a: UX 개선 제언 (Part 1) ==================== */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-3 mb-3 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">4. UX 개선 제언 (1/2)</h2>
                    <span className="text-gray-500 text-sm">04-1 / 07</span>
                </div>

                <h3 className="text-lg font-bold text-black mb-1">성장 병목 해소와 BM 효율 유도 구조 재설계</h3>
                <p className="text-xs text-gray-600 italic mb-3">
                    Growth Experience & BM Optimization: '병목 회피 수단'으로 소비되는 BM을 '엔드게임 가속 수단'으로 재정렬
                </p>

                {/* 문제 정의 */}
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
                    <h4 className="font-bold text-black mb-2 flex items-center gap-2">
                        <AlertTriangle className="text-red-600" size={18} />
                        1. 문제 정의 (Diagnosis : UX Distortion)
                    </h4>
                    <div className="space-y-1 text-sm text-black">
                        <p><strong>Target:</strong> Lv.270 ~ Lv.285 (그란디스 중·후반 성장 구간)</p>

                        <div className="bg-blue-50 border border-blue-300 rounded p-2 mt-2 mb-2">
                            <p className="text-xs text-blue-900 italic">
                                <strong>※ 분석 근거:</strong> 실제 Lv.280~285 구간 유저 분포 및 공개 커뮤니티 반응 데이터를 기준으로, 해당 구간을 <strong>'성장 병목 + BM 사용 왜곡이 동시에 발생하는 UX 왜곡 지점'</strong>으로 정의함.
                            </p>
                        </div>

                        <div className="bg-white border border-red-200 rounded p-2 mt-1">
                            <p className="text-xs font-semibold text-red-800 mb-1">Context:</p>
                            <p className="text-xs text-black mb-1">
                                • '버닝 익스프레스' 도입으로 Lv.270~280 돌파 가속 → <strong>성장 병목이 Lv.280~285로 압축/이동</strong>
                            </p>
                            <p className="text-xs text-black mb-1">
                                • <strong className="text-orange-600">User Behavior:</strong> '모멘텀 패스'를 본래 의도(엔드게임 가속)가 아닌 <strong>'병목 회피 수단'으로 조기 사용</strong> → 비효율
                            </p>
                            <p className="text-xs text-black mb-1">
                                • <strong className="text-purple-600">Data Inference:</strong> Lv.280~285 구간 <strong>플레이타임 감소 추정</strong>, <strong>모멘텀 패스 조기 사용↑</strong>
                            </p>
                            <p className="text-xs text-black">
                                • <strong className="text-red-600">Risk:</strong> BM 만족도↓ + 비BM 유저 박탈감 및 이탈 심화
                            </p>
                        </div>
                    </div>
                </div>

                {/* 개선 제언 */}
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <h4 className="font-bold text-black mb-2 flex items-center gap-2">
                        <Lightbulb className="text-green-600" size={18} />
                        2. 개선 제언 (Solution : Bridge & Nudge)
                    </h4>
                    <p className="text-sm font-semibold text-green-800 mb-3 text-center italic">
                        "비BM 유저에게는 '도달 가능성'을, BM 유저에게는 '최적 효율'을 설계한다."
                    </p>

                    <div className="space-y-2">
                        <div className="bg-white border border-green-200 rounded-lg p-3">
                            <h5 className="font-bold text-sm text-black mb-1">Sol 1. [완충] 계단식 성장 보조</h5>
                            <p className="text-xs text-black mb-1">
                                <strong>내용:</strong> Lv.280/282/284 달성 시 [계정 귀속 성장 지원 상자] 지급 (경험치 비약 + 사냥 버프 + 솔 에르다 조각)
                            </p>
                            <p className="text-xs text-black mb-1">
                                <strong className="text-green-600">효과:</strong> "버티면 뚫린다"는 메시지로 BM 없이도 Lv.285까지 생존 유도
                            </p>
                            <p className="text-xs text-blue-700 italic mt-1 bg-blue-50 p-2 rounded">
                                <strong>※ 벤치마킹:</strong> 로아 '슈퍼 모코코 익스프레스' 1520~1600 구간 재련 지원처럼 구간별 안착감 제공. 중간 이탈↓
                            </p>
                            <p className="text-xs text-gray-600 italic mt-1">
                                *※ BM 효율 극대화 Lv.285까지의 <strong>UX 완충(Buffering)</strong> 목적
                            </p>
                        </div>

                        <div className="bg-white border border-green-200 rounded-lg p-3">
                            <h5 className="font-bold text-sm text-black mb-1">Sol 2. [유도] BM 효율 가시화 UX</h5>
                            <p className="text-xs text-black mb-1">
                                <strong>내용:</strong> 모멘텀 패스 UI에 "적정 사용 효율 가이드" 도입
                            </p>
                            <div className="bg-gray-50 border border-gray-300 rounded p-1 mb-1 text-center">
                                <p className="text-xs font-semibold leading-tight">
                                    <span className="text-red-600">⚠️ 현 효율: 70%</span> <span className="text-gray-400">|</span> <span className="text-blue-600">Lv.285 효율: 100% (MAX)</span>
                                </p>
                            </div>
                            <p className="text-xs text-black mb-1 leading-tight">
                                <strong className="text-green-600">효과:</strong> 유저 스스로 <strong>효율 극대화 시점 인지</strong> 유도 → 최적 소비 촉진
                            </p>
                            <p className="text-xs text-blue-700 italic mt-0.5 bg-blue-50 p-1.5 rounded leading-tight">
                                <strong>※ 벤치마킹:</strong> 로아 슈모익 '스타일 설정'의 자율 선택 유도와 같이, 효율 수치화로 유저의 최적 시점 결정 지원.
                            </p>
                        </div>

                        <div className="bg-white border border-green-200 rounded-lg p-2">
                            <h5 className="font-bold text-sm text-black mb-1">Sol 3. [비전] Lv.295 로드맵 제시</h5>
                            <p className="text-xs text-black mb-0.5 leading-tight">
                                <strong>내용:</strong> Lv.285 달성 시 [도전 로드맵] 팝업 (BM 사용 시 단축 기간 시각화)
                            </p>
                            <p className="text-xs text-black leading-tight">
                                <strong className="text-green-600">강조:</strong> Lv.295 해금 <strong>신규 콘텐츠 메리트</strong> 명시 → 도전 동기 부여
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            {/* ==================== PAGE 5b: UX 개선 제언 (Part 2) ==================== */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">4. UX 개선 제언 (2/2)</h2>
                    <span className="text-gray-500 text-sm">04-2 / 07</span>
                </div>

                {/* The Growth Bridge Strategy 다이어그램 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-400 rounded-xl p-6 mb-6">
                    <h5 className="text-lg font-bold text-center text-blue-900 mb-5">📈 The Growth Bridge Strategy</h5>

                    <div className="relative h-40 mb-4">
                        {/* 배경 곡선 - 성장 곡선 */}
                        <div className="absolute inset-0 flex items-end">
                            {/* Lv.270-280: 평탄한 구간 */}
                            <div className="flex-1 bg-gray-300 h-12 rounded-l-lg border-r-2 border-gray-400"></div>
                            {/* Lv.280-285: 병목 구간 (낮음) */}
                            <div className="flex-1 bg-red-200 h-10 border-r-2 border-red-400"></div>
                            {/* Lv.285: 분기점 */}
                            <div className="w-2 bg-green-600 h-full"></div>
                            {/* Lv.285+: 가속 구간 */}
                            <div className="flex-1 bg-gradient-to-t from-green-300 to-blue-400" style={{ height: '100%', clipPath: 'polygon(0 100%, 0 50%, 100% 0, 100% 100%)' }}></div>
                        </div>

                        {/* 레이블 - 개선된 가시성 */}
                        <div className="absolute inset-0 flex items-center justify-around text-sm font-bold">
                            <div className="text-center z-20">
                                <div className="bg-white border-2 border-gray-500 rounded px-3 py-2 shadow-lg">
                                    <span className="text-gray-800">Lv.270</span>
                                </div>
                            </div>
                            <div className="text-center z-20">
                                <div className="bg-red-50 border-2 border-red-600 rounded px-3 py-2 shadow-lg">
                                    <span className="text-red-800">Lv.280-284</span>
                                </div>
                                <div className="text-xs text-red-700 font-bold mt-1 bg-white/90 px-2 rounded">⚠️ 병목</div>
                            </div>
                            <div className="text-center z-20">
                                <div className="bg-green-50 border-2 border-green-700 rounded px-3 py-2 shadow-lg">
                                    <span className="text-green-900">Lv.285 🚩</span>
                                </div>
                                <div className="text-xs text-green-800 font-bold mt-1 bg-white/90 px-2 rounded">분기점</div>
                            </div>
                            <div className="text-center z-20">
                                <div className="bg-blue-50 border-2 border-blue-600 rounded px-3 py-2 shadow-lg">
                                    <span className="text-blue-900">Lv.295+ 🚀</span>
                                </div>
                                <div className="text-xs text-blue-800 font-bold mt-1 bg-white/90 px-2 rounded">가속</div>
                            </div>
                        </div>
                    </div>

                    {/* 설명 */}
                    <div className="grid grid-cols-3 gap-3 text-sm">
                        <div className="bg-white border-2 border-orange-400 rounded p-3 shadow-sm">
                            <p className="font-bold text-orange-700 mb-2">Step 1. 완충 (Bridge)</p>
                            <p className="text-black text-xs">Lv.280/282/284 계단식 보상으로 비BM 유저 생존 지원</p>
                        </div>
                        <div className="bg-white border-2 border-blue-400 rounded p-3 shadow-sm">
                            <p className="font-bold text-blue-700 mb-2">Step 2. 유도 (Nudge)</p>
                            <p className="text-black text-xs">효율 가시화로 Lv.285 이후 BM 사용 유도</p>
                        </div>
                        <div className="bg-white border-2 border-green-400 rounded p-3 shadow-sm">
                            <p className="font-bold text-green-700 mb-2">Step 3. 가속 (Boost)</p>
                            <p className="text-black text-xs">Lv.295 로드맵으로 최종 목표 제시</p>
                        </div>
                    </div>
                </div>

                {/* 기대 효과 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                    <h4 className="font-bold text-lg text-black mb-4">3. 기대 효과 (Expected Effect & KPI)</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                            <p className="font-semibold text-blue-800 mb-2">User Experience:</p>
                            <p className="text-black mb-2">• <strong>비BM 유저:</strong> Lv.280~285 구간 성장 단절감 해소 및 이탈률 감소.</p>
                            <p className="text-black">• <strong>BM 유저:</strong> 패스 효율 극대화 경험을 통한 상품 만족도 및 재구매 의향 상승.</p>
                        </div>
                        <div>
                            <p className="font-semibold text-purple-800 mb-2">Business Impact:</p>
                            <p className="text-black mb-2">• <strong>'모멘텀 패스'</strong>의 사용 시점이 Lv.285 이후로 이동하며, Lv.295+ 구간의 유저 풀(Pool) 확대 가속화.</p>
                        </div>
                    </div>
                    <div className="border-t border-blue-300 pt-4">
                        <p className="text-sm font-semibold text-blue-800 mb-3">Key Performance Indicator (KPI):</p>
                        <div className="flex gap-4 justify-center">
                            <div className="bg-white border border-blue-300 rounded px-4 py-2">
                                <p className="text-sm text-black">모멘텀 패스 평균 사용 레벨 상승 <span className="text-blue-600 font-bold text-lg">↑</span></p>
                            </div>
                            <div className="bg-white border border-blue-300 rounded px-4 py-2">
                                <p className="text-sm text-black">Lv.280~285 구간 이탈률 <span className="text-green-600 font-bold text-lg">↓</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* ==================== PAGE 6: 결론 ==================== */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">5. 결론</h2>
                    <span className="text-gray-500 text-sm">05 / 07</span>
                </div>

                <h3 className="text-lg font-bold text-black mb-3 text-center">
                    데이터 기반의 지속 가능한 라이브 서비스 전략
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3 text-center">
                        <div className="text-2xl mb-1">⚖️</div>
                        <h4 className="font-bold text-base text-blue-900 mb-1">Balance</h4>
                        <p className="text-xs text-black font-semibold mb-2">균형 감각</p>
                        <p className="text-xs text-black leading-relaxed">
                            <strong>Biz & UX:</strong> 사업적 목표와 유저 경험 사이의 최적 균형점 탐색
                        </p>
                    </div>

                    <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-3 text-center">
                        <div className="text-2xl mb-1">📊</div>
                        <h4 className="font-bold text-base text-purple-900 mb-1">Insight</h4>
                        <p className="text-xs text-black font-semibold mb-2">데이터 통찰</p>
                        <p className="text-xs text-black leading-relaxed">
                            <strong>Data to Action:</strong> 수치 뒤에 숨겨진 유저의 심리 해석
                        </p>
                    </div>

                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3 text-center">
                        <div className="text-2xl mb-1">🛡️</div>
                        <h4 className="font-bold text-base text-green-900 mb-1">Risk Management</h4>
                        <p className="text-xs text-black font-semibold mb-2">리스크 관리</p>
                        <p className="text-xs text-black leading-relaxed">
                            <strong>Proactive:</strong> 선제적 대응 체계
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-3 mb-3">
                    <p className="text-base leading-relaxed text-center">
                        "메이플스토리의 지난 20년이 <strong>'성장'</strong>의 역사였다면,<br />
                        앞으로의 10년은 데이터 기반의 정교한 <strong>'관리'</strong>와 <strong>'소통'</strong>이<br />
                        핵심 경쟁력이 될 것입니다."
                    </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                    <p className="text-sm text-black leading-relaxed text-center">
                        시장 흐름을 읽는 <strong className="text-blue-600">분석력</strong>과<br />
                        시스템을 설계하는 <strong className="text-purple-600">논리력</strong>으로<br />
                        넥슨의 라이브 서비스 가치를 높이겠습니다.
                    </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-400 rounded-lg p-3">
                    <p className="text-xs font-bold text-green-900 mb-1 text-center">💼 즉시 투입 가능 업무</p>
                    <p className="text-sm text-black text-center mb-2">
                        본 분석 역량을 바탕으로 <strong className="text-green-600">즉시 투입 가능</strong>
                    </p>
                    <ul className="text-sm text-black space-y-1">
                        <li className="flex items-start gap-2">
                            <span className="text-green-600">•</span>
                            <span><strong>라이브 서비스 지표 모니터링</strong> (경제/유저 행동)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600">•</span>
                            <span><strong>성장 구간 UX 설계</strong> (Retention 최적화)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600">•</span>
                            <span><strong>업데이트 리스크 분석</strong> (여론 예측 및 대응)</span>
                        </li>
                    </ul>
                    <p className="text-xs text-gray-600 italic mt-2 text-center leading-tight">
                        본 제언은 '정답' 제시가 아닌, 내부 데이터와 결합해 더 정교해질 수 있는 기획 출발점으로 활용되기를 기대합니다.
                    </p>
                </div>

                <div className="mt-auto pt-2 border-t border-gray-200 text-center">
                    <p className="text-lg font-bold text-black mb-3">
                        Thank You. <span className="text-sm text-gray-600 font-normal ml-3">p6092@naver.com</span>
                    </p>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-400 rounded-lg p-3 inline-block">
                        <p className="text-xs text-black font-semibold mb-2 text-center">🌐 포트폴리오 실제 시스템</p>

                        <div className="flex items-center gap-3">
                            {/* QR 코드 */}
                            <div className="text-center">
                                <img
                                    src="/qr_maple_site.png"
                                    alt="QR Code for maple.ai.kr"
                                    className="w-16 h-16 border-2 border-gray-300 rounded bg-white"
                                />
                                <p className="text-xs text-gray-600 mt-1">QR 스캔</p>
                            </div>

                            {/* URL */}
                            <div className="text-left">
                                <a
                                    href="https://maple.ai.kr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-bold text-blue-600 hover:text-blue-800 underline break-all"
                                >
                                    https://maple.ai.kr
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 고정 인쇄 버튼 */}
            <button
                onClick={() => window.print()}
                className="fixed-print-btn fixed bottom-8 right-8 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all transform hover:-translate-y-1 z-50 animate-bounce print:hidden border border-gray-700"
            >
                <Printer size={20} />
                <span className="font-semibold">PDF로 저장 (A4)</span>
            </button>
        </div>
    );
}
