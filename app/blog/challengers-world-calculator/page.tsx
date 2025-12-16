'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as XLSX from 'xlsx';

// 레벨별 보상 데이터
const LEVEL_REWARDS = [
    { level: 260, points: 3000, coins: 3000 },
    { level: 261, points: 300, coins: 300 },
    { level: 262, points: 300, coins: 300 },
    { level: 263, points: 300, coins: 300 },
    { level: 264, points: 300, coins: 300 },
    { level: 265, points: 300, coins: 300 },
    { level: 266, points: 300, coins: 300 },
    { level: 267, points: 300, coins: 300 },
    { level: 268, points: 300, coins: 300 },
    { level: 269, points: 300, coins: 300 },
    { level: 270, points: 700, coins: 600 },
    { level: 271, points: 700, coins: 600 },
    { level: 272, points: 700, coins: 600 },
    { level: 273, points: 700, coins: 600 },
    { level: 274, points: 700, coins: 600 },
    { level: 275, points: 1000, coins: 900 },
    { level: 276, points: 1000, coins: 900 },
    { level: 277, points: 1000, coins: 900 },
    { level: 278, points: 1000, coins: 900 },
    { level: 279, points: 1000, coins: 900 },
    { level: 280, points: 1500, coins: 1200 },
    { level: 281, points: 1500, coins: 1200 },
    { level: 282, points: 1500, coins: 1200 },
    { level: 283, points: 1500, coins: 1200 },
    { level: 284, points: 1500, coins: 1200 },
    { level: 285, points: 2000, coins: 1500 },
    { level: 286, points: 2000, coins: 1500 },
    { level: 287, points: 2000, coins: 1500 },
    { level: 288, points: 2000, coins: 1500 },
    { level: 289, points: 2000, coins: 1500 },
    { level: 290, points: 5000, coins: 2500 },
];

// 보스별 보상 데이터
const BOSS_REWARDS = [
    { name: '시그너스 (이지)', points: 100, coins: 100, premiumCoins: 0, category: 'easy', image: 'cygnus' },
    { name: '시그너스 (노멀)', points: 100, coins: 100, premiumCoins: 0, category: 'easy', image: 'cygnus' },
    { name: '자쿰 (카오스)', points: 100, coins: 100, premiumCoins: 0, category: 'easy', image: 'zakum' },
    { name: '힐라 (하드)', points: 100, coins: 100, premiumCoins: 0, category: 'easy', image: 'hilla' },
    { name: '핑크빈 (카오스)', points: 100, coins: 100, premiumCoins: 0, category: 'easy', image: 'pink-bean' },
    { name: '피에르 (카오스)', points: 100, coins: 100, premiumCoins: 0, category: 'easy', image: 'pierre' },
    { name: '반반 (카오스)', points: 100, coins: 100, premiumCoins: 0, category: 'easy', image: 'banban' },
    { name: '블러디퀸 (카오스)', points: 100, coins: 100, premiumCoins: 0, category: 'easy', image: 'bloody-queen' },
    { name: '매그너스 (하드)', points: 200, coins: 100, premiumCoins: 0, category: 'normal', image: 'magnus' },
    { name: '벨룸 (카오스)', points: 200, coins: 100, premiumCoins: 0, category: 'normal', image: 'vellum' },
    { name: '파풀라투스 (카오스)', points: 300, coins: 100, premiumCoins: 0, category: 'normal', image: 'papulatus' },
    { name: '스우 (노멀)', points: 400, coins: 200, premiumCoins: 0, category: 'normal', image: 'lotus' },
    { name: '스우 (하드)', points: 1500, coins: 400, premiumCoins: 0, category: 'hard', image: 'lotus' },
    { name: '데미안 (노멀)', points: 400, coins: 200, premiumCoins: 0, category: 'normal', image: 'damien' },
    { name: '데미안 (하드)', points: 1500, coins: 400, premiumCoins: 0, category: 'hard', image: 'damien' },
    { name: '가디언 엔젤 슬라임 (노멀)', points: 500, coins: 200, premiumCoins: 0, category: 'normal', image: 'guardian-angel-slime' },
    { name: '가디언 엔젤 슬라임 (카오스)', points: 2500, coins: 600, premiumCoins: 0, category: 'hard', image: 'guardian-angel-slime' },
    { name: '루시드 (이지)', points: 500, coins: 200, premiumCoins: 0, category: 'normal', image: 'lucid' },
    { name: '루시드 (노멀)', points: 1000, coins: 300, premiumCoins: 0, category: 'hard', image: 'lucid' },
    { name: '루시드 (하드)', points: 2000, coins: 600, premiumCoins: 0, category: 'hard', image: 'lucid' },
    { name: '윌 (이지)', points: 500, coins: 200, premiumCoins: 0, category: 'normal', image: 'will' },
    { name: '윌 (노멀)', points: 1000, coins: 300, premiumCoins: 0, category: 'hard', image: 'will' },
    { name: '윌 (하드)', points: 2500, coins: 600, premiumCoins: 0, category: 'hard', image: 'will' },
    { name: '더스크 (노멀)', points: 1000, coins: 300, premiumCoins: 0, category: 'hard', image: 'dusk' },
    { name: '더스크 (카오스)', points: 2500, coins: 600, premiumCoins: 0, category: 'hard', image: 'dusk' },
    { name: '진 힐라 (노멀)', points: 2000, coins: 600, premiumCoins: 0, category: 'hard', image: 'jin-hilla' },
    { name: '진 힐라 (하드)', points: 3000, coins: 1000, premiumCoins: 0, category: 'extreme', image: 'jin-hilla' },
    { name: '듄켈 (노멀)', points: 1000, coins: 300, premiumCoins: 0, category: 'hard', image: 'dunkel' },
    { name: '듄켈 (하드)', points: 3000, coins: 1000, premiumCoins: 0, category: 'extreme', image: 'dunkel' },
    { name: '검은 마법사 (하드)', points: 6000, coins: 1400, premiumCoins: 20, category: 'extreme', image: 'black-mage' },
    { name: '선택받은 세렌 (노멀)', points: 6000, coins: 1400, premiumCoins: 20, category: 'extreme', image: 'seren' },
    { name: '선택받은 세렌 (하드)', points: 7000, coins: 2000, premiumCoins: 30, category: 'extreme', image: 'seren' },
    { name: '감시자 칼로스 (이지)', points: 7000, coins: 2000, premiumCoins: 30, category: 'extreme', image: 'kalos' },
    { name: '감시자 칼로스 (노멀)', points: 9000, coins: 3000, premiumCoins: 60, category: 'extreme', image: 'kalos' },
    { name: '최초의 대적자 (이지)', points: 7000, coins: 2000, premiumCoins: 30, category: 'extreme', image: 'first-adversary' },
    { name: '최초의 대적자 (노멀)', points: 9000, coins: 3000, premiumCoins: 60, category: 'extreme', image: 'first-adversary' },
    { name: '카링 (이지)', points: 9000, coins: 3000, premiumCoins: 60, category: 'extreme', image: 'kaling' },
    { name: '카이 (노멀)', points: 5000, coins: 1200, premiumCoins: 10, category: 'extreme', image: 'kai' },
    { name: '카이 (하드)', points: 8000, coins: 3000, premiumCoins: 60, category: 'extreme', image: 'kai' },
];

