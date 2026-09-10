'use client';

import Link from 'next/link';
import {
    Calendar,
    Star,
    Package,
    Gamepad2,
    Sparkles,
    Shield,
    Coins,
    AlertTriangle,
    ChevronRight,
    CheckCircle2,
    Gift,
    Zap,
    Flame,
    Settings,
    Trophy,
} from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function TestworldUpdate1206Page() {
    return (
        <main className="w-full min-h-screen bg-slate-900 text-slate-100 py-8 px-4">
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
            
            <div className="max-w-4xl mx-auto relative z-10 flex items-center gap-3 mb-8">
                <Link prefetch={false} href="/blog" className="flex items-center gap-2 px-4 py-2 bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700/50 hover:border-amber-500/50 rounded-xl text-sm font-bold text-amber-300 hover:text-amber-200 transition-all shadow-sm group">
                    <ChevronRight className="w-4 h-4 rotate-180 transform group-hover:-translate-x-1 transition-transform" />
                    <span>← 블로그 목록</span>
                </Link>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-900/60 text-violet-300 border border-violet-700/50 font-semibold">🧪 테스트월드</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-900/50 text-amber-300 border border-amber-700/50 font-semibold">업데이트 소식</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">ver 1.2.206</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 break-keep leading-tight">
                        🧪 [테스트월드 1.2.206]<br />
                        <span className="text-amber-300">9월 17일 적용 예정</span> 패치노트 총정리
                    </h1>
                    <p className="text-slate-400 text-sm break-keep mb-4">
                        퍼스널 버닝 · 어빌리티 개편 · 소울웨폰 개편 · 아케인심볼 30% 하향 · 탐험코인 · MVP 개편 · 티니핑 콜라보
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> 2026년 9월 10일</span>
                        <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-400" /> 적용 예정일: 2026년 9월 17일 점검 후</span>
                        <span>📖 약 8분 소요</span>
                    </div>
                </div>

                <div className="mb-8 p-4 rounded-xl bg-amber-900/20 border border-amber-700/50 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-200 break-keep">
                        <span className="font-bold">테스트월드 기준 정보입니다.</span> 이 내용은 테스트월드 클라이언트 1.2.206 기준이며, <span className="text-amber-300 font-bold">2026년 9월 17일(목) 점검 후 라이브 서버에 적용 예정</span>입니다. 라이브 적용 시 일부 내용이 변경될 수 있습니다.
                    </div>
                </div>

                <section className="mb-10">
                    <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-400" /> 한눈에 보는 주요 변경점
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl p-4 border border-orange-700/50 bg-orange-900/10 flex items-start gap-3">
                            <span className="text-2xl">🔥</span>
                            <div><p className="font-bold text-white text-sm">퍼스널 버닝</p><p className="text-slate-400 text-xs mt-0.5 break-keep">레벨대별 성장 미션 + 코인샵 신규</p></div>
                        </div>
                        <div className="rounded-xl p-4 border border-sky-700/50 bg-sky-900/10 flex items-start gap-3">
                            <span className="text-2xl">🍂</span>
                            <div><p className="font-bold text-white text-sm">아르고 호의 방문객</p><p className="text-slate-400 text-xs mt-0.5 break-keep">가을 이벤트 9/17~10/14 (아르고 주화샵, 보스 메소샵)</p></div>
                        </div>
                        <div className="rounded-xl p-4 border border-purple-700/50 bg-purple-900/10 flex items-start gap-3">
                            <span className="text-2xl">🏰</span>
                            <div><p className="font-bold text-white text-sm">에픽 던전 — 아우룸 레기스</p><p className="text-slate-400 text-xs mt-0.5 break-keep">265레벨+ 신규 에픽 던전 (E/N/H 3난이도)</p></div>
                        </div>
                        <div className="rounded-xl p-4 border border-violet-700/50 bg-violet-900/10 flex items-start gap-3">
                            <span className="text-2xl">💎</span>
                            <div><p className="font-bold text-white text-sm">어빌리티 개편</p><p className="text-slate-400 text-xs mt-0.5 break-keep">고급 재설정으로 2~3옵 레전드리 가능 + 심연의 서큘레이터</p></div>
                        </div>
                        <div className="rounded-xl p-4 border border-green-700/50 bg-green-900/10 flex items-start gap-3">
                            <span className="text-2xl">📜</span>
                            <div><p className="font-bold text-white text-sm">주문서 강화 개편</p><p className="text-slate-400 text-xs mt-0.5 break-keep">메소 주문서 신규 / 보스 드롭 주문서 삭제</p></div>
                        </div>
                        <div className="rounded-xl p-4 border border-indigo-700/50 bg-indigo-900/10 flex items-start gap-3">
                            <span className="text-2xl">👻</span>
                            <div><p className="font-bold text-white text-sm">소울웨폰 개편</p><p className="text-slate-400 text-xs mt-0.5 break-keep">소울 증폭 시스템 신규 / 소울스킬 삭제</p></div>
                        </div>
                        <div className="rounded-xl p-4 border border-cyan-700/50 bg-cyan-900/10 flex items-start gap-3">
                            <span className="text-2xl">🔮</span>
                            <div><p className="font-bold text-white text-sm">아케인심볼 30% 하향</p><p className="text-slate-400 text-xs mt-0.5 break-keep">전 아케인 지역 심볼 강화 비용 30% 감소</p></div>
                        </div>
                        <div className="rounded-xl p-4 border border-teal-700/50 bg-teal-900/10 flex items-start gap-3">
                            <span className="text-2xl">🗺️</span>
                            <div><p className="font-bold text-white text-sm">마일리지 → 탐험 코인 개편</p><p className="text-slate-400 text-xs mt-0.5 break-keep">탐험 코인 + 메이플크레딧 신규 도입</p></div>
                        </div>
                        <div className="rounded-xl p-4 border border-yellow-700/50 bg-yellow-900/10 flex items-start gap-3">
                            <span className="text-2xl">👑</span>
                            <div><p className="font-bold text-white text-sm">MVP 개편</p><p className="text-slate-400 text-xs mt-0.5 break-keep">MVP 블랙 등급 혜택 대폭 강화</p></div>
                        </div>
                        <div className="rounded-xl p-4 border border-pink-700/50 bg-pink-900/10 flex items-start gap-3">
                            <span className="text-2xl">🐱</span>
                            <div><p className="font-bold text-white text-sm">티니핑 콜라보 캐시</p><p className="text-slate-400 text-xs mt-0.5 break-keep">스페셜 루나 크리스탈 (자석펫 버섯 3종) 등</p></div>
                        </div>
                    </div>
                </section>
                
                <InArticleAd dataAdSlot="6849727140" />
                
                <section className="mb-10">
                    <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <Gamepad2 className="w-6 h-6 text-green-400" /> 신규 콘텐츠
                    </h2>
                    
                    <div className="mb-8 rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
                        <div className="flex items-center gap-3 px-5 py-4 bg-orange-900/20 border-b border-orange-800/30">
                            <Flame className="w-5 h-5 text-orange-400" />
                            <h3 className="font-black text-white text-base">🔥 퍼스널 버닝</h3>
                        </div>
                        <div className="p-5">
                            <p className="text-slate-300 text-sm mb-4 break-keep">캐릭터 개인별 성장 목표를 달성하면 보상을 받는 시스템. 처음 시작하는 캐릭터도 효율적으로 육성 가능합니다.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
                                    <h4 className="font-bold text-orange-300 text-sm mb-2">📋 퍼스널 성장 미션</h4>
                                    <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• 레벨대별 미션 클리어 시 경험치 버프 & 아이템</li>
                                        <li>• 메인 미션: 특정 레벨 달성 목표</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
                                    <h4 className="font-bold text-orange-300 text-sm mb-2">⚔️ 퍼스널 버닝 보스 미션</h4>
                                    <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• 보스 격파 횟수 달성 미션</li>
                                        <li>• 달성 시 추가 보상 지급</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
                                    <h4 className="font-bold text-orange-300 text-sm mb-2">🗡️ 퍼스널 버닝 몬스터</h4>
                                    <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• 일일 사냥 쿼타 달성 시 보상</li>
                                        <li>• 꾸준한 사냥 동선 안내</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
                                    <h4 className="font-bold text-orange-300 text-sm mb-2">🛒 퍼스널 버닝 코인샵</h4>
                                    <ul className="text-slate-300 text-xs space-y-1">
                                        <li>• 성장의 물약, 컴뱃 오더스</li>
                                        <li>• <span className="text-amber-300 font-semibold">쉐어드 코어 강화석</span></li>
                                        <li>• 레전드 소울 강화석</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8 rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
                        <div className="flex items-center gap-3 px-5 py-4 bg-sky-900/20 border-b border-sky-800/30">
                            <Star className="w-5 h-5 text-sky-400" />
                            <h3 className="font-black text-white text-base">🍂 가을 이벤트 [아르고 호의 방문객]</h3>
                        </div>
                        <div className="p-5">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-900/30 border border-sky-700/40 text-sky-300 text-xs font-bold mb-4">
                                <Calendar className="w-3.5 h-3.5" /> 2026년 9월 17일 점검 후 ~ 10월 14일 23:59
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
                                    <h4 className="font-bold text-sky-300 text-sm mb-2">📖 스토리 퀘스트</h4>
                                    <p className="text-slate-300 text-xs">'아르고 호의 방문객' 스토리 퀘스트 (사냥/보스 포함)</p>
                                </div>
                                <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
                                    <h4 className="font-bold text-sky-300 text-sm mb-2">🗓️ 스탬프 출석 이벤트</h4>
                                    <p className="text-slate-300 text-xs">이벤트 기간 중 매일 출석 도장 찍기</p>
                                </div>
                                <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
                                    <h4 className="font-bold text-sky-300 text-sm mb-2">⚡ 이벤트 스킬</h4>
                                    <p className="text-slate-300 text-xs">이벤트 전용 스킬 <span className="text-amber-300 font-semibold">'낡은 항해술'</span></p>
                                </div>
                                <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
                                    <h4 className="font-bold text-sky-300 text-sm mb-2">📈 성장 이벤트 + 아르고 주화 샵</h4>
                                    <p className="text-slate-300 text-xs">레벨 목표 달성 시 <span className="text-amber-300 font-semibold">아르고 주화</span> 지급 → 아케인심볼(황금), 앱솔랩스 무기 교환권, 마스터리 북, 인피니티 플라스크 등 구매 가능</p>
                                </div>
                            </div>
                            <div className="mt-3 p-3 rounded-xl bg-sky-900/15 border border-sky-800/30 text-xs text-slate-300">
                                <span className="text-sky-300 font-bold">🛍️ 보스 메소 샵:</span> 보스 격파 메소로 전용 아이템 구매 가능
                            </div>
                        </div>
                    </div>

                    <div className="mb-8 rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
                        <div className="flex items-center gap-3 px-5 py-4 bg-purple-900/20 border-b border-purple-800/30">
                            <Shield className="w-5 h-5 text-purple-400" />
                            <h3 className="font-black text-white text-base">🏰 에픽 던전 — 아우룸 레기스 (신규)</h3>
                        </div>
                        <div className="p-5">
                            <p className="text-slate-300 text-sm mb-4 break-keep">완전히 새로운 스토리 기반의 신규 에픽 던전. 난이도 선택제로 다양한 유저층이 도전 가능합니다.</p>
                            <div className="grid grid-cols-3 gap-3 mb-3">
                                <div className="bg-green-900/20 rounded-xl p-3 border border-green-700/40 text-center">
                                    <p className="font-black text-green-300 text-sm">Easy</p>
                                </div>
                                <div className="bg-blue-900/20 rounded-xl p-3 border border-blue-700/40 text-center">
                                    <p className="font-black text-blue-300 text-sm">Normal</p>
                                </div>
                                <div className="bg-red-900/20 rounded-xl p-3 border border-red-700/40 text-center">
                                    <p className="font-black text-red-300 text-sm">Hard</p>
                                </div>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-900/60 border border-purple-800/30 text-xs text-slate-300 space-y-1">
                                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /><span>레벨 제한: <span className="text-amber-300 font-bold">265레벨 이상</span></span></div>
                                <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /><span>에픽 던전 포인트 & 에픽 던전 전용 무기 획득 가능</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
                            <div className="px-4 py-3 bg-orange-900/20 border-b border-orange-800/30 flex items-center gap-2">
                                <Flame className="w-4 h-4 text-orange-400" />
                                <h3 className="font-black text-white text-sm">하이퍼 버닝 부스터</h3>
                            </div>
                            <div className="p-4 text-xs text-slate-300 space-y-1.5">
                                <p>• 하이퍼 버닝 캐릭터 전용</p>
                                <p>• <span className="text-amber-300 font-bold">260레벨</span>까지 경험치 <span className="text-amber-300 font-bold">1+4배</span> 부스터</p>
                                <p className="text-slate-500">📅 9/17 점검 후 ~ 10/21 23:59</p>
                            </div>
                        </div>
                        <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
                            <div className="px-4 py-3 bg-teal-900/20 border-b border-teal-800/30 flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-teal-400" />
                                <h3 className="font-black text-white text-sm">모멘텀 패스 PLUS</h3>
                            </div>
                            <div className="p-4 text-xs text-slate-300 space-y-1.5">
                                <p>• <span className="text-amber-300 font-bold">280레벨 이상</span> 캐릭터 대상</p>
                                <p>• 미션 달성 시 보상 지급</p>
                                <p className="text-slate-500">📅 9/17 점검 후 ~ 10/21 23:59</p>
                            </div>
                        </div>
                        <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
                            <div className="px-4 py-3 bg-pink-900/20 border-b border-pink-800/30 flex items-center gap-2">
                                <Gamepad2 className="w-4 h-4 text-pink-400" />
                                <h3 className="font-black text-white text-sm">🎮 한글 모아모아</h3>
                            </div>
                            <div className="p-4 text-xs text-slate-300 space-y-1.5">
                                <p>• 한글날 기념 미니게임 이벤트</p>
                                <p className="text-slate-500">📅 10월 1일 ~ 10월 14일</p>
                            </div>
                        </div>
                        <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
                            <div className="px-4 py-3 bg-red-900/20 border-b border-red-800/30 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-red-400" />
                                <h3 className="font-black text-white text-sm">⚡ 광신도의 자격 선착순 격파</h3>
                            </div>
                            <div className="p-4 text-xs text-slate-300 space-y-1.5">
                                <p>• <span className="text-amber-300 font-bold">벨로나 하드</span> 선착순 격파 이벤트</p>
                                <p>• 선착순 격파 시 특별 보상 지급</p>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                <section className="mb-10">
                    <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <Settings className="w-6 h-6 text-blue-400" /> 시스템 개편
                    </h2>
                    
                    <div className="mb-6 rounded-xl bg-slate-800/50 border border-violet-700/30 overflow-hidden">
                        <div className="flex items-center gap-3 px-5 py-4 bg-violet-900/20 border-b border-violet-800/30">
                            <Sparkles className="w-5 h-5 text-violet-400" />
                            <h3 className="font-black text-white text-base">💎 어빌리티 개편</h3>
                            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-red-900/60 text-red-300 border border-red-700/50 font-bold">주요 개편</span>
                        </div>
                        <div className="p-5 space-y-3">
                            <div className="rounded-xl bg-slate-900/60 p-4 border border-violet-800/30">
                                <h4 className="font-bold text-violet-300 text-sm mb-2">✨ 어빌리티 고급 재설정 신규 추가</h4>
                                <ul className="text-slate-300 text-xs space-y-1.5">
                                    <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400 mt-0.5 flex-shrink-0" /><span><span className="text-amber-300 font-bold">2~3옵 레전드리 어빌리티</span> 재설정 가능</span></li>
                                    <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-violet-400 mt-0.5 flex-shrink-0" /><span>팔찌 어빌리티 포함</span></li>
                                </ul>
                            </div>
                            <div className="rounded-xl bg-amber-900/15 p-4 border border-amber-700/40">
                                <h4 className="font-bold text-amber-300 text-sm mb-1">🌀 심연의 서큘레이터 신규 출시</h4>
                                <p className="text-slate-300 text-xs">어빌리티 고급 재설정 전용 신규 아이템. 캐시샵 신규 판매 예정.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 rounded-xl bg-slate-800/50 border border-green-700/30 overflow-hidden">
                        <div className="flex items-center gap-3 px-5 py-4 bg-green-900/20 border-b border-green-800/30">
                            <Package className="w-5 h-5 text-green-400" />
                            <h3 className="font-black text-white text-base">📜 주문서 강화 개편</h3>
                        </div>
                        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-green-900/15 rounded-xl p-4 border border-green-700/30">
                                <h4 className="font-bold text-green-300 text-sm mb-2">✅ 신규 추가</h4>
                                <ul className="text-slate-300 text-xs space-y-1">
                                    <li>• <span className="text-amber-300 font-bold">메소 주문서</span> 신규 (공격력/마력 +2~+3)</li>
                                    <li>• 방어구 스타일 강화 주문서 추가</li>
                                </ul>
                            </div>
                            <div className="bg-red-900/15 rounded-xl p-4 border border-red-700/30">
                                <h4 className="font-bold text-red-300 text-sm mb-2">❌ 삭제</h4>
                                <ul className="text-slate-300 text-xs space-y-1">
                                    <li>• 보스 드롭 공마력 주문서 삭제 (루시드 등)</li>
                                    <li>• 보유 중인 주문서 판매 시 메소 보상</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 rounded-xl bg-slate-800/50 border border-indigo-700/30 overflow-hidden">
                        <div className="flex items-center gap-3 px-5 py-4 bg-indigo-900/20 border-b border-indigo-800/30">
                            <Sparkles className="w-5 h-5 text-indigo-400" />
                            <h3 className="font-black text-white text-base">👻 소울웨폰 개편</h3>
                            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-red-900/60 text-red-300 border border-red-700/50 font-bold">주요 개편</span>
                        </div>
                        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-indigo-900/15 rounded-xl p-4 border border-indigo-700/30">
                                <h4 className="font-bold text-indigo-300 text-sm mb-2">✨ 소울 증폭 시스템 신규</h4>
                                <ul className="text-slate-300 text-xs space-y-1">
                                    <li>• 소울 마력으로 소울 증폭</li>
                                    <li>• 증폭 단계별 추가 스탯 부여</li>
                                    <li>• 소울 잠재능력 재설정 추가</li>
                                </ul>
                            </div>
                            <div className="bg-red-900/15 rounded-xl p-4 border border-red-700/30">
                                <h4 className="font-bold text-red-300 text-sm mb-2">❌ 소울스킬 삭제</h4>
                                <ul className="text-slate-300 text-xs space-y-1">
                                    <li>• 소울스킬 시스템 전면 삭제</li>
                                    <li>• 소울 증폭으로 대체</li>
                                    <li>• 기존 보유 캐릭터 메소 보상</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="rounded-xl bg-slate-800/50 border border-cyan-700/30 overflow-hidden">
                            <div className="px-4 py-3 bg-cyan-900/20 border-b border-cyan-800/30">
                                <h3 className="font-bold text-white text-sm">🔮 아케인심볼 강화 비용 30% 하향</h3>
                            </div>
                            <div className="p-4 text-xs text-slate-300 space-y-1.5">
                                <p>• 전 아케인 지역 심볼 강화 비용 <span className="text-amber-300 font-bold">30% 감소</span></p>
                                <p>• 아케인포스 & 메소 모두 해당</p>
                            </div>
                        </div>
                        <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
                            <div className="px-4 py-3 bg-red-900/20 border-b border-red-800/30">
                                <h3 className="font-bold text-white text-sm">⚔️ 보스 리워드 개편</h3>
                            </div>
                            <div className="p-4 text-xs text-slate-300 space-y-1.5">
                                <p>• 결정 판매가 조정</p>
                                <p>• 보스 드롭 무기 <span className="text-amber-300 font-bold">주간 12개 제한 삭제</span></p>
                            </div>
                        </div>
                        <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
                            <div className="px-4 py-3 bg-green-900/20 border-b border-green-800/30">
                                <h3 className="font-bold text-white text-sm">📈 성장 동선 개편</h3>
                            </div>
                            <div className="p-4 text-xs text-slate-300 space-y-1.5">
                                <p>• 에픽 던전 경험치 <span className="text-amber-300 font-bold">12~18% 증가</span></p>
                                <p>• 일부 지역 몬스터 경험치 조정</p>
                            </div>
                        </div>
                        <div className="rounded-xl bg-slate-800/50 border border-yellow-700/30 overflow-hidden">
                            <div className="px-4 py-3 bg-yellow-900/20 border-b border-yellow-800/30">
                                <h3 className="font-bold text-white text-sm">👑 MVP 개편</h3>
                            </div>
                            <div className="p-4 text-xs text-slate-300 space-y-1.5">
                                <p>• <span className="text-amber-300 font-bold">블랙 등급</span> 혜택 대폭 강화</p>
                                <p>• 추가 드롭률 + 아케인심볼 추가 + 전용 버프</p>
                                <p>• MVP 마일리지 적립 방식 변경</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-slate-800/50 border border-teal-700/30 overflow-hidden">
                        <div className="flex items-center gap-3 px-5 py-4 bg-teal-900/20 border-b border-teal-800/30">
                            <Coins className="w-5 h-5 text-teal-400" />
                            <h3 className="font-black text-white text-base">🗺️ 마일리지 → 탐험 코인 개편</h3>
                        </div>
                        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-teal-900/15 rounded-xl p-4 border border-teal-700/30">
                                <h4 className="font-bold text-teal-300 text-sm mb-2">🗺️ 탐험 코인 시스템 신규</h4>
                                <ul className="text-slate-300 text-xs space-y-1">
                                    <li>• 기존 마일리지 시스템 종료</li>
                                    <li>• 인게임 활동으로 <span className="text-amber-300 font-bold">탐험 코인</span> 획득</li>
                                    <li>• 탐험 코인 상점 신규 오픈</li>
                                </ul>
                            </div>
                            <div className="bg-amber-900/15 rounded-xl p-4 border border-amber-700/30">
                                <h4 className="font-bold text-amber-300 text-sm mb-2">💳 메이플크레딧 신규 도입</h4>
                                <ul className="text-slate-300 text-xs space-y-1">
                                    <li>• <span className="text-amber-300 font-bold">크레딧샵</span>에서 특별 아이템 구매</li>
                                    <li>• 프라임 큐브 등 크레딧샵 판매</li>
                                    <li>• 매달 특정 액션으로 크레딧 적립</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <Gift className="w-6 h-6 text-pink-400" /> 캐시 아이템
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-xl bg-pink-900/15 border border-pink-700/30 p-4 sm:col-span-2">
                            <h3 className="font-bold text-pink-300 text-sm mb-3">🐱 MapleStory × 캐치! 티니핑 콜라보</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <div className="flex items-start gap-2 text-xs text-slate-300"><span className="text-pink-400">•</span><span><span className="text-amber-300 font-bold">스페셜 루나 크리스탈</span> (루나 쁘띠 자석펫: 버섯 3종)</span></div>
                                <div className="flex items-start gap-2 text-xs text-slate-300"><span className="text-pink-400">•</span><span>티니핑 테마 코스튬</span></div>
                                <div className="flex items-start gap-2 text-xs text-slate-300"><span className="text-pink-400">•</span><span>티니핑 헤어 / 성형</span></div>
                            </div>
                        </div>
                        <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4">
                            <h3 className="font-bold text-white text-sm mb-2">👗 메이플 로얄 스타일 161기</h3>
                            <p className="text-slate-400 text-xs">신규 로얄 스타일 161기 출시</p>
                        </div>
                        <div className="rounded-xl bg-slate-800/50 border border-amber-700/30 p-4">
                            <h3 className="font-bold text-amber-300 text-sm mb-2">🎲 크레딧샵 신규 판매</h3>
                            <ul className="text-slate-300 text-xs space-y-1">
                                <li>• <span className="text-amber-300 font-bold">프라임 큐브</span></li>
                                <li>• <span className="text-amber-300 font-bold">프라임 에디셔널 큐브</span></li>
                            </ul>
                        </div>
                        <div className="rounded-xl bg-slate-800/50 border border-violet-700/30 p-4">
                            <h3 className="font-bold text-violet-300 text-sm mb-2">🌀 심연의 서큘레이터</h3>
                            <p className="text-slate-400 text-xs">어빌리티 고급 재설정 전용 신규 아이템 판매</p>
                        </div>
                        <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4">
                            <h3 className="font-bold text-white text-sm mb-2">🐾 기타 신규 캐시</h3>
                            <ul className="text-slate-300 text-xs space-y-1">
                                <li>• 몬스터파크 핸즈 이용권</li>
                                <li>• 펫장비 교환권</li>
                                <li>• 프리미엄 펫의 먹이</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <AlertTriangle className="w-6 h-6 text-red-400" /> 오류수정 & 보상
                    </h2>
                    <div className="rounded-xl bg-red-900/15 border border-red-700/40 p-5">
                        <h3 className="font-black text-red-300 text-base mb-3">💸 큐브 오류 메소 소멸 보상 지급</h3>
                        <p className="text-slate-300 text-sm mb-3 break-keep">2025년 4월 17일 ~ 2026년 9월 9일 기간 중 큐브 사용 시 메소가 소멸되는 오류가 발생했습니다. 9월 17일 점검 시 일괄 보상 지급 예정입니다.</p>
                        <div className="p-3 rounded-xl bg-slate-900/60 border border-red-800/30 space-y-1.5 text-xs">
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-red-400" /><span>대상 캐릭터: <span className="text-amber-300 font-bold">6,273개</span></span></div>
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-red-400" /><span>지급 금액: <span className="text-amber-300 font-bold">3,894,001,000 메소</span> 일괄 지급</span></div>
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-red-400" /><span>지급 시기: <span className="text-amber-300 font-bold">2026년 9월 17일 점검 시</span></span></div>
                        </div>
                    </div>
                </section>

                <section className="mt-10 pt-6 border-t border-slate-700">
                    <h2 className="text-base font-black text-white mb-4">📎 관련 글</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Link prefetch={false} href="/blog/september-2026-update-schedule" className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-amber-500/50 transition-all group">
                            <span className="text-2xl">📅</span>
                            <div>
                                <p className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors break-keep">9월 종료 일정 완벽 정리</p>
                                <p className="text-slate-500 text-xs mt-0.5">챌린저스·하이퍼버닝·제네시스 패스</p>
                            </div>
                        </Link>
                        <Link prefetch={false} href="/blog/momentum-pass-plus-guide" className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-amber-500/50 transition-all group">
                            <span className="text-2xl">🚀</span>
                            <div>
                                <p className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors break-keep">모멘텀 패스 PLUS 가이드</p>
                                <p className="text-slate-500 text-xs mt-0.5">280레벨 이상 필수 체크</p>
                            </div>
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
