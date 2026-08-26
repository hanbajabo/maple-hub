import { NextRequest, NextResponse } from 'next/server';
import { analyzeCharacterSpecUp, EquippedItem } from '@/lib/specup-engine';

const API_KEY = process.env.NEXON_API_KEY || '';
const BASE_URL = process.env.NEXON_API_URL || 'https://open.api.nexon.com';

async function nexonFetch(endpoint: string, params: Record<string, string> = {}) {
    const query = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${endpoint}${query ? '?' + query : ''}`;

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'x-nxopen-api-key': API_KEY,
            'Content-Type': 'application/json',
        },
        next: { revalidate: 600 } // 10분 캐시
    });

    if (!res.ok) {
        throw new Error(`Nexon API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');

        if (!name) {
            return NextResponse.json({ error: '캐릭터 닉네임을 입력해주세요.' }, { status: 400 });
        }

        // 1. OCID 조회
        const idData = await nexonFetch('/maplestory/v1/id', { character_name: name });
        if (!idData.ocid) {
            return NextResponse.json({ error: '존재하지 않는 캐릭터이거나 최근 접속 기록이 없습니다.' }, { status: 404 });
        }
        const ocid = idData.ocid;

        // 2. 캐릭터 기본정보, 스탯, 장비, 헥사 병렬 호출
        const [basicData, statData, equipData, hexaData] = await Promise.all([
            nexonFetch('/maplestory/v1/character/basic', { ocid }),
            nexonFetch('/maplestory/v1/character/stat', { ocid }),
            nexonFetch('/maplestory/v1/character/item-equipment', { ocid }),
            nexonFetch('/maplestory/v1/character/hexamatrix', { ocid }).catch(() => ({ character_hexa_core_equipment: [] }))
        ]);

        // 3. 스탯 맵 구성
        const statMap: Record<string, string> = {};
        if (statData.final_stat) {
            statData.final_stat.forEach((s: any) => {
                statMap[s.stat_name] = s.stat_value;
            });
        }

        // 4. 장비 리스트 파싱
        const rawItems = equipData.item_equipment || [];
        const equippedItems: EquippedItem[] = rawItems.map((item: any) => ({
            slot: item.item_equipment_slot,
            name: item.item_name,
            icon: item.item_icon,
            starforce: parseInt(item.starforce || '0', 10),
            baseLevel: item.item_base?.req_level || 150,
            potentialGrade: item.potential_option_grade,
            potential1: item.potential_option_1,
            potential2: item.potential_option_2,
            potential3: item.potential_option_3,
            additionalGrade: item.additional_potential_option_grade,
            additional1: item.additional_potential_option_1,
            additional2: item.additional_potential_option_2,
            additional3: item.additional_potential_option_3,
        }));

        // 5. 스펙업 분석 엔진 실행
        const result = analyzeCharacterSpecUp(basicData, statMap, equippedItems, hexaData.character_hexa_core_equipment || []);

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('SpecUp API error:', error);
        return NextResponse.json({ error: error.message || '서버 내부 오류가 발생했습니다.' }, { status: 500 });
    }
}
