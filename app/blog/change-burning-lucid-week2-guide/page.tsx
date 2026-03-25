'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, AlertCircle, Gem, RefreshCw, Star, ShieldAlert, Zap, ChevronRight, HelpCircle, Target } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function ChangeBurningLucidWeek2GuidePage() {
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
                        <span className="text-sm sm:text-base text-slate-300">2026년 3월 27일</span>
                        <span className="text-slate-500">|</span>
                        <span className="text-xs sm:text-sm text-purple-400 font-medium">이벤트 가이드</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight flex flex-col sm:gap-1">
                        <div>
                            <span className="text-2xl sm:text-3xl mr-1 sm:mr-2">🦋</span>
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                                체인지 버닝: 루시드 2주차
                            </span>
                        </div>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent pl-2 sm:pl-[42px]">
                            완벽 공략 &amp; 1주차 필수 복습!
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-slate-100 mb-6 leading-relaxed break-keep">
                        본격적인 2주차 공략에 들어가기 앞서, 루시드 육성이 꼬이지 않기 위해 무조건 지켜야 하는 <strong className="text-white">'1주차 핵심 기본기' 3가지</strong>부터 확실하게 짚고 넘어가겠습니다. 이 세 가지만 명심해도 절대 손해 볼 일은 없습니다!
                    </p>

                    {/* 긴급 CTA 배너 */}
                    <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 border-2 border-amber-500/70 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 shadow-xl shadow-amber-900/30">
                        <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-black text-amber-300 text-base sm:text-lg mb-1">⚠️ 2주차 핵심 체크!</p>
                            <p className="text-sm sm:text-base text-amber-100 break-keep">
                                입장권이 최대 30개까지만 충전되므로 매일 5개씩 소모하는 것을 잊지 마세요. <strong className="text-white underline">교환권은 80레벨까지 절대 사용 금지!</strong>
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
                            { href: '#level-check', label: '"내 레벨이 낮은 이유" 팩트 체크', icon: '🤔' },
                            { href: '#level40', label: '[2주차의 핵심] 40레벨 가능하다!', icon: '🚨' },
                            { href: '#week2-summary', label: '2주차 완벽 동선 5단계', icon: '⚔️' },
                            { href: '#specup', label: '2주차 스펙업 핵심 전략', icon: '💎' },
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
                                    <p className="font-black text-indigo-200 text-base sm:text-lg mb-1">원칙 1. 무조건 '드림 이터 25,000마리'부터 다 잡고 시작하기!</p>
                                    <p className="text-xs sm:text-sm text-slate-200 font-black">절대 규칙</p>
                                </div>
                            </div>
                            <p className="text-sm sm:text-base text-white font-medium break-keep leading-relaxed ml-9">
                                매주 목요일이 되면 다른 숙제 다 제쳐두고 필드에서 드림 이터 25,000마리부터 꽉 채우세요.
                            </p>
                            <div className="mt-3 ml-9 bg-indigo-900/40 border border-indigo-500/30 rounded-xl p-3 text-sm break-keep">
                                <p className="text-indigo-200 leading-relaxed">
                                    🔥 <strong className="text-white">소름 돋는 팩트:</strong> 드림 이터를 사냥하다 보면 <strong className="text-yellow-300">'악몽의 끄나풀'</strong>과 <strong className="text-yellow-300">'악몽의 근원'</strong>이 자연스럽게 함께 스폰되어 잡힙니다. 이 사냥 과정만으로 얻는 순수 확정 경험치가 무려 <strong className="text-white text-base">895,000 EXP</strong>입니다!
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
                                    <p className="font-black text-green-200 text-base sm:text-lg mb-1">원칙 2. 악몽의 숲 입장권은 '주간 25회'까지만! 교환권은 존버!</p>
                                    <p className="text-xs sm:text-sm text-slate-400 font-semibold">절대 규칙</p>
                                </div>
                            </div>
                            <p className="text-sm sm:text-base text-white font-medium break-keep leading-relaxed ml-9">
                                매일 5개씩 충전되는 기본 입장권으로 주간 미션(25회 클리어)만 채우세요.
                            </p>
                            <div className="mt-3 ml-9 space-y-2">
                                <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-3 text-sm break-keep">
                                    <p className="text-green-100 leading-relaxed">
                                        💡 <strong className="text-white">핵심 꿀팁:</strong> 이벤트 보상으로 주는 <strong className="text-yellow-300">'악몽의 드림캐쳐 교환권'</strong>은 지금 절대 쓰시면 안 됩니다! 루시드 레벨이 오를수록(40, 60, 80레벨) 악몽의 숲 보상 등급이 확 달라집니다.
                                    </p>
                                </div>
                                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3 text-sm break-keep">
                                    <p className="text-red-100 leading-relaxed">
                                        🚨 교환권은 무조건 <strong className="text-yellow-300">80레벨 달성 이후</strong> 최고 효율일 때 몰아서 터뜨리세요. (단, 기본 충전 티켓이 30개 꽉 차서 날아가지 않게만 매일 소모해 주세요.)
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
                                    <p className="font-black text-orange-200 text-base sm:text-lg mb-1">원칙 3. 보스 처치 후 '보상 수령 + 상자 오픈'까지가 진짜 숙제 끝!</p>
                                    <p className="text-xs sm:text-sm text-slate-400 font-semibold">절대 규칙</p>
                                </div>
                            </div>
                            <p className="text-sm sm:text-base text-white font-medium break-keep leading-relaxed ml-9">
                                몽환의 시련에서 카오스 자쿰이나 벨룸을 잡았다면 거기서 끝이 아닙니다.
                            </p>
                            <div className="mt-3 ml-9 bg-orange-900/30 border border-orange-500/30 rounded-xl p-3 text-sm break-keep">
                                <p className="text-orange-100 leading-relaxed">
                                    ✅ <strong className="text-white">필수 확인:</strong> 자쿰 탭 우측 하단의 <strong className="text-yellow-300">'루시드 보상'</strong>을 꼭 수령하고, 인벤토리에서 그 상자를 직접 열어야만 시즌 미션(결정 획득)이 완료되며 막대한 경험치가 들어옵니다.
                                </p>
                                <p className="text-red-300 font-bold mt-2">"어? 보스 잡았는데 경험치 안 오르네?" 하시는 분들, 상자 안 까신 겁니다!</p>
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

                {/* ===== 2. 레벨 차이 팩트 체크 ===== */}
                <section id="level-check" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-500/20 border border-blue-500/50 flex items-center justify-center shrink-0">
                            <HelpCircle className="w-5 h-5 text-blue-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-300">[팩트 체크] "내 루시드 레벨은 왜 남들보다 낮을까?" 🤔</h2>
                    </div>

                    <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/30 border border-blue-500/30 rounded-2xl p-5 sm:p-6 mb-4">
                        <p className="text-sm sm:text-base text-slate-200 break-keep leading-relaxed mb-4">
                            혹시 커뮤니티나 영상을 보시고 <span className="text-yellow-300 font-bold">"어? 저 사람은 28레벨인데 나는 왜 24~25레벨이지? 내가 숙제를 뭐 빼먹었나?"</span> 하고 불안해하시는 분들 계신가요?
                        </p>
                        <div className="bg-green-900/30 border border-green-500/40 rounded-xl p-4 mb-4">
                            <p className="font-black text-green-300 text-base sm:text-lg">✅ 정답: 지극히 정상입니다! 여러분이 숙제를 덜 하신 게 절대 아닙니다.</p>
                        </div>
                        <p className="text-sm sm:text-base text-slate-200 break-keep leading-relaxed">
                            레벨 차이가 나는 유일한 이유는 바로 <strong className="text-yellow-300">'시즌 미션 운빨'</strong> 때문입니다.
                        </p>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-4">
                        <p className="font-bold text-white mb-3">🌟 레벨 차이의 비밀</p>
                        <p className="text-sm sm:text-base text-slate-200 break-keep leading-relaxed mb-4">
                            운 좋게 악몽의 숲이나 <strong className="text-white">장비 합성</strong>에서 <strong className="text-yellow-300">'유니크 장비'</strong>나 <strong className="text-yellow-300">'유니크 결정'</strong>을 먹은 분들은, 해당 시즌 미션이 자동으로 클리어되면서 경험치를 무려 <strong className="text-white text-base">70만 EXP(40만+30만)</strong>나 공짜로 더 받은 겁니다.
                        </p>
                        <div className="mb-4 overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900">
                            <Image src="/images/blog/change-burning-lucid/unique-mission-proof.png" alt="유니크 장비 및 결정 획득 미션 클리어 예시" width={800} height={300} className="w-full h-auto object-cover" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-3 text-center">
                                <p className="text-xs text-slate-400 mb-1">에픽까지만 먹은 평범한 유저</p>
                                <p className="text-2xl font-black text-white">Lv. 24~25</p>
                                <p className="text-xs text-slate-400 mt-1">1주차 평균 정배</p>
                            </div>
                            <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/30 border border-yellow-500/50 rounded-xl p-3 text-center">
                                <p className="text-xs text-yellow-400 mb-1">유니크 장비+결정 다 먹은 운 좋은 유저</p>
                                <p className="text-2xl font-black text-yellow-300">Lv. 28</p>
                                <p className="text-xs text-yellow-500 mt-1">시즌 미션 추가 경험치 70만 EXP</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-4 text-center">
                        <p className="text-sm sm:text-base text-purple-200 break-keep font-medium">
                            지금 25레벨 언저리에 있다고 조급해하거나 찝찝해하실 필요 전혀 없습니다!<br className="hidden sm:block" />
                            <strong className="text-white"> 꾸준히 하시면 어차피 다 같이 100레벨 찍게 되어 있습니다.</strong>
                        </p>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 3. 40레벨 대반전 ===== */}
                <section id="level40" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center shrink-0">
                            <ShieldAlert className="w-5 h-5 text-yellow-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300">[2주차의 핵심] 40레벨 찍을 수 있을까? 🚨</h2>
                    </div>

                    {/* 핵심 결론 */}
                    <div className="bg-gradient-to-r from-yellow-900/60 to-amber-900/50 border-2 border-yellow-500/60 rounded-2xl p-5 sm:p-6 mb-5 shadow-xl shadow-yellow-900/30">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl shrink-0">👑</span>
                            <p className="text-sm sm:text-base text-yellow-100 break-keep leading-relaxed font-bold">
                                "2주차 40레벨 돌파의 유일한 마스터키는 바로 <span className="text-white text-lg">'카오스 벨룸'</span>입니다!"
                            </p>
                        </div>
                    </div>

                    {/* 카벨 EXP 설명 */}
                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-5">
                        <p className="text-sm sm:text-base text-white break-keep leading-relaxed mb-4 font-medium">
                            카오스 벨룸을 처치하면 보상으로 <strong className="text-yellow-300">'의문의 몽환의 결정 상자(유니크)'</strong>를 확정 지급합니다.
                        </p>
                        <div className="bg-green-900/30 border border-green-500/40 rounded-xl p-4 mb-4">
                            <p className="text-white break-keep leading-relaxed text-sm sm:text-base font-medium">
                                💡 <strong className="text-yellow-300">카벨 처치(50만 EXP) + 유니크 결정 획득 미션(30만 EXP)</strong> = 도합 <strong className="text-white text-lg underline underline-offset-4">80만 EXP</strong>가 확정으로 지급됩니다.
                            </p>
                        </div>
                        <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900">
                            <Image src="/images/blog/change-burning-lucid/vellum-exp-proof.jpg" alt="카오스 벨룸 격파 보상 및 경험치 증거" width={800} height={400} className="w-full h-auto object-cover" />
                        </div>
                    </div>

                    {/* 카벨 격파 여부에 따른 운명 */}
                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-5">
                        <p className="font-bold text-white mb-4">📊 카벨 격파 여부에 따른 2주차 운명</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/30 border-2 border-green-500/50 rounded-xl p-4 text-center">
                                <p className="text-green-300 font-bold text-base mb-2">✅ 카벨 격파 성공</p>
                                <p className="text-2xl font-black text-white mb-1">Lv. 40~41</p>
                                <p className="text-xs text-green-300 break-keep font-medium">운빨과 상관없이 무조건 40레벨 돌파!</p>
                            </div>
                            <div className="bg-gradient-to-br from-slate-800/70 to-slate-700/40 border border-slate-600 rounded-xl p-4 text-center">
                                <p className="text-slate-300 font-bold text-base mb-2">⏸ 카벨 격파 보류</p>
                                <p className="text-2xl font-black text-slate-400 mb-1">Lv. ~37</p>
                                <p className="text-xs text-slate-500 break-keep">경험치 부족으로 37레벨 부근에서 마무리</p>
                            </div>
                        </div>
                    </div>

                    {/* 결론 */}
                    <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/30 border-2 border-green-500/50 rounded-2xl p-5">
                        <p className="font-black text-green-300 text-base sm:text-lg mb-2 flex items-center gap-2">
                            <Target className="w-5 h-5" />
                            🎯 결론 및 목표
                        </p>
                        <p className="text-sm sm:text-base text-white break-keep leading-relaxed font-medium">
                            자신의 스펙과 컨트롤로 카벨을 잡을 수 있다면 <strong className="text-yellow-300">무조건 잡아서 40레벨을 뚫으세요!</strong> 하지만 딜이 부족해 못 잡는 분들이라도 전혀 스트레스받으실 필요 없습니다. 편안하게 <strong className="text-white font-bold text-lg underline underline-offset-4">37레벨 주차</strong>를 하시면, <span className="text-green-300">다음 주에 드림 이터 사냥과 주간 미션을 클리어하면 40레벨 이상을 만들 수 있습니다.</span>
                        </p>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 4. 2주차 완벽 동선 5단계 ===== */}
                <section id="week2-summary" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shrink-0">
                            <Zap className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-300 leading-tight">
                            2주차 가이드라인: 순서가 생명!<br />
                            완벽 동선 5단계 ⚔️
                        </h2>
                    </div>

                    {/* 주의사항 배너 */}
                    <div className="bg-gradient-to-r from-red-900/50 to-rose-900/40 border-2 border-red-500/60 rounded-2xl p-4 sm:p-5 mb-6 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <p className="text-sm sm:text-base text-red-100 break-keep font-bold">
                            [매우 중요] 이번 주 카벨을 잡으실 분들은 <strong className="text-white underline">절대 악몽의 숲부터 입장하지 마세요!</strong>
                        </p>
                    </div>

                    <div className="space-y-3">
                        {[
                            {
                                step: 1,
                                icon: '👾',
                                text: '드림 이터 25,000마리 우선 전부 잡기',
                                sub: '사냥 과정에서 끄나풀, 근원이 포함되어 89.5만 EXP가 확정 수급됩니다! 무조건 사냥부터 끝내세요.',
                                color: 'from-indigo-900/50 to-indigo-800/30',
                                border: 'border-indigo-500/40',
                                badge: 'text-indigo-300',
                                img: '/images/blog/change-burning-lucid/step1.png',
                                highlight: false,
                                extra: null as React.ReactNode,
                            },
                            {
                                step: 2,
                                icon: '👑',
                                text: '[핵심] 카오스 벨룸 격파 및 보상 상자 오픈!',
                                sub: (
                                    <span>
                                        본인 스펙이 된다면 <strong className="text-white">카벨을 잡고 '유니크 상자'를 열어 <span className="text-yellow-300 underline underline-offset-4 decoration-yellow-500/50">경험치 80만 폭탄</span></strong>을 받으세요.<br />
                                        이 순간 당신은 <strong className="text-white">36~37레벨이 될 것입니다.</strong>
                                    </span>
                                ) as any,
                                color: 'from-yellow-900/50 to-amber-900/30',
                                border: 'border-yellow-500/50',
                                badge: 'text-yellow-300',
                                img: '/images/blog/change-burning-lucid/vellum-exp-proof.jpg',
                                highlight: false,
                                extra: (
                                    <div className="mt-2 ml-[36px] sm:ml-[56px] bg-slate-700/40 border border-slate-600 rounded-xl p-3 text-xs sm:text-sm text-slate-300 break-keep">
                                        ※ 스펙이 부족해 못 잡으시는 분들은 이 단계를 패스하고 바로 3번으로 넘어가시면 됩니다.
                                    </div>
                                ),
                            },
                            {
                                step: 3,
                                icon: '🌲',
                                text: '악몽의 숲 25번 이번 주 안에 전부 돌기',
                                sub: '기본 충전 티켓만 사용하고 교환권은 킵하세요.',
                                color: 'from-green-900/40 to-green-800/20',
                                border: 'border-green-500/30',
                                badge: 'text-green-300',
                                img: null as string | null,
                                highlight: false,
                                extra: (
                                    <div className="mt-2 ml-[36px] sm:ml-[56px] space-y-2.5">
                                        <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-xl p-2.5 text-xs sm:text-sm text-yellow-100 break-keep font-medium">
                                            👑 악몽의 숲 2단계를 돌다가 <strong className="text-white">유니크 장비</strong>를 먹으면 40레벨이 될 수도 있습니다.<br />
                                            그렇다면 남은 주간 미션 '악몽의 숲 완료' 미션은 <strong className="text-yellow-300">3단계로 진행하세요.</strong><br />
                                            <span className="text-yellow-200/80 text-[11px] sm:text-xs mt-1.5 block leading-relaxed">
                                                (※ 기존에 이미 <strong className="text-white">'유니크 장비'</strong>가 있는 분들은 주간 미션 악몽의 숲 15회 완료까지만 진행해도 레벨 40 달성이 가능합니다. → <strong className="text-yellow-300">남은 10회는 3단계로 진행!</strong>)
                                            </span>
                                        </div>
                                        <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900">
                                            <Image src="/images/blog/change-burning-lucid/dream-catcher-stage3.png" alt="악몽의 숲 3단계 입장 권장" width={600} height={350} className="w-full h-auto object-cover" />
                                        </div>
                                        <div className="bg-slate-700/40 border border-slate-600 rounded-xl p-2.5 text-xs sm:text-sm text-white break-keep">
                                            👤 <strong className="text-white">카벨 패스 유저:</strong> 기존대로 <strong className="text-green-300 font-bold">2단계(20레벨) 숲</strong>에서 도시면 됩니다.
                                        </div>
                                    </div>
                                ),
                            },
                            {
                                step: 4,
                                icon: '✅',
                                text: '주간 미션 15종 올클리어 여부 꼭 확인하기',
                                sub: <strong className="text-yellow-300 underline underline-offset-4 font-black">악몽의 숲 25회 완료 꼭 잊지마세요!</strong> as any,
                                color: 'from-cyan-900/40 to-cyan-800/20',
                                border: 'border-cyan-500/30',
                                badge: 'text-cyan-300',
                                img: '/images/blog/change-burning-lucid/weekly-mission-proof.png',
                                highlight: false,
                                extra: null as React.ReactNode,
                            },
                            {
                                step: 5,
                                icon: '💎',
                                text: '얻은 장비/결정으로 합성 및 스펙업 진행 후 꿀잠 마무리!',
                                sub: '카벨을 패스하신 일반 유저분들은 37레벨 부근에서 편안하게 2주차를 마무리하시면 됩니다!',
                                color: 'from-pink-900/50 to-pink-800/30',
                                border: 'border-pink-500/50',
                                badge: 'text-pink-300',
                                img: '/images/blog/change-burning-lucid/step9.png',
                                highlight: true,
                                extra: null as React.ReactNode,
                            },
                        ].map(item => (
                            <div key={item.step} className={`flex flex-col gap-2 sm:gap-3 bg-gradient-to-r ${item.color} border ${item.border} rounded-xl p-3 sm:p-4 ${item.highlight ? 'ring-1 ring-pink-500/30' : ''}`}>
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
                        <p className="font-black text-2xl bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent mb-4">2주차 루시드 육성 숙제 완벽 완료!</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm mb-5">
                            <span className="text-green-300 font-bold bg-green-900/40 px-3 py-1.5 rounded-lg border border-green-500/30">카벨 성공 🏆 → Lv. 40~41</span>
                            <span className="text-slate-300 px-3 py-1.5 rounded-lg border border-slate-600 bg-slate-800/60">카벨 보류 🦋 → Lv. ~37</span>
                        </div>
                        <div className="bg-white/10 border border-white/20 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-white break-keep leading-relaxed font-medium text-center inline-block">
                            운 좋게 유니크 장비 이상을 먹는 분이 아니라면<br className="hidden sm:block" />
                            이번 주도 웬만해서는 악몽의 숲 2단계를 돌 수밖에 없기 때문에<br className="hidden sm:block" />
                            <strong className="text-yellow-300 text-sm sm:text-base underline underline-offset-4 decoration-yellow-500/50">카벨 잡기가 힘든 분들은 무리해서 잡지 않아도 됩니다!</strong>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ===== 5. 스펙업 전략 ===== */}
                <section id="specup" className="mb-12 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center shrink-0">
                            <Gem className="w-5 h-5 text-yellow-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300">2주차 스펙업의 핵심: 합성 &amp; 파편 존버 💎</h2>
                    </div>

                    <div className="space-y-4">
                        {/* 합성 */}
                        <div className="relative bg-slate-800/60 border border-purple-500/30 rounded-2xl p-5 overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-bl-full" />
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-black text-white text-base shrink-0">1</span>
                                <h3 className="font-bold text-base sm:text-lg text-purple-300">합성, 또 합성!</h3>
                            </div>
                            <ul className="space-y-2 text-sm text-white ml-11 font-medium">
                                <li className="break-keep">• 이제 에픽 등급 결정이 제법 모였을 겁니다. <strong className="text-purple-300">에픽 결정 3개</strong>를 모아 끊임없이 <strong className="text-yellow-300">유니크 결정 합성</strong>에 도전하세요.</li>
                                <li className="break-keep">• <strong className="text-white">1순위 유효 옵션:</strong> 쿨타임 감소, 크리티컬 확률, 마력, 크리티컬 데미지</li>
                            </ul>
                            <div className="mt-3 ml-11 bg-purple-900/20 border border-purple-500/30 rounded-xl p-3 text-sm">
                                <p className="text-purple-200 font-medium">예시: 에픽 결정 3개 <RefreshCw className="inline w-3 h-3 mx-1" /> → <span className="text-yellow-300 font-bold">유니크 결정</span> 획득 도전!</p>
                            </div>
                            <div className="mt-3 ml-11 overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900">
                                <Image src="/images/blog/change-burning-lucid/step8.png" alt="몽환의 결정 합성" width={600} height={300} className="w-full h-auto object-cover" />
                            </div>
                        </div>

                        {/* 분해 */}
                        <div className="relative bg-slate-800/60 border border-slate-500/30 rounded-2xl p-5 overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-slate-500/10 rounded-bl-full" />
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center font-black text-white text-base shrink-0">2</span>
                                <h3 className="font-bold text-base sm:text-lg text-slate-300">쓸모없는 장비는 싹 다 갈갈이 (분해)</h3>
                            </div>
                            <p className="text-sm text-white ml-11 break-keep font-medium">
                                안 쓰는 잉여 장비는 전부 분해해서 <strong className="text-cyan-300">'몽환의 장비 파편'</strong>으로 만드세요.
                            </p>
                            <div className="mt-3 ml-11 overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900">
                                <Image src="/images/blog/change-burning-lucid/step7.png" alt="장비 분해로 파편 획득" width={600} height={300} className="w-full h-auto object-cover" />
                            </div>
                        </div>

                        {/* 파편 존버 */}
                        <div className="relative bg-gradient-to-r from-red-900/40 to-orange-900/30 border-2 border-red-500/50 rounded-2xl p-5 overflow-hidden ring-1 ring-red-500/20">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-bl-full" />
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-black text-white text-base shrink-0">3</span>
                                <h3 className="font-bold text-base sm:text-lg text-red-300">🔥 파편 존버 (제일 중요!)</h3>
                            </div>
                            <ul className="space-y-2 text-sm text-white ml-11 font-medium">
                                <li className="break-keep">• <strong className="text-red-300">지금 당장 에픽 장비 스타포스 올린다고 파편 다 쓰지 마세요!</strong></li>
                                <li className="break-keep">• 40레벨을 찍고 악몽의 숲 상위 구간이 열리면, 거기서 떨어지는 <strong className="text-yellow-300">상위 등급 장비(유니크 이상)</strong>에 파편을 쏟아부어야 합니다.</li>
                                <li className="break-keep text-white font-bold">• 지금은 모아두는 게 돈 버는 겁니다!</li>
                            </ul>
                            <div className="mt-4 ml-11 bg-amber-900/20 border border-amber-500/30 rounded-xl p-3 text-sm text-amber-100 break-keep">
                                💡 루시드의 성장률에 따라서 유니크에 강화를 조금 할지, 후반에 레전드리를 얻어 파편을 사용할지는 계속 분석해서 알려드리겠습니다. <strong className="text-white">일단은 무조건 파편 모으기!</strong>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* CTA */}
                <section className="mb-8">
                    <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border-2 border-purple-500/50 rounded-xl p-4 sm:p-8 text-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">체인지 버닝: 루시드 더 자세히 알아보기</h3>
                        <p className="text-sm sm:text-base text-slate-100 mb-6 break-keep">
                            1주차 공략과 기본 가이드도 함께 확인해보세요!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/blog/change-burning-lucid-week1-guide">
                                <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold rounded-xl transition-all shadow-xl hover:-translate-y-1">
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
                        '체인지버닝루시드', '루시드2주차', '메이플23주년', '루시드이벤트',
                        '몽환의시련', '악몽의숲', '드림이터', '몽환의결정', '몽환의장비',
                        '루시드공략', '카오스벨룸', '카오스자쿰', '드림캐쳐', '루시드2주차공략',
                        '메이플이벤트공략', '루시드변신', '체인지버닝',
                        '드림기프트', '악몽의드림캐쳐', '장비파편', '결정합성',
                        '루시드40레벨', '루시드895만EXP', '루시드파편존버', '카벨80만EXP',
                    ].map((keyword) => (
                        <span key={keyword} className="text-slate-500 text-xs sm:text-sm hover:text-purple-400 transition-colors cursor-default">#{keyword}</span>
                    ))}
                </div>
            </main>
        </div>
    );
}
