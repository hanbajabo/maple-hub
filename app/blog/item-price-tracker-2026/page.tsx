import { Metadata } from 'next';
import Link from 'next/link';
import ItemPriceChart from '@/components/blog/ItemPriceChart';
import { getPriceData } from '@/lib/parsePriceData';
import { AdBanner, InArticleAd } from '@/components/AdSense';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, LineChart, RefreshCw, Star } from 'lucide-react';

export const metadata: Metadata = {
    title: '2026년 메이플스토리 아이템 시세 추적 (물욕템 시세) | 챌린저스 vs 본섭 가격 비교',
    description: '2026년 메이플스토리 주요 아이템 시세를 매일 업데이트합니다. 챌린저스 서버와 본 서버의 가격을 비교하고, 에테르넬 장비 가격 추이를 확인하세요.',
    openGraph: {
        title: '2026년 메이플스토리 아이템 시세 추적 (물욕템 시세)',
        description: '매일 업데이트되는 메이플스토리 아이템 시세 데이터. 챌린저스 vs 본섭 가격 비교',
        images: [
            {
                url: 'https://maple-hub.com/images/og/price-tracker-2026.png',
                width: 1200,
                height: 630,
                alt: '2026년 메이플스토리 아이템 시세 추적',
            },
        ],
    },
};

