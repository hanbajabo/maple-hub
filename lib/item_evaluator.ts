import { STARFORCE_SIMULATION_STATS } from './starforce_db';
import { evaluatePotential } from './potential_evaluator';
import { evaluateWeaponFlame, evaluateArmorFlame } from './flame_evaluator';
import { getMaxStarforce } from './diagnosis/equipment';
import { isPensalirItem } from './utils/item_classifier';
import { WEAPON_STARFORCE, ARMOR_STARFORCE, SPECIAL_STARFORCE } from './config/evaluation_criteria';

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
    evaluation: '종결' | '최고' | '훌륭' | '좋음' | '준수' | '보통' | '부족' | '위험' | '매우 위험' | '안전';
    recommendation: string;
}

export function evaluateStarforce(
    currentStar: number,
    targetStar: number = 22,
    itemName: string = '',
    level: number = 200
): StarforceEvaluation {
    if (itemName.includes('제네시스')) {
        return {
            current_star: 22,
            target_star: 22,
            success_rate: 100,
            destroy_risk: 0,
            avg_destroy_count: 0,
            evaluation: '종결',
            recommendation: '제네시스 무기는 파괴되지 않으며 22성 고정입니다. 완벽합니다.'
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

    let evaluation: StarforceEvaluation['evaluation'] = '위험';

    if (currentStar >= maxSf) {
        evaluation = '종결';
    } else if (currentStar >= WEAPON_STARFORCE.ENDGAME) evaluation = '종결';
    else if (currentStar >= 21) evaluation = '훌륭';
    else if (currentStar >= 18) evaluation = '준수';
    else if (currentStar >= WEAPON_STARFORCE.STANDARD) evaluation = '보통';

    let recommendation = '';
    if (currentStar >= maxSf) {
        if (maxSf < WEAPON_STARFORCE.ENDGAME) {
            recommendation = `현재 ${currentStar}성(최대치)입니다. 더 높은 스펙을 원하시면 상위 레벨 장비로 교체하세요.`;
        } else {
            recommendation = '이미 목표에 도달했습니다.';
        }
    } else if (currentStar >= WEAPON_STARFORCE.ENDGAME) {
        recommendation = '이미 목표에 도달했습니다.';
    } else {
        recommendation = `${WEAPON_STARFORCE.ENDGAME}성 도달까지 평균 ${stats?.average_destroy_count.toFixed(2)}회의 파괴가 예상됩니다. 여분의 아이템을 준비하세요.`;
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
    itemName: string = ''
): StarforceEvaluation {
    let evaluation: StarforceEvaluation['evaluation'] = '부족';
    let recommendation = '';

    const maxSf = getMaxStarforce(level);

    // 로얄 블랙메탈 숄더 특별 처리: 12성을 목표로 함
    if (itemName.includes('로얄 블랙메탈 숄더')) {
        const targetStar = SPECIAL_STARFORCE.ROYAL_BLACK_METAL_SHOULDER;
        if (currentStar >= targetStar) {
            evaluation = '좋음';
            recommendation = `${currentStar}성! 로얄 블랙메탈 숄더는 거쳐가는 장비입니다. ${targetStar}성이면 충분하며, 앱솔랩스나 아케인셰이드 견장으로 교체하세요.`;
        } else {
            evaluation = '부족';
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

    // 펜살리르 장비 특별 처리
    if (itemName.includes('펜살리르')) {
        const isHatOverall = itemName.includes('모자') || itemName.includes('한벌옷');

        if (isHatOverall) {
            evaluation = '부족';
            recommendation = `[교체 권장] 펜살리르 장비는 성능이 좋지 않습니다. 루타비스(카루타) 세트로 교체하는 것을 강력히 권장합니다.`;
        } else {
            evaluation = '부족';
            recommendation = `[교체 추천] 펜살리르 장비보다 앱솔랩스/아케인셰이드 장비가 훨씬 좋습니다. 교체를 고려해보세요.`;
        }

        return {
            current_star: currentStar,
            target_star: 17, // 펜살리르는 보통 17성까지 안 가지만 형식상
            success_rate: 0,
            destroy_risk: 0,
            avg_destroy_count: 0,
            evaluation,
            recommendation
        };
    }

    if (currentStar >= maxSf) {
        if (maxSf < 15) {
            evaluation = '보통'; // 낮은 레벨 장비 풀강은 '보통' 정도로 평가 (거쳐가는 용도)

            // 부위별 추천 아이템 제시
            let upgradeRecommendation = '';
            if (itemName.includes('마크') || itemName.includes('얼굴')) {
                upgradeRecommendation = ' (예: 트와일라이트 마크)';
            } else if (itemName.includes('눈장식')) {
                upgradeRecommendation = ' (예: 블랙빈 마크, 파풀라투스 마크)';
            } else if (itemName.includes('이어링') || itemName.includes('귀고리')) {
                upgradeRecommendation = ' (예: 에스텔라 이어링)';
            } else if (itemName.includes('펜던트')) {
                upgradeRecommendation = ' (예: 도미네이터 펜던트, 데이브레이크 펜던트)';
            } else if (itemName.includes('링') || itemName.includes('반지')) {
                upgradeRecommendation = ' (예: 가디언 엔젤링)';
            } else if (itemName.includes('견장') || itemName.includes('어깨')) {
                upgradeRecommendation = ' (예: 앱솔랩스 견장, 아케인셰이드 견장)';
            } else if (itemName.includes('벨트') || itemName.includes('허리')) {
                upgradeRecommendation = ' (예: 골든 클로버 벨트, 분노한 자쿰의 벨트)';
            } else if (itemName.includes('슈즈') || itemName.includes('신발')) {
                upgradeRecommendation = ' (예: 앱솔랩스 슈즈, 아케인셰이드 슈즈)';
            } else if (itemName.includes('케이프') || itemName.includes('망토')) {
                upgradeRecommendation = ' (예: 앱솔랩스 케이프, 아케인셰이드 케이프)';
            } else if (itemName.includes('상의') || itemName.includes('하의') || itemName.includes('모자') || itemName.includes('장갑')) {
                upgradeRecommendation = ' (예: 앱솔랩스, 아케인셰이드)';
            }

            recommendation = `${currentStar}성(최대치)입니다. 유니온/링크용으로 적합하며, 더 높은 스펙을 위해서는 상위 레벨 아이템으로 교체를 권장합니다${upgradeRecommendation}.`;
        } else if (maxSf < 22) {
            evaluation = '종결';
            recommendation = `${currentStar}성(최대치)입니다. 이 장비의 한계까지 강화하셨습니다.`;
        } else {
            // 25성 한계인 경우 (기존 로직 유지)
            if (currentStar >= 22) {
                evaluation = '종결';
                recommendation = '22성! 진짜 좋은 스타포스 수치입니다. 졸업급 스펙입니다.';
            } else if (currentStar >= 17) {
                evaluation = '보통';
                recommendation = '17성! 국민 스타포스 세팅입니다.';
            } else {
                evaluation = '부족';
                recommendation = '17성 미만입니다. 스타포스 강화를 통해 스펙업을 노려보세요.';
            }
        }
    } else if (currentStar >= 28) {
        evaluation = '종결';
        recommendation = '28성 이상! 하이엔드급 끝판왕 현존 최고 스펙입니다. 경이롭습니다!';
    } else if (currentStar === 27) {
        evaluation = '최고';
        recommendation = '27성! 전 서버를 통틀어도 손에 꼽히는 신의 경지입니다.';
    } else if (currentStar === 26) {
        evaluation = '최고';
        recommendation = '26성! 기적에 가까운 강화 성공! 압도적인 위용을 자랑합니다.';
    } else if (currentStar === 25) {
        evaluation = '종결';
        recommendation = '25성! 메이플 월드의 진정한 지배자다운 스펙입니다.';
    } else if (currentStar === 24) {
        evaluation = '종결';
        recommendation = '24성! 누구나 우러러볼 만한 초월적인 경지입니다.';
    } else if (currentStar >= 23) {
        evaluation = '훌륭';
        recommendation = '23성 이상! 엔드스펙을 향한 위대한 도약입니다.';
    } else if (currentStar === 22) {
        evaluation = '좋음';
        recommendation = '22성! 진짜 좋은 스타포스 수치입니다. 졸업급 스펙입니다.';
    } else if (currentStar >= 20) {
        evaluation = '좋음';
        recommendation = '20성 이상! 상당히 강력한 장비입니다.';
    } else if (currentStar >= 18) {
        evaluation = '준수';
        recommendation = '18성! 준수한 성능을 발휘합니다.';
    } else if (currentStar === 17) {
        evaluation = '보통';
        recommendation = '17성! 국민 스타포스 세팅입니다.';
    } else {
        if (maxSf < 17) {
            evaluation = '부족';
            recommendation = `현재 ${currentStar}성입니다. 최대 ${maxSf}성까지 강화 가능합니다.`;
        } else {
            evaluation = '부족';
            recommendation = '17성 미만입니다. 스타포스 강화를 통해 스펙업을 노려보세요.';
        }
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
