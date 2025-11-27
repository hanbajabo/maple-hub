'use client';

import Link from 'next/link';
import { ArrowLeft, Target, TrendingUp, Zap, Shield, Search } from 'lucide-react';
import { useState } from 'react';

const SEED_RING_DATA = [
    { job: '히어로', recommend: '리레', restraintRate: 92.2, continuousRate: 1.0, note: '극딜 압축이 좋아 리레 효율 최상' },
    { job: '팔라딘', recommend: '리레', restraintRate: 90.0, continuousRate: 0, note: '그랜드 크로스 극딜에 리레 필수' },
    { job: '다크나이트', recommend: '컨티', restraintRate: 27.3, continuousRate: 72.7, note: '궁그닐 지속딜 구조라 컨티 효율 급상승' },
    { job: '아크메이지(불,독)', recommend: '컨티', restraintRate: 4.5, continuousRate: 95.5, note: '도트 데미지 및 지속딜러의 정석. 컨티 필수' },
    { job: '아크메이지(썬,콜)', recommend: '리레', restraintRate: 92.4, continuousRate: 2.9, note: '인피니티 막탐 극딜에 리레 효율 극대화' },
    { job: '비숍', recommend: '리레/스위칭', restraintRate: 63.1, continuousRate: 30.4, note: '프레이 극딜엔 리레, 평딜/솔플엔 컨티 스위칭' },
    { job: '보우마스터', recommend: '컨티', restraintRate: 14.0, continuousRate: 86.0, note: '잔영의 시 등 평딜 비중이 높아 컨티 선호' },
    { job: '신궁', recommend: '리레', restraintRate: 88.9, continuousRate: 5.6, note: '스나이핑 극딜에 리레 적합' },
    { job: '패스파인더', recommend: '리레', restraintRate: 90.9, continuousRate: 5.5, note: '극딜 주기가 짧고 압축이 좋아 리레 선호' },
    { job: '나이트로드', recommend: '리레', restraintRate: 94.7, continuousRate: 0.7, note: '스프레드 스로우 극딜. 리레 없으면 시체' },
    { job: '섀도어', recommend: '리레', restraintRate: 79.7, continuousRate: 14.1, note: '소닉 블로우/절개 극딜에 리레 적합' },
    { job: '듀얼블레이더', recommend: '리레', restraintRate: 92.4, continuousRate: 0, note: '블토/카퓨 쿨이 짧지만 극딜 비중이 커서 리레 압승' },
    { job: '바이퍼', recommend: '컨티/스위칭', restraintRate: 34.0, continuousRate: 66.0, note: '서펜트 지속딜로 컨티 효율 좋음. 극딜 땐 리레 스위칭' },
    { job: '캡틴', recommend: '리레/스위칭', restraintRate: 69.6, continuousRate: 30.4, note: '헤드샷/노틸러스 등 설치기 비중 고려해 스위칭' },
    { job: '캐논마스터', recommend: '리레', restraintRate: 91.7, continuousRate: 0, note: '코코볼/빅 휴즈 기가 블래스터 극딜에 리레 필수' },
    { job: '미하일', recommend: '리레/스위칭', restraintRate: 68.8, continuousRate: 31.3, note: '버터칼(클라우 솔라스) 극딜엔 리레, 평딜엔 컨티' },
    { job: '소울마스터', recommend: '리레', restraintRate: 86.2, continuousRate: 6.2, note: '엘리시온 극딜 타임에 리레 효율 좋음' },
    { job: '플레임위자드', recommend: '리레', restraintRate: 90.9, continuousRate: 4.5, note: '해방 퀘스트 등에서 리레 효율 압도적' },
    { job: '윈드브레이커', recommend: '리레', restraintRate: 81.5, continuousRate: 11.1, note: '천개/게일 등 극딜기에 리레 사용' },
    { job: '나이트워커', recommend: '리레', restraintRate: 91.8, continuousRate: 0, note: '도미니언 극딜 타임에 리레 필수' },
    { job: '스트라이커', recommend: '컨티/스위칭', restraintRate: 23.5, continuousRate: 76.5, note: '연계 직업 특성상 컨티 효율이 매우 좋음' },
    { job: '아란', recommend: '리레', restraintRate: 95.2, continuousRate: 0, note: '아드레날린/헌터즈 타겟팅 극딜에 리레 필수' },
    { job: '에반', recommend: '컨티', restraintRate: 4.5, continuousRate: 95.5, note: '조디악 레이 및 융합 스킬 지속딜. 컨티 종결' },
    { job: '루미너스', recommend: '리레', restraintRate: 86.2, continuousRate: 10.3, note: '이클립스(진리의 문) 극딜에 리레 사용' },
    { job: '메르세데스', recommend: '리레', restraintRate: 94.3, continuousRate: 0, note: '이르칼라 극딜에 리레 없으면 딜 안 나옴' },
    { job: '팬텀', recommend: '컨티', restraintRate: 20.5, continuousRate: 77.8, note: '템페스트/조커 쿨이 짧아 컨티 효율 급상승' },
    { job: '은월', recommend: '리레', restraintRate: 91.1, continuousRate: 3.6, note: '소혼결계/귀문진 극딜 타임에 리레 사용' },
    { job: '블래스터', recommend: '컨티', restraintRate: 26.1, continuousRate: 69.6, note: '캔슬 연계 평딜 비중이 높아 컨티 선호' },
    { job: '배틀메이지', recommend: '리레/스위칭', restraintRate: 64.3, continuousRate: 21.4, note: '유니온 오라 극딜에 리레 사용' },
    { job: '와일드헌터', recommend: '리레', restraintRate: 83.3, continuousRate: 0, note: '재규어 스톰 극딜에 리레 사용' },
    { job: '메카닉', recommend: '컨티/스위칭', restraintRate: 40.0, continuousRate: 60.0, note: '호밍 미사일/설치기 지속딜. 컨티 선호도 높음' },
    { job: '제논', recommend: '리레', restraintRate: 97.4, continuousRate: 1.3, note: '메가 스매셔 극딜에 리레 필수' },
    { job: '데몬슬레이어', recommend: '리레', restraintRate: 85.0, continuousRate: 12.5, note: '데몬 어웨이크닝 극딜에 리레 사용' },
    { job: '데몬어벤져', recommend: '컨티/스위칭', restraintRate: 27.9, continuousRate: 71.3, note: '프렌지/실체 지속딜로 컨티 효율 최상' },
    { job: '카이저', recommend: '컨티', restraintRate: 0, continuousRate: 100, note: '변신 상태 평딜 지속력. 컨티 100% 사용 (압도적)' },
    { job: '카인', recommend: '리레', restraintRate: 88.6, continuousRate: 0, note: '처형 스킬 극딜 압축이 좋아 리레 선호' },
    { job: '카데나', recommend: '리레', restraintRate: 85.4, continuousRate: 6.3, note: '연계 극딜 콤보에 리레 사용' },
    { job: '엔젤릭버스터', recommend: '리레', restraintRate: 83.0, continuousRate: 6.8, note: '스포트라이트/트리니티 퓨전 극딜에 리레 사용' },
    { job: '아델', recommend: '리레', restraintRate: 95.0, continuousRate: 0.5, note: '인피니트 극딜에 리레 필수' },
    { job: '일리움', recommend: '컨티/스위칭', restraintRate: 32.0, continuousRate: 64.0, note: '자벨린/오브 지속딜 비중이 높아 컨티 선호' },
    { job: '아크', recommend: '리레', restraintRate: 94.4, continuousRate: 0, note: '근원의 기억 등 변신 극딜에 리레 필수' },
    { job: '칼리', recommend: '리레', restraintRate: 87.0, continuousRate: 13.0, note: '헥사 스킬 극딜 압축이 좋아 리레 선호' },
    { job: '호영', recommend: '리레', restraintRate: 92.3, continuousRate: 0, note: '선기: 영약 태을선인 등 극딜 버프와 리레 시너지' },
    { job: '라라', recommend: '리레', restraintRate: 88.5, continuousRate: 11.5, note: '큰 기지개 등 해방 극딜에 리레 사용' },
    { job: '렌', recommend: '리레', restraintRate: 91.6, continuousRate: 2.1, note: '신직업이라 연구 중이나 현재는 리레 압도적' },
    { job: '키네시스', recommend: '리레', restraintRate: 84.2, continuousRate: 5.3, note: '싸이킥 무브/메테오 극딜에 리레 사용' },
    { job: '제로', recommend: '컨티', restraintRate: 8.3, continuousRate: 91.7, note: '태그 시스템 특성상 지속딜. 컨티 효율 최상' },
];

