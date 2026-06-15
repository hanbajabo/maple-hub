/**
 * 계산 결과 요약 컴포넌트
 */

'use client';

import { CalculationResult, formatDate, formatDateShort } from '@/lib/genesis-calculator';
import { Season } from '@/data/genesis-liberation';

interface ResultSummaryProps {
    result: CalculationResult | null;
    season: Season;
    isGenesisPass?: boolean;
}

export default function ResultSummary({ result, season, isGenesisPass }: ResultSummaryProps) {
    if (!result) {
        return (
            <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700 text-center">
                <div className="text-gray-400">
                    <div className="text-4xl mb-4">📊</div>
                    <p>보스를 선택하면 해방 스케줄이 계산됩니다</p>
                </div>
            </div>
        );
    }

    const {
        tracesPerWeek,
        stageCompletions,
        finalCompletionDate,
        finalWeekNumber,
        canCompleteInSeason,
        isPossibleToComplete,
        daysUntilCompletion,
        daysUntilSeasonEnd,
    } = result;

    return (
        <div className="space-y-6">
            {/* 주요 지표 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-lg p-6 border border-blue-700">
                    <div className="text-blue-300 text-sm mb-1">주간 평균 획득량</div>
                    <div className="text-3xl font-bold text-white">
                        {Math.round(tracesPerWeek)}
                        <span className="text-lg text-blue-300 ml-2">흔적/주</span>
                    </div>
                </div>

                <div
                    className={`bg-gradient-to-br rounded-lg p-6 border ${canCompleteInSeason
                        ? 'from-green-900/50 to-green-800/30 border-green-700'
                        : 'from-red-900/50 to-red-800/30 border-red-700'
                        }`}
                >
                    <div className={canCompleteInSeason ? 'text-green-300' : 'text-red-300'}>
                        <div className="text-sm mb-1">해방 완료 예상</div>
                        <div className="text-2xl font-bold text-white">
                            {finalCompletionDate ? formatDate(finalCompletionDate) : '해방 불가'}
                        </div>
                        <div className="text-sm mt-1">
                            {finalCompletionDate && finalWeekNumber ? `${finalWeekNumber}주차 소요 • D-${daysUntilCompletion}` : '흔적 부족으로 진행 불가'}
                        </div>
                    </div>
                </div>
            </div>

            {/* 시즌 상태 */}
            <div
                className={`rounded-lg p-4 border ${canCompleteInSeason
                    ? 'bg-green-900/20 border-green-700'
                    : 'bg-red-900/20 border-red-700'
                    }`}
            >
                <div className="flex items-start gap-3">
                    <span className="text-2xl">
                        {canCompleteInSeason ? '✅' : '⚠️'}
                    </span>
                    <div className="flex-1">
                        {canCompleteInSeason ? (
                            <div>
                                <div className="font-semibold text-green-300 mb-1">
                                    시즌 내 해방 가능! 🎉
                                </div>
                                <div className="text-sm text-green-200">
                                    시즌 종료 ({formatDate(season.endDate)})까지{' '}
                                    <strong>
                                        {Math.max(0, daysUntilSeasonEnd - (daysUntilCompletion || 0))}일
                                    </strong>{' '}
                                    여유가 있습니다.
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="font-semibold text-red-300 mb-1">
                                    주의: 현재 진행 속도로는 시즌 내 해방 불가능
                                </div>
                                <div className="text-sm text-red-200">
                                    예상 완료: {finalCompletionDate ? formatDate(finalCompletionDate) : '진행 불가'} {finalCompletionDate && `(시즌 종료 후 ${Math.abs(daysUntilSeasonEnd - (daysUntilCompletion || 0))}일)`}
                                </div>
                                <div className="mt-3 text-sm text-red-100 space-y-1">
                                    <div className="font-semibold">💡 해결 방법:</div>
                                    <ul className="list-disc list-inside space-y-1 ml-2">
                                        {!isGenesisPass && season.name.includes('시즌4') && (
                                            <li className="text-yellow-300 font-bold">제네시스 패스 적용 (어둠의 흔적 3배)</li>
                                        )}
                                        <li>검은 마법사 격파 추가 (+600/주)</li>
                                        <li>더 높은 난이도 보스 격파</li>
                                        <li>파티 → 솔로 격파로 전환</li>
                                        {!isPossibleToComplete && <li>이후 주차에 보스 격파 스케줄 추가</li>}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 단계별 타임라인 */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span>📅</span>
                    단계별 완료 스케줄
                </h3>

                <div className="space-y-3">
                    {stageCompletions.map((completion) => {
                        const isCompleted = new Date() > completion.completionDate;
                        const progress = ((completion.stage - 1) / 8) * 100;

                        return (
                            <div
                                key={completion.stage}
                                className="bg-gray-900/50 rounded-lg p-4 border border-gray-700"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted
                                                ? 'bg-green-600 text-white'
                                                : 'bg-blue-600 text-white'
                                                }`}
                                        >
                                            {completion.stage}
                                        </div>
                                        <div>
                                            <div className="text-white font-semibold">
                                                {completion.stage}단계: {completion.bossName}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {completion.requiredTraces} 흔적 필요
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white font-semibold">
                                            {formatDateShort(completion.completionDate)}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {completion.weekNumber}주차
                                        </div>
                                    </div>
                                </div>

                                {/* 프로그레스 바 */}
                                <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                                    <div
                                        className={`h-2 rounded-full transition-all ${isCompleted ? 'bg-green-500' : 'bg-blue-500'
                                            }`}
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 최종 완료 */}
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg border border-purple-700">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">🎉</span>
                        <div className="flex-1">
                            <div className="font-bold text-white text-lg">
                                제네시스 무기 완전 해방!
                            </div>
                            <div className="text-purple-200 text-sm">
                                {formatDate(finalCompletionDate)} ({finalWeekNumber}주차) 완료 예상
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 시즌 정보 */}
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                <div className="text-sm text-gray-400 space-y-1">
                    <div className="flex justify-between">
                        <span>시즌:</span>
                        <span className="text-white font-semibold">{season.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>시즌 기간:</span>
                        <span className="text-white">
                            {formatDate(season.startDate)} ~ {formatDate(season.endDate)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>보스 리셋:</span>
                        <span className="text-white">매주 목요일</span>
                    </div>
                    <div className="flex justify-between">
                        <span>시즌 종료까지:</span>
                        <span className="text-yellow-400 font-semibold">
                            D-{daysUntilSeasonEnd}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
