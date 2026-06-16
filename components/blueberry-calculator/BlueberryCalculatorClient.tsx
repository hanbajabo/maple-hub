"use client";

import { useState } from 'react';
import Link from 'next/link';

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

// 레벨업 초과경험치 치환 테이블 (실측데이터 역산)
// 버닝비욕드 ON: 짝수레벨에서 +2레벨로 치환 (확인된 비율)
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

// 1레벨 치환 비율 (실측데이터 역산, 비버닝 및 버닝 280 이후 사용)
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
    // 282+ 구간: 기준 데이터가 없으므로 BT 비율 공식 (다음레벨%/현재레벨%) 사용
    282: 4.8699/5.3568,   283: 4.4271/4.8699,
    284: 2.1917/4.4271,   285: 1.9924/2.1917,   286: 1.8113/1.9924,   287: 1.6466/1.8113,   288: 1.4969/1.6466,
    289: 0.7411/1.4969,   290: 0.6737/0.7411,   291: 0.6124/0.6737,   292: 0.5568/0.6124,   293: 0.5062/0.5568,
    294: 0.2506/0.5062,   295: 0.2278/0.2506,   296: 0.2071/0.2278,   297: 0.1883/0.2071,   298: 0.1255/0.1883, 299: 1/1,
};

export default function BlueberryCalculatorClient() {
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
                    // 버닝비욕드 ON + 확인된 비율 존재: 정확한 2레벨 직접 치환
                    convertedExp = overflowExp * BURN_OVERFLOW_RATIO[currentLv];
                } else {
                    // 비버닝 또는 274+ 구간: 1레벨씩 치환
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
        <div className="min-h-screen bg-slate-950 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 text-center">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
                        <Link 
                            href="/" 
                            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 rounded-xl transition-all duration-200 shadow-md backdrop-blur-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9 22 9 12 15 12 15 22"/>
                            </svg>
                            홈으로 돌아가기
                        </Link>
                        <Link 
                            href="/blog" 
                            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 rounded-xl transition-all duration-200 shadow-md backdrop-blur-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
                                <path d="M6 6h10"/>
                                <path d="M6 10h10"/>
                            </svg>
                            블로그로 돌아가기
                        </Link>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 mb-4 inline-block">
                        미호의 블루베리 농장 계산기
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base">
                        챌린저스 월드 시즌4 블루베리 농장의 경험치 획득량과 레벨업을 계산해보세요!
                    </p>
                </header>

                <div className="bg-slate-900 border border-indigo-500/50 rounded-2xl p-6 shadow-2xl">
                    <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-3 flex items-center gap-2">
                        <span>🧮</span> 내 캐릭터 정보 입력
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2">시작 레벨 (260~299)</label>
                            <input 
                                type="number" 
                                min={260} 
                                max={299} 
                                value={level} 
                                onChange={(e) => setLevel(Number(e.target.value))} 
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-lg font-bold" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2">현재 경험치 (%)</label>
                            <input 
                                type="number" 
                                min={0} 
                                max={99.999} 
                                step={0.001} 
                                value={currentExp} 
                                onChange={(e) => setCurrentExp(Number(e.target.value))} 
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-lg font-bold" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2">사용할 입장권 수</label>
                            <input 
                                type="number" 
                                min={1} 
                                max={100} 
                                value={tickets} 
                                onChange={(e) => setTickets(Number(e.target.value))} 
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-lg font-bold" 
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="flex items-center gap-3 cursor-pointer bg-slate-800/80 hover:bg-slate-800 p-4 rounded-xl border border-slate-700 w-full transition-colors">
                            <input 
                                type="checkbox" 
                                checked={burningBeyond} 
                                onChange={(e) => setBurningBeyond(e.target.checked)} 
                                className="w-6 h-6 rounded border-slate-600 bg-slate-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900" 
                            />
                            <div>
                                <div className="text-lg font-bold text-yellow-400 flex items-center gap-2">
                                    <span>🔥</span> 버닝비욘드 (1+1 레벨업) 적용
                                </div>
                                <div className="text-sm text-slate-400 mt-1">260레벨부터 280레벨 달성 전까지 레벨업 시 1+1 보너스를 적용합니다.</div>
                            </div>
                        </label>
                    </div>

                    <button 
                        onClick={calculate} 
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-[0.99]"
                    >
                        결과 계산하기
                    </button>
                    
                    {result && (
                        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/50 rounded-xl p-6">
                                <h3 className="text-center text-slate-400 font-semibold mb-2">목표 달성 결과</h3>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
                                    <span className="text-indigo-400">Lv.{result.finalLevel}</span> 
                                    <span className="text-xl sm:text-2xl md:text-3xl text-slate-300">({result.finalExp.toFixed(4)}%)</span>
                                </div>
                                
                                <div className="bg-slate-950/80 rounded-lg p-4 border border-slate-800 max-h-80 overflow-y-auto">
                                    <h4 className="text-sm font-bold text-slate-500 mb-3 sticky top-0 bg-slate-950/90 py-1">상세 기록</h4>
                                    <div className="text-sm md:text-base text-slate-300 space-y-2 font-mono">
                                        {result.log.map((line, idx) => (
                                            <div key={idx} className={`${line.includes('레벨업') ? 'text-yellow-400 font-bold bg-yellow-900/20 p-2 rounded -mx-2' : ''}`}>
                                                {line}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <details className="mt-8 bg-slate-900/60 border border-slate-700/50 rounded-xl shadow-inner group">
                        <summary className="p-4 sm:p-5 cursor-pointer text-base sm:text-lg font-bold text-white flex items-center justify-between outline-none hover:bg-slate-800/30 transition-colors">
                            <div className="flex items-center gap-2">
                                <span>📈</span> 블루베리 농장 레벨별 경험치 획득량 표 보기 (1회 기준)
                            </div>
                            <div className="text-slate-400 group-open:rotate-180 transition-transform">▼</div>
                        </summary>
                        <div className="p-3 sm:p-5 pt-0 border-t border-slate-700/50 mt-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
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

                    <div className="mt-8 text-center px-2">
                        <Link href="/blog/challengers-pass-efficiency-2026" className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 px-4 sm:px-6 rounded-xl transition-all border border-slate-700 hover:border-slate-500 shadow-sm text-sm sm:text-base w-full sm:w-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m15 18-6-6 6-6"/></svg>
                            <span>챌린저스 패스 효율 완벽 분석 글로 돌아가기</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
