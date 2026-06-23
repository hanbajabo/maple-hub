import { UNION_DB_CHECK, UNION_STAT_JOBS, UNION_STAT_RECOMMEND_JOBS } from '../../src/data/diagnosisData';
import { DiagnosisResult } from './types';

// 직업군 하위 전직명 매핑
const JOB_FAMILY_MAP: Record<string, string[]> = {
    "신궁": ["사수", "저격수", "신궁"],
    "나이트로드": ["어쌔신", "허밋", "나이트로드"],
    "보우마스터": ["헌터", "레인저", "보우마스터"],
    "히어로": ["파이터", "크루세이더", "히어로"],
    "팔라딘": ["페이지", "나이트", "팔라딘"],
    "다크나이트": ["스피어맨", "버서커", "다크나이트"],
    "바이퍼": ["인파이터", "버커니어", "바이퍼"],
    "캐논마스터": ["캐논슈터", "캐논블래스터", "캐논마스터"],
    "아크메이지(불,독)": ["메이지(불,독)", "위자드(불,독)", "아크메이지(불,독)"],
    "아크메이지(썬,콜)": ["메이지(썬,콜)", "위자드(썬,콜)", "아크메이지(썬,콜)"],
    "비숍": ["클레릭", "프리스트", "비숍"],
    "섀도어": ["시프", "시프마스터", "섀도어"],
    "듀얼블레이더": ["듀어러", "듀얼마스터", "슬래셔", "세미듀어러", "듀얼블레이드", "듀얼블레이더", "듀얼블레이드"]
};

// 직업 보유 여부 체크 헬퍼
function hasJob(myBlocks: string[], targetJob: string): boolean {
    const family = JOB_FAMILY_MAP[targetJob] || [targetJob];
    return family.some(f => myBlocks.includes(f));
}

