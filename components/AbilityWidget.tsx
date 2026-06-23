import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getCharacterAbility, getCharacterBasic } from '../lib/nexon';

interface AbilityInfo {
    ability_no: string;
    ability_grade: string;
    ability_value: string;
}

interface AbilityPreset {
    type: string;
    options: string[];
}

// 2025년 7월 기준 직업별 추천 어빌리티 DB (통합)
const ABILITY_DB: Record<string, AbilityPreset[]> = {
    "나이트로드": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "공격력 증가 21"] }],
    "나이트워커": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "공격력 증가 21"] }],
    "다크나이트": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "스킬 사용 시 재사용 대기시간이 미적용 10%", "상태 이상에 걸린 대상 공격 시 데미지 8% 증가"] }],
    "데몬슬레이어": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "버프 스킬의 지속 시간 증가 38%", "상태 이상에 걸린 대상 공격 시 데미지 증가 8%"] }],
    "데몬어벤져": [{ type: "추천 세팅", options: ["재사용 대기시간 미적용 20%", "보스 몬스터 공격 시 데미지 증가 10%", "상태 이상에 걸린 대상 공격 시 데미지 증가 8%"] }],
    "듀얼블레이더": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "버프 지속시간 증가 38%", "상태 이상에 걸린 대상 공격 시 데미지 8%"] }],
    "듀얼블레이드": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "버프 지속시간 증가 38%", "상태 이상에 걸린 대상 공격 시 데미지 8%"] }],
    "라라": [{ type: "추천 세팅", options: ["패시브 스킬 레벨 증가 1", "보스 몬스터 공격 시 데미지 증가 10%", "상태 이상에 걸린 대상 공격 시 데미지 증가 8%"] }],
    "린": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "마력 증가 21"] }],
    "렌": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 20% 증가", "상태 이상에 걸린 대상 공격 시 데미지 8% 증가", "공격력 21 증가"] }],
    "레테": [{ type: "추천 세팅", options: ["스킬 사용 시 재사용 대기시간 미적용 20%", "보스 몬스터 공격 시 데미지 증가 10%", "상태 이상에 걸린 대상 공격 시 데미지 8%"] }],
    "루미너스": [{ type: "추천 세팅", options: ["재사용 대기시간 미적용 20%", "버프 지속시간 증가 38%", "보스 몬스터 공격 시 데미지 증가 10%"] }],
    "메르세데스": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "크리티컬 확률 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%"] }],
    "메카닉": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 증가 8%", "버프 지속시간 증가 38%"] }],
    "미하일": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "버프 지속시간 증가 38%"] }],
    "바이퍼": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "공격력 21 증가"] }],
    "배틀메이지": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 증가 8%", "마력 증가 21"] }],
    "보우마스터": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "크리티컬 확률 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%"] }],
    "아크메이지(불,독)": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "마력 증가 21"] }],
    "불독": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "마력 증가 21"] }],
    "블래스터": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 증가 8%", "공격력 증가 21"] }],
    "비숍": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "마력 증가 21"] }],
    "섀도어": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "공격력 증가 21"] }],
    "소울마스터": [
        { type: "일반 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "버프 지속시간 증가 38%", "상태 이상에 걸린 대상 공격 시 데미지 8%"] },
        { type: "벞지 90% 이상", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "공격력 증가 21"] }
    ],
    "스트라이커": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "공격력 증가 21"] }],
    "신궁": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "크리티컬 확률 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%"] }],
    "아크메이지(썬,콜)": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "마력 증가 21"] }],
    "썬콜": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "마력 증가 21"] }],
    "아델": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "재사용 대기시간 10%", "상태 이상에 걸린 대상 공격 시 데미지 증가 8%"] }],
    "아란": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "공격력 증가 21"] }],
    "아크": [
        { type: "일반 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 증가 8%", "공격력 증가 21"] },
        { type: "주스탯 8~9만 이상", options: ["패시브 스킬 레벨 증가 1", "보스 몬스터 공격 시 데미지 증가 10%", "상태 이상에 걸린 대상 공격 시 데미지 증가 8%"] }
    ],
    "엔젤릭버스터": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "버프 스킬의 지속 시간 증가 38%", "상태 이상에 걸린 대상 공격 시 데미지 증가 8%"] }],
    "에반": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "재사용 대기시간 미적용 10%", "상태 이상에 걸린 대상 공격 시 데미지 8%"] }],
    "은월": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 20% 증가", "상태 이상에 걸린 대상 공격 시 데미지 8% 증가", "공격력 21 증가"] }],
    "일리움": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "마력 증가 21"] }],
    "와일드헌터": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "크리티컬 확률 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8% 증가"] }],
    "윈드브레이커": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "크리티컬 확률 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%"] }],
    "제로": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 증가 8%", "공격력 증가 21"] }],
    "제논": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 20% 증가", "상태 이상에 걸린 대상 공격 시 데미지 8% 증가", "버프 스킬의 지속 시간 38% 증가"] }],
    "카데나": [{ type: "추천 세팅", options: ["재사용 대기시간 미적용 20%", "보스 몬스터 공격 시 데미지 증가 10%", "상태 이상에 걸린 대상 공격 시 데미지 증가 8%"] }],
    "카인": [
        { type: "일반 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "크리티컬 확률 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%"] },
        { type: "보뎀 합 650 이상", options: ["패시브 스킬 레벨 증가 1", "크리티컬 확률 증가 20%", "보스 몬스터 공격 시 데미지 증가 10%"] }
    ],
    "카이저": [{ type: "추천 세팅", options: ["재사용 대기시간 미적용 20%", "보스 몬스터 공격 시 데미지 10% 증가", "버프 스킬의 지속 시간 증가 38%"] }],
    "칼리": [{ type: "추천 세팅", options: ["재사용 대기시간 미적용 20%", "보스 몬스터 공격 시 데미지 증가 10%", "상태 이상에 걸린 대상 공격 시 데미지 증가 8%"] }],
    "캡틴": [{ type: "추천 세팅", options: ["스킬 사용 시 재사용 대기시간 미적용 20%", "보스 몬스터 공격 시 데미지 증가 10%", "상태 이상에 걸린 대상 공격 시 데미지 8%"] }],
    "캐논마스터": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "공격력 증가 21"] }],
    "캐논슈터": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "공격력 증가 21"] }],
    "키네시스": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 20% 증가", "상태 이상에 걸린 대상 공격 시 데미지 8% 증가", "버프 지속시간 38% 증가 OR 마력 21 증가"] }],
    "팔라딘": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 20% 증가", "상태 이상에 걸린 대상 공격 시 데미지 8% 증가", "공격력 21 증가"] }],
    "패스파인더": [
        { type: "일반 세팅", options: ["재사용 대기시간 미적용 20%", "보스 몬스터 공격 시 데미지 증가 10%", "크리티컬 확률 증가 20%"] },
        { type: "컨티+쿨뚝 조합", options: ["재사용 대기시간 미적용 20%", "보스 몬스터 공격 시 데미지 증가 10%", "크리티컬 확률 증가 20%"] }
    ],
    "팬텀": [{ type: "추천 세팅", options: ["보스 몬스터 공격 시 데미지 증가 20%", "재사용 대기시간 미적용 10%", "상태 이상에 걸린 대상 공격 시 데미지 8%"] }],
    "플레임위자드": [{ type: "추천 세팅", options: ["패시브 스킬 레벨 증가 1", "보스 몬스터 공격 시 데미지 증가 10%", "상태 이상에 걸린 대상 공격 시 데미지 8%"] }],
    "호영": [{ type: "추천 세팅", options: ["패시브 스킬 레벨 증가 1", "보스 몬스터 공격 시 데미지 증가 10%", "상태 이상에 걸린 대상 공격 시 데미지 증가 8%"] }],
    "히어로": [
        { type: "일반 세팅", options: ["보스 몬스터 공격 시 데미지 20% 증가", "상태 이상에 걸린 대상 공격 시 데미지 8% 증가", "버프 지속시간 38% 증가"] },
        { type: "벞지 90% 이상", options: ["보스 몬스터 공격 시 데미지 증가 20%", "상태 이상에 걸린 대상 공격 시 데미지 8%", "공격력 증가 21"] }
    ]
};

