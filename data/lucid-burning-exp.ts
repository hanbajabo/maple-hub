
// 체인지 버닝: 루시드 이벤트 경험치 데이터 (LV.260~295)
// 이벤트 기간: 2026년 3월 19일 ~ 6월 17일 (총 13주)
// 참여 조건: 200레벨 이상 + 아케인포스 퀘스트 완료
//
// [구조 설명]
// weeklyHunting : 주간 사냥 최대치 (드림이터 25,000 + 악몽의 끄나풀 4,000 + 악몽의 근원 20회)
// weeklyMission : 주간 미션 올클리어 시 획득 경험치 (매주 목요일 초기화)
// seasonMission : 시즌 미션 올클리어 시 획득 경험치 (이벤트 기간 1회)
// total13Weeks  : 13주 사냥 누적 + 13주 주간미션 + 시즌미션 (최대치 올클리어 기준)
//
// [참고]
// 악몽의 끄나풀은 드림 이터 1,250마리 처치 후 침식 발동 시 등장 (마리당 2.6배 EXP)
// 악몽의 근원은 침식 1회당 1마리 등장 (드림이터의 30배 EXP)
// 주당 사냥 소요 시간: 약 1시간 40분 ~ 2시간 (드림이터 기준)

export interface LucidBurningEntry {
    level: number;
    weeklyHunting: number;   // 주간 사냥 총합 (1주)
    weeklyMission: number;   // 주간 미션 올클리어 (1주)
    seasonMission: number;   // 시즌 미션 올클리어 (1회)
    total13Weeks: number;    // 13주 전체 합산 (사냥+미션) 최종 합계
}

