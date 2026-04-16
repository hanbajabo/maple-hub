'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

// ===================== 기준값 =====================
const BASE_FOUNTAIN = 900;
const BASE_DAWN = 690;

// ===================== 데이터 정의 =====================

type JobData = {
    name: string;
    group: string;
    fountain: number; // 파운틴 최종 확정값
    dawn: number;     // 새벽 최종 확정값
};

const allJobs: JobData[] = [
    // 모험가 전사
    { name: '히어로', group: '모험가 전사', fountain: 1032, dawn: 791 },
    { name: '팔라딘', group: '모험가 전사', fountain: 2016, dawn: 1546 },
    { name: '다크나이트', group: '모험가 전사', fountain: 1155, dawn: 886 },
    // 모험가 마법사
    { name: '아크메이지(불,독)', group: '모험가 마법사', fountain: 987, dawn: 757 },
    { name: '아크메이지(썬,콜)', group: '모험가 마법사', fountain: 999, dawn: 766 },
    { name: '비숍', group: '모험가 마법사', fountain: 1053, dawn: 807 },
    // 모험가 궁수
    { name: '보우마스터', group: '모험가 궁수', fountain: 2664, dawn: 2042 },
    { name: '신궁', group: '모험가 궁수', fountain: 2113, dawn: 1620 },
    { name: '패스파인더', group: '모험가 궁수', fountain: 2612, dawn: 2003 },
    // 모험가 도적
    { name: '나이트로드', group: '모험가 도적', fountain: 1267, dawn: 971 },
    { name: '섀도어', group: '모험가 도적', fountain: 1215, dawn: 932 },
    { name: '듀얼블레이드', group: '모험가 도적', fountain: 1118, dawn: 857 },
    // 모험가 해적
    { name: '바이퍼', group: '모험가 해적', fountain: 1923, dawn: 1474 },
    { name: '캡틴', group: '모험가 해적', fountain: 1746, dawn: 1339 },
    { name: '캐논슈터', group: '모험가 해적', fountain: 1396, dawn: 1100 },
    // 시그너스
    { name: '미하일', group: '시그너스', fountain: 1890, dawn: 1449 },
    { name: '소울마스터', group: '시그너스', fountain: 1296, dawn: 994 },
    { name: '플레임위자드', group: '시그너스', fountain: 1458, dawn: 1118 },
    { name: '윈드브레이커', group: '시그너스', fountain: 1791, dawn: 1373 },
    { name: '나이트워커', group: '시그너스', fountain: 986, dawn: 756 },
    { name: '스트라이커', group: '시그너스', fountain: 900, dawn: 690 },
    // 영웅
    { name: '아란', group: '영웅', fountain: 1875, dawn: 1437 },
    { name: '에반', group: '영웅', fountain: 1835, dawn: 1407 },
    { name: '루미너스', group: '영웅', fountain: 1584, dawn: 1214 },
    { name: '메르세데스', group: '영웅', fountain: 1720, dawn: 1318 },
    { name: '팬텀', group: '영웅', fountain: 1125, dawn: 863 },
    { name: '은월', group: '영웅', fountain: 1359, dawn: 1042 },
    // 레지스탕스
    { name: '블래스터', group: '레지스탕스', fountain: 1384, dawn: 1061 },
    { name: '배틀메이지', group: '레지스탕스', fountain: 1858, dawn: 1424 },
    { name: '와일드헌터', group: '레지스탕스', fountain: 2196, dawn: 1684 },
    { name: '제논', group: '레지스탕스', fountain: 970, dawn: 743 },
    { name: '메카닉', group: '레지스탕스', fountain: 1911, dawn: 1465 },
    { name: '데몬 슬레이어', group: '레지스탕스', fountain: 1161, dawn: 890 },
    { name: '데몬 어벤져', group: '레지스탕스', fountain: 1431, dawn: 1097 },
    // 노바
    { name: '카이저', group: '노바', fountain: 2295, dawn: 1760 },
    { name: '카인', group: '노바', fountain: 1547, dawn: 1186 },
    { name: '카데나', group: '노바', fountain: 1875, dawn: 1437 },
    { name: '엔젤릭버스터', group: '노바', fountain: 1756, dawn: 1376 },
    // 제로
    { name: '제로', group: '제로', fountain: 1917, dawn: 1470 },
    // 키네시스
    { name: '키네시스', group: '키네시스', fountain: 1504, dawn: 1152 },
    // 레프
    { name: '아델', group: '레프', fountain: 1814, dawn: 1391 },
    { name: '일리움', group: '레프', fountain: 2385, dawn: 1829 },
    { name: '칼리', group: '레프', fountain: 2556, dawn: 1960 },
    { name: '아크', group: '레프', fountain: 2296, dawn: 1790 },
    // 아니마
    { name: '렌', group: '아니마', fountain: 2634, dawn: 1996 },
    { name: '라라', group: '아니마', fountain: 1557, dawn: 1194 },
    { name: '호영', group: '아니마', fountain: 1512, dawn: 1159 },
];

