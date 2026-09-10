'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ImageCardProps {
    src: string;
    alt: string;
    caption: string;
    badge?: string;
    priority?: boolean;
}

function ImageCard({ src, alt, caption, badge, priority = false }: ImageCardProps) {
    return (
        <figure className="my-6 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-xl shadow-black/40 hover:border-amber-500/50 transition-all duration-300">
            <div className="relative w-full aspect-video bg-black/60 flex items-center justify-center overflow-hidden">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                    className="object-contain hover:scale-105 transition-transform duration-300"
                    priority={priority}
                />
                {badge && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-md backdrop-blur-sm">
                        {badge}
                    </span>
                )}
            </div>
            <figcaption className="px-4 py-3 bg-slate-800/80 border-t border-slate-700/60 text-center text-sm font-medium text-slate-100 flex items-center justify-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>{caption}</span>
            </figcaption>
        </figure>
    );
}

function YouTubePlayer({ 
    videoId, 
    title, 
    thumbSrc,
    badgeText = "공식 티저 영상",
    themeColor = "cyan"
}: { 
    videoId: string; 
    title: string; 
    thumbSrc: string;
    badgeText?: string;
    themeColor?: "cyan" | "pink";
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const isPink = themeColor === 'pink';

    return (
        <div className={`my-6 rounded-2xl overflow-hidden border ${isPink ? 'border-pink-500/40 shadow-pink-950/40' : 'border-cyan-500/40 shadow-cyan-950/40'} bg-slate-900/90 shadow-2xl`}>
            <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                {isPlaying ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                    />
                ) : (
                    <button
                        type="button"
                        onClick={() => setIsPlaying(true)}
                        className="group relative w-full h-full flex items-center justify-center cursor-pointer focus:outline-none"
                        aria-label={`${title} 재생`}
                    >
                        <Image
                            src={thumbSrc}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 900px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
                        
                        {/* 중앙 재생 버튼 */}
                        <div className="relative z-10 flex flex-col items-center gap-3">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-500/60 group-hover:scale-110 transition-all duration-300 border-2 border-white/30">
                                <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-slate-950/80 text-white border shadow-lg transition-colors ${
                                isPink ? 'border-pink-500/40 group-hover:bg-pink-950/80 group-hover:text-pink-300' : 'border-cyan-500/40 group-hover:bg-cyan-950/80 group-hover:text-cyan-300'
                            }`}>
                                ▶ 클릭하여 {badgeText} 재생
                            </span>
                        </div>

                        {/* 상단 뱃지 */}
                        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-sm ${
                            isPink ? 'bg-pink-500 text-slate-950' : 'bg-cyan-500 text-slate-950'
                        }`}>
                            {badgeText}
                        </span>
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-bold bg-red-600 text-white backdrop-blur-sm flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            YouTube
                        </span>
                    </button>
                )}
            </div>
            <div className="px-4 py-3 bg-slate-800/90 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-200">
                <span className="font-semibold text-slate-100 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${isPink ? 'bg-pink-400' : 'bg-cyan-400'}`}></span>
                    {title}
                </span>
                <a
                    href={`https://youtu.be/${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-slate-400 transition-colors flex items-center gap-1 ${isPink ? 'hover:text-pink-300' : 'hover:text-cyan-300'}`}
                >
                    YouTube에서 직접 보기 ↗
                </a>
            </div>
        </div>
    );
}

