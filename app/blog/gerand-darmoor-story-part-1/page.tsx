'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
    ArrowLeft, 
    ArrowRight,
    Sparkles, 
    Flame, 
    HeartHandshake, 
    Skull, 
    Swords, 
    Crown, 
    Feather, 
    AlertTriangle, 
    BookOpen, 
    Compass, 
    Quote
} from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function GerandDarmoorStoryPart1Page() {
    return (
        <div className="min-h-screen bg-[#07060e] text-slate-100 selection:bg-red-500/30 selection:text-red-200 pb-24 font-sans leading-relaxed">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none z-0" />
            <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-purple-950/20 rounded-full blur-[130px] pointer-events-none z-0" />
            <div className="fixed bottom-10 left-10 w-[450px] h-[450px] bg-amber-950/15 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* Header */}
            <header className="w-full max-w-7xl flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-[#07060e]/90 backdrop-blur-md border-b border-slate-800/80 mx-auto">
                <Link 
                    prefetch={false} 
                    href="/blog" 
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity text-red-400 font-semibold group text-sm"
                >
                    <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    <span>블로그 홈으로</span>
                </Link>
                <span className="text-xs px-3 py-1 bg-red-950/60 border border-red-800/60 text-red-300 rounded-full font-medium">
                    그란디스 스토리 시리즈
                </span>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 relative z-10">
                {/* Series Navigation Banner */}
                <div className="mb-8 p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center justify-between gap-2 overflow-x-auto text-xs">
                    <div className="flex items-center gap-1.5 text-red-400 font-bold bg-red-950/60 border border-red-700/50 px-3 py-1.5 rounded-lg whitespace-nowrap">
                        <span>🥀 1부: 피의 정원사 (현재)</span>
                    </div>
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
                    <Link 
                        prefetch={false}
                        href="/blog/gerand-darmoor-story-part-4"
                        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800/60 whitespace-nowrap"
                    >
                        <span>👑 4부: 대규모 선별</span>
                    </Link>
                </div>
                {/* Title Section */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-red-500/15 text-red-400 text-xs font-bold rounded-full border border-red-500/30">
                            메이플 이야기
                        </span>
                        <span className="px-3 py-1 bg-purple-500/15 text-purple-300 text-xs font-bold rounded-full border border-purple-500/30">
                            제른 다르모어 1부
                        </span>
                        <span className="text-slate-400 text-xs ml-1">
                            2026년 8월 25일 · 6분 읽기
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight break-keep text-white">
                        🥀 <span className="bg-gradient-to-r from-red-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                            제른 다르모어 스토리 완벽 분석 1부
                        </span>
                        <br />
                        <span className="text-xl sm:text-2xl md:text-3xl text-slate-200 font-bold mt-2 block">
                            자기혐오에 빠진 왕자, 피의 정원사가 되다
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed border-l-4 border-red-500 pl-5 py-2 bg-red-950/20 rounded-r-xl">
                        메이플스토리 2부의 거대한 지배자 <strong className="text-red-300 font-bold">제른 다르모어</strong>. 
                        가장 완벽한 날개를 타고났으나 스스로 날개를 찢어버린 왕자, 그리고 세피로트의 비극부터 하이레프 내전의 완벽한 설계까지—그의 뒤틀린 내면 속으로 깊숙이 들어갑니다.
                    </p>
                </div>

                {/* 메인 대표 이미지 배너 */}
                <div className="mb-10 rounded-2xl overflow-hidden border border-red-500/30 shadow-2xl bg-slate-950 relative group">
                    <div className="relative w-full h-64 sm:h-96">
                        <Image 
                            src="/images/blog/darmoor/darmoor-silhouette.webp"
                            alt="생명의 초월자 제른 다르모어"
                            fill
                            className="object-contain sm:object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07060e] via-transparent to-transparent" />
                    </div>
                    <div className="p-4 sm:p-5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
                        <span className="text-slate-300 font-medium">그란디스의 절대자, 생명의 초월자 제른 다르모어</span>
                        <span className="text-red-400 font-mono">Gerand Darmoor (Transcendent of Life)</span>
                    </div>
                </div>

                {/* 인물 프로필 카드 */}
                <div className="mb-12 bg-gradient-to-br from-slate-900/90 via-red-950/30 to-slate-900/90 border border-red-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700/50">
                        <Crown className="w-6 h-6 text-amber-400" />
                        <h2 className="text-lg font-black text-white">캐릭터 핵심 프로필: 제른 다르모어 (Gerand Darmoor)</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                            <span className="text-slate-400 block mb-1">신분 / 종족</span>
                            <span className="text-white font-bold">하이레프의 왕자 → 생명의 초월자</span>
                        </div>
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                            <span className="text-slate-400 block mb-1">위장 신분</span>
                            <span className="text-amber-300 font-bold">세피로트의 정원사 애런(Aaron)</span>
                        </div>
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                            <span className="text-slate-400 block mb-1">핵심 사상</span>
                            <span className="text-red-300 font-bold">극단적 선민사상 혐오 &amp; 생명 선별</span>
                        </div>
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                            <span className="text-slate-400 block mb-1">이명</span>
                            <span className="text-purple-300 font-bold">피의 정원사, 생명의 지배자</span>
                        </div>
                    </div>
                </div>

                {/* ──────────────────────────────────────────────── */}
                {/* 도입부 비교 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-900/80 to-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-center gap-2">
                            <Swords className="w-6 h-6 text-red-400" />
                            검은 마법사 vs 제른 다르모어: 무엇이 다른가?
                        </h2>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                            메이플스토리 1부의 최종 보스였던 <strong className="text-slate-100">검은 마법사</strong>가 오버시어가 구축한 세상의 <span className="text-amber-300 font-semibold">&apos;시스템과 굴레&apos;</span> 자체를 부수려 했던 거대한 혁명가였다면...
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5">
                                <div className="text-xs font-bold text-slate-400 mb-1 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-slate-500" />
                                    1부 최종 보스 · 검은 마법사
                                </div>
                                <div className="text-base font-black text-slate-200 mb-2">세상의 &apos;시스템&apos;을 파괴하려 한 자</div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    신들이 정해놓은 운명과 초월자의 사슬을 끊기 위해 자기 자신마저 희생양으로 삼으며 인과율을 거부함.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-red-950/40 to-slate-950 border border-red-500/40 rounded-xl p-5">
                                <div className="text-xs font-bold text-red-400 mb-1 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                                    2부 최종 보스 · 제른 다르모어
                                </div>
                                <div className="text-base font-black text-red-300 mb-2">세상의 &apos;생명들&apos;을 솎아내려는 자</div>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    오만과 이기심에 찌든 잡초 같은 생명들을 모조리 짓밟고, 스스로 희생할 줄 아는 고귀한 꽃들만 남기려는 피의 정원사.
                                </p>
                            </div>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 mt-5 italic">
                            놀랍게도, 그는 세상 그 누구보다 <strong className="text-red-300">&apos;선민사상에 찌든 자신의 동족&apos;</strong>을 혐오했습니다.
                        </p>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 장면 1: 오만한 일족, 그리고 찢겨진 날개 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-red-900/40 border border-red-700/50">
                            <Feather className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">SCENE 01</span>
                            <h2 className="text-xl sm:text-2xl font-black text-white">오만한 일족, 그리고 스스로 찢어발긴 마력 날개</h2>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        {/* 이미지: 다르모어 어린 시절 / 마력 날개 */}
                        <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950">
                            <div className="relative w-full h-56 sm:h-80">
                                <Image 
                                    src="/images/blog/darmoor/darmoor-childhood.webp"
                                    alt="왕자 시절의 제른 다르모어"
                                    fill
                                    className="object-contain object-center"
                                />
                            </div>
                            <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-center text-xs text-slate-400">
                                👑 하이레프 왕자 시절의 제른 다르모어 — 가장 거대한 마력 날개를 타고났으나 동족에게 환멸을 느낌
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            제른 다르모어는 본래 그란디스 최강의 종족, <strong className="text-white">하이레프의 고귀한 왕자</strong>였습니다.
                            하이레프는 태어날 때부터 거대한 마력을 지녔고, 등 뒤에 돋아난 <strong className="text-purple-300">&apos;마력 날개&apos;</strong>를 자신들의 긍지이자 우월함의 절대적 상징으로 여겼습니다.
                        </p>

                        <div className="bg-red-950/30 border border-red-800/40 rounded-xl p-4 my-4">
                            <h3 className="text-sm font-bold text-red-300 mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-400" />
                                하이레프 사회의 썩어빠진 이면
                            </h3>
                            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 font-bold">•</span>
                                    <span>마력이 없다는 이유로 평민을 가축과 노예처럼 착취</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 font-bold">•</span>
                                    <span>기득권과 혈통을 지키기 위해 갓 태어난 아이조차 잔혹하게 살해</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400 font-bold">•</span>
                                    <span>타 종족을 짓밟고 자기 안위와 목숨만 챙기는 극단적인 이기주의</span>
                                </li>
                            </ul>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            하지만 가장 거대하고 찬란한 마력 날개를 타고난 왕자 다르모어의 눈에, 자신의 동족들은 <span className="text-red-400 font-bold">&apos;혐오스러운 벌레들&apos;</span>에 불과했습니다.
                        </p>

                        {/* 날개 찢기 연출 블록 */}
                        <div className="bg-gradient-to-r from-red-950/70 via-purple-950/50 to-slate-950 border-2 border-red-500/50 rounded-2xl p-6 my-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl" />
                            <div className="relative z-10">
                                <div className="text-xs text-red-300 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Flame className="w-4 h-4 text-red-400 animate-pulse" />
                                    극단적 자기혐오와 광기
                                </div>
                                <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed mb-3">
                                    동족을 향한 혐오가 얼마나 극에 달했는지... 다르모어는 홀로 남겨질 때마다, 
                                    동족의 상징인 <span className="text-red-300 font-bold underline decoration-red-500 decoration-2">자신의 거대한 마력 날개가 징그럽다며 맨손으로 찢어발겨 버리는</span> 처절한 자기혐오에 빠져 있었습니다.
                                </p>
                                <p className="text-xs sm:text-sm text-slate-400">
                                    날개가 뜯겨나가는 살 떨리는 고통 속에서도, 그는 썩어빠진 세상을 근본부터 리셋하겠다는 서늘한 분노를 키워가고 있었습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* ──────────────────────────────────────────────── */}
                {/* 장면 2: 세피로트의 정원사, 그리고 피어난 꽃 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-amber-900/40 border border-amber-700/50">
                            <Sparkles className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">SCENE 02</span>
                            <h2 className="text-xl sm:text-2xl font-black text-white">세피로트의 정원사, 그리고 피어난 한 송이 꽃</h2>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        {/* 2단 이미지 그리드: 정원사 애런 & 세피로트 회상 */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950 flex flex-col">
                                <div className="relative w-full h-64 sm:h-72">
                                    <Image 
                                        src="/images/blog/darmoor/aaron-gardener.webp"
                                        alt="세피로트의 정원사 애런"
                                        fill
                                        className="object-contain object-center"
                                    />
                                </div>
                                <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-center text-xs text-amber-300/90 font-medium">
                                    🌱 생명의 성소 세피로트의 정원사 &apos;애런&apos;
                                </div>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950 flex flex-col">
                                <div className="relative w-full h-64 sm:h-72">
                                    <Image 
                                        src="/images/blog/darmoor/asha-standing.webp"
                                        alt="성소의 소녀 아샤"
                                        fill
                                        className="object-contain object-center"
                                    />
                                </div>
                                <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-center text-xs text-rose-300 font-medium">
                                    🌸 타인을 위해 자신을 온전히 바친 소녀 &apos;아샤&apos;
                                </div>
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            다르모어는 왕자의 신분을 숨긴 채, 생명의 성소 <strong className="text-amber-300">&apos;세피로트&apos;</strong>에서 평범한 정원사 <strong className="text-white font-bold">&apos;애런(Aaron)&apos;</strong>이라는 이름으로 머물게 됩니다.
                            그리고 그곳에서 그의 삐뚤어진 가치관을 완성시키는 결정적인 사건이 벌어집니다.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 my-4">
                            {/* 배신자 에드바르 */}
                            <div className="bg-slate-950/70 border border-red-900/40 rounded-xl p-4">
                                <div className="text-xs font-bold text-red-400 mb-1 flex items-center gap-1.5">
                                    <Skull className="w-4 h-4 text-red-400" />
                                    기사 에드바르의 배신
                                </div>
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                    성소를 수호하겠다 맹세하던 기사는 위기가 닥치자 자기 목숨 하나 건지겠다고 동료들을 버리고 도망쳤습니다.
                                </p>
                                <p className="text-xs text-red-300/80 mt-2 italic font-mono">
                                    &ldquo;역시 생명이란... 이토록 비열하고 무가치하구나.&rdquo;
                                </p>
                            </div>

                            {/* 희생자 아샤 */}
                            <div className="bg-slate-950/70 border border-emerald-900/40 rounded-xl p-4">
                                <div className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                                    <HeartHandshake className="w-4 h-4 text-emerald-400" />
                                    소녀 아샤의 숭고한 자기희생
                                </div>
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                    피투성이가 된 채 죽어가면서도 자신의 목숨 대신 망가진 성소와 동포들의 터전을 되돌려달라며 헌신적인 기도를 바쳤습니다.
                                </p>
                                <p className="text-xs text-emerald-300/80 mt-2 italic font-mono">
                                    &ldquo;아... 이 썩어빠진 세상에도 가치 있는 생명이 존재하는구나.&rdquo;
                                </p>
                            </div>
                        </div>

                        {/* 명대사 인용구 */}
                        <div className="bg-gradient-to-r from-slate-950 via-rose-950/40 to-slate-950 border border-rose-500/40 rounded-2xl p-6 my-6 text-center shadow-lg">
                            <Quote className="w-8 h-8 text-rose-400/50 mx-auto mb-2" />
                            <p className="text-base sm:text-lg text-white font-bold italic mb-2 break-keep">
                                &ldquo;이 성소에서 너만이... 유일하게 가치 있는 생명이었으니까.&rdquo;
                            </p>
                            <span className="text-xs text-slate-400 font-mono">— 애런 (제른 다르모어), 아샤를 부활시키며</span>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            다르모어는 초월적인 힘으로 숨을 거둔 아샤와 불타버린 정원을 찬란하게 부활시켰습니다.
                            그리고 자신의 확고한 사상을 정립합니다:
                        </p>
                        <div className="bg-slate-950/80 border-l-4 border-amber-400 p-4 rounded-r-xl text-xs sm:text-sm text-amber-200">
                            <strong>🌱 피의 정원사의 탄생:</strong> 썩어빠진 이기적인 잡초들은 내 손으로 모조리 뽑아버리고, 아샤처럼 고귀하고 아름다운 꽃들만 남기는 정원을 만들겠다.
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 장면 3: 광기의 시작, 아버지를 제물로 바치다 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-purple-900/40 border border-purple-700/50">
                            <Skull className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">SCENE 03</span>
                            <h2 className="text-xl sm:text-2xl font-black text-white">광기의 시작, 아버지를 제물로 바치다</h2>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        {/* 이미지: 신왕과 다르모어 */}
                        <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950">
                            <div className="relative w-full h-56 sm:h-72">
                                <Image 
                                    src="/images/blog/darmoor/darmoor-proposal.webp"
                                    alt="선대 신왕과 제른 다르모어의 대면"
                                    fill
                                    className="object-contain object-center"
                                />
                            </div>
                            <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-center text-xs text-purple-300">
                                👑 선대 신왕과 제른 다르모어 — 자신의 아버지를 미치게 만들어 전쟁의 제물로 던져버린 패륜의 설계
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            자신이 꿈꾸는 완벽한 정원을 가꾸기 위해선, 세상의 법칙을 뜯어고칠 압도적인 힘... 즉 <strong className="text-red-300">&apos;생명의 초월자&apos;</strong>로 각성해야만 했습니다.
                            하지만 초월자가 되기 위해선 세상의 <span className="text-amber-300 font-bold">&apos;생명의 균형&apos;</span>이 박살 나야만 했습니다.
                        </p>

                        <div className="bg-gradient-to-br from-purple-950/50 to-slate-950 border border-purple-500/40 rounded-xl p-5 my-4">
                            <h3 className="text-sm font-bold text-purple-300 mb-2 flex items-center gap-2">
                                <Crown className="w-4 h-4 text-purple-400" />
                                친부를 제물로 삼은 패륜의 설계
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                                다르모어는 자신과 이란성쌍둥이처럼 꼭 닮아있던 친아버지, <strong className="text-white">&apos;선대 신왕&apos;</strong>의 정신에 은밀히 <strong className="text-red-400">&apos;광증(Madness)&apos;</strong>을 심어 미쳐버리게 만듭니다.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                미쳐버린 신왕은 다른 종족들을 몰살하기 위한 피비린내 나는 대침공을 선포했고, 하이레프는 광기의 침략 전쟁으로 돌입합니다.
                            </p>
                        </div>

                        {/* 모순 지적 카드 */}
                        <div className="bg-amber-950/20 border border-amber-600/40 rounded-xl p-4 text-xs sm:text-sm text-amber-300 leading-relaxed">
                            <strong className="text-amber-200">⚖️ 제른 다르모어의 치명적인 모순:</strong>
                            <br />
                            타인의 생명을 짓밟는 자들을 혐오한다면서, 정작 본인의 이상을 위해 자신의 친아버지를 미치게 만들고 수많은 백성들을 전쟁의 소모품으로 밀어 넣은 가장 끔찍한 학살자가 되었습니다.
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-4">
                            전쟁의 광기로 그란디스 전체의 생명 균형이 무너지던 바로 그 순간... 마침내 제른 다르모어는 <strong className="text-red-400 font-bold text-base sm:text-lg">&apos;생명의 초월자&apos;</strong>로 완전히 각성하게 됩니다.
                        </p>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* ──────────────────────────────────────────────── */}
                {/* 장면 4: 완벽한 설계, 수백 년의 비극이 시작되다 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-rose-900/40 border border-rose-700/50">
                            <Compass className="w-5 h-5 text-rose-400" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">SCENE 04</span>
                            <h2 className="text-xl sm:text-2xl font-black text-white">완벽한 설계, 수백 년의 피비린내 나는 비극</h2>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        {/* 2단 이미지: 연설과 고대 전쟁 */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950 flex flex-col">
                                <div className="relative w-full h-56 sm:h-64">
                                    <Image 
                                        src="/images/blog/darmoor/darmoor-speech.webp"
                                        alt="다르모어의 알현실 연설"
                                        fill
                                        className="object-cover object-center"
                                    />
                                </div>
                                <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-center text-xs text-rose-300 font-medium">
                                    🏛️ 신왕 시해 누명을 씌우며 대중을 선동하는 제른 다르모어
                                </div>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950 flex flex-col">
                                <div className="relative w-full h-56 sm:h-64">
                                    <Image 
                                        src="/images/blog/darmoor/darmoor-ancient-war.webp"
                                        alt="하이레프와 우든레프의 고대 대전쟁"
                                        fill
                                        className="object-cover object-center"
                                    />
                                </div>
                                <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-center text-xs text-red-300 font-medium">
                                    ⚔️ 수백 년간 이어진 하이레프 vs 우든레프의 멸망전
                                </div>
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            하지만 그의 설계는 각성에서 끝나지 않았습니다.
                            미쳐버린 신왕의 폭정을 견디다 못한 하이레프의 근위기사단(베로니카 등)이 반란을 일으켰고, 신왕은 처참하게 시해당합니다.
                        </p>

                        <div className="bg-slate-950/80 border border-slate-700/60 rounded-xl p-5">
                            <h3 className="text-sm font-bold text-white mb-2">🏛️ 피로 물든 알현실, 단 한마디의 거짓말</h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                                바로 그때, 전쟁을 막아보고자 신왕을 설득하러 잠입했던 라이벌 종족 <strong className="text-sky-300">&apos;우든레프&apos;</strong>의 사절단이 알현실에 도착합니다.
                                그들의 눈앞에는 이미 싸늘한 주검이 된 신왕과, 그 곁에 서 있는 초월자 제른 다르모어가 있었습니다.
                            </p>

                            <div className="bg-red-950/60 border border-red-500/50 rounded-xl p-4 text-center my-3">
                                <span className="text-xs text-red-300 font-mono block mb-1">다르모어의 서늘한 손가락질</span>
                                <p className="text-base sm:text-lg font-black text-red-200">
                                    &ldquo;저들이... 신왕 폐하를 시해했다.&rdquo;
                                </p>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                생명의 초월자라는 절대적 권위로 내뱉은 이 한마디의 거짓말.
                                이 치밀한 선동은 완벽히 먹혀들었고, 하이레프와 우든레프는 서로를 멸종시키기 위한 <strong className="text-red-300">수백 년간의 참혹한 내전</strong>의 늪으로 빠져들게 됩니다.
                            </p>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            자신이 직접 손을 더럽히지 않은 채, 두 종족 모두를 공멸의 길로 몰아넣고 그란디스 전체를 자신의 손아귀에 넣기 위한... 제른 다르모어의 소름 돋는 완벽한 체스판이었습니다.
                        </p>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 1부 요약 타임라인 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <h2 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-amber-400" />
                        1부 핵심 타임라인 정리
                    </h2>
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
                        <div className="flex gap-4 items-start">
                            <span className="w-7 h-7 rounded-full bg-red-900/50 text-red-300 border border-red-500/40 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                            <div>
                                <div className="font-bold text-white text-sm">하이레프 왕자의 자기혐오</div>
                                <div className="text-xs text-slate-400 mt-0.5">동족의 선민사상에 환멸을 느끼며 자신의 마력 날개를 스스로 찢어발김</div>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-7 h-7 rounded-full bg-amber-900/50 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                            <div>
                                <div className="font-bold text-white text-sm">세피로트의 아샤 &amp; &apos;피의 정원사&apos; 각성</div>
                                <div className="text-xs text-slate-400 mt-0.5">아샤의 자기희생을 보며 &apos;가치 있는 생명만 남기는 정원사&apos;가 되기로 결심</div>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-7 h-7 rounded-full bg-purple-900/50 text-purple-300 border border-purple-500/40 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                            <div>
                                <div className="font-bold text-white text-sm">선대 신왕 타락 &amp; 생명의 초월자 강림</div>
                                <div className="text-xs text-slate-400 mt-0.5">아버지에게 광증을 주입해 대전쟁을 일으켜 생명의 균형을 붕괴시키고 각성</div>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-7 h-7 rounded-full bg-rose-900/50 text-rose-300 border border-rose-500/40 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</span>
                            <div>
                                <div className="font-bold text-white text-sm">우든레프 사절단 누명 &amp; 하이레프 내전 발발</div>
                                <div className="text-xs text-slate-400 mt-0.5">신왕 시해 누명을 씌워 수백 년간 지속되는 두 종족 간의 멸망전을 설계</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 2부 예고 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12 bg-gradient-to-r from-red-950/40 via-purple-950/40 to-slate-950 border-2 border-red-500/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-2">
                            NEXT EPISODE PREVIEW
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-white mb-3">
                            2부 예고: &lt;힘의 포식자, 신들의 시대를 끝내다&gt;
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                            아버지를 미치게 만들고, 두 종족을 멸망의 늪으로 밀어 넣으며 완성된 생명의 초월자.
                            하지만 이것은 그가 벌일 우주적 규모의 가지치기... 그 끔찍한 전주곡에 불과했습니다.
                            <br className="hidden sm:block" />
                            그란디스를 장악한 제른 다르모어가 어떻게 <strong className="text-amber-300">고대신들을 사냥</strong>하기 시작하는지, 
                            그리고 우리에게 너무나 익숙한 그 이름 <strong className="text-red-300">&apos;매그너스&apos;</strong>를 어떻게 사냥개로 길들였는지... 다음 편에서 이어집니다!
                        </p>
                        <Link
                            prefetch={false}
                            href="/blog/gerand-darmoor-story-part-2"
                            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 rounded-xl px-4 py-2.5 shadow-lg shadow-red-900/30 transition-all hover:scale-105"
                        >
                            <span>🗡️ 제른 다르모어 2부 바로 읽기</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>

                {/* 관련 스토리/가이드 */}
                <section>
                    <h2 className="text-base sm:text-lg font-black text-white mb-4 flex items-center gap-2">
                        <span>📚</span> 제른 다르모어 스토리 시리즈
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Link 
                            prefetch={false} 
                            href="/blog/gerand-darmoor-story-part-2" 
                            className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 hover:border-red-500/50 hover:bg-slate-800/50 transition-all group"
                        >
                            <div className="text-xs text-red-400 mb-1 font-semibold">제른 다르모어 2부</div>
                            <div className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">
                                🗡️ 힘의 포식자, 신들의 시대를 끝내다
                            </div>
                        </Link>
                        <Link 
                            prefetch={false} 
                            href="/blog/testworld-update-1-2-205" 
                            className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 hover:border-purple-500/50 hover:bg-slate-800/50 transition-all group"
                        >
                            <div className="text-xs text-purple-400 mb-1 font-semibold">업데이트 소식</div>
                            <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                                ⚔️ 다르모어의 사도 벨로나 &amp; 마스터라벨 개편
                            </div>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
