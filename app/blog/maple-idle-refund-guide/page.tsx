'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, AlertCircle, Clock, CheckCircle, Info, HelpCircle, Shield, XCircle } from 'lucide-react';

export default function MapleIdleRefund() {
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
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full">
                            긴급 공지
                        </span>
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full">
                            환불 안내
                        </span>
                        <span className="text-slate-500 text-sm">2026년 2월 5일</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                        메이플 키우기 전액 환불 신청 시작
                    </h1>
                    <p className="text-lg text-slate-400">
                        2월 5일부터 환불 접수가 시작되었습니다. 신청 기간, 대상, 주의사항을 꼼꼼히 확인하세요.
                    </p>
                </header>

                {/* 환불 이미지 */}
                <div className="mb-12 relative w-full max-w-2xl mx-auto aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-orange-500/50 bg-slate-800">
                    <Image
                        src="/images/blog/maple-idle-refund.png"
                        alt="메이플 키우기 환불 신청하기"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* 긴급 알림 박스 */}
                <div className="mb-12 bg-gradient-to-br from-red-900/50 via-orange-900/30 to-red-900/50 border-2 border-red-500/50 rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-75"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <AlertCircle className="w-8 h-8 text-red-400" />
                            <h2 className="text-2xl font-black text-red-400">핵심 요약</h2>
                        </div>

                        <div className="space-y-4 text-slate-200">
                            <div className="bg-slate-900/70 rounded-xl p-5 border border-red-500/30">
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-white mb-2">📅 신청 기간 (10일간)</p>
                                        <p className="text-sm text-slate-300">
                                            <strong className="text-yellow-400">2026년 2월 5일(목) ~ 2월 15일(일) 23:59</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/70 rounded-xl p-5 border border-orange-500/30">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-white mb-2">💰 환불 대상 기간</p>
                                        <p className="text-sm text-slate-300">
                                            <strong className="text-green-400">2025년 11월 6일(목) ~ 2026년 1월 28일(수) 19:00</strong>까지<br />
                                            마켓 스토어에서 결제한 <strong className="text-white">전액</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/70 rounded-xl p-5 border border-purple-500/30">
                                <div className="flex items-start gap-3">
                                    <Shield className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-white mb-2">🌐 신청 페이지</p>
                                        <a
                                            href="https://maplestoryidle.nexon.com/ko/refund"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-400 hover:text-blue-300 underline transition-colors"
                                        >
                                            https://maplestoryidle.nexon.com/ko/refund
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-yellow-900/30 border-2 border-yellow-500/50 rounded-lg p-5">
                            <p className="font-bold text-yellow-400 flex items-center gap-2 mb-3">
                                <AlertCircle className="w-5 h-5" />
                                ⚠️ 가장 중요한 주의사항
                            </p>
                            <p className="text-sm leading-relaxed text-slate-200">
                                <strong className="text-red-400">환불 신청 시 해당 계정은 '메이플 키우기'에 한해 영구 이용 제한됩니다.</strong><br />
                                환불 금액이 없어도 신청 버튼을 누르는 즉시 제재가 적용되므로 <strong className="text-yellow-300">반드시 신중하게 결정</strong>하세요!
                            </p>
                        </div>
                    </div>
                </div>

                {/* 환불 신청 방법 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-2 border-blue-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <Info className="w-6 h6 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-blue-400">
                                    1. 환불 신청 방법
                                </h2>
                            </div>
                        </div>

                        <div className="bg-slate-900/70 rounded-xl p-6 border border-blue-500/30">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-500/20 text-blue-400 font-bold w-8 h-8 flex items-center justify-center rounded-full text-sm flex-shrink-0 mt-0.5">1</div>
                                    <div>
                                        <p className="font-bold text-white mb-1">환불 신청 페이지 접속</p>
                                        <p className="text-sm text-slate-300">
                                            <a href="https://maplestoryidle.nexon.com/ko/refund" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                                                https://maplestoryidle.nexon.com/ko/refund
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-500/20 text-blue-400 font-bold w-8 h-8 flex items-center justify-center rounded-full text-sm flex-shrink-0 mt-0.5">2</div>
                                    <div>
                                        <p className="font-bold text-white mb-1">'환불 신청하기' 버튼 클릭</p>
                                        <p className="text-sm text-slate-300">
                                            안내되는 유의사항을 꼼꼼히 확인하세요
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="bg-green-500/20 text-green-400 font-bold w-8 h-8 flex items-center justify-center rounded-full text-sm flex-shrink-0 mt-0.5">3</div>
                                    <div>
                                        <p className="font-bold text-white mb-1">환불 접수 완료</p>
                                        <p className="text-sm text-slate-300">
                                            버튼 클릭 즉시 신청이 완료되며, 영구 이용 제한이 적용됩니다
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 bg-orange-900/30 border border-orange-500/50 rounded-lg p-4">
                                <p className="text-orange-300 text-sm font-bold mb-1">
                                    💡 게스트 계정 주의!
                                </p>
                                <p className="text-slate-300 text-xs leading-relaxed">
                                    게스트 계정은 정확한 정보 확인을 위해 <strong className="text-white">계정 연동 후</strong> 환불 신청이 가능합니다.<br />
                                    (연동 가능: 넥슨ID, 구글, 애플, 페이스북)
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 주요 FAQ */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                <HelpCircle className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-purple-400">
                                    2. 주요 FAQ
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* FAQ 1 */}
                            <div className="bg-slate-900/70 rounded-xl p-5 border border-purple-500/30">
                                <p className="font-bold text-purple-400 mb-3">Q. 어빌리티, 공격 속도 개별 보상 등 우편으로 지급된 보상을 받은 경우도 환불 가능한가요?</p>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    <strong className="text-green-400">A. 가능합니다.</strong> 어빌리티, 공격 속도 개별 보상, 전체 보상 등 우편으로 지급된 보상을 받으셨더라도 전액 환불 신청이 가능합니다.
                                </p>
                            </div>

                            {/* FAQ 2 */}
                            <div className="bg-slate-900/70 rounded-xl p-5 border border-blue-500/30">
                                <p className="font-bold text-blue-400 mb-3">Q. 이미 스토어에서 환불 신청을 했거나 환불을 받았는데, 다시 신청해야 하나요?</p>
                                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                                    <strong className="text-yellow-400">A. 네, 반드시 공식 환불 페이지에서 다시 신청하셔야 합니다.</strong>
                                </p>
                                <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-3">
                                    <ul className="text-xs text-slate-300 space-y-1">
                                        <li>• 오픈 마켓 스토어에서 <strong className="text-white">전액 환불</strong>을 받은 경우 → 중복 환불 불가</li>
                                        <li>• 오픈 마켓 스토어에서 <strong className="text-white">부분 환불</strong>된 경우 → 잔여 금액만 환불</li>
                                        <li>• 스토어 환불로 이용 제한된 계정 → 환불 신청은 가능하나 <strong className="text-red-400">철회 불가</strong></li>
                                    </ul>
                                </div>
                            </div>

                            {/* FAQ 3 */}
                            <div className="bg-slate-900/70 rounded-xl p-5 border border-green-500/30">
                                <p className="font-bold text-green-400 mb-3">Q. 여러 스토어를 이용하여 결제한 경우 각각 신청해야 하나요?</p>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    <strong className="text-green-400">A. 아니요.</strong> 게임을 이용한 <strong className="text-white">계정 단위</strong>로 환불 신청이 진행되므로 <strong className="text-yellow-400">한 번만 신청하면 됩니다.</strong>
                                </p>
                            </div>

                            {/* FAQ 4 */}
                            <div className="bg-slate-900/70 rounded-xl p-5 border border-yellow-500/30">
                                <p className="font-bold text-yellow-400 mb-3">Q. 환불 금액이 없어도 '환불 신청'을 누르면 계정 제재가 적용되나요?</p>
                                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                                    <strong className="text-red-400">A. 네, 즉시 영구 이용 제한이 적용됩니다!</strong>
                                </p>
                                <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3">
                                    <p className="text-red-300 text-xs leading-relaxed">
                                        환불 금액이 없는 경우에도 환불 신청 버튼을 누르는 즉시 해당 계정은 영구 이용 제한이 적용됩니다.<br />
                                        <strong className="text-yellow-300">환불 신청 전 반드시 계정 상태와 결제 내역을 확인</strong>하신 후 신중하게 신청해 주시기 바랍니다.
                                    </p>
                                </div>
                            </div>

                            {/* FAQ 5 */}
                            <div className="bg-slate-900/70 rounded-xl p-5 border border-orange-500/30">
                                <p className="font-bold text-orange-400 mb-3">Q. 환불 소요 기간은 얼마나 걸리나요?</p>
                                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                                    <strong className="text-orange-400">A. 스토어별로 상이합니다.</strong>
                                </p>
                                <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-3">
                                    <p className="text-slate-300 text-xs leading-relaxed mb-2">
                                        최종 환불 처리는 각 스토어에서 결제하신 수단을 통해 결제 취소로 진행되며, 환불 소요 시간은 스토어 고객센터 안내 사항을 확인해주시기 바랍니다.
                                    </p>
                                    <div className="space-y-1 text-xs">
                                        <p className="text-blue-300">• <strong>구글:</strong> <a href="https://support.google.com/googleplay/answer/2479637" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">Google Play 구매 환불 일정</a></p>
                                        <p className="text-blue-300">• <strong>애플:</strong> 앱스토어 환불 정책 확인</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 계정 관련 주의사항 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 border-2 border-red-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                                <XCircle className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-red-400">
                                    3. 환불 시 게임 이용 제한 (필독!)
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-slate-900/70 rounded-xl p-5 border border-red-500/30">
                                <p className="font-bold text-red-400 mb-3 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5" />
                                    영구 이용 제한
                                </p>
                                <ul className="text-slate-300 text-sm space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span>환불 신청 시, 해당 계정은 <strong className="text-white">'메이플 키우기'에 한해 영구 이용이 제한</strong>됩니다.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span>해당 계정의 <strong className="text-white">모든 캐릭터</strong>의 게임이용이 불가능합니다.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span><strong className="text-green-400">다른 넥슨 게임 이용에는 영향이 없습니다.</strong></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span>서버별 생성된 <strong className="text-white">모든 캐릭터 이용 불가</strong> 및 <strong className="text-white">닉네임 재사용 불가</strong></span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-slate-900/70 rounded-xl p-5 border border-yellow-500/30">
                                <p className="font-bold text-yellow-400 mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5" />
                                    환불 신청 철회 가능
                                </p>
                                <ul className="text-slate-300 text-sm space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-yellow-400">•</span>
                                        <span>환불 신청 후 <strong className="text-white">환불 처리 기간 내</strong>에 환불 신청 철회가 가능합니다.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-yellow-400">•</span>
                                        <span>환불 신청 철회 시 <strong className="text-green-400">즉시 게임 이용 제한이 해제</strong>되며, 해당 계정으로 게임을 정상적으로 이용할 수 있습니다.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">⚠️</span>
                                        <span><strong className="text-red-400">단, 기존 영구 게임 제한된 경우 철회 불가!</strong></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 환불 불가 케이스 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-gray-900/50 to-slate-900/50 border-2 border-gray-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gray-500/20 rounded-xl flex items-center justify-center">
                                <XCircle className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-gray-400">
                                    4. 환불이 불가능한 경우
                                </h2>
                            </div>
                        </div>

                        <div className="bg-slate-900/70 rounded-xl p-5 border border-gray-500/30">
                            <div className="space-y-3 text-slate-300 text-sm">
                                <div className="flex items-start gap-2">
                                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <p>
                                        <strong className="text-white">메이플 키우기 게임 탈퇴가 완료된 계정</strong><br />
                                        <span className="text-xs text-slate-400">→ 게임 정보 확인 불가로 환불 진행 불가</span>
                                    </p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <p>
                                        <strong className="text-white">넥슨 회원 탈퇴로 로그인이 불가한 계정</strong><br />
                                        <span className="text-xs text-slate-400">→ 환불 신청 자체가 불가</span>
                                    </p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <p>
                                        <strong className="text-white">게스트 계정 분실</strong><br />
                                        <span className="text-xs text-slate-400">→ 앱 삭제, 기기 분실, 공장 초기화, 캐시 삭제 등으로 계정 유실 시 고객센터 문의 필요</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 결제 내역 확인 방법 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border-2 border-cyan-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                                <Info className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-cyan-400">
                                    5. 결제 내역 확인 방법
                                </h2>
                            </div>
                        </div>

                        <div className="bg-slate-900/70 rounded-xl p-5 border border-cyan-500/30">
                            <p className="text-slate-300 text-sm mb-4">
                                공지를 통해 안내드린 기간 내 결제 내역을 확인하고자 하신다면 다음 방법을 이용하세요:
                            </p>

                            <div className="space-y-3">
                                <div className="bg-cyan-900/30 border border-cyan-500/50 rounded-lg p-4">
                                    <p className="font-bold text-cyan-400 mb-2">1️⃣ 넥슨 홈페이지 (본인 인증 계정)</p>
                                    <p className="text-slate-300 text-xs leading-relaxed">
                                        넥슨 홈페이지 → <strong className="text-white">MY결제</strong> → 결제 내역 오른편 <strong className="text-white">직접결제내역</strong> → <strong className="text-white">모바일인앱 결제</strong> → 게임(메이플키우기) 선택
                                    </p>
                                </div>

                                <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
                                    <p className="font-bold text-slate-400 mb-2">2️⃣ 스토어 영수증 (게스트 계정)</p>
                                    <p className="text-slate-300 text-xs leading-relaxed">
                                        게스트 계정 또는 본인 인증을 진행하지 않은 계정으로 결제하신 경우, 이용하신 스토어의 영수증을 통해 확인하실 수 있습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer / 정리 */}
                <div className="bg-gradient-to-r from-purple-900/30 via-blue-900/20 to-pink-900/30 border-2 border-purple-500/50 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-purple-400 mb-4">📝 마무리 체크리스트</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                            <div className="bg-purple-500/20 text-purple-400 font-bold w-6 h-6 flex items-center justify-center rounded-full text-xs flex-shrink-0 mt-0.5">✓</div>
                            <p className="text-slate-300">환불 신청 기간: <strong className="text-white">2월 5일 ~ 2월 15일</strong> (10일간)</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-purple-500/20 text-purple-400 font-bold w-6 h-6 flex items-center justify-center rounded-full text-xs flex-shrink-0 mt-0.5">✓</div>
                            <p className="text-slate-300">신청 즉시 <strong className="text-red-400">영구 이용 제한</strong> (철회 가능 기간 내 변경 가능)</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-purple-500/20 text-purple-400 font-bold w-6 h-6 flex items-center justify-center rounded-full text-xs flex-shrink-0 mt-0.5">✓</div>
                            <p className="text-slate-300">게스트 계정은 <strong className="text-yellow-400">계정 연동 후</strong> 신청 가능</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-purple-500/20 text-purple-400 font-bold w-6 h-6 flex items-center justify-center rounded-full text-xs flex-shrink-0 mt-0.5">✓</div>
                            <p className="text-slate-300">환불 금액이 없어도 버튼 클릭 시 <strong className="text-red-400">즉시 제재 적용</strong></p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-purple-500/20 text-purple-400 font-bold w-6 h-6 flex items-center justify-center rounded-full text-xs flex-shrink-0 mt-0.5">✓</div>
                            <p className="text-slate-300">반드시 <strong className="text-yellow-300">계정 상태와 결제 내역을 확인</strong>한 후 신중하게 결정하세요</p>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-purple-500/30">
                        <p className="text-slate-400 text-xs text-center">
                            본 정보는 2026년 2월 5일 기준 넥슨 공식 공지사항을 바탕으로 작성되었으며, 상황에 따라 내용이 추가 및 변경될 수 있습니다.
                        </p>
                    </div>
                </div>

                {/* 관련 링크 */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-slate-500 mb-4">관련 공식 링크</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://forum.nexon.com/maplestoryidle-kr/board_view?board=6633&thread=3368332"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 rounded-lg text-sm transition-colors"
                        >
                            📢 환불 신청 페이지 오픈 안내
                        </a>
                        <a
                            href="https://forum.nexon.com/maplestoryidle-kr/board_view?board=6730&thread=3366312"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-400 rounded-lg text-sm transition-colors"
                        >
                            ❓ 전액 환불 관련 상세 안내 FAQ
                        </a>
                    </div>
                </div>

                {/* SEO 키워드 */}
                <div className="mt-12 pt-8 border-t border-slate-700">
                    <p className="text-sm text-slate-500 mb-4 text-center">관련 검색어</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <span className="px-3 py-1 bg-slate-800/50 text-slate-400 text-xs rounded-full">#메이플키우기환불</span>
                        <span className="px-3 py-1 bg-slate-800/50 text-slate-400 text-xs rounded-full">#메이플스토리아이들환불</span>
                        <span className="px-3 py-1 bg-slate-800/50 text-slate-400 text-xs rounded-full">#넥슨환불</span>
                        <span className="px-3 py-1 bg-slate-800/50 text-slate-400 text-xs rounded-full">#메이플키우기전액환불</span>
                        <span className="px-3 py-1 bg-slate-800/50 text-slate-400 text-xs rounded-full">#환불신청</span>
                        <span className="px-3 py-1 bg-slate-800/50 text-slate-400 text-xs rounded-full">#환불기간</span>
                        <span className="px-3 py-1 bg-slate-800/50 text-slate-400 text-xs rounded-full">#메이플키우기환불방법</span>
                        <span className="px-3 py-1 bg-slate-800/50 text-slate-400 text-xs rounded-full">#게임환불</span>
                        <span className="px-3 py-1 bg-slate-800/50 text-slate-400 text-xs rounded-full">#MapleStoryIdle</span>
                        <span className="px-3 py-1 bg-slate-800/50 text-slate-400 text-xs rounded-full">#넥슨게임환불</span>
                    </div>
                </div>
            </article>
        </div>
    );
}
