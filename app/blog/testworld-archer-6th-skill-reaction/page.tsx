'use client';

import Link from 'next/link';
import { Calendar, ArrowLeft, AlertTriangle, CheckCircle, TrendingDown, Flame, Minus, Info, MessageSquare, Swords, Shield } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

// 궁수 직업별 평가 데이터 (검증된 인벤 실측 데이터 기반)
const jobReactions = [
    {
        job: '보우마스터',
        skill: '아이 오브 아퀼라',
        sentiment: 'negative',
        sentimentLabel: '불만 우세 (딜 구조 불일치 및 이펙트 불호)',
        colorClass: 'text-green-300',
        bgClass: 'bg-green-950/40',
        borderClass: 'border-green-700/60',
        headerBg: 'bg-green-900/30',
        icon: '/images/testworld-203/w_스킬_3141505보우마스터(6차)_추가.png',
        dilRate: '',
        keyIssue: "보마 자동 사출/자동 스택 구조에 반하는 30초 수동 액티브 설계 및 폭풍의 시 시전 중 작동 불가",
        posts: [
            '보마 신규 6차 개선 기원 최종 모음!!건의 한번씩만 부탁드립니다!',
            '뚱딴지같은 30초 액티브 스킬은 보마의 딜컨셉과 안 어울림',
            '디자인팀에 오징어 딜도 쓰는 새끼 있냐?? 이펙트 진짜 ㅋㅋㅋ',
            '준극도 아닌 30초보단 구조를 망치지 않는 10초 짧쿨 자동사출기가 베스트',
            '신스킬은 폭풍의 시(폭시) 사용 도중 시전할 수 있게 개선해야 함',
        ],
        summary: <>
            보마의 오랜 상징인 <strong>&lsquo;편리한 자동 사출 및 자동 스택 딜 구조&rsquo;</strong>에 반하는 30초 수동 액티브 스킬 작동 방식과 <strong>스킬 이펙트 비주얼(오징어 연상)</strong>에 대한 유저들의 불만이 높은 상황입니다. 특히 유저들 사이에서 가장 큰 불만으로 지적되는 핵심은 <strong>폭풍의 시(폭시) 사용 도중 즉시 시전이 가능하도록 모션을 개선하는 것</strong>과 기존 보마의 자동 사출 및 자동 스택 구조에 맞게 <strong>엑스트라 퀴버처럼 폭시 도중 자동 사출되는 10초 주기의 자동 사출 패시브화</strong> 혹은 기존 딜 구조를 망치지 않고 부실한 준극을 보완해줄 수 있는 <strong>60초 주기 준극기로의 재설계</strong> 등 다양한 건의가 이뤄지고 있습니다.
            <div className="mt-4 pt-3 border-t border-green-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2296/183962" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-green-300 hover:text-green-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>키네상하차님의 보마 신규 6차 개선 기원 최종 모음 글 바로가기</span>
                </a>
            </div>
        </>,
    },
    {
        job: '신궁',
        skill: '리썰 퍼니셔',
        sentiment: 'positive',
        sentimentLabel: '호평 우세 (스플릿 압축 및 딜 체감)',
        colorClass: 'text-emerald-300',
        bgClass: 'bg-emerald-950/40',
        borderClass: 'border-emerald-700/60',
        headerBg: 'bg-emerald-900/30',
        icon: '/images/testworld-203/w_스킬_3241504신궁(6차)_추가.png',
        keyIssue: "스플릿 애로우 개선 패치로 인한 호평과 다른 문제점들 개선 요구",
        posts: [
            '드디어 스플릿 압축됐다는 소식 듣고 복귀했습니다 ㅋㅋㅋ',
            '신스킬은 2분 극딜기치고 무난한데 스플릿 30초 압축이 진짜 고트 패치',
            '볼트 모두 소모 시 후속타가 수동이 아니라 자동으로 나가게 해줘야 함',
            '스나이핑 후딜이 은근 빡센데 이동기나 후딜 조금만 더 만져줬으면',
            '신스킬 터지는 이펙트가 너무 듀블같아서 조금 슴슴하네요',
        ],
        summary: <>
            신스킬 &lsquo;리썰 퍼니셔&rsquo; + <strong>신궁의 오랜 숙원이었던 &lsquo;스플릿 애로우&rsquo;의 극딜 압축 패치</strong>가 진행되면서, 그나마 신궁에 대한 개선의지가 보인다고 분위기가 나쁘지 않은 상황입니다. 다만, 편의성 면에서 <strong>볼트 탄창을 모두 소모했을 때 피니시 후속타가 수동 입력이 아닌 자동으로 즉시 사출</strong>되도록 변경해 달라는 요구가 높으며, 트루 스나이핑 마우스 조작 삭제 및 개선과 스나이핑 고유의 후딜레이 완화 등 신궁의 근본 문제점들에 대한 보강 패치를 원하는 목소리도 높습니다.
            <div className="mt-4 pt-3 border-t border-emerald-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2296/183707" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-emerald-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>나감나감님의 신궁 스플릿 압축 패치 분석글 바로가기</span>
                </a>
            </div>
        </>,
    },
    {
        job: '윈드브레이커',
        skill: '실프스 브레스',
        sentiment: 'negative',
        sentimentLabel: '불만 우세 (준극 조작 피로도 및 버그)',
        colorClass: 'text-cyan-300',
        bgClass: 'bg-cyan-950/40',
        borderClass: 'border-cyan-700/60',
        headerBg: 'bg-cyan-900/30',
        icon: '/images/testworld-203/w_스킬_13141508윈드브레이커(6차)_추가.png',
        dilRate: '',
        keyIssue: "신규 스킬 자체는 호평이 있음 그 외에 문제 개선 요구",
        posts: [
            '하울링 게일 압축은 끝끝내 안 해주는 거 실화냐...',
            '아네모이 딜 스킬이라 시퀀스 안 들어가는 거 너무 피곤함',
            '천공의 노래 시전 중에 볼텍스 팔랑크스 사용 가능하게 롤백해라',
            '실브 딜 상승량 계산해봤는데 풀강 3.28% 개방 0.85% 수준',
            '특코 120초 패치로 스위칭 차단당해서 실질적 딜상승 더 낮을 듯',
        ],
        summary: <>
            신규 6차 스킬 이펙트에 대한 긍정적인 평가는 많은 편입니다. <strong>신규 스킬 실프스 브레스(실브)의 딜 상승량 기댓값이 풀강 시 약 3.28%, 개방 시 약 0.85% 수준</strong>으로 딜 상승이 된다는 분석글이 있습니다. 하지만 120초 특수 코어(특코) 쿨타임 패치가 단행되어 <strong>특코 스위칭 플레이가 차단</strong>되면서, 특코 스위칭 플레이를 하는 유저들은 딜 상승이 더 낮을 것으로 예상됩니다. 또한 테스트 서버 상에서 <strong>팔랑크스의 스브 사출 오류 버그가 관측</strong>되고 있습니다. 더불어 준극딜에 눌러야 할 키가 많은 편이기 때문에 <strong>아네모이라도 시퀀스가 되도록</strong> 해달라는 요구가 많습니다.
            <div className="mt-4 pt-3 border-t border-cyan-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2296/183775" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>비에젖은눈물님의 윈브 신규 스킬 코어 계산 및 오류 지적 바로가기</span>
                </a>
            </div>
        </>,
    },
    {
        job: '와일드헌터',
        skill: '레조넌스 : 와일드 피어스',
        sentiment: 'negative',
        sentimentLabel: '불만 우세 (40초 주기 엇박자)',
        colorClass: 'text-orange-300',
        bgClass: 'bg-orange-950/40',
        borderClass: 'border-orange-700/60',
        headerBg: 'bg-orange-900/30',
        icon: '/images/testworld-203/w_스킬_33141502와일드헌터(6차)_추가.png',
        keyIssue: "120초 직업에 40초 쿨타임 스킬 추가로 인한 극딜 주기 엇박자",
        posts: [
            '운영진들아....이거만 해줘....',
            '설마 신6차 2차테섭때도 그대로지는 않겠지',
            '스킬 감다살로 좀 만들었으면...',
            '40초는 머지...',
            '신스킬은 120초(시퀀스 가능), 자동사출',
        ],
        summary: <>
            와일드헌터는 120초 극딜 직업인데도 <strong>신규 스킬의 쿨타임이 40초로 엇박자로 설계되어</strong> 극딜/준극딜 타이밍과 정렬되지 않는 문제에 목소리를 높이고 있습니다. 유저들은 특히 주력 속사기인 <strong>&lsquo;와일드 발칸&rsquo; 시전 중에도 끊김 없이 신스킬을 사용할 수 있도록 개선</strong>할 것과, 엇박자 40초 주기 대신 <strong>기존 커맨드 연동이나 60초/120초 주기로 정렬(어려울 시 자동 사출화)</strong>할 것을 강하게 건의하고 있습니다.
            <div className="mt-4 pt-3 border-t border-orange-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2296/184260" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-orange-300 hover:text-orange-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>괜찮나요님의 와헌 신규 6차 조작감 개선 건의글 바로가기</span>
                </a>
            </div>
        </>,
    },
    {
        job: '메르세데스',
        skill: '베리안 서지',
        sentiment: 'critical',
        sentimentLabel: '극심한 불만 (기형적 연계 강제 및 조작 피로도)',
        colorClass: 'text-pink-300',
        bgClass: 'bg-pink-950/40',
        borderClass: 'border-pink-700/60',
        headerBg: 'bg-pink-900/30',
        icon: '/images/testworld-203/w_스킬_23141506메르세데스(6차)_추가.png',
        keyIssue: "속사기 메타 속 기형적인 연계 강제 및 신스킬의 쿨뚝 의존 조작감 악화",
        posts: [
            '고인메르호 정상화 건의안 1일차',
            '메르는 속사캐릭이다.',
            '단추 자체를 잘못끼웠는데 왜 계속 밀고 나가냐고',
            '메르세데스 신규 6차 스킬 건의 3일차',
            '어떻게 될지는 모르겠는데 일단 건의는 넣습니다',
        ],
        summary: <>
            평딜 타임에 주력 속사기인 &lsquo;이슈타르의 링&rsquo; 대신 <strong>조작 리스크가 극심한 연계 스킬 사용을 노골적으로 강제하려는 설계 방향성</strong>에 대해 유저들의 불만이 거세게 일고 있습니다. 특히 억지 연계로 인해 <strong>강제 대각 이동 및 점프가 강요되며 생존 안정성이 매우 낮고</strong>, 신스킬 &lsquo;베리안 서지&rsquo; 또한 연계 도중의 회피를 차단하여 생존 안정성 문제를 심화시키는 데다 <strong>2초 이상의 쿨뚝(쿨타임 감소 모자)이 강제되는 기형적 구조</strong>를 가졌다고 혹평했습니다. 이에 유저들은 베리안 서지를 <strong>사출기나 즉발 극딜기로 개편</strong>할 것을 강력하게 요구하고 있습니다. 더불어 연계에 대한 매끄러운 개편이 없다면 <strong>아예 연계 스킬 삭제를 요구</strong>하는 등 다양한 건의안들이 나오고 있는 상황입니다.
            <div className="mt-4 pt-3 border-t border-pink-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2296/183820" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-pink-300 hover:text-pink-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>메르최지님의 고인메르호 정상화 건의안 1일차 바로가기</span>
                </a>
            </div>
        </>,
    },
    {
        job: '패스파인더',
        skill: '마테리얼 버스트',
        sentiment: 'negative',
        sentimentLabel: '불만 우세 (게이지 과소모 및 제자리 고정 공격)',
        colorClass: 'text-purple-300',
        bgClass: 'bg-purple-950/40',
        borderClass: 'border-purple-700/60',
        headerBg: 'bg-purple-900/30',
        icon: '/images/testworld-203/w_스킬_3341506패스파인더(6차)_추가.png',
        dilRate: '',
        keyIssue: "과도한 게이지 소모 및 제자리 고정 공격 구조에 따른 실전 딜 누수 우려",
        posts: [
            '프라임 문의 결과',
            '신규 6차 참담한 심정..',
            '이제 문양 의미도 없는데 블디 속사기화 언제 해줌?',
            '블디 땅박이에 신스킬 땅박이는 기싸움하자는거임?',
            '키다운보단 차라리 쁘띠 얼블이 나을듯',
        ],
        summary: <>
            패파는 신규 스킬에 대한 <strong>타격감과 이펙트에 대한 부분은 긍정적으로 보는 분들</strong>도 있습니다. 하지만 <strong>게이지를 소모하면서 사용하는 쿨타임 없는 스킬에 대한 부정적 의견이 대부분</strong>입니다. 신스킬 데미지 증가와 별개로 아예 <strong>블+디 평딜 개선의 필요성(속사기화/스킬 하나는 사출기화)</strong>, 콤보 어썰트와 레조넌스(콤레) 같은 게이지 소모해도 <strong>적당한 쿨달린 누킹기 방향</strong>, 스킬은 그대로 두고 <strong>60초 1~2초 키다운 준극으로 가는 방향</strong>, <strong>일정 시간 게이지 풀충</strong> 등 다양한 건의 방향성이 제시되고 있습니다. 아울러 신규 스킬 구조 자체도 <strong>과도한 게이지 소모와 더불어 제자리 고정 구조</strong>이기 때문에 이에 대한 개선도 요구되고 있습니다.
            <div className="mt-4 pt-3 border-t border-purple-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2296/184194" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-purple-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>홍사단님의 패파 신규 6차 프라임 문의 결과 바로가기</span>
                </a>
            </div>
        </>,
    },
    {
        job: '카인',
        skill: '[발현] 스트라이크 임팩트 / [처형] 팬텀 레퀴엠',
        sentiment: 'positive',
        sentimentLabel: '호평 우세 (딜량 준수하나 스택 및 알람 편의성 보완 요구)',
        colorClass: 'text-rose-300',
        bgClass: 'bg-rose-950/40',
        borderClass: 'border-rose-700/60',
        headerBg: 'bg-rose-900/30',
        icon: [
            '/images/testworld-203/w_스킬_63141509카인(6차)_추가.png',
            '/images/testworld-203/w_스킬_63141514카인(6차)_추가.png',
        ],
        dilRate: '',
        keyIssue: "그여축 초기화 및 2스택 시너지 대환영, 단 스택 피로도 및 쿨타임 알람 개선 요구",
        posts: [
            '일단 괜찮게 받은것같긴한데',
            '신스킬 발현 처형 스택량이 달라서 극딜 때 스택 계산이 너무 꼬임',
            '버스트 키다운 도중에 판테온 무적이 켜지도록 연계 지원해 줘',
            '입장할 때 켜야 하는 온오프 버프들 패시브나 상시화 해줄 때 됐다',
            '재사용 언제 털어야 최고 효율 나오는지 연구 공유합니다',
        ],
        summary: <>
            비주얼 및 딜 포텐셜 자체는 다른 직업군에 비해 <strong>상당히 준수하고 자연스럽게 받았다</strong>는 안도감과 호평이 공존합니다. <strong>그여축(그란디스 여신 축복) 확정 초기화 패치도 큰 환영</strong>을 받았으며, 특히 <strong>폴링 더스트와 포이즌 니들의 시너지를 고려할 때 발현과 처형을 2스택씩 활성화해 주는 기능</strong>만으로도 긍정적인 평가가 있습니다. 짧은 쿨타임 스킬치고 <strong>이펙트가 훌륭하고 자체 퍼뎀(퍼센트 데미지) 점유율도 타직업에 비해 괜찮다</strong>는 실측 의견이 제시되었습니다. 다만, <strong>신규 6차 스킬의 발현 단계와 처형 단계의 스택 요구 및 수급량이 일치하지 않아 극딜 연계 시 스택 계산 피로도가 있을 것 같다는 피드백</strong>이 있습니다. 그 외에 <strong>쿨 돌았는지만 확인을 편하게 할 수 있게 최소한 알람등록이라도 가능하게 해달라는 의견</strong>도 있었습니다.
            <div className="mt-4 pt-3 border-t border-rose-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2296/183643" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-rose-300 hover:text-rose-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Temicysjma님의 카인 신스킬 시너지 분석글 바로가기</span>
                </a>
            </div>
        </>,
    }
];