// 티어 정보
const TIERS = [
    { name: '비기너', nameEn: 'Beginner', points: 0, color: 'from-gray-600 to-gray-700', rewards: [] },
    {
        name: '브론즈',
        nameEn: 'Bronze',
        points: 5000,
        color: 'from-amber-700 to-amber-900',
        rewards: [
            '챌린저스 월드 시즌3 브론즈 훈장 교환권',
            '솔 에르다 조각 100개',
            '솔 에르다 3개',
            '챌린저스 휘장로이드 교환권'
        ]
    },
    {
        name: '실버',
        nameEn: 'Silver',
        points: 10000,
        color: 'from-gray-400 to-gray-600',
        rewards: [
            '챌린저스 월드 시즌3 실버 훈장 교환권',
            '챌린저스 4레벨 특수 스킬 반지 선택권',
            '솔 에르다 조각 100개',
            '솔 에르다 3개'
        ]
    },
    {
        name: '골드',
        nameEn: 'Gold',
        points: 15000,
        color: 'from-yellow-400 to-yellow-600',
        rewards: [
            '챌린저스 월드 시즌3 골드 훈장 교환권',
            '솔 에르다 조각 100개',
            '솔 에르다 3개'
        ]
    },
    {
        name: '플래티넘',
        nameEn: 'Platinum',
        points: 20000,
        color: 'from-cyan-400 to-cyan-600',
        rewards: [
            '챌린저스 월드 시즌3 플래티넘 훈장 교환권',
            '솔 에르다 조각 300개',
            '솔 에르다 5개'
        ]
    },
    {
        name: '에메랄드',
        nameEn: 'Emerald',
        points: 30000,
        color: 'from-emerald-400 to-emerald-600',
        rewards: [
            '챌린저스 월드 시즌3 에메랄드 훈장 교환권',
            '궁극의 유니온 성장의 비약 20개',
            '카르마 레전드리 잠재능력 부여 스크롤 100% (200제) 1개',
            '카르마 블랙 큐브 30개'
        ]
    },
    {
        name: '다이아몬드',
        nameEn: 'Diamond',
        points: 40000,
        color: 'from-blue-400 to-blue-600',
        rewards: [
            '챌린저스 월드 시즌3 다이아몬드 훈장 교환권',
            '카르마 레전드리 잠재능력 부여 스크롤 100% (200제) 1개',
            '카르마 에디셔널 유니크 잠재능력 부여 스크롤 100% (200제) 1개',
            '카르마 화이트 에디셔널 큐브 30개',
            '코지 윈터 세트 교환권'
        ]
    },
    {
        name: '마스터',
        nameEn: 'Master',
        points: 65000,
        color: 'from-purple-500 to-purple-700',
        special: '+ 노멀 카이 처치',
        rewards: [
            '챌린저스 월드 시즌3 마스터 훈장 교환권',
            '카르마 블랙 큐브 30개',
            '카르마 화이트 에디셔널 큐브 30개'
        ]
    },
    {
        name: '챌린저',
        nameEn: 'Challenger',
        points: 90000,
        color: 'from-red-500 to-orange-500',
        special: '+ 하드 카이 처치',
        rewards: [
            '챌린저스 월드 시즌3 챌린저 훈장 교환권 (순위 출력)',
            '챌린저스 월드 시즌3 챌린저 가구 교환권'
        ]
    },
];

