import { JOB_META_DATA } from '../src/data/diagnosisData';
import { diagnoseLinkSkill } from './diagnosis/link';
import { diagnoseUnion } from './diagnosis/union';
import { diagnoseAbility } from './diagnosis/ability';
import { diagnoseEquipment } from './diagnosis/equipment';

// === 메인 분석 함수 ===
export function analyze(characterData: any, targetMode: 'HUNTING' | 'BOSS', bossStage?: number): any {
    const { basic, item, stat, union, link, ability, hexaMatrix, hexaStat } = characterData;
    const myClass = basic.character_class;
    const jobData = JOB_META_DATA[myClass] || { stat: "STR", att: "공격력" };
    const mainStat = jobData.stat;
    const attType = jobData.att;

    // 1. 링크 스킬
    const linkResult = diagnoseLinkSkill(targetMode, link);

    // 2. 유니온
    const unionResult = diagnoseUnion(targetMode, union, mainStat);

    // 3. 어빌리티
    const abilityResult = diagnoseAbility(targetMode, ability, myClass);

    // 4. 장비 (아이템)
    const equipment = item.item_equipment || [];
    // 드롭률 정보 (사냥용 진단 시 필요할 수 있음)
    const dropStat = stat.final_stat?.find((s: any) => s.stat_name === "아이템 드롭률");
    const currentDropRate = dropStat ? parseInt(dropStat.stat_value || "0") : 0;

    const equipmentResult = diagnoseEquipment(equipment, mainStat, attType, targetMode, currentDropRate);

    // 종합 점수 계산 (기초 점수)
    let deductionScore = 100;
    deductionScore -= linkResult.scoreDeduction;
    deductionScore -= unionResult.scoreDeduction;
    deductionScore -= abilityResult.scoreDeduction;
    deductionScore -= equipmentResult.scoreDeduction;
    if (deductionScore < 0) deductionScore = 0;

    let totalScore = deductionScore;
    let tier = "B";

    if (targetMode === 'BOSS' && bossStage !== undefined) {
        // 보스 모드: 단계별 점수제 적용
        // 기본 점수: 단계 * 10점 (0단계=0점 ~ 9단계=90점)
        const baseScore = bossStage * 10;

        // 데스티니 무기 착용 시 보너스 점수 만점 처리 (최상위권 유저)
        const hasDestinyWeapon = equipment.some((item: any) => item.item_name && item.item_name.includes("데스티니"));
        if (hasDestinyWeapon) {
            deductionScore = 100;
        }

        // 보너스 점수: 기초 점수(링크/유니온/어빌/기초장비)의 10% (최대 10점)
        const bonusScore = deductionScore * 0.1;

        totalScore = Math.min(100, Math.floor(baseScore + bonusScore));

        // 티어 산정
        if (totalScore >= 100) tier = "SSS";
        else if (totalScore >= 90) tier = "SS";
        else if (totalScore >= 80) tier = "S";
        else if (totalScore >= 70) tier = "A";
        else if (totalScore >= 60) tier = "B";
        else tier = "C";

    } else {
        // 사냥 모드 또는 stage 정보 없음: 기존 감점제 방식 유지
        if (totalScore >= 100) tier = "SSS";
        else if (totalScore >= 90) tier = "SS";
        else if (totalScore >= 75) tier = "S";
        else if (totalScore >= 60) tier = "A";
        else tier = "B";
    }

    return {
        tier,
        score: totalScore,
        bossStage: bossStage, // 보스 진단 단계 정보 포함
        stats: {
            dropRate: currentDropRate
        },
        sections: {
            link: linkResult,
            union: unionResult,
            ability: abilityResult,
            equipment: equipmentResult
        }
    };
}
