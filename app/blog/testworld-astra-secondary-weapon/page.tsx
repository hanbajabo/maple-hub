import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Shield, Sparkles, Trophy, Gift, AlertCircle, Star, Zap, Crown, Sword } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export const metadata = {
    title: '🛡️ 아스트라 보조무기 완벽 가이드 - 테스트월드 업데이트 | 메이플 콜로세움',
    description: '메이플스토리 아스트라 보조무기 시스템 총정리! 획득 방법, 전승 규칙, 직업별 보조무기 종류, 격전의 흔적 & 에리온의 조각 파밍까지 완벽 가이드.',
    keywords: '메이플스토리, 아스트라 보조무기, 격전의 흔적, 에리온의 조각, 보조무기 전승, 테스트월드, 그란디스 보스',
    openGraph: {
        title: '🛡️ 아스트라 보조무기 완벽 가이드 - 메이플 콜로세움',
        description: '아스트라 보조무기 획득부터 전승까지! 직업별 가이드 & 최적화 팁',
        type: 'article',
        publishedTime: '2026-01-09T00:00:00Z',
    }
};

export default function AstraSecondaryWeaponGuide() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <article className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
                {/* 헤더 */}
                <header className="mb-8 sm:mb-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm sm:text-base">블로그로 돌아가기</span>
                    </Link>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-400 mb-4">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            2026년 1월 9일
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            20분 읽기
                        </span>
                        <span className="px-2 sm:px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full text-xs font-semibold border border-cyan-500/50">
                            업데이트 소식
                        </span>
                        <span className="px-2 sm:px-3 py-1 bg-green-900/50 text-green-300 rounded-full text-xs font-semibold border border-green-500/50">
                            📅 1월 15일(목) 본섭 적용
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-transparent bg-clip-text">
                            🛡️ 아스트라 보조무기
                        </span>
                        <br />
                        <span className="text-slate-100">완벽 가이드</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-3">
                        그란디스의 힘이 담긴 새로운 보조무기! 획득 방법부터 전승 규칙, 직업별 최적화까지 모든 것을 알려드립니다.
                    </p>
                    <p className="text-sm text-yellow-400 font-semibold">
                        ⏰ 클라이언트 1.2.197 릴리즈 - 본섭 적용 예정: 2026년 1월 15일(목)
                    </p>
                </header>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* TL;DR */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-2 border-blue-500/50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                            <Zap className="w-6 h-6 text-yellow-400" />
                            핵심 요약
                        </h2>
                        <ul className="space-y-2 text-sm sm:text-base text-slate-200">
                            <li className="flex items-start gap-2">
                                <span className="text-green-400 mt-1">✓</span>
                                <span><span className="font-bold text-yellow-400">260레벨 이상</span>, 세르니움 스토리 퀘스트 완료 필요</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400 mt-1">✓</span>
                                <span><span className="font-bold text-blue-400">격전의 흔적</span> (그란디스 보스) + <span className="font-bold text-purple-400">에리온의 조각</span> (일일 퀘스트) 수집</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400 mt-1">✓</span>
                                <span>기존 보조무기 <span className="font-bold text-orange-400">전승 가능</span> (10억 메소~)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400 mt-1">✓</span>
                                <span>스타포스 <span className="font-bold text-red-400">파괴 시 10억 메소로 재구매</span> 가능</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400 mt-1">✓</span>
                                <span>직업별 <span className="font-bold text-cyan-400">특수 규칙</span> 확인 필수 (방패, 듀블 등)</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* 참여 조건 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-xl p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-green-400">
                            <Shield className="w-6 h-6 sm:w-8 sm:h-8" />
                            참여 조건 & 시작 방법
                        </h2>

                        <div className="space-y-4">
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <h3 className="font-bold text-lg text-green-300 mb-2">✅ 참여 대상</h3>
                                <ul className="space-y-2 ml-4 list-disc text-sm sm:text-base">
                                    <li><span className="font-bold text-yellow-400">265레벨 이상</span> 캐릭터</li>
                                    <li className="text-blue-300">[호텔 아르크스] 다시, 호텔 아르크스 <span className="text-green-400">완료</span></li>
                                    <li className="text-purple-300">[제네시스 무기] 남겨진 의문, 새로운 시작 <span className="text-green-400">완료</span></li>
                                </ul>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <h3 className="font-bold text-lg text-blue-300 mb-2">🎯 시작 방법</h3>
                                <p className="text-sm sm:text-base">화면 <span className="font-bold text-yellow-400">왼쪽 전구</span>를 통해 <span className="text-green-400">[아스트라 보조무기] 긴급 체포</span> 퀘스트 수령</p>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* 퀘스트 목록 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-xl p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-purple-400">
                            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
                            아스트라 보조무기 퀘스트 라인
                        </h2>

                        <div className="bg-slate-800/50 rounded-lg p-4">
                            <ol className="space-y-2 text-sm sm:text-base">
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-yellow-400">1.</span>
                                    <span>[아스트라 보조무기] 긴급 체포</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-yellow-400">2.</span>
                                    <span>[아스트라 보조무기] 고대신 사칭범</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-yellow-400">3.</span>
                                    <span>[아스트라 보조무기] 대질 신문</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-yellow-400">4.</span>
                                    <span>[아스트라 보조무기] 석방 조건</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-yellow-400">5.</span>
                                    <span className="text-green-400 font-semibold">[아스트라 보조무기] 에리온의 강화 → 미션 UI 오픈!</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-yellow-400">6.</span>
                                    <span>[아스트라 보조무기] 에리온의 진면목</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-yellow-400">7.</span>
                                    <span>[아스트라 보조무기] 아스트라 최종 강화</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-yellow-400">8.</span>
                                    <span>[아스트라 보조무기] 고대신, 연합 합류</span>
                                </li>
                            </ol>

                            <div className="mt-4 p-3 bg-blue-900/30 border border-blue-500/50 rounded text-xs sm:text-sm">
                                <p className="text-blue-300">
                                    <span className="font-bold">💡 TIP:</span> 퀘스트 진행도에 따라 아스트라 보조무기가 성장합니다! (15성 → 20성 → 30성)
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 획득 재화 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500/50 rounded-xl p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-orange-400">
                            <Gift className="w-6 h-6 sm:w-8 sm:h-8" />
                            필수 재화: 격전의 흔적 & 에리온의 조각
                        </h2>

                        <div className="space-y-4">
                            {/* 격전의 흔적 */}
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <h3 className="font-bold text-lg text-red-300 mb-3">⚔️ 격전의 흔적 (그란디스 보스)</h3>
                                <p className="text-sm text-slate-300 mb-3">선택받은 세렌 (노멀) 이상의 그란디스 지역 보스 처치 시 획득</p>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs sm:text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-600">
                                                <th className="text-left py-2">보스</th>
                                                <th className="text-right py-2">격전의 흔적</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs sm:text-sm">
                                            <tr className="border-b border-slate-700"><td className="py-1.5">선택받은 세렌 (노멀)</td><td className="text-right">6</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">감시자 칼로스 (이지)</td><td className="text-right">6</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">최초의 대적자 (이지)</td><td className="text-right">10</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">카링 (이지)</td><td className="text-right">15</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">감시자 칼로스 (노멀)</td><td className="text-right">20</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">선택받은 세렌 (하드)</td><td className="text-right">30</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">최초의 대적자 (노멀)</td><td className="text-right">40</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5 text-yellow-400">찬란한 흉성 (노멀)</td><td className="text-right text-yellow-400">50</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">림보 (노멀)</td><td className="text-right">60</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">카링 (노멀)</td><td className="text-right">80</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">발드릭스 (노멀)</td><td className="text-right">80</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">감시자 칼로스 (카오스)</td><td className="text-right">100</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">선택받은 세렌 (익스트림)</td><td className="text-right">180</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">최초의 대적자 (하드)</td><td className="text-right">180</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">림보 (하드)</td><td className="text-right">180</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5 text-orange-400">찬란한 흉성 (하드)</td><td className="text-right text-orange-400">210</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">카링 (하드)</td><td className="text-right">240</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">발드릭스 (하드)</td><td className="text-right">240</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">감시자 칼로스 (익스트림)</td><td className="text-right">500</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">최초의 대적자 (익스트림)</td><td className="text-right">540</td></tr>
                                            <tr><td className="py-1.5 text-red-400 font-bold">카링 (익스트림)</td><td className="text-right text-red-400 font-bold">1,440</td></tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-3 p-3 bg-yellow-900/30 border border-yellow-500/50 rounded text-xs">
                                    <p className="text-yellow-300">
                                        <span className="font-bold">⚠️ 주의:</span> 파티 플레이 시 인원 수만큼 나눠서 획득! 최대 1,000개까지 누적 가능
                                    </p>
                                </div>
                            </div>

                            {/* 에리온의 조각 */}
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <h3 className="font-bold text-lg text-purple-300 mb-3">💎 에리온의 조각 (일일 퀘스트)</h3>
                                <p className="text-sm text-slate-300 mb-3">그란디스 지역 일일 퀘스트 완료 시 획득 (교환 불가)</p>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs sm:text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-600">
                                                <th className="text-left py-2">일일 퀘스트</th>
                                                <th className="text-right py-2">조각 개수</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs sm:text-sm">
                                            <tr className="border-b border-slate-700"><td className="py-1.5">[일일] 세르니움 조사</td><td className="text-right">1</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">[일일] 호텔 아르크스 주변 청소</td><td className="text-right">3</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">[일일] 오디움 일대 탐사</td><td className="text-right">6</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">[일일] 도원경 오염 정화</td><td className="text-right">10</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">[일일] 아르테리아 잔당 처치</td><td className="text-right">15</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-1.5">[일일] 카르시온 복구 지원</td><td className="text-right">25</td></tr>
                                            <tr><td className="py-1.5 text-green-400">[일일] 탈라하트 고대신의 힘 조사</td><td className="text-right text-green-400 font-bold">45</td></tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-3 space-y-2">
                                    <div className="p-3 bg-blue-900/30 border border-blue-500/50 rounded text-xs">
                                        <p className="text-blue-300">
                                            <span className="font-bold">💡 TIP:</span> 가장 레벨 제한이 높은 지역에서만 획득 가능! 여러 일일 퀘스트 수행 시 차이만큼만 지급
                                        </p>
                                    </div>
                                    <div className="p-3 bg-green-900/30 border border-green-500/50 rounded text-xs">
                                        <p className="text-green-300">
                                            <span className="font-bold">🎁 보스 드롭:</span> 일부 하드/익스트림 보스에서 <span className="text-yellow-400">에리온의 조각 교환권</span> 획득 가능 (1회 교환 후 월드 내 이동 가능)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* 기본 능력치 & 속성 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50 rounded-xl p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-cyan-400">
                            <Star className="w-6 h-6 sm:w-8 sm:h-8" />
                            아스트라 보조무기 기본 능력치 & 속성
                        </h2>

                        <div className="space-y-4">
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <h3 className="font-bold text-lg text-cyan-300 mb-3">📊 공통 기본 능력치</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    <div className="bg-slate-900/50 rounded p-3">
                                        <p className="text-yellow-400 font-semibold mb-1">물리 계열</p>
                                        <p>STR +20, DEX +20, 공격력 +7</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded p-3">
                                        <p className="text-purple-400 font-semibold mb-1">마법 계열</p>
                                        <p>INT +20, LUK +20, 마력 +7</p>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 mt-3">
                                    ※ 일부 직업은 특수 능력치 적용 (제논, 듀블, 데몬, 제로 등)
                                </p>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <h3 className="font-bold text-lg text-green-300 mb-3">⭐ 아이템 속성</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span><span className="font-bold text-red-400">교환 불가</span></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-yellow-400">•</span>
                                        <span><span className="font-bold text-yellow-400">200레벨 이상</span> 착용 가능</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400">•</span>
                                        <span>퀘스트 진행도에 따라 <span className="font-bold text-blue-400">스타포스 15성 → 20성 → 30성</span> 강화 가능</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400">•</span>
                                        <span>파괴 시 <span className="font-bold text-green-400">10억 메소로 재구매</span> 가능</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-400">•</span>
                                        <span>퀘스트 <span className="font-bold text-purple-400">초기화 후 재진행</span> 가능 (에레브 나인하트)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 전승 시스템 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border-2 border-pink-500/50 rounded-xl p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-pink-400">
                            <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
                            전승 시스템 완벽 가이드
                        </h2>

                        <div className="space-y-4">
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <h3 className="font-bold text-lg text-pink-300 mb-3">🔄 공통 전승 규칙</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-yellow-400">💰</span>
                                        <span><span className="font-bold text-yellow-400">10억 메소</span> 사용하여 잠재능력 + 에디셔널 잠재능력 전승</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400">♻️</span>
                                        <span>이미 전승/강화된 아스트라 보조무기에도 <span className="font-bold text-blue-400">다시 전승 가능</span></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">⚠️</span>
                                        <span>일부 방패, 블레이드 제외 시 <span className="font-bold text-red-400">스타포스 초기화</span></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-orange-400">🚫</span>
                                        <span><span className="font-bold text-orange-400">귀속의 표식</span> 아이템은 전승 불가</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-400">❌</span>
                                        <span><span className="font-bold text-purple-400">제로</span>는 전승 불가</span>
                                    </li>
                                </ul>
                            </div>

                            {/* 듀얼블레이드 특수 케이스 */}
                            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/50 rounded-lg p-4">
                                <h3 className="font-bold text-lg text-red-300 mb-3 flex items-center gap-2">
                                    <Sword className="w-5 h-5" />
                                    듀얼블레이드 특수 케이스
                                </h3>
                                <div className="space-y-3">
                                    <p className="text-sm">
                                        <span className="font-bold text-yellow-400">아케인셰이드 블레이드</span>만 전승 가능
                                        <span className="text-xs text-slate-400 ml-2">(이벤트 15성 블레이드는 제외)</span>
                                    </p>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-xs">
                                            <thead>
                                                <tr className="border-b border-slate-600">
                                                    <th className="text-left py-2">스타포스</th>
                                                    <th className="text-right py-2">전승 비용</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b border-slate-700"><td className="py-1">15성 이하</td><td className="text-right">10억</td></tr>
                                                <tr className="border-b border-slate-700"><td className="py-1">16성</td><td className="text-right">11억</td></tr>
                                                <tr className="border-b border-slate-700"><td className="py-1">17성</td><td className="text-right">13억</td></tr>
                                                <tr className="border-b border-slate-700"><td className="py-1">18성</td><td className="text-right">15억</td></tr>
                                                <tr className="border-b border-slate-700"><td className="py-1">19성</td><td className="text-right">20억</td></tr>
                                                <tr className="border-b border-slate-700"><td className="py-1">20성</td><td className="text-right">25억</td></tr>
                                                <tr className="border-b border-slate-700"><td className="py-1">21성</td><td className="text-right">35억</td></tr>
                                                <tr className="border-b border-slate-700"><td className="py-1">22성</td><td className="text-right">50억</td></tr>
                                                <tr className="border-b border-slate-700"><td className="py-1">23성</td><td className="text-right">95억</td></tr>
                                                <tr className="border-b border-slate-700"><td className="py-1">24성</td><td className="text-right">250억</td></tr>
                                                <tr className="border-b border-slate-700"><td className="py-1">25성</td><td className="text-right">670억</td></tr>
                                                <tr><td className="py-1 text-red-400">26성 이상</td><td className="text-right text-red-400">1,800억</td></tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="p-3 bg-green-900/30 border border-green-500/50 rounded text-xs">
                                        <p className="text-green-300">
                                            <span className="font-bold">💡 보너스:</span> 주문서 강화 능력치가 324점 이상이면 <span className="text-yellow-400 font-bold">아스트라 블레이드 전용 주문서 10개 추가 지급!</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 방패 직업 특수 케이스 */}
                            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/50 rounded-lg p-4">
                                <h3 className="font-bold text-lg text-blue-300 mb-3 flex items-center gap-2">
                                    <Shield className="w-5 h-5" />
                                    방패 직업 특수 케이스
                                </h3>
                                <p className="text-sm mb-3">
                                    히어로, 팔라딘, 소울마스터 (한손무기), 아크메이지, 비숍, 플레임위자드, 에반, 배틀메이지, 섀도어
                                </p>

                                <div className="space-y-3">
                                    <div className="bg-slate-900/50 rounded p-3">
                                        <p className="font-semibold text-cyan-300 mb-2 text-sm">🛡️ 데이모스 실드 전승</p>
                                        <ul className="space-y-1 text-xs">
                                            <li>• 스타포스 강화 단계 <span className="text-green-400">그대로 전승</span></li>
                                            <li>• 전승 비용: 10성 이하 10억 ~ 20성 100억</li>
                                            <li>• 20성 + 주문서 능력치 우수 시 <span className="text-yellow-400">22성으로 보정</span></li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-900/50 rounded p-3">
                                        <p className="font-semibold text-purple-300 mb-2 text-sm">✨ 놀라운 장비강화 주문서 보정</p>
                                        <p className="text-xs mb-2">12성 이상 피어리스/데이모스 실드의 능력치가 기준치 이상이면 스타포스 보정!</p>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="bg-slate-800/50 rounded p-2">
                                                <p className="text-blue-300 font-semibold">피어리스 프렐류드</p>
                                                <p>355점 → 24성</p>
                                                <p>410점 → 25성</p>
                                            </div>
                                            <div className="bg-slate-800/50 rounded p-2">
                                                <p className="text-red-300 font-semibold">데이모스 세이지</p>
                                                <p>370점 → 23성</p>
                                                <p>450점 → 24성</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-2">※ 아이템 점수 = (주스탯 × 1) + (공/마 × 3)</p>
                                    </div>
                                </div>
                            </div>

                            {/* 데몬 특수 케이스 */}
                            <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/50 rounded-lg p-4">
                                <h3 className="font-bold text-lg text-purple-300 mb-3">😈 데몬 슬레이어/어벤져 특수 스킬</h3>
                                <div className="bg-slate-900/50 rounded p-3">
                                    <p className="font-semibold text-purple-400 mb-2">🔮 아스트라 인퓨전</p>
                                    <p className="text-sm mb-2">
                                        <span className="font-bold text-yellow-400">루인 포스실드</span> 전승 시 사용 가능한 온/오프 스킬
                                    </p>
                                    <ul className="space-y-1 text-xs">
                                        <li className="text-green-400">• ON: 최종 데미지 증가 (원래 루인 효과)</li>
                                        <li className="text-red-400">• OFF: 피격 데미지 감소 (안전 모드)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* CTA */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
                                아스트라 보조무기로 더 강해지세요!
                            </span>
                        </h2>
                        <p className="text-slate-300 mb-4 sm:mb-6 text-sm sm:text-base">
                            그란디스의 힘이 담긴 최강 보조무기, 지금 바로 시작하세요! 🛡️
                        </p>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                        >
                            <span>더 많은 가이드 보기</span>
                            <span>→</span>
                        </Link>
                    </div>
                </section>
            </article>
        </div>
    );
}
