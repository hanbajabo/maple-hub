/**
 * useDiagnosis Hook
 * 장비 진단 리포트 생성 로직
 */

import { useState, useCallback } from 'react';
import { JOB_META_DATA } from '@/src/data/diagnosisData';
import { diagnoseEquipment } from '@/lib/diagnosis/equipment';
import { EquipmentReport } from '@/lib/diagnosis/types';
import { ItemData } from './useCharacterSearch';

interface FinalStat {
    stat_name: string;
    stat_value: string;
}

interface StatData {
    final_stat: FinalStat[];
}

export function useDiagnosis() {
    const [diagnosisReport, setDiagnosisReport] = useState<EquipmentReport | null>(null);

    const generateDiagnosis = useCallback((
        equipment: ItemData[],
        characterClass: string,
        stats: StatData | null
    ) => {
        if (!equipment || equipment.length === 0) return;

        // 1. Get job metadata
        let jobData = JOB_META_DATA[characterClass];

        // 2. Normalize class name and retry
        if (!jobData) {
            const normalizedClass = characterClass.replace(/\s/g, "");
            const foundKey = Object.keys(JOB_META_DATA).find(key => key.replace(/\s/g, "") === normalizedClass);
            if (foundKey) {
                jobData = JOB_META_DATA[foundKey];
            }
        }

        // 3. Fallback inference logic
        if (!jobData) {
            if (characterClass.includes("데몬어벤져") || characterClass.includes("데몬 어벤져")) {
                jobData = { stat: "HP", att: "공격력" };
            } else if (characterClass.includes("제논")) {
                jobData = { stat: "ALL", att: "공격력" };
            } else if (
                characterClass.includes("아크메이지") ||
                characterClass.includes("비숍") ||
                characterClass.includes("플레임위자드") ||
                characterClass.includes("에반") ||
                characterClass.includes("루미너스") ||
                characterClass.includes("배틀메이지") ||
                characterClass.includes("키네시스") ||
                characterClass.includes("일리움") ||
                characterClass.includes("라라")
            ) {
                jobData = { stat: "INT", att: "마력" };
            } else if (
                characterClass.includes("보우마스터") ||
                characterClass.includes("신궁") ||
                characterClass.includes("패스파인더") ||
                characterClass.includes("윈드브레이커") ||
                characterClass.includes("와일드헌터") ||
                characterClass.includes("메르세데스") ||
                characterClass.includes("카인") ||
                characterClass.includes("엔젤릭버스터") ||
                characterClass.includes("캡틴") ||
                characterClass.includes("메카닉")
            ) {
                jobData = { stat: "DEX", att: "공격력" };
            } else if (
                characterClass.includes("나이트로드") ||
                characterClass.includes("섀도어") ||
                characterClass.includes("듀얼블레이드") ||
                characterClass.includes("나이트워커") ||
                characterClass.includes("팬텀") ||
                characterClass.includes("카데나") ||
                characterClass.includes("호영") ||
                characterClass.includes("칼리")
            ) {
                jobData = { stat: "LUK", att: "공격력" };
            } else {
                jobData = { stat: "STR", att: "공격력" };
            }
        }

        // 4. Get main stat and attack type
        const mainStat = jobData.stat;
        const attType = jobData.att === "마력" ? "magic" : "attack";

        // 5. Get current drop rate
        const dropStat = stats?.final_stat?.find((s: FinalStat) => s.stat_name === "아이템 드롭률");
        const currentDropRate = dropStat ? parseInt(dropStat.stat_value || "0") : 0;

        // 6. Generate diagnosis report
        const report = diagnoseEquipment(
            equipment,
            mainStat,
            attType,
            'HUNTING',
            currentDropRate,
            characterClass
        );

        setDiagnosisReport(report);
    }, []);

    return {
        diagnosisReport,
        setDiagnosisReport,
        generateDiagnosis,
    };
}
