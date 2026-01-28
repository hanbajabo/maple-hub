import { NextResponse } from 'next/server';
import { getOverallRanking } from '@/lib/nexon';

// 23시간 캐시 설정
export const revalidate = 82800;

const TARGET_LEVEL = 285;
const MAX_PAGE_CHECK = 100; // 안전장치: 최대 100페이지까지만 확인 (약 20,000명)

// 딜레이 함수 (API 과부하 방지)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchRankingsRecursively(worldType: string | undefined, worldName: string | undefined) {
    let allPlayers: any[] = [];
    let page = 1;
    let keepFetching = true;

    while (keepFetching && page <= MAX_PAGE_CHECK) {
        try {
            // API 호출
            const data = await getOverallRanking(undefined, worldName, worldType, undefined, undefined, page);

            if (!data?.ranking || data.ranking.length === 0) {
                keepFetching = false;
                break;
            }

            // 285 레벨 이상 필터링
            const validPlayers = data.ranking.filter((p: any) => p.character_level >= TARGET_LEVEL);

            if (validPlayers.length > 0) {
                allPlayers = [...allPlayers, ...validPlayers];
            }

            // 현재 페이지의 마지막 유저 레벨 확인
            const lastPlayer = data.ranking[data.ranking.length - 1];
            if (lastPlayer.character_level < TARGET_LEVEL) {
                keepFetching = false; // 285 미만 나오면 중단
            } else {
                page++; // 다음 페이지
                await delay(100); // 0.1초 딜레이
            }

        } catch (error) {
            console.error(`Error fetching page ${page} for world ${worldName || worldType}:`, error);
            keepFetching = false;
        }
    }

    return allPlayers;
}

export async function GET() {
    try {
        const challengersWorlds = ['챌린저스', '챌린저스2', '챌린저스3', '챌린저스4'];

        // 1. 병렬로 데이터 수집 시작
        const [normalPlayers, rebootPlayers, ...challengersResults] = await Promise.all([
            // 일반 월드 (world_type='0')
            fetchRankingsRecursively('0', undefined),
            // 리부트 월드 (world_type='1')
            fetchRankingsRecursively('1', undefined),
            // 챌린저스 월드들
            ...challengersWorlds.map(worldName => fetchRankingsRecursively(undefined, worldName))
        ]);

        // 2. 데이터 합치기
        const allPlayersList = [
            ...(normalPlayers || []),
            ...(rebootPlayers || []),
            ...challengersResults.flat()
        ];

        // 3. 중복 제거 (혹시 모를 중복 방지)
        const uniquePlayers = Array.from(
            new Map(allPlayersList.map(p => [`${p.sub_class_name || p.class_name}-${p.character_name}`, p])).values()
        );

        // 4. 정렬 (레벨 내림차순 -> 경험치 내림차순)
        uniquePlayers.sort((a: any, b: any) => {
            if (b.character_level !== a.character_level) {
                return b.character_level - a.character_level;
            }
            return (b.character_exp || 0) - (a.character_exp || 0);
        });

        // 5. 랭킹 재부여
        uniquePlayers.forEach((p: any, index: number) => {
            p.ranking = index + 1;
        });

        return NextResponse.json({
            players: uniquePlayers,
            count: uniquePlayers.length,
            timestamp: new Date().toISOString()
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=82800, stale-while-revalidate=86400'
            }
        });

    } catch (error) {
        console.error('Level 285 data fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
