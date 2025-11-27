
import { diagnoseEpicPotential } from './common';
import { diagnoseScroll } from './scroll';

const SPECIAL_RING_KEYWORDS = ["웨폰퍼프", "리스트레인트", "리스크테이커", "컨티뉴어스", "링 오브 썸", "크라이시스"];
const DAWN_BOSS_KEYWORDS = ["트와일라이트 마크", "에스텔라 이어링", "데이브레이크 펜던트", "여명의 가디언 엔젤 링"];
const EVENT_RING_KEYWORDS = ["테네브리스", "SS급", "어웨이크", "글로리온", "카오스", "벤젼스", "결속의", "이터널 플레임", "어드벤처 딥다크", "오닉스", "코스모스", "이벤트 링", "어드벤처", "시너지", "쥬얼", "다크 크리티컬"];

/**
 * 💍 장신구(Accessory) 전용 진단 로직
 * - 시드링 레벨 및 종류 평가
 * - 여명 보스 세트 가치 평가
 * - 광부 아이템 (드랍/메획) 진단
 * - 기계 심장 (Heart) 진단
 */
export function diagnoseAccessory(item: any): string[] {
    const comments: string[] = [];
    const itemName = item.item_name || "";
    const slot = item.item_equipment_slot || "";
    const starforce = parseInt(item.starforce || "0");
    const potentials = [item.potential_option_1, item.potential_option_2, item.potential_option_3];

    // 0. 주문서 작 진단 (Scroll) - 기계 심장, 뱃지, 훈장, 포켓 제외 (작 불가 아이템)
    if (!slot.includes("기계 심장") && !slot.includes("뱃지") && !slot.includes("훈장") && !slot.includes("포켓")) {
        const scrollComments = diagnoseScroll(item);
        comments.push(...scrollComments);
    }

    // 0. 기계 심장 (Mechanical Heart)
    if (slot.includes("기계 심장")) {
        if (itemName.includes("컴플리트 언더컨트롤")) {
            comments.push(`[최강의 심장] 현존하는 메이플스토리 최강의 심장입니다. 더 이상 바랄 게 없습니다.`);
        } else if (itemName.includes("플라즈마")) {
            if (starforce >= 20) comments.push(`[준종결] <b>20성</b> 플라즈마 하트! 페어리 하트를 뛰어넘는 강력한 스펙을 완성하셨습니다.`);
            else comments.push(`[성장 가능성] 플라즈마 하트는 <b>20성</b> 이상 강화해야 진가를 발휘합니다. 강화를 도전해보세요!`);
        } else if (itemName.includes("블랙")) {
            comments.push(`[전설의 아이템] 단종된 블랙 하트입니다. 남은 기간 동안 최강의 가성비를 누리세요.`);
        } else if (itemName.includes("리퀴드메탈")) {
            comments.push(`[주의] 놀장 12성이 아니라면 가치가 낮습니다. 플라즈마 하트로 승계도 불가능하니 주의하세요.`);
        } else if (itemName.includes("페어리") || itemName.includes("티타늄") || itemName.includes("리튬") || itemName.includes("골드")) {
            if (starforce >= 8) comments.push(`[국민 하트] 가성비 하트의 최대 성능(<b>8성</b>)입니다. 추후 '플라즈마 하트'로 승계를 목표로 하세요.`);
            else comments.push(`[강화 권장] 이 하트는 <b>8성</b>이 한계입니다. 비용이 저렴하니 <b>8성</b>까지 꽉 채워주세요.`);
        }

        // 하트 작 진단 (주문서)
        const scrollCount = parseInt(item.scroll_upgrade || "0");
        const etcOpts = item.item_etc_option || {};
        const etcAtt = parseInt(etcOpts.attack_power || "0");
        const etcMagic = parseInt(etcOpts.magic_power || "0");

        if (etcAtt >= scrollCount * 9 || etcMagic >= scrollCount * 9) {
            comments.push(`[매지컬/스페셜 완작] 주문서 작이 완벽합니다. 더 이상 손댈 곳이 없습니다.`);
        } else if (etcAtt <= scrollCount * 3 && etcMagic <= scrollCount * 3 && scrollCount > 0) {
            comments.push(`[주흔 작] 임시용 주흔 작입니다. 좋은 하트에는 매지컬/스페셜 주문서를 써주세요.`);
        }

        return comments; // 하트는 여기서 종료
    }

    // 1. 시드링 (Seed Ring)
    const isSeedRing = SPECIAL_RING_KEYWORDS.some(k => itemName.includes(k));
    if (isSeedRing) {
        const levelMatch = itemName.match(/(\d)레벨/);
        const level = levelMatch ? parseInt(levelMatch[1]) : 0;

        if (itemName.includes("리스트레인트") || itemName.includes("웨폰퍼프") || itemName.includes("컨티뉴어스")) {
            if (level >= 4) comments.push(`[졸업] <b>4레벨</b>(혹은 그 이상) 특수 링입니다. 일반적인 종결 스펙입니다.`);
            else if (level === 3) comments.push(`[현역] <b>3레벨</b> 링은 가성비 좋게 실전에서 사용 가능합니다.`);
            else comments.push(`[체험판] 성능 체감이 어렵습니다. <b>3레벨</b> 이상 구매를 권장합니다.`);
        }
    }

    // 2. 여명 보스 세트 (Dawn Boss Set)
    if (DAWN_BOSS_KEYWORDS.some(k => itemName.includes(k))) {
        comments.push(`[여명 세트] 칠흑으로 넘어가기 전 최고의 가성비 세팅입니다. 2세트/4세트 효과를 챙겨보세요.`);
    }

    // 3. 광부 아이템 (Hunting)
    // 귀고리, 반지, 펜던트, 눈장식, 얼굴장식
    if (slot.includes("귀고리") || slot.includes("반지") || slot.includes("펜던트") || slot.includes("눈장식") || slot.includes("얼굴장식")) {
        const dropLines = potentials.filter(l => l && l.includes("아이템 드롭률")).length;
        const mesoLines = potentials.filter(l => l && l.includes("메소 획득량")).length;

        if (dropLines + mesoLines >= 2) {
            comments.push(`[광부 종결] 사냥용 종결 아이템입니다. (드/메 2줄)`);
        } else if (dropLines + mesoLines === 1) {
            // 주스탯과 섞여있으면 하이브리드
            const hasStat = potentials.some(l => l && (l.includes("올스탯") || l.includes("STR") || l.includes("DEX") || l.includes("INT") || l.includes("LUK")));
            if (hasStat) {
                comments.push(`[고스펙 광부] 사냥 딜과 보상을 동시에 챙기는 하이브리드 아이템입니다.`);
            } else {
                comments.push(`[광부 입문] 사냥용 기본 아이템입니다.`);
            }
        }
    }

    // 4. 칠흑의 보스 세트 (Pitch Boss)
    // 마도서, 몽벨, 루컨마, 마깃안, 거공, 고근 등
    const isPitch = itemName.includes("저주받은 마도서") || itemName.includes("몽환의 벨트") || itemName.includes("루즈 컨트롤") || itemName.includes("마력이 깃든") || itemName.includes("거대한 공포") || itemName.includes("고통의 근원") || itemName.includes("창세의 뱃지") || itemName.includes("미트라의 분노");
    if (isPitch) {
        comments.push(`[칠흑] 메이플스토리 최상위 '칠흑의 보스 세트' 파츠입니다. 존재만으로도 영롱합니다.`);

        // 칠흑 전용 스타포스 진단
        if (!slot.includes("뱃지") && !slot.includes("포켓") && !slot.includes("엠블렘")) {
            if (starforce >= 22) comments.push(`[칠흑 졸업] <b>22성</b> 칠흑... 서버 내 최상위 포식자입니다.`);
            else if (starforce >= 18) comments.push(`[칠흑 고스펙] <b>18성</b> 이상 칠흑은 <b>22성</b> 여명보다 강력합니다.`);
            else if (starforce === 17) comments.push(`[아쉬움] 칠흑의 성능을 100% 끌어내려면 <b>22성</b>이 권장됩니다. (파괴 리스크 주의)`);
        }
    }

    // 5. 일반 스타포스 진단 (시드링, 뱃지, 훈장, 포켓, 이벤트링 제외)
    const isEventRing = EVENT_RING_KEYWORDS.some(k => itemName.includes(k));
    if (!isSeedRing && !isEventRing && !slot.includes("뱃지") && !slot.includes("훈장") && !slot.includes("포켓") && !slot.includes("엠블렘")) {
        if (!isPitch) { // 칠흑은 위에서 별도 처리
            // 놀장강(Amazing Enhancement) 체크
            // 조건: 12성 이하이면서, 스타포스로 인한 공/마 상승량이 존재할 경우 (일반 장신구는 15성까지 공/마 안 오름)
            const sfOpts = item.item_starforce_option || {};
            const sfAtt = parseInt(sfOpts.attack_power || "0");
            const sfMagic = parseInt(sfOpts.magic_power || "0");

            if (starforce > 0 && starforce <= 12 && (sfAtt > 0 || sfMagic > 0)) {
                comments.push(`[놀장강] 별의 개수는 적지만 성능은 확실합니다. 잊혀진 고대 기술의 유산입니다.`);
            } else {
                // 일반 스타포스
                if (starforce >= 22) comments.push(`[졸업] 장신구 <b>22성</b>! 더 이상 바랄 게 없습니다.`);
                else if (starforce >= 20) comments.push(`[준종결] <b>20성</b> 이상으로 훌륭한 스펙입니다.`);
                else if (starforce >= 17) comments.push(`[국민 세팅] <b>17성</b> 장신구는 가성비가 좋습니다.`);
                else if (starforce >= 10) comments.push(`[입문] 유니온/링크용 혹은 거쳐가는 단계입니다.`);
                else comments.push(`[강화 필요] 스타포스 수치가 낮습니다. 최소 <b>10~12성</b>은 맞춰주세요.`);
            }
        }
    }

    // 6. 잠재능력 진단 (주스탯%)
    const potentialGrade = item.potential_option_grade;
    if (potentialGrade === "레전드리") {
        let totalStat = 0;
        potentials.forEach(l => {
            if (l) {
                const match = l.match(/(\d+)%/);
                if (match && (l.includes("올스탯") || l.includes("STR") || l.includes("DEX") || l.includes("INT") || l.includes("LUK"))) {
                    totalStat += parseInt(match[1]);
                }
            }
        });

        if (totalStat >= 27) comments.push(`[고스펙] 주스탯 <b>${totalStat}%</b>! 고스펙을 위한 훌륭한 수치입니다.`);
        else if (totalStat >= 21) comments.push(`[표준] 주스탯 <b>${totalStat}%</b>는 레전드리 등급의 표준입니다. 고스펙을 노린다면 <b>27%</b> 이상을 도전해보세요.`);
        else if (totalStat >= 18) comments.push(`[아쉬움] 주스탯 <b>${totalStat}%</b>는 유니크 등급 효율입니다. 큐브 작업이 권장됩니다.`);
        else {
            const statLines = potentials.filter(l => l && (l.includes("올스탯") || l.includes("STR") || l.includes("DEX") || l.includes("INT") || l.includes("LUK")));
            if (statLines.length >= 3) comments.push(`[3줄 유효] 주스탯 3줄! 깔끔한 종결 잠재입니다.`);
            else if (statLines.length === 2) comments.push(`[2줄 유효] 주스탯 2줄, 가성비 좋게 챙기셨습니다.`);
        }
    } else if (potentialGrade === '에픽') {
        const epicComments = diagnoseEpicPotential(potentialGrade, potentials);
        comments.push(...epicComments);
    }

    // 7. 에디셔널 진단
    const adiGrade = item.additional_potential_option_grade;
    const adiLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3];

    // 에디셔널 공/마 수치 계산
    let adiAtt = 0;
    let adiMagic = 0;
    adiLines.forEach(l => {
        if (l) {
            if (l.includes("공격력")) {
                const match = l.match(/\+(\d+)/);
                if (match) adiAtt += parseInt(match[1]);
            }
            if (l.includes("마력")) {
                const match = l.match(/\+(\d+)/);
                if (match) adiMagic += parseInt(match[1]);
            }
        }
    });

    if (potentialGrade === "레전드리" && (!adiGrade || adiGrade === "레어")) {
        if (adiAtt >= 10 || adiMagic >= 10) {
            comments.push(`[가성비 굿] 에디셔널에서 공/마 <b>+${Math.max(adiAtt, adiMagic)}</b>을 챙기셨네요. 레어 등급에서는 최선의 선택입니다. 아주 알뜰하시군요!`);
        } else {
            comments.push(`[속 빈 강정] 윗잠은 레전드리지만 에디셔널이 부실합니다. 에디 공/마를 챙겨주세요.`);
        }
    } else if (adiGrade === "에픽") {
        if (adiAtt >= 10 || adiMagic >= 10) comments.push(`[에디 에픽] 에디셔널 공/마를 잘 챙기셨습니다. 든든합니다.`);
    }

    // 8. 추옵 진단
    if (!slot.includes("반지") && !slot.includes("견장") && !slot.includes("뱃지") && !slot.includes("훈장") && !slot.includes("엠블렘")) {
        const addOpts = item.item_add_option || {};
        const addStat = Math.max(parseInt(addOpts.str || 0), parseInt(addOpts.dex || 0), parseInt(addOpts.int || 0), parseInt(addOpts.luk || 0));
        const addAllStat = parseInt(addOpts.all_stat || "0");
        const addAtt = parseInt(addOpts.attack_power || "0");
        const score = addStat + (addAtt * 4) + (addAllStat * 10);

        if (score >= 110) comments.push(`[극추옵] 장신구에서 <b>110급</b> 이상은 정말 귀합니다.`);
        else if (score >= 90) comments.push(`[고추옵] <b>90급</b> 이상! 훌륭합니다.`);
    }

    return comments;
}
