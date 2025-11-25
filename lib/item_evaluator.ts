import { STARFORCE_SIMULATION_STATS } from './starforce_db';
import { evaluatePotential } from './potential_evaluator';
import { evaluateWeaponFlame, evaluateArmorFlame } from './flame_evaluator';

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
    itemName: string = ''
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

    const stats = STARFORCE_SIMULATION_STATS.find(s => s.target_star === targetStar);

    let evaluation: StarforceEvaluation['evaluation'] = '위험';
    if (currentStar >= 22) evaluation = '종결';
    else if (currentStar >= 21) evaluation = '훌륭';
    else if (currentStar >= 18) evaluation = '준수';
    else if (currentStar >= 17) evaluation = '보통';

    return {
        current_star: currentStar,
        target_star: targetStar,
        success_rate: 0,
        destroy_risk: (100 - (stats?.no_destroy_probability ?? 0)),
        avg_destroy_count: stats?.average_destroy_count ?? 0,
        evaluation,
        recommendation: currentStar >= 22
            ? '이미 목표에 도달했습니다.'
            : `22성 도달까지 평균 ${stats?.average_destroy_count.toFixed(2)}회의 파괴가 예상됩니다. 여분의 아이템을 준비하세요.`
    };
}

export function evaluateArmorStarforce(
    currentStar: number
): StarforceEvaluation {
    let evaluation: StarforceEvaluation['evaluation'] = '부족';
    let recommendation = '';

    if (currentStar >= 28) {
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
        evaluation = '부족';
        recommendation = '17성 미만입니다. 스타포스 강화를 통해 스펙업을 노려보세요.';
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
