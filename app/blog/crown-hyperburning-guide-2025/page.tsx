'use client';

import Link from 'next/link';
import Image from 'next/image';
import { InArticleAd } from '@/components/AdSense';
import { ArrowLeft, AlertTriangle, CheckCircle, Target, TrendingUp, Zap, Gift, Calendar } from 'lucide-react';

export default function CrownHyperburningGuide2025() {
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
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full">
                            육성 가이드
                        </span>
                        <span className="text-slate-500 text-sm">2025년 12월 15일 업데이트</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-black text-white mb-4 leading-snug break-keep">
                        🔥 [2025 메이플] 크라운 하이퍼버닝 & 아이템 버닝 완벽 가이드: "이 순서 모르면 손해 봅니다!"
                    </h1>
                    <p className="text-base sm:text-lg text-slate-400 leading-relaxed break-keep">
                        드디어 시작된 2025년 겨울 하이퍼버닝. 이번 시즌은 예전보다 <strong className="text-orange-400">'속도 조절'</strong>이 들어가서,
                        효율적인 동선이 그 어느 때보다 중요해졌습니다. 특히 정령의 펜던트와 자석펫 사용 순서는 필수 체크 사항입니다.
                    </p>
                </header>

                {/* Warning Box */}
                <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-4 sm:p-6 mb-8">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        핵심 경고! 반드시 순서대로 진행하세요
                    </h3>
                    <ul className="space-y-2 text-slate-300 text-sm sm:text-base">
                        <li className="flex items-start gap-2">
                            <span className="text-red-400 font-bold flex-shrink-0">⚠️</span>
                            <span><strong className="text-white">정령의 펜던트 교환권을 먼저 쓰면 안 됩니다!</strong> 30일을 날리게 됩니다.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-red-400 font-bold flex-shrink-0">⚠️</span>
                            <span><strong className="text-white">자석펫도 순서가 중요합니다.</strong> 유효기간이 짧은 것부터 사용하세요.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-red-400 font-bold flex-shrink-0">⚠️</span>
                            <span><strong className="text-white">깐부(파트너)는 한 번 맺으면 해제 불가!</strong> 진짜 주간 10만 마리를 채워줄 사람과 맺으세요.</span>
                        </li>
                    </ul>
                </div>

                {/* AdSense Ad - After Warning */}
                <InArticleAd
                    dataAdSlot="8162808816"
                    className="mb-12"
                />

                {/* Step 1 */}
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 border-b border-slate-700 pb-3 flex items-center gap-2">
                        <span className="text-orange-400">🏁</span>
                        1단계: 캐릭터 생성 및 200레벨 초고속 달성
                    </h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-slate-300 leading-relaxed mb-4 text-sm sm:text-base break-keep">
                            가장 먼저 <strong className="text-orange-400">챌린저스 월드</strong>에서 캐릭터를 생성하고 하이퍼버닝 캐릭터 지정하세요.
                        </p>

                        {/* 하이퍼버닝 캐릭터 지정 설명 이미지 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl overflow-hidden my-6">
                            <div className="relative w-full aspect-[1024/512]">
                                <Image
                                    src="/images/blog/hyperburning-character-select.png"
                                    alt="하이퍼버닝 캐릭터 지정 방법 - 뉴키네시스"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <div className="bg-slate-900/50 p-3 sm:p-4">
                                <p className="text-slate-400 text-xs sm:text-sm text-center">
                                    💡 하이퍼버닝과 아이템 버닝은 계정 당 각 1개씩만 지정 가능합니다. 신중하게 선택하세요!
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-6 my-6">
                            <ul className="space-y-3 text-slate-300 text-sm sm:text-base">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-white">레벨 30까지 튜토리얼 스킵:</strong> 2차 전직까지 바로 진행합니다.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-white">생성 보상 미리 받기:</strong> 챌린저스 월드 생성 보상, 하이퍼버닝 보상, 겨울나기 미션을 모두 수령합니다.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-white">30 → 200 (테라 블링크 플러스):</strong> 하이퍼버닝 전용 가속 시스템인 테라 블링크를 활용하면 30분 만에 200레벨 달성이 가능합니다.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-white">5차 전직 & 길돌 스킵:</strong> 전직 퀘스트가 매우 간소화되었습니다. 말만 걸면 끝납니다. 아케인 리버 길뚫도 바로 스킽하세요.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Step 2 - Critical */}
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 border-b border-slate-700 pb-3 flex items-center gap-2">
                        <span className="text-red-400">💎</span>
                        2단계: 핵심 세팅 (여기서 실수하면 망합니다!)
                    </h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-slate-300 leading-relaxed mb-6 text-sm sm:text-base break-keep">
                            200레벨을 찍었다면 사냥터로 가기 전 <strong className="text-red-400">반드시 이 세팅을 마쳐야 합니다.</strong>
                        </p>

                        {/* 정령의 펜던트 */}
                        <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-2 border-purple-500/50 rounded-xl p-5 sm:p-7 mb-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Gift className="w-6 h-6 text-purple-400" />
                                ① 정령의 펜던트(정팬) 순서 <span className="text-red-400">(중요도 ★★★★★)</span>
                            </h3>

                            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-4">
                                <p className="text-red-300 font-bold text-base sm:text-lg mb-2 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5" />
                                    절대 주의
                                </p>
                                <p className="text-slate-200 text-sm sm:text-base">
                                    출석 이벤트에서 주는 <strong>'정령의 펜던트 교환권'</strong>을 먼저 쓰지 마세요.
                                </p>
                            </div>

                            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-4">
                                <p className="text-green-300 font-bold text-base sm:text-lg mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5" />
                                    올바른 순서
                                </p>
                                <ol className="space-y-2 text-slate-200 text-sm sm:text-base list-decimal list-inside">
                                    <li><strong className="text-green-400">겨울나기 미션 보상</strong>으로 주는 정팬(장비 형태)을 먼저 30일 동안 사용합니다.</li>
                                    <li>이후 기간이 끝나면 <strong className="text-green-400">출석 보상 교환권</strong>을 사용합니다.</li>
                                </ol>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
                                <p className="text-yellow-300 font-bold mb-2">💡 이유</p>
                                <p className="text-slate-300 text-sm sm:text-base">
                                    먼저 교환권을 써버리면 두 장비의 기간이 겹쳐서 <strong className="text-red-400">총 60일의 혜택을 30일 만에 날리게 됩니다.</strong>
                                </p>
                            </div>

                            {/* 정령의 펜던트 교환권 이미지 */}
                            <div className="bg-slate-800/30 border border-purple-500/30 rounded-xl overflow-hidden">
                                <div className="relative w-full aspect-[640/320]">
                                    <Image
                                        src="/images/blog/spirit-pendant.png"
                                        alt="정령의 펜던트 교환권 - 칼에 내 캐릭터 각인하기"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="bg-slate-900/50 p-3 sm:p-4">
                                    <p className="text-slate-400 text-xs sm:text-sm text-center">
                                        ⚠️ <strong className="text-red-400">절대 먼저 교환하지 마세요!</strong> 겨울나기 미션 보상 정팬을 먼저 착용하고, 30일 후에 교환권을 사용하세요.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 자석펫 */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 sm:p-6 mb-6">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <Gift className="w-6 h-6 text-blue-400" />
                                ② 자석펫 사용
                            </h3>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                <strong className="text-blue-400">윈터 카운트다운 선물</strong>로 받은 '달콤한 정령 30일'을 먼저 사용하세요.
                                유효 기간이 <strong className="text-orange-400">26년 1월 1일로 짧기 때문</strong>입니다.
                                (겨울나기 미션에서 주는 자석펫은 3월까지로 넉넉합니다.)
                            </p>
                        </div>

                        {/* V매트릭스 */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 sm:p-6 mb-6">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <Zap className="w-6 h-6 text-yellow-400" />
                                ③ V매트릭스 및 하이퍼스탯
                            </h3>
                            <ul className="space-y-3 text-slate-300 text-sm sm:text-base">
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-400 font-bold">•</span>
                                    <div>
                                        <strong className="text-white">홀리 심볼:</strong> 5차 스킬 중 홀리 심볼을 가장 먼저 30레벨까지 강화하세요. 경험치 효율의 핵심입니다.
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-400 font-bold">•</span>
                                    <div>
                                        <strong className="text-white">하이퍼스탯:</strong> 획득 경험치 항목을 최소 10레벨 이상 투자합니다.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* 챌린저스 패스 & 깐부 */}
                        <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-2 border-emerald-500/50 rounded-xl p-5 sm:p-7">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Target className="w-6 h-6 text-emerald-400" />
                                ④ 챌린저스 패스 & 깐부(파트너)
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-emerald-300 font-bold mb-2">패스 구매</p>
                                    <p className="text-slate-300 text-sm sm:text-base">
                                        19,800원(캐시)이지만 보상이 워낙 좋아 강력 추천합니다.
                                    </p>
                                </div>

                                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                                    <p className="text-red-300 font-bold mb-2 flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5" />
                                        깐부 맺기: 신중하게!
                                    </p>
                                    <p className="text-slate-200 text-sm sm:text-base mb-2">
                                        한 번 맺으면 <strong className="text-red-400">이벤트 종료까지 해제 불가!</strong> 주간 10만 마리를 채워줄 <strong className="text-white">'진짜'</strong> 파트너를 구해야 합니다.
                                    </p>
                                    <p className="text-yellow-300 text-sm">
                                        💡 파트너가 사냥한 포인트가 내 경험치가 됩니다. (매우 중요함!!)
                                    </p>
                                </div>

                                {/* 챌린저스 파트너 이미지 */}
                                <div className="bg-slate-800/30 border border-emerald-500/30 rounded-xl overflow-hidden">
                                    <div className="relative w-full aspect-[571/252]">
                                        <Image
                                            src="/images/blog/partner-system.png"
                                            alt="챌린저스 파트너 - 함께 하는 깐부"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="bg-slate-900/50 p-3 sm:p-4">
                                        <p className="text-slate-400 text-xs sm:text-sm text-center">
                                            🤝 <strong className="text-emerald-400">파트너와 함께 다양한 미션을 수행하고 보상을 적립</strong>해보세요! 파트너와의 협동이 핵심입니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AdSense Ad - After Step 2 */}
                <InArticleAd
                    dataAdSlot="6849727140"
                    className="mb-12"
                />

                {/* Step 3 */}
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 border-b border-slate-700 pb-3 flex items-center gap-2">
                        <span className="text-green-400">🏹</span>
                        3단계: 200 → 260 "딸기 농장"과 "엘라노스" 활용법
                    </h2>
                    <div className="prose prose-invert max-w-none">
                        {/* 엘라노스 */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 sm:p-6 mb-6">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <span className="text-2xl">🦌</span>
                                ① 엘라노스 스킬 OFF (초반)
                            </h3>
                            <div className="space-y-3 text-slate-300 text-sm sm:text-base">
                                <p className="leading-relaxed">
                                    200레벨 달성 후 첫 <strong className="text-white">레범몬 1,000마리</strong>를 잡을 때는
                                    <strong className="text-orange-400"> '산책하는 엘라노스' 스킬을 우클릭으로 끄세요!</strong>
                                </p>

                                {/* 엘라노스 스킬 OFF 이미지 */}
                                <div className="bg-slate-800/30 border border-slate-700 rounded-xl overflow-hidden my-4">
                                    <div className="relative w-full aspect-[430/480]">
                                        <Image
                                            src="/images/blog/elanos-skill-off.png"
                                            alt="산책하는 엘라노스 스킬 OFF 방법"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="bg-slate-900/50 p-3 sm:p-4">
                                        <p className="text-slate-400 text-xs sm:text-sm text-center">
                                            ⚡ <strong className="text-orange-400">초반에는 OFF!</strong> 스킬 아이콘을 우클릭하면 비활성화할 수 있습니다. 후반 풀도핑 시 켜서 경험치 극대화!
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                                    <p className="text-yellow-200 text-sm">
                                        💡 경험치 대량 수급 스킬은 사냥 효율이 좋아지는 <strong>후반부</strong>에 몰아 써야 합니다.
                                    </p>
                                </div>
                                <p className="text-green-400 font-semibold">
                                    ✅ 본격적으로 사냥 시작하면 스킬 ON 하세요~
                                </p>
                            </div>
                        </div>

                        {/* 황금 딸기 농장 */}
                        <div className="bg-gradient-to-br from-pink-900/30 to-rose-900/30 border-2 border-pink-500/50 rounded-xl p-5 sm:p-7 mb-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="text-2xl">🍓</span>
                                ② 황금 딸기 농장 2단 빌드
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <p className="text-pink-300 font-bold mb-2">1차: 코인 수급</p>
                                    <p className="text-slate-200 text-sm sm:text-base">
                                        레범몬 <strong className="text-white">2,000마리</strong>를 잡아 메인 이벤트 코인 <strong className="text-pink-400">800개</strong>를 모읍니다.
                                    </p>
                                </div>

                                {/* 엘라노스 크로니클 코인 수급 이미지 */}
                                <div className="bg-slate-800/30 border border-pink-500/30 rounded-xl overflow-hidden">
                                    <div className="relative w-full aspect-[860/860]">
                                        <Image
                                            src="/images/blog/elanos-coin-mission.png"
                                            alt="엘라노스 크로니클 - 2,000마리당 800개 코인 획득"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="bg-slate-900/50 p-3 sm:p-4">
                                        <p className="text-slate-400 text-xs sm:text-sm text-center">
                                            🎯 <strong className="text-pink-400">조사 미션</strong>에서 2,000마리 처치당 800개 획득! 주간 최대 10,000마리(4,000코인) 달성 가능합니다.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                                    <p className="text-blue-200 text-sm italic mb-2">
                                        ℹ️ 이번에는 딸깍! 출석체크로 코인을 모은 것이 아니라, 레범몬 2,000마리를 잡으면 코인 800개를 얻을 수 있습니다.
                                    </p>
                                    <p className="text-slate-300 text-sm">
                                        • 주간 최대 <strong className="text-white">10,000마리</strong>까지 카운팅<br />
                                        • 주간 최대 <strong className="text-white">4,000코인</strong> 획득 가능
                                    </p>
                                </div>

                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <p className="text-pink-300 font-bold mb-2">2차: 딸기 농장 입장</p>
                                    <ol className="space-y-2 text-slate-200 text-sm sm:text-base list-decimal list-inside">
                                        <li>코인샵에서 <strong className="text-white">딸기 농장 티켓 4개</strong>를 사서 입장 (보통 225레벨 달성).</li>
                                        <li>그다음 다시 레범몬 2,000마리를 잡아 남은 티켓 1개를 더 사서 입장합니다.</li>
                                    </ol>
                                </div>

                                {/* 황금 딸기 농장 이미지 */}
                                <div className="bg-slate-800/30 border border-pink-500/30 rounded-xl overflow-hidden">
                                    <div className="relative w-full aspect-[789/318]">
                                        <Image
                                            src="/images/blog/strawberry-farm.png"
                                            alt="황금 딸기 농장 사냥 장면"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="bg-slate-900/50 p-3 sm:p-4">
                                        <p className="text-slate-400 text-xs sm:text-sm text-center">
                                            🍓 <strong className="text-pink-400">황금 딸기 농장</strong>에서 딸기 몬스터를 잡으면 엄청난 경험치를 획득할 수 있습니다!
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                                    <p className="text-yellow-200 text-sm">
                                        💡 <strong>레벨을 높여놓고</strong> 마지막 티켓을 써야 경험치 효율이 극대화됩니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Step 4 */}
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 border-b border-slate-700 pb-3 flex items-center gap-2">
                        <span className="text-blue-400">📈</span>
                        4단계: 260 마무리 사냥 팁
                    </h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-slate-300 leading-relaxed mb-6 text-sm sm:text-base break-keep">
                            이번 시즌은 <strong className="text-orange-400">극한 성장의 비약(극성비)</strong>이 첫날 지급되지 않습니다.
                            오직 <strong className="text-white">'사냥'</strong>과 <strong className="text-white">'깐부 포인트'</strong>가 핵심입니다.
                        </p>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 sm:p-6 mb-6">
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-green-400" />
                                사전 준비: 사냥터 조사 & 계획 세우기
                            </h3>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-3">
                                미리 내가 키울 <strong className="text-green-400">하이퍼버닝 캐릭터의 사냥터나 사냥영상</strong>을 찾아보세요.
                            </p>
                            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                                <p className="text-green-200 text-sm">
                                    💡 <strong>어떻게 레벨업 할지 미리 계획</strong>을 세워두면 시간을 크게 절약할 수 있습니다!
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-2 border-purple-500/50 rounded-xl p-5 sm:p-7">
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-400" />
                                최종 스퍼트
                            </h3>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                                종료 30분 전, 아껴뒀던 엘라노스 스킬을 ON 하고,
                                <strong className="text-purple-400"> 윈터 쿠폰(4배), 룬, VIP 부스터</strong>를 풀도핑한 뒤
                                깐부 포인트를 경험치로 전환하여 260을 마무리합니다.
                            </p>
                            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                                <p className="text-yellow-200 text-sm">
                                    🎯 <strong>타이밍이 생명입니다!</strong> 도핑 타이밍을 잘 맞추세요.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Summary Checklist */}
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 border-b border-slate-700 pb-3 flex items-center gap-2">
                        <span className="text-emerald-400">📝</span>
                        요약 체크리스트
                    </h2>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 sm:p-7">
                        <ul className="space-y-3">
                            {[
                                '튜토리얼/길돌 스킵으로 200 찍었는가?',
                                '겨울나기 정팬부터 착용했는가? (출석 정팬은 나중에!)',
                                '윈터 선물 자석펫부터 꺼냈는가?',
                                '홀심/하이퍼스탯 경험치 세팅 완료했는가?',
                                '사냥 초반에 엘라노스 스킬을 껐는가?',
                                '황금 딸기 농장을 잘 이용했는가?'
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base">
                                    <span className="text-emerald-400 font-bold flex-shrink-0">[ ]</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Conclusion */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 sm:p-8 text-center shadow-lg shadow-orange-500/20">
                        <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                            이번 겨울 하이퍼버닝은 요행보다는 <span className="text-yellow-300">'전략적인 사냥'</span>이 핵심입니다.
                        </h3>
                        <p className="text-orange-100 text-sm sm:text-base mb-6 break-keep">
                            이 가이드대로만 진행하신다면 누구보다 빠르게 260레벨의 고지에 도달하실 수 있을 거예요!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/job-ranking"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-full font-bold text-sm sm:text-base hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                🚀 직업 추천 보러가기
                            </Link>
                            <Link
                                href="/blog/hyperburning-jobs-2025-v2"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-800 text-white rounded-full font-bold text-sm sm:text-base hover:bg-orange-900 transition-colors"
                            >
                                📊 데이터 분석 보기
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <div className="border-t border-slate-700 pt-8 mt-12">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            블로그 목록
                        </Link>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>마지막 업데이트: 2025년 12월 15일</span>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
