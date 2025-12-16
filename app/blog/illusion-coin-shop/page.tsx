'use client';

import { useState } from 'react';
import Link from 'next/link';

// 일루전 코인샵 아이템 데이터
const COIN_SHOP_ITEMS = [
    // [강화] 탭
    { category: '강화', name: '수상한 에디셔널 큐브', price: 50, maxQuantity: 200 },
    { category: '강화', name: '에픽 잠재능력 부여 스크롤 100%', price: 300, maxQuantity: 5 },
    { category: '강화', name: '스페셜 에디셔널 잠재능력 부여 스크롤', price: 300, maxQuantity: 5 },
    { category: '강화', name: '이노센트 주문서 100%', price: 100, maxQuantity: 20 },
    { category: '강화', name: '펫장비 주문서 선택권', price: 500, maxQuantity: 20 },
    { category: '강화', name: '순백의 주문서 100%', price: 200, maxQuantity: 10 },
    { category: '강화', name: '이벤트 링 3종 선택권', price: 3000, maxQuantity: 3 },
    { category: '강화', name: '이벤트 링 전용 명장의 큐브', price: 60, maxQuantity: 100 },
    { category: '강화', name: '이벤트 링 전용 레전드리 잠재능력 부여 스크롤 100%', price: 4000, maxQuantity: 3 },
    { category: '강화', name: '카르마 유니크 잠재능력 부여 스크롤 100%', price: 3000, maxQuantity: 4 },
    { category: '강화', name: '카르마 에디셔널 에픽 잠재능력 부여 스크롤 100%', price: 3000, maxQuantity: 4 },
    { category: '강화', name: '카르마 스페셜 하트 주문서 선택권', price: 2000, maxQuantity: 10 },

    // [성장] 탭
    { category: '성장', name: 'AP 초기화 주문서', price: 50, maxQuantity: 3 },
    { category: '성장', name: 'SP 초기화 주문서', price: 50, maxQuantity: 3 },
    { category: '성장', name: '성향 성장의 비약', price: 300, maxQuantity: 20 },
    { category: '성장', name: '선택 슬롯 8칸 확장권', price: 100, maxQuantity: 15 },
    { category: '성장', name: '무한의 피로회복제', price: 10, maxQuantity: 5 },
    { category: '성장', name: '가방/지갑 선택권', price: 1000, maxQuantity: 10 },
    { category: '성장', name: '경험의 코어 젬스톤', price: 150, maxQuantity: 200 },
    { category: '성장', name: '카오스 서큘레이터', price: 800, maxQuantity: 20 },
    { category: '성장', name: '블랙 서큘레이터', price: 1500, maxQuantity: 10 },
    { category: '성장', name: '레전드리 서큘레이터', price: 2000, maxQuantity: 3 },
    { category: '성장', name: '슈피겔라의 황금 딸기 농장 1회 입장권', price: 200, maxQuantity: 65, note: '매주 5개씩 13주 (총 65개)' },
    { category: '성장', name: '익스트림 성장의 비약', price: 70, maxQuantity: 200 },
    { category: '성장', name: '극한 성장의 비약 (200~249)', price: 10000, maxQuantity: 2 },
    { category: '성장', name: '솔 에르다', price: 10000, maxQuantity: 1 },
];

