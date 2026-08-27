import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Trophy, Flame, Swords, Shield, Sparkles, TrendingUp, Users, Calendar, Crown, Award, ChevronRight, Zap } from 'lucide-react';
import { AdBanner, InArticleAd } from '@/components/AdSense';

export const metadata: Metadata = {
    title: '⚔️ 벨로나 1인 격파 이벤트 랭킹 TOP 50 완벽 분석 — 1위 칼리 강은호·제논 독주와 솔플 메타 | 메이플AI',
    description: '2026년 9월 16일까지 진행되는 신규 최상위 보스 벨로나 1인 파티 격파 이벤트! 1위 강은호(칼리), 2위 제논은T, 3위 귤민 등 TOP 50 랭커들의 직업·서버별 분포 통계와 솔로 격파 핵심 메타 완벽 분석.',
    openGraph: {
        title: '⚔️ 벨로나 1인 격파 이벤트 랭킹 TOP 50 완벽 분석 — 메이플AI',
        description: '신규 최상위 보스 벨로나 1인 파티 격파 이벤트 TOP 50 랭킹 현황과 직업별 티어 통계 완벽 정리.',
        images: [
            {
                url: '/images/blog/bellona/bellona-event-banner.png',
                width: 1200,
                height: 630,
                alt: '벨로나 1인 격파 이벤트 랭킹 분석',
            },
        ],
    },
};

