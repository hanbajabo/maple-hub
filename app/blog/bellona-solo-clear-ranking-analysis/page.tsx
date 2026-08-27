import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowLeft, Trophy, Flame, Swords, Shield, Sparkles, TrendingUp, Users,
    Calendar, Crown, Award, ChevronRight, Zap, AlertTriangle, Crosshair, BarChart3
} from 'lucide-react';
import { AdBanner, InArticleAd } from '@/components/AdSense';

export const metadata: Metadata = {
    title: '⚔️ 하드 벨로나 1인 격파 TOP 50 랭킹 분석 | 메이플AI',
    description: '신규 최상위 보스 하드 벨로나 1인 격파 이벤트 TOP 50 랭커들의 직업·직업순위·환산순위 전수조사 및 0명 직업군 완벽 분석.',
    openGraph: {
        title: '⚔️ 하드 벨로나 1인 격파 TOP 50 랭킹 분석 — 메이플AI',
        description: '하드 벨로나 1인 파티 퍼클 TOP 50 [직업 / 직업순위 / 환산순위] 및 0명 직업군 총정리.',
        images: [
            {
                url: '/images/blog/bellona/bellona-event-banner.png',
                width: 1200,
                height: 630,
                alt: '하드 벨로나 1인 격파 이벤트 랭킹 분석',
            },
        ],
    },
};

