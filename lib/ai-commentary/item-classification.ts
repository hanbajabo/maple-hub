import { pick } from './helpers';
import {
    isPensalirItem,
    isGenesisItem,
    isEternalItem,
    isPitchBossItem,
    isBrilliantBossItem,
    isDawnBossItem,
    isChallengerItem
} from '../utils/item_classifier';
import {
    getPensalirMessage,
    GENESIS_MESSAGES,
    ETERNAL_MESSAGES,
    PITCH_BOSS_MESSAGES,
    BRILLIANT_BOSS_MESSAGES,
    DAWN_BOSS_MESSAGES,
    CHALLENGER_MESSAGES
} from '../config/message_templates';

export interface ItemClassification {
    isLuxury: boolean;
    isEndGameItem: boolean;
    isStarter: boolean;
    openingComment: string;
}

/**
 * 아이템 분류 및 오프닝 코멘트 생성
 */
export function classifyItem(itemName: string, slot: string): ItemClassification {
    let isLuxury = false;
    let isEndGameItem = false;
    let isStarter = false;
    let openingComment = "";

    if (isChallengerItem(itemName)) {
        openingComment = pick(CHALLENGER_MESSAGES);
        isStarter = true;
    } else if (isGenesisItem(itemName)) {
        openingComment = pick(GENESIS_MESSAGES);
        isLuxury = true;
        isEndGameItem = true;
    } else if (isEternalItem(itemName)) {
        openingComment = pick(ETERNAL_MESSAGES);
        isLuxury = true;
        isEndGameItem = true;
    } else if (isPitchBossItem(itemName)) {
        openingComment = pick(PITCH_BOSS_MESSAGES);
        isLuxury = true;
        isEndGameItem = true;
    } else if (isBrilliantBossItem(itemName)) {
        openingComment = pick(BRILLIANT_BOSS_MESSAGES);
        isLuxury = true;
        isEndGameItem = true;
    } else if (isDawnBossItem(itemName)) {
        openingComment = pick(DAWN_BOSS_MESSAGES);
    } else if (isPensalirItem(itemName)) {
        openingComment = pick(getPensalirMessage(slot, itemName));
    } else {
        const openings = [
            `[단풍이의 분석] "${itemName}"의 잠재력을 냉철하게 분석했습니다.`,
            `[AI 리포트] 단풍이가 이 장비의 '급'을 정확히 계산해봤어요!`,
            `[스펙 진단] 수치 뒤에 숨겨진 진짜 성능을 파헤칩니다.`,
            `[단풍이의 눈] 꼼꼼하게 살펴봤습니다. 결과가 궁금하시죠?`,
            `[장비 감정] 흐음... 이 장비, 심상치 않은데요?`,
            `[AI 스캐닝] 장비 데이터를 스캔했습니다. 분석 결과를 공개합니다!`,
            `[단풍이의 직관] 딱 보면 압니다. 이 장비의 견적을 내봤어요.`,
            `[정밀 분석] 겉모습만 보지 않습니다. 속까지 꽉 찬 장비인지 확인해볼까요?`,
            `[스펙 리포트] 주인님의 강함을 증명할 장비군요. 자세히 들여다봤습니다.`,
            `[단풍이의 한마디] 이 장비에 대한 제 솔직한 감상은요...`
        ];
        openingComment = pick(openings);
    }

    return {
        isLuxury,
        isEndGameItem,
        isStarter,
        openingComment
    };
}

/**
 * 스타터 아이템 특별 처리
 */
export function generateStarterComments(): string[] {
    const comments: string[] = [];

    comments.push(pick([
        `지금은 스펙 고민보다는 <b>레벨업</b>과 <b>심볼 성장</b>에 집중하실 때입니다. 이 장비로도 아케인 리버 초반 지역은 충분히 돌파할 수 있어요.`,
        `초반에는 이 장비로 충분합니다! 레벨을 올리면서 메소를 모아 더 좋은 장비로 하나씩 바꿔나가는 재미를 느껴보세요.`,
        `아직은 장비 강화에 스트레스 받지 마세요. 사냥과 일일 퀘스트로 기반을 다지는 게 우선입니다!`
    ]));

    comments.push(pick([
        `어느 정도 적응이 되시면 <b>루타비스 세트(카루타)</b>를 맞추시고, 무기와 방어구는 바로 <b>아케인셰이드</b>로 넘어가는 걸 추천합니다. 요즘은 아케인이 대세거든요! 😎 단풍이가 응원하겠습니다! 화이팅! 🌱`,
        `다음 목표는 <b>카루타 세트</b>와 <b>아케인셰이드 무기</b>입니다. 국민 세팅을 향해 달려보세요!`,
        `메소를 차곡차곡 모아서 <b>아케인셰이드</b> 장비를 하나씩 장만해보세요. 스펙이 확 오르는 게 느껴질 거예요.`
    ]));

    return comments;
}