// 랭킹 50인 전체 데이터
const TOP_50_RANKINGS = [
    { rank: 1, name: '강은호', world: '스카니아', job: '칼리', highlight: true, note: '🏆 1인 격파 1위 달성' },
    { rank: 2, name: '제논은T', world: '스카니아', job: '제논', highlight: true, note: '🥈 제논 최상위 랭커' },
    { rank: 3, name: '귤민', world: '크로아', job: '메르세데스', highlight: true, note: '🥉 메르세데스 1위' },
    { rank: 4, name: '아델', world: '스카니아', job: '아델', highlight: true, note: '전사 계열 최상위' },
    { rank: 5, name: '쯔단', world: '크로아', job: '캐논마스터', highlight: true, note: '해적 원거리 극딜' },
    { rank: 6, name: '고딩', world: '루나', job: '팔라딘', highlight: false, note: '팔라딘 생존 솔플' },
    { rank: 7, name: '귀신', world: '베라', job: '섀도어', highlight: false, note: '섀도어 최상위' },
    { rank: 8, name: '맑음', world: '크로아', job: '제논', highlight: false, note: '유명 네임드 랭커' },
    { rank: 9, name: '카키', world: '스카니아', job: '팬텀', highlight: false, note: '팬텀 유틸 강세' },
    { rank: 10, name: '나워', world: '루나', job: '나이트워커', highlight: false, note: '나이트워커 1위' },
    { rank: 11, name: '물주', world: '베라', job: '팬텀', highlight: false },
    { rank: 12, name: '식중팬', world: '루나', job: '카데나', highlight: false, note: '카데나 1위' },
    { rank: 13, name: '진격캐넌', world: '루나', job: '캐논마스터', highlight: false },
    { rank: 14, name: '세계', world: '엘리시움', job: '윈드브레이커', highlight: false, note: '윈브 1위' },
    { rank: 15, name: '노노', world: '베라', job: '아크메이지(불,독)', highlight: false, note: '불독 1위' },
    { rank: 16, name: '패릿', world: '스카니아', job: '아델', highlight: false },
    { rank: 17, name: '서리', world: '스카니아', job: '제논', highlight: false },
    { rank: 18, name: '성배', world: '크로아', job: '비숍', highlight: false, note: '비숍 솔플 격파' },
    { rank: 19, name: '배배', world: '에오스', job: '카이저', highlight: false, note: '카이저 1위' },
    { rank: 20, name: '후닝', world: '스카니아', job: '제논', highlight: false },
    { rank: 21, name: '남색', world: '루나', job: '제논', highlight: false },
    { rank: 22, name: '바붕', world: '루나', job: '카데나', highlight: false },
    { rank: 23, name: '감팡검', world: '크로아', job: '아델', highlight: false },
    { rank: 24, name: '상온', world: '크로아', job: '듀얼블레이더', highlight: false, note: '듀블 최상위' },
    { rank: 25, name: '초코빵내꺼야', world: '엘리시움', job: '카데나', highlight: false },
    { rank: 26, name: '쀼부', world: '에오스', job: '라라', highlight: false, note: '라라 1위' },
    { rank: 27, name: '클라스', world: '스카니아', job: '제로', highlight: false, note: '제로 1위' },
    { rank: 28, name: '가을', world: '엘리시움', job: '카데나', highlight: false },
    { rank: 29, name: '게이', world: '루나', job: '아크메이지(불,독)', highlight: false },
    { rank: 30, name: '레망', world: '크로아', job: '듀얼블레이더', highlight: false },
    { rank: 31, name: '완시', world: '베라', job: '카인', highlight: false, note: '카인 1위' },
    { rank: 32, name: '티엘', world: '에오스', job: '보우마스터', highlight: false, note: '보마 1위' },
    { rank: 33, name: '작반', world: '엘리시움', job: '팬텀', highlight: false },
    { rank: 34, name: '수다', world: '스카니아', job: '제논', highlight: false },
    { rank: 35, name: '응급', world: '엘리시움', job: '아크메이지(썬,콜)', highlight: false, note: '썬콜 1위' },
    { rank: 36, name: '발톱', world: '에오스', job: '데몬 어벤져', highlight: false, note: '데벤져 최상위' },
    { rank: 37, name: '달개화', world: '루나', job: '렌', highlight: true, note: '✨ 신규 직업 렌 격파!' },
    { rank: 38, name: '천원', world: '크로아', job: '데몬 어벤져', highlight: false },
    { rank: 39, name: '박준형', world: '스카니아', job: '아델', highlight: false },
    { rank: 40, name: '비숍', world: '스카니아', job: '비숍', highlight: false },
    { rank: 41, name: '오션', world: '스카니아', job: '히어로', highlight: false, note: '히어로 1위' },
    { rank: 42, name: '듀얼블레이더', world: '스카니아', job: '듀얼블레이더', highlight: false },
    { rank: 43, name: '르헤솔', world: '스카니아', job: '제로', highlight: false },
    { rank: 44, name: '집념', world: '루나', job: '아델', highlight: false },
    { rank: 45, name: '웨스턴총냥이', world: '루나', job: '캐논마스터', highlight: false },
    { rank: 46, name: '박준호', world: '에오스', job: '제논', highlight: false },
    { rank: 47, name: '팔라딘', world: '루나', job: '팔라딘', highlight: false },
    { rank: 48, name: '으찌', world: '베라', job: '제로', highlight: false },
    { rank: 49, name: '최약체보스', world: '스카니아', job: '스트라이커', highlight: false, note: '스커 1위' },
    { rank: 50, name: '구구단', world: '루나', job: '나이트로드', highlight: false, note: '나로 1위' },
];

// 직업별 점유 통계
const JOB_STATISTICS = [
    { job: '제논', count: 7, ratio: '14.0%', badge: '👑 압도적 1위', desc: '올스탯 극딜과 오버로드 모드, 무적 유틸의 완벽한 조화' },
    { job: '아델', count: 5, ratio: '10.0%', badge: '🔥 전사 1위', desc: '다이디움 크로스, 레스토레이션 등 솔플 생존과 폭딜 겸비' },
    { job: '카데나', count: 4, ratio: '8.0%', badge: '⚡ 극한의 피지컬', desc: '체인 이동기와 캔슬 폭딜로 최상위 보스 타임어택 독식' },
    { job: '팬텀', count: 3, ratio: '6.0%', badge: '🛡️ 유틸 깡패', desc: '파컷 무적, 힐, 프리드의 가호 6중첩 등 생존력 종결' },
    { job: '캐논마스터', count: 3, ratio: '6.0%', badge: '💣 초장거리 폭격', desc: '빅 휴즈 캐논볼의 다단히트와 긴 사거리로 안정적 딜링' },
    { job: '듀얼블레이더', count: 3, ratio: '6.0%', badge: '🗡️ 더블 무적', desc: '사슬지옥 & 파이널 컷 듀얼 무적으로 패턴 무력화' },
    { job: '제로', count: 3, ratio: '6.0%', badge: '⏳ 태그 & 바인드', desc: '알파/베타 듀얼 체력바와 연속 바인드로 패턴 제어' },
];