// 50인 전체 상세 데이터 (직업 / 직업순위 / 환산순위 / 닉네임 / 월드)
const DETAILED_TOP_50 = [
    { rank: 1, name: '강은호', world: '스카니아', job: '칼리', jobRank: '칼리 1등', specRank: 1, highlight: true, note: '🏆 환산 1등 + 격파 1등 완벽 증명' },
    { rank: 2, name: '제논은T', world: '스카니아', job: '제논', jobRank: '제논 1등', specRank: 20, highlight: true, note: '🥈 환산 20등 ➔ 격파 2등 폭풍 견인' },
    { rank: 3, name: '귤민', world: '크로아', job: '메르세데스', jobRank: '메르 1등', specRank: 3, highlight: true, note: '🥉 메르세데스 1위 & 궁수 1위' },
    { rank: 4, name: '아델', world: '스카니아', job: '아델', jobRank: '아델 1등', specRank: 2, highlight: true, note: '전사 1위 & 환산 2위 랭커' },
    { rank: 5, name: '쯔단', world: '크로아', job: '캐논슈터', jobRank: '캐슈 1등', specRank: 4, highlight: true, note: '해적 1위 & 원거리 극딜 폭격' },
    { rank: 6, name: '고딩', world: '루나', job: '팔라딘', jobRank: '팔라딘 1등', specRank: 5, highlight: false, note: '팔라딘 생존 솔플 정점' },
    { rank: 7, name: '귀신', world: '베라', job: '섀도어', jobRank: '섀도어 1등', specRank: 9, highlight: false, note: '도적 암살·절개 유틸' },
    { rank: 8, name: '맑음', world: '크로아', job: '제논', jobRank: '제논 2등', specRank: 28, highlight: false, note: '환산 28등 ➔ 격파 8등' },
    { rank: 9, name: '카키', world: '스카니아', job: '팬텀', jobRank: '팬텀 2등', specRank: 15, highlight: false, note: '팬텀 유틸 강세' },
    { rank: 10, name: '나워', world: '루나', job: '나이트워커', jobRank: '나워 1등', specRank: 11, highlight: false, note: '나이트워커 1위' },
    { rank: 11, name: '물주', world: '베라', job: '팬텀', jobRank: '팬텀 1등', specRank: 13, highlight: false, note: '팬텀 직업 1등' },
    { rank: 12, name: '식중팬', world: '루나', job: '카데나', jobRank: '카데나 4등', specRank: 69, highlight: true, note: '⚡ 환산 69등 ➔ 격파 12등 피지컬!' },
    { rank: 13, name: '진격캐넌', world: '루나', job: '캐논슈터', jobRank: '캐슈 2등', specRank: 10, highlight: false, note: '캐논슈터 네임드' },
    { rank: 14, name: '세계', world: '엘리시움', job: '윈드브레이커', jobRank: '윈브 2등', specRank: 16, highlight: false, note: '윈브 솔플 격파' },
    { rank: 15, name: '노노', world: '베라', job: '아크메이지(불,독)', jobRank: '불독 1등', specRank: 14, highlight: false, note: '불독 직업 1위' },
    { rank: 16, name: '패릿', world: '스카니아', job: '아델', jobRank: '아델 3등', specRank: 17, highlight: false },
    { rank: 17, name: '서리', world: '스카니아', job: '제논', jobRank: '제논 4등', specRank: 94, highlight: true, note: '⚡ 환산 94등 ➔ 격파 17등!' },
    { rank: 18, name: '성배', world: '크로아', job: '비숍', jobRank: '비숍 1등', specRank: 7, highlight: false, note: '비숍 솔로 퍼클 달성' },
    { rank: 19, name: '배배', world: '에오스', job: '카이저', jobRank: '카이저 1등', specRank: 24, highlight: false, note: '카이저 1위' },
    { rank: 20, name: '후닝', world: '스카니아', job: '제논', jobRank: '제논 5등', specRank: 102, highlight: true, note: '⚡ 환산 102등 ➔ 격파 20등!' },
    { rank: 21, name: '남색', world: '루나', job: '제논', jobRank: '제논 3등', specRank: 47, highlight: false, note: '환산 47등 ➔ 격파 21등' },
    { rank: 22, name: '바붕', world: '루나', job: '카데나', jobRank: '카데나 2등', specRank: 45, highlight: false, note: '환산 45등 ➔ 격파 22등' },
    { rank: 23, name: '감팡검', world: '크로아', job: '아델', jobRank: '아델 2등', specRank: 12, highlight: false },
    { rank: 24, name: '상온', world: '크로아', job: '듀얼블레이드', jobRank: '듀블 2등', specRank: 30, highlight: false, note: '듀블 2위' },
    { rank: 25, name: '초코빵내꺼야', world: '엘리시움', job: '카데나', jobRank: '카데나 3등', specRank: 48, highlight: false, note: '환산 48등 ➔ 격파 25등' },
    { rank: 26, name: '쀼부', world: '에오스', job: '라라', jobRank: '라라 1등', specRank: 35, highlight: false, note: '라라 1위' },
    { rank: 27, name: '클라스', world: '스카니아', job: '제로', jobRank: '제로 1등', specRank: 43, highlight: false, note: '제로 1위' },
    { rank: 28, name: '가을', world: '엘리시움', job: '카데나', jobRank: '카데나 5등', specRank: 108, highlight: true, note: '⚡ 환산 108등 ➔ 격파 28등!' },
    { rank: 29, name: '게이', world: '루나', job: '아크메이지(불,독)', jobRank: '불독 2등', specRank: 19, highlight: false },
    { rank: 30, name: '레망', world: '크로아', job: '듀얼블레이드', jobRank: '듀블 1등', specRank: 25, highlight: false, note: '듀블 직업 1위' },
    { rank: 31, name: '완시', world: '베라', job: '카인', jobRank: '카인 1등', specRank: 66, highlight: false, note: '카인 1위' },
    { rank: 32, name: '티엘', world: '에오스', job: '보우마스터', jobRank: '보마 1등', specRank: 26, highlight: false, note: '보우마스터 1위' },
    { rank: 33, name: '작반', world: '엘리시움', job: '팬텀', jobRank: '팬텀 4등', specRank: 58, highlight: false },
    { rank: 34, name: '수다', world: '스카니아', job: '제논', jobRank: '제논 10등', specRank: 157, highlight: true, note: '⚡ 환산 157등 ➔ 격파 34등!' },
    { rank: 35, name: '응급', world: '엘리시움', job: '아크메이지(썬,콜)', jobRank: '썬콜 3등', specRank: 74, highlight: false, note: '썬콜 1위' },
    { rank: 36, name: '발톱', world: '에오스', job: '데몬어벤져', jobRank: '데벤 1등', specRank: 31, highlight: false, note: '데벤 1위' },
    { rank: 37, name: '달개화', world: '루나', job: '렌', jobRank: '렌 1등', specRank: 44, highlight: true, note: '✨ 신규 직업 렌 퍼클 달성!' },
    { rank: 38, name: '천원', world: '크로아', job: '데몬어벤져', jobRank: '데벤 3등', specRank: 55, highlight: false },
    { rank: 39, name: '박준형', world: '스카니아', job: '아델', jobRank: '아델 5등', specRank: 59, highlight: false },
    { rank: 40, name: '비숍', world: '스카니아', job: '비숍', jobRank: '비숍 2등', specRank: 8, highlight: false },
    { rank: 41, name: '오션', world: '스카니아', job: '히어로', jobRank: '히어로 1등', specRank: 33, highlight: false, note: '히어로 1위' },
    { rank: 42, name: '듀얼블레이더', world: '스카니아', job: '듀얼블레이드', jobRank: '듀블 4등', specRank: 40, highlight: false },
    { rank: 43, name: '르헤솔', world: '스카니아', job: '제로', jobRank: '제로 3등', specRank: 144, highlight: true, note: '⚡ 환산 144등 ➔ 격파 43등!' },
    { rank: 44, name: '집념', world: '루나', job: '아델', jobRank: '아델 10등', specRank: 103, highlight: true, note: '⚡ 환산 103등 ➔ 격파 44등!' },
    { rank: 45, name: '웨스턴총냥이', world: '루나', job: '캐논슈터', jobRank: '캐슈 3등', specRank: 29, highlight: false },
    { rank: 46, name: '박준호', world: '에오스', job: '제논', jobRank: '제논 12등', specRank: 227, highlight: true, note: '🔥 환산 227등 ➔ 격파 46등 대역전!' },
    { rank: 47, name: '팔라딘', world: '루나', job: '팔라딘', jobRank: '팔라딘 2등', specRank: 22, highlight: false },
    { rank: 48, name: '으찌', world: '베라', job: '제로', jobRank: '제로 2등', specRank: 67, highlight: false },
    { rank: 49, name: '최약체보스', world: '스카니아', job: '스트라이커', jobRank: '스커 1등', specRank: 73, highlight: false, note: '스트라이커 1위' },
    { rank: 50, name: '구구단', world: '루나', job: '나이트로드', jobRank: '나로 5등', specRank: 68, highlight: false, note: '나이트로드 1위' },
];

