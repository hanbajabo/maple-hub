import { NextRequest, NextResponse } from 'next/server';
import { calculateBonusStat, BonusStatCalcInput } from '@/lib/bonus-stat-calculator';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            equipLevel = 200,
            equipType = 'NON_WEAPON',
            isBossDrop = true,
            aimStat = 100,
            weaponGrade,
            statEfficiency = { STR: 1, DEX: 0.1, 'ALL %': 10, ATTACK: 4 }
        } = body;

        const input: BonusStatCalcInput = {
            equipLevel: Number(equipLevel),
            equipType: equipType === 'WEAPON' ? 'WEAPON' : 'NON_WEAPON',
            isBossDrop: Boolean(isBossDrop),
            aimStat: Number(aimStat),
            weaponGrade: weaponGrade && weaponGrade !== 'none' ? Number(weaponGrade) : undefined,
            statEfficiency
        };

        const result = calculateBonusStat(input);
        return NextResponse.json(result);
    } catch (err: any) {
        console.error('Bonus Stat Calculator API Error:', err);
        return NextResponse.json({ error: err.message || '추가옵션 계산 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }
}
