import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Star, Zap, Target, TrendingUp, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
    title: '헥사 스탯 최적화 가이드 - 메이플 AI',
    description: '메이플스토리 헥사 스탯 환산 주스탯 구간별 최적 분배. 무과금부터 고인물까지 실제 검증된 데이터 기반 가이드.',
};

export default function HexaStatsGuidePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href="/guide"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">가이드 목록으로</span>
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">헥사 스탯 최적화 가이드</h1>
                    <p className="text-slate-400 mt-2">환산 주스탯 구간별 최적 분배 (검증된 데이터)</p>
                </div>
            </div>

            {/* Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Author Info */}
                <div className="flex items-center gap-4 mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                    <img src="/images/maple-ai-logo.jpg" alt="단풍이" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <div className="font-bold text-white">메이플 AI 단풍이</div>
                        <div className="text-sm text-slate-400">2025년 11월 27일 · 실제 데이터 기반</div>
                    </div>
                </div>

                {/* Introduction */}
                <section className="prose prose-invert max-w-none mb-12">
                    <div className="bg-gradient-to-br from-purple-900/30 via-indigo-900/30 to-blue-900/30 border border-purple-500/40 rounded-2xl p-8 mb-8 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-50"></div>

                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                            <Star className="w-8 h-8 text-purple-400 animate-pulse" />
                            헥사 스탯이란?
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6 mb-6 relative z-10">
                            <div className="space-y-4">
                                <p className="text-slate-300 leading-relaxed">
                                    헥사 스탯은 6차 전직 시스템의 강력한 스탯 강화 시스템입니다.
                                    <strong className="text-white"> 메인 스탯 1가지</strong>와 <strong className="text-white">에디셔널 스탯 2가지</strong>를 선택하며,
                                    메인은 에디셔널보다 <strong className="text-yellow-400">최대 2배 이상</strong> 효율을 제공합니다.
                                </p>

                                <div className="bg-indigo-950/50 border border-indigo-500/30 rounded-lg p-4">
                                    <h4 className="text-sm font-bold text-indigo-300 mb-2">💡 핵심 요약</h4>
                                    <ul className="space-y-1 text-sm text-slate-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-0.5">•</span>
                                            <span><strong className="text-white">메인 스탯</strong>: 레벨 20까지 강화 가능</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-0.5">•</span>
                                            <span><strong className="text-white">에디셔널 스탯</strong>: 각 레벨 10까지</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400 mt-0.5">•</span>
                                            <span>레벨마다 <strong className="text-yellow-400">강화율 20%씩 증가</strong></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                                <img
                                    src="/images/guides/hexa-stat-ingame.jpg"
                                    alt="인게임 헥사 스탯 화면"
                                    className="relative w-full h-auto rounded-lg shadow-2xl border border-purple-500/30 hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-lg">
                                    <p className="text-xs text-slate-300 text-center">
                                        📸 실제 인게임 헥사 매트릭스 화면
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Budget Guide First! */}
                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <DollarSign className="w-6 h-6 text-green-400" />
                        💰 먼저 읽으세요! 예산별 가이드
                    </h2>

                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-2 border-blue-500/40 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-3 flex items-center gap-2 text-lg">
                                <span className="text-2xl">🌱</span>
                                무과금 / 저예산 유저 (추천!)
                            </h4>
                            <ul className="space-y-2 text-slate-300 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span><strong className="text-white">헥사 스탯은 나중에!</strong> 일단 6차 스킬 강화가 최우선입니다</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span>코어 1개만 있어도 충분</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span><strong className="text-yellow-300">떡작(레벨 20까지 올려서 나온 옵션 그냥 쓰기)이 가장 효율적!</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span>옵션 고민하지 말고 레벨만 올리세요 (메인 5~6면 충분)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span>솔 에르다 조각은 헥사 스킬 강화에 아껴쓰세요</span>
                                </li>
                            </ul>
                            <div className="mt-4 p-3 bg-blue-950/30 rounded-lg border border-blue-700/30">
                                <p className="text-xs text-blue-200">
                                    💡 <strong>단풍이의 조언:</strong> 무과금은 옵션 고민 말고 그냥 떡작! 장비 업그레이드가 훨씬 효율적입니다.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                <span className="text-2xl">💳</span>
                                중과금 유저
                            </h4>
                            <ul className="space-y-2 text-slate-300 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400">•</span>
                                    <span>아래 환산 주스탯 가이드 참고</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400">•</span>
                                    <span>메인 레벨 7~8 목표</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                <span className="text-2xl">👑</span>
                                고인물 유저
                            </h4>
                            <ul className="space-y-2 text-slate-300 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-400">•</span>
                                    <span>메인 레벨 10+ 도전</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-400">•</span>
                                    <span>헥사 스탯 II까지 최적화</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <Zap className="w-6 h-6 text-yellow-400" />
                        환산 주스탯 구간별 최적 분배
                    </h2>

                    <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 mb-6">
                        <p className="text-slate-300 text-sm">
                            <strong className="text-indigo-400">💡 중요:</strong> 헥사 스탯 최적 분배는 환산 주스탯에 따라 달라집니다 (메이플 커뮤니티 검증 데이터)
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-green-400 mb-3">🌱 환산 0만~7만</h3>
                            <div className="space-y-3 mt-4">
                                <div className="flex items-center gap-3 bg-green-900/20 p-4 rounded-lg border border-green-700/30">
                                    <span className="text-3xl font-black text-green-400">1위</span>
                                    <div className="flex-1">
                                        <div className="font-bold text-white">공격력/마력 (메인)</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50">
                                    <span className="text-xl font-bold text-green-300">2위</span>
                                    <div className="text-white">주스탯 (에디셔널)</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-blue-400 mb-3">⚡ 환산 7만~9만</h3>
                            <div className="space-y-3 mt-4">
                                <div className="flex items-center gap-3 bg-blue-900/20 p-4 rounded-lg border border-blue-700/30">
                                    <span className="text-3xl font-black text-blue-400">1위</span>
                                    <div className="flex-1">
                                        <div className="font-bold text-white">공격력/마력 (메인)</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50">
                                    <span className="text-xl font-bold text-blue-300">2위</span>
                                    <div className="text-white">크리티컬 데미지 (에디셔널)</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-purple-400 mb-3">💪 환산 9만~11.7만</h3>
                            <div className="space-y-3 mt-4">
                                <div className="flex items-center gap-3 bg-purple-900/20 p-4 rounded-lg border border-purple-700/30">
                                    <span className="text-3xl font-black text-purple-400">1위</span>
                                    <div className="flex-1">
                                        <div className="font-bold text-white">크리티컬 데미지 (메인)</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50">
                                    <span className="text-xl font-bold text-purple-300">2위</span>
                                    <div className="text-white">공격력/마력 (에디셔널)</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border border-yellow-500/50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-yellow-300 mb-3">👑 환산 11.7만 이상</h3>
                            <div className="space-y-3 mt-4">
                                <div className="flex items-center gap-3 bg-yellow-900/30 p-4 rounded-lg border border-yellow-600/50">
                                    <span className="text-3xl font-black text-yellow-300">1위</span>
                                    <div className="flex-1">
                                        <div className="font-bold text-white">크리티컬 데미지 (메인)</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-950/30">
                                    <span className="text-xl font-bold text-yellow-200">2위</span>
                                    <div className="text-white">보스 데미지</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <Target className="w-6 h-6 text-red-400" />
                        핵심 포인트
                    </h2>

                    <div className="space-y-4">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">✅ 메인 스탯 = 에디셔널 2배 효율</h4>
                            <p className="text-slate-300 text-sm">메인을 잘 선택하는 것이 핵심!</p>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">⚠️ 비효율 구간 피하기</h4>
                            <p className="text-slate-300 text-sm mb-3">메인 3~4구간은 매우 비효율적</p>
                            <div className="bg-red-950/30 p-3 rounded-lg">
                                <div className="text-sm font-bold text-red-300">❌ 최악: 메인 4 / 에디 8 / 에디 8</div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-indigo-400" />
                        실전 팁
                    </h2>

                    <div className="space-y-4">
                        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">💡 환산 주스탯 계산기 활용</h4>
                            <p className="text-slate-300 text-sm">
                                maplescouter.com에서 닉네임만 입력하면 최적 분배 자동 계산!
                            </p>
                        </div>

                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">🔥 메인 레벨 7 이상?</h4>
                            <p className="text-slate-300 text-sm">
                                무조건 <strong className="text-yellow-400">공마를 메인</strong>에 두세요!
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="mt-16 border-t border-slate-700 pt-12">
                    <h2 className="text-3xl font-bold text-white mb-8">자주 묻는 질문</h2>

                    <div className="space-y-6">
                        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-orange-400 mb-2">Q. 언제부터 투자하나요?</h3>
                            <p className="text-slate-300 text-sm">
                                A. 6차 전직 직후부터! (단, 무과금은 6차 스킬 먼저)
                            </p>
                        </div>

                        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-orange-400 mb-2">Q. 리셋 비용은?</h3>
                            <p className="text-slate-300 text-sm">
                                A. 코어 초기화 1,000만 메소 (솔 에르다 소모 없음)
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">메이플 AI로 헥사 스탯 분석!</h3>
                    <p className="text-slate-300 mb-6">
                        실시간 캐릭터 분석으로 최적 분배 추천
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-colors shadow-lg"
                    >
                        지금 분석 받기 →
                    </Link>
                </div>
            </article>
        </div>
    );
}
