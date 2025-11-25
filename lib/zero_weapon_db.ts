// 제로 무기(라즐리/라피스) 추가옵션 데이터
// 이미지 출처: 유저 제공 데이터

export interface ZeroWeaponStat {
    level: number;
    base_att: number; // 기본 공격력
    tier1: number;    // 1추 공격력 증가량
    tier2: number;    // 2추 공격력 증가량
    tier3: number;    // 3추 공격력 증가량
}

export const ZERO_WEAPON_DB: Record<string, ZeroWeaponStat> = {
    // 라즐리 (알파 - 태도)
    '라즐리 1형': { level: 100, base_att: 100, tier1: 23, tier2: 17, tier3: 12 },
    '라즐리 2형': { level: 110, base_att: 103, tier1: 23, tier2: 17, tier3: 12 },
    '라즐리 3형': { level: 120, base_att: 105, tier1: 32, tier2: 23, tier3: 16 },
    '라즐리 4형': { level: 130, base_att: 112, tier1: 34, tier2: 25, tier3: 17 },
    '라즐리 5형': { level: 140, base_att: 117, tier1: 36, tier2: 26, tier3: 18 },
    '라즐리 6형': { level: 150, base_att: 135, tier1: 41, tier2: 30, tier3: 21 },
    '라즐리 7형': { level: 170, base_att: 169, tier1: 64, tier2: 47, tier3: 32 },
    '라즐리 8형': { level: 180, base_att: 203, tier1: 76, tier2: 56, tier3: 38 },
    '라즐리 9형': { level: 200, base_att: 293, tier1: 131, tier2: 95, tier3: 65 },
    '제네시스 라즐리': { level: 200, base_att: 342, tier1: 151, tier2: 110, tier3: 75 },

    // 라피스 (베타 - 대검) - 라즐리와 동일한 스펙을 가짐
    '라피스 1형': { level: 100, base_att: 100, tier1: 23, tier2: 17, tier3: 12 },
    '라피스 2형': { level: 110, base_att: 103, tier1: 23, tier2: 17, tier3: 12 },
    '라피스 3형': { level: 120, base_att: 105, tier1: 32, tier2: 23, tier3: 16 },
    '라피스 4형': { level: 130, base_att: 112, tier1: 34, tier2: 25, tier3: 17 },
    '라피스 5형': { level: 140, base_att: 117, tier1: 36, tier2: 26, tier3: 18 },
    '라피스 6형': { level: 150, base_att: 135, tier1: 41, tier2: 30, tier3: 21 },
    '라피스 7형': { level: 170, base_att: 169, tier1: 64, tier2: 47, tier3: 32 },
    '라피스 8형': { level: 180, base_att: 203, tier1: 76, tier2: 56, tier3: 38 },
    '라피스 9형': { level: 200, base_att: 293, tier1: 131, tier2: 95, tier3: 65 },
    '제네시스 라피스': { level: 200, base_att: 342, tier1: 151, tier2: 110, tier3: 75 },
};

export function getZeroWeaponTier(itemName: string, addAtt: number): number {
    const stat = ZERO_WEAPON_DB[itemName];
    if (!stat) return 0;

    if (addAtt >= stat.tier1) return 1;
    if (addAtt >= stat.tier2) return 2;
    if (addAtt >= stat.tier3) return 3;

    return 4; // 4추 이하
}
