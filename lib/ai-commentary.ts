import { diagnoseItemDeeply } from './diagnosis/equipment';
import { isMagicJob, getJobMainStat } from './job_utils';
import { isPensalirItem, isGenesisItem, isEternalItem, isPitchBossItem, isBrilliantBossItem, isDawnBossItem, isChallengerItem } from './utils/item_classifier';
import { WEAPON_STARFORCE, ARMOR_STARFORCE, SPECIAL_STARFORCE } from './config/evaluation_criteria';
import {
    getPensalirMessage,
    GENESIS_MESSAGES,
    ETERNAL_MESSAGES,
    PITCH_BOSS_MESSAGES,
    BRILLIANT_BOSS_MESSAGES,
    DAWN_BOSS_MESSAGES,
    CHALLENGER_MESSAGES,
    EVENT_RING_MESSAGES
} from './config/message_templates';
import { getSpecialItemConfig } from './config/special_items';

// 아이템 데이터를 기반으로 AI 분석 멘트를 생성하는 함수
export function generateItemCommentary(item: any, job?: string): string {
    if (!item) return "아이템 정보를 분석할 수 없습니다.";

    const isMagic = job ? isMagicJob(job) : false;

    // Helper for random comments
    const pick = (opts: string[]) => opts[Math.floor(Math.random() * opts.length)];

    const starforce = parseInt(item.starforce) || 0;
    const potentialGrade = item.potential_option_grade || '없음';
    const addPotentialGrade = item.additional_potential_option_grade || '없음';
    const itemName = item.item_name || '장비';
    const slot = item.item_equipment_slot || '';

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

    // 0. 아이템 등급(명품/스타터) 감정
    let isLuxury = false; // 명품 여부
    let isEndGameItem = false; // 종결급 아이템 여부
    let isStarter = false; // 스타터 아이템 여부

    if (isChallengerItem(itemName)) {
        comments.push(pick(CHALLENGER_MESSAGES));
        isStarter = true;
    } else if (isGenesisItem(itemName)) {
        comments.push(pick(GENESIS_MESSAGES));
        isLuxury = true;
        isEndGameItem = true;
    } else if (isEternalItem(itemName)) {
        comments.push(pick(ETERNAL_MESSAGES));
        isLuxury = true;
        isEndGameItem = true;
    } else if (isPitchBossItem(itemName)) {
        comments.push(pick(PITCH_BOSS_MESSAGES));
        isLuxury = true;
        isEndGameItem = true;
    } else if (isBrilliantBossItem(itemName)) {
        comments.push(pick(BRILLIANT_BOSS_MESSAGES));
        isLuxury = true;
        isEndGameItem = true;
    } else if (isDawnBossItem(itemName)) {
        comments.push(pick(DAWN_BOSS_MESSAGES));
    } else if (isPensalirItem(itemName)) {
        // 🚨 펜살리르 아이템 - 교체 권장 메시지만 출력하고 종료
        comments.push(pick(getPensalirMessage(slot, itemName)));

        // === 🚀 진화형 AI (Antigravity) 추가 진단 ===
        const deepComments = diagnoseItemDeeply(item, job);
        if (deepComments.length > 0) {
            return comments.join(" ") + "\n---\n### 🚀 [진화형 AI] 정밀 진단 리포트\n" + deepComments.join("\n\n");
        }
        return comments.join(" "); // 펜살리르는 여기서 분석 종료
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
        comments.push(pick(openings));
    }

    // 스타터 아이템(도전자)일 경우 별도 로직
    if (isStarter) {
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
        return comments.join(" "); // 스타터는 여기서 분석 종료 (복잡한 수치 분석 생략)
    }

    // 🎯 특수 아이템 처리 (중앙 설정 사용)
    const specialItemConfig = getSpecialItemConfig(itemName);
    if (specialItemConfig) {
        comments.push(`<b>[특수 링]</b> 자체 옵션이 우수한 특수 반지입니다. (스타포스/주문서/잠재 불가능)`);
        comments.push(pick(specialItemConfig.danpungiComments));
        // 진화형 AI 진단을 위해 여기서 return하지 않고 계속 진행
    }

    // 특수 반지(시드링) 분석
    const specialRingLevel = item.special_ring_level || 0;
    if (specialRingLevel > 0) {
        comments.push(`<b>[특수 스킬 반지 Lv.${specialRingLevel}]</b>`);
        if (specialRingLevel >= 6) {
            comments.push(pick([
                `6레벨... <b>끝판왕</b>을 영접합니다. ✨ 이 반지만 있으면 무서울 게 없겠네요. 전 서버급 스펙입니다!`,
                `와... 6레벨 시드링이라니! 보스들이 살려달라고 빌겠는데요?`,
                `이건 반지가 아니라 핵무기입니다. 6레벨의 위엄, 대단합니다.`
            ]));
        } else if (specialRingLevel === 5) {
            comments.push(pick([
                `와... <b>5레벨</b>?! 진짜 고스펙의 상징입니다. 연마까지 성공하셨군요! 부럽습니다.`,
                `5레벨 반지는 아무나 가지는 게 아니죠. 노력과 운의 결실입니다.`,
                `보스전의 핵심, 5레벨 시드링! 든든합니다.`
            ]));
        } else if (specialRingLevel === 4) {
            comments.push(pick([
                `<b>4레벨</b>, 아주 좋습니다! 보스전에서 강력한 화력을 보여주겠군요. 극딜 타임이 기다려지시겠어요.`,
                `4레벨이면 실전 종결급이죠. 아주 훌륭한 선택입니다.`,
                `보스 몬스터에게 매운맛을 보여줄 4레벨 반지군요!`
            ]));
        } else if (specialRingLevel === 3) {
            comments.push(pick([
                `<b>3레벨</b>, 가성비 좋은 선택입니다! 실전에서 충분히 쓸만해요. 4레벨을 향해 화이팅!`,
                `입문용으로 딱 좋은 3레벨입니다. 가성비 최고!`,
                `3레벨도 나쁘지 않아요. 차근차근 스펙업 해봅시다.`
            ]));
        } else {
            comments.push(`아직은 입문 단계군요. <b>3레벨 이상</b>을 목표로 해보세요! 성능 차이가 확 느껴질 겁니다.`);
        }
        return comments.join(" "); // 특수 반지는 여기서 분석 종료
    }

    // 강화 불가 부위 체크
    const isMedal = slot === '훈장' || slot.includes('훈장');
    const isBadge = slot === '뱃지' || slot.includes('뱃지');
    const isPocket = slot === '포켓 아이템';
    const isEmblem = slot === '엠블렘';
    const isSubWeapon = slot === '보조무기' || (item.item_equipment_part === '보조무기');
    const isRing = slot === '반지';
    const isHeart = slot === '기계 심장' || slot === '기계심장';

    // 이벤트 링 키워드 정의
    const EVENT_RING_KEYWORDS = ["테네브리스", "SS급", "어웨이크", "글로리온", "카오스", "벤젼스", "결속의", "이터널 플레임", "어드벤처 딥다크"];
    const isEventRing = EVENT_RING_KEYWORDS.some(k => itemName.includes(k));

    // 1. 스타포스 분석 (눈높이 적용)
    const sfOpts = item.item_starforce_option || {};
    const sfAtt = parseInt(sfOpts.attack_power || "0");
    const sfMagic = parseInt(sfOpts.magic_power || "0");
    // 놀장강/슈페리얼 판단: 5~12성 + (무기/장갑 제외)
    const normalizedName = itemName.replace(/\s+/g, "");
    const isMeisterRing = normalizedName.includes("마이스터링");

    // 주의: item_etc_option(주문서)은 제외하고 오직 스타포스 옵션만 확인
    const isNoljang = starforce >= 5 && starforce <= 12 && !slot.includes("무기") && !slot.includes("장갑") &&
        (sfAtt > 0 || sfMagic > 0 || (isMeisterRing && starforce >= 10));

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
    } else if (itemName.includes('실버블라썸 링')) {
    } else if (isNoljang) {
        if (starforce >= 10) {
            comments.push(`<b>놀장강/슈페리얼 ${starforce}성</b>! 22성 아이템과 맞먹는 엄청난 성능입니다. 구하기 힘든 귀한 아이템을 가지고 계시네요.`);
        } else {
            comments.push(`<b>놀장강/슈페리얼 ${starforce}성</b>! 일반적인 스타포스보다 훨씬 강력한 성능을 보여줍니다.`);
        }
    } else if (itemName.includes('로얄 블랙메탈 숄더')) {
        // 🎯 로얄 블랙메탈 숄더 특별 처리 - 12성 목표
        const targetStar = SPECIAL_STARFORCE.ROYAL_BLACK_METAL_SHOULDER;
        if (starforce >= targetStar) {
            comments.push(`<b>${targetStar}성</b>! 로얄 블랙메탈 숄더는 거쳐가는 장비입니다. ${targetStar}성이면 충분하며, 앱솔랩스나 아케인셰이드 견장으로 교체하세요.`);
        } else {
            comments.push(`현재 <b>${starforce}성</b>입니다. 가성비 좋게 <b>${targetStar}성</b>까지만 강화해서 쓰다가 상위 견장으로 교체하는 것을 추천합니다.`);
        }
    } else if (!isMedal && !isBadge && !isPocket && !isEmblem && !isSubWeapon && !isEventRing && !specialItemConfig) {
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

    // 2. 추가옵션 분석 (무기/방어구 구분)
    // 추가옵션이 붙지 않는 부위 목록 (반지, 엠블렘, 보조무기, 뱃지, 훈장, 심장, 어깨장식)
    const noFlameSlots = ['반지', '엠블렘', '보조무기', '뱃지', '훈장', '기계 심장', '기계심장', '어깨장식'];
    const isNoFlameSlot = noFlameSlots.some(s => slot.includes(s) || slot === s);

    if (!isNoFlameSlot) {
        const addOpts = item.item_add_option || {};
        const addAtt = parseInt(addOpts.attack_power || "0");
        const addMagic = parseInt(addOpts.magic_power || "0");
        const addAllStat = parseInt(addOpts.all_stat || "0");
        const level = item.item_base_option.base_equipment_level;

        if (slot === '무기') {
            // 무기 추옵 계산 (간이) - 1티어/2티어 판별
            let tier1 = 0;
            let tier2 = 0;

            // 아케인/제네시스 (200제)
            if (level >= 200) { tier1 = 120; tier2 = 90; } // 대략적인 수치
            else if (level >= 160) { tier1 = 95; tier2 = 74; } // 앱솔 기준
            else if (level >= 150) { tier1 = 75; tier2 = 58; } // 파프 기준

            const mainAddAtt = Math.max(addAtt, addMagic);

            if (mainAddAtt >= tier1) {
                comments.push(pick([
                    `<b>추가옵션 공/마 +${mainAddAtt}</b>는 1티어 극추옵입니다. 환생의 불꽃 대성공이네요!`,
                    `와... <b>1티어 추옵</b>이 떴군요! 무기가 춤을 추고 있습니다.`,
                    `<b>공/마 +${mainAddAtt}</b>... 영롱합니다. 더 이상 바랄 게 없는 종결 추옵입니다.`
                ]));
            } else if (mainAddAtt >= tier2) {
                comments.push(pick([
                    `<b>추가옵션 공/마 +${mainAddAtt}</b>는 2티어 강추옵입니다. 가성비 좋게 사용하기 충분합니다.`,
                    `<b>2티어 추옵</b>, 아주 준수합니다. 실전에서 차고 넘치는 성능이죠.`,
                    `나쁘지 않은 추옵입니다. <b>2티어</b> 정도면 충분히 현역이죠.`
                ]));
            } else if (mainAddAtt > 0) {
                comments.push(`추가옵션이 조금 아쉽습니다. <b>1티어</b>나 <b>2티어</b> 추옵을 노려보세요. 공격력 차이가 큽니다.`);
            } else {
                comments.push(`이 좋은 무기에 추가옵션이 없습니다. <b>환생의 불꽃</b> 작업이 필수입니다.`);
            }
        } else {
            // 방어구/장신구 추옵 계산 (점수제)
            const str = parseInt(addOpts.str || "0");
            const dex = parseInt(addOpts.dex || "0");
            const int = parseInt(addOpts.int || "0");
            const luk = parseInt(addOpts.luk || "0");
            const att = parseInt(addOpts.attack_power || "0");
            const magic = parseInt(addOpts.magic_power || "0");
            const allStat = parseInt(addOpts.all_stat || "0");

            // 깡추옵 + 공마*4 + 올스탯*10
            const scoreSTR = str + (att * 4) + (allStat * 10);
            const scoreDEX = dex + (att * 4) + (allStat * 10);
            const scoreINT = int + (magic * 4) + (allStat * 10);
            const scoreLUK = luk + (att * 4) + (allStat * 10);

            const maxScore = Math.max(scoreSTR, scoreDEX, scoreINT, scoreLUK);

            // 레벨별 추옵 기준 세분화 (사용자 요청 반영)
            // 250제 (에테르넬)
            if (level >= 250) {
                if (maxScore >= 200) comments.push(`[신화급] <b>${maxScore}급</b>...?! 이건 운영자가 실수로 만든 게 분명합니다. 전 서버급 1티어 추옵입니다.`);
                else if (maxScore >= 190) comments.push(`[종결] <b>${maxScore}급</b>! 더 이상 바랄 게 없는 완벽한 추옵입니다.`);
                else if (maxScore >= 180) comments.push(`[종결급] <b>${maxScore}급</b>! 에테르넬의 품격에 걸맞은 압도적인 추옵입니다.`);
                else if (maxScore >= 170) comments.push(`[최상급] <b>${maxScore}급</b>! 아주 훌륭한 추옵입니다. 든든하네요.`);
                else if (maxScore >= 160) comments.push(`[많이 좋음] <b>${maxScore}급</b>! 상위권 유저들도 부러워할 옵션입니다.`);
                else if (maxScore >= 150) comments.push(`[꽤 좋음] <b>${maxScore}급</b>! 실전에서 차고 넘치는 성능입니다.`);
                else if (maxScore >= 140) comments.push(`[좋음] <b>${maxScore}급</b>! 에테르넬 입문용으로 아주 좋습니다.`);
                else if (maxScore >= 130) comments.push(`[준수] <b>${maxScore}급</b>. 쓸만하지만 욕심을 조금 더 내보셔도 좋습니다.`);
                else if (maxScore >= 120) comments.push(`[보통] <b>${maxScore}급</b>. 임시로 쓰기엔 괜찮습니다.`);
                else if (maxScore >= 110) comments.push(`[아쉬움] <b>${maxScore}급</b>... 에테르넬치고는 많이 아쉽습니다. 환불을 추천합니다.`);
                else if (maxScore >= 100) comments.push(`[부캐용] <b>${maxScore}급</b>. 본캐라면 재설정이 시급합니다.`);
            }
            // 200제 (아케인)
            else if (level >= 200) {
                if (maxScore >= 170) comments.push(`[종결급] <b>${maxScore}급</b>! 아케인셰이드의 한계를 뛰어넘었습니다.`);
                else if (maxScore >= 160) comments.push(`[최상급] <b>${maxScore}급</b>! 전 서버급 매물입니다.`);
                else if (maxScore >= 150) comments.push(`[많이 좋음] <b>${maxScore}급</b>! 아주 훌륭합니다. 평생 쓰셔도 됩니다.`);
                else if (maxScore >= 140) comments.push(`[꽤 좋음] <b>${maxScore}급</b>! 든든한 국밥 같은 추옵입니다.`);
                else if (maxScore >= 130) comments.push(`[좋음] <b>${maxScore}급</b>! 실전용으로 손색이 없습니다.`);
                else if (maxScore >= 120) comments.push(`[준수] <b>${maxScore}급</b>. 가성비 좋게 쓰기 딱 좋습니다.`);
                else if (maxScore >= 110) comments.push(`[보통] <b>${maxScore}급</b>. 나쁘지 않지만 조금 아쉽네요.`);
                else if (maxScore >= 100) comments.push(`[부캐용] <b>${maxScore}급</b>. 임시로 거쳐가는 용도입니다.`);
            }
            // 140~160제 (앱솔, 파프, 여명 등)
            else {
                if (maxScore >= 150) comments.push(`[종결급] <b>${maxScore}급</b>! 이 레벨대 장비에서 볼 수 있는 끝판왕 추옵입니다.`);
                else if (maxScore >= 140) comments.push(`[최상급] <b>${maxScore}급</b>! 아주 귀한 옵션입니다. 축하드립니다.`);
                else if (maxScore >= 130) comments.push(`[많이 좋음] <b>${maxScore}급</b>! 훌륭합니다. 든든하게 쓰세요.`);
                else if (maxScore >= 120) comments.push(`[좋음] <b>${maxScore}급</b>! 가성비와 성능을 모두 잡았습니다.`);
                else if (maxScore >= 110) comments.push(`[준수] <b>${maxScore}급</b>. 실전에서 충분히 통하는 옵션입니다.`);
                else if (maxScore >= 100) comments.push(`[보통] <b>${maxScore}급</b>. 무난하게 쓰기 좋습니다.`);
            }

            if (maxScore === 0 && isEndGameItem) {
                comments.push(`이 좋은 장비에 추가옵션이 거의 없습니다. <b>환생의 불꽃</b> 작업이 필수입니다.`);
            }
        }
    }

    // 3. 잠재능력 정밀 분석 (눈높이 적용)
    if (!isMedal && !isBadge && !isPocket && !specialItemConfig) {
        let bossDmg = 0;
        let ied = 0;
        let attPct = 0;
        let magicPct = 0;
        let critDmg = 0;
        let coolTime = 0;
        let statPct = 0;
        let dropRate = 0;
        let mesoRate = 0;

        let strTotal = 0;
        let dexTotal = 0;
        let intTotal = 0;
        let lukTotal = 0;
        let hpTotal = 0;
        let allStatTotal = 0;

        const parseOption = (lines: string[]) => {
            lines.forEach(line => {
                if (line.includes('보스 몬스터 공격 시 데미지')) bossDmg += parseInt(line.replace(/[^0-9]/g, '')) || 0;
                if (line.includes('몬스터 방어율 무시')) ied += parseInt(line.replace(/[^0-9]/g, '')) || 0;
                if (line.includes('공격력') && line.includes('%')) attPct += parseInt(line.replace(/[^0-9]/g, '')) || 0;
                if (line.includes('마력') && line.includes('%')) magicPct += parseInt(line.replace(/[^0-9]/g, '')) || 0;
                if (line.includes('크리티컬 데미지')) critDmg += parseInt(line.replace(/[^0-9]/g, '')) || 0;
                if (line.includes('재사용 대기시간')) coolTime += parseInt(line.replace(/[^0-9]/g, '')) || 0;
                if (line.includes('아이템 드롭률')) dropRate += parseInt(line.replace(/[^0-9]/g, '')) || 0;
                if (line.includes('메소 획득량')) mesoRate += parseInt(line.replace(/[^0-9]/g, '')) || 0;

                // 렙당 스탯 처리 (캐릭터 기준 9레벨 당 +X)
                // 9레벨 당 +1 -> 약 3%급
                // 9레벨 당 +2 -> 약 6%급
                let levelStatBonus = 0;
                if (line.includes('캐릭터 기준 9레벨 당') || line.includes('캐릭터 기준 10레벨 당')) {
                    // 주스탯/올스탯 여부 확인
                    const valMatch = line.match(/\+(\d+)/);
                    const val = valMatch ? parseInt(valMatch[1]) : 0;

                    // 대략적인 % 환산 (9레벨당 1 = 3%, 2 = 6%)
                    if (val >= 2) levelStatBonus = 6;
                    else if (val >= 1) levelStatBonus = 3;

                    if (line.includes('STR')) strTotal += levelStatBonus;
                    if (line.includes('DEX')) dexTotal += levelStatBonus;
                    if (line.includes('INT')) intTotal += levelStatBonus;
                    if (line.includes('LUK')) lukTotal += levelStatBonus;
                }

                if (line.includes('STR') && line.includes('%')) strTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
                if (line.includes('DEX') && line.includes('%')) dexTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
                if (line.includes('INT') && line.includes('%')) intTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
                if (line.includes('LUK') && line.includes('%')) lukTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
                if (line.includes('HP') && line.includes('%')) hpTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
                if (line.includes('올스탯') && line.includes('%')) allStatTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
            });
            // 주스탯은 STR/DEX/INT/LUK/HP 중 가장 높은 값만 선택 (직업의 주스탯이 가장 높게 나올 것)
            statPct = Math.max(strTotal, dexTotal, intTotal, lukTotal, hpTotal) + allStatTotal;
        };

        parseOption(potentials);

        if (potentialGrade === '레전드리') {
            // 무기/보조/엠블렘(WSE) 전용 로직
            if (slot === '무기' || slot === '보조무기' || slot === '엠블렘' || item.item_equipment_part === '보조무기') {
                const bossLines = potentials.filter(l => l.includes('보스'));
                const attLines = potentials.filter(l => (l.includes('공격력') || l.includes('마력')) && l.includes('%'));
                const iedLines = potentials.filter(l => l.includes('방어율 무시'));

                const bossCount = bossLines.length;
                const attCount = attLines.length;
                const iedCount = iedLines.length;

                if (bossCount >= 2 && attCount >= 1) comments.push(pick([
                    `<b>보보공/보보마</b>! 무기 잠재능력의 정석이자 종결 옵션입니다. 축하드립니다!`,
                    `가장 이상적인 옵션, <b>보보공/보보마</b>를 띄우셨군요. 완벽합니다.`,
                    `이 옵션을 띄우려고 얼마나 많은 큐브를 돌리셨을까요? <b>보보공/보보마</b> 인정합니다.`
                ]));
                else if (attCount >= 2 && bossCount >= 1) comments.push(`<b>공공보/마마보</b>! 보공과 공/마 밸런스가 완벽합니다.`);
                else if (attCount >= 3) comments.push(`<b>3공/3마</b>! 보공 효율이 높은 직업에게 최고의 옵션입니다.`);
                else if (bossCount + attCount + iedCount >= 3) comments.push(`유효 옵션 3줄을 꽉 채우셨습니다. 졸업급입니다.`);
                else if (bossCount >= 2) comments.push(`<b>보보잡</b>... 보공 2줄은 좋지만 공/마가 없어 아쉽습니다. 큐브로 '보보공'을 노려보세요.`);
                else if (bossCount + attCount + iedCount === 2) comments.push(`가성비 좋게 유효 2줄을 챙기셨습니다. 추후 3줄을 목표로 해보세요.`);
                else comments.push(`레전드리 등급이지만 유효 옵션이 부족합니다. 큐브 작업이 시급합니다.`);
            }
            // 방어구/장신구 로직
            else {
                const potPrefixes = ["잠재능력은", "잠재는", "윗잠은", "잠재 옵션은"];
                const potPrefix = pick(potPrefixes);

                // 쿨감 + 주스탯 조합 평가 (모자 등)
                if (coolTime >= 2 && statPct > 0) {
                    if (coolTime >= 4 && statPct >= 21) {
                        comments.push(`${potPrefix} <b>쿨감 -${coolTime}초 + 주스탯 ${statPct}%</b>! 모자 최종 종결 옵션입니다. 이 이상은 없습니다.`);
                    } else if (coolTime >= 2 && statPct >= 21) {
                        comments.push(`${potPrefix} <b>쿨감 -${coolTime}초 + 주스탯 ${statPct}%</b>! 실전 종결급 조합입니다.`);
                    } else if (coolTime >= 2 && statPct >= 13) {
                        comments.push(`${potPrefix} <b>쿨감 -${coolTime}초 + 주스탯 ${statPct}%</b>! 쿨감과 주스탯을 함께 챙긴 훌륭한 옵션입니다.`);
                    } else {
                        comments.push(`${potPrefix} <b>쿨감 -${coolTime}초 + 주스탯 ${statPct}%</b>가 있습니다. 쿨감은 직업에 따라 매우 중요한 옵션입니다.`);
                    }
                }
                // 쿨감만 있는 경우
                else if (coolTime >= 4) {
                    comments.push(`<b>쿨타임 감소 ${coolTime}초</b>는 종결급 옵션입니다.`);
                } else if (coolTime >= 2) {
                    comments.push(`<b>쿨타임 감소 ${coolTime}초</b>는 직업에 따라 주스탯 30% 이상의 가치를 가집니다. 1순위 옵션입니다.`);
                }
                // 주스탯만 있는 경우
                else {
                    const level = item.item_base_option?.base_equipment_level || 0;
                    const isHighLevel = level > 200; // 201제 이상 (에테르넬 등, 아케인은 제외)

                    if (isHighLevel) {
                        // 200제 이상 기준 (정옵 33%, 이탈 13%)
                        if (statPct >= 39) {
                            comments.push(pick([
                                `${potPrefix} <b>주스탯 ${statPct}%</b>... <b>'올이탈'</b> 국가권력급 스펙입니다! 로또 1등 당첨보다 어렵다는 확률을 뚫으셨군요.`,
                                `${potPrefix} <b>주스탯 ${statPct}%</b>?! 큐브가 고장난 거 아닌가요? 믿을 수 없는 수치입니다.`
                            ]));
                        } else if (statPct >= 36) {
                            comments.push(pick([
                                `${potPrefix} <b>'쌍이탈'</b> 옵션(36% 이상)이 떴습니다! 정옵을 뛰어넘은 초고스펙입니다.`,
                                `${potPrefix} <b>주스탯 ${statPct}%</b>! 쌍이탈의 축복을 받으셨군요.`
                            ]));
                        } else if (statPct >= 33) {
                            comments.push(pick([
                                `${potPrefix} <b>주스탯 ${statPct}%</b>로 깔끔하게 3줄 유효 옵션을 챙기셨네요. 군더더기 없는 완벽한 졸업급 정옵입니다.`,
                                `${potPrefix} <b>${statPct}%</b> 정옵! 마음이 편안해지는 숫자입니다.`
                            ]));
                        } else if (statPct >= 30) {
                            comments.push(`${potPrefix} <b>주스탯 ${statPct}%</b>! 준수한 3줄 옵션입니다.`);
                        } else if (statPct >= 27) {
                            comments.push(`${potPrefix} <b>주스탯 ${statPct}%</b>! 쓸만한 3줄 옵션입니다.`);
                        } else if (statPct >= 21) {
                            comments.push(`${potPrefix} <b>주스탯 ${statPct}%</b>! 2줄 유효 옵션입니다.`);
                        }
                    } else {
                        // 160제 이하 기준 (정옵 30%, 이탈 12%)
                        if (statPct >= 36) {
                            comments.push(pick([
                                `${potPrefix} <b>주스탯 ${statPct}%</b>... <b>'올이탈'</b> 국가권력급 스펙입니다! 로또 1등 당첨보다 어렵다는 확률을 뚫으셨군요.`,
                                `${potPrefix} <b>주스탯 ${statPct}%</b>?! 큐브가 고장난 거 아닌가요? 믿을 수 없는 수치입니다.`
                            ]));
                        } else if (statPct >= 33) {
                            comments.push(pick([
                                `${potPrefix} <b>'쌍이탈'</b> 옵션(33% 이상)이 떴습니다! 정옵을 뛰어넘은 초고스펙입니다.`,
                                `${potPrefix} <b>주스탯 ${statPct}%</b>! 쌍이탈의 축복을 받으셨군요.`
                            ]));
                        } else if (statPct >= 30) {
                            comments.push(pick([
                                `${potPrefix} <b>주스탯 ${statPct}%</b>로 깔끔하게 3줄 유효 옵션을 챙기셨네요. 군더더기 없는 완벽한 졸업급 정옵입니다.`,
                                `${potPrefix} <b>${statPct}%</b> 정옵! 마음이 편안해지는 숫자입니다.`
                            ]));
                        } else if (statPct >= 27) {
                            comments.push(`${potPrefix} <b>주스탯 ${statPct}%</b>! 쓸만한 3줄 옵션입니다.`);
                        } else if (statPct >= 21) {
                            comments.push(`${potPrefix} <b>주스탯 ${statPct}%</b>! 2줄 유효 옵션입니다.`);
                        }
                    }
                }

            }
            if (critDmg >= 24) comments.push(`<b>3크뎀</b>...?! 이건 전설이 아니라 <b>신화</b>입니다. 메이플 역사에 남을 아이템입니다.`);
            else if (critDmg >= 16) comments.push(`<b>쌍크뎀</b> 장갑... 전 서버급 매물입니다.`);

        } else if (potentialGrade === '유니크') {
            if (isEndGameItem) {
                comments.push(`이런 명품 장비에 유니크 등급은 너무 아깝습니다. <b>레전드리</b> 등급업으로 아이템의 잠재력을 100% 끌어올려주세요.`);
            } else {
                if (statPct >= 15) {
                    comments.push(pick([
                        `유니크 등급에서 <b>스탯 ${statPct}%</b>면 가성비 구간 종결입니다. 거쳐가는 아이템으로는 최고네요.`,
                        `<b>${statPct}%</b>! 유니크에서 뽑을 수 있는 최상의 옵션입니다.`,
                        `가성비의 제왕 유니크 <b>15%</b>! 아주 훌륭합니다.`
                    ]));
                } else if (statPct < 9 && !coolTime && !critDmg) {
                    comments.push(`유니크 등급의 장점을 살리지 못하고 있습니다. 큐브로 최소 <b>15% 이상</b>을 띄워보세요.`);
                }
            }
        } else if (potentialGrade === '에픽') {
            if (isEventRing) {
                // 🎁 이벤트링이 에픽일 때
                comments.push(pick(EVENT_RING_MESSAGES.UPGRADE_TO_LEGENDARY));
            } else if (statPct >= 12) {
                comments.push(`에픽 등급에서 <b>주스탯 ${statPct}%</b>! 유니크 부럽지 않은 가성비 최고의 옵션입니다.`);
            } else if (statPct >= 9) {
                comments.push(`<b>주스탯 ${statPct}%</b>로 에픽 등급의 정석을 맞추셨네요. 훌륭합니다.`);
            } else if (statPct >= 6) {
                comments.push(`<b>주스탯 ${statPct}%</b>를 챙기셨군요. 추후 <b>9% 이상</b>을 목표로 해보세요.`);
            } else if (isEndGameItem) {
                comments.push(`이런 명품 장비에 에픽 등급은 너무 아깝습니다. <b>유니크/레전드리</b> 등급업으로 아이템의 잠재력을 100% 끌어올려주세요.`);
            } else if (statPct === 0 && attPct === 0 && magicPct === 0) {
                comments.push(`잠재능력 옵션이 아쉽습니다. <b>수상한 큐브</b>로 최소 <b>주스탯 9%</b> 또는 <b>공격력/마력 6%</b>를 챙겨주세요.`);
            }
        } else if (potentialGrade === '레어' || potentialGrade === '없음') {
            if (isEndGameItem) {
                comments.push(`<b>${potentialGrade}</b> 등급이라니요... 장비가 울고 있습니다! 당장 등급업이 시급합니다.`);
            } else if (isEventRing) {
                // 🎁 이벤트링 특별 조언
                comments.push(pick(EVENT_RING_MESSAGES.UPGRADE_TO_LEGENDARY));
            } else if (statPct === 0 && attPct === 0 && magicPct === 0) {
                // 부위별로 다른 조언 제공
                const isWSE = slot === '무기' || slot === '보조무기' || slot === '엠블렘' || item.item_equipment_part === '보조무기';
                if (isWSE) {
                    comments.push(`잠재능력 옵션이 아쉽습니다. <b>수상한 큐브</b>로 최소 <b>공격력/마력 %</b> 또는 <b>보스 공격력 %</b>를 챙겨주세요.`);
                } else {
                    comments.push(`잠재능력 옵션이 아쉽습니다. <b>수상한 큐브</b>로 최소 <b>주스탯 %</b>를 챙겨주세요.`);
                }
            }
        } else if (potentialGrade === '유니크' && isEventRing) {
            // 🎁 이벤트링이 유니크일 때도 레전드리 업그레이드 권장
            comments.push(pick(EVENT_RING_MESSAGES.UPGRADE_FROM_UNIQUE));
        }

        // 4. 에디셔널 옵션 평가
        if (addPotentialGrade !== '없음') {
            const adiPrefix = "에디셔널은";

            if (item.item_equipment_slot === '무기' || item.item_equipment_slot === '보조무기' || item.item_equipment_slot === '엠블렘') {
                // 무보엠 에디셔널 (공/마 %)
                let addAttLines = 0;
                let addBossLines = 0;

                addPotentials.forEach(line => {
                    if (line) {
                        if ((isMagic ? line.includes('마력') : line.includes('공격력')) && line.includes('%')) addAttLines++;
                        if (line.includes('보스 몬스터')) addBossLines++;
                    }
                });

                if (addAttLines >= 3) {
                    comments.push(pick([
                        `${adiPrefix} <b>${isMagic ? '마력' : '공격력'} 3줄</b>...?! 이건 <b>기적</b>입니다. 에디셔널 종결을 축하드립니다!`,
                        `${adiPrefix} <b>${isMagic ? '마력' : '공격력'} 3줄</b>! 더 이상 바랄 게 없는 완벽한 옵션입니다.`,
                        `${adiPrefix} 와... 에디셔널 <b>3줄</b> 유효라니! 전 서버급 매물입니다.`
                    ]));
                } else if (addAttLines >= 2) {
                    comments.push(pick([
                        `${adiPrefix} <b>${isMagic ? '마력' : '공격력'} 2줄</b>! 아주 훌륭합니다. 스펙업의 정석이죠.`,
                        `${adiPrefix} <b>${isMagic ? '마력' : '공격력'} %</b>가 2줄이나 든든하게 붙어있군요.`,
                        `${adiPrefix} <b>${isMagic ? '마력' : '공격력'} 2줄</b>, 실전에서 차고 넘치는 성능입니다.`
                    ]));
                } else if (addAttLines === 1 && addBossLines >= 1) {
                    comments.push(`${adiPrefix} <b>${isMagic ? '마력' : '공격력'}</b>과 <b>보공</b>의 조화! 밸런스가 좋습니다.`);
                } else if (addAttLines === 1) {
                    comments.push(`${adiPrefix} <b>${isMagic ? '마력' : '공격력'} 1줄</b>은 국룰이죠. 든든하게 스펙을 받쳐주고 있습니다.`);
                } else if (addBossLines >= 2) {
                    comments.push(`${adiPrefix} <b>보공 2줄</b>! ${isMagic ? '마력' : '공격력'}보다는 티어가 낮지만, 실전 딜 상승량은 무시할 수 없습니다. 가성비 최고의 선택입니다.`);
                } else if (addBossLines >= 1) {
                    comments.push(`${adiPrefix} <b>보공</b>을 챙기셨네요. 나쁘지 않지만, 추후 <b>${isMagic ? '마력' : '공격력'} %</b> 옵션으로 교체를 고려해보세요.`);
                }
            } else {
                // 방어구 에디셔널 (주스탯/공마)
                // 직업별 주스탯 정보 가져오기
                const mainStats = getJobMainStat(job || "");

                // 유효 줄 수 계산 (직업 주스탯 및 올스탯만 포함)
                let validStatLines = 0;
                let validAttFlat = 0;
                let hasAdiCoolReduce = false; // 에디 쿨감 체크
                let adiCritDmgLines = 0; // 에디 크뎀 체크 (장갑)

                // 에디셔널 레전드리/유니크 등급 정밀 분석을 위한 변수
                let adiStatPct = 0;

                addPotentials.forEach(line => {
                    if (!line) return;

                    // 1. 주스탯 % 체크
                    if (line.includes('%')) {
                        let isValid = false;
                        if (line.includes('올스탯')) {
                            isValid = true;
                        }
                        // HP%는 데몬어벤져만 주스탯으로 인정
                        else if (line.includes('HP') && line.includes('%')) {
                            if (job && job.includes('데몬어벤져')) {
                                isValid = true;
                            }
                        }
                        else {
                            // 직업 주스탯과 일치하는 경우만 카운트
                            const isMainStat = mainStats.some((stat: string) => line.includes(stat));
                            if (isMainStat) isValid = true;
                        }

                        if (isValid) {
                            validStatLines++;
                            const val = parseInt(line.replace(/[^0-9]/g, '')) || 0;
                            adiStatPct += val;
                        }
                    }

                    // 렙당 스탯 처리 (에디셔널)
                    if (line.includes('캐릭터 기준 9레벨 당') || line.includes('캐릭터 기준 10레벨 당')) {
                        const valMatch = line.match(/\+(\d+)/);
                        const val = valMatch ? parseInt(valMatch[1]) : 0;

                        // 에디셔널 렙당 스탯 환산 (9레벨당 1 = 3%, 2 = 6%)
                        let bonusPct = 0;
                        if (val >= 2) bonusPct = 6;
                        else if (val >= 1) bonusPct = 3;

                        // 주스탯 포함 여부 확인
                        let isValid = false;
                        if (line.includes('STR') && mainStats.includes('STR')) isValid = true;
                        if (line.includes('DEX') && mainStats.includes('DEX')) isValid = true;
                        if (line.includes('INT') && mainStats.includes('INT')) isValid = true;
                        if (line.includes('LUK') && mainStats.includes('LUK')) isValid = true;
                        if (line.includes('HP')) isValid = true; // HP는 항상 유효 (데몬어벤져용)

                        if (isValid) {
                            validStatLines++;
                            adiStatPct += bonusPct;
                        }
                    }

                    // 2. 공/마 상수 체크
                    const isAttLine = isMagic ? line.includes('마력') : line.includes('공격력');
                    if (isAttLine && !line.includes('%')) {
                        const val = parseInt(line.replace(/[^0-9]/g, '')) || 0;
                        validAttFlat += val;
                    }

                    // 3. 쿨타임 감소 체크 (모자)
                    if (item.item_equipment_slot === '모자' && line.includes('재사용 대기시간')) {
                        hasAdiCoolReduce = true;
                    }

                    // 4. 크리티컬 데미지 체크 (장갑)
                    if (item.item_equipment_slot === '장갑' && line.includes('크리티컬 데미지')) {
                        adiCritDmgLines++;
                    }
                });

                // 공/마 상수를 주스탯 %로 환산하여 합산 (공/마 1 = 주스탯 4, 주스탯 1% = 주스탯 10 가정 시, 공/마 1 = 0.4%)
                if (validAttFlat > 0) {
                    const convertedStatPct = (validAttFlat * 4) / 10;
                    adiStatPct += convertedStatPct;
                }

                // 소수점 처리 (반올림)
                adiStatPct = Math.round(adiStatPct);

                const attType = isMagic ? '마력' : '공격력';

                if (adiCritDmgLines >= 2) {
                    comments.push(`${adiPrefix} <b>쌍크뎀</b>...?! 이건 말이 안 됩니다. 전 서버급 에디셔널입니다. 부르는 게 값입니다.`);
                } else if (adiCritDmgLines === 1) {
                    comments.push(`${adiPrefix} <b>크리티컬 데미지</b>! 장갑 에디셔널의 종결 옵션입니다. 공/마보다 훨씬 좋습니다.`);
                } else if (hasAdiCoolReduce) {
                    comments.push(`${adiPrefix} <b>쿨타임 감소</b> 옵션이 붙어있습니다! 에디셔널에서 챙길 수 있는 최고의 유효 옵션 중 하나입니다. 대박!`);
                } else if (addPotentialGrade === '레전드리') {
                    // 레전드리 등급 전용 멘트
                    if (adiStatPct >= 21) {
                        comments.push(`${adiPrefix} <b>주스탯 ${adiStatPct}% 이상</b>! 에디셔널 종결급 옵션입니다. 전 서버급 스펙입니다.`);
                    } else if (adiStatPct >= 14) {
                        comments.push(`${adiPrefix} <b>주스탯 ${adiStatPct}% 이상</b>! 아주 훌륭한 준종결급 스펙입니다.`);
                    } else if (validAttFlat >= 12) {
                        comments.push(`${adiPrefix} <b>${attType} +${validAttFlat}</b> 이상! 든든한 옵션입니다.`);
                    } else {
                        comments.push(`${adiPrefix} 레전드리 등급이지만 옵션이 조금 아쉽습니다. 돌려보시는 건 어떨까요?`);
                    }
                } else if (validStatLines >= 3) {
                    if (addPotentialGrade === '유니크') {
                        comments.push(`${adiPrefix} <b>주스탯 3줄</b>! 레전드리 2줄급의 엄청난 효율입니다. 유니크 종결!`);
                    } else {
                        comments.push(pick([
                            `${adiPrefix} <b>주스탯 3줄</b>...?! 이건 <b>진짜 종결급</b>입니다. 더 이상 손댈 곳이 없습니다.`,
                            `${adiPrefix} 와... <b>3줄</b>이라니! 메이플 인생에 몇 번 보기 힘든 옵션입니다.`,
                            `${adiPrefix} <b>주스탯 3줄</b>! 완벽 그 자체입니다. 졸업을 축하드립니다.`
                        ]));
                    }
                } else if (validStatLines === 2) {
                    if (validAttFlat > 0) {
                        comments.push(`${adiPrefix} <b>주스탯 2줄</b>에 <b>${attType} +${validAttFlat}</b>까지! 완벽에 가까운 에디셔널입니다.`);
                    } else {
                        if (addPotentialGrade === '에픽' || addPotentialGrade === '레어') {
                            comments.push(pick([
                                `${adiPrefix} <b>주스탯 2줄</b>! 에픽 등급에서 챙길 수 있는 최고의 가성비 옵션입니다.`,
                                `${adiPrefix} <b>주스탯 2줄</b>, 아주 훌륭합니다. 가성비 세팅의 끝판왕입니다.`
                            ]));
                        } else if (addPotentialGrade === '유니크') {
                            comments.push(pick([
                                `${adiPrefix} <b>주스탯 2줄</b>! 유니크 등급에서 챙길 수 있는 훌륭한 옵션입니다.`,
                                `${adiPrefix} <b>주스탯 2줄</b>, 꽤 좋은 옵션입니다. 충분히 현역으로 쓸 수 있습니다.`
                            ]));
                        } else {
                            comments.push(`${adiPrefix} <b>주스탯 2줄</b>! 꽤 좋은 옵션입니다.`);
                        }
                    }
                } else if (validStatLines === 1) {
                    if (validAttFlat > 0) {
                        comments.push(`${adiPrefix} <b>주스탯 %</b>와 <b>${attType} +${validAttFlat}</b>을 모두 챙기셨군요. 가성비 최고의 알짜배기 옵션입니다.`);
                    } else {
                        if (addPotentialGrade === '유니크') {
                            comments.push(`${adiPrefix} <b>주스탯 %</b> 1줄입니다. 유니크 등급치고는 아쉽습니다. 2줄 이상을 노려보세요.`);
                        } else {
                            comments.push(pick([
                                `${adiPrefix} <b>주스탯 %</b> 한 줄도 훌륭한 유효 옵션입니다. 가성비 최고!`,
                                `${adiPrefix} <b>주스탯 %</b>를 챙기셨군요. ${attType} 10만큼이나 든든한 옵션입니다.`
                            ]));
                        }
                    }
                } else if (validAttFlat >= 10) {
                    comments.push(pick([
                        `${adiPrefix} <b>${attType} +${validAttFlat}</b>! 스펙업의 정석입니다.`,
                        `${adiPrefix} 소소하지만 확실한 <b>${attType}</b> 챙기기! 아주 좋습니다.`
                    ]));
                }
            }
        }
    }

    // 5. 마무리
    if (comments.length === 0) {
        comments.push(pick([
            "전반적으로 무난한 세팅입니다. 하지만 더 강력해질 여지가 충분히 남아있어요!",
            "나쁘지 않은 장비지만, 조금 더 욕심을 내보셔도 좋을 것 같습니다.",
            "기본기는 갖춰져 있습니다. 이제 디테일을 챙겨볼까요?"
        ]));
    }

    // === 🚀 진화형 AI (Antigravity) 추가 진단 ===
    const deepComments = diagnoseItemDeeply(item, job);
    if (deepComments.length > 0) {
        // 줄바꿈을 명확히 하여 UI에서 구분되도록 함
        return comments.join(" ") + "\n---\n### 🚀 [진화형 AI] 정밀 진단 리포트\n" + deepComments.join("\n\n");
    }

    return comments.join(" ");
}
