import { GENESIS_WEAPON } from '../../../src/data/set_item_data';
import { diagnoseEpicPotential } from './common';
import { isMagicJob } from '../../job_utils';
import { isPensalirItem } from '../../utils/item_classifier';
import {
    STARFORCE_TIERS,
    WEAPON_FLAME_TIERS,
    SCROLL_QUALITY,
    getMaxStarforce
} from '../../config/unified_criteria';
import { EquipmentItem } from '../types';
import { getStarforce } from '../utils';
import { isAmazingEnhancementItem } from '../../amazing_enhancement_table';

// 소울 웨폰 티어 데이터
const TIER_1_SOULS = ["진 힐라", "감시자 칼로스", "카링", "선택받은 세렌", "검은 마법사", "최초의 대적자", "발드릭스", "림보", "섬멸병기 스우", "매그너스", "시그너스", "블러디 퀸", "벨룸", "무르무르"];
const TIER_2_SOULS = ["듄켈", "더스크", "윌", "루시드", "데미안", "스우", "핑크빈", "우르스", "반반", "피에르"];

/**
 * ⚔️ 무기(Weapon) 전용 진단 로직
 * - 주문서 작 정밀 진단 (역추적)
 * - 소울 웨폰 티어 및 옵션 평가
 * - 잠재능력 (보보공, 공공보 등) 평가
 * - 제네시스/제로 무기 특수 로직
 */