export default function MapleNowSep10RecapPage() {
    const [activeTab, setActiveTab] = useState<'all' | 'skill' | 'economy' | 'content' | 'mvp' | 'collab'>('all');

    return (
        <article className="min-h-screen bg-slate-950 text-white font-sans selection:bg-amber-500 selection:text-slate-950 pb-24">
            {/* 상단 네비게이션 */}
            <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between text-sm">
                    <Link href="/blog" className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold transition-colors">
                        ← 블로그 목록으로
                    </Link>
                    <div className="flex items-center gap-2 text-slate-300 text-xs">
                        <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 font-bold animate-pulse">LIVE 속보</span>
                        <span>2026.09.10 메이플NOW</span>
                    </div>
                </div>
            </div>

            {/* 헤더 섹션 */}
            <header className="max-w-4xl mx-auto px-4 pt-10 pb-8 border-b border-slate-800/80">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        메이플NOW 총정리
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        공식 발표 슬라이드 78장 풀수록
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        9월 17일 본섭 적용
                    </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug mb-4">
                    🍁 【9월 10일 메이플NOW 총정리】 가을 대격변 완벽 요약 (이미지 78장 풀수록)
                </h1>
                <p className="text-lg text-slate-200 leading-relaxed font-normal mb-6">
                    스킬 최신화(이동기 편차 완화·시너지 개인화)부터 보스 결정석 반토막 너프 및 주간 12개 제한 전격 해제, 
                    소울 에테르 4단계 증폭, 280+ 퍼스널 버닝, 신규 에픽던전 <strong className="text-amber-400">아우룸 레기스</strong>, 
                    18성급 <strong className="text-emerald-400">어센던트 펄스 링</strong>, 첫 줄 고정 <strong className="text-purple-400">프라임 큐브</strong>, 
                    그리고 <strong className="text-pink-400">캐치! 티니핑 3D 자석펫</strong> &amp; <strong className="text-cyan-400">블루 아카이브 콜라보</strong>까지! 
                    9월 10일 메이플NOW에서 발표된 모든 내용을 슬라이드 78장과 함께 빠짐없이 총정리했습니다.
                </p>

                {/* 타이틀 오프닝 이미지 */}
                <ImageCard
                    src="/images/blog/maplenow-sep17/maplenow_img_01.jpg"
                    alt="메이플스토리 NOW 9월 10일 방송 오프닝 화면"
                    caption="2026년 9월 10일 메이플NOW 라이브 방송 개막 (9월 17일 목요일 패치 적용)"
                    badge="메이플NOW 라이브"
                    priority={true}
                />

                <ImageCard
                    src="/images/blog/maplenow-sep17/maplenow_img_02.jpg"
                    alt="메이플NOW 5대 핵심 발표 목차"
                    caption="메이플스토리 역사상 가장 내용이 많은 역대급 가을 대규모 업데이트 5대 핵심 목차"
                    badge="5대 아젠다"
                />

                {/* 퀵 점프 탭 바 */}
                <div className="mt-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <p className="text-xs font-bold text-amber-400 mb-3 tracking-wide uppercase">빠른 섹션 이동</p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        <a href="#sec-skill" className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-center text-xs font-bold text-slate-100 hover:text-amber-400 transition-colors">
                            ⚔️ 1. 스킬 최신화
                        </a>
                        <a href="#sec-economy" className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-center text-xs font-bold text-slate-100 hover:text-amber-400 transition-colors">
                            💰 2. 경제·성장 개편
                        </a>
                        <a href="#sec-content" className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-center text-xs font-bold text-slate-100 hover:text-amber-400 transition-colors">
                            ✨ 3. 컨텐츠·버닝
                        </a>
                        <a href="#sec-mvp" className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-center text-xs font-bold text-slate-100 hover:text-amber-400 transition-colors">
                            💎 4. MVP·마일리지
                        </a>
                        <a href="#sec-collab" className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-center text-xs font-bold text-slate-100 hover:text-pink-400 transition-colors">
                            🎀 5. 티니핑·블아
                        </a>
                    </div>
                </div>
            </header>

            {/* 본문 콘텐츠 */}
            <main className="max-w-4xl mx-auto px-4 pt-10 space-y-20">

                {/* ============================================================== */}
                {/* SECTION 1: 스킬 개편 */}
                {/* ============================================================== */}
                <section id="sec-skill" className="scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 font-black flex items-center justify-center border border-amber-500/30 text-lg">
                            1
                        </span>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                                스킬 최신화 대개편
                            </h2>
                            <p className="text-sm text-slate-300 font-medium">
                                이동기 편차 완화 · 시너지 개인화 · 직업 구조 개편 · HEXA 초기화 지원
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 text-slate-100 leading-relaxed font-normal text-base">
                        <p className="text-white">
                            운영진은 이번 스킬 밸런스 패치의 총괄 키워드를 <strong className="text-amber-400">‘최신화’</strong>로 정의했습니다. 
                            단순 수치 조정을 넘어 구시대적인 이동기 메커니즘을 현대화하고, 파티 조합을 강제하던 시너지 구조를 전면 해체하여 
                            모든 유저가 동등한 전투 환경을 누릴 수 있도록 대변혁을 단행했습니다.
                        </p>

                        <ImageCard
                            src="/images/blog/maplenow-sep17/maplenow_img_03.jpg"
                            alt="스킬 개편 인트로 화면"
                            caption="스킬 개편 핵심 철학: 전직업 시스템 최신화 선언"
                        />

                        <ImageCard
                            src="/images/blog/maplenow-sep17/maplenow_img_04.jpg"
                            alt="스킬 개편 5대 대변화 로드맵 슬라이드"
                            caption="스킬 개편 5대 대변화: 1. 이동기 편차 완화 / 2. 시너지 개인화 / 3. 설치기 보스전 실전성 / 4. 데미지 비중 재분배 / 5. 구조 개편"
                            badge="5대 로드맵"
                        />

                        {/* 소주제 1: 이동기 편차 완화 */}
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                            <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
                                <span>🚀 1. 이동기 편차 완화 (더블점프·돌진기 자유도 극대화)</span>
                            </h3>
                            <p className="text-white">
                                기존 텔레포트 직업군에 비해 압도적으로 불리했던 더블점프 및 돌진기 보유 직업들의 기동성이 대폭 상향되었습니다:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-white font-medium pl-2">
                                <li><strong className="text-amber-300">공격 중 동시 이동 시전:</strong> 텔레포트처럼 더블점프나 돌진기를 사용하면서 동시에 주력 공격 스킬을 시전할 수 있습니다.</li>
                                <li><strong className="text-amber-300">윗점프 ↔ 더블점프 양방향 연계:</strong> 윗점프 후 더블점프, 더블점프 후 윗점프 연계가 전직업 전면 허용됩니다.</li>
                                <li><strong className="text-amber-300">돌진기 거리 증가 &amp; 데미지 삭제:</strong> 보스 공격 패턴을 회피하기 쉽도록 돌진 거리를 텔포급으로 연장하고, 공격 판정을 지워 순수 회피 유틸로 최적화했습니다.</li>
                            </ul>

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_05.jpg"
                                alt="이동기 편차 완화 공식 슬라이드"
                                caption="텔레포트 대비 불리했던 기동성 격차 해소 — 이동기 편차 완화 선언"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_06.jpg"
                                alt="이동기 사용 중 공격 동시 시전 지원 슬라이드"
                                caption="더블점프 및 돌진기 사용 중 주력 스킬 공격 동시 시전 지원"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_07.jpg"
                                alt="윗점프 더블점프 양방향 연계 슬라이드"
                                caption="윗점프 ↔ 더블점프 양방향 연계로 공중 패턴 회피력 대폭 강화"
                            />
                        </div>

                        {/* 소주제 2: 직업 구조 개편 */}
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                            <h3 className="text-xl font-bold text-amber-300 flex items-center gap-2">
                                <span>🛡️ 2. 시너지 개인화 &amp; 핵심 직업 구조 대개편</span>
                            </h3>
                            <p className="text-white">
                                비숍의 &lt;프레이&gt;, 팔라딘의 &lt;홀리 유니티&gt;를 비롯한 모든 파티 시너지 스킬이 <strong>개인 버프(자버프/최종뎀)</strong>로 전환되었습니다. 
                                또한 보스에게 걸던 방어율 무시 및 데미지 증가 디버프도 본인에게만 적용되어 파티 조합 스트레스가 원천 차단됩니다.
                            </p>
                            <p className="text-white">
                                불합리한 게이지 및 반격 메커니즘으로 고통받던 직업들도 구조적 탈바꿈을 겪었습니다:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-white font-medium pl-2">
                                <li><strong className="text-cyan-300">패스파인더 &amp; 호영:</strong> 패파는 유저 스트레스 1위였던 렐릭 게이지를 완전 삭제, 호영은 복잡한 부적/두루마리 게이지를 1개로 통일.</li>
                                <li><strong className="text-cyan-300">미하일:</strong> 타이밍 반격 스트레스였던 로얄 가드의 반격 데미지 삭제 ➔ 가드 성공 시 공격력 버프 획득 방식으로 개편.</li>
                                <li><strong className="text-cyan-300">데몬어벤져:</strong> HP 감소 시 데미지 증가는 유지하되, 회복 시 딜이 깎이던 불합리한 구조를 영구 패시브화.</li>
                                <li><strong className="text-cyan-300">엔젤릭버스터:</strong> 캐시 장비 아이템 능력치 적용 방식 본섭 사전 공지 안내.</li>
                            </ul>

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_08.jpg"
                                alt="직업 구조 개편 패스파인더 및 호영 슬라이드"
                                caption="5. 직업 구조 개편 — 패스파인더 렐릭 게이지 삭제 & 호영 게이지 1개 통일"
                                badge="구조 대개편"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_09.jpg"
                                alt="직업 구조 개편 미하일 로얄가드 슬라이드"
                                caption="5. 직업 구조 개편 — 미하일 로얄가드 반격 딜 삭제 및 공격력 버프화"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_10.jpg"
                                alt="직업 구조 개편 데몬어벤져 슬라이드"
                                caption="5. 직업 구조 개편 — 데몬어벤져 HP 감소 딜 패시브화"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_11.jpg"
                                alt="HEXA 매트릭스 초기화 스크롤 및 어빌리티 체인저 지급 슬라이드"
                                caption="★ 6차 코어 투자 손실 방지: 260+ 유저 전원 HEXA 초기화 스크롤 & 어빌리티 체인저 지급!"
                                badge="전원 보상"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_12.jpg"
                                alt="엔젤릭버스터 캐시 장비 아이템 능력치 적용 방식 변경 안내"
                                caption="9/17(목) 엔젤릭버스터 캐시 장비 아이템 능력치 적용 방식 변경 사전 공지"
                            />

                            {/* 엔젤릭버스터 사전 안내 공지 상세 박스 */}
                            <div className="p-5 rounded-xl bg-slate-950/80 border border-pink-500/30 space-y-3 mt-4">
                                <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
                                    <span>📢 공식 공지 상세: 엔젤릭버스터 캐시 장비 능력치 단일화 &amp; 교환가능 재지급</span>
                                </div>
                                <div className="text-xs text-slate-200 space-y-2 leading-relaxed">
                                    <p className="text-white">
                                        기존 엔버는 일반 모드와 드레스 업 모드 양쪽에 라벨 캐시템을 착용해야 스탯/세트옵션을 온전히 챙길 수 있었으나, 
                                        <strong> 9월 17일(목) 점검 후부터는 오직 [드레스 업 모드 슬롯]의 캐시 장비 능력치만 단독 적용</strong>되도록 시스템이 변경됩니다.
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                                        <li><strong>무기 &amp; 반지:</strong> 드레스 업 모드에 슬롯이 없으므로 예외적으로 일반 모드 슬롯 능력치 유지 적용.</li>
                                        <li><strong>일반 모드 &amp; 코디 프리셋:</strong> 모자/한벌옷/망토 등의 능력치는 전면 미적용.</li>
                                    </ul>
                                    <div className="p-3 rounded-lg bg-pink-950/30 border border-pink-500/20 text-slate-100">
                                        <p className="font-bold text-pink-300 mb-1">🎁 중복 라벨 아이템 &lsquo;교환 가능&rsquo; 상태 재지급 구제책</p>
                                        <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-300">
                                            <li><strong>대상 시점:</strong> 2026년 9월 10일(목) 16:55 이전 기준 중복 보유 캐릭터</li>
                                            <li><strong>대상 부위:</strong> 모자, 장갑, 망토 부위 교불 마스터/블랙/레드 라벨 (STR/DEX 유효옵 보유)</li>
                                            <li><strong>재지급 방식:</strong> 전투력이 더 적게 오르는 1개를 회수 후 <strong>9/17(목) 패치 시 캐시 보관함에 &lsquo;교환 가능&rsquo; 상태로 재지급</strong> (메이플 옥션 판매 가능!)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* SECTION 2: 경제 및 성장 시스템 */}
                {/* ============================================================== */}
                <section id="sec-economy" className="scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center border border-emerald-500/30 text-lg">
                            2
                        </span>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                                경제 &amp; 성장 시스템 대개편
                            </h2>
                            <p className="text-sm text-slate-300 font-medium">
                                보스 결정석 가격 조정 · 주간 12개 제한 해제 · 소울 에테르 증폭 · 주문서 메소화
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 text-slate-100 leading-relaxed font-normal text-base">
                        <p className="text-white">
                            이번 방송에서 유저들에게 가장 큰 충격을 안겨준 파트입니다. 
                            운영진은 상위 보스 스펙업 가속화로 인해 폭증한 메소 인플레이션을 억제하기 위해, 
                            <strong className="text-red-400">결정석 가격 인하</strong>와 더불어 
                            <strong className="text-amber-400">소울 에테르·주문서 메소 직강·어빌리티 고급 재설정</strong> 등 
                            전방위적인 메소 소모처 확대를 발표했습니다.
                        </p>

                        <ImageCard
                            src="/images/blog/maplenow-sep17/maplenow_img_13.jpg"
                            alt="경제 성장 시스템 개편 인트로 슬라이드"
                            caption="경제 및 성장 시스템 개편 — 메소 생산 조정 & 소비처 대폭 확대"
                        />

                        {/* 메소 생산 통계 */}
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                            <h3 className="text-xl font-bold text-amber-300 flex items-center gap-2">
                                <span>📊 공식 통계: 보스 메소 생산량 폭증 실태</span>
                            </h3>
                            <p className="text-white">
                                통계에 따르면 익스트림 세렌 이상 초상위 보스 구간의 메소 생산량은 전년 대비 무려 
                                <strong className="text-red-400"> +1,583%</strong> 폭증했습니다. 
                                반면 유저들의 전투력 상승으로 하드 스우 미만 보스 처치 시간은 30~40% 이상 급격히 단축되었습니다.
                            </p>

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_14.jpg"
                                alt="생산처별 메소 생산량 추이 그래프"
                                caption="생산처별 메소 생산량 추이 (보스 리워드 생산량이 기하급수적으로 폭증)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_15.jpg"
                                alt="주간 보스 메소 생산량 추이 슬라이드"
                                caption="주간 보스 메소 생산량 구간별 비중 추이 (상위 보스 점유율 급격한 확대)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_16.jpg"
                                alt="전년 동기 대비 보스 구간별 증감률 표"
                                caption="전년 동기 대비 보스 메소 생산량 증감률: 익스 세렌~하드 림보 +1,583% 폭증!"
                                badge="+1,583%"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_17.jpg"
                                alt="김창섭 디렉터 실시간 수치 분석 설명"
                                caption="김창섭 디렉터: 메소 가치 보존과 경제 안정을 위해 결정석 조정이 불가피함을 설명"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_18.jpg"
                                alt="보스 솔로 클리어 난이도 구간 분포 슬라이드"
                                caption="보스 솔로 클리어 난이도 구간 분포 (상위 보스 1인 격파 유저 비율 대폭 상승)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_19.jpg"
                                alt="보스 구간별 적용 감소율 공식 상세표"
                                caption="보스 구간별 적용 감소율 공식 상세표 (하드 스우 미만 50%, 하드스데~진힐라 5%, 세렌/검마 30~35%)"
                                badge="공식 감소율 표"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_20.jpg"
                                alt="1인 격파 하위 10퍼센트 전투력 감소율 슬라이드"
                                caption="1인 격파 하위 10% 전투력 감소율 (검은 마법사 -39.47%, 세렌 -40.32% 전투력 하락)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_21.jpg"
                                alt="김창섭 디렉터 감소율 결정 배경 발표"
                                caption="김창섭 디렉터 수치 결정 배경 발표: 유저 스펙 인플레를 감안한 구간별 차등 인하"
                            />
                        </div>

                        {/* 결정석 12개 제한 해제 & 큐브 보스 조정 */}
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                            <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
                                <span>🔓 주간 판매 12개 제한 전격 해제 &amp; 메멘토 큐브 보스 조정</span>
                            </h3>
                            <p className="text-white">
                                가격 인하의 충격을 완화하기 위해 운영진은 주간 보스 결정석 판매 슬롯 
                                <strong className="text-amber-400"> 12개 제한을 전면 해제</strong>했습니다. 
                                이제 처치한 모든 보스의 결정석을 슬롯 제한 없이 전량 판매할 수 있습니다. 
                                또한 아케인 심볼세 30% 일괄 인하와 함께 메멘토 큐브 지급 보스가 재조정되었습니다.
                            </p>

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_22.jpg"
                                alt="메멘토 큐브 지급 보스 조정 공식 표"
                                caption="메멘토 큐브 지급 보스 조정 (하위 보스 실버 큐브 축소, 상위 보스 골드 큐브 집중)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_23.jpg"
                                alt="결정석 12개 제한 해제 및 매크로 방지 패널티 슬라이드"
                                caption="★ 주간 보스 결정석 판매 12개 제한 전격 해제 & 11레벨 격차 메소 감소율 강화"
                                badge="제한 해제"
                            />
                        </div>

                        {/* 소울 에테르 4단계 증폭 시스템 */}
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                            <h3 className="text-xl font-bold text-purple-300 flex items-center gap-2">
                                <span>🔮 소울 시스템 대개편: '소울 에테르' 4단계 증폭 &amp; 외형 자유 선택</span>
                            </h3>
                            <p className="text-white">
                                그동안 치장용으로 방치되었던 소울 시스템이 핵심 엔드 스펙업 수단으로 재탄생했습니다. 
                                상위 보스에서 드롭되는 <strong className="text-purple-400">&lt;소울 에테르&gt;</strong>를 소모해 
                                무기에 부여된 위대한 소울의 성능을 최대 4단계까지 증폭할 수 있습니다. 
                                또한 소울 잠재능력을 <strong className="text-amber-300">8,800만 메소</strong>로 무한 재설정할 수 있으며, 
                                성능과 무관하게 내가 모은 소울 외형을 자유롭게 골라 착용할 수 있습니다.
                            </p>

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_24.jpg"
                                alt="메소 소비처 확대 성장 시스템 개편 슬라이드"
                                caption="메소 소비처 대폭 확대 & 성장 시스템 개편 로드맵"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_25.jpg"
                                alt="소울 개편 인트로 화면"
                                caption="소울 시스템 대개편 인트로: 성능 증폭과 외형 분리"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_26.jpg"
                                alt="소울 에테르 무기에 부여된 위대한 소울 증폭 재화 및 강화 UI"
                                caption="소울 에테르: 무기에 부여된 위대한 소울 증폭 재화 & 강화 UI (레전드리 소울 옵션 4단계 강화)"
                                badge="신규 강화"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_27.jpg"
                                alt="소울 에테르 1~4단계 드롭 보스 목록 단독 표"
                                caption="소울 에테르 단계별 드롭 상위 보스: 1단계(대적자, 카링) ~ 4단계(유피테르)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_28.jpg"
                                alt="소울 잠재능력 메소 재설정 UI 슬라이드"
                                caption="소울 잠재능력 메소 재설정 시스템 UI (8,800만 메소를 소모하여 유효 옵션 무한 파밍)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_29.jpg"
                                alt="소울 컬렉션 외형 자유 선택 착용 슬라이드"
                                caption="소울 컬렉션 외형 스킨 시스템: 성능은 그대로, 외형은 수집한 소울 중 마음대로 선택 착용!"
                            />
                        </div>

                        {/* 주문서 직강 & 어빌리티 고급 재설정 */}
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                            <h3 className="text-xl font-bold text-emerald-300 flex items-center gap-2">
                                <span>📜 주문서 메소 직접 강화 &amp; 어빌리티 고급 재설정 (이탈 옵션)</span>
                            </h3>
                            <p className="text-white">
                                주문서 수급 경로를 찾기 힘들어 강화를 포기하던 유저들을 위해 
                                <strong className="text-emerald-400">프리미엄 악공, 매지컬, 놀긍혼, 리턴 스크롤</strong> 등을 인벤토리에서 
                                메소로 직접 시전하는 시스템이 도입됩니다. 
                                또한 어빌리티에는 <strong className="text-cyan-400">&lt;고급 재설정&gt;</strong>이 추가되어 
                                명성치와 메소를 소모해 2/3번째 줄 레전드리 '이탈 옵션'을 확정적으로 노릴 수 있게 되었습니다!
                            </p>

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_30.jpg"
                                alt="주문서 강화 개편 인트로 슬라이드"
                                caption="주문서 강화 개편 인트로"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_31.jpg"
                                alt="주문서 메소 직접 강화 UI 및 주문서 목록 슬라이드"
                                caption="주문서 메소 직접 강화 UI: 프리미엄 악공, 매지컬 주문서, 놀긍혼, 리턴 스크롤 메소 직강 지원"
                                badge="메소 직강"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_32.jpg"
                                alt="어빌리티 고급 재설정 인트로 슬라이드"
                                caption="어빌리티 고급 재설정 인트로"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_33.jpg"
                                alt="어빌리티 고급 재설정 UI 및 비용 표"
                                caption="어빌리티 고급 재설정 UI 및 잠금 개수별 비용 (2/3열 레전드리 이탈 옵션 획득 가능!)"
                                badge="이탈 옵션 도입"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_34.jpg"
                                alt="심연의 서큘레이터 및 블랙 서큘레이터 사양 변경 슬라이드"
                                caption="심연의 서큘레이터 & 블랙 서큘레이터 사양 변경 안내 (이탈 옵션과의 밸런스 조정)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_35.jpg"
                                alt="김창섭 디렉터 신규 컨텐츠 소개 화면"
                                caption="김창섭 디렉터: 피해를 최소화하고 신규 성장 동력을 제공하기 위한 시스템 발표"
                            />
                        </div>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* SECTION 3: 신규 컨텐츠 및 가을 이벤트 */}
                {/* ============================================================== */}
                <section id="sec-content" className="scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center border border-cyan-500/30 text-lg">
                            3
                        </span>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                                신규 컨텐츠 &amp; 가을 이벤트
                            </h2>
                            <p className="text-sm text-slate-300 font-medium">
                                에픽던전 아우룸 레기스 · 295 몬파 · 퍼스널 버닝 (280+) · 어센던트 펄스 링 (18성급)
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 text-slate-100 leading-relaxed font-normal text-base">
                        {/* 에픽던전 아우룸 레기스 & 295 몬파 */}
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                            <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
                                <span>🏰 신규 에픽던전 &lt;아우룸 레기스&gt; (Lv.290+) &amp; Lv.295 몬스터 파크</span>
                            </h3>
                            <p className="text-white">
                                아보리스 스토리를 다루는 5개 스테이지의 신규 에픽던전 <strong className="text-amber-300">&lt;아우룸 레기스&gt;</strong>가 공개되었습니다. 
                                콩알탄을 튕겨 적을 파괴하는 경쾌한 미니게임 기믹이 포함되어 있으며, 
                                Lv.295 신규 몬스터 파크 기어드락 신설과 함께 295레벨 이상 유저에게 에픽던전 추가 경험치가 지급됩니다.
                            </p>

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_36.jpg"
                                alt="신규 에픽던전 아우룸 레기스 타이틀 화면"
                                caption="신규 에픽던전 <아우룸 레기스> (Lv.290 이상 입장 가능)"
                                badge="신규 에픽던전"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_37.jpg"
                                alt="아우룸 레기스 맵 및 아보리스 스토리 구성 슬라이드"
                                caption="아우룸 레기스 던전 맵 & 아보리스 배경의 5개 스테이지 스토리"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_38.jpg"
                                alt="콩알탄 기믹 연출 슬라이드"
                                caption="새로운 콩알탄 튕기기 기믹 연출 (경쾌한 컨트롤과 타격감)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_39.jpg"
                                alt="Lv.295~299 기어드락 몬스터 파크 신설 슬라이드"
                                caption="Lv.295~299 기어드락 몬스터 파크 신설 & 295+ 에픽던전 추가 경험치 제공"
                            />
                        </div>

                        {/* 아르고호의 방문객 & 프로젝트 아르고 */}
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                            <h3 className="text-xl font-bold text-amber-300 flex items-center gap-2">
                                <span>🚢 2달간의 대형 이벤트 &lt;아르고호의 방문객&gt; &amp; &lt;프로젝트 아르고&gt;</span>
                            </h3>
                            <p className="text-white">
                                사도들의 비하인드 스토리를 심도 있게 풀어내는 2달간의 가을 메인 이벤트입니다. 
                                이벤트 종료 후 차원의 도서관에 정식 등재될 예정이며, 
                                &lt;프로젝트 아르고&gt; 출석판을 통해 각종 3배 쿠폰, 솔 에르다 조각 등 파격적인 보상을 획득할 수 있습니다.
                            </p>

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_40.jpg"
                                alt="아르고호의 방문객 메인 비주얼"
                                caption="2달간 펼쳐지는 가을 대형 메인 이벤트 <아르고호의 방문객> (사도들의 스토리)"
                                badge="메인 이벤트"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_41.jpg"
                                alt="아르고호 비행선 일러스트"
                                caption="창공을 가르는 비행선 아르고호 비주얼 (이벤트 후 차원의 도서관 영구 등재)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_42.jpg"
                                alt="프로젝트 아르고 출석판 UI 슬라이드"
                                caption="<프로젝트 아르고> 주간 출석 & 보상판 UI (풍성한 경험치 3배 쿠폰과 성장 재화)"
                            />
                        </div>

                        {/* 퍼스널 버닝 */}
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                            <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
                                <span>🔥 280+ 전용 새로운 버닝 &lt;퍼스널 버닝&gt; (주간 보스 EXP &amp; 플레임 몬스터)</span>
                            </h3>
                            <p className="text-white">
                                이번 메이플NOW의 하이라이트 이벤트인 <strong className="text-red-400">&lt;퍼스널 버닝&gt;</strong>입니다. 
                                여름에 유입된 280+ 유저들이 겨울 업데이트까지 안착할 수 있도록 전폭적인 경험치 부스팅을 제공합니다:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-white font-medium pl-2">
                                <li><strong className="text-amber-300">주간 보스 처치 시 대량 EXP 지급:</strong> 보스 격파 시 어마어마한 경험치를 지급하며, 파티 격파 시 파티원끼리 균등 분배됩니다.</li>
                                <li><strong className="text-amber-300">버스 방지 5% 기여도 시스템:</strong> 무임승차를 방지하기 위해 파티원 전체 보스 데미지의 5% 이상을 입힌 유저만 경험치를 획득할 수 있습니다.</li>
                                <li><strong className="text-amber-300">매주 24,000마리 플레임 사냥 &amp; 보상 커스텀:</strong> 매주 충전되는 플레임 몬스터를 사냥해 솔 에르다, 조각, EXP 포인트를 내가 원하는 비율로 100% 맞춤 수령 가능!</li>
                            </ul>

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_43.jpg"
                                alt="신규 버닝 시스템 퍼스널 버닝 로고"
                                caption="신규 버닝 시스템 <퍼스널 버닝> 공식 타이틀"
                                badge="280+ 전용"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_44.jpg"
                                alt="퍼스널 버닝 캐릭터 일러스트"
                                caption="퍼스널 버닝 공식 캐릭터 아트 — 고레벨 성장 동력 전폭 지원"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_45.jpg"
                                alt="퍼스널 성장 미션 UI 슬라이드"
                                caption="퍼스널 성장 미션 UI: 레벨 단계별 조 단위 경험치 및 퍼스널 코인 1,000개 지급"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_46.jpg"
                                alt="퍼스널 보스 미션 및 5퍼센트 기여도 주의사항 슬라이드"
                                caption="퍼스널 보스 미션: 하드 데미안~하드 듄켈 격파 경험치 표 & 버스 방지 5% 딜량 기여도 조건"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_47.jpg"
                                alt="퍼스널 성장 미션 및 보스 미션 종합 비교 슬라이드"
                                caption="퍼스널 성장 미션 & 퍼스널 보스 미션 종합 화면 (주간 단위 대량 경험치 폭풍 수급)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_48.jpg"
                                alt="퍼스널 몬스터 24000마리 충전 및 드롭 보상 커스터마이징 슬라이드"
                                caption="주간 24,000마리 플레임 사냥 & 솔 에르다·조각·EXP 획득 포인트 100% 커스텀 배분 UI"
                                badge="보상 커스텀"
                            />
                        </div>

                        {/* 어센던트 펄스 링 & 버스터 */}
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                            <h3 className="text-xl font-bold text-emerald-300 flex items-center gap-2">
                                <span>💍 마이스터링 18성급 &lt;어센던트 펄스 링&gt; &amp; 기타 이벤트</span>
                            </h3>
                            <p className="text-white">
                                이벤트 재화로 강화할 수 있는 신규 이벤트 반지 <strong className="text-emerald-400">&lt;어센던트 펄스 링&gt;</strong>은 
                                풀강화 시 <strong>올스탯 +80, 공마 +46, 전투력 +215만</strong>이라는 경이로운 성능으로 
                                마이스터링 18성 이상의 압도적 가성비를 보여줍니다. 파괴되더라도 메소샵에서 최대 5개까지 재구매할 수 있습니다!
                            </p>

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_49.jpg"
                                alt="어센던트 링크 및 어센던트 펄스 링 스펙 상세 슬라이드"
                                caption="★ 어센던트 펄스 링 풀강 스펙: 마이스터링 18성급 초과 효율 (+215만 전투력 폭등!)"
                                badge="18성급 종결 링"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_50.jpg"
                                alt="한글 모아모아 이벤트 슬라이드"
                                caption="한글날 테트리스 미니게임 <한글 모아모아> & 특별 치장 칭호 아이템"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_51.jpg"
                                alt="벨로나 하드 1인 선착순 격파 이벤트 순위 TOP 10"
                                caption="벨로나(HARD) 1인 선착순 격파 이벤트 순위 TOP 10 공식 명예의 전당 발표"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_52.jpg"
                                alt="하이퍼 버닝 부스터 260레벨 슬라이드"
                                caption="복귀 및 부캐 육성을 위한 260 하이퍼 버닝 부스터 아이템 지급!"
                            />
                        </div>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* SECTION 4: MVP 및 마일리지 개편 */}
                {/* ============================================================== */}
                <section id="sec-mvp" className="scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 font-black flex items-center justify-center border border-purple-500/30 text-lg">
                            4
                        </span>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                                MVP 혜택 강화 &amp; 마일리지 이원화
                            </h2>
                            <p className="text-sm text-slate-300 font-medium">
                                MVP 블랙 250만 완화 · 탐험 코인 &amp; 메이플 크레딧 분리 · 첫 줄 고정 프라임 큐브
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 text-slate-100 leading-relaxed font-normal text-base">
                        <p className="text-white">
                            MVP 블랙 등급 기준이 기존 300만원에서 <strong className="text-purple-300">250만원</strong>으로 대폭 완화되었으며, 
                            리조트 경험치 2.2배, 심볼 퀵패스 지역 무관 통합화, 데일리 기프트 사냥 면제 등 편의성이 비약적으로 상승했습니다.
                        </p>

                        <ImageCard
                            src="/images/blog/maplenow-sep17/maplenow_img_53.jpg"
                            alt="MVP 마일리지 개편 인트로 슬라이드"
                            caption="MVP 및 마일리지 개편 인트로"
                        />

                        <ImageCard
                            src="/images/blog/maplenow-sep17/maplenow_img_54.jpg"
                            alt="MVP 리조트 2.2배 및 편의성 개선 슬라이드"
                            caption="MVP 리조트 경험치 2.2배 상향, 심볼/일퀘 퀵패스 통합, 레드/블랙 데일리 기프트 사냥 면제"
                        />

                        <ImageCard
                            src="/images/blog/maplenow-sep17/maplenow_img_55.jpg"
                            alt="MVP 블랙 등급 혜택 강화 상세 비교표"
                            caption="MVP 블랙 기준 250만원 완화 & 칭호 보공 10%, 훈장 보공 10%, 리조트 20시간 등 혜택 비교표"
                            badge="블랙 250만 완화"
                        />

                        {/* 마일리지 분리: 탐험 코인 vs 메이플 크레딧 */}
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                            <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
                                <span>🪙 인게임 [탐험 코인] vs 캐시 [메이플 크레딧] 완전 분리</span>
                            </h3>
                            <p className="text-white">
                                복잡하게 얽혀 있던 마일리지 제도가 두 갈래로 명확하게 이원화되었습니다:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-white font-medium pl-2">
                                <li><strong className="text-amber-300">탐험 코인 (인게임 마일리지):</strong> 보스 클리어, 필드 사냥, 몬컬 등으로 적립. 월간 10만 코인까지 획득 가능하며 카산드라의 탐험 코인샵에서 각종 유료급 아이템 구매!</li>
                                <li><strong className="text-cyan-300">메이플 크레딧 (캐시 마일리지):</strong> 넥슨 캐시 구매 금액의 5% 무제한 적립. 크레딧 전용 샵 이용 가능.</li>
                            </ul>

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_56.jpg"
                                alt="마일리지 분리 구조도 슬라이드"
                                caption="마일리지 전격 분리 구조도: 인게임 <탐험 코인> vs 캐시 <메이플 크레딧>"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_57.jpg"
                                alt="탐험 코인 획득 방식 및 한도 슬라이드"
                                caption="탐험 코인 획득 방식: 필드 사냥·몬컬·보스 클리어 넥슨ID 주 6회, 월 100,000 코인 한도 확대"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_58.jpg"
                                alt="카산드라의 탐험 코인샵 물품 목록"
                                caption="카산드라의 탐험 코인샵 공식 물품: 펫장비, 의류, 치장템, 확성기 등 유료급 아이템 총망라"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_59.jpg"
                                alt="메이플 크레딧 적립 안내 슬라이드"
                                caption="메이플 크레딧: 캐시 구매 금액의 5% 무제한 적립 (일간/월간 한도 없음)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_60.jpg"
                                alt="메이플 크레딧 전용 샵 UI 슬라이드"
                                caption="메이플 크레딧 전용 샵 UI (프라임 큐브, 심연의 서큘레이터, 플래티넘 카르마의 가위 등)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_61.jpg"
                                alt="프라임 큐브 및 프라임 에디셔널 큐브 설명 슬라이드"
                                caption="★ 초유의 화제작: 첫 번째 줄 고정 <프라임 큐브> & <프라임 에디셔널 큐브> (2달 한정 판매!)"
                                badge="첫 줄 고정 큐브"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_62.jpg"
                                alt="원더블랙 34기 및 신규 프리미엄 헤어 성형 슬라이드"
                                caption="원더블랙 34기 라인업 & 신규 프리미엄 헤어/성형 & 로얄 스타일"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_63.jpg"
                                alt="모멘텀 패스 PLUS 출시 슬라이드"
                                caption="모멘텀 패스 PLUS 공식 출시 (프라임 패스 추가 보상 체계)"
                            />
                        </div>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* SECTION 5: 콜라보레이션 및 오프라인 */}
                {/* ============================================================== */}
                <section id="sec-collab" className="scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 font-black flex items-center justify-center border border-pink-500/30 text-lg">
                            5
                        </span>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                                IP 콜라보레이션 &amp; 홍대 오프라인
                            </h2>
                            <p className="text-sm text-slate-300 font-medium">
                                캐치! 티니핑 3D 자석펫 · 블루 아카이브 11/19 · 홍대 방탈출 MAPLE ESCAPE
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 text-slate-100 leading-relaxed font-normal text-base">
                        {/* 캐치 티니핑 */}
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                            <h3 className="text-xl font-bold text-pink-300 flex items-center gap-2">
                                <span>💖 메이플스토리 X 캐치! 티니핑 (9월 17일 점검 후~)</span>
                            </h3>
                            <p className="text-white">
                                메이플스토리 역사상 최초로 3D 모델링 입체감을 2D 도트로 완벽 구현한 
                                <strong className="text-pink-400">자석펫 3종 세트(하츄핑, 이클립스핑, 다이에나핑)</strong>가 출시됩니다. 
                                화려한 전용 변신 연출의 일루전링과 로미 언니 코디 패키지까지 역대급 퀄리티로 무장했습니다.
                            </p>

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_64.jpg"
                                alt="메이플 월드에 티니핑 등장 메인 비주얼"
                                caption="메이플 월드에 티니핑 등장! 공식 콜라보레이션 메인 포스터"
                                badge="티니핑 콜라보"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_65.jpg"
                                alt="캐치 티니핑 공식 로고 및 비주얼"
                                caption="메이플스토리 X 캐치! 티니핑 공식 로고 및 대표 캐릭터 5종"
                            />

                            {/* 캐치! 티니핑 공식 콜라보 영상 플레이어 */}
                            <YouTubePlayer 
                                videoId="ihHbfJ0xV1c" 
                                title="[메이플스토리] 메이플스토리 X 캐치! 티니핑 공식 애니메이션 영상"
                                thumbSrc="/images/blog/maplenow-sep17/teenieping_video_thumb.jpg"
                                badgeText="티니핑 공식 영상"
                                themeColor="pink"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_66.jpg"
                                alt="티니핑 자석펫 3종 하츄핑 이클립스핑 다이에나핑"
                                caption="★ 티니핑 3D 자석펫 3종: 하츄핑 · 이클립스핑 · 다이에나핑 (전용 명찰/말풍선 포함)"
                                badge="3D 자석펫"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_67.jpg"
                                alt="3D 도트 입체감 티니핑 캐릭터 9종 모델링"
                                caption="3D 모델링 입체감을 메이플 특유의 도트로 완벽 구현한 티니핑 캐릭터 9종 비주얼"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_68.jpg"
                                alt="하츄핑 인게임 일루전 링 변신 모습"
                                caption="하츄핑 인게임 일루전 링 변신 모습"
                                badge="일루전 링 변신"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_69.jpg"
                                alt="티니핑 명찰 말풍선 반지 및 로미 코디 패키지"
                                caption="티니핑 명찰/말풍선 반지 & 로미 코디 패키지 캐시 아이템 세트"
                            />
                        </div>

                        {/* 블루 아카이브 */}
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                            <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
                                <span>🎯 메이플스토리 X 블루 아카이브 (11월 19일 전격 업데이트)</span>
                            </h3>
                            <p className="text-white">
                                서브컬처 대작 <strong className="text-cyan-400">&lt;블루 아카이브&gt;</strong>와의 메가 콜라보레이션이 깜짝 발표되었습니다! 
                                메이플 주황버섯과 함께 있는 마스코트 <strong className="text-cyan-300">‘아로나’</strong>의 비주얼이 공개되었으며, 
                                단순 캐시 치장품 판매를 넘어 <strong>1달 동안 전용 단독 인게임 이벤트</strong>가 대규모로 진행될 예정입니다.
                            </p>

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_70.jpg"
                                alt="메이플스토리 블루 아카이브 공식 콜라보 비주얼 아로나"
                                caption="메이플스토리 X 블루 아카이브 공식 콜라보 비주얼 (아로나 & 주황버섯)"
                                badge="블루아카 콜라보"
                            />

                            {/* 블루 아카이브 공식 티저 영상 플레이어 */}
                            <YouTubePlayer 
                                videoId="zukN6DJv-3I" 
                                title="[메이플스토리] 메이플스토리 X 블루 아카이브 공식 티저" 
                                thumbSrc="/images/blog/maplenow-sep17/blue_archive_video_thumb.jpg"
                                badgeText="블루아카 공식 티저"
                                themeColor="cyan"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_71.jpg"
                                alt="블루 아카이브 콜라보 타이틀 로고"
                                caption="11월 19일 업데이트 예정: 단순 캐시템이 아닌 1달간 단독 인게임 이벤트 풀사이즈 진행!"
                            />
                        </div>

                        {/* 홍대 방탈출 카페 MAPLE ESCAPE */}
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                            <h3 className="text-xl font-bold text-amber-300 flex items-center gap-2">
                                <span>🗝️ 홍대 오프라인 방탈출 카페 &lt;MAPLE ESCAPE&gt; (마포구 와우산로 90)</span>
                            </h3>
                            <p className="text-white">
                                메이플스토리 공식 상설 오프라인 방탈출 카페가 홍대 바로 앞거리에 상륙합니다. 
                                커닝시티, 무릉도원, 헌티드맨션, 에델슈타인, 루디브리엄의 5대 메이플 대표 지역이 실제 방탈출 테마룸으로 완벽히 재현됩니다. 
                                선예매는 <strong className="text-amber-300">9월 14일(월) 20시 YES24</strong>에서 오픈되며, 
                                승부 예측 성공 시 <strong className="text-purple-300">할로캣 데미지 스킨(유닛)</strong>을 전원 증정합니다!
                            </p>

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_72.jpg"
                                alt="홍대 메이플 방탈출 카페 MAPLE ESCAPE 메인 포스터"
                                caption="홍대 오프라인 공식 방탈출 카페 <MAPLE ESCAPE> 메인 비주얼"
                                badge="오프라인 방탈출"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_73.jpg"
                                alt="MAPLE ESCAPE 장소 이용 예매 가격 안내 슬라이드"
                                caption="장소: 마포구 와우산로 90 / 2~6인 이용 / 1인 29,000원 (매주 월요일 10시 YES24 정기 예약)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_74.jpg"
                                alt="9월 14일 월요일 YES24 선예매 안내 슬라이드"
                                caption="9월 14일(월) 20:00 YES24 용사 선예매 오픈 (2인 58,000원 / 9/21~9/27 이용)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_75.jpg"
                                alt="10월 9~11일 오픈 기념 MAPLE ESCAPE DAY 안내"
                                caption="10월 9~11일 오픈 기념 3일간 특별 이벤트 <MAPLE ESCAPE DAY> (5대 테마룸 & 270Lv+ 신청)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_76.jpg"
                                alt="크리에이터 vs 서바이벌 레전드 방탈출 예측 이벤트 슬라이드"
                                caption="방탈출 예측 이벤트: 메이플 크리에이터(이라333, 타요) vs 서바이벌 레전드(서출구, 허성범)"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_77.jpg"
                                alt="예측 선물 할로캣 데미지 스킨 유닛 선택권"
                                caption="★ 예측 성공 선물: 할로캣 데미지 스킨(유닛) 또는 Ver.2(유닛) 선택권 전원 지급!"
                                badge="한정 뎀스"
                            />

                            <ImageCard
                                src="/images/blog/maplenow-sep17/maplenow_img_78.jpg"
                                alt="넥슨 라이브 다시보기 댓글 오픈 기념 이벤트"
                                caption="넥슨 라이브 다시보기 오픈 기념 이벤트: 메이플과 콜라보 희망 IP 댓글 작성 시 1만 넥슨 캐시 추첨"
                            />
                        </div>
                    </div>
                </section>

                {/* 하단 요약 배너 */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-cyan-500/20 border border-slate-700/80 text-center space-y-4">
                    <h3 className="text-2xl font-extrabold text-white">
                        역대 최대 볼륨의 가을 대격변, 지금 대비하세요!
                    </h3>
                    <p className="text-slate-200 max-w-2xl mx-auto text-sm leading-relaxed">
                        9월 17일 점검 전 목요일 새벽 주간 보스 막차 클리어로 결정석 손실을 방지하고, 
                        아래 링크된 보스 결정석 시뮬레이터를 통해 나의 캐릭터별 메소 손실액을 미리 계산해보세요.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/blog/boss-crystal-price-adjustment-september-2026"
                            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all"
                        >
                            보스 결정석 가격표 &amp; 시뮬레이터 보기 ➔
                        </Link>
                        <Link
                            href="/blog/testworld-skill-balance-sep-17-2026"
                            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all"
                        >
                            테스트월드 46개 직업 밸패 상세 보기 ➔
                        </Link>
                    </div>
                </div>

                {/* 관련 게시글 카드 그리드 */}
                <div className="pt-8 border-t border-slate-800">
                    <h3 className="text-lg font-bold text-white mb-4">함께 읽으면 좋은 9월 패치노트 소식</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link 
                            href="/blog/boss-crystal-price-adjustment-september-2026"
                            className="p-5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 transition-all group"
                        >
                            <span className="text-xs font-bold text-amber-400 mb-1 block">결정석 시뮬레이터</span>
                            <h4 className="font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                                💰 【9월 17일】 메이플 보스 결정석 가격 조정 완벽 정리 &amp; 12개 체감 시뮬레이터
                            </h4>
                            <p className="text-xs text-slate-300 line-clamp-2">
                                카루타부터 더스크/듄켈까지 50% 반토막 너프! 내 스펙 구간별 주간 손실 메소와 점검 전 막차 정산 꿀팁.
                            </p>
                        </Link>

                        <Link 
                            href="/blog/testworld-skill-balance-sep-17-2026"
                            className="p-5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 transition-all group"
                        >
                            <span className="text-xs font-bold text-cyan-400 mb-1 block">46개 직업 스킬 밸패</span>
                            <h4 className="font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                                ⚔️ 【테섭 1.2.206】 전직업 스킬 조정 &amp; 연무장 개편 총정리 (46개 직업)
                            </h4>
                            <p className="text-xs text-slate-300 line-clamp-2">
                                텔포급 돌진기, 시너지 자버프화, 패파 렐릭 삭제, 미하일 로얄가드 개편 및 46개 직업별 계수 변경 총망라.
                            </p>
                        </Link>
                    </div>
                </div>
            </main>
        </article>
    );
}
