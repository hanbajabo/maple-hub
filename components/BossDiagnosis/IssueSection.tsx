import React from 'react';
import { Issue } from './types';

export const DiagnosisHeader = () => (
    <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 p-4 rounded-lg border border-red-800/50">
        <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
            <span>⚔️</span>
            <span>보스 템셋팅 단계별 가이드</span>
        </h3>
        <p className="text-sm text-slate-400">
            보스 딜링을 위한 장비 세팅을 단계별로 점검합니다
        </p>
    </div>
);

export const IssueGroup = ({ title, issues, colorClass, icon }: { title: string, issues: Issue[], colorClass: string, icon: string }) => {
    if (issues.length === 0) return null;

    const borderColors: { [key: string]: string } = {
        "yellow": "border-yellow-900/30",
        "purple": "border-purple-900/30",
        "cyan": "border-cyan-900/30",
        "pink": "border-pink-900/30",
        "orange": "border-orange-900/30",
        "blue": "border-blue-900/30",
        "green": "border-green-900/30",
        "indigo": "border-indigo-900/30"
    };
    const textColors: { [key: string]: string } = {
        "yellow": "text-yellow-500/90",
        "purple": "text-purple-400/90",
        "cyan": "text-cyan-400/90",
        "pink": "text-pink-400/90",
        "orange": "text-orange-400/90",
        "blue": "text-blue-400/90",
        "green": "text-green-400/90",
        "indigo": "text-indigo-400/90"
    };
    const borderLColors: { [key: string]: string } = {
        "yellow": "border-yellow-900/50",
        "purple": "border-purple-900/50",
        "cyan": "border-cyan-900/50",
        "pink": "border-pink-900/50",
        "orange": "border-orange-900/50",
        "blue": "border-blue-900/50",
        "green": "border-green-900/50",
        "indigo": "border-indigo-900/50"
    };

    return (
        <div className={`bg-slate-950/50 rounded border ${borderColors[colorClass]} p-2`}>
            <h5 className={`${textColors[colorClass]} text-lg font-bold mb-1 flex items-center gap-1`}>
                {icon} {title} ({issues.length})
            </h5>
            <ul className="space-y-1">
                {issues.map((issue, idx) => (
                    <li key={idx} className={`text-slate-300 text-sm pl-2 border-l-2 ${borderLColors[colorClass]}`}>
                        {issue.message}
                        {issue.detail && (
                            <p className="text-xs text-slate-400 mt-0.5">{issue.detail}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const IssueSection = ({ issues, show, onToggle, stage }: { issues: Issue[], show: boolean, onToggle: () => void, stage: number }) => {
    if (issues.length === 0) return null;

    // 1단계 이슈
    const wrongPresetIssues = issues.filter(i => i.type === 'wrong_preset');
    const bossSettingIssues = issues.filter(i => i.type === 'boss_setting');
    const starforceIssues = issues.filter(i => i.type === 'starforce');
    const potentialIssues = issues.filter(i => i.type === 'potential');
    const additionalIssues = issues.filter(i => i.type === 'additional');

    // 2단계 이슈 (세트 효과)
    const setEffectIssues = issues.filter(i => i.type === 'set_effect');

    // 3단계 이슈 (WSE)
    const emblemIssues = issues.filter(i => i.type === 'wse_emblem');
    const weaponIssues = issues.filter(i => i.type === 'wse_weapon');
    const secondaryIssues = issues.filter(i => i.type === 'wse_secondary' || i.type === 'wse_sub');
    const ringIssues = issues.filter(i => i.type === 'wse_ring');

    // 4단계 이슈 (방어구 방향성)
    const armorIssues = issues.filter(i => i.type === 'armor_direction');

    // 5단계 이슈 (성장 진단)
    const growthStarforceIssues = issues.filter(i => i.type === 'growth_starforce');
    const growthScrollIssues = issues.filter(i => i.type === 'growth_scroll');
    const growthFlameIssues = issues.filter(i => i.type === 'growth_flame');
    const growthPotentialIssues = issues.filter(i => i.type === 'growth_potential');
    const growthAdditionalIssues = issues.filter(i => i.type === 'growth_additional');

    // 7단계 이슈 (최적화)
    const optimizationIssues = issues.filter(i => i.type === 'optimization');

    const hasStage1Issues = wrongPresetIssues.length > 0 || bossSettingIssues.length > 0 || starforceIssues.length > 0 || potentialIssues.length > 0 || additionalIssues.length > 0;
    const hasStage2Issues = setEffectIssues.length > 0;
    const hasStage3Issues = emblemIssues.length > 0 || weaponIssues.length > 0 || secondaryIssues.length > 0 || ringIssues.length > 0;
    const hasStage4Issues = armorIssues.length > 0;
    const hasStage5Issues = bossSettingIssues.length > 0 || growthStarforceIssues.length > 0 || growthScrollIssues.length > 0 || growthFlameIssues.length > 0 || growthPotentialIssues.length > 0 || growthAdditionalIssues.length > 0;
    const hasStage6Issues = optimizationIssues.length > 0; // 6단계: 특수 스펙 최적화
    const hasStage7Issues = growthStarforceIssues.length > 0; // 7단계: 18성 (스타포스만 체크)

    // 현재 단계에 맞는 이슈만 보여주기
    if (stage === 0 && !hasStage1Issues) return null;
    if (stage === 1 && !hasStage2Issues) return null;
    if (stage === 2 && !hasStage3Issues) return null;
    if (stage === 3 && !hasStage4Issues) return null;
    if (stage === 4 && !hasStage5Issues) return null;
    if (stage === 5 && !hasStage6Issues) return null;
    if (stage === 6 && !hasStage7Issues) return null;

    let currentIssuesCount = 0;
    let stageTitle = "";

    if (stage === 0) {
        currentIssuesCount = wrongPresetIssues.length + bossSettingIssues.length + starforceIssues.length + potentialIssues.length + additionalIssues.length;
        stageTitle = "1단계";
    } else if (stage === 1) {
        currentIssuesCount = setEffectIssues.length;
        stageTitle = "2단계";
    } else if (stage === 2) {
        currentIssuesCount = emblemIssues.length + weaponIssues.length + secondaryIssues.length + ringIssues.length;
        stageTitle = "3단계";
    } else if (stage === 3) {
        currentIssuesCount = armorIssues.length;
        stageTitle = "4단계 (방어구)";
    } else if (stage === 4) {
        currentIssuesCount = bossSettingIssues.length + growthStarforceIssues.length + growthScrollIssues.length + growthFlameIssues.length + growthPotentialIssues.length + growthAdditionalIssues.length;
        stageTitle = "5단계";
    } else if (stage === 5) {
        currentIssuesCount = optimizationIssues.length;
        stageTitle = "6단계";
    } else if (stage === 6) {
        currentIssuesCount = growthStarforceIssues.length;
        stageTitle = "7단계";
    }

    return (
        <div className="mt-4">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-3 bg-red-950/30 border border-red-900/50 rounded-lg hover:bg-red-900/20 transition-colors"
            >
                <span className="text-red-400 font-bold text-lg flex items-center gap-2">
                    <span>⚠️</span> {stageTitle} 미달 항목 ({currentIssuesCount}개)
                </span>
                <span className={`text-red-400 transition-transform ${show ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>

            {show && (
                <div className="mt-2 space-y-3 p-2 bg-slate-950/30 rounded-lg border border-slate-800/50">
                    <div className="grid grid-cols-1 gap-2">
                        {stage === 0 && (
                            <>
                                <IssueGroup title="템셋팅 경고" issues={wrongPresetIssues} colorClass="orange" icon="⚠️" />
                                <IssueGroup title="보스 세팅 확인" issues={bossSettingIssues} colorClass="red" icon="🚨" />
                                <IssueGroup title="스타포스 부족" issues={starforceIssues} colorClass="yellow" icon="⭐" />
                                <IssueGroup title="잠재능력 부족" issues={potentialIssues} colorClass="purple" icon="🔮" />
                                <IssueGroup title="에디셔널 부족" issues={additionalIssues} colorClass="cyan" icon="💎" />
                            </>
                        )}
                        {stage === 1 && (
                            <IssueGroup title="세트 효과 부족" issues={setEffectIssues} colorClass="green" icon="🧩" />
                        )}
                        {stage === 2 && (
                            <>
                                <IssueGroup title="엠블렘 미달" issues={emblemIssues} colorClass="pink" icon="🎯" />
                                <IssueGroup title="무기 미달" issues={weaponIssues} colorClass="orange" icon="⚔️" />
                                <IssueGroup title="보조무기 미달" issues={secondaryIssues} colorClass="blue" icon="🛡️" />
                                <IssueGroup title="반지 미달" issues={ringIssues} colorClass="purple" icon="💍" />
                            </>
                        )}
                        {stage === 3 && (
                            <IssueGroup title="방어구 방향성 미달" issues={armorIssues} colorClass="blue" icon="🛡️" />
                        )}
                        {stage === 4 && (
                            <>
                                <IssueGroup title="보스 세팅 확인" issues={bossSettingIssues} colorClass="red" icon="🚨" />
                                <IssueGroup title="스타포스 미달" issues={growthStarforceIssues} colorClass="yellow" icon="⭐" />
                                <IssueGroup title="주문서 작 미달" issues={growthScrollIssues} colorClass="green" icon="📜" />
                                <IssueGroup title="추가 옵션 미달" issues={growthFlameIssues} colorClass="orange" icon="🔥" />
                                <IssueGroup title="잠재능력 미달" issues={growthPotentialIssues} colorClass="purple" icon="🔮" />
                                <IssueGroup title="에디셔널 미달" issues={growthAdditionalIssues} colorClass="cyan" icon="💎" />
                            </>
                        )}
                        {stage === 5 && (
                            <>
                                <IssueGroup title="최적화 미달" issues={optimizationIssues} colorClass="indigo" icon="⚡" />
                            </>
                        )}
                        {stage === 6 && (
                            <>
                                <IssueGroup title="스타포스 미달 (18성)" issues={growthStarforceIssues} colorClass="yellow" icon="⭐" />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
