import { NextResponse } from 'next/server';
import { appraiseItemCost } from '../../../lib/item-appraisal';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { item, characterClass } = body;

        if (!item) {
            return NextResponse.json({ error: 'Item data is required' }, { status: 400 });
        }

        const result = await appraiseItemCost(item, characterClass || '초보자');
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Appraisal API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
