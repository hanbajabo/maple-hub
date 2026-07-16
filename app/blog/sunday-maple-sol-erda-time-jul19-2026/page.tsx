'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Gift, AlertCircle, CheckCircle, Calendar, Sparkles, Zap, Trophy, Star, Swords } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function SundayMapleSolErdaTimeJul19() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <Link prefetch={false}
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
                            스페셜 이벤트
                        </span>
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full">
                            솔 에르다 타임
                        </span>
                        <span className="text-slate-500 text-sm">2026년 7월 19일</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                        ⚡ 7월 19일 '솔 에르다 타임' 완벽 가이드!
                    </h1>
                    <p className="text-lg text-slate-400">
                        이번 주 일요일도 놓치지 마세요! 접속 3시간으로 솔 에르다 조각 100개 + 솔 에르다 1개 획득 + 몬파 경험치 400% 혜택까지!
                    </p>
                </header>

                {/* Introduction */}
                <div className="mb-12 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-pink-900/30 border-2 border-purple-500/50 rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-75"></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-black text-purple-400 mb-6 flex items-center gap-2">
                            <Sparkles className="w-8 h-8 animate-bounce" />
                            📝 이벤트 개요
                        </h2>

                        <div className="bg-slate-900/70 rounded-xl p-6 space-y-4 text-slate-300 leading-relaxed">
                            <p className="font-bold text-white text-lg">안녕하세요! 메이플 용사님들!</p>

                            <p>이번 주 일요일(7월 19일) 진행되는 <strong className="text-purple-400">썬데이 메이플</strong>,
                                <strong className="text-yellow-400"> '솔 에르다 타임'</strong>의 상세 공지가 확정되었습니다!</p>

                            <p><strong className="text-green-400">접속만 해도 6차 전직 재료를 퍼주는 이벤트</strong>인 데다,
                                이번엔 <strong className="text-orange-400">사냥 솔 에르다 3배</strong>와 <strong className="text-cyan-400">몬스터파크 경험치 추가 250%</strong> 혜택까지 함께 진행됩니다. 꼭 챙겨가세요!</p>

                            <div className="bg-yellow-900/30 border-2 border-yellow-500/50 rounded-lg p-5 mt-6">
                                <p className="font-bold text-yellow-400 flex items-center gap-2 mb-3">
                                    <Gift className="w-5 h-5" />
                                    핵심 요약
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                        <p>접속 3시간 누적 시 <strong className="text-white">솔 에르다 조각 100개 + 솔 에르다 1개</strong></p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                        <p>보상 수령은 <strong className="text-white">7월 22일(수)까지 가능</strong></p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                        <p>사냥 솔 에르다 획득량 <strong className="text-white">3배 증가</strong></p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                        <p>몬스터파크 클리어 경험치 <strong className="text-white">총 400% 적용</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event Overview */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-2 border-blue-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-blue-400">
                                    1. 이벤트 기간
                                </h2>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <div className="flex items-start gap-3 mb-3">
                                    <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-white mb-1">접속 시간 누적 기간</p>
                                        <p className="text-slate-300 text-sm">
                                            <strong className="text-yellow-400">2026년 7월 19일(일)</strong>
                                        </p>
                                        <p className="text-slate-400 text-xs mt-1">오전 0시 ~ 오후 11시 59분</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <div className="flex items-start gap-3 mb-3">
                                    <Gift className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-white mb-1">보상 수령 가능 기간</p>
                                        <p className="text-slate-300 text-sm">
                                            <strong className="text-green-400">7월 19일(일) ~ 7월 22일(수)</strong>
                                        </p>
                                        <p className="text-slate-400 text-xs mt-1">7월 22일(수) 오후 11시 59분까지</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 bg-blue-900/30 border border-blue-500/40 rounded-lg p-4">
                            <p className="text-blue-300 text-sm">
                                💡 <strong>이벤트 진행 현황은 메이플 ID 내 모든 캐릭터가 공유합니다.</strong> 어떤 캐릭터로 접속해도 시간이 합산됩니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Event Schedule Image */}
                <div className="mb-12 flex justify-center">
                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-2xl max-w-2xl w-full">
                        <Image
                            src="/images/blog/sunday-maple-sol-erda-schedule-jul19.png"
                            alt="솔 에르다 타임 일정 안내"
                            width={800}
                            height={450}
                            className="mx-auto rounded-lg"
                        />
                    </div>
                </div>

                {/* Main Rewards - Sol Erda Time */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-2 border-yellow-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-yellow-400">
                                    🎁 혜택 1. 솔 에르다 타임
                                </h2>
                                <p className="text-slate-400 text-sm mt-1">접속 시간으로 솔 에르다 재료 획득!</p>
                            </div>
                        </div>

                        <div className="bg-slate-900/70 rounded-xl p-6 mb-6">
                            <p className="text-slate-300 mb-4">
                                접속을 유지하기만 하면 <strong className="text-blue-400">전용 UI</strong>를 통해 보상이 차오릅니다.
                            </p>

                            <div className="space-y-3">
                                <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <Zap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-blue-400 mb-1">기본 보상</p>
                                            <p className="text-slate-300 text-sm">
                                                접속 <strong className="text-white">2분마다</strong> 솔 에르다 조각 교환권 1개 누적
                                            </p>
                                            <p className="text-slate-400 text-xs mt-1">최대 90개까지 누적 (= 3시간 접속)</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <Star className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-purple-400 mb-1">2시간 달성 보너스</p>
                                            <p className="text-slate-300 text-sm">
                                                솔 에르다 조각 교환권 <strong className="text-white">10개 추가 지급</strong> (누적 개수에 자동 합산)
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-yellow-400 mb-1">3시간 달성 보너스</p>
                                            <p className="text-slate-300 text-sm">
                                                <strong className="text-white">솔 에르다 1개 (완제품)</strong> 추가 지급
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-2 border-green-400 rounded-xl p-6 text-center">
                            <p className="text-green-400 font-bold text-lg mb-2">💎 최종 획득 보상 (3시간 접속 시)</p>
                            <p className="text-white text-2xl font-black">
                                솔 에르다 조각 100개 + 솔 에르다 1개
                            </p>
                        </div>
                    </div>
                </section>

                {/* Event UI Image */}
                <div className="mb-12 flex justify-center">
                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-2xl">
                        <Image
                            src="/images/blog/sunday-maple-sol-erda-ui.png"
                            alt="솔 에르다 타임 누적 시간 UI"
                            width={400}
                            height={600}
                            className="mx-auto rounded-lg"
                        />
                        <p className="text-center text-slate-400 text-sm mt-4">
                            💡 접속 시간을 실시간으로 확인할 수 있는 전용 UI
                        </p>
                    </div>
                </div>

                {/* Benefit 2 - Hunting x3 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-2 border-orange-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                                <Zap className="w-6 h-6 text-orange-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-orange-400">
                                    🎁 혜택 2. 사냥 솔 에르다 3배 증가
                                </h2>
                                <p className="text-slate-400 text-sm mt-1">사냥 재획러라면 이날이 기회!</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-slate-900/70 rounded-xl p-5 border border-orange-500/30">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-slate-300">
                                            사냥을 통해 획득하는 솔 에르다의 획득량이 <strong className="text-white">3배로 증가</strong>합니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-red-900/20 border border-red-500/40 rounded-lg p-4">
                                <p className="text-red-300 text-sm font-bold mb-1">⚠️ 주의</p>
                                <p className="text-slate-300 text-sm">
                                    사냥 <strong className="text-white">외</strong> 방법(보스 처치, 아이템 사용 등)으로 획득한 솔 에르다는 3배 혜택이 적용되지 않습니다.
                                </p>
                            </div>
                            <div className="bg-green-900/20 border border-green-500/40 rounded-lg p-4">
                                <p className="text-green-300 text-sm">
                                    💡 <strong>메이플 어드벤처 - 아티팩트의 힘</strong> 사용 시 솔 에르다 획득량 증가 혜택과 함께 중복 적용 가능합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefit 3 - Monster Park XP */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border-2 border-cyan-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                                <Swords className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-cyan-400">
                                    🎁 혜택 3. 몬스터파크 경험치 추가 250%
                                </h2>
                                <p className="text-slate-400 text-sm mt-1">일요일 몬파는 최고 효율!</p>
                            </div>
                        </div>

                        <div className="bg-slate-900/70 rounded-xl p-6 mb-4">
                            <p className="text-slate-300 mb-4">이번 일요일 몬스터파크는 아래와 같이 경험치 혜택이 누적 적용됩니다.</p>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between bg-slate-800/60 rounded-lg px-4 py-2">
                                    <span className="text-slate-300 text-sm">평일 클리어 경험치</span>
                                    <span className="text-white font-bold">100%</span>
                                </div>
                                <div className="flex items-center justify-between bg-blue-900/30 rounded-lg px-4 py-2">
                                    <span className="text-blue-300 text-sm">일요일 경험치 혜택</span>
                                    <span className="text-white font-bold">+50%</span>
                                </div>
                                <div className="flex items-center justify-between bg-purple-900/30 rounded-lg px-4 py-2">
                                    <span className="text-purple-300 text-sm">썬데이 메이플 추가 혜택</span>
                                    <span className="text-white font-bold">+250%</span>
                                </div>
                                <div className="flex items-center justify-between bg-gradient-to-r from-green-900/60 to-emerald-900/60 border border-green-400 rounded-lg px-4 py-3 mt-2">
                                    <span className="text-green-300 font-bold">총 합산 경험치</span>
                                    <span className="text-green-400 text-xl font-black">총 400%</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-green-900/20 border border-green-500/40 rounded-lg p-4">
                                <p className="text-green-300 text-sm">
                                    💡 <strong>폴로와 프리토, 불꽃 늑대, 메이플 어드벤처 - 아티팩트의 힘</strong> 경험치 증가 혜택과 함께 중복 적용 가능합니다.
                                </p>
                            </div>
                            <div className="bg-red-900/20 border border-red-500/40 rounded-lg p-4">
                                <p className="text-red-300 text-sm font-bold mb-1">⚠️ 주의</p>
                                <p className="text-slate-300 text-sm">
                                    <strong className="text-white">&lt;익스트림 몬스터파크&gt;</strong> 퀘스트에는 썬데이 메이플 몬스터파크 경험치 추가 효과가 <strong className="text-red-400">적용되지 않습니다.</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AdSense */}
                <InArticleAd dataAdSlot="8162808816" className="my-12" />

                {/* Important Details */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 border-2 border-red-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-red-400">
                                    필독! 아이템 주의사항
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Reward claim period */}
                            <div className="bg-slate-900/70 rounded-xl p-6 border-2 border-green-500/50">
                                <div className="flex items-start gap-3 mb-4">
                                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-green-400 mb-3">
                                            ✅ 보상 수령 기간이 넉넉합니다!
                                        </h3>
                                        <div className="space-y-2 text-slate-300">
                                            <div className="flex items-start gap-2">
                                                <span className="text-yellow-400 font-bold min-w-[120px]">접속 누적:</span>
                                                <span>7월 19일(일) <strong className="text-white">하루 동안만</strong> 가능</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="text-green-400 font-bold min-w-[120px]">보상 수령:</span>
                                                <span><strong className="text-white">7월 22일(수) 오후 11시 59분까지</strong> 가능</span>
                                            </div>
                                        </div>
                                        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 mt-4">
                                            <p className="text-green-300 text-sm">
                                                💡 <strong>일요일에 접속만 켜두고, 보상은 수요일까지 여유롭게 받으셔도 됩니다!</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shared progress */}
                            <div className="bg-slate-900/70 rounded-xl p-6 border-2 border-blue-500/50">
                                <div className="flex items-start gap-3 mb-4">
                                    <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-blue-400 mb-3">
                                            ✅ 메이플 ID 내 공유 & 합산
                                        </h3>
                                        <div className="space-y-2 text-slate-300">
                                            <div className="flex items-start gap-2">
                                                <span className="text-blue-400 font-bold min-w-[100px]">누적 시간:</span>
                                                <span>메이플 ID 내 모든 캐릭터의 접속 시간이 합산됩니다.</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="text-yellow-400 font-bold min-w-[100px]">수령 제한:</span>
                                                <span><strong className="text-white">메이플 ID당 1회만</strong> 수령 가능합니다.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Storage transfer */}
                            <div className="bg-slate-900/70 rounded-xl p-6 border-2 border-purple-500/50">
                                <div className="flex items-start gap-3 mb-4">
                                    <CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0" />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-purple-400 mb-3">
                                            ✅ 보상은 '창고 이동' 가능
                                        </h3>
                                        <div className="space-y-2 text-slate-300 text-sm">
                                            <p>
                                                지급되는 <strong className="text-yellow-400">'솔 에르다 조각 교환권'</strong>과
                                                <strong className="text-yellow-400"> '솔 에르다'</strong>는
                                                <strong className="text-white"> 월드 내 나의 캐릭터 간 이동(창고 이동)</strong>이 가능합니다.
                                            </p>
                                            <p className="text-green-400">
                                                💡 본캐 혹은 부캐 등 필요한 캐릭터에게 자유롭게 옮겨줄 수 있습니다.
                                            </p>
                                            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 mt-3">
                                                <p className="text-red-300 font-bold">
                                                    ⚠️ 유효기간: <strong className="text-red-400">2026년 7월 23일(목) 오전 0시까지</strong> 사용 필수
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 6th job restriction */}
                            <div className="bg-slate-900/70 rounded-xl p-6 border-2 border-yellow-500/50">
                                <div className="flex items-start gap-3 mb-4">
                                    <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-yellow-400 mb-3">
                                            ⚠️ 6차 전직 조건 주의!
                                        </h3>
                                        <div className="space-y-3 text-slate-300 text-sm">
                                            <div className="bg-slate-800/60 rounded-lg p-4">
                                                <p className="text-yellow-300 font-bold mb-2">솔 에르다 조각 교환권</p>
                                                <ul className="space-y-1 list-disc list-inside text-slate-300">
                                                    <li>6차 전직을 하지 않은 캐릭터로도 수령·사용 가능</li>
                                                    <li>단, 교환권 사용으로 얻은 <strong className="text-white">'솔 에르다 조각'은 6차 전직 완료 캐릭터만 사용</strong> 가능</li>
                                                </ul>
                                            </div>
                                            <div className="bg-slate-800/60 rounded-lg p-4">
                                                <p className="text-yellow-300 font-bold mb-2">솔 에르다 (완제품)</p>
                                                <ul className="space-y-1 list-disc list-inside text-slate-300">
                                                    <li>6차 전직을 하지 않은 캐릭터로도 수령 가능</li>
                                                    <li><strong className="text-white">260레벨 이상 + 6차 전직 완료 캐릭터만 사용</strong> 가능</li>
                                                </ul>
                                                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                                                    <div className="bg-slate-700/60 rounded p-2">
                                                        <p className="text-xs text-slate-400">260레벨 이상</p>
                                                        <p className="text-white font-bold text-sm">최대 20개</p>
                                                    </div>
                                                    <div className="bg-slate-700/60 rounded p-2">
                                                        <p className="text-xs text-slate-400">275레벨 이상</p>
                                                        <p className="text-white font-bold text-sm">최대 25개</p>
                                                    </div>
                                                    <div className="bg-slate-700/60 rounded p-2">
                                                        <p className="text-xs text-slate-400">290레벨 이상</p>
                                                        <p className="text-white font-bold text-sm">최대 30개</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Summary */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-purple-500 rounded-xl p-6 sm:p-8">
                        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                            <AlertCircle className="w-6 h-6 text-purple-400" />
                            꼭 기억하세요!
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <Calendar className="w-5 h-5 text-yellow-400" />
                                    <h3 className="font-bold text-yellow-400">7월 19일(일)</h3>
                                </div>
                                <p className="text-slate-300 text-sm">
                                    접속 시간 누적 (하루만!)
                                </p>
                            </div>
                            <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock className="w-5 h-5 text-green-400" />
                                    <h3 className="font-bold text-green-400">7월 22일(수)까지</h3>
                                </div>
                                <p className="text-slate-300 text-sm">
                                    보상 수령 가능
                                </p>
                            </div>
                            <div className="bg-purple-900/20 border border-purple-500/50 rounded-lg p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <Gift className="w-5 h-5 text-purple-400" />
                                    <h3 className="font-bold text-purple-400">메이플ID 1회</h3>
                                </div>
                                <p className="text-slate-300 text-sm">
                                    계정당 1회 수령
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 bg-red-900/20 border border-red-500/50 rounded-lg p-5 text-center">
                            <p className="text-red-300 font-bold">
                                ⚠️ 아이템 유효기간: <strong className="text-red-400">7월 23일(목) 오전 0시까지</strong> 사용 필수!
                            </p>
                        </div>
                    </div>
                </section>

                {/* Conclusion */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-blue-500 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-6 text-center">📝 마무리</h2>
                        <p className="text-slate-300 leading-relaxed text-center mb-6">
                            이번 주 일요일(7월 19일)은 반드시 메이플에 접속하세요!<br />
                            <strong className="text-yellow-400">솔 에르다 조각 100개 + 솔 에르다 1개</strong>를 무료로 받을 수 있고,
                            <strong className="text-orange-400"> 사냥 솔 에르다 3배</strong>에
                            <strong className="text-cyan-400"> 몬파 경험치 총 400%</strong>까지 챙길 수 있는
                            <strong className="text-purple-400"> 역대급 혜자 일요일</strong>입니다! 🎁
                        </p>
                        <p className="text-slate-300 leading-relaxed text-center mb-6">
                            6차 전직 재료가 부족하신 분들, 레벨 올리기에 집중하시는 분들 모두 놓치지 마세요! 💰
                        </p>
                        <div className="text-center">
                            <p className="text-slate-400 text-lg">
                                메이플 용사님들의 건승을 응원합니다! 🍁
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <div className="border-t border-slate-700 pt-8 mt-12">
                    <div className="text-center">
                        <Link prefetch={false}
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-500 transition-colors"
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
