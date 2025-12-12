'use client';

import { useState, useEffect } from 'react';
import { calculateAllJobRankings, JobScore, HexaFragmentLevel } from '@/data/job-recommendation/job-ranking-system';
import { calculateHybridRankings, HybridJobScore, HybridMode, HYBRID_MODE_DESCRIPTION } from '@/data/job-recommendation/hybrid-ranking-system';
import Link from 'next/link';

type RankingMode = 'ai' | 'youtuber' | 'general' | 'ceiling';

export default function JobRankingPage() {
    const [aiRankings, setAiRankings] = useState<JobScore[]>([]);
    const [hybridRankings, setHybridRankings] = useState<HybridJobScore[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState<JobScore | HybridJobScore | null>(null);
    const [fragmentLevel, setFragmentLevel] = useState<HexaFragmentLevel>('average');
    const [rankingMode, setRankingMode] = useState<RankingMode>('ai');

    useEffect(() => {
        setLoading(true);
        try {
            const aiResult = calculateAllJobRankings(fragmentLevel);
            setAiRankings(aiResult);

            // 하이브리드 모드인 경우 혼합 순위 계산
            if (rankingMode !== 'ai') {
                const hybridMode = rankingMode as HybridMode;
                const hybridResult = calculateHybridRankings(hybridMode, fragmentLevel);

                // 중복 데이터 방지: 직업명 기준으로 중복 제거
                const uniqueResult = Array.from(new Map(hybridResult.map(item => [item.job, item])).values());

                // 순위 재할당 (안전장치)
                uniqueResult.sort((a, b) => b.totalScore - a.totalScore);
                uniqueResult.forEach((item, index) => {
                    item.rank = index + 1;
                });

                setHybridRankings(uniqueResult);
            }
        } catch (error) {
            console.error('순위 계산 오류:', error);
        } finally {
            setLoading(false);
        }
    }, [fragmentLevel, rankingMode]);

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
            {/* 헤더 */}
            <div className="bg-black/30 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
                                🎮 2025 하이퍼버닝 직업 추천 순위 v2.0
                            </h1>
                            <p className="text-gray-300 text-sm sm:text-base">
                                헥사(40%) + 쿨뚝(15%) + 리레링(5%) + 유틸(5%) + 환산(20%) + Lv280+(15%)
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
                {/* 평가 기준 */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-4">📊 평가 기준 (v2.0 - 직업 분포 반영)</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        <div className="bg-white/5 rounded-lg p-3">
                            <div className="text-yellow-400 font-bold text-base mb-1">1️⃣ 헥사 (40%)</div>
                            <p className="text-gray-300 text-xs">조각 대비 보정치</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                            <div className="text-green-400 font-bold text-base mb-1">2️⃣ 쿨뚝 (15%)</div>
                            <p className="text-gray-300 text-xs">큐브 비용 절감</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                            <div className="text-red-400 font-bold text-base mb-1">3️⃣ 리레링 (5%)</div>
                            <p className="text-gray-300 text-xs">극딜 티어</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                            <div className="text-blue-400 font-bold text-base mb-1">4️⃣ 유틸 (5%)</div>
                            <p className="text-gray-300 text-xs">편의성 기능</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                            <div className="text-purple-400 font-bold text-base mb-1">5️⃣ 환산 (20%)</div>
                            <p className="text-gray-300 text-xs">커뮤니티 & 정보</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                            <div className="text-cyan-400 font-bold text-base mb-1">6️⃣ Lv280+ (15%)</div>
                            <p className="text-gray-300 text-xs">직업 점유율</p>
                        </div>
                    </div>
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
                            onClick={() => setRankingMode('ai')}
                            className={`p-4 rounded-lg font-medium transition ${rankingMode === 'ai'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            <div className="font-bold text-lg mb-1">🤖 AI 순위</div>
                            <div className="text-xs opacity-80">순수 데이터 기반</div>
                        </button>
                        <button
                            onClick={() => setRankingMode('youtuber')}
                            className={`p-4 rounded-lg font-medium transition ${rankingMode === 'youtuber'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            <div className="font-bold text-lg mb-1">🎬 유튜버 혼합</div>
                            <div className="text-xs opacity-80">AI 50% + 유튜버 50%</div>
                        </button>
                        <button
                            onClick={() => setRankingMode('general')}
                            className={`p-4 rounded-lg font-medium transition ${rankingMode === 'general'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            <div className="font-bold text-lg mb-1">👥 일반인 혼합</div>
                            <div className="text-xs opacity-80">AI 50% + 일반인 50%</div>
                        </button>
                        <button
                            onClick={() => setRankingMode('ceiling')}
                            className={`p-4 rounded-lg font-medium transition ${rankingMode === 'ceiling'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            <div className="font-bold text-lg mb-1">🔥 고점 체급 혼합</div>
                            <div className="text-xs opacity-80">AI 50% + 고점 50%</div>
                        </button>
                    </div>
                    {rankingMode !== 'ai' && (
                        <div className="mt-4 p-4 bg-black/30 rounded-lg">
                            <p className="text-yellow-400 font-medium">
                                {rankingMode === 'youtuber' && HYBRID_MODE_DESCRIPTION.youtuber.detail}
                                {rankingMode === 'general' && HYBRID_MODE_DESCRIPTION.general.detail}
                                {rankingMode === 'ceiling' && HYBRID_MODE_DESCRIPTION.ceiling.detail}
                            </p>
                        </div>
                    )}
                </div>

                {/* 전체 순위 */}
                <div className="space-y-3">
                    {(rankingMode === 'ai' ? aiRankings : hybridRankings).map((job: JobScore | HybridJobScore) => (
                        <div
                            key={job.job}
                            onClick={() => setSelectedJob(selectedJob?.job === job.job ? null : job)}
                            className={`bg-gradient-to-r ${getTierColor(job.rank)} p-[2px] rounded-xl cursor-pointer transform transition hover:scale-[1.02] hover:shadow-2xl`}
                        >
                            <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-4">
                                        <div className="text-4xl">{getTierBadge(job.rank)}</div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl font-black text-white">
                                                    {job.rank}위
                                                </span>
                                                <span className="text-xl font-bold text-white">
                                                    {job.job}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-400 mt-1">
                                                클릭하여 상세 정보 보기
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-black text-white">
                                            {job.totalScore.toFixed(1)}
                                        </div>
                                        <div className="text-sm text-gray-400">총점</div>
                                    </div>
                                </div>

                                {/* 점수 바 - AI 모드 */}
                                {'hexaScore' in job && (
                                    <div className="grid grid-cols-6 gap-2 mb-3">
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">헥사</div>
                                            <div className="bg-gray-800 rounded-full h-2">
                                                <div
                                                    className="bg-yellow-400 rounded-full h-2 transition-all"
                                                    style={{ width: `${job.hexaScore}%` }}
                                                />
                                            </div>
                                            <div className="text-xs text-white mt-1">{job.hexaScore.toFixed(0)}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">쿨뚝</div>
                                            <div className="bg-gray-800 rounded-full h-2">
                                                <div
                                                    className="bg-green-400 rounded-full h-2 transition-all"
                                                    style={{ width: `${job.coolHatScore}%` }}
                                                />
                                            </div>
                                            <div className="text-xs text-white mt-1">{job.coolHatScore.toFixed(0)}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">리레링</div>
                                            <div className="bg-gray-800 rounded-full h-2">
                                                <div
                                                    className="bg-red-400 rounded-full h-2 transition-all"
                                                    style={{ width: `${job.rerangeScore}%` }}
                                                />
                                            </div>
                                            <div className="text-xs text-white mt-1">{job.rerangeScore.toFixed(0)}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">유틸</div>
                                            <div className="bg-gray-800 rounded-full h-2">
                                                <div
                                                    className="bg-blue-400 rounded-full h-2 transition-all"
                                                    style={{ width: `${job.utilityScore}%` }}
                                                />
                                            </div>
                                            <div className="text-xs text-white mt-1">{job.utilityScore.toFixed(0)}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">환산</div>
                                            <div className="bg-gray-800 rounded-full h-2">
                                                <div
                                                    className="bg-purple-400 rounded-full h-2 transition-all"
                                                    style={{ width: `${job.top2000Score}%` }}
                                                />
                                            </div>
                                            <div className="text-xs text-white mt-1">{job.top2000Score.toFixed(0)}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">280+</div>
                                            <div className="bg-gray-800 rounded-full h-2">
                                                <div
                                                    className="bg-cyan-400 rounded-full h-2 transition-all"
                                                    style={{ width: `${job.level280Score}%` }}
                                                />
                                            </div>
                                            <div className="text-xs text-white mt-1">{job.level280Score.toFixed(0)}</div>
                                        </div>
                                    </div>
                                )}

                                {/* 점수 바 - 하이브리드 모드 */}
                                {'aiScore' in job && (
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">🤖 AI 평가</div>
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
                                                <div className="bg-black/30 rounded-lg p-4">
                                                    <h3 className="text-lg font-bold text-yellow-400 mb-2">📈 헥사 효율</h3>
                                                    <p className="text-gray-300 text-sm whitespace-pre-line">{job.hexaReason}</p>
                                                </div>
                                                <div className="bg-black/30 rounded-lg p-4">
                                                    <h3 className="text-lg font-bold text-green-400 mb-2">🎩 쿨타임 감소 모자</h3>
                                                    <p className="text-gray-300 text-sm whitespace-pre-line">{job.coolHatReason}</p>
                                                </div>
                                                <div className="bg-black/30 rounded-lg p-4">
                                                    <h3 className="text-lg font-bold text-red-400 mb-2">⚔️ 리레링(극딜) 여부</h3>
                                                    <p className="text-gray-300 text-sm whitespace-pre-line">{job.rerangeReason}</p>
                                                </div>
                                                <div className="bg-black/30 rounded-lg p-4">
                                                    <h3 className="text-lg font-bold text-blue-400 mb-2">🛡️ 유틸리티</h3>
                                                    <p className="text-gray-300 text-sm whitespace-pre-line">{job.utilityReason}</p>
                                                </div>
                                                <div className="bg-black/30 rounded-lg p-4">
                                                    <h3 className="text-lg font-bold text-purple-400 mb-2">👥 환산 TOP 2000 직업 분포도</h3>
                                                    <p className="text-gray-300 text-sm whitespace-pre-line">{job.top2000Reason}</p>
                                                </div>
                                                <div className="bg-black/30 rounded-lg p-4">
                                                    <h3 className="text-lg font-bold text-cyan-400 mb-2">🏃 Lv280+ 직업 점유율</h3>
                                                    <p className="text-gray-300 text-sm whitespace-pre-line">{job.level280Reason}</p>
                                                </div>
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

                {/* 푸터 */}
                <div className="mt-12 text-center text-gray-400 text-sm pb-8">
                    <p>※ 본 순위는 헥사 효율, 쿨뚝 필요성, 리레링, 유틸리티, 환산 TOP 2000 인기도, Lv280+ 레벨링 인기도를 종합한 객관적 지표입니다.</p>
                    <p className="mt-2">개인의 플레이 스타일과 선호도에 따라 다를 수 있습니다.</p>
                    <p className="mt-3 text-purple-400">📊 직업 분포 데이터 출처: 메이플스카우터 (2025-12-12)</p>
                </div>
            </div>
        </div>
    );
}
