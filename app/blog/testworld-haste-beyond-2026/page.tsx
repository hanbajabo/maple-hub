'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Sparkles, Gift, Zap, AlertCircle, Trophy, Target, TrendingUp } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function TestworldHasteBeyond2026() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 sm:mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">블로그로 돌아가기</span>
                    </Link>
                </div>
            </div>

            {/* Article */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Title Section */}
                <header className="mb-8">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-full">
                            업데이트 소식
                        </span>
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full">
                            테스트월드
                        </span>
                        <span className="text-slate-500 text-sm">2026년 2월 7일</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                        ⚡ 사냥 가속! 헤이스트 BEYOND 완벽 정리 (2026)
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-slate-400">
                        드디어 사냥의 계절이 돌아왔습니다! VIP 부스터급 경험치 혜택과 솔 에르다 2배 등 역대급 혜택으로 무장한 헤이스트 BEYOND의 모든 것을 알려드립니다.
                    </p>
                </header>

                {/* Event Banner Image */}
                <div className="mb-8">
                    <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-2xl bg-slate-900">
                        <Image
                            src="/images/blog/haste_beyond_banner.jpg"
                            alt="헤이스트 BEYOND 이벤트 배너 - 2월 12일 ~ 3월 18일까지"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Table of Contents */}
                <div className="mb-12 bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500/50 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        이벤트 핵심 하이라이트
                    </h2>
                    <ul className="space-y-2 text-slate-300">
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">▸</span>
                            <span>이벤트 기간: 2026년 2월 12일(목) ~ 3월 18일(수) 오후 11시 59분</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">▸</span>
                            <span>헤이스트 피버 타임: 매일 1회 5분간 역대급 경험치 획득</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">▸</span>
                            <span>헤이스트 트레져 박스: 일일 3회, 폴로 레전드리급 경험치</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">▸</span>
                            <span>30만 마리 달성 시 솔 에르다 획득량 2배 + 마약급 칭호</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">▸</span>
                            <span>300,000 마리 처치 보상: 보공 30% + 방무 30% 칭호</span>
                        </li>
                    </ul>
                </div>

                {/* Section 1: Event Overview */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-2 border-blue-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-blue-400">
                                    1. 이벤트 개요
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">📅 이벤트 기간</h3>
                                <p className="text-slate-300">
                                    <span className="text-orange-400 font-bold">2026년 2월 12일(목) 점검 후</span> ~ <span className="text-orange-400 font-bold">3월 18일(수) 오후 11시 59분</span>까지
                                </p>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">🎯 참여 대상</h3>
                                <p className="text-slate-300 mb-2">
                                    • <span className="text-green-400 font-bold">200 레벨 이상 캐릭터</span>
                                </p>
                                <p className="text-slate-300">
                                    • <span className="text-green-400 font-bold">스토리 챕터 2를 완료한 제로 캐릭터</span>
                                </p>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">🚀 참여 방법</h3>
                                <p className="text-slate-300 mb-2">
                                    1. <span className="text-blue-400 font-bold">이벤트 리스트</span>에서 '사냥 가속! 헤이스트 BEYOND' 선택
                                </p>
                                <p className="text-slate-300">
                                    2. 이벤트 참여 후 <span className="text-purple-400 font-bold">헤이스트 BEYOND 필드 혜택</span>과 <span className="text-purple-400 font-bold">스페셜 미션 보상</span> 확인 가능
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Fever Time */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 border-2 border-red-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                                <Zap className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-red-400">
                                    2. 헤이스트 피버 타임 (매일 1회 필수!)
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 mb-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-yellow-300 font-bold mb-1">🔥 핵심 포인트</p>
                                        <p className="text-sm text-slate-300">
                                            피버 타임은 <span className="text-yellow-400 font-bold">가장 높은 레벨의 사냥터</span>에서 사용하세요!
                                            경험치 도핑 없이도 에스페시아 에픽 상자보다 대략 30% 더 많은 경험치량을 획득할 수 있습니다.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 피버 타임 UI 이미지 */}
                            <div className="mb-4">
                                <div className="rounded-lg overflow-hidden border-2 border-orange-500/50 shadow-2xl">
                                    <Image
                                        src="/images/blog/haste_fever_time_ui.jpg"
                                        alt="헤이스트 피버 타임 사용 - 실제 게임 화면"
                                        width={1024}
                                        height={576}
                                        className="w-full h-auto"
                                    />
                                </div>
                                <p className="text-center text-slate-400 text-sm mt-2">▲ 피버 타임 발동 버튼 (우측 상단에 표시됨)</p>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">⏱️ 피버 타임 개요</h3>
                                <div className="space-y-3 text-slate-300">
                                    <p>• <span className="text-orange-400 font-bold">사용 제한:</span> 메이플ID당 1일 1회</p>
                                    <p>• <span className="text-orange-400 font-bold">지속 시간:</span> 5분</p>
                                    <p>• <span className="text-orange-400 font-bold">사용 조건:</span> [5차] 또 하나의 힘, 아케인포스 퀘스트 완료 + 200레벨 이상</p>
                                    <p>• <span className="text-orange-400 font-bold">사용 방법:</span> 레벨 범위 몬스터 맵에서 전용 UI 또는 헤이스트 UI로 발동</p>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">💡 경험치 효율</h3>
                                <div className="space-y-3 text-slate-300">
                                    <p className="text-green-400 font-bold text-lg">
                                        ✅ 소환되는 헤이스트 인페르노 몬스터는 기본 순수 경험치의 <span className="text-yellow-400">7배</span>를 제공합니다!<br />
                                        <span className="text-sm text-slate-400">(LV288 몬스터 기준)</span>
                                    </p>
                                    <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4 mt-3">
                                        <p className="text-blue-300 mb-2"><span className="font-bold">중요:</span></p>
                                        <p className="text-sm">• 추가 경험치 버프나 페널티가 <span className="text-red-400 font-bold">적용되지 않는 고정 경험치</span></p>
                                        <p className="text-sm">• 자신이 사냥 가능한 <span className="text-green-400 font-bold">가장 높은 레벨의 사냥터</span>에서 사용 필수</p>
                                        <p className="text-sm">• 5분간 약 <span className="text-yellow-400 font-bold">11,000~11,500마리</span> 처치 가능</p>
                                        <p className="text-sm">• 이는 약 <span className="text-purple-400 font-bold">8만 마리분의 경험치</span>에 해당</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">🔮 카산드라의 수정구슬</h3>

                                {/* 수정구슬 이미지 */}
                                <div className="flex justify-center mb-4">
                                    <div className="inline-block p-3 bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl border-2 border-purple-500/50 shadow-lg">
                                        <Image
                                            src="/images/blog/cassandra_crystal_ball.png"
                                            alt="카산드라의 수정구슬"
                                            width={80}
                                            height={80}
                                            className="w-20 h-20"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 text-slate-300">
                                    <p>• 헤이스트 인페르노 처치 시 <span className="text-purple-400 font-bold">낮은 확률</span>로 드랍</p>
                                    <p>• 획득 시 <span className="text-blue-400 font-bold">자동 공격 스킬</span> 발동</p>
                                    <p>• <span className="text-orange-400 font-bold">최대 5회 중첩</span> 가능, 중첩당 공격 범위 증가 + 공격 주기 감소</p>
                                    <p>• 획득 시마다 지속시간 <span className="text-green-400 font-bold">+10초</span>, 최대 90초까지 증가</p>
                                    <p className="text-yellow-400 text-sm mt-2">💡 팁: 구슬을 꾸준히 먹어 지속시간을 유지하세요!</p>
                                </div>

                                {/* 수정구슬 효과 스크린샷 */}
                                <div className="mt-4">
                                    <div className="rounded-lg overflow-hidden border-2 border-purple-500/50 shadow-xl">
                                        <Image
                                            src="/images/blog/cassandra_ball_effect.jpg"
                                            alt="카산드라의 수정구슬 자동 공격 베리어 효과"
                                            width={900}
                                            height={900}
                                            className="w-full h-auto"
                                        />
                                    </div>
                                    <p className="text-center text-slate-400 text-sm mt-2">▲ 구슬 획득 시 이렇게 자동 공격하는 베리어가 생성됩니다</p>
                                </div>
                            </div>

                            <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
                                <p className="text-green-300 font-bold mb-2">📊 효율 비교</p>
                                <p className="text-sm text-slate-300">
                                    피버 타임은 <span className="text-yellow-400 font-bold">가장 높은 레벨의 사냥터</span>에서 사용하세요!
                                    경험치 도핑 없이도 <span className="text-yellow-400 font-bold">에스페시아 에픽 상자</span>보다
                                    <span className="text-green-400 font-bold"> 대략 30% 더 많은 경험치량</span>을 획득할 수 있습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AdSense Ad */}
                <InArticleAd
                    dataAdSlot="8162808816"
                    className="my-12"
                />

                {/* Section 3: Treasure Box */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                <Gift className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-purple-400">
                                    3. 헤이스트 트레져 박스 (일일 3회)
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* 트레져 박스 이미지 */}
                            <div className="mb-4">
                                <div className="rounded-lg overflow-hidden border-2 border-yellow-500/50 shadow-2xl">
                                    <Image
                                        src="/images/blog/haste_treasure_box.jpg"
                                        alt="헤이스트 트레져 박스"
                                        width={345}
                                        height={194}
                                        className="w-full h-auto"
                                    />
                                </div>
                                <p className="text-center text-slate-400 text-sm mt-2">▲ 헤이스트 트레져 박스</p>
                            </div>

                            <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 mb-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-yellow-300 font-bold mb-1">💎 압도적 효율</p>
                                        <p className="text-sm text-slate-300">
                                            헤이스트 <span className="text-purple-400 font-bold">레어</span> 등급만 떠도
                                            <span className="text-yellow-400 font-bold"> 폴로/프리토 레전드리</span>와 동일한 경험치를 제공합니다!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">📦 트레져 박스 개요</h3>
                                <div className="space-y-3 text-slate-300">
                                    <p>• <span className="text-purple-400 font-bold">등장 조건:</span> 레벨 범위 몬스터 10,000마리 처치</p>
                                    <p>• <span className="text-purple-400 font-bold">발견 제한:</span> 메이플ID당 1일 3회</p>
                                    <p>• <span className="text-purple-400 font-bold">등장 장소:</span> 개인화 필드</p>
                                    <p>• <span className="text-purple-400 font-bold">보상:</span> 등급별 막대한 경험치 획득 보석</p>
                                    <p className="text-sm text-slate-400 mt-2">※ 헤이스트 트레져 박스를 통해 획득한 보석은 트레져 헌터 업적 횟수에 포함되지 않습니다.</p>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-4">💰 등급별 경험치 비교표</h3>

                                {/* 기본 경험치 표 */}
                                <div className="mb-6">
                                    <h4 className="text-green-400 font-bold mb-3">📊 기본 경험치 (이벤트 적용 전)</h4>
                                    <p className="text-slate-400 text-sm mb-2">기준 : 레범몬 마릿수</p>
                                    <div className="overflow-x-auto -mx-2 sm:mx-0">
                                        <table className="w-full text-xs sm:text-sm min-w-[500px]">
                                            <thead>
                                                <tr className="border-b border-slate-600">
                                                    <th className="text-left p-2 text-slate-400">등급</th>
                                                    <th className="text-right p-2 text-slate-400">폴로/프리토</th>
                                                    <th className="text-right p-2 text-slate-400">에스페시아</th>
                                                    <th className="text-right p-2 text-purple-400">헤이스트</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-slate-300">
                                                <tr className="border-b border-slate-700/50">
                                                    <td className="p-2 font-bold text-blue-400">레어</td>
                                                    <td className="text-right p-2">3,000</td>
                                                    <td className="text-right p-2">30,000</td>
                                                    <td className="text-right p-2 text-purple-400 font-bold">24,000</td>
                                                </tr>
                                                <tr className="border-b border-slate-700/50">
                                                    <td className="p-2 font-bold text-purple-400">에픽</td>
                                                    <td className="text-right p-2">6,000</td>
                                                    <td className="text-right p-2">60,000</td>
                                                    <td className="text-right p-2 text-purple-400 font-bold">36,000</td>
                                                </tr>
                                                <tr className="border-b border-slate-700/50">
                                                    <td className="p-2 font-bold text-yellow-400">유니크</td>
                                                    <td className="text-right p-2">12,000</td>
                                                    <td className="text-right p-2">120,000</td>
                                                    <td className="text-right p-2 text-purple-400 font-bold">54,000</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 font-bold text-red-400">레전드리</td>
                                                    <td className="text-right p-2">24,000</td>
                                                    <td className="text-right p-2">240,000</td>
                                                    <td className="text-right p-2 text-purple-400 font-bold">81,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-green-400 text-sm mt-3 font-bold">
                                        ✅ 헤이스트 레어 = 폴로/프리토 레전드리 경험치!
                                    </p>
                                </div>

                                {/* 이벤트 적용 후 경험치 표 */}
                                <div>
                                    <h4 className="text-orange-400 font-bold mb-3">🔥 몬스터 처치 수별 경험치 증가</h4>
                                    <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-3 mb-3">
                                        <p className="text-sm text-slate-300">
                                            • 10만 마리 달성: <span className="text-green-400 font-bold">+20%</span> 증가
                                        </p>
                                        <p className="text-sm text-slate-300">
                                            • 20만 마리 달성: <span className="text-yellow-400 font-bold">+30%</span> 추가 증가 (총 <span className="text-red-400 font-bold">+50%</span>)
                                        </p>
                                    </div>
                                    <div className="overflow-x-auto -mx-2 sm:mx-0">
                                        <table className="w-full text-xs sm:text-sm min-w-[500px]">
                                            <thead>
                                                <tr className="border-b border-slate-600">
                                                    <th className="text-left p-2 text-slate-400">등급</th>
                                                    <th className="text-right p-2 text-slate-400">기본</th>
                                                    <th className="text-right p-2 text-green-400">10만 (+20%)</th>
                                                    <th className="text-right p-2 text-yellow-400">20만 (+50%)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-slate-300">
                                                <tr className="border-b border-slate-700/50">
                                                    <td className="p-2 font-bold text-blue-400">헤이스트 레어</td>
                                                    <td className="text-right p-2">24,000</td>
                                                    <td className="text-right p-2 text-green-400">28,800</td>
                                                    <td className="text-right p-2 text-yellow-400 font-bold">36,000</td>
                                                </tr>
                                                <tr className="border-b border-slate-700/50">
                                                    <td className="p-2 font-bold text-purple-400">헤이스트 에픽</td>
                                                    <td className="text-right p-2">36,000</td>
                                                    <td className="text-right p-2 text-green-400">43,200</td>
                                                    <td className="text-right p-2 text-yellow-400 font-bold">54,000</td>
                                                </tr>
                                                <tr className="border-b border-slate-700/50">
                                                    <td className="p-2 font-bold text-yellow-400">헤이스트 유니크</td>
                                                    <td className="text-right p-2">54,000</td>
                                                    <td className="text-right p-2 text-green-400">64,800</td>
                                                    <td className="text-right p-2 text-yellow-400 font-bold">81,000</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 font-bold text-red-400">헤이스트 레전드리</td>
                                                    <td className="text-right p-2">81,000</td>
                                                    <td className="text-right p-2 text-green-400">97,200</td>
                                                    <td className="text-right p-2 text-yellow-400 font-bold">121,500</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-purple-900/20 border border-purple-500/50 rounded-lg p-4">
                                <p className="text-purple-300 font-bold mb-2">💡 효율 요약</p>
                                <p className="text-sm text-slate-300 mb-2">
                                    등급이 오를 때마다 경험치가 <span className="text-yellow-400 font-bold">1.5배</span>씩 증가합니다.
                                </p>
                                <p className="text-sm text-slate-300">
                                    헤이스트 레전드리는 기본 수치 <span className="text-red-400 font-bold">81,000</span>으로,
                                    20만 마리 달성 시 <span className="text-yellow-400 font-bold">121,500</span>의 엄청난 경험치를 제공합니다!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Field Benefits */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-2 border-green-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-green-400">
                                    4. 사냥 마릿수별 필드 혜택 (누적)
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                <div className="flex items-start gap-3">
                                    <span className="text-green-400 font-bold text-lg">상시</span>
                                    <div className="flex-1">
                                        <p className="text-slate-300">룬 생성 주기/재사용 대기시간 감소</p>
                                        <p className="text-green-400 font-bold">룬의 경험치 효과 2배</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                <div className="flex items-start gap-3">
                                    <span className="text-blue-400 font-bold text-lg">1만</span>
                                    <div className="flex-1">
                                        <p className="text-slate-300">필드에 <span className="text-purple-400 font-bold">헤이스트 트레져 박스</span> 생성 시작</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                <div className="flex items-start gap-3">
                                    <span className="text-purple-400 font-bold text-lg">5만</span>
                                    <div className="flex-1">
                                        <p className="text-slate-300"><span className="text-yellow-400 font-bold">엘리트 몬스터/챔피언</span> 등장 빈도 증가</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                <div className="flex items-start gap-3">
                                    <span className="text-yellow-400 font-bold text-lg">10만</span>
                                    <div className="flex-1">
                                        <p className="text-slate-300">트레져 박스 경험치 획득량 <span className="text-green-400 font-bold">+20%</span> 증가</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                <div className="flex items-start gap-3">
                                    <span className="text-orange-400 font-bold text-lg">15만</span>
                                    <div className="flex-1">
                                        <p className="text-slate-300">추가 경험치 획득량 <span className="text-green-400 font-bold">+20%</span> 증가</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                <div className="flex items-start gap-3">
                                    <span className="text-red-400 font-bold text-lg">20만</span>
                                    <div className="flex-1">
                                        <p className="text-slate-300">트레져 박스 경험치 획득량 <span className="text-yellow-400 font-bold">+30%</span> 추가 증가 (누적)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                <div className="flex items-start gap-3">
                                    <span className="text-pink-400 font-bold text-lg">25만</span>
                                    <div className="flex-1">
                                        <p className="text-slate-300"><span className="text-blue-400 font-bold">축복의 룬</span> (경험치 룬) 생성 주기 감소</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-4 border-2 border-yellow-500/50">
                                <div className="flex items-start gap-3">
                                    <span className="text-yellow-400 font-bold text-xl">30만</span>
                                    <div className="flex-1">
                                        <p className="text-white font-bold text-lg mb-1">🎉 최종 보상!</p>
                                        <p className="text-yellow-400 font-bold">사냥 시 솔 에르다 기운 획득량 2배 적용</p>
                                        <p className="text-sm text-slate-300 mt-2">※ 재획 유저들에게 필수!</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4 mt-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-blue-300 font-bold mb-1">참고 사항</p>
                                        <p className="text-sm text-slate-300 mb-1">
                                            • <span className="text-yellow-400 font-bold">레벨 범위 몬스터:</span> 캐릭터 레벨 기준 -20~+20레벨 사이의 몬스터
                                        </p>
                                        <p className="text-sm text-slate-300">
                                            • <span className="text-red-400 font-bold">진행 조건:</span> 1인 파티 또는 파티 미가입 상태에서 200레벨 이상 캐릭터로만 진행 가능
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AdSense Ad */}
                <InArticleAd
                    dataAdSlot="8162808816"
                    className="my-12"
                />

                {/* Section 5: Special Mission */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-2 border-yellow-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-yellow-400">
                                    5. 스페셜 미션 보상 (치장 & 칭호)
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">🎯 미션 진행 안내</h3>
                                <div className="space-y-2 text-slate-300">
                                    <p>• 레벨 범위 몬스터를 일정 마리 이상 처치하면 미션 달성</p>
                                    <p>• 스페셜 미션 진행 기록은 <span className="text-purple-400 font-bold">메이플ID 내 모든 캐릭터가 공유</span></p>
                                    <p>• 각 미션 달성 시, 누적된 처치 수는 초기화되지 않음</p>
                                    <p className="text-sm text-slate-400 mt-2">※ 1인 파티 또는 파티 미가입 상태에서 200레벨 이상 캐릭터로만 진행 가능</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {/* 10만 마리 */}
                                <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-5 border border-blue-500/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-white text-lg">10만 마리 처치 미션</h3>
                                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full">
                                            의자/라이딩
                                        </span>
                                    </div>

                                    {/* 밤의 도시 라이더 이미지 */}
                                    <div className="mb-4">
                                        <div className="rounded-lg overflow-hidden border-2 border-blue-500/50 shadow-xl bg-slate-900/50">
                                            <Image
                                                src="/images/blog/haste_reward_100k_rider.png"
                                                alt="밤의 도시 라이더 - 10만 마리 처치 보상"
                                                width={600}
                                                height={400}
                                                className="w-full h-auto"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                        <p className="text-purple-400 font-bold mb-2">🪑 밤의 도시 라이더</p>
                                        <p className="text-slate-300 text-sm">• 영구 사용 가능</p>
                                        <p className="text-slate-300 text-sm">• 월드 내 나의 캐릭터 간 이동만 가능</p>
                                    </div>
                                </div>

                                {/* 20만 마리 */}
                                <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 rounded-lg p-5 border border-orange-500/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-white text-lg">20만 마리 처치 미션</h3>
                                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full">
                                            데미지 스킨
                                        </span>
                                    </div>

                                    {/* 불꽃늑대 데미지 스킨 이미지 */}
                                    <div className="mb-4">
                                        <div className="rounded-lg overflow-hidden border-2 border-orange-500/50 shadow-xl bg-slate-900/50">
                                            <Image
                                                src="/images/blog/haste_reward_200k_damage_skin.png"
                                                alt="불꽃늑대 액션 데미지 스킨 - 20만 마리 처치 보상"
                                                width={600}
                                                height={400}
                                                className="w-full h-auto"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                        <p className="text-orange-400 font-bold mb-2">🔥 불꽃늑대 액션 데미지 스킨 (유닛)</p>
                                        <p className="text-slate-300 text-sm">• 사용 기한: 2026년 3월 19일(목) 오전 2시까지</p>
                                        <p className="text-slate-300 text-sm">• 데미지 스킨 추출권으로 추출 가능</p>
                                    </div>
                                </div>

                                {/* 30만 마리 - 마약 칭호 */}
                                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-5 border-2 border-yellow-500/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-white text-lg">30만 마리 처치 미션</h3>
                                        <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full animate-pulse">
                                            마약 칭호
                                        </span>
                                    </div>

                                    {/* 난 아주 헤이스트 칭호 이미지 */}
                                    <div className="mb-4">
                                        <div className="rounded-lg overflow-hidden border-2 border-yellow-500/50 shadow-xl bg-slate-900/50">
                                            <Image
                                                src="/images/blog/haste_reward_300k_title.png"
                                                alt="난 아주 헤이스트 칭호 - 30만 마리 처치 보상"
                                                width={600}
                                                height={400}
                                                className="w-full h-auto"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-500/50">
                                        <p className="text-yellow-400 font-bold mb-3 text-lg">👑 난 아주 헤이스트 칭호 교환권</p>
                                        <div className="space-y-2 text-slate-300">
                                            <p className="text-white font-bold">칭호 정보:</p>
                                            <p className="text-sm">• 칭호 자체는 <span className="text-green-400 font-bold">영구 사용 가능</span></p>
                                            <p className="text-sm">• 옵션은 교환권 사용 시점부터 <span className="text-yellow-400 font-bold">30일간 유지</span></p>
                                        </div>
                                        <div className="mt-4 bg-slate-900/50 rounded-lg p-4 border border-yellow-600/50">
                                            <p className="text-yellow-400 font-bold mb-2">📊 칭호 옵션 (30일 지속)</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                                <p className="text-slate-300">• 올스탯 <span className="text-green-400 font-bold">+50</span></p>
                                                <p className="text-slate-300">• 공격력/마력 <span className="text-green-400 font-bold">+20</span></p>
                                                <p className="text-slate-300">• 보스 공격 시 데미지 <span className="text-red-400 font-bold">+30%</span></p>
                                                <p className="text-slate-300">• 방어율 무시 <span className="text-red-400 font-bold">+30%</span></p>
                                                <p className="text-slate-300 md:col-span-2">• 최대 HP/최대 MP <span className="text-blue-400 font-bold">+2,500</span></p>
                                            </div>
                                        </div>
                                        <div className="mt-3 bg-red-900/20 border border-red-500/50 rounded-lg p-3">
                                            <p className="text-red-300 font-bold text-sm">🔥 보스전에 매우 유용한 마약급 칭호입니다!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4 mt-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-blue-300 font-bold mb-1">보상 수령 안내</p>
                                        <p className="text-sm text-slate-300">
                                            • 모든 보상 아이템은 <span className="text-yellow-400 font-bold">메이플ID당 한 번만 수령</span> 가능합니다.
                                        </p>
                                        <p className="text-sm text-slate-300">
                                            • 필드 혜택과 스페셜 미션 보상은 <span className="text-red-400 font-bold">2026년 3월 18일(수) 오후 11시 59분</span>까지 확인 및 수령 가능합니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Summary */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-orange-500 rounded-xl p-4 sm:p-6 md:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center flex items-center justify-center gap-2">
                            <Sparkles className="w-6 h-6 text-orange-400" />
                            4줄 요약
                        </h2>
                        <div className="space-y-4 text-slate-300">
                            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 sm:p-4">
                                <p className="text-sm sm:text-base md:text-lg">
                                    <span className="text-red-400 font-bold">1️⃣ 피버 타임(일 1회)</span>은 경험치 도핑 없이 <span className="text-yellow-400 font-bold">가장 높은 레벨 사냥터</span>에서 쓰세요.
                                    (에스페시아 에픽보다 많이 먹음)
                                </p>
                            </div>
                            <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-3 sm:p-4">
                                <p className="text-sm sm:text-base md:text-lg">
                                    <span className="text-purple-400 font-bold">2️⃣ 트레져 박스(일 3회)</span>는 '<span className="text-blue-400 font-bold">레어</span>' 등급만 떠도
                                    '<span className="text-yellow-400 font-bold">폴로 레전드리</span>' 급 경험치입니다.
                                </p>
                            </div>
                            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-3 sm:p-4">
                                <p className="text-sm sm:text-base md:text-lg">
                                    <span className="text-yellow-400 font-bold">3️⃣ 30만 마리</span>를 채워서 <span className="text-green-400 font-bold">솔 에르다 2배</span>와
                                    <span className="text-red-400 font-bold"> 보약 칭호(보공/방무 30%)</span>를 꼭 챙기세요!
                                </p>
                            </div>
                            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-3 sm:p-4">
                                <p className="text-sm sm:text-base md:text-lg">
                                    <span className="text-blue-400 font-bold">4️⃣ 빠르게 30만 마리</span>를 잡으면 <span className="text-green-400 font-bold">헤이스트 필드 효과를 오래 지속</span>할 수 있어서 좋습니다.
                                </p>
                            </div>
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-slate-400 text-lg">
                                이번 헤이스트 기간, 다들 폭업하시길 바랍니다! 🔥
                            </p>
                        </div>

                        {/* SEO Keywords */}
                        <div className="mt-8 pt-6 border-t border-slate-700">
                            <p className="text-slate-500 text-sm text-center leading-relaxed">
                                <span className="text-slate-600">#</span>메이플스토리 <span className="text-slate-600">#</span>헤이스트비욘드
                                <span className="text-slate-600"> #</span>헤이스트BEYOND <span className="text-slate-600">#</span>사냥이벤트
                                <span className="text-slate-600"> #</span>피버타임 <span className="text-slate-600">#</span>트레져박스
                                <span className="text-slate-600"> #</span>솔에르다2배 <span className="text-slate-600">#</span>경험치이벤트
                                <span className="text-slate-600"> #</span>레벨업 <span className="text-slate-600">#</span>폭업
                                <span className="text-slate-600"> #</span>메이플이벤트 <span className="text-slate-600">#</span>30만마리
                                <span className="text-slate-600"> #</span>헤이스트칭호 <span className="text-slate-600">#</span>보약칭호
                                <span className="text-slate-600"> #</span>보스칭호 <span className="text-slate-600">#</span>방무칭호
                                <span className="text-slate-600"> #</span>카산드라수정구슬 <span className="text-slate-600">#</span>헤이스트인페르노
                                <span className="text-slate-600"> #</span>헤이스트효율 <span className="text-slate-600">#</span>트레져박스효율
                                <span className="text-slate-600"> #</span>헤이스트피버타임효율 <span className="text-slate-600">#</span>메이플가이드
                                <span className="text-slate-600"> #</span>2026년2월이벤트
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <div className="border-t border-slate-700 pt-8 mt-12">
                    <div className="text-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-500 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            블로그 메인으로
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
