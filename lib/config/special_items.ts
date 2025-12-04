/**
 * 특수 아이템 중앙 설정
 * 
 * 이 파일에서 특수 아이템의 모든 진단 메시지를 한 곳에서 관리합니다.
 * 수정이 필요할 때 여기만 변경하면 단풍이 AI, 진화형 AI, 정밀 진단 리포트가 모두 업데이트됩니다.
 */

export interface SpecialItemConfig {
    /** 아이템 이름 (포함 검색용) */
    itemName: string;

    /** 표시 이름 */
    displayName: string;

    /** 카테고리 */
    category: 'special_ring' | 'seed_ring' | 'event_ring' | 'no_enhance' | 'other';

    /** AI 단풍이 코멘트 (랜덤으로 하나 선택됨) */
    danpungiComments: string[];

    /** 진화형 AI 코멘트 */
    hexaComment: string;

    /** 정밀 진단 리포트 */
    detailedDiagnosis?: {
        potential?: {
            grade: '특수' | '레어' | '에픽' | '유니크' | '레전드리';
            evaluation: string;
            recommendation: string;
            goodOptions?: string[];
            score?: number;
        };
        additionalPotential?: {
            grade: '특수' | '레어' | '에픽' | '유니크' | '레전드리';
            evaluation: string;
            recommendation: string;
            goodOptions?: string[];
            score?: number;
        };
    };

    /** 제외할 분석 섹션 */
    skipSections?: {
        starforce?: boolean;
        flame?: boolean;
        potential?: boolean;
        additionalPotential?: boolean;
    };
}

/**
 * 특수 아이템 설정 목록
 * 
 * 새로운 특수 아이템을 추가할 때는 이 배열에 추가하면 됩니다.
 */
