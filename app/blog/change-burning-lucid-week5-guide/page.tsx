'use client';

import Link from 'next/link';
import { Calendar, ArrowLeft, AlertCircle, Star, ChevronRight, Target, Gift, Swords, Zap, Trophy, AlertTriangle } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function ChangeBurningLucidWeek5GuidePage() {
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
                        <span className="text-sm sm:text-base text-slate-300">2026년 4월 17일</span>
                        <span className="text-slate-500">|</span>
                        <span className="text-xs sm:text-sm text-purple-400 font-medium">이벤트 가이드</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight flex flex-col sm:gap-1">
                        <div>
                            <span className="text-2xl sm:text-3xl mr-1 sm:mr-2">🦋</span>
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                                체인지 버닝: 루시드 5주차
                            </span>
                        </div>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent pl-2 sm:pl-[42px]">
                            이번 주는 편안하게 악몽의 숲 4단계로!
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-slate-100 mb-6 leading-relaxed break-keep">
                        이번 주 공략의 핵심은 단 하나, <strong className="text-white">&apos;모두가 악몽의 숲 4단계를 간다&apos;</strong>는 것입니다. 
                        단, 어떤 순서로 진입하느냐에 따라 <strong className="text-pink-300">유니크 40.5%의 혜택을 온전히 누릴지</strong>, 
                        아니면 또 입장권을 날려먹을지가 결정됩니다.
                    </p>

                    {/* 핵심 CTA 배너 */}
                    <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-2 border-green-500/70 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 shadow-xl shadow-green-900/30">
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-black text-green-300 text-base sm:text-lg mb-1">✅ 5주차 핵심 한 줄 요약</p>
                            <p className="text-sm sm:text-base text-green-100 break-keep">
                                사냥 먼저 끝내고 → 60레벨 확인 → <strong className="text-white underline">악몽의 숲 4단계 25판!</strong>
                                <br />
                                <span className="text-green-200 text-xs sm:text-sm">완벽한 동선 가이드를 지금 시작합니다!</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* 목차 */}
                <nav className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-5 mb-10">
                    <p className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">목차</p>
                    <ul className="space-y-2 text-sm sm:text-base">
                        {[
                            { href: '#tier-check', label: '[현점검] 4주차 마무리 스펙별 내 레벨은?', icon: '📊' },
                            { href: '#core', label: '[5주차의 핵심] 이번 주는 모두 악몽의 숲 4단계 진입!', icon: '🚨' },
                            { href: '#npc-reward', label: '4월 15일(수)까지! NPC 운영자 오류 보상 필수 수령', icon: '🎁' },
                            { href: '#helena', label: '상위 0.01%: 과연 70레벨을 찍을 수 있을까? (헬레나 정보)', icon: '👑' },
                            { href: '#mental-care', label: '[일반 유저] 이번 주는 편안하게 4단계 돌면 끝!', icon: '💚' },
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

                {/* ===== 1. 4주차 마무리 스펙별 레벨 ===== */}
                <section id="tier-check" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center shrink-0">
                            <Star className="w-5 h-5 text-purple-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-300">[현재점검] 4주차 마무리 스펙별 내 레벨은? 📊</h2>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-5">
                        <p className="text-sm sm:text-base text-slate-200 break-keep leading-relaxed mb-5 font-medium">
                            <span className="text-purple-200">먼저 <strong className="text-purple-300 text-base sm:text-lg">지난 4주차를 어떤 상태로 마무리했는지</strong> 팩트 체크부터 해보겠습니다.</span><br />
                            <span className="text-slate-400 text-xs sm:text-sm">※ 운(RNG) 요소를 뺀 순수 확정 숙제 완료 기준</span>
                        </p>

                        <div className="space-y-3">
                            {[
                                {
                                    tier: '1단계', label: '일반 유저', emoji: '👤',
                                    condition: <><span className="text-yellow-400 font-medium">유니크 풀셋</span></>,
                                    level: 'Lv. 57',
                                    sub: '약 119만 EXP 부족',
                                    color: 'from-slate-800/60 to-slate-700/40',
                                    border: 'border-slate-600/50',
                                    badge: 'bg-slate-600 text-slate-200',
                                    lvColor: 'text-slate-200',
                                    subColor: 'text-red-400',
                                    locked: true,
                                },
                                {
                                    tier: '2단계', label: '상위권 정배', emoji: '⚔️',
                                    condition: <><span className="text-yellow-400 font-medium">유니크 풀셋</span> + <span className="text-green-400 font-bold">카벨 ✓</span></>,
                                    level: 'Lv. 58',
                                    sub: '약 69만 EXP 부족',
                                    color: 'from-blue-900/40 to-blue-800/20',
                                    border: 'border-blue-500/30',
                                    badge: 'bg-blue-700 text-blue-100',
                                    lvColor: 'text-blue-300',
                                    subColor: 'text-red-400',
                                    locked: true,
                                },
                                {
                                    tier: '3단계', label: '선발대', emoji: '🌟',
                                    condition: <><span className="text-blue-300 font-medium">2단계</span> + <span className="text-orange-300 font-bold">레전드리 결정 1개</span></>,
                                    level: 'Lv. 59',
                                    sub: '약 19만 EXP 부족',
                                    color: 'from-purple-900/40 to-purple-800/20',
                                    border: 'border-purple-500/40',
                                    badge: 'bg-purple-700 text-purple-100',
                                    lvColor: 'text-purple-300',
                                    subColor: 'text-red-400',
                                    locked: true,
                                },
                                {
                                    tier: '4단계', label: '상위 1%', emoji: '💎',
                                    condition: <><span className="text-purple-300 font-medium">3단계</span> + <span className="text-orange-400 font-bold">레전드리 장비 1개</span></>,
                                    level: 'Lv. 61',
                                    sub: '이미 60 돌파! ✅',
                                    color: 'from-yellow-900/40 to-amber-800/20',
                                    border: 'border-yellow-500/40',
                                    badge: 'bg-yellow-600 text-yellow-100',
                                    lvColor: 'text-yellow-300',
                                    subColor: 'text-green-400',
                                    locked: false,
                                },
                                {
                                    tier: '5단계', label: '0.01% 천상계', emoji: '👑',
                                    condition: <><span className="text-yellow-300 font-medium">4단계</span> + <span className="text-red-400 font-bold">루시드 격파</span></>,
                                    level: 'Lv. 62',
                                    sub: '이미 60 돌파! ✅',
                                    color: 'from-orange-900/50 to-red-900/30',
                                    border: 'border-orange-400/60',
                                    badge: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
                                    lvColor: 'text-orange-300',
                                    subColor: 'text-green-400',
                                    locked: false,
                                },
                            ].map((row) => (
                                <div key={row.tier} className={`bg-gradient-to-r ${row.color} border ${row.border} rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4`}>
                                    <span className="text-xl sm:text-2xl shrink-0">{row.emoji}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.badge}`}>{row.tier}</span>
                                            <span className="font-bold text-sm sm:text-base text-white">{row.label}</span>
                                            {row.locked && <span className="text-xs bg-red-900/60 border border-red-500/40 text-red-300 px-2 py-0.5 rounded-full font-bold">🔒 4단계 잠김</span>}
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-200 break-keep leading-relaxed">{row.condition}</p>
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
                                💡 <strong className="text-white">팩트 분석:</strong> <strong className="text-yellow-300">4단계, 5단계 최상위권 유저를 제외한 대부분의 유저(1~3단계)</strong>는 아직 60레벨에 도달하지 못해 악몽의 숲 4단계가 잠겨있는 상태입니다.
                            </p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 2. 5주차의 핵심 ===== */}
                <section id="core" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center justify-center shrink-0">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-300 leading-tight">
                            [5주차의 핵심] 이번 주는 모두<br />
                            악몽의 숲 4단계 진입! 🚨
                        </h2>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-5">
                        {/* 핵심 설명 */}
                        <div className="bg-green-900/30 border border-green-500/40 rounded-xl p-4 mb-5 text-sm sm:text-base break-keep">
                            <p className="text-green-100 font-medium leading-relaxed">
                                걱정하지 마세요! 이번 주 목요일 접속 시, <strong className="text-white">&apos;드림 이터 25,000마리 사냥&apos;</strong> 하나만 완료해도 
                                사냥 획득량과 주간 미션 보상을 합쳐 약 <strong className="text-yellow-300 text-base">229만 EXP</strong>가 확정적으로 들어옵니다.
                            </p>
                            <p className="text-green-200 font-black text-base sm:text-lg mt-2">
                                👉 즉, 1~3단계 유저 모두 사냥만 끝내면 무조건 60레벨을 돌파하게 됩니다!
                            </p>
                        </div>

                        {/* 올바른 동선 vs 망하는 동선 */}
                        <p className="font-black text-white text-base sm:text-lg mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                            ⚠️ [경고] 1~3단계 유저 필수 주의사항
                        </p>
                        <p className="text-sm sm:text-base text-red-200 mb-4 break-keep font-medium">
                            접속하자마자 습관적으로 <strong className="text-white underline">&apos;악몽의 숲&apos; 입장 버튼부터 누르지 마세요!</strong>
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                            {/* 올바른 동선 */}
                            <div className="bg-green-900/40 border-2 border-green-500/60 rounded-2xl p-4">
                                <p className="font-black text-green-300 text-base mb-3 flex items-center gap-2">
                                    <span className="text-xl">✅</span> 올바른 동선
                                </p>
                                <div className="space-y-2 text-sm break-keep">
                                    {[
                                        { step: '1', text: '필드 사냥 먼저 완료', color: 'text-green-200' },
                                        { step: '2', text: '60레벨 달성 확인', color: 'text-green-200' },
                                        { step: '3', text: '악몽의 숲 4단계 입장', color: 'text-green-200', bold: true },
                                        { step: '', text: '유니크 40.5% 파밍 🎉', color: 'text-yellow-300', bold: true },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            {item.step && <span className="w-5 h-5 rounded-full bg-green-500 text-white text-xs font-black flex items-center justify-center shrink-0">{item.step}</span>}
                                            {!item.step && <span className="w-5 h-5 shrink-0" />}
                                            <p className={`${item.color} ${item.bold ? 'font-black' : 'font-medium'}`}>{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 망하는 동선 */}
                            <div className="bg-red-900/40 border-2 border-red-500/60 rounded-2xl p-4">
                                <p className="font-black text-red-300 text-base mb-3 flex items-center gap-2">
                                    <span className="text-xl">❌</span> 망하는 동선
                                </p>
                                <div className="space-y-2 text-sm break-keep">
                                    {[
                                        { step: '1', text: '악몽의 숲부터 입장', color: 'text-red-200' },
                                        { step: '2', text: '3단계 보상(유니크 15%) 수령', color: 'text-red-200' },
                                        { step: '3', text: '입장권 낭비 대참사 💀', color: 'text-red-300', bold: true },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <span className="w-5 h-5 rounded-full bg-red-600 text-white text-xs font-black flex items-center justify-center shrink-0">{item.step}</span>
                                            <p className={`${item.color} ${item.bold ? 'font-black' : 'font-medium'}`}>{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 핵심 强調 박스 */}
                        <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/40 border-2 border-purple-400/60 rounded-xl p-4 text-sm break-keep">
                            <p className="text-white font-black text-base mb-1">🦋 루시드 60레벨 전 무조건 선(先) 사냥!</p>
                            <p className="text-slate-200 leading-relaxed">
                                이미 60레벨 이상을 찍으신 <strong className="text-yellow-300">4~5단계 유저분들</strong>은 접속하자마자 편안하게 악몽의 숲 4단계부터 도셔도 무방합니다.<br />
                                <span className="text-slate-400 text-xs mt-1 block">※ 참고로 이번 주에 영혼을 끌어모아도 최종 80레벨 5단계 진입은 수학적으로 불가능합니다.</span>
                            </p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 3. NPC 운영자 보상 ===== */}
                <section id="npc-reward" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center shrink-0">
                            <Gift className="w-5 h-5 text-amber-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-300 leading-tight">
                            🎁 4월 15일(수)까지 NPC 운영자 보상<br />
                            꼭 받으세요!
                        </h2>
                    </div>

                    <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/30 border-2 border-amber-500/60 rounded-2xl p-5 sm:p-6 mb-5">
                        <div className="bg-amber-900/40 border border-amber-600/50 rounded-xl p-4 mb-5 text-sm sm:text-base break-keep">
                            <p className="text-amber-100 font-medium leading-relaxed">
                                바로 오늘, <strong className="text-white">4월 15일(수) 자정 전까지</strong> NPC 운영자가 
                                <strong className="text-yellow-300"> [체인지 버닝 : 루시드 오류 보상]</strong>을 뿌립니다.<br />
                                <span className="text-slate-400 text-xs mt-1 block">깜빡하고 날려먹으면 스펙과 경험치 모두 엄청난 손해!</span>
                            </p>
                        </div>

                        {/* 보상 목록 */}
                        <div className="space-y-3 mb-5">
                            <p className="font-bold text-amber-200 text-sm mb-2">🎁 확정 보상 목록</p>
                            {[
                                {
                                    icon: '🔮', title: '몽환의 결정 선택 상자 (레전드리) 2개',
                                    desc: '크리티컬 데미지 or 스킬 재사용 감소 중 선택 추천',
                                    highlight: true,
                                },
                                {
                                    icon: '🌲', title: '악몽의 숲 입장권',
                                    desc: '추가 파밍 기회!',
                                    highlight: false,
                                },
                            ].map((item, i) => (
                                <div key={i} className={`flex items-start gap-3 p-3 sm:p-4 rounded-xl border ${item.highlight ? 'bg-yellow-900/30 border-yellow-500/40' : 'bg-slate-800/60 border-slate-600/50'}`}>
                                    <span className="text-2xl shrink-0">{item.icon}</span>
                                    <div className="text-sm break-keep">
                                        <p className={`font-black mb-1 ${item.highlight ? 'text-yellow-200' : 'text-white'}`}>{item.title}</p>
                                        <p className="text-slate-300 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 치트키 설명 */}
                        <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/30 border-2 border-green-500/50 rounded-xl p-4 text-sm break-keep">
                            <p className="text-green-100 font-medium leading-relaxed">
                                🏆 이 보상은 스펙업은 물론이고, 시즌 미션인 <strong className="text-yellow-300">&apos;몽환의 결정(레전드리) 획득 (500,000 EXP)&apos;</strong>을 
                                <strong className="text-white"> 공짜로 깨게 해주는 치트키</strong>입니다!
                            </p>
                        </div>

                        <div className="bg-blue-900/30 border border-blue-500/40 rounded-xl p-3 mt-3 text-xs sm:text-sm text-blue-200 break-keep">
                            💡 <strong className="text-white">선택 Tip:</strong> 후반으로 갈수록 <strong className="text-yellow-300">크리티컬 데미지</strong>와 <strong className="text-yellow-300">쿨타임 감소</strong>의 효율이 좋으니 이 중 선택을 추천합니다.
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 4. 상위 0.01% — 70레벨 & 헬레나 ===== */}
                <section id="helena" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center shrink-0">
                            <Trophy className="w-5 h-5 text-yellow-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300 leading-tight">
                            👑 상위 0.01%는 과연 70레벨을<br />
                            찍을 수 있을까? (+ 헬레나 정보)
                        </h2>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-5">
                        <p className="text-sm sm:text-base text-white break-keep leading-relaxed mb-4 font-medium">
                            4주차를 <strong className="text-orange-300">62레벨 부근</strong>에서 마감한 최상위권 5단계 유저들. 
                            과연 이분들은 이번 주에 <strong className="text-yellow-300">&apos;70레벨 달성 시즌 미션(35만 EXP)&apos;</strong>을 터뜨릴 수 있을까요?
                        </p>

                        {/* 70레벨 계산 결과 */}
                        <div className="bg-red-900/30 border-2 border-red-500/40 rounded-xl p-4 mb-5 text-sm break-keep">
                            <p className="font-black text-red-200 text-base mb-2">📊 5주차 풀 숙제 완료 시 시뮬레이션</p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between bg-slate-800/60 rounded-lg px-3 py-2">
                                    <span className="text-slate-300">5주차 주간 숙제 풀 완료 시 누적 EXP</span>
                                    <span className="font-black text-white">18,928,300</span>
                                </div>
                                <div className="flex items-center justify-between bg-red-900/40 rounded-lg px-3 py-2">
                                    <span className="text-red-200 font-bold">예상 도달 레벨</span>
                                    <span className="font-black text-red-300 text-lg">Lv. 69 중후반 (약 66%)</span>
                                </div>
                            </div>
                            <p className="text-red-200 mt-3 leading-relaxed">
                                🚨 숙제만으로는 <strong className="text-white">아슬아슬하게 70레벨 미달!</strong> 
                                이번 주 70레벨을 찍으려면 반드시 <strong className="text-yellow-300">헬레나(노멀/나이트메어)</strong>를 잡아 
                                시즌 미션(<strong className="text-white">+110만 EXP</strong>)을 챙겨야만 합니다.
                            </p>
                        </div>

                        {/* 헬레나 스펙 정보 */}
                        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/30 border-2 border-indigo-500/50 rounded-2xl p-5 mb-5">
                            <div className="flex items-center gap-3 mb-4">
                                <Swords className="w-5 h-5 text-indigo-400 shrink-0" />
                                <p className="font-black text-indigo-200 text-base sm:text-lg">⚔️ [신규 보스] 헬레나 기본 스펙 정보</p>
                            </div>

                            <div className="space-y-3 mb-4">
                                {[
                                    {
                                        name: '노멀 헬레나',
                                        level: '75레벨',
                                        hp: '체력 1조 5,000억',
                                        color: 'from-blue-900/40 to-indigo-900/30',
                                        border: 'border-blue-500/40',
                                        lvColor: 'text-blue-300',
                                        note: null,
                                    },
                                    {
                                        name: '나이트메어 헬레나',
                                        level: '100레벨',
                                        hp: '체력 3조 3,000억',
                                        color: 'from-red-900/50 to-orange-900/30',
                                        border: 'border-red-500/50',
                                        lvColor: 'text-red-300',
                                        note: '마지막 3단계 패턴 실패 시 체력 추가 증가',
                                    },
                                ].map((boss) => (
                                    <div key={boss.name} className={`bg-gradient-to-r ${boss.color} border ${boss.border} rounded-xl p-3 sm:p-4`}>
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className="font-black text-white text-sm sm:text-base">{boss.name}</span>
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-slate-700 ${boss.lvColor}`}>{boss.level}</span>
                                        </div>
                                        <p className="text-slate-100 text-sm font-bold">{boss.hp}</p>
                                        {boss.note && (
                                            <p className="text-xs text-slate-400 mt-1">※ {boss.note}</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-3 text-xs sm:text-sm text-slate-300 break-keep">
                                <p>⚠️ 각 헬레나와 <strong className="text-white">레벨이 동일해야</strong> 레벨 패널티를 받지 않습니다. 레벨이 낮을수록 최종 데미지가 감소합니다.</p>
                            </div>
                        </div>

                        {/* 팩트 체크: 헬레나 잡을 수 있나? */}
                        <div className="bg-red-900/30 border border-red-500/40 rounded-xl p-4 mb-4 text-sm break-keep">
                            <p className="font-black text-red-200 text-base mb-2">🚨 팩트 체크: 헬레나, 잡을 수 있나?</p>
                            <p className="text-white font-black text-lg mb-2">결론: 이번 주 헬레나 토벌은 사실상 매우 어렵습니다.</p>
                            <p className="text-red-100 leading-relaxed">
                                체력통과 패턴이 기존 루시드와는 궤를 달리하는 수준으로 설계되어 있어, 현재 4단계 숲에서 유니크/레전드리를 갓 파밍하는 스펙으로는 
                                <strong className="text-white"> 1조 5천억이라는 딜을 우겨넣기 부족</strong>할 것으로 예상합니다.
                            </p>
                        </div>

                        {/* 유튜브 링크 */}
                        <a
                            href="https://youtu.be/zeZi61iO0J0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mb-4"
                        >
                            <div className="bg-gradient-to-r from-red-800/40 to-rose-900/30 border-2 border-red-500/50 rounded-xl p-4 hover:border-red-400/80 hover:from-red-700/50 transition-all group">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">▶️</span>
                                    <div>
                                        <p className="font-black text-white text-sm sm:text-base group-hover:text-red-300 transition-colors">헬레나 정보 및 패턴 정리 영상</p>
                                        <p className="text-red-400 text-xs sm:text-sm">youtu.be/zeZi61iO0J0</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-red-400 ml-auto shrink-0 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </a>

                        {/* 추천 전략 */}
                        <div className="bg-indigo-900/30 border border-indigo-500/40 rounded-xl p-4 text-sm break-keep">
                            <p className="text-indigo-100 leading-relaxed">
                                💬 랭커 분들도 이번 주 헬레나 트라이에 너무 스트레스 받지 마시고, 
                                <strong className="text-white"> 다음 주 6주차에 4단계 숲 파밍으로 스펙업을 더 한 뒤 &apos;노멀 헬레나&apos;부터 안전하게 도전</strong>하는 것을 추천합니다.
                            </p>
                        </div>
                    </div>

                    {/* 번외: 헬레나 격파 시 연쇄 보상 */}
                    <div className="bg-gradient-to-r from-orange-900/50 to-red-900/30 border-2 border-orange-500/60 rounded-2xl p-5 sm:p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <Zap className="w-5 h-5 text-orange-400 shrink-0" />
                            <h3 className="font-bold text-lg sm:text-xl text-orange-200">🔥 [번외] 만약 이번 주에 헬레나(노멀)를 잡는다면?</h3>
                        </div>

                        <p className="text-sm sm:text-base text-white break-keep leading-relaxed mb-5 font-medium">
                            기어코 헬레나를 잡아버린 &apos;초&apos;천상계 유저가 있다면, 다음과 같은 기적의 연쇄 폭발이 일어납니다!
                        </p>

                        <div className="space-y-3 mb-5">
                            {[
                                {
                                    step: '1',
                                    title: '헬레나 격파 시즌 미션 완료',
                                    value: '+1,100,000 EXP 획득',
                                    color: 'from-orange-900/50 to-amber-900/30',
                                    border: 'border-orange-500/50',
                                },
                                {
                                    step: '2',
                                    title: '경험치 합산 (18,928,300 + 1,100,000)',
                                    value: '즉시 70레벨 돌파! 🎉',
                                    color: 'from-yellow-900/50 to-orange-900/30',
                                    border: 'border-yellow-500/50',
                                },
                                {
                                    step: '3',
                                    title: '70레벨 달성 시즌 미션 자동 완료',
                                    value: '+350,000 EXP 추가 연쇄 획득',
                                    color: 'from-green-900/40 to-emerald-900/30',
                                    border: 'border-green-500/50',
                                },
                            ].map((item) => (
                                <div key={item.step} className={`bg-gradient-to-r ${item.color} border ${item.border} rounded-xl p-3 sm:p-4 flex items-center gap-3`}>
                                    <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-black text-base flex items-center justify-center shrink-0">{item.step}</span>
                                    <div className="flex-1 min-w-0 text-sm break-keep">
                                        <p className="text-slate-200">{item.title}</p>
                                        <p className="font-black text-yellow-300 text-base">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 최종 결과 */}
                        <div className="bg-gradient-to-r from-yellow-900/60 to-amber-900/50 border-2 border-yellow-400/70 rounded-xl p-4 sm:p-5 text-center">
                            <p className="font-black text-yellow-300 text-xl sm:text-2xl mb-1">최종 도달 레벨</p>
                            <p className="font-black text-white text-3xl sm:text-4xl mb-3">Lv. 72 (약 74%)</p>
                            <p className="text-sm sm:text-base text-amber-100 break-keep leading-relaxed">
                                헬레나 한 마리를 잡았을 뿐인데, 연쇄 작용으로 단숨에 <strong className="text-white">72레벨까지 치솟아 오릅니다!</strong><br />
                                랭커 분들은 이 압도적인 리턴을 위해 스펙업 효율을 최대한 끌어올려 트라이를 고민해 보시길 바랍니다.
                            </p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 5. 일반 유저 힐링 주간 ===== */}
                <section id="mental-care" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-green-500/20 border border-green-500/50 flex items-center justify-center shrink-0">
                            <Target className="w-5 h-5 text-green-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-300">💚 [일반 유저] 이번 주는 편안하게 악몽의 숲 4단계 돌면 끝!</h2>
                    </div>

                    <div className="bg-gradient-to-r from-green-950/60 to-emerald-900/40 border-2 border-green-500/50 rounded-2xl p-5 sm:p-6 mb-5">
                        <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4 mb-5 text-base sm:text-lg break-keep shadow-inner">
                            <p className="text-green-100 leading-relaxed font-medium">
                                대부분의 유저분들! <strong className="text-white">헬레나 최소컷이니 70레벨이니</strong> 하는 복잡한 이야기는 랭커분들께 맡겨두셔도 좋습니다.
                            </p>
                        </div>

                        <div className="text-center mb-8">
                            <p className="text-xl sm:text-2xl font-black text-white mb-3 break-keep">
                                🌲 이번 5주차는 <span className="text-green-300">&quot;힐링 주간&quot;</span>입니다!
                            </p>
                            <p className="text-sm sm:text-base text-slate-200 break-keep">
                                우리 모두 사이좋게 4단계 악몽의 숲에서 쏟아지는 <strong className="text-yellow-300">유니크 장비(40.5%)</strong>를 파밍하며<br />
                                편안하게 스펙을 올리는 한 주를 보내요!
                            </p>
                        </div>

                        {/* 확률표 */}
                        <div>
                            <p className="font-bold text-green-300 mb-3 flex items-center gap-2 text-sm">🌲 악몽의 숲 단계별 장비 획득 확률표</p>
                            <div className="overflow-x-auto rounded-xl border border-slate-700 mb-5 pb-2">
                                <table className="w-full text-[11px] sm:text-sm text-center whitespace-nowrap min-w-[320px]">
                                    <thead>
                                        <tr className="bg-slate-700/80 text-slate-200 border-b border-slate-600">
                                            <th className="py-2.5 px-3 text-left font-bold">단계</th>
                                            <th className="py-2.5 px-2 text-gray-400">노멀</th>
                                            <th className="py-2.5 px-2 text-blue-300">레어</th>
                                            <th className="py-2.5 px-2 text-purple-300">에픽</th>
                                            <th className="py-2.5 px-2 text-yellow-300">유니크</th>
                                            <th className="py-2.5 px-2 text-orange-300">레전드리</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { stage: '1단계', normal: '55.000%', rare: '40.000%', epic: '4.350%', unique: '0.649%', legend: '0.001%', highlight: false },
                                            { stage: '2단계', normal: '10.000%', rare: '55.000%', epic: '33.000%', unique: '1.998%', legend: '0.002%', highlight: false },
                                            { stage: '3단계', normal: '—', rare: '19.000%', epic: '65.000%', unique: '15.000%', legend: '1.000%', highlight: false },
                                            { stage: '4단계 ⭐', normal: '—', rare: '3.000%', epic: '55.000%', unique: '40.500%', legend: '1.500%', highlight: true },
                                            { stage: '5단계', normal: '—', rare: '—', epic: '44.000%', unique: '52.000%', legend: '4.000%', highlight: false },
                                        ].map((row, i) => (
                                            <tr key={i} className={`border-b border-slate-700/50 ${row.highlight ? 'bg-yellow-900/30' : 'bg-slate-800/40'}`}>
                                                <td className={`py-2.5 px-3 text-left font-bold ${row.highlight ? 'text-yellow-300' : 'text-slate-200'}`}>{row.stage}</td>
                                                <td className="py-2.5 px-2 text-gray-500">{row.normal}</td>
                                                <td className="py-2.5 px-2 text-blue-300">{row.rare}</td>
                                                <td className="py-2.5 px-2 text-purple-300">{row.epic}</td>
                                                <td className={`py-2.5 px-2 font-black ${row.highlight ? 'text-yellow-300 text-base' : 'text-yellow-400'}`}>{row.unique}</td>
                                                <td className="py-2.5 px-2 text-orange-300">{row.legend}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 최종 동선 요약 */}
                        <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-4 sm:p-5 flex items-start gap-3">
                            <span className="text-2xl shrink-0">✅</span>
                            <div className="text-sm sm:text-base break-keep">
                                <p className="font-black text-white mb-2">알려드린 동선대로만 하세요!</p>
                                <p className="text-slate-200 leading-relaxed">
                                    <strong className="text-green-300">[선 사냥 → 60레벨 달성 → 악몽의 숲 4단계 25판 완료]</strong>만 깔끔하게 끝내시고 꿀잠 주무시면 됩니다.<br />
                                    그럼 우리 모두 <strong className="text-yellow-300">60레벨 중반대에서 6주차를 여유롭게 맞이</strong>할 수 있습니다!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 마무리 배너 */}
                    <div className="bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-indigo-600/30 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8 text-center mt-8">
                        <p className="text-2xl sm:text-3xl mb-3">🦋</p>
                        <p className="font-black text-xl sm:text-2xl text-white mb-3">5주차 결론</p>
                        <div className="bg-white/10 border border-white/20 rounded-xl p-4 sm:p-5 text-sm sm:text-base text-white break-keep leading-relaxed font-medium inline-block max-w-2xl w-full">
                            오늘 꼭 <strong className="text-amber-300">NPC 운영자 오류 보상(4/15 자정 전)</strong>을 받고,<br />
                            사냥 먼저 끝내고 60레벨 찍은 뒤<br />
                            <strong className="text-green-300">악몽의 숲 4단계 25판 편안하게!</strong>
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
                            <Link href="/blog/change-burning-lucid-week4-guide">
                                <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold rounded-xl transition-all shadow-xl hover:-translate-y-1">
                                    🦋 4주차 공략 보기
                                </button>
                            </Link>
                            <Link href="/blog/change-burning-lucid-week3-guide">
                                <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-bold rounded-xl transition-all hover:-translate-y-1">
                                    🦋 3주차 공략 보기
                                </button>
                            </Link>
                            <Link href="/blog/change-burning-lucid-week2-guide">
                                <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-bold rounded-xl transition-all hover:-translate-y-1">
                                    🦋 2주차 공략 보기
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* SEO Keywords */}
                <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-wrap gap-x-4 gap-y-2 justify-center">
                    {[
                        '체인지버닝루시드', '루시드5주차', '메이플23주년', '루시드이벤트',
                        '몽환의시련', '악몽의숲4단계', '드림이터', '헬레나보스', '헬레나패턴',
                        '루시드공략', '루시드60레벨', '루시드70레벨', '루시드5주차공략',
                        '메이플이벤트공략', '루시드변신', '체인지버닝', '악몽의숲유니크',
                        '노멀헬레나', '나이트메어헬레나', '루시드격파', '악몽의숲40.5%',
                        '4단계악몽의숲', '루시드오류보상', '몽환의결정레전드리', '운영자보상',
                    ].map((keyword) => (
                        <span key={keyword} className="text-slate-500 text-xs sm:text-sm hover:text-purple-400 transition-colors cursor-default">#{keyword}</span>
                    ))}
                </div>
            </main>
        </div>
    );
}
