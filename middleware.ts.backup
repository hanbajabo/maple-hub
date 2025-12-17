import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ----------------------------------------------------------------------
// DDoS 방어 (Rate Limiting) 설정
// ----------------------------------------------------------------------
// 1분(60초) 동안 한 IP에서 최대 60번의 요청만 허용합니다.
// (1초에 1번 꼴, 일반적인 사용자는 절대 넘을 수 없는 수치입니다.)
const LIMIT_WINDOW = 60 * 1000; // 60초
const MAX_REQUESTS = 300; // 최대 300회 (기존 60회에서 상향 조정)

// 메모리에 IP별 요청 횟수를 저장합니다.
// 주의: Vercel Edge 환경에서는 이 메모리가 완벽하게 공유되지 않을 수 있지만,
// 단일 인스턴스에 대한 집중 공격(DDoS)을 막는 데는 충분히 효과적입니다.
const ipMap = new Map<string, { count: number; expires: number }>();

export function middleware(request: NextRequest) {
    // 1. IP 주소 확인 (Vercel 등 프록시 환경 고려)
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';

    // 2. 현재 시간
    const now = Date.now();

    // 3. 해당 IP의 기록 가져오기
    const data = ipMap.get(ip) || { count: 0, expires: now + LIMIT_WINDOW };

    // 4. 만료된 기록이면 초기화
    if (now > data.expires) {
        data.count = 0;
        data.expires = now + LIMIT_WINDOW;
    }

    // 5. 요청 횟수 증가
    data.count++;
    ipMap.set(ip, data);

    // 6. 제한 초과 시 차단 (429 Too Many Requests)
    if (data.count > MAX_REQUESTS) {
        console.warn(`[DDoS Protection] Blocked IP: ${ip} (Requests: ${data.count})`);
        return new NextResponse(
            JSON.stringify({
                error: 'Too Many Requests',
                message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.'
            }),
            {
                status: 429,
                headers: {
                    'Content-Type': 'application/json',
                    'Retry-After': '60'
                }
            }
        );
    }

    // 7. 통과
    return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
    matcher: [
        // 아래 경로를 제외한 모든 요청에 미들웨어 적용
        // - _next/static (정적 파일)
        // - _next/image (이미지 최적화)
        // - favicon.ico (파비콘)
        // - images (public 폴더 내 이미지)
        '/((?!_next/static|_next/image|favicon.ico|images).*)',
    ],
};