export function diagnoseWeapon(item: EquipmentItem, job?: string): string[] {
    const comments: string[] = [];
    const itemName = item.item_name || "";
    const slot = item.item_equipment_slot || "";
    const starforce = getStarforce(item);
    const potentialGrade = item.potential_option_grade;
    const potentials = [item.potential_option_1, item.potential_option_2, item.potential_option_3].filter((s): s is string => !!s);
    const adiLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3].filter((s): s is string => !!s);
    const level = item.item_base_option?.base_equipment_level || 0;

    const isGenesis = GENESIS_WEAPON.some(g => itemName.includes(g));
    const isZeroWeapon = itemName.includes("라피스") || itemName.includes("라즐리");

    // 직업 정보가 있으면 그것을 우선하고, 없으면 무기 이름으로 추정
    const isMage = job ? isMagicJob(job) : (itemName.includes("스태프") || itemName.includes("완드") || itemName.includes("샤이닝 로드") || itemName.includes("ESP") || itemName.includes("매직 건틀렛"));

    const isSecondary = slot.includes("보조무기") || slot.includes("방패");
    const isEmblem = slot.includes("엠블렘");

    // 1. 주문서 작 진단 (Scroll Analysis)
    const scrollCount = parseInt(item.scroll_upgrade || "0");
    const etcAtt = parseInt(item.item_etc_option?.attack_power || "0");
    const etcMagic = parseInt(item.item_etc_option?.magic_power || "0");
    const mainAttGain = isMage ? etcMagic : etcAtt;

    if (scrollCount > 0 && !isGenesis && !isEmblem && !isSecondary) { // 엠블렘/보조무기(일부 제외)는 작 불가
        const avgGain = mainAttGain / scrollCount;
        if (avgGain >= SCROLL_QUALITY.PERFECT) comments.push(`[완작 (Perfect)] 15% 주문서작 성공! 무기의 생명을 완벽하게 불어넣으셨습니다.`);
        else if (avgGain >= SCROLL_QUALITY.GREAT) comments.push(`[수작 (Great)] 15%와 30%가 섞인 훌륭한 작입니다.`);
        else if (avgGain >= SCROLL_QUALITY.NORMAL) comments.push(`[평작 (Normal)] 30%작 혹은 70%작이 섞여있습니다. 가성비 구간입니다.`);
        else if (avgGain >= SCROLL_QUALITY.BASIC) comments.push(`[떡작 (Basic)] 70% 혹은 100% 주문서 작입니다. 임시용입니다.`);
        else comments.push(`[망작 (Bad)] 주문서 작 상태가 좋지 않습니다. <b>아크 이노센트 주문서</b> 사용을 권장합니다.`);
    } else if (isGenesis) {
        comments.push(`[해방의 증표] 검은 마법사를 격파하고 진정한 해방을 이루셨군요. 주문서 작이 필요 없는 완성된 무기입니다.`);
    }

    // 2. 스타포스 (Starforce)
    if (isPensalirItem(itemName)) {
        comments.push(`[긴급 경고] 우트가르드(펜살리르) 무기는 성능이 매우 부족합니다. 본캐용이라면 즉시 아케인셰이드 무기로 교체하세요.`);
    } else if (!isGenesis && !isZeroWeapon && !isSecondary && !isEmblem) { // 보조/엠블렘은 스타포스 없음 (방패 제외, 방패는 별도 처리 필요하나 여기선 생략)
        const isAmazingEnhancement = isAmazingEnhancementItem(item);
        if (isAmazingEnhancement) {
            if (starforce >= 12) comments.push(`[종결] 놀장강 <b>${starforce}성</b> 무기! <b>22성급 효율</b>의 끝판왕 장비입니다.`);
            else if (starforce >= 10) comments.push(`[우수] 놀장강 <b>${starforce}성</b> 무기! <b>20성급 효율</b>을 보여줍니다.`);
            else comments.push(`[좋음] 놀장강 <b>${starforce}성</b> 무기! <b>17성급 효율</b>로 준수한 성능입니다.`);
        } else {
            const maxSf = getMaxStarforce(level);
            if (starforce >= maxSf) {
                if (maxSf < STARFORCE_TIERS.ENDGAME) comments.push(`[최대 강화] 현재 레벨에서 가능한 최대 스타포스(${maxSf}성)입니다. 더 높은 스펙을 원하시면 상위 장비로 교체하세요.`);
                else comments.push(`[졸업] <b>${STARFORCE_TIERS.ENDGAME}성</b> 무기... 공격력이 폭발합니다. 완벽합니다.`);
            }
            else if (starforce >= STARFORCE_TIERS.STANDARD) comments.push(`[국민 세팅] <b>${STARFORCE_TIERS.STANDARD}성</b> 무기는 가성비가 좋지만, <b>${STARFORCE_TIERS.ENDGAME}성</b>과의 공격력 차이가 큽니다.`);
            else if (starforce >= STARFORCE_TIERS.ENTRY) {
                if (maxSf < STARFORCE_TIERS.STANDARD) {
                    comments.push(`[입문] 임시로 사용하는 단계입니다. (최대 <b>${maxSf}성</b>)`);
                } else {
                    comments.push(`[입문] 임시로 사용하는 단계입니다. <b>${STARFORCE_TIERS.STANDARD}성</b>을 목표로 하세요.`);
                }
            }
            else {
                const minTarget = Math.min(STARFORCE_TIERS.ENTRY, maxSf);
                if (minTarget < STARFORCE_TIERS.ENTRY) {
                    comments.push(`[강화 필요] 무기 스타포스가 너무 낮습니다. 최대 <b>${minTarget}성</b>까지 강화해주세요.`);
                } else {
                    comments.push(`[강화 필요] 무기 스타포스가 너무 낮습니다. 최소 <b>${STARFORCE_TIERS.ENTRY}성</b>은 맞춰주세요.`);
                }
            }
        }
    }

    // 4. 잠재능력 (Potential) - WSE
    if (isPensalirItem(itemName)) {
        comments.push(`[교체 권장] 우트가르드(펜살리르) 무기에 잠재능력 투자는 비효율적입니다. 아케인셰이드 무기로 교체하세요.`);
    } else if (potentialGrade === "레전드리") {
        const bossLines = potentials.filter(l => l && l.includes("보스"));
        const attLines = potentials.filter(l => l && (l.includes("공격력") || l.includes("마력")));
        const iedLines = potentials.filter(l => l && l.includes("방어율 무시"));

        const boss40Count = bossLines.filter(l => l.includes("40%")).length;

        // 직업에 맞는 공/마만 유효로 인정
        const validAttLines = attLines.filter(l => isMage ? l.includes("마력") : l.includes("공격력"));
        const attCount = validAttLines.length;
        const bossCount = bossLines.length;

        if (boss40Count >= 3) comments.push(`[기적] 보공 <b>120% (40/40/40)</b>... 전 서버 유일급 매물일 수 있습니다.`);
        else if (bossCount >= 2 && attCount >= 1) comments.push(`[종결: 보보공] 보공 2줄 + 공/마 1줄. 무기 잠재능력의 정석이자 종결입니다.`);
        else if (attCount >= 2 && bossCount >= 1) comments.push(`[종결: 공공보] 공/마 2줄 + 보공 1줄. 아주 훌륭한 옵션입니다.`);
        else if (attCount >= 3) comments.push(`[종결: 3공] 공/마 3줄! 보공 효율이 높은 직업에게 최고의 옵션입니다.`);
        else if (bossCount + attCount + iedLines.length >= 3) comments.push(`[3줄 유효] 유효 옵션 3줄을 꽉 채우셨습니다. 졸업급입니다.`);
        else if (bossCount + attCount + iedLines.length === 2) comments.push(`[2줄 유효] 가성비 좋게 2줄을 챙기셨습니다. 추후 3줄을 목표로 해보세요.`);

        // 보공 2줄 (공/마 없음) -> 보보잡
        else if (bossCount >= 2) comments.push(`[보보잡] 보공 2줄은 훌륭하지만, 공/마가 없어 아쉽습니다. 큐브로 '보보공'을 노려보세요.`);

        // 1줄 이하
        else comments.push(`[옵션 아쉬움] 레전드리 등급이지만 유효 옵션이 부족합니다. 큐브 작업이 시급합니다.`);
    } else if (potentialGrade === "유니크") {
        const bossLines = potentials.filter(l => l && l.includes("보스"));
        const attLines = potentials.filter(l => l && (l.includes("공격력") || l.includes("마력")));

        // 직업에 맞는 공/마만 유효로 인정
        const validAttLines = attLines.filter(l => isMage ? l.includes("마력") : l.includes("공격력"));

        if (bossLines.length + validAttLines.length >= 2) comments.push(`[유니크 종결] 유니크 등급에서 뽑을 수 있는 최상의 옵션입니다.`);
        else if (bossLines.length + validAttLines.length === 1) comments.push(`[유니크 현역] 쓸만한 유효 옵션입니다.`);
    } else if (potentialGrade === '에픽') {
        const epicComments = diagnoseEpicPotential(potentialGrade, potentials, job);
        comments.push(...epicComments);
    }

    // 5. 에디셔널 (Additional)
    const adiGrade = item.additional_potential_option_grade;
    if (potentialGrade === "레전드리" && (!adiGrade || adiGrade === "레어")) {
        const hasAtt = adiLines.some(l => l && (isMage ? l.includes("마력") : l.includes("공격력")));
        if (!hasAtt) comments.push(`[속 빈 강정] 윗잠은 레전드리지만 에디셔널이 부실합니다. 에디 공/마를 챙겨주세요.`);
    } else if (adiGrade === "에픽" || adiGrade === "유니크" || adiGrade === "레전드리") {
        const attLines = adiLines.filter(l => l && (isMage ? l.includes("마력") : l.includes("공격력"))).length;
        const bossLines = adiLines.filter(l => l && l.includes("보스")).length;

        if (attLines >= 3) comments.push(`[에디 신화] 에디셔널 공/마 3줄! 부르는 게 값인 전설적인 아이템입니다.`);
        else if (attLines >= 2) comments.push(`[에디 종결] 에디셔널 공/마 2줄! 더 바랄 게 없는 완벽한 옵션입니다.`);
        else if (attLines >= 1 && bossLines >= 1) comments.push(`[에디 준종결] 공/마와 보공을 섞어 쓰시는군요. 훌륭한 타협점입니다.`);
        else if (attLines >= 1) comments.push(`[에디 합격] 에디셔널 공/마 1줄, 든든한 허리 라인입니다.`);
        else if (bossLines >= 2) comments.push(`[에디 가성비] 보공 위주로 세팅하셨군요. 공/마보다는 아쉽지만 실전 성능은 좋습니다.`);
        else if (bossLines >= 1) comments.push(`[에디 입문] 보공 1줄을 챙기셨네요. 추후 공/마 옵션을 노려보세요.`);
    }

    // 6. 추가옵션 (Flame) - 엠블렘과 보조무기는 환생의 불꽃 사용 불가
    if (isPensalirItem(itemName)) {
        comments.push(`[교체 권장] 우트가르드(펜살리르) 무기에 환생의 불꽃 투자는 비효율적입니다. 아케인셰이드 무기로 교체하세요.`);
    } else if (!isEmblem && !isSecondary) {
        const addAtt = parseInt(item.item_add_option?.attack_power || "0");
        const addMagic = parseInt(item.item_add_option?.magic_power || "0");
        const mainAddAtt = isMage ? addMagic : addAtt;

        if (isZeroWeapon) {
            if (mainAddAtt > 0) comments.push(`[제로 종결] 제로 무기는 2추옵+공격력만 붙어도 종결로 인정합니다. (1추옵 확률 극악)`);
        } else if (isGenesis) {
            if (mainAddAtt < WEAPON_FLAME_TIERS.GENESIS_MIN) comments.push(`[아쉬움] 제네시스 무기치고는 추옵이 낮습니다. 영환불을 권장합니다.`);
        } else {
            // 일반 무기 추옵 (1추/2추 판별)
            let tier1 = 0;
            let tier2 = 0;

            if (level >= 200) {
                tier1 = WEAPON_FLAME_TIERS.ARCANE.TIER1_MIN;
                tier2 = WEAPON_FLAME_TIERS.ARCANE.TIER2_MIN;
            } else if (level >= 160) {
                tier1 = WEAPON_FLAME_TIERS.ABSOLAB.TIER1_MIN;
                tier2 = WEAPON_FLAME_TIERS.ABSOLAB.TIER2_MIN;
            } else if (level >= 150) {
                tier1 = WEAPON_FLAME_TIERS.FAFNIR.TIER1_MIN;
                tier2 = WEAPON_FLAME_TIERS.FAFNIR.TIER2_MIN;
            }

            if (mainAddAtt >= tier1) comments.push(`[1추옵] 무기 추가옵션 <b>1티어</b>! 완벽한 추옵입니다.`);
            else if (mainAddAtt >= tier2) comments.push(`[2추옵] 무기 추가옵션 <b>2티어</b>! 가성비 좋게 사용하기 충분합니다.`);
            else if (mainAddAtt > 0) comments.push(`[추옵 아쉬움] <b>1추옵</b>이나 <b>2추옵</b>을 노려보세요. 공격력 차이가 큽니다.`);
            else comments.push(`[치명적] 무기에 추가옵션 공/마가 없습니다. 엔진 없는 자동차와 같습니다.`);
        }
    }

    return comments;
}
