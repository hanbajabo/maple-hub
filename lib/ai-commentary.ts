import { diagnoseItemDeeply } from './diagnosis/equipment';

// 아이템 데이터를 기반으로 AI 분석 멘트를 생성하는 함수
export function generateItemCommentary(item: any): string {
    if (!item) return "아이템 정보를 분석할 수 없습니다.";

    // Helper for random comments
    const pick = (opts: string[]) => opts[Math.floor(Math.random() * opts.length)];

    const starforce = parseInt(item.starforce) || 0;
    const potentialGrade = item.potential_option_grade || '없음';
    const addPotentialGrade = item.additional_potential_option_grade || '없음';
    const itemName = item.item_name || '장비';

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
    const brilliantBossSet = ['근원의 속삭임', '죽음의 맹세', '불멸의 유산'];
    const pitchBossSet = [
        '창세의 뱃지', '저주받은 마도서', '미트라의 분노',
        '고통의 근원', '몽환의 벨트', '루즈 컨트롤 머신 마크', '마력이 깃든 안대',
        '커맨더 포스 이어링', '거대한 공포'
    ];
    const eternalSet = ['에테르넬'];
    const dawnSet = ['트와일라이트 마크', '에스텔라 이어링', '데이브레이크 펜던트', '여명의 가디언 엔젤 링'];
    const genesisWeapon = ['제네시스'];
    const challengerSet = ['도전자']; // 뉴비/복귀 유저용

    let isLuxury = false; // 명품 여부
    let isEndGameItem = false; // 종결급 아이템 여부
    let isStarter = false; // 스타터 아이템 여부

    if (challengerSet.some(name => itemName.includes(name))) {
        comments.push(pick([
            `[도전자 세트] 메이플 월드에 오신 것을 환영합니다! (혹은 복귀를 축하드려요!) 이 장비는 성장의 든든한 발판이 되어줄 겁니다.`,
            `[도전자 세트] 시작이 반입니다! 이 장비와 함께라면 어떤 모험도 두렵지 않아요.`,
            `[도전자 세트] 훌륭한 시작 아이템입니다. 차근차근 스펙업의 재미를 느껴보세요!`,
            `[도전자 세트] 모험의 시작을 알리는 장비군요. 앞으로 더 멋진 장비들을 만나게 될 거예요!`
        ]));
        isStarter = true;
    } else if (brilliantBossSet.some(name => itemName.includes(name))) {
        comments.push(pick([
            `[광휘의 보스 세트] 맙소사... <b>"${itemName}"</b>이라니! 칠흑을 뛰어넘는 메이플스토리 최강의 아이템입니다.`,
            `[광휘의 보스 세트] 전 서버에 몇 개 없는 전설의 아이템을 영접합니다. 눈이 부시네요.`,
            `[광휘의 보스 세트] 이 아이템을 본 것만으로도 영광입니다. 진정한 지존의 장비군요.`,
            `[광휘의 보스 세트] 와... 말이 안 나옵니다. 메이플의 역사를 쓰는 아이템입니다.`
        ]));
        isLuxury = true;
        isEndGameItem = true;
    } else if (pitchBossSet.some(name => itemName.includes(name))) {
        comments.push(pick([
            `[칠흑의 보스 세트] 메이플 월드에서 가장 희귀하고 강력한 <b>칠흑</b> 아이템이군요.`,
            `[칠흑의 보스 세트] 검은 마법사의 힘이 깃든 <b>칠흑</b>! 보기만 해도 압도됩니다.`,
            `[칠흑의 보스 세트] 선택받은 자만이 가질 수 있다는 <b>칠흑</b>... 정말 부럽습니다.`,
            `[칠흑의 보스 세트] 이게 바로 그 전설의 <b>칠흑</b> 풀세트 파츠 중 하나군요!`,
            `[칠흑의 보스 세트] 칠흑의 기운이 느껴집니다. 고스펙의 상징 그 자체네요.`
        ]));
        isLuxury = true;
        isEndGameItem = true;
    } else if (eternalSet.some(name => itemName.includes(name))) {
        comments.push(pick([
            `[에테르넬 세트] 방어구의 끝판왕, <b>에테르넬</b> 장비입니다.`,
            `[에테르넬 세트] 메이플스토리 최상위 방어구, <b>에테르넬</b>을 착용하셨군요. 위엄이 느껴집니다.`,
            `[에테르넬 세트] 진정한 지배자의 갑옷, <b>에테르넬</b>입니다.`,
            `[에테르넬 세트] 이름만 들어도 가슴이 웅장해지는 그 장비! <b>에테르넬</b>입니다.`,
            `[에테르넬 세트] 카루타의 시대를 끝낸 유일한 장비, 에테르넬을 영접합니다.`
        ]));
        isLuxury = true;
        isEndGameItem = true;
    } else if (genesisWeapon.some(name => itemName.includes(name))) {
        comments.push(pick([
            `[제네시스 무기] 해방 퀘스트의 증표, <b>해방 무기</b>군요. 경의를 표합니다.`,
            `[제네시스 무기] 검은 마법사를 쓰러뜨린 영웅의 증명! <b>해방 무기</b>의 포스가 느껴집니다.`,
            `[제네시스 무기] 진정한 해방을 이루셨군요. 축하드립니다!`,
            `[제네시스 무기] 노력의 결실이 담긴 최고의 무기입니다.`
        ]));
        isLuxury = true;
        isEndGameItem = true;
    } else if (dawnSet.some(name => itemName.includes(name))) {
        comments.push(pick([
            `[여명의 보스 세트] 가성비와 고점을 모두 잡은 훌륭한 선택입니다.`,
            `[여명의 보스 세트] 칠흑으로 가기 전 최고의 징검다리이자 종결급 아이템이죠.`,
            `[여명의 보스 세트] 든든한 국밥 같은 장비 세팅입니다. 아주 좋아요!`,
            `[여명의 보스 세트] 성능과 가격, 두 마리 토끼를 모두 잡은 현명한 선택입니다.`
        ]));
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
    const slot = item.item_equipment_slot;
    const isMedal = slot === '훈장';
    const isBadge = slot === '뱃지';
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
        if (starforce >= 10) {
            comments.push(`<b>10성</b>! 실버블라썸 링의 최대 강화 수치까지 달성하셨군요. 가성비 반지의 제왕입니다.`);
        } else {
            comments.push(`실버블라썸 링은 <b>10성</b>이 최대입니다. 조금만 더 강화해서 가성비를 챙겨보세요!`);
        }
    } else if (isNoljang) {
        if (starforce >= 10) {
            comments.push(`<b>놀장강/슈페리얼 ${starforce}성</b>! 22성 아이템과 맞먹는 엄청난 성능입니다. 구하기 힘든 귀한 아이템을 가지고 계시네요.`);
        } else {
            comments.push(`<b>놀장강/슈페리얼 ${starforce}성</b>! 일반적인 스타포스보다 훨씬 강력한 성능을 보여줍니다.`);
        }
    } else if (!isMedal && !isBadge && !isPocket && !isEmblem && !isSubWeapon && !isEventRing) {
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
            } else if (starforce < 10) {
                comments.push(`스타포스 강화가 시급합니다. <b>10성</b> 이상만 달아도 공격력이 확 달라질 거예요.`);
            } else {
                comments.push(`여유가 되신다면 <b>17성</b> 강화를 목표로 해보세요. 스펙업 체감이 가장 큰 구간입니다.`);
            }
        }
    }

    // 2. 추가옵션(추옵) 분석
    // 환생의 불꽃 사용 가능 부위: 무기, 모자, 상의, 하의, 신발, 망토, 장갑, 눈장식, 얼굴장식, 펜던트, 벨트, 귀고리
    // 사용 불가: 반지, 어깨장식, 뱃지, 훈장, 포켓, 엠블렘, 보조무기, 기계심장
    const canUseFlame = ['무기', '모자', '상의', '하의', '신발', '망토', '장갑', '눈장식', '얼굴장식', '펜던트', '벨트', '귀고리'].includes(slot);

    if (canUseFlame) {
        const addOptions = item.item_add_option || {};
        const addAtt = parseInt(addOptions.attack_power) || 0;
        const addMagic = parseInt(addOptions.magic_power) || 0;
        const addAllStat = parseInt(addOptions.all_stat) || 0;

        const isWeapon = slot === '무기';

        if (isWeapon) {
            const level = item.item_base_option?.base_equipment_level || 0;
            let tier1 = 0;
            let tier2 = 0;

            if (level >= 200) { tier1 = 125; tier2 = 98; } // 아케인 기준
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
            if (addAllStat >= 6) {
                comments.push(pick([
                    `<b>올스탯 +${addAllStat}%</b> 고추옵이 든든하게 받쳐주고 있네요.`,
                    `<b>올스탯 ${addAllStat}%</b>! 방어구 추옵의 핵심을 잘 챙기셨습니다.`,
                    `추옵이 아주 예쁘게 붙었네요. <b>올스탯 ${addAllStat}%</b> 굿!`
                ]));
            } else if (addAllStat === 0 && addAtt === 0 && isEndGameItem) {
                comments.push(`이 좋은 장비에 추가옵션이 거의 없습니다. <b>환생의 불꽃</b> 작업이 필수입니다.`);
            }
        }
    }

    // 3. 잠재능력 정밀 분석 (눈높이 적용)
    if (!isMedal && !isBadge && !isPocket) {
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

                if (line.includes('STR') && line.includes('%')) strTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
                if (line.includes('DEX') && line.includes('%')) dexTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
                if (line.includes('INT') && line.includes('%')) intTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
                if (line.includes('LUK') && line.includes('%')) lukTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
                if (line.includes('올스탯') && line.includes('%')) allStatTotal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
            });
            // 주스탯은 STR/DEX/INT/LUK 중 가장 높은 값만 선택 (직업의 주스탯이 가장 높게 나올 것)
            statPct = Math.max(strTotal, dexTotal, intTotal, lukTotal) + allStatTotal;
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

                if (statPct >= 36) {
                    comments.push(pick([
                        `${potPrefix} <b>주스탯 ${statPct}%</b>... <b>'올이탈'</b> 국가권력급 스펙입니다! 로또 1등 당첨보다 어렵다는 확률을 뚫으셨군요.`,
                        `${potPrefix} <b>주스탯 ${statPct}%</b>?! 큐브가 고장난 거 아닌가요? 믿을 수 없는 수치입니다.`,
                        `${potPrefix} 옵션 세 줄이 전부 이탈이라니... <b>${statPct}%</b>의 기적을 봅니다.`,
                        `${potPrefix} 예술 작품입니다. <b>${statPct}%</b>... 감탄만 나오네요.`
                    ]));
                } else if (statPct >= 33) {
                    comments.push(pick([
                        `${potPrefix} <b>'쌍이탈'</b> 옵션(33% 이상)이 떴습니다! 정옵을 뛰어넘은 초고스펙입니다.`,
                        `${potPrefix} <b>주스탯 ${statPct}%</b>! 쌍이탈의 축복을 받으셨군요.`,
                        `${potPrefix} 남들은 하나 띄우기도 힘든 이탈 옵션을 두 줄이나! <b>${statPct}%</b> 달성!`,
                        `${potPrefix} 정옵(30%)을 가볍게 뛰어넘는 <b>${statPct}%</b>! 고스펙의 증명입니다.`
                    ]));
                } else if (statPct >= 30) {
                    comments.push(pick([
                        `${potPrefix} <b>주스탯 ${statPct}%</b>로 깔끔하게 3줄 유효 옵션을 챙기셨네요. 군더더기 없는 완벽한 졸업급 정옵입니다.`,
                        `${potPrefix} <b>${statPct}%</b> 정옵! 마음이 편안해지는 숫자입니다.`,
                        `${potPrefix} 깔끔한 <b>30%</b>! 더 이상 바랄 게 없는 졸업 옵션입니다.`
                    ]));
                } else if (statPct >= 27) {
                    comments.push(pick([
                        `${potPrefix} <b>주스탯 ${statPct}%</b>! 3줄 유효 옵션을 챙기셨군요. 상위권 스펙으로 도약하기 위한 아주 강력한 발판입니다.`,
                        `${potPrefix} <b>27%</b>면 사실상 졸업급입니다. 아주 훌륭한 스펙을 완성하셨네요!`,
                        `${potPrefix} <b>${statPct}%</b>! 이 정도면 어디 가서 꿀리지 않는 고스펙입니다. 든든합니다!`
                    ]));
                } else if (statPct >= 21) {
                    comments.push(pick([
                        `${potPrefix} <b>주스탯 ${statPct}%</b>는 레전드리 등급의 표준입니다. 나쁘지 않지만, 고스펙을 노린다면 27% 이상을 도전해보세요.`,
                        `${potPrefix} <b>21%</b>로 일단 멈추셨군요. 가성비는 좋지만 레전드리 등급치고는 조금 아쉽습니다.`,
                        `일단 <b>${statPct}%</b>로 쓰시다가, 나중에 여유 될 때 3줄을 노려봅시다.`,
                        `${potPrefix} <b>${statPct}%</b>... 레전드리 맛보기 스푼이군요. 더 높은 곳을 향해!`
                    ]));
                } else if (statPct < 21 && !coolTime && !critDmg && !dropRate && !mesoRate) {
                    comments.push(`레전드리 등급이지만 옵션 수치가 아쉽습니다. 큐브를 통해 <b>21% 이상</b> 혹은 <b>유효 2줄</b>을 노려보시는 걸 추천합니다.`);
                }
            }

            if (coolTime >= 4) comments.push(`<b>쿨타임 감소 ${coolTime}초</b>는 종결급 옵션입니다.`);
            if (critDmg >= 16) comments.push(`<b>쌍크뎀</b> 장갑... 전 서버급 매물입니다.`);

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
            if (statPct >= 12) {
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
            } else if (statPct === 0 && attPct === 0 && magicPct === 0) {
                comments.push(`잠재능력 옵션이 아쉽습니다. <b>수상한 큐브</b>로 최소 <b>주스탯 %</b> 또는 <b>공격력/마력 %</b>를 챙겨주세요.`);
            }
        }

        // 4. 에디셔널 조언
        let addAttVal = 0;
        let addMagicVal = 0;
        addPotentials.forEach(line => {
            if (line.includes('공격력') && !line.includes('%')) {
                addAttVal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
            }
            if (line.includes('마력') && !line.includes('%')) {
                addMagicVal += parseInt(line.replace(/[^0-9]/g, '')) || 0;
            }
        });

        if (addPotentialGrade === '레어' || addPotentialGrade === '없음') {
            if (addAttVal > 0 || addMagicVal > 0) {
                const stats = [];
                if (addAttVal > 0) stats.push(`공격력 +${addAttVal}`);
                if (addMagicVal > 0) stats.push(`마력 +${addMagicVal}`);
                comments.push(pick([
                    `에디셔널에서 <b>${stats.join(", ")}</b>을 챙기셨네요. 레어 등급에서는 최선의 선택입니다. 아주 알뜰하시군요!`,
                    `<b>${stats.join(", ")}</b>! 소소하지만 확실한 스펙업입니다.`,
                    `가성비 좋게 <b>공/마 10</b>을 챙기셨네요. 현명합니다.`
                ]));
            } else if (isEndGameItem || starforce >= 17) {
                comments.push(`윗잠재와 스타포스는 훌륭한데, <b>에디셔널 잠재능력</b>이 비어있네요. 에디셔널 공/마 한 줄만 챙겨도 스펙이 확 오를 겁니다.`);
            } else if (addPotentialGrade === '없음') {
                comments.push(`<b>에디셔널 잠재능력</b>이 없습니다. 수큐로 공/마 10이라도 챙기면 큰 도움이 됩니다.`);
            }
        } else {
            // 에픽, 유니크, 레전드리 에디셔널
            const adiPrefixes = ["에디셔널은", "에디는", "밑잠은", "에디 옵션은"];
            const adiPrefix = pick(adiPrefixes);

            if (slot === '무기' || slot === '보조무기' || slot === '엠블렘' || item.item_equipment_part === '보조무기') {
                const addAttLines = addPotentials.filter(l => (l.includes('공격력') || l.includes('마력')) && l.includes('%')).length;
                const addBossLines = addPotentials.filter(l => l.includes('보스')).length;

                if (addAttLines >= 3) {
                    comments.push(`${adiPrefix} <b>공/마 3줄</b>...?! 이건 기적입니다. 전 서버급 매물을 보유하고 계시네요.`);
                } else if (addAttLines >= 2) {
                    comments.push(`${adiPrefix} <b>공/마 2줄</b>! 윗잠재와 합쳐져서 엄청난 시너지를 냅니다. 종결급 에디셔널입니다.`);
                } else if (addAttLines >= 1 && addBossLines >= 1) {
                    comments.push(`${adiPrefix} <b>공/마</b>와 <b>보공</b>을 모두 챙기셨군요. 밸런스가 아주 좋은 준종결 세팅입니다.`);
                } else if (addAttLines >= 1) {
                    comments.push(`${adiPrefix} <b>공/마 1줄</b>은 국룰이죠. 든든하게 스펙을 받쳐주고 있습니다.`);
                } else if (addBossLines >= 2) {
                    comments.push(`${adiPrefix} <b>보공 2줄</b>! 공/마보다는 티어가 낮지만, 실전 딜 상승량은 무시할 수 없습니다. 가성비 최고의 선택입니다.`);
                } else if (addBossLines >= 1) {
                    comments.push(`${adiPrefix} <b>보공</b>을 챙기셨네요. 나쁘지 않지만, 추후 <b>공/마 %</b> 옵션으로 교체를 고려해보세요.`);
                }
            } else {
                // 방어구 에디셔널 (주스탯/공마)
                // 에디셔널도 주스탯만 계산 (부스탯 제외)
                let addStrTotal = 0;
                let addDexTotal = 0;
                let addIntTotal = 0;
                let addLukTotal = 0;
                let addAllStatTotal = 0;

                addPotentials.forEach(line => {
                    if (line) {
                        const match = line.match(/(\d+)%/);
                        if (match) {
                            if (line.includes('STR') && line.includes('%')) addStrTotal += parseInt(match[1]);
                            else if (line.includes('DEX') && line.includes('%')) addDexTotal += parseInt(match[1]);
                            else if (line.includes('INT') && line.includes('%')) addIntTotal += parseInt(match[1]);
                            else if (line.includes('LUK') && line.includes('%')) addLukTotal += parseInt(match[1]);
                            else if (line.includes('올스탯') && line.includes('%')) addAllStatTotal += parseInt(match[1]);
                        }
                    }
                });

                // 유효 줄 수 계산 (각 스탯별로 올스탯 포함하여 최대 줄 수 계산)
                let strLines = 0;
                let dexLines = 0;
                let intLines = 0;
                let lukLines = 0;
                let hpLines = 0;
                let allStatLines = 0;

                addPotentials.forEach(line => {
                    if (!line) return;
                    if (line.includes('올스탯') && line.includes('%')) allStatLines++;
                    else if (line.includes('STR') && line.includes('%')) strLines++;
                    else if (line.includes('DEX') && line.includes('%')) dexLines++;
                    else if (line.includes('INT') && line.includes('%')) intLines++;
                    else if (line.includes('LUK') && line.includes('%')) lukLines++;
                    else if (line.includes('HP') && line.includes('%')) hpLines++;
                });

                // 가장 높은 줄 수를 가진 스탯을 기준으로 함
                const addStatLines = Math.max(
                    strLines + allStatLines,
                    dexLines + allStatLines,
                    intLines + allStatLines,
                    lukLines + allStatLines,
                    hpLines + allStatLines
                );

                const addAttFlat = addPotentials.some(l => (l.includes('공격력') || l.includes('마력')) && !l.includes('%')); // 공/마 상수

                if (addStatLines >= 3) {
                    comments.push(pick([
                        `${adiPrefix} <b>주스탯 3줄</b>...?! 이건 <b>진짜 종결급</b>입니다. 더 이상 손댈 곳이 없습니다.`,
                        `${adiPrefix} 와... <b>3줄</b>이라니! 메이플 인생에 몇 번 보기 힘든 옵션입니다.`,
                        `${adiPrefix} <b>주스탯 3줄</b>! 완벽 그 자체입니다. 졸업을 축하드립니다.`,
                        `${adiPrefix} 큐브가 춤을 췄군요. <b>3줄 유효</b> 대박!`,
                        `${adiPrefix} 이건 가보로 물려줘야 합니다. <b>3줄</b>의 기적!`,
                        `${adiPrefix} 에디 <b>3줄</b>이면... 경매장에 올리면 댓글이 불탈 거예요. 절대 팔지 마세요!`,
                        `${adiPrefix} 제가 평생 봐온 장비 중에서도 손에 꼽습니다. <b>3줄</b>의 위엄!`,
                        `${adiPrefix} 단풍이가 절을 올립니다. (꾸벅) <b>주스탯 3줄</b>의 주인님을 영접합니다.`,
                        `${adiPrefix} 이 장비는 박물관 전시용입니다. <b>3줄</b>... 국보급 매물!`,
                        `${adiPrefix} 로또 1등보다 낮은 확률을 뚫으셨습니다. <b>3줄 유효</b> 기적!`,
                        `${adiPrefix} 큐브 회사가 파산할 뻔했는데 <b>3줄</b> 나왔네요! 대박입니다!`,
                        `${adiPrefix} 이 옵션 띄우려고 얼마나 많은 에디큐브를... 존경합니다. <b>3줄</b>!`,
                        `${adiPrefix} <b>주스탯 3줄</b>? 서버 전체가 떠들썩하겠는데요?!`,
                        `${adiPrefix} 혹시 넥슨 개발자이신가요? 일반인이 <b>3줄</b>을 띄우다니...`,
                        `${adiPrefix} 이 장비 하나로 은퇴하셔도 됩니다. <b>3줄 유효</b> 종결!`,
                        `${adiPrefix} 경매장 시세? 매길 수가 없습니다. <b>3줄</b>은 가격을 초월해요.`,
                        `${adiPrefix} 단풍이 AI가 감동의 눈물을 흘립니다. <b>주스탯 3줄</b>이라니...`,
                        `${adiPrefix} 이건 그냥 <b>완성형</b>입니다. 더 이상의 설명이 필요없어요.`,
                        `${adiPrefix} 길드원들이 부러워서 잠을 못 잘 거예요. <b>3줄</b> 실화?!`,
                        `${adiPrefix} <b>주스탯 3줄</b>... 단풍이도 처음 봅니다. 전설이시네요.`,
                        `${adiPrefix} 이 장비는 메이플스토리 역사에 기록될 겁니다. <b>3줄 완벽</b>!`,
                        `${adiPrefix} 큐브 확률표를 거스른 당신... <b>3줄</b>의 신!`,
                        `${adiPrefix} 남들은 1줄도 못 띄우는데 <b>3줄</b>이라니! 운이 좋으신 거예요, 노력? 둘 다!`,
                        `${adiPrefix} 이 정도면 유튜브에 인증해야 합니다. <b>3줄</b> 달성!`,
                        `${adiPrefix} 메이플 인생의 하이라이트를 찍으셨군요. <b>주스탯 3줄</b> 축하!`
                    ]));
                } else if (addStatLines === 2) {
                    comments.push(pick([
                        `${adiPrefix} <b>주스탯 2줄</b>! 방어구 에디셔널 종결급입니다.`,
                        `${adiPrefix} <b>주스탯 2줄</b>, 아주 훌륭합니다. 이 정도면 평생 쓰셔도 됩니다.`,
                        `${adiPrefix} 깔끔하게 <b>2줄</b> 챙기셨네요. 스펙업에 큰 도움이 됩니다.`
                    ]));
                } else if (addStatLines === 1) {
                    comments.push(pick([
                        `${adiPrefix} <b>주스탯 %</b> 한 줄도 훌륭한 유효 옵션입니다. 가성비 최고!`,
                        `${adiPrefix} <b>주스탯 %</b>를 챙기셨군요. 공/마 10만큼이나 든든한 옵션입니다.`,
                        `${adiPrefix} 소소하지만 확실한 스펙업! <b>주스탯 %</b> 한 줄 챙기기 성공입니다.`
                    ]));
                } else if (addAttVal >= 10 || addMagicVal >= 10) {
                    comments.push(pick([
                        `${adiPrefix} <b>공/마 +${Math.max(addAttVal, addMagicVal)}</b>! 스펙업의 정석입니다.`,
                        `${adiPrefix} 소소하지만 확실한 <b>공/마</b> 챙기기! 아주 좋습니다.`,
                        `${adiPrefix} <b>공/마</b>는 언제나 옳습니다.`
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
    const deepComments = diagnoseItemDeeply(item);
    if (deepComments.length > 0) {
        // 줄바꿈을 명확히 하여 UI에서 구분되도록 함
        return comments.join(" ") + "\n---\n### 🚀 [진화형 AI] 정밀 진단 리포트\n" + deepComments.join("\n\n");
    }

    return comments.join(" ");
}
