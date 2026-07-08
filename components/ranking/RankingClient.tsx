'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AdBanner, InArticleAd } from '../AdSense';

// Server Action imports removed in favor of API Route for caching
import Level300Section from './Level300Section';
import Level295Section from './Level295Section';
import Level285Section from './Level285Section';

type RankingType = 'overall' | 'union' | 'guild' | 'dojang' | 'theseed' | 'achievement' | 'level300' | 'level295' | 'level285';

interface RankingData {
    ranking: number;
    character_name?: string;
    world_name?: string;
    class_name?: string;
    sub_class_name?: string;
    character_level?: number;
    character_exp?: number;
    character_popularity?: number;
    union_level?: number;
    guild_name?: string;
    guild_level?: number;
    guild_master_name?: string;
    guild_mark?: string | null;
    guild_point?: number;
    dojang_floor?: number;
    dojang_time_record?: number;
    theseed_floor?: number;
    theseed_time_record?: number;
    trophy_grade?: string;
    trophy_score?: number;
}

const WORLD_OPTIONS = [
    { value: '', label: '🌍 모든 월드 전체', worldType: undefined },
    { value: '', label: '────────────', worldType: undefined, disabled: true },
    { value: 'NORMAL_ALL', label: '⚔️ 일반 월드 전체', worldType: '0' },
    { value: '스카니아', label: '　스카니아', worldType: undefined },
    { value: '베라', label: '　베라', worldType: undefined },
    { value: '루나', label: '　루나', worldType: undefined },
    { value: '제니스', label: '　제니스', worldType: undefined },
    { value: '크로아', label: '　크로아', worldType: undefined },
    { value: '유니온', label: '　유니온', worldType: undefined },
    { value: '엘리시움', label: '　엘리시움', worldType: undefined },
    { value: '이노시스', label: '　이노시스', worldType: undefined },
    { value: '레드', label: '　레드', worldType: undefined },
    { value: '오로라', label: '　오로라', worldType: undefined },
    { value: '아케인', label: '　아케인', worldType: undefined },
    { value: '노바', label: '　노바', worldType: undefined },
    { value: '', label: '────────────', worldType: undefined, disabled: true },
    { value: 'REBOOT_ALL', label: '🔄 (구)리부트 월드 전체', worldType: '1' },
    { value: '에오스', label: '　에오스', worldType: undefined },
    { value: '핼리오스', label: '　핼리오스', worldType: undefined },
    { value: '', label: '────────────', worldType: undefined, disabled: true },
    { value: 'CHALLENGERS_ALL', label: '🎮 챌린저스 월드 전체', worldType: 'challengers' },
    { value: '챌린저스', label: '　챌린저스', worldType: undefined },
    { value: '챌린저스2', label: '　챌린저스2', worldType: undefined },
    { value: '챌린저스3', label: '　챌린저스3', worldType: undefined },
    { value: '챌린저스4', label: '　챌린저스4', worldType: undefined },
];

const TAB_CONFIGS = [
    { id: 'overall', label: '🎯 종합', icon: '⚔️' },
    { id: 'level300', label: '👑 만렙 현황', icon: '🎖️' },
    { id: 'level295', label: '🔥 295+ 현황', icon: '📈' },
    { id: 'level285', label: '⚡ 285+ 현황', icon: '💎' },
    { id: 'union', label: '🏅 유니온', icon: '👥' },
    { id: 'guild', label: '🏰 길드', icon: '🛡️' },
    { id: 'dojang', label: '🥋 무릉도장', icon: '🗻' },
    { id: 'theseed', label: '🌱 더 시드', icon: '🌳' },
    { id: 'achievement', label: '업적', icon: '⭐' },
];

