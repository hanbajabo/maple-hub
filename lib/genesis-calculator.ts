/**
 * 제네시스 무기 해방 계산 로직
 */

import { QUEST_STAGES, Season } from '@/data/genesis-liberation';

export interface BossSelection {
    bossId: string;
    difficulty: string;
    traces: number;
    partySize: number; // 1=솔로, 2=2인, ...
    isMonthly?: boolean; // 월간 보스 여부
}

export interface CalculationInput {
    currentStage: number; // 1~8
    currentTraces: number; // 0~3000
    bossSelections: BossSelection[];
    startDate: Date;
    season: Season;
}

// 주차별 계산 입력
export interface WeeklyCalculationInput {
    currentStage: number; // 1~8
    currentTraces: number; // 0~3000
    weeklySelections: Map<number, BossSelection[]>; // 주차별 보스 선택
    startDate: Date;
    season: Season;
}

export interface StageCompletion {
    stage: number;
    bossName: string;
    requiredTraces: number;
    completionDate: Date;
    weekNumber: number;
}

export interface CalculationResult {
    tracesPerWeek: number; // 주간 획득 어둠의 흔적
    currentStage: number;
    currentTraces: number;
    stageCompletions: StageCompletion[]; // 각 단계별 완료 정보
    finalCompletionDate: Date; // 전체 해방 완료일
    finalWeekNumber: number; // 완료 주차
    canCompleteInSeason: boolean; // 시즌 내 완료 가능 여부
    weeksUntilCompletion: number; // 완료까지 남은 주
    weeksRemainingInSeason: number; // 시즌 종료까지 남은 주
    daysUntilCompletion: number; // 완료까지 남은 일
    daysUntilSeasonEnd: number; // 시즌 종료까지 남은 일
}

/**
 * 다음 보스 리셋일 계산
 */
export function getNextResetDate(baseDate: Date, resetDay: number): Date {
    const result = new Date(baseDate);
    const currentDay = result.getDay();
    const daysUntilReset = (resetDay - currentDay + 7) % 7;

    if (daysUntilReset === 0) {
        // 같은 날이면 다음 주
        result.setDate(result.getDate() + 7);
    } else {
        result.setDate(result.getDate() + daysUntilReset);
    }

    return result;
}

/**
 * N주 후 날짜 계산
 */
export function getDateAfterWeeks(
    startDate: Date,
    weeks: number,
    resetDay: number
): Date {
    const result = new Date(startDate);
    result.setDate(result.getDate() + weeks * 7);
    return result;
}

/**
 * 두 날짜 사이의 주 차이 계산
 */
export function getWeeksDifference(date1: Date, date2: Date): number {
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    const diff = date2.getTime() - date1.getTime();
    return Math.floor(diff / msPerWeek);
}

/**
 * 두 날짜 사이의 일 차이 계산
 */
export function getDaysDifference(date1: Date, date2: Date): number {
    const msPerDay = 1000 * 60 * 60 * 24;
    const diff = date2.getTime() - date1.getTime();
    return Math.floor(diff / msPerDay);
}

/**
 * 주간 획득 가능 어둠의 흔적 계산
 * 월간 보스는 4주당 1회로 계산
 */
export function calculateTracesPerWeek(
    bossSelections: BossSelection[]
): number {
    return bossSelections.reduce((total, selection) => {
        const tracesFromBoss = Math.floor(selection.traces / selection.partySize);
        // 월간 보스는 4주에 1회닌 계산
        const weeklyTraces = selection.isMonthly ? tracesFromBoss / 4 : tracesFromBoss;
        return total + weeklyTraces;
    }, 0);
}

/**
 * 제네시스 해방 계산
 */
export function calculateLiberationProgress(
    input: CalculationInput
): CalculationResult {
    const {
        currentStage,
        currentTraces,
        bossSelections,
        startDate,
        season,
    } = input;

    const tracesPerWeek = calculateTracesPerWeek(bossSelections);

    // 현재 보유 흔적으로 시작
    let accumulatedTraces = currentTraces;
    let currentWeek = 0;
    const stageCompletions: StageCompletion[] = [];

    // 현재 단계부터 8단계까지 계산
    for (let stage = currentStage; stage <= 8; stage++) {
        const stageInfo = QUEST_STAGES[stage - 1];
        const requiredTraces = stageInfo.requiredTraces;

        // 해당 단계를 완료하는데 필요한 추가 흔적
        const tracesNeeded = requiredTraces - accumulatedTraces;

        if (tracesNeeded > 0) {
            // 추가 주차가 필요
            const weeksNeeded = Math.ceil(tracesNeeded / tracesPerWeek);
            currentWeek += weeksNeeded;
            accumulatedTraces += weeksNeeded * tracesPerWeek;
        }

        // 이 단계 완료
        accumulatedTraces -= requiredTraces;

        const completionDate = getDateAfterWeeks(
            startDate,
            currentWeek,
            season.bossResetDay
        );

        stageCompletions.push({
            stage,
            bossName: stageInfo.bossName,
            requiredTraces,
            completionDate,
            weekNumber: currentWeek,
        });
    }

    const finalCompletion = stageCompletions[stageCompletions.length - 1];
    const finalCompletionDate = finalCompletion.completionDate;
    const finalWeekNumber = finalCompletion.weekNumber;

    const canCompleteInSeason = finalCompletionDate <= season.endDate;
    const weeksUntilCompletion = getWeeksDifference(new Date(), finalCompletionDate);
    const weeksRemainingInSeason = getWeeksDifference(new Date(), season.endDate);
    const daysUntilCompletion = getDaysDifference(new Date(), finalCompletionDate);
    const daysUntilSeasonEnd = getDaysDifference(new Date(), season.endDate);

    return {
        tracesPerWeek,
        currentStage,
        currentTraces,
        stageCompletions,
        finalCompletionDate,
        finalWeekNumber,
        canCompleteInSeason,
        weeksUntilCompletion,
        weeksRemainingInSeason,
        daysUntilCompletion,
        daysUntilSeasonEnd,
    };
}

