export const AUTHENTIC_SYMBOL_REGIONS = [
    '세르니움',
    '아르크스',
    '오디움',
    '도원경',
    '아르테리아',
    '카르시온'
] as const;

export type AuthenticSymbolRegion = typeof AUTHENTIC_SYMBOL_REGIONS[number];

// 레벨 1->2 부터 10->11 까지의 강화 비용
export const AUTHENTIC_SYMBOL_COSTS: Record<AuthenticSymbolRegion, number[]> = {
    '세르니움': [
        36500000, 91200000, 160700000, 241900000, 331500000,
        426200000, 522900000, 618200000, 709000000, 792000000
    ],
    '아르크스': [
        41700000, 104800000, 186100000, 282200000, 390000000,
        506100000, 627400000, 750700000, 872600000, 990000000
    ],
    '오디움': [
        46900000, 118500000, 211500000, 322500000, 448500000,
        586000000, 732000000, 883200000, 1036200000, 1188000000
    ],
    '도원경': [
        52200000, 132200000, 236800000, 362800000, 507000000,
        666000000, 836600000, 1015600000, 1199800000, 1386000000
    ],
    '아르테리아': [
        57400000, 145900000, 262200000, 403200000, 565500000,
        745900000, 941200000, 1148100000, 1363500000, 1584000000
    ],
    '카르시온': [
        62600000, 159600000, 287600000, 443500000, 624000000,
        825800000, 1045800000, 1280600000, 1527100000, 1782000000
    ]
};

export function getAuthenticSymbolCost(region: AuthenticSymbolRegion, currentLevel: number): number {
    if (currentLevel < 1 || currentLevel >= 11) return 0;
    const costs = AUTHENTIC_SYMBOL_COSTS[region];
    if (!costs) return 0;
    return costs[currentLevel - 1] || 0;
}
