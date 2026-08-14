"use client";

import { useState } from 'react';
import Link from 'next/link';

// 크림슨 메카베리 농장 레벨별 경험치 % (1회 기준)
const CRIMSON_EXP_TABLE: Record<number, number> = {
    280: 15.097, 281: 13.912, 282: 12.799, 283: 11.792, 284: 10.846,
    285: 6.036,  286: 5.551,  287: 5.112,  288: 4.708,  289: 4.328,
    290: 2.408,  291: 2.213,  292: 2.037,  293: 1.875,  294: 1.724,
    295: 0.959,  296: 0.882,  297: 0.812,  298: 0.746,  299: 0.503,
};

// 초과경험치 치환 비율 (블루베리 280+ 공식 기반, 레벨요구량 비율 사용)
const OVERFLOW_RATIO: Record<number, number> = {
    280: 33647892407763 / 37012220080506,
    281: 37012220080506 / 40714251200875,
    282: 40714251200875 / 44783409006105,
    283: 44783409006105 / 49265596489120,
    284: 49265596489120 / 99514371371769,
    285: 99514371371769 / 109469887112232,
    286: 109469887112232 / 120416460845070,
    287: 120416460845070 / 132438199626168,
    288: 132438199626168 / 145704688946395,
    289: 145704688946395 / 294287430697674,
    290: 294287430697674 / 323783214676910,
    291: 323783214676910 / 356195840000000,
    292: 356195840000000 / 391793898496000,
    293: 391793898496000 / 430784750255220,
    294: 430784750255220 / 869962090510948,
    295: 869962090510948 / 957431283809523,
    296: 957431283809523 / 1052555255172413,
    297: 1052555255172413 / 1157878520107238,
    298: 1157878520107238 / 1737689022345924,
    299: 1.0,
};

// 레벨별 경험치 % 데이터 (표 표시용)
const EXP_TABLE_DISPLAY = [
    { lv: 280, pct: '15.097%' }, { lv: 281, pct: '13.912%' }, { lv: 282, pct: '12.799%' },
    { lv: 283, pct: '11.792%' }, { lv: 284, pct: '10.846%' }, { lv: 285, pct: '6.036%'  },
    { lv: 286, pct: '5.551%'  }, { lv: 287, pct: '5.112%'  }, { lv: 288, pct: '4.708%'  },
    { lv: 289, pct: '4.328%'  }, { lv: 290, pct: '2.408%'  }, { lv: 291, pct: '2.213%'  },
    { lv: 292, pct: '2.037%'  }, { lv: 293, pct: '1.875%'  }, { lv: 294, pct: '1.724%'  },
    { lv: 295, pct: '0.959%'  }, { lv: 296, pct: '0.882%'  }, { lv: 297, pct: '0.812%'  },
    { lv: 298, pct: '0.746%'  }, { lv: 299, pct: '0.503%'  },
];

