import React from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Zap, Shield, Swords, Cpu, Ghost, Skull, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { InFeedAd } from '@/components/AdSense';

export const metadata: Metadata = {
    title: '신규 6차 공용 코어 솔 헤카테 완벽 분석 - 메이플스토리 테스트월드',
    description: '전직업 공용 성장형 소환수 솔 헤카테 출시! 스틱스, 카론, 플레게톤 스킬 상세 분석과 활용법.',
};

export default function SolHecatePost() {
    return (
        <main className="min-h-screen bg-slate-950/50 pt-24 pb-20">
            {/* 배경 효과 */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            <article className="relative max-w-4xl mx-auto px-4 sm:px-6">
                {/* 헤더 섹션 */}
                <header className="mb-8 sm:mb-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>블로그 목록으로</span>
                    </Link>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full border border-purple-500/30">
                            업데이트 소식
                        </span>
                        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30">
                            KMST 1.2.197
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                            🌑 솔 헤카테:
                        </span>{' '}
                        신규 6차 공용 코어 완벽 분석
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-400 text-sm border-b border-slate-800 pb-8">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>2026년 1월 9일</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>15분 분량</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-400 font-bold bg-green-900/20 px-2 py-1 rounded">
                            <ArrowRight className="w-4 h-4" />
                            <span>2026년 1월 15일 본섭 적용 예정</span>
                        </div>
                    </div>
                </header>

                {/* 배너 이미지 */}
                <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/30 border border-slate-700/50">
                    <Image
                        src="/images/blog/sol-hecate-banner.png"
                        alt="솔 헤카테 업데이트 배너"
                        width={1200}
                        height={300}
                        className="w-full h-auto"
                        priority
                    />
                </div>

                {/* 본문 콘텐츠 */}
                <div className="prose prose-invert prose-lg max-w-none">
                    {/* 핵심 요약 (TL;DR) */}
                    <div className="bg-slate-900/50 border border-purple-500/30 rounded-2xl p-6 sm:p-8 mb-12 backdrop-blur-sm">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2 text-white">
                            <Zap className="w-6 h-6 text-purple-400" />
                            핵심 요약
                        </h2>
                        <ul className="space-y-3 text-slate-300">
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 mt-1 font-bold">✓</span>
                                <span>
                                    <strong className="text-white">성장형 소환수 (반응형):</strong> 레벨에 따라 외형이 변하고 10레벨마다 신규 스킬 해금
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 mt-1 font-bold">✓</span>
                                <span>
                                    <strong className="text-white">자동 추적:</strong> 보스 몬스터를 자동으로 인식하고 추적하여 공격 (별도 조작 불필요)
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 mt-1 font-bold">✓</span>
                                <span>
                                    <strong className="text-white">주요 스킬:</strong> 바인드/준극딜(스틱스), 사망 방지(카론), 극딜(플레게톤)
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 mt-1 font-bold">✓</span>
                                <span>
                                    <strong className="text-white">스킬 매니지먼트:</strong> 특정 스킬 사용 시 자동 발동되도록 연동 가능 (조작 간소화)
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 mt-1 font-bold">✓</span>
                                <span>
                                    <strong className="text-white">보스 딜링:</strong> 공용 코어 최초로 보스에게 직접적인 데미지를 입히는 강력한 성능
                                </span>
                            </li>
                        </ul>
                    </div>

                    <p className="lead text-xl text-slate-300 mb-10">
                        2026년 1월 15일 업데이트 예정인 테스트월드 1.2.197 버전의 핵심,
                        두 번째 HEXA 공용 코어 <strong className="text-purple-400">솔 헤카테(Sol Hecate)</strong>가 공개되었습니다.
                        단순한 버프형 스킬이 아닌, 대적자와 함께 성장하고 전투하는 <strong>'반응형 소환수'</strong> 컨셉으로 출시되어 많은 기대를 모으고 있습니다.
                    </p>

                    <InFeedAd dataAdSlot="4331375010" className="my-10" />

                    {/* 섹션 1: 기본 정보 */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
                        <Ghost className="w-8 h-8 text-purple-400" />
                        솔 헤카테란?
                    </h2>
                    <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700 mb-8">
                        <p className="text-slate-300 mb-6">
                            대적자의 결의에 이끌린 솔 에르다가 모여 패밀리어로 탄생한 신규 스킬입니다.
                            <strong>보스 몬스터를 우선적으로 자동 추적하여 공격</strong>하므로, 복잡한 컨트롤 없이도 지속적인 데미지를 입힐 수 있습니다.
                        </p>

                        <figure className="mb-8 rounded-xl overflow-hidden border border-slate-700 shadow-lg group">
                            <div className="relative overflow-hidden">
                                <Image
                                    src="/images/blog/sol-hecate-auto-attack.png"
                                    alt="솔 헤카테 자동 추적 공격"
                                    width={800}
                                    height={400}
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <figcaption className="bg-slate-900/80 p-2 text-center text-xs text-slate-400">
                                ▲ 보스를 자동으로 인식하고 추적하여 공격하는 모습
                            </figcaption>
                        </figure>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-slate-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-white mb-2">💎 성장 시스템</h4>
                                <p className="text-sm text-slate-400">1레벨부터 30레벨까지 성장하며, 10레벨 단위로 외형이 변화하고 스킬이 해금됩니다.</p>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-white mb-2">🎯 자동 전투</h4>
                                <p className="text-sm text-slate-400">소환해두면 알아서 보스를 찾아 공격합니다. 사냥과 보스전 모두에서 유용합니다.</p>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-white mb-2">⚙️ 매니지먼트</h4>
                                <p className="text-sm text-slate-400">내 스킬과 솔 헤카테 스킬을 연동하여 편의성을 높였습니다.</p>
                            </div>
                        </div>
                    </div>

                    {/* 섹션 2: 상세 스킬 분석 */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mt-16 mb-8 flex items-center gap-3">
                        <Swords className="w-8 h-8 text-indigo-400" />
                        레벨별 해금 스킬 분석
                    </h2>

                    <div className="space-y-8">
                        {/* 스틱스 */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative bg-slate-900 p-6 rounded-lg border border-slate-800">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <span className="bg-purple-600 text-xs px-2 py-1 rounded">1레벨~</span>
                                        솔 헤카테 : 스틱스 (Styx)
                                    </h3>
                                </div>
                                <p className="text-slate-300 mb-4">
                                    짙게 농축된 솔 에르다의 파도를 방출해 적을 죽음으로 인도합니다.
                                </p>

                                <div className="mb-4 rounded-lg overflow-hidden border border-slate-700/50 shadow-md">
                                    <Image
                                        src="/images/blog/sol-hecate-styx.png"
                                        alt="솔 헤카테 스틱스 바인드 효과"
                                        width={600}
                                        height={300}
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="bg-slate-950/50 p-1.5 text-center text-xs text-slate-500">
                                        ▲ 1분 주기 바인드 & 공격 스킬 스틱스
                                    </div>
                                </div>

                                <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm">
                                    <li><strong className="text-white">유형:</strong> 준극딜기 겸 바인드 스킬</li>
                                    <li><strong className="text-white">쿨타임:</strong> 60초</li>
                                    <li><strong className="text-white">특징:</strong> 기존 바인드와 별개로 적용(저항 무시 아님), 이미 바인드 상태라면 지속 시간 4초 연장</li>
                                </ul>
                            </div>
                        </div>

                        {/* 카론 */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-slate-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative bg-slate-900 p-6 rounded-lg border border-slate-800">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <span className="bg-slate-600 text-xs px-2 py-1 rounded">20레벨 해금</span>
                                        솔 헤카테 : 카론 (Charon)
                                    </h3>
                                    <Skull className="w-5 h-5 text-slate-400" />
                                </div>
                                <p className="text-slate-300 mb-4">
                                    계약자가 사망에 이르는 공격을 받았을 때 죽음의 운명으로부터 보호합니다.
                                </p>

                                <div className="mb-4 rounded-lg overflow-hidden border border-slate-700/50 shadow-md">
                                    <Image
                                        src="/images/blog/sol-hecate-charon.png"
                                        alt="솔 헤카테 카론 사망 무시 효과"
                                        width={600}
                                        height={300}
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="bg-slate-950/50 p-1.5 text-center text-xs text-slate-500">
                                        ▲ 카론 발동 시 10초간 무적 상태 진입
                                    </div>
                                </div>

                                <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm">
                                    <li><strong className="text-white">유형:</strong> 사망 방지 (헤븐즈 도어/리인카네이션 류)</li>
                                    <li><strong className="text-white">쿨타임:</strong> 600초 (10분)</li>
                                    <li><strong className="text-white">효과:</strong> 사망 피해 입을 시 생존 + 10초간 무적</li>
                                </ul>
                            </div>
                        </div>

                        {/* 플레게톤 */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative bg-slate-900 p-6 rounded-lg border border-slate-800">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <span className="bg-red-600 text-xs px-2 py-1 rounded">30레벨 해금</span>
                                        솔 헤카테 : 플레게톤 (Phlegethon)
                                    </h3>
                                    <Zap className="w-5 h-5 text-red-400" />
                                </div>
                                <p className="text-slate-300 mb-4">
                                    세계를 이루는 솔 에르다의 질서를 무너뜨려 잠시 동안 이승과 명계의 경계를 허뭅니다.
                                </p>

                                <div className="mb-4 rounded-lg overflow-hidden border border-slate-700/50 shadow-md">
                                    <Image
                                        src="/images/blog/sol-hecate-phlegethon.png"
                                        alt="솔 헤카테 플레게톤 극딜 효과"
                                        width={600}
                                        height={300}
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="bg-slate-950/50 p-1.5 text-center text-xs text-slate-500">
                                        ▲ 2분 주기 강력한 극딜기 플레게톤
                                    </div>
                                </div>

                                <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm">
                                    <li><strong className="text-white">유형:</strong> 강력한 극딜기</li>
                                    <li><strong className="text-white">쿨타임:</strong> 120초 (2분)</li>
                                    <li><strong className="text-white">특징:</strong> 보스전의 핵심 딜링 수단</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <InFeedAd dataAdSlot="4331375010" className="my-10" />

                    {/* 섹션 3: 팩텀 및 기타 */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
                        <Cpu className="w-8 h-8 text-cyan-400" />
                        스킬 매니지먼트 (팩텀)
                    </h2>
                    <p className="text-slate-300 mb-6">
                        <strong>솔 헤카테 : 팩텀</strong>은 대적자와 솔 헤카테의 의지를 조율하여 스킬 발동 방식을 규정하는 신규 스킬입니다.
                        쉽게 말해 <span className="text-cyan-400 font-bold">"자동 발동 트리거 설정"</span>입니다.
                    </p>
                    <div className="bg-cyan-900/20 border border-cyan-500/30 p-6 rounded-xl">
                        <h4 className="text-lg font-bold text-white mb-3">💡 활용 예시</h4>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li>• <strong>극딜 버프 연동:</strong> '엔젤릭버스터 링크' 사용 시 '스틱스' 자동 발동</li>
                            <li>• <strong>무적기 연동:</strong> 체력 10% 이하일 때 '카론' 우선 발동 대기</li>
                            <li>• 물론, 원한다면 별도의 키 세팅으로 수동 조적도 가능합니다.</li>
                        </ul>
                    </div>

                    <div className="mt-8 bg-slate-800/50 p-4 rounded-lg text-sm text-slate-400">
                        <p className="flex items-start gap-2">
                            <Shield className="w-4 h-4 mt-0.5 text-slate-500" />
                            <span>
                                <strong>참고사항:</strong> 솔 헤카테와 그 파생 스킬들(스틱스, 플레게톤 등)은 직업별 밸런스를 위해
                                <strong>직업마다 다른 퍼뎀(데미지)과 타수</strong>가 적용됩니다.
                                내 직업의 상세 수치는 인게임을 확인해주세요.
                            </span>
                        </p>
                    </div>

                    <hr className="border-slate-800 my-12" />

                    {/* 마무리 */}
                    <div className="text-center">
                        <p className="text-xl font-bold text-white mb-8">
                            새로운 파트너 솔 헤카테와 함께<br />
                            더 높은 곳을 향해 나아가세요!
                        </p>
                        <Link
                            href="/blog"
                            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-purple-900/40"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            다른 소식 보기
                        </Link>
                    </div>
                </div>
            </article>
        </main>
    );
}
