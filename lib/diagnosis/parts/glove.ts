
import { diagnoseEpicPotential, checkPensalirAndWarn } from './common';
import { diagnoseScroll } from './scroll';

/**
 * 🧤 장갑(Glove) 전용 진단 로직
 * - 크리티컬 데미지(Crit Damage) 가치 평가 (최우선)
 * - 앱솔랩스 vs 아케인셰이드 스타포스 효율 비교
 * - 잠재능력 정밀 진단 (쌍크뎀 권장)
 */
export function diagnoseGlove(item: any, job?: string): string[] {
    const comments: string[] = [];
    const itemName = item.item_name || "";
    const starforce = parseInt(item.starforce || "0");
    const potentialGrade = item.potential_option_grade;
    const potentials = [item.potential_option_1, item.potential_option_2, item.potential_option_3];
    const adiLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3];

    // 🚨 펜살리르 체크 - 펜살리르면 여기서 종료
    const pensalirWarning = checkPensalirAndWarn(itemName, 'armor');
    if (pensalirWarning) return pensalirWarning;

    // 0. 주문서 작 진단 (Scroll)
    const scrollComments = diagnoseScroll(item);
    comments.push(...scrollComments);

    // 1. 크리티컬 데미지 (Critical Damage) - 장갑의 영혼
    const critDmgLines = potentials.filter(l => l && l.includes("크리티컬 데미지")).length;

    if (critDmgLines >= 3) {
        comments.push(`[신화: 3크뎀] 전 서버급 매물입니다. 부르는 게 값입니다.`);
    } else if (critDmgLines === 2) {
        comments.push(`[종결: 쌍크뎀] 크리티컬 데미지 <b>16%</b>! 장갑에서 챙길 수 있는 최고의 옵션입니다. 평생 쓰셔도 됩니다.`);
    } else if (critDmgLines === 1) {
        // 1줄일 때 추가 분석
        const hasStat = potentials.some(l => l && (l.includes("올스탯") || l.includes("STR") || l.includes("DEX") || l.includes("INT") || l.includes("LUK")));
        if (potentialGrade === "레전드리") {
            comments.push(`[아쉬움] 레전드리 장갑인데 크뎀이 한 줄뿐입니다. 스펙업 욕심이 있다면 <b>'쌍크뎀(2줄)'</b>을 노려보세요.`);
        } else {
            comments.push(`[필수 옵션] 크뎀 <b>8%</b>는 주스탯 3줄급 효율입니다. 유니크 등급에서는 최상의 옵션입니다.`);
        }
    } else if (potentialGrade === "레전드리" || potentialGrade === "유니크") {
        comments.push(`[옵션 미달] 장갑의 핵심은 <b>'크리티컬 데미지'</b>입니다. 주스탯보다 크뎀을 우선적으로 뽑아주세요.`);
    } else if (potentialGrade === '에픽') {
        const epicComments = diagnoseEpicPotential(potentialGrade, potentials);
        comments.push(...epicComments);
    }

    // 2. 스타포스 및 아이템 메타 분석 (Meta Analysis)
    // 장갑은 공격력이 중요하므로 22성 효율이 매우 높음
    if (itemName.includes("앱솔랩스")) {
        if (starforce >= 22) {
            comments.push(`[가성비 제왕] <b>22성</b> 앱솔 장갑은 <b>17성</b> 아케인보다 공격력이 월등히 높습니다. 현명한 선택입니다.`);
        } else if (starforce >= 17) {
            comments.push(`[국민 세팅] <b>17성</b> 앱솔은 가성비가 좋지만, 추후 <b>22성 앱솔</b>이나 <b>18성 아케인</b>으로 넘어가면 공격력이 대폭 상승합니다.`);
        }
    } else if (itemName.includes("아케인셰이드")) {
        if (starforce >= 22) {
            comments.push(`[졸업] <b>22성</b> 아케인 장갑... 더 이상 바랄 게 없는 엔드 스펙입니다.`);
        } else if (starforce >= 18) {
            comments.push(`[성장 교차점] <b>18성</b>부터는 깡공격력이 높아져 <b>22성</b> 앱솔과의 격차를 줄일 수 있습니다.`);
        } else if (starforce === 17) {
            comments.push(`[미래 지향적] 당장은 <b>22성</b> 앱솔보다 약할 수 있지만, <b>22성</b>을 바라보는 잠재력 있는 템셋팅입니다.`);
        }
    }

    // 3. 에디셔널 잠재능력 (Additional Potential)
    // 장갑은 에디 공/마 또는 크리티컬 데미지가 최상급 옵션
    const adiGrade = item.additional_potential_option_grade;
    const hasAtt = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")));
    const adiCritDmgLines = adiLines.filter(l => l && l.includes("크리티컬 데미지")).length;

    if (adiCritDmgLines >= 2) {
        comments.push(`[에디 신화] 에디셔널 <b>쌍크뎀</b>! 전 서버급 매물입니다. 부르는 게 값!`);
    } else if (adiCritDmgLines === 1) {
        comments.push(`[에디 종결] 에디셔널 <b>크리티컬 데미지</b>! 장갑 에디의 최상급 옵션입니다. 공/마보다 훨씬 좋습니다.`);
    } else if (adiGrade === "레전드리" || adiGrade === "유니크" || adiGrade === "에픽") {
        if (hasAtt) {
            comments.push(`[에디 준수] 에디셔널 공/마도 좋습니다. 하지만 크뎀이 뜬다면 더 강력해질 수 있습니다.`);
        } else if (potentialGrade === "레전드리" && (!adiGrade || adiGrade === "레어")) {
            comments.push(`[속 빈 강정] 크뎀 장갑의 효율을 극대화하려면 에디셔널 크뎀이나 공/마가 필수입니다.`);
        }
    }

    // 4. 추옵 (Flame)
    // 장갑은 추옵이 잘 안 붙는 부위 (강환불 효율 낮음)
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

    if (score >= 120) comments.push(`[극추옵] 장갑에서 <b>120급</b>은 정말 귀합니다. 평생 가져가세요.`);
    else if (score >= 100) comments.push(`[고추옵] <b>100급</b> 이상! 훌륭합니다.`);
    else if (score < 80 && item.item_base_option?.base_equipment_level >= 160) {
        comments.push(`[추옵 아쉬움] 장갑은 추옵 뽑기가 어렵지만, <b>80급</b> 이상은 맞춰주는 것이 좋습니다.`);
    }

    return comments;
}
