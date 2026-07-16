'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowLeft, Sparkles, Zap, AlertCircle, CheckCircle, TrendingDown, Swords, ArrowRight } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

// 🔴 너프/감소 키워드
const NERF_KEYWORDS = [
    '데미지 감소',
    '데미지 하향',
    '하향 조정',
    '임프린트 및 임프린트 VI의 최종 데미지 비율 조정',
    '지속 시간 감소',
];

// 🟢 버프/상향 키워드
const BUFF_KEYWORDS = [
    'V매트릭스 강화 코어 효과를 적용받지 않도록',
    'V매트릭스 강화 코어 효과 미적용',
    '몬스터 방어율 추가 무시',
    '재사용 대기시간이 60초에서 120초로 증가',
    '추가 무시(방무)',
    '최종 데미지 증가 기능 추가',
    '창룡파천검 : 만참: 승화 사용 시 재발동 대기시간이 즉시 초기화되도록 수정',
    '재발동 대기시간이 즉시 초기화',
    '재사용 대기시간 삭제',
    '시전 동작 없이 사용할 수 있는 기능 추가',
    '게더링과 블로섬을 딜레이(시전 동작) 없이 즉시 시전할 수 있게 편의성 개선',
    '딜레이(시전 동작) 없이 즉시 시전',
    'HP 회복을 차단하는 기능 추가',
    '렐릭 게이지를 소비하지 않고 MP를 소비하도록',
    '자동 사용 모드 추가',
    '심연의 가시가 발동되도록 수정',
    '조디악 레이 지속 시간 동안 1회만 사용할 수 있게 변경',
    '글로리 윙 지속 시간 중 이그니션 적중 시 발동으로 변경',
    '데미지 상향',
    '범위 116% 증가',
    '공격 범위 약 13% 증가',
    '몬스터 첫 탐색 범위 상향: 기존 대비 약 75% 증가',
    '유도 미사일이 적을 추적하는 범위',
    '연계 시전이 가능하도록 변경',
    '키다운 중 윌 오브 소드 : 차지, 윌 오브 소드 : 스트라이크를 연계하여 시전할 수 있게 수정',
    '연계하여 시전할 수 있게',
    '최대 타격 몬스터 수 증가',
    '몬스터 방어율 무시 효과 증가',
    '몬스터 방어율 무시 증가 효과 상향',
    '최대 타격 수 증가',
    '심상 세계의 모습이 일정 확률로 적을 자동 공격하는 기믹 추가',
    '최종 데미지 5% 증가',
    '50% 확률로 적을 자동 공격',
    '자동으로 적을 향해 돌진하도록',
    '사라지지 않고 유지되도록 개선',
    '검풍의 재탐색 범위 기존 대비 약 389% 증가',
    '검풍의 적 탐색 범위 기존 대비 20% 증가',
    '렐릭 마테리아 추가 생성 및 최대 보유 제한량 증가',
    '원초의 낙인이 제거되고',
    '비홀더 데버스테이션이 비홀더 임팩트 지속 중 사용 가능하도록 변경',
    '드래곤 블로우를 발생시키는 연계 기능 추가',
    '스킬 버프 아이콘이 출력되도록',
    '암전 효과가 스킬 이펙트 투명도의 영향을 받도록',
    '최대 HP가 가장 높은 몬스터를 우선 추적하도록 수정',
    '행동 불가 상태 이상이 적용된 보스 몬스터와 충돌 시 반격할 수 있도록 수정',
    '발동 범위 증가',
    '드래곤 블로우를 발생시키는 기능이 추가',
    '반격할 수 있도록 수정',
    '스킬 이펙트 투명도 옵션에 영향을 받지 않도록 수정',
    '스킬 이펙트 투명도 옵션의 영향을 받지 않게 수정',
];

const highlightKeywords = (text: string) => {
    const allKeywords = [
        ...NERF_KEYWORDS.map(k => ({ kw: k, cls: 'text-red-400 font-bold' })),
        ...BUFF_KEYWORDS.map(k => ({ kw: k, cls: 'text-emerald-400 font-bold' })),
    ];

    let currentText: React.ReactNode[] = [text];

    for (const { kw, cls } of allKeywords) {
        const nextText: React.ReactNode[] = [];
        for (const item of currentText) {
            if (typeof item === 'string') {
                const parts = item.split(kw);
                if (parts.length > 1) {
                    parts.forEach((part, idx) => {
                        nextText.push(part);
                        if (idx < parts.length - 1) {
                            nextText.push(<strong key={kw + idx} className={cls}>{kw}</strong>);
                        }
                    });
                } else {
                    nextText.push(item);
                }
            } else {
                nextText.push(item);
            }
        }
        currentText = nextText;
    }

    return <>{currentText}</>;
};

const renderChangeText = (text: string) => {
    // %→% 와 명→명 패턴 모두 감지
    const parts = text.split(/(\d+(?:\.\d+)?(?:%|초)?\s*➔\s*\d+(?:\.\d+)?(?:%|초)?(?:명)?|\d+명\s*➔\s*\d+명)/);
    if (parts.length > 1) {
        return (
            <span>
                {parts.map((part, index) => {
                    if (index % 2 === 1) {
                        const numbers = part.match(/\d+/g);
                        if (numbers && numbers.length === 2) {
                            const val1 = parseInt(numbers[0], 10);
                            const val2 = parseInt(numbers[1], 10);
                            let isIncrease = val2 > val1;
                            if (text.includes('감소') || text.includes('하향') || text.includes('너프') || text.includes('감소합니다')) {
                                isIncrease = false;
                            }
                            return (
                                <strong key={index} className={isIncrease ? 'text-emerald-400 font-black' : 'text-red-400 font-black'}>
                                    {part}
                                </strong>
                            );
                        }
                        return <strong key={index} className="text-yellow-400 font-black">{part}</strong>;
                    }
                    return <span key={index}>{highlightKeywords(part)}</span>;
                })}
            </span>
        );
    }
    return <span>{highlightKeywords(text)}</span>;
};

