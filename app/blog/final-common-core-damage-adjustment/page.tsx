'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

// ===================== 데이터 정의 =====================

type JobData = {
    name: string;
    group: string;
    before: number;
    after: number;
};

const fountainData: JobData[] = [
    { name: '히어로', group: '모험가', before: 900, after: 1032 },
    { name: '팔라딘', group: '모험가', before: 2271, after: 2016 },
    { name: '다크나이트', group: '모험가', before: 1231, after: 1132 },
    { name: '아크메이지(불,독)', group: '모험가', before: 1260, after: 1155 },
    { name: '아크메이지(썬,콜)', group: '모험가', before: 1193, after: 987 },
    { name: '비숍', group: '모험가', before: 1379, after: 999 },
    { name: '보우마스터', group: '모험가', before: 1264, after: 1053 },
    { name: '신궁', group: '모험가', before: 2385, after: 2664 },
    { name: '패스파인더', group: '모험가', before: 2112, after: 2113 },
    { name: '나이트로드', group: '모험가', before: 2987, after: 2612 },
    { name: '섀도어', group: '모험가', before: 1274, after: 1267 },
    { name: '듀얼블레이드', group: '모험가', before: 1322, after: 1215 },
    { name: '바이퍼', group: '모험가', before: 1714, after: 1923 },
    { name: '캡틴', group: '모험가', before: 1918, after: 1746 },
    { name: '캐논슈터', group: '모험가', before: 1473, after: 1396 },
    { name: '미하일', group: '시그너스', before: 1711, after: 1890 },
    { name: '소울마스터', group: '시그너스', before: 1348, after: 1296 },
    { name: '플레임위자드', group: '시그너스', before: 1847, after: 1458 },
    { name: '윈드브레이커', group: '시그너스', before: 2192, after: 1791 },
    { name: '나이트워커', group: '시그너스', before: 1146, after: 986 },
    { name: '스트라이커', group: '시그너스', before: 1076, after: 930 },
    { name: '아란', group: '영웅', before: 2388, after: 1875 },
    { name: '루미너스', group: '영웅', before: 2039, after: 1584 },
    { name: '에반', group: '영웅', before: 2202, after: 1835 },
    { name: '메르세데스', group: '영웅', before: 2144, after: 1720 },
    { name: '팬텀', group: '영웅', before: 1441, after: 1125 },
    { name: '은월', group: '영웅', before: 1560, after: 1359 },
    { name: '블래스터', group: '레지스탕스', before: 1756, after: 1384 },
    { name: '배틀메이지', group: '레지스탕스', before: 2290, after: 1588 },
    { name: '와일드헌터', group: '레지스탕스', before: 1895, after: 2196 },
    { name: '메카닉', group: '레지스탕스', before: 2464, after: 1911 },
    { name: '제논', group: '레지스탕스', before: 1140, after: 970 },
    { name: '데몬 슬레이어', group: '레지스탕스', before: 1238, after: 1161 },
    { name: '데몬 어벤져', group: '레지스탕스', before: 1760, after: 1431 },
    { name: '카이저', group: '노바', before: 2001, after: 2295 },
    { name: '카인', group: '노바', before: 1741, after: 1547 },
    { name: '카데나', group: '노바', before: 1788, after: 1875 },
    { name: '엔젤릭버스터', group: '노바', before: 1747, after: 1756 },
    { name: '제로', group: '제로', before: 2257, after: 2205 },
    { name: '키네시스', group: '키네시스', before: 1489, after: 1504 },
    { name: '아델', group: '레프', before: 2197, after: 1814 },
    { name: '일리움', group: '레프', before: 2615, after: 2385 },
    { name: '칼리', group: '레프', before: 2251, after: 2556 },
    { name: '아크', group: '레프', before: 2093, after: 2296 },
    { name: '렌', group: '아니마', before: 2385, after: 2634 },
    { name: '라라', group: '아니마', before: 2049, after: 1557 },
    { name: '호영', group: '아니마', before: 1796, after: 1512 },
];

