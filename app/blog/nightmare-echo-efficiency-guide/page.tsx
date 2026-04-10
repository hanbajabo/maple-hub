'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, Flame, Gift, Zap, TrendingUp, AlertCircle, Check, Star, ShoppingBag, Repeat, DollarSign } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function NightmareEchoEfficiencyGuide() {
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
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">
                            이벤트 가이드
                        </span>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                            효율 분석
                        </span>
                        <span className="text-slate-500 text-sm mt-0.5">2026년 4월 16일 적용 예정</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                        <Image 
                            src="/images/blog/nightmare_echo_icon.png" 
                            alt="악몽의 메아리 아이콘" 
                            width={48} 
                            height={48} 
                            className="inline-block align-middle mr-3 drop-shadow-md pb-1"
                        />
                        악몽의 메아리 효율 완벽 정리
                    </h1>
                    <p className="text-lg text-slate-400">
                        악몽의 메아리 경험치의 비밀, 레벨별 상승량, 무자본 vs 과금 투트랙 전략까지!
                    </p>
                </header>

                {/* 이벤트 기간 */}
                <div className="mb-12 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-2 border-purple-500/50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Calendar className="w-6 h-6 text-purple-400" />
                        <h2 className="text-xl font-bold text-purple-400">이벤트 기간</h2>
                    </div>

                    <div className="flex justify-center mb-6">
                        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-3 border border-slate-700 shadow-xl inline-block">
                            <Image
                                src="/images/blog/nightmare_echo.png"
                                alt="[사냥 이벤트] 악몽의 메아리"
                                width={400}
                                height={100}
                                className="rounded-lg object-contain"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-slate-300 text-lg">
                            <span className="text-white font-bold">2026년 4월 16일(목) 점검 후</span> ~{' '}
                            <span className="text-white font-bold">6월 17일(수) 오후 11시 59분</span>
                        </p>
                        <div className="bg-purple-900/20 border border-purple-500/50 rounded-lg p-4">
                            <p className="text-purple-300 text-sm flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>
                                    참여 대상: <span className="font-bold text-white">101레벨 이상</span> 캐릭터 또는 스토리 퀘스트 챕터 2를 완료한 제로 캐릭터
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* 악몽의 메아리란? */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-2 border-indigo-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                                <Zap className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-indigo-400">
                                    악몽의 메아리란?
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-6 items-start">
                                {/* 악몽의 메아리 툴팁 이미지 */}
                                <div className="flex justify-center">
                                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl inline-block">
                                        <Image
                                            src="/images/blog/nightmare_echo_tooltip.png"
                                            alt="악몽의 메아리 아이템 설명"
                                            width={500}
                                            height={800}
                                            className="rounded-lg object-contain w-full h-auto"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 w-full">
                                    {/* 핵심 스펙 */}
                                    <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                            <Flame className="w-5 h-5 text-orange-400" />
                                            핵심 스펙
                                        </h3>
                                        <ul className="space-y-2 text-slate-300">
                                            <li className="flex items-start gap-2">
                                                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                                <span><span className="text-white font-bold">100초 동안</span> '악몽의 클리너' 몬스터를 소환하는 아이템</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                                <span>총 <span className="text-white font-bold">190마리</span> 소환으로 추정 (기존 경험치 부스터와 동일)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                                <span>메이플ID당 <span className="text-red-400 font-bold">일일 최대 3회</span> 사용 (매일 자정 초기화)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                                <span>
                                                    <span className="text-yellow-400 font-bold">1회 교환 가능!</span> → 경매장에서 사고팔 수 있어요
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                                <span>
                                                    특수 효과: <span className="text-purple-400 font-bold">루시드 자동 스킬</span> (렌드 레버리, 페어리 더스트) 자동 발동
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2 mt-4 pt-3 border-t border-slate-700">
                                                <span className="text-yellow-400 font-bold text-sm">※ ‘악몽의 클리너’는 어떠한 추가 경험치 효과도 적용 받지 않습니다.</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-yellow-300 font-bold mb-1">사용 조건</p>
                                                <p className="text-sm text-slate-300">
                                                    이벤트 참여 + <span className="text-white font-bold">5차 전직</span> + <span className="text-white font-bold">또 하나의 힘</span> + <span className="text-white font-bold">아케인포스 퀘스트 완료</span>한 <span className="text-yellow-400 font-bold">200레벨 이상</span> 캐릭터 또는 챕터 2 완료한 200레벨 이상 제로만 사용 가능
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-red-300 font-bold mb-1">중복 불가 아이템</p>
                                                <p className="text-sm text-slate-300">
                                                    VIP 부스터, HEXA 부스터, 다른 악몽의 메아리와 <span className="text-red-400 font-bold">동시 사용 불가</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 참여 방법 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-2 border-green-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <Check className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-green-400">
                                    이벤트 참여 방법
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">📋 STEP 1 — 이벤트 참여 신청</h3>
                                <p className="text-slate-300 text-sm">
                                    이벤트 리스트에서 '[사냥 이벤트] 악몽의 메아리'를 선택 후 <span className="text-green-400 font-bold">'참여하기'</span> 버튼 클릭
                                </p>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">🌙 STEP 2 — 메아리 드롭 획득</h3>
                                <p className="text-slate-300 text-sm mb-4">
                                    <span className="text-yellow-400 font-bold">101레벨 이상</span> 캐릭터로 레벨 범위 몬스터를 처치하면 <span className="text-white font-bold">정해진 확률</span>로 '악몽의 메아리'가 드롭
                                </p>

                                {/* 드롭 이펙트 이미지 */}
                                <div className="mb-4 rounded-xl overflow-hidden border border-slate-700 shadow-xl max-w-2xl mx-auto bg-black">
                                    <Image
                                        src="/images/blog/nightmare_echo_effect.png"
                                        alt="악몽의 메아리 드롭 이펙트"
                                        width={800}
                                        height={450}
                                        className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
                                    />
                                </div>

                                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded p-3">
                                    <p className="text-sm text-yellow-300 flex items-start gap-2">
                                        <span className="text-yellow-400 font-bold">※</span>
                                        <span>방금 보신 것처럼 드롭 시 화면을 가리는 <span className="font-bold text-white">특수한 이펙트</span>가 등장하므로 절대 놓치지 않도록 주의하세요!</span>
                                    </p>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">⚡ STEP 3 — 메아리 사용</h3>
                                <p className="text-slate-300 text-sm mb-4">
                                    레벨 범위 몬스터가 나오는 필드에서 '악몽의 메아리' 사용 → <span className="text-purple-400 font-bold">100초 동안</span> '악몽의 클리너'가 소환되어 대량 경험치 획득!
                                </p>

                                {/* 클리너 소환 이미지 */}
                                <div className="rounded-xl overflow-hidden border border-slate-700 shadow-xl max-w-2xl mx-auto bg-black">
                                    <Image
                                        src="/images/blog/nightmare_echo_usage.png"
                                        alt="악몽의 클리너 소환 모습"
                                        width={800}
                                        height={450}
                                        className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 광고 */}
                <div className="my-12">
                    <InArticleAd dataAdSlot="1234567890" />
                </div>

                {/* 핵심: 470배의 비밀 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-2 border-yellow-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                <Star className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-yellow-400">
                                    💡 경험치 효과 없어도 좋은 이유
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-5">
                                <p className="text-red-300 text-base font-bold mb-2">많은 분들이 처음에 오해하시는 것</p>
                                <p className="text-slate-200 text-lg italic tracking-wide">
                                    "엥? 경험치 쿠폰이랑 경뿌가 안 먹힌다고요? 그럼 안좋은거 아닌가요?"
                                </p>
                            </div>

                            <div className="bg-green-900/20 border-2 border-green-500/50 rounded-xl p-5">
                                <p className="text-green-300 font-bold text-lg mb-3 flex items-center gap-2">
                                    <Zap className="w-5 h-5" />
                                    정반대입니다. 이것은 엄청난 축복입니다!
                                </p>
                                <div className="bg-slate-900/60 rounded-lg p-5 text-center">
                                    <p className="text-white font-bold text-sm mb-2">악몽의 클리너 1마리당 경험치</p>
                                    <p className="text-4xl sm:text-5xl font-black text-yellow-400 mb-1">470배</p>
                                    <p className="text-slate-200 text-sm mb-2">(47,000%) — 동렙 일반 몬스터 대비 <span className="text-yellow-400 font-bold">정확히 고정</span></p>
                                    <p className="text-sm text-slate-300 font-medium">※ 레벨260 이상 사냥터 기준</p>
                                </div>
                                <p className="text-slate-300 text-sm mt-4">
                                    경험치 쿠폰, 경뿌, 정펜, 혈맹의 반지 등 어떤 경험치 도핑을 하지 않더라도, 아이템을 사용하는 순간 <span className="text-yellow-400 font-bold">무조건 470배의 경험치</span>가 들어온다는 뜻입니다!
                                </p>
                                <div className="mt-3 bg-blue-900/20 border border-blue-500/30 rounded p-3">
                                    <p className="text-blue-100 text-xs flex items-start gap-2 leading-relaxed">
                                        <span className="text-blue-400 flex-shrink-0">💡</span>
                                        <span>
                                            물론 필드에 일반 몬스터도 함께 나오기 때문에 경험치 도핑을 하면 전체적으로 더 유리합니다.<br />
                                            다만, <span className="text-yellow-300 font-bold">축복의 룬</span> 효과도 받지 않기 때문에 룬을 사용한 상태에서 메아리를 사용하지 않아도 됩니다.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 레벨별 경험치 효율표 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-indigo-900/50 to-violet-900/50 border-2 border-indigo-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">
                                    260~295레벨 메아리 1회 경험치 효율표
                                </h2>
                            </div>
                        </div>

                        <div className="mb-4 bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
                            <p className="text-yellow-300 text-sm flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>
                                    <span className="font-bold">조건:</span> 100초 지속 / 총 190마리 처치 / 470배 고정 배율 적용
                                    <br />
                                    <span className="text-slate-400 text-xs">(※ 190마리는 기존 경험치 부스터와 동일하게 추정, 정확하지 않을 수 있음)</span>
                                </span>
                            </p>
                        </div>

                        <div className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-indigo-900/40">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-indigo-300 font-bold whitespace-nowrap">레벨 (주요 사냥터)</th>
                                            <th className="px-4 py-3 text-right text-indigo-300 font-bold whitespace-nowrap">1회 총 경험치</th>
                                            <th className="px-4 py-3 text-right text-indigo-300 font-bold whitespace-nowrap">1회 상승(%)</th>
                                            <th className="px-4 py-3 text-right text-indigo-300 font-bold whitespace-nowrap">일일 3회 누적</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700">
                                        {[
                                            { level: '260 (세르니움)', exp: '1,540억 8,366만', single: '약 8.89%', triple: '약 26.6%', tier: 'high' },
                                            { level: '265 (아르크스)', exp: '1,872억 5,888만', single: '약 7.99%', triple: '약 23.9%', tier: 'high' },
                                            { level: '270 (오디움)', exp: '2,225억 3,810만', single: '약 4.11%', triple: '약 12.3%', tier: 'high' },
                                            { level: '275 (도원경)', exp: '2,592억 4,004만', single: '약 2.27%', triple: '약 6.81%', tier: 'medium' },
                                            { level: '280 (아르테리아)', exp: '3,068억 3,721만', single: '약 0.91%', triple: '약 2.73%', tier: 'medium' },
                                            { level: '285 (카르시온)', exp: '3,627억 2,784만', single: '약 0.36%', triple: '약 1.08%', tier: 'low' },
                                            { level: '290 (탈라하트)', exp: '4,280억 4,329만', single: '약 0.14%', triple: '약 0.43%', tier: 'low' },
                                            { level: '295 (기어드락)', exp: '5,039억 3,954만', single: '약 0.05%', triple: '약 0.17%', tier: 'low' },
                                        ].map((row) => (
                                            <tr key={row.level} className="hover:bg-slate-800/50 transition-colors whitespace-nowrap">
                                                <td className="px-4 py-3 text-white font-bold">Lv. {row.level}</td>
                                                <td className="px-4 py-3 text-right text-slate-300 font-mono text-xs">{row.exp}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <span className={
                                                        row.tier === 'high'
                                                            ? 'text-green-400 font-bold'
                                                            : row.tier === 'medium'
                                                                ? 'text-yellow-400 font-bold'
                                                                : 'text-white'
                                                    }>
                                                        🔥 {row.single}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <span className={
                                                        row.tier === 'high'
                                                            ? 'text-green-300 font-bold'
                                                            : row.tier === 'medium'
                                                                ? 'text-yellow-300'
                                                                : 'text-white'
                                                    }>
                                                        {row.triple}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 bg-green-400 rounded-full" />
                                <span className="text-slate-300">고효율 구간 (260~274레벨): 1회에 4~9%씩 상승</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                                <span className="text-slate-300">중효율 구간 (275~284레벨): 1회에 0.9~2.3% 상승</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 bg-slate-400 rounded-full" />
                                <span className="text-white">고레벨 구간 (285레벨 이상): 1회에 0.5% 미만</span>
                            </div>
                        </div>

                        {/* 극한 효율 전략 */}
                        <div className="mt-6 bg-yellow-900/20 border border-yellow-500/50 rounded-xl p-5">
                            <h3 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5 flex-shrink-0" />
                                ⚡ 극한 효율 전략
                            </h3>
                            <div className="space-y-3 text-sm">
                                <p className="text-white leading-relaxed">
                                    경험치 패널티를 받지 않기 때문에, <span className="text-yellow-400 font-bold">젠컷이 가능한 가장 높은 레벨의 사냥터</span>에서 사용하는 것이 최고 효율!
                                </p>
                                <div className="bg-slate-900/50 rounded p-4 border border-slate-700">
                                    <p className="text-green-400 font-bold mb-1">예시</p>
                                    <p className="text-slate-300">276레벨 캐릭터 → <span className="text-white font-bold">279레벨 사냥터에서 부스터 사용 후</span> 평소 사냥터로 복귀</p>
                                </div>
                                <p className="text-slate-300 text-sm mt-2">
                                    (다만 큰 차이가 없으므로 귀찮다면 그냥 원래 사냥터에서 사용하는 것을 추천)
                                </p>
                            </div>
                        </div>

                        {/* 270레벨 하이라이트 */}
                        <div className="mt-5 bg-gradient-to-r from-green-900/40 to-teal-900/40 border-2 border-green-500/50 rounded-xl p-5">
                            <p className="text-green-300 font-bold mb-2 text-center text-lg">🎯 가장 인상적인 수치: 270레벨 기준</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-900/50 rounded-lg p-3 sm:p-4 text-center">
                                    <p className="text-slate-400 text-xs mb-1">메아리 1개 사용 시</p>
                                    <p className="text-white text-2xl sm:text-3xl font-black">4.11%</p>
                                    <p className="text-slate-400 text-[10px] sm:text-xs mt-1">100초 동안 사냥 시</p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-3 sm:p-4 text-center">
                                    <p className="text-slate-400 text-xs mb-1">하루 3개 사용 시</p>
                                    <p className="text-green-400 text-2xl sm:text-3xl font-black">12.3%</p>
                                    <p className="text-slate-400 text-[10px] sm:text-xs mt-1">하루 300초 사냥으로!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 광고 */}
                <div className="my-12">
                    <InArticleAd dataAdSlot="1234567890" />
                </div>

                {/* 무자본 vs 과금 투트랙 전략 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-2 border-blue-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-blue-400">
                                    💰 무자본 vs 과금, 완벽한 투트랙 전략
                                </h2>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* 과금 유저 */}
                            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/40 rounded-xl p-5">
                                <p className="text-yellow-400 font-black text-lg mb-3 flex items-center gap-2">
                                    <Star className="w-5 h-5" />
                                    초고속 렙업을 원하는 랭커 & 과금 유저
                                </p>
                                <ul className="space-y-2 text-slate-300 text-sm">
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                        <span>매일 <span className="text-white font-bold">자정</span>이 지나면 경매장으로 달려가세요!</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                        <span>하루 <span className="text-yellow-400 font-bold">3번의 기회</span>를 무조건 꽉꽉 채우는 것이 핵심</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                        <span>270레벨 기준, 메아리 3개만 구매해도 사냥 없이 매일 <span className="text-green-400 font-bold">12.3%</span> 확정!</span>
                                    </li>
                                </ul>
                            </div>

                            {/* 무자본 유저 */}
                            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/40 rounded-xl p-5">
                                <p className="text-green-400 font-black text-lg mb-3 flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5" />
                                    메소를 쓸어 담고 싶은 무자본 유저
                                </p>
                                <ul className="space-y-2 text-slate-300 text-sm">
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                        <span>사냥 중 드롭된 '악몽의 메아리'는 <span className="text-yellow-400 font-bold">1회 교환 가능</span> (경매장 판매 OK)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                        <span>초반에는 상위권 유저들의 수요로 인해 <span className="text-white font-bold">부르는 게 값</span>일 확률이 높음</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                        <span>렙업보다 스펙업이 우선이라면 과감하게 팔아서 <span className="text-green-400 font-bold">메소 확보</span>의 기회!</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 거래 관련 주의사항 */}
                        <div className="mt-5 bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                <Repeat className="w-4 h-4 text-blue-400" />
                                거래 방식 정리
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between p-2 bg-blue-900/20 rounded-lg border border-blue-500/20">
                                    <span className="text-slate-300">드롭 획득 아이템</span>
                                    <span className="text-yellow-400 font-bold">1회 교환 가능 → 경매장 판매 O</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg border border-slate-700">
                                    <span className="text-slate-300">거래 완료 후</span>
                                    <span className="text-slate-400">월드 내 캐릭터 간 이동만 가능</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-red-900/20 rounded-lg border border-red-500/20">
                                    <span className="text-slate-300">사용 및 거래 마감</span>
                                    <span className="text-red-400 font-bold">2026년 6월 17일 23:59</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 익스프레스 부스터와 비교 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                <Zap className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-purple-400">
                                    익스프레스 부스터와 비교하면?
                                </h2>
                                <p className="text-slate-400 text-sm">결론은 '약 2배' 압도적 우위!</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-4">마리당 획득 경험치 (가중치) 비교</h3>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-slate-300 text-sm">⚡ 익스프레스 부스터</span>
                                            <span className="text-slate-400 text-sm font-bold">192배 ~ 268배 (레벨에 따라 차등)</span>
                                        </div>
                                        <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                                            <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full" style={{ width: '57%' }} />
                                        </div>
                                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                                            <span>Lv. 260 (세르니움): 192배</span>
                                            <span>Lv. 270 (오디움): 268배</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-white font-bold text-sm">😴 악몽의 메아리</span>
                                            <span className="text-yellow-400 text-sm font-black">고정 470배! (레벨 무관)</span>
                                        </div>
                                        <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                                            <div className="bg-gradient-to-r from-yellow-600 to-orange-400 h-full rounded-full" style={{ width: '100%' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                                    <p className="text-orange-300 font-bold mb-2">260레벨 구간 (세르니움)</p>
                                    <p className="text-white text-2xl font-black mb-1">2.44배</p>
                                    <p className="text-slate-400 text-xs">192배 → 470배, 가장 차이가 큰 구간</p>
                                </div>
                                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                                    <p className="text-purple-300 font-bold mb-2">270레벨 구간 (오디움, 최고효율)</p>
                                    <p className="text-white text-2xl font-black mb-1">1.75배</p>
                                    <p className="text-slate-400 text-xs">268배 → 470배, 부스터 최고효율 구간과 비교해도</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 rounded-xl p-5 border-2 border-yellow-500/50 text-center">
                                <p className="text-yellow-300 font-bold mb-2">🎉 최종 결론</p>
                                <p className="text-white text-base sm:text-lg font-bold leading-relaxed">
                                    '악몽의 메아리' 1개 ≈ '익스프레스 부스터' <span className="text-yellow-400 text-2xl sm:text-3xl font-black align-middle">2개</span>를<br className="sm:hidden" />
                                    동시에 터뜨리는 파급력
                                </p>
                                <p className="text-yellow-200 text-sm font-medium mt-4 bg-black/20 inline-block px-4 py-2 rounded-lg">
                                    풀도핑을 한 '영겁의 황금 태엽'과 비슷한 효과를 가지고 있다고 봐도 무방합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 핵심 요약 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700/50 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-2xl font-black text-white mb-6">💡 핵심 요약</h2>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white font-bold mb-1">1. 경험치 쿠폰 없이도 470배 고정!</p>
                                    <p className="text-sm text-slate-400">어떤 경험치 도핑 없이도 동렙 몬스터의 470배 경험치가 무조건 들어옴</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white font-bold mb-1">2. 과금 유저는 매일 자정 경매장 출동!</p>
                                    <p className="text-sm text-slate-400">하루 3개 구매 → 270레벨 기준 사냥 없이 매일 12.3% 확정 상승</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white font-bold mb-1">3. 무자본 유저는 드롭 후 경매장 판매!</p>
                                    <p className="text-sm text-slate-400">초반 수요 폭발로 고가 거래 예상 — 스펙업 우선이라면 팔아서 메소 확보가 정답</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white font-bold mb-1">4. 익스프레스 부스터의 약 2배!</p>
                                    <p className="text-sm text-slate-400">소환 마릿수는 동일(190마리 추정), 마리당 경험치 질이 압도적으로 우위</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white font-bold mb-1">5. 사용 마감 — 2026년 6월 17일까지!</p>
                                    <p className="text-sm text-slate-400">획득 및 사용 모두 6월 17일 23:59까지, 기간 내 다 소진할 것</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 검색 태그 (SEO & 노출 최적화) */}
                <div className="mb-12 flex flex-wrap gap-2 justify-center max-w-3xl mx-auto px-4">
                    {['#메이플스토리', '#악몽의메아리', '#메이플경험치', '#메이플사냥이벤트', '#익스프레스부스터', '#악몽의클리너', '#부캐육성', '#무자본돈벌기'].map(tag => (
                        <span key={tag} className="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 rounded-full text-sm transition-colors cursor-default select-none">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* 관련 링크 */}
                <div className="mb-8 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-bold transition-all transform hover:scale-105"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        블로그 목록으로 돌아가기
                    </Link>
                </div>
            </article>
        </div>
    );
}
