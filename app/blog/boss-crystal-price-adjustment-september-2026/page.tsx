'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Calendar, ArrowLeft, Sparkles, TrendingDown, AlertCircle, 
    Coins, ArrowRight, Search, Clock, ShieldAlert, DollarSign,
    Calculator, Flame, CheckCircle2, RotateCcw, X, Check, Users
} from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

interface BossDiffOption {
    diff: string;
    oldPrice: number;
    newPrice: number;
    rate: number;
    note?: string;
}

interface GroupedBoss {
    id: string;
    name: string;
    category: 'sub' | 'hard' | 'grandis';
    categoryLabel: string;
    options: BossDiffOption[];
}

const GROUPED_BOSSES: GroupedBoss[] = [
    {
        id: 'zakum',
        name: '자쿰',
        category: 'sub',
        categoryLabel: '카루타 라인',
        options: [
            { diff: '카오스', oldPrice: 8080000, newPrice: 4040000, rate: -50.0 }
        ]
    },
    {
        id: 'pierre',
        name: '피에르',
        category: 'sub',
        categoryLabel: '카루타 라인',
        options: [
            { diff: '카오스', oldPrice: 8170000, newPrice: 4080000, rate: -50.1 }
        ]
    },
    {
        id: 'banban',
        name: '반반',
        category: 'sub',
        categoryLabel: '카루타 라인',
        options: [
            { diff: '카오스', oldPrice: 8150000, newPrice: 4070000, rate: -50.1 }
        ]
    },
    {
        id: 'bloodyqueen',
        name: '블러디퀸',
        category: 'sub',
        categoryLabel: '카루타 라인',
        options: [
            { diff: '카오스', oldPrice: 8140000, newPrice: 4070000, rate: -50.0 }
        ]
    },
    {
        id: 'vellum',
        name: '벨룸',
        category: 'sub',
        categoryLabel: '카루타 라인',
        options: [
            { diff: '카오스', oldPrice: 9280000, newPrice: 4640000, rate: -50.0 }
        ]
    },
    {
        id: 'magnus',
        name: '매그너스',
        category: 'sub',
        categoryLabel: '주간 하위',
        options: [
            { diff: '하드', oldPrice: 8560000, newPrice: 4280000, rate: -50.0 }
        ]
    },
    {
        id: 'papulatus',
        name: '파풀라투스',
        category: 'sub',
        categoryLabel: '주간 하위',
        options: [
            { diff: '카오스', oldPrice: 13100000, newPrice: 6550000, rate: -50.0 }
        ]
    },
    {
        id: 'suu',
        name: '스우',
        category: 'sub',
        categoryLabel: '스데미 라인',
        options: [
            { diff: '노멀', oldPrice: 16700000, newPrice: 8350000, rate: -50.0 },
            { diff: '하드', oldPrice: 51500000, newPrice: 48900000, rate: -5.0 },
            { diff: '익스트림', oldPrice: 574000000, newPrice: 545000000, rate: -5.1 }
        ]
    },
    {
        id: 'demian',
        name: '데미안',
        category: 'sub',
        categoryLabel: '스데미 라인',
        options: [
            { diff: '노멀', oldPrice: 17500000, newPrice: 8750000, rate: -50.0 },
            { diff: '하드', oldPrice: 48900000, newPrice: 46400000, rate: -5.1 }
        ]
    },
    {
        id: 'slime',
        name: '가디언 엔젤 슬라임',
        category: 'sub',
        categoryLabel: '가엔슬',
        options: [
            { diff: '노멀', oldPrice: 25500000, newPrice: 12700000, rate: -50.2 },
            { diff: '카오스', oldPrice: 75100000, newPrice: 71300000, rate: -5.1 }
        ]
    },
    {
        id: 'lucid',
        name: '루시드',
        category: 'sub',
        categoryLabel: '루윌 라인',
        options: [
            { diff: '이지', oldPrice: 29800000, newPrice: 14900000, rate: -50.0 },
            { diff: '노멀', oldPrice: 35600000, newPrice: 17800000, rate: -50.0 },
            { diff: '하드', oldPrice: 62900000, newPrice: 59700000, rate: -5.1 }
        ]
    },
    {
        id: 'will',
        name: '윌',
        category: 'sub',
        categoryLabel: '루윌 라인',
        options: [
            { diff: '이지', oldPrice: 32300000, newPrice: 16100000, rate: -50.2 },
            { diff: '노멀', oldPrice: 41100000, newPrice: 20500000, rate: -50.1 },
            { diff: '하드', oldPrice: 77100000, newPrice: 73200000, rate: -5.1 }
        ]
    },
    {
        id: 'dusk',
        name: '더스크',
        category: 'sub',
        categoryLabel: '더듄 라인',
        options: [
            { diff: '노멀', oldPrice: 44000000, newPrice: 22000000, rate: -50.0 },
            { diff: '카오스', oldPrice: 69800000, newPrice: 66300000, rate: -5.0 }
        ]
    },
    {
        id: 'dunkel',
        name: '듄켈',
        category: 'sub',
        categoryLabel: '더듄 라인',
        options: [
            { diff: '노멀', oldPrice: 47500000, newPrice: 23700000, rate: -50.1 },
            { diff: '하드', oldPrice: 94400000, newPrice: 89600000, rate: -5.1 }
        ]
    },
    {
        id: 'jinhilla',
        name: '진 힐라',
        category: 'hard',
        categoryLabel: '검마 전초전',
        options: [
            { diff: '노멀', oldPrice: 71200000, newPrice: 67600000, rate: -5.1 },
            { diff: '하드', oldPrice: 106000000, newPrice: 100000000, rate: -5.7 }
        ]
    },
    {
        id: 'seren',
        name: '선택받은 세렌',
        category: 'grandis',
        categoryLabel: '그란디스',
        options: [
            { diff: '노멀', oldPrice: 239000000, newPrice: 167000000, rate: -30.1, note: '대폭 하향' },
            { diff: '하드', oldPrice: 356000000, newPrice: 302000000, rate: -15.2 },
            { diff: '익스트림', oldPrice: 2835000000, newPrice: 1840000000, rate: -35.1, note: '대폭 하향' }
        ]
    },
    {
        id: 'kalos',
        name: '감시자 칼로스',
        category: 'grandis',
        categoryLabel: '그란디스',
        options: [
            { diff: '이지', oldPrice: 280000000, newPrice: 238000000, rate: -15.0 },
            { diff: '노멀', oldPrice: 505000000, newPrice: 479000000, rate: -5.1 },
            { diff: '카오스', oldPrice: 1273000000, newPrice: 1230000000, rate: -3.4 }
        ]
    },
    {
        id: 'adversary',
        name: '최초의 대적자',
        category: 'grandis',
        categoryLabel: '그란디스',
        options: [
            { diff: '이지', oldPrice: 308000000, newPrice: 261000000, rate: -15.3 },
            { diff: '노멀', oldPrice: 560000000, newPrice: 532000000, rate: -5.0 },
            { diff: '하드', oldPrice: 1435000000, newPrice: 1390000000, rate: -3.1 }
        ]
    },
    {
        id: 'kaling',
        name: '카링',
        category: 'grandis',
        categoryLabel: '그란디스',
        options: [
            { diff: '이지', oldPrice: 377000000, newPrice: 320000000, rate: -15.1 },
            { diff: '노멀', oldPrice: 678000000, newPrice: 576000000, rate: -15.0 },
            { diff: '하드', oldPrice: 1739000000, newPrice: 1560000000, rate: -10.3 }
        ]
    },
    {
        id: 'bellona',
        name: '벨로나',
        category: 'grandis',
        categoryLabel: '그란디스',
        options: [
            { diff: '이지', oldPrice: 440000000, newPrice: 396000000, rate: -10.0 },
            { diff: '노멀', oldPrice: 850000000, newPrice: 824000000, rate: -3.1 }
        ]
    },
    {
        id: 'hyungsung',
        name: '찬란한 흉성',
        category: 'grandis',
        categoryLabel: '그란디스',
        options: [
            { diff: '노멀', oldPrice: 625000000, newPrice: 593000000, rate: -5.1 }
        ]
    },
    {
        id: 'limbo',
        name: '림보',
        category: 'grandis',
        categoryLabel: '엔드 보스',
        options: [
            { diff: '노멀', oldPrice: 1026000000, newPrice: 995000000, rate: -3.0 }
        ]
    },
    {
        id: 'baldrix',
        name: '발드릭스',
        category: 'grandis',
        categoryLabel: '엔드 보스',
        options: [
            { diff: '노멀', oldPrice: 1368000000, newPrice: 1320000000, rate: -3.5 }
        ]
    },
    {
        id: 'jupiter',
        name: '유피테르',
        category: 'grandis',
        categoryLabel: '엔드 보스',
        options: [
            { diff: '노멀', oldPrice: 1615000000, newPrice: 1560000000, rate: -3.4 }
        ]
    },
    {
        id: 'blackmage',
        name: '검은 마법사',
        category: 'grandis',
        categoryLabel: '월간 보스 (10/1 적용)',
        options: [
            { diff: '하드', oldPrice: 665000000, newPrice: 465000000, rate: -30.1, note: '10/1 적용' },
            { diff: '익스트림', oldPrice: 8740000000, newPrice: 5680000000, rate: -35.0, note: '10/1 적용' }
        ]
    }
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

function formatRawNumber(amount: number) {
    return amount.toLocaleString();
}

export default function BossCrystalPriceAdjustmentPage() {
    // 12개 보스 선택 시뮬레이터 상태 (key: bossId, value: diff)
    // 메이플스토리 규칙: 같은 보스는 중복 격파 불가하므로 bossId당 1개의 diff만 선택됨
    const [selectedBosses, setSelectedBosses] = useState<Record<string, string>>({
        zakum: '카오스',
        pierre: '카오스',
        banban: '카오스',
        bloodyqueen: '카오스',
        vellum: '카오스',
        magnus: '하드',
        papulatus: '카오스',
        suu: '노멀',
        demian: '노멀',
        slime: '노멀',
        lucid: '노멀',
        will: '노멀'
    });

    const [charCount, setCharCount] = useState<number>(1);
    const [limitWarning, setLimitWarning] = useState<boolean>(false);

    // 보스 난이도 선택 토글
    const handleSelectDiff = (bossId: string, diff: string) => {
        setLimitWarning(false);
        if (selectedBosses[bossId] === diff) {
            // 이미 선택된 상태면 해제
            const next = { ...selectedBosses };
            delete next[bossId];
            setSelectedBosses(next);
            return;
        }

        // 새로운 보스를 추가하려는 경우 12개 초과 체크
        const currentCount = Object.keys(selectedBosses).length;
        const isNewBoss = !selectedBosses[bossId];
        if (isNewBoss && currentCount >= 12) {
            setLimitWarning(true);
            setTimeout(() => setLimitWarning(false), 3000);
            return;
        }

        // 같은 보스 내에서 난이도 교체 또는 신규 선택
        setSelectedBosses(prev => ({
            ...prev,
            [bossId]: diff
        }));
    };

    // 보스 단일 해제
    const removeBoss = (bossId: string) => {
        const next = { ...selectedBosses };
        delete next[bossId];
        setSelectedBosses(next);
    };

    // 프리셋 적용 함수
    const applyPreset = (preset: 'karoota' | 'seday' | 'luwill' | 'hardboss' | 'clear') => {
        setLimitWarning(false);
        if (preset === 'clear') {
            setSelectedBosses({});
            return;
        }
        if (preset === 'karoota') {
            setSelectedBosses({
                zakum: '카오스',
                pierre: '카오스',
                banban: '카오스',
                bloodyqueen: '카오스',
                vellum: '카오스',
                magnus: '하드',
                papulatus: '카오스'
            });
        } else if (preset === 'seday') {
            setSelectedBosses({
                zakum: '카오스',
                pierre: '카오스',
                banban: '카오스',
                bloodyqueen: '카오스',
                vellum: '카오스',
                magnus: '하드',
                papulatus: '카오스',
                suu: '노멀',
                demian: '노멀',
                slime: '노멀'
            });
        } else if (preset === 'luwill') {
            setSelectedBosses({
                vellum: '카오스',
                papulatus: '카오스',
                suu: '하드',
                demian: '하드',
                slime: '카오스',
                lucid: '노멀',
                will: '노멀',
                dusk: '노멀',
                dunkel: '노멀',
                jinhilla: '노멀'
            });
        } else if (preset === 'hardboss') {
            setSelectedBosses({
                suu: '하드',
                demian: '하드',
                slime: '카오스',
                lucid: '하드',
                will: '하드',
                dusk: '카오스',
                dunkel: '하드',
                jinhilla: '하드',
                seren: '노멀',
                kalos: '이지',
                adversary: '이지',
                kaling: '이지'
            });
        }
    };

    // 시뮬레이터 총합 계산
    let totalOld = 0;
    let totalNew = 0;
    const selectedList: { bossId: string; bossName: string; diff: string; oldPrice: number; newPrice: number; rate: number }[] = [];

    Object.entries(selectedBosses).forEach(([bId, diff]) => {
        const bossItem = GROUPED_BOSSES.find(b => b.id === bId);
        if (bossItem) {
            const opt = bossItem.options.find(o => o.diff === diff);
            if (opt) {
                totalOld += opt.oldPrice * charCount;
                totalNew += opt.newPrice * charCount;
                selectedList.push({
                    bossId: bId,
                    bossName: bossItem.name,
                    diff: opt.diff,
                    oldPrice: opt.oldPrice,
                    newPrice: opt.newPrice,
                    rate: opt.rate
                });
            }
        }
    });

    const diffLoss = totalNew - totalOld;
    const lossRate = totalOld > 0 ? ((totalNew - totalOld) / totalOld) * 100 : 0;
    const selectedCount = Object.keys(selectedBosses).length;

    // 하단 전체 테이블 필터
    const [tableFilter, setTableFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // 납작한 리스트 (전체 테이블용)
    const flatBossList = GROUPED_BOSSES.flatMap(b => 
        b.options.map(opt => ({
            boss: b.name,
            diff: opt.diff,
            category: b.category,
            oldPrice: opt.oldPrice,
            newPrice: opt.newPrice,
            rate: opt.rate,
            note: opt.note
        }))
    );

    const filteredTableList = flatBossList.filter(item => {
        if (tableFilter !== 'all' && item.category !== tableFilter) return false;
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
                        목요일 점검 전 막차 정산 꿀팁과 <strong>12개 보스 선택 수익 체감 시뮬레이터</strong>를 이용해 내 주간 메소 손실액을 확인해 보세요.
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

                {/* 🔍 보스 결정석 전체 테이블 필터 & 검색 */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Coins className="w-5 h-5 text-amber-400" />
                        <h2 className="text-xl font-bold text-white">전체 보스 결정석 가격 조정 상세표</h2>
                    </div>

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
                                    onClick={() => setTableFilter(tab.id)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                        tableFilter === tab.id
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
                                    {filteredTableList.map((item, idx) => {
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

                {/* 📌 중간 광고 (상세표와 시뮬레이터 사이) */}
                <InArticleAd dataAdSlot="6849727140" />

                {/* 🔥 12개 보스 선택 주간 수익 변화 체감 시뮬레이터 */}
                <div className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 p-6 sm:p-8 space-y-6 shadow-2xl">
                    {/* 상단 타이틀 & 프리셋 버튼 */}
                    <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                    <Calculator className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                                        주간 보스돌이 수익 변화 체감 시뮬레이터
                                    </h2>
                                    <p className="text-xs sm:text-sm text-slate-400 break-keep">
                                        최대 <strong>12개 보스</strong>를 선택해 내 부캐의 실제 주간 메소 감소폭을 실시간으로 비교해보세요.
                                        <span className="text-amber-400 font-semibold block sm:inline sm:ml-1">
                                            (※ 동일 보스는 1개 난이도만 선택 가능)
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* 선택 보스 수 카운터 */}
                            <div className="flex items-center gap-2 self-start sm:self-center">
                                <span className={`text-xs px-3 py-1.5 rounded-full font-bold border ${
                                    selectedCount === 12
                                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                        : 'bg-slate-800 text-slate-300 border-slate-700'
                                }`}>
                                    선택: {selectedCount} / 12개
                                </span>
                                {selectedCount > 0 && (
                                    <button
                                        onClick={() => applyPreset('clear')}
                                        className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 px-2 py-1 rounded bg-slate-900 border border-slate-800 transition-colors"
                                    >
                                        <RotateCcw className="w-3 h-3" /> 초기화
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* 추천 프리셋 버튼 */}
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                            <span className="text-xs text-slate-500 font-semibold mr-1">추천 프리셋:</span>
                            <button
                                onClick={() => applyPreset('karoota')}
                                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                            >
                                4카룻+하매+카파풀 (7종)
                            </button>
                            <button
                                onClick={() => applyPreset('seday')}
                                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors"
                            >
                                스데돌이 코스 (10종)
                            </button>
                            <button
                                onClick={() => applyPreset('luwill')}
                                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 transition-colors"
                            >
                                하드스데+노말루윌더듄 (10종)
                            </button>
                            <button
                                onClick={() => applyPreset('hardboss')}
                                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-colors"
                            >
                                하드보스 풀세팅 (12종)
                            </button>
                        </div>
                    </div>

                    {/* 12개 초과 경고 메시지 */}
                    {limitWarning && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-2 animate-bounce">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            보스는 최대 12개까지만 선택할 수 있습니다! 기존 보스를 해제한 후 선택해 주세요.
                        </div>
                    )}

                    {/* 📊 실시간 수익 비교 결과 카드 (Result Card) */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                        {/* 캐릭터 수 설정 슬라이더/버튼 */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-amber-400" />
                                <span className="text-xs sm:text-sm font-bold text-white">운용 캐릭터 수 (부캐 배수)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                {[1, 2, 3, 5, 10].map(cnt => (
                                    <button
                                        key={cnt}
                                        onClick={() => setCharCount(cnt)}
                                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                                            charCount === cnt
                                                ? 'bg-amber-500 text-slate-950'
                                                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                                        }`}
                                    >
                                        {cnt}캐릭
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 금액 비교 3열 그리드 */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                            {/* 기존 수익 */}
                            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                                <span className="text-xs text-slate-400 block mb-1">패치 전 주간 수익</span>
                                <div className="text-lg sm:text-xl font-extrabold text-slate-200 font-mono">
                                    {formatMeso(totalOld)}
                                </div>
                                <span className="text-[11px] text-slate-500 block font-mono">
                                    {formatRawNumber(totalOld)} 메소
                                </span>
                            </div>

                            {/* 변경 후 수익 */}
                            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                                <span className="text-xs text-amber-400 block mb-1">패치 후 주간 수익</span>
                                <div className="text-lg sm:text-xl font-extrabold text-amber-300 font-mono">
                                    {formatMeso(totalNew)}
                                </div>
                                <span className="text-[11px] text-slate-500 block font-mono">
                                    {formatRawNumber(totalNew)} 메소
                                </span>
                            </div>

                            {/* 차액 (손실액) */}
                            <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30">
                                <span className="text-xs text-red-400 block mb-1">주간 손실액 (변동폭)</span>
                                <div className="text-lg sm:text-xl font-extrabold text-red-400 font-mono">
                                    {totalOld > 0 ? `-${formatMeso(Math.abs(diffLoss))}` : '0 메소'}
                                </div>
                                <span className="text-[11px] text-red-400 font-bold">
                                    {totalOld > 0 ? `${lossRate.toFixed(1)}% 감소` : '0%'}
                                </span>
                            </div>
                        </div>

                        {/* 선택된 보스 칩 목록 */}
                        {selectedList.length > 0 ? (
                            <div className="pt-2">
                                <span className="text-[11px] text-slate-500 block mb-1.5">선택된 보스 목록 (클릭 시 제거):</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {selectedList.map(item => (
                                        <button
                                            key={item.bossId}
                                            onClick={() => removeBoss(item.bossId)}
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-950 hover:bg-red-950/40 border border-slate-800 hover:border-red-500/40 text-slate-300 hover:text-red-300 transition-all group"
                                            title="클릭하여 해제"
                                        >
                                            <span>{item.bossName}</span>
                                            <span className="text-[10px] px-1 py-0.2 rounded bg-slate-800 text-amber-300">
                                                {item.diff}
                                            </span>
                                            <span className="text-red-400 text-[10px] font-mono">
                                                {item.rate.toFixed(0)}%
                                            </span>
                                            <X className="w-3 h-3 text-slate-500 group-hover:text-red-400" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="py-4 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                                아래 보스 목록에서 격파할 보스의 난이도를 클릭하여 선택해 주세요. (최대 12개)
                            </div>
                        )}
                    </div>

                    {/* 🎮 보스 선택 그리드 (동일 보스는 단일 선택만 가능하도록 라디오 형태 지원) */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-amber-400" />
                                보스 목록에서 격파할 난이도 선택
                            </h3>
                            <span className="text-xs text-slate-500">
                                ※ 같은 보스는 1개 난이도만 자동 적용됩니다
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {GROUPED_BOSSES.map(boss => {
                                const currentDiff = selectedBosses[boss.id];
                                const isSelected = !!currentDiff;

                                return (
                                    <div
                                        key={boss.id}
                                        className={`p-3.5 rounded-xl border transition-all ${
                                            isSelected
                                                ? 'bg-slate-900/90 border-amber-500/50 shadow-md shadow-amber-500/5'
                                                : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-bold text-sm text-white flex items-center gap-1.5">
                                                {boss.name}
                                                {isSelected && (
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                                                )}
                                            </span>
                                            <span className="text-[10px] text-slate-500">
                                                {boss.categoryLabel}
                                            </span>
                                        </div>

                                        {/* 난이도 옵션 버튼들 (같은 보스 내 상호 배타적 선택) */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {boss.options.map(opt => {
                                                const isOptSelected = currentDiff === opt.diff;
                                                return (
                                                    <button
                                                        key={opt.diff}
                                                        onClick={() => handleSelectDiff(boss.id, opt.diff)}
                                                        className={`flex-1 min-w-[70px] px-2 py-1.5 rounded-lg text-xs font-semibold flex flex-col items-center justify-center transition-all ${
                                                            isOptSelected
                                                                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                                                                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                                                        }`}
                                                    >
                                                        <span className="text-[11px] leading-tight">
                                                            {opt.diff}
                                                        </span>
                                                        <span className={`text-[10px] leading-tight font-mono ${
                                                            isOptSelected ? 'text-slate-950' : 'text-amber-400'
                                                        }`}>
                                                            {formatMeso(opt.newPrice)}
                                                        </span>
                                                        <span className={`text-[9px] leading-tight font-mono ${
                                                            isOptSelected ? 'text-red-950 font-black' : 'text-red-400'
                                                        }`}>
                                                            {opt.rate.toFixed(0)}%
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 하단 광고 */}
                <InArticleAd dataAdSlot="6849727140" />
            </div>
        </main>
    );
}
