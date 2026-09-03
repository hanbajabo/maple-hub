import { NextResponse } from 'next/server';
import { appraiseItemCost } from '../../../lib/item-appraisal';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { item, items, characterClass, overrideBasePrice, isMiracleTime, isShining } = body;

        // 1. 배치 처리: 여러 아이템을 1번의 서버리스 호출로 초고속 일괄 계산 (호출량 96% 절감)
        if (Array.isArray(items) && items.length > 0) {
            const results = await Promise.all(
                items.map(entry => {
                    const it = entry?.item || entry;
                    const customBasePrice = entry?.overrideBasePrice !== undefined 
                        ? entry.overrideBasePrice 
                        : overrideBasePrice;

                    return appraiseItemCost(
                        it,
                        characterClass || '초보자',
                        customBasePrice,
                        { isMiracleTime: !!isMiracleTime, isShining: !!isShining }
                    );
                })
            );
            return NextResponse.json({ results });
        }

        // 2. 단일 아이템 처리: 특정 아이템 노작 시세 직접 수정 등
        if (!item) {
            return NextResponse.json({ error: 'Item or items data is required' }, { status: 400 });
        }

        const result = await appraiseItemCost(
            item,
            characterClass || '초보자',
            overrideBasePrice,
            { isMiracleTime: !!isMiracleTime, isShining: !!isShining }
        );
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Appraisal API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