export default function IllusionCoinShop() {
    const [ownedCoins, setOwnedCoins] = useState(0);
    const [cart, setCart] = useState<Map<string, number>>(new Map());

    const resetAll = () => {
        setOwnedCoins(0);
        setCart(new Map());
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
                            일루전 코인샵<br className="xs:hidden" /> 계산기
                        </h1>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 소개 섹션 */}
                <section className="mb-6 sm:mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-500/20">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                        👻 일루전 코인샵
                    </h2>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-2 sm:mb-3 md:mb-4">
                        <span className="text-purple-400 font-bold">환영이 내리는 밤</span> 이벤트의 <span className="text-pink-400 font-bold">일루전 코인</span>으로<br className="sm:hidden" /> 구매 가능한 아이템 확인!
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 text-[10px] sm:text-xs md:text-sm">
                        <span className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-purple-500/20 rounded-full text-purple-300 border border-purple-500/30 whitespace-nowrap">
                            🔧 강화 아이템
                        </span>
                        <span className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-pink-500/20 rounded-full text-pink-300 border border-pink-500/30 whitespace-nowrap">
                            📈 성장 아이템
                        </span>
                        <span className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-blue-500/20 rounded-full text-blue-300 border border-blue-500/30 whitespace-nowrap">
                            🛒 장바구니
                        </span>
                    </div>
                </section>

                {/* 보유 코인 입력 */}
                <section className="mb-6 sm:mb-8 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-yellow-500/30 shadow-xl">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                        <span>💰</span>
                        <span>보유 일루전 코인</span>
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <input
                            type="number"
                            value={ownedCoins}
                            onChange={(e) => setOwnedCoins(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-full sm:flex-1 bg-black/20 border border-yellow-500/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-base sm:text-lg font-bold focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="코인 입력"
                        />
                        <button
                            onClick={resetAll}
                            className="w-full sm:w-auto px-4 py-2 sm:px-3 sm:py-3 md:px-4 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-500/30 transition-all whitespace-nowrap text-sm sm:text-sm md:text-base flex items-center justify-center gap-1 flex-shrink-0"
                        >
                            <span>🔄</span>
                            <span>초기화</span>
                        </button>
                    </div>
                    <div className="mt-3 text-yellow-400 text-xs sm:text-sm">
                        💡 주간 최대 4,000개 | 이벤트 기간 최대 <span className="font-bold">48,000개</span> 획득 가능! (12주까지 누적)
                    </div>
                </section>

                {/* 코인샵 아이템 목록 */}
                <section className="mb-6 sm:mb-8 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-emerald-500/20">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">🛒 일루전 코인샵</h3>

                    {['강화', '성장'].map((category) => (
                        <div key={category} className="mb-6 last:mb-0">
                            <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                                {category === '강화' ? '🔧 강화 아이템' : '📈 성장 아이템'}
                            </h4>
                            <div className="grid grid-cols-1 gap-2 sm:gap-3">
                                {COIN_SHOP_ITEMS.filter(item => item.category === category).map((item, idx) => {
                                    const cartQuantity = cart.get(item.name) || 0;
                                    const totalPrice = item.price * cartQuantity;
                                    const canAfford = ownedCoins >= totalPrice;

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
                                                        <span className="font-bold text-yellow-400">
                                                            {item.price.toLocaleString()} 코인
                                                        </span>
                                                        <span className="text-gray-500">
                                                            (최대 {item.maxQuantity}개)
                                                        </span>
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
                                                            if (current < item.maxQuantity) {
                                                                newCart.set(item.name, current + 1);
                                                                setCart(newCart);
                                                            }
                                                        }}
                                                        className="w-6 h-6 sm:w-7 sm:h-7 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded flex items-center justify-center text-white text-xs sm:text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                        disabled={cartQuantity >= item.maxQuantity}
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
                                                    <button
                                                        onClick={() => {
                                                            const newCart = new Map(cart);
                                                            newCart.set(item.name, item.maxQuantity);
                                                            setCart(newCart);
                                                        }}
                                                        className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-emerald-600/80 hover:bg-emerald-500 border border-emerald-500 rounded text-white text-[10px] sm:text-xs font-bold transition-colors whitespace-nowrap"
                                                    >
                                                        최대
                                                    </button>
                                                </div>
                                            </div>

                                            {/* 구매 정보 (수량 선택 시에만 표시) */}
                                            {cartQuantity > 0 && (
                                                <div className={`mt-1.5 pt-1.5 border-t ${canAfford ? 'border-emerald-500/30' : 'border-red-500/30'}`}>
                                                    <div className="flex justify-between items-center text-[10px] sm:text-xs">
                                                        <span className={canAfford ? 'text-emerald-400' : 'text-red-400'}>
                                                            {canAfford ? '✓ 구매 가능' : '✗ 코인 부족'}
                                                        </span>
                                                        <span className="font-bold text-yellow-400">
                                                            총 {totalPrice.toLocaleString()} 코인
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

                            {(() => {
                                let totalCoins = 0;

                                Array.from(cart.entries()).forEach(([itemName, quantity]) => {
                                    const item = COIN_SHOP_ITEMS.find(i => i.name === itemName);
                                    if (item) {
                                        totalCoins += item.price * quantity;
                                    }
                                });

                                const canAffordAll = ownedCoins >= totalCoins;

                                return (
                                    <>
                                        <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4">
                                            <div className={`rounded-lg p-3 sm:p-4 border ${canAffordAll ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                                <div className="text-xs sm:text-sm text-gray-400 mb-1">필요 일루전 코인</div>
                                                <div className="text-lg sm:text-xl font-bold text-yellow-400">
                                                    {totalCoins.toLocaleString()}
                                                </div>
                                                <div className={`text-xs sm:text-sm mt-1 ${canAffordAll ? 'text-emerald-400' : 'text-red-400'}`}>
                                                    남은 코인: {(ownedCoins - totalCoins).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`text-center py-2 sm:py-3 rounded-lg ${canAffordAll ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'} font-bold text-sm sm:text-base`}>
                                            {canAffordAll ? '✓ 모든 아이템을 구매할 수 있습니다!' : '✗ 코인이 부족합니다'}
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
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">💡 코인 획득 팁</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4 text-gray-300">
                        <div className="bg-slate-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="font-bold text-blue-300 mb-1 sm:mb-2 text-sm sm:text-base">📈 조사 미션</div>
                            <div className="text-xs sm:text-sm leading-relaxed">
                                레벨 범위 몬스터 2,000마리 처치마다 800 코인 획득! 주간 최대 4,000 코인을 얻을 수 있어요.
                            </div>
                        </div>
                        <div className="bg-slate-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="font-bold text-purple-300 mb-1 sm:mb-2 text-sm sm:text-base">⏰ 장기 이벤트</div>
                            <div className="text-xs sm:text-sm leading-relaxed">
                                2026년 3월 18일까지 진행! 꾸준히 모아서 원하는 아이템을 구매하세요.
                            </div>
                        </div>
                        <div className="bg-slate-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="font-bold text-green-300 mb-1 sm:mb-2 text-sm sm:text-base">🎯 우선순위</div>
                            <div className="text-xs sm:text-sm leading-relaxed">
                                큐브, 잠재 주문서 등 강화 아이템을 우선 구매하여 캐릭터 성장을 가속화하세요!
                            </div>
                        </div>
                        <div className="bg-slate-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="font-bold text-yellow-300 mb-1 sm:mb-2 text-sm sm:text-base">💰 효율적인 소비</div>
                            <div className="text-xs sm:text-sm leading-relaxed">
                                장바구니 기능을 활용해 필요한 아이템을 미리 계획하고 코인을 효율적으로 사용하세요!
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
