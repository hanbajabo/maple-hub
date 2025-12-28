'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as XLSX from 'xlsx';
import { InArticleAd } from '@/components/AdSense';

// 보스 타입 정의
type BossReward = {
    name: string;
    dim: number;
    clear: number;
    complete: number;
    category: string;
    group: string;
    priority: number;
    image?: string;
};

// 보스별 환영의 기억 획득량
const BOSS_REWARDS: BossReward[] = [
    // 입문
    { name: '노멀 데미안', dim: 1000, clear: 0, complete: 0, category: '입문', group: '데미안', priority: 1 },
    { name: '노멀 스우', dim: 1000, clear: 0, complete: 0, category: '입문', group: '스우', priority: 1 },
    { name: '노멀 가디언 엔젤 슬라임', dim: 1500, clear: 0, complete: 0, category: '입문', group: '가디언 엔젤 슬라임', priority: 1 },
    { name: '이지 윌', dim: 2000, clear: 0, complete: 0, category: '입문', group: '윌', priority: 1 },
    { name: '이지 루시드', dim: 2000, clear: 0, complete: 0, category: '입문', group: '루시드', priority: 1 },

    // 일반
    { name: '노멀 듄켈', dim: 2500, clear: 0, complete: 0, category: '일반', group: '듄켈', priority: 1 },
    { name: '노멀 더스크', dim: 2500, clear: 0, complete: 0, category: '일반', group: '더스크', priority: 1 },
    { name: '노멀 윌', dim: 2500, clear: 0, complete: 0, category: '일반', group: '윌', priority: 2 },
    { name: '노멀 루시드', dim: 2500, clear: 0, complete: 0, category: '일반', group: '루시드', priority: 2 },
    { name: '하드 데미안', dim: 3000, clear: 200, complete: 0, category: '일반', group: '데미안', priority: 2 },
    { name: '하드 스우', dim: 3000, clear: 200, complete: 0, category: '일반', group: '스우', priority: 2 },
    { name: '노멀 진힐라', dim: 3000, clear: 600, complete: 0, category: '일반', group: '진힐라', priority: 1 },
    { name: '하드 윌', dim: 3000, clear: 600, complete: 0, category: '일반', group: '윌', priority: 3 },
    { name: '하드 루시드', dim: 3000, clear: 600, complete: 0, category: '일반', group: '루시드', priority: 3 },

    // 고난이도
    { name: '카오스 더스크', dim: 3000, clear: 800, complete: 0, category: '고난이도', group: '더스크', priority: 2 },
    { name: '카오스 가디언 엔젤 슬라임', dim: 3000, clear: 800, complete: 0, category: '고난이도', group: '가디언 엔젤 슬라임', priority: 2 },
    { name: '하드 듄켈', dim: 3000, clear: 1000, complete: 0, category: '고난이도', group: '듄켈', priority: 2 },
    { name: '하드 진힐라', dim: 3000, clear: 1200, complete: 0, category: '고난이도', group: '진힐라', priority: 2 },
    { name: '노멀 카이', dim: 3000, clear: 1300, complete: 0, category: '고난이도', group: '카이', priority: 1 },
    { name: '노멀 세렌', dim: 3000, clear: 1400, complete: 0, category: '고난이도', group: '세렌', priority: 1 },
    { name: '이지 칼로스', dim: 3000, clear: 1600, complete: 0, category: '고난이도', group: '칼로스', priority: 1 },
    { name: '이지 최초의 대적자', dim: 3000, clear: 1800, complete: 0, category: '고난이도', group: '최초의 대적자', priority: 1 },
    { name: '하드 세렌', dim: 3000, clear: 2000, complete: 0, category: '고난이도', group: '세렌', priority: 2 },

    // 극한
    { name: '이지 카링', dim: 3000, clear: 2000, complete: 5, category: '극한', group: '카링', priority: 1 },
    { name: '하드 카이', dim: 3000, clear: 2000, complete: 5, category: '극한', group: '카이', priority: 2 },
    { name: '노멀 칼로스', dim: 3000, clear: 2000, complete: 10, category: '극한', group: '칼로스', priority: 2 },
    { name: '노멀 최초의 대적자', dim: 3000, clear: 2000, complete: 15, category: '극한', group: '최초의 대적자', priority: 2 },
    { name: '익스트림 스우', dim: 3000, clear: 2000, complete: 30, category: '극한', group: '스우', priority: 3 },
    { name: '노멀 카링', dim: 3000, clear: 2000, complete: 50, category: '극한', group: '카링', priority: 2 },
    { name: '카오스 칼로스 이상 보스', dim: 3000, clear: 2000, complete: 100, category: '극한', group: '최상위', priority: 4 },
];

const CATEGORY_NAMES = {
    '입문': '입문',
    '일반': '일반',
    '고난이도': '고난이도',
    '극한': '극한',
};

const TOTAL_WEEKS = 13; // 이벤트 총 주차 수

