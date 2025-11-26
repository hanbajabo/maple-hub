import { EquipmentItem, Issue } from '../types';

export const evaluateStage8 = (equipment: EquipmentItem[]) => {
    const getStarforce = (item: EquipmentItem) => parseInt(item.starforce || "0");

    const countValidItems = (keywords: string[], minStar: number) => {
        return equipment.filter(item => {
            const name = item.item_name || "";
            if (name.includes("도전자")) return false; // 도전자 아이템 제외
            const star = getStarforce(item);
            return keywords.some(k => name.includes(k)) && star >= minStar;
        }).length;
    };

    // 1. 22성 루타비스 (하이네스, 이글아이, 트릭스터)
    const craKeywords = ["하이네스", "이글아이", "트릭스터"];
    const cra22Count = countValidItems(craKeywords, 22);
    const isCraSetSatisfied = cra22Count >= 3;

    // 2. 22성 앱솔랩스
    const absolKeywords = ["앱솔랩스"];
    const absol22Count = countValidItems(absolKeywords, 22);
    const isAbsolSetSatisfied = absol22Count >= 4;

    // 3. 22성 아케인셰이드
    const arcaneKeywords = ["아케인셰이드"];
    const arcane22Count = countValidItems(arcaneKeywords, 22);
    const isArcaneSetSatisfied = arcane22Count >= 4;

    // 4. 17성 에테르넬
    const eternalKeywords = ["에테르넬"];
    const eternal17Count = countValidItems(eternalKeywords, 17);
    const isEternal3SetSatisfied = eternal17Count >= 3;
    const isEternal4SetSatisfied = eternal17Count >= 4; // 예외 조건

    // 만족하는 세트 개수 계산
    let satisfiedSetCount = 0;
    if (isCraSetSatisfied) satisfiedSetCount++;
    if (isAbsolSetSatisfied) satisfiedSetCount++;
    if (isArcaneSetSatisfied) satisfiedSetCount++;
    if (isEternal3SetSatisfied) satisfiedSetCount++;

    // 통과 조건: 세트 2개 이상 만족 OR 에테르넬 4세트 이상 (예외)
    const isPassed = satisfiedSetCount >= 2 || isEternal4SetSatisfied;

    const issues: Issue[] = [];
    if (!isPassed) {
        issues.push({
            type: 'set_effect',
            message: "22성급 방어구 세트 조건 미달 (2개 세트 이상 완성 또는 에테르넬 4세트 필요)"
        });
    }

    return {
        isPassed,
        issues,
        stats: {
            cra22Count,
            absol22Count,
            arcane22Count,
            eternal17Count,
            satisfiedSetCount,
            isEternal4SetSatisfied
        }
    };
};
