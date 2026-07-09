'use client';

import Link from 'next/link';
import { Calendar, ArrowLeft, Sparkles, Zap, AlertCircle, Swords, Shield, Star } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function TestworldHexaSkill203Page() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <header className="w-full sm:max-w-7xl flex justify-between items-center px-3 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 mx-auto">
                <Link prefetch={false} href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-lg font-bold">블로그로 돌아가기</span>
                </Link>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Title Section */}
                <div className="mb-8 sm:mb-12">
                    <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                        <span className="text-sm sm:text-base text-slate-400">2026년 7월 9일</span>
                        <span className="px-2 py-0.5 bg-amber-600/30 border border-amber-500/50 text-amber-300 text-xs font-bold rounded-full">🧪 테스트월드</span>
                        <span className="px-2 py-0.5 bg-green-600/30 border border-green-500/50 text-green-300 text-xs font-bold rounded-full">7월 23일 적용 예정</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent leading-tight">
                        ✨ 테스트월드 1.2.203 — 전 직업 신규 HEXA 스킬 추가 & 대규모 스킬 개선
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-4 sm:mb-6">
                        2026년 7월 9일(목) 테스트월드 업데이트! 히어로부터 레테까지 전 직업 신규 HEXA 스킬이 추가되었습니다. 7월 23일 본섭 적용 예정 (중간에 7월 16일 2차 테스트월드 예정).
                    </p>

                    {/* Update Schedule */}
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                            업데이트 일정
                        </h3>
                        <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-slate-200">
                            <p>• <span className="font-bold text-amber-300">1차 테스트월드</span>: 2026년 7월 9일 (목)</p>
                            <p>• <span className="font-bold text-yellow-300">2차 테스트월드</span>: 2026년 7월 16일 (목) 예정</p>
                            <p>• <span className="font-bold text-pink-300">본서버 적용 예정</span>: 2026년 7월 23일 (목)</p>
                        </div>
                    </div>
                </div>

                {/* 신규 HEXA 스킬 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-2 border-purple-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400">신규 HEXA 스킬</h2>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 mb-5">
                            총 <span className="font-bold text-purple-300">48개 직업</span>에 신규 HEXA 스킬이 추가됩니다. 각 직업의 스킬명과 설명을 확인하세요!
                        </p>

                        <div className="space-y-3 text-xs sm:text-sm text-slate-200">

                            {/* 전사 계열 */}
                            <div className="bg-red-900/20 border border-red-500/40 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base sm:text-lg text-red-300 mb-3 flex items-center gap-2">
                                    <Swords className="w-4 h-4 sm:w-5 sm:h-5" />
                                    ⚔️ 전사 계열
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-red-300">히어로</p>
                                        <p className="text-slate-300 mt-0.5">레이지 익스플로젼</p>
                                        <p className="text-slate-400 text-xs mt-0.5">찰나의 순간 극한의 일격이 모든 것을 압도한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-yellow-300">팔라딘</p>
                                        <p className="text-slate-300 mt-0.5">디바인 컨버전스</p>
                                        <p className="text-slate-400 text-xs mt-0.5">성스러운 빛을 담은 망치를 연속으로 내리쳐 심판을 선고한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-purple-300">다크나이트</p>
                                        <p className="text-slate-300 mt-0.5">다크니스 오브 그레이스</p>
                                        <p className="text-slate-400 text-xs mt-0.5">어둠의 축복으로 계약의 힘이 강화된다. 비홀더의 진정한 힘이 개방된다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-orange-300">미하일</p>
                                        <p className="text-slate-300 mt-0.5">레디언스 오브 발러</p>
                                        <p className="text-slate-400 text-xs mt-0.5">단호한 수호의 의지가 거대한 빛의 검이 되어 전장을 가르며 솟아오른다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-blue-300">소울마스터</p>
                                        <p className="text-slate-300 mt-0.5">셀레스티얼 클리브</p>
                                        <p className="text-slate-400 text-xs mt-0.5">검격으로 우주를 새기고 마무리 일격으로 시공간을 가른다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-cyan-300">블래스터</p>
                                        <p className="text-slate-300 mt-0.5">오버히트 펀치</p>
                                        <p className="text-slate-400 text-xs mt-0.5">한계를 넘어 과열된 에너지를 담아 강력한 펀치를 내리꽂는다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-red-400">카이저</p>
                                        <p className="text-slate-300 mt-0.5">드라코닉 익스팅션</p>
                                        <p className="text-slate-400 text-xs mt-0.5">고대 용의 힘을 받아들여 전장의 적을 말살한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-slate-300">아델</p>
                                        <p className="text-slate-300 mt-0.5">에테르 뤼페</p>
                                        <p className="text-slate-400 text-xs mt-0.5">거대한 에테르 소드로 마력의 격류를 일으킨다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-purple-400">렌</p>
                                        <p className="text-slate-300 mt-0.5">창룡파천검 : 만참</p>
                                        <p className="text-slate-400 text-xs mt-0.5">창룡의 기운을 머금은 검이 만물을 벤다.</p>
                                    </div>
                                </div>
                            </div>

                            {/* 마법사 계열 */}
                            <div className="bg-blue-900/20 border border-blue-500/40 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base sm:text-lg text-blue-300 mb-3 flex items-center gap-2">
                                    🔮 마법사 계열
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-orange-300">아크메이지(불,독)</p>
                                        <p className="text-slate-300 mt-0.5">인페르날 웨이브</p>
                                        <p className="text-slate-400 text-xs mt-0.5">화염과 독의 마력을 극한까지 끌어올려 마력의 파도를 일으킨다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-cyan-300">아크메이지(썬,콜)</p>
                                        <p className="text-slate-300 mt-0.5">서브제로 퍼미네이션</p>
                                        <p className="text-slate-400 text-xs mt-0.5">극한의 냉기와 번개를 결합시켜 융합 폭발을 일으킨다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-yellow-300">비숍</p>
                                        <p className="text-slate-300 mt-0.5">엔젤스 플레지</p>
                                        <p className="text-slate-400 text-xs mt-0.5">순결의 군세가 성화를 밝혀 만물을 정화하기 위한 서약을 한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-red-300">플레임위자드</p>
                                        <p className="text-slate-300 mt-0.5">이그니스 레퀴엠</p>
                                        <p className="text-slate-400 text-xs mt-0.5">근원의 불꽃으로 적을 섬멸한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-purple-300">루미너스</p>
                                        <p className="text-slate-300 mt-0.5">앱솔루트 스페이스</p>
                                        <p className="text-slate-400 text-xs mt-0.5">빛과 어둠을 초월한 마력으로 절대 공간을 펼쳐 적을 압도한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-blue-300">에반</p>
                                        <p className="text-slate-300 mt-0.5">드래곤 소어 / 버티컬 피니셔</p>
                                        <p className="text-slate-400 text-xs mt-0.5">진화한 미르가 강하게 포효하고 날아오른다. 공명해 한계를 해방한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-cyan-300">배틀메이지</p>
                                        <p className="text-slate-300 mt-0.5">모티스 엣지</p>
                                        <p className="text-slate-400 text-xs mt-0.5">암흑의 힘으로 짙게 물든 낫을 휘두른다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-green-300">일리움</p>
                                        <p className="text-slate-300 mt-0.5">글로리 윙 : 스플렌더</p>
                                        <p className="text-slate-400 text-xs mt-0.5">크리스탈의 힘이 강력하게 공명하여 일순간 공간을 장악한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-yellow-300">키네시스</p>
                                        <p className="text-slate-300 mt-0.5">그래비티 오브젝트</p>
                                        <p className="text-slate-400 text-xs mt-0.5">이계의 오브젝트를 생성하여 중력의 힘으로 적에게 발사한다.</p>
                                    </div>
                                </div>
                            </div>

                            {/* 궁수 계열 */}
                            <div className="bg-green-900/20 border border-green-500/40 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base sm:text-lg text-green-300 mb-3 flex items-center gap-2">
                                    🏹 궁수 계열
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-green-300">보우마스터</p>
                                        <p className="text-slate-300 mt-0.5">아이 오브 아퀼라</p>
                                        <p className="text-slate-400 text-xs mt-0.5">어떤 표적도 놓치지 않는 필중의 일격을 날린다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-yellow-300">신궁</p>
                                        <p className="text-slate-300 mt-0.5">리썰 퍼니셔</p>
                                        <p className="text-slate-400 text-xs mt-0.5">폭발성 화살을 장전한 뒤 극한의 전투 태세에 돌입한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-purple-300">패스파인더</p>
                                        <p className="text-slate-300 mt-0.5">마테리얼 버스트</p>
                                        <p className="text-slate-400 text-xs mt-0.5">고대 신화 속의 궁술을 재현하여 전방에 강력한 폭격을 퍼붓는다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-cyan-300">윈드브레이커</p>
                                        <p className="text-slate-300 mt-0.5">실프스 브레스</p>
                                        <p className="text-slate-400 text-xs mt-0.5">바람의 요정 실프가 거대한 돌풍을 일으켜 적을 헤집는다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-orange-300">와일드헌터</p>
                                        <p className="text-slate-300 mt-0.5">레조넌스 : 와일드 피어스</p>
                                        <p className="text-slate-400 text-xs mt-0.5">아실리와의 공명으로 자연의 힘을 석궁에 실어 공격한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-blue-300">메카닉</p>
                                        <p className="text-slate-300 mt-0.5">버스터 스테이션</p>
                                        <p className="text-slate-400 text-xs mt-0.5">미사일 스테이션을 설치하여 무수한 폭격을 퍼붓는다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-red-300">카인</p>
                                        <p className="text-slate-300 mt-0.5">[발현] 스트라이크 임팩트 / [처형] 팬텀 레퀴엠</p>
                                        <p className="text-slate-400 text-xs mt-0.5">화살에 깃든 악의가 폭주하여 마룡이 현현한다. 무자비한 난도질 후 죽음을 방출.</p>
                                    </div>
                                </div>
                            </div>

                            {/* 도적 계열 */}
                            <div className="bg-purple-900/20 border border-purple-500/40 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base sm:text-lg text-purple-300 mb-3 flex items-center gap-2">
                                    🗡️ 도적 계열
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-slate-300">나이트로드</p>
                                        <p className="text-slate-300 mt-0.5">쉐도우 리츄얼</p>
                                        <p className="text-slate-400 text-xs mt-0.5">그림자의 힘을 담아 부적을 일깨운다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-purple-300">섀도어</p>
                                        <p className="text-slate-300 mt-0.5">무아지경</p>
                                        <p className="text-slate-400 text-xs mt-0.5">자아마저 지운 고요 속에서 적을 멸한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-pink-300">듀얼블레이드</p>
                                        <p className="text-slate-300 mt-0.5">암영난참</p>
                                        <p className="text-slate-400 text-xs mt-0.5">비화원의 암영비기가 어둠 속에 깃든 힘으로 발현한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-gray-300">나이트워커</p>
                                        <p className="text-slate-300 mt-0.5">싱귤래러티 스로우</p>
                                        <p className="text-slate-400 text-xs mt-0.5">그림자를 실체화하여 칠흑의 어둠을 담은 암흑 표창을 투척한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-yellow-300">팬텀</p>
                                        <p className="text-slate-300 mt-0.5">플레슈 르투르</p>
                                        <p className="text-slate-400 text-xs mt-0.5">카드를 소환하여 사방으로 날린 뒤 일제히 거두어들이며 폭발시킨다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-pink-300">카데나</p>
                                        <p className="text-slate-300 mt-0.5">체인아츠:토렌트</p>
                                        <p className="text-slate-400 text-xs mt-0.5">에너지를 체인으로 강하게 휘감아 억누른다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-yellow-300">칼리</p>
                                        <p className="text-slate-300 mt-0.5">헥스 : 듄 버스트</p>
                                        <p className="text-slate-400 text-xs mt-0.5">차크람이 모래 폭풍을 베어 가르며 적에게 모래 폭발을 일으킨다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-cyan-300">제로</p>
                                        <p className="text-slate-300 mt-0.5">타임 어소리티</p>
                                        <p className="text-slate-400 text-xs mt-0.5">거스를 수 없는 시간의 힘으로 적을 압도한다.</p>
                                    </div>
                                </div>
                            </div>

                            {/* 해적 계열 */}
                            <div className="bg-cyan-900/20 border border-cyan-500/40 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base sm:text-lg text-cyan-300 mb-3 flex items-center gap-2">
                                    🏴‍☠️ 해적 계열
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-blue-300">바이퍼</p>
                                        <p className="text-slate-300 mt-0.5">넵투누스 어드밴트</p>
                                        <p className="text-slate-400 text-xs mt-0.5">최초의 수룡 넵투누스의 기백이 깃들어 수룡의 힘이 강화된다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-yellow-300">캡틴</p>
                                        <p className="text-slate-300 mt-0.5">에어리얼 봄바드먼트</p>
                                        <p className="text-slate-400 text-xs mt-0.5">창공의 폭격대에게 전장을 초토화시킬 공중 포격을 지시한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-orange-300">캐논슈터</p>
                                        <p className="text-slate-300 mt-0.5">메가 캐논 봄바드</p>
                                        <p className="text-slate-400 text-xs mt-0.5">거대한 다연장 캐논을 실체화하여 전방을 향해 폭격한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-cyan-300">스트라이커</p>
                                        <p className="text-slate-300 mt-0.5">해황폭쇄</p>
                                        <p className="text-slate-400 text-xs mt-0.5">패도의 극의에 다다른 힘이 바다의 폭군으로 형상화되어 전장을 갈아엎는다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-slate-300">제논</p>
                                        <p className="text-slate-300 mt-0.5">레일 건 캐노네이드</p>
                                        <p className="text-slate-400 text-xs mt-0.5">루티가 전자기 가속 포를 난사한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-pink-300">엔젤릭버스터</p>
                                        <p className="text-slate-300 mt-0.5">팝핑 하트</p>
                                        <p className="text-slate-400 text-xs mt-0.5">메이플의 아이돌을 응원하는 팬들이 집결한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-blue-300">아크</p>
                                        <p className="text-slate-300 mt-0.5">원초의 격류</p>
                                        <p className="text-slate-400 text-xs mt-0.5">스펙터와 레프의 힘을 극대화하여 격류를 일으킨다.</p>
                                    </div>
                                </div>
                            </div>

                            {/* 기사단 / 영웅 계열 */}
                            <div className="bg-amber-900/20 border border-amber-500/40 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base sm:text-lg text-amber-300 mb-3 flex items-center gap-2">
                                    🌟 기사단 / 영웅 계열
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-red-300">아란</p>
                                        <p className="text-slate-300 mt-0.5">마하 언리시드</p>
                                        <p className="text-slate-400 text-xs mt-0.5">각성한 마하의 힘이 폴암에 깃들어 한계를 넘어선 초식을 그려낸다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-pink-300">메르세데스</p>
                                        <p className="text-slate-300 mt-0.5">베리안 서지</p>
                                        <p className="text-slate-400 text-xs mt-0.5">빛과 정령의 힘을 담아 전방의 적을 꿰뚫는다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-blue-300">은월</p>
                                        <p className="text-slate-300 mt-0.5">연우격풍</p>
                                        <p className="text-slate-400 text-xs mt-0.5">수호령이 동고동락한 벗의 모습으로 나타나 도움을 준다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-red-300">데몬 슬레이어</p>
                                        <p className="text-slate-300 mt-0.5">래쓰 오브 세이튼</p>
                                        <p className="text-slate-400 text-xs mt-0.5">데몬 포스를 담아 휘두른 일격으로 차원을 일그러뜨린다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-purple-300">데몬 어벤져</p>
                                        <p className="text-slate-300 mt-0.5">래비드 카니지</p>
                                        <p className="text-slate-400 text-xs mt-0.5">분노에 가득 차 데스페라도를 휘갈기고 검날창으로 내려찍는다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-green-300">라라</p>
                                        <p className="text-slate-300 mt-0.5">한아름 아우른 숨결</p>
                                        <p className="text-slate-400 text-xs mt-0.5">비옥한 대지의 숨결을 머금은 용맥을 분출시켜 융합 토지령을 불러낸다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-orange-300">호영</p>
                                        <p className="text-slate-300 mt-0.5">선기 : 사흉해방 도철</p>
                                        <p className="text-slate-400 text-xs mt-0.5">봉인된 도철을 해방하여 함께 전장을 압도한다.</p>
                                    </div>
                                    <div className="bg-slate-800/60 rounded p-2.5">
                                        <p className="font-semibold text-slate-300">레테</p>
                                        <p className="text-slate-300 mt-0.5">보이드 오리진</p>
                                        <p className="text-slate-400 text-xs mt-0.5">근원적 공허함에 이끌린 마력이 소멸해가는 심상 세계를 창조한다.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* 스킬 수정 사항 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">스킬 수정 사항</h2>
                        </div>

                        <div className="space-y-4 text-xs sm:text-sm text-slate-200">

                            {/* 공통 */}
                            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base sm:text-lg text-slate-200 mb-3">🔧 공통</h3>
                                <ul className="space-y-1.5 ml-4 list-disc">
                                    <li>캐릭터 정보의 스탯 공격력 설명 변경</li>
                                    <li><span className="text-yellow-300 font-semibold">루나 게더링</span>: 펫 아이템 줍기 불가 맵에서 사용 가능한 현상 수정</li>
                                    <li><span className="text-red-300 font-semibold">솔 헤카테 : 스틱스</span> 행동 불가 적용 후 저항 시간 <span className="text-red-400">47초 → 39초</span> 감소</li>
                                    <li className="text-slate-300">일부 특수 코어 재발동 대기시간 <span className="text-yellow-400 font-semibold">120초</span>로 변경:
                                        <div className="text-xs text-slate-400 ml-2 mt-1">폭주하는 힘 I, 치명적인 일격 I, 방어구 부수기 I/II, 보스 슬레이어 I/II/III, 컴백, 끊임없는 공격, 자동회복, 견뎌내기 I/II, 한놈만 I, 근성 I, 일격필살 I, 반격 I</div>
                                    </li>
                                    <li><span className="text-green-300 font-semibold">그란디스 여신의 축복</span>: 노바의 재사용 대기시간 미적용 확률 <span className="text-green-400">100%</span>로 변경</li>
                                    <li><span className="text-cyan-300">화중군자 / 화중군자 VI</span>: 네트워크 상태에 따라 여러 번 부활 가능한 현상 수정</li>
                                </ul>
                            </div>

                            {/* 직업별 주요 수정 */}
                            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base sm:text-lg text-slate-200 mb-3">⚔️ 직업별 주요 수정</h3>
                                <div className="space-y-3">
                                    <div className="border-l-2 border-yellow-500/50 pl-3">
                                        <p className="font-semibold text-yellow-300">신궁 — 스플릿 애로우 강화</p>
                                        <ul className="text-slate-300 space-y-0.5 ml-2 mt-1 list-disc">
                                            <li>버프 지속 시간 <span className="text-green-400">72초 → 120초</span> 증가</li>
                                            <li>추가 공격 최대 <span className="text-green-400">140회</span> 발동 가능으로 변경</li>
                                            <li>추가 공격 데미지 <span className="text-green-400">1302% → 1631%</span> 증가</li>
                                        </ul>
                                    </div>
                                    <div className="border-l-2 border-orange-500/50 pl-3">
                                        <p className="font-semibold text-orange-300">미하일 — 로얄 가드 강화</p>
                                        <ul className="text-slate-300 space-y-0.5 ml-2 mt-1 list-disc">
                                            <li>공격력 증가 버프 지속 시간 <span className="text-green-400">20초 → 60초</span> 증가 (로얄 가드 & VI)</li>
                                        </ul>
                                    </div>
                                    <div className="border-l-2 border-blue-500/50 pl-3">
                                        <p className="font-semibold text-blue-300">배틀메이지 — 어비셜 라이트닝</p>
                                        <ul className="text-slate-300 space-y-0.5 ml-2 mt-1 list-disc">
                                            <li>명계의 번개 최대 발동 횟수 제한 추가</li>
                                            <li>데미지 <span className="text-green-400">1650% → 1980%</span> 증가</li>
                                        </ul>
                                    </div>
                                    <div className="border-l-2 border-pink-500/50 pl-3">
                                        <p className="font-semibold text-pink-300">카인 — [발현] 스트라이크 애로우</p>
                                        <ul className="text-slate-300 space-y-0.5 ml-2 mt-1 list-disc">
                                            <li>재발현 대기시간 <span className="text-green-400">삭제</span></li>
                                        </ul>
                                    </div>
                                    <div className="border-l-2 border-purple-500/50 pl-3">
                                        <p className="font-semibold text-purple-300">메르세데스 — 연계 개선</p>
                                        <ul className="text-slate-300 space-y-0.5 ml-2 mt-1 list-disc">
                                            <li>파이널 어택 / 어드밴스드 파이널 어택: 가끔 연속 공격에 발동되지 않는 현상 수정</li>
                                            <li>리프 토네이도 VI, 거스트 다이브 VI: 베리안 서지 데미지 증가 패시브 추가</li>
                                        </ul>
                                    </div>
                                    <div className="border-l-2 border-cyan-500/50 pl-3">
                                        <p className="font-semibold text-cyan-300">라라 — 아름드리 나무 개선</p>
                                        <ul className="text-slate-300 space-y-0.5 ml-2 mt-1 list-disc">
                                            <li>맵 이동 시에도 버프 유지되도록 수정</li>
                                            <li>영역 삭제</li>
                                        </ul>
                                    </div>
                                    <div className="border-l-2 border-red-500/50 pl-3">
                                        <p className="font-semibold text-red-300">레테 — 전반적 수치 조정</p>
                                        <ul className="text-slate-300 space-y-0.5 ml-2 mt-1 list-disc">
                                            <li>인보크 : 바르가르 데미지 <span className="text-green-400">143% → 204%</span> 증가</li>
                                            <li>인보크 : 템플러 / 템플러 II 데미지 공식 변경</li>
                                            <li>이딕트 : 램페이지 일반 몬스터 공격 데미지 <span className="text-red-400">241%p → 210%p</span> 감소</li>
                                            <li>인보크 : 바르가르 강화 최종 데미지 증가량 <span className="text-red-400">300% → 180%</span> 감소</li>
                                            <li>임프린트 VI 돌진하는 펠 데미지 <span className="text-red-400">264% → 237%</span> 감소</li>
                                            <li>인보크 : 바르가르 VI 데미지 <span className="text-green-400">242% → 346%</span> 증가, 일반 몬스터 <span className="text-red-400">543%p → 491%p</span> 감소</li>
                                            <li>드라이브, 임펠: 공격 속도 증가 효과가 별도 버프 아이콘으로 표기</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* 연무장 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <Star className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400">연무장 업데이트</h2>
                        </div>

                        <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                            <div className="bg-orange-900/20 border border-orange-500/40 rounded-lg p-3">
                                <p className="font-semibold text-orange-300 mb-2">🔄 리플레이 초기화 & 보상</p>
                                <ul className="space-y-1.5 ml-4 list-disc">
                                    <li>등록된 리플레이 및 추천 권한 초기화</li>
                                    <li>7월 23일 업데이트 시점 기준 직업별 추천 수 1위 리플레이 등록 캐릭터에게 <span className="text-yellow-400 font-semibold">10만 메이플포인트 교환권</span> 지급</li>
                                    <li className="text-slate-400 text-xs">※ 메이플 보관함으로 지급 / 8월 20일까지 수령 가능</li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-3">
                                <p className="font-semibold text-slate-200 mb-2">📅 연무장 운영 기간 변경</p>
                                <p className="text-slate-300">2026년 <span className="text-green-400 font-semibold">8월 6일(목) 0시 ~ 8월 19일(수) 23:59</span></p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 최대 데미지 & 기타 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-600 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-200">기타 변경사항</h2>
                        </div>

                        <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                            {/* 최대 데미지 */}
                            <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border border-yellow-500/50 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base text-yellow-300 mb-2">💥 최대 데미지 제한 상향</h3>
                                <p className="text-lg font-black text-white">7,000억 → <span className="text-yellow-400">10조</span></p>
                                <p className="text-slate-400 text-xs mt-1">현재 메타에서 최고 딜러들이 제한에 가까워지고 있어 상향 조정</p>
                            </div>

                            {/* 몬스터 */}
                            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base text-slate-200 mb-2">👹 몬스터 수정</h3>
                                <p className="text-slate-300">보스 몬스터에게 행동 불가 / 절대 행동 불가 / 솔 헤카테 : 스틱스의 행동 불가 상태 이상 적용 시, 일부 필드에서 발생하는 패턴이 발생하지 않도록 변경</p>
                            </div>

                            {/* 아이템 */}
                            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base text-slate-200 mb-2">📦 아이템 수정</h3>
                                <ul className="space-y-1.5 ml-4 list-disc text-slate-300">
                                    <li>알레리아의 영약 버프 소모 후 재접속 시 버프 아이콘 출력 현상 수정</li>
                                    <li>소울마스터가 일루전 링 착용 후 라이징 선/폴링문 상태일 때 공격 동작 취하는 현상 수정</li>
                                    <li>일부 유닛 데미지 스킨 및 한글 데미지 스킨 툴팁 이미지 수정</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* CTA */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 text-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">내 직업의 HEXA 스킬 우선순위는?</h3>
                        <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-6">
                            메이플 AI에서 직업별 HEXA 스킬 투자 우선순위를 확인하세요!
                        </p>
                        <Link prefetch={false} href="/blog/hexa-skill-priority">
                            <button className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg sm:rounded-xl transition-all shadow-xl hover:shadow-2xl">
                                HEXA 스킬 우선순위 보러가기
                            </button>
                        </Link>
                    </div>
                </section>

                {/* Back to Blog */}
                <div className="text-center pt-8 border-t border-slate-800">
                    <Link prefetch={false} href="/blog" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        블로그 목록으로 돌아가기
                    </Link>
                </div>
            </main>
        </div>
    );
}
