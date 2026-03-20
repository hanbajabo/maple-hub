'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, AlertCircle, CheckCircle2, Flame, Sword, Gem, RefreshCw, Layers, Clock, Star, ShieldAlert, Zap, ChevronRight } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function ChangeBurningLucidWeek1GuidePage() {
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
                        <span className="text-sm sm:text-base text-slate-400">2026년 3월 20일</span>
                        <span className="text-slate-600">|</span>
                        <span className="text-xs sm:text-sm text-purple-400 font-medium">이벤트 가이드</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight flex flex-col sm:gap-1">
                        <div>
                            <span className="text-2xl sm:text-3xl mr-1 sm:mr-2">🦋</span>
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                                체인지 버닝: 루시드 1주차
                            </span>
                        </div>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent pl-2 sm:pl-[42px]">
                            완벽 공략 &amp; 꿀팁 대방출
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-6 leading-relaxed break-keep">
                        이번 23주년을 맞아 역대급 혜택과 함께 찾아온 '체인지 버닝: 루시드' 이벤트! 직접 루시드가 되어 육성하고 엄청난 보상까지 챙길 수 있는 기회입니다.
                    </p>

                    {/* 긴급 CTA 배너 */}
                    <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 border-2 border-amber-500/70 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 shadow-xl shadow-amber-900/30">
                        <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-black text-amber-300 text-base sm:text-lg mb-1">⚠️ 지금 바로 해야 할 것!</p>
                            <p className="text-sm sm:text-base text-amber-100 break-keep">
                                주말에 몰아서 해야겠다 하시는 분들도 <strong className="text-white underline">체인지 버닝 지정만큼은 지금 당장 해두세요!</strong> 악몽의 숲 입장권이 매일 5개씩 충전되기 때문에, 지정이 늦어지면 그만큼 <span className="text-red-300 font-bold">완전 손해</span>입니다!
                            </p>
                        </div>
                    </div>
                </div>

                {/* 목차 */}
                <nav className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-5 mb-10">
                    <p className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">목차</p>
                    <ul className="space-y-2 text-sm sm:text-base">
                        {[
                            { href: '#week1-summary', label: '1주차 핵심 9단계 요약', icon: '📝' },
                            { href: '#firstday-guide', label: '첫날 진행 순서 상세', icon: '📌' },
                            { href: '#caution', label: '초특급 주의사항', icon: '🚨' },
                            { href: '#weekly-homework', label: '주간 숙제 완벽 요약', icon: '⚔️' },
                            { href: '#boss-tips', label: '보스전 꿀팁 (자쿰/벨룸)', icon: '👹' },
                            { href: '#specup', label: '몽환의 장비 & 결정 세팅법', icon: '💎' },
                        ].map(item => (
                            <li key={item.href}>
                                <a href={item.href} className="flex items-center gap-2 text-slate-300 hover:text-purple-300 transition-colors group">
                                    <ChevronRight className="w-4 h-4 text-purple-500 group-hover:translate-x-1 transition-transform shrink-0" />
                                    <span>{item.icon} {item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* 1. 1주차 핵심 9단계 요약 */}
                <section id="week1-summary" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center shrink-0">
                            <Star className="w-5 h-5 text-purple-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-300">바쁜 분들을 위한 1주차 핵심 9단계 요약</h2>
                    </div>
                    <p className="text-slate-400 text-sm mb-5 ml-1">이것만 순서대로 따라 하시면 1주차 숙제 끝입니다!</p>

                    <div className="space-y-3">
                        {[
                            { step: 1, icon: '👾', text: '드림 이터 25,000마리 우선 전부 잡기', color: 'from-indigo-900/50 to-indigo-800/30', border: 'border-indigo-500/40', badge: 'text-indigo-300', img: '/images/blog/change-burning-lucid/step1.png' },
                            { step: 2, icon: '⚔️', text: '몽환의 시련 입장 → 카오스 자쿰 잡기', color: 'from-red-900/40 to-red-800/20', border: 'border-red-500/30', badge: 'text-red-300', img: '/images/blog/change-burning-lucid/step2.png' },
                            { step: 3, icon: '🎁', text: '몽환의 시련 → 자쿰 탭 우측 하단의 루시드 보상 \'의문의 몽환의 결정 상자(에픽)\' 받기', color: 'from-orange-900/40 to-orange-800/20', border: 'border-orange-500/30', badge: 'text-orange-300', img: '/images/blog/change-burning-lucid/step3.png' },
                            { step: 4, icon: '📦', text: '\'의문의 몽환의 결정 상자(에픽)\' 열고, 루시드 드림 시즌 미션 클리어 확인하기', color: 'from-yellow-900/40 to-yellow-800/20', border: 'border-yellow-500/30', badge: 'text-yellow-300', img: '/images/blog/change-burning-lucid/step4.png' },
                            { step: 5, icon: '🌲', text: '레벨 20 달성 후 악몽의 숲 2단계 25번 이번 주 안에 전부 돌기 (주간 미션 클리어 조건!)', color: 'from-green-900/40 to-green-800/20', border: 'border-green-500/30', badge: 'text-green-300', img: '/images/blog/change-burning-lucid/step5.png' },
                            { step: 6, icon: '💎', text: '악몽의 숲에서 먹은 좋은 아이템(장비)에 몽환의 결정 장착한 후 착용하기', color: 'from-cyan-900/40 to-cyan-800/20', border: 'border-cyan-500/30', badge: 'text-cyan-300', img: '/images/blog/change-burning-lucid/step6.png' },
                            { step: 7, icon: '🔨', text: '장착하고 남은 장비는 장비 분해를 통해 전부 \'몽환의 장비 파편\'으로 바꾸기!', color: 'from-slate-800/60 to-slate-700/30', border: 'border-slate-500/30', badge: 'text-slate-300', img: '/images/blog/change-burning-lucid/step7.png' },
                            { step: 8, icon: '🔄', text: '남은 몽환의 결정들은 모아서 합성하기', color: 'from-purple-900/40 to-purple-800/20', border: 'border-purple-500/30', badge: 'text-purple-300', img: '/images/blog/change-burning-lucid/step8.png' },
                            { step: 9, icon: '✨', text: '합성 중에 좋은 옵션의 결정이 뜨면 다시 아이템에 장착해서 착용하기! → 1주차 끝!', color: 'from-pink-900/50 to-pink-800/30', border: 'border-pink-500/50', badge: 'text-pink-300', highlight: true, img: '/images/blog/change-burning-lucid/step9.png' },
                        ].map(item => (
                            <div key={item.step} className={`flex flex-col gap-2 sm:gap-3 bg-gradient-to-r ${item.color} border ${item.border} rounded-xl p-3 sm:p-4 ${item.highlight ? 'ring-1 ring-pink-500/30' : ''}`}>
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <span className={`font-black text-lg sm:text-2xl ${item.badge} shrink-0 w-6 sm:w-8 text-center`}>{item.step}</span>
                                    <div className="flex items-start gap-1.5 sm:gap-2">
                                        <span className="text-lg sm:text-xl shrink-0">{item.icon}</span>
                                        <p className={`text-xs sm:text-base break-keep leading-relaxed ${item.highlight ? 'font-bold text-white' : 'text-slate-200'} sm:mt-0.5`}>{item.text}</p>
                                    </div>
                                </div>
                                {item.img && (
                                    <div className="mt-1 sm:mt-2 ml-[36px] sm:ml-[56px] overflow-hidden rounded-lg border border-slate-700/50 bg-slate-900">
                                        <Image src={item.img} alt={`step ${item.step}`} width={600} height={300} className="w-full h-auto object-cover" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* 2. 첫날 진행 순서 */}
                <section id="firstday-guide" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shrink-0">
                            <Zap className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-300">1주차 육성 가이드라인 상세 (첫날 진행 순서)</h2>
                    </div>
                    <p className="text-sm text-slate-300 mb-5 ml-1 leading-relaxed break-keep">
                        첫날은 아래 순서대로 진행하시면 꼬이는 일 없이 미션과 보상을 깔끔하게 챙기며 <strong className="text-white">22레벨</strong> 정도로 마무리하실 수 있습니다.
                    </p>

                    <div className="relative">
                        {/* 타임라인 선 */}
                        <div className="absolute left-[22px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 hidden sm:block" />

                        <div className="space-y-4">
                            {[
                                {
                                    num: 1,
                                    color: 'bg-indigo-500',
                                    title: '드림 이터 25,000마리 우선 처치',
                                    desc: '약 2시간 소요',
                                    tag: '⏱ 약 2시간',
                                    tagColor: 'text-indigo-300 bg-indigo-900/50 border-indigo-500/40',
                                    content: null,
                                },
                                {
                                    num: 2,
                                    color: 'bg-red-500',
                                    title: '17레벨 달성 후: 이벤트 UI → 몽환의 시련 → 자쿰(카오스) 처치',
                                    tag: '🏆 17레벨 조건',
                                    tagColor: 'text-red-300 bg-red-900/50 border-red-500/40',
                                    content: (
                                        <p className="text-sm text-amber-200 bg-amber-900/30 border border-amber-500/40 rounded-lg px-3 py-2 mt-2 break-keep">
                                            ※ 입장 시 필요한 <strong>'불의 눈'</strong>은 루시드 인벤토리가 아닌 <strong className="text-white">'일반 인벤토리'</strong>로 들어옵니다!
                                        </p>
                                    ),
                                },
                                {
                                    num: 3,
                                    color: 'bg-orange-500',
                                    title: '자쿰 처치 후 몽환의 시련 → 자쿰 탭 우측 하단에서 루시드 보상 수령',
                                    tag: '🎁 보상 수령',
                                    tagColor: 'text-orange-300 bg-orange-900/50 border-orange-500/40',
                                    content: null,
                                },
                                {
                                    num: 4,
                                    color: 'bg-yellow-500',
                                    title: '일반 인벤토리에서 \'의문의 몽환의 결정 상자 (에픽)\' 오픈!',
                                    tag: '📦 상자 오픈',
                                    tagColor: 'text-yellow-300 bg-yellow-900/50 border-yellow-500/40',
                                    content: null,
                                },
                                {
                                    num: 5,
                                    color: 'bg-green-500',
                                    title: '루시드 드림 → 미션 확인 → 시즌 미션에서 \'몽환의 결정(에픽) 획득\' 클리어 확인',
                                    tag: '✅ 미션 체크',
                                    tagColor: 'text-green-300 bg-green-900/50 border-green-500/40',
                                    content: null,
                                },
                                {
                                    num: 6,
                                    color: 'bg-cyan-500',
                                    title: '20레벨 달성 후: 악몽의 숲 2단계 5회 클리어',
                                    tag: '🌲 20레벨 조건',
                                    tagColor: 'text-cyan-300 bg-cyan-900/50 border-cyan-500/40',
                                    content: null,
                                },
                                {
                                    num: 7,
                                    color: 'bg-purple-500',
                                    title: '루시드 드림 → 드림 기프트 → 20레벨 보상 \'몽환의 장비 선택 상자 (에픽)\' 수령 후 오픈!',
                                    tag: '🎁 20레벨 보상',
                                    tagColor: 'text-purple-300 bg-purple-900/50 border-purple-500/40',
                                    content: null,
                                },
                                {
                                    num: 8,
                                    color: 'bg-pink-500',
                                    title: '시즌 미션에서 \'몽환의 장비 아이템(에픽) 획득\' 클리어 확인',
                                    tag: '✅ 미션 체크',
                                    tagColor: 'text-pink-300 bg-pink-900/50 border-pink-500/40',
                                    content: null,
                                },
                            ].map(item => (
                                <div key={item.num} className="flex gap-2 sm:gap-4">
                                    <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-full ${item.color} text-white font-black text-sm sm:text-base flex items-center justify-center shrink-0 z-10 shadow-md sm:shadow-lg`}>
                                        {item.num}
                                    </div>
                                    <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-3 sm:p-4">
                                        <div className="flex flex-wrap items-start gap-2 mb-1">
                                            <span className={`text-[10px] sm:text-xs font-bold border rounded-full px-2 sm:px-2.5 py-0.5 ${item.tagColor} shrink-0`}>{item.tag}</span>
                                        </div>
                                        <p className="text-xs sm:text-base text-slate-200 break-keep leading-relaxed font-medium">{item.title}</p>
                                        {item.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* 3. 초특급 주의사항 */}
                <section id="caution" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center justify-center shrink-0">
                            <ShieldAlert className="w-5 h-5 text-red-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-400">초특급 주의사항 🚨</h2>
                    </div>

                    <div className="bg-gradient-to-r from-red-900/50 to-rose-900/40 border-2 border-red-500/60 rounded-2xl p-4 sm:p-6 shadow-xl shadow-red-900/30">
                        <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
                            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-black text-white text-base sm:text-lg mb-3">드림 기프트 '악몽의 드림캐쳐 교환권' 절대 바로 쓰지 마세요!</p>
                                <p className="text-sm sm:text-base text-red-100 break-keep leading-relaxed">
                                    드림 기프트 보상에 있는 <strong className="text-yellow-300">'악몽의 드림캐쳐 교환권'</strong>은 절대 바로 쓰지 마시고,
                                    <strong className="text-white"> 80레벨 달성 이후에 몰아서</strong> 털어주세요!
                                </p>
                                <div className="mt-3 bg-black/30 rounded-xl p-3 text-sm text-red-200">
                                    <p>💡 <strong className="text-white">이유:</strong> 레벨 단계가 오를수록 (20 → 40 → 60 → <span className="text-yellow-300 font-bold">80레벨</span>) 악몽의 숲 보상 등급이 훨씬 높아집니다!</p>
                                    <p className="mt-1">80레벨 이후에 사용해야 최고 등급 보상을 받을 수 있습니다.</p>
                                </div>
                                <div className="mt-4 overflow-hidden rounded-xl border-2 border-red-500/30">
                                    <Image src="/images/blog/change-burning-lucid/caution.png" alt="악몽의 드림캐쳐 교환권 주의사항" width={800} height={400} className="w-full h-auto object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. 주간 숙제 */}
                <section id="weekly-homework" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-300">주간 숙제 완벽 요약 ⚔️</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* 주간 숙제 1 */}
                        <div className="bg-slate-800/60 border border-indigo-500/40 rounded-2xl p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                                <h3 className="font-bold text-base sm:text-lg text-indigo-300">매주 드림 이터 25,000마리 처치</h3>
                            </div>
                            <ul className="space-y-2.5 text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                                    <span><strong className="text-white">소요 시간:</strong> 약 2시간 (4소재)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                    <span className="break-keep"><strong className="text-amber-300">주의:</strong> 25,000마리를 다 잡고 나면 사냥터에서 변신이 <strong className="text-white">불가능</strong>해집니다! 마릿수는 <strong className="text-white">매주 목요일 25,000마리씩 추가</strong>됩니다.</span>
                                </li>
                                <li className="mt-3 bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-3 break-keep">
                                    💡 <strong className="text-indigo-200">꿀팁:</strong> 드림 이터는 별개로 소환되는 몬스터라 추가 경험치/드롭률 효과를 받지 않습니다. 일반 몬스터는 그대로 나오니 <strong className="text-white">평소 본 캐릭터 사냥용 도핑만</strong> 하시면 됩니다!
                                </li>
                            </ul>
                        </div>

                        {/* 주간 숙제 2 */}
                        <div className="bg-slate-800/60 border border-green-500/40 rounded-2xl p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                                <h3 className="font-bold text-base sm:text-lg text-green-300">매주 악몽의 숲 25회 완료</h3>
                            </div>
                            <ul className="space-y-2.5 text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                    <span className="break-keep"><strong className="text-red-300">입장 조건:</strong> 악몽의 숲은 무조건 드림 이터 25,000마리를 먼저 다 잡은 후에 진행하세요!</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Layers className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                                    <span><strong className="text-white">입장권:</strong> 매일 5개씩 지급, 최대 <strong className="text-yellow-300">30개</strong>까지만 충전</span>
                                </li>
                            </ul>

                            {/* 티켓 관리 꿀팁 */}
                            <div className="mt-4 bg-green-900/20 border border-green-500/30 rounded-xl p-3 text-sm">
                                <p className="font-bold text-green-300 mb-2 flex items-center gap-1.5">💡 핵심 꿀팁 (티켓 관리법)</p>
                                <ul className="space-y-1.5 text-slate-300 text-xs sm:text-sm">
                                    <li>• 던전 단계: 20 / 40 / 60 / <strong className="text-yellow-300">80레벨</strong> 마다 보상 등급 UP</li>
                                    <li>• 루시드 드림 주간 미션을 위해 <strong className="text-white">매주 25번</strong>은 필수</li>
                                    <li>• 25번 미션 완료 후 <strong className="text-white">80레벨 달성 전까지</strong>는 티켓을 모아두기</li>
                                    <li>• <strong className="text-yellow-300">티켓이 30개 꽉 찼을 때</strong>만 하루 5개씩 소모 → 초과 손실 방지!</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 주간 미션 요약 테이블 */}
                    <div className="mt-5 overflow-x-auto rounded-xl border border-slate-700 bg-slate-900/40">
                        <table className="w-full text-[10px] sm:text-sm text-left min-w-[260px]">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3 border-b border-slate-700">주간 숙제</th>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3 text-center border-b border-slate-700">횟수/물량</th>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3 text-center border-b border-slate-700">소요시간</th>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3 border-b border-slate-700">초기화</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                <tr>
                                    <td className="px-2 py-2 sm:px-4 sm:py-3 font-medium text-indigo-300 break-keep">드림 이터 처치</td>
                                    <td className="px-2 py-2 sm:px-4 sm:py-3 text-center text-white font-bold whitespace-nowrap">25,000마리</td>
                                    <td className="px-2 py-2 sm:px-4 sm:py-3 text-center break-keep">약 2시간</td>
                                    <td className="px-2 py-2 sm:px-4 sm:py-3 text-slate-400 break-keep">매주 목요일</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 sm:px-4 sm:py-3 font-medium text-green-300 break-keep">악몽의 숲 클리어</td>
                                    <td className="px-2 py-2 sm:px-4 sm:py-3 text-center text-white font-bold whitespace-nowrap">25회</td>
                                    <td className="px-2 py-2 sm:px-4 sm:py-3 text-center break-keep">5일 자동충전</td>
                                    <td className="px-2 py-2 sm:px-4 sm:py-3 text-slate-400 break-keep">매주 목요일</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 sm:px-4 sm:py-3 font-medium text-red-300 break-keep">카오스 자쿰 처치</td>
                                    <td className="px-2 py-2 sm:px-4 sm:py-3 text-center text-white font-bold whitespace-nowrap">1회</td>
                                    <td className="px-2 py-2 sm:px-4 sm:py-3 text-center break-keep">약 7~8분</td>
                                    <td className="px-2 py-2 sm:px-4 sm:py-3 text-slate-400 break-keep">매주 목요일</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* 5. 보스전 꿀팁 */}
                <section id="boss-tips" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center justify-center shrink-0">
                            <Flame className="w-5 h-5 text-red-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-300">보스전 꿀팁 및 현황 (자쿰 / 벨룸) 👹</h2>
                    </div>

                    <div className="space-y-4">
                        {/* 자쿰 */}
                        <div className="bg-slate-800/60 border border-red-500/30 rounded-2xl p-5">
                            <h3 className="font-bold text-base sm:text-lg text-red-300 mb-3 flex items-center gap-2">
                                <Sword className="w-5 h-5" />
                                카오스 자쿰 공략 (1주차)
                            </h3>
                            <ul className="space-y-2 text-sm text-slate-200">
                                <li className="flex items-start gap-2">
                                    <span className="text-slate-500 shrink-0 mt-0.5">•</span>
                                    <span><strong className="text-white">소요 시간:</strong> 17레벨 기준 약 <strong className="text-yellow-300">7~8분</strong> 소요</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-slate-500 shrink-0 mt-0.5">•</span>
                                    <span className="break-keep"><strong className="text-white">핵심 공략:</strong> 가장 중요한 건 <strong className="text-red-300">양쪽 팔이 다 부서지지 않도록 조절</strong>하면서 딜을 넣는 것입니다!</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-slate-500 shrink-0 mt-0.5">•</span>
                                    <span className="break-keep"><strong className="text-white">길드 노블레스 스킬:</strong> 노블 스킬을 써도 데미지에 변화가 <strong className="text-red-300">없는 것으로 확인</strong>되었습니다. (사용/미사용 데미지 동일)</span>
                                </li>
                            </ul>
                        </div>

                        {/* 벨룸 - 보류 */}
                        <div className="bg-gradient-to-r from-slate-800/60 to-slate-900/60 border border-orange-500/40 rounded-2xl p-5">
                            <h3 className="font-bold text-base sm:text-lg text-orange-300 mb-3 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                카오스 벨룸 — 현재 트라이 보류 권장
                            </h3>
                            <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-4 text-sm break-keep">
                                <p className="text-orange-100 leading-relaxed">
                                    <strong className="text-white">유니크 / 유니크 결정 2개를 착용</strong>한 캐릭터도 카벨 잡기가 힘들었습니다.
                                    <br /><br />
                                    <strong className="text-yellow-300">1~2주차 스펙으로는 사실상 클리어 불가</strong>에 가까우니 무리하지 마세요!
                                </p>
                            </div>
                            <div className="mt-4 overflow-hidden rounded-xl border border-orange-500/30">
                                <Image src="/images/blog/change-burning-lucid/vellum-failed.png" alt="카오스 벨룸 유니크 세팅 트라이 한계" width={800} height={400} className="w-full h-auto object-cover" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. 스펙업: 몽환의 장비 & 결정 */}
                <section id="specup" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center shrink-0">
                            <Gem className="w-5 h-5 text-yellow-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300">1주차 스펙업의 꽃: 몽환의 장비 & 결정 세팅법 💎</h2>
                    </div>

                    <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed break-keep ml-1">
                        악몽의 숲과 시즌 미션을 열심히 미셨다면 이제 루시드를 강력하게 만들어줄 스펙업을 할 차례입니다!
                        <strong className="text-white"> 다음 4단계 사이클</strong>만 기억하시면 됩니다.
                    </p>

                    <div className="space-y-6">
                        {/* Step 1 */}
                        <div className="relative bg-slate-800/60 border border-yellow-500/30 rounded-2xl p-5 overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full" />
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center font-black text-slate-900 text-base shrink-0">1</span>
                                <h3 className="font-bold text-base sm:text-lg text-yellow-300">몽환의 장비에 좋은 '결정' 장착하기</h3>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-200 ml-11">
                                <li className="break-keep">• 악몽의 숲 보상이나 레벨 달성 보상으로 얻은 <strong className="text-yellow-200">'몽환의 장비(에픽 등급 이상)'</strong>를 준비합니다.</li>
                                <li className="break-keep">• 빈 슬롯에 <strong className="text-white">가장 옵션이 좋은 결정 (스킬 쿨타임 감소, 크리티컬 데미지, 마력 등)</strong>을 골라 장착!</li>
                            </ul>
                            <div className="mt-3 ml-11 bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-3 text-sm text-yellow-100 break-keep">
                                💡 <strong className="text-yellow-200">안심 장착 꿀팁:</strong> 몽환의 결정은 장착 후에도 <strong className="text-white">언제든지 자유롭게 해제 가능</strong>합니다! 한 번 박으면 끝이 아니니, 좋은 결정이 보이면 바로바로 교체하세요.
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative bg-slate-800/60 border border-purple-500/30 rounded-2xl p-5 overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-bl-full" />
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-black text-white text-base shrink-0">2</span>
                                <h3 className="font-bold text-base sm:text-lg text-purple-300">남은 결정들은 모아서 '합성'하기</h3>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-200 ml-11">
                                <li className="break-keep">• 옵션이 맘에 들지 않거나 낮은 등급의 결정도 <strong className="text-red-300">절대 버리지 마세요!</strong></li>
                                <li className="break-keep">• <strong className="text-white">같은 등급의 몽환의 결정 3개 합성</strong> → 확률적으로 <strong className="text-purple-300">한 단계 상위 등급</strong> 획득</li>
                            </ul>
                            <div className="mt-3 ml-11 bg-purple-900/20 border border-purple-500/30 rounded-xl p-3 text-sm">
                                <p className="text-purple-200 font-medium">예시: 에픽 결정 3개 <RefreshCw className="inline w-3 h-3 mx-1" /> → <span className="text-yellow-300 font-bold">유니크 결정</span> 획득 도전!</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative bg-slate-800/60 border border-pink-500/30 rounded-2xl p-5 overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/10 rounded-bl-full" />
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-black text-white text-base shrink-0">3</span>
                                <h3 className="font-bold text-base sm:text-lg text-pink-300">대박 옵션이 떴다면 즉시 장착!</h3>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-200 ml-11">
                                <li className="break-keep">• 합성해서 <strong className="text-yellow-300">유니크 등급 이상</strong>의 유효 옵션 결정이 나왔다면? 지체하지 말고 바로 장착!</li>
                                <li className="break-keep">• 장비 등급과 관계없이 모든 등급의 결정을 끼울 수 있고, <strong className="text-white">동일 등급 중복 장착도 가능!</strong></li>
                            </ul>
                        </div>

                        {/* Step 4 */}
                        <div className="relative bg-slate-800/60 border border-cyan-500/30 rounded-2xl p-5 overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full" />
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-black text-slate-900 text-base shrink-0">4</span>
                                <h3 className="font-bold text-base sm:text-lg text-cyan-300">잉여 장비는 분해해서 '파편' 모으기 → 1주차 끝!</h3>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-200 ml-11">
                                <li className="break-keep">• 장착하고 남은 쓸모없는 장비들은 모두 분해 → <strong className="text-cyan-300">'몽환의 장비 파편'</strong>으로 변환!</li>
                                <li className="break-keep">• 파편으로 몽환의 장비 <strong className="text-white">스타포스 강화</strong> 또는 <strong className="text-white">새 장비 제작</strong> 가능</li>
                            </ul>
                            <div className="mt-3 ml-11 bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-3 text-sm text-cyan-100 break-keep">
                                💡 <strong className="text-cyan-200">추천 전략:</strong> 지금 당장 쓰기보다는 파편을 <strong className="text-white">많이 모아두었다가</strong>, 유니크 이상의 고급 장비가 나왔을 때 강화 재료로 아낌없이 사용하는 것을 강력 추천!
                            </div>
                        </div>
                    </div>

                    {/* 최종 완료 배너 */}
                    <div className="mt-6 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-indigo-600/30 border-2 border-purple-500/50 rounded-2xl p-6 text-center shadow-xl">
                        <p className="text-2xl mb-2">🎉</p>
                        <p className="font-black text-xl text-white mb-1">여기까지 완료하셨다면</p>
                        <p className="font-black text-2xl bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">1주차 루시드 육성 숙제 완벽 완료!</p>
                    </div>

                    {/* 추가 꿀팁 */}
                    <div className="mt-8 space-y-4">

                        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-5">
                            <h3 className="text-base sm:text-lg font-bold text-green-300 mb-2 sm:mb-3 flex items-center gap-2">
                                🧪 도핑 꿀팁
                            </h3>
                            <p className="text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
                                드림 이터는 별개로 소환되는 몬스터라 <strong className="text-green-200">추가 경험치/드롭률 효과를 받지 않습니다.</strong> 일반 몬스터는 그대로 나오니 <strong className="text-white">평소 재획하듯이 본 캐릭터 사냥용 도핑</strong>만 하시면 됩니다.
                            </p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* CTA */}
                <section className="mb-8">
                    <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border-2 border-purple-500/50 rounded-xl p-4 sm:p-8 text-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">체인지 버닝: 루시드 더 자세히 알아보기</h3>
                        <p className="text-sm sm:text-base text-slate-300 mb-6 break-keep">
                            23주년 모든 이벤트 상세 정보와 최단기 보상 스케줄을 확인해보세요!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/blog/testworld-23rd-anniversary">
                                <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold rounded-xl transition-all shadow-xl hover:-translate-y-1">
                                    🍁 23주년 이벤트 총정리 보기
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
                        '체인지버닝루시드', '루시드1주차', '메이플23주년', '루시드이벤트',
                        '몽환의시련', '악몽의숲', '드림이터', '몽환의결정', '몽환의장비',
                        '루시드공략', '루시드스킬트리', '카오스자쿰', '드림캐쳐',
                        '메이플이벤트공략', '메이플1주차', '루시드변신', '체인지버닝',
                        '드림기프트', '악몽의드림캐쳐', '장비파편', '결정합성'
                    ].map((keyword) => (
                        <span key={keyword} className="text-slate-500 text-xs sm:text-sm hover:text-purple-400 transition-colors cursor-default">#{keyword}</span>
                    ))}
                </div>
            </main>
        </div>
    );
}