// 보스 코인샵 아이템 데이터
const BOSS_SHOP_ITEMS = [
    // 하급 (흐릿한 환영의 기억)
    { tier: '하급', name: 'VIP 버프 선택 교환권', price: 10, currency: 'dim', maxQuantity: null, weeklyRestock: false },
    { tier: '하급', name: '경험치 3배 쿠폰 (30분)', price: 100, currency: 'dim', weeklyQuantity: 7, maxQuantity: 91, weeklyRestock: true },
    { tier: '하급', name: '카르마 영원한 환생의 불꽃', price: 50, currency: 'dim', maxQuantity: 300, weeklyRestock: false },
    { tier: '하급', name: '스페셜 명예의 훈장', price: 100, currency: 'dim', maxQuantity: 350, weeklyRestock: false },
    { tier: '하급', name: '블랙 서큘레이터', price: 1000, currency: 'dim', maxQuantity: 30, weeklyRestock: false },
    { tier: '하급', name: '선택 심볼 교환권', price: 100, currency: 'dim', maxQuantity: 300, weeklyRestock: false },

    // 중급 (선명한 환영의 기억)
    { tier: '중급', name: '카르마 블랙 큐브', price: 120, currency: 'clear', weeklyQuantity: 3, maxQuantity: 39, weeklyRestock: true },
    { tier: '중급', name: '카르마 화이트 에디셔널 큐브', price: 240, currency: 'clear', weeklyQuantity: 3, maxQuantity: 39, weeklyRestock: true },
    { tier: '중급', name: '카르마 프리미엄 펫장비 주문서 선택권', price: 400, currency: 'clear', maxQuantity: 45, weeklyRestock: false },
    { tier: '중급', name: '카르마 놀라운 긍정의 혼돈 주문서 100%', price: 20, currency: 'clear', maxQuantity: 120, weeklyRestock: false },
    { tier: '중급', name: '아크 이노센트 주문서 100%', price: 20, currency: 'clear', maxQuantity: 30, weeklyRestock: false },
    { tier: '중급', name: '카르마 검은 환생의 불꽃', price: 20, currency: 'clear', maxQuantity: 750, weeklyRestock: false },
    { tier: '중급', name: '카르마 프리미엄 악세서리 주문서 선택권', price: 400, currency: 'clear', maxQuantity: 45, weeklyRestock: false },

    // 상급 (온전한 환영의 기억)
    { tier: '상급', name: '카르마 심연의 환생의 불꽃', price: 1, currency: 'complete', maxQuantity: 900, weeklyRestock: false },
    { tier: '상급', name: '솔 에르다', price: 10, currency: 'complete', maxQuantity: 30, weeklyRestock: false },
    { tier: '상급', name: '무공의 소울 조각', price: 10, currency: 'complete', maxQuantity: 30, weeklyRestock: false },
    { tier: '상급', name: '카르마 블랙 큐브', price: 2, currency: 'complete', weeklyQuantity: 7, maxQuantity: 91, weeklyRestock: true },
    { tier: '상급', name: '카르마 화이트 에디셔널 큐브', price: 3, currency: 'complete', weeklyQuantity: 7, maxQuantity: 91, weeklyRestock: true },
    { tier: '상급', name: '하트 업그레이드 모듈: 플라즈마', price: 5, currency: 'complete', maxQuantity: 1, weeklyRestock: false },
];

const getCurrencyName = (currency: string) => {
    switch (currency) {
        case 'dim': return '흐릿한 환영의 기억';
        case 'clear': return '선명한 환영의 기억';
        case 'complete': return '온전한 환영의 기억';
        default: return '';
    }
};

const getCurrencyColor = (currency: string) => {
    switch (currency) {
        case 'dim': return 'text-gray-400';
        case 'clear': return 'text-blue-400';
        case 'complete': return 'text-purple-400';
        default: return 'text-white';
    }
};

