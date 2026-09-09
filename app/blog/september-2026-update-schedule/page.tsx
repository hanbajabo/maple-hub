'use client';

import Link from 'next/link';
import { ArrowLeft, CalendarX, CalendarCheck, Gift, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

// ──────────────────────────────────────────
// 데이터 정의
// ──────────────────────────────────────────

const SCHEDULE = [
    {
        date: '2026.09.10',
        type: 'start',
        label: '예정',
        color: 'green',
        items: [
            {
                category: '테스트월드',
                icon: '🧪',
                list: [
                    '9월 업데이트 테스트월드 진행 예정',
                ],
            },
            {
                category: '9월 메이플 나우',
                icon: '📺',
                list: [
                    '9월 메이플 나우 방송 예정',
                    '8월 업데이트 발표 내용의 약 2배 분량으로 진행 예정',
                ],
                highlight: true,
            },
        ],
    },

    {
        date: '2026.09.15',
        type: 'end',
        label: '종료',
        color: 'red',
        items: [
            {
                category: '캐시샵',
                icon: '🛍️',
                list: [
                    '몬스터파크 핸즈 이용권',
                    '제네시스 패스 & 제네시스 패스 PLUS',
                ],
                itemExtras: [
                    {
                        name: '몬스터파크 핸즈 이용권',
                        image: '/images/monsterpark-hands.png',
                        note: '⚠️ 사용 기한: 2026년 9월 16일(수) 오후 11시 59분까지',
                    },
                    {
                        name: '제네시스 패스 & 제네시스 패스 PLUS',
                        image: '/images/genesis-pass.png',
                        note: '⚠️ 효과 적용 기한: 2026년 9월 16일(수) 오후 11시 59분까지',
                    },
                ],
            },
        ],
    },
    {
        date: '2026.09.16',
        type: 'end',
        label: '종료',
        color: 'red',
        items: [
            {
                category: '이벤트',
                icon: '🎪',
                list: [
                    '울티마 유물 탐사',
                    '광신도의 자격',
                    '상인단의 물자 지원 III',
                    '모멘텀 패스 PLUS',
                    '헤이즐의 부탁',
                    '메이린 격파 이벤트',
                    '챌린저스 패스',
                    '하이퍼 버닝 MAX',
                    '하이퍼 블링크',
                    '버닝 BEYOND',
                    '아이템 버닝 PLUS',
                    '울티마 작전 일지 (이벤트 종료 & 보약 스킬 강화 마감)',
                    '에테리온 아티팩트',
                    '신입 용병 지원 미션',
                    '연합 토큰샵 & 상인단 현상금 의뢰',
                    '의문의 결계',
                    '챌린저스 월드 2차 사전 리프 종료 (~오후 11시 59분)',
                    '프리미엄 기프트샵 종료 (~오후 11시 59분)',
                ],
                yellowItems: [
                    '울티마 작전 일지 (이벤트 종료 & 보약 스킬 강화 마감)',
                ],
                itemExtras: [
                    {
                        name: '울티마 작전 일지 - 훈련 일지(보약 스킬) 유지 기간',
                        image: '/images/ultima-training-log.png',
                        note: '\'훈련 일지\'(보약 스킬) 효과는 9/23(수) 23:59까지 1주일 더 유지됩니다! (단, 9/16 이후 스킬 강화 불가)',
                    },
                ],
            },
            {
                category: '캐시샵',
                icon: '🛍️',
                list: [
                    '메이플스토리 보스 패키지',
                    '스페셜 루나 크리스탈',
                    '전 직업 일러스트 컬렉션 : 모험가',
                    '전 직업 일러스트 컬렉션 : 시그너스 & 영웅',
                    '전 직업 일러스트 컬렉션 : 데몬 & 레지스탕스',
                    '전 직업 일러스트 컬렉션 : 노바 & 레프',
                    '전 직업 일러스트 컬렉션 : 키네시스&제로&아니마',
                    '전 직업 일러스트 컬렉션 헤어 쿠폰',
                    '전 직업 헤어 & 성형 쿠폰',
                ],
            },
        ],
    },
    {
        date: '2026.09.17',
        type: 'end',
        label: '종료 & 리프',
        color: 'red',
        items: [
            {
                category: '챌린저스 월드',
                icon: '🌐',
                list: [
                    '챌린저스 월드 시즌4 캐릭터 육성 종료 (점검 후 육성 불가)',
                    '챌린저스 월드 종료 리프 시작 (9/17 점검 후 ~ 9/30 23:59)',
                    '캐시보관함 / 메이플 옥션 / 택배 보관함 이용 불가 (창고/상점 및 수령만 가능)',
                ],
                highlightIndex: [0],
                itemExtras: [
                    {
                        name: '챌린저스 월드 시즌4 육성 및 리프 일정',
                        image: '/images/challengers-world-season4.png',
                        note: '⚠️ 9/17(목) 점검 후부터 캐릭터 육성 불가 & 종료 리프(~9/30) 진행 / 9/30 운영 종료',
                    },
                ],
            },
            {
                category: 'PC방 이벤트',
                icon: '💻',
                list: [
                    '프리미엄 PC방 접속 보상 이벤트 종료 (~오후 11시 59분)',
                    '※ 프리미엄 기프트샵은 9/16(수) 23:59에 하루 먼저 종료되니 유의!',
                ],
                highlightIndex: [0],
                itemExtras: [
                    {
                        name: '프리미엄 PC방 접속 보상 및 기프트샵 진행 기간',
                        image: '/images/premium-pcroom-event.png',
                        note: '⚠️ 접속 보상은 9/17(목) 23:59까지 / 프리미엄 기프트샵은 9/16(수) 23:59에 먼저 종료!',
                    },
                ],
            },
        ],
    },
    {
        date: '2026.09.17',
        type: 'update',
        label: '업데이트',
        color: 'amber',
        items: [
            {
                category: '패치 안내',
                icon: '📢',
                list: [
                    '마스터피스 사용 시 획득 가능한 스페셜 라벨 아이템 11기수 → 6기수로 축소',
                ],
                highlight: true,
            },
        ],
    },
    {
        date: '2026.09.23',
        type: 'end',
        label: '효과 종료',
        color: 'purple',
        items: [
            {
                category: '보약 스킬',
                icon: '✨',
                list: [
                    '울티마 작전 일지 - \'훈련 일지\'(보약 스킬) 효과 최종 종료 (~오후 11시 59분)',
                    '※ 9/16(수) 23:59 이후로는 스킬 강화가 불가능했으므로 기존 습득 스킬만 유지',
                ],
                highlightIndex: [0],
            },
        ],
    },
    {
        date: '2026.09.30',
        type: 'end',
        label: '운영 종료',
        color: 'red',
        items: [
            {
                category: '챌린저스 월드',
                icon: '🌐',
                list: [
                    '챌린저스 월드 시즌4 종료 리프 마감 (~오후 11시 59분)',
                    '챌린저스 월드 시즌4 서버 운영 최종 종료',
                ],
                highlightIndex: [0],
            },
        ],
    },
];

// ──────────────────────────────────────────
// 색상 헬퍼
// ──────────────────────────────────────────
function colorSet(color: string) {
    if (color === 'green') return {
        badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        dot: 'bg-emerald-400',
        card: 'border-emerald-500/20 bg-emerald-950/10',
        icon: <CalendarCheck className="w-4 h-4 text-emerald-400" />,
    };
    if (color === 'red') return {
        badge: 'bg-red-500/20 text-red-400 border-red-500/40',
        dot: 'bg-red-400',
        card: 'border-red-500/20 bg-red-950/10',
        icon: <CalendarX className="w-4 h-4 text-red-400" />,
    };
    if (color === 'amber') return {
        badge: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
        dot: 'bg-amber-400',
        card: 'border-amber-500/20 bg-amber-950/10',
        icon: <AlertCircle className="w-4 h-4 text-amber-400" />,
    };
    if (color === 'purple') return {
        badge: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
        dot: 'bg-purple-400',
        card: 'border-purple-500/20 bg-purple-950/10',
        icon: <Sparkles className="w-4 h-4 text-purple-400" />,
    };
    return {
        badge: 'bg-slate-500/20 text-slate-400 border-slate-500/40',
        dot: 'bg-slate-400',
        card: 'border-slate-500/20 bg-slate-800/20',
        icon: <Gift className="w-4 h-4 text-slate-400" />,
    };
}

// ──────────────────────────────────────────
// 메인 컴포넌트
// ──────────────────────────────────────────
export default function September2026UpdateSchedule() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

            {/* 상단 네비 */}
            <div className="border-b border-slate-800 bg-slate-950/60 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
                    <Link prefetch={false} href="/blog" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-xs sm:text-sm">
                        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        블로그로 돌아가기
                    </Link>
                </div>
            </div>

            <article className="max-w-3xl mx-auto px-3 sm:px-6 py-6 sm:py-12">

                {/* 헤더 */}
                <header className="mb-6 sm:mb-10">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-400 text-[11px] sm:text-xs font-bold rounded-full border border-blue-500/30">업데이트 소식</span>
                        <span className="px-2.5 py-0.5 bg-orange-500/20 text-orange-400 text-[11px] sm:text-xs font-bold rounded-full border border-orange-500/30">9월 일정</span>
                        <span className="text-slate-500 text-[11px] sm:text-xs">2026년 9월 9일</span>
                    </div>
                    <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-white mb-2 leading-tight break-keep">
                        📅 9월 종료 일정 완벽 정리
                    </h1>
                    <p className="text-slate-400 text-xs sm:text-base leading-relaxed break-keep">
                        9월 10일 테스트월드 & 메이플 나우를 시작으로,<br className="hidden sm:block" />
                        9월 15~17일 대규모 종료와 마스터피스 패치까지 한눈에 확인하세요.
                    </p>
                </header>

                {/* 핵심 요약 카드 */}
                <section className="mb-8 sm:mb-10 bg-gradient-to-br from-red-900/30 via-orange-900/20 to-slate-900 border border-red-500/40 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 shadow-lg">
                    <h2 className="text-sm sm:text-lg font-black text-red-300 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse text-red-400" />
                        ⚡ 9월 주요 종료 일정 요약
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {[
                            { icon: '🧪', label: '9월 10일 예정', value: '테스트월드 & 메이플 나우 (8월의 2배 규모!)', color: 'text-emerald-300' },
                            { icon: '🛍️', label: '9월 15일 종료', value: '제네시스 패스 & 핸즈 이용권', color: 'text-red-300' },
                            { icon: '🎪', label: '9월 16일 종료', value: '하이퍼버닝 · 울티마 · 챌린저스 패스 외', color: 'text-orange-300' },
                            { icon: '🌐', label: '9월 17일 종료', value: '챌린저스 월드 육성 종료 (종료 리프 시작)', color: 'text-yellow-300' },
                            { icon: '📢', label: '9월 17일 패치', value: '마스터피스 스페셜 라벨 11기수→6기수', color: 'text-amber-300' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2.5 sm:gap-3 bg-slate-900/70 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 border border-slate-700/50">
                                <span className="text-xl sm:text-2xl shrink-0">{item.icon}</span>
                                <div className="min-w-0">
                                    <div className="text-[10px] sm:text-xs text-slate-400 font-semibold">{item.label}</div>
                                    <div className={`text-xs sm:text-sm font-bold ${item.color} truncate sm:whitespace-normal`}>{item.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* 타임라인 */}
                <section className="mb-8 sm:mb-10">
                    <h2 className="text-base sm:text-xl font-black text-white mb-4 sm:mb-6 flex items-center gap-2">
                        <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                        📋 날짜별 상세 일정
                    </h2>

                    <div className="relative">
                        {/* 세로 타임라인 선 (모바일 10px, 데스크탑 20px) */}
                        <div className="absolute left-[9px] sm:left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-700 via-slate-600 to-transparent rounded-full" />

                        <div className="space-y-5 sm:space-y-6">
                            {SCHEDULE.map((entry, idx) => {
                                const cs = colorSet(entry.color);
                                return (
                                    <div key={idx} className="relative pl-6 sm:pl-12">
                                        {/* 타임라인 점 */}
                                        <div className={`absolute left-[5px] sm:left-[15px] top-1.5 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full ${cs.dot} shadow-md ring-2 ring-slate-950`} />

                                        {/* 날짜 + 배지 */}
                                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                                            <span className="text-white font-black text-sm sm:text-lg">{entry.date}</span>
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold border ${cs.badge}`}>
                                                {cs.icon}
                                                {entry.label}
                                            </span>
                                        </div>

                                        {/* 카테고리별 아이템 */}
                                        <div className={`border rounded-xl overflow-hidden ${cs.card} shadow-sm`}>
                                            {entry.items.map((group, gi) => (
                                                <div key={gi} className={`${gi > 0 ? 'border-t border-slate-700/40' : ''}`}>
                                                    {/* 카테고리 헤더 */}
                                                    <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800/50">
                                                        <span className="text-sm sm:text-base">{group.icon}</span>
                                                        <span className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wide">{group.category}</span>
                                                    </div>
                                                     {/* 아이템 목록 */}
                                                    <ul className="px-3 sm:px-4 py-2 sm:py-3 space-y-1.5">
                                                        {group.list.map((item, ii) => {
                                                            const isYellow = (group as any).yellowItems?.includes(item);
                                                            const isBold = (group as any).highlightIndex?.includes(ii) || ((group as any).highlight && !isYellow);

                                                            let textClass = 'text-slate-100';
                                                            if (isYellow) {
                                                                textClass = 'text-amber-300 font-normal';
                                                            } else if (isBold) {
                                                                textClass = 'text-amber-300 font-black tracking-tight';
                                                            }

                                                            return (
                                                                <li key={ii} className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-200 leading-snug break-keep">
                                                                    <span className={`mt-1 sm:mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${cs.dot} opacity-80`} />
                                                                    <span className={textClass}>
                                                                        {item}
                                                                    </span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                    {/* itemExtras: 이미지 + 사용기한 노트 */}
                                                    {(group as any).itemExtras && (group as any).itemExtras.map((extra: { name: string; image: string; note: string }, ei: number) => (
                                                        <div key={ei} className="mx-2 sm:mx-4 mb-2.5 sm:mb-3 rounded-lg sm:rounded-xl overflow-hidden border border-slate-600/40 bg-slate-800/40">
                                                            {extra.image && (
                                                                <img
                                                                    src={extra.image}
                                                                    alt={extra.name}
                                                                    className="w-full h-auto object-contain block"
                                                                    loading="lazy"
                                                                />
                                                            )}
                                                            <div className={`px-2.5 sm:px-4 py-2 sm:py-2.5 flex items-start gap-1.5 sm:gap-2 ${extra.image ? 'bg-amber-900/30 border-t border-amber-500/30' : 'bg-amber-900/20 border border-amber-500/20 rounded-lg sm:rounded-xl'}`}>
                                                                {!extra.image && <span className="text-[11px] sm:text-xs font-bold text-slate-300 shrink-0 mt-0.5">📌 {extra.name}</span>}
                                                                {!extra.image && <span className="text-slate-500 text-xs">|</span>}
                                                                <span className="text-[11px] sm:text-xs font-bold text-amber-200 leading-snug break-keep">{extra.note}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* 챌린저스 월드 시즌4 육성 종료 & 리프 일정 상세 */}
                <section className="mb-8 sm:mb-10">
                    <h2 className="text-base sm:text-xl font-black text-white mb-3 sm:mb-5 flex items-center gap-2">
                        <span>🌐</span> 챌린저스 월드 시즌4 육성 종료 & 리프 일정
                    </h2>

                    <div className="bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/40 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 mb-4 shadow-lg">
                        {/* 공식 안내 이미지 */}
                        <div className="rounded-lg sm:rounded-xl overflow-hidden border border-indigo-500/30 mb-4 bg-slate-950/60 shadow-md">
                            <img
                                src="/images/challengers-world-season4.png"
                                alt="챌린저스 월드 시즌4 육성 및 리프 일정"
                                className="w-full h-auto object-contain block"
                                loading="lazy"
                            />
                        </div>

                        {/* 일정 상세 그리드 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3.5 sm:mb-4">
                            {/* 1. 육성 기간 & 2차 사전 리프 */}
                            <div className="bg-slate-900/80 border border-blue-500/30 rounded-xl p-3 sm:p-4">
                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                    <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-blue-400"></span>
                                    <h3 className="text-xs sm:text-sm font-black text-blue-300">챌린저스 월드 육성 기간</h3>
                                </div>
                                <div className="text-[11px] sm:text-xs text-slate-400 mb-2.5 leading-relaxed">
                                    * 챌린저스 월드 혜택 적용 및 캐릭터 육성 가능
                                </div>
                                <div className="space-y-1.5 sm:space-y-2 text-xs">
                                    <div className="flex justify-between items-center py-1 sm:py-1.5 border-b border-slate-800 gap-2">
                                        <span className="text-slate-400 text-[11px] sm:text-xs">육성 시작</span>
                                        <span className="text-slate-200 font-semibold text-[11px] sm:text-xs">2026.06.18(목) 점검 후</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 sm:py-1.5 border-b border-slate-800 gap-2">
                                        <span className="text-slate-400 text-[11px] sm:text-xs">1차 사전 리프</span>
                                        <span className="text-slate-400 text-[11px] sm:text-xs">07.23 ~ 08.19 (종료)</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 sm:py-1.5 bg-blue-500/10 px-2 rounded-lg border border-blue-500/20 gap-2">
                                        <span className="text-blue-300 font-bold text-[11px] sm:text-xs">2차 사전 리프 마감</span>
                                        <span className="text-red-400 font-bold text-[11px] sm:text-xs">~ 09.16(수) 23:59</span>
                                    </div>
                                </div>
                            </div>

                            {/* 2. 종료 리프 기간 & 운영 종료 */}
                            <div className="bg-slate-900/80 border border-purple-500/30 rounded-xl p-3 sm:p-4">
                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                    <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-purple-400"></span>
                                    <h3 className="text-xs sm:text-sm font-black text-purple-300">챌린저스 월드 종료 리프 기간</h3>
                                </div>
                                <div className="text-[11px] sm:text-xs text-red-300/90 mb-2.5 font-semibold leading-relaxed">
                                    * 점검 후 캐릭터 육성 불가! 리프만 진행 가능
                                </div>
                                <div className="space-y-1.5 sm:space-y-2 text-xs">
                                    <div className="flex justify-between items-center py-1 sm:py-1.5 border-b border-slate-800 gap-2">
                                        <span className="text-slate-400 text-[11px] sm:text-xs shrink-0">육성 종료 & 리프 시작</span>
                                        <span className="text-yellow-300 font-bold text-[11px] sm:text-xs text-right">2026.09.17(목) 점검 후</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 sm:py-1.5 border-b border-slate-800 gap-2">
                                        <span className="text-slate-400 text-[11px] sm:text-xs shrink-0">종료 리프 진행</span>
                                        <span className="text-purple-200 font-semibold text-[11px] sm:text-xs text-right">09.17 점검 후 ~ 09.30 23:59</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 sm:py-1.5 bg-red-500/10 px-2 rounded-lg border border-red-500/20 gap-2">
                                        <span className="text-red-300 font-bold text-[11px] sm:text-xs">시즌4 최종 운영 종료</span>
                                        <span className="text-red-400 font-bold text-[11px] sm:text-xs">2026.09.30(수) 23:59</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 종료 리프 기간 제약 및 주의사항 */}
                        <div className="bg-red-950/40 border border-red-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 text-[11px] sm:text-xs text-slate-300 leading-relaxed break-keep">
                            <div className="font-bold text-red-300 flex items-center gap-1.5 mb-1.5">
                                <span>⚠️</span> 종료 리프 기간(9/17 점검 후 ~ 9/30) 이용 제한 안내
                            </div>
                            <ul className="space-y-1 text-slate-300 list-disc list-inside">
                                <li><strong className="text-white">캐릭터 육성 불가</strong>: 사냥 및 퀘스트 등을 통한 추가 레벨업/육성이 불가능합니다.</li>
                                <li><strong className="text-white">보관함/옥션 이용 불가</strong>: <span className="text-red-300 font-semibold">캐시보관함, 메이플 옥션, 택배 보관함 이용이 제한</span>됩니다. (창고/상점 이용 및 옥션 판매&amp;완료 탭을 통한 취소 및 수령만 가능)</li>
                                <li>캐시 아이템 이동이나 옥션 물품 회수는 <strong className="text-yellow-300">반드시 9월 17일(목) 점검 전</strong>에 완료해 두시는 것을 강력 권장합니다!</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 마스터피스 사양 변경 상세 */}
                <section className="mb-8 sm:mb-10">
                    <h2 className="text-base sm:text-xl font-black text-white mb-3 sm:mb-5 flex items-center gap-2">
                        <span>📢</span> 9월 17일 마스터피스 사양 변경
                    </h2>

                    <div className="bg-gradient-to-br from-amber-900/30 to-slate-900 border border-amber-500/40 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 mb-4 shadow-lg">
                        <div className="text-[10px] sm:text-xs text-amber-300 font-bold uppercase tracking-wider mb-2.5 sm:mb-3">📅 2026.09.17 점검 후 적용</div>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3.5 sm:mb-4">
                            <div className="bg-slate-900/70 border border-red-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                                <div className="text-[10px] sm:text-xs text-slate-400 mb-0.5 sm:mb-1">변경 전</div>
                                <div className="text-lg sm:text-2xl font-black text-red-300">11기수</div>
                                <div className="text-[9px] sm:text-xs text-red-400/80 mt-0.5 sm:mt-1 break-keep">획득 가능 스페셜 라벨</div>
                            </div>
                            <div className="bg-slate-900/70 border border-emerald-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                                <div className="text-[10px] sm:text-xs text-slate-400 mb-0.5 sm:mb-1">변경 후</div>
                                <div className="text-lg sm:text-2xl font-black text-emerald-300">6기수</div>
                                <div className="text-[9px] sm:text-xs text-emerald-400/80 mt-0.5 sm:mt-1 break-keep">획득 가능 스페셜 라벨</div>
                            </div>
                        </div>
                        <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 text-[11px] sm:text-xs text-slate-300 leading-relaxed break-keep">
                            <p className="font-bold text-amber-200 mb-1">⚠️ 주요 변경사항</p>
                            <p>9월 17일 점검 이후 마스터피스를 사용하면 획득 가능한 스페셜 라벨 아이템의 기수가 <strong className="text-white">11기수에서 6기수로 줄어듭니다.</strong></p>
                            <p className="mt-1.5 text-slate-400 text-[10px] sm:text-xs">원하는 기수의 라벨 아이템이 있다면 9월 17일 이전에 사전 안내를 확인하고 마스터피스를 사용하는 것을 권장합니다.</p>
                        </div>
                    </div>
                </section>

                {/* 주의사항 */}
                <section className="mb-8 sm:mb-10 bg-amber-900/20 border border-amber-500/30 rounded-xl sm:rounded-2xl p-3.5 sm:p-5">
                    <h2 className="text-sm sm:text-base font-black text-amber-300 mb-2.5 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        ⚠️ 주의사항
                    </h2>
                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-300 break-keep">
                        <li className="flex items-start gap-1.5 sm:gap-2"><CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 shrink-0 mt-0.5" /><span>일정은 공식 공지 기준이며, 점검 시간에 따라 실제 적용 시간이 달라질 수 있습니다.</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 shrink-0 mt-0.5" /><span>캐시샵 아이템은 판매 종료일 기준으로, 구매 후 사용 기간은 별도로 유지됩니다.</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 shrink-0 mt-0.5" /><span>챌린저스 월드 시즌4 종료 후 시즌 보상 수령 일정은 공식 공지를 별도로 확인해 주세요.</span></li>
                        <li className="flex items-start gap-1.5 sm:gap-2"><CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 shrink-0 mt-0.5" /><span><strong className="text-white">프리미엄 PC방 이벤트</strong>: 접속 보상은 9월 17일(목) 23:59까지 진행되지만, <strong>프리미엄 기프트샵은 9월 16일(수) 23:59에 하루 먼저 마감</strong>되니 코인을 미리 사용해 주세요.</span></li>
                        <li className="flex items-start gap-1.5 sm:gap-2"><CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 shrink-0 mt-0.5" /><span><strong className="text-white">울티마 작전 일지(보약 스킬)</strong>: '훈련 일지' 스킬 효과는 <strong>9월 23일(수) 23:59까지 1주일 더 유지</strong>됩니다. 단, 9월 16일(수) 23:59 이후로는 스킬 강화가 불가능하므로 미리 마스터해 두세요!</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 shrink-0 mt-0.5" /><span>마스터피스 스페셜 라벨 사양 변경은 <strong className="text-white">9월 17일 점검 후</strong>부터 적용됩니다.</span></li>
                    </ul>
                </section>

                {/* 관련 글 */}
                <section>
                    <h2 className="text-base sm:text-lg font-black text-white mb-3 sm:mb-4">📚 관련 가이드</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                        <Link prefetch={false} href="/blog/august-2026-update-schedule" className="bg-slate-900/60 border border-slate-700 rounded-xl p-3 sm:p-4 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all group">
                            <div className="text-[11px] sm:text-xs text-blue-400 mb-0.5 sm:mb-1 font-semibold">업데이트 소식</div>
                            <div className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors break-keep">📅 8월 업데이트 일정 완벽 정리</div>
                        </Link>
                        <Link prefetch={false} href="/blog/challengers-pass-efficiency-2026" className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 hover:border-purple-500/50 hover:bg-slate-800/50 transition-all group">
                            <div className="text-[11px] sm:text-xs text-purple-400 mb-0.5 sm:mb-1 font-semibold">이벤트 가이드</div>
                            <div className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors break-keep">🏆 챌린저스 패스 효율 완벽 분석</div>
                        </Link>
                        <Link prefetch={false} href="/blog/momentum-pass-plus-guide" className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all group">
                            <div className="text-[11px] sm:text-xs text-emerald-400 mb-0.5 sm:mb-1 font-semibold">이벤트 가이드</div>
                            <div className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors break-keep">🌀 모멘텀 패스 PLUS 완벽 가이드</div>
                        </Link>
                        <Link prefetch={false} href="/blog/ultima-artifact-exploration-guide" className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 hover:border-amber-500/50 hover:bg-slate-800/50 transition-all group">
                            <div className="text-[11px] sm:text-xs text-amber-400 mb-0.5 sm:mb-1 font-semibold">이벤트 가이드</div>
                            <div className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors break-keep">🗺️ 울티마 유물 탐사 완벽 공략</div>
                        </Link>
                    </div>
                </section>

            </article>
        </div>
    );
}
