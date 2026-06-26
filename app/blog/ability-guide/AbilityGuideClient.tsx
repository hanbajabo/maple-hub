'use client';

import Link from 'next/link';
import { ArrowLeft, Target, TrendingUp, Search, Sparkles, Table, LayoutGrid } from 'lucide-react';
import React, { useState } from 'react';

const ABILITY_DATA = [
    { job: '히어로', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '공격력 증가'] },
    { job: '팔라딘', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '공격력 증가'] },
    { job: '다크나이트', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '스킬 사용 시 확률로 재사용 대기시간이 미적용'] },
    { job: '아크메이지(불,독)', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '버프 스킬 지속 시간 증가'] },
    { job: '아크메이지(썬,콜)', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '마력 증가'] },
    { job: '비숍', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '버프 스킬 지속 시간 증가'] },
    { job: '보우마스터', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '크리티컬 확률 증가'] },
    { job: '신궁', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '크리티컬 확률 증가'] },
    { job: '패스파인더', abilities: ['스킬 사용 시 확률로 재사용 대기시간이 미적용', '크리티컬 확률 증가', '보스 몬스터 공격 시 데미지 증가'] },
    { job: '나이트로드', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '공격력 증가'] },
    { job: '섀도어', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '공격력 증가'] },
    { job: '듀얼블레이더', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '공격력 증가'] },
    { job: '바이퍼', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '공격력 증가'] },
    { job: '캡틴', abilities: ['스킬 사용 시 확률로 재사용 대기시간이 미적용', '상태 이상에 걸린 대상 공격 시 데미지 증가', '보스 몬스터 공격 시 데미지 증가'] },
    { job: '캐논마스터', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '공격력 증가'] },
    { job: '미하일', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '버프 스킬 지속 시간 증가'] },
    { job: '소울마스터', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '버프 스킬 지속 시간 증가'] },
    { job: '플레임위자드', abilities: ['패시브 스킬 레벨이 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '보스 몬스터 공격 시 데미지 증가'] },
    { job: '윈드브레이커', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '크리티컬 확률 증가'] },
    { job: '나이트워커', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '공격력 증가'] },
    { job: '스트라이커', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '공격력 증가'], note: '고스펙에선 첫 줄 패시브가 사용됨 : 패시브 레벨 1 / 보공 10% / 상추뎀 8% 사용' },
    { job: '아란', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '공격력 증가'] },
    { job: '에반', abilities: ['보스 몬스터 공격 시 데미지 증가', '스킬 사용 시 확률로 재사용 대기시간이 미적용', '상태 이상에 걸린 대상 공격 시 데미지 증가'] },
    { job: '루미너스', abilities: ['스킬 사용 시 확률로 재사용 대기시간이 미적용', '보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가'] },
    { job: '메르세데스', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '크리티컬 확률 증가'] },
    { job: '팬텀', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '스킬 사용 시 확률로 재사용 대기시간이 미적용'] },
    { job: '은월', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '공격력 증가'] },
    { job: '블래스터', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '공격력 증가'] },
    { job: '배틀메이지', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '마력 증가'] },
    { job: '와일드헌터', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '크리티컬 확률 증가'] },
    { job: '메카닉', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '버프 스킬 지속 시간 증가'] },
    { job: '제논', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '버프 스킬 지속 시간 증가'] },
    { job: '데몬슬레이어', abilities: ['보스 몬스터 공격 시 데미지 증가', '스킬 사용 시 확률로 재사용 대기시간이 미적용', '상태 이상에 걸린 대상 공격 시 데미지 증가'], note: '본섭기준으로 오리진 극딜 엔버 스킬 때문에 보.상.벞도 많이 쓴다고 합니다!' },
    { job: '데몬어벤져', abilities: ['스킬 사용 시 확률로 재사용 대기시간이 미적용', '상태 이상에 걸린 대상 공격 시 데미지 증가', '보스 몬스터 공격 시 데미지 증가'] },
    { job: '카이저', abilities: ['스킬 사용 시 확률로 재사용 대기시간이 미적용', '버프 스킬 지속 시간 증가', '보스 몬스터 공격 시 데미지 증가'] },
    { job: '카인', abilities: ['보스 몬스터 공격 시 데미지 증가', '크리티컬 확률 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가'], note: '보크상이 메인인데 재보크도 쓰는 사람이 있음' },
    { job: '카데나', abilities: ['스킬 사용 시 확률로 재사용 대기시간이 미적용', '상태 이상에 걸린 대상 공격 시 데미지 증가', '보스 몬스터 공격 시 데미지 증가'] },
    { job: '엔젤릭버스터', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '버프 스킬 지속 시간 증가'] },
    { job: '아델', abilities: ['보스 몬스터 공격 시 데미지 증가', '스킬 사용 시 확률로 재사용 대기시간이 미적용', '상태 이상에 걸린 대상 공격 시 데미지 증가'] },
    { job: '일리움', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '스킬 사용 시 확률로 재사용 대기시간이 미적용'] },
    { job: '아크', abilities: ['스킬 사용 시 확률로 재사용 대기시간이 미적용', '상태 이상에 걸린 대상 공격 시 데미지 증가', '보스 몬스터 공격 시 데미지 증가'] },
    { job: '칼리', abilities: ['스킬 사용 시 확률로 재사용 대기시간이 미적용', '상태 이상에 걸린 대상 공격 시 데미지 증가', '보스 몬스터 공격 시 데미지 증가'] },
    { job: '호영', abilities: ['패시브 스킬 레벨이 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '보스 몬스터 공격 시 데미지 증가'] },
    { job: '라라', abilities: ['패시브 스킬 레벨이 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '보스 몬스터 공격 시 데미지 증가'] },
    { job: '렌', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '공격력 증가'] },
    { job: '키네시스', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '버프 스킬 지속 시간 증가'], note: '보상벞이 메인인데 챌섭에서는 보상마도 씀 (첫 줄 패시브 채용 시: 패시브 레벨 1 / 상뎀 8% / 벞지 38% 사용)' },
    { job: '제로', abilities: ['보스 몬스터 공격 시 데미지 증가', '상태 이상에 걸린 대상 공격 시 데미지 증가', '공격력 증가'], note: '파티에서 유틸 포지션이라면 재사용 보공 상추뎀도 사용합니다! (프리셋에 따로 저장해둠)' },
    { job: '레테', abilities: ['스킬 사용 시 확률로 재사용 대기시간이 미적용', '상태 이상에 걸린 대상 공격 시 데미지 증가', '보스 몬스터 공격 시 데미지 증가'], note: '이딕트 재사용 최적화를 위해 재사용 대기시간 미적용 최우선' },
];

function formatAbility(abilityName: string, lineIndex: number): string {
    const isLegendary = lineIndex === 0;
    
    switch (abilityName) {
        case '보스 몬스터 공격 시 데미지 증가':
            return isLegendary ? '보스공격력 20%' : '보스공격력 10%';
        case '상태 이상에 걸린 대상 공격 시 데미지 증가':
            return isLegendary ? '상추뎀 10%' : '상추뎀 8%';
        case '공격력 증가':
            return isLegendary ? '공격력 증가 30' : '공격력 증가 21';
        case '마력 증가':
            return isLegendary ? '마력 증가 30' : '마력 증가 21';
        case '버프 스킬 지속 시간 증가':
            return isLegendary ? '버프 지속 50%' : '버프 지속 38%';
        case '스킬 사용 시 확률로 재사용 대기시간이 미적용':
            return isLegendary ? '재사용미적용 20%' : '재사용미적용 10%';
        case '패시브 스킬 레벨이 증가':
            return '패시브 스킬 + 1';
        case '크리티컬 확률 증가':
            return isLegendary ? '크리티컬확률 30%' : '크리티컬확률 20%';
        case '일반 몬스터 공격 시 데미지 증가':
            return isLegendary ? '일반몹데미지 10%' : '일반몹데미지 8%';
        case '아이템 드롭률 증가':
            return isLegendary ? '아이템드롭률 20%' : '아이템드롭률 15%';
        case '메소 획득량 증가':
            return isLegendary ? '메소획득량 20%' : '메소획득량 15%';
        case '다수 공격 스킬 공격 대상 증가':
            return '타겟수 +1';
        default:
            return abilityName;
    }
}

export default function AbilityGuideClient() {
    const [selectedJob, setSelectedJob] = useState('');
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

    const filteredData = selectedJob
        ? ABILITY_DATA.filter(data => data.job === selectedJob)
        : ABILITY_DATA;

    // 가나다 순 정렬
    const sortedData = [...filteredData].sort((a, b) => a.job.localeCompare(b.job, 'ko'));
    const jobList = ABILITY_DATA.map(d => d.job).sort((a, b) => a.localeCompare(b, 'ko'));

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link href="/guide" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">가이드 목록으로</span>
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">직업별 어빌리티 추천 가이드 (최종수정 : 260626)</h1>
                    <p className="text-slate-400 mt-2">전직업 보스용 최적 어빌리티 완벽 정리</p>
                </div>
            </div>

            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-4 mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                    <img src="/images/maple-ai-logo.jpg" alt="단풍이" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <div className="font-bold text-white">메이플 AI 단풍이</div>
                        <div className="text-sm text-slate-400">2026년 6월 기준 직업별 추천 어빌리티 (레테 추가)</div>
                    </div>
                </div>

                <section className="prose prose-invert max-w-none mb-12">
                    <div className="bg-gradient-to-br from-green-900/30 via-teal-900/30 to-blue-900/30 border border-green-500/40 rounded-2xl p-8 mb-8 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10 opacity-50"></div>

                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                            <Target className="w-8 h-8 text-green-400 animate-pulse" />
                            어빌리티란?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6 relative z-10">
                            <div className="space-y-4">
                                <p className="text-slate-300 leading-relaxed">
                                    어빌리티는 <strong className="text-white">명예의 전당 시스템</strong>으로 획득하는 추가 능력치입니다.
                                </p>
                                <p className="text-slate-300 leading-relaxed">
                                    <strong className="text-yellow-400">어빌리티 북</strong>을 사용하여 재설정하며, 레전드리 등급에서 최고 효율의 옵션을 노려야 합니다!
                                </p>

                                <div className="bg-green-950/50 border border-green-500/30 rounded-lg p-4 mt-2">
                                    <h4 className="text-sm font-bold text-green-300 mb-2">💡 핵심 요약</h4>
                                    <ul className="space-y-1 text-sm text-slate-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400 mt-0.5">•</span>
                                            <span><strong className="text-white">레전드리 등급</strong>: 필수 시작점</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400 mt-0.5">•</span>
                                            <span><strong className="text-white">첫 줄</strong>: 보공 20% or 벞지 50%</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400 mt-0.5">•</span>
                                            <span><strong className="text-white">둘째/셋째 줄</strong>: 유니크 옵션 노리기</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                                <img
                                    src="/images/guides/ability-ui.png"
                                    alt="인게임 어빌리티 UI"
                                    className="relative w-full h-auto rounded-lg shadow-2xl border border-green-500/30 hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-lg">
                                    <p className="text-xs text-slate-300 text-center">
                                        ✨ 레전드리 어빌리티 종결 옵션 예시
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-blue-400" />
                            어빌리티 핵심 옵션
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                                <h3 className="text-lg font-bold text-white mb-2">보스 데미지</h3>
                                <p className="text-slate-300 text-sm">보스 공격 시 데미지 <strong className="text-red-400">+20%</strong> (최우선!)</p>
                            </div>
                            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                                <h3 className="text-lg font-bold text-white mb-2">상태이상 데미지</h3>
                                <p className="text-slate-300 text-sm">상태 이상 대상 공격 시 <strong className="text-purple-400">+8%</strong></p>
                            </div>
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                <h3 className="text-lg font-bold text-white mb-2">버프 지속시간</h3>
                                <p className="text-slate-300 text-sm">버프 스킬 지속 시간 <strong className="text-blue-400">+38~50%</strong></p>
                            </div>
                        </div>
                    </div>

                    {/* 검색 및 뷰 모드 토글 */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1 bg-slate-800/30 border border-slate-700 rounded-xl p-3 flex items-center gap-3">
                            <Search className="w-5 h-5 text-slate-400" />
                            <select
                                value={selectedJob}
                                onChange={(e) => setSelectedJob(e.target.value)}
                                className="flex-1 bg-slate-900 text-white border border-slate-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
                            >
                                <option value="">전체 직업 보기</option>
                                {jobList.map(job => (
                                    <option key={job} value={job}>{job}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex border border-slate-700 rounded-xl overflow-hidden p-1 bg-slate-900/50 self-start sm:self-center">
                            <button
                                onClick={() => setViewMode('table')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'table' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
                            >
                                <Table className="w-4 h-4" />
                                한눈에 표로 보기
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                                상세 카드로 보기
                            </button>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-8">
                        추천 어빌리티 목록 {selectedJob && `- ${selectedJob}`} (가나다 순)
                    </h2>

                    {viewMode === 'table' ? (
                        <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm shadow-2xl">
                            <table className="w-full text-left border-collapse min-w-[700px]">
                                <thead>
                                    <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider">
                                        <th className="py-4 px-6 sticky left-0 bg-slate-950/90 min-w-[120px] z-10">직업</th>
                                        <th className="py-4 px-6 text-purple-300">어빌리티 1 (레전더리)</th>
                                        <th className="py-4 px-6 text-blue-300">어빌리티 2 (유니크)</th>
                                        <th className="py-4 px-6 text-slate-300">어빌리티 3 (유니크)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
                                    {sortedData.map((data, idx) => (
                                        <React.Fragment key={idx}>
                                            <tr className="hover:bg-slate-800/20 transition-colors">
                                                <td className="py-3.5 px-6 font-bold text-white flex items-center gap-2.5 sticky left-0 bg-slate-950/80 backdrop-blur-sm z-10">
                                                    <div className="w-6 h-6 rounded overflow-hidden border border-slate-700 bg-slate-800 flex-shrink-0 relative">
                                                        <img
                                                            src={encodeURI(`/images/jobs/${data.job}.png`)}
                                                            alt={data.job}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                const parent = e.currentTarget.parentElement;
                                                                if (parent) {
                                                                    e.currentTarget.style.display = 'none';
                                                                    parent.className = "w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center border border-purple-400/30";
                                                                    parent.innerHTML = `<span class="text-white font-bold text-xs">${data.job[0]}</span>`;
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="truncate">{data.job}</span>
                                                </td>
                                                <td className="py-3.5 px-6 font-medium">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20 mr-2">
                                                        1
                                                    </span>
                                                    {formatAbility(data.abilities[0], 0)}
                                                </td>
                                                <td className="py-3.5 px-6">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 mr-2">
                                                        2
                                                    </span>
                                                    {formatAbility(data.abilities[1], 1)}
                                                </td>
                                                <td className="py-3.5 px-6">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700 mr-2">
                                                        3
                                                    </span>
                                                    {formatAbility(data.abilities[2], 2)}
                                                </td>
                                            </tr>
                                            {data.note && (
                                                <tr className="bg-yellow-500/[0.02] border-t-0">
                                                    <td colSpan={4} className="py-2 px-6 text-xs text-yellow-400/90 bg-slate-950/20">
                                                        <div className="inline-flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 rounded-lg">
                                                            <span className="text-yellow-500 font-semibold">💡 참고사항</span>
                                                            <span className="text-slate-300">{data.note}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {sortedData.map((data, idx) => (
                                <div key={idx} className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-600 bg-slate-800 flex-shrink-0 relative group">
                                            <img
                                                src={encodeURI(`/images/jobs/${data.job}.png`)}
                                                alt={data.job}
                                                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                onError={(e) => {
                                                    const parent = e.currentTarget.parentElement;
                                                    if (parent) {
                                                        e.currentTarget.style.display = 'none';
                                                        parent.className = "w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center border border-purple-400/30";
                                                        parent.innerHTML = `<span class="text-white font-bold text-xl">${data.job[0]}</span>`;
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xl font-bold text-white">{data.job}</h3>
                                            <Sparkles className="w-5 h-5 text-yellow-400" />
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-3">
                                        {data.abilities.map((ability, aIdx) => (
                                            <div key={aIdx} className="flex items-start gap-2">
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold flex-shrink-0 ${aIdx === 0 ? 'bg-purple-500/20 text-purple-300' :
                                                    aIdx === 1 ? 'bg-blue-500/20 text-blue-300' :
                                                        'bg-slate-700 text-slate-300'
                                                    }`}>
                                                    {aIdx + 1}
                                                </span>
                                                <span className="text-sm text-slate-300">{ability}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {data.note && (
                                        <div className="mt-3 pt-3 border-t border-slate-700">
                                            <p className="text-xs text-yellow-400">💡 {data.note}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">내 어빌리티 확인하기</h3>
                    <p className="text-slate-300 mb-6">
                        메이플 AI로 내 캐릭터를 진단하면 현재 어빌리티와 추천 옵션을 비교할 수 있습니다
                    </p>
                    <Link href="/" className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors shadow-lg">
                        지금 진단 받기 →
                    </Link>
                </div>
            </article>
        </div>
    );
}
