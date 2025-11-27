import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Target, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
    title: '쿨타임 감소 모자(쿨뚝) 추천 가이드 - 메이플 AI',
    description: '직업별 쿨뚝 추천 여부. 레벨 280+, 전투력 4억 이상 초고스펙 유저 실제 데이터 기반 가이드.',
};

// 쿨뚝 추천 데이터
const COOLTIME_HAT_DATA = [
    { job: '히어로', recommend: 'O', rate: 92.5, note: '압도적 사용률. 쿨뚝 필수' },
    { job: '팔라딘', recommend: '△', rate: 58.4, note: '반반이지만 쿨뚝 채용률이 꽤 높음' },
    { job: '다크나이트', recommend: 'O', rate: 98.7, note: '안 쓰면 간첩 수준' },
    { job: '아크메이지(불,독)', recommend: 'O', rate: 100, note: '데이터상 전원 사용 중' },
    { job: '아크메이지(썬,콜)', recommend: '△', rate: 52.7, note: '취향의 영역 (인피니티 가동률)' },
    { job: '비숍', recommend: 'X', rate: 22.0, note: '주스탯 모자가 정배' },
    { job: '보우마스터', recommend: 'X', rate: 5.1, note: '쿨뚝 효율 없음' },
    { job: '신궁', recommend: 'X', rate: 11.1, note: '쿨뚝 효율 없음' },
    { job: '패스파인더', recommend: 'O', rate: 91.1, note: '고스펙은 거의 다 쿨뚝 사용' },
    { job: '나이트로드', recommend: '△', rate: 36.9, note: '의외로 고스펙에서 쿨뚝 채용률이 있음' },
    { job: '섀도어', recommend: 'O', rate: 98.5, note: '쿨뚝 필수' },
    { job: '듀얼블레이더', recommend: 'O', rate: 100, note: '쿨뚝 필수' },
    { job: '바이퍼', recommend: 'X', rate: 18.5, note: '주스탯 모자가 정배' },
    { job: '캡틴', recommend: '△', rate: 45.8, note: '취향 차이' },
    { job: '캐논마스터', recommend: 'O', rate: 62.7, note: '고스펙은 쿨뚝 선호' },
    { job: '미하일', recommend: 'O', rate: 87.5, note: '쿨뚝 필수' },
    { job: '소울마스터', recommend: '△', rate: 44.1, note: '취향 차이' },
    { job: '플레임위자드', recommend: 'O', rate: 91.3, note: '쿨뚝 필수' },
    { job: '윈드브레이커', recommend: 'O', rate: 97.6, note: '쿨뚝 필수' },
    { job: '나이트워커', recommend: 'X', rate: 28.7, note: '주스탯 모자가 정배 (아슬아슬하게 비추천)' },
    { job: '스트라이커', recommend: 'O', rate: 70.6, note: '쿨뚝 선호' },
    { job: '아란', recommend: 'X', rate: 17.2, note: '주스탯 모자가 정배' },
    { job: '에반', recommend: 'O', rate: 88.1, note: '쿨뚝 필수' },
    { job: '루미너스', recommend: 'O', rate: 100, note: '쿨뚝 필수' },
    { job: '메르세데스', recommend: 'O', rate: 93.3, note: '쿨뚝 필수' },
    { job: '팬텀', recommend: 'O', rate: 100, note: '쿨뚝 필수' },
    { job: '은월', recommend: 'O', rate: 98.3, note: '쿨뚝 필수' },
    { job: '블래스터', recommend: 'X', rate: 21.7, note: '주스탯 모자가 정배' },
    { job: '배틀메이지', recommend: '△', rate: 33.3, note: '취향 차이 (간당간당하게 선택)' },
    { job: '와일드헌터', recommend: 'O', rate: 92.3, note: '쿨뚝 필수' },
    { job: '메카닉', recommend: 'O', rate: 100, note: '쿨뚝 필수' },
    { job: '제논', recommend: 'O', rate: 82.5, note: '쿨뚝 필수' },
    { job: '데몬슬레이어', recommend: 'X', rate: 23.8, note: '주스탯 모자가 정배' },
    { job: '데몬어벤져', recommend: 'O', rate: 94.4, note: '쿨뚝 필수' },
    { job: '카이저', recommend: 'O', rate: 84.4, note: '쿨뚝 필수' },
    { job: '카인', recommend: 'O', rate: 81.8, note: '쿨뚝 필수' },
    { job: '카데나', recommend: 'O', rate: 100, note: '쿨뚝 필수' },
    { job: '엔젤릭버스터', recommend: 'O', rate: 98.4, note: '쿨뚝 필수' },
    { job: '아델', recommend: 'O', rate: 99.0, note: '쿨뚝 필수' },
    { job: '일리움', recommend: 'O', rate: 61.5, note: '쿨뚝 선호 (턱걸이 추천)' },
    { job: '아크', recommend: 'O', rate: 94.5, note: '쿨뚝 필수' },
    { job: '칼리', recommend: 'O', rate: 100, note: '쿨뚝 필수' },
    { job: '호영', recommend: '△', rate: 30.8, note: '딱 30% 턱걸이 선택' },
    { job: '라라', recommend: '△', rate: 48.1, note: '취향 차이' },
    { job: '렌', recommend: 'O', rate: 89.6, note: '쿨뚝 필수 (고스펙 기준)' },
    { job: '키네시스', recommend: 'X', rate: 25.0, note: '주스탯 모자가 정배' },
    { job: '제로', recommend: 'O', rate: 100, note: '쿨뚝 필수' },
];

