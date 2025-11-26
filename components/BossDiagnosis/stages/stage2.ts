import { EquipmentItem, Issue, GRADE_SCORE } from '../types';
import { getJobInfo } from '../constants';

const getOptionCount = (item: EquipmentItem, attTypeKor: string, jobName: string): { validCount: number, iedCount: number } => {
    const options = [
        item.potential_option_1,
        item.potential_option_2,
        item.potential_option_3
    ];

    let validCount = 0; // Att% or Boss%
    let iedCount = 0;

    options.forEach(opt => {
        if (!opt) return;

        // 보스 공격력 (Boss Damage)
        if (opt.includes("보스 몬스터 공격 시 데미지")) {
            validCount++;
        }
        // 방어율 무시 (IED)
        else if (opt.includes("몬스터 방어율 무시")) {
            iedCount++;
        }
        // 공격력/마력 (Attack/Magic Power)
        else if (opt.includes(attTypeKor) && opt.includes("%")) {
            validCount++;
        }
        // 데몬어벤져 HP (Demon Avenger HP)
        else if (jobName === "데몬어벤져" && opt.includes("최대 HP") && opt.includes("%")) {
            validCount++;
        }
    });

    return { validCount, iedCount };
};

const hasOption = (item: EquipmentItem, keyword: string, minValue?: number): boolean => {
    const options = [
        item.potential_option_1,
        item.potential_option_2,
        item.potential_option_3
    ];

    return options.some(opt => {
        if (!opt) return false;
        if (!opt.includes(keyword)) return false;

        if (minValue !== undefined) {
            // Extract number from string like "공격력 : +9%" or "공격력 : +12%"
            const match = opt.match(/(\d+)/);
            if (match) {
                return parseInt(match[1]) >= minValue;
            }
            return false;
        }
        return true;
    });
};

const hasAdditionalOption = (item: EquipmentItem, keyword: string, isPercentage: boolean, minValue?: number): boolean => {
    const options = [
        item.additional_potential_option_1,
        item.additional_potential_option_2,
        item.additional_potential_option_3
    ];

    return options.some(opt => {
        if (!opt) return false;
        if (!opt.includes(keyword)) return false;
        if (isPercentage && !opt.includes("%")) return false;
        if (!isPercentage && opt.includes("%")) return false; // Flat value check

        if (minValue !== undefined) {
            const match = opt.match(/(\d+)/);
            if (match) {
                return parseInt(match[1]) >= minValue;
            }
            return false;
        }
        return true;
    });
};