export const SPECIAL_ITEMS: SpecialItemConfig[] = [
    // 어드벤처 딥다크 크리티컬 링
    {
        itemName: '어드벤처 딥다크 크리티컬 링',
        displayName: '어드벤처 딥다크 크리티컬 링',
        category: 'special_ring',
        danpungiComments: [
            '<b>크리티컬 확률 +15%, 크리티컬 데미지 +5%</b>의 자체 옵션이 내장되어 있습니다. 궁수 직업군에게 준수한 효율을 냅니다.',
            '크리티컬 성능이 중요한 직업에게 <b>준수한 효율</b>을 내는 아이템입니다. 특히 궁수 직업군에게 추천합니다.',
            '잠재능력은 없지만 <b>자체 옵션(크확 15%, 크뎀 5%)</b>으로 충분히 실전적인 성능을 발휘합니다.'
        ],
        hexaComment: '**[특수 링]** 자체 옵션이 우수한 특수 반지입니다. (스타포스/주문서/잠재 불가능)',
        detailedDiagnosis: {
            potential: {
                grade: '특수',
                evaluation: '좋음',
                recommendation: '잠재능력 설정이 불가능하지만, 기본 옵션(크확 15%, 크뎀 5%)이 매우 훌륭합니다. 특히 크리티컬 확률이 중요한 궁수 직업군에게 준수한 효율을 냅니다.',
                goodOptions: ['크리티컬 확률 +15%', '크리티컬 데미지 +5%'],
                score: 100
            },
            additionalPotential: {
                grade: '특수',
                evaluation: '통과',
                recommendation: '자체 성능만으로도 꽤 준수한 아이템으로 그대로 사용해도 좋습니다. 다만 더 높은 스펙업을 원한다면 링 교체도 생각해보는 것이 좋습니다.',
                goodOptions: [],
                score: 100
            }
        },
        skipSections: {
            starforce: true,
            flame: true,
            potential: true,
            additionalPotential: false
        }
    },

    // 어비스 헌터스 링
    {
        itemName: '어비스 헌터스 링',
        displayName: '어비스 헌터스 링',
        category: 'special_ring',
        danpungiComments: [
            '<b>사냥 전용 링</b>입니다. 보스전에서는 다른 반지로 교체하세요.',
            '일반 몬스터 사냥에 특화된 링입니다. 보스전용 링과 교체해서 사용하세요.',
            '사냥할 때 착용하는 특수 반지입니다.'
        ],
        hexaComment: '**[사냥 전용 링]** 일반 몬스터 사냥용 특수 반지입니다. (스타포스/주문서/잠재 불가능)',
        detailedDiagnosis: {
            potential: {
                grade: '특수',
                evaluation: '좋음',
                recommendation: '사냥 전용 링입니다. 보스전에서는 다른 반지로 교체하세요.',
                goodOptions: ['일반 몬스터 공격 시 데미지 증가'],
                score: 100
            },
            additionalPotential: {
                grade: '특수',
                evaluation: '통과',
                recommendation: '사냥 전용 링입니다. 보스전에서는 다른 반지로 교체하세요.',
                goodOptions: [],
                score: 100
            }
        },
        skipSections: {
            starforce: true,
            flame: true,
            potential: true,
            additionalPotential: false
        }
    },

    // SS급 마스터 쥬얼링
    {
        itemName: 'SS급 마스터 쥬얼링',
        displayName: 'SS급 마스터 쥬얼링',
        category: 'special_ring',
        danpungiComments: [
            '<b>스타포스가 불가능한</b> 특수 반지입니다. 잠재능력만 설정 가능합니다.',
            '이벤트로 획득 가능한 특수 반지입니다. 스타포스 강화는 불가능합니다.',
            '잠재능력 설정이 가능한 특수 반지입니다.'
        ],
        hexaComment: '**[특수 링]** 스타포스가 불가능한 이벤트 반지입니다. (잠재능력 설정 가능)',
        detailedDiagnosis: {
            potential: {
                grade: '특수',
                evaluation: '통과',
                recommendation: '스타포스가 불가능한 특수 반지입니다. 잠재능력에 집중하세요.',
                goodOptions: [],
                score: 100
            },
            additionalPotential: {
                grade: '특수',
                evaluation: '통과',
                recommendation: '스타포스가 불가능한 특수 반지입니다. 에디셔널 잠재능력에 집중하세요.',
                goodOptions: [],
                score: 100
            }
        },
        skipSections: {
            starforce: true,
            flame: true,
            potential: false,
            additionalPotential: false
        }
    },

    // 리스트레인트 링
    {
        itemName: '리스트레인트 링',
        displayName: '리스트레인트 링',
        category: 'seed_ring',
        danpungiComments: [
            '<b>극딜의 핵심</b>, 리스트레인트 링입니다. 레벨이 높을수록 강력한 효율을 냅니다.',
            '보스전 필수 아이템입니다. 높은 레벨일수록 좋습니다.',
            '전서버급 스펙을 위한 필수 반지입니다.'
        ],
        hexaComment: '**[시드 링]** 극딜 타임의 핵심, 리스트레인트 링입니다. (특수 스킬 반지)',
        detailedDiagnosis: {
            potential: { grade: '특수', evaluation: '통과', recommendation: '잠재능력 설정 불가', goodOptions: [], score: 100 },
            additionalPotential: { grade: '특수', evaluation: '통과', recommendation: '에디셔널 설정 불가', goodOptions: [], score: 100 }
        },
        skipSections: { starforce: true, flame: true, potential: true, additionalPotential: true }
    },

    // 웨폰퍼프 링
    {
        itemName: '웨폰퍼프',
        displayName: '웨폰퍼프 링',
        category: 'seed_ring',
        danpungiComments: [
            '<b>주스탯을 공격력/마력으로 전환</b>해주는 강력한 반지입니다.',
            '리레링 다음으로 많이 사용되는 시드링입니다.',
            '스펙에 따라 리레링보다 효율이 좋을 수도 있습니다.'
        ],
        hexaComment: '**[시드 링]** 주스탯 효율을 극대화하는 웨폰퍼프 링입니다. (특수 스킬 반지)',
        detailedDiagnosis: {
            potential: { grade: '특수', evaluation: '통과', recommendation: '잠재능력 설정 불가', goodOptions: [], score: 100 },
            additionalPotential: { grade: '특수', evaluation: '통과', recommendation: '에디셔널 설정 불가', goodOptions: [], score: 100 }
        },
        skipSections: { starforce: true, flame: true, potential: true, additionalPotential: true }
    },

    // 리스크테이커 링
    {
        itemName: '리스크테이커 링',
        displayName: '리스크테이커 링',
        category: 'seed_ring',
        danpungiComments: [
            '<b>피격되지 않는 조건</b>하에 강력한 공/마 증가 효과를 줍니다.',
            '무적기가 있거나 컨트롤이 좋은 경우 유용한 반지입니다.',
            '리스크가 있지만 리턴도 확실한 반지입니다.'
        ],
        hexaComment: '**[시드 링]** 하이 리스크 하이 리턴, 리스크테이커 링입니다. (특수 스킬 반지)',
        detailedDiagnosis: {
            potential: { grade: '특수', evaluation: '통과', recommendation: '잠재능력 설정 불가', goodOptions: [], score: 100 },
            additionalPotential: { grade: '특수', evaluation: '통과', recommendation: '에디셔널 설정 불가', goodOptions: [], score: 100 }
        },
        skipSections: { starforce: true, flame: true, potential: true, additionalPotential: true }
    },

    // 컨티뉴어스 링
    {
        itemName: '컨티뉴어스 링',
        displayName: '컨티뉴어스 링',
        category: 'seed_ring',
        danpungiComments: [
            '<b>지속적인 딜링</b>에 특화된 반지입니다. 보스전에서 꾸준한 딜 상승을 보장합니다.',
            '평딜 비중이 높은 직업에게 추천하는 반지입니다.',
            '가동률이 매우 높은 시드링입니다.'
        ],
        hexaComment: '**[시드 링]** 지속 딜링의 핵심, 컨티뉴어스 링입니다. (특수 스킬 반지)',
        detailedDiagnosis: {
            potential: { grade: '특수', evaluation: '통과', recommendation: '잠재능력 설정 불가', goodOptions: [], score: 100 },
            additionalPotential: { grade: '특수', evaluation: '통과', recommendation: '에디셔널 설정 불가', goodOptions: [], score: 100 }
        },
        skipSections: { starforce: true, flame: true, potential: true, additionalPotential: true }
    },

    // 테네브리스 원정대 반지
    {
        itemName: '테네브리스 원정대 반지',
        displayName: '테네브리스 원정대 반지',
        category: 'event_ring',
        danpungiComments: [
            '<b>스타포스가 불가능한</b> 이벤트 반지입니다. 전용 주문서로 강화됩니다.',
            '최상급 이벤트 반지입니다. 스타포스 강화는 불가능합니다.',
            '잠재능력 설정이 가능한 1티어 이벤트 반지입니다.'
        ],
        hexaComment: '**[이벤트 링]** 스타포스가 불가능한 최상급 이벤트 반지입니다.',
        detailedDiagnosis: {
            potential: { grade: '특수', evaluation: '통과', recommendation: '잠재능력에 집중하세요.', goodOptions: [], score: 100 },
            additionalPotential: { grade: '특수', evaluation: '통과', recommendation: '에디셔널 잠재능력에 집중하세요.', goodOptions: [], score: 100 }
        },
        skipSections: { starforce: true, flame: true, potential: false, additionalPotential: false }
    },

    // 어웨이크 링
    {
        itemName: '어웨이크 링',
        displayName: '어웨이크 링',
        category: 'event_ring',
        danpungiComments: [
            '<b>스타포스가 불가능한</b> 이벤트 반지입니다. 전용 주문서로 강화됩니다.',
            '최상급 이벤트 반지입니다. 스타포스 강화는 불가능합니다.',
            '잠재능력 설정이 가능한 1티어 이벤트 반지입니다.'
        ],
        hexaComment: '**[이벤트 링]** 스타포스가 불가능한 최상급 이벤트 반지입니다.',
        detailedDiagnosis: {
            potential: { grade: '특수', evaluation: '통과', recommendation: '잠재능력에 집중하세요.', goodOptions: [], score: 100 },
            additionalPotential: { grade: '특수', evaluation: '통과', recommendation: '에디셔널 잠재능력에 집중하세요.', goodOptions: [], score: 100 }
        },
        skipSections: { starforce: true, flame: true, potential: false, additionalPotential: false }
    },

    // 글로리온 링
    {
        itemName: '글로리온 링',
        displayName: '글로리온 링',
        category: 'event_ring',
        danpungiComments: [
            '<b>스타포스가 불가능한</b> 이벤트 반지입니다. 전용 주문서로 강화됩니다.',
            '최상급 이벤트 반지입니다. 스타포스 강화는 불가능합니다.',
            '잠재능력 설정이 가능한 1티어 이벤트 반지입니다.'
        ],
        hexaComment: '**[이벤트 링]** 스타포스가 불가능한 최상급 이벤트 반지입니다.',
        detailedDiagnosis: {
            potential: { grade: '특수', evaluation: '통과', recommendation: '잠재능력에 집중하세요.', goodOptions: [], score: 100 },
            additionalPotential: { grade: '특수', evaluation: '통과', recommendation: '에디셔널 잠재능력에 집중하세요.', goodOptions: [], score: 100 }
        },
        skipSections: { starforce: true, flame: true, potential: false, additionalPotential: false }
    },

    // 이터널 플레임 링
    {
        itemName: '이터널 플레임 링',
        displayName: '이터널 플레임 링',
        category: 'event_ring',
        danpungiComments: [
            '<b>스타포스가 불가능한</b> 이벤트 반지입니다. 전용 주문서로 강화됩니다.',
            '최상급 이벤트 반지입니다. 스타포스 강화는 불가능합니다.',
            '잠재능력 설정이 가능한 1티어 이벤트 반지입니다.'
        ],
        hexaComment: '**[이벤트 링]** 스타포스가 불가능한 최상급 이벤트 반지입니다.',
        detailedDiagnosis: {
            potential: { grade: '특수', evaluation: '통과', recommendation: '잠재능력에 집중하세요.', goodOptions: [], score: 100 },
            additionalPotential: { grade: '특수', evaluation: '통과', recommendation: '에디셔널 잠재능력에 집중하세요.', goodOptions: [], score: 100 }
        },
        skipSections: { starforce: true, flame: true, potential: false, additionalPotential: false }
    },

    // 카오스 링
    {
        itemName: '카오스 링',
        displayName: '카오스 링',
        category: 'event_ring',
        danpungiComments: [
            '<b>스타포스가 불가능한</b> 이벤트 반지입니다. 매주 옵션 재설정이 가능합니다.',
            '추가옵션과 잠재능력을 재설정할 수 있는 특수 반지입니다.',
            '잠재능력 설정이 가능한 이벤트 반지입니다.'
        ],
        hexaComment: '**[이벤트 링]** 스타포스가 불가능한 이벤트 반지입니다. (옵션 재설정 가능)',
        detailedDiagnosis: {
            potential: { grade: '특수', evaluation: '통과', recommendation: '잠재능력에 집중하세요.', goodOptions: [], score: 100 },
            additionalPotential: { grade: '특수', evaluation: '통과', recommendation: '에디셔널 잠재능력에 집중하세요.', goodOptions: [], score: 100 }
        },
        skipSections: { starforce: true, flame: false, potential: false, additionalPotential: false }
    },

    // 결속의 반지
    {
        itemName: '결속의 반지',
        displayName: '결속의 반지',
        category: 'event_ring',
        danpungiComments: [
            '<b>스타포스가 불가능한</b> 이벤트 반지입니다. 월드 내 착용 캐릭터 수에 따라 옵션이 증가합니다.',
            '5캐릭 착용 시 최대 효율을 내는 반지입니다.',
            '잠재능력 설정이 가능한 이벤트 반지입니다.'
        ],
        hexaComment: '**[이벤트 링]** 스타포스가 불가능한 이벤트 반지입니다. (세트 효과 보유)',
        detailedDiagnosis: {
            potential: { grade: '특수', evaluation: '통과', recommendation: '잠재능력에 집중하세요.', goodOptions: [], score: 100 },
            additionalPotential: { grade: '특수', evaluation: '통과', recommendation: '에디셔널 잠재능력에 집중하세요.', goodOptions: [], score: 100 }
        },
        skipSections: { starforce: true, flame: true, potential: false, additionalPotential: false }
    },

    // 오닉스 링
    {
        itemName: '오닉스 링',
        displayName: '오닉스 링',
        category: 'event_ring',
        danpungiComments: [
            '<b>스타포스가 불가능한</b> 특수 반지입니다. 성장형 반지입니다.',
            '특정 조건 만족 시 성장하는 반지입니다.',
            '잠재능력 설정이 불가능한 특수 반지입니다.'
        ],
        hexaComment: '**[특수 링]** 스타포스와 잠재능력 설정이 불가능한 특수 반지입니다.',
        detailedDiagnosis: {
            potential: { grade: '특수', evaluation: '통과', recommendation: '잠재능력 설정 불가', goodOptions: [], score: 100 },
            additionalPotential: { grade: '특수', evaluation: '통과', recommendation: '에디셔널 설정 불가', goodOptions: [], score: 100 }
        },
        skipSections: { starforce: true, flame: true, potential: true, additionalPotential: true }
    }

    // 여기에 새로운 특수 아이템 추가 가능
];

/**
 * 아이템 이름으로 특수 아이템 설정 찾기
 */
export function getSpecialItemConfig(itemName: string): SpecialItemConfig | null {
    return SPECIAL_ITEMS.find(item => itemName.includes(item.itemName)) || null;
}

/**
 * 특수 아이템인지 확인
 */
export function isSpecialItem(itemName: string): boolean {
    return SPECIAL_ITEMS.some(item => itemName.includes(item.itemName));
}

/**
 * 랜덤 코멘트 선택
 */
export function pickRandomComment(comments: string[]): string {
    return comments[Math.floor(Math.random() * comments.length)];
}
