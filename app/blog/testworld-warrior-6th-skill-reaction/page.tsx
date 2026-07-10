'use client';

import Link from 'next/link';
import { Calendar, ArrowLeft, AlertTriangle, CheckCircle, TrendingDown, Flame, Minus, Info, MessageSquare, Swords, Shield } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

// 직업별 평가 데이터 (검증된 인벤 실측 데이터 기반)
const jobReactions = [
    {
        job: '히어로',
        skill: '레이지 익스플로젼',
        sentiment: 'negative',
        sentimentLabel: '불만 우세',
        colorClass: 'text-red-400',
        bgClass: 'bg-red-950/20',
        borderClass: 'border-red-900/50',
        icon: '/images/testworld-203/w_스킬_1141503히어로(6차)_추가.png',
        dilRate: '',
        keyIssue: '60초 주기 준극 시퀀스 부재 + 추가 조작 키 요구에 따른 조작 피로도 가중',
        posts: [
            '소드일루전 30초짜리인데 60초 스킬을 줘? 딜주기 어쩌라는거임',
            '준극 시퀀스에도 뭐 들어가는게 없는데 누를것만 많아짐',
            '딜사이클이 존나불편함 오라블레이드라도 자동사출 해주던가',
            '인사이징 지속시간이랑 신규스킬 쿨 같은데 이제 진짜 인사이징 패시브로 이관 안되나',
            '지금개판이라 몇몇은 모르겠는데 이번스킬 퍼뎀좀 많이올려야함',
        ],
        summary: '60초 준극 타이밍에 제대로 연계할 수 있는 전용 버프 구성도 마땅치 않은 상태에서 스킬만 붕 떠버리는 바람에, 실질 딜량 상승은 미미한 채 딜링 중 수동으로 추가 입력하고 눌러야 할 키(조작 버튼)만 늘어났다는 불만이 압도적입니다. 유저들은 조작 피로도를 줄이기 위해 인사이징 디버프의 완전한 패시브 이관, 소드 일루전의 60초 주기 통일, 또는 오라 블레이드 자동 사출화를 요구하고 있습니다.',
    },
    {
        job: '팔라딘',
        skill: '디바인 컨버전스',
        sentiment: 'mixed',
        sentimentLabel: '아쉬움',
        colorClass: 'text-yellow-400',
        bgClass: 'bg-yellow-950/20',
        borderClass: 'border-yellow-900/50',
        icon: '/images/testworld-203/w_스킬_1241506팔라딘(6차)_추가.png',
        dilRate: '',
        keyIssue: '연타형 구조 + 낮은 퍼뎀으로 솔플 딜 기대 이하',
        posts: [
            '직업별로 필요한걸 준다면서 60초는 많이 아쉽네요',
            '퍼뎀은 존나약한데용?',
            '아니 팔라딘 60초 준극은 오케인데 왜 연타냐',
            '사이클이 좀 복잡해졌네',
            '진짜 솔플 뒤지게 약함',
        ],
        summary: '60초 주기의 준극딜기 타이밍 이해도 자체는 나쁘지 않으나, 단발 압축이 아닌 연타 방식이라 딜 밀도가 낮습니다. 낮은 퍼뎀으로 인해 솔플 딜 기대치에 미치지 못한다는 평가가 주를 이루며, 기존 극딜기와의 버프·시드링 타이밍 배분도 까다로워졌다는 분석입니다.',
    },
    {
        job: '다크나이트',
        skill: '비홀더 데버스테이션 / 다크니스 오브 그레이스',
        sentiment: 'critical',
        sentimentLabel: '극심한 불만',
        colorClass: 'text-purple-400',
        bgClass: 'bg-purple-950/20',
        borderClass: 'border-purple-900/50',
        icon: '/images/testworld-203/w_스킬_1341504다크나이트(6차)_추가.png',
        dilRate: '',
        keyIssue: '신규 버프 시전 후 스킬 간 조작 연계 제한 및 1.5초 조작 불통(락) 발생',
        posts: [
            '임팩트 쓰면 쇼크 안 나가는 구조인데 이거 오류 맞냐',
            '강화 쇼크 발동 때문에 강화 임팩트가 한 템포 늦게 나감',
            '강화 임팩트 시전 하는 동안 기존 임팩트 못 쓰게 막아둔 이유가 뭐임',
            '쇼크 타격 이펙트 사라질 때까지 임팩트 안 나가서 1.5초 락걸림',
            '퓨어 딜러 정체성인데 딜량 자체가 전반적으로 너무 약한 게 제일 큼',
        ],
        summary: '퓨어 딜러 포지션임에도 체급이 낮은 부분에 대한 불만이 지배적입니다. 특히 신규 스킬이 버프 형태로 설계되었으나, 조작 시 스킬 연계 메커니즘이 원활하지 않아 심각한 역체감이 발생하고 있습니다. 대표적으로 임팩트 사용 시 쇼크가 발동되지 않고, 강화 쇼크로 인해 강화 임팩트의 사출 반응이 늦어지며, 강화 임팩트 시전 중에는 기존 임팩트를 사용하지 못하는 조작 연계 제한이 걸립니다. 가장 큰 오작동 요인은 쇼크의 타격 연출(눈 번쩍 이펙트)이 완전히 사라지기 전까지 약 1.5초 동안 임팩트가 입력되지 않는 불쾌한 락(Lock) 현상입니다.',
    },
    {
        job: '미하일',
        skill: '레디언스 오브 발러',
        sentiment: 'negative',
        sentimentLabel: '분노 + 허탈',
        colorClass: 'text-orange-400',
        bgClass: 'bg-orange-950/20',
        borderClass: 'border-orange-900/50',
        icon: '/images/testworld-203/w_스킬_51141505미하일(6차)_추가.png',
        dilRate: '',
        keyIssue: '바인드 개선 패치로 인한 로얄가드 피격(패링) 불가 및 실질 딜량 너프 모순',
        posts: [
            '바인드 걸면 맵 패턴이 다 사라져서 로얄가드를 쓸 수 없음',
            '신스킬로 딜 2% 올려놓고 바인드 개선으로 3% 너프 먹이네',
            '보스 행동불가 때는 그냥 로얄가드 눌러도 발동되게 바꿔줘야 함',
            '뎀감기인 로아이아스랑 배리어 유틸이 바인드 타이밍엔 무용지물이 됨',
            '풀패링 허수아비로 쳐도 최하위권인데 실전 구조는 더 기형적으로 변함',
        ],
        summary: '신규 스킬 추가에 따른 딜 상승량은 약 2%대로 미미한 가운데, 동반된 바인드 편의성 개선 패치(바인드 적용 시 맵 패턴 미출현)가 미하일에게는 실질적인 너프(약 1.5%~3%)로 작용하는 기형적인 구조적 모순이 발생했습니다. 미하일은 보스 패턴에 피격당하며 로얄가드 패링을 성공시켜야 핵심 딜링과 버프를 유지할 수 있는데, 극딜 시 보스가 행동 불가에 걸려 가드를 터뜨릴 기회가 원천 봉쇄되기 때문입니다. 이로 인해 극딜 시 저점을 보완해주는 가드 시간 증가 혜택과 라이트 오브 커리지, 로아이아스 등 뎀감 보호막 유틸 또한 극딜 타임 내에선 사실상 무용지물이 되는 현상입니다.',
    },
    {
        job: '소울마스터',
        skill: '셀레스티얼 클리브',
        sentiment: 'negative',
        sentimentLabel: '실망',
        colorClass: 'text-blue-400',
        bgClass: 'bg-blue-950/20',
        borderClass: 'border-blue-900/50',
        icon: '/images/testworld-203/w_스킬_11141505소울마스터(6차)_추가.png',
        dilRate: '',
        keyIssue: '굳이 2타 분할 + 보조 효과 전무 + 엘리시온 리레 딜로스',
        posts: [
            '신스킬 2타로 나눈 놈은 대체 뭔 생각이었을까',
            '리레 4렙에 6차극딜이 다 들어가야함',
            '그냥 얜 신스킬에 아무런 버프,추가효과도 없는게 존나답없음',
            '결국 극딜은 더 길어지고 눌러야할건 더 많아졌네요',
            '엘리시온 횟수나 줄이고 저딴거내라고',
        ],
        summary: '굳이 2타 분할로 출시되어 모션 딜레이가 극딜 시간을 갉아먹는다는 점이 핵심 족쇄로 밝혀졌습니다. 리레4 타임 내에 6차 극딜을 온전히 다 우겨넣을 수 없다는 딜 누수 분석이 공식화되었으며, 무의미한 2타 모션을 단발 압축하거나 엘리시온 주기를 획기적으로 손봐달라는 딜러들의 성토가 굳어졌습니다.',
    },
    {
        job: '블래스터',
        skill: '오버히트 펀치',
        sentiment: 'negative',
        sentimentLabel: '분노 (캔슬 불가)',
        colorClass: 'text-cyan-400',
        bgClass: 'bg-cyan-950/20',
        borderClass: 'border-cyan-900/50',
        icon: '/images/testworld-203/w_스킬_37141504블래스터(6차)_추가.png',
        dilRate: '',
        keyIssue: '캔슬 직업군인데 신스킬이 캔슬 불가 — "혹을 얹음"',
        posts: [
            '연계도 안 돼 캔슬도 안 돼',
            '혹을 떼야할 직업에 혹을 쳐붙이고 있어',
            '그냥 과열상태때 릴파벙누르면 발동되게 바꾸면 되지않나',
            '아니 신스킬 평딜때 캔슬 안돼요??????',
            '아니 그냥 자동발동 내놔라',
        ],
        summary: '연계도 안 되고 캔슬도 되지 않는 신스킬이 출시되었습니다. 후딜레이 자체는 짧은 편이지만 기존에도 조작해야 할 키가 많았던 직업군 특성상, 신스킬을 추가로 입력해야 하여 스킬 운용이 더 힘들어질 수 있다는 의견이 많습니다. 이에 유저들 사이에서는 "과열 상태 시 릴리즈 파일 벙커(릴파벙) 키를 누르면 신규 6차 스킬이 발동되게 해달라"는 구체적인 개선안이 제시되고 있으며, 캔슬 직업군임에도 정작 캔슬이 불가능한 스킬이 추가된 점에 대해 불만이 많은 상황입니다.',
    },
    {
        job: '카이저',
        skill: '드라코닉 익스팅션',
        sentiment: 'critical',
        sentimentLabel: '최악 (전직업 최하위론)',
        colorClass: 'text-red-400',
        bgClass: 'bg-red-950/20',
        borderClass: 'border-red-900/50',
        icon: '/images/testworld-203/w_스킬_61141503카이저(6차)_추가.png',
        dilRate: '',
        keyIssue: '마제스티 오브 카이저와의 극딜 구조 충돌 및 키다운 중 윌오소 봉인으로 인한 딜 누수',
        posts: [
            '마오카 버프 켜진 극딜 타임에 3.5초 키다운을 박으면 윌오소 횟수가 반토막 남',
            '신스킬 레벨 19레벨 전까지는 리레 극딜 때 쓰면 안 쓰는 것보다 딜이 낮아지는 기적',
            '마오카 다 끝나고 윌오소/인퍼널 쿨이면서 엔버링크 남아있을 때만 쓰는 기형적 사이클',
            '키다운 도중 윌오소 사용 가능하게 개선해봤자 조작만 바빠짐. 깡딜 상향만이 유일한 답',
            '그여축 100% 보정 개선 패치도 실제 딜 상승량은 1% 미만으로 큰 의미 없음',
        ],
        summary: '카이저 극딜의 핵심은 마제스티 오브 카이저(마오카) 버프 지속 시간 동안 주력 스킬인 윌 오브 소드와 인퍼널 브레스의 재사용 대기시간 초기화를 최대한 빈번하게 발동시키는 것입니다. 그러나 3.5초 동안 키다운을 하는 신규 6차를 리레 극딜 주기 내에 사용하게 되면, 그여축 사출 작업 및 오리진 연계 시간까지 겹쳐 극딜 타임에 윌 오브 소드 사용이 제한되는 치명적인 구조 충돌이 발생합니다. 이로 인해 신스킬 레벨이 19레벨 이하일 때는 극딜 중에 신스킬을 시전하는 것이 오히려 전체 누적 딜량 손실을 야기하며, 그여축 확률 개선의 실질 딜 기여도 또한 1% 미만으로 미미하다는 분석이 나오면서 불만이 가중되는 상황입니다. 키다운 스킬의 데미지가 극딜의 역할을 잘 할 수 있게 상향하던가, 차라리 설치기나 즉발형으로 바뀌는 등 다양한 개선 사항이 올라오고 있습니다.',
    },
    {
        job: '아델',
        skill: '에테르 뤼페',
        sentiment: 'mixed',
        sentimentLabel: '아쉬움 (딜사이클 붕괴)',
        colorClass: 'text-slate-300',
        bgClass: 'bg-slate-900/30',
        borderClass: 'border-slate-700/50',
        icon: '/images/testworld-203/w_스킬_151141503아델(6차)_추가.png',
        dilRate: '',
        keyIssue: '2.8초 키다운 → 오리진 극딜 내 2게블 불가',
        posts: [
            '21세기 현대 메이플에 키다운 추가는 좀 에바',
            '키다운 개같네 진짜 열받노',
            '환산님 피셜 신규스킬 풀강 기준 2.97% 라네요',
            '신 스킬 최대 키다운은 2.8초로 예상됩니다',
            '3초뚝 리4인데 오리진 극딜 타임에 1리레 2게블 안돼요',
        ],
        summary: '기존에도 조작해야 할 키가 많았던 직업 특성상 키다운 스킬이 추가되면서 실전 스킬 운용에 불편함이 가중된다는 의견이 많습니다. 실제 약 2.8초 동안 키다운을 유지해야 스킬의 전체 타격이 온전히 적용되는데, 딜링 시뮬레이션 결과 실질적인 딜 상승률은 약 2.97% 수준에 머무르는 것으로 분석되었습니다. 이에 따라 키다운 구조 자체를 루인 스킬처럼 즉발 단발식 형태로 고쳐 조작 편의성을 개선해 달라는 요구가 이어지고 있습니다.',
    },
    {
        job: '아란',
        skill: '마하 언리시드',
        sentiment: 'mixed',
        sentimentLabel: '호평 + 코강 버그 논란',
        colorClass: 'text-orange-400',
        bgClass: 'bg-orange-950/20',
        borderClass: 'border-orange-900/50',
        icon: '/images/testworld-203/w_스킬_21141505아란(6차)_추가.png',
        dilRate: '',
        keyIssue: '이펙트 대호평 / 헥사 코강 미적용 치명 버그 발견',
        posts: [
            '이펙트는 굉장히 맘에 드네요',
            '항상 은은하게 순방하네',
            '아란 신규스킬코어 6차 미적용인거같습니다',
            '근데 코강 미적용 버그를 그냥 두기엔 솔직히 찜찜해서',
            '아란 신규 스킬 버그있는거 같습니다',
        ],
        summary: '전체적으로 신규 6차 이펙트와 타격감 부분에 대한 호평이 이어졌습니다. 신규 6차가 기존 딜 구조와 다르지 않게 강화가 되면서 긍정적인 의견이 많습니다. 하지만 코강 레벨이 실제 스킬 데미지에 반영되지 않고 1레벨로 고정되어 터지는 버그가 제보되었습니다. 이 버그가 수정되기 전까지 정확한 딜 측정이 불가능합니다.',
    },
    {
        job: '데몬슬레이어',
        skill: '래쓰 오브 세이튼',
        sentiment: 'mixed',
        sentimentLabel: '아쉬움 (어웨 스택 요구)',
        colorClass: 'text-red-300',
        bgClass: 'bg-red-950/15',
        borderClass: 'border-red-900/40',
        icon: '/images/testworld-203/w_스킬_31141505데몬_슬레이어(6차)_추가.png',
        dilRate: '',
        keyIssue: '어웨이크닝 딜 압축(스택 감소) 요구 vs 직업 고유 타격감·아이덴티티 보존 논쟁',
        posts: [
            '어웨이크닝을 10스택으로 압축해 리레 안에 넣어야 한다는 강박을 버려야 함',
            '압축해봤자 퍼뎀 깎여서, 리레 끝나고 100초 동안 임팩트만 치는 노잼 캐릭터 됨',
            '핵심은 리레 극딜 압축이 아닌 직업 자체의 근본적인 체급(기본 데미지) 상향임',
            '어웨이크닝의 큰 날개 간지와 고유 타격감이야말로 데슬을 키우는 근본적인 이유',
            '차라리 리마스터 때 임팩트를 지우고 어웨이크닝을 기본 평타로 설정해 줬으면 좋겠음',
        ],
        summary: '신규 6차 \'준극딜기\' 느낌의 스킬이 추가되면서 또 다시 전통적인 쟁점인 데몬 어웨이크닝의 극딜 압축(스택 감소) 문제를 두고 유저들 간의 논쟁이 뜨겁습니다. 어웨이크닝을 10스택 수준으로 압축하여 리레링 안에 다 털어 넣자는 압축 요구에 맞서, 어웨이크닝의 넓은 날개 연출과 특유의 시원한 타격감이야말로 데슬의 독보적인 매력이라는 반론도 지지를 얻고 있습니다. 이런 부분에 관하여 어웨이크닝을 상시 스킬로 하고, 강화형 어웨이크닝을 추가하자는 의견도 나오고 있습니다.',
    },
    {
        job: '데몬어벤져',
        skill: '래비드 카니지',
        sentiment: 'negative',
        sentimentLabel: '이펙트 혹평 + 실전 오작동',
        colorClass: 'text-violet-400',
        bgClass: 'bg-violet-950/20',
        borderClass: 'border-violet-900/50',
        icon: '/images/testworld-203/w_스킬_31241506데몬_어벤져(6차)_추가.png',
        dilRate: '',
        keyIssue: "신규 스킬 '창' 이펙트 불호 + 신규 스킬 자체는 나쁘지 않다는 평가",
        posts: [
            '신규 6차 이펙트 붕쯔붕쯔는 그렇다쳐도',
            '이펙트 더 개X으로 바꿔놨네',
            '신규스킬 키다운중 피참',
            '신규6차 피회복 오류?',
            'Hp소모값 때문에 스킬 안나가는거 고쳐야함',
        ],
        summary: '대다수는 이번 신규 스킬 이펙트에 대한 부분에 불호가 많습니다. 특히 \'창\'이 마지막에 나오는 것에 대한 불호도 많습니다. 키다운 스킬 중에 실체 발동이 부드럽게 나가는 편이라서 괜찮은 평가가 있지만, 앱졸브 외에 다른 스킬들로 인하여 HP가 회복되기 때문에 불편함이 있다는 의견들이 있습니다. 하지만 이 문제는 레퀴엠(타격 시 추가타 터지는 매커니즘까지 완전 동일)에서도 동일하게 발생하는 문제이기에 개발진 측에서 따로 해결해 주지 않을 것이라는 의견이 존재합니다.',
    },
    {
        job: '제로',
        skill: '타임 어소리티',
        sentiment: 'critical',
        sentimentLabel: '이펙트 붕괴 + 구조 불만',
        colorClass: 'text-sky-400',
        bgClass: 'bg-sky-950/20',
        borderClass: 'border-sky-900/50',
        icon: '/images/testworld-203/w_스킬_101141506제로(6차)_추가.png',
        dilRate: '',
        keyIssue: '"굴렁쇠" 이펙트 논란 + 베타 극딜 타임포스 부족 현상 개선',
        posts: [
            '그동안 제로 컨셉/이펙트 하나보고 10년가까이했는데 이번엔 정말 접고싶네요',
            '제로 신스킬 너무 못생겨서 하기싫어요',
            '굴렁쇠 진짜 개빡치네',
            '데미지 10퍼 걍 포기하고 타임홀딩 무적기로 따로 쓸거??',
            '굴렁쇠 진짜 웃음벨이긴 하네',
        ],
        summary: '둥그런 원판이 돌아가는 "굴렁쇠" 연출에 대해 10년 가까이 애정으로 캐릭을 키운 올드 유저들마저 "게임을 접고 싶다", "신스킬이 너무 못생겨서 손대기 싫다"며 이펙트의 관련된 부정적 의견이 많습니다. 그 외에 신규 스킬 자체 데미지 보다는 데미지10% + 포스 회복 효과를 통한 유틸적인 부분 보완이 됐다는 평가가 많습니다.',
    },
    {
        job: '렌',
        skill: '창룡파천검 : 만참',
        sentiment: 'critical',
        sentimentLabel: '극심한 불만 (구조 붕괴)',
        colorClass: 'text-purple-400',
        bgClass: 'bg-purple-950/20',
        borderClass: 'border-purple-900/50',
        icon: '/images/testworld-203/w_스킬_161140507렌(6차)_추가.png',
        dilRate: '',
        keyIssue: '망혼검 스택 테크닉 강제 봉인 및 15초 쿨타임 족쇄 발생',
        posts: [
            '진짜 똥나오게 마음에 안 드는데 정상임?',
            '망혼검 1~2타 장전하고 몰아쓰기 이런거 못함이젠 걍 무조건 털어야함ㅋㅋ',
            '승화분리를 해야 오리진극에서 손해를 안보는 구조',
            '망혼 특유의 쿨타임 자유도를 신규 6차 쿨타임에 의해 강제적으로 제한당함',
            '극딜 전 15초는 망혼 쓰지마 구조',
        ],
        summary: '신규 스킬의 딜 점유율은 헥사 만렙 기준 겨우 2%대에 그칩니다. 반면, 15초의 내부 쿨타임이 생기면서 기존에 망혼검 1~2스택을 모아두었다가 일필(일격필살)이나 엔버링크 버프에 맞춰 연속으로 몰아 털던 유저들의 고유 폭딜 테크닉이 완전히 막혔습니다. 게다가 극딜 전 15초 동안은 망혼을 금지해야 하는 족쇄가 생겼고, 개발진의 원래 의도(승화분리 억제)와 달리 오히려 승화분리를 강제해야 극딜 시 손해를 보지 않는 역설적인 구조가 만들어졌습니다. 렌의 최대 메리트인 "조작 자유도와 딜링 유연성"이 모조리 뭉개졌다는 격렬한 성토가 이어지고 있습니다.',
    },
];

