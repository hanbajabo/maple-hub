'use client';

import Link from 'next/link';
import { ArrowLeft, Target, TrendingUp, Users, Search } from 'lucide-react';
import { HEXA_SKILL_PRIORITIES } from '@/lib/hexa_skill_data';
import { useState } from 'react';

export default function HexaSkillGuideClient() {
    const [selectedJob, setSelectedJob] = useState('');
    const jobList = Object.keys(HEXA_SKILL_PRIORITIES).sort();

    const filteredJobs = selectedJob
        ? jobList.filter(job => job === selectedJob)
        : jobList;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link href="/guide" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">가이드 목록으로</span>
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">직업별 헥사 스킬 우선순위</h1>
                    <p className="text-slate-400 mt-2">전투력 1억~4억 고스펙 유저 실제 데이터 기반 - 전직업 완전 정리</p>
                </div>
            </div>

            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-4 mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                    <img src="/images/maple-ai-logo.jpg" alt="단풍이" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <div className="font-bold text-white">메이플 AI 단풍이</div>
                        <div className="text-sm text-slate-400">고스펙 유저 빅데이터 분석 - {jobList.length}개 직업</div>
                    </div>
                </div>

                <section className="prose prose-invert max-w-none mb-12">
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Target className="w-6 h-6 text-orange-400" />
                            이 가이드는 어떻게 만들어졌나요?
                        </h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            <strong className="text-yellow-400">전투력 1억~4억</strong>의 고스펙 유저들이 실제로 찍은 헥사 스킬 데이터를 분석했습니다.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            이론이 아닌 <strong className="text-green-400">실전 검증된 우선순위</strong>이므로, 여러분도 똑같이 따라하시면 됩니다!
                        </p>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Users className="w-6 h-6 text-blue-400" />
                            데이터 출처
                        </h2>
                        <ul className="text-slate-300 space-y-2">
                            <li>✅ 전투력 1억~4억 구간 고스펙 유저</li>
                            <li>✅ 실제 게임 내 헥사 코어 강화 현황</li>
                            <li>✅ 직업별 100명 이상 샘플</li>
                            <li>❌ 솔야누스, 솔야누스:새벽, 헥사스탯은 제외 (공통 스킬)</li>
                        </ul>
                    </div>

                    <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 mb-6 sticky top-24 z-10 backdrop-blur-md shadow-xl">
                        <div className="flex items-center gap-4">
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
                    </div>

                    {selectedJob && (
                        <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>

                            <img
                                src={`/images/jobs/${selectedJob.replace(/[\/\?<>\\:\*\|":]/g, '_')}.png`}
                                alt={selectedJob}
                                className="w-32 h-32 sm:w-48 sm:h-48 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                                onError={(e) => e.currentTarget.style.display = 'none'}
                            />

                            <div className="relative z-10 text-center sm:text-left">
                                <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">{selectedJob}</h2>
                                <p className="text-indigo-300 font-medium text-lg">헥사 스킬 강화 우선순위 TOP 3</p>
                                <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                                    {HEXA_SKILL_PRIORITIES[selectedJob]?.slice(0, 3).map((skill, idx) => (
                                        <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-slate-950/50 border border-slate-600 rounded-lg">
                                            <span className="text-yellow-400 font-bold">{idx + 1}</span>
                                            <span className="text-white text-sm font-medium">{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-indigo-400" />
                        전직업 헥사 스킬 우선순위 {selectedJob && `- ${selectedJob}`}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredJobs.map((job) => {
                            const skills = HEXA_SKILL_PRIORITIES[job];
                            const displaySkills = skills.slice(0, 8); // TOP 8만 표시

                            return (
                                <div key={job} className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 hover:border-indigo-500/50 transition-all hover:bg-slate-800/60 group">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden border border-slate-700 group-hover:border-indigo-500/30 transition-colors">
                                            <img
                                                src={`/images/jobs/${job.replace(/[\/\?<>\\:\*\|":]/g, '_')}.png`}
                                                alt={job}
                                                className="w-full h-full object-contain p-1"
                                                onError={(e) => e.currentTarget.style.display = 'none'}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{job}</h3>
                                            <div className="flex items-center gap-1 text-xs text-slate-400">
                                                <TrendingUp className="w-3 h-3 text-indigo-400" />
                                                <span>강화 우선순위 데이터</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {displaySkills.map((skill, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-2.5 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition-colors border border-transparent hover:border-slate-700">
                                                <span className={`font-bold text-sm min-w-[20px] ${idx === 0 ? 'text-yellow-400' :
                                                    idx === 1 ? 'text-slate-300' :
                                                        idx === 2 ? 'text-orange-400' :
                                                            'text-slate-400'
                                                    }`}>{idx + 1}</span>
                                                <span className="text-slate-200 text-sm">{skill}</span>
                                            </div>
                                        ))}
                                        {skills.length > 8 && (
                                            <div className="text-center pt-2">
                                                <span className="text-xs text-slate-500">+ {skills.length - 8}개 더</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12">핵심 팁</h2>

                    <div className="space-y-4">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">✅ VI 스킬이 최우선!</h4>
                            <p className="text-slate-300 text-sm">
                                대부분의 직업에서 <strong className="text-yellow-400">주력 딜링 스킬의 VI 강화</strong>가 1~3순위입니다.
                                마스터리 스킬보다 딜 스킬을 먼저!
                            </p>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">💡 오리진(강화) 스킬은 중후반</h4>
                            <p className="text-slate-300 text-sm">
                                오리진 스킬(~강화)은 보통 <strong className="text-yellow-400">5~10순위</strong>에 등장합니다.
                                VI 스킬을 충분히 올린 후 오리진을 찍으세요!
                            </p>
                        </div>

                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">🌟 직업마다 완전히 다름!</h4>
                            <p className="text-slate-300 text-sm">
                                같은 전사여도 히어로와 팔라딘의 우선순위가 <strong className="text-yellow-400">완전히 다릅니다</strong>.
                                반드시 내 직업 데이터를 확인하세요!
                            </p>
                        </div>

                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">🔥 파이널 어택 VI는 언제?</h4>
                            <p className="text-slate-300 text-sm">
                                파이널 어택이 있는 직업은 보통 <strong className="text-yellow-400">4~6순위</strong>에서 찍습니다.
                                주력 스킬보다는 후순위!
                            </p>
                        </div>
                    </div>
                </section>

                <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">내 캐릭터 헥사 진단하기</h3>
                    <p className="text-slate-300 mb-6">
                        메이플 AI로 내 캐릭터를 진단하면 현재 헥사 스킬 레벨과 추천 우선순위를 함께 확인할 수 있습니다
                    </p>
                    <Link href="/" className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors shadow-lg">
                        지금 진단 받기 →
                    </Link>
                </div>
            </article>
        </div>
    );
}
