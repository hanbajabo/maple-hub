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
                    <Link prefetch={false} href="/guide" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
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

                        <div className="mt-6 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                            <img
                                src="/images/guides/hexa-skill-matrix.jpg"
                                alt="인게임 헥사 매트릭스 전체 화면"
                                className="relative w-full h-auto rounded-lg shadow-2xl border border-purple-500/30 hover:scale-[1.01] transition-transform duration-300"
                            />
                            <div className="absolute top-3 left-3 bg-black/70 px-3 py-1.5 rounded-lg border border-purple-400/30">
                                <p className="text-xs text-purple-300 font-bold">
                                    🎮 실제 인게임 화면
                                </p>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 rounded-b-lg">
                                <p className="text-sm text-slate-200 text-center font-medium">
                                    💫 헥사 매트릭스 전체 UI - 헥사 스킬과 헥사 스탯을 한눈에!
                                </p>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-indigo-400" />
                        전직업 헥사 스킬 우선순위
                    </h2>

                    <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 mb-6">
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

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredJobs.map((job) => {
                            const skills = HEXA_SKILL_PRIORITIES[job];
                            const displaySkills = skills.slice(0, 8); // TOP 8만 표시

                            return (
                                <div key={job} className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-600 bg-slate-800 flex-shrink-0 relative group">
                                            <img
                                                src={`/images/jobs/${job}.png`}
                                                alt={job}
                                                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                onError={(e) => {
                                                    const parent = e.currentTarget.parentElement;
                                                    if (parent) {
                                                        e.currentTarget.style.display = 'none';
                                                        parent.className = "w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center border border-purple-400/30";
                                                        parent.innerHTML = `<span class="text-white font-bold text-xl">${job[0]}</span>`;
                                                    }
                                                }}
                                            />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{job}</h3>
                                    </div>

                                    <div className="space-y-2">
                                        {displaySkills.map((skill, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-2.5 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition-colors">
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
                    <Link prefetch={false} href="/" className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors shadow-lg">
                        지금 진단 받기 →
                    </Link>
                </div>
            </article>
        </div>
    );
}
