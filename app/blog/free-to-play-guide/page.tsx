import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';

export const metadata: Metadata = {
    title: '완전 무자본 200레벨 육성 가이드 - 0메소, 이벤트 없이도 가능! | Maple AI 블로그',
    description: '본캐 지원 없이, 이벤트 없이, 0메소로 시작해서 200레벨 달성하는 완벽 퀘스트 육성 가이드. 3시간 30분이면 충분합니다!',
    keywords: '메이플스토리, 무자본, 200레벨, 퀘스트 육성, 이벤트 없이, 무과금, 메이플 육성',
};

export default function FreeToPlayGuidePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">블로그 목록으로</span>
                    </Link>
                </div>
            </div>

            {/* Article */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Title */}
                <header className="mb-8 sm:mb-12">
                    <div className="inline-block px-3 py-1 bg-green-600/20 text-green-400 text-xs sm:text-sm font-bold rounded-full mb-4">
                        완전 무자본 육성
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
                        0메소, 이벤트 없이도 가능!<br className="hidden sm:block" /> 완전 무자본 200레벨 육성 가이드
                    </h1>
                    <div className="flex items-center gap-6 text-xs sm:text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>2025년 12월 11일</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>15분 읽기</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    {/* Introduction */}
                    <section className="mb-12">
                        <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6 mb-8">
                            <p className="text-lg text-slate-200 leading-relaxed mb-4">
                                "본캐의 도움 없이, 이벤트 참여 없이, 완전한 0메소에서 시작할 수 있을까?"
                            </p>
                            <p className="text-slate-300 leading-relaxed mb-0">
                                답은 <strong className="text-green-400">YES</strong>입니다!
                                퀘스트만 잘 활용하면 <strong className="text-white">약 3시간 30분</strong>만에 200레벨 달성이 가능합니다.
                                이 가이드는 진정한 무자본 육성의 모든 것을 담았습니다.
                            </p>
                        </div>
                    </section>

                    {/* Section 1: 육성 컨셉 */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-3xl">💚</span>
                            1. 완전 무자본 육성의 핵심 전략
                        </h2>

                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-5">
                                <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                                    <span className="text-2xl">💰</span>
                                    0메소 시작
                                </h4>
                                <p className="text-slate-300 text-sm">
                                    본캐의 지원 없이<br />
                                    노템, 노메소로 시작
                                </p>
                            </div>

                            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-5">
                                <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                                    <span className="text-2xl">📜</span>
                                    퀘스트 중심
                                </h4>
                                <p className="text-slate-300 text-sm">
                                    사냥 대신<br />
                                    테마던전 & 길뚫 퀘스트
                                </p>
                            </div>

                            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-5">
                                <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                                    <span className="text-2xl">⏱️</span>
                                    3.5시간
                                </h4>
                                <p className="text-slate-300 text-sm">
                                    이벤트 버닝 없이<br />
                                    깡으로 육성
                                </p>
                            </div>
                        </div>

                        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
                            <h4 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
                                💡 왜 퀘스트 중심인가?
                            </h4>
                            <p className="text-slate-300 text-sm mb-2">
                                무자본은 <strong className="text-white">스타포스와 데미지가 부족</strong>하여 사냥이 매우 힘듭니다.
                            </p>
                            <p className="text-slate-300 text-sm">
                                하지만 퀘스트는 <strong className="text-green-400">스펙에 관계없이 확정 경험치</strong>를 주기 때문에
                                무자본에게 가장 효율적인 육성 방법입니다!
                            </p>
                        </div>
                    </section>

                    {/* Section 2: 레벨별 상세 루트 */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-3xl">🗺️</span>
                            2. 레벨별 완벽 육성 루트 (0~200)
                        </h2>

                        <div className="space-y-6">
                            {/* Lv 1-30 */}
                            <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-cyan-400 mb-3">Lv.1 ~ 30: 튜토리얼 스킵</h3>
                                <p className="text-slate-300 text-sm">
                                    캐릭터 생성 시 <strong className="text-white">튜토리얼 스킵</strong>으로 바로 <strong className="text-green-400">30레벨</strong> 시작!
                                </p>
                            </div>

                            {/* Lv 30-60 */}
                            <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-blue-400 mb-3">Lv.30 ~ 60: 골드비치 (30분)</h3>
                                <div className="space-y-3 text-sm">
                                    <p className="text-slate-300">
                                        <strong className="text-yellow-400">골드비치 테마던전</strong> 클리어
                                    </p>
                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <p className="text-green-400 font-bold mb-2">✅ 장점</p>
                                        <ul className="text-slate-400 space-y-1">
                                            <li>• 30레벨 장비 지원</li>
                                            <li>• 길라잡이 이동 편리</li>
                                            <li>• 확정 경험치</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Lv 60-80 */}
                            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-green-400 mb-3">Lv.60 ~ 80: 에델슈타인 & 레벤 광산 (40분)</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <p className="text-white font-semibold mb-2">📍 진행 순서</p>
                                        <ol className="text-slate-300 space-y-2">
                                            <li>1. 3차 전직 완료</li>
                                            <li>2. <strong className="text-yellow-400">에델슈타인 스토리</strong> 진행</li>
                                            <li>3. <strong className="text-blue-400">레벤 광산 퀘스트</strong> 완료</li>
                                        </ol>
                                    </div>
                                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                                        <p className="text-blue-300 font-bold mb-1">💡 꿀팁</p>
                                        <p className="text-slate-400 text-xs">
                                            택시와 길라잡이를 활용해 동선 최소화!<br />
                                            (오르비스/엘나스는 스킵)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Lv 80-100 */}
                            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-purple-400 mb-3">Lv.80 ~ 100: 마가티아 (30분)</h3>
                                <div className="space-y-3 text-sm">
                                    <p className="text-slate-300">
                                        <strong className="text-yellow-400">국민 육성 루트!</strong> 알카드노/제뉴미스트 퀘스트
                                    </p>
                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <p className="text-green-400 font-bold mb-2">⭐ 추천 이유</p>
                                        <ul className="text-slate-400 space-y-1">
                                            <li>• 퀘스트 경험치가 매우 짭짤</li>
                                            <li>• 100레벨까지 빠르게 도달</li>
                                            <li>• 사냥 필요 최소</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Lv 100-110 */}
                            <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-red-400 mb-3">Lv.100 ~ 110: 자쿰 & 헬리시움 (30분)</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="bg-slate-900/50 rounded-lg p-4 mb-3">
                                        <p className="text-white font-semibold mb-2">⚔️ 노말 자쿰 격파</p>
                                        <p className="text-yellow-400">1업 보장! (필수 클리어)</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <p className="text-white font-semibold mb-2">🏰 헬리시움 퀘스트</p>
                                        <p className="text-slate-400">
                                            매그너스 선행 퀘스트 진행 (사냥보다 퀘스트 경험치 확보)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Lv 110-125 */}
                            <div className="bg-gradient-to-r from-yellow-900/20 to-amber-900/20 border border-yellow-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-yellow-400 mb-3">Lv.110 ~ 125: 사자왕의 성 (30분)</h3>
                                <div className="space-y-3 text-sm">
                                    <p className="text-slate-300">
                                        <strong className="text-blue-400">반레온 선행 퀘스트</strong> 진행
                                    </p>
                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <p className="text-green-400 font-bold mb-2">🎁 보상</p>
                                        <ul className="text-slate-400 space-y-1">
                                            <li>• <strong className="text-white">고귀한 이피아의 반지</strong> 획득</li>
                                            <li>• 준수한 경험치</li>
                                            <li>• 반레온 입장 가능</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Lv 125-140 */}
                            <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-indigo-400 mb-3">Lv.125 ~ 140: 시간의 신전 (30분)</h3>
                                <div className="space-y-3 text-sm">
                                    <p className="text-slate-300">
                                        <strong className="text-yellow-400">핑크빈 선행 퀘스트</strong> (추억/후회/망각의 길)
                                    </p>
                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <p className="text-purple-400 font-bold mb-2">🎯 목표</p>
                                        <p className="text-slate-400 mb-2">
                                            무자본에게 필수적인 핑크빈 길뚫을 겸하며 레벨업
                                        </p>
                                        <p className="text-orange-400 text-xs">
                                            💡 퀘스트가 끊기면 아랫마을 현상수배 퀘스트 추천
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Lv 140-150 */}
                            <div className="bg-gradient-to-r from-cyan-900/20 to-teal-900/20 border border-cyan-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-cyan-400 mb-3">Lv.140 ~ 150: 크로스 헌터 (20분)</h3>
                                <div className="space-y-3 text-sm">
                                    <p className="text-slate-300">
                                        <strong className="text-yellow-400">암벽거인 콜로서스 & 크로스 헌터 퀘스트</strong>
                                    </p>
                                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                                        <p className="text-green-400 font-bold mb-2">🎁 중요 보상!</p>
                                        <ul className="text-slate-300 space-y-1">
                                            <li>• 부족한 <strong className="text-white">스타포스 보충</strong></li>
                                            <li>• 물약값 획득</li>
                                            <li>• 장신구 획득</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Lv 150-170 */}
                            <div className="bg-gradient-to-r from-pink-900/20 to-rose-900/20 border border-pink-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-pink-400 mb-3">Lv.150 ~ 170: 미래의 문 (40분)</h3>
                                <div className="space-y-3 text-sm">
                                    <p className="text-slate-300 mb-2">
                                        암벽거인 마무리 후 선택:
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div className="bg-slate-900/50 rounded-lg p-3">
                                            <p className="text-white font-semibold mb-1">A. 지구방위본부</p>
                                            <p className="text-slate-400 text-xs">퀘스트 경험치</p>
                                        </div>
                                        <div className="bg-slate-900/50 rounded-lg p-3">
                                            <p className="text-white font-semibold mb-1">B. 미래의 문</p>
                                            <p className="text-slate-400 text-xs">파괴된 헤네시스</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Lv 170-185 */}
                            <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-red-400 mb-3">🔥 Lv.170 ~ 185: 크리티아스 (40분) - 핵심 구간!</h3>
                                <div className="space-y-4 text-sm">
                                    <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                                        <p className="text-orange-300 font-bold mb-2">⚠️ 주의사항</p>
                                        <ul className="text-slate-400 space-y-1">
                                            <li>• 몬스터가 강력함</li>
                                            <li>• 맵이 복잡함</li>
                                            <li>• 스펙이 낮으면 힘들 수 있음</li>
                                        </ul>
                                    </div>
                                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                                        <p className="text-blue-300 font-bold mb-2">💡 길라잡이 텔레포트 팁</p>
                                        <ul className="text-slate-300 space-y-1">
                                            <li>• <strong className="text-yellow-400">비극의 숲 1</strong></li>
                                            <li>• <strong className="text-yellow-400">깊어지는 비극의 숲</strong></li>
                                            <li>• 길라잡이(U키)로 빠른 이동!</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Lv 185-190 */}
                            <div className="bg-gradient-to-r from-amber-900/20 to-yellow-900/20 border border-amber-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-amber-400 mb-3">Lv.185 ~ 190: 황혼의 페리온 (20분)</h3>
                                <div className="space-y-3 text-sm">
                                    <p className="text-slate-300">
                                        단순 <strong className="text-yellow-400">사냥 및 수집 퀘스트</strong> 위주
                                    </p>
                                    <p className="text-slate-400 text-xs">
                                        비교적 쉬운 구간, 꾸준히 퀘스트만 진행하면 OK!
                                    </p>
                                </div>
                            </div>

                            {/* Lv 190-200 */}
                            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
                                    <span className="text-3xl">🎉</span>
                                    Lv.190 ~ 200: 여우골짜기 & 막타 (30분)
                                </h3>
                                <div className="space-y-4 text-sm">
                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <p className="text-white font-semibold mb-2">1. 여우골짜기 테마던전</p>
                                        <p className="text-slate-400">
                                            190부터 진행, 199레벨까지 꾸준히 경험치 획득
                                        </p>
                                    </div>
                                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                                        <p className="text-green-300 font-semibold mb-2">2. 막타 경험치: 헤이븐 멍청이 퀘스트</p>
                                        <p className="text-slate-400 mb-2">
                                            199레벨에서 경험치가 애매하게 남았을 때
                                        </p>
                                        <p className="text-yellow-400 text-xs">
                                            💡 기계무덤 - 헤이븐 초반 대화 퀘스트로 막타 경험치 획득!
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-r from-yellow-500/20 to-green-500/20 border-2 border-yellow-500/50 rounded-lg p-5">
                                        <p className="text-2xl font-black text-yellow-300 text-center mb-2">
                                            🎊 200레벨 달성! 🎊
                                        </p>
                                        <p className="text-center text-slate-300 text-sm">
                                            완전 무자본으로 200레벨 달성 완료!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: 꿀팁 */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-3xl">💡</span>
                            3. 무자본 유저 필수 꿀팁
                        </h2>

                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                                    <span>🗺️</span>
                                    길라잡이 최대 활용법
                                </h3>
                                <p className="text-slate-300 text-sm mb-3">
                                    텔레포트 아이템이 없으므로 <strong className="text-white">길라잡이(U키)</strong>의
                                    <strong className="text-yellow-400"> 추천 사냥터</strong>를 이용해 퀘스트 지역 근처로 이동하여 시간을 단축합니다.
                                </p>
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <p className="text-green-400 font-bold mb-2">✅ 활용 예시</p>
                                    <ul className="text-slate-400 text-sm space-y-1">
                                        <li>• 크리티아스: "비극의 숲" 검색으로 빠른 이동</li>
                                        <li>• 레벤 광산: 근처 사냥터로 이동 후 걸어가기</li>
                                        <li>• 헬리시움: 길라잡이로 헬리시움 입구로</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                                    <span>⚔️</span>
                                    장비 수급 방법
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <p className="text-white font-semibold mb-2">🛒 경매장 활용</p>
                                        <p className="text-slate-400 mb-2">
                                            최저가 매물로 저렴한 장비 구매:
                                        </p>
                                        <ul className="text-slate-300 space-y-1">
                                            <li>• <strong className="text-yellow-400">보스 장신구:</strong> 응축, 아쿠아틱, 실블링</li>
                                            <li>• <strong className="text-blue-400">방어구:</strong> 네크로/반레온/카루타 세트</li>
                                            <li>• <strong className="text-purple-400">무기:</strong> 파프니르 (없으면 줍는 템)</li>
                                        </ul>
                                    </div>
                                    <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                                        <p className="text-orange-300 font-bold mb-1">💡 팁</p>
                                        <p className="text-slate-400 text-xs">
                                            퀘스트로 얻은 메소로 최저가 장비만 구매하면 충분합니다!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                                    <span>📊</span>
                                    하이퍼 스탯 세팅
                                </h3>
                                <p className="text-slate-300 text-sm mb-3">
                                    무자본은 원킬이 안 나오므로 <strong className="text-white">사냥 효율</strong>이 중요합니다!
                                </p>
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <p className="text-green-400 font-bold mb-2">✅ 추천 분배</p>
                                    <ul className="text-slate-300 text-sm space-y-1">
                                        <li>1. <strong className="text-yellow-400">데미지</strong> (우선 투자!)</li>
                                        <li>2. <strong className="text-blue-400">일반 몬스터 데미지</strong></li>
                                        <li>3. 크리티컬 확률/데미지</li>
                                    </ul>
                                    <p className="text-orange-400 text-xs mt-3">
                                        💡 원킬컷을 낮춰 사냥 효율 극대화!
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                                    <span>📜</span>
                                    룬 & 엘리트 몬스터
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <p className="text-yellow-400 font-bold mb-2">⭐ 룬 활용</p>
                                        <p className="text-slate-300 mb-2">
                                            사냥터에 뜨는 <strong className="text-white">경험의 룬</strong>은 무조건 사용!
                                        </p>
                                        <p className="text-slate-400 text-xs">
                                            경험치 버프 2배, 무자본에게는 필수!
                                        </p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <p className="text-purple-400 font-bold mb-2">👹 엘리트 몬스터</p>
                                        <p className="text-slate-300 mb-2">
                                            출현 시 꼭 처치 (경험치 + 아이템)
                                        </p>
                                        <p className="text-slate-400 text-xs">
                                            엘리트 보스까지 나오면 대박!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Conclusion */}
                    <section className="mb-12">
                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">마치며</h2>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                완전 무자본 육성은 언뜻 보면 불가능해 보이지만,
                                <strong className="text-green-400"> 퀘스트만 잘 활용하면 충분히 가능</strong>합니다.
                            </p>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                이벤트나 본캐의 도움 없이도 <strong className="text-yellow-400">3시간 30분</strong>만에
                                200레벨을 달성할 수 있다는 것은, 메이플스토리가 여전히
                                <strong className="text-white"> 노력으로 강해질 수 있는 게임</strong>임을 증명합니다.
                            </p>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                이 가이드를 따라 부캐를 키우거나, 친구에게 추천하거나,
                                새 서버에서 도전해보세요. 여러분도 충분히 할 수 있습니다!
                            </p>
                            <p className="text-slate-400 text-sm">
                                더 많은 팁이 필요하다면 <Link href="/guide" className="text-blue-400 hover:text-blue-300 underline">메이플 AI 가이드</Link>를
                                참고하세요!
                            </p>
                        </div>
                    </section>
                </div>

                {/* Share & Navigation */}
                <div className="border-t border-slate-800 pt-8 mt-12">
                    <div className="flex justify-between items-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>블로그 목록으로</span>
                        </Link>
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span>공유하기</span>
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
}
