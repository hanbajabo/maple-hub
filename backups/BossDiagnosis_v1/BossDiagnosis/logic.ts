import { getJobInfo } from './constants';
import { evaluateStage0 } from './stages/stage0';
import { evaluateStage1 } from './stages/stage1';
import { evaluateStage2 } from './stages/stage2';
import { evaluateStage3 } from './stages/stage3';
import { evaluateStage4 } from './stages/stage4';
import { evaluateStage5 } from './stages/stage5';
import { evaluateStage6 } from './stages/stage6';
import { EquipmentItem, BossDiagnosisResult } from './types';

export const analyzeEquipment = (equipment: EquipmentItem[], basic: any): BossDiagnosisResult => {
    const jobName = basic?.character_class || "히어로";
    const { attType } = getJobInfo(jobName);
    const attTypeKor = attType === "attack_power" ? "공격력" : "마력";

    // 제네시스 무기 확인 (공통 사용)
    const isGenesisWeapon = equipment.some(item => item.item_equipment_slot === "무기" && item.item_name.includes("제네시스"));

    // 0단계: 기초 세팅 점검
    const result0 = evaluateStage0(equipment, jobName, attTypeKor);

    // 1단계: 장신구 세트 효과 점검
    const result1 = evaluateStage1(equipment, isGenesisWeapon);

    // 2단계: 무기/보조/엠블렘 점검
    const result2 = evaluateStage2(equipment, jobName, isGenesisWeapon);

    // 3단계: 방어구 방향성 점검
    const result3 = evaluateStage3(equipment, result1.setCounts.meisterSetCount, isGenesisWeapon);

    // 4단계: 성장 진단 (17성+)
    const result4 = evaluateStage4(equipment, jobName, attTypeKor);

    // 5단계: 최종 완성 (18성+)
    const result5 = evaluateStage5(equipment, jobName, attTypeKor);

    // 6단계: 22성 조합 선택
    const result6 = evaluateStage6(equipment);

    // 단계 결정 로직
    let stage = 0;
    if (result0.passedItems > 0 && result0.issues.length === 0) {
        stage = 1;
        if (result1.isPassed) {
            stage = 2;
            if (result2.issueCount === 0) {
                stage = 3; // 3단계 (방어구 방향성)
                if (result3.passedArmorOption) {
                    stage = 4; // 4단계 (성장 진단 17성)
                    if (result4.issueCount === 0) {
                        stage = 5; // 5단계 (최종 완성 18성)
                        if (result5.issueCount === 0) {
                            stage = 6; // 6단계 (22성 조합 선택)
                        }
                    }
                }
            }
        }
    }

    // 이슈 통합
    const allIssues = [
        ...result0.issues,
        ...result1.issues,
        ...result2.issues,
        ...result3.issues,
        ...result4.issues,
        ...result5.issues
        // 6단계는 이슈 없음
    ];

    return {
        stage,
        issues: allIssues,
        attTypeKor: attTypeKor,
        setCounts: {
            bossSetCount: result1.setCounts.bossSetCount,
            dawnSetCount: result1.setCounts.dawnSetCount,
            pitchedSetCount: result1.setCounts.pitchedSetCount,
            meisterSetCount: result1.setCounts.meisterSetCount,
            brilliantSetCount: result1.setCounts.brilliantSetCount
        },
        passedArmorOption: result3.passedArmorOption,
        isGenesisWeapon: isGenesisWeapon,
        stage4Stats: result4.stats,
        stage5Stats: result5.stats,
        stage6Info: result6
    };
};
