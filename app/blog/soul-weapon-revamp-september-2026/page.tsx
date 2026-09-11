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
} from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function SoulWeaponRevampPage() {
    return (
        <main className="w-full min-h-screen bg-slate-900 text-slate-100 py-8 px-4">
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-900/10 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* 뒤로가기 */}
            <div className="max-w-4xl mx-auto relative z-10 flex items-center gap-3 mb-8">
                <Link prefetch={false} href="/blog" className="flex items-center gap-2 px-4 py-2 bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700/50 hover:border-indigo-500/50 rounded-xl text-sm font-bold text-indigo-300 hover:text-indigo-200 transition-all shadow-sm group">
                    <ChevronRight className="w-4 h-4 rotate-180 transform group-hover:-translate-x-1 transition-transform" />
                    <span>← 블로그 목록</span>
                </Link>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* 타이틀 */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 font-semibold">👻 소울웨폰</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-900/50 text-amber-300 border border-amber-700/50 font-semibold">업데이트 소식</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">9월 17일 적용</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 break-keep leading-tight">
                        👻 소울웨폰 전면 개편 완벽 정리<br />
                        <span className="text-indigo-300">소울 증폭 · 잠재능력 · 소울 에테르</span> 한눈에 보기
                    </h1>
                    <p className="text-slate-400 text-sm break-keep mb-4">
                        소울 스킬 삭제 · 소울 증폭 시스템 신규 · 소울 잠재능력 재설정 · 소울 에테르 보스 드롭 · 소울 외형 변경 · 소울 컬렉션 업데이트
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> 2026년 9월 11일</span>
                        <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-400" /> 적용 예정일: 2026년 9월 17일(목) 점검 후</span>
                        <span>📖 약 7분 소요</span>
                    </div>
                </div>

                {/* 주의 배너 */}
                <div className="mb-8 p-4 rounded-xl bg-amber-900/20 border border-amber-700/50 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-200 break-keep">
                        <span className="font-bold">2026년 9월 17일(목) 점검 후 본섭 적용 예정입니다.</span> 일부 세부 수치 및 정책은 라이브 적용 시 변경될 수 있습니다.
                    </div>
                </div>

                {/* 요약 카드 */}
                <section className="mb-10">
                    <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-400" /> 한눈에 보는 주요 변경점
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl p-4 border border-indigo-700/50 bg-indigo-900/10 flex items-start gap-3">
                            <span className="text-2xl">✨</span>
                            <div><p className="font-bold text-white text-sm">소울 증폭 시스템 신규 추가</p><p className="text-slate-400 text-xs mt-0.5 break-keep">소울 에테르 + 메소로 위대한 소울에 잠재능력 부여 (1~4단계)</p></div>
                        </div>
                        <div className="rounded-xl p-4 border border-violet-700/50 bg-violet-900/10 flex items-start gap-3">
                            <span className="text-2xl">🎲</span>
                            <div><p className="font-bold text-white text-sm">소울 잠재능력 재설정 추가</p><p className="text-slate-400 text-xs mt-0.5 break-keep">메소만으로 재설정 가능 · 썬데이 메이플 미라클 타임 적용</p></div>
                        </div>
                        <div className="rounded-xl p-4 border border-emerald-700/50 bg-emerald-900/10 flex items-start gap-3">
                            <span className="text-2xl">💎</span>
                            <div><p className="font-bold text-white text-sm">소울 에테르 신규 보스 드롭</p><p className="text-slate-400 text-xs mt-0.5 break-keep">그란디스 보스 클리어 시 낮은 확률로 1~4단계 소울 에테르 획득</p></div>
                        </div>
                        <div className="rounded-xl p-4 border border-red-700/50 bg-red-900/10 flex items-start gap-3">
                            <span className="text-2xl">🗑️</span>
                            <div><p className="font-bold text-white text-sm">소울 스킬 & 소울 게이지 삭제</p><p className="text-slate-400 text-xs mt-0.5 break-keep">공/마 증가 효과는 상시 적용으로 변경 · 이펙트도 상시 표시</p></div>
                        </div>
                        <div className="rounded-xl p-4 border border-pink-700/50 bg-pink-900/10 flex items-start gap-3">
                            <span className="text-2xl">🎨</span>
                            <div><p className="font-bold text-white text-sm">소울 외형 변경 시스템 추가</p><p className="text-slate-400 text-xs mt-0.5 break-keep">소울 이펙트만 따로 변경 가능 · 소울 컬렉션 등록 소울로 적용</p></div>
                        </div>
                        <div className="rounded-xl p-4 border border-sky-700/50 bg-sky-900/10 flex items-start gap-3">
                            <span className="text-2xl">📚</span>
                            <div><p className="font-bold text-white text-sm">소울 컬렉션 업데이트</p><p className="text-slate-400 text-xs mt-0.5 break-keep">카이 · 드래곤 로어 · 메이린 소울 추가 · NPC 컬렉션 즉시 등록 이벤트</p></div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* 목차 */}
                <div className="mb-10 p-5 rounded-2xl bg-slate-800/50 border border-slate-700/60">
                    <p className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-400" /> 📑 목차
                    </p>
                    <ol className="space-y-1.5 text-sm">
                        {[
                            { num: '01', href: '#amplify', label: '소울 증폭 시스템', color: 'text-indigo-400' },
                            { num: '02', href: '#potential', label: '소울 잠재능력 재설정', color: 'text-violet-400' },
                            { num: '03', href: '#ether', label: '소울 에테르 (신규 보스 드롭)', color: 'text-emerald-400' },
                            { num: '04', href: '#removed', label: '소울 스킬 & 소울 게이지 삭제', color: 'text-red-400' },
                            { num: '05', href: '#appearance', label: '소울 외형 변경 시스템', color: 'text-pink-400' },
                            { num: '06', href: '#collection', label: '소울 컬렉션 업데이트', color: 'text-sky-400' },
                            { num: '07', href: '#caution', label: '주의사항 & 예외 규정', color: 'text-amber-400' },
                        ].map(item => (
                            <li key={item.href} className="flex items-center gap-2 bg-slate-900/40 p-2 rounded-lg border border-slate-700/30">
                                <span className={`${item.color} font-mono font-bold text-xs`}>{item.num}</span>
                                <a href={item.href} className="text-slate-300 hover:text-white transition-colors">{item.label}</a>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* 1. 소울 증폭 시스템 */}
                <section id="amplify" className="mb-12">
                    <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <Sparkles className="w-6 h-6 text-indigo-400" />
                        <span>1. 소울 증폭 시스템</span>
                    </h2>
                    <div className="p-4 rounded-xl bg-indigo-900/20 border border-indigo-700/40 mb-5 text-sm text-indigo-200 break-keep leading-relaxed">
                        소울 증폭은 <strong className="text-white">소울 에테르와 메소를 소모</strong>하여, 요구 레벨 <strong className="text-amber-300">200레벨 이상 무기에 부여된 위대한 소울</strong>에 증폭 단계를 부여하거나 성장시키는 시스템입니다. 증폭 단계가 부여된 무기에는 <strong className="text-indigo-300">소울 잠재능력</strong>이 함께 부여됩니다.
                    </div>
                    <div className="mb-4 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-300 space-y-1.5">
                        <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />통합 강화 UI &gt; 소울웨폰 탭 &gt; <strong className="text-white">소울 증폭 버튼</strong> 클릭</p>
                        <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />또는 소비창에서 <strong className="text-white">소울 에테르를 더블 클릭</strong>하여 진행</p>
                    </div>
                    <h3 className="text-base font-bold text-white mb-3">✦ 증폭 단계별 성공 확률 & 소모 재료</h3>
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full text-sm rounded-xl overflow-hidden border border-slate-700/60">
                            <thead>
                                <tr className="bg-indigo-900/60 text-indigo-200">
                                    <th className="py-3 px-4 text-left font-bold">목표 단계</th>
                                    <th className="py-3 px-4 text-center font-bold">성공 확률</th>
                                    <th className="py-3 px-4 text-right font-bold">소모 메소</th>
                                    <th className="py-3 px-4 text-center font-bold">사용 재료</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {[
                                    { step: '1단계', rate: '5%', meso: '5억', color: 'text-sky-400', bg: 'bg-sky-900/10' },
                                    { step: '2단계', rate: '3%', meso: '10억', color: 'text-blue-400', bg: 'bg-blue-900/10' },
                                    { step: '3단계', rate: '2%', meso: '17.5억', color: 'text-indigo-400', bg: 'bg-indigo-900/10' },
                                    { step: '4단계', rate: '1.5%', meso: '27.5억', color: 'text-violet-400', bg: 'bg-violet-900/10' },
                                ].map((row) => (
                                    <tr key={row.step} className={`${row.bg} hover:bg-slate-800/30 transition-colors`}>
                                        <td className={`py-3 px-4 font-bold ${row.color}`}>{row.step}</td>
                                        <td className="py-3 px-4 text-center font-mono font-bold text-white">{row.rate}</td>
                                        <td className="py-3 px-4 text-right font-mono text-slate-200">{row.meso} 메소</td>
                                        <td className="py-3 px-4 text-center text-slate-300">{row.step} 소울 에테르</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <h3 className="text-base font-bold text-white mb-3">⚡ 증폭 게이지 & 보장 (실패 시 누적)</h3>
                    <div className="p-4 rounded-xl bg-amber-900/15 border border-amber-700/40 text-sm text-amber-200 mb-4 break-keep">
                        소울 증폭 실패 시마다 <strong className="text-white">증폭 게이지가 누적</strong>되며, 게이지 100% 도달 후 다음 시도 시 <strong className="text-amber-300">100% 확률로 증폭 성공</strong>이 보장됩니다.
                        <br /><span className="text-amber-500 text-xs mt-1 block">※ 증폭 성공 시 이전 단계의 증폭 게이지는 초기화됩니다.</span>
                    </div>
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full text-sm rounded-xl overflow-hidden border border-slate-700/60">
                            <thead>
                                <tr className="bg-amber-900/40 text-amber-200">
                                    <th className="py-3 px-4 text-left font-bold">증폭 단계</th>
                                    <th className="py-3 px-4 text-center font-bold">실패 시 확률 증가</th>
                                    <th className="py-3 px-4 text-center font-bold">실패 시 게이지 증가</th>
                                    <th className="py-3 px-4 text-center font-bold">보장 횟수 (최대)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {[
                                    { step: '1단계', prob: '+1%', gauge: '+4.00%', max: '25회' },
                                    { step: '2단계', prob: '+0.6%', gauge: '+3.03%', max: '33회' },
                                    { step: '3단계', prob: '+0.4%', gauge: '+2.33%', max: '43회' },
                                    { step: '4단계', prob: '+0.3%', gauge: '+2.00%', max: '50회' },
                                ].map((row) => (
                                    <tr key={row.step} className="bg-slate-900/40 hover:bg-slate-800/40 transition-colors">
                                        <td className="py-3 px-4 font-bold text-amber-300">{row.step}</td>
                                        <td className="py-3 px-4 text-center text-emerald-400 font-mono font-bold">{row.prob}</td>
                                        <td className="py-3 px-4 text-center text-emerald-400 font-mono font-bold">{row.gauge}</td>
                                        <td className="py-3 px-4 text-center text-slate-300 font-mono">{row.max}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-indigo-700/30 text-sm text-slate-300 space-y-2 break-keep">
                        <p><span className="text-indigo-300 font-bold">• 1단계 증폭 성공 시</span> — 소울 잠재능력과 소울 증폭 단계가 함께 부여됩니다.</p>
                        <p><span className="text-indigo-300 font-bold">• 증폭 단계 성장 시</span> — 소울 잠재능력의 <strong className="text-white">등급과 옵션은 유지</strong>되고, 수치만 상향 전승됩니다.</p>
                        <p><span className="text-indigo-300 font-bold">• 추가 증폭</span> — 이미 증폭된 소울에 추가로 증폭하여 단계를 더 높일 수 있습니다.</p>
                        <p><span className="text-amber-400 font-bold">※</span> 증폭 단계가 부여된 무기에는 <strong className="text-amber-300">위대한 소울로만 소울웨폰을 재부여</strong>할 수 있습니다.</p>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* 2. 소울 잠재능력 재설정 */}
                <section id="potential" className="mb-12">
                    <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <Star className="w-6 h-6 text-violet-400" />
                        <span>2. 소울 잠재능력 재설정 시스템</span>
                    </h2>
                    <div className="p-4 rounded-xl bg-violet-900/20 border border-violet-700/40 mb-5 text-sm text-violet-200 break-keep leading-relaxed">
                        소울 잠재능력은 <strong className="text-white">메소만으로</strong> 재설정할 수 있습니다. 통합 강화 &gt; 소울웨폰 탭의 <strong className="text-violet-300">소울 잠재능력 버튼</strong>으로 이용 가능합니다. 소울 잠재능력은 <strong className="text-amber-300">스페셜 썬데이 메이플 미라클 타임</strong>의 혜택을 받습니다.
                    </div>
                    <h3 className="text-base font-bold text-white mb-3">💰 등급별 재설정 비용 (증폭 단계와 무관)</h3>
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full text-sm rounded-xl overflow-hidden border border-slate-700/60">
                            <thead>
                                <tr className="bg-violet-900/50 text-violet-200">
                                    <th className="py-3 px-4 text-left font-bold">등급</th>
                                    <th className="py-3 px-4 text-right font-bold">재설정 비용</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {[
                                    { grade: '레어', cost: '2,000만 메소', color: 'text-sky-400' },
                                    { grade: '에픽', cost: '4,000만 메소', color: 'text-purple-400' },
                                    { grade: '유니크', cost: '6,500만 메소', color: 'text-amber-400' },
                                    { grade: '레전드리', cost: '8,800만 메소', color: 'text-emerald-400' },
                                ].map((row) => (
                                    <tr key={row.grade} className="bg-slate-900/40 hover:bg-slate-800/40 transition-colors">
                                        <td className={`py-3 px-4 font-bold ${row.color}`}>{row.grade}</td>
                                        <td className="py-3 px-4 text-right font-mono text-white">{row.cost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <h3 className="text-base font-bold text-white mb-3">✦ 등급 상승 확률 & 보장 횟수</h3>
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full text-sm rounded-xl overflow-hidden border border-slate-700/60">
                            <thead>
                                <tr className="bg-violet-900/50 text-violet-200">
                                    <th className="py-3 px-4 text-left font-bold">구간</th>
                                    <th className="py-3 px-4 text-center font-bold">등급 상승 확률</th>
                                    <th className="py-3 px-4 text-center font-bold">등급 상승 보장 횟수</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {[
                                    { from: '레어 → 에픽', rate: '1.5%', max: '100회' },
                                    { from: '에픽 → 유니크', rate: '0.5875%', max: '256회' },
                                    { from: '유니크 → 레전드리', rate: '0.3322%', max: '451회' },
                                ].map((row) => (
                                    <tr key={row.from} className="bg-slate-900/40 hover:bg-slate-800/40 transition-colors">
                                        <td className="py-3 px-4 font-bold text-violet-300">{row.from}</td>
                                        <td className="py-3 px-4 text-center font-mono font-bold text-white">{row.rate}</td>
                                        <td className="py-3 px-4 text-center font-mono text-slate-300">{row.max}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <h3 className="text-base font-bold text-white mb-3">⭐ 소울 잠재능력 옵션별 등급 설정 확률</h3>
                    <div className="overflow-x-auto mb-4">
                        <table className="w-full text-sm rounded-xl overflow-hidden border border-slate-700/60 min-w-[480px]">
                            <thead>
                                <tr className="bg-slate-800/80 text-slate-300">
                                    <th className="py-3 px-3 text-left font-bold">옵션 구분</th>
                                    <th className="py-3 px-3 text-center font-bold text-sky-400">레어</th>
                                    <th className="py-3 px-3 text-center font-bold text-purple-400">에픽</th>
                                    <th className="py-3 px-3 text-center font-bold text-amber-400">유니크</th>
                                    <th className="py-3 px-3 text-center font-bold text-emerald-400">레전드리</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 text-xs">
                                <tr className="bg-slate-900/60">
                                    <td className="py-3 px-3 font-semibold text-white">첫 번째 옵션</td>
                                    <td className="py-3 px-3 text-center text-sky-400">레어 100%</td>
                                    <td className="py-3 px-3 text-center text-purple-400">에픽 100%</td>
                                    <td className="py-3 px-3 text-center text-amber-400">유니크 100%</td>
                                    <td className="py-3 px-3 text-center text-emerald-400">레전드리 100%</td>
                                </tr>
                                <tr className="bg-slate-900/40">
                                    <td className="py-3 px-3 font-semibold text-slate-300">두 번째 옵션</td>
                                    <td className="py-3 px-3 text-center"><span className="text-sky-400">레어 1.96%</span><br /><span className="text-slate-500">노멀 98.04%</span></td>
                                    <td className="py-3 px-3 text-center"><span className="text-purple-400">에픽 4.76%</span><br /><span className="text-slate-500">레어 95.24%</span></td>
                                    <td className="py-3 px-3 text-center"><span className="text-amber-400">유니크 1.96%</span><br /><span className="text-slate-500">에픽 98.04%</span></td>
                                    <td className="py-3 px-3 text-center"><span className="text-emerald-400">레전드리 0.50%</span><br /><span className="text-slate-500">유니크 99.50%</span></td>
                                </tr>
                                <tr className="bg-slate-900/60">
                                    <td className="py-3 px-3 font-semibold text-slate-300">세 번째 옵션</td>
                                    <td className="py-3 px-3 text-center"><span className="text-sky-400">레어 1.96%</span><br /><span className="text-slate-500">노멀 98.04%</span></td>
                                    <td className="py-3 px-3 text-center"><span className="text-purple-400">에픽 4.76%</span><br /><span className="text-slate-500">레어 95.24%</span></td>
                                    <td className="py-3 px-3 text-center"><span className="text-amber-400">유니크 1.96%</span><br /><span className="text-slate-500">에픽 98.04%</span></td>
                                    <td className="py-3 px-3 text-center"><span className="text-emerald-400">레전드리 0.50%</span><br /><span className="text-slate-500">유니크 99.50%</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">※ 레전드리 등급 이상부터 자동 강화 기능 사용 가능&nbsp;|&nbsp;※ 증폭된 위대한 소울만 소울 잠재능력 재설정 가능</p>
                </section>

                {/* 3. 소울 에테르 */}
                <section id="ether" className="mb-12">
                    <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <Gift className="w-6 h-6 text-emerald-400" />
                        <span>3. 소울 에테르 — 신규 보스 드롭</span>
                    </h2>
                    <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-700/40 mb-5 text-sm text-emerald-200 break-keep leading-relaxed">
                        소울 에테르는 총 <strong className="text-white">4단계</strong>로 구성된 신규 아이템으로, 아래 그란디스 보스에서 <strong className="text-amber-300">낮은 확률</strong>로 획득할 수 있습니다. <strong className="text-white">교환 가능 · 영구 아이템</strong>이며, 아이템 드롭률 증가 옵션이 적용됩니다.
                    </div>
                    <div className="overflow-x-auto mb-4">
                        <table className="w-full text-sm rounded-xl overflow-hidden border border-slate-700/60">
                            <thead>
                                <tr className="bg-emerald-900/50 text-emerald-200">
                                    <th className="py-3 px-4 text-left font-bold">보스 몬스터</th>
                                    <th className="py-3 px-4 text-center font-bold">해당 난이도</th>
                                    <th className="py-3 px-4 text-center font-bold">드롭 아이템</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {[
                                    { boss: '최초의 대적자, 카링', diff: '노멀, 하드, 익스트림', item: '1단계 소울 에테르', color: 'text-sky-400' },
                                    { boss: '벨로나, 찬란한 흉성', diff: '노멀, 하드', item: '2단계 소울 에테르', color: 'text-blue-400' },
                                    { boss: '림보, 발드릭스', diff: '노멀, 하드', item: '3단계 소울 에테르', color: 'text-indigo-400' },
                                    { boss: '유피테르', diff: '노멀, 하드', item: '4단계 소울 에테르', color: 'text-violet-400' },
                                ].map((row) => (
                                    <tr key={row.boss} className="bg-slate-900/40 hover:bg-slate-800/40 transition-colors">
                                        <td className="py-3 px-4 font-bold text-white">{row.boss}</td>
                                        <td className="py-3 px-4 text-center text-slate-300">{row.diff}</td>
                                        <td className={`py-3 px-4 text-center font-bold ${row.color}`}>{row.item}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* 4. 소울 스킬 삭제 */}
                <section id="removed" className="mb-12">
                    <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <X className="w-6 h-6 text-red-400" />
                        <span>4. 소울 스킬 & 소울 게이지 삭제</span>
                    </h2>
                    <div className="p-4 rounded-xl bg-red-900/20 border border-red-700/40 mb-5 text-sm text-red-200 break-keep leading-relaxed">
                        기존의 <strong className="text-white">소울 스킬과 소울 게이지 충전 시스템이 삭제</strong>됩니다. 소울 게이지 충전에 따라 적용되던 공격력/마력 증가 효과는 <strong className="text-amber-300">상시 적용</strong>으로 자동 변경됩니다.
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                        <div className="p-4 rounded-xl bg-red-900/15 border border-red-700/30 space-y-2">
                            <p className="text-sm font-bold text-red-400 mb-2">❌ 삭제되는 것들</p>
                            {['소울웨폰 UI 및 단축키', '소울 스킬 (9/17 점검 후 삭제)', '소울 게이지 충전 시스템', '소울 아이템 설명의 소울 스킬 정보', '게임 설정의 소울웨폰창 표시 옵션'].map((item) => (
                                <p key={item} className="flex items-start gap-2 text-xs text-slate-300">
                                    <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />{item}
                                </p>
                            ))}
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-900/15 border border-emerald-700/30 space-y-2">
                            <p className="text-sm font-bold text-emerald-400 mb-2">✅ 대신 변경되는 것들</p>
                            {['공격력/마력 증가 효과 → 상시 적용', '소울 이펙트 → 게이지 없이 상시 표시', '소울 이펙트 표시 설정 → 소울 컬렉션으로 이동'].map((item) => (
                                <p key={item} className="flex items-start gap-2 text-xs text-slate-300">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />{item}
                                </p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. 소울 외형 변경 */}
                <section id="appearance" className="mb-12">
                    <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <Flame className="w-6 h-6 text-pink-400" />
                        <span>5. 소울 외형 변경 시스템</span>
                    </h2>
                    <div className="p-4 rounded-xl bg-pink-900/20 border border-pink-700/40 mb-5 text-sm text-pink-200 break-keep leading-relaxed">
                        소울 외형 변경 기능을 통해 <strong className="text-white">부여된 소울은 유지</strong>한 채로, <strong className="text-pink-300">소울 이펙트만 별도로 변경</strong>할 수 있습니다. 소울 컬렉션에 등록된 위대한 소울로만 외형을 변경할 수 있습니다.
                    </div>
                    <div className="space-y-2 text-sm text-slate-300 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                        {['소울 컬렉션 우측 상단의 소울 외형 버튼으로 UI 오픈', '소울 컬렉션에 등록된 위대한 소울로만 외형 변경 가능', '변경하려는 위대한 소울 클릭 → 외형 적용 버튼으로 변경', '외형 해제 버튼으로 기존 착용 중이던 소울 이펙트로 되돌리기 가능'].map((item, i) => (
                            <p key={i} className="flex items-start gap-2">
                                <span className="text-pink-400 font-mono font-bold text-xs mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                                {item}
                            </p>
                        ))}
                    </div>
                </section>

                {/* 6. 소울 컬렉션 */}
                <section id="collection" className="mb-12">
                    <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <BookOpen className="w-6 h-6 text-sky-400" />
                        <span>6. 소울 컬렉션 업데이트</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-xl bg-sky-900/20 border border-sky-700/40 text-sm space-y-2">
                            <p className="font-bold text-sky-300 mb-2">📚 신규 소울 추가</p>
                            <p className="text-slate-300 break-keep">소울 컬렉션에 다음 3종 소울이 새롭게 추가됩니다:</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {['카이', '드래곤 로어', '메이린'].map((soul) => (
                                    <span key={soul} className="px-2.5 py-1 rounded-full bg-sky-900/60 text-sky-300 border border-sky-700/50 text-xs font-bold">위대한 {soul}의 소울</span>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-900/20 border border-amber-700/40 text-sm space-y-2">
                            <p className="font-bold text-amber-300 mb-2">⏰ NPC 즉시 등록 이벤트 (한시적)</p>
                            <p className="text-slate-300 break-keep">2026년 12월 16일(수)까지 주요 마을 <strong className="text-white">메이플 운영자 NPC</strong>를 통해 무기에 부여된 3종 소울을 소울 컬렉션에 즉시 등록 가능합니다. (메이플ID당 최대 3회)</p>
                            <p className="text-xs text-amber-500">※ 컬렉션 등록 시 소울 아이템은 사라지며, 증폭된 소울 등록 시 증폭 단계와 잠재능력은 비활성화 상태로 전환됩니다.</p>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-300">
                        <p className="font-bold text-white mb-2">📝 기타 변경사항</p>
                        <ul className="space-y-1.5">
                            {['소울 컬렉션 UI의 소울 스킬 정보 삭제 및 일부 UI 크기 재조정', '무기 아이템 설명에 소울 잠재능력 및 소울 증폭 단계 정보 추가', '위대한 소울 아이템 설명에 소울 증폭 부여 가능 정보 추가'].map((item) => (
                                <li key={item} className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />{item}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* 7. 주의사항 */}
                <section id="caution" className="mb-12">
                    <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2 pb-2 border-b border-slate-700">
                        <Shield className="w-6 h-6 text-amber-400" />
                        <span>7. 주의사항 & 예외 규정</span>
                    </h2>
                    <div className="space-y-2.5">
                        {[
                            { color: 'border-red-700/50 bg-red-900/10', icon: '⚠️', text: '증폭 게이지 및 소울 잠재능력 등급 상승 보장 재설정 횟수는 무기 아이템 단위로 저장되며, 캐릭터 간 교환 · 메이플 옥션 판매 등록 · 창고 보관 · 택배 보내기 · 아이템 버리기 시 초기화됩니다.' },
                            { color: 'border-emerald-700/50 bg-emerald-900/10', icon: '✅', text: '장비가 파괴되어도 증폭 게이지 및 소울 잠재능력 등급 상승 보장을 위한 재설정 횟수는 유지됩니다.' },
                            { color: 'border-indigo-700/50 bg-indigo-900/10', icon: '💎', text: '데스티니 무기 초월 시 소울 증폭 단계 및 소울 잠재능력은 전승되어 지급됩니다.' },
                            { color: 'border-slate-700/50 bg-slate-800/40', icon: '🚫', text: '유효 기간이 있는 무기는 소울을 증폭하거나 소울 잠재능력을 재설정할 수 없습니다.' },
                            { color: 'border-violet-700/50 bg-violet-900/10', icon: '⚔️', text: '제로의 경우 무기 성장을 통해 제네시스 무기로 성장할 때 소울 증폭 및 소울 잠재능력 정보가 전승됩니다. 이전 단계 무기 장착 시 이전 무기의 소울 증폭 및 소울 잠재능력 정보로 변경됩니다.' },
                            { color: 'border-amber-700/50 bg-amber-900/10', icon: '🔒', text: "[제네시스 무기] 힘의 해방, 두 번째 퀘스트를 진행하지 않은 경우 봉인된 제네시스 무기 및 제네시스 무기에 소울을 부여하거나 증폭하거나 소울 잠재능력을 재설정할 수 없습니다." },
                        ].map((item, i) => (
                            <div key={i} className={`p-4 rounded-xl border ${item.color} flex items-start gap-3 text-sm text-slate-300 break-keep leading-relaxed`}>
                                <span className="text-base flex-shrink-0">{item.icon}</span>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* 마무리 */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900/30 via-violet-900/20 to-slate-900 border border-indigo-700/40 text-sm text-slate-300 break-keep leading-relaxed">
                    <p className="font-bold text-white text-base mb-2">📌 정리</p>
                    <p>이번 소울웨폰 개편으로 기존의 소울 스킬 관리 부담이 없어지고, 대신 <strong className="text-indigo-300">소울 증폭과 소울 잠재능력</strong>이라는 새로운 파밍 요소가 생겼습니다. 소울 에테르는 그란디스 보스 드롭으로만 획득 가능해 고스펙 유저 중심의 콘텐츠가 되었으며, 소울 잠재능력 재설정은 <strong className="text-amber-300">썬데이 메이플 미라클 타임</strong>에 노리는 것이 경제적입니다.</p>
                </div>

                {/* 관련 포스팅 */}
                <div className="mt-10 pt-8 border-t border-slate-800">
                    <p className="text-sm font-bold text-slate-400 mb-4">📎 관련 포스팅</p>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { href: '/blog/boss-crystal-price-adjustment-september-2026', label: '💰 보스 결정석 가격 조정 완벽 정리' },
                            { href: '/blog/testworld-skill-balance-sep-17-2026', label: '⚔️ 전직업 스킬 조정 총정리' },
                            { href: '/blog/maple-now-september-10-2026-recap', label: '🍁 메이플NOW 9월 10일 총정리' },
                        ].map((link) => (
                            <Link key={link.href} href={link.href} prefetch={false} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 text-sm text-slate-300 hover:text-white transition-all">{link.label}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
