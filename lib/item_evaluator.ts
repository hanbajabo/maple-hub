import { STARFORCE_SIMULATION_STATS } from './starforce_db';
import { evaluatePotential } from './potential_evaluator';
import { evaluateWeaponFlame, evaluateArmorFlame } from './flame_evaluator';
import { getMaxStarforce } from './config/unified_criteria';
import { isPensalirItem } from './utils/item_classifier';
import { WEAPON_STARFORCE, ARMOR_STARFORCE, SPECIAL_STARFORCE } from './config/evaluation_criteria';
import { getSpecialItemConfig } from './config/special_items';

export type { PotentialEvaluation } from './potential_evaluator';
export type { FlameEvaluation } from './flame_evaluator';

export interface ItemEvaluationResult {
    starforce: StarforceEvaluation;
    potential: import('./potential_evaluator').PotentialEvaluation;
    additional_potential: import('./potential_evaluator').PotentialEvaluation;
    flame: import('./flame_evaluator').FlameEvaluation;
    summary: string;
}

export interface StarforceEvaluation {
    current_star: number;
    target_star: number;
    success_rate: number;
    destroy_risk: number;
    avg_destroy_count: number;
    evaluation: '신화' | '전설' | '종결' | '졸업' | '최고' | '훌륭' | '좋음' | '준수' | '보통' | '쓸만함' | '기본' | '아쉬움' | '부족' | '위험' | '매우 위험' | '안전';
    recommendation: string;
}

export function evaluateStarforce(
    currentStar: number,
    targetStar: number = 22,
    itemName: string = '',
    level: number = 200,
    isAmazingEnhancement: boolean = false
): StarforceEvaluation {
    // 🎯 특수 아이템 체크 (스타포스 불가)
    const specialItemConfig = getSpecialItemConfig(itemName);
    if (specialItemConfig?.skipSections?.starforce) {
        return {
            current_star: 0,
            target_star: 0,
            success_rate: 0,
            destroy_risk: 0,
            avg_destroy_count: 0,
            evaluation: '안전',
            recommendation: '이 아이템은 스타포스 강화가 불가능한 특수 아이템입니다.'
        };
    }

    // 데스티니 무기 특별 처리 (전설)
    if (itemName.includes('데스티니')) {
        return {
            current_star: 22,
            target_star: 22,
            success_rate: 100,
            destroy_risk: 0,
            avg_destroy_count: 0,
            evaluation: '전설',
            recommendation: '데스티니 무기는 진정한 종결 무기입니다. 전설적인 위용을 자랑합니다.'
        };
    }

    // 제네시스 무기 특별 처리 (졸업)
    if (itemName.includes('제네시스')) {
        return {
            current_star: 22,
            target_star: 22,
            success_rate: 100,
            destroy_risk: 0,
            avg_destroy_count: 0,
            evaluation: '졸업',
            recommendation: '제네시스 무기는 파괴되지 않으며 22성 고정입니다. 졸업급 스펙입니다.'
        };
    }

    // 놀장강 아이템 특별 처리 (무기)
    if (isAmazingEnhancement) {
        let evaluation: StarforceEvaluation['evaluation'] = '아쉬움';
        let recommendation = '';

        if (currentStar >= 12) {
            evaluation = '최고';
            recommendation = `${currentStar}성! 놀장강 12성은 22성급 효율을 냅니다. 최고 등급입니다.`;
        } else if (currentStar >= 10) {
            evaluation = '좋음';
            recommendation = `${currentStar}성! 놀장강 10성은 20성급 이상의 효율입니다. 좋은 성능입니다.`;
        } else if (currentStar >= 5) {
            evaluation = '보통';
            recommendation = `${currentStar}성! 놀장강 5성은 17성급 효율입니다. 보통 수준입니다.`;
        } else {
            evaluation = '아쉬움';
            recommendation = `${currentStar}성. 놀장강 아이템은 5성 이상 강화해야 17성급 효율이 나옵니다.`;
        }

        return {
            current_star: currentStar,
            target_star: 12,
            success_rate: 0,
            destroy_risk: 0,
            avg_destroy_count: 0,
            evaluation,
            recommendation
        };
    }

    // 펜살리르/우트가르드 무기 특별 처리
    if (isPensalirItem(itemName)) {
        return {
            current_star: currentStar,
            target_star: 17,
            success_rate: 0,
            destroy_risk: 0,
            avg_destroy_count: 0,
            evaluation: '부족',
            recommendation: '[긴급 경고] 우트가르드(펜살리르) 무기는 성능이 매우 부족합니다. 본캐용이라면 즉시 아케인셰이드 무기로 교체하세요.'
        };
    }

    const stats = STARFORCE_SIMULATION_STATS.find(s => s.target_star === targetStar);
    const maxSf = getMaxStarforce(level);

    let evaluation: StarforceEvaluation['evaluation'] = '아쉬움';
    let recommendation = '';

    if (currentStar >= 26) {
        evaluation = '신화';
        recommendation = `${currentStar}성! 신화적인 경지입니다. 서버에 기록될 역사적인 아이템입니다.`;
    } else if (currentStar === 25) {
        evaluation = '전설';
        recommendation = `${currentStar}성! 전설적인 스펙입니다. 메이플 월드의 지배자입니다.`;
    } else if (currentStar === 24) {
        evaluation = '종결';
        recommendation = `${currentStar}성! 종결급 스펙입니다. 더 이상 바랄 게 없습니다.`;
    } else if (currentStar === 23) {
        evaluation = '졸업';
        recommendation = `${currentStar}성! 졸업급 스펙입니다. 엔드 컨텐츠를 즐기기에 충분합니다.`;
    } else if (currentStar === 22) {
        evaluation = '최고';
        recommendation = `${currentStar}성! 최고의 성능입니다. 22성은 고스펙의 상징입니다.`;
    } else if (currentStar >= 20) {
        evaluation = '좋음';
        recommendation = `${currentStar}성! 좋은 성능입니다. 상위 컨텐츠 진입이 가능합니다.`;
    } else if (currentStar >= 18) {
        evaluation = '준수';
        recommendation = `${currentStar}성! 준수한 성능입니다.`;
    } else if (currentStar === 17) {
        evaluation = '보통';
        recommendation = `${currentStar}성! 보통 수준의 국민 세팅입니다.`;
    } else if (currentStar >= 15) {
        evaluation = '쓸만함';
        recommendation = `${currentStar}성! 쓸만한 성능입니다. 17성을 목표로 해보세요.`;
    } else if (currentStar >= 12) {
        evaluation = '기본';
        recommendation = `${currentStar}성! 기본적인 강화는 되어 있습니다.`;
    } else {
        evaluation = '아쉬움';
        recommendation = `${currentStar}성. 스타포스 수치가 아쉽습니다. 강화를 통해 스펙업을 노려보세요.`;
    }

    // 최대 강화 수치 도달 시 멘트 조정
    if (currentStar >= maxSf && maxSf < 22) {
        recommendation = `${currentStar}성(최대치)입니다. 더 높은 스펙을 원하시면 상위 레벨 장비로 교체하세요.`;
    }

    return {
        current_star: currentStar,
        target_star: targetStar,
        success_rate: 0,
        destroy_risk: (100 - (stats?.no_destroy_probability ?? 0)),
        avg_destroy_count: stats?.average_destroy_count ?? 0,
        evaluation,
        recommendation
    };
}

