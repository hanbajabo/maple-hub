'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Clock, Gift, AlertCircle, CheckCircle, Calendar, Sparkles, Zap, Trophy, Star, Coins, ShoppingBag, Swords, Map, Crown, TrendingUp } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function February2026UpdateSummary() {
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
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full">
                            업데이트 소식
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">
                            2월 패치
                        </span>
                        <span className="text-slate-500 text-sm">2026년 1월 31일</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                        메이플 2월 업데이트/일정 완벽 정리
                    </h1>
                    <p className="text-lg text-slate-400">
                        신규 보스 유피테르, 데스티니 무기 2차 해방, 길드 캐슬 시스템 개선까지! 2월 업데이트의 모든 것을 한눈에 확인하세요.
                    </p>
                </header>

                {/* Roadmap Image */}
                <div className="mb-12 relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/50 group">
                    <Image
                        src="/images/blog/feb-2026-roadmap.jpg"
                        alt="메이플스토리 2월 업데이트 로드맵 및 롯데월드 콜라보 일정"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                        <p className="text-white font-bold text-lg drop-shadow-lg">📅 2월 업데이트 & 상반기 로드맵</p>
                    </div>
                </div>

                {/* Introduction */}
                <div className="mb-12 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-pink-900/30 border-2 border-purple-500/50 rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-75"></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-black text-purple-400 mb-6 flex items-center gap-2">
                            <Sparkles className="w-8 h-8 animate-bounce" />
                            📝 2월 업데이트 개요
                        </h2>

                        <div className="bg-slate-900/70 rounded-xl p-6 space-y-4 text-slate-300 leading-relaxed">
                            <p className="font-bold text-white text-lg">안녕하세요! 메이플 용사님들!</p>

                            <p>2월에는 <strong className="text-purple-400">재화 밸런스 조정 마무리</strong>와 함께
                                <strong className="text-yellow-400"> 신규 보스 유피테르, 데스티니 무기 2차 해방</strong> 등 대규모 업데이트가 예정되어 있습니다!</p>

                            <p>2월 1일부터 <strong className="text-green-400">데일리 기프트와 마일리지 샵이 개편</strong>되며,
                                2월 12일 정식 서버 패치에서는 <strong className="text-blue-400">신규 지역 기어드락</strong>이 공개됩니다.</p>

                            <div className="bg-yellow-900/30 border-2 border-yellow-500/50 rounded-lg p-5 mt-6">
                                <p className="font-bold text-yellow-400 flex items-center gap-2 mb-3">
                                    <Gift className="w-5 h-5" />
                                    핵심 요약
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                        <p><strong className="text-white">2/1</strong> 썬데이 메이플(경험치) & 시스템 개편</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                        <p><strong className="text-white">2/8</strong> 솔 에르다 타임 재진행</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                        <p><strong className="text-white">2/11</strong> 챌린저스 패스, 버닝 익스프레스 종료</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                        <p><strong className="text-white">2/12</strong> 신규 보스 유피테르 & 데스티니 무기 2차 해방</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 1. 시스템 개편 (재화 밸런스) */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-2 border-blue-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <Coins className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-blue-400">
                                    1. 시스템 개편 (재화 밸런스 조정 마무리)
                                </h2>
                                <p className="text-slate-400 text-sm mt-1">2월 1일부터 적용</p>
                            </div>
                        </div>

                        {/* 데일리 기프트 */}
                        <div className="mb-6">
                            <div className="relative w-full max-w-[240px] aspect-[4/1] mb-2">
                                <Image
                                    src="/images/blog/daily-gift.png"
                                    alt="메이플 데일리 기프트 로고"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                                <Gift className="w-5 h-5" />
                                데일리 기프트 (매일 밤 0시 갱신)
                            </h3>

                            <div className="space-y-4">
                                {/* 주화 삭제 */}
                                <div className="bg-slate-900/70 rounded-xl p-5 border border-red-500/50">
                                    <p className="font-bold text-red-400 mb-3">🗑️ 변경 1: 실버 주화 삭제 → 카르마 큐브 대체</p>
                                    <div className="space-y-2 text-sm text-slate-300">
                                        <div className="flex items-start gap-2">
                                            <span className="text-purple-400 font-bold min-w-[80px]">14/21일 차:</span>
                                            <span>카르마 블랙 큐브 <strong className="text-white">1개</strong></span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-purple-400 font-bold min-w-[80px]">28일 차:</span>
                                            <span>카르마 화이트 에디셔널 큐브 <strong className="text-white">1개</strong></span>
                                        </div>
                                    </div>
                                </div>

                                {/* 기존 보상 상향 */}
                                <div className="bg-slate-900/70 rounded-xl p-5 border border-green-500/50">
                                    <p className="font-bold text-green-400 mb-3">✨ 변경 2: 기존 보상 상향 (MVP 등급별 추가 지급 수량 동일)</p>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-slate-700">
                                                    <th className="text-left py-2 px-3 text-yellow-400">일 차</th>
                                                    <th className="text-left py-2 px-3 text-blue-400">기존 보상</th>
                                                    <th className="text-left py-2 px-3 text-green-400">개선 보상</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-slate-300">
                                                <tr className="border-b border-slate-800">
                                                    <td className="py-2 px-3 font-bold">5/10/19/24</td>
                                                    <td className="py-2 px-3">2배 경쿠(30분) 2개</td>
                                                    <td className="py-2 px-3 text-green-300 font-bold">3배 경쿠(30분) 1개</td>
                                                </tr>
                                                <tr className="border-b border-slate-800">
                                                    <td className="py-2 px-3 font-bold">9/23</td>
                                                    <td className="py-2 px-3">스페셜 명예의 훈장 1개</td>
                                                    <td className="py-2 px-3 text-green-300 font-bold">스페셜 명예의 훈장 10개</td>
                                                </tr>
                                                <tr className="border-b border-slate-800">
                                                    <td className="py-2 px-3 font-bold">18</td>
                                                    <td className="py-2 px-3">카르마 영환불 1개</td>
                                                    <td className="py-2 px-3 text-green-300 font-bold">카르마 영원한 환생의 불꽃 10개</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2 px-3 font-bold">25</td>
                                                    <td className="py-2 px-3">카르마 검환불 1개</td>
                                                    <td className="py-2 px-3 text-green-300 font-bold">카르마 검은 환생의 불꽃 10개</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 마일리지 샵 */}
                        <div>
                            <div className="relative w-full max-w-lg aspect-[5/2] mb-4 bg-slate-800 rounded-lg overflow-hidden border border-purple-500/30">
                                <Image
                                    src="/images/blog/mileage-shop-change.png"
                                    alt="마일리지 샵 골드 주화 삭제 등 개편 사항"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                마일리지 샵 (2/1 오전 6시 월간 초기화 후 갱신)
                            </h3>

                            <div className="bg-slate-900/70 rounded-xl p-5 border border-purple-500/50">
                                <p className="font-bold text-red-400 mb-3">🗑️ 변경: 골드 주화 판매 중단 → 카르마 큐브 2종 추가</p>
                                <p className="text-slate-400 text-sm mb-4">넥슨 ID당 월 7개 구매 가능 (교환권 유효 7일 / 큐브 유효 7일)</p>

                                <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-3 mb-4">
                                    <p className="text-blue-300 text-xs sm:text-sm font-bold flex items-center gap-2">
                                        <span className="text-lg">💡</span> 꿀팁: 메이플M 마일리지는 별도!
                                    </p>
                                    <p className="text-slate-300 text-xs sm:text-sm pl-7 mt-1">
                                        <strong className="text-white">메이플M 일일 과제</strong> 마일리지는
                                        <strong className="text-yellow-400"> 월 적립 한도(50,000) 미포함.</strong><br />
                                        PC 마일리지 한도를 다 채웠더라도 추가로 수급 가능합니다!
                                    </p>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-700">
                                                <th className="text-left py-2 px-3 text-yellow-400">아이템</th>
                                                <th className="text-left py-2 px-3 text-blue-400">가격 (마일리지)</th>
                                                <th className="text-left py-2 px-3 text-green-400">월 총 소비</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-300">
                                            <tr className="border-b border-slate-800">
                                                <td className="py-2 px-3">카르마 블랙 큐브 교환권</td>
                                                <td className="py-2 px-3 font-bold">1,500</td>
                                                <td className="py-2 px-3 font-bold text-yellow-300">10,500</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-3">카르마 화이트 에디셔널 큐브 교환권</td>
                                                <td className="py-2 px-3 font-bold">3,000</td>
                                                <td className="py-2 px-3 font-bold text-yellow-300">21,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. 2월 썬데이 메이플 혜택 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-2 border-yellow-500/50 rounded-2xl p-6 sm:p-8">
                        {/* 썬데이 메이플 배너 이미지 */}
                        <div className="relative w-full aspect-[3/1] mb-6 rounded-xl overflow-hidden shadow-lg border border-yellow-500/30">
                            <Image
                                src="/images/blog/sunday-maple-banner.png"
                                alt="스페셜 썬데이 메이플"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                <Zap className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-yellow-400">
                                    2. 2월 썬데이 메이플 혜택 정리
                                </h2>
                                <p className="text-slate-400 text-sm mt-1">2월 1일 & 2월 8일</p>
                            </div>
                        </div>

                        {/* 2월 1일 혜택 */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4 p-3 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
                                <span className="bg-yellow-500 text-slate-900 font-bold px-3 py-1 rounded">2월 1일</span>
                                <h3 className="text-xl font-bold text-white">경험치 종합세트 🎁</h3>
                            </div>

                            <div className="bg-slate-900/70 rounded-xl p-6 border border-yellow-500/30">
                                <p className="text-slate-300 mb-4">
                                    일명 <strong className="text-yellow-400">'경험치 폭탄'</strong> 날입니다! 레벨업이 필요하다면 절대 놓치지 마세요.
                                </p>

                                <div className="mb-6">
                                    <Link
                                        href="/blog/exp-product-efficiency"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-yellow-500 text-yellow-400 rounded-lg font-bold transition-all shadow-lg hover:shadow-yellow-900/20 group text-sm"
                                    >
                                        <span>📊 몬스터 파크 효율이 궁금하다면? (확인하기)</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-2">
                                            <div className="bg-yellow-500/20 text-yellow-400 font-bold w-6 h-6 flex items-center justify-center rounded-full text-sm mt-0.5">1</div>
                                            <div>
                                                <p className="font-bold text-white">몬스터파크 추가 경험치</p>
                                                <p className="text-sm text-green-400">클리어 경험치 250% 추가 획득</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="bg-yellow-500/20 text-yellow-400 font-bold w-6 h-6 flex items-center justify-center rounded-full text-sm mt-0.5">2</div>
                                            <div>
                                                <p className="font-bold text-white">콤보킬 경험치</p>
                                                <p className="text-sm text-green-400">획득량 +300%</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="bg-yellow-500/20 text-yellow-400 font-bold w-6 h-6 flex items-center justify-center rounded-full text-sm mt-0.5">3</div>
                                            <div>
                                                <p className="font-bold text-white">룬 경험치 버프</p>
                                                <p className="text-sm text-green-400">버프 효과 +100%</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-start gap-2">
                                            <div className="bg-yellow-500/20 text-yellow-400 font-bold w-6 h-6 flex items-center justify-center rounded-full text-sm mt-0.5">4</div>
                                            <div>
                                                <p className="font-bold text-white">룬 스폰 & 쿨타임</p>
                                                <p className="text-sm text-green-400">재등장 시간 단축 및 쿨타임 감소</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="bg-yellow-500/20 text-yellow-400 font-bold w-6 h-6 flex items-center justify-center rounded-full text-sm mt-0.5">5</div>
                                            <div>
                                                <p className="font-bold text-white">폴로 & 프리토 & 에스페시아</p>
                                                <p className="text-sm text-green-400">경험치 3배 획득 (트레져 헌터)</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="bg-yellow-500/20 text-yellow-400 font-bold w-6 h-6 flex items-center justify-center rounded-full text-sm mt-0.5">6</div>
                                            <div>
                                                <p className="font-bold text-white">솔 에르다 기운</p>
                                                <p className="text-sm text-green-400">사냥 획득량 2배 증가</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2월 8일 혜택 */}
                        <div>
                            <div className="flex items-center gap-3 mb-4 p-3 bg-orange-900/30 rounded-lg border border-orange-500/30">
                                <span className="bg-orange-500 text-slate-900 font-bold px-3 py-1 rounded">2월 8일</span>
                                <h3 className="text-xl font-bold text-white">스페셜 썬데이: 솔 에르다 타임 ⚡</h3>
                            </div>

                            <div className="bg-slate-900/70 rounded-xl p-6 border border-orange-500/30">
                                <p className="text-slate-300 mb-4">
                                    접속만 해도 6차 전직 재료를 퍼주는 <strong className="text-orange-400">혜자 이벤트</strong>가 돌아옵니다!
                                </p>

                                <div className="space-y-3">
                                    <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-5">
                                        <div className="flex items-start gap-3 mb-4">
                                            <Zap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-bold text-blue-400 mb-1">접속 혜택 (집에서 가능)</p>
                                                <p className="text-slate-300 text-sm">
                                                    접속을 유지하기만 하면 전용 UI를 통해 보상이 차오릅니다.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 bg-slate-950/50 rounded-lg p-4 text-sm mb-4">
                                            <div className="flex justify-between items-center border-b border-blue-500/20 pb-2">
                                                <span className="text-slate-300">기본 보상 (최대 3시간)</span>
                                                <span className="text-white font-bold">2분당 조각 1개 (총 90개)</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-blue-500/20 pb-2">
                                                <span className="text-slate-300">2시간 달성 보너스</span>
                                                <span className="text-white font-bold">조각 10개 추가</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-300">3시간 달성 보너스</span>
                                                <span className="text-white font-bold">솔 에르다 1개 (완제품)</span>
                                            </div>
                                        </div>

                                        <div className="bg-blue-600/20 rounded-lg p-3 text-center border border-blue-500/30">
                                            <p className="text-blue-200 text-xs mb-1">💎 최종 획득 보상</p>
                                            <p className="text-lg font-black text-white drop-shadow-md">
                                                솔 에르다 조각 100개 + 솔 에르다 1개
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <Trophy className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-bold text-orange-400 mb-1">사냥 혜택</p>
                                                <p className="text-slate-300 text-sm">
                                                    솔 에르다 기운 획득량 <strong className="text-white">3배 증가</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AdSense Ad */}
                <InArticleAd
                    dataAdSlot="8162808816"
                    className="my-12"
                />

                {/* 3. 패치 일정 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border-2 border-cyan-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-cyan-400">
                                    3. 패치 일정
                                </h2>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {/* 메이플 나우 */}
                            <div className="md:col-span-2 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 rounded-xl p-5 border border-purple-500/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-xl">📺</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-purple-400 mb-1">메이플 나우 (Maple Now) 라이브</p>
                                        <p className="text-slate-200 text-sm">
                                            <strong className="text-white">2월 5일(목)</strong> 예정 <span className="text-slate-400 text-xs ml-1">(김창섭 디렉터 진행)</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-900/70 rounded-lg p-5 border border-blue-500/50">
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-blue-400 mb-1">테스트 서버</p>
                                        <p className="text-slate-300 text-sm">
                                            <strong className="text-white">2월 5일(목)</strong> 유력
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/70 rounded-lg p-5 border border-green-500/50">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-green-400 mb-1">정식 서버</p>
                                        <p className="text-slate-300 text-sm">
                                            <strong className="text-white">2월 12일(목)</strong> 예정
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. 이벤트 종료 일정 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 border-2 border-red-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-red-400">
                                    4. 이벤트 종료 및 보상 수령 일정
                                </h2>
                            </div>
                        </div>

                        {/* 2/11 종료 */}
                        <div className="mb-6">
                            <div className="bg-red-900/30 border-2 border-red-500/50 rounded-xl p-6 mb-4">
                                <h3 className="text-xl font-bold text-red-400 mb-4">
                                    🚨 2월 11일(화) 23:59 종료 (가장 시급!)
                                </h3>

                                <div className="space-y-3">
                                    <div className="bg-slate-900/70 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="font-bold text-purple-400">챌린저스 패스</p>
                                            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30 font-bold">종료 임박 🚨</span>
                                        </div>
                                        <p className="text-slate-300 text-sm mb-3">
                                            2월 11일(화) 23:59 종료
                                        </p>
                                        <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-3">
                                            <p className="text-yellow-300 text-sm font-bold mb-1">
                                                💡 후속: '프론티어 패스' 출시 유력
                                            </p>
                                            <p className="text-slate-400 text-xs leading-relaxed">
                                                다음 패스가 출시될 가능성이 매우 높습니다.<br />
                                                지난 시즌 '프론티어 패스'의 가격은 <strong className="text-white">49,800원</strong>이었으니 참고하세요!
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/70 rounded-lg p-4">
                                        <p className="font-bold text-blue-400 mb-2">버닝 익스프레스</p>
                                        <p className="text-slate-300 text-sm mb-2">
                                            보상 수령/사용: <strong className="text-white">2월 12일(수) 오전 2시까지</strong>
                                        </p>
                                        <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-3">
                                            <p className="text-orange-300 text-sm">
                                                ⚠️ 익스프레스 부스터 미리 사용 권장!
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/70 rounded-lg p-4">
                                        <p className="font-bold text-green-400 mb-2">미혹의 부름</p>
                                        <p className="text-slate-300 text-sm mb-3">
                                            보상 수령: <strong className="text-white">2월 12일(수) 오전 2시까지</strong>
                                        </p>
                                        <div className="bg-cyan-900/30 border border-cyan-500/50 rounded-lg p-3">
                                            <p className="text-cyan-300 text-sm font-bold mb-2">💡 히든 미션 (놓치지 마세요!):</p>
                                            <ol className="text-xs text-slate-300 space-y-1.5">
                                                <li>1. 격파 보상 '정령 이펙트' 착용</li>
                                                <li>2. 아르테리아 지하 감옥(세라자르 옆 포탈) 하인즈 대화</li>
                                                <li>3. 반대 정령 이름 채팅 입력</li>
                                                <li>4. <strong className="text-yellow-400">다른 정령 이펙트 획득!</strong></li>
                                            </ol>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/70 rounded-lg p-4 border border-slate-700/50">
                                        <p className="font-bold text-slate-400 mb-3 border-b border-slate-700 pb-2">📦 그 외 종료되는 항목들</p>
                                        <ul className="text-slate-300 text-sm space-y-2">
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></span>
                                                프리미엄 PC방 접속 보상 이벤트 (~23:59)
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></span>
                                                메이플 로얄 스타일 153기 판매
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></span>
                                                프리미엄 헤어/성형 쿠폰 (루미엘/루아나 등)
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></span>
                                                2차 모멘텀 패스
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></span>
                                                윈터 부티크 기프트 판매
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></span>
                                                2025년 하반기 BEST 프리미엄 뷰티 쿠폰 판매
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3/18 종료 */}
                        <div className="mb-6">
                            <div className="bg-orange-900/30 border-2 border-orange-500/50 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-orange-400 mb-4">
                                    📅 3월 18일(화) 종료 (여유 있음)
                                </h3>

                                <div className="space-y-3">
                                    <div className="bg-slate-900/70 rounded-lg p-4">
                                        <div className="relative w-full aspect-[4/1] mb-3 bg-slate-800 rounded-lg overflow-hidden border border-purple-500/30">
                                            <Image
                                                src="/images/blog/talahart-fantasia.png"
                                                alt="탈라하트 판타지아 ~3월 18일까지"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <p className="font-bold text-purple-400 mb-2">탈라하트 판타지아</p>
                                        <p className="text-slate-300 text-sm mb-3">
                                            보약 버프: <strong className="text-green-400">3월 25일까지 유지</strong>
                                        </p>

                                        {/* 환영의 기억 보상 이미지 */}
                                        <div className="relative w-full aspect-[5/3] mb-3 bg-slate-800 rounded-lg overflow-hidden border border-orange-500/30">
                                            <Image
                                                src="/images/blog/illusion-trace-rewards.png"
                                                alt="환영의 기억 보상 및 환영의 흔적 수집 완료 선물"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full text-xs">
                                                <thead>
                                                    <tr className="border-b border-slate-700">
                                                        <th className="text-left py-2 px-2 text-yellow-400">보상</th>
                                                        <th className="text-left py-2 px-2 text-blue-400">받는 날짜</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-slate-300">
                                                    <tr className="border-b border-slate-800">
                                                        <td className="py-2 px-2">초월 성장의 비약(~269)</td>
                                                        <td className="py-2 px-2 font-bold">2/9</td>
                                                    </tr>
                                                    <tr className="border-b border-slate-800">
                                                        <td className="py-2 px-2">카르마 17성</td>
                                                        <td className="py-2 px-2 font-bold">2/23</td>
                                                    </tr>
                                                    <tr className="border-b border-slate-800">
                                                        <td className="py-2 px-2">카르마 블큐</td>
                                                        <td className="py-2 px-2 font-bold">3/2</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-2 px-2">카르마 화에큐 / 전설 성장의 비약(~279)</td>
                                                        <td className="py-2 px-2 font-bold">3/9</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/70 rounded-lg p-4">
                                        <div className="relative w-full aspect-[2/1] mb-3 bg-slate-800 rounded-lg overflow-hidden border border-green-500/30">
                                            <Image
                                                src="/images/blog/elanos-chronicle.png"
                                                alt="엘라노스 크로니클 ~3월 18일까지"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <p className="font-bold text-green-400 mb-2">엘라노스 크로니클</p>
                                        <div className="bg-green-900/30 border border-green-500/50 rounded p-3 mb-3">
                                            <div className="mb-2">
                                                <p className="text-white text-sm font-bold mb-1">
                                                    ✨ 에픽 던전 EXP 2.5배 효과 해금
                                                </p>
                                                <p className="text-slate-300 text-xs text-right">
                                                    최종 해금: <strong className="text-yellow-400">3월 5일(목)</strong>
                                                </p>
                                            </div>
                                            <div className="border-t border-green-500/30 pt-2 text-xs text-slate-300 space-y-1">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold text-slate-400">2/5 (목)</span>
                                                    <span className="text-green-300">엘라노스 3단계 진화</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold text-slate-400">3/5 (목)</span>
                                                    <span className="text-green-300">엘라노스 4단계 진화</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-slate-300 text-sm">
                                            💡 팁: 매주 목요일 1만 마리 처치 후 효과 활성화 후 메할일 진행하는 것을 추천<br />
                                            <span className="pl-6 text-yellow-300 font-bold block mt-1">('성장하기' 버튼도 항상 눌러보기!)</span>
                                        </p>
                                    </div>

                                    <div className="bg-slate-900/70 rounded-lg p-4 border border-slate-700/50">
                                        <p className="font-bold text-slate-400 mb-3 border-b border-slate-700 pb-2">📦 그 외 3/18 종료 항목</p>
                                        <ul className="text-slate-300 text-sm space-y-2">
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>
                                                환영의 기억
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>
                                                겨울나기 미션
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>
                                                주간 일러스트 의뢰 티켓 판매 이벤트
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>
                                                전 직업 일러스트 컬렉션 판매
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0 mt-1.5"></span>
                                                <span>보스 컬렉션 패키지 판매 <span className="text-yellow-400 text-xs">(찬란한 흉성 패키지 추가)</span></span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>
                                                전 직업 헤어&성형 쿠폰 판매
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4월 & 6월 종료 */}
                        <div>
                            <div className="bg-blue-900/30 border-2 border-blue-500/50 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-blue-400 mb-4">
                                    📆 4월 & 6월 종료
                                </h3>

                                <div className="space-y-2 text-sm text-slate-300">
                                    <p>• ~4/15: 챌린저스 월드 시즌 3</p>
                                    <p>• ~4/22: 아이템 버닝 PLUS</p>
                                    <p>• ~6/17: 하이퍼 버닝 MAX / 버닝 비욘드</p>
                                    <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 mt-3">
                                        <p className="text-red-300 font-bold">
                                            ⚠️ 아즈모스 협곡 완전 삭제 (코인 교환 ~6/30)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. 2월 업데이트 미리보기 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-purple-400">
                                    5. 2월 업데이트 미리보기 (신규 지역 & 보스)
                                </h2>
                                <p className="text-slate-400 text-sm mt-1">2월 12일(목) 패치 후 적용 예정</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* 신규 보스 유피테르 */}
                            <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 border-2 border-red-500/50 rounded-xl p-6">
                                <div className="relative w-full aspect-[2/1] mb-6 rounded-lg overflow-hidden shadow-lg border border-red-500/30 bg-slate-900">
                                    <Image
                                        src="/images/blog/boss-jupiter.png"
                                        alt="신규 보스 유피테르"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                        <Swords className="w-6 h-6 text-red-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-red-400">
                                        신규 보스 [유피테르]
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    <div className="bg-slate-900/70 rounded-lg p-4 border border-yellow-500/50">
                                        <div className="flex items-start gap-2 mb-2">
                                            <Crown className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="font-bold text-yellow-400 mb-1">입장 조건</p>
                                                <p className="text-slate-300 text-sm">
                                                    <strong className="text-white">295레벨 이상</strong> (고대신의 리더격)
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/70 rounded-lg p-4 border border-green-500/50">
                                        <div className="flex items-start gap-2 mb-2">
                                            <Gift className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="font-bold text-green-400 mb-1">보상</p>
                                                <p className="text-slate-300 text-sm">
                                                    • 오만의 원죄 (루컨마 대체 아이템)<br />
                                                    • 마을 등장 이펙트 (TOP 3)
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/70 rounded-lg p-4 border border-purple-500/50">
                                        <div className="flex items-start gap-2 mb-2">
                                            <TrendingUp className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="font-bold text-purple-400 mb-1">난이도</p>
                                                <p className="text-slate-300 text-sm">
                                                    • 노멀: <strong className="text-blue-400">전투력 4억 초반</strong> 예상<br />
                                                    • 하드: <strong className="text-red-400">최상위권</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-3 text-center">
                                        <p className="text-orange-300 font-bold text-sm">
                                            🎉 격파 이벤트 진행 예정
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 데스티니 무기 2차 해방 */}
                            <div className="bg-slate-900/70 rounded-xl p-5 border border-blue-500/50">
                                <div className="relative w-full aspect-[3/1] mb-4 bg-slate-800 rounded-lg overflow-hidden border border-blue-500/30">
                                    <Image
                                        src="/images/blog/destiny-weapon-2nd.png"
                                        alt="데스티니 무기 2차 성장"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-blue-400">
                                        데스티니 무기 2차 성장 (해방)
                                    </h3>
                                </div>
                                <p className="text-slate-300 text-sm mb-3">
                                    대상: <strong className="text-yellow-400">최초의 대적자 / 림보 / 발드릭스</strong>
                                </p>

                                <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3">
                                    <p className="font-bold text-blue-300 mb-2 text-sm">✨ 2차 성장 효과:</p>
                                    <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                                        <li className="flex items-start gap-2">
                                            <span className="text-yellow-400 font-bold min-w-[50px]">• 초월:</span>
                                            <span><strong className="text-white">결전의 의지</strong>, <strong className="text-white">불굴의 결의</strong> 스킬 강화</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-400 font-bold min-w-[50px]">• 강화:</span>
                                            <span>최대 스타포스 <strong className="text-white">25성</strong>까지 강화 가능!</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* 길드 캐슬 */}
                            <div className="bg-slate-900/70 rounded-xl p-5 border border-green-500/50">
                                <div className="relative w-full aspect-[3/1] mb-4 bg-slate-800 rounded-lg overflow-hidden border border-green-500/30">
                                    <Image
                                        src="/images/blog/guild-castle-logo.png"
                                        alt="신규 길드 콘텐츠 길드 캐슬 로고"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                        <Crown className="w-6 h-6 text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-green-400">
                                        길드 캐슬 & 시스템 개선
                                    </h3>
                                </div>
                                <div className="relative w-full aspect-[2/1] mb-6 bg-slate-800 rounded-lg overflow-hidden border border-green-500/30">
                                    <Image
                                        src="/images/blog/guild-castle-maps.png"
                                        alt="길드 캐슬 6종 맵 (로비, 보급소, 파티룸, 강화의 제단, 길드룸, 온실)"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="space-y-4 text-sm text-slate-300">
                                    <div>
                                        <p className="font-bold text-yellow-400 mb-2">🏰 신규 지역 상세 소개:</p>
                                        <ul className="space-y-2 pl-1">
                                            <li className="flex items-start gap-2">
                                                <span className="text-purple-400 font-bold min-w-[85px] px-2 bg-purple-900/30 rounded">• 보급소:</span>
                                                <span className="flex-1">나만의 개성을 담은 <strong className="text-white">길드 명찰</strong>을 제작할 수 있습니다.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-400 font-bold min-w-[85px] px-2 bg-red-900/30 rounded">• 강화의 제단:</span>
                                                <span className="flex-1">스타포스 강화를 <strong className="text-white">길드원들과 함께 관전</strong>하며 즐길 수 있습니다.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-blue-400 font-bold min-w-[85px] px-2 bg-blue-900/30 rounded">• 파티룸:</span>
                                                <span className="flex-1">오직 이곳에서만 즐길 수 있는 <strong className="text-white">전용 미니게임</strong>이 준비되어 있습니다.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-slate-400 font-bold min-w-[85px] px-2 bg-slate-800 rounded">• 그 외:</span>
                                                <span className="flex-1">로비, 길드룸, 온실 등 다양한 커뮤니티 공간 제공</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="pt-3 border-t border-slate-700">
                                        <p className="font-bold text-green-400 mb-2">✅ 시스템 개선 사항:</p>
                                        <ul className="text-xs leading-relaxed space-y-1 text-slate-400 pl-2">
                                            <li>• 일반 길드 스킬 <strong className="text-white">자동 레벨업</strong>으로 변경 (SP 투자 불필요)</li>
                                            <li>• 길드 축복(길축) 버프가 <strong className="text-white">패시브 효과</strong>로 변경</li>
                                            <li>• 길드 게시판 UI 및 편의성 대폭 개편</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* 신규 지역 기어드락 */}
                            <div className="bg-slate-900/70 rounded-xl p-5 border border-cyan-500/50">
                                <div className="relative w-full aspect-[2/1] mb-6 rounded-lg overflow-hidden shadow-lg border border-cyan-500/30">
                                    <Image
                                        src="/images/blog/new-area-gearedrock.png"
                                        alt="신규 지역 기어드락"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                                        <Map className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-cyan-400">
                                        신규 지역 [기어드락]
                                    </h3>
                                </div>
                                <div className="space-y-2 text-sm text-slate-300">
                                    <p>• 입장: <strong className="text-white">295레벨 이상</strong></p>
                                    <p>• 위치: 그란디스 서부 사막 지하</p>
                                    <p>• 스토리: 고대신 스토리의 마무리</p>
                                    <p className="text-yellow-300">💡 심볼 수치는 이전 지역과 동일 예상</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. 특별 소식 - 롯데월드 콜라보 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-pink-900/50 via-rose-900/50 to-red-900/50 border-2 border-pink-500/50 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl animate-pulse delay-75"></div>

                        {/* 콜라보 이미지 */}
                        <div className="relative z-10 w-full aspect-[2/1] mb-6 rounded-xl overflow-hidden shadow-2xl border-2 border-pink-500/50">
                            <Image
                                src="/images/blog/lotte-world-collab.png"
                                alt="롯데월드 X 메이플스토리 콜라보 - 메이플 아일랜드"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                                    <Star className="w-6 h-6 text-pink-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-black text-pink-400">
                                        6. 🎢 특별 소식: 롯데월드 X 메이플스토리 콜라보!
                                    </h2>
                                    <p className="text-slate-400 text-sm mt-1">2026년 4월 오픈 예정</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-2xl p-6 sm:p-8 border-2 border-pink-500/30">
                                <div className="text-center mb-6">
                                    <div className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full font-black text-lg mb-4">
                                        🎉 메이플 아일랜드 🎉
                                    </div>
                                    <p className="text-2xl sm:text-3xl font-black text-white mb-3">
                                        롯데월드 X 메이플스토리
                                    </p>
                                    <p className="text-xl text-pink-400 font-bold">
                                        2026년 4월 오픈 예정!
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-pink-900/30 border-2 border-pink-500/50 rounded-xl p-5">
                                        <div className="flex items-start gap-3 mb-4">
                                            <Sparkles className="w-6 h-6 text-pink-400 flex-shrink-0" />
                                            <div>
                                                <h3 className="text-xl font-bold text-pink-400 mb-2">메이플 아일랜드란?</h3>
                                                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                                    메이플스토리의 세계관을 현실로 옮겨온 <strong className="text-white">테마파크 체험 공간</strong>입니다!
                                                    롯데월드에서 메이플 세계를 직접 체험할 수 있는 특별한 기회가 찾아옵니다.
                                                </p>
                                                <div className="relative w-full aspect-[2/1] bg-pink-950/50 rounded-lg overflow-hidden border border-pink-500/30">
                                                    <Image
                                                        src="/images/blog/lotte-world-attractions.png"
                                                        alt="메이플 아일랜드 어트랙션 및 전경 미리보기"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-slate-900/70 rounded-xl p-5 border border-yellow-500/50">
                                            <div className="flex items-start gap-3">
                                                <Gift className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="font-bold text-yellow-400 mb-2">🍴 먹거리</p>
                                                    <p className="text-slate-300 text-sm">
                                                        메이플스토리 컨셉의 <strong className="text-white">특별한 음식과 음료</strong>를
                                                        만나보실 수 있습니다!
                                                    </p>
                                                    <p className="text-green-400 text-xs mt-2">
                                                        💡 메이플 세계관 속 아이템을 모티브로 한 메뉴 예정
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-900/70 rounded-xl p-5 border border-purple-500/50">
                                            <div className="flex items-start gap-3">
                                                <ShoppingBag className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="font-bold text-purple-400 mb-2">🎁 굿즈</p>
                                                    <p className="text-slate-300 text-sm">
                                                        롯데월드 X 메이플스토리 <strong className="text-white">한정판 굿즈</strong>와
                                                        기념품을 구매할 수 있습니다!
                                                    </p>
                                                    <p className="text-green-400 text-xs mt-2">
                                                        💡 오직 메이플 아일랜드에서만 만날 수 있는 특별 굿즈
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-2 border-blue-500/50 rounded-xl p-5 text-center mt-4">
                                        <p className="text-blue-300 font-bold mb-2">
                                            🗓️ 오픈 일정
                                        </p>
                                        <p className="text-white text-xl font-black">
                                            2026년 4월
                                        </p>
                                        <p className="text-slate-400 text-sm mt-2">
                                            정확한 오픈일은 추후 공지 예정
                                        </p>
                                    </div>

                                    <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 mt-4">
                                        <p className="text-yellow-300 text-sm flex items-start gap-2">
                                            <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                            <span>
                                                <strong className="text-yellow-400">메이플 용사님들!</strong> 메이플스토리가 롯데월드에서 현실이 됩니다!
                                                게임 속에서만 보던 메이플 월드를 직접 체험할 수 있는 절호의 기회를 놓치지 마세요! 🎮✨
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Conclusion */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-purple-500 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-6 text-center">📝 마무리</h2>
                        <p className="text-slate-300 leading-relaxed text-center mb-6">
                            2월은 <strong className="text-yellow-400">재화 밸런스 조정 마무리</strong>와 함께<br />
                            <strong className="text-purple-400">신규 보스 유피테르, 데스티니 무기 2차 해방, 길드 시스템 개선</strong> 등<br />
                            다양한 업데이트가 예정되어 있습니다! 🎁
                        </p>
                        <p className="text-slate-300 leading-relaxed text-center mb-6">
                            특히 <strong className="text-red-400">2월 11일 종료되는 이벤트</strong>들이 많으니<br />
                            보상 수령을 잊지 마세요! 💰
                        </p>
                        <div className="text-center">
                            <p className="text-slate-400 text-lg">
                                2월에도 즐거운 메이플 되세요! 🍁
                            </p>
                        </div>
                    </div>
                </section>

                {/* SEO Keywords */}
                <section className="mb-12">
                    <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                        <p className="text-slate-400 text-sm leading-relaxed">
                            <span className="text-blue-400 font-bold">#메이플스토리</span> <span className="text-purple-400 font-bold">#메이플2월업데이트</span> <span className="text-yellow-400 font-bold">#유피테르</span> <span className="text-green-400 font-bold">#데스티니무기2차해방</span> <span className="text-pink-400 font-bold">#길드캐슬</span> <span className="text-orange-400 font-bold">#기어드락</span> <span className="text-cyan-400 font-bold">#솔에르다타임</span> <span className="text-red-400 font-bold">#챌린저스패스종료</span> <span className="text-indigo-400 font-bold">#버닝익스프레스</span> <span className="text-teal-400 font-bold">#재화밸런스조정</span> <span className="text-lime-400 font-bold">#데일리기프트개편</span> <span className="text-rose-400 font-bold">#마일리지샵</span> <span className="text-pink-400 font-bold">#메이플아일랜드</span> <span className="text-blue-400 font-bold">#롯데월드메이플</span> <span className="text-yellow-400 font-bold">#메이플굿즈</span> <span className="text-green-400 font-bold">#메이플먹거리</span> <span className="text-yellow-400 font-bold">#경험치3배</span> <span className="text-cyan-400 font-bold">#룬경험치</span> <span className="text-red-400 font-bold">#몬스터파크250%</span> <span className="text-blue-400 font-bold">#콤보킬300%</span> <span className="text-purple-400 font-bold">#메이플이벤트</span> <span className="text-green-400 font-bold">#메이플소식</span> <span className="text-yellow-400 font-bold">#썬데이메이플혜택</span> <span className="text-blue-400 font-bold">#메이플스토리2026</span> <span className="text-pink-400 font-bold">#2월업데이트</span> <span className="text-cyan-400 font-bold">#신규지역기어드락</span> <span className="text-indigo-400 font-bold">#그란디스</span> <span className="text-red-400 font-bold">#메이플보스</span> <span className="text-lime-400 font-bold">#이벤트링</span> <span className="text-orange-400 font-bold">#메이플로드맵</span> <span className="text-teal-400 font-bold">#업데이트미리보기</span> <span className="text-rose-400 font-bold">#폭업</span> <span className="text-blue-400 font-bold">#메이플팁</span> <span className="text-purple-400 font-bold">#메이플가이드</span>
                        </p>
                    </div>
                </section>

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