const janusData: JobData[] = [
    { name: '히어로', group: '모험가', before: 1095, after: 1187 },
    { name: '팔라딘', group: '모험가', before: 2611, after: 2318 },
    { name: '다크나이트', group: '모험가', before: 1449, after: 1328 },
    { name: '아크메이지(불,독)', group: '모험가', before: 1371, after: 1135 },
    { name: '아크메이지(썬,콜)', group: '모험가', before: 1586, after: 1149 },
    { name: '비숍', group: '모험가', before: 1453, after: 1211 },
    { name: '보우마스터', group: '모험가', before: 2743, after: 3064 },
    { name: '신궁', group: '모험가', before: 2445, after: 2430 },
    { name: '패스파인더', group: '모험가', before: 3435, after: 3004 },
    { name: '나이트로드', group: '모험가', before: 1465, after: 1457 },
    { name: '섀도어', group: '모험가', before: 1520, after: 1397 },
    { name: '듀얼블레이드', group: '모험가', before: 1316, after: 1286 },
    { name: '바이퍼', group: '모험가', before: 1950, after: 2212 },
    { name: '캡틴', group: '모험가', before: 2205, after: 2008 },
    { name: '캐논슈터', group: '모험가', before: 1684, after: 1605 },
    { name: '미하일', group: '시그너스', before: 1968, after: 2174 },
    { name: '소울마스터', group: '시그너스', before: 1550, after: 1490 },
    { name: '플레임위자드', group: '시그너스', before: 2124, after: 1677 },
    { name: '윈드브레이커', group: '시그너스', before: 2521, after: 2060 },
    { name: '나이트워커', group: '시그너스', before: 1318, after: 1134 },
    { name: '스트라이커', group: '시그너스', before: 1236, after: 1035 },
    { name: '아란', group: '영웅', before: 2744, after: 2156 },
    { name: '루미너스', group: '영웅', before: 2833, after: 1822 },
    { name: '에반', group: '영웅', before: 2532, after: 2110 },
    { name: '메르세데스', group: '영웅', before: 2466, after: 1978 },
    { name: '팬텀', group: '영웅', before: 1657, after: 1294 },
    { name: '은월', group: '영웅', before: 1794, after: 1563 },
    { name: '블래스터', group: '레지스탕스', before: 1812, after: 1592 },
    { name: '배틀메이지', group: '레지스탕스', before: 2633, after: 2137 },
    { name: '와일드헌터', group: '레지스탕스', before: 2179, after: 2525 },
    { name: '메카닉', group: '레지스탕스', before: 2833, after: 2198 },
    { name: '제논', group: '레지스탕스', before: 1311, after: 1115 },
    { name: '데몬 슬레이어', group: '레지스탕스', before: 1423, after: 1335 },
    { name: '데몬 어벤져', group: '레지스탕스', before: 2024, after: 1646 },
    { name: '카이저', group: '노바', before: 3221, after: 2639 },
    { name: '카인', group: '노바', before: 2015, after: 1779 },
    { name: '카데나', group: '노바', before: 2057, after: 2156 },
    { name: '엔젤릭버스터', group: '노바', before: 2010, after: 2019 },
    { name: '제로', group: '제로', before: 2595, after: 2205 },
    { name: '키네시스', group: '키네시스', before: 1713, after: 1728 },
    { name: '아델', group: '레프', before: 2526, after: 2086 },
    { name: '일리움', group: '레프', before: 3000, after: 2743 },
    { name: '칼리', group: '레프', before: 2588, after: 2939 },
    { name: '아크', group: '레프', before: 2407, after: 2640 },
    { name: '렌', group: '아니마', before: 2743, after: 3025 },
    { name: '라라', group: '아니마', before: 2356, after: 1791 },
    { name: '호영', group: '아니마', before: 2064, after: 1739 },
];

