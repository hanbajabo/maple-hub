
/**
 * 📜 주문서 작(Scroll) 공통 진단 로직
 * - 방어구, 장신구, 장갑 등의 주문서 작 상태를 정밀 진단합니다.
 * - 아이템 레벨에 따른 주흔 작 수치 차이를 반영합니다.
 */

export function diagnoseScroll(item: any): string[] {
    const comments: string[] = [];
    const itemName = item.item_name || "";
    const slot = item.item_equipment_slot || "";
    const scrollCount = parseInt(item.scroll_upgrade || "0"); // 업그레이드 횟수
    const etcOpts = item.item_etc_option || {}; // 주문서로 오른 스탯
    const level = item.item_base_option?.base_equipment_level || 0; // 아이템 레벨

    // 스탯 추출
    const str = parseInt(etcOpts.str || "0");
    const dex = parseInt(etcOpts.dex || "0");
    const int = parseInt(etcOpts.int || "0");
    const luk = parseInt(etcOpts.luk || "0");
    const att = parseInt(etcOpts.attack_power || "0");
    const magic = parseInt(etcOpts.magic_power || "0");

    const maxStat = Math.max(str, dex, int, luk);

    // 공/마 구분
    const mainAtt = Math.max(att, magic);
    const attType = att >= magic ? "공격력" : "마력";

    if (scrollCount === 0) return [`[노작] 주문서 작이 되어있지 않습니다.`];

    const avgAtt = mainAtt / scrollCount;
    const avgStat = maxStat / scrollCount;

    // 🧤 장갑 (Gloves)
    if (slot.includes("장갑")) {
        // 장갑은 주흔작으로 공격력이 오름 (레벨별 차이 반영)
        // 200제(아케인): 15%(+4), 30%(+3), 70%(+2)
        // 160제(앱솔) 이하: 15%(+3), 30%(+3), 70%(+2)

        const perfectAtt = level >= 200 ? 4 : 3; // 15%작 기준

        if (mainAtt > 0) {
            if (avgAtt >= perfectAtt) {
                comments.push(`[장갑 주흔 15% 완작] 평균 ${attType} <b>+${avgAtt.toFixed(1)}</b>. 완벽한 ${attType} 작입니다.`);
            } else if (avgAtt >= 3) {
                comments.push(`[장갑 주흔 30% 완작] 평균 ${attType} <b>+${avgAtt.toFixed(1)}</b>. 훌륭한 ${attType} 작입니다.`);
            } else if (avgAtt >= 2) {
                comments.push(`[장갑 주흔 70% 작] 평균 ${attType} <b>+${avgAtt.toFixed(1)}</b>. 가성비 세팅입니다.`);
            } else {
                comments.push(`[장갑 주흔작] 평균 ${attType} <b>+${avgAtt.toFixed(1)}</b>. ${attType}을 챙기셨습니다.`);
            }
        } else {
            comments.push(`[장갑 스탯작] 장갑에 스탯 작을 하셨네요. 장갑은 <b>주흔 ${attType} 작</b> 효율이 훨씬 좋습니다. 다시 작하는 것을 추천합니다.`);
        }
        return comments;
    }

    // 🛡️ 방어구 (Armor)
    if (["모자", "상의", "하의", "한벌옷", "신발", "망토", "어깨장식"].some(s => slot.includes(s))) {
        // 주흔 스탯 기준 (120제 이상)
        // 30%: +7 (4번째 강화부터 +? 일단 +7 기준)
        // 70%: +4
        const perfectStat = 7;
        const normalStat = 4;

        if (mainAtt > 0) {
            if (avgAtt >= 4) {
                comments.push(`[놀긍혼 리턴 완작] 전 부위 놀긍혼 리턴작! 엔드 스펙입니다. (${attType} <b>+${mainAtt}</b>)`);
            } else if (mainAtt >= 4 && avgStat >= 5) {
                comments.push(`[놀긍혼 긍혼 + 주흔] 첫작 놀긍혼으로 ${attType}을 챙기고, 나머지는 주흔으로 스탯을 채운 효율적인 세팅입니다.`);
            } else if (mainAtt <= 3) {
                comments.push(`[${attType} 소량] 방어구에 ${attType}이 <b>+${mainAtt}</b> 붙어있습니다. (주흔작 보너스 혹은 긍혼 떡작 가능성)`);
            } else {
                comments.push(`[${attType} 섞인 작] 주문서 작에 ${attType}이 포함되어 있습니다. (${attType} <b>+${mainAtt}</b>)`);
            }
        } else {
            if (avgStat >= perfectStat) comments.push(`[주흔 30% 완작] 깔끔한 스탯 작입니다. (평균 <b>+${avgStat.toFixed(1)}</b>)`);
            else if (avgStat >= normalStat) comments.push(`[주흔 70% 작] 가성비 스탯 작입니다. (평균 <b>+${avgStat.toFixed(1)}</b>)`);
            else comments.push(`[주흔 100% 떡작] 스탯 상승량이 낮습니다. 다시 작하는 것을 추천합니다.`);
        }
        return comments;
    }

    // 💍 장신구 (Accessory)
    if (mainAtt > 0) {
        if (avgAtt >= 5) {
            comments.push(`[놀긍혼 리턴 종결] 평균 ${attType} <b>+${avgAtt.toFixed(1)}</b>! 놀긍혼 리턴작의 정점입니다. 스탯도 든든하게 챙기셨겠군요.`);
        } else if (avgAtt >= 4) {
            comments.push(`[프악공/프악마 완작] 평균 ${attType} <b>+${avgAtt.toFixed(1)}</b>. 프리미엄 악세서리 스크롤 작으로 보입니다. 깔끔한 종결 스펙입니다.`);
        } else if (avgAtt >= 2) {
            comments.push(`[놀긍혼/악공] 긍정의 혼돈 주문서 혹은 악세서리 ${attType} 스크롤 작입니다.`);
        } else {
            comments.push(`[${attType} 소량] ${attType}이 붙어있습니다.`);
        }
    }

    return comments;
}