// 코인샵 아이템 데이터
const COIN_SHOP_ITEMS = [
    { category: '일반', name: '경험치 3배 쿠폰 (30분)', price: 100, currency: 'normal', maxQuantity: 119, note: '매주 7개씩 17주 (총 119개)' },
    { category: '일반', name: 'VIP 버프 선택 교환권', price: 30, currency: 'normal', maxQuantity: null },
    { category: '일반', name: '카르마 검은 환생의 불꽃', price: 50, currency: 'normal', maxQuantity: 1000 },
    { category: '일반', name: '솔 에르다 조각', price: 40, currency: 'normal', maxQuantity: 500 },
    { category: '일반', name: '솔 에르다', price: 2000, currency: 'normal', maxQuantity: 5 },
    { category: '일반', name: '수상한 큐브', price: 5, currency: 'normal', maxQuantity: 1000 },
    { category: '일반', name: '카르마 명장의 큐브', price: 100, currency: 'normal', maxQuantity: 100 },
    { category: '일반', name: '카르마 수상한 에디셔널 큐브', price: 20, currency: 'normal', maxQuantity: 1000 },
    { category: '일반', name: '펫장비 주문서 선택권', price: 500, currency: 'normal', maxQuantity: 100 },
    { category: '일반', name: '에픽 잠재능력 부여 스크롤 100%', price: 150, currency: 'normal', maxQuantity: 30 },
    { category: '일반', name: '에디셔널 잠재능력 부여 스크롤 100%', price: 150, currency: 'normal', maxQuantity: 30 },
    { category: '일반', name: '카르마 프리미엄 펫장비 주문서 선택권', price: 1000, currency: 'normal', maxQuantity: 10 },
    { category: '일반', name: '이노센트 주문서 100%', price: 50, currency: 'normal', maxQuantity: 10 },
    { category: '일반', name: '순백의 주문서 100%', price: 100, currency: 'normal', maxQuantity: 10 },
    { category: '일반', name: '카르마 스타포스 17성 강화권 (160제)', price: 3000, currency: 'normal', maxQuantity: 3 },
    { category: '일반', name: '카르마 프리미엄 악세서리 주문서 선택권', price: 1000, currency: 'normal', maxQuantity: 10 },
    { category: '일반', name: '블랙 보조 무기 상자', price: 100, currency: 'normal', maxQuantity: 1 },
    { category: '일반', name: '주문의 흔적 (1000개)', price: 100, currency: 'normal', maxQuantity: null },
    { category: '스페셜', name: '카르마 심연의 환생의 불꽃', price: 1, currency: 'premium', maxQuantity: 250 },
    { category: '스페셜', name: '솔 에르다 조각 (10개 묶음)', price: 1, currency: 'premium', maxQuantity: 10 },
    { category: '스페셜', name: '솔 에르다', price: 3, currency: 'premium', maxQuantity: 20 },
    { category: '스페셜', name: '카르마 블랙 큐브', price: 1, currency: 'premium', maxQuantity: 20 },
    { category: '스페셜', name: '카르마 화이트 에디셔널 큐브', price: 2, currency: 'premium', maxQuantity: 20 },
];

