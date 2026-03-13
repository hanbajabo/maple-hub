import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Gift, Zap, AlertCircle, Clock, Star, PartyPopper, ShoppingCart, ChevronRight } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export const metadata: Metadata = {
    title: '메이플스토리 이번 주말 ~ 3/19 일정 완벽 총정리 | 23주년 롯데월드 랜선투어 & 썬데이 메이플',
    description: '3/14 롯데월드 랜선투어, 3/15 역대급 썬데이 메이플, 3/19 패치 전 이벤트 마감까지! 이번 주 메이플스토리에서 절대 놓치면 안 되는 일정을 한 눈에 정리했습니다.',
    openGraph: {
        title: '메이플스토리 이번 주말 ~ 3/19 일정 완벽 총정리 | 23주년 롯데월드 랜선투어',
        description: '3/14 롯데월드 랜선투어, 3/15 역대급 썬데이 메이플, 3/19 이벤트 마감까지! 놓치면 후회하는 일정 총정리.',
        images: [
            {
                url: 'https://maple.ai.kr/images/og/weekend-march-schedule-2026.png',
                width: 1200,
                height: 630,
                alt: '메이플스토리 이번 주말 ~ 3/18 일정 총정리',
            },
        ],
    },
};

export default function WeekendMarchSchedule2026() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <Link
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
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full">
                            이벤트 가이드
                        </span>
                        <span className="px-3 py-1 bg-rose-500/20 text-rose-400 text-xs font-bold rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            긴급 정리
                        </span>
                        <span className="text-slate-500 text-sm">2026년 3월 13일</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                        이번 주말 3/14(토) ~ 3/19(목)<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">
                            메이플 일정 완벽 총정리
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                        3월 19일 목요일 패치 후부터, <span className="text-amber-400 font-bold">23주년 기념 역대급 이벤트</span>들이 쏟아집니다.<br />
                        그 전에 롯데월드 랜선투어부터 새로운 썬데이 메이플, 그리고 수요일 마감 코인샵까지<br />
                        — 놓치면 후회하는 <strong className="text-white">메이플 모든 일정</strong>을 깔끔하게 정리했습니다.
                    </p>
                </header>

                {/* 타임라인 요약 카드 */}
                <div className="mb-12 bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-rose-900/30 border-2 border-amber-500/50 rounded-2xl p-5 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl animate-pulse delay-75" />
                    <div className="relative z-10">
                        <h2 className="text-xl sm:text-2xl font-black text-amber-400 mb-5 flex items-center gap-2">
                            <Calendar className="w-6 h-6" />
                            한눈에 보는 이번 주 캘린더
                        </h2>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                            {[
                                { date: '3/14 (토)', time: '오후 5시', title: '23주년 롯데월드 랜선투어 LIVE', color: 'text-amber-400', bg: 'bg-amber-900/30 border-amber-500/40', emoji: '🎡' },
                                { date: '3/14 (토)', time: '오후 4시~', title: 'VIP 사우나 이용권 6개 수령 시작', color: 'text-yellow-400', bg: 'bg-yellow-900/30 border-yellow-500/40', emoji: '🎁' },
                                { date: '3/15 (일)', time: '하루종일', title: '새로 도입된 보상형 썬데이 메이플', color: 'text-green-400', bg: 'bg-green-900/30 border-green-500/40', emoji: '☀️' },
                                { date: '3/18 (수)', time: '오후 11:59 마감', title: '크라운 이벤트 완전 종료 & 코인샵 결산', color: 'text-rose-400', bg: 'bg-rose-900/30 border-rose-500/40', emoji: '⚠️' },
                                { date: '3/19 (목)', time: '점검 후', title: '23주년 메이플 이벤트 본섭 상륙', color: 'text-purple-400', bg: 'bg-purple-900/30 border-purple-500/40', emoji: '🚀' },
                            ].map((item, i, arr) => {
                                const isLast = i === arr.length - 1;
                                return (
                                    <div key={i} className={`flex ${isLast ? 'flex-row items-center' : 'flex-col sm:flex-row items-start sm:items-center'} gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl border ${item.bg} ${isLast ? 'col-span-2' : ''}`}>
                                        <div className={`flex items-center justify-between ${isLast ? '' : 'w-full sm:w-auto'}`}>
                                            <span className="text-xl sm:text-2xl flex-shrink-0">{item.emoji}</span>
                                            {!isLast && <ChevronRight className={`w-4 h-4 sm:hidden flex-shrink-0 opacity-50 ${item.color}`} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2 mb-1 sm:mb-0.5">
                                                <span className={`font-black text-sm sm:text-base ${item.color}`}>{item.date}</span>
                                                <span className="text-[11px] sm:text-xs text-slate-400">{item.time}</span>
                                            </div>
                                            <p className="text-white text-xs sm:text-base font-semibold break-keep leading-tight sm:mt-0">{item.title}</p>
                                        </div>
                                        {isLast ? (
                                            <ChevronRight className={`w-5 h-5 flex-shrink-0 opacity-70 ${item.color}`} />
                                        ) : (
                                            <ChevronRight className={`w-5 h-5 hidden sm:block flex-shrink-0 opacity-70 ${item.color}`} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Section 1: 랜선투어 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <PartyPopper className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-xs text-amber-300/70 font-bold uppercase tracking-widest mb-0.5">3월 14일 (토) 오후 5시</p>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-amber-400 leading-tight">
                                    🎡 23주년 기념 '롯데월드 랜선투어' & VIP 사우나
                                </h2>
                            </div>
                        </div>

                        <p className="text-slate-300 mb-6 leading-relaxed">
                            이번 미니 쇼케이스는 단순한 랜선투어가 아닙니다.{' '}
                            <span className="text-amber-400 font-bold">오프라인 테마파크 최초 공개 + 역대급 23주년 이벤트 예고</span>가 함께 펼쳐집니다.
                        </p>

                        {/* 랜선투어 배너 이미지 */}
                        <div className="mb-6 rounded-xl overflow-hidden border border-amber-500/30">
                            <Image
                                src="/images/blog/lanson-tour-banner.png"
                                alt="메이플스토리 NOW 랜선투어 배너"
                                width={1200}
                                height={400}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* 롯데월드 협업 이미지 */}
                        <div className="mb-6 rounded-xl overflow-hidden border border-amber-500/30">
                            <Image
                                src="/images/blog/lotte-world-collab.png"
                                alt="메이플스토리 롯데월드 콜라보 메이플 아일랜드"
                                width={1200}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                            <div className="bg-slate-900/80 px-4 py-2 text-center">
                                <p className="text-xs text-slate-400">▲ 롯데월드 내 오프라인 테마파크 '메이플 아일랜드' (랜선투어에서 최초 공개 예정)</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* 포인트 1 */}
                            <div className="bg-slate-900/60 border border-amber-500/30 rounded-xl p-5">
                                <p className="text-amber-300 font-black text-lg mb-2">1. 오프라인 테마파크 '메이플 아일랜드' 최초 공개</p>
                                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                    롯데월드 내 실제 오프라인 테마파크인 <span className="text-white font-bold">'메이플 아일랜드'</span>의 모습이 드디어 랜선투어를 통해 공개됩니다.
                                    메이플 세계관을 그대로 옮겨놓은 다양한 즐길 거리와 테마 먹거리들이 소개될 예정입니다.
                                </p>
                                <div className="rounded-lg overflow-hidden border border-amber-500/20">
                                    <Image
                                        src="/images/blog/maple-island-attractions.png"
                                        alt="메이플 아일랜드 즐길거리 - 메이플 캐릭터 조형물과 테마 입구"
                                        width={1200}
                                        height={600}
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="bg-slate-900/80 px-4 py-2 text-center">
                                        <p className="text-xs text-slate-400">▲ 메이플 아일랜드 내 캐릭터 조형물 & 테마 입구 (미리보기)</p>
                                    </div>
                                </div>

                                {/* 먹거리 & 굿즈 */}
                                <div className="mt-3 rounded-lg overflow-hidden border border-amber-500/20">
                                    <Image
                                        src="/images/blog/maple-island-food.png"
                                        alt="메이플 아일랜드 테마 음식 - 단풍이 음료·디저트·스낵"
                                        width={1200}
                                        height={400}
                                        className="w-full h-auto object-cover bg-white"
                                    />
                                    <div className="bg-slate-900/80 px-4 py-2 text-center">
                                        <p className="text-xs text-slate-400">▲ 메이플 아일랜드 한정 테마 먹거리 (음료·포테이토·아이스크림 등)</p>
                                    </div>
                                </div>
                                <div className="mt-3 rounded-lg overflow-hidden border border-amber-500/20">
                                    <Image
                                        src="/images/blog/maple-island-goods.png"
                                        alt="메이플 아일랜드 한정 굿즈 - 키링·인형·머리띠 등"
                                        width={1200}
                                        height={500}
                                        className="w-full h-auto object-cover bg-white"
                                    />
                                    <div className="bg-slate-900/80 px-4 py-2 text-center">
                                        <p className="text-xs text-slate-400">▲ 메이플 아일랜드 한정 굿즈 (키링·아크릴 스탠드·인형·머리띠 등)</p>
                                    </div>
                                </div>
                            </div>

                            {/* 포인트 2 */}
                            <div className="bg-slate-900/60 border border-orange-500/30 rounded-xl p-5">
                                <p className="text-orange-300 font-black text-lg mb-2">2. 역대급 볼륨의 23주년 이벤트 예고</p>
                                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                    이번 23주년 인게임 이벤트는 이전 주년 이벤트들과 비교가 안 될 정도로 볼륨이 크게 준비되었다고 합니다.
                                    특정 스펙업 유저만이 아닌, <span className="text-white font-bold">수평적으로 수많은 유저들이 다 함께 즐길 수 있는 이벤트</span>들로 꽉 채워졌으며,
                                    특히 <span className="text-yellow-400 font-bold">'성장(레벨업/스펙업)'</span>과 관련된 대규모 이벤트가 강력하게 언급되었습니다.
                                </p>
                                <div className="mb-4 rounded-lg overflow-hidden border border-orange-500/20">
                                    <Image
                                        src="/images/blog/changsup-yeokdaegup.png"
                                        alt="김창섭 디렉터의 역대급 23주년 이벤트 언급"
                                        width={1200}
                                        height={600}
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="bg-slate-900/80 px-4 py-2 text-center">
                                        <p className="text-xs text-slate-400">▲ "이번 23주년은 아마 역대급이 되지 않을까..." 최초 언급 장면</p>
                                    </div>
                                </div>
                                <div className="bg-orange-900/20 border border-orange-500/40 rounded-lg p-4 flex flex-col items-center gap-3">
                                    <p className="text-orange-200 text-sm font-semibold">
                                        ✨ 자세한 내용은 3월 14일 오후 5시 랜선투어에서 모두 공개됩니다!
                                    </p>
                                    <div className="bg-gradient-to-r from-orange-500/20 via-rose-500/20 to-orange-500/20 border border-orange-400/50 px-5 py-2.5 rounded-full w-full sm:w-auto text-center">
                                        <p className="text-white text-base sm:text-lg font-black tracking-wide">
                                            🚀 랜선투어 진행 후 테스트월드 오픈 예정!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 랜선투어 안내 */}
                            <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-xl p-5">
                                <p className="text-yellow-300 font-black mb-3 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5" />
                                    랜선투어 참여 안내 (필독!)
                                </p>
                                <div className="mt-2 mb-4 rounded-lg overflow-hidden border border-yellow-500/30 bg-white shadow-inner">
                                    <Image
                                        src="/images/blog/nexon-live-logo.png"
                                        alt="넥슨 라이브 로고"
                                        width={1200}
                                        height={200}
                                        className="w-full h-auto object-contain p-4"
                                    />
                                </div>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-yellow-400 font-bold flex-shrink-0">•</span>
                                        <span>방송은 <span className="text-white font-bold">유튜브 & 넥슨 라이브 동시 송출</span>이지만, 이벤트 참여는 <span className="text-rose-400 font-bold">넥슨 라이브를 통해서만</span> 가능합니다.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-yellow-400 font-bold flex-shrink-0">•</span>
                                        <span>선물 수령은 <span className="text-green-400 font-bold">LV.260 이상</span> 용사님들만 가능합니다.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-yellow-400 font-bold flex-shrink-0">•</span>
                                        <span>라이브 주소는 <span className="text-white font-bold">토요일 당일 공개</span> 예정입니다. 커뮤니티와 고정댓글을 확인하세요.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* VIP 사우나 */}
                            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-green-500/50 rounded-xl p-5">
                                <p className="text-green-400 font-black text-lg mb-3 flex items-center gap-2">
                                    <Gift className="w-5 h-5" />
                                    랜선투어 기념 'VIP 사우나' 보상
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                                    <div className="bg-slate-900/70 rounded-lg p-3 border border-green-500/20 text-center">
                                        <p className="text-xs text-slate-400 mb-1">지급 기간</p>
                                        <p className="text-sm font-bold text-white">3/14(토) 오후 4시 ~<br />3/18(수) 오후 11:59</p>
                                    </div>
                                    <div className="bg-slate-900/70 rounded-lg p-3 border border-green-500/20 text-center">
                                        <p className="text-xs text-slate-400 mb-1">보상</p>
                                        <p className="text-2xl font-black text-green-400">6개</p>
                                        <p className="text-xs text-slate-300">VIP 사우나 이용권</p>
                                    </div>
                                    <div className="bg-slate-900/70 rounded-lg p-3 border border-green-500/20 text-center">
                                        <p className="text-xs text-slate-400 mb-1">수령 조건</p>
                                        <p className="text-sm font-bold text-white">LV.101 이상<br />(or 제로 챕터2 완료)</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-400">
                                    📍 수령 방법: 빠른 이동 또는 주요 마을의 NPC <span className="text-white font-bold">'메이플 운영자'</span>를 통해 수령
                                </p>
                                <div className="mt-3 bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                                    <p className="text-green-200 text-sm font-semibold">
                                        💡 잠수만 타도 경험치가 오르는 꿀맛 보상! 랜선투어 종료 직후 <span className="text-white">테스트월드도 오픈</span> 예정입니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: 썬데이 메이플 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-sky-900/50 to-blue-900/50 border-2 border-sky-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Star className="w-6 h-6 text-sky-400" />
                            </div>
                            <div>
                                <p className="text-xs text-sky-300/70 font-bold uppercase tracking-widest mb-0.5">3월 15일 (일)</p>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-sky-400 leading-tight">
                                    ☀️ 처음 추가된 보상형 [썬데이 메이플]
                                </h2>
                            </div>
                        </div>

                        <div className="bg-sky-900/20 border border-sky-500/40 rounded-xl p-4 mb-6">
                            <ul className="space-y-1 text-center font-bold">
                                <li className="text-sky-200">지금껏 본 적 없는 새로운 보상들로 꽉 채워진 역대급 썬데이 메이플!</li>
                                <li className="text-white">+ 메이플ID당 1회 수령 가능</li>
                                <li className="text-white">+ 26년 3월 18일 수요일 오후 11시 59분까지 사용가능</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            {/* 보상 1: 황금 딸기 농장 */}
                            <div className="bg-slate-900/60 border border-yellow-500/40 rounded-xl p-5">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl flex-shrink-0">🍓</span>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <p className="text-yellow-300 font-black text-base sm:text-lg">슈피겔라의 황금 딸기 농장 1회 입장권</p>
                                            <span className="px-2 py-0.5 bg-yellow-500 text-black text-xs font-black rounded-full">5개</span>
                                        </div>
                                        <p className="text-slate-300 text-sm leading-relaxed">
                                            부캐 육성의 1등 공신! <span className="text-white font-bold">테라버닝으로 200레벨을 찍은 직후 바로 사용</span>하면 폭업이 가능합니다.
                                            23주년 성장 이벤트에 앞서 링크/유니온 캐릭터 레벨업을 미리 당겨두세요.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 보상 2: VIP 사우나 */}
                            <div className="bg-slate-900/60 border border-green-500/40 rounded-xl p-5">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl flex-shrink-0">♨️</span>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <p className="text-green-300 font-black text-base sm:text-lg">VIP 사우나 이용권</p>
                                            <span className="px-2 py-0.5 bg-green-500 text-black text-xs font-black rounded-full">4개</span>
                                        </div>
                                        <p className="text-slate-300 text-sm">
                                            토요일 랜선투어 보상 <span className="text-white font-bold">6개</span> + 일요일 썬데이 메이플 <span className="text-white font-bold">4개</span> = 총 <span className="text-green-400 font-black text-lg">10개</span> 확보 가능!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 보상 3: 헤이스트 피버타임 */}
                            <div className="bg-slate-900/60 border border-purple-500/40 rounded-xl p-5">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl flex-shrink-0">⚡</span>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <p className="text-purple-300 font-black text-base sm:text-lg">헤이스트 피버 타임 부스터</p>
                                            <span className="px-2 py-0.5 bg-purple-500 text-white text-xs font-black rounded-full">3개</span>
                                        </div>
                                        <p className="text-slate-300 text-sm leading-relaxed">
                                            5분 동안 <span className="text-white font-bold">10,000마리를 잡는 엄청난 젠량</span>의 헤이스트 피버 타임을 '부스터' 형태로 지급합니다.
                                            사냥 효율이 극대화되는 타이밍입니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-12" />

                {/* Section 3: 3/18 마감 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-rose-900/50 to-red-900/50 border-2 border-rose-500/50 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <ShoppingCart className="w-6 h-6 text-rose-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-rose-300/70 font-bold uppercase tracking-widest mb-0.5">3월 18일 (수) 오후 11:59 마감</p>
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-rose-400 leading-tight">
                                        ⚠️ 이벤트 & 모멘텀 패스 완전 종료!
                                    </h2>
                                </div>
                            </div>

                            <div className="bg-rose-900/30 border border-rose-500/50 rounded-xl p-4 mb-6">
                                <p className="text-white font-bold text-center">
                                    🚨 수요일 자정 전까지 다 받고, 다 써야 합니다. 지금 당장 체크!
                                </p>
                            </div>

                            <div className="space-y-5">
                                {/* 이벤트 보상 수령 */}
                                <div className="bg-slate-900/60 border border-slate-600/50 rounded-xl p-5">
                                    <p className="text-white font-black text-lg mb-3 flex items-center gap-2">
                                        <Gift className="w-5 h-5 text-rose-400" />
                                        이벤트 보상 수령 & 코인샵 결산
                                    </p>
                                    <div className="space-y-3">
                                        {[
                                            { event: '환영의 기억', desc: '모든 메인 미션 종료. 출석 보상 전부 받기! 일반/보스 코인샵 코인 남김없이 다 쓰기!', color: 'border-blue-500/40 bg-blue-900/20', tag: '코인샵 결산' },
                                            { event: '판타지아 피날레', desc: '출석 보상 전부 받기', color: 'border-purple-500/40 bg-purple-900/20', tag: '보상 수령' },
                                            { event: '겨울나기 미션', desc: '미션 보상 및 주간 보상 모두 수령', color: 'border-cyan-500/40 bg-cyan-900/20', tag: '보상 수령' },
                                            { event: '모멘텀 패스', desc: '시즌 종료. 최종 보상 및 패스 경험치 보상 모두 수령 확인', color: 'border-emerald-500/40 bg-emerald-900/20', tag: '패스 종료' },
                                            { event: '헤이스트 비욘드', desc: '이벤트 종료. 미션 보상 모두 수령/사용', color: 'border-yellow-500/40 bg-yellow-900/20', tag: '이벤트 종료' },
                                            { event: '프리미엄PC방 접속보상 & 기프트샵', desc: '접속 보상 이벤트 자체는 목요일(3/19)까지 진행되지만, 기프트샵은 3/18(수)에 종료됩니다.', color: 'border-indigo-500/40 bg-indigo-900/20', tag: '이벤트 종료' },
                                        ].map((item, i) => (
                                            <div key={i} className={`border rounded-lg p-4 ${item.color}`}>
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <p className="text-white font-bold">{item.event}</p>
                                                    <span className="px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded-full">{item.tag}</span>
                                                </div>
                                                <p className="text-slate-300 text-sm">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 판매 종료 패키지 */}
                                <div className="bg-slate-900/60 border border-orange-500/40 rounded-xl p-5">
                                    <p className="text-orange-400 font-black text-lg mb-3">🛒 판매 종료 패키지</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {[
                                            '주간 일러스트 의뢰 티켓',
                                            '전 직업 일러스트 컬렉션',
                                            '보스 컬렉션 패키지',
                                            '전 직업 헤어&성형 쿠폰',
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 p-3 bg-orange-900/20 border border-orange-500/20 rounded-lg">
                                                <span className="text-orange-400 font-bold flex-shrink-0">✗</span>
                                                <span className="text-slate-300 text-sm font-semibold">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 하드 유피테르 기념 선물 */}
                                <div className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border-2 border-yellow-500/60 rounded-xl p-5">
                                    <p className="text-yellow-400 font-black text-lg mb-3 flex items-center gap-2">
                                        <Zap className="w-5 h-5" />
                                        🔥 필수 체크! 하드 유피테르 최초 격파 기념 선물
                                    </p>
                                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                                        하드 난이도 유피테르 최초 격파를 기념하여 주요 마을의 NPC(최초 격파 캐릭터 외형)에게서{' '}
                                        <span className="text-white font-bold">'신을 삼킨 자' 기념 선물</span>을 받을 수 있습니다.
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                                        {[
                                            { label: '경험치 4배 쿠폰(30분)', value: '2개' },
                                            { label: 'VIP 사우나 이용권', value: '4개' },
                                            { label: '상급 EXP 교환권', value: '1,000개' },
                                            { label: '유피테르 마법진 교환권', value: '1개 (영구/교불)' },
                                        ].map((item, i) => (
                                            <div key={i} className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3 text-center">
                                                <p className="text-yellow-300 font-black text-sm sm:text-base">{item.value}</p>
                                                <p className="text-white font-medium text-xs mt-1">{item.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-rose-900/40 border border-rose-500/50 rounded-lg p-3">
                                        <p className="text-rose-300 text-sm font-bold">
                                            ⏰ 주의: 이 보상들은 <span className="text-white">3월 19일(목) 오전 2시까지만</span> 사용 가능합니다!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" className="my-12" />

                {/* Section 4: 3/19 이후 & 장기 일정 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Zap className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-xs text-purple-300/70 font-bold uppercase tracking-widest mb-0.5">3월 19일 (목) 이후</p>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-purple-400 leading-tight">
                                    🚀 대망의 23주년 시작 & 향후 장기 일정
                                </h2>
                            </div>
                        </div>

                        <div className="bg-purple-900/30 border border-purple-500/40 rounded-xl p-4 mb-6">
                            <p className="text-purple-200 font-semibold text-center">
                                목요일 점검이 끝나면 드디어 <span className="text-white font-black">23주년 메이플스토리 이벤트</span>가 본 서버에 상륙합니다!
                            </p>
                        </div>

                        <p className="text-slate-300 text-sm mb-5">아래 장기 일정들도 캘린더에 미리 메모해 두세요!</p>

                        <div className="space-y-3">
                            {[
                                { date: '~4/15 (수)', title: '챌린저스 월드 시즌 3 & 프론티어 패스 종료', color: 'text-cyan-400', bg: 'bg-cyan-900/20 border-cyan-500/30', urgent: false },
                                { date: '~4/22 (수)', title: '아이템 버닝 PLUS 종료', color: 'text-blue-400', bg: 'bg-blue-900/20 border-blue-500/30', urgent: false },
                                { date: '~6/17 (수)', title: '하이퍼 버닝 MAX / 버닝 비욘드 종료', color: 'text-green-400', bg: 'bg-green-900/20 border-green-500/30', urgent: false },
                                { date: '~6/30 (화)', title: '아즈모스 협곡 완전 삭제 (코인 교환도 이때까지!)', color: 'text-rose-400', bg: 'bg-rose-900/20 border-rose-500/30', urgent: true },
                            ].map((item, i) => (
                                <div key={i} className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 rounded-xl border ${item.bg}`}>
                                    <div className="flex justify-between items-center sm:w-28 flex-shrink-0">
                                        <span className={`font-black text-sm sm:text-base ${item.color}`}>{item.date}</span>
                                        {item.urgent && (
                                            <span className="sm:hidden px-2 py-0.5 bg-rose-500 text-white text-xs font-black rounded-full">중요</span>
                                        )}
                                    </div>
                                    <span className="text-white font-medium text-sm flex-1 break-keep">{item.title}</span>
                                    {item.urgent && (
                                        <span className="hidden sm:inline-block px-2 py-0.5 bg-rose-500 text-white text-xs font-black rounded-full flex-shrink-0">중요</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 최종 요약 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-amber-500/60 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-black mb-6 text-center flex items-center justify-center gap-2 text-amber-400">
                            <Star className="w-6 h-6" />
                            이번 주 핵심 체크리스트
                        </h2>

                        <div className="space-y-3">
                            {[
                                { check: '3/14 (토) 오후 5시', desc: '넥슨 라이브로 랜선투어 시청 & 이벤트 참여 (LV.260↑)', color: 'bg-amber-900/30 border-amber-500/40 text-amber-400' },
                                { check: '3/14 (토) 오후 4시~', desc: 'NPC 메이플 운영자에서 VIP 사우나 이용권 6개 수령', color: 'bg-yellow-900/30 border-yellow-500/40 text-yellow-400' },
                                { check: '3/15 (일)', desc: '황금 딸기 농장 5개 + VIP 사우나 4개 + 헤이스트 부스터 3개 수령', color: 'bg-green-900/30 border-green-500/40 text-green-400' },
                                { check: '3/18 (수) 자정 전', desc: '환영의 기억/판타지아/겨울나기 보상 전부 수령 & 코인샵 다 털기', color: 'bg-rose-900/30 border-rose-500/40 text-rose-400' },
                                { check: '3/19 (목) 오전 2시 전', desc: '하드 유피테르 최초 격파 기념 선물 사용 완료!', color: 'bg-orange-900/30 border-orange-500/40 text-orange-400' },
                            ].map((item, i) => (
                                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${item.color.split(' ').slice(0, 2).join(' ')}`}>
                                    <span className={`text-lg font-black flex-shrink-0 ${item.color.split(' ')[2]}`}>{i + 1}</span>
                                    <div>
                                        <p className={`font-black text-sm ${item.color.split(' ')[2]}`}>{item.check}</p>
                                        <p className="text-white text-sm font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-700 text-center">
                            <p className="text-white text-lg font-bold mb-1">
                                이번 주말은 랜선투어로 23주년 오프라인 테마파크 소식 즐기시고,
                            </p>
                            <p className="text-white text-lg font-bold">
                                수요일 전까지 코인샵 쇼핑 깔끔하게 마무리하세요! 🍁
                            </p>
                        </div>

                        {/* SEO Keywords */}
                        <div className="mt-8 pt-6 border-t border-slate-700">
                            <p className="text-slate-600 text-xs text-center leading-relaxed">
                                #메이플스토리 #23주년 #롯데월드랜선투어 #메이플아일랜드<span className="text-slate-700"> #</span>
                                썬데이메이플 #황금딸기농장 #VIP사우나 #헤이스트피버타임<span className="text-slate-700"> #</span>
                                환영의기억 #판타지아피날레 #이벤트마감 #코인샵결산<span className="text-slate-700"> #</span>
                                유피테르기념선물 #메이플이벤트 #이번주메이플
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <div className="border-t border-slate-700 pt-8 mt-12">
                    <div className="text-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-500 transition-colors"
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
