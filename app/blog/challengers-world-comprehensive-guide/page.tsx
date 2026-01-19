import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Lightbulb, Gem, Heart, Award, PawPrint, Zap, Wrench, Target } from 'lucide-react';
import { AdBanner, InArticleAd } from '@/components/AdSense';

export const metadata: Metadata = {
    title: '챌린저스 월드 내실 가이드 완벽 정리 - 포켓/하트/칭호/훈장/펫 세팅 - Maple AI',
    description: '챌린저스 월드에서 꼭 챙겨야 할 내실 요소들을 완벽 정리! 포켓 아이템, 하트, 칭호, 훈장, 펫, 소울, 도핑까지 모든 내실 가이드를 한 번에 확인하세요.',
    keywords: '메이플스토리, 챌린저스월드, 챌섭, 내실, 포켓, 하트, 칭호, 훈장, 펫, 소울, 도핑, 장비제작',
};

export default function ChallengersWorldGuidePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">블로그 목록으로</span>
                    </Link>
                </div>
            </div>

            {/* Article */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Title */}
                <header className="mb-8 sm:mb-12">
                    <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs sm:text-sm font-bold rounded-full mb-4">
                        📚 가이드
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
                        🏆 챌린저스 월드 내실 가이드<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            완벽 정리 총정리
                        </span>
                    </h1>
                    <div className="flex items-center gap-6 text-xs sm:text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>2026년 1월 19일</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4" />
                            <span>종합 가이드</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    {/* Introduction */}
                    <section className="mb-12">
                        <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-4 sm:p-6 mb-8">
                            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-0">
                                챌린저스 월드에서 <strong className="text-blue-400">연습모드 클리어 → 포인트 획득 → 스펙업 → 본 모드 도전</strong>의
                                사이클을 효율적으로 돌리기 위해서는 <strong className="text-cyan-400">내실 챙기기</strong>가 필수입니다.
                                이 가이드에서는 꼭 챙겨야 할 모든 내실 요소를 완벽하게 정리했습니다!
                            </p>
                        </div>
                    </section>

                    <AdBanner dataAdSlot="8162808816" className="mb-12" />

                    {/* 섹션 1: 아이템 내실 (포켓, 하트) */}
                    <section className="mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <Gem className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                            아이템 내실 (포켓, 하트)
                        </h2>

                        {/* 포켓 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 sm:p-6 mb-6">
                            <h3 className="text-lg sm:text-xl font-bold text-purple-400 mb-3 sm:mb-4">
                                📦 포켓 아이템
                            </h3>

                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 sm:p-4 mb-4">
                                <p className="text-yellow-300 font-bold mb-2 text-sm sm:text-base">⚠️ 중요!</p>
                                <p className="text-slate-300 mb-0 text-xs sm:text-sm">
                                    포켓 슬롯은 <strong className="text-yellow-400">매력 30레벨 달성</strong>시 개방되므로 반드시 착용하세요!
                                </p>
                            </div>

                            <div className="space-y-3 text-xs sm:text-sm">
                                <div className="bg-slate-900/50 rounded-lg p-3 sm:p-4">
                                    <p className="text-purple-300 font-bold mb-2">해금 조건</p>
                                    <ul className="text-slate-300 space-y-1 mb-0 list-disc list-inside">
                                        <li>전문기술 → 성향 → 매력 30레벨 달성</li>
                                        <li>[성향 성장의 비약] 획득 시 1순위로 사용</li>
                                        <li>메르세데스 등은 기본 매력 30으로 시작</li>
                                    </ul>
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-3 sm:p-4">
                                    <p className="text-purple-300 font-bold mb-2">추천 아이템: [핑크빛 성배]</p>
                                    <ul className="text-slate-300 space-y-1 mb-0 list-disc list-inside">
                                        <li>카오스 핑크빈 또는 노말 핑크빈 드롭</li>
                                        <li>노말에서 블랙빈 마크도 드롭 가능</li>
                                        <li>장착 시 교환 불가 → 경매장 거래 가능</li>
                                        <li>검은 환생의 불꽃 사용 가능</li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-red-900/20 to-purple-900/20 border border-red-500/30 rounded-lg p-3 sm:p-4">
                                    <p className="text-red-300 font-bold mb-2">🔥 고스펙 목표: [마도서] (칠흑의 보스 세트)</p>
                                    <p className="text-slate-300 text-xs sm:text-sm mb-0">
                                        챌린저스 월드에서 고스펙을 목표로 한다면 <strong className="text-red-400">칠흑의 보스 세트 효과</strong>를 위해 마도서 포켓 아이템을 추천합니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 하트 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 sm:p-6 mb-6">
                            <h3 className="text-lg sm:text-xl font-bold text-pink-400 mb-3 sm:mb-4 flex items-center gap-2">
                                <Heart className="w-5 h-5" />
                                하트 아이템
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-slate-900/50 rounded-lg p-3 sm:p-4">
                                    <p className="text-pink-300 font-bold mb-2 text-sm sm:text-base">임시: [리튬 하트]</p>
                                    <p className="text-slate-300 mb-2 text-xs sm:text-sm">
                                        챌린저스 월드 브론즈 보상으로 획득 가능
                                    </p>
                                    <ul className="text-slate-400 text-xs sm:text-sm space-y-1 mb-0 list-disc list-inside">
                                        <li>윗잠 에픽</li>
                                        <li>주흔작</li>
                                        <li>스타포스 5성 정도로 대충 사용</li>
                                    </ul>
                                </div>

                                <div className="bg-pink-900/20 border border-pink-500/30 rounded-lg p-3 sm:p-4">
                                    <p className="text-pink-300 font-bold mb-2 text-sm sm:text-base">최종: [페어리 하트] ⭐</p>
                                    <p className="text-slate-300 mb-3 text-xs sm:text-sm">
                                        <strong className="text-pink-400">챌린저스 시즌3 기준 1월 26일 획득 가능</strong> - 주문서들 미리 구매하세요!
                                    </p>

                                    <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3 mb-3">
                                        <p className="text-cyan-300 font-semibold mb-2 text-xs sm:text-sm">💡 어떤 주문서를 구매하면 좋을까?</p>
                                        <div className="text-slate-300 text-xs sm:text-sm space-y-1">
                                            <p className="mb-1">✓ <strong className="text-cyan-400">매지컬 무기 공격력/마력 주문서</strong></p>
                                            <p className="mb-1">✓ <strong className="text-cyan-400">코인샵 하트 주문서</strong></p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/50 rounded-lg p-3 mb-3">
                                        <p className="text-pink-300 font-semibold mb-2 text-xs sm:text-sm">주문서 우선순위</p>
                                        <ol className="text-slate-300 text-xs sm:text-sm space-y-1.5 mb-0 list-decimal list-inside">
                                            <li>
                                                <strong className="text-yellow-400">주문의 흔적작 우선 추천</strong>
                                                <p className="ml-5 mt-1 text-xs text-slate-400">
                                                    코인샵 하트 주문서를 사면 다른 필요한 물품을 못 살 수도 있기 때문에 신중하게 구매 결정하는 것을 추천합니다.
                                                </p>
                                            </li>
                                            <li>금/토/일 피버타임 또는 PC방: 주문의 흔적 30% 주문서 → 공/마 +50</li>
                                            <li>펫장비 순백의 주문서 사용 가능</li>
                                        </ol>
                                    </div>

                                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 mb-3">
                                        <p className="text-purple-300 font-semibold mb-2 text-xs sm:text-sm">🎲 잠재 옵션 설정</p>
                                        <p className="text-slate-300 text-xs sm:text-sm mb-0">
                                            코인샵에서 <strong className="text-purple-400">카르마 유니크 주문서</strong>와
                                            <strong className="text-purple-400"> 에디셔널 에픽 주문서</strong>를 구매하여
                                            잠재 옵션을 뽑는 것을 추천합니다!
                                        </p>
                                    </div>

                                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                                        <p className="text-red-300 font-bold mb-1 text-xs sm:text-sm">⚠️ 필수 확인사항</p>
                                        <ul className="text-slate-300 text-xs space-y-1 mb-0 list-disc list-inside">
                                            <li>안드로이드까지 착용해야 능력치 적용</li>
                                            <li>보급형 안드로이드는 페어리 하트 착용 불가</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <InArticleAd dataAdSlot="6849727140" className="my-8 sm:my-12" />

                    {/* 섹션 2: 칭호 & 훈장 */}
                    <section className="mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <Award className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                            칭호 & 훈장
                        </h2>

                        {/* 칭호 테이블 */}
                        <div className="overflow-x-auto mb-6">
                            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-3 sm:p-4">
                                <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-3 sm:mb-4">👑 칭호 가이드</h3>
                                <div className="overflow-x-auto -mx-3 sm:mx-0">
                                    <table className="w-full text-xs sm:text-sm min-w-[600px]">
                                        <thead className="bg-slate-900/50">
                                            <tr className="border-b border-slate-700">
                                                <th className="p-2 text-left text-yellow-300 font-bold">획득 시점</th>
                                                <th className="p-2 text-left text-yellow-300 font-bold">칭호명</th>
                                                <th className="p-2 text-center text-yellow-300 font-bold">보뎀</th>
                                                <th className="p-2 text-center text-yellow-300 font-bold">방무</th>
                                                <th className="p-2 text-center text-yellow-300 font-bold">공/마</th>
                                                <th className="p-2 text-center text-yellow-300 font-bold">올스탯</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800">
                                            <tr>
                                                <td className="p-2 text-slate-300">200레벨</td>
                                                <td className="p-2 font-semibold text-blue-400">Eternal Flame</td>
                                                <td className="p-2 text-center text-green-400">10%</td>
                                                <td className="p-2 text-center text-green-400">10%</td>
                                                <td className="p-2 text-center text-purple-400">15</td>
                                                <td className="p-2 text-center text-purple-400">15</td>
                                            </tr>
                                            <tr>
                                                <td className="p-2 text-slate-300">240레벨</td>
                                                <td className="p-2 font-semibold text-pink-400">Infinite Flame</td>
                                                <td className="p-2 text-center text-green-400">20%</td>
                                                <td className="p-2 text-center text-green-400">20%</td>
                                                <td className="p-2 text-center text-purple-400">30</td>
                                                <td className="p-2 text-center text-purple-400">30</td>
                                            </tr>
                                            <tr className="bg-yellow-900/10">
                                                <td className="p-2 text-slate-300">270레벨</td>
                                                <td className="p-2 font-semibold text-yellow-400">Burning Beyond</td>
                                                <td className="p-2 text-center text-green-400">20%</td>
                                                <td className="p-2 text-center text-green-400">20%</td>
                                                <td className="p-2 text-center text-purple-400">30</td>
                                                <td className="p-2 text-center text-purple-400">30</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-slate-400 text-xs mt-3 mb-0">
                                    ⚠️ 바우처 구매 칭호(보뎀 30%, 방무 30%) 사용 시 기간을 확인하여 챌린저스 월드 기간 동안 효과를 유지할 수 있도록 하세요!
                                </p>
                                <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3 mt-3">
                                    <p className="text-cyan-300 font-semibold mb-1 text-xs sm:text-sm">💡 Burning Beyond 칭호의 숨겨진 장점</p>
                                    <p className="text-slate-300 text-xs mb-0">
                                        Burning Beyond 칭호는 <strong className="text-cyan-400">어센틱 포스 +100</strong> 효과가 있어서,
                                        어센틱 포스가 필요한 보스(카링, 칼로스 등)에서는 바우처 칭호보다 더 좋을 수 있습니다!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 훈장 */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4">
                                <h4 className="text-purple-400 font-bold mb-3">🎯 보스용 훈장</h4>
                                <div className="space-y-3 text-xs sm:text-sm">
                                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3">
                                        <p className="text-purple-300 font-bold mb-1">[칠요의 몬스터파커] ⭐</p>
                                        <p className="text-slate-400 mb-0">몬스터파크 무료 클리어 15주 소요 (보통 이게 더 좋음)</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-cyan-400 font-bold mb-1">[카오스 벨룸 킬러]</p>
                                        <p className="text-slate-400 mb-0">카오스 벨룸 1회 처치 (주간 보스 12개 제한 확인)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4">
                                <h4 className="text-green-400 font-bold mb-3">🌱 사냥용 훈장</h4>
                                <div className="space-y-3 text-xs sm:text-sm">
                                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                                        <p className="text-green-300 font-bold mb-1">[HYPER BURNING MAX]</p>
                                        <p className="text-slate-400 mb-0">260레벨 달성 시 획득 / 공마 +6, 올스탯 +6</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-pink-400 font-bold mb-1">[23주년 훈장]</p>
                                        <p className="text-slate-400 mb-0">4~5월 이벤트 예정 / 스탯 +n, HP/MP +1000, 공마 +7</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <AdBanner dataAdSlot="8162808816" className="mb-12" />

                    {/* 섹션 3: 스킬 & 성향 */}
                    <section className="mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                            스킬 & 성향 내실
                        </h2>

                        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 sm:p-6 mb-6">
                            <p className="text-cyan-300 font-bold mb-2">💡 핵심 팁</p>
                            <p className="text-slate-300 mb-0 text-xs sm:text-sm">
                                <strong className="text-yellow-400">웰컴 메이플 패키지</strong> (9,900 캐시) 구매 시 성향 전부 만렙 가능!
                            </p>
                        </div>

                        {/* 성향 우선순위 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 sm:p-6 mb-6">
                            <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-4">📊 성향 우선순위</h3>
                            <div className="space-y-2 text-xs sm:text-sm">
                                <div className="flex items-center gap-3 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                                    <span className="text-yellow-400 font-bold text-lg">1위</span>
                                    <div className="flex-1">
                                        <p className="text-yellow-300 font-bold mb-0">매력 30 - 포켓 슬롯 해금</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2 bg-slate-900/50 rounded-lg">
                                    <span className="text-slate-400 font-bold">2</span>
                                    <p className="text-slate-300 mb-0 flex-1">통찰력 - 속성내성무시 5%</p>
                                </div>
                                <div className="flex items-center gap-3 p-2 bg-slate-900/50 rounded-lg">
                                    <span className="text-slate-400 font-bold">3</span>
                                    <p className="text-slate-300 mb-0 flex-1">카리스마 - 방어율 무시 10%</p>
                                </div>
                                <div className="flex items-center gap-3 p-2 bg-slate-900/50 rounded-lg">
                                    <span className="text-slate-400 font-bold">4</span>
                                    <p className="text-slate-300 mb-0 flex-1">감성 - 버프 지속시간 10%</p>
                                </div>
                                <div className="flex items-center gap-3 p-2 bg-slate-900/50 rounded-lg">
                                    <span className="text-slate-400 font-bold">5</span>
                                    <p className="text-slate-300 mb-0 flex-1">의지 - HP 최대치 2000, 상태이상 내성 20</p>
                                </div>
                                <div className="flex items-center gap-3 p-2 bg-slate-900/50 rounded-lg">
                                    <span className="text-slate-400 font-bold">6</span>
                                    <p className="text-slate-300 mb-0 flex-1">손재주 - 일부 주문서 성공확률 10% 증가</p>
                                </div>
                            </div>
                        </div>

                        {/* 정령/여제의 축복 */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 sm:p-6 mb-6">
                            <h3 className="text-lg sm:text-xl font-bold text-pink-400 mb-4">✨ 정령의 축복 / 여제의 축복</h3>
                            <div className="space-y-3 text-xs sm:text-sm">
                                <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-3">
                                    <p className="text-emerald-300 font-bold mb-2">1단계: 제로 생성 (공/마 +12)</p>
                                    <p className="text-slate-300 mb-0">제로 120레벨 전직 스킵으로 간단하게 획득</p>
                                </div>
                                <div className="bg-pink-900/20 border border-pink-500/30 rounded-lg p-3">
                                    <p className="text-pink-300 font-bold mb-2">2단계: 시그너스 101레벨 달성 후 퀘스트 (공/마 +30)</p>
                                    <p className="text-slate-300 mb-2">테라버닝으로 시그너스 직업군 육성 추천</p>
                                    <p className="text-yellow-300 text-xs mb-0">⚠️ 전구의 "고귀한 정신" 퀘스트 클리어 필수!</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <InArticleAd dataAdSlot="6849727140" className="my-8 sm:my-12" />

                    {/* 섹션 4: 펫 & 소울 */}
                    <section className="mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <PawPrint className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
                            펫 & 소울
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* 펫 */}
                            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 sm:p-6">
                                <h3 className="text-lg sm:text-xl font-bold text-orange-400 mb-4">🐾 펫 세팅</h3>

                                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 mb-4">
                                    <p className="text-cyan-300 font-bold mb-1 text-xs sm:text-sm">💡 펫 선정 및 팁</p>
                                    <p className="text-slate-300 text-xs mb-0">
                                        펫 세트효과로 공/마 버프를 받을 수 있습니다!
                                    </p>
                                </div>

                                <div className="space-y-3 text-xs sm:text-sm">
                                    <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-3">
                                        <p className="text-orange-300 font-bold mb-2">멀티펫 세트 3마리 장착</p>
                                        <ul className="text-slate-300 space-y-1 mb-0 list-disc list-inside">
                                            <li><strong className="text-orange-400">일반 멀티펫 세트</strong> 3마리 장착</li>
                                            <li><strong className="text-orange-400">루나 드림펫 세트</strong> (D라벨) 3마리 장착</li>
                                            <li><strong className="text-orange-400">루나 쁘띠펫 세트</strong> 3마리 장착</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-cyan-300 font-bold mb-2">펫 스위칭 전략</p>
                                        <p className="text-slate-300 mb-0">
                                            달콤한 정령 사용자는 <strong className="text-cyan-400">사냥 시 달콤한 정령</strong>,
                                            <strong className="text-cyan-400"> 보스전 시 펫 세트 효과</strong> 받는 것을 추천
                                        </p>
                                    </div>

                                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                                        <p className="text-green-300 font-bold mb-2">필수 펫 스킬</p>
                                        <ul className="text-slate-300 space-y-1 mb-0 list-disc list-inside">
                                            <li><strong className="text-green-400">HP/MP 물약충전</strong></li>
                                            <li><strong className="text-green-400">펫 훈련 스킬</strong> - 없는 경우 마일리지로 구매 가능</li>
                                        </ul>
                                    </div>

                                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3">
                                        <p className="text-purple-300 font-bold mb-2">펫장비</p>
                                        <p className="text-slate-300 mb-0">
                                            멀티펫의 경우 <strong className="text-purple-400">마일리지로 펫장비 구매 가능</strong>
                                        </p>
                                    </div>

                                    <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-3">
                                        <p className="text-indigo-300 font-bold mb-2">펫장비 주문서</p>
                                        <ul className="text-slate-300 text-xs space-y-1 mb-0 list-disc list-inside">
                                            <li>이벤트 일반 코인샵/챌린저스 코인샵에서 펫장비 주문서 판매중</li>
                                            <li><strong className="text-yellow-400">카르마 프리미엄 펫장비 주문서</strong>는 챌린저스 코인샵에서 10개만 판매중</li>
                                            <li><strong className="text-yellow-400">카르마 프리미엄 펫장비 주문서</strong>는 보스 코인샵 중급에서도 판매중</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* 소울 */}
                            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 sm:p-6">
                                <h3 className="text-lg sm:text-xl font-bold text-purple-400 mb-4">👻 소울</h3>
                                <div className="space-y-3 text-xs sm:text-sm">
                                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3">
                                        <p className="text-purple-300 font-bold mb-2">소울 인챈터 (공/마 +20)</p>
                                        <p className="text-slate-300 mb-0">보급형 / 강화형 / 스페셜 소울 인챈터</p>
                                    </div>
                                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                                        <p className="text-red-300 font-bold mb-2">⚠️ 주의사항</p>
                                        <ul className="text-slate-300 space-y-1 mb-0 list-disc list-inside">
                                            <li>경매장 구매 시 비쌈 (사냥/무릉 수급 추천)</li>
                                            <li>도전자 무기 업그레이드 시 소멸</li>
                                            <li>사용 시점 잘 생각하기</li>
                                        </ul>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-cyan-300 font-bold mb-2">위대한 소울 추천 옵션</p>
                                        <ul className="text-slate-300 space-y-1 mb-0 list-disc list-inside">
                                            <li>공격력/마력 %</li>
                                            <li>보스 공격 데미지 %</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 섹션 5: 도핑 & 장비 제작 */}
                    <section className="mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                            도핑 & 장비 제작
                        </h2>

                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 sm:p-6 mb-6">
                            <p className="text-green-300 font-bold mb-2 text-sm sm:text-base">💊 도핑 내실 필수!</p>
                            <p className="text-slate-300 mb-3 text-xs sm:text-sm">
                                연습모드로도 아이템 버닝, 챌린저스 미션, 파트너 컴뱃 미션 모두 클리어 가능하므로 도핑을 챙기는 것이 효율적입니다!
                            </p>
                            <div className="space-y-2 text-xs sm:text-sm">
                                <div className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <p className="text-slate-300 mb-0">콜렉터 퀘스트 클리어 → 영약 구매 가능</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <p className="text-slate-300 mb-0">연금술 배우기 → 비약 아이템 지원 +1</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-green-400">✓</span>
                                    <p className="text-slate-300 mb-0">장비 제작 명장 → 크리티컬 데미지 +5%</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-indigo-400 mb-4">🔧 장비 제작 명장 빠른 루트</h3>
                            <div className="space-y-3 text-xs sm:text-sm">
                                <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-3">
                                    <p className="text-indigo-300 font-bold mb-3">1~10레벨: 화살 제작 상세 루트</p>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-xs text-left min-w-[300px]">
                                            <thead className="bg-indigo-900/40 text-indigo-200">
                                                <tr>
                                                    <th className="p-2 whitespace-nowrap">레벨</th>
                                                    <th className="p-2 whitespace-nowrap">제작 품목</th>
                                                    <th className="p-2 whitespace-nowrap">재료</th>
                                                    <th className="p-2 text-center whitespace-nowrap">횟수</th>
                                                    <th className="p-2 text-center whitespace-nowrap">피로도</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-indigo-800 text-slate-300">
                                                <tr>
                                                    <td className="p-2">1~3</td>
                                                    <td className="p-2">활/석궁전용 강한 화살</td>
                                                    <td className="p-2">은괴 1 / 오팔 1</td>
                                                    <td className="p-2 text-center">12</td>
                                                    <td className="p-2 text-center">60</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2">3~7</td>
                                                    <td className="p-2">활/석궁전용 강한 화살</td>
                                                    <td className="p-2">아다만티움 1 / 청동 1</td>
                                                    <td className="p-2 text-center">37</td>
                                                    <td className="p-2 text-center">185</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2">7~10</td>
                                                    <td className="p-2">활/석궁전용 날카로운 화살</td>
                                                    <td className="p-2">다이아몬드 1 / 아쿠아마린 1</td>
                                                    <td className="p-2 text-center">77</td>
                                                    <td className="p-2 text-center">385</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-slate-400 text-xs mt-2 mb-0 text-right">
                                        * 총 누적 피로도: 630 (피로도 회복제 필수)
                                    </p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-3">
                                    <p className="text-cyan-300 font-bold mb-3">10레벨 → 장인 루트</p>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-xs text-left min-w-[300px]">
                                            <thead className="bg-slate-800 text-slate-200">
                                                <tr>
                                                    <th className="p-2 whitespace-nowrap">제작 품목</th>
                                                    <th className="p-2 whitespace-nowrap">재료 (택1)</th>
                                                    <th className="p-2 text-center whitespace-nowrap">횟수</th>
                                                    <th className="p-2 text-center whitespace-nowrap">피로도</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-700 text-slate-300">
                                                <tr>
                                                    <td className="p-2 font-bold text-cyan-400">타임리스 신발 공통</td>
                                                    <td className="p-2">
                                                        <div className="space-y-1">
                                                            <p className="mb-0 text-yellow-200">공통: 고급 연마제 1 / 시간의 돌 1 / 상결 2</p>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 text-center" rowSpan={3}>33</td>
                                                    <td className="p-2 text-center" rowSpan={3}>
                                                        330
                                                        <div className="text-[10px] text-slate-500 mt-1">누적: 960</div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2">타임리스 그라베/론타노/파라온</td>
                                                    <td className="p-2">어둠의 크리스탈 2</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2">타임리스 카바티나/문스티드</td>
                                                    <td className="p-2">흑수정 2</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-3 text-xs">
                                        <p className="text-slate-300 mb-1">
                                            💡 <strong className="text-cyan-400">레벨에 해당하는 품목 중 아무거나 재료가 싼 것으로 제작하면 됩니다.</strong>
                                        </p>
                                        <p className="text-yellow-300 mb-0">
                                            💡 제작한 장비 분해 시 상급 아이템 결정을 돌려받습니다!
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-3">
                                    <p className="text-purple-300 font-bold mb-3">장인 → 명장 루트</p>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-xs text-left min-w-[300px]">
                                            <thead className="bg-slate-800 text-slate-200">
                                                <tr>
                                                    <th className="p-2 whitespace-nowrap">제작 품목</th>
                                                    <th className="p-2 whitespace-nowrap">재료</th>
                                                    <th className="p-2 text-center whitespace-nowrap">횟수</th>
                                                    <th className="p-2 text-center whitespace-nowrap">피로도</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-700 text-slate-300">
                                                <tr>
                                                    <td className="p-2 font-bold text-purple-400">마법의 숫돌</td>
                                                    <td className="p-2">
                                                        <div className="space-y-1">
                                                            <p className="mb-0">최상급 아이템 결정 10</p>
                                                            <p className="mb-0">뒤틀린 시간의 정수 10</p>
                                                            <p className="mb-0">상급 주문의 정수 10</p>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 text-center">31</td>
                                                    <td className="p-2 text-center">
                                                        310
                                                        <div className="text-[10px] text-slate-500 mt-1">누적: 1,270</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-yellow-300 text-xs mt-2 mb-0">
                                        💡 숫돌을 되팔아서 어느정도 지출을 보전할 수 있습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <AdBanner dataAdSlot="8162808816" className="mb-12" />

                    {/* 섹션 6: 마무리 팁 */}
                    <section className="mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" />
                            기타 필수 팁
                        </h2>

                        <div className="mb-6">
                            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-4">
                                <h4 className="text-purple-400 font-bold mb-3 text-sm sm:text-base">🌟 발사체 추가 스펙업</h4>
                                <ul className="text-slate-300 space-y-2 text-xs sm:text-sm mb-0 list-disc list-inside">
                                    <li>궁수 직업군: 티타늄 화살</li>
                                    <li>나이트로드/워커: 플레임 표창</li>
                                    <li>캡틴: 자이언트 불릿</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-xl p-4 sm:p-6">
                            <p className="text-yellow-300 font-bold mb-2 text-sm sm:text-base">🎯 챌린저스 전용 이벤트</p>
                            <p className="text-slate-300 mb-0 text-xs sm:text-sm">
                                <strong className="text-yellow-400">'의문의 결계'</strong> 확인하기 - 챌린저스 월드 전용 스펙업 이벤트를 놓치지 마세요!
                            </p>
                        </div>
                    </section>

                    {/* 마무리 */}
                    <section className="mb-8">
                        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-6 sm:p-8 text-center">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                ⚡ 효율적인 챌린저스 라이프!
                            </h3>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-0">
                                이 가이드의 내실 요소들을 체계적으로 챙기면서 <strong className="text-blue-400">연습모드</strong>를 활용하면
                                최소한의 비용으로 최대한의 효율을 낼 수 있습니다. <br className="hidden sm:block" />
                                챌린저스 월드에서 최고의 성과를 거두시길 바랍니다! 🏆
                            </p>
                        </div>
                    </section>

                </div>
            </article>
        </div>
    );
}
