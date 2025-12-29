export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    category: string;
    date: string;
    readTime: string;
    thumbnail: string;
    featured?: boolean;
}

export const blogPosts: BlogPost[] = [
    // 긴급 공지
    {
        slug: 'maple-npc-rewards-2025',
        title: '⏰ 놓치지 마세요! 메이플 운영자 NPC 보상 마감 임박 (12/31까지)',
        description: 'CROWN 쇼케이스 선물과 극한 성장의 비약을 받을 수 있는 마지막 기회! 12월 31일까지 꼭 받으세요!',
        category: '이벤트 가이드',
        date: '2025년 12월 29일',
        readTime: '3분',
        thumbnail: '🎁',
        featured: true,
    },
    // 육성 가이드
    {
        slug: 'hyperburning-jobs-2025',
        title: '🎬 유튜버 6명이 입 모아 외친 "그 직업". 2025 겨울 하이퍼버닝 추천 직업 통합 분석 (종결판)',
        description: '메친놈, 슈크림메이플, 물다이아, 페이지, 글자네 등 유튜버 6명의 분석 종합! 12월 18일 챌린저스 월드 시즌 3, 어떤 직업을 키워야 할까?',
        category: '육성 가이드',
        date: '2025년 12월 11일',
        readTime: '15분',
        thumbnail: '🔥',
        featured: false,
    },
    {
        slug: 'crown-hyperburning-guide-2025',
        title: '🔥 [2025 메이플] 크라운 하이퍼버닝 & 아이템 버닝 완벽 가이드: "이 순서 모르면 손해 봅니다!"',
        description: '정령의 펜던트 순서, 자석펫 사용법, 딸기 농장 활용까지! 260레벨까지 최단 시간 달성을 위한 필수 체크리스트.',
        category: '육성 가이드',
        date: '2025년 12월 15일',
        readTime: '12분',
        thumbnail: '🔥',
    },
    {
        slug: 'beginner-guide-2025',
        title: '유니온 + 링크부터 200레벨 초고속 육성까지! 완벽 내실 가이드',
        description: '유니온 6000, 링크스킬, 아티팩트까지! 200레벨 4-6시간 달성하는 초고속 육성법과 내실 완벽 가이드.',
        category: '육성 가이드',
        date: '2025년 12월 11일',
        readTime: '20분',
        thumbnail: '⚔️',
    },
    {
        slug: 'hyperburning-jobs-2025-v2',
        title: '🎮 데이터로 증명된 2025 하이퍼버닝 직업 추천 v2.0 (하이브리드 랭킹)',
        description: 'AI, 유튜버, 일반인 인식, 고점 데이터를 모두 섞었다! 4가지 모드로 분석한 가장 완벽한 직업 추천 가이드.',
        category: '육성 가이드',
        date: '2025년 12월 12일',
        readTime: '10분',
        thumbnail: '🚀',
    },
    {
        slug: 'monsterpark-2025',
        title: '🎮 몬스터파크 극한 효율 가이드 - 레벨별 최적 사냥터 완벽 분석',
        description: '260~299 레벨 구간별로 몬스터파크에서 얻을 수 있는 경험치 효율을 완벽하게 정리! 당신의 레벨에 맞는 최적의 사냥터를 찾아보세요.',
        category: '경험치 가이드',
        date: '2025년 12월 13일',
        readTime: '12분',
        thumbnail: '🎯',
    },
    {
        slug: 'free-to-play-guide',
        title: '완전 무자본 200레벨 육성 가이드 - 0메소, 이벤트 없이도 가능!',
        description: '본캐 지원 없이, 이벤트 없이, 0메소로 시작해서 200레벨 달성하는 완벽 퀘스트 육성 가이드. 3시간 30분이면 충분!',
        category: '육성 가이드',
        date: '2025년 12월 11일',
        readTime: '15분',
        thumbnail: '💚',
    },
    // 이벤트 가이드
    {
        slug: 'boss-memory-calculator',
        title: '⚔️ 보스 코인 계산기 & 코인샵 - 보스 선택부터 쇼핑까지!',
        description: '13주 동안의 보스 처치 계획을 세우고, 획득한 환영의 기억으로 바로 쇼핑! 주차별 선택, 자동 합산, 장바구니까지 한 페이지에서 모두 해결하세요.',
        category: '이벤트 가이드',
        date: '2025년 12월 15일',
        readTime: '5분',
        thumbnail: '/images/boss-coin.png',
    },
    {
        slug: 'challengers-world-calculator',
        title: '⚔️ 챌린저스 월드 티어 & 코인 계산기 - 나의 티어를 실시간으로 확인하세요!',
        description: '레벨, 보스, 사냥 미션을 입력하고 챌린저스 포인트와 코인을 자동 계산! 브론즈부터 챌린저까지, 다음 티어까지 얼마나 남았는지 한눈에 확인하세요.',
        category: '이벤트 가이드',
        date: '2025년 12월 15일',
        readTime: '5분',
        thumbnail: '/images/challengers-coin.png',
    },
    {
        slug: 'genesis-liberation-calculator',
        title: '⚔️ 제네시스 무기 해방 계산기 - 챌린저스 시즌3 완벽 가이드',
        description: '주차별 보스 격파 스케줄을 설정하고 17주 안에 제네시스 무기 해방을 완료할 수 있을지 정확하게 계산하세요! 이지부터 하드까지, 월간 보스까지 모두 고려한 정밀 계산.',
        category: '이벤트 가이드',
        date: '2025년 12월 17일',
        readTime: '5분',
        thumbnail: '/images/genesis-weapon.png',
    },
    {
        slug: 'illusion-coin-shop',
        title: '👻 일루전 일반 코인샵 - 환영이 내리는 밤',
        description: '조사 미션으로 획득한 일루전 코인으로 구매 가능한 26가지 아이템(강화/성장)을 확인하고, 필요한 코인을 미리 계획하세요!',
        category: '이벤트 가이드',
        date: '2025년 12월 15일',
        readTime: '3분',
        thumbnail: '/images/illusion-coin.png',
    },
    {
        slug: 'crown-winter-showcase-2025',
        title: '👑 메이플스토리 겨울 쇼케이스 "크라운" 완벽 예측: 어셈블을 넘어 정점으로',
        description: '12월 13일 공개되는 겨울 쇼케이스 "크라운"을 심층 분석! Lv.290 시대, 신규 지역, 6차 전직 완성까지 모든 것을 예측합니다.',
        category: '업데이트 소식',
        date: '2025년 12월 13일',
        readTime: '15분',
        thumbnail: '👑',
    },
    // 장비 가이드
    {
        slug: '/guide/boss-equipment-progression',
        title: '보스 장비 진행도 - 펜살리르부터 22성까지',
        description: '초보자부터 고수까지, 단계별 보스 장비 세팅 가이드. 다음에 뭘 맞춰야 할지 한눈에!',
        category: '장비 가이드',
        date: '2025년 11월 15일',
        readTime: '10분',
        thumbnail: '🛡️',
    },
    {
        slug: '/guide/starforce-efficiency-guide',
        title: '스타포스 효율 가이드 - 언제 강화해야 할까?',
        description: '5/10/15 이벤트, 30% 할인, 스타캐치까지! 스타포스 강화 타이밍과 기댓값을 완벽 분석.',
        category: '장비 가이드',
        date: '2025년 11월 20일',
        readTime: '12분',
        thumbnail: '⭐',
    },
    {
        slug: '/guide/bonus-stat-guide',
        title: '추가옵션 완벽 가이드 - 환생의 불꽃부터 큐브까지',
        description: '장비별 추가옵션 티어와 목표 스탯. 어떤 옵션이 좋은지, 언제 재작해야 하는지 알려드립니다!',
        category: '장비 가이드',
        date: '2025년 11월 28일',
        readTime: '15분',
        thumbnail: '🔥',
    },
    {
        slug: '/guide/cooltime-hat-guide',
        title: '쿨타임 모자 완벽 가이드 - 쿨감의 모든 것',
        description: '쿨타임 감소 모자 획득법과 효율 분석. 내 직업에 쿨감모가 필요한지 알아보세요!',
        category: '장비 가이드',
        date: '2025년 11월 28일',
        readTime: '8분',
        thumbnail: '🎩',
    },
];