// ===================== 헬퍼 =====================

function DiffBadge({ diff, base }: { diff: number; base: number }) {
    const pct = ((diff / base) * 100).toFixed(0);
    if (diff > 0) return (
        <span className="inline-flex items-center gap-0.5 text-green-400 font-bold text-xs whitespace-nowrap">
            <TrendingUp className="w-3 h-3" />+{diff}
            <span className="text-green-500/70 font-normal">({pct}%)</span>
        </span>
    );
    if (diff < 0) return (
        <span className="inline-flex items-center gap-0.5 text-red-400 font-bold text-xs whitespace-nowrap">
            <TrendingDown className="w-3 h-3" />{diff}
            <span className="text-red-500/70 font-normal">({pct}%)</span>
        </span>
    );
    return (
        <span className="inline-flex items-center gap-0.5 text-slate-400 font-bold text-xs">
            <Minus className="w-3 h-3" />기준값
        </span>
    );
}

function RankBadge({ rank }: { rank: number }) {
    if (rank === 1) return <span className="text-yellow-400 font-black">🥇 1위</span>;
    if (rank === 2) return <span className="text-slate-300 font-black">🥈 2위</span>;
    if (rank === 3) return <span className="text-amber-600 font-black">🥉 3위</span>;
    return <span className="text-slate-400 font-semibold">{rank}위</span>;
}

// ===================== 직업군별 데이터 테이블 =====================