export default function ItemPriceTrackerPage() {
    const priceData = getPriceData();

    // 현재 날짜 계산 (마지막 업데이트 날짜)
    const lastUpdateDate = priceData.length > 0 ? priceData[priceData.length - 1].date : '2026-01-01';
    const formatKoreanDate = (dateStr: string) => {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
        }
        return dateStr;
    };
    const lastUpdate = formatKoreanDate(lastUpdateDate);
    const trackingStart = '2026년 1월 1일';

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
                <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
                    <Link prefetch={false}
                        href="/blog"
                        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-xs sm:text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>블로그로 돌아가기</span>
                    </Link>
                    <span className="text-[11px] text-slate-400 font-medium">
                        최종 갱신: <strong className="text-emerald-400">{lastUpdateDate}</strong>
                    </span>
                </div>
            </div>

            {/* Article */}
            <article className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-10">
                {/* Title Section */}
                <header className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-3 flex-wrap">
                        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-blue-500/20 text-blue-400 text-[11px] sm:text-xs font-bold rounded-full flex items-center gap-1">
                            <RefreshCw className="w-3 h-3" />
                            매일 업데이트
                        </span>
                        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-emerald-500/20 text-emerald-400 text-[11px] sm:text-xs font-bold rounded-full">
                            시세 추적
                        </span>
                        <span className="text-slate-400 text-xs sm:text-sm">최종 업데이트: {lastUpdate}</span>
                    </div>
                    <h1 className="text-xl sm:text-3xl md:text-5xl font-black text-white mb-3 sm:mb-4 leading-snug sm:leading-tight">
                        2026년 메이플스토리
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                            아이템 시세 추적 (물욕템 시세)
                        </span>
                    </h1>
                    <p className="text-xs sm:text-base text-slate-400 leading-relaxed">
                        매일 업데이트되는 주요 아이템 시세 데이터입니다. 
                        챌린저스 서버와 본 서버의 가격을 비교하고, 에테르넬 장비의 가격 추이를 한눈에 확인하세요.
                    </p>
                </header>

                {/* 추적 정보 카드 (모바일 3열 콤팩트 대시보드) */}
                <div className="mb-8 sm:mb-12 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-pink-900/30 border border-blue-500/40 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10">
                        <h2 className="text-base sm:text-xl font-bold text-blue-400 mb-3 sm:mb-4 flex items-center gap-2">
                            <LineChart className="w-5 h-5 text-blue-400" />
                            시세 추적 대시보드
                        </h2>

                        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
                            <div className="bg-slate-900/80 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-blue-500/30 flex flex-col justify-between">
                                <div className="flex items-center gap-1 text-slate-400 mb-1">
                                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                                    <p className="text-[10px] sm:text-xs">시작일</p>
                                </div>
                                <p className="text-xs sm:text-base font-black text-blue-400 truncate">{trackingStart}</p>
                            </div>
                            <div className="bg-slate-900/80 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-emerald-500/30 flex flex-col justify-between">
                                <div className="flex items-center gap-1 text-slate-400 mb-1">
                                    <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                                    <p className="text-[10px] sm:text-xs">최종 갱신</p>
                                </div>
                                <p className="text-xs sm:text-base font-black text-emerald-400 truncate">{lastUpdateDate}</p>
                            </div>
                            <div className="bg-slate-900/80 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-purple-500/30 flex flex-col justify-between">
                                <div className="flex items-center gap-1 text-slate-400 mb-1">
                                    <Star className="w-3.5 h-3.5 text-purple-400" />
                                    <p className="text-[10px] sm:text-xs">갱신 주기</p>
                                </div>
                                <p className="text-xs sm:text-base font-black text-purple-400 truncate">매일 10시</p>
                            </div>
                        </div>

                        <div className="bg-slate-900/80 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-800">
                            <p className="font-bold text-white text-xs sm:text-sm mb-2">📊 추적 품목 요약</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                                <div>
                                    <p className="text-blue-400 font-bold mb-1">🔥 주요 보스 장신구 & 시드링</p>
                                    <p className="text-[11px] text-slate-400 leading-relaxed">
                                        거공, 고근, 커포, 루컨마, 마깃안, 몽벨, 창뱃, 언더컨트롤, 리4, 컨4, 자석펫, 굶주리는 핏빛 원혼 등
                                    </p>
                                </div>
                                <div>
                                    <p className="text-purple-400 font-bold mb-1">⚔️ 에테르넬 35종 (7부위 × 5직업)</p>
                                    <p className="text-[11px] text-slate-400 leading-relaxed">
                                        모자, 상의, 하의, 견장, 신발, 장갑, 망토 (전사/마법사/궁수/도적/해적)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI 스펙업 진단기 바로가기 배너 */}
                <div className="mb-6 sm:mb-8 bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-blue-900/40 border border-emerald-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-emerald-950/40">
                    <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 text-2xl">
                            🔮
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-extrabold text-[10px] uppercase tracking-wider">NEW</span>
                                <h3 className="text-sm sm:text-base font-black text-white">실시간 시세 기반 AI 스펙업 견적 진단기</h3>
                            </div>
                            <p className="text-xs text-slate-300 mt-0.5">
                                본 시세 데이터와 넥슨 확률 엔진을 결합하여 내 캐릭터 최적의 1~5순위 가성비 스펙업 경로를 추천합니다.
                            </p>
                        </div>
                    </div>
                    <Link
                        prefetch={false}
                        href="/calculator/specup-advisor"
                        className="w-full sm:w-auto shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm text-center shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-1.5"
                    >
                        <span>내 캐릭터 진단하기</span>
                        <span>➔</span>
                    </Link>
                </div>

                <AdBanner dataAdSlot="8162808816" className="mb-6 sm:mb-10" />

                {/* 시세 데이터 차트 */}
                <section className="mb-10 sm:mb-16">
                    <div className="mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-2xl font-black text-white mb-1.5 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-blue-400" />
                            실시간 가격 추이 분석
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            원하는 아이템과 기간을 선택하여 일자별 가격 흐름을 한눈에 비교해 보세요.
                        </p>
                    </div>
                    <ItemPriceChart data={priceData} />
                </section>

                <InArticleAd dataAdSlot="6849727140" className="my-8 sm:my-12" />

                {/* 시세 활용 가이드 */}
                <div className="mb-10 sm:mb-12 bg-gradient-to-br from-slate-900 to-slate-950 border border-purple-500/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
                    <h2 className="text-base sm:text-2xl font-black mb-4 text-purple-400 flex items-center gap-2">
                        <TrendingDown className="w-5 h-5 sm:w-7 sm:h-7 text-purple-400" />
                        시세 데이터 활용 가이드
                    </h2>

                    <div className="space-y-3 sm:space-y-4 text-slate-300">
                        <div className="bg-blue-950/40 border border-blue-500/40 rounded-lg sm:rounded-xl p-3.5 sm:p-5">
                            <p className="font-bold text-blue-400 mb-2 text-sm sm:text-base">💡 스마트 구매 전략</p>
                            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                                <li className="flex items-start gap-1.5">
                                    <span className="text-blue-400 font-bold">•</span>
                                    <span><strong className="text-white">하락 안정세:</strong> 3일 이상 가격이 횡보하거나 본섭 시세와 격차가 좁혀질 때가 1차 매수 적기입니다.</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                    <span className="text-blue-400 font-bold">•</span>
                                    <span><strong className="text-white">이벤트 타이밍:</strong> 샤타포스, 썬데이 메이플 직전 매물 증가 시기를 노려보세요.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-lg sm:rounded-xl p-3.5 sm:p-5">
                            <p className="font-bold text-emerald-400 mb-2 text-sm sm:text-base">📈 효율적인 판매 전략</p>
                            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                                <li className="flex items-start gap-1.5">
                                    <span className="text-emerald-400 font-bold">•</span>
                                    <span><strong className="text-white">시즌 피크:</strong> 대규모 방학 쇼케이스 및 신규 보스 출시 직후 수요 급증 시 고점 매도를 고려하세요.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="border-t border-slate-800 pt-6 mt-8">
                    <div className="text-center">
                        <Link prefetch={false}
                            href="/blog"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg shadow-purple-900/30"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            블로그 목록으로 돌아가기
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
