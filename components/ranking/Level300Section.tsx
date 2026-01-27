'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface RankingPlayer {
    ranking: number;
    character_name: string;
    world_name: string;
    class_name: string;
    sub_class_name: string;
    character_level: number;
    character_exp?: number;
}

// 만렙 달성 정보
interface Level300Achievement {
    character_name: string;
    achievement_date: string;
    screenshot_url?: string;
    source?: string; // 출처
}

export default function Level300Section() {
    const [loading, setLoading] = useState(true);
    const [allPlayers, setAllPlayers] = useState<RankingPlayer[]>([]);
    const [modalAchievement, setModalAchievement] = useState<Level300Achievement | null>(null);

    // 만렙 달성 정보 (수동 관리)
    const level300Achievements: Level300Achievement[] = [
        {
            character_name: '오지환',
            achievement_date: '2025.01.27',
            screenshot_url: '/images/level300/ojihwan-300.jpg',
            source: 'https://vod.sooplive.co.kr/player/149468381'
        },
        {
            character_name: '버터',
            achievement_date: '2025.02.19'
        },
        {
            character_name: '테룽이',
            achievement_date: '2025.04.29'
        },
        {
            character_name: '솝상',
            achievement_date: '2025.05.09'
        },
        {
            character_name: '보마노랑이',
            achievement_date: '2025.05.16',
            screenshot_url: '/images/level300/bomanorangi-300.jpg',
            source: 'https://youtu.be/Q8Tkdj-jJHI?si=MBIETyw0Wkj0HqBp'
        },
        {
            character_name: '검성OGC',
            achievement_date: '2025.05.24',
            screenshot_url: '/images/level300/ogc-300.jpg',
            source: 'https://youtu.be/bUpkuiR7sL8?si=xq1yAhzlVX7PF1UG'
        },
        {
            character_name: '헨쇼',
            achievement_date: '2025.05.30'
        },
        {
            character_name: '뎅아인',
            achievement_date: '2025.06.30',
            screenshot_url: '/images/level300/deangain-300.jpg',
            source: 'https://www.inven.co.kr/board/maple/5974/5244829?my=chu&name=subjcont&keyword=%EB%A7%8C%EB%A0%99&sterm=4843429'
        },
        {
            character_name: '갓지훈',
            achievement_date: '2025.07.06'
        },
        {
            character_name: '쀼챠',
            achievement_date: '2025.07.12'
        },
        {
            character_name: '징베',
            achievement_date: '2025.07.23'
        },
        {
            character_name: '아욤',
            achievement_date: '2025.09.11'
        },
        {
            character_name: '중뒹',
            achievement_date: '2025.09.20'
        },
        {
            character_name: '먹음쟁이',
            achievement_date: '2025.09.24'
        },
        {
            character_name: '곰돌이',
            achievement_date: '2025.10.02'
        },
        {
            character_name: '단솜',
            achievement_date: '2025.10.03',
            screenshot_url: '/images/level300/dansom-300.jpg',
            source: 'https://vod.sooplive.co.kr/player/173739563'
        },
        {
            character_name: '김솔밤',
            achievement_date: '2025.10.09'
        },
        {
            character_name: '포쏘는예지니',
            achievement_date: '2025.10.15'
        },
        {
            character_name: '혜넹',
            achievement_date: '2025.10.18'
        },
        {
            character_name: '카사',
            achievement_date: '2025.10.30'
        },
        {
            character_name: 'Lacheln',
            achievement_date: '2025.11.03'
        },
        {
            character_name: '팡이요',
            achievement_date: '2025.11.09'
        },
        {
            character_name: '버프주는메브',
            achievement_date: '2025.11.16'
        },
        {
            character_name: '탱이갓제논',
            achievement_date: '2025.11.20'
        },
        {
            character_name: '케인WWE챔프',
            achievement_date: '2025.12.11'
        },
        {
            character_name: '안녕별잇',
            achievement_date: '2025.12.11'
        },
        {
            character_name: '보룬',
            achievement_date: '2025.12.15'
        },
        {
            character_name: '엑스퍼트',
            achievement_date: '2025.12.15'
        },
        {
            character_name: '인크카',
            achievement_date: '2025.12.17'
        },
        {
            character_name: '최무등',
            achievement_date: '2025.12.21'
        },
        {
            character_name: 'RJ115697',
            achievement_date: '2025.12.28'
        },
        {
            character_name: '모냐',
            achievement_date: '2026.01.01'
        },
        {
            character_name: '이보영',
            achievement_date: '2026.01.08'
        },
        {
            character_name: '손대천',
            achievement_date: '2026.01.11'
        },
        {
            character_name: '몽둥이여사님',
            achievement_date: '2026.01.11'
        },
        {
            character_name: '수정과',
            achievement_date: '2026.01.12'
        },
        {
            character_name: '반토막',
            achievement_date: '2026.01.23',
            screenshot_url: '/images/level300/bantomak-300.jpg',
            source: 'https://www.inven.co.kr/board/maple/5974/6182905?my=chu&name=subjcont&keyword=%EB%A7%8C%EB%A0%99&sterm=3913429'
        }
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // 캐싱된 API 엔드포인트 호출 (서버에서 1시간마다 갱신)
            const response = await fetch('/api/level300');
            const data = await response.json();
            setAllPlayers(data.players || []);
        } catch (err) {
            console.error('랭킹 데이터 로딩 에러:', err);
        } finally {
            setLoading(false);
        }
    };

    const getByClass = () => {
        const classMap = new Map<string, RankingPlayer>();
        allPlayers.forEach(player => {
            const className = player.sub_class_name || player.class_name;
            const existingPlayer = classMap.get(className);

            // 기존 플레이어가 없거나, 현재 플레이어의 레벨/경험치가 더 높으면 교체
            if (!existingPlayer) {
                classMap.set(className, player);
            } else {
                if (player.character_level > existingPlayer.character_level) {
                    classMap.set(className, player);
                } else if (player.character_level === existingPlayer.character_level) {
                    if ((player.character_exp || 0) > (existingPlayer.character_exp || 0)) {
                        classMap.set(className, player);
                    }
                }
            }
        });

        const allClassPlayers = Array.from(classMap.values());
        const beginnerClasses = ['초보자', '노블레스', '시티즌', '초보자-전체 전직', '기사단-노블레스', '레지스탕스-시티즌'];

        const standardClassPlayers = allClassPlayers
            .filter(p => !beginnerClasses.includes(p.sub_class_name || p.class_name))
            .sort((a, b) => {
                if (b.character_level !== a.character_level) {
                    return b.character_level - a.character_level;
                }
                return a.ranking - b.ranking;
            });

        const beginnerClassPlayers = allClassPlayers
            .filter(p => beginnerClasses.includes(p.sub_class_name || p.class_name))
            .sort((a, b) => {
                if (b.character_level !== a.character_level) {
                    return b.character_level - a.character_level;
                }
                return a.ranking - b.ranking;
            });

        return { standardClassPlayers, beginnerClassPlayers };
    };

    const getByWorld = () => {
        const worldMap = new Map<string, RankingPlayer>();
        allPlayers.forEach(player => {
            const existingPlayer = worldMap.get(player.world_name);

            // 기존 플레이어가 없거나, 현재 플레이어의 레벨/경험치가 더 높으면 교체
            if (!existingPlayer) {
                worldMap.set(player.world_name, player);
            } else {
                if (player.character_level > existingPlayer.character_level) {
                    worldMap.set(player.world_name, player);
                } else if (player.character_level === existingPlayer.character_level) {
                    if ((player.character_exp || 0) > (existingPlayer.character_exp || 0)) {
                        worldMap.set(player.world_name, player);
                    }
                }
            }
        });

        // 일반 월드, 리부트 월드, 챌린저스 월드 분리
        const rebootWorlds = ['에오스', '핼리오스'];
        const challengersWorlds = ['챌린저스', '챌린저스2', '챌린저스3', '챌린저스4'];
        const entries = Array.from(worldMap.entries());

        const normalWorlds = entries.filter(([worldName]) =>
            !rebootWorlds.includes(worldName) && !challengersWorlds.includes(worldName)
        );
        const rebootWorldsList = entries.filter(([worldName]) => rebootWorlds.includes(worldName));
        const challengersWorldsList = entries.filter(([worldName]) => challengersWorlds.includes(worldName));

        // 일반 월드 → 리부트 월드 → 챌린저스 월드 순서로 합치기
        return [
            ...normalWorlds.sort((a, b) => a[1].ranking - b[1].ranking),
            ...rebootWorldsList.sort((a, b) => a[1].ranking - b[1].ranking),
            ...challengersWorldsList.sort((a, b) => a[1].ranking - b[1].ranking)
        ];
    };

    if (loading) {
        return (
            <div className="bg-purple-900/20 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500"></div>
                </div>
            </div>
        );
    }

    const { standardClassPlayers, beginnerClassPlayers } = getByClass();
    const worldsByLevel = getByWorld();
    const expansionDate = new Date('2020-12-17');
    const today = new Date();
    const daysPassed = Math.floor((today.getTime() - expansionDate.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div className="space-y-6 sm:space-y-8 mt-6 sm:mt-12 pt-6 sm:pt-12 border-t-2 border-yellow-500/30">
            {/* 헤더 */}
            <div className="text-center">
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2 sm:gap-3">
                    <span>👑</span> Lv.300 만렙 현황
                </h2>
                <div className="inline-block bg-yellow-500/20 backdrop-blur-sm px-4 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl border border-yellow-400/30">
                    <div className="flex items-center gap-2 sm:gap-3 justify-center">
                        <p className="text-xs sm:text-sm text-yellow-200">만렙 확장</p>
                        <span className="text-yellow-400 text-lg sm:text-xl">•</span>
                        <p className="text-xl sm:text-3xl font-bold text-yellow-400">D+{daysPassed}</p>
                    </div>
                    <p className="text-[10px] sm:text-xs text-yellow-200/70 mt-1 sm:mt-2">
                        2020.12.17 ~ {today.toISOString().split('T')[0].replace(/-/g, '.')}
                    </p>
                </div>
                <p className="text-xs sm:text-sm text-purple-300 mt-2 sm:mt-3">⚡ 넥슨 공식 API 데이터 (매일 오전 1시 업데이트)</p>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 rounded-xl p-4 sm:p-6 border border-yellow-500/30 text-center">
                    <p className="text-yellow-300 text-xs sm:text-sm mb-1 sm:mb-2">총 300레벨 달성자</p>
                    <p className="text-yellow-400 text-2xl sm:text-4xl font-bold">{allPlayers.filter(p => p.character_level === 300).length}명</p>
                </div>
                <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-xl p-4 sm:p-6 border border-purple-500/30 text-center">
                    <p className="text-purple-300 text-xs sm:text-sm mb-1 sm:mb-2">300레벨 달성 직업</p>
                    <p className="text-purple-400 text-2xl sm:text-4xl font-bold">{standardClassPlayers.filter(p => p.character_level === 300).length}개</p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-xl p-4 sm:p-6 border border-blue-500/30 text-center">
                    <p className="text-blue-300 text-xs sm:text-sm mb-1 sm:mb-2">300레벨 존재 월드</p>
                    <p className="text-blue-400 text-2xl sm:text-4xl font-bold">{worldsByLevel.filter(([_, p]) => p.character_level === 300).length}개</p>
                </div>
            </div>

            {/* 전체 월드 만렙 달성자 (순위순) */}
            {allPlayers.filter(p => p.character_level === 300).length > 0 && (
                <div className="bg-yellow-900/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-yellow-500/20">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                        <span>🏆</span> 전체 월드 만렙 달성자 (순위순)
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-purple-100 min-w-[500px] sm:min-w-0">
                            <thead>
                                <tr className="bg-yellow-600/20 text-yellow-100">
                                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left font-semibold text-xs sm:text-base whitespace-nowrap">순위</th>
                                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left font-semibold text-xs sm:text-base whitespace-nowrap">닉네임</th>
                                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left font-semibold text-xs sm:text-base whitespace-nowrap">월드</th>
                                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left font-semibold text-xs sm:text-base whitespace-nowrap">직업</th>
                                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-center font-semibold text-xs sm:text-base whitespace-nowrap">레벨</th>
                                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-center font-semibold text-xs sm:text-base whitespace-nowrap">날짜</th>
                                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-center font-semibold text-xs sm:text-base whitespace-nowrap">순간</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(() => {
                                    const maxLevelPlayers = allPlayers
                                        .filter(p => p.character_level === 300)
                                        .sort((a, b) => a.ranking - b.ranking);

                                    const normalWorldPlayers = maxLevelPlayers.filter(p => !['에오스', '핼리오스'].includes(p.world_name));
                                    const rebootWorldPlayers = maxLevelPlayers.filter(p => ['에오스', '핼리오스'].includes(p.world_name));

                                    return (
                                        <>
                                            {/* 일반 월드 */}
                                            {normalWorldPlayers.map((player, index) => {
                                                const achievement = level300Achievements.find(a => a.character_name === player.character_name);
                                                return (
                                                    <tr key={`normal-${index}`} className="border-b border-yellow-700/20 hover:bg-yellow-500/10">
                                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-yellow-300 font-semibold text-xs sm:text-base whitespace-nowrap">
                                                            {player.ranking}위
                                                        </td>
                                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-white text-xs sm:text-base whitespace-nowrap">
                                                            <Link href={`/?name=${player.character_name}`} className="hover:text-yellow-400 hover:underline cursor-pointer">
                                                                {player.character_name}
                                                            </Link>
                                                        </td>
                                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-purple-300 text-xs sm:text-base whitespace-nowrap">{player.world_name}</td>
                                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-purple-200 text-xs sm:text-base whitespace-nowrap">{player.sub_class_name || player.class_name}</td>
                                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-center">
                                                            <span className="font-bold text-xs sm:text-base text-yellow-400">
                                                                {player.character_level}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-center text-xs sm:text-sm text-yellow-200">
                                                            {achievement?.achievement_date || '-'}
                                                        </td>
                                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-center">
                                                            {achievement?.screenshot_url ? (
                                                                <Image
                                                                    src={achievement.screenshot_url}
                                                                    alt={`${player.character_name} 300레벨 달성 순간`}
                                                                    width={60}
                                                                    height={40}
                                                                    className="inline-block rounded cursor-pointer hover:opacity-80 transition-opacity border border-yellow-500/30"
                                                                    onClick={() => setModalAchievement(achievement!)}
                                                                />
                                                            ) : (
                                                                <span className="text-xs text-purple-400">-</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}

                                            {/* 구분선 (리부트 월드가 있을 경우) */}
                                            {rebootWorldPlayers.length > 0 && normalWorldPlayers.length > 0 && (
                                                <tr className="bg-yellow-900/40">
                                                    <td colSpan={7} className="px-3 py-2 sm:px-6 sm:py-3 text-center font-bold text-yellow-200 text-xs sm:text-sm">
                                                        ▼ 에오스/핼리오스
                                                    </td>
                                                </tr>
                                            )}

                                            {/* 리부트 월드 */}
                                            {rebootWorldPlayers.map((player, index) => {
                                                const achievement = level300Achievements.find(a => a.character_name === player.character_name);
                                                return (
                                                    <tr key={`reboot-${index}`} className="border-b border-yellow-700/20 hover:bg-yellow-500/10 bg-purple-900/10">
                                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-purple-300 font-semibold text-xs sm:text-base whitespace-nowrap">
                                                            {player.ranking}위
                                                        </td>
                                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-white text-xs sm:text-base whitespace-nowrap">
                                                            <Link href={`/?name=${player.character_name}`} className="hover:text-yellow-400 hover:underline cursor-pointer">
                                                                {player.character_name}
                                                            </Link>
                                                        </td>
                                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-purple-300 text-xs sm:text-base whitespace-nowrap">{player.world_name}</td>
                                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-purple-200 text-xs sm:text-base whitespace-nowrap">{player.sub_class_name || player.class_name}</td>
                                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-center">
                                                            <span className="font-bold text-xs sm:text-base text-yellow-400">
                                                                {player.character_level}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-center text-xs sm:text-sm text-yellow-200">
                                                            {achievement?.achievement_date || '-'}
                                                        </td>
                                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-center">
                                                            {achievement?.screenshot_url ? (
                                                                <Image
                                                                    src={achievement.screenshot_url}
                                                                    alt={`${player.character_name} 300레벨 달성 순간`}
                                                                    width={60}
                                                                    height={40}
                                                                    className="inline-block rounded cursor-pointer hover:opacity-80 transition-opacity border border-yellow-500/30"
                                                                    onClick={() => setModalAchievement(achievement!)}
                                                                />
                                                            ) : (
                                                                <span className="text-xs text-purple-400">-</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </>
                                    );
                                })()}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 월드별 최고 레벨 */}
            <div className="bg-purple-900/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-purple-500/20">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                    <span>🌍</span> 월드별 최고 레벨
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-purple-100 min-w-[500px] sm:min-w-0">
                        <thead>
                            <tr className="bg-purple-600/30 text-purple-100">
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left font-semibold text-xs sm:text-base whitespace-nowrap">월드</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left font-semibold text-xs sm:text-base whitespace-nowrap">닉네임</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left font-semibold text-xs sm:text-base whitespace-nowrap">직업</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-center font-semibold text-xs sm:text-base whitespace-nowrap">레벨</th>
                            </tr>
                        </thead>
                        <tbody>
                            {worldsByLevel.map(([worldName, player], index) => (
                                <tr key={index} className="border-b border-purple-700/30 hover:bg-purple-500/10">
                                    <td className="px-3 py-2 sm:px-6 sm:py-3 text-purple-300 font-semibold text-xs sm:text-base whitespace-nowrap">{worldName}</td>
                                    <td className="px-3 py-2 sm:px-6 sm:py-3 text-white text-xs sm:text-base whitespace-nowrap">
                                        <Link href={`/?name=${player.character_name}`} className="hover:text-yellow-400 hover:underline cursor-pointer">
                                            {player.character_name}
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2 sm:px-6 sm:py-3 text-purple-200 text-xs sm:text-base whitespace-nowrap">{player.sub_class_name || player.class_name}</td>
                                    <td className="px-3 py-2 sm:px-6 sm:py-3 text-center">
                                        <span className={`font-bold text-xs sm:text-base ${player.character_level === 300 ? 'text-yellow-400' : 'text-blue-400'}`}>
                                            {player.character_level}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 직업별 최고 레벨 */}
            <div className="bg-purple-900/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-purple-500/20">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                    <span>⚔️</span> 직업별 최고 레벨
                    <span className="text-xs sm:text-sm text-purple-300">({standardClassPlayers.length} + {beginnerClassPlayers.length}개 직업)</span>
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-purple-100 min-w-[500px] sm:min-w-0">
                        <thead>
                            <tr className="bg-purple-600/30 text-purple-100">
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left font-semibold text-xs sm:text-base whitespace-nowrap">#</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left font-semibold text-xs sm:text-base whitespace-nowrap">직업</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left font-semibold text-xs sm:text-base whitespace-nowrap">닉네임</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-left font-semibold text-xs sm:text-base whitespace-nowrap">월드</th>
                                <th className="px-3 py-2 sm:px-6 sm:py-3 text-center font-semibold text-xs sm:text-base whitespace-nowrap">레벨</th>
                            </tr>
                        </thead>
                        <tbody>
                            {standardClassPlayers.map((player, index) => (
                                <tr key={index} className={`border-b border-purple-700/30 ${player.character_level === 300 ? 'bg-yellow-500/10' : 'hover:bg-purple-500/10'
                                    }`}>
                                    <td className="px-3 py-2 sm:px-6 sm:py-3 font-semibold text-purple-400 text-xs sm:text-base whitespace-nowrap">{index + 1}</td>
                                    <td className="px-3 py-2 sm:px-6 sm:py-3 font-semibold text-white text-xs sm:text-base whitespace-nowrap">{player.sub_class_name || player.class_name}</td>
                                    <td className="px-3 py-2 sm:px-6 sm:py-3 text-purple-200 text-xs sm:text-base whitespace-nowrap">
                                        <Link href={`/?name=${player.character_name}`} className="hover:text-yellow-400 hover:underline cursor-pointer">
                                            {player.character_name}
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2 sm:px-6 sm:py-3 text-purple-300 text-xs sm:text-base whitespace-nowrap">{player.world_name}</td>
                                    <td className="px-3 py-2 sm:px-6 sm:py-3 text-center">
                                        <span className={`font-bold text-xs sm:text-base ${player.character_level === 300 ? 'text-yellow-400' : 'text-blue-400'}`}>
                                            {player.character_level}
                                        </span>
                                    </td>
                                </tr>
                            ))}

                            {/* 초보자 계열 구분선 */}
                            {beginnerClassPlayers.length > 0 && (
                                <tr className="bg-yellow-900/40">
                                    <td colSpan={5} className="px-3 py-2 sm:px-6 sm:py-3 text-center font-bold text-yellow-200 text-xs sm:text-sm">
                                        ▼ 초보자/노블레스/시티즌
                                    </td>
                                </tr>
                            )}

                            {/* 초보자 계열 */}
                            {beginnerClassPlayers.map((player, index) => (
                                <tr key={`beginner-${index}`} className={`border-b border-purple-700/30 ${player.character_level === 300 ? 'bg-yellow-500/10' : 'hover:bg-purple-500/10'
                                    }`}>
                                    <td className="px-3 py-2 sm:px-6 sm:py-3 font-semibold text-purple-400 text-xs sm:text-base whitespace-nowrap">-</td>
                                    <td className="px-3 py-2 sm:px-6 sm:py-3 font-semibold text-white text-xs sm:text-base whitespace-nowrap">{player.sub_class_name || player.class_name}</td>
                                    <td className="px-3 py-2 sm:px-6 sm:py-3 text-purple-200 text-xs sm:text-base whitespace-nowrap">
                                        <Link href={`/?name=${player.character_name}`} className="hover:text-yellow-400 hover:underline cursor-pointer">
                                            {player.character_name}
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2 sm:px-6 sm:py-3 text-purple-300 text-xs sm:text-base whitespace-nowrap">{player.world_name}</td>
                                    <td className="px-3 py-2 sm:px-6 sm:py-3 text-center">
                                        <span className={`font-bold text-xs sm:text-base ${player.character_level === 300 ? 'text-yellow-400' : 'text-blue-400'}`}>
                                            {player.character_level}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 이미지 모달 */}
            {modalAchievement && modalAchievement.screenshot_url && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-pointer"
                    onClick={() => setModalAchievement(null)}
                >
                    <div className="relative max-w-7xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute top-4 right-4 bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold z-10"
                            onClick={() => setModalAchievement(null)}
                        >
                            ✕ 닫기
                        </button>
                        <Image
                            src={modalAchievement.screenshot_url}
                            alt="300레벨 달성 순간"
                            width={1920}
                            height={1080}
                            unoptimized // Vercel 이미지 최적화 비용 방지
                            className="rounded-lg"
                        />
                        {modalAchievement.source && (
                            <div className="mt-4 p-4 bg-purple-900/50 rounded-lg border border-purple-500/30">
                                <p className="text-sm text-purple-200 mb-2">📺 출처</p>
                                <a
                                    href={modalAchievement.source}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-yellow-400 hover:text-yellow-300 underline break-all text-sm"
                                >
                                    {modalAchievement.source}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
