/**
 * AI 코멘터리 메인 진입점
 * 기존 generateItemCommentary 함수를 모듈화된 구조로 재구성
 */

import { isMagicJob } from '../job_utils';
import { diagnoseItemDeeply } from '../diagnosis/equipment';
import { getSpecialItemConfig } from '../config/special_items';
import { isPensalirItem } from '../utils/item_classifier';
import { pick, EVENT_RING_KEYWORDS } from './helpers';
import { classifyItem, generateStarterComments } from './item-classification';
import { analyzeStarforce } from './starforce-analysis';
import { analyzeFlameOptions } from './flame-analysis';
import { analyzePotential } from './potential-analysis';
import { analyzeAdditionalPotential } from './additional-analysis';

/**
 * 아이템 데이터를 기반으로 AI 분석 멘트를 생성하는 함수
 * 기존 함수와 100% 동일한 동작을 보장하되, 내부 구조를 모듈화
 */
export function generateItemCommentary(item: any, job?: string): string {
    if (!item) return "아이템 정보를 분석할 수 없습니다.";

    const isMagic = job ? isMagicJob(job) : false;
    const isXenon = job && (job.includes('제논') || job.replace(/\s/g, '').includes('제논'));

    const itemName = item.item_name || '장비';
    const slot = item.item_equipment_slot || '';
    const potentialGrade = item.potential_option_grade || '없음';
    const addPotentialGrade = item.additional_potential_option_grade || '없음';

    // 잠재능력 옵션 리스트
    const potentials = [
        item.potential_option_1,
        item.potential_option_2,
        item.potential_option_3
    ].filter(Boolean);

    // 에디셔널 옵션 리스트
    const addPotentials = [
        item.additional_potential_option_1,
        item.additional_potential_option_2,
        item.additional_potential_option_3
    ].filter(Boolean);

    let comments: string[] = [];

    // === 1. 아이템 분류 및 오프닝 ===
    const classification = classifyItem(itemName, slot);
    const { isLuxury, isEndGameItem, isStarter, openingComment } = classification;
    comments.push(openingComment);

    // 펜살리르 아이템은 교체 권장만 하고 종료
    if (isPensalirItem(itemName)) {
        const deepComments = diagnoseItemDeeply(item, job);
        if (deepComments && deepComments.length > 0) {
            return comments.join(" ") + "\n---\n### 🚀 [진화형 AI] 정밀 진단 리포트\n" + deepComments.join("\n\n");
        }
        return comments.join(" ");
    }

    // 스타터 아이템은 간단한 조언만 제공
    if (isStarter) {
        const starterComments = generateStarterComments();
        comments.push(...starterComments);
        return comments.join(" ");
    }

    // 특수 아이템 처리
    const specialItemConfig = getSpecialItemConfig(itemName);
    if (specialItemConfig) {
        comments.push(`<b>[특수 링]</b> 자체 옵션이 우수한 특수 반지입니다. (스타포스/주문서/잠재 불가능)`);
        comments.push(pick(specialItemConfig.danpungiComments));
    }

    // 특수 반지(시드링) 분석
    const specialRingLevel = item.special_ring_level || 0;
    if (specialRingLevel > 0) {
        comments.push(`<b>[특수 스킬 반지 Lv.${specialRingLevel}]</b>`);
        if (specialRingLevel >= 6) {
            comments.push(pick([
                `6레벨... <b>끝판왕</b>을 영접합니다. ✨ 이 반지만 있으면 무서울 게 없겠네요.`,
                `와... 6레벨 시드링이라니! 보스들이 살려달라고 빌겠는데요?`
            ]));
        } else if (specialRingLevel === 5) {
            comments.push(`와... <b>5레벨</b>?! 진짜 고스펙의 상징입니다. 연마까지 성공하셨군요!`);
        } else if (specialRingLevel === 4) {
            comments.push(`<b>4레벨</b>, 아주 좋습니다! 보스전에서 강력한 화력을 보여주겠군요.`);
        } else if (specialRingLevel === 3) {
            comments.push(`<b>3레벨</b>, 가성비 좋은 선택입니다! 실전에서 충분히 쓸만해요.`);
        } else {
            comments.push(`아직은 입문 단계군요. <b>3레벨 이상</b>을 목표로 해보세요!`);
        }
        return comments.join(" ");
    }

    // === 2. 스타포스 분석 ===
    const starforceComments = analyzeStarforce(item, isEndGameItem, specialItemConfig);
    comments.push(...starforceComments);

    // === 3. 추가옵션 (Flame) 분석 ===
    const flameComments = analyzeFlameOptions(item, isMagic, isEndGameItem);
    comments.push(...flameComments);

    // === 4. 잠재능력 분석 ===
    const isEventRing = EVENT_RING_KEYWORDS.some(k => itemName.includes(k));
    const potentialComments = analyzePotential(
        item,
        potentials,
        potentialGrade,
        isXenon,
        isEndGameItem,
        isEventRing,
        job
    );
    comments.push(...potentialComments);

    // === 5. 에디셔널 잠재능력 분석 ===
    const additionalComments = analyzeAdditionalPotential(
        item,
        addPotentials,
        addPotentialGrade,
        isMagic,
        isXenon,
        job
    );
    comments.push(...additionalComments);

    // === 6. 마무리 ===
    if (comments.length === 0) {
        comments.push(pick([
            "전반적으로 무난한 세팅입니다. 하지만 더 강력해질 여지가 충분히 남아있어요!",
            "나쁘지 않은 장비지만, 조금 더 욕심을 내보셔도 좋을 것 같습니다.",
            "기본기는 갖춰져 있습니다. 이제 디테일을 챙겨볼까요?"
        ]));
    }

    // === 7. 진화형 AI 추가 진단 ===
    const deepComments = diagnoseItemDeeply(item, job);
    if (deepComments && deepComments.length > 0) {
        return comments.join(" ") + "\n---\n### 🚀 [진화형 AI] 정밀 진단 리포트\n" + deepComments.join("\n\n");
    }

    return comments.join(" ");
}
