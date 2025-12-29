'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Gift, AlertCircle, CheckCircle, Calendar, Sparkles } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function MapleNPCRewards2025() {
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
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full animate-pulse">
                            긴급 공지
                        </span>
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full">
                            이벤트 보상
                        </span>
                        <span className="text-slate-500 text-sm">2025년 12월 29일</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                        ⏰ 놓치지 마세요! 메이플 운영자 NPC 보상 마감 임박
                    </h1>
                    <p className="text-lg text-slate-400">
                        12월 31일까지! 메이플 운영자 NPC를 통해 받을 수 있는 보상을 정리했습니다.
                        기한이 얼마 남지 않았으니 꼭 확인하세요!
                    </p>
                </header>

                {/* NPC Image Hero Section */}
                <div className="mb-12 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-pink-900/30 border-2 border-yellow-500/50 rounded-2xl p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-75"></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-black text-yellow-400 mb-4 flex items-center justify-center gap-2">
                            <Gift className="w-8 h-8 animate-bounce" />
                            메이플 운영자 NPC를 찾으세요!
                        </h2>

                        <div className="flex justify-center mb-6">
                            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-2xl">
                                <Image
                                    src="/images/blog/maple_npc_notice.png"
                                    alt="메이플 운영자 NPC 보상 안내"
                                    width={800}
                                    height={400}
                                    className="mx-auto rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="bg-slate-900/70 rounded-xl p-6 max-w-2xl mx-auto">
                            <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-center gap-2">
                                <Sparkles className="w-5 h-5 text-yellow-400" />
                                빠른 이동 방법
                            </h3>
                            <p className="text-slate-300 text-sm sm:text-base">
                                <strong className="text-blue-400">빠른 이동</strong> 메뉴에서
                                <strong className="text-yellow-400"> '메이플 운영자'</strong>를 선택하거나,<br />
                                <strong className="text-green-400">헤네시스 및 주요 마을</strong>에서 NPC를 찾을 수 있습니다!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Urgent Deadline Alert */}
                <div className="mb-12 bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-red-500 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl sm:text-2xl font-black text-red-400 mb-2">
                                ⚠️ 마감 임박! 지금 바로 확인하세요
                            </h3>
                            <p className="text-slate-300">
                                CROWN 쇼케이스 선물은 <strong className="text-red-400">12월 31일 마감</strong>입니다!<br />
                                놓치면 다시 받을 수 없으니 반드시 확인하세요!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reward #1: CROWN Showcase */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                <Gift className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-purple-400">
                                    CROWN 쇼케이스 기념 선물
                                </h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <Calendar className="w-4 h-4 text-red-400" />
                                    <span className="text-sm font-bold text-red-400">
                                        마감: 12월 31일 오후 11시 59분까지
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Important Notice */}
                        <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-orange-300 font-bold mb-1">중요!</p>
                                    <p className="text-sm text-slate-300">
                                        'CROWN 쇼케이스 기념 선물' 아이템은 <strong className="text-yellow-400">12/18 점검 이후부터 사용 가능</strong>합니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Reward List */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-yellow-400" />
                                받을 수 있는 보상
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="font-bold text-white">CROWN 훈장 교환권</span>
                                    </div>
                                    <p className="text-xs text-slate-400">유효기간: 7일</p>
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="font-bold text-white">CROWN 데미지 스킨</span>
                                    </div>
                                    <p className="text-xs text-slate-400">영구 아이템</p>
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="font-bold text-white">CROWN 포스터 교환권</span>
                                    </div>
                                    <p className="text-xs text-slate-400">메이플 홈 가구</p>
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="font-bold text-white">마네킹/슬롯 확장 선택권</span>
                                    </div>
                                    <p className="text-xs text-slate-400">2개</p>
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="font-bold text-white">선택 슬롯 맥스 확장권</span>
                                    </div>
                                    <p className="text-xs text-slate-400">4개</p>
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="font-bold text-white">솔 에르다/조각 선택권</span>
                                    </div>
                                    <p className="text-xs text-slate-400">3개 (260+ 전용)</p>
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="font-bold text-white">경험치 4배 쿠폰(30분)</span>
                                    </div>
                                    <p className="text-xs text-slate-400">2개</p>
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="font-bold text-white">VIP 부스터</span>
                                    </div>
                                    <p className="text-xs text-slate-400">10개</p>
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

                {/* Reward #2: Thank You Gift */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-green-900/50 to-blue-900/50 border-2 border-green-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <Gift className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-green-400">
                                    용사님들께 드리는 감사의 마음
                                </h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <Calendar className="w-4 h-4 text-yellow-400" />
                                    <span className="text-sm font-bold text-yellow-400">
                                        마감: 2026년 1월 14일 오후 11시 59분까지
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-5 mb-6">
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                2025년 겨울 업데이트 이후, 큰 오류 없이 안정적으로 서비스를 제공할 수 있게 되어
                                <strong className="text-yellow-400"> 준비했던 사과 보상을 감사의 선물로 드립니다</strong>!
                                모든 용사님들께 감사의 마음을 전합니다. 🎁
                            </p>
                        </div>

                        {/* Reward List */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-yellow-400" />
                                받을 수 있는 보상
                            </h3>

                            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-6 border-2 border-yellow-500/50">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-yellow-400">극한 성장의 비약 (200~249)</h4>
                                        <p className="text-sm text-slate-300">3개 제공</p>
                                    </div>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-4 space-y-2">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-slate-300">
                                            <strong className="text-white">버닝 캐릭터도 사용 가능!</strong>
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-slate-300">
                                            200~249 레벨 구간 성장 가속화
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Calendar className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-slate-300">
                                            유효기간: <strong className="text-yellow-400">2026년 1월 15일 오전 2시까지 사용 가능</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Summary */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-yellow-500 rounded-xl p-6 sm:p-8">
                        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                            <AlertCircle className="w-6 h-6 text-yellow-400" />
                            꼭 기억하세요!
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock className="w-5 h-5 text-red-400" />
                                    <h3 className="font-bold text-red-400">12월 31일 마감</h3>
                                </div>
                                <p className="text-slate-300 text-sm">
                                    CROWN 쇼케이스 기념 선물
                                </p>
                            </div>
                            <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock className="w-5 h-5 text-green-400" />
                                    <h3 className="font-bold text-green-400">1월 14일까지</h3>
                                </div>
                                <p className="text-slate-300 text-sm">
                                    감사의 마음 (극한 성장의 비약 3개)
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-5 text-center">
                            <p className="text-yellow-300 font-bold">
                                💡 메이플ID당 1회만 수령 가능하니 잊지 마세요!
                            </p>
                        </div>
                    </div>
                </section>

                {/* Summary */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-purple-500 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-6 text-center">📝 마무리</h2>
                        <p className="text-slate-300 leading-relaxed text-center mb-6">
                            특히 CROWN 쇼케이스 선물은 <strong className="text-red-400">12월 31일까지</strong>라서
                            시간이 얼마 남지 않았습니다!<br />
                            지금 바로 메이플 운영자 NPC를 찾아가서 보상을 꼭 받으세요! 🎁
                        </p>
                        <div className="text-center">
                            <p className="text-slate-400 text-lg">
                                여러분의 메이플 라이프에 도움이 되길 바랍니다! 🍁
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <div className="border-t border-slate-700 pt-8 mt-12">
                    <div className="text-center">
                        <Link
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
