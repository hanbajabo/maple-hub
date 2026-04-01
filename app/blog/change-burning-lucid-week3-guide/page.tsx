'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, AlertCircle, Gem, RefreshCw, Star, ShieldAlert, Zap, ChevronRight, HelpCircle, Target, Swords } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function ChangeBurningLucidWeek3GuidePage() {
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
                        <span className="text-sm sm:text-base text-slate-300">2026년 4월 3일</span>
                        <span className="text-slate-500">|</span>
                        <span className="text-xs sm:text-sm text-purple-400 font-medium">이벤트 가이드</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight flex flex-col sm:gap-1">
                        <div>
                            <span className="text-2xl sm:text-3xl mr-1 sm:mr-2">🦋</span>
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                                체인지 버닝: 루시드 3주차
                            </span>
                        </div>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent pl-2 sm:pl-[42px]">
                            폭풍 레벨업 &amp; 6차 스킬 해금!
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-slate-100 mb-6 leading-relaxed break-keep">
                        지난주 카오스 벨룸을 잡지 못해 37레벨에 주차하고 답답하셨던 분들, 이번 주가 진짜 <strong className="text-white">&apos;사이다 주간&apos;</strong>입니다. 동선만 꼬이지 않게 잘 따라오시면 무려 <strong className="text-pink-300">13레벨 이상 폭풍 성장</strong>하는 기적을 보실 수 있습니다!
                    </p>

                    {/* 긴급 CTA 배너 */}
                    <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 border-2 border-amber-500/70 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 shadow-xl shadow-amber-900/30">
                        <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-black text-amber-300 text-base sm:text-lg mb-1">⚠️ 3주차 핵심 체크!</p>
                            <p className="text-sm sm:text-base text-amber-100 break-keep">
                                접속하자마자 습관적으로 &apos;악몽의 숲&apos;부터 누르지 마세요! 이번 주는 무조건 <strong className="text-white underline">&quot;선(先) 사냥, 후(後) 악몽의 숲&quot;</strong>입니다. 동선 꼬이면 3단계 상위 보상을 날려먹습니다!
                            </p>
                        </div>
                    </div>
                </div>

                {/* 목차 */}
                <nav className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-5 mb-10">
                    <p className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">목차</p>
                    <ul className="space-y-2 text-sm sm:text-base">
                        {[
                            { href: '#principles', label: '[필수 복습] 루시드 육성 3대 원칙', icon: '📝' },
                            { href: '#priority', label: '[필수 숙지] 3주차 최우선 순위: 선(先) 사냥!', icon: '📝' },
                            { href: '#forest3', label: '[3주차의 핵심] 악몽의 숲 3단계 입성 & 유니크 폭격', icon: '🚨' },
                            { href: '#week3-summary', label: '3주차 완벽 동선 4단계 (순서가 생명!)', icon: '⚔️' },
                            { href: '#specup', label: '[스펙업] 6차 스킬 개방과 카벨/루시드 찢기!', icon: '💎' },
                            { href: '#level-check', label: '[팩트 체크] "이번 주에 60레벨 찍을 수 있나요?"', icon: '📊' },
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

                {/* ===== 1. 루시드 육성 3대 원칙 ===== */}
                <section id="principles" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center shrink-0">
                            <Star className="w-5 h-5 text-purple-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-300">[필수 복습] 이것만은 꼭 지키자! 루시드 육성 3대 원칙</h2>
                    </div>

                    <div className="space-y-4">
                        {/* 원칙 1 */}
                        <div className="bg-gradient-to-r from-indigo-900/50 to-indigo-800/30 border border-indigo-500/40 rounded-2xl p-4 sm:p-5">
                            <div className="flex items-start gap-3 mb-3">
                                <span className="text-2xl shrink-0">👾</span>
                                <div>
                                    <p className="font-black text-indigo-200 text-base sm:text-lg mb-1">원칙 1. 무조건 &apos;드림 이터 25,000마리&apos;부터 다 잡고 시작하기!</p>
                                    <p className="text-xs sm:text-sm text-slate-200 font-black">절대 규칙</p>
                                </div>
                            </div>
                            <p className="text-sm sm:text-base text-white font-medium break-keep leading-relaxed ml-9">
                                매주 목요일이 되면 다른 숙제 다 제쳐두고 필드에서 드림 이터 25,000마리부터 꽉 채우세요.
                            </p>
                            <div className="mt-3 ml-9 bg-indigo-900/40 border border-indigo-500/30 rounded-xl p-3 text-sm break-keep">
                                <p className="text-indigo-200 leading-relaxed">
                                    🔥 <strong className="text-white">소름 돋는 팩트:</strong> 드림 이터를 사냥하다 보면 <strong className="text-yellow-300">&apos;악몽의 끄나풀&apos;</strong>과 <strong className="text-yellow-300">&apos;악몽의 근원&apos;</strong>이 자연스럽게 함께 스폰되어 잡힙니다. 이 사냥 과정만으로 얻는 순수 확정 경험치가 무려 <strong className="text-white text-base">895,000 EXP</strong>입니다!
                                </p>
                            </div>
                            <div className="mt-3 ml-9 overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900">
                                <Image src="/images/blog/change-burning-lucid/step1.png" alt="드림 이터 사냥" width={600} height={300} className="w-full h-auto object-cover" />
                            </div>
                        </div>

                        {/* 원칙 2 */}
                        <div className="bg-gradient-to-r from-green-900/40 to-green-800/20 border border-green-500/30 rounded-2xl p-4 sm:p-5">
                            <div className="flex items-start gap-3 mb-3">
                                <span className="text-2xl shrink-0">🌲</span>
                                <div>
                                    <p className="font-black text-green-200 text-base sm:text-lg mb-1">원칙 2. 악몽의 숲 입장권은 &apos;주간 25회&apos;까지만! 교환권은 존버!</p>
                                    <p className="text-xs sm:text-sm text-slate-400 font-semibold">절대 규칙</p>
                                </div>
                            </div>
                            <p className="text-sm sm:text-base text-white font-medium break-keep leading-relaxed ml-9">
                                매일 5개씩 충전되는 기본 입장권으로 주간 미션(25회 클리어)만 채우세요.
                            </p>
                            <div className="mt-3 ml-9 space-y-2">
                                <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-3 text-sm break-keep">
                                    <p className="text-green-100 leading-relaxed">
                                        💡 <strong className="text-white">핵심 꿀팁:</strong> 이벤트 보상으로 주는 <strong className="text-yellow-300">&apos;악몽의 드림캐쳐 교환권&apos;</strong>은 지금 절대 쓰시면 안 됩니다!<br />루시드 레벨이 오를수록(40, 60, 80레벨) 악몽의 숲 보상 등급이 확 달라집니다.
                                    </p>
                                </div>
                                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3 text-sm break-keep">
                                    <p className="text-red-100 leading-relaxed">
                                        🚨 교환권은 무조건 <strong className="text-yellow-300">80레벨 달성 이후</strong> 최고 효율일 때 몰아서 터뜨리세요.<br />(단, 기본 충전 티켓이 30개 꽉 차서 날아가지 않게만 매일 소모해 주세요.)
                                    </p>
                                </div>
                                <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900">
                                    <Image src="/images/blog/change-burning-lucid/caution.png" alt="악몽의 드림캐쳐 교환권 주의사항" width={600} height={300} className="w-full h-auto object-cover" />
                                </div>
                            </div>
                        </div>

                        {/* 원칙 3 */}
                        <div className="bg-gradient-to-r from-orange-900/40 to-orange-800/20 border border-orange-500/30 rounded-2xl p-4 sm:p-5">
                            <div className="flex items-start gap-3 mb-3">
                                <span className="text-2xl shrink-0">🎁</span>
                                <div>
                                    <p className="font-black text-orange-200 text-base sm:text-lg mb-1">원칙 3. 보스 처치 후 &apos;보상 수령 + 상자 오픈&apos;까지가 진짜 숙제 끝!</p>
                                    <p className="text-xs sm:text-sm text-slate-400 font-semibold">절대 규칙</p>
                                </div>
                            </div>
                            <p className="text-sm sm:text-base text-white font-medium break-keep leading-relaxed ml-9">
                                몽환의 시련에서 카오스 자쿰이나 벨룸을 잡았다면 거기서 끝이 아닙니다.
                            </p>
                            <div className="mt-3 ml-9 bg-orange-900/30 border border-orange-500/30 rounded-xl p-3 text-sm break-keep">
                                <p className="text-orange-100 leading-relaxed">
                                    ✅ <strong className="text-white">필수 확인:</strong> 자쿰 탭 우측 하단의 <strong className="text-yellow-300">&apos;루시드 보상&apos;</strong>을 꼭 수령하고,<br />인벤토리에서 그 상자를 직접 열어야만 시즌 미션(결정 획득)이 완료되며 막대한 경험치가 들어옵니다.
                                </p>
                                <p className="text-red-300 font-bold mt-2">&quot;어? 보스 잡았는데 경험치 안 오르네?&quot; 하시는 분들, 상자 안 까신 겁니다!</p>
                            </div>
                            <div className="mt-3 ml-9 grid grid-cols-2 gap-2">
                                <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900">
                                    <Image src="/images/blog/change-burning-lucid/step3.png" alt="루시드 보상 수령" width={400} height={220} className="w-full h-auto object-cover" />
                                </div>
                                <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900">
                                    <Image src="/images/blog/change-burning-lucid/step4.png" alt="의문의 몽환의 결정 상자 오픈" width={400} height={220} className="w-full h-auto object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 2. 선 사냥 ===== */}
                <section id="priority" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shrink-0">
                            <Zap className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-300">[필수 숙지] 3주차 최우선 순위: 선(先) 사냥! 👾</h2>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-900/50 to-blue-900/30 border border-indigo-500/40 rounded-2xl p-5 sm:p-6 mb-5">
                        <div className="flex items-start gap-3 mb-3">
                            <span className="text-2xl shrink-0">👾</span>
                            <div>
                                <p className="font-black text-indigo-200 text-base sm:text-lg mb-1">원칙 1. 무조건 &apos;드림 이터 25,000마리&apos;부터 다 잡고 시작하기!</p>
                                <p className="text-xs sm:text-sm text-slate-400 font-semibold">절대 규칙: 목요일 땡 치자마자 다른 숙제 다 제쳐두고 필드로 나가서 사냥부터 하세요.</p>
                            </div>
                        </div>
                        <div className="bg-indigo-900/40 border border-indigo-500/30 rounded-xl p-4 text-sm break-keep">
                            <p className="text-indigo-100 leading-relaxed font-medium">
                                🔥 <strong className="text-white">소름 돋는 팩트:</strong> 2주 차에 37레벨로 마무리하셨나요? 사냥 25,000마리를 다 채우기도 전에 <strong className="text-white text-base">40레벨</strong>을 도달할 수 있습니다!
                            </p>
                        </div>
                        <div className="mt-4 bg-gradient-to-r from-yellow-900/40 to-amber-900/30 border-2 border-yellow-500/50 rounded-xl p-4 text-sm break-keep">
                            <p className="text-yellow-100 leading-relaxed font-bold mb-2">
                                ⭐ 이 40레벨을 먼저 찍고 나서 악몽의 숲에 들어가야<br /><strong className="text-white">3단계(40레벨 제한) 던전 보상</strong>을 온전히 25판 다 타먹을 수 있습니다!
                            </p>
                            <div className="overflow-hidden rounded-xl border border-yellow-500/30 bg-slate-900 inline-block">
                                <Image src="/images/blog/change-burning-lucid/stage3-level.png" alt="3단계 레벨 제한" width={180} height={40} className="w-auto h-auto object-cover" />
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 3. 악몽의 숲 3단계 ===== */}
                <section id="forest3" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-green-500/20 border border-green-500/50 flex items-center justify-center shrink-0">
                            <ShieldAlert className="w-5 h-5 text-green-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-300">[3주차의 핵심] 악몽의 숲 3단계 입성 &amp; 유니크 폭격 🚨</h2>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-5">
                        <p className="text-sm sm:text-base text-white break-keep leading-relaxed mb-4 font-medium">
                            왜 기를 쓰고 40레벨을 먼저 찍으라고 말씀드렸을까요?<br />바로 <strong className="text-yellow-300">악몽의 숲 3단계부터 유니크 드랍률이 &apos;폭증&apos;</strong>하기 때문입니다.
                        </p>

                        {/* 확률표 */}
                        <div className="mb-5">
                            <p className="font-bold text-green-300 mb-3 flex items-center gap-2">🌲 악몽의 숲 단계별 장비 획득 확률표</p>
                            <div className="overflow-x-auto rounded-xl border border-slate-700">
                                <table className="w-full text-xs sm:text-sm text-center">
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
                                            { stage: '3단계 (40Lv)', normal: '—', rare: '19.000%', epic: '65.000%', unique: '15.000%', legend: '1.000%', highlight: true },
                                            { stage: '4단계', normal: '—', rare: '3.000%', epic: '55.000%', unique: '40.500%', legend: '1.500%', highlight: false },
                                            { stage: '5단계', normal: '—', rare: '—', epic: '44.000%', unique: '52.000%', legend: '4.000%', highlight: false },
                                        ].map((row, i) => (
                                            <tr key={i} className={`border-b border-slate-700/50 ${row.highlight ? 'bg-green-900/30' : 'bg-slate-800/40'}`}>
                                                <td className={`py-2.5 px-3 text-left font-bold ${row.highlight ? 'text-green-300' : 'text-slate-200'}`}>{row.stage}</td>
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

                        <div className="space-y-3">
                            <div className="bg-yellow-900/30 border border-yellow-500/40 rounded-xl p-3 sm:p-4 text-sm break-keep">
                                <p className="text-yellow-100 font-medium leading-relaxed">
                                    👑 <strong className="text-white">확률 분석:</strong> 2단계에서 고작 <strong className="text-red-300">1.998%</strong>였던 유니크 드랍률이 3단계로 넘어오는 순간 무려 <strong className="text-yellow-300 text-base">15% (약 7.5배)</strong>로 뜁니다!
                                </p>
                            </div>
                            <div className="bg-green-900/30 border border-green-500/40 rounded-xl p-3 sm:p-4 text-sm break-keep">
                                <p className="text-green-100 font-medium leading-relaxed">
                                    💡 <strong className="text-white">핵심 꿀팁:</strong> 이번 주 숙제 25판을 전부 3단계에서 돌면? 평균 <strong className="text-white">1~2개의 유니크 장비를 확정적으로</strong> 챙겨가실 수 있습니다. 여기서부터 스펙이 많이 올라갑니다. <span className="text-green-300/80">(※ 물론 교환권은 80레벨 5단계까지 계속 존버입니다!)</span>
                                </p>
                            </div>
                        </div>

                        {/* 교환권 탕진 전략 분석 */}
                        <div className="mt-6 bg-gradient-to-r from-red-950/60 to-rose-900/40 border-2 border-red-500/50 rounded-2xl p-5 sm:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xl">🚨</span>
                                <p className="font-black text-red-300 text-base sm:text-lg break-keep">
                                    &quot;3단계 유니크 확률 높으니까 교환권 다 털자!&quot; — 이거 손해입니다
                                </p>
                            </div>
                            <p className="text-sm sm:text-base text-slate-200 break-keep leading-relaxed mb-4">
                                3단계 유니크 확률이 <strong className="text-yellow-300">7.5배</strong> 뛰었다고 교환권을 지금 다 쏟는 분들이 계신데,
                                이건 <strong className="text-white">&apos;상대적 상승폭&apos;에 혹한 판단</strong>입니다.
                                기대값으로 계산하면 명백한 손해예요.
                            </p>

                            {/* 기대값 비교표 */}
                            <div className="overflow-x-auto rounded-xl border border-slate-700 mb-4">
                                <table className="w-full text-xs sm:text-sm text-center">
                                    <thead>
                                        <tr className="bg-slate-700/80 text-slate-200 border-b border-slate-600">
                                            <th className="py-2.5 px-3 text-left font-bold">단계</th>
                                            <th className="py-2.5 px-2 text-yellow-300">유니크 확률</th>
                                            <th className="py-2.5 px-2 text-orange-300">레전드리 확률</th>
                                            <th className="py-2.5 px-2 text-yellow-200">교환권 10장당<br />유니크 기대값</th>
                                            <th className="py-2.5 px-2 text-orange-200">레전드리<br />기대값</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { stage: '3단계 (지금)', unique: '15.0%', legend: '1.0%', expUnique: '1.5개', expLegend: '0.1개', highlight: false },
                                            { stage: '4단계', unique: '40.5%', legend: '1.5%', expUnique: '4.05개', expLegend: '0.15개', highlight: false },
                                            { stage: '5단계 ⭐', unique: '52.0%', legend: '4.0%', expUnique: '5.2개', expLegend: '0.4개', highlight: true },
                                        ].map((row, i) => (
                                            <tr key={i} className={`border-b border-slate-700/50 ${row.highlight ? 'bg-green-900/30' : 'bg-slate-800/40'}`}>
                                                <td className={`py-2.5 px-3 text-left font-bold ${row.highlight ? 'text-green-300' : 'text-slate-200'}`}>{row.stage}</td>
                                                <td className="py-2.5 px-2 text-yellow-400">{row.unique}</td>
                                                <td className="py-2.5 px-2 text-orange-400">{row.legend}</td>
                                                <td className={`py-2.5 px-2 font-black ${row.highlight ? 'text-green-300 text-sm sm:text-base' : 'text-slate-300'}`}>{row.expUnique}</td>
                                                <td className={`py-2.5 px-2 font-bold ${row.highlight ? 'text-orange-300' : 'text-slate-400'}`}>{row.expLegend}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="space-y-2">
                                <div className="bg-red-900/30 border border-red-500/40 rounded-xl p-3 text-sm break-keep">
                                    <p className="text-red-100 font-medium leading-relaxed">
                                        ❌ <strong className="text-white">3단계에서 교환권 10장 소모:</strong> 유니크 평균 <strong className="text-yellow-300">1.5개</strong>, 레전드리 평균 <strong className="text-orange-300">0.1개</strong>
                                    </p>
                                </div>
                                <div className="bg-green-900/30 border border-green-500/40 rounded-xl p-3 text-sm break-keep">
                                    <p className="text-green-100 font-medium leading-relaxed">
                                        ✅ <strong className="text-white">5단계까지 존버 후 10장 소모:</strong> 유니크 평균 <strong className="text-yellow-300 text-base">5.2개 (3.5배↑)</strong>, 레전드리 평균 <strong className="text-orange-300 text-base">0.4개 (4배↑)</strong>
                                    </p>
                                </div>
                                <div className="bg-amber-900/30 border border-amber-500/40 rounded-xl p-3 text-sm break-keep mt-1">
                                    <p className="text-amber-100 font-medium leading-relaxed">
                                        💡 <strong className="text-white">핵심:</strong> 3단계가 2단계보다 훨씬 좋은 건 맞습니다. 하지만 최고점(5단계)이 아직 훨씬 남아있어요.
                                        <br /><strong className="text-yellow-300">교환권은 무조건 80레벨 5단계까지 존버!</strong> 수학적으로 압도적으로 유리합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 4. 3주차 완벽 동선 4단계 ===== */}
                <section id="week3-summary" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shrink-0">
                            <Zap className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-300 leading-tight">
                            3주차 가이드라인: 순서가 생명!<br />
                            완벽 동선 4단계 ⚔️
                        </h2>
                    </div>

                    {/* 주의사항 배너 */}
                    <div className="bg-gradient-to-r from-red-900/50 to-rose-900/40 border-2 border-red-500/60 rounded-2xl p-4 sm:p-5 mb-6 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <p className="text-sm sm:text-base text-red-100 break-keep font-bold">
                            [매우 중요] 순서대로 안 하시면 <strong className="text-white underline">20레벨 2단계 보상</strong>을 받게 됩니다!
                        </p>
                    </div>

                    <div className="space-y-3">
                        {[
                            {
                                step: 1,
                                icon: '👾',
                                text: '드림 이터 25,000마리 우선 전부 잡기',
                                sub: (<span>가장 먼저 필드로 달려가세요. 사냥 도중 사냥 경험치만으로 <strong className="text-yellow-300">40레벨</strong>이 달성됩니다!</span>) as any,
                                color: 'from-indigo-900/50 to-indigo-800/30',
                                border: 'border-indigo-500/40',
                                badge: 'text-indigo-300',
                                img: '/images/blog/change-burning-lucid/step1.png',
                                highlight: false,
                                extra: null as React.ReactNode,
                            },
                            {
                                step: 2,
                                icon: '🌲',
                                text: '40레벨 달성 후 \'악몽의 숲 3단계\' 25번 돌기',
                                sub: (
                                    <span>
                                        드디어 3단계 입장입니다! <strong className="text-yellow-300 underline underline-offset-4 decoration-yellow-500/50">15%의 확률</strong>을 뚫고 쏟아지는 유니크 장비를 맛있게 드시면 됩니다.
                                    </span>
                                ) as any,
                                color: 'from-green-900/40 to-green-800/20',
                                border: 'border-green-500/30',
                                badge: 'text-green-300',
                                img: null as string | null,
                                highlight: false,
                                extra: (
                                    <div className="mt-2 ml-[36px] sm:ml-[56px] overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900">
                                        <Image src="/images/blog/change-burning-lucid/dream-catcher-stage3.png" alt="악몽의 숲 3단계 입장" width={600} height={350} className="w-full h-auto object-cover" />
                                    </div>
                                ),
                            },
                            {
                                step: 3,
                                icon: '✅',
                                text: '주간 미션 15종 올클리어 (경험치 210만 수령!)',
                                sub: <strong className="text-yellow-300 underline underline-offset-4 font-black">악몽의 숲 25회 완료 꼭 잊지마세요!</strong> as any,
                                color: 'from-cyan-900/40 to-cyan-800/20',
                                border: 'border-cyan-500/30',
                                badge: 'text-cyan-300',
                                img: '/images/blog/change-burning-lucid/weekly-mission-proof.png',
                                highlight: false,
                                extra: (
                                    <div className="mt-2 ml-[36px] sm:ml-[56px] bg-gradient-to-r from-pink-900/40 to-purple-900/30 border-2 border-pink-500/50 rounded-xl p-3 text-sm break-keep">
                                        <p className="text-pink-100 font-bold leading-relaxed">
                                            🎉 <strong className="text-white">폭풍 레벨업:</strong> 37레벨이었던 유저가 여기서 단숨에 <strong className="text-yellow-300 text-base">Lv. 46</strong>까지 미친 듯이 치고 올라갑니다!
                                        </p>
                                    </div>
                                ),
                            },
                            {
                                step: 4,
                                icon: '👑',
                                text: '6차 스킬 개방 및 보스 격파',
                                sub: (
                                    <span>
                                        레벨업 과정에서 <strong className="text-yellow-300">45레벨을 돌파</strong>하며 꽉 막혀있던 <strong className="text-white">&apos;6차 스킬&apos;</strong>이 해금됩니다.<br />저번 주에 벨룸을 못 잡으셨다면 이번에 6차 스킬로 손쉽게 잡아보세요!
                                    </span>
                                ) as any,
                                color: 'from-yellow-900/50 to-amber-900/30',
                                border: 'border-yellow-500/50',
                                badge: 'text-yellow-300',
                                img: '/images/blog/change-burning-lucid/lucid-6th-skill-unlock.png',
                                highlight: true,
                                extra: null as React.ReactNode,
                            },
                            {
                                step: 5,
                                icon: '💎',
                                text: '얻은 장비/결정으로 합성 및 스펙업 진행 후 꿀잠 마무리!',
                                sub: (
                                    <span>
                                        카벨까지 잡고, 유니크 장비+결정까지 얻은 분들은 <strong className="text-yellow-300">50레벨 부근</strong>에서 편안하게 3주차를 마무리하시면 됩니다!
                                    </span>
                                ) as any,
                                color: 'from-purple-900/40 to-indigo-900/30',
                                border: 'border-purple-500/40',
                                badge: 'text-purple-300',
                                img: null as string | null,
                                highlight: false,
                                extra: null as React.ReactNode,
                            },
                        ].map(item => (
                            <div key={item.step} className={`flex flex-col gap-2 sm:gap-3 bg-gradient-to-r ${item.color} border ${item.border} rounded-xl p-3 sm:p-4 ${item.highlight ? 'ring-1 ring-yellow-500/30' : ''}`}>
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <span className={`font-black text-lg sm:text-2xl ${item.badge} shrink-0 w-6 sm:w-8 text-center`}>{item.step}</span>
                                    <div className="flex-1">
                                        <div className="flex items-start gap-1.5 sm:gap-2 mb-1.5">
                                            <span className="text-lg sm:text-xl shrink-0">{item.icon}</span>
                                            <p className={`text-xs sm:text-base break-keep leading-relaxed ${item.highlight ? 'font-bold text-white' : 'text-slate-200 font-semibold'} sm:mt-0.5`}>{item.text}</p>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-100 break-keep leading-relaxed ml-6 sm:ml-7 font-medium">{item.sub}</p>
                                    </div>
                                </div>
                                {item.extra}
                                {item.img && (
                                    <div className="mt-1 sm:mt-2 ml-[36px] sm:ml-[56px] overflow-hidden rounded-lg border border-slate-700/50 bg-slate-900">
                                        <Image src={item.img} alt={`step ${item.step}`} width={600} height={300} className="w-full h-auto object-cover" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 마무리 배너 */}
                    <div className="mt-6 bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/30 border-2 border-purple-500/50 rounded-2xl p-6 text-center shadow-xl">
                        <p className="text-2xl mb-2">🎉</p>
                        <p className="font-black text-xl text-white mb-1">여기까지 완료하셨다면</p>
                        <p className="font-black text-2xl bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent mb-4">3주차 루시드 육성 숙제 완벽 완료!</p>
                        <div className="bg-white/10 border border-white/20 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-white break-keep leading-relaxed font-medium text-center inline-block">
                            이번 주는 <strong className="text-yellow-300 text-sm sm:text-base underline underline-offset-4 decoration-yellow-500/50">6차 스킬로 카벨을 완벽하게 제압</strong>하고,<br className="hidden sm:block" />
                            악몽의 숲 3단계 던전을 돌아 <strong className="text-green-300">유니크 이상 아이템을 득템</strong>하세요!
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 5. 스펙업 / 6차 스킬 ===== */}
                <section id="specup" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center shrink-0">
                            <Gem className="w-5 h-5 text-yellow-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300">[스펙업] 6차 스킬 개방과 카벨 찢기! 💎</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="relative bg-gradient-to-r from-yellow-900/50 to-amber-900/30 border-2 border-yellow-500/50 rounded-2xl p-5 overflow-hidden ring-1 ring-yellow-500/20">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full" />
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center font-black text-white text-base shrink-0">🔓</span>
                                <h3 className="font-bold text-base sm:text-lg text-yellow-200">45레벨 달성 → 6차 스킬 자동 해금!</h3>
                            </div>
                            <p className="text-sm sm:text-base text-white break-keep leading-relaxed ml-11 font-medium">
                                3주차의 진짜 보상은 바로 <strong className="text-yellow-300">45레벨에 열리는 6차 스킬</strong>입니다. 동선을 꼬이지 않게 잘 따라오셨다면, 주간 미션 클리어가 끝날 즈음에 자연스럽게 45레벨이 달성되며 6차 스킬이 해금됩니다.
                            </p>
                        </div>

                        <div className="relative bg-slate-800/60 border border-slate-500/30 rounded-2xl p-5 overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-slate-500/10 rounded-bl-full" />
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-black text-white text-base shrink-0">⚔️</span>
                                <h3 className="font-bold text-base sm:text-lg text-red-300">지난주 카벨 못 잡으셨나요? 이제 찢어버릴 시간!</h3>
                            </div>
                            <ul className="space-y-2 text-sm text-white ml-11 font-medium">
                                <li className="break-keep">• 지난주 카벨을 못 잡으셨다고요? 이제 압도적인 화력의 <strong className="text-yellow-300">6차 스킬</strong>을 꽂아 넣고 카벨을 가볍게 찢어버리시면 됩니다.</li>
                                <li className="break-keep">• <strong className="text-slate-300">&apos;루시드&apos;는 &apos;하드 루시드&apos;</strong>이기 때문에 어려울 수 있습니다. 3주차는 사실상 6차를 배워 카벨을 잡을 수 있는 주간입니다.</li>
                                <li className="break-keep text-slate-300">• 무리해서 &apos;루시드&apos;를 잡기보다는, 이번 주는 <strong className="text-white">카벨까지만 잡고 60레벨을 향해 달려가는 주간</strong>이라고 생각하시면 좋습니다.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 6. 팩트체크 ===== */}
                <section id="level-check" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-500/20 border border-blue-500/50 flex items-center justify-center shrink-0">
                            <HelpCircle className="w-5 h-5 text-blue-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-300">[팩트 체크] &quot;이번 주에 60레벨 찍을 수 있나요?&quot; 📊</h2>
                    </div>

                    <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/30 border border-blue-500/30 rounded-2xl p-5 sm:p-6 mb-4">
                        <p className="text-sm sm:text-base text-slate-200 break-keep leading-relaxed mb-4">
                            <span className="text-yellow-300 font-bold">&quot;이번 주에 60레벨 찍고 4단계 숲 간다&quot;</span>는 분들이 계신데, 수학적으로 100% 불가능합니다.
                        </p>
                        <div className="bg-red-900/30 border border-red-500/40 rounded-xl p-4 mb-4">
                            <p className="font-black text-red-300 text-base sm:text-lg">🚫 진실: 레전드리 장비+결정 다 챙겨 먹고 제일 앞서나가는 진짜 운좋은 유저들도 이번 주 최대 레벨은 <span className="text-white">Lv. 51~52</span> 선에서 멈춥니다.</p>
                        </div>
                        <div className="bg-green-900/30 border border-green-500/40 rounded-xl p-4 mb-4">
                            <p className="text-green-100 break-keep leading-relaxed font-medium">
                                ✅ <strong className="text-white">이번 3주차의 핵심 목표</strong>는 <strong className="text-yellow-300 text-base">45레벨을 달성하여 루시드 6차 스킬을 해금</strong>하는 것입니다!
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 border-2 border-green-500/50 rounded-xl p-4 text-center">
                                <p className="text-green-300 font-bold text-base mb-2">✅ 동선 완벽 실천 시</p>
                                <p className="text-2xl font-black text-white mb-1">Lv. 48~50</p>
                                <p className="text-xs text-green-300 break-keep font-medium">6차 스킬 해금 + 주간 미션 완주 + 유니크 장비</p>
                            </div>
                            <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/30 border border-yellow-500/50 rounded-xl p-4 text-center">
                                <p className="text-yellow-400 font-bold text-base mb-2">👑 운 좋은 유저 (레전드리 풀착)</p>
                                <p className="text-2xl font-black text-yellow-300 mb-1">Lv. 51~52</p>
                                <p className="text-xs text-yellow-500 break-keep">레전드리 장비+결정 모두 획득 시 최대</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-4 text-center">
                        <p className="text-sm sm:text-base text-purple-200 break-keep font-medium">
                            조급해하지 마세요! 꾸준히 동선 지켜서 하시면<br className="hidden sm:block" />
                            <strong className="text-white"> 모두 최종 100레벨 이상을 충분히 달성할 수 있습니다.</strong>
                        </p>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* CTA */}
                <section className="mb-8">
                    <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border-2 border-purple-500/50 rounded-xl p-4 sm:p-8 text-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">체인지 버닝: 루시드 더 자세히 알아보기</h3>
                        <p className="text-sm sm:text-base text-slate-100 mb-6 break-keep">
                            1주차, 2주차 공략과 기본 가이드도 함께 확인해보세요!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/blog/change-burning-lucid-week2-guide">
                                <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold rounded-xl transition-all shadow-xl hover:-translate-y-1">
                                    🦋 2주차 공략 보기
                                </button>
                            </Link>
                            <Link href="/blog/change-burning-lucid-week1-guide">
                                <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-bold rounded-xl transition-all hover:-translate-y-1">
                                    🦋 1주차 공략 보기
                                </button>
                            </Link>
                            <Link href="/blog/change-burning-lucid-guide">
                                <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-bold rounded-xl transition-all hover:-translate-y-1">
                                    🦋 루시드 이벤트 기본 가이드
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* SEO Keywords */}
                <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-wrap gap-x-4 gap-y-2 justify-center">
                    {[
                        '체인지버닝루시드', '루시드3주차', '메이플23주년', '루시드이벤트',
                        '몽환의시련', '악몽의숲3단계', '드림이터', '몽환의결정', '몽환의장비',
                        '루시드공략', '루시드45레벨', '루시드6차스킬', '드림캐쳐', '루시드3주차공략',
                        '메이플이벤트공략', '루시드변신', '체인지버닝', '악몽의숲유니크',
                        '악몽의드림캐쳐', '장비파편', '결정합성', '루시드폭풍레벨업',
                        '루시드40레벨', '루시드895만EXP', '6차스킬해금', '카오스벨룸',
                    ].map((keyword) => (
                        <span key={keyword} className="text-slate-500 text-xs sm:text-sm hover:text-purple-400 transition-colors cursor-default">#{keyword}</span>
                    ))}
                </div>
            </main>
        </div>
    );
}
