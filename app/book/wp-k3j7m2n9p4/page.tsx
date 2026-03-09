'use client';

import React, { useEffect } from 'react';

export default function BookProposal01Page() {
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
        <div className="book-viewer">
            <style jsx global>{`
                @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                /* 사이트 공통 nav/header 숨김 */
                nav, header { display: none !important; }

                /* 광고 차단 */
                .adsbygoogle, .google-auto-placed,
                iframe[id^="google_ads_iframe"], div[id^="google_ads_iframe"] {
                    display: none !important;
                    height: 0 !important; width: 0 !important;
                    visibility: hidden !important; pointer-events: none !important;
                }

                /* 화면 배경 — /pf 와 동일한 방식 */
                body { background-color: #e8eaf0; }

                .book-viewer {
                    font-family: 'Pretendard', 'Apple SD Gothic Neo', sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                    padding: 2rem 1rem 2.5rem;
                    min-height: 100vh;
                }

                /* ──────────────────────────────
                   A4 용지 — 화면에서도 정확히 297mm
                   /pf 방식 그대로
                ────────────────────────────── */
                .a4-page {
                    width: 210mm;
                    height: 297mm;
                    background: white;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.18);
                    padding: 14mm 16mm 12mm 20mm;
                    box-sizing: border-box;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    color: #1a1a1a;
                }

                /* 상단 컬러 바 */
                .a4-page::before {
                    content: '';
                    position: absolute; top: 0; left: 0; right: 0; height: 5px;
                    background: linear-gradient(90deg, #1e3a5f 0%, #2d5986 45%, #5b4f8e 75%, #1e3a5f 100%);
                }

                /* 제본선 */
                .a4-page::after {
                    content: '';
                    position: absolute; top: 0; left: 16mm; bottom: 0; width: 1px;
                    background: rgba(180,180,180,0.2);
                }

                /* ── 컨트롤 바 ── */
                .ctrl-bar {
                    display: flex; gap: 0.65rem; align-items: center;
                    flex-wrap: wrap; justify-content: center;
                }
                .back-btn {
                    background: rgba(30,58,95,0.12);
                    border: 1px solid rgba(30,58,95,0.25);
                    color: #1e3a5f; padding: 0.5rem 1rem;
                    border-radius: 6px; cursor: pointer;
                    font-size: 0.82rem; text-decoration: none;
                    display: inline-flex; align-items: center; gap: 0.35rem;
                    transition: all 0.2s;
                }
                .back-btn:hover { background: rgba(30,58,95,0.2); }
                .private-badge {
                    background: rgba(220,38,38,0.08);
                    border: 1px solid rgba(220,38,38,0.25);
                    color: #b91c1c; padding: 0.4rem 0.85rem;
                    border-radius: 5px; font-size: 0.77rem; letter-spacing: 0.02em;
                }
                .print-btn {
                    background: #1e3a5f; color: white;
                    border: none; padding: 0.5rem 1.2rem;
                    border-radius: 6px; cursor: pointer;
                    font-size: 0.83rem; font-family: 'Pretendard', sans-serif;
                    transition: background 0.2s;
                }
                .print-btn:hover { background: #2d5986; }

                /* ── 문서 헤더 ── */
                .doc-header {
                    display: flex; justify-content: space-between; align-items: flex-end;
                    margin-bottom: 5mm; padding-bottom: 3mm;
                    border-bottom: 2px solid #1e3a5f;
                    margin-top: 2mm;
                }
                .doc-label { font-size: 7.5pt; color: #6b7280; letter-spacing: 0.1em; font-weight: 600; text-transform: uppercase; }
                .doc-date  { font-size: 7.5pt; color: #6b7280; }

                /* ── 제목 블록 ── */
                .title-section {
                    margin-bottom: 4mm; padding-bottom: 4mm;
                    border-bottom: 1px solid #e5e7eb;
                }
                .main-title {
                    font-size: 20pt; font-weight: 800; color: #0f1c2e;
                    line-height: 1.22; letter-spacing: -0.025em;
                    margin-bottom: 2mm; word-break: keep-all;
                }
                .sub-title {
                    font-size: 10.5pt; color: #111111; font-weight: 500;
                    border-left: 3px solid #2d5986; padding-left: 3mm;
                    margin-bottom: 2.5mm; line-height: 1.4;
                }
                .one-liner {
                    font-size: 9pt; color: #111111; line-height: 1.6; font-style: italic;
                    background: #f8fafc; border: 1px solid #e2e8f0;
                    border-radius: 3px; padding: 2mm 3mm; word-break: keep-all;
                }

                /* ── 섹션 공통 ── */
                .section { margin-bottom: 4mm; }
                .section-title {
                    font-size: 8pt; font-weight: 700; color: #1e3a5f;
                    letter-spacing: 0.08em; text-transform: uppercase;
                    border-bottom: 1.5px solid #1e3a5f;
                    padding-bottom: 0.8mm; margin-bottom: 2mm;
                    display: flex; align-items: center; gap: 2mm;
                }
                .section-title::before {
                    content: ''; width: 2mm; height: 2mm;
                    background: #2d5986; border-radius: 50%; flex-shrink: 0;
                }
                .section-body {
                    font-size: 9pt; color: #111111;
                    line-height: 1.7; word-break: keep-all;
                }

                /* ── 핵심 메시지 ── */
                .message-box {
                    background: #f0f4f9; border: 1px solid #c5d4e8;
                    border-radius: 4px; padding: 2.5mm 3.5mm;
                    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2mm;
                }
                .message-item {
                    display: flex; align-items: flex-start; gap: 2mm;
                    font-size: 8.5pt; color: #1e3a5f; font-weight: 600;
                    line-height: 1.4; word-break: keep-all;
                }
                .message-num {
                    background: #1e3a5f; color: #fff;
                    font-size: 7pt; font-weight: 700;
                    width: 3.5mm; height: 3.5mm; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0; margin-top: 1px;
                }

                /* ── 타깃 리스트 ── */
                .target-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1.2mm; }
                .target-list li {
                    display: flex; align-items: flex-start; gap: 2mm;
                    font-size: 9pt; color: #111111; line-height: 1.55; word-break: keep-all;
                }
                .target-list li::before { content: '▸'; color: #2d5986; font-size: 7.5pt; flex-shrink: 0; margin-top: 1.5px; }

                /* ── 비교표 ── */
                .comp-table { width: 100%; border-collapse: collapse; font-size: 8pt; color: #1f2937; }
                .comp-table th {
                    background: #1e3a5f; color: #fff; padding: 1.8mm 2.5mm;
                    text-align: left; font-weight: 600; font-size: 7.5pt;
                }
                .comp-table td {
                    padding: 1.8mm 2.5mm; border-bottom: 1px solid #e5e7eb;
                    line-height: 1.45; vertical-align: top; word-break: keep-all;
                    color: #111111;
                }
                .comp-table tr:nth-child(even) td { background: #f8fafc; }
                .comp-table tr:last-child td { border-bottom: none; }
                .diff-highlight { color: #1e4d8c; font-weight: 600; }

                /* ── 저자 소개 ── */
                .author-box {
                    background: #fafbfc; border: 1px solid #dde3ec;
                    border-radius: 4px; padding: 2.5mm 3.5mm;
                    display: flex; align-items: flex-start; gap: 3mm;
                }
                .author-icon {
                    width: 8mm; height: 8mm;
                    background: linear-gradient(135deg, #1e3a5f, #4a7cbf);
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;
                    color: white; font-size: 11pt; flex-shrink: 0;
                }
                .author-label { font-size: 7pt; font-weight: 700; color: #1e3a5f; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1mm; }
                .author-text { font-size: 8.5pt; color: #111111; line-height: 1.6; word-break: keep-all; }

                /* ── 푸터 ── */
                .doc-footer {
                    margin-top: auto; padding-top: 3mm;
                    border-top: 1px solid #e5e7eb;
                    display: flex; justify-content: space-between; align-items: center;
                }
                .footer-left  { font-size: 7pt; color: #555555; letter-spacing: 0.04em; }
                .footer-right { font-size: 7pt; color: #555555; }

                /* ── 기밀 스탬프 (화면 전용) ── */
                .confidential-stamp {
                    position: absolute; bottom: 20mm; right: 14mm;
                    border: 2px solid rgba(180,30,30,0.18);
                    color: rgba(180,30,30,0.15);
                    font-size: 9pt; font-weight: 800; letter-spacing: 0.22em;
                    padding: 1.2mm 2.5mm; border-radius: 3px;
                    transform: rotate(-18deg); pointer-events: none; text-transform: uppercase;
                }

                /* ── 하단 안내 ── */
                .bottom-note {
                    font-size: 0.72rem; color: #9ca3af; text-align: center;
                }

                /* ────────────────────────────
                   인쇄 — /pf 방식 그대로
                ──────────────────────────── */
                @page {
                    size: A4 portrait;
                    margin: 0;
                }
                @media print {
                    body { background: white !important; margin: 0 !important; padding: 0 !important; }

                    .book-viewer {
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
                        padding: 14mm 16mm 12mm 20mm !important;
                    }

                    .ctrl-bar, .bottom-note, .confidential-stamp { display: none !important; }

                    /* 색상 보존 — 배경색·그라디언트 인쇄 */
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }

                /* 모바일 */
                @media screen and (max-width: 768px) {
                    .a4-page {
                        width: 100% !important;
                        height: auto !important;
                        overflow: visible !important;
                        padding: 20px !important;
                    }
                    .main-title { font-size: 15pt !important; }
                    .message-box { grid-template-columns: 1fr !important; }
                }
            `}</style>

            {/* 컨트롤 바 */}
            <div className="ctrl-bar">
                <a href="/book" className="back-btn">← 목록으로</a>
                <div className="private-badge">🔒 비공개 · 무단 배포 금지</div>
                <button className="print-btn" onClick={() => window.print()}>🖨️ PDF로 저장 (A4)</button>
            </div>

            {/* ══════════ A4 용지 ══════════ */}
            <div className="a4-page">

                {/* 헤더 */}
                <div className="doc-header">
                    <div className="doc-label">도서 1페이지 기획서 · 최종 투고용</div>
                    <div className="doc-date">2026년 3월</div>
                </div>

                {/* 제목 */}
                <div className="title-section">
                    <div className="main-title">우리는 왜 이를 악물고 버티는가</div>
                    <div className="sub-title">무의미한 세상에 내 존재의 닻을 내리는 법</div>
                    <div className="one-liner">
                        삶의 부조리를 부정하지 않으면서도, 그 속에서 무너지지 않고 살아가는 인간의 태도를 탐구하는 철학 에세이.
                    </div>
                </div>

                {/* 책 소개 */}
                <div className="section">
                    <div className="section-title">책 소개</div>
                    <div className="section-body">
                        우리는 흔히 노력하면 보상받고, 삶이 의미로 가득할 것이라 기대하지만 현실은 그렇지 않다. 이 책은 삶의 부조리와 고통을 섣불리 부정하지 않고, 정직하게 바라보는 데서 출발한다. 긍정을 설교하거나 희망을 강요하지 않는다. 대신 묻는다. "우리는 왜 이렇게까지 버티며 살아가는가." 실존주의와 스토아 철학, 니체의 사상을 바탕으로, 얄팍한 위로의 언어 대신 삶의 무게 속에서도 무너지지 않고 내면을 지탱하는 '버티는 철학'을 이야기한다.
                    </div>
                </div>

                {/* 핵심 메시지 */}
                <div className="section">
                    <div className="section-title">핵심 메시지</div>
                    <div className="message-box">
                        <div className="message-item">
                            <span className="message-num">1</span>
                            <span>삶은 원래 고단하다.</span>
                        </div>
                        <div className="message-item">
                            <span className="message-num">2</span>
                            <span>의미는 주어지는 것이 아니라 만들어지는 것이다.</span>
                        </div>
                        <div className="message-item">
                            <span className="message-num">3</span>
                            <span>인간은 결국 버티는 존재다.</span>
                        </div>
                    </div>
                </div>

                {/* 시장성 및 타깃 독자 */}
                <div className="section">
                    <div className="section-title">시장성 및 타깃 독자</div>
                    <div className="section-body" style={{ marginBottom: '1.5mm' }}>
                        불안과 피로, 번아웃이 일상화된 2020년대 후반, 『트렌드 코리아 2026』 장기 베스트 1위 현상이나 『위버멘쉬』 등 니체 입문서의 인기에서 보듯 불확실성 시대의 '본질' 탐구 수요가 폭발하고 있다. 맹목적인 긍정을 넘어 '희망 없이도 단단하게 버티는 법'을 묻는 독자층이 급증하는 가운데, 본서는 다음과 같은 독자를 명확한 타깃으로 삼아 틈새를 공략한다.
                    </div>
                    <ul className="target-list">
                        <li>현실의 무게 속에서도 기어코 버티며 살아가는 3040 직장인 및 자영업자</li>
                        <li>자기계발서의 과도한 긍정과 무책임한 힐링 에세이에 피로를 느끼는 독자</li>
                        <li>철학을 관념이 아닌 내 삶의 생존 무기로 연결해 읽고 싶은 독자</li>
                    </ul>
                </div>

                {/* 경쟁 도서 및 차별점 */}
                <div className="section">
                    <div className="section-title">경쟁 도서 및 차별점</div>
                    <table className="comp-table">
                        <thead>
                            <tr>
                                <th style={{ width: '34%' }}>비교 도서</th>
                                <th>본서의 차별점</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>『마흔에 읽는 쇼펜하우어』<br /><span style={{ fontSize: '7pt', color: '#6b7280' }}>35만 부↑, 철학 교양서 종합 1위</span></td>
                                <td>실천법·처세술 나열에 그치지 않고, <span className="diff-highlight">부조리를 직시하며 '버티는 태도' 그 자체의 숭고함</span>을 깊이 있게 탐구</td>
                            </tr>
                            <tr>
                                <td>『피로사회』(한병철)<br /><span style={{ fontSize: '7pt', color: '#6b7280' }}>거시적 사회 비판, 학술적 논의</span></td>
                                <td>거시 담론이 아닌 <span className="diff-highlight">평범한 개인의 일상적 생존과 실존</span>으로 시선을 낮추어 짙은 공감대 형성</td>
                            </tr>
                            <tr>
                                <td>감정 위로 에세이류<br /><span style={{ fontSize: '7pt', color: '#6b7280' }}>일시적 공감, 감정적 위안 중심</span></td>
                                <td>일시적 감정 위안을 넘어 <span className="diff-highlight">고통을 땔감 삼아 내면의 닻을 내리는</span> 근본적 철학 사유 제공</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 저자 소개 */}
                <div className="section">
                    <div className="section-title">저자 소개</div>
                    <div className="author-box">
                        <div className="author-icon">✍</div>
                        <div>
                            <div className="author-label">Author</div>
                            <div style={{ fontSize: '10.5pt', fontWeight: 700, color: '#111111', marginBottom: '1.5mm' }}>이경준</div>
                            <div style={{ fontSize: '8pt', color: '#2d5986', marginBottom: '2mm' }}>p6092@Naver.com</div>
                            <div className="author-text">
                                저자는 신학을 공부하며 인간 존재와 고통의 본질, 삶의 의미에 대한 질문을 오랫동안 탐구해왔다. 책상머리의 철학에 머물지 않고, 일상의 최전선에서 이를 악물고 묵묵히 버텨내는 수많은 사람들의 치열한 궤적을 직접 마주하고 기록하며 이 책을 완성했다. 종교적 교리나 섣부른 위로가 아닌, 철학과 삶의 접점에서 인간이 어떻게 존엄하게 버티며 살아가는지를 사유한다.
                            </div>
                        </div>
                    </div>
                </div>

                {/* 기밀 스탬프 */}
                <div className="confidential-stamp">Confidential</div>

                {/* 문서 푸터 */}
                <div className="doc-footer">
                    <div className="footer-left">비공개 투고용 기획서 · 무단 배포 및 복제 금지</div>
                    <div className="footer-right">© 2026 All rights reserved.</div>
                </div>
            </div>
            {/* ══════════ / A4 용지 ══════════ */}

            {/* ══════════ A4 2페이지: 목차 ══════════ */}
            <div className="a4-page">

                {/* 헤더 */}
                <div className="doc-header">
                    <div className="doc-label">목차 · Table of Contents</div>
                    <div className="doc-date">2 / 2</div>
                </div>

                {/* 책 제목 */}
                <div style={{ marginBottom: '7mm', paddingBottom: '5mm', borderBottom: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '16pt', fontWeight: 800, color: '#0f1c2e', letterSpacing: '-0.02em', marginBottom: '2mm', wordBreak: 'keep-all' }}>
                        우리는 왜 이를 악물고 버티는가
                    </div>
                    <div style={{ fontSize: '10pt', color: '#444', borderLeft: '3px solid #2d5986', paddingLeft: '3mm' }}>
                        무의미한 세상에 내 존재의 닻을 내리는 법
                    </div>
                </div>

                {/* 목차 본문 — 2단 레이아웃 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 6mm', flex: 1 }}>

                    {/* ── 왼쪽 열 ── */}
                    <div>
                        {/* 프롤로그 */}
                        <div style={{ marginBottom: '7mm' }}>
                            <div style={{ fontSize: '9.5pt', fontWeight: 700, color: '#1e3a5f', borderBottom: '1.5px solid #1e3a5f', paddingBottom: '1.2mm', marginBottom: '2.5mm', letterSpacing: '0.04em' }}>
                                [프롤로그] 왜 우리는 도망치지 않는가
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '2mm' }}>
                                <li style={{ fontSize: '9pt', color: '#111', lineHeight: 1.75, paddingLeft: '3mm', position: 'relative', wordBreak: 'keep-all' }}>
                                    <span style={{ position: 'absolute', left: 0, color: '#2d5986' }}>·</span>
                                    쓰러지는 것보다 버티는 것이 더 고통스러운 밤에
                                </li>
                                <li style={{ fontSize: '9pt', color: '#111', lineHeight: 1.75, paddingLeft: '3mm', position: 'relative', wordBreak: 'keep-all' }}>
                                    <span style={{ position: 'absolute', left: 0, color: '#2d5986' }}>·</span>
                                    희망을 강요하는 세상에서, 희망 없이도 살아가는 법을 묻다
                                </li>
                            </ul>
                        </div>

                        {/* 1장 */}
                        <div style={{ marginBottom: '7mm' }}>
                            <div style={{ fontSize: '9.5pt', fontWeight: 700, color: '#1e3a5f', borderBottom: '1.5px solid #1e3a5f', paddingBottom: '1.2mm', marginBottom: '2.5mm', letterSpacing: '0.04em' }}>
                                [1장] 삶을 정직하게 바라보기
                            </div>
                            <div style={{ fontSize: '8.5pt', color: '#444', marginBottom: '2mm', fontStyle: 'italic' }}>삶은 원래 고단하다는 담담한 위로</div>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '2mm' }}>
                                {[
                                    '착각의 끝: 세상은 내게 친절할 의무가 없다',
                                    '채워도 채워지지 않는 마음: 우리는 왜 끊임없이 흔들리는가',
                                    `고통은 불행이 아니다: '왜 나만 힘들까'라는 억울함에서 빠져나오기`,
                                    '상처 입은 동지들: 길 위에서 이 악물고 걷고 있는 수많은 사람들',
                                ].map((item, i) => (
                                    <li key={i} style={{ fontSize: '9pt', color: '#111', lineHeight: 1.75, paddingLeft: '3mm', position: 'relative', wordBreak: 'keep-all' }}>
                                        <span style={{ position: 'absolute', left: 0, color: '#2d5986' }}>·</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 2장 */}
                        <div style={{ marginBottom: '7mm' }}>
                            <div style={{ fontSize: '9.5pt', fontWeight: 700, color: '#1e3a5f', borderBottom: '1.5px solid #1e3a5f', paddingBottom: '1.2mm', marginBottom: '2.5mm', letterSpacing: '0.04em' }}>
                                [2장] 단단한 마음의 방패
                            </div>
                            <div style={{ fontSize: '8.5pt', color: '#444', marginBottom: '2mm', fontStyle: 'italic' }}>통제할 수 없는 세상에서 나를 지키는 법</div>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '2mm' }}>
                                {[
                                    '선 긋기의 기술: 세상의 폭풍과 내 마음 분리하기',
                                    '감정의 주도권: 상처받을지 말지는 내가 결정한다',
                                    '비교를 멈추는 몰입의 힘: 시끄러운 세상에서 나만의 선을 묵묵히 긋는 일',
                                    '오늘 치의 구원: 거창한 내일 대신, 오늘 하루의 책임을 다하는 존엄',
                                ].map((item, i) => (
                                    <li key={i} style={{ fontSize: '9pt', color: '#111', lineHeight: 1.75, paddingLeft: '3mm', position: 'relative', wordBreak: 'keep-all' }}>
                                        <span style={{ position: 'absolute', left: 0, color: '#2d5986' }}>·</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ── 오른쪽 열 ── */}
                    <div>
                        {/* 3장 */}
                        <div style={{ marginBottom: '7mm' }}>
                            <div style={{ fontSize: '9.5pt', fontWeight: 700, color: '#1e3a5f', borderBottom: '1.5px solid #1e3a5f', paddingBottom: '1.2mm', marginBottom: '2.5mm', letterSpacing: '0.04em' }}>
                                [3장] 주어진 삶을 껴안다
                            </div>
                            <div style={{ fontSize: '8.5pt', color: '#444', marginBottom: '2mm', fontStyle: 'italic' }}>고통을 나를 키우는 땔감으로 삼는 법</div>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '2mm' }}>
                                {[
                                    '고난을 견디는 인간: 피할 수 없는 아픔을 정면으로 마주할 때',
                                    '깨어짐과 나아감: 낡은 나를 부수고 더 단단해지는 과정',
                                    '내 삶의 의미는 내가 정한다: 주어지는 정답은 없다, 내가 만들 뿐이다',
                                    '버텨낸 자의 훈장: 나의 치열한 생존이 누군가의 이정표가 될 때',
                                ].map((item, i) => (
                                    <li key={i} style={{ fontSize: '9pt', color: '#111', lineHeight: 1.75, paddingLeft: '3mm', position: 'relative', wordBreak: 'keep-all' }}>
                                        <span style={{ position: 'absolute', left: 0, color: '#2d5986' }}>·</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 4장 */}
                        <div style={{ marginBottom: '7mm' }}>
                            <div style={{ fontSize: '9.5pt', fontWeight: 700, color: '#1e3a5f', borderBottom: '1.5px solid #1e3a5f', paddingBottom: '1.2mm', marginBottom: '2.5mm', letterSpacing: '0.04em' }}>
                                [4장] 이 악문 당신의 삶은 하나의 거대한 반항이다
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '2mm' }}>
                                {[
                                    '무기력을 무너뜨리다: 포기하지 않고 살아내는 가장 우아한 복수',
                                    '변명하지 않는 삶: 남 탓을 멈추고 내 삶의 운전대를 쥐는 고독',
                                    '사랑이라는 이름의 책임감: 나를 지탱하게 만드는, 나보다 무거운 존재들',
                                    '섣불리 절망하지 않을 용기: 정답 없는 삶을 끝까지 살아내겠다는 약속',
                                ].map((item, i) => (
                                    <li key={i} style={{ fontSize: '9pt', color: '#111', lineHeight: 1.75, paddingLeft: '3mm', position: 'relative', wordBreak: 'keep-all' }}>
                                        <span style={{ position: 'absolute', left: 0, color: '#2d5986' }}>·</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 에필로그 */}
                        <div style={{ marginBottom: '7mm' }}>
                            <div style={{ fontSize: '9.5pt', fontWeight: 700, color: '#1e3a5f', borderBottom: '1.5px solid #1e3a5f', paddingBottom: '1.2mm', marginBottom: '2.5mm', letterSpacing: '0.04em' }}>
                                [에필로그] 당신의 꽉 쥔 주먹은 결코 초라하지 않다
                            </div>
                        </div>

                        {/* 부록 */}
                        <div style={{ marginBottom: '7mm' }}>
                            <div style={{ fontSize: '9.5pt', fontWeight: 700, color: '#1e3a5f', borderBottom: '1.5px solid #1e3a5f', paddingBottom: '1.2mm', marginBottom: '2.5mm', letterSpacing: '0.04em' }}>
                                [부록] 이 책을 관통하는 철학과 사유들
                            </div>
                        </div>

                        {/* 총평 박스 */}
                        <div style={{ background: '#f0f4f9', border: '1px solid #c5d4e8', borderRadius: '4px', padding: '2.5mm 3mm', marginTop: 'auto' }}>
                            <div style={{ fontSize: '7.5pt', fontWeight: 700, color: '#1e3a5f', marginBottom: '1mm' }}>구성 개요</div>
                            <div style={{ fontSize: '7.5pt', color: '#111', lineHeight: 1.6 }}>
                                프롤로그 + 본문 4장 + 에필로그 + 부록
                            </div>
                        </div>
                    </div>
                </div>

                {/* 푸터 */}
                <div className="doc-footer">
                    <div className="footer-left">비공개 투고용 목차 · 무단 배포 및 복제 금지</div>
                    <div className="footer-right">© 2026 All rights reserved.</div>
                </div>
            </div>
            {/* ══════════ / A4 2페이지 ══════════ */}

            <p className="bottom-note">이 문서는 비공개이며 검색 엔진에 노출되지 않습니다.</p>
        </div>
    );
}
