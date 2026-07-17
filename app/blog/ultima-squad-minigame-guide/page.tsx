'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, Sword, Crosshair, Zap, Package, Map, Settings, Star, Trophy, Coins, Shield, ChevronRight, Info } from 'lucide-react';

export default function UltimaSquadMinigamePage() {
    const mercenarySkills = {
        전사: [
            { name: '오라 블레이드', level: 2 },
            { name: '아이언 바디', level: 10 },
            { name: '블래스드 해머', level: 21 },
            { name: '디바이드', level: 28 },
            { name: '인빈서블 빌리프', level: 38 },
            { name: '데몬 베인', level: 40 },
        ],
        궁수: [
            { name: '차지드 애로우', level: 2 },
            { name: '폭풍의 시', level: 15 },
            { name: '볼텍스 스피어', level: 21 },
            { name: '소울 컨트랙트', level: 31 },
            { name: '엘리멘탈 고스트', level: 38 },
            { name: '드래곤 버스트', level: 40 },
        ],
        마법사: [
            { name: '체인 라이트닝', level: 2 },
            { name: '힐', level: 7 },
            { name: '헤븐즈 도어', level: 17 },
            { name: '플레임 스윕', level: 25 },
            { name: '프레이', level: 31 },
            { name: '조디악 레이', level: 40 },
        ],
    };

    const equipmentGrades = [
        { stage: 1, potential: '-', optionCount: '-' },
        { stage: 2, potential: '레어', optionCount: '1종' },
        { stage: 3, potential: '레어', optionCount: '2종' },
        { stage: 4, potential: '에픽', optionCount: '2종' },
        { stage: 5, potential: '에픽', optionCount: '2종' },
        { stage: 6, potential: '유니크', optionCount: '2종' },
        { stage: 7, potential: '레전드리', optionCount: '2종' },
        { stage: 8, potential: '레전드리', optionCount: '3종' },
    ];

    const potentialOptions = [
        '최대 HP 증가', '방어력 증가', '공격력 증가', '공격력% 증가',
        '마력 증가', '마력% 증가', '크리티컬 확률 증가', '크리티컬 데미지 증가',
        '공격속도 1단계 증가', '스킬 재사용 대기시간 감소 (5초 미만 불가)',
        '피격 시 일정 확률로 분노 (특수)', '피격 시 일정 확률로 사랑에 빠짐 (특수)',
        '피격 시 일정 확률로 데미지 % 무시', '피격 시 일정 확률로 무적',
    ];

    const stageRewards = [
        { stage: '1-1 ~ 1-9', reward: '스쿼드 코인', amount: '100' },
        { stage: '1-10', reward: '스쿼드 코인', amount: '500' },
        { stage: '2-1 ~ 2-9', reward: '스쿼드 코인', amount: '200' },
        { stage: '2-10', reward: '스쿼드 코인', amount: '900' },
        { stage: '3-1 ~ 3-9', reward: '스쿼드 코인', amount: '300' },
        { stage: '3-10 (보스)', reward: '스쿼드 코인 + 훈장 교환권', amount: '1200 + 1개' },
    ];

    const utilityData = [
        {
            category: '스킬 슬롯 확장',
            icon: '⚔️',
            color: 'indigo',
            items: [
                { effect: '2칸으로 증가', price: '1,500,000', note: '1-10 클리어 후 가능' },
                { effect: '3칸으로 증가', price: '7,000,000', note: '2-10 클리어 후 가능' },
            ],
        },
        {
            category: '오프라인 누적 시간 증가',
            icon: '⏰',
            color: 'blue',
            items: [
                { effect: '17시간', price: '300,000' },
                { effect: '18시간', price: '400,000' },
                { effect: '19시간', price: '500,000' },
                { effect: '20시간', price: '800,000' },
                { effect: '21시간', price: '1,000,000' },
                { effect: '22시간', price: '1,500,000' },
                { effect: '23시간', price: '1,700,000' },
                { effect: '24시간 (최대)', price: '2,000,000' },
            ],
        },
        {
            category: '장비 드롭률 증가',
            icon: '📦',
            color: 'emerald',
            items: [
                { effect: '+5%', price: '300,000' },
                { effect: '+10%', price: '500,000' },
                { effect: '+15%', price: '1,000,000' },
                { effect: '+20%', price: '1,500,000' },
                { effect: '+25%', price: '10,000,000' },
                { effect: '+30%', price: '20,000,000' },
            ],
        },
        {
            category: '골드 획득량 증가',
            icon: '💰',
            color: 'yellow',
            items: [
                { effect: '+5%', price: '300,000' },
                { effect: '+10%', price: '500,000' },
                { effect: '+15%', price: '1,000,000' },
                { effect: '+20%', price: '1,500,000' },
                { effect: '+25%', price: '10,000,000' },
                { effect: '+30%', price: '20,000,000' },
            ],
        },
    ];

    const coinShopItems = [
        { currency: '스쿼드 코인', item: '솔 에르다', price: 200, limit: '10개' },
        { currency: '스쿼드 코인', item: '솔 에르다 조각 교환권', price: 15, limit: '400개' },
        { currency: '카오스 스쿼드 코인', item: '상급 EXP 교환권 (100개 묶음)', price: 30, limit: '50개' },
        { currency: '카오스 스쿼드 코인', item: '경험치 4배 쿠폰 (30분)', price: 30, limit: '20개' },
        { currency: '카오스 스쿼드 코인', item: 'VIP 부스터', price: 20, limit: '100개' },
        { currency: '카오스 스쿼드 코인', item: '경험치 3배 쿠폰 (30분)', price: 15, limit: '100개' },
        { currency: '카오스 스쿼드 코인', item: '카오스 서큘레이터', price: 20, limit: '40개' },
    ];

    return (
        <div className="min-h-screen bg-[#070610] text-slate-100 pb-24 font-sans leading-relaxed">
            {/* 배경 장식 */}
            <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-orange-900/10 rounded-full blur-[140px] pointer-events-none z-0" />
            <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-900/8 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="fixed top-1/2 left-0 w-[300px] h-[300px] bg-red-900/5 rounded-full blur-[80px] pointer-events-none z-0" />

            {/* 헤더 */}
            <header className="w-full max-w-7xl flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-[#070610]/90 backdrop-blur-md border-b border-slate-800/80 mx-auto">
                <Link prefetch={false} href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-orange-400 font-semibold group">
                    <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                    <span>블로그 홈으로</span>
                </Link>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">

                {/* 타이틀 섹션 */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold bg-orange-500/10 text-orange-300 border border-orange-500/30 rounded-full">
                            <Calendar className="w-3.5 h-3.5" /> 2026.07.23 ~ 08.19
                        </span>
                        <span className="px-3.5 py-1 text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full">🎮 미니게임 이벤트</span>
                        <span className="px-3.5 py-1 text-xs font-bold bg-red-500/10 text-red-300 border border-red-500/20 rounded-full">⚔️ 자동 전투</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5 leading-tight break-keep">
                        <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                            【미니게임】 울티마 스쿼드 완벽 공략
                        </span>
                    </h1>

                    {/* 메인 이미지 */}
                    <div className="relative w-full rounded-xl overflow-hidden mb-8 border border-orange-500/30 shadow-xl shadow-orange-950/20">
                        <Image 
                            src="/images/ultima-squad-play.png" 
                            alt="울티마 스쿼드 미니게임 전투 화면" 
                            width={1200}
                            height={600}
                            style={{ width: '100%', height: 'auto' }}
                            priority
                        />
                    </div>

                    <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed break-keep border-l-4 border-orange-500 pl-5 py-2 bg-orange-950/10 rounded-r-lg">
                        미션 울티마 작전에 합류한 <strong className="text-orange-300">신입 용병들</strong>을 성장시키고, 자동 전투 미니게임을 통해 다양한 보상을 획득하세요!
                        7월 23일 점검 후부터 8월 19일까지 진행되는 신규 미니게임 이벤트를 완벽하게 정리했습니다.
                    </p>

                    {/* 기본 정보 요약 카드 */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                        <div className="bg-slate-900/50 border border-orange-500/30 rounded-xl p-4 text-center">
                            <div className="text-2xl mb-1">🎖️</div>
                            <p className="text-xs text-slate-400 mb-1">참여 조건</p>
                            <p className="text-sm font-bold text-orange-300">101레벨 이상</p>
                            <p className="text-xs text-slate-500 mt-1">미션 울티마 참여 또는<br/>제로 챕터2 완료</p>
                        </div>
                        <div className="bg-slate-900/50 border border-amber-500/30 rounded-xl p-4 text-center">
                            <div className="text-2xl mb-1">📅</div>
                            <p className="text-xs text-slate-400 mb-1">이벤트 기간</p>
                            <p className="text-sm font-bold text-amber-300">7/23 ~ 8/19</p>
                            <p className="text-xs text-slate-500 mt-1">점검 후 ~ 오후 11:59</p>
                        </div>
                        <div className="bg-slate-900/50 border border-yellow-500/30 rounded-xl p-4 text-center">
                            <div className="text-2xl mb-1">🤝</div>
                            <p className="text-xs text-slate-400 mb-1">기록 공유</p>
                            <p className="text-sm font-bold text-yellow-300">메이플ID 공유</p>
                            <p className="text-xs text-slate-500 mt-1">모든 캐릭터 간<br/>진행 기록 공유</p>
                        </div>
                    </div>

                    {/* 목차 */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-xl">
                        <p className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5 text-orange-400" /> 📑 목차
                        </p>
                        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            {[
                                { num: '01', color: 'text-orange-400', href: '#overview', label: '게임 개요 및 참여 방법' },
                                { num: '02', color: 'text-amber-400', href: '#mercenary', label: '용병 종류 및 스킬 목록' },
                                { num: '03', color: 'text-yellow-400', href: '#equipment', label: '울티마 장비 및 잠재능력' },
                                { num: '04', color: 'text-emerald-400', href: '#stage', label: '스테이지 구성 및 보상' },
                                { num: '05', color: 'text-blue-400', href: '#combat', label: '전투 및 에스페시아 상자' },
                                { num: '06', color: 'text-purple-400', href: '#utility', label: '유틸리티 강화 목록' },
                                { num: '07', color: 'text-pink-400', href: '#chaos', label: '카오스 모드 & 코인샵' },
                                { num: '08', color: 'text-red-400', href: '#coinshop', label: '울티마 스쿼드 코인샵' },
                            ].map(({ num, color, href, label }) => (
                                <li key={href} className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-orange-500/30 transition-colors">
                                    <span className={`${color} font-mono font-bold`}>{num}</span>
                                    <a href={href} className="text-slate-300 hover:text-white transition-colors">{label}</a>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* 1. 게임 개요 */}
                <section id="overview" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <Info className="w-6 h-6 text-orange-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">1. 게임 개요 및 참여 방법</h2>
                    </div>
                    <div className="space-y-5 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">

                        <div className="bg-gradient-to-br from-orange-950/40 to-amber-950/20 border border-orange-500/30 rounded-xl p-5">
                            <h3 className="font-bold text-orange-300 mb-3 text-base flex items-center gap-2">
                                <Sword className="w-5 h-5" /> 울티마 스쿼드란?
                            </h3>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                <strong className="text-white">자동 전투</strong>를 기반으로 하며, 각각의 역할을 가진 <strong className="text-orange-300">3명의 용병</strong>을 배치하고 성장시키며 전투 스테이지를 순서대로 클리어해 나가는 미니 게임입니다.
                                스테이지 클리어를 통해 EXP, 골드, 장비, 훈련용 큐브를 획득할 수 있습니다.
                            </p>
                            <div className="relative w-full rounded-lg overflow-hidden border border-orange-500/20 shadow-md">
                                <Image 
                                    src="/images/ultima-squad-management.png" 
                                    alt="용병 설정 및 관리 UI 화면" 
                                    width={1200}
                                    height={600}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                        </div>

                        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                            <h3 className="font-bold text-amber-300 mb-3">🎯 참여 방법</h3>
                            <ol className="space-y-2 text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400 font-bold mt-0.5">1.</span>
                                    이벤트 리스트에서 <strong className="text-white">'[미니게임] 울티마 스쿼드'</strong> 선택 후 '참여하기' 버튼 클릭
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400 font-bold mt-0.5">2.</span>
                                    이벤트 시작 이후 이벤트 리스트에서 클릭하면 전투 UI 확인 가능
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400 font-bold mt-0.5">3.</span>
                                    전투 UI의 <strong>가방 아이콘</strong>을 클릭하여 용병 관리 UI 열기
                                </li>
                            </ol>
                        </div>

                        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                            <h3 className="font-bold text-blue-300 mb-3">⏰ 오프라인 보상 시스템</h3>
                            <ul className="space-y-2 text-slate-300 list-disc list-inside mb-4">
                                <li>접속하지 않은 동안에도 용병들이 <strong>자동 전투</strong>한 것으로 간주, EXP와 골드 획득</li>
                                <li>용병 배치 후 전투 화면에 <strong>1회 이상 진입</strong>한 시점부터 오프라인 보상 적립 시작</li>
                                <li>재접속 시 <strong>'오프라인 보상' 팝업</strong>으로 EXP·골드 및 레벨업 결과 확인 가능</li>
                                <li>오프라인 보상은 <strong>마지막으로 클리어한 스테이지</strong> 기준으로 지급</li>
                            </ul>
                            <div className="relative w-full max-w-[400px] mx-auto rounded-lg overflow-hidden border border-slate-800 shadow-md mb-4">
                                <Image 
                                    src="/images/ultima-squad-offline.png" 
                                    alt="오프라인 보상 결과 팝업 화면" 
                                    width={400}
                                    height={320}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                            <div className="mt-3 p-3 bg-blue-950/20 border border-blue-800/30 rounded-lg">
                                <p className="text-blue-300 text-sm font-medium">⚠️ 주의사항</p>
                                <ul className="text-slate-400 text-xs mt-1 space-y-1 list-disc list-inside">
                                    <li>오프라인 누적 시간은 <strong className="text-white">기본 16시간 / 최대 24시간</strong>까지 인정 (유틸리티 확장 후)</li>
                                    <li className="text-sm font-bold text-amber-300 mt-2 mb-2 bg-amber-950/40 p-2 rounded border border-amber-500/20 list-none -ml-4 flex items-center gap-1.5 shadow-sm">
                                        <span>🚨</span>
                                        <span>장비, 훈련용 큐브, 카오스 스쿼드 코인은 <strong className="text-white underline underline-offset-4 decoration-amber-500">접속 상태에서만</strong> 획득 가능합니다.</span>
                                    </li>
                                    <li>캐시샵 이용 시간은 오프라인으로 취급 → EXP·골드만 일부 획득</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. 용병 */}
                <section id="mercenary" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <Sword className="w-6 h-6 text-amber-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">2. 용병 종류 및 스킬 목록</h2>
                    </div>
                    <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">

                        {/* 용병 기본 정보 */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { type: '전사', icon: '⚔️', color: 'red', unlock: '최초 시작 시 지급', desc: '높은 HP와 방어력 기반의 근접 전투 담당' },
                                { type: '궁수', icon: '🏹', color: 'emerald', unlock: '1-6 스테이지 클리어 후 골드로 영입', desc: '원거리 딜러. 폭풍의 시로 지속 딜 가능' },
                                { type: '마법사', icon: '🔮', color: 'purple', unlock: '궁수 영입 후 2-6 클리어 시 골드로 영입', desc: '광역 마법 공격 및 힐 보유' },
                            ].map(({ type, icon, color, unlock, desc }) => (
                                <div key={type} className={`bg-slate-950/60 border border-${color}-500/30 rounded-xl p-4`}>
                                    <div className="text-3xl mb-2">{icon}</div>
                                    <h3 className={`font-bold text-${color}-300 text-base mb-1`}>{type}</h3>
                                    <p className="text-xs text-slate-400 mb-2">{desc}</p>
                                    <div className={`text-xs bg-${color}-950/30 border border-${color}-800/30 rounded px-2 py-1 text-${color}-300`}>
                                        {unlock}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 용병 목록 스크린샷 추가 */}
                        <div className="relative w-full max-w-[500px] mx-auto rounded-lg overflow-hidden border border-slate-800 shadow-md">
                            <Image 
                                src="/images/ultima-squad-mercenaries-list.png" 
                                alt="용병 선택 관리 화면" 
                                width={500}
                                height={200}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>

                        <div className="bg-slate-950/40 border border-slate-700/50 rounded-xl p-4">
                            <h3 className="font-bold text-slate-200 mb-2">용병 성장 핵심 정보</h3>
                            <ul className="space-y-1.5 text-slate-300 text-sm list-disc list-inside">
                                <li>각 용병 최대 <strong className="text-orange-300">60레벨</strong>까지 성장 가능</li>
                                <li>특정 레벨 달성 시 <strong>외형이 변경</strong>됨</li>
                                <li>처음에는 스킬 슬롯 <strong>1개</strong>, 유틸리티 구매로 최대 <strong>3개</strong>까지 확장</li>
                                <li>영입한 용병은 <strong>자동으로 전투에 배치</strong>됨</li>
                            </ul>
                        </div>

                        {/* 스킬 목록 */}
                        <div>
                            <h3 className="font-bold text-slate-100 mb-4 text-base flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-400" /> 직업별 스킬 목록
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {Object.entries(mercenarySkills).map(([job, skills]) => {
                                    const colorMap: Record<string, { border: string; header: string; badge: string; text: string; }> = {
                                        전사: { border: 'border-red-500/30', header: 'bg-red-950/30 text-red-300', badge: 'bg-red-950/50 text-red-400', text: 'text-red-400' },
                                        궁수: { border: 'border-emerald-500/30', header: 'bg-emerald-950/30 text-emerald-300', badge: 'bg-emerald-950/50 text-emerald-400', text: 'text-emerald-400' },
                                        마법사: { border: 'border-purple-500/30', header: 'bg-purple-950/30 text-purple-300', badge: 'bg-purple-950/50 text-purple-400', text: 'text-purple-400' },
                                    };
                                    const c = colorMap[job];
                                    const icons: Record<string, string> = { 전사: '⚔️', 궁수: '🏹', 마법사: '🔮' };
                                    return (
                                        <div key={job} className={`bg-slate-950/60 border ${c.border} rounded-xl overflow-hidden`}>
                                            <div className={`${c.header} px-4 py-2.5 font-bold text-sm`}>
                                                {icons[job]} {job}
                                            </div>
                                            <ul className="divide-y divide-slate-800/50">
                                                {skills.map((skill) => (
                                                    <li key={skill.name} className="flex items-center justify-between px-4 py-2 text-xs">
                                                        <span className="text-slate-200">{skill.name}</span>
                                                        <span className={`${c.badge} px-2 py-0.5 rounded-full font-mono font-bold`}>Lv.{skill.level}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 스킬 시스템 설명 */}
                        <div className="bg-slate-950/60 border border-slate-700/50 rounded-xl p-4">
                            <h3 className="font-bold text-yellow-300 mb-3 text-sm">🔧 스킬 시스템 동작 방식</h3>
                            <ul className="space-y-1.5 text-slate-300 text-xs list-disc list-inside">
                                <li>장착한 스킬은 전투 시 <strong>자동 사용</strong>, 쿨타임 종료 시 자동으로 재사용</li>
                                <li>재사용 대기시간이 끝난 스킬이 여러 개이면 <strong>슬롯 순서대로</strong> 사용</li>
                                <li>모든 스킬이 쿨타임 중이면 <strong>기본 공격 스킬</strong>로 자동 전환</li>
                                <li>궁수 한정: 모든 스킬 쿨타임 중 폭풍의 시 장착 시 <strong>폭풍의 시</strong>로 대체 사용</li>
                                <li>스킬 해제 시 <strong>5초의 재장착 대기시간</strong> 발생</li>
                                <li>전투 중 새 스킬 장착 시 해당 스킬의 <strong>쿨타임만큼 대기</strong> 후 사용 가능</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 3. 장비 */}
                <section id="equipment" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <Shield className="w-6 h-6 text-yellow-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">3. 울티마 장비 및 잠재능력</h2>
                    </div>
                    <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">

                        {/* 장비 종류 */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                                { part: '무기', icon: '⚔️', option: '공격력 or 마력 + 공격 속도', color: 'orange' },
                                { part: '모자', icon: '🎩', option: '최대 HP + 방어력', color: 'slate' },
                                { part: '장갑', icon: '🥊', option: '최대 HP + 방어력', color: 'slate' },
                                { part: '신발', icon: '👟', option: '최대 HP + 방어력', color: 'slate' },
                            ].map(({ part, icon, option, color }) => (
                                <div key={part} className={`bg-slate-950/60 border border-${color}-500/30 rounded-xl p-3 text-center`}>
                                    <div className="text-2xl mb-1">{icon}</div>
                                    <p className={`font-bold text-${color}-300 text-sm`}>{part}</p>
                                    <p className="text-slate-500 text-xs mt-1">{option}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-amber-950/20 border border-amber-700/30 rounded-xl p-4">
                            <p className="text-amber-300 text-sm font-medium mb-1">💡 장비 획득 관련 정보</p>
                            <ul className="text-slate-400 text-xs space-y-1 list-disc list-inside">
                                <li>기본으로 제공되는 인벤토리 <strong className="text-white">10칸</strong> (유틸리티로 최대 256칸까지 확장)</li>
                                <li>장비 획득 시 기본 옵션 수치가 결정되며, 같은 단계의 장비도 수치 차이 발생</li>
                                <li>장착한 <strong className="text-white">무기의 외형</strong>만 전투 중 용병에게 반영됨</li>
                                <li>인벤토리가 가득 차면 더 이상 장비 획득 불가 ⚠️</li>
                            </ul>
                        </div>

                        {/* 장비 단계 표 */}
                        <div>
                            <h3 className="font-bold text-slate-100 mb-3 text-base">🏆 장비 단계별 잠재능력</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[400px] text-sm">
                                    <thead>
                                        <tr className="bg-slate-800/50 text-slate-300">
                                            <th className="p-3 border border-slate-700 font-semibold">장비 단계</th>
                                            <th className="p-3 border border-slate-700 font-semibold">잠재능력 등급</th>
                                            <th className="p-3 border border-slate-700 font-semibold">옵션 수</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-300">
                                        {equipmentGrades.map((g, i) => {
                                            const potentialColor: Record<string, string> = {
                                                '-': 'text-slate-500',
                                                '레어': 'text-sky-300',
                                                '에픽': 'text-purple-300',
                                                '유니크': 'text-yellow-300',
                                                '레전드리': 'text-orange-300',
                                            };
                                            return (
                                                <tr key={g.stage} className={i % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-950/30'}>
                                                    <td className="p-3 border border-slate-700 font-bold">{g.stage}단계</td>
                                                    <td className={`p-3 border border-slate-700 font-semibold ${potentialColor[g.potential]}`}>{g.potential}</td>
                                                    <td className="p-3 border border-slate-700 text-slate-400">{g.optionCount}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 잠재능력 재설정 */}
                        <div className="bg-slate-950/60 border border-slate-700/50 rounded-xl p-4">
                            <h3 className="font-bold text-purple-300 mb-3 text-sm">🎲 잠재능력 재설정 (훈련용 큐브)</h3>
                            <ul className="space-y-1.5 text-slate-300 text-xs list-disc list-inside mb-3">
                                <li>훈련용 큐브를 사용하여 울티마 장비 잠재능력 재설정 가능</li>
                                <li>훈련용 큐브는 <strong className="text-white">접속 상태</strong>에서만 획득 가능 (전투 중 드롭)</li>
                                <li>재설정 결과에서 <strong className="text-white">전/후 선택</strong> 후 적용 가능</li>
                                <li>잠재능력 재설정 시 <strong className="text-red-300">등급은 상승하지 않음</strong></li>
                            </ul>
                            <div>
                                <p className="text-slate-300 text-xs font-medium mb-2">✅ 잠재능력 옵션 목록</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {potentialOptions.map((opt) => (
                                        <span key={opt} className="px-2 py-1 bg-purple-950/30 border border-purple-800/30 rounded-md text-purple-300 text-xs">
                                            {opt}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 합성 & 분해 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-slate-950/60 border border-emerald-500/30 rounded-xl p-4">
                                <h3 className="font-bold text-emerald-300 mb-2 text-sm">⚗️ 장비 합성</h3>
                                <p className="text-slate-300 text-xs leading-relaxed">
                                    같은 단계의 장비 <strong className="text-white">9개</strong>를 합성하여 <strong className="text-emerald-300">1단계 상위 장비</strong> 1개 획득.<br />
                                    단, <strong className="text-white">8단계 장비 9개</strong> 합성 시 8단계 장비 1개 획득.
                                </p>
                            </div>
                            <div className="bg-slate-950/60 border border-orange-500/30 rounded-xl p-4">
                                <h3 className="font-bold text-orange-300 mb-2 text-sm">🔨 장비 분해</h3>
                                <p className="text-slate-300 text-xs leading-relaxed">
                                    장비를 분해하여 <strong className="text-orange-300">골드 획득</strong>.<br />
                                    장비의 단계에 따라 획득 골드 양이 달라짐.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. 스테이지 */}
                <section id="stage" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <Map className="w-6 h-6 text-emerald-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">4. 스테이지 구성 및 클리어 보상</h2>
                    </div>
                    <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">

                        {/* 스테이지 구조 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-slate-950/60 border border-emerald-500/30 rounded-xl p-4">
                                <h3 className="font-bold text-emerald-300 mb-2 text-sm">📊 스테이지 구조</h3>
                                <ul className="text-slate-300 text-xs space-y-1.5 list-disc list-inside">
                                    <li><strong>일반 모드 + 카오스 모드</strong> 구분</li>
                                    <li>각 모드에 <strong>3개 지역</strong>, 각 지역 <strong>10개 스테이지</strong></li>
                                    <li>1~9 스테이지: 몬스터 무리 + 보스 등장</li>
                                    <li>10 스테이지: <strong>보스 스테이지</strong> (1종만 등장)</li>
                                </ul>
                            </div>
                            <div className="bg-slate-950/60 border border-blue-500/30 rounded-xl p-4">
                                <h3 className="font-bold text-blue-300 mb-2 text-sm">⚡ 클리어 조건</h3>
                                <ul className="text-slate-300 text-xs space-y-1.5 list-disc list-inside">
                                    <li>용병 <strong>1명 이상 생존</strong> 상태로 모든 몬스터 처치 시 클리어</li>
                                    <li>클리어 시 <strong>자동으로 다음 스테이지</strong>로 이동</li>
                                    <li>전멸 시 <strong>이전에 클리어한 스테이지 -1 단계</strong>로 자동 이동 후 반복</li>
                                    <li>보스 스테이지는 <strong>최초 1회</strong>만 클리어 가능, 재입장 불가</li>
                                </ul>
                            </div>
                        </div>

                        {/* 일반 모드 보상 */}
                        <div>
                            <h3 className="font-bold text-slate-100 mb-3 text-base">🏆 일반 모드 스테이지 클리어 보상</h3>
                            <p className="text-slate-400 text-xs mb-3">각 스테이지 <strong className="text-white">최초 클리어 시 메이플ID당 1회</strong> 자동 획득. 코인 보유량은 모든 캐릭터 공유.</p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[400px] text-sm">
                                    <thead>
                                        <tr className="bg-emerald-900/20 text-emerald-200">
                                            <th className="p-3 border border-emerald-800/30 font-semibold">스테이지</th>
                                            <th className="p-3 border border-emerald-800/30 font-semibold">보상</th>
                                            <th className="p-3 border border-emerald-800/30 font-semibold">수량</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-300">
                                        {stageRewards.map((r, i) => (
                                            <tr key={r.stage} className={i % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-950/30'}>
                                                <td className="p-3 border border-slate-700 font-bold text-emerald-300">{r.stage}</td>
                                                <td className="p-3 border border-slate-700">{r.reward}</td>
                                                <td className="p-3 border border-slate-700 font-semibold text-yellow-300">{r.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 카오스 보상 */}
                        <div className="bg-gradient-to-br from-red-950/30 to-orange-950/20 border border-red-500/30 rounded-xl p-4">
                            <h3 className="font-bold text-red-300 mb-2 text-sm">🔥 카오스 모드 보상</h3>
                            <div className="flex items-center justify-between bg-slate-900/50 rounded-lg px-4 py-3">
                                <span className="text-slate-200 font-medium text-sm">카오스 모드 3-10 클리어</span>
                                <span className="text-yellow-300 font-bold text-sm">울티마 베스트 스쿼드 훈장 교환권 1개</span>
                            </div>
                            <p className="text-slate-400 text-xs mt-2">※ 메이플ID당 1회만 수령 가능. 훈장 아이템은 교환 불가, 영구 아이템.</p>
                        </div>
                    </div>
                </section>

                {/* 5. 전투 */}
                <section id="combat" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <Crosshair className="w-6 h-6 text-red-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">5. 전투 및 에스페시아 상자</h2>
                    </div>
                    <div className="space-y-5 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-slate-950/60 border border-red-500/30 rounded-xl p-4">
                                <h3 className="font-bold text-red-300 mb-2 text-sm">⚔️ 전투 기본 규칙</h3>
                                <ul className="text-slate-300 text-xs space-y-1.5 list-disc list-inside">
                                    <li>용병 배치 시 <strong>자동으로 전투 시작</strong></li>
                                    <li>전투 불능 시 <strong>자동으로 부활</strong> (부활 시간 있음)</li>
                                    <li>마지막 용병 전투 불능 = 스테이지 클리어 실패</li>
                                    <li>반복 플레이 버튼으로 <strong>같은 스테이지 반복 가능</strong></li>
                                </ul>
                            </div>
                            <div className="bg-slate-950/60 border border-orange-500/30 rounded-xl p-4">
                                <h3 className="font-bold text-orange-300 mb-2 text-sm">📦 에스페시아 상자</h3>
                                <ul className="text-slate-300 text-xs space-y-1.5 list-disc list-inside">
                                    <li><strong>매일 자정 기준 1회</strong> 소환 가능</li>
                                    <li>용병들이 공격하면 레어~레전드리로 성장</li>
                                    <li>처치 시: EXP, 장비, 훈련용 큐브, 골드 획득</li>
                                    <li>높은 스테이지일수록 더 많은 경험치·골드 획득</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-amber-950/20 border border-amber-700/30 rounded-xl p-3">
                            <p className="text-amber-300 text-xs font-medium">⚠️ 에스페시아 상자 소환 불가 상황</p>
                            <ul className="text-slate-400 text-xs mt-1 list-disc list-inside space-y-0.5">
                                <li>각 지역의 10번째 <strong className="text-white">보스 스테이지</strong>에서는 소환 불가</li>
                                <li>각 스테이지 마지막 <strong className="text-white">보스 등장 직전</strong>에는 소환 불가</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 6. 유틸리티 */}
                <section id="utility" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <Settings className="w-6 h-6 text-blue-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">6. 유틸리티 강화 목록 (골드 소모)</h2>
                    </div>
                    <div className="space-y-5 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
                        <p className="text-slate-400 text-sm">미니게임에서 획득한 <strong className="text-white">골드</strong>를 소모하여 유틸리티를 강화할 수 있습니다. 용병 관리 UI의 유틸리티 탭에서 확인하세요.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {utilityData.map((util) => {
                                const colorMap: Record<string, { border: string; header: string; badge: string; }> = {
                                    indigo: { border: 'border-indigo-500/30', header: 'text-indigo-300', badge: 'bg-indigo-950/50 text-indigo-300' },
                                    blue: { border: 'border-blue-500/30', header: 'text-blue-300', badge: 'bg-blue-950/50 text-blue-300' },
                                    emerald: { border: 'border-emerald-500/30', header: 'text-emerald-300', badge: 'bg-emerald-950/50 text-emerald-300' },
                                    yellow: { border: 'border-yellow-500/30', header: 'text-yellow-300', badge: 'bg-yellow-950/50 text-yellow-300' },
                                };
                                const c = colorMap[util.color];
                                return (
                                    <div key={util.category} className={`bg-slate-950/60 border ${c.border} rounded-xl overflow-hidden`}>
                                        <div className={`px-4 py-2.5 border-b border-slate-800/50 font-bold text-sm ${c.header}`}>
                                            {util.icon} {util.category}
                                        </div>
                                        <ul className="divide-y divide-slate-800/30">
                                            {util.items.map((item) => (
                                                <li key={item.effect} className="flex items-center justify-between px-4 py-2 text-xs">
                                                    <div>
                                                        <span className="text-slate-200">{item.effect}</span>
                                                        {'note' in item && item.note && (
                                                            <span className="ml-2 text-slate-500 text-xs">({item.note})</span>
                                                        )}
                                                    </div>
                                                    <span className={`${c.badge} px-2 py-0.5 rounded-full font-mono font-bold`}>{item.price}G</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 인벤토리 확장 */}
                        <div className="bg-slate-950/60 border border-slate-700/50 rounded-xl p-4">
                            <h3 className="font-bold text-slate-200 mb-3 text-sm">📦 인벤토리 슬롯 확장 (골드)</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {[
                                    { range: '11~29칸', price: '30,000' },
                                    { range: '30~49칸', price: '50,000' },
                                    { range: '50~69칸', price: '80,000' },
                                    { range: '70~99칸', price: '150,000' },
                                    { range: '100~129칸', price: '300,000' },
                                    { range: '130~169칸', price: '500,000' },
                                    { range: '170~209칸', price: '1,000,000' },
                                    { range: '210~256칸', price: '1,500,000' },
                                ].map((inv) => (
                                    <div key={inv.range} className="bg-slate-900/40 border border-slate-700/30 rounded-lg px-3 py-2 text-center">
                                        <p className="text-slate-300 text-xs font-medium">{inv.range}</p>
                                        <p className="text-yellow-400 text-xs font-bold mt-0.5">{inv.price}G</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. 카오스 모드 */}
                <section id="chaos" className="mb-14 scroll-mt-24 bg-gradient-to-br from-red-950/30 to-slate-900/30 border border-red-500/40 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3 mb-6 border-b border-red-800/30 pb-4">
                        <Star className="w-6 h-6 text-red-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">7. 카오스 모드</h2>
                    </div>
                    <div className="space-y-5 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">

                        <div className="bg-red-950/20 border border-red-800/30 rounded-xl p-4">
                            <h3 className="font-bold text-red-300 mb-2 text-sm">🔓 카오스 모드 입장 조건</h3>
                            <p className="text-slate-300 text-sm">일반 모드의 <strong className="text-white">3-10 스테이지</strong>까지 모두 클리어하면 입장 가능합니다.</p>
                            <p className="text-slate-500 text-xs mt-1">※ 테스트 월드에서는 카오스 모드 입장이 불가합니다.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="bg-slate-950/60 border border-orange-500/30 rounded-xl p-4 text-center">
                                <div className="text-2xl mb-2">💪</div>
                                <p className="font-bold text-orange-300 text-sm">더 강한 몬스터</p>
                                <p className="text-slate-400 text-xs mt-1">더 많은 EXP·골드·큐브 획득</p>
                            </div>
                            <div className="bg-slate-950/60 border border-yellow-500/30 rounded-xl p-4 text-center">
                                <div className="text-2xl mb-2">🎁</div>
                                <p className="font-bold text-yellow-300 text-sm">고등급 장비 획득</p>
                                <p className="text-slate-400 text-xs mt-1">더 높은 단계 장비 드롭</p>
                            </div>
                            <div className="bg-slate-950/60 border border-red-500/30 rounded-xl p-4 text-center">
                                <div className="text-2xl mb-2">🪙</div>
                                <p className="font-bold text-red-300 text-sm">카오스 스쿼드 코인</p>
                                <p className="text-slate-400 text-xs mt-1">처치 시 확률 드롭</p>
                            </div>
                        </div>

                        <div className="bg-slate-950/60 border border-slate-700/50 rounded-xl p-4">
                            <h3 className="font-bold text-slate-200 mb-3 text-sm">🪙 카오스 스쿼드 코인 사용법</h3>
                            <ul className="text-slate-300 text-xs space-y-1.5 list-disc list-inside">
                                <li>코인 보유량은 <strong className="text-white">메이플ID 내 모든 캐릭터 공유</strong></li>
                                <li>교환권 형태로 획득하거나 전용 코인샵 재화로 이전 가능</li>
                                <li>교환권은 <strong className="text-white">1회 거래 후</strong> 월드 내 내 캐릭터 간 이동만 가능</li>
                                <li>사용 기한: <strong className="text-white">2026년 8월 19일 오후 11:59</strong>까지</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 8. 코인샵 */}
                <section id="coinshop" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <Coins className="w-6 h-6 text-yellow-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">8. 울티마 스쿼드 코인샵</h2>
                    </div>
                    <div className="space-y-5 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">

                        <div className="bg-amber-950/20 border border-amber-700/30 rounded-xl p-3 mb-4">
                            <ul className="text-amber-300 text-xs space-y-1 list-disc list-inside">
                                <li>모든 아이템 구매 가능 수량은 <strong>메이플ID 내 공유</strong></li>
                                <li>구매한 모든 아이템은 <strong>2026년 8월 20일(목) 오전 2시</strong>까지만 사용 가능</li>
                                <li>월드 내 나의 캐릭터 간 이동만 가능한 아이템</li>
                            </ul>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[500px] text-sm">
                                <thead>
                                    <tr className="bg-slate-800/50 text-slate-300">
                                        <th className="p-3 border border-slate-700 font-semibold">화폐</th>
                                        <th className="p-3 border border-slate-700 font-semibold">아이템</th>
                                        <th className="p-3 border border-slate-700 font-semibold text-center">가격</th>
                                        <th className="p-3 border border-slate-700 font-semibold text-center">구매 한도</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-300">
                                    {coinShopItems.map((item, i) => (
                                        <tr key={item.item} className={i % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-950/30'}>
                                            <td className="p-3 border border-slate-700">
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.currency === '스쿼드 코인' ? 'bg-yellow-950/50 text-yellow-300 border border-yellow-800/30' : 'bg-red-950/50 text-red-300 border border-red-800/30'}`}>
                                                    {item.currency}
                                                </span>
                                            </td>
                                            <td className="p-3 border border-slate-700 font-medium">{item.item}</td>
                                            <td className="p-3 border border-slate-700 text-center font-bold text-yellow-300">{item.price}코인</td>
                                            <td className="p-3 border border-slate-700 text-center text-slate-400">{item.limit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 솔 에르다 효율 하이라이트 */}
                        <div className="bg-gradient-to-br from-indigo-950/40 to-purple-950/30 border-2 border-indigo-500/40 rounded-xl p-5">
                            <p className="text-indigo-300 font-bold mb-2 text-base flex items-center gap-2">
                                <Trophy className="w-5 h-5" /> 💡 핵심 보상: 솔 에르다
                            </p>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                스쿼드 코인 <strong className="text-white">200코인</strong>으로 <strong className="text-indigo-300">솔 에르다 1개</strong> 구매 가능 (최대 10개).
                                3-10 보스 클리어 보상으로 최대 1,200 스쿼드 코인을 획득할 수 있으므로,
                                모든 스테이지를 클리어하면 <strong className="text-yellow-300">솔 에르다 최대 10개</strong>를 획득할 수 있습니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 마무리 */}
                <div className="bg-gradient-to-br from-orange-950/30 via-amber-950/20 to-yellow-950/20 border border-orange-500/40 rounded-2xl p-6 sm:p-8 text-center">
                    <div className="text-4xl mb-3">⚔️🏹🔮</div>
                    <h2 className="text-xl font-black text-orange-300 mb-3">7월 23일부터 울티마 스쿼드에 합류하세요!</h2>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4 break-keep">
                        자동 전투 기반 미니게임으로 오프라인에서도 꾸준히 성장 가능!<br />
                        스테이지를 클리어하며 용병을 키우고, <strong className="text-orange-300">솔 에르다</strong>와 다양한 버프 아이템을 획득하세요 🍁
                    </p>
                    <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
                        <ChevronRight className="w-4 h-4" />
                        <span>이벤트 기간: 2026.07.23(목) 점검 후 ~ 08.19(수) 오후 11:59</span>
                    </div>
                </div>

            </main>
        </div>
    );
}
