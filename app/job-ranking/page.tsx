'use client';

import { ChevronDown, ChevronUp, AlertCircle, Info, Search, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { calculateAllJobRankings, JobScore, HexaFragmentLevel, RankingWeights, DEFAULT_WEIGHTS } from '@/data/job-recommendation/job-ranking-system';
import { calculateHybridRankings, HybridJobScore, HybridMode, HYBRID_MODE_DESCRIPTION } from '@/data/job-recommendation/hybrid-ranking-system';

import Link from 'next/link';

type RankingMode = 'ai' | 'youtuber' | 'general' | 'ceiling';

export default function JobRankingPage() {
    const [aiRankings, setAiRankings] = useState<JobScore[]>([]);
    const [hybridRankings, setHybridRankings] = useState<HybridJobScore[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<JobScore | HybridJobScore | null>(null);
    const [fragmentLevel, setFragmentLevel] = useState<HexaFragmentLevel>('average');
    const [rankingMode, setRankingMode] = useState<RankingMode>('youtuber');
    const [searchQuery, setSearchQuery] = useState('');

    // 평가 기준 선택 상태
    const [selectedCriteria, setSelectedCriteria] = useState<{ [key in keyof RankingWeights]: boolean }>({
        HEXA_EFFICIENCY: true,
        COOL_HAT: true,
        RERANGE: true,
        UTILITY: true,
        TOP_2000: true,
        LEVEL_280: true
    });

    // 가중치 계산
    const currentWeights = useMemo(() => {
        const activeKeys = (Object.keys(selectedCriteria) as Array<keyof RankingWeights>).filter(key => selectedCriteria[key]);

        // 아무것도 선택하지 않으면 기본값 사용
        if (activeKeys.length === 0) return DEFAULT_WEIGHTS;

        const initialTotal = activeKeys.reduce((sum, key) => sum + DEFAULT_WEIGHTS[key], 0);

        const newWeights = { ...DEFAULT_WEIGHTS };

        (Object.keys(newWeights) as Array<keyof RankingWeights>).forEach(key => {
            if (!selectedCriteria[key]) {
                newWeights[key] = 0;
            } else {
                // 선택된 항목은 원래 비율에 맞춰 100% 기준으로 정규화
                newWeights[key] = DEFAULT_WEIGHTS[key] / initialTotal;
            }
        });

        return newWeights;
    }, [selectedCriteria]);

    const handleRankingModeChange = (mode: RankingMode) => {
        setRankingMode(mode);
        setLoading(true);
        setHybridRankings([]); // 상태 초기화로 데이터 섞임 방지
    };

    const toggleCriteria = (key: keyof RankingWeights) => {
        setSelectedCriteria(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        try {
            const aiResult = calculateAllJobRankings(fragmentLevel, currentWeights);

            if (isMounted) {
                setAiRankings(aiResult);

                // 하이브리드 모드인 경우 혼합 순위 계산
                if (rankingMode !== 'ai') {
                    const hybridMode = rankingMode as HybridMode;
                    const hybridResult = calculateHybridRankings(hybridMode, fragmentLevel, currentWeights);

                    // 중복 데이터 방지: 직업명 기준으로 중복 제거
                    const uniqueResult = Array.from(new Map(hybridResult.map(item => [item.job, item])).values());

                    // 순위 재할당 (안전장치)
                    uniqueResult.sort((a, b) => b.totalScore - a.totalScore);
                    uniqueResult.forEach((item, index) => {
                        item.rank = index + 1;
                    });

                    setHybridRankings(uniqueResult);
                }
            }
        } catch (error) {
            console.error('순위 계산 오류:', error);
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }

        return () => {
            isMounted = false;
        };
    }, [fragmentLevel, rankingMode, currentWeights]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
                <div className="text-white text-2xl">순위 계산 중...</div>
            </div>
        );
    }

    const getTierColor = (rank: number) => {
        if (rank <= 10) return 'from-yellow-500 to-orange-500';
        if (rank <= 25) return 'from-purple-500 to-pink-500';
        if (rank <= 35) return 'from-blue-500 to-cyan-500';
        return 'from-gray-500 to-slate-500';
    };

    const getTierBadge = (rank: number) => {
        if (rank <= 3) return '🥇';
        if (rank <= 10) return '🏆';
        if (rank <= 25) return '⭐';
        return '✨';
    };

    const fragmentLevels: { value: HexaFragmentLevel; label: string }[] = [
        { value: 'average', label: '평균' },
        { value: 'level500', label: '500개' },
        { value: 'level1000', label: '1,000개' },
        { value: 'level2000', label: '2,000개' },
        { value: 'level5000', label: '5,000개' },
        { value: 'level10000', label: '10,000개' },
        { value: 'level15000', label: '15,000개' },
        { value: 'level20000', label: '20,000개' }
    ];

    const criteriaList: { key: keyof RankingWeights; name: string; desc: string; color: string }[] = [
        { key: 'HEXA_EFFICIENCY', name: '1️⃣ 헥사', desc: '조각 대비 보정치', color: 'text-yellow-400' },
        { key: 'COOL_HAT', name: '2️⃣ 쿨뚝', desc: '큐브 비용 절감', color: 'text-green-400' },
        { key: 'RERANGE', name: '3️⃣ 리레링', desc: '극딜형 직업인지 체크', color: 'text-red-400' },
        { key: 'UTILITY', name: '4️⃣ 유틸', desc: '편의성 기능', color: 'text-blue-400' },
        { key: 'TOP_2000', name: '5️⃣ 환산', desc: '환산 TOP2000 점유율', color: 'text-purple-400' },
        { key: 'LEVEL_280', name: '6️⃣ Lv280+', desc: '고레벨 직업 점유율', color: 'text-cyan-400' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
            {/* 헤더 */}
            <div className="bg-black/30 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-4xl font-black text-white mb-2 leading-tight">
                                🎮 2025 하이퍼버닝<br className="block sm:hidden" /> 직업 추천 순위 v2.0
                            </h1>
                            <p className="text-gray-300 text-xs sm:text-base break-keep">
                                평가 기준을 직접 선택하여 나만의 맞춤형 순위를 확인하세요!
                            </p>
                        </div>
                        <Link
                            href="/"
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
                        >
                            ← 홈으로
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 평가 기준 선택 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
                    <div className="flex justify-between items-end mb-4">
                        <h2 className="text-2xl font-bold text-white">📊 평가 기준 선택 (v2.0)</h2>
                        <button
                            onClick={() => setSelectedCriteria({
                                HEXA_EFFICIENCY: true, COOL_HAT: true, RERANGE: true, UTILITY: true, TOP_2000: true, LEVEL_280: true
                            })}
                            className="text-xs text-gray-400 hover:text-white underline"
                        >
                            🔄 초기화
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                        {criteriaList.map((item) => (
                            <button
                                key={item.key}
                                onClick={() => toggleCriteria(item.key)}
                                className={`rounded-lg p-3 text-left transition relative border flex flex-col justify-between ${selectedCriteria[item.key]
                                    ? 'bg-white/10 border-white/30'
                                    : 'bg-black/20 border-transparent opacity-50 hover:opacity-75'
                                    }`}
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <div className={`${item.color} font-bold text-sm sm:text-base`}>{item.name}</div>
                                        {selectedCriteria[item.key] && <CheckCircle className="w-4 h-4 text-white/50" />}
                                    </div>
                                    <p className="text-gray-300 text-[11px] sm:text-xs mb-2 leading-tight min-h-[2.5rem] sm:min-h-[2rem] flex items-center">
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="text-xs text-right font-mono text-gray-400 mt-1">
                                    {(currentWeights[item.key] * 100).toFixed(0)}% 반영
                                </div>
                            </button>
                        ))}
                    </div>
                    {(Object.keys(selectedCriteria).length === 0 || Object.values(selectedCriteria).every(v => !v)) ? (
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
                            <p className="text-red-400 text-xs sm:text-sm font-medium">※ 모든 기준이 해제되어 기본 가중치로 계산됩니다.</p>
                        </div>
                    ) : (
                        <div className="mt-3 p-3 bg-blue-600/20 border border-blue-500/30 rounded-xl text-center shadow-lg shadow-blue-500/5 backdrop-blur-sm">
                            <p className="text-blue-100 text-xs sm:text-sm font-medium leading-relaxed">
                                👆 위 버튼을 클릭하여 <span className="text-yellow-400 font-bold border-b border-yellow-400/50">원하는 기준을 켜거나 끌 수 있습니다</span>
                                <span className="text-blue-300/80 ml-1.5 block sm:inline mt-0.5 sm:mt-0">
                                    (선택되어 <span className="text-white font-bold">색칠된 항목</span>만 순위에 반영)
                                </span>
                            </p>
                        </div>
                    )}
                </div>

                {/* 헥사 조각 필터 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-4">🧩 헥사 조각 단계 선택</h2>
                    <div className="flex flex-wrap gap-2">
                        {fragmentLevels.map((level) => (
                            <button
                                key={level.value}
                                onClick={() => setFragmentLevel(level.value)}
                                className={`px-4 py-2 rounded-lg font-medium transition ${fragmentLevel === level.value
                                    ? 'bg-yellow-500 text-black'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                {level.label}
                            </button>
                        ))}
                    </div>
                    <p className="text-gray-400 text-sm mt-3">
                        💡 헥사 조각 단계를 변경하면 순위가 달라질 수 있습니다.
                    </p>
                </div>

                {/* 순위 모드 선택 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-4">📈 순위 모드 선택</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <button
                            onClick={() => handleRankingModeChange('ai')}
                            className={`p-3 sm:p-4 rounded-lg font-medium transition ${rankingMode === 'ai'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                                : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            <div className="font-bold text-base sm:text-lg mb-0.5 sm:mb-1">🤖 AI 순위</div>
                            <div className="text-[11px] sm:text-xs opacity-80">선택된 기준 기반</div>
                        </button>
                        <button
                            onClick={() => handleRankingModeChange('youtuber')}
                            className={`p-3 sm:p-4 rounded-lg font-medium transition ${rankingMode === 'youtuber'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                                : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            <div className="font-bold text-base sm:text-lg mb-0.5 sm:mb-1">🎬 유튜버 혼합</div>
                            <div className="text-[11px] sm:text-xs opacity-80">AI 50% + 유튜버 50%</div>
                        </button>
                        <button
                            onClick={() => handleRankingModeChange('general')}
                            className={`p-3 sm:p-4 rounded-lg font-medium transition ${rankingMode === 'general'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                                : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            <div className="font-bold text-base sm:text-lg mb-0.5 sm:mb-1">👥 일반인 혼합</div>
                            <div className="text-[11px] sm:text-xs opacity-80">AI 50% + 일반인 50%</div>
                        </button>
                        <button
                            onClick={() => handleRankingModeChange('ceiling')}
                            className={`p-3 sm:p-4 rounded-lg font-medium transition ${rankingMode === 'ceiling'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                                : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            <div className="font-bold text-base sm:text-lg mb-0.5 sm:mb-1">🔥 고점 체급</div>
                            <div className="text-[11px] sm:text-xs opacity-80">AI 50% + 고점 50%</div>
                        </button>
                    </div>
                    {rankingMode !== 'ai' ? (
                        <div className="mt-4 p-4 bg-black/30 rounded-lg">
                            <p className="text-yellow-400 font-medium whitespace-pre-line">
                                {rankingMode === 'youtuber' && HYBRID_MODE_DESCRIPTION.youtuber.detail}
                                {rankingMode === 'general' && HYBRID_MODE_DESCRIPTION.general.detail}
                                {rankingMode === 'ceiling' && HYBRID_MODE_DESCRIPTION.ceiling.detail}
                            </p>
                        </div>
                    ) : (
                        <div className="mt-4 p-4 bg-red-900/30 border border-red-500/30 rounded-lg flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-red-400 font-bold mb-1">⚠️ AI 순위 확인 시 주의사항</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    현재 모드는 <strong>선택하신 기준에 따른 데이터 기반</strong> 점수입니다.<br />
                                    실제 인게임 성능 체감과는 차이가 있을 수 있으므로, 체급이 보정된 <span className="text-yellow-400 font-bold">유튜버 / 일반인 / 고점 체급 혼합 모드</span> 확인을 권장합니다.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* 검색바 */}
                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="직업 이름 검색 (예: 히어로, 비숍)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                </div>

                {/* 전체 순위 */}
                <div className="space-y-3">
                    {(rankingMode === 'ai' ? aiRankings : hybridRankings)
                        .filter((job) => job.job.includes(searchQuery))
                        .map((job: JobScore | HybridJobScore) => (
                            <div
                                key={job.job}
                                onClick={() => setSelectedJob(selectedJob?.job === job.job ? null : job)}
                                className={`bg-gradient-to-r ${getTierColor(job.rank)} p-[2px] rounded-xl cursor-pointer transform transition hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]`}
                            >
                                <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl p-3 sm:p-5 lg:p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                                            <div className="text-xl sm:text-4xl min-w-[1.5rem] sm:min-w-[3rem] text-center flex-shrink-0">{getTierBadge(job.rank)}</div>
                                            <div className="relative w-9 h-9 sm:w-14 sm:h-14 flex-shrink-0">
                                                <Image
                                                    src={`/images/jobs/${job.job === '듀얼블레이드' ? '듀얼블레이더' : job.job === '캐논슈터' || job.job === '캐논마스터' ? '캐논마스터' : job.job}.png`}
                                                    alt={job.job}
                                                    fill
                                                    className="object-contain rounded-lg"
                                                    sizes="(max-width: 640px) 36px, 56px"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap">
                                                    <span className="text-base sm:text-2xl font-black text-white whitespace-nowrap">
                                                        {job.rank}위
                                                    </span>
                                                    <span className="text-sm sm:text-xl font-bold text-white truncate">
                                                        {job.job}
                                                    </span>
                                                </div>
                                                <div className="text-[10px] sm:text-sm text-gray-400 mt-0.5 sm:mt-1 truncate">
                                                    클릭하여 상세 정보
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0 pl-2">
                                            <div className="text-xl sm:text-3xl font-black text-white leading-none mb-1">
                                                {job.totalScore.toFixed(1)}
                                            </div>
                                            <div className="text-[10px] sm:text-sm text-gray-400">총점</div>
                                        </div>
                                    </div>

                                    {/* 점수 바 - AI 모드 */}
                                    {'hexaScore' in job && (
                                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 gap-y-3 sm:gap-y-5 mb-3">
                                            <div>
                                                <div className={`text-[11px] sm:text-xs text-gray-400 mb-1 ${!selectedCriteria.HEXA_EFFICIENCY && 'opacity-30'}`}>헥사</div>
                                                <div className="bg-gray-800 rounded-full h-2">
                                                    <div
                                                        className={`bg-yellow-400 rounded-full h-2 transition-all ${!selectedCriteria.HEXA_EFFICIENCY && 'grayscale opacity-30'}`}
                                                        style={{ width: `${job.hexaScore}%` }}
                                                    />
                                                </div>
                                                <div className={`text-xs font-bold text-white mt-1 ${!selectedCriteria.HEXA_EFFICIENCY && 'opacity-30'}`}>{job.hexaScore.toFixed(0)}</div>
                                            </div>
                                            <div>
                                                <div className={`text-[11px] sm:text-xs text-gray-400 mb-1 ${!selectedCriteria.COOL_HAT && 'opacity-30'}`}>쿨뚝</div>
                                                <div className="bg-gray-800 rounded-full h-2">
                                                    <div
                                                        className={`bg-green-400 rounded-full h-2 transition-all ${!selectedCriteria.COOL_HAT && 'grayscale opacity-30'}`}
                                                        style={{ width: `${job.coolHatScore}%` }}
                                                    />
                                                </div>
                                                <div className={`text-xs font-bold text-white mt-1 ${!selectedCriteria.COOL_HAT && 'opacity-30'}`}>{job.coolHatScore.toFixed(0)}</div>
                                            </div>
                                            <div>
                                                <div className={`text-[11px] sm:text-xs text-gray-400 mb-1 ${!selectedCriteria.RERANGE && 'opacity-30'}`}>리레링</div>
                                                <div className="bg-gray-800 rounded-full h-2">
                                                    <div
                                                        className={`bg-red-400 rounded-full h-2 transition-all ${!selectedCriteria.RERANGE && 'grayscale opacity-30'}`}
                                                        style={{ width: `${job.rerangeScore}%` }}
                                                    />
                                                </div>
                                                <div className={`text-xs font-bold text-white mt-1 ${!selectedCriteria.RERANGE && 'opacity-30'}`}>{job.rerangeScore.toFixed(0)}</div>
                                            </div>
                                            <div>
                                                <div className={`text-[11px] sm:text-xs text-gray-400 mb-1 ${!selectedCriteria.UTILITY && 'opacity-30'}`}>유틸</div>
                                                <div className="bg-gray-800 rounded-full h-2">
                                                    <div
                                                        className={`bg-blue-400 rounded-full h-2 transition-all ${!selectedCriteria.UTILITY && 'grayscale opacity-30'}`}
                                                        style={{ width: `${job.utilityScore}%` }}
                                                    />
                                                </div>
                                                <div className={`text-xs font-bold text-white mt-1 ${!selectedCriteria.UTILITY && 'opacity-30'}`}>{job.utilityScore.toFixed(0)}</div>
                                            </div>
                                            <div>
                                                <div className={`text-[11px] sm:text-xs text-gray-400 mb-1 ${!selectedCriteria.TOP_2000 && 'opacity-30'}`}>환산</div>
                                                <div className="bg-gray-800 rounded-full h-2">
                                                    <div
                                                        className={`bg-purple-400 rounded-full h-2 transition-all ${!selectedCriteria.TOP_2000 && 'grayscale opacity-30'}`}
                                                        style={{ width: `${job.top2000Score}%` }}
                                                    />
                                                </div>
                                                <div className={`text-xs font-bold text-white mt-1 ${!selectedCriteria.TOP_2000 && 'opacity-30'}`}>{job.top2000Score.toFixed(0)}</div>
                                            </div>
                                            <div>
                                                <div className={`text-[11px] sm:text-xs text-gray-400 mb-1 ${!selectedCriteria.LEVEL_280 && 'opacity-30'}`}>280+</div>
                                                <div className="bg-gray-800 rounded-full h-2">
                                                    <div
                                                        className={`bg-cyan-400 rounded-full h-2 transition-all ${!selectedCriteria.LEVEL_280 && 'grayscale opacity-30'}`}
                                                        style={{ width: `${job.level280Score}%` }}
                                                    />
                                                </div>
                                                <div className={`text-xs font-bold text-white mt-1 ${!selectedCriteria.LEVEL_280 && 'opacity-30'}`}>{job.level280Score.toFixed(0)}</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* 점수 바 - 하이브리드 모드 */}
                                    {'aiScore' in job && (
                                        <div className="grid grid-cols-2 gap-4 mb-3">
                                            <div>
                                                <div className="text-xs text-gray-400 mb-1">🤖 AI 평가 (맞춤 설정)</div>
                                                <div className="bg-gray-800 rounded-full h-3">
                                                    <div
                                                        className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-full h-3 transition-all"
                                                        style={{ width: `${job.aiScore}%` }}
                                                    />
                                                </div>
                                                <div className="text-sm text-white mt-1 font-medium">{job.aiScore.toFixed(1)}점</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-400 mb-1">
                                                    {rankingMode === 'youtuber' && '🎬 유튜버 평가'}
                                                    {rankingMode === 'general' && '👥 일반인 평가'}
                                                    {rankingMode === 'ceiling' && '🔥 고점 체급'}
                                                </div>
                                                <div className="bg-gray-800 rounded-full h-3">
                                                    <div
                                                        className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full h-3 transition-all"
                                                        style={{ width: `${job.externalScore}%` }}
                                                    />
                                                </div>
                                                <div className="text-sm text-white mt-1 font-medium">{job.externalScore.toFixed(1)}점</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* 상세 정보 (펼침) */}
                                    {selectedJob?.job === job.job && (
                                        <div className="mt-4 pt-4 border-t border-white/10 space-y-3 animate-fadeIn">
                                            {/* AI 모드 - 세부 항목 */}
                                            {'hexaReason' in job && (
                                                <>
                                                    {selectedCriteria.HEXA_EFFICIENCY && (
                                                        <div className="bg-black/30 rounded-lg p-4">
                                                            <h3 className="text-lg font-bold text-yellow-400 mb-2">📈 헥사 효율</h3>
                                                            <p className="text-gray-300 text-sm whitespace-pre-line">{job.hexaReason}</p>
                                                        </div>
                                                    )}
                                                    {selectedCriteria.COOL_HAT && (
                                                        <div className="bg-black/30 rounded-lg p-4">
                                                            <h3 className="text-lg font-bold text-green-400 mb-2">🎩 쿨타임 감소 모자</h3>
                                                            <p className="text-gray-300 text-sm whitespace-pre-line">{job.coolHatReason}</p>
                                                        </div>
                                                    )}
                                                    {selectedCriteria.RERANGE && (
                                                        <div className="bg-black/30 rounded-lg p-4">
                                                            <h3 className="text-lg font-bold text-red-400 mb-2">⚔️ 리레링(극딜) 여부</h3>
                                                            <p className="text-gray-300 text-sm whitespace-pre-line">{job.rerangeReason}</p>
                                                        </div>
                                                    )}
                                                    {selectedCriteria.UTILITY && (
                                                        <div className="bg-black/30 rounded-lg p-4">
                                                            <h3 className="text-lg font-bold text-blue-400 mb-2">🛡️ 유틸리티</h3>
                                                            <p className="text-gray-300 text-sm whitespace-pre-line">{job.utilityReason}</p>
                                                        </div>
                                                    )}
                                                    {selectedCriteria.TOP_2000 && (
                                                        <div className="bg-black/30 rounded-lg p-4">
                                                            <h3 className="text-lg font-bold text-purple-400 mb-2">👥 환산 TOP 2000 직업 분포도</h3>
                                                            <p className="text-gray-300 text-sm whitespace-pre-line">{job.top2000Reason}</p>
                                                        </div>
                                                    )}
                                                    {selectedCriteria.LEVEL_280 && (
                                                        <div className="bg-black/30 rounded-lg p-4">
                                                            <h3 className="text-lg font-bold text-cyan-400 mb-2">🏃 Lv280+ 직업 점유율</h3>
                                                            <p className="text-gray-300 text-sm whitespace-pre-line">{job.level280Reason}</p>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                            {/* 하이브리드 모드 - AI + 외부 평가 */}
                                            {'aiReason' in job && (
                                                <>
                                                    <div className="bg-black/30 rounded-lg p-4">
                                                        <h3 className="text-lg font-bold text-purple-400 mb-2">🤖 AI 종합 평가</h3>
                                                        <p className="text-gray-300 text-sm whitespace-pre-line">{job.aiReason}</p>
                                                    </div>
                                                    <div className="bg-black/30 rounded-lg p-4">
                                                        <h3 className="text-lg font-bold text-orange-400 mb-2">
                                                            {rankingMode === 'youtuber' && '🎬 유튜버 평가'}
                                                            {rankingMode === 'general' && '👥 일반인 평가'}
                                                            {rankingMode === 'ceiling' && '🔥 고점 체급 평가'}
                                                        </h3>
                                                        <p className="text-gray-300 text-sm whitespace-pre-line">{job.externalReason}</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>

                {/* 데이터 출처 및 참고자료 Footer */}
                <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    {/* 리레링 순위 데이터 테이블 (토글) */}


                    <p className="mb-2">본 랭킹은 2025년 12월 기준 데이터와 유저 피드백을 기반으로 작성되었습니다.</p>
                    <p>※ 본 순위는 헥사 효율, 쿨뚝 필요성, 리레링, 유틸리티, 환산 TOP 2000 인기도, Lv280+ 레벨링 인기도를 종합한 객관적 지표입니다.</p>
                    <p className="mt-2">개인의 플레이 스타일과 선호도에 따라 다를 수 있습니다.</p>
                    <p className="mt-3 text-purple-400">📊 직업 분포 데이터 출처: 환산 주스텟 사이트 (2025-12-12)</p>

                    <div className="mt-6 border-t border-white/10 pt-4 flex flex-col gap-2 text-xs text-gray-500">
                        <div className="font-bold text-gray-400 mb-1">📑 데이터 출처 및 참고자료</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-left mx-auto max-w-4xl">
                            <a href="https://www.inven.co.kr/board/maple/5974/5954861?my=chu&name=subjcont&keyword=%EC%B2%B4%EA%B8%89&sterm=4136194" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors flex items-center gap-2">
                                <span>🔥</span> 고점 체급 (인벤)
                            </a>
                            <a href="https://www.inven.co.kr/board/maple/5974/5955516?my=chu&name=subjcont&keyword=%EC%B2%B4%EA%B8%89&sterm=4136194" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors flex items-center gap-2">
                                <span>👥</span> 일반인 체급 (인벤)
                            </a>
                            <a href="https://www.inven.co.kr/board/maple/2304/46416?my=chu" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors flex items-center gap-2">
                                <span>💎</span> 헥사 강화 효율 (인벤)
                            </a>
                            <a href="https://maple.ai.kr/guide/cooltime-hat-guide" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors flex items-center gap-2">
                                <span>🎩</span> 쿨타임 모자 채택률
                            </a>
                            <a href="https://maple.ai.kr/guide/seed-ring-guide" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors flex items-center gap-2">
                                <span>💍</span> 시드링(리레링) 채택률
                            </a>
                            <a href="https://www.youtube.com/watch?v=Rjh51fZCPJM&t=987s" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors flex items-center gap-2">
                                <span>📺</span> 유튜브 자료 참고
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