export default function SeedRingGuideClient() {
    const [selectedJob, setSelectedJob] = useState('');

    const filteredData = selectedJob
        ? SEED_RING_DATA.filter(data => data.job === selectedJob)
        : SEED_RING_DATA;

    const jobList = SEED_RING_DATA.map(d => d.job).sort();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link href="/guide" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">가이드 목록으로</span>
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">직업별 시드링 추천 가이드</h1>
                    <p className="text-slate-400 mt-2">리레 vs 컨티 - 레벨 280+, 전투력 4억 이상 실제 데이터</p>
                </div>
            </div>

            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-4 mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                    <img src="/images/maple-ai-logo.jpg" alt="단풍이" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <div className="font-bold text-white">메이플 AI 단풍이</div>
                        <div className="text-sm text-slate-400">Maple.GG 초고스펙 유저 빅데이터 분석</div>
                    </div>
                </div>

                <section className="prose prose-invert max-w-none mb-12">
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Target className="w-6 h-6 text-orange-400" />
                            시드링이란?
                        </h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            시드링은 대표적으로 <strong className="text-white">리스트레인트 링(리레)</strong>과 <strong className="text-white">컨티뉴어스 링(컨티)</strong> 두 종류가 있습니다.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap className="w-5 h-5 text-red-400" />
                                    <h3 className="text-lg font-bold text-white">리스트레인트 링 (리레)</h3>
                                </div>
                                <p className="text-slate-300 text-sm">극딜형 링. 40초마다 15초간 공격력 대폭 증가. <strong className="text-yellow-400">극딜 압축</strong>에 최적화.</p>
                            </div>
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Shield className="w-5 h-5 text-blue-400" />
                                    <h3 className="text-lg font-bold text-white">컨티뉴어스 링 (컨티)</h3>
                                </div>
                                <p className="text-slate-300 text-sm">지속딜형 링. 항상 공격력 증가 유지. <strong className="text-green-400">평딜/지속딜</strong>에 효율적.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-blue-400" />
                            데이터 출처
                        </h2>
                        <ul className="text-slate-300 space-y-2">
                            <li>✅ 레벨 280+, 전투력 4억 이상 초고스펙 유저</li>
                            <li>✅ Maple.GG 실제 착용 데이터 (2025년 11월)</li>
                            <li>✅ 전직업 47개 완전 분석</li>
                        </ul>
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
                        전직업 시드링 추천 {selectedJob && `- ${selectedJob}`}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {filteredData.map((data) => {
                            const isRestraint = data.recommend.includes('리레');
                            const isContinuous = data.recommend.includes('컨티');
                            const isSwitching = data.recommend.includes('스위칭');

                            return (
                                <div key={data.job} className={`border rounded-xl p-5 hover:border-opacity-80 transition-all ${isSwitching ? 'bg-purple-500/10 border-purple-500/30' :
                                    isContinuous ? 'bg-blue-500/10 border-blue-500/30' :
                                        'bg-red-500/10 border-red-500/30'
                                    }`}>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={`/images/jobs/${data.job}.png`}
                                                alt={data.job}
                                                className="w-16 h-16 rounded-lg object-cover bg-slate-800/50"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-lg font-bold text-white">{data.job}</h3>
                                                <div className={`px-3 py-1 rounded-full text-sm font-bold ${isSwitching ? 'bg-purple-500/20 text-purple-300' :
                                                    isContinuous ? 'bg-blue-500/20 text-blue-300' :
                                                        'bg-red-500/20 text-red-300'
                                                    }`}>
                                                    {data.recommend}
                                                </div>
                                            </div>

                                            <div className="flex gap-3 mb-3">
                                                <div className="flex-1 bg-slate-900/50 rounded-lg p-2">
                                                    <div className="text-xs text-slate-500 mb-1">리레</div>
                                                    <div className="text-lg font-bold text-red-400">{data.restraintRate}%</div>
                                                </div>
                                                <div className="flex-1 bg-slate-900/50 rounded-lg p-2">
                                                    <div className="text-xs text-slate-500 mb-1">컨티</div>
                                                    <div className="text-lg font-bold text-blue-400">{data.continuousRate}%</div>
                                                </div>
                                            </div>

                                            <p className="text-sm text-slate-300">{data.note}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12">핵심 정리</h2>

                    <div className="space-y-4">
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">💧 컨티 필수 직업</h4>
                            <p className="text-slate-300 text-sm mb-3">
                                지속딜 비중이 높은 직업은 <strong className="text-blue-400">컨티</strong>가 압도적!
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">카이저 (100%)</span>
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">불독 (95.5%)</span>
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">에반 (95.5%)</span>
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">제로 (91.7%)</span>
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">보마 (86%)</span>
                            </div>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">⚡ 리레 필수 직업</h4>
                            <p className="text-slate-300 text-sm mb-3">
                                극딜 압축이 좋은 직업은 <strong className="text-red-400">리레</strong> 없으면 안 됨!
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">제논 (97.4%)</span>
                                <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">아란 (95.2%)</span>
                                <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">아델 (95%)</span>
                                <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">나로 (94.7%)</span>
                                <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">메데 (94.3%)</span>
                            </div>
                        </div>

                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">🔄 스위칭 추천 직업</h4>
                            <p className="text-slate-300 text-sm mb-3">
                                보스/사냥에 따라 <strong className="text-purple-400">두 링을 모두 활용</strong>하는 것이 좋음!
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">비숍</span>
                                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">미하일</span>
                                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">배메</span>
                                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">메카닉</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">내 시드링 확인하기</h3>
                    <p className="text-slate-300 mb-6">
                        메이플 AI로 내 캐릭터를 진단하면 현재 시드링과 추천 시드링을 확인할 수 있습니다
                    </p>
                    <Link href="/" className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors shadow-lg">
                        지금 진단 받기 →
                    </Link>
                </div>
            </article>
        </div>
    );
}
