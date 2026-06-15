'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, AlertCircle, Clock, ShoppingCart, Target, Star, Gift, Zap } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function ChallengersPassEfficiency2026() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-slate-200 hover:text-white transition-colors mb-2 sm:mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">블로그로 돌아가기</span>
                    </Link>
                </div>
            </div>

            <article className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-12">
                {/* Title */}
                <header className="mb-10">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full">💰 가성비 분석</span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">이벤트 가이드</span>
                        <span className="text-slate-300 text-sm">2026년 6월 16일</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight">
                        🌐 챌린저스 패스 효율 완벽 분석<br/>
                        (무료/EXP/프리미엄 패스 비교)
                    </h1>
                    <p className="text-base sm:text-lg text-slate-200">
                        챌린저스 월드 시즌4 전용 혜택! 카산드라가 준비한 챌린저스 패스와 미호의 블루베리 농장 경험치 효율을 완벽하게 분석합니다.
                    </p>
                </header>

                <div className="my-8">
                    <InArticleAd dataAdSlot="6849727140" />
                </div>

                {/* ===== 챌린저스 패스 개요 ===== */}
                <section className="mb-10">
                    <div className="bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-green-900/30 border-2 border-blue-500/50 rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <Star className="w-6 h-6 text-blue-400" />
                            </div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-blue-400">
                                ✨ 챌린저스 패스 개요
                            </h2>
                        </div>

                        <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-5 mb-6 shadow-inner">
                            <p className="text-sm sm:text-base text-slate-200 mb-4 leading-relaxed">
                                카산드라가 준비한 챌린저스 월드 전용 물품! 챌린저스 월드를 여행하며 챌린저스 패스 레벨을 올리고 특별한 선물도 받아 가세요!
                            </p>
                            <ul className="space-y-3 text-sm sm:text-base text-slate-300">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                    <span><strong className="text-white">참여 대상:</strong> 챌린저스(1~4) 월드에서 생성된 260레벨 이상 캐릭터 또는 스토리 퀘스트 챕터 2를 완료한 260레벨 이상 제로 캐릭터</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Clock className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                                    <span><strong className="text-white">이벤트 기간:</strong> 2026년 6월 18일(목) 점검 후 ~ 9월 16일(수) 오후 11시 59분</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Target className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                                    <span><strong className="text-white">패스 레벨:</strong> 0~30레벨 (각 레벨별 100 패스 포인트 필요)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                    <span><strong className="text-white">포인트 획득:</strong> 일주일에 최대 500점까지 획득 가능</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ===== 주간 미션 ===== */}
                <section className="mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <span>📅</span> 주간 미션 (포인트 획득)
                    </h2>
                    <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden shadow-inner overflow-x-auto">
                        <table className="w-full text-sm sm:text-base text-left text-slate-300">
                            <thead className="bg-slate-800 text-white font-bold">
                                <tr>
                                    <th className="px-4 py-3 border-b border-slate-700 whitespace-nowrap">주간 미션</th>
                                    <th className="px-4 py-3 border-b border-slate-700 whitespace-nowrap text-center">획득 챌린저스 패스 포인트</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3">일일 접속 1회 / 3회 / 5회</td>
                                    <td className="px-4 py-3 text-center text-yellow-400 font-bold">각 100</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3">에픽던전 1회 클리어</td>
                                    <td className="px-4 py-3 text-center text-yellow-400 font-bold">100</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3">몬스터파크 7회 클리어</td>
                                    <td className="px-4 py-3 text-center text-yellow-400 font-bold">100</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3">주간 보스 6회 / 12회 처치</td>
                                    <td className="px-4 py-3 text-center text-yellow-400 font-bold">각 100</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3">레벨 범위 몬스터 1만 / 2만 / 3만 / 4만 마리 처치</td>
                                    <td className="px-4 py-3 text-center text-yellow-400 font-bold">각 100</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-slate-400 mt-3">
                        ※ 주간 챌린저스 패스 포인트 획득량 및 주간 미션 진행 여부는 매주 목요일 자정에 초기화됩니다.<br/>
                        ※ 메이플포인트를 사용하여 전 주 기준 획득하지 못한 챌린저스 패스 포인트를 구매할 수 있습니다. (100 포인트당 1,000 메이플포인트)
                    </p>
                </section>

                <div className="my-8">
                    <InArticleAd dataAdSlot="6849727140" />
                </div>

                {/* ===== 패스 종류 ===== */}
                <section className="mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span>🎟️</span> 챌린저스 패스 종류 및 혜택
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* 무료 패스 */}
                        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-5 flex flex-col">
                            <h3 className="text-lg font-bold text-slate-200 mb-2">무료 패스</h3>
                            <div className="text-2xl font-black text-white mb-4">무료</div>
                            <p className="text-sm text-slate-400 flex-1">기본 지원 물품 획득 가능</p>
                        </div>
                        
                        {/* EXP 패스 */}
                        <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/50 rounded-xl p-5 flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">추천</div>
                            <h3 className="text-lg font-bold text-blue-300 mb-2">챌린저스 EXP 패스</h3>
                            <div className="text-2xl font-black text-white mb-2">19,800 <span className="text-sm font-normal text-slate-400">넥슨캐시</span></div>
                            <ul className="text-sm text-slate-300 space-y-2 flex-1 mt-2">
                                <li className="flex items-start gap-1">
                                    <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                    <span>EXP 지원 물품 획득 가능</span>
                                </li>
                                <li className="flex items-start gap-1">
                                    <Zap className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                                    <span className="font-semibold text-yellow-300">일반 몬스터 데미지 +200%</span>
                                </li>
                                <li className="flex items-start gap-1">
                                    <Zap className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                                    <span className="font-semibold text-yellow-300">추가 경험치 획득량 +20%</span>
                                </li>
                            </ul>
                        </div>
                        
                        {/* 프리미엄 패스 */}
                        <div className="bg-gradient-to-br from-amber-900/40 to-yellow-900/40 border border-yellow-500/50 rounded-xl p-5 flex flex-col">
                            <h3 className="text-lg font-bold text-yellow-300 mb-2">챌린저스 프리미엄 패스</h3>
                            <div className="text-2xl font-black text-white mb-2">19,800 <span className="text-sm font-normal text-slate-400">넥슨캐시</span></div>
                            <p className="text-xs text-red-400 mb-3 font-semibold">* EXP 패스 구매 후 구매 가능</p>
                            <ul className="text-sm text-slate-300 space-y-2 flex-1">
                                <li className="flex items-start gap-1">
                                    <CheckCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                                    <span>프리미엄 지원 물품 획득 가능</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ===== 주요 보상 ===== */}
                <section className="mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <span>🎁</span> 주요 레벨 보상 하이라이트
                    </h2>
                    <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden shadow-inner overflow-x-auto">
                        <table className="w-full text-sm sm:text-base text-left text-slate-300">
                            <thead className="bg-slate-800 text-white font-bold">
                                <tr>
                                    <th className="px-4 py-3 border-b border-slate-700 whitespace-nowrap">레벨</th>
                                    <th className="px-4 py-3 border-b border-slate-700 whitespace-nowrap text-slate-300">기본 지원 물품</th>
                                    <th className="px-4 py-3 border-b border-slate-700 whitespace-nowrap text-blue-300">EXP 지원 물품</th>
                                    <th className="px-4 py-3 border-b border-slate-700 whitespace-nowrap text-yellow-300">프리미엄 지원 물품</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold">Lv.1</td>
                                    <td className="px-4 py-3">VIP 부스터 5개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">경험치 4배 쿠폰 (30분) 2개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold">Lv.4</td>
                                    <td className="px-4 py-3">솔 에르다 조각 15개</td>
                                    <td className="px-4 py-3">상급 EXP 교환권 1,000개</td>
                                    <td className="px-4 py-3">스페셜 명예의 훈장 100개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold">Lv.14</td>
                                    <td className="px-4 py-3">카르마 검은 환생의 불꽃 10개</td>
                                    <td className="px-4 py-3">상급 EXP 교환권 1,000개</td>
                                    <td className="px-4 py-3">카르마 검은 환생의 불꽃 100개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold">Lv.24</td>
                                    <td className="px-4 py-3">카르마 검은 환생의 불꽃 10개</td>
                                    <td className="px-4 py-3">상급 EXP 교환권 1,000개</td>
                                    <td className="px-4 py-3">카르마 블랙 큐브 20개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold">Lv.29</td>
                                    <td className="px-4 py-3">카르마 검은 환생의 불꽃 10개</td>
                                    <td className="px-4 py-3">상급 EXP 교환권 1,000개</td>
                                    <td className="px-4 py-3">카르마 화이트 에디셔널 큐브 20개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors bg-yellow-900/20">
                                    <td className="px-4 py-3 font-bold text-yellow-400">Lv.30 🏆</td>
                                    <td className="px-4 py-3 font-bold">상급 EXP 교환권 2,000개</td>
                                    <td className="px-4 py-3 font-bold">성장의 비약 (200~279) 1개</td>
                                    <td className="px-4 py-3 font-bold text-yellow-300">솔 에르다/조각 선택권 5개</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ===== 미호의 블루베리 농장 ===== */}
                <section className="mb-10">
                    <div className="bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-blue-900/40 border-2 border-indigo-500/30 rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-4xl">🍇</div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-indigo-300">
                                미호의 블루베리 농장
                            </h2>
                        </div>
                        <p className="text-slate-200 mb-6 font-semibold">
                            미호의 블루베리 농사를 도와주고 대량의 경험치를 획득하세요!
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-5 shadow-inner">
                                <h3 className="text-lg font-bold text-white mb-3 border-b border-slate-700 pb-2">기본 정보</h3>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-indigo-400 mt-0.5">▪</span>
                                        <span><strong className="text-white">참여 대상:</strong> 260~299레벨 캐릭터 (제로 챕터2 완료)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-indigo-400 mt-0.5">▪</span>
                                        <span><strong className="text-white">참여 방법:</strong> 챌린저스 패스에서 획득한 '블루베리 농장 입장권' 사용</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-5 shadow-inner">
                                <h3 className="text-lg font-bold text-white mb-3 border-b border-slate-700 pb-2">진행 규칙</h3>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-indigo-400 mt-0.5">▪</span>
                                        <span>제한 시간 30분 동안 블루베리 처치하여 경험치 획득</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-indigo-400 mt-0.5">▪</span>
                                        <span className="text-yellow-300 font-semibold">입장권 사용 후 24시간 내 자유롭게 재입장 가능 (수확률 100% 전)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-indigo-400 mt-0.5">▪</span>
                                        <span>280레벨 이상은 279레벨과 동일한 경험치 획득</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="my-8">
                    <InArticleAd dataAdSlot="6849727140" />
                </div>
            </article>
        </div>
    );
}
