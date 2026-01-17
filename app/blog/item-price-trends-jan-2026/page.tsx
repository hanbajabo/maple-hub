import { Metadata } from 'next';
import Link from 'next/link';
import ItemPriceChart from '@/components/blog/ItemPriceChart';
import { getPriceData } from '@/lib/parsePriceData';
import { AdBanner, InArticleAd } from '@/components/AdSense';
import { ArrowLeft, Zap, TrendingDown, Star, Calendar, CheckCircle, AlertTriangle, Sparkles, Target } from 'lucide-react';

export const metadata: Metadata = {
    title: '썬데이 메이플 [샤타포스 타임] 기념 | 최근 1월 강화 아이템 가격 확인하기',
    description: '2026년 1월 18일 썬데이 메이플 [샤타포스 타임] 기념! 최근 1월 강화 아이템 가격 및 시세 데이터를 확인해보세요.',
    openGraph: {
        title: '썬데이 메이플 [샤타포스 타임] 기념 | 최근 1월 강화 아이템 가격 확인하기',
        description: '2026년 1월 18일 썬데이 메이플! 최근 1월 강화 아이템 가격 데이터를 제공합니다.',
        images: [
            {
                url: 'https://maple-hub.com/images/og/price-trend-jan-2026.png',
                width: 1200,
                height: 630,
                alt: '썬데이 메이플 샤타포스 타임 가격 확인',
            },
        ],
    },
};

