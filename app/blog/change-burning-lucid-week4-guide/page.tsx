'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, AlertCircle, Gem, RefreshCw, Star, Zap, ChevronRight, HelpCircle, Target, Swords, Crown, Trophy } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function ChangeBurningLucidWeek4GuidePage() {
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
                        <span className="text-sm sm:text-base text-slate-300">2026년 4월 10일</span>
                        <span className="text-slate-500">|</span>
                        <span className="text-xs sm:text-sm text-purple-400 font-medium">이벤트 가이드</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight flex flex-col sm:gap-1">
                        <div>
                            <span className="text-2xl sm:text-3xl mr-1 sm:mr-2">🦋</span>
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                                체인지 버닝: 루시드 4주차
                            </span>
                        </div>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent pl-2 sm:pl-[42px]">
                            60레벨의 벽과 4단계 던전의 진실!
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-slate-100 mb-6 leading-relaxed break-keep">
                        이번 주는 유저 간의 스펙 격차가 가장 드라마틱하게 벌어지는 <strong className="text-white">&apos;운명의 주간&apos;</strong>입니다. 과연 나는 이번 주 목요일 접속하자마자 <strong className="text-pink-300">60레벨(4단계 악몽의 숲)을 뚫고 25판을 꽉 채워</strong> 파밍할 수 있을까요? 현재 유저 상황별로 단계를 나눠 완벽하게 정리해 드립니다!
                    </p>

                    {/* 긴급 CTA 배너 */}
                    <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 border-2 border-amber-500/70 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 shadow-xl shadow-amber-900/30">
                        <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-black text-amber-300 text-base sm:text-lg mb-1">⚠️ 4주차 핵심 체크!</p>
                            <p className="text-sm sm:text-base text-amber-100 break-keep">
                                4주차는 스펙에 따라 이번 주 바로 <strong className="text-white underline">60레벨(4단계)</strong>을 뚫느냐, 5주차를 기다리느냐가 갈립니다.<br />
                                내 티어를 정확히 파악하고 최선의 플랜을 세우세요!
                            </p>
                        </div>
                    </div>
                </div>

                {/* 목차 */}
                <nav className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-5 mb-10">
                    <p className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">목차</p>
                    <ul className="space-y-2 text-sm sm:text-base">
                        {[
                            { href: '#tier-check', label: '[현점검] 3주차 마무리 스펙별 내 레벨은?', icon: '📊' },
                            { href: '#lv60-check', label: '[4주차의 핵심] 사냥만으로 60레벨 즉시 진입 가능할까?', icon: '🚨' },
                            { href: '#edge-cases', label: '[번외편] 레전드리 없이 루시드 잡았다면? 변수 체크', icon: '🔍' },
                            { href: '#master-plan', label: '상위 0.01% 특권을 위한 마스터 플랜', icon: '👑' },
                            { href: '#mental-care', label: '[일반 유저] 조급함 NO! 멘탈 케어 가이드', icon: '💚' },
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

                {/* ===== 1. 3주차 마무리 스펙별 레벨 ===== */}
                <section id="tier-check" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center shrink-0">
                            <Star className="w-5 h-5 text-purple-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-300">[현재점검] 3주차 마무리 스펙별 내 레벨은? 📊</h2>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-5">
                        <p className="text-sm sm:text-base text-slate-200 break-keep leading-relaxed mb-5 font-medium">
                            <span className="text-purple-200">먼저 <strong className="text-purple-300 text-base sm:text-lg">지난 3주차를 어떤 상태로 마무리했는지</strong> 확인하세요.</span><br />
                            <span className="text-slate-400 text-xs sm:text-sm">※ 기본 3주차 풀 주간미션 + 사냥 + 에픽 장비/결정 + 자쿰 완료 기준</span>
                        </p>

                        {/* 이미지 영역 */}
                        <div className="bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden relative mb-5">
                            <Image 
                                src="/images/change-burning-lucid/checkpoint-status.png" 
                                alt="기본 숙제 완료 시 3주차 마무리 상태 예측창"
                                layout="responsive"
                                width={800}
                                height={350}
                                className="object-contain w-full h-auto"
                            />
                        </div>

                        <div className="space-y-3">
                            {[
                                {
                                    tier: '1단계', label: '일반 유저', emoji: '👤',
                                    condition: <><span className="text-yellow-400 font-medium">유니크 풀셋</span> + <span className="text-red-400 font-bold">카벨 ✗</span></>,
                                    level: 'Lv. 48',
                                    color: 'from-slate-800/60 to-slate-700/40',
                                    border: 'border-slate-600/50',
                                    badge: 'bg-slate-600 text-slate-200',
                                    lvColor: 'text-slate-200',
                                },
                                {
                                    tier: '2단계', label: '상위권 정배', emoji: '⚔️',
                                    condition: <><span className="text-yellow-400 font-medium">유니크 풀셋</span> + <span className="text-green-400 font-bold">카벨 ✓</span></>,
                                    level: 'Lv. 50',
                                    color: 'from-blue-900/40 to-blue-800/20',
                                    border: 'border-blue-500/30',
                                    badge: 'bg-blue-700 text-blue-100',
                                    lvColor: 'text-blue-300',
                                },
                                {
                                    tier: '3단계', label: '선발대', emoji: '🌟',
                                    condition: <><span className="text-yellow-400 font-medium">유니크 풀셋</span> + <span className="text-green-400 font-bold">카벨 ✓</span> + <span className="text-orange-300 font-bold">레전드리 결정 1개</span></>,
                                    level: 'Lv. 51',
                                    color: 'from-purple-900/40 to-purple-800/20',
                                    border: 'border-purple-500/40',
                                    badge: 'bg-purple-700 text-purple-100',
                                    lvColor: 'text-purple-300',
                                },
                                {
                                    tier: '4단계', label: '상위 1%', emoji: '💎',
                                    condition: <><span className="text-purple-300 font-medium">3단계 스펙</span> + <span className="text-orange-400 font-bold">레전드리 장비 1개</span></>,
                                    level: 'Lv. 53',
                                    color: 'from-yellow-900/40 to-amber-800/20',
                                    border: 'border-yellow-500/40',
                                    badge: 'bg-yellow-600 text-yellow-100',
                                    lvColor: 'text-yellow-300',
                                },
                                {
                                    tier: '5단계', label: '0.01% 천상계', emoji: '👑',
                                    condition: <><span className="text-yellow-300 font-medium">4단계 스펙</span> + <span className="text-red-400 font-bold">루시드 격파</span></>,
                                    level: 'Lv. 55',
                                    color: 'from-orange-900/50 to-red-900/30',
                                    border: 'border-orange-400/60',
                                    badge: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
                                    lvColor: 'text-orange-300',
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
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <p className={`font-black text-lg sm:text-2xl ${row.lvColor}`}>{row.level}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 2. 60레벨 즉시 진입 가능 여부 ===== */}
                <section id="lv60-check" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center justify-center shrink-0">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-300 leading-tight">
                            [4주차의 핵심] 사냥만으로 60레벨(4단계) <br />
                            즉시 진입 가능할까? 🚨
                        </h2>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-5">
                        <p className="text-sm sm:text-base text-white break-keep leading-relaxed mb-2 font-medium">
                            4주차 목요일에 접속하자마자 <strong className="text-yellow-300">사냥 25,000마리 + 사냥 주간 미션</strong>만 먼저 완료하고,<br />
                            아직 악몽의 숲에 입장하지 않은 상태의 예상 레벨입니다.
                        </p>
                        <div className="flex flex-wrap gap-3 mb-5 text-xs sm:text-sm">
                            <div className="bg-indigo-900/40 border border-indigo-500/30 rounded-lg px-3 py-1.5 text-indigo-200 font-medium">
                                📈 4주차 사냥 획득 EXP: <strong className="text-white">+2,295,075</strong>
                            </div>
                            <div className="bg-red-900/40 border border-red-500/30 rounded-lg px-3 py-1.5 text-red-200 font-medium">
                                🎯 60레벨 커트라인: <strong className="text-white">14,726,400 EXP</strong>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-slate-700 mb-5 pb-2">
                            <table className="w-full text-[11px] sm:text-sm whitespace-nowrap">
                                <thead>
                                    <tr className="bg-slate-700/80 text-slate-200 border-b border-slate-600">
                                        <th className="py-3 px-3 text-left font-bold">유저 티어</th>
                                        <th className="py-3 px-2 text-center">사냥 직후 레벨</th>
                                        <th className="py-3 px-2 text-center font-bold">악몽의 숲 4단계 즉시 진입</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        {
                                            tier: '1단계', label: '일반 유저', exp: '12,830,300 EXP', lv: 'Lv. 55',
                                            result: '❌ 불가', sub: '약 189만 EXP 부족',
                                            highlight: false, special: false,
                                        },
                                        {
                                            tier: '2단계', label: '상위권 정배', exp: '13,330,300 EXP', lv: 'Lv. 56',
                                            result: '❌ 불가', sub: '약 139만 EXP 부족',
                                            highlight: false, special: false,
                                        },
                                        {
                                            tier: '3단계', label: '선발대', exp: '13,830,300 EXP', lv: 'Lv. 57',
                                            result: '❌ 불가', sub: '약 89만 EXP 부족',
                                            highlight: false, special: false,
                                        },
                                        {
                                            tier: '4단계', label: '상위 1%', exp: '14,530,300 EXP', lv: 'Lv. 59',
                                            result: '❌ 불가', sub: '약 19.6만 EXP 부족\n👉 3단계 숲 10판 돌아야 뚫림',
                                            highlight: false, special: false,
                                        },
                                        {
                                            tier: '5단계', label: '0.01%', exp: '15,230,300 EXP', lv: 'Lv. 61 여유!',
                                            result: '✅ 즉시 확정!', sub: '4단계 숲 25판 풀 파밍!',
                                            highlight: true, special: true,
                                        },
                                    ].map((row, i) => (
                                        <tr key={i} className={`border-b border-slate-700/50 ${row.highlight ? 'bg-green-900/30' : 'bg-slate-800/40'}`}>
                                            <td className="py-3 px-3">
                                                <span className={`font-bold text-xs ${row.highlight ? 'text-green-300' : 'text-slate-200'}`}>{row.tier}</span>
                                                <span className="text-slate-400 text-xs ml-1 hidden sm:inline">({row.label})</span>
                                            </td>
                                            <td className="py-3 px-2 text-center align-middle">
                                                <p className={`text-base sm:text-lg font-black ${row.highlight ? 'text-green-300' : 'text-slate-100'}`}>{row.lv}</p>
                                            </td>
                                            <td className="py-3 px-2 text-center">
                                                <p className={`font-black text-xs sm:text-sm ${row.highlight ? 'text-green-300' : 'text-red-400'}`}>{row.result}</p>
                                                {row.sub.split('\n').map((s, j) => (
                                                    <p key={j} className={
                                                        s.includes('👉') 
                                                            ? 'text-xs mt-1 font-bold text-yellow-300 bg-yellow-900/40 rounded px-1.5 py-0.5 inline-block' 
                                                            : `text-xs mt-0.5 ${row.highlight ? 'text-green-400 font-bold' : 'text-slate-400'}`
                                                    }>{s}</p>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 분석 박스 */}
                        <div className="space-y-3">
                            <div className="bg-red-900/30 border border-red-500/40 rounded-xl p-3 sm:p-4 text-sm break-keep">
                                <p className="text-red-100 font-medium leading-relaxed">
                                    🚫 <strong className="text-white">4주차 분석:</strong> 레전드리 장비와 결정을 모두 가진 <strong className="text-yellow-300">상위 1%(4단계) 유저조차도</strong> 사냥만으로는 60레벨이 뚫리지 않습니다.
                                    4단계 유저도 루시드를 잡지 않았다면, 이번 주 <strong className="text-white">3단계 숲을 약 10판 돌아야</strong> 60레벨이 열립니다.
                                </p>
                            </div>
                            <div className="bg-green-900/30 border border-green-500/40 rounded-xl p-3 sm:p-4 text-sm break-keep">
                                <p className="text-green-100 font-medium leading-relaxed">
                                    👑 <strong className="text-white">오직 이 조건을 모두 달성한 유저만</strong> 악몽의 숲 25판 전부를 <strong className="text-yellow-300 text-base">4단계 (유니크 40.5%)</strong>에서 돌 수 있는 특권을 누립니다: <strong className="text-orange-300 ml-1">[레전드리 장비] + [레전드리 결정] + [루시드 격파]</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 3. 번외편: 변수 체크 ===== */}
                <section id="edge-cases" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shrink-0">
                            <HelpCircle className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-300">[번외편] 레전드리를 덜 모았는데 루시드를 잡았다면? 🔍</h2>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-5">
                        <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-4 mb-5 text-sm break-keep">
                            <p className="text-indigo-100 leading-relaxed font-medium">
                                💬 <strong className="text-white">&quot;저는 레전드리 템을 다 못 맞췄는데, 컨트롤과 스펙이 좋아서 루시드는 잡았습니다! 저는 60레벨 바로 열리나요?&quot;</strong>
                            </p>
                            <p className="text-slate-300 text-xs mt-2">이런 궁금증을 가지신 분들을 위해 하이브리드 변수 시나리오 두 가지를 계산해 드립니다.</p>
                        </div>

                        <div className="space-y-4">
                            {/* 변수 1 */}
                            <div className="bg-gradient-to-r from-red-950/60 to-rose-900/40 border-2 border-red-500/50 rounded-2xl p-4 sm:p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-full shrink-0">변수 1</span>
                                    <p className="font-bold text-red-300 text-sm sm:text-base break-keep">3단계(선발대) + 루시드를 잡은 분</p>
                                </div>
                                <div className="ml-0 sm:ml-1 space-y-2 text-sm break-keep">
                                    <p className="text-slate-300"><span className="text-slate-400 font-semibold">조건:</span> <span className="text-white">유니크 풀셋 + 레전드리 결정 + 루시드 격파</span></p>
                                    <div className="bg-red-900/40 border border-red-500/30 rounded-xl p-3">
                                        <p className="font-black text-red-300">결과: ❌ 즉시 진입 불가 (대략 19.6만 점 부족)</p>
                                    </div>
                                    <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-3">
                                        <p className="text-slate-200 leading-relaxed">
                                            📌 <strong className="text-white">팩트 체크:</strong> 아쉽습니다! <strong className="text-yellow-300">&apos;레전드리 장비&apos;가 빠졌기 때문에</strong>, 아무리 루시드를 잡았어도 60레벨 커트라인을 넘지 못합니다. 4단계(상위 1%) 유저들과 비슷한 경험치를 가지게 되며, <strong className="text-pink-300 font-bold underline underline-offset-4 decoration-pink-500/50">&apos;악몽의 숲 4단계 진입&apos;을 위해 3단계 숲을 약 10판 돌아야 합니다.</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 변수 2 */}
                            <div className="bg-gradient-to-r from-green-950/60 to-emerald-900/40 border-2 border-green-500/50 rounded-2xl p-4 sm:p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="bg-green-600 text-white text-xs font-black px-2.5 py-1 rounded-full shrink-0">변수 2</span>
                                    <p className="font-bold text-green-300 text-sm sm:text-base break-keep">2단계(상위권 정배) + 레전드리 장비 + 루시드를 잡은 분</p>
                                </div>
                                <div className="ml-0 sm:ml-1 space-y-2 text-sm break-keep">
                                    <p className="text-slate-300"><span className="text-slate-400 font-semibold">조건:</span> <span className="text-white">유니크 풀셋 + 레전드리 장비 + 루시드 격파</span></p>
                                    <div className="bg-green-900/40 border border-green-500/30 rounded-xl p-3">
                                        <p className="font-black text-green-300">결과: ✅ 60레벨 즉시 진입 확정!</p>
                                    </div>
                                    <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-3">
                                        <p className="text-slate-200 leading-relaxed">
                                            🔥 <strong className="text-white">소름 돋는 팩트:</strong> <strong className="text-yellow-300">&apos;레전드리 결정&apos;이 없어도</strong>, 가장 경험치 비중이 큰 <strong className="text-white">&apos;장비&apos;</strong>와 <strong className="text-white">&apos;루시드&apos;</strong>를 모두 챙겼다면 <br />
                                            사냥 숙제만으로 60레벨이 열립니다! 이분들은 목요일에 바로 <strong className="text-green-300">악몽의 숲 4단계 25판 풀 파밍</strong>이 가능합니다!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 4. 마스터 플랜 ===== */}
                <section id="master-plan" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center shrink-0">
                            <Gem className="w-5 h-5 text-yellow-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300">상위 0.01% 특권을 누리기 위한 마스터 플랜 👑</h2>
                    </div>

                    <p className="text-sm sm:text-base text-slate-200 break-keep leading-relaxed mb-6 font-medium">
                        우리도 4단계 숲 25판 프리패스를 타기 위해선 어떻게 해야 할까요?
                    </p>

                    {/* 플랜 1: 레전드리 장비/결정 획득 */}
                    <div className="bg-gradient-to-r from-yellow-900/40 to-amber-900/20 border-2 border-yellow-500/50 rounded-2xl p-5 sm:p-6 mb-5">
                        <div className="flex items-center gap-3 mb-5">
                            <span className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center font-black text-white text-base shrink-0">1</span>
                            <h3 className="font-bold text-lg sm:text-xl text-yellow-200">레전드리 장비/결정 획득하기 💎</h3>
                        </div>

                        <div className="space-y-4 ml-0 sm:ml-11">
                            {/* 장비 제작 */}
                            <div className="bg-yellow-900/30 border border-yellow-600/40 rounded-xl p-4 text-sm break-keep">
                                <div className="flex items-start gap-2 mb-2">
                                    <span className="text-lg shrink-0">💎</span>
                                    <p className="font-black text-yellow-200 text-base">장비 제작 (파편 존버의 이유!)</p>
                                </div>
                                <p className="text-white leading-relaxed ml-0 sm:ml-7 mb-4">
                                    1주차부터 절대 쓰지 말고 꾹꾹 모아두라고 강조했던 <strong className="text-yellow-300">&apos;몽환의 장비 파편&apos;</strong>을 드디어 꺼낼 시간입니다! <br />
                                    루시드 전용 장비 제작 탭에서 <strong className="text-pink-400">몽환의 장비 파편</strong>을 사용해 레전드리 장비를 만드세요.
                                </p>

                                {/* 이미지 영역 */}
                                <div className="ml-0 sm:ml-7 mb-4 bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden relative">
                                    <Image 
                                        src="/images/change-burning-lucid/equip-craft.png" 
                                        alt="몽환의 전령 (레전드리) 장비 제작 화면"
                                        layout="responsive"
                                        width={800}
                                        height={600}
                                        className="object-contain w-full h-auto"
                                    />
                                </div>

                                <div className="ml-0 sm:ml-7 mb-2 bg-gradient-to-r from-amber-900/60 to-yellow-900/40 border-2 border-amber-500/50 rounded-xl p-4 text-sm text-amber-50 leading-relaxed shadow-lg shadow-amber-900/20">
                                    💡 <strong className="text-yellow-300 text-base font-black">레전드리 무기로 제작 추천!</strong><br className="sm:hidden" /> 장비 제작도 결국 운이기 때문에 파편 상황에 맞게 확률을 올릴지, <br />
                                    아니면 파편을 적게 쓰고 운에 맡길지 스스로 결정해야 합니다.
                                </div>
                            </div>

                            {/* 결정 합성 */}
                            <div className="bg-purple-900/30 border border-purple-600/40 rounded-xl p-4 text-sm break-keep">
                                <div className="flex items-start gap-2 mb-2">
                                    <span className="text-lg shrink-0">🔮</span>
                                    <p className="font-black text-purple-200 text-base">결정 합성</p>
                                </div>
                                <p className="text-white leading-relaxed ml-0 sm:ml-7 mb-4">
                                    지금까지 모인 <strong className="text-yellow-400">유니크 결정 3개를 합성</strong>하여 <strong className="text-green-400">레전드리 결정</strong> 띄우기에 도전하세요!
                                </p>
                                
                                {/* 이미지 영역 */}
                                <div className="ml-0 sm:ml-7 mb-4 bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden relative">
                                    <Image 
                                        src="/images/change-burning-lucid/crystal-merge.png" 
                                        alt="몽환의 결정 (레전드리) 합성 화면"
                                        layout="responsive"
                                        width={800}
                                        height={600}
                                        className="object-contain w-full h-auto"
                                    />
                                </div>

                                <div className="ml-0 sm:ml-7 bg-red-900/30 border border-red-500/30 rounded-lg p-3 text-sm text-red-200 leading-relaxed">
                                    😅 이것 또한 운의 영역... 저는 20번 넘게 도전했지만 전부 실패했습니다. 우리 모두 화이팅..!
                                </div>
                            </div>

                            {/* 악몽의 숲 파밍 */}
                            <div className="bg-green-900/30 border border-green-600/40 rounded-xl p-4 text-sm break-keep">
                                <div className="flex items-start gap-2 mb-2">
                                    <span className="text-lg shrink-0">🍀</span>
                                    <p className="font-black text-green-200 text-base">악몽의 숲 파밍</p>
                                </div>
                                <p className="text-white leading-relaxed ml-0 sm:ml-7">
                                    물론 던전에서 운 좋게 <strong className="text-green-300">완제품으로 바로 획득</strong>하는 것도 가능합니다!
                                </p>
                            </div>

                            {/* 확률표 */}
                            <div>
                                <p className="font-bold text-green-300 mb-3 flex items-center gap-2 text-sm">🌲 악몽의 숲 단계별 장비 획득 확률표</p>
                                <div className="overflow-x-auto rounded-xl border border-slate-700 pb-2">
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
                                                { stage: '3단계 (40Lv) ⭐', normal: '—', rare: '19.000%', epic: '65.000%', unique: '15.000%', legend: '1.000%', highlight: true },
                                                { stage: '4단계', normal: '—', rare: '3.000%', epic: '55.000%', unique: '40.500%', legend: '1.500%', highlight: false },
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
                                <p className="text-sm text-center text-white mt-3 font-medium">(만약 악몽의 숲에서 레전드리를 먹었다면 이미 상위 1%...!!)</p>
                            </div>
                        </div>
                    </div>

                    {/* 플랜 2: 루시드 격파 */}
                    <div className="bg-gradient-to-r from-red-950/60 to-rose-900/40 border-2 border-red-500/60 rounded-2xl p-5 sm:p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-black text-white text-base shrink-0">2</span>
                            <h3 className="font-bold text-lg sm:text-xl text-red-200">가장 중요한 &apos;루시드 격파&apos; ⚔️</h3>
                        </div>

                        <div className="ml-0 sm:ml-11 space-y-4">
                            <p className="text-sm sm:text-base text-white break-keep leading-relaxed font-medium mb-2">
                                레전드리를 맞췄다면 남은 건 4주차의 진정한 벽, <strong className="text-red-300">&apos;하드 루시드&apos;</strong>를 직접 잡는 것뿐입니다!
                            </p>

                            {/* 이미지 영역 */}
                            <div className="bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden relative">
                                <Image 
                                    src="/images/change-burning-lucid/lucid-boss.png" 
                                    alt="하드 루시드 보스 입장 화면"
                                    layout="responsive"
                                    width={800}
                                    height={450}
                                    className="object-contain w-full h-auto"
                                />
                            </div>

                            <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-4 sm:p-5 break-keep">
                                <p className="text-base sm:text-lg font-black text-white mb-2 sm:mb-3">⚔️ &quot;내 스펙으로 루시드 잡을 수 있을까?&quot;</p>
                                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                                    루시드 트라이 전, 최소컷과 딜 효율이 궁금하시다면 더 이상 헤매지 마세요!
                                </p>
                            </div>

                            {/* 계산기 CTA */}
                            <Link href="/calculator/lucid-boss" className="block">
                                <div className="bg-gradient-to-r from-purple-600/40 to-indigo-600/40 border-2 border-purple-500/60 rounded-xl p-4 hover:border-purple-400/80 hover:from-purple-600/60 hover:to-indigo-600/60 transition-all group">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-2xl">🧮</span>
                                        <div>
                                            <p className="font-black text-white text-base sm:text-lg group-hover:text-purple-300 transition-colors">메이플 AI - 루시드 보스 효율/최소컷 계산기</p>
                                            <p className="text-purple-300 text-xs sm:text-sm">maple.ai.kr/calculator/lucid-boss</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-purple-400 ml-auto shrink-0 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed ml-11 break-keep">
                                        내 스펙을 입력하면 메이플 AI가 루시드 격파 가능 여부를 완벽하게 분석해 드립니다! <br />
                                        생각보다 정확하기 때문에 꼭 격파 가능성이 100% 이상인지 확인해 보세요!
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 5. 일반 유저 멘탈 케어 ===== */}
                <section id="mental-care" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-green-500/20 border border-green-500/50 flex items-center justify-center shrink-0">
                            <Target className="w-5 h-5 text-green-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-300">🦋 일반 유저를 위한 멘탈 케어 가이드 (조급함 NO!)</h2>
                    </div>

                    <div className="bg-gradient-to-r from-green-950/60 to-emerald-900/40 border-2 border-green-500/50 rounded-2xl p-5 sm:p-6 mb-5">
                        <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4 mb-5 text-base sm:text-lg break-keep shadow-inner">
                            <p className="text-green-100 leading-relaxed font-medium">
                                💬 <strong className="text-white">&quot;아... 저는 파편도 모자라고 무자본이라 루시드 절대 못 잡는데 어떡하죠? 망한 건가요?&quot;</strong>
                            </p>
                        </div>

                        <div className="text-center mb-8">
                            <p className="text-4xl sm:text-5xl font-black text-green-300 mb-3 tracking-tight">절대 아닙니다! 🙅</p>
                            <p className="text-white font-medium text-sm sm:text-base">대다수의 일반 유저분들, 전혀 조급해하실 필요 없습니다.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-slate-800/60 border border-slate-600 rounded-xl p-4 sm:p-5 flex items-start gap-3">
                                <span className="text-2xl shrink-0">🌲</span>
                                <div className="text-sm sm:text-base break-keep">
                                    <p className="font-black text-white mb-2">이번 주는 악몽의 숲 3단계 숲에서 편안하게!</p>
                                    <p className="text-slate-200 leading-relaxed">
                                        루시드를 못 잡았거나 레전드리를 못 띄웠다면, 이번 주는 마음 편히 <strong className="text-green-300">3단계(40Lv) 숲에서 25판</strong>을 마무리하세요. 3단계도 유니크 드랍률이 <strong className="text-yellow-300">15%</strong>나 되기 때문에 스펙업하기에 훌륭한 효율을 보여줍니다.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-indigo-900/50 to-blue-900/30 border-2 border-indigo-500/60 rounded-xl p-4 sm:p-5 flex items-start gap-3">
                                <span className="text-2xl shrink-0">🗓️</span>
                                <div className="text-sm sm:text-base break-keep">
                                    <p className="font-black text-indigo-200 mb-2">진짜 60레벨의 문은 5주차에 열린다!</p>
                                    <p className="text-white leading-relaxed">
                                        4주차에 못 간 <strong className="text-yellow-300">60레벨 악몽의 숲 4단계 던전</strong>은, 다음 주 5주차가 되면 웬만한 유저들은 전부 갈 수 있습니다. <strong className="text-indigo-300">마음 편하게 진행하셔도 됩니다!</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 마무리 배너 */}
                    <div className="bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-indigo-600/30 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8 text-center mt-8">
                        <p className="text-2xl sm:text-3xl mb-3">🦋</p>
                        <p className="font-black text-xl sm:text-2xl text-white mb-3">4주차 결론</p>
                        <div className="bg-white/10 border border-white/20 rounded-xl p-4 sm:p-5 text-sm sm:text-base text-white break-keep leading-relaxed font-medium inline-block max-w-2xl w-full">
                            상위권 랭커들의 전유물인 <strong className="text-orange-300">&apos;루시드&apos;</strong>에 도전할 분들은 과감하게 스펙업을 질러보시고,<br />
                            그렇지 않은 분들은 스트레스 받지 말고 <br />
                            <strong className="text-green-300">5주차를 기다리며 천천히 내실을 다지는 한 주</strong>가 되시길 바랍니다
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* CTA */}
                <section className="mb-8">
                    <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border-2 border-purple-500/50 rounded-xl p-4 sm:p-8 text-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">체인지 버닝: 루시드 더 자세히 알아보기</h3>
                        <p className="text-sm sm:text-base text-slate-100 mb-6 break-keep">
                            이전 주차 공략도 함께 확인해보세요!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/blog/change-burning-lucid-week3-guide">
                                <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold rounded-xl transition-all shadow-xl hover:-translate-y-1">
                                    🦋 3주차 공략 보기
                                </button>
                            </Link>
                            <Link href="/blog/change-burning-lucid-week2-guide">
                                <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-bold rounded-xl transition-all hover:-translate-y-1">
                                    🦋 2주차 공략 보기
                                </button>
                            </Link>
                            <Link href="/blog/change-burning-lucid-week1-guide">
                                <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-bold rounded-xl transition-all hover:-translate-y-1">
                                    🦋 1주차 공략 보기
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* SEO Keywords */}
                <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-wrap gap-x-4 gap-y-2 justify-center">
                    {[
                        '체인지버닝루시드', '루시드4주차', '메이플23주년', '루시드이벤트',
                        '몽환의시련', '악몽의숲4단계', '드림이터', '몽환의결정', '몽환의장비',
                        '루시드공략', '루시드60레벨', '하드루시드', '루시드최소컷', '루시드4주차공략',
                        '메이플이벤트공략', '루시드변신', '체인지버닝', '악몽의숲유니크',
                        '레전드리장비', '장비파편', '결정합성', '루시드격파',
                        '악몽의숲40.5%', '루시드계산기', '4단계악몽의숲', '루시드스펙',
                    ].map((keyword) => (
                        <span key={keyword} className="text-slate-500 text-xs sm:text-sm hover:text-purple-400 transition-colors cursor-default">#{keyword}</span>
                    ))}
                </div>
            </main>
        </div>
    );
}
