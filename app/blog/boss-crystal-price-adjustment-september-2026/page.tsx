'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    Calendar, ArrowLeft, Sparkles, TrendingDown, AlertCircle, 
    Coins, ArrowRight, Search, Clock, ShieldAlert, DollarSign,
    Calculator, Flame, CheckCircle2, RotateCcw, X, Check, Users, Sun
} from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

interface BossDiffOption {
    diff: string;
    oldPrice: number;
    newPrice: number;
    rate: number;
    note?: string;
    isDaily?: boolean;
}

interface GroupedBoss {
    id: string;
    name: string;
    category: 'sub' | 'hard' | 'grandis' | 'unchanged' | 'daily';
    categoryLabel: string;
    isDaily?: boolean;
    options: BossDiffOption[];
}

const GROUPED_BOSSES: GroupedBoss[] = [
    // 🔒 일일 보스 전환 / 가격 동결 보스
    {
        id: 'hilla_weekly',
        name: '하드 힐라',
        category: 'daily',
        categoryLabel: '일일 보스 (전환 · 동결)',
        isDaily: true,
        options: [
            { diff: '하드', oldPrice: 1280000, newPrice: 1280000, rate: 0.0, note: '일일 보스 전환 · 동결', isDaily: true }
        ]
    },
    {
        id: 'pinkbean_weekly',
        name: '카오스 핑크빈',
        category: 'daily',
        categoryLabel: '일일 보스 (전환 · 동결)',
        isDaily: true,
        options: [
            { diff: '카오스', oldPrice: 1320000, newPrice: 1320000, rate: 0.0, note: '일일 보스 전환 · 동결', isDaily: true }
        ]
    },
    {
        id: 'cygnus',
        name: '시그너스',
        category: 'daily',
        categoryLabel: '일일 보스 (전환 · 동결)',
        isDaily: true,
        options: [
            { diff: '이지', oldPrice: 1360000, newPrice: 1360000, rate: 0.0, note: '일일 보스 전환 · 동결', isDaily: true },
            { diff: '노멀', oldPrice: 7500000, newPrice: 7500000, rate: 0.0, note: '일일 보스 전환 · 동결', isDaily: true }
        ]
    },
    // 📉 카루타 라인 (-50% 반토막)
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
    // ⚔️ 스데미 라인
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
    // 🦋 루윌 라인
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
    // 🌑 더듄진 라인
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
    // ⚡ 그란디스 & 엔드 보스
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
            { diff: '카오스', oldPrice: 1273000000, newPrice: 1230000000, rate: -3.4 },
            { diff: '익스트림', oldPrice: 4104000000, newPrice: 4104000000, rate: 0.0, note: '가격 동결' }
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
            { diff: '하드', oldPrice: 1435000000, newPrice: 1390000000, rate: -3.1 },
            { diff: '익스트림', oldPrice: 4712000000, newPrice: 4712000000, rate: 0.0, note: '가격 동결' }
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
            { diff: '하드', oldPrice: 1739000000, newPrice: 1560000000, rate: -10.3 },
            { diff: '익스트림', oldPrice: 5387000000, newPrice: 5387000000, rate: 0.0, note: '가격 동결' }
        ]
    },
    {
        id: 'bellona',
        name: '벨로나',
        category: 'grandis',
        categoryLabel: '그란디스',
        options: [
            { diff: '이지', oldPrice: 440000000, newPrice: 396000000, rate: -10.0 },
            { diff: '노멀', oldPrice: 850000000, newPrice: 824000000, rate: -3.1 },
            { diff: '하드', oldPrice: 2950000000, newPrice: 2950000000, rate: 0.0, note: '가격 동결' }
        ]
    },
    {
        id: 'hyungsung',
        name: '찬란한 흉성',
        category: 'grandis',
        categoryLabel: '그란디스',
        options: [
            { diff: '노멀', oldPrice: 625000000, newPrice: 593000000, rate: -5.1 },
            { diff: '하드', oldPrice: 2678000000, newPrice: 2678000000, rate: 0.0, note: '가격 동결' }
        ]
    },
    {
        id: 'limbo',
        name: '림보',
        category: 'grandis',
        categoryLabel: '엔드 보스',
        options: [
            { diff: '노멀', oldPrice: 1026000000, newPrice: 995000000, rate: -3.0 },
            { diff: '하드', oldPrice: 2385000000, newPrice: 2385000000, rate: 0.0, note: '가격 동결' }
        ]
    },
    {
        id: 'baldrix',
        name: '발드릭스',
        category: 'grandis',
        categoryLabel: '엔드 보스',
        options: [
            { diff: '노멀', oldPrice: 1368000000, newPrice: 1320000000, rate: -3.5 },
            { diff: '하드', oldPrice: 3078000000, newPrice: 3078000000, rate: 0.0, note: '가격 동결' }
        ]
    },
    {
        id: 'jupiter',
        name: '유피테르',
        category: 'grandis',
        categoryLabel: '엔드 보스',
        options: [
            { diff: '노멀', oldPrice: 1615000000, newPrice: 1560000000, rate: -3.4 },
            { diff: '하드', oldPrice: 4845000000, newPrice: 4845000000, rate: 0.0, note: '가격 동결' }
        ]
    },
    // 🌌 월간 보스
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

