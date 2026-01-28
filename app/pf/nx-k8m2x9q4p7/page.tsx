'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, Github, Linkedin, ExternalLink, Code, TrendingUp, Users, Award, Printer } from 'lucide-react';

export default function PortfolioPage() {
    return (
        <div className="portfolio-viewer bg-gray-100 min-h-screen py-8 print:py-0 print:bg-white">
            {/* 인쇄 및 A4 미리보기 스타일 */}
            <style jsx global>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
        
        /* 포트폴리오 페이지 전용 스타일: 사이트 공통 네비게이션 숨김 */
        nav, header {
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

        body {
            background-color: #f3f4f6; /* 화면에서는 회색 배경 */
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

        /* 모바일 최적화 */
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

            h1 { font-size: 1.75rem !important; }
            h2 { font-size: 1.5rem !important; }
            
            .fixed-print-btn {
                bottom: 20px !important;
                right: 20px !important;
                padding: 10px 20px !important;
                position: fixed !important;
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

            /* 인쇄 시 그림자/배경 제거하고 페이지 나눔 강제 */
            .a4-page {
                box-shadow: none !important;
                margin: 0 !important;
                page-break-after: always !important;
                break-after: page !important;
                height: 297mm !important;
                width: 210mm !important;
                /* 인쇄 시 안전 여백 미세 조정 */
                padding: 15mm !important;
            }

            /* 버튼 숨김 */
            .no-print, button {
                display: none !important;
            }
            
            /* 색상 보존 */
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
        }
      `}</style>

            {/* ==================== PAGE 1: COVER ==================== */}
            <div className="a4-page items-center text-center">
                <div className="w-full flex-1 flex flex-col pt-4">
                    <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">
                        2026 NEXON Game Planning Portfolio
                    </p>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight break-keep">
                        메이플스토리 데이터 기반<br />
                        유저 성장 진단 및<br />
                        경제 모니터링 시스템 기획
                    </h1>
                    <p className="text-xl font-medium text-gray-600 leading-relaxed mb-16">
                        NEXON Open API 활용 및 데이터 시각화 알고리즘 설계를 중심으로
                    </p>

                    <div className="w-full max-w-lg mx-auto rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-6">
                        <img
                            src="/portfolio-images/maple-ai-main.png"
                            alt="메이플 AI 메인 화면"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <p className="text-sm text-gray-500 font-medium">
                        Next.js 14 & NEXON Open API 기반 실시간 데이터 분석 플랫폼
                    </p>
                </div>

                <div className="w-full text-right border-t border-gray-200 pt-4 mt-2 pb-2">
                    <p className="text-3xl font-bold text-gray-900 mb-2">기획자 이경준</p>
                    <p className="text-md font-medium text-gray-500">이메일: p6092@naver.com</p>
                    <p className="text-md font-medium text-gray-500">Portfolio Date: 2026.01</p>
                </div>
            </div>


            {/* ==================== PAGE 2: PROJECT OVERVIEW ==================== */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-8 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">Project Overview</h2>
                    <span className="text-gray-500 text-sm">01 / 06</span>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-black mb-2">메이플스토리 데이터 기반 유저 성장 진단 시스템</h3>
                    <p className="text-blue-600 font-semibold mb-4">NEXON Open API 활용 및 데이터 시각화 알고리즘 설계</p>
                    <div className="flex gap-2">
                        {['NEXON Open API', 'Next.js', 'TypeScript', 'Chart.js'].map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-gray-100 text-black text-xs font-semibold rounded border border-gray-200">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h4 className="font-bold text-lg mb-4 text-black">🎯 기획 배경 (Background)</h4>
                        <ul className="space-y-3 text-sm text-black">
                            <li><strong>High Complexity:</strong> 비직관적인 스펙업 구조(스타포스, 잠재능력 등)로 인한 진입 장벽</li>
                            <li><strong>Information Asymmetry:</strong> 객관적 성장 위치 파악 어려움으로 인한 유저 이탈(Churn)</li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                        <h4 className="font-bold text-lg mb-4 text-blue-900">✅ 기획 목적 (Objectives)</h4>
                        <ul className="space-y-3 text-sm text-blue-900">
                            <li><strong>Visualization:</strong> 정량 데이터를 시각화하여 직관적인 상태 파악 제공</li>
                            <li><strong>Motivation:</strong> "현재 위치 → 부족한 점 → 다음 목표" 제시로 성장 동기 부여</li>
                        </ul>
                    </div>
                </div>

                <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h4 className="font-bold text-lg mb-6 text-black">🏗️ 시스템 아키텍처 (System Architecture)</h4>
                    <div className="flex items-center justify-between gap-2 text-center my-8 text-black">
                        {/* 구조도 Simple Version */}
                        <div className="flex-1 p-4 bg-gray-50 rounded border border-gray-200">
                            <p className="font-bold text-sm text-gray-900">User Input</p>
                            <p className="text-xs text-gray-900 font-medium">닉네임</p>
                        </div>
                        <div className="text-blue-600 font-bold text-xl">→</div>
                        <div className="flex-1 p-4 bg-blue-50 rounded border border-blue-200">
                            <p className="font-bold text-sm text-blue-900">NEXON API</p>
                            <p className="text-xs text-blue-800 font-medium">데이터 수집</p>
                        </div>
                        <div className="text-blue-600 font-bold text-xl">→</div>
                        <div className="flex-1 p-4 bg-blue-50 rounded border border-blue-200">
                            <p className="font-bold text-sm text-blue-900">Logic Processing</p>
                            <p className="text-xs text-blue-800 font-medium">진단/지표화</p>
                        </div>
                        <div className="text-blue-600 font-bold text-xl">→</div>
                        <div className="flex-1 p-4 bg-gray-50 rounded border border-gray-200">
                            <p className="font-bold text-sm text-gray-900">Visualization</p>
                            <p className="text-xs text-gray-900 font-medium">Web/Mobile</p>
                        </div>
                    </div>
                    <div className="space-y-2 text-sm text-black mt-6 bg-gray-50 p-4 rounded border border-gray-200">
                        <p>• <strong className="text-black">Data Processing:</strong> API 기반 데이터 정규화(Normalization) 및 지표화 로직 설계</p>
                        <p>• <strong className="text-black">Visualization:</strong> Chart 라이브러리를 활용한 시세 변동 및 성장 척도 시각화</p>
                        <p>• <strong className="text-black">Platform:</strong> Web / Mobile 환경에 대응하는 반응형 정보 구조(IA) 설계</p>
                    </div>
                </div>
            </div>


            {/* ==================== PAGE 3: KEY FEATURES I ==================== */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">Key Features: Growth System</h2>
                    <span className="text-gray-500 text-sm">02 / 06</span>
                </div>

                {/* 캐릭터 정보 대시보드 */}
                <div className="mb-8">
                    <h4 className="font-bold text-lg mb-2 text-black">📊 캐릭터 종합 정보 대시보드</h4>
                    <p className="text-sm text-black mb-4">캐릭터의 모든 핵심 정보(기본정보, 전투력, 스킬 진행도)를 단일 화면에 통합 시각화.</p>
                    <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mb-4 relative">
                        <img src="/portfolio-images/character-dashboard.png" className="absolute top-0 w-full object-cover object-top" alt="대시보드" />
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="bg-blue-50 p-2 rounded text-center border border-blue-100">
                            <span className="font-bold text-blue-800">정보 통합</span><br />
                            <span className="text-black">10개 API 통합</span>
                        </div>
                        <div className="bg-blue-50 p-2 rounded text-center border border-blue-100">
                            <span className="font-bold text-blue-800">시각화</span><br />
                            <span className="text-black">진행도 그래프</span>
                        </div>
                        <div className="bg-blue-50 p-2 rounded text-center border border-blue-100">
                            <span className="font-bold text-blue-800">즉시성</span><br />
                            <span className="text-black">3초 로딩</span>
                        </div>
                        <div className="bg-blue-50 p-2 rounded text-center border border-blue-100">
                            <span className="font-bold text-blue-800">반응형</span><br />
                            <span className="text-black">Mobile First</span>
                        </div>
                    </div>
                </div>

                {/* 전투력 티어 시스템 */}
                <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-6 flex flex-col">
                    <h4 className="font-bold text-lg mb-3 text-black">⚔️ 전투력 티어 시스템</h4>
                    <p className="text-sm text-black mb-4">
                        추상적인 전투력을 <strong>10개 대분류 티어</strong>와 <strong>5단계 세부 등급(Division)</strong>으로 구조화. 구간별 체감 성장을 강조하기 위한 세분화 실험.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 mb-4">
                        <div className="w-full md:w-1/2">
                            <div className="rounded-lg shadow-md border border-gray-200 overflow-hidden mb-2">
                                <Image src="/portfolio-images/tier-system.png" alt="티어 시스템" width={400} height={300} className="w-full h-auto" />
                            </div>
                            <p className="text-xs text-center text-black">실시간 티어 진행도 & AI 환영 메시지</p>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-3">
                            <div className="bg-white p-3 rounded border border-gray-200">
                                <h5 className="font-bold text-sm text-black mb-1">Division System</h5>
                                <p className="text-xs text-black">Diamond~Iron 티어에 5단계 세부 등급 적용 (Div 5→1). 작은 성취감 반복 제공.</p>
                            </div>
                            <div className="bg-white p-3 rounded border border-gray-200">
                                <h5 className="font-bold text-sm text-black mb-1">AI 환영 메시지</h5>
                                <p className="text-xs text-black">구간별 35종 맞춤형 메시지. "전투력 1억 돌파! 명함 좀 내밀겠는데요?"</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-100 p-3 rounded text-xs text-blue-900 mt-auto">
                        <strong>💡 보스 추천 알고리즘:</strong> 현재 전투력 기반 <span className="text-blue-700 font-bold">"클리어 가능 보스 4종"</span> 및 <span className="text-red-700 font-bold">"다음 도전 목표"</span> 자동 제안
                    </div>
                </div>
            </div>

            {/* ==================== PAGE 4: KEY FEATURES II - DIAGNOSTICS ==================== */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">Key Features: Diagnostics Details</h2>
                    <span className="text-gray-500 text-sm">03 / 06</span>
                </div>

                <div className="mb-6">
                    <h4 className="font-bold text-xl mb-4 text-black">🔍 4대 핵심 진단 시스템 시각화</h4>
                    <p className="text-sm text-black mb-6">
                        유저의 목적(보스/사냥)과 스펙 상태를 다각도로 분석하여, <strong className="text-red-600">직관적인 시각 자료(Chart/Image)</strong>로 솔루션 제공.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 1. 보스 세팅 */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                            <h5 className="font-bold text-sm text-orange-600 mb-2 flex items-center gap-2">⚔️ 보스 세팅 진단</h5>
                            <div className="aspect-video bg-gray-100 rounded mb-3 overflow-hidden border border-gray-100">
                                <img src="/portfolio-images/boss-diagnosis.png" className="w-full h-full object-cover" alt="보스 진단" />
                            </div>
                            <ul className="text-xs text-black space-y-1">
                                <li>• 보공/방무/크뎀 등 <strong>핵심 스탯 점유율</strong> 정밀 분석</li>
                                <li>• 필수 링크/유니온 누락 시 <span className="text-red-500 font-bold">Red Alert</span> 경고</li>
                            </ul>
                        </div>

                        {/* 2. 사냥 세팅 */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                            <h5 className="font-bold text-sm text-green-600 mb-2 flex items-center gap-2">🗡️ 사냥 세팅 진단</h5>
                            <div className="aspect-video bg-gray-100 rounded mb-3 overflow-hidden border border-gray-100">
                                <img src="/portfolio-images/hunting-diagnosis.png" className="w-full h-full object-cover" alt="사냥 진단" />
                            </div>
                            <ul className="text-xs text-black space-y-1">
                                <li>• 원킬 컷 및 도핑(재획비) 효율 기반 <strong>기대 수익 산출</strong></li>
                                <li>• 드롭률/메획 달성도(Max 200/100%) <strong>그래프 시각화</strong></li>
                            </ul>
                        </div>

                        {/* 3. 스펙업 1순위 */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                            <h5 className="font-bold text-sm text-yellow-600 mb-2 flex items-center gap-2">⚡ 스펙업 1순위 (Priority)</h5>
                            <div className="aspect-video bg-gray-100 rounded mb-3 overflow-hidden border border-gray-100">
                                <img src="/portfolio-images/spec-priority.png" className="w-full h-full object-cover" alt="우선순위" />
                            </div>
                            <ul className="text-xs text-black space-y-1">
                                <li>• 최소 비용 최대 효율(ROI) 기반 <strong>성장 경로 제안</strong></li>
                                <li>• <span className="text-red-500 font-bold">Must Do</span> vs <span className="text-yellow-500 font-bold">Recommended</span> 자동 분류</li>
                            </ul>
                        </div>

                        {/* 4. 종합 정밀 진단 */}
                        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                            <h5 className="font-bold text-sm text-indigo-600 mb-2 flex items-center gap-2">🛡️ 종합 정밀 진단</h5>
                            <div className="aspect-video bg-gray-100 rounded mb-3 overflow-hidden border border-gray-100">
                                <img src="/portfolio-images/comprehensive-diagnosis.png" className="w-full h-full object-cover" alt="정밀 진단" />
                            </div>
                            <ul className="text-xs text-black space-y-1">
                                <li>• 6차 전직(헥사) 및 아티팩트 등 <strong>7대 요소 심층 분석</strong></li>
                                <li>• "국민 세팅(17성/유니크)" 대비 <span className="text-indigo-600 font-bold">Relative Position</span> 평가</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mt-6">
                    <h5 className="font-bold text-sm text-black mb-3">💡 진단 로직 설계 핵심 (Logic Architecture)</h5>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="font-bold text-red-600 text-sm mb-1">🔴 Pain Point 가시화</div>
                            <div className="text-xs text-black font-medium">부족한 점 즉시 강조</div>
                        </div>
                        <div className="text-center border-l border-gray-300">
                            <div className="font-bold text-blue-600 text-sm mb-1">📊 정량적 기준</div>
                            <div className="text-xs text-black font-medium">객관적 수치(Threshold) 비교</div>
                        </div>
                        <div className="text-center border-l border-gray-300">
                            <div className="font-bold text-purple-600 text-sm mb-1">🎯 Actionable Item</div>
                            <div className="text-xs text-black font-medium">구체적인 개선 행동 유도</div>
                        </div>
                    </div>
                </div>
            </div>


            {/* ==================== PAGE 5: KEY FEATURES III - ECONOMY ==================== */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-4 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">Key Features: Economy</h2>
                    <span className="text-gray-500 text-sm">04 / 06</span>
                </div>

                {/* 경제 모니터링 */}
                <div className="flex-1 flex flex-col h-full">
                    <h4 className="font-bold text-2xl mb-2 text-black">💰 경제 모니터링 시스템</h4>
                    <p className="text-lg text-blue-600 font-semibold mb-4">서버 간 시세 격차(Price Gap) 분석 및 시장 왜곡 탐지</p>

                    {/* 이미지 크기를 85%로 줄여서 세로 공간 확보 */}
                    <div className="w-[85%] mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-4">
                        <img src="/portfolio-images/economy-monitoring.png" className="w-full h-auto object-cover" alt="경제 모니터링 그래프" />
                        <div className="bg-gray-50 p-2 text-center border-t border-gray-100">
                            <p className="text-xs text-gray-500">📸 챌린저스 월드(시즌 서버) vs 일반 월드 에테르넬 장비 시세 추이 비교 그래프</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                            <h5 className="font-bold text-blue-900 mb-1 text-base">📊 분석 로직 (Gap Analysis)</h5>
                            <ul className="text-sm text-black space-y-1 leading-relaxed">
                                <li>• <strong>Target:</strong> 고가치 물욕템 (칠흑/에테르넬)</li>
                                <li>• <strong>Metric:</strong> 기준일(Season Open) 대비 등락률 추적</li>
                                <li>• <strong>Monitoring:</strong> 서버 간 괴리율 모니터링 (30% 이상 시 주요 변동 구간)</li>
                            </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                            <h5 className="font-bold text-green-900 mb-1 text-base">💡 인사이트 (Insight)</h5>
                            <ul className="text-sm text-black space-y-1 leading-relaxed">
                                <li>• 이벤트 예고 시점의 <strong>선행 매매 패턴</strong> 포착</li>
                                <li>• "지금이 살 때/팔 때" <strong>의사결정 가이드</strong> 제공</li>
                                <li>• 비정상 거래 패턴 및 시장 왜곡 요인 탐지</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <h5 className="font-bold text-sm text-gray-500 mb-2 border-b border-gray-200 pb-2">Tech Stack for Economy System</h5>
                        <div className="flex gap-3">
                            {[
                                { name: 'Vercel Postgres', desc: '시세 데이터 적재' },
                                { name: 'Cron Job', desc: '매일 10시 데이터 수집' },
                                { name: 'Chart.js', desc: '시계열 데이터 시각화' },
                                { name: 'Server Actions', desc: 'Secure Data Fetching' }
                            ].map(t => (
                                <div key={t.name} className="flex-1 bg-gray-50 border border-gray-300 p-2 rounded-lg text-center shadow-sm">
                                    <div className="font-bold text-xs text-black mb-1">{t.name}</div>
                                    <div className="text-xs text-black font-medium leading-tight">{t.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            {/* ==================== PAGE 6: PROJECT 2 (Renumbered) ==================== */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">Process Innovation</h2>
                    <span className="text-gray-500 text-sm">05 / 06</span>
                </div>

                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-black mb-2">빠른 프로토타이핑을 통한<br />기획 검증 프로세스</h3>
                    <p className="text-blue-600 font-semibold mb-4">AI 협업 도구를 활용한 신속한 기획안 구현 및 검증</p>

                    <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg mb-4">
                        <h4 className="font-bold text-blue-900 mb-2">💡 Rapid Prototyping Workflow</h4>
                        <p className="text-sm text-black leading-relaxed">
                            기획자가 <strong>시스템 설계 및 로직을 구조화</strong>하고, <strong>AI 도구로 빠르게 프로토타입을 구현</strong>하여 기획 검증 사이클을 단축. 아이디어를 실시간으로 테스트하고 개선점을 도출.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-4xl font-bold text-blue-600 mb-2">3일</p>
                        <p className="text-sm font-bold text-black">프로토타입 제작</p>
                        <p className="text-xs text-gray-500 mt-2">아이디어→실행 단축</p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-4xl font-bold text-blue-600 mb-2">10+</p>
                        <p className="text-sm font-bold text-black">검증 사이클</p>
                        <p className="text-xs text-gray-500 mt-2">빠른 반복 개선</p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-4xl font-bold text-blue-600 mb-2">19개</p>
                        <p className="text-sm font-bold text-black">모듈 분리</p>
                        <p className="text-xs text-gray-500 mt-2">구조화된 설계</p>
                    </div>
                </div>

                <div className="flex-1 bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                    <h4 className="font-bold text-lg mb-6 text-black">🛠️ 주요 로직 구조화 사례 (Logic Architecture Cases)</h4>
                    <div className="space-y-5">
                        <div className="pb-4 border-b border-gray-100">
                            <div className="flex items-start justify-between gap-4 mb-2">
                                <h5 className="font-bold text-black">AI 코멘터리 시스템</h5>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded whitespace-nowrap">Complex Case</span>
                                    <span className="text-gray-400 text-sm">→</span>
                                    <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded font-bold whitespace-nowrap">Standardized Module</span>
                                </div>
                            </div>
                            <p className="text-xs text-black">복잡한 조건 분기를 체계적으로 정리하여 유지보수성 확보</p>
                        </div>
                        <div className="pb-4 border-b border-gray-100">
                            <div className="flex items-start justify-between gap-4 mb-2">
                                <h5 className="font-bold text-black">통합 평가 기준 로직</h5>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded whitespace-nowrap">Hard-Coding</span>
                                    <span className="text-gray-400 text-sm">→</span>
                                    <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded font-bold whitespace-nowrap">Table Driven</span>
                                </div>
                            </div>
                            <p className="text-xs text-black">하드코딩된 기준치를 상수 모듈로 분리하여 관리 용이성 증대</p>
                        </div>
                        <div className="pb-4">
                            <div className="flex items-start justify-between gap-4 mb-2">
                                <h5 className="font-bold text-black">잠재능력 평가 알고리즘</h5>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded whitespace-nowrap">Manual Logic</span>
                                    <span className="text-gray-400 text-sm">→</span>
                                    <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded font-bold whitespace-nowrap">Auto-Calculation</span>
                                </div>
                            </div>
                            <p className="text-xs text-black">반복되는 계산 로직을 유틸리티 함수로 추상화하여 정확도 향상</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-black text-center">
                            <strong className="text-blue-600">핵심:</strong> 복잡도 최소화 · 데이터 관리 효율화 · 운영 안정성 확보
                        </p>
                    </div>
                </div>
            </div>


            {/* ==================== PAGE 7: SKILLS & EXPERIENCE (Renumbered) ==================== */}
            <div className="a4-page">
                <div className="border-b-2 border-gray-900 pb-4 mb-8 flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-black">Skills & Experience</h2>
                    <span className="text-gray-500 text-sm">06 / 06</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <div>
                        <h3 className="font-bold text-xl mb-6 text-black border-b border-gray-200 pb-2">Skills</h3>

                        <div className="mb-6">
                            <h4 className="font-bold text-sm text-purple-700 mb-3">✨ AI Orchestration</h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between"><span className="text-gray-700">AI 에이전트 협업</span><span className="font-bold text-purple-600">95%</span></div>
                                <div className="w-full h-1.5 bg-gray-200 rounded-full"><div className="h-full bg-purple-500 w-[95%] rounded-full"></div></div>

                                <div className="flex justify-between"><span className="text-gray-700">Architecture Prompting</span><span className="font-bold text-purple-600">90%</span></div>
                                <div className="w-full h-1.5 bg-gray-200 rounded-full"><div className="h-full bg-purple-500 w-[90%] rounded-full"></div></div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-sm text-blue-700 mb-3">🛠️ Planning & Tech</h4>
                            <div className="flex flex-wrap gap-2">
                                {['System Design', 'Data Analysis', 'UX/UI', 'Next.js', 'React', 'TypeScript', 'SQL'].map(s => (
                                    <span key={s} className="px-2 py-1 bg-gray-100 text-black text-xs rounded border border-gray-200">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-xl mb-6 text-black border-b border-gray-200 pb-2">Experience</h3>
                        <div className="space-y-6">
                            <div className="relative pl-4 border-l-2 border-blue-500">
                                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                                <h4 className="font-bold text-black">메이플스토리 AI 진단 시스템</h4>
                                <p className="text-xs text-blue-500 font-bold mb-2">2025.12 - Present</p>
                                <p className="text-xs text-gray-600">개인 프로젝트 (1인 개발)</p>
                            </div>

                            <div className="relative pl-4 border-l-2 border-gray-300">
                                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
                                <h4 className="font-bold text-black">라이브 서비스 구조 분석 및 UX 연구</h4>
                                <p className="text-xs text-gray-500 font-bold mb-2">2017.05 - Present</p>
                                <p className="text-xs text-gray-600 mb-2">개인 프로젝트 (채널 '한자' 운영)</p>
                                <ul className="text-xs text-gray-600 space-y-1 list-disc pl-3">
                                    <li>업데이트 기획 의도 분석</li>
                                    <li>인게임 경제 모니터링</li>
                                    <li>리스크 관리 및 여론 분석</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t-2 border-gray-100 pt-8 mt-12">
                    <h3 className="font-bold text-xl mb-4 text-black">About Me</h3>
                    <p className="text-black text-sm leading-relaxed mb-6">
                        저는 <strong className="text-blue-600">"개발 지식을 기반으로 논리적인 시스템을 설계하는 기획자"</strong>입니다.
                        단순히 문서를 작성하는 것을 넘어, AI 기술을 활용해 직접 프로토타입을 구현하고 검증하며,
                        개발팀과 가장 효율적인 언어로 소통합니다. 데이터에 기반한 의사결정과 논리적인 구조 설계를 통해
                        유저에게 최상의 경험을 제공하는 것을 목표로 합니다.
                    </p>

                    <div className="flex justify-between items-end">
                        <a href="mailto:p6092@naver.com" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm font-semibold mb-4">
                            <Mail size={16} /> p6092@naver.com
                        </a>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-400 rounded-lg p-3 inline-block">
                            <p className="text-xs text-black font-semibold mb-2 text-center">🌐 포트폴리오 실제 시스템</p>

                            <div className="flex items-center gap-3">
                                {/* QR 코드 */}
                                <div className="text-center">
                                    <img
                                        src="/qr_maple_site.png"
                                        alt="QR Code"
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
            </div>

            {/* 고정 인쇄 버튼 */}
            <button
                onClick={() => window.print()}
                className="fixed-print-btn fixed bottom-8 right-8 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all transform hover:-translate-y-1 z-50 animate-bounce print:hidden border border-gray-700"
            >
                <Printer size={20} />
                <span className="font-semibold">PDF로 저장 (A4)</span>
            </button>
        </div >
    );
}
