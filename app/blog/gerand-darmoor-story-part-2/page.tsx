'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
    ArrowLeft, 
    ArrowRight,
    Sparkles, 
    Flame, 
    ShieldAlert, 
    Skull, 
    Swords, 
    Crown, 
    Clock, 
    Compass, 
    BookOpen, 
    Quote,
    Eye,
    Globe
} from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function GerandDarmoorStoryPart2Page() {
    return (
        <div className="min-h-screen bg-[#07060e] text-slate-100 selection:bg-red-500/30 selection:text-red-200 pb-24 font-sans leading-relaxed">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none z-0" />
            <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-indigo-950/20 rounded-full blur-[130px] pointer-events-none z-0" />
            <div className="fixed bottom-10 left-10 w-[450px] h-[450px] bg-purple-950/15 rounded-full blur-[120px] pointer-events-none z-0" />

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
                    그란디스 스토리 시리즈 (총 4부작)
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
                    <div className="flex items-center gap-1.5 text-red-400 font-bold bg-red-950/60 border border-red-700/50 px-3 py-1.5 rounded-lg whitespace-nowrap">
                        <span>🗡️ 2부: 힘의 포식자 (현재)</span>
                    </div>
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
                        <span className="px-3 py-1 bg-indigo-500/15 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30">
                            제른 다르모어 2부
                        </span>
                        <span className="text-slate-400 text-xs ml-1">
                            2026년 8월 25일 · 6분 읽기
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight break-keep text-white">
                        🗡️ <span className="bg-gradient-to-r from-red-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                            제른 다르모어 스토리 완벽 분석 2부
                        </span>
                        <br />
                        <span className="text-xl sm:text-2xl md:text-3xl text-slate-200 font-bold mt-2 block">
                            힘의 포식자, 신들의 시대를 끝내다
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed border-l-4 border-red-500 pl-5 py-2 bg-red-950/20 rounded-r-xl">
                        생명의 초월자로 각성한 제른 다르모어의 시선은 이제 <strong className="text-amber-300">그란디스의 신(Gods)</strong>들을 향합니다. 
                        고대 우든레프의 신 봉인, 시간의 초월자 크로니카 강탈과 디멘션 게이트의 개방, 그리고 오만한 전사 매그너스를 사냥개로 길들인 헬리시움 함락의 전말을 밝힙니다.
                    </p>
                </div>

                {/* 인물 프로필 카드 */}
                <div className="mb-12 bg-gradient-to-br from-slate-900/90 via-indigo-950/30 to-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700/50">
                        <Crown className="w-6 h-6 text-indigo-400" />
                        <h2 className="text-lg font-black text-white">2부 핵심 사건 및 키워드 요약</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                            <span className="text-slate-400 block mb-1">고대신 사냥</span>
                            <span className="text-amber-300 font-bold">고대 우든레프의 신 수정체 봉인</span>
                        </div>
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                            <span className="text-slate-400 block mb-1">초월자 포식</span>
                            <span className="text-cyan-300 font-bold">시간의 초월자 크로니카 힘 강탈</span>
                        </div>
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                            <span className="text-slate-400 block mb-1">차원 붕괴</span>
                            <span className="text-purple-300 font-bold">디멘션 게이트 개방 (두 세계 연결)</span>
                        </div>
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                            <span className="text-slate-400 block mb-1">장기말 육성</span>
                            <span className="text-red-300 font-bold">매그너스 복종 &amp; 헬리시움 함락</span>
                        </div>
                    </div>
                </div>

                {/* ──────────────────────────────────────────────── */}
                {/* 도입부 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-900/80 to-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-center gap-2">
                            <Globe className="w-6 h-6 text-red-400" />
                            신들을 사냥하는 초월자: 질서의 완전한 붕괴
                        </h2>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                            아버지를 광기로 몰아넣고, 거짓된 선동으로 수백 년의 잔혹한 하이레프 내전을 일으킨 제른 다르모어. 
                            생명의 초월자로 각성하며 그란디스를 집어삼킨 그의 시선은, 이제 필멸자들이 아닌... <strong className="text-amber-300">&apos;이 세계를 지탱하는 신들&apos;</strong>을 향하기 시작합니다.
                        </p>
                        <div className="bg-red-950/30 border-l-4 border-red-500 p-4 rounded-r-xl text-xs sm:text-sm text-red-200">
                            자신이 꿈꾸는 이상적인 정원을 만들기 위해선, 오버시어가 세워놓은 기존의 세계 질서와 법칙을 완전히 박살 낼 <strong className="text-white">압도적인 힘</strong>이 필요했기 때문입니다.
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 장면 1: 오만한 사냥, 초월자가 초월자를 사냥하다 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-amber-900/40 border border-amber-700/50">
                            <Crown className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">SCENE 01</span>
                            <h2 className="text-xl sm:text-2xl font-black text-white">오만한 사냥, 초월자가 초월자를 사냥하다</h2>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        {/* 2단 이미지: 고대 우든레프의 신 제안 거부 & 봉인 */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950 flex flex-col">
                                <div className="relative w-full h-56 sm:h-64">
                                    <Image 
                                        src="/images/blog/darmoor/wooden-lef-god-refusal.webp"
                                        alt="제안을 거부하는 고대 우든레프의 신"
                                        fill
                                        className="object-contain object-center"
                                    />
                                </div>
                                <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-center text-xs text-amber-300 font-medium">
                                    🛑 다르모어의 잔혹한 제안을 단칼에 거절하는 고대 우든레프의 신
                                </div>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950 flex flex-col">
                                <div className="relative w-full h-56 sm:h-64">
                                    <Image 
                                        src="/images/blog/darmoor/wooden-lef-god-seal.webp"
                                        alt="수정체에 봉인되는 고대 우든레프의 신"
                                        fill
                                        className="object-contain object-center"
                                    />
                                </div>
                                <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-center text-xs text-red-300 font-medium">
                                    💎 패배 후 다르모어의 손등 수정체에 영원히 봉인된 고대신
                                </div>
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            다르모어의 첫 번째 타겟은 <strong className="text-amber-300">&apos;고대 우든레프의 신&apos;</strong>이었습니다.
                            다르모어는 그에게 다가가 고귀한 생명만이 남는 새로운 질서를 만들자며 협조를 요구했습니다. 
                            하지만 진심으로 타 종족을 아끼고 평화를 원했던 우든레프의 신은 그 잔혹한 제안을 단칼에 거절합니다.
                        </p>

                        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-700/60 rounded-xl p-4 text-center">
                            <p className="text-sm sm:text-base text-red-300 font-bold italic font-mono">
                                &ldquo;유감이군.&rdquo;
                            </p>
                            <span className="text-xs text-slate-500 mt-1 block">그 짧은 한마디와 함께, 다르모어는 자비 없이 고대신을 짓밟고 자신의 손등 수정체 속에 영원히 유폐시켰습니다.</span>
                        </div>

                        <div className="bg-indigo-950/30 border border-indigo-500/40 rounded-xl p-5 my-4">
                            <h3 className="text-sm font-bold text-indigo-300 mb-2 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-cyan-400" />
                                시간의 초월자 크로니카 습격 &amp; 디멘션 게이트의 개방
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                                사냥은 멈추지 않았습니다. 다르모어는 그란디스의 또 다른 초월자, <strong className="text-cyan-300">&apos;시간의 초월자 크로니카&apos;</strong>가 머무는 연대기 성소로 향합니다.
                                이미 고대신의 힘까지 흡수한 다르모어를 크로니카조차 막을 수 없었습니다.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                크로니카의 <strong className="text-cyan-300">&apos;시간의 힘&apos;</strong>마저 강탈당하자, 한 육체 안에서 생명과 시간의 초월적 에너지가 충돌하며 시공간이 찢겨나갔습니다.
                                그 거대한 균열의 여파로 <strong className="text-purple-300">그란디스와 메이플 월드를 잇는 &apos;디멘션 게이트&apos;</strong>가 활짝 열리게 됩니다.
                            </p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* ──────────────────────────────────────────────── */}
                {/* 장면 2: 절대적인 공포, 매그너스를 길들이다 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-red-900/40 border border-red-700/50">
                            <Skull className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">SCENE 02</span>
                            <h2 className="text-xl sm:text-2xl font-black text-white">절대적인 공포, 매그너스를 길들이다</h2>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        {/* 이미지: 매그너스 일러스트 */}
                        <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950">
                            <div className="relative w-full h-56 sm:h-72">
                                <Image 
                                    src="/images/blog/darmoor/magnus-portrait.webp"
                                    alt="노바족의 오만한 전사 매그너스"
                                    fill
                                    className="object-contain object-center"
                                />
                            </div>
                            <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-center text-xs text-slate-400">
                                ⚔️ 노바족 최강의 전사였으나, 다르모어의 압도적인 공포 앞에 무릎 꿇은 매그너스
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            우든레프의 수도 아보리스마저 잿더미로 만든 다르모어.
                            하지만 그의 다음 목표인 노바족의 수도 <strong className="text-indigo-300">&apos;헬리시움&apos;</strong>에는 초월자인 자신조차 단번에 뚫기 까다로운 강력한 고대 방어막이 쳐져 있었습니다.
                        </p>

                        <div className="bg-gradient-to-br from-red-950/60 via-slate-950 to-slate-950 border border-red-500/40 rounded-xl p-5">
                            <h3 className="text-sm font-bold text-red-300 mb-2 flex items-center gap-2">
                                <Eye className="w-4 h-4 text-red-400" />
                                최강의 전사가 경험한 태어나 첫 &apos;죽음의 공포&apos;
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                                오직 힘의 논리만을 믿으며 오만방자했던 노바족 최고의 전사 <strong className="text-white">매그너스</strong>.
                                전장에서 다르모어와 마주친 순간, 매그너스는 태어나 처음으로 영혼까지 얼어붙는 절대적인 공포를 느낍니다.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                온몸이 마비되고 사시나무처럼 떨리던 매그너스는 결국 쥐고 있던 검을 바닥에 떨어뜨렸고, 다르모어는 힘을 갈망하는 그의 열등감을 자극하여 <span className="text-red-400 font-bold">&apos;충실한 사냥개&apos;</span>로 길들여버립니다.
                            </p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* ──────────────────────────────────────────────── */}
                {/* 장면 3: 헬리시움 함락, 그리고 사냥개의 파견 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-purple-900/40 border border-purple-700/50">
                            <Swords className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">SCENE 03</span>
                            <h2 className="text-xl sm:text-2xl font-black text-white">헬리시움 함락, 그리고 사냥개의 파견</h2>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            다르모어의 치밀한 설계는 즉각 실행되었습니다.
                            수하가 된 매그너스가 헬리시움 내부에 침투해 방어막을 해제하자, 핏빛 하늘 위로 다르모어의 끔찍한 <strong className="text-red-300">&apos;스펙터 군단&apos;</strong>이 폭포수처럼 쏟아져 내렸습니다.
                        </p>

                        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
                            <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                                <Flame className="w-4 h-4 text-amber-400" />
                                선대 카이저의 장렬한 최후 &amp; 매그너스의 수명 연장 미끼
                            </div>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                헬리시움을 지키려던 <strong className="text-white">선대 카이저</strong>는 모든 생명력을 불태워 자폭을 감행하며 매그너스와 동귀어진을 시도했습니다.
                                너덜너덜해진 채 죽음의 문턱에 선 매그너스를 다르모어는 자신의 권능으로 살려냈지만, <strong className="text-red-300">잃어버린 수명은 채워주지 않았습니다.</strong>
                            </p>
                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                대신 수명 연장을 대가로, 매그너스를 디멘션 게이트 너머 <strong className="text-white">&apos;메이플 월드&apos;</strong>로 파견 보냅니다.
                            </p>
                        </div>

                        {/* 충격적인 반전 카드 */}
                        <div className="bg-gradient-to-r from-red-950/60 via-purple-950/40 to-slate-950 border border-red-500/40 rounded-xl p-5 text-center">
                            <span className="text-xs text-red-300 font-bold uppercase tracking-widest block mb-1">THE TRUTH</span>
                            <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                                우리가 알던 검은 마법사의 군단장 매그너스는,
                                <br />
                                사실 <span className="text-red-300 underline decoration-red-500">처음부터 끝까지 제른 다르모어가 심어놓은 완벽한 스파이이자 장기말</span>이었습니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 장면 4: 전 세계를 덮은 마력 장막 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-cyan-900/40 border border-cyan-700/50">
                            <ShieldAlert className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">SCENE 04</span>
                            <h2 className="text-xl sm:text-2xl font-black text-white">전 세계를 덮은 거대한 마력 장막</h2>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            노바족을 끝으로 그란디스의 모든 종족이 굴복하며 세계는 다르모어의 발밑에 엎드렸습니다.
                            하지만 다르모어는 여기서 멈추지 않고, 그란디스 대륙 전역에 눈에 보이지 않는 거대한 <strong className="text-cyan-300">&apos;마력 장막&apos;</strong>을 쳐버립니다.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                                <div className="text-xs font-bold text-slate-400 mb-1">일반 필멸자들</div>
                                <div className="text-sm font-bold text-slate-200 mb-1">영향 없음 (무시)</div>
                                <p className="text-xs text-slate-500">자신의 잣대에 미치지 못하는 약자들은 상대할 가치조차 두지 않는 오만함</p>
                            </div>
                            <div className="bg-slate-950/70 border border-cyan-900/40 rounded-xl p-4">
                                <div className="text-xs font-bold text-cyan-400 mb-1">고대신 &amp; 대적자 등 강자들</div>
                                <div className="text-sm font-bold text-cyan-300 mb-1">생명력 잠식 &amp; 힘 억제</div>
                                <p className="text-xs text-slate-400">운명에 저항하려는 자들의 힘을 원천 차단하고 숨통을 옥죄는 절대 결계</p>
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            그란디스 전체를 자신의 거대한 시험장이자 정원으로 통제하려는 초월자의 압도적인 스케일이 여실히 드러나는 장치였습니다.
                        </p>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 2부 요약 타임라인 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <h2 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-amber-400" />
                        2부 핵심 타임라인 정리
                    </h2>
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
                        <div className="flex gap-4 items-start">
                            <span className="w-7 h-7 rounded-full bg-amber-900/50 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                            <div>
                                <div className="font-bold text-white text-sm">고대 우든레프의 신 봉인</div>
                                <div className="text-xs text-slate-400 mt-0.5">협조를 거부한 고대신을 손등의 수정체 속에 영구 유폐</div>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-7 h-7 rounded-full bg-cyan-900/50 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                            <div>
                                <div className="font-bold text-white text-sm">크로니카 시간 강탈 &amp; 디멘션 게이트 개방</div>
                                <div className="text-xs text-slate-400 mt-0.5">두 초월자의 힘이 충돌하며 그란디스와 메이플 월드의 차원문이 열림</div>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-7 h-7 rounded-full bg-red-900/50 text-red-300 border border-red-500/40 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                            <div>
                                <div className="font-bold text-white text-sm">매그너스 복종 &amp; 헬리시움 함락</div>
                                <div className="text-xs text-slate-400 mt-0.5">배신자 매그너스를 앞세워 헬리시움을 함락시키고 메이플 월드로 이중 스파이 파견</div>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-7 h-7 rounded-full bg-purple-900/50 text-purple-300 border border-purple-500/40 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</span>
                            <div>
                                <div className="font-bold text-white text-sm">그란디스 전역 마력 장막 전개</div>
                                <div className="text-xs text-slate-400 mt-0.5">고대신과 대적자 등 강자들의 힘을 짓누르는 거대한 결계로 세계를 통제</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 3부 예고 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12 bg-gradient-to-r from-red-950/40 via-purple-950/40 to-slate-950 border-2 border-red-500/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-2">
                            NEXT EPISODE PREVIEW
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-white mb-3">
                            3부 예고: &lt;신학자 애런, 그리고 대적자를 구원하다&gt;
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                            신들을 유폐하고 두 개의 세계에 자신의 장기말을 심어놓은 완벽한 지배자 제른 다르모어.
                            하지만 이 모든 것은, 그가 꿈꾸는 궁극의 목표인 <strong className="text-amber-300">&apos;가치 있는 생명만을 남기는 대규모 선별&apos;</strong>의 무대 세팅에 불과했습니다.
                            <br className="hidden sm:block" />
                            마침내 신들의 운명을 깰 유일한 변수... <strong className="text-red-300">&apos;대적자&apos;</strong>가 세르니움에 발을 들이고, 
                            순진한 신학자의 얼굴로 다가온 애런의 소름 돋는 반전이 펼쳐집니다!
                        </p>
                        <Link
                            prefetch={false}
                            href="/blog/gerand-darmoor-story-part-3"
                            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl px-4 py-2.5 shadow-lg shadow-purple-900/30 transition-all hover:scale-105"
                        >
                            <span>🌌 제른 다르모어 3부 바로 읽기</span>
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
                            href="/blog/gerand-darmoor-story-part-1" 
                            className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 hover:border-red-500/50 hover:bg-slate-800/50 transition-all group"
                        >
                            <div className="text-xs text-red-400 mb-1 font-semibold">제른 다르모어 1부</div>
                            <div className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">
                                🥀 자기혐오에 빠진 왕자, 피의 정원사가 되다
                            </div>
                        </Link>
                        <Link 
                            prefetch={false} 
                            href="/blog/gerand-darmoor-story-part-3" 
                            className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 hover:border-purple-500/50 hover:bg-slate-800/50 transition-all group"
                        >
                            <div className="text-xs text-purple-400 mb-1 font-semibold">제른 다르모어 3부</div>
                            <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                                🌌 신학자 애런, 그리고 대적자를 구원하다
                            </div>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
