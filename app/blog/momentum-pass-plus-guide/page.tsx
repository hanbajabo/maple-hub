'use client';

import Link from 'next/link';
import { CheckCircle, AlertCircle, Clock, Target, Star, Gift, Zap, TrendingUp } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

/* ===== 크림슨 메카베리 경험치 데이터 ===== */
const EXP_TABLE: { level: number; mecaberry: string; mecaberryPct: string; crimson: string; crimsonPct: string }[] = [
    { level: 280, mecaberry: '3,265,600,060,800', mecaberryPct: '9.705%', crimson: '5,079,822,316,800', crimsonPct: '15.097%' },
    { level: 281, mecaberry: '3,310,161,465,600', mecaberryPct: '8.943%', crimson: '5,149,140,057,600', crimsonPct: '13.912%' },
    { level: 282, mecaberry: '3,349,939,507,200', mecaberryPct: '8.228%', crimson: '5,211,017,011,200', crimsonPct: '12.799%' },
    { level: 283, mecaberry: '3,394,838,304,000', mecaberryPct: '7.580%', crimson: '5,280,859,584,000', crimsonPct: '11.792%' },
    { level: 284, mecaberry: '3,435,009,811,200', mecaberryPct: '6.973%', crimson: '5,343,348,595,200', crimsonPct: '10.846%' },
    { level: 285, mecaberry: '5,148,589,248,000', mecaberryPct: '5.174%', crimson: '6,006,687,456,000', crimsonPct: '6.036%' },
    { level: 286, mecaberry: '5,208,577,228,800', mecaberryPct: '4.758%', crimson: '6,076,673,433,600', crimsonPct: '5.551%' },
    { level: 287, mecaberry: '5,276,305,267,200', mecaberryPct: '4.382%', crimson: '6,155,689,478,400', crimsonPct: '5.112%' },
    { level: 288, mecaberry: '5,344,448,947,200', mecaberryPct: '4.035%', crimson: '6,235,190,438,400', crimsonPct: '4.708%' },
    { level: 289, mecaberry: '5,405,227,660,800', mecaberryPct: '3.710%', crimson: '6,306,098,937,600', crimsonPct: '4.328%' },
    { level: 290, mecaberry: '6,580,266,950,400', mecaberryPct: '2.236%', crimson: '7,086,441,331,200', crimsonPct: '2.408%' },
    { level: 291, mecaberry: '6,653,978,073,600', mecaberryPct: '2.055%', crimson: '7,165,822,540,800', crimsonPct: '2.213%' },
    { level: 292, mecaberry: '6,737,444,313,600', mecaberryPct: '1.892%', crimson: '7,255,709,260,800', crimsonPct: '2.037%' },
    { level: 293, mecaberry: '6,821,411,625,600', mecaberryPct: '1.741%', crimson: '7,346,135,596,800', crimsonPct: '1.875%' },
    { level: 294, mecaberry: '6,896,248,444,800', mecaberryPct: '1.600%', crimson: '7,426,729,094,400', crimsonPct: '1.724%' },
    { level: 295, mecaberry: '7,747,012,416,000', mecaberryPct: '0.890%', crimson: '8,342,936,448,000', crimsonPct: '0.959%' },
    { level: 296, mecaberry: '7,841,362,214,400', mecaberryPct: '0.819%', crimson: '8,444,543,923,200', crimsonPct: '0.882%' },
    { level: 297, mecaberry: '7,936,266,624,000', mecaberryPct: '0.754%', crimson: '8,546,748,672,000', crimsonPct: '0.812%' },
    { level: 298, mecaberry: '8,020,789,920,000', mecaberryPct: '0.692%', crimson: '8,637,773,760,000', crimsonPct: '0.746%' },
    { level: 299, mecaberry: '8,116,248,940,800', mecaberryPct: '0.467%', crimson: '8,740,575,782,400', crimsonPct: '0.503%' },
];

