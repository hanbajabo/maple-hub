'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface RankingPlayer {
    ranking: number;
    character_name: string;
    world_name: string;
    class_name: string;
    sub_class_name: string;
    character_level: number;
    character_exp?: number;
}

export default function Level295Section() {
    const [loading, setLoading] = useState(true);
    const [allPlayers, setAllPlayers] = useState<RankingPlayer[]>([]);
    const [filteredPlayers, setFilteredPlayers] = useState<RankingPlayer[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [displayCount, setDisplayCount] = useState(50); // 처음에 50명만 보여줌

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredPlayers(allPlayers);
        } else {
            const lower = searchTerm.toLowerCase();
            setFilteredPlayers(allPlayers.filter(p =>
                p.character_name.toLowerCase().includes(lower)
            ));
        }
        setDisplayCount(50); // 검색 시 목록 초기화
    }, [searchTerm, allPlayers]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // 캐싱된 API 엔드포인트 호출 (서버에서 23시간마다 갱신)
            const response = await fetch('/api/level295');
            const data = await response.json();
            setAllPlayers(data.players || []);
        } catch (err) {
            console.error('랭킹 데이터 로딩 에러:', err);
        } finally {
            setLoading(false);
        }
    };

    // 더 보기 핸들러
    const handleLoadMore = () => {
        setDisplayCount(prev => prev + 50);
    };

    // 레벨별 통계
    const getLevelStats = () => {
        const stats: Record<number, number> = {};
        allPlayers.forEach(p => {
            stats[p.character_level] = (stats[p.character_level] || 0) + 1;
        });
        return stats;
    };

    const levelStats = getLevelStats();
    // 레벨 내림차순 정렬된 키 배열
    const sortedLevels = Object.keys(levelStats).map(Number).sort((a, b) => b - a);

    if (loading) {
        return (
            <div className="bg-purple-900/20 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 mt-12">
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8 mt-6 sm:mt-12 pt-6 sm:pt-12 border-t-2 border-red-500/30">
            {/* 헤더 */}
            <div className="text-center">
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2 sm:gap-3">
                    <span>🔥</span> Lv.295+ 초고레벨 현황
                </h2>
                <p className="text-purple-200 text-sm sm:text-lg">
                    메이플스토리 최상위 레벨 유저 통계
                    <span className="ml-2 text-xs sm:text-sm text-purple-400 block sm:inline mt-1 sm:mt-0">(매일 오전 1시 업데이트)</span>
                </p>
            </div>

            {/* 레벨별 분포 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {sortedLevels.map(level => (
                    <div key={level} className={`
                        rounded-xl p-3 sm:p-4 border text-center
                        ${level === 300
                            ? 'bg-yellow-900/30 border-yellow-500/50'
                            : 'bg-purple-900/30 border-purple-500/30'
                        }
                    `}>
                        <p className={`text-xs sm:text-sm font-bold mb-1 ${level === 300 ? 'text-yellow-400' : 'text-purple-300'}`}>
                            Lv.{level}
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-white">
                            {levelStats[level]}<span className="text-xs sm:text-sm text-gray-400 ml-1">명</span>
                        </p>
                    </div>
                ))}
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3 sm:p-4 text-center">
                    <p className="text-red-400 text-xs sm:text-sm font-bold mb-1">총 인원</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">
                        {allPlayers.length}<span className="text-xs sm:text-sm text-gray-400 ml-1">명</span>
                    </p>
                </div>
            </div>

            {/* 랭킹 리스트 */}
            <div className="bg-purple-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20">
                <div className="p-4 sm:p-6 border-b border-purple-500/20 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                    <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                        <span>📊</span> 전체 랭킹
                    </h3>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="닉네임 검색..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg py-2 px-4 pl-10 text-sm text-purple-100 placeholder-purple-400/50 focus:outline-none focus:border-purple-400 transition-colors"
                            />
                            <svg className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <span className="text-xs sm:text-sm text-purple-300 whitespace-nowrap">
                            총 {filteredPlayers.length}명
                        </span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-purple-100 min-w-[500px] sm:min-w-0">
                        <thead>
                            <tr className="bg-purple-600/30 text-purple-100">
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left font-semibold text-xs sm:text-base whitespace-nowrap">순위</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left font-semibold text-xs sm:text-base whitespace-nowrap">닉네임</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-center font-semibold text-xs sm:text-base whitespace-nowrap">월드</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-center font-semibold text-xs sm:text-base whitespace-nowrap">직업</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-center font-semibold text-xs sm:text-base whitespace-nowrap">레벨</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPlayers.length > 0 ? (
                                filteredPlayers.slice(0, displayCount).map((player, index) => (
                                    <tr key={index} className="border-b border-purple-700/30 hover:bg-purple-500/10 transition-colors">
                                        <td className="px-3 py-2 sm:px-6 sm:py-3 font-bold text-purple-400 text-xs sm:text-base whitespace-nowrap">
                                            {player.ranking}
                                        </td>
                                        <td className="px-3 py-2 sm:px-6 sm:py-3 font-semibold text-white text-xs sm:text-base whitespace-nowrap">
                                            <Link href={`/?name=${player.character_name}`} className="hover:text-yellow-400 hover:underline cursor-pointer">
                                                {player.character_name}
                                            </Link>
                                        </td>
                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-center text-purple-200 text-xs sm:text-base whitespace-nowrap">
                                            {player.world_name}
                                        </td>
                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-center text-purple-200 text-xs sm:text-base whitespace-nowrap">
                                            {player.sub_class_name || player.class_name}
                                        </td>
                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-center">
                                            <span className={`font-bold px-2 py-1 rounded text-xs sm:text-base ${player.character_level === 300 ? 'bg-yellow-500/20 text-yellow-400' :
                                                player.character_level === 299 ? 'bg-red-500/20 text-red-400' :
                                                    'text-blue-400'
                                                }`}>
                                                Lv.{player.character_level}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-purple-300">
                                        검색 결과가 없습니다.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 더 보기 버튼 */}
                {displayCount < filteredPlayers.length && (
                    <div className="p-4 text-center border-t border-purple-500/20">
                        <button
                            onClick={handleLoadMore}
                            className="px-6 py-2 bg-purple-600/50 hover:bg-purple-600 text-white rounded-lg transition-all text-sm sm:text-base font-semibold"
                        >
                            더 보기 ({Math.min(displayCount + 50, filteredPlayers.length)} / {filteredPlayers.length})
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
