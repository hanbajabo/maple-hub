'use client';

import Link from 'next/link';
import {
    Calendar,
    ChevronRight,
    AlertTriangle,
    Zap,
    Sparkles,
    Shield,
    Coins,
    BookOpen,
    CheckCircle2,
    X,
    Star,
    Gift,
    Flame,
    Calculator,
    TrendingUp,
    ImageIcon,
} from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function SoulWeaponRevampPage() {
    return (
        <main className="w-full min-h-screen bg-slate-900 text-white py-6 sm:py-8 px-3 sm:px-4">
            <div className="fixed top-0 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-900/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-0 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-violet-900/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none z-0" />

            {/* 뒤로가기 */}
            <div className="max-w-4xl mx-auto relative z-10 flex items-center gap-3 mb-6 sm:mb-8">
                <Link prefetch={false} href="/blog" className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 rounded-xl text-xs sm:text-sm font-bold text-indigo-300 hover:text-indigo-200 transition-all shadow-sm group">
                    <ChevronRight className="w-4 h-4 rotate-180 transform group-hover:-translate-x-1 transition-transform" />
                    <span>← 블로그 목록</span>
                </Link>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* 타이틀 헤더 */}
                <div className="mb-6">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 font-semibold">👻 소울웨폰</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-900/50 text-amber-300 border border-amber-700/50 font-semibold">업데이트 소식</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700/50">9월 17일 적용</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2.5 sm:mb-3 break-keep leading-tight sm:leading-tight">
                        👻 소울웨폰 전면 개편 완벽 정리<br />
                        <span className="text-indigo-300">소울 증폭 · 잠재능력 · 소울 에테르</span> 한눈에 보기
                    </h1>
                    <p className="text-slate-200 text-xs sm:text-sm break-keep mb-3.5 sm:mb-4 font-medium leading-relaxed">
                        소울 스킬 삭제 · 소울 증폭 시스템 신규 · 소울 잠재능력 재설정 · 소울 에테르 보스 드롭 · 소울 외형 변경 · 소울 컬렉션 업데이트 + 비용 분석
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs sm:text-sm text-slate-200 font-medium mb-5 sm:mb-6">
                        <span className="flex items-center gap-1 sm:gap-1.5"><Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" /> 2026년 9월 11일</span>
                        <span className="flex items-center gap-1 sm:gap-1.5"><Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" /> 적용 예정일: 2026년 9월 17일(목)</span>
                        <span>📖 약 10분 소요</span>
                    </div>

                    {/* 타이틀 바로 밑 대표 이미지 */}
                    <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-950">
                        <img src="/images/blog/soul-weapon/soul-ether-banner.png" alt="소울 증폭 및 1~4단계 소울 에테르 대표 이미지" className="w-full h-auto block object-cover" />
                    </div>
                </div>

                {/* 주의 배너 */}
                <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 rounded-xl bg-amber-900/25 border border-amber-700/60 flex items-start gap-2.5 sm:gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-base text-amber-100 font-medium break-keep leading-relaxed">
                        <span className="font-bold text-amber-300">2026년 9월 17일(목) 점검 후 본섭 적용 예정입니다.</span> 일부 세부 수치 및 정책은 라이브 적용 시 변경될 수 있습니다.
                    </div>
                </div>

                {/* 요약 카드 */}
                <section className="mb-8 sm:mb-10">
                    <h2 className="text-lg sm:text-xl font-black text-white mb-3 sm:mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-400" /> 한눈에 보는 주요 변경점
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                        <div className="rounded-xl p-3.5 sm:p-4 border border-indigo-700/50 bg-indigo-900/20 flex items-start gap-2.5 sm:gap-3">
                            <span className="text-2xl sm:text-3xl flex-shrink-0">✨</span>
                            <div><p className="font-bold text-white text-sm sm:text-base">소울 증폭 시스템 신규 추가</p><p className="text-slate-200 text-xs sm:text-sm mt-0.5 break-keep">소울 에테르 + 메소로 위대한 소울에 잠재능력 부여 (1~4단계)</p></div>
                        </div>
                        <div className="rounded-xl p-3.5 sm:p-4 border border-violet-700/50 bg-violet-900/20 flex items-start gap-2.5 sm:gap-3">
                            <span className="text-2xl sm:text-3xl flex-shrink-0">🎲</span>
                            <div><p className="font-bold text-white text-sm sm:text-base">소울 잠재능력 재설정 추가</p><p className="text-slate-200 text-xs sm:text-sm mt-0.5 break-keep">메소만으로 재설정 가능 · 썬데이 메이플 미라클 타임 적용</p></div>
                        </div>
                        <div className="rounded-xl p-3.5 sm:p-4 border border-emerald-700/50 bg-emerald-900/20 flex items-start gap-2.5 sm:gap-3">
                            <span className="text-2xl sm:text-3xl flex-shrink-0">💎</span>
                            <div><p className="font-bold text-white text-sm sm:text-base">소울 에테르 신규 보스 드롭</p><p className="text-slate-200 text-xs sm:text-sm mt-0.5 break-keep">그란디스 보스 클리어 시 낮은 확률로 1~4단계 소울 에테르 획득</p></div>
                        </div>
                        <div className="rounded-xl p-3.5 sm:p-4 border border-red-700/50 bg-red-900/20 flex items-start gap-2.5 sm:gap-3">
                            <span className="text-2xl sm:text-3xl flex-shrink-0">🗑️</span>
                            <div><p className="font-bold text-white text-sm sm:text-base">소울 스킬 & 소울 게이지 삭제</p><p className="text-slate-200 text-xs sm:text-sm mt-0.5 break-keep">공/마 증가 효과는 상시 적용으로 변경 · 이펙트도 상시 표시</p></div>
                        </div>
                        <div className="rounded-xl p-3.5 sm:p-4 border border-pink-700/50 bg-pink-900/20 flex items-start gap-2.5 sm:gap-3">
                            <span className="text-2xl sm:text-3xl flex-shrink-0">🎨</span>
                            <div><p className="font-bold text-white text-sm sm:text-base">소울 외형 변경 시스템 추가</p><p className="text-slate-200 text-xs sm:text-sm mt-0.5 break-keep">소울 이펙트만 따로 변경 가능 · 소울 컬렉션 등록 소울로 적용</p></div>
                        </div>
                        <div className="rounded-xl p-3.5 sm:p-4 border border-sky-700/50 bg-sky-900/20 flex items-start gap-2.5 sm:gap-3">
                            <span className="text-2xl sm:text-3xl flex-shrink-0">📚</span>
                            <div><p className="font-bold text-white text-sm sm:text-base">소울 컬렉션 업데이트</p><p className="text-slate-200 text-xs sm:text-sm mt-0.5 break-keep">카이 · 드래곤 로어 · 메이린 소울 추가 · NPC 컬렉션 즉시 등록 이벤트</p></div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* 목차 */}
                <div className="mb-8 sm:mb-10 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-800/60 border border-slate-700/60">
                    <p className="text-sm sm:text-base font-bold text-white mb-2.5 sm:mb-3.5 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" /> 📑 목차
                    </p>
                    <ol className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                        {[
                            { num: '01', href: '#amplify', label: '소울 증폭 시스템', color: 'text-indigo-400' },
                            { num: '02', href: '#potential', label: '소울 잠재능력 재설정', color: 'text-violet-400' },
                            { num: '03', href: '#ether', label: '소울 에테르 (신규 보스 드롭)', color: 'text-emerald-400' },
                            { num: '04', href: '#removed', label: '소울 스킬 & 소울 게이지 삭제', color: 'text-red-400' },
                            { num: '05', href: '#appearance', label: '소울 외형 변경 시스템', color: 'text-pink-400' },
                            { num: '06', href: '#collection', label: '소울 컬렉션 업데이트', color: 'text-sky-400' },
                            { num: '07', href: '#caution', label: '주의사항 & 예외 규정', color: 'text-amber-400' },
                            { num: '08', href: '#cost', label: '💰 비용 분석 — 증폭 & 잠재 천장 계산', color: 'text-rose-400' },
                        ].map(item => (
                            <li key={item.href} className="flex items-center gap-2 sm:gap-2.5 bg-slate-900/50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-700/40">
                                <span className={`${item.color} font-mono font-bold text-xs sm:text-sm flex-shrink-0`}>{item.num}</span>
                                <a href={item.href} className="text-white hover:text-indigo-300 font-semibold transition-colors truncate">{item.label}</a>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* 1. 소울 증폭 시스템 */}
                <section id="amplify" className="mb-10 sm:mb-12">
                    <h2 className="text-lg sm:text-2xl font-black text-white mb-4 sm:mb-5 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-indigo-400" />
                        <span>1. 소울 증폭 시스템</span>
                    </h2>
                    <div className="p-3.5 sm:p-5 rounded-xl bg-indigo-900/25 border border-indigo-700/50 mb-4 sm:mb-5 text-xs sm:text-base text-white font-medium break-keep leading-relaxed space-y-3">
                        <p>
                            소울 증폭은 <strong className="text-amber-300 font-bold">소울 에테르와 메소를 소모</strong>하여, <strong className="text-indigo-300 font-bold">요구 레벨 200레벨 이상 무기</strong>에 부여된 위대한 소울에 증폭 단계를 부여하거나 성장시키는 시스템입니다. 증폭 단계가 부여된 무기에는 <strong className="text-white font-bold">소울 잠재능력이 함께 부여</strong>됩니다.
                        </p>
                        <div className="p-3 sm:p-3.5 rounded-lg bg-indigo-950/70 border border-indigo-600/50 text-xs sm:text-sm text-indigo-100">
                            <span className="text-amber-300 font-bold">💡 추가 설명 :</span> 증폭은 약간 아이템의 렙제같은 느낌으로 소울 증폭 단계가 높을수록 같은 옵션이라도 높은 옵션이 나옵니다. 예를 들어 1단계에서 <span className="text-sky-300 font-semibold">레어 STR+0.5%</span>가 2단계로 증폭하면 <span className="text-sky-300 font-bold">레어 STR+1%</span>가 됩니다.
                        </div>
                    </div>

                    {/* 소울 증폭 UI 이미지 카드 */}
                    <div className="my-4 sm:my-6 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-950 text-center">
                        <img src="/images/blog/soul-weapon/soul-amplify-ui.png" alt="소울 증폭 인게임 UI 스크린샷" className="w-full h-auto block object-cover" />
                        <div className="p-2.5 sm:p-3.5 bg-slate-800/90 border-t border-slate-700/60">
                            <p className="text-xs sm:text-sm text-slate-200 font-semibold flex items-center justify-center gap-1.5 sm:gap-2 break-keep">
                                <ImageIcon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                                <span>소울 증폭 인게임 UI (2단계 증폭 시도 예시)</span>
                            </p>
                        </div>
                    </div>

                    <div className="mb-4 sm:mb-5 p-3.5 sm:p-4 rounded-xl bg-slate-800/70 border border-slate-700/50 text-xs sm:text-base text-white space-y-1.5 sm:space-y-2 font-medium">
                        <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 flex-shrink-0" />통합 강화 UI &gt; 소울웨폰 탭 &gt; <strong className="text-amber-300 font-bold">소울 증폭 버튼</strong> 클릭</p>
                        <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 flex-shrink-0" />또는 소비창에서 <strong className="text-amber-300 font-bold">소울 에테르를 더블 클릭</strong>하여 진행</p>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 sm:mb-3.5">✦ 증폭 단계별 성공 확률 & 소모 재료</h3>

                    {/* 1~4단계 소울 에테르 구슬 이미지 */}
                    

                    {/* 모바일 가로 스크롤 가이드 표시 표 */}
                    <div className="overflow-x-auto mb-6 rounded-xl border border-slate-700/60">
                        <table className="w-full text-xs sm:text-base min-w-[440px]">
                            <thead>
                                <tr className="bg-indigo-900/70 text-indigo-100">
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-left font-bold">목표 단계</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold">성공 확률</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-right font-bold">소모 메소</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold">사용 재료</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {[
                                    { step: '1단계', rate: '5%', meso: '5억', color: 'text-sky-300', bg: 'bg-sky-900/20' },
                                    { step: '2단계', rate: '3%', meso: '10억', color: 'text-blue-300', bg: 'bg-blue-900/20' },
                                    { step: '3단계', rate: '2%', meso: '17.5억', color: 'text-indigo-300', bg: 'bg-indigo-900/20' },
                                    { step: '4단계', rate: '1.5%', meso: '27.5억', color: 'text-violet-300', bg: 'bg-violet-900/20' },
                                ].map((row) => (
                                    <tr key={row.step} className={`${row.bg} hover:bg-slate-800/40 transition-colors`}>
                                        <td className={`py-2.5 sm:py-3.5 px-3 sm:px-4 font-bold ${row.color}`}>{row.step}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-mono font-bold text-white">{row.rate}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-right font-mono text-white font-semibold">{row.meso} 메소</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center text-white font-medium">{row.step} 소울 에테르</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 sm:mb-3.5">⚡ 증폭 게이지 & 보장 (실패 시 누적)</h3>
                    <div className="p-3.5 sm:p-5 rounded-xl bg-amber-900/20 border border-amber-700/50 text-xs sm:text-base text-amber-100 mb-4 font-medium break-keep leading-relaxed">
                        소울 증폭 실패 시마다 <strong className="text-white font-bold">증폭 게이지가 누적</strong>되며, 게이지 100% 도달 후 다음 시도 시 <strong className="text-amber-300 font-bold">100% 확률로 증폭 성공</strong>이 보장됩니다.
                        <br /><span className="text-amber-400 text-xs sm:text-sm mt-1 sm:mt-1.5 block font-semibold">※ 증폭 성공 시 이전 단계의 증폭 게이지는 초기화됩니다.</span>
                    </div>

                    {/* 교체된 실패시 확률 증가 예시 이미지 */}
                    <div className="my-4 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-950 text-center">
                        <img src="/images/blog/soul-weapon/soul-gauge-example.png" alt="소울 증폭 실패시 확률 증가(천장) 누적 예시" className="w-full h-auto block object-cover" />
                        <div className="p-2.5 sm:p-3.5 bg-slate-800/90 border-t border-slate-700/60">
                            <p className="text-xs sm:text-sm text-slate-200 font-semibold">소울 증폭 실패 시 확률 증가(천장) 누적 예시</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto mb-6 rounded-xl border border-slate-700/60">
                        <table className="w-full text-xs sm:text-base min-w-[480px]">
                            <thead>
                                <tr className="bg-amber-900/50 text-amber-200">
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-left font-bold">증폭 단계</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold">실패 시 확률 증가</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold">실패 시 게이지 증가</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold">보장 횟수 (최대)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {[
                                    { step: '1단계', prob: '+1%', gauge: '+4.00%', max: '25회' },
                                    { step: '2단계', prob: '+0.6%', gauge: '+3.03%', max: '33회' },
                                    { step: '3단계', prob: '+0.4%', gauge: '+2.33%', max: '43회' },
                                    { step: '4단계', prob: '+0.3%', gauge: '+2.00%', max: '50회' },
                                ].map((row) => (
                                    <tr key={row.step} className="bg-slate-900/50 hover:bg-slate-800/40 transition-colors">
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 font-bold text-amber-300">{row.step}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center text-emerald-400 font-mono font-bold">{row.prob}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center text-emerald-400 font-mono font-bold">{row.gauge}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center text-white font-mono font-bold">{row.max}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-3.5 sm:p-5 rounded-xl bg-slate-800/70 border border-indigo-700/40 text-xs sm:text-base text-white font-medium space-y-2 sm:space-y-2.5 break-keep">
                        <p><span className="text-indigo-300 font-bold">• 1단계 증폭 성공 시</span> — 소울 잠재능력과 소울 증폭 단계가 함께 부여됩니다.</p>
                        <p><span className="text-indigo-300 font-bold">• 증폭 단계 성장 시</span> — 소울 잠재능력의 <strong className="text-amber-300">등급과 옵션은 유지</strong>되고, 수치만 상향 전승됩니다.</p>
                        <p><span className="text-indigo-300 font-bold">• 추가 증폭</span> — 이미 증폭된 소울에 추가로 증폭하여 단계를 더 높일 수 있습니다.</p>
                        <p><span className="text-amber-400 font-bold">※</span> 증폭 단계가 부여된 무기에는 <strong className="text-amber-300">위대한 소울로만 소울웨폰을 재부여</strong>할 수 있습니다.</p>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* 2. 소울 잠재능력 재설정 */}
                <section id="potential" className="mb-10 sm:mb-12">
                    <h2 className="text-lg sm:text-2xl font-black text-white mb-4 sm:mb-5 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <Star className="w-5 h-5 sm:w-7 sm:h-7 text-violet-400" />
                        <span>2. 소울 잠재능력 재설정 시스템</span>
                    </h2>
                    <div className="p-3.5 sm:p-5 rounded-xl bg-violet-900/25 border border-violet-700/50 mb-4 sm:mb-5 text-xs sm:text-base text-white font-medium break-keep leading-relaxed space-y-3">
                        <p>
                            소울 잠재능력은 <strong className="text-amber-300 font-bold">메소만으로</strong> 재설정할 수 있습니다. 통합 강화 &gt; 소울웨폰 탭의 <strong className="text-violet-300 font-bold">소울 잠재능력 버튼</strong>으로 이용 가능합니다. 소울 잠재능력은 <strong className="text-indigo-300 font-bold">스페셜 썬데이 메이플 미라클 타임</strong>의 혜택을 받습니다.
                        </p>
                        <div className="p-3 sm:p-3.5 rounded-lg bg-violet-950/70 border border-violet-600/50 text-xs sm:text-sm text-violet-100 space-y-1.5">
                            <p><span className="text-amber-300 font-bold">💡 추가 설명 :</span> 1단계로 증폭을 성공한 소울에는 잠재능력이 생기고 그 잠재능력을 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700 font-bold text-xs sm:text-sm"><span className="text-sky-300">레어</span><span className="text-slate-400">&rarr;</span><span className="text-emerald-300">레전드리</span></span>까지 등급업 시킬 수 있으며 다양한 옵션들을 큐브를 돌려 옵션을 뽑듯이 뽑을 수 있습니다.</p>
                            <p className="text-violet-200">1단계에서 레전드리에 옵션까지 뽑고, 증폭을 하면 레전드리 옵션이 4단계에 맞춰 수치가 증가합니다.</p>
                        </div>
                    </div>
                    <div className="my-4 sm:my-5 rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-950 text-center">
                        <img src="/images/blog/soul-weapon/soul-potential-ui.png" alt="소울 잠재능력 재설정 시스템 UI 및 BEFORE AFTER 비교" className="w-full h-auto block object-cover" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 sm:mb-3.5">💰 등급별 재설정 비용 (증폭 단계와 무관)</h3>
                    <div className="overflow-x-auto mb-6 rounded-xl border border-slate-700/60">
                        <table className="w-full text-xs sm:text-base min-w-[320px]">
                            <thead>
                                <tr className="bg-violet-900/60 text-violet-100">
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-left font-bold">등급</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-right font-bold">재설정 비용</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {[
                                    { grade: '레어', cost: '2,000만 메소', color: 'text-sky-300' },
                                    { grade: '에픽', cost: '4,000만 메소', color: 'text-purple-300' },
                                    { grade: '유니크', cost: '6,500만 메소', color: 'text-amber-300' },
                                    { grade: '레전드리', cost: '8,800만 메소', color: 'text-emerald-300' },
                                ].map((row) => (
                                    <tr key={row.grade} className="bg-slate-900/50 hover:bg-slate-800/40 transition-colors">
                                        <td className={`py-2.5 sm:py-3.5 px-3 sm:px-4 font-bold ${row.color}`}>{row.grade}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-right font-mono font-bold text-white">{row.cost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 sm:mb-3.5">✦ 등급 상승 확률 & 보장 횟수</h3>
                    <div className="overflow-x-auto mb-6 rounded-xl border border-slate-700/60">
                        <table className="w-full text-xs sm:text-base min-w-[380px]">
                            <thead>
                                <tr className="bg-violet-900/60 text-violet-100">
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-left font-bold">구간</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold">등급 상승 확률</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold">등급 상승 보장 횟수</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {[
                                    { from: '레어 → 에픽', rate: '1.5%', max: '100회' },
                                    { from: '에픽 → 유니크', rate: '0.5875%', max: '256회' },
                                    { from: '유니크 → 레전드리', rate: '0.3322%', max: '451회' },
                                ].map((row) => (
                                    <tr key={row.from} className="bg-slate-900/50 hover:bg-slate-800/40 transition-colors">
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 font-bold text-violet-300">{row.from}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-mono font-bold text-white">{row.rate}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-mono font-bold text-white">{row.max}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 sm:mb-3.5">⭐ 소울 잠재능력 옵션별 등급 설정 확률</h3>
                    <div className="overflow-x-auto mb-4 rounded-xl border border-slate-700/60">
                        <table className="w-full text-xs sm:text-base min-w-[460px]">
                            <thead>
                                <tr className="bg-slate-800/90 text-white">
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-left font-bold">옵션 구분</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold text-sky-300">레어</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold text-purple-300">에픽</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold text-amber-300">유니크</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold text-emerald-300">레전드리</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 font-medium">
                                <tr className="bg-slate-900/60">
                                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 font-bold text-white">첫 번째 옵션</td>
                                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center text-sky-300 font-semibold">레어 100%</td>
                                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center text-purple-300 font-semibold">에픽 100%</td>
                                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center text-amber-300 font-semibold">유니크 100%</td>
                                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center text-emerald-300 font-semibold">레전드리 100%</td>
                                </tr>
                                <tr className="bg-slate-900/40">
                                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 font-bold text-white">두 번째 옵션</td>
                                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center"><span className="text-sky-300 font-semibold">레어 1.96%</span><br /><span className="text-slate-200">노멀 98.04%</span></td>
                                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center"><span className="text-purple-300 font-semibold">에픽 4.76%</span><br /><span className="text-slate-200">레어 95.24%</span></td>
                                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center"><span className="text-amber-300 font-semibold">유니크 1.96%</span><br /><span className="text-slate-200">에픽 98.04%</span></td>
                                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center"><span className="text-emerald-300 font-semibold">레전드리 0.50%</span><br /><span className="text-slate-200">유니크 99.50%</span></td>
                                </tr>
                                <tr className="bg-slate-900/60">
                                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 font-bold text-white">세 번째 옵션</td>
                                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center"><span className="text-sky-300 font-semibold">레어 1.96%</span><br /><span className="text-slate-200">노멀 98.04%</span></td>
                                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center"><span className="text-purple-300 font-semibold">에픽 4.76%</span><br /><span className="text-slate-200">레어 95.24%</span></td>
                                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center"><span className="text-amber-300 font-semibold">유니크 1.96%</span><br /><span className="text-slate-200">에픽 98.04%</span></td>
                                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center"><span className="text-emerald-300 font-semibold">레전드리 0.50%</span><br /><span className="text-slate-200">유니크 99.50%</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 mb-4 font-medium break-keep">※ 레전드리 등급 이상부터 자동 강화 기능 사용 가능&nbsp;|&nbsp;※ 증폭된 위대한 소울만 소울 잠재능력 재설정 가능</p>
                </section>

                {/* 3. 소울 에테르 */}
                <section id="ether" className="mb-10 sm:mb-12">
                    <h2 className="text-lg sm:text-2xl font-black text-white mb-4 sm:mb-5 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <Gift className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-400" />
                        <span>3. 소울 에테르 — 신규 보스 드롭</span>
                    </h2>
                    <div className="p-3.5 sm:p-5 rounded-xl bg-emerald-900/25 border border-emerald-700/50 mb-4 sm:mb-5 text-xs sm:text-base text-emerald-100 font-medium break-keep leading-relaxed">
                        소울 에테르는 총 <strong className="text-white font-bold">4단계</strong>로 구성된 신규 아이템으로, 아래 그란디스 보스에서 <strong className="text-amber-300 font-bold">낮은 확률</strong>로 획득할 수 있습니다. <strong className="text-white font-bold">교환 가능 · 영구 아이템</strong>이며, 아이템 드롭률 증가 옵션이 적용됩니다.
                    </div>
                    <div className="my-4 sm:my-5 rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-950 text-center shadow-xl">
                        <img src="/images/blog/soul-weapon/soul-ether-orbs.png" alt="1단계~4단계 소울 에테르 아이콘" className="w-full h-auto block object-cover" />
                        <div className="p-2.5 sm:p-3.5 bg-slate-800/90 border-t border-slate-700/60">
                            <p className="text-xs sm:text-sm text-slate-200 font-semibold">1단계 · 2단계 · 3단계 · 4단계 소울 에테르 아이콘</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto mb-4 rounded-xl border border-slate-700/60">
                        <table className="w-full text-xs sm:text-base min-w-[380px]">
                            <thead>
                                <tr className="bg-emerald-900/60 text-emerald-100">
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-left font-bold">보스 몬스터</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold">해당 난이도</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold">드롭 아이템</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {[
                                    { boss: '최초의 대적자, 카링', diff: '노멀, 하드, 익스트림', item: '1단계 소울 에테르', color: 'text-sky-300' },
                                    { boss: '벨로나, 찬란한 흉성', diff: '노멀, 하드', item: '2단계 소울 에테르', color: 'text-blue-300' },
                                    { boss: '림보, 발드릭스', diff: '노멀, 하드', item: '3단계 소울 에테르', color: 'text-indigo-300' },
                                    { boss: '유피테르', diff: '노멀, 하드', item: '4단계 소울 에테르', color: 'text-violet-300' },
                                ].map((row) => (
                                    <tr key={row.boss} className="bg-slate-900/50 hover:bg-slate-800/40 transition-colors">
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 font-bold text-white">{row.boss}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center text-white font-medium">{row.diff}</td>
                                        <td className={`py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold ${row.color}`}>{row.item}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* 4. 소울 스킬 삭제 */}
                <section id="removed" className="mb-10 sm:mb-12">
                    <h2 className="text-lg sm:text-2xl font-black text-white mb-4 sm:mb-5 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <X className="w-5 h-5 sm:w-7 sm:h-7 text-red-400" />
                        <span>4. 소울 스킬 & 소울 게이지 삭제</span>
                    </h2>
                    <div className="p-3.5 sm:p-5 rounded-xl bg-red-900/25 border border-red-700/50 mb-4 sm:mb-5 text-xs sm:text-base text-red-100 font-medium break-keep leading-relaxed">
                        기존의 <strong className="text-white font-bold">소울 스킬과 소울 게이지 충전 시스템이 삭제</strong>됩니다. 소울 게이지 충전에 따라 적용되던 공격력/마력 증가 효과는 <strong className="text-amber-300 font-bold">상시 적용</strong>으로 자동 변경됩니다.
                    </div>
                    <div className="my-4 sm:my-5 rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-950 text-center shadow-xl">
                        <img src="/images/blog/soul-weapon/soul-tooltip-example.png" alt="기존 소울 능력 및 증폭 성공 시 생기는 소울 잠재능력 툴팁 비교 예시" className="w-full h-auto block object-cover" />
                        <div className="p-2.5 sm:p-3.5 bg-slate-800/90 border-t border-slate-700/60">
                            <p className="text-xs sm:text-sm text-slate-200 font-semibold">기존 소울 능력 (상시 적용) & 증폭 성공 시 부여되는 소울 잠재능력 툴팁 예시</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
                        <div className="p-3.5 sm:p-5 rounded-xl bg-red-900/20 border border-red-700/40 space-y-2 sm:space-y-2.5">
                            <p className="text-sm sm:text-base font-bold text-red-300 mb-2">❌ 삭제되는 것들</p>
                            {['소울웨폰 UI 및 단축키', '소울 스킬 (9/17 점검 후 삭제)', '소울 게이지 충전 시스템', '소울 아이템 설명의 소울 스킬 정보', '게임 설정의 소울웨폰창 표시 옵션'].map((item) => (
                                <p key={item} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-white font-medium">
                                    <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />{item}
                                </p>
                            ))}
                        </div>
                        <div className="p-3.5 sm:p-5 rounded-xl bg-emerald-900/20 border border-emerald-700/40 space-y-2 sm:space-y-2.5">
                            <p className="text-sm sm:text-base font-bold text-emerald-300 mb-2">✅ 대신 변경되는 것들</p>
                            {['공격력/마력 증가 효과 → 상시 적용', '소울 이펙트 → 게이지 없이 상시 표시', '소울 이펙트 표시 설정 → 소울 컬렉션으로 이동'].map((item) => (
                                <p key={item} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-white font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />{item}
                                </p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. 소울 외형 변경 */}
                <section id="appearance" className="mb-10 sm:mb-12">
                    <h2 className="text-lg sm:text-2xl font-black text-white mb-4 sm:mb-5 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <Flame className="w-5 h-5 sm:w-7 sm:h-7 text-pink-400" />
                        <span>5. 소울 외형 변경 시스템</span>
                    </h2>
                    <div className="p-3.5 sm:p-5 rounded-xl bg-pink-900/25 border border-pink-700/50 mb-4 sm:mb-5 text-xs sm:text-base text-pink-100 font-medium break-keep leading-relaxed">
                        소울 외형 변경 기능을 통해 <strong className="text-white font-bold">부여된 소울은 유지</strong>한 채로, <strong className="text-pink-300 font-bold">소울 이펙트만 별도로 변경</strong>할 수 있습니다. 소울 컬렉션에 등록된 위대한 소울로만 외형을 변경할 수 있습니다.
                    </div>
                    <div className="my-4 sm:my-5 rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-950 text-center">
                        <img src="/images/blog/soul-weapon/soul-skin-ui.png" alt="소울 컬렉션 및 소울 외형 (SOUL SKIN) 변경 UI" className="w-full h-auto block object-cover" />
                    </div>
                    <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-base text-white font-medium p-3.5 sm:p-5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                        {['소울 컬렉션 우측 상단의 소울 외형 버튼으로 UI 오픈', '소울 컬렉션에 등록된 위대한 소울로만 외형 변경 가능', '변경하려는 위대한 소울 클릭 → 외형 적용 버튼으로 변경', '외형 해제 버튼으로 기존 착용 중이던 소울 이펙트로 되돌리기 가능'].map((item, i) => (
                            <p key={i} className="flex items-start gap-2 sm:gap-2.5">
                                <span className="text-pink-400 font-mono font-bold text-xs sm:text-sm mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                                {item}
                            </p>
                        ))}
                    </div>
                </section>

                {/* 6. 소울 컬렉션 */}
                <section id="collection" className="mb-10 sm:mb-12">
                    <h2 className="text-lg sm:text-2xl font-black text-white mb-4 sm:mb-5 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <BookOpen className="w-5 h-5 sm:w-7 sm:h-7 text-sky-400" />
                        <span>6. 소울 컬렉션 업데이트</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-5 sm:mb-6">
                        <div className="p-3.5 sm:p-5 rounded-xl bg-sky-900/25 border border-sky-700/50 text-xs sm:text-base space-y-2">
                            <p className="font-bold text-sky-300 mb-2">📚 신규 소울 추가</p>
                            <p className="text-white font-medium break-keep">소울 컬렉션에 다음 3종 소울이 새롭게 추가됩니다:</p>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-2.5">
                                {['카이', '드래곤 로어', '메이린'].map((soul) => (
                                    <span key={soul} className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-sky-900/70 text-sky-200 border border-sky-600/50 text-xs sm:text-sm font-bold">위대한 {soul}의 소울</span>
                                ))}
                            </div>
                        </div>
                        <div className="p-3.5 sm:p-5 rounded-xl bg-amber-900/25 border border-amber-700/50 text-xs sm:text-base space-y-2">
                            <p className="font-bold text-amber-300 mb-2">⏰ NPC 즉시 등록 이벤트 (한시적)</p>
                            <p className="text-white font-medium break-keep">2026년 12월 16일(수)까지 주요 마을 <strong className="text-amber-300 font-bold">메이플 운영자 NPC</strong>를 통해 무기에 부여된 3종 소울을 소울 컬렉션에 즉시 등록 가능합니다. (메이플ID당 최대 3회)</p>
                            <p className="text-xs sm:text-sm text-amber-400 font-semibold">※ 컬렉션 등록 시 소울 아이템은 사라지며, 증폭된 소울 등록 시 증폭 단계와 잠재능력은 비활성화 상태로 전환됩니다.</p>
                        </div>
                    </div>
                    <div className="p-3.5 sm:p-5 rounded-xl bg-slate-800/70 border border-slate-700/50 text-xs sm:text-base text-white font-medium">
                        <p className="font-bold text-white mb-2 sm:mb-2.5 text-base sm:text-lg">📝 기타 변경사항</p>
                        <ul className="space-y-1.5 sm:space-y-2">
                            {['소울 컬렉션 UI의 소울 스킬 정보 삭제 및 일부 UI 크기 재조정', '무기 아이템 설명에 소울 잠재능력 및 소울 증폭 단계 정보 추가', '위대한 소울 아이템 설명에 소울 증폭 부여 가능 정보 추가'].map((item) => (
                                <li key={item} className="flex items-start gap-2 sm:gap-2.5"><ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 flex-shrink-0 mt-0.5" />{item}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* 7. 주의사항 */}
                <section id="caution" className="mb-10 sm:mb-12">
                    <h2 className="text-lg sm:text-2xl font-black text-white mb-4 sm:mb-5 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <Shield className="w-5 h-5 sm:w-7 sm:h-7 text-amber-400" />
                        <span>7. 주의사항 & 예외 규정</span>
                    </h2>
                    <div className="space-y-2.5 sm:space-y-3">
                        {[
                            { color: 'border-red-700/60 bg-red-900/20', icon: '⚠️', text: '증폭 게이지 및 소울 잠재능력 등급 상승 보장 재설정 횟수는 무기 아이템 단위로 저장되며, 캐릭터 간 교환 · 메이플 옥션 판매 등록 · 창고 보관 · 택배 보내기 · 아이템 버리기 시 초기화됩니다.' },
                            { color: 'border-emerald-700/60 bg-emerald-900/20', icon: '✅', text: '장비가 파괴되어도 증폭 게이지 및 소울 잠재능력 등급 상승 보장을 위한 재설정 횟수는 유지됩니다.' },
                            { color: 'border-indigo-700/60 bg-indigo-900/20', icon: '💎', text: '데스티니 무기 초월 시 소울 증폭 단계 및 소울 잠재능력은 전승되어 지급됩니다.' },
                            { color: 'border-slate-700/60 bg-slate-800/60', icon: '🚫', text: '유효 기간이 있는 무기는 소울을 증폭하거나 소울 잠재능력을 재설정할 수 없습니다.' },
                            { color: 'border-violet-700/60 bg-violet-900/20', icon: '⚔️', text: '제로의 경우 무기 성장을 통해 제네시스 무기로 성장할 때 소울 증폭 및 소울 잠재능력 정보가 전승됩니다. 이전 단계 무기 장착 시 이전 무기의 소울 증폭 및 소울 잠재능력 정보로 변경됩니다.' },
                            { color: 'border-amber-700/60 bg-amber-900/20', icon: '🔒', text: "[제네시스 무기] 힘의 해방, 두 번째 퀘스트를 진행하지 않은 경우 봉인된 제네시스 무기 및 제네시스 무기에 소울을 부여하거나 증폭하거나 소울 잠재능력을 재설정할 수 없습니다." },
                        ].map((item, i) => (
                            <div key={i} className={`p-3.5 sm:p-5 rounded-xl border ${item.color} flex items-start gap-2.5 sm:gap-3.5 text-xs sm:text-base text-white font-medium break-keep leading-relaxed`}>
                                <span className="text-base sm:text-lg flex-shrink-0">{item.icon}</span>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* 8. 비용 분석 */}
                <section id="cost" className="mb-10 sm:mb-12">
                    <h2 className="text-lg sm:text-2xl font-black text-white mb-4 sm:mb-5 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <Calculator className="w-5 h-5 sm:w-7 sm:h-7 text-rose-400" />
                        <span>8. 💰 비용 분석 — 증폭 & 잠재 천장 계산</span>
                    </h2>

                    <div className="p-3.5 sm:p-5 rounded-xl bg-rose-900/25 border border-rose-700/50 mb-5 sm:mb-6 text-xs sm:text-base text-rose-100 font-medium break-keep leading-relaxed">
                        소울 증폭은 실패할 때마다 성공 확률과 증폭 게이지가 함께 상승하며, 게이지가 100%가 되면 <strong className="text-white font-bold">천장(확정 성공)</strong>에 도달합니다. 아래는 단계별 최대 비용(천장)과 평균 기댓값을 정리한 표입니다.
                    </div>

                    {/* 8-1. 소울 증폭 비용 */}
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 sm:mb-3.5 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" /> 소울 증폭 — 단계별 천장 & 기댓값
                    </h3>
                    <div className="overflow-x-auto mb-5 rounded-xl border border-slate-700/60">
                        <table className="w-full text-xs sm:text-base min-w-[580px]">
                            <thead>
                                <tr className="bg-indigo-900/70 text-indigo-100 text-xs sm:text-sm">
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-left font-bold">목표 단계</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold">1회 메소</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold">기본 확률</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold">천장 횟수</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-right font-bold">최대 비용 (천장)</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-right font-bold">평균 기댓값</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 text-xs sm:text-sm">
                                {[
                                    { step: '1단계', meso: '5억', rate: '5% (+1%)', ceil: '25회', maxMeso: '125억~130억', maxEth: '에테르 25~26개', avgMeso: '약 40억~45억', avgEth: '에테르 ~9개', color: 'text-sky-300', bg: 'bg-sky-900/20' },
                                    { step: '2단계', meso: '10억', rate: '3% (+0.6%)', ceil: '33회', maxMeso: '330억~340억', maxEth: '에테르 33~34개', avgMeso: '약 120억~140억', avgEth: '에테르 ~13개', color: 'text-blue-300', bg: 'bg-blue-900/20' },
                                    { step: '3단계', meso: '17.5억', rate: '2% (+0.4%)', ceil: '43회', maxMeso: '752.5억~770억', maxEth: '에테르 43~44개', avgMeso: '약 300억~350억', avgEth: '에테르 ~19개', color: 'text-indigo-300', bg: 'bg-indigo-900/20' },
                                    { step: '4단계', meso: '27.5억', rate: '1.5% (+0.3%)', ceil: '50회', maxMeso: '1,375억~1,402.5억', maxEth: '에테르 50~51개', avgMeso: '약 600억~700억', avgEth: '에테르 ~24개', color: 'text-violet-300', bg: 'bg-violet-900/20' },
                                ].map((row) => (
                                    <tr key={row.step} className={`${row.bg} hover:bg-slate-800/40 transition-colors`}>
                                        <td className={`py-2.5 sm:py-3.5 px-3 sm:px-4 font-bold ${row.color}`}>{row.step}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center text-white font-mono font-semibold">{row.meso}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center text-white font-medium">{row.rate}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-mono text-white font-bold">{row.ceil}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-right">
                                            <span className="text-red-400 font-mono font-bold block">{row.maxMeso}</span>
                                            <span className="text-slate-200 text-xs font-medium">{row.maxEth}</span>
                                        </td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-right">
                                            <span className="text-emerald-400 font-mono font-bold block">{row.avgMeso}</span>
                                            <span className="text-slate-200 text-xs font-medium">{row.avgEth}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 mb-5 sm:mb-6 font-medium break-keep">※ 천장 시도 횟수는 100% 게이지 달성 후 확정 성공 시도 여부에 따라 1회분의 편차가 발생할 수 있습니다.</p>

                    {/* 풀증폭 총합 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-6 sm:mb-8">
                        <div className="p-3.5 sm:p-5 rounded-xl bg-red-900/25 border border-red-700/50 text-xs sm:text-base">
                            <p className="font-bold text-red-300 mb-2">😱 최악의 경우 (1~4단계 올천장)</p>
                            <ul className="space-y-1.5 sm:space-y-2 text-white font-medium">
                                <li className="flex items-center gap-2"><span className="text-red-400">•</span>메소: <strong className="text-amber-300 font-mono text-sm sm:text-base">약 2,582.5억 ~ 2,642.5억</strong></li>
                                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>에테르: 1단계 25~26개 / 2단계 33~34개<br />3단계 43~44개 / 4단계 50~51개</li>
                            </ul>
                        </div>
                        <div className="p-3.5 sm:p-5 rounded-xl bg-emerald-900/25 border border-emerald-700/50 text-xs sm:text-base">
                            <p className="font-bold text-emerald-300 mb-2">😊 평균적인 경우 (기댓값 기준)</p>
                            <ul className="space-y-1.5 sm:space-y-2 text-white font-medium">
                                <li className="flex items-center gap-2"><span className="text-emerald-400">•</span>메소: <strong className="text-emerald-300 font-mono text-sm sm:text-base">약 1,100억 ~ 1,250억</strong></li>
                                <li className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">•</span>에테르: 단계별 평균 9개 / 13개 / 19개 / 24개</li>
                            </ul>
                        </div>
                    </div>

                    {/* 8-2. 소울 잠재능력 등급업 비용 */}
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 sm:mb-3.5 flex items-center gap-2">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" /> 소울 잠재능력 — 등급업 천장 & 기댓값
                    </h3>
                    <div className="overflow-x-auto mb-5 rounded-xl border border-slate-700/60">
                        <table className="w-full text-xs sm:text-base min-w-[520px]">
                            <thead>
                                <tr className="bg-violet-900/70 text-violet-100 text-xs sm:text-sm">
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-left font-bold">등급 상승 구간</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold">1회 비용</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold">상승 확률</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-bold">보장 횟수</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-right font-bold">최대 천장 비용</th>
                                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-right font-bold">평균 기댓값</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 text-xs sm:text-sm">
                                {[
                                    { from: '레어 → 에픽', cost: '2,000만', rate: '1.5%', ceil: '100회', max: '20억', avg: '약 13.3억', fg: 'text-sky-300', bg: 'bg-sky-900/20' },
                                    { from: '에픽 → 유니크', cost: '4,000만', rate: '0.5875%', ceil: '256회', max: '102.4억', avg: '약 68.1억', fg: 'text-purple-300', bg: 'bg-purple-900/20' },
                                    { from: '유니크 → 레전드리', cost: '6,500만', rate: '0.3322%', ceil: '451회', max: '293.15억', avg: '약 195.7억', fg: 'text-emerald-300', bg: 'bg-emerald-900/20' },
                                ].map((row) => (
                                    <tr key={row.from} className={`${row.bg} hover:bg-slate-800/40 transition-colors`}>
                                        <td className={`py-2.5 sm:py-3.5 px-3 sm:px-4 font-bold ${row.fg}`}>{row.from}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center text-white font-mono font-semibold">{row.cost}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-mono text-white font-medium">{row.rate}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center font-mono text-white font-bold">{row.ceil}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-right text-red-400 font-mono font-bold">{row.max}</td>
                                        <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-right text-emerald-400 font-mono font-bold">{row.avg}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-6 sm:mb-8">
                        <div className="p-3.5 sm:p-5 rounded-xl bg-red-900/20 border border-red-700/50 text-xs sm:text-base">
                            <p className="font-bold text-red-300 mb-1.5 sm:mb-2">😱 레어 → 레전드리 최악 천장</p>
                            <p className="text-white font-mono font-bold text-lg sm:text-2xl">415.55억 메소</p>
                            <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">20억 + 102.4억 + 293.15억</p>
                        </div>
                        <div className="p-3.5 sm:p-5 rounded-xl bg-emerald-900/20 border border-emerald-700/50 text-xs sm:text-base">
                            <p className="font-bold text-emerald-300 mb-1.5 sm:mb-2">😊 레어 → 레전드리 평균 기댓값</p>
                            <p className="text-white font-mono font-bold text-lg sm:text-2xl">약 277억 메소</p>
                            <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">13.3억 + 68.1억 + 195.7억</p>
                        </div>
                    </div>

                    {/* 8-3. 레전드리 옵션 재설정 확률 분석 */}
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 sm:mb-3.5 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" /> 레전드리 등급 도달 후 — 옵션 라인 분석
                    </h3>
                    <div className="p-3.5 sm:p-5 rounded-xl bg-slate-800/70 border border-slate-700/50 text-xs sm:text-base text-white font-medium mb-4 sm:mb-5 break-keep">
                        소울 잠재능력 레전드리 등급에서의 1회 재설정 비용은 <strong className="text-amber-300 font-bold">8,800만 메소</strong>입니다. 확률표를 바탕으로 <em className="text-slate-200">옵션 종류와 무관하게 오직 등급만</em> 띄웠을 때의 확률과 기댓값 비용을 계산한 결과입니다.
                    </div>

                    <div className="space-y-3.5 sm:space-y-4 mb-6">
                        {/* 1줄 이탈 */}
                        <div className="p-4 sm:p-6 rounded-xl border border-amber-700/50 bg-amber-900/20">
                            <div className="flex flex-wrap items-start justify-between gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                                <div>
                                    <p className="font-bold text-amber-300 text-sm sm:text-base mb-0.5">1줄 이탈 (레전드리 / 레전드리 / 유니크)</p>
                                    <p className="text-xs sm:text-sm text-slate-200 font-medium">2번째 또는 3번째 줄 중 정확히 한 줄만 레전드리 등급</p>
                                </div>
                                <span className="px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-amber-900/70 text-amber-300 text-xs sm:text-sm font-mono font-bold border border-amber-600/50">약 0.99%</span>
                            </div>
                            <div className="bg-slate-900/70 rounded-lg p-2.5 sm:p-3.5 text-xs sm:text-sm font-mono text-white mb-3 space-y-1 overflow-x-auto">
                                <p className="text-slate-300">// 확률 계산</p>
                                <p>(0.004975 × 0.995025) + (0.995025 × 0.004975)</p>
                                <p className="text-amber-300 font-bold">= 0.0099004975 ≈ 0.99%</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-sm">
                                <div className="p-2.5 sm:p-3 rounded-lg bg-slate-800/70 border border-slate-700/50">
                                    <p className="text-slate-200 mb-0.5 font-medium">평균 소요 횟수</p>
                                    <p className="text-white font-mono font-bold text-sm sm:text-base">1 ÷ 0.0099 ≈ 약 101회</p>
                                </div>
                                <div className="p-2.5 sm:p-3 rounded-lg bg-amber-900/40 border border-amber-700/50">
                                    <p className="text-slate-200 mb-0.5 font-medium">기댓값 비용</p>
                                    <p className="text-amber-300 font-mono font-bold text-sm sm:text-base">약 88억 8,844만 메소</p>
                                </div>
                            </div>
                        </div>

                        {/* 올이탈 */}
                        <div className="p-4 sm:p-6 rounded-xl border border-rose-700/50 bg-rose-900/20">
                            <div className="flex flex-wrap items-start justify-between gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                                <div>
                                    <p className="font-bold text-rose-300 text-sm sm:text-base mb-0.5">올이탈 (레전드리 / 레전드리 / 레전드리)</p>
                                    <p className="text-xs sm:text-sm text-slate-200 font-medium">2번째와 3번째 줄 모두 레전드리 등급</p>
                                </div>
                                <span className="px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-rose-900/70 text-rose-300 text-xs sm:text-sm font-mono font-bold border border-rose-600/50">약 0.002475%</span>
                            </div>
                            <div className="bg-slate-900/70 rounded-lg p-2.5 sm:p-3.5 text-xs sm:text-sm font-mono text-white mb-3 space-y-1 overflow-x-auto">
                                <p className="text-slate-300">// 확률 계산</p>
                                <p>0.004975 × 0.004975</p>
                                <p className="text-rose-300 font-bold">= 0.000024750625 ≈ 0.002475%</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-sm">
                                <div className="p-2.5 sm:p-3 rounded-lg bg-slate-800/70 border border-slate-700/50">
                                    <p className="text-slate-200 mb-0.5 font-medium">평균 소요 횟수</p>
                                    <p className="text-white font-mono font-bold text-sm sm:text-base">1 ÷ 0.0000247 ≈ 약 40,403회</p>
                                </div>
                                <div className="p-2.5 sm:p-3 rounded-lg bg-rose-900/40 border border-rose-700/50">
                                    <p className="text-slate-200 mb-0.5 font-medium">기댓값 비용</p>
                                    <p className="text-rose-300 font-mono font-bold text-sm sm:text-base">약 3조 5,554억 메소</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 경고 박스 */}
                    <div className="p-3.5 sm:p-5 rounded-xl bg-slate-800/80 border border-slate-600/70 text-xs sm:text-base text-white font-medium break-keep space-y-2">
                        <p className="font-bold text-white text-sm sm:text-lg">💡 체감 요약</p>
                        <p><span className="text-amber-300 font-bold">레레유</span>(또는 레유레) 등급 구성만 구경하는 데 평균 <strong className="text-amber-300 font-bold">약 89억 메소</strong>가 소모됩니다.</p>
                        <p><span className="text-rose-300 font-bold">올이탈(레레레)</span> 등급 구성을 구경하는 데 평균 <strong className="text-rose-300 font-bold">약 3조 5,554억 메소</strong>라는 비현실적인 기댓값이 나옵니다.</p>
                        <p className="text-slate-200">가장 중요한 점은 이 수치가 잡옵션을 포함한 단순 <em>등급</em> 등장 확률이라는 것입니다. 올이탈 구성에서 보공, 공퍼 등 <strong className="text-white font-bold">유효 옵션을 저격하려면 여기에 옵션 등장 확률까지 곱해야</strong> 하므로 비용이 기하급수적으로 늘어납니다. 따라서 소울 잠재능력에서 올이탈을 무리하게 노리는 것은 권장하지 않습니다.</p>
                    </div>

                    {/* 최종 견적 */}
                    <div className="mt-5 sm:mt-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-rose-900/40 via-indigo-900/30 to-slate-900 border border-rose-700/50 text-xs sm:text-base break-keep">
                        <p className="font-bold text-white text-base sm:text-lg mb-2.5 sm:mb-3.5 flex items-center gap-2">
                            <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400" /> 최종 견적 요약
                        </p>
                        <div className="space-y-2 sm:space-y-2.5 text-white font-medium">
                            <p><span className="text-indigo-300 font-bold">소울 증폭 4단계 (풀증폭)</span> — 평균 <strong className="text-emerald-300 font-bold">1,100억~1,250억</strong> / 천장 시 최악 <strong className="text-red-400 font-bold">약 2,600억 메소</strong> + 에테르 150여 개</p>
                            <p><span className="text-violet-300 font-bold">소울 잠재 레전드리 등급업</span> — 평균 <strong className="text-emerald-300 font-bold">약 277억</strong> / 천장 시 최악 <strong className="text-red-400 font-bold">약 415.5억 메소</strong></p>
                            <div className="mt-3 sm:mt-4 pt-3 sm:pt-3.5 border-t border-slate-700">
                                <p className="text-slate-200 text-xs sm:text-sm font-semibold">무기 하나에 소울 증폭 4단계 + 잠재 레전드리까지 완성하려면</p>
                                <p className="text-white font-bold text-base sm:text-xl mt-1">평균 1,400억~1,500억 메소 <span className="text-slate-300 font-normal text-xs sm:text-base">/ 억까 시</span> 3,000억 메소 이상</p>
                                <p className="text-rose-300 text-xs sm:text-sm mt-1 sm:mt-1.5 font-bold">⚠️ 초하이엔드 스펙업 콘텐츠 — 신중하게 접근하세요</p>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* 마무리 */}
                <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-900/40 via-violet-900/30 to-slate-900 border border-indigo-700/50 text-xs sm:text-base text-white font-medium break-keep leading-relaxed">
                    <p className="font-bold text-white text-base sm:text-lg mb-2">📌 정리</p>
                    <p>이번 소울웨폰 개편으로 기존의 소울 스킬 관리 부담이 없어지고, 대신 <strong className="text-indigo-300 font-bold">소울 증폭과 소울 잠재능력</strong>이라는 새로운 파밍 요소가 생겼습니다. 소울 에테르는 그란디스 보스 드롭으로만 획득 가능해 고스펙 유저 중심의 콘텐츠가 되었으며, 소울 잠재능력 재설정은 <strong className="text-amber-300 font-bold">썬데이 메이플 미라클 타임</strong>에 노리는 것이 경제적입니다. 올이탈을 억지로 노리기보다 예산에 맞게 유니크 수준에서 멈추는 전략도 합리적인 선택입니다.</p>
                </div>

                {/* 관련 포스팅 */}
                <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-800">
                    <p className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">📎 관련 포스팅</p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        {[
                            { href: '/blog/boss-crystal-price-adjustment-september-2026', label: '💰 보스 결정석 가격 조정 완벽 정리' },
                            { href: '/blog/testworld-skill-balance-sep-17-2026', label: '⚔️ 전직업 스킬 조정 총정리' },
                            { href: '/blog/maple-now-september-10-2026-recap', label: '🍁 메이플NOW 9월 10일 총정리' },
                        ].map((link) => (
                            <Link key={link.href} href={link.href} prefetch={false} className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 text-xs sm:text-base text-white hover:text-indigo-300 font-semibold transition-all">{link.label}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
