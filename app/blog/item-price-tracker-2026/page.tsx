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
    const lastUpdate = lastUpdateDate.replace(/-/g, '년 ').replace(/(\d+)$/, '$1일').replace(/(\d+)일/, (match, p1) => `${p1.replace(/^0/, '')}일`).replace(/(\d+) (\d+)일/, '$1년 $2월 ');
    const trackingStart = '2026년 1월 1일';

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 sm:mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">블로그로 돌아가기</span>
                    </Link>
                </div>
            </div>

            {/* Article */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Title Section */}
                <header className="mb-8">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full flex items-center gap-1">
                            <RefreshCw className="w-3 h-3" />
                            매일 업데이트
                        </span>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                            시세 추적
                        </span>
                        <span className="text-slate-500 text-sm">최종 업데이트: {lastUpdate}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        2026년 메이플스토리
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                            아이템 시세 추적 (물욕템 시세)
                        </span>
                    </h1>
                    <p className="text-lg text-slate-400">
                        매일 업데이트되는 주요 아이템 시세 데이터입니다.
                        챌린저스 서버와 본 서버의 가격을 비교하고, 에테르넬 장비의 가격 추이를 실시간으로 확인하세요.
                    </p>
                </header>

                {/* 추적 정보 카드 */}
                <div className="mb-12 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-pink-900/30 border-2 border-blue-500/50 rounded-2xl p-5 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-75"></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-black text-blue-400 mb-6 flex items-center gap-2">
                            <LineChart className="w-8 h-8" />
                            시세 추적 정보
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-slate-900/70 rounded-xl p-5 border border-blue-500/30">
                                <Calendar className="w-6 h-6 text-blue-400 mb-3" />
                                <p className="text-sm text-slate-400 mb-1">추적 시작일</p>
                                <p className="text-xl font-black text-blue-400">{trackingStart}</p>
                            </div>
                            <div className="bg-slate-900/70 rounded-xl p-5 border border-green-500/30">
                                <RefreshCw className="w-6 h-6 text-green-400 mb-3" />
                                <p className="text-sm text-slate-400 mb-1">최종 업데이트</p>
                                <p className="text-xl font-black text-green-400">{lastUpdate}</p>
                            </div>
                            <div className="bg-slate-900/70 rounded-xl p-5 border border-purple-500/30">
                                <Star className="w-6 h-6 text-purple-400 mb-3" />
                                <p className="text-sm text-slate-400 mb-1">업데이트 주기</p>
                                <p className="text-xl font-black text-purple-400">매일 오전 10시</p>
                            </div>
                        </div>

                        <div className="bg-slate-900/70 rounded-xl p-5">
                            <p className="font-bold text-white mb-3">📊 추적 아이템 목록</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
                                <div>
                                    <p className="text-blue-400 font-bold mb-2">🔥 주요 보스 아이템</p>
                                    <ul className="space-y-1 text-xs">
                                        <li>• 거대한 공포, 고통의 근원</li>
                                        <li>• 커맨더 포스, 루즈 컨트롤 마크</li>
                                        <li>• 마법이 깃든 안대, 몽환의 벨트</li>
                                        <li>• 미트라의 분노, 창세의 뱃지</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-purple-400 font-bold mb-2">⚔️ 에테르넬 장비</p>
                                    <ul className="space-y-1 text-xs">
                                        <li>• 모자, 상의, 하의, 견장</li>
                                        <li>• 신발, 장갑, 망토</li>
                                        <li>• (전사/마법사/궁수/도적/해적)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <AdBanner dataAdSlot="8162808816" className="mb-12" />

                {/* 시세 데이터 차트 */}
                <section className="mb-16">
                    <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 flex items-center gap-2">
                            <TrendingUp className="w-8 h-8 text-blue-400" />
                            실시간 가격 추이
                        </h2>
                        <p className="text-slate-400">
                            아래 표에서 원하는 아이템을 선택하여 가격 변화를 확인하세요.
                            <br className="hidden sm:block" />
                            데이터는 <strong className="text-slate-300">매일 오전 10시 기준</strong>으로 수집되며,
                            정확한 현재 시세는 인게임 경매장을 확인하시기 바랍니다.
                        </p>
                    </div>
                    <ItemPriceChart data={priceData} />
                </section>

                <InArticleAd dataAdSlot="6849727140" className="my-12" />

                {/* 시세 활용 가이드 */}
                <div className="mb-12 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-purple-500/50 rounded-2xl p-5 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-black mb-6 text-purple-400 flex items-center gap-2">
                        <TrendingDown className="w-8 h-8" />
                        시세 데이터 활용 팁
                    </h2>

                    <div className="space-y-4 text-slate-300">
                        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6">
                            <p className="font-bold text-blue-400 mb-4 text-lg">💡 구매 타이밍</p>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400 font-bold">•</span>
                                    <span><strong className="text-white">가격 하락세:</strong> 3일 이상 지속적으로 하락하는 아이템은 추가 하락 가능성이 있으니 조금 더 기다려보세요.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400 font-bold">•</span>
                                    <span><strong className="text-white">바닥 확인:</strong> 가격이 본섭과 비슷한 수준에 도달하면 구매 적기일 수 있습니다.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400 font-bold">•</span>
                                    <span><strong className="text-white">이벤트 활용:</strong> 샤타포스, 주문서 이벤트 기간에 맞춰 구매하면 더욱 효율적입니다.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6">
                            <p className="font-bold text-green-400 mb-4 text-lg">📈 판매 타이밍</p>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 font-bold">•</span>
                                    <span><strong className="text-white">가격 반등:</strong> 하락 후 가격이 다시 오르기 시작하면 판매를 고려하세요.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 font-bold">•</span>
                                    <span><strong className="text-white">본섭 대비 고가:</strong> 챌섭 가격이 본섭보다 2배 이상 높으면 거품일 가능성이 높습니다.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-6">
                            <p className="font-bold text-purple-400 mb-4 text-lg">⚠️ 주의사항</p>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 font-bold">•</span>
                                    <span><strong className="text-yellow-400">책임 고지:</strong> 본 정보는 시장 상황 이해를 돕기 위한 <strong className="text-white">참고 자료</strong>이며, 실제 거래 판단에 대한 책임은 사용자에게 있습니다.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 font-bold">•</span>
                                    <span>패치, 이벤트 등으로 <strong className="text-white">급격한 시세 변동</strong>이 발생할 수 있습니다.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 font-bold">•</span>
                                    <span>최종 구매 결정은 <strong className="text-white">인게임 경매장</strong>에서 직접 확인 후 진행하세요.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="border-t border-slate-700 pt-8 mt-12">
                    <div className="text-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-500 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            블로그 메인으로
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