const dawnData: JobData[] = [
    { name: '히어로', group: '모험가', before: 690, after: 791 },
    { name: '팔라딘', group: '모험가', before: 1741, after: 1546 },
    { name: '다크나이트', group: '모험가', before: 966, after: 886 },
    { name: '아크메이지(불,독)', group: '모험가', before: 914, after: 757 },
    { name: '아크메이지(썬,콜)', group: '모험가', before: 1057, after: 766 },
    { name: '비숍', group: '모험가', before: 969, after: 807 },
    { name: '보우마스터', group: '모험가', before: 1829, after: 2042 },
    { name: '신궁', group: '모험가', before: 1640, after: 1620 },
    { name: '패스파인더', group: '모험가', before: 2290, after: 2003 },
    { name: '나이트로드', group: '모험가', before: 976, after: 971 },
    { name: '섀도어', group: '모험가', before: 1023, after: 932 },
    { name: '듀얼블레이드', group: '모험가', before: 877, after: 857 },
    { name: '바이퍼', group: '모험가', before: 1600, after: 1474 },
    { name: '캡틴', group: '모험가', before: 1470, after: 1339 },
    { name: '캐논슈터', group: '모험가', before: 1129, after: 1100 },
    { name: '미하일', group: '시그너스', before: 1312, after: 1449 },
    { name: '소울마스터', group: '시그너스', before: 1033, after: 994 },
    { name: '플레임위자드', group: '시그너스', before: 1416, after: 1118 },
    { name: '윈드브레이커', group: '시그너스', before: 1681, after: 1373 },
    { name: '나이트워커', group: '시그너스', before: 879, after: 756 },
    { name: '스트라이커', group: '시그너스', before: 824, after: 690 },
    { name: '아란', group: '영웅', before: 1810, after: 1437 },
    { name: '루미너스', group: '영웅', before: 1564, after: 1214 },
    { name: '에반', group: '영웅', before: 1688, after: 1407 },
    { name: '메르세데스', group: '영웅', before: 1644, after: 1318 },
    { name: '팬텀', group: '영웅', before: 1105, after: 863 },
    { name: '은월', group: '영웅', before: 1196, after: 1042 },
    { name: '블래스터', group: '레지스탕스', before: 1208, after: 1061 },
    { name: '배틀메이지', group: '레지스탕스', before: 1756, after: 1424 },
    { name: '와일드헌터', group: '레지스탕스', before: 1453, after: 1684 },
    { name: '메카닉', group: '레지스탕스', before: 1889, after: 1465 },
    { name: '제논', group: '레지스탕스', before: 874, after: 743 },
    { name: '데몬 슬레이어', group: '레지스탕스', before: 949, after: 890 },
    { name: '데몬 어벤져', group: '레지스탕스', before: 1349, after: 1097 },
    { name: '카이저', group: '노바', before: 2147, after: 1760 },
    { name: '카인', group: '노바', before: 1339, after: 1186 },
    { name: '카데나', group: '노바', before: 1371, after: 1437 },
    { name: '엔젤릭버스터', group: '노바', before: 1340, after: 1376 },
    { name: '제로', group: '제로', before: 1730, after: 1470 },
    { name: '키네시스', group: '키네시스', before: 1142, after: 1152 },
    { name: '아델', group: '레프', before: 1684, after: 1391 },
    { name: '일리움', group: '레프', before: 2005, after: 1829 },
    { name: '칼리', group: '레프', before: 1725, after: 1960 },
    { name: '아크', group: '레프', before: 1604, after: 1790 },
    { name: '렌', group: '아니마', before: 1829, after: 1996 },
    { name: '라라', group: '아니마', before: 1571, after: 1194 },
    { name: '호영', group: '아니마', before: 1376, after: 1159 },
];

// ===================== 헬퍼 컴포넌트 =====================

function DiffBadge({ diff }: { diff: number }) {
    if (diff > 0) return (
        <span className="inline-flex items-center gap-0.5 text-green-400 font-bold text-xs whitespace-nowrap">
            <TrendingUp className="w-3 h-3" />+{diff}
        </span>
    );
    if (diff < 0) return (
        <span className="inline-flex items-center gap-0.5 text-red-400 font-bold text-xs whitespace-nowrap">
            <TrendingDown className="w-3 h-3" />{diff}
        </span>
    );
    return (
        <span className="inline-flex items-center gap-0.5 text-slate-400 font-bold text-xs">
            <Minus className="w-3 h-3" />0
        </span>
    );
}

