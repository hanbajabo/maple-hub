import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        players: [],
        count: 0,
        timestamp: new Date().toISOString(),
        message: "랭킹 서비스가 일시적으로 비활성화되었습니다."
    }, {
        headers: {
            'Cache-Control': 'no-store'
        }
    });
}
