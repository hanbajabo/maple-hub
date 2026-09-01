import { appraiseItemCost } from './item-appraisal';

async function test() {
    const item = {
        item_equipment_slot: "무기",
        item_name: "앱솔랩스 스펠링완드",
        starforce: "17",
        item_base_option: { base_equipment_level: 160 },
        potential_option_grade: "레전드리",
        potential_option_1: "보스 몬스터 공격 시 데미지 : +40%",
        potential_option_2: "보스 몬스터 공격 시 데미지 : +30%",
        potential_option_3: "마력 : +9%",
        additional_potential_option_grade: "에픽",
        additional_potential_option_1: "마력 : +6%",
        additional_potential_option_2: "데미지 : +3%",
        additional_potential_option_3: "공격력 : +3",
    };

    const res = await appraiseItemCost(item, "비숍");
    console.log("Appraisal Result:");
    console.dir(res, { depth: null });
}

test();
