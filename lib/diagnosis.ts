import { JOB_META_DATA } from '../src/data/diagnosisData';
import { diagnoseLinkSkill } from './diagnosis/link';
import { diagnoseUnion } from './diagnosis/union';
import { diagnoseAbility } from './diagnosis/ability';
import { diagnoseEquipment } from './diagnosis/equipment';

// === 메인 분석 함수 ===
export function analyze(characterData: any, targetMode: 'HUNTING' | 'BOSS', bossStage?: number): any {
    const { basic, item, stat, union, link, ability, hexaMatrix, hexaStat } = characterData;
    const myClass = basic.character_class;

    let jobData = JOB_META_DATA[myClass];

    // [Hotfix] 아크메이지 계열 강제 지정 (아크(STR)로 오인되는 경우 방지)
    if (myClass.includes("아크메이지") || myClass.includes("메이지") || myClass.includes("Arch Mage")) {
        jobData = { stat: "INT", att: "마력" };
    }

    // 1. 정확한 매칭이 안된 경우, 공백을 제거하고 재시도
    if (!jobData) {
        const normalizedClass = myClass.replace(/\s/g, "");
        const foundKey = Object.keys(JOB_META_DATA).find(key => key.replace(/\s/g, "") === normalizedClass);
        if (foundKey) {
            jobData = JOB_META_DATA[foundKey];
        }
    }

    // 2. 그래도 안된 경우, 특정 키워드로 추론
    if (!jobData) {
        if (myClass.includes("아크메이지") || myClass.includes("비숍") || myClass.includes("플레임위자드") || myClass.includes("에반") || myClass.includes("루미너스") || myClass.includes("배틀메이지") || myClass.includes("키네시스") || myClass.includes("일리움") || myClass.includes("라라")) {
            jobData = { stat: "INT", att: "마력" };
        } else if (myClass.includes("보우마스터") || myClass.includes("신궁") || myClass.includes("패스파인더") || myClass.includes("윈드브레이커") || myClass.includes("와일드헌터") || myClass.includes("메르세데스") || myClass.includes("카인") || myClass.includes("엔젤릭버스터") || myClass.includes("캡틴") || myClass.includes("메카닉")) {
            jobData = { stat: "DEX", att: "공격력" };
        } else if (myClass.includes("나이트로드") || myClass.includes("섀도어") || myClass.includes("듀얼블레이드") || myClass.includes("나이트워커") || myClass.includes("팬텀") || myClass.includes("카데나") || myClass.includes("호영") || myClass.includes("칼리")) {
            jobData = { stat: "LUK", att: "공격력" };
        } else if (myClass.includes("제논")) {
            jobData = { stat: "ALL", att: "공격력" };
        } else if (myClass.includes("데몬어벤져")) {
            jobData = { stat: "HP", att: "공격력" };
        } else {
            // 기본값 (전사 계열 등)
            jobData = { stat: "STR", att: "공격력" };
        }
    }

    const mainStat = jobData.stat;
    const attType = jobData.att;

    // 1. 링크 스킬
    const linkResult = diagnoseLinkSkill(targetMode, link, myClass);

    // 2. 유니온
    const unionResult = diagnoseUnion(targetMode, union, mainStat);

    // 3. 어빌리티
    const abilityResult = diagnoseAbility(targetMode, ability, myClass);

    // 4. 장비 (아이템)
    const equipment = item.item_equipment || [];
    // 드롭률 정보 (사냥용 진단 시 필요할 수 있음)
    const dropStat = stat.final_stat?.find((s: any) => s.stat_name === "아이템 드롭률");
    const currentDropRate = dropStat ? parseInt(dropStat.stat_value || "0") : 0;

    const equipmentResult = diagnoseEquipment(equipment, mainStat, attType, targetMode, currentDropRate, myClass);

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
