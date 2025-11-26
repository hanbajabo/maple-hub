import { EquipmentItem, Issue, GRADE_SCORE } from '../types';
import { getJobInfo } from '../constants';
import { calcStatScore, getScrollStat } from '../utils';

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
        const potGrade = item.potential_option_grade;
        const adiGrade = item.additional_potential_option_grade;
        const potScore = GRADE_SCORE[potGrade] || 0;
        const adiScore = GRADE_SCORE[adiGrade] || 0;

        const specialRingKeywords = ["리스트레인트", "웨폰퍼프", "리스크테이커", "컨티뉴어스"];
        const isSpecialRing = slot.includes("반지") && specialRingKeywords.some(k => name.includes(k));

        // 이벤트 링 (스타포스 불가)
        const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "플레임"];
        const isEventRing = slot.includes("반지") && eventRingKeywords.some(k => name.includes(k));

        // 1. 스타포스 (18성 이상, 타일런트 10성 이상)
        // * 에테르넬 장비는 12성만 되어도 통과 (12성 에테르넬 ≈ 18성 카루타)
        // * 이벤트 링은 스타포스 불가하므로 체크 제외
        // * 도전자 아이템은 7단계에서 제외 (5단계까지만 올패스)
        const isTyrant = name.includes("타일런트");
        const isEternal = name.includes("에테르넬");
        const isChallenger = name.includes("도전자");
        let starforceThreshold = isTyrant ? 10 : 18;
        if (isEternal) starforceThreshold = 12;

        const hasAmazingScroll = item.starforce_scroll_flag !== "0" && star > 0;

        const isNoStarforce = item.starforce_scroll_flag === "0" && parseInt(item.starforce || "0") === 0;

        // 도전자 아이템도 진단 대상에 포함하여 '미달'로 표시 (제외하면 만점으로 착각할 수 있음)
        if (!isNoStarforce && !isEventRing) {
            targetStats.starforce.total++;

            // 도전자 아이템은 무조건 실패 처리 (또는 스타포스 체크로 넘김)
            // Amazing Scroll 체크에서 도전자 제외
            if (isSpecialRing || (hasAmazingScroll && !isChallenger)) {
                targetStats.starforce.current++;
            } else if (isChallenger || star < starforceThreshold) {
                stage5Issues++;
                targetStats.starforce.failedItems.push(`${name} (${star}성)`);
                issues.push({ type: 'growth_starforce', message: `[성장/스타포스] ${name}: ${starforceThreshold}성 미만 (${star}성)` });
            } else {
                targetStats.starforce.current++;
            }
        }

        // 2-5. 나머지 조건은 5단계와 동일 (주문서, 추옵, 잠재, 에디)
        // 이하 생략하여 스타포스만 체크
    });

    return { issues, issueCount: stage5Issues, stats: stage5Stats };
};
