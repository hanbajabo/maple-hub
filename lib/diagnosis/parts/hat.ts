import { GRADE_SCORE } from '../../../src/data/diagnosisData';
import { diagnoseEpicPotential, checkPensalirAndWarn } from './common';

/**
 * 🎩 모자(Hat) 전용 진단 로직
 * - 쿨타임 감소(CD) 가치 평가 (최우선)
 * - 에테르넬 vs 파프니르 vs 아케인 비교 (메타 분석)
 * - 스타포스 및 잠재능력 정밀 진단
 */
export function diagnoseHat(item: any, job?: string): string[] {
    const comments: string[] = [];
    const itemName = item.item_name || "";
    const starforce = parseInt(item.starforce || "0");
    const potentialGrade = item.potential_option_grade;
    const potentials = [item.potential_option_1, item.potential_option_2, item.potential_option_3];
    const adiLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3];

    // 🚨 펜살리르 체크 - 펜살리르면 여기서 종료
    const pensalirWarning = checkPensalirAndWarn(itemName, 'armor');
    if (pensalirWarning) return pensalirWarning;

    // 1. 쿨타임 감소 (Cooldown Reduction) - 모자의 핵심
    let coolReduce = 0;
    let hasAdiCoolReduce = false;

    // 윗잠 쿨감 계산
    potentials.forEach(l => {
        if (l && l.includes("재사용 대기시간")) {
            const match = l.match(/(\d+)초/);
            if (match) coolReduce += parseInt(match[1]);
        }
    });

    // 에디 쿨감 계산
    adiLines.forEach(l => {
        if (l && l.includes("재사용 대기시간")) {
            const match = l.match(/(\d+)초/);
            if (match) {
                coolReduce += parseInt(match[1]);
                hasAdiCoolReduce = true;
            }
        }
    });

    if (coolReduce >= 6) {
        comments.push(`[신화급: 3쿨감] 쿨타임 감소 <b>-${coolReduce}초</b>! 이건 종결을 넘어선 <b>신화급</b> 아이템입니다. 전 서버를 통틀어도 보기 힘든 기적의 옵션입니다.`);
    } else if (coolReduce >= 4) {
        comments.push(`[종결: 쌍쿨감] 쿨타임 감소 <b>-${coolReduce}초</b>! 직업에 따라서는 주스탯 수만급 효율을 내는 최상급 모자입니다.`);
    } else if (coolReduce >= 2) {
        // 쿨감 + 주스탯 체크
        const hasStat = potentials.some(l => l && (l.includes("올스탯") || l.includes("STR") || l.includes("DEX") || l.includes("INT") || l.includes("LUK")));
        if (hasStat) {
            comments.push(`[졸업: 쿨감+스탯] 쿨감 <b>-${coolReduce}초</b>에 주스탯까지 챙긴 <b>실전 종결급</b> 모자입니다.`);
        } else {
            comments.push(`[고효율: 쿨감] 쿨타임 감소 <b>-${coolReduce}초</b>는 직업에 따라 주스탯 30% 이상의 가치를 가질 수 있습니다. 1순위 옵션입니다.`);
        }
    } else if (potentialGrade === "레전드리") {
        // 레전드리인데 쿨감이 없는 경우
        comments.push(`[옵션 아쉬움] 레전드리 모자지만 <b>쿨타임 감소</b> 옵션이 없습니다. (직업에 따라 쿨감이 필수일 수 있습니다)`);
    } else if (potentialGrade === '에픽') {
        const epicComments = diagnoseEpicPotential(potentialGrade, potentials);
        comments.push(...epicComments);
    }

    // 에디셔널 쿨감 별도 언급
    if (hasAdiCoolReduce) {
        comments.push(`[에디셔널 유효] 에디셔널 잠재능력에서 <b>쿨타임 감소</b>를 챙기셨군요! 굉장히 희귀하고 좋은 유효 옵션입니다.`);
    }

    // 2. 아이템 종류별 메타 분석 (Meta Analysis)
    if (itemName.includes("에테르넬")) {
        // 에테르넬 (250제)
        if (starforce >= 21) {
            comments.push(`[최종 졸업] <b>21성</b> 이상 에테르넬 모자는 파프니르의 시대를 끝낼 유일한 대항마입니다. 압도적인 깡스펙을 자랑합니다.`);
        } else if (starforce >= 17) {
            comments.push(`[차세대 종결템] 파프니르 4세트를 포기하더라도, 자체 체급과 에테르넬 세트 효과로 충분히 강력합니다.`);
        }
    } else if (itemName.includes("하이네스")) {
        // 파프니르 (150제) - 뚝배기
        if (starforce >= 22) {
            comments.push(`[가성비의 제왕] 해방 후에도 <b>'파프니르 4세트(보공 30%)'</b>를 챙기는 천재적인 세팅입니다. 에테르넬 전까지 현역 최강입니다.`);
        } else if (starforce >= 17) {
            comments.push(`[국민 세팅] 카루타 세트 효과를 챙기는 가장 무난하고 효율적인 선택입니다.`);
        }
    } else if (itemName.includes("아케인셰이드")) {
        // 아케인 (200제)
        if (starforce >= 22) {
            comments.push(`[애매한 포지션] 성능은 확실하지만, 파프니르(보공30%)나 에테르넬(깡스펙)에 비해 세트 효과 효율이 아쉬울 수 있습니다.`);
        }
    } else if (itemName.includes("앱솔랩스")) {
        // 앱솔 (160제)
        if (starforce >= 22) {
            comments.push(`[가성비 고스펙] <b>22성</b> 앱솔 모자는 훌륭하지만, 해방 후 세트 효과 구성에서 파프니르에게 밀릴 수 있습니다.`);
        }
    }

    // 5. 일반 성장 구간 진단 (Low Starforce)
    if (starforce >= 10 && starforce <= 12) {
        comments.push(`[입문 단계] 유니온/링크 육성용 혹은 임시 거쳐가는 단계입니다. 본캐라면 <b>17성</b>을 목표로 하세요.`);
    } else if (starforce < 10) {
        comments.push(`[강화 필요] 스타포스가 부족합니다. 최소 <b>10성</b>은 맞춰주세요.`);
    }

    // 3. 에디셔널 잠재능력 (Additional Potential)
    const adiGrade = item.additional_potential_option_grade;
    if (potentialGrade === "레전드리" && (!adiGrade || adiGrade === "레어")) {
        const hasAtt = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")));
        if (!hasAtt) comments.push(`[속 빈 강정] 윗잠은 레전드리지만 에디셔널이 부실합니다. 에디 공/마를 챙겨주세요.`);
    }

    // 4. 추옵 (Flame)
    // 모자는 깡추옵이 중요
    const addOpts = item.item_add_option || {};
    const addStat = Math.max(
        parseInt(addOpts.str || "0"),
        parseInt(addOpts.dex || "0"),
        parseInt(addOpts.int || "0"),
        parseInt(addOpts.luk || "0")
    );
    const addAllStat = parseInt(addOpts.all_stat || "0");
    const score = addStat + (addAllStat * 10);

    if (score >= 200) comments.push(`[신화급 추옵] <b>${score}급</b>...?! 이건 운영자가 실수로 만든 게 분명합니다. 전 서버급 1티어 추옵입니다.`);
    else if (score >= 180) comments.push(`[초월급 추옵] <b>${score}급</b>! 에테르넬의 품격에 걸맞은 압도적인 추옵입니다.`);
    else if (score >= 160) comments.push(`[종결급 추옵] <b>${score}급</b>! 더 이상 바랄 게 없는 완벽한 추옵입니다.`);
    else if (score >= 130) comments.push(`[극추옵] 모자에 <b>${score}급</b> 추옵은 정말 보기 드뭅니다. 평생 쓰셔도 됩니다.`);
    else if (score >= 100) comments.push(`[고추옵] <b>${score}급</b>으로 훌륭합니다.`);

    return comments;
}
