import { EquipmentItem, Issue } from '../types';

export const evaluateStage3 = (equipment: EquipmentItem[], meisterSetCount: number, isGenesisWeapon: boolean) => {
    let passedArmorOption: string | null = null;
    const issues: Issue[] = [];

    // 항상 방어구 옵션은 계산
    const hat = equipment.find(i => i.item_equipment_slot === "모자")?.item_name || "";
    const top = equipment.find(i => i.item_equipment_slot === "상의")?.item_name || "";
    const bottom = equipment.find(i => i.item_equipment_slot === "하의")?.item_name || "";
    const gloves = equipment.find(i => i.item_equipment_slot === "장갑")?.item_name || "";
    const shoes = equipment.find(i => i.item_equipment_slot === "신발")?.item_name || "";
    const cape = equipment.find(i => i.item_equipment_slot === "망토")?.item_name || "";
    const shoulder = equipment.find(i => i.item_equipment_slot === "어깨장식")?.item_name || "";
    const overall = equipment.find(i => i.item_equipment_slot === "상의(한벌옷)")?.item_name || "";

    const hasChallengerArmor = [hat, top, bottom, gloves, shoes, cape, shoulder, overall].filter(n => n.includes("도전자")).length >= 4;

    if (hasChallengerArmor) {
        passedArmorOption = "도전자 세트 (예외 통과)";
    } else {
        const is3CRA = [hat, top, bottom].every(n => n.includes("하이네스") || n.includes("이글아이") || n.includes("트릭스터"));
        const is4Arcane = [gloves, shoes, cape, shoulder].every(n => n.includes("아케인셰이드"));
        const is4Absol = [gloves, shoes, cape, shoulder].every(n => n.includes("앱솔랩스"));
        const is3Eternal = [hat, top, bottom].every(n => n.includes("에테르넬"));
        const is4Eternal = [hat, top, bottom, overall].filter(n => n.includes("에테르넬")).length >= 3;

        if (is3CRA && is4Arcane) passedArmorOption = "3루타비스 + 4아케인";
        else if (is3CRA && is4Absol) passedArmorOption = "3루타비스 + 4앱솔랩스";
        else if (is3Eternal && is4Arcane) passedArmorOption = "3에테르넬 + 4아케인";
        else if (is4Eternal) passedArmorOption = "에테르넬 세트";
        else if (isGenesisWeapon && meisterSetCount >= 3) passedArmorOption = "제네시스 + 3마이스터 (예외 통과)";
        else {
            // 미달 시 구체적인 이유 제공
            const currentArmor = {
                upper: [hat, top, bottom, overall].filter(n => n).map(n => {
                    if (n.includes("하이네스") || n.includes("이글아이") || n.includes("트릭스터")) return "루타비스";
                    if (n.includes("에테르넬")) return "에테르넬";
                    if (n.includes("도전자")) return "도전자";
                    if (n.includes("아케인셰이드")) return "아케인";
                    if (n.includes("앱솔랩스")) return "앱솔";
                    return "기타";
                }),
                lower: [gloves, shoes, cape, shoulder].filter(n => n).map(n => {
                    if (n.includes("아케인셰이드")) return "아케인";
                    if (n.includes("앱솔랩스")) return "앱솔";
                    if (n.includes("도전자")) return "도전자";
                    if (n.includes("에테르넬")) return "에테르넬";
                    return "기타";
                })
            };

            let reason = "[방어구 방향성] 현재 방어구 조합이 맞지 않습니다. 4단계 방어구 조합을 보고 완성해주세요.";

            issues.push({ type: 'armor_direction', message: reason });
        }
    }

    return { passedArmorOption, issues };
};