export default function ItemPriceTrendPage() {
    const priceData = getPriceData();

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
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full">
                            썬데이 메이플
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">
                            스타포스 추천
                        </span>
                        <span className="text-slate-500 text-sm">2026년 1월 17일</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        썬데이 메이플 [샤타포스 타임] 기념
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
                            최근 1월 강화 아이템 가격 확인하기
                        </span>
                    </h1>
                    <p className="text-lg text-slate-400">
                        1월 18일 일요일, 스타포스 비용 할인과 파괴 확률 감소 혜택! 최신 시세 데이터를 기반으로
                        지금 강화하면 가장 가성비 좋은 아이템을 추천합니다.
                    </p>
                </header>

                {/* 썬데이 메이플 안내 */}
                <div className="mb-12 bg-gradient-to-br from-yellow-900/30 via-orange-900/20 to-red-900/30 border-2 border-yellow-500/50 rounded-2xl p-5 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-75"></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-black text-yellow-400 mb-6 flex items-center gap-2">
                            <Calendar className="w-8 h-8" />
                            샤이닝 스타포스 타임
                        </h2>

                        <div className="bg-slate-900/70 rounded-xl p-6 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-5">
                                    <Calendar className="w-6 h-6 text-yellow-400 mb-3" />
                                    <p className="text-sm text-slate-400 mb-1">이벤트 일정</p>
                                    <p className="text-2xl font-black text-yellow-400">1월 18일 (일)</p>
                                    <p className="text-sm text-slate-300 mt-2">매주 일요일 진행</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <TrendingDown className="w-5 h-5 text-purple-400" />
                                            <span className="font-bold text-white">비용 30% 할인</span>
                                        </div>
                                        <p className="text-sm text-slate-300">스타포스 강화 비용 30% 할인</p>
                                    </div>
                                    <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                            <span className="font-bold text-white">파괴 확률 30% 감소</span>
                                        </div>
                                        <p className="text-sm text-slate-300">21성 이하 강화 시 파괴 확률 30% 감소</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 bg-blue-900/30 border border-blue-500/50 rounded-lg p-5">
                                <Sparkles className="w-6 h-6 text-blue-400 mb-3" />
                                <p className="font-bold text-white mb-3">💡 이번 샤타포스 핵심</p>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 font-bold">•</span>
                                        <span>강화 비용 30% 할인으로 메소 부담 대폭 완화</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 font-bold">•</span>
                                        <span>21성 이하 파괴 확률 30% 감소로 터질 걱정 DOWN!</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <AdBanner dataAdSlot="8162808816" className="mb-12" />

                {/* 시세 데이터 차트 */}
                <section className="mb-16">
                    <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 flex items-center gap-2">
                            <TrendingDown className="w-8 h-8 text-blue-400" />
                            최근 시세 동향 (1/1 ~ 1/17)
                        </h2>
                        <p className="text-slate-400">
                            아래 그래프에서 원하는 아이템을 선택하여 최근 17일간의 가격 변화를 확인하세요.
                            <br className="hidden sm:block" />
                            1월 17일 데이터는 <strong className="text-slate-300">오전 9시 기준</strong>이며, 정확한 현재 시세는 인게임 경매장을 확인하시기 바랍니다.
                        </p>
                    </div>
                    <ItemPriceChart data={priceData} />
                </section>

                <InArticleAd dataAdSlot="6849727140" className="my-12" />

                {/* 주요 아이템 분석 */}
                <div id="analysis-section" className="space-y-8 mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Target className="w-6 h-6 text-blue-400" />
                        주요 아이템 시세 분석
                    </h2>

                    {/* 1. 거대한 공포 */}
                    <div className="bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-500 transition-all">
                        <div className="p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full">
                                            가장 큰 하락폭
                                        </span>
                                        <span className="text-slate-500 text-sm">칠흑의 보스 세트</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                        거대한 공포 (반지)
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-slate-400 mb-1">현재 시세 (1/17)</p>
                                    <p className="text-3xl font-black text-blue-400">50.5억</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-800/50 rounded-xl p-5">
                                    <h4 className="flex items-center gap-2 text-slate-300 font-bold mb-4">
                                        <TrendingDown className="w-5 h-5 text-blue-400" />
                                        시세 변화 추이
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                                            <span className="text-slate-400">1월 2일 (고점)</span>
                                            <span className="text-white font-bold">90억</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400">1월 17일 (현재)</span>
                                            <span className="text-blue-400 font-bold">50.5억</span>
                                        </div>
                                        <div className="text-right text-sm text-red-400 font-bold">
                                            ▼ 43.9% 하락
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-800/50 rounded-xl p-5">
                                    <h4 className="flex items-center gap-2 text-slate-300 font-bold mb-4">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                        분석 코멘트
                                    </h4>
                                    <ul className="space-y-2 text-sm text-slate-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400 mt-1">•</span>
                                            <span>1월 초 90억까지 치솟았던 가격이 거품이 빠지며 정상화되었습니다.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400 mt-1">•</span>
                                            <span>현재 본섭 시세(47억)와 거의 비슷한 수준까지 내려왔습니다.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400 mt-1">•</span>
                                            <span>챌린저스 서버 내 공급량이 안정적으로 늘어나며 가격이 안정화된 것으로 보입니다.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. 에테르넬 가성비 4종 */}
                    <div className="bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-500 transition-all">
                        <div className="p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">
                                            가성비 갑
                                        </span>
                                        <span className="text-slate-500 text-sm">에테르넬 세트</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">
                                        에테르넬 (모자/상/하의/견장)
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-slate-400 mb-1">현재 평균 (1/17)</p>
                                    <p className="text-3xl font-black text-purple-400">4.5억</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-800/50 rounded-xl p-5">
                                    <h4 className="flex items-center gap-2 text-slate-300 font-bold mb-4">
                                        <TrendingDown className="w-5 h-5 text-purple-400" />
                                        시세 변화 추이
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                                            <span className="text-slate-400">1월 1일 (초기)</span>
                                            <span className="text-white font-bold">8.7억</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400">1월 17일 (현재)</span>
                                            <span className="text-purple-400 font-bold">4.5억</span>
                                        </div>
                                        <div className="text-right text-sm text-green-400 font-bold">
                                            ▼ 48.3% 대폭 하락
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-800/50 rounded-xl p-5">
                                    <h4 className="flex items-center gap-2 text-slate-300 font-bold mb-3">
                                        <CheckCircle className="w-5 h-5 text-purple-400" />
                                        분석 코멘트
                                    </h4>
                                    <ul className="space-y-2 text-sm text-slate-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>4부위 모두 가격이 보름 만에 반토막 났습니다. 특히 <strong className="text-white">견장</strong>까지 저렴해진 것이 특징입니다.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>노작 가격이 매우 저렴해져서, 노작 구매 후 <strong className="text-blue-400">12~17성 직작</strong>을 하기에 가장 좋은 시기입니다.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. 에테르넬 고가 3종 */}
                    <div className="bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-500 transition-all">
                        <div className="p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-full">
                                            완만한 하락세
                                        </span>
                                        <span className="text-slate-500 text-sm">에테르넬 세트</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">
                                        에테르넬 (신발/장갑/망토)
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-slate-400 mb-1">현재 평균 (1/17)</p>
                                    <p className="text-3xl font-black text-indigo-400">29.2억</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-800/50 rounded-xl p-5">
                                    <h4 className="flex items-center gap-2 text-slate-300 font-bold mb-4">
                                        <TrendingDown className="w-5 h-5 text-indigo-400" />
                                        시세 변화 추이
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                                            <span className="text-slate-400">1월 1일 (초기)</span>
                                            <span className="text-white font-bold">35.7억</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400">1월 17일 (현재)</span>
                                            <span className="text-indigo-400 font-bold">29.2억</span>
                                        </div>
                                        <div className="text-right text-sm text-green-400 font-bold">
                                            ▼ 18.2% 하락
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-800/50 rounded-xl p-5">
                                    <h4 className="flex items-center gap-2 text-slate-300 font-bold mb-3">
                                        <CheckCircle className="w-5 h-5 text-indigo-400" />
                                        분석 코멘트
                                    </h4>
                                    <ul className="space-y-2 text-sm text-slate-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-indigo-400 mt-1">•</span>
                                            <span>공급이 적은 신발, 장갑, 망토는 여전히 가격대가 높습니다.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-indigo-400 mt-1">•</span>
                                            <span>하락세이긴 하나 가성비 4종에 비해 낙폭이 작으므로, <strong className="text-white">무리한 직작보다는 완제품 구매</strong>를 고려해보거나 가볍게 12성 이상 강화하여 사용하는 것도 괜찮아 보입니다.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. 주의 필요 아이템 */}
                    <div className="bg-red-900/10 border border-red-500/30 rounded-2xl p-6 sm:p-8">
                        <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-6 h-6" />
                            여전히 가격 차이가 큰 아이템 (스타포스 가능 기준)
                        </h3>
                        <p className="text-slate-300 mb-6">
                            아래 아이템들은 본 서버 대비 챌린저스 서버의 가격이 <strong className="text-red-400">2배에서 최대 5배 이상</strong> 비싸게 형성되어 있습니다.
                            가격 거품이 빠질 때까지 구매를 미루는 것을 추천합니다.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-slate-900/80 rounded-lg p-4 flex justify-between items-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold">
                                    압도적 1위
                                </div>
                                <div>
                                    <span className="block text-white font-bold">미트라의 분노</span>
                                    <span className="text-xs text-slate-500">50억 vs 8.8억</span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-xs text-slate-400">가격 차이</span>
                                    <span className="text-red-400 font-bold text-lg">+41.2억</span>
                                </div>
                            </div>
                            <div className="bg-slate-900/80 rounded-lg p-4 flex justify-between items-center">
                                <div>
                                    <span className="block text-white font-bold">루즈 컨트롤 마크</span>
                                    <span className="text-xs text-slate-500">24.5억 vs 12.5억</span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-xs text-slate-400">가격 차이</span>
                                    <span className="text-red-400 font-bold text-lg">+12억</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 결론 */}
                <div className="mb-12 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-yellow-500/50 rounded-2xl p-5 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-black mb-6 text-yellow-400 flex items-center gap-2">
                        <Zap className="w-8 h-8" />
                        마무리: 썬데이 메이플 체크리스트
                    </h2>

                    <div className="space-y-4 text-slate-300">
                        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6">
                            <p className="font-bold text-blue-400 mb-4 text-lg">✅ 썬데이 메이플 전 준비사항</p>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span><strong className="text-white">메소 확보:</strong> 목표 강화 단계에 맞춰 충분한 여유 자금 준비</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span><strong className="text-white">강화 타겟 설정:</strong> 거대한 공포(반지) 및 에테르넬(모/상/하) 등 효율 좋은 아이템 우선</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span><strong className="text-white">이벤트 혜택:</strong> 21성 이하 파괴 확률 30% 감소 (자동 적용) 혜택 활용</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/50 rounded-lg p-6">
                            <p className="font-bold text-green-400 mb-3 text-lg">🎯 이번 분석 요약</p>
                            <div className="space-y-2 text-sm">
                                <p className="text-yellow-300 font-bold">거대한 공포: 가격 안정화로 구매 적기 판단</p>
                                <p className="text-blue-300 font-bold">에테르넬 장비: 가격 대폭 하락으로 직작 효율 최상 (강력 추천)</p>
                            </div>
                        </div>

                        <p className="text-slate-400 text-center italic text-lg pt-4">
                            행운을 빕니다! 목표하신 스타포스 단계까지 스트레이트 성공하시길! 🍀✨
                        </p>
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