export default function RankingClient() {
    const [activeTab, setActiveTab] = useState<RankingType>('overall');
    const [rankingData, setRankingData] = useState<RankingData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedWorld, setSelectedWorld] = useState('');
    const [selectedWorldType, setSelectedWorldType] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [dojangDifficulty, setDojangDifficulty] = useState(1); // 0: 일반, 1: 통달

    // API Route 호출 헬퍼 (CDN 캐싱 활용)
    const fetchRankingApi = async (type: string, params: Record<string, string | number | undefined>) => {
        const query = new URLSearchParams();
        query.append('type', type);
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                query.append(key, String(value));
            }
        });
        const res = await fetch(`/api/ranking/list?${query.toString()}`);
        if (!res.ok) return null;
        return res.json();
    };

    // 클라이언트 사이드 캐싱을 위한 Ref (리렌더링 방지 및 즉시 접근)
    const tabCacheRef = useRef<Record<string, RankingData[]>>({});

    // 검색 상태
    const [searchNickname, setSearchNickname] = useState('');
    const [searchResult, setSearchResult] = useState<RankingData | null>(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    // 랭킹 탭이 변경되면 검색 결과 초기화
    useEffect(() => {
        setSearchResult(null);
        setSearchNickname('');
        setSearchError(null);
    }, [activeTab]);

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!searchNickname.trim()) return;

        setSearchLoading(true);
        setSearchError(null);
        setSearchResult(null);

        try {
            // 현재 선택된 월드 필터가 있으면 같이 보냄
            const worldParam = selectedWorld && selectedWorld !== 'NORMAL_ALL' && selectedWorld !== 'REBOOT_ALL' && selectedWorld !== 'CHALLENGERS_ALL'
                ? `&world_name=${selectedWorld}`
                : '';

            const res = await fetch(`/api/ranking/search?nickname=${encodeURIComponent(searchNickname)}&type=${activeTab}${worldParam}`);
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || '검색 실패');
            setSearchResult(data);
        } catch (err: any) {
            setSearchError(err.message);
        } finally {
            setSearchLoading(false);
        }
    };

    // 캐시 키 생성 함수
    const getCacheKey = () => {
        return `${activeTab}-${selectedWorld}-${currentPage}-${dojangDifficulty}`;
    };

    const fetchRanking = async () => {
        if (activeTab === 'level300' || activeTab === 'level295' || activeTab === 'level285') return;

        const cacheKey = getCacheKey();

        // 캐시된 데이터가 있으면 바로 사용
        if (tabCacheRef.current[cacheKey]) {
            setRankingData(tabCacheRef.current[cacheKey]);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            let data: any;
            let resultData: RankingData[] = [];

            // world_name: 개별 월드명 또는 undefined
            // world_type: '0'(일반), '1'(리부트), 'challengers' 또는 undefined
            const worldName = (selectedWorld === 'NORMAL_ALL' || selectedWorld === 'REBOOT_ALL' || selectedWorld === 'CHALLENGERS_ALL')
                ? undefined
                : (selectedWorld || undefined);
            const worldType = selectedWorldType;

            // 정렬 로직 함수
            const sortRankingData = (list: RankingData[]) => {
                if (activeTab === 'overall') {
                    list.sort((a, b) => {
                        if ((b.character_level || 0) !== (a.character_level || 0)) return (b.character_level || 0) - (a.character_level || 0);
                        return (Number(b.character_exp) || 0) - (Number(a.character_exp) || 0);
                    });
                } else if (activeTab === 'union') {
                    list.sort((a, b) => (b.union_level || 0) - (a.union_level || 0));
                } else if (activeTab === 'guild') {
                    list.sort((a, b) => (b.guild_point || 0) - (a.guild_point || 0));
                } else if (activeTab === 'dojang') {
                    list.sort((a, b) => {
                        if ((b.dojang_floor || 0) !== (a.dojang_floor || 0)) return (b.dojang_floor || 0) - (a.dojang_floor || 0);
                        return (a.dojang_time_record || 0) - (b.dojang_time_record || 0);
                    });
                } else if (activeTab === 'theseed') {
                    list.sort((a, b) => {
                        if ((b.theseed_floor || 0) !== (a.theseed_floor || 0)) return (b.theseed_floor || 0) - (a.theseed_floor || 0);
                        return (a.theseed_time_record || 0) - (b.theseed_time_record || 0);
                    });
                }
            };

            // "모든 월드 전체" 선택 시: 일반 + 리부트 + 챌린저스 데이터 합치기
            // "모든 월드 전체" 선택 시: 일반 + 리부트 데이터 합치기 (챌린저스 제외)
            if (selectedWorld === '' && !worldType && activeTab !== 'achievement') {
                let combined: RankingData[] = [];

                if (activeTab === 'overall') {
                    const normalData = await fetchByWorldType('0');
                    const rebootData = await fetchByWorldType('1');
                    // 챌린저스 제외
                    combined = [
                        ...(normalData?.ranking || []),
                        ...(rebootData?.ranking || [])
                    ];
                } else {
                    // 나머지 랭킹: world_type 미지원 -> 그냥 호출하면 전체 데이터(일반+리부트)
                    const allWorldData = await fetchRankingApi(activeTab, { page: currentPage, difficulty: dojangDifficulty });
                    combined = allWorldData?.ranking || [];
                }

                // 데이터 정렬
                sortRankingData(combined);

                // 새로운 순위 부여 (페이지 반영)
                const startRank = (currentPage - 1) * 200 + 1;
                combined.forEach((player, index) => {
                    player.ranking = startRank + index;
                });

                resultData = combined.slice(0, 200);
            } else if (worldType === 'challengers' && activeTab !== 'achievement') {
                // "챌린저스 월드 전체" 선택 시
                const challengersData = await fetchChallengerWorlds();

                // 데이터 정렬
                sortRankingData(challengersData);

                // 랭킹 재부여 (페이지 반영)
                const startRank = (currentPage - 1) * 200 + 1;
                challengersData.forEach((player, index) => {
                    player.ranking = startRank + index;
                });

                resultData = challengersData.slice(0, 200);
            } else {
                // 일반적인 단일 API 호출 (API Route 사용)
                const params: any = { page: currentPage };
                if (worldName) params.world_name = worldName;
                if (worldType) params.world_type = worldType;
                if (activeTab === 'dojang') params.difficulty = dojangDifficulty;

                data = await fetchRankingApi(activeTab, params);
                resultData = data?.ranking || [];
            }

            setRankingData(resultData);

            // 캐시에 데이터 저장
            tabCacheRef.current[cacheKey] = resultData;
        } catch (err) {
            console.error('❌ 랭킹 데이터 에러:', err);
            setError('랭킹 데이터를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 월드 타입별 데이터 가져오기 (모든 월드 전체용)
    const fetchByWorldType = async (worldType: string) => {
        const params: any = { world_type: worldType, page: currentPage };
        if (activeTab === 'dojang') params.difficulty = dojangDifficulty;
        return await fetchRankingApi(activeTab, params);
    };

    // 챌린저스 월드들 데이터 가져오기
    const fetchChallengerWorlds = async () => {
        const challengersWorlds = ['챌린저스', '챌린저스2', '챌린저스3', '챌린저스4'];

        // 각 챌린저스 월드별 데이터 병렬 조회
        const promises = challengersWorlds.map(async (worldName) => {
            try {
                const params: any = { world_name: worldName, page: currentPage };
                if (activeTab === 'dojang') params.difficulty = dojangDifficulty;
                return await fetchRankingApi(activeTab, params);
            } catch {
                return null;
            }
        });

        const results = await Promise.all(promises);

        // 모든 월드 데이터 합치기
        const combined = results
            .filter(r => r !== null)
            .flatMap(r => r?.ranking || []);

        return combined;
    };

    useEffect(() => {
        fetchRanking();
    }, [activeTab, selectedWorld, currentPage, dojangDifficulty]);

    const renderTableHeader = () => {
        const headerClass = "px-3 py-2 sm:px-6 sm:py-4 text-left font-semibold text-xs sm:text-base whitespace-nowrap";
        const headerCenterClass = "px-3 py-2 sm:px-6 sm:py-4 text-center font-semibold text-xs sm:text-base whitespace-nowrap";
        const headerRightClass = "px-3 py-2 sm:px-6 sm:py-4 text-right font-semibold text-xs sm:text-base whitespace-nowrap";

        switch (activeTab) {
            case 'overall':
                return (
                    <tr className="bg-purple-600/30 text-purple-100">
                        <th className={headerClass}>순위</th>
                        <th className={headerClass}>캐릭터명</th>
                        <th className={headerClass}>월드</th>
                        <th className={headerClass}>직업</th>
                        <th className={headerCenterClass}>레벨</th>
                        <th className={headerRightClass}>경험치</th>
                    </tr>
                );
            case 'union':
                return (
                    <tr className="bg-purple-600/30 text-purple-100">
                        <th className={headerClass}>순위</th>
                        <th className={headerClass}>캐릭터명</th>
                        <th className={headerClass}>월드</th>
                        <th className={headerClass}>직업</th>
                        <th className={headerCenterClass}>유니온 레벨</th>
                    </tr>
                );
            case 'guild':
                return (
                    <tr className="bg-purple-600/30 text-purple-100">
                        <th className={headerClass}>순위</th>
                        <th className={headerClass}>길드명</th>
                        <th className={headerClass}>월드</th>
                        <th className={headerClass}>길드마스터</th>
                        <th className={headerCenterClass}>레벨</th>
                        <th className={headerRightClass}>명성치</th>
                    </tr>
                );
            case 'dojang':
                return (
                    <tr className="bg-purple-600/30 text-purple-100">
                        <th className={headerClass}>순위</th>
                        <th className={headerClass}>캐릭터명</th>
                        <th className={headerClass}>월드</th>
                        <th className={headerClass}>직업</th>
                        <th className={headerCenterClass}>층수</th>
                        <th className={headerRightClass}>기록</th>
                    </tr>
                );
            case 'theseed':
                return (
                    <tr className="bg-purple-600/30 text-purple-100">
                        <th className={headerClass}>순위</th>
                        <th className={headerClass}>캐릭터명</th>
                        <th className={headerClass}>월드</th>
                        <th className={headerClass}>직업</th>
                        <th className={headerCenterClass}>층수</th>
                        <th className={headerRightClass}>기록</th>
                    </tr>
                );
            case 'achievement':
                return (
                    <tr className="bg-purple-600/30 text-purple-100">
                        <th className={headerClass}>순위</th>
                        <th className={headerClass}>캐릭터명</th>
                        <th className={headerClass}>등급</th>
                        <th className={headerRightClass}>점수</th>
                    </tr>
                );
        }
    };

    const formatNumber = (num?: number) => {
        if (!num) return '-';
        return num.toLocaleString('ko-KR');
    };

    const formatTime = (seconds?: number) => {
        if (!seconds) return '-';
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}분 ${secs}초`;
    };

    const renderTableRow = (item: RankingData, index: number) => {
        const getRankStyle = (rank: number) => {
            if (rank === 1) return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-l-4 border-yellow-500';
            if (rank === 2) return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-l-4 border-gray-400';
            if (rank === 3) return 'bg-gradient-to-r from-orange-600/20 to-orange-700/20 border-l-4 border-orange-600';
            return 'hover:bg-purple-500/10';
        };

        const getRankIcon = (rank: number) => {
            if (rank === 1) return '🥇';
            if (rank === 2) return '🥈';
            if (rank === 3) return '🥉';
            return rank;
        };

        const cellClass = "px-3 py-2 sm:px-6 sm:py-4 text-xs sm:text-base whitespace-nowrap";
        const cellCenterClass = "px-3 py-2 sm:px-6 sm:py-4 text-center text-xs sm:text-base whitespace-nowrap";
        const cellRightClass = "px-3 py-2 sm:px-6 sm:py-4 text-right text-xs sm:text-base whitespace-nowrap text-purple-200";

        // 모바일에서 랭킹 아이콘 크기 조절
        const rankIconClass = "px-3 py-2 sm:px-6 sm:py-4 font-bold text-base sm:text-lg whitespace-nowrap";

        switch (activeTab) {
            case 'overall':
                return (
                    <tr key={index} className={`border-b border-purple-700/30 transition-all ${getRankStyle(item.ranking)}`}>
                        <td className={rankIconClass}>{getRankIcon(item.ranking)}</td>
                        <td className={`${cellClass} font-semibold text-white`}>
                            <Link href={`/?name=${item.character_name}`} prefetch={false} className="hover:text-yellow-400 hover:underline cursor-pointer">
                                {item.character_name}
                            </Link>
                        </td>
                        <td className={cellClass}>{item.world_name}</td>
                        <td className={cellClass}>{item.sub_class_name || item.class_name}</td>
                        <td className={cellCenterClass}>
                            <span className={`font-bold ${item.character_level === 300 ? 'text-yellow-400' : 'text-blue-400'}`}>
                                Lv.{item.character_level}
                            </span>
                        </td>
                        <td className={cellRightClass}>{formatNumber(item.character_exp)}</td>
                    </tr>
                );
            case 'union':
                return (
                    <tr key={index} className={`border-b border-purple-700/30 transition-all ${getRankStyle(item.ranking)}`}>
                        <td className={rankIconClass}>{getRankIcon(item.ranking)}</td>
                        <td className={`${cellClass} font-semibold text-white`}>
                            <Link href={`/?name=${item.character_name}`} prefetch={false} className="hover:text-yellow-400 hover:underline cursor-pointer">
                                {item.character_name}
                            </Link>
                        </td>
                        <td className={cellClass}>{item.world_name}</td>
                        <td className={cellClass}>{item.sub_class_name || item.class_name}</td>
                        <td className={cellCenterClass}>
                            <span className="font-bold text-purple-400">Lv.{item.union_level}</span>
                        </td>
                    </tr>
                );
            case 'guild':
                return (
                    <tr key={index} className={`border-b border-purple-700/30 transition-all ${getRankStyle(item.ranking)}`}>
                        <td className={rankIconClass}>{getRankIcon(item.ranking)}</td>
                        <td className={`${cellClass} font-semibold text-white`}>{item.guild_name}</td>
                        <td className={cellClass}>{item.world_name}</td>
                        <td className={cellClass}>
                            <Link href={`/?name=${item.guild_master_name}`} prefetch={false} className="hover:text-yellow-400 hover:underline cursor-pointer">
                                {item.guild_master_name}
                            </Link>
                        </td>
                        <td className={cellCenterClass}>
                            <span className="font-bold text-blue-400">Lv.{item.guild_level}</span>
                        </td>
                        <td className={cellRightClass}>{formatNumber(item.guild_point)}</td>
                    </tr>
                );
            case 'dojang':
                return (
                    <tr key={index} className={`border-b border-purple-700/30 transition-all ${getRankStyle(item.ranking)}`}>
                        <td className={rankIconClass}>{getRankIcon(item.ranking)}</td>
                        <td className={`${cellClass} font-semibold text-white`}>
                            <Link href={`/?name=${item.character_name}`} prefetch={false} className="hover:text-yellow-400 hover:underline cursor-pointer">
                                {item.character_name}
                            </Link>
                        </td>
                        <td className={cellClass}>{item.world_name}</td>
                        <td className={cellClass}>{item.sub_class_name || item.class_name}</td>
                        <td className={cellCenterClass}>
                            <span className="font-bold text-orange-400">{item.dojang_floor || '-'}층</span>
                        </td>
                        <td className={cellRightClass}>{formatTime(item.dojang_time_record)}</td>
                    </tr>
                );
            case 'theseed':
                return (
                    <tr key={index} className={`border-b border-purple-700/30 transition-all ${getRankStyle(item.ranking)}`}>
                        <td className={rankIconClass}>{getRankIcon(item.ranking)}</td>
                        <td className={`${cellClass} font-semibold text-white`}>
                            <Link href={`/?name=${item.character_name}`} prefetch={false} className="hover:text-yellow-400 hover:underline cursor-pointer">
                                {item.character_name}
                            </Link>
                        </td>
                        <td className={cellClass}>{item.world_name}</td>
                        <td className={cellClass}>{item.sub_class_name || item.class_name}</td>
                        <td className={cellCenterClass}>
                            <span className="font-bold text-green-400">{item.theseed_floor || '-'}층</span>
                        </td>
                        <td className={cellRightClass}>{formatTime(item.theseed_time_record)}</td>
                    </tr>
                );
            case 'achievement':
                return (
                    <tr key={index} className={`border-b border-purple-700/30 transition-all ${getRankStyle(item.ranking)}`}>
                        <td className={rankIconClass}>{getRankIcon(item.ranking)}</td>
                        <td className={`${cellClass} font-semibold text-white`}>
                            <Link href={`/?name=${item.character_name}`} prefetch={false} className="hover:text-yellow-400 hover:underline cursor-pointer">
                                {item.character_name}
                            </Link>
                        </td>
                        <td className={cellClass}>
                            <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold ${item.trophy_grade === '레전드' ? 'bg-yellow-500/30 text-yellow-300' :
                                item.trophy_grade === '마스터' ? 'bg-purple-500/30 text-purple-300' :
                                    'bg-blue-500/30 text-blue-300'
                                }`}>
                                {item.trophy_grade}
                            </span>
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 text-right">
                            <span className="font-bold text-yellow-400 text-xs sm:text-base">{formatNumber(item.trophy_score)}</span>
                        </td>
                    </tr>
                );
        }
    };

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* 탭 네비게이션 - 모바일 그리드, PC 플렉스 */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 justify-center">
                {TAB_CONFIGS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => {
                            setActiveTab(tab.id as RankingType);
                            setCurrentPage(1);
                        }}
                        className={`
                            px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition-all duration-300
                            flex items-center justify-center sm:justify-start gap-1 sm:gap-2 text-sm sm:text-base
                            ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg sm:scale-105'
                                : 'bg-purple-800/30 text-purple-200 hover:bg-purple-700/40 backdrop-blur-sm'
                            }
                        `}
                    >
                        <span className="text-lg sm:text-xl">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 광고 영역 (탭 아래) */}
            <div className="w-full">
                <InArticleAd dataAdSlot="6849727140" />
            </div>

            {/* 필터 섹션 */}
            {activeTab !== 'achievement' && activeTab !== 'level300' && activeTab !== 'level295' && activeTab !== 'level285' && (
                <div className="bg-purple-800/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-purple-500/20">
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-center">
                        <label className="text-purple-200 font-semibold hidden sm:inline">🌍 월드 선택:</label>
                        <select
                            value={selectedWorld}
                            onChange={(e) => {
                                const option = WORLD_OPTIONS.find(opt => opt.value === e.target.value);
                                setSelectedWorld(e.target.value);
                                setSelectedWorldType(option?.worldType);
                                setCurrentPage(1);
                            }}
                            className="bg-purple-900/50 text-white px-4 py-3 sm:py-2 rounded-lg border border-purple-500/30 
                                     focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm w-full sm:w-auto"
                        >
                            {WORLD_OPTIONS.map((option, index) => (
                                <option
                                    key={`${option.value}-${index}`}
                                    value={option.value}
                                    disabled={option.disabled}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        {/* 무릉도장 난이도 선택 */}
                        {activeTab === 'dojang' && (
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <span className="text-purple-400 hidden sm:inline">|</span>
                                <label className="text-purple-200 font-semibold whitespace-nowrap">🥋 난이도:</label>
                                <select
                                    value={dojangDifficulty}
                                    onChange={(e) => {
                                        setDojangDifficulty(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="bg-purple-900/50 text-white px-4 py-3 sm:py-2 rounded-lg border border-purple-500/30 
                                             focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm w-full sm:w-auto flex-grow"
                                >
                                    <option value={1}>통달</option>
                                    <option value={0}>일반</option>
                                </select>
                            </div>
                        )}

                        {/* 검색 UI */}
                        <div className="mt-2 sm:mt-0 sm:ml-auto w-full sm:w-auto">
                            <form onSubmit={handleSearch} className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="닉네임 검색"
                                    value={searchNickname}
                                    onChange={(e) => setSearchNickname(e.target.value)}
                                    className="bg-purple-900/50 text-white px-4 py-3 sm:py-2 rounded-lg border border-purple-500/30 
                                             focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm flex-grow sm:w-56 placeholder-purple-400"
                                />
                                <button
                                    type="submit"
                                    disabled={searchLoading}
                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 font-bold whitespace-nowrap"
                                >
                                    {searchLoading ? '...' : '🔍'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* 검색 결과 표시 */}
            {searchResult && activeTab !== 'level300' && activeTab !== 'level295' && activeTab !== 'level285' && (
                <div className="bg-purple-900/50 backdrop-blur-md rounded-xl p-4 sm:p-6 border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] relative animate-fade-in-up">
                    <button
                        onClick={() => {
                            setSearchResult(null);
                            setSearchNickname('');
                        }}
                        className="absolute top-4 right-4 text-purple-300 hover:text-white transition-colors bg-purple-800/50 rounded-full w-8 h-8 flex items-center justify-center"
                    >
                        ✕
                    </button>

                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🔎</span> 검색 결과
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="w-full text-purple-100">
                            <thead>
                                {renderTableHeader()}
                            </thead>
                            <tbody>
                                {renderTableRow(searchResult, -1)}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 검색 에러 표시 */}
            {searchError && (
                <div className="bg-red-900/50 backdrop-blur-sm rounded-xl p-4 border border-red-500/50 text-red-200 flex justify-between items-center">
                    <span>⚠️ {searchError}</span>
                    <button onClick={() => setSearchError(null)} className="text-red-400 hover:text-white">✕</button>
                </div>
            )}

            {/* 만렙 현황 탭 (항상 렌더링하되 CSS로 숨김 처리하여 재로딩 방지) */}
            <div className={activeTab === 'level300' ? 'block' : 'hidden'}>
                <Level300Section />
            </div>

            {/* 295+ 현황 탭 (항상 렌더링하되 CSS로 숨김 처리하여 재로딩 방지) */}
            <div className={activeTab === 'level295' ? 'block' : 'hidden'}>
                <Level295Section />
            </div>

            {/* 285+ 현황 탭 (항상 렌더링하되 CSS로 숨김 처리하여 재로딩 방지) */}
            <div className={activeTab === 'level285' ? 'block' : 'hidden'}>
                <Level285Section />
            </div>

            {/* 나머지 탭 컨텐츠 */}
            {activeTab !== 'level300' && activeTab !== 'level295' && activeTab !== 'level285' && (
                <>
                    {/* 랭킹 테이블 */}
                    <div className="bg-purple-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 shadow-2xl">
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-20">
                                <p className="text-red-400 text-xl">⚠️ {error}</p>
                                <button
                                    onClick={fetchRanking}
                                    className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                                >
                                    다시 시도
                                </button>
                            </div>
                        ) : rankingData.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-purple-300 text-xl">📊 랭킹 데이터가 없습니다.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-purple-100 min-w-[600px] sm:min-w-0">
                                    <thead>
                                        {renderTableHeader()}
                                    </thead>
                                    <tbody>
                                        {rankingData.map((item, index) => renderTableRow(item, index))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* 페이지네이션 */}
                    {!loading && !error && rankingData.length > 0 && (
                        <div className="flex justify-center gap-2 sm:gap-4">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 sm:px-6 sm:py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900/30 
                                         disabled:text-purple-600 text-white rounded-lg transition-colors font-semibold text-sm sm:text-base"
                            >
                                ← 이전
                            </button>
                            <span className="flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-purple-800/30 text-purple-100 rounded-lg font-semibold text-sm sm:text-base">
                                {currentPage} 페이지
                            </span>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className="px-4 py-2 sm:px-6 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-semibold text-sm sm:text-base"
                            >
                                다음 →
                            </button>
                        </div>
                    )}

                    {/* 하단 광고 영역 */}
                    <div className="mt-8">
                        <AdBanner dataAdSlot="8162808816" />
                    </div>
                </>
            )}
        </div>
    );
}
