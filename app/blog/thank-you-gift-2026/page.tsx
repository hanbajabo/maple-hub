'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Gift, AlertCircle, CheckCircle, Calendar, Sparkles } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function ThankYouGift2026() {
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
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                            공식 공지
                        </span>
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full">
                            무료 보상
                        </span>
                        <span className="text-slate-500 text-sm">2026년 1월 6일</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                        🎁 용사님들께 드리는 감사의 마음 | 극한 성장의 비약 무료 지급!
                    </h1>
                    <p className="text-lg text-slate-400">
                        1월 14일까지! 메이플 운영자 NPC를 통해 극한 성장의 비약(200~249) 3개를 무료로 받으세요.
                        버닝 캐릭터도 사용 가능!
                    </p>
                </header>

                {/* Official Nexon Message */}
                <div className="mb-12 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-green-900/30 border-2 border-green-500/50 rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-75"></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-black text-green-400 mb-6 text-center">
                            넥슨 공식 메시지
                        </h2>

                        <div className="bg-slate-900/70 rounded-xl p-6 mb-6 space-y-4 text-slate-300 leading-relaxed">
                            <p className="font-bold text-white text-lg">안녕하세요. 메이플스토리입니다.</p>

                            <p>2025년 12월 겨울 업데이트 이후, 메이플 월드에 찾아와 주신 용사님들께 감사드립니다.</p>

                            <p>항상 여름, 겨울의 첫번째 업데이트 이후, 서비스가 원활하게 제공되지 않아
                                용사님들께 죄송한 마음으로 사과 보상을 지급해드리곤 했었는데요.</p>

                            <p>이번 업데이트 때에도 마찬가지로 혹시 모를 상황을 대비해 용사님들께 드릴 사과 보상을 준비 중이었으나,
                                <strong className="text-yellow-400"> 12/19(금) 새벽까지 진행된 채널 점검 및 마이너 패치로 인해 업데이트 이후 발생된 굵직한 오류의 대부분이 수정된 상태</strong>입니다.
                                추가적인 점검을 진행하지 않게 됨에 따라 준비해 두었던 사과 보상을 용사님들께 드릴 타이밍을 놓치게 되었는데요.</p>

                            <p>사과 보상을 어떻게 하면 더 의미 있게 전달해 드릴 수 있을지 내부적으로 논의한 결과,
                                <strong className="text-green-400"> 해당 보상 중 일부를 용사님들께 겨울 선물로 드리고자 합니다.</strong></p>

                            <p className="text-yellow-300 font-bold">항상 메이플스토리를 사랑해주시는 용사님들께 감사드리며,
                                이 선물이 용사님들의 즐거운 플레이에 조금이나마 도움이 되기를 바랍니다.</p>

                            <p className="text-slate-400 text-sm">앞으로도 용사님들이 메이플 월드에서 즐거운 시간 보내실 수 있도록 최선을 다하겠습니다.</p>
                        </div>
                    </div>
                </div>

                {/* Reward Details */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border-2 border-green-400 rounded-xl p-6 sm:p-8">
                        <h3 className="text-2xl sm:text-3xl font-bold text-green-400 mb-6 flex items-center gap-2">
                            <Gift className="w-8 h-8" />
                            용사님들께 드리는 감사의 마음
                        </h3>

                        {/* 공지 이미지 */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl max-w-2xl">
                                <Image
                                    src="/images/blog/thank_you_gift_notice.png"
                                    alt="용사님들께 드리는 감사의 마음 공지"
                                    width={600}
                                    height={200}
                                    className="mx-auto rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="space-y-6 text-slate-300">
                            {/* 수령 기간 */}
                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-white text-lg mb-2">■ 수령 기간</p>
                                        <p className="text-base">2025년 12월 19일(금) ~ <strong className="text-yellow-400">2026년 1월 14일(수) 오후 11시 59분</strong></p>
                                    </div>
                                </div>
                            </div>

                            {/* 수령 방법 */}
                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <div className="flex items-start gap-3">
                                    <Sparkles className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-white text-lg mb-2">■ 수령 방법</p>
                                        <p className="text-base mb-2">
                                            <strong className="text-blue-400">빠른 이동</strong> 또는 주요 마을에 위치한
                                            <strong className="text-yellow-400"> '메이플 운영자' NPC</strong>와 대화
                                        </p>
                                        <p className="text-sm text-slate-400">→ '용사님들께 드리는 감사의 마음' 수령</p>
                                    </div>
                                </div>
                            </div>

                            {/* 보상 내용 */}
                            <div className="bg-yellow-900/30 border-2 border-yellow-500/50 rounded-lg p-6">
                                <p className="font-bold text-yellow-400 text-lg mb-4">■ 보상 내용 (메이플ID당 1회 수령 가능)</p>
                                <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-6 border border-yellow-500/30">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                            <Sparkles className="w-8 h-8 text-yellow-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-yellow-400">극한 성장의 비약 (200~249)</h4>
                                            <p className="text-white text-lg">× 3개</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3 pl-4 border-l-4 border-green-400/50">
                                        <div className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <p className="text-base">유효 기간: <strong className="text-red-400">2026년 1월 15일(목) 오전 2시 이전까지 사용 가능</strong></p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <p className="text-base">교환: 월드 내 나의 캐릭터 간 이동만 가능</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <p className="text-base text-green-300"><strong>★ 버닝 상태의 캐릭터로도 사용할 수 있습니다!</strong></p>
                                        </div>
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

                {/* NPC Location Guide */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-pink-900/30 border-2 border-yellow-500/50 rounded-2xl p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-75"></div>

                        <div className="relative z-10">
                            <h2 className="text-2xl sm:text-3xl font-black text-yellow-400 mb-6 flex items-center justify-center gap-2">
                                <Gift className="w-8 h-8 animate-bounce" />
                                메이플 운영자 NPC 찾는 방법
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
                </section>

                {/* Important Notice */}
                <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-red-500/50 rounded-xl p-6 mb-12">
                    <div className="flex items-start gap-4">
                        <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-xl font-bold text-red-400 mb-2">꼭 기억하세요!</h3>
                            <ul className="space-y-2 text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    <span>메이플ID당 1회만 수령 가능</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    <span>유효기간: <strong className="text-yellow-400">2026년 1월 15일 오전 2시까지 사용</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400">•</span>
                                    <span className="text-green-300"><strong>버닝 캐릭터도 사용 가능!</strong></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-purple-500 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-6 text-center">📝 마무리</h2>
                        <p className="text-slate-300 leading-relaxed text-center mb-6">
                            넥슨에서 준비한 감사의 선물! 극한 성장의 비약 3개를 꼭 챙겨가세요.<br />
                            특히 하이퍼버닝 캐릭터가 있다면 200-249 구간 성장에 큰 도움이 됩니다! 🔥
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
