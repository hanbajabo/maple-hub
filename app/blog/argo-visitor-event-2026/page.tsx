'use client';

import Link from 'next/link';
import {
    Calendar,
    ChevronRight,
    Anchor,
    Star,
    Gift,
    Zap,
    Shield,
    BookOpen,
    Sparkles,
    Clock,
    Coins,
    CheckCircle2,
    Sword,
    AlertTriangle,
    Target,
    Info,
    Award,
    TrendingUp,
    ShoppingBag,
    Calculator,
} from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function ArgoVisitorEventPage() {
    return (
        <main className="w-full min-h-screen bg-slate-900 text-white py-6 sm:py-8 px-3 sm:px-4">
            {/* 배경 그라데이션 글로우 */}
            <div className="fixed top-0 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-teal-900/15 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-0 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-cyan-900/15 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none z-0" />

            {/* 네비게이션 */}
            <div className="max-w-4xl mx-auto relative z-10 flex items-center gap-3 mb-6 sm:mb-8">
                <Link
                    prefetch={false}
                    href="/blog"
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-teal-500/50 rounded-xl text-xs sm:text-sm font-bold text-teal-300 hover:text-teal-200 transition-all shadow-sm group"
                >
                    <ChevronRight className="w-4 h-4 rotate-180 transform group-hover:-translate-x-1 transition-transform" />
                    <span>← 블로그 목록</span>
                </Link>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* 헤더 섹션 */}
                <header className="mb-6 sm:mb-8">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-900/70 text-teal-300 border border-teal-700/60 font-semibold flex items-center gap-1">
                            <Anchor className="w-3 h-3" /> 가을 메인 이벤트
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/60 font-semibold">
                            테스트월드 1.2.206
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700/50 font-medium">
                            2026.09.17 ~ 11.18
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 break-keep leading-tight sm:leading-tight flex flex-wrap items-center gap-2.5">
                        <span className="p-2 rounded-2xl bg-teal-950/80 border border-teal-500/40 text-teal-400 shadow-lg">
                            <Anchor className="w-7 h-7 sm:w-9 sm:h-9" />
                        </span>
                        <span>
                            메이플스토리 가을 이벤트 <br className="sm:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-200">
                                [아르고 호의 방문객]
                            </span> 완벽 총정리
                        </span>
                    </h1>

                    <p className="text-slate-300 text-xs sm:text-base break-keep mb-4 font-normal leading-relaxed">
                        연맹의 정보선 아르고 호의 출항 준비! 40일 정찰 출석 보상표, 아르고 호의 가호 버프 스킬, 20성 어센던트 펄스 링 강화 확률, 주화 상점 & 메소샵 판매 품목까지 공식 패치노트를 100% 반영하여 총정리했습니다.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-300 font-medium pb-4 border-b border-slate-800">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-teal-400" /> 작성일: 2026년 9월 13일</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-amber-400" /> 이벤트 기간: 9/17(목) 점검 후 ~ 11/18(수) 23:59</span>
                        <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-indigo-400" /> 읽는 시간: 약 12분</span>
                    </div>

                    {/* 타이틀 바로 밑 대표 이미지 배너 */}
                    <div className="mt-4 rounded-xl sm:rounded-2xl overflow-hidden border border-teal-500/30 shadow-2xl bg-slate-950">
                        <img
                            src="/images/blog/argo-visitor/argo-banner.png"
                            alt="메이플스토리 가을 이벤트 아르고 호의 방문객 메인 배너"
                            className="w-full h-auto block object-cover"
                        />
                    </div>
                </header>

                {/* 공식 이벤트 개요 카드 */}
                <div className="bg-gradient-to-br from-slate-800/90 via-teal-950/40 to-slate-900/90 border border-teal-600/40 rounded-2xl p-4 sm:p-6 mb-6 shadow-xl">
                    <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-teal-900/50 border border-teal-700/50 text-teal-300 flex-shrink-0 mt-0.5">
                            <Info className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="space-y-2 text-xs sm:text-sm text-slate-200">
                            <p className="font-bold text-white text-sm sm:text-base">
                                "재정비를 위해 잠시 정박한 연맹의 정보선, 아르고 호. 열 마리의 부기와 함께 아르고 호의 출항을 도와주세요!"
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-300">
                                <div><strong className="text-teal-300">■ 참여 대상:</strong> 101레벨 이상 캐릭터 또는 스토리 퀘스트 챕터2를 완료한 제로</div>
                                <div><strong className="text-teal-300">■ 이벤트 기간:</strong> 2026년 9월 17일(목) 점검 후 ~ 11월 18일(수) 23:59</div>
                                <div><strong className="text-teal-300">■ 참여 방법:</strong> 이벤트 리스트 &gt; ‘아르고 호의 초대’ 선택 후 [참여하기]</div>
                                <div><strong className="text-teal-300">■ 간소화 지원:</strong> ‘이벤트 시작 간소화’ 기능 제공</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 긴급 주의사항 배너 */}
                <div className="mb-6 sm:mb-8 p-4 rounded-xl bg-amber-950/40 border border-amber-600/50 flex items-start gap-3 shadow-lg">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-amber-200 leading-relaxed break-keep">
                        <strong className="text-amber-300 font-bold block mb-1">🚨 [필독] 출석 이벤트 최초 참여 시 주의사항</strong>
                        ‘[출석 이벤트] 프로텍트 아르고’는 최초 참여 시 보상을 받을 <strong className="text-white underline">메이플ID 지정이 필수</strong>이므로 ‘이벤트 시작 간소화’로 함께 시작되지 않습니다. 반드시 이벤트 리스트에서 <strong className="text-white">직접 선택하여 메이플ID를 지정</strong>해야 출석이 시작되며, <strong>한 번 지정한 메이플ID는 절대 변경할 수 없습니다!</strong>
                    </div>
                </div>

                {/* 한눈에 보는 6대 핵심 변경점 그리드 */}
                <section className="mb-8 sm:mb-10">
                    <h2 className="text-lg sm:text-xl font-black text-white mb-3.5 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-400" /> 한눈에 보는 아르고 호의 방문객 6대 구성
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        <div className="rounded-xl p-3.5 border border-teal-800/60 bg-teal-950/30 flex flex-col justify-between">
                            <div>
                                <span className="text-2xl mb-1.5 block">📜</span>
                                <p className="font-bold text-white text-sm">1. 스토리 퀘스트</p>
                                <p className="text-slate-300 text-xs mt-1 break-keep">정보선 아르고 호의 비밀 기록! 15개의 신규 스토리 퀘스트</p>
                            </div>
                            <span className="text-[11px] text-teal-400 font-semibold mt-2.5">101레벨 이상 참여</span>
                        </div>

                        <div className="rounded-xl p-3.5 border border-indigo-800/60 bg-indigo-950/30 flex flex-col justify-between">
                            <div>
                                <span className="text-2xl mb-1.5 block">📅</span>
                                <p className="font-bold text-white text-sm">2. 프로텍트 아르고</p>
                                <p className="text-slate-300 text-xs mt-1 break-keep">접속 시 매일 3배 쿠폰 3장 + 주화 1,000개! 40회 완주 시 성비(200~279)</p>
                            </div>
                            <span className="text-[11px] text-indigo-400 font-semibold mt-2.5">주 5회 / 총 40회 출석</span>
                        </div>

                        <div className="rounded-xl p-3.5 border border-violet-800/60 bg-violet-950/30 flex flex-col justify-between">
                            <div>
                                <span className="text-2xl mb-1.5 block">⚡</span>
                                <p className="font-bold text-white text-sm">3. 아르고 호의 가호</p>
                                <p className="text-slate-300 text-xs mt-1 break-keep">토벌 임무로 포인트 파밍! 전투 마법 11종 & 전술 마법 8종 강력 버프</p>
                            </div>
                            <span className="text-[11px] text-violet-400 font-semibold mt-2.5">스킬 효과 ~11/25 유지</span>
                        </div>

                        <div className="rounded-xl p-3.5 border border-amber-800/60 bg-amber-950/30 flex flex-col justify-between">
                            <div>
                                <span className="text-2xl mb-1.5 block">💍</span>
                                <p className="font-bold text-white text-sm">4. 어센던트 링크</p>
                                <p className="text-slate-300 text-xs mt-1 break-keep">130제 신규 반지 '어센던트 펄스 링' 지급! 인핸서로 스타포스 20성 도전</p>
                            </div>
                            <span className="text-[11px] text-amber-400 font-semibold mt-2.5">ID당 1개 지급 / 영구 아이템</span>
                        </div>

                        <div className="rounded-xl p-3.5 border border-cyan-800/60 bg-cyan-950/30 flex flex-col justify-between">
                            <div>
                                <span className="text-2xl mb-1.5 block">🪙</span>
                                <p className="font-bold text-white text-sm">5. 아르고 주화 상점</p>
                                <p className="text-slate-300 text-xs mt-1 break-keep">이벤링 레전스크롤, 카유잠, 카에에잠, 황금 딸기 농장, 성비 등 풍성한 라인업</p>
                            </div>
                            <span className="text-[11px] text-cyan-400 font-semibold mt-2.5">정찰로 주화 대량 수급</span>
                        </div>

                        <div className="rounded-xl p-3.5 border border-emerald-800/60 bg-emerald-950/30 flex flex-col justify-between">
                            <div>
                                <span className="text-2xl mb-1.5 block">🛍️</span>
                                <p className="font-bold text-white text-sm">6. 메소 상점</p>
                                <p className="text-slate-300 text-xs mt-1 break-keep">플라즈마 하트 & 펄스 링 스페어, VIP 버프, 안드 스킨, 역대 반지 및 의상/라이딩</p>
                            </div>
                            <span className="text-[11px] text-emerald-400 font-semibold mt-2.5">NPC 엘라르도 판매</span>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* 내비게이션 목차 */}
                <div className="mb-8 sm:mb-10 p-4 sm:p-5 rounded-2xl bg-slate-800/70 border border-slate-700/60 shadow-inner">
                    <p className="text-sm sm:text-base font-bold text-white mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" /> 📑 목차 바로가기
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                        <a
                            href="#story-quest"
                            className="flex items-center gap-2.5 bg-slate-900/60 hover:bg-slate-700/60 p-2.5 rounded-xl border border-slate-700/40 transition-colors group"
                        >
                            <span className="text-teal-400 font-mono font-bold text-xs">01</span>
                            <span className="text-slate-200 group-hover:text-white font-medium truncate">스토리 퀘스트 — 아르고 호의 방문객</span>
                        </a>
                        <a
                            href="#protect-argo"
                            className="flex items-center gap-2.5 bg-slate-900/60 hover:bg-slate-700/60 p-2.5 rounded-xl border border-slate-700/40 transition-colors group"
                        >
                            <span className="text-indigo-400 font-mono font-bold text-xs">02</span>
                            <span className="text-slate-200 group-hover:text-white font-medium truncate">출석 이벤트 — 프로텍트 아르고 (40회 보상표)</span>
                        </a>
                        <a
                            href="#argo-skill"
                            className="flex items-center gap-2.5 bg-slate-900/60 hover:bg-slate-700/60 p-2.5 rounded-xl border border-slate-700/40 transition-colors group"
                        >
                            <span className="text-violet-400 font-mono font-bold text-xs">03</span>
                            <span className="text-slate-200 group-hover:text-white font-medium truncate">이벤트 스킬 — 아르고 호의 가호 (전투/전술 마법표)</span>
                        </a>
                        <a
                            href="#ascendant-link"
                            className="flex items-center gap-2.5 bg-slate-900/60 hover:bg-slate-700/60 p-2.5 rounded-xl border border-slate-700/40 transition-colors group"
                        >
                            <span className="text-amber-400 font-mono font-bold text-xs">04</span>
                            <span className="text-slate-200 group-hover:text-white font-medium truncate">성장 이벤트 — 어센던트 링크 (펄스 링 20성)</span>
                        </a>
                        <a
                            href="#argo-shop"
                            className="flex items-center gap-2.5 bg-slate-900/60 hover:bg-slate-700/60 p-2.5 rounded-xl border border-slate-700/40 transition-colors group"
                        >
                            <span className="text-cyan-400 font-mono font-bold text-xs">05</span>
                            <span className="text-slate-200 group-hover:text-white font-medium truncate">이벤트샵 — 아르고 주화 상점 판매 목록</span>
                        </a>
                        <a
                            href="#meso-shop"
                            className="flex items-center gap-2.5 bg-slate-900/60 hover:bg-slate-700/60 p-2.5 rounded-xl border border-slate-700/40 transition-colors group"
                        >
                            <span className="text-emerald-400 font-mono font-bold text-xs">06</span>
                            <span className="text-slate-200 group-hover:text-white font-medium truncate">이벤트샵 — 메소샵 판매 품목 총정리</span>
                        </a>
                    </div>
                </div>

                {/* ===== 섹션 1: 스토리 퀘스트 ===== */}
                <section id="story-quest" className="mb-10 sm:mb-12">
                    <h2 className="text-lg sm:text-2xl font-black text-white mb-4 flex items-center gap-2.5 pb-2 border-b border-slate-700">
                        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
                        <span>1. [스토리 퀘스트] 아르고 호의 방문객</span>
                    </h2>

                    <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 sm:p-5 mb-4 space-y-3 text-xs sm:text-sm text-slate-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/40">
                                <p className="text-teal-300 font-bold mb-1">■ 퀘스트 참여 대상</p>
                                <p className="text-slate-300">101레벨 이상의 캐릭터 (제로의 경우 챕터2 완료 필요)</p>
                            </div>
                            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/40">
                                <p className="text-teal-300 font-bold mb-1">■ 참여 방법</p>
                                <p className="text-slate-300">좌측 전구 알림이에서 <strong className="text-white">'[아르고 호] 아르고 호의 초대'</strong> 수락 후, 아르고 호 갑판 NPC들과 대화</p>
                            </div>
                        </div>

                        <p className="text-slate-300 font-medium break-keep">
                            연맹의 정보선 아르고 호에서 펼쳐지는 흥미진진한 신규 스토리가 전개됩니다. 총 15종의 신규 퀘스트가 추가되며 아르고 호의 비밀과 배후의 이야기들을 확인할 수 있습니다.
                        </p>

                        <div className="mt-3">
                            <p className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-teal-400" /> 추가되는 신규 퀘스트 목록 (총 15종)
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                {[
                                    '[아르고 호] 아르고 호의 초대',
                                    '[아르고 호] 아르고 호 둘러보기',
                                    '[아르고 호] 미출간본의 페이지 찾기',
                                    '[아르고 호] 정보원의 사투',
                                    '[아르고 호] 새로운 통제 마법',
                                    '[아르고 호] 영혼의 통제',
                                    '[아르고 호] 근원에 닿는 방법',
                                    '[아르고 호] 접경지역의 약탈자',
                                    '[아르고 호] 대련',
                                    '[아르고 호] 바다 밑의 손님맞이',
                                    '[아르고 호] 그 복수는 성공할 수 있을 것인가',
                                    '[아르고 호] 불멸자를 쓰러뜨리는 필멸자',
                                    '[아르고 호] 그라우펜의 아이들',
                                    '[아르고 호] 벨로나의 샤만',
                                    '[아르고 호] 하이레프의 신왕',
                                ].map((qName, idx) => (
                                    <div key={idx} className="bg-slate-900/50 border border-slate-700/40 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 flex items-center gap-2">
                                        <span className="w-4 h-4 rounded-full bg-teal-900/60 text-teal-300 flex items-center justify-center text-[10px] font-mono flex-shrink-0">
                                            {idx + 1}
                                        </span>
                                        <span className="truncate">{qName}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== 섹션 2: 프로텍트 아르고 ===== */}
                <section id="protect-argo" className="mb-10 sm:mb-12">
                    <h2 className="text-lg sm:text-2xl font-black text-white mb-4 flex items-center gap-2.5 pb-2 border-b border-slate-700">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />
                        <span>2. [출석 이벤트] 프로텍트 아르고 (정찰 일지 40회)</span>
                    </h2>

                    <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 sm:p-5 mb-5 space-y-4 text-xs sm:text-sm">
                        {/* 정찰 일지 핵심 혜택 안내 */}
                        <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/50 border border-indigo-600/40 space-y-2">
                            <p className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                                <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                                매일 정찰 시 100% 기본 누적 혜택
                            </p>
                            <p className="text-slate-200 break-keep">
                                이벤트 기간 접속 시 매일 정찰이 자동으로 완료되며, 완료 시마다 아래 보상이 기본 누적됩니다:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                <div className="bg-slate-900/70 p-2.5 rounded-lg border border-indigo-700/30">
                                    <p className="text-xs text-indigo-300 font-semibold">경험치 3배 쿠폰 (30분)</p>
                                    <p className="text-white font-bold text-sm">매일 3개 지급 (누적 수령 가능)</p>
                                    <p className="text-[11px] text-slate-400 mt-0.5">※ 15개당 경험치 4배 쿠폰(30분) 1개로 교환 가능!</p>
                                </div>
                                <div className="bg-slate-900/70 p-2.5 rounded-lg border border-teal-700/30">
                                    <p className="text-xs text-teal-300 font-semibold">아르고 주화</p>
                                    <p className="text-white font-bold text-sm">매일 1,000개 지급</p>
                                    <p className="text-[11px] text-slate-400 mt-0.5">※ 주화 상점에서 다양한 육성/강화 템으로 교환</p>
                                </div>
                            </div>
                        </div>

                        {/* 출석 규칙 요약 */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-slate-300">
                            <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/30">
                                <p className="text-xs text-slate-400 font-medium">진행 방식</p>
                                <p className="text-white font-bold text-sm">한 주 최대 5번 완료</p>
                                <p className="text-[11px] text-slate-400">이벤트 기간 내 최대 40번 완주</p>
                            </div>
                            <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/30">
                                <p className="text-xs text-slate-400 font-medium">프로텍트 패스 (보충)</p>
                                <p className="text-amber-300 font-bold text-sm">3,000 메이플포인트</p>
                                <p className="text-[11px] text-slate-400">지난 주 미완료 정찰 1회 완료 가능</p>
                            </div>
                            <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/30">
                                <p className="text-xs text-slate-400 font-medium">지정 및 공유</p>
                                <p className="text-teal-300 font-bold text-sm">지정 메이플ID 1개 수령</p>
                                <p className="text-[11px] text-slate-400">경험치 쿠폰은 ID별 각각 수령 가능</p>
                            </div>
                        </div>

                        {/* 프로텍트 아르고 인게임 출석 UI 스크린샷 */}
                        <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-indigo-700/50 shadow-xl bg-slate-950 text-center">
                            <img
                                src="/images/blog/argo-visitor/argo-attendance-ui.png"
                                alt="프로텍트 아르고 인게임 출석 및 정찰 일지 UI 스크린샷"
                                className="w-full max-w-2xl mx-auto h-auto block object-contain"
                            />
                            <div className="p-2 sm:p-2.5 bg-slate-800/90 border-t border-slate-700/60">
                                <p className="text-xs text-slate-300 font-medium flex items-center justify-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                                    <span>프로텍트 아르고 인게임 출석 및 정찰 일지 UI</span>
                                </p>
                            </div>
                        </div>

                        {/* 40일 정찰 일지 전체 보상 테이블 */}
                        <div>
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                                    <Award className="w-4 h-4 text-amber-400" />
                                    정찰 일지 1~40회 일차별 보상 전체 목록
                                </h3>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span className="text-slate-300">레전더리</span></span>
                                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-violet-400"></span><span className="text-slate-300">스페셜</span></span>
                                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span><span className="text-slate-300">주요 혜택</span></span>
                                </div>
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-slate-700/60 shadow-lg">
                                <table className="w-full text-xs sm:text-sm min-w-[500px]">
                                    <thead>
                                        <tr className="bg-indigo-950/80 text-indigo-200 border-b border-indigo-800/60">
                                            <th className="py-2.5 px-3 text-center font-bold w-16">회차</th>
                                            <th className="py-2.5 px-3 text-left font-bold">보상 아이템</th>
                                            <th className="py-2.5 px-3 text-right font-bold w-20">수량</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {[
                                            { n: 1,  reward: '정령의 펜던트 교환권 (30일)', qty: '1개', tier: 'good' },
                                            { n: 2,  reward: 'VIP 사우나 이용권', qty: '1개', tier: 'normal' },
                                            { n: 3,  reward: '아르고 호 레플리카 라이딩 (영구) 교환권', qty: '1개', tier: 'special' },
                                            { n: 4,  reward: '경험의 코어 젬스톤', qty: '150개', tier: 'normal' },
                                            { n: 5,  reward: '솔 에르다/솔 에르다 조각 선택권', qty: '1개', tier: 'good' },
                                            { n: 6,  reward: 'VIP 부스터', qty: '10개', tier: 'normal' },
                                            { n: 7,  reward: 'VIP 사우나 이용권', qty: '1개', tier: 'normal' },
                                            { n: 8,  reward: '아르고 호의 비행 의자 (영구 아이템)', qty: '1개', tier: 'special' },
                                            { n: 9,  reward: '선택 심볼 교환권', qty: '300개', tier: 'good' },
                                            { n: 10, reward: '카르마 유니크 잠재능력 부여 스크롤 100%', qty: '1개', tier: 'special' },
                                            { n: 11, reward: '상급 EXP 교환권', qty: '2000개', tier: 'normal' },
                                            { n: 12, reward: 'VIP 사우나 이용권', qty: '1개', tier: 'normal' },
                                            { n: 13, reward: '아르고 데미지 스킨 (유닛)', qty: '1개', tier: 'special' },
                                            { n: 14, reward: '스페셜 명예의 훈장', qty: '200개', tier: 'normal' },
                                            { n: 15, reward: '솔 에르다/솔 에르다 조각 선택권', qty: '1개', tier: 'good' },
                                            { n: 16, reward: 'VIP 부스터', qty: '10개', tier: 'normal' },
                                            { n: 17, reward: 'VIP 사우나 이용권', qty: '1개', tier: 'normal' },
                                            { n: 18, reward: '뽀송 홍조/꽃잎 스킨 교환권', qty: '1개', tier: 'special' },
                                            { n: 19, reward: '카르마 검은 환생의 불꽃', qty: '200개', tier: 'good' },
                                            { n: 20, reward: '성장의 비약 (200~269)', qty: '1개', tier: 'special' },
                                            { n: 21, reward: '상급 EXP 교환권', qty: '2000개', tier: 'normal' },
                                            { n: 22, reward: 'VIP 사우나 이용권', qty: '1개', tier: 'normal' },
                                            { n: 23, reward: '아르고 호 커스텀 배경 교환권', qty: '1개', tier: 'special' },
                                            { n: 24, reward: '페어리 하트 교환권', qty: '1개', tier: 'good' },
                                            { n: 25, reward: '솔 에르다/솔 에르다 조각 선택권', qty: '1개', tier: 'good' },
                                            { n: 26, reward: 'VIP 부스터', qty: '10개', tier: 'normal' },
                                            { n: 27, reward: 'VIP 사우나 이용권', qty: '1개', tier: 'normal' },
                                            { n: 28, reward: '아르고 정보원 의상 세트 교환권', qty: '1개', tier: 'special' },
                                            { n: 29, reward: '카르마 에디셔널 에픽 잠재능력 부여 스크롤 100%', qty: '1개', tier: 'special' },
                                            { n: 30, reward: '카르마 스타포스 17성 강화권 (160제)', qty: '1개', tier: 'special' },
                                            { n: 31, reward: '상급 EXP 교환권', qty: '2000개', tier: 'normal' },
                                            { n: 32, reward: 'VIP 사우나 이용권', qty: '1개', tier: 'normal' },
                                            { n: 33, reward: '마네킹/슬롯 확장 선택권', qty: '1개', tier: 'good' },
                                            { n: 34, reward: '카르마 블랙 큐브', qty: '20개', tier: 'special' },
                                            { n: 35, reward: '솔 에르다/솔 에르다 조각 선택권', qty: '1개', tier: 'good' },
                                            { n: 36, reward: 'VIP 부스터', qty: '10개', tier: 'normal' },
                                            { n: 37, reward: 'VIP 사우나 이용권', qty: '1개', tier: 'normal' },
                                            { n: 38, reward: '캐릭터 선택창 테마 교환권 - 아르고 호', qty: '1개', tier: 'special' },
                                            { n: 39, reward: '카르마 화이트 에디셔널 큐브', qty: '20개', tier: 'special' },
                                            { n: 40, reward: '성장의 비약 (200~279)', qty: '1개', tier: 'legendary' },
                                        ].map((item) => {
                                            const isLeg = item.tier === 'legendary';
                                            const isSpec = item.tier === 'special';
                                            const isGood = item.tier === 'good';
                                            const bgClass = isLeg
                                                ? 'bg-gradient-to-r from-amber-950/40 via-yellow-900/30 to-amber-950/40'
                                                : isSpec
                                                ? 'bg-violet-950/20'
                                                : isGood
                                                ? 'bg-teal-950/15'
                                                : 'hover:bg-slate-800/40';
                                            return (
                                                <tr key={item.n} className={`${bgClass} transition-colors`}>
                                                    <td className="py-2 px-3 text-center font-mono">
                                                        <span className={isLeg ? 'text-amber-300 font-black' : isSpec ? 'text-violet-300 font-bold' : isGood ? 'text-teal-300 font-semibold' : 'text-slate-400'}>
                                                            {item.n}회
                                                        </span>
                                                    </td>
                                                    <td className="py-2 px-3">
                                                        <span className={isLeg ? 'text-amber-200 font-black text-sm' : isSpec ? 'text-violet-200 font-bold' : isGood ? 'text-teal-100 font-medium' : 'text-slate-200'}>
                                                            {item.reward}
                                                        </span>
                                                    </td>
                                                    <td className="py-2 px-3 text-right font-mono">
                                                        <span className={isLeg ? 'text-amber-300 font-black' : isSpec ? 'text-violet-300 font-bold' : isGood ? 'text-teal-300 font-semibold' : 'text-slate-400'}>
                                                            {item.qty}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 40회 정찰 일지 전체 보상 총합 요약 */}
                        <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/40 shadow-xl space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/60 pb-2.5">
                                <h4 className="text-sm sm:text-base font-bold text-teal-300 flex items-center gap-2">
                                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                                    🎯 정찰 일지 40회 완주 시 받는 보상 총합 요약
                                </h4>
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-700/50 font-semibold">
                                    품목별 최종 누적 수량
                                </span>
                            </div>
                            <p className="text-xs text-slate-300 break-keep">
                                40회 정찰을 모두 완료했을 때 최종적으로 인벤토리에 들어오는 모든 아이템의 총합 수량입니다.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                                {/* 1. 성장 & 경험치 재화 */}
                                <div className="p-3 rounded-xl bg-slate-800/60 border border-indigo-700/30 space-y-2">
                                    <p className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 border-b border-indigo-800/40 pb-1.5">
                                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> 성장 & 경험치 (총 10종)
                                    </p>
                                    <div className="space-y-1 text-xs">
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-amber-200 font-bold">성장의 비약 (200~279)</span>
                                            <span className="font-mono font-bold text-amber-300">총 1개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-slate-200">성장의 비약 (200~269)</span>
                                            <span className="font-mono font-bold text-white">총 1개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-teal-200">솔 에르다/조각 선택권</span>
                                            <span className="font-mono font-bold text-teal-300">총 4개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-slate-200">VIP 부스터 (10개씩 4회)</span>
                                            <span className="font-mono font-bold text-amber-300">총 40개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-slate-200">VIP 사우나 이용권</span>
                                            <span className="font-mono font-bold text-cyan-300">총 8개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-slate-200">상급 EXP 교환권</span>
                                            <span className="font-mono font-bold text-indigo-300">총 6,000개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-slate-200">선택 심볼 교환권</span>
                                            <span className="font-mono font-bold text-white">총 300개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-slate-200">경험의 코어 젬스톤</span>
                                            <span className="font-mono font-bold text-white">총 150개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-slate-200">스페셜 명예의 훈장</span>
                                            <span className="font-mono font-bold text-white">총 200개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5">
                                            <span className="text-slate-200">정령의 펜던트 교환권 (30일)</span>
                                            <span className="font-mono font-bold text-white">총 1개</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. 스펙업 & 장비 강화 */}
                                <div className="p-3 rounded-xl bg-slate-800/60 border border-amber-700/30 space-y-2">
                                    <p className="text-xs font-bold text-amber-300 flex items-center gap-1.5 border-b border-amber-800/40 pb-1.5">
                                        <Sword className="w-3.5 h-3.5 text-amber-400" /> 스펙업 & 강화 (총 8종)
                                    </p>
                                    <div className="space-y-1 text-xs">
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-amber-200 font-bold">카르마 화이트 에디 큐브</span>
                                            <span className="font-mono font-bold text-amber-300">총 20개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-amber-200 font-bold">카르마 블랙 큐브</span>
                                            <span className="font-mono font-bold text-amber-300">총 20개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-violet-200 font-bold">카르마 17성 강화권 (160제)</span>
                                            <span className="font-mono font-bold text-violet-300">총 1개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-slate-200">카르마 유니크 잠재 스크롤 100%</span>
                                            <span className="font-mono font-bold text-yellow-300">총 1개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-slate-200">카르마 에디 에픽 잠재 스크롤 100%</span>
                                            <span className="font-mono font-bold text-purple-300">총 1개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-slate-200">페어리 하트 교환권</span>
                                            <span className="font-mono font-bold text-white">총 1개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-slate-200">카르마 검은 환생의 불꽃</span>
                                            <span className="font-mono font-bold text-white">총 200개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5">
                                            <span className="text-slate-200">마네킹/슬롯 확장 선택권</span>
                                            <span className="font-mono font-bold text-white">총 1개</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. 코디 & 치장 / 의자 / 라이딩 */}
                                <div className="p-3 rounded-xl bg-slate-800/60 border border-violet-700/30 space-y-2">
                                    <p className="text-xs font-bold text-violet-300 flex items-center gap-1.5 border-b border-violet-800/40 pb-1.5">
                                        <Gift className="w-3.5 h-3.5 text-violet-400" /> 코디 & 치장/의자 (총 7종)
                                    </p>
                                    <div className="space-y-1 text-xs">
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-pink-200 font-bold">뽀송 홍조/꽃잎 스킨 교환권</span>
                                            <span className="font-mono font-bold text-pink-300">총 1개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-slate-200">아르고 정보원 의상 세트</span>
                                            <span className="font-mono font-bold text-white">총 1개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-teal-200 font-semibold">아르고 호의 비행 의자 (영구)</span>
                                            <span className="font-mono font-bold text-teal-300">총 1개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-slate-200">아르고 호 레플리카 라이딩 (영구)</span>
                                            <span className="font-mono font-bold text-white">총 1개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-slate-200">아르고 데미지 스킨 (유닛)</span>
                                            <span className="font-mono font-bold text-white">총 1개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5 border-b border-slate-700/30">
                                            <span className="text-slate-200">아르고 호 커스텀 배경 교환권</span>
                                            <span className="font-mono font-bold text-white">총 1개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-0.5">
                                            <span className="text-slate-200">캐릭터 선택창 테마 (아르고 호)</span>
                                            <span className="font-mono font-bold text-white">총 1개</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 매일 정찰 기본 지급 40일 누적 총합 */}
                            <div className="mt-2 p-3 rounded-xl bg-gradient-to-r from-teal-950/80 to-indigo-950/80 border border-teal-600/40 flex flex-wrap items-center justify-between gap-3">
                                <div className="text-xs text-slate-200">
                                    <span className="font-bold text-teal-300 text-sm block">⚓ 매일 정찰 기본 보상 40회 누적 총합</span>
                                    접속만 해도 매일 지급되는 3배 쿠폰과 아르고 주화의 40일 완주 총 수량입니다.
                                </div>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-yellow-600/50">
                                        <span className="text-slate-400 block text-[10px]">경험치 3배 쿠폰 (30분)</span>
                                        <span className="font-mono font-black text-yellow-300 text-sm">총 120개</span>
                                        <span className="text-[10px] text-slate-400 block">(4배 쿠폰 교환 시 최대 8개)</span>
                                    </div>
                                    <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-cyan-600/50">
                                        <span className="text-slate-400 block text-[10px]">아르고 주화</span>
                                        <span className="font-mono font-black text-cyan-300 text-sm">총 40,000개</span>
                                        <span className="text-[10px] text-slate-400 block">(주화 상점 풀 활용 가능)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 주의사항 박스 */}
                        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/50 text-xs text-slate-300 space-y-1.5 break-keep">
                            <p className="text-slate-400 font-semibold mb-1">📌 보상 수령 및 사용 유효기간 안내</p>
                            <p>• 모든 보상 아이템은 <strong className="text-white">월드 내 나의 캐릭터 간 이동만 가능</strong>합니다.</p>
                            <p>• 모든 보상 아이템은 <strong>2026년 11월 18일(수) 오후 11시 59분까지 수령 가능</strong>하며, 아르고 호의 비행 의자를 제외하고 <strong>2026년 11월 19일(목) 오전 2시까지 사용 가능</strong>합니다.</p>
                            <p>• <strong className="text-teal-300">아르고 호의 비행 의자</strong>는 <span className="text-amber-300 font-bold">영구 아이템</span>입니다.</p>
                            <p>• 선택 심볼 교환권: 어센틱심볼(세르니움, 아르크스, 오디움, 도원경, 아르테리아, 카르시온), 그랜드 어센틱심볼(탈라하트) 획득 가능</p>
                            <p>• 솔 에르다는 260레벨 이상, 6차 전직을 완료한 캐릭터만 사용할 수 있습니다.</p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* ===== 섹션 3: 아르고 호의 가호 ===== */}
                <section id="argo-skill" className="mb-10 sm:mb-12">
                    <h2 className="text-lg sm:text-2xl font-black text-white mb-4 flex items-center gap-2.5 pb-2 border-b border-slate-700">
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
                        <span>3. [이벤트 스킬] 아르고 호의 가호</span>
                    </h2>

                    <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 sm:p-5 mb-5 space-y-4 text-xs sm:text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/40">
                                <p className="text-violet-300 font-bold mb-1">■ 스킬 강화 및 효과 유지 기간</p>
                                <p className="text-slate-300">
                                    • 스킬 강화: <strong>2026.11.18(수) 23:59까지</strong><br />
                                    • <span className="text-amber-300 font-bold">스킬 효과 유지: 2026.11.25(수) 23:59까지 (1주일 추가 지속!)</span>
                                </p>
                            </div>
                            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/40">
                                <p className="text-violet-300 font-bold mb-1">■ 참여 및 공유 기준</p>
                                <p className="text-slate-300">
                                    • ‘아르고 호의 초대’ 시작 시 스킬 자동 획득<br />
                                    • 전투/전술 마법 포인트는 메이플ID 단위 획득, <strong>스킬과 레벨은 월드 내 공유</strong>
                                </p>
                            </div>
                        </div>

                        {/* 아르고 호의 가호 인게임 UI 스크린샷 */}
                        <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-violet-700/50 shadow-xl bg-slate-950 text-center">
                            <img
                                src="/images/blog/argo-visitor/argo-skill-ui.png"
                                alt="아르고 호의 가호 전투/전술 지원 마법 인게임 UI 스크린샷"
                                className="w-full max-w-2xl mx-auto h-auto block object-contain"
                            />
                            <div className="p-2 sm:p-2.5 bg-slate-800/90 border-t border-slate-700/60">
                                <p className="text-xs text-slate-300 font-medium flex items-center justify-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                                    <span>아르고 호의 가호 전투/전술 지원 마법 인게임 UI</span>
                                </p>
                            </div>
                        </div>

                        {/* 토벌 임무 시스템 상세 */}
                        <div className="p-3.5 sm:p-4 rounded-xl bg-violet-950/40 border border-violet-700/40 space-y-2">
                            <p className="font-bold text-white text-sm sm:text-base flex items-center gap-1.5">
                                <Sword className="w-4 h-4 text-amber-400" /> 토벌 임무 — 마법 포인트 획득 규칙
                            </p>
                            <ul className="text-slate-300 text-xs sm:text-sm space-y-1.5 leading-relaxed break-keep">
                                <li>• 매주 레벨 범위 몬스터 <strong>10,000마리</strong>를 처치하는 토벌 임무 수행</li>
                                <li>• 레범몬 <strong>2,000마리 처치할 때마다</strong> [토벌하기] 버튼 클릭 → <strong className="text-amber-300">전투 마법 포인트 5개 + 전술 마법 포인트 5개</strong> 획득 (매주 최대 25개)</li>
                                <li>• <strong className="text-teal-300">10,000마리 처치 후 한 번에 몰아서 완료</strong> 가능!</li>
                                <li>• 토벌 임무는 <strong>한 주 최대 5번, 이벤트 기간 내 최대 40번</strong>까지 완료 가능</li>
                                <li>• <strong>토벌 임무 패스:</strong> 지난 주 미완료분 1회당 3,000 메이플포인트로 완료 가능</li>
                                <li>• <strong>포인트 구매:</strong> 개당 1,000 메포로 구매 가능 (최초 각 10개, 매주 목 0시 각 10개씩 추가 누적)</li>
                                <li>• <strong>스킬 초기화:</strong> 9,900 메포로 스킬 전체 초기화 및 소모 포인트 100% 반환</li>
                            </ul>
                        </div>

                        {/* 지원 마법 소모 재화 표 */}
                        <div>
                            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                                <Coins className="w-4 h-4 text-amber-400" /> 스킬 단계별 필요 마법 포인트
                            </h3>
                            <div className="overflow-x-auto rounded-xl border border-slate-700/60">
                                <table className="w-full text-xs sm:text-sm min-w-[420px]">
                                    <thead>
                                        <tr className="bg-slate-900 text-slate-300 border-b border-slate-700">
                                            <th className="py-2 px-3 text-left">지원 마법</th>
                                            <th className="py-2 px-3 text-center">소모 재화</th>
                                            <th className="py-2 px-2 text-center">1레벨</th>
                                            <th className="py-2 px-2 text-center">2레벨</th>
                                            <th className="py-2 px-2 text-center">3레벨</th>
                                            <th className="py-2 px-2 text-center">4레벨</th>
                                            <th className="py-2 px-2 text-center text-amber-300 font-bold">5레벨</th>
                                            <th className="py-2 px-2 text-center text-amber-300 font-bold">6레벨</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        <tr className="bg-slate-800/40">
                                            <td className="py-2 px-3 font-semibold text-white">전투 지원 마법</td>
                                            <td className="py-2 px-3 text-center text-yellow-300 font-medium">전투 마법 포인트</td>
                                            <td className="py-2 px-2 text-center font-mono">1</td>
                                            <td className="py-2 px-2 text-center font-mono">3</td>
                                            <td className="py-2 px-2 text-center font-mono">7</td>
                                            <td className="py-2 px-2 text-center font-mono">14</td>
                                            <td className="py-2 px-2 text-center font-mono font-bold text-amber-300">20</td>
                                            <td className="py-2 px-2 text-center font-mono font-bold text-amber-300">25</td>
                                        </tr>
                                        <tr className="bg-slate-800/40">
                                            <td className="py-2 px-3 font-semibold text-white">전술 지원 마법</td>
                                            <td className="py-2 px-3 text-center text-cyan-300 font-medium">전술 마법 포인트</td>
                                            <td className="py-2 px-2 text-center font-mono">1</td>
                                            <td className="py-2 px-2 text-center font-mono">3</td>
                                            <td className="py-2 px-2 text-center font-mono">7</td>
                                            <td className="py-2 px-2 text-center font-mono">14</td>
                                            <td className="py-2 px-2 text-center font-mono font-bold text-amber-300">20</td>
                                            <td className="py-2 px-2 text-center font-mono font-bold text-amber-300">25</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 전투 지원 마법 11종 전체 표 */}
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-white mb-2.5 flex items-center gap-1.5">
                                <Zap className="w-4 h-4 text-yellow-400" /> 전투 지원 마법 (캐릭터 능력치 강화 — 11종)
                            </h3>
                            <div className="overflow-x-auto rounded-xl border border-slate-700/60 shadow-md">
                                <table className="w-full text-xs min-w-[620px]">
                                    <thead>
                                        <tr className="bg-amber-950/70 text-amber-200 border-b border-amber-800/50">
                                            <th className="py-2 px-2.5 text-left font-bold w-24">종류</th>
                                            <th className="py-2 px-2.5 text-left font-bold">혜택</th>
                                            <th className="py-2 px-2 text-center font-bold">1레벨</th>
                                            <th className="py-2 px-2 text-center font-bold">2레벨</th>
                                            <th className="py-2 px-2 text-center font-bold">3레벨</th>
                                            <th className="py-2 px-2 text-center font-bold">4레벨</th>
                                            <th className="py-2 px-2 text-center font-bold text-amber-300">5레벨</th>
                                            <th className="py-2 px-2 text-center font-bold text-amber-300">6레벨</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {[
                                            { name: '공격력/마력', desc: '공격력/마력 증가', vals: ['+5', '+10', '+15', '+20', '+30', '+40'] },
                                            { name: '보스 데미지', desc: '보스 몬스터 공격 시 데미지 증가', vals: ['+5%', '+10%', '+15%', '+20%', '+30%', '+40%'] },
                                            { name: '방어율 무시', desc: '몬스터 방어율 무시 증가', vals: ['+5%', '+10%', '+15%', '+20%', '+30%', '+40%'] },
                                            { name: '올스탯', desc: '올스탯 증가', vals: ['+10', '+20', '+30', '+40', '+60', '+80'] },
                                            { name: 'HP/MP', desc: '최대 HP/MP 증가', vals: ['+500', '+1000', '+1500', '+2000', '+3000', '+4000'] },
                                            { name: '버프 지속시간', desc: '버프 지속시간 증가', vals: ['+5%', '+10%', '+15%', '+20%', '+25%', '+30%'] },
                                            { name: '크리티컬 확률', desc: '크리티컬 확률 증가', vals: ['+5%', '+10%', '+15%', '+20%', '+25%', '+30%'] },
                                            { name: '일반몹 데미지', desc: '일반 몬스터 공격 시 데미지 증가', vals: ['+5%', '+10%', '+15%', '+20%', '+30%', '+40%'] },
                                            { name: '아케인포스', desc: '아케인포스 증가', vals: ['+10', '+20', '+30', '+40', '+50', '+60'] },
                                            { name: '어센틱포스', desc: '어센틱포스 증가', vals: ['+10', '+20', '+30', '+40', '+50', '+60'] },
                                            { name: '획득 경험치', desc: '일반 몬스터 사냥 시 경험치 획득량 증가', vals: ['+2.5%', '+5%', '+7.5%', '+10%', '+12.5%', '+15%'] },
                                        ].map((r, i) => (
                                            <tr key={i} className="hover:bg-slate-800/40">
                                                <td className="py-2 px-2.5 font-bold text-white whitespace-nowrap">{r.name}</td>
                                                <td className="py-2 px-2.5 text-slate-300">{r.desc}</td>
                                                {r.vals.map((v, j) => (
                                                    <td key={j} className={`py-2 px-2 text-center font-mono ${j >= 4 ? 'font-bold text-amber-300' : 'text-slate-300'}`}>
                                                        {v}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 전술 지원 마법 8종 전체 표 */}
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-white mb-2.5 flex items-center gap-1.5">
                                <Shield className="w-4 h-4 text-teal-400" /> 전술 지원 마법 (컨텐츠 참여 보상 강화 — 8종)
                            </h3>
                            <div className="overflow-x-auto rounded-xl border border-slate-700/60 shadow-md">
                                <table className="w-full text-xs min-w-[620px]">
                                    <thead>
                                        <tr className="bg-teal-950/70 text-teal-200 border-b border-teal-800/50">
                                            <th className="py-2 px-2.5 text-left font-bold w-24">종류</th>
                                            <th className="py-2 px-2.5 text-left font-bold">혜택</th>
                                            <th className="py-2 px-2 text-center font-bold">1레벨</th>
                                            <th className="py-2 px-2 text-center font-bold">2레벨</th>
                                            <th className="py-2 px-2 text-center font-bold">3레벨</th>
                                            <th className="py-2 px-2 text-center font-bold">4레벨</th>
                                            <th className="py-2 px-2 text-center font-bold text-teal-300">5레벨</th>
                                            <th className="py-2 px-2 text-center font-bold text-teal-300">6레벨</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {[
                                            { name: '보스 솔 에르다', desc: '보스 처치 시 솔 에르다의 기운 획득량 증가', vals: ['+10%', '+20%', '+40%', '+60%', '+80%', '+100%'] },
                                            { name: '몬스터 컬렉션', desc: '몬스터 컬렉션 등록 확률 증가', vals: ['+10%', '+20%', '+40%', '+60%', '+80%', '+100%'] },
                                            { name: '몬스터파크 경치', desc: '몬스터파크 완료 시 획득 경험치 증가', vals: ['+5%', '+10%', '+20%', '+30%', '+40%', '+50%'] },
                                            { name: '아케인리버 일퀘 경치', desc: '아케인리버 지역 일퀘 완료 경험치 증가', vals: ['+5%', '+10%', '+20%', '+30%', '+40%', '+50%'] },
                                            { name: '아케인리버 일퀘 심볼', desc: '아케인리버 지역 일퀘 완료 심볼 추가', vals: ['+2', '+4', '+8', '+12', '+16', '+20'] },
                                            { name: '그란디스 일퀘 경치', desc: '그란디스 지역 일퀘 완료 경험치 증가', vals: ['+5%', '+10%', '+20%', '+30%', '+40%', '+50%'] },
                                            { name: '그란디스 일퀘 심볼', desc: '그란디스 지역 일퀘 완료 심볼 추가', vals: ['+2', '+3', '+4', '+5', '+7', '+9'] },
                                            { name: '유니온 주간 코인', desc: '[유니온] 주간 드래곤 퇴치 완료 시 코인 추가', vals: ['+100', '+150', '+200', '+250', '+300', '+400'] },
                                        ].map((r, i) => (
                                            <tr key={i} className="hover:bg-slate-800/40">
                                                <td className="py-2 px-2.5 font-bold text-white whitespace-nowrap">{r.name}</td>
                                                <td className="py-2 px-2.5 text-slate-300">{r.desc}</td>
                                                {r.vals.map((v, j) => (
                                                    <td key={j} className={`py-2 px-2 text-center font-mono ${j >= 4 ? 'font-bold text-teal-300' : 'text-slate-300'}`}>
                                                        {v}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/60 text-xs text-slate-400 space-y-1">
                            <p>※ ‘익스트림 몬스터파커’ 퀘스트 완료 시에도 몬스터파크 클리어 경험치 증가 효과가 적용됩니다.</p>
                            <p>※ 몬스터파크 핸즈에서는 몬스터파크 클리어 경험치 증가 효과를 받을 수 없습니다.</p>
                        </div>
                    </div>
                </section>

                {/* ===== 섹션 4: 어센던트 링크 ===== */}
                <section id="ascendant-link" className="mb-10 sm:mb-12">
                    <h2 className="text-lg sm:text-2xl font-black text-white mb-4 flex items-center gap-2.5 pb-2 border-b border-slate-700">
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                        <span>4. [성장 이벤트] 어센던트 링크 & 어센던트 펄스 링</span>
                    </h2>

                    <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 sm:p-5 mb-5 space-y-5 text-xs sm:text-sm">
                        {/* 펄스 링 기본 스펙 카드 */}
                        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 to-slate-900/80 border border-amber-600/40 space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-xl bg-amber-900/50 border border-amber-500/50 flex items-center justify-center text-amber-300">
                                        <Star className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-base">신규 130제 반지 — 어센던트 펄스 링</p>
                                        <p className="text-xs text-amber-300 font-medium">이벤트 시작 시 전용 UI에서 메이플ID당 1회 무료 획득 (영구)</p>
                                    </div>
                                </div>
                                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-900/60 text-amber-200 border border-amber-600/40 font-bold">
                                    최대 20성 강화 가능
                                </span>
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-1 text-center">
                                <div className="bg-slate-900/70 p-2 rounded-lg border border-slate-700/40">
                                    <p className="text-[11px] text-slate-400">올스탯</p>
                                    <p className="text-white font-bold text-sm">STR/DEX/INT/LUK +5</p>
                                </div>
                                <div className="bg-slate-900/70 p-2 rounded-lg border border-slate-700/40">
                                    <p className="text-[11px] text-slate-400">공격력 / 마력</p>
                                    <p className="text-white font-bold text-sm">+1 / +1</p>
                                </div>
                                <div className="bg-slate-900/70 p-2 rounded-lg border border-slate-700/40">
                                    <p className="text-[11px] text-slate-400">최대 HP / MP</p>
                                    <p className="text-white font-bold text-sm">+200 / +200</p>
                                </div>
                                <div className="bg-slate-900/70 p-2 rounded-lg border border-slate-700/40">
                                    <p className="text-[11px] text-slate-400">방어력</p>
                                    <p className="text-white font-bold text-sm">+150</p>
                                </div>
                                <div className="bg-slate-900/70 p-2 rounded-lg border border-slate-700/40">
                                    <p className="text-[11px] text-slate-400">장착 속성</p>
                                    <p className="text-teal-300 font-bold text-sm">교불 · 영구 · 고유장착</p>
                                </div>
                            </div>

                            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700/50 text-xs text-slate-300 space-y-1 break-keep">
                                <p>• <strong className="text-amber-300">강화 가능 항목:</strong> 스타포스 강화, 잠재능력 재설정, 에디셔널 잠재능력 재설정만 가능</p>
                                <p>• <strong className="text-red-400">강화 불가 항목:</strong> 주문서 및 추가옵션 강화 불가 / 장비 전승, 놀장, 분해, 합성 불가 / 길드 캐슬 제단 강화 불가</p>
                                <p>• <strong className="text-indigo-300">사용 가능 재화:</strong> 전용 강화 재화인 <span className="text-white font-bold">펄스 인핸서</span> 외에도 메소, 큐브, 이벤트 링 전용 강화 아이템 사용 가능</p>
                                <p>• ※ 펄스 인핸서 강화 시 썬데이 메이플(샤타, 미라클타임) 및 MVP/PC방 할인 미적용, 등급 상승 보장 횟수 미누적 (MVP 3회 재설정 기능은 적용)</p>
                            </div>
                        </div>

                        {/* 어센던트 링크 인게임 UI 스크린샷 */}
                        <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-amber-700/50 shadow-xl bg-slate-950 text-center">
                            <img
                                src="/images/blog/argo-visitor/argo-pulse-ring-ui.png"
                                alt="어센던트 링크 일일/주간 미션 및 어센던트 펄스 링 수령 UI 스크린샷"
                                className="w-full max-w-2xl mx-auto h-auto block object-contain"
                            />
                            <div className="p-2 sm:p-2.5 bg-slate-800/90 border-t border-slate-700/60">
                                <p className="text-xs text-slate-300 font-medium flex items-center justify-center gap-1.5">
                                    <Star className="w-3.5 h-3.5 text-amber-400" />
                                    <span>어센던트 링크 일일/주간 미션 및 펄스 링 전용 UI</span>
                                </p>
                            </div>
                        </div>

                        {/* 스타포스 강화 확률표 (0성 ~ 19성 공식 데이터) */}
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-1.5">
                                <TrendingUp className="w-4 h-4 text-teal-400" />
                                펄스 인핸서 사용 시 스타포스 단계별 성공률 & 파괴율 공식 데이터
                            </h3>
                            <div className="overflow-x-auto rounded-xl border border-slate-700/60 shadow-md">
                                <table className="w-full text-xs sm:text-sm min-w-[500px]">
                                    <thead>
                                        <tr className="bg-slate-900 text-slate-200 border-b border-slate-700">
                                            <th className="py-2.5 px-3 text-center font-bold">스타포스 단계</th>
                                            <th className="py-2.5 px-3 text-center font-bold text-cyan-300">인핸서 소모량</th>
                                            <th className="py-2.5 px-3 text-center font-bold text-indigo-300">파괴 방지 적용 시</th>
                                            <th className="py-2.5 px-3 text-center font-bold text-green-400">성공률</th>
                                            <th className="py-2.5 px-3 text-center font-bold text-red-400">파괴율</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {[
                                            { s: '0성 → 1성', c: 3, p: '-', r: '99.75%', d: '-' },
                                            { s: '1성 → 2성', c: 4, p: '-', r: '94.50%', d: '-' },
                                            { s: '2성 → 3성', c: 5, p: '-', r: '89.25%', d: '-' },
                                            { s: '3성 → 4성', c: 6, p: '-', r: '89.25%', d: '-' },
                                            { s: '4성 → 5성', c: 7, p: '-', r: '84.00%', d: '-' },
                                            { s: '5성 → 6성', c: 8, p: '-', r: '78.75%', d: '-' },
                                            { s: '6성 → 7성', c: 9, p: '-', r: '73.50%', d: '-' },
                                            { s: '7성 → 8성', c: 10, p: '-', r: '68.25%', d: '-' },
                                            { s: '8성 → 9성', c: 12, p: '-', r: '63.00%', d: '-' },
                                            { s: '9성 → 10성', c: 14, p: '-', r: '57.75%', d: '-' },
                                            { s: '10성 → 11성', c: 18, p: '-', r: '52.50%', d: '-' },
                                            { s: '11성 → 12성', c: 24, p: '-', r: '47.25%', d: '-' },
                                            { s: '12성 → 13성', c: 40, p: '-', r: '42.00%', d: '-' },
                                            { s: '13성 → 14성', c: 65, p: '-', r: '36.75%', d: '-' },
                                            { s: '14성 → 15성', c: 72, p: '-', r: '31.50%', d: '-' },
                                            { s: '15성 → 16성', c: 74, p: '222개', r: '31.50%', d: '2.055%' },
                                            { s: '16성 → 17성', c: 88, p: '264개', r: '31.50%', d: '2.055%' },
                                            { s: '17성 → 18성', c: 130, p: '390개', r: '15.75%', d: '6.74%' },
                                            { s: '18성 → 19성', c: 320, p: '-', r: '15.75%', d: '6.74%' },
                                            { s: '19성 → 20성', c: 600, p: '-', r: '15.75%', d: '8.425%' },
                                        ].map((row, i) => (
                                            <tr key={i} className={i >= 15 ? 'bg-red-950/15 hover:bg-red-950/25' : 'hover:bg-slate-800/40'}>
                                                <td className="py-1.5 sm:py-2 px-3 text-center font-mono font-medium text-white">{row.s}</td>
                                                <td className="py-1.5 sm:py-2 px-3 text-center font-mono text-cyan-300 font-bold">{row.c}개</td>
                                                <td className="py-1.5 sm:py-2 px-3 text-center font-mono text-indigo-300">{row.p}</td>
                                                <td className="py-1.5 sm:py-2 px-3 text-center font-mono text-green-400 font-semibold">{row.r}</td>
                                                <td className="py-1.5 sm:py-2 px-3 text-center font-mono text-red-400">{row.d}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 잠재능력 재설정 소모량 및 등급 상승 확률 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-xs sm:text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> 일반 잠재능력 재설정 확률
                                </h4>
                                <div className="overflow-x-auto rounded-xl border border-slate-700/60">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="bg-slate-900 text-slate-300 border-b border-slate-700">
                                                <th className="py-2 px-2.5 text-left">등급</th>
                                                <th className="py-2 px-2 text-center text-cyan-300">인핸서 소모</th>
                                                <th className="py-2 px-2 text-right text-green-400">등급 상승 확률</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800">
                                            <tr>
                                                <td className="py-1.5 px-2.5 font-bold text-blue-300">레어</td>
                                                <td className="py-1.5 px-2 text-center font-mono">15개</td>
                                                <td className="py-1.5 px-2 text-right font-mono text-green-400">15.0000001275%</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1.5 px-2.5 font-bold text-purple-300">에픽</td>
                                                <td className="py-1.5 px-2 text-center font-mono">60개</td>
                                                <td className="py-1.5 px-2 text-right font-mono text-green-400">3.5000%</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1.5 px-2.5 font-bold text-yellow-300">유니크</td>
                                                <td className="py-1.5 px-2 text-center font-mono">125개</td>
                                                <td className="py-1.5 px-2 text-right font-mono text-green-400">1.4000%</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1.5 px-2.5 font-bold text-emerald-300">레전드리</td>
                                                <td className="py-1.5 px-2 text-center font-mono">150개</td>
                                                <td className="py-1.5 px-2 text-right font-mono text-slate-500">-</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs sm:text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> 에디셔널 잠재능력 재설정 확률
                                </h4>
                                <div className="overflow-x-auto rounded-xl border border-slate-700/60">
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="bg-slate-900 text-slate-300 border-b border-slate-700">
                                                <th className="py-2 px-2.5 text-left">등급</th>
                                                <th className="py-2 px-2 text-center text-cyan-300">인핸서 소모</th>
                                                <th className="py-2 px-2 text-right text-green-400">등급 상승 확률</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800">
                                            <tr>
                                                <td className="py-1.5 px-2.5 font-bold text-blue-300">레어</td>
                                                <td className="py-1.5 px-2 text-center font-mono">35개</td>
                                                <td className="py-1.5 px-2 text-right font-mono text-green-400">2.3810%</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1.5 px-2.5 font-bold text-purple-300">에픽</td>
                                                <td className="py-1.5 px-2 text-center font-mono">100개</td>
                                                <td className="py-1.5 px-2 text-right font-mono text-green-400">0.9804%</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1.5 px-2.5 font-bold text-yellow-300">유니크</td>
                                                <td className="py-1.5 px-2 text-center font-mono">245개</td>
                                                <td className="py-1.5 px-2 text-right font-mono text-green-400">0.7000%</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1.5 px-2.5 font-bold text-emerald-300">레전드리</td>
                                                <td className="py-1.5 px-2 text-center font-mono">290개</td>
                                                <td className="py-1.5 px-2 text-right font-mono text-slate-500">-</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* 펄스 인핸서 스타포스 & 잠재능력 평균 기댓값 분석 */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/40 shadow-xl space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-500/30 pb-3">
                                <div>
                                    <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-indigo-400" />
                                        펄스 인핸서 평균 기댓값 분석 (스타포스 & 잠재능력)
                                    </h4>
                                    <p className="text-xs text-indigo-200/80 mt-0.5">
                                        공식 확률 데이터 기반 기하분포 및 마르코프 체인(10만 회 시뮬레이션) 산출 수학적 평균값
                                    </p>
                                </div>
                                <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-900/60 text-indigo-200 border border-indigo-500/40 font-semibold">
                                    기대 비용 가이드
                                </span>
                            </div>

                            {/* 1. 잠재능력 등급업 평균 소모량 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                {/* 일반 잠재 */}
                                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-yellow-500/30 space-y-2.5">
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                                        <span className="font-bold text-yellow-300 text-xs sm:text-sm flex items-center gap-1.5">
                                            <Sparkles className="w-4 h-4 text-yellow-400" /> 일반 잠재능력 등급업 평균
                                        </span>
                                        <span className="text-[11px] text-slate-400">레어 스타트 기준</span>
                                    </div>
                                    <div className="space-y-1.5 text-xs">
                                        <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                                            <span className="text-slate-300">레어 → 에픽 (15.0%)</span>
                                            <span className="font-mono text-cyan-300 font-bold">평균 6.7회 · 100개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                                            <span className="text-slate-300">에픽 → 유니크 (3.5%)</span>
                                            <span className="font-mono text-cyan-300 font-bold">평균 28.6회 · 1,714개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                                            <span className="text-slate-300">유니크 → 레전드리 (1.4%)</span>
                                            <span className="font-mono text-cyan-300 font-bold">평균 71.4회 · 8,929개</span>
                                        </div>
                                        <div className="p-2 rounded-lg bg-yellow-950/40 border border-yellow-500/40 flex justify-between items-center mt-2">
                                            <span className="text-yellow-200 font-bold text-xs">레어 → 레전드리 누적 평균</span>
                                            <span className="font-mono text-yellow-300 font-extrabold text-sm">약 10,743개 (107회)</span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-slate-400">
                                        ※ 이벤트 확정 재화(13,560개) 이내로 <strong>평균적인 레전드리 등급업 직작</strong>이 충분히 가능합니다!
                                    </p>
                                </div>

                                {/* 에디셔널 잠재 */}
                                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/30 space-y-2.5">
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                                        <span className="font-bold text-cyan-300 text-xs sm:text-sm flex items-center gap-1.5">
                                            <Sparkles className="w-4 h-4 text-cyan-400" /> 에디셔널 잠재능력 등급업 평균
                                        </span>
                                        <span className="text-[11px] text-slate-400">레어 스타트 기준</span>
                                    </div>
                                    <div className="space-y-1.5 text-xs">
                                        <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                                            <span className="text-slate-300">레어 → 에픽 (2.38%)</span>
                                            <span className="font-mono text-cyan-300 font-bold">평균 42.0회 · 1,470개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                                            <span className="text-slate-300">에픽 → 유니크 (0.98%)</span>
                                            <span className="font-mono text-cyan-300 font-bold">평균 102.0회 · 10,200개</span>
                                        </div>
                                        <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                                            <span className="text-slate-300">유니크 → 레전드리 (0.70%)</span>
                                            <span className="font-mono text-cyan-300 font-bold">평균 142.9회 · 35,000개</span>
                                        </div>
                                        <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/40 flex justify-between items-center mt-2">
                                            <span className="text-cyan-200 font-bold text-xs">에디 레어 → 레전 누적 평균</span>
                                            <span className="font-mono text-cyan-300 font-extrabold text-sm">약 46,670개 (287회)</span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-slate-400">
                                        ※ 에디셔널은 <strong>에픽(약 1,470개)</strong> 주차 가성비가 가장 뛰어나며, 레전드리는 대량 파밍이 필요합니다.
                                    </p>
                                </div>
                            </div>

                            {/* 2. 스타포스 단계별 기댓값 테이블 */}
                            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                                    <span className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                                        <Target className="w-4 h-4 text-rose-400" /> 스타포스 0성 출발 목표 단계별 평균 기대 비용
                                    </span>
                                    <span className="text-[11px] text-slate-400">실패 하락/파괴/찬스타임 반영</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs text-left">
                                        <thead>
                                            <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                                                <th className="py-2 px-3 text-center">목표 성수</th>
                                                <th className="py-2 px-3 text-center text-indigo-300 font-bold">파괴 방지 적용 시</th>
                                                <th className="py-2 px-3 text-center text-slate-400">노파방(파방 미적용)</th>
                                                <th className="py-2 px-3 text-center text-slate-400">평균 시도 횟수</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800/60 font-mono">
                                            <tr className="hover:bg-slate-800/30">
                                                <td className="py-2 px-3 text-center font-bold text-white">0성 → 10성</td>
                                                <td className="py-2 px-3 text-center text-cyan-300 font-bold">108개</td>
                                                <td className="py-2 px-3 text-center text-slate-400">108개</td>
                                                <td className="py-2 px-3 text-center text-slate-400 font-sans">약 13회</td>
                                            </tr>
                                            <tr className="hover:bg-slate-800/30">
                                                <td className="py-2 px-3 text-center font-bold text-white">0성 → 12성</td>
                                                <td className="py-2 px-3 text-center text-cyan-300 font-bold">232개</td>
                                                <td className="py-2 px-3 text-center text-slate-400">231개</td>
                                                <td className="py-2 px-3 text-center text-slate-400 font-sans">약 19회</td>
                                            </tr>
                                            <tr className="hover:bg-slate-800/30">
                                                <td className="py-2 px-3 text-center font-bold text-white">0성 → 15성</td>
                                                <td className="py-2 px-3 text-center text-cyan-300 font-bold">1,996개</td>
                                                <td className="py-2 px-3 text-center text-slate-400">1,990개</td>
                                                <td className="py-2 px-3 text-center text-slate-400 font-sans">약 64회</td>
                                            </tr>
                                            <tr className="bg-amber-950/25 hover:bg-amber-950/40 border-l-2 border-amber-400">
                                                <td className="py-2 px-3 text-center font-bold text-amber-300">0성 → 17성</td>
                                                <td className="py-2 px-3 text-center text-amber-300 font-extrabold text-sm">약 5,063개</td>
                                                <td className="py-2 px-3 text-center text-slate-400">약 3,498개 (파괴 0.28회)</td>
                                                <td className="py-2 px-3 text-center text-slate-300 font-sans">약 77회</td>
                                            </tr>
                                            <tr className="hover:bg-slate-800/30">
                                                <td className="py-2 px-3 text-center font-bold text-purple-300">0성 → 18성</td>
                                                <td className="py-2 px-3 text-center text-purple-300 font-bold">약 18,369개</td>
                                                <td className="py-2 px-3 text-center text-slate-400">약 10,447개 (파괴 1.61회)</td>
                                                <td className="py-2 px-3 text-center text-slate-400 font-sans">약 129회</td>
                                            </tr>
                                            <tr className="hover:bg-slate-800/30 text-slate-400">
                                                <td className="py-2 px-3 text-center font-bold text-rose-300">0성 → 19성</td>
                                                <td className="py-2 px-3 text-center text-rose-300 font-bold">약 87,225개</td>
                                                <td className="py-2 px-3 text-center text-slate-400">약 47,877개 (파괴 8.7회)</td>
                                                <td className="py-2 px-3 text-center text-slate-400 font-sans">약 410회</td>
                                            </tr>
                                            <tr className="bg-red-950/30 hover:bg-red-950/40">
                                                <td className="py-2 px-3 text-center font-bold text-red-400">0성 → 20성 (풀성)</td>
                                                <td className="py-2 px-3 text-center text-red-400 font-extrabold">약 421,522개</td>
                                                <td className="py-2 px-3 text-center text-slate-400">약 235,092개 (파괴 43.8회)</td>
                                                <td className="py-2 px-3 text-center text-slate-400 font-sans">약 1,800회</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* 3. 확정 13,560개 기준 최적의 세팅 추천 */}
                            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-200 space-y-2">
                                <p className="font-bold text-amber-300 flex items-center gap-1.5">
                                    💡 미션 확정 획득량(13,560개) 기준 추천 세팅 가이드
                                </p>
                                <ul className="space-y-1.5 pl-1 text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-400 font-bold shrink-0">① [가장 추천] 17성 파방 + 레전드리 직작:</span>
                                        <span>스타포스 17성을 파괴 방지로 안전하게 띄운 뒤(평균 약 5,063개 소모), 남은 약 8,500개의 인핸서로 일반 잠재 레전드리 등급업(평균 10,743개)에 도전하는 것이 기대 스펙 상승폭이 가장 큽니다.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-400 font-bold shrink-0">② [안정적인 밸런스형]:</span>
                                        <span>스타포스 17성 파방(~5,063개) + 일반 잠재 유니크(~1,814개) + 에디셔널 에픽(~1,470개) 완성 후, 남은 약 5,200개로 주스탯 15% 이상 유효 옵션을 뽑는 세팅입니다.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-400 font-bold shrink-0">③ [18성 이상 도전 시]:</span>
                                        <span>18성은 파방 적용 시 평균 약 18,369개가 소모되므로, 미션 외에도 레벨 범위 몬스터 사냥을 통해 필드 드롭 인핸서를 추가로 대량 확보해야 합니다.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        {/* 펄스 인핸서 수급처 (일일 수집 / 주간 조사 미션) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-700/50 space-y-1.5">
                                <p className="font-bold text-teal-300 text-sm flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4" /> 일일 수집 미션 (매일)
                                </p>
                                <p className="text-slate-200">
                                    • 매일 레범몬 <strong>10,000마리</strong> 처치 후 [완료하기]<br />
                                    • <strong>5,000마리마다:</strong> 펄스 인핸서 60개 + VIP 부스터 1개 누적<br />
                                    • (일일 총합: <strong>펄스 인핸서 120개 + VIP 부스터 2개</strong>)
                                </p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-700/50 space-y-1.5">
                                <p className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4" /> 주간 조사 미션 (주간)
                                </p>
                                <p className="text-slate-200">
                                    • 매주 레범몬 <strong>30,000마리</strong> 처치 후 [완료하기]<br />
                                    • <strong>10,000마리마다:</strong> 펄스 인핸서 250개 획득<br />
                                    • (주간 총합: <strong>펄스 인핸서 750개</strong>, 이벤트 기간 최대 8회 완료 가능)
                                </p>
                            </div>
                        </div>

                        {/* 펄스 인핸서 이벤트 기간 총 획득량 계산 카드 */}
                        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/50 via-slate-900/90 to-teal-950/50 border border-amber-500/40 shadow-xl space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/60 pb-2">
                                <h4 className="text-sm sm:text-base font-bold text-amber-300 flex items-center gap-2">
                                    <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                                    📊 이벤트 기간 동안 얻을 수 있는 펄스 인핸서 총합 계산
                                </h4>
                                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-900/60 text-amber-200 border border-amber-600/40 font-bold">
                                    총 63일 (9주) 기준
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                                <div className="p-3 rounded-lg bg-slate-900/80 border border-teal-700/40">
                                    <p className="text-slate-400 font-medium mb-1">일일 수집 미션 (63일)</p>
                                    <p className="text-white font-mono font-bold text-sm">63일 × 120개</p>
                                    <p className="text-teal-300 font-bold text-base mt-0.5">= 7,560개</p>
                                    <p className="text-[11px] text-slate-400 mt-1">※ VIP 부스터 총 126개 추가 획득</p>
                                </div>
                                <div className="p-3 rounded-lg bg-slate-900/80 border border-amber-700/40">
                                    <p className="text-slate-400 font-medium mb-1">주간 조사 미션 (최대 8회)</p>
                                    <p className="text-white font-mono font-bold text-sm">8회 × 750개</p>
                                    <p className="text-amber-300 font-bold text-base mt-0.5">= 6,000개</p>
                                    <p className="text-[11px] text-slate-400 mt-1">※ 매주 목요일 1회씩 충전</p>
                                </div>
                                <div className="p-3 rounded-lg bg-gradient-to-br from-amber-950/60 to-yellow-900/40 border border-yellow-500/50">
                                    <p className="text-yellow-200 font-medium mb-1">미션 확정 획득 총합</p>
                                    <p className="text-white font-mono font-bold text-sm">7,560개 + 6,000개</p>
                                    <p className="text-yellow-300 font-mono font-black text-lg mt-0.5">총 13,560개 + α</p>
                                    <p className="text-[11px] text-yellow-100 mt-1">※ 레범몬 필드 드롭 추가분(+α) 별도</p>
                                </div>
                            </div>

                            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300 break-keep">
                                💡 <strong className="text-white">활용 꿀팁:</strong> 미션으로만 <strong className="text-amber-300 font-bold">13,560개</strong>를 확정 획득하므로, 0성부터 17성 파괴 방지 강화(15→17성 파방 시도당 222~390개 소모)는 물론, 유니크/레전드리 잠재능력 재설정까지 충분히 시도할 수 있는 넉넉한 수량입니다!
                            </div>
                        </div>

                        <p className="text-xs text-slate-400">
                            ※ 레벨 범위 몬스터 사냥 시에도 정해진 확률에 따라 ‘펄스 인핸서’가 필드 드롭됩니다 (교환 불가, 메이플ID 공유).
                        </p>
                    </div>
                </section>

                {/* ===== 섹션 5: 아르고 주화 상점 ===== */}
                <section id="argo-shop" className="mb-10 sm:mb-12">
                    <h2 className="text-lg sm:text-2xl font-black text-white mb-4 flex items-center gap-2.5 pb-2 border-b border-slate-700">
                        <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                        <span>5. [이벤트샵] 아르고 주화 상점</span>
                    </h2>

                    <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 sm:p-5 mb-5 space-y-4 text-xs sm:text-sm">
                        <div className="bg-cyan-950/30 border border-cyan-700/40 p-3 rounded-xl text-slate-300">
                            <p className="text-cyan-300 font-semibold mb-1">■ 이용 위치 및 기간</p>
                            <p>• 위치: &lt;아르고 호 갑판&gt; NPC <strong>시그너스 보급병</strong> 또는 ‘[출석 이벤트] 프로텍트 아르고’ UI</p>
                            <p>• 이용 기간: 2026년 9월 17일(목) 점검 후 ~ 11월 18일(수) 23:59 (아이템 사용은 11/19 오전 2시까지)</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* 강화 품목 13종 */}
                            <div className="space-y-2">
                                <h3 className="font-bold text-amber-300 text-sm sm:text-base flex items-center gap-1.5 pb-1 border-b border-amber-800/40">
                                    <Sword className="w-4 h-4" /> 강화 카테고리 (13종)
                                </h3>
                                <div className="space-y-1">
                                    {[
                                        '카르마 브론즈 에디셔널 큐브',
                                        '카르마 실버 큐브',
                                        '에픽 잠재능력 부여 스크롤 100%',
                                        '스페셜 에디셔널 잠재능력 부여 스크롤 100%',
                                        '이노센트 주문서 100%',
                                        '펫장비 주문서 선택권 (공/마 100% 택1)',
                                        '순백의 주문서 100%',
                                        '이벤트 링 선택권',
                                        '이벤트 링 전용 골드 큐브',
                                        '이벤트 링 전용 레전드리 잠재능력 부여 스크롤 100%',
                                        '카르마 유니크 잠재능력 부여 스크롤 100%',
                                        '카르마 에디셔널 에픽 잠재능력 부여 스크롤 100%',
                                        '카르마 스페셜 하트 주문서 선택권 (공/마 100% 택1)',
                                    ].map((name, i) => (
                                        <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-900/50 border border-slate-700/30 text-slate-200">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                            <span>{name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 성장 품목 16종 */}
                            <div className="space-y-2">
                                <h3 className="font-bold text-teal-300 text-sm sm:text-base flex items-center gap-1.5 pb-1 border-b border-teal-800/40">
                                    <Sparkles className="w-4 h-4" /> 성장 카테고리 (16종)
                                </h3>
                                <div className="space-y-1">
                                    {[
                                        'AP 초기화 주문서',
                                        'SP 초기화 주문서',
                                        '의문의 모몽 (유효기간 무제한)',
                                        '성향 성장의 비약',
                                        '선택 슬롯 8칸 확장권',
                                        '무한의 피로회복제',
                                        '캐릭터 슬롯 증가 쿠폰',
                                        '경험의 코어 젬스톤',
                                        '카오스 서큘레이터',
                                        '블랙 서큘레이터',
                                        '레전드리 서큘레이터',
                                        '슈피겔라의 황금 딸기 농장 1회 입장권',
                                        '익스트림 성장의 비약',
                                        '성장의 비약 (200~249)',
                                        '성장의 비약 (200~259)',
                                        '솔 에르다',
                                    ].map((name, i) => (
                                        <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-900/50 border border-slate-700/30 text-slate-200">
                                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                                            <span>{name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 상세 팁 */}
                        <div className="p-3 rounded-xl bg-slate-900/70 text-xs text-slate-300 space-y-1 break-keep">
                            <p>• <strong>슈피겔라의 황금 딸기 농장:</strong> 101~259레벨 캐릭터 전용 / 제한시간 15분 동안 황금 딸기 1,000마리 처치하여 폭발적 경험치 획득!</p>
                            <p>• <strong>펫장비/하트 주문서 선택권:</strong> 공격력 100% 또는 마력 100% 중 선택 가능 (유효기간 7일, 월드 내 이동 가능)</p>
                            <p>• <strong>솔 에르다:</strong> 260레벨 이상 6차 전직 완료 캐릭터만 사용 가능</p>
                        </div>
                    </div>
                </section>

                {/* ===== 섹션 6: 메소샵 ===== */}
                <section id="meso-shop" className="mb-10 sm:mb-12">
                    <h2 className="text-lg sm:text-2xl font-black text-white mb-4 flex items-center gap-2.5 pb-2 border-b border-slate-700">
                        <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                        <span>6. [이벤트샵] 메소샵 판매 아이템 총정리</span>
                    </h2>

                    <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 sm:p-5 mb-5 space-y-4 text-xs sm:text-sm">
                        <div className="bg-emerald-950/30 border border-emerald-700/40 p-3 rounded-xl text-slate-300">
                            <p className="text-emerald-300 font-semibold mb-1">■ 이용 위치</p>
                            <p>&lt;아르고 호 갑판&gt; NPC <strong>엘라르도</strong> 또는 ‘[출석 이벤트] 프로텍트 아르고’ UI를 통해 이용</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* 소비류 10종 */}
                            <div className="space-y-2">
                                <h3 className="font-bold text-emerald-300 text-sm sm:text-base flex items-center gap-1.5 pb-1 border-b border-emerald-800/40">
                                    <Gift className="w-4 h-4" /> 소비 아이템 (10종)
                                </h3>
                                <div className="space-y-1">
                                    {[
                                        'VIP 버프 (경험치)',
                                        'VIP 버프 (능력치)',
                                        '카르마 놀라운 긍정의 혼돈 주문서 100%',
                                        '펫장비 능력치 이전 주문서',
                                        '데미지 스킨 추출권',
                                        '안드로이드 이어센서 클립',
                                        '뽀송 꽃잎 스킨 안드로이드 변경권',
                                        '홍조 꽃잎 스킨 안드로이드 변경권',
                                        '가방/지갑 선택권',
                                        '고급 가방 선택권 (안드/훈장 가방 최대 5개)',
                                    ].map((name, i) => (
                                        <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-900/50 border border-slate-700/30 text-slate-200">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                            <span>{name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 장비 & 치장/코스튬 17종 */}
                            <div className="space-y-2">
                                <h3 className="font-bold text-violet-300 text-sm sm:text-base flex items-center gap-1.5 pb-1 border-b border-violet-800/40">
                                    <Sparkles className="w-4 h-4" /> 장비 & 치장/의자/라이딩
                                </h3>
                                <div className="space-y-1">
                                    {[
                                        '플라즈마 하트 (장비 — 본품/흔적 보유 시만 구매)',
                                        '어센던트 펄스 링 (장비 — 본품/흔적 보유 시만 구매)',
                                        '핑크빈 백작 채팅 이모티콘',
                                        '말괄량이 카링 채팅 이모티콘',
                                        '신관도 직장인이다 채팅 이모티콘',
                                        '찬란한 흉성 채팅 이모티콘',
                                        'V / BEYOND / NOVA / ARK 명찰·말풍선 반지 교환권',
                                        '어드벤처 / SAVIOR 명찰·말풍선 반지 교환권',
                                        '가을빛 소년/소녀 세트 교환권',
                                        '선샤인 피크닉 세트 교환권',
                                        '유령 분장 의상 세트 교환권',
                                        '캔디 마법사의 의상 세트 교환권',
                                        '할로윈의 유령 / 프랑켄 유령 라이딩(영구)',
                                        '귤끼리 / 귤팽이 / 폭죽마 라이딩(영구)',
                                        '깜장고양이 캠핑카 / 할로윈 캔디 부자 / 달맞이꽃 얼굴 의자',
                                        '미나르 단풍 데미지 스킨 (유닛)',
                                        '구미호 데미지 스킨 (유닛)',
                                    ].map((name, i) => (
                                        <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-900/50 border border-slate-700/30 text-slate-200">
                                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                                            <span>{name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 메소샵 주요 주의사항 */}
                        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/50 text-xs text-slate-300 space-y-1.5 break-keep">
                            <p className="text-amber-300 font-semibold">🚨 메소샵 구매 핵심 조건</p>
                            <p>• <strong className="text-white">플라즈마 하트</strong>: 플라즈마 하트 혹은 플라즈마 하트의 흔적을 보유하고 있는 경우에만 구매 가능 (교환 불가, 영구)</p>
                            <p>• <strong className="text-white">어센던트 펄스 링</strong>: 어센던트 펄스 링 혹은 어센던트 펄스 링의 흔적을 보유하고 있는 경우에만 구매 가능 (교환 불가, 영구)</p>
                            <p>• 채팅 이모티콘 아이템은 2026.11.19 오전 2시까지 사용 가능하며, 사용한 캐릭터에게 영구 적용됩니다.</p>
                        </div>
                    </div>
                </section>

                {/* 핵심 플레이 루틴 꿀팁 요약 */}
                <div className="bg-gradient-to-r from-teal-950/70 via-slate-800 to-indigo-950/70 border border-teal-600/50 rounded-2xl p-5 sm:p-6 mb-8 shadow-2xl">
                    <p className="text-teal-300 font-bold text-base sm:text-lg mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-teal-400" />
                        메이플AI 추천: 아르고 호의 방문객 완벽 숙제 루틴
                    </p>
                    <div className="space-y-2.5 text-xs sm:text-sm text-slate-200 break-keep">
                        <div className="flex items-start gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/40">
                            <span className="px-2 py-0.5 rounded bg-teal-900/80 text-teal-300 font-mono text-xs font-bold">1단계</span>
                            <p><strong>첫날 필수:</strong> 이벤트 리스트에서 <span className="text-amber-300 font-bold">'[출석 이벤트] 프로텍트 아르고'</span>를 직접 클릭하여 보상받을 메이플ID를 지정하세요.</p>
                        </div>
                        <div className="flex items-start gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/40">
                            <span className="px-2 py-0.5 rounded bg-teal-900/80 text-teal-300 font-mono text-xs font-bold">2단계</span>
                            <p><strong>매일 숙제:</strong> 접속하여 <strong>정찰 3배 쿠폰 3개 + 주화 1,000개</strong>를 받고, 레범몬 10,000마리를 사냥하여 <strong>일일 수집 미션 (인핸서 120개 + VIP 부스터 2개)</strong>을 완료하세요.</p>
                        </div>
                        <div className="flex items-start gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/40">
                            <span className="px-2 py-0.5 rounded bg-teal-900/80 text-teal-300 font-mono text-xs font-bold">3단계</span>
                            <p><strong>주간 숙제:</strong> 주간 레범몬 30,000마리를 채워 <strong>주간 조사 미션 (인핸서 750개)</strong> 및 <strong>토벌 임무 (전투/전술 포인트 25개)</strong>를 모두 챙기세요.</p>
                        </div>
                        <div className="flex items-start gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/40">
                            <span className="px-2 py-0.5 rounded bg-teal-900/80 text-teal-300 font-mono text-xs font-bold">4단계</span>
                            <p><strong>강화 및 스펙업:</strong> 파밍한 펄스 인핸서로 <strong>어센던트 펄스 링 15~17성 파방 강화</strong> 및 잠재를 세팅하고, 주화 상점에서 이벤링 레전스크롤/카유잠을 우선 교환하세요.</p>
                        </div>
                    </div>
                </div>

                <InArticleAd dataAdSlot="6849727140" />

                {/* 관련 포스팅 배너 */}
                <div className="mb-6">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-3">📚 함께 읽으면 좋은 가을 업데이트 가이드</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Link prefetch={false} href="/blog/maple-now-september-10-2026-recap" className="bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 hover:border-teal-500/40 rounded-xl p-3.5 transition-all group">
                            <p className="text-teal-300 text-xs font-semibold mb-1 group-hover:text-teal-200">메이플NOW 총정리</p>
                            <p className="text-white text-xs sm:text-sm font-bold break-keep">9월 10일 메이플NOW 총정리 — 가을 대격변 완벽 요약</p>
                        </Link>
                        <Link prefetch={false} href="/blog/soul-weapon-revamp-september-2026" className="bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 hover:border-teal-500/40 rounded-xl p-3.5 transition-all group">
                            <p className="text-teal-300 text-xs font-semibold mb-1 group-hover:text-teal-200">소울웨폰 전면 개편</p>
                            <p className="text-white text-xs sm:text-sm font-bold break-keep">소울 증폭 · 잠재능력 · 소울 에테르 보스 드롭 한눈에 보기</p>
                        </Link>
                        <Link prefetch={false} href="/blog/testworld-update-1-2-206" className="bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 hover:border-teal-500/40 rounded-xl p-3.5 transition-all group">
                            <p className="text-teal-300 text-xs font-semibold mb-1 group-hover:text-teal-200">테스트월드 1.2.206</p>
                            <p className="text-white text-xs sm:text-sm font-bold break-keep">9월 17일 본섭 적용 예정 패치노트 총정리</p>
                        </Link>
                        <Link prefetch={false} href="/blog/boss-crystal-price-adjustment-september-2026" className="bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 hover:border-teal-500/40 rounded-xl p-3.5 transition-all group">
                            <p className="text-teal-300 text-xs font-semibold mb-1 group-hover:text-teal-200">보스 결정석 가격 조정</p>
                            <p className="text-white text-xs sm:text-sm font-bold break-keep">9월 17일 전 보스 기존가/변경가 비교표 & 막차 정산 꿀팁</p>
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