export default function AbilityWidget({ ocid, refreshKey }: { ocid: string, refreshKey: number }) {
    const [abilities, setAbilities] = useState<AbilityInfo[]>([]);
    const [grade, setGrade] = useState<string>("");
    const [jobName, setJobName] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!ocid) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const [abilRes, basicRes] = await Promise.all([
                    getCharacterAbility(ocid),
                    getCharacterBasic(ocid)
                ]);

                // API 응답 구조 확인 (data 속성 또는 직접 반환)
                const abilData = abilRes.data || abilRes;
                const basicData = basicRes.data || basicRes;

                setGrade(abilData.ability_grade || "데이터 없음");
                setAbilities(abilData.ability_info || []);
                setJobName(basicData.character_class || "");

            } catch (err) {
                console.error("어빌리티 로딩 실패", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ocid, refreshKey]);

    // 모달 뒤로가기 핸들링
    useEffect(() => {
        if (isOpen) {
            window.history.pushState({ modal: 'ability' }, '', window.location.href);
            document.body.style.overflow = 'hidden';

            const handlePopState = () => {
                setIsOpen(false);
            };

            window.addEventListener('popstate', handlePopState);

            return () => {
                document.body.style.overflow = 'unset';
                window.removeEventListener('popstate', handlePopState);
            };
        }
    }, [isOpen]);

    const handleClose = () => {
        window.history.back();
    };

    if (loading) return <div className="w-full h-full flex items-center justify-center bg-slate-800/50 rounded-xl border border-slate-700 animate-pulse"></div>;

    // 등급별 색상
    const getGradeColor = (gradeName: string) => {
        switch (gradeName) {
            case "레전드리": return "text-green-400 border-green-500/50 bg-green-950/50";
            case "유니크": return "text-yellow-400 border-yellow-500/50 bg-yellow-950/50";
            case "에픽": return "text-purple-400 border-purple-500/50 bg-purple-950/50";
            case "레어": return "text-blue-400 border-blue-500/50 bg-blue-950/50";
            default: return "text-slate-400 border-slate-600 bg-slate-800";
        }
    };

    // 추천 어빌리티 확인 로직
    const presets = ABILITY_DB[jobName];

    // 첫 줄 비교 (단순 키워드 매칭)
    let isFirstLineMatch = false;
    let matchType = ""; // 어떤 타입과 일치하는지 (비숍의 경우)

    const checkMatch = (myFirst: string, recFirst: string) => {
        let keyword = "";
        if (recFirst.includes("재사용")) keyword = "재사용";
        else if (recFirst.includes("보스")) keyword = "보스";
        else if (recFirst.includes("패시브")) keyword = "패시브";
        else if (recFirst.includes("버프")) keyword = "버프";
        else if (recFirst.includes("크리티컬")) keyword = "크리티컬";
        else if (recFirst.includes("상태 이상")) keyword = "상태 이상";
        else if (recFirst.includes("공격력")) keyword = "공격력";
        else if (recFirst.includes("마력")) keyword = "마력";
        else keyword = recFirst.substring(0, 2); // 기본값

        return myFirst.includes(keyword);
    };

    if (abilities.length > 0) {
        const myFirst = abilities[0].ability_value;

        if (presets) {
            // 모든 프리셋 변형을 체크
            for (const preset of presets) {
                if (checkMatch(myFirst, preset.options[0])) {
                    isFirstLineMatch = true;
                    matchType = preset.type;
                    break;
                }
            }
        } else {
            // 추천 데이터가 없는 경우 (신규 직업 등)
            isFirstLineMatch = true;
        }
    }

    // 어빌리티 요약 텍스트 생성 (예: 보스/상태/버프)
    const getAbilitySummary = () => {
        if (abilities.length === 0) return "";

        const keywords = abilities.map(ab => {
            const val = ab.ability_value;
            if (val.includes("보스 몬스터")) return "보스";
            if (val.includes("재사용")) return "재사용";
            if (val.includes("버프")) return "버프";
            if (val.includes("상태 이상")) return "상태";
            if (val.includes("크리티컬")) return "크리";
            if (val.includes("공격력")) return "공격";
            if (val.includes("마력")) return "마력";
            if (val.includes("메소")) return "메소";
            if (val.includes("아이템")) return "드랍";
            if (val.includes("패시브")) return "패시브";
            if (val.includes("다수")) return "다수";
            return val.substring(0, 2);
        });

        return `(${keywords.join("/")})`;
    };

    return (
        <div className={`relative w-full h-full ${isOpen ? 'z-[100]' : 'z-0'}`}>
            {/* 요약 버튼 (심볼 배지와 동일한 스타일) */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-bold transition-all cursor-pointer shadow-sm hover:shadow-md hover:border-slate-500`}
            >
                <span className="text-lg text-yellow-200">◆</span>
                <span className="text-sm">어빌리티</span>

                {abilities.length > 0 ? (
                    <div className="flex items-center gap-1.5 ml-1">
                        <span className="text-xs sm:text-sm text-slate-300 font-normal tracking-tight">
                            {getAbilitySummary()}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${getGradeColor(grade)}`}>
                            {grade}
                        </span>
                    </div>
                ) : (
                    <span className="text-xs text-slate-500 ml-1">정보 없음</span>
                )}
            </div>

            {/* 상세 팝업 (Portal 사용) */}
            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4" onClick={handleClose}>
                    <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 w-full max-w-md animate-in fade-in slide-in-from-top-2 max-h-[90vh] overflow-y-auto custom-scrollbar" onClick={e => e.stopPropagation()}>
                        <h4 className="text-xs font-bold text-slate-300 mb-3 border-b border-slate-800 pb-2 flex justify-between items-center">
                            <span>어빌리티 상세 정보</span>
                            <button onClick={handleClose} className="text-slate-500 hover:text-slate-300">✕</button>
                        </h4>

                        {/* 내 어빌리티 리스트 */}
                        {abilities.length > 0 ? (
                            <div className="space-y-2 mb-4">
                                {abilities.map((ab, idx) => {
                                    // 등급별 텍스트 색상 (배경/테두리는 제외하고 텍스트만)
                                    const gradeTextColor = (g: string) => {
                                        switch (g) {
                                            case "레전드리": return "text-green-400";
                                            case "유니크": return "text-yellow-400";
                                            case "에픽": return "text-purple-400";
                                            case "레어": return "text-blue-400";
                                            default: return "text-slate-300";
                                        }
                                    };

                                    return (
                                        <div key={idx} className={`
                                            p-2 rounded border text-xs flex items-center justify-between
                                            ${idx === 0 ? "bg-slate-800/80 border-slate-600 font-bold" : "bg-slate-950/30 border-slate-800"}
                                        `}>
                                            <span className={`truncate ${gradeTextColor(ab.ability_grade)}`}>{ab.ability_value}</span>
                                            <div className="flex items-center gap-1">
                                                <span className={`text-[9px] px-1 rounded border opacity-70 ${gradeTextColor(ab.ability_grade)} border-current`}>
                                                    {ab.ability_grade}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center text-slate-500 py-4 text-sm">
                                설정된 어빌리티가 없습니다.
                            </div>
                        )}

                        {/* 추천 어빌리티 섹션 */}
                        {presets && (
                            <div className="mt-4 pt-3 border-t border-slate-700">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                        💡 추천 어빌리티 <span className="text-[9px] font-normal opacity-70">(2025.07 기준)</span>
                                    </h4>
                                    {!isFirstLineMatch ? (
                                        <span className="text-[9px] bg-red-950/50 text-red-400 px-1.5 py-0.5 rounded border border-red-900 animate-pulse">
                                            ⚠️ 첫 줄 불일치
                                        </span>
                                    ) : matchType && matchType !== "추천 세팅" ? (
                                        <span className="text-[9px] bg-blue-950/50 text-blue-400 px-1.5 py-0.5 rounded border border-blue-900">
                                            ✅ {matchType} 일치
                                        </span>
                                    ) : null}
                                </div>

                                {/* 추천 프리셋 렌더링 */}
                                <div className="space-y-3 max-h-[200px] overflow-y-auto custom-scrollbar pr-1">
                                    {presets.map((preset, pIdx) => (
                                        <div key={pIdx} className={`bg-indigo-950/20 border rounded p-2 ${matchType === preset.type ? 'border-blue-500/40 bg-blue-950/20' : 'border-indigo-500/20'}`}>
                                            {preset.type !== "추천 세팅" && (
                                                <div className={`text-[10px] font-bold mb-1.5 border-b pb-1 ${matchType === preset.type ? 'text-blue-300 border-blue-500/20' : 'text-indigo-300 border-indigo-500/10'}`}>
                                                    {preset.type}
                                                </div>
                                            )}
                                            <div className="flex flex-col gap-1">
                                                {preset.options.map((rec, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-xs">
                                                        <span className={`w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold ${i === 0 ? 'bg-yellow-500/20 text-yellow-200' : 'bg-slate-700 text-slate-400'}`}>
                                                            {i + 1}
                                                        </span>
                                                        <span className={i === 0 ? "text-indigo-200 font-medium" : "text-slate-500"}>
                                                            {rec}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
