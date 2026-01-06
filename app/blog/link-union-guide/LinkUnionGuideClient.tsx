'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Target, Zap, TrendingUp, Award, Users, ShieldCheck } from 'lucide-react';

export default function LinkUnionGuideClient() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">블로그로 돌아가기</span>
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">🌟 링크 & 유니온 육성 가이드</h1>
                    <p className="text-slate-400 mt-2">효율적인 캐릭터 육성 순서와 최적의 링크 세팅</p>
                </div>
            </div>

            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-4 mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                    <img src="/images/maple-ai-logo.jpg" alt="단풍이" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <div className="font-bold text-white">메이플 AI 단풍이</div>
                        <div className="text-sm text-slate-400">2026년 1월 7일 기준 링크 & 유니온 육성 완벽 가이드</div>
                    </div>
                </div>

                {/* Introduction */}
                <section className="prose prose-invert max-w-none mb-12">
                    <div className="bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-indigo-900/30 border border-purple-500/40 rounded-2xl p-8 mb-8">
                        <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                            <Target className="w-8 h-8 text-purple-400" />
                            링크 & 유니온이란?
                        </h2>
                        <div className="space-y-4 text-slate-300">
                            <p className="leading-relaxed">
                                <strong className="text-white">링크 스킬</strong>은 다른 캐릭터에게 전수 가능한 스킬로, 최대 12개까지 적용할 수 있습니다.
                            </p>
                            <p className="leading-relaxed">
                                <strong className="text-white">유니온</strong>은 월드 내 모든 캐릭터의 레벨 총합으로 효과를 받는 시스템입니다.
                            </p>
                            <div className="bg-purple-950/50 border border-purple-500/30 rounded-lg p-4 mt-4">
                                <h4 className="text-sm font-bold text-purple-300 mb-2">💡 핵심 요약</h4>
                                <ul className="space-y-1 text-sm text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-400 mt-0.5">•</span>
                                        <span><strong className="text-white">육성 순서</strong>가 효율에 큰 영향을 미칩니다</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-400 mt-0.5">•</span>
                                        <span><strong className="text-white">지원 유무</strong>에 따라 전략이 달라집니다</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-400 mt-0.5">•</span>
                                        <span><strong className="text-white">목표 레벨</strong>: 링크 140, 유니온 200~250</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Link Skill Guide */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <Zap className="w-8 h-8 text-yellow-400" />
                        1. 🔗 링크 캐릭터 육성 순서
                    </h2>

                    {/* 1단계: 경험치 링크 */}
                    <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 mb-6">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-4">[1단계: 경험치 링크 (조건부 0순위)]</h3>

                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-slate-900/50 border border-yellow-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-yellow-500/30 flex-shrink-0">
                                        <Image
                                            src="/images/jobs/메르세데스.png"
                                            alt="메르세데스"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="font-bold text-white">메르세데스</h4>
                                </div>
                                <p className="text-sm text-slate-300">경험치 15% 증가</p>
                            </div>
                            <div className="bg-slate-900/50 border border-yellow-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-yellow-500/30 flex-shrink-0">
                                        <Image
                                            src="/images/jobs/에반.png"
                                            alt="에반"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="font-bold text-white">에반</h4>
                                </div>
                                <p className="text-sm text-slate-300">룬 지속시간 50% 증가</p>
                            </div>
                            <div className="bg-slate-900/50 border border-yellow-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-yellow-500/30 flex-shrink-0">
                                        <Image
                                            src="/images/jobs/아란.png"
                                            alt="아란"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="font-bold text-white">아란</h4>
                                </div>
                                <p className="text-sm text-slate-300">콤보킬 경험치 650% 증가</p>
                            </div>
                        </div>

                        <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4">
                            <h4 className="text-sm font-bold text-red-300 mb-2">⚠️ 중요한 조건</h4>
                            <p className="text-sm text-slate-300 mb-2">
                                <strong className="text-white">육성 아이템이나 버닝 이벤트가 있을 때만</strong> 0순위입니다.
                            </p>
                            <p className="text-sm text-slate-400">
                                아무 기반 없이 경험치 링크부터 키우면 딜이 부족해 원킬이 안 나고, 오히려 사냥 속도가 느려져 육성 시간이 늘어납니다.
                                <strong className="text-red-300"> 템이나 지원이 없다면 딜 링크를 먼저 키우세요!</strong>
                            </p>
                        </div>
                    </div>

                    {/* 2단계: 딜 링크 */}
                    <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 mb-6">
                        <h3 className="text-2xl font-bold text-orange-400 mb-4">[2단계: 딜(데미지) 링크 (맨땅 1순위)]</h3>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div className="bg-slate-900/50 border border-orange-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-orange-500/30 flex-shrink-0">
                                        <Image
                                            src="/images/jobs/팬텀.png"
                                            alt="팬텀"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="font-bold text-white">팬텀 ⭐</h4>
                                </div>
                                <p className="text-sm text-slate-300">크리티컬 확률 15%</p>
                                <p className="text-xs text-orange-300 mt-1">크확 낮은 직업 필수!</p>
                            </div>
                            <div className="bg-slate-900/50 border border-orange-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-orange-500/30 flex-shrink-0">
                                        <Image
                                            src="/images/jobs/데몬어벤져.png"
                                            alt="데몬어벤져"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="font-bold text-white">데몬어벤져</h4>
                                </div>
                                <p className="text-sm text-slate-300">데미지 10% 증가</p>
                            </div>
                            <div className="bg-slate-900/50 border border-orange-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-orange-500/30 flex-shrink-0">
                                        <Image
                                            src="/images/jobs/호영.png"
                                            alt="호영"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="font-bold text-white">호영</h4>
                                </div>
                                <p className="text-sm text-slate-300">풀피 몹 데미지 14%</p>
                                <p className="text-xs text-orange-300 mt-1">사냥 원킬에 도움!</p>
                            </div>
                            <div className="bg-slate-900/50 border border-orange-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-orange-500/30 flex-shrink-0">
                                        <Image
                                            src="/images/jobs/일리움.png"
                                            alt="일리움"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="font-bold text-white">일리움</h4>
                                </div>
                                <p className="text-sm text-slate-300">이동 중 데미지 12%</p>
                                <p className="text-xs text-orange-300 mt-1">스택 유지 쉬움</p>
                            </div>
                            <div className="bg-slate-900/50 border border-orange-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-orange-500/30 flex-shrink-0">
                                        <Image
                                            src="/images/jobs/아크.png"
                                            alt="아크"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="font-bold text-white">아크</h4>
                                </div>
                                <p className="text-sm text-slate-300">전투 중 데미지 11%</p>
                            </div>
                            <div className="bg-slate-900/50 border border-orange-500/30 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-orange-500/30 flex-shrink-0">
                                        <Image
                                            src="/images/jobs/키네시스.png"
                                            alt="키네시스"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="font-bold text-white">키네시스</h4>
                                </div>
                                <p className="text-sm text-slate-300">크리티컬 데미지 4%</p>
                            </div>
                        </div>

                        <div className="bg-green-950/30 border border-green-500/30 rounded-lg p-4 mb-4">
                            <h4 className="text-sm font-bold text-green-300 mb-2">✅ 추천 전략</h4>
                            <p className="text-sm text-slate-300">
                                위 캐릭터들을 먼저 키워 <strong className="text-white">딜을 확보</strong>한 뒤, 경험치 링크를 키우는 것이 효율적입니다.
                            </p>
                        </div>

                        <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4">
                            <h4 className="text-sm font-bold text-red-300 mb-2">❌ 비추천</h4>
                            <p className="text-sm text-slate-300">
                                <strong className="text-white">모험가, 시그너스</strong> 등 3~5마리를 다 키워야 효과를 보는 링크는 초반에 비효율적이므로 나중에 키우세요.
                            </p>
                        </div>
                    </div>

                    {/* 3단계: 육성 목표 레벨 */}
                    <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">[3단계: 육성 목표 레벨]</h3>

                        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg p-6 mb-4">
                            <h4 className="text-xl font-bold text-white mb-3">🎯 효율적인 레벨: <span className="text-blue-300">140레벨</span></h4>
                            <p className="text-slate-300 mb-2">
                                링크 2레벨 조건인 120레벨을 넘겨 <strong className="text-white">유니온 S등급(140레벨)</strong>까지 챙기는 것이 가장 좋습니다.
                            </p>
                            <p className="text-sm text-slate-400">
                                요즘 익성비(익스트림 성장의 비약)가 130부터라 140까지 올리면 좋습니다.
                            </p>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                            <h4 className="text-sm font-bold text-slate-300 mb-2">💡 초반 빌드업 팁</h4>
                            <p className="text-sm text-slate-400">
                                <strong className="text-white">이론상:</strong> 70레벨(링크 1렙) 여러 개 → 120레벨(링크 2렙) 여러 개 순으로 올리는 게 좋지만,<br />
                                <strong className="text-white">실전:</strong> 버닝 이벤트 때는 그냥 하나씩 <strong className="text-blue-300">140까지 쭉 올리는 것</strong>이 편합니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Union Guide */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <Users className="w-8 h-8 text-purple-400" />
                        2. 🧩 유니온 캐릭터 육성 순서
                    </h2>

                    <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 mb-6">
                        <h3 className="text-2xl font-bold text-purple-400 mb-4">[1순위: 필수 유니온]</h3>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-purple-500/30 flex-shrink-0">
                                        <Image
                                            src="/images/jobs/제로.png"
                                            alt="제로"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <Award className="w-6 h-6 text-purple-300 mb-1" />
                                        <h4 className="text-xl font-bold text-white">제로</h4>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-300 mb-2">경험치 획득량 증가</p>
                                <p className="text-xs text-purple-300">육성 필수!</p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-purple-500/30 flex-shrink-0">
                                        <Image
                                            src="/images/jobs/은월.png"
                                            alt="은월"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <Award className="w-6 h-6 text-purple-300 mb-1" />
                                        <h4 className="text-xl font-bold text-white">은월</h4>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-300 mb-2">크리티컬 데미지 증가</p>
                                <p className="text-xs text-purple-300">가장 효율 좋은 스펙!</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 mb-6">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">[2순위: 직업별 선택]</h3>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-blue-500/30 flex-shrink-0">
                                        <Image
                                            src="/images/jobs/메르세데스.png"
                                            alt="메르세데스"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="font-bold text-white text-sm">메르세데스</h4>
                                </div>
                                <p className="text-xs text-slate-300">스킬 쿨타임 감소 (대부분 직업에 좋음)</p>
                            </div>
                            <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-blue-500/30 flex-shrink-0">
                                        <Image
                                            src="/images/jobs/와일드헌터.png"
                                            alt="와일드헌터"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="font-bold text-white text-sm">와일드헌터</h4>
                                </div>
                                <p className="text-xs text-slate-300">공격 시 20% 확률로 데미지 증가</p>
                            </div>
                            <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-blue-500/30 flex-shrink-0">
                                        <Image
                                            src="/images/jobs/메카닉.png"
                                            alt="메카닉"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="font-bold text-white text-sm">메카닉</h4>
                                </div>
                                <p className="text-xs text-slate-300">버프 지속 시간 증가 (법사, 일부 직업 필수)</p>
                            </div>
                            <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-blue-500/30 flex-shrink-0">
                                        <Image
                                            src="/images/jobs/데몬어벤져.png"
                                            alt="데몬어벤져"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="font-bold text-white text-sm">데몬어벤져</h4>
                                </div>
                                <p className="text-xs text-slate-300">보스 공격력 증가</p>
                            </div>
                            <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-blue-500/30 flex-shrink-0">
                                        <Image
                                            src="/images/jobs/블래스터.png"
                                            alt="블래스터"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h4 className="font-bold text-white text-sm">블래스터</h4>
                                </div>
                                <p className="text-xs text-slate-300">방어율 무시</p>
                            </div>
                            <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex gap-1">
                                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-blue-500/30 flex-shrink-0">
                                            <Image
                                                src="/images/jobs/신궁.png"
                                                alt="신궁"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-blue-500/30 flex-shrink-0">
                                            <Image
                                                src="/images/jobs/나이트로드.png"
                                                alt="나이트로드"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-white text-sm">신궁/나이트로드</h4>
                                </div>
                                <p className="text-xs text-slate-300">크리티컬 확률 (부족할 경우)</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-2xl font-bold text-green-400 mb-4">[목표 레벨]</h3>

                        <div className="space-y-4">
                            <div className="bg-green-950/30 border border-green-500/30 rounded-lg p-4">
                                <h4 className="font-bold text-white mb-2">📊 기본: <span className="text-green-300">200레벨 (SS등급)</span></h4>
                                <p className="text-sm text-slate-300">모든 유니온용 캐릭터는 200레벨을 목표로 합니다.</p>
                            </div>
                            <div className="bg-yellow-950/30 border border-yellow-500/30 rounded-lg p-4">
                                <h4 className="font-bold text-white mb-2">⭐ 고스펙: <span className="text-yellow-300">250레벨 (SSS등급)</span></h4>
                                <p className="text-sm text-slate-300 mb-2">
                                    은월, 메르세데스는 효과가 너무 좋아서 250레벨까지 키우는 경우가 많습니다.
                                </p>
                                <p className="text-xs text-slate-400">(벞지 직업은 메카닉 포함)</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Roadmap */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-green-400" />
                        추천 로드맵
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/40 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-green-300 mb-4">✅ 지원(버닝/템) 있음</h3>
                            <ol className="space-y-2 text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 font-bold">1.</span>
                                    <span>메르/에반/아란 (경험치)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 font-bold">2.</span>
                                    <span>딜 링크</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 font-bold">3.</span>
                                    <span>유니온</span>
                                </li>
                            </ol>
                        </div>

                        <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/40 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-orange-300 mb-4">🔥 지원 없음(맨땅)</h3>
                            <ol className="space-y-2 text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400 font-bold">1.</span>
                                    <span>딜 링크(호영/아크/데벤 등)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400 font-bold">2.</span>
                                    <span>경험치 링크</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400 font-bold">3.</span>
                                    <span>유니온</span>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="mt-6 bg-purple-950/30 border border-purple-500/30 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-3">🎯 최종 목표</h3>
                        <ul className="space-y-2 text-slate-300">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400">•</span>
                                <span>링크 캐릭터들은 <strong className="text-white">140레벨</strong>까지</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400">•</span>
                                <span>유니온 필수캐(제로, 은월)는 <strong className="text-white">200레벨 이상</strong> 육성</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Boss Link Setup */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-red-400" />
                        보스용 엔드급 링크 스킬 세팅
                    </h2>

                    <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 mb-4">
                        <p className="text-sm text-slate-400 mb-4">
                            궁수는 크리티컬 올려야 하는 모험가 궁수 스킬 우선
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-red-400 font-bold">1</span>
                                    <h4 className="font-bold text-white text-sm">팬텀</h4>
                                </div>
                                <p className="text-xs text-slate-300">크리티컬 확률</p>
                            </div>
                            <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-red-400 font-bold">2</span>
                                    <h4 className="font-bold text-white text-sm">데몬슬레이어</h4>
                                </div>
                                <p className="text-xs text-slate-300">보스 데미지</p>
                            </div>
                            <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-red-400 font-bold">3</span>
                                    <h4 className="font-bold text-white text-sm">아크</h4>
                                </div>
                                <p className="text-xs text-slate-300">데미지</p>
                            </div>
                            <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-red-400 font-bold">4</span>
                                    <h4 className="font-bold text-white text-sm">엔젤릭버스터</h4>
                                </div>
                                <p className="text-xs text-slate-300">극딜 버프</p>
                            </div>
                            <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-red-400 font-bold">5</span>
                                    <h4 className="font-bold text-white text-sm">시그너스 기사단</h4>
                                </div>
                                <p className="text-xs text-slate-300">공격력/마력, 상태이상 내성</p>
                            </div>
                            <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-red-400 font-bold">6</span>
                                    <h4 className="font-bold text-white text-sm">모험가 도적</h4>
                                </div>
                                <p className="text-xs text-slate-300">상태이상 건 적 공격 시 데미지</p>
                            </div>
                            <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-red-400 font-bold">7</span>
                                    <h4 className="font-bold text-white text-sm">데몬어벤져</h4>
                                </div>
                                <p className="text-xs text-slate-300">데미지</p>
                            </div>
                            <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-red-400 font-bold">8</span>
                                    <h4 className="font-bold text-white text-sm">카데나</h4>
                                </div>
                                <p className="text-xs text-slate-300">상태이상/레벨 낮은 적 데미지</p>
                            </div>
                            <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-red-400 font-bold">9</span>
                                    <h4 className="font-bold text-white text-sm">모험가 법사</h4>
                                </div>
                                <p className="text-xs text-slate-300">디버프 & 데미지/방무</p>
                            </div>
                            <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-red-400 font-bold">10</span>
                                    <h4 className="font-bold text-white text-sm">키네시스</h4>
                                </div>
                                <p className="text-xs text-slate-300">크리티컬 데미지</p>
                            </div>
                            <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-red-400 font-bold">11</span>
                                    <h4 className="font-bold text-white text-sm">카인</h4>
                                </div>
                                <p className="text-xs text-slate-300">적 처치/보스 공격 시 데미지 스택</p>
                            </div>
                            <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-red-400 font-bold">12</span>
                                    <h4 className="font-bold text-white text-sm">제논</h4>
                                </div>
                                <p className="text-xs text-slate-300">올스탯 %</p>
                            </div>
                        </div>
                    </div>

                    {/* Situational Picks */}
                    <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">상황별 교체 픽 (유동적)</h3>
                        <p className="text-sm text-slate-400 mb-4">위의 세팅을 기본으로 하되, 부족한 스탯에 따라 교체하는 픽입니다.</p>

                        <div className="space-y-4">
                            <div className="bg-blue-950/30 border border-blue-500/30 rounded-lg p-4">
                                <h4 className="font-bold text-blue-300 mb-2">🛡️ 방어율 무시(방무)가 부족할 때</h4>
                                <div className="grid md:grid-cols-3 gap-2">
                                    <div className="text-sm text-slate-300">
                                        <strong className="text-white">루미너스</strong> - 방무 15%
                                    </div>
                                    <div className="text-sm text-slate-300">
                                        <strong className="text-white">제로</strong> - 방무 10% + 피격 뎀감
                                    </div>
                                    <div className="text-sm text-slate-300">
                                        <strong className="text-white">호영</strong> - 방무 10% + 풀피 뎀증
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-950/30 border border-green-500/30 rounded-lg p-4">
                                <h4 className="font-bold text-green-300 mb-2">💚 유틸(생존)이 필요할 때</h4>
                                <div className="grid md:grid-cols-2 gap-2">
                                    <div className="text-sm text-slate-300">
                                        <strong className="text-white">레지스탕스</strong> - 부활 시 무적 시간 증가 (상위 보스 필수)
                                    </div>
                                    <div className="text-sm text-slate-300">
                                        <strong className="text-white">은월</strong> - 사망 방지
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">내 캐릭터 진단 받기</h3>
                    <p className="text-slate-300 mb-6">
                        메이플 AI로 내 캐릭터를 분석하고<br />
                        링크 스킬과 유니온 효과를 한눈에 확인하세요!
                    </p>
                    <Link href="/" className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors shadow-lg">
                        지금 진단 받기 →
                    </Link>
                </div>
            </article>
        </div>
    );
}
