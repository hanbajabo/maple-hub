'use client';

import Link from 'next/link';
import { Calendar, ArrowLeft, Sparkles, Zap, AlertCircle, Star, ExternalLink } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

// 직업별 신규 HEXA 스킬 이미지 매핑 (첫 번째 추가 이미지)
const hexaSkillData = [
    // 전사 계열
    { job: '히어로', skill: '레이지 익스플로젼', desc: '찰나의 순간 극한의 일격이 모든 것을 압도한다.', color: 'red', imgs: ['/images/testworld-203/w_스킬_1141503히어로(6차)_추가.png'] },
    { job: '팔라딘', skill: '디바인 컨버전스', desc: '성스러운 빛을 담은 망치를 연속으로 내리쳐 심판을 선고한다.', color: 'yellow', imgs: ['/images/testworld-203/w_스킬_1241506팔라딘(6차)_추가.png'] },
    { job: '다크나이트', skill: '다크니스 오브 그레이스 / 비홀더 데버스테이션', desc: '다크니스 오브 그레이스: 어둠의 축복으로 계약의 힘이 강화된다. / 비홀더 데버스테이션: 계약 아래 복속된 비홀더의 진정한 힘이 개방된다.', color: 'purple', imgs: [
        '/images/testworld-203/w_스킬_1341504다크나이트(6차)_추가.png',
        '/images/testworld-203/w_스킬_1341505다크나이트(6차)_추가.png',
    ]},
    { job: '미하일', skill: '레디언스 오브 발러', desc: '단호한 수호의 의지가 거대한 빛의 검이 되어 전장을 가르며 솟아오른다.', color: 'orange', imgs: ['/images/testworld-203/w_스킬_51141505미하일(6차)_추가.png'] },
    { job: '소울마스터', skill: '셀레스티얼 클리브', desc: '검격으로 우주를 새기고 마무리 일격으로 시공간을 가른다.', color: 'blue', imgs: ['/images/testworld-203/w_스킬_11141505소울마스터(6차)_추가.png'] },
    { job: '블래스터', skill: '오버히트 펀치', desc: '한계를 넘어 과열된 에너지를 담아 강력한 펀치를 내리꽂는다.', color: 'cyan', imgs: ['/images/testworld-203/w_스킬_37141504블래스터(6차)_추가.png'] },
    { job: '카이저', skill: '드라코닉 익스팅션', desc: '고대 용의 힘을 받아들여 전장의 적을 말살한다.', color: 'red', imgs: ['/images/testworld-203/w_스킬_61141503카이저(6차)_추가.png'] },
    { job: '아델', skill: '에테르 뤼페', desc: '거대한 에테르 소드로 마력의 격류를 일으킨다.', color: 'slate', imgs: ['/images/testworld-203/w_스킬_151141503아델(6차)_추가.png'] },
    { job: '렌', skill: '창룡파천검 : 만참', desc: '창룡의 기운을 머금은 검이 만물을 벤다.', color: 'purple', imgs: ['/images/testworld-203/w_스킬_161140507렌(6차)_추가.png'] },
    // 마법사 계열
    { job: '아크메이지(불,독)', skill: '인페르날 웨이브', desc: '화염과 독의 마력을 극한까지 끌어올려 마력의 파도를 일으킨다.', color: 'orange', imgs: ['/images/testworld-203/w_스킬_2141506아크메이지(불,독)(6차)_추가.png'] },
    { job: '아크메이지(썬,콜)', skill: '서브제로 퍼미네이션', desc: '극한의 냉기와 번개를 결합시켜 융합 폭발을 일으킨다.', color: 'cyan', imgs: ['/images/testworld-203/w_스킬_2241507아크메이지(썬,콜)(6차)_추가.png'] },
    { job: '비숍', skill: '엔젤스 플레지', desc: '순결의 군세가 성화를 밝혀 만물을 정화하기 위한 서약을 한다.', color: 'yellow', imgs: ['/images/testworld-203/w_스킬_2341509비숍(6차)_추가.png'] },
    { job: '플레임위자드', skill: '이그니스 레퀴엠', desc: '근원의 불꽃으로 적을 섬멸한다.', color: 'red', imgs: ['/images/testworld-203/w_스킬_12141505플레임위자드(6차)_추가.png'] },
    { job: '루미너스', skill: '앱솔루트 스페이스', desc: '빛과 어둠을 초월한 마력으로 절대 공간을 펼쳐 적을 압도한다.', color: 'purple', imgs: ['/images/testworld-203/w_스킬_27141504루미너스(6차)_추가.png'] },
    { job: '에반', skill: '드래곤 소어 / 버티컬 피니셔 / 소어-돌아와!', desc: '드래곤 소어: 진화한 미르가 강하게 포효하고 날아오른다. / 버티컬 피니셔: 미르가 드래곤 소어 공격 중 에반의 마법과 공명해 한계를 해방한다. / 소어-돌아와!: 미르가 즉시 공격을 중단하고 에반의 곁으로 복귀한다.', color: 'blue', imgs: [
        '/images/testworld-203/w_스킬_22201505에반(6차)_추가.png',
        '/images/testworld-203/w_스킬_22200506에반(6차)_추가.png',
        '/images/testworld-203/w_스킬_22200507에반(6차)_추가.png',
    ]},
    { job: '배틀메이지', skill: '모티스 엣지', desc: '암흑의 힘으로 짙게 물든 낫을 휘두른다.', color: 'cyan', imgs: ['/images/testworld-203/w_스킬_32141504배틀메이지(6차)_추가.png'] },
    { job: '일리움', skill: '글로리 윙 : 스플렌더', desc: '크리스탈의 힘이 강력하게 공명하여 일순간 공간을 장악한다.', color: 'green', imgs: ['/images/testworld-203/w_스킬_152140510일리움(6차)_추가.png'] },
    { job: '키네시스', skill: '그래비티 오브젝트', desc: '이계의 오브젝트를 생성하여 중력의 힘으로 적에게 발사한다.', color: 'yellow', imgs: ['/images/testworld-203/w_스킬_142140504키네시스(6차)_추가.png'] },
    // 궁수 계열
    { job: '보우마스터', skill: '아이 오브 아퀼라', desc: '어떤 표적도 놓치지 않는 필중의 일격을 날린다.', color: 'green', imgs: ['/images/testworld-203/w_스킬_3141505보우마스터(6차)_추가.png'] },
    { job: '신궁', skill: '리썰 퍼니셔', desc: '폭발성 화살을 장전한 뒤 극한의 전투 태세에 돌입한다.', color: 'yellow', imgs: ['/images/testworld-203/w_스킬_3241504신궁(6차)_추가.png'] },
    { job: '패스파인더', skill: '마테리얼 버스트', desc: '고대 신화 속의 궁술을 재현하여 전방에 강력한 폭격을 퍼붓는다.', color: 'purple', imgs: ['/images/testworld-203/w_스킬_3341506패스파인더(6차)_추가.png'] },
    { job: '윈드브레이커', skill: '실프스 브레스', desc: '바람의 요정 실프가 나타나 거대한 돌풍을 일으킨다. 돌풍은 작은 요정으로 자유롭게 흩어지며 적을 헤집는다.', color: 'cyan', imgs: ['/images/testworld-203/w_스킬_13141508윈드브레이커(6차)_추가.png'] },
    { job: '와일드헌터', skill: '레조넌스 : 와일드 피어스', desc: '깊어진 아실리와의 공명으로 자연의 힘을 석궁에 실어 공격한다. 화살이 지나간 자리에 스피릿 재규어가 등장한다.', color: 'orange', imgs: ['/images/testworld-203/w_스킬_33141502와일드헌터(6차)_추가.png'] },
    { job: '메카닉', skill: '버스터 스테이션', desc: '미사일 스테이션을 설치하여 무수한 폭격을 퍼붓는다.', color: 'blue', imgs: ['/images/testworld-203/w_스킬_35141505메카닉(6차)_추가.png'] },
    { job: '카인', skill: '[발현] 스트라이크 임팩트 / [처형] 팬텀 레퀴엠', desc: '[발현] 스트라이크 임팩트: 화살에 깃든 악의가 폭주하여 마룡이 현현한다. / [처형] 팬텀 레퀴엠: 두 개의 칼날로 전방을 무자비하게 난도질한 후 죽음을 방출하여 모든 적을 처형한다.', color: 'pink', imgs: [
        '/images/testworld-203/w_스킬_63141509카인(6차)_추가.png',
        '/images/testworld-203/w_스킬_63141514카인(6차)_추가.png',
    ]},
    // 도적 계열
    { job: '나이트로드', skill: '쉐도우 리츄얼', desc: '그림자의 힘을 담아 부적을 일깨운다.', color: 'slate', imgs: ['/images/testworld-203/w_스킬_4141505나이트로드(6차)_추가.png'] },
    { job: '섀도어', skill: '무아지경', desc: '자아마저 지운 고요 속에서 적을 멸한다.', color: 'purple', imgs: ['/images/testworld-203/w_스킬_4241507섀도어(6차)_추가.png'] },
    { job: '듀얼블레이드', skill: '암영난참', desc: '비화원의 암영비기가 어둠 속에 깃든 힘으로 발현한다.', color: 'pink', imgs: ['/images/testworld-203/w_스킬_4360507듀얼블레이더(6차)_추가.png'] },
    { job: '나이트워커', skill: '싱귤래러티 스로우', desc: '자신의 그림자를 실체화하여 칠흑의 어둠을 담은 암흑 표창을 투척한다.', color: 'gray', imgs: ['/images/testworld-203/w_스킬_14141505나이트워커(6차)_추가.png'] },
    { job: '팬텀', skill: '플레슈 르투르', desc: '카드를 소환하여 사방으로 날린 뒤, 흩어진 카드를 일제히 거두어들이며 폭발시킨다.', color: 'yellow', imgs: ['/images/testworld-203/w_스킬_24141505팬텀(6차)_추가.png'] },
    { job: '카데나', skill: '체인아츠:토렌트', desc: 'A.D 오드넌스로 끌어모은 에너지를 체인으로 강하게 휘감아 억누른다.', color: 'pink', imgs: ['/images/testworld-203/w_스킬_64141505카데나(6차)_추가.png'] },
    { job: '칼리', skill: '헥스 : 듄 버스트', desc: '차크람이 모래 폭풍을 베어 가르며 적에게 모래 폭발을 일으킨다.', color: 'yellow', imgs: ['/images/testworld-203/w_스킬_154141506칼리(6차)_추가.png'] },
    { job: '제로', skill: '타임 어소리티', desc: '거스를 수 없는 시간의 힘으로 적을 압도한다.', color: 'cyan', imgs: ['/images/testworld-203/w_스킬_101141506제로(6차)_추가.png'] },
    // 해적 계열
    { job: '바이퍼', skill: '넵투누스 어드밴트', desc: '최초의 수룡 넵투누스의 기백이 깃들어 일정 시간 동안 수룡의 힘이 강화된다.', color: 'blue', imgs: ['/images/testworld-203/w_스킬_5141509바이퍼(6차)_추가.png'] },
    { job: '캡틴', skill: '에어리얼 봄바드먼트', desc: '창공의 폭격대에게 전장을 초토화시킬 공중 포격을 지시한다.', color: 'yellow', imgs: ['/images/testworld-203/w_스킬_5241505캡틴(6차)_추가.png'] },
    { job: '캐논슈터', skill: '메가 캐논 봄바드', desc: '거대한 다연장 캐논을 실체화하여 전방을 향해 폭격한다.', color: 'orange', imgs: ['/images/testworld-203/w_스킬_5341504캐논마스터(6차)_추가.png'] },
    { job: '스트라이커', skill: '해황폭쇄', desc: '패도의 극의에 다다른 힘이 바다의 폭군으로 형상화되어 전장을 갈아엎는다.', color: 'cyan', imgs: ['/images/testworld-203/w_스킬_15141504스트라이커(6차)_추가.png'] },
    { job: '제논', skill: '레일 건 캐노네이드', desc: '루티가 전자기 가속 포를 난사한다.', color: 'slate', imgs: ['/images/testworld-203/w_스킬_36141507제논(6차)_추가.png'] },
    { job: '엔젤릭버스터', skill: '팝핑 하트', desc: '메이플의 아이돌을 응원하는 팬들이 집결한다.', color: 'pink', imgs: ['/images/testworld-203/w_스킬_65141506엔젤릭버스터(6차)_추가.png'] },
    { job: '아크', skill: '원초의 격류', desc: '스펙터와 레프의 힘을 극대화하여 격류를 일으킨다.', color: 'blue', imgs: ['/images/testworld-203/w_스킬_155140505아크(6차)_추가.png'] },
    // 기사단/영웅 계열
    { job: '아란', skill: '마하 언리시드', desc: '각성한 마하의 힘이 폴암에 깃들어 한계를 넘어선 초식을 그려낸다.', color: 'red', imgs: ['/images/testworld-203/w_스킬_21141505아란(6차)_추가.png'] },
    { job: '메르세데스', skill: '베리안 서지', desc: '빛과 정령의 힘을 담아 전방의 적을 꿰뚫는다.', color: 'pink', imgs: ['/images/testworld-203/w_스킬_23141506메르세데스(6차)_추가.png'] },
    { job: '은월', skill: '연우격풍', desc: '은월의 깊은 그리움에 감응한 수호령이 동고동락한 벗의 모습으로 나타나 도움을 준다.', color: 'purple', imgs: ['/images/testworld-203/w_스킬_25141508은월(6차)_추가.png'] },
    { job: '데몬 슬레이어', skill: '래쓰 오브 세이튼', desc: '데몬 포스를 담아 휘두른 일격으로 차원을 일그러뜨린다.', color: 'red', imgs: ['/images/testworld-203/w_스킬_31141505데몬_슬레이어(6차)_추가.png'] },
    { job: '데몬 어벤져', skill: '래비드 카니지', desc: '분노에 가득 차 데스페라도를 휘갈기고, 검날창으로 내려찍어 적을 도륙낸다.', color: 'purple', imgs: ['/images/testworld-203/w_스킬_31241506데몬_어벤져(6차)_추가.png'] },
    { job: '라라', skill: '한아름 아우른 숨결', desc: '비옥한 대지의 숨결을 한아름 머금은 용맥을 분출시켜 운율을 즐기는 융합 토지령을 불러낸다.', color: 'green', imgs: ['/images/testworld-203/w_스킬_162141503라라(6차)_추가.png'] },
    { job: '호영', skill: '선기 : 사흉해방 도철', desc: '봉인된 도철을 해방하여 함께 전장을 압도한다.', color: 'orange', imgs: ['/images/testworld-203/w_스킬_164141505호영(6차)_추가.png'] },
    { job: '레테', skill: '보이드 오리진', desc: '주인이 품은 근원적 공허함에 이끌린 마력이 소멸해가는 심상 세계를 창조한다.', color: 'slate', imgs: ['/images/testworld-203/w_스킬_192141504레테(6차)_추가.png'] },
];

