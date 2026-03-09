'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

const mobileStyles = `
  @media (max-width: 768px) {
    .book-index-container { padding: 1rem !important; }
    .book-grid { grid-template-columns: 1fr !important; gap: 1.2rem !important; }
    .book-card { padding: 1.5rem !important; }
    .index-title { font-size: 1.8rem !important; }
  }
`;

export default function BookIndexPage() {
    useEffect(() => {
        const removeAds = () => {
            const adSelectors = [
                '.adsbygoogle', '.google-auto-placed',
                'iframe[id^="google_ads_iframe"]',
                'div[id^="google_ads_iframe"]',
                'ins.adsbygoogle', '[data-ad-client]', '[data-google-query-id]'
            ];
            adSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(el => el.remove());
            });
        };
        removeAds();
        const interval = setInterval(removeAds, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 flex items-center justify-center p-8 book-index-container">
            <style jsx global>{`
                @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
                body { font-family: 'Pretendard', sans-serif; }
                nav, header { display: none !important; }
                .adsbygoogle, .google-auto-placed,
                iframe[id^="google_ads_iframe"], div[id^="google_ads_iframe"] {
                    display: none !important;
                    height: 0 !important; width: 0 !important;
                    overflow: hidden !important; visibility: hidden !important;
                    pointer-events: none !important;
                }

                .book-card {
                    background: rgba(255,255,255,0.07);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255,255,255,0.12);
                    border-radius: 18px;
                    padding: 2rem;
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .book-card:hover {
                    background: rgba(255,255,255,0.12);
                    border-color: rgba(255,255,255,0.25);
                    transform: translateY(-4px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.35);
                }

                .genre-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    padding: 0.3rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 0.04em;
                    margin-bottom: 1rem;
                    width: fit-content;
                }

                .card-arrow {
                    color: rgba(255,255,255,0.35);
                    font-size: 1.2rem;
                    transition: all 0.25s ease;
                    flex-shrink: 0;
                }
                .book-card:hover .card-arrow {
                    color: rgba(255,255,255,0.9);
                    transform: translateX(4px);
                }

                .dot-list { list-style: none; padding: 0; gap: 0.4rem; display: flex; flex-direction: column; }
                .dot-list li {
                    display: flex; align-items: flex-start; gap: 0.5rem;
                    font-size: 0.82rem; color: rgba(255,255,255,0.5); line-height: 1.5;
                }
                .dot { width: 6px; height: 6px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
            `}</style>
            <style dangerouslySetInnerHTML={{ __html: mobileStyles }} />

            <div className="max-w-5xl w-full">
                {/* 헤더 */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-2xl">📚</span>
                        <h1 className="text-4xl font-bold text-white index-title">Book Proposals</h1>
                    </div>
                    <p className="text-lg text-gray-300">도서 기획서 모음</p>
                    <p className="text-sm text-gray-500 mt-1">비공개 링크 · 무단 배포 금지</p>
                </div>

                {/* 기획서 카드 그리드 */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 book-grid">

                    {/* ── 기획서 1: 이를 악물고 살아가는가 ── */}
                    <Link href="/book/wp-k3j7m2n9p4" className="group h-full">
                        <div className="book-card">
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className="genre-badge"
                                    style={{ background: 'rgba(109,40,217,0.25)', border: '1px solid rgba(109,40,217,0.4)', color: '#c4b5fd' }}
                                >
                                    <span>📖</span> 철학 에세이
                                </div>
                                <span className="card-arrow">→</span>
                            </div>

                            <h2 className="text-xl font-bold text-white mb-2 leading-snug" style={{ wordBreak: 'keep-all' }}>
                                우리는 왜 이를 악물고 버티는가
                            </h2>
                            <p className="text-sm text-gray-400 mb-4 leading-relaxed" style={{ wordBreak: 'keep-all' }}>
                                무의미한 세상에 내 존재의 닻을 내리는 법
                            </p>

                            <ul className="dot-list mb-5">
                                <li>
                                    <span className="dot" style={{ background: '#a78bfa' }}></span>
                                    실존주의 · 스토아 · 니체 사상 기반
                                </li>
                                <li>
                                    <span className="dot" style={{ background: '#a78bfa' }}></span>
                                    3040 직장인 · 번아웃 독자 타깃
                                </li>
                                <li>
                                    <span className="dot" style={{ background: '#a78bfa' }}></span>
                                    '버티는 철학' — 부조리 직시형 에세이
                                </li>
                            </ul>

                            <div className="mt-auto pt-5 border-t border-white/10">
                                <span className="text-xs text-gray-500">A4 1page · 최종 투고용 · 2026.03</span>
                            </div>
                        </div>
                    </Link>

                    {/* ── 빈 슬롯 (다음 기획서용) ── */}
                    <div className="book-card" style={{ opacity: 0.35, cursor: 'default', border: '1px dashed rgba(255,255,255,0.15)' }}>
                        <div className="flex items-center justify-center h-full" style={{ minHeight: '180px' }}>
                            <div className="text-center">
                                <div className="text-4xl mb-3" style={{ opacity: 0.4 }}>+</div>
                                <p className="text-sm text-gray-500">다음 기획서 추가 예정</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 푸터 */}
                <div className="text-center mt-12">
                    <p className="text-sm text-gray-500">
                        이 페이지는 비공개 링크입니다. 무단 배포를 금지합니다.
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                        © 2026 All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
