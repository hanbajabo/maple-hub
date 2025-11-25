import { EquipmentItem, Issue, GRADE_SCORE } from '../types';

export const evaluateStage2 = (equipment: EquipmentItem[], jobName: string, isGenesisWeapon: boolean) => {
    let stage2Issues = 0;
    const issues: Issue[] = [];

    // 엠블렘
    const emblem = equipment.find(item => item.item_equipment_slot === "엠블렘");
    if (emblem) {
        const grade = emblem.potential_option_grade;
        const score = GRADE_SCORE[grade] || 0;
        if (score < 3) { // 유니크 미만
            stage2Issues++;
            issues.push({ type: 'wse_emblem', message: "[엠블렘] 잠재능력 유니크 미만" });
        }
    }

    // 무기
    const weapon = equipment.find(item => item.item_equipment_slot === "무기");
    if (weapon) {
        // 제네시스 또는 데스티니 무기면 무조건 통과
        const isHighTierWeapon = weapon.item_name.includes("제네시스") || weapon.item_name.includes("데스티니");

        if (!isHighTierWeapon) {
            // 아케인 17성 이상 or 도전자
            const isArcane = weapon.item_name.includes("아케인셰이드");
            const isChallenger = weapon.item_name.includes("도전자"); // 아이템 버닝
            // 제로 8형(아케인 등급)
            const isZeroType8 = (jobName === "제로") && (weapon.item_name.includes("8형") || weapon.item_name.includes("9형"));

            const star = parseInt(weapon.starforce || "0");

            if (!isChallenger && (!isArcane && !isZeroType8)) {
                stage2Issues++;
                issues.push({ type: 'wse_weapon', message: "[무기] 아케인셰이드 17성 이상 또는 도전자 무기 필요" });
            } else if ((isArcane || isZeroType8) && star < 17 && !isChallenger) {
                stage2Issues++;
                issues.push({ type: 'wse_weapon', message: "[무기] 스타포스 17성 미만" });
            }

            const grade = weapon.potential_option_grade;
            const score = GRADE_SCORE[grade] || 0;
            if (score < 3) { // 유니크 미만
                stage2Issues++;
                issues.push({ type: 'wse_weapon', message: "[무기] 잠재능력 유니크 미만" });
            }
        }
    }

    // 보조무기
    // 제로는 보조무기가 없으므로(무기가 역할 겸함) 스킵
    if (jobName !== "제로") {
        const subWeapon = equipment.find(item => item.item_equipment_slot === "보조무기");
        if (subWeapon) {
            // 교불 보조 등 고려해야 하지만 단순화
            const grade = subWeapon.potential_option_grade;
            const score = GRADE_SCORE[grade] || 0;
            if (score < 3 && !subWeapon.item_name.includes("포스실드")) { // 데몬 등 기본 보조 예외 가능성
                stage2Issues++;
                issues.push({ type: 'wse_sub', message: "[보조] 잠재능력 유니크 미만" });
            }
        } else {
            // 보조무기가 없는 경우 (장착 안함)
            // 버닝 캐릭터 등 보조무기를 주는 경우도 있으므로 체크 필요
            // 일단 보조무기 미착용은 이슈로 처리
            stage2Issues++;
            issues.push({ type: 'wse_sub', message: "[보조] 보조무기 미착용" });
        }
    }

    return { issues, issueCount: stage2Issues };
};
