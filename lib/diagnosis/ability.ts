import { ABILITY_DB } from '../../src/data/diagnosisData';
import { DiagnosisResult } from './types';

// === 3. 어빌리티 진단 ===
export function diagnoseAbility(targetMode: 'HUNTING' | 'BOSS', abilityData: any, myClass: string): DiagnosisResult {
    const result: DiagnosisResult = { bad: [], good: [], scoreDeduction: 0 };
    const myAbility = abilityData.ability_info || abilityData.ability_preset_1?.ability_info || [];
    myAbility.sort((a: any, b: any) => parseInt(a.ability_no) - parseInt(b.ability_no));
    const myAbilityLines = myAbility.map((a: any) => a.ability_value);

    if (targetMode === 'HUNTING') {
        // 사냥용 어빌리티 진단
        const line1 = myAbilityLines[0] || "";
        const line2 = myAbilityLines[1] || "";
        const line3 = myAbilityLines[2] || "";

        // 첫째줄: 드롭 20% or 메획 20%
        const checkLine1 = (line: string) => (line.includes("아이템 드롭률") || line.includes("메소 획득량")) && line.includes("20%");

        // 둘째/셋째줄: 드롭 15% or 메획 15% (일몹뎀 조건 삭제)
        const checkLine23 = (line: string) => (line.includes("아이템 드롭률") || line.includes("메소 획득량")) && line.includes("15%");

        let passCount = 0;

        // 첫째줄 체크
        if (checkLine1(line1)) passCount++;
        else {
            result.bad.push("첫째줄: 아이템 드롭률 20% 또는 메소 획득량 20% 옵션이 아닙니다.");
            result.scoreDeduction += 2;
        }

        // 둘째줄 체크
        if (checkLine23(line2)) passCount++;

        // 셋째줄 체크
        if (checkLine23(line3)) passCount++;

        if (passCount >= 2) {
            result.good.push("사냥용 어빌리티(드롭/메획) 세팅이 훌륭합니다!");
        } else if (passCount === 1 && checkLine1(line1)) {
            result.bad.push("추천: 둘째/셋째줄에 드롭 또는 메획 15%를 뽑아보세요.");
            result.scoreDeduction += 1;
        } else if (passCount === 0) {
            result.bad.push("추천: 첫줄(드롭/메획 20%), 2~3줄(드롭/메획 15%) 세팅을 맞춰보세요.");
        }
    } else {
        // 보스용 어빌리티 진단
        const presets = ABILITY_DB[myClass];

        if (!presets) {
            result.good.push("해당 직업의 추천 어빌리티 데이터가 없습니다.");
            return result;
        }

        const myLine1 = myAbilityLines[0] || "";
        const myLine2 = myAbilityLines[1] || "";
        const myLine3 = myAbilityLines[2] || "";

        // 등급 정보 가져오기
        const myGrade1 = myAbility[0]?.ability_grade || "";
        const myGrade2 = myAbility[1]?.ability_grade || "";
        const myGrade3 = myAbility[2]?.ability_grade || "";

        // 키워드 매칭 함수 (단순 포함 여부 확인)
        const checkMatch = (myLine: string, recLine: string) => {
            if (recLine.includes("보스")) return myLine.includes("보스");
            if (recLine.includes("재사용")) return myLine.includes("재사용");
            if (recLine.includes("패시브")) return myLine.includes("패시브");
            if (recLine.includes("버프")) return myLine.includes("버프");
            if (recLine.includes("크리티컬")) return myLine.includes("크리티컬");
            if (recLine.includes("상태 이상")) return myLine.includes("상태");
            if (recLine.includes("공격력")) return myLine.includes("공격력");
            if (recLine.includes("마력")) return myLine.includes("마력");
            return false;
        };

        let bestMatchCount = -1;
        let bestPresetName = "";

        // 가장 잘 맞는 프리셋 찾기
        for (const preset of presets) {
            let matchCount = 0;
            const recLines = preset.options;

            // 첫줄 비교 (레전드리 등급 필수)
            if (myGrade1 === "레전드리" && checkMatch(myLine1, recLines[0])) matchCount++;

            // 2,3줄 비교 (순서 상관 없음, 유니크 이상 필수, 중복 매칭 방지)
            const mySubLines = [
                { line: myLine2, grade: myGrade2 },
                { line: myLine3, grade: myGrade3 }
            ];
            const recSubLines = [recLines[1], recLines[2]];
            const usedRecIndices = new Set<number>();

            let subMatchCount = 0;

            for (const mySub of mySubLines) {
                // 유니크 이상인지 확인 (레전드리도 포함)
                const isHighGrade = mySub.grade === "유니크" || mySub.grade === "레전드리";
                if (!isHighGrade) continue;

                for (let i = 0; i < recSubLines.length; i++) {
                    if (usedRecIndices.has(i)) continue;

                    if (checkMatch(mySub.line, recSubLines[i])) {
                        subMatchCount++;
                        usedRecIndices.add(i);
                        break;
                    }
                }
            }
            matchCount += subMatchCount;

            if (matchCount > bestMatchCount) {
                bestMatchCount = matchCount;
                bestPresetName = preset.type;
            }
        }

        if (bestMatchCount >= 2) {
            result.good.push(`추천 어빌리티 세팅(${bestPresetName})을 잘 따르고 있습니다.`);
        } else {
            result.bad.push("추천 어빌리티 세팅과 차이가 있습니다.");
            result.bad.push(`현재 첫째줄: ${myLine1}`);
            if (presets.length > 0) {
                result.bad.push(`추천 첫째줄: ${presets[0].options[0]}`);
            }
            result.scoreDeduction += 5;
        }
    }

    return result;
}