// ☀️ 일일 보스 (전 난이도 100% 가격 동결)
const DAILY_BOSSES: GroupedBoss[] = [
    {
        id: 'daily_zakum',
        name: '자쿰 (일일)',
        category: 'daily',
        categoryLabel: '일일 보스',
        isDaily: true,
        options: [
            { diff: '이지', oldPrice: 114000, newPrice: 114000, rate: 0.0, note: '가격 동결', isDaily: true },
            { diff: '노멀', oldPrice: 349000, newPrice: 349000, rate: 0.0, note: '가격 동결', isDaily: true }
        ]
    },
    {
        id: 'daily_magnus',
        name: '매그너스 (일일)',
        category: 'daily',
        categoryLabel: '일일 보스',
        isDaily: true,
        options: [
            { diff: '이지', oldPrice: 411000, newPrice: 411000, rate: 0.0, note: '가격 동결', isDaily: true },
            { diff: '노멀', oldPrice: 1160000, newPrice: 1160000, rate: 0.0, note: '가격 동결', isDaily: true }
        ]
    },
    {
        id: 'daily_hilla',
        name: '힐라 (일일)',
        category: 'daily',
        categoryLabel: '일일 보스',
        isDaily: true,
        options: [
            { diff: '노멀', oldPrice: 455000, newPrice: 455000, rate: 0.0, note: '가격 동결', isDaily: true }
        ]
    },
    {
        id: 'daily_kaung',
        name: '카웅 (일일)',
        category: 'daily',
        categoryLabel: '일일 보스',
        isDaily: true,
        options: [
            { diff: '노멀', oldPrice: 712000, newPrice: 712000, rate: 0.0, note: '가격 동결', isDaily: true }
        ]
    },
    {
        id: 'daily_papulatus',
        name: '파풀라투스 (일일)',
        category: 'daily',
        categoryLabel: '일일 보스',
        isDaily: true,
        options: [
            { diff: '이지', oldPrice: 390000, newPrice: 390000, rate: 0.0, note: '가격 동결', isDaily: true },
            { diff: '노멀', oldPrice: 1200000, newPrice: 1200000, rate: 0.0, note: '가격 동결', isDaily: true }
        ]
    },
    {
        id: 'daily_rootabyss',
        name: '루타비스 4종 (일일)',
        category: 'daily',
        categoryLabel: '일일 보스',
        isDaily: true,
        options: [
            { diff: '노멀 4종', oldPrice: 2204000, newPrice: 2204000, rate: 0.0, note: '각 55.1만', isDaily: true }
        ]
    },
    {
        id: 'daily_vonleon',
        name: '반 레온 (일일)',
        category: 'daily',
        categoryLabel: '일일 보스',
        isDaily: true,
        options: [
            { diff: '이지', oldPrice: 602000, newPrice: 602000, rate: 0.0, note: '가격 동결', isDaily: true },
            { diff: '노멀', oldPrice: 830000, newPrice: 830000, rate: 0.0, note: '가격 동결', isDaily: true },
            { diff: '하드', oldPrice: 1070000, newPrice: 1070000, rate: 0.0, note: '가격 동결', isDaily: true }
        ]
    },
    {
        id: 'daily_horntail',
        name: '혼테일 (일일)',
        category: 'daily',
        categoryLabel: '일일 보스',
        isDaily: true,
        options: [
            { diff: '이지', oldPrice: 502000, newPrice: 502000, rate: 0.0, note: '가격 동결', isDaily: true },
            { diff: '노멀', oldPrice: 576000, newPrice: 576000, rate: 0.0, note: '가격 동결', isDaily: true },
            { diff: '카오스', oldPrice: 770000, newPrice: 770000, rate: 0.0, note: '가격 동결', isDaily: true }
        ]
    },
    {
        id: 'daily_arkarium',
        name: '아카이럼 (일일)',
        category: 'daily',
        categoryLabel: '일일 보스',
        isDaily: true,
        options: [
            { diff: '이지', oldPrice: 656000, newPrice: 656000, rate: 0.0, note: '가격 동결', isDaily: true },
            { diff: '노멀', oldPrice: 1110000, newPrice: 1110000, rate: 0.0, note: '가격 동결', isDaily: true }
        ]
    },
    {
        id: 'daily_pinkbean',
        name: '핑크빈 (일일)',
        category: 'daily',
        categoryLabel: '일일 보스',
        isDaily: true,
        options: [
            { diff: '노멀', oldPrice: 799000, newPrice: 799000, rate: 0.0, note: '가격 동결', isDaily: true }
        ]
    }
];

