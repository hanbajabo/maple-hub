'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Sparkles, Star, Gift, TrendingUp, AlertCircle, ArrowLeft, Zap, Trophy, Crown, Heart, Target } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function TestworldUpdate197Page() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <header className="w-full sm:max-w-7xl flex justify-between items-center px-3 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 mx-auto">
                <Link href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-lg font-bold">블로그로 돌아가기</span>
                </Link>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Title Section */}
                <div className="mb-8 sm:mb-12">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                        <span className="text-sm sm:text-base text-slate-400">2026년 1월 9일</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent leading-tight">
                        ✨ 테스트월드 1.2.197 릴리즈 총정리 - 신규 보스 & 대규모 업데이트
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-4 sm:mb-6">
                        2026년 1월 15일 본섭 적용 예정! 찬란한 흉성, 버닝 익스프레스 등 주요 업데이트 내용을 정리했습니다.
                    </p>

                    {/* Update Schedule */}
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                            업데이트 일정
                        </h3>
                        <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-slate-200">
                            <p>• <span className="font-bold text-purple-300">테스트월드</span>: 2026년 1월 8일 (목)</p>
                            <p>• <span className="font-bold text-pink-300">본서버 적용 예정</span>: 2026년 1월 15일 (목)</p>
                        </div>
                    </div>
                </div>

                {/* 신규 보스 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-2 border-purple-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400">신규 보스: 찬란한 흉성</h2>
                        </div>

                        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-200">
                            {/* 찬란한 흉성 이미지 */}
                            <div className="w-full rounded-lg overflow-hidden mb-4 bg-slate-900/50">
                                <Image
                                    src="/images/brilliant-star.png"
                                    alt="찬란한 흉성"
                                    width={1024}
                                    height={300}
                                    className="w-full h-auto"
                                    priority
                                />
                            </div>

                            <p className="text-sm sm:text-base leading-relaxed">
                                환영 마법으로 본성을 감추고 모두를 현혹하는 <span className="font-bold text-purple-300">찬란한 흉성</span>이 등장합니다!
                            </p>

                            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4 border border-purple-500/30">
                                <h4 className="font-bold text-base sm:text-lg mb-2 text-purple-300">📋 참여 조건</h4>
                                <ul className="space-y-1.5 ml-4 list-disc">
                                    <li>'[검은 바다] 귀환' 퀘스트 완료</li>
                                    <li>280레벨 이상 캐릭터</li>
                                    <li>입장: 검은 바다 - 현혹의 신전 게이트</li>
                                </ul>
                            </div>

                            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 sm:p-4">
                                <h4 className="font-bold text-base sm:text-lg mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-red-400" />
                                    <span className="text-red-300">하드 모드 주의사항</span>
                                </h4>
                                <ul className="space-y-1.5 ml-4 list-disc">
                                    <li>1월 16일(금) 오후 7시 이후 입장 가능</li>
                                    <li>1월 22일(목) 오전 0시~오후 6시 59분 59초: <span className="font-bold text-red-400">1인 파티 입장 불가</span></li>
                                </ul>
                            </div>

                            <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-3 sm:p-4">
                                <h4 className="font-bold text-base sm:text-lg mb-3 text-green-300">🎁 난이도별 보상</h4>

                                <div className="space-y-3">
                                    {/* 하드 전용 보상 */}
                                    <div className="bg-red-900/30 border border-red-500/40 rounded p-3">
                                        <p className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                                            <Crown className="w-4 h-4" />
                                            하드 난이도 전용
                                        </p>
                                        {/* 하드 보상 이미지 */}
                                        <div className="w-full rounded overflow-hidden mb-2">
                                            <Image
                                                src="/images/brilliant-star-rewards.png"
                                                alt="하드 전용 보상"
                                                width={1024}
                                                height={400}
                                                className="w-full h-auto"
                                            />
                                        </div>
                                        <ul className="space-y-1 ml-4 list-disc text-xs sm:text-sm">
                                            <li>
                                                <span className="text-yellow-400 font-bold">황홀한 악몽</span>
                                                <div className="ml-4 text-xs text-slate-300 mt-0.5">
                                                    Lv.250 반지 / 공격력 보스 세트<br />
                                                    올스탯 +10, 최대 HP/MP +500, 방어력 +20, 마력 +5
                                                </div>
                                            </li>
                                            <li className="text-slate-300">황홀한 환상의 단편 (황홀한 악몽 교환 재료)</li>
                                        </ul>
                                    </div>

                                    {/* 노말 전용 보상 */}
                                    <div className="bg-blue-900/30 border border-blue-500/40 rounded p-3">
                                        <p className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                                            <Star className="w-4 h-4" />
                                            노말 난이도 전용
                                        </p>
                                        <ul className="space-y-1 ml-4 list-disc text-xs sm:text-sm">
                                            <li className="text-slate-300">황홀한 환상의 단편 조각 (5개 교환 → 황홀한 환상의 단편 1개)</li>
                                        </ul>
                                    </div>

                                    {/* 공통 보상 */}
                                    <div className="bg-purple-900/30 border border-purple-500/40 rounded p-3">
                                        <p className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
                                            <Gift className="w-4 h-4" />
                                            공통 보상 (노말 + 하드)
                                        </p>
                                        {/* 공통 보상 이미지 */}
                                        <div className="w-full rounded overflow-hidden mb-2">
                                            <Image
                                                src="/images/brilliant-star-common-rewards.png"
                                                alt="공통 보상"
                                                width={1024}
                                                height={400}
                                                className="w-full h-auto"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                                            <div>
                                                <p className="font-semibold text-yellow-300 mb-1">장비 아이템</p>
                                                <ul className="space-y-0.5 ml-3 list-disc">
                                                    <li>생명의 보스 반지 상자</li>
                                                    <li>흉성로이드 (안드로이드)</li>
                                                    <li>환상의 에테르넬 방어구 상자</li>
                                                    <li>생명의 연마석</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-purple-300 mb-1">소울 & 기타</p>
                                                <ul className="space-y-0.5 ml-3 list-disc">
                                                    <li>찬란한 흉성 소울 9종</li>
                                                    <li>찬란한 흉성 소울 조각</li>
                                                    <li>소울 스킬: 환혹, 메아리치는 성광</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 이벤트 보상 */}
                                    <div className="bg-slate-800/50 border border-slate-600 rounded p-3">
                                        <p className="font-semibold text-cyan-300 mb-2">🎯 이벤트 보상</p>
                                        <ul className="space-y-1 ml-4 list-disc text-xs sm:text-sm">
                                            <li><span className="font-bold text-blue-400">노말 격파</span>: 환영의 기억 (흐릿한 3,000 + 선명한 2,000 + 온전한 40)</li>
                                            <li><span className="font-bold text-purple-400">하드 격파</span>: 환영의 기억 (흐릿한 3,000 + 선명한 2,000 + 온전한 100)</li>
                                            <li>도전의 문장 1,500개 (노말/하드 공통)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* 미혹의 부름 이벤트 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-pink-900/30 to-red-900/30 border-2 border-pink-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <Star className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-400">[보스 격파 이벤트] 미혹의 부름</h2>
                        </div>

                        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-200">
                            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4">
                                <h4 className="font-bold text-base sm:text-lg mb-2">📅 이벤트 기간</h4>
                                <ul className="space-y-1.5 ml-4 list-disc">
                                    <li>일반 격파: 1월 15일(목) ~ 2월 11일(수) 23:59</li>
                                    <li>1인 선착순: 1월 22일(목) 19:00 ~ 2월 11일(수) 23:59</li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg p-3 sm:p-4">
                                <h4 className="font-bold text-base sm:text-lg mb-3 text-purple-300">🏆 일반 격파 보상</h4>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <span className="font-semibold">노말 격파</span>
                                            <div className="text-slate-300 mt-0.5">흉성의 정령 이펙트 선택권</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <span className="font-semibold">하드 격파</span>
                                            <div className="text-slate-300 mt-0.5">미혹의 명찰/말풍선 반지 교환권</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-lg p-3 sm:p-4">
                                <h4 className="font-bold text-base sm:text-lg mb-3 text-yellow-300">👑 1인 선착순 격파 보상 (선착순 10명)</h4>
                                <ul className="space-y-1.5 ml-4 list-disc">
                                    <li className="text-yellow-400 font-semibold">흉성의 지배자 칭호 (영구)</li>
                                    <li>미혹의 부름 피니시 어택 이펙트</li>
                                    <li>흉성이 잠든 바다 커스텀 배경</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* 버닝 익스프레스 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400">버닝 익스프레스</h2>
                        </div>

                        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-200">
                            <p className="text-sm sm:text-base">
                                새로운 익스프레스 부스터로 <span className="font-bold text-orange-300">빠른 성장</span>을 경험하세요!
                            </p>

                            {/* 버닝 익스프레스 이미지 */}
                            <div className="w-full rounded-lg overflow-hidden mb-4 bg-slate-900/50">
                                <Image
                                    src="/images/burning-express.png"
                                    alt="버닝 익스프레스"
                                    width={1024}
                                    height={400}
                                    className="w-full h-auto"
                                />
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4">
                                <h4 className="font-bold text-base sm:text-lg mb-2">📋 참여 조건 & 기간</h4>
                                <ul className="space-y-1.5 ml-4 list-disc">
                                    <li>260레벨 이상 캐릭터</li>
                                    <li>1월 15일(목) ~ 2월 11일(수) 23:59</li>
                                </ul>
                            </div>

                            <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-3 sm:p-4">
                                <h4 className="font-bold text-base sm:text-lg mb-2 text-green-300">🎁 출석 보상 (총 21일)</h4>
                                <p className="mb-3 text-xs sm:text-sm">레벨 범위 몬스터 <span className="font-bold text-green-400">1,000마리</span> 처치 시 출석 완료!</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="bg-slate-800/50 rounded p-2 sm:p-3">
                                        <p className="font-semibold text-green-400 mb-2 text-xs sm:text-sm">기본 보상 (무료)</p>
                                        <ul className="text-xs space-y-1">
                                            <li>• 익스프레스 부스터 <span className="text-orange-400">100개</span></li>
                                            <li>• 상급 EXP 교환권 <span className="text-blue-400">9,000개</span></li>
                                        </ul>
                                    </div>
                                    <div className="bg-slate-800/50 rounded p-2 sm:p-3">
                                        <p className="font-semibold text-purple-400 mb-2 text-xs sm:text-sm">프리미엄 보상 (30,000캐시)</p>
                                        <ul className="text-xs space-y-1">
                                            <li>• 익스프레스 부스터 <span className="text-orange-400">추가 125개</span></li>
                                            <li>• <span className="text-yellow-400">총 225개</span> 획득 가능!</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-3 sm:p-4">
                                <h4 className="font-bold text-base sm:text-lg mb-2 text-blue-300">✨ 익스프레스 부스터란?</h4>
                                <p className="text-xs sm:text-sm">사용 시 100초 동안 <span className="font-bold text-blue-400">성장하는 불꽃 몬스터</span>가 소환되어 막대한 경험치를 제공합니다!</p>
                                <p className="text-slate-400 text-xs mt-1.5">※ 어센틱 포스 지역에서만 사용 가능</p>
                                <p className="text-slate-400 text-xs">※ 추가 경험치 효과는 적용되지 않습니다</p>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* 모멘텀 패스 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <Target className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400">모멘텀 패스</h2>
                        </div>

                        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-200">
                            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4">
                                <h4 className="font-bold text-base sm:text-lg mb-2">📋 참여 조건</h4>
                                <ul className="space-y-1.5 ml-4 list-disc">
                                    <li>280레벨 이상 캐릭터</li>
                                    <li>명의당 하나의 캐릭터만 참여 가능</li>
                                </ul>
                            </div>

                            <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-3 sm:p-4">
                                <h4 className="font-bold text-base sm:text-lg mb-2 text-blue-300">📊 레벨 시스템</h4>
                                <ul className="space-y-1.5 ml-4 list-disc">
                                    <li>레벨 0~10 (각 레벨당 720 포인트 필요)</li>
                                    <li>주간 최대 2,000 포인트 획득 가능</li>
                                    <li>몬스터파크, 에픽 던전, 심볼 퀘스트 등으로 포인트 획득</li>
                                </ul>
                            </div>

                            <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-3 sm:p-4">
                                <h4 className="font-bold text-base sm:text-lg mb-3 text-green-300">🎁 레벨별 보상 (0→10레벨)</h4>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs sm:text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-600">
                                                <th className="text-left py-2">레벨</th>
                                                <th className="text-left py-2">무료 보상</th>
                                                <th className="text-left py-2">프리미엄 보상</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-xs">
                                            <tr className="border-b border-slate-700"><td className="py-2">1</td><td>메카베리 농장 1개</td><td className="text-yellow-400">경험치 4배 쿠폰 2개</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-2">2</td><td>VIP 사우나 이용권 1개</td><td>메카베리 농장 1개</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-2">3</td><td className="text-purple-400">솔 에르다 1개</td><td className="text-yellow-400">상급 EXP 3,000개</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-2">4</td><td>상급 EXP 100개</td><td className="text-yellow-400">경험치 4배 쿠폰 2개</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-2">5</td><td>VIP 사우나 이용권 1개</td><td>메카베리 농장 2개</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-2">6</td><td className="text-purple-400">솔 에르다 1개</td><td className="text-yellow-400">상급 EXP 3,000개</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-2">7</td><td>상급 EXP 100개</td><td className="text-yellow-400">경험치 4배 쿠폰 2개</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-2">8</td><td>VIP 사우나 이용권 1개</td><td>메카베리 농장 3개</td></tr>
                                            <tr className="border-b border-slate-700"><td className="py-2">9</td><td className="text-purple-400">솔 에르다 1개</td><td className="text-yellow-400">상급 EXP 3,000개</td></tr>
                                            <tr><td className="py-2">10</td><td>상급 EXP 300개</td><td>메카베리 농장 4개</td></tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-3 pt-3 border-t border-slate-600">
                                    <p className="font-semibold text-green-400 mb-1 text-xs sm:text-sm">📊 총 획득 가능 보상</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                        <div>
                                            <p className="text-slate-300 mb-1">무료:</p>
                                            <ul className="space-y-0.5 ml-3">
                                                <li>• 솔 에르다 3개</li>
                                                <li>• VIP 사우나 이용권 3개</li>
                                                <li>• 상급 EXP 500개</li>
                                                <li>• 메카베리 농장 1개</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="text-purple-400 mb-1">프리미엄:</p>
                                            <ul className="space-y-0.5 ml-3">
                                                <li>• 경험치 4배 쿠폰 6개</li>
                                                <li>• 상급 EXP 9,000개</li>
                                                <li>• 메카베리 농장 10개</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* 주요 개선 사항 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-slate-700 rounded-lg sm:rounded-xl p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center flex items-center justify-center gap-2">
                            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                            주요 개선 사항
                        </h2>

                        <div className="space-y-4">
                            {/* 아이템 개선 */}
                            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/50 rounded-lg p-4">
                                <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                                    <Gift className="w-5 h-5" />
                                    아이템 개선
                                </h3>
                                <div className="space-y-3 text-xs sm:text-sm">
                                    <div className="bg-slate-800/50 rounded p-3">
                                        <p className="font-semibold text-yellow-300 mb-2">🏆 찬란한 영웅의 증거 추출 시스템</p>
                                        <ul className="space-y-1 ml-4 list-disc text-slate-200">
                                            <li>마법사 협회 <span className="text-yellow-400">아울 NPC</span>를 통해 추출 가능</li>
                                            <li>월드당 <span className="text-green-400">1회 무료</span>, 2회부터 <span className="text-red-400">20억 메소</span> 소모</li>
                                            <li>추출한 아이템은 <span className="text-blue-400">월드 내 캐릭터 간 이동만 가능</span></li>
                                            <li className="text-slate-400">※ 챌린저스 월드에서는 추출 불가</li>
                                        </ul>
                                    </div>
                                    <div className="bg-slate-800/50 rounded p-3">
                                        <p className="font-semibold text-pink-300 mb-2">✨ 이펙트 동시 착용</p>
                                        <p className="text-slate-200">캐시 이펙트 + 피니시 어택 이펙트 <span className="text-green-400 font-bold">동시 착용 가능</span>!</p>
                                    </div>
                                </div>
                            </div>

                            {/* UI 개선 */}
                            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/50 rounded-lg p-4">
                                <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
                                    <Star className="w-5 h-5" />
                                    UI 개선
                                </h3>
                                <div className="space-y-3 text-xs sm:text-sm">
                                    {/* 버프 매니저 */}
                                    <div className="bg-slate-800/50 rounded p-3">
                                        <p className="font-semibold text-green-300 mb-2">💫 버프 매니저 대폭 개선</p>
                                        <ul className="space-y-1 ml-4 list-disc text-slate-200">
                                            <li><span className="text-green-400">단축키</span> 추가</li>
                                            <li><span className="text-yellow-400">즐겨찾기 탭</span> 및 기능 추가
                                                <div className="ml-4 text-xs text-slate-400 mt-1">
                                                    - 아이콘 우측 상단 별표 버튼으로 즐겨찾기<br />
                                                    - 최상단 즐겨찾기 탭에서 확인 가능
                                                </div>
                                            </li>
                                            <li>보스 입장맵에서 <span className="text-blue-400">메이플 옥션</span> 진입 가능</li>
                                        </ul>
                                    </div>

                                    {/* 메이플 옥션 */}
                                    <div className="bg-slate-800/50 rounded p-3">
                                        <p className="font-semibold text-blue-300 mb-2">🛒 메이플 옥션</p>
                                        <p className="text-slate-200"><span className="text-blue-400">마우스 더블클릭</span>으로도 판매 아이템 등록 가능</p>
                                    </div>

                                    {/* 소울 시스템 */}
                                    <div className="bg-slate-800/50 rounded p-3">
                                        <p className="font-semibold text-purple-300 mb-2">👻 소울 시스템</p>
                                        <ul className="space-y-1 ml-4 list-disc text-slate-200">
                                            <li>소울 컬렉션 <span className="text-purple-400">일러스트 화질 개선</span></li>
                                            <li>소울 조각 획득/사용 시 <span className="text-green-400">채팅창 안내</span> 추가</li>
                                            <li>안내 문구 개선</li>
                                        </ul>
                                    </div>

                                    {/* 기타 UI */}
                                    <div className="bg-slate-800/50 rounded p-3">
                                        <p className="font-semibold text-cyan-300 mb-2">🎯 기타 UI 개선</p>
                                        <ul className="space-y-1 ml-4 list-disc text-slate-200">
                                            <li>퀘스트 우편함: 권장 레벨 벗어난 선행 퀘스트 <span className="text-slate-400">회색 글씨</span> 표시</li>
                                            <li>캐시샵: 헤어/성형 검색 시 <span className="text-yellow-400">판매 페이지 바로 이동</span></li>
                                            <li>이벤트 리스트: 마지막 열었던 폴더 상태 <span className="text-blue-400">기억</span></li>
                                            <li>커스텀 일러스트: <span className="text-pink-400">피드백 기능</span> 추가 (모델 개선에 활용)</li>
                                            <li>일부 직업 선택 UI 수정</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* 컨텐츠 변경 */}
                            <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/50 rounded-lg p-4">
                                <h3 className="text-lg sm:text-xl font-bold text-blue-400 mb-3 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5" />
                                    주요 컨텐츠 변경
                                </h3>
                                <div className="space-y-3 text-xs sm:text-sm">
                                    <div className="bg-slate-800/50 rounded p-3">
                                        <p className="font-semibold text-blue-300 mb-2">🎮 에픽 던전</p>
                                        <ul className="space-y-1 ml-4 list-disc text-slate-200">
                                            <li>넥슨ID당 매주 <span className="font-bold text-blue-400">3종 클리어</span> 가능</li>
                                            <li>메이플 골드 주화 → <span className="font-bold text-yellow-400">세라자르 주화</span> 변경 (판매 시 4,000만 메소)</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-800/50 rounded p-3">
                                        <p className="font-semibold text-red-300 mb-2">⛔ 아즈모스 협곡 삭제</p>
                                        <ul className="space-y-1 ml-4 list-disc text-slate-200">
                                            <li>아즈모스 협곡 이용 불가</li>
                                            <li>몬스터 컬렉션: 몬스터파크 상인 <span className="text-yellow-400">라쿠</span>에게서 모몽 구매 (150개)</li>
                                            <li>기존 코인은 <span className="text-orange-400">6월 30일</span>까지 교환 가능</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-800/50 rounded p-3">
                                        <p className="font-semibold text-purple-300 mb-2">🎨 캐시 업데이트</p>
                                        <ul className="space-y-1 ml-4 list-disc text-slate-200">
                                            <li><span className="font-bold text-purple-400">성별 변경 쿠폰</span> 판매 시작</li>
                                            <li>헤어/성형 뷰티룸: 42개 → <span className="font-bold text-green-400">48개</span> 확장</li>
                                            <li>메이플 로얄 스타일 153기 업데이트</li>
                                            <li>찬란한 흉성 패키지 판매</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 text-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">나의 캐릭터는 준비됐나요?</h3>
                        <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-6">
                            메이플 AI에서 내 캐릭터를 진단하고,<br className="sm:hidden" />
                            새로운 업데이트를 대비하세요!
                        </p>
                        <Link href="/">
                            <button className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg sm:rounded-xl transition-all shadow-xl hover:shadow-2xl">
                                무료 진단 시작하기
                            </button>
                        </Link>
                    </div>
                </section>

                {/* Back to Blog */}
                <div className="text-center pt-8 border-t border-slate-800">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        블로그 목록으로 돌아가기
                    </Link>
                </div>
            </main>
        </div>
    );
}
