'use client';

import Link from 'next/link';
import { ArrowLeft, Target, TrendingUp, Search, Sparkles } from 'lucide-react';
import { useState } from 'react';

const ABILITY_DATA = [
    { job: '히어로', abilities: ['보스 몬스터 공격 시 데미지 20% 증가', '상태 이상에 걸린 대상 공격 시 데미지 8% 증가', '버프 지속시간 38% 증가'], note: '벞지 90% 이상: 공격력 21 증가로 교체' },
    { job: '팔라딘', abilities: ['보스 몬스터 공격 시 데미지 20% 증가', '상태 이상에 걸린 대상 공격 시 데미지 8% 증가', '공격력 21 증가'] },
    { job: '다크나이트', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '스킬 사용 시 재사용 대기시간이 미적용 10%', '상태 이상에 걸린 대상 공격 시 데미지 8% 증가'] },
    { job: '아크메이지(불,독)', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '버프 스킬의 지속 시간 38% 증가', '상태 이상에 걸린 대상 공격 시 데미지 8%'] },
    { job: '아크메이지(썬,콜)', abilities: ['버프 스킬의 지속 시간 증가 50%', '보스 몬스터 공격 시 데미지 증가 10%', '상태 이상에 걸린 대상 공격 시 데미지 8%'] },
    { job: '비숍', abilities: ['보스 몬스터 공격 시 데미지 20% 증가', '버프 스킬의 지속 시간 38% 증가', '상태 이상에 걸린 대상 공격 시 데미지 8%'], note: '파티용: 버프 지속 50% 권장' },
    { job: '보우마스터', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '크리티컬 확률 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 8%'] },
    { job: '신궁', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '크리티컬 확률 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 8%'] },
    { job: '패스파인더', abilities: ['재사용 대기시간 미적용 20%', '보스 몬스터 공격 시 데미지 증가 10%', '크리티컬 확률 증가 20%'] },
    { job: '나이트로드', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 8%', '공격력 증가 21'] },
    { job: '섀도어', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 8%', '공격력 증가 21'] },
    { job: '듀얼블레이더', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '버프 지속시간 증가 38%', '상태 이상에 걸린 대상 공격 시 데미지 8%'] },
    { job: '바이퍼', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 8%', '공격력 21 증가'] },
    { job: '캡틴', abilities: ['스킬 사용 시 재사용 대기시간 미적용 20%', '보스 몬스터 공격 시 데미지 증가 10%', '상태 이상에 걸린 대상 공격 시 데미지 8%'] },
    { job: '캐논마스터', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 8%', '공격력 증가 21'] },
    { job: '미하일', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 8%', '버프 지속시간 증가 38%'] },
    { job: '소울마스터', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '버프 지속시간 증가 38%', '상태 이상에 걸린 대상 공격 시 데미지 8%'], note: '벞지 90% 이상: 공격력 21 증가' },
    { job: '플레임위자드', abilities: ['패시브 스킬 레벨 증가 1', '보스 몬스터 공격 시 데미지 증가 10%', '상태 이상에 걸린 대상 공격 시 데미지 8%'] },
    { job: '윈드브레이커', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '크리티컬 확률 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 8%'] },
    { job: '나이트워커', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 8%', '공격력 증가 21'] },
    { job: '스트라이커', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 8%', '공격력 증가 21'] },
    { job: '아란', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 8%', '공격력 증가 21'] },
    { job: '에반', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '재사용 대기시간 미적용 10%', '상태 이상에 걸린 대상 공격 시 데미지 8%'] },
    { job: '루미너스', abilities: ['재사용 대기시간 미적용 20%', '버프 지속시간 증가 38%', '보스 몬스터 공격 시 데미지 증가 10%'] },
    { job: '메르세데스', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '크리티컬 확률 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 8%'] },
    { job: '팬텀', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '재사용 대기시간 미적용 10%', '상태 이상에 걸린 대상 공격 시 데미지 8%'] },
    { job: '은월', abilities: ['보스 몬스터 공격 시 데미지 20% 증가', '상태 이상에 걸린 대상 공격 시 데미지 8% 증가', '공격력 21 증가'] },
    { job: '블래스터', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 증가 8%', '공격력 증가 21'] },
    { job: '배틀메이지', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 증가 8%', '마력 증가 21'] },
    { job: '와일드헌터', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '크리티컬 확률 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 8% 증가'] },
    { job: '메카닉', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 증가 8%', '버프 지속시간 증가 38%'] },
    { job: '제논', abilities: ['보스 몬스터 공격 시 데미지 20% 증가', '상태 이상에 걸린 대상 공격 시 데미지 8% 증가', '버프 스킬의 지속 시간 38% 증가'] },
    { job: '데몬슬레이어', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '버프 스킬의 지속 시간 증가 38%', '상태 이상에 걸린 대상 공격 시 데미지 증가 8%'] },
    { job: '데몬어벤져', abilities: ['재사용 대기시간 미적용 20%', '보스 몬스터 공격 시 데미지 증가 10%', '상태 이상에 걸린 대상 공격 시 데미지 증가 8%'] },
    { job: '카이저', abilities: ['재사용 대기시간 미적용 20%', '보스 몬스터 공격 시 데미지 10% 증가', '버프 스킬의 지속 시간 증가 38%'] },
    { job: '카인', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '크리티컬 확률 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 8%'], note: '보뎀 합 650 이상: 패시브 레벨 1 권장' },
    { job: '카데나', abilities: ['재사용 대기시간 미적용 20%', '보스 몬스터 공격 시 데미지 증가 10%', '상태 이상에 걸린 대상 공격 시 데미지 증가 8%'] },
    { job: '엔젤릭버스터', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '버프 스킬의 지속 시간 증가 38%', '상태 이상에 걸린 대상 공격 시 데미지 증가 8%'] },
    { job: '아델', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '재사용 대기시간 10%', '상태 이상에 걸린 대상 공격 시 데미지 증가 8%'] },
    { job: '일리움', abilities: ['재사용 대기시간 미적용 20%', '보스 몬스터 공격 시 데미지 증가 10%', '상태 이상에 걸린 대상 공격 시 데미지 증가 8%'] },
    { job: '아크', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 증가 8%', '공격력 증가 21'], note: '주스탯 8~9만 이상: 패시브 레벨 1 권장' },
    { job: '칼리', abilities: ['재사용 대기시간 미적용 20%', '보스 몬스터 공격 시 데미지 증가 10%', '상태 이상에 걸린 대상 공격 시 데미지 증가 8%'] },
    { job: '호영', abilities: ['패시브 스킬 레벨 증가 1', '보스 몬스터 공격 시 데미지 증가 10%', '상태 이상에 걸린 대상 공격 시 데미지 증가 8%'] },
    { job: '라라', abilities: ['패시브 스킬 레벨 증가 1', '보스 몬스터 공격 시 데미지 증가 10%', '상태 이상에 걸린 대상 공격 시 데미지 증가 8%'] },
    { job: '렌', abilities: ['보스 몬스터 공격 시 데미지 20% 증가', '상태 이상에 걸린 대상 공격 시 데미지 8% 증가', '공격력 21 증가'] },
    { job: '키네시스', abilities: ['패시브 스킬 레벨 증가 1', '보스 몬스터 공격 시 데미지 증가 10%', '상태 이상에 걸린 대상 공격 시 데미지 증가 8%'] },
    { job: '제로', abilities: ['보스 몬스터 공격 시 데미지 증가 20%', '상태 이상에 걸린 대상 공격 시 데미지 증가 8%', '공격력 증가 21'] },
];

