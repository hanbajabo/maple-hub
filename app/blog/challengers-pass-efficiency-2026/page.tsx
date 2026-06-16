'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, AlertCircle, Clock, ShoppingCart, Target, Star, Gift, Zap, TrendingUp } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

const BLUEBERRY_EXP_TABLE: Record<number, number> = {
    260: 47.3428, 261: 47.5485, 262: 47.7467, 263: 47.9409, 264: 48.2099,
    265: 41.7204, 266: 41.8745, 267: 42.0237, 268: 42.2380, 269: 42.3788,
    270: 32.2025, 271: 32.3547, 272: 32.4513, 273: 32.5456, 274: 32.6885,
    275: 18.1881, 276: 16.7430, 277: 15.4353, 278: 14.2061, 279: 13.0932,
    280: 6.4818, 281: 5.8925, 282: 5.3568, 283: 4.8699, 284: 4.4271,
    285: 2.1917, 286: 1.9924, 287: 1.8113, 288: 1.6466, 289: 1.4969,
    290: 0.7411, 291: 0.6737, 292: 0.6124, 293: 0.5568, 294: 0.5062,
    295: 0.2506, 296: 0.2278, 297: 0.2071, 298: 0.1883, 299: 0.1255,
};

const BURN_OVERFLOW_RATIO: Record<number, number> = {
    260: 0.9802942772030347,
    262: 0.9802937551023243,
    264: 0.7616149330804635,
    266: 0.9802993345951961,
    268: 0.44599086621247286,
    270: 0.9802985074626865,
    272: 0.9802920295787309,
    274: 0.450048774143201,
    276: 0.8264469745712927,
    278: 0.45004689056913444,
};
const SINGLE_OVERFLOW_RATIO: Record<number, number> = {
    260: 0.9900971723881953,
    261: 0.9901032983557253,
    262: 0.9900971440955053,
    263: 0.9900964568591164,
    264: 0.7692321480986878,
    265: 0.9900998362558227,
    266: 0.9901028352879196,
    267: 0.9900963135425815,
    268: 0.9901025679419032,
    269: 0.45045031765451576,
    270: 0.9901041305102394,
    271: 0.9900947693311759,
    272: 0.9900956880007512,
    273: 0.9901001908396947,
    274: 0.49505430187943045,
    275: 0.9090660123129514,
    276: 0.9091703056768591,
    277: 0.9090479800176461,
    278: 0.9090982357423366,
    279: 0.4950480445043834,
    280: 0.9090271786022441,
    281: 0.9118840579710175,
    282: 4.8699/5.3568,   283: 4.4271/4.8699,
    284: 2.1917/4.4271,   285: 1.9924/2.1917,   286: 1.8113/1.9924,   287: 1.6466/1.8113,   288: 1.4969/1.6466,
    289: 0.7411/1.4969,   290: 0.6737/0.7411,   291: 0.6124/0.6737,   292: 0.5568/0.6124,   293: 0.5062/0.5568,
    294: 0.2506/0.5062,   295: 0.2278/0.2506,   296: 0.2071/0.2278,   297: 0.1883/0.2071,   298: 0.1255/0.1883, 299: 1/1,
};