export default function ChallengersWorldCalculator() {
    // 레벨 미션
    const [targetLevel, setTargetLevel] = useState(290);

    // 사냥 미션
    const [huntingMissions, setHuntingMissions] = useState(0);

    // 보스 미션
    const [completedBosses, setCompletedBosses] = useState<Set<string>>(new Set());

    // 코인샵 장바구니
    const [cart, setCart] = useState<Map<string, number>>(new Map());

    // 계산 로직
    const calculations = useMemo(() => {
        // 레벨 미션 포인트/코인
        const levelData = LEVEL_REWARDS.filter(l => l.level <= targetLevel);
        const levelPoints = levelData.reduce((sum, l) => sum + l.points, 0);
        const levelCoins = levelData.reduce((sum, l) => sum + l.coins, 0);

        // 사냥 미션 코인 (포인트 없음)
        const huntingCoins = huntingMissions * 300;

        // 보스 미션 포인트/코인
        const bossPoints = Array.from(completedBosses).reduce((sum, bossName) => {
            const boss = BOSS_REWARDS.find(b => b.name === bossName);
            return sum + (boss?.points || 0);
        }, 0);

        const bossCoins = Array.from(completedBosses).reduce((sum, bossName) => {
            const boss = BOSS_REWARDS.find(b => b.name === bossName);
            return sum + (boss?.coins || 0);
        }, 0);

        const bossPremiumCoins = Array.from(completedBosses).reduce((sum, bossName) => {
            const boss = BOSS_REWARDS.find(b => b.name === bossName);
            return sum + (boss?.premiumCoins || 0);
        }, 0);

        // 총합
        const totalPoints = levelPoints + bossPoints;
        const totalCoins = levelCoins + huntingCoins + bossCoins;
        const totalPremiumCoins = bossPremiumCoins;

        // 현재 티어 계산
        let currentTier = TIERS[0];
        for (let i = TIERS.length - 1; i >= 0; i--) {
            if (totalPoints >= TIERS[i].points) {
                currentTier = TIERS[i];
                break;
            }
        }

        // 다음 티어
        const currentTierIndex = TIERS.indexOf(currentTier);
        const nextTier = currentTierIndex < TIERS.length - 1 ? TIERS[currentTierIndex + 1] : null;
        const pointsToNextTier = nextTier ? nextTier.points - totalPoints : 0;

        return {
            levelPoints,
            levelCoins,
            huntingCoins,
            bossPoints,
            bossCoins,
            bossPremiumCoins,
            totalPoints,
            totalCoins,
            totalPremiumCoins,
            currentTier,
            nextTier,
            pointsToNextTier,
        };
    }, [targetLevel, huntingMissions, completedBosses]);

    const toggleBoss = (bossName: string) => {
        setCompletedBosses(prev => {
            const newSet = new Set(prev);
            if (newSet.has(bossName)) {
                newSet.delete(bossName);
            } else {
                newSet.add(bossName);
            }
            return newSet;
        });
    };

    // 카테고리별 일괄 선택/해제
    const toggleCategoryBosses = (category: string) => {
        const categoryBosses = BOSS_REWARDS.filter(b => b.category === category);
        const categoryBossNames = categoryBosses.map(b => b.name);

        // 현재 카테고리의 모든 보스가 선택되어 있는지 확인
        const allSelected = categoryBossNames.every(name => completedBosses.has(name));

        setCompletedBosses(prev => {
            const newSet = new Set(prev);
            if (allSelected) {
                // 모두 선택되어 있으면 전부 해제
                categoryBossNames.forEach(name => newSet.delete(name));
            } else {
                // 하나라도 선택 안되어 있으면 전부 선택
                categoryBossNames.forEach(name => newSet.add(name));
            }
            return newSet;
        });
    };

    // 사냥 미션 횟수로 주차 및 날짜 계산
    const getWeekInfo = (missions: number) => {
        if (missions === 0) return null;

        const weekNumber = Math.ceil(missions / 5);
        const startDate = new Date(2025, 11, 18); // 2025년 12월 18일

        // 해당 주차의 시작일 계산 (n주차 = (n-1) * 7일 후)
        const weekStartDate = new Date(startDate);
        weekStartDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);

        // 주차 종료일 (시작일 + 6일)
        const weekEndDate = new Date(weekStartDate);
        weekEndDate.setDate(weekStartDate.getDate() + 6);

        const formatDate = (date: Date) => {
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${month}/${day}`;
        };

        return {
            weekNumber,
            dateRange: `${formatDate(weekStartDate)}~${formatDate(weekEndDate)}`
        };
    };


    const resetAll = () => {
        setTargetLevel(260);
        setHuntingMissions(0);
        setCompletedBosses(new Set());
    };

    const [showNav, setShowNav] = useState(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setShowNav(false);
        }
    };

    const exportToExcel = () => {
        // 엑셀 데이터 준비
        const data = [];

        // 헤더
        data.push(['챌린저스 코인샵 장바구니']);
        data.push([]);
        data.push(['아이템명', '분류', '개당 가격', '수량', '총 가격']);

        // 장바구니 아이템
        let totalNormalCoins = 0;
        let totalPremiumCoins = 0;

        Array.from(cart.entries()).forEach(([itemName, quantity]) => {
            const item = COIN_SHOP_ITEMS.find(i => i.name === itemName);
            if (item) {
                const totalPrice = item.price * quantity;
                const currencyName = item.currency === 'normal' ? '일반 코인' : '상급 코인';

                if (item.currency === 'normal') totalNormalCoins += totalPrice;
                else totalPremiumCoins += totalPrice;

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
        if (totalNormalCoins > 0) data.push(['일반 코인', '', '', '', totalNormalCoins]);
        if (totalPremiumCoins > 0) data.push(['상급 코인', '', '', '', totalPremiumCoins]);

        data.push([]);
        data.push(['내 획득량']);
        data.push(['일반 코인', '', '', '', calculations.totalCoins]);
        data.push(['상급 코인', '', '', '', calculations.totalPremiumCoins]);

        data.push([]);
        data.push(['남은 코인']);
        data.push(['일반 코인', '', '', '', calculations.totalCoins - totalNormalCoins]);
        data.push(['상급 코인', '', '', '', calculations.totalPremiumCoins - totalPremiumCoins]);

        // 워크시트 생성
        const ws = XLSX.utils.aoa_to_sheet(data);

        // 열 너비 설정
        ws['!cols'] = [
            { wch: 45 }, // 아이템명
            { wch: 12 }, // 분류
            { wch: 12 }, // 개당 가격
            { wch: 8 },  // 수량
            { wch: 12 }  // 총 가격
        ];

        // 워크북 생성 및 파일 저장
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, '챌린저스 코인샵');
        XLSX.writeFile(wb, '챌린저스_코인샵_장바구니.xlsx');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4">
                    <div className="flex items-center justify-between gap-2">
                        <Link href="/blog" className="text-purple-300 hover:text-purple-100 transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                            <span className="text-lg sm:text-xl md:text-2xl">←</span>
                            <span className="font-semibold">블로그로<span className="hidden xs:inline"> 돌아가기</span></span>
                        </Link>
                        <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-right">
                            챌린저스 월드<br className="xs:hidden" /> 시즌 3 계산기
                        </h1>
                    </div>
                </div>
            </header>

            {/* 플로팅 네비게이션 버튼 */}
            <button
                onClick={() => setShowNav(!showNav)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
                aria-label="빠른 이동 메뉤"
            >
                <span className="text-2xl">{showNav ? '✕' : '📍'}</span>
            </button>

            {/* 플로팅 네비게이션 메뉤 */}
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
                            onClick={() => scrollToSection('tier')}
                            className="w-full text-left px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all text-sm"
                        >
                            🏆 현재 티어
                        </button>
                        <button
                            onClick={() => scrollToSection('missions')}
                            className="w-full text-left px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all text-sm"
                        >
                            📋 미션 입력
                        </button>
                        <button
                            onClick={() => scrollToSection('tiers')}
                            className="w-full text-left px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all text-sm"
                        >
                            🏆 티어 보상
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

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 소개 섹션 */}
                <section id="intro" className="mb-6 sm:mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-500/20">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                        ⚔️ 챌린저스 월드 시즌 3 티어 & 코인 계산기
                    </h2>
                    <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
                        2025년 12월 18일부터 시작되는 <span className="text-purple-400 font-bold">챌린저스 월드 시즌 3</span>!<br className="hidden sm:block" />
                        <span className="sm:hidden"> </span>목표 레벨, 완료한 보스, 사냥 미션을 입력하고 <span className="text-pink-400 font-bold">나의 티어와 코인</span>을 실시간으로 확인해보세요!
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 text-[10px] sm:text-xs md:text-sm">
                        <span className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-purple-500/20 rounded-full text-purple-300 border border-purple-500/30 whitespace-nowrap">
                            🎯 티어 계산
                        </span>
                        <span className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-pink-500/20 rounded-full text-pink-300 border border-pink-500/30 whitespace-nowrap">
                            💰 코인 계산
                        </span>
                        <span className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-blue-500/20 rounded-full text-blue-300 border border-blue-500/30 whitespace-nowrap">
                            📊 실시간 분석
                        </span>
                    </div>
                </section>

                {/* 현재 티어 & 결과 요약 */}
                <section id="tier" className="mb-6 sm:mb-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* 현재 티어 */}
                    <div className={`lg:col-span-2 bg-gradient-to-br ${calculations.currentTier.color} rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl border border-white/10`}>
                        <div className="text-white">
                            <div className="text-[10px] sm:text-xs md:text-sm font-semibold opacity-80 mb-1 sm:mb-2">현재 티어</div>
                            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 sm:mb-3 md:mb-4">
                                {calculations.currentTier.name}
                            </div>
                            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold opacity-90 mb-3 sm:mb-4 md:mb-6">
                                {calculations.currentTier.nameEn}
                            </div>

                            <div className="bg-black/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 mb-2 sm:mb-3 md:mb-4">
                                <div className="flex justify-between items-center mb-1.5 sm:mb-2 gap-2">
                                    <span className="text-[10px] sm:text-xs md:text-sm font-semibold">총 챌린저스 포인트</span>
                                    <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">{calculations.totalPoints.toLocaleString()}</span>
                                </div>
                                {calculations.nextTier && (
                                    <>
                                        <div className="flex justify-between items-center text-[10px] sm:text-xs md:text-sm mb-1.5 sm:mb-2">
                                            <span>다음 티어까지</span>
                                            <span className="font-bold text-yellow-300">{calculations.pointsToNextTier.toLocaleString()} 포인트 남음</span>
                                        </div>
                                        <div className="w-full bg-black/30 rounded-full h-2 sm:h-3">
                                            <div
                                                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 sm:h-3 rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${Math.min(100, (calculations.totalPoints / (calculations.nextTier?.points || 1)) * 100)}%`
                                                }}
                                            ></div>
                                        </div>
                                        <div className="text-xs sm:text-sm opacity-90">
                                            <span className="font-semibold">{calculations.nextTier.name}</span>까지{' '}
                                            <span className="text-yellow-300 font-bold">{calculations.pointsToNextTier.toLocaleString()}</span> 포인트 남음
                                        </div>
                                    </>
                                )}
                            </div>

                            {calculations.currentTier.special && (
                                <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-lg p-2 sm:p-3 text-xs sm:text-sm">
                                    <span className="font-semibold">⚠️ 특수 조건:</span> {calculations.currentTier.special}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 코인 요약 */}
                    <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-yellow-500/30 shadow-xl">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 md:mb-4">💰 획득 코인</h3>
                        <div className="space-y-2 sm:space-y-3 md:space-y-4">
                            <div className="bg-black/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4">
                                <div className="text-[10px] sm:text-xs md:text-sm text-gray-300 mb-0.5 sm:mb-1">일반 챌린저스 코인</div>
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">
                                    {calculations.totalCoins.toLocaleString()}
                                </div>
                            </div>
                            <div className="bg-black/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4">
                                <div className="text-[10px] sm:text-xs md:text-sm text-gray-300 mb-0.5 sm:mb-1">상급 챌린저스 코인</div>
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400">
                                    {calculations.totalPremiumCoins.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 세부 계산 섹션 */}
                <section id="missions" className="mb-6 sm:mb-8 bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50">
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">📋 미션 입력</h3>
                        <button
                            onClick={resetAll}
                            className="px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-500/30 transition-all"
                        >
                            🔄 초기화
                        </button>
                    </div>

                    {/* 레벨 미션 */}
                    <div className="mb-6 sm:mb-8">
                        <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-3 sm:mb-4">🎯 1. 레벨 미션</h4>
                        <div className="bg-slate-900/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-purple-500/20">
                            <label className="block text-white mb-2 sm:mb-3 text-sm sm:text-base font-semibold">목표 레벨 선택</label>
                            <input
                                type="range"
                                min="260"
                                max="290"
                                value={targetLevel}
                                onChange={(e) => setTargetLevel(Number(e.target.value))}
                                className="w-full h-2 sm:h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between items-center mt-3 sm:mt-4">
                                <span className="text-xs sm:text-sm text-gray-400">Lv.260</span>
                                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Lv.{targetLevel}</span>
                                <span className="text-xs sm:text-sm text-gray-400">Lv.290</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-6">
                                <div className="bg-purple-500/10 rounded-lg p-2 sm:p-3 md:p-4 border border-purple-500/20">
                                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mb-1">획득 포인트</div>
                                    <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-purple-300 break-all">
                                        +{calculations.levelPoints.toLocaleString()}
                                    </div>
                                </div>
                                <div className="bg-yellow-500/10 rounded-lg p-2 sm:p-3 md:p-4 border border-yellow-500/20">
                                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mb-1">획득 코인</div>
                                    <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-yellow-300 break-all">
                                        +{calculations.levelCoins.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 사냥 미션 */}
                    <div className="mb-6 sm:mb-8">
                        <h4 className="text-lg sm:text-xl font-bold text-green-300 mb-3 sm:mb-4">🏹 2. 사냥 미션</h4>
                        <div className="bg-slate-900/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-500/20">
                            <label className="block text-white mb-2 sm:mb-3 text-[11px] sm:text-sm md:text-base font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                                완료한 사냥 미션 횟수 (주간 최대 5회 × 17주)
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="85"
                                value={huntingMissions}
                                onChange={(e) => setHuntingMissions(Number(e.target.value))}
                                className="w-full h-2 sm:h-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between items-center mt-3 sm:mt-4">
                                <span className="text-xs s:text-sm text-gray-400">0회</span>
                                <div className="flex flex-col items-center">
                                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{huntingMissions}회</span>
                                    {getWeekInfo(huntingMissions) && (
                                        <span className="text-[10px] sm:text-xs md:text-sm text-green-400 mt-1">
                                            ({getWeekInfo(huntingMissions)!.weekNumber}주차 {getWeekInfo(huntingMissions)!.dateRange})
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs sm:text-sm text-gray-400">85회</span>
                            </div>
                            <div className="mt-3 sm:mt-4 bg-green-500/10 rounded-lg p-2 sm:p-3 md:p-4 border border-green-500/20">
                                <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mb-1">획득 코인 (포인트 없음)</div>
                                <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-green-300 break-all">
                                    +{calculations.huntingCoins.toLocaleString()}
                                </div>
                            </div>
                            <div className="mt-3 text-[10px] sm:text-xs md:text-sm text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
                                💡 레벨 범위 몬스터 1,000마리 처치 시 300 코인 획득
                            </div>
                        </div>
                    </div>

                    {/* 보스 미션 */}
                    <div>
                        <h4 className="text-lg sm:text-xl font-bold text-red-300 mb-3 sm:mb-4">⚔️ 3. 보스 미션</h4>
                        <div className="bg-slate-900/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-red-500/20">
                            <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
                                처치한 보스를 클릭하여 선택하세요<br />
                                (1인 파티 격파 기준)
                            </div>

                            {/* 난이도별 보스 그룹 */}
                            {['easy', 'normal', 'hard', 'extreme'].map((category) => {
                                const categoryBosses = BOSS_REWARDS.filter(b => b.category === category);
                                const categoryName = {
                                    easy: '🔰 입문 보스',
                                    normal: '⭐ 일반 보스',
                                    hard: '💎 고난이도 보스',
                                    extreme: '🔥 극한 보스'
                                }[category];

                                // 카테고리의 모든 보스가 선택되어 있는지 확인
                                const categoryBossNames = categoryBosses.map(b => b.name);
                                const allSelected = categoryBossNames.every(name => completedBosses.has(name));
                                const someSelected = categoryBossNames.some(name => completedBosses.has(name));

                                return (
                                    <div key={category} className="mb-6 last:mb-0">
                                        {/* 카테고리 헤더 & 일괄 선택 */}
                                        <div className="flex items-center justify-between mb-3">
                                            <h5 className="text-base sm:text-lg font-bold text-white">{categoryName}</h5>
                                            <button
                                                onClick={() => toggleCategoryBosses(category)}
                                                className="flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-slate-800/70 hover:bg-slate-700/70 border border-slate-600 hover:border-slate-500 rounded-lg transition-all text-xs sm:text-sm whitespace-nowrap"
                                            >
                                                <span className="text-gray-300">일괄</span>
                                                <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center ${allSelected
                                                    ? 'bg-purple-500 border-purple-400'
                                                    : someSelected
                                                        ? 'bg-purple-500/50 border-purple-400'
                                                        : 'border-gray-600'
                                                    }`}>
                                                    {allSelected && <span className="text-white text-[10px] sm:text-xs">✓</span>}
                                                    {someSelected && !allSelected && <span className="text-white text-[10px] sm:text-xs">−</span>}
                                                </div>
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {categoryBosses.map((boss) => {
                                                const isSelected = completedBosses.has(boss.name);
                                                return (
                                                    <button
                                                        key={boss.name}
                                                        onClick={() => toggleBoss(boss.name)}
                                                        className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${isSelected
                                                            ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400 shadow-lg shadow-purple-500/20'
                                                            : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                                                            }`}
                                                    >
                                                        <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                                                            {/* 보스 이미지 */}
                                                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-900/50 border border-slate-700">
                                                                <Image
                                                                    src={`/images/bosses/${boss.image}.png`}
                                                                    alt={boss.name}
                                                                    width={64}
                                                                    height={64}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>

                                                            {/* 보스 이름 & 체크박스 */}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-start justify-between">
                                                                    <div className="font-semibold text-white text-xs sm:text-sm flex-1 leading-tight">
                                                                        {boss.name}
                                                                    </div>
                                                                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ml-2 ${isSelected ? 'bg-purple-500 border-purple-400' : 'border-gray-600'
                                                                        }`}>
                                                                        {isSelected && <span className="text-white text-[10px] sm:text-xs">✓</span>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* 보상 정보 */}
                                                        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                                                            <div>
                                                                <div className="text-gray-500">포인트</div>
                                                                <div className="text-purple-300 font-bold">+{boss.points.toLocaleString()}</div>
                                                            </div>
                                                            <div>
                                                                <div className="text-gray-500">코인</div>
                                                                <div className="text-yellow-300 font-bold">+{boss.coins.toLocaleString()}</div>
                                                            </div>
                                                            {boss.premiumCoins > 0 && (
                                                                <div>
                                                                    <div className="text-gray-500">상급</div>
                                                                    <div className="text-pink-300 font-bold">+{boss.premiumCoins}</div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* 보스 미션 합계 */}
                            <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-4">
                                <div className="bg-purple-500/10 rounded-lg p-2 sm:p-3 md:p-4 border border-purple-500/20">
                                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mb-1 truncate">포인트</div>
                                    <div className="text-sm sm:text-lg md:text-xl font-bold text-purple-300 break-all">
                                        +{calculations.bossPoints.toLocaleString()}
                                    </div>
                                </div>
                                <div className="bg-yellow-500/10 rounded-lg p-2 sm:p-3 md:p-4 border border-yellow-500/20">
                                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mb-1 truncate">코인</div>
                                    <div className="text-sm sm:text-lg md:text-xl font-bold text-yellow-300 break-all">
                                        +{calculations.bossCoins.toLocaleString()}
                                    </div>
                                </div>
                                <div className="bg-pink-500/10 rounded-lg p-2 sm:p-3 md:p-4 border border-pink-500/20">
                                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mb-1 truncate">상급</div>
                                    <div className="text-sm sm:text-lg md:text-xl font-bold text-pink-300 break-all">
                                        +{calculations.bossPremiumCoins.toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {/* 총 결과 요약 */}
                            <div className="mt-6 p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl border-2 border-purple-500/30">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* 현재 티어 */}
                                    <div>
                                        <div className="text-sm text-gray-400 mb-2">🏆 현재 티어</div>
                                        <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${calculations.currentTier.color} mb-2`}>
                                            <div className="text-2xl font-bold text-white">{calculations.currentTier.name}</div>
                                            <div className="text-sm text-white/80">{calculations.currentTier.nameEn}</div>
                                        </div>
                                        <div className="text-sm text-gray-300 mt-2">
                                            총 {calculations.totalPoints.toLocaleString()} 포인트
                                            {calculations.nextTier && (
                                                <span className="block text-yellow-400 mt-1">
                                                    {calculations.nextTier.name}까지 {calculations.pointsToNextTier.toLocaleString()}점 남음
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* 획득 코인 */}
                                    <div>
                                        <div className="text-sm text-gray-400 mb-2">💰 획득 코인</div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center bg-yellow-500/10 rounded-lg px-4 py-2 border border-yellow-500/20">
                                                <span className="text-sm text-gray-300">일반</span>
                                                <span className="text-xl font-bold text-yellow-400">
                                                    {calculations.totalCoins.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center bg-purple-500/10 rounded-lg px-4 py-2 border border-purple-500/20">
                                                <span className="text-sm text-gray-300">상급</span>
                                                <span className="text-xl font-bold text-purple-400">
                                                    {calculations.totalPremiumCoins.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 티어 목록 */}
                <section id="tiers" className="mb-6 sm:mb-8 bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/50">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">🏆 티어별 보상 정보</h3>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        {TIERS.slice(1).map((tier) => (
                            <div
                                key={tier.name}
                                className={`rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border-2 transition-all ${calculations.currentTier.name === tier.name
                                    ? `bg-gradient-to-br ${tier.color} border-white/50 shadow-xl`
                                    : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                                    }`}
                            >
                                <div className="text-white">
                                    <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                                        <div className="min-w-0">
                                            <div className="text-lg sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1 truncate">{tier.name}</div>
                                            <div className="text-xs sm:text-sm opacity-80">{tier.nameEn}</div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold whitespace-nowrap">
                                                {tier.points.toLocaleString()}pt
                                            </div>
                                            {tier.special && (
                                                <div className="mt-1 text-[10px] sm:text-xs bg-black/20 rounded px-1.5 sm:px-2 py-0.5 sm:py-1 whitespace-nowrap">
                                                    {tier.special}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* 보상 목록 */}
                                    {tier.rewards && tier.rewards.length > 0 && (
                                        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
                                            <div className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 opacity-90">🎁 달성 보상</div>
                                            <div className="space-y-1 sm:space-y-1.5">
                                                {tier.rewards.map((reward, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="text-[10px] sm:text-xs md:text-sm bg-black/20 rounded px-2 sm:px-3 py-1.5 sm:py-2 flex items-start gap-1.5 sm:gap-2"
                                                    >
                                                        <span className="text-yellow-400 shrink-0">•</span>
                                                        <span className="opacity-90 leading-tight">{reward}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 코인샵 계산기 */}
                <section id="shop" className="mb-6 sm:mb-8 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-emerald-500/20">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">🛒 챌린저스 코인샵 계산기</h3>

                    {/* 보유 코인 표시 */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="bg-yellow-500/10 rounded-lg p-3 sm:p-4 border border-yellow-500/20">
                            <div className="text-xs sm:text-sm text-gray-400 mb-1">보유 일반 코인</div>
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400">
                                {calculations.totalCoins.toLocaleString()}
                            </div>
                        </div>
                        <div className="bg-purple-500/10 rounded-lg p-3 sm:p-4 border border-purple-500/20">
                            <div className="text-xs sm:text-sm text-gray-400 mb-1">보유 상급 코인</div>
                            <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-400">
                                {calculations.totalPremiumCoins.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    {/* 코인샵 아이템 목록 */}
                    {['일반', '스페셜'].map((category) => (
                        <div key={category} className="mb-6 last:mb-0">
                            <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                                {category === '일반' ? '💰 일반 상점' : '⭐ 스페셜 상점'}
                            </h4>
                            <div className="grid grid-cols-1 gap-2 sm:gap-3">
                                {COIN_SHOP_ITEMS.filter(item => item.category === category).map((item, idx) => {
                                    const cartQuantity = cart.get(item.name) || 0;
                                    const totalPrice = item.price * cartQuantity;
                                    const canAfford = item.currency === 'normal'
                                        ? calculations.totalCoins >= totalPrice
                                        : calculations.totalPremiumCoins >= totalPrice;

                                    return (
                                        <div
                                            key={idx}
                                            className="bg-slate-900/50 rounded-lg p-2 sm:p-3 border border-slate-700"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3">
                                                {/* 아이템 정보 */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs sm:text-sm font-semibold text-white mb-0.5 truncate">
                                                        {item.name}
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-1.5 text-[9px] sm:text-xs">
                                                        <span className={`font-bold ${item.currency === 'normal' ? 'text-yellow-400' : 'text-purple-400'}`}>
                                                            {item.price.toLocaleString()} {item.currency === 'normal' ? '코인' : '상급'}
                                                        </span>
                                                        {item.maxQuantity !== null && (
                                                            <span className="text-gray-500">
                                                                (최대 {item.maxQuantity}개)
                                                            </span>
                                                        )}
                                                        {item.note && (
                                                            <span className="text-blue-400">
                                                                {item.note}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* 수량 선택 */}
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => {
                                                            const newCart = new Map(cart);
                                                            const current = newCart.get(item.name) || 0;
                                                            if (current > 0) {
                                                                newCart.set(item.name, current - 1);
                                                                if (newCart.get(item.name) === 0) {
                                                                    newCart.delete(item.name);
                                                                }
                                                                setCart(newCart);
                                                            }
                                                        }}
                                                        className="w-6 h-6 sm:w-7 sm:h-7 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded flex items-center justify-center text-white text-xs sm:text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                        disabled={cartQuantity === 0}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-8 sm:w-10 text-center text-xs sm:text-sm font-bold text-white">
                                                        {cartQuantity}
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            const newCart = new Map(cart);
                                                            const current = newCart.get(item.name) || 0;
                                                            if (item.maxQuantity === null || current < item.maxQuantity) {
                                                                newCart.set(item.name, current + 1);
                                                                setCart(newCart);
                                                            }
                                                        }}
                                                        className="w-6 h-6 sm:w-7 sm:h-7 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded flex items-center justify-center text-white text-xs sm:text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                        disabled={item.maxQuantity !== null && cartQuantity >= item.maxQuantity}
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            const newCart = new Map(cart);
                                                            newCart.delete(item.name);
                                                            setCart(newCart);
                                                        }}
                                                        className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-red-600/80 hover:bg-red-500 border border-red-500 rounded text-white text-[10px] sm:text-xs font-bold transition-colors whitespace-nowrap disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-red-600/80"
                                                        disabled={cartQuantity === 0}
                                                    >
                                                        0
                                                    </button>
                                                    {item.maxQuantity !== null && (
                                                        <button
                                                            onClick={() => {
                                                                const newCart = new Map(cart);
                                                                newCart.set(item.name, item.maxQuantity!);
                                                                setCart(newCart);
                                                            }}
                                                            className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-emerald-600/80 hover:bg-emerald-500 border border-emerald-500 rounded text-white text-[10px] sm:text-xs font-bold transition-colors whitespace-nowrap"
                                                        >
                                                            최대
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 구매 정보 (수량 선택 시에만 표시) */}
                                            {cartQuantity > 0 && (
                                                <div className={`mt-1.5 pt-1.5 border-t ${canAfford ? 'border-emerald-500/30' : 'border-red-500/30'}`}>
                                                    <div className="flex justify-between items-center text-[10px] sm:text-xs">
                                                        <span className={canAfford ? 'text-emerald-400' : 'text-red-400'}>
                                                            {canAfford ? '✓ 구매 가능' : '✗ 코인 부족'}
                                                        </span>
                                                        <span className={`font-bold ${item.currency === 'normal' ? 'text-yellow-400' : 'text-purple-400'}`}>
                                                            총 {totalPrice.toLocaleString()} {item.currency === 'normal' ? '코인' : '상급'}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* 장바구니 요약 */}
                    {cart.size > 0 && (
                        <div className="mt-6 p-4 sm:p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl border-2 border-emerald-500/30">
                            <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">🛒 장바구니 요약</h4>

                            {/* 총 필요 코인 계산 */}
                            {(() => {
                                let totalNormalCoins = 0;
                                let totalPremiumCoins = 0;

                                Array.from(cart.entries()).forEach(([itemName, quantity]) => {
                                    const item = COIN_SHOP_ITEMS.find(i => i.name === itemName);
                                    if (item) {
                                        if (item.currency === 'normal') {
                                            totalNormalCoins += item.price * quantity;
                                        } else {
                                            totalPremiumCoins += item.price * quantity;
                                        }
                                    }
                                });

                                const canAffordNormal = calculations.totalCoins >= totalNormalCoins;
                                const canAffordPremium = calculations.totalPremiumCoins >= totalPremiumCoins;
                                const canAffordAll = canAffordNormal && canAffordPremium;

                                return (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                                            {totalNormalCoins > 0 && (
                                                <div className={`rounded-lg p-3 sm:p-4 border ${canAffordNormal ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                                    <div className="text-xs sm:text-sm text-gray-400 mb-1">필요 일반 코인</div>
                                                    <div className="text-lg sm:text-xl font-bold text-yellow-400">
                                                        {totalNormalCoins.toLocaleString()}
                                                    </div>
                                                    <div className={`text-xs sm:text-sm mt-1 ${canAffordNormal ? 'text-emerald-400' : 'text-red-400'}`}>
                                                        남은 코인: {(calculations.totalCoins - totalNormalCoins).toLocaleString()}
                                                    </div>
                                                </div>
                                            )}
                                            {totalPremiumCoins > 0 && (
                                                <div className={`rounded-lg p-3 sm:p-4 border ${canAffordPremium ? 'bg-purple-500/10 border-purple-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                                    <div className="text-xs sm:text-sm text-gray-400 mb-1">필요 상급 코인</div>
                                                    <div className="text-lg sm:text-xl font-bold text-purple-400">
                                                        {totalPremiumCoins.toLocaleString()}
                                                    </div>
                                                    <div className={`text-xs sm:text-sm mt-1 ${canAffordPremium ? 'text-emerald-400' : 'text-red-400'}`}>
                                                        남은 코인: {(calculations.totalPremiumCoins - totalPremiumCoins).toLocaleString()}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className={`text-center py-2 sm:py-3 rounded-lg ${canAffordAll ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'} font-bold text-sm sm:text-base`}>
                                            {canAffordAll ? '✓ 모든 아이템을 구매할 수 있습니다!' : '✗ 코인이 부족합니다'}
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3">
                                            <button
                                                onClick={exportToExcel}
                                                className="flex-1 py-2 sm:py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg border border-emerald-500/30 transition-all text-sm sm:text-base font-semibold"
                                            >
                                                📊 엑셀로 내보내기
                                            </button>
                                            <button
                                                onClick={() => setCart(new Map())}
                                                className="flex-1 py-2 sm:py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-500/30 transition-all text-sm sm:text-base"
                                            >
                                                🗑️ 장바구니 비우기
                                            </button>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    )}
                </section>

                {/* 팁 섹션 */}
                <section id="tips" className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-500/20">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">💡 계산기 활용 팁</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 text-gray-300">
                        <div className="bg-slate-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="font-bold text-blue-300 mb-1 sm:mb-2 text-sm sm:text-base">📈 목표 설정하기</div>
                            <div className="text-xs sm:text-sm leading-relaxed">
                                원하는 티어의 필요 포인트를 확인하고, 레벨과 보스 미션을 계획적으로 수행하세요!
                            </div>
                        </div>
                        <div className="bg-slate-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="font-bold text-purple-300 mb-1 sm:mb-2 text-sm sm:text-base">⚔️ 보스 우선순위</div>
                            <div className="text-xs sm:text-sm leading-relaxed">
                                극한 보스(검마, 세렌, 칼로스 등)는 높은 포인트와 상급 코인을 제공합니다!
                            </div>
                        </div>
                        <div className="bg-slate-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="font-bold text-green-300 mb-1 sm:mb-2 text-sm sm:text-base">🏹 사냥 미션 활용</div>
                            <div className="text-xs sm:text-sm leading-relaxed">
                                주간 5회 사냥 미션을 꼬박꼬박 완료하면 1,500 코인을 추가로 획득할 수 있어요!
                            </div>
                        </div>
                        <div className="bg-slate-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="font-bold text-yellow-300 mb-1 sm:mb-2 text-sm sm:text-base">💰 코인 활용</div>
                            <div className="text-xs sm:text-sm leading-relaxed">
                                챌린저스 샵에서 블랙 큐브, 환생의 불꽃 등 유용한 아이템을 구매하세요!
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-black/30 backdrop-blur-md border-t border-purple-500/20 mt-12 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
                    <p className="text-sm">
                        챌린저스 월드 시즌 3 | 2025년 12월 18일 ~ 2026년 4월 16일
                    </p>
                    <Link href="/blog" className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block">
                        메이플AI 블로그로 돌아가기 →
                    </Link>
                </div>
            </footer>

            <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
        }
      `}</style>
        </div>
    );
}
