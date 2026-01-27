import { NextResponse } from 'next/server';
import {
    getOcid,
    getOverallRanking,
    getUnionRanking,
    getGuildRanking,
    getDojangRanking,
    getTheSeedRanking,
    getAchievementRanking
} from '@/lib/nexon';

// API Route 자체 캐시 설정 (하지만 동적 파라미터searchParams를 쓰므로 헤더로 제어)
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const nickname = searchParams.get('nickname');
    const type = searchParams.get('type') || 'overall';
    const worldName = searchParams.get('world_name');

    if (!nickname) {
        return NextResponse.json({ error: '닉네임을 입력해주세요.' }, { status: 400 });
    }

    try {
        // 1. OCID 조회
        const ocid = await getOcid(nickname);
        if (!ocid) {
            return NextResponse.json({ error: '존재하지 않는 캐릭터입니다.' }, { status: 404 });
        }

        // 2. 랭킹 조회
        let rankingData = null;

        switch (type) {
            case 'overall':
                rankingData = await getOverallRanking(undefined, worldName || undefined, undefined, undefined, ocid);
                break;
            case 'union':
                rankingData = await getUnionRanking(undefined, worldName || undefined, ocid);
                break;
            case 'guild':
                return NextResponse.json({ error: '길드 랭킹은 캐릭터 검색을 지원하지 않습니다.' }, { status: 400 });
            case 'dojang':
                // 무릉도장: 통달(1) 기준 검색
                rankingData = await getDojangRanking(undefined, worldName || undefined, 1, undefined, ocid);
                break;
            case 'theseed':
                rankingData = await getTheSeedRanking(undefined, worldName || undefined, ocid);
                break;
            case 'achievement':
                rankingData = await getAchievementRanking(undefined, ocid);
                break;
            default:
                rankingData = await getOverallRanking(undefined, worldName || undefined, undefined, undefined, ocid);
        }

        if (!rankingData || !rankingData.ranking || rankingData.ranking.length === 0) {
            return NextResponse.json({ error: '랭킹 정보가 존재하지 않습니다. (순위권 밖이거나 데이터가 갱신되지 않았습니다.)' }, { status: 404 });
        }

        // 3. 응답 반환 (캐시 헤더 추가)
        // 23시간(82800초) 동안 CDN 캐시 적용 (넥슨 데이터 갱신 주기와 맞춤)
        return NextResponse.json(rankingData.ranking[0], {
            headers: {
                'Cache-Control': 'public, s-maxage=82800, stale-while-revalidate=86400'
            }
        });

    } catch (error) {
        console.error('Search Error:', error);
        return NextResponse.json({ error: '검색 중 오류가 발생했습니다.' }, { status: 500 });
    }
}
