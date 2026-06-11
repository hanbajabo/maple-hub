'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Gift, AlertCircle, CheckCircle, MapPin, Zap, Star, Trophy, Flame, Music, Tv2, ShieldAlert, CalendarClock } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

// 이벤트 항목 컴포넌트 - 영상 녹화용 대형 카드
function EventCard({
    num,
    emoji,
    title,
    children,
    color = 'orange',
    urgent = false,
}: {
    num: number;
    emoji: string;
    title: string;
    children: React.ReactNode;
    color?: 'orange' | 'blue' | 'green' | 'purple' | 'yellow' | 'pink' | 'red' | 'cyan';
    urgent?: boolean;
}) {
    const colorMap: Record<string, string> = {
        orange: 'border-orange-500/70 from-orange-950/60 to-slate-900/80',
        blue:   'border-blue-500/70 from-blue-950/60 to-slate-900/80',
        green:  'border-green-500/70 from-green-950/60 to-slate-900/80',
        purple: 'border-purple-500/70 from-purple-950/60 to-slate-900/80',
        yellow: 'border-yellow-500/70 from-yellow-950/60 to-slate-900/80',
        pink:   'border-pink-500/70 from-pink-950/60 to-slate-900/80',
        red:    'border-red-500/70 from-red-950/60 to-slate-900/80',
        cyan:   'border-cyan-500/70 from-cyan-950/60 to-slate-900/80',
    };
    const numColorMap: Record<string, string> = {
        orange: 'bg-orange-500',
        blue:   'bg-blue-500',
        green:  'bg-green-500',
        purple: 'bg-purple-500',
        yellow: 'bg-yellow-500',
        pink:   'bg-pink-500',
        red:    'bg-red-500',
        cyan:   'bg-cyan-500',
    };
    const titleColorMap: Record<string, string> = {
        orange: 'text-orange-300',
        blue:   'text-blue-300',
        green:  'text-green-300',
        purple: 'text-purple-300',
        yellow: 'text-yellow-300',
        pink:   'text-pink-300',
        red:    'text-red-300',
        cyan:   'text-cyan-300',
    };

    return (
        <div className={`bg-gradient-to-br ${colorMap[color]} border-2 rounded-2xl p-4 sm:p-8 mb-6`}>
            <div className="flex items-start gap-3 mb-4">
                <div className={`flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 ${numColorMap[color]} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg`}>
                    <span className="text-white text-lg sm:text-2xl font-black">{num}</span>
                </div>
                <h2 className={`text-lg sm:text-3xl font-black ${titleColorMap[color]} leading-tight break-keep`}>
                    {emoji} {title}
                </h2>
            </div>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );
}

// 강조 텍스트 줄
function InfoLine({ icon, text, highlight }: { icon?: React.ReactNode; text: string; highlight?: string }) {
    return (
        <div className="flex items-start gap-3 bg-slate-900/60 rounded-xl px-4 py-3 sm:px-5 sm:py-4">
            {icon && <div className="flex-shrink-0 mt-0.5 text-slate-300">{icon}</div>}
            <p className="text-white text-base sm:text-xl leading-relaxed break-keep">
                {highlight
                    ? text.split(highlight).map((part, i) =>
                        i === 0 ? <span key={i}>{part}</span> : <span key={i}><strong className="text-yellow-300">{highlight}</strong>{part}</span>
                    )
                    : text}
            </p>
        </div>
    );
}

// 경고 박스
function WarnBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3 bg-yellow-950/60 border border-yellow-500/60 rounded-xl px-4 py-3 sm:px-5 sm:py-4 mt-2">
            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-yellow-200 text-sm sm:text-xl leading-relaxed break-keep">{children}</p>
        </div>
    );
}

// 체크 박스
function CheckLine({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3 bg-slate-900/60 rounded-xl px-4 py-3 sm:px-5 sm:py-4">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-white text-sm sm:text-xl leading-relaxed break-keep">{children}</p>
        </div>
    );
}