function RankBadge({ rank }: { rank: number }) {
    if (rank === 1) return <span className="text-yellow-400 font-black">🥇 1위</span>;
    if (rank === 2) return <span className="text-slate-300 font-black">🥈 2위</span>;
    if (rank === 3) return <span className="text-amber-600 font-black">🥉 3위</span>;
    return <span className="text-slate-400 font-semibold">{rank}위</span>;
}

// 모바일: 카드형 / sm 이상: 테이블
function DataTable({ data }: { data: JobData[] }) {
    const groups: string[] = [];
    data.forEach(d => { if (!groups.includes(d.group)) groups.push(d.group); });

    return (
        <div className="space-y-6">
            {groups.map(group => (
                <div key={group}>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">{group}</div>

                    {/* 모바일 카드형 */}
                    <div className="sm:hidden space-y-2">
                        {data.filter(d => d.group === group).map(job => {
                            const diff = job.after - job.before;
                            const isUp = diff > 0;
                            const isDown = diff < 0;
                            return (
                                <div
                                    key={job.name}
                                    className={`rounded-xl border px-3 py-2.5 flex items-center justify-between gap-2
                                        ${isUp ? 'bg-green-950/25 border-green-800/40' : isDown ? 'bg-red-950/25 border-red-800/40' : 'bg-slate-800/30 border-slate-700/50'}`}
                                >
                                    <span className="font-semibold text-slate-200 text-sm flex-1 min-w-0 truncate">{job.name}</span>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        <span className="text-slate-500 text-xs">{job.before}</span>
                                        <span className="text-slate-600 text-xs">→</span>
                                        <span className={`font-bold text-sm ${isUp ? 'text-green-400' : isDown ? 'text-red-400' : 'text-slate-300'}`}>
                                            {job.after}
                                        </span>
                                        <DiffBadge diff={diff} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* sm 이상 테이블 */}
                    <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-700">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-800/80 text-slate-400 text-xs">
                                    <th className="text-left px-3 py-2 font-semibold">직업</th>
                                    <th className="text-right px-3 py-2 font-semibold">테섭</th>
                                    <th className="text-right px-3 py-2 font-semibold">본섭</th>
                                    <th className="text-right px-3 py-2 font-semibold">변화</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.filter(d => d.group === group).map(job => {
                                    const diff = job.after - job.before;
                                    const isUp = diff > 0;
                                    const isDown = diff < 0;
                                    return (
                                        <tr
                                            key={job.name}
                                            className={`border-t border-slate-700/50 transition-colors
                                                ${isUp ? 'bg-green-950/20 hover:bg-green-950/30' : isDown ? 'bg-red-950/20 hover:bg-red-950/30' : 'hover:bg-slate-800/30'}`}
                                        >
                                            <td className="px-3 py-2 font-medium text-slate-200">{job.name}</td>
                                            <td className="px-3 py-2 text-right text-slate-400">{job.before.toLocaleString()}</td>
                                            <td className={`px-3 py-2 text-right font-bold ${isUp ? 'text-green-400' : isDown ? 'text-red-400' : 'text-slate-300'}`}>
                                                {job.after.toLocaleString()}
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                                <DiffBadge diff={diff} />
                                            </td>
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

function RankingTable({ data, title, emoji }: { data: JobData[]; title: string; emoji: string }) {
    const sorted = [...data].sort((a, b) => b.after - a.after);
    return (
        <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-200 mb-3 flex items-center gap-2">
                <span className="text-xl sm:text-2xl">{emoji}</span>
                <span>
                    {title} 퍼뎀 순위
                    <span className="text-slate-400 font-normal text-xs sm:text-sm ml-1">(본섭·30레벨)</span>
                </span>
            </h3>

            {/* 모바일 카드형 */}
            <div className="sm:hidden space-y-1.5">
                {sorted.map((job, i) => {
                    const rank = i + 1;
                    const diff = job.after - job.before;
                    const isTop3 = rank <= 3;
                    const isBottom3 = rank >= sorted.length - 2;
                    return (
                        <div
                            key={job.name}
                            className={`rounded-xl px-3 py-2.5 flex items-center gap-2 border
                                ${isTop3 ? 'bg-amber-950/35 border-amber-700/40' : isBottom3 ? 'bg-red-950/20 border-red-900/30' : 'bg-slate-800/30 border-slate-700/40'}`}
                        >
                            <div className="w-10 shrink-0 text-xs font-bold text-center">
                                {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : <span className="text-slate-400">{rank}위</span>}
                            </div>
                            <span className="flex-1 font-semibold text-slate-200 text-sm truncate">{job.name}</span>
                            <span className="font-bold text-white text-sm shrink-0">{job.after.toLocaleString()}</span>
                            <div className="shrink-0">
                                <DiffBadge diff={diff} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* sm 이상 테이블 */}
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-700">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-800/80 text-slate-400 text-xs">
                            <th className="text-left px-3 py-2.5 font-semibold w-16">순위</th>
                            <th className="text-left px-3 py-2.5 font-semibold">직업</th>
                            <th className="text-right px-3 py-2.5 font-semibold">퍼뎀</th>
                            <th className="text-right px-3 py-2.5 font-semibold">변화</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((job, i) => {
                            const rank = i + 1;
                            const diff = job.after - job.before;
                            return (
                                <tr
                                    key={job.name}
                                    className={`border-t border-slate-700/50 transition-colors
                                        ${rank <= 3 ? 'bg-amber-950/30' : rank >= sorted.length - 2 ? 'bg-red-950/10' : 'hover:bg-slate-800/30'}`}
                                >
                                    <td className="px-3 py-2.5"><RankBadge rank={rank} /></td>
                                    <td className="px-3 py-2.5 font-semibold text-slate-200">{job.name}</td>
                                    <td className="px-3 py-2.5 text-right font-bold text-white">{job.after.toLocaleString()}</td>
                                    <td className="px-3 py-2.5 text-right"><DiffBadge diff={diff} /></td>
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
    const fountainUpJobs = [...fountainData]
        .filter(j => j.after > j.before)
        .sort((a, b) => (b.after - b.before) - (a.after - a.before))
        .slice(0, 5);
    const fountainDownJobs = [...fountainData]
        .filter(j => j.after < j.before)
        .sort((a, b) => (a.after - a.before) - (b.after - b.before))
        .slice(0, 5);

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
                        테섭→본섭 데미지 조정 총정리
                    </h1>

                    <p className="text-xs sm:text-base text-slate-300 leading-relaxed mb-5">
                        메이플스토리 최종 공용코어 <strong className="text-white">파운틴</strong>,{' '}
                        <strong className="text-white">야누스(황혼·새벽)</strong>의 테스트서버 → 본서버 반영 시
                        데미지 조정 수치를 전 직업 기준으로 정리했습니다. (30레벨 기준)
                    </p>

                    {/* 코어 요약 칩 — 모바일 가로 스크롤 */}
                    <div className="flex sm:grid sm:grid-cols-3 gap-2 sm:gap-3 mb-5 sm:mb-7 overflow-x-auto pb-1 sm:pb-0 -mx-3 px-3 sm:mx-0 sm:px-0">
                        {[
                            { emoji: '💧', label: '파운틴', desc: '지속딜 코어', cls: 'from-cyan-900/40 to-blue-900/40 border-cyan-500/40 text-cyan-300' },
                            { emoji: '🌅', label: '황혼 (사출기)', desc: '사출형 코어', cls: 'from-orange-900/40 to-red-900/40 border-orange-500/40 text-orange-300' },
                            { emoji: '🌙', label: '새벽 (설치기)', desc: '설치형 코어', cls: 'from-indigo-900/40 to-purple-900/40 border-indigo-500/40 text-indigo-300' },
                        ].map(c => (
                            <div key={c.label} className={`bg-gradient-to-br ${c.cls} border rounded-xl p-3 sm:p-4 shrink-0 w-36 sm:w-auto`}>
                                <div className="text-xl sm:text-2xl mb-1">{c.emoji}</div>
                                <div className={`font-bold text-xs sm:text-sm ${c.cls.split(' ').pop()}`}>{c.label}</div>
                                <div className="text-xs text-slate-400 mt-0.5">{c.desc}</div>
                            </div>
                        ))}
                    </div>

                    {/* 파운틴 주요 변동 */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-5 sm:mb-7">
                        <h2 className="text-sm sm:text-base font-bold text-white mb-3">⚡ 파운틴 주요 변동 (상위 5 ↑↓)</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <div className="text-xs text-green-400 font-bold mb-2">📈 많이 오른 직업</div>
                                <div className="space-y-1">
                                    {fountainUpJobs.map(j => (
                                        <div key={j.name} className="flex items-center justify-between text-xs bg-green-950/30 rounded-lg px-2.5 py-1.5 gap-1">
                                            <span className="font-semibold text-slate-200 truncate">{j.name}</span>
                                            <span className="text-green-400 font-bold shrink-0">+{j.after - j.before}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-red-400 font-bold mb-2">📉 많이 내린 직업</div>
                                <div className="space-y-1">
                                    {fountainDownJobs.map(j => (
                                        <div key={j.name} className="flex items-center justify-between text-xs bg-red-950/30 rounded-lg px-2.5 py-1.5 gap-1">
                                            <span className="font-semibold text-slate-200 truncate">{j.name}</span>
                                            <span className="text-red-400 font-bold shrink-0">{j.after - j.before}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── 파운틴 ── */}
                <section className="mb-10 sm:mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 bg-cyan-500 rounded-full" />
                        <h2 className="text-base sm:text-2xl font-black text-cyan-400">💧 파운틴 — 테섭 vs 본섭</h2>
                    </div>
                    <DataTable data={fountainData} />
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* ── 황혼 ── */}
                <section className="mb-10 sm:mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 bg-orange-500 rounded-full" />
                        <h2 className="text-base sm:text-2xl font-black text-orange-400">🌅 황혼 (사출기) — 테섭 vs 본섭</h2>
                    </div>
                    <DataTable data={janusData} />
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* ── 새벽 ── */}
                <section className="mb-10 sm:mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 bg-indigo-500 rounded-full" />
                        <h2 className="text-base sm:text-2xl font-black text-indigo-400">🌙 새벽 (설치기) — 테섭 vs 본섭</h2>
                    </div>
                    <DataTable data={dawnData} />
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* ── 최종 퍼뎀 순위 ── */}
                <section className="mb-10 sm:mb-16">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-6 bg-yellow-500 rounded-full" />
                        <h2 className="text-base sm:text-2xl font-black text-yellow-400">🏆 최종 퍼뎀 순위</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 mb-6">각 코어별 직업 퍼뎀 순위 (본섭 기준, 30레벨)</p>

                    <div className="space-y-10 sm:space-y-12">
                        <RankingTable data={fountainData} title="파운틴" emoji="💧" />
                        <RankingTable data={janusData} title="야누스 황혼 (사출기)" emoji="🌅" />
                        <RankingTable data={dawnData} title="야누스 새벽 (설치기)" emoji="🌙" />
                    </div>
                </section>

                {/* ── 참고 사항 ── */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-slate-800/50 border border-purple-500/30 rounded-2xl p-4 sm:p-6">
                        <h3 className="text-sm sm:text-base font-bold text-purple-300 mb-2">📌 참고 사항</h3>
                        <ul className="space-y-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                            <li>• 위 수치는 공용코어 <strong>30레벨</strong> 기준 퍼딜(%)입니다.</li>
                            <li>• <strong className="text-cyan-300">파운틴</strong>은 지속 딜링, <strong className="text-orange-300">황혼</strong>은 사출형, <strong className="text-indigo-300">새벽</strong>은 설치형 코어입니다.</li>
                            <li>• 테섭 대비 본섭에서 하향된 직업이 다수이므로 세팅 전 반드시 확인해 주세요.</li>
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