function GroupTable({ data }: { data: JobData[] }) {
    const groups: string[] = [];
    data.forEach(d => { if (!groups.includes(d.group)) groups.push(d.group); });

    return (
        <div className="space-y-6">
            {groups.map(group => (
                <div key={group}>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">{group}</div>

                    {/* 모바일: 카드형 */}
                    <div className="sm:hidden space-y-2">
                        {data.filter(d => d.group === group).map(job => {
                            const fDiff = job.fountain - BASE_FOUNTAIN;
                            const dDiff = job.dawn - BASE_DAWN;
                            return (
                                <div key={job.name} className="bg-slate-800/50 border border-slate-700/60 rounded-xl px-3 py-3">
                                    <div className="font-semibold text-slate-100 text-sm mb-2">{job.name}</div>
                                    <div className="flex gap-3">
                                        <div className="flex-1 bg-cyan-950/40 border border-cyan-800/30 rounded-lg px-2.5 py-2">
                                            <div className="text-xs text-cyan-400 font-semibold mb-0.5">💧 파운틴</div>
                                            <div className="font-bold text-white text-sm">{job.fountain}%</div>
                                            <div className="mt-0.5"><DiffBadge diff={fDiff} base={BASE_FOUNTAIN} /></div>
                                        </div>
                                        <div className="flex-1 bg-indigo-950/40 border border-indigo-800/30 rounded-lg px-2.5 py-2">
                                            <div className="text-xs text-indigo-400 font-semibold mb-0.5">🌙 새벽</div>
                                            <div className="font-bold text-white text-sm">{job.dawn}%</div>
                                            <div className="mt-0.5"><DiffBadge diff={dDiff} base={BASE_DAWN} /></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* sm 이상: 테이블 */}
                    <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-700">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-800/80 text-slate-400 text-xs">
                                    <th className="text-left px-4 py-2.5 font-semibold">직업</th>
                                    <th className="text-right px-4 py-2.5 font-semibold text-cyan-400">💧 파운틴</th>
                                    <th className="text-right px-4 py-2.5 font-semibold text-slate-300">기준 대비</th>
                                    <th className="text-right px-4 py-2.5 font-semibold text-indigo-400">🌙 새벽</th>
                                    <th className="text-right px-4 py-2.5 font-semibold text-slate-300">기준 대비</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.filter(d => d.group === group).map(job => {
                                    const fDiff = job.fountain - BASE_FOUNTAIN;
                                    const dDiff = job.dawn - BASE_DAWN;
                                    return (
                                        <tr key={job.name} className="border-t border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                                            <td className="px-4 py-2.5 font-semibold text-slate-200">{job.name}</td>
                                            <td className="px-4 py-2.5 text-right font-bold text-cyan-300">{job.fountain}%</td>
                                            <td className="px-4 py-2.5 text-right"><DiffBadge diff={fDiff} base={BASE_FOUNTAIN} /></td>
                                            <td className="px-4 py-2.5 text-right font-bold text-indigo-300">{job.dawn}%</td>
                                            <td className="px-4 py-2.5 text-right"><DiffBadge diff={dDiff} base={BASE_DAWN} /></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ===================== 파운틴 순위표 =====================

function FountainRanking({ data }: { data: JobData[] }) {
    const sorted = [...data].sort((a, b) => b.fountain - a.fountain);
    return (
        <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-200 mb-3 flex items-center gap-2">
                <span className="text-xl">💧</span>
                <span>에르다 파운틴 퍼뎀 순위 <span className="text-slate-400 font-normal text-xs sm:text-sm">(본섭 최종)</span></span>
            </h3>
            {/* 모바일 */}
            <div className="sm:hidden space-y-1.5">
                {sorted.map((job, i) => {
                    const rank = i + 1;
                    const diff = job.fountain - BASE_FOUNTAIN;
                    return (
                        <div key={job.name} className={`rounded-xl px-3 py-2.5 flex items-center gap-2 border
                            ${rank <= 3 ? 'bg-amber-950/35 border-amber-700/40' : rank >= sorted.length - 2 ? 'bg-red-950/20 border-red-900/30' : 'bg-slate-800/30 border-slate-700/40'}`}>
                            <div className="w-10 shrink-0 text-xs font-bold text-center">
                                {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : <span className="text-slate-400">{rank}위</span>}
                            </div>
                            <span className="flex-1 font-semibold text-slate-200 text-sm truncate">{job.name}</span>
                            <span className="font-bold text-cyan-300 text-sm shrink-0">{job.fountain}%</span>
                            <div className="shrink-0 w-16 text-right"><DiffBadge diff={diff} base={BASE_FOUNTAIN} /></div>
                        </div>
                    );
                })}
            </div>
            {/* 데스크톱 */}
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-700">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-800/80 text-slate-400 text-xs">
                            <th className="text-left px-3 py-2.5 font-semibold w-24">순위</th>
                            <th className="text-left px-3 py-2.5 font-semibold">직업</th>
                            <th className="text-right px-3 py-2.5 font-semibold">파운틴</th>
                            <th className="text-right px-3 py-2.5 font-semibold">기준 대비</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((job, i) => {
                            const rank = i + 1;
                            const diff = job.fountain - BASE_FOUNTAIN;
                            return (
                                <tr key={job.name} className={`border-t border-slate-700/50 transition-colors
                                    ${rank <= 3 ? 'bg-amber-950/30' : rank >= sorted.length - 2 ? 'bg-red-950/10' : 'hover:bg-slate-800/30'}`}>
                                    <td className="px-3 py-2.5"><RankBadge rank={rank} /></td>
                                    <td className="px-3 py-2.5 font-semibold text-slate-200">{job.name}</td>
                                    <td className="px-3 py-2.5 text-right font-bold text-cyan-300">{job.fountain}%</td>
                                    <td className="px-3 py-2.5 text-right"><DiffBadge diff={diff} base={BASE_FOUNTAIN} /></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ===================== 새벽 순위표 =====================

function DawnRanking({ data }: { data: JobData[] }) {
    const sorted = [...data].sort((a, b) => b.dawn - a.dawn);
    return (
        <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-200 mb-3 flex items-center gap-2">
                <span className="text-xl">🌙</span>
                <span>솔 야누스 새벽 퍼뎀 순위 <span className="text-slate-400 font-normal text-xs sm:text-sm">(본섭 최종)</span></span>
            </h3>
            {/* 모바일 */}
            <div className="sm:hidden space-y-1.5">
                {sorted.map((job, i) => {
                    const rank = i + 1;
                    const diff = job.dawn - BASE_DAWN;
                    return (
                        <div key={job.name} className={`rounded-xl px-3 py-2.5 flex items-center gap-2 border
                            ${rank <= 3 ? 'bg-amber-950/35 border-amber-700/40' : rank >= sorted.length - 2 ? 'bg-red-950/20 border-red-900/30' : 'bg-slate-800/30 border-slate-700/40'}`}>
                            <div className="w-10 shrink-0 text-xs font-bold text-center">
                                {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : <span className="text-slate-400">{rank}위</span>}
                            </div>
                            <span className="flex-1 font-semibold text-slate-200 text-sm truncate">{job.name}</span>
                            <span className="font-bold text-indigo-300 text-sm shrink-0">{job.dawn}%</span>
                            <div className="shrink-0 w-16 text-right"><DiffBadge diff={diff} base={BASE_DAWN} /></div>
                        </div>
                    );
                })}
            </div>
            {/* 데스크톱 */}
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-700">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-800/80 text-slate-400 text-xs">
                            <th className="text-left px-3 py-2.5 font-semibold w-24">순위</th>
                            <th className="text-left px-3 py-2.5 font-semibold">직업</th>
                            <th className="text-right px-3 py-2.5 font-semibold">새벽</th>
                            <th className="text-right px-3 py-2.5 font-semibold">기준 대비</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((job, i) => {
                            const rank = i + 1;
                            const diff = job.dawn - BASE_DAWN;
                            return (
                                <tr key={job.name} className={`border-t border-slate-700/50 transition-colors
                                    ${rank <= 3 ? 'bg-amber-950/30' : rank >= sorted.length - 2 ? 'bg-red-950/10' : 'hover:bg-slate-800/30'}`}>
                                    <td className="px-3 py-2.5"><RankBadge rank={rank} /></td>
                                    <td className="px-3 py-2.5 font-semibold text-slate-200">{job.name}</td>
                                    <td className="px-3 py-2.5 text-right font-bold text-indigo-300">{job.dawn}%</td>
                                    <td className="px-3 py-2.5 text-right"><DiffBadge diff={diff} base={BASE_DAWN} /></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ===================== 메인 페이지 =====================

export default function FinalCommonCoreDamageAdjustmentPage() {
    // 파운틴 기준 대비 상위/하위
    const topFountain = [...allJobs].sort((a, b) => b.fountain - a.fountain).slice(0, 5);
    const topDawn = [...allJobs].sort((a, b) => b.dawn - a.dawn).slice(0, 5);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

            {/* 헤더 */}
            <header className="w-full sm:max-w-7xl flex items-center px-3 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 mx-auto">
                <Link href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-lg font-bold">블로그로 돌아가기</span>
                </Link>
            </header>

            <main className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">

                {/* ── 타이틀 ── */}
                <div className="mb-7 sm:mb-10">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span className="text-slate-400 text-sm">2026년 4월 16일</span>
                        <span className="px-2 py-0.5 text-xs bg-cyan-500/20 text-cyan-300 rounded-full font-semibold border border-cyan-500/30">
                            업데이트 소식
                        </span>
                    </div>

                    <h1 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 leading-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                        🍁 최종 공용코어 파운틴·야누스<br />
                        직업별 데미지 확정안 총정리
                    </h1>

                    <p className="text-xs sm:text-base text-slate-300 leading-relaxed mb-5">
                        패치 적용 전 공통 수치인 <strong className="text-cyan-300">파운틴 900%</strong> /{' '}
                        <strong className="text-indigo-300">새벽 690%</strong>에서{' '}
                        <strong className="text-white">직업별 최종 확정안</strong>이 어떻게 결정되었는지 확인해 보세요.
                        기준값 대비 상승·하락 여부를 한눈에 정리했습니다.
                    </p>

                    {/* 기준값 카드 */}
                    <div className="grid grid-cols-2 gap-3 mb-5 sm:mb-7">
                        <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/40 rounded-xl p-3 sm:p-4 text-center">
                            <div className="text-2xl mb-1">💧</div>
                            <div className="font-bold text-cyan-300 text-sm sm:text-base">에르다 파운틴</div>
                            <div className="text-xs text-slate-400 mt-0.5 mb-2">패치 전 공통 기준</div>
                            <div className="text-2xl sm:text-3xl font-black text-white">{BASE_FOUNTAIN}%</div>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/40 rounded-xl p-3 sm:p-4 text-center">
                            <div className="text-2xl mb-1">🌙</div>
                            <div className="font-bold text-indigo-300 text-sm sm:text-base">솔 야누스 : 새벽</div>
                            <div className="text-xs text-slate-400 mt-0.5 mb-2">패치 전 공통 기준</div>
                            <div className="text-2xl sm:text-3xl font-black text-white">{BASE_DAWN}%</div>
                        </div>
                    </div>

                    {/* 주목할 직업 */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-5">
                        <h2 className="text-sm sm:text-base font-bold text-white mb-3">⚡ 파운틴 주목 직업</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <div className="text-xs text-cyan-400 font-bold mb-2">📈 확정값 상위 5위</div>
                                <div className="space-y-1">
                                    {topFountain.map(j => (
                                        <div key={j.name} className="flex items-center justify-between text-xs bg-slate-700/40 rounded-lg px-2.5 py-1.5 gap-1">
                                            <span className="font-semibold text-slate-200 truncate">{j.name}</span>
                                            <span className="text-cyan-300 font-bold shrink-0">{j.fountain}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-indigo-400 font-bold mb-2">🌙 새벽 확정값 상위 5위</div>
                                <div className="space-y-1">
                                    {topDawn.map(j => (
                                        <div key={j.name} className="flex items-center justify-between text-xs bg-slate-700/40 rounded-lg px-2.5 py-1.5 gap-1">
                                            <span className="font-semibold text-slate-200 truncate">{j.name}</span>
                                            <span className="text-indigo-300 font-bold shrink-0">{j.dawn}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 패치 배경 설명 */}
                    <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-700/40 rounded-xl p-4">
                        <h2 className="text-sm sm:text-base font-bold text-blue-300 mb-2">📋 패치 배경</h2>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            기존 최종 공용코어 <strong className="text-white">에르다 파운틴</strong>과{' '}
                            <strong className="text-white">솔 야누스(새벽)</strong>는 모든 직업에게{' '}
                            동일한 수치를 제공했습니다. 이번 패치를 통해 각 직업의 데미지 산정 방식과 특성에 맞춰{' '}
                            <strong className="text-cyan-300">직업별 개별 수치</strong>가 부여되었습니다.
                            이는 단순 너프/버프가 아닌 <strong className="text-white">직업별 밸런싱</strong>의 일환입니다.
                        </p>
                    </div>
                </div>

                {/* ── 직업별 확정 수치 ── */}
                <section className="mb-10 sm:mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 bg-blue-500 rounded-full" />
                        <h2 className="text-base sm:text-2xl font-black text-white">📊 직업별 최종 확정 수치</h2>
                    </div>
                    <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-3 sm:p-4 mb-4 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-400">
                        <span>• 마스터 레벨 기준</span>
                        <span className="flex items-center gap-1">
                            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400"></span>
                            파운틴 기준: <strong className="text-cyan-300 ml-1">{BASE_FOUNTAIN}%</strong>
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="inline-block w-2 h-2 rounded-full bg-indigo-400"></span>
                            새벽 기준: <strong className="text-indigo-300 ml-1">{BASE_DAWN}%</strong>
                        </span>
                    </div>
                    <GroupTable data={allJobs} />
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* ── 파운틴 순위 ── */}
                <section className="mb-10 sm:mb-16">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-6 bg-cyan-500 rounded-full" />
                        <h2 className="text-base sm:text-2xl font-black text-cyan-400">🏆 최종 퍼뎀 순위</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 mb-6">공통 기준 대비 직업별 확정 수치 순위입니다.</p>
                    <div className="space-y-10 sm:space-y-12">
                        <FountainRanking data={allJobs} />
                        <DawnRanking data={allJobs} />
                    </div>
                </section>

                {/* ── 참고 사항 ── */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-2xl p-4 sm:p-6">
                        <h3 className="text-sm sm:text-base font-bold text-purple-300 mb-2">📌 참고 사항</h3>
                        <ul className="space-y-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                            <li>• 위 수치는 공용코어 <strong>마스터 레벨</strong> 기준 퍼딜(%)입니다.</li>
                            <li>• 기준보다 높다고 해서 무조건 강한 것이 아니며, 직업별 딜 사이클에 따라 체감이 다릅니다.</li>
                            <li>• <strong className="text-cyan-300">에르다 파운틴</strong>은 지속 딜링, <strong className="text-indigo-300">솔 야누스 새벽</strong>은 설치형 코어입니다.</li>
                            <li>• 실제 체감은 개인 스펙·플레이 스타일에 따라 다를 수 있습니다.</li>
                        </ul>
                    </div>
                </section>

                <div className="border-t border-slate-800 pt-6">
                    <Link href="/blog" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        블로그 목록으로 돌아가기
                    </Link>
                </div>

            </main>
        </div>
    );
}