// 월드별 분포 통계
const WORLD_STATISTICS = [
    { world: '스카니아', count: 16, ratio: '32.0%', color: 'from-amber-500/30 to-amber-600/10', border: 'border-amber-500/40', text: 'text-amber-300' },
    { world: '루나', count: 12, ratio: '24.0%', color: 'from-blue-500/30 to-blue-600/10', border: 'border-blue-500/40', text: 'text-blue-300' },
    { world: '크로아', count: 9, ratio: '18.0%', color: 'from-purple-500/30 to-purple-600/10', border: 'border-purple-500/40', text: 'text-purple-300' },
    { world: '베라', count: 5, ratio: '10.0%', color: 'from-emerald-500/30 to-emerald-600/10', border: 'border-emerald-500/40', text: 'text-emerald-300' },
    { world: '엘리시움', count: 5, ratio: '10.0%', color: 'from-cyan-500/30 to-cyan-600/10', border: 'border-cyan-500/40', text: 'text-cyan-300' },
    { world: '에오스', count: 4, ratio: '8.0%', color: 'from-rose-500/30 to-rose-600/10', border: 'border-rose-500/40', text: 'text-rose-300' },
];

export default function BellonaClearRankingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* 상단 네비게이션 */}
            <div className="border-b border-slate-800 bg-slate-950/70 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <Link
                        prefetch={false}
                        href="/blog"
                        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-xs sm:text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>블로그 목록</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-black border border-rose-500/30 flex items-center gap-1">
                            <Flame className="w-3 h-3 text-rose-400" />
                            BOSS CLEAR EVENT
                        </span>
                    </div>
                </div>
            </div>

            <article className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
                {/* 헤더 섹션 */}
                <header className="mb-8 sm:mb-12">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-black rounded-full shadow-lg shadow-red-900/40">
                            🔥 최신 보스 랭킹
                        </span>
                        <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-full border border-slate-700">
                            이벤트 가이드
                        </span>
                        <span className="text-slate-400 text-xs sm:text-sm flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            2026년 8월 27일 기준 랭킹
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                        ⚔️ 벨로나 1인 격파 이벤트 랭킹 TOP 50 완벽 분석
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-amber-300">
                            1위 칼리 강은호 · 제논 7명 독주와 솔플 메타
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
                        2026년 8월 20일 강림한 그란디스의 신규 최상위 보스 <strong className="text-rose-400">벨로나(Bellona)</strong>!
                        현재 인게임에서 치열하게 진행 중인 <strong>1인 파티 솔로 격파 이벤트</strong>의 TOP 50 랭킹 현황과
                        직업별 점유율, 랭커들의 빌드 및 솔플 공략 메타를 인게임 랭킹 데이터를 바탕으로 정밀 분석합니다.
                    </p>
                </header>

                {/* 이벤트 배너 카드 */}
                <div className="mb-10 sm:mb-14 relative overflow-hidden rounded-2xl border border-rose-500/40 shadow-2xl bg-gradient-to-br from-rose-950/40 via-purple-950/30 to-slate-950">
                    <div className="relative w-full aspect-[21/9] max-h-[320px]">
                        <Image
                            src="/images/blog/bellona/bellona-event-banner.png"
                            alt="벨로나 격파 이벤트 1인 파티 공식 배너"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="p-4 sm:p-6 bg-slate-950/90 border-t border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-black text-[11px]">1인 파티 전용</span>
                                <h3 className="font-black text-base sm:text-lg text-white">벨로나 격파 이벤트 (BOSS CLEAR EVENT)</h3>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-400">
                                📅 <strong>이벤트 종료일:</strong> <span className="text-rose-400 font-bold">2026년 9월 16일 (수) 오후 11시 59분까지</span>
                            </p>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-extrabold shrink-0">
                            ⏳ 이벤트 마감까지 진행 중
                        </div>
                    </div>
                </div>

                <AdBanner dataAdSlot="8162808816" className="mb-10" />

                {/* 1. TOP 5 핵심 요약 카드 */}
                <section className="mb-12 sm:mb-16">
                    <div className="flex items-center gap-2 mb-6">
                        <Trophy className="w-6 h-6 text-amber-400" />
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                            🏆 벨로나 1인 격파 TOP 5 명예의 전당
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                        {/* 1위 */}
                        <div className="relative rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-950 border-2 border-amber-400 shadow-xl shadow-amber-500/10 flex flex-col justify-between">
                            <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-md">
                                👑 1위
                            </div>
                            <div className="pt-2">
                                <div className="text-xs text-amber-300 font-bold">스카니아</div>
                                <div className="text-lg sm:text-xl font-black text-white mt-0.5">강은호</div>
                                <div className="inline-block mt-2 px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-xs font-black border border-amber-400/40">
                                    칼리 (Khali)
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-800 leading-relaxed">
                                전 서버 최초 1위 달성! 칼리 특유의 차크람 기동성과 폭발적 단일 극딜로 벨로나 패턴 완벽 공략
                            </p>
                        </div>

                        {/* 2위 */}
                        <div className="relative rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-slate-400/20 via-slate-900 to-slate-950 border border-slate-400 shadow-lg flex flex-col justify-between">
                            <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-slate-300 text-slate-950 font-black text-xs shadow-md">
                                🥈 2위
                            </div>
                            <div className="pt-2">
                                <div className="text-xs text-slate-300 font-bold">스카니아</div>
                                <div className="text-lg sm:text-xl font-black text-white mt-0.5">제논은T</div>
                                <div className="inline-block mt-2 px-2 py-0.5 rounded bg-blue-400/20 text-blue-300 text-xs font-black border border-blue-400/40">
                                    제논 (Xenon)
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-800 leading-relaxed">
                                제논 1위 랭커. 오버로드 모드와 초고스펙 올스탯 잠재력으로 강력한 솔로 화력 증명
                            </p>
                        </div>

                        {/* 3위 */}
                        <div className="relative rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-amber-700/20 via-slate-900 to-slate-950 border border-amber-600 shadow-lg flex flex-col justify-between">
                            <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-amber-600 text-white font-black text-xs shadow-md">
                                🥉 3위
                            </div>
                            <div className="pt-2">
                                <div className="text-xs text-amber-400 font-bold">크로아</div>
                                <div className="text-lg sm:text-xl font-black text-white mt-0.5">귤민</div>
                                <div className="inline-block mt-2 px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 text-xs font-black border border-emerald-400/40">
                                    메르세데스
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-800 leading-relaxed">
                                궁수 직업군 1위. 이슈타르의 링 무빙 딜링과 엘리멘탈 고스트 순간 극딜의 정점
                            </p>
                        </div>

                        {/* 4위 */}
                        <div className="rounded-2xl p-4 sm:p-5 bg-slate-900/80 border border-slate-800 shadow-md flex flex-col justify-between">
                            <div>
                                <div className="text-xs font-black text-purple-400">4위</div>
                                <div className="text-xs text-slate-400 font-bold mt-1">스카니아</div>
                                <div className="text-lg sm:text-xl font-black text-white mt-0.5">아델</div>
                                <div className="inline-block mt-2 px-2 py-0.5 rounded bg-purple-400/20 text-purple-300 text-xs font-black border border-purple-400/40">
                                    아델 (Adele)
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-800 leading-relaxed">
                                전사 계열 최고 순위. 완벽한 밸런스와 오더·인피니트 무적 연계
                            </p>
                        </div>

                        {/* 5위 */}
                        <div className="rounded-2xl p-4 sm:p-5 bg-slate-900/80 border border-slate-800 shadow-md flex flex-col justify-between">
                            <div>
                                <div className="text-xs font-black text-rose-400">5위</div>
                                <div className="text-xs text-slate-400 font-bold mt-1">크로아</div>
                                <div className="text-lg sm:text-xl font-black text-white mt-0.5">쯔단</div>
                                <div className="inline-block mt-2 px-2 py-0.5 rounded bg-rose-400/20 text-rose-300 text-xs font-black border border-rose-400/40">
                                    캐논마스터
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-800 leading-relaxed">
                                해적 1위. 벅 샷과 코코볼의 압도적인 단일 보스 다단히트 위력
                            </p>
                        </div>
                    </div>
                </section>

                {/* 2. 직업별 점유율 통계 & 차트 */}
                <section className="mb-12 sm:mb-16 bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 rounded-2xl p-5 sm:p-8 border border-indigo-500/30 shadow-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <BarChartIcon className="w-6 h-6 text-indigo-400" />
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                            📊 벨로나 1인 격파 TOP 50 직업별 점유율
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 mb-6">
                        50인의 최상위 솔로 격파자 중 어떤 직업이 가장 많은 비중을 차지하고 있을까요?
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {JOB_STATISTICS.map((stat, idx) => (
                            <div key={idx} className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex items-start justify-between gap-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-black text-base text-white">{stat.job}</span>
                                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                                            {stat.badge}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{stat.desc}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-xl font-black text-indigo-300">{stat.count}명</div>
                                    <div className="text-[11px] text-slate-500 font-bold">{stat.ratio}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 직업별 분석 포인트 3대 요약 */}
                    <div className="bg-slate-950/90 rounded-xl p-4 sm:p-5 border border-slate-800 space-y-2 text-xs sm:text-sm text-slate-300">
                        <div className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">1.</span>
                            <span><strong className="text-amber-300">제논(7명)의 압도적인 독주:</strong> 올스탯 3중 퍼센트 템세팅의 고점과 오버로드 모드 극딜 화력, 사슬 이동 유틸이 결합해 최상위권을 휩쓸었습니다.</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-purple-400 font-bold">2.</span>
                            <span><strong className="text-purple-300">카데나(4명) & 칼리(1위):</strong> 복잡한 연계와 이동기를 보유한 하이엔드 피지컬 직업들이 벨로나의 정밀 회피 패턴에서 진가를 발휘했습니다.</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">3.</span>
                            <span><strong className="text-emerald-300">신규 직업 렌(37위 달개화):</strong> 출시된 지 얼마 되지 않은 신규 직업 '렌'이 쟁쟁한 랭커들 사이에서 37위로 1인 격파에 성공하며 저력을 보여주었습니다.</span>
                        </div>
                    </div>
                </section>

                {/* 3. 서버(월드)별 격파자 분포 */}
                <section className="mb-12 sm:mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="w-6 h-6 text-blue-400" />
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                            🌐 월드(서버)별 격파자 분포 현황
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {WORLD_STATISTICS.map((w, idx) => (
                            <div key={idx} className={`bg-gradient-to-br ${w.color} ${w.border} border rounded-xl p-3.5 text-center`}>
                                <div className="text-xs text-slate-300 font-bold">{w.world}</div>
                                <div className={`text-2xl font-black ${w.text} my-1`}>{w.count}명</div>
                                <div className="text-[10px] text-slate-400 font-medium">점유율 {w.ratio}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" className="my-10" />

                {/* 4. 인게임 공식 랭킹 스크린샷 갤러리 */}
                <section className="mb-12 sm:mb-16">
                    <div className="flex items-center justify-between gap-2 mb-6">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                                📸 인게임 공식 랭킹 캡처 (1위 ~ 50위)
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-400 mt-1">
                                메이플스토리 인게임 보스 클리어 이벤트 UI 10위 단위 스크린샷
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* 1~10위 */}
                        <div className="bg-slate-900/90 border border-amber-500/40 rounded-xl overflow-hidden shadow-lg">
                            <div className="bg-amber-500/20 px-3.5 py-2 border-b border-amber-500/30 flex items-center justify-between">
                                <span className="text-xs font-black text-amber-300">TOP 1 ~ 10위 (최상위권)</span>
                                <span className="text-[10px] text-amber-400 font-bold">1위 강은호</span>
                            </div>
                            <div className="relative w-full aspect-[4/3]">
                                <Image
                                    src="/images/blog/bellona/bellona-rank-1-10.png"
                                    alt="벨로나 1인 격파 랭킹 1위~10위 스크린샷"
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                        </div>

                        {/* 11~20위 */}
                        <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
                            <div className="bg-slate-800/60 px-3.5 py-2 border-b border-slate-700 flex items-center justify-between">
                                <span className="text-xs font-black text-slate-200">TOP 11 ~ 20위</span>
                                <span className="text-[10px] text-slate-400">11위 물주 ~ 20위 후닝</span>
                            </div>
                            <div className="relative w-full aspect-[4/3]">
                                <Image
                                    src="/images/blog/bellona/bellona-rank-11-20.png"
                                    alt="벨로나 1인 격파 랭킹 11위~20위 스크린샷"
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                        </div>

                        {/* 21~30위 */}
                        <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
                            <div className="bg-slate-800/60 px-3.5 py-2 border-b border-slate-700 flex items-center justify-between">
                                <span className="text-xs font-black text-slate-200">TOP 21 ~ 30위</span>
                                <span className="text-[10px] text-slate-400">21위 남색 ~ 30위 레망</span>
                            </div>
                            <div className="relative w-full aspect-[4/3]">
                                <Image
                                    src="/images/blog/bellona/bellona-rank-21-30.png"
                                    alt="벨로나 1인 격파 랭킹 21위~30위 스크린샷"
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                        </div>

                        {/* 31~40위 */}
                        <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
                            <div className="bg-slate-800/60 px-3.5 py-2 border-b border-slate-700 flex items-center justify-between">
                                <span className="text-xs font-black text-slate-200">TOP 31 ~ 40위</span>
                                <span className="text-[10px] text-slate-400">37위 신직업 렌(달개화)</span>
                            </div>
                            <div className="relative w-full aspect-[4/3]">
                                <Image
                                    src="/images/blog/bellona/bellona-rank-31-40.png"
                                    alt="벨로나 1인 격파 랭킹 31위~40위 스크린샷"
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                        </div>

                        {/* 41~50위 */}
                        <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
                            <div className="bg-slate-800/60 px-3.5 py-2 border-b border-slate-700 flex items-center justify-between">
                                <span className="text-xs font-black text-slate-200">TOP 41 ~ 50위</span>
                                <span className="text-[10px] text-slate-400">41위 오션 ~ 50위 구구단</span>
                            </div>
                            <div className="relative w-full aspect-[4/3]">
                                <Image
                                    src="/images/blog/bellona/bellona-rank-41-50.png"
                                    alt="벨로나 1인 격파 랭킹 41위~50위 스크린샷"
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. TOP 50 전체 상세 데이터 테이블 */}
                <section className="mb-12 sm:mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <Award className="w-6 h-6 text-purple-400" />
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                            📜 벨로나 1인 격파 TOP 50 전체 랭킹 명단
                        </h2>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80 shadow-xl">
                        <table className="w-full text-left text-xs sm:text-sm">
                            <thead className="bg-slate-900 text-slate-300 font-bold border-b border-slate-800">
                                <tr>
                                    <th className="py-3 px-3.5 sm:px-4 text-center w-16">순위</th>
                                    <th className="py-3 px-3.5 sm:px-4">닉네임</th>
                                    <th className="py-3 px-3.5 sm:px-4">월드</th>
                                    <th className="py-3 px-3.5 sm:px-4">직업</th>
                                    <th className="py-3 px-3.5 sm:px-4 hidden sm:table-cell">비고 / 특징</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-850">
                                {TOP_50_RANKINGS.map((row) => (
                                    <tr
                                        key={row.rank}
                                        className={`hover:bg-slate-800/40 transition-colors ${
                                            row.rank === 1
                                                ? 'bg-amber-500/10 font-bold'
                                                : row.rank <= 3
                                                ? 'bg-slate-900/50'
                                                : ''
                                        }`}
                                    >
                                        <td className="py-2.5 px-3.5 sm:px-4 text-center">
                                            {row.rank === 1 ? (
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs">
                                                    1
                                                </span>
                                            ) : row.rank === 2 ? (
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-300 text-slate-950 font-black text-xs">
                                                    2
                                                </span>
                                            ) : row.rank === 3 ? (
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-600 text-white font-black text-xs">
                                                    3
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 font-semibold">{row.rank}</span>
                                            )}
                                        </td>
                                        <td className="py-2.5 px-3.5 sm:px-4 font-bold text-white">
                                            {row.name}
                                        </td>
                                        <td className="py-2.5 px-3.5 sm:px-4 text-slate-300">
                                            {row.world}
                                        </td>
                                        <td className="py-2.5 px-3.5 sm:px-4">
                                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                                                row.job === '칼리' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' :
                                                row.job === '제논' ? 'bg-blue-400/20 text-blue-300 border border-blue-400/30' :
                                                row.job === '아델' ? 'bg-purple-400/20 text-purple-300 border border-purple-400/30' :
                                                row.job === '카데나' ? 'bg-rose-400/20 text-rose-300 border border-rose-400/30' :
                                                'bg-slate-800 text-slate-300'
                                            }`}>
                                                {row.job}
                                            </span>
                                        </td>
                                        <td className="py-2.5 px-3.5 sm:px-4 text-slate-400 text-xs hidden sm:table-cell">
                                            {row.note || '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 6. 벨로나 솔로 격파 핵심 메타 & 전략 분석 */}
                <section className="mb-12 sm:mb-16 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 sm:p-8 border border-slate-800 shadow-xl">
                    <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-center gap-2">
                        <Zap className="w-6 h-6 text-yellow-400" />
                        🎯 벨로나 솔로 격파를 위한 핵심 메타 분석
                    </h2>

                    <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                            <h3 className="font-bold text-base text-rose-400 mb-2">1. 즉사기 회피와 '짧은 쿨 무적기/이동기'의 중요성</h3>
                            <p>
                                벨로나는 그란디스 최상위 보스답게 전방위 마력 파동과 즉사급 장판 패턴을 쉴 새 없이 시전합니다.
                                1인 파티에서는 어그로 분산이 불가능하므로 <strong>칼리, 제논, 카데나, 듀블, 팬텀</strong>처럼
                                짧은 쿨타임의 무적기나 자유로운 공중 체공·캔슬 이동기를 가진 직업들이 월등히 높은 생존율과 딜 효율을 보였습니다.
                            </p>
                        </div>

                        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                            <h3 className="font-bold text-base text-blue-400 mb-2">2. 6차 헥사 스킬과 단일 극딜 압축</h3>
                            <p>
                                벨로나의 그로기(바인드) 타임은 매우 짧기 때문에 10~15초 이내에 6차 오리진 스킬과 주요 극딜기를
                                압축하여 쏟아붓는 능력이 필수적입니다. 제논의 오버로드 모드 + 메가 스매셔 연계나 칼리의 헥사 차크람 폭딜이
                                타임어택 상위권을 석권한 이유입니다.
                            </p>
                        </div>

                        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                            <h3 className="font-bold text-base text-amber-400 mb-2">3. 9월 16일 이벤트 마감 전까지의 랭킹 전망</h3>
                            <p>
                                벨로나 격파 이벤트는 <strong>2026년 9월 16일 오후 11시 59분까지</strong> 계속됩니다.
                                썬데이 메이플 및 샤이닝 스타포스 이벤트를 거치며 유저들의 템세팅(에테르넬 및 22성 둘둘)이 완성됨에 따라
                                마감 직전까지 치열한 타임어택 순위 갱신이 이어질 것으로 전망됩니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 하단 링크 CTA */}
                <footer className="border-t border-slate-800 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                        prefetch={false}
                        href="/blog"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        블로그 목록으로 돌아가기
                    </Link>

                    <Link
                        prefetch={false}
                        href="/blog/item-price-tracker-2026"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-purple-900/30"
                    >
                        <span>2026 아이템 시세 추적 확인하기</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </footer>
            </article>
        </div>
    );
}

function BarChartIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="20" y2="10"/>
            <line x1="18" x2="18" y1="20" y2="4"/>
            <line x1="6" x2="6" y1="20" y2="16"/>
        </svg>
    );
}
