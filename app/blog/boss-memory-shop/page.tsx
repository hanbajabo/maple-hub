'use client';

import { useState } from 'react';
import Link from 'next/link';

// 보스 코인샵 (환영의 기억 기록관) 아이템 데이터
const BOSS_SHOP_ITEMS = [
    // 하급 (흐릿한 환영의 기억)
    { tier: '하급', name: 'VIP 버프 선택 교환권', price: 10, currency: 'dim', maxQuantity: null },
    { tier: '하급', name: '경험치 3배 쿠폰 (30분)', price: 100, currency: 'dim', maxQuantity: 7 },
    { tier: '하급', name: '카르마 영원한 환생의 불꽃', price: 50, currency: 'dim', maxQuantity: 300 },
    { tier: '하급', name: '스페셜 명예의 훈장', price: 100, currency: 'dim', maxQuantity: 350 },
    { tier: '하급', name: '블랙 서큘레이터', price: 1000, currency: 'dim', maxQuantity: 30 },
    { tier: '하급', name: '선택 심볼 교환권', price: 100, currency: 'dim', maxQuantity: 300 },

    // 중급 (선명한 환영의 기억)
    { tier: '중급', name: '카르마 블랙 큐브', price: 120, currency: 'clear', maxQuantity: 3 },
    { tier: '중급', name: '카르마 화이트 에디셔널 큐브', price: 240, currency: 'clear', maxQuantity: 3 },
    { tier: '중급', name: '카르마 프리미엄 펫장비 주문서 선택권', price: 400, currency: 'clear', maxQuantity: 45 },
    { tier: '중급', name: '카르마 놀라운 긍정의 혼돈 주문서 100%', price: 20, currency: 'clear', maxQuantity: 120 },
    { tier: '중급', name: '아크 이노센트 주문서 100%', price: 20, currency: 'clear', maxQuantity: 30 },
    { tier: '중급', name: '카르마 검은 환생의 불꽃', price: 20, currency: 'clear', maxQuantity: 750 },
    { tier: '중급', name: '카르마 프리미엄 악세서리 주문서 선택권', price: 400, currency: 'clear', maxQuantity: 45 },

    // 상급 (온전한 환영의 기억)
    { tier: '상급', name: '카르마 심연의 환생의 불꽃', price: 1, currency: 'complete', maxQuantity: 900 },
    { tier: '상급', name: '솔 에르다', price: 10, currency: 'complete', maxQuantity: 30 },
    { tier: '상급', name: '무공의 소울 조각', price: 10, currency: 'complete', maxQuantity: 30 },
    { tier: '상급', name: '카르마 블랙 큐브', price: 2, currency: 'complete', maxQuantity: 7 },
    { tier: '상급', name: '카르마 화이트 에디셔널 큐브', price: 3, currency: 'complete', maxQuantity: 7 },
    { tier: '상급', name: '하트 업그레이드 모듈: 플라즈마', price: 5, currency: 'complete', maxQuantity: 1 },
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

export default function BossMemoryShop() {
    const [ownedDimMemory, setOwnedDimMemory] = useState(0); // 흐릿한 환영의 기억
    const [ownedClearMemory, setOwnedClearMemory] = useState(0); // 선명한 환영의 기억
    const [ownedCompleteMemory, setOwnedCompleteMemory] = useState(0); // 온전한 환영의 기억
    const [cart, setCart] = useState<Map<string, number>>(new Map());

    const resetAll = () => {
        setOwnedDimMemory(0);
        setOwnedClearMemory(0);
        setOwnedCompleteMemory(0);
        setCart(new Map());
    };

    const getOwnedMemory = (currency: string) => {
        switch (currency) {
            case 'dim': return ownedDimMemory;
            case 'clear': return ownedClearMemory;
            case 'complete': return ownedCompleteMemory;
            default: return 0;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4">
                    <div className="flex items-center justify-between gap-2">
                        <Link prefetch={false} href="/blog" className="text-purple-300 hover:text-purple-100 transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                            <span className="text-lg sm:text-xl md:text-2xl">←</span>
                            <span className="font-semibold">블로그로<span className="hidden xs:inline"> 돌아가기</span></span>
                        </Link>
                        <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-right">
                            환영의 기억<br className="xs:hidden" /> 기록관
                        </h1>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 소개 섹션 */}
                <section className="mb-6 sm:mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-500/20">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                        ⚔️ 환영의 기억 기록관
                    </h2>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-2 sm:mb-3 md:mb-4">
                        주간 보스를 처치하고 획득한 <span className="text-purple-400 font-bold">환영의 기억</span>으로<br className="sm:hidden" /> 강력한 아이템을 교환하세요!
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 text-[10px] sm:text-xs md:text-sm">
                        <span className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-gray-500/20 rounded-full text-gray-300 border border-gray-500/30 whitespace-nowrap">
                            🌫️ 흐릿한 (주간 3,000)
                        </span>
                        <span className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-blue-500/20 rounded-full text-blue-300 border border-blue-500/30 whitespace-nowrap">
                            💎 선명한 (주간 2,000)
                        </span>
                        <span className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-purple-500/20 rounded-full text-purple-300 border border-purple-500/30 whitespace-nowrap">
                            ✨ 온전한 (주간 100)
                        </span>
                    </div>
                </section>

                {/* 보유 환영의 기억 입력 */}
                <section className="mb-6 sm:mb-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-700 shadow-xl">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4">👻 보유 환영의 기억</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div>
                            <label className="block text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">
                                흐릿한 환영의 기억
                                <span className="block text-[10px] sm:text-xs opacity-70">(최대 39,000개)</span>
                            </label>
                            <input
                                type="number"
                                value={ownedDimMemory}
                                onChange={(e) => setOwnedDimMemory(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-full bg-black/20 border border-gray-500/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-base sm:text-lg font-bold focus:outline-none focus:ring-2 focus:ring-gray-500"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm text-blue-400 mb-1 sm:mb-2">
                                선명한 환영의 기억
                                <span className="block text-[10px] sm:text-xs opacity-70">(최대 26,000개)</span>
                            </label>
                            <input
                                type="number"
                                value={ownedClearMemory}
                                onChange={(e) => setOwnedClearMemory(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-full bg-black/20 border border-blue-500/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-base sm:text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm text-purple-400 mb-1 sm:mb-2">
                                온전한 환영의 기억
                                <span className="block text-[10px] sm:text-xs opacity-70">(최대 1,300개)</span>
                            </label>
                            <input
                                type="number"
                                value={ownedCompleteMemory}
                                onChange={(e) => setOwnedCompleteMemory(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-base sm:text-lg font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-3 sm:mt-4">
                        <div className="text-yellow-400 text-xs sm:text-sm">
                            💡 주간 보스 처치로 획득!
                        </div>
                        <button
                            onClick={resetAll}
                            className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-500/30 transition-all whitespace-nowrap text-xs sm:text-sm flex-shrink-0"
                        >
                            <span className="hidden sm:inline">🔄 </span>초기화
                        </button>
                    </div>
                </section>

                {/* 보스 코인샵 아이템 목록 */}
                <section className="mb-6 sm:mb-8 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-emerald-500/20">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">⚔️ 환영의 기억 기록관</h3>

                    {['하급', '중급', '상급'].map((tier) => {
                        const tierItems = BOSS_SHOP_ITEMS.filter(item => item.tier === tier);
                        const tierColor = tier === '하급' ? 'gray' : tier === '중급' ? 'blue' : 'purple';

                        return (
                            <div key={tier} className="mb-6 last:mb-0">
                                <h4 className={`text-base sm:text-lg font-bold text-${tierColor}-300 mb-3 sm:mb-4`}>
                                    {tier === '하급' && '🌫️ '}{tier === '중급' && '💎 '}{tier === '상급' && '✨ '}
                                    {tier} ({getCurrencyName(tierItems[0].currency)})
                                </h4>
                                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                                    {tierItems.map((item, idx) => {
                                        const cartQuantity = cart.get(item.name) || 0;
                                        const totalPrice = item.price * cartQuantity;
                                        const ownedMemory = getOwnedMemory(item.currency);
                                        const canAfford = ownedMemory >= totalPrice;

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
                                                            <span className={`font-bold ${getCurrencyColor(item.currency)}`}>
                                                                {item.price.toLocaleString()}
                                                            </span>
                                                            <span className="text-gray-500">
                                                                ({item.maxQuantity ? `최대 ${item.maxQuantity}개` : '무제한'})
                                                            </span>
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
                                                                if (!item.maxQuantity || current < item.maxQuantity) {
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
                                                        {item.maxQuantity && (
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

                                                {/* 구매 정보 */}
                                                {cartQuantity > 0 && (
                                                    <div className={`mt-1.5 pt-1.5 border-t ${canAfford ? 'border-emerald-500/30' : 'border-red-500/30'}`}>
                                                        <div className="flex justify-between items-center text-[10px] sm:text-xs">
                                                            <span className={canAfford ? 'text-emerald-400' : 'text-red-400'}>
                                                                {canAfford ? '✓ 구매 가능' : '✗ 부족'}
                                                            </span>
                                                            <span className={`font-bold ${getCurrencyColor(item.currency)}`}>
                                                                총 {totalPrice.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}

                    {/* 장바구니 요약 */}
                    {cart.size > 0 && (
                        <div className="mt-6 p-4 sm:p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl border-2 border-emerald-500/30">
                            <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">🛒 장바구니 요약</h4>

                            {(() => {
                                let dimTotal = 0, clearTotal = 0, completeTotal = 0;

                                Array.from(cart.entries()).forEach(([itemName, quantity]) => {
                                    const item = BOSS_SHOP_ITEMS.find(i => i.name === itemName);
                                    if (item) {
                                        const total = item.price * quantity;
                                        if (item.currency === 'dim') dimTotal += total;
                                        else if (item.currency === 'clear') clearTotal += total;
                                        else if (item.currency === 'complete') completeTotal += total;
                                    }
                                });

                                const dimAfford = ownedDimMemory >= dimTotal;
                                const clearAfford = ownedClearMemory >= clearTotal;
                                const completeAfford = ownedCompleteMemory >= completeTotal;
                                const allAfford = dimAfford && clearAfford && completeAfford;

                                return (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                                            {dimTotal > 0 && (
                                                <div className={`rounded-lg p-3 sm:p-4 border ${dimAfford ? 'bg-gray-500/10 border-gray-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                                    <div className="text-xs sm:text-sm text-gray-400 mb-1">흐릿한 기억 필요</div>
                                                    <div className="text-lg sm:text-xl font-bold text-gray-300">
                                                        {dimTotal.toLocaleString()}
                                                    </div>
                                                    <div className={`text-xs sm:text-sm mt-1 ${dimAfford ? 'text-emerald-400' : 'text-red-400'}`}>
                                                        남은 수량: {(ownedDimMemory - dimTotal).toLocaleString()}
                                                    </div>
                                                </div>
                                            )}
                                            {clearTotal > 0 && (
                                                <div className={`rounded-lg p-3 sm:p-4 border ${clearAfford ? 'bg-blue-500/10 border-blue-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                                    <div className="text-xs sm:text-sm text-blue-400 mb-1">선명한 기억 필요</div>
                                                    <div className="text-lg sm:text-xl font-bold text-blue-300">
                                                        {clearTotal.toLocaleString()}
                                                    </div>
                                                    <div className={`text-xs sm:text-sm mt-1 ${clearAfford ? 'text-emerald-400' : 'text-red-400'}`}>
                                                        남은 수량: {(ownedClearMemory - clearTotal).toLocaleString()}
                                                    </div>
                                                </div>
                                            )}
                                            {completeTotal > 0 && (
                                                <div className={`rounded-lg p-3 sm:p-4 border ${completeAfford ? 'bg-purple-500/10 border-purple-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                                    <div className="text-xs sm:text-sm text-purple-400 mb-1">온전한 기억 필요</div>
                                                    <div className="text-lg sm:text-xl font-bold text-purple-300">
                                                        {completeTotal.toLocaleString()}
                                                    </div>
                                                    <div className={`text-xs sm:text-sm mt-1 ${completeAfford ? 'text-emerald-400' : 'text-red-400'}`}>
                                                        남은 수량: {(ownedCompleteMemory - completeTotal).toLocaleString()}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className={`text-center py-2 sm:py-3 rounded-lg ${allAfford ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'} font-bold text-sm sm:text-base`}>
                                            {allAfford ? '✓ 모든 아이템을 교환할 수 있습니다!' : '✗ 환영의 기억이 부족합니다'}
                                        </div>

                                        <button
                                            onClick={() => setCart(new Map())}
                                            className="mt-3 w-full py-2 sm:py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-500/30 transition-all text-sm sm:text-base"
                                        >
                                            🗑️ 장바구니 비우기
                                        </button>
                                    </>
                                );
                            })()}
                        </div>
                    )}
                </section>

                {/* 팁 섹션 */}
                <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-500/20">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">💡 환영의 기억 획득 팁</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 text-gray-300">
                        <div className="bg-slate-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="font-bold text-gray-300 mb-1 sm:mb-2 text-sm sm:text-base">🌫️ 흐릿한 기억</div>
                            <div className="text-xs sm:text-sm leading-relaxed">
                                주간 보스 처치로 획득! 주간 최대 3,000개까지 모을 수 있어요.
                            </div>
                        </div>
                        <div className="bg-slate-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="font-bold text-blue-300 mb-1 sm:mb-2 text-sm sm:text-base">💎 선명한 기억</div>
                            <div className="text-xs sm:text-sm leading-relaxed">
                                더 강한 보스 처치로 획득! 주간 최대 2,000개까지 획득 가능합니다.
                            </div>
                        </div>
                        <div className="bg-slate-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="font-bold text-purple-300 mb-1 sm:mb-2 text-sm sm:text-base">✨ 온전한 기억</div>
                            <div className="text-xs sm:text-sm leading-relaxed">
                                최상급 보스 처치로 획득! 주간 최대 100개로 매우 희귀합니다.
                            </div>
                        </div>
                        <div className="bg-slate-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="font-bold text-yellow-300 mb-1 sm:mb-2 text-sm sm:text-base">⚔️ 보스 처치</div>
                            <div className="text-xs sm:text-sm leading-relaxed">
                                1인 파티로 처치해야 하며, 연습 모드도 인정됩니다!
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
