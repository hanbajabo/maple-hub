'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { FileText, Users, ChevronRight, Lock } from 'lucide-react';

const mobileStyles = `
  @media (max-width: 768px) {
    .pf-container {
      padding: 1rem !important;
    }
    .pf-header {
      margin-bottom: 2rem !important;
    }
    .pf-header h1 {
      font-size: 2rem !important;
    }
    .portfolio-grid {
      grid-template-columns: 1fr !important;
      gap: 1.5rem !important;
    }
    .portfolio-card {
      padding: 1.5rem !important;
    }
    .card-icon-container {
      padding: 1rem !important;
    }
  }
`;

export default function PortfolioIndexPage() {
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-8">
            <style jsx global>{`
                @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
                
                body {
                    font-family: 'Pretendard', sans-serif;
                }

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
            `}</style>
            <style dangerouslySetInnerHTML={{ __html: mobileStyles }} />

            <div className="max-w-5xl w-full pf-container">
                {/* 헤더 */}
                <div className="text-center mb-12 pf-header">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Lock className="text-blue-400" size={24} />
                        <h1 className="text-4xl font-bold text-white">Portfolio Collection</h1>
                    </div>
                    <p className="text-xl text-gray-300">2026 Game Planning Portfolio</p>
                    <p className="text-sm text-gray-400 mt-2">기획자 이경준</p>
                </div>

                {/* 포트폴리오 카드 그리드 */}
                <div className="grid md:grid-cols-2 gap-8 portfolio-grid">
                    {/* 포트폴리오 1: 넥슨 (기술/시스템) */}
                    <Link href="/pf/nx-k8m2x9q4p7" className="group">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl portfolio-card">
                            <div className="flex items-start justify-between mb-6">
                                <div className="bg-blue-500/20 p-4 rounded-xl card-icon-container">
                                    <FileText className="text-blue-400" size={32} />
                                </div>
                                <ChevronRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" size={24} />
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-3">Technical Portfolio</h2>
                            <p className="text-gray-300 mb-4 leading-relaxed">
                                데이터 기반 시스템 설계 및 기술 기획
                            </p>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                    <span>NEXON Open API 활용</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                    <span>유저 성장 진단 시스템</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                    <span>경제 모니터링 알고리즘</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10">
                                <span className="text-xs text-gray-400">A4 6 pages · PDF Ready</span>
                            </div>
                        </div>
                    </Link>

                    {/* 포트폴리오 2: 커뮤니티/운영 */}
                    <Link href="/pf/cm-w3r5t8y2u6" className="group">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl portfolio-card">
                            <div className="flex items-start justify-between mb-6">
                                <div className="bg-green-500/20 p-4 rounded-xl card-icon-container">
                                    <Users className="text-green-400" size={32} />
                                </div>
                                <ChevronRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" size={24} />
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-3">Community Portfolio</h2>
                            <p className="text-gray-300 mb-4 leading-relaxed">
                                커뮤니티 운영 및 라이브 서비스 분석
                            </p>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                    <span>9년 채널 운영 경험</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                    <span>여론 분석 및 리스크 관리</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                    <span>업데이트 기획 의도 분석</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10">
                                <span className="text-xs text-gray-400">A4 7 pages · PDF Ready</span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* 푸터 */}
                <div className="text-center mt-12">
                    <p className="text-sm text-gray-400">
                        이 페이지는 비공개 링크입니다. 무단 배포를 금지합니다.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        © 2026 Kyungjun Lee. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
