'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowLeft, Sparkles, Zap, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

const BUFF_KEYWORDS = [
    '데미지 상향',
    '추가됩니다',
    '상향됩니다',
    '개선됩니다',
    '사용할 수 있게',
    '추가 무시',
    '즉시 초기화',
    '범위 증가',
    '최종 데미지 증가',
    '자동 사용 모드',
    '공격력과 마력이 증가',
    '영구적으로',
    '약 80% 증가',
    '약 6% 감소됩니다',
    '약 27% 감소됩니다',
    '약 150% 증가됩니다',
];

const NERF_KEYWORDS = [
    '데미지 감소',
    '하향됩니다',
    '삭제됩니다',
    '사용할 수 없게',
    '데미지 하향',
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
                            if (text.includes('감소') || text.includes('하향') || text.includes('너프')) {
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

export default function TestworldSkillBalanceSep172026() {
    const balanceDetails = [
        {
            group: '⚔️ 전사 직업군',
            borderColor: 'border-red-500/40',
            bgGlow: 'from-red-950/20 to-transparent',
            items: [
                {
                    job: '히어로',
                    changes: [
                        '레이지 익스플로젼: 스킬 설명이 수정됩니다.',
                    ]
                },
                {
                    job: '다크나이트',
                    changes: [
                        '다크니스 오브 그레이스: 스킬 설명이 수정됩니다.',
                        'V매트릭스 강화 코어 효과를 적용받지 않도록 수정됩니다.',
                        '다크니스 오브 그레이스: 비홀더 데버스테이션이 비홀더 임팩트 지속 중 사용 가능하도록 변경됩니다.',
                        '비홀더 쇼크, 비홀더 쇼크 VI 사용 중 데버스테이션을 시전 동작 없이 사용할 수 있는 기능 추가',
                        '비홀더 데버스테이션 충격파 데미지 상향: 마스터 레벨 기준 80% ➔ 224%',
                        '비홀더 데버스테이션 암흑 돌풍 데미지 상향: 마스터 레벨 기준 163% ➔ 425%',
                        '비홀더 쇼크 추가타 데미지 상향: 마스터 레벨 기준 288% ➔ 789%',
                        '비홀더스 퍼니시먼트 데미지 상향: 마스터 레벨 기준 191% ➔ 477%',
                        '비홀더스 퍼니시먼트 스킬에 몬스터 방어율 추가 무시(방무) 유틸 추가',
                    ]
                },
                {
                    job: '팔라딘',
                    changes: [
                        '디바인 컨버전스: 연무장에서 리플레이 재생 시 마우스 오버 스킬 설명 미출력 오류 수정',
                    ]
                },
                {
                    job: '미하일',
                    changes: [
                        '레디언스 오브 발러: 용기의 방패가 최대 HP가 가장 높은 몬스터를 우선 추적하도록 수정',
                        '용기의 방패 데미지 증가: 마스터 레벨 기준 170% ➔ 255%',
                        '로얄 가드: 행동 불가 상태 이상이 적용된 보스 몬스터와 충돌 시 반격할 수 있도록 수정',
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
                        '파이널 비욘더 앱솔루트 최대 타격 수 증가: 9명 ➔ 11명',
                        '파이널 비욘더 앱솔루트 몬스터 방어율 무시 효과 상향: 50% ➔ 60%',
                    ]
                },
                {
                    job: '블래스터',
                    changes: [
                        '오버히트 펀치: 간혹 스킬을 중복 사용하는 현상 수정',
                        '릴리즈 파일 벙커와 오버히트 펀치를 매크로 등록 시 매크로 작동 오류 현상 수정',
                    ]
                },
                {
                    job: '카이저',
                    changes: [
                        '드라코닉 익스팅션: 키다운 중 윌 오브 소드: 차지, 윌 오브 소드: 스트라이크를 연계하여 시전할 수 있게 수정',
                        '윌 오브 소드 VI의 드래곤 블로우를 발생시키는 연계 기능 추가',
                    ]
                },
                {
                    job: '아델',
                    changes: [
                        '에테르 뤼페: 스킬 사용 중 게더링과 블로섬을 딜레이(시전 동작) 없이 즉시 시전할 수 있게 개선',
                    ]
                },
                {
                    job: '데몬 슬레이어',
                    changes: [
                        '래쓰 오브 세이튼: 스킬 설명이 직관적으로 수정됩니다.',
                    ]
                },
                {
                    job: '데몬 어벤져',
                    changes: [
                        '래비드 카니지: 스킬 시전 중 HP 회복을 차단하는 기능 추가',
                        '키다운 종료 시 HP 회복 불가 지속 시간이 증가됩니다.',
                    ]
                },
                {
                    job: '렌',
                    changes: [
                        '창룡파천검: 만참: 승화 사용 시 재발동 대기시간이 즉시 초기화되도록 수정',
                        '스킬 사용 시 MP가 비정상적으로 다량 소모되던 현상 수정',
                    ]
                },
            ]
        },
        {
            group: '🔮 마법사 직업군',
            borderColor: 'border-purple-500/40',
            bgGlow: 'from-purple-950/20 to-transparent',
            items: [
                {
                    job: '아크메이지(불,독)',
                    changes: [
                        '인페르날 웨이브: 파도 공격과 융합 폭발이 이그나이트/이그나이트 VI 불의 벽을 정상 생성하도록 조정',
                    ]
                },
                {
                    job: '아크메이지(썬,콜)',
                    changes: [
                        '서브제로 퍼미네이션: 공용 스킬 제외 직접 사용 공격 스킬이 적중하지 않아도 쿨타임이 감소되던 현상 수정',
                    ]
                },
                {
                    job: '비숍',
                    changes: [
                        '엔젤스 플레지: 정화 데미지 상향: 마스터 레벨 기준 220% ➔ 316%',
                        '엔젤스 플레지: 속죄의 낙인 데미지 하향: 마스터 레벨 기준 168% ➔ 121%',
                        '엔젤스 플레지: 재사용 대기시간 60초 ➔ 120초',
                        '속죄의 낙인 재발동 대기시간 버프 아이콘 오류 수정',
                    ]
                },
                {
                    job: '에반',
                    changes: [
                        '레조넌트 봄버: 드래곤이 자동으로 적을 향해 돌진하도록 변경됩니다.',
                        '레조넌트 봄버: 타격 수 증가',
                    ]
                },
                {
                    job: '루미너스',
                    changes: [
                        '임피리컬 널리지: 약점을 파악할 확률이 마스터 레벨 기준 31% ➔ 76%',
                        '전투의 흐름: 주변에 적이 있으면 데미지가 증가하는 스킬로 변경됩니다.',
                        '전투의 흐름: 중첩 기능이 삭제됩니다.',
                        '전투의 흐름: 데미지 증가량이 마스터 레벨 기준 16% ➔ 15%',
                        '무아: 중첩 기능이 삭제됩니다.',
                        '무아: 전투 상태 돌입 시 데미지 증가 효과가 즉시 적용되도록 변경됩니다.',
                        '무아: 지속 시간이 5초 ➔ 10초',
                    ]
                },
                {
                    job: '키네시스',
                    changes: [
                        '에르다 노바: 공격 범위가 약 80% 증가됩니다.',
                        '에르다 노바: HP와 응축된 에르다를 소비하는 스킬로 변경됩니다. (최대 2개까지 축적)',
                        '싸이킥 러쉬: 연속 사용 가능한 딜레이가 약 6% 감소됩니다.',
                        '에르다 샤워 / 에르다 파운틴: 챔피언 레이드 – 드래곤 아일랜드에서 사용 가능하게 됩니다.',
                        '에르다 퍼미에이션: 신규 스킬 추가 (적에게 침투해 느리게 만들고 충돌 무시 디버프 적용)',
                    ]
                },
            ]
        },
        {
            group: '🏹 궁수 직업군',
            borderColor: 'border-green-500/40',
            bgGlow: 'from-green-950/20 to-transparent',
            items: [
                {
                    job: '보우마스터',
                    changes: [
                        '해빌리언스 오브 디에세: 스킬 설명이 수정됩니다.',
                        '프로스트 프레이: 스킬 이펙트 투명도 옵션의 영향을 받지 않게 수정',
                    ]
                },
                {
                    job: '신궁',
                    changes: [
                        '신계의 피닉스: 공격 범위가 일부 증가됩니다.',
                    ]
                },
                {
                    job: '패스파인더',
                    changes: [
                        '렐릭 릭레임: 렐릭 게이지를 소비하지 않고 MP를 소비하도록 변경됩니다.',
                        '렐릭 어큐뮬레이션: 렐릭 마테리아 추가 생성 및 최대 보유 제한량 증가',
                        '원초의 낙인이 제거되고 캐릭터에게 부여된 원초의 낙인 잔여 시간이 감소하는 기능이 추가됩니다.',
                    ]
                },
                {
                    job: '와일드헌터',
                    changes: [
                        '스피릿 오브 더 와일드: 심상 세계의 모습이 일정 확률(50%)로 적을 자동 공격하는 기믹 추가',
                    ]
                },
                {
                    job: '카인',
                    changes: [
                        '자이언트 스워드 세인트: 검풍의 재탐색 범위 기존 대비 약 389% 증가',
                        '자이언트 스워드 세인트: 검풍의 적 탐색 범위 기존 대비 20% 증가',
                    ]
                },
                {
                    job: '리매지너',
                    changes: [
                        '이매지너리 렐름: 심상 세계가 사라지지 않고 유지되도록 개선',
                    ]
                },
            ]
        },
        {
            group: '🗡️ 도적 직업군',
            borderColor: 'border-yellow-500/40',
            bgGlow: 'from-yellow-950/20 to-transparent',
            items: [
                {
                    job: '섀도어',
                    changes: [
                        '쉐도우 파트너: V매트릭스 강화 코어 효과를 적용받지 않도록 수정됩니다.',
                        '스콜피오 어썰트: 스킬 버프 아이콘이 출력되도록 수정됩니다.',
                    ]
                },
                {
                    job: '나이트로드',
                    changes: [
                        '조디악 레이 지속 시간 동안 1회만 사용할 수 있게 변경',
                    ]
                },
                {
                    job: '듀얼블레이드',
                    changes: [
                        '나이트메어 엠프레스: 암전 효과가 스킬 이펙트 투명도의 영향을 받도록 수정',
                    ]
                },
                {
                    job: '제논',
                    changes: [
                        '트라이앵글 포메이션, 퍼지롭 매스커레이드: 저격 VI, 포톤 레이, 트라이앵글 포메이션 VI — 스킬 이펙트 투명도 옵션이 적용됩니다.',
                    ]
                },
                {
                    job: '팬텀',
                    changes: [
                        '봄바드: 스킬 설명이 수정됩니다.',
                    ]
                },
            ]
        },
        {
            group: '⚓ 해적 직업군',
            borderColor: 'border-cyan-500/40',
            bgGlow: 'from-cyan-950/20 to-transparent',
            items: [
                {
                    job: '바이퍼',
                    changes: [
                        '데들리 차지: 시전 스킬 효과음이 변경됩니다.',
                        '래피드 이베이젼: 연속 사용 가능한 딜레이가 약 27% 감소됩니다.',
                    ]
                },
                {
                    job: '메카닉',
                    changes: [
                        '스파이더 인 미러: 사냥 맵을 제외한 일부 맵에서 사용할 수 없게 됩니다.',
                        '스파이더 인 미러: 영구적으로 공격력과 마력이 증가하는 기능이 추가됩니다.',
                        '크레스트 오브 더 솔라: 사냥 맵을 제외한 일부 맵에서 사용할 수 없게 됩니다.',
                        '크레스트 오브 더 솔라: 영구적으로 공격력과 마력이 증가하는 기능이 추가됩니다.',
                        '크레스트 오브 더 솔라: 불꽃의 문양 데미지가 마스터 레벨 기준 1142%로 잘못 적용되는 현상 수정',
                    ]
                },
                {
                    job: '아란(해적 직군 공통 오류 포함)',
                    changes: [
                        '비욘더 VI: 비욘더-현무의 스킬 효과음이 변경됩니다.',
                        '일부 스킬의 드래곤 스파킹 미발동 현상 수정 (적중 시 드래곤 스파킹이 발동되지 않는 현상)',
                    ]
                },
                {
                    job: '엔젤릭버스터',
                    changes: [
                        '그랜드 피날레: 응원 풍선의 지속 유지시간이 약 150% 증가됩니다.',
                        '핑크 스커드: 연속 사용 가능한 딜레이가 약 6% 감소됩니다.',
                    ]
                },
                {
                    job: '라라',
                    changes: [
                        '글로리 윙: 지속 시간 중 이그니션 적중 시 발동으로 변경',
                    ]
                },
                {
                    job: '호영',
                    changes: [
                        '망혼검 절기: 무량겁 VI의 내공으로 발화한 불꽃 — 스킬 이펙트 투명도 옵션이 적용됩니다.',
                    ]
                },
            ]
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pb-20 font-sans">
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <Link prefetch={false} href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 sm:mb-4">
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        <span className="text-sm">블로그로 돌아가기</span>
                    </Link>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <header className="mb-8">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full">업데이트 소식</span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">테스트월드</span>
                        <span className="text-slate-500 text-sm">2026년 9월 10일 <span className="text-amber-400 font-bold ml-1.5">(9월 17일 적용 예정)</span></span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight break-keep">
                        【테섭 1.2.206】 전직업 스킬 조정 & 연무장 개편 총정리
                    </h1>
                    <p className="text-lg text-slate-400 break-keep">
                        9월 10일 공개된 테스트월드 클라이언트 1.2.206 기준. 행동 불가 저항 81초 단축, 온오프 스킬 재접속 유지, 전사·마법사·궁수·도적·해적 직업별 스킬 밸런스 조정, 연무장 개편, HEXA 매트릭스 초기화 스크롤, 체인지 서큘레이터 지원까지 완벽 정리.
                    </p>
                </header>

                <InArticleAd dataAdSlot="6849727140" />

                {/* 핵심 요약 */}
                <section className="mb-12 bg-gradient-to-br from-purple-900/30 via-slate-900/40 to-blue-900/30 border-2 border-purple-500/40 rounded-2xl p-6 sm:p-8">
                    <h2 className="text-2xl font-black text-purple-400 mb-6 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 animate-pulse" aria-hidden="true" />
                        핵심 요약: 무엇이 가장 크게 바뀌었나?
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800">
                            <p className="font-bold text-yellow-400 mb-2 flex items-center gap-1.5">
                                <Zap className="w-4 h-4" aria-hidden="true" />
                                행동 불가 저항 시간 단축
                            </p>
                            <p className="text-sm text-slate-300 leading-relaxed">행동 불가 상태 이상의 저항 시간이 <strong className="text-white">90초 ➔ 81초</strong>로 단축됩니다. 보스전 CC 저항이 더 빠르게 해제됩니다.</p>
                        </div>
                        <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800">
                            <p className="font-bold text-cyan-400 mb-2 flex items-center gap-1.5">
                                <CheckCircle className="w-4 h-4" aria-hidden="true" />
                                온오프 스킬 재접속 유지
                            </p>
                            <p className="text-sm text-slate-300 leading-relaxed">온오프 스킬의 활성화 여부가 재접속 시에도 유지되도록 변경됩니다.</p>
                        </div>
                        <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800">
                            <p className="font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                                <CheckCircle className="w-4 h-4" aria-hidden="true" />
                                연무장 개편
                            </p>
                            <p className="text-sm text-slate-300 leading-relaxed">연무장 UI/UX 개편. 리플레이 저장 및 공유 기능 등 다양한 편의 기능이 강화됩니다.</p>
                        </div>
                        <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800">
                            <p className="font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4" aria-hidden="true" />
                                HEXA 초기화 스크롤 & 체인지 서큘레이터
                            </p>
                            <p className="text-sm text-slate-300 leading-relaxed">HEXA 매트릭스 초기화 스크롤 및 체인지 서큘레이터 테스트 아이템이 지원됩니다.</p>
                        </div>
                    </div>
                </section>

                {/* 공통 수정 사항 */}
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-base">1</span>
                        공통 스킬 수정 사항
                    </h2>
                    <div className="rounded-2xl border border-blue-500/30 bg-slate-900/40 p-6 space-y-3">
                        {[
                            '버프 아이콘에 특수 코어 재사용 대기시간이 출력되도록 수정됩니다.',
                            '행동 불가 상태 이상의 저항 시간이 90초 ➔ 81초로 감소됩니다.',
                            '온오프 스킬의 활성화 여부가 재접속 시에도 유지되도록 변경됩니다.',
                            '일부 스킬 매크로 등록 불가 스킬을 등록 시도 시 안내 문구가 출력되지 않는 현상이 수정됩니다.',
                            '일부 특수 코어의 스킬 설명이 변경됩니다. (룬의 경험 I, 극복하는 경험 I)',
                            '극복하는 경험 I 특수 코어의 스킬 이름이 \'극복하는 경험\'에서 \'극복하는 경험 I\'으로 변경됩니다.',
                            '루나 쁘띠 스킬: 마이스터 빌의 채집 농장 맵에서 루나 쁘띠 스킬을 사용할 수 있는 현상이 수정됩니다.',
                            '루나 쁘띠 스킬: 월드 공유 펫 슬롯의 펫을 해제했을 때 루나 쁘띠 스킬이 해제되지 않는 현상 수정.',
                            '비숍 엔젤스 플레지의 속죄의 낙인, 제논, 키네시스 스킬 이펙트에 스킬 이펙트 투명도 옵션이 적용됩니다.',
                            '솔 헤카테: 녹시의 일부 동작에서 가끔 녹시가 어색하게 출력되는 현상이 수정됩니다.',
                            '솔 헤카테: 스틱스 — 죽음의 씨앗 디버프가 적용되지 않도록 수정됩니다.',
                            '솔 헤카테: 스틱스 — 직업과 상관없이 같은 데미지를 갖게 변경됩니다.',
                            '솔 헤카테: 스틱스 — 시전 이펙트가 추가됩니다.',
                            '메이플월드 여신의 축복: 지속 시간 동안 메이플 용사로 증가된 모든 능력치가 유지됩니다.',
                        ].map((change, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                                <ArrowRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-1" aria-hidden="true" />
                                <span className="text-slate-300 text-sm leading-relaxed">{renderChangeText(change)}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 직업별 밸런스 */}
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-base">2</span>
                        직업별 세부 변경 및 밸런스 패치 사항
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-6 break-keep">테스트월드 클라이언트 1.2.206 기준 직업별 스킬 수정 및 밸런스 조정 내역입니다.</p>
                    <div className="space-y-8">
                        {balanceDetails.map((group) => (
                            <div key={group.group} className={`relative overflow-hidden rounded-2xl border ${group.borderColor} bg-slate-900/20 backdrop-blur-sm p-6 sm:p-8`}>
                                <div className={`absolute -inset-y-0 left-0 w-32 bg-gradient-to-r ${group.bgGlow} pointer-events-none`} />
                                <div className="relative z-10">
                                    <h3 className="text-xl sm:text-2xl font-black text-white mb-6 pb-2 border-b border-slate-800/80">{group.group}</h3>
                                    <div className="space-y-6">
                                        {group.items.map((item) => (
                                            <div key={item.job} className="bg-slate-950/40 rounded-xl p-4 sm:p-5 border border-slate-800/60">
                                                <h4 className="text-base font-bold text-yellow-400 mb-3 flex items-center gap-2">
                                                    <span className="w-1.5 h-3 bg-yellow-500 rounded-sm" />
                                                    {item.job}
                                                </h4>
                                                <ul className="space-y-2">
                                                    {item.changes.map((change, ci) => (
                                                        <li key={ci} className="text-slate-300 text-sm leading-relaxed flex items-start gap-2">
                                                            <ArrowRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-1" aria-hidden="true" />
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

                <InArticleAd dataAdSlot="6849727140" />

                {/* 연무장 & HEXA & 체인지 */}
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center font-bold text-base">3</span>
                        연무장 개편 · HEXA 초기화 스크롤 · 체인지 서큘레이터
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="rounded-2xl border border-green-500/30 bg-slate-900/40 p-5">
                            <h3 className="font-black text-green-300 text-sm mb-3">🥊 연무장 개편</h3>
                            <ul className="text-slate-300 text-xs space-y-1.5">
                                <li>• UI/UX 전반 개편</li>
                                <li>• 리플레이 저장 / 공유 기능 강화</li>
                                <li>• 각종 오류 개선</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-amber-500/30 bg-slate-900/40 p-5">
                            <h3 className="font-black text-amber-300 text-sm mb-3">🔄 HEXA 초기화 스크롤</h3>
                            <ul className="text-slate-300 text-xs space-y-1.5">
                                <li>• HEXA 매트릭스 초기화 스크롤 테스트 아이템 지원</li>
                                <li>• 직업 밸런스 패치 후 스킬 초기화 혜택과 연계 예정</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-violet-500/30 bg-slate-900/40 p-5">
                            <h3 className="font-black text-violet-300 text-sm mb-3">🌀 체인지 서큘레이터</h3>
                            <ul className="text-slate-300 text-xs space-y-1.5">
                                <li>• 체인지 서큘레이터 테스트 아이템 지원</li>
                                <li>• 어빌리티 재설정 기능 테스트 가능</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 주의사항 */}
                <div className="mb-12 rounded-xl bg-amber-900/20 border border-amber-700/50 p-5 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="text-sm text-amber-200 break-keep">
                        <span className="font-bold">테스트월드 기준 정보입니다.</span> 이 내용은 테스트월드 클라이언트 1.2.206 기준이며, <span className="text-amber-300 font-bold">2026년 9월 17일(목) 점검 후 라이브 서버에 적용 예정</span>입니다. 라이브 적용 시 일부 내용이 변경될 수 있습니다.
                        <br /><span className="text-amber-400 text-xs mt-1 block">원문 출처: 메이플스토리 테스트월드 뉴스 #198 (2026.09.10 PM 04:55, 최종 수정 PM 07:10)</span>
                    </div>
                </div>

                {/* 관련 글 */}
                <section className="mt-10 pt-6 border-t border-slate-800">
                    <h2 className="text-base font-black text-white mb-4">📎 관련 글</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Link prefetch={false} href="/blog/testworld-update-1-2-206" className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-amber-500/50 transition-all group">
                            <span className="text-2xl">🧪</span>
                            <div>
                                <p className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors break-keep">테섭 1.2.206 패치노트 총정리</p>
                                <p className="text-slate-500 text-xs mt-0.5">퍼스널 버닝·아르고·어빌리티·소울웨폰 등</p>
                            </div>
                        </Link>
                        <Link prefetch={false} href="/blog/testworld-hexa-skill-balance-july-16-2026" className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-amber-500/50 transition-all group">
                            <span className="text-2xl">⚔️</span>
                            <div>
                                <p className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors break-keep">7월 테섭 신규 6차 스킬 변경점</p>
                                <p className="text-slate-500 text-xs mt-0.5">솔 에르다 인하·전직업 스킬 조정</p>
                            </div>
                        </Link>
                        <Link prefetch={false} href="/blog/september-2026-update-schedule" className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-amber-500/50 transition-all group">
                            <span className="text-2xl">📅</span>
                            <div>
                                <p className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors break-keep">9월 종료 일정 완벽 정리</p>
                                <p className="text-slate-500 text-xs mt-0.5">챌린저스·하이퍼버닝·제네시스 패스</p>
                            </div>
                        </Link>
                        <Link prefetch={false} href="/blog/new-6th-skills-guide-2026" className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-amber-500/50 transition-all group">
                            <span className="text-2xl">✨</span>
                            <div>
                                <p className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors break-keep">신규 3rd 6차 스킬 가이드</p>
                                <p className="text-slate-500 text-xs mt-0.5">전 직업 6차 스킬 우선순위</p>
                            </div>
                        </Link>
                    </div>
                </section>
            </article>
        </div>
    );
}