export const LUCID_BURNING_EXP: LucidBurningEntry[] = [
    // ─── LV.260~264 구간 (세르니움) ───────────────────────────────────────────
    { level: 260, weeklyHunting:   931_749_300_000, weeklyMission:  2_174_079_600_000, seasonMission:  7_764_570_000_000, total13Weeks:  48_140_345_700_000 },
    { level: 261, weeklyHunting:   936_823_680_000, weeklyMission:  2_185_915_200_000, seasonMission:  7_806_840_000_000, total13Weeks:  48_402_445_440_000 },
    { level: 262, weeklyHunting:   941_948_782_400, weeklyMission:  2_197_876_800_000, seasonMission:  7_849_560_000_000, total13Weeks:  48_667_292_571_200 },
    { level: 263, weeklyHunting:   947_125_151_200, weeklyMission:  2_209_956_000_000, seasonMission:  7_892_700_000_000, total13Weeks:  48_934_754_965_600 },
    { level: 264, weeklyHunting:   952_353_284_800, weeklyMission:  2_222_152_800_000, seasonMission:  7_936_260_000_000, total13Weeks:  49_204_839_102_400 },

    // ─── LV.265~269 구간 (호텔 아르크스) ────────────────────────────────────
    { level: 265, weeklyHunting: 1_110_765_960_000, weeklyMission:  2_591_786_400_000, seasonMission:  9_256_380_000_000, total13Weeks:  57_389_560_680_000 },
    { level: 266, weeklyHunting: 1_112_201_351_200, weeklyMission:  2_595_129_600_000, seasonMission:  9_268_320_000_000, total13Weeks:  57_463_622_365_600 },
    { level: 267, weeklyHunting: 1_113_651_142_400, weeklyMission:  2_598_514_800_000, seasonMission:  9_280_410_000_000, total13Weeks:  57_538_567_251_200 },
    { level: 268, weeklyHunting: 1_115_115_404_800, weeklyMission:  2_601_933_600_000, seasonMission:  9_292_620_000_000, total13Weeks:  57_614_257_062_400 },
    { level: 269, weeklyHunting: 1_116_594_322_400, weeklyMission:  2_605_386_000_000, seasonMission:  9_304_950_000_000, total13Weeks:  57_690_694_191_200 },

    // ─── LV.270~274 구간 (오디움) ────────────────────────────────────────────
    { level: 270, weeklyHunting: 1_298_826_000_000, weeklyMission:  3_030_594_000_000, seasonMission: 10_823_550_000_000, total13Weeks:  67_106_010_000_000 },
    { level: 271, weeklyHunting: 1_301_042_482_400, weeklyMission:  3_035_760_000_000, seasonMission: 10_842_000_000_000, total13Weeks:  67_220_432_271_200 },
    { level: 272, weeklyHunting: 1_303_281_180_000, weeklyMission:  3_040_984_800_000, seasonMission: 10_860_660_000_000, total13Weeks:  67_336_117_740_000 },
    { level: 273, weeklyHunting: 1_305_542_231_200, weeklyMission:  3_046_260_000_000, seasonMission: 10_879_500_000_000, total13Weeks:  67_452_929_005_600 },
    { level: 274, weeklyHunting: 1_307_825_891_200, weeklyMission:  3_051_585_600_000, seasonMission: 10_898_520_000_000, total13Weeks:  67_570_869_385_600 },

    // ─── LV.275~279 구간 (도원경) ────────────────────────────────────────────
    { level: 275, weeklyHunting: 1_543_089_600_000, weeklyMission:  3_600_542_400_000, seasonMission: 12_859_080_000_000, total13Weeks:  79_726_296_000_000 },
    { level: 276, weeklyHunting: 1_559_047_064_800, weeklyMission:  3_637_771_200_000, seasonMission: 12_992_040_000_000, total13Weeks:  80_550_677_442_400 },
    { level: 277, weeklyHunting: 1_576_600_304_800, weeklyMission:  3_678_729_600_000, seasonMission: 13_138_320_000_000, total13Weeks:  81_457_608_762_400 },
    { level: 278, weeklyHunting: 1_595_908_833_600, weeklyMission:  3_723_787_200_000, seasonMission: 13_299_240_000_000, total13Weeks:  82_455_288_436_800 },
    { level: 279, weeklyHunting: 1_617_148_260_000, weeklyMission:  3_773_338_800_000, seasonMission: 13_476_210_000_000, total13Weeks:  83_552_541_780_000 },

    // ─── LV.280~284 구간 (아르테리아) ────────────────────────────────────────
    { level: 280, weeklyHunting: 1_855_454_400_000, weeklyMission:  4_329_393_600_000, seasonMission: 15_462_120_000_000, total13Weeks:  95_865_144_000_000 },
    { level: 281, weeklyHunting: 1_883_273_073_600, weeklyMission:  4_394_300_400_000, seasonMission: 15_693_930_000_000, total13Weeks:  97_302_385_156_800 },
    { level: 282, weeklyHunting: 1_913_873_613_600, weeklyMission:  4_465_700_400_000, seasonMission: 15_948_930_000_000, total13Weeks:  98_883_392_176_800 },
    { level: 283, weeklyHunting: 1_947_534_191_200, weeklyMission:  4_544_240_400_000, seasonMission: 16_229_430_000_000, total13Weeks: 100_622_499_685_600 },
    { level: 284, weeklyHunting: 1_984_560_840_000, weeklyMission:  4_630_634_400_000, seasonMission: 16_537_980_000_000, total13Weeks: 102_535_518_120_000 },

    // ─── LV.285~289 구간 (카르시온) ──────────────────────────────────────────
    { level: 285, weeklyHunting: 2_399_999_973_600, weeklyMission:  5_599_994_400_000, seasonMission: 19_999_980_000_000, total13Weeks: 123_999_906_856_800 },
    { level: 286, weeklyHunting: 2_441_359_511_200, weeklyMission:  5_696_502_000_000, seasonMission: 20_344_650_000_000, total13Weeks: 126_136_849_645_600 },
    { level: 287, weeklyHunting: 2_486_855_013_600, weeklyMission:  5_802_661_200_000, seasonMission: 20_723_790_000_000, total13Weeks: 128_487_500_776_800 },
    { level: 288, weeklyHunting: 2_536_900_053_600, weeklyMission:  5_919_429_600_000, seasonMission: 21_140_820_000_000, total13Weeks: 131_073_105_496_800 },
    { level: 289, weeklyHunting: 2_591_949_633_600, weeklyMission:  6_047_882_400_000, seasonMission: 21_599_580_000_000, total13Weeks: 133_917_396_436_800 },

    // ─── LV.290~295 구간 (탈라하트) ──────────────────────────────────────────
    { level: 290, weeklyHunting: 3_209_605_740_000, weeklyMission:  7_489_078_800_000, seasonMission: 26_746_710_000_000, total13Weeks: 165_829_609_020_000 },
    { level: 291, weeklyHunting: 3_238_678_511_200, weeklyMission:  7_556_908_800_000, seasonMission: 26_988_960_000_000, total13Weeks: 167_331_595_045_600 },
    { level: 292, weeklyHunting: 3_270_658_571_200, weeklyMission:  7_631_534_400_000, seasonMission: 27_255_480_000_000, total13Weeks: 168_983_988_625_600 },
    { level: 293, weeklyHunting: 3_305_836_653_600, weeklyMission:  7_713_610_800_000, seasonMission: 27_548_610_000_000, total13Weeks: 170_801_426_896_800 },
    { level: 294, weeklyHunting: 3_344_532_551_200, weeklyMission:  7_803_902_400_000, seasonMission: 27_871_080_000_000, total13Weeks: 172_800_734_365_600 },
    { level: 295, weeklyHunting: 3_778_700_400_000, weeklyMission:  8_816_967_600_000, seasonMission: 31_489_170_000_000, total13Weeks: 195_232_854_000_000 },
];

// 현재 레벨에 맞는 루시드 버닝 데이터 가져오기
// 레벨이 정확히 일치하는 값 우선, 없으면 null 반환
export const getLucidBurningExp = (level: number): LucidBurningEntry | null => {
    if (level < 260 || level > 295) return null;
    return LUCID_BURNING_EXP.find(d => d.level === level) ?? null;
};

// 13주 이벤트 기간 중 선택한 소스(사냥/주간미션/시즌미션)에 따른 총 경험치 계산
export const calcLucidBurningTotal = (
    entry: LucidBurningEntry,
    includeHunting: boolean,
    includeWeeklyMission: boolean,
    includeSeasonMission: boolean,
    totalWeeks: number = 13
): number => {
    let total = 0;
    if (includeHunting)       total += entry.weeklyHunting * totalWeeks;
    if (includeWeeklyMission) total += entry.weeklyMission * totalWeeks;
    if (includeSeasonMission) total += entry.seasonMission;
    return total;
};
