'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Gift, AlertCircle, CheckCircle, Calendar, Sparkles, Zap, Trophy, Users, MapPin } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function EventEndingJan142026() {
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
                            🚨 긴급 공지
                        </span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full">
                            이벤트 가이드
                        </span>
                        <span className="text-slate-500 text-sm">2026년 1월 13일</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                        🚨 내일(1/14) 밤 11시 59분 마감! 놓치면 안 되는 이벤트 총정리
                    </h1>
                    <p className="text-lg text-slate-400">
                        극한 성장의 비약 3개부터 KINETIC 이벤트까지! 시간 없으니 지금 바로 확인하세요! ⏰
                    </p>
                </header>

                {/* Urgent Alert Banner */}
                <div className="mb-12 bg-gradient-to-r from-red-900/40 via-orange-900/40 to-red-900/40 border-2 border-red-500 rounded-2xl p-6 relative overflow-hidden animate-pulse">
                    <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
                    <div className="relative z-10">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                                <Clock className="w-8 h-8 text-white animate-bounce" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl sm:text-3xl font-black text-red-400 mb-3">
                                    ⚠️ 24시간도 채 남지 않았습니다!
                                </h2>
                                <p className="text-white text-lg mb-2">
                                    <strong className="text-yellow-400">1월 14일(수) 오후 11시 59분</strong>에 대부분의 이벤트가 종료됩니다.
                                </p>
                                <p className="text-slate-300">
                                    특히 <strong className="text-green-400">극한 성장의 비약 3개</strong>를 받을 수 있는 마지막 기회입니다!
                                    지금 바로 확인하세요!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event UI Screenshot */}
                <div className="mb-12 bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-blue-400">
                                📱 이벤트 UI 에서 바로 확인하세요!
                            </h2>
                            <p className="text-slate-300 text-sm mt-1">게임 내 이벤트 메뉴에서 쉽게 찾을 수 있습니다</p>
                        </div>
                    </div>

                    <div className="flex justify-center mb-4">
                        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl">
                            <Image
                                src="/images/blog/quick_move_button.png"
                                alt="빠른 이동 버튼"
                                width={300}
                                height={100}
                                className="mx-auto rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                            <p className="text-slate-300 text-sm">
                                <strong className="text-blue-400">팁:</strong> 게임 내에서 <strong className="text-yellow-400">이벤트 버튼</strong>을 클릭하면
                                '뷰티 이벤트', '닉네임 익스프레스' 등을 쉽게 찾을 수 있습니다!<br />
                                <strong className="text-green-400">메이플 운영자</strong>는 <strong className="text-yellow-400">빠른 이동</strong>을 눌러서 찾을 수 있어요!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Section: January 14 Deadline */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-red-900/50 via-orange-900/30 to-red-900/50 border-2 border-red-500/70 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-red-500/30 rounded-xl flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-red-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-black text-red-400">
                                        🚨 1월 14일(수) 오후 11:59 종료
                                    </h2>
                                    <p className="text-slate-300 text-sm mt-1">내일 밤까지! 놓치면 다시는 받을 수 없습니다</p>
                                </div>
                            </div>

                            {/* Must-Have: 감사의 마음 */}
                            <div className="mb-6 bg-gradient-to-br from-green-900/50 to-blue-900/40 border-2 border-green-400 rounded-xl p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                                        <Gift className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                                필수!
                                            </span>
                                            <h3 className="text-xl sm:text-2xl font-black text-green-400">
                                                🎁 용사님들께 드리는 감사의 마음
                                            </h3>
                                        </div>
                                        <div className="space-y-3 mt-4">
                                            <div className="bg-slate-900/70 rounded-lg p-4 border border-green-500/30">
                                                <div className="flex items-start gap-2 mb-2">
                                                    <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="font-bold text-white mb-1">보상 내용:</p>
                                                        <p className="text-slate-300">
                                                            <strong className="text-green-400">극한 성장의 비약 (200~249) × 3개</strong>
                                                        </p>
                                                        <p className="text-xs text-slate-400 mt-2">
                                                            ※ 버닝 캐릭터도 사용 가능! 💚
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-slate-900/70 rounded-lg p-4 border border-blue-500/30">
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="font-bold text-white mb-1">수령 방법:</p>
                                                        <p className="text-slate-300">
                                                            <strong className="text-blue-400">빠른 이동</strong> 또는 주요 마을의
                                                            <strong className="text-yellow-400"> '메이플 운영자' NPC</strong>와 대화
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4">
                                                <div className="flex items-start gap-2">
                                                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                                    <p className="text-yellow-300 text-sm">
                                                        <strong>메이플ID당 1회만 수령 가능!</strong> 수령 후 유효기간은 1월 15일(목) 오전 2시까지입니다.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* NPC Dialog Screenshot */}
                                        <div className="mt-4 bg-slate-800/30 rounded-lg p-4 border border-green-500/30">
                                            <div className="flex justify-center mb-3">
                                                <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-3 border border-slate-700 shadow-xl">
                                                    <Image
                                                        src="/images/blog/maple_operator_npc_dialog.png"
                                                        alt="메이플 운영자 NPC 대화창 - 감사의 마음 수령"
                                                        width={800}
                                                        height={300}
                                                        className="mx-auto rounded-lg"
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-xs text-center text-slate-400">
                                                ↑ 메이플 운영자 NPC와 대화하면 이렇게 보상을 받을 수 있습니다!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Rest of January 14 Events */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <Zap className="w-6 h-6 text-orange-400" />
                                    기타 1월 14일 종료 이벤트
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500 transition-all">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-4 h-4 text-purple-400" />
                                            <span className="font-bold text-white">뉴네임 옥션</span>
                                        </div>
                                        <p className="text-xs text-slate-400">닉네임 경매 이벤트</p>
                                    </div>

                                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500 transition-all">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-4 h-4 text-purple-400" />
                                            <span className="font-bold text-white">닉네임 익스프레스</span>
                                        </div>
                                        <p className="text-xs text-slate-400">닉네임 변경/생성 지원</p>
                                    </div>

                                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 hover:border-pink-500 transition-all">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-4 h-4 text-pink-400" />
                                            <span className="font-bold text-white">KINETIC 뷰티 익스프레스</span>
                                        </div>
                                        <p className="text-xs text-slate-400">키네시스 외형 이전하기</p>
                                    </div>

                                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-4 h-4 text-blue-400" />
                                            <span className="font-bold text-white">커스텀 일러스트 이벤트</span>
                                        </div>
                                        <p className="text-xs text-slate-400">캐릭터 일러스트 신청</p>
                                    </div>

                                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 hover:border-cyan-500 transition-all">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-4 h-4 text-cyan-400" />
                                            <span className="font-bold text-white">KINETIC 리마스터</span>
                                        </div>
                                        <p className="text-xs text-slate-400">키네시스 리마스터 이벤트</p>
                                    </div>

                                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 hover:border-red-500 transition-all">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Trophy className="w-4 h-4 text-red-400" />
                                            <span className="font-bold text-white">카이 최초 격파 미션</span>
                                        </div>
                                        <p className="text-xs text-slate-400">'최초 격파' 타이틀 관련 미션 종료</p>
                                    </div>
                                </div>

                                {/* Event UI Screenshot */}
                                <div className="mt-6 bg-slate-800/30 rounded-lg p-4 border border-blue-500/30">
                                    <div className="flex justify-center mb-3">
                                        <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-3 border border-slate-700 shadow-xl">
                                            <Image
                                                src="/images/blog/event_jan14_npc_menu.png"
                                                alt="메이플스토리 이벤트 UI - KINETIC 이벤트 메뉴"
                                                width={1000}
                                                height={200}
                                                className="mx-auto rounded-lg"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-center text-slate-400">
                                        ↑ 게임 내 이벤트 버튼을 누르면 이렇게 찾을 수 있어요!
                                    </p>
                                </div>

                                <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-4 mt-4">
                                    <div className="flex items-start gap-2">
                                        <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-orange-300 text-sm">
                                            <strong>참고:</strong> 카이 격파 이벤트 자체는 계속되지만, '최초 격파' 타이틀을 받을 수 있는 미션은 1/14에 종료됩니다.
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

                {/* January 15 Deadline */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-blue-900/40 border-2 border-blue-500/70 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-blue-400">
                                    ⏰ 1월 15일(목) 오후 11:59 종료
                                </h2>
                                <p className="text-slate-300 text-sm mt-1">하루 더 여유가 있는 이벤트</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <div className="w-full">
                                        <p className="font-bold text-white mb-2">프리미엄 PC방 접속보상 이벤트</p>
                                        <p className="text-slate-400 text-sm mb-4">
                                            PC방에서 접속 시 받을 수 있는 보상 이벤트가 종료됩니다.
                                        </p>

                                        {/* New PC Room Event */}
                                        <div className="mt-4 pt-4 border-t border-slate-600">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                                                    NEW
                                                </span>
                                                <p className="font-bold text-green-400 text-sm">프리미엄 PC방 접속 보상 이벤트 시작!</p>
                                            </div>

                                            <div className="bg-slate-800/50 rounded-lg p-3 mb-3 space-y-2">
                                                <div>
                                                    <p className="text-xs font-bold text-blue-400 mb-1">📅 이벤트 참여 기간</p>
                                                    <p className="text-xs text-slate-300">
                                                        <strong className="text-white">2026년 1월 16일(금) 0시</strong> ~<br />
                                                        <strong className="text-white">2월 12일(목) 오후 11시 59분</strong>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-slate-800/50 rounded-lg p-3 mb-3 space-y-2">
                                                <div>
                                                    <p className="text-xs font-bold text-purple-400 mb-1">🎁 프리미엄 기프트샵</p>
                                                    <p className="text-xs text-slate-300">
                                                        <strong className="text-white">2026년 1월 15일(목) 점검 후</strong> ~<br />
                                                        <strong className="text-white">2월 11일(수) 오후 11시 59분</strong>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                                                <p className="text-xs font-bold text-green-400 mb-1">✨ 참여 대상</p>
                                                <p className="text-xs text-slate-300">
                                                    프리미엄 PC방에서 접속한 <strong className="text-white">모든 캐릭터</strong>
                                                </p>
                                                <p className="text-xs text-green-400 mt-1">
                                                    ※ 레벨 제한 없이 시간 누적 가능!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <div className="flex items-start gap-3">
                                    <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-white mb-2">테스트월드 운영 종료</p>
                                        <p className="text-slate-400 text-sm">
                                            1월 15일 본섭 업데이트 전까지 테스트월드가 운영됩니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Challengers World Season 3 LEAP */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-purple-900/50 border-2 border-purple-500/70 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-black text-purple-400">
                                        🚀 챌린저스 월드 시즌 3 리프 시작!
                                    </h2>
                                    <p className="text-slate-300 text-sm mt-1">1월 15일(목) 점검 후부터 시작됩니다</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* LEAP Date */}
                                <div className="bg-slate-900/70 rounded-xl p-6 border border-purple-500/30">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Calendar className="w-5 h-5 text-green-400" />
                                        <h3 className="text-xl font-bold text-white">📅 리프 시작 날짜</h3>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/50 rounded-lg p-4">
                                        <p className="text-white font-bold mb-2">
                                            <strong className="text-green-400">1차 사전 리프 시작:</strong> 2026년 1월 15일(목) 점검 후부터
                                        </p>
                                        <p className="text-slate-300 text-sm">
                                            기간: <strong className="text-yellow-400">1/15 ~ 2/11 밤 11:59</strong>
                                        </p>
                                    </div>
                                </div>

                                {/* Key Changes */}
                                <div className="bg-slate-900/70 rounded-xl p-6 border border-purple-500/30">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Sparkles className="w-5 h-5 text-yellow-400" />
                                        <h3 className="text-xl font-bold text-white">✨ 기존과 달라진 핵심 포인트 (시즌 3)</h3>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm sm:text-base">
                                            <thead>
                                                <tr className="border-b border-slate-700">
                                                    <th className="text-left py-3 px-4 font-bold text-purple-400">구분</th>
                                                    <th className="text-left py-3 px-4 font-bold text-slate-400">기존 / 일반적인 리프</th>
                                                    <th className="text-left py-3 px-4 font-bold text-green-400">챌린저스 시즌 3 (이번 시즌)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b border-slate-800">
                                                    <td className="py-4 px-4 font-bold text-white">참여 레벨</td>
                                                    <td className="py-4 px-4 text-slate-400">보통 130레벨 이상</td>
                                                    <td className="py-4 px-4 text-green-400 font-bold">
                                                        101레벨 이상 (초보자 계열 포함)
                                                    </td>
                                                </tr>
                                                <tr className="border-b border-slate-800">
                                                    <td className="py-4 px-4 font-bold text-white">도착 월드</td>
                                                    <td className="py-4 px-4 text-slate-400">여러 월드로 이동 가능</td>
                                                    <td className="py-4 px-4 text-yellow-400 font-bold">
                                                        최초 선택한 도착 월드로 고정<br />
                                                        <span className="text-xs text-red-400">(중간 변경 불가!)</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Official Notice Screenshot */}
                                <div className="mt-6 bg-slate-800/30 rounded-lg p-4 border border-purple-500/30">
                                    <div className="flex justify-center mb-3">
                                        <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-3 border border-slate-700 shadow-xl">
                                            <Image
                                                src="/images/blog/challengers_leap_notice.png"
                                                alt="챌린저스 월드 리프 공식 안내"
                                                width={1000}
                                                height={250}
                                                className="mx-auto rounded-lg"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-center text-slate-400">
                                        ↑ 공식 안내: 101레벨 이상부터 참여 가능하며, 최초 선택한 월드로만 이동 가능합니다!
                                    </p>
                                </div>

                                <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-5 mt-6">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-yellow-400 mb-2">⚠️ 중요 변경사항!</p>
                                            <ul className="text-slate-300 text-sm space-y-2">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-yellow-400 flex-shrink-0">•</span>
                                                    <span>
                                                        <strong className="text-white">101레벨부터 참여 가능:</strong> 기존보다 낮은 레벨부터 챌린저스 월드로 이동할 수 있습니다.
                                                    </span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-yellow-400 flex-shrink-0">•</span>
                                                    <span>
                                                        <strong className="text-white">도착 월드 고정:</strong> 한 번 선택한 도착 월드는 중간에 변경할 수 없으니 신중하게 선택하세요!
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Checklist */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-yellow-500 rounded-xl p-6 sm:p-8">
                        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                            <CheckCircle className="w-6 h-6 text-yellow-400" />
                            ✅ 체크리스트: 꼭 확인하세요!
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/50 rounded-lg p-5">
                                <div className="flex items-start gap-3">
                                    <input type="checkbox" className="mt-1 w-5 h-5 accent-red-500" />
                                    <div>
                                        <p className="font-bold text-white mb-1">
                                            🎁 극한 성장의 비약 3개 받기 (메이플 운영자 NPC)
                                        </p>
                                        <p className="text-sm text-red-400">
                                            마감: 1월 14일(수) 밤 11:59 | 사용기한: 1월 15일(목) 오전 2시
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-5">
                                <div className="flex items-start gap-3">
                                    <input type="checkbox" className="mt-1 w-5 h-5 accent-purple-500" />
                                    <div>
                                        <p className="font-bold text-white mb-1">
                                            💇 KINETIC 뷰티 익스프레스 (키네시스 외형 이전)
                                        </p>
                                        <p className="text-sm text-slate-400">마감: 1월 14일(수) 밤 11:59</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-5">
                                <div className="flex items-start gap-3">
                                    <input type="checkbox" className="mt-1 w-5 h-5 accent-blue-500" />
                                    <div>
                                        <p className="font-bold text-white mb-1">
                                            ✏️ 닉네임 옥션 / 익스프레스 참여
                                        </p>
                                        <p className="text-sm text-slate-400">마감: 1월 14일(수) 밤 11:59</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/50 rounded-lg p-5">
                                <div className="flex items-start gap-3">
                                    <input type="checkbox" className="mt-1 w-5 h-5 accent-purple-500" />
                                    <div>
                                        <p className="font-bold text-white mb-1">
                                            🚀 챌린저스 월드 시즌 3 리프 준비 (1/15 시작)
                                        </p>
                                        <p className="text-sm text-purple-400">
                                            101레벨 이상 캐릭터로 참여 가능, 도착 월드는 고정됨!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Summary */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-purple-500 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-6 text-center">📝 마무리</h2>
                        <p className="text-slate-300 leading-relaxed text-center mb-6">
                            가장 중요한 것은 <strong className="text-green-400">극한 성장의 비약 3개</strong>를 받는 것입니다!<br />
                            <strong className="text-red-400">1월 14일(수) 밤 11시 59분</strong> 전까지 꼭 메이플 운영자 NPC에게 받으세요! 🎁
                        </p>
                        <p className="text-slate-300 leading-relaxed text-center mb-6">
                            그리고 <strong className="text-purple-400">챌린저스 월드 시즌 3</strong>도 1월 15일부터 시작되니,<br />
                            101레벨 이상 캐릭터로 리프 준비를 하시는 것도 잊지 마세요! 🚀
                        </p>
                        <div className="text-center">
                            <p className="text-slate-400 text-lg">
                                즐거운 메이플 라이프 되세요! 🍁
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
        </div >
    );
}