export default function CrimsonMecaberryCalculatorClient() {
    const [level, setLevel] = useState<number | ''>(280);
    const [currentExp, setCurrentExp] = useState<number | ''>(0);
    const [tickets, setTickets] = useState<number | ''>(17);

    const [result, setResult] = useState<{ finalLevel: number; finalExp: number; log: string[] } | null>(null);

    const calculate = () => {
        let currentLv = level === '' ? 280 : level;
        let exp = currentExp === '' ? 0 : currentExp;
        let ticketNum = tickets === '' ? 1 : tickets;

        // 시작 레벨, 현재 경험치, 입장권 수를 제한 범위에 맞게 조정
        currentLv = Math.max(280, Math.min(299, currentLv));
        exp = Math.max(0, Math.min(99.999, exp));
        ticketNum = Math.max(1, ticketNum);

        // 입력창에 조정된 값 다시 반영
        setLevel(currentLv);
        setCurrentExp(exp);
        setTickets(ticketNum);

        const logs: string[] = [];

        for (let i = 1; i <= ticketNum; i++) {
            if (currentLv >= 300) {
                logs.push(`[${i}번째] 이미 300레벨(최대 레벨)에 도달했습니다.`);
                break;
            }

            const expGain = CRIMSON_EXP_TABLE[currentLv] || 0;
            if (expGain === 0) {
                logs.push(`[${i}번째] Lv.${currentLv}은 지원하지 않는 레벨입니다. (280~299만 지원)`);
                break;
            }

            exp += expGain;
            logs.push(`[${i}번째] Lv.${currentLv} (+${expGain.toFixed(3)}%) → 누적 ${exp.toFixed(3)}%`);

            while (exp >= 100 && currentLv < 300) {
                const overflowExp = exp - 100;
                const ratio = OVERFLOW_RATIO[currentLv] ?? 0.909;
                const convertedExp = overflowExp * ratio;
                currentLv += 1;
                exp = convertedExp;
                logs.push(`🎉 레벨업! Lv.${currentLv} 달성! (잔여 경험치: ${exp.toFixed(3)}%)`);
            }
        }

        setResult({ finalLevel: currentLv, finalExp: exp, log: logs });
    };

    return (
        <div className="min-h-screen bg-slate-950 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                {/* 헤더 */}
                <header className="mb-8 text-center">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
                        <Link
                            href="/"
                            prefetch={false}
                            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-red-500/50 rounded-xl transition-all duration-200 shadow-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9 22 9 12 15 12 15 22"/>
                            </svg>
                            홈으로 돌아가기
                        </Link>
                        <Link
                            href="/blog/momentum-pass-plus-guide"
                            prefetch={false}
                            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-red-500/50 rounded-xl transition-all duration-200 shadow-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
                                <path d="M6 6h10"/><path d="M6 10h10"/>
                            </svg>
                            모멘텀 패스 PLUS 가이드
                        </Link>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-red-400 mb-4 inline-block">
                        🍓 크림슨 메카베리 농장 계산기
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base">
                        모멘텀 패스 PLUS 크림슨 메카베리 농장 입장권의 경험치 획득량과 레벨업을 계산해보세요!
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 bg-red-900/20 border border-red-500/30 rounded-full px-4 py-1.5 text-xs text-red-300 font-semibold">
                        <span>🔥</span> 280레벨 ~ 299레벨 지원
                    </div>

                    {/* 입장권 이미지 */}
                    <div className="mt-6 flex justify-center">
                        <img
                            src="/crimson-mecaberry-ticket.png"
                            alt="크림슨 메카베리 농장 입장권 아이템 설명"
                            className="max-w-xs w-full rounded-xl border border-red-500/30 shadow-lg shadow-red-900/20"
                        />
                    </div>
                </header>

                {/* 계산기 */}
                <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-6 shadow-2xl">
                    <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-3 flex items-center gap-2">
                        <span>🧮</span> 내 캐릭터 정보 입력
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2">시작 레벨 (280~299)</label>
                            <input
                                type="number"
                                min={280}
                                max={299}
                                value={level}
                                onChange={(e) => setLevel(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-lg font-bold"
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
                                onChange={(e) => setCurrentExp(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-lg font-bold"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2">사용할 입장권 수</label>
                            <input
                                type="number"
                                min={1}
                                value={tickets}
                                onChange={(e) => setTickets(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-lg font-bold"
                            />
                        </div>
                    </div>

                    {/* 안내 */}
                    <div className="mb-6 bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 text-sm text-slate-400 space-y-1">
                        <p>💡 <strong className="text-white">크림슨 메카베리 농장</strong>은 <strong className="text-red-300">280레벨 이상</strong>부터 사용 가능합니다.</p>
                        <p>💡 모멘텀 패스 PLUS <strong className="text-white">기본 보상 1장</strong>, <strong className="text-white">프리미엄 패스</strong>에서 <strong className="text-yellow-300">6장</strong>, <strong className="text-white">프라임 패스</strong>에서 <strong className="text-yellow-300">11장</strong> — 총 <strong className="text-red-300">17장</strong> 획득 가능합니다.</p>
                    </div>

                    <button
                        type="button"
                        onClick={calculate}
                        className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-black text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-red-500/25 active:scale-[0.99] cursor-pointer"
                    >
                        결과 계산하기 🚀
                    </button>

                    {result && (
                        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-gradient-to-br from-red-900/30 to-slate-900 border border-red-500/40 rounded-xl p-6">
                                <h3 className="text-center text-slate-400 font-semibold mb-2">목표 달성 결과</h3>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
                                    <span className="text-red-400">Lv.{result.finalLevel}</span>
                                    <span className="text-xl sm:text-2xl md:text-3xl text-slate-300">({result.finalExp.toFixed(3)}%)</span>
                                </div>

                                <div className="bg-slate-950/80 rounded-lg p-4 border border-slate-800 max-h-80 overflow-y-auto">
                                    <h4 className="text-sm font-bold text-slate-500 mb-3 sticky top-0 bg-slate-950/90 py-1">상세 기록</h4>
                                    <div className="text-sm md:text-base text-slate-300 space-y-2 font-mono">
                                        {result.log.map((line, idx) => (
                                            <div
                                                key={idx}
                                                className={line.includes('레벨업') ? 'text-yellow-400 font-bold bg-yellow-900/20 p-2 rounded -mx-2' : ''}
                                            >
                                                {line}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 레벨별 경험치 표 */}
                    <details className="mt-8 bg-slate-900/60 border border-slate-700/50 rounded-xl shadow-inner group">
                        <summary className="p-4 sm:p-5 cursor-pointer text-base sm:text-lg font-bold text-white flex items-center justify-between outline-none hover:bg-slate-800/30 transition-colors">
                            <div className="flex items-center gap-2">
                                <span>📈</span> 크림슨 메카베리 농장 레벨별 경험치 획득량 (1회 기준)
                            </div>
                            <div className="text-slate-400 group-open:rotate-180 transition-transform">▼</div>
                        </summary>
                        <div className="p-3 sm:p-5 pt-0 border-t border-slate-700/50 mt-2">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                                {/* 280~284 */}
                                <div>
                                    <table className="w-full text-xs sm:text-sm text-center text-white border border-slate-700">
                                        <thead className="bg-slate-800 text-white">
                                            <tr><th className="py-2 border-b border-r border-slate-700">Lv</th><th className="py-2 border-b border-slate-700">EXP</th></tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/50">
                                            {EXP_TABLE_DISPLAY.slice(0, 5).map(({ lv, pct }) => (
                                                <tr key={lv} className="hover:bg-slate-800/30 transition-colors">
                                                    <td className="py-1.5 border-r border-slate-700 font-bold text-white">{lv}</td>
                                                    <td className="py-1.5 font-semibold text-red-200">{pct}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* 285~289 */}
                                <div>
                                    <table className="w-full text-xs sm:text-sm text-center text-white border border-slate-700">
                                        <thead className="bg-slate-800 text-white">
                                            <tr><th className="py-2 border-b border-r border-slate-700">Lv</th><th className="py-2 border-b border-slate-700">EXP</th></tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/50">
                                            {EXP_TABLE_DISPLAY.slice(5, 10).map(({ lv, pct }) => (
                                                <tr key={lv} className="hover:bg-slate-800/30 transition-colors">
                                                    <td className="py-1.5 border-r border-slate-700 font-bold text-white">{lv}</td>
                                                    <td className="py-1.5 font-semibold text-red-200">{pct}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* 290~294 */}
                                <div>
                                    <table className="w-full text-xs sm:text-sm text-center text-white border border-slate-700">
                                        <thead className="bg-slate-800 text-white">
                                            <tr><th className="py-2 border-b border-r border-slate-700">Lv</th><th className="py-2 border-b border-slate-700">EXP</th></tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/50">
                                            {EXP_TABLE_DISPLAY.slice(10, 15).map(({ lv, pct }) => (
                                                <tr key={lv} className="hover:bg-slate-800/30 transition-colors">
                                                    <td className="py-1.5 border-r border-slate-700 font-bold text-white">{lv}</td>
                                                    <td className="py-1.5 font-semibold text-red-200">{pct}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* 295~299 */}
                                <div>
                                    <table className="w-full text-xs sm:text-sm text-center text-white border border-slate-700">
                                        <thead className="bg-slate-800 text-white">
                                            <tr><th className="py-2 border-b border-r border-slate-700">Lv</th><th className="py-2 border-b border-slate-700">EXP</th></tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/50">
                                            {EXP_TABLE_DISPLAY.slice(15, 20).map(({ lv, pct }) => (
                                                <tr key={lv} className="hover:bg-slate-800/30 transition-colors">
                                                    <td className="py-1.5 border-r border-slate-700 font-bold text-white">{lv}</td>
                                                    <td className="py-1.5 font-semibold text-red-200">{pct}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </details>

                    {/* 관련 링크 */}
                    <div className="mt-8 text-center px-2">
                        <Link
                            href="/blog/momentum-pass-plus-guide"
                            prefetch={false}
                            className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 px-4 sm:px-6 rounded-xl transition-all border border-slate-700 hover:border-slate-500 shadow-sm text-sm sm:text-base w-full sm:w-auto"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m15 18-6-6 6-6"/></svg>
                            <span>모멘텀 패스 PLUS 완벽 가이드로 돌아가기</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