const sections = [
    { label: '⚔️ 전사 계열', jobs: hexaSkillData.slice(0, 9) },
    { label: '🔮 마법사 계열', jobs: hexaSkillData.slice(9, 18) },
    { label: '🏹 궁수 계열', jobs: hexaSkillData.slice(18, 25) },
    { label: '🗡️ 도적 계열', jobs: hexaSkillData.slice(25, 33) },
    { label: '🏴‍☠️ 해적 계열', jobs: hexaSkillData.slice(33, 40) },
    { label: '🌟 기사단 / 영웅 계열', jobs: hexaSkillData.slice(40) },
];

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

                    <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-6 leading-relaxed">
                        2026년 7월 9일(목) 테스트월드가 업데이트됐습니다. 이번 패치의 핵심은 <span className="text-purple-300 font-bold">전 직업 신규 HEXA 스킬 추가</span>이며, 각종 스킬 수정과 연무장 개편, 최대 데미지 상향도 함께 포함되어 있습니다. 7월 23일 본섭 적용 예정이며, 중간에 7월 16일 2차 테스트월드가 한 차례 더 진행될 예정입니다.
                    </p>

                    {/* Update Schedule */}
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                        <h3 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-purple-400" />
                            업데이트 일정
                        </h3>
                        <div className="space-y-1.5 text-sm sm:text-base text-slate-200">
                            <p>• <span className="font-bold text-amber-300">1차 테스트월드</span>: 2026년 7월 9일 (목)</p>
                            <p>• <span className="font-bold text-yellow-300">2차 테스트월드</span>: 2026년 7월 16일 (목) 예정</p>
                            <p>• <span className="font-bold text-green-300">본서버 적용</span>: 2026년 7월 23일 (목) 예정</p>
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
                            총 <span className="text-purple-300 font-bold">48개 직업</span>에 신규 HEXA 스킬이 추가됩니다.
                        </p>

                        {/* 이미지 출처 */}
                        <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-600/50 rounded-lg px-3 py-2 mb-5 text-xs text-slate-400">
                            <span>📷 이미지 출처:</span>
                            <a
                                href="https://m.blog.naver.com/seotbeo/224341556041"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors font-medium"
                            >
                                섣버님 네이버 블로그
                            </a>
                        </div>

                        <div className="space-y-5">
                            {sections.map(({ label, jobs }) => (
                                <div key={label} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3 sm:p-4">
                                    <h3 className="font-bold text-base sm:text-lg text-slate-100 mb-3">{label}</h3>
                                    <div className="flex flex-col gap-4">
                                        {jobs.map(({ job, skill, desc, imgs }) => (
                                            <div key={job} className="bg-slate-900/60 rounded-lg p-3 flex flex-col items-center text-center">
                                                <p className="font-bold text-sm text-slate-100 mb-0.5">{job}</p>
                                                <p className="text-sm text-purple-300 font-semibold mb-2 leading-tight">{skill}</p>
                                                <div className="flex flex-col items-center gap-4 w-full">
                                                    {imgs.map((src, i) => {
                                                        const descParts = desc.split(' / ');
                                                        return (
                                                            <div key={i} className="flex flex-col items-center w-full">
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                <img
                                                                    src={src}
                                                                    alt={`${job} ${skill} ${i + 1}`}
                                                                    className="max-w-full h-auto rounded mx-auto"
                                                                />
                                                                {descParts[i] && (
                                                                    <p className="text-slate-400 text-xs mt-2 mb-3 leading-relaxed max-w-xl text-center">
                                                                        {descParts[i]}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* HEXA 스킬 강화 비용 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-purple-900/20 to-slate-900/50 border-2 border-purple-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400" />
                            <h2 className="text-xl sm:text-2xl font-bold text-purple-300">신규 HEXA 스킬 강화 비용 (1~30레벨)</h2>
                        </div>
                        <p className="text-sm text-slate-300 mb-5 leading-relaxed">
                            신규 HEXA 공통/직업별 스킬을 활성화하고 30레벨 마스터까지 강화하는 데 필요한 <span className="text-yellow-300 font-bold">솔 에르다</span> 및 <span className="text-purple-300 font-bold">솔 에르다 조각</span> 비용 표입니다.
                        </p>

                        {/* 요약 박스 */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 text-center">
                                <p className="text-xs text-slate-400 font-medium">총 필요 솔 에르다</p>
                                <p className="text-xl font-bold text-yellow-400 mt-1">135개</p>
                            </div>
                            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 text-center">
                                <p className="text-xs text-slate-400 font-medium">총 필요 솔 에르다 조각</p>
                                <p className="text-xl font-bold text-purple-400 mt-1">4,500개</p>
                            </div>
                        </div>

                        {/* 비용 테이블 */}
                        <div className="border border-slate-800 rounded-lg bg-slate-950/40">
                            <table className="w-full text-left border-collapse text-xs sm:text-sm">
                                <thead className="bg-slate-900 text-slate-300 sticky top-0 border-b border-slate-800">
                                    <tr>
                                        <th className="p-3 font-semibold">목표 레벨</th>
                                        <th className="p-3 font-semibold text-yellow-400">솔 에르다</th>
                                        <th className="p-3 font-semibold text-purple-400">솔 에르다 조각</th>
                                        <th className="p-3 font-semibold text-slate-400">누적 조각</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800 text-slate-200">
                                    {[
                                        { lv: 1, erda: 7, frag: 140, cum: 140, highlight: true },
                                        { lv: 2, erda: 1, frag: 25, cum: 165 },
                                        { lv: 3, erda: 1, frag: 30, cum: 195 },
                                        { lv: 4, erda: 1, frag: 35, cum: 230 },
                                        { lv: 5, erda: 2, frag: 40, cum: 270 },
                                        { lv: 6, erda: 2, frag: 45, cum: 315 },
                                        { lv: 7, erda: 2, frag: 50, cum: 365 },
                                        { lv: 8, erda: 3, frag: 55, cum: 420 },
                                        { lv: 9, erda: 3, frag: 60, cum: 480 },
                                        { lv: 10, erda: 9, frag: 170, cum: 650, highlight: true },
                                        { lv: 11, erda: 3, frag: 73, cum: 723 },
                                        { lv: 12, erda: 3, frag: 81, cum: 804 },
                                        { lv: 13, erda: 3, frag: 90, cum: 894 },
                                        { lv: 14, erda: 3, frag: 98, cum: 992 },
                                        { lv: 15, erda: 4, frag: 107, cum: 1099 },
                                        { lv: 16, erda: 4, frag: 115, cum: 1214 },
                                        { lv: 17, erda: 4, frag: 124, cum: 1338 },
                                        { lv: 18, erda: 4, frag: 132, cum: 1470 },
                                        { lv: 19, erda: 4, frag: 141, cum: 1611 },
                                        { lv: 20, erda: 13, frag: 300, cum: 1911, highlight: true },
                                        { lv: 21, erda: 4, frag: 151, cum: 2062 },
                                        { lv: 22, erda: 5, frag: 160, cum: 2222 },
                                        { lv: 23, erda: 5, frag: 170, cum: 2392 },
                                        { lv: 24, erda: 5, frag: 179, cum: 2571 },
                                        { lv: 25, erda: 5, frag: 189, cum: 2760 },
                                        { lv: 26, erda: 5, frag: 198, cum: 2958 },
                                        { lv: 27, erda: 5, frag: 208, cum: 3166 },
                                        { lv: 28, erda: 5, frag: 217, cum: 3383 },
                                        { lv: 29, erda: 6, frag: 227, cum: 3610 },
                                        { lv: 30, erda: 16, frag: 425, cum: 4500, highlight: true }
                                    ].map((row) => (
                                        <tr
                                            key={row.lv}
                                            className={`${
                                                row.highlight
                                                    ? 'bg-purple-950/40 border-y border-purple-500/30 hover:bg-purple-900/30 font-semibold'
                                                    : 'hover:bg-slate-900/30'
                                            } transition-colors`}
                                        >
                                            <td className="p-3">
                                                <div className="flex items-center gap-1.5">
                                                    <span>Lv.{row.lv}</span>
                                                    {row.highlight && (
                                                        <span className="px-1.5 py-0.5 bg-purple-500/30 text-purple-300 text-[10px] rounded-md font-bold uppercase tracking-wider">
                                                            구간
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-3 text-yellow-300 font-bold">{row.erda}</td>
                                            <td className="p-3 text-purple-300 font-bold">{row.frag}</td>
                                            <td className="p-3 text-slate-400">{row.cum}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>


                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* 스킬 수정 사항 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Zap className="w-7 h-7 sm:w-9 sm:h-9 text-yellow-400" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">스킬 수정 사항</h2>
                        </div>

                        <div className="space-y-4 text-xs sm:text-sm text-slate-200">
                            {/* 공통 */}
                            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base text-slate-100 mb-3">🔧 공통</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2"><span className="text-slate-400 shrink-0 mt-0.5">•</span><span>캐릭터 정보의 스탯 공격력 설명이 변경됩니다.</span></li>
                                    <li className="flex items-start gap-2"><span className="text-slate-400 shrink-0 mt-0.5">•</span><span><span className="text-yellow-300 font-semibold">루나 게더링</span>: 펫의 아이템 줍기 스킬 사용이 불가능한 맵에서 사용 가능한 현상이 수정됩니다.</span></li>
                                    <li className="flex items-start gap-2"><span className="text-red-400 shrink-0 mt-0.5">▼</span><span><span className="text-yellow-300 font-semibold">솔 헤카테 : 스틱스</span> 행동 불가 적용 후 저항 시간 <span className="text-red-400 font-bold">47초 → 39초</span>로 감소됩니다.</span></li>
                                    <li className="flex items-start gap-2"><span className="text-red-400 shrink-0 mt-0.5">▼</span>
                                        <div><span><span className="text-yellow-300 font-semibold">일부 특수 코어</span> 재발동 대기시간이 <span className="text-red-400 font-bold">120초</span>로 변경됩니다.</span>
                                        <p className="text-slate-400 text-xs mt-1">해당 코어: 폭주하는 힘 I · 치명적인 일격 I · 방어구 부수기 I/II · 보스 슬레이어 I/II/III · 컴백 · 끊임없는 공격 · 자동회복 · 견뎌내기/II · 한놈만 I · 근성 I · 일격필살 I · 반격 I</p></div>
                                    </li>
                                    <li className="flex items-start gap-2"><span className="text-slate-400 shrink-0 mt-0.5">•</span><span><span className="text-yellow-300 font-semibold">근성 I</span>: 아이콘이 수정됩니다.</span></li>
                                    <li className="flex items-start gap-2"><span className="text-green-400 shrink-0 mt-0.5">▲</span><span><span className="text-yellow-300 font-semibold">그란디스 여신의 축복</span>: 노바의 재사용 대기시간 미적용 확률이 <span className="text-green-400 font-bold">100%</span>로 변경됩니다.</span></li>
                                    <li className="flex items-start gap-2"><span className="text-slate-400 shrink-0 mt-0.5">•</span><span><span className="text-yellow-300 font-semibold">화중군자 / 화중군자 VI</span>: 네트워크 상태에 따라 여러 번 부활 가능한 현상이 수정됩니다.</span></li>
                                </ul>
                            </div>

                            {/* 직업별 */}
                            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-base text-slate-100 mb-4">⚔️ 직업별 수정 사항</h3>
                                
                                {/* 1. 주요 밸런스 패치 및 버프 (기본 노출) */}
                                <div className="space-y-4 mb-6">
                                    <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2">💡 주요 밸런스 조정 및 버프</h4>
                                    
                                    <div className="border-l-2 border-green-500 pl-3">
                                        <p className="font-bold text-green-300">신궁 <span className="text-xs font-normal text-green-400 ml-1">🎉 버프</span></p>
                                        <ul className="text-slate-300 space-y-0.5 mt-1 text-xs sm:text-sm">
                                            <li>• 스플릿 애로우 버프 지속 시간: <span className="text-green-400 font-bold">72초 → 120초</span></li>
                                            <li>• 스플릿 애로우 추가 공격 최대 횟수: <span className="text-green-400 font-bold">140회</span> 발동 가능</li>
                                            <li>• 스플릿 애로우 추가 공격 데미지: <span className="text-green-400 font-bold">1302% → 1631%</span></li>
                                        </ul>
                                    </div>

                                    <div className="border-l-2 border-orange-500 pl-3">
                                        <p className="font-bold text-orange-300">미하일 <span className="text-xs font-normal text-green-400 ml-1">🎉 버프</span></p>
                                        <ul className="text-slate-300 space-y-0.5 mt-1 text-xs sm:text-sm">
                                            <li>• 로얄 가드 / 로얄 가드 VI: 공격력 증가 버프 지속 시간 <span className="text-green-400 font-bold">20초 → 60초</span></li>
                                        </ul>
                                    </div>

                                    <div className="border-l-2 border-pink-500 pl-3">
                                        <p className="font-bold text-pink-300">메르세데스 <span className="text-xs font-normal text-green-400 ml-1">🎉 연계 버프</span></p>
                                        <ul className="text-slate-300 space-y-0.5 mt-1 text-xs sm:text-sm">
                                            <li>• <span className="text-green-400 font-semibold">리프 토네이도 VI / 거스트 다이브 VI</span>: 패시브 효과로 <span className="text-green-400 font-bold">베리안 서지의 데미지가 증가</span>하는 기능이 추가됩니다.</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-2 border-cyan-500 pl-3">
                                        <p className="font-bold text-cyan-300">배틀메이지 <span className="text-xs font-normal text-amber-400 ml-1">⚡ 조정</span></p>
                                        <ul className="text-slate-300 space-y-0.5 mt-1 text-xs sm:text-sm">
                                            <li>• 어비셜 라이트닝: 명계의 번개 최대 발동 횟수 제한이 추가됩니다.</li>
                                            <li>• 어비셜 라이트닝: 명계의 번개 데미지 <span className="text-green-400 font-bold">1650% → 1980%</span></li>
                                        </ul>
                                    </div>

                                    <div className="border-l-2 border-pink-500 pl-3">
                                        <p className="font-bold text-pink-300">카인 <span className="text-xs font-normal text-green-400 ml-1">🎉 버프</span></p>
                                        <ul className="text-slate-300 space-y-0.5 mt-1 text-xs sm:text-sm">
                                            <li>• [발현] 스트라이크 애로우 / VI: 재발현 대기시간이 <span className="text-green-400 font-bold">삭제</span>됩니다.</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-2 border-green-500 pl-3">
                                        <p className="font-bold text-green-300">라라 <span className="text-xs font-normal text-green-400 ml-1">🔧 개선</span></p>
                                        <ul className="text-slate-300 space-y-0.5 mt-1 text-xs sm:text-sm">
                                            <li>• 아름드리 나무: <span className="text-green-400 font-semibold">맵 이동 시에도 버프가 유지</span>되도록 수정되며 영역이 삭제됩니다.</li>
                                        </ul>
                                    </div>

                                    <div className="border-l-2 border-red-500 pl-3">
                                        <p className="font-bold text-red-300">레테 <span className="text-xs font-normal text-amber-400 ml-1">⚡ 수치 조정</span></p>
                                        <ul className="text-slate-300 space-y-0.5 mt-1 text-xs sm:text-sm">
                                            <li>• 인보크 : 바르가르 데미지: <span className="text-green-400 font-bold">143% → 204%</span> ▲</li>
                                            <li>• 인보크 : 바르가르 VI 데미지: <span className="text-green-400 font-bold">242% → 346%</span> ▲</li>
                                            <li>• 인보크 : 템플러 / II: 데미지 공식이 변경됩니다. <span className="text-amber-400 font-bold">⚡</span></li>
                                            <li>• 오버로드 : 템플러 온슬로트 / 바르가르 트라이던트 / 아즈라스: 사용 시 액션 딜레이만큼 임펠 효과가 적용되도록 변경됩니다. <span className="text-green-400 font-bold">▲ 개선</span></li>
                                            <li>• 인보크 : 바르가르 강화 최종뎀: <span className="text-red-400 font-bold">300% → 180%</span> ▼</li>
                                            <li>• 임프린트 VI 돌진 데미지: <span className="text-red-400 font-bold">264% → 237%</span> ▼</li>
                                            <li>• 이딕트 : 램페이지 일반몹 데미지: <span className="text-red-400 font-bold">241%p → 210%p</span> ▼</li>
                                            <li>• 인보크 : 바르가르 VI 일반몹 데미지: <span className="text-red-400 font-bold">543%p → 491%p</span> ▼</li>
                                            <li>• 드라이브 / 임펠 / 임펠 VI: 공속 효과가 별도 버프 아이콘으로 표기됩니다.</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* 2. 버그 수정 및 기타 현상 수정 (상세 접기/펼치기 아코디언) */}
                                <details className="group border-t border-slate-700/60 pt-4">
                                    <summary className="flex items-center justify-between cursor-pointer list-none text-slate-400 hover:text-slate-300 transition-colors">
                                        <span className="text-xs font-bold uppercase tracking-wider">🔧 기타 오류 수정 및 스킬 설명 변경 내역</span>
                                        <span className="text-xs font-semibold px-2 py-0.5 bg-slate-800 rounded group-open:hidden">펼치기</span>
                                        <span className="text-xs font-semibold px-2 py-0.5 bg-slate-800 rounded hidden group-open:block">접기</span>
                                    </summary>
                                    
                                    <div className="space-y-3 mt-4 pt-2 border-t border-slate-800/50">
                                        {[
                                            { job: '다크나이트', items: ['비홀더스 퍼니시먼트: 이펙트가 변경됩니다.', '비홀더 쇼크 VI: 스킬 설명이 변경됩니다.'] },
                                            { job: '아크메이지(썬,콜)', items: ['크라이오 쇼크: 타격 이펙트가 다른 캐릭터에게 어색하게 보이는 현상이 수정됩니다.'] },
                                            { job: '보우마스터', items: ['애로우 레인: 가끔 몬스터가 없는 위치에 화살이 쏟아지는 영역이 생성되는 현상이 수정됩니다.'] },
                                            { job: '나이트로드', items: ['스로우 블래스팅: 패시브 효과 발동 시 다른 캐릭터에게 어색하게 보이는 현상이 수정됩니다.'] },
                                            { job: '섀도어', items: [
                                                '절개: 타격 이펙트가 가끔 다른 캐릭터에게 어색하게 보이는 현상이 수정됩니다.',
                                                '쉐도우 어썰트: 연무장 스킬 내역 UI에 사용 횟수가 실제와 다르게 표시되는 현상이 수정됩니다.',
                                                '커버트 쉐도우: 추가타 및 쉐도우 엣지의 타격 이펙트가 어색하게 보이는 현상이 수정됩니다.'
                                            ] },
                                            { job: '바이퍼', items: ['씨 서펜트 인레이지 / VI: 스킬 설명이 수정됩니다.'] },
                                            { job: '캐논슈터', items: ['미니 캐논볼: 자동 사용 모드에서 캐논 바주카 VI가 적중해도 사용되지 않는 현상이 수정됩니다.'] },
                                            { job: '소울마스터', items: ['코스믹 버스트 / VI: 스킬 설명이 수정됩니다.'] },
                                            { job: '나이트워커', items: ['쉐도우 스티치: 행동 불가 효과 종료 이후에도 이펙트가 지속되는 현상이 수정됩니다.'] },
                                            { job: '아란', items: ['프로스트 블러스터: 스킬 사용 후 비욘더 시전 시 가끔 빙결참이 늦게 발동하는 현상이 수정됩니다.'] },
                                            { job: '에반', items: [
                                                '조디악 레이: 솔 헤카테의 솔 에르다 입자로 마법진에 마력이 충전되는 현상이 수정됩니다.',
                                                '조디악 레이: 솔 헤카테 : 스틱스 / 플레게톤 시전 시 마법진에 마력이 각각 1 충전되도록 수정됩니다.'
                                            ] },
                                            { job: '루미너스', items: [
                                                '진리의 문: 스킬 알림이에 등록 가능한 현상이 수정됩니다.',
                                                '진리의 문: 시전 시 이퀄리브리엄 리버레이션의 캐릭터 이펙트가 출력되는 현상이 수정됩니다.'
                                            ] },
                                            { job: '메르세데스', items: [
                                                '파이널 어택 / 어드밴스드 파이널 어택 / VI: 가끔 연속 공격에 발동되지 않는 현상이 수정됩니다.',
                                                '레전드리 스피어 / 래쓰 오브 엔릴 / VI: 스킬 설명이 수정됩니다.'
                                            ] },
                                            { job: '와일드헌터', items: ['비스트 폼: 스킬 사용 시 재규어가 어색하게 보이는 현상이 수정됩니다.'] },
                                            { job: '데몬 슬레이어', items: ['메타모포시스 VI: 자쿰에서 마기 이펙트 크기 및 출력 관련 현상이 수정됩니다.'] },
                                            { job: '일리움', items: ['커스 마크 완성 VI: 발동 시 다른 캐릭터에게 동작이 어색하게 보이는 현상이 수정됩니다.'] },
                                            { job: '칼리', items: ['보이드 러쉬 / VI: 림보에서 스틸 모드 사용 시 아래 방향키와 함께 스킬을 사용할 수 없는 현상이 수정됩니다.'] },
                                            { job: '라라', items: ['아름드리 나무: 스킬 설명이 수정됩니다.'] },
                                            { job: '레테', items: [
                                                '텔레포트: 다른 캐릭터에게 이펙트가 어색하게 보이는 현상이 수정됩니다.',
                                                '레비테이트: 발판에 닿은 경우 체공이 종료되지 않는 현상이 수정됩니다.',
                                                '체인 커맨드: 맹약 완성 후 쿨타임 초기화 및 메이린 맹약 완성 발동 버그 수정'
                                            ] }
                                        ].map(({ job, items }) => (
                                            <div key={job} className="border-l border-slate-700/60 pl-3">
                                                <p className="font-bold text-slate-300 text-xs sm:text-sm">{job}</p>
                                                <ul className="text-slate-400 space-y-0.5 mt-1 text-xs">{items.map(i => <li key={i}>• {i}</li>)}</ul>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* 연무장 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Star className="w-7 h-7 sm:w-9 sm:h-9 text-orange-400" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400">연무장</h2>
                        </div>
                        <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                            <div className="bg-orange-900/20 border border-orange-500/40 rounded-lg p-3">
                                <p className="font-bold text-orange-200 mb-2">🔄 리플레이 초기화 & 보상</p>
                                <ul className="space-y-1.5">
                                    <li>• 등록된 리플레이 및 리플레이 추천 권한이 초기화됩니다.</li>
                                    <li>• 7월 23일 업데이트 시점 기준, 직업별 추천 수 1위 리플레이를 등록한 캐릭터에게 <span className="text-yellow-400 font-bold">10만 메이플포인트 교환권</span>이 지급됩니다.</li>
                                    <li className="text-slate-400">※ 메이플 보관함 지급 / 8월 20일(목) 오전 2시까지 수령 및 사용 가능</li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-3">
                                <p className="font-bold text-slate-200 mb-1.5">📅 운영 기간 변경</p>
                                <p className="text-slate-300"><span className="text-green-300 font-semibold">2026년 8월 6일(목) 0시 ~ 8월 19일(수) 23:59</span></p>
                                <p className="text-slate-400 text-xs mt-1">※ 테스트월드 운영 기간: 7월 9일(목) 점검 후 ~ 7월 22일(수) 23:59</p>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-3">
                                <p className="font-bold text-slate-200 mb-1">🐛 버그 수정</p>
                                <p className="text-slate-300">잔영의 전당 리플레이 키 입력 UI에서 사용할 수 없는 스킬 아이콘이 비활성화되지 않는 현상이 수정됩니다.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 기타 변경사항 */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-600 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-7 h-7 sm:w-9 sm:h-9 text-slate-300" />
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-200">기타 변경사항</h2>
                        </div>
                        <div className="space-y-3 text-xs sm:text-sm">
                            <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border border-yellow-500/50 rounded-lg p-3 sm:p-4">
                                <h3 className="font-bold text-yellow-300 mb-1.5">💥 최대 데미지 제한 변경</h3>
                                <p className="text-2xl font-black text-white">7,000억 → <span className="text-yellow-400">10조</span></p>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4 text-slate-200">
                                <h3 className="font-bold text-slate-100 mb-2">👹 몬스터 수정</h3>
                                <p className="text-slate-300">보스 몬스터에게 행동 불가 / 절대 행동 불가 / 솔 헤카테 : 스틱스의 행동 불가 상태 이상 적용 시, 일부 필드에서 발생하는 패턴이 발생하지 않도록 변경됩니다.</p>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4 text-slate-200">
                                <h3 className="font-bold text-slate-100 mb-2">📦 아이템 수정</h3>
                                <ul className="space-y-1 text-slate-300">
                                    <li>• 알레리아의 영약 버프 소모 후 재접속 시 가끔 버프 아이콘이 출력되는 현상이 수정됩니다.</li>
                                    <li>• 소울마스터가 일루전 링 착용 후 라이징 선 또는 폴링문 상태일 때 공격 동작을 취하는 현상이 수정됩니다.</li>
                                    <li>• 일부 유닛 데미지 스킨 및 한글 데미지 스킨 아이템의 툴팁 이미지가 수정됩니다.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 공식 패치노트 링크 */}
                <section className="mb-8 sm:mb-12">
                    <a href="https://maplestory.nexon.com/news/testworld" target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-500/60 hover:border-purple-400/60 rounded-xl p-4 sm:p-5 transition-all group">
                        <div>
                            <p className="font-bold text-white text-sm sm:text-base group-hover:text-purple-300 transition-colors">📋 공식 테스트월드 패치노트 전문 보기</p>
                            <p className="text-slate-400 text-xs sm:text-sm mt-1">넥슨 공식 테스트월드 페이지에서 원문을 확인할 수 있습니다.</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-purple-300 transition-colors shrink-0 ml-3" />
                    </a>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-8 sm:my-12" />

                {/* CTA */}
                <section className="mb-8 sm:mb-12">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-xl p-4 sm:p-6 md:p-8 text-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3">내 직업 HEXA 스킬 투자 우선순위가 궁금하다면?</h3>
                        <p className="text-sm sm:text-base text-slate-300 mb-5">직업별 HEXA 스킬 투자 우선순위 가이드를 확인해 보세요.</p>
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