export function evaluateArmorStarforce(
    currentStar: number,
    level: number = 200,
    itemName: string = '',
    isAmazingEnhancement: boolean = false
): StarforceEvaluation {
    // 🎯 특수 아이템 체크 (스타포스 불가)
    const specialItemConfig = getSpecialItemConfig(itemName);
    if (specialItemConfig?.skipSections?.starforce) {
        return {
            current_star: 0,
            target_star: 0,
            success_rate: 0,
            destroy_risk: 0,
            avg_destroy_count: 0,
            evaluation: '안전',
            recommendation: '이 아이템은 스타포스 강화가 불가능한 특수 아이템입니다.'
        };
    }

    let evaluation: StarforceEvaluation['evaluation'] = '아쉬움';
    let recommendation = '';

    const maxSf = getMaxStarforce(level);

    // 놀장강 아이템 특별 처리 (방어구/장신구)
    if (isAmazingEnhancement) {
        if (currentStar >= 12) {
            evaluation = '최고';
            recommendation = `${currentStar}성! 놀장강 12성은 22성급 효율을 냅니다. 최고 등급입니다.`;
        } else if (currentStar >= 10) {
            evaluation = '좋음';
            recommendation = `${currentStar}성! 놀장강 10성은 20성급 이상의 효율입니다. 좋은 성능입니다.`;
        } else if (currentStar >= 5) {
            evaluation = '보통';
            recommendation = `${currentStar}성! 놀장강 5성은 17성급 효율입니다. 보통 수준입니다.`;
        } else {
            evaluation = '아쉬움';
            recommendation = `${currentStar}성. 놀장강 아이템은 5성 이상 강화해야 17성급 효율이 나옵니다.`;
        }

        return {
            current_star: currentStar,
            target_star: 12,
            success_rate: 0,
            destroy_risk: 0,
            avg_destroy_count: 0,
            evaluation,
            recommendation
        };
    }

    // 로얄 블랙메탈 숄더 특별 처리: 12성을 목표로 함
    if (itemName.includes('로얄 블랙메탈 숄더')) {
        const targetStar = SPECIAL_STARFORCE.ROYAL_BLACK_METAL_SHOULDER;
        if (currentStar >= targetStar) {
            evaluation = '기본';
            recommendation = `${currentStar}성! 로얄 블랙메탈 숄더는 거쳐가는 장비입니다. ${targetStar}성이면 충분하며, 앱솔랩스나 아케인셰이드 견장으로 교체하세요.`;
        } else {
            evaluation = '아쉬움';
            recommendation = `현재 ${currentStar}성입니다. 가성비 좋게 ${targetStar}성까지만 강화해서 쓰다가 상위 견장으로 교체하는 것을 추천합니다.`;
        }
        return {
            current_star: currentStar,
            target_star: targetStar,
            success_rate: 0,
            destroy_risk: 0,
            avg_destroy_count: 0,
            evaluation,
            recommendation
        };
    }

    // 타일런트 장비 특별 처리 (슈페리얼 등급)
    if (itemName.includes('타일런트') || itemName.includes('히아데스')) {
        if (currentStar >= 12) {
            evaluation = '최고';
            recommendation = `${currentStar}성! 타일런트 12성은 22성급 성능입니다. 최고 등급입니다.`;
        } else if (currentStar >= 10) {
            evaluation = '좋음';
            recommendation = `${currentStar}성! 타일런트 10성은 20성급 성능입니다. 좋은 성능입니다.`;
        } else if (currentStar >= 5) {
            evaluation = '보통';
            recommendation = `${currentStar}성! 타일런트 5성은 17성급 효율입니다. 보통 수준입니다.`;
        } else {
            evaluation = '아쉬움';
            recommendation = `${currentStar}성! 슈페리얼 아이템은 5성 이상 강화해야 진가를 발휘합니다.`;
        }

        return {
            current_star: currentStar,
            target_star: 12,
            success_rate: 0,
            destroy_risk: 0,
            avg_destroy_count: 0,
            evaluation,
            recommendation
        };
    }

    // 펜살리르 장비 특별 처리
    if (itemName.includes('펜살리르')) {
        const isHatOverall = itemName.includes('모자') || itemName.includes('한벌옷');

        if (isHatOverall) {
            evaluation = '아쉬움';
            recommendation = `[교체 권장] 펜살리르 장비는 성능이 좋지 않습니다. 루타비스(카루타) 세트로 교체하는 것을 강력히 권장합니다.`;
        } else {
            evaluation = '아쉬움';
            recommendation = `[교체 추천] 펜살리르 장비보다 앱솔랩스/아케인셰이드 장비가 훨씬 좋습니다. 교체를 고려해보세요.`;
        }

        return {
            current_star: currentStar,
            target_star: 17,
            success_rate: 0,
            destroy_risk: 0,
            avg_destroy_count: 0,
            evaluation,
            recommendation
        };
    }

    if (currentStar >= 26) {
        evaluation = '신화';
        recommendation = `${currentStar}성! 신화적인 경지입니다. 서버에 기록될 역사적인 아이템입니다.`;
    } else if (currentStar === 25) {
        evaluation = '전설';
        recommendation = `${currentStar}성! 전설적인 스펙입니다. 메이플 월드의 지배자입니다.`;
    } else if (currentStar === 24) {
        evaluation = '종결';
        recommendation = `${currentStar}성! 종결급 스펙입니다. 더 이상 바랄 게 없습니다.`;
    } else if (currentStar === 23) {
        evaluation = '졸업';
        recommendation = `${currentStar}성! 졸업급 스펙입니다. 엔드 컨텐츠를 즐기기에 충분합니다.`;
    } else if (currentStar === 22) {
        evaluation = '최고';
        recommendation = `${currentStar}성! 최고의 성능입니다. 22성은 고스펙의 상징입니다.`;
    } else if (currentStar >= 20) {
        evaluation = '좋음';
        recommendation = `${currentStar}성! 좋은 성능입니다. 상위 컨텐츠 진입이 가능합니다.`;
    } else if (currentStar >= 18) {
        evaluation = '준수';
        recommendation = `${currentStar}성! 준수한 성능입니다.`;
    } else if (currentStar === 17) {
        evaluation = '보통';
        recommendation = `${currentStar}성! 보통 수준의 국민 세팅입니다.`;
    } else if (currentStar >= 15) {
        evaluation = '쓸만함';
        recommendation = `${currentStar}성! 쓸만한 성능입니다. 17성을 목표로 해보세요.`;
    } else if (currentStar >= 12) {
        evaluation = '기본';
        recommendation = `${currentStar}성! 기본적인 강화는 되어 있습니다.`;
    } else {
        evaluation = '아쉬움';
        recommendation = `${currentStar}성. 스타포스 수치가 아쉽습니다. 강화를 통해 스펙업을 노려보세요.`;
    }

    // 최대 강화 수치 도달 시 멘트 조정
    if (currentStar >= maxSf && maxSf < 22) {
        recommendation = `${currentStar}성(최대치)입니다. 더 높은 스펙을 원하시면 상위 레벨 장비로 교체하세요.`;
    }

    return {
        current_star: currentStar,
        target_star: 22,
        success_rate: 0,
        destroy_risk: 0,
        avg_destroy_count: 0,
        evaluation,
        recommendation
    };
}

export { evaluatePotential, evaluateWeaponFlame, evaluateArmorFlame };