const ALL_DISPLAY_BOSSES = [...GROUPED_BOSSES, ...DAILY_BOSSES];

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
    // 주간 보스 (검은 마법사 제외 24종) & 월간 보스 (검은 마법사)
    const WEEKLY_BOSSES = GROUPED_BOSSES.filter(b => b.id !== 'blackmage');
    const MONTHLY_BOSS = GROUPED_BOSSES.find(b => b.id === 'blackmage')!;

    // 12개 주간 보스 선택 시뮬레이터 상태 (기본값: 검밑솔 하드 진힐라부터 비싼순 12종)
    const [selectedBosses, setSelectedBosses] = useState<Record<string, string>>({
        jinhilla: '하드',
        dunkel: '하드',
        will: '하드',
        slime: '카오스',
        dusk: '카오스',
        lucid: '하드',
        suu: '하드',
        demian: '하드',
        papulatus: '카오스',
        vellum: '카오스',
        magnus: '하드',
        pierre: '카오스'
    });

    // 월간 보스 (검은 마법사) 전용 상태 (null | '하드' | '익스트림') - 12개 주간 제한 미포함
    const [selectedMonthly, setSelectedMonthly] = useState<'하드' | '익스트림' | null>(null);

    // 보스별 1~6인 파티 인원수 상태 (key: bossId, value: 1~6, 기본 1인 솔플)
    const [partySizes, setPartySizes] = useState<Record<string, number>>({});
    const [monthlyPartySize, setMonthlyPartySize] = useState<number>(1);

    const [limitWarning, setLimitWarning] = useState<boolean>(false);

    // 보스별 파티 인원 설정 (1~6인)
    const handleSetPartySize = (bossId: string, size: number) => {
        setPartySizes(prev => ({
            ...prev,
            [bossId]: size
        }));
    };

    // 전체 솔플(1인) 일괄 변경
    const handleSetAllSolo = () => {
        setPartySizes({});
        setMonthlyPartySize(1);
    };

    // 검밑솔 12종 (하드 진힐라부터 비싼순) 프리셋 재설정
    const handleSetGeomMitSol = () => {
        setSelectedBosses({
            jinhilla: '하드',
            dunkel: '하드',
            will: '하드',
            slime: '카오스',
            dusk: '카오스',
            lucid: '하드',
            suu: '하드',
            demian: '하드',
            papulatus: '카오스',
            vellum: '카오스',
            magnus: '하드',
            pierre: '카오스'
        });
        setSelectedMonthly(null);
        setPartySizes({});
        setMonthlyPartySize(1);
        setLimitWarning(false);
    };

    // 👑 엔드 / 그란디스 12종 프리셋 (유피테르 하드 ~ 하드 윌 + 검마 하드)
    const handleSetGrandis = () => {
        setSelectedBosses({
            jupiter: '하드',
            baldrix: '하드',
            bellona: '하드',
            hyungsung: '하드',
            limbo: '하드',
            kaling: '하드',
            adversary: '하드',
            kalos: '카오스',
            seren: '하드',
            jinhilla: '하드',
            dunkel: '하드',
            will: '하드'
        });
        setSelectedMonthly('하드');
        setPartySizes({});
        setMonthlyPartySize(1);
        setLimitWarning(false);
    };

    // 🌱 카루타 + 주간 입문 12종 프리셋
    const handleSetStarter = () => {
        setSelectedBosses({
            suu: '노멀',
            demian: '노멀',
            slime: '노멀',
            lucid: '이지',
            vellum: '카오스',
            papulatus: '카오스',
            bloodyqueen: '카오스',
            pierre: '카오스',
            banban: '카오스',
            zakum: '카오스',
            cygnus: '노멀',
            pinkbean_weekly: '카오스'
        });
        setSelectedMonthly(null);
        setPartySizes({});
        setMonthlyPartySize(1);
        setLimitWarning(false);
    };

    // 계산기 탭 모드 ('weekly' | 'daily')
    const [simMode, setSimMode] = useState<'weekly' | 'daily'>('weekly');

    // ☀️ 일일 보스 선택 상태 (기본 10종 노멀/하드 국민 세팅)
    const [selectedDailyBosses, setSelectedDailyBosses] = useState<Record<string, string>>({
        daily_zakum: '노멀',
        daily_magnus: '노멀',
        daily_hilla: '노멀',
        daily_kaung: '노멀',
        daily_papulatus: '노멀',
        daily_rootabyss: '노멀 4종',
        daily_vonleon: '하드',
        daily_horntail: '카오스',
        daily_arkarium: '노멀',
        daily_pinkbean: '노멀'
    });

    const handleToggleDailyBoss = (bossId: string, diff: string) => {
        if (selectedDailyBosses[bossId] === diff) {
            const next = { ...selectedDailyBosses };
            delete next[bossId];
            setSelectedDailyBosses(next);
        } else {
            setSelectedDailyBosses(prev => ({
                ...prev,
                [bossId]: diff
            }));
        }
    };

    const handleSelectAllDaily = () => {
        setSelectedDailyBosses({
            daily_zakum: '노멀',
            daily_magnus: '노멀',
            daily_hilla: '노멀',
            daily_kaung: '노멀',
            daily_papulatus: '노멀',
            daily_rootabyss: '노멀 4종',
            daily_vonleon: '하드',
            daily_horntail: '카오스',
            daily_arkarium: '노멀',
            daily_pinkbean: '노멀'
        });
    };

    const handleClearDaily = () => {
        setSelectedDailyBosses({});
    };

    // 일일 보스 합산 계산 (1일 수령액 및 7일 주간 누적)
    let dailyTotalPerDay = 0;
    const selectedDailyList: {
        bossId: string;
        name: string;
        diff: string;
        price: number;
    }[] = [];

    Object.entries(selectedDailyBosses).forEach(([bId, diff]) => {
        const boss = DAILY_BOSSES.find(b => b.id === bId);
        if (boss) {
            const opt = boss.options.find(o => o.diff === diff);
            if (opt) {
                dailyTotalPerDay += opt.newPrice;
                selectedDailyList.push({
                    bossId: bId,
                    name: boss.name,
                    diff: opt.diff,
                    price: opt.newPrice
                });
            }
        }
    });
    selectedDailyList.sort((a, b) => b.price - a.price);
    const dailyTotalPerWeek = dailyTotalPerDay * 7;

    // 로컬 스토리지 키 (사용자 브라우저 기기에만 100% 무료 저장)
    const STORAGE_KEY = 'maple_boss_crystal_sim_v1';
    const [isLoaded, setIsLoaded] = useState(false);

    // 마운트 시 브라우저 로컬 저장소에서 데이터 불러오기
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                if (data.selectedBosses && typeof data.selectedBosses === 'object') {
                    setSelectedBosses(data.selectedBosses);
                }
                if (data.partySizes && typeof data.partySizes === 'object') {
                    setPartySizes(data.partySizes);
                }
                if (data.selectedMonthly !== undefined) {
                    setSelectedMonthly(data.selectedMonthly);
                }
                if (data.monthlyPartySize) {
                    setMonthlyPartySize(data.monthlyPartySize);
                }
                if (data.selectedDailyBosses && typeof data.selectedDailyBosses === 'object') {
                    setSelectedDailyBosses(data.selectedDailyBosses);
                }
                if (data.simMode) {
                    setSimMode(data.simMode);
                }
            }
        } catch (e) {
            console.error('Failed to load boss crystal state from localStorage', e);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // 상태 변경 시 브라우저 로컬 저장소에 자동 저장
    useEffect(() => {
        if (!isLoaded) return;
        try {
            const stateToSave = {
                selectedBosses,
                partySizes,
                selectedMonthly,
                monthlyPartySize,
                selectedDailyBosses,
                simMode
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        } catch (e) {
            console.error('Failed to save boss crystal state to localStorage', e);
        }
    }, [selectedBosses, partySizes, selectedMonthly, monthlyPartySize, selectedDailyBosses, simMode, isLoaded]);

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
        const nextParties = { ...partySizes };
        delete nextParties[bossId];
        setPartySizes(nextParties);
    };

    // 전체 선택 초기화
    const handleReset = () => {
        setSelectedBosses({});
        setSelectedMonthly(null);
        setPartySizes({});
        setMonthlyPartySize(1);
        setLimitWarning(false);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {}
    };

    // 시뮬레이터 총합 계산 (주간 12개 + 월간 검은 마법사 별도 계산, 보스별 1~6인 1/N 결정석 분배 반영)
    let totalOld = 0;
    let totalNew = 0;
    const selectedList: { 
        bossId: string; 
        bossName: string; 
        diff: string; 
        oldPrice: number; 
        newPrice: number; 
        rate: number; 
        party: number;
        isMonthly?: boolean; 
    }[] = [];

    Object.entries(selectedBosses).forEach(([bId, diff]) => {
        const bossItem = GROUPED_BOSSES.find(b => b.id === bId);
        if (bossItem) {
            const opt = bossItem.options.find(o => o.diff === diff);
            if (opt) {
                const party = partySizes[bId] || 1;
                const oldPerPerson = Math.floor(opt.oldPrice / party);
                const newPerPerson = Math.floor(opt.newPrice / party);
                totalOld += oldPerPerson;
                totalNew += newPerPerson;
                selectedList.push({
                    bossId: bId,
                    bossName: bossItem.name,
                    diff: opt.diff,
                    oldPrice: oldPerPerson,
                    newPrice: newPerPerson,
                    rate: opt.rate,
                    party: party
                });
            }
        }
    });

    // 월간 보스 검은 마법사 합산 (파티 인원 반영)
    if (selectedMonthly) {
        const bmOpt = MONTHLY_BOSS.options.find(o => o.diff === selectedMonthly);
        if (bmOpt) {
            const party = monthlyPartySize || 1;
            const oldPerPerson = Math.floor(bmOpt.oldPrice / party);
            const newPerPerson = Math.floor(bmOpt.newPrice / party);
            totalOld += oldPerPerson;
            totalNew += newPerPerson;
            selectedList.push({
                bossId: 'blackmage',
                bossName: '검은 마법사',
                diff: bmOpt.diff,
                oldPrice: oldPerPerson,
                newPrice: newPerPerson,
                rate: bmOpt.rate,
                party: party,
                isMonthly: true
            });
        }
    }

    // 선택 목록은 비싼 보스 순으로 내림차순 정렬 (검은 마법사 및 하드 진힐라부터)
    selectedList.sort((a, b) => b.newPrice - a.newPrice);

    const diffLoss = totalNew - totalOld;
    const lossRate = totalOld > 0 ? ((totalNew - totalOld) / totalOld) * 100 : 0;
    const selectedCount = Object.keys(selectedBosses).length;

    // 하단 전체 테이블 필터
    const [tableFilter, setTableFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // 납작한 리스트 (전체 테이블용: 주간 동결 보스 및 일일 보스 포함)
    const flatBossList = ALL_DISPLAY_BOSSES.flatMap(b => 
        b.options.map(opt => ({
            boss: b.name,
            diff: opt.diff,
            category: b.category,
            isDaily: b.isDaily,
            oldPrice: opt.oldPrice,
            newPrice: opt.newPrice,
            rate: opt.rate,
            note: opt.note
        }))
    );

    const filteredTableList = flatBossList.filter(item => {
        if (tableFilter === 'unchanged') {
            if (item.rate !== 0) return false;
        } else if (tableFilter === 'daily') {
            if (!item.isDaily) return false;
        } else if (tableFilter !== 'all' && item.category !== tableFilter) {
            return false;
        }
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
                        className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
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
                    <p className="text-sm sm:text-base text-white break-keep leading-relaxed font-normal">
                        9월 17일(목) 점검 후 본서버에 적용되는 보스 강렬한 힘의 결정 판매 가격 조정 총정리입니다.
                        카루타부터 노말 더스크/듄켈까지 주간 보스돌이 라인이 전면 <strong className="text-amber-300 font-bold">-50% 반토막</strong> 너프되며,
                        노말 세렌(-30.1%), 익스 세렌(-35.1%), 검은 마법사(-30.1% ~ -35.0%)까지 대규모 가격 인하가 단행됩니다.
                        목요일 점검 전 막차 정산 꿀팁과 <strong className="text-amber-300 font-bold">12개 보스 선택 수익 체감 시뮬레이터</strong>를 이용해 내 주간 메소 손실액을 확인해 보세요.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-300" />
                            2026년 9월 10일 발표
                        </span>
                        <span>•</span>
                        <span className="text-amber-300 font-semibold">적용일: 2026.09.17(목) / 검마는 10.01(목)</span>
                        <span>•</span>
                        <span className="text-slate-300">읽는 시간 약 6분</span>
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
                        <p className="text-xs text-slate-100 break-keep leading-relaxed pt-1">
                            카루타 4종, 하드 매그너스, 카파풀, 노말 스데미, 이지/노말 루윌, 노말 더스크/듄켈까지 <strong className="text-red-400 font-bold">정확히 50% 일괄 삭감</strong>됩니다. 주간 부캐 보스돌이 수익이 절반으로 감소합니다.
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
                        <p className="text-xs text-slate-100 break-keep leading-relaxed pt-1">
                            하드 스우/데미안, 하드 루시드/윌, 카더듄, 하드 진힐라 등 본격 상위 하드 보스는 <strong className="text-emerald-400 font-bold">-5.0% ~ -5.7%</strong>로 소폭 인하되어 상대적으로 타격이 적습니다.
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
                        <p className="text-xs text-slate-100 break-keep leading-relaxed pt-1">
                            <strong className="text-amber-300 font-bold">노말 세렌(-30.1%)</strong>, <strong className="text-amber-300 font-bold">하드 검마(-30.1%)</strong>, <strong className="text-rose-400 font-bold">익스 세렌(-35.1%)</strong>, <strong className="text-rose-400 font-bold">익스 검마(-35.0%)</strong> 등 대형 보스들의 결정석 가격이 크게 축소됩니다.
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
                        <p className="text-xs text-slate-100 break-keep leading-relaxed pt-1">
                            9월 17일 목요일 자정(00:00) 주간 보스 초기화 후 <strong className="text-cyan-300 font-bold">점검 시작 전까지 클리어하여 결정석을 판매하면 기존 높은 가격으로 수령</strong>할 수 있습니다!
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
                        <p className="text-xs text-slate-100 break-keep">
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

                    {/* 💡 가격 동결 보스 총정리 안내 카드 */}
                    <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-2xl p-5 space-y-2">
                        <div className="flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 text-emerald-400" />
                            <h3 className="text-base font-bold text-white">
                                💡 이번 9월 패치에서 가격이 깎이지 않은 <span className="text-emerald-400 font-extrabold underline">동결(유지) 보스</span>는?
                            </h3>
                        </div>
                        <div className="text-xs sm:text-sm text-slate-200 break-keep leading-relaxed space-y-1.5">
                            <p>
                                • <strong className="text-white">일일 보스 전환 & 동결 보스</strong>: <span className="text-emerald-300 font-semibold">하드 힐라</span> (128만), <span className="text-emerald-300 font-semibold">카오스 핑크빈</span> (132만), <span className="text-emerald-300 font-semibold">이지 시그너스</span> (136만), <span className="text-emerald-300 font-semibold">노멀 시그너스</span> (750만)는 9/17 패치 후 기존 주간 보스에서 <strong className="text-amber-300 font-bold">일일 보스로 전환</strong>되었으며, 결정석 가격은 변동 없이 100% 동결됩니다.
                            </p>
                            <p>
                                • <strong className="text-white">엔드/최상위 난이도</strong>: <span className="text-emerald-300 font-semibold">감시자 칼로스 익스트림</span> (41.04억), <span className="text-emerald-300 font-semibold">최초의 대적자 익스트림</span> (47.12억), <span className="text-emerald-300 font-semibold">카링 익스트림</span> (53.87억), <span className="text-emerald-300 font-semibold">벨로나 하드</span> (29.5억), <span className="text-emerald-300 font-semibold">찬란한 흉성 하드</span> (26.78억), <span className="text-emerald-300 font-semibold">림보 하드</span> (23.85억), <span className="text-emerald-300 font-semibold">발드릭스 하드</span> (30.78억), <span className="text-emerald-300 font-semibold">유피테르 하드</span> (48.45억) 역시 가격이 그대로 유지됩니다.
                            </p>
                            <p>
                                • <strong className="text-white">일일 보스 전수</strong>: 자쿰, 매그너스, 힐라, 카웅, 파풀라투스, 루타비스 4종, 반 레온, 혼테일, 아카이럼, 핑크빈 등 <span className="text-emerald-300 font-semibold">일일 보스 10종의 모든 난이도</span>는 너프 없이 100% 가격이 유지됩니다.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                        {/* 탭 필터 */}
                        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                            {[
                                { id: 'all', label: '전체 보스' },
                                { id: 'sub', label: '📉 -50% 반토막 (카룻~더듄)' },
                                { id: 'hard', label: '🛡️ -5% 방어 (하드스데~진)' },
                                { id: 'grandis', label: '⚡ 그란디스 & 엔드' },
                                { id: 'unchanged', label: '🔒 가격 동결 (너프 없음)' },
                                { id: 'daily', label: '☀️ 일일 보스 (전환 4종 포함)' },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setTableFilter(tab.id)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                        tableFilter === tab.id
                                            ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                                            : 'bg-slate-900 text-slate-200 hover:text-white border border-slate-700'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* 검색창 */}
                        <div className="relative w-full sm:w-64">
                            <Search className="w-4 h-4 text-slate-300 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="보스명 검색 (예: 세렌, 림보, 자쿰)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* 보스 결정석 리스트 테이블 */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs sm:text-sm">
                                <thead className="bg-slate-900/90 text-slate-200 border-b border-slate-700 font-bold uppercase">
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
                                                    {item.isDaily && (
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                                                            일일
                                                        </span>
                                                    )}
                                                    {item.note && (
                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                                                            item.rate === 0
                                                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                                                : 'bg-rose-500/20 text-rose-300'
                                                        }`}>
                                                            {item.note}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-right text-slate-200 font-mono">
                                                    {formatMeso(item.oldPrice)} 메소
                                                </td>
                                                <td className="py-3 px-4 text-right font-bold font-mono text-white">
                                                    {formatMeso(item.newPrice)} 메소
                                                </td>
                                                <td className="py-3 px-4 text-right font-black font-mono">
                                                    <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                                                        item.rate === 0
                                                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
                                                            : isBigDrop
                                                            ? 'bg-red-500/20 text-red-400 border border-red-500/30 font-extrabold'
                                                            : item.rate <= -10
                                                            ? 'bg-amber-500/20 text-amber-400'
                                                            : 'bg-slate-800 text-slate-300'
                                                    }`}>
                                                        {item.rate === 0 ? '동결 (0.0%)' : `${item.rate.toFixed(1)}%`}
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

                {/* 🔥 보스 결정석 수익 시뮬레이터 (주간 12개 & 일일 보스) */}
                <div className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 p-6 sm:p-8 space-y-6 shadow-2xl">
                    {/* 상단 탭 전환: 주간 12개 vs 일일 10종 */}
                    <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
                        <button
                            type="button"
                            onClick={() => setSimMode('weekly')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                                simMode === 'weekly'
                                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
                            }`}
                        >
                            <Calculator className="w-4 h-4" />
                            ⚔️ 주간 보스 12개 시뮬레이터 (동결 보스 포함)
                        </button>
                        <button
                            type="button"
                            onClick={() => setSimMode('daily')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                                simMode === 'daily'
                                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
                                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
                            }`}
                        >
                            <Sun className="w-4 h-4 text-amber-300" />
                            ☀️ 일일 보스 (10종 동결) 계산기
                        </button>
                    </div>

                    {simMode === 'weekly' ? (
                        <>
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
                                            <p className="text-xs sm:text-sm text-slate-100 break-keep font-normal">
                                                최대 <strong className="text-white font-bold">12개 보스</strong>를 선택하고, 각 보스별로 <strong className="text-cyan-400 font-bold">1~6인 파티</strong>를 지정해 내 실제 주간 메소 수령액과 감소폭을 실시간으로 비교해보세요.
                                                <span className="text-amber-300 font-semibold block sm:inline sm:ml-1">
                                                    (※ 1~6인 파티 1/N 분배 공식 적용 · 브라우저 로컬 자동 저장 💾)
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* 선택 보스 수 카운터 & 프리셋 */}
                                    <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                                        <span className={`text-xs px-3 py-1.5 rounded-full font-bold border ${
                                            selectedCount === 12
                                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                                : 'bg-slate-800 text-slate-100 border-slate-700'
                                        }`}>
                                            주간 보스: {selectedCount} / 12개
                                            {selectedMonthly && ' (+월간 검마)'}
                                        </span>
                                        <div className="flex flex-wrap items-center gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() => handleSetGrandis()}
                                                className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-500/40 hover:border-amber-400 transition-colors cursor-pointer font-bold"
                                                title="엔드/그란디스 12종 (유피테르 하드~하드윌 + 검마) 프리셋"
                                            >
                                                👑 그란디스 12종
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleSetGeomMitSol()}
                                                className="text-xs text-slate-200 hover:text-amber-300 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-500/50 transition-colors cursor-pointer"
                                                title="하드 진힐라부터 비싼순 검밑솔 12종으로 재설정"
                                            >
                                                ⚔️ 검밑솔 12종
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleSetStarter()}
                                                className="text-xs text-slate-200 hover:text-emerald-300 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500/50 transition-colors cursor-pointer"
                                                title="노말 스데미/이지루시드/카루타/시그너스 12종 프리셋"
                                            >
                                                🌱 카루타/입문 12종
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleSetAllSolo()}
                                                className="text-xs text-slate-200 hover:text-cyan-300 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 transition-colors cursor-pointer"
                                                title="모든 선택 보스를 1인 솔플로 일괄 변경"
                                            >
                                                <Users className="w-3 h-3 text-cyan-400" /> 전체 솔플
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleReset()}
                                                className="text-xs text-slate-200 hover:text-red-400 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 transition-colors cursor-pointer"
                                            >
                                                <RotateCcw className="w-3 h-3" /> 초기화
                                            </button>
                                        </div>
                                    </div>
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
                        

                        {/* 금액 비교 3열 그리드 */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                            {/* 기존 수익 */}
                            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                                <span className="text-xs text-slate-200 block mb-1 font-medium">패치 전 주간 수익</span>
                                <div className="text-lg sm:text-xl font-extrabold text-white font-mono">
                                    {formatMeso(totalOld)}
                                </div>
                                <span className="text-[11px] text-slate-300 block font-mono">
                                    {formatRawNumber(totalOld)} 메소
                                </span>
                            </div>

                            {/* 변경 후 수익 */}
                            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                                <span className="text-xs text-amber-300 block mb-1 font-medium">패치 후 주간 수익</span>
                                <div className="text-lg sm:text-xl font-extrabold text-amber-300 font-mono">
                                    {formatMeso(totalNew)}
                                </div>
                                <span className="text-[11px] text-amber-200/90 block font-mono">
                                    {formatRawNumber(totalNew)} 메소
                                </span>
                            </div>

                            {/* 차액 (손실액) */}
                            <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30">
                                <span className="text-xs text-red-400 block mb-1 font-medium">주간 손실액 (변동폭)</span>
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
                                <span className="text-[11px] text-slate-200 block mb-1.5 font-semibold">선택된 보스 목록 (클릭 시 제거):</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {selectedList.map(item => (
                                        <div
                                            key={item.bossId}
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                                                item.isMonthly
                                                    ? 'bg-purple-950/60 border border-purple-500/40 text-purple-100'
                                                    : 'bg-slate-950 border border-slate-800 text-white'
                                            }`}
                                        >
                                            <span>{item.bossName}</span>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                                                item.isMonthly ? 'bg-purple-900 text-purple-200' : 'bg-slate-800 text-amber-300'
                                            }`}>
                                                {item.isMonthly ? `월간 ${item.diff}` : item.diff}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const nextParty = (item.party % 6) + 1;
                                                    if (item.isMonthly) {
                                                        setMonthlyPartySize(nextParty);
                                                    } else {
                                                        handleSetPartySize(item.bossId, nextParty);
                                                    }
                                                }}
                                                className={`text-[10px] px-1.5 py-0.5 rounded font-bold cursor-pointer transition-all hover:scale-105 active:scale-95 flex items-center gap-0.5 ${
                                                    item.party > 1
                                                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                                        : 'bg-slate-800 text-slate-300 hover:text-white'
                                                }`}
                                                title="클릭하여 파티 인원 변경 (1~6인)"
                                            >
                                                <Users className="w-2.5 h-2.5" />
                                                <span>{item.party === 1 ? '솔플' : `${item.party}인`}</span>
                                            </button>
                                            <span className="text-[11px] font-mono text-slate-300 font-normal">
                                                {formatMeso(item.newPrice)}
                                            </span>
                                            <span className={`text-[10px] font-mono font-bold ${
                                                item.rate === 0 ? 'text-emerald-400' : 'text-red-400'
                                            }`}>
                                                {item.rate === 0 ? '동결' : `${item.rate.toFixed(0)}%`}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (item.isMonthly) {
                                                        setSelectedMonthly(null);
                                                    } else {
                                                        removeBoss(item.bossId);
                                                    }
                                                }}
                                                className="p-0.5 text-slate-400 hover:text-red-400 transition-colors ml-0.5"
                                                title="선택 해제"
                                                aria-label={`${item.bossName} 해제`}
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="py-4 text-center text-xs text-slate-200 border border-dashed border-slate-700 rounded-xl">
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
                            <span className="text-xs text-slate-300 font-medium">
                                ※ 같은 보스는 1개 난이도만 자동 적용됩니다
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {WEEKLY_BOSSES.map(boss => {
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
                                            <span className="text-[10px] text-slate-300 font-medium">
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
                                                        className={`flex-1 min-w-[65px] px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                                                            isOptSelected
                                                                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                                                                : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-600'
                                                        }`}
                                                    >
                                                        <span>{opt.diff}</span>
                                                        <span className={`text-[10px] font-mono font-bold ${
                                                            opt.rate === 0
                                                                ? isOptSelected
                                                                    ? 'text-emerald-950 font-black'
                                                                    : 'text-emerald-400'
                                                                : isOptSelected
                                                                ? 'text-red-950'
                                                                : 'text-red-400'
                                                        }`}>
                                                            {opt.rate === 0 ? '동결' : `${opt.rate.toFixed(0)}%`}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* 보스별 1~6인 파티 인원 선택 (보스 선택 시 활성화) */}
                                        {isSelected && (
                                            <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-[11px] text-slate-300">
                                                    <Users className="w-3 h-3 text-cyan-400" />
                                                    <span>파티:</span>
                                                    <strong className="text-cyan-300 font-bold">
                                                        {(partySizes[boss.id] || 1) === 1 ? '솔플' : `${partySizes[boss.id]}인`}
                                                    </strong>
                                                </div>
                                                <div className="flex items-center gap-0.5 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                                                    {[1, 2, 3, 4, 5, 6].map(num => {
                                                        const currentParty = partySizes[boss.id] || 1;
                                                        const isPartyActive = currentParty === num;
                                                        return (
                                                            <button
                                                                key={num}
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleSetPartySize(boss.id, num);
                                                                }}
                                                                className={`w-6 h-5 rounded text-[10px] font-bold transition-all flex items-center justify-center cursor-pointer ${
                                                                    isPartyActive
                                                                        ? 'bg-cyan-500 text-slate-950 shadow font-black'
                                                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                                                }`}
                                                                title={`${num}인 파티 (결정석 1/${num} 분배)`}
                                                            >
                                                                {num === 1 ? '1' : num}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* 🌌 월간 보스 전용 선택: 검은 마법사 (주간 12개 제한 제외) */}
                        <div className="relative overflow-hidden rounded-2xl border border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 p-5 space-y-3 mt-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-bold">
                                            월간 보스 (주간 12개 제한 제외)
                                        </span>
                                        <span className="text-xs text-slate-300 font-medium">10월 1일(목)부터 가격 적용</span>
                                    </div>
                                    <h3 className="text-base font-bold text-white mt-1 flex items-center gap-2">
                                        <span>검은 마법사 (Black Mage)</span>
                                        {selectedMonthly && (
                                            <span className="px-2 py-0.5 rounded text-xs bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold">
                                                {selectedMonthly} 선택됨
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-xs text-slate-100 break-keep leading-relaxed font-normal">
                                        검은 마법사는 월 1회 격파 보스로, 주간 보스 12개 제한 슬롯을 차지하지 않고 별도로 선택하여 수익을 계산할 수 있습니다.
                                    </p>
                                </div>

                                {/* 검은 마법사 난이도 선택 버튼들 */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        onClick={() => setSelectedMonthly(null)}
                                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                                            selectedMonthly === null
                                                ? 'bg-slate-800 text-white border border-slate-700'
                                                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                                        }`}
                                    >
                                        미격파
                                    </button>
                                    {MONTHLY_BOSS.options.map(opt => {
                                        const isOptSelected = selectedMonthly === opt.diff;
                                        return (
                                            <button
                                                key={opt.diff}
                                                onClick={() => setSelectedMonthly(isOptSelected ? null : opt.diff as '하드' | '익스트림')}
                                                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                                                    isOptSelected
                                                        ? 'bg-purple-600 text-white font-black shadow-lg shadow-purple-600/30'
                                                        : 'bg-slate-900 hover:bg-slate-800 text-purple-100 border border-purple-500/40'
                                                }`}
                                            >
                                                <span>{opt.diff}</span>
                                                <span className={`text-[10px] font-mono font-bold ${
                                                    isOptSelected ? 'text-purple-200' : 'text-red-400'
                                                }`}>
                                                    {opt.rate.toFixed(0)}%
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* 검은 마법사 1~6인 파티 인원 선택 바 */}
                            {selectedMonthly && (
                                <div className="mt-3 pt-3 border-t border-purple-900/40 flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5 text-xs text-purple-200">
                                        <Users className="w-3.5 h-3.5 text-purple-400" />
                                        <span>검은 마법사 파티 인원:</span>
                                        <strong className="text-purple-300 font-bold">
                                            {monthlyPartySize === 1 ? '솔플' : `${monthlyPartySize}인 파티 (결정석 1/${monthlyPartySize} 분배)`}
                                        </strong>
                                    </div>
                                    <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-purple-500/30">
                                        {[1, 2, 3, 4, 5, 6].map(num => {
                                            const isPartyActive = monthlyPartySize === num;
                                            return (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => setMonthlyPartySize(num)}
                                                    className={`w-7 h-6 rounded text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                                                        isPartyActive
                                                            ? 'bg-purple-500 text-white shadow font-black'
                                                            : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
                                                    }`}
                                                    title={`검은 마법사 ${num}인 파티 (결정석 1/${num} 분배)`}
                                                >
                                                    {num === 1 ? '1인' : `${num}인`}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                        </>
                    ) : (
                        <div className="space-y-6">
                            {/* 일일 보스 상단 타이틀 & 프리셋 버튼 */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                                            전 난이도 100% 가격 동결
                                        </span>
                                        <span className="text-xs text-slate-300">매일 반복 수령</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                                        ☀️ 매일 도는 일일 보스 수익 계산기
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-200 break-keep font-normal">
                                        매일 클리어하는 일일 보스를 체크하세요. 이번 9월 패치에서 일일 보스는 <strong className="text-emerald-400 font-bold">가격 하향 없이 100% 동결</strong>되어 기존 수익이 온전히 보존됩니다.
                                    </p>
                                </div>

                                {/* 일일 프리셋 액션 버튼 */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        type="button"
                                        onClick={handleSelectAllDaily}
                                        className="text-xs text-cyan-300 hover:text-cyan-200 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-400 transition-colors cursor-pointer font-bold"
                                    >
                                        ✨ 10종 전체 선택
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleClearDaily}
                                        className="text-xs text-slate-300 hover:text-red-400 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer font-medium"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" /> 초기화
                                    </button>
                                </div>
                            </div>

                            {/* 일일 수익 계산 결과 카드 */}
                            <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center">
                                    {/* 1일 예상 수령액 */}
                                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                                        <span className="text-xs text-cyan-300 block mb-1 font-semibold flex items-center justify-center gap-1">
                                            <Sun className="w-3.5 h-3.5" /> 1일(하루) 예상 메소 수령액
                                        </span>
                                        <div className="text-xl sm:text-2xl font-black text-white font-mono">
                                            {formatMeso(dailyTotalPerDay)}
                                        </div>
                                        <span className="text-[11px] text-slate-300 block font-mono mt-1">
                                            {formatRawNumber(dailyTotalPerDay)} 메소
                                        </span>
                                    </div>

                                    {/* 1주일 (7일) 누적 수익 */}
                                    <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/30 to-slate-950/80 border border-cyan-500/40">
                                        <span className="text-xs text-emerald-300 block mb-1 font-semibold flex items-center justify-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" /> 주간(7일) 누적 메소 수령액
                                        </span>
                                        <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                                            {formatMeso(dailyTotalPerWeek)}
                                        </div>
                                        <span className="text-[11px] text-emerald-200/90 block font-mono mt-1">
                                            {formatRawNumber(dailyTotalPerWeek)} 메소 (매일 7회 기준)
                                        </span>
                                    </div>
                                </div>

                                {/* 선택된 일일 보스 목록 칩 */}
                                {selectedDailyList.length > 0 ? (
                                    <div className="pt-1">
                                        <span className="text-[11px] text-slate-300 block mb-1.5 font-semibold">
                                            선택된 일일 보스 ({selectedDailyList.length}개):
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {selectedDailyList.map(item => (
                                                <div
                                                    key={item.bossId}
                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-slate-950 border border-slate-800 text-white font-medium"
                                                >
                                                    <span>{item.name.replace(' (일일)', '')}</span>
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold">
                                                        {item.diff}
                                                    </span>
                                                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                                                        +{formatMeso(item.price)}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleDailyBoss(item.bossId, item.diff)}
                                                        className="p-0.5 text-slate-400 hover:text-red-400 transition-colors ml-0.5 cursor-pointer"
                                                        title="선택 해제"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-4 text-center text-xs text-slate-300 border border-dashed border-slate-700 rounded-xl">
                                        아래 일일 보스 목록에서 매일 클리어하는 보스의 난이도를 선택해 주세요.
                                    </div>
                                )}
                            </div>

                            {/* 일일 보스 선택 그리드 */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                                        <Sparkles className="w-4 h-4 text-cyan-400" />
                                        일일 보스 목록 및 난이도 선택
                                    </h4>
                                    <span className="text-xs text-emerald-400 font-medium">
                                        🛡️ 전 보스 100% 가격 동결
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {DAILY_BOSSES.map(boss => {
                                        const currentDiff = selectedDailyBosses[boss.id];
                                        const isSelected = !!currentDiff;

                                        return (
                                            <div
                                                key={boss.id}
                                                className={`p-3.5 rounded-xl border transition-all ${
                                                    isSelected
                                                        ? 'bg-slate-900/90 border-cyan-500/50 shadow-md shadow-cyan-500/5'
                                                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-bold text-sm text-white flex items-center gap-1.5">
                                                        {boss.name.replace(' (일일)', '')}
                                                        {isSelected && (
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                                                        )}
                                                    </span>
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                                                        동결
                                                    </span>
                                                </div>

                                                {/* 난이도 옵션 버튼들 */}
                                                <div className="flex flex-wrap gap-1.5">
                                                    {boss.options.map(opt => {
                                                        const isOptSelected = currentDiff === opt.diff;
                                                        return (
                                                            <button
                                                                key={opt.diff}
                                                                type="button"
                                                                onClick={() => handleToggleDailyBoss(boss.id, opt.diff)}
                                                                className={`flex-1 min-w-[70px] px-2.5 py-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                                                                    isOptSelected
                                                                        ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                                                                        : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-600'
                                                                }`}
                                                            >
                                                                <span>{opt.diff}</span>
                                                                <span className={`text-[10px] font-mono ${
                                                                    isOptSelected ? 'text-cyan-950 font-bold' : 'text-slate-300'
                                                                }`}>
                                                                    {formatMeso(opt.newPrice)}
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
                    )}
                </div>

                {/* 하단 광고 */}
                <InArticleAd dataAdSlot="6849727140" />
            </div>
        </main>
    );
}
