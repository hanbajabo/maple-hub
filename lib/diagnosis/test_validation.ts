/**
 * 🧪 진단 로직 검증 테스트
 * 중앙화 리팩토링 후 진단 시스템이 정상 작동하는지 확인
 */

import { diagnoseItemDeeply } from './equipment';
import { diagnoseWeapon } from './parts/weapon';
import { diagnoseArmor } from './parts/armor';
import { diagnoseGlove } from './parts/glove';
import { diagnoseHat } from './parts/hat';
import { diagnoseAccessory } from './parts/accessory';
import { evaluatePotential } from '../potential_evaluator';
import { evaluateArmorFlame } from '../flame_evaluator';

// 테스트 케이스 정의
const testCases = [
    {
        name: '22성 아케인셰이드 무기 (레전드리 잠재)',
        item: {
            item_name: '아케인셰이드 세이버',
            item_equipment_slot: '한손무기',
            starforce: '22',
            potential_option_grade: '레전드리',
            potential_option_1: '보스 몬스터 공격 시 데미지 +40%',
            potential_option_2: '보스 몬스터 공격 시 데미지 +40%',
            potential_option_3: '공격력 +12%',
            item_base_option: { base_equipment_level: 200 },
            item_add_option: {
                str: '80',
                dex: '80',
                attack_power: '125',
            }
        },
        expectedKeywords: ['22성', '졸업', '레전드리', '보스'],
    },
    {
        name: '17성 앱솔랩스 상의 (에픽 잠재)',
        item: {
            item_name: '앱솔랩스 메이지 슈트',
            item_equipment_slot: '상의',
            starforce: '17',
            potential_option_grade: '에픽',
            potential_option_1: 'INT +6%',
            potential_option_2: 'INT +6%',
            potential_option_3: 'INT +6%',
            item_base_option: { base_equipment_level: 160 },
            item_add_option: {
                str: '60',
                dex: '60',
                int: '140',
                luk: '60',
            }
        },
        expectedKeywords: ['17성', '국민', '에픽', '18%'],
    },
    {
        name: '장갑 (크뎀 3줄)',
        item: {
            item_name: '아케인셰이드 아처 글러브',
            item_equipment_slot: '장갑',
            starforce: '22',
            potential_option_grade: '레전드리',
            potential_option_1: '크리티컬 데미지 +8%',
            potential_option_2: '크리티컬 데미지 +8%',
            potential_option_3: '크리티컬 데미지 +8%',
            item_base_option: { base_equipment_level: 200 },
        },
        expectedKeywords: ['크뎀', '3줄', '신화'],
    },
    {
        name: '모자 (쿨감 6초)',
        item: {
            item_name: '아케인셰이드 매지션 햇',
            item_equipment_slot: '모자',
            starforce: '22',
            potential_option_grade: '레전드리',
            potential_option_1: '모든 스킬의 재사용 대기시간 -2초(최소 -1초)',
            potential_option_2: '모든 스킬의 재사용 대기시간 -2초(최소 -1초)',
            potential_option_3: '모든 스킬의 재사용 대기시간 -2초(최소 -1초)',
            item_base_option: { base_equipment_level: 200 },
        },
        expectedKeywords: ['쿨감', '6초', '초월'],
    },
    {
        name: '타일런트 벨트 (슈페리얼)',
        item: {
            item_name: '타일런트 히아데스 벨트',
            item_equipment_slot: '벨트',
            starforce: '12',
            potential_option_grade: '레전드리',
            potential_option_1: 'STR +12%',
            potential_option_2: 'STR +12%',
            potential_option_3: '공격력 +9%',
            item_base_option: { base_equipment_level: 150 },
        },
        expectedKeywords: ['슈페리얼', '12성', '준종결'],
    },
    {
        name: '추가옵션 170급 (200제)',
        testType: 'flame',
        itemLevel: 200,
        score: 170,
        expectedKeywords: ['170급', '종결', '최상급'],
    },
    {
        name: '잠재능력 평가 (레전드리 30%)',
        testType: 'potential',
        type: 'main',
        grade: '레전드리',
        options: ['STR +12%', 'STR +12%', 'STR +6%'],
        itemLevel: 200,
        equipmentType: '방어구',
        expectedKeywords: ['30', '종결'],
    },
];

// 테스트 실행
console.log('🧪 ============================================');
console.log('🧪 진단 로직 검증 테스트 시작');
console.log('🧪 ============================================\n');

let passCount = 0;
let failCount = 0;

testCases.forEach((testCase, index) => {
    console.log(`\n📋 테스트 케이스 ${index + 1}: ${testCase.name}`);
    console.log('─'.repeat(50));

    try {
        let result: any;
        let resultText = '';

        if (testCase.testType === 'flame') {
            // 추가옵션 테스트
            result = evaluateArmorFlame(testCase.itemLevel!, testCase.score!, '');
            resultText = `${result.evaluation} - ${result.recommendation}`;
        } else if (testCase.testType === 'potential') {
            // 잠재능력 테스트
            result = evaluatePotential(
                testCase.type as any,
                testCase.grade as any,
                testCase.options!,
                testCase.itemLevel!,
                testCase.equipmentType as any
            );
            resultText = `${result.evaluation} - ${result.recommendation}`;
        } else {
            // 아이템 진단 테스트
            result = diagnoseItemDeeply(testCase.item, 'STR');
            resultText = result.join(' | ');
        }

        console.log('✅ 진단 결과:');
        console.log(resultText);

        // 기대 키워드 검증
        const allKeywordsFound = testCase.expectedKeywords?.every(keyword =>
            resultText.includes(keyword)
        );

        if (allKeywordsFound) {
            console.log('✅ 검증 성공: 모든 기대 키워드가 포함되어 있습니다.');
            passCount++;
        } else {
            console.log('❌ 검증 실패: 일부 기대 키워드를 찾을 수 없습니다.');
            console.log(`   기대 키워드: ${testCase.expectedKeywords?.join(', ')}`);
            failCount++;
        }
    } catch (error: any) {
        console.log('❌ 오류 발생:', error.message);
        failCount++;
    }
});

// 최종 결과
console.log('\n🧪 ============================================');
console.log('🧪 테스트 결과 요약');
console.log('🧪 ============================================');
console.log(`✅ 성공: ${passCount}개`);
console.log(`❌ 실패: ${failCount}개`);
console.log(`📊 성공률: ${((passCount / testCases.length) * 100).toFixed(1)}%`);

if (failCount === 0) {
    console.log('\n🎉 모든 테스트가 성공했습니다! 리팩토링이 올바르게 적용되었습니다.');
} else {
    console.log('\n⚠️ 일부 테스트가 실패했습니다. 코드를 확인해주세요.');
}
