
import { diagnoseEpicPotential } from './common';
import { diagnoseScroll } from './scroll';

/**
 * 🛡️ 방어구(Armor) 전용 진단 로직
 * - 상의/하의: 에테르넬 vs 파프니르 비교
 * - 한벌옷: 잠재능력 손해 경고
 * - 신발/망토/견장: 앱솔랩스 vs 아케인셰이드 vs 에테르넬 효율 비교
 */
export function diagnoseArmor(item: any): string[] {
    const comments: string[] = [];
    const itemName = item.item_name || "";
    const slot = item.item_equipment_slot || "";
    const starforce = parseInt(item.starforce || "0");
    const potentialGrade = item.potential_option_grade;

    // 0. 주문서 작 진단 (Scroll)
    const scrollComments = diagnoseScroll(item);
    comments.push(...scrollComments);

    // 1. 상의 / 하의 (Top / Bottom)
    if (slot === "상의" || slot === "하의") {
        if (itemName.includes("에테르넬")) {
            if (starforce >= 21) {
                comments.push(`[최종 졸업] <b>21성</b> 이상 에테르넬은 카루타의 시대를 끝낸 유일한 아이템입니다. 압도적입니다.`);
            } else if (starforce >= 17) {
                comments.push(`[차세대 종결] 파프니르 <b>22성</b>을 넘어서는 스펙입니다. <b>21성</b> 이상을 목표로 하세요.`);
            }
        } else if (itemName.includes("하이네스") || itemName.includes("이글아이") || itemName.includes("트릭스터")) { // 카루타
            if (starforce >= 22) {
                comments.push(`[현역 최강] 에테르넬 전까지 대체 불가입니다. 평생 써도 무방한 명품입니다.`);
            } else if (starforce >= 17) {
                comments.push(`[국민 세팅] 카루타 상/하의는 가성비와 성능 모두 훌륭합니다.`);
            }
        }
    }

    // 2. 한벌옷 (Overall) - 경고
    if (slot === "한벌옷") {
        const level = item.item_base_option?.base_equipment_level || 0;
        if (level >= 160) { // 앱솔/아케인 한벌옷
            comments.push(`[비추천] 상의+하의 구성보다 잠재능력(주스탯%)에서 큰 손해를 봅니다. 카루타 상/하의 착용을 권장합니다.`);
        }
    }

    // 3. 신발 / 망토 / 어깨장식 (Shoes / Cape / Shoulder)
    if (slot === "신발" || slot === "망토" || slot === "어깨장식") {
        if (itemName.includes("앱솔랩스")) {
            if (starforce >= 22) {
                comments.push(`[가성비 제왕] <b>22성</b> 앱솔랩스는 <b>17성</b> 아케인보다 공격력이 월등히 높습니다. 현명한 선택입니다.`);
            } else if (starforce >= 17) {
                comments.push(`[국민 세팅] <b>17성</b> 앱솔은 가성비가 좋지만, 추후 <b>22성 앱솔</b>이나 <b>18성 아케인</b>으로 넘어가면 공격력이 대폭 상승합니다.`);
            }
        } else if (itemName.includes("아케인셰이드")) {
            if (starforce >= 22) {
                comments.push(`[졸업] <b>22성</b> 아케인... 더 이상 바랄 게 없는 엔드 스펙입니다.`);
            } else if (starforce >= 18) {
                comments.push(`[성장 교차점] <b>18성</b>부터는 깡공격력이 높아져 <b>22성</b> 앱솔과의 격차를 줄일 수 있습니다.`);
            } else if (starforce === 17) {
                comments.push(`[미래 지향적] 당장은 <b>22성</b> 앱솔보다 약할 수 있지만, <b>22성</b>을 바라보는 잠재력 있는 템셋팅입니다.`);
            }
        } else if (itemName.includes("에테르넬")) {
            if (starforce >= 17) {
                comments.push(`[최상위 포식자] 에테르넬 세트는 존재만으로도 강력합니다.`);
            }
        }
    }

    // 4. 잠재능력 (Potential) - 에픽 등급 진단
    // 유니크/레전드리는 각 부위별 로직이나 공통 로직에서 처리될 수 있음 (현재는 에픽만 추가)
    if (potentialGrade === '에픽') {
        const epicComments = diagnoseEpicPotential(potentialGrade, [item.potential_option_1, item.potential_option_2, item.potential_option_3]);
        comments.push(...epicComments);
    }

    // 5. 공통: 추옵 진단 (Flame)
    const addOpts = item.item_add_option || {};
    const addStat = Math.max(
        parseInt(addOpts.str || "0"),
        parseInt(addOpts.dex || "0"),
        parseInt(addOpts.int || "0"),
        parseInt(addOpts.luk || "0")
    );
    const addAllStat = parseInt(addOpts.all_stat || "0");
    const addAtt = parseInt(addOpts.attack_power || "0");
    const score = addStat + (addAtt * 4) + (addAllStat * 10);

    if (score >= 160) comments.push(`[극추옵] <b>160급</b> 이상! 초고스펙용 종결 추옵입니다.`);
    else if (score >= 130) comments.push(`[고추옵] <b>130급</b> 이상! 고스펙용으로 훌륭합니다.`);
    else if (score >= 100) comments.push(`[합격점] <b>100급</b> 이상! 실전에서 사용하기 적절합니다.`);
    else if (score < 80 && item.item_base_option?.base_equipment_level >= 140) {
        comments.push(`[환불 필요] <b>80급</b> 미만입니다. 환생의 불꽃 작업이 필요합니다.`);
    }

    return comments;
}
