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