export default function OverdrivePreEventChecklist() {
    const [missedCount, setMissedCount] = useState<number>(0);
    const [exchangeRate, setExchangeRate] = useState<number>(2500);
    const [pointsToConvert, setPointsToConvert] = useState<number>(68000);
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

            {/* 상단 네비게이션 */}
            <div className="border-b border-slate-800 bg-slate-950/60 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-base">블로그로 돌아가기</span>
                    </Link>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

                {/* 타이틀 섹션 */}
                <header className="mb-10">
                    <div className="flex items-center gap-2 mb-5 flex-wrap">
                        <span className="px-3 py-1.5 bg-red-500/20 text-red-400 text-sm font-bold rounded-full">
                            🚨 긴급 체크리스트
                        </span>
                        <span className="px-3 py-1.5 bg-blue-500/20 text-blue-400 text-sm font-bold rounded-full">
                            이벤트 가이드
                        </span>
                        <span className="text-slate-500 text-sm">2026년 6월 9일</span>
                    </div>

                    <h1 className="text-2xl sm:text-5xl font-black text-white mb-5 leading-tight break-keep">
                        🚨 6월 17일 마감!<br />
                        오버드라이브 업데이트 전<br />
                        이벤트 총정리
                    </h1>

                    <p className="text-base sm:text-2xl text-slate-300 leading-relaxed break-keep">
                        6월 18일(목) 오버드라이브 업데이트까지 <strong className="text-yellow-300">딱 1주일</strong>!<br />
                        놓치면 사라지는 보상들, 오늘 바로 체크하세요 ⏰
                    </p>
                </header>

                {/* D-9 긴급 배너 */}
                <div className="mb-10 bg-gradient-to-r from-red-900/60 via-orange-900/50 to-red-900/60 border-2 border-red-500 rounded-2xl p-5 sm:p-10">
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 sm:w-20 sm:h-20 bg-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                            <Clock className="w-7 h-7 sm:w-11 sm:h-11 text-white" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-xl sm:text-4xl font-black text-red-300 mb-1.5 break-keep">
                                ⚠️ 6월 17일(수) 전부 종료!
                            </h2>
                            <p className="text-white text-sm sm:text-2xl break-keep">
                                <strong className="text-yellow-300">6월 18일(목)</strong> 오버드라이브 업데이트와 함께
                                현재 이벤트가 모두 종료됩니다.
                            </p>
                            <p className="text-slate-300 text-xs sm:text-lg mt-1.5 break-keep">
                                지금 알려드리는 것은 <strong className="text-orange-300">모두 6월 17일 수요일에 종료</strong>되는 것들입니다!
                            </p>
                        </div>
                    </div>
                </div>

                {/* ───── 1. 하이퍼버닝 ───── */}
                <EventCard num={1} emoji="🔥" title="하이퍼버닝 맥스, 부스터, 버닝 비욘드 종료" color="orange">
                    <InfoLine
                        icon={<Flame className="w-6 h-6 text-orange-400" />}
                        text="버닝 관련 모든 이벤트가 다음주 수요일에 종료됩니다."
                    />
                    {/* 이미지 */}
                    <div className="rounded-2xl overflow-hidden border border-orange-500/40 bg-slate-900/60 mt-1">
                        <Image
                            src="/hyperburning-max.webp"
                            alt="하이퍼버닝 맥스, 버닝 비욘드"
                            width={800}
                            height={300}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    <WarnBox>
                        아직 하이퍼버닝 캐릭터를 육성하지 않으셨거나 보상을 받지 않으셨다면 미리 체크하길 바랍니다!
                    </WarnBox>
                </EventCard>

                {/* ───── 2. 체인지버닝 ───── */}
                <EventCard num={2} emoji="🦋" title="체인지 버닝 : 루시드 종료" color="purple">
                    <InfoLine
                        icon={<Star className="w-6 h-6 text-purple-400" />}
                        text="체인지 버닝 : 루시드도 다음주 수요일에 종료됩니다."
                    />
                    {/* 이미지 */}
                    <div className="rounded-2xl overflow-hidden border border-purple-500/40 bg-slate-900/60 mt-1">
                        <Image
                            src="/change-burning-lucid.webp"
                            alt="체인지버닝 루시드 & 드림 샤드샵"
                            width={800}
                            height={200}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    <CheckLine>
                        본캐가 받을 수 있는 보상 미리 수령하기
                    </CheckLine>
                    <CheckLine>
                        드림 샤드샵에서 구매할 수 있는 보상 미리 구매하기
                    </CheckLine>
                    <WarnBox>
                        헬레나 나이트메어를 잡으면 <strong>몽환의 나비 피니시 어택 이펙트 교환권</strong>을 받을 수 있으니, 마지막까지 최대한 스펙업을 하신 후에 잡아보는 것을 추천드립니다!
                    </WarnBox>

                    {/* 히든 미션 안내 */}
                    <div className="bg-purple-950/60 border border-purple-500/50 rounded-xl px-5 py-4 mt-4 space-y-3">
                        <p className="text-white text-lg sm:text-xl font-bold flex items-center gap-2 text-purple-300">
                            ✨ 루시드 히든 미션 공략
                        </p>
                        {/* 이미지 */}
                        <div className="rounded-xl overflow-hidden border border-purple-500/30 bg-slate-900/60 my-2">
                            <Image
                                src="/lucid-hidden-mission.webp"
                                alt="루시드 히든 미션 이펙트 및 노틸러스 맵 위치"
                                width={800}
                                height={200}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                        <div className="text-slate-300 text-base sm:text-lg space-y-2">
                            <p className="font-bold text-white">
                                🔒 참여 조건: <span className="text-purple-400">루시드 레벨 80 이상</span>
                            </p>
                            <ol className="list-decimal pl-5 space-y-3 text-slate-300 leading-relaxed">
                                <li>
                                    <strong>체인지 버닝 수락 캐릭터</strong>로 석촌호수 루시드에게 말을 걸어 <strong className="text-yellow-300">노틸러스 침실</strong>에 입장하고 <strong className="text-yellow-300">꿈의 미로</strong>를 클리어합니다.
                                    <div className="bg-slate-900/60 border border-purple-500/30 rounded-lg p-3 mt-1.5 text-sm space-y-1">
                                        <p className="font-bold text-purple-300">🧭 꿈의 미로 클리어 팁</p>
                                        <ul className="list-disc pl-4 space-y-2 text-slate-400">
                                            <li>
                                                <strong>1번째 맵:</strong> 나비들이 줄지어서 가리키는 포탈로 입장
                                                <div className="rounded-lg overflow-hidden border border-purple-500/20 bg-slate-950/80 my-2 max-w-lg">
                                                    <Image
                                                        src="/lucid-hidden-first-portal.webp"
                                                        alt="꿈의 미로 1번째 맵 공략 (나비들 경로)"
                                                        width={600}
                                                        height={300}
                                                        className="w-full h-auto object-contain"
                                                    />
                                                </div>
                                            </li>
                                            <li>
                                                <strong>2번째, 3번째 맵:</strong> 머리 중앙에 <span className="text-yellow-300 font-bold">더듬이가 있는 나비</span> 옆의 포탈로 입장
                                                <div className="rounded-lg overflow-hidden border border-purple-500/20 bg-slate-950/80 my-2 max-w-lg">
                                                    <Image
                                                        src="/lucid-hidden-second-third-portal.webp"
                                                        alt="꿈의 미로 2, 3번째 맵 공략 (더듬이 여부)"
                                                        width={600}
                                                        height={300}
                                                        className="w-full h-auto object-contain"
                                                    />
                                                </div>
                                            </li>
                                            <li>(예시: 더듬이 있는 나비는 왼쪽 / 없는 나비는 오른쪽)</li>
                                        </ul>
                                    </div>
                                    <p className="text-green-300 text-sm font-semibold mt-1">🎁 보상: 체인지 버닝 : 루시드 이펙트</p>
                                </li>
                                <li>
                                    획득한 <strong>이펙트를 착용</strong>한 상태에서 다시 석촌호수 루시드와 대화합니다.
                                    <p className="text-green-300 text-sm font-semibold mt-1">🎁 보상: 루시드의 드림캐처 (메이플 홈 가구)</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </EventCard>

                {/* ───── 3. 코인샵 ───── */}
                <EventCard num={3} emoji="🪙" title="각종 코인샵 종료" color="yellow">
                    <InfoLine
                        icon={<Gift className="w-6 h-6 text-yellow-400" />}
                        text="드림 샤드샵, 기프트 티켓 상점, 메소샵, 메이플포인트샵 등 모든 코인샵이 다음주에 종료됩니다."
                    />
                    {/* 이미지 */}
                    <div className="rounded-2xl overflow-hidden border border-yellow-500/40 bg-slate-900/60 mt-1">
                        <Image
                            src="/coinshops.webp"
                            alt="드림 샤드샵, 기프트 티켓 상점, 메소샵, 메이플포인트샵"
                            width={900}
                            height={80}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    <WarnBox>
                        아직 사용하지 않은 코인들이나 필요한 물품들이 있다면 미리미리 구매해서 사용하세요!
                    </WarnBox>
                </EventCard>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ───── 4. 썸머 카운트다운 ───── */}
                <EventCard num={4} emoji="🎁" title="썸머 카운트다운 선물 사용하기" color="cyan" urgent>
                    <InfoLine
                        icon={<CalendarClock className="w-6 h-6 text-cyan-400" />}
                        text="왼쪽 카운트다운 선물 → 6월 17일(수)까지 받고, 18일(목) 오전 2시까지만 사용 가능!"
                    />
                    <CheckLine>
                        카운트다운 선물 6월 17일까지 수령하기
                    </CheckLine>
                    <CheckLine>
                        보너스 미션에서 받을 수 있는 <strong className="text-yellow-300">악몽의 메아리 +</strong>도 동일!
                    </CheckLine>
                    {/* 이미지 */}
                    <div className="rounded-2xl overflow-hidden border border-cyan-500/40 bg-slate-900/60 mt-1">
                        <Image
                            src="/summer-countdown.webp"
                            alt="썸머 카운트다운 선물 05.14~06.17"
                            width={500}
                            height={600}
                            className="mx-auto h-auto object-contain"
                        />
                    </div>
                    <WarnBox>
                        미리미리 사용해서 보상을 날리는 일이 없도록 하세요!
                        <br /><strong>특히, 경험치 쿠폰 아끼지 말고 사용하세요~</strong>
                    </WarnBox>
                </EventCard>

                {/* ───── 5. VIP 사우나 ───── */}
                <EventCard num={5} emoji="🧖" title="VIP 사우나 종료" color="blue">
                    <InfoLine
                        icon={<Zap className="w-6 h-6 text-blue-400" />}
                        text="VIP 사우나 이벤트도 다음주 수요일에 종료됩니다."
                    />
                    {/* 이미지 */}
                    <div className="rounded-2xl overflow-hidden border border-blue-500/40 bg-slate-900/60 mt-1">
                        <Image
                            src="/vip-sauna.webp"
                            alt="VIP 사우나 경험치 이벤트 2025.12.18~2026.06.17"
                            width={900}
                            height={100}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    <WarnBox>
                        <strong>6월 17일이 지나면 적립시간이 모두 초기화!</strong><br />
                        사우나 이용권과 사우나 시간을 모두 사용하길 바랍니다.
                    </WarnBox>
                </EventCard>

                {/* ───── 6. 메이플 용사 진 & 차원의 탑 ───── */}
                <EventCard num={6} emoji="🌟" title="메이플 용사 진, 리버스 차원의 탑 종료" color="pink">
                    <InfoLine
                        icon={<Trophy className="w-6 h-6 text-pink-400" />}
                        text="서브 이벤트로 진행됐던 용사 진 보스와 차원의 탑 이벤트도 종료됩니다."
                    />
                    {/* 이미지 */}
                    <div className="rounded-2xl overflow-hidden border border-pink-500/40 bg-slate-900/60 mt-1">
                        <Image
                            src="/warrior-jin-tower.webp"
                            alt="메이플 용사 진 & 리버스 차원의 탑"
                            width={900}
                            height={120}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    <CheckLine>
                        받을 수 있는 보상들 미리 수령하기
                    </CheckLine>
                    <WarnBox>
                        <strong>메이플 용사 진</strong>을 잡아서 나오는 아이템들이 가격이 더 비싸질 수도 있으니, 갖고 싶은 것들이 있다면 <strong>경매장을 이용해서 미리 구매</strong>하세요!
                    </WarnBox>
                </EventCard>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ───── 7. 마스코트 퍼레이드 ───── */}
                <EventCard num={7} emoji="🧲" title="메인 이벤트 '마스코트 퍼레이드' 종료" color="green">
                    <InfoLine
                        icon={<Star className="w-6 h-6 text-green-400" />}
                        text="일명 '영구 자석펫' 얻는 이벤트도 다음주 수요일에 종료됩니다."
                    />
                    {/* 이미지 */}
                    <div className="rounded-2xl overflow-hidden border border-green-500/40 bg-slate-900/60 mt-1">
                        <Image
                            src="/mascot-parade.webp"
                            alt="마스코트 퍼레이드 이벤트 3.19~6.17"
                            width={900}
                            height={400}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    <div className="bg-green-950/60 border border-green-500/50 rounded-xl px-5 py-4 space-y-3">
                        <p className="text-white text-lg sm:text-xl font-bold">🐾 영구 자석펫 수령 조건</p>
                        <CheckLine>총 60번의 출석체크 완료</CheckLine>
                        <CheckLine>퍼레이드 미션 '레.범.몬' 10만 마리 처치</CheckLine>
                        <p className="text-green-300 text-lg sm:text-xl pl-2">
                            → 오버드라이브 업데이트 후 영구 자석펫 1마리 수령 가능!<br />
                            → 새로 시작하는 <strong>챌린저스 월드</strong>에서도 받을 수 있습니다.
                        </p>
                    </div>

                    <div className="bg-slate-900/80 border border-green-500/30 rounded-xl p-5 space-y-4">
                        <p className="text-white text-lg sm:text-xl font-black flex items-center gap-2 text-green-300">
                            🎫 퍼레이드 패스 (지난 출석 채우기)
                        </p>
                        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                            전용 UI 좌측 하단의 퍼레이드 패스 <strong className="text-yellow-300">[사용하기]</strong> 버튼을 클릭하고 <strong className="text-yellow-300">3,000 메이플포인트</strong>를 사용하여, 지난 주 기준으로 완료하지 못한 일일 참여하기를 1회 완료할 수 있습니다.
                        </p>
                        
                        {/* 계산기 UI */}
                        <div className="bg-slate-950/90 border border-green-600/40 rounded-xl p-4 mt-3">
                            <p className="text-green-400 text-base font-bold mb-3">🧮 퍼레이드 패스 메포 계산기</p>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                <div className="flex-1">
                                    <label className="block text-slate-400 text-sm mb-1 font-bold">놓친 출석 횟수 입력</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="60"
                                        placeholder="0"
                                        value={missedCount || ''}
                                        onChange={(e) => setMissedCount(Math.max(0, parseInt(e.target.value) || 0))}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-lg font-bold focus:outline-none focus:border-green-500"
                                    />
                                </div>
                                <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-3 flex flex-col justify-center">
                                    <p className="text-slate-400 text-sm font-bold">필요한 메이플포인트</p>
                                    <p className="text-yellow-300 text-2xl font-black mt-1">
                                        {(missedCount * 3000).toLocaleString()} MP
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 메소 환산 계산기 UI */}
                        <div className="bg-slate-950/90 border border-green-600/40 rounded-xl p-4 mt-4 space-y-4">
                            <p className="text-green-400 text-base font-bold flex flex-wrap items-center justify-between gap-2">
                                <span>💰 메포 ↔ 메소 환산 계산기</span>
                                {missedCount > 0 && (
                                    <button
                                        onClick={() => setPointsToConvert(missedCount * 3000)}
                                        className="text-xs bg-green-500/20 hover:bg-green-500/30 text-green-300 px-2 py-1 rounded border border-green-500/30 transition-colors whitespace-nowrap"
                                    >
                                        결과 가져오기
                                    </button>
                                )}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-slate-400 text-xs sm:text-sm mb-1 font-bold">
                                        1억 메소당 메이플포인트 (비율)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="2500"
                                        value={exchangeRate || ''}
                                        onChange={(e) => setExchangeRate(Math.max(1, parseInt(e.target.value) || 0))}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-lg font-bold focus:outline-none focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-xs sm:text-sm mb-1 font-bold">
                                        환산할 메이플포인트 입력
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="68000"
                                        value={pointsToConvert || ''}
                                        onChange={(e) => setPointsToConvert(Math.max(0, parseInt(e.target.value) || 0))}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-lg font-bold focus:outline-none focus:border-green-500"
                                    />
                                </div>
                            </div>
                            
                            <div className="bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-3 flex flex-col justify-center items-center text-center">
                                <p className="text-slate-400 text-sm font-bold">환산 결과 (메소)</p>
                                <p className="text-yellow-300 text-2xl font-black mt-1">
                                    {exchangeRate > 0 ? (pointsToConvert / exchangeRate).toFixed(2) : '0'} 억 메소
                                </p>
                                <p className="text-slate-500 text-xs mt-1">
                                    (정밀 계산: {exchangeRate > 0 ? Math.floor((pointsToConvert / exchangeRate) * 100000000).toLocaleString() : '0'} 메소)
                                </p>
                            </div>
                        </div>
                    </div>

                    <WarnBox>
                        그 외 출석 보상들도 미리미리 사용해서 날리는 보상이 없게 하세요!
                        <br /><strong>특히, 경험치 쿠폰 아끼지 말고 사용하세요~</strong>
                    </WarnBox>
                </EventCard>

                {/* ───── 8. 메이플 스위츠 ───── */}
                <EventCard num={8} emoji="💊" title="보약 스킬 '메이플 스위츠' 종료" color="orange">
                    <InfoLine
                        icon={<Zap className="w-6 h-6 text-orange-400" />}
                        text="보약 스킬을 올릴 수 있는 기간은 다음주 수요일(6/17)까지입니다."
                    />
                    {/* 이미지 */}
                    <div className="rounded-2xl overflow-hidden border border-orange-500/40 bg-slate-900/60 mt-1">
                        <Image
                            src="/maple-sweets.webp"
                            alt="메이플 스위츠 주간 수집 미션 3.19~6.17"
                            width={900}
                            height={120}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    <div className="bg-orange-950/50 border border-orange-500/40 rounded-xl px-5 py-4">
                        <p className="text-white text-lg sm:text-xl">
                            보약 스킬 이벤트를 미리 받아놓은 캐릭터는<br />
                            <strong className="text-yellow-300">6월 24일(수)까지 1주일 더 보약스킬 효과</strong>를 받을 수 있습니다!
                        </p>
                    </div>
                    <WarnBox>
                        보약 스킬을 끝까지 잘 찍어서 1주일 더 보약스킬을 누리세요!
                    </WarnBox>
                </EventCard>

                {/* ───── 9. PC방 ───── */}
                <EventCard num={9} emoji="🖥️" title="프리미엄 PC방 이벤트 종료" color="blue">
                    <InfoLine
                        icon={<Tv2 className="w-6 h-6 text-blue-400" />}
                        text="프리미엄 PC방 이벤트도 종료되니 미리미리 누적 보상 받기를 바랍니다!"
                    />
                    <div className="bg-slate-900/60 border border-blue-500/30 rounded-xl px-5 py-4 mt-2">
                        <p className="text-slate-300 text-base sm:text-lg">
                            📅 <strong>진행 기간:</strong> 2026년 4월 17일(금) 오전 0시 ~ 6월 18일(목) 오후 11시 59분
                        </p>
                    </div>
                </EventCard>

                {/* ───── 10. 쇼케이스 장소 변경 ───── */}
                <EventCard num={10} emoji="📍" title="메이플스토리 쇼케이스 장소 변경!" color="red" urgent>
                    <InfoLine
                        icon={<MapPin className="w-6 h-6 text-red-400" />}
                        text="쇼케이스 장소가 변경되었습니다. 직관하시는 분들은 꼭 확인하세요!"
                    />
                    <div className="bg-red-950/60 border-2 border-red-500 rounded-xl px-4 py-4 sm:px-6 sm:py-5 space-y-2">
                        <p className="text-red-300 text-lg sm:text-2xl font-black">📍 변경된 장소</p>
                        <p className="text-white text-base sm:text-2xl font-bold">
                            킨텍스 제2전시장 9홀
                        </p>
                        <p className="text-slate-300 text-sm sm:text-lg break-keep">
                            경기도 고양시 일산서구 킨텍스로 217-59 (대화동)
                        </p>
                    </div>
                    <div className="bg-yellow-950/60 border border-yellow-500/60 rounded-xl px-4 py-4 sm:px-5 sm:py-5 mt-2 space-y-3">
                        <p className="text-yellow-300 text-base sm:text-xl font-bold flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" /> 티켓 환불 안내
                        </p>
                        <p className="text-white text-sm sm:text-xl break-keep">
                            티켓 환불을 희망하실 경우,<br />
                            <strong className="text-yellow-300">6월 11일(목) 오후 5시까지</strong> 아래 방법으로 취소 시 <strong>전액 환불</strong> 예정입니다.
                        </p>
                        <div className="bg-slate-900/60 rounded-lg px-3 py-3 space-y-2">
                            <p className="text-slate-200 text-sm sm:text-lg">📞 티켓링크 고객센터(유선): <strong className="text-white">1588-7890</strong></p>
                            <p className="text-slate-200 text-sm sm:text-lg break-keep">💻 티켓링크 홈페이지 → 고객센터 → 1:1 상담 문의</p>
                        </div>
                    </div>
                </EventCard>

                {/* ───── 11. NPC 스타일 어워즈 & 진 캐시템 ───── */}
                <EventCard num={11} emoji="🛍️" title="NPC 스타일 어워즈 & 메이플스토리 진 캐시템 판매 종료" color="purple">
                    <InfoLine
                        icon={<Star className="w-6 h-6 text-purple-400" />}
                        text="NPC 스타일 어워즈 그리고 메이플스토리 × 진 콜라보 캐시템 판매도 다음주 수요일에 종료됩니다."
                    />
                    {/* 이미지 */}
                    <div className="rounded-2xl overflow-hidden border border-purple-500/40 bg-slate-900/60 mt-1">
                        <Image
                            src="/jin-collab-cashtems.webp"
                            alt="NPC 스타일 어워즈 & 메이플스토리 진 콜라보 캐시템"
                            width={800}
                            height={200}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    <WarnBox>
                        필요한 캐시템이 있다면 <strong>6월 17일(수) 전에 미리미리 구매</strong>하길 바랍니다!
                    </WarnBox>
                </EventCard>

                {/* 최종 체크리스트 요약 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-yellow-400 rounded-2xl p-5 sm:p-10">
                        <h2 className="text-xl sm:text-3xl font-black text-yellow-300 mb-5 sm:mb-7 flex items-center gap-2 sm:gap-3">
                            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                            ✅ 최종 체크리스트
                        </h2>
                        <div className="space-y-2 sm:space-y-3">
                            {[
                                { text: '🔥 하이퍼버닝 캐릭터 보상 수령', sub: '6/17 종료' },
                                { text: '🦋 체인지버닝 루시드 보상 & 드림 샤드샵 구매', sub: '6/17 종료' },
                                { text: '🪙 각종 코인샵 (기프트, 메포샵, 드림 샤드샵)', sub: '6/17 종료' },
                                { text: '🎁 썸머 카운트다운 선물 수령 + 경험치 쿠폰 사용', sub: '6/17 수령 → 6/18 오전2시 사용기한' },
                                { text: '🧖 VIP 사우나 이용권 & 적립시간 소진', sub: '6/17 종료 (초기화 주의!)' },
                                { text: '🌟 용사 진 보스 & 차원의 탑 보상 수령', sub: '6/17 종료' },
                                { text: '🧲 마스코트 퍼레이드 출석 60회 + 레범몬 10만 마리', sub: '6/17 종료' },
                                { text: '💊 메이플 스위츠 보약 스킬 최대로 찍기', sub: '6/17 종료 (효과는 6/24까지)' },
                                { text: '🖥️ 프리미엄 PC방 누적 보상 수령', sub: '6/17 종료' },
                                { text: '📍 쇼케이스 직관 → 킨텍스 제2전시장 9홀 확인', sub: '환불 6/11(목) 오후 5시까지' },
                                { text: '🛍️ NPC 스타일 어워즈 & 진 콜라보 캐시템 구매', sub: '6/17 판매 종료' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 bg-slate-900/60 rounded-xl px-4 py-3 sm:px-5 sm:py-4 hover:bg-slate-900/80 transition-colors">
                                    <input type="checkbox" className="w-5 h-5 sm:w-6 sm:h-6 accent-yellow-400 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-sm sm:text-xl font-bold break-keep">{item.text}</p>
                                        <p className="text-red-400 text-xs sm:text-lg mt-0.5">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 마무리 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/60 rounded-2xl p-6 sm:p-10 text-center">
                        <p className="text-lg sm:text-3xl font-black text-white mb-3 break-keep">
                            🍁 6월 18일 오버드라이브, 함께 맞이해요!
                        </p>
                        <p className="text-slate-300 text-sm sm:text-2xl leading-relaxed mb-2 break-keep">
                            지금 진행 중인 이벤트를 깔끔하게 마무리하고
                        </p>
                        <p className="text-slate-300 text-sm sm:text-2xl leading-relaxed break-keep">
                            <strong className="text-yellow-300">오버드라이브</strong>를 최상의 상태로 즐기세요! 🎸
                        </p>
                    </div>
                </section>

                {/* 블로그 메인으로 */}
                <div className="border-t border-slate-700 pt-8 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-500 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        블로그 메인으로
                    </Link>
                </div>

            </article>
        </div>
    );
}