const getSentimentIcon = (sentiment: string) => {
    if (sentiment === 'positive') return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (sentiment === 'mixed') return <Minus className="w-4 h-4 text-yellow-400" />;
    if (sentiment === 'negative') return <TrendingDown className="w-4 h-4 text-orange-400" />;
    if (sentiment === 'critical') return <Flame className="w-4 h-4 text-red-500" />;
    return null;
};

const getSentimentBadgeClass = (sentiment: string) => {
    if (sentiment === 'positive') return 'bg-green-500/10 text-green-300 border-green-500/30';
    if (sentiment === 'mixed') return 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30';
    if (sentiment === 'negative') return 'bg-orange-500/10 text-orange-300 border-orange-500/30';
    if (sentiment === 'critical') return 'bg-red-500/10 text-red-300 border-red-500/30';
    return '';
};

export default function WarriorSkillReactionPage() {
    return (
        <div className="min-h-screen bg-[#080711] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200 pb-24 font-sans leading-relaxed">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-red-900/8 rounded-full blur-[140px] pointer-events-none z-0"></div>
            <div className="fixed bottom-10 right-1/4 w-[400px] h-[400px] bg-purple-900/6 rounded-full blur-[100px] pointer-events-none z-0"></div>

            {/* Header */}
            <header className="w-full max-w-7xl flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-[#080711]/90 backdrop-blur-md border-b border-slate-800/80 mx-auto">
                <Link prefetch={false} href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-purple-400 font-semibold group">
                    <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                    <span>블로그 홈으로</span>
                </Link>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">
                {/* Title Section */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold bg-red-500/10 text-red-300 border border-red-500/30 rounded-full">
                            <Calendar className="w-3.5 h-3.5 text-red-400" />
                            2026년 7월 10일
                        </span>
                        <span className="px-3.5 py-1 text-xs font-bold bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-full">
                            🔥 테섭 긴급 분석
                        </span>
                        <span className="px-3.5 py-1 text-xs font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded-full">
                            인벤 게시판 실측 데이터
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight break-keep">
                        <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                            전사 직업군 신규 6차 스킬,
                        </span>
                        <br />
                        <span className="text-slate-200 text-2xl sm:text-3xl font-bold">
                            유저들은 어떻게 반응했나
                        </span>
                    </h1>

                    <p className="text-base md:text-lg text-slate-400 mb-8 leading-relaxed break-keep border-l-4 border-red-500 pl-5 py-2 bg-red-950/10 rounded-r-lg">
                        2026년 7월 9일 오후 4시, 테스트서버 1.2.203 업데이트와 함께 전 직업 신규 6차 스킬이 공개되었습니다.
                        전사 13개 직업의 인벤 직업 게시판을 <span className="text-white font-bold">실시간 크롤링 후 필터링</span>한 실측 여론을 할루시네이션 없이 정리합니다.
                    </p>

                    {/* 방법론 안내 */}
                    <div className="bg-slate-900/40 border border-slate-700/60 rounded-2xl p-5 backdrop-blur-sm mb-8">
                        <p className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                            <Info className="w-4 h-4 text-blue-400" />
                            📌 데이터 수집 방법론
                        </p>
                        <ul className="text-xs sm:text-sm text-slate-400 space-y-1.5 pl-4 border-l border-slate-700">
                            <li>• 인벤 메이플스토리 전사 직업 게시판 (board ID: 2294) 직접 크롤링</li>
                            <li>• 7월 9일 오후 4시 테섭 업데이트 이후 작성된 게시글만 필터링 (post ID ≥ 455730)</li>
                            <li>• 13개 직업 각각 최소 13건 ~ 최대 49건의 게시글 제목 실측</li>
                            <li>• 본문 내용은 보안 시스템으로 직접 수집 불가 — 제목 키워드 및 공개된 전분 수치 데이터 교차 분석</li>
                        </ul>
                    </div>

                    {/* 전체 분위기 한눈에 보기 */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                        <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-4 text-center">
                            <div className="text-2xl font-black text-red-400 mb-1">3개</div>
                            <div className="text-xs text-slate-400 mb-1">극심한 불만</div>
                            <div className="text-[10px] text-red-300">다크나이트, 카이저, 렌</div>
                        </div>
                        <div className="bg-orange-950/20 border border-orange-900/50 rounded-xl p-4 text-center">
                            <div className="text-2xl font-black text-orange-400 mb-1">4개</div>
                            <div className="text-xs text-slate-400 mb-1">불만 우세</div>
                            <div className="text-[10px] text-orange-300">히어로, 미하일, 블래스터, 데몬어벤져</div>
                        </div>
                        <div className="bg-yellow-950/20 border border-yellow-900/50 rounded-xl p-4 text-center">
                            <div className="text-2xl font-black text-yellow-400 mb-1">5개</div>
                            <div className="text-xs text-slate-400 mb-1">아쉬움/호불호</div>
                            <div className="text-[10px] text-yellow-300">팔라딘, 소울마스터, 아델, 데슬, 제로</div>
                        </div>
                        <div className="bg-green-950/20 border border-green-900/50 rounded-xl p-4 text-center">
                            <div className="text-2xl font-black text-green-400 mb-1">1개</div>
                            <div className="text-xs text-slate-400 mb-1">호평 (버그 제외)</div>
                            <div className="text-[10px] text-green-300">아란 (코강 버그 수정 전제)</div>
                        </div>
                    </div>
                </div>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* 직업별 상세 반응 */}
                <section className="mb-14">
                    <div className="flex flex-col gap-2 mb-8 border-b border-slate-800 pb-4">
                        <div className="flex items-center gap-3">
                            <Swords className="w-6 h-6 text-red-400" />
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                                직업별 상세 여론 분석
                            </h2>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                            📸 <span className="font-bold text-slate-300">이미지 출처:</span> 본문 내 스킬 설명 이미지는 네이버 블로그 <a href="https://blog.naver.com/seotbeo" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline font-semibold">섣버의 메이플월드</a>의 자료를 참고 및 인용하였습니다.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {jobReactions.map((job, idx) => (
                            <div
                                key={job.job}
                                id={`job-${job.job}`}
                                className={`rounded-2xl border p-6 sm:p-8 backdrop-blur-sm shadow-lg scroll-mt-24 ${job.bgClass} ${job.borderClass} relative overflow-hidden`}
                            >
                                {/* 배경 번호 */}
                                <div className="absolute top-4 right-6 text-7xl font-black text-slate-800/25 select-none pointer-events-none leading-none">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>

                                {/* 직업 헤더 */}
                                <div className="flex flex-wrap items-start gap-3 mb-5">
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className={`text-lg sm:text-xl font-black ${job.colorClass}`}>
                                                {job.job}
                                            </h3>
                                            <span className="text-slate-500 text-sm">—</span>
                                            <span className="text-slate-400 text-sm italic">{job.skill}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                                            <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold border rounded-full ${getSentimentBadgeClass(job.sentiment)}`}>
                                                {getSentimentIcon(job.sentiment)}
                                                {job.sentimentLabel}
                                            </span>
                                            {job.dilRate && (
                                                <span className="px-3 py-1 text-xs bg-slate-900/50 text-slate-400 border border-slate-700/50 rounded-full">
                                                    딜 상승 {job.dilRate}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* 6차 스킬 설명 툴팁 이미지 (설명 텍스트 판독을 위해 원본 크기 비율로 노출) */}
                                {job.icon && (
                                    <div className="mb-6 rounded-xl border border-slate-800/80 bg-slate-950/50 p-4 max-w-2xl overflow-hidden shadow-inner flex flex-col gap-2">
                                        <span className="text-xs text-purple-400 font-bold flex items-center gap-1">
                                            🖼️ 패치노트 신규 스킬 상세 명세 (툴팁 원본비율)
                                        </span>
                                        <div className="overflow-x-auto">
                                            <img
                                                src={job.icon}
                                                alt={`${job.job} ${job.skill} 스킬 상세 설명`}
                                                className="h-auto rounded-lg max-w-none sm:max-w-full select-none"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* 핵심 쟁점 */}
                                <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl px-4 py-3 mb-4 flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-xs font-bold text-amber-300 block mb-0.5">핵심 쟁점</span>
                                        <span className="text-sm text-slate-300">{job.keyIssue}</span>
                                    </div>
                                </div>

                                {/* 실측 게시글 제목 */}
                                <div className="mb-5">
                                    <p className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        인벤 게시판 실측 제목
                                    </p>
                                    <div className="space-y-1.5">
                                        {job.posts.map((post, i) => (
                                            <div
                                                key={i}
                                                className="text-xs text-slate-400 bg-slate-950/40 border border-slate-800/40 rounded-lg px-3 py-2 font-mono"
                                            >
                                                &ldquo;{post}&rdquo;
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 요약 */}
                                <div className="text-sm sm:text-base text-slate-300 leading-relaxed break-keep">
                                    {job.summary}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* 총평 */}
                <section id="conclusion" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <Shield className="w-6 h-6 text-purple-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                            총평: 1차 테섭 전사 직업군의 전반적인 평가
                        </h2>
                    </div>

                    <div className="text-slate-200 space-y-5 text-sm sm:text-base leading-relaxed break-keep">
                        <p>
                            오늘 공개된 전사 13개 직업 신규 6차 스킬 1차 인벤 여론을 종합하면,
                            <span className="text-red-300 font-bold"> 전반적으로 혹평이 많습니다</span>.
                            13개 중 3개는 극심한 불만(다크나이트, 카이저, 렌), 4개는 불만 우세, 5개는 아쉬움/호불호,
                            명확한 호평은 아란 1개(코강 버그 수정 전제)에 불과합니다.
                        </p>

                        <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-5">
                            <p className="font-bold text-red-300 mb-3">🔴 공통된 불만 패턴 3가지</p>
                            <ol className="space-y-3 text-slate-300">
                                <li className="flex gap-2">
                                    <span className="text-red-400 font-bold shrink-0">1.</span>
                                    <span><span className="text-white font-bold">실망스러운 딜 상승폭</span> — 대부분의 직업이 신스킬 딜 점유율이 2~4%대에 그쳐 체감 딜 상승이 미미합니다.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-red-400 font-bold shrink-0">2.</span>
                                    <span><span className="text-white font-bold">키다운 방식의 범람</span> — 키다운 스킬에 대한 부정적인 시선이 많습니다. (딜이 강하지 않고, 원래 사용하던 스킬이 사용이 안되는 현상 등등)</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-red-400 font-bold shrink-0">3.</span>
                                    <span><span className="text-white font-bold">직업 정체성 및 고유 테크닉 무시</span> — 블래스터는 캔슬 직업인데 캔슬 불가, 데몬어벤져는 데스페라도 직업인데 창 이펙트, 소울마스터는 사출기를 원했는데 연타 액티브, 제로는 굴렁쇠, 렌은 망혼검 스택 모으기 테크닉을 억지로 금지하는 등 직업의 핵심 정체성과 조작 자유도를 망친 설계라는 지적이 지배적입니다.</span>
                                </li>
                            </ol>
                        </div>

                        <div className="bg-green-950/20 border border-green-900/50 rounded-xl p-5">
                            <p className="font-bold text-green-300 mb-3">🟢 그래도 긍정적인 신호</p>
                            <ul className="space-y-2 text-slate-300 pl-4">
                                <li>• 이것은 <span className="text-white font-bold">1차 테스트서버</span>입니다. 본서버까지 추가 밸런스 패치가 진행될 가능성이 높습니다.</li>
                                <li>• 아란의 고질적인 사신수 이펙트 문제가 이번 6차 스킬에서 호평을 얻었습니다. 비주얼 퀄리티 자체는 수정의 여지가 있을 것으로 예상합니다.</li>
                                <li>• 인벤 유저들의 구체적인 수치 분석(환산 데이터, 딜사이클 시뮬레이션 등)이 빠르게 올라오고 있어, 개발진이 피드백을 반영하기 위한 근거 데이터가 축적되고 있어 개선될 여지가 있습니다.</li>
                            </ul>
                        </div>

                        <p className="text-slate-500 text-xs border-t border-slate-800 pt-4">
                            ※ 본 분석은 2026년 7월 9일 오후 4시 이후 인벤 전사 직업 게시판에 올라온 실제 게시글 제목을 크롤링·필터링한 데이터를 기반으로 작성되었습니다.
                            본문 내용은 보안 시스템으로 인해 직접 수집이 불가하여 제목 키워드와 공개된 전분(전투분석) 수치를 교차 분석하였습니다.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
