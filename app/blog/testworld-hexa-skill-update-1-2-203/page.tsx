'use client';

import Link from 'next/link';
import { Calendar, ArrowLeft, Sparkles, Zap, AlertCircle, Star, ExternalLink } from 'lucide-react';
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

                    <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-6">
                        7월 9일 테스트월드 열렸어요! 이번 패치 핵심은 <span className="text-purple-300 font-bold">거의 모든 직업에 신규 HEXA 스킬 추가</span>인데요, 그 외에도 신궁 버프, 미하일 버프, 최대 데미지 상향 등 꽤 알찬 패치입니다. 7월 23일 본섭 적용 예정이고, 중간에 7월 16일에 2차 테스트가 한 번 더 있을 예정이에요!
                    </p>

                    {/* Update Schedule */}
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                        <h3 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-purple-400" />
                            업데이트 일정
                        </h3>
                        <div className="space-y-1.5 text-sm sm:text-base text-slate-200">
                            <p>• <span className="font-bold text-amber-300">1차 테스트월드</span>: 7월 9일 (목) — 오늘!</p>
                            <p>• <span className="font-bold text-yellow-300">2차 테스트월드</span>: 7월 16일 (목) 예정</p>
                            <p>• <span className="font-bold text-green-300">본서버 적용</span>: 7월 23일 (목) 예정</p>
                        </div>
                    </div>
                </div>

                {/* 신규 HEXA 스킬 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-2 border-purple-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 text-purple-400" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400">신규 HEXA 스킬</h2>
                        </div>

                        <p className="text-sm sm:text-base text-slate-300 mb-5 leading-relaxed">
                            이번 패치 핵심이에요. 무려 <span className="text-purple-300 font-bold">48개 직업 전부</span>에 신규 HEXA 스킬이 들어왔어요. 솔직히 직업 하나하나 다 다를 줄 알았는데, 생각보다 스케일이 커서 놀랐어요 😄 내 직업 스킬명이랑 설명 한 번 확인해보세요!
                        </p>

                        <div className="space-y-3 text-xs sm:text-sm text-slate-200">

                            {/* 전사 계열 */}
                            <div className="bg-red-900/20 border border-red-500/40 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base sm:text-lg text-red-300 mb-3">⚔️ 전사 계열</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {[
                                        { job: '히어로', skill: '레이지 익스플로젼', desc: '찰나의 순간 극한의 일격이 모든 것을 압도한다.' },
                                        { job: '팔라딘', skill: '디바인 컨버전스', desc: '성스러운 빛을 담은 망치를 연속으로 내리쳐 심판을 선고한다.' },
                                        { job: '다크나이트', skill: '다크니스 오브 그레이스', desc: '어둠의 축복으로 계약의 힘이 강화되고 비홀더의 진정한 힘이 개방된다.' },
                                        { job: '미하일', skill: '레디언스 오브 발러', desc: '단호한 수호의 의지가 거대한 빛의 검이 되어 솟아오른다.' },
                                        { job: '소울마스터', skill: '셀레스티얼 클리브', desc: '검격으로 우주를 새기고 마무리 일격으로 시공간을 가른다.' },
                                        { job: '블래스터', skill: '오버히트 펀치', desc: '한계를 넘어 과열된 에너지를 담아 강력한 펀치를 내리꽂는다.' },
                                        { job: '카이저', skill: '드라코닉 익스팅션', desc: '고대 용의 힘을 받아들여 전장의 적을 말살한다.' },
                                        { job: '아델', skill: '에테르 뤼페', desc: '거대한 에테르 소드로 마력의 격류를 일으킨다.' },
                                        { job: '렌', skill: '창룡파천검 : 만참', desc: '창룡의 기운을 머금은 검이 만물을 벤다.' },
                                    ].map(({ job, skill, desc }) => (
                                        <div key={job} className="bg-slate-800/60 rounded p-2.5">
                                            <p className="font-semibold text-red-200">{job}</p>
                                            <p className="text-slate-200 mt-0.5 font-medium">{skill}</p>
                                            <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 마법사 계열 */}
                            <div className="bg-blue-900/20 border border-blue-500/40 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base sm:text-lg text-blue-300 mb-3">🔮 마법사 계열</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {[
                                        { job: '아크메이지(불,독)', skill: '인페르날 웨이브', desc: '화염과 독의 마력을 극한까지 끌어올려 마력의 파도를 일으킨다.' },
                                        { job: '아크메이지(썬,콜)', skill: '서브제로 퍼미네이션', desc: '극한의 냉기와 번개를 결합시켜 융합 폭발을 일으킨다.' },
                                        { job: '비숍', skill: '엔젤스 플레지', desc: '순결의 군세가 성화를 밝혀 만물을 정화하기 위한 서약을 한다.' },
                                        { job: '플레임위자드', skill: '이그니스 레퀴엠', desc: '근원의 불꽃으로 적을 섬멸한다.' },
                                        { job: '루미너스', skill: '앱솔루트 스페이스', desc: '빛과 어둠을 초월한 마력으로 절대 공간을 펼쳐 적을 압도한다.' },
                                        { job: '에반', skill: '드래곤 소어 / 버티컬 피니셔', desc: '진화한 미르가 포효하고 날아오른다. 에반의 마법과 공명해 한계를 해방한다.' },
                                        { job: '배틀메이지', skill: '모티스 엣지', desc: '암흑의 힘으로 짙게 물든 낫을 휘두른다.' },
                                        { job: '일리움', skill: '글로리 윙 : 스플렌더', desc: '크리스탈의 힘이 강력하게 공명하여 일순간 공간을 장악한다.' },
                                        { job: '키네시스', skill: '그래비티 오브젝트', desc: '이계의 오브젝트를 생성하여 중력의 힘으로 적에게 발사한다.' },
                                    ].map(({ job, skill, desc }) => (
                                        <div key={job} className="bg-slate-800/60 rounded p-2.5">
                                            <p className="font-semibold text-blue-200">{job}</p>
                                            <p className="text-slate-200 mt-0.5 font-medium">{skill}</p>
                                            <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 궁수 계열 */}
                            <div className="bg-green-900/20 border border-green-500/40 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base sm:text-lg text-green-300 mb-3">🏹 궁수 계열</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {[
                                        { job: '보우마스터', skill: '아이 오브 아퀼라', desc: '어떤 표적도 놓치지 않는 필중의 일격을 날린다.' },
                                        { job: '신궁', skill: '리썰 퍼니셔', desc: '폭발성 화살을 장전한 뒤 극한의 전투 태세에 돌입한다.' },
                                        { job: '패스파인더', skill: '마테리얼 버스트', desc: '고대 신화 속의 궁술을 재현하여 전방에 강력한 폭격을 퍼붓는다.' },
                                        { job: '윈드브레이커', skill: '실프스 브레스', desc: '바람의 요정 실프가 거대한 돌풍을 일으켜 적을 헤집는다.' },
                                        { job: '와일드헌터', skill: '레조넌스 : 와일드 피어스', desc: '아실리와의 공명으로 자연의 힘을 석궁에 실어 공격한다.' },
                                        { job: '메카닉', skill: '버스터 스테이션', desc: '미사일 스테이션을 설치하여 무수한 폭격을 퍼붓는다.' },
                                        { job: '카인', skill: '[발현] 스트라이크 임팩트 / [처형] 팬텀 레퀴엠', desc: '악의가 폭주하여 마룡이 현현한다. 무자비한 난도질 후 죽음을 방출.' },
                                    ].map(({ job, skill, desc }) => (
                                        <div key={job} className="bg-slate-800/60 rounded p-2.5">
                                            <p className="font-semibold text-green-200">{job}</p>
                                            <p className="text-slate-200 mt-0.5 font-medium">{skill}</p>
                                            <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 도적 계열 */}
                            <div className="bg-purple-900/20 border border-purple-500/40 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base sm:text-lg text-purple-300 mb-3">🗡️ 도적 계열</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {[
                                        { job: '나이트로드', skill: '쉐도우 리츄얼', desc: '그림자의 힘을 담아 부적을 일깨운다.' },
                                        { job: '섀도어', skill: '무아지경', desc: '자아마저 지운 고요 속에서 적을 멸한다.' },
                                        { job: '듀얼블레이드', skill: '암영난참', desc: '비화원의 암영비기가 어둠 속에 깃든 힘으로 발현한다.' },
                                        { job: '나이트워커', skill: '싱귤래러티 스로우', desc: '그림자를 실체화하여 칠흑의 어둠을 담은 암흑 표창을 투척한다.' },
                                        { job: '팬텀', skill: '플레슈 르투르', desc: '카드를 소환하여 사방으로 날린 뒤 일제히 거두어들이며 폭발시킨다.' },
                                        { job: '카데나', skill: '체인아츠:토렌트', desc: '에너지를 체인으로 강하게 휘감아 억누른다.' },
                                        { job: '칼리', skill: '헥스 : 듄 버스트', desc: '차크람이 모래 폭풍을 베어 가르며 적에게 모래 폭발을 일으킨다.' },
                                        { job: '제로', skill: '타임 어소리티', desc: '거스를 수 없는 시간의 힘으로 적을 압도한다.' },
                                    ].map(({ job, skill, desc }) => (
                                        <div key={job} className="bg-slate-800/60 rounded p-2.5">
                                            <p className="font-semibold text-purple-200">{job}</p>
                                            <p className="text-slate-200 mt-0.5 font-medium">{skill}</p>
                                            <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 해적 계열 */}
                            <div className="bg-cyan-900/20 border border-cyan-500/40 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base sm:text-lg text-cyan-300 mb-3">🏴‍☠️ 해적 계열</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {[
                                        { job: '바이퍼', skill: '넵투누스 어드밴트', desc: '최초의 수룡 넵투누스의 기백이 깃들어 수룡의 힘이 강화된다.' },
                                        { job: '캡틴', skill: '에어리얼 봄바드먼트', desc: '창공의 폭격대에게 전장을 초토화시킬 공중 포격을 지시한다.' },
                                        { job: '캐논슈터', skill: '메가 캐논 봄바드', desc: '거대한 다연장 캐논을 실체화하여 전방을 향해 폭격한다.' },
                                        { job: '스트라이커', skill: '해황폭쇄', desc: '패도의 극의에 다다른 힘이 바다의 폭군으로 형상화되어 전장을 갈아엎는다.' },
                                        { job: '제논', skill: '레일 건 캐노네이드', desc: '루티가 전자기 가속 포를 난사한다.' },
                                        { job: '엔젤릭버스터', skill: '팝핑 하트', desc: '메이플의 아이돌을 응원하는 팬들이 집결한다.' },
                                        { job: '아크', skill: '원초의 격류', desc: '스펙터와 레프의 힘을 극대화하여 격류를 일으킨다.' },
                                    ].map(({ job, skill, desc }) => (
                                        <div key={job} className="bg-slate-800/60 rounded p-2.5">
                                            <p className="font-semibold text-cyan-200">{job}</p>
                                            <p className="text-slate-200 mt-0.5 font-medium">{skill}</p>
                                            <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 기사단 / 영웅 계열 */}
                            <div className="bg-amber-900/20 border border-amber-500/40 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base sm:text-lg text-amber-300 mb-3">🌟 기사단 / 영웅 계열</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {[
                                        { job: '아란', skill: '마하 언리시드', desc: '각성한 마하의 힘이 폴암에 깃들어 한계를 넘어선 초식을 그려낸다.' },
                                        { job: '메르세데스', skill: '베리안 서지', desc: '빛과 정령의 힘을 담아 전방의 적을 꿰뚫는다.' },
                                        { job: '은월', skill: '연우격풍', desc: '수호령이 동고동락한 벗의 모습으로 나타나 도움을 준다.' },
                                        { job: '데몬 슬레이어', skill: '래쓰 오브 세이튼', desc: '데몬 포스를 담아 휘두른 일격으로 차원을 일그러뜨린다.' },
                                        { job: '데몬 어벤져', skill: '래비드 카니지', desc: '분노에 가득 차 데스페라도를 휘갈기고 검날창으로 내려찍어 도륙낸다.' },
                                        { job: '라라', skill: '한아름 아우른 숨결', desc: '비옥한 대지의 숨결을 머금은 용맥을 분출시켜 융합 토지령을 불러낸다.' },
                                        { job: '호영', skill: '선기 : 사흉해방 도철', desc: '봉인된 도철을 해방하여 함께 전장을 압도한다.' },
                                        { job: '레테', skill: '보이드 오리진', desc: '근원적 공허함에 이끌린 마력이 소멸해가는 심상 세계를 창조한다.' },
                                    ].map(({ job, skill, desc }) => (
                                        <div key={job} className="bg-slate-800/60 rounded p-2.5">
                                            <p className="font-semibold text-amber-200">{job}</p>
                                            <p className="text-slate-200 mt-0.5 font-medium">{skill}</p>
                                            <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* 스킬 수정 — 주요 내용만 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <Zap className="w-7 h-7 sm:w-9 sm:h-9 text-yellow-400" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">이번 패치 핵심 변경사항</h2>
                        </div>
                        <p className="text-sm text-slate-400 mb-5">버그 픽스나 이펙트 수정 같은 마이너한 내용은 아래 공식 링크에서 확인해 주세요! 여기선 실제로 체감되는 것들만 정리했어요.</p>

                        <div className="space-y-4 text-xs sm:text-sm text-slate-200">

                            {/* 공통 */}
                            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base text-slate-100 mb-3">🔧 공통 변경</h3>
                                <ul className="space-y-2 ml-1">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-0.5 shrink-0">▼</span>
                                        <span><span className="text-yellow-300 font-semibold">솔 헤카테 : 스틱스</span> 행동 불가 저항 시간 <span className="text-red-400 font-bold">47초 → 39초</span>로 감소 — 보스 입장에서 쓸 수 있는 시간이 줄어드는 거라 살짝 너프예요</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-0.5 shrink-0">▼</span>
                                        <span><span className="text-yellow-300 font-semibold">특수 코어</span> (보스 슬레이어, 방어구 부수기 등 16종) 재발동 대기시간 <span className="text-red-400 font-bold">120초</span>로 통일 — 짧게 쓰던 분들은 체감될 수 있어요</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400 mt-0.5 shrink-0">▲</span>
                                        <span><span className="text-yellow-300 font-semibold">그란디스 여신의 축복</span> 노바 재사용 대기시간 미적용 확률 <span className="text-green-400 font-bold">100%</span>로 변경 — 노바 직업은 이게 확정으로 터진다고 보면 돼요</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-slate-400 mt-0.5 shrink-0">•</span>
                                        <span><span className="text-yellow-300 font-semibold">루나 게더링</span>: 펫 아이템 줍기 불가 맵에서 사용 가능하던 버그 수정</span>
                                    </li>
                                </ul>
                            </div>

                            {/* 직업별 주요 */}
                            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base text-slate-100 mb-3">⚔️ 직업별 눈에 띄는 변경</h3>
                                <div className="space-y-3">

                                    <div className="border-l-2 border-green-500 pl-3">
                                        <p className="font-bold text-green-300">신궁 — 스플릿 애로우 대폭 강화 🎉</p>
                                        <ul className="text-slate-300 space-y-0.5 mt-1 ml-1">
                                            <li>• 버프 지속 시간 <span className="text-green-400 font-bold">72초 → 120초</span> (거의 2배!)</li>
                                            <li>• 추가 공격 최대 <span className="text-green-400 font-bold">140회</span> 발동 가능</li>
                                            <li>• 데미지 <span className="text-green-400 font-bold">1302% → 1631%</span></li>
                                            <li className="text-slate-400 text-xs">신궁 유저분들 반가운 소식이죠?</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-2 border-orange-500 pl-3">
                                        <p className="font-bold text-orange-300">미하일 — 로얄 가드 버프 🎉</p>
                                        <ul className="text-slate-300 space-y-0.5 mt-1 ml-1">
                                            <li>• 공격력 증가 버프 지속 시간 <span className="text-green-400 font-bold">20초 → 60초</span></li>
                                            <li className="text-slate-400 text-xs">3배로 늘었어요. 미하일 쓰시는 분들 꽤 체감될 듯!</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-2 border-blue-500 pl-3">
                                        <p className="font-bold text-blue-300">배틀메이지 — 어비셜 라이트닝</p>
                                        <ul className="text-slate-300 space-y-0.5 mt-1 ml-1">
                                            <li>• 명계의 번개 최대 발동 횟수 제한 추가 (상한선 생겼어요)</li>
                                            <li>• 데미지 <span className="text-green-400 font-bold">1650% → 1980%</span></li>
                                        </ul>
                                    </div>

                                    <div className="border-l-2 border-pink-500 pl-3">
                                        <p className="font-bold text-pink-300">카인 — [발현] 스트라이크 애로우 🎉</p>
                                        <ul className="text-slate-300 space-y-0.5 mt-1 ml-1">
                                            <li>• 재발현 대기시간 <span className="text-green-400 font-bold">삭제</span></li>
                                            <li className="text-slate-400 text-xs">쿨이 아예 없어진다는 거! 카인 유저 좋겠다</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-2 border-purple-500 pl-3">
                                        <p className="font-bold text-purple-300">메르세데스 — 베리안 서지 연계 강화</p>
                                        <ul className="text-slate-300 space-y-0.5 mt-1 ml-1">
                                            <li>• 리프 토네이도 VI, 거스트 다이브 VI에 <span className="text-purple-300 font-semibold">베리안 서지 데미지 증가 패시브</span> 추가</li>
                                            <li>• 파이널 어택 연속 공격 발동 안 되던 버그도 수정</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-2 border-cyan-500 pl-3">
                                        <p className="font-bold text-cyan-300">라라 — 아름드리 나무 개선</p>
                                        <ul className="text-slate-300 space-y-0.5 mt-1 ml-1">
                                            <li>• <span className="text-green-400 font-semibold">맵 이동 시에도 버프 유지</span>! (기존엔 이동하면 사라졌죠)</li>
                                            <li>• 영역 삭제 (지형 간섭 없어짐)</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-2 border-red-500 pl-3">
                                        <p className="font-bold text-red-300">레테 — 전반적 수치 조정 (상향 + 하향 혼재)</p>
                                        <ul className="text-slate-300 space-y-0.5 mt-1 ml-1">
                                            <li>• 인보크 : 바르가르 <span className="text-green-400 font-bold">143% → 204%</span> ▲</li>
                                            <li>• 인보크 : 바르가르 VI <span className="text-green-400 font-bold">242% → 346%</span> ▲ (일반몹 <span className="text-red-400">543%p → 491%p</span> ▼)</li>
                                            <li>• 인보크 : 바르가르 강화 최종뎀 <span className="text-red-400 font-bold">300% → 180%</span> ▼</li>
                                            <li>• 임프린트 VI 펠 데미지 <span className="text-red-400 font-bold">264% → 237%</span> ▼</li>
                                            <li>• 이딕트 : 램페이지 일반몹 <span className="text-red-400 font-bold">241%p → 210%p</span> ▼</li>
                                            <li>• 인보크 : 템플러 / 템플러 II 데미지 공식 변경</li>
                                            <li>• 드라이브, 임펠 공속 증가 효과가 별도 버프 아이콘으로 표기</li>
                                            <li className="text-slate-400 text-xs">보스 딜은 오르고 일반몹 딜은 내린 방향이에요</li>
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
                        <div className="flex items-center gap-3 mb-3">
                            <Star className="w-7 h-7 sm:w-9 sm:h-9 text-orange-400" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400">연무장</h2>
                        </div>
                        <p className="text-sm text-slate-400 mb-4">연무장 관련 내용도 정리했어요!</p>

                        <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                            <div className="bg-orange-900/20 border border-orange-500/40 rounded-lg p-3">
                                <p className="font-bold text-orange-200 mb-2">🔄 리플레이 초기화 & 이번 시즌 보상</p>
                                <ul className="space-y-1.5 ml-1">
                                    <li>• 기존에 등록된 리플레이랑 추천 권한 <span className="text-yellow-300 font-semibold">전부 초기화</span>돼요</li>
                                    <li>• <span className="text-white font-semibold">7월 23일 업데이트 시점</span>에 직업별 추천 1위 리플레이 올린 캐릭터한테 <span className="text-yellow-400 font-bold">10만 메이플포인트 교환권</span> 지급!</li>
                                    <li className="text-slate-400">※ 메이플 보관함으로 지급 / 8월 20일까지 수령 및 사용 가능</li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-3">
                                <p className="font-bold text-slate-200 mb-1.5">📅 운영 기간 변경</p>
                                <p className="text-slate-300"><span className="text-green-300 font-semibold">8월 6일(목) 0시 ~ 8월 19일(수) 23:59</span></p>
                                <p className="text-slate-400 text-xs mt-1">테스트월드에서는 7/9 점검 후 ~ 7/22까지 운영</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 최대 데미지 & 기타 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-600 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <AlertCircle className="w-7 h-7 sm:w-9 sm:h-9 text-slate-300" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-200">그 외 변경사항</h2>
                        </div>

                        <div className="space-y-3 text-xs sm:text-sm">
                            <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border border-yellow-500/50 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-yellow-300 mb-1.5">💥 최대 데미지 제한 상향</h3>
                                <p className="text-2xl font-black text-white">7,000억 → <span className="text-yellow-400">10조</span></p>
                                <p className="text-slate-400 text-xs mt-1.5">요즘 최상위 딜러들이 슬슬 한계에 가까워지고 있어서 올린 것 같아요. 10조라니 숫자가 실감이 안 나네요 😅</p>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4 text-slate-200">
                                <h3 className="font-bold text-slate-100 mb-2">👹 몬스터 수정</h3>
                                <p className="text-slate-300">보스에게 행동 불가 / 솔 헤카테 : 스틱스 적용 시, 일부 필드에서 특정 패턴이 발생하지 않도록 변경돼요.</p>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4 text-slate-200">
                                <h3 className="font-bold text-slate-100 mb-2">📦 아이템 수정</h3>
                                <ul className="space-y-1 ml-1 text-slate-300">
                                    <li>• 알레리아의 영약 버프 소모 후 재접속 시 아이콘 남는 버그 수정</li>
                                    <li>• 소울마스터 일루전 링 착용 후 공격 동작 취하는 현상 수정</li>
                                    <li>• 일부 데미지 스킨 툴팁 이미지 수정</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 공식 패치노트 링크 */}
                <section className="mb-8 sm:mb-12">
                    <a
                        href="https://maplestory.nexon.com/news/testworld"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-500/60 hover:border-purple-400/60 rounded-xl p-4 sm:p-5 transition-all group"
                    >
                        <div>
                            <p className="font-bold text-white text-sm sm:text-base group-hover:text-purple-300 transition-colors">
                                📋 버그 수정 · 이펙트 변경 전체 목록은 공식 테스트월드 공지에서!
                            </p>
                            <p className="text-slate-400 text-xs sm:text-sm mt-1">
                                직업별 세부 버그 픽스, 이펙트 수정 등 전체 내용은 넥슨 공식 테스트월드 페이지에서 확인해 주세요.
                            </p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-purple-300 transition-colors shrink-0 ml-3" />
                    </a>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* CTA */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-xl p-4 sm:p-6 md:p-8 text-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3">내 직업 HEXA 스킬 투자 순서가 궁금하다면?</h3>
                        <p className="text-sm sm:text-base text-slate-300 mb-5">
                            어떤 HEXA 스킬부터 올려야 할지 모르겠다면<br className="sm:hidden" /> 직업별 우선순위 가이드를 확인해보세요!
                        </p>
                        <Link prefetch={false} href="/blog/hexa-skill-priority">
                            <button className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl">
                                HEXA 스킬 우선순위 가이드 보기
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
