import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, Calendar, TrendingUp, DollarSign, BarChart3, Trophy, Sparkles, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AdBanner, InArticleAd } from '@/components/AdSense';

// TopRankingTable을 dynamic import로 불러와서 client component로 사용
const TopRankingTable = dynamic(() => import('@/components/blog/TopRankingTable'), {
    loading: () => (
        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-12 text-center">
            <p className="text-slate-400">로딩 중...</p>
        </div>
    ),
});

const DuplicateNicknamesTable = dynamic(() => import('@/components/blog/DuplicateNicknamesTable'), {
    loading: () => <div className="h-64 bg-slate-800/30 rounded-xl animate-pulse" />
});

export const metadata: Metadata = {
    title: '메이플스토리 뉴네임 옥션 시즌별 낙찰가 총정리 - 가격 트렌드 분석 - Maple AI',
    description: '시즌1부터 시즌5까지 뉴네임 옥션의 모든 낙찰가 데이터를 분석! 인기 닉네임 유형, 시즌별 최고가/최저가 비교, 가격대별 추천 닉네임까지 완벽 정리.',
    keywords: '메이플스토리, 뉴네임옥션, 닉네임, 낙찰가, 시즌분석, 닉네임가격, 인기닉네임',
};

export default function NewNameAuctionAnalysisPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">블로그 목록으로</span>
                    </Link>
                </div>
            </div>

            {/* Article */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Title */}
                <header className="mb-8 sm:mb-12">
                    <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-xs sm:text-sm font-bold rounded-full mb-4">
                        💎 메이플 이야기
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
                        💰 뉴네임 옥션 시즌별 낙찰가 총정리<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                            가격 트렌드와 인기 닉네임 분석
                        </span>
                    </h1>
                    <div className="flex items-center gap-6 text-xs sm:text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>2026년 1월 17일</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            <span>데이터 분석</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    {/* Introduction */}
                    <section className="mb-12">
                        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6 mb-8">
                            <p className="text-lg text-slate-200 leading-relaxed mb-0">
                                메이플스토리의 <strong className="text-yellow-400">뉴네임 옥션</strong>은 유저들의 창의력과 열망이 담긴 특별한 이벤트입니다.
                                시즌1부터 시즌5까지 수많은 닉네임들이 경매되었고, 그 과정에서 흥미로운 <strong className="text-purple-400">가격 트렌드</strong>와
                                <strong className="text-pink-400"> 선호도 변화</strong>가 나타났습니다.
                            </p>
                        </div>

                        <p className="text-slate-300 leading-relaxed">
                            이 글에서는 시즌별 낙찰가 데이터를 바탕으로 <strong className="text-blue-400">인기 닉네임의 유형</strong>,
                            <strong className="text-green-400"> 가격대별 추천</strong>, 그리고 <strong className="text-orange-400">고가 닉네임의 등락</strong>을
                            심층 분석합니다.
                        </p>
                    </section>

                    {/* Ad Placement 1: Intro */}
                    <AdBanner dataAdSlot="8162808816" className="mb-12" />

                    {/* Section 1: 시즌별 최고가 비교 */}
                    <section className="mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                            시즌별 최고가 닉네임 비교
                        </h2>

                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 sm:p-6 mb-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-lg">
                                    <div>
                                        <p className="text-yellow-400 font-bold text-lg">시즌1 최고가</p>
                                        <p className="text-white text-xl font-bold mt-1">라라</p>
                                    </div>
                                    <p className="text-2xl sm:text-3xl font-black text-yellow-400">3,000만</p>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
                                    <div>
                                        <p className="text-blue-400 font-bold">시즌2 최고가</p>
                                        <p className="text-white text-xl font-bold mt-1">소녀</p>
                                    </div>
                                    <p className="text-xl sm:text-2xl font-bold text-blue-400">1,200만</p>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
                                    <div>
                                        <p className="text-purple-400 font-bold">시즌2.5 최고가</p>
                                        <p className="text-white text-xl font-bold mt-1">세구 <span className="text-slate-400 text-sm font-normal">(운영자 직판)</span></p>
                                    </div>
                                    <p className="text-xl sm:text-2xl font-bold text-purple-400">620만</p>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
                                    <div>
                                        <p className="text-pink-400 font-bold">시즌3 최고가</p>
                                        <p className="text-white text-xl font-bold mt-1">여우</p>
                                    </div>
                                    <p className="text-xl sm:text-2xl font-bold text-pink-400">1,570만</p>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-900/30 to-pink-900/30 border border-red-500/30 rounded-lg">
                                    <div>
                                        <p className="text-red-400 font-bold text-lg">시즌4 최고가</p>
                                        <p className="text-white text-xl font-bold mt-1">아이</p>
                                    </div>
                                    <p className="text-2xl sm:text-3xl font-black text-red-400">1,910만</p>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 border border-emerald-500/30 rounded-lg">
                                    <div>
                                        <p className="text-emerald-400 font-bold text-lg">시즌5 최고가</p>
                                        <p className="text-white text-xl font-bold mt-1">여름</p>
                                    </div>
                                    <p className="text-2xl sm:text-3xl font-black text-emerald-400">1,800만</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                            <p className="text-blue-300 font-bold mb-2">📊 트렌드 분석</p>
                            <p className="text-slate-300 mb-0">
                                시즌1 이후 최고가가 하락했다가 시즌4에서 <strong className="text-red-400">역대 2위(1,910만)</strong>를 기록했습니다.
                                이는 뉴네임 옥션의 희소성과 인기가 다시 상승하고 있음을 보여줍니다.
                            </p>
                        </div>
                    </section>

                    {/* Section 2: 고가 닉네임의 등락 */}
                    <section className="mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                            고가 닉네임의 시즌별 등락
                        </h2>

                        <p className="text-slate-300 leading-relaxed mb-6">
                            같은 유형의 닉네임이라도 시즌에 따라 가격이 크게 변동합니다.
                            여기서는 대표적인 고가 닉네임들의 시즌별 가격 변화를 추적합니다.
                        </p>

                        {/* 라라 가격 변화 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                                ⭐ "라라" 닉네임 가격 변화
                            </h3>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-yellow-400 font-bold">시즌1</span> • 라라</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-xl sm:text-2xl font-bold text-yellow-400">3,000만</span>
                                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded">👑 최고가</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-blue-400 font-bold">시즌3</span> • 라라</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-lg sm:text-xl font-bold text-white">1,300만</span>
                                        <ArrowDownRight className="w-5 h-5 text-red-400" />
                                        <span className="text-red-400 text-sm">-56.7%</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mt-4 mb-0">
                                💬 메이플 대표 캐릭터 "라라"는 초기 높은 관심을 받았으나, 시즌3에서는 절반 이하로 하락했습니다.
                            </p>
                        </div>

                        {/* 토끼 가격 변화 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2">
                                🐰 "토끼" 닉네임 가격 변화
                            </h3>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-yellow-400 font-bold">시즌1</span> • 토끼</span>
                                    <span className="text-lg sm:text-xl font-bold text-white self-end sm:self-auto">1,050만</span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-pink-400 font-bold">시즌3</span> • 토끼</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-lg sm:text-xl font-bold text-white">999.9만</span>
                                        <ArrowDownRight className="w-5 h-5 text-orange-400" />
                                        <span className="text-orange-400 text-sm">-4.8%</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-emerald-400 font-bold">시즌4</span> • 토끼</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-lg sm:text-xl font-bold text-white">800만</span>
                                        <ArrowDownRight className="w-5 h-5 text-red-400" />
                                        <span className="text-red-400 text-sm">-20.0%</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-green-900/20 border border-green-500/30 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-green-400 font-bold">시즌5</span> • 토끼</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-xl sm:text-2xl font-bold text-green-400">1,100만</span>
                                        <ArrowUpRight className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 text-sm">+37.5%</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mt-4 mb-0">
                                💬 "토끼"는 시즌4에서 저점을 찍은 후 시즌5에서 반등에 성공! 귀여운 동물 닉네임의 꾸준한 인기를 보여줍니다.
                            </p>
                        </div>

                        {/* 해적 가격 변화 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                                🏴‍☠️ "해적" 닉네임 가격 변화
                            </h3>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-yellow-400 font-bold">시즌1</span> • 해적</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-xl sm:text-2xl font-bold text-yellow-400">2,424만</span>
                                        <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded">TOP 4</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-blue-400 font-bold">시즌2</span> • 해적</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-lg sm:text-xl font-bold text-white">1,000만</span>
                                        <ArrowDownRight className="w-5 h-5 text-red-400" />
                                        <span className="text-red-400 text-sm">-58.8%</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-cyan-400 font-bold">시즌4</span> • 해적</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-xl sm:text-2xl font-bold text-cyan-400">1,150만</span>
                                        <ArrowUpRight className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 text-sm">+15.0%</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mt-4 mb-0">
                                💬 메이플 직업명인 "해적"은 시즌별로 등락을 반복하며 1,000~2,400만 메이플포인트 사이에서 거래되고 있습니다.
                            </p>
                        </div>

                        {/* 아크 가격 변화 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
                                ⚡ "아크" 닉네임 가격 변화
                            </h3>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-yellow-400 font-bold">시즌1</span> • 아크</span>
                                    <span className="text-lg sm:text-xl font-bold text-white self-end sm:self-auto">1,312만</span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-indigo-400 font-bold">시즌5</span> • 아크</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-xl sm:text-2xl font-bold text-indigo-400">1,550만</span>
                                        <ArrowUpRight className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 text-sm">+18.1%</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mt-4 mb-0">
                                💬 메이플 인기 직업 "아크"는 시즌5에서 시즌1 대비 상승! 꾸준한 인기를 증명했습니다.
                            </p>
                        </div>

                        {/* 메리 가격 변화 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-rose-400 mb-4 flex items-center gap-2">
                                🎀 "메리" 닉네임 가격 변화
                            </h3>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-pink-400 font-bold">시즌3</span> • 메리</span>
                                    <span className="text-lg sm:text-xl font-bold text-white self-end sm:self-auto">651만</span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-rose-900/20 border border-rose-500/30 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-rose-400 font-bold">시즌4</span> • 메리</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-xl sm:text-2xl font-bold text-rose-400">1,000만</span>
                                        <ArrowUpRight className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 text-sm">+53.6%</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mt-4 mb-0">
                                💬 감성 닉네임 "메리"는 시즌4에서 크게 반등하며 1,000만 메이플포인트 돌파!
                            </p>
                        </div>

                        {/* 여우 가격 변화 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                                🦊 "여우" 닉네임 가격 변화
                            </h3>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-yellow-400 font-bold">시즌1</span> • 여우</span>
                                    <span className="text-lg sm:text-xl font-bold text-white self-end sm:self-auto">1,300만</span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-orange-400 font-bold">시즌3</span> • 여우</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-xl sm:text-2xl font-bold text-orange-400">1,570만</span>
                                        <ArrowUpRight className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 text-sm">+20.8%</span>
                                        <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded">시즌3 1위</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mt-4 mb-0">
                                💬 "여우"는 시즌3에서 최고가를 기록하며 동물 닉네임의 강력한 인기를 증명했습니다.
                            </p>
                        </div>

                        {/* 캡틴 가격 변화 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
                                ⛵ "캡틴" 닉네임 가격 변화
                            </h3>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-blue-400 font-bold">시즌2</span> • 캡틴</span>
                                    <span className="text-lg sm:text-xl font-bold text-white self-end sm:self-auto">550만</span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-pink-400 font-bold">시즌3</span> • 캡틴</span>
                                    <span className="text-lg sm:text-xl font-bold text-white self-end sm:self-auto">550만</span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-sky-900/20 border border-sky-500/30 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-sky-400 font-bold">시즌4</span> • 캡틴</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-xl sm:text-2xl font-bold text-sky-400">700만</span>
                                        <ArrowUpRight className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 text-sm">+27.3%</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mt-4 mb-0">
                                💬 "캡틴"은 시즌2-3에서 안정적 가격을 유지하다가 시즌4에서 상승했습니다.
                            </p>
                        </div>

                        {/* 하니 가격 변화 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                                🍯 "하니" 닉네임 가격 변화
                            </h3>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-blue-400 font-bold">시즌2</span> • 하니</span>
                                    <span className="text-lg sm:text-xl font-bold text-white self-end sm:self-auto">620만</span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-amber-900/20 border border-amber-500/30 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-amber-400 font-bold">시즌4</span> • 하니</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-xl sm:text-2xl font-bold text-amber-400">850만</span>
                                        <ArrowUpRight className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 text-sm">+37.1%</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-green-400 font-bold">시즌5</span> • 하니</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-lg sm:text-xl font-bold text-white">630만</span>
                                        <ArrowDownRight className="w-5 h-5 text-red-400" />
                                        <span className="text-red-400 text-sm">-25.9%</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mt-4 mb-0">
                                💬 인기 아이돌 이름 "하니"는 시즌4에서 정점을 찍고 시즌5에서 하락하는 등 변동성을 보였습니다.
                            </p>
                        </div>

                        {/* 아이 가격 변화 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                                👶 "아이" 닉네임 가격 변화
                            </h3>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-yellow-400 font-bold">시즌1</span> • 아이</span>
                                    <span className="text-lg sm:text-xl font-bold text-white self-end sm:self-auto">1,400만</span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-red-900/20 border border-red-500/30 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-red-400 font-bold">시즌4</span> • 아이</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-xl sm:text-2xl font-bold text-red-400">1,910만</span>
                                        <ArrowUpRight className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 text-sm">+36.4%</span>
                                        <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded">시즌4 1위</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mt-4 mb-0">
                                💬 "아이"는 시즌4에서 역대 2위 최고가를 기록하며 짧고 간결한 닉네임의 강력한 가치를 증명했습니다!
                            </p>
                        </div>

                        {/* 추억 가격 변화 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-violet-400 mb-4 flex items-center gap-2">
                                📸 "추억" 닉네임 가격 변화
                            </h3>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-blue-400 font-bold">시즌2</span> • 추억</span>
                                    <span className="text-lg sm:text-xl font-bold text-white self-end sm:self-auto">400만</span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-pink-400 font-bold">시즌3</span> • 추억</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-lg sm:text-xl font-bold text-white">260만</span>
                                        <ArrowDownRight className="w-5 h-5 text-red-400" />
                                        <span className="text-red-400 text-sm">-35.0%</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-cyan-400 font-bold">시즌4</span> • 추억</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-lg sm:text-xl font-bold text-white">405만</span>
                                        <ArrowUpRight className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 text-sm">+55.8%</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-violet-900/20 border border-violet-500/30 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-violet-400 font-bold">시즌5</span> • 추억</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-xl sm:text-2xl font-bold text-violet-400">510만</span>
                                        <ArrowUpRight className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 text-sm">+25.9%</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mt-4 mb-0">
                                💬 감성 닉네임 "추억"은 시즌3 저점 이후 지속적으로 상승하며 안정적인 재평가를 받았습니다.
                            </p>
                        </div>

                        {/* 보스 가격 변화 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
                                👊 "보스" 닉네임 가격 변화
                            </h3>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-cyan-400 font-bold">시즌4</span> • 보스</span>
                                    <span className="text-lg sm:text-xl font-bold text-white self-end sm:self-auto">760만</span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-red-900/20 border border-red-500/30 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-red-500 font-bold">시즌5</span> • 보스</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-xl sm:text-2xl font-bold text-red-500">850만</span>
                                        <ArrowUpRight className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 text-sm">+11.8%</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mt-4 mb-0">
                                💬 파워풀한 "보스"는 시즌5에서 상승하며 전투 관련 닉네임의 꾸준한 수요를 보여줍니다.
                            </p>
                        </div>

                        {/* 설윤 가격 변화 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-pink-500 mb-4 flex items-center gap-2">
                                💕 "설윤" 닉네임 가격 변화
                            </h3>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-yellow-400 font-bold">시즌1</span> • 설윤</span>
                                    <span className="text-lg sm:text-xl font-bold text-white self-end sm:self-auto">670만</span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-pink-900/20 border border-pink-500/30 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-pink-500 font-bold">시즌3</span> • 설윤</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-xl sm:text-2xl font-bold text-pink-500">800만</span>
                                        <ArrowUpRight className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 text-sm">+19.4%</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mt-4 mb-0">
                                💬 인기 아이돌 멤버 "설윤"은 시즌3에서 상승하며 아이돌 이름의 지속적인 인기를 증명했습니다.
                            </p>
                        </div>

                        {/* 귀신 가격 변화 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-purple-500 mb-4 flex items-center gap-2">
                                👻 "귀신" 닉네임 가격 변화
                            </h3>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-yellow-400 font-bold">시즌1</span> • 귀신</span>
                                    <span className="text-lg sm:text-xl font-bold text-white self-end sm:self-auto">680만</span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-blue-400 font-bold">시즌2</span> • 귀신</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-lg sm:text-xl font-bold text-white">405만</span>
                                        <ArrowDownRight className="w-5 h-5 text-red-400" />
                                        <span className="text-red-400 text-sm">-40.4%</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-cyan-400 font-bold">시즌4</span> • 귀신</span>
                                    <span className="text-lg sm:text-xl font-bold text-white self-end sm:self-auto">530만</span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-purple-500 font-bold">시즌5</span> • 귀신</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-xl sm:text-2xl font-bold text-purple-500">500만</span>
                                        <ArrowDownRight className="w-5 h-5 text-orange-400" />
                                        <span className="text-orange-400 text-sm">-5.7%</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mt-4 mb-0">
                                💬 개성 있는 "귀신"은 시즌별로 등락을 반복하며 400~680만 메이플포인트 사이에서 거래되었습니다.
                            </p>
                        </div>

                        {/* 섀도어 가격 변화 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-slate-400 mb-4 flex items-center gap-2">
                                🌑 "섀도어" 닉네임 가격 변화
                            </h3>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-yellow-400 font-bold">시즌1</span> • 섀도어</span>
                                    <span className="text-lg sm:text-xl font-bold text-white self-end sm:self-auto">650만</span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-900/50 border border-slate-700 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-cyan-400 font-bold">시즌4</span> • 섀도어</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-lg sm:text-xl font-bold text-white">530만</span>
                                        <ArrowDownRight className="w-5 h-5 text-red-400" />
                                        <span className="text-red-400 text-sm">-18.5%</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-slate-800/50 border border-slate-600 rounded-lg gap-2 sm:gap-0">
                                    <span className="text-slate-300"><span className="text-slate-400 font-bold">시즌5</span> • 섀도어</span>
                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <span className="text-xl sm:text-2xl font-bold text-slate-400">240만</span>
                                        <ArrowDownRight className="w-5 h-5 text-red-400" />
                                        <span className="text-red-400 text-sm">-54.7%</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm mt-4 mb-0">
                                💬 메이플 직업 "섀도어"는 지속적인 하락세를 보이며 직업명 닉네임의 변동성을 보여줍니다.
                            </p>
                        </div>

                        {/* Ad Placement 2: Before Duplicate Table */}
                        <InArticleAd dataAdSlot="6849727140" className="my-8 sm:my-12" />

                        {/* 기타 등락 닉네임 종합 테이블 (Sortable) */}
                        <DuplicateNicknamesTable />

                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 sm:p-6">
                            <p className="text-orange-300 font-bold mb-2 text-sm sm:text-base">💡 인사이트</p>
                            <p className="text-slate-300 mb-0 text-xs sm:text-sm">
                                고가 닉네임은 <strong className="text-yellow-400">시즌1에서 가장 높았던 경향</strong>이 있으나,
                                "토끼", "여름", "아이" 등 일부 닉네임은 후속 시즌에서 <strong className="text-green-400">가격이 상승</strong>하기도 했습니다.
                                이는 특정 테마나 감성이 시간이 지나며 재평가받는 현상으로 해석됩니다.
                            </p>
                        </div>
                    </section>

                    {/* Ad Placement 3: After Duplicate Table */}
                    <AdBanner dataAdSlot="8162808816" className="mb-12" />

                    {/* Section 3: 인기 닉네임 유형 분석 */}
                    <section className="mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                            인기 닉네임 유형 분석
                        </h2>

                        <p className="text-slate-300 leading-relaxed mb-6">
                            수백 개의 낙찰 데이터를 분석한 결과, 인기 닉네임은 크게 <strong className="text-purple-400">7가지 유형</strong>으로 분류됩니다.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            {/* Type 1 */}
                            <div className="bg-pink-900/20 border border-pink-500/30 rounded-xl p-5">
                                <h4 className="text-pink-400 font-bold mb-3 flex items-center gap-2">
                                    🎮 메이플 관련 닉네임
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">라라, 아란, 팬텀, 비숍</span>
                                        <span className="text-pink-300 font-bold">1,500~3,000만</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">카이저, 팔라딘, 루미너스</span>
                                        <span className="text-pink-300 font-bold">400~700만</span>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-xs mt-3 mb-0">
                                    ⭐ 게임 내 직업/캐릭터 이름은 언제나 인기!
                                </p>
                            </div>

                            {/* Type 2 */}
                            <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-5">
                                <h4 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
                                    🐰 동물 닉네임
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">토끼, 여우, 늑대</span>
                                        <span className="text-purple-300 font-bold">800~1,570만</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">판다, 고래, 호랑</span>
                                        <span className="text-purple-300 font-bold">200~340만</span>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-xs mt-3 mb-0">
                                    ⭐ 귀엽고 친근한 동물 이름의 꾸준한 사랑
                                </p>
                            </div>

                            {/* Type 3 */}
                            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-5">
                                <h4 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
                                    🌸 감성/계절 닉네임
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">여름, 겨울, 가을, 봄비</span>
                                        <span className="text-yellow-300 font-bold">300~1,800만</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">추억, 첫눈, 벚꽃</span>
                                        <span className="text-yellow-300 font-bold">200~510만</span>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-xs mt-3 mb-0">
                                    ⭐ 감성적이고 서정적인 단어들
                                </p>
                            </div>

                            {/* Type 4 */}
                            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-5">
                                <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                                    💎 연예인/아이돌
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">카리나, 윈터, 제니</span>
                                        <span className="text-blue-300 font-bold">630~950만</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">설윤, 채영, 지젤</span>
                                        <span className="text-blue-300 font-bold">200~800만</span>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-xs mt-3 mb-0">
                                    ⭐ 인기 아이돌 멤버 이름의 높은 수요
                                </p>
                            </div>

                            {/* Type 5 */}
                            <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-5">
                                <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                                    ✨ 짧고 귀여운 닉네임
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">하니, 비비, 코코</span>
                                        <span className="text-green-300 font-bold">520~850만</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">루루, 모모, 꼬꼬</span>
                                        <span className="text-green-300 font-bold">290~700만</span>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-xs mt-3 mb-0">
                                    ⭐ 2~3글자의 귀엽고 발음하기 쉬운 이름
                                </p>
                            </div>

                            {/* Type 6 */}
                            <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-5">
                                <h4 className="text-orange-400 font-bold mb-3 flex items-center gap-2">
                                    👑 파워/전투 닉네임
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">보스, 캡틴, 기사</span>
                                        <span className="text-orange-300 font-bold">620~870만</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">닌자, 헌터, 왕자</span>
                                        <span className="text-orange-300 font-bold">270~670만</span>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-xs mt-3 mb-0">
                                    ⭐ 강력하고 카리스마 있는 느낌
                                </p>
                            </div>

                            {/* Type 7 */}
                            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-5">
                                <h4 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                                    🍓 음식/과일 닉네임
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">딸기, 민트, 바나나</span>
                                        <span className="text-cyan-300 font-bold">290~1,000만</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">초코, 모카, 레몬</span>
                                        <span className="text-cyan-300 font-bold">430~1,277만</span>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-xs mt-3 mb-0">
                                    ⭐ 달콤하고 친근한 느낌의 이름들
                                </p>
                            </div>
                        </div>

                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                            <p className="text-purple-300 font-bold mb-2">🎯 추천 전략</p>
                            <p className="text-slate-300 mb-0">
                                <strong className="text-yellow-400">1,000만 메이플포인트 이상</strong> 투자 가능: 메이플 캐릭터명, 인기 아이돌, 동물 이름<br />
                                <strong className="text-blue-400">300~1,000만 메이플포인트</strong>: 감성 단어, 음식/과일, 짧은 귀여운 이름<br />
                                <strong className="text-green-400">300만 메이플포인트 이하</strong>: 다양한 2~3글자 조합, 개성있는 단어
                            </p>
                        </div>
                    </section>

                    {/* Section: TOP 500 Rankings */}
                    <TopRankingTable />

                    {/* Ad Placement 4: Before Price Recommendation */}
                    <InArticleAd dataAdSlot="6849727140" className="my-8 sm:my-12" />

                    {/* Section 4: 가격대별 추천 닉네임 */}
                    <section className="mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                            가격대별 추천 닉네임
                        </h2>

                        <p className="text-slate-300 leading-relaxed mb-6">
                            예산에 따라 어떤 닉네임을 노려야 할까요? 과거 낙찰가 데이터를 바탕으로 가격대별 추천 전략을 제시합니다.
                        </p>

                        {/* Premium Tier */}
                        <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-xl p-6 mb-4">
                            <h3 className="text-2xl font-bold text-yellow-400 mb-4">👑 프리미엄 (1,000만 이상)</h3>
                            <div className="grid md:grid-cols-3 gap-3 text-sm">
                                <div className="bg-slate-900/50 rounded-lg p-3">
                                    <p className="text-yellow-300 font-semibold mb-1">캐릭터명</p>
                                    <p className="text-slate-400">라라, 아크, 루미너스</p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-3">
                                    <p className="text-yellow-300 font-semibold mb-1">동물</p>
                                    <p className="text-slate-400">여우, 토끼, 늑대</p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-3">
                                    <p className="text-yellow-300 font-semibold mb-1">감성</p>
                                    <p className="text-slate-400">여름, 초코, 메리</p>
                                </div>
                            </div>
                        </div>

                        {/* High Tier */}
                        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-6 mb-4">
                            <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4">💎 고급 (500~1,000만)</h3>
                            <div className="grid md:grid-cols-3 gap-3 text-sm">
                                <div className="bg-slate-900/50 rounded-lg p-3">
                                    <p className="text-blue-300 font-semibold mb-1">아이돌</p>
                                    <p className="text-slate-400">카리나, 하니, 윈터</p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-3">
                                    <p className="text-blue-300 font-semibold mb-1">직업</p>
                                    <p className="text-slate-400">보스, 캡틴, 기사</p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-3">
                                    <p className="text-blue-300 font-semibold mb-1">귀여움</p>
                                    <p className="text-slate-400">비비, 루시, 루루</p>
                                </div>
                            </div>
                        </div>

                        {/* Mid Tier */}
                        <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-xl p-6 mb-4">
                            <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-4">🌟 중급 (200~500만)</h3>
                            <div className="grid md:grid-cols-3 gap-3 text-sm">
                                <div className="bg-slate-900/50 rounded-lg p-3">
                                    <p className="text-green-300 font-semibold mb-1">감성</p>
                                    <p className="text-slate-400">추억, 첫눈, 벚꽃</p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-3">
                                    <p className="text-green-300 font-semibold mb-1">음식</p>
                                    <p className="text-slate-400">모카, 딸기, 레몬</p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-3">
                                    <p className="text-green-300 font-semibold mb-1">동물</p>
                                    <p className="text-slate-400">판다, 네코, 고래</p>
                                </div>
                            </div>
                        </div>

                        {/* Budget Tier */}
                        <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/30 border border-slate-600/30 rounded-xl p-6">
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-300 mb-4">✨ 가성비 (200만 이하)</h3>
                            <div className="grid md:grid-cols-3 gap-3 text-sm">
                                <div className="bg-slate-900/50 rounded-lg p-3">
                                    <p className="text-slate-300 font-semibold mb-1">짧은 이름</p>
                                    <p className="text-slate-400">시루, 루아, 포이</p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-3">
                                    <p className="text-slate-300 font-semibold mb-1">개성</p>
                                    <p className="text-slate-400">디코, 체스, 블루</p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-3">
                                    <p className="text-slate-300 font-semibold mb-1">단어</p>
                                    <p className="text-slate-400">파워, 회복, 천상</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: 시즌별 트렌드 변화 */}
                    <section className="mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                            시즌별 트렌드 변화
                        </h2>

                        <div className="space-y-4">
                            {/* Season 1 */}
                            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-5">
                                <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                                    🥇 시즌1 트렌드
                                </h4>
                                <p className="text-slate-300 text-sm mb-3">
                                    초기 뉴네임 옥션의 열기! 메이플 직업명과 캐릭터명에 대한 수요가 폭발적이었습니다.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">라라 3,000만</span>
                                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">스타 2,900만</span>
                                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">전사 2,800만</span>
                                    <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">해적 2,424만</span>
                                </div>
                            </div>

                            {/* Season 2-3 */}
                            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-5">
                                <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                                    📉 시즌2~3 트렌드
                                </h4>
                                <p className="text-slate-300 text-sm mb-3">
                                    전반적인 가격 하락세. 시장이 안정화되며 감성 단어와 귀여운 닉네임의 인기가 상승했습니다.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">여우 1,570만</span>
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">소녀 1,200만</span>
                                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">초코 1,277만</span>
                                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">토끼 999만</span>
                                </div>
                            </div>

                            {/* Season 4-5 */}
                            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-5">
                                <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                                    📈 시즌4~5 트렌드
                                </h4>
                                <p className="text-slate-300 text-sm mb-3">
                                    가격 반등! 특정 닉네임에 대한 재평가와 희소성 인식이 강화되었습니다.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">아이 1,910만</span>
                                    <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">여름 1,800만</span>
                                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">아크 1,550만</span>
                                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">토끼 1,100만</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 mt-6">
                            <p className="text-cyan-300 font-bold mb-2">📊 핵심 인사이트</p>
                            <ul className="text-slate-300 space-y-2 mb-0">
                                <li>• 시즌1의 초기 열풍 이후 가격이 안정화되었으나, 시즌4~5에서 <strong className="text-yellow-400">재상승 트렌드</strong></li>
                                <li>• 메이플 관련 닉네임은 여전히 <strong className="text-pink-400">최고가 유지</strong></li>
                                <li>• 감성/계절 단어가 <strong className="text-blue-400">꾸준한 인기</strong> (여름, 겨울, 추억 등)</li>
                                <li>• 짧고 발음하기 쉬운 2~3글자 닉네임 <strong className="text-green-400">선호도 증가</strong></li>
                            </ul>
                        </div>
                    </section>



                    {/* Ad Placement 5: Before Conclusion */}
                    <AdBanner dataAdSlot="8162808816" className="mb-12" />

                    {/* Conclusion */}
                    <section className="mb-12">
                        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                                마치며: 나만의 닉네임 전략 세우기
                            </h2>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                뉴네임 옥션은 단순한 닉네임 구매가 아닌, <strong className="text-yellow-400">자신의 정체성을 표현</strong>하는
                                중요한 기회입니다. 과거 데이터를 참고하되, 자신만의 <strong className="text-purple-400">창의적인 조합</strong>을
                                시도해보세요.
                            </p>
                            <div className="bg-purple-500/10 rounded-lg p-4 mb-4">
                                <p className="text-purple-300 font-bold mb-2">💡 성공적인 입찰을 위한 팁</p>
                                <ul className="text-slate-300 text-sm space-y-1 mb-0">
                                    <li>• 예산을 미리 정하고 감정적인 입찰 자제</li>
                                    <li>• 여러 대안을 준비 (비슷한 느낌의 닉네임 3~5개)</li>
                                    <li>• 시즌 후반으로 갈수록 가격이 안정화되는 경향</li>
                                    <li>• 특이한 조합이나 새로운 유행어는 저평가되기도 함</li>
                                </ul>
                            </div>
                            <p className="text-purple-400 font-bold text-lg mb-0">
                                🎯 다음 뉴네임 옥션에서 여러분만의 완벽한 닉네임을 찾으시길 바랍니다!
                            </p>
                        </div>
                    </section>

                    {/* Data Note */}
                    <section className="mb-12">
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                            <p className="text-slate-400 text-sm mb-0">
                                📊 본 포스팅의 데이터는 <strong className="text-white">메이플스토리 공식 뉴네임 옥션 시즌1~5</strong>의
                                실제 낙찰가 기록을 바탕으로 작성되었습니다. 입찰 횟수, 경매 종료일 등의 정보는
                                일부 시즌에서만 제공됩니다.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-700 pt-8 mt-12">
                    <div className="flex justify-between items-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>블로그 목록으로</span>
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            <span>캐릭터 진단하기</span>
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