/* ===== 주간 미션 데이터 ===== */
const WEEKLY_MISSIONS = [
    { mission: '어센틱 지역 심볼 일일 퀘스트 3회 완료', point: 200 },
    { mission: '어센틱 지역 심볼 일일 퀘스트 6회 완료', point: 100 },
    { mission: '어센틱 지역 심볼 일일 퀘스트 9회 완료', point: 100 },
    { mission: '어센틱 지역 심볼 일일 퀘스트 12회 완료', point: 100 },
    { mission: '어센틱 지역 심볼 일일 퀘스트 15회 완료', point: 100 },
    { mission: '몬스터파크 2회 완료', point: 300 },
    { mission: '몬스터파크 4회 완료', point: 300 },
    { mission: '몬스터파크 6회 완료', point: 300 },
    { mission: '몬스터파크 8회 완료', point: 300 },
    { mission: '몬스터파크 10회 완료', point: 300 },
    { mission: '몬스터파크 12회 완료', point: 300 },
    { mission: '에픽 던전 1회 완료', point: 300 },
    { mission: '레벨 범위 몬스터 5,000마리 처치', point: 400 },
    { mission: '레벨 범위 몬스터 10,000마리 처치', point: 300 },
    { mission: '레벨 범위 몬스터 15,000마리 처치', point: 300 },
    { mission: '레벨 범위 몬스터 20,000마리 처치', point: 300 },
    { mission: '레벨 범위 몬스터 25,000마리 처치', point: 300 },
    { mission: '레벨 범위 몬스터 30,000마리 처치', point: 300 },
    { mission: '레벨 범위 몬스터 35,000마리 처치', point: 300 },
    { mission: '레벨 범위 몬스터 40,000마리 처치', point: 300 },
];

/* ===== 패스 레벨 보상 데이터 ===== */
const PASS_REWARDS = [
    { level: 1,  free: '크림슨 메카베리 농장 입장권 1개',    premium: 'VIP 부스터 10개',              prime: '경험치 4배 쿠폰(30분) 2개' },
    { level: 2,  free: 'VIP 사우나 이용권 1개',               premium: '크림슨 메카베리 농장 입장권 1개', prime: '상급 EXP 교환권 3,000개' },
    { level: 3,  free: '솔 에르다 1개',                       premium: '경험치 4배 쿠폰(30분) 2개',     prime: '크림슨 메카베리 농장 입장권 3개' },
    { level: 4,  free: '상급 EXP 교환권 100개',               premium: '상급 EXP 교환권 1,500개',      prime: '경험치 4배 쿠폰(30분) 2개' },
    { level: 5,  free: 'VIP 사우나 이용권 1개',               premium: '크림슨 메카베리 농장 입장권 2개', prime: '상급 EXP 교환권 3,000개' },
    { level: 6,  free: '솔 에르다 1개',                       premium: '상급 EXP 교환권 1,500개',      prime: '크림슨 메카베리 농장 입장권 4개' },
    { level: 7,  free: '상급 EXP 교환권 100개',               premium: 'VIP 부스터 10개',              prime: '경험치 4배 쿠폰(30분) 2개' },
    { level: 8,  free: 'VIP 사우나 이용권 1개',               premium: '크림슨 메카베리 농장 입장권 2개', prime: '상급 EXP 교환권 3,000개' },
    { level: 9,  free: '솔 에르다 1개',                       premium: '경험치 4배 쿠폰(30분) 2개',     prime: 'VIP 부스터 20개' },
    { level: 10, free: '상급 EXP 교환권 300개',               premium: '상급 EXP 교환권 1,500개',      prime: '크림슨 메카베리 농장 입장권 4개' },
];

/* ===== 보상 총합 계산 ===== */
const FREE_TOTALS = {
    solErda: 3,
    expTicket: 500,
    vipSauna: 3,
    mecaberryTicket: 1,
};
const PREMIUM_TOTALS = {
    expTicket: 6000,
    mecaberryTicket: 5,
    vipBooster: 20,
    exp4xCoupon: 6,
};
const PRIME_TOTALS = {
    expTicket: 9000,
    mecaberryTicket: 11,
    exp4xCoupon: 6,
    vipBooster: 20,
};