// 직업 배지 고대비 컬러 매핑
const getJobBadgeClass = (job: string) => {
    switch (job) {
        case '칼리':
            return 'bg-amber-500/25 text-amber-200 border-amber-400/60 font-black';
        case '제논':
            return 'bg-cyan-500/25 text-cyan-200 border-cyan-400/60 font-black';
        case '아델':
            return 'bg-purple-500/25 text-purple-200 border-purple-400/60 font-black';
        case '카데나':
            return 'bg-rose-500/25 text-rose-200 border-rose-400/60 font-black';
        case '메르세데스':
        case '보우마스터':
        case '윈드브레이커':
        case '카인':
            return 'bg-emerald-500/25 text-emerald-200 border-emerald-400/60 font-black';
        case '캐논슈터':
        case '스트라이커':
        case '카이저':
        case '팔라딘':
        case '히어로':
        case '데몬어벤져':
            return 'bg-orange-500/25 text-orange-200 border-orange-400/60 font-black';
        case '불독':
        case '썬콜':
        case '비숍':
        case '라라':
        case '아크메이지(불,독)':
        case '아크메이지(썬,콜)':
            return 'bg-blue-500/25 text-blue-200 border-blue-400/60 font-black';
        case '섀도어':
        case '팬텀':
        case '듀얼블레이드':
        case '나이트워커':
        case '나이트로드':
        case '제로':
            return 'bg-violet-500/25 text-violet-200 border-violet-400/60 font-black';
        case '렌':
            return 'bg-teal-500/25 text-teal-200 border-teal-400/60 font-black';
        default:
            return 'bg-slate-700 text-white border-slate-500 font-bold';
    }
};

// 퍼클 인원수 순위 집계
const GROUP_SUMMARY = [
    { rankBadge: '1위 (7명)', jobs: ['제논'], count: 7, color: 'border-cyan-500/60 bg-cyan-950/50 text-cyan-200' },
    { rankBadge: '2위 (5명)', jobs: ['아델'], count: 5, color: 'border-purple-500/60 bg-purple-950/50 text-purple-200' },
    { rankBadge: '3위 (4명)', jobs: ['카데나'], count: 4, color: 'border-rose-500/60 bg-rose-950/50 text-rose-200' },
    { rankBadge: '4위 (각 3명)', jobs: ['듀얼블레이드', '제로', '캐논슈터', '팬텀'], count: 12, color: 'border-amber-500/60 bg-amber-950/50 text-amber-200' },
    { rankBadge: '5위 (각 2명)', jobs: ['팔라딘', '불독', '비숍', '데몬어벤져'], count: 8, color: 'border-emerald-500/60 bg-emerald-950/50 text-emerald-200' },
    { rankBadge: '단일 격파 (각 1명)', jobs: ['칼리', '메르세데스', '섀도어', '나이트워커', '윈드브레이커', '카이저', '라라', '카인', '보우마스터', '썬콜', '렌', '히어로', '스트라이커', '나이트로드'], count: 14, color: 'border-slate-600 bg-slate-900/80 text-slate-100' },
];

