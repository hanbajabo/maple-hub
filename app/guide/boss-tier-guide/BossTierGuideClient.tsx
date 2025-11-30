"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Swords, Shield, Skull, Info, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";

export default function BossTierGuideClient() {
    const [expandedTier, setExpandedTier] = useState<string | null>("gold");

    const toggleTier = (tier: string) => {
        setExpandedTier(expandedTier === tier ? null : tier);
    };

    const tiers = [
        {
            id: "gold",
            name: "금별 (Gold Star)",
            stars: "★ 1 ~ 9",
            desc: "메이플스토리의 최상위 보스 라인업입니다. 극한의 스펙과 컨트롤, 완벽한 파티 합이 요구됩니다. 익스트림 난이도는 하위 난이도와 비교 불가능한 체력과 패턴을 자랑합니다.",
            color: "text-yellow-400",
            bgColor: "bg-yellow-500/10",
            borderColor: "border-yellow-500/30",
            bosses: [
                {
                    stars: 9,
                    name: "익스트림 카링",
                    hp: "5경 4571조 (추정)",
                    features: "현존 최강의 보스. 모든 파티원이 극한의 스펙과 컨트롤을 갖춰야 도전 가능합니다. 최초의 대적자를 제외하면 가장 마지막에 격파된 보스입니다.",
                    images: ["/images/bosses/kaling.png"]
                },
                {
                    stars: 8,
                    name: "하드 발드릭스 / 익스트림 최초의 대적자",
                    hp: "2경 100조 / 3경 2180조",
                    features: "하드 발드릭스는 3인 제한과 까다로운 게이지 관리로 익스트림 칼로스보다 어렵습니다. 익스트림 최초의 대적자는 즉사급 패턴 강화로 익스트림 카링급 스펙을 요구합니다.",
                    images: ["/images/bosses/baldrix.png", "/images/bosses/first-adversary.png"]
                },
                {
                    stars: 7,
                    name: "익스트림 감시자 칼로스",
                    hp: "2경 1296조 (추정)",
                    features: "전탄 발사를 대체하는 '섬멸 프로토콜' 신규 패턴이 추가되어 극악의 난이도를 자랑합니다. 2025년 10월 기준 솔플 클리어 기록이 없습니다.",
                    images: ["/images/bosses/kalos.png"]
                },
                {
                    stars: 6,
                    name: "익스트림 검은 마법사 / 익스트림 세렌 / 하드 림보",
                    hp: "4794조 / 6480조 / 1경 2432조",
                    features: "익스트림 검은 마법사와 세렌은 하드보다 강화된 패턴과 체력을 가집니다. 하드 림보는 3인 제한과 침식 수치 관리로 인당 요구 스펙이 매우 높습니다.",
                    images: ["/images/bosses/black-mage.png", "/images/bosses/seren.png", "/images/bosses/limbo.png"]
                },
                {
                    stars: 5,
                    name: "하드 카링 / 하드 최초의 대적자",
                    hp: "1경 2091조 / 1경 450조",
                    features: "하드 카링은 1경 단위의 체력과 강화된 3페이즈 패턴을 가집니다. 하드 최초의 대적자는 질서의 힘 게이지 관리로 인해 공략이 까다롭습니다.",
                    images: ["/images/bosses/kaling.png", "/images/bosses/first-adversary.png"]
                },
                {
                    stars: 4,
                    name: "카오스 칼로스 / 노멀 발드릭스",
                    hp: "5082조 / 9184조",
                    features: "카오스 칼로스는 노멀의 4.8배 체력과 강화된 간섭 패턴을 가집니다. 노멀 발드릭스는 노멀임에도 9000조가 넘는 체력으로 높은 스펙을 요구합니다.",
                    images: ["/images/bosses/kalos.png", "/images/bosses/baldrix.png"]
                },
                {
                    stars: 3,
                    name: "노멀 카링 / 노멀 림보",
                    hp: "3926조 / 6480조",
                    features: "노멀 카링은 3900조, 노멀 림보는 6400조의 체력을 가집니다. 노멀 림보는 3인 제한으로 개인 스펙 요구량이 높습니다.",
                    images: ["/images/bosses/kaling.png", "/images/bosses/limbo.png"]
                },
                {
                    stars: 2,
                    name: "익스트림 스우",
                    hp: "1810조",
                    features: "리마스터된 스우의 강화판. 대형 기계팔 등 신규 패턴이 추가되었습니다. 기계심장 컴플리트 언더컨트롤을 드랍하며, 메이플 최초 소수격 제한 보스입니다.",
                    images: ["/images/bosses/lotus.png"]
                },
                {
                    stars: 1,
                    name: "노멀 감시자 칼로스 / 노멀 최초의 대적자",
                    hp: "1056조 / 1650조",
                    features: "노멀 칼로스는 1000조대 체력이지만 패턴이 이지와 비슷해 금별 중엔 쉽습니다. 노멀 최초의 대적자는 패링과 게이지 기믹 숙련도에 따라 난이도가 갈립니다.",
                    images: ["/images/bosses/kalos.png", "/images/bosses/first-adversary.png"]
                }
            ]
        },
        {
            id: "silver",
            name: "은별 (Silver Star)",
            stars: "★ 1 ~ 9",
            desc: "본격적인 상위 보스 라인입니다. 파티 격파가 주를 이루며, '보스 도핑'이 필수가 되는 구간입니다. 은별 6개부터 난이도가 급격히 상승합니다.",
            color: "text-slate-300",
            bgColor: "bg-slate-500/10",
            borderColor: "border-slate-400/30",
            bosses: [
                {
                    stars: 9,
                    name: "이지 카링",
                    hp: "921조",
                    features: "하드 검은 마법사보다 훨씬 높은 체력과 까다로운 패턴을 가집니다. 상급 보스 코인과 플라즈마 하트를 얻기 위한 최소 관문입니다.",
                    images: ["/images/bosses/kaling.png"]
                },
                {
                    stars: 8,
                    name: "하드 세렌 / 이지 칼로스 / 이지 최초의 대적자",
                    hp: "486조 / 357조 / 570조",
                    features: "하드 세렌은 태양 게이지와 여명 보호막으로 높은 스펙을 요구합니다. 이지 칼로스는 너프 후 하드 검마와 노멀 세렌 사이 난이도입니다.",
                    images: ["/images/bosses/seren.png", "/images/bosses/kalos.png", "/images/bosses/first-adversary.png"]
                },
                {
                    stars: 7,
                    name: "하드 검은 마법사",
                    hp: "472.5조",
                    features: "저주 중첩, 권능, 보호막 등 다양한 기믹으로 압박하지만 넉넉한 데카와 시간으로 도전해볼 만합니다. 해방 퀘스트의 최종 관문입니다.",
                    images: ["/images/bosses/black-mage.png"]
                },
                {
                    stars: 6,
                    name: "하드 진 힐라 / 노멀 세렌",
                    hp: "178.5조 / 207.9조",
                    features: "하드 진 힐라는 상시 회복 봉인과 데카를 제물로 바치는 기믹으로 파티격이 힘듭니다. 노멀 세렌은 하드보다 약하지만 여전히 솔플 유저에겐 통곡의 벽입니다.",
                    images: ["/images/bosses/jin-hilla.png", "/images/bosses/seren.png"]
                },
                {
                    stars: 5,
                    name: "카오스 더스크 / 하드 듄켈",
                    hp: "약 100조 이상 (추정)",
                    features: "카오스 더스크는 공포 패턴, 하드 듄켈은 엘리트 보스와의 협공이 특징입니다. 솔격과 파티격의 난이도 차이가 크지 않은 것이 특징입니다.",
                    images: ["/images/bosses/dusk.png", "/images/bosses/dunkel.png"]
                },
                {
                    stars: 4,
                    name: "카오스 가디언 엔젤 슬라임 / 노멀 진 힐라",
                    hp: "약 115조 / 89.2조",
                    features: "가엔슬은 높은 체력과 회복 패턴으로 딜찍누가 필요합니다. 노멀 진 힐라는 하드의 절반 체력이지만 초보자에겐 여전히 어려운 패턴을 가집니다.",
                    images: ["/images/bosses/guardian-angel-slime.png", "/images/bosses/jin-hilla.png"]
                },
                {
                    stars: 3,
                    name: "하드 루시드 / 하드 윌",
                    hp: "117.6조 / 126조",
                    features: "본격적인 고스펙의 시작. 하드 루시드는 3페이즈 딜찍누가, 하드 윌은 3페이즈 거미줄과 게이지 관리가 핵심입니다. 해방 퀘스트의 시작점입니다.",
                    images: ["/images/bosses/lucid.png", "/images/bosses/will.png"]
                },
                {
                    stars: 2,
                    name: "하드 데미안 / 하드 스우",
                    hp: "36조 / 33.3조",
                    features: "노멀보다 수십 배 많은 체력을 가집니다. 하드 데미안은 2페이즈 초월석 어그로 관리가, 하드 스우는 3페이즈의 난잡한 패턴 생존이 관건입니다.",
                    images: ["/images/bosses/damien.png", "/images/bosses/lotus.png"]
                },
                {
                    stars: 1,
                    name: "노멀 더스크 / 노멀 듄켈",
                    hp: "26조",
                    features: "노멀 더스크는 촉수 방어와 공포 패턴, 노멀 듄켈은 높은 레벨/포스 요구량과 엘리트 보스 패턴이 까다롭습니다. 패턴만 숙지하면 은별 입문으로 적절합니다.",
                    images: ["/images/bosses/dusk.png", "/images/bosses/dunkel.png"]
                }
            ]
        },
        {
            id: "bronze",
            name: "동별 (Bronze Star)",
            stars: "★ 1 ~ 7",
            desc: "주간 보스(Weekly Boss) 라인업입니다. 패턴 숙지와 컨트롤 연습이 본격적으로 필요한 구간이며, 무자본 유저들의 1차 목표가 되는 구간입니다.",
            color: "text-orange-400",
            bgColor: "bg-orange-500/10",
            borderColor: "border-orange-500/30",
            bosses: [
                {
                    stars: 7,
                    name: "노멀 루시드 / 노멀 윌",
                    hp: "24조 / 25.2조",
                    features: "일명 '노루윌'. 이지보다 체력이 많고 패턴 데미지가 아픕니다. 윌은 레벨 250으로 레벨링이 중요하며, 루시드는 1페이즈 골렘 처리가 핵심입니다.",
                    images: ["/images/bosses/lucid.png", "/images/bosses/will.png"]
                },
                {
                    stars: 6,
                    name: "이지 루시드 / 이지 윌 / 노멀 가엔슬",
                    hp: "12조 / 16.8조 / 5조",
                    features: "노멀 스데미와 노멀 루윌 사이의 간극을 메우는 보스들. 가엔슬은 회복 패턴 파훼가 중요하며, 이지 루시드/윌은 노멀 패턴 연습에 좋습니다.",
                    images: ["/images/bosses/lucid.png", "/images/bosses/will.png", "/images/bosses/guardian-angel-slime.png"]
                },
                {
                    stars: 5,
                    name: "카오스 파풀라투스 / 노멀 스우 / 노멀 데미안",
                    hp: "5040억 / 1.5조 / 1.2조",
                    features: "일명 '스데미'. 본격적인 주간 보스의 시작입니다. 카파풀은 시계 폭탄과 레이저 교차, 스우는 1페이즈 전깃줄, 데미안은 낙인 관리가 핵심입니다.",
                    images: ["/images/bosses/papulatus.png", "/images/bosses/lotus.png", "/images/bosses/damien.png"]
                },
                {
                    stars: 4,
                    name: "카오스 벨룸 / 하드 매그너스",
                    hp: "2000억 / 1200억",
                    features: "카벨은 꼬리 피하기와 깊은 숨, 하매는 존 시스템과 운석 피하기가 관건입니다. 메린이 졸업의 상징적인 보스들입니다.",
                    images: ["/images/bosses/vellum.png", "/images/bosses/magnus.png"]
                },
                {
                    stars: 3,
                    name: "카오스 3루타 (피에르, 반반, 블러디 퀸)",
                    hp: "약 800억 ~ 1400억",
                    features: "피에르는 분열 스킵, 반반은 점프와 무빙, 블러디 퀸은 특수 상태이상 대처가 중요합니다. 3카 5앱 셋팅의 기반이 됩니다.",
                    images: ["/images/bosses/pierre.png", "/images/bosses/banban.png", "/images/bosses/bloody-queen.png"]
                },
                {
                    stars: 2,
                    name: "노멀 시그너스 / 카오스 자쿰",
                    hp: "630억 / 840억",
                    features: "시그너스는 공반과 잡몹 소환, 카오스 자쿰은 팔 떼기와 즉사급 내려찍기를 주의해야 합니다. 주간 보스 입문 단계입니다.",
                    images: ["/images/bosses/cygnus.png", "/images/bosses/zakum.png"]
                },
                {
                    stars: 1,
                    name: "이지 시그너스 / 하드 힐라 / 카오스 핑크빈",
                    hp: "105억 / 168억 / 약 600억",
                    features: "가장 쉬운 주간 보스들. 하드 힐라는 흡혈 패턴을 바인드 컷으로 넘기는 것이 좋고, 카오스 핑크빈은 상태이상 만병통치약이 필수입니다.",
                    images: ["/images/bosses/cygnus.png", "/images/bosses/hilla.png", "/images/bosses/pink-bean.png"]
                }
            ]
        },
        {
            id: "lead",
            name: "납별 (Lead Star)",
            stars: "★ 1 ~ 7",
            desc: "일일 보스(Daily Boss) 라인업입니다. 메이플스토리에 적응하며 기초적인 스펙업과 자본 마련을 하는 단계입니다.",
            color: "text-slate-500",
            bgColor: "bg-slate-800/50",
            borderColor: "border-slate-700/50",
            bosses: [
                {
                    stars: 7,
                    name: "하드 반 레온 / 노멀 아카이럼 / 노멀 매그너스 / 노멀 파풀라투스",
                    hp: "105억 / 126억 / 60억 / 168억",
                    features: "일일 보스 최강 라인. 아카이럼은 즉사기, 매그너스는 존 밖 딜 감소, 파풀라투스는 레이저 패턴 등 까다로운 패턴을 연습하기 좋습니다.",
                    images: ["/images/bosses/von-leon.png", "/images/bosses/arkarium.png", "/images/bosses/magnus.png", "/images/bosses/papulatus.png"]
                },
                {
                    stars: 6,
                    name: "노멀 카웅 / 카오스 혼테일 / 노멀 핑크빈 / 노멀 반 레온",
                    hp: "16.8억 / 266억 / 21억 / 63억",
                    features: "보스 장신구와 돈벌이가 쏠쏠한 구간. 카웅은 부품으로 추가 수입이 가능하고, 혼테일/핑크빈은 보스 장신구를 다수 드랍합니다.",
                    images: ["/images/bosses/kawoong.png", "/images/bosses/horntail.png", "/images/bosses/pink-bean.png", "/images/bosses/von-leon.png"]
                },
                {
                    stars: 5,
                    name: "노멀 혼테일 / 이지 반 레온 / 이지 아카이럼",
                    hp: "20억 / 7억 / 21억",
                    features: "전투력 3~5만 수준으로 잡을 수 있는 쉬운 보스들. 보스 장신구 파밍을 위해 매일 잡는 것이 좋습니다.",
                    images: ["/images/bosses/horntail.png", "/images/bosses/von-leon.png", "/images/bosses/arkarium.png"]
                },
                {
                    stars: 4,
                    name: "노멀 4루타 (피에르, 반반, 블러디 퀸, 벨룸)",
                    hp: "3억 ~ 5억",
                    features: "패턴 연습용 보스들. 피에르 모자 색깔, 반반 점프, 블러디 퀸 공반, 벨룸 꼬리 피하기 등 기초적인 보스 패턴을 익힐 수 있습니다.",
                    images: ["/images/bosses/pierre.png", "/images/bosses/banban.png", "/images/bosses/bloody-queen.png", "/images/bosses/vellum.png"]
                },
                {
                    stars: 3,
                    name: "노멀 힐라 / 이지 혼테일",
                    hp: "7억 / 8억",
                    features: "스공 10만 내외로 격파 가능. 힐라는 영생의 돌, 혼테일은 실블링/데아 시두스 등 초기 악세서리 수급에 좋습니다.",
                    images: ["/images/bosses/hilla.png", "/images/bosses/horntail.png"]
                },
                {
                    stars: 2,
                    name: "노멀 자쿰 / 이지 파풀라투스 / 이지 매그너스",
                    hp: "700만 / 4억 / 4억",
                    features: "노멀 자쿰은 응축/아쿠아틱 등 필수 보장을 드랍합니다. 이지 매그너스는 배지와 숄더를 노리고 잡습니다.",
                    images: ["/images/bosses/zakum.png", "/images/bosses/papulatus.png", "/images/bosses/magnus.png"]
                },
                {
                    stars: 1,
                    name: "이지 자쿰",
                    hp: "220만",
                    features: "메이플 최약체 보스. 50레벨 달성 후 바로 도전해도 깰 수 있는 튜토리얼 보스입니다.",
                    images: ["/images/bosses/zakum.png"]
                }
            ]
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-indigo-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Swords className="w-48 h-48 text-indigo-500" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-4 flex items-center gap-3">
                        <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-lg font-bold">GUIDE</span>
                        보스 티어 (Boss Tier)
                    </h1>
                    <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                        메이플스토리의 보스 몬스터 난이도를 정리한 티어표입니다.<br />
                        <span className="text-indigo-400 font-bold">강렬한 힘의 결정석 가격</span>과 <span className="text-indigo-400 font-bold">체감 난이도</span>를 기준으로 분류되었습니다.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <div className="bg-slate-800/80 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm text-slate-300">
                            <Info className="w-4 h-4 text-indigo-400" />
                            <span>티어는 게임 내 패치에 따라 변동될 수 있습니다.</span>
                        </div>
                        <div className="bg-slate-800/80 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm text-slate-300">
                            <AlertTriangle className="w-4 h-4 text-yellow-400" />
                            <span>개인의 직업, 스펙, 숙련도에 따라 체감 난이도는 다를 수 있습니다.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tier List */}
            <div className="grid gap-6">
                {tiers.map((tier) => (
                    <div
                        key={tier.id}
                        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${tier.borderColor} ${tier.bgColor}`}
                    >
                        <button
                            onClick={() => toggleTier(tier.id)}
                            className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl bg-slate-900/50 border border-white/5 ${tier.color}`}>
                                    <Star className="w-8 h-8 fill-current" />
                                </div>
                                <div>
                                    <h2 className={`text-2xl font-bold ${tier.color} flex items-center gap-2`}>
                                        {tier.name}
                                    </h2>
                                    <p className="text-slate-400 text-sm mt-1">{tier.desc}</p>
                                </div>
                            </div>
                            <div className={`p-2 rounded-full bg-slate-900/50 text-slate-400 transition-transform duration-300 ${expandedTier === tier.id ? 'rotate-180' : ''}`}>
                                <ChevronDown className="w-6 h-6" />
                            </div>
                        </button>

                        {expandedTier === tier.id && (
                            <div className="p-6 pt-0 border-t border-white/5 bg-slate-900/30">
                                <div className="grid gap-4 mt-4">
                                    {tier.bosses.map((boss, idx) => (
                                        <div key={idx} className="flex flex-col lg:flex-row lg:items-start gap-6 p-5 rounded-xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors">
                                            {/* Star Rating & Name & Images */}
                                            <div className="flex-shrink-0 w-full lg:w-64 flex flex-col gap-3">
                                                <div className="flex flex-wrap gap-0.5">
                                                    {Array.from({ length: boss.stars }).map((_, i) => (
                                                        <Star key={i} className={`w-4 h-4 fill-current ${tier.color}`} />
                                                    ))}
                                                </div>

                                                {/* Boss Images */}
                                                <div className="flex flex-wrap gap-2">
                                                    {boss.images.map((img, i) => (
                                                        <div key={i} className="relative w-14 h-14 rounded-lg overflow-hidden border border-white/10 bg-slate-800">
                                                            <Image
                                                                src={img}
                                                                alt={boss.name}
                                                                fill
                                                                className="object-cover"
                                                                sizes="56px"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>

                                                <div>
                                                    <span className={`text-xs font-bold ${tier.color} opacity-80 block mb-1`}>
                                                        {tier.name.split(' ')[0]} {boss.stars}개
                                                    </span>
                                                    <h3 className="text-xl font-bold text-white leading-tight">
                                                        {boss.name}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Details Grid */}
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-slate-800/50 p-4 rounded-lg border border-white/5">
                                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">체력 (HP)</span>
                                                    <span className={`text-lg font-bold ${tier.color}`}>{boss.hp}</span>
                                                </div>
                                                <div className="bg-slate-800/50 p-4 rounded-lg border border-white/5 md:col-span-2">
                                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">특징 및 공략</span>
                                                    <p className="text-sm text-slate-300 leading-relaxed">
                                                        {boss.features}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer Note */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 text-center">
                <p className="text-slate-400 text-sm">
                    * 본 가이드는 나무위키 '메이플스토리/보스 몬스터/보스 티어' 문서를 참고하여 재구성되었습니다.<br />
                    더 자세한 정보는 <a href="https://namu.wiki/w/%EB%A9%94%EC%9D%B4%ED%94%8C%EC%8A%A4%ED%86%A0%EB%A6%AC/%EB%B3%B4%EC%8A%A4%20%EB%AA%AC%EC%8A%A4%ED%84%B0/%EB%B3%B4%EC%8A%A4%20%ED%8B%B0%EC%96%B4" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">나무위키 원문</a>을 확인해주세요.
                </p>
            </div>
        </div>
    );
}
