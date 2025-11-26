
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
            `**[도전자 세트]** 메이플 월드에 오신 것을 환영합니다! (혹은 복귀를 축하드려요!) 이 장비는 성장의 든든한 발판이 되어줄 겁니다.`,
            `**[도전자 세트]** 시작이 반입니다! 이 장비와 함께라면 어떤 모험도 두렵지 않아요.`,
            `**[도전자 세트]** 훌륭한 시작 아이템입니다. 차근차근 스펙업의 재미를 느껴보세요!`
        ]));
        isStarter = true;
    } else if (brilliantBossSet.some(name => itemName.includes(name))) {
        comments.push(pick([
            `**[광휘의 보스 세트]** 맙소사... **"${itemName}"**이라니! 칠흑을 뛰어넘는 메이플스토리 최강의 아이템입니다.`,
            `**[광휘의 보스 세트]** 전 서버에 몇 개 없는 전설의 아이템을 영접합니다.`,
            `**[광휘의 보스 세트]** 이 아이템을 본 것만으로도 영광입니다. 진정한 지존의 장비군요.`
        ]));
        isLuxury = true;
        isEndGameItem = true;
    } else if (pitchBossSet.some(name => itemName.includes(name))) {
        comments.push(pick([
            `**[칠흑의 보스 세트]** 메이플 월드에서 가장 희귀하고 강력한 **칠흑** 아이템이군요.`,
            `**[칠흑의 보스 세트]** 검은 마법사의 힘이 깃든 **칠흑**! 보기만 해도 압도됩니다.`,
            `**[칠흑의 보스 세트]** 선택받은 자만이 가질 수 있다는 **칠흑**... 정말 부럽습니다.`,
            `**[칠흑의 보스 세트]** 이게 바로 그 전설의 **칠흑** 풀세트 파츠 중 하나군요!`
        ]));
        isLuxury = true;
        isEndGameItem = true;
    } else if (eternalSet.some(name => itemName.includes(name))) {
        comments.push(pick([
            `**[에테르넬 세트]** 방어구의 끝판왕, **에테르넬** 장비입니다.`,
            `**[에테르넬 세트]** 메이플스토리 최상위 방어구, **에테르넬**을 착용하셨군요. 위엄이 느껴집니다.`,
            `**[에테르넬 세트]** 진정한 지배자의 갑옷, **에테르넬**입니다.`,
            `**[에테르넬 세트]** 이름만 들어도 가슴이 웅장해지는 그 장비! **에테르넬**입니다.`
        ]));
        isLuxury = true;
        isEndGameItem = true;
    } else if (genesisWeapon.some(name => itemName.includes(name))) {
        comments.push(pick([
            `**[제네시스 무기]** 해방 퀘스트의 증표, **해방 무기**군요. 경의를 표합니다.`,
            `**[제네시스 무기]** 검은 마법사를 쓰러뜨린 영웅의 증명! **해방 무기**의 포스가 느껴집니다.`,
            `**[제네시스 무기]** 진정한 해방을 이루셨군요. 축하드립니다!`
        ]));
        isLuxury = true;
        isEndGameItem = true;
    } else if (dawnSet.some(name => itemName.includes(name))) {
        comments.push(pick([
            `**[여명의 보스 세트]** 가성비와 고점을 모두 잡은 훌륭한 선택입니다.`,
            `**[여명의 보스 세트]** 칠흑으로 가기 전 최고의 징검다리이자 종결급 아이템이죠.`,
            `**[여명의 보스 세트]** 든든한 국밥 같은 장비 세팅입니다. 아주 좋아요!`
        ]));
    } else {
        const openings = [
            `[단풍이의 분석] "${itemName}"의 잠재력을 냉철하게 분석했습니다.`,
            `[AI 리포트] 단풍이가 이 장비의 '급'을 정확히 계산해봤어요!`,
            `[스펙 진단] 수치 뒤에 숨겨진 진짜 성능을 파헤칩니다.`,
        ];
        comments.push(openings[Math.floor(Math.random() * openings.length)]);
    }

    // 스타터 아이템(도전자)일 경우 별도 로직
    if (isStarter) {
        comments.push(`지금은 스펙 고민보다는 **레벨업**과 **심볼 성장**에 집중하실 때입니다. 이 장비로도 아케인 리버 초반 지역은 충분히 돌파할 수 있어요.`);
        comments.push(`어느 정도 적응이 되시면 **루타비스 세트(카루타)**를 맞추시고, 무기와 방어구는 바로 **아케인셰이드**로 넘어가는 걸 추천합니다. 요즘은 아케인이 대세거든요! 😎 단풍이가 응원하겠습니다! 화이팅! 🌱`);
        return comments.join(" "); // 스타터는 여기서 분석 종료 (복잡한 수치 분석 생략)
    }

    // 특수 반지(시드링) 분석
    const specialRingLevel = item.special_ring_level || 0;
    if (specialRingLevel > 0) {
        comments.push(`**[특수 스킬 반지 Lv.${specialRingLevel}]**`);
        if (specialRingLevel >= 6) {
            comments.push(`6레벨... **끝판왕**을 영접합니다. ✨ 이 반지만 있으면 무서울 게 없겠네요. 전 서버급 스펙입니다!`);
        } else if (specialRingLevel === 5) {
            comments.push(`와... **5레벨**?! 진짜 고스펙의 상징입니다. 연마까지 성공하셨군요! 부럽습니다.`);
        } else if (specialRingLevel === 4) {
            comments.push(`**4레벨**, 아주 좋습니다! 보스전에서 강력한 화력을 보여주겠군요. 극딜 타임이 기다려지시겠어요.`);
        } else if (specialRingLevel === 3) {
            comments.push(`**3레벨**, 가성비 좋은 선택입니다! 실전에서 충분히 쓸만해요. 4레벨을 향해 화이팅!`);
        } else {
            comments.push(`아직은 입문 단계군요. **3레벨 이상**을 목표로 해보세요! 성능 차이가 확 느껴질 겁니다.`);
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
                comments.push(`**8성**! 하트의 한계치까지 완벽하게 강화하셨군요. 훌륭합니다.`);
            } else {
                comments.push(`이 하트는 **8성**이 최대입니다. 조금만 더 힘내서 졸업시켜주세요!`);
            }
        } else if (itemName.includes('블랙 하트')) {
            comments.push(`**블랙 하트**... 기간제지만 성능은 확실하죠. 기간 끝나기 전에 뽕을 뽑아야 합니다!`);
        } else {
            if (starforce >= 5) {
                comments.push(`**${starforce}성**으로 알뜰하게 잘 챙기셨네요.`);
            }
        }
    } else if (itemName.includes('실버블라썸 링')) {
        if (starforce >= 10) {
            comments.push(`**10성**! 실버블라썸 링의 최대 강화 수치까지 달성하셨군요. 가성비 반지의 제왕입니다.`);
        } else {
            comments.push(`실버블라썸 링은 **10성**이 최대입니다. 조금만 더 강화해서 가성비를 챙겨보세요!`);
        }
    } else if (isNoljang) {
        if (starforce >= 10) {
            comments.push(`**놀장강/슈페리얼 ${starforce}성**! 22성 아이템과 맞먹는 엄청난 성능입니다. 구하기 힘든 귀한 아이템을 가지고 계시네요.`);
        } else {
            comments.push(`**놀장강/슈페리얼 ${starforce}성**! 일반적인 스타포스보다 훨씬 강력한 성능을 보여줍니다.`);
        }
    } else if (!isMedal && !isBadge && !isPocket && !isEmblem && !isSubWeapon && !isEventRing) {
        if (starforce >= 23) {
            comments.push(pick([
                `**${starforce}성**...?! 이건 데이터 오류가 아닙니다. **'신'의 영역**입니다. 전 서버를 통틀어도 보기 힘든 기적의 아이템입니다.`,
                `**${starforce}성**?! 운영자님 여기에요! 여기 강화의 신이 있습니다!`,
                `**${starforce}성** 성공이라니, 전생에 나라를 구하셨나요? 경이롭습니다.`,
                `이 아이템은 이제 문화재로 지정해야 합니다. **${starforce}성**이라니...`
            ]));
        } else if (starforce === 22) {
            comments.push(pick([
                `**22성 스타포스**, 더 이상 바랄 게 없는 완벽한 수치입니다.`,
                `깔끔한 **22성**! 졸업을 축하드립니다.`,
                `**22성**의 영롱한 별빛이 캐릭터를 감싸고 있네요. 완벽합니다.`,
                `스타포스의 종착역, **22성**에 도착하셨습니다.`
            ]));
        } else if (starforce >= 17) {
            if (isEndGameItem) {
                comments.push(`**${starforce}성**은 이 명품 장비의 잠재력을 100% 끌어내지 못합니다. 이 장비의 진가는 **22성**에서 발휘됩니다.`);
            } else {
                comments.push(`**${starforce}성**으로 가성비 구간을 잘 맞추셨습니다. 훌륭한 허리 라인업이네요.`);
            }
        } else {
            if (isEndGameItem) {
                comments.push(`하지만 **${starforce}성**이라니요... 이런 귀한 장비에 스타포스가 너무 부족합니다. 최소 **17성**, 목표는 **22성**입니다.`);
            } else if (starforce < 10) {
                comments.push(`스타포스 강화가 시급합니다. **10성** 이상만 달아도 공격력이 확 달라질 거예요.`);
            } else {
                comments.push(`여유가 되신다면 **17성** 강화를 목표로 해보세요. 스펙업 체감이 가장 큰 구간입니다.`);
            }
        }
    }

    // 2. 추가옵션(추옵) 분석
    if (!isMedal && !isBadge && !isEmblem && !isSubWeapon && !isRing && !isHeart) {
        const addOptions = item.item_add_option || {};
        const addAtt = parseInt(addOptions.attack_power) || 0;
        const addMagic = parseInt(addOptions.magic_power) || 0;
        const addAllStat = parseInt(addOptions.all_stat) || 0;

        const isWeapon = slot === '무기';

        if (isWeapon) {
            if (addAtt >= 100 || addMagic >= 100) {
                comments.push(`**추가옵션 공/마 +${Math.max(addAtt, addMagic)}**는 극추옵입니다. 환생의 불꽃 대성공이네요!`);
            } else if (addAtt < 40 && addMagic < 40 && isEndGameItem) {
                comments.push(`무기인데 추가옵션이 너무 낮습니다. **영원한 환생의 불꽃**으로 최소 2추 이상은 뽑아주셔야 합니다.`);
            }
        } else {
            if (addAllStat >= 6) {
                comments.push(`**올스탯 +${addAllStat}%** 고추옵이 든든하게 받쳐주고 있네요.`);
            } else if (addAllStat === 0 && addAtt === 0 && isEndGameItem) {
                comments.push(`이 좋은 장비에 추가옵션이 거의 없습니다. **환생의 불꽃** 작업이 필수입니다.`);
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

                const str = line.includes('STR') && line.includes('%') ? parseInt(line.replace(/[^0-9]/g, '')) || 0 : 0;
                const dex = line.includes('DEX') && line.includes('%') ? parseInt(line.replace(/[^0-9]/g, '')) || 0 : 0;
                const int = line.includes('INT') && line.includes('%') ? parseInt(line.replace(/[^0-9]/g, '')) || 0 : 0;
                const luk = line.includes('LUK') && line.includes('%') ? parseInt(line.replace(/[^0-9]/g, '')) || 0 : 0;
                const all = line.includes('올스탯') && line.includes('%') ? parseInt(line.replace(/[^0-9]/g, '')) || 0 : 0;
                statPct += Math.max(str, dex, int, luk) + all;
            });
        };

        parseOption(potentials);

        if (potentialGrade === '레전드리') {
            if (statPct >= 36) {
                comments.push(pick([
                    `잠재능력 **주스탯 ${statPct}%**... **'올이탈'** 국가권력급 스펙입니다! 로또 1등 당첨보다 어렵다는 확률을 뚫으셨군요.`,
                    `**주스탯 ${statPct}%**?! 큐브가 고장난 거 아닌가요? 믿을 수 없는 수치입니다.`,
                    `옵션 세 줄이 전부 이탈이라니... **${statPct}%**의 기적을 봅니다.`,
                    `이 잠재능력은 예술 작품입니다. **${statPct}%**... 감탄만 나오네요.`
                ]));
            } else if (statPct >= 33) {
                comments.push(pick([
                    `**'쌍이탈'** 옵션(33% 이상)이 떴습니다! 정옵을 뛰어넘은 초고스펙입니다.`,
                    `**주스탯 ${statPct}%**! 쌍이탈의 축복을 받으셨군요.`,
                    `남들은 하나 띄우기도 힘든 이탈 옵션을 두 줄이나! **${statPct}%** 달성!`,
                    `정옵(30%)을 가볍게 뛰어넘는 **${statPct}%**! 고스펙의 증명입니다.`
                ]));
            } else if (statPct >= 30) {
                comments.push(`**주스탯 ${statPct}%**로 깔끔하게 3줄 유효 옵션을 챙기셨네요. 군더더기 없는 완벽한 졸업급 정옵입니다.`);
            } else if (statPct >= 27) {
                comments.push(`**주스탯 ${statPct}%**면 준수한 3줄 유효 옵션입니다. 충분히 현역으로 쓸만합니다.`);
            } else if (statPct >= 21) {
                comments.push(`**주스탯 ${statPct}%**는 레전드리 등급의 표준입니다. 나쁘지 않지만, 고스펙을 노린다면 27% 이상을 도전해보세요.`);
            } else if (statPct < 21 && !coolTime && !critDmg && !bossDmg && !dropRate && !mesoRate) {
                comments.push(`레전드리 등급이지만 옵션 수치가 아쉽습니다. 큐브를 통해 **21% 이상** 혹은 **유효 2줄**을 노려보시는 걸 추천합니다.`);
            }

            if (coolTime >= 4) comments.push(`**쿨타임 감소 ${coolTime}초**는 종결급 옵션입니다.`);
            if (critDmg >= 16) comments.push(`**쌍크뎀** 장갑... 전 서버급 매물입니다.`);

        } else if (potentialGrade === '유니크') {
            if (isEndGameItem) {
                comments.push(`이런 명품 장비에 유니크 등급은 너무 아깝습니다. **레전드리** 등급업으로 아이템의 잠재력을 100% 끌어올려주세요.`);
            } else {
                if (statPct >= 15) {
                    comments.push(`유니크 등급에서 **스탯 ${statPct}%**면 가성비 구간 종결입니다. 거쳐가는 아이템으로는 최고네요.`);
                } else if (statPct < 9 && !coolTime && !critDmg) {
                    comments.push(`유니크 등급의 장점을 살리지 못하고 있습니다. 큐브로 최소 **15% 이상**을 띄워보세요.`);
                }
            }
        } else if (potentialGrade === '에픽' || potentialGrade === '레어' || potentialGrade === '없음') {
            if (isEndGameItem) {
                comments.push(`**${potentialGrade}** 등급이라니요... 장비가 울고 있습니다! 당장 등급업이 시급합니다.`);
            } else if (statPct === 0 && attPct === 0 && magicPct === 0) {
                comments.push(`잠재능력 옵션이 아쉽습니다. **수상한 큐브**로 최소 **주스탯 %** 또는 **공격력/마력 %**를 챙겨주세요.`);
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
                comments.push(`에디셔널에서 **${stats.join(", ")}**을 챙기셨네요. 레어 등급에서는 최선의 선택입니다. 아주 알뜰하시군요!`);
            } else if (isEndGameItem || starforce >= 17) {
                comments.push(`윗잠재와 스타포스는 훌륭한데, **에디셔널 잠재능력**이 비어있네요. 에디셔널 공/마 한 줄만 챙겨도 스펙이 확 오를 겁니다.`);
            } else if (addPotentialGrade === '없음') {
                comments.push(`**에디셔널 잠재능력**이 없습니다. 수큐로 공/마 10이라도 챙기면 큰 도움이 됩니다.`);
            }
        }
    }

    // 5. 마무리
    if (comments.length === 0) {
        comments.push("전반적으로 무난한 세팅입니다. 하지만 더 강력해질 여지가 충분히 남아있어요!");
    }

    return comments.join(" ");
}
