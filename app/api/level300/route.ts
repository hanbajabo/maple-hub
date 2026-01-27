import { NextResponse } from 'next/server';
import { getOverallRanking } from '@/lib/nexon';

// 메이플스토리 전체 직업 리스트
const ALL_CLASSES = [
    '히어로', '팔라딘', '다크나이트',
    '아크메이지(불,독)', '아크메이지(썬,콜)', '비숍',
    '보우마스터', '신궁', '패스파인더',
    '나이트로드', '섀도어', '듀얼블레이더',
    '바이퍼', '캡틴', '캐논마스터',
    '소울마스터', '플레임위자드', '윈드브레이커', '나이트워커', '스트라이커', '미하일',
    '메르세데스', '에반', '팬텀', '은월', '루미너스', '제논', '데몬슬레이어', '데몬어벤져',
    '블래스터', '배틀메이지', '와일드헌터', '메카닉',
    '카이저', '카인', '카데나', '엔젤릭버스터',
    '아델', '일리움', '아크', '라라', '호영',
    '제로', '키네시스', '칼리', '아란', '렌',
    '초보자-전체 전직', '기사단-노블레스', '레지스탕스-시티즌'
];

export async function GET() {
    try {
        const challengersWorlds = ['챌린저스', '챌린저스2', '챌린저스3', '챌린저스4'];

        // 동시성 제어를 위한 청크 함수
        const chunk = <T>(arr: T[], size: number): T[][] =>
            Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
                arr.slice(i * size, i * size + size)
            );

        // 1. 직업별 상위 랭커 조회 (일반/리부트/챌린저스)
        // 모든 조합 생성
        const combinations = ALL_CLASSES.flatMap(className => [
            { type: 'normal', className, world_type: '0', world_name: undefined },
            { type: 'reboot', className, world_type: '1', world_name: undefined },
            ...challengersWorlds.map(world => ({ type: 'challengers', className, world_type: undefined, world_name: world }))
        ]);

        const validClassPlayers = [];

        // 10개씩 끊어서 요청 (Rate Limit 방지)
        const batches = chunk(combinations, 10);

        for (const batch of batches) {
            const batchResults = await Promise.all(
                batch.map(async (item) => {
                    try {
                        const res = await getOverallRanking(
                            undefined,          // date
                            item.world_name,    // world_name
                            item.world_type,    // world_type
                            item.className,     // class
                            undefined,          // ocid
                            1                   // page
                        );
                        return res?.ranking?.[0] || null;
                    } catch (e) {
                        return null;
                    }
                })
            );
            validClassPlayers.push(...batchResults.filter(p => p !== null));

            // 배포 환경 배려: 배치 사이 짧은 지연
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // 2. 전체 랭킹 상위권 조회 (일반/리부트/챌린저스)
        const topPagesRequests = [
            // 일반 월드 상위 3페이지
            ...[1, 2, 3].map(page => ({ world_type: '0', world_name: undefined, page })),
            // 리부트 월드 상위 3페이지
            ...[1, 2, 3].map(page => ({ world_type: '1', world_name: undefined, page })),
            // 챌린저스 월드들 각각 3페이지
            ...challengersWorlds.flatMap(worldName =>
                [1, 2, 3].map(page => ({ world_type: undefined, world_name: worldName, page }))
            )
        ];

        let topPlayers: any[] = [];

        // 5개씩 끊어서 요청
        const topBatches = chunk(topPagesRequests, 5);

        for (const batch of topBatches) {
            const batchResults = await Promise.all(
                batch.map(async (req) => {
                    try {
                        const res = await getOverallRanking(
                            undefined,
                            req.world_name,
                            req.world_type,
                            undefined,
                            undefined,
                            req.page
                        );
                        return res?.ranking || [];
                    } catch (e) {
                        return [];
                    }
                })
            );
            topPlayers.push(...batchResults.flat());
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // 3. 합치고 중복 제거
        const allPlayersList = [...validClassPlayers, ...topPlayers];
        const uniquePlayers: any[] = Array.from(
            new Map(allPlayersList.map(p => [`${p.sub_class_name || p.class_name}-${p.character_name}`, p])).values()
        );

        // 4. 레벨/경험치 정렬
        uniquePlayers.sort((a, b) => {
            if ((b.character_level || 0) !== (a.character_level || 0)) {
                return (b.character_level || 0) - (a.character_level || 0);
            }
            return (a.ranking || 0) - (b.ranking || 0);
        });

        // 5. 300레벨 필터링 (선택사항, 데이터 양을 줄이려면 사용)
        // const level300Players = uniquePlayers.filter(p => p.character_level === 300);

        return NextResponse.json({
            players: uniquePlayers,
            timestamp: new Date().toISOString()
        }, {
            headers: {
                // 23시간 동안 캐시 (CDN 캐시)
                'Cache-Control': 'public, s-maxage=82800, stale-while-revalidate=86400'
            }
        });
    } catch (error) {
        console.error('Level 300 data fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
