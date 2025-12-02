'use client';

import { useState, useMemo } from 'react';
import hexaData from '../../../hexa_job_priority.json';

// 직업 카테고리 매핑
const JOB_CATEGORIES: { [key: string]: string[] } = {
    '전사': ['히어로', '팔라딘', '다크나이트', '아란', '미하일', '카이저', '데몬슬레이어', '데몬어벤져', '제로', '블래스터'],
    '마법사': ['아크메이지(불,독)', '아크메이지(썬,콜)', '비숍', '플레임위자드', '에반', '루미너스', '배틀메이지', '키네시스', '일리움', '라라'],
    '궁수': ['보우마스터', '신궁', '패스파인더', '윈드브레이커', '와일드헌터', '메르세데스'],
    '도적': ['나이트로드', '섀도어', '듀얼블레이더', '나이트워커', '팬텀', '카데나', '칼리', '호영'],
    '해적': ['바이퍼', '캡틴', '캐논마스터', '스트라이커', '은월', '제논', '앤젤릭버스터', '아크'],
};

export default function HexaSkillsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('전체');
    const [minLevel, setMinLevel] = useState(0);

    // 전체 직업 목록
    const allJobs = Object.keys(hexaData);

    // 필터링된 직업 목록
    const filteredJobs = useMemo(() => {
        let jobs = allJobs;

        // 카테고리 필터링
        if (selectedCategory !== '전체') {
            jobs = jobs.filter(job => JOB_CATEGORIES[selectedCategory]?.includes(job));
        }

        //검색 필터링
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            jobs = jobs.filter(job => {
                const jobMatches = job.toLowerCase().includes(query);
                const skills = (hexaData as any)[job];
                const skillMatches = skills.some((skill: any) =>
                    skill.name.toLowerCase().includes(query)
                );
                return jobMatches || skillMatches;
            });
        }

        return jobs;
    }, [allJobs, selectedCategory, searchQuery]);

    // 레벨별 색상
    const getLevelColor = (level: number) => {
        if (level === 60) return 'bg-gradient-to-r from-purple-500 to-pink-500';
        if (level >= 55) return 'bg-gradient-to-r from-blue-500 to-purple-500';
        if (level >= 40) return 'bg-gradient-to-r from-green-500 to-blue-500';
        if (level >= 30) return 'bg-gradient-to-r from-yellow-500 to-green-500';
        return 'bg-gradient-to-r from-gray-400 to-gray-500';
    };

    // 우선순위 태그
    const getPriorityTag = (index: number, level: number) => {
        if (level === 60 && index < 4) return { text: '필수', color: 'bg-red-500' };
        if (level >= 55 && index < 7) return { text: '권장', color: 'bg-orange-500' };
        return { text: '선택', color: 'bg-gray-500' };
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-purple-500/20">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                            🔮 헥사 스킬 우선 강화 가이드
                        </h1>
                        <p className="text-gray-400 text-sm">
                            실제 유저 데이터 기반 (Lv.260+ / 전투력 5천만~2억) • TOP 7 스킬 추천
                        </p>
                    </div>
                    <a href="/" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700">
                        🏠 홈으로
                    </a>
                </div>
            </header>

            {/* Search & Filter Section */}
            <div className="container mx-auto px-4 py-6">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-xl">
                    {/* Search Bar */}
                    <div className="mb-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="직업명 또는 스킬명 검색... (예: 나이트로드, 파이널 어택)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-900/80 text-white px-4 py-3 pl-12 rounded-xl border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                            />
                            <span className="absolute left-4 top-3.5 text-purple-400">🔍</span>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-3.5 text-gray-400 hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {['전체', '전사', '마법사', '궁수', '도적', '해적'].map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                                    : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700 hover:text-white'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Min Level Slider */}
                    <div className="flex items-center gap-4">
                        <label className="text-sm text-gray-400">최소 평균 레벨:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            step="10"
                            value={minLevel}
                            onChange={(e) => setMinLevel(Number(e.target.value))}
                            className="flex-1 accent-purple-500"
                        />
                        <span className="text-purple-400 font-bold min-w-[50px]">Lv.{minLevel}+</span>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mt-4 text-gray-400 text-sm">
                    {filteredJobs.length}개 직업 • {filteredJobs.reduce((sum, job) => sum + (hexaData as any)[job].length, 0)}개 스킬
                </div>
            </div>

            {/* Job Cards */}
            <div className="container mx-auto px-4 pb-12">
                <div className="space-y-6">
                    {filteredJobs.map(job => {
                        const skills = (hexaData as any)[job].filter((skill: any) => skill.averageLevel >= minLevel);
                        if (skills.length === 0) return null;

                        return (
                            <div
                                key={job}
                                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-xl hover:shadow-2xl hover:border-purple-500/40 transition-all"
                            >
                                {/* Job Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                                        {job}
                                    </h2>
                                    <span className="text-sm text-gray-400">TOP {Math.min(skills.length, 7)}개 스킬</span>
                                </div>

                                {/* Skills List */}
                                <div className="space-y-3">
                                    {skills.slice(0, 7).map((skill: any, index: number) => {
                                        const priority = getPriorityTag(index, skill.averageLevel);
                                        const percentage = (skill.averageLevel / 60) * 100;

                                        return (
                                            <div
                                                key={index}
                                                className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/50 transition-all group"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl font-bold text-purple-400 bg-slate-800/50 w-10 h-10 rounded-lg flex items-center justify-center">
                                                            {index + 1}
                                                        </span>
                                                        <div>
                                                            <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                                                                {skill.name}
                                                            </h3>
                                                            <span className="text-xs text-gray-500">평균 Lv.{skill.averageLevel}</span>
                                                        </div>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${priority.color}`}>
                                                        {priority.text}
                                                    </span>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className={`h-full ${getLevelColor(skill.averageLevel)} transition-all duration-500`}
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredJobs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">😢 검색 결과가 없습니다.</p>
                        <p className="text-gray-500 text-sm mt-2">다른 검색어나 필터를 시도해보세요.</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-purple-500/20 py-6">
                <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                    <p>© Maple Hub • Nexon Open API 기반 데이터 • 2025</p>
                    <p className="mt-1 text-xs text-gray-600">
                        실제 260+ 레벨 유저들의 헥사 스킬 평균 레벨을 분석하여 제공합니다.
                    </p>
                </div>
            </footer>
        </div>
    );
}