export default function BossMemoryCalculator() {
    const [currentWeek, setCurrentWeek] = useState(1);
    const [weeklyBosses, setWeeklyBosses] = useState<Map<number, Set<string>>>(
        new Map(Array.from({ length: TOTAL_WEEKS }, (_, i) => [i + 1, new Set()]))
    );
    const [cart, setCart] = useState<Map<string, number>>(new Map());
    const [showNav, setShowNav] = useState(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setShowNav(false);
        }
    };

    const getCurrentWeekBosses = () => weeklyBosses.get(currentWeek) || new Set();

    const toggleBoss = (bossName: string) => {
        const clickedBoss = BOSS_REWARDS.find(b => b.name === bossName);
        if (!clickedBoss) return;

        const currentBosses = new Set(getCurrentWeekBosses());

        if (bossName === '카오스 칼로스 이상 보스') {
            if (currentBosses.has(bossName)) {
                currentBosses.clear();
            } else {
                BOSS_REWARDS.forEach(boss => currentBosses.add(boss.name));
            }
        } else {
            const clickedBossValue = clickedBoss.dim + clickedBoss.clear + clickedBoss.complete;

            if (currentBosses.has(bossName)) {
                currentBosses.delete(bossName);
                BOSS_REWARDS.forEach(boss => {
                    const bossValue = boss.dim + boss.clear + boss.complete;
                    if (bossValue > clickedBossValue) {
                        currentBosses.delete(boss.name);
                    }
                });
            } else {
                currentBosses.add(bossName);
                BOSS_REWARDS.forEach(boss => {
                    const bossValue = boss.dim + boss.clear + boss.complete;
                    if (bossValue < clickedBossValue) {
                        currentBosses.add(boss.name);
                    }
                });
            }
        }

        const newWeeklyBosses = new Map(weeklyBosses);
        newWeeklyBosses.set(currentWeek, currentBosses);
        setWeeklyBosses(newWeeklyBosses);
    };

    const toggleCategoryBosses = (category: string) => {
        const categoryBosses = BOSS_REWARDS.filter(b => b.category === category);
        const currentBosses = getCurrentWeekBosses();
        const allSelected = categoryBosses.every(b => currentBosses.has(b.name));

        const newBosses = new Set(currentBosses);
        if (allSelected) {
            categoryBosses.forEach(b => newBosses.delete(b.name));
        } else {
            categoryBosses.forEach(b => newBosses.add(b.name));
        }

        const newWeeklyBosses = new Map(weeklyBosses);
        newWeeklyBosses.set(currentWeek, newBosses);
        setWeeklyBosses(newWeeklyBosses);
    };

    const resetAll = () => {
        setWeeklyBosses(new Map(Array.from({ length: TOTAL_WEEKS }, (_, i) => [i + 1, new Set()])));
    };

    const copyToFutureWeeks = () => {
        const currentBosses = getCurrentWeekBosses();
        const newWeeklyBosses = new Map(weeklyBosses);

        // 현재 주차 이후의 모든 주차에 현재 선택을 복사
        for (let week = currentWeek + 1; week <= TOTAL_WEEKS; week++) {
            newWeeklyBosses.set(week, new Set(currentBosses));
        }

        setWeeklyBosses(newWeeklyBosses);
    };

    const exportToExcel = () => {
        // 엑셀 데이터 준비
        const data = [];

        // 헤더
        data.push(['보스 코인샵 장바구니']);
        data.push([]);
        data.push(['아이템명', '분류', '개당 가격', '수량', '총 가격']);

        // 장바구니 아이템
        let dimTotal = 0, clearTotal = 0, completeTotal = 0;

        Array.from(cart.entries()).forEach(([itemKey, quantity]) => {
            const item = BOSS_SHOP_ITEMS.find(i => `${i.name}-${i.tier}` === itemKey);
            if (item) {
                const totalPrice = item.price * quantity;
                const currencyName = getCurrencyName(item.currency);

                if (item.currency === 'dim') dimTotal += totalPrice;
                else if (item.currency === 'clear') clearTotal += totalPrice;
                else if (item.currency === 'complete') completeTotal += totalPrice;

                data.push([
                    item.name,
                    currencyName,
                    item.price,
                    quantity,
                    totalPrice
                ]);
            }
        });

        // 합계
        data.push([]);
        data.push(['분류별 합계']);
        if (dimTotal > 0) data.push(['흐릿한 환영의 기억', '', '', '', dimTotal]);
        if (clearTotal > 0) data.push(['선명한 환영의 기억', '', '', '', clearTotal]);
        if (completeTotal > 0) data.push(['온전한 환영의 기억', '', '', '', completeTotal]);

        data.push([]);
        data.push(['내 획득량']);
        data.push(['흐릿한 환영의 기억', '', '', '', totalCalculations.totalDim]);
        data.push(['선명한 환영의 기억', '', '', '', totalCalculations.totalClear]);
        data.push(['온전한 환영의 기억', '', '', '', totalCalculations.totalComplete]);

        data.push([]);
        data.push(['남은 환영의 기억']);
        data.push(['흐릿한 환영의 기억', '', '', '', totalCalculations.totalDim - dimTotal]);
        data.push(['선명한 환영의 기억', '', '', '', totalCalculations.totalClear - clearTotal]);
        data.push(['온전한 환영의 기억', '', '', '', totalCalculations.totalComplete - completeTotal]);

        // 워크시트 생성
        const ws = XLSX.utils.aoa_to_sheet(data);

        // 열 너비 설정
        ws['!cols'] = [
            { wch: 45 }, // 아이템명
            { wch: 20 }, // 분류
            { wch: 12 }, // 개당 가격
            { wch: 8 },  // 수량
            { wch: 12 }  // 총 가격
        ];

        // 워크북 생성 및 파일 저장
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, '보스 코인샵');
        XLSX.writeFile(wb, '보스_코인샵_장바구니.xlsx');
    };

    // 현재 주차 계산
    const currentWeekCalculations = useMemo(() => {
        const selectedBosses = getCurrentWeekBosses();
        let highestBoss: BossReward | null = null;
        let highestValue = 0;

        selectedBosses.forEach(bossName => {
            const boss = BOSS_REWARDS.find(b => b.name === bossName);
            if (boss) {
                const totalValue = boss.dim + boss.clear + boss.complete;
                if (totalValue > highestValue) {
                    highestValue = totalValue;
                    highestBoss = boss;
                }
            }
        });

        let totalDim = 0, totalClear = 0, totalComplete = 0;
        if (highestBoss) {
            // TypeScript 타입 가드: highestBoss가 null이 아님을 보장
            const boss = highestBoss as BossReward;
            totalDim = boss.dim;
            totalClear = boss.clear;
            totalComplete = boss.complete;
        }

        return {
            totalDim: Math.min(totalDim, 3000),
            totalClear: Math.min(totalClear, 2000),
            totalComplete: Math.min(totalComplete, 100),
            bossCount: selectedBosses.size,
            highestBossName: highestBoss ? (highestBoss as BossReward).name : '',
        };
    }, [weeklyBosses, currentWeek]);

    // 전체 주차 합산 계산
    const totalCalculations = useMemo(() => {
        let grandTotalDim = 0;
        let grandTotalClear = 0;
        let grandTotalComplete = 0;

        weeklyBosses.forEach((selectedBosses) => {
            let highestBoss: BossReward | null = null;
            let highestValue = 0;

            selectedBosses.forEach(bossName => {
                const boss = BOSS_REWARDS.find(b => b.name === bossName);
                if (boss) {
                    const totalValue = boss.dim + boss.clear + boss.complete;
                    if (totalValue > highestValue) {
                        highestValue = totalValue;
                        highestBoss = boss;
                    }
                }
            });

            if (highestBoss) {
                const boss = highestBoss as BossReward;
                grandTotalDim += Math.min(boss.dim, 3000);
                grandTotalClear += Math.min(boss.clear, 2000);
                grandTotalComplete += Math.min(boss.complete, 100);
            }
        });

        return {
            totalDim: grandTotalDim,
            totalClear: grandTotalClear,
            totalComplete: grandTotalComplete,
        };
    }, [weeklyBosses]);

    // 보스 이름을 이미지 파일명으로 변환
    const getBossImageName = (bossName: string): string => {
        const nameMap: Record<string, string> = {
            '데미안': 'damien',
            '스우': 'lotus',
            '가디언 엔젤 슬라임': 'guardian-angel-slime',
            '윌': 'will',
            '루시드': 'lucid',
            '듄켈': 'dunkel',
            '더스크': 'dusk',
            '진힐라': 'jin-hilla',
            '카이': 'kai',
            '세렌': 'seren',
            '칼로스': 'kalos',
            '최초의 대적자': 'first-adversary',
            '카링': 'kaling',
        };

        for (const [key, value] of Object.entries(nameMap)) {
            if (bossName.includes(key)) {
                return value;
            }
        }
        return 'damien'; // 기본값
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3">
                    <div className="flex items-center justify-between gap-1 sm:gap-2">
                        <Link href="/blog" className="text-purple-300 hover:text-purple-100 transition-colors flex items-center gap-1 text-xs sm:text-sm md:text-base">
                            <span className="text-base sm:text-lg md:text-xl">←</span>
                            <span className="font-semibold">블로그<span className="hidden sm:inline">로</span></span>
                        </Link>
                        <h1 className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-right">
                            보스 코인 계산기
                        </h1>
                    </div>
                </div>
            </header>

            {/* 플로팅 네비게이션 버튼 */}
            <button
                onClick={() => setShowNav(!showNav)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
                aria-label="빠른 이동 메뉴"
            >
                <span className="text-2xl">{showNav ? '✕' : '📍'}</span>
            </button>

            {/* 플로팅 네비게이션 메뉴 */}
            {showNav && (
                <div className="fixed bottom-24 right-6 z-40 bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-500/30 p-4 w-64">
                    <h3 className="text-white font-bold mb-3 text-sm">빠른 이동</h3>
                    <div className="space-y-2">
                        <button
                            onClick={() => scrollToSection('intro')}
                            className="w-full text-left px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all text-sm"
                        >
                            ⚔️ 소개
                        </button>
                        <button
                            onClick={() => scrollToSection('summary')}
                            className="w-full text-left px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all text-sm"
                        >
                            🏆 전체 획듍
                        </button>
                        <button
                            onClick={() => scrollToSection('weekly')}
                            className="w-full text-left px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all text-sm"
                        >
                            📅 주차 선택
                        </button>
                        <button
                            onClick={() => scrollToSection('bosses')}
                            className="w-full text-left px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all text-sm"
                        >
                            ⚔️ 보스 선택
                        </button>
                        <button
                            onClick={() => scrollToSection('shop')}
                            className="w-full text-left px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all text-sm"
                        >
                            🛒 코인샵
                        </button>
                        <button
                            onClick={() => scrollToSection('tips')}
                            className="w-full text-left px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all text-sm"
                        >
                            💡 팁
                        </button>
                    </div>
                </div>
            )}

            <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
                <section id="intro" className="mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border border-purple-500/20">
                    <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">
                        ⚔️ 보스 코인 계산기
                    </h2>
                    <p className="text-gray-300 text-[10px] sm:text-xs md:text-sm leading-relaxed mb-1.5 sm:mb-2">
                        주차별 보스 선택 → 13주 획득량 확인!
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] md:text-xs">
                        <span className="px-1 sm:px-1.5 py-0.5 bg-purple-500/20 rounded text-purple-300 border border-purple-500/30 whitespace-nowrap">
                            📅 주차별
                        </span>
                        <span className="px-1 sm:px-1.5 py-0.5 bg-pink-500/20 rounded text-pink-300 border border-pink-500/30 whitespace-nowrap">
                            💎 차이지급
                        </span>
                        <span className="px-1 sm:px-1.5 py-0.5 bg-blue-500/20 rounded text-blue-300 border border-blue-500/30 whitespace-nowrap">
                            📊 합산
                        </span>
                    </div>
                </section>

                <div className="my-6">
                    <InArticleAd dataAdSlot="8162808816" />
                </div>

                {/* 전체 합산 요약 */}
                <section id="summary" className="mb-6 sm:mb-8 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-yellow-500/30 shadow-xl">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4">🏆 전체 기간 획득 환영의 기억 (13주)</h3>

                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                        <div className="rounded p-1.5 sm:p-2 border bg-gradient-to-br from-gray-500/20 to-gray-600/20 border-gray-500/30">
                            <div className="text-[9px] sm:text-xs text-gray-400 mb-0.5">흐릿한</div>
                            <div className="text-sm sm:text-base md:text-lg font-bold text-gray-200">
                                {totalCalculations.totalDim.toLocaleString()}
                            </div>
                            <div className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">최대 39k</div>
                        </div>
                        <div className="rounded p-1.5 sm:p-2 border bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
                            <div className="text-[9px] sm:text-xs text-blue-400 mb-0.5">선명한</div>
                            <div className="text-sm sm:text-base md:text-lg font-bold text-blue-200">
                                {totalCalculations.totalClear.toLocaleString()}
                            </div>
                            <div className="text-[8px] sm:text-[10px] text-blue-500 mt-0.5">최대 26k</div>
                        </div>
                        <div className="rounded p-1.5 sm:p-2 border bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
                            <div className="text-[9px] sm:text-xs text-purple-400 mb-0.5">온전한</div>
                            <div className="text-sm sm:text-base md:text-lg font-bold text-purple-200">
                                {totalCalculations.totalComplete.toLocaleString()}
                            </div>
                            <div className="text-[8px] sm:text-[10px] text-purple-500 mt-0.5">최대 1.3k</div>
                        </div>
                    </div>
                </section>

                {/* 주차 선택 탭 */}
                <section id="weekly" className="mb-3 sm:mb-4 md:mb-6">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <h3 className="text-xs sm:text-sm md:text-base font-bold text-white">📅 주차</h3>
                        <button
                            onClick={resetAll}
                            className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded border border-red-500/30 transition-all whitespace-nowrap text-[10px] sm:text-xs flex-shrink-0"
                        >
                            <span className="hidden sm:inline">🔄 </span>전체 초기화
                        </button>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-13 gap-1 sm:gap-2">
                        {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map((week) => (
                            <button
                                key={week}
                                onClick={() => setCurrentWeek(week)}
                                className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg border text-xs sm:text-sm font-semibold transition-all ${currentWeek === week
                                    ? 'bg-purple-500 border-purple-400 text-white'
                                    : 'bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700'
                                    }`}
                            >
                                {week}주차
                            </button>
                        ))}
                    </div>
                </section>

                {/* 현재 주차 획득 환영의 기억 */}
                <section className="mb-3 sm:mb-4 md:mb-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border border-slate-700 shadow-xl">
                    <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-2 sm:mb-3">👻 {currentWeek}주차 획득</h3>

                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                        <div className="rounded p-1.5 sm:p-2 border bg-gray-500/10 border-gray-500/30">
                            <div className="text-[9px] sm:text-xs text-gray-400 mb-0.5">흐릿한</div>
                            <div className="text-sm sm:text-base md:text-lg font-bold text-gray-300">
                                {currentWeekCalculations.totalDim.toLocaleString()}
                            </div>
                            <div className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">최대 3k</div>
                        </div>
                        <div className="rounded p-1.5 sm:p-2 border bg-blue-500/10 border-blue-500/30">
                            <div className="text-[9px] sm:text-xs text-blue-400 mb-0.5">선명한</div>
                            <div className="text-sm sm:text-base md:text-lg font-bold text-blue-300">
                                {currentWeekCalculations.totalClear.toLocaleString()}
                            </div>
                            <div className="text-[8px] sm:text-[10px] text-blue-500 mt-0.5">최대 2k</div>
                        </div>
                        <div className="rounded p-1.5 sm:p-2 border bg-purple-500/10 border-purple-500/30">
                            <div className="text-[9px] sm:text-xs text-purple-400 mb-0.5">온전한</div>
                            <div className="text-sm sm:text-base md:text-lg font-bold text-purple-300">
                                {currentWeekCalculations.totalComplete.toLocaleString()}
                            </div>
                            <div className="text-[8px] sm:text-[10px] text-purple-500 mt-0.5">최대 100</div>
                        </div>
                    </div>

                    <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-700">
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-yellow-400 text-[10px] sm:text-xs">
                                선택: <span className="font-bold">{currentWeekCalculations.bossCount}개</span>
                                {currentWeekCalculations.highestBossName && (
                                    <span className="text-gray-500 ml-1 sm:ml-2 text-[9px] sm:text-[10px]">(적용: {currentWeekCalculations.highestBossName})</span>
                                )}
                            </div>
                            {currentWeek < TOTAL_WEEKS && currentWeekCalculations.bossCount > 0 && (
                                <button
                                    onClick={copyToFutureWeeks}
                                    className="px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded border border-green-500/30 transition-all whitespace-nowrap text-[10px] sm:text-xs flex-shrink-0"
                                >
                                    <span className="hidden sm:inline">📋 </span>이후 주차 동일
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* 보스 선택 */}
                <section id="bosses" className="mb-6 sm:mb-8 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-emerald-500/20">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">⚔️ {currentWeek}주차 주간 보스 선택</h3>

                    {Object.entries(CATEGORY_NAMES).map(([category, displayName]) => {
                        const categoryBosses = BOSS_REWARDS.filter(b => b.category === category);
                        const currentBosses = getCurrentWeekBosses();
                        const allSelected = categoryBosses.every(b => currentBosses.has(b.name));

                        return (
                            <div key={category} className="mb-6 last:mb-0">
                                <div className="flex items-center justify-between mb-3 sm:mb-4">
                                    <h4 className="text-base sm:text-lg font-bold text-white">
                                        {displayName}
                                    </h4>
                                    <button
                                        onClick={() => toggleCategoryBosses(category)}
                                        className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${allSelected
                                            ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                                            : 'bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700'
                                            }`}
                                    >
                                        {allSelected ? '✓ 선택됨' : '일괄 선택'}
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                    {categoryBosses.map((boss) => {
                                        const isSelected = getCurrentWeekBosses().has(boss.name);

                                        return (
                                            <button
                                                key={boss.name}
                                                onClick={() => toggleBoss(boss.name)}
                                                className={`p-2 sm:p-3 rounded-lg border transition-all text-left ${isSelected
                                                    ? 'bg-purple-500/20 border-purple-500/30'
                                                    : 'bg-slate-900/50 border-slate-700 hover:bg-slate-800/50'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5 sm:gap-2">
                                                        <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-slate-800 flex-shrink-0">
                                                            <Image
                                                                src={`/images/bosses/${getBossImageName(boss.name)}.png`}
                                                                alt={boss.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <span className="truncate">{boss.name}</span>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        {isSelected && <span className="text-purple-400">✓</span>}
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-1 text-[9px] sm:text-xs">
                                                    <span className="text-gray-400">{boss.dim.toLocaleString()}</span>
                                                    {boss.clear > 0 && (
                                                        <span className="text-blue-400">/ {boss.clear.toLocaleString()}</span>
                                                    )}
                                                    {boss.complete > 0 && (
                                                        <span className="text-purple-400">/ {boss.complete.toLocaleString()}</span>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </section>

                <div className="my-6">
                    <InArticleAd dataAdSlot="6849727140" />
                </div>

                {/* 쇼핑용 전체 합산 표시 */}
                <section id="shop" className="mb-3 sm:mb-4 md:mb-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border border-yellow-500/30 shadow-xl">
                    <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-2 sm:mb-3">🏆 전체 획득 (13주)</h3>

                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                        <div className="rounded p-1.5 sm:p-2 border bg-gradient-to-br from-gray-500/20 to-gray-600/20 border-gray-500/30">
                            <div className="text-[9px] sm:text-xs text-gray-400 mb-0.5">흐릿한</div>
                            <div className="text-sm sm:text-base md:text-lg font-bold text-gray-200">
                                {totalCalculations.totalDim.toLocaleString()}
                            </div>
                            <div className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">최대 39k</div>
                        </div>
                        <div className="rounded p-1.5 sm:p-2 border bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
                            <div className="text-[9px] sm:text-xs text-blue-400 mb-0.5">선명한</div>
                            <div className="text-sm sm:text-base md:text-lg font-bold text-blue-200">
                                {totalCalculations.totalClear.toLocaleString()}
                            </div>
                            <div className="text-[8px] sm:text-[10px] text-blue-500 mt-0.5">최대 26k</div>
                        </div>
                        <div className="rounded p-1.5 sm:p-2 border bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
                            <div className="text-[9px] sm:text-xs text-purple-400 mb-0.5">온전한</div>
                            <div className="text-sm sm:text-base md:text-lg font-bold text-purple-200">
                                {totalCalculations.totalComplete.toLocaleString()}
                            </div>
                            <div className="text-[8px] sm:text-[10px] text-purple-500 mt-0.5">최대 1.3k</div>
                        </div>
                    </div>
                </section>

                {/* 쇼핑 섹션 */}
                <section className="mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border border-emerald-500/20">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4">🛒 환영의 기억 기록관 코인샵</h3>
                    <p className="text-gray-400 text-[10px] sm:text-xs mb-2 sm:mb-3">
                        계산된 환영의 기억으로 아이템을 쇼핑하세요!
                    </p>

                    {['하급', '중급', '상급'].map((tier) => {
                        const tierItems = BOSS_SHOP_ITEMS.filter(item => item.tier === tier);
                        const tierColor = tier === '하급' ? 'gray' : tier === '중급' ? 'blue' : 'purple';

                        return (
                            <div key={tier} className="mb-3 sm:mb-4 last:mb-0">
                                <h4 className={`text-xs sm:text-sm font-bold text-${tierColor}-300 mb-2`}>
                                    {tier === '하급' && '🌫️ '}{tier === '중급' && '💎 '}{tier === '상급' && '✨ '}
                                    {tier}
                                </h4>
                                <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                                    {tierItems.map((item, idx) => {
                                        const cartQuantity = cart.get(`${item.name}-${item.tier}`) || 0;
                                        const totalPrice = item.price * cartQuantity;
                                        const ownedMemory = item.currency === 'dim' ? totalCalculations.totalDim :
                                            item.currency === 'clear' ? totalCalculations.totalClear :
                                                totalCalculations.totalComplete;
                                        const canAfford = ownedMemory >= totalPrice;

                                        return (
                                            <div
                                                key={idx}
                                                className="bg-slate-900/50 rounded p-1.5 sm:p-2 border border-slate-700"
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-[10px] sm:text-xs font-semibold text-white truncate">
                                                            {item.name}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-[8px] sm:text-[10px]">
                                                            <span className={`font-bold ${getCurrencyColor(item.currency)}`}>
                                                                {item.price.toLocaleString()}
                                                            </span>
                                                            <span className="text-gray-500">
                                                                {item.weeklyRestock && item.weeklyQuantity ? (
                                                                    <>주간 최대 {item.weeklyQuantity} (최대 {item.maxQuantity}개)</>
                                                                ) : (
                                                                    <>({item.maxQuantity ? `최대 ${item.maxQuantity}` : '무제한'})</>
                                                                )}
                                                            </span>
                                                            {item.weeklyRestock && (
                                                                <span className="px-1 py-0.5 bg-green-500/20 text-green-400 rounded text-[7px] sm:text-[9px] border border-green-500/30">
                                                                    주간재입고
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-0.5 sm:gap-1">
                                                        <button
                                                            onClick={() => {
                                                                const newCart = new Map(cart);
                                                                const key = `${item.name}-${item.tier}`;
                                                                const current = newCart.get(key) || 0;
                                                                if (current > 0) {
                                                                    newCart.set(key, current - 1);
                                                                    if (newCart.get(key) === 0) {
                                                                        newCart.delete(key);
                                                                    }
                                                                    setCart(newCart);
                                                                }
                                                            }}
                                                            className="w-5 h-5 sm:w-6 sm:h-6 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded flex items-center justify-center text-white text-[10px] sm:text-xs transition-colors disabled:opacity-30"
                                                            disabled={cartQuantity === 0}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-6 sm:w-8 text-center text-[10px] sm:text-xs font-bold text-white">
                                                            {cartQuantity}
                                                        </span>
                                                        <button
                                                            onClick={() => {
                                                                const newCart = new Map(cart);
                                                                const key = `${item.name}-${item.tier}`;
                                                                const current = newCart.get(key) || 0;
                                                                if (!item.maxQuantity || current < item.maxQuantity) {
                                                                    newCart.set(key, current + 1);
                                                                    setCart(newCart);
                                                                }
                                                            }}
                                                            className="w-5 h-5 sm:w-6 sm:h-6 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded flex items-center justify-center text-white text-[10px] sm:text-xs transition-colors disabled:opacity-30"
                                                            disabled={item.maxQuantity !== null && cartQuantity >= item.maxQuantity}
                                                        >
                                                            +
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                const newCart = new Map(cart);
                                                                newCart.delete(`${item.name}-${item.tier}`);
                                                                setCart(newCart);
                                                            }}
                                                            className="px-1 py-0.5 bg-red-600/80 hover:bg-red-500 border border-red-500 rounded text-white text-[8px] sm:text-[10px] font-bold transition-colors disabled:opacity-30"
                                                            disabled={cartQuantity === 0}
                                                        >
                                                            0
                                                        </button>
                                                        {item.maxQuantity && (
                                                            <button
                                                                onClick={() => {
                                                                    const newCart = new Map(cart);
                                                                    newCart.set(`${item.name}-${item.tier}`, item.maxQuantity!);
                                                                    setCart(newCart);
                                                                }}
                                                                className="px-1 py-0.5 bg-emerald-600/80 hover:bg-emerald-500 border border-emerald-500 rounded text-white text-[8px] sm:text-[10px] font-bold transition-colors"
                                                            >
                                                                Max
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {cartQuantity > 0 && (
                                                    <div className={`mt-1 pt-1 border-t text-[8px] sm:text-[10px] ${canAfford ? 'border-emerald-500/30 text-emerald-400' : 'border-red-500/30 text-red-400'}`}>
                                                        {canAfford ? '✓ 가능' : '✗ 부족'} · 총 {totalPrice.toLocaleString()}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}

                    {cart.size > 0 && (() => {
                        let dimTotal = 0, clearTotal = 0, completeTotal = 0;

                        Array.from(cart.entries()).forEach(([itemKey, quantity]) => {
                            const item = BOSS_SHOP_ITEMS.find(i => `${i.name}-${i.tier}` === itemKey);
                            if (item) {
                                const total = item.price * quantity;
                                if (item.currency === 'dim') dimTotal += total;
                                else if (item.currency === 'clear') clearTotal += total;
                                else if (item.currency === 'complete') completeTotal += total;
                            }
                        });

                        const dimAfford = totalCalculations.totalDim >= dimTotal;
                        const clearAfford = totalCalculations.totalClear >= clearTotal;
                        const completeAfford = totalCalculations.totalComplete >= completeTotal;
                        const allAfford = dimAfford && clearAfford && completeAfford;

                        return (
                            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-slate-800/80 rounded border border-emerald-500/30">
                                <h4 className="text-xs sm:text-sm font-bold text-white mb-2">🛒 장바구니</h4>
                                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3 sm:gap-2 mb-2">
                                    {dimTotal > 0 && (
                                        <div className={`rounded p-1.5 border text-center ${dimAfford ? 'bg-gray-500/10 border-gray-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                            <div className="text-[8px] sm:text-[10px] text-gray-400">흐릿한</div>
                                            <div className="text-xs sm:text-sm font-bold text-gray-300">{dimTotal.toLocaleString()}</div>
                                            <div className={`text-[7px] sm:text-[9px] ${dimAfford ? 'text-emerald-400' : 'text-red-400'}`}>
                                                남음: {(totalCalculations.totalDim - dimTotal).toLocaleString()}
                                            </div>
                                        </div>
                                    )}
                                    {clearTotal > 0 && (
                                        <div className={`rounded p-1.5 border text-center ${clearAfford ? 'bg-blue-500/10 border-blue-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                            <div className="text-[8px] sm:text-[10px] text-blue-400">선명한</div>
                                            <div className="text-xs sm:text-sm font-bold text-blue-300">{clearTotal.toLocaleString()}</div>
                                            <div className={`text-[7px] sm:text-[9px] ${clearAfford ? 'text-emerald-400' : 'text-red-400'}`}>
                                                남음: {(totalCalculations.totalClear - clearTotal).toLocaleString()}
                                            </div>
                                        </div>
                                    )}
                                    {completeTotal > 0 && (
                                        <div className={`rounded p-1.5 border text-center ${completeAfford ? 'bg-purple-500/10 border-purple-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                            <div className="text-[8px] sm:text-[10px] text-purple-400">온전한</div>
                                            <div className="text-xs sm:text-sm font-bold text-purple-300">{completeTotal.toLocaleString()}</div>
                                            <div className={`text-[7px] sm:text-[9px] ${completeAfford ? 'text-emerald-400' : 'text-red-400'}`}>
                                                남음: {(totalCalculations.totalComplete - completeTotal).toLocaleString()}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className={`text-center py-1.5 sm:py-2 rounded text-[10px] sm:text-xs font-bold ${allAfford ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {allAfford ? '✓ 모두 교환 가능!' : '✗ 환영의 기억 부족'}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                    <button
                                        onClick={exportToExcel}
                                        className="flex-1 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded border border-emerald-500/30 transition-all text-[10px] sm:text-xs font-semibold"
                                    >
                                        📊 엑셀로 내보내기
                                    </button>
                                    <button
                                        onClick={() => setCart(new Map())}
                                        className="flex-1 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded border border-red-500/30 transition-all text-[10px] sm:text-xs"
                                    >
                                        🗑️ 장바구니 비우기
                                    </button>
                                </div>
                            </div>
                        );
                    })()}
                </section>

                {/* 팁 섹션 */}
                <section id="tips" className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-500/20">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">💡 계산기 활용 팁</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 text-gray-300">
                        <div className="bg-slate-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="font-bold text-purple-300 mb-1 sm:mb-2 text-sm sm:text-base">📅 주차별 선택</div>
                            <div className="text-xs sm:text-sm leading-relaxed">
                                13주 동안 각 주마다 다른 보스를 선택할 수 있어요! 주차를 바꾸면서 계획을 세워보세요.
                            </div>
                        </div>
                        <div className="bg-slate-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="font-bold text-blue-300 mb-1 sm:mb-2 text-sm sm:text-base">💎 차이만 지급</div>
                            <div className="text-xs sm:text-sm leading-relaxed">
                                선택한 보스 중 가장 높은 보상을 주는 보스의 환영의 기억만 지급됩니다!
                            </div>
                        </div>
                        <div className="bg-slate-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="font-bold text-green-300 mb-1 sm:mb-2 text-sm sm:text-base">🏆 전체 합산</div>
                            <div className="text-xs sm:text-sm leading-relaxed">
                                13주 동안 모을 수 있는 환영의 기억 총합을 확인하고 쇼핑 계획을 세우세요!
                            </div>
                        </div>
                        <div className="bg-slate-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="font-bold text-yellow-300 mb-1 sm:mb-2 text-sm sm:text-base">⏰ 주간 초기화</div>
                            <div className="text-xs sm:text-sm leading-relaxed">
                                환영의 기억은 매주 목요일 오전 0시에 초기화됩니다!
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
