// 퍼스널 버닝 성장 미션 실측 데이터 (제보 기반)
// stage: 단계 번호 (1~30), level: 해당 레벨, percent: 레벨 내 %, reward: 보상 경험치 %

export interface PersonalBurningStageData {
    stage: number;
    level: number;
    percent: number;
    reward: number;
}

export interface PersonalBurningPreset {
    startLevel: number;
    startPercent: number;
    stages: PersonalBurningStageData[];
}

// ─── 실측 프리셋 목록 ─────────────────────────────────────────────────────────
// 추후 제보 데이터가 추가되면 이 배열에 새 프리셋을 push하면 자동으로 계산기에 반영됩니다.
export const PERSONAL_BURNING_PRESETS: PersonalBurningPreset[] = [
    {
        // 285레벨 69.303% 시작 (제보 데이터)
        startLevel: 285,
        startPercent: 69.303,
        stages: [
            { stage: 1,  level: 285, percent: 80.628, reward: 2.053 },
            { stage: 2,  level: 285, percent: 91.953, reward: 2.053 },
            { stage: 3,  level: 286, percent: 3.012,  reward: 1.888 },
            { stage: 4,  level: 286, percent: 13.421, reward: 1.888 },
            { stage: 5,  level: 286, percent: 23.830, reward: 1.888 },
            { stage: 6,  level: 286, percent: 34.239, reward: 1.888 },
            { stage: 7,  level: 286, percent: 44.648, reward: 1.888 },
            { stage: 8,  level: 286, percent: 55.057, reward: 1.888 },
            { stage: 9,  level: 286, percent: 65.466, reward: 1.888 },
            { stage: 10, level: 286, percent: 75.875, reward: 1.888 },
            { stage: 11, level: 286, percent: 86.284, reward: 1.888 },
            { stage: 12, level: 286, percent: 96.693, reward: 1.888 },
            { stage: 13, level: 287, percent: 6.536,  reward: 1.739 },
            { stage: 14, level: 287, percent: 16.116, reward: 1.739 },
            { stage: 15, level: 287, percent: 25.696, reward: 1.739 },
            { stage: 16, level: 287, percent: 35.276, reward: 1.739 },
            { stage: 17, level: 287, percent: 44.855, reward: 1.739 },
            { stage: 18, level: 287, percent: 54.435, reward: 1.739 },
            { stage: 19, level: 287, percent: 64.014, reward: 1.739 },
            { stage: 20, level: 287, percent: 73.594, reward: 1.739 },
            { stage: 21, level: 287, percent: 83.174, reward: 1.739 },
            { stage: 22, level: 287, percent: 92.753, reward: 1.739 },
            { stage: 23, level: 288, percent: 2.147,  reward: 1.601 },
            { stage: 24, level: 288, percent: 10.962, reward: 1.601 },
            { stage: 25, level: 288, percent: 19.778, reward: 1.601 },
            { stage: 26, level: 288, percent: 28.594, reward: 1.601 },
            { stage: 27, level: 288, percent: 37.409, reward: 1.601 },
            { stage: 28, level: 288, percent: 46.225, reward: 1.601 },
            { stage: 29, level: 288, percent: 55.040, reward: 1.601 },
            { stage: 30, level: 288, percent: 63.856, reward: 1.601 },
        ]
    },
    {
        // 286레벨 26.617% 시작 (제보 데이터)
        // 1~2단계는 시작 위치 아래라 자동 클리어, 3~30단계 실측
        startLevel: 286,
        startPercent: 26.617,
        stages: [
            // ★ 시작 전 자동 클리어 (시작 위치 26.617%보다 낮음)
            { stage: 1,  level: 286, percent: 10.472, reward: 1.888 },
            { stage: 2,  level: 286, percent: 20.881, reward: 1.888 },
            // ✅ 실측 데이터
            { stage: 3,  level: 286, percent: 31.290, reward: 1.888 },
            { stage: 4,  level: 286, percent: 41.699, reward: 1.888 },
            { stage: 5,  level: 286, percent: 52.108, reward: 1.888 },
            { stage: 6,  level: 286, percent: 62.517, reward: 1.888 },
            { stage: 7,  level: 286, percent: 72.926, reward: 1.888 },
            { stage: 8,  level: 286, percent: 83.335, reward: 1.888 },
            { stage: 9,  level: 286, percent: 93.744, reward: 1.888 },
            { stage: 10, level: 287, percent: 3.822,  reward: 1.739 },
            { stage: 11, level: 287, percent: 13.402, reward: 1.739 },
            { stage: 12, level: 287, percent: 22.981, reward: 1.739 },
            { stage: 13, level: 287, percent: 32.561, reward: 1.739 },
            { stage: 14, level: 287, percent: 42.141, reward: 1.739 },
            { stage: 15, level: 287, percent: 51.720, reward: 1.739 },
            { stage: 16, level: 287, percent: 61.300, reward: 1.739 },
            { stage: 17, level: 287, percent: 70.880, reward: 1.739 },
            { stage: 18, level: 287, percent: 80.459, reward: 1.739 },
            { stage: 19, level: 287, percent: 90.039, reward: 1.739 },
            { stage: 20, level: 287, percent: 99.618, reward: 1.756 },
            { stage: 21, level: 288, percent: 8.464,  reward: 1.601 },
            { stage: 22, level: 288, percent: 17.280, reward: 1.601 },
            { stage: 23, level: 288, percent: 26.096, reward: 1.601 },
            { stage: 24, level: 288, percent: 34.911, reward: 1.601 },
            { stage: 25, level: 288, percent: 43.727, reward: 1.601 },
            { stage: 26, level: 288, percent: 52.542, reward: 1.601 },
            { stage: 27, level: 288, percent: 61.358, reward: 1.601 },
            { stage: 28, level: 288, percent: 70.174, reward: 1.601 },
            { stage: 29, level: 288, percent: 78.989, reward: 1.601 },
            { stage: 30, level: 288, percent: 87.805, reward: 1.601 },
        ]
    },
    {
        // 288레벨 72.212% 시작 (제보 데이터)
        // 1단계는 시작 시 자동 완료 (시작 위치 이하), 2~30단계 실측
        startLevel: 288,
        startPercent: 72.212,
        stages: [
            // ★ 시작 전 자동 클리어 (역산 시 72.212% 이하로 추정됨)
            { stage: 1,  level: 288, percent: 72.212, reward: 1.601 },
            // ✅ 실측 데이터
            { stage: 2,  level: 288, percent: 81.028, reward: 1.601 },
            { stage: 3,  level: 288, percent: 89.844, reward: 1.601 },
            { stage: 4,  level: 288, percent: 98.659, reward: 1.604 },
            { stage: 5,  level: 289, percent: 6.869,  reward: 1.472 },
            { stage: 6,  level: 289, percent: 14.970, reward: 1.472 },
            { stage: 7,  level: 289, percent: 23.071, reward: 1.472 },
            { stage: 8,  level: 289, percent: 31.172, reward: 1.472 },
            { stage: 9,  level: 289, percent: 39.272, reward: 1.472 },
            { stage: 10, level: 289, percent: 47.373, reward: 1.472 },
            { stage: 11, level: 289, percent: 55.474, reward: 1.472 },
            { stage: 12, level: 289, percent: 63.575, reward: 1.472 },
            { stage: 13, level: 289, percent: 71.676, reward: 1.472 },
            { stage: 14, level: 289, percent: 79.777, reward: 1.472 },
            { stage: 15, level: 289, percent: 87.878, reward: 1.472 },
            { stage: 16, level: 289, percent: 95.979, reward: 1.472 },
            { stage: 17, level: 290, percent: 2.520,  reward: 0.819 },
            { stage: 18, level: 290, percent: 7.525,  reward: 0.819 },
            { stage: 19, level: 290, percent: 12.529, reward: 0.819 },
            { stage: 20, level: 290, percent: 17.534, reward: 0.819 },
            { stage: 21, level: 290, percent: 22.538, reward: 0.819 },
            { stage: 22, level: 290, percent: 27.543, reward: 0.819 },
            { stage: 23, level: 290, percent: 32.547, reward: 0.819 },
            { stage: 24, level: 290, percent: 37.552, reward: 0.819 },
            { stage: 25, level: 290, percent: 42.556, reward: 0.819 },
            { stage: 26, level: 290, percent: 47.561, reward: 0.819 },
            { stage: 27, level: 290, percent: 52.565, reward: 0.819 },
            { stage: 28, level: 290, percent: 57.570, reward: 0.819 },
            { stage: 29, level: 290, percent: 62.574, reward: 0.819 },
            { stage: 30, level: 290, percent: 67.579, reward: 0.819 },
        ]
    },
    {
        // 290레벨 85.386% 시작 (제보 데이터)
        // 6~30단계 실측, 1~5단계는 역산 추정값
        startLevel: 290,
        startPercent: 85.386,
        stages: [
            // ★ 추정값 (이미 클리어하여 확인 불가, 스텝 4.596% × req291/req290 역산)
            { stage: 1,  level: 290, percent: 87.800, reward: 0.819 },
            { stage: 2,  level: 290, percent: 91.978, reward: 0.819 },
            { stage: 3,  level: 290, percent: 96.156, reward: 0.819 },
            { stage: 4,  level: 291, percent: 0.368,  reward: 0.753 },
            { stage: 5,  level: 291, percent: 4.964,  reward: 0.753 },
            // ✅ 실측 데이터
            { stage: 6,  level: 291, percent: 9.560,  reward: 0.753 },
            { stage: 7,  level: 291, percent: 14.156, reward: 0.753 },
            { stage: 8,  level: 291, percent: 18.752, reward: 0.753 },
            { stage: 9,  level: 291, percent: 23.349, reward: 0.753 },
            { stage: 10, level: 291, percent: 27.945, reward: 0.753 },
            { stage: 11, level: 291, percent: 32.541, reward: 0.753 },
            { stage: 12, level: 291, percent: 37.138, reward: 0.753 },
            { stage: 13, level: 291, percent: 41.734, reward: 0.753 },
            { stage: 14, level: 291, percent: 46.330, reward: 0.753 },
            { stage: 15, level: 291, percent: 50.927, reward: 0.753 },
            { stage: 16, level: 291, percent: 55.523, reward: 0.753 },
            { stage: 17, level: 291, percent: 60.119, reward: 0.753 },
            { stage: 18, level: 291, percent: 64.715, reward: 0.753 },
            { stage: 19, level: 291, percent: 69.312, reward: 0.753 },
            { stage: 20, level: 291, percent: 73.908, reward: 0.753 },
            { stage: 21, level: 291, percent: 78.504, reward: 0.753 },
            { stage: 22, level: 291, percent: 83.101, reward: 0.753 },
            { stage: 23, level: 291, percent: 87.697, reward: 0.753 },
            { stage: 24, level: 291, percent: 92.293, reward: 0.753 },
            { stage: 25, level: 291, percent: 96.890, reward: 0.753 },
            { stage: 26, level: 292, percent: 1.367,  reward: 0.693 },
            { stage: 27, level: 292, percent: 5.593,  reward: 0.693 },
            { stage: 28, level: 292, percent: 9.820,  reward: 0.693 },
            { stage: 29, level: 292, percent: 14.047, reward: 0.693 },
            { stage: 30, level: 292, percent: 18.273, reward: 0.693 },
        ]
    },
    {
        // 292레벨 15.327% 시작 (제보 데이터)
        // 3~30단계 실측, 1~2단계는 역산 추정값 (이미 시작 전에 클리어)
        startLevel: 292,
        startPercent: 15.327,
        stages: [
            // ★ 추정값 (시작 위치 아래에 있어 이벤트 시작 시 자동 클리어)
            { stage: 1,  level: 292, percent: 8.878,  reward: 0.693 },
            { stage: 2,  level: 292, percent: 13.105, reward: 0.693 },
            // ✅ 실측 데이터
            { stage: 3,  level: 292, percent: 17.332, reward: 0.693 },
            { stage: 4,  level: 292, percent: 21.559, reward: 0.693 },
            { stage: 5,  level: 292, percent: 25.785, reward: 0.693 },
            { stage: 6,  level: 292, percent: 30.012, reward: 0.693 },
            { stage: 7,  level: 292, percent: 34.239, reward: 0.693 },
            { stage: 8,  level: 292, percent: 38.465, reward: 0.693 },
            { stage: 9,  level: 292, percent: 42.692, reward: 0.693 },
            { stage: 10, level: 292, percent: 46.919, reward: 0.693 },
            { stage: 11, level: 292, percent: 51.145, reward: 0.693 },
            { stage: 12, level: 292, percent: 55.372, reward: 0.693 },
            { stage: 13, level: 292, percent: 59.599, reward: 0.693 },
            { stage: 14, level: 292, percent: 63.825, reward: 0.693 },
            { stage: 15, level: 292, percent: 68.052, reward: 0.693 },
            { stage: 16, level: 292, percent: 72.279, reward: 0.693 },
            { stage: 17, level: 292, percent: 76.505, reward: 0.693 },
            { stage: 18, level: 292, percent: 80.732, reward: 0.693 },
            { stage: 19, level: 292, percent: 84.959, reward: 0.693 },
            { stage: 20, level: 292, percent: 89.185, reward: 0.693 },
            { stage: 21, level: 292, percent: 93.412, reward: 0.693 },
            { stage: 22, level: 292, percent: 97.639, reward: 0.693 },
            { stage: 23, level: 293, percent: 1.715,  reward: 0.638 },
            { stage: 24, level: 293, percent: 5.602,  reward: 0.638 },
            { stage: 25, level: 293, percent: 9.488,  reward: 0.638 },
            { stage: 26, level: 293, percent: 13.375, reward: 0.638 },
            { stage: 27, level: 293, percent: 17.261, reward: 0.638 },
            { stage: 28, level: 293, percent: 21.148, reward: 0.638 },
            { stage: 29, level: 293, percent: 25.034, reward: 0.638 },
            { stage: 30, level: 293, percent: 28.921, reward: 0.638 },
        ]
    },
];

/**
 * 현재 레벨+퍼센트에 가장 가까운 실측 프리셋을 반환합니다.
 * 시작 레벨이 동일한 프리셋 중 시작 퍼센트가 가장 가까운 것을 우선합니다.
 */
export function findMatchingPreset(
    startLevel: number,
    startPercent: number
): PersonalBurningPreset | null {
    const candidates = PERSONAL_BURNING_PRESETS.filter(
        p => p.startLevel === startLevel
    );
    if (candidates.length === 0) return null;

    // 시작 퍼센트 오차가 5% 이내인 가장 가까운 프리셋
    let best: PersonalBurningPreset | null = null;
    let minDiff = Infinity;
    for (const preset of candidates) {
        const diff = Math.abs(preset.startPercent - startPercent);
        if (diff < minDiff && diff <= 15) {
            minDiff = diff;
            best = preset;
        }
    }
    return best;
}