const BlueberryCalculator = () => {
    const [level, setLevel] = useState<number>(260);
    const [currentExp, setCurrentExp] = useState<number>(0);
    const [tickets, setTickets] = useState<number>(17);
    const [burningBeyond, setBurningBeyond] = useState<boolean>(false);
    
    const [result, setResult] = useState<{finalLevel: number, finalExp: number, log: string[]} | null>(null);

    const calculate = () => {
        let currentLv = level;
        let exp = currentExp;
        let logs: string[] = [];
        
        for (let i = 1; i <= tickets; i++) {
            if (currentLv >= 300) {
                logs.push(`[${i}번째] 이미 300레벨입니다.`);
                break;
            }
            
            const expGain = BLUEBERRY_EXP_TABLE[currentLv] || 0;
            if (expGain === 0) {
                logs.push(`[${i}번째] ${currentLv}레벨은 지원하지 않습니다.`);
                break;
            }
            
            exp += expGain;
            logs.push(`[${i}번째] Lv.${currentLv} (+${expGain.toFixed(4)}%) -> 누적 ${exp.toFixed(4)}%`);
            
            while (exp >= 100 && currentLv < 300) {
                const overflowExp = exp - 100;
                const nextLv = (burningBeyond && currentLv < 280) ? currentLv + 2 : currentLv + 1;
                
                let convertedExp: number;
                if (burningBeyond && currentLv < 280 && BURN_OVERFLOW_RATIO[currentLv] !== undefined) {
                    convertedExp = overflowExp * BURN_OVERFLOW_RATIO[currentLv];
                } else {
                    convertedExp = overflowExp * (SINGLE_OVERFLOW_RATIO[currentLv] || 0.98029);
                }
                
                currentLv = nextLv;
                exp = convertedExp;
                
                logs.push(`🎉 레벨업! Lv.${currentLv} 달성 (잔여 경험치: ${exp.toFixed(4)}%)`);
            }
        }
        
        setResult({
            finalLevel: currentLv,
            finalExp: exp,
            log: logs
        });
    };

    return (
        <div className="mt-8 bg-slate-900 border border-indigo-500/50 rounded-xl p-5 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2 flex items-center gap-2">
                <span>🧮</span> 블루베리 농장 경험치 계산기
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-bold text-white mb-1">시작 레벨 (260~299)</label>
                    <input type="number" min={260} max={299} value={level} onChange={(e) => setLevel(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white outline-none focus:border-indigo-500" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-white mb-1">시작 경험치 (%)</label>
                    <input type="number" min={0} max={99.999} step={0.001} value={currentExp} onChange={(e) => setCurrentExp(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white outline-none focus:border-indigo-500" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-white mb-1">입장권 수</label>
                    <input type="number" min={1} max={100} value={tickets} onChange={(e) => setTickets(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white outline-none focus:border-indigo-500" />
                </div>
                <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 cursor-pointer bg-slate-800/80 p-2 rounded border border-slate-700 w-full">
                        <input type="checkbox" checked={burningBeyond} onChange={(e) => setBurningBeyond(e.target.checked)} className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900" />
                        <span className="text-sm font-bold text-yellow-400">🔥 버닝비욘드 (1+1)</span>
                    </label>
                </div>
            </div>
            <button onClick={calculate} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-colors mb-4">
                결과 계산하기
            </button>
            
            {result && (
                <div className="bg-slate-800/80 rounded-lg p-4 border border-indigo-500/50 mt-4">
                    <h4 className="text-center text-lg md:text-xl font-black text-white mb-2">
                        최종 결과: <span className="text-indigo-400">Lv.{result.finalLevel}</span> ({result.finalExp.toFixed(4)}%)
                    </h4>
                    <div className="max-h-60 overflow-y-auto text-sm text-white space-y-1.5 bg-slate-900 p-3 rounded border border-slate-700">
                        {result.log.map((line, idx) => (
                            <div key={idx} className={line.includes('레벨업') ? 'text-yellow-400 font-bold' : ''}>{line}</div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function ChallengersPassEfficiency2026() {
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
            isNew: true
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
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-white hover:text-white transition-colors mb-2 sm:mb-4"
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
                        <span className="text-white text-sm">2026년 6월 18일 적용 예정</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight">
                        🌐 챌린저스 패스 효율 완벽 분석<br/>
                        (무료/EXP/프리미엄 패스 비교)
                    </h1>
                    <div className="mb-4 flex justify-center">
                        <Image
                            src="/images/challengers-pass-preview.png"
                            width={900}
                            height={280}
                            alt="챌린저스 패스 Lv.2 화면 - 지원 물품, EXP 지원, 프리미엄 지원 구성"
                            className="rounded-xl border border-slate-700/50 object-contain shadow-lg w-full max-w-3xl"
                            unoptimized={true}
                        />
                    </div>
                    <p className="text-base sm:text-lg text-white">
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
                            <img src="/challengers-pass.png" alt="챌린저스 패스 UI" className="w-full rounded-lg mb-6 border border-slate-700 shadow-md" />
                            <p className="text-sm sm:text-base text-white mb-4 leading-relaxed">
                                카산드라가 준비한 챌린저스 월드 전용 물품! 챌린저스 월드를 여행하며 챌린저스 패스 레벨을 올리고 특별한 선물도 받아 가세요!
                            </p>
                            <ul className="space-y-3 text-sm sm:text-base text-white">
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
                        <table className="w-full min-w-[500px] text-sm sm:text-base text-left text-white">
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
                    <p className="text-sm text-white mt-3">
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
                            <h3 className="text-lg font-bold text-white mb-2">무료 패스</h3>
                            <div className="text-2xl font-black text-white mb-4">무료</div>
                            <p className="text-sm text-white flex-1">기본 지원 물품 획득 가능</p>
                        </div>
                        
                        {/* EXP 패스 */}
                        <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/50 rounded-xl p-5 flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">추천</div>
                            <h3 className="text-lg font-bold text-blue-300 mb-2">챌린저스 EXP 패스</h3>
                            <div className="text-2xl font-black text-white mb-2">19,800 <span className="text-sm font-normal text-white">넥슨캐시</span></div>
                            <ul className="text-sm text-white space-y-2 flex-1 mt-2">
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
                            <div className="text-2xl font-black text-white mb-2">19,800 <span className="text-sm font-normal text-white">넥슨캐시</span></div>
                            <p className="text-xs text-red-400 mb-3 font-semibold">* EXP 패스 구매 후 구매 가능</p>
                            <ul className="text-sm text-white space-y-2 flex-1">
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
                        <span>🎟️</span> [메이플스토리] 챌린저스 패스 시즌4 1~30레벨 보상 총정리!
                    </h2>
                    <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden shadow-inner overflow-x-auto">
                        <img src="/challengers-pass-rewards.png" alt="챌린저스 패스 전체 보상 UI" className="w-full border-b border-slate-700" />
                        
                        {/* 1~30레벨 보상 총합 요약 */}
                        <div className="p-5 sm:p-8 border-b border-slate-700">
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-6">📊 패스별 보상 총합 요약 (1~30레벨 기준)</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* 기본 패스 총합 */}
                                <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-5">
                                    <h4 className="text-white font-bold mb-3 pb-2 border-b border-slate-600 flex items-center gap-2">
                                        <span>🎁</span> 기본 지원 물품
                                    </h4>
                                    <p className="text-xs text-white mb-4">과금 없이 패스 레벨만 끝까지 올려도 획득할 수 있는 기본 보상들의 총합입니다.</p>
                                    <ul className="space-y-2 text-sm text-white">
                                        <li className="flex justify-between gap-2"><span>상급 EXP 교환권</span><span className="font-bold text-white text-right">2,200개</span></li>
                                        <li className="flex justify-between gap-2"><span>코어 젬스톤</span><span className="font-bold text-white text-right">400개</span></li>
                                        <li className="flex justify-between gap-2"><span>선택 심볼 교환권</span><span className="font-bold text-white text-right">60개</span></li>
                                        <li className="flex justify-between gap-2"><span>솔 에르다 조각</span><span className="font-bold text-white text-right">45개</span></li>
                                        <li className="flex justify-between gap-2"><span>카르마 검은 환생의 불꽃</span><span className="font-bold text-white text-right">40개</span></li>
                                        <li className="flex justify-between gap-2"><span>VIP 부스터</span><span className="font-bold text-white text-right">30개</span></li>
                                        <li className="flex justify-between gap-2"><span>스페셜 명예의 훈장</span><span className="font-bold text-white text-right">30개</span></li>
                                        <li className="flex justify-between gap-2"><span>VIP 사우나 이용권</span><span className="font-bold text-white text-right">2개</span></li>
                                        <li className="flex justify-between gap-2"><span>블루베리 농장 입장권</span><span className="font-bold text-white text-right">1개</span></li>
                                    </ul>
                                </div>
                                
                                {/* EXP 패스 총합 */}
                                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-5">
                                    <h4 className="text-blue-300 font-bold mb-3 pb-2 border-b border-blue-500/30 flex items-center gap-2">
                                        <span>📈</span> EXP 지원 물품
                                    </h4>
                                    <p className="text-xs text-white mb-4">빠른 레벨업을 위해 집중적으로 구성된 EXP 패스(19,800 캐시)</p>
                                    <ul className="space-y-2 text-sm text-white">
                                        <li className="flex justify-between gap-2"><span>상급 EXP 교환권</span><span className="font-bold text-white text-right">6,000개</span></li>
                                        <li className="flex justify-between gap-2"><span>블루베리 농장 입장권</span><span className="font-bold text-white text-right">17개</span></li>
                                        <li className="flex justify-between gap-2"><span>VIP 사우나 이용권</span><span className="font-bold text-white text-right">12개</span></li>
                                        <li className="flex justify-between gap-2"><span>성장의 비약 (200~279)</span><span className="font-bold text-white text-right">1개</span></li>
                                    </ul>
                                </div>
                                
                                {/* 프리미엄 패스 총합 */}
                                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-5">
                                    <h4 className="text-yellow-400 font-bold mb-3 pb-2 border-b border-yellow-500/30 flex items-center gap-2">
                                        <span>👑</span> 프리미엄 지원 물품
                                    </h4>
                                    <p className="text-xs text-yellow-200/70 mb-4">스펙업 내실을 다지기 위한 프리미엄 패스(19,800 캐시)</p>
                                    <ul className="space-y-2 text-sm text-yellow-100">
                                        <li className="flex justify-between gap-2"><span>코어 젬스톤</span><span className="font-bold text-white text-right">2,000개</span></li>
                                        <li className="flex justify-between gap-2"><span>선택 심볼 교환권</span><span className="font-bold text-white text-right">600개</span></li>
                                        <li className="flex justify-between gap-2"><span>스페셜 명예의 훈장</span><span className="font-bold text-white text-right">400개</span></li>
                                        <li className="flex justify-between gap-2"><span>카르마 검은 환생의 불꽃</span><span className="font-bold text-white text-right">400개</span></li>
                                        <li className="flex justify-between gap-2"><span>솔 에르다/솔 에르다 조각 선택권</span><span className="font-bold text-white text-right">20개</span></li>
                                        <li className="flex justify-between gap-2"><span>카르마 블랙 큐브</span><span className="font-bold text-white text-right">20개</span></li>
                                        <li className="flex justify-between gap-2"><span>카르마 화이트 에디셔널 큐브</span><span className="font-bold text-white text-right">20개</span></li>
                                        <li className="flex justify-between gap-2"><span>경험치 4배 쿠폰 (30분)</span><span className="font-bold text-white text-right">12개</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <details className="group rounded-xl border border-slate-700 bg-slate-900 mt-6 mb-2 overflow-hidden shadow-md">
                            <summary className="p-5 sm:p-6 text-lg font-bold text-white cursor-pointer select-none flex items-center justify-between hover:bg-slate-800 transition-colors">
                                <span className="flex items-center gap-2">📋 상세 레벨별 보상 표</span>
                                <span className="transform group-open:rotate-180 transition-transform duration-300 text-slate-400">
                                    ▼
                                </span>
                            </summary>
                            <div className="overflow-x-auto border-t border-slate-700">
                                <table className="w-full text-sm sm:text-base text-left text-white min-w-[800px]">
                            <thead className="bg-slate-800 text-white font-bold">
                                <tr>
                                    <th className="px-4 py-3 border-b border-slate-700 whitespace-nowrap">패스 레벨</th>
                                    <th className="px-4 py-3 border-b border-slate-700 whitespace-nowrap text-white">🎁 지원 물품 (기본 패스)</th>
                                    <th className="px-4 py-3 border-b border-slate-700 whitespace-nowrap text-blue-300">📈 EXP 지원 물품 (EXP 패스)</th>
                                    <th className="px-4 py-3 border-b border-slate-700 whitespace-nowrap text-yellow-300">👑 프리미엄 지원 물품 (프리미엄 패스)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50 text-sm sm:text-base">
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">1</td>
                                    <td className="px-4 py-3">VIP 부스터 5개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">경험치 4배 쿠폰 (30분) 2개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">2</td>
                                    <td className="px-4 py-3">코어 젬스톤 200개</td>
                                    <td className="px-4 py-3">VIP 사우나 이용권 2개</td>
                                    <td className="px-4 py-3">코어 젬스톤 1,000개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">3</td>
                                    <td className="px-4 py-3">선택 심볼 교환권 10개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">선택 심볼 교환권 100개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">4</td>
                                    <td className="px-4 py-3">솔 에르다 조각 15개</td>
                                    <td className="px-4 py-3">상급 EXP 교환권 1,000개</td>
                                    <td className="px-4 py-3">스페셜 명예의 훈장 100개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">5</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">솔 에르다/솔 에르다 조각 선택권 3개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">6</td>
                                    <td className="px-4 py-3">VIP 부스터 5개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">경험치 4배 쿠폰 (30분) 2개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">7</td>
                                    <td className="px-4 py-3">코어 젬스톤 200개</td>
                                    <td className="px-4 py-3">VIP 사우나 이용권 2개</td>
                                    <td className="px-4 py-3">코어 젬스톤 1,000개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">8</td>
                                    <td className="px-4 py-3">선택 심볼 교환권 10개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">선택 심볼 교환권 100개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">9</td>
                                    <td className="px-4 py-3">스페셜 명예의 훈장 10개</td>
                                    <td className="px-4 py-3">상급 EXP 교환권 1,000개</td>
                                    <td className="px-4 py-3">스페셜 명예의 훈장 100개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">10</td>
                                    <td className="px-4 py-3">VIP 사우나 이용권 1개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">솔 에르다/솔 에르다 조각 선택권 3개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">11</td>
                                    <td className="px-4 py-3">VIP 부스터 5개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">경험치 4배 쿠폰 (30분) 2개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">12</td>
                                    <td className="px-4 py-3">스페셜 명예의 훈장 10개</td>
                                    <td className="px-4 py-3">VIP 사우나 이용권 2개</td>
                                    <td className="px-4 py-3">스페셜 명예의 훈장 100개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">13</td>
                                    <td className="px-4 py-3">선택 심볼 교환권 10개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">선택 심볼 교환권 100개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">14</td>
                                    <td className="px-4 py-3">카르마 검은 환생의 불꽃 10개</td>
                                    <td className="px-4 py-3">상급 EXP 교환권 1,000개</td>
                                    <td className="px-4 py-3">카르마 검은 환생의 불꽃 100개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">15</td>
                                    <td className="px-4 py-3">솔 에르다 조각 15개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">솔 에르다/솔 에르다 조각 선택권 3개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">16</td>
                                    <td className="px-4 py-3">VIP 부스터 5개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">경험치 4배 쿠폰 (30분) 2개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">17</td>
                                    <td className="px-4 py-3">스페셜 명예의 훈장 10개</td>
                                    <td className="px-4 py-3">VIP 사우나 이용권 2개</td>
                                    <td className="px-4 py-3">스페셜 명예의 훈장 100개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">18</td>
                                    <td className="px-4 py-3">선택 심볼 교환권 10개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">선택 심볼 교환권 100개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">19</td>
                                    <td className="px-4 py-3">카르마 검은 환생의 불꽃 10개</td>
                                    <td className="px-4 py-3">상급 EXP 교환권 1,000개</td>
                                    <td className="px-4 py-3">카르마 검은 환생의 불꽃 100개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">20</td>
                                    <td className="px-4 py-3">VIP 사우나 이용권 1개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">솔 에르다/솔 에르다 조각 선택권 3개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">21</td>
                                    <td className="px-4 py-3">VIP 부스터 5개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">경험치 4배 쿠폰 (30분) 2개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">22</td>
                                    <td className="px-4 py-3">상급 EXP 교환권 100개</td>
                                    <td className="px-4 py-3">VIP 사우나 이용권 2개</td>
                                    <td className="px-4 py-3">카르마 검은 환생의 불꽃 100개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">23</td>
                                    <td className="px-4 py-3">선택 심볼 교환권 10개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">선택 심볼 교환권 100개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">24</td>
                                    <td className="px-4 py-3">카르마 검은 환생의 불꽃 10개</td>
                                    <td className="px-4 py-3">상급 EXP 교환권 1,000개</td>
                                    <td className="px-4 py-3">카르마 블랙 큐브 20개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">25</td>
                                    <td className="px-4 py-3">솔 에르다 조각 15개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">솔 에르다/솔 에르다 조각 선택권 3개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">26</td>
                                    <td className="px-4 py-3">VIP 부스터 5개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">경험치 4배 쿠폰 (30분) 2개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">27</td>
                                    <td className="px-4 py-3">상급 EXP 교환권 100개</td>
                                    <td className="px-4 py-3">VIP 사우나 이용권 2개</td>
                                    <td className="px-4 py-3">카르마 검은 환생의 불꽃 100개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">28</td>
                                    <td className="px-4 py-3">선택 심볼 교환권 10개</td>
                                    <td className="px-4 py-3">블루베리 농장 입장권 1개</td>
                                    <td className="px-4 py-3">선택 심볼 교환권 100개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-3 font-bold text-center">29</td>
                                    <td className="px-4 py-3">카르마 검은 환생의 불꽃 10개</td>
                                    <td className="px-4 py-3">상급 EXP 교환권 1,000개</td>
                                    <td className="px-4 py-3">카르마 화이트 에디셔널 큐브 20개</td>
                                </tr>
                                <tr className="hover:bg-slate-800/30 transition-colors bg-yellow-900/20">
                                    <td className="px-4 py-3 font-bold text-center text-yellow-400">30 🏆</td>
                                    <td className="px-4 py-3 font-bold">상급 EXP 교환권 2,000개</td>
                                    <td className="px-4 py-3 font-bold">성장의 비약 (200~279) 1개</td>
                                    <td className="px-4 py-3 font-bold text-yellow-300">솔 에르다/솔 에르다 조각 선택권 5개</td>
                                </tr>
                            </tbody>
                                </table>
                            </div>
                        </details>
                    </div>
                </section>

                {/* ===== 미호의 블루베리 농장 ===== */}
                <section className="mb-10">
                    <div className="bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-blue-900/40 border-2 border-indigo-500/30 rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-4xl">🍇</div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-indigo-200 font-bold">
                                미호의 블루베리 농장
                            </h2>
                        </div>
                        <p className="text-white mb-6 font-semibold">
                            미호의 블루베리 농사를 도와주고 대량의 경험치를 획득하세요!
                        </p>

                        <img src="/blueberry-farm.png" alt="미호의 블루베리 농장" className="w-full rounded-xl mb-6 border border-indigo-500/30 shadow-lg" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-5 shadow-inner">
                                <h3 className="text-lg font-bold text-white mb-3 border-b border-slate-700 pb-2">기본 정보</h3>
                                <ul className="space-y-2 text-sm text-white">
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
                                <ul className="space-y-2 text-sm text-white">
                                    <li className="flex items-start gap-2">
                                        <span className="text-indigo-400 mt-0.5">▪</span>
                                        <span>제한 시간 30분 동안 블루베리 처치하여 경험치 획득</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-indigo-400 mt-0.5">▪</span>
                                        <span className="text-yellow-300 font-semibold">입장권 사용 후 24시간 내 자유롭게 재입장 가능 (수확률 100% 전)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 레벨별 경험치 표 */}
                        <details className="mt-8 bg-slate-900/60 border border-slate-700/50 rounded-xl shadow-inner group mb-8">
                            <summary className="p-5 cursor-pointer text-lg font-bold text-white flex items-center justify-between outline-none hover:bg-slate-800/30 transition-colors">
                                <div className="flex items-center gap-2">
                                    <span>📈</span> 블루베리 농장 레벨별 경험치 획득량 표 보기 (1회 기준)
                                </div>
                                <div className="text-slate-400 group-open:rotate-180 transition-transform">▼</div>
                            </summary>
                            <div className="p-5 pt-0 border-t border-slate-700/50 mt-2">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                                    {/* 260~269 */}
                                    <div>
                                        <table className="w-full text-xs sm:text-sm text-center text-white border border-slate-700">
                                            <thead className="bg-slate-800 text-white">
                                                <tr><th className="py-2 border-b border-r border-slate-700">Lv</th><th className="py-2 border-b border-slate-700">EXP</th></tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-700/50">
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">260</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">47.3428%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">261</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">47.5485%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">262</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">47.7467%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">263</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">47.9409%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">264</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">48.2099%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">265</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">41.7204%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">266</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">41.8745%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">267</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">42.0237%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">268</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">42.2380%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">269</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">42.3788%</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* 270~279 */}
                                    <div>
                                        <table className="w-full text-xs sm:text-sm text-center text-white border border-slate-700">
                                            <thead className="bg-slate-800 text-white">
                                                <tr><th className="py-2 border-b border-r border-slate-700">Lv</th><th className="py-2 border-b border-slate-700">EXP</th></tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-700/50">
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">270</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">32.2025%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">271</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">32.3547%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">272</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">32.4513%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">273</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">32.5456%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">274</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">32.6885%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">275</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">18.1881%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">276</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">16.7430%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">277</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">15.4353%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">278</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">14.2061%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">279</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">13.0932%</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* 280~289 */}
                                    <div>
                                        <table className="w-full text-xs sm:text-sm text-center text-white border border-slate-700">
                                            <thead className="bg-slate-800 text-white">
                                                <tr><th className="py-2 border-b border-r border-slate-700">Lv</th><th className="py-2 border-b border-slate-700">EXP</th></tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-700/50">
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">280</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">6.4818%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">281</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">5.8925%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">282</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">5.3568%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">283</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">4.8699%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">284</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">4.4271%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">285</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">2.1917%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">286</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">1.9924%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">287</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">1.8113%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">288</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">1.6466%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">289</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">1.4969%</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* 290~299 */}
                                    <div>
                                        <table className="w-full text-xs sm:text-sm text-center text-white border border-slate-700">
                                            <thead className="bg-slate-800 text-white">
                                                <tr><th className="py-2 border-b border-r border-slate-700">Lv</th><th className="py-2 border-b border-slate-700">EXP</th></tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-700/50">
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">290</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">0.7411%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">291</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">0.6737%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">292</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">0.6124%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">293</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">0.5568%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">294</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">0.5062%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">295</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">0.2506%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">296</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">0.2278%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">297</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">0.2071%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">298</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">0.1883%</td></tr>
                                                <tr className="hover:bg-slate-800/30 transition-colors"><td className="py-1.5 border-r border-slate-700 font-bold text-white">299</td><td className="py-1.5 font-semibold text-indigo-200 font-bold">0.1255%</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </details>

                        {/* 계산기 삽입 위치 */}
                        <BlueberryCalculator />

                        {/* 상급 EXP 환산 분석 */}
                        <div className="mt-12 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 border-2 border-blue-500/30 rounded-2xl p-5 sm:p-8 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="text-3xl">🧮</div>
                                <h3 className="text-xl sm:text-2xl font-black text-white">EXP 패스 상급 EXP 효율 집중 분석</h3>
                            </div>
                            <p className="text-white mb-6 leading-relaxed">
                                기존 <strong>[오버드라이브 경험치 BM 효율 분석]</strong> 글의 환산 기준을 적용하여, EXP 패스(19,800 캐시)의 구성품을 레벨 구간별로 상급 EXP 교환권으로 변환해 보았습니다.
                            </p>

                            <div className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-4 mb-8 text-sm text-white space-y-3">
                                <h4 className="font-bold text-yellow-400">💰 재화 환산 기준 (가정)</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li><strong>1억 메소</strong> = 1,500 캐시</li>
                                    <li><strong>1억 메소</strong> = 2,000 메이플포인트</li>
                                </ul>
                                <p className="text-white bg-slate-900/50 p-2 rounded text-xs sm:text-sm">
                                    <strong className="text-yellow-400">💡 참고:</strong> 이에 따라 1 메이플포인트는 약 0.75 캐시의 가치로 환산되어 계산됩니다.
                                </p>
                                <p className="text-white mt-2 border-t border-slate-700/50 pt-3">
                                    <strong className="text-cyan-400">📌 효율 수치란?</strong> 1만 캐시당 획득할 수 있는 경험치를 <strong>상급 EXP 개수</strong>로 환산한 수치입니다. 숫자가 높을수록 가성비가 좋습니다!
                                </p>
                            </div>
                            <h4 className="text-lg font-bold text-blue-300 mt-6 mb-3 border-b border-blue-500/30 pb-2">
                                📊 레벨 구간별 EXP 패스 효율표 (상급 EXP 환산 기준)
                            </h4>
                            <div className="overflow-x-auto -mx-5 sm:mx-0 mb-6">
                                <table className="w-full min-w-[600px] text-xs sm:text-sm text-center text-white border-collapse">
                                    <thead>
                                        <tr className="bg-blue-900/40 border-b-2 border-blue-500/50 whitespace-nowrap">
                                            <th className="px-2 py-3 text-left font-bold text-blue-300">구성품</th>
                                            <th className="px-2 py-3 font-bold text-blue-300">개수</th>
                                            <th className="px-2 py-3 font-bold text-blue-300">260~264</th>
                                            <th className="px-2 py-3 font-bold text-blue-300">265~269</th>
                                            <th className="px-2 py-3 font-bold text-blue-300">270~274</th>
                                            <th className="px-2 py-3 font-bold text-blue-300">275~279</th>
                                            <th className="px-2 py-3 font-bold text-yellow-300">280 이상</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50">
                                        <tr className="hover:bg-slate-800/40">
                                            <td className="px-2 py-3 text-left font-semibold whitespace-nowrap">상급 EXP 교환권</td>
                                            <td className="px-2 py-3">6,000개</td>
                                            <td className="px-2 py-3 font-mono">6,000</td>
                                            <td className="px-2 py-3 font-mono">6,000</td>
                                            <td className="px-2 py-3 font-mono">6,000</td>
                                            <td className="px-2 py-3 font-mono">6,000</td>
                                            <td className="px-2 py-3 font-mono font-bold text-yellow-100">6,000</td>
                                        </tr>
                                        <tr className="hover:bg-slate-800/40">
                                            <td className="px-2 py-3 text-left font-semibold whitespace-nowrap">블루베리 입장권</td>
                                            <td className="px-2 py-3">17장</td>
                                            <td className="px-2 py-3 font-mono text-cyan-200">35,930</td>
                                            <td className="px-2 py-3 font-mono text-cyan-200">35,884</td>
                                            <td className="px-2 py-3 font-mono text-cyan-200">53,876</td>
                                            <td className="px-2 py-3 font-mono text-cyan-200">53,890</td>
                                            <td className="px-2 py-3 font-mono font-bold text-yellow-300">54,289</td>
                                        </tr>
                                        <tr className="hover:bg-slate-800/40">
                                            <td className="px-2 py-3 text-left font-semibold whitespace-nowrap">VIP 사우나</td>
                                            <td className="px-2 py-3">12장</td>
                                            <td className="px-2 py-3 font-mono">2,460</td>
                                            <td className="px-2 py-3 font-mono">2,460</td>
                                            <td className="px-2 py-3 font-mono">2,460</td>
                                            <td className="px-2 py-3 font-mono">2,460</td>
                                            <td className="px-2 py-3 font-mono font-bold text-yellow-100">2,460</td>
                                        </tr>
                                        <tr className="hover:bg-slate-800/40">
                                            <td className="px-2 py-3 text-left font-semibold whitespace-nowrap">성장의 비약(~279)</td>
                                            <td className="px-2 py-3">1개</td>
                                            <td className="px-2 py-3 font-mono">24,390</td>
                                            <td className="px-2 py-3 font-mono">24,390</td>
                                            <td className="px-2 py-3 font-mono">24,390</td>
                                            <td className="px-2 py-3 font-mono">24,390</td>
                                            <td className="px-2 py-3 font-mono font-bold text-yellow-100">24,390</td>
                                        </tr>
                                        <tr className="bg-blue-900/30 border-t-2 border-blue-500">
                                            <td className="px-2 py-4 font-black text-white text-left whitespace-nowrap" colSpan={2}>총 가치 (상급 EXP)</td>
                                            <td className="px-2 py-4 font-black font-mono text-cyan-200">68,780</td>
                                            <td className="px-2 py-4 font-black font-mono text-cyan-200">68,734</td>
                                            <td className="px-2 py-4 font-black font-mono text-cyan-200">86,726</td>
                                            <td className="px-2 py-4 font-black font-mono text-cyan-200">86,740</td>
                                            <td className="px-2 py-4 font-black font-mono text-yellow-400">87,139</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-4 mb-8 text-sm text-white space-y-2">
                                <p><strong className="text-yellow-400">💡 왜 280레벨 이상부터 효율이 고정되나요?</strong></p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>블루베리 농장은 <strong>279레벨까지만 획득 경험치가 상승</strong>하며 280부터는 279레벨 기준 경험치로 고정됩니다.</li>
                                    <li>성장의 비약(200~279) 또한 280 이상 구간에서는 '279→280' 달성에 필요한 절대 경험치량이 고정 지급됩니다.</li>
                                    <li>환산 기준인 <strong>상급 EXP 교환권은 레벨과 무관하게 항상 동일한 절대 경험치</strong>를 제공합니다.</li>
                                    <li className="text-cyan-200 mt-2 font-semibold">※ 계산 기준: 블루베리 1회 상급 EXP 가치 = 블루베리 경험치% ÷ 상급 EXP 1개% (같은 레벨 기준). 279레벨: 13.0932% ÷ 0.0041% = 3,193개. 성장의 비약: 100% ÷ 0.0041% = 24,390개. 280부터 두 값 모두 고정되어 최종 효율(44,010/만캐시)은 변하지 않습니다.</li>
                                </ul>
                            </div>
                            
                            <h4 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                                <span className="text-orange-400">🔥</span> 최종 가성비 총정리 (1만 캐시 당 상급 EXP)
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                                <div className="bg-slate-900/80 border border-slate-600/50 rounded-xl p-4 text-center">
                                    <h4 className="text-sm font-bold text-white mb-2">260~264</h4>
                                    <div className="text-xl font-black text-white">34,737</div>
                                </div>
                                <div className="bg-slate-900/80 border border-slate-500/50 rounded-xl p-4 text-center">
                                    <h4 className="text-sm font-bold text-white mb-2">265~269</h4>
                                    <div className="text-xl font-black text-white">34,714</div>
                                </div>
                                <div className="bg-slate-900/80 border border-slate-400/50 rounded-xl p-4 text-center">
                                    <h4 className="text-sm font-bold text-white mb-2">270~274</h4>
                                    <div className="text-xl font-black text-white">43,800</div>
                                </div>
                                <div className="bg-slate-900/80 border border-slate-300/50 rounded-xl p-4 text-center">
                                    <h4 className="text-sm font-bold text-white mb-2">275~279</h4>
                                    <div className="text-xl font-black text-white">43,808</div>
                                </div>
                                <div className="bg-slate-900/80 border border-yellow-500/50 rounded-xl p-4 text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">MAX 효율</div>
                                    <h4 className="text-sm font-bold text-yellow-400 mb-2">280 이상 전 구간</h4>
                                    <div className="text-2xl font-black text-yellow-100">44,010</div>
                                </div>
                            </div>
                            
                            <p className="text-sm sm:text-base text-white mt-4 bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                                260~274 구간에서도 <strong>3.4~4.4만</strong>의 효율로 기존 모멘텀 패스(약 14,000)를 압도하며, 280레벨 이상부터는 <strong>약 4.4만(3배 이상)</strong>의 안정적인 효율을 유지합니다. 부캐릭터 육성이나 본캐 경험치 수급을 원한다면 <strong>필수로 구매해야 하는 역대급 혜자 패스</strong>입니다!
                            </p>
                        </div>

                    </div>
                </section>

                {/* ===== SECTION 4: 상급 EXP 최종 환산 효율표 ===== */}
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
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong className="text-white">1억 메소</strong> = 1,500 캐시</li>
                                <li><strong className="text-white">1억 메소</strong> = 2,000 메이플포인트</li>
                            </ul>
                            <p className="text-white bg-slate-950/50 p-2 rounded text-xs">
                                <strong className="text-yellow-400">💡 참고:</strong> 이에 따라 1 메이플포인트는 약 0.75 캐시의 가치로 환산되어 계산됩니다.
                            </p>
                            <p className="text-white border-t border-slate-700/50 pt-2">
                                <strong className="text-cyan-400">📌 효율 수치란?</strong> 1만 캐시당 획득할 수 있는 경험치를 <strong>상급 EXP 개수</strong>로 환산한 수치입니다. 숫자가 높을수록 가성비가 좋습니다!
                            </p>
                        </div>

                        {/* 정렬 탭 & 실시간 경매장 가격 입력 */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                            <div className="flex gap-2">
                                {(['280', '285', '290'] as const).map(lv => (
                                    <button
                                        key={`table-${lv}`}
                                        onClick={() => setTableSortLevel(lv)}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${tableSortLevel === lv ? 'bg-yellow-500 text-slate-900 shadow-lg scale-105' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                                    >
                                        {lv === '290' ? 'Lv.290+' : `Lv.${lv}~${parseInt(lv) + 4}`}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-600 rounded-lg p-2 shadow-inner">
                                <span className="text-sm font-bold text-white">
                                    <ShoppingCart className="w-4 h-4 inline mr-1 text-white" />
                                    아스트랄(경매장) 가격 :
                                </span>
                                <div className="flex items-center gap-1">
                                    <input 
                                        type="number" 
                                        value={tableAuctionPrice || ''}
                                        onChange={(e) => setTableAuctionPrice(Number(e.target.value))}
                                        step="0.1"
                                        min="0"
                                        className="w-20 sm:w-24 bg-slate-950 border border-slate-600 rounded px-2 py-1 text-yellow-400 font-mono font-bold text-right outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-colors"
                                    />
                                    <span className="text-sm text-white font-bold whitespace-nowrap">억 메소</span>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-slate-700/50 shadow-inner">
                            <table className="w-full min-w-[700px] text-xs sm:text-sm">
                                <thead>
                                    <tr className="bg-slate-800 border-b border-slate-600">
                                        <th className="px-3 py-3 text-center text-white font-bold whitespace-nowrap">순위</th>
                                        <th className="px-3 py-3 text-left text-white font-bold whitespace-nowrap">콘텐츠명</th>
                                        <th className="px-3 py-3 text-left text-white font-bold whitespace-nowrap">상세</th>
                                        <th className="px-3 py-3 text-left text-white font-bold whitespace-nowrap">가격</th>
                                        <th className={`px-3 py-3 text-center font-bold whitespace-nowrap ${tableSortLevel === '280' ? 'text-yellow-400 bg-slate-700/50' : 'text-white'}`}>280~284</th>
                                        <th className={`px-3 py-3 text-center font-bold whitespace-nowrap ${tableSortLevel === '285' ? 'text-yellow-400 bg-slate-700/50' : 'text-white'}`}>285~289</th>
                                        <th className={`px-3 py-3 text-center font-bold whitespace-nowrap ${tableSortLevel === '290' ? 'text-yellow-400 bg-slate-700/50' : 'text-white'}`}>290+</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/30">
                                    {sortedTableData.map((row, idx) => (
                                        <tr key={idx} className={`${row.isNew ? 'bg-purple-900/20' : 'bg-slate-900/50'} hover:bg-slate-700/30 transition-colors`}>
                                            <td className="px-3 py-3 text-center">
                                                {idx === 0 ? <span className="w-6 h-6 inline-flex items-center justify-center bg-yellow-500 text-slate-900 rounded-full font-bold text-xs shadow-md">1</span> : 
                                                 idx === 1 ? <span className="w-6 h-6 inline-flex items-center justify-center bg-slate-300 text-slate-900 rounded-full font-bold text-xs shadow-md">2</span> : 
                                                 idx === 2 ? <span className="w-6 h-6 inline-flex items-center justify-center bg-amber-600 text-white rounded-full font-bold text-xs shadow-md">3</span> : 
                                                 <span className="text-white font-mono">{idx + 1}</span>}
                                            </td>
                                            <td className={`px-3 py-3 font-bold whitespace-nowrap flex items-center gap-2 ${row.name === '챌린저스 시즌4 EXP 패스' ? 'text-yellow-400' : 'text-white'}`}>
                                                {row.name}
                                                {row.isNew && <span className="px-1.5 py-0.5 bg-purple-500 text-white text-[10px] rounded animate-pulse">NEW</span>}
                                            </td>
                                            <td className="px-3 py-3 text-white whitespace-nowrap">{row.detail}</td>
                                            <td className="px-3 py-3 text-white whitespace-nowrap">{row.price}</td>
                                            <td className={`px-3 py-3 text-center font-mono ${tableSortLevel === '280' ? 'text-yellow-300 font-bold bg-slate-800/30' : 'text-white'}`}>
                                                {row.e280.toLocaleString()}
                                            </td>
                                            <td className={`px-3 py-3 text-center font-mono ${tableSortLevel === '285' ? 'text-yellow-300 font-bold bg-slate-800/30' : 'text-white'}`}>
                                                {row.e285.toLocaleString()}
                                            </td>
                                            <td className={`px-3 py-3 text-center font-mono ${tableSortLevel === '290' ? 'text-yellow-300 font-bold bg-slate-800/30' : 'text-white'}`}>
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

                {/* 해시태그 섹션 (SEO & 검색 최적화) */}
                <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap gap-2 sm:gap-3 justify-center">
                    {['#메이플스토리', '#챌린저스패스', '#챌린저스패스효율', '#미호의블루베리농장', '#블루베리농장효율', '#상급EXP교환권', '#버닝비욘드', '#메이플이벤트', '#메이플경험치', '#메이플스펙업', '#오버드라이브'].map((tag) => (
                        <span key={tag} className="px-3 py-1.5 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 hover:shadow-lg hover:border-slate-500 transition-all rounded-full text-sm font-semibold cursor-pointer border border-slate-700 shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </article>
        </div>
    );
}