// 퍼클 0명 직업군 목록
const MISSING_JOBS = [
    { category: '모험가', jobs: ['다크나이트', '신궁', '패스파인더', '바이퍼', '캡틴'] },
    { category: '시그너스 기사단', jobs: ['미하일', '소울마스터', '플레임위자드'] },
    { category: '영웅', jobs: ['아란', '에반', '루미너스', '은월'] },
    { category: '레지스탕스 & 데몬', jobs: ['블래스터', '배틀메이지', '와일드헌터', '메카닉', '데몬슬레이어'] },
    { category: '노바', jobs: ['엔젤릭버스터'] },
    { category: '레프', jobs: ['일리움', '아크'] },
    { category: '아니마', jobs: ['호영'] },
    { category: '기타 직업군', jobs: ['키네시스', '레테'] },
];

export default function BellonaClearRankingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* 상단 네비게이션 */}
            <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <Link
                        prefetch={false}
                        href="/blog"
                        className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-xs sm:text-sm font-bold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>블로그 목록</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-black border border-rose-500/40 flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-rose-400" />
                            하드 벨로나 퍼클 랭킹
                        </span>
                    </div>
                </div>
            </div>

            <article className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
                {/* 헤더 섹션 */}
                <header className="mb-8 sm:mb-12">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-black rounded-full shadow-lg shadow-red-900/40">
                            🔥 공식 퍼클 랭킹 전수조사
                        </span>
                        <span className="px-3 py-1 bg-slate-800 text-slate-200 text-xs font-bold rounded-full border border-slate-700">
                            이벤트 가이드
                        </span>
                        <span className="text-slate-300 text-xs sm:text-sm flex items-center gap-1 font-semibold">
                            <Calendar className="w-3.5 h-3.5 text-slate-300" />
                            2026년 8월 27일 기준 데이터
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-3">
                        ⚔️ 하드 벨로나 1인 격파 TOP 50 랭킹 분석
                    </h1>
                    <p className="text-sm sm:text-base text-rose-400 font-extrabold mb-4">
                        직업별 점유 순위 · [직업 / 직업순위 / 환산순위] · 0명 직업군 총정리
                    </p>

                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-4xl font-medium">
                        2026년 9월 16일까지 진행되는 신규 최상위 보스 <strong className="text-rose-400 font-black">하드 벨로나 1인 파티 격파 이벤트</strong>!
                        TOP 50 랭커들의 <strong>[직업 / 직업순위 / 환산순위]</strong>를 전수 조사하여,
                        제논 7명 독주 등 직업별 점유 순위와 퍼클 50인에 이름을 올리지 못한 직업군까지 완벽하게 파헤칩니다.
                    </p>
                </header>

                {/* 이벤트 공식 배너 */}
                <div className="mb-10 sm:mb-14 relative overflow-hidden rounded-2xl border border-rose-500/50 shadow-2xl bg-gradient-to-br from-rose-950/50 via-purple-950/40 to-slate-950">
                    <div className="relative w-full aspect-[21/9] max-h-[320px]">
                        <Image
                            src="/images/blog/bellona/bellona-event-banner.png"
                            alt="벨로나 격파 이벤트 1인 파티 공식 배너"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="p-4 sm:p-6 bg-slate-950/95 border-t border-rose-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-black text-[11px]">1인 파티 솔로</span>
                                <h3 className="font-black text-base sm:text-lg text-white">하드 벨로나 격파 이벤트 (BOSS CLEAR EVENT)</h3>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-300 font-medium">
                                📅 <strong>이벤트 시작일:</strong> <span className="text-rose-400 font-bold">2026년 8월 27일 (목) 오후 7시</span>
                            </p>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-200 text-xs font-black shrink-0">
                            ⏳ 1인 파티 격파 50인 완료
                        </div>
                    </div>
                </div>

                <AdBanner dataAdSlot="8162808816" className="mb-10" />

                {/* 1. 직업별 겹치는 순서 (점유율 요약) */}
                <section className="mb-12 sm:mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="w-6 h-6 text-indigo-400" />
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                            📊 하드 벨로나 퍼클 직업별 점유 순위 (50인 분포)
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
                        {GROUP_SUMMARY.map((g, idx) => (
                            <div key={idx} className={`p-4 sm:p-5 rounded-xl border ${g.color} shadow-lg flex flex-col justify-between`}>
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-black text-base text-white">{g.rankBadge}</span>
                                        <span className="text-xs font-black px-2.5 py-1 rounded bg-black/60 text-white border border-white/20">
                                            총 {g.count}명 ({((g.count / 50) * 100).toFixed(0)}%)
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {g.jobs.map((j, i) => (
                                            <span key={i} className="px-2.5 py-1 rounded bg-slate-950/80 text-xs font-black text-white border border-white/20 shadow-sm">
                                                {j}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" className="my-10" />

                {/* 2. 인게임 랭킹 스크린샷 5분할 갤러리 */}
                <section className="mb-12 sm:mb-16">
                    <div className="flex items-center justify-between gap-2 mb-6">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                                📸 인게임 공식 랭킹 스크린샷 (1위 ~ 50위)
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                                메이플스토리 인게임 보스 클리어 이벤트 1인 파티 공식 UI
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-slate-900 border border-amber-500/50 rounded-xl overflow-hidden shadow-xl">
                            <div className="bg-amber-500/25 px-3.5 py-2 border-b border-amber-500/40 flex items-center justify-between">
                                <span className="text-xs font-black text-amber-200">1 ~ 10위 (강은호 ~ 나워)</span>
                                <span className="text-[10px] text-amber-300 font-black">1위 칼리 강은호</span>
                            </div>
                            <div className="relative w-full aspect-[4/3] bg-slate-950">
                                <Image src="/images/blog/bellona/bellona-rank-1-10.png" alt="1~10위 스크린샷" fill className="object-contain p-2" />
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
                            <div className="bg-slate-800 px-3.5 py-2 border-b border-slate-700 flex items-center justify-between">
                                <span className="text-xs font-black text-white">11 ~ 20위 (물주 ~ 후닝)</span>
                                <span className="text-[10px] text-slate-300 font-bold">카데나/불독/비숍/카이저</span>
                            </div>
                            <div className="relative w-full aspect-[4/3] bg-slate-950">
                                <Image src="/images/blog/bellona/bellona-rank-11-20.png" alt="11~20위 스크린샷" fill className="object-contain p-2" />
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
                            <div className="bg-slate-800 px-3.5 py-2 border-b border-slate-700 flex items-center justify-between">
                                <span className="text-xs font-black text-white">21 ~ 30위 (남색 ~ 레망)</span>
                                <span className="text-[10px] text-slate-300 font-bold">카데나 3명/라라/제로/듀블</span>
                            </div>
                            <div className="relative w-full aspect-[4/3] bg-slate-950">
                                <Image src="/images/blog/bellona/bellona-rank-21-30.png" alt="21~30위 스크린샷" fill className="object-contain p-2" />
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
                            <div className="bg-slate-800 px-3.5 py-2 border-b border-slate-700 flex items-center justify-between">
                                <span className="text-xs font-black text-white">31 ~ 40위 (완시 ~ 비숍)</span>
                                <span className="text-[10px] text-emerald-300 font-black">37위 신직업 렌(달개화)</span>
                            </div>
                            <div className="relative w-full aspect-[4/3] bg-slate-950">
                                <Image src="/images/blog/bellona/bellona-rank-31-40.png" alt="31~40위 스크린샷" fill className="object-contain p-2" />
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
                            <div className="bg-slate-800 px-3.5 py-2 border-b border-slate-700 flex items-center justify-between">
                                <span className="text-xs font-black text-white">41 ~ 50위 (오션 ~ 구구단)</span>
                                <span className="text-[10px] text-cyan-300 font-black">46위 박준호(환산 227등)</span>
                            </div>
                            <div className="relative w-full aspect-[4/3] bg-slate-950">
                                <Image src="/images/blog/bellona/bellona-rank-41-50.png" alt="41~50위 스크린샷" fill className="object-contain p-2" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. TOP 50 전수조사 고대비 데이터 테이블 [직업 / 직업순위 / 환산순위] */}
                <section className="mb-12 sm:mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <Award className="w-6 h-6 text-purple-400" />
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                            📜 하드 벨로나 퍼클 50인 [직업 / 직업순위 / 환산순위] 전체 데이터
                        </h2>
                    </div>

                    <div className="overflow-x-auto rounded-xl border-2 border-slate-700 bg-slate-900 shadow-2xl">
                        <table className="w-full text-left text-xs sm:text-sm border-collapse">
                            <thead className="bg-slate-800 text-white font-black border-b-2 border-slate-600">
                                <tr>
                                    <th className="py-3.5 px-3 sm:px-4 text-center w-14 text-white">순위</th>
                                    <th className="py-3.5 px-3 sm:px-4 text-white">닉네임 (월드)</th>
                                    <th className="py-3.5 px-3 sm:px-4 text-white">직업</th>
                                    <th className="py-3.5 px-3 sm:px-4 text-center text-white">직업 내 순위</th>
                                    <th className="py-3.5 px-3 sm:px-4 text-center text-white">전체 환산 순위</th>
                                    <th className="py-3.5 px-3 sm:px-4 hidden md:table-cell text-white">특징 / 비고</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {DETAILED_TOP_50.map((row) => (
                                    <tr
                                        key={row.rank}
                                        className={`transition-colors ${
                                            row.rank === 1
                                                ? 'bg-amber-500/20 border-l-4 border-amber-400'
                                                : row.rank === 2
                                                ? 'bg-slate-800/80 border-l-4 border-slate-300'
                                                : row.rank === 3
                                                ? 'bg-amber-900/30 border-l-4 border-amber-600'
                                                : row.rank % 2 === 0
                                                ? 'bg-slate-900/90'
                                                : 'bg-slate-950/90'
                                        } hover:bg-slate-800`}
                                    >
                                        <td className="py-3 px-3 sm:px-4 text-center">
                                            {row.rank === 1 ? (
                                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-md">
                                                    1
                                                </span>
                                            ) : row.rank === 2 ? (
                                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 text-slate-950 font-black text-xs shadow-md">
                                                    2
                                                </span>
                                            ) : row.rank === 3 ? (
                                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-600 text-white font-black text-xs shadow-md">
                                                    3
                                                </span>
                                            ) : (
                                                <span className="text-white font-black text-xs sm:text-sm">{row.rank}등</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-3 sm:px-4">
                                            <span className="text-white font-black text-sm">{row.name}</span>
                                            <span className="text-sky-300 text-xs font-extrabold ml-1.5 px-1.5 py-0.5 rounded bg-sky-950/80 border border-sky-700/60">
                                                {row.world}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 sm:px-4">
                                            <span className={`inline-block px-2.5 py-1 rounded-md text-xs border shadow-sm ${getJobBadgeClass(row.job)}`}>
                                                {row.job}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 sm:px-4 text-center font-black text-white text-xs sm:text-sm">
                                            {row.jobRank}
                                        </td>
                                        <td className="py-3 px-3 sm:px-4 text-center">
                                            <span className={`font-black text-xs sm:text-sm px-2.5 py-0.5 rounded border ${
                                                row.specRank <= 5 ? 'text-amber-200 bg-amber-950/80 border-amber-500/60' :
                                                row.specRank <= 20 ? 'text-emerald-200 bg-emerald-950/80 border-emerald-500/60' :
                                                row.specRank >= 100 ? 'text-rose-200 bg-rose-950/80 border-rose-500/60' : 'text-sky-200 bg-sky-950/80 border-sky-500/60'
                                            }`}>
                                                {row.specRank}등
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 sm:px-4 text-slate-100 text-xs sm:text-sm font-semibold hidden md:table-cell">
                                            {row.note || '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 4. 퍼클에 없는 직업군 (0명) 목록 */}
                <section className="mb-12 sm:mb-16 bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-950 p-5 sm:p-8 rounded-2xl border-2 border-rose-500/40 shadow-2xl">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-6 h-6 text-rose-400" />
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                            🚫 하드 벨로나 퍼클 50인에 없는 직업군 (0명)
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 mb-6 font-medium">
                        최상위 50위권 격파자 명단에 단 한 명도 이름을 올리지 못한 직업군 목록입니다.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                        {MISSING_JOBS.map((cat, idx) => (
                            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-700 flex flex-col justify-between shadow-lg">
                                <div className="text-xs font-black text-rose-300 mb-2 border-b border-slate-700 pb-1.5 flex items-center justify-between">
                                    <span>{cat.category}</span>
                                    <span className="text-[10px] text-slate-300 font-bold bg-rose-950/80 px-1.5 py-0.5 rounded border border-rose-800/60">
                                        {cat.jobs.length}개 직업
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {cat.jobs.map((j, i) => (
                                        <span key={i} className="px-2.5 py-1 rounded bg-slate-800 text-white font-bold text-xs border border-slate-600 shadow-sm">
                                            {j}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
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
