import { NextRequest, NextResponse } from "next/server";
import {
    getOverallRanking,
    getUnionRanking,
    getGuildRanking,
    getDojangRanking,
    getTheSeedRanking,
    getAchievementRanking,
} from "@/lib/nexon";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");
    const page = parseInt(searchParams.get("page") || "1");
    // 빈 문자열은 undefined로 처리
    const world_name = searchParams.get("world_name") || undefined;
    const world_type = searchParams.get("world_type") || undefined;
    const difficulty = searchParams.get("difficulty")
        ? parseInt(searchParams.get("difficulty")!)
        : undefined;

    // 캐시 설정: 23시간 (82800초) 동안 CDN 캐시 유지
    // 이렇게 설정하면 Vercel Edge Network(CDN)가 응답을 저장해두고,
    // 동일한 요청이 오면 서버(Function)를 실행하지 않고 저장된 응답을 바로 반환합니다. -> 비용 절감 핵심!
    const headers = {
        "Cache-Control": "public, s-maxage=82800, stale-while-revalidate=86400",
        "Content-Type": "application/json",
    };

    try {
        let data;

        switch (type) {
            case "overall":
                data = await getOverallRanking(
                    undefined,
                    world_name,
                    world_type,
                    undefined,
                    undefined,
                    page
                );
                break;
            case "union":
                data = await getUnionRanking(undefined, world_name, undefined, page);
                break;
            case "guild":
                data = await getGuildRanking(undefined, world_name, undefined, page);
                break;
            case "dojang":
                data = await getDojangRanking(
                    undefined,
                    world_name,
                    difficulty,
                    undefined,
                    undefined,
                    page
                );
                break;
            case "theseed":
                data = await getTheSeedRanking(undefined, world_name, undefined, page);
                break;
            case "achievement":
                data = await getAchievementRanking(undefined, undefined, page);
                break;
            default:
                return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        return NextResponse.json(data, { headers });
    } catch (error) {
        console.error("Ranking API Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch ranking" },
            { status: 500 }
        );
    }
}
