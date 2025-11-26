import { EquipmentItem, Issue, GRADE_SCORE } from '../types';
import { getJobInfo } from '../constants';
import { calcStatScore, getScrollStat } from '../utils';

// UI Stage 7: 18-star Completion
export const evaluateStage5 = (equipment: EquipmentItem[], jobName: string, attTypeKor: string) => {
    const { mainStat } = getJobInfo(jobName);
    let targetKeywords = [mainStat, "올스탯"];
    const isDA = jobName === "데몬어벤져";
    const isXenon = jobName === "제논";
    if (isDA) targetKeywords = ["HP", "최대 HP", "올스탯"];
    if (isXenon) targetKeywords = ["STR", "DEX", "LUK", "올스탯"];

    let stage5Issues = 0;
    const issues: Issue[] = [];
    const stage5Stats = {
        armor: {
            starforce: { current: 0, total: 0, failedItems: [] as string[] },
            scroll: { current: 0, total: 0, failedItems: [] as string[] },
            flame: { current: 0, total: 0, failedItems: [] as string[] },
            potential: { current: 0, total: 0, failedItems: [] as string[] },
            additional: { current: 0, total: 0, failedItems: [] as string[] }
        },
        accessory: {
            starforce: { current: 0, total: 0, failedItems: [] as string[] },
            scroll: { current: 0, total: 0, failedItems: [] as string[] },
            flame: { current: 0, total: 0, failedItems: [] as string[] },
            potential: { current: 0, total: 0, failedItems: [] as string[] },
            additional: { current: 0, total: 0, failedItems: [] as string[] }
        }
    };

    const armorSlots = ["모자", "상의", "하의", "상의(한벌옷)", "신발", "장갑", "망토"];
    const accessorySlots = ["반지1", "반지2", "반지3", "반지4", "펜던트", "펜던트2", "얼굴장식", "눈장식", "귀고리", "벨트", "어깨장식"];

    equipment.forEach(item => {
        const slot = item.item_equipment_slot;
        const name = item.item_name;

        // 대상 아이템 선별
        let isArmor = armorSlots.includes(slot);
        let isAccessory = accessorySlots.includes(slot) || (slot === "반지" && item.item_equipment_slot.includes("반지"));

        // 숄더는 장신구로 분류
        if (name.includes("숄더") || name.includes("견장")) {
            isArmor = false;
            isAccessory = true;
        }

        if (!isArmor && !isAccessory) return;
        if (name.includes("실버블라썸") || name.includes("이피아")) return;

        const targetStats = isArmor ? stage5Stats.armor : stage5Stats.accessory;



        const star = parseInt(item.starforce || "0");
        const specialRingKeywords = ["리스트레인트", "웨폰퍼프", "리스크테이커", "컨티뉴어스"];
        const isSpecialRing = slot.includes("반지") && specialRingKeywords.some(k => name.includes(k));

        // 이벤트 링 (스타포스 불가)
        const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "플레임"];
        const isEventRing = slot.includes("반지") && eventRingKeywords.some(k => name.includes(k));

        // 1. 스타포스 (18성 이상, 타일런트 10성 이상)
        const isTyrant = name.includes("타일런트");
        const isEternal = name.includes("에테르넬");
        let starforceThreshold = isTyrant ? 10 : 18;
        if (isEternal) starforceThreshold = 12;

        const isNoStarforce = item.starforce_scroll_flag === "0" && parseInt(item.starforce || "0") === 0;

        if (!isNoStarforce && !isEventRing) {
            targetStats.starforce.total++;

            // 1. 특수 반지 통과
            if (isSpecialRing) {
                targetStats.starforce.current++;
            } else if (star < starforceThreshold) {
                stage5Issues++;
                targetStats.starforce.failedItems.push(`${name} (${star}성)`);

                let msg = `[성장/스타포스] ${name}: ${starforceThreshold}성 미만 (${star}성)`;
                // 18성 달성이 불가능한 아이템에 대한 안내 추가
                const lowMaxStarItems = ["응축된 힘의 결정석", "아쿠아틱 레터 눈장식", "로얄 블랙메탈 숄더", "실버블라썸 링", "고귀한 이피아의 반지"];
                if (lowMaxStarItems.some(k => name.includes(k))) {
                    msg += " (상위 아이템으로 교체 권장)";
                }
                issues.push({ type: 'growth_starforce', message: msg });
            } else {
                targetStats.starforce.current++;
            }
        }
    });

    return { issues, issueCount: stage5Issues, stats: stage5Stats };
};