export const evaluateStage2 = (equipment: EquipmentItem[], jobName: string, isGenesisWeapon: boolean) => {
    let stage2Issues = 0;
    const issues: Issue[] = [];

    const { attType } = getJobInfo(jobName);
    const attTypeKor = attType === "attack_power" ? "공격력" : "마력";

    const weapon = equipment.find(item => item.item_equipment_slot === "무기");
    const emblem = equipment.find(item => item.item_equipment_slot === "엠블렘");
    // 제로는 보조무기가 없으므로(무기가 역할 겸함) 체크 제외
    const subWeapon = jobName !== "제로" ? equipment.find(item => item.item_equipment_slot === "보조무기") : null;

    // 1. Global IED Check (Warning only)
    let totalIedLines = 0;
    if (weapon) totalIedLines += getOptionCount(weapon, attTypeKor, jobName).iedCount;
    if (emblem) totalIedLines += getOptionCount(emblem, attTypeKor, jobName).iedCount;
    if (subWeapon) totalIedLines += getOptionCount(subWeapon, attTypeKor, jobName).iedCount;

    if (totalIedLines >= 2) {
        // Optimization Issue (Warning)
        issues.push({
            type: 'optimization',
            message: `[WSE 통합] 방어율 무시가 총 ${totalIedLines}줄입니다. (통과는 되지만, 2줄 이상은 변경 권장)`
        });
    }

    // 2. Emblem Check
    if (emblem) {
        // Potential Grade: Unique+
        const gradeScore = GRADE_SCORE[emblem.potential_option_grade] || 0;
        if (gradeScore < 3) {
            stage2Issues++;
            issues.push({ type: 'wse_emblem', message: "[엠블렘] 잠재능력 유니크 등급 이상 필요" });
        } else {
            // Potential Option: Att% >= 9%
            if (!hasOption(emblem, attTypeKor, 9)) {
                stage2Issues++;
                issues.push({ type: 'wse_emblem', message: `[엠블렘] 잠재능력 ${attTypeKor}% 9% 이상 옵션 필요` });
            }
        }

        // Additional Grade: Epic+
        const addGradeScore = GRADE_SCORE[emblem.additional_potential_option_grade] || 0;
        if (addGradeScore < 2) {
            stage2Issues++;
            issues.push({ type: 'wse_emblem', message: "[엠블렘] 에디셔널 잠재능력 에픽 등급 이상 필요" });
        } else {
            // Additional Option: Att% >= 1 line
            if (!hasAdditionalOption(emblem, attTypeKor, true)) {
                stage2Issues++;
                issues.push({ type: 'wse_emblem', message: `[엠블렘] 에디셔널 ${attTypeKor}% 1줄 이상 필요` });
            }
        }
    }

    // 3. Weapon Check
    if (weapon) {
        const isHighTierWeapon = weapon.item_name.includes("제네시스") || weapon.item_name.includes("데스티니");

        if (!isHighTierWeapon) {
            // Starforce Check (Existing logic)
            const isArcane = weapon.item_name.includes("아케인셰이드");
            const isChallenger = weapon.item_name.includes("도전자");
            const isZeroType8 = (jobName === "제로") && (weapon.item_name.includes("8형") || weapon.item_name.includes("9형"));
            const star = parseInt(weapon.starforce || "0");

            if (!isChallenger && (!isArcane && !isZeroType8)) {
                stage2Issues++;
                issues.push({ type: 'wse_weapon', message: "[무기] 아케인셰이드 17성 이상 또는 도전자 무기 필요" });
            } else if ((isArcane || isZeroType8) && star < 17 && !isChallenger) {
                stage2Issues++;
                issues.push({ type: 'wse_weapon', message: "[무기] 스타포스 17성 미만" });
            }

            // Potential Grade: Legendary+
            const gradeScore = GRADE_SCORE[weapon.potential_option_grade] || 0;
            if (gradeScore < 4) {
                stage2Issues++;
                issues.push({ type: 'wse_weapon', message: "[무기] 잠재능력 레전드리 등급 필요" });
            } else {
                // Potential Option: Att% + Boss% + IED% >= 2 lines (Pass Condition)
                // 방무도 유효 옵션으로 인정하여 통과 처리 (단, 위에서 경고 메시지는 띄움)
                const { validCount, iedCount } = getOptionCount(weapon, attTypeKor, jobName);
                const totalEffective = validCount + iedCount;

                if (totalEffective < 2) {
                    stage2Issues++;
                    issues.push({ type: 'wse_weapon', message: `[무기] 유효 옵션(${attTypeKor}/보공/방무) 2줄 이상 필요 (현재 ${totalEffective}줄)` });
                }
            }
        }
    }

    // 4. Secondary Weapon Check
    if (subWeapon) {
        // Potential Grade: Unique+
        const gradeScore = GRADE_SCORE[subWeapon.potential_option_grade] || 0;
        if (gradeScore < 3 && !subWeapon.item_name.includes("포스실드")) { // Exception for some default secondaries if needed, but usually they can tier up
            stage2Issues++;
            issues.push({ type: 'wse_sub', message: "[보조] 잠재능력 유니크 등급 이상 필요" });
        } else {
            // Potential Option: Att% + Boss% + IED% >= 2 lines (Pass Condition)
            const { validCount, iedCount } = getOptionCount(subWeapon, attTypeKor, jobName);
            const totalEffective = validCount + iedCount;

            if (totalEffective < 2) {
                stage2Issues++;
                issues.push({ type: 'wse_sub', message: `[보조] 유효 옵션(${attTypeKor}/보공/방무) 2줄 이상 필요 (현재 ${totalEffective}줄)` });
            }
        }

        // Additional Grade: Rare+
        const addGradeScore = GRADE_SCORE[subWeapon.additional_potential_option_grade] || 0;
        if (addGradeScore < 1) {
            stage2Issues++;
            issues.push({ type: 'wse_sub', message: "[보조] 에디셔널 잠재능력 레어 등급 이상 필요" });
        } else {
            // Additional Option: Att +10 or more (Flat value)
            // Note: Some classes use Magic Power.
            if (!hasAdditionalOption(subWeapon, attTypeKor, false, 10)) {
                // Fallback: Check for % as well, as % is better than flat usually
                if (!hasAdditionalOption(subWeapon, attTypeKor, true)) {
                    stage2Issues++;
                    issues.push({ type: 'wse_sub', message: `[보조] 에디셔널 ${attTypeKor} +10 이상 또는 % 옵션 필요` });
                }
            }
        }
    } else if (jobName !== "제로") {
        // Missing Secondary
        stage2Issues++;
        issues.push({ type: 'wse_sub', message: "[보조] 보조무기 미착용" });
    }

    return { issues, issueCount: stage2Issues };
};
