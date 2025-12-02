import { GRADE_SCORE } from '../../../src/data/diagnosisData';
import { diagnoseEpicPotential, checkPensalirAndWarn } from './common';
import { getJobMainStat } from '../../job_utils';
import { diagnoseScroll } from './scroll';
import { parsePotentialLines, evaluatePotential, evaluateAdditional } from '../../utils/potential_utils';

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

    // 0. 주문서 작 진단 (Scroll)
    const scrollComments = diagnoseScroll(item);
    comments.push(...scrollComments);

    // 1. 잠재능력 (Potential) - 쿨타임 감소 및 주스탯 정밀 진단
    // 유틸을 사용하여 잠재능력 파싱
    const parsed = parsePotentialLines(potentials, job);
    const coolReduce = parsed.cooldown;
    const statPct = parsed.statPct + parsed.allStatPct; // 올스탯은 주스탯과 동일 효율로 계산

    // 에디셔널 쿨감 체크 (기존 로직 유지)
    let hasAdiCoolReduce = false;
    adiLines.forEach(l => {
        if (l && l.includes("재사용 대기시간")) {
            const match = l.match(/(\d+)초/);
            if (match) {
                // 에디 쿨감은 별도 변수로 관리 (메인 쿨감과 합치지 않음)
                hasAdiCoolReduce = true;
            }
        }
    });

    if (coolReduce >= 6) {
        comments.push(`[신화급: 3쿨감] 쿨타임 감소 <b>-${coolReduce}초</b>! 이건 종결을 넘어선 <b>신화급</b> 아이템입니다. 전 서버를 통틀어도 보기 힘든 기적의 옵션입니다.`);
    } else if (coolReduce >= 4) {
        comments.push(`[종결: 쌍쿨감] 쿨타임 감소 <b>-${coolReduce}초</b>! 직업에 따라서는 주스탯 수만급 효율을 내는 최상급 모자입니다.`);
    } else if (coolReduce >= 2) {
        if (statPct > 0) {
            comments.push(`[졸업: 쿨감+스탯] 쿨감 <b>-${coolReduce}초</b>에 주스탯 <b>${Math.floor(statPct)}%</b>까지 챙긴 <b>실전 종결급</b> 모자입니다.`);
        } else {
            comments.push(`[고효율: 쿨감] 쿨타임 감소 <b>-${coolReduce}초</b>는 직업에 따라 주스탯 30% 이상의 가치를 가질 수 있습니다. 1순위 옵션입니다.`);
        }
    } else {
        // 쿨감이 없는 경우: 주스탯 정밀 진단 수행
        const evalResult = evaluatePotential(item.item_base_option?.base_equipment_level || 150, potentialGrade, parsed);

        if (potentialGrade === '레전드리') {
            if (evalResult.statPct >= 30) {
                // 주스탯이 높으면 쿨감 없어도 칭찬
                comments.push(evalResult.message);
                comments.push(`(참고: 직업에 따라 쿨타임 감소 옵션이 더 좋을 수 있습니다)`);
            } else {
                // 주스탯도 낮으면 쿨감 부재 언급
                comments.push(`[옵션 아쉬움] 레전드리 모자지만 <b>쿨타임 감소</b>가 없고 주스탯도 낮습니다. 쿨감이나 고스펙 주스탯을 노려보세요.`);
            }
        } else if (potentialGrade === '유니크') {
            comments.push(evalResult.message);
        } else if (potentialGrade === '에픽') {
            const epicComments = diagnoseEpicPotential(potentialGrade, potentials, job);
            comments.push(...epicComments);
        }
    }

    // 에디셔널 쿨감 별도 언급
    if (hasAdiCoolReduce) {
        comments.push(`[에디셔널 유효] 에디셔널 잠재능력에서 <b>쿨타임 감소</b>를 챙기셨군요! 굉장히 희귀하고 좋은 유효 옵션입니다.`);
    }

    // 2. 아이템 종류별 메타 분석 (Meta Analysis)
    if (itemName.includes("에테르넬")) {
        // 에테르넬 (250제)
        if (starforce >= 25) {
            comments.push(`[신화의 경지] <b>${starforce}성</b> 에테르넬...?! 이건 메이플스토리의 역사를 새로 쓰는 아이템입니다. 전 서버 유일무이한 스펙일 수 있습니다.`);
        } else if (starforce === 24) {
            comments.push(`[초월적 스펙] <b>24성</b> 에테르넬 모자라니... 운영자도 놀랄만한 기적의 아이템입니다.`);
        } else if (starforce === 23) {
            comments.push(`[전설의 시작] <b>23성</b> 에테르넬 모자는 그 자체로 하나의 전설입니다. 압도적인 위용을 자랑합니다.`);
        } else if (starforce === 22) {
            comments.push(`[완벽한 졸업] <b>22성</b> 에테르넬 모자는 파프니르의 시대를 끝낼 유일한 대항마입니다. 더 이상 바랄 게 없는 최종 종결템입니다.`);
        } else if (starforce === 21) {
            comments.push(`[해방급 스펙] <b>21성</b> 에테르넬 모자는 매우 훌륭한 선택입니다. 22성을 도전할지 고민되시겠군요.`);
        } else if (starforce >= 17) {
            comments.push(`[차세대 종결템] 파프니르 4세트를 포기하더라도, 자체 체급과 에테르넬 세트 효과로 충분히 강력합니다.`);
        }
    } else if (itemName.includes("하이네스")) {
        // 파프니르 (150제) - 뚝배기
        if (starforce >= 25) {
            comments.push(`[전설의 뚝배기] <b>${starforce}성</b> 파프니르...?! 이 정도면 에테르넬도 부럽지 않은 괴물 같은 성능입니다.`);
        } else if (starforce === 24) {
            comments.push(`[기적의 강화] <b>24성</b> 파프니르 모자! 수많은 파괴를 딛고 탄생한 역작입니다.`);
        } else if (starforce === 23) {
            comments.push(`[초고스펙] <b>23성</b> 파프니르 모자는 가성비와 성능의 정점입니다. 평생 쓰셔도 됩니다.`);
        } else if (starforce === 22) {
            comments.push(`[가성비의 제왕] <b>22성</b> 파프니르 모자는 해방 후에도 4세트 효과(보공 30%)를 챙기는 천재적인 세팅입니다. 에테르넬 전까지 현역 최강입니다.`);
        } else if (starforce === 21) {
            comments.push(`[고효율 세팅] <b>21성</b> 파프니르 모자는 가성비가 매우 좋습니다. 22성을 도전해볼 만한 가치가 있습니다.`);
        } else if (starforce >= 17) {
            comments.push(`[국민 세팅] 카루타 세트 효과를 챙기는 가장 무난하고 효율적인 선택입니다.`);
        }
    } else if (itemName.includes("아케인셰이드")) {
        // 아케인 (200제)
        if (starforce >= 25) {
            comments.push(`[아케인의 정점] <b>${starforce}성</b> 아케인 모자...?! 칠흑 세트 부럽지 않은 압도적인 깡스펙입니다.`);
        } else if (starforce >= 23) {
            comments.push(`[초월급 아케인] <b>${starforce}성</b> 아케인 모자는 정말 보기 드문 귀한 아이템입니다.`);
        } else if (starforce === 22) {
            comments.push(`[강력한 깡스펙] <b>22성</b> 아케인 모자는 높은 기본 스펙을 자랑합니다. 다만 세트 효과 효율을 잘 따져봐야 합니다.`);
        } else if (starforce === 21) {
            comments.push(`[준종결] <b>21성</b> 아케인 모자는 충분히 강력합니다. 22성 도전을 추천합니다.`);
        } else if (starforce >= 18) {
            comments.push(`[고스펙] <b>18성</b> 아케인 모자는 높은 깡스펙을 자랑합니다. 22성 앱솔보다 좋을 수 있습니다.`);
        } else if (starforce >= 17) {
            comments.push(`[미래 지향적] <b>17성</b> 아케인 모자는 추후 18성 이상을 노려볼 수 있는 좋은 베이스입니다.`);
        }
    } else if (itemName.includes("앱솔랩스")) {
        // 앱솔 (160제)
        if (starforce >= 23) {
            comments.push(`[앱솔의 한계 돌파] <b>${starforce}성</b> 앱솔랩스...?! 애정이 가득 담긴 아이템이군요. 대단합니다.`);
        } else if (starforce === 22) {
            comments.push(`[가성비 고스펙] <b>22성</b> 앱솔 모자는 훌륭하지만, 해방 후 세트 효과 구성에서 파프니르에게 밀릴 수 있습니다.`);
        } else if (starforce === 21) {
            comments.push(`[준수한 고스펙] <b>21성</b> 앱솔랩스 모자는 가성비 좋게 사용하기 좋습니다.`);
        } else if (starforce >= 17) {
            comments.push(`[국민 세팅] <b>17성</b> 앱솔랩스 모자는 가성비가 매우 훌륭합니다. 카루타 3셋 + 앱솔 5셋 구성의 핵심입니다.`);
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
    if (adiGrade === "레전드리" || adiGrade === "유니크" || adiGrade === "에픽") {
        const adiEval = evaluateAdditional(adiGrade, adiLines, job);
        if (adiEval.score > 0) {
            comments.push(adiEval.message);
        } else if (adiGrade === "레전드리" && (!adiGrade || adiGrade === "레어")) {
            const hasAtt = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")));
            if (!hasAtt) comments.push(`[속 빈 강정] 윗잠은 레전드리지만 에디셔널이 부실합니다. 에디 공/마를 챙겨주세요.`);
        }
    }

    // 4. 추옵 (Flame)
    // 모자는 깡추옵이 중요
    const addOpts = item.item_add_option || {};
    const addStat = Math.max(
        parseInt(addOpts.str || "0"),
        parseInt(addOpts.dex || "0"),
        parseInt(addOpts.int || "0"),
        parseInt(addOpts.luk || "0"),
        parseInt(addOpts.max_hp || "0") / 21  // HP는 21당 주스탯 1
    );
    const addAllStat = parseInt(addOpts.all_stat || "0");
    const score = Math.floor(addStat + (addAllStat * 10));

    if (score >= 200) comments.push(`[신화급 추옵] <b>${score}급</b>...?! 이건 운영자가 실수로 만든 게 분명합니다. 전 서버급 1티어 추옵입니다.`);
    else if (score >= 180) comments.push(`[초월급 추옵] <b>${score}급</b>! 에테르넬의 품격에 걸맞은 압도적인 추옵입니다.`);
    else if (score >= 160) comments.push(`[종결급 추옵] <b>${score}급</b>! 더 이상 바랄 게 없는 완벽한 추옵입니다.`);
    else if (score >= 130) comments.push(`[극추옵] 모자에 <b>${score}급</b> 추옵은 정말 보기 드뭅니다. 평생 쓰셔도 됩니다.`);
    else if (score >= 100) comments.push(`[고추옵] <b>${score}급</b>으로 훌륭합니다.`);

    return comments;
}