// === 2. 유니온 진단 ===
export function diagnoseUnion(targetMode: 'HUNTING' | 'BOSS', unionData: any, mainStat: string): DiagnosisResult {
    const result: DiagnosisResult = { bad: [], good: [], scoreDeduction: 0 };
    
    // 최상위 block 및 모든 프리셋(1~5)에서 block_class를 수집하여 통합
    const collectedClasses = new Set<string>();
    
    if (unionData.union_block) {
        unionData.union_block.forEach((b: any) => {
            if (b.block_class) collectedClasses.add(b.block_class);
        });
    }
    
    for (let i = 1; i <= 5; i++) {
        const preset = unionData[`union_raider_preset_${i}`];
        if (preset && preset.union_block) {
            preset.union_block.forEach((b: any) => {
                if (b.block_class) collectedClasses.add(b.block_class);
            });
        }
    }
    
    let myBlocks = Array.from(collectedClasses);
    const isFallbackMode = myBlocks.length === 0;

    // 만약 block 정보가 하나도 없다면, union_raider_stat 파싱 모드로 전환 (패치 이후의 대응)
    let detectedJobs = new Set<string>(myBlocks);
    let strCount = 0;
    let dexCount = 0;
    let intCount = 0;
    let lukCount = 0;
    let hpCount = 0;

    if (isFallbackMode) {
        const raiderStats = unionData.union_raider_stat || [];
        let hasMerc = false;
        let hasZero = false;
        let hasPhantom = false;
        let hasEunwol = false;
        let hasDemonA = false;
        let hasWildH = false;
        let hasMechanic = false;
        let hasBlaster = false;
        let hasLethe = false;
        let critRateCount = 0;

        raiderStats.forEach((stat: string) => {
            // 필수 효과 파싱
            if (stat.includes("대기시간") && stat.includes("감소")) {
                hasMerc = true;
            } else if (stat.includes("경험치 획득량")) {
                hasZero = true;
            } else if (stat.includes("메소 획득량")) {
                hasPhantom = true;
            } else if (stat.includes("크리티컬 데미지")) {
                hasEunwol = true;
            } else if (stat.includes("보스 몬스터") && stat.includes("데미지") && stat.includes("증가")) {
                hasDemonA = true;
            } else if (stat.includes("확률로 데미지")) {
                hasWildH = true;
            } else if (stat.includes("버프") && stat.includes("지속시간")) {
                hasMechanic = true;
            } else if (stat.includes("방어율 무시")) {
                hasBlaster = true;
            } else if (stat.includes("크리티컬 확률")) {
                critRateCount++;
            } else if (stat.includes("올스탯") && stat.includes("HP")) {
                hasLethe = true;
            }

            // 주스탯 효과 파싱
            if (stat.includes("올스탯") && stat.includes("HP")) {
                strCount++;
                dexCount++;
                intCount++;
                lukCount++;
                hpCount++;
            } else if (stat.includes("STR, DEX, LUK")) {
                strCount++;
                dexCount++;
                lukCount++;
            } else if (stat.includes("STR") && stat.includes("증가")) {
                strCount++;
            } else if (stat.includes("DEX") && stat.includes("증가")) {
                dexCount++;
            } else if (stat.includes("INT") && stat.includes("증가")) {
                intCount++;
            } else if (stat.includes("LUK") && stat.includes("증가")) {
                lukCount++;
            } else if (stat.includes("HP") && stat.includes("증가")) {
                hpCount++;
            }
        });

        if (hasMerc) detectedJobs.add("메르세데스");
        if (hasZero) detectedJobs.add("제로");
        if (hasPhantom) detectedJobs.add("팬텀");
        if (hasEunwol) detectedJobs.add("은월");
        if (hasDemonA) detectedJobs.add("데몬어벤져");
        if (hasWildH) detectedJobs.add("와일드헌터");
        if (hasMechanic) detectedJobs.add("메카닉");
        if (hasBlaster) detectedJobs.add("블래스터");
        if (hasLethe) detectedJobs.add("레테");

        if (critRateCount >= 1) detectedJobs.add("신궁");
        if (critRateCount >= 2) detectedJobs.add("나이트로드");

        myBlocks = Array.from(detectedJobs);
    }

    // 2-1. 필수 유니온 (유니온 대원 보유 여부 체크, 배치 기능은 패치로 삭제됨)
    const targetUnion = targetMode === 'HUNTING' ? UNION_DB_CHECK.HUNTING : UNION_DB_CHECK.BOSS;
    const missingUnion = targetUnion.filter(u => !hasJob(myBlocks, u));

    if (missingUnion.length > 0) {
        result.bad.push(`필수 유니온 대원 누락: ${missingUnion.join(", ")}`);
        result.scoreDeduction += (missingUnion.length * 2);
    } else {
        result.good.push("필수 유니온 대원을 모두 보유하고 있습니다.");
    }

    // 2-2. 주스탯 유니온 (대원 보유 여부 체크)
    if (mainStat !== 'ALL' && mainStat !== 'HP') {
        let ownedCount = 0;

        if (isFallbackMode) {
            if (mainStat === 'STR') ownedCount = strCount;
            else if (mainStat === 'DEX') ownedCount = dexCount;
            else if (mainStat === 'INT') ownedCount = intCount;
            else if (mainStat === 'LUK') ownedCount = lukCount;
        } else {
            const statJobs = UNION_STAT_JOBS[mainStat] || [];
            ownedCount = statJobs.filter(job => myBlocks.includes(job)).length;
        }

        if (ownedCount < 3) {
            result.bad.push(`${mainStat} 증가 유니온 대원이 부족합니다 (${ownedCount}명).`);
            // 추천은 최종 직업명만 표시 (1~2차 전직 제외)
            const recommendJobs = UNION_STAT_RECOMMEND_JOBS[mainStat] || [];
            const missingStatJobs = recommendJobs.filter(job => !hasJob(myBlocks, job)).slice(0, 3);
            result.bad.push(`추천 육성 대원: ${missingStatJobs.join(", ")}`);
            result.scoreDeduction += 5;
        } else {
            result.good.push(`${mainStat} 증가 유니온 대원을 충분히 보유하고 있습니다.`);
        }
    }


    return result;
}



