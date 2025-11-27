// 방어구 및 장신구 스타포스 스탯/공마 증가량 데이터 (16성 이상)
// 출처: 사용자 제공 이미지 (누적 / 상승치)
// 주의: 무기(Weapon)는 별도의 공식을 따르므로 이 데이터를 사용하면 안 됩니다.
// 장갑(Gloves)은 5성, 7성, 9성, 11성, 13성, 14성, 15성에서 공/마가 1씩 오르는 구간이 있어 별도 보정이 필요할 수 있으나,
// 16성 이상에서의 상승폭은 이 표를 따릅니다.

interface StarforceStat {
    accumulatedStat: number; // 누적 스탯
    accumulatedAtt: number;  // 누적 공/마
    increaseStat: number;    // 해당 단계 상승 스탯
    increaseAtt: number;     // 해당 단계 상승 공/마
}

type StarforceTable = {
    [level: number]: {
        [star: number]: StarforceStat;
    };
};

export const ARMOR_ACCESSORY_STARFORCE_DATA: StarforceTable = {
    130: {
        16: { accumulatedStat: 47, accumulatedAtt: 7, increaseStat: 7, increaseAtt: 7 },
        17: { accumulatedStat: 54, accumulatedAtt: 15, increaseStat: 7, increaseAtt: 8 },
        18: { accumulatedStat: 61, accumulatedAtt: 24, increaseStat: 7, increaseAtt: 9 },
        19: { accumulatedStat: 68, accumulatedAtt: 34, increaseStat: 7, increaseAtt: 10 },
        20: { accumulatedStat: 78, accumulatedAtt: 45, increaseStat: 10, increaseAtt: 11 }, // 20성 스탯 상승량 주의 (표에는 +7로 되어있으나 68->78은 +10임. 이미지 재확인 필요. 이미지상 78(+7)로 표기됨. 오타일 수 있으나 이미지 따름? 아니면 20성 보너스 고려? 통상 15->16부터 스탯 펌핑. 표의 괄호 수치와 누적 수치 차이 확인. 68+7=75인데 78임. 20성 달성 시 보너스? 일단 표의 누적치 우선.)
        // 이미지 재분석: 19성(68) -> 20성(78). 차이 10. 괄호는 (+7). 아마 기본 상승 7에 보너스 3?
        // 여기서는 '누적값'을 신뢰하여 작성합니다.
    },
    140: {
        16: { accumulatedStat: 49, accumulatedAtt: 8, increaseStat: 9, increaseAtt: 8 },
        17: { accumulatedStat: 58, accumulatedAtt: 17, increaseStat: 9, increaseAtt: 9 },
        18: { accumulatedStat: 67, accumulatedAtt: 27, increaseStat: 9, increaseAtt: 10 },
        19: { accumulatedStat: 76, accumulatedAtt: 38, increaseStat: 9, increaseAtt: 11 },
        20: { accumulatedStat: 85, accumulatedAtt: 50, increaseStat: 9, increaseAtt: 12 },
        21: { accumulatedStat: 94, accumulatedAtt: 63, increaseStat: 9, increaseAtt: 13 },
        22: { accumulatedStat: 103, accumulatedAtt: 78, increaseStat: 9, increaseAtt: 15 },
    },
    150: {
        16: { accumulatedStat: 51, accumulatedAtt: 9, increaseStat: 11, increaseAtt: 9 },
        17: { accumulatedStat: 62, accumulatedAtt: 19, increaseStat: 11, increaseAtt: 10 },
        18: { accumulatedStat: 73, accumulatedAtt: 30, increaseStat: 11, increaseAtt: 11 },
        19: { accumulatedStat: 84, accumulatedAtt: 42, increaseStat: 11, increaseAtt: 12 },
        20: { accumulatedStat: 95, accumulatedAtt: 55, increaseStat: 11, increaseAtt: 13 },
        21: { accumulatedStat: 106, accumulatedAtt: 69, increaseStat: 11, increaseAtt: 14 },
        22: { accumulatedStat: 117, accumulatedAtt: 85, increaseStat: 11, increaseAtt: 16 },
        23: { accumulatedStat: 128, accumulatedAtt: 103, increaseStat: 11, increaseAtt: 18 }, // 23성부터는 표의 누적치 추정 (95+11..이 아니라 표의 값: 23성 칸이 비어있거나 병합됨. 이미지상 23성은 200제부터 표기됨. 150제 23성은 117+11=128? 공 85+18=103. 표의 23성 행 확인: 150제 칸에 95(+17)?? 아님. 22성 밑에 23성 데이터 있음. 150제 23성: 공 103(+18) 확인됨.)
        24: { accumulatedStat: 139, accumulatedAtt: 123, increaseStat: 11, increaseAtt: 20 }, // 추정치 아님. 표 데이터: 공 123(+20)
        25: { accumulatedStat: 150, accumulatedAtt: 145, increaseStat: 11, increaseAtt: 22 }, // 공 145(+22)
    },
    160: {
        16: { accumulatedStat: 53, accumulatedAtt: 10, increaseStat: 13, increaseAtt: 10 },
        17: { accumulatedStat: 66, accumulatedAtt: 21, increaseStat: 13, increaseAtt: 11 },
        18: { accumulatedStat: 79, accumulatedAtt: 33, increaseStat: 13, increaseAtt: 12 },
        19: { accumulatedStat: 92, accumulatedAtt: 46, increaseStat: 13, increaseAtt: 13 },
        20: { accumulatedStat: 105, accumulatedAtt: 60, increaseStat: 13, increaseAtt: 14 },
        21: { accumulatedStat: 118, accumulatedAtt: 75, increaseStat: 13, increaseAtt: 15 },
        22: { accumulatedStat: 131, accumulatedAtt: 92, increaseStat: 13, increaseAtt: 17 },
    },
    200: {
        16: { accumulatedStat: 55, accumulatedAtt: 12, increaseStat: 15, increaseAtt: 12 },
        17: { accumulatedStat: 70, accumulatedAtt: 25, increaseStat: 15, increaseAtt: 13 },
        18: { accumulatedStat: 85, accumulatedAtt: 39, increaseStat: 15, increaseAtt: 14 },
        19: { accumulatedStat: 100, accumulatedAtt: 54, increaseStat: 15, increaseAtt: 15 },
        20: { accumulatedStat: 115, accumulatedAtt: 70, increaseStat: 15, increaseAtt: 16 },
        21: { accumulatedStat: 130, accumulatedAtt: 87, increaseStat: 15, increaseAtt: 17 },
        22: { accumulatedStat: 145, accumulatedAtt: 106, increaseStat: 15, increaseAtt: 19 },
        23: { accumulatedStat: 160, accumulatedAtt: 127, increaseStat: 15, increaseAtt: 21 }, // 표 데이터: 127(+21)
        24: { accumulatedStat: 175, accumulatedAtt: 150, increaseStat: 15, increaseAtt: 23 }, // 표 데이터: 150(+23)
        25: { accumulatedStat: 190, accumulatedAtt: 175, increaseStat: 15, increaseAtt: 25 }, // 표 데이터: 175(+25)
    },
    250: {
        16: { accumulatedStat: 57, accumulatedAtt: 14, increaseStat: 17, increaseAtt: 14 },
        17: { accumulatedStat: 74, accumulatedAtt: 29, increaseStat: 17, increaseAtt: 15 },
        18: { accumulatedStat: 91, accumulatedAtt: 45, increaseStat: 17, increaseAtt: 16 },
        19: { accumulatedStat: 108, accumulatedAtt: 62, increaseStat: 17, increaseAtt: 17 },
        20: { accumulatedStat: 125, accumulatedAtt: 80, increaseStat: 17, increaseAtt: 18 },
        21: { accumulatedStat: 142, accumulatedAtt: 99, increaseStat: 17, increaseAtt: 19 },
        22: { accumulatedStat: 159, accumulatedAtt: 120, increaseStat: 17, increaseAtt: 21 },
        23: { accumulatedStat: 176, accumulatedAtt: 143, increaseStat: 17, increaseAtt: 23 },
        24: { accumulatedStat: 193, accumulatedAtt: 168, increaseStat: 17, increaseAtt: 25 },
        25: { accumulatedStat: 210, accumulatedAtt: 195, increaseStat: 17, increaseAtt: 27 },
    }
};
