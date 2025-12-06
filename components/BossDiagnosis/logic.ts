
import { getJobInfo } from './constants';
import { evaluateStage0 } from './stages/stage0';
import { evaluateStage1 } from './stages/stage1';
import { evaluateStage2 } from './stages/stage2';
import { evaluateStage3 } from './stages/stage3';
import { evaluateStage4 } from './stages/stage4';
import { evaluateStage5 } from './stages/stage5';
import { evaluateStage6 } from './stages/stage6'; // New Optimization Stage
import { evaluateStage7 } from './stages/stage7'; // Old Stage 6
import { evaluateStage8 } from './stages/stage8'; // Old Stage 7
import { evaluateStage9 } from './stages/stage9'; // 10단계: 22성급 장신구
import { EquipmentItem, BossDiagnosisResult } from './types';

export const analyzeEquipment = (equipment: EquipmentItem[], basic: any, manualPassedStages?: Set<number>): BossDiagnosisResult => {
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
    // 5단계: 최종 완성 (18성+)
    const result5 = evaluateStage5(equipment, jobName, attTypeKor);

    // 6단계: 특수 스펙 최적화 (쿨뚝 & 시드링) [NEW]
    const result6 = evaluateStage6(equipment, jobName);

    // 7단계: 22성 조합 선택 (Old 6)
    const result7 = evaluateStage7(equipment);

    // 8단계: 22성급 방어구 셋팅 (Old 7)
    const result8 = evaluateStage8(equipment);

    // 9단계: 22성급 장신구 셋팅 (10단계)
    const result9 = evaluateStage9(equipment);

    // 단계 결정 로직
    let stage = 0;

    const isStage0Passed = (result0.passedItems > 0 && result0.issues.length === 0) || manualPassedStages?.has(0);
    if (isStage0Passed) {
        stage = 1;
        const isStage1Passed = result1.isPassed || manualPassedStages?.has(1);
        if (isStage1Passed) {
            stage = 2;
            const isStage2Passed = result2.issueCount === 0 || manualPassedStages?.has(2);
            if (isStage2Passed) {
                stage = 3; // 3단계 (방어구 방향성)
                const isStage3Passed = !!result3.passedArmorOption || manualPassedStages?.has(3);
                if (isStage3Passed) {
                    stage = 4; // 4단계 (성장 진단 17성)
                    const isStage4Passed = result4.issueCount === 0 || manualPassedStages?.has(4);
                    if (isStage4Passed) {
                        stage = 5; // 5단계 (성장 진단 17성 통과 후 -> 특수 스펙 최적화)
                        const isStage5Passed = result6.isPassed || manualPassedStages?.has(5);
                        if (isStage5Passed) {
                            stage = 6; // 6단계 (특수 스펙 통과 후 -> 최종 완성 18성)
                            const isStage6Passed = result5.issueCount === 0 || manualPassedStages?.has(6);
                            if (isStage6Passed) {
                                stage = 7; // 7단계 (18성 통과 후 -> 22성 조합)
                                const isStage7Passed = result7.isCompleted || manualPassedStages?.has(7);
                                if (isStage7Passed) {
                                    stage = 8; // 8단계 (22성 방어구)
                                    const isStage8Passed = result8.isPassed || manualPassedStages?.has(8);
                                    if (isStage8Passed) {
                                        stage = 9; // 9단계 (22성 장신구)
                                        const isStage9Passed = result9.isPassed || manualPassedStages?.has(9);
                                        if (isStage9Passed) {
                                            stage = 10; // Diagnosis Complete
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // 이슈 통합: 현재 단계의 이슈만 표시
    let currentStageIssues: any[] = [];

    if (stage === 0) currentStageIssues = result0.issues;
    else if (stage === 1) currentStageIssues = result1.issues;
    else if (stage === 2) currentStageIssues = result2.issues;
    else if (stage === 3) currentStageIssues = result3.issues;
    else if (stage === 4) currentStageIssues = result4.issues;
    else if (stage === 5) currentStageIssues = result6.issues; // 6단계 (특수 스펙)
    else if (stage === 6) currentStageIssues = result5.issues; // 7단계 (18성)
    else if (stage === 7) currentStageIssues = result7.issues; // 8단계 (조합)
    else if (stage === 8) currentStageIssues = result8.issues; // 9단계 (방어구)
    else if (stage === 9) currentStageIssues = result9.issues; // 10단계 (장신구)


    return {
        stage: stage,
        issues: currentStageIssues,
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
        stage5Stats: result6.stats, // 6단계: 특수 스펙
        stage6Stats: result5.stats, // 7단계: 18성
        stage7Info: { // 8단계: 22성 조합
            currentCombination: result7.currentCombination,
            isCompleted: result7.isCompleted,
            counts: result7.counts
        },
        stage8Stats: result8.stats, // 9단계: 22성 셋팅
        stage9Stats: result9.stats  // 10단계: 22성 장신구
    };
};