export default function MomentumPassPlusGuidePage() {
    return (
        <div className="min-h-screen bg-[#080711] text-white">
            <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">

                {/* ===== Back link ===== */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8 group">
                    <span className="transform group-hover:-translate-x-1 transition-transform">←</span> 블로그 목록으로
                </Link>

                {/* ===== 헤더 ===== */}
                <header className="mb-10">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="bg-violet-600/30 text-violet-300 text-xs font-semibold px-3 py-1 rounded-full border border-violet-500/40">이벤트 가이드</span>
                        <span className="bg-amber-600/30 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/40">8월 20일 시작</span>
                        <time className="text-xs text-slate-500">2026년 8월 14일</time>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                        🌀 모멘텀 패스 PLUS 완벽 가이드 — 주간 미션·레벨 보상·크림슨 메카베리 농장 총정리
                    </h1>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                        카산드라의 지원은 한 번 더 가속된다! 모멘텀 패스의 레벨도 올리고 보상도 받아 가세요. 주간 미션 효율부터 패스 레벨별 보상, 크림슨 메카베리 농장 경험치까지 완벽하게 정리합니다.
                    </p>
                </header>

                <div className="my-8">
                    <InArticleAd dataAdSlot="6849727140" />
                </div>

                {/* ===== 이벤트 개요 ===== */}
                <section className="mb-10">
                    <div className="bg-gradient-to-br from-violet-900/30 via-purple-900/20 to-blue-900/30 border-2 border-violet-500/50 rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center">
                                <Star className="w-6 h-6 text-violet-400" />
                            </div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-violet-300">
                                ✨ 모멘텀 패스 PLUS 개요
                            </h2>
                        </div>

                        <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-5 shadow-inner">
                            <p className="text-sm sm:text-base text-slate-200 mb-5 leading-relaxed">
                                카산드라가 준비한 본 서버 전용 이벤트! 모멘텀 패스 레벨을 올리고 특별한 보상을 획득하세요.
                                <strong className="text-violet-300"> 무료 패스(모멘텀 리워드)</strong>, <strong className="text-blue-300"> 프리미엄 모멘텀 패스</strong>, <strong className="text-amber-300"> 프라임 모멘텀 패스</strong> 총 3단계로 구성되어 있습니다.
                            </p>
                            <ul className="space-y-3 text-sm sm:text-base text-slate-200">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                    <span><strong className="text-white">참여 대상:</strong> 280레벨 이상의 캐릭터 또는 스토리 퀘스트 챕터 2를 완료한 280레벨 이상의 제로 캐릭터</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Clock className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                                    <span><strong className="text-white">이벤트 기간:</strong> 2026년 8월 20일(목) 점검 후 ~ 9월 16일(수) 오후 11시 59분</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Target className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                                    <span><strong className="text-white">패스 레벨:</strong> 0~10레벨 (각 레벨별 750 모멘텀 패스 포인트 필요)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                    <span><strong className="text-white">주간 한도:</strong> 일주일에 최대 2,500점까지 획득 가능</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                    <span><strong className="text-white">주의:</strong> 명의당 하나의 캐릭터만 참여 가능하며, 참여 캐릭터 변경 불가</span>
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
                        <table className="w-full min-w-[400px] text-sm sm:text-base text-left text-white">
                            <thead className="bg-slate-800 text-white font-bold">
                                <tr>
                                    <th className="px-4 py-3 border-b border-slate-700 whitespace-nowrap">주간 미션</th>
                                    <th className="px-4 py-3 border-b border-slate-700 whitespace-nowrap text-center w-32">획득 포인트</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {WEEKLY_MISSIONS.map((m, i) => (
                                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-4 py-2.5">{m.mission}</td>
                                        <td className="px-4 py-2.5 text-center text-yellow-400 font-bold">{m.point.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-slate-400">
                        <p>※ 모멘텀 패스 포인트는 일주일에 최대 <strong className="text-yellow-300">2,500점</strong>까지 획득할 수 있습니다.</p>
                        <p>※ 주간 미션 진행 여부 및 포인트 획득량은 <strong className="text-white">매주 목요일 오전 0시</strong>에 초기화됩니다.</p>
                        <p>※ 이벤트 참여 전 기록은 주간 미션에 반영되지 않습니다.</p>
                        <p>※ 전 주 미획득 포인트를 메이플포인트로 구매 가능합니다. (<strong className="text-white">100포인트 = 1,000 메이플포인트</strong>)</p>
                    </div>

                    {/* 주간 효율 요약 */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-violet-900/20 border border-violet-500/30 rounded-xl p-4 text-center">
                            <div className="text-3xl font-black text-violet-300 mb-1">4주</div>
                            <div className="text-sm text-slate-300">10레벨 달성 최소 기간</div>
                            <div className="text-xs text-slate-500 mt-1">(750×10 = 7,500pt ÷ 주 2,500pt)</div>
                        </div>
                        <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 text-center">
                            <div className="text-3xl font-black text-green-300 mb-1">2,500</div>
                            <div className="text-sm text-slate-300">주당 최대 포인트</div>
                            <div className="text-xs text-slate-500 mt-1">심볼 퀘스트 + 몬파 + 사냥</div>
                        </div>
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 text-center">
                            <div className="text-3xl font-black text-blue-300 mb-1">750</div>
                            <div className="text-sm text-slate-300">레벨당 필요 포인트</div>
                            <div className="text-xs text-slate-500 mt-1">레벨 0→10 총 7,500pt</div>
                        </div>
                    </div>
                </section>

                <div className="my-8">
                    <InArticleAd dataAdSlot="6849727140" />
                </div>

                {/* ===== 패스 종류 ===== */}
                <section className="mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span>🎟️</span> 모멘텀 패스 종류 및 혜택
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* 무료 패스 */}
                        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-5 flex flex-col">
                            <h3 className="text-lg font-bold text-white mb-2">모멘텀 리워드</h3>
                            <div className="text-2xl font-black text-white mb-4">무료</div>
                            <p className="text-sm text-slate-300 flex-1">기본 보상(모멘텀 리워드)을 무료로 획득 가능</p>
                        </div>

                        {/* 프리미엄 패스 */}
                        <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/50 rounded-xl p-5 flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">추천</div>
                            <h3 className="text-lg font-bold text-blue-300 mb-2">프리미엄 모멘텀 패스</h3>
                            <div className="text-2xl font-black text-white mb-2">29,800 <span className="text-sm font-normal text-slate-300">넥슨캐시</span></div>
                            <ul className="text-sm text-slate-200 space-y-2 flex-1 mt-2">
                                <li className="flex items-start gap-1">
                                    <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                    <span>프리미엄 모멘텀 리워드 획득 가능</span>
                                </li>
                                <li className="flex items-start gap-1">
                                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                    <span className="text-red-300 text-xs">명의당 1회 구매, 넥슨캐시만 사용 가능</span>
                                </li>
                            </ul>
                        </div>

                        {/* 프라임 패스 */}
                        <div className="bg-gradient-to-br from-amber-900/40 to-yellow-900/40 border border-yellow-500/50 rounded-xl p-5 flex flex-col">
                            <h3 className="text-lg font-bold text-yellow-300 mb-2">프라임 모멘텀 패스</h3>
                            <div className="text-2xl font-black text-white mb-2">39,800 <span className="text-sm font-normal text-slate-300">넥슨캐시</span></div>
                            <ul className="text-sm text-slate-200 space-y-2 flex-1">
                                <li className="flex items-start gap-1">
                                    <CheckCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                                    <span>프라임 모멘텀 리워드 획득 가능</span>
                                </li>
                                <li className="flex items-start gap-1">
                                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                    <span className="text-red-300 text-xs">프리미엄 패스 효과 적용 후 구매 가능</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-3">※ 판매 기간: 2026년 8월 20일(목) 점검 후 ~ 9월 16일(수) 오후 11시까지 | 넥슨캐시로만 구매 가능, 교환 및 청약철회 불가</p>
                </section>

                {/* ===== 패스 레벨별 보상 ===== */}
                <section className="mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <span>🎁</span> 패스 레벨 달성 보상 (1~10레벨)
                    </h2>

                    {/* 보상 총합 요약 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* 무료 총합 */}
                        <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-5">
                            <h4 className="text-white font-bold mb-3 pb-2 border-b border-slate-600 flex items-center gap-2">
                                <Gift className="w-4 h-4" /> 모멘텀 리워드 총합
                            </h4>
                            <p className="text-xs text-slate-400 mb-4">과금 없이 레벨 10 달성 시 획득 가능한 기본 보상</p>
                            <ul className="space-y-2 text-sm text-white">
                                <li className="flex justify-between gap-2"><span>솔 에르다</span><span className="font-bold text-right">3개</span></li>
                                <li className="flex justify-between gap-2"><span>상급 EXP 교환권</span><span className="font-bold text-right">500개</span></li>
                                <li className="flex justify-between gap-2"><span>VIP 사우나 이용권</span><span className="font-bold text-right">3개</span></li>
                                <li className="flex justify-between gap-2"><span>크림슨 메카베리 농장 입장권</span><span className="font-bold text-right">1개</span></li>
                            </ul>
                        </div>

                        {/* 프리미엄 총합 */}
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-5">
                            <h4 className="text-blue-300 font-bold mb-3 pb-2 border-b border-blue-500/30 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" /> 프리미엄 리워드 총합
                            </h4>
                            <p className="text-xs text-slate-400 mb-4">프리미엄 모멘텀 패스(29,800 캐시) 구매 시</p>
                            <ul className="space-y-2 text-sm text-white">
                                <li className="flex justify-between gap-2"><span>상급 EXP 교환권</span><span className="font-bold text-blue-300 text-right">6,000개</span></li>
                                <li className="flex justify-between gap-2"><span>크림슨 메카베리 농장 입장권</span><span className="font-bold text-right">5개</span></li>
                                <li className="flex justify-between gap-2"><span>VIP 부스터</span><span className="font-bold text-right">20개</span></li>
                                <li className="flex justify-between gap-2"><span>경험치 4배 쿠폰(30분)</span><span className="font-bold text-right">6개</span></li>
                            </ul>
                        </div>

                        {/* 프라임 총합 */}
                        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-5">
                            <h4 className="text-yellow-300 font-bold mb-3 pb-2 border-b border-yellow-500/30 flex items-center gap-2">
                                <Zap className="w-4 h-4" /> 프라임 리워드 총합
                            </h4>
                            <p className="text-xs text-slate-400 mb-4">프라임 모멘텀 패스(39,800 캐시) 구매 시</p>
                            <ul className="space-y-2 text-sm text-white">
                                <li className="flex justify-between gap-2"><span>상급 EXP 교환권</span><span className="font-bold text-yellow-300 text-right">9,000개</span></li>
                                <li className="flex justify-between gap-2"><span>크림슨 메카베리 농장 입장권</span><span className="font-bold text-right">11개</span></li>
                                <li className="flex justify-between gap-2"><span>경험치 4배 쿠폰(30분)</span><span className="font-bold text-right">6개</span></li>
                                <li className="flex justify-between gap-2"><span>VIP 부스터</span><span className="font-bold text-right">20개</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* 상세 레벨별 보상 표 */}
                    <details className="group rounded-xl border border-slate-700 bg-slate-900 overflow-hidden shadow-md">
                        <summary className="p-5 sm:p-6 text-lg font-bold text-white cursor-pointer select-none flex items-center justify-between hover:bg-slate-800 transition-colors">
                            <span className="flex items-center gap-2">📋 레벨별 상세 보상 표</span>
                            <span className="transform group-open:rotate-180 transition-transform duration-300 text-slate-400">▼</span>
                        </summary>
                        <div className="overflow-x-auto border-t border-slate-700">
                            <table className="w-full text-sm text-left text-white min-w-[700px]">
                                <thead className="bg-slate-800 font-bold">
                                    <tr>
                                        <th className="px-4 py-3 border-b border-slate-700 whitespace-nowrap text-center w-16">레벨</th>
                                        <th className="px-4 py-3 border-b border-slate-700 whitespace-nowrap text-white">🎁 모멘텀 리워드 (무료)</th>
                                        <th className="px-4 py-3 border-b border-slate-700 whitespace-nowrap text-blue-300">📈 프리미엄 모멘텀 리워드</th>
                                        <th className="px-4 py-3 border-b border-slate-700 whitespace-nowrap text-yellow-300">👑 프라임 모멘텀 리워드</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {PASS_REWARDS.map((row) => (
                                        <tr key={row.level} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="px-4 py-3 font-black text-center text-lg text-violet-300">{row.level}</td>
                                            <td className="px-4 py-3">{row.free}</td>
                                            <td className="px-4 py-3 text-blue-200">{row.premium}</td>
                                            <td className="px-4 py-3 text-yellow-200">{row.prime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </details>

                    <div className="mt-4 space-y-1 text-xs text-slate-500">
                        <p>※ 모든 보상은 2026년 9월 16일(수) 오후 11시 59분까지 수령 가능, 9월 17일(목) 오전 2시까지 사용 가능</p>
                        <p>※ VIP 사우나 이용권을 제외한 모든 보상은 교환 불가능한 아이템입니다.</p>
                        <p>※ VIP 사우나 이용권은 월드 내 캐릭터간 이동만 가능합니다.</p>
                    </div>
                </section>

                <div className="my-8">
                    <InArticleAd dataAdSlot="6849727140" />
                </div>

                {/* ===== 크림슨 메카베리 농장 ===== */}
                <section className="mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span>🍓</span> 크림슨 메카베리 농장
                    </h2>

                    <div className="bg-gradient-to-br from-red-900/30 to-pink-900/20 border border-red-500/40 rounded-2xl p-5 sm:p-6 mb-6">
                        <h3 className="text-lg font-bold text-red-300 mb-4">이벤트 안내</h3>
                        <ul className="space-y-3 text-sm sm:text-base text-slate-200">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                <span><strong className="text-white">참여 대상:</strong> 280레벨 이상 300레벨 미만 캐릭터 (또는 챕터 2 완료 제로)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                <span><strong className="text-white">입장 방법:</strong> &apos;크림슨 메카베리 농장 입장권&apos; 사용 → 이벤트 리스트에서 입장</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Clock className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                                <span><strong className="text-white">제한 시간:</strong> 30분 / 입장권 사용 후 최대 24시간 입장 가능</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                                <span><strong className="text-white">완료 조건:</strong> 크림슨 메카베리 프사이 처치 → 농장 복구율 100% 달성 시 자동 퇴장</span>
                            </li>
                        </ul>
                    </div>

                    {/* 슈피겔버스트 */}
                    <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-5 mb-6">
                        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-400" /> 슈피겔버스트 (전용 공격 스킬)
                        </h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li>• NPC/채집키를 눌러 사용할 수 있는 전용 공격 스킬</li>
                            <li>• 크림슨 메카베리 처치 시 <strong className="text-yellow-300">피버 포인트</strong> 획득</li>
                            <li>• 피버 포인트 <strong className="text-yellow-300">3,000 포인트</strong> 달성 시 <strong className="text-red-300">10초간 피버 상태</strong> 돌입</li>
                            <li>• 피버 상태에서는 슈피겔버스트를 <strong className="text-white">쿨타임 없이</strong> 재사용 가능</li>
                        </ul>
                        <div className="mt-3 text-xs text-slate-500">
                            ※ 피버 활성화 상태에서 퇴장 시 재입장 시 피버 게이지 초기화됩니다.
                        </div>
                    </div>

                    {/* 경험치 주의사항 */}
                    <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-4 mb-6">
                        <p className="text-sm text-amber-200">
                            ⚠️ &apos;크림슨 메카베리 농장: 격전의 딸기농장&apos;에서는 <strong>어떠한 추가 경험치 효과도 적용되지 않으며</strong>, 멀티킬이 발생하지 않습니다.
                        </p>
                    </div>

                    {/* 경험치 표 */}
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-400" /> 레벨별 경험치 획득량
                    </h3>
                    <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden shadow-inner overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm text-left text-white min-w-[580px]">
                            <thead className="bg-slate-800 font-bold">
                                <tr>
                                    <th className="px-3 py-3 border-b border-slate-700 whitespace-nowrap text-center">레벨</th>
                                    <th className="px-3 py-3 border-b border-slate-700 whitespace-nowrap text-slate-300">메카베리 경험치</th>
                                    <th className="px-3 py-3 border-b border-slate-700 whitespace-nowrap text-center text-green-300">경험치 배율</th>
                                    <th className="px-3 py-3 border-b border-slate-700 whitespace-nowrap text-red-300">크림슨 메카베리 경험치</th>
                                    <th className="px-3 py-3 border-b border-slate-700 whitespace-nowrap text-center text-red-300">경험치 배율</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {EXP_TABLE.map((row, i) => {
                                    const isHighlight = row.level % 5 === 0;
                                    return (
                                        <tr key={i} className={`transition-colors ${isHighlight ? 'bg-slate-800/50' : 'hover:bg-slate-800/20'}`}>
                                            <td className={`px-3 py-2.5 font-bold text-center ${isHighlight ? 'text-violet-300' : 'text-slate-300'}`}>{row.level}</td>
                                            <td className="px-3 py-2.5 font-mono text-xs text-slate-300">{row.mecaberry}</td>
                                            <td className="px-3 py-2.5 text-center font-bold text-green-300">{row.mecaberryPct}</td>
                                            <td className="px-3 py-2.5 font-mono text-xs text-slate-300">{row.crimson}</td>
                                            <td className="px-3 py-2.5 text-center font-bold text-red-300">{row.crimsonPct}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">* 크림슨 메카베리는 일반 메카베리보다 약 1.5배 더 높은 경험치를 제공합니다.</p>
                </section>

                {/* ===== 한눈에 보는 요약 ===== */}
                <section className="mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <span>⚡</span> 한눈에 보는 핵심 정리
                    </h2>
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-5 sm:p-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                                <span className="text-2xl">🎯</span>
                                <div>
                                    <div className="font-bold text-white text-sm">레벨 10 달성 목표</div>
                                    <div className="text-xs text-slate-400 mt-1">주 2,500pt × 3주 = 7,500pt → 레벨 10 달성. 이벤트 기간(4주) 내 여유롭게 달성 가능</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                                <span className="text-2xl">🍓</span>
                                <div>
                                    <div className="font-bold text-white text-sm">크림슨 메카베리 농장 우선 처치</div>
                                    <div className="text-xs text-slate-400 mt-1">일반 메카베리 대비 약 1.55배 높은 경험치! 280레벨대 기준 처치당 15% 경험치로 매우 효율적</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                                <span className="text-2xl">💰</span>
                                <div>
                                    <div className="font-bold text-white text-sm">과금 여부에 따른 보상 차이</div>
                                    <div className="text-xs text-slate-400 mt-1">무과금: 솔 에르다 3개 + 상급 EXP 500개 | 풀과금(69,600캐시): 상급 EXP 총 15,000개 + 입장권 최대 17개</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                                <span className="text-2xl">⚠️</span>
                                <div>
                                    <div className="font-bold text-white text-sm">캐릭터 선택 신중하게</div>
                                    <div className="text-xs text-slate-400 mt-1">한 번 참여하면 변경 불가! 메인 캐릭터로 참여하세요</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== 관련 글 ===== */}
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-white mb-4">📚 관련 글</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Link href="/blog/challengers-pass-efficiency-2026" className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 hover:border-violet-500/50 hover:bg-slate-800/50 transition-all group">
                            <div className="text-xs text-violet-400 mb-1 font-semibold">이벤트 가이드</div>
                            <div className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">챌린저스 패스 효율 완벽 분석</div>
                        </Link>
                        <Link href="/blog/ultima-artifact-exploration-guide" className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 hover:border-violet-500/50 hover:bg-slate-800/50 transition-all group">
                            <div className="text-xs text-violet-400 mb-1 font-semibold">이벤트 가이드</div>
                            <div className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">울티마 유물 탐사 완벽 공략</div>
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
}
