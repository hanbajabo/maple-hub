'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, AlertCircle, Clock, Target, Star, Gift, Zap, TrendingUp, Calculator, ShoppingCart } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

/* ===== 크림슨 메카베리 경험치 데이터 & 기존 메카베리 비교 (280~299) ===== */
const EXP_TABLE: {
    level: number;
    mecaberryExp: string;
    mecaberryPct: string;
    crimsonExp: string;
    crimsonPct: string;
    diffPct: string;
    increasePct: string;
}[] = [
    { level: 280, mecaberryExp: '3,265,600,060,800', mecaberryPct: '9.705%', crimsonExp: '5,079,822,316,800', crimsonPct: '15.097%', diffPct: '+5.392%p', increasePct: '+55.6% ↑' },
    { level: 281, mecaberryExp: '3,310,161,465,600', mecaberryPct: '8.943%', crimsonExp: '5,149,140,057,600', crimsonPct: '13.912%', diffPct: '+4.969%p', increasePct: '+55.6% ↑' },
    { level: 282, mecaberryExp: '3,349,939,507,200', mecaberryPct: '8.228%', crimsonExp: '5,211,017,011,200', crimsonPct: '12.799%', diffPct: '+4.571%p', increasePct: '+55.6% ↑' },
    { level: 283, mecaberryExp: '3,394,838,304,000', mecaberryPct: '7.580%', crimsonExp: '5,280,859,584,000', crimsonPct: '11.792%', diffPct: '+4.212%p', increasePct: '+55.6% ↑' },
    { level: 284, mecaberryExp: '3,435,009,811,200', mecaberryPct: '6.973%', crimsonExp: '5,343,348,595,200', crimsonPct: '10.846%', diffPct: '+3.873%p', increasePct: '+55.5% ↑' },
    { level: 285, mecaberryExp: '5,148,589,248,000', mecaberryPct: '5.174%', crimsonExp: '6,006,687,456,000', crimsonPct: '6.036%', diffPct: '+0.862%p', increasePct: '+16.7% ↑' },
    { level: 286, mecaberryExp: '5,208,577,228,800', mecaberryPct: '4.758%', crimsonExp: '6,076,673,433,600', crimsonPct: '5.551%', diffPct: '+0.793%p', increasePct: '+16.7% ↑' },
    { level: 287, mecaberryExp: '5,276,305,267,200', mecaberryPct: '4.382%', crimsonExp: '6,155,689,478,400', crimsonPct: '5.112%', diffPct: '+0.730%p', increasePct: '+16.7% ↑' },
    { level: 288, mecaberryExp: '5,344,448,947,200', mecaberryPct: '4.035%', crimsonExp: '6,235,190,438,400', crimsonPct: '4.708%', diffPct: '+0.673%p', increasePct: '+16.7% ↑' },
    { level: 289, mecaberryExp: '5,405,227,660,800', mecaberryPct: '3.710%', crimsonExp: '6,306,098,937,600', crimsonPct: '4.328%', diffPct: '+0.618%p', increasePct: '+16.7% ↑' },
    { level: 290, mecaberryExp: '6,580,266,950,400', mecaberryPct: '2.236%', crimsonExp: '7,086,441,331,200', crimsonPct: '2.408%', diffPct: '+0.172%p', increasePct: '+7.7% ↑' },
    { level: 291, mecaberryExp: '6,653,978,073,600', mecaberryPct: '2.055%', crimsonExp: '7,165,822,540,800', crimsonPct: '2.213%', diffPct: '+0.158%p', increasePct: '+7.7% ↑' },
    { level: 292, mecaberryExp: '6,737,444,313,600', mecaberryPct: '1.892%', crimsonExp: '7,255,709,260,800', crimsonPct: '2.037%', diffPct: '+0.145%p', increasePct: '+7.7% ↑' },
    { level: 293, mecaberryExp: '6,821,411,625,600', mecaberryPct: '1.741%', crimsonExp: '7,346,135,596,800', crimsonPct: '1.875%', diffPct: '+0.134%p', increasePct: '+7.7% ↑' },
    { level: 294, mecaberryExp: '6,896,248,444,800', mecaberryPct: '1.600%', crimsonExp: '7,426,729,094,400', crimsonPct: '1.724%', diffPct: '+0.124%p', increasePct: '+7.8% ↑' },
    { level: 295, mecaberryExp: '7,747,012,416,000', mecaberryPct: '0.890%', crimsonExp: '8,342,936,448,000', crimsonPct: '0.959%', diffPct: '+0.069%p', increasePct: '+7.8% ↑' },
    { level: 296, mecaberryExp: '7,841,362,214,400', mecaberryPct: '0.819%', crimsonExp: '8,444,543,923,200', crimsonPct: '0.882%', diffPct: '+0.063%p', increasePct: '+7.7% ↑' },
    { level: 297, mecaberryExp: '7,936,266,624,000', mecaberryPct: '0.754%', crimsonExp: '8,546,748,672,000', crimsonPct: '0.812%', diffPct: '+0.058%p', increasePct: '+7.7% ↑' },
    { level: 298, mecaberryExp: '8,020,789,920,000', mecaberryPct: '0.692%', crimsonExp: '8,637,773,760,000', crimsonPct: '0.746%', diffPct: '+0.054%p', increasePct: '+7.8% ↑' },
    { level: 299, mecaberryExp: '8,116,248,940,800', mecaberryPct: '0.467%', crimsonExp: '8,740,575,782,400', crimsonPct: '0.503%', diffPct: '+0.036%p', increasePct: '+7.7% ↑' },
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

/* ===== 계산기용 경험치 & 레벨별 경험치 요구량 테이블 ===== */
const CRIMSON_EXP_MAP: Record<number, number> = {
    280: 15.097, 281: 13.912, 282: 12.799, 283: 11.792, 284: 10.846,
    285: 6.036,  286: 5.551,  287: 5.112,  288: 4.708,  289: 4.328,
    290: 2.408,  291: 2.213,  292: 2.037,  293: 1.875,  294: 1.724,
    295: 0.959,  296: 0.882,  297: 0.812,  298: 0.746,  299: 0.503,
};

const LEVEL_EXP_REQ: Record<number, number> = {
    280: 33647892407763,
    281: 37012220080506,
    282: 40714251200875,
    283: 44783409006105,
    284: 49265596489120,
    285: 99514371371769,
    286: 109469887112232,
    287: 120416460845070,
    288: 132438199626168,
    289: 145704688946395,
    290: 294287430697674,
    291: 323783214676910,
    292: 356195840000000,
    293: 391793898496000,
    294: 430784750255220,
    295: 869962090510948,
    296: 957431283809523,
    297: 1052555255172413,
    298: 1157878520107238,
    299: 1737689022345924,
};


export default function MomentumPassPlusGuidePage() {
    const [tableSortLevel, setTableSortLevel] = useState<'280' | '285' | '290'>('290');
    const [tableAuctionPrice, setTableAuctionPrice] = useState<number>(28.3);

    // 기본 데이터 (사냥 효율 기준)
    const BASE_HUNTING = {
        '280': { perHour: 4826, base100: 1609, area: '아르테리아', advExp: 7.93 },
        '285': { perHour: 6576, base100: 2192, area: '카르시온', advExp: 9.37 },
        '290': { perHour: 8909, base100: 2970, area: '탈라하트', advExp: 10.78 },
    };

    const JIN_BOOSTER = {
        '280': { total: 11268 },
        '285': { total: 14084 },
        '290': { total: 15022 },
    };

    const calcAstraExp = (level: '280' | '285' | '290', hoursPerDay: number): number => {
        const base = BASE_HUNTING[level].base100;
        const advExpVal = BASE_HUNTING[level].advExp;
        const totalExp = base * hoursPerDay * 100;
        return Math.round(totalExp / advExpVal);
    };

    const TABLE_CASH_EQUIV = Math.round(tableAuctionPrice * 1500);

    const FINAL_TABLE_DATA = [
        { name: "몬스터 파크", detail: "썬데이메이플(4.8배)", price: "600 메포", e280: 14400, e285: 18134, e290: 21547 },
        { name: "챌린저스 EXP 듀오", detail: "64.5만 마리", price: "10,000 캐시", e280: 16000, e285: 16000, e290: 16000 },
        { name: "챌린저스 EXP 듀오", detail: "60만 마리", price: "10,000 캐시", e280: 15245, e285: 15245, e290: 15245 },
        { name: "모멘텀 패스", detail: "경쿠 제외", price: "50,000 캐시", e280: 10248, e285: 13064, e290: 14003 },
        // 모멘텀 패스 PLUS
        // 프리미엄 (29,800 캐시):
        //   상급EXP direct = free(500) + premium(4,500) = 5,000
        //   크림슨 입장권 6개 × (4,051 / 4,790 / 5,651) + VIP사우나 3개 × 205
        //   e280: (5000 + 6×4051 + 3×205) / 2.98 = 29,921 / 2.98 ≈ 10,041
        //   e285: (5000 + 6×4790 + 3×205) / 2.98 = 34,355 / 2.98 ≈ 11,529
        //   e290: (5000 + 6×5651 + 3×205) / 2.98 = 39,521 / 2.98 ≈ 13,262
        { 
            name: "모멘텀 패스 PLUS", 
            detail: "프리미엄 패스 (경쿠 제외)", 
            price: "29,800 캐시", 
            e280: 10041, 
            e285: 11529, 
            e290: 13262,
            isNew: true
        },
        // 프리미엄+프라임 (69,600 캐시):
        //   상급EXP direct = free(500) + premium(4,500) + prime(9,000) = 14,000
        //   크림슨 입장권 17개 × (4,051 / 4,790 / 5,651) + VIP사우나 3개 × 205
        //   e280: (14000 + 17×4051 + 3×205) / 6.96 = 83,482 / 6.96 ≈ 11,995
        //   e285: (14000 + 17×4790 + 3×205) / 6.96 = 96,045 / 6.96 ≈ 13,800
        //   e290: (14000 + 17×5651 + 3×205) / 6.96 = 110,682 / 6.96 ≈ 15,903
        { 
            name: "모멘텀 패스 PLUS", 
            detail: "프리미엄+프라임 패스 (경쿠 제외)", 
            price: "69,600 캐시", 
            e280: 11995, 
            e285: 13800, 
            e290: 15903,
            isNew: true
        },
        { name: "챌린저스 EXP 듀오", detail: "50만 마리", price: "10,000 캐시", e280: 13567, e285: 13567, e290: 13567 },
        { name: "챌린저스 EXP 듀오", detail: "40만 마리", price: "10,000 캐시", e280: 11889, e285: 11889, e290: 11889 },
        { name: "챌린저스 EXP 듀오", detail: "30만 마리", price: "10,000 캐시", e280: 10211, e285: 10211, e290: 10211 },
        { name: "몬스터 파크", detail: "일요일+보약(2.3배)", price: "600 메포", e280: 6900, e285: 8689, e290: 10325 },
        { name: "챌린저스 EXP 듀오", detail: "20만 마리", price: "10,000 캐시", e280: 8533, e285: 8533, e290: 8533 },
        { name: "하이마운틴", detail: "0→1", price: "7,500 메포", e280: 8335, e285: 8335, e290: 8335 },
        { name: "메카베리 농장", detail: "메소 구매", price: "5억 메소", e280: 5632, e285: 7509, e290: 8135 },
        { name: "익스프레스 패스", detail: "캐시 구매", price: "30,000 캐시", e280: 8107, e285: 8107, e290: 8107 },
        { name: "앵글러 컴퍼니", detail: "0→1", price: "10,000 메포", e280: 7906, e285: 7906, e290: 7906 },
        { name: "몬스터 파크", detail: "평일 보약(1.7배)", price: "600 메포", e280: 5111, e285: 6422, e290: 7621 },
        { name: "악몽선경", detail: "0→1", price: "12,500 메포", e280: 7708, e285: 7708, e290: 7708 },
        { name: "챌린저스 EXP 듀오", detail: "10만 마리", price: "10,000 캐시", e280: 6855, e285: 6855, e290: 6855 },
        { name: "익스프레스 부스터", detail: "메소 구매", price: "3,000만 메소", e280: 4556, e285: 4556, e290: 4556 },
        { name: "몬스터 파크", detail: "기본배율", price: "600 메포", e280: 3000, e285: 3778, e290: 4489 },
        { name: "악몽선경", detail: "1→2", price: "37,500 메포", e280: 2090, e285: 2090, e290: 2090 },
        { name: "앵글러 컴퍼니", detail: "1→2", price: "30,000 메포", e280: 2006, e285: 2006, e290: 2006 },
        { name: "하이마운틴", detail: "1→2", price: "22,500 메포", e280: 1857, e285: 1857, e290: 1857 },
        { name: "사우나", detail: "1시간", price: "3,000 메포", e280: 1822, e285: 1822, e290: 1822 },
        { 
            name: "챌린저스 시즌4 EXP 패스", 
            detail: "280이상 44,010 / 260이상 34,714", 
            price: "19,800 캐시", 
            e280: 44010, 
            e285: 44010, 
            e290: 44010,
            isNew: false
        },
        { 
            name: "진 부스터 패키지", 
            detail: "기본+보너스", 
            price: "10,000 캐시", 
            e280: JIN_BOOSTER['280'].total, 
            e285: JIN_BOOSTER['285'].total, 
            e290: JIN_BOOSTER['290'].total,
            isNew: false
        },
        {
            name: "아스트랄 세레나데(경매장)",
            detail: "경매장 4종(일 2시간)",
            price: `${tableAuctionPrice}억 메소`,
            e280: Math.round(calcAstraExp('280', 2) / (TABLE_CASH_EQUIV / 10000)),
            e285: Math.round(calcAstraExp('285', 2) / (TABLE_CASH_EQUIV / 10000)),
            e290: Math.round(calcAstraExp('290', 2) / (TABLE_CASH_EQUIV / 10000)),
            isNew: false
        },
        {
            name: "아스트랄 세레나데(경매장)",
            detail: "경매장 4종(일 3시간)",
            price: `${tableAuctionPrice}억 메소`,
            e280: Math.round(calcAstraExp('280', 3) / (TABLE_CASH_EQUIV / 10000)),
            e285: Math.round(calcAstraExp('285', 3) / (TABLE_CASH_EQUIV / 10000)),
            e290: Math.round(calcAstraExp('290', 3) / (TABLE_CASH_EQUIV / 10000)),
            isNew: false
        },
        {
            name: "아스트랄 세레나데(캐시)",
            detail: "캐시 패키지(일 2시간)",
            price: "69,800 캐시",
            e280: Math.round(calcAstraExp('280', 2) / 6.98),
            e285: Math.round(calcAstraExp('285', 2) / 6.98),
            e290: Math.round(calcAstraExp('290', 2) / 6.98),
            isNew: false
        },
        {
            name: "아스트랄 세레나데(캐시)",
            detail: "캐시 패키지(일 3시간)",
            price: "69,800 캐시",
            e280: Math.round(calcAstraExp('280', 3) / 6.98),
            e285: Math.round(calcAstraExp('285', 3) / 6.98),
            e290: Math.round(calcAstraExp('290', 3) / 6.98),
            isNew: false
        }
    ];

    const sortedTableData = [...FINAL_TABLE_DATA].sort((a, b) => {
        if (tableSortLevel === '290') return (b.e290 || 0) - (a.e290 || 0);
        if (tableSortLevel === '285') return (b.e285 || 0) - (a.e285 || 0);
        return (b.e280 || 0) - (a.e280 || 0);
    });

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
                        <span className="block mb-2">🌀 모멘텀 패스 PLUS 완벽 가이드</span>
                        <span className="block text-lg sm:text-xl md:text-2xl text-slate-300 font-bold leading-snug">주간 미션·레벨 보상·크림슨 메카베리 농장 효율 정리 및 BM 비교 등등 총정리!</span>
                    </h1>
                    <div className="mb-6 flex justify-center">
                        <Image
                            src="/momentum-pass-plus-banner.png"
                            width={900}
                            height={280}
                            alt="모멘텀 패스 PLUS 배너 - 카산드라의 지원은 한 번 더 가속된다!"
                            className="rounded-xl border border-violet-500/40 object-contain shadow-lg w-full max-w-2xl"
                            unoptimized={true}
                        />
                    </div>
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
                            <div className="mb-6 flex justify-center">
                                <Image
                                    src="/momentum-pass-plus-ui.png"
                                    width={900}
                                    height={460}
                                    alt="모멘텀 패스 PLUS 게임 내 UI 화면"
                                    className="rounded-lg border border-slate-700 shadow-md w-full"
                                    unoptimized={true}
                                />
                            </div>
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
                    <div className="mt-6 flex justify-center">
                        <Image
                            src="/momentum-pass-rewards-ui.png"
                            width={900}
                            height={340}
                            alt="모멘텀 패스 PLUS 1~10레벨 보상 목록 화면"
                            className="rounded-xl border border-slate-700 shadow-md w-full"
                            unoptimized={true}
                        />
                    </div>
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
                                <li className="flex justify-between gap-2"><span>상급 EXP 교환권</span><span className="font-bold text-blue-300 text-right">4,500개</span></li>
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

                    <div className="mb-6 flex justify-center">
                        <Image
                            src="/crimson-mecaberry-ticket.png"
                            width={380}
                            height={380}
                            alt="크림슨 메카베리 농장 입장권 툴팁"
                            className="rounded-lg border border-slate-700 shadow-md max-w-xs w-full object-contain"
                            unoptimized={true}
                        />
                    </div>

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
                    <div className="mb-3">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-400" /> 레벨별 크림슨 메카베리 경험치 획득량 (1회 기준)
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold">
                            (기존 메카베리 농장 이용권과 비교)
                        </p>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden shadow-inner overflow-x-auto">
                        <table className="w-full text-[10px] sm:text-sm text-left text-white min-w-[450px] sm:min-w-[620px]">
                            <thead className="bg-slate-800 font-bold">
                                <tr>
                                    <th className="px-1.5 sm:px-3 py-2 sm:py-3 border-b border-slate-700 whitespace-nowrap text-center">레벨</th>
                                    <th className="px-1.5 sm:px-3 py-2 sm:py-3 border-b border-slate-700 whitespace-nowrap text-slate-400">메카베리 경험치</th>
                                    <th className="px-1.5 sm:px-3 py-2 sm:py-3 border-b border-slate-700 whitespace-nowrap text-center text-slate-400">경험치 배율</th>
                                    <th className="px-1.5 sm:px-3 py-2 sm:py-3 border-b border-slate-700 whitespace-nowrap text-red-300">크림슨 경험치</th>
                                    <th className="px-1.5 sm:px-3 py-2 sm:py-3 border-b border-slate-700 whitespace-nowrap text-center text-red-300">경험치 배율</th>
                                    <th className="px-1.5 sm:px-3 py-2 sm:py-3 border-b border-slate-700 whitespace-nowrap text-center text-amber-300">증가량</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {EXP_TABLE.map((row, i) => {
                                    const isHighlight = row.level % 5 === 0;
                                    return (
                                        <tr key={i} className={`transition-colors ${isHighlight ? 'bg-slate-800/50 font-semibold' : 'hover:bg-slate-800/20'}`}>
                                            <td className={`px-1.5 sm:px-3 py-2 sm:py-2.5 font-bold text-center ${isHighlight ? 'text-violet-300' : 'text-slate-300'}`}>{row.level}</td>
                                            <td className="px-1.5 sm:px-3 py-2 sm:py-2.5 font-mono text-[9px] sm:text-xs text-slate-400">{row.mecaberryExp}</td>
                                            <td className="px-1.5 sm:px-3 py-2 sm:py-2.5 text-center text-slate-400">{row.mecaberryPct}</td>
                                            <td className="px-1.5 sm:px-3 py-2 sm:py-2.5 font-mono text-[9px] sm:text-sm text-slate-200 font-medium">{row.crimsonExp}</td>
                                            <td className="px-1.5 sm:px-3 py-2 sm:py-2.5 text-center font-bold text-red-300">{row.crimsonPct}</td>
                                            <td className="px-1.5 sm:px-3 py-2 sm:py-2.5 text-center whitespace-nowrap">
                                                <span className="inline-flex items-center gap-1 font-bold text-[10px] sm:text-xs text-amber-300 bg-amber-950/40 border border-amber-500/30 px-1 sm:px-2 py-0.5 rounded">
                                                    {row.diffPct} <span className="hidden sm:inline text-[9px] sm:text-[10px] text-yellow-400">({row.increasePct})</span>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                        <div className="bg-gradient-to-br from-orange-900/50 to-red-900/40 border border-orange-500/50 rounded-xl p-3 sm:p-4 text-center">
                            <div className="text-xl sm:text-2xl font-black text-orange-300">+55.6%</div>
                            <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-semibold">280~284 구간</div>
                            <div className="text-[9px] sm:text-[10px] text-orange-400/70 mt-0.5">기존 메카베리 대비</div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/40 border border-yellow-500/50 rounded-xl p-3 sm:p-4 text-center">
                            <div className="text-xl sm:text-2xl font-black text-yellow-300">+16.7%</div>
                            <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-semibold">285~289 구간</div>
                            <div className="text-[9px] sm:text-[10px] text-yellow-400/70 mt-0.5">기존 메카베리 대비</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/40 border border-green-500/50 rounded-xl p-3 sm:p-4 text-center">
                            <div className="text-xl sm:text-2xl font-black text-green-300">+7.7%</div>
                            <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-semibold">290~299 구간</div>
                            <div className="text-[9px] sm:text-[10px] text-green-400/70 mt-0.5">기존 메카베리 대비</div>
                        </div>
                    </div>

                    {/* 크림슨 메카베리 농장 경험치 계산기 링크 */}
                    <div className="mt-8">
                        <Link
                            href="/calculator/crimson-mecaberry-farm"
                            prefetch={false}
                            className="flex items-center justify-between gap-4 bg-gradient-to-r from-red-900/40 to-pink-900/30 hover:from-red-900/60 hover:to-pink-900/50 border border-red-500/50 hover:border-red-400/70 rounded-2xl p-5 sm:p-6 transition-all duration-200 group shadow-lg"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-4xl">🍓</span>
                                <div>
                                    <div className="font-black text-white text-base sm:text-lg flex items-center gap-2">
                                        크림슨 메카베리 농장 경험치 계산기
                                        <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded animate-pulse">NEW</span>
                                    </div>
                                    <div className="text-xs sm:text-sm text-slate-400 mt-1">입장권 수와 현재 레벨을 입력하면 최종 레벨을 계산해드려요!</div>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 group-hover:translate-x-1 transition-transform shrink-0"><path d="m9 18 6-6-6-6"/></svg>
                        </Link>
                    </div>
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
                                    <div className="font-bold text-white text-sm">압도적인 레벨업 효율</div>
                                    <div className="text-xs text-slate-400 mt-1">280레벨 기준 1회당 약 15.1%의 대량 경험치를 즉시 획득하여 280~299 레벨업을 대폭 가속합니다.</div>
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

                {/* ===== 역대 BM 상급 EXP 환산 효율 랭킹 ===== */}
                <section className="mb-14">
                    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-slate-700 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                            <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-yellow-400" />
                            </div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white">
                                🍁 역대 BM 상급 EXP 환산 효율 랭킹
                            </h2>
                        </div>

                        {/* 재화 환산 기준 */}
                        <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 mb-6 text-sm text-white space-y-2">
                            <h4 className="font-bold text-yellow-400 flex items-center gap-2">💰 재화 환산 기준 (가정)</h4>
                            <ul className="list-disc pl-5 space-y-1 text-slate-300">
                                <li><strong className="text-white">1억 메소</strong> = 1,500 캐시</li>
                                <li><strong className="text-white">1억 메소</strong> = 2,000 메이플포인트</li>
                            </ul>
                            <p className="text-slate-300 bg-slate-950/50 p-2 rounded text-xs">
                                <strong className="text-yellow-400">💡 참고:</strong> 이에 따라 1 메이플포인트는 약 0.75 캐시의 가치로 환산되어 계산됩니다.
                            </p>
                            <p className="text-slate-300 border-t border-slate-700/50 pt-2 text-xs sm:text-sm">
                                <strong className="text-cyan-400">📌 효율 수치란?</strong> 1만 캐시당 획득할 수 있는 경험치를 <strong>상급 EXP 개수</strong>로 환산한 수치입니다. 숫자가 높을수록 가성비가 좋습니다!
                            </p>
                        </div>

                        {/* 정렬 탭 & 실시간 경매장 가격 입력 */}
                        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-4">
                            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                {(['280', '285', '290'] as const).map(lv => (
                                    <button
                                        key={`table-${lv}`}
                                        onClick={() => setTableSortLevel(lv)}
                                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${tableSortLevel === lv ? 'bg-yellow-500 text-slate-900 shadow-lg scale-105' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                                    >
                                        {lv === '290' ? 'Lv.290+' : `Lv.${lv}~${parseInt(lv) + 4}`}
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 bg-slate-800/80 border border-slate-600 rounded-lg p-3 sm:p-2 shadow-inner w-full md:w-auto">
                                <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                                    <ShoppingCart className="w-4 h-4 inline mr-1 text-white" />
                                    아스트랄(경매장) 가격 :
                                </span>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="number" 
                                        value={tableAuctionPrice || ''}
                                        onChange={(e) => setTableAuctionPrice(Number(e.target.value))}
                                        step="0.1"
                                        min="0"
                                        className="w-full sm:w-24 bg-slate-950 border border-slate-600 rounded px-2 py-1 text-yellow-400 font-mono font-bold text-right outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-colors"
                                    />
                                    <span className="text-xs sm:text-sm text-white font-bold whitespace-nowrap shrink-0">억 메소</span>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-slate-700/50 shadow-inner">
                            <table className="w-full text-[10px] sm:text-xs md:text-sm">
                                <thead>
                                    <tr className="bg-slate-800 border-b border-slate-600 leading-tight">
                                        <th className="px-1 sm:px-2 md:px-3 py-2 sm:py-3 text-center text-white font-bold whitespace-nowrap">순위</th>
                                        <th className="px-1 sm:px-2 md:px-3 py-2 sm:py-3 text-left text-white font-bold">콘텐츠명</th>
                                        <th className="px-1 sm:px-2 md:px-3 py-2 sm:py-3 text-left text-white font-bold">상세</th>
                                        <th className="px-1 sm:px-2 md:px-3 py-2 sm:py-3 text-left text-white font-bold whitespace-nowrap">가격</th>
                                        <th className={`px-1 sm:px-2 md:px-3 py-2 sm:py-3 text-center font-bold whitespace-nowrap ${tableSortLevel === '280' ? 'text-yellow-400 bg-slate-700/50' : 'text-white'}`}>280~284</th>
                                        <th className={`px-1 sm:px-2 md:px-3 py-2 sm:py-3 text-center font-bold whitespace-nowrap ${tableSortLevel === '285' ? 'text-yellow-400 bg-slate-700/50' : 'text-white'}`}>285~289</th>
                                        <th className={`px-1 sm:px-2 md:px-3 py-2 sm:py-3 text-center font-bold whitespace-nowrap ${tableSortLevel === '290' ? 'text-yellow-400 bg-slate-700/50' : 'text-white'}`}>290+</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/30">
                                    {sortedTableData.map((row, idx) => (
                                        <tr key={idx} className={`${row.isNew ? 'bg-purple-900/20' : 'bg-slate-900/50'} hover:bg-slate-700/30 transition-colors`}>
                                            <td className="px-1 sm:px-2 md:px-3 py-2 sm:py-3 text-center">
                                                {idx === 0 ? <span className="w-5 h-5 sm:w-6 sm:h-6 inline-flex items-center justify-center bg-yellow-500 text-slate-900 rounded-full font-bold text-[10px] sm:text-xs shadow-md">1</span> : 
                                                 idx === 1 ? <span className="w-5 h-5 sm:w-6 sm:h-6 inline-flex items-center justify-center bg-slate-300 text-slate-900 rounded-full font-bold text-[10px] sm:text-xs shadow-md">2</span> : 
                                                 idx === 2 ? <span className="w-5 h-5 sm:w-6 sm:h-6 inline-flex items-center justify-center bg-amber-600 text-white rounded-full font-bold text-[10px] sm:text-xs shadow-md">3</span> : 
                                                 <span className="text-white font-mono">{idx + 1}</span>}
                                            </td>
                                            <td className={`px-1 sm:px-2 md:px-3 py-2 sm:py-3 font-bold ${row.name === '챌린저스 시즌4 EXP 패스' ? 'text-yellow-400' : 'text-white'}`}>
                                                <div className="flex flex-col xl:flex-row xl:items-center gap-1 sm:gap-2">
                                                    <span className="break-keep">{row.name}</span>
                                                    {row.isNew && <span className="px-1.5 py-0.5 bg-purple-500 text-white text-[9px] sm:text-[10px] rounded animate-pulse w-fit">NEW</span>}
                                                </div>
                                            </td>
                                            <td className="px-1 sm:px-2 md:px-3 py-2 sm:py-3 text-slate-300 break-keep leading-tight">{row.detail}</td>
                                            <td className="px-1 sm:px-2 md:px-3 py-2 sm:py-3 text-slate-300 whitespace-nowrap">{row.price}</td>
                                            <td className={`px-1 sm:px-2 md:px-3 py-2 sm:py-3 text-center font-mono ${tableSortLevel === '280' ? 'text-yellow-300 font-bold bg-slate-800/30' : 'text-slate-200'}`}>
                                                {row.e280.toLocaleString()}
                                            </td>
                                            <td className={`px-1 sm:px-2 md:px-3 py-2 sm:py-3 text-center font-mono ${tableSortLevel === '285' ? 'text-yellow-300 font-bold bg-slate-800/30' : 'text-slate-200'}`}>
                                                {row.e285.toLocaleString()}
                                            </td>
                                            <td className={`px-1 sm:px-2 md:px-3 py-2 sm:py-3 text-center font-mono ${tableSortLevel === '290' ? 'text-yellow-300 font-bold bg-slate-800/30' : 'text-slate-200'}`}>
                                                {row.e290.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <div className="my-8">
                    <InArticleAd dataAdSlot="6849727140" />
                </div>

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
