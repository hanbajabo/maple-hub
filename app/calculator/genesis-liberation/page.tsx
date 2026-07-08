/**
 * 제네시스 무기 해방 계산기 페이지
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import WeeklySchedule from '@/components/GenesisCalculator/WeeklySchedule';
import SpreadsheetView from '@/components/GenesisCalculator/SpreadsheetView';
import ResultSummary from '@/components/GenesisCalculator/ResultSummary';
import { SEASON_3, SEASON_4, QUEST_STAGES } from '@/data/genesis-liberation';
import {
    BossSelection,
    calculateWeeklyLiberationProgress,
    CalculationResult,
} from '@/lib/genesis-calculator';
import { InArticleAd } from '@/components/AdSense';

const LOCAL_STORAGE_KEY = 'genesis_calculator_state';

export default function GenesisLiberationPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'spreadsheet'>('spreadsheet');
    const [selectedSeason, setSelectedSeason] = useState<'season3' | 'season4'>('season4');
    const [isGenesisPass, setIsGenesisPass] = useState(true);
    const [currentStage, setCurrentStage] = useState(1);
    const [currentTraces, setCurrentTraces] = useState(0);
    const [weeklySelections, setWeeklySelections] = useState<Map<number, BossSelection[]>>(
        new Map()
    );
    const [result, setResult] = useState<CalculationResult | null>(null);

    // 로컬 스토리지에서 데이터 불러오기
    useEffect(() => {
        setIsMounted(true);
        try {
            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedData) {
                const parsed = JSON.parse(savedData);
                const season = parsed.selectedSeason || 'season4';
                setSelectedSeason(season);
                if (parsed.isGenesisPass !== undefined) setIsGenesisPass(parsed.isGenesisPass);
                if (parsed.currentStage) setCurrentStage(parsed.currentStage);
                if (parsed.currentTraces !== undefined) setCurrentTraces(parsed.currentTraces);
                
                if (parsed.selections && parsed.selections[season]) {
                    setWeeklySelections(new Map(parsed.selections[season]));
                } else if (parsed.weeklySelections) {
                    setWeeklySelections(new Map(parsed.weeklySelections));
                }
            }
        } catch (error) {
            console.error('Failed to parse local storage data', error);
        }
    }, []);

    // 상태 변경 시 로컬 스토리지에 자동 저장
    useEffect(() => {
        if (!isMounted) return;
        
        try {
            const existingRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
            const stateToSave = existingRaw ? JSON.parse(existingRaw) : {};
            
            stateToSave.selectedSeason = selectedSeason;
            stateToSave.isGenesisPass = isGenesisPass;
            stateToSave.currentStage = currentStage;
            stateToSave.currentTraces = currentTraces;
            
            if (!stateToSave.selections) stateToSave.selections = {};
            stateToSave.selections[selectedSeason] = Array.from(weeklySelections.entries());

            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
        } catch (error) {
            console.error('Failed to save to local storage', error);
        }
    }, [selectedSeason, isGenesisPass, currentStage, currentTraces, weeklySelections, isMounted]);

    // 계산 실행
    useEffect(() => {
        // 최소한 하나의 주차에 보스가 선택되어 있어야 함
        const hasAnySelection = Array.from(weeklySelections.values()).some(
            (selections) => selections.length > 0
        );

        if (!hasAnySelection) {
            setResult(null);
            return;
        }

        const activeSeason = selectedSeason === 'season3' ? SEASON_3 : SEASON_4;
        const activeIsGenesisPass = selectedSeason === 'season4' ? isGenesisPass : false;

        const calculationResult = calculateWeeklyLiberationProgress({
            currentStage,
            currentTraces,
            weeklySelections,
            startDate: activeSeason.startDate,
            season: activeSeason,
            isGenesisPass: activeIsGenesisPass,
        });

        setResult(calculationResult);
    }, [currentStage, currentTraces, weeklySelections, selectedSeason, isGenesisPass]);

    const activeSeason = selectedSeason === 'season3' ? SEASON_3 : SEASON_4;
    const activeIsGenesisPass = selectedSeason === 'season4' ? isGenesisPass : false;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-purple-900 to-pink-900 shadow-xl">
                <div className="container mx-auto px-4 py-8">
                    {/* 네비게이션 버튼 */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Link prefetch={false}
                                href="/"
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <span>🏠</span>
                                <span>홈</span>
                            </Link>
                            <Link prefetch={false}
                                href="/blog"
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <span>📝</span>
                                <span>블로그</span>
                            </Link>
                        </div>
                        <Link prefetch={false}
                            href="/blog/genesis-liberation-calculator"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                        >
                            <span>📖</span>
                            <span>사용 가이드</span>
                        </Link>
                    </div>

                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                            ⚔️ 제네시스 무기 해방 계산기
                        </h1>
                        <p className="text-purple-200 text-lg">
                            챌린저스 시즌별 주차별 보스 격파 스케줄로 해방 완료 시점을 계산하세요
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-6 max-w-7xl">
                <InArticleAd dataAdSlot="8162808816" />
            </div>

            {/* 메인 컨텐츠 */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 왼쪽: 입력 섹션 (2/3) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* 시즌 및 패스 설정 */}
                        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 space-y-4">
                            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                <span>⚙️</span>
                                <span>시즌 및 패스 설정</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* 시즌 선택 */}
                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        도전 시즌 선택
                                    </label>
                                    <select
                                        value={selectedSeason}
                                        onChange={(e) => {
                                            const val = e.target.value as 'season3' | 'season4';
                                            setSelectedSeason(val);
                                            
                                            // 저장된 해당 시즌 데이터가 있으면 불러오기
                                            try {
                                                const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
                                                let loaded = false;
                                                if (savedData) {
                                                    const parsed = JSON.parse(savedData);
                                                    if (parsed.selections && parsed.selections[val]) {
                                                        setWeeklySelections(new Map(parsed.selections[val]));
                                                        loaded = true;
                                                    }
                                                }
                                                if (!loaded) setWeeklySelections(new Map());
                                            } catch (err) {
                                                setWeeklySelections(new Map());
                                            }

                                            if (val === 'season4') {
                                                setIsGenesisPass(true);
                                            } else {
                                                setIsGenesisPass(false);
                                            }
                                        }}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white 
                                                 border border-gray-600 focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="season4">제네시스 패스 (시즌4, 13주)</option>
                                        <option value="season3">챌린저스 시즌3 (17주)</option>
                                    </select>
                                </div>

                                {/* 제네시스 패스 여부 */}
                                <div className="flex items-center">
                                    {selectedSeason === 'season4' ? (
                                        <label className="flex items-center gap-3 cursor-pointer bg-purple-950/20 border border-purple-500/30 p-3 rounded-lg w-full hover:bg-purple-950/30 transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={isGenesisPass}
                                                onChange={(e) => setIsGenesisPass(e.target.checked)}
                                                className="w-5 h-5 rounded border-purple-500 bg-purple-900 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-900"
                                            />
                                            <div>
                                                <p className="text-sm font-bold text-purple-200">제네시스 패스 활성화 (3배속)</p>
                                                <p className="text-xs text-purple-400">보스 처치 시 어둠의 흔적 획득량이 3배가 됩니다.</p>
                                            </div>
                                        </label>
                                    ) : (
                                        <div className="bg-gray-800/80 border border-gray-700 p-3 rounded-lg w-full opacity-50 select-none">
                                            <p className="text-sm font-bold text-gray-400">제네시스 패스 미지원 시즌</p>
                                            <p className="text-xs text-gray-500">챌린저스 시즌3은 제네시스 패스 혜택이 적용되지 않습니다.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 현재 진행 상황 */}
                        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                            <h3 className="text-lg font-bold text-white mb-4">
                                현재 진행 상황
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* 현재 단계 */}
                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        현재 진행 중인 단계
                                    </label>
                                    <select
                                        value={currentStage}
                                        onChange={(e) => setCurrentStage(parseInt(e.target.value))}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white 
                                     border border-gray-600 focus:ring-2 focus:ring-purple-500"
                                    >
                                        {QUEST_STAGES.map((stage) => (
                                            <option key={stage.stage} value={stage.stage}>
                                                {stage.stage}단계: {stage.bossName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* 현재 보유 흔적 */}
                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        현재 보유 어둠의 흔적
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="0"
                                            max="3000"
                                            value={currentTraces}
                                            onChange={(e) =>
                                                setCurrentTraces(
                                                    Math.min(3000, Math.max(0, parseInt(e.target.value) || 0))
                                                )
                                            }
                                            className="w-full pl-4 pr-16 py-3 rounded-lg bg-gray-700 text-white 
                                       border border-gray-600 focus:ring-2 focus:ring-purple-500"
                                            placeholder="0"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none select-none">
                                            / 3,000
                                        </span>
                                    </div>

                                    {/* 프로그레스 바 */}
                                    <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-yellow-500 h-2 rounded-full transition-all"
                                            style={{ width: `${(currentTraces / 3000) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 뷰 모드 토글 */}
                        <div className="flex flex-col sm:flex-row bg-gray-800/80 p-1 rounded-lg border border-gray-700 w-full sm:w-fit mb-4 gap-1 sm:gap-0">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-4 py-2.5 sm:py-2 text-sm font-bold rounded-md transition-colors w-full sm:w-auto ${viewMode === 'list' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                            >
                                📋 리스트 뷰
                            </button>
                            <button
                                onClick={() => setViewMode('spreadsheet')}
                                className={`px-4 py-2.5 sm:py-2 text-sm font-bold rounded-md transition-colors w-full sm:w-auto ${viewMode === 'spreadsheet' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                            >
                                📊 스프레드시트 뷰 (심플)
                            </button>
                        </div>

                        {/* 선택된 뷰 렌더링 */}
                        {viewMode === 'list' ? (
                            <WeeklySchedule
                                key={selectedSeason}
                                totalWeeks={selectedSeason === 'season3' ? 17 : 13}
                                weeklySelections={weeklySelections}
                                onScheduleChange={setWeeklySelections}
                                isGenesisPass={activeIsGenesisPass}
                                startDate={activeSeason.startDate}
                            />
                        ) : (
                            <SpreadsheetView
                                key={`spreadsheet-${selectedSeason}`}
                                totalWeeks={selectedSeason === 'season3' ? 17 : 13}
                                weeklySelections={weeklySelections}
                                onScheduleChange={setWeeklySelections}
                                isGenesisPass={activeIsGenesisPass}
                                startDate={activeSeason.startDate}
                                currentStage={currentStage}
                                currentTraces={currentTraces}
                            />
                        )}
                    </div>

                    {/* 오른쪽: 결과 섹션 (1/3) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <ResultSummary 
                                result={result} 
                                season={activeSeason} 
                                isGenesisPass={activeIsGenesisPass}
                            />
                        </div>
                    </div>
                </div>

                <div className="my-8">
                    <InArticleAd dataAdSlot="6849727140" />
                </div>

                {/* 안내 사항 */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 해방 가이드 */}
                    <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-blue-300 mb-4 flex items-center gap-2">
                            <span>📌</span>
                            제네시스 무기 해방 가이드
                        </h3>
                        <div className="space-y-3 text-sm text-blue-200">
                            <div>
                                <strong>• 해방 퀘스트 흐름:</strong> 총 8개의 단계를 순차적으로 완료
                            </div>
                            <div>
                                <strong>• 각 단계별 요구사항:</strong>
                                <ul className="list-disc list-inside ml4 mt-2 space-y-1">
                                    <li>1~3단계: 각 500 흔적 + 군단장 솔로/2인</li>
                                    <li>4~8단계: 각 1,000 흔적 + 군단장 솔로/2인</li>
                                </ul>
                            </div>
                            <div>
                                <strong>• 월간 보스:</strong> 검은 마법사는 달력 기준 매월 1회 격파 가능합니다.
                                (시즌3: 1, 3, 8, 12, 16주차 / 시즌4: 1, 3, 8, 12주차)
                            </div>
                        </div>
                    </div>

                    {/* 시즌 정보 */}
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
                            <span>🏆</span>
                            {selectedSeason === 'season3' ? '챌린저스 시즌3' : '제네시스 패스 (시즌4)'}
                        </h3>
                        <div className="grid grid-cols-1 gap-3 text-sm">
                            <div className="bg-gray-900/50 rounded p-3">
                                <div className="text-gray-400 mb-1">시작일</div>
                                <div className="text-white font-semibold">
                                    {selectedSeason === 'season3' ? '2025년 12월 18일' : '2026년 6월 18일'}
                                </div>
                            </div>
                            <div className="bg-gray-900/50 rounded p-3">
                                <div className="text-gray-400 mb-1">종료일</div>
                                <div className="text-white font-semibold">
                                    {selectedSeason === 'season3' ? '2026년 4월 16일' : '2026년 9월 16일'}
                                </div>
                            </div>
                            <div className="bg-gray-900/50 rounded p-3">
                                <div className="text-gray-400 mb-1">총 기간</div>
                                <div className="text-white font-semibold">
                                    {selectedSeason === 'season3' ? '17주 (119일)' : '13주 (90일)'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 푸터 */}
            <div className="container mx-auto px-4 py-8 text-center text-gray-500 text-sm">
                <p>💡 주간 보스 리셋은 매주 목요일 기준으로 계산됩니다</p>
                <p className="mt-1">
                    ⚠️ 월간 보스(검은 마법사)는 매월 1일 초기화되어 달력 기준 월 1회만 격파 가능합니다 
                    ({selectedSeason === 'season3' ? '추천: 1, 3, 8, 12, 16주차' : '추천: 1, 3, 8, 12주차'})
                </p>
            </div>
        </div>
    );
}
