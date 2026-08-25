'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
    ArrowLeft, 
    Sparkles, 
    Flame, 
    ShieldAlert, 
    Skull, 
    Swords, 
    Crown, 
    BookOpen, 
    Quote,
    Eye,
    Zap,
    HeartHandshake,
    Globe,
    CheckCircle2,
    Award
} from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function GerandDarmoorStoryPart4Page() {
    return (
        <div className="min-h-screen bg-[#07060e] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200 pb-24 font-sans leading-relaxed">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-amber-950/20 rounded-full blur-[140px] pointer-events-none z-0" />
            <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[130px] pointer-events-none z-0" />
            <div className="fixed bottom-10 left-10 w-[450px] h-[450px] bg-purple-950/15 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* Header */}
            <header className="w-full max-w-7xl flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-[#07060e]/90 backdrop-blur-md border-b border-slate-800/80 mx-auto">
                <Link 
                    prefetch={false} 
                    href="/blog" 
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity text-amber-400 font-semibold group text-sm"
                >
                    <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    <span>블로그 홈으로</span>
                </Link>
                <span className="text-xs px-3 py-1 bg-amber-950/60 border border-amber-800/60 text-amber-300 rounded-full font-medium">
                    그란디스 스토리 시리즈 (완결)
                </span>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 relative z-10">
                {/* Series Navigation Banner */}
                <div className="mb-8 p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center justify-between gap-2 overflow-x-auto text-xs">
                    <Link 
                        prefetch={false}
                        href="/blog/gerand-darmoor-story-part-1"
                        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800/60 whitespace-nowrap"
                    >
                        <span>🥀 1부: 피의 정원사</span>
                    </Link>
                    <div className="h-4 w-px bg-slate-700/60" />
                    <Link 
                        prefetch={false}
                        href="/blog/gerand-darmoor-story-part-2"
                        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800/60 whitespace-nowrap"
                    >
                        <span>🗡️ 2부: 힘의 포식자</span>
                    </Link>
                    <div className="h-4 w-px bg-slate-700/60" />
                    <Link 
                        prefetch={false}
                        href="/blog/gerand-darmoor-story-part-3"
                        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800/60 whitespace-nowrap"
                    >
                        <span>🌌 3부: 신학자 애런</span>
                    </Link>
                    <div className="h-4 w-px bg-slate-700/60" />
                    <div className="flex items-center gap-1.5 text-amber-300 font-bold bg-amber-950/60 border border-amber-700/50 px-3 py-1.5 rounded-lg whitespace-nowrap">
                        <span>👑 4부: 대규모 선별 (최종장)</span>
                    </div>
                </div>

                {/* Title Section */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-amber-500/15 text-amber-400 text-xs font-bold rounded-full border border-amber-500/30">
                            메이플 이야기
                        </span>
                        <span className="px-3 py-1 bg-red-500/15 text-red-300 text-xs font-bold rounded-full border border-red-500/30">
                            제른 다르모어 4부 (최종장)
                        </span>
                        <span className="text-slate-400 text-xs ml-1">
                            2026년 8월 25일 · 7분 읽기
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight break-keep text-white">
                        👑 <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-purple-300 bg-clip-text text-transparent">
                            제른 다르모어 스토리 완벽 분석 4부
                        </span>
                        <br />
                        <span className="text-xl sm:text-2xl md:text-3xl text-slate-200 font-bold mt-2 block">
                            대규모 선별과 10명의 사도, 그리고 오버시어 (최종장)
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed border-l-4 border-amber-500 pl-5 py-2 bg-amber-950/20 rounded-r-xl">
                        대적자까지 자신의 판 위로 올려놓은 제른 다르모어. 
                        소모품으로 쓰이고 버려지는 10인의 사도들, 울티마 폴리스의 <strong className="text-amber-300 font-bold">&apos;대규모 선별&apos;</strong>, 생명의 탑 정상에서의 결전, 그리고 창조주 <strong className="text-red-300 font-bold">오버시어의 강림</strong>을 선언하는 대서사시의 클라이맥스를 총정리합니다.
                    </p>
                </div>

                {/* 핵심 요약 카드 */}
                <div className="mb-12 bg-gradient-to-br from-slate-900/90 via-amber-950/30 to-slate-900/90 border border-amber-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700/50">
                        <Award className="w-6 h-6 text-amber-400" />
                        <h2 className="text-lg font-black text-white">4부(최종장) 핵심 관전 포인트</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                            <span className="text-slate-400 block mb-1">사도들의 실체</span>
                            <span className="text-red-300 font-bold">언제든 버려질 10인의 소모품</span>
                        </div>
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                            <span className="text-slate-400 block mb-1">토사구팽 사례</span>
                            <span className="text-rose-300 font-bold">도원경 사도 카링의 비참한 최후</span>
                        </div>
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                            <span className="text-slate-400 block mb-1">미션 울티마</span>
                            <span className="text-amber-300 font-bold">울티마 폴리스 대규모 선별(휴거)</span>
                        </div>
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                            <span className="text-slate-400 block mb-1">최종 목표</span>
                            <span className="text-purple-300 font-bold">창조주 오버시어의 지상 강림</span>
                        </div>
                    </div>
                </div>

                {/* ──────────────────────────────────────────────── */}
                {/* 도입부 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-900/80 to-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-center gap-2">
                            <Globe className="w-6 h-6 text-amber-400" />
                            마지막 가지치기: 대규모 선별의 막이 오르다
                        </h2>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                            대적자라는 가장 거대한 변수까지 완벽하게 자신의 판 위로 올려놓은 제른 다르모어.
                            이제 그는 오랫동안 품어왔던 자신의 원대한 꿈, <strong className="text-amber-300">&apos;대규모 선별(The Great Selection)&apos;</strong>을 본격적인 실행에 옮기기 시작합니다.
                        </p>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                            이 거대한 가지치기를 위해, 다르모어는 자신이 거느린 10명의 최정예 간부... <strong className="text-red-400">&apos;사도&apos;</strong>들을 전 세계에 풀어놓습니다.
                        </p>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 장면 1: 소모품에 불과한 10명의 사도 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-red-900/40 border border-red-700/50">
                            <Skull className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">SCENE 01</span>
                            <h2 className="text-xl sm:text-2xl font-black text-white">소모품에 불과한 10명의 사도</h2>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        {/* 2단 이미지: 사도 집결 & 카링의 토사구팽 */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950 flex flex-col">
                                <div className="relative w-full h-56 sm:h-64">
                                    <Image 
                                        src="/images/blog/darmoor/apostles-all.webp"
                                        alt="제른 다르모어의 10인의 사도"
                                        fill
                                        className="object-cover object-center"
                                    />
                                </div>
                                <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-center text-xs text-red-300 font-medium">
                                    👥 한 명 한 명이 군단장에 필적하는 괴물들이나, 다르모어에겐 장기말일 뿐
                                </div>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950 flex flex-col">
                                <div className="relative w-full h-56 sm:h-64">
                                    <Image 
                                        src="/images/blog/darmoor/kaling.webp"
                                        alt="도원경에서 버려진 사도 카링"
                                        fill
                                        className="object-contain object-center"
                                    />
                                </div>
                                <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-center text-xs text-rose-300 font-medium">
                                    🥀 이용 가치가 끝나자 대적자의 먹잇감으로 버려진 사도 &apos;카링&apos;
                                </div>
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            다르모어의 사도들은 한 명 한 명이 대적자나 군단장에 필적하는 괴물 같은 강자들입니다.
                            하지만 다르모어에게 이들은, <strong className="text-red-400">그저 쓰다 버릴 &apos;소모품&apos;이자 장기말</strong>에 불과했습니다.
                        </p>

                        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
                            <h3 className="text-sm font-bold text-white mb-1">🎭 도원경 카링의 비참한 토사구팽</h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                도원경을 쑥대밭으로 만들며 대적자를 몰아붙였던 사도 <strong className="text-rose-300">&apos;카링&apos;</strong>. 
                                그녀는 자신이 다르모어의 선택받은 사도라는 맹목적인 자부심에 취해 있었습니다.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                하지만 이용 가치가 끝나자, 다르모어는 카링의 등 뒤로 교묘하게 판을 짜서 그녀를 철저히 대적자의 먹잇감으로 던져버립니다. 
                                카링은 죽어 영혼이 흩어지는 그 마지막 순간까지도 자신이 토사구팽당했다는 사실조차 깨닫지 못했습니다.
                            </p>
                            <p className="text-xs text-slate-400 italic">
                                자신을 위해 육체마저 버리고 충성하는 기사단장 발드릭스 정도를 제외하면, 림보나 앱실론 같은 나머지 사도들 역시 언제든 쓰레기통에 버려질 운명이었습니다.
                            </p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* ──────────────────────────────────────────────── */}
                {/* 장면 2: 심판의 날, 미션 울티마 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-amber-900/40 border border-amber-700/50">
                            <Sparkles className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">SCENE 02</span>
                            <h2 className="text-xl sm:text-2xl font-black text-white">심판의 날, 미션 울티마</h2>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        {/* 이미지: 울티마 폴리스 생명의 탑 */}
                        <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950">
                            <div className="relative w-full h-64 sm:h-80">
                                <Image 
                                    src="/images/blog/darmoor/tower-of-life.webp"
                                    alt="울티마 폴리스와 생명의 탑"
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>
                            <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-center text-xs text-amber-300 font-medium">
                                🏙️ 그란디스 중부 거대 도시 &apos;울티마 폴리스&apos;와 생명의 탑에서 펼쳐진 대규모 선별
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            시간이 흘러, 마침내 그란디스 중부의 거대 도시 <strong className="text-white">&apos;울티마 폴리스&apos;</strong>에 사도들이 집결합니다.
                            사도 <strong className="text-indigo-300">&apos;이미르&apos;</strong>의 강력한 환영 마법이 도시 전체를 돔처럼 뒤덮고... 사람들의 머릿속에 끔찍한 질문이 울려 퍼지기 시작합니다.
                        </p>

                        <div className="bg-gradient-to-r from-slate-950 via-amber-950/40 to-slate-950 border border-amber-500/40 rounded-2xl p-6 text-center shadow-lg">
                            <Quote className="w-8 h-8 text-amber-400/50 mx-auto mb-2" />
                            <p className="text-base sm:text-xl text-amber-200 font-black italic mb-1 break-keep">
                                &ldquo;당신은... 스스로를 희생할 것인가?&rdquo;
                            </p>
                            <span className="text-xs text-slate-400 font-mono">가치 있는 생명만을 가려내는 피의 정원사의 시험</span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 text-xs">
                            <div className="bg-slate-950/70 border border-red-900/40 rounded-xl p-4">
                                <div className="font-bold text-red-400 mb-1">이기적인 자들</div>
                                <p className="text-slate-300">자신의 안위만 챙기려던 자들은 가차 없이 버려지고 솎아내어짐</p>
                            </div>
                            <div className="bg-slate-950/70 border border-amber-500/40 rounded-xl p-4">
                                <div className="font-bold text-amber-300 mb-1">선별자 (가치 있는 생명)</div>
                                <p className="text-slate-300">타인을 위해 자신을 내던진 자들만 하늘 위의 마법진으로 승천하여 다르모어의 징표를 부여받음</p>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* ──────────────────────────────────────────────── */}
                {/* 장면 3: 탑 정상의 격돌, 그리고 거두어진 심판 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-purple-900/40 border border-purple-700/50">
                            <Swords className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">SCENE 03</span>
                            <h2 className="text-xl sm:text-2xl font-black text-white">탑 정상의 격돌, 그리고 거두어진 심판</h2>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            대규모 선별이 끝을 향해 가던 그때, 대적자가 생명의 탑 정상에 도달해 제른 다르모어의 앞을 가로막습니다.
                        </p>

                        <div className="bg-gradient-to-r from-slate-950 via-rose-950/40 to-slate-950 border border-rose-500/40 rounded-2xl p-6 text-center shadow-lg">
                            <Quote className="w-8 h-8 text-rose-400/50 mx-auto mb-2" />
                            <p className="text-sm sm:text-base text-white font-bold italic mb-2 break-keep">
                                &ldquo;이 세계는, 너무나도 많은 생명을 품고 있다. 썩은 뿌리가 대지를 오염시키듯, 가치 없는 생명은 진정한 생명의 자리를 빼앗고 있어. 나는 그것을 바로잡을 것이다.&rdquo;
                            </p>
                            <span className="text-xs text-slate-400 font-mono">— 제른 다르모어, 생명의 탑 정상에서</span>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            다르모어는 완성된 <strong className="text-amber-300">&apos;세계의 심장(심판의 빛)&apos;</strong>을 꺼내 들어 대적자의 신의 창과 정면으로 격돌합니다.
                            탑 전체가 붕괴할 듯한 거대한 충돌 속에서, 다르모어는 돌연 심판을 거두어버립니다.
                        </p>

                        <div className="bg-slate-950/80 border-l-4 border-amber-400 p-4 rounded-r-xl text-xs sm:text-sm text-amber-200">
                            <strong>🌱 &ldquo;서두를 것 없다. 씨앗은 이미 뿌려졌으니... 세계는 스스로 변화할 것이다.&rdquo;</strong>
                            <br />
                            그는 대적자와의 진정한 결전을 뒤로 미룬 채, 선별을 통과한 자들을 이끌고 자신의 근거지 아보리스로 유유히 사라집니다.
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 장면 4: 아웃트로, 오버시어의 강림 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-purple-900/40 border border-purple-700/50">
                            <Crown className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">SCENE 04</span>
                            <h2 className="text-xl sm:text-2xl font-black text-white">아보리스 신왕실, 그리고 오버시어의 강림</h2>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        {/* 이미지: 미션 울티마 챕터 3 아보리스 옥좌 */}
                        <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950">
                            <div className="relative w-full h-64 sm:h-80">
                                <Image 
                                    src="/images/blog/darmoor/mission-ultima-chapter3.webp"
                                    alt="아보리스 신왕실과 제른 다르모어"
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>
                            <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-center text-xs text-purple-300 font-medium">
                                👑 아보리스 옥좌에서 사도들에게 창조주 오버시어의 강림을 선포하는 제른 다르모어
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            폭풍이 휩쓸고 간 뒤, 아보리스 신왕실.
                            그곳에 살아남은 사도들이 모두 한자리에 집결합니다.
                            침묵이 감도는 옥좌 위에서, 제른 다르모어는 사도들을 내려다보며 온 세상을 뒤흔들 묵직한 명령을 내립니다.
                        </p>

                        <div className="bg-gradient-to-r from-red-950 via-purple-950 to-slate-950 border-2 border-red-500/60 rounded-2xl p-6 text-center shadow-2xl">
                            <span className="text-xs text-red-300 font-bold uppercase tracking-widest block mb-2">
                                THE FINAL DECLARATION
                            </span>
                            <p className="text-lg sm:text-2xl font-black text-white leading-snug">
                                &ldquo;그대들에게 명한다.
                                <br />
                                준비하라... <span className="text-red-400 underline decoration-red-500">오버시어의 강림</span>을.&rdquo;
                            </p>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            세계의 창조주인 오버시어를 지상으로 끌어내려, 신들의 질서마저 완벽하게 끝장내려는 제른 다르모어.
                            자신이 구원받았던 그 얄궂은 운명의 손으로, 대적자는 과연 이 압도적인 정원사의 가위질을 멈출 수 있을까요?
                            <br />
                            그란디스를 피로 물들일 진짜 전쟁은... 이제 막 서막을 올렸을 뿐입니다.
                        </p>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 전 시리즈 4부작 완결 요약 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <h2 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-amber-400" />
                        제른 다르모어 대서사시 4부작 완결 요약
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3 text-xs">
                        <Link prefetch={false} href="/blog/gerand-darmoor-story-part-1" className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 hover:border-red-500/50 hover:bg-slate-800/40 transition-all group">
                            <div className="text-red-400 font-bold mb-1">🥀 1부: 피의 정원사</div>
                            <div className="font-bold text-white group-hover:text-red-300 mb-1">자기혐오에 빠진 왕자, 피의 정원사가 되다</div>
                            <p className="text-slate-400">마력 날개 절단, 아샤의 희생과 선대 신왕 타락, 하이레프 내전의 완벽한 설계</p>
                        </Link>
                        <Link prefetch={false} href="/blog/gerand-darmoor-story-part-2" className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all group">
                            <div className="text-indigo-400 font-bold mb-1">🗡️ 2부: 힘의 포식자</div>
                            <div className="font-bold text-white group-hover:text-indigo-300 mb-1">힘의 포식자, 신들의 시대를 끝내다</div>
                            <p className="text-slate-400">고대 우든레프의 신 봉인, 크로니카 시간 강탈, 매그너스 굴복과 헬리시움 함락</p>
                        </Link>
                        <Link prefetch={false} href="/blog/gerand-darmoor-story-part-3" className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 hover:border-purple-500/50 hover:bg-slate-800/40 transition-all group">
                            <div className="text-purple-400 font-bold mb-1">🌌 3부: 신학자 애런</div>
                            <div className="font-bold text-white group-hover:text-purple-300 mb-1">신학자 애런, 그리고 대적자를 구원하다</div>
                            <p className="text-slate-400">세르니움 위장 잠입, 봉인석(신의 창) 파괴와 오버시어의 족쇄 해방</p>
                        </Link>
                        <div className="bg-amber-950/30 border border-amber-500/50 rounded-xl p-4">
                            <div className="text-amber-400 font-bold mb-1">👑 4부: 대규모 선별 (완결)</div>
                            <div className="font-bold text-white mb-1">대규모 선별과 10명의 사도, 그리고 오버시어</div>
                            <p className="text-slate-300">카링의 토사구팽, 울티마 폴리스 대규모 선별, 오버시어 지상 강림 선포</p>
                        </div>
                    </div>
                </section>

                {/* 관련 스토리/가이드 */}
                <section>
                    <h2 className="text-base sm:text-lg font-black text-white mb-4 flex items-center gap-2">
                        <span>📚</span> 관련 업데이트 &amp; 보스 공략
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Link 
                            prefetch={false} 
                            href="/blog/testworld-update-1-2-205" 
                            className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 hover:border-red-500/50 hover:bg-slate-800/50 transition-all group"
                        >
                            <div className="text-xs text-red-400 mb-1 font-semibold">업데이트 소식</div>
                            <div className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">
                                ⚔️ 다르모어의 사도 벨로나 &amp; 마스터라벨 개편
                            </div>
                        </Link>
                        <Link 
                            prefetch={false} 
                            href="/blog/august-2026-update-schedule" 
                            className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 hover:border-amber-500/50 hover:bg-slate-800/50 transition-all group"
                        >
                            <div className="text-xs text-amber-400 mb-1 font-semibold">업데이트 소식</div>
                            <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                                📅 8월 업데이트 일정 완벽 정리 (미션 울티마 챕터3)
                            </div>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
