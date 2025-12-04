import { pick, getAmazingEquivalentStar } from './helpers';
import { isAmazingEnhancementItem } from '../amazing_enhancement_table';
import { SPECIAL_STARFORCE } from '../config/evaluation_criteria';

/**
 * 스타포스 분석 및 코멘트 생성
 */
export function analyzeStarforce(item: any, isEndGameItem: boolean, specialItemConfig: any): string[] {
    const comments: string[] = [];
    const starforce = parseInt(item.starforce) || 0;
    const itemName = item.item_name || '장비';
    const slot = item.item_equipment_slot || '';

    // 강화 불가 부위 체크
    const isMedal = slot === '훈장' || slot.includes('훈장');
    const isBadge = slot === '뱃지' || slot.includes('뱃지');
    const isPocket = slot === '포켓 아이템';
    const isEmblem = slot === '엠블렘';
    const isSubWeapon = slot === '보조무기' || (item.item_equipment_part === '보조무기');
    const isHeart = slot === '기계 심장' || slot === '기계심장';
    const EVENT_RING_KEYWORDS = ["테네브리스", "SS급", "어웨이크", "글로리온", "카오스", "벤젼스", "결속의", "이터널 플레임", "어드벤처 딥다크"];
    const isEventRing = EVENT_RING_KEYWORDS.some(k => itemName.includes(k));

    const isAmazingEnhancement = isAmazingEnhancementItem(item);

    // 하트 분석
    if (isHeart) {
        if (itemName.includes('페어리 하트') || itemName.includes('티타늄 하트')) {
            if (starforce >= 8) {
                comments.push(`<b>8성</b>! 하트의 한계치까지 완벽하게 강화하셨군요. 훌륭합니다.`);
            } else {
                comments.push(`이 하트는 <b>8성</b>이 최대입니다. 조금만 더 힘내서 졸업시켜주세요!`);
            }
        } else if (itemName.includes('블랙 하트')) {
            comments.push(`<b>블랙 하트</b>... 기간제지만 성능은 확실하죠. 기간 끝나기 전에 뽕을 뽑아야 합니다!`);
        } else {
            if (starforce >= 5) {
                comments.push(`<b>${starforce}성</b>으로 알뜰하게 잘 챙기셨네요.`);
            }
        }
    }
    // 실버블라썸 링은 스타포스 코멘트 생략
    else if (itemName.includes('실버블라썸 링')) {
        // Skip starforce comment
    }
    // 놀장강 아이템
    else if (isAmazingEnhancement) {
        const equivalentStar = getAmazingEquivalentStar(starforce);

        if (starforce >= 12) {
            comments.push(pick([
                `<b>놀장강 ${starforce}성</b>! <b>22성급 효율</b>의 압도적인 성능입니다. 구하기 힘든 귀한 아이템을 가지고 계시네요.`,
                `<b>놀장강 ${starforce}성</b> = 일반 22성급! 엄청난 아이템입니다.`,
                `와... 놀장강 12성! 이건 일반 장비로는 절대 따라갈 수 없는 22성급 스펙입니다.`
            ]));
        } else if (starforce >= 10) {
            comments.push(pick([
                `<b>놀장강 ${starforce}성</b>! <b>20성급 효율</b>을 보여줍니다. 아주 훌륭합니다.`,
                `<b>놀장강 ${starforce}성</b> = 일반 20성급! 가성비 최고의 선택입니다.`
            ]));
        } else {
            comments.push(pick([
                `<b>놀장강 ${starforce}성</b>! <b>17성급 효율</b>을 보여줍니다. 일반 장비보다 월등한 성능입니다.`,
                `<b>놀장강 ${starforce}성</b> = 일반 17성급! 효율이 뛰어난 아이템입니다.`
            ]));
        }
    }
    // 타일런트(슈페리얼)
    else if (itemName.includes('타일런트') || itemName.includes('히아데스')) {
        if (starforce >= 12) {
            comments.push(pick([
                `<b>${starforce}성</b>! 타일런트 12성은 <b>22성급</b> 성능입니다. 준종결 세팅!`,
                `와... 타일런트 <b>${starforce}성</b>! 일반 장비 22성과 맞먹는 강력한 위력입니다.`
            ]));
        } else if (starforce >= 10) {
            comments.push(pick([
                `<b>${starforce}성</b>! 타일런트 10성은 <b>21성급</b> 성능입니다. 훌륭합니다.`,
                `타일런트 <b>${starforce}성</b>! 고스펙 유저의 상징이죠.`
            ]));
        } else if (starforce >= 5) {
            comments.push(pick([
                `<b>${starforce}성</b>! 타일런트 5성은 <b>17성급</b> 효율입니다. 가성비 구간입니다.`,
                `타일런트 <b>${starforce}성</b>으로 가성비 좋게 세팅하셨군요.`
            ]));
        } else {
            comments.push(`타일런트 장비는 <b>5성 이상</b> 강화해야 진가를 발휘합니다. 파괴 위험이 있으니 조심하세요!`);
        }
    }
    // 로얄 블랙메탈 숄더
    else if (itemName.includes('로얄 블랙메탈 숄더')) {
        const targetStar = SPECIAL_STARFORCE.ROYAL_BLACK_METAL_SHOULDER;
        if (starforce >= targetStar) {
            comments.push(`<b>${targetStar}성</b>! 로얄 블랙메탈 숄더는 거쳐가는 장비입니다. ${targetStar}성이면 충분하며, 앱솔랩스나 아케인셰이드 견장으로 교체하세요.`);
        } else {
            comments.push(`현재 <b>${starforce}성</b>입니다. 가성비 좋게 <b>${targetStar}성</b>까지만 강화해서 쓰다가 상위 견장으로 교체하는 것을 추천합니다.`);
        }
    }
    // 일반 장비
    else if (!isMedal && !isBadge && !isPocket && !isEmblem && !isSubWeapon && !isEventRing && !specialItemConfig) {
        if (starforce >= 23) {
            comments.push(pick([
                `<b>${starforce}성</b>...?! 이건 데이터 오류가 아닙니다. <b>'신'의 영역</b>입니다. 전 서버를 통틀어도 보기 힘든 기적의 아이템입니다.`,
                `<b>${starforce}성</b>?! 운영자님 여기에요! 여기 강화의 신이 있습니다!`,
                `<b>${starforce}성</b> 성공이라니, 전생에 나라를 구하셨나요? 경이롭습니다.`,
                `이 아이템은 이제 문화재로 지정해야 합니다. <b>${starforce}성</b>이라니...`,
                `와... <b>${starforce}성</b>을 제 눈으로 직접 보다니... 로또 사러 가셔야겠는데요?`
            ]));
        } else if (starforce === 22) {
            comments.push(pick([
                `<b>22성</b> 스타포스, 더 이상 바랄 게 없는 완벽한 수치입니다.`,
                `깔끔한 <b>22성</b>! 졸업을 축하드립니다.`,
                `<b>22성</b>의 영롱한 별빛이 캐릭터를 감싸고 있네요. 완벽합니다.`,
                `스타포스의 종착역, <b>22성</b>에 도착하셨습니다.`,
                `<b>22성</b>... 얼마나 많은 메소가 들었을까요? 노력의 결실이 아름답습니다.`
            ]));
        } else if (starforce >= 17) {
            if (isEndGameItem) {
                comments.push(pick([
                    `<b>${starforce}성</b>은 이 명품 장비의 잠재력을 100% 끌어내지 못합니다. 이 장비의 진가는 <b>22성</b>에서 발휘됩니다.`,
                    `좋은 장비지만 스타포스가 조금 아쉽네요. <b>22성</b>을 향해 달려봅시다!`,
                    `아직은 미완성입니다. <b>22성</b>을 달성하는 순간, 이 장비는 괴물이 될 겁니다.`
                ]));
            } else {
                comments.push(pick([
                    `<b>${starforce}성</b>으로 가성비 구간을 잘 맞추셨습니다. 훌륭한 허리 라인업이네요.`,
                    `<b>${starforce}성</b>, 아주 효율적인 선택입니다. 가성비 최고!`,
                    `무리하지 않고 <b>${starforce}성</b>에서 멈춘 판단, 칭찬합니다.`
                ]));
            }
        } else {
            if (isEndGameItem) {
                comments.push(`하지만 <b>${starforce}성</b>이라니요... 이런 귀한 장비에 스타포스가 너무 부족합니다. 최소 <b>17성</b>, 목표는 <b>22성</b>입니다.`);
            } else {
                comments.push(`스타포스가 <b>${starforce}성</b>으로 다소 낮습니다. <b>17성</b>까지는 강화해주시는 게 좋습니다.`);
            }
        }
    }

    return comments;
}