const getSentimentIcon = (sentiment: string) => {
    if (sentiment === 'positive') return <CheckCircle className="w-3.5 h-3.5" />;
    if (sentiment === 'mixed') return <Minus className="w-3.5 h-3.5" />;
    if (sentiment === 'negative') return <TrendingDown className="w-3.5 h-3.5" />;
    if (sentiment === 'critical') return <Flame className="w-3.5 h-3.5" />;
    return null;
};

const getSentimentBadgeClass = (sentiment: string) => {
    if (sentiment === 'positive') return 'bg-green-500/20 text-green-200 border-green-500/50';
    if (sentiment === 'mixed') return 'bg-yellow-500/20 text-yellow-200 border-yellow-500/50';
    if (sentiment === 'negative') return 'bg-orange-500/20 text-orange-200 border-orange-500/50';
    if (sentiment === 'critical') return 'bg-red-500/20 text-red-200 border-red-500/50';
    return '';
};

export default function ArcherSkillReactionPage() {
    return (
        <div className="min-h-screen bg-[#07140e] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 pb-24 font-sans leading-relaxed">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-emerald-950/20 rounded-full blur-[140px] pointer-events-none z-0"></div>
            <div className="fixed bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-950/15 rounded-full blur-[100px] pointer-events-none z-0"></div>

            {/* Header */}
            <header className="w-full max-w-7xl flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-[#07140e]/90 backdrop-blur-md border-b border-emerald-900/60 mx-auto">
                <Link prefetch={false} href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-emerald-300 font-semibold group">
                    <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                    <span>블로그 홈으로</span>
                </Link>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">
                {/* Title Section */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold bg-emerald-900/30 text-emerald-200 border border-emerald-500/40 rounded-full">
                            <Calendar className="w-3.5 h-3.5 text-emerald-300" />
                            2026년 7월 9일
                        </span>
                        <span className="px-3.5 py-1 text-xs font-bold bg-teal-950/40 text-teal-200 border border-teal-500/30 rounded-full">
                            테섭 1차 긴급 분석
                        </span>
                        <span className="px-3.5 py-1 text-xs font-bold bg-slate-800/60 text-slate-200 border border-slate-700/40 rounded-full">
                            인벤 직업 게시판 분석
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight break-keep">
                        <span className="block text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-1">
                            【1차 테섭 긴급 분석】
                        </span>
                        <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
                            궁수 직업군 신규 6차 스킬,
                        </span>
                        <span className="block text-white font-bold">
                            유저들은 어떻게 반응했나?
                        </span>
                    </h1>

                    <p className="text-base md:text-lg text-slate-200 mb-8 leading-relaxed break-keep border-l-4 border-emerald-500 pl-5 py-3 bg-emerald-950/30 rounded-r-lg">
                        2026년 7월 9일 오후 4시, 테스트서버 1.2.203 업데이트와 함께 전 직업 신규 6차 스킬이 공개되었습니다.
                        궁수 7개 직업의 인벤 직업 게시판의 여론을 취합하여 분석했습니다.
                    </p>

                    {/* 분석 범위 안내 */}
                    <div className="bg-slate-900/60 border border-emerald-900/40 rounded-2xl p-5 backdrop-blur-sm mb-8">
                        <p className="text-sm font-bold text-slate-100 mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4 text-emerald-300" />
                            분석 범위 안내
                        </p>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            1차 테스트월드 기준 신규 6차 스킬의 <strong className="text-slate-100">딜 점유율은 전반적으로 낮다는 평가</strong>가 많습니다.
                            다만 이는 직업 전체에 공통 사항이므로 별도 항목으로 다루지 않았으며,
                            본 분석에서는 <strong className="text-slate-100">신규 스킬의 설계·조작감·연계성</strong>과
                            <strong className="text-slate-100"> 직업별 고유 이슈</strong>에 대한 유저 반응을 중심으로 정리했습니다.
                        </p>
                    </div>

                    {/* 전체 분위기 한눈에 보기 */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                        <div className="bg-red-950/40 border border-red-900/50 rounded-xl p-4 text-center shadow-lg">
                            <div className="text-2xl font-black text-red-400 mb-1">1개</div>
                            <div className="text-xs text-slate-300 mb-1 font-medium">극심한 불만</div>
                            <div className="text-[10px] text-red-300">메르세데스</div>
                        </div>
                        <div className="bg-orange-950/40 border border-orange-900/50 rounded-xl p-4 text-center shadow-lg">
                            <div className="text-2xl font-black text-orange-400 mb-1">4개</div>
                            <div className="text-xs text-slate-300 mb-1 font-medium">불만 우세</div>
                            <div className="text-[10px] text-orange-300 leading-tight">보마, 윈브, 와헌,<br />패파</div>
                        </div>
                        <div className="bg-emerald-950/40 border border-emerald-900/50 rounded-xl p-4 text-center shadow-lg">
                            <div className="text-2xl font-black text-emerald-400 mb-1">2개</div>
                            <div className="text-xs text-slate-300 mb-1 font-medium">호평 우세</div>
                            <div className="text-[10px] text-emerald-300 font-semibold leading-tight">신궁, 카인</div>
                        </div>
                    </div>
                </div>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* 직업별 상세 반응 */}
                <section className="mb-14">
                    <div className="flex flex-col gap-2 mb-8 border-b border-emerald-900 pb-4">
                        <div className="flex items-center gap-3">
                            <Swords className="w-6 h-6 text-emerald-400" />
                            <h2 className="text-xl sm:text-2xl font-bold text-white">
                                직업별 상세 여론 분석
                            </h2>
                        </div>
                        <p className="text-sm text-slate-300 mt-2 flex items-center gap-1">
                            📸 <span className="font-bold text-slate-200">이미지 출처:</span> 본문 내 스킬 설명 이미지는 네이버 블로그 <a href="https://blog.naver.com/seotbeo" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200 underline font-semibold">섣버의 메이플월드</a>의 자료를 참고 및 인용하였습니다.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {jobReactions.map((job, idx) => (
                            <div
                                key={job.job}
                                id={`job-${job.job}`}
                                className={`rounded-2xl border shadow-xl scroll-mt-24 relative overflow-hidden ${job.bgClass} ${job.borderClass}`}
                            >
                                {/* 직업 헤더 영역 */}
                                <div className={`px-6 sm:px-8 pt-6 pb-4 ${job.headerBg} border-b ${job.borderClass}`}>
                                    {/* 배경 번호 */}
                                    <div className="absolute top-3 right-5 text-7xl font-black text-white/10 select-none pointer-events-none leading-none">
                                        {String(idx + 1).padStart(2, '0')}
                                    </div>

                                    <div className="flex flex-wrap items-start gap-3">
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className={`text-xl sm:text-2xl font-black ${job.colorClass}`}>
                                                    {job.job}
                                                </h3>
                                                <span className="text-slate-400 text-sm">—</span>
                                                <span className="text-slate-300 text-sm italic font-medium">{job.skill}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                                <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold border rounded-full ${getSentimentBadgeClass(job.sentiment)}`}>
                                                    {getSentimentIcon(job.sentiment)}
                                                    {job.sentimentLabel}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 카드 본문 */}
                                <div className="px-6 sm:px-8 py-5">
                                    {/* 6차 스킬 설명 툴팁 이미지 */}
                                    {job.icon && (
                                        <div className="mb-6 rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 max-w-2xl overflow-hidden shadow-inner flex flex-col gap-2">
                                            <span className="text-xs text-emerald-300 font-bold flex items-center gap-1">
                                                🖼️ 패치노트 신규 스킬 상세 명세 (툴팁 원본비율)
                                            </span>
                                            <div className="overflow-x-auto flex flex-wrap gap-4">
                                                {Array.isArray(job.icon) ? (
                                                    (job.icon as string[]).map((imgSrc, imgIdx) => (
                                                        <img
                                                            key={imgIdx}
                                                            src={imgSrc}
                                                            alt={`${job.job} ${job.skill} 스킬 상세 설명 ${imgIdx + 1}`}
                                                            className="h-auto rounded-lg max-w-none sm:max-w-full select-none"
                                                        />
                                                    ))
                                                ) : (
                                                    <img
                                                        src={job.icon as string}
                                                        alt={`${job.job} ${job.skill} 스킬 상세 설명`}
                                                        className="h-auto rounded-lg max-w-none sm:max-w-full select-none"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* 핵심 쟁점 */}
                                    <div className="bg-amber-950/40 border border-amber-800/40 rounded-xl px-4 py-3 mb-5 flex items-start gap-3 shadow-sm">
                                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-xs font-bold text-amber-300 block mb-1">핵심 쟁점</span>
                                            <span className="text-sm text-amber-100 font-medium leading-relaxed">{job.keyIssue}</span>
                                        </div>
                                    </div>

                                    {/* 실측 게시글 제목 */}
                                    <div className="mb-5">
                                        <p className="text-xs font-bold text-slate-300 mb-2.5 flex items-center gap-1.5">
                                            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                                            인벤 게시판 실측 제목
                                        </p>
                                        <div className="space-y-2">
                                            {job.posts.map((post, i) => (
                                                <div
                                                    key={i}
                                                    className="text-sm text-slate-200 bg-slate-900/60 border border-emerald-950/60 rounded-lg px-4 py-2.5 font-mono leading-relaxed"
                                                >
                                                    &ldquo;{post}&rdquo;
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 요약 */}
                                    <div className="text-sm sm:text-base text-slate-200 leading-relaxed break-keep bg-slate-900/40 rounded-xl px-4 py-4 border border-emerald-950/40 [&_strong]:text-yellow-400 [&_strong]:font-extrabold">
                                        {job.summary}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* 총평 */}
                <section id="conclusion" className="mb-14 scroll-mt-24 bg-slate-900/50 border border-emerald-900/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
                    <div className="flex items-center gap-3 mb-6 border-b border-emerald-900 pb-4">
                        <Shield className="w-6 h-6 text-emerald-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                            총평: 1차 테섭 궁수 직업군의 전반적인 평가
                        </h2>
                    </div>

                    <div className="text-slate-100 space-y-5 text-sm sm:text-base leading-relaxed break-keep">
                        <p>
                            공개된 궁수 7개 직업 신규 6차 스킬의 1차 인벤 여론을 종합하면,
                            <span className="text-red-300 font-bold"> 전반적으로 불만 및 구조적 개선 목소리가 높습니다</span>.
                            7개 중 5개 직업군이 불만 혹은 극심한 불만(보마, 윈브, 와헌, 메르, 패파) 여론을 보이고 있으며,
                            명확한 호평 및 긍정적 반응을 얻은 직업은 신궁과 카인 2개였습니다.
                        </p>

                        <div className="bg-red-950/40 border border-red-900/40 rounded-xl p-5">
                            <p className="font-bold text-red-300 mb-4 text-base">🔴 주요 불만 원인 3가지</p>
                            <ol className="space-y-4 text-slate-200">
                                <li className="flex gap-3">
                                    <span className="text-red-300 font-bold shrink-0 text-base">1.</span>
                                    <span><span className="text-white font-bold">기형적인 스킬 쿨타임 주기 및 압축 무산</span> — 와일드헌터의 40초 엇박자 설계로 인한 극딜 주기 정렬 실패, 윈드브레이커의 하울링 게일(3스택) 압축 무산 및 120초 특수 코어 쿨타임 패치에 따른 딜 사이클 엇박자 현상이 지적을 자아냈습니다.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-red-300 font-bold shrink-0 text-base">2.</span>
                                    <span><span className="text-white font-bold">조작 피로도 및 기형적인 연계 설계</span> — 메르세데스의 평딜 이슈타르의 링(속사) 메타를 탈피한 인위적 연계 강요 및 생존 리스크 가중(쿨뚝 강제), 보우마스터의 애로우 플래터 수동 설치 불편 및 버프 시퀀스 등록 시 스킬 씹힘 하자가 지적되었습니다.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-red-300 font-bold shrink-0 text-base">3.</span>
                                    <span><span className="text-white font-bold">게이지 과소모 및 제자리 고정 공격 리스크</span> — 패스파인더 신규 스킬의 과도한 게이지 소모 구조와 제자리 고정 공격에 따른 보스전 실전 딜 누수 우려가 집중 제기되었습니다.</span>
                                </li>
                            </ol>
                        </div>

                        <div className="bg-emerald-950/40 border border-emerald-900/40 rounded-xl p-5">
                            <p className="font-bold text-emerald-300 mb-4 text-base">🟢 긍정적인 신호 및 기대 요인</p>
                            <ul className="space-y-2.5 text-slate-200 pl-4">
                                <li>• 신궁은 고질적인 스플릿 애로우 주기가 30초로 완벽하게 압축되며 유저들의 큰 호평을 이끌어냈습니다.</li>
                                <li>• 카인은 그여축(그란디스 여신 축복) 확정 초기화 및 폴링 더스트-포이즌 니들 시너지(2스택씩 활성화)와 높은 퍼뎀 점유율에 힘입어 호평 우세 여론을 보였습니다.</li>
                                <li>• 현재는 1차 테스트서버 상태이므로, 2차 패치 피드백을 통해 쿨타임 주기 정렬 및 시퀀스 편입, 편의성 보강이 기대됩니다.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}