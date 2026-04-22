'use client';

import Link from 'next/link';
import { Calendar, ArrowLeft, AlertCircle, Star, ChevronRight, Target, Swords, Zap, Trophy, AlertTriangle, Clock } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function ChangeBurningLucidWeek6GuidePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white pb-20">
            {/* Header */}
            <header className="w-full max-w-7xl flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 mx-auto">
                <Link href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-purple-400">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-base md:text-lg font-bold">블로그로 돌아가기</span>
                </Link>
            </header>

            <main className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">

                {/* Title Section */}
                <div className="mb-10 sm:mb-14">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                        <span className="text-sm sm:text-base text-slate-300">2026년 4월 24일</span>
                        <span className="text-slate-500">|</span>
                        <span className="text-xs sm:text-sm text-purple-400 font-medium">이벤트 가이드</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight flex flex-col sm:gap-1">
                        <div>
                            <span className="text-2xl sm:text-3xl mr-1 sm:mr-2">🦋</span>
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                                체인지 버닝: 루시드 6주차
                            </span>
                        </div>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent pl-2 sm:pl-[42px]">
                            드디어 전원 70레벨! 이제 헬레나를 잡아라!
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-slate-100 mb-6 leading-relaxed break-keep">
                        이번 주의 핵심은 단 하나, <strong className="text-white">&apos;대부분 유저가 드디어 70레벨을 돌파한다&apos;</strong>는 것입니다<br />
                        그리고 <strong className="text-pink-300">80레벨(악몽의 숲 5단계)을 찍을 수 있는가?</strong> 까지!
                    </p>

                    {/* 핵심 CTA 배너 */}
                    <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-2 border-green-500/70 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 shadow-xl shadow-green-900/30">
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-black text-green-300 text-base sm:text-lg mb-1">✅ 6주차 핵심 한 줄 요약</p>
                            <p className="text-sm sm:text-base text-green-100 break-keep">
                                4단계 숲 파밍 + 헬레나 도전으로 스펙 극대화!<br />
                                <strong className="text-white underline">80레벨 5단계 숲은 7주차에 열립니다. 조급해하지 마세요!</strong>
                                <br />
                                <span className="text-green-200 text-xs sm:text-sm">이번 주 전략을 지금 확인해보세요!</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* 목차 */}
                <nav className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-5 mb-10">
                    <p className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">목차</p>
                    <ul className="space-y-2 text-sm sm:text-base">
                        {[
                            { href: '#tier-check', label: '[현점검] 5주차 마무리 스펙별 내 레벨은?', icon: '📊' },
                            { href: '#core', label: '[6주차 예상] 70레벨 대통합! 티어별 최종 도달 레벨', icon: '🚀' },
                            { href: '#level80', label: '[팩트체크] 80레벨(5단계) 달성, 언제 가능할까?', icon: '⚖️' },
                            { href: '#schedule', label: '남은 이벤트 주차별 일정 체크', icon: '🗓️' },
                            { href: '#mental-care', label: '[결론] 6주차 이렇게 하면 됩니다!', icon: '💚' },
                        ].map(item => (
                            <li key={item.href}>
                                <a href={item.href} className="flex items-center gap-2 text-slate-100 hover:text-purple-300 transition-colors group">
                                    <ChevronRight className="w-4 h-4 text-purple-500 group-hover:translate-x-1 transition-transform shrink-0" />
                                    <span>{item.icon} {item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* ===== 1. 5주차 마무리 스펙별 레벨 ===== */}
                <section id="tier-check" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center shrink-0">
                            <Star className="w-5 h-5 text-purple-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-300">[현재점검] 5주차 마무리 스펙별 내 레벨은? 📊</h2>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-5">
                        <p className="text-sm sm:text-base text-slate-200 break-keep leading-relaxed mb-5 font-medium">
                            <span className="text-purple-200">먼저 <strong className="text-purple-300 text-base sm:text-lg">지난 5주차를 어떤 상태로 마무리했는지</strong> 팩트 체크부터 해보겠습니다.</span><br />
                        </p>

                        <div className="space-y-3">
                            {[
                                {
                                    tier: '1단계', label: '일반 유저', emoji: '👤',
                                    condition: <><span className="text-yellow-400 font-medium">유니크 풀셋</span></>,
                                    exp: '16,528,300',
                                    level: 'Lv. 64',
                                    sub: '70레벨까지 아직 남았어요',
                                    color: 'from-slate-800/60 to-slate-700/40',
                                    border: 'border-slate-600/50',
                                    badge: 'bg-slate-600 text-slate-200',
                                    lvColor: 'text-slate-200',
                                    subColor: 'text-slate-400',
                                },
                                {
                                    tier: '2단계', label: '일반 유저', emoji: '⚔️',
                                    condition: <><span className="text-yellow-400 font-medium">1단계</span> + <span className="text-green-400 font-bold">카오스 벨룸 ✓</span></>,
                                    exp: '17,028,300',
                                    level: 'Lv. 65',
                                    sub: '70레벨까지 아직 남았어요',
                                    color: 'from-blue-900/40 to-blue-800/20',
                                    border: 'border-blue-500/30',
                                    badge: 'bg-blue-700 text-blue-100',
                                    lvColor: 'text-blue-300',
                                    subColor: 'text-slate-400',
                                },
                                {
                                    tier: '3단계', label: '일반 유저', emoji: '🌟',
                                    condition: <><span className="text-blue-300 font-medium">2단계</span> + <span className="text-orange-300 font-bold">레전드리 결정 1개</span></>,
                                    exp: '17,528,300',
                                    level: 'Lv. 66',
                                    sub: '70레벨까지 아직 남았어요',
                                    color: 'from-purple-900/40 to-purple-800/20',
                                    border: 'border-purple-500/40',
                                    badge: 'bg-purple-700 text-purple-100',
                                    lvColor: 'text-purple-300',
                                    subColor: 'text-slate-400',
                                },
                                {
                                    tier: '4단계', label: '정배 유저', emoji: '💎',
                                    condition: <><span className="text-purple-300 font-medium">3단계</span> + <span className="text-orange-400 font-bold">레전드리 장비 1개</span></>,
                                    exp: '18,228,300',
                                    level: 'Lv. 68',
                                    sub: '70레벨 코앞!',
                                    color: 'from-yellow-900/40 to-amber-800/20',
                                    border: 'border-yellow-500/40',
                                    badge: 'bg-yellow-600 text-yellow-100',
                                    lvColor: 'text-yellow-300',
                                    subColor: 'text-yellow-400',
                                },
                                {
                                    tier: '5단계', label: '상위권 유저', emoji: '👑',
                                    condition: <><span className="text-yellow-300 font-medium">4단계</span> + <span className="text-red-400 font-bold">하드 루시드 격파</span></>,
                                    exp: '18,928,300',
                                    level: 'Lv. 69',
                                    sub: '70레벨 턱밑! (약 66%)',
                                    color: 'from-orange-900/50 to-red-900/30',
                                    border: 'border-orange-400/60',
                                    badge: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
                                    lvColor: 'text-orange-300',
                                    subColor: 'text-orange-400',
                                },
                                {
                                    tier: '6단계', label: '최상위권 유저', emoji: '🔥',
                                    condition: <><span className="text-orange-300 font-medium">5단계</span> + <span className="text-pink-400 font-bold">헬레나 격파 (+110만) + 70레벨 보너스 (+35만)</span></>,
                                    exp: '20,378,300',
                                    level: 'Lv. 72',
                                    sub: '연쇄 폭발 🔥 (약 74%)',
                                    color: 'from-pink-900/50 to-rose-900/30',
                                    border: 'border-pink-400/70',
                                    badge: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
                                    lvColor: 'text-pink-300',
                                    subColor: 'text-pink-400',
                                },
                            ].map((row) => (
                                <div key={row.tier} className={`bg-gradient-to-r ${row.color} border ${row.border} rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4`}>
                                    <span className="text-xl sm:text-2xl shrink-0">{row.emoji}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.badge}`}>{row.tier}</span>
                                            <span className="font-bold text-sm sm:text-base text-white">{row.label}</span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-200 break-keep leading-relaxed">{row.condition}</p>
                                        <p className="text-xs text-slate-400 mt-1">누적 EXP: {row.exp}</p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <p className={`font-black text-lg sm:text-2xl ${row.lvColor}`}>{row.level}</p>
                                        <p className={`text-xs font-bold ${row.subColor}`}>{row.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 팩트 분석 */}
                        <div className="mt-4 bg-indigo-900/30 border border-indigo-500/40 rounded-xl p-3 sm:p-4 text-sm break-keep">
                            <p className="text-indigo-100 font-medium leading-relaxed">
                                💡 <strong className="text-white">5주차 팩트 분석:</strong> 헬레나를 잡은 6단계 유저는 즉시 70레벨이 뚫리면서
                                &apos;70레벨 달성(35만)&apos; 보너스까지 <strong className="text-yellow-300">연쇄 폭발을 일으켜 단숨에 72레벨</strong>까지 치솟습니다!
                            </p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 2. 6주차 예상 레벨 ===== */}
                <section id="core" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center justify-center shrink-0">
                            <Zap className="w-5 h-5 text-red-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-300 leading-tight">
                            🚀 [6주차 예상] 70레벨 대통합과 경험치 폭발!
                        </h2>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-5">
                        {/* 조건 안내 */}
                        <div className="bg-blue-900/30 border border-blue-500/40 rounded-xl p-4 mb-5 text-sm break-keep">
                            <p className="text-blue-100 font-medium leading-relaxed">
                                6주차 주간 숙제 완료 시 <strong className="text-yellow-300">+2,995,075 EXP</strong> 수령 가정<br />
                                <span className="text-blue-200">1~5단계 유저 모두 6주차에 &apos;70레벨 돌파 보너스(+350,000)&apos; 추가 획득!</span>
                            </p>
                        </div>

                        {/* 6주차 티어별 예상 레벨표 */}
                        <p className="font-black text-white text-base sm:text-lg mb-4">📊 티어별 6주차 최종 예상 레벨</p>
                        <div className="overflow-x-auto rounded-xl border border-slate-700 mb-5">
                            <table className="w-full text-[11px] sm:text-sm text-center whitespace-nowrap min-w-[360px]">
                                <thead>
                                    <tr className="bg-slate-700/80 text-slate-200 border-b border-slate-600">
                                        <th className="py-2.5 px-3 text-left font-bold">티어</th>
                                        <th className="py-2.5 px-2 text-purple-300">5주차 마감</th>
                                        <th className="py-2.5 px-2 text-blue-300">6주차 획득 + 70레벨 보너스</th>
                                        <th className="py-2.5 px-2 text-yellow-300">6주차 예상 레벨</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { emoji: '👤', tier: '1단계', prev: 'Lv. 64', gain: '299만 + 35만', result: 'Lv. 71', highlight: false },
                                        { emoji: '⚔️', tier: '2단계', prev: 'Lv. 65', gain: '299만 + 35만', result: 'Lv. 72', highlight: false },
                                        { emoji: '🌟', tier: '3단계', prev: 'Lv. 66', gain: '299만 + 35만', result: 'Lv. 73', highlight: false },
                                        { emoji: '💎', tier: '4단계', prev: 'Lv. 68', gain: '299만 + 35만', result: 'Lv. 75', highlight: false },
                                        { emoji: '👑', tier: '5단계', prev: 'Lv. 69', gain: '299만 + 35만', result: 'Lv. 76', highlight: false },
                                        { emoji: '🔥', tier: '6단계', prev: 'Lv. 72', gain: '299만 (70레벨 보너스 이미수령)', result: 'Lv. 78', highlight: true },
                                    ].map((row, i) => (
                                        <tr key={i} className={`border-b border-slate-700/50 ${row.highlight ? 'bg-pink-900/30' : 'bg-slate-800/40'}`}>
                                            <td className={`py-2.5 px-3 text-left font-bold ${row.highlight ? 'text-pink-300' : 'text-slate-200'}`}>
                                                {row.emoji} {row.tier}
                                            </td>
                                            <td className="py-2.5 px-2 text-purple-300">{row.prev}</td>
                                            <td className="py-2.5 px-2 text-blue-200 text-[10px] sm:text-xs">{row.gain}</td>
                                            <td className={`py-2.5 px-2 font-black text-base ${row.highlight ? 'text-pink-300' : 'text-yellow-300'}`}>
                                                ➡️ {row.result}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 강조 박스 */}
                        <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/40 border-2 border-purple-400/60 rounded-xl p-4 text-sm break-keep">
                            <p className="text-white font-black text-base mb-1">🦋 이번 6주차의 핵심!</p>
                            <p className="text-slate-200 leading-relaxed">
                                단계 구분 없이 <strong className="text-yellow-300">모든 유저가 70레벨 이상</strong>으로 진입하는 대통합의 주간입니다.<br />
                                4단계 악몽의 숲에서 여유롭게 스펙업을 하면서, <strong className="text-pink-300">여력이 된다면 노멀 헬레나 도전</strong>도 해보세요!
                            </p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 3. 80레벨 달성 팩트체크 ===== */}
                <section id="level80" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center shrink-0">
                            <Trophy className="w-5 h-5 text-yellow-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300 leading-tight">
                            ⚖️ [팩트체크] 이번 주 80레벨은 가능할까?
                        </h2>
                    </div>

                    {/* 80레벨 불가 팩트 */}
                    <div className="bg-red-900/30 border-2 border-red-500/50 rounded-2xl p-5 mb-5">
                        <p className="font-black text-red-200 text-base sm:text-lg mb-3">🚨 결론부터</p>
                        <p className="text-white font-black text-xl sm:text-2xl mb-3 break-keep">
                            6주차에 80레벨(악몽의 숲 5단계) 달성은<br />
                            <span className="text-red-400">서버 1위라도 수학적으로 100% 불가능</span>합니다.
                        </p>
                        <div className="space-y-2 text-sm">
                            {[
                                { label: '80레벨 도달 필요 누적 EXP', value: '23,984,400 EXP', color: 'text-white', bg: 'bg-slate-800/60' },
                                { label: '6단계 유저 6주차 최대 누적치', value: '23,373,375 EXP', color: 'text-orange-300', bg: 'bg-orange-900/30' },
                                { label: '부족한 경험치', value: '약 61만 EXP 부족 💀', color: 'text-red-300', bg: 'bg-red-900/40' },
                            ].map((row, i) => (
                                <div key={i} className={`flex items-center justify-between ${row.bg} rounded-lg px-3 py-2`}>
                                    <span className="text-slate-300">{row.label}</span>
                                    <span className={`font-black ${row.color}`}>{row.value}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-red-200 mt-4 text-sm leading-relaxed break-keep">
                            💬 <strong className="text-white">랭커 분들도 이번 6주차에 5단계 숲을 열 수 없으니,</strong> 80레벨에 대한 조급함을 버리고
                            편안하게 <strong className="text-yellow-300">4단계 숲 파밍 + 헬레나 토벌</strong>에만 집중하세요.<br />
                            <strong className="text-green-300">대망의 5단계 숲 오픈은 7주차에 열립니다! 🎉</strong>
                        </p>
                    </div>

                    {/* 티어별 80레벨 달성 예상 시점 */}
                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
                        <p className="font-black text-white text-base sm:text-lg mb-2">📊 [최종 결론] 티어별 80레벨(5단계 숲) 달성 시점</p>
                        <p className="text-xs text-slate-400 mb-4">※ 매주 주간 숙제 풀 달성 & 70레벨 달성 보너스(35만) 획득 기준 / 헬레나 미격파 &apos;순수 숙제&apos; 베이스라인</p>
                        <div className="overflow-x-auto rounded-xl border border-slate-700 mb-4">
                            <table className="w-full text-[10px] sm:text-sm text-center whitespace-nowrap min-w-[420px]">
                                <thead>
                                    <tr className="bg-slate-700/80 text-slate-200 border-b border-slate-600">
                                        <th className="py-2.5 px-2 text-left font-bold">티어</th>
                                        <th className="py-2.5 px-2 text-blue-300">6주차 누적</th>
                                        <th className="py-2.5 px-2 text-purple-300">7주차 누적</th>
                                        <th className="py-2.5 px-2 text-yellow-300">80렙 달성</th>
                                        <th className="py-2.5 px-2 text-slate-300">비고</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { emoji: '🔥', tier: '6단계(+헬레나)', w6: '23,373,375', w7: '26,368,450', when: '✅ 7주차 목요일', note: '접속 후 사냥하면 즉시 돌파!', highlight: true },
                                        { emoji: '👑', tier: '5단계(+루시드)', w6: '22,273,375', w7: '25,268,450', when: '✅ 7주차 중반', note: '7주차 주간 미션 진행 중 무난히 돌파', highlight: false },
                                        { emoji: '💎', tier: '4단계(+레전 장비)', w6: '21,573,375', w7: '24,568,450', when: '✅ 7주차 후반', note: '⚠️ 15판만 5단계 가능', highlight: false },
                                        { emoji: '🌟', tier: '3단계(+레전 결정)', w6: '20,873,375', w7: '23,868,450', when: '❌ 8주차 목요일', note: '🚨 단 115,950 EXP 부족!', highlight: false },
                                        { emoji: '⚔️', tier: '2단계(+벨룸)', w6: '20,373,375', w7: '23,368,450', when: '❌ 8주차 목요일', note: '8주차 접속 후 사냥 진행 중 돌파', highlight: false },
                                        { emoji: '👤', tier: '1단계(유니크 풀셋)', w6: '19,873,375', w7: '22,868,450', when: '❌ 8주차 목요일', note: '8주차 사냥 + 주간 미션 진행 중 돌파', highlight: false },
                                    ].map((row, i) => (
                                        <tr key={i} className={`border-b border-slate-700/50 ${row.highlight ? 'bg-pink-900/20' : 'bg-slate-800/40'}`}>
                                            <td className={`py-2 px-2 text-left font-bold ${row.highlight ? 'text-pink-300' : 'text-slate-200'}`}>{row.emoji} {row.tier}</td>
                                            <td className="py-2 px-2 text-blue-200">{row.w6}</td>
                                            <td className="py-2 px-2 text-purple-200">{row.w7}</td>
                                            <td className={`py-2 px-2 font-black text-xs sm:text-sm ${row.when.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>{row.when}</td>
                                            <td className="py-2 px-2 text-slate-300 text-[10px] sm:text-xs">{row.note}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 7주차 준비 팁 */}
                        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/30 border-2 border-indigo-500/50 rounded-xl p-4 text-sm break-keep">
                            <div className="flex items-center gap-2 mb-2">
                                <Swords className="w-4 h-4 text-indigo-400 shrink-0" />
                                <p className="font-black text-indigo-200 text-base">⚔️ 7주차에 빠르게 5단계를 가고 싶다면?</p>
                            </div>
                            <p className="text-slate-200 leading-relaxed">
                                <strong className="text-yellow-300">루시드까지는 잡는 것을 추천합니다.</strong><br />
                                그 이후에는 스펙업 기간이 충분히 남아있으니, 레벨업과 스펙업을 차근차근 해두고
                                <strong className="text-pink-300"> 여유롭게 헬레나를 도전해도 충분합니다!</strong>
                            </p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 4. 남은 일정 ===== */}
                <section id="schedule" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-sky-500/20 border border-sky-500/50 flex items-center justify-center shrink-0">
                            <Clock className="w-5 h-5 text-sky-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-sky-300 leading-tight">
                            🗓️ 남은 이벤트 주차별 일정 체크
                        </h2>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-5">
                        <p className="text-xs text-slate-400 mb-4">※ 매주 목요일 시작 ~ 수요일 마감 기준</p>

                        <div className="space-y-2">
                            {[
                                { week: '현재', period: '5주차 마감일', date: '4월 22일(수) 오늘!', note: '', isNow: true, isDone: false },
                                { week: '6주차', period: '4월 23일(목) ~ 4월 29일(수)', date: '', note: '70레벨 돌파 및 노멀 헬레나 트라이 주간', isNow: false, isHighlight: true },
                                { week: '7주차', period: '4월 30일(목) ~ 5월 6일(수)', date: '', note: '🎉 대망의 80레벨, 5단계 숲 진입 예상 주간!', isNow: false, isHighlight: true },
                                { week: '8주차', period: '5월 7일(목) ~ 5월 13일(수)', date: '', note: '', isNow: false, isHighlight: false },
                                { week: '9주차', period: '5월 14일(목) ~ 5월 20일(수)', date: '', note: '', isNow: false, isHighlight: false },
                                { week: '10주차', period: '5월 21일(목) ~ 5월 27일(수)', date: '', note: '', isNow: false, isHighlight: false },
                                { week: '11주차', period: '5월 28일(목) ~ 6월 3일(수)', date: '', note: '', isNow: false, isHighlight: false },
                                { week: '12주차', period: '6월 4일(목) ~ 6월 10일(수)', date: '', note: '', isNow: false, isHighlight: false },
                                { week: '13주차', period: '6월 11일(목) ~ 6월 17일(수)', date: '최종 마감!', note: '', isNow: false, isHighlight: false, isFinal: true },
                            ].map((row, i) => (
                                <div key={i} className={`flex items-center gap-3 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border ${
                                    row.isNow ? 'bg-purple-900/40 border-purple-400/60' :
                                    row.isHighlight ? 'bg-yellow-900/30 border-yellow-500/40' :
                                    row.isFinal ? 'bg-red-900/30 border-red-500/40' :
                                    'bg-slate-800/40 border-slate-700/50'
                                }`}>
                                    <span className={`text-xs font-black px-2 py-0.5 rounded-full shrink-0 ${
                                        row.isNow ? 'bg-purple-500 text-white' :
                                        row.isHighlight ? 'bg-yellow-600 text-white' :
                                        row.isFinal ? 'bg-red-600 text-white' :
                                        'bg-slate-600 text-slate-200'
                                    }`}>{row.week}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className={`font-bold text-sm ${
                                            row.isNow ? 'text-purple-200' :
                                            row.isHighlight ? 'text-yellow-200' :
                                            row.isFinal ? 'text-red-200' :
                                            'text-slate-200'
                                        }`}>
                                            {row.period} {row.date && <span className="text-red-400 ml-1">{row.date}</span>}
                                        </p>
                                        {row.note && <p className={`text-xs mt-0.5 ${row.isHighlight ? 'text-yellow-300 font-bold' : 'text-slate-400'}`}>➡️ {row.note}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 bg-green-900/30 border border-green-500/40 rounded-xl p-3 sm:p-4 text-sm break-keep">
                            <p className="text-green-100 font-medium leading-relaxed">
                                💚 앞으로 <strong className="text-white">8주치의 주간 미션 보상(매주 약 300만 EXP)</strong>이 더 남아있습니다.<br />
                                천천히 하시는 일반 유저분들도 <strong className="text-yellow-300">100레벨(나이트메어 헬레나 권장 레벨)</strong>까지
                                충분히 도달할 수 있도록 설계된 아주 넉넉한 일정이니 안심하세요!
                            </p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 5. 결론 ===== */}
                <section id="mental-care" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-green-500/20 border border-green-500/50 flex items-center justify-center shrink-0">
                            <Target className="w-5 h-5 text-green-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-300">💚 [결론] 6주차 이렇게 하면 됩니다!</h2>
                    </div>

                    <div className="bg-gradient-to-r from-green-950/60 to-emerald-900/40 border-2 border-green-500/50 rounded-2xl p-5 sm:p-6 mb-5">
                        <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4 mb-5 text-base sm:text-lg break-keep shadow-inner">
                            <p className="text-green-100 leading-relaxed font-medium">
                                80레벨이니 5단계 숲이니 하는 걱정은 잠시 내려두셔도 됩니다.<br />
                                <strong className="text-white">7주차에 자동으로 모두에게 찾아오게 되어 있습니다! 🎉</strong>
                            </p>
                        </div>

                        {/* 할 일 체크리스트 */}
                        <p className="font-black text-white text-base mb-4">✅ 6주차 필수 행동 요약</p>
                        <div className="space-y-3 mb-6">
                            {[
                                { icon: '🌲', title: '4단계 악몽의 숲 25판 파밍', desc: '유니크 40.5% / 레전드리 1.5% 확률로 장비 획득. 스펙 극대화의 기회!', color: 'border-green-500/40 bg-green-900/20' },
                                { icon: '⚔️', title: '루시드 격파 (5단계 진입 목표 시)', desc: '7주차 빠른 5단계 숲 입장을 원한다면 루시드까지는 잡아두는 것을 추천!', color: 'border-blue-500/40 bg-blue-900/20' },
                                { icon: '👑', title: '노멀 헬레나 도전 (여력이 된다면)', desc: '격파 시 +110만 EXP + 연쇄 보너스. 스펙이 충분하다면 도전해보세요!', color: 'border-yellow-500/40 bg-yellow-900/20' },
                            ].map((item, i) => (
                                <div key={i} className={`flex items-start gap-3 p-3 sm:p-4 rounded-xl border ${item.color}`}>
                                    <span className="text-2xl shrink-0">{item.icon}</span>
                                    <div className="text-sm break-keep">
                                        <p className="font-black text-white mb-1">{item.title}</p>
                                        <p className="text-slate-300 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 마무리 배너 */}
                        <div className="bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-indigo-600/30 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8 text-center mt-6">
                            <p className="text-2xl sm:text-3xl mb-3">🦋</p>
                            <p className="font-black text-xl sm:text-2xl text-white mb-3">6주차 결론</p>
                            <div className="bg-white/10 border border-white/20 rounded-xl p-4 sm:p-5 text-sm sm:text-base text-white break-keep leading-relaxed font-medium inline-block max-w-2xl w-full">
                                <strong className="text-green-300">4단계 악몽의 숲 25판 파밍</strong>으로 스펙을 올리고,<br />
                                <strong className="text-yellow-300">여력이 된다면 노멀 헬레나</strong>에도 도전해보세요!<br />
                                <strong className="text-pink-300">5단계 숲은 7주차에 안전하게 오픈됩니다. 조급해하지 마세요! 🎉</strong>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* CTA */}
                <section className="mb-8">
                    <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border-2 border-purple-500/50 rounded-xl p-4 sm:p-8 text-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">체인지 버닝: 루시드 이전 주차 공략</h3>
                        <p className="text-sm sm:text-base text-slate-100 mb-6 break-keep">
                            이전 주차 공략도 함께 확인해보세요!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/blog/change-burning-lucid-week5-guide">
                                <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold rounded-xl transition-all shadow-xl hover:-translate-y-1">
                                    🦋 5주차 공략 보기
                                </button>
                            </Link>
                            <Link href="/blog/change-burning-lucid-week4-guide">
                                <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-bold rounded-xl transition-all hover:-translate-y-1">
                                    🦋 4주차 공략 보기
                                </button>
                            </Link>
                            <Link href="/blog/change-burning-lucid-week3-guide">
                                <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-bold rounded-xl transition-all hover:-translate-y-1">
                                    🦋 3주차 공략 보기
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* SEO Keywords */}
                <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-wrap gap-x-4 gap-y-2 justify-center">
                    {[
                        '체인지버닝루시드', '루시드6주차', '메이플23주년', '루시드이벤트',
                        '몽환의시련', '악몽의숲4단계', '드림이터', '헬레나보스', '헬레나패턴',
                        '루시드공략', '루시드70레벨', '루시드80레벨', '루시드6주차공략',
                        '메이플이벤트공략', '루시드변신', '체인지버닝', '노멀헬레나',
                        '나이트메어헬레나', '루시드격파', '악몽의숲5단계',
                        '루시드6주차티어', '70레벨대통합', '5단계악몽의숲', '7주차80레벨',
                    ].map((keyword) => (
                        <span key={keyword} className="text-slate-500 text-xs sm:text-sm hover:text-purple-400 transition-colors cursor-default">#{keyword}</span>
                    ))}
                </div>
            </main>
        </div>
    );
}
