'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, TrendingUp, Shield, DollarSign, Zap, AlertTriangle } from 'lucide-react';

export default function HyperburningJobs2025() {
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
                        <span className="px-3 py-1 bg-maple-orange/20 text-maple-orange text-xs font-bold rounded-full">
                            육성 가이드
                        </span>
                        <span className="text-slate-500 text-sm">2025년 12월 11일</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                        🎬 유튜버 6명이 입 모아 외친 "그 직업". 2025 겨울 하이퍼버닝 추천 직업 통합 분석 (종결판)
                    </h1>
                    <p className="text-lg text-slate-400">
                        메친놈, 슈크림메이플, 물다이아, 페이지, 글자네 등 메이플 전문 유튜버 6명의 분석을 종합했습니다.
                        12월 18일 챌린저스 월드 시즌 3과 하이퍼버닝, 과연 어떤 직업을 키워야 할까요?
                    </p>
                </header>

                {/* Key Info Box */}
                <div className="bg-gradient-to-r from-maple-orange/10 to-yellow-600/10 border border-maple-orange/30 rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        중요 일정
                    </h3>
                    <ul className="space-y-2 text-slate-300">
                        <li className="flex items-start gap-2">
                            <span className="text-maple-orange font-bold">📅 12월 13일 (토)</span>
                            <span>크라운 쇼케이스</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-maple-orange font-bold">🔥 12월 18일 (목)</span>
                            <span>챌린저스 월드 시즌 3 + 하이퍼버닝 시작</span>
                        </li>
                    </ul>
                </div>

                {/* Introduction */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-3">폭풍전야, 그리고 만장일치</h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-slate-300 leading-relaxed mb-4">
                            반갑습니다, 한자입니다. 자, 이제 정말 코앞으로 다가왔습니다. 오는 12월 13일 토요일, 대망의 <strong className="text-maple-orange">'크라운 쇼케이스'</strong>가 열립니다.
                            쇼케이스 내용은 아직 미지수지만, 우리에게 확실한 미래가 하나 있죠.
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            바로 12월 18일 목요일부터 <strong className="text-maple-orange">'챌린저스 월드 시즌 3'</strong>와 <strong className="text-maple-orange">'하이퍼버닝'</strong>이 시작된다는 사실입니다.
                            이 시기만 되면 늘 하는 고민, '대체 뭘 키워야 챌린저스 월드에서 꿀을 빨 수 있을까?'
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            그래서 제가 직접 발로 뛰었습니다. 메친놈, 슈크림메이플, 물다이아, 페이지, 그리고 글자네님까지...
                            현재 메이플판에서 가장 핫한 분석 영상 6개를 싹 다 뜯어보고 데이터를 종합했습니다.
                        </p>
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 my-6">
                            <p className="text-yellow-400 font-bold text-lg mb-2">🔍 소름 돋는 발견</p>
                            <p className="text-slate-300">
                                분석하다 보니 추천하는 직업이 거의 똑같다는 것을 발견했습니다.
                                마치 약속이라도 한 것처럼, 현재 메이플스토리의 '정답'을 가리키고 있었습니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Selection Criteria */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-3">그들은 왜 이 직업을 골랐나? (선정 기준)</h2>
                    <p className="text-slate-300 mb-6">
                        순위를 보기에 앞서, 기준부터 확실히 잡고 가겠습니다. 유튜버들이 강조한 <strong className="text-maple-orange">'챌린저스 월드 생존 조건'</strong>은 딱 4가지입니다.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">❌</span>
                                </div>
                                <h3 className="font-bold text-lg">NO 쿨뚝</h3>
                            </div>
                            <p className="text-slate-400 text-sm">
                                챌섭에서 수십억짜리 쿨감 모자? 못 구합니다. 쿨감 없이도 제 성능이 나와야 합니다.
                            </p>
                        </div>
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-green-400" />
                                </div>
                                <h3 className="font-bold text-lg">고효율 (쌀)</h3>
                            </div>
                            <p className="text-slate-400 text-sm">
                                한정된 솔 에르다 조각으로 최대한의 딜 효율을 뽑아야 합니다.
                            </p>
                        </div>
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">👆</span>
                                </div>
                                <h3 className="font-bold text-lg">딸깍 (난이도)</h3>
                            </div>
                            <p className="text-slate-400 text-sm">
                                유니온용 부캐인데 컨트롤 연습할 시간 없습니다. 무조건 쉬워야 합니다.
                            </p>
                        </div>
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-yellow-400" />
                                </div>
                                <h3 className="font-bold text-lg">템값 방어</h3>
                            </div>
                            <p className="text-slate-400 text-sm">
                                신규 직업 '렌' 때문에 힘 템값이 폭등했습니다. 덱스나 인트 직업이 상대적으로 유리합니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* TOP 5 Rankings */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-3">유튜버 선정 만장일치 TOP 5</h2>

                    {/* TOP 1 - 일리움 */}
                    <div className="mb-8 bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border-2 border-yellow-500 rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-6xl opacity-20">👑</div>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="relative w-20 h-20 flex-shrink-0">
                                <Image
                                    src="/images/jobs/일리움.png"
                                    alt="일리움"
                                    width={80}
                                    height={80}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xl font-black">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-yellow-400">일리움 (The GOAT)</h3>
                                    <p className="text-yellow-200/70 text-sm">6명의 유튜버가 단점조차 찾지 못한 직업</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-slate-200 leading-relaxed mb-4">
                            대망의 1위. 하드 세렌 최소컷 최상위, 무적기 3개, 파티 유틸, 제자리 사냥... 스펙은 완벽합니다.
                            무엇보다 <strong className="text-yellow-400">'자유 비행'</strong> 능력 덕분에 보스 패턴을 공중에서 무시하고 딜을 넣습니다.
                        </p>
                        <div className="bg-slate-900/50 rounded-lg p-4">
                            <p className="text-sm text-slate-300">
                                <span className="text-yellow-400 font-bold">✅ 장점:</span> 완벽한 스펙, 공중 기동성, 파티 유틸<br />
                                <span className="text-red-400 font-bold">⚠️ 단점:</span> 스킬이 좀 못생겼다는 것 (하지만 성능이 원빈이라 용서됨)
                            </p>
                        </div>
                    </div>

                    {/* TOP 2 - 렌 */}
                    <div className="mb-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600 rounded-xl p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="relative w-20 h-20 flex-shrink-0">
                                <Image
                                    src="/images/jobs/렌.png"
                                    alt="렌"
                                    width={80}
                                    height={80}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-slate-600 text-white rounded-full flex items-center justify-center text-xl font-black">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black">렌 (Ren) - 황족</h3>
                                    <p className="text-slate-400 text-sm">성능 1위, 하지만 템값이...</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            25년 여름 신규 직업, <strong className="text-maple-orange">'렌'</strong>입니다.
                            성능, 유틸, 난이도 모든 면에서 1위입니다. 노쿨 텔포에 자체 부활까지, 그냥 <strong>'황족'</strong>입니다.
                        </p>
                        <div className="bg-slate-900/50 rounded-lg p-4">
                            <p className="text-sm text-slate-300">
                                <span className="text-green-400 font-bold">✅ 장점:</span> 모든 면에서 압도적 성능<br />
                                <span className="text-red-400 font-bold">⚠️ 단점:</span> 템값이 매우 비쌈 (인구수 1위 + 힘 직업)
                            </p>
                        </div>
                    </div>

                    {/* TOP 3 - 보우마스터 */}
                    <div className="mb-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600 rounded-xl p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="relative w-20 h-20 flex-shrink-0">
                                <Image
                                    src="/images/jobs/보우마스터.png"
                                    alt="보우마스터"
                                    width={80}
                                    height={80}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center text-xl font-black">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black">보우마스터 - 가성비 좀비</h3>
                                    <p className="text-slate-400 text-sm">거의 모든 유튜버가 언급</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            별명이 <strong className="text-green-400">'가성비 좀비'</strong>입니다.
                            덱스(DEX) 직업이라 템값이 싼데, 흡혈 화살 때문에 죽지도 않습니다.
                            그냥 서서 속사기만 누르면 끝나는, '딸깍'의 정석입니다.
                        </p>
                        <div className="bg-slate-900/50 rounded-lg p-4">
                            <p className="text-sm text-slate-300">
                                <span className="text-green-400 font-bold">✅ 장점:</span> 저렴한 템값, 높은 생존력, 쉬운 난이도<br />
                                <span className="text-blue-400 font-bold">💡 TIP:</span> 리마스터된 와일드헌터도 좋은 대안!
                            </p>
                        </div>
                    </div>

                    {/* TOP 4 - 썬콜 */}
                    <div className="mb-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600 rounded-xl p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="relative w-20 h-20 flex-shrink-0">
                                <Image
                                    src="/images/jobs/아크메이지(썬,콜).png"
                                    alt="아크메이지 썬콜"
                                    width={80}
                                    height={80}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-slate-700 text-white rounded-full flex items-center justify-center text-xl font-black">
                                    4
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black">썬콜 - 가성비의 제왕</h3>
                                    <p className="text-slate-400 text-sm">효율 1등급</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            슈크림메이플, 메친놈, 페이지님이 꼽은 <strong className="text-green-400">'가성비의 제왕'</strong>이죠.
                            전 직업 중 헥사 코강 딜 상승 효율이 1등입니다. 돈을 적게 써도 세다는 뜻이죠.
                        </p>
                        <div className="bg-slate-900/50 rounded-lg p-4">
                            <p className="text-sm text-slate-300">
                                <span className="text-green-400 font-bold">✅ 장점:</span> 최고의 코강 효율, 13초 바인드, 최상급 텔레포트
                            </p>
                        </div>
                    </div>

                    {/* TOP 5 - 은월 */}
                    <div className="mb-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600 rounded-xl p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="relative w-20 h-20 flex-shrink-0">
                                <Image
                                    src="/images/jobs/은월.png"
                                    alt="은월"
                                    width={80}
                                    height={80}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-slate-700 text-white rounded-full flex items-center justify-center text-xl font-black">
                                    5
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black">은월 - Survival</h3>
                                    <p className="text-slate-400 text-sm">죽기 싫어서</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            메친놈, 물다이아, 페이지, 글자네님까지 다수 추천했습니다.
                            이유는 단순합니다. <strong className="text-blue-400">'죽기 싫어서'</strong>입니다.
                            소혼 결계로 상태 이상을 막고, 후방 이동으로 패턴을 피하고, 프리드의 가호로 무적까지.
                        </p>
                        <div className="bg-slate-900/50 rounded-lg p-4">
                            <p className="text-sm text-slate-300">
                                <span className="text-green-400 font-bold">✅ 장점:</span> 뉴비 최고의 보험, 단순한 딜 구조, 높은 생존력
                            </p>
                        </div>
                    </div>
                </section>

                {/* Alternative Options */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-3">차선책 10선 - 왜 TOP 5가 아닌가?</h2>
                    <p className="text-slate-300 mb-6">
                        TOP 5가 이미 키운 직업이거나 취향에 안 맞을 수 있죠.
                        그래서 준비한 알짜배기 차선책 10선입니다. 단, 이 직업들이 왜 1티어에 못 들었는지, 그 이유를 정확히 알고 가셔야 후회가 없습니다.
                    </p>

                    {/* Group 1 */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-2xl">🎩</span>
                            그룹 1. '그 모자'가 필요해 (쿨뚝 의존도)
                        </h3>
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-5">
                            <p className="font-semibold text-blue-400 mb-2">윈드브레이커, 플레임위자드</p>
                            <p className="text-slate-300 text-sm">
                                생존력 좋고, 가성비도 좋습니다. 하지만 <strong>'쿨타임 감소 모자'</strong> 의존도가 높습니다.
                                TOP 5 직업들은 모자가 없어도 100% 성능을 내지만, 이 친구들은 없으면 딜 사이클이 뻑뻑해집니다.
                            </p>
                        </div>
                    </div>

                    {/* Group 2 */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-2xl">📉</span>
                            그룹 2. 투자 대비 효율이 나쁨 (가성비 이슈)
                        </h3>
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-5">
                            <p className="font-semibold text-yellow-400 mb-2">바이퍼, 라라</p>
                            <p className="text-slate-300 text-sm">
                                <strong>바이퍼:</strong> 쿨뚝도 필요 없고 정말 쉽지만, 팔이 짧고 투자 대비 딜 상승폭(효율)이 낮습니다.<br />
                                <strong>라라:</strong> 스킬도 예쁘고 사냥도 편한데, 전 직업 중 코강 효율이 최하위권입니다.
                            </p>
                        </div>
                    </div>

                    {/* Group 3 */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-2xl">🤝</span>
                            그룹 3. 혼자서는 외로워 (솔플 약세)
                        </h3>
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-5">
                            <p className="font-semibold text-purple-400 mb-2">팔라딘, 배틀메이지</p>
                            <p className="text-slate-300 text-sm">
                                친구랑 같이 하면 신 대접을 받습니다. 파티 유틸이 최고거든요.
                                하지만 챌린저스 월드 미션은 <strong>'솔플'</strong>이 많습니다. 혼자 할 땐 딜이 약해서 클리어 시간이 오래 걸립니다.
                            </p>
                        </div>
                    </div>

                    {/* Group 4 */}
                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-2xl">🖱️</span>
                            그룹 4. 손가락이 아파 (피로도)
                        </h3>
                        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-5">
                            <p className="font-semibold text-red-400 mb-2">아크, 메르세데스, 캡틴</p>
                            <p className="text-slate-300 text-sm">
                                성능? 아주 좋습니다. 고점도 높아요. 하지만 30분 동안 보스를 치면서 연계하고, 게이지 관리하고, 소환수 뽑다 보면 손목이 나갑니다.
                                '쉽고 편하게 보상 타먹기'라는 이번 하이퍼버닝의 취지에는 살짝 어긋나서 순위가 내려갔습니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Warning Section */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 border-2 border-red-500 rounded-xl p-6 mb-6">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                            경고! 절대 멈춰! (함정픽)
                        </h2>
                        <p className="text-slate-300 mb-6">
                            유튜버들이 도시락 싸 들고 다니며 말리는, 이번 시즌 절대 비추천 직업입니다.
                        </p>

                        <div className="space-y-4">
                            <div className="bg-red-950/50 rounded-lg p-4">
                                <h4 className="font-bold text-red-400 mb-2">🗡️ 도적 직업군 (나로, 섀도어, 듀블)</h4>
                                <p className="text-slate-300 text-sm">
                                    글자네님 피셜, <strong>"도적은 쿨뚝 없으면 시체"</strong>입니다.
                                    일반 월드면 사면 되지만, 챌린저스 월드에서 쿨뚝 직작하다가 메소가 다 터져나갑니다.
                                </p>
                            </div>

                            <div className="bg-red-950/50 rounded-lg p-4">
                                <h4 className="font-bold text-red-400 mb-2">⚔️ 미하일</h4>
                                <p className="text-slate-300 text-sm">
                                    효율 전 직업 꼴등입니다. 가성비 최악이죠.
                                </p>
                            </div>

                            <div className="bg-red-950/50 rounded-lg p-4">
                                <h4 className="font-bold text-red-400 mb-2">🎮 블래스터, 카데나, 에반</h4>
                                <p className="text-slate-300 text-sm">
                                    뉴비 절단기입니다. 너무 어려워서 하다가 폐사합니다.
                                </p>
                            </div>

                            <div className="bg-red-950/50 rounded-lg p-4">
                                <h4 className="font-bold text-red-400 mb-2">🦸 히어로</h4>
                                <p className="text-slate-300 text-sm">
                                    현재 성능이 너무 떨어져서 '일그러진 영웅' 취급을 받습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Author's Pick */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-3">한자의 ONE PICK - 아란</h2>
                    <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/50 rounded-xl p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="relative w-24 h-24 flex-shrink-0">
                                <Image
                                    src="/images/jobs/아란.png"
                                    alt="아란"
                                    width={96}
                                    height={96}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-blue-400 mb-2">아란 - 묵직한 한 방</h3>
                                <p className="text-slate-300 leading-relaxed mb-4">
                                    여기까지가 데이터 분석이었습니다. 그렇다면 저, 한자의 사심이 담긴 원픽은 무엇이냐.
                                    저는 이번 겨울, <strong className="text-blue-400">'아란'</strong>을 강력 추천합니다.
                                </p>
                                <p className="text-slate-300 leading-relaxed mb-4">
                                    남들 다 하는 일리움, 렌이 질린다면 아란이 정답입니다.
                                </p>
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <ul className="space-y-2 text-sm text-slate-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span><strong>쿨뚝 필요 없음</strong></span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span><strong>극딜 압축이 잘 되어 있어 피로도 낮음</strong></span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span><strong>전사 특유의 단단함으로 생존력 좋음</strong></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Summary */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-maple-orange rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-6 text-center">📝 최종 요약</h2>
                        <div className="grid md:grid-cols-2 gap-4 text-center">
                            <div className="bg-slate-900/50 rounded-lg p-4">
                                <p className="text-yellow-400 font-bold mb-1">못생겨도 성능이면</p>
                                <p className="text-2xl font-black text-white">일리움 👑</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                                <p className="text-purple-400 font-bold mb-1">자본이 넉넉하다면</p>
                                <p className="text-2xl font-black text-white">렌 💎</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                                <p className="text-green-400 font-bold mb-1">가성비와 편안함은</p>
                                <p className="text-2xl font-black text-white">보우마스터 🏹</p>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4">
                                <p className="text-blue-400 font-bold mb-1">생존은 은월, 효율은</p>
                                <p className="text-2xl font-black text-white">썬콜 ⚡</p>
                            </div>
                        </div>
                        <div className="mt-6 text-center">
                            <p className="text-slate-400 text-lg">
                                여러분은 이번 겨울, 어떤 직업과 함께 하시겠습니까?
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <div className="border-t border-slate-700 pt-8 mt-12">
                    <div className="text-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-maple-orange text-white rounded-lg font-bold hover:bg-maple-orange/80 transition-colors"
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
