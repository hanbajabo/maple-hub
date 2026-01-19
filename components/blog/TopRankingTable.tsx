'use client';

import { useState } from 'react';
import { List } from 'lucide-react';

import { seasonData } from './rankingData';

interface TopRankingTableProps {
    className?: string;
}

export default function TopRankingTable({ className = '' }: TopRankingTableProps) {
    const [selectedSeason, setSelectedSeason] = useState<string>('전체');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // 현재 선택된 시즌 데이터
    const allData = selectedSeason === '전체'
        ? Object.entries(seasonData).flatMap(([season, data]) =>
            data.map(item => ({ ...item, season }))
        )
        : (seasonData[selectedSeason] || []).map(item => ({ ...item, season: selectedSeason }));

    // 검색 필터링
    const currentData = searchQuery.trim()
        ? allData.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()))
        : allData;

    // 가격 포맷 함수
    const formatPrice = (price: number) => {
        if (price >= 10000000) {
            const value = price / 10000000;
            return `${value.toFixed(value % 1 === 0 ? 0 : 2)}천만`;
        } else if (price >= 1000000) {
            const value = price / 10000;
            return `${value.toFixed(0)}만`;
        }
        return price.toLocaleString();
    };

    // 순위별 색상
    const getRankColor = (rank: number) => {
        if (rank === 1) return 'text-yellow-400 font-black';
        if (rank === 2) return 'text-slate-300 font-bold';
        if (rank === 3) return 'text-orange-400 font-bold';
        if (rank <= 10) return 'text-blue-400 font-semibold';
        if (rank <= 20) return 'text-purple-400';
        if (rank <= 50) return 'text-green-400';
        return 'text-slate-400';
    };

    // 시즌별 설명
    const getSeasonNote = (season: string) => {
        const notes: { [key: string]: string } = {
            '전체': '모든 시즌의 데이터를 통합하여 보여줍니다. 검색 기능으로 원하는 닉네임을 찾아보세요!',
            '1': '뉴네임 옥션 최초 시즌으로, 가장 높은 낙찰가를 기록했습니다.',
            '2': '전반적으로 가격이 안정화된 시즌입니다.',
            '2.5': '운영자가 직접 판매한 특별 시즌입니다.',
            '3': '감성 단어와 동물 닉네임의 인기가 상승한 시즌입니다.',
            '4': '역대 2위 최고가를 기록하며 뉴네임 옥션의 인기가 재상승했습니다.',
            '5': '계절/감성 단어의 가치가 재평가받은 시즌입니다.',
        };
        return notes[season] || '';
    };

    return (
        <section className={`mb-12 ${className}`}>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                <List className="w-8 h-8 text-indigo-400" />
                시즌별 TOP 500 닉네임 완전 정리
            </h2>

            <p className="text-slate-300 leading-relaxed mb-6">
                시즌별로 <strong className="text-yellow-400">가장 인기있었던 닉네임 500개</strong>를 순위와 낙찰가와 함께 확인하세요.
            </p>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="닉네임 검색... (예: 라라, 토끼, 메리)"
                        className="w-full px-4 py-3 pl-12 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                    <svg
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
                {searchQuery && (
                    <p className="text-sm text-slate-400 mt-2">
                        검색 결과: <span className="text-white font-bold">{currentData.length}</span>개의 닉네임 발견
                    </p>
                )}
            </div>

            {/* Season Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {['전체', '1', '2', '2.5', '3', '4', '5'].map((season) => (
                    <button
                        key={season}
                        onClick={() => setSelectedSeason(season)}
                        className={`px-6 py-3 rounded-lg font-bold transition-all ${selectedSeason === season
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white'
                            }`}
                    >
                        {season === '전체' ? '🌟 전체' : `시즌 ${season}`}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl overflow-hidden">
                {/* Table Header */}
                <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-b border-slate-700">
                    <div className="grid grid-cols-12 gap-4 p-4 font-bold text-white">
                        <div className="col-span-2 text-center">순위</div>
                        <div className="col-span-6">닉네임</div>
                        <div className="col-span-4 text-right">낙찰가</div>
                    </div>
                </div>

                {/* Table Body - Scrollable */}
                <div className="max-h-[600px] overflow-y-auto">
                    {currentData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <svg className="w-16 h-16 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-slate-400 text-lg font-semibold">검색 결과가 없습니다</p>
                            <p className="text-slate-500 text-sm mt-2">다른 키워드로 검색해보세요</p>
                        </div>
                    ) : (
                        currentData.map((item) => (
                            <div
                                key={`${item.season}-${item.rank}-${item.name}`}
                                className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800/50 hover:bg-slate-700/30 transition-colors"
                            >
                                <div className={`col-span-2 text-center font-bold ${getRankColor(item.rank)}`}>
                                    {item.rank === 1 && '👑 '}
                                    {item.rank === 2 && '🥈 '}
                                    {item.rank === 3 && '🥉 '}
                                    #{item.rank}
                                </div>
                                <div className="col-span-6 text-white font-semibold flex items-center gap-2">
                                    <span>{item.name}</span>
                                    {selectedSeason === '전체' && (
                                        <span className={`px-2 py-0.5 text-xs rounded ${item.season === '1' ? 'bg-yellow-500/20 text-yellow-300' :
                                            item.season === '2' ? 'bg-blue-500/20 text-blue-300' :
                                                item.season === '2.5' ? 'bg-cyan-500/20 text-cyan-300' :
                                                    item.season === '3' ? 'bg-pink-500/20 text-pink-300' :
                                                        item.season === '4' ? 'bg-purple-500/20 text-purple-300' :
                                                            'bg-green-500/20 text-green-300'
                                            }`}>
                                            S{item.season}
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-4 text-right">
                                    <span className={`font-bold ${item.price >= 10000000 ? 'text-yellow-400' :
                                        item.price >= 7000000 ? 'text-blue-400' :
                                            item.price >= 3000000 ? 'text-green-400' :
                                                'text-slate-300'
                                        }`}>
                                        {formatPrice(item.price)}
                                    </span>
                                    <span className="text-slate-500 text-sm ml-2">
                                        ({item.price.toLocaleString()} 메이플포인트)
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer Note */}
                <div className="bg-slate-900/50 border-t border-slate-700 p-4">
                    <p className="text-slate-400 text-sm mb-0">
                        💡 <strong className="text-white">시즌{selectedSeason}</strong>: {getSeasonNote(selectedSeason)}
                    </p>
                </div>
            </div>
        </section>
    );
}
