'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Zap, CheckCircle, AlertCircle, Clock, ShoppingCart, TrendingUp, Crown, Sparkles, Calculator, Target, DollarSign } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function NewBmExpEfficiency2026() {
    const [astraSortLevel, setAstraSortLevel] = useState<'280' | '285' | '290'>('290');

    // 기본 데이터 (1.7만~1.8만 마리 사냥 기준 상향 조정)
    const BASE_HUNTING = {
        '280': { perHour: 4826, base100: 1609, area: '아르테리아', advExp: 7.93 },
        '285': { perHour: 6576, base100: 2192, area: '카르시온', advExp: 9.37 },
        '290': { perHour: 8909, base100: 2970, area: '탈라하트', advExp: 10.78 },
    };

    // 진 부스터 패키지 데이터
    const JIN_BOOSTER = {
        '280': { mecaberry: 8448, advExp: 2000, sauna: 820, total: 11268 },
        '285': { mecaberry: 11264, advExp: 2000, sauna: 820, total: 14084 },
        '290': { mecaberry: 12202, advExp: 2000, sauna: 820, total: 15022 },
    };

    // 아스트랄 세레나데 경매장 가격
    const AUCTION_TOTAL_MESO = 28.3; // 억 메소
    const AUCTION_CASH_EQUIV = Math.round(AUCTION_TOTAL_MESO * 1500); // 캐시 환산

    // 사냥 시간별 아스트랄 EXP 계산 함수
    const calcAstraExp = (level: '280' | '285' | '290', hoursPerDay: number): number => {
        const base = BASE_HUNTING[level].base100;
        const advExpVal = BASE_HUNTING[level].advExp;
        const totalExp = base * hoursPerDay * 100; // 100일
        return Math.round(totalExp / advExpVal);
    };

    // 모멘텀 패스 기준 (1개 = 70,013 상급 EXP)
    const MOMENTUM_PASS_EXP = 70013;

    // 시간 계산: 모멘텀 패스 절대량 달성에 필요한 사냥 시간/일
    const calcHoursNeeded = (level: '280' | '285' | '290', targetExp: number): string => {
        const base = BASE_HUNTING[level].base100;
        const advExpVal = BASE_HUNTING[level].advExp;
        const hours = (targetExp * advExpVal) / (base * 100);
        let h = Math.floor(hours);
        let m = Math.round((hours - h) * 60);
        if (m === 60) {
            h += 1;
            m = 0;
        }
        if (m === 0) return `${h}시간`;
        return `${h}시간 ${m}분`;
    };

    // 효율 달성 기준 (모멘텀 패스 효율 = 14,003 상급 EXP/만캐시)
    const MOMENTUM_EFF = 14003;

    const calcEffBreakeven = (level: '280' | '285' | '290', cashEquiv: number): string => {
        const neededExp = Math.round(MOMENTUM_EFF * (cashEquiv / 10000));
        return calcHoursNeeded(level, neededExp);
    };

    const huntingOptions = [0.5, 1, 2, 3, 4];

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
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">경험치 가이드</span>
                        <span className="text-slate-300 text-sm">2026년 3월 23일</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight">
                        💎 메이플 신규 BM : 진 패키지<br/>
                        경험치 효율 완벽 분석
                    </h1>
                    <p className="text-base sm:text-lg text-slate-200">
                        진 부스터 패키지 · 아스트랄 세레나데 패키지 · 경매장 시세까지! 새로 나온 BM의 경험치 효율을 상급 EXP 기준으로 완벽 비교합니다.
                    </p>
                    <div className="bg-blue-900/30 border border-blue-500/40 rounded-lg p-4 mt-4">
                        <p className="text-sm text-white">
                            💡 <strong className="text-blue-400">이 글은</strong>{' '}
                            <Link href="/blog/exp-product-efficiency" className="text-purple-400 underline hover:text-purple-300">
                                메이플 경험치 상품 효율 완벽 분석
                            </Link>
                            의 후속편입니다. 기존 기준(상급 EXP 환산, 1억 메소 = 1,500캐시)을 동일하게 적용합니다.
                        </p>
                    </div>
                </header>

                {/* ===== 재화 환산 기준 ===== */}
                <section className="mb-10">
                    <div className="bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-green-900/30 border-2 border-blue-500/50 rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-blue-400" />
                            </div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-blue-400">
                                💰 재화 환산 기준 (가정)
                            </h2>
                        </div>

                        <div className="bg-slate-900/70 rounded-xl p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <p className="text-white"><strong className="text-yellow-400">1억 메소</strong> = <strong className="text-green-400">1,500 캐시</strong></p>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <p className="text-white"><strong className="text-yellow-400">1억 메소</strong> = <strong className="text-purple-400">2,000 메이플포인트</strong></p>
                            </div>
                            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 mt-2">
                                <p className="text-sm text-slate-200">
                                    💡 <strong className="text-blue-400">참고:</strong> 이에 따라 <strong className="text-purple-400">1 메이플포인트</strong>는 약 <strong className="text-green-400">0.75 캐시</strong>의 가치로 환산되어 계산
                                </p>
                            </div>
                            <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-4">
                                <p className="text-sm text-white">
                                    📌 <strong className="text-orange-400">효율 수치란?</strong> 1만 캐시당 획득할 수 있는 경험치를 <strong className="text-yellow-400">상급 EXP 개수</strong>로 환산한 수치입니다. 숫자가 높을수록 가성비가 좋습니다!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== SECTION 1: 진 부스터 패키지 ===== */}
                <section className="mb-14">
                    <div className="bg-gradient-to-br from-indigo-900/30 via-blue-900/20 to-cyan-900/30 border-2 border-indigo-500/50 rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                                <Zap className="w-6 h-6 text-indigo-400" />
                            </div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-indigo-400">
                                1. 진 부스터 패키지 (1만 캐시)
                            </h2>
                        </div>
                        
                        <div className="mb-6 flex justify-center">
                            <Image 
                                src="/images/jin-booster-package.png" 
                                width={550} 
                                height={280} 
                                alt="진 부스터 패키지 아이템 구성" 
                                className="rounded-xl border border-indigo-500/30 object-contain shadow-lg w-full max-w-lg"
                                unoptimized={true}
                            />
                        </div>

                        {/* 구성품 */}
                        <div className="bg-slate-900/60 rounded-xl p-5 mb-6">
                            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                                패키지 구성
                            </h3>
                            <ul className="space-y-2 text-sm text-white">
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />솔 에르다 1개 (헥사 매트릭스 재료 — 경험치 외 가치)</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />VIP 사우나 이용권 4장 (= 사우나 2시간 — 상급 EXP 820개 상당)</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />선택 심볼 교환권 100개 (심볼 성장 가치)</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" /><strong className="text-yellow-400">상급 EXP 교환권 2,000개 — 2,000 상급 EXP 직접 지급</strong></li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" /><strong className="text-yellow-400">메카베리 농장 입장권 2장 — 레벨에 따라 가치 변동</strong></li>
                            </ul>
                            <div className="bg-indigo-900/30 border border-indigo-500/40 rounded-lg p-3 mt-4">
                                <p className="text-xs text-slate-200 leading-relaxed">
                                    ※ 메카베리 농장 이용권은 <strong className="text-yellow-400">Lv.285 이상</strong>이 되었을 때 사용 권장 (280 구간 효율 하위권)<br/>
                                    → 하지만 <strong className="text-cyan-400">링크 3렙작 (Lv.285)</strong>을 막바지로 빨리 찍기 위해 쓰는 것은 좋은 선택!
                                </p>
                            </div>
                        </div>

                        {/* 상급 EXP 분해 */}
                        <div className="mb-6">
                            <h3 className="font-bold text-white mb-4">📊 레벨별 상급 EXP 환산 (아이템별 분해)</h3>
                            <div className="overflow-x-auto -mx-4 sm:mx-0">
                                <table className="min-w-full text-xs sm:text-sm">
                                    <thead>
                                        <tr className="bg-slate-800/50 border-b-2 border-indigo-500/30">
                                            <th className="px-3 py-3 text-left text-indigo-400 font-bold">아이템</th>
                                            <th className="px-3 py-3 text-center text-indigo-400 font-bold">280~284</th>
                                            <th className="px-3 py-3 text-center text-indigo-400 font-bold">285~289</th>
                                            <th className="px-3 py-3 text-center text-indigo-400 font-bold">290+</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50">
                                        <tr className="bg-slate-800/20">
                                            <td className="px-3 py-2 text-white">상급 EXP 교환권 2,000개</td>
                                            <td className="px-3 py-2 text-center text-white font-mono">2,000</td>
                                            <td className="px-3 py-2 text-center text-white font-mono">2,000</td>
                                            <td className="px-3 py-2 text-center text-white font-mono">2,000</td>
                                        </tr>
                                        <tr className="bg-slate-800/20">
                                            <td className="px-3 py-2 text-white">메카베리 입장권 2장</td>
                                            <td className="px-3 py-2 text-center text-yellow-300 font-mono">8,448</td>
                                            <td className="px-3 py-2 text-center text-green-300 font-mono">11,264</td>
                                            <td className="px-3 py-2 text-center text-green-400 font-mono font-bold">12,202</td>
                                        </tr>
                                        <tr className="bg-slate-800/20">
                                            <td className="px-3 py-2 text-white">VIP 사우나 4장 (2시간)</td>
                                            <td className="px-3 py-2 text-center text-white font-mono">820</td>
                                            <td className="px-3 py-2 text-center text-white font-mono">820</td>
                                            <td className="px-3 py-2 text-center text-white font-mono">820</td>
                                        </tr>
                                        <tr className="bg-gradient-to-r from-indigo-900/40 to-blue-900/40 border-t-2 border-indigo-400">
                                            <td className="px-3 py-3 font-black text-white">합계 (EXP 아이템)</td>
                                            <td className="px-3 py-3 text-center text-yellow-400 font-black text-base font-mono">11,268</td>
                                            <td className="px-3 py-3 text-center text-green-400 font-black text-base font-mono">14,084</td>
                                            <td className="px-3 py-3 text-center text-cyan-400 font-black text-base font-mono">15,022</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 기존 순위표 비교 */}
                        <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-2 border-yellow-400 rounded-xl p-5">
                            <h3 className="font-bold text-yellow-400 mb-4 flex items-center gap-2">
                                <Crown className="w-5 h-5" />
                                기존 효율표 대비 순위
                            </h3>
                            {/* 효율 기준 설명 */}
                            <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-3 mb-4">
                                <p className="text-xs text-white leading-relaxed">
                                    💡 <strong className="text-orange-400">우측 숫자(효율)</strong>는 각 경험치 BM들을 1만 캐시당 얻는 상급 EXP 개수로 환산해서 계산한 것입니다.<br />
                                    역대급 고효율 경험치 BM이라고 했던 <strong className="text-purple-400">모멘텀 패스</strong> 기준으로<br />
                                    <strong className="text-cyan-400">Lv.290 이상</strong>, <strong className="text-green-400">Lv.285~289</strong>, <strong className="text-yellow-400">Lv.280~284</strong> 구간의 효율을 한눈에 비교해 볼 수 있습니다.
                                </p>
                            </div>
                            <div className="space-y-2 text-sm text-white">
                                <div className="flex items-center gap-3">
                                    <span className="w-7 h-7 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 font-bold text-xs flex-shrink-0">1</span>
                                    <span>몬스터파크 썬데이메이플 — <strong className="text-yellow-400">21,547</strong></span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-7 h-7 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 font-bold text-xs flex-shrink-0">2</span>
                                    <span>챌린저스 EXP 듀오 64.5만마리 사냥 — <strong className="text-cyan-400">16,000</strong></span>
                                </div>
                                <div className="flex items-center gap-3 bg-cyan-900/30 border border-cyan-400 rounded-lg px-3 py-2">
                                    <span className="w-7 h-7 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">★</span>
                                    <span><strong className="text-cyan-300">진 부스터 패키지 (290+)</strong> — <strong className="text-white">15,022</strong> 🆕</span>
                                </div>
                                <div className="flex items-center gap-3 bg-green-900/20 border border-green-500/50 rounded-lg px-3 py-2">
                                    <span className="w-7 h-7 bg-green-500/50 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">★</span>
                                    <span><strong className="text-green-300">진 부스터 패키지 (285~289)</strong> — <strong className="text-white">14,084</strong> 🆕</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-7 h-7 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-xs flex-shrink-0">↓</span>
                                    <span><strong className="text-white">모멘텀 패스 (290+)</strong> — <strong className="text-white">14,003</strong></span>
                                </div>
                                <div className="flex items-center gap-3 bg-yellow-900/20 border border-yellow-600/50 rounded-lg px-3 py-2">
                                    <span className="w-7 h-7 bg-yellow-500/50 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">★</span>
                                    <span><strong className="text-yellow-300">진 부스터 패키지 (280~284)</strong> — <strong className="text-white">11,268</strong> 🆕</span>
                                </div>
                            </div>
                        </div>

                        {/* 사냥 등가 시간 */}
                        <div className="bg-slate-900/60 rounded-xl p-5 mt-6">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-400" />
                                400% 도핑 기준 사냥 등가 시간
                            </h3>
                            <p className="text-xs text-slate-200 mb-4 mt-1">※ 시간당 약 <strong className="text-white">1.7만~1.8만 마리 사냥(원젠컷 이상)</strong>을 기준으로 산정했습니다.</p>
                            <div className="grid grid-cols-3 gap-3 text-center text-sm">
                                {(['280', '285', '290'] as const).map(lv => {
                                    const totalAdv = JIN_BOOSTER[lv].total;
                                    const huntData = BASE_HUNTING[lv];
                                    const expPerHour400 = huntData.perHour * (4 / 3);
                                    const totalExp = totalAdv * huntData.advExp;
                                    const hours = totalExp / expPerHour400;
                                    let h = Math.floor(hours);
                                    let m = Math.round((hours - h) * 60);
                                    if (m === 60) {
                                        h += 1;
                                        m = 0;
                                    }
                                    return (
                                        <div key={lv} className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                                            <p className="text-blue-400 font-bold text-xs mb-1">{lv === '290' ? '290+' : `${lv}~${parseInt(lv) + 4}`}</p>
                                            <p className="text-white font-black text-lg">{`${h}시간 ${m}분`}</p>
                                            <p className="text-slate-200 text-xs mt-1">{huntData.area}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 결론 */}
                        <div className="bg-gradient-to-r from-indigo-900/50 to-cyan-900/50 border-2 border-cyan-400 rounded-xl p-5 mt-5">
                            <h3 className="font-bold text-cyan-400 mb-3 flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                ✅ 결론
                            </h3>
                            <div className="space-y-2 text-sm text-white">
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <p><strong className="text-white">290+:</strong> 챌린저스 EXP 듀오 60만 마리 잡는 수준의 효율 (사냥 없이!). 400% 도핑 기준 약 <strong className="text-cyan-400">13시간 40분</strong> 사냥 등가. <strong className="text-green-400">무조건 구매 추천.</strong></p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <p><strong className="text-white">285~289:</strong> 모멘텀 패스(14,003)와 동급 이상의 효율. 강력 추천.</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <p><strong className="text-white">280~284:</strong> 메카베리 효율이 낮아 아쉽지만 그래도 준수. 그럼에도 경험치 도핑 400% 기준 <strong className="text-yellow-400">약 14시간 정도</strong> 사냥해야 얻을 수 있는 경험치를 얻는 수준이기에 <strong className="text-green-400">Lv.285작을 하는 사람들에게는 강력 추천!</strong></p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-purple-300 font-bold">솔 에르다 + 심볼 100개는 EXP 외 보너스로 실질 가치는 더 높음!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-12" />

                {/* ===== SECTION 2: 아스트랄 세레나데 패키지 ===== */}
                <section className="mb-14">
                    <div className="bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-rose-900/30 border-2 border-purple-500/50 rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-purple-400" />
                            </div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-purple-400">
                                2. 아스트랄 세레나데 패키지 (69,800 캐시)
                            </h2>
                        </div>
                        <div className="mb-6 flex justify-center">
                            <Image 
                                src="/images/astral-serenade-package.png" 
                                width={600} 
                                height={320} 
                                alt="아스트랄 세레나데 패키지" 
                                className="rounded-xl border border-purple-500/30 object-contain shadow-lg w-full max-w-2xl"
                                unoptimized={true}
                            />
                        </div>
                        <p className="text-slate-200 text-sm mb-6">※ 경험치 효과만 분석합니다. 코스튬 가치는 별도.</p>

                        {/* 경험치 효과 설명 */}
                        <div className="bg-slate-900/60 rounded-xl p-5 mb-6">
                            <h3 className="font-bold text-white mb-4">⚙️ 경험치 100% 추가 효과 구조</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex flex-col gap-3 bg-purple-900/30 border border-purple-500/40 rounded-lg p-3">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-white font-bold">보너스 아이템 4종 (각 0캐시) — 능력치 유효 기간 100일</p>
                                            <p className="text-slate-200 text-xs mt-1">티어 스텔라, 셀레스티얼 인이어, 실버 스타 리슬릿, 스타 글리터 → 각 +25% 추가 경험치</p>
                                        </div>
                                    </div>
                                    <div className="mt-1 w-full flex justify-center">
                                        <Image
                                            src="/images/astral-items.png"
                                            width={800}
                                            height={200}
                                            alt="아스트랄 패키지 보너스 아이템 4종 옵션"
                                            className="rounded-lg border border-purple-500/20 object-contain shadow-md w-full"
                                            unoptimized={true}
                                        />
                                    </div>
                                </div>
                                <div className="bg-orange-900/30 border border-orange-500/40 rounded-lg p-4">
                                    <p className="text-orange-400 font-bold mb-2">📌 합산(합연산) 적용 방식</p>
                                    <p className="text-white text-sm">기존 도핑 <strong className="text-white">400%</strong> + 아이템 <strong className="text-white">+100%</strong> = 총 <strong className="text-yellow-400">500%</strong></p>
                                    <p className="text-white text-sm mt-1">추가로 받는 경험치 = 기본 몬스터 EXP의 <strong className="text-cyan-400">100%</strong> (기존 500% 중 100%p 기여)</p>
                                    <p className="text-slate-200 text-xs mt-2">→ 사냥을 안 하면 효과 없음. 사냥할수록 가치 상승!</p>
                                </div>
                            </div>
                        </div>

                        {/* 레벨 선택 탭 */}
                        <div className="flex gap-2 mb-5">
                            {(['280', '285', '290'] as const).map(lv => (
                                <button
                                    key={lv}
                                    onClick={() => setAstraSortLevel(lv)}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${astraSortLevel === lv ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
                                >
                                    {lv === '290' ? 'Lv.290+' : `Lv.${lv}~${parseInt(lv) + 4}`}
                                </button>
                            ))}
                        </div>

                        {/* 사냥 시간별 효율 */}
                        <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
                            <table className="min-w-full text-xs sm:text-sm">
                                <thead>
                                    <tr className="bg-slate-800/50 border-b-2 border-purple-500/30">
                                        <th className="px-3 py-3 text-left text-purple-400 font-bold">일일 사냥</th>
                                        <th className="px-3 py-3 text-center text-purple-400 font-bold">100일 추가 상급 EXP</th>
                                        <th className="px-3 py-3 text-center text-purple-400 font-bold">모멘텀 패스(70,013) 대비</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {huntingOptions.map(h => {
                                        const expGained = calcAstraExp(astraSortLevel, h);
                                        const ratio = (expGained / MOMENTUM_PASS_EXP * 100).toFixed(0);
                                        const ratioNum = expGained / MOMENTUM_PASS_EXP;
                                        return (
                                            <tr key={h} className={`${ratioNum >= 1 ? 'bg-green-900/20 border border-green-500/20' : 'bg-slate-800/20'}`}>
                                                <td className="px-3 py-3 font-bold text-white">{h === 0.5 ? '30분' : `${h}시간`}</td>
                                                <td className="px-3 py-3 text-center font-mono font-bold text-white">{expGained.toLocaleString()}</td>
                                                <td className="px-3 py-3 text-center">
                                                    <span className={`font-bold ${ratioNum >= 1 ? 'text-green-400' : ratioNum >= 0.5 ? 'text-yellow-400' : 'text-slate-200'}`}>
                                                        {ratio}%{ratioNum >= 1 ? ' ✅' : ''}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* 모멘텀 패스 달성 기준 */}
                        <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/50 rounded-xl p-5">
                            <h3 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                🎯 모멘텀 패스 절대량 달성 기준 (레벨별)
                            </h3>
                            <div className="grid grid-cols-3 gap-3 text-center text-sm">
                                {(['280', '285', '290'] as const).map(lv => (
                                    <div key={lv} className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-slate-200 text-xs mb-1">{lv === '290' ? '290+' : `${lv}~${parseInt(lv) + 4}`}</p>
                                        <p className="text-white font-black">{calcHoursNeeded(lv, MOMENTUM_PASS_EXP)}/일</p>
                                        <p className="text-green-400 text-xs mt-1">이상 사냥</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-3 mt-3">
                                <p className="text-white text-sm leading-relaxed">
                                    💡 오직 추가 경험치 100%의 가치로만 계산한 것이기 때문에 그 외에 추가 공격력과 능력치 그리고 코스튬의 가치를 더하면 엄청난 가성비의 패키지라고 할 수 있습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-12" />

                {/* ===== SECTION 3: 경매장 구매 ===== */}
                <section className="mb-14">
                    <div className="bg-gradient-to-br from-emerald-900/30 via-teal-900/20 to-cyan-900/30 border-2 border-emerald-500/50 rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                                <ShoppingCart className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-emerald-400">
                                3. 경매장 시세 구매 분석
                            </h2>
                        </div>
                        <p className="text-slate-200 text-sm mb-6">4가지 경험치 아이템만 경매장에서 따로 구매했을 때의 효율 분석. <strong className="text-yellow-400">현실 메소로 가능!</strong></p>

                        {/* 경매장 가격 */}
                        <div className="bg-slate-900/60 rounded-xl p-5 mb-6">
                            <h3 className="font-bold text-white mb-4">💰 현재 경매장 시세 (기준일: 2026.03.23)</h3>
                            <div className="space-y-2 text-sm">
                                {[
                                    { name: '티어 스텔라', price: '10억', exp: '+25%' },
                                    { name: '셀레스티얼 인이어', price: '6억', exp: '+25%' },
                                    { name: '실버 스타 리슬릿', price: '6억 3천만', exp: '+25%' },
                                    { name: '스타 글리터', price: '6억', exp: '+25%' },
                                ].map(item => (
                                    <div key={item.name} className="flex items-center justify-between bg-slate-800/40 rounded-lg px-4 py-2">
                                        <span className="text-white">{item.name}</span>
                                        <div className="flex items-center gap-4">
                                            <span className="text-yellow-400 font-mono font-bold">{item.price} 메소</span>
                                            <span className="text-green-400 text-xs bg-green-900/30 px-2 py-0.5 rounded">{item.exp} 추가 경험치</span>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex items-center justify-between bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-400 rounded-lg px-4 py-3 mt-2">
                                    <span className="text-white font-black">합계</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-emerald-400 font-mono font-black">28억 3천만 메소</span>
                                        <span className="text-cyan-400 text-xs bg-cyan-900/30 px-2 py-0.5 rounded font-bold">+100% 추가 경험치</span>
                                    </div>
                                </div>
                                <div className="bg-blue-900/30 border border-blue-500/40 rounded-lg p-3 mt-2">
                                    <p className="text-sm text-white">
                                        <strong className="text-blue-400">캐시 환산:</strong> 28.3억 × 1,500 = <strong className="text-white">{AUCTION_CASH_EQUIV.toLocaleString()}캐시</strong> 상당
                                        <span className="text-slate-300 ml-2">(모멘텀 패스 50,000캐시보다 {(50000 - AUCTION_CASH_EQUIV).toLocaleString()}캐시 저렴)</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 사냥 시간별 효율 테이블 */}
                        <div className="mb-6">
                            <h3 className="font-bold text-white mb-4">
                                <Calculator className="w-4 h-4 inline mr-2 text-teal-400" />
                                레벨 × 사냥 시간별 상급 EXP & 효율
                            </h3>
                            <div className="overflow-x-auto -mx-4 sm:mx-0">
                                <table className="min-w-full text-xs sm:text-sm">
                                    <thead>
                                        <tr className="bg-slate-800/50 border-b-2 border-emerald-500/30">
                                            <th className="px-3 py-3 text-left text-emerald-400 font-bold">레벨</th>
                                            <th className="px-3 py-3 text-center text-emerald-400 font-bold">30분/일</th>
                                            <th className="px-3 py-3 text-center text-emerald-400 font-bold">1시간/일</th>
                                            <th className="px-3 py-3 text-center text-emerald-400 font-bold">2시간/일</th>
                                            <th className="px-3 py-3 text-center text-emerald-400 font-bold">3시간/일</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50">
                                        {(['280', '285', '290'] as const).map(lv => (
                                            <tr key={lv} className="bg-slate-800/20">
                                                <td className="px-3 py-3 font-bold text-white">{lv === '290' ? '290+' : `${lv}~${parseInt(lv) + 4}`}</td>
                                                {[0.5, 1, 2, 3].map(h => {
                                                    const exp = calcAstraExp(lv, h);
                                                    const eff = Math.round(exp / (AUCTION_CASH_EQUIV / 10000));
                                                    const beat = eff >= MOMENTUM_EFF;
                                                    return (
                                                        <td key={h} className={`px-3 py-3 text-center ${beat ? 'bg-green-900/30' : ''}`}>
                                                            <div className="font-mono font-bold text-white">{exp.toLocaleString()}</div>
                                                            <div className={`text-xs ${beat ? 'text-green-400 font-bold' : 'text-slate-300'}`}>
                                                                효율 {eff.toLocaleString()}{beat ? ' ✅' : ''}
                                                            </div>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-slate-300 mt-2 text-right">※ 효율 = 상급 EXP ÷ {(AUCTION_CASH_EQUIV / 10000).toFixed(2)} (만캐시 기준) | ✅ = 모멘텀 패스 효율({MOMENTUM_EFF.toLocaleString()}) 돌파</p>
                        </div>

                        {/* 브레이크이븐 */}
                        <div className="bg-gradient-to-r from-teal-900/40 to-cyan-900/40 border-2 border-teal-400 rounded-xl p-5">
                            <h3 className="font-bold text-teal-400 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                🎯 모멘텀 패스급 효율 달성 기준 (레벨별)
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                {(['280', '285', '290'] as const).map(lv => {
                                    const effBreakeven = calcEffBreakeven(lv, AUCTION_CASH_EQUIV);
                                    const absBreakeven = calcHoursNeeded(lv, MOMENTUM_PASS_EXP);
                                    return (
                                        <div key={lv} className="bg-slate-900/60 rounded-lg p-4">
                                            <p className="text-teal-400 font-bold mb-3">{lv === '290' ? 'Lv.290+' : `Lv.${lv}~${parseInt(lv) + 4}`}</p>
                                            <div className="space-y-2">
                                                <div>
                                                    <p className="text-xs text-slate-200">효율 기준 달성</p>
                                                    <p className="text-white font-black">{effBreakeven}/일</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-200">절대량 돌파</p>
                                                    <p className="text-white font-bold">{absBreakeven}/일</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-4 space-y-2 text-sm text-white">
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <p>경매장 구매는 <strong className="text-yellow-400">현실 메소</strong>로 가능 — 넥슨캐시(실돈) 불필요!</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <p><strong className="text-white">290+ 유저, 하루 2~3시간 사냥</strong>이면 모멘텀 패스를 뛰어넘는 효율!</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <p>사냥을 전혀 안 한다면 투자 가치 없음. <strong className="text-red-400">사냥량이 핵심!</strong></p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                                    <p>추가적인 보약 효과 <strong className="text-cyan-400">공/마+60 + 올스탯 +140</strong>까지 가치를 더하면 엄청나게 가성비 아이템!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== 최종 결론 ===== */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-purple-500 rounded-xl p-8">
                        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">📝 최종 결론 — 나에게 맞는 선택은?</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    title: '💰 가성비 절대 1위',
                                    content: (
                                        <>
                                            진 부스터 패키지 (1만 캐시) — 고정 경험치 + 솔 에르다 + 심볼까지 포함.<br />
                                            특히 290+에서 챌린저스 EXP 듀오 60만 마리 잡는 수준의 효율을 1만 캐시에.
                                        </>
                                    ),
                                    color: 'text-yellow-400 border-yellow-500/50 bg-yellow-900/10',
                                },
                                {
                                    title: '🏃 사냥 헤비 유저라면',
                                    content: (
                                        <>
                                            경매장 4종 구매 (28.3억 메소) — 290+ 하루 2시간 9분 이상 사냥하면 모멘텀 패스 효율 돌파.<br />
                                            넥슨 캐시 없이 메소로 해결 가능!
                                        </>
                                    ),
                                    color: 'text-emerald-400 border-emerald-500/50 bg-emerald-900/10',
                                },
                                {
                                    title: '🎭 코스튬도 원하고 EXP도 원한다면',
                                    content: (
                                        <>
                                            아스트랄 세레나데 패키지 — 코스튬 세트 자체의 가치를 고려하면 EXP 보너스는 순수 덤.<br />
                                            하루 1시간 이상 사냥하면 100일간 상당한 경험치 추가.
                                        </>
                                    ),
                                    color: 'text-purple-400 border-purple-500/50 bg-purple-900/10',
                                },
                            ].map(item => (
                                <div key={item.title} className={`border rounded-xl p-5 ${item.color}`}>
                                    <h3 className="font-bold mb-2">{item.title}</h3>
                                    <p className="text-sm text-white">{item.content}</p>
                                </div>
                            ))}
                        </div>

                        {/* 태그 */}
                        <div className="mt-8 pt-6 border-t border-slate-700">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {['#진부스터패키지효율', '#아스트랄세레나데효율', '#메이플BM효율', '#경험치가이드', '#상급EXP', '#메이플가성비', '#경매장시세', '#추가경험치'].map(tag => (
                                    <span key={tag} className="px-3 py-1.5 bg-purple-500/10 text-purple-400 text-xs sm:text-sm rounded-full border border-purple-500/30 hover:bg-purple-500/20 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <div className="border-t border-slate-700 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-500 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        블로그 메인으로
                    </Link>
                    <Link
                        href="/blog/exp-product-efficiency"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg font-bold hover:bg-slate-600 transition-colors"
                    >
                        💸 경험치 상품 기본편 보기
                    </Link>
                </div>
            </article>
        </div>
    );
}
