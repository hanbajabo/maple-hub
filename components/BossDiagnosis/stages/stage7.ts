import { EquipmentItem, Issue } from '../types';

export const evaluateStage7 = (equipment: EquipmentItem[]) => {
    // 현재 장비 상태 파악
    const hat = equipment.find(i => i.item_equipment_slot === "모자")?.item_name || "";
    const top = equipment.find(i => i.item_equipment_slot === "상의")?.item_name || "";
    const bottom = equipment.find(i => i.item_equipment_slot === "하의")?.item_name || "";
    const gloves = equipment.find(i => i.item_equipment_slot === "장갑")?.item_name || "";
    const shoes = equipment.find(i => i.item_equipment_slot === "신발")?.item_name || "";
    const cape = equipment.find(i => i.item_equipment_slot === "망토")?.item_name || "";
    const shoulder = equipment.find(i => i.item_equipment_slot === "어깨장식")?.item_name || "";
    const overall = equipment.find(i => i.item_equipment_slot === "상의(한벌옷)")?.item_name || "";

    // 세트 아이템 카운트
    const countSet = (keyword: string, items: string[]) => items.filter(n => n.includes(keyword)).length;

    const craCount = countSet("하이네스", [hat, top, bottom]) + countSet("이글아이", [hat, top, bottom]) + countSet("트릭스터", [hat, top, bottom]);
    const absolCount = countSet("앱솔랩스", [gloves, shoes, cape, shoulder]);
    const arcaneCount = countSet("아케인셰이드", [gloves, shoes, cape, shoulder]);
    const eternalCount = countSet("에테르넬", [hat, top, bottom, overall, gloves, shoes, cape, shoulder]);

    let currentCombination = "기타 조합";
    if (craCount >= 3 && arcaneCount >= 4) currentCombination = "3루타비스 + 4아케인";
    else if (craCount >= 3 && absolCount >= 4) currentCombination = "3루타비스 + 4앱솔랩스";
    else if (eternalCount >= 3 && arcaneCount >= 4) currentCombination = "3에테르넬 + 4아케인";
    else if (eternalCount >= 3 && absolCount >= 4) currentCombination = "3에테르넬 + 4앱솔랩스";
    else if (craCount >= 3 && eternalCount >= 4) currentCombination = "3루타비스 + 4에테르넬";
    else if (eternalCount >= 7) currentCombination = "7에테르넬";

    const isCompleted = currentCombination !== "기타 조합";

    return {
        currentCombination,
        isCompleted,
        counts: {
            cra: craCount,
            absol: absolCount,
            arcane: arcaneCount,
            eternal: eternalCount
        },
        issues: [] as Issue[]
    };
};
