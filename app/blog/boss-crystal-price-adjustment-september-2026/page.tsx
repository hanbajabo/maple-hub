'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Calendar, ArrowLeft, Sparkles, TrendingDown, AlertCircle, 
    Coins, ArrowRight, Search, Clock, ShieldAlert, DollarSign,
    Calculator, Flame, CheckCircle2, ChevronRight
} from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

interface BossCrystal {
    boss: string;
    diff: string;
    oldPrice: number;
    newPrice: number;
    rate: number;
    category: 'sub' | 'hard' | 'grandis';
    note?: string;
}

const BOSS_CRYSTALS: BossCrystal[] = [
    // -50% 주간 보스돌이 라인
    { boss: '자쿰', diff: '카오스', oldPrice: 8080000, newPrice: 4040000, rate: -50.0, category: 'sub' },
    { boss: '피에르', diff: '카오스', oldPrice: 8170000, newPrice: 4080000, rate: -50.1, category: 'sub' },
    { boss: '반반', diff: '카오스', oldPrice: 8150000, newPrice: 4070000, rate: -50.1, category: 'sub' },
    { boss: '블러디퀸', diff: '카오스', oldPrice: 8140000, newPrice: 4070000, rate: -50.0, category: 'sub' },
    { boss: '벨룸', diff: '카오스', oldPrice: 9280000, newPrice: 4640000, rate: -50.0, category: 'sub' },
    { boss: '매그너스', diff: '하드', oldPrice: 8560000, newPrice: 4280000, rate: -50.0, category: 'sub' },
    { boss: '파풀라투스', diff: '카오스', oldPrice: 13100000, newPrice: 6550000, rate: -50.0, category: 'sub' },
    { boss: '스우', diff: '노멀', oldPrice: 16700000, newPrice: 8350000, rate: -50.0, category: 'sub' },
    { boss: '데미안', diff: '노멀', oldPrice: 17500000, newPrice: 8750000, rate: -50.0, category: 'sub' },
    { boss: '가디언 엔젤 슬라임', diff: '노멀', oldPrice: 25500000, newPrice: 12700000, rate: -50.2, category: 'sub' },
    { boss: '루시드', diff: '이지', oldPrice: 29800000, newPrice: 14900000, rate: -50.0, category: 'sub' },
    { boss: '윌', diff: '이지', oldPrice: 32300000, newPrice: 16100000, rate: -50.2, category: 'sub' },
    { boss: '루시드', diff: '노멀', oldPrice: 35600000, newPrice: 17800000, rate: -50.0, category: 'sub' },
    { boss: '윌', diff: '노멀', oldPrice: 41100000, newPrice: 20500000, rate: -50.1, category: 'sub' },
    { boss: '더스크', diff: '노멀', oldPrice: 44000000, newPrice: 22000000, rate: -50.0, category: 'sub' },
    { boss: '듄켈', diff: '노멀', oldPrice: 47500000, newPrice: 23700000, rate: -50.1, category: 'sub' },

    // -5% 하드 보스 방어 라인
    { boss: '데미안', diff: '하드', oldPrice: 48900000, newPrice: 46400000, rate: -5.1, category: 'hard' },
    { boss: '스우', diff: '하드', oldPrice: 51500000, newPrice: 48900000, rate: -5.0, category: 'hard' },
    { boss: '진 힐라', diff: '노멀', oldPrice: 71200000, newPrice: 67600000, rate: -5.1, category: 'hard' },
    { boss: '루시드', diff: '하드', oldPrice: 62900000, newPrice: 59700000, rate: -5.1, category: 'hard' },
    { boss: '더스크', diff: '카오스', oldPrice: 69800000, newPrice: 66300000, rate: -5.0, category: 'hard' },
    { boss: '가디언 엔젤 슬라임', diff: '카오스', oldPrice: 75100000, newPrice: 71300000, rate: -5.1, category: 'hard' },
    { boss: '윌', diff: '하드', oldPrice: 77100000, newPrice: 73200000, rate: -5.1, category: 'hard' },
    { boss: '듄켈', diff: '하드', oldPrice: 94400000, newPrice: 89600000, rate: -5.1, category: 'hard' },
    { boss: '진 힐라', diff: '하드', oldPrice: 106000000, newPrice: 100000000, rate: -5.7, category: 'hard' },

    // 그란디스 & 엔드 보스 라인
    { boss: '선택받은 세렌', diff: '노멀', oldPrice: 239000000, newPrice: 167000000, rate: -30.1, category: 'grandis', note: '대폭 하향' },
    { boss: '감시자 칼로스', diff: '이지', oldPrice: 280000000, newPrice: 238000000, rate: -15.0, category: 'grandis' },
    { boss: '최초의 대적자', diff: '이지', oldPrice: 308000000, newPrice: 261000000, rate: -15.3, category: 'grandis' },
    { boss: '선택받은 세렌', diff: '하드', oldPrice: 356000000, newPrice: 302000000, rate: -15.2, category: 'grandis' },
    { boss: '카링', diff: '이지', oldPrice: 377000000, newPrice: 320000000, rate: -15.1, category: 'grandis' },
    { boss: '벨로나', diff: '이지', oldPrice: 440000000, newPrice: 396000000, rate: -10.0, category: 'grandis' },
    { boss: '검은 마법사', diff: '하드', oldPrice: 665000000, newPrice: 465000000, rate: -30.1, category: 'grandis', note: '10/1(목)부터 적용' },
    { boss: '감시자 칼로스', diff: '노멀', oldPrice: 505000000, newPrice: 479000000, rate: -5.1, category: 'grandis' },
    { boss: '최초의 대적자', diff: '노멀', oldPrice: 560000000, newPrice: 532000000, rate: -5.0, category: 'grandis' },
    { boss: '스우', diff: '익스트림', oldPrice: 574000000, newPrice: 545000000, rate: -5.1, category: 'grandis' },
    { boss: '카링', diff: '노멀', oldPrice: 678000000, newPrice: 576000000, rate: -15.0, category: 'grandis' },
    { boss: '찬란한 흉성', diff: '노멀', oldPrice: 625000000, newPrice: 593000000, rate: -5.1, category: 'grandis' },
    { boss: '벨로나', diff: '노멀', oldPrice: 850000000, newPrice: 824000000, rate: -3.1, category: 'grandis' },
    { boss: '림보', diff: '노멀', oldPrice: 1026000000, newPrice: 995000000, rate: -3.0, category: 'grandis' },
    { boss: '감시자 칼로스', diff: '카오스', oldPrice: 1273000000, newPrice: 1230000000, rate: -3.4, category: 'grandis' },
    { boss: '발드릭스', diff: '노멀', oldPrice: 1368000000, newPrice: 1320000000, rate: -3.5, category: 'grandis' },
    { boss: '최초의 대적자', diff: '하드', oldPrice: 1435000000, newPrice: 1390000000, rate: -3.1, category: 'grandis' },
    { boss: '유피테르', diff: '노멀', oldPrice: 1615000000, newPrice: 1560000000, rate: -3.4, category: 'grandis' },
    { boss: '카링', diff: '하드', oldPrice: 1739000000, newPrice: 1560000000, rate: -10.3, category: 'grandis' },
    { boss: '선택받은 세렌', diff: '익스트림', oldPrice: 2835000000, newPrice: 1840000000, rate: -35.1, category: 'grandis', note: '대폭 하향' },
    { boss: '검은 마법사', diff: '익스트림', oldPrice: 8740000000, newPrice: 5680000000, rate: -35.0, category: 'grandis', note: '10/1(목)부터 적용' },
];

