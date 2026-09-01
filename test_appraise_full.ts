import { appraiseItemCost } from './lib/item-appraisal';
const emblem = {
    item_name: '골드 히어로즈 엠블렘',
    item_equipment_slot: '엠블렘',
    item_base_option: { base_equipment_level: 100 },
    potential_option_grade: '레전드리',
    potential_option_1: '공격력 : +9%',
    additional_potential_option_grade: '레전드리',
    additional_potential_option_1: '공격력 : +9%',
    starforce: '0'
};
appraiseItemCost(emblem, '히어로', 10000000).then(r => console.dir(r, {depth: null}));
