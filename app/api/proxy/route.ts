import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get('url');
    if (!url) return new NextResponse('Missing URL', { status: 400 });

    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const headers = new Headers();
        headers.set('Content-Type', response.headers.get('Content-Type') || 'image/png');
        headers.set('Access-Control-Allow-Origin', '*');
        // 캐시 시간 대폭 증가: 7일 + 1일 stale-while-revalidate
        headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
        return new NextResponse(blob, { headers });
    } catch (error) {
        console.error('Proxy error:', error);
        return new NextResponse('Failed to fetch image', { status: 500 });
    }
}