export default function CooltimeHatGuidePage() {
    const recommendedJobs = COOLTIME_HAT_DATA.filter(j => j.recommend === 'O');
    const optionalJobs = COOLTIME_HAT_DATA.filter(j => j.recommend === '△');
    const notRecommendedJobs = COOLTIME_HAT_DATA.filter(j => j.recommend === 'X');

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href="/guide"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">가이드 목록으로</span>
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">쿨타임 감소 모자(쿨뚝) 추천 가이드</h1>
                    <p className="text-slate-400 mt-2">직업별 쿨뚝 추천 여부 (초고스펙 기준)</p>
                </div>
            </div>

            {/* Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Author Info */}
                <div className="flex items-center gap-4 mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                    <img src="/images/maple-ai-logo.jpg" alt="단풍이" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <div className="font-bold text-white">메이플 AI 단풍이</div>
                        <div className="text-sm text-slate-400">레벨 280+, 전투력 4억+ 실제 데이터 분석</div>
                    </div>
                </div>

                {/* Introduction */}
                <section className="prose prose-invert max-w-none mb-12">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Clock className="w-6 h-6 text-blue-400" />
                            쿨뚝이란?
                        </h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            <strong className="text-white">쿨뚝</strong>은 쿨타임 감소 옵션이 붙은 모자를 말합니다.
                            잠재능력에 <strong className="text-yellow-400">"모든 스킬의 재사용 대기시간 -2초"</strong> 옵션을 3줄 띄워서 사용합니다.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            주스탯 모자 대신 쿨뚝을 쓰면 <strong className="text-red-400">스탯은 손해</strong>를 보지만,
                            <strong className="text-green-400"> 스킬 가동률이 높아져서</strong> 실제 DPS가 더 높아지는 직업들이 있습니다.
                        </p>
                    </div>

                    {/* 판단 기준 */}
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Target className="w-6 h-6 text-orange-400" />
                            판단 기준
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-lg border border-green-700/30">
                                <span className="text-2xl font-black text-green-400">O</span>
                                <div>
                                    <div className="font-bold text-white">추천</div>
                                    <div className="text-sm text-slate-400">사용률 60% 이상 - 쿨뚝 강력 추천</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-yellow-900/20 rounded-lg border border-yellow-700/30">
                                <span className="text-2xl font-black text-yellow-400">△</span>
                                <div>
                                    <div className="font-bold text-white">선택</div>
                                    <div className="text-sm text-slate-400">사용률 30~60% - 취향 차이</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-red-900/20 rounded-lg border border-red-700/30">
                                <span className="text-2xl font-black text-red-400">X</span>
                                <div>
                                    <div className="font-bold text-white">비추천</div>
                                    <div className="text-sm text-slate-400">사용률 30% 미만 - 주스탯 모자 추천</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 추천 직업 */}
                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <span className="text-green-400">O</span> 쿨뚝 추천 직업 ({recommendedJobs.length}개)
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        {recommendedJobs.map((job) => (
                            <div key={job.job} className="bg-slate-800/40 border border-slate-700 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-bold text-white">{job.job}</h3>
                                    <span className="text-2xl font-black text-green-400">{job.rate}%</span>
                                </div>
                                <p className="text-sm text-slate-400">{job.note}</p>
                            </div>
                        ))}
                    </div>

                    {/* 선택 직업 */}
                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <span className="text-yellow-400">△</span> 취향 차이 직업 ({optionalJobs.length}개)
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        {optionalJobs.map((job) => (
                            <div key={job.job} className="bg-slate-800/40 border border-slate-700 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-bold text-white">{job.job}</h3>
                                    <span className="text-2xl font-black text-yellow-400">{job.rate}%</span>
                                </div>
                                <p className="text-sm text-slate-400">{job.note}</p>
                            </div>
                        ))}
                    </div>

                    {/* 비추천 직업 */}
                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <span className="text-red-400">X</span> 주스탯 모자 추천 직업 ({notRecommendedJobs.length}개)
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        {notRecommendedJobs.map((job) => (
                            <div key={job.job} className="bg-slate-800/40 border border-slate-700 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-bold text-white">{job.job}</h3>
                                    <span className="text-2xl font-black text-red-400">{job.rate}%</span>
                                </div>
                                <p className="text-sm text-slate-400">{job.note}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-indigo-400" />
                        핵심 요약
                    </h2>

                    <div className="space-y-4">
                        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">💡 대세는 쿨뚝!</h4>
                            <p className="text-slate-300 text-sm">
                                47개 직업 중 <strong className="text-yellow-400">30개 직업(64%)</strong>이 쿨뚝을 추천받았습니다.
                            </p>
                        </div>

                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">🔥 의외의 결과</h4>
                            <p className="text-slate-300 text-sm">
                                나이트로드, 캐논마스터, 렌 등은 저스펙에선 잘 안 쓰지만,
                                <strong className="text-yellow-400"> 고스펙으로 갈수록 쿨뚝 채용률이 급격히 늘어납니다.</strong>
                            </p>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">⚡ 굳건한 주스탯파</h4>
                            <p className="text-slate-300 text-sm">
                                비숍, 보우마스터, 신궁, 바이퍼 등은 고스펙이 되어도 쿨뚝을 거의 쓰지 않습니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">내 캐릭터에게 쿨뚝이 맞을까?</h3>
                    <p className="text-slate-300 mb-6">
                        메이플 AI로 실시간 캐릭터 분석을 받아보세요
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors shadow-lg"
                    >
                        지금 분석 받기 →
                    </Link>
                </div>
            </article>
        </div>
    );
}
