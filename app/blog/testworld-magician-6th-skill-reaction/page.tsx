'use client';

import Link from 'next/link';
import { Calendar, ArrowLeft, AlertTriangle, CheckCircle, TrendingDown, Flame, Minus, Info, MessageSquare, Swords, Shield } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

// 마법사 직업별 평가 데이터 (검증된 인벤 실측 데이터 기반)
const jobReactions = [
    {
        job: '불독',
        skill: '인페르날 웨이브',
        sentiment: 'negative',
        sentimentLabel: '불만 우세 (이펙트 불만 및 딜 누수 우려)',
        colorClass: 'text-orange-300',
        bgClass: 'bg-orange-950/40',
        borderClass: 'border-orange-700/60',
        headerBg: 'bg-orange-900/30',
        icon: '/images/testworld-203/w_스킬_2141506아크메이지(불,독)(6차)_추가.png',
        dilRate: '',
        keyIssue: "이펙트 퀄리티 저하(옆동네 대비 초라함) 및 '이그나이트' 미발동, '시전 위치 고정'으로 인한 실전 딜 누수 우려",
        posts: [
            '옆집 법사들 신스킬 이펙트 보다 불독 보니까 한숨나오네요',
            '근데 신규스킬에 이그나이트나 메테오(P)가 안 묻는 게 말이 됨?',
            '파도 공격이 캐릭터 위치가 아니라 시전했던 위치 고정이라 보스 이동하면 다 빗나감',
            '쇼케이스 영상 속 화려한 메테오 소나기는 인페르날 베놈을 겹쳐 쓴 단순 눈속임 연출로 밝혀짐',
            '스킬 횟수 남은 채로 보스 보상맵 들어가면 상자가 멋대로 터지는 대참사 가능성 있음',
        ],
        summary: <>
            신규 스킬의 구조 자체는 나쁘지 않다는 평이 있지만, <strong>옆동네 법사군 직업들과 비교해 이펙트 퀄리티가 지나치게 단조롭고 성의 없다</strong>는 비판이 가득합니다. 특히 불독 딜링의 핵심 요소인 <strong>'이그나이트'와 '메테오'가 신스킬 타격 시 전혀 발동하지 않는 현상</strong>에 대한 불만이 큽니다. 여기에 유저들의 실측 분석을 통해 <strong>공용코어(아르카나) 대비 효율이 낮고, 파도 공격이 '시전 위치 고정'이라 보스가 기동할 시 심각한 딜 누수</strong>가 발생한다는 단점이 추가로 지적되었습니다. 쇼케이스의 메테오 소낙비 연출은 인페르날 베놈을 미리 쓴 눈속임이었다는 실망감과 함께, 보상맵 내 오폭 방지를 위한 강제 비활성화 기능 및 캐릭터 중심 발동으로의 개선 요구가 이어지고 있습니다.
            <div className="mt-4 pt-3 border-t border-orange-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2295/298875" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-orange-300 hover:text-orange-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Grundgesetz님의 인페르날 웨이브 분석글 바로가기</span>
                </a>
            </div>
        </>,
    },
    {
        job: '썬콜',
        skill: '서브제로 퍼미네이션',
        sentiment: 'negative',
        sentimentLabel: '불만 우세 (구조적 불편함)',
        colorClass: 'text-cyan-300',
        bgClass: 'bg-cyan-950/40',
        borderClass: 'border-cyan-700/60',
        headerBg: 'bg-cyan-900/30',
        icon: '/images/testworld-203/w_스킬_2241507아크메이지(썬,콜)(6차)_추가.png',
        dilRate: '',
        keyIssue: "신스킬 모션 딜레이, 썬브(60초) 주기 통합 불발 및 극딜·바인드 구조적 족쇄",
        posts: [
            '신규 6차 스킬의 자동 사출기화 요구합니다. 버프 켜기도 바빠 죽겠는데 모션 딜레이 체감 큼',
            '썬브 쿨타임을 40초에서 60초로 변경해서 15/60/120초 주기로 제발 깔끔하게 통합해줬으면',
            '주피터 썬더 최종뎀 증가 족쇄 때문에 스킬 순서 강제되고 극딜 유연성이 너무 저하됨',
            '방깎 달린 고성능 자체 바인드(프리징 브레스) 놔두고 오리진 선바 때문에 에르다 노바 강제됨',
            '절대 바인드와 일반 바인드도 스틱스처럼 바인드 시간이 누적(합산)되는 형태로 개선 필요',
        ],
        summary: <>
            새롭게 추가된 &lsquo;서브제로 퍼미네이션&rsquo;이 수동 시전 액티브 형태로 설계되면서 <strong>극딜 시 안 그래도 바쁜 조작 난이도와 모션 딜레이(역체감)가 가중되었다</strong>는 비판이 큽니다. 유저들은 스킬의 <strong>모션 없는 완전한 자동 사출기화</strong>를 요구하는 한편, 신스킬 추가로 인해 <code>15/40/60/120</code>초로 더욱 기형적으로 꼬여버린 쿨 주기를 <strong>썬더 브레이크(썬브) 60초 조정을 통해 15/60/120 주기로 통합</strong>해 줄 것을 호소하고 있습니다. 추가로, 극딜 시 특정 순서를 무조건 강제하여 조작 유연성을 해치는 <strong>주피터 썬더의 최종뎀 증가 기믹 삭제(깡딜 이관)</strong> 요구와 함께, 지속형 오리진 시전 시 방깎 유틸이 달린 우수한 자체 바인드(프리징 브레스)를 사용하지 못하고 <strong>에르다 노바를 강제당하는 바인드 메커니즘 충돌 개선</strong>을 적극 건의하고 있습니다.
            <div className="mt-4 pt-3 border-t border-cyan-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2295/299173" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Lenalen님의 2차 테섭 개선안 건의 글 바로가기</span>
                </a>
            </div>
        </>,
    },
    {
        job: '비숍',
        skill: '엔젤스 플레지',
        sentiment: 'negative',
        sentimentLabel: '불만 우세 (시너지 너프 및 구조적 보완 요구)',
        colorClass: 'text-yellow-300',
        bgClass: 'bg-yellow-950/40',
        borderClass: 'border-yellow-700/60',
        headerBg: 'bg-yellow-900/30',
        icon: '/images/testworld-203/w_스킬_2341509비숍(6차)_추가.png',
        dilRate: '',
        keyIssue: '시너지(프레이 지속시간) 칼질 대비 개인 체급 상향 부족 및 신규 스킬과 디퍼 연계 하자',
        posts: [
            '개선안 작성완료. 다같이 문의 부탁드립니다',
            '진짜 말 쉽게 해줌 시너지삭제->체급 안올려줌',
            '프레이 뺏어간 10초 다시돌려내라',
            '준극 넣어줄거면 디퍼나 2분으로 만들어줘라',
            '피메 개쓰레기 스킬은 안바꿔주나;',
        ],
        summary: <>
            이전에 시너지 밸런스 조정으로 프레이의 지속시간이 단축되는 너프를 받았으나 <strong>이를 메워줄 비숍 개인의 딜 체급(평딜/극딜 성능) 상향이 지나치게 미흡하다</strong>는 불만이 폭발하고 있습니다. 이에 유저들 사이에서는 아예 <strong>프레이 지속시간을 다시 늘려달라</strong>는 의견도 있습니다. 그 외에 기존 딜링 사이클을 해치지 않도록 <strong>신규 6차 스킬의 쿨타임을 120초로 늘리고 디바인 퍼니시먼트(디퍼) 키다운 도중 사용 허용</strong>, 기존 사이클 보존을 위한 <strong>헤븐즈 도어(헤도) 감응 스킬 설정</strong>, 그리고 <strong>버프 시퀀스에 연동 가능한 버프 형태 또는 즉발형 설치기로의 스킬 구조 개선</strong>을 요구하는 건의가 이어지고 있습니다.
            <div className="mt-4 pt-3 border-t border-yellow-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2295/299008" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-yellow-300 hover:text-yellow-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>헤오루야님의 비숍 신규 6차 개선 건의 글 바로가기</span>
                </a>
            </div>
        </>,
    },
    {
        job: '플레임위자드',
        skill: '이그니스 레퀴엠',
        sentiment: 'negative',
        sentimentLabel: '불만 우세 (이펙트 아쉬움 및 조작 피로도)',
        colorClass: 'text-orange-300',
        bgClass: 'bg-orange-950/40',
        borderClass: 'border-orange-700/60',
        headerBg: 'bg-orange-900/30',
        icon: '/images/testworld-203/w_스킬_12141505플레임위자드(6차)_추가.png',
        dilRate: '',
        keyIssue: '동물 소환수 연출 이펙트 불호, 생각보다 낮은 데미지 및 극딜 조작 피로도 가중',
        posts: [
            '신규 6차 이펙트 너무 성의 없고 불호가 심함',
            '실제 전투분석 결과 신스킬 점유율 1.7% ~ 1.8% 수준으로 심히 미미한 수준임',
            '신스킬이 극딜 버프 시퀀스에 등록되지 않아 극딜 시 수동 입력해야 하는 아쉬움',
            '디차와 익팅 선딜 동안 시퀀스 켜고 일필 맞춰 넣는 등 극딜 피로도가 너무 복잡함',
            '이펙트도 아쉽고 딜 비중도 낮지만 그나마 딜 구조가 깨지는 치명적 오류는 없어 다행',
        ],
        summary: <>
            새로운 6차 스킬의 <strong>이펙트 디자인에 대해 아쉬워하는 여론</strong>이 나타나고 있습니다. 기존의 화려한 불꽃 컨셉이 아닌, 여러 동물 소환수가 조잡하게 튀어나오는 연출을 보며 유저들은 <strong>&ldquo;브레멘 음악대&rdquo;가 연상된다는 지적</strong>을 제기하고 있습니다. 또한 성능적으로 전투분석 기준 <strong>신스킬 극딜 점유율이 1.7% ~ 1.8% 수준으로 매우 낮고</strong>, 신규 스킬이 <strong>극딜 버프 시퀀스에 등록되지 않아</strong> 수동 입력 부담이 커졌습니다. 여기에 리레 내 디차 2회 타격과 일필 연계를 위해 디스차지/익스팅션 선딜레이 동안 시퀀스를 올리는 복잡한 컨트롤이 요구되는 등 <strong>가뜩이나 바쁘고 혼란스러운 극딜 조작 피로도가 크게 늘어났다</strong>는 점이 아쉬운 요소로 작용하고 있습니다.
            <div className="mt-4 pt-3 border-t border-orange-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2295/298719" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-orange-300 hover:text-orange-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>늘지님의 1차 테섭 기준 플위 극딜 사이클 가이드 바로가기</span>
                </a>
            </div>
        </>,
    },
    {
        job: '에반',
        skill: '드래곤 소어 / 버티컬 피니셔 / 소어-돌아와!',
        sentiment: 'critical',
        sentimentLabel: '극심한 불만 (구조적 보완 및 조작감 개선 요구)',
        colorClass: 'text-blue-300',
        bgClass: 'bg-blue-950/40',
        borderClass: 'border-blue-700/60',
        headerBg: 'bg-blue-900/30',
        icon: [
            '/images/testworld-203/w_스킬_22201505에반(6차)_추가.png',
            '/images/testworld-203/w_스킬_22200506에반(6차)_추가.png',
            '/images/testworld-203/w_스킬_22200507에반(6차)_추가.png',
        ],
        dilRate: '',
        keyIssue: "드래곤 소어 버프화 건의, 엘블 4스택 삭제 및 돌아와 내부쿨 제거 요구, MP 고갈 개선 제안",
        posts: [
            '에반 개선안 들어주세요 운영진님들... 제발 이렇게 빌게요ㅜㅜ',
            '돌캔이니 수동잔해니 하는 어떻게든 몸 비틀어서 딜넣는 기괴한 구조부터 손봐야',
            '모든 것을 내려놓고 에반과 미르만 건강하면 괜찮다고 생각하니 편하네요',
            '전 포기하고 레테로 넘어가겠습니다 ㅠ..',
            '조디악은 메이린 조디악부터 역체감 지림',
        ],
        summary: <>
            에반은 기존 스킬의 문제점과 신규 6차 스킬의 사용 편의성 문제를 해결하기 위해 개선을 요구하고 있습니다. 가장 중점적인 건의는 <strong>드래곤소어의 120초 자동 발동 삭제 및 버프화(조디악 감응형 즉시 사용화)</strong>이며, 극딜 딜로스 완화를 위해 <strong>엘리멘탈 블래스트 4스택 삭제와 오리진 40초 지속딜의 압축(순간 극딜화)</strong>을 강력히 주장하고 있습니다. 아울러 조작감과 유틸성 개선을 목표로 <strong>돌아와 내부 쿨타임 재삭제, 미르 스킬 사용 중 드래곤 마스터(무적기) 즉발화, 그리고 마나 오버로드 연계 시의 심각한 MP 부족 현상 해결</strong> 등의 실질적인 피드백이 유저들의 공감을 받고 있습니다.
            <div className="mt-4 pt-3 border-t border-blue-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2295/298872" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-blue-300 hover:text-blue-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>독서는필수님의 에반 핵심 개선안 건의 글 바로가기</span>
                </a>
            </div>
        </>,
    },
    {
        job: '루미너스',
        skill: '앱솔루트 스페이스',
        sentiment: 'negative',
        sentimentLabel: '불만 우세 (이펙트 아쉬움 및 딜량 부족)',
        colorClass: 'text-purple-300',
        bgClass: 'bg-purple-950/40',
        borderClass: 'border-purple-700/60',
        headerBg: 'bg-purple-900/30',
        icon: '/images/testworld-203/w_스킬_27141504루미너스(6차)_추가.png',
        dilRate: '',
        keyIssue: '신스킬 자체의 낮은 딜량 및 협소한 범위, 퍼니싱 연계 중 딜레이 누수와 스킬 증발 오류',
        posts: [
            '신스킬 앱솔루트 스페이스 개선안',
            '신스킬 루미치고 이펙트가 너무 슴슴함 ㄹㅇ..',
            '빛둠세 자동사출되면 좋겠당',
            '아무리 추가타 있어도 자체 딜량이 너무 부족하고 일격기치고 임팩트 없음',
            '특정 타격 빗나가면 추가타 증발하는 버그랑 텔레포트 관련 오류 수정해라',
        ],
        summary: <>
            이퀄리브리엄 상태에서 자연스럽게 딜링을 연계할 수 있는 구조적 뼈대는 무난하다는 평가를 받습니다. 그러나 초월자 컨셉에 비해 <strong>일격기다운 화려함이 부족해 이펙트와 타격음이 슴슴하고 초라하다</strong>는 비주얼 아쉬움이 높습니다. 성능 면에서도 <strong>메모라이즈 추가타를 감안해도 일격기 자체의 퍼뎀(딜량)이 너무 낮고, 타격 범위가 협소하여 딜 누수가 쉽다</strong>는 한계가 지적되었습니다. 또한, 특정 피격 상태에 따라 <strong>추가타가 아예 터지지 않고 누락되는 스킬 증발 현상</strong>과 텔포 후 잔상 오류 등 버그 수정이 촉구되고 있으며, 극딜 시 조작 딜로스를 줄이기 위해 <strong>퍼니싱 중 사용 가능하도록 개선하거나 시퀀스 등록을 지원해달라</strong>는 건의가 잇따르고 있습니다.
            <div className="mt-4 pt-3 border-t border-purple-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2295/298903" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-purple-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>퍼미에이트님의 앱솔루트 스페이스 개선 건의 글 바로가기</span>
                </a>
            </div>
        </>,
    },
    {
        job: '배틀메이지',
        skill: '모티스 엣지',
        sentiment: 'critical',
        sentimentLabel: '극심한 불만 (어비셜 너프 및 구조적 하자)',
        colorClass: 'text-emerald-300',
        bgClass: 'bg-emerald-950/40',
        borderClass: 'border-emerald-700/60',
        headerBg: 'bg-emerald-900/30',
        icon: '/images/testworld-203/w_스킬_32141504배틀메이지(6차)_추가.png',
        dilRate: '',
        keyIssue: "어비셜 45회 타수 제한 및 버그, 극딜 압축 실패와 신스킬 자체의 낮은 퍼뎀",
        posts: [
            '신규스킬과 어비셜 45회 제한이 아쉬운 이유',
            '어비셜 총딜량 깎인게 아무리 생각해도 납득이 안되는게',
            '어비셜 횟수제한 없애고 20초 해주면 안되나?',
            '어비셜 증발 버그가 생겼습니다',
            '만악의 근원 --> 5차 그 자체임 ㅋㅋㅋㅋㅋㅋ',
        ],
        summary: <>
            신스킬 &lsquo;모티스 엣지&rsquo;의 징표 사출 구조 자체는 기존 매커니즘과 연동되나, <strong>자체 퍼뎀(계수)이 극도로 낮게 설계된 데다 기존 핵심 5차 스킬 &lsquo;어비셜 라이트닝&rsquo;의 45회 타수 제한 너프 및 증발 오류</strong>가 겹쳐 유저들이 분노하고 있습니다. 극딜 압축을 바랐으나 그림 리퍼(30초), 유니온 오라(25초), 알터(40초) 등 <strong>따로 노는 버프 주기의 하자가 그대로 방치되었으며, 핵심 패시브인 데스와의 연동 부재 및 다크 펜타클의 까다로운 발동 조건(15회 타격)</strong>도 개선되지 않았습니다. 신스킬을 쓰지 않으면 어비셜 너프 때문에 쌩너프를 받고, 쓰자니 신스킬 자체 퍼뎀이 낮아 성능 체감이 없어 낡고 마모된 연계 구조 전반의 리메이크를 요구하고 있습니다.
            <div className="mt-4 pt-3 border-t border-emerald-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2295/298970" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-emerald-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>메린모전님의 배메 신규 스킬 및 어비셜 제한 분석 글 바로가기</span>
                </a>
            </div>
        </>,
    },
    {
        job: '키네시스',
        skill: '그래비티 오브젝트',
        sentiment: 'mixed',
        sentimentLabel: '아쉬움 우세 (이펙트 아쉬움 및 범위 협소)',
        colorClass: 'text-violet-300',
        bgClass: 'bg-violet-950/40',
        borderClass: 'border-violet-700/60',
        headerBg: 'bg-violet-900/30',
        icon: '/images/testworld-203/w_스킬_142140504키네시스(6차)_추가.png',
        dilRate: '',
        keyIssue: "신스킬 이펙트의 비주얼 아쉬움 및 협소한 인식 범위로 인한 딜 누수 우려",
        posts: [
            '이펙트보고 키네 시작한건데',
            '얘 잔상때부터 이펙트 계속 대충만드는 기분이네',
            '좋은말할때이펙트바꿔',
            '키네 6차 범위 개처망한 거 체감되는 영상',
            '그래비티 오브젝트 쿨타임 오류 사례 모음',
        ],
        summary: <>
            신규 6차 &lsquo;그래비티 오브젝트&rsquo;는 <strong>비주얼 이펙트의 성의 부족과 아쉬운 퀄리티에 대한 지적</strong>이 많습니다. &lsquo;이펙트 보고 키네시스를 시작했다&rsquo;는 유저가 많을 정도로 비주얼 정체성이 중요한 직업임에도, <strong>최근 신규 스킬들의 연출 퀄리티에 아쉬움이 남는다</strong>는 의견이 계속해서 제기되고 있습니다. 또한, 스킬의 <strong>인식 범위가 협소하여 실전 보스전에서 딜 누수가 우려된다</strong>는 점과 <strong>간헐적으로 쿨타임이 오작동하는 오류</strong> 등 성능과 버그 면에서도 조속한 수정과 범위 개선이 요구되고 있습니다.
            <div className="mt-4 pt-3 border-t border-violet-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2295/298625" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-violet-300 hover:text-violet-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>키네시스 이펙트 개선 건의 게시글 바로가기</span>
                </a>
            </div>
        </>,
    },
    {
        job: '일리움',
        skill: '글로리 윙 : 스플렌더',
        sentiment: 'negative',
        sentimentLabel: '불만 우세 (선준극 불가 및 구조적 연계 한계)',
        colorClass: 'text-teal-300',
        bgClass: 'bg-teal-950/40',
        borderClass: 'border-teal-700/60',
        headerBg: 'bg-teal-900/30',
        icon: '/images/testworld-203/w_스킬_152140510일리움(6차)_추가.png',
        dilRate: '',
        keyIssue: "글로리 윙 진입 시 강제 발동으로 인한 선준극 불가능, 고점 빌드 딜 상승 미미 및 실전성 감소",
        posts: [
            '신규스킬로 인한 문제점',
            '신스킬 무조건 그람홀더에 감응되야함',
            '솔직히 그람도 시퀀스에 올릴 수 있게 해주라 ㅡㅡ',
            '일리움 신스킬 1렙 점유율, 30렙 점유율',
        ],
        summary: <>
            신규 6차 &lsquo;글로리 윙 : 스플렌더&rsquo;는 글로리 윙 진입 후 스킬 사용시 자동으로 발사되는 구조로 인해, <strong>&lsquo;선준극&rsquo; 운영이 불가능해져 특정 보스 패턴 대응에서 딜 손실을 입는 문제</strong>가 제기되고 있습니다. 또한 기존 고점 빌드(선비행)와 달리 5차 버프들과 강제로 묶어 써야 하는 탓에 <strong>오히려 쿨타임이 밀려 고스펙 고점 유저들의 실질적인 딜 상승률이 매우 저조하다</strong>는 의견이 있습니다. 그래서 신규 스킬은 그람 홀더에 감응되거나 수동으로 사용할 수 있게 개선을 바라는 의견이 공감을 얻고 있습니다.
            <div className="mt-4 pt-3 border-t border-teal-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2295/298722" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-teal-300 hover:text-teal-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>일리움 신규 6차 구조적 문제점 건의 바로가기</span>
                </a>
            </div>
        </>,
    },
    {
        job: '라라',
        skill: '한아름 아우른 숨결',
        sentiment: 'positive',
        sentimentLabel: '호감 우세 (딜량 만족)',
        colorClass: 'text-green-300',
        bgClass: 'bg-green-950/40',
        borderClass: 'border-green-700/60',
        headerBg: 'bg-green-900/30',
        icon: '/images/testworld-203/w_스킬_162141503라라(6차)_추가.png',
        dilRate: '',
        keyIssue: "극딜 화력 대폭 보완 및 신규 6차 스킬 연출도 호평이 꽤 있음",
        posts: [
            '진짜 극딜 약해서 서러웠는데 패치방향성 좋은듯',
            '구조개선도 겸한다 했으니 잠깨우기도 자동 사출화 해줌 안되나?',
            '3분출 진짜 해줄생각 없는걸까요',
            '퉁퉁이 퉁퉁 거리는 모션 넘 기엽네용 ㅎ',
            '극딜은 확실히 쎄지겠죠?',
        ],
        summary: <>그동안 고질적인 약점으로 지적받던 <strong>극딜 화력이 상당 부분 상향 보완되어 딜량 향상에 대한 만족도가 높습니다</strong>. 소환되는 융합 토지령(퉁퉁이)의 통통 튀는 모션 and 디자인 역시 아니마 특유의 감성을 잘 살려 <strong>귀엽고 수려하다는 긍정적인 여론이 우세</strong>합니다. 그리고 딜 주기를 매끄럽게 굴리기 위해 <strong>&lsquo;잠 깨우기&rsquo; 자동 사출화와 고질적인 &lsquo;3분출&rsquo; 편의성 개선</strong>도 이번 패치를 기회 삼아 해결되기를 바라는 의견도 나오고 있지만, 이번 신규 6차 스킬의 성능폭이 줄어들까봐 <strong>일단 이번 신규 스킬만이라도 잘 받자</strong>는 의견이 꽤 있습니다.</>,
    },
    {
        job: '레테',
        skill: '보이드 오리진',
        sentiment: 'negative',
        sentimentLabel: '불만 (신규 스킬의 구조 모순)',
        colorClass: 'text-rose-300',
        bgClass: 'bg-rose-950/40',
        borderClass: 'border-rose-700/60',
        headerBg: 'bg-rose-900/30',
        icon: '/images/testworld-203/w_스킬_192141504레테(6차)_추가.png',
        dilRate: '',
        keyIssue: "신규 스킬의 역시너지 발생 부분과 마우스 우클릭 버프 해제 강제 이슈",
        posts: [
            '신6차 펠 최종뎀 감소 때문에 시퀀스 분리 필요한 거죠?',
            '다다익쿨 확정이죠? 5초 4초고민중인데',
            '1.8초 그대로 들어오면 4~5초는 필수 아님?',
            '레테 신규6차의 구조적 문제점에대해 알아보자',
            '이번에 임프린트 너프 신6차 때문인거인가요',
        ],
        summary: <>
            신규 스킬 이펙트는 예쁘다는 의견이 많습니다. 하지만 이 스킬은 스택을 소모하며 사용하는 극딜 버프인데, <strong>입장하여 극딜을 쓸 때 초반 스택이 부족하여 제대로 된 딜량이 나오지 않는 현상</strong>이 발생하고 있습니다. 그래서 입장 극딜 기준 <strong>이딕트 - 오버로드 - 1.8초 대기시간 동안 신규 6차 - 이딕트 - 오리진 - 오리진 끝난 후 이딕트 사용하기 직전 마우스 우클릭으로 신규 6차 버프 해제</strong>라는 기형적인 극딜 운용방법이 나온 상태입니다. 현재 이 문제를 해결하고 신규 6차 스킬이 나와야 한다는 의견이 큰 공감을 얻고 있습니다.
            <div className="mt-4 pt-3 border-t border-rose-800/40">
                <a 
                    href="https://www.inven.co.kr/board/maple/2295/299049" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-rose-300 hover:text-rose-200 underline font-semibold transition-colors"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>뚜보님의 레테 신규 6차 구조적 문제점 분석 글 바로가기</span>
                </a>
            </div>
        </>,
    },
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

export default function MagicianSkillReactionPage() {
    return (
        <div className="min-h-screen bg-[#0d0d1a] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200 pb-24 font-sans leading-relaxed">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none z-0"></div>
            <div className="fixed bottom-10 right-1/4 w-[400px] h-[400px] bg-blue-900/12 rounded-full blur-[100px] pointer-events-none z-0"></div>

            {/* Header */}
            <header className="w-full max-w-7xl flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-[#0d0d1a]/90 backdrop-blur-md border-b border-slate-700/80 mx-auto">
                <Link prefetch={false} href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-purple-300 font-semibold group">
                    <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                    <span>블로그 홈으로</span>
                </Link>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">
                {/* Title Section */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold bg-red-500/20 text-red-200 border border-red-500/40 rounded-full">
                            <Calendar className="w-3.5 h-3.5 text-red-300" />
                            2026년 7월 9일
                        </span>
                        <span className="px-3.5 py-1 text-xs font-bold bg-orange-500/20 text-orange-200 border border-orange-500/30 rounded-full">
                            테섭 1차 긴급 분석
                        </span>
                        <span className="px-3.5 py-1 text-xs font-bold bg-slate-600/40 text-slate-200 border border-slate-500/40 rounded-full">
                            인벤 직업 게시판 분석
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight break-keep">
                        <span className="block text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-1">
                            【1차 테섭 긴급 분석】
                        </span>
                        <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                            마법사 직업군 신규 6차 스킬,
                        </span>
                        <span className="block text-white font-bold">
                            유저들은 어떻게 반응했나?
                        </span>
                    </h1>

                    <p className="text-base md:text-lg text-slate-200 mb-8 leading-relaxed break-keep border-l-4 border-purple-500 pl-5 py-3 bg-purple-950/30 rounded-r-lg">
                        2026년 7월 9일 오후 4시, 테스트서버 1.2.203 업데이트와 함께 전 직업 신규 6차 스킬이 공개되었습니다.
                        마법사 11개 직업의 인벤 직업 게시판의 여론을 취합하여 분석했습니다.
                    </p>

                    {/* 분석 범위 안내 */}
                    <div className="bg-slate-800/60 border border-slate-600/70 rounded-2xl p-5 backdrop-blur-sm mb-8">
                        <p className="text-sm font-bold text-slate-100 mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4 text-purple-300" />
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
                        <div className="bg-red-900/40 border border-red-700/60 rounded-xl p-4 text-center shadow-lg">
                            <div className="text-2xl font-black text-red-300 mb-1">2개</div>
                            <div className="text-xs text-slate-300 mb-1 font-medium">극심한 불만</div>
                            <div className="text-[10px] text-red-200">에반, 배틀메이지</div>
                        </div>
                        <div className="bg-orange-900/40 border border-orange-700/60 rounded-xl p-4 text-center shadow-lg">
                            <div className="text-2xl font-black text-orange-300 mb-1">8개</div>
                            <div className="text-xs text-slate-300 mb-1 font-medium">불만·호불호</div>
                            <div className="text-[10px] text-orange-200">불독, 썬콜, 비숍, 플레임위자드,<br />루미너스, 키네시스, 일리움, 레테</div>
                        </div>
                        <div className="bg-green-900/40 border border-green-700/60 rounded-xl p-4 text-center shadow-lg">
                            <div className="text-2xl font-black text-green-300 mb-1">1개</div>
                            <div className="text-xs text-slate-300 mb-1 font-medium">호평</div>
                            <div className="text-[10px] text-green-200 font-semibold">라라 (딜량/비주얼 호평)</div>
                        </div>
                    </div>
                </div>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* 직업별 상세 반응 */}
                <section className="mb-14">
                    <div className="flex flex-col gap-2 mb-8 border-b border-slate-700 pb-4">
                        <div className="flex items-center gap-3">
                            <Swords className="w-6 h-6 text-purple-400" />
                            <h2 className="text-xl sm:text-2xl font-bold text-white">
                                직업별 상세 여론 분석
                            </h2>
                        </div>
                        <p className="text-sm text-slate-300 mt-2 flex items-center gap-1">
                            📸 <span className="font-bold text-slate-200">이미지 출처:</span> 본문 내 스킬 설명 이미지는 네이버 블로그 <a href="https://blog.naver.com/seotbeo" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 underline font-semibold">섣버의 메이플월드</a>의 자료를 참고 및 인용하였습니다.
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
                                        <div className="mb-6 rounded-xl border border-slate-600/60 bg-slate-900/60 p-4 max-w-2xl overflow-hidden shadow-inner flex flex-col gap-2">
                                            <span className="text-xs text-purple-300 font-bold flex items-center gap-1">
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
                                    <div className="bg-amber-950/50 border border-amber-700/50 rounded-xl px-4 py-3 mb-5 flex items-start gap-3 shadow-sm">
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
                                                    className="text-sm text-slate-200 bg-slate-800/70 border border-slate-600/50 rounded-lg px-4 py-2.5 font-mono leading-relaxed"
                                                >
                                                    &ldquo;{post}&rdquo;
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 요약 */}
                                    <div className="text-sm sm:text-base text-slate-200 leading-relaxed break-keep bg-slate-800/40 rounded-xl px-4 py-4 border border-slate-700/40 [&_strong]:text-yellow-400 [&_strong]:font-extrabold">
                                        {job.summary}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* 총평 */}
                <section id="conclusion" className="mb-14 scroll-mt-24 bg-slate-800/50 border border-slate-600/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-600 pb-4">
                        <Shield className="w-6 h-6 text-purple-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                            총평: 1차 테섭 마법사 직업군의 전반적인 평가
                        </h2>
                    </div>

                    <div className="text-slate-100 space-y-5 text-sm sm:text-base leading-relaxed break-keep">
                        <p>
                            공개된 마법사 11개 직업 신규 6차 스킬의 1차 인벤 여론을 종합하면,
                            <span className="text-red-300 font-bold"> 전반적으로 부정적인 피드백이 두드러집니다</span>.
                            11개 중 2개 직업군이 극심한 불만(에반, 배틀메이지), 7개 직업군이 불만 우세(불독, 썬콜, 비숍, 플위, 루미너스, 일리움, 레테), 1개 직업군이 아쉬움 우세(키네시스) 여론을 보이고 있으며,
                            명확한 호평을 얻은 직업은 라라 1개에 그쳤습니다.
                        </p>

                        <div className="bg-red-900/40 border border-red-700/60 rounded-xl p-5">
                            <p className="font-bold text-red-200 mb-4 text-base">🔴 주요 불만 원인 3가지</p>
                            <ol className="space-y-4 text-slate-200">
                                <li className="flex gap-3">
                                    <span className="text-red-300 font-bold shrink-0 text-base">1.</span>
                                    <span><span className="text-white font-bold">이펙트 퀄리티 성의 부족</span> — 불독은 옆동네 대비 초라한 불꽃 파도로 혹평, 플레임위자드는 여러 동물이 다소 조잡하게 합쳐져 연출되는 아쉬움, 루미너스는 초월자 기운에 맞지 않는 슴슴함으로 지적을 받아 이펙트 개선 여론이 매우 강력합니다.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-red-300 font-bold shrink-0 text-base">2.</span>
                                    <span><span className="text-white font-bold">기형적인 극딜 주기 및 스킬 파편화</span> — 비숍의 60초 신스킬-2분 디퍼 간의 엇박자 주기 및 썬콜의 15/40/60/120초 쿨타임 파편화처럼 기존 극딜 사이클의 안정성을 방해하거나 강제로 꼬이게 만드는 구조적 불합리함이 주요 혹평 요인입니다.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-red-300 font-bold shrink-0 text-base">3.</span>
                                    <span><span className="text-white font-bold">조작 피로도 및 기형적 딜 사이클 강제</span> — 에반의 마나 오버로드 연계 시의 극심한 MP 부족과 돌아와 내부쿨 롤백으로 인한 조작성 저하, 썬콜의 수동 극딜 추가 모션 피로도, 그리고 레테의 딜 손실을 막기 위한 <strong>마우스 우클릭 버프 강제 해제(캔슬) 및 초반 스택 부족 현상</strong> 등 조작 측면의 역체감이 심각합니다.</span>
                                </li>
                            </ol>
                        </div>

                        <div className="bg-green-900/40 border border-green-700/60 rounded-xl p-5">
                            <p className="font-bold text-green-200 mb-4 text-base">🟢 긍정적인 신호 및 기대 요인</p>
                            <ul className="space-y-2.5 text-slate-200 pl-4">
                                <li>• 라라는 극딜 화력 부족 문제를 확실하게 해결해 주는 방향성 설계와 수려하고 귀여운 이펙트 디자인으로 유저들의 만족도가 높습니다.</li>
                                <li>• 현재는 <span className="text-white font-bold">1차 테스트서버</span> 단계이므로, 인벤 분석러들의 정교한 딜사이클 건의와 여론 취합을 바탕으로 7월 23일 본섭 적용 전 2차 테섭 피드백 수정이 이뤄질 여지가 큽니다.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