export default function HexaSkillBalanceJuly16() {
    // 솔 에르다 데이터
    const solErdaTable = [
        { lv: 1, oldS: 7, oldG: 140, newS: 7, newG: 140 },
        { lv: 2, oldS: 1, oldG: 25, newS: 1, newG: 21 },
        { lv: 3, oldS: 1, oldG: 30, newS: 1, newG: 26 },
        { lv: 4, oldS: 1, oldG: 35, newS: 1, newG: 30 },
        { lv: 5, oldS: 2, oldG: 40, newS: 1, newG: 34 },
        { lv: 6, oldS: 2, oldG: 45, newS: 2, newG: 38 },
        { lv: 7, oldS: 2, oldG: 50, newS: 2, newG: 43 },
        { lv: 8, oldS: 3, oldG: 55, newS: 2, newG: 47 },
        { lv: 9, oldS: 3, oldG: 60, newS: 2, newG: 51 },
        { lv: 10, oldS: 9, oldG: 170, newS: 8, newG: 142 },
        { lv: 11, oldS: 3, oldG: 73, newS: 2, newG: 62 },
        { lv: 12, oldS: 3, oldG: 81, newS: 2, newG: 69 },
        { lv: 13, oldS: 3, oldG: 90, newS: 3, newG: 77 },
        { lv: 14, oldS: 3, oldG: 98, newS: 3, newG: 83 },
        { lv: 15, oldS: 4, oldG: 107, newS: 3, newG: 91 },
        { lv: 16, oldS: 4, oldG: 115, newS: 3, newG: 98 },
        { lv: 17, oldS: 4, oldG: 124, newS: 3, newG: 105 },
        { lv: 18, oldS: 4, oldG: 132, newS: 3, newG: 112 },
        { lv: 19, oldS: 4, oldG: 141, newS: 3, newG: 120 },
        { lv: 20, oldS: 13, oldG: 300, newS: 12, newG: 252 },
        { lv: 21, oldS: 4, oldG: 151, newS: 4, newG: 128 },
        { lv: 22, oldS: 5, oldG: 160, newS: 4, newG: 136 },
        { lv: 23, oldS: 5, oldG: 170, newS: 4, newG: 145 },
        { lv: 24, oldS: 5, oldG: 179, newS: 4, newG: 152 },
        { lv: 25, oldS: 5, oldG: 189, newS: 4, newG: 161 },
        { lv: 26, oldS: 5, oldG: 198, newS: 4, newG: 168 },
        { lv: 27, oldS: 5, oldG: 208, newS: 5, newG: 177 },
        { lv: 28, oldS: 5, oldG: 217, newS: 5, newG: 184 },
        { lv: 29, oldS: 6, oldG: 227, newS: 5, newG: 193 },
        { lv: 30, oldS: 16, oldG: 425, newS: 14, newG: 357 }
    ];

    // 직군별 상세 변경점 데이터
    const balanceDetails = [
        {
            group: '⚔️ 전사 직업군',
            borderColor: 'border-red-500/40',
            bgGlow: 'from-red-950/20 to-transparent',
            items: [
                {
                    job: '히어로',
                    changes: ['레이지 익스플로젼: 스킬 설명이 수정됩니다.']
                },
                {
                    job: '다크나이트',
                    changes: [
                        '다크니스 오브 그레이스: 스킬 설명이 수정됩니다.',
                        'V매트릭스 강화 코어 효과를 적용받지 않도록 수정됩니다.',
                        '다크니스 오브 그레이스 : 비홀더 데버스테이션이 비홀더 임팩트 지속 중 사용 가능하도록 변경됩니다.',
                        '비홀더 쇼크, 비홀더 쇼크 VI 사용 중 데버스테이션을 시전 동작 없이 사용할 수 있는 기능 추가',
                        '비홀더 데버스테이션 충격파 데미지 상향: 마스터 레벨 기준 80% ➔ 224%',
                        '비홀더 데버스테이션 암흑 돌풍 데미지 상향: 마스터 레벨 기준 163% ➔ 425%',
                        '비홀더 쇼크 추가타 데미지 상향: 마스터 레벨 기준 288% ➔ 789%',
                        '비홀더스 퍼니시먼트 데미지 상향: 마스터 레벨 기준 191% ➔ 477%',
                        '비홀더스 퍼니시먼트 스킬에 몬스터 방어율 추가 무시(방무) 유틸 추가'
                    ]
                },
                {
                    job: '팔라딘',
                    changes: ['디바인 컨버전스: 연무장에서 리플레이 재생 시 마우스 오버 스킬 설명 미출력 오류 수정']
                },
                {
                    job: '미하일',
                    changes: [
                        '레디언스 오브 발러: 패시브 효과의 용기의 방패가 최대 HP가 가장 높은 몬스터를 우선 추적하도록 수정',
                        '로얄 가드 : 행동 불가 상태 이상이 적용된 보스 몬스터와 충돌 시 반격할 수 있도록 수정'
                    ]
                },
                {
                    job: '아란',
                    changes: [
                        '마하 언리시드: V매트릭스 강화 코어 효과를 적용받지 않도록 수정됩니다.',
                        '비욘더 앱솔루트-현무/주작/청룡 데미지 상향: 마스터 레벨 기준 1062% ➔ 2336%',
                        '비욘더 앱솔루트-현무/주작/청룡의 최대 타격 몬스터 수 증가: 9명 ➔ 10명',
                        '비욘더 앱솔루트-현무/주작/청룡의 몬스터 방어율 무시 효과 증가: 30% ➔ 44%',
                        '파이널 비욘더 앱솔루트 데미지 상향: 마스터 레벨 기준 1796% ➔ 3951%',
                        '파이널 비욘더 앱솔루트의 최대 타격 몬스터 수 증가: 9명 ➔ 11명',
                        '파이널 비욘더 앱솔루트의 몬스터 방어율 무시 증가 효과 상향: 50% ➔ 60%'
                    ]
                },
                {
                    job: '블래스터',
                    changes: [
                        '오버히트 펀치: 간혹 스킬을 중복 사용하는 현상 수정',
                        '릴리즈 파일 벙커와 오버히트 펀치를 매크로 등록 시 매크로 작동 오류 현상 수정'
                    ]
                },
                {
                    job: '카이저',
                    changes: [
                        '드라코닉 익스팅션: 키다운 중 윌 오브 소드 : 차지, 윌 오브 소드 : 스트라이크를 연계하여 시전할 수 있게 수정',
                        '윌 오브 소드 VI의 드래곤 블로우를 발생시키는 연계 기능 추가'
                    ]
                },
                {
                    job: '아델',
                    changes: ['에테르 뤼페: 스킬 사용 중 게더링과 블로섬을 딜레이(시전 동작) 없이 즉시 시전할 수 있게 편의성 개선']
                },
                {
                    job: '데몬 슬레이어',
                    changes: ['래쓰 오브 세이튼: 스킬 설명이 직관적으로 수정됩니다.']
                },
                {
                    job: '데몬 어벤져',
                    changes: [
                        '래비드 카니지: 스킬 시전 중 스킬 고유의 HP 회복 효과로 인한 HP 회복을 차단하는 기능 추가 (리스크 관리)',
                        '키다운 종료 시 HP 회복 불가 지속 시간이 증가됩니다.'
                    ]
                },
                {
                    job: '렌',
                    changes: [
                        '창룡파천검 : 만참: 승화 사용 시 재발동 대기시간이 즉시 초기화되도록 수정',
                        '스킬 사용 시 MP가 비정상적으로 다량 소모되던 현상 수정'
                    ]
                }
            ]
        },
        {
            group: '🔮 마법사 직업군',
            borderColor: 'border-purple-500/40',
            bgGlow: 'from-purple-950/20 to-transparent',
            items: [
                {
                    job: '아크메이지(불,독)',
                    changes: ['인페르날 웨이브: 파도 공격과 융합 폭발이 이그나이트/이그나이트 VI 불의 벽을 정상 생성하도록 조정']
                },
                {
                    job: '아크메이지(썬,콜)',
                    changes: ['서브제로 퍼미네이션: 공용 스킬을 제외한 직접 사용하는 공격 스킬이 적중하지 않았음에도 쿨타임이 감소되던 현상 수정']
                },
                {
                    job: '비숍',
                    changes: [
                        '엔젤스 플레지: 정화 데미지 상향: 마스터 레벨 기준 220% ➔ 316%',
                        '엔젤스 플레지: 속죄의 낙인 데미지 너프: 마스터 레벨 기준 168% ➔ 121%',
                        '엔젤스 플레지: 재사용 대기시간이 60초에서 120초로 증가',
                        '속죄의 낙인의 재발동 대기시간 버프 아이콘 오류 수정'
                    ]
                },
                {
                    job: '에반',
                    changes: [
                        '드래곤 소어: 스킬 설명 및 보이스 변경, 재사용 대기시간 삭제',
                        '드래곤 소어: 조디악 레이 지속 시간 동안 1회만 사용할 수 있게 변경',
                        '버티컬 피니셔: 스킬 보이스 변경'
                    ]
                },
                {
                    job: '루미너스',
                    changes: [
                        '앱솔루트 스페이스: 절대 공간 공격 시 간혹 절대 심판이 발동되지 않던 문제 수정',
                        '몬스터 텔레포트 시 이펙트가 비정상 위치에 출력되던 현상 수정'
                    ]
                },
                {
                    job: '일리움',
                    changes: ['글로리 윙:스플렌더: 글로리 윙 지속 시간 중 이그니션 적중 시 발동으로 변경']
                },
                {
                    job: '키네시스',
                    changes: [
                        '그래비티 오브젝트: 스킬 적중 시 일렁임/파동 시각 효과 제거',
                        '몬스터 첫 탐색 범위 상향: 기존 대비 약 75% 증가',
                        '어나더 렐름으로 발동되지 않던 현상 및 버프 아이콘 제거 시 대기시간 표기 버그 수정'
                    ]
                },
                {
                    job: '라라',
                    changes: [
                        '한아름 아우른 숨결: 스킬 설명 수정',
                        '분출 데미지 하향: 마스터 레벨 기준 1950% ➔ 720%',
                        '융합 토지령 발산 데미지 하향: 마스터 레벨 기준 1775% ➔ 670%',
                        '융합 토지령 소멸 시 토지령 자동 재소환으로 변경',
                        '토지령이 없는 상태에서 소멸 시에도 재소환',
                        '산의 씨앗 자동 사용 모드에서 융합 토지령 소멸 시 씨앗이 심어지지 않는 오류 수정',
                        '연무장 리플레이 재생 시 스킬 설명이 다르게 출력되는 오류 수정',
                        '재사용 대기시간 초기화 맵 이동 시 용맥 분출/용맥 분출 VI 사용 불가 오류 수정'
                    ]
                },
                {
                    job: '레테',
                    changes: [
                        '보이드 오리진: 스킬 지속 중 최종 데미지 5% 증가 기능 추가',
                        '스킬 지속 중 심상 세계의 모습이 50% 확률로 적을 자동 공격하는 기믹 추가',
                        '스킬 지속 중 임프린트 및 임프린트 VI의 최종 데미지 비율 조정: 68% ➔ 90%로 감소',
                        '보이드 오리진: 심상 세계 파괴 이펙트가 스킬 이펙트 투명도 옵션에 영향을 받지 않도록 수정',
                        '보이드 오리진: 스킬 사용 시 재생되는 배경음악이 가끔 어색하게 종료되는 현상 수정'
                    ]
                }
            ]
        },
        {
            group: '🎯 궁수 직업군',
            borderColor: 'border-emerald-500/40',
            bgGlow: 'from-emerald-950/20 to-transparent',
            items: [
                {
                    job: '신궁',
                    changes: ['리썰 퍼니셔: 리썰 볼트를 모두 소모하고 최대 HP가 가장 높은 적의 폭발 화살 중첩이 최대치일 때 자동으로 리썰 버스트를 발동시키는 자동 사용 모드 추가 (편의성 상향)']
                },
                {
                    job: '패스파인더',
                    changes: [
                        '마테리얼 버스트: 렐릭 게이지를 소비하지 않고 MP를 소비하도록 개편',
                        '마테리얼 버스트: 일정 시간마다 렐릭 마테리아가 자동 생성되며, 이를 소모하여 스킬을 사용하도록 개편',
                        '마테리얼 버스트 사용 횟수에 따라 에인션트 버스트를 연계 사용할 수 있게 구조 변경',
                        '폭발 화살 데미지 상향: 마스터 레벨 기준 122% ➔ 265%',
                        '고대 화살 데미지 상향: 마스터 레벨 기준 376% ➔ 797%',
                        '폭쇄 데미지 상향: 마스터 레벨 기준 439% ➔ 930%',
                        '렐릭 에볼루션 사용 시 렐릭 마테리아 추가 생성 및 최대 보유 제한량 증가 유틸 추가'
                    ]
                },
                {
                    job: '윈드브레이커',
                    changes: ['실프스 브레스: 공격 적중 시 트라이플링 윔 발동 확률이 트라이플링 윔-인핸스의 효과를 중복으로 적용받던 현상 수정 (오류 수정)']
                },
                {
                    job: '와일드헌터',
                    changes: ['레조넌스 : 와일드 피어스: 스킬 사용 시 암전 효과가 적용되지 않도록 변경']
                },
                {
                    job: '메르세데스',
                    changes: ['베리안 서지: 거스트 다이브, 라이트닝 엣지, 롤링 문썰트와 연계 시전이 가능하도록 변경']
                },
                {
                    job: '카인',
                    changes: [
                        '[발현] - 스트라이크 임팩트: V매트릭스 강화 코어 효과 미적용 및 몬스터 방어율 추가 무시 기능 추가',
                        '[발현] - 스트라이크 임팩트 데미지 상향: 마스터 레벨 기준 597% ➔ 1313%',
                        '[발현] - 스트라이크 임팩트 돌격 데미지 상향: 마스터 레벨 기준 483% ➔ 1051%',
                        '[처형] - 팬텀 레퀴엠: V매트릭스 강화 코어 효과 미적용 및 몬스터 방어율 추가 무시 기능 추가',
                        '[처형] - 팬텀 레퀴엠 난도질 데미지 상향: 마스터 레벨 기준 191% ➔ 420%',
                        '[처형] - 팬텀 레퀴엠 열격 데미지 상향: 마스터 레벨 기준 153% ➔ 343%'
                    ]
                }
            ]
        },
        {
            group: '🗡️ 도적 직업군',
            borderColor: 'border-cyan-500/40',
            bgGlow: 'from-cyan-950/20 to-transparent',
            items: [
                {
                    job: '섀도어',
                    changes: [
                        '무아지경: 버프 아이콘 우클릭 취소 불가로 변경, V매트릭스 강화 코어 효과 미적용 조치',
                        '무아지경: 지속 이펙트가 스킬 이펙트 투명도 옵션의 영향을 받지 않게 수정',
                        '암살 : 멸 데미지 상향: 마스터 레벨 기준 194% ➔ 387%',
                        '암살 : 멸의 최대 타격 수 증가: 3명 ➔ 4명 및 몬스터 방어율 추가 무시 기능 추가',
                        '분쇄 : 멸 난격 데미지 상향: 마스터 레벨 기준 188% ➔ 375%',
                        '분쇄 : 멸 검영 데미지 상향: 마스터 레벨 기준 277% ➔ 554%',
                        '분쇄 : 멸 최대 타격 수 증가: 3명 ➔ 4명 및 몬스터 방어율 추가 무시 기능 추가',
                        '사용 횟수 모두 소비된 후 가끔 암살/분쇄 연계로 절개를 시전할 수 없던 버그 수정'
                    ]
                },
                {
                    job: '듀얼블레이드',
                    changes: [
                        '암영난참: 검풍의 적 탐색 범위 기존 대비 20% 증가',
                        '암영난참: 검풍의 재탐색 범위 기존 대비 약 389% 증가'
                    ]
                },
                {
                    job: '카데나',
                    changes: ['체인아츠:토렌트: 체인의 소용돌이 일부 이펙트 미출력 및 폭발 미발생 버그 수정']
                },
                {
                    job: '제논',
                    changes: [
                        '레일 건 캐노네이드: 공격 범위 약 13% 증가 및 발포의 공격 간격 조절',
                        '암전 효과가 스킬 이펙트 투명도의 영향을 받도록 개선'
                    ]
                },
                {
                    job: '칼리',
                    changes: [
                        '헥스 : 듄 버스트: 자동 발현 시 레조네이트 VI 발현 횟수 누적 오류 수정',
                        '참격 데미지 하향: 마스터 레벨 기준 295% ➔ 237%',
                        '모래 폭발 데미지 하향: 마스터 레벨 기준 542% ➔ 426%'
                    ]
                },
                {
                    job: '호영',
                    changes: ['선기 : 사흉해방 도철: 스킬 지속 중 스킬 버프 아이콘이 출력되도록 개선']
                }
            ]
        },
        {
            group: '🏴‍☠️ 해적 및 기타 직업군',
            borderColor: 'border-orange-500/40',
            bgGlow: 'from-orange-950/20 to-transparent',
            items: [
                {
                    job: '바이퍼',
                    changes: ['넵투누스 어드밴트: 씨 넵투누스와 넵투누스 어썰트 스킬에 몬스터 방어율 추가 무시 기능 적용']
                },
                {
                    job: '캡틴',
                    changes: ['에어리얼 봄바드먼트: 보스 격파 후 보상 단계의 몬스터를 타격하지 않도록 수정']
                },
                {
                    job: '캐논슈터',
                    changes: [
                        '메가 캐논 봄바드: 지속 포격 데미지 상향 (839% ➔ 1259%)',
                        '메가 캐논 봄바드: 폭발 데미지 하향 조정 (3693% ➔ 2462%)'
                    ]
                },
                {
                    job: '스트라이커',
                    changes: ['해황폭쇄: 뇌명벽해파/질도섬멸 사용 중 시전 가능한 현상 수정']
                },
                {
                    job: '메카닉',
                    changes: ['버스터 스테이션: 유도 미사일이 적을 추적하는 범위 116% 증가']
                },
                {
                    job: '은월',
                    changes: ['연우격풍: 후방 이동 시 시전 이펙트가 종료되는 현상 수정']
                },
                {
                    job: '엔젤릭버스터',
                    changes: [
                        '팝핑 하트: 팬이 8명 모였을 때 자동으로 적을 향해 돌진하도록 수정',
                        '이미 소환된 팬은 맵을 이동해도 사라지지 않고 유지되도록 개선',
                        '돌진하는 팬과 응원 에너지의 공격이 보스 전투 후 보상을 타격할 수 없도록 수정'
                    ]
                },
                {
                    job: '아크',
                    changes: [
                        '원초의 격류: 원초의 낙인이 제거되고, 격류 2회 발생 후 다음 격류 적중 시 심연의 가시가 발동되도록 수정',
                        '격류 데미지 상향: 마스터 레벨 기준 1337% ➔ 1688%',
                        '심연의 가시 데미지 상향: 마스터 레벨 기준 779% ➔ 972%'
                    ]
                }
            ]
        }
    ];

    const correctionDetails = [
        {
            group: '🌐 공통 및 전체 계열',
            borderColor: 'border-slate-500/40',
            bgGlow: 'from-slate-900/20 to-transparent',
            items: [
                {
                    job: '공통',
                    changes: [
                        '일부 컨텐츠에서 화면 흔들림, 일렁임, 색상 연출이 있는 스킬 시전 후 화면이 어색하게 보이는 현상 수정',
                        '솔 헤카테: 스틱스의 행동 불가 상태 이상 이펙트 미출력 오류 수정',
                        '시그너스 팔랑크스 VI: 공격 적중 시 스톰 브링어 발동 확률 미적용 현상 수정'
                    ]
                }
            ]
        },
        {
            group: '⚔️ 전사 직업군',
            borderColor: 'border-red-500/40',
            bgGlow: 'from-red-950/20 to-transparent',
            items: [
                {
                    job: '히어로',
                    changes: ['발할라 / 발할라 VI: 레이지 익스플로젼 검격 발생 위치 오류 수정']
                },
                {
                    job: '블래스터',
                    changes: [
                        '유니온 레이드: 배치된 100레벨 이상 블래스터의 쇼크 웨이브 펀치 미사용 현상 수정',
                        '유니온 레이드: 배치된 200레벨 이상 블래스터의 하이퍼 매그넘 펀치 시각 오류 수정'
                    ]
                },
                {
                    job: '미하일',
                    changes: ['로얄 가드 / 로얄 가드 VI: 행동 불가 적용 보스 몬스터와 충돌 시 반격 가능하도록 수정']
                },
                {
                    job: '카이저',
                    changes: ['인퍼널 브레스 / VI / 얼티밋 인퍼널 브레스: 윌 오브 소드 VI의 드래곤 블로우를 발생시키는 기능 추가']
                }
            ]
        },
        {
            group: '🔮 마법사 직업군',
            borderColor: 'border-purple-500/40',
            bgGlow: 'from-purple-950/20 to-transparent',
            items: [
                {
                    job: '아크메이지(썬,콜)',
                    changes: ['프로즌 라이트닝: 마력 개화 공격이 보스 보상 몬스터를 타격하지 않도록 수정']
                },
                {
                    job: '플레임위자드',
                    changes: ['이터니티: 순환의 불꽃 공격이 보스 보상 몬스터를 타격하지 않도록 수정']
                },
                {
                    job: '배틀메이지',
                    changes: [
                        '어비셜 라이트닝: 명계의 번개 미발동 시에도 최대 발동 횟수 감소 현상 수정',
                        '어비셜 라이트닝: 명계의 번개 발동 범위 증가 (약 598% 증가)'
                    ]
                },
                {
                    job: '레테',
                    changes: [
                        '인보크 (펠, 바르가르, 템플러, 템플러 II, 바르가르 VI, 템플러 VI): 스킬 설명 수정',
                        '오블리크 텔레포트: 사용 시 맵 밖으로 이동하는 오류 수정',
                        '이딕트 : 램페이지 VI: 데미지 하향 (808% ➔ 760%)',
                        '이딕트 : 템플러 아츠 VI: 데미지 하향 (813% ➔ 764%)'
                    ]
                }
            ]
        },
        {
            group: '🎯 궁수 직업군',
            borderColor: 'border-emerald-500/40',
            bgGlow: 'from-emerald-950/20 to-transparent',
            items: [
                {
                    job: '신궁',
                    changes: ['스플릿 애로우: 지속 시간 감소 (120초 ➔ 75초)']
                },
                {
                    job: '메르세데스',
                    changes: [
                        '거스트 다이브, 라이트닝 엣지, 롤링 문썰트: 베리안 서지와 연계 가능하도록 변경',
                        '레전드리 스피어 / 레전드리 스피어 VI: 스킬 설명 수정'
                    ]
                },
                {
                    job: '카인',
                    changes: ['타나토스 디센트: 죽음의 영역 액션 딜레이 미적용 현상 수정']
                }
            ]
        },
        {
            group: '🗡️ 도적 직업군',
            borderColor: 'border-cyan-500/40',
            bgGlow: 'from-cyan-950/20 to-transparent',
            items: [
                {
                    job: '섀도어',
                    changes: ['멸귀참영진: 재사용 대기시간 종료 직후 사용 시 최소 재사용 대기시간 미적용 현상 수정']
                },
                {
                    job: '제논',
                    changes: ['퍼지롭 매스커레이드 : 저격 / VI : 저격 / VI : 처형, 이지스 시스템: 일부 이펙트 미출력 오류 수정']
                }
            ]
        },
        {
            group: '🏴‍☠️ 해적 및 기타 직업군',
            borderColor: 'border-orange-500/40',
            bgGlow: 'from-orange-950/20 to-transparent',
            items: [
                {
                    job: '캐논슈터',
                    changes: ['미니 캐논볼 / 미니 캐논볼 VI: 스킬 설명 수정']
                },
                {
                    job: '렌',
                    changes: ['매화검 1초식 : 순인: 시전 시 가끔 순간 이동하지 않는 현상 수정']
                }
            ]
        }
    ];

    // 직업별 스킬 변경 이미지 매핑
    const jobImages: Record<string, string[]> = {
        '히어로': ['/blog/hexa-balance-july-2026/hero1.png'],
        '다크나이트': ['/blog/hexa-balance-july-2026/darkknight1.png'],
        '아란': ['/blog/hexa-balance-july-2026/aran2.png', '/blog/hexa-balance-july-2026/aran4.png'],
        '아델': ['/blog/hexa-balance-july-2026/adele1.png'],
        '카이저': ['/blog/hexa-balance-july-2026/kaiser_draconic.png'],
        '데몬 어벤져': ['/blog/hexa-balance-july-2026/demonavenger1.png'],
        '렌': ['/blog/hexa-balance-july-2026/len1.png'],
        '비숍': ['/blog/hexa-balance-july-2026/bishop1.png'],
        '에반': ['/blog/hexa-balance-july-2026/evan1.png'],
        '키네시스': ['/blog/hexa-balance-july-2026/kinesis1.png'],
        '일리움': ['/blog/hexa-balance-july-2026/illium1.png'],
        '라라': ['/blog/hexa-balance-july-2026/lara1.png'],
        '레테': ['/blog/hexa-balance-july-2026/lethe3.png'],
        '신궁': ['/blog/hexa-balance-july-2026/marksman1.png'],
        '패스파인더': ['/blog/hexa-balance-july-2026/pathfinder1.png'],
        '메르세데스': ['/blog/hexa-balance-july-2026/mercedes1.png', '/blog/hexa-balance-july-2026/mercedes2.png'],
        '카인': ['/blog/hexa-balance-july-2026/kain2.png', '/blog/hexa-balance-july-2026/kain3.png'],
        '섀도어': ['/blog/hexa-balance-july-2026/shadower1.png'],
        '듀얼블레이드': ['/blog/hexa-balance-july-2026/dualblade1.png'],
        '칼리': ['/blog/hexa-balance-july-2026/kali1.png'],
        '제논': ['/blog/hexa-balance-july-2026/xenon1.png'],
        '바이퍼': ['/blog/hexa-balance-july-2026/viper1.png'],
        '스트라이커': ['/blog/hexa-balance-july-2026/striker1.png'],
        '메카닉': ['/blog/hexa-balance-july-2026/mechanic1.png'],
        '아크': ['/blog/hexa-balance-july-2026/ark1.png'],
        '엔젤릭버스터': ['/blog/hexa-balance-july-2026/angelic1.png'],
        '캐논슈터': ['/blog/hexa-balance-july-2026/cannonshooter2.png'],
    };

    // 누적 소모량 계산
    // 기존: 126 에르다, 3990 조각
    // 변경: 111 에르다, 3362 조각
    // 감소량: 15 에르다 (11.9% 감소), 628 조각 (15.7% 감소)

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pb-20 font-sans">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <Link prefetch={false}
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
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full">
                            업데이트 소식
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">
                            테스트월드
                        </span>
                        <span className="text-slate-500 text-sm">2026년 7월 16일 <span className="text-amber-400 font-bold ml-1.5">(7월 23일 적용 예정)</span></span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                        【테섭 2차】 전직업 신규 6차 스킬 변경점 총정리
                    </h1>
                    <p className="text-lg text-slate-400">
                        1차 테스트서버 대비 솔 에르다 및 조각 요구량 인하! 패파 게이지 제거, 다크나이트/섀도어/아란 V매트릭스 코어 강화 미적용 조치 및 폭딜 상향 등 핵심 변경점을 모았습니다.
                    </p>
                </header>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* Highlights Card */}
                <section className="mb-12 bg-gradient-to-br from-purple-900/30 via-slate-900/40 to-blue-900/30 border-2 border-purple-500/40 rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-black text-purple-400 mb-6 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 animate-pulse" />
                        핵심 요약: 무엇이 가장 크게 바뀌었나?
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800">
                            <p className="font-bold text-yellow-400 mb-2 flex items-center gap-1.5">
                                <Zap className="w-4 h-4" />
                        솔 에르다 소모량 완화
                            </p>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                신규 6차 스킬의 화력이 생각보다 저조하기 때문에 30레벨 마스터를 위해 필요한 솔 에르다가 <strong className="text-white">137개 ➔ 117개 (20개 감소)</strong>로 완화되었고, 솔 에르다 조각은 <strong className="text-white">4,035개 ➔ 3,442개 (593개 감소, 14.7% 절감)</strong>로 줄어들었습니다.
                            </p>
                        </div>
                        <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800">
                            <p className="font-bold text-cyan-400 mb-2 flex items-center gap-1.5">
                                <Swords className="w-4 h-4" />
                                V매트릭스 강화 코어 미적용 & 퍼뎀 보정
                            </p>
                            <div className="text-sm text-slate-300 leading-relaxed space-y-1.5">
                                <p>1차 테스트월드에서 받은 피드백을 반영하여 스킬 고유 퍼센트 데미지 수치 조정과 스킬 매커니즘 보정 패치를 진행했습니다.</p>
                                <p>전체적으로 <strong className="text-white">평균 2~3% 정도 최종뎀</strong>이 올라갈 수 있도록 스킬 조정이 있었습니다.</p>
                                <p><strong className="text-white">신스킬 강화가 낮더라도 좋은 효율을 낼 수 있도록 1~30레벨 퍼센트 증가량 조정 패치</strong>가 있었습니다. <span className="text-slate-400 text-xs font-normal ml-1">(만렙시 퍼뎀은 동일)</span></p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 1: Sol Erda Table */}
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-base">1</span>
                        신규 스킬 솔 에르다 & 조각 필요량 완화 현황
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-6">
                        1차 테스트서버 오픈 당시 신규 6차 스킬의 과도한 재화 요구량에 대한 피드백을 수용하여, 대다수 레벨 구간에서의 소모량이 하향 조정되었습니다. (특히 5레벨, 10레벨, 20레벨 등 주요 돌파 구간의 요구량이 감소하였습니다.)
                    </p>

                    <div className="overflow-x-auto rounded-xl border border-slate-800 shadow-xl">
                        <table className="w-full text-left border-collapse bg-slate-900/30">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-950/80">
                                    <th className="p-4 text-sm font-bold text-slate-300 text-center">코어 레벨</th>
                                    <th className="p-4 text-sm font-bold text-red-400 text-center bg-red-950/10">기존 솔 에르다</th>
                                    <th className="p-4 text-sm font-bold text-green-400 text-center bg-green-950/10">변경 후 솔 에르다</th>
                                    <th className="p-4 text-sm font-bold text-red-400 text-center bg-red-950/10 border-l border-slate-800">기존 조각</th>
                                    <th className="p-4 text-sm font-bold text-green-400 text-center bg-green-950/10">변경 후 조각</th>
                                </tr>
                            </thead>
                            <tbody>
                                {solErdaTable.map((row, idx) => {
                                    const isSChanged = row.oldS !== row.newS;
                                    const isGChanged = row.oldG !== row.newG;
                                    return (
                                        <tr key={idx} className="border-b border-slate-800/60 hover:bg-slate-900/50 transition-colors">
                                            <td className="p-3 text-sm font-bold text-center text-slate-300">{row.lv} Lv</td>
                                            <td className="p-3 text-sm text-center text-slate-400 bg-red-950/5">{row.oldS}개</td>
                                            <td className={`p-3 text-sm text-center transition-all duration-300 ${
                                                isSChanged 
                                                    ? 'bg-emerald-950/40 text-emerald-400 font-black border border-emerald-900/60' 
                                                    : 'bg-green-950/5 text-slate-300 font-medium'
                                            }`}>
                                                {row.newS}개
                                            </td>
                                            <td className="p-3 text-sm text-center text-slate-400 bg-red-950/5 border-l border-slate-800">{row.oldG}개</td>
                                            <td className={`p-3 text-sm text-center transition-all duration-300 ${
                                                isGChanged 
                                                    ? 'bg-emerald-950/40 text-emerald-400 font-black border border-emerald-900/60' 
                                                    : 'bg-green-950/5 text-slate-300 font-medium'
                                            }`}>
                                                {row.newG}개
                                            </td>
                                        </tr>
                                    );
                                })}
                                <tr className="bg-slate-950 font-bold border-t border-slate-700">
                                    <td className="p-4 text-sm font-black text-center text-white">합계 (1~30Lv)</td>
                                    <td className="p-4 text-sm text-center text-red-400 bg-red-950/20">137개</td>
                                    <td className="p-4 text-sm text-center text-yellow-400 bg-yellow-950/40 font-black border border-yellow-900/60">117개 (-20개)</td>
                                    <td className="p-4 text-sm text-center text-red-400 bg-red-950/20 border-l border-slate-800">4,035개</td>
                                    <td className="p-4 text-sm text-center text-yellow-400 bg-yellow-950/40 font-black border border-yellow-900/60">3,442개 (-593개)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Section 2: Balance Updates */}
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-base">2</span>
                        직업별 세부 변경 및 밸런스 패치 사항
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-2">
                        1차 테스트 서버 피드백을 기반으로 한 구조적 변경, 버그 수정 및 데미지 조정 내역입니다.
                    </p>
                    <p className="text-slate-400 text-xs mb-8 flex items-center gap-1">
                        📸 스킬 이미지 출처:&nbsp;
                        <a 
                            href="https://blog.naver.com/seotbeo/224348688953" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-cyan-400 hover:text-cyan-300 underline"
                        >
                            섣버님의 블로그
                        </a>
                    </p>

                    <div className="space-y-8">
                        {balanceDetails.map((group, groupIdx) => (
                            <div key={groupIdx} className={`relative overflow-hidden rounded-2xl border ${group.borderColor} bg-slate-900/20 backdrop-blur-sm p-6 sm:p-8`}>
                                <div className={`absolute -inset-y-0 left-0 w-32 bg-gradient-to-r ${group.bgGlow} pointer-events-none`} />
                                <div className="relative z-10">
                                    <h3 className="text-xl sm:text-2xl font-black text-white mb-6 pb-2 border-b border-slate-800/80">
                                        {group.group}
                                    </h3>
                                    <div className="space-y-6">
                                        {group.items.map((item, itemIdx) => (
                                            <div key={itemIdx} className="bg-slate-950/40 rounded-xl p-4 sm:p-5 border border-slate-800/60">
                                                <h4 className="text-base font-bold text-yellow-400 mb-3 flex items-center gap-2">
                                                    <span className="w-1.5 h-3 bg-yellow-500 rounded-sm"></span>
                                                    {item.job}
                                                </h4>
                                                {jobImages[item.job] && (
                                                    <div className="mb-4 flex flex-wrap gap-3">
                                                        {jobImages[item.job].map((src, imgIdx) => (
                                                            <img
                                                                key={imgIdx}
                                                                src={src}
                                                                alt={`${item.job} 스킬 변경 이미지`}
                                                                className="border border-slate-800/80 rounded-lg hover:scale-[1.02] transition-transform duration-200"
                                                                style={{ maxWidth: '100%', height: 'auto' }}
                                                                loading="lazy"
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                                <ul className="space-y-2">
                                                    {item.changes.map((change, changeIdx) => (
                                                        <li key={changeIdx} className="text-slate-300 text-sm leading-relaxed flex items-start gap-2">
                                                            <ArrowRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-1" />
                                                            <span>{renderChangeText(change)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: Skill Corrections */}
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-base">3</span>
                        기타 스킬 오류 및 수정 사항
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-8">
                        밸런스 패치 외에 테스트 서버에 추가 적용된 공통 시스템 편의성 개선 및 직업별 오류 수정 내역입니다.
                    </p>

                    <div className="space-y-8">
                        {correctionDetails.map((group, groupIdx) => (
                            <div key={groupIdx} className={`relative overflow-hidden rounded-2xl border ${group.borderColor} bg-slate-900/20 backdrop-blur-sm p-6 sm:p-8`}>
                                <div className={`absolute -inset-y-0 left-0 w-32 bg-gradient-to-r ${group.bgGlow} pointer-events-none`} />
                                <div className="relative z-10">
                                    <h3 className="text-xl sm:text-2xl font-black text-white mb-6 pb-2 border-b border-slate-800/80">
                                        {group.group}
                                    </h3>
                                    <div className="space-y-6">
                                        {group.items.map((item, itemIdx) => (
                                            <div key={itemIdx} className="bg-slate-950/40 rounded-xl p-4 sm:p-5 border border-slate-800/60">
                                                <h4 className="text-base font-bold text-yellow-400 mb-3 flex items-center gap-2">
                                                    <span className="w-1.5 h-3 bg-yellow-500 rounded-sm"></span>
                                                    {item.job}
                                                </h4>
                                                <ul className="space-y-2">
                                                    {item.changes.map((change, changeIdx) => (
                                                        <li key={changeIdx} className="text-slate-300 text-sm leading-relaxed flex items-start gap-2">
                                                            <ArrowRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-1" />
                                                            <span>{renderChangeText(change)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Conclusion */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">💡 분석 코멘트</h2>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                            이번 7월 16일 테스트서버 2차 패치는 유저 피드백을 빠르게 수용하려고 노력한 흔적들이 보입니다. 신규 6차 스킬 솔 에르다 요구량이 약 14.7%로 줄어든 점과, 다양한 직업들의 데미지 상향 및 구조 개선을 시도하려고 한 점이 돋보입니다. 2차 테스트를 거쳐서 7월 23일 본섭 업데이트 될 때에는 추가적인 개선이 더 있을 것으로 예상됩니다! 🍁
                        </p>
                    </div>
                </section>

                {/* SEO Tags */}
                <div className="flex flex-wrap gap-2 justify-center mb-8 max-w-2xl mx-auto">
                    {[
                        '메이플스토리',
                        '테스트월드',
                        '테섭 밸패',
                        '6차 스킬 밸런스',
                        'HEXA 스킬 조정',
                        '솔 에르다 완화',
                        '직업별 변경점',
                        '메이플 밸패 7월',
                        '섣버님 블로그',
                        '신규 6차 스킬',
                        '6차 신스킬',
                        '6차 스킬 변경점',
                        '신규 6차스킬 변경점',
                        '6차 신스킬 2차 테섭',
                        '메이플 6차 밸패',
                        '메이플 테섭 2차',
                        '메이플스토리 밸런스 패치',
                        '솔에르다 조각 완화',
                        '메이플스토리 업데이트'
                    ].map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-slate-900/60 hover:bg-slate-900 text-xs text-slate-400 hover:text-slate-300 rounded-full border border-slate-800 transition-colors cursor-default">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Footer CTA */}
                <div className="border-t border-slate-800 pt-8 mt-12">
                    <div className="text-center">
                        <Link prefetch={false}
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-500 transition-colors shadow-lg shadow-red-950/50"
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