function formatMeso(amount: number) {
    if (amount >= 100000000) {
        const eok = Math.floor(amount / 100000000);
        const man = Math.floor((amount % 100000000) / 10000);
        return man > 0 ? `${eok}억 ${man.toLocaleString()}만` : `${eok}억`;
    }
    const man = Math.floor(amount / 10000);
    return `${man.toLocaleString()}만`;
}

export default function BossCrystalPriceAdjustmentPage() {
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredList = BOSS_CRYSTALS.filter(item => {
        if (filterCategory !== 'all' && item.category !== filterCategory) return false;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const fullStr = `${item.boss} ${item.diff}`.toLowerCase();
            return fullStr.includes(q);
        }
        return true;
    });

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-10">
                {/* 상단 네비게이션 */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/blog"
                        prefetch={false}
                        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        블로그 목록으로
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                            보스 결정석 가격 조정
                        </span>
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            9월 17일 본섭 적용
                        </span>
                    </div>
                </div>

                {/* 타이틀 헤더 */}
                <div className="space-y-4 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
                        <TrendingDown className="w-4 h-4" />
                        2026년 9월 메이플 경제 대변화 분석
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight break-keep">
                        💰 【9월 17일】 메이플 보스 결정석 가격 조정 완벽 정리
                    </h1>
                    <p className="text-sm sm:text-base text-slate-400 break-keep leading-relaxed">
                        9월 17일(목) 점검 후 본서버에 적용되는 보스 강렬한 힘의 결정 판매 가격 조정 총정리입니다.
                        카루타부터 노말 더스크/듄켈까지 주간 보스돌이 라인이 전면 <strong>-50% 반토막</strong> 너프되며,
                        노말 세렌(-30.1%), 익스 세렌(-35.1%), 검은 마법사(-30.1% ~ -35.0%)까지 대규모 가격 인하가 단행됩니다.
                        목요일 점검 전 막차 정산 꿀팁과 보스별 변동 내역을 한눈에 확인하세요.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-800">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            2026년 9월 10일 발표
                        </span>
                        <span>•</span>
                        <span className="text-amber-400 font-semibold">적용일: 2026.09.17(목) / 검마는 10.01(목)</span>
                        <span>•</span>
                        <span>읽는 시간 약 6분</span>
                    </div>
                </div>

                {/* 구글 애드센스 상단 광고 */}
                <InArticleAd dataAdSlot="6849727140" />

                {/* 📌 핵심 4대 요약 카드 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 1. 카룻~노말더듄 50% 반토막 */}
                    <div className="bg-slate-900/80 border border-red-500/30 rounded-2xl p-5 space-y-2 relative overflow-hidden">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400">
                                <Coins className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-xs text-red-400 font-bold">주간 보스돌이 직격탄</span>
                                <h3 className="font-bold text-white text-base">카룻 ~ 노말 더듄 -50% 반토막</h3>
                            </div>
                        </div>
                        <p className="text-xs text-slate-300 break-keep leading-relaxed pt-1">
                            카루타 4종, 하드 매그너스, 카파풀, 노말 스데미, 이지/노말 루윌, 노말 더스크/듄켈까지 **정확히 50% 일괄 삭감**됩니다. 주간 부캐 보스돌이 수익이 절반으로 감소합니다.
                        </p>
                    </div>

                    {/* 2. 상위 하드 보스 방어 */}
                    <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-5 space-y-2 relative overflow-hidden">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                                <ShieldAlert className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-xs text-emerald-400 font-bold">상대적 가격 방어</span>
                                <h3 className="font-bold text-white text-base">하드 스데미 ~ 하드 진힐라 -5%</h3>
                            </div>
                        </div>
                        <p className="text-xs text-slate-300 break-keep leading-relaxed pt-1">
                            하드 스우/데미안, 하드 루시드/윌, 카더듄, 하드 진힐라 등 본격 상위 하드 보스는 **-5.0% ~ -5.7%**로 소폭 인하되어 상대적으로 타격이 적습니다.
                        </p>
                    </div>

                    {/* 3. 세렌 & 검마 대폭 하향 */}
                    <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-5 space-y-2 relative overflow-hidden">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                                <Flame className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-xs text-amber-400 font-bold">고스펙 구간 대폭 조정</span>
                                <h3 className="font-bold text-white text-base">세렌 & 검은 마법사 -30% ~ -35%</h3>
                            </div>
                        </div>
                        <p className="text-xs text-slate-300 break-keep leading-relaxed pt-1">
                            노말 세렌(-30.1%), 하드 검마(-30.1%), 익스 세렌(-35.1%), 익스 검마(-35.0%) 등 대형 보스들의 결정석 가격이 크게 축소됩니다.
                        </p>
                    </div>

                    {/* 4. 점검 전 막차 정산 꿀팁 */}
                    <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-5 space-y-2 relative overflow-hidden">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-xs text-cyan-400 font-bold">필수 체크포인트</span>
                                <h3 className="font-bold text-white text-base">9월 17일(목) 점검 전 막차 정산!</h3>
                            </div>
                        </div>
                        <p className="text-xs text-slate-300 break-keep leading-relaxed pt-1">
                            9월 17일 목요일 자정(00:00) 주간 보스 초기화 후 **점검 시작 전까지 클리어하여 결정석을 판매하면 기존 높은 가격으로 수령**할 수 있습니다!
                        </p>
                    </div>
                </div>

                {/* 💡 검은 마법사 적용 일정 안내 배너 */}
                <div className="bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-400" />
                            <span className="text-xs font-bold text-red-300">검은 마법사 유저 필독!</span>
                        </div>
                        <h4 className="text-base font-bold text-white">
                            검은 마법사(하드·익스트림) 결정 판매 가격은 <span className="text-amber-300 underline">2026년 10월 1일(목)</span>부터 적용됩니다.
                        </h4>
                        <p className="text-xs text-slate-400 break-keep">
                            월간 보스 특성상 9월 중 클리어한 검은 마법사는 9월 17일 패치 이후에 판매하더라도 기존 가격(하드 6.65억 / 익스 87.4억)이 유지됩니다.
                        </p>
                    </div>
                    <span className="shrink-0 px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold">
                        10월 1일 적용
                    </span>
                </div>

                {/* 🔍 보스 결정석 필터 & 검색 */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                        {/* 탭 필터 */}
                        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                            {[
                                { id: 'all', label: '전체 보스' },
                                { id: 'sub', label: '📉 -50% 반토막 (카룻~더듄)' },
                                { id: 'hard', label: '🛡️ -5% 방어 (하드스데~진)' },
                                { id: 'grandis', label: '⚡ 그란디스 & 엔드' },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setFilterCategory(tab.id)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                        filterCategory === tab.id
                                            ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* 검색창 */}
                        <div className="relative w-full sm:w-64">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="보스명 검색 (예: 세렌, 스우, 루시드)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* 보스 결정석 리스트 테이블 */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs sm:text-sm">
                                <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 font-bold uppercase">
                                    <tr>
                                        <th className="py-3 px-4">보스 / 난이도</th>
                                        <th className="py-3 px-4 text-right">기존 가격</th>
                                        <th className="py-3 px-4 text-right">변경 가격</th>
                                        <th className="py-3 px-4 text-right">변동폭</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {filteredList.map((item, idx) => {
                                        const isBigDrop = item.rate <= -30;
                                        return (
                                            <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                                                <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                                                    <span>{item.boss}</span>
                                                    <span className={`text-[11px] px-1.5 py-0.5 rounded font-bold ${
                                                        item.diff === '익스트림'
                                                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                                            : item.diff === '하드' || item.diff === '카오스'
                                                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                                    }`}>
                                                        {item.diff}
                                                    </span>
                                                    {item.note && (
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold">
                                                            {item.note}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-right text-slate-400 font-mono">
                                                    {formatMeso(item.oldPrice)} 메소
                                                </td>
                                                <td className="py-3 px-4 text-right font-bold font-mono text-white">
                                                    {formatMeso(item.newPrice)} 메소
                                                </td>
                                                <td className="py-3 px-4 text-right font-black font-mono">
                                                    <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                                                        isBigDrop
                                                            ? 'bg-red-500/20 text-red-400 border border-red-500/30 font-extrabold'
                                                            : item.rate <= -10
                                                            ? 'bg-amber-500/20 text-amber-400'
                                                            : 'bg-slate-800 text-slate-300'
                                                    }`}>
                                                        {item.rate.toFixed(1)}%
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 📉 부캐 보스돌이 수익 변화 체감 시뮬레이션 */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-amber-400" />
                        <h2 className="text-lg sm:text-xl font-bold text-white">
                            부캐 주간 보스돌이 수익 변화 체감 시뮬레이션
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        {/* 3카 5앱 / 카룻돌이 (4카룻 + 하매 + 카파풀) */}
                        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                            <h4 className="font-bold text-white flex items-center justify-between">
                                <span>주간 카룻돌이 (4카룻 + 하매 + 카파풀)</span>
                                <span className="text-red-400 font-black">-50%</span>
                            </h4>
                            <div className="space-y-1 text-slate-400 font-mono">
                                <div className="flex justify-between">
                                    <span>기존 주간 수익:</span>
                                    <span className="text-slate-200">약 5,500만 메소</span>
                                </div>
                                <div className="flex justify-between font-bold text-amber-400">
                                    <span>패치 후 수익:</span>
                                    <span>약 2,750만 메소</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                                캐릭터 5개 운용 시 주당 2.75억 ➔ 1.37억으로 약 1.38억 메소 감소
                            </p>
                        </div>

                        {/* 노말 스데미 + 가엔슬 라인 */}
                        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                            <h4 className="font-bold text-white flex items-center justify-between">
                                <span>주간 스데돌이 (4카룻 + 스데 + 가엔슬)</span>
                                <span className="text-red-400 font-black">-50%</span>
                            </h4>
                            <div className="space-y-1 text-slate-400 font-mono">
                                <div className="flex justify-between">
                                    <span>기존 주간 수익:</span>
                                    <span className="text-slate-200">약 1억 1,500만 메소</span>
                                </div>
                                <div className="flex justify-between font-bold text-amber-400">
                                    <span>패치 후 수익:</span>
                                    <span>약 5,750만 메소</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
                                캐릭터 5개 운용 시 주당 5.75억 ➔ 2.87억으로 약 2.88억 메소 감소
                            </p>
                        </div>
                    </div>
                </div>

                {/* 중간 광고 */}
                <InArticleAd dataAdSlot="6849727140" />

                {/* 🔗 추천 관련 포스트 링크 */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-amber-400" />
                        함께 읽으면 좋은 9월 17일 업데이트 소식
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link
                            href="/blog/testworld-skill-balance-sep-17-2026"
                            prefetch={false}
                            className="group p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-red-500/50 rounded-xl transition-all flex flex-col justify-between"
                        >
                            <div className="space-y-1">
                                <span className="text-xs text-red-400 font-semibold">스킬 밸런스 총정리</span>
                                <h4 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors break-keep">
                                    ⚔️ 【테섭 1.2.206】 전직업 스킬 조정 & 연무장 개편 총정리 (46개 직업)
                                </h4>
                            </div>
                            <span className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                자세히 보기 <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                        </Link>

                        <Link
                            href="/blog/testworld-update-1-2-206"
                            prefetch={false}
                            className="group p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-xl transition-all flex flex-col justify-between"
                        >
                            <div className="space-y-1">
                                <span className="text-xs text-amber-400 font-semibold">9월 17일 전체 패치노트</span>
                                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors break-keep">
                                    🧪 퍼스널 버닝·어빌리티 개편·소울웨폰·탐험코인 총정리
                                </h4>
                            </div>
                            <span className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                자세히 보기 <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