/**
 * 날짜를 "YYYY-MM-DD" 형식으로 포맷
 */
export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * 날짜를 "MM/DD" 형식으로 포맷
 */
export function formatDateShort(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}`;
}

/**
 * 특정 주차의 어둠의 흔적 획득량 계산
 */
export function calculateWeekTraces(
    weekNum: number,
    selections: BossSelection[]
): number {
    return selections.reduce((total, selection) => {
        const tracesFromBoss = Math.floor(selection.traces / selection.partySize);
        // 월간 보스는 1, 5, 9, 13, 17주차에만 획득
        if (selection.isMonthly && weekNum % 4 !== 1) {
            return total;
        }
        return total + tracesFromBoss;
    }, 0);
}

/**
 * 주차별 보스 선택을 고려한 제네시스 해방 계산
 */
export function calculateWeeklyLiberationProgress(
    input: WeeklyCalculationInput
): CalculationResult {
    const {
        currentStage,
        currentTraces,
        weeklySelections,
        startDate,
        season,
    } = input;

    let accumulatedTraces = currentTraces;
    let currentWeek = 0;
    const stageCompletions: StageCompletion[] = [];

    // 현재 단계부터 8단계까지 계산
    for (let stage = currentStage; stage <= 8; stage++) {
        const stageInfo = QUEST_STAGES[stage - 1];
        const requiredTraces = stageInfo.requiredTraces;

        // 해당 단계를 완료하는데 필요한 추가 흔적
        let tracesNeeded = requiredTraces - accumulatedTraces;

        // 주차별로 흔적 획득하며 계산
        while (tracesNeeded > 0) {
            currentWeek++;

            // 17주를 넘어가면 17주차의 보스 설정을 사용
            const weekToUse = currentWeek <= 17 ? currentWeek : 17;
            const weekSelections = weeklySelections.get(weekToUse) || [];
            const weekTraces = calculateWeekTraces(currentWeek, weekSelections);

            accumulatedTraces += weekTraces;
            tracesNeeded -= weekTraces;

            // 무한 루프 방지: 주간 획득량이 0이면 중단
            if (weekTraces === 0) {
                break;
            }
        }

        // 이 단계 완료
        accumulatedTraces -= requiredTraces;

        const completionDate = getDateAfterWeeks(
            startDate,
            currentWeek,
            season.bossResetDay
        );

        stageCompletions.push({
            stage,
            bossName: stageInfo.bossName,
            requiredTraces,
            completionDate,
            weekNumber: currentWeek,
        });
    }

    const finalCompletion = stageCompletions[stageCompletions.length - 1];
    const finalCompletionDate = finalCompletion.completionDate;
    const finalWeekNumber = finalCompletion.weekNumber;

    // 전체 평균 주간 획득량 계산 (참고용)
    let totalTraces = 0;
    for (let week = 1; week <= 17; week++) {
        const weekSelections = weeklySelections.get(week) || [];
        totalTraces += calculateWeekTraces(week, weekSelections);
    }
    const tracesPerWeek = totalTraces / 17;

    const canCompleteInSeason = finalCompletionDate <= season.endDate;
    const weeksUntilCompletion = getWeeksDifference(new Date(), finalCompletionDate);
    const weeksRemainingInSeason = getWeeksDifference(new Date(), season.endDate);
    const daysUntilCompletion = getDaysDifference(new Date(), finalCompletionDate);
    const daysUntilSeasonEnd = getDaysDifference(new Date(), season.endDate);

    return {
        tracesPerWeek,
        currentStage,
        currentTraces,
        stageCompletions,
        finalCompletionDate,
        finalWeekNumber,
        canCompleteInSeason,
        weeksUntilCompletion,
        weeksRemainingInSeason,
        daysUntilCompletion,
        daysUntilSeasonEnd,
    };
}
