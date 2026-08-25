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
    BookOpen, 
    Quote,
    Eye,
    Zap,
    HeartHandshake,
    CheckCircle2
} from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function GerandDarmoorStoryPart3Page() {
    return (
        <div className="min-h-screen bg-[#07060e] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200 pb-24 font-sans leading-relaxed">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-950/20 rounded-full blur-[140px] pointer-events-none z-0" />
            <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[130px] pointer-events-none z-0" />
            <div className="fixed bottom-10 left-10 w-[450px] h-[450px] bg-indigo-950/15 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* Header */}
            <header className="w-full max-w-7xl flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-[#07060e]/90 backdrop-blur-md border-b border-slate-800/80 mx-auto">
                <Link 
                    prefetch={false} 
                    href="/blog" 
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity text-purple-400 font-semibold group text-sm"
                >
                    <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    <span>블로그 홈으로</span>
                </Link>
                <span className="text-xs px-3 py-1 bg-purple-950/60 border border-purple-800/60 text-purple-300 rounded-full font-medium">
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
                    <Link 
                        prefetch={false}
                        href="/blog/gerand-darmoor-story-part-2"
                        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800/60 whitespace-nowrap"
                    >
                        <span>🗡️ 2부: 힘의 포식자</span>
                    </Link>
                    <div className="h-4 w-px bg-slate-700/60" />
                    <div className="flex items-center gap-1.5 text-purple-300 font-bold bg-purple-950/60 border border-purple-700/50 px-3 py-1.5 rounded-lg whitespace-nowrap">
                        <span>🌌 3부: 신학자 애런 (현재)</span>
                    </div>
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
                        <span className="px-3 py-1 bg-purple-500/15 text-purple-400 text-xs font-bold rounded-full border border-purple-500/30">
                            메이플 이야기
                        </span>
                        <span className="px-3 py-1 bg-red-500/15 text-red-300 text-xs font-bold rounded-full border border-red-500/30">
                            제른 다르모어 3부
                        </span>
                        <span className="text-slate-400 text-xs ml-1">
                            2026년 8월 25일 · 6분 읽기
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight break-keep text-white">
                        🌌 <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300 bg-clip-text text-transparent">
                            제른 다르모어 스토리 완벽 분석 3부
                        </span>
                        <br />
                        <span className="text-xl sm:text-2xl md:text-3xl text-slate-200 font-bold mt-2 block">
                            신학자 애런, 그리고 대적자를 구원하다
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed border-l-4 border-purple-500 pl-5 py-2 bg-purple-950/20 rounded-r-xl">
                        세르니움의 친절한 도서관 사서 <strong className="text-amber-300 font-bold">애런(Aaron)</strong>의 충격적인 정체! 
                        대적자를 죽이는 대신 가슴속의 <strong className="text-red-300 font-bold">&apos;봉인석(신의 창)&apos;</strong>을 박살 낸 진짜 이유와, 오버시어의 족쇄로부터 최고의 적을 구원해 준 역설적인 진실을 파헤칩니다.
                    </p>
                </div>

                {/* 핵심 요약 카드 */}
                <div className="mb-12 bg-gradient-to-br from-slate-900/90 via-purple-950/30 to-slate-900/90 border border-purple-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700/50">
                        <Crown className="w-6 h-6 text-purple-400" />
                        <h2 className="text-lg font-black text-white">3부 핵심 사건 및 반전 요약</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                            <span className="text-slate-400 block mb-1">위장 잠입</span>
                            <span className="text-amber-300 font-bold">세르니움 왕실 도서관 사서 애런</span>
                        </div>
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                            <span className="text-slate-400 block mb-1">잠입 목적</span>
                            <span className="text-cyan-300 font-bold">대적자가 &apos;고귀한 생명&apos;인지 관찰</span>
                        </div>
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                            <span className="text-slate-400 block mb-1">충격적 결말</span>
                            <span className="text-red-300 font-bold">대적자의 &apos;봉인석(신의 창)&apos; 파괴</span>
                        </div>
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                            <span className="text-slate-400 block mb-1">이면의 진실</span>
                            <span className="text-emerald-300 font-bold">오버시어의 사형 선고 족쇄 해방</span>
                        </div>
                    </div>
                </div>

                {/* ──────────────────────────────────────────────── */}
                {/* 도입부 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-900/80 to-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-center gap-2">
                            <Eye className="w-6 h-6 text-purple-400" />
                            운명의 유일한 변수, 대적자를 맞이하다
                        </h2>
                        <p className="text-slate-350 text-sm sm:text-base leading-relaxed mb-4">
                            두 명의 초월자를 제압하고 그란디스 전역을 자신의 발밑에 둔 제른 다르모어. 
                            하지만 그의 시선은 이미, 신들이 정해놓은 운명의 판... 그 너머를 향하고 있었습니다.
                        </p>
                        <p className="text-slate-350 text-sm sm:text-base leading-relaxed">
                            시간이 흘러 메이플 월드에서 검은 마법사가 소멸하고, 마침내 신들의 유일한 변수인 <strong className="text-white">&apos;대적자(플레이어)&apos;</strong>가 그란디스에 발을 들이게 됩니다.
                            가장 압도적인 힘을 가진 흑막은, 과연 자신의 최강의 적을 어떻게 맞이했을까요?
                        </p>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 장면 1: 친절한 사서, 신학자 애런 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-amber-900/40 border border-amber-700/50">
                            <BookOpen className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">SCENE 01</span>
                            <h2 className="text-xl sm:text-2xl font-black text-white">친절한 사서, 신학자 애런</h2>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        {/* 이미지: 이데아와 애런의 도서관 연구 */}
                        <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950">
                            <div className="relative w-full h-56 sm:h-72">
                                <Image 
                                    src="/images/blog/darmoor/darmoor-idea.webp"
                                    alt="세르니움 도서관의 신학자 애런과 이데아"
                                    fill
                                    className="object-contain object-center"
                                />
                            </div>
                            <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-center text-xs text-amber-300 font-medium">
                                📖 세르니움 왕립 도서관에서 연합과 함께 고대 문헌을 밤새 해독하던 &apos;친절한 신학자 애런&apos;
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            빛의 성지, 세르니움. 대적자를 처음 맞이한 건 군대를 이끌고 온 무시무시한 마왕이 아니었습니다.
                            그는 <strong className="text-amber-300">&apos;애런&apos;</strong>이라는 이름을 가진, 지적이고 다정한 도서관의 사서였죠.
                        </p>

                        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
                            <h3 className="text-sm font-bold text-white mb-1">🔍 초월자는 왜 이런 번거로운 연기를 했을까?</h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                아무도 읽지 못하는 고대 문헌 수만 권을 홀로 밤새워 해독하고, 대적자와 메이플 연합을 위해 아낌없는 조언을 건네던 친절한 학자.
                                하지만 그의 진짜 정체는 자신의 마력을 극한으로 억누른 <strong className="text-red-300">제른 다르모어 본인</strong>이었습니다.
                            </p>
                            <div className="bg-purple-950/40 border border-purple-500/30 rounded-lg p-3 text-xs text-purple-200">
                                <strong>💡 연기의 진짜 목적 — &apos;관찰&apos;:</strong>
                                <br />
                                눈앞에 나타난 대적자가 남을 짓밟고 자기 목숨만 챙기는 이기적인 벌레인지, 아니면 타인을 위해 기꺼이 목숨을 던질 수 있는... 자신이 그토록 찾아 헤매던 <strong>&apos;고귀한 생명&apos;</strong>인지를 직접 시험하고 판단하기 위해서였습니다.
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* ──────────────────────────────────────────────── */}
                {/* 장면 2: 찢어진 날개, 그리고 드러난 본색 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-red-900/40 border border-red-700/50">
                            <Flame className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">SCENE 02</span>
                            <h2 className="text-xl sm:text-2xl font-black text-white">찢어진 날개, 그리고 드러난 본색</h2>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            애런으로 지내는 동안에도, 다르모어는 남몰래 기괴한 행동을 반복했습니다.
                            자신의 등 뒤로 하이레프의 상징인 마력 날개가 돋아날 때면, 그 선민사상에 찌든 동족들의 모습이 역겹다며... 
                            <strong className="text-red-300">생살을 찢는 끔찍한 고통을 감내하면서까지 스스로 날개를 뜯어버렸습니다.</strong>
                        </p>

                        <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950">
                            <div className="relative w-full h-64 sm:h-80">
                                <Image 
                                    src="/images/blog/darmoor/darmoor-seren.webp"
                                    alt="세르니움에서 정체를 드러낸 제른 다르모어"
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>
                            <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-center text-xs text-rose-300 font-medium">
                                ⚔️ 세르니움이 전화에 휩싸인 순간, 온화한 사서의 미소를 지우고 본색을 드러낸 초월자
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            세르니움이 전화의 불길에 휩싸인 순간, 대적자가 사람들을 지키기 위해 기꺼이 자신을 희생하는 모습을 끝까지 지켜본 다르모어는... 
                            마침내 미소를 지우고 초월자의 서늘한 본색을 드러냅니다.
                        </p>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* ──────────────────────────────────────────────── */}
                {/* 장면 3: 역설적인 구원, 부서진 봉인석 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-purple-900/40 border border-purple-700/50">
                            <Zap className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">SCENE 03</span>
                            <h2 className="text-xl sm:text-2xl font-black text-white">역설적인 구원, 부서진 봉인석(신의 창)</h2>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        {/* 명대사 인용구 */}
                        <div className="bg-gradient-to-r from-slate-950 via-red-950/40 to-slate-950 border border-red-500/40 rounded-2xl p-6 text-center shadow-lg">
                            <Quote className="w-8 h-8 text-red-400/50 mx-auto mb-2" />
                            <p className="text-base sm:text-lg text-white font-bold italic mb-2 break-keep">
                                &ldquo;결국 당신도 제른 다르모어에 맞서 싸우려 하나요? 그것이 얼마나 많은 피를 부를지 알면서도?&rdquo;
                            </p>
                            <span className="text-xs text-slate-400 font-mono">— 제른 다르모어, 대적자를 압도하며</span>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            태양신 미트라의 힘을 품은 세렌과 대적자가 동시에 맞섰지만, 초월자의 힘 앞에서는 그저 &apos;미숙한 생명의 몸부림&apos;에 불과했습니다.
                            다르모어는 단숨에 대적자를 제압했습니다.
                        </p>

                        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5">
                            <h3 className="text-sm font-bold text-amber-300 mb-2">💥 모두가 죽음을 예감한 바로 그 순간</h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                                다르모어는 대적자의 목숨을 끊는 대신, 그의 가슴속에서 대적자의 상징이자 신의 무기인 <strong className="text-red-400">&apos;봉인석(신의 창)&apos;</strong>을 뽑아내어... 산산조각 내버립니다.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                신의 무기를 잃은 대적자와 연합은 가장 큰 희망이 박살 났다며 절망에 빠졌습니다. 하지만... 이 사건의 이면에는 소름 돋는 진실이 숨어 있었습니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 장면 4: 신의 족쇄를 끊어버리다 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-emerald-900/40 border border-emerald-700/50">
                            <HeartHandshake className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">SCENE 04</span>
                            <h2 className="text-xl sm:text-2xl font-black text-white">신의 족쇄를 끊어버리다 (도원경의 진실)</h2>
                        </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        <div className="bg-gradient-to-br from-indigo-950/60 via-slate-950 to-slate-950 border border-indigo-500/40 rounded-xl p-5">
                            <h3 className="text-sm font-bold text-indigo-300 mb-2">🏛️ 도원경 스토리에서 밝혀진 충격적인 진실</h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                                사실 대적자의 몸에 깃들어 있던 봉인석은, 사명을 다하면 필연적으로 파멸하고 죽음을 맞이해야만 하는... 
                                세계의 창조주 <strong className="text-amber-300">&apos;오버시어가 채워놓은 사형 선고이자 족쇄&apos;</strong>였습니다.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                다르모어는 대적자가 그 족쇄에 묶여 죽게 내버려두지 않았습니다.
                                대적자의 자기희생을 확인한 그는, 대적자를 자신이 만들 새로운 세상에 남겨둘 <strong className="text-emerald-300">&apos;고귀한 생명&apos;으로 합격</strong>시켰던 것입니다.
                            </p>
                        </div>

                        {/* 검은 마법사 vs 제른 다르모어 대적자 대우 비교 */}
                        <div className="grid sm:grid-cols-2 gap-4 text-xs">
                            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                                <div className="font-bold text-slate-400 mb-1">검은 마법사</div>
                                <p className="text-slate-300">대적자의 손에 스스로 죽음을 맞이함으로써 운명을 파괴함</p>
                            </div>
                            <div className="bg-slate-950/70 border border-purple-900/40 rounded-xl p-4">
                                <div className="font-bold text-purple-300 mb-1">제른 다르모어</div>
                                <p className="text-slate-300">자신의 앞길을 막을 최고의 적조차 &apos;가치 있는 자&apos;라 인정하며 운명의 족쇄를 직접 부숴 살려둠</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 3부 요약 타임라인 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12">
                    <h2 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-amber-400" />
                        3부 핵심 타임라인 정리
                    </h2>
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
                        <div className="flex gap-4 items-start">
                            <span className="w-7 h-7 rounded-full bg-amber-900/50 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                            <div>
                                <div className="font-bold text-white text-sm">신학자 애런으로 위장 잠입</div>
                                <div className="text-xs text-slate-400 mt-0.5">세르니움 도서관 사서로 위장하여 대적자의 가치관과 자격을 은밀히 관찰</div>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-7 h-7 rounded-full bg-red-900/50 text-red-300 border border-red-500/40 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                            <div>
                                <div className="font-bold text-white text-sm">마력 날개 절단 &amp; 본색 공개</div>
                                <div className="text-xs text-slate-400 mt-0.5">동족을 향한 자기혐오로 날개를 뜯어내고, 세르니움 함락과 함께 초월자의 정체 공개</div>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-7 h-7 rounded-full bg-purple-900/50 text-purple-300 border border-purple-500/40 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                            <div>
                                <div className="font-bold text-white text-sm">대적자 제압 및 봉인석 파괴</div>
                                <div className="text-xs text-slate-400 mt-0.5">대적자의 목숨 대신 가슴속 신의 무기(봉인석)를 산산조각 내버림</div>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <span className="w-7 h-7 rounded-full bg-emerald-900/50 text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</span>
                            <div>
                                <div className="font-bold text-white text-sm">오버시어의 족쇄 해방 (역설적 구원)</div>
                                <div className="text-xs text-slate-400 mt-0.5">대적자를 새로운 정원의 &apos;고귀한 생명&apos;으로 인정하여 죽음의 운명을 비틀어줌</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 4부 예고 */}
                {/* ──────────────────────────────────────────────── */}
                <section className="mb-12 bg-gradient-to-r from-red-950/40 via-purple-950/40 to-slate-950 border-2 border-red-500/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-2">
                            FINAL EPISODE PREVIEW
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-white mb-3">
                            4부 예고: &lt;대규모 선별과 10인의 사도&gt;
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                            &ldquo;초월자의 시대는 저물고... 다가오는 운명은 그대들의 편이다. 운명을 믿는다면 말이야.&rdquo;
                            <br className="hidden sm:block" />
                            신들이 쳐놓은 운명의 판을 뒤엎고 자신만의 게임을 세팅한 제른 다르모어.
                            이제 그는 마지막 계획인 <strong className="text-amber-300">&apos;대규모 선별&apos;</strong>을 위해 10명의 최정예 간부, <strong className="text-red-300">&apos;사도&apos;</strong>들을 전 세계에 풀어놓기 시작합니다.
                            <br className="hidden sm:block" />
                            카링, 하보크, 레이나, 림보, 벨로나... 그리고 그란디스를 피로 물들일 <strong>&apos;미션 울티마&apos;</strong>의 충격적인 정체가 마침내 최종장에서 밝혀집니다!
                        </p>
                        <Link
                            prefetch={false}
                            href="/blog/gerand-darmoor-story-part-4"
                            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 rounded-xl px-4 py-2.5 shadow-lg shadow-amber-900/30 transition-all hover:scale-105"
                        >
                            <span>👑 제른 다르모어 4부(최종장) 바로 읽기</span>
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
                            className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all group"
                        >
                            <div className="text-xs text-indigo-400 mb-1 font-semibold">제른 다르모어 2부</div>
                            <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                                🗡️ 힘의 포식자, 신들의 시대를 끝내다
                            </div>
                        </Link>
                        <Link 
                            prefetch={false} 
                            href="/blog/gerand-darmoor-story-part-4" 
                            className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 hover:border-amber-500/50 hover:bg-slate-800/50 transition-all group"
                        >
                            <div className="text-xs text-amber-400 mb-1 font-semibold">제른 다르모어 4부 (최종장)</div>
                            <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                                👑 대규모 선별과 10인의 사도, 그리고 오버시어
                            </div>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
