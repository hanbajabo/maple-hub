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
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                            공식 공지
                        </span>
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full">
                            이벤트 보상
                        </span>
                        <span className="text-slate-500 text-sm">2025년 1월 6일 업데이트</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                        🎁 용사님들께 드리는 감사의 마음 | 극한 성장의 비약 무료 지급
                    </h1>
                    <p className="text-lg text-slate-400">
                        1월 14일까지! 메이플 운영자 NPC를 통해 극한 성장의 비약(200~249) 3개를 무료로 받으세요!
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

                        <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border-2 border-green-400 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                                <Gift className="w-6 h-6" />
                                용사님들께 드리는 감사의 마음
                            </h3>

                            <div className="space-y-3 text-slate-300 text-sm sm:text-base">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-white">수령 기간</p>
                                        <p>2025년 12월 19일(금) ~ <strong className="text-yellow-400">2026년 1월 14일(수) 오후 11시 59분</strong></p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-white">수령 방법</p>
                                        <p><strong className="text-blue-400">빠른 이동</strong> 또는 주요 마을에 위치한 <strong className="text-yellow-400">'메이플 운영자' NPC</strong>와 대화 → '용사님들께 드리는 감사의 마음' 수령</p>
                                    </div>
                                </div>

                                <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 mt-4">
                                    <p className="font-bold text-yellow-400 mb-3">■ 보상 내용 (메이플ID당 1회 수령 가능)</p>
                                    <div className="space-y-2 pl-4">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                            <p><strong className="text-white">극한 성장의 비약(200~249)</strong> × 3개</p>
                                        </div>
                                        <div className="pl-6 text-xs space-y-1">
                                            <p>• 유효 기간: <strong className="text-red-400">2026년 1월 15일(목) 오전 2시 이전까지 사용 가능</strong></p>
                                            <p>• 교환: 월드 내 나의 캐릭터 간 이동만 가능</p>
                                            <p className="text-green-400">• <strong>버닝 상태의 캐릭터로도 사용할 수 있습니다!</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* NPC Location Guide */}
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

                {/* Urgent Deadline Alert - CROWN Showcase */}
                <div className="mb-12 bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-red-500 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl sm:text-2xl font-black text-red-400 mb-2">
                                ⚠️ 긴급 공지 - 12/31 마감!
                            </h3>
                            <p className="text-slate-300">
                                아래 <strong className="text-purple-400">CROWN 쇼케이스 기념 선물</strong>은 <strong className="text-red-400">12월 31일 오후 11시 59분 마감</strong>입니다!<br />
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