export default function AbilityGuideClient() {
    const [selectedJob, setSelectedJob] = useState('');

    const filteredData = selectedJob
        ? ABILITY_DATA.filter(data => data.job === selectedJob)
        : ABILITY_DATA;

    const jobList = ABILITY_DATA.map(d => d.job).sort();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link href="/guide" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">가이드 목록으로</span>
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">직업별 어빌리티 추천 가이드</h1>
                    <p className="text-slate-400 mt-2">전직업 보스용 최적 어빌리티 완벽 정리</p>
                </div>
            </div>

            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-4 mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                    <img src="/images/maple-ai-logo.jpg" alt="단풍이" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <div className="font-bold text-white">메이플 AI 단풍이</div>
                        <div className="text-sm text-slate-400">2025년 7월 기준 직업별 추천 어빌리티</div>
                    </div>
                </div>

                <section className="prose prose-invert max-w-none mb-12">
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Target className="w-6 h-6 text-orange-400" />
                            어빌리티란?
                        </h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            어빌리티는 <strong className="text-white">명예의 전당 시스템</strong>으로 획득하는 추가 능력치입니다.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            <strong className="text-yellow-400">어빌리티 북</strong>을 사용하여 재설정하며, 레전드리 등급에서 최고 효율의 옵션을 노려야 합니다!
                        </p>
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

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12">
                        전직업 추천 어빌리티 {selectedJob && `- ${selectedJob}`}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {filteredData.map((data, idx) => (
                            <div key={idx} className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
                                <div className="flex items-center gap-2 mb-4">
                                    <h3 className="text-xl font-bold text-white">{data.job}</h3>
                                    <Sparkles className="w-5 h-5 text-yellow-400" />
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
