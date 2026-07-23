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
            { name: '볼텍스 스피어', level: 20 },
            { name: '소울 컨트랙트', level: 31 },
            { name: '엘리멘탈 고스트', level: 37 },
            { name: '드래곤 버스트', level: 40 },
        ],
        마법사: [
            { name: '체인 라이트닝', level: 2 },
            { name: '힐', level: 7 },
            { name: '헤븐즈 도어 (부활)', level: 16 },
            { name: '플레임 스윕', level: 24 },
            { name: '프레이', level: 32 },
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
                { effect: '2칸으로 증가', price: '250,000', note: '1-10 클리어 후 가능' },
                { effect: '3칸으로 증가', price: '3,000,000', note: '2-10 클리어 후 가능' },
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
        { currency: '카오스 스쿼드 코인', item: '경험치 3배 쿠폰 (30분)', price: 15, limit: '200개' },
        { currency: '카오스 스쿼드 코인', item: '카오스 서큘레이터', price: 20, limit: '40개' },
    ];

    return (
        <div className="min-h-screen bg-[#070610] text-slate-100 pb-24 font-sans leading-relaxed">
            {/* 배경 장식 */}
            <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-orange-900/10 rounded-full blur-[140px] pointer-events-none z-0" />
            <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-900/8 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="fixed top-1/2 left-0 w-[300px] h-[300px] bg-red-900/5 rounded-full blur-[80px] pointer-events-none z-0" />

            {/* 헤더 */}
            <header className="w-full max-w-7xl flex justify-between items-center px-4 sm:px-6 py-3.5 sm:py-4 sticky top-0 z-50 bg-[#070610]/90 backdrop-blur-md border-b border-slate-800/80 mx-auto">
                <Link prefetch={false} href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-orange-400 font-semibold group text-sm sm:text-base">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform" />
                    <span>블로그 홈으로</span>
                </Link>
            </header>

            <main className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-12 relative z-10">

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
                        미션 울티마 작전에 합류한 <strong className="text-orange-300">신입 용병들</strong>을 성장시키고, <strong className="text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded">⚔️ 자동 전투 미니게임</strong>을 통해 다양한 보상을 획득하세요!
                        7월 23일 점검 후부터 8월 19일까지 진행되는 신규 미니게임 이벤트를 완벽하게 정리했습니다.
                    </p>

                    {/* 기본 정보 요약 카드 */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                        <div className="bg-slate-800/60 border border-orange-500/40 rounded-xl p-4 text-center">
                            <div className="text-3xl mb-2">🎖️</div>
                            <p className="text-sm text-orange-300/80 font-semibold mb-1">참여 조건</p>
                            <p className="text-base font-bold text-orange-300">101레벨 이상</p>
                            <p className="text-sm text-slate-300 mt-1">미션 울티마 참여 또는<br/>제로 챕터2 완료</p>
                        </div>
                        <div className="bg-slate-800/60 border border-amber-500/40 rounded-xl p-4 text-center">
                            <div className="text-3xl mb-2">📅</div>
                            <p className="text-sm text-amber-300/80 font-semibold mb-1">이벤트 기간</p>
                            <p className="text-base font-bold text-amber-300">7/23 ~ 8/19</p>
                            <p className="text-sm text-slate-300 mt-1">점검 후 ~ 오후 11:59</p>
                            <p className="text-xs font-bold text-amber-400 mt-1">(총 28일간)</p>
                        </div>
                        <div className="bg-slate-800/60 border border-yellow-500/40 rounded-xl p-4 text-center">
                            <div className="text-3xl mb-2">🤝</div>
                            <p className="text-sm text-yellow-300/80 font-semibold mb-1">기록 공유</p>
                            <p className="text-base font-bold text-yellow-300">메이플ID 공유</p>
                            <p className="text-sm text-slate-300 mt-1">모든 캐릭터 간<br/>진행 기록 공유</p>
                        </div>
                    </div>

                    {/* 🔥 7/23 본섭 정식 적용 변경 사항 (테스트월드 대비 완화 총정리) */}
                    <div className="mb-8 bg-gradient-to-r from-amber-950/50 via-slate-900/80 to-amber-950/50 border-2 border-amber-500/60 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
                        <div className="flex items-center gap-2.5 mb-3 border-b border-amber-500/30 pb-3">
                            <span className="text-2xl">🔥</span>
                            <div>
                                <h3 className="text-lg sm:text-xl font-extrabold text-amber-300">
                                    7/23 본섭 정식 패치 변경 사항 (테스트월드 대비 난이도 파격 완화)
                                </h3>
                                <p className="text-xs text-slate-400">7월 23일(목) 정식 업데이트 반영 | 테스트월드 대비 달라진 주요 지출 & 스킬 해금 총정리</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3.5 text-xs sm:text-sm">
                            <div className="bg-slate-950/70 border border-emerald-500/40 rounded-xl p-3.5">
                                <p className="font-bold text-emerald-300 text-sm mb-1.5 flex items-center gap-1.5">
                                    <span>🏹</span> <span>용병 영입 비용 80~50% 폭풍 인하</span>
                                </p>
                                <ul className="space-y-1 text-slate-300">
                                    <li>• 궁수 영입: <span className="line-through text-slate-500">50만G</span> ➔ <strong className="text-emerald-300 font-bold">10만 (100,000) G</strong> (80% 인하)</li>
                                    <li>• 마법사 영입: <span className="line-through text-slate-500">400만G</span> ➔ <strong className="text-purple-300 font-bold">200만 (2,000,000) G</strong> (50% 인하)</li>
                                </ul>
                            </div>

                            <div className="bg-slate-950/70 border border-yellow-500/40 rounded-xl p-3.5">
                                <p className="font-bold text-yellow-300 text-sm mb-1.5 flex items-center gap-1.5">
                                    <span>💰</span> <span>스킬 & 인벤토리 슬롯 확장 비용 대폭 완화</span>
                                </p>
                                <ul className="space-y-1 text-slate-300">
                                    <li>• 스킬 슬롯 2칸: <span className="line-through text-slate-500">150만G</span> ➔ <strong className="text-yellow-300 font-bold">25만 (250,000) G</strong> (83% 인하!)</li>
                                    <li>• 스킬 슬롯 3칸: <span className="line-through text-slate-500">700만G</span> ➔ <strong className="text-yellow-300 font-bold">300만 (3,000,000) G</strong> (57% 인하)</li>
                                    <li>• 초반 인벤토리(11~29칸): <span className="line-through text-slate-500">3만G</span> ➔ <strong className="text-yellow-300 font-bold">1만 (10,000) G</strong></li>
                                </ul>
                            </div>

                            <div className="bg-slate-950/70 border border-red-500/40 rounded-xl p-3.5">
                                <p className="font-bold text-red-300 text-sm mb-1.5 flex items-center gap-1.5">
                                    <span>🔮</span> <span>스킬 습득 레벨 상향 조정 (버프)</span>
                                </p>
                                <ul className="space-y-1 text-slate-300">
                                    <li>• 마법사 핵심 부활기 「헤븐즈 도어」: <span className="line-through text-slate-500">Lv.17</span> ➔ <strong className="text-red-300 font-bold">Lv.16</strong> 습득</li>
                                    <li>• 마법사 「플레임 스윕」: <span className="line-through text-slate-500">Lv.25</span> ➔ <strong className="text-purple-300 font-bold">Lv.24</strong> 습득</li>
                                    <li>• 궁수 「볼텍스 스피어」: <span className="line-through text-slate-500">Lv.21</span> ➔ <strong className="text-emerald-300 font-bold">Lv.20</strong> 습득</li>
                                    <li>• 궁수 「엘리멘탈 고스트」: <span className="line-through text-slate-500">Lv.38</span> ➔ <strong className="text-emerald-300 font-bold">Lv.37</strong> 습득</li>
                                </ul>
                            </div>

                            <div className="bg-slate-950/70 border border-blue-500/40 rounded-xl p-3.5">
                                <p className="font-bold text-blue-300 text-sm mb-1.5 flex items-center gap-1.5">
                                    <span>🛍️</span> <span>카오스 코인샵 구성품 수량 2배 증량</span>
                                </p>
                                <ul className="space-y-1 text-slate-300">
                                    <li>• 경험치 3배 쿠폰(30분): <span className="line-through text-slate-500">100개</span> ➔ <strong className="text-blue-300 font-bold">200개</strong> (2배 증량!)</li>
                                    <li>• 솔 에르다: 10개 / 솔 에르다 조각: 400개 유지</li>
                                </ul>
                            </div>

                            <div className="bg-slate-950/70 border border-purple-500/40 rounded-xl p-3.5">
                                <p className="font-bold text-purple-300 text-sm mb-1.5 flex items-center gap-1.5">
                                    <span>⚙️</span> <span>오프라인 정산 & 카오스 모드 세부 규칙</span>
                                </p>
                                <ul className="space-y-1.5 text-slate-300">
                                    <li>• <strong className="text-white">게임을 꺼도 쑥쑥!</strong> 단, 접속 종료 상태에서는 <strong className="text-yellow-300">경험치와 골드</strong>만 쌓입니다. (장비, 큐브, 코인은 접속 중에만 드롭)</li>
                                    <li>• <strong className="text-white">오프라인 보상 기준:</strong> 현재 멈춰있는 스테이지가 아닌 <strong className="text-orange-300">'직전에 클리어 완료한'</strong> 스테이지의 보상 기준으로 쌓입니다.</li>
                                    <li>• <strong className="text-white">카오스 모드:</strong> 몬스터가 <strong className="text-red-400">골드를 떨어뜨리지 않습니다!</strong> 대신 <strong className="text-purple-300">'작은 카오스 코인'</strong>이 드롭되며, 이 코인은 전용 코인샵에서 바로 사용할 수 있는 <strong className="text-amber-300">'카오스 스쿼드 코인'으로 전환</strong>하거나, 다른 캐릭터에게 <strong className="text-sky-300">교환권 형태</strong>로 넘겨줄 수 있습니다.</li>
                                </ul>
                            </div>
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
                                { num: '07', color: 'text-green-400', href: '#strategy', label: '실전 공략 가이드 (초반 성장)' },
                                { num: '08', color: 'text-pink-400', href: '#chaos', label: '카오스 모드 & 코인샵' },
                                { num: '09', color: 'text-red-400', href: '#coinshop', label: '울티마 스쿼드 코인샵' },
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

                        <div className="bg-slate-900/60 border border-blue-500/20 rounded-xl p-4">
                            <h3 className="font-bold text-blue-300 mb-3 flex items-center gap-2">⏰ 오프라인 보상 시스템</h3>
                            <ul className="space-y-2.5 text-slate-100 list-disc list-inside mb-4 leading-relaxed">
                                <li>접속하지 않은 동안에도 용병들이 <strong className="text-amber-300">자동 전투</strong>한 것으로 간주, <strong className="text-yellow-300">EXP</strong>와 <strong className="text-yellow-300">골드</strong> 획득</li>
                                <li>용병 배치 후 전투 화면에 <strong className="text-green-300">1회 이상 진입</strong>한 시점부터 오프라인 보상 적립 시작</li>
                                <li>재접속 시 <strong className="text-sky-300">'오프라인 보상' 팝업</strong>으로 EXP·골드 및 레벨업 결과 확인 가능</li>
                                <li>오프라인 보상은 <strong className="text-orange-300">마지막으로 클리어한 스테이지</strong> 기준으로 지급</li>
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
                            <div className="mt-4 p-4 sm:p-5 bg-blue-950/25 border border-blue-500/30 rounded-xl shadow-md">
                                <p className="text-blue-200 text-base font-bold mb-2 flex items-center gap-1.5">
                                    <span>⚠️</span>
                                    <span>주의사항</span>
                                </p>
                                <ul className="text-slate-100 text-base space-y-2 list-disc list-inside leading-relaxed">
                                    <li>오프라인 누적 시간은 <strong className="text-sky-300">기본 16시간 / 최대 24시간</strong>까지 인정 (유틸리티 확장 후)</li>
                                    <li className="text-base font-bold text-amber-300 mt-2 mb-2 bg-amber-950/40 p-2 rounded border border-amber-500/20 list-none -ml-4 flex items-center gap-1.5 shadow-sm">
                                        <span>🚨</span>
                                        <span>장비, 훈련용 큐브, 카오스 스쿼드 코인은 <strong className="text-white underline underline-offset-4 decoration-amber-500">접속 상태에서만</strong> 획득 가능합니다.</span>
                                    </li>
                                    <li>캐시샵 이용 시간은 오프라인으로 취급 → <strong className="text-yellow-300">EXP·골드만</strong> 일부 획득</li>
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
                                { type: '전사', icon: '⚔️', color: 'red', unlock: '최초 시작 시 지급', role: '탱커 근접' },
                                { type: '궁수', icon: '🏹', color: 'emerald', unlock: '1-6 클리어 후 10만(100,000) 골드 영입', role: '원거리 딜러' },
                                { type: '마법사', icon: '🔮', color: 'purple', unlock: '2-6 클리어 후 200만(2,000,000) 골드 영입', role: '힐링 보조 딜러' },
                            ].map(({ type, icon, color, unlock, role }) => (
                                <div key={type} className={`bg-slate-950/60 border border-${color}-500/30 rounded-xl p-4`}>
                                    <div className="text-3xl mb-2">{icon}</div>
                                    <h3 className={`font-bold text-${color}-300 text-base mb-2 flex items-center gap-1.5`}>
                                        <span>{type}</span>
                                        <span className="text-xs text-slate-400 font-normal">({role})</span>
                                    </h3>
                                    <div className={`text-xs bg-${color}-950/30 border border-${color}-800/30 rounded px-2 py-1 text-${color}-300 font-semibold`}>
                                        {unlock}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 용병 영입 비용 실측/공식 변경 안내 */}
                        <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-4 sm:p-5">
                            <h3 className="font-bold text-emerald-300 mb-2 text-base flex items-center gap-1.5">
                                <span>📢</span>
                                <span>용병 영입 비용 난이도 완화 안내 (공식 패치 실측)</span>
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                용병 영입에 필요한 골드 비용이 대폭 감소했습니다! <strong className="text-emerald-300">궁수는 10만 골드 (100,000 G)</strong>, <strong className="text-purple-300">마법사는 200만 골드 (2,000,000 G)</strong>로 감소하여 3인 스쿼드 구축 부담이 한결 줄었습니다.
                            </p>
                        </div>

                        {/* 용병 목록 스크린샷 추가 */}
                        <div className="relative w-full max-w-[500px] mx-auto rounded-lg overflow-hidden border border-slate-800 shadow-md">
                            <Image 
                                src="/images/ultima-squad-mercenaries-list.png" 
                                alt="용병 및 스킬 관리 화면" 
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
                                <li>스킬 해제 시 <strong>3초의 재장착 대기시간</strong> 발생</li>
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

                        {/* 장착 장비 스크린샷 추가 */}
                        <div className="relative w-full max-w-[320px] mx-auto rounded-lg overflow-hidden border border-slate-800 shadow-md">
                            <Image 
                                src="/images/ultima-squad-equipment.png" 
                                alt="장착 장비 UI 화면" 
                                width={320}
                                height={240}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>

                        <div className="bg-amber-950/25 border border-amber-500/30 rounded-xl p-5 shadow-lg">
                            <p className="text-amber-300 text-base font-bold mb-2 flex items-center gap-1.5">
                                <span>💡</span>
                                <span>장비 획득 관련 정보</span>
                            </p>
                            <ul className="text-slate-200 text-sm space-y-2 list-disc list-inside leading-relaxed">
                                <li>기본으로 제공되는 인벤토리 <strong className="text-white">10칸</strong> (유틸리티로 최대 256칸까지 확장)</li>
                                <li>장비 획득 시 기본 옵션 수치가 결정되며, 같은 단계의 장비도 수치 차이 발생</li>
                                <li>장착한 <strong className="text-white">무기의 외형</strong>만 전투 중 용병에게 반영됨</li>
                                <li className="text-red-400 font-bold">인벤토리가 가득 차면 전투를 진행해도 장비를 더 이상 획득할 수 없고, 에스페시아 상자 소환 및 보스 스테이지 진입이 불가능합니다. ⚠️</li>
                            </ul>
                        </div>

                        {/* 📌 스테이지별 드롭 장비 단계 공식 안내 */}
                        <div className="bg-slate-950/60 border border-indigo-500/40 rounded-xl p-4 sm:p-5">
                            <h3 className="font-bold text-indigo-300 mb-2 text-base flex items-center gap-1.5">
                                <span>📜</span>
                                <span>스테이지별 드롭되는 장비 단계 안내 (공식 패치 표)</span>
                            </h3>
                            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                                ※ 각 지역의 10 스테이지는 보스 스테이지로, 정해진 단계의 장비 중 1종이 확정 지급됩니다.
                            </p>

                            {/* 2열 그리드 표 (일반 모드 vs 카오스 모드) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                                {/* 일반 모드 */}
                                <div className="border border-purple-800/40 rounded-xl overflow-hidden bg-purple-950/20">
                                    <div className="bg-purple-900/40 px-4 py-2.5 font-bold text-purple-200 text-center border-b border-purple-800/40">
                                        ⚔️ 일반 모드 드롭 장비 단계
                                    </div>
                                    <table className="w-full text-center border-collapse">
                                        <thead>
                                            <tr className="bg-purple-950/50 text-purple-300 font-semibold border-b border-purple-800/30">
                                                <th className="p-2 border-r border-purple-800/20">지역</th>
                                                <th className="p-2 border-r border-purple-800/20">스테이지</th>
                                                <th className="p-2">드롭되는 장비 단계</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-purple-900/20 text-slate-300">
                                            <tr><td rowSpan={4} className="p-2 border-r border-purple-800/20 font-bold bg-slate-900/40">1지역</td><td className="p-2 border-r border-purple-800/20">1-1</td><td className="p-2 text-slate-500">-</td></tr>
                                            <tr><td className="p-2 border-r border-purple-800/20">1-2 ~ 1-6</td><td className="p-2">1단계</td></tr>
                                            <tr><td className="p-2 border-r border-purple-800/20">1-7 ~ 1-9</td><td className="p-2">1~2단계</td></tr>
                                            <tr className="bg-amber-950/30 font-bold text-amber-300"><td className="p-2 border-r border-purple-800/20">1-10 (보스)</td><td className="p-2">2단계 (확정)</td></tr>

                                            <tr><td rowSpan={3} className="p-2 border-r border-purple-800/20 font-bold bg-slate-900/40">2지역</td><td className="p-2 border-r border-purple-800/20">2-1 ~ 2-6</td><td className="p-2">1~3단계</td></tr>
                                            <tr><td className="p-2 border-r border-purple-800/20">2-7 ~ 2-9</td><td className="p-2">1~4단계</td></tr>
                                            <tr className="bg-amber-950/30 font-bold text-amber-300"><td className="p-2 border-r border-purple-800/20">2-10 (보스)</td><td className="p-2">3단계 (확정)</td></tr>

                                            <tr><td rowSpan={3} className="p-2 border-r border-purple-800/20 font-bold bg-slate-900/40">3지역</td><td className="p-2 border-r border-purple-800/20">3-1 ~ 3-6</td><td className="p-2">1~5단계</td></tr>
                                            <tr><td className="p-2 border-r border-purple-800/20">3-7 ~ 3-9</td><td className="p-2">1~6단계</td></tr>
                                            <tr className="bg-amber-950/30 font-bold text-amber-300"><td className="p-2 border-r border-purple-800/20">3-10 (보스)</td><td className="p-2">4단계 (확정)</td></tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* 카오스 모드 */}
                                <div className="border border-pink-800/40 rounded-xl overflow-hidden bg-pink-950/20">
                                    <div className="bg-pink-900/40 px-4 py-2.5 font-bold text-pink-200 text-center border-b border-pink-800/40">
                                        🔥 카오스 모드 드롭 장비 단계
                                    </div>
                                    <table className="w-full text-center border-collapse">
                                        <thead>
                                            <tr className="bg-pink-950/50 text-pink-300 font-semibold border-b border-pink-800/30">
                                                <th className="p-2 border-r border-pink-800/20">지역</th>
                                                <th className="p-2 border-r border-pink-800/20">스테이지</th>
                                                <th className="p-2">드롭되는 장비 단계</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-pink-900/20 text-slate-300">
                                            <tr><td rowSpan={2} className="p-2 border-r border-pink-800/20 font-bold bg-slate-900/40">1지역</td><td className="p-2 border-r border-pink-800/20">1-1 ~ 1-9</td><td className="p-2">1~6단계</td></tr>
                                            <tr className="bg-amber-950/30 font-bold text-amber-300"><td className="p-2 border-r border-pink-800/20">1-10 (보스)</td><td className="p-2">6단계 (확정)</td></tr>

                                            <tr><td rowSpan={3} className="p-2 border-r border-pink-800/20 font-bold bg-slate-900/40">2지역</td><td className="p-2 border-r border-pink-800/20">2-1 ~ 2-2</td><td className="p-2">1~6단계</td></tr>
                                            <tr><td className="p-2 border-r border-pink-800/20">2-3 ~ 2-9</td><td className="p-2">1~7단계</td></tr>
                                            <tr className="bg-amber-950/30 font-bold text-amber-300"><td className="p-2 border-r border-pink-800/20">2-10 (보스)</td><td className="p-2">7단계 (확정)</td></tr>

                                            <tr><td rowSpan={3} className="p-2 border-r border-pink-800/20 font-bold bg-slate-900/40">3지역</td><td className="p-2 border-r border-pink-800/20">3-1 ~ 3-3</td><td className="p-2">1~7단계</td></tr>
                                            <tr><td className="p-2 border-r border-pink-800/20">3-4 ~ 3-9</td><td className="p-2 font-bold text-rose-300">1~8단계</td></tr>
                                            <tr className="bg-amber-950/30 font-bold text-amber-300"><td className="p-2 border-r border-pink-800/20">3-10 (보스)</td><td className="p-2 font-black text-yellow-300">8단계 (확정)</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* 장비 단계별 능력치 표 */}
                        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 sm:p-5">
                            <h3 className="font-bold text-slate-100 mb-2 text-base flex items-center gap-1.5">
                                🛡️ 울티마 장비 단계별 스탯 및 추가 옵션 (추옵)
                            </h3>
                            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                                ※ 본 표는 직접 플레이하면서 확인한 데이터를 기반으로 작성되었으므로 <strong className="text-orange-400">100% 정확하지 않을 수 있습니다.</strong>
                            </p>

                            {/* 1단계 */}
                            <div className="mb-3 rounded-xl overflow-hidden border border-sky-700/40">
                                <div className="bg-sky-900/40 px-4 py-2 flex items-center gap-2 border-b border-sky-700/40">
                                    <span className="text-sky-300 font-bold text-sm">1단계</span>
                                    <span className="text-xs text-sky-400/70">Stage 1</span>
                                    <span className="ml-auto text-xs px-2.5 py-0.5 bg-sky-950/60 text-sky-300 rounded-full border border-sky-700/50 font-semibold">제한 레벨: 없음</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-700/50">
                                    {/* 무기 */}
                                    <div className="p-3 sm:p-4 bg-slate-900/50">
                                        <p className="text-slate-400 text-xs mb-2 font-medium">⚔️ 무기</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2.5 py-1 bg-slate-800 rounded-md text-slate-200 text-xs font-medium">공격력 +9</span>
                                            <span className="px-2.5 py-1 bg-orange-900/40 border border-orange-500/30 rounded-md text-orange-300 text-xs font-semibold">추옵 +4 (확인)</span>
                                        </div>
                                    </div>
                                    {/* 방어구 */}
                                    <div className="p-3 sm:p-4 bg-slate-900/30">
                                        <p className="text-slate-400 text-xs mb-2 font-medium">🎩🥊👟 방어구 (모자/장갑/신발)</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2.5 py-1 bg-slate-800 rounded-md text-slate-200 text-xs font-medium">최대 HP +45</span>
                                            <span className="px-2.5 py-1 bg-slate-800 rounded-md text-slate-200 text-xs font-medium">방어력 +5</span>
                                            <span className="px-2.5 py-1 bg-orange-900/40 border border-orange-500/30 rounded-md text-orange-300 text-xs font-semibold">추옵 HP +10 / 방어력 +4</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 2단계 */}
                            <div className="mb-3 rounded-xl overflow-hidden border border-violet-700/40">
                                <div className="bg-violet-900/40 px-4 py-2 flex items-center gap-2 border-b border-violet-700/40">
                                    <span className="text-violet-300 font-bold text-sm">2단계</span>
                                    <span className="text-xs text-violet-400/70">Stage 2</span>
                                    <span className="ml-auto text-xs px-2.5 py-0.5 bg-violet-950/60 text-violet-300 rounded-full border border-violet-700/50 font-semibold">제한 레벨: Lv. 6 이상</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-700/50">
                                    {/* 무기 */}
                                    <div className="p-3 sm:p-4 bg-slate-900/50">
                                        <p className="text-slate-400 text-xs mb-2 font-medium">⚔️ 무기</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2.5 py-1 bg-slate-800 rounded-md text-slate-200 text-xs font-medium">공격력 +14</span>
                                            <span className="px-2.5 py-1 bg-orange-900/40 border border-orange-500/30 rounded-md text-orange-300 text-xs font-semibold">추옵 +4 (확인)</span>
                                        </div>
                                    </div>
                                    {/* 방어구 */}
                                    <div className="p-3 sm:p-4 bg-slate-900/30">
                                        <p className="text-slate-400 text-xs mb-2 font-medium">🎩🥊👟 방어구 (모자/장갑/신발)</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2.5 py-1 bg-slate-800 rounded-md text-slate-200 text-xs font-medium">최대 HP +74</span>
                                            <span className="px-2.5 py-1 bg-slate-800 rounded-md text-slate-200 text-xs font-medium">방어력 +10</span>
                                            <span className="px-2.5 py-1 bg-orange-900/40 border border-orange-500/30 rounded-md text-orange-300 text-xs font-semibold">추옵 HP +12 / 방어력 +4</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 3단계 */}
                            <div className="rounded-xl overflow-hidden border border-amber-700/40">
                                <div className="bg-amber-900/40 px-4 py-2 flex items-center gap-2 border-b border-amber-700/40">
                                    <span className="text-amber-300 font-bold text-sm">3단계</span>
                                    <span className="text-xs text-amber-400/70">Stage 3</span>
                                    <span className="ml-auto text-xs px-2.5 py-0.5 bg-amber-950/60 text-amber-300 rounded-full border border-amber-700/50 font-semibold">제한 레벨: Lv. 15 이상</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-700/50">
                                    {/* 무기 */}
                                    <div className="p-3 sm:p-4 bg-slate-900/50">
                                        <p className="text-slate-400 text-xs mb-2 font-medium">⚔️ 무기</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2.5 py-1 bg-slate-800 rounded-md text-slate-200 text-xs font-medium">공격력 +20</span>
                                            <span className="px-2.5 py-1 bg-orange-900/40 border border-orange-500/30 rounded-md text-orange-300 text-xs font-semibold">추옵 +4 (확인)</span>
                                        </div>
                                    </div>
                                    {/* 방어구 */}
                                    <div className="p-3 sm:p-4 bg-slate-900/30">
                                        <p className="text-slate-400 text-xs mb-2 font-medium">🎩🥊👟 방어구 (모자/장갑/신발)</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2.5 py-1 bg-slate-800 rounded-md text-slate-200 text-xs font-medium">최대 HP +112</span>
                                            <span className="px-2.5 py-1 bg-slate-800 rounded-md text-slate-200 text-xs font-medium">방어력 +15</span>
                                            <span className="px-2.5 py-1 bg-orange-900/40 border border-orange-500/30 rounded-md text-orange-300 text-xs font-semibold">추옵 HP +16 / 방어력 +4</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 4단계 */}
                            <div className="rounded-xl overflow-hidden border border-emerald-700/40 mt-3">
                                <div className="bg-emerald-900/40 px-4 py-2 flex items-center gap-2 border-b border-emerald-700/40">
                                    <span className="text-emerald-300 font-bold text-sm">4단계</span>
                                    <span className="text-xs text-emerald-400/70">Stage 4</span>
                                    <span className="ml-auto text-xs px-2.5 py-0.5 bg-emerald-950/60 text-emerald-300 rounded-full border border-emerald-700/50 font-semibold">제한 레벨: Lv. 22 이상</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-700/50">
                                    {/* 무기 */}
                                    <div className="p-3 sm:p-4 bg-slate-900/50">
                                        <p className="text-slate-400 text-xs mb-2 font-medium">⚔️ 무기</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2.5 py-1 bg-slate-800 rounded-md text-slate-200 text-xs font-medium">공격력 +25</span>
                                            <span className="px-2.5 py-1 bg-orange-900/40 border border-orange-500/30 rounded-md text-orange-300 text-xs font-semibold">추옵 +4 (확인)</span>
                                        </div>
                                    </div>
                                    {/* 방어구 */}
                                    <div className="p-3 sm:p-4 bg-slate-900/30">
                                        <p className="text-slate-400 text-xs mb-2 font-medium">🎩🥊👟 방어구 (모자/장갑/신발)</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2.5 py-1 bg-slate-800 rounded-md text-slate-200 text-xs font-medium">최대 HP +158</span>
                                            <span className="px-2.5 py-1 bg-slate-800 rounded-md text-slate-200 text-xs font-medium">방어력 +20</span>
                                            <span className="px-2.5 py-1 bg-orange-900/40 border border-orange-500/30 rounded-md text-orange-300 text-xs font-semibold">추옵 HP +34 / 방어력 +4 (확인)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 5단계 */}
                            <div className="rounded-xl overflow-hidden border border-purple-700/40 mt-3">
                                <div className="bg-purple-900/40 px-4 py-2 flex items-center gap-2 border-b border-purple-700/40">
                                    <span className="text-purple-300 font-bold text-sm">5단계 ⭐</span>
                                    <span className="text-xs text-purple-400/70">Stage 5</span>
                                    <span className="ml-auto text-xs px-2.5 py-0.5 bg-purple-950/60 text-purple-300 rounded-full border border-purple-700/50 font-semibold">제한 레벨: Lv. 28 이상</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-700/50">
                                    {/* 무기 */}
                                    <div className="p-3 sm:p-4 bg-slate-900/50">
                                        <p className="text-slate-400 text-xs mb-2 font-medium">⚔️ 무기</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2.5 py-1 bg-slate-800 rounded-md text-slate-200 text-xs font-medium">공격력 +32</span>
                                            <span className="px-2.5 py-1 bg-orange-900/40 border border-orange-500/30 rounded-md text-orange-300 text-xs font-semibold">추옵 +6 (확인)</span>
                                        </div>
                                    </div>
                                    {/* 방어구 */}
                                    <div className="p-3 sm:p-4 bg-slate-900/30">
                                        <p className="text-slate-400 text-xs mb-2 font-medium">🎩🥊👟 방어구 (모자 / 장갑 / 신발)</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2.5 py-1 bg-slate-800 rounded-md text-slate-200 text-xs font-medium">최대 HP +231</span>
                                            <span className="px-2.5 py-1 bg-slate-800 rounded-md text-slate-200 text-xs font-medium">방어력 +25</span>
                                            <span className="px-2.5 py-1 bg-orange-900/40 border border-orange-500/30 rounded-md text-orange-300 text-xs font-semibold">추옵 HP +38 / 방어력 +4 (확인)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        {/* 1. 단계별 장비 기본 스탯 (전체 너비 대형 종합 테이블) */}
                        <div className="mb-6">
                            {/* 본섭 변경 안내 배너 */}
                            <div className="mb-3 p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl flex items-start gap-2.5">
                                <span className="text-amber-400 text-base mt-0.5 shrink-0">⚠️</span>
                                <div className="text-xs sm:text-sm leading-relaxed space-y-1">
                                    <p className="text-amber-300 font-bold">본섭 출시 후 착용 레벨 변경 안내</p>
                                    <p className="text-slate-300">착용 레벨이 테섭 대비 본섭 출시 시 일부 변경되었습니다. 아래 수치는 본섭 기준으로 업데이트되었으나, 일부 단계는 추가 실측이 필요합니다.</p>
                                    <ul className="text-slate-400 space-y-0.5 list-disc list-inside mt-1">
                                        <li><span className="text-white font-semibold">2단계</span>: 테섭 <span className="line-through text-slate-500">Lv. 8 이상</span> → 본섭 <span className="text-emerald-300 font-bold">Lv. 6 이상</span> <span className="text-emerald-400">(본섭 실측 확인)</span></li>
                                        <li><span className="text-white font-semibold">3단계</span>: 테섭 <span className="line-through text-slate-500">Lv. 15 이상</span> → 본섭 <span className="text-emerald-300 font-bold">Lv. 12 이상</span> <span className="text-emerald-400">(본섭 실측 확인)</span></li>
                                        <li><span className="text-yellow-300 font-semibold">그 외 단계</span>: 본섭 변경 여부 <span className="text-rose-400 font-bold">추가 실측 확인 필요</span></li>
                                    </ul>
                                </div>
                            </div>
                                <table className="w-full text-left border-collapse min-w-[550px] text-xs sm:text-sm shadow-md">
                                    <thead>
                                        <tr className="bg-slate-800 text-slate-100 border-b border-slate-600">
                                            <th className="p-2.5 sm:p-3 border border-slate-700 font-bold text-white">장비 단계</th>
                                            <th className="p-2.5 sm:p-3 border border-slate-700 font-bold text-amber-300">착용 레벨</th>
                                            <th className="p-2.5 sm:p-3 border border-slate-700 font-bold text-rose-300 text-center">무기 기본 공</th>
                                            <th className="p-2.5 sm:p-3 border border-slate-700 font-bold text-sky-200">방어구 기본 스탯 (모자/장갑/신발)</th>
                                            <th className="p-2.5 sm:p-3 border border-slate-700 font-bold text-emerald-300">추옵 실측 확인</th>
                                            <th className="p-2.5 sm:p-3 border border-slate-700 font-bold text-yellow-300 text-right">분해 골드</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-white">
                                        {[
                                            { stage: '1단계', lv: '제한 없음', atk: '+9', armor: '최대 HP +45 / 방어력 +5', pot: '무기 공/마 +4 / 방어구 HP +10, 방어력 +4', price: '660 G' },
                                            { stage: '2단계', lv: 'Lv. 6 이상', atk: '+14', armor: '최대 HP +74 / 방어력 +10', pot: '무기 공/마 +5 / 방어구 HP +12, 방어력 +4', price: '1,400 G' },
                                            { stage: '3단계', lv: 'Lv. 12 이상', atk: '+20', armor: '최대 HP +112 / 방어력 +15', pot: '무기 공/마 +4 / 방어구 HP +16, 방어력 +4', price: '2,970 G' },
                                            { stage: '4단계 ⭐', lv: 'Lv. 22 이상', atk: '+25', armor: '최대 HP +158 / 방어력 +20', pot: '무기 공/마 +4 / 방어구 HP +34, 방어력 +4', price: '6,300 G' },
                                            { stage: '5단계 ⭐', lv: 'Lv. 28 이상', atk: '+32', armor: '최대 HP +231 / 방어력 +25', pot: '무기 공/마 +6 / 방어구 HP +38, 방어력 +4', price: '13,370 G' },
                                            { stage: '6단계~', lv: '미확인', atk: '미확인', armor: '미확인', pot: '미확인', price: '미확인' },
                                        ].map((row, idx) => (
                                            <tr key={row.stage} className={row.stage.includes('⭐') ? 'bg-amber-950/40 ring-1 ring-amber-500/40' : idx % 2 === 0 ? 'bg-slate-900/60' : 'bg-slate-950/60'}>
                                                <td className="p-2.5 sm:p-3 border border-slate-700 font-extrabold text-white">{row.stage}</td>
                                                <td className="p-2.5 sm:p-3 border border-slate-700 font-bold text-amber-300">{row.lv}</td>
                                                <td className="p-2.5 sm:p-3 border border-slate-700 text-center font-extrabold text-rose-400">{row.atk}</td>
                                                <td className="p-2.5 sm:p-3 border border-slate-700 text-xs sm:text-sm font-medium text-slate-100">{row.armor}</td>
                                                <td className="p-2.5 sm:p-3 border border-slate-700 text-xs sm:text-sm font-semibold text-emerald-300">{row.pot}</td>
                                                <td className="p-2.5 sm:p-3 border border-slate-700 text-xs sm:text-sm font-mono font-bold text-yellow-300 text-right">{row.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 2. 잠재능력 2열 그리드 (🏆 장비 단계별 잠재능력 & 🔮 단계별 잠재능력 실측 옵션) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            {/* 좌측: 🏆 장비 단계별 잠재능력 */}
                            <div className="flex flex-col">
                                <h3 className="font-bold text-slate-100 mb-3 text-base flex items-center gap-1.5">
                                    <span>🏆</span>
                                    <span>장비 단계별 잠재능력</span>
                                </h3>
                                <div className="overflow-x-auto -mx-1 flex-1">
                                    <table className="w-full text-left border-collapse min-w-[300px] text-xs sm:text-sm shadow-md">
                                        <thead>
                                            <tr className="bg-slate-800 text-slate-100 border-b border-slate-600">
                                                <th className="p-2 sm:p-2.5 border border-slate-700 font-bold text-white">장비 단계</th>
                                                <th className="p-2 sm:p-2.5 border border-slate-700 font-bold text-amber-300">착용 레벨</th>
                                                <th className="p-2 sm:p-2.5 border border-slate-700 font-bold text-sky-200">잠재 등급</th>
                                                <th className="p-2 sm:p-2.5 border border-slate-700 font-bold text-emerald-300 text-center">옵션 수</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-white">
                                            {[
                                                { stage: '1단계', potential: '-', optionCount: '-', levelLimit: '제한 없음' },
                                                { stage: '2단계', potential: '레어', optionCount: '1종', levelLimit: 'Lv. 6 이상' },
                                                { stage: '3단계', potential: '레어', optionCount: '2종', levelLimit: 'Lv. 12 이상' },
                                                { stage: '4단계', potential: '에픽', optionCount: '2종', levelLimit: 'Lv. 22 이상' },
                                                { stage: '5단계', potential: '에픽', optionCount: '2종', levelLimit: 'Lv. 28 이상' },
                                                { stage: '6단계', potential: '유니크', optionCount: '2종', levelLimit: '미확인' },
                                                { stage: '7단계', potential: '레전드리', optionCount: '2종', levelLimit: '미확인' },
                                                { stage: '8단계', potential: '레전드리', optionCount: '3종', levelLimit: '미확인' },
                                            ].map((g, i) => {
                                                const potentialColor: Record<string, string> = {
                                                    '-': 'text-slate-400',
                                                    '레어': 'text-sky-300 font-bold',
                                                    '에픽': 'text-purple-300 font-bold',
                                                    '유니크': 'text-yellow-300 font-bold',
                                                    '레전드리': 'text-orange-400 font-bold',
                                                };
                                                return (
                                                    <tr key={g.stage} className={i % 2 === 0 ? 'bg-slate-900/60' : 'bg-slate-950/60'}>
                                                        <td className="p-2 sm:p-2.5 border border-slate-700 font-extrabold text-white">{g.stage}</td>
                                                        <td className="p-2 sm:p-2.5 border border-slate-700 font-bold text-amber-300">{g.levelLimit}</td>
                                                        <td className={`p-2 sm:p-2.5 border border-slate-700 ${potentialColor[g.potential]}`}>{g.potential}</td>
                                                        <td className="p-2 sm:p-2.5 border border-slate-700 text-center font-bold text-emerald-300">{g.optionCount}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                     </table>
                                </div>
                            </div>

                            {/* 우측: 🔮 단계별 잠재능력 실측 옵션 (공통) */}
                            <div className="flex flex-col">
                                <h3 className="font-bold text-slate-100 mb-3 text-base flex items-center gap-1.5">
                                    <span>🔮</span>
                                    <span>단계별 잠재능력 실측 옵션 (공통)</span>
                                </h3>
                                <div className="overflow-x-auto -mx-1 flex-1">
                                    <table className="w-full text-left border-collapse min-w-[300px] text-xs sm:text-sm shadow-md">
                                        <thead>
                                            <tr className="bg-slate-800 text-slate-100 border-b border-slate-600">
                                                <th className="p-2 sm:p-2.5 border border-slate-700 font-bold text-white">단계</th>
                                                <th className="p-2 sm:p-2.5 border border-slate-700 font-bold text-rose-300 text-center">공/마</th>
                                                <th className="p-2 sm:p-2.5 border border-slate-700 font-bold text-sky-200">방어력</th>
                                                <th className="p-2 sm:p-2.5 border border-slate-700 font-bold text-emerald-300">최대 HP</th>
                                                <th className="p-2 sm:p-2.5 border border-slate-700 font-bold text-yellow-300 text-center">크확</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-white">
                                            {[
                                                { stage: '2단계 (레어)', atk: '+5', def: '+10', hp: '+75', crit: '+3%' },
                                                { stage: '3단계 (레어)', atk: '+5', def: '+10', hp: '+75', crit: '+3%' },
                                                { stage: '4단계 (에픽)', atk: '+9 / +2%', def: '+20', hp: '+170', crit: '+3%' },
                                                { stage: '5단계 (에픽 추정)', atk: '+9 / +2%', def: '+20', hp: '+170', crit: '+3%' },
                                                { stage: '6단계~', atk: '미확인', def: '미확인', hp: '미확인', crit: '미확인' },
                                            ].map((row, idx) => (
                                                <tr key={row.stage} className={idx % 2 === 0 ? 'bg-slate-900/60' : 'bg-slate-950/60'}>
                                                    <td className="p-2 sm:p-2.5 border border-slate-700 font-extrabold text-white">{row.stage}</td>
                                                    <td className="p-2 sm:p-2.5 border border-slate-700 text-center font-extrabold text-rose-400">{row.atk}</td>
                                                    <td className="p-2 sm:p-2.5 border border-slate-700 font-medium text-slate-100">{row.def}</td>
                                                    <td className="p-2 sm:p-2.5 border border-slate-700 font-semibold text-emerald-300">{row.hp}</td>
                                                    <td className="p-2 sm:p-2.5 border border-slate-700 text-center font-bold text-yellow-300">{row.crit}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* 3. 🎲 잠재능력 실측 핵심 데이터 & 규칙 (전체 너비 하단 배너) */}
                        <div className="bg-slate-900/80 p-4 sm:p-5 rounded-xl border border-purple-500/40 text-xs sm:text-sm text-slate-200 space-y-2.5 leading-relaxed shadow-lg">
                            <p className="font-bold text-purple-300 text-sm sm:text-base mb-2 flex items-center gap-1.5">
                                <span>🎲</span>
                                <span>잠재능력 실측 핵심 데이터 & 규칙</span>
                            </p>
                            <p className="text-slate-200">※ 잠재능력은 무기와 방어구 구분 없이 동일하게 적용됩니다. <span className="text-slate-400">(예: 방어구에서도 공격력/마력 획득 가능)</span></p>
                            <p className="text-slate-200">※ <strong className="text-yellow-300 font-bold">공격력과 마력 옵션은 별도로 존재</strong>합니다. <span className="text-slate-400">(전사/궁수는 <strong className="text-white">공격력</strong>, 마법사는 <strong className="text-purple-300">마력</strong> 유효)</span></p>
                            <p className="text-slate-200">※ <strong className="text-emerald-300 font-bold">공/마+%는 에픽 무기 잠재능력에서만 뜨는 것으로 확인</strong> / <strong className="text-sky-300 font-bold">방어구에서는 크확+2%까지 뜨는 것으로 확인</strong></p>
                        </div>


                        {/* 잠재능력 재설정 */}
                        <div className="bg-slate-950/60 border border-slate-700/50 rounded-xl p-5">
                            <h3 className="font-bold text-purple-300 mb-3 text-base flex items-center gap-1.5">🎲 잠재능력 재설정 (훈련용 큐브)</h3>
                            <ul className="space-y-2 text-slate-200 text-sm list-disc list-inside mb-4 leading-relaxed">
                                <li>훈련용 큐브를 사용하여 울티마 장비 잠재능력 재설정 가능</li>
                                <li>잠재능력 재설정 탭에서 <strong>개당 20,000 골드</strong>를 사용하여 훈련용 큐브 구매 가능</li>
                                <li className="text-sm font-bold text-amber-300 mt-2 mb-2 bg-amber-950/40 p-2 rounded border border-amber-500/20 list-none -ml-4 flex items-center gap-1.5 shadow-sm">
                                    <span>🚨</span>
                                    <span>훈련용 큐브는 <strong className="text-white underline underline-offset-4 decoration-amber-500">접속 상태에서만</strong> 획득 가능합니다 (전투 중 드롭).</span>
                                </li>
                                <li>재설정 결과에서 <strong className="text-white">전/후 선택</strong> 후 적용 가능</li>
                                <li>잠재능력 재설정 시 <strong className="text-red-400">등급은 상승하지 않음</strong></li>
                                <li>
                                    <strong className="text-yellow-300">💡 훈련용 큐브 절약 팁</strong>: 
                                    3단계 아이템부터는 잠재능력이 <strong className="text-white">2줄</strong>이 나오기 때문에, 이때 큐브로 2줄 유효 옵션을 뽑는 것이 핵심입니다. 
                                    하지만 생각보다 원하는 옵션이 잘 안 나와 큐브 소모량이 매우 큽니다. 따라서 <strong className="text-white">2단계 아이템 구간에서는 최대한 큐브 사용을 자제하고 아껴두는 것</strong>이 훨씬 유리합니다.
                                </li>
                            </ul>
                            
                            {/* 잠재능력 재설정 스크린샷 추가 */}
                            <div className="relative w-full mx-auto my-4 rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                <Image 
                                    src="/images/ultima-squad-potential.png" 
                                    alt="잠재능력 재설정 UI 화면" 
                                    width={920}
                                    height={600}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>

                            <div>
                                <p className="text-slate-200 text-sm font-semibold mb-2">✅ 잠재능력 옵션 목록</p>
                                <div className="flex flex-wrap gap-2">
                                    {potentialOptions.map((opt) => (
                                        <span key={opt} className="px-3 py-1 bg-purple-950/30 border border-purple-800/30 rounded-md text-purple-300 text-sm">
                                            {opt}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 합성 & 분해 */}
                        <div className="space-y-6">
                            {/* 장비 합성 */}
                            <div className="bg-slate-950/60 border border-emerald-500/30 rounded-xl p-5">
                                <h3 className="font-bold text-emerald-300 mb-3 text-base flex items-center gap-1.5">
                                    <span>⚗️</span>
                                    <span>장비 합성</span>
                                </h3>
                                
                                {/* 장비 합성 스크린샷 */}
                                <div className="relative w-full mx-auto my-4 rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                    <Image 
                                        src="/images/ultima-squad-synthesis.png" 
                                        alt="장비 합성 UI 화면" 
                                        width={920}
                                        height={600}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </div>

                                <p className="text-slate-100 text-base sm:text-lg font-semibold leading-relaxed mt-4 bg-emerald-950/20 p-3 rounded-lg border border-emerald-800/20">
                                    같은 단계의 장비 <strong className="text-white underline underline-offset-4 decoration-emerald-500">9개</strong>를 합성하여 <strong className="text-emerald-400">1단계 상위 장비</strong> 1개 획득.<br />
                                    단, <strong className="text-white">8단계 장비 9개</strong> 합성 시 8단계 장비 1개 획득.
                                </p>
                            </div>

                            {/* 장비 분해 */}
                            <div className="bg-slate-950/60 border border-orange-500/30 rounded-xl p-5">
                                <h3 className="font-bold text-orange-300 mb-3 text-base flex items-center gap-1.5">
                                    <span>🔨</span>
                                    <span>장비 분해</span>
                                </h3>

                                {/* 장비 분해 스크린샷 */}
                                <div className="relative w-full mx-auto my-4 rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                    <Image 
                                        src="/images/ultima-squad-disassembly.png" 
                                        alt="장비 분해 UI 화면" 
                                        width={920}
                                        height={600}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </div>

                                <div className="text-slate-100 text-base sm:text-lg font-semibold leading-relaxed mt-4 bg-orange-950/20 p-4 rounded-lg border border-orange-800/20">
                                    <p className="mb-2">장비를 분해하여 <strong className="text-orange-400">골드 획득</strong>. 장비의 단계에 따라 획득 골드 양이 달라집니다.</p>
                                    <div className="bg-slate-900/60 p-4 rounded border border-orange-500/20 text-base font-normal text-slate-200 space-y-2 mt-2">
                                        <p className="text-sm text-slate-400 mb-2">※ 직접 플레이를 통해 확인한 단계별 분해 획득 골드 정보:</p>
                                        <p>🪙 <strong className="text-white">1단계</strong> 분해: <span className="text-orange-300 font-bold">660 골드</span></p>
                                        <p>🪙 <strong className="text-white">2단계</strong> 분해: <span className="text-orange-300 font-bold">1,400 골드</span></p>
                                        <p>🪙 <strong className="text-white">3단계</strong> 분해: <span className="text-orange-300 font-bold">2,970 골드</span></p>
                                        <p>🪙 <strong className="text-white">4단계</strong> 분해: <span className="text-orange-300 font-bold">6,300 골드</span></p>
                                        <p>🪙 <strong className="text-white">5단계</strong> 분해: <span className="text-orange-300 font-bold">13,370 골드</span></p>
                                    </div>
                                </div>
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
                            <div className="bg-slate-950/60 border border-emerald-500/30 rounded-xl p-5">
                                <h3 className="font-bold text-emerald-300 mb-2 text-base">📊 스테이지 구조</h3>
                                <ul className="text-slate-200 text-sm space-y-2 list-disc list-inside leading-relaxed">
                                    <li><strong>일반 모드 + 카오스 모드</strong> 구분</li>
                                    <li>각 모드에 <strong>3개 지역</strong>, 각 지역 <strong>10개 스테이지</strong></li>
                                    <li>1~9 스테이지: 몬스터 무리 + 보스 등장</li>
                                    <li>10 스테이지: <strong>보스 스테이지</strong> (1종만 등장)</li>
                                </ul>
                            </div>
                            <div className="bg-slate-950/60 border border-blue-500/30 rounded-xl p-5">
                                <h3 className="font-bold text-blue-300 mb-2 text-base">⚡ 클리어 조건</h3>
                                <ul className="text-slate-200 text-sm space-y-2 list-disc list-inside leading-relaxed">
                                    <li>용병 <strong>1명 이상 생존</strong> 상태로 모든 몬스터 처치 시 클리어</li>
                                    <li>클리어 시 <strong>자동으로 다음 스테이지</strong>로 이동</li>
                                    <li>전멸 시 <strong>이전에 클리어한 스테이지 -1 단계</strong>로 자동 이동 후 반복</li>
                                    <li>보스 스테이지는 <strong>최초 1회</strong>만 클리어 가능, 재입장 불가</li>
                                </ul>
                            </div>
                        </div>

                        {/* 스테이지 맵 스크린샷 추가 */}
                        <div className="relative w-full mx-auto my-4 rounded-lg overflow-hidden border border-slate-800 shadow-md">
                            <Image 
                                src="/images/ultima-squad-map.jpg" 
                                alt="스테이지 맵 UI 화면" 
                                width={920}
                                height={600}
                                style={{ width: '100%', height: 'auto' }}
                            />
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

                        <div className="space-y-6">
                            {/* 전투 기본 규칙 */}
                            <div className="bg-slate-950/60 border border-red-500/30 rounded-xl p-5">
                                <h3 className="font-bold text-red-300 mb-3 text-base flex items-center gap-1.5">
                                    <span>⚔️</span>
                                    <span>전투 기본 규칙</span>
                                </h3>

                                {/* 전투 기본 규칙 스크린샷 */}
                                <div className="relative w-full mx-auto my-4 rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                    <Image 
                                        src="/images/ultima-squad-combat.png" 
                                        alt="전투 기본 화면" 
                                        width={920}
                                        height={600}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </div>

                                <ul className="text-slate-200 text-sm space-y-2 list-disc list-inside leading-relaxed mt-4">
                                    <li>용병 배치 시 <strong className="text-white">자동으로 전투 시작</strong></li>
                                    <li>전투 불능 시 <strong className="text-white">자동으로 부활</strong>
                                        <ul className="mt-1 ml-4 space-y-0.5 list-none text-slate-400 text-xs">
                                            <li>→ <strong className="text-sky-300">전장에 2명 이상</strong> 있을 시 부활 가능</li>
                                            <li>→ 체력이 <strong className="text-yellow-300">일부만 회복</strong>된 상태로 부활</li>
                                        </ul>
                                    </li>
                                    <li>마지막 용병 전투 불능 = <strong className="text-red-400">스테이지 클리어 실패</strong></li>
                                    <li>반복 플레이 버튼으로 <strong className="text-white">같은 스테이지 반복 가능</strong></li>
                                </ul>
                            </div>

                            {/* 몬스터 처치 획득 골드 정보 */}
                            <div className="bg-slate-950/60 border border-yellow-500/30 rounded-xl p-5">
                                <h3 className="font-bold text-yellow-300 mb-2 text-base flex items-center gap-1.5">
                                    <span>🪙</span>
                                    <span>몬스터 처치 시 획득 골드 정보 (1지역 기준)</span>
                                </h3>
                                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                                    ※ 직접 플레이하여 확인해주신 실측 데이터를 기반으로, [골드 획득량 증가] 배율을 역산하여 정리한 기본 골드 수치입니다.<br />
                                    ※ 유틸리티의 [골드 획득량 증가] 레벨을 올리면 기본 획득 골드에 곱연산으로 반영됩니다.
                                </p>
                                <div className="overflow-x-auto -mx-1">
                                    <table className="w-full text-left border-collapse min-w-[300px] text-[11px] sm:text-sm">
                                        <thead>
                                                <tr className="bg-yellow-950/20 text-yellow-200 text-center">
                                                    <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap text-left">스테이지</th>
                                                    <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap">기본</th>
                                                    <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap">+5%</th>
                                                    <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap">+10%</th>
                                                    <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap">+20%</th>
                                                    <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap">+25%</th>
                                                    <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-bold whitespace-nowrap text-yellow-300 bg-yellow-900/40">+30% (최대)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-slate-300 divide-y divide-slate-800/50">
                                                {[
                                                    { stage: '1-1', base: '10G', p5: '10G', p10: '11G', p20: '12G', p25: '12G', p30: '13G' },
                                                    { stage: '1-2', base: '30G', p5: '31G', p10: '33G', p20: '36G', p25: '37G', p30: '39G' },
                                                    { stage: '1-3', base: '50G', p5: '52G', p10: '55G', p20: '60G', p25: '62G', p30: '65G' },
                                                    { stage: '1-4', base: '70G', p5: '73G', p10: '77G', p20: '84G', p25: '87G', p30: '91G' },
                                                    { stage: '1-5', base: '90G', p5: '94G', p10: '99G', p20: '108G', p25: '112G', p30: '117G' },
                                                    { stage: '1-6', base: '110G', p5: '115G', p10: '121G', p20: '132G', p25: '137G', p30: '143G' },
                                                    { stage: '1-7', base: '130G', p5: '136G', p10: '143G', p20: '156G', p25: '162G', p30: '169G' },
                                                    { stage: '1-8', base: '150G', p5: '157G', p10: '165G', p20: '180G', p25: '187G', p30: '195G' },
                                                    { stage: '1-9', base: '170G', p5: '178G', p10: '187G', p20: '204G', p25: '212G', p30: '221G' },
                                                ].map((row, idx) => (
                                                    <tr key={row.stage} className={idx % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-950/30'}>
                                                        <td className="p-1.5 sm:p-3 border border-slate-700 font-bold text-slate-200">{row.stage}</td>
                                                        <td className="p-1.5 sm:p-3 border border-slate-700 font-semibold text-slate-100 text-center">{row.base}</td>
                                                        <td className="p-1.5 sm:p-3 border border-slate-700 font-semibold text-slate-300 text-center">{row.p5}</td>
                                                        <td className="p-1.5 sm:p-3 border border-slate-700 font-semibold text-slate-300 text-center">{row.p10}</td>
                                                        <td className="p-1.5 sm:p-3 border border-slate-700 font-semibold text-slate-300 text-center">{row.p20}</td>
                                                        <td className="p-1.5 sm:p-3 border border-slate-700 font-semibold text-slate-300 text-center">{row.p25}</td>
                                                        <td className="p-1.5 sm:p-3 border border-slate-700 font-bold text-yellow-300 text-center bg-yellow-950/30">{row.p30}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                    </table>
                                </div>

                                {/* 2지역 골드 정보 */}
                                <h4 className="font-bold text-yellow-400 mt-6 mb-2 text-sm flex items-center gap-1">
                                    <span>🪙</span>
                                    <span>2지역 몬스터 처치 골드 정보 (실측)</span>
                                </h4>
                                <div className="overflow-x-auto -mx-1">
                                    <table className="w-full text-left border-collapse min-w-[300px] text-[11px] sm:text-sm">
                                        <thead>
                                            <tr className="bg-yellow-950/20 text-yellow-200 text-center">
                                                <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap text-left">스테이지</th>
                                                <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap">기본</th>
                                                <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap">+5%</th>
                                                <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap">+10%</th>
                                                <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap">+20%</th>
                                                <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap">+25%</th>
                                                <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-bold whitespace-nowrap text-yellow-300 bg-yellow-900/40">+30% (최대)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-300 divide-y divide-slate-800/50">
                                            {[
                                                { stage: '2-1', base: '400G', p5: '420G', p10: '440G', p20: '480G', p25: '500G', p30: '520G' },
                                                { stage: '2-2', base: '430G', p5: '451G', p10: '473G', p20: '516G', p25: '537G', p30: '559G' },
                                                { stage: '2-3', base: '460G', p5: '483G', p10: '506G', p20: '552G', p25: '575G', p30: '598G' },
                                                { stage: '2-4', base: '490G', p5: '514G', p10: '539G', p20: '588G', p25: '612G', p30: '637G' },
                                                { stage: '2-5', base: '520G', p5: '546G', p10: '572G', p20: '624G', p25: '650G', p30: '676G' },
                                                { stage: '2-6', base: '550G', p5: '577G', p10: '605G', p20: '660G', p25: '687G', p30: '715G' },
                                                { stage: '2-7', base: '580G', p5: '609G', p10: '638G', p20: '696G', p25: '725G', p30: '754G' },
                                                { stage: '2-8', base: '610G', p5: '640G', p10: '671G', p20: '732G', p25: '762G', p30: '793G' },
                                                { stage: '2-9', base: '640G', p5: '672G', p10: '704G', p20: '768G', p25: '800G', p30: '832G' },
                                            ].map((row, idx) => (
                                                <tr key={row.stage} className={idx % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-950/30'}>
                                                    <td className="p-1.5 sm:p-3 border border-slate-700 font-bold text-slate-200">{row.stage}</td>
                                                    <td className="p-1.5 sm:p-3 border border-slate-700 font-semibold text-slate-100 text-center">{row.base}</td>
                                                    <td className="p-1.5 sm:p-3 border border-slate-700 font-semibold text-slate-300 text-center">{row.p5}</td>
                                                    <td className="p-1.5 sm:p-3 border border-slate-700 font-semibold text-slate-300 text-center">{row.p10}</td>
                                                    <td className="p-1.5 sm:p-3 border border-slate-700 font-semibold text-slate-300 text-center">{row.p20}</td>
                                                    <td className="p-1.5 sm:p-3 border border-slate-700 font-semibold text-slate-300 text-center">{row.p25}</td>
                                                    <td className="p-1.5 sm:p-3 border border-slate-700 font-bold text-yellow-300 text-center bg-yellow-950/30">{row.p30}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* 3지역 골드 정보 */}
                                <h4 className="font-bold text-yellow-400 mt-6 mb-2 text-sm flex items-center gap-1">
                                    <span>🪙</span>
                                    <span>3지역 몬스터 처치 골드 정보 (실측)</span>
                                </h4>
                                <div className="overflow-x-auto -mx-1">
                                    <table className="w-full text-left border-collapse min-w-[300px] text-[11px] sm:text-sm">
                                        <thead>
                                            <tr className="bg-yellow-950/20 text-yellow-200 text-center">
                                                <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap text-left">스테이지</th>
                                                <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap">기본</th>
                                                <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap">+5%</th>
                                                <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap">+10%</th>
                                                <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap">+20%</th>
                                                <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-semibold whitespace-nowrap">+25%</th>
                                                <th className="p-1.5 sm:p-3 border border-yellow-800/20 font-bold whitespace-nowrap text-yellow-300 bg-yellow-900/40">+30% (최대)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-slate-300 divide-y divide-slate-800/50">
                                            {[
                                                { stage: '3-1', base: '700G', p5: '735G', p10: '770G', p20: '840G', p25: '875G', p30: '910G' },
                                                { stage: '3-2', base: '750G', p5: '788G', p10: '825G', p20: '900G', p25: '938G', p30: '975G' },
                                            ].map((row, idx) => (
                                                <tr key={row.stage} className={idx % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-950/30'}>
                                                    <td className="p-1.5 sm:p-3 border border-slate-700 font-bold text-slate-200">{row.stage}</td>
                                                    <td className="p-1.5 sm:p-3 border border-slate-700 font-semibold text-slate-100 text-center">{row.base}</td>
                                                    <td className="p-1.5 sm:p-3 border border-slate-700 font-semibold text-slate-300 text-center">{row.p5}</td>
                                                    <td className="p-1.5 sm:p-3 border border-slate-700 font-semibold text-slate-300 text-center">{row.p10}</td>
                                                    <td className="p-1.5 sm:p-3 border border-slate-700 font-semibold text-slate-300 text-center">{row.p20}</td>
                                                    <td className="p-1.5 sm:p-3 border border-slate-700 font-semibold text-yellow-400 font-bold text-center bg-yellow-950/20">{row.p25}</td>
                                                    <td className="p-1.5 sm:p-3 border border-slate-700 font-bold text-yellow-300 text-center bg-yellow-950/30">{row.p30}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* 에스페시아 상자 */}
                            <div className="bg-slate-950/60 border border-orange-500/30 rounded-xl p-5">
                                <h3 className="font-bold text-orange-300 mb-3 text-base flex items-center gap-1.5">
                                    <span>📦</span>
                                    <span>에스페시아 상자</span>
                                </h3>

                                {/* 에스페시아 상자 스크린샷 */}
                                <div className="relative w-full mx-auto my-4 rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                    <Image 
                                        src="/images/ultima-squad-especia.png" 
                                        alt="에스페시아 상자 소환 화면" 
                                        width={920}
                                        height={600}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </div>

                                <ul className="text-slate-200 text-sm space-y-2 list-disc list-inside leading-relaxed mt-4 mb-4">
                                    <li><strong className="text-white underline underline-offset-4 decoration-orange-500">매일 자정 기준 1회</strong> 소환 가능</li>
                                    <li>용병들이 공격하면 레어~레전드리로 성장</li>
                                    <li>처치 시: EXP, 장비, 훈련용 큐브, 골드 획득</li>
                                    <li><strong className="text-yellow-300">★ 높은 스테이지일수록 더 많은 경험치·골드 획득</strong></li>
                                </ul>

                                <div className="bg-amber-950/20 border border-amber-700/30 rounded-xl p-4">
                                    <p className="text-amber-300 text-sm font-bold flex items-center gap-1.5 mb-1.5">
                                        <span>⚠️</span>
                                        <span>에스페시아 상자 소환 불가 상황</span>
                                    </p>
                                    <ul className="text-slate-200 text-sm list-disc list-inside space-y-1 leading-relaxed">
                                        <li>각 지역의 10번째 <strong className="text-white">보스 스테이지</strong>에서는 소환 불가</li>
                                        <li>각 스테이지 마지막 <strong className="text-white">보스 등장 직전</strong>에는 소환 불가</li>
                                    </ul>
                                </div>

                                <div className="bg-orange-950/20 border border-orange-500/30 rounded-xl p-4 mt-4 space-y-6">
                                    <div className="border-b border-orange-500/10 pb-4">
                                        <p className="text-orange-300 text-sm font-bold flex items-center gap-1.5 mb-2">
                                            <span>📈</span>
                                            <span>에스페시아 상자 처치 경험치 획득 실측</span>
                                        </p>
                                        <p className="text-xs text-slate-400 mb-1 leading-relaxed">
                                            ※ 직접 플레이하며 확인한 에스페시아 상자 처치 전/후 경험치 획득량 실측 데이터입니다. 에스페시아 상자는 타격 시 랜덤한 등급(레어/에픽/유니크/레전드리)으로 성장하며, 유니크나 레전드리 등급으로 처치 시 아래 에픽 기준 실측치보다 더 많은 경험치를 획득할 수 있습니다.
                                        </p>
                                    </div>

                                    {/* 초기 생성 시 실측 */}
                                    <div className="space-y-3">
                                        <p className="text-yellow-400 text-xs font-bold">📊 에스페시아 상자 생성 초기 실측 (에픽 등급)</p>
                                        <ul className="text-slate-200 text-sm list-disc list-inside space-y-1 leading-relaxed">
                                            <li><strong>전사 Lv.1 (0%)</strong> ➔ <strong>Lv.3 15%</strong> (총 <strong className="text-yellow-300">+215%</strong> 분량의 경험치 단숨에 획득!)</li>
                                        </ul>
                                        <div className="relative w-full max-w-[450px] mx-auto rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                            <Image 
                                                src="/images/ultima-squad-especia-exp-0.png" 
                                                alt="에스페시아 상자 초기 처치 경험치 변화 실측" 
                                                width={450}
                                                height={180}
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        </div>
                                    </div>

                                    {/* 1차 실측 */}
                                    <div className="space-y-3 pt-4 border-t border-slate-800/60">
                                        <p className="text-yellow-400 text-xs font-bold">📊 에스페시아 상자 1차 실측 (에픽 등급 / 초반 구간)</p>
                                        <ul className="text-slate-200 text-sm list-disc list-inside space-y-1 leading-relaxed">
                                            <li><strong>전사 Lv.7</strong>: 69% ➔ Lv.8 41% (<strong className="text-yellow-300">+72%</strong> 획득)</li>
                                        </ul>
                                        <div className="relative w-full max-w-[320px] mx-auto rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                            <Image 
                                                src="/images/ultima-squad-especia-exp-1.png" 
                                                alt="에스페시아 상자 1차 처치 경험치 변화 실측" 
                                                width={320}
                                                height={120}
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        </div>
                                    </div>

                                    {/* 2차 실측 */}
                                    <div className="space-y-3 pt-4 border-t border-slate-800/60">
                                        <p className="text-yellow-400 text-xs font-bold">📊 에스페시아 상자 2차 실측 (에픽 등급 / 후반 구간)</p>
                                        <ul className="text-slate-200 text-sm list-disc list-inside space-y-1 leading-relaxed">
                                            <li><strong>전사 Lv.18</strong>: 31% ➔ 81% (<strong className="text-yellow-300">+50%</strong> 획득)</li>
                                            <li><strong>궁수 Lv.17</strong>: 35% ➔ 90% (<strong className="text-yellow-300">+55%</strong> 획득)</li>
                                        </ul>
                                        <div className="relative w-full max-w-[450px] mx-auto rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                            <Image 
                                                src="/images/ultima-squad-especia-exp-2.png" 
                                                alt="에스페시아 상자 2차 처치 경험치 변화 실측" 
                                                width={450}
                                                height={150}
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        </div>
                                    </div>

                                    {/* 3차 실측 */}
                                    <div className="space-y-3 pt-4 border-t border-slate-800/60">
                                        <p className="text-yellow-400 text-xs font-bold">📊 에스페시아 상자 3차 실측 (에픽 등급 / Lv.20 이상 극후반 구간)</p>
                                        <ul className="text-slate-200 text-sm list-disc list-inside space-y-1 leading-relaxed">
                                            <li><strong>전사 Lv.20</strong>: 76% ➔ <strong>Lv.21 20%</strong> (<strong className="text-yellow-300">+44%</strong> 획득)</li>
                                            <li><strong>궁수 Lv.20</strong>: 1% ➔ 46% (<strong className="text-yellow-300">+45%</strong> 획득)</li>
                                        </ul>
                                        <div className="relative w-full max-w-[450px] mx-auto rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                            <Image 
                                                src="/images/ultima-squad-especia-exp-3.png" 
                                                alt="에스페시아 상자 3차 처치 경험치 변화 실측" 
                                                width={450}
                                                height={150}
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-2 text-slate-300 text-xs leading-relaxed border-t border-slate-800/60">
                                        💡 <strong className="text-orange-400">결론:</strong> 20레벨 이상의 고레벨 구간에서도 단 1회 처치만으로 캐릭터당 45% 내외의 압도적인 경험치를 획득할 수 있으므로, 매일 빼놓지 않고 진행하는 것이 빠른 레벨업의 핵심입니다.
                                    </div>
                                </div>
                            </div>
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

                        {/* 유틸리티 강화 UI 스크린샷 추가 */}
                        <div className="relative w-full mx-auto my-4 rounded-lg overflow-hidden border border-slate-800 shadow-md">
                            <Image 
                                src="/images/ultima-squad-utility.png" 
                                alt="유틸리티 강화 UI 화면" 
                                width={920}
                                height={600}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>

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
                                                    <span className={`${c.badge} px-2 py-0.5 rounded-full font-mono font-bold`}>{item.price} G</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 인벤토리 확장 */}
                        <div className="bg-slate-950/60 border border-blue-500/30 rounded-xl p-5">
                            <h3 className="font-bold text-blue-300 mb-2 text-base flex items-center gap-1.5">
                                <span>📦</span>
                                <span>인벤토리 슬롯 확장 비용 (골드 소모)</span>
                            </h3>

                            {/* 구간별 확장 방식 경고 상자 */}
                            <div className="bg-blue-950/20 border border-blue-500/30 rounded-lg p-3 sm:p-4 mb-4">
                                <p className="text-blue-300 text-sm font-bold flex items-center gap-1.5 mb-1">
                                    <span>⚠️</span>
                                    <span>주의사항 (확장 방식)</span>
                                </p>
                                <p className="text-slate-200 text-sm leading-relaxed">
                                    해당 가격은 일시불 지불로 구간 전체가 한번에 확장되는 가격이 아니라, <strong className="text-white underline underline-offset-4 decoration-blue-500">해당 구간 내에서 슬롯 1칸을 확장할 때마다 소모되는 개당 비용</strong>입니다.<br />
                                    <span className="text-xs text-slate-400 mt-1 block">(예: 11칸째 확장 시 3만 골드 소모, 12칸째 확장 시에도 동일하게 3만 골드 소모)</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    { range: '11~29칸', price: '10,000' },
                                    { range: '30~49칸', price: '60,000' },
                                    { range: '50~69칸', price: '150,000' },
                                    { range: '70~99칸', price: '200,000' },
                                    { range: '100~129칸', price: '300,000' },
                                    { range: '130~169칸', price: '400,000' },
                                    { range: '170~209칸', price: '500,000' },
                                    { range: '210~256칸', price: '1,500,000' },
                                ].map((inv) => (
                                    <div key={inv.range} className="bg-slate-900/40 border border-slate-700/30 rounded-xl px-3 py-3 text-center">
                                        <p className="text-slate-200 text-sm font-semibold">{inv.range}</p>
                                        <p className="text-yellow-400 text-sm font-bold font-mono mt-1">{inv.price} G</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 오프라인 보상 효율 분석 */}
                        <div className="bg-slate-950/60 border border-indigo-500/30 rounded-xl p-5 mt-4">
                            <h3 className="font-bold text-indigo-300 mb-2 text-base flex items-center gap-1.5">
                                <span>⏰</span>
                                <span>오프라인 보상 효율 분석 (시간당 수급량)</span>
                            </h3>
                            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                                ※ 오프라인 상태일 때 누적되는 경험치와 골드의 시간당 효율을 직접 실측한 분석 데이터입니다.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                                {/* 케이스 1 */}
                                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-3">
                                    <div className="text-sm font-bold text-slate-100 flex items-center justify-between">
                                        <span>📊 오프라인 Case A (초반 구간)</span>
                                        <span className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">전사 L.5 | 골획증 0%</span>
                                    </div>
                                    <div className="relative w-full rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                        <Image 
                                            src="/images/ultima-squad-offline-2.png" 
                                            alt="오프라인 보상 결과 2" 
                                            width={400}
                                            height={300}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </div>
                                    <div className="space-y-1.5 text-xs sm:text-sm">
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">오프라인 누적 시간</span>
                                            <span className="text-slate-200 font-bold">5시간 24분 (324분)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">골드 획득량 증가</span>
                                            <span className="text-slate-200 font-bold">0% (미강화)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">획득 골드</span>
                                            <span className="text-yellow-400 font-mono font-bold">421,591 G <span className="text-slate-500 text-xs font-normal">(시간당 78,072 G)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">전사 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.5 ➔ Lv.7 (+165%) <span className="text-slate-500 text-xs font-normal">(시간당 30.5%)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3">
                                            <span className="text-slate-400 shrink-0">궁수 경험치</span>
                                            <span className="text-slate-500">-</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 케이스 2 */}
                                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-3">
                                    <div className="text-sm font-bold text-slate-100 flex items-center justify-between">
                                        <span>📊 오프라인 Case B (중반 구간)</span>
                                        <span className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">전사 L.9 + 궁수 L.2 | 골획증 10%</span>
                                    </div>
                                    <div className="relative w-full rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                        <Image 
                                            src="/images/ultima-squad-offline-1.png" 
                                            alt="오프라인 보상 결과 1" 
                                            width={400}
                                            height={300}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </div>
                                    <div className="space-y-1.5 text-xs sm:text-sm">
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">오프라인 누적 시간</span>
                                            <span className="text-slate-200 font-bold">5시간 10분 (310분)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">골드 획득량 증가</span>
                                            <span className="text-slate-200 font-bold">10% (+2레벨)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">획득 골드</span>
                                            <span className="text-yellow-400 font-mono font-bold">622,240 G <span className="text-slate-200 text-xs font-semibold">(시간당 120,433 G)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">전사 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.9 ➔ Lv.10 (+117%) <span className="text-slate-200 text-xs font-semibold">(시간당 22.6%)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3">
                                            <span className="text-slate-400 shrink-0">궁수 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.2 ➔ Lv.6 (+424%) <span className="text-slate-200 text-xs font-semibold">(시간당 82.0%)</span></span>
                                        </div>
                                    </div>
                                </div>

                                {/* 케이스 3 */}
                                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-3">
                                    <div className="text-sm font-bold text-slate-100 flex items-center justify-between">
                                        <span>📊 오프라인 Case C (후반 구간)</span>
                                        <span className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">전사 L.10 + 궁수 L.7 | 골획증 10%</span>
                                    </div>
                                    <div className="relative w-full rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                        <Image 
                                            src="/images/ultima-squad-offline-3.png" 
                                            alt="오프라인 보상 결과 3" 
                                            width={400}
                                            height={300}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </div>
                                    <div className="space-y-1.5 text-xs sm:text-sm">
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">오프라인 누적 시간</span>
                                            <span className="text-slate-200 font-bold">6시간 46분 (406분)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">골드 획득량 증가</span>
                                            <span className="text-slate-200 font-bold">10% (+2레벨)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">획득 골드</span>
                                            <span className="text-yellow-400 font-mono font-bold">947,340 G <span className="text-slate-200 text-xs font-semibold">(시간당 ~140,000 G)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">전사 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.10 ➔ Lv.11 (+129%) <span className="text-slate-200 text-xs font-semibold">(시간당 ~19.1%)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3">
                                            <span className="text-slate-400 shrink-0">궁수 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.7 ➔ Lv.9 (+212%) <span className="text-slate-200 text-xs font-semibold">(시간당 ~31.3%)</span></span>
                                        </div>
                                    </div>
                                </div>

                                {/* 케이스 4 */}
                                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-3">
                                    <div className="text-sm font-bold text-slate-100 flex items-center justify-between">
                                        <span>📊 오프라인 Case D (후반 구간)</span>
                                        <span className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">전사 L.13 + 궁수 L.11 | 골획증 20%</span>
                                    </div>
                                    <div className="relative w-full rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                        <Image 
                                            src="/images/ultima-squad-offline-4.png" 
                                            alt="오프라인 보상 결과 4" 
                                            width={400}
                                            height={300}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </div>
                                    <div className="space-y-1.5 text-xs sm:text-sm">
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">오프라인 누적 시간</span>
                                            <span className="text-slate-200 font-bold">7시간 24분 (444분)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">골드 획득량 증가</span>
                                            <span className="text-slate-200 font-bold">20% (+4레벨)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">획득 골드</span>
                                            <span className="text-yellow-400 font-mono font-bold">1,201,778 G <span className="text-slate-200 text-xs font-semibold">(시간당 ~162,402 G)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">전사 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.13 ➔ Lv.14 (+116%) <span className="text-slate-200 text-xs font-semibold">(시간당 ~15.7%)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3">
                                            <span className="text-slate-400 shrink-0">궁수 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.11 ➔ Lv.12 (+149%) <span className="text-slate-200 text-xs font-semibold">(시간당 ~20.1%)</span></span>
                                        </div>
                                    </div>
                                </div>

                                {/* 케이스 5 */}
                                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-3">
                                    <div className="text-sm font-bold text-slate-100 flex items-center justify-between">
                                        <span>📊 오프라인 Case E (후반 구간)</span>
                                        <span className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">전사 L.14 + 궁수 L.13 | 골획증 20%</span>
                                    </div>
                                    <div className="relative w-full rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                        <Image 
                                            src="/images/ultima-squad-offline-5.png" 
                                            alt="오프라인 보상 결과 5" 
                                            width={400}
                                            height={300}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </div>
                                    <div className="space-y-1.5 text-xs sm:text-sm">
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">오프라인 누적 시간</span>
                                            <span className="text-slate-200 font-bold">7시간 52분 (472분)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">골드 획득량 증가</span>
                                            <span className="text-slate-200 font-bold">20% (+4레벨)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">획득 골드</span>
                                            <span className="text-yellow-400 font-mono font-bold">1,592,943 G <span className="text-slate-200 text-xs font-semibold">(시간당 ~202,492 G)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">전사 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.14 ➔ Lv.15 (+129%) <span className="text-slate-200 text-xs font-semibold">(시간당 ~16.4%)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3">
                                            <span className="text-slate-400 shrink-0">궁수 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.13 ➔ Lv.14 (+151%) <span className="text-slate-200 text-xs font-semibold">(시간당 ~19.2%)</span></span>
                                        </div>
                                    </div>
                                </div>

                                {/* 케이스 6 */}
                                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-3">
                                    <div className="text-sm font-bold text-slate-100 flex items-center justify-between">
                                        <span>📊 오프라인 Case F (후반 구간)</span>
                                        <span className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">전사 L.17 + 궁수 L.16 | 골획증 20%</span>
                                    </div>
                                    <div className="relative w-full rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                        <Image 
                                            src="/images/ultima-squad-offline-6.png" 
                                            alt="오프라인 보상 결과 6" 
                                            width={400}
                                            height={300}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </div>
                                    <div className="space-y-1.5 text-xs sm:text-sm">
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">오프라인 누적 시간</span>
                                            <span className="text-slate-200 font-bold">7시간 57분 (477분)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">골드 획득량 증가</span>
                                            <span className="text-slate-200 font-bold">20% (+4레벨)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">획득 골드</span>
                                            <span className="text-yellow-400 font-mono font-bold">3,557,104 G <span className="text-slate-200 text-xs font-semibold">(시간당 ~447,434 G)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">전사 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.17 ➔ Lv.18 (+108%) <span className="text-slate-200 text-xs font-semibold">(시간당 ~15.1%)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3">
                                            <span className="text-slate-400 shrink-0">궁수 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.16 ➔ Lv.17 (+120%) <span className="text-slate-200 text-xs font-semibold">(시간당 ~15.1%)</span></span>
                                        </div>
                                    </div>
                                </div>

                                {/* 케이스 7 */}
                                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-3">
                                    <div className="text-sm font-bold text-slate-100 flex items-center justify-between">
                                        <span>📊 오프라인 Case G (극후반 구간)</span>
                                        <span className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">전사 L.21 + 궁수 L.20 | 골획증 25%</span>
                                    </div>
                                    <div className="relative w-full rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                        <Image 
                                            src="/images/ultima-squad-offline-7.png" 
                                            alt="오프라인 보상 결과 7" 
                                            width={400}
                                            height={300}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </div>
                                    <div className="space-y-1.5 text-xs sm:text-sm">
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">오프라인 누적 시간</span>
                                            <span className="text-slate-200 font-bold">7시간 04분 (424분)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">골드 획득량 증가</span>
                                            <span className="text-slate-200 font-bold">25% (+5레벨)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">획득 골드</span>
                                            <span className="text-yellow-400 font-mono font-bold">4,822,139 G <span className="text-slate-200 text-xs font-semibold">(시간당 ~682,375 G)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">전사 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.21 ➔ Lv.22 (+99%) <span className="text-slate-200 text-xs font-semibold">(시간당 ~14.0%)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3">
                                            <span className="text-slate-400 shrink-0">궁수 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.20 ➔ Lv.21 (+105%) <span className="text-slate-200 text-xs font-semibold">(시간당 ~14.9%)</span></span>
                                        </div>
                                    </div>
                                </div>

                                {/* 케이스 8 */}
                                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-3">
                                    <div className="text-sm font-bold text-slate-100 flex items-center justify-between">
                                        <span>📊 오프라인 Case H (마법사 포함 3인 스쿼드)</span>
                                        <span className="text-xs bg-purple-500/10 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">전사 L.24 + 궁수 L.23 + 마법사 L.8 | 골획증 25%</span>
                                    </div>
                                    <div className="relative w-full rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                        <Image 
                                            src="/images/ultima-squad-offline-8.png" 
                                            alt="오프라인 보상 결과 8" 
                                            width={400}
height={300}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </div>
                                    <div className="space-y-1.5 text-xs sm:text-sm">
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">오프라인 누적 시간</span>
                                            <span className="text-slate-200 font-bold">7시간 03분 (423분)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">골드 획득량 증가</span>
                                            <span className="text-slate-200 font-bold">25% (+5레벨)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">획득 골드</span>
                                            <span className="text-yellow-400 font-mono font-bold">5,631,220 G <span className="text-slate-200 text-xs font-semibold">(시간당 ~798,754 G)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">전사 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.24 ➔ Lv.25 (+90%) <span className="text-slate-200 text-xs font-semibold">(시간당 ~12.8%)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">궁수 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.23 ➔ Lv.24 (+93%) <span className="text-slate-200 text-xs font-semibold">(시간당 ~13.2%)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3">
                                            <span className="text-slate-400 shrink-0">마법사 경험치</span>
                                            <span className="text-purple-300 font-bold">Lv.8 ➔ Lv.14 (+641%) <span className="text-slate-200 text-xs font-semibold">(시간당 ~90.9%)</span></span>
                                        </div>
                                    </div>
                                </div>

                                {/* 케이스 9 */}
                                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-3">
                                    <div className="text-sm font-bold text-slate-100 flex items-center justify-between">
                                        <span>📊 오프라인 Case I (2-9 클리어 후반 3인 스쿼드)</span>
                                        <span className="text-xs bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">전사 L.27 + 궁수 L.26 + 마법사 L.18 | 골획증 +30%</span>
                                    </div>
                                    {/* 오프라인 Case I 스크린샷 */}
                                    <div className="relative w-full mx-auto my-2 rounded-lg overflow-hidden border border-slate-800 shadow-md">
                                        <Image 
                                            src="/images/ultima-squad-case-i.png" 
                                            alt="오프라인 Case I 획득 결과 스크린샷" 
                                            width={920}
                                            height={400}
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                    </div>
                                    <div className="space-y-1.5 text-xs sm:text-sm">
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">오프라인 누적 시간</span>
                                            <span className="text-slate-200 font-bold">2시간 17분 (137분)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">골드 획득량 증가</span>
                                            <span className="text-slate-200 font-bold">25% (+5레벨)</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">획득 골드</span>
                                            <span className="text-yellow-400 font-mono font-bold">2,672,289 G <span className="text-slate-200 text-xs font-semibold">(시간당 ~1,170,345 G)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">전사 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.27 ➔ Lv.27 (+35%) <span className="text-slate-200 text-xs font-semibold">(시간당 ~15.3%)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3 border-b border-slate-800/40 pb-1">
                                            <span className="text-slate-400 shrink-0">궁수 경험치</span>
                                            <span className="text-green-400 font-bold">Lv.26 ➔ Lv.26 (+38%) <span className="text-slate-200 text-xs font-semibold">(시간당 ~16.6%)</span></span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-x-3">
                                            <span className="text-slate-400 shrink-0">마법사 경험치</span>
                                        <span className="text-purple-300 font-bold">Lv.18 ➔ Lv.19 (+68%) <span className="text-slate-200 text-xs font-semibold">(1레벨업 + 시간당 ~73.6%)</span></span>
                                    </div>
                                </div>
                            </div>

                            {/* 효율 분석 결론 */}
                            <div className="bg-indigo-950/20 border border-indigo-700/30 rounded-lg p-3 sm:p-4 mt-6">
                                <p className="text-indigo-300 text-sm font-bold flex items-center gap-1.5 mb-2">
                                    <span>💡</span>
                                    <span>오프라인 효율 핵심 분석 요약</span>
                                </p>
                                <ul className="text-slate-200 text-sm space-y-2 list-disc list-inside leading-relaxed">
                                    <li><strong className="text-white">성장 및 해금 여부에 따른 골드 수입량 증가</strong>: 초반 전사 단독(Lv.5)일 때보다 중반 전사/궁수 조합(Lv.9/Lv.2)이 갖춰진 상태에서 시간당 골드 획득량이 <strong className="text-yellow-300">약 1.54배 상승</strong>(7.8만G ➔ 12.0만G)하며, 마법사 영입 후 3인 스쿼드 구축 시 시간당 <strong className="text-yellow-300">약 79.8만 골드</strong>까지 수급량이 폭증합니다.</li>
                                    <li><strong className="text-white">온라인 자동 방치와 효율 비교</strong>: 온라인 1-4 자동 반복 시 LV.5 전사는 1시간당 약 36% 획득하는 반면, 오프라인 시에는 1시간당 약 30.5% 획득하여 <strong className="text-green-300">온라인 대비 85% 수준 효율을 보입니다.</strong> <span className="text-yellow-400">(단, LV.5 ➔ LV.7로 성장하면서 필요 경험치 통이 크게 늘어난 것을 평균 낸 효율이므로, 실제 경험치 획득 절대량 기준으로는 온라인 방치와 사실상 대등한 효율을 보입니다.)</span></li>
                                    <li><strong className="text-white">결론</strong>: 상시 온라인을 유지하지 못하더라도, 오프라인 시간 증가 유틸리티를 잘 활용하면 온라인 방치와 거의 차이가 없는 수준으로 효율적인 성장이 가능합니다.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

                    {/* 7. 실전 공략 가이드 */}
                    <section id="strategy" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                            <Trophy className="w-6 h-6 text-green-400" />
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">7. 실전 공략 가이드 (초반 성장)</h2>
                        </div>
                        <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">

                            {/* 출처 안내 */}
                            <div className="bg-green-950/20 border border-green-700/30 rounded-xl p-3">
                                <p className="text-green-300 text-sm font-bold flex items-center gap-1.5 mb-1">
                                    <span>📝</span>
                                    <span>플레이어 직접 실측 데이터 기반 공략</span>
                                </p>
                                <p className="text-slate-400 text-xs leading-relaxed">아래 공략은 전사 용병을 기준으로 직접 플레이하며 테스트한 실측 데이터입니다. 장비 강화 수치, 잠재능력 세팅에 따라 결과가 다를 수 있습니다.</p>
                            </div>
                        {/* 레벨별 스테이지 공략 */}
                        <div>
                            <h3 className="font-bold text-green-300 mb-3 text-base flex items-center gap-1.5">
                                <span>⚔️</span>
                                <span>레벨별 클리어 가능 스테이지 기록</span>
                            </h3>
                            <div className="overflow-x-auto -mx-1">
                                <table className="w-full text-left border-collapse min-w-[340px] text-xs sm:text-sm">
                                    <thead>
                                        <tr className="bg-green-950/20 text-green-200">
                                            <th className="p-2 sm:p-3 border border-green-800/20 font-semibold whitespace-nowrap">레벨</th>
                                            <th className="p-2 sm:p-3 border border-green-800/20 font-semibold">장비</th>
                                            <th className="p-2 sm:p-3 border border-green-800/20 font-semibold whitespace-nowrap">클리어</th>
                                            <th className="p-2 sm:p-3 border border-green-800/20 font-semibold">비고</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-300 divide-y divide-slate-800/50">
                                        {[
                                            { lv: 'LV 3 전사', gear: '1단계 (기본템)', clear: '1-2', note: '1-3 불가' },
                                            { lv: 'LV 4 전사', gear: '1단계 (추옵 최고)', clear: '1-2', note: '1-3 불가' },
                                            { lv: 'LV 5 전사', gear: '1단계 (추옵 최고)', clear: '1-3', note: '1-4 불가' },
                                            { lv: 'LV 6 전사', gear: '1단계 (추옵 최고)', clear: '1-4', note: '1-5 이상 불가' },
                                            { lv: 'LV 7 전사', gear: '1단계 (추옵 최고)', clear: '1-5', note: '1-6 이상 불가' },
                                            { lv: 'LV 8 전사', gear: '2단계', clear: '1-5', note: '1-6 불가' },
                                            { lv: 'LV 9 전사', gear: '2단계 (방어력 잠재)', clear: '❌ 1-6 테섭은 성공', note: '테섭 때는 반복 후 간신히 성공! 본섭에서는 오류인지 안되는 것을 확인', failRed: true },
                                            { lv: 'LV 9 전사(본섭)', gear: '2단계 (공격력 잠재)', clear: '✅ 1-6 클리어!', note: '본섭에서는 공격력 잠재능력으로 간신히 클리어되는 것 확인', isGreen: true },
                                            { lv: 'LV 10 전사 (본섭)', gear: '1단계 3개 + 2단계 신발', clear: '✅ 1-6 클리어!', note: '🔥 본섭 실측: 간신히 성공 (반복 시 클리어)', isGreen: true },
                                            { lv: 'LV 9 전사 + 궁수', gear: '2단계 + 궁수', clear: '1-6', note: '1-7 실패' },
                                            { lv: 'LV 10 전사 + LV 6 궁수', gear: '전사 2단계 (방어스킬) / 궁수 1단계 (최고추옵)', clear: '1-7', note: '아슬하게 성공' },
                                            { lv: 'LV 11 전사 + LV 9 궁수', gear: '전사 2단계 (방어스킬) / 궁수 2단계', clear: '1-7', note: '1-8 실패' },
                                            { lv: 'LV 12 전사 + LV 9 궁수', gear: '전사 2단계 (방어스킬) / 궁수 2단계', clear: '1-7', note: '1-8 실패' },
                                            { lv: 'LV 12 전사 + LV 11 궁수', gear: '전사 2단계 (공격스킬) / 궁수 2단계', clear: '1-8', note: '성공' },
                                            { lv: 'LV 13 전사 + LV 11 궁수', gear: '전사 2단계 (공격스킬) / 궁수 2단계', clear: '1-9', note: '극적으로 성공 (3회 수동 도전)' },
                                            { lv: 'LV 13 전사 + LV 11 궁수', gear: '전사 2단계 (공격스킬) / 궁수 2단계', clear: '1-9', note: '1-10 (보스-핑크빈) 실패' },
                                            { lv: 'LV 13 전사 + LV 11 궁수', gear: '전사 2단계 (방어스킬) / 궁수 2단계', clear: '1-9', note: '1-10 (보스-핑크빈) 실패' },
                                            { lv: 'LV 14 전사 + LV 12 궁수', gear: '전사 2단계 (방어스킬) / 궁수 2단계', clear: '1-9', note: '1-10 (보스-핑크빈) 실패' },
                                            { lv: 'LV 14 전사 + LV 13 궁수', gear: '전사 2단계 (방어스킬) / 궁수 2단계', clear: '1-9', note: '1-10 (보스-핑크빈) 실패 (딜 부족)' },
                                            { lv: 'LV 15 전사 + LV 14 궁수', gear: '전사 2단계 (방어스킬) / 궁수 2단계', clear: '1-9', note: '1-10 (보스-핑크빈) 실패' },
                                            { lv: 'LV 16 전사 + LV 15 궁수', gear: '전사 2단계 (방어스킬) / 궁수 2단계', clear: '1-10', note: '보스전 최초 성공 (폭풍의 시 활성화)' },
                                            { lv: 'LV 16 전사 + LV 15 궁수', gear: '전사 2단계 (방어+공격 스킬) / 궁수 2단계 (공격스킬 2개)', clear: '2-1', note: '성공 (1-10 클리어로 스킬칸 확장)' },
                                            { lv: 'LV 17 전사 + LV 15 궁수', gear: '전사 3단계 (방어+공격 스킬) / 궁수 3단계 (공격스킬 2개)', clear: '2-2', note: '성공 (전사/궁수 올 3단계 장비 완료)' },
                                            { lv: 'LV 18 전사 + LV 17 궁수', gear: '전사 3단계 (방어+공격 스킬) / 궁수 3단계 (공격스킬 2개)', clear: '2-2', note: '2-3 실패 (1차 도전)' },
                                            { lv: 'LV 19 전사 + LV 18 궁수', gear: '전사 3단계 (방어+공격 스킬) / 궁수 3단계 (공격스킬 2개)', clear: '2-2', note: '2-3 실패 (여전히 스펙 부족으로 추가 레벨업 요구됨)' },
                                            { lv: 'LV 19 전사 + LV 19 궁수', gear: '전사 3단계 (방어+공격 스킬) / 궁수 3단계 (공격스킬 2개)', clear: '2-2', note: '2-3 실패 (궁수 레벨업 후에도 여전히 실패, 4단계 장비 장착 레벨인 Lv.22 달성 필요성 대두)' },
                                            { lv: 'LV 20 전사 + LV 19 궁수', gear: '전사 3단계 (방어+공격 스킬) / 궁수 3단계 (공격스킬 2개)', clear: '2-3', note: '성공 (전사 20레벨 달성으로 탱킹력 확보 후 클리어 성공)' },
                                            { lv: 'LV 21 전사 + LV 20 궁수', gear: '전사 (방어+해머 스킬) / 궁수 (공격스킬 2개)', clear: '2-3', note: '2-4 실패 (2-4 진입 스펙 벽 확인)' },
                                            { lv: 'LV 22 전사 + LV 21 궁수', gear: '전사 4단계 방어구 2개 (잠재 방어력 +20×2) / 궁수 (공격스킬 2개)', clear: '2-4', note: '성공 (전사 Lv.22 달성 및 4단계 방어구+방어력 잠재 세팅으로 2-4 돌파 성공)' },
                                            { lv: 'LV 22 전사 + LV 22 궁수', gear: '전사 (공격+해머 스킬) / 궁수 4단계 무기+방어구 1개 (공격스킬 2개)', clear: '2-4', note: '2-5 실패 (궁수 Lv.22 및 4단계 장비 세팅에도 2-5 스펙 벽 확인)' },
                                            { lv: 'LV 23 전사 + LV 22 궁수', gear: '전사 (공격+해머 스킬) / 궁수 4단계 무기+방어구 1개 (공격스킬 2개)', clear: '2-5', note: '성공 (전사 Lv.23 달성으로 스펙업 후 2-5 돌파 성공)' },
                                            { lv: 'LV 23 전사 + LV 23 궁수', gear: '전사 4단계 방어구 2개 (공격+해머 스킬) / 궁수 4단계 무기+방어구 2개 (공격스킬 2개)', clear: '2-5', note: '2-6 실패 (전사/궁수 Lv.23 및 4단계 장비 세팅에도 2-6 난이도 벽 확인)' },
                                            { lv: 'LV 24 전사 + LV 23 궁수', gear: '전사 4단계 방어구 2개 (공격+해머 스킬) / 궁수 4단계 무기+방어구 2개 (공격스킬 2개)', clear: '2-6', note: '극적으로 성공 (전사 Lv.24 달성 후 2-6 겨우 돌파 성공! 4단계 장비 풀장착 시 훨씬 수월할 것으로 추정)' },
                                            { lv: 'LV 24 전사 + LV 23 궁수 + LV 7 마법사', gear: '전사 4단계 방어구 2개 / 궁수 4단계 무기+방어구 2개 / 마법사 (공격+힐링 스킬)', clear: '2-6', note: '2-7 실패 (마법사 400만G 영입 후 3인 조합으로 도전했으나 마법사 저레벨(Lv.7)로 인한 2-7 벽 확인)' },
                                            { lv: 'LV 25 전사 + LV 24 궁수 + LV 15 마법사', gear: '전사 4단계 방어구 2개 (공격+해머) / 궁수 4단계 무기+방어구 2개 / 마법사 3단계 풀셋 (공격+힐링)', clear: '2-7', note: '성공 (전사 Lv.25, 궁수 Lv.24 및 마법사 Lv.15+3단계 풀셋 성장으로 2-7 돌파 성공)' },
                                            { lv: 'LV 25 전사 + LV 25 궁수 + LV 15 마법사', gear: '전사 4단계 방어구 2개 (공격+해머) / 궁수 4단계 무기+방어구 2개 / 마법사 3단계 풀셋 (공격+힐링)', clear: '2-7', note: '2-8 실패 (궁수 Lv.25 달성 및 4단계 무기+방어구 2개 세팅 후에도 여전히 2-8 스펙 벽 확인)' },
                                            { lv: 'LV 26 전사 + LV 25 궁수 + LV 16 마법사', gear: '전사 4단계 무기+방어구 2개 (공격+해머) / 궁수 4단계 무기+방어구 2개 / 마법사 3단계 풀셋 (공격+힐링)', clear: '2-8', note: '겨우겨우 성공 (전사 Lv.26+4단계 무기&방어구2개, 궁수 Lv.25, 마법사 Lv.16 스펙업 후 2-8 극적으로 돌파 성공!)' },
                                            { lv: 'LV 26 전사 + LV 25 궁수 + LV 17 마법사', gear: '전사 4단계 무기+방어구 2개 (공격+해머) / 궁수 4단계 무기+방어구 2개 / 마법사 3단계 풀셋 (힐링+부활)', clear: '2-8', note: '2-9 실패 (마법사 Lv.17 부활 스킬 해금 및 전사 4단계 무기+방어구 2개 세팅에도 2-9 스펙 벽 확인)' },
                                            { lv: 'LV 26 전사 + LV 26 궁수 + LV 18 마법사', gear: '전사 4단계 무기+방어구 2개 (공격+해머) / 궁수 4단계 풀셋 (공격스킬 2개) / 마법사 3단계 풀셋 (힐링+부활)', clear: '2-8', note: '2-9 실패 (궁수 LV.26+4단계 풀셋 및 마법사 LV.18 스펙업 후에도 여전히 2-9 난이도 벽 확인)' },
                                            { lv: 'LV 27 전사 + LV 26 궁수 + LV 18 마법사', gear: '전사 4단계 무기+방어구 2개 (공격+해머) / 궁수 4단계 풀셋 (보스 폭시 체인징) / 마법사 3단계 풀셋 (힐링+공격 ➔ 사망 시 부활 수동 스위칭)', clear: '2-9', note: '성공 (전사 LV.27 달성 & 마법사 부활 스킬 수동 컨트롤로 10회 반복 재도전 끝에 2-9 극적 돌파!)' },
                                            { lv: 'LV 28 전사 + LV 26 궁수 + LV 18 마법사', gear: '전사 4단계 무기+방어구 2개 (공격+해머) / 궁수 4단계 풀셋 (보스 폭시 체인징) / 마법사 3단계 풀셋 (체인+힐 ➔ 사망 시 부활 수동 스위칭)', clear: '2-9', note: '2-10 (2구역 아르카나 정령 보스) 실패 (전사 Lv.28 & 수동 스킬 스위칭 컨트롤에도 불구하고 보스전 강력한 딜/탱킹 스펙 벽 확인)' },
                                            { lv: 'LV 28 전사 + LV 28 궁수 + LV 21 마법사', gear: '전사 5단계 무기+4단계 방어구 2개 (방어+해머) / 궁수 5단계 모자+4단계 풀셋 (볼텍스+폭시) / 마법사 3단계 풀셋 (힐링+공격 ➔ 사망 시 부활 수동 스위칭)', clear: '2-10 (보스)', note: '대성공! 🎉 (뭔가 될 것 같은 느낌이 들어서 계속 반복 재도전 끝에 대략 8번쯤 도전했을 쯤 성공! 2-10 아르카나 정령 보스 극적 클리어!)' },
                                            { lv: 'LV 28 전사 + LV 28 궁수 + LV 21 마법사', gear: '전사 5단계 무기+5단계 방어구 1개+4단계 방어구 1개 (해머+오라+디바이드) / 궁수 5단계 모자+4단계 풀셋 (공격2개+폭시) / 마법사 3단계 풀셋 (힐링+공격+도어)', clear: '3-1', note: '성공! 🎉 (2-10 보스 클리어 후 스킬 3개 슬롯 해금! 3인 전원 스킬 3개 장착 세팅으로 3-1 돌파 성공!)' },
                                        ].map((row, idx) => {
                                            const isFailRed = 'failRed' in row && Boolean(row.failRed);
                                            const isSuccess = !isFailRed && ('isGreen' in row ? Boolean(row.isGreen) : (row.note.includes('성공') && !row.note.includes('실패')));
                                            return (
                                                <tr
                                                    key={idx}
                                                    className={
                                                        isFailRed
                                                            ? 'bg-rose-950/40 border-l-4 border-l-rose-500 ring-1 ring-rose-500/40 font-semibold'
                                                            : isSuccess
                                                            ? 'bg-emerald-950/40 border-l-4 border-l-emerald-400 ring-1 ring-emerald-500/30 font-semibold'
                                                            : idx % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-950/30'
                                                    }
                                                >
                                                    <td className={`p-2 sm:p-3 border border-slate-700 font-bold whitespace-nowrap ${isFailRed ? 'text-rose-300' : isSuccess ? 'text-emerald-200' : 'text-white'}`}>
                                                        {row.lv}
                                                    </td>
                                                    <td className={`p-2 sm:p-3 border border-slate-700 ${isFailRed ? 'text-rose-200/90' : isSuccess ? 'text-slate-200' : 'text-slate-300'}`}>
                                                        {row.gear}
                                                    </td>
                                                    <td className="p-2 sm:p-3 border border-slate-700 font-semibold whitespace-nowrap">
                                                        {isFailRed ? (
                                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40 text-xs shadow-sm">
                                                                {row.clear}
                                                            </span>
                                                        ) : isSuccess ? (
                                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 text-xs shadow-sm">
                                                                {row.clear.startsWith('✅') ? row.clear : `✅ ${row.clear} 클리어!`}
                                                            </span>
                                                        ) : (
                                                            <span className="text-slate-300 text-xs">
                                                                {row.clear}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="p-2 sm:p-3 border border-slate-700 text-xs">
                                                        {isFailRed ? (
                                                            <span className="text-rose-300 font-bold">{row.note}</span>
                                                        ) : isSuccess ? (
                                                            <span className="text-emerald-300 font-bold">{row.note}</span>
                                                        ) : (
                                                            <span className="text-red-400 font-medium">{row.note}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 실전 팁 */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-green-300 mb-3 text-base flex items-center gap-1.5">
                                <span>💡</span>
                                <span>실전 공략 팁</span>
                            </h3>

                            <div className="bg-slate-950/60 border border-yellow-500/30 rounded-xl p-4 space-y-2">
                                <p className="text-yellow-300 text-sm font-bold">⚔️ LV 9 전사 1-6 스테이지 공략 핵심</p>
                                <ul className="text-slate-200 text-sm space-y-1.5 list-disc list-inside leading-relaxed">
                                    <li>잠재능력은 <strong className="text-white">공격력보다 방어력 위주</strong>로 세팅하는 것이 유리</li>
                                    <li>한 번 아깝게 실패했다면 포기하지 말고 <strong className="text-white">반복 재도전</strong>할 것 — 운에 따라 성공하는 경우 있음</li>
                                    <li>LV 9 기준 1-7 진입 시 전사가 먼저 사망 — <strong className="text-white">탱커 역할이 중요</strong>해지는 구간</li>
                                    <li>LV 10 달성 후 배우는 <strong className="text-yellow-300">2번째 방어 스킬 장착</strong>이 1-7 돌파의 결정적 열쇠</li>
                                </ul>
                            </div>

                            <div className="bg-slate-950/60 border border-blue-500/30 rounded-xl p-4 space-y-3">
                                <p className="text-blue-300 text-sm font-bold flex items-center gap-1.5">
                                    <span>🏹</span>
                                    <span>궁수 용병 활용법 및 보스전(1-10) 돌파 열쇠</span>
                                </p>
                                <ul className="text-slate-200 text-sm space-y-2 list-disc list-inside leading-relaxed">
                                    <li>궁수는 <strong className="text-white">50만 골드</strong>에 구매 가능합니다.</li>
                                    <li>LV 9 전사 + LV 2 궁수 조합으로는 1-7 실패했으나, <strong className="text-white">LV 10 전사(2번째 방어 스킬) + LV 6 궁수</strong>로 1-7 아슬하게 클리어 가능합니다.</li>
                                    <li><strong>1-10 핑크빈 보스전 실패 사례 (LV 14 전사 + LV 13 궁수)</strong>: 전사가 방어 스킬로 버텨도 핑크빈 체력을 1/3도 못 깎고, 궁수는 보스 스킬 한 방에 끝이 납니다.</li>
                                    <li>
                                        <strong className="text-yellow-300">결정적인 돌파구</strong>: 궁수가 
                                        <strong className="text-sky-300"> LV 15를 달성</strong>하여 액티브 스킬 <strong className="text-sky-300">‘폭풍의 시’</strong>를 배워야 클리어가 가능할 것으로 예상됩니다.
                                        <ul className="mt-1 ml-4 space-y-0.5 list-none text-slate-400 text-xs">
                                            <li>→ 폭풍의 시는 <strong className="text-orange-400">10 스테이지 보스 타격 시 1000% 데미지</strong>로 증폭 공격하는 보스 특화 스킬입니다.</li>
                                        </ul>
                                    </li>
                                </ul>
                                <div className="relative w-full max-w-[450px] mx-auto rounded-lg overflow-hidden border border-slate-800 shadow-md mt-2">
                                    <Image 
                                        src="/images/ultima-squad-skill-hurricane.png" 
                                        alt="궁수 LV15 폭풍의 시 스킬 설명" 
                                        width={450}
                                        height={180}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </div>
                            </div>

                            <div className="bg-slate-950/60 border border-emerald-500/30 rounded-xl p-4 space-y-2">
                                <p className="text-emerald-300 text-sm font-bold">💰 골드 파밍 극대화 팁 (정체 시)</p>
                                <ul className="text-slate-200 text-sm space-y-1.5 list-disc list-inside leading-relaxed">
                                    <li>다음 스테이지를 클리어하지 못하고 정체될 때는, 전사에게 <strong className="text-emerald-400">1번째 공격 스킬</strong>을 장착하는 것이 유리합니다.</li>
                                    <li>생존 위주 세팅보다 몬스터 처치 속도를 올려 <strong className="text-yellow-300">골드를 훨씬 더 빠르고 효율적으로 수급</strong>할 수 있습니다.</li>
                                    <li>몬스터 처치 속도가 빠르면 드롭 장비 수급량이 늘어나 <strong className="text-white">장비 분해(골드 수급)</strong> 및 <strong className="text-white">장비 합성(상위 장비 제작)</strong>도 훨씬 원활하게 진행됩니다.</li>
                                </ul>
                            </div>

                            <div className="bg-slate-950/60 border border-purple-500/30 rounded-xl p-4 space-y-2">
                                <p className="text-purple-300 text-sm font-bold">🛡️ 장비 합성 및 세팅 전략</p>
                                <ul className="text-slate-200 text-sm space-y-1.5 list-disc list-inside leading-relaxed">
                                    <li>적어도 전사 <strong className="text-purple-300">14레벨부터는 3단계 아이템</strong>을 맞추기 위해 계속 합성해야 합니다.</li>
                                    <li>전사와 궁수의 3단계 아이템을 모두 확보하는 것이 중요합니다.</li>
                                    <li>2지역(2-1 등) 진입 후에도 몬스터가 여전히 1단계 아이템을 주로 드롭하기 때문에, 미리 3단계 장비를 적극적으로 합성해서 맞춰두는 것이 성장과 클리어에 매우 유리합니다.</li>
                                </ul>
                            </div>
                        </div>

                        {/* 경험치 수급 전략 */}
                        <div>
                            <h3 className="font-bold text-green-300 mb-3 text-base flex items-center gap-1.5">
                                <span>📈</span>
                                <span>경험치 획득 전략 — 반복 vs 수동</span>
                            </h3>
                            <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                                ※ 아래 수치는 10분 단위로 직접 측정한 경험치 증가량입니다. 스테이지 상황, 용병 조합, 플레이 방식에 따라 달라질 수 있습니다.
                            </p>
                            <div className="overflow-x-auto -mx-1">
                                <table className="w-full text-left border-collapse min-w-[380px] text-xs sm:text-sm">
                                    <thead>
                                        <tr className="bg-blue-950/20 text-blue-200">
                                            <th className="p-2 sm:p-3 border border-blue-800/20 font-semibold">조건</th>
                                            <th className="p-2 sm:p-3 border border-blue-800/20 font-semibold whitespace-nowrap">시작</th>
                                            <th className="p-2 sm:p-3 border border-blue-800/20 font-semibold whitespace-nowrap">10분 후</th>
                                            <th className="p-2 sm:p-3 border border-blue-800/20 font-semibold whitespace-nowrap">획득</th>
                                            <th className="p-2 sm:p-3 border border-blue-800/20 font-semibold">방식</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-300 divide-y divide-slate-800/50">
                                        {[
                                            { cond: 'LV3 / 1-2 반복', start: '80%', after: '87%', gain: '+7%', mode: '자동 반복' },
                                            { cond: 'LV3 / 1-3 수동', start: '87%', after: '97%', gain: '+10%', mode: '수동 (1-3 재도전)', highlight: true },
                                            { cond: 'LV5 / 1-4 반복', start: '20%', after: '26%', gain: '+6%', mode: '자동 반복' },
                                            { cond: 'LV5 / 1-5 수동', start: '27%', after: '33%', gain: '+6%', mode: '수동' },
                                            { cond: 'LV6 / 1-3 반복', start: '52%', after: '60%', gain: '+8%', mode: '자동 반복', highlight: true },
                                            { cond: 'LV7 / 1-3 반복', start: '4%', after: '10%', gain: '+6%', mode: '자동 반복' },
                                            { cond: 'LV7 / 1-5 반복', start: '49%', after: '53%', gain: '+4%', mode: '자동 반복' },
                                            { cond: 'LV7 / 1-6 수동', start: '54%', after: '57%', gain: '+3%', mode: '수동' },
                                            { cond: 'LV10 전사 + LV6 궁수 / 1-7 반복', start: '전사 34% / 궁수 92%', after: '전사 38% / 궁수 99%', gain: '전사 +4% / 궁수 +7%', mode: '자동 반복' },
                                            { cond: 'LV13 전사 + LV11 궁수 / 1-8 반복', start: '전사 0% / 궁수 7%', after: '전사 2% / 궁수 11%', gain: '전사 +2% / 궁수 +4%', mode: '자동 반복' },
                                            { cond: 'LV13 전사 + LV11 궁수 / 1-9 수동', start: '전사 3% / 궁수 12%', after: '전사 5% / 궁수 15%', gain: '전사 +2% / 궁수 +3%', mode: '수동' },
                                            { cond: 'LV14 전사 + LV13 궁수 / 1-9 반복', start: '전사 55% / 궁수 5%', after: '전사 57% / 궁수 8%', gain: '전사 +2% / 궁수 +3%', mode: '자동 반복' },
                                            { cond: 'LV16 전사 + LV15 궁수 / 2-1 반복', start: '전사 34% / 궁수 15%', after: '전사 36% / 궁수 18%', gain: '전사 +2% / 궁수 +3%', mode: '자동 반복' },
                                            { cond: 'LV20 전사 + LV19 궁수 / 2-3 반복', start: '전사 4% / 궁수 22%', after: '전사 5% / 궁수 23%', gain: '전사 +1% / 궁수 +1%', mode: '자동 반복' },
                                            { cond: 'LV20 전사 + LV19 궁수 / 2-4 수동', start: '전사 6% / 궁수 24%', after: '전사 7% / 궁수 25%', gain: '전사 +1% / 궁수 +1%', mode: '수동' },
                                            { cond: 'LV20 전사 + LV19 궁수 / 2-1 반복', start: '전사 43% / 궁수 64%', after: '전사 45% / 궁수 67%', gain: '전사 +2% / 궁수 +3%', mode: '자동 (빠른 처치)', highlight: true },
                                            { cond: 'LV22 전사 + LV21 궁수 / 2-3 반복', start: '전사 34% / 궁수 67%', after: '전사 36% / 궁수 69%', gain: '전사 +2% / 궁수 +2%', mode: '자동 (4단계 장비 효과)' },
                                            { cond: 'LV22 전사 + LV21 궁수 / 2-2 반복', start: '전사 37% / 궁수 70%', after: '전사 39% / 궁수 73%', gain: '전사 +2% / 궁수 +3%', mode: '자동 (빠른 사냥터)', highlight: true },
                                            { cond: 'LV22 전사 + LV21 궁수 / 2-1 반복', start: '전사 40% / 궁수 74%', after: '전사 42% / 궁수 76%', gain: '전사 +2% / 궁수 +2%', mode: '자동 반복' },
                                            { cond: 'LV22 전사 + LV21 궁수 / 2-4 반복', start: '전사 43% / 궁수 77%', after: '전사 44% / 궁수 79%', gain: '전사 +1% / 궁수 +2%', mode: '자동 (높은 사냥터 처치 속도 지연)' },
                                            { cond: 'LV25 전사 + LV24 궁수 + LV15 마법사 / 2-3 반복', start: '전사 47% / 궁수 95% / 마법사 9%', after: '전사 49% / 궁수 97% / 마법사 14%', gain: '전사 +2% / 궁수 +2% / 마법사 +5%', mode: '자동 (마법사 힐링 보조 3인 스쿼드)' },
                                            { cond: 'LV25 전사 + LV24 궁수 + LV15 마법사 / 2-7 반복', start: '전사 49% / 궁수 97% / 마법사 15%', after: '전사 51% / 궁수 99% / 마법사 19%', gain: '전사 +2% / 궁수 +2% / 마법사 +4%', mode: '자동 (2-7 최고 사냥터 725G 파밍)' },
                                            { cond: 'LV25 전사 + LV25 궁수 + LV15 마법사 / 2-2 반복', start: '전사 57% / 궁수 5% / 마법사 33%', after: '전사 59% / 궁수 8% / 마법사 39%', gain: '전사 +2% / 궁수 +3% / 마법사 +6%', mode: '자동 (빠른 처치로 궁수+3%/마법사+6% 경험치 극대화)', highlight: true },
                                            { cond: 'LV28 전사 + LV24 궁수 + LV15 마법사 / 2-7 반복', start: '전사 28% / 궁수 85% / 마법사 76%', after: '전사 30% / 궁수 87% / 마법사 79%', gain: '전사 +2% / 궁수 +2% / 마법사 +3%', mode: '자동 (2-7 754G 파밍)' },
                                            { cond: 'LV28 전사 + LV24 궁수 + LV15 마법사 / 2-5 반복', start: '전사 31% / 궁수 88% / 마법사 80%', after: '전사 33% / 궁수 90% / 마법사 84%', gain: '전사 +2% / 궁수 +2% / 마법사 +4%', mode: '자동 (2-5 적정 사냥터 마법사+4% 파밍)', highlight: true },
                                        ].map((row, idx) => {
                                            const isHighlight = 'highlight' in row && row.highlight;

                                            const formatCell = (text: string) => {
                                                if (!text.includes('/')) return text;
                                                const parts = text.split(' / ');
                                                return parts.map((part, i) => (
                                                    <span key={i} className={`block whitespace-nowrap ${part.includes('마법사') ? 'text-purple-300 font-bold bg-purple-950/40 px-1 py-0.5 rounded my-0.5 border border-purple-500/30' : ''}`}>
                                                        {part}
                                                    </span>
                                                ));
                                            };

                                            return (
                                                <tr key={idx} className={isHighlight ? 'bg-amber-950/40 ring-1 ring-amber-500/40' : (idx % 2 === 0 ? 'bg-slate-900/60' : 'bg-slate-950/60')}>
                                                    <td className={"p-2 sm:p-2.5 border border-slate-700 font-extrabold " + (isHighlight ? 'text-amber-300' : 'text-white')}>{row.cond}</td>
                                                    <td className={"p-2 sm:p-2.5 border border-slate-700 text-center text-xs leading-snug " + (isHighlight ? 'text-amber-200 font-semibold' : 'text-slate-100 font-medium')}>{formatCell(row.start)}</td>
                                                    <td className={"p-2 sm:p-2.5 border border-slate-700 text-center font-bold text-green-300 text-xs leading-snug"}>{formatCell(row.after)}</td>
                                                    <td className={"p-2 sm:p-2.5 border border-slate-700 text-center font-bold text-yellow-300 text-xs leading-snug"}>{formatCell(row.gain)}</td>
                                                    <td className={"p-2 sm:p-2.5 border border-slate-700 " + (isHighlight ? 'text-amber-300 font-bold' : 'text-slate-200')}>{row.mode}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4 bg-amber-950/20 border border-amber-700/30 rounded-xl p-4">
                                <p className="text-amber-300 text-sm font-bold flex items-center gap-1.5 mb-2">
                                    <span>⚡</span>
                                    <span>경험치 효율 핵심 결론</span>
                                </p>
                                <ul className="text-slate-200 text-sm space-y-2 list-disc list-inside leading-relaxed">
                                    <li>
                                        <strong className="text-yellow-300">🎯 사냥 속도 vs 스테이지 난이도 법칙 (실측 검증)</strong>: 
                                        무조건 높은 스테이지(2-3, 2-4)를 고집하는 것보다, <strong className="text-white underline underline-offset-4 decoration-amber-500">몹이 원활하게 잘 잡히는 한 단계 낮은 스테이지(2-1)에서 사냥하는 것이 훨씬 빠릅니다.</strong>
                                        <ul className="mt-1 ml-4 space-y-0.5 list-none text-slate-300 text-xs">
                                            <li>→ <strong className="text-slate-400">2-3 / 2-4 사냥 시 (10분)</strong>: 전사 +1% / 궁수 +1% 획득 (딜 부족으로 처치 속도 지연)</li>
                                            <li>→ <strong className="text-green-300">2-1 빠른 사냥 시 (10분)</strong>: 전사 +2% / 궁수 +3% 획득 <strong className="text-yellow-300">(최대 2~3배 효율 상승!)</strong></li>
                                            <li>→ <strong className="text-purple-300">장비 분해 & 합성 선순환</strong>: 빠른 처치 시 드롭 장비 수급량이 급증하여 <strong className="text-white">장비 분해(골드 수급)</strong> 및 <strong className="text-white">상위 장비 합성</strong> 속도가 동시에 상승합니다.</li>
                                        </ul>
                                    </li>
                                    <li>일반적으로는 <strong className="text-white">클리어 못 하는 스테이지 바로 직전</strong>을 자동 반복하는 것이 효율적이나, 몬스터가 잘 죽지 않는 구간에 진입했다면 <strong className="text-white">처치 속도가 빠른 이전 사냥터로 내려가서 레벨업</strong>하는 것이 핵심 전략입니다.</li>
                                    <li>단, <strong className="text-yellow-300">LV3 구간에서는 예외</strong> — 1-3을 수동으로 도전하는 방식이 1-2 자동반복보다 경험치 효율이 더 높음</li>
                                    <li>수동 플레이 시 죽어도 바로 해당 스테이지로 재도전하면 자동 반복과 비교해 더 빠른 레벨업 가능</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 8. 카오스 모드 */}
                <section id="chaos" className="mb-14 scroll-mt-24 bg-gradient-to-br from-red-950/30 to-slate-900/30 border border-red-500/40 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3 mb-6 border-b border-red-800/30 pb-4">
                        <Star className="w-6 h-6 text-red-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">7. 카오스 모드</h2>
                    </div>
                    <div className="space-y-5 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">

                        <div className="bg-red-950/20 border border-red-800/30 rounded-xl p-4">
                            <h3 className="font-bold text-red-300 mb-2 text-sm flex items-center gap-1.5">
                                <span>🔓</span>
                                <span>카오스 모드 입장 조건</span>
                            </h3>
                            <p className="text-slate-300 text-sm">일반 모드의 <strong className="text-white">3-10 스테이지</strong>까지 모두 클리어하면 입장 가능합니다.</p>
                            
                            {/* 카오스 모드 잠금 스크린샷 */}
                            <div className="relative w-full max-w-md my-4 rounded-lg overflow-hidden border border-red-900/40 shadow-lg">
                                <Image 
                                    src="/images/ultima-squad-chaos-lock.png" 
                                    alt="카오스 모드 테스트 서버 제한 알림" 
                                    width={460}
                                    height={120}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>

                            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                                ※ 테스트 월드에서는 카오스 모드 클릭 시 <strong className="text-white">"테스트 월드에서는 이용할 수 없습니다. 정식 서버에서 확인해 주세요."</strong>라는 안내 팝업이 출력되며 입장이 차단됩니다.
                            </p>
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

                        <div className="bg-amber-950/20 border border-amber-700/40 rounded-xl p-4 mb-4">
                            <ul className="text-amber-300 text-sm sm:text-base space-y-2 list-disc list-inside leading-relaxed font-semibold">
                                <li>모든 아이템 구매 가능 수량은 <span className="text-white underline decoration-amber-500 underline-offset-4">메이플ID 내 공유</span></li>
                                <li>구매한 모든 아이템은 <span className="text-white underline decoration-amber-500 underline-offset-4">2026년 8월 20일(목) 오전 2시</span>까지만 사용 가능</li>
                                <li>월드 내 나의 캐릭터 간 이동만 가능한 아이템</li>
                            </ul>
                        </div>

                        {/* 코인샵 UI 스크린샷 추가 */}
                        <div className="relative w-full mx-auto my-4 rounded-lg overflow-hidden border border-slate-800 shadow-md">
                            <Image 
                                src="/images/ultima-squad-coinshop.png" 
                                alt="울티마 스쿼드 코인샵 일반/스페셜 판매 상품 목록" 
                                width={920}
                                height={600}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>

                        <div className="overflow-x-auto -mx-1">
                            <table className="w-full text-left border-collapse min-w-[320px] text-xs sm:text-sm">
                                <thead>
                                    <tr className="bg-slate-800/50 text-slate-300">
                                        <th className="p-2 sm:p-3 border border-slate-700 font-semibold whitespace-nowrap">화폐</th>
                                        <th className="p-2 sm:p-3 border border-slate-700 font-semibold">아이템</th>
                                        <th className="p-2 sm:p-3 border border-slate-700 font-semibold text-center whitespace-nowrap">가격</th>
                                        <th className="p-2 sm:p-3 border border-slate-700 font-semibold text-center whitespace-nowrap">구매 한도</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-300">
                                    {coinShopItems.map((item, i) => (
                                        <tr key={item.item} className={item.currency === '스쿼드 코인' ? (i % 2 === 0 ? 'bg-yellow-950/10' : 'bg-yellow-950/5') : (i % 2 === 0 ? 'bg-red-950/20' : 'bg-red-950/10')}>
                                            <td className="p-2 sm:p-3 border border-slate-700 whitespace-nowrap">
                                                <span className={`text-[11px] sm:text-xs px-2 py-0.5 rounded-full font-medium ${item.currency === '스쿼드 코인' ? 'bg-yellow-950/50 text-yellow-300 border border-yellow-800/30' : 'bg-red-950/50 text-red-300 border border-red-800/30'}`}>
                                                    {item.currency}
                                                </span>
                                            </td>
                                            <td className="p-2 sm:p-3 border border-slate-700 font-medium">{item.item}</td>
                                            <td className={`p-2 sm:p-3 border border-slate-700 text-center font-bold whitespace-nowrap ${item.currency === '스쿼드 코인' ? 'text-yellow-300' : 'text-red-300'}`}>{item.price}코인</td>
                                            <td className="p-2 sm:p-3 border border-slate-700 text-center text-slate-400 whitespace-nowrap">{item.limit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 솔 에르다 효율 하이라이트 */}
                        <div className="bg-gradient-to-br from-indigo-950/40 to-purple-950/30 border-2 border-indigo-500/40 rounded-xl p-5 space-y-4">
                            <p className="text-indigo-300 font-bold text-base flex items-center gap-2">
                                <Trophy className="w-5 h-5" /> 💡 핵심 보상: 솔 에르다
                            </p>

                            {/* 코인 획득 계산 */}
                            <div>
                                <p className="text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wide">📥 전 스테이지 클리어 시 총 획득 스쿼드 코인</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                                    <div className="bg-slate-900/50 rounded-lg p-2.5 border border-slate-700/50">
                                        <p className="text-slate-400 mb-1">1-1 ~ 1-9 (×9)</p>
                                        <p className="text-white font-bold">100 × 9 = <span className="text-yellow-300">900코인</span></p>
                                        <p className="text-slate-400 mt-1">1-10 보스</p>
                                        <p className="text-white font-bold"><span className="text-yellow-300">500코인</span></p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-2.5 border border-slate-700/50">
                                        <p className="text-slate-400 mb-1">2-1 ~ 2-9 (×9)</p>
                                        <p className="text-white font-bold">200 × 9 = <span className="text-yellow-300">1,800코인</span></p>
                                        <p className="text-slate-400 mt-1">2-10 보스</p>
                                        <p className="text-white font-bold"><span className="text-yellow-300">900코인</span></p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-2.5 border border-slate-700/50">
                                        <p className="text-slate-400 mb-1">3-1 ~ 3-9 (×9)</p>
                                        <p className="text-white font-bold">300 × 9 = <span className="text-yellow-300">2,700코인</span></p>
                                        <p className="text-slate-400 mt-1">3-10 보스</p>
                                        <p className="text-white font-bold"><span className="text-yellow-300">1,200코인</span></p>
                                    </div>
                                </div>
                                <div className="mt-2 bg-yellow-950/30 border border-yellow-700/40 rounded-lg p-2.5 text-center">
                                    <span className="text-slate-400 text-xs">전 스테이지 합산 </span>
                                    <span className="text-yellow-300 font-black text-sm">총 8,000 스쿼드 코인</span>
                                </div>
                            </div>

                            {/* 코인샵 필요 코인 계산 */}
                            <div>
                                <p className="text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wide">📤 코인샵 스쿼드 코인 아이템 전부 구매 시 필요 코인</p>
                                <div className="space-y-1.5 text-xs">
                                    <div className="flex justify-between items-center bg-slate-900/40 rounded-lg px-3 py-2 border border-slate-700/40">
                                        <span className="text-indigo-300 font-semibold">💎 솔 에르다 (최대 10개)</span>
                                        <span className="text-white font-bold">200 × 10 = <span className="text-yellow-300">2,000코인</span></span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-900/40 rounded-lg px-3 py-2 border border-slate-700/40">
                                        <span className="text-purple-300 font-semibold">🔮 솔 에르다 조각 교환권 (최대 400개)</span>
                                        <span className="text-white font-bold">15 × 400 = <span className="text-yellow-300">6,000코인</span></span>
                                    </div>
                                    <div className="flex justify-between items-center bg-yellow-950/30 rounded-lg px-3 py-2 border border-yellow-700/40">
                                        <span className="text-yellow-200 font-bold">합계</span>
                                        <span className="text-yellow-300 font-black">8,000코인</span>
                                    </div>
                                </div>
                            </div>

                            {/* 결론 */}
                            <div className="bg-green-950/40 border-2 border-green-500/50 rounded-xl p-3 text-center">
                                <p className="text-green-300 font-black text-sm">✅ 모든 스테이지를 클리어하면 코인샵 스쿼드 코인 아이템을 전부 구매할 수 있습니다!</p>
                                <p className="text-slate-400 text-xs mt-1">획득 8,000코인 = 필요 8,000코인 — 딱 맞습니다 🎯</p>
                            </div>
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
                    <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                        <ChevronRight className="w-4 h-4 text-amber-400" />
                        <span>이벤트 기간: 2026.07.23(목) 점검 후 ~ 08.19(수) 오후 11:59 <strong className="text-amber-400 font-bold">(총 28일간)</strong></span>
                    </div>
                </div>

            </main>
        </div>
    );
}
